// routes/order.js
import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone)
    return res.status(400).json({ error: 'Имя и телефон обязательны' });

  // Загружаем переменные окружения при вызове маршрута
  const YANDEX_EMAIL = process.env.YANDEX_EMAIL;
  const YANDEX_PASS = process.env.YANDEX_PASS;
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const text = `📩 Новая заявка\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

  try {
    // Отправка письма на почту

    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: YANDEX_EMAIL,
        pass: YANDEX_PASS,
      },
    });

    await transporter.sendMail({
      from: YANDEX_EMAIL,
      to: YANDEX_EMAIL,
      subject: 'Новая заявка с сайта',
      text,
    });

    // Отправка в Telegram
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }
    );

    res.status(200).json({ message: 'Заявка отправлена' });
  } catch (err) {
    console.error('❌ Ошибка при отправке email:', err);
    res.status(500).json({ error: 'Ошибка при отправке заявки' });
  }
});

export default router;

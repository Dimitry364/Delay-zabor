// routes/order.js
import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Антиспам: максимум 1 заявка с IP в 10 сек
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 секунд
  max: 2,
  message: 'Слишком частые запросы. Попробуйте чуть позже.',
});
router.use(limiter);

router.post('/', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    console.warn('❌ Запрос без имени или телефона');
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const text = `📩 Новая заявка\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

  const YANDEX_EMAIL = process.env.YANDEX_EMAIL;
  const YANDEX_PASS = process.env.YANDEX_PASS;
  const RECIPIENTS = process.env.RECIPIENTS
    ? process.env.RECIPIENTS.split(',').map((email) => email.trim())
    : [YANDEX_EMAIL];

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

  // === 1. Email ===
  try {
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
      to: RECIPIENTS.join(','),
      subject: 'Новая заявка с сайта',
      text,
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #1a73e8;">📩 Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">Отправлено с сайта delaizabor-nsk.ru</p>
      </div>
    `,
    });

    console.log('Email отправлен на:', RECIPIENTS.join(', '));
  } catch (err) {
    console.error('❌ Ошибка отправки email:', err.message);
  }

  // === 2. Telegram ===
  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }
    );
    console.log('Telegram-уведомление отправлено');
  } catch (err) {
    console.error('❌ Ошибка отправки в Telegram:', err.message);
  }

  // === 3. Strapi ===
  // try {
  //   await axios.post(`${STRAPI_URL}/api/zayavkas`, {
  //     data: { name, phone },
  //   });
  //   console.log('Заявка сохранена в Strapi');
  // } catch (err) {
  //   console.error('❌ Ошибка при записи в Strapi:', err.message);
  // }

  res.status(200).json({ message: 'Заявка обработана' });
});

export default router;

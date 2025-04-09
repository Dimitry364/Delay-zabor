import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  const dirPath = path.join(process.cwd(), 'public/images/ourworks');
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Ошибка чтения изображения галереи', err);
      return res.status(500).json({ message: 'ошибка сервера' });
    }

    const images = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file) => `${baseUrl}/images/ourworks/${file}`); // возвращаем путь

    res.json(images); // возвращаем в ответ
  });
});

export default router;

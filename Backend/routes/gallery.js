import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  const dirPath = path.join(process.cwd(), 'public/images/ourworks');

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Ошибка чтения изображения галереи', err);
      return res.status(500).json({ message: 'ошибка сервера' });
    }

    const images = files
      .filter((file) => {
        /\.(jpg|jpeg|png|webp)$/i.test(file);
      })
      .map((file) => {
        `/images/ourworks/${file}`;
      });
    res.json(images);
  });
});

export default router;

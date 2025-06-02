import express from 'express';
import fs from 'fs';
const router = express.Router();

const DB_PATH = './db.json';

// Получить все отзывы
router.get('/', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    res.json(db.reviews);
  } catch (err) {
    res.status(500).json({ error: 'Не удалось загрузить отзывы' });
  }
});

// Добавить отзыв
router.post('/', (req, res) => {
  const { name, text } = req.body;
  if (!name || !text)
    return res.status(400).json({ error: 'Имя и текст обязательны' });

  try {
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    const newReview = {
      id: Date.now(),
      name,
      text,
    };
    db.reviews.push(newReview);
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при добавлении отзыва' });
  }
});

export default router;

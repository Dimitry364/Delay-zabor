import express from 'express';
import Card from '../models/Card.js';

const router = express.Router();

// Получить все карточки
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении карточек' });
  }
});

// Получить одну карточку по ID
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Карточка не найдена' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении карточки' });
  }
});

export default router;

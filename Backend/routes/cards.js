import express from 'express';
import Card from '../models/Card.js';

const router = express.Router();

// Получить все карточки
router.get('/', async (req, res) => {
  try {
    console.log('[GET /cards] — запрос получен');
    const cards = await Card.find();
    console.log(`[GET /cards] — найдено ${cards.length} карточек`);
    res.json(cards);
  } catch (err) {
    console.error('[GET /cards] — ошибка:', err);
    res.status(500).json({ error: 'Ошибка при получении карточек' });
  }
});

// Получить одну карточку по ID
router.get('/:id([0-9a-fA-F]{24})', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Карточка не найдена' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении карточки' });
  }
});

// Получить карточку по slug
router.get('/:slug', async (req, res) => {
  try {
    const card = await Card.findOne({ slug: req.params.slug });
    if (!card) return res.status(404).json({ error: 'Карточка не найдена' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении карточки' });
  }
});

export default router;

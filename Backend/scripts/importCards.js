import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Card from '../models/Card.js';

dotenv.config();

const dbPath = path.resolve('./db.json');
const rawData = fs.readFileSync(dbPath);
const jsonData = JSON.parse(rawData);
const cards = jsonData.cards;

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Подключено к MongoDB');

    // Очистить старые данные (по желанию)
    await Card.deleteMany({});
    console.log('Старые карточки удалены');

    // Добавить новые карточки
    await Card.insertMany(cards);
    console.log(`Импортировано ${cards.length} карточек`);

    process.exit();
  } catch (err) {
    console.error('Ошибка при импорте карточек:', err);
    process.exit(1);
  }
}

importData();

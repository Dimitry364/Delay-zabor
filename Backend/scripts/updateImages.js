import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Card from '../models/Card.js';

dotenv.config();

const imageMap = {
  'zabor-iz-profnastila': {
    image: 'https://api.delaizabor-nsk.ru/images/mainImage/profnastil.png',
    gates: [
      'https://api.delaizabor-nsk.ru/images/profnastil/otkatvorota.jpg',
      'https://api.delaizabor-nsk.ru/images/profnastil/kalitka.jpg',
      'https://api.delaizabor-nsk.ru/images/profnastil/raspVorota.jpg',
      'https://api.delaizabor-nsk.ru/images/profnastil/otkatvorotaSKalitkoi.jpg',
    ],
  },
  'zabor-iz-proftruby': {
    image: 'https://api.delaizabor-nsk.ru/images/mainImage/proftruba.png',
    gates: [],
  },
  'zabor-iz-evroshtaketnika': {
    image: 'https://api.delaizabor-nsk.ru/images/mainImage/euroShtaket.png',
    gates: [],
  },
  'zabor-iz-setki-rabitsa': {
    image: 'https://api.delaizabor-nsk.ru/images/mainImage/setkarabica.png',
    gates: [],
  },
  'zabor-iz-polikarbonata': {
    image: 'https://api.delaizabor-nsk.ru/images/mainImage/policarbonat.png',
    gates: [],
  },
  'zabor-kovkoy': {
    image: 'https://api.delaizabor-nsk.ru/images/mainImage/kovka.png',
    gates: [],
  },
  'zabor-3d': {
    image: 'https://api.delaizabor-nsk.ru/images/mainImage/3d.png',
    gates: [],
  },
};

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Подключение к MongoDB успешно');

    const updates = await Promise.all(
      Object.entries(imageMap).map(async ([slug, data]) => {
        const card = await Card.findOne({ slug });

        if (!card) {
          console.warn(`Карточка со slug "${slug}" не найдена`);
          return null;
        }

        // Обновим основное изображение
        card.image = data.image;

        // Обновим изображения в gate_names, если они есть
        if (data.gates && card.gate_names) {
          card.gate_names = card.gate_names.map((gate, index) => ({
            ...gate,
            image: data.gates[index] || gate.image,
          }));
        }

        await card.save();
        console.log(`Обновлена карточка: ${slug}`);
        return card;
      })
    );

    console.log('Все карточки обновлены!');
    process.exit(0);
  } catch (err) {
    console.error('Ошибка выполнения скрипта:', err);
    process.exit(1);
  }
}

main();

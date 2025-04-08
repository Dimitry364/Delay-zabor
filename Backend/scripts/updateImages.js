import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Card from './models/Card.js';

dotenv.config();

const imageMap = {
  'zabor-iz-profnastila': {
    image: '/images/mainImage/profnastil.png',
    gates: [
      '/images/profnastil/otkatvorota.jpg',
      '/images/profnastil/kalitka.jpg',
      '/images/profnastil/raspVorota.jpg',
      '/images/profnastil/otkatvorotaSKalitkoi.jpg',
    ],
  },
  'zabor-iz-proftruby': {
    image: '/images/mainImage/proftruba.png',
    gates: [],
  },
  'zabor-iz-evroshtaketnika': {
    image: '/images/mainImage/euroShtaket.png',
    gates: [],
  },
  'zabor-iz-setki-rabitsa': {
    image: '/images/mainImage/setkarabica.png',
    gates: [],
  },
  'zabor-iz-polikarbonata': {
    image: '/images/mainImage/policarbonat.png',
    gates: [],
  },
  'zabor-kovkoy': {
    image: '/images/mainImage/kovka.png',
    gates: [],
  },
  'zabor-3d': {
    image: '/images/mainImage/3d.png',
    gates: [],
  },
};

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Подключение к MongoDB успешно');

    const updates = await Promise.all(
      Object.entries(imageMap).map(async ([slug, data]) => {
        const card = await Card.findOne({ slug });

        if (!card) {
          console.warn(`⚠️ Карточка со slug "${slug}" не найдена`);
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
        console.log(`✅ Обновлена карточка: ${slug}`);
        return card;
      })
    );

    console.log('🎉 Все карточки обновлены!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка выполнения скрипта:', err);
    process.exit(1);
  }
}

main();

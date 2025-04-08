// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import cardsRouter from './routes/cards.js';
import reviewsRouter from './routes/reviews.js';
import orderRouter from './routes/order.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 7007;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB подключена'))
  .catch((err) => console.error('❌ Ошибка подключения MongoDB:', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Роуты
app.use('/images', express.static(path.join(__dirname, 'public/image')));
app.use('/cards', cardsRouter);
app.use('/reviews', reviewsRouter);
app.use('/order', orderRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

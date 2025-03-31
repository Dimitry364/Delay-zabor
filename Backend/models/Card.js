import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema(
  {
    name: String,
    nameDetails: String,
    installation_price: String,
    turnkey_price: String,
    image: String,
    specifications: mongoose.Schema.Types.Mixed,
    colors: mongoose.Schema.Types.Mixed,
    gate_names: [
      {
        name: String,
        image: String,
      },
    ],
    advantages: [
      {
        title: String,
        description: String,
      },
    ],
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Card', cardSchema);

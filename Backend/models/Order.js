import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);

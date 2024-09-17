import mongoose from 'mongoose';

const MerchandiseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});

export default mongoose.models.Merchandise || mongoose.model('Merchandise', MerchandiseSchema);

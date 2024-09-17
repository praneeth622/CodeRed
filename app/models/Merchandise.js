import mongoose from 'mongoose';

import { v4 as uuidv4 } from 'uuid';  // Import UUID to generate unique ids

const MerchandiseSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: uuidv4, // Automatically generate a unique id using UUID
    unique: true 
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});

export default mongoose.models.Merchandise || mongoose.model('Merchandise', MerchandiseSchema);

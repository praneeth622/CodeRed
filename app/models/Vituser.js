import mongoose from 'mongoose';

const VituserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Vituser || mongoose.model('Vituser', VituserSchema);

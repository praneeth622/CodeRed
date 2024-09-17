import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const EventSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4, // Automatically generates a UUID using uuidv4
    unique: true, // Ensure that each ID is unique
  },
  eventName: { type: String, required: true }, // Event Name
  description: { type: String, required: true }, // Description
  eventType: {
    type: String,
    enum: ['Festivals', 'Competitions', 'Performance', 'Workshop'], // Type of Event
    required: true,
  },
  price: { type: Number, required: true }, // Price
  schedule: {
    date: { type: String, required: true }, // Schedule Date
    startTime: { type: String, required: true }, // Start Time
    endTime: { type: String, required: true }, // End Time
  },
  coordinators: [
    { type: String, required: true }, // Coordinator 1 (required)
    { type: String }, // Coordinator 2 (optional)
    { type: String }, // Coordinator 3 (optional)
  ],
  eventImage: { type: String, required: true }, // Event Image URL
});

// Export the model
export default mongoose.models.Event || mongoose.model('Event', EventSchema);

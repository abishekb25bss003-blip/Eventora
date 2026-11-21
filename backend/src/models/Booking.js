import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, default: '' },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Contacted', 'Confirmed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);

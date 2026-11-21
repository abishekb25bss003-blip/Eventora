import mongoose from 'mongoose';

const eventThemeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, default: 'Wedding' },
  text: { type: String, required: true },
  tag: { type: String, default: '' },
  price: { type: Number, default: 50000 },
  gradient: { type: String, default: 'linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)' },
  iconType: { type: String, default: 'wedding' }, // 'wedding' | 'reception' | 'engagement' | 'birthday' | 'baby' | 'corporate'
  image: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('EventTheme', eventThemeSchema);

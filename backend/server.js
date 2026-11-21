import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Booking from './src/models/Booking.js';
import EventTheme from './src/models/EventTheme.js';

// Ensure .env is loaded from the backend directory regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Configure CORS to support frontend dev servers (5173, 5174, etc.)
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. Postman, curl, health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    app: 'Eventora API',
    database: isConnected ? 'connected' : 'disconnected',
    message: isConnected 
      ? 'MongoDB is connected and ready.' 
      : 'MongoDB is not connected. Please check MONGO_URI in backend/.env'
  });
});

// Seed default event themes if none exist
const initialThemes = [
  {
    title: 'Royal Wedding Celebration',
    category: 'Wedding',
    tag: 'Grand Mandap',
    price: 150000,
    text: 'Opulent golden floral mandaps, sacred rituals, and ambient palace lighting.',
    gradient: 'linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)',
    iconType: 'wedding'
  },
  {
    title: 'Luxury Evening Reception',
    category: 'Wedding',
    tag: 'Banquet & Stage',
    price: 120000,
    text: 'Illuminated crystal chandeliers, candlelit tables and an unforgettable gala stage.',
    gradient: 'linear-gradient(135deg, #1a1d28 0%, #0d0f15 100%)',
    iconType: 'reception'
  },
  {
    title: 'Intimate Engagement',
    category: 'Wedding',
    tag: 'Floral Arbor',
    price: 60000,
    text: 'Romantic blush ring exchange setting with botanical greenery and soft acoustics.',
    gradient: 'linear-gradient(135deg, #2a1824 0%, #130a10 100%)',
    iconType: 'engagement'
  },
  {
    title: 'Milestone Birthday Party',
    category: 'Celebration',
    tag: 'Themed Decor',
    price: 45000,
    text: 'Bespoke neon backdrops, multi-tier cake styling, balloon arches, and live DJ booth.',
    gradient: 'linear-gradient(135deg, #2a1a10 0%, #130d08 100%)',
    iconType: 'birthday'
  },
  {
    title: 'Whimsical Baby Shower',
    category: 'Celebration',
    tag: 'Pastel Joy',
    price: 35000,
    text: 'Soft clouds, pastel balloon installations, teddy accents, and photo memories.',
    gradient: 'linear-gradient(135deg, #1c222c 0%, #0f131a 100%)',
    iconType: 'baby'
  },
  {
    title: 'Corporate Gala & Summit',
    category: 'Professional',
    tag: 'Keynote & Gala',
    price: 90000,
    text: 'Polished executive conference stages, VIP networking lounges, and LED backdrops.',
    gradient: 'linear-gradient(135deg, #171c24 0%, #0d1015 100%)',
    iconType: 'corporate'
  }
];

async function seedDefaultThemes() {
  try {
    const count = await EventTheme.countDocuments();
    if (count === 0) {
      await EventTheme.insertMany(initialThemes);
      console.log('🌱 Seeded 6 initial Event Themes into MongoDB');
    }
  } catch (err) {
    console.error('Error seeding themes:', err.message);
  }
}

// ==================== EVENT THEMES API ====================

// Get all event themes
app.get('/api/themes', async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(initialThemes);
    }
    const themes = await EventTheme.find().sort({ createdAt: -1 });
    res.json(themes.length > 0 ? themes : initialThemes);
  } catch (error) {
    console.error('Error fetching themes:', error);
    res.json(initialThemes);
  }
});

// Create new event theme
app.post('/api/themes', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected.' });
    }
    const { title, category, text, tag, price, gradient, iconType, image } = req.body;
    if (!title || !category || !text) {
      return res.status(400).json({ message: 'Title, category, and description are required.' });
    }
    const theme = await EventTheme.create({
      title,
      category,
      text,
      tag: tag || category,
      price: Number(price) || 50000,
      gradient: gradient || 'linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)',
      iconType: iconType || 'wedding',
      image: image || ''
    });
    res.status(201).json({ message: 'Event theme added successfully!', theme });
  } catch (error) {
    console.error('Error creating event theme:', error);
    res.status(500).json({ message: error.message || 'Could not save event theme.' });
  }
});

// Delete an event theme
app.delete('/api/themes/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected.' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid theme ID.' });
    }
    const theme = await EventTheme.findByIdAndDelete(req.params.id);
    if (!theme) return res.status(404).json({ message: 'Theme not found.' });
    res.json({ message: 'Event theme removed successfully.', id: req.params.id });
  } catch (error) {
    console.error('Error deleting theme:', error);
    res.status(500).json({ message: error.message || 'Could not delete theme.' });
  }
});

// ==================== BOOKINGS API ====================

// Create new booking
app.post('/api/bookings', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database is not connected. Please check your MongoDB Atlas MONGO_URI in backend/.env.'
      });
    }

    const { name, email, phone, eventType, eventDate, location, message } = req.body;
    if (!name || !email || !eventType || !eventDate) {
      return res.status(400).json({ message: 'Name, email, event type and date are required.' });
    }
    const booking = await Booking.create({ name, email, phone, eventType, eventDate, location, message });
    res.status(201).json({ message: 'Booking request submitted!', booking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: error.message || 'Could not save booking.' });
  }
});

// Get all bookings (admin protected)
app.get('/api/bookings', async (req, res) => {
  try {
    if (!process.env.ADMIN_KEY || req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected.' });
    }
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: error.message || 'Could not fetch bookings.' });
  }
});

// Update booking status (admin protected)
app.patch('/api/bookings/:id/status', async (req, res) => {
  try {
    if (!process.env.ADMIN_KEY || req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected.' });
    }
    const allowed = ['Pending', 'Contacted', 'Confirmed', 'Cancelled'];
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid status. Allowed values: ' + allowed.join(', ') });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid booking ID.' });
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: error.message || 'Could not update status.' });
  }
});

// Delete booking (admin protected)
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    if (!process.env.ADMIN_KEY || req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected.' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid booking ID.' });
    }
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json({ message: 'Booking deleted successfully.', id: req.params.id });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: error.message || 'Could not delete booking.' });
  }
});

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

// Start HTTP server immediately so app and endpoints are accessible
app.listen(port, () => {
  console.log(`🚀 Eventora API server running on http://localhost:${port}`);
  console.log(`🩺 Health check: http://localhost:${port}/api/health`);
});

// Connect to MongoDB (Atlas or local)
if (!mongoUri) {
  console.warn('\n⚠️ WARNING: MONGO_URI is missing from backend/.env');
  console.warn('Set MONGO_URI in backend/.env to connect to MongoDB Atlas.\n');
} else {
  mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log('✅ Connected to MongoDB successfully');
      seedDefaultThemes();
    })
    .catch(err => {
      console.error('\n⚠️ MongoDB connection failed:', err.message);
      if (err.message.includes('bad auth') || err.message.includes('Authentication failed')) {
        console.error('👉 Hint: Check your database username and password in MONGO_URI.');
      } else if (err.message.includes('querySrv') || err.message.includes('Server selection timed out') || err.message.includes('ENOTFOUND')) {
        console.error('👉 Hint: Make sure your IP is allowed in MongoDB Atlas:');
        console.error('   Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0)');
      } else if (err.message.includes('ECONNREFUSED') || err.message.includes('EACCES')) {
        console.error('👉 Hint: Local MongoDB is not running.');
        console.error('   To connect to MongoDB Atlas, update MONGO_URI in backend/.env with your Atlas string:');
        console.error('   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/eventora?retryWrites=true&w=majority');
      }
      console.error('');
    });
}

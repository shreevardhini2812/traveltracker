import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import tripRoutes from './routes/trips.js';
import placeRoutes from './routes/places.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/places', placeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

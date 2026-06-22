import dns from 'dns';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import authRoutes from './routes/auth.js'
import todoRoutes from './routes/todos.js'
import spaceRoutes from './routes/spaces.js'
import meetingRoutes from './routes/meetings.js'

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://calendarrr-navy.vercel.app'],
  credentials: true
}));

dns.setServers(['1.1.1.1', '1.0.0.1']);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/meetings', meetingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
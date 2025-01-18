import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import noteRoutes from './src/routes/noteRoutes.js';
import connectToMongoDB from './src/config/db.js';
import bodyParser from 'body-parser';
dotenv.config();

connectToMongoDB();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Start server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

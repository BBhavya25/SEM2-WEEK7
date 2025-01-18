import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes/userRoute.js';
import connectToMongoDB from './src/config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5500',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// MongoDB Connection
connectToMongoDB();

// Routes
app.use('/api/users', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

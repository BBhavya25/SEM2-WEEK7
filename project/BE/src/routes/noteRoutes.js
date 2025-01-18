import express from 'express';
import jwt from 'jsonwebtoken';
import { createNote } from '../controller/noteController.js';
const router = express.Router();

// Middleware to check JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });

    req.userId = decoded.userId;
    next();
  });
};

router.post('/', authenticateJWT, createNote);

export default router;

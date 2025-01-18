import express from 'express';
import { signUpUser, logInUser } from '../controller/userController.js';

const router = express.Router();

router.post('/signupUser', signUpUser);
router.post('/loginUser', logInUser);

export default router;

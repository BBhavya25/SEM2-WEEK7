import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie for session persistence
    res.cookie('jwt', token, {
      httpOnly: true, // Token can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 60 * 60 * 1000, // 1 hour expiration time
      sameSite: 'Strict', // Cookie is only sent in same-site requests
    });

    // Send a success response
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie for session persistence
    res.cookie('jwt', token, {
      httpOnly: true, // Token can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 60 * 60 * 1000, // 1 hour expiration time
      sameSite: 'Strict', // Cookie is only sent in same-site requests
    });

    // Send a success response
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export { signupUser, loginUser };

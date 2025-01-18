import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userSchema.js';

const signUpUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        console.error("Error in signUpUser:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

        res.json({ message: "Login Successful", token });
    } catch (error) {
        console.error("Error in logInUser:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

export { signUpUser, logInUser };

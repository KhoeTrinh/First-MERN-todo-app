import User from '../models/usersModals.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';

const createUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: 'Please fill all required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(404)
                .json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        try {
            await newUser.save();
            res.json({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    } catch (err) {
        console.error('Failed to create user');
        res.status(500).json({ message: err.message });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide both email and password',
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const isValidPassword = await bcrypt.compare(
                password,
                existingUser.password
            );

            if(isValidPassword) {
                res.json({
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    isAdmin: existingUser.isAdmin,
                    token,
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export { createUser, loginUser };

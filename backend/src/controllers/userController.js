import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = 'bookbazar-secret-key-2024';

// Helper function to generate a JWT token
const generateToken = (user) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};

// Register a new user with 'user' role
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const newUser = new User({
            username,
            password,
            role: "user"
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Server error during user registration." });
    }
};

// Register a new admin with 'admin' role
const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const newAdmin = new User({
            username,
            password,
            role: "admin"
        });

        await newAdmin.save();

        res.status(201).json({
            message: "Admin registered successfully.",
            user: {
                username: newAdmin.username,
                role: newAdmin.role
            }
        });
    } catch (error) {
        console.error("Error during admin registration:", error);
        res.status(500).json({ message: "Server error during admin registration." });
    }
};

// Login for regular users
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const user = await User.findOne({ username, role: 'user' });
        if (!user) {
            return res.status(404).json({ message: "User not found or is not a regular user." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Failed to login:", error);
        if (error.message === 'JWT_SECRET_KEY is not defined in environment variables') {
            return res.status(500).json({ message: "Server configuration error. Please contact administrator." });
        }
        return res.status(500).json({ message: "Server error during login." });
    }
};

// Login for admin users
const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    
    try {
        
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({ message: "User exists but is not an admin." });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        if (!JWT_SECRET) {
            console.error('JWT_SECRET_KEY is not defined in environment variables');
            return res.status(500).json({ 
                message: "Server configuration error. JWT_SECRET_KEY is missing." 
            });
        }

        const token = generateToken(admin);

        return res.status(200).json({
            message: "Admin login successful.",
            token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Failed to login as admin. Error:", error);
        if (error.message === 'JWT_SECRET_KEY is not defined in environment variables') {
            return res.status(500).json({ 
                message: "Server configuration error. JWT_SECRET_KEY is missing." 
            });
        }
        return res.status(500).json({ message: "Server error during admin login." });
    }
};

export {
    adminLogin, login, registerAdmin, registerUser
};


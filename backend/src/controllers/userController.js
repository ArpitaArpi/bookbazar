import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Login function for regular users
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        
        // Compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password!" });
        }
        
        // Create JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Failed to login:", error);
        return res.status(500).send({ message: "Failed to login" });
    }
};

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }
        
        // Create new user
        const newUser = new User({
            username,
            password, // Will be hashed by pre-save hook
            role: role || "user" // Default to "user" if role is not specified
        });
        
        await newUser.save();
        
        res.status(201).json({
            message: "User created successfully",
            user: {
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user" });
    }
};

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found!" });
        }
        // Compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password!" });
        }
        
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role }, 
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
        
    } catch (error) {
        console.error("Failed to login as admin", error);
        return res.status(401).send({ message: "Failed to login as admin" }); 
    }
};

// Use registerUser as registerAdmin function
const registerAdmin = registerUser;

export {
    adminLogin, login, registerAdmin, registerUser
};


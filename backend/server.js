import dotenv from 'dotenv';

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import adminRoutes from './src/routes/adminRoutes.js';
import bookRoutes from './src/routes/bookRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

// API Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Root route
app.use("/", (req, res) => {
    res.send("Book Bazar Server is running!");
});

// Database Connection and Server Start
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully!");
        
        app.listen(port, () => {
            console.log(`Book Bazar API listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

// Start the server
startServer();

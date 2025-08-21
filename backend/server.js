import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import adminRoutes from "./src/routes/adminRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";
import couponRoutes from "./src/routes/couponRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// API Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes); 
app.use("/api/coupons", couponRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Book Bazar Server is running!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
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

startServer();

import express from "express";
import { createReview, getReviews, getReviewsByBook } from "../controllers/reviewController.js";

const router = express.Router();

// Create review
router.post("/", createReview);

// Get all reviews
router.get("/", getReviews);

// Get reviews for a specific book
router.get("/book/:bookId", getReviewsByBook);

export default router;

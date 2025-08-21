import Review from "../models/reviewModel.js";

// @desc    Create a new review
// @route   POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { user, book, rating, comment } = req.body;

    if (!user || !book || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = await Review.create({ user, book, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "username").populate("book", "title");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a specific book
// @route   GET /api/reviews/book/:bookId
export const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId })
      .populate("user", "username")
      .populate("book", "title");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import express from 'express';
import {
    deleteABook,
    getAllBooks,
    getBestSellers,
    getNewArrivals,
    getSingleBook,
    getSpecialOffers,
    postABook,
    updateBook
} from '../controllers/bookController.js';

const router = express.Router();

// post a book
router.post("/create-book", postABook);

// best sellers
router.get("/best-sellers", getBestSellers);

// new arrivals
router.get("/new-arrivals", getNewArrivals);

// special offers
router.get("/special-offers", getSpecialOffers);

// get all books
router.get("/", getAllBooks);

// single book 
router.get("/:id", getSingleBook);

// update a book 
router.put("/edit/:id", updateBook);

// delete a book 
router.delete("/:id", deleteABook);

export default router;

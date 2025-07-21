import express from 'express';
import { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } from '../controllers/bookController.js';
import { verifyAdminToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

// post a book
router.post("/create-book", verifyAdminToken, postABook);

// get all books
router.get("/", getAllBooks);

// single book 
router.get("/:id", getSingleBook);

// update a book 
router.put("/edit/:id", verifyAdminToken, updateBook);

// delete a book 
router.delete("/:id", verifyAdminToken, deleteABook);

export default router;

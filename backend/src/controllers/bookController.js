import Book from "../models/bookModel.js";

// Create a book
const postABook = async (req, res) => {
    try {
        const bookData = { ...req.body };

        // Automatically set specialOffer if discount > 0
        if (bookData.discount && bookData.discount > 0) {
            bookData.specialOffer = true;
        } else {
            bookData.specialOffer = false;
        }

        const newBook = new Book(bookData);
        await newBook.save();
        res.status(200).send({ message: "Book posted successfully", book: newBook });
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({ message: "Failed to create book" });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const query = {};
        if (req.query.category) query.category = req.query.category;
        if (req.query.trending) query.trending = req.query.trending === "true";

        const books = await Book.find(query).sort({ createdAt: -1 });
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
};

// Get single book
const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).send({ message: "Book not found!" });
        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({ message: "Failed to fetch book" });
    }
};

// Update book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Automatically update specialOffer based on discount
        if (updateData.discount !== undefined) {
            updateData.specialOffer = updateData.discount > 0;
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBook) return res.status(404).send({ message: "Book not found!" });
        res.status(200).send({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).send({ message: "Failed to update book" });
    }
};

// Delete book
const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) return res.status(404).send({ message: "Book not found!" });
        res.status(200).send({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).send({ message: "Failed to delete book" });
    }
};

// Get best sellers (top 5 by reviewCount)
const getBestSellers = async (req, res) => {
    try {
        const books = await Book.find().sort({ reviewCount: -1 }).limit(5);
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching best sellers", error);
        res.status(500).send({ message: "Failed to fetch best sellers" });
    }
};

// Get new arrivals (top 5 by createdAt)
const getNewArrivals = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching new arrivals", error);
        res.status(500).send({ message: "Failed to fetch new arrivals" });
    }
};

// Get special offers (books with discount > 0)
const getSpecialOffers = async (req, res) => {
    try {
        const books = await Book.find({ discount: { $gt: 0 } }).sort({ discount: -1 }).limit(5);
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching special offers", error);
        res.status(500).send({ message: "Failed to fetch special offers" });
    }
};

export {
    deleteABook,
    getAllBooks,
    getBestSellers,
    getNewArrivals,
    getSingleBook,
    getSpecialOffers,
    postABook,
    updateBook
};

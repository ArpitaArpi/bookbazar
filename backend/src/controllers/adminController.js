import Book from '../models/bookModel.js';

const getAdminStats = async (req, res) => {
    try {
        // Trending books statistics: 
        const trendingBooksCount = await Book.aggregate([
            { $match: { trending: true } },  // Match only trending books
            { $count: "trendingBooksCount" }  // Return the count of trending books
        ]);
        
        // If you want just the count as a number, you can extract it like this:
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        // Total number of books
        const totalBooks = await Book.countDocuments();

        // Result summary
        res.status(200).json({
            trendingBooks,
            totalBooks
        });
      
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
};

export {
    getAdminStats
};

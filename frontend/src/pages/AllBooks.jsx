import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = ({ darkMode }) => {
  const [books, setBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5001/api/books/")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  const filteredBooks = search
    ? books.filter(
        (book) =>
          (book.title && book.title.toLowerCase().includes(search)) ||
          (book.author && book.author.toLowerCase().includes(search)) ||
          (book.category && book.category.toLowerCase().includes(search))
      )
    : books;

  const sortedBooks = [...filteredBooks].sort(
    (a, b) => (b.trending === true) - (a.trending === true)
  );

  const handleEdit = (book) => toast.info(`Edit book: ${book.title}`);
  const handleAddToCart = (book) => toast.success(`Added to cart: ${book.title}`);

  return (
    <section className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen py-20`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center mb-12 drop-shadow-lg">
          Explore Our Collection
        </h1>

        <div
          className="grid gap-8 justify-center w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            maxWidth: "1200px",
          }}
        >
          {sortedBooks.map((book) => (
            <BookCard
              key={book._id}
              id={book._id}
              title={book.title}
              author={book.author}
              price={book.price}
              coverImageUrl={book.coverImageUrl}
              category={book.category}
              trending={book.trending}
              onEdit={() => handleEdit(book)}
              onAddToCart={() => handleAddToCart(book)}
            />
          ))}
        </div>
        
        {sortedBooks.length === 0 && (
          <div className="text-center text-lg mt-12 text-gray-500 dark:text-gray-300">
            No books found. Try searching for something else!
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooks;

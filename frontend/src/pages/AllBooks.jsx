import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
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

  // Sort the books by tending tags
  const sortedBooks = [...filteredBooks].sort(
    (a, b) => (b.trending === true) - (a.trending === true)
  );

  
  const handleEdit = (book) => toast.info(`Edit book: ${book.title}`);
  const handleAddToCart = (book) => toast.success(`Added to cart: ${book.title}`);

  return (
    <section className="bg-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          All Our Books
        </h1>
        <div
          className="grid gap-6 justify-center w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
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
          <div className="text-center text-lg text-gray-600 mt-12">
            No books found.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooks;

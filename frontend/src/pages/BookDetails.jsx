import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5001/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading...</div>;
  }

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Book not found.</div>;
  }

  return (
    <section className="min-h-screen bg-white py-20">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-base-200 p-8 flex flex-col items-center">
        <img
          src={book.coverImageUrl || 'https://placehold.co/220x300?text=No+Image'}
          alt={book.title}
          className="object-contain h-64 w-auto rounded-xl mb-6 bg-base-200"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{book.title}</h1>
        <p className="text-md text-gray-600 mb-2 text-center">by <span className="font-medium">{book.author}</span></p>
        {book.category && <span className="badge badge-info badge-outline px-3 py-1 text-sm mb-4">{book.category}</span>}
        <p className="text-primary font-bold text-xl mb-4">{book.price ? `৳${book.price}` : "Price on request"}</p>
        <div className="w-full border-t border-base-200 my-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 w-full text-left">Description</h2>
        <p className="text-gray-600 text-justify w-full mb-2">{book.description || 'No description available.'}</p>
      </div>
    </section>
  );
};

export default BookDetails; 
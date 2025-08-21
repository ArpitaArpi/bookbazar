import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5001/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Book not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
        {/* Book Image */}
        <img
          src={book.coverImageUrl || "https://placehold.co/220x300?text=No+Image"}
          alt={book.title}
          className="h-80 md:h-96 w-auto rounded-lg shadow-md"
        />

        {/* Book Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-gray-700 mb-4">{book.description || "No description available."}</p>
            {book.category && (
              <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {book.category}
              </span>
            )}
          </div>

          {/* Price & Order Button */}
          <div className="mt-4 flex flex-col gap-4">
            <span className="text-2xl font-bold text-indigo-700">
              {book.price ? `$${book.price}` : "Contact for price"}
            </span>

            <button
              onClick={() => navigate(`/order/${book._id}`)}
              className="w-full bg-green-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-600 transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;

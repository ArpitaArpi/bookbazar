

import { FaCartPlus, FaEdit, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookCard = ({
  id,
  title,
  author,
  price,
  coverImageUrl,
  category,
  trending,
  onEdit,
  onAddToCart,
}) => {
  return (
    <div className="relative group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Trending Badge */}
      {trending && (
        <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <FaFire /> Trending
        </span>
      )}

      {/* Book Image */}
      <div className="h-64 overflow-hidden rounded-t-2xl">
        <img
          src={coverImageUrl || "https://placehold.co/220x300?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Book Info */}
      <div className="p-5 flex flex-col justify-between h-60">
        <div>
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{title}</h2>
          <p className="text-gray-500 text-sm mb-2">by {author}</p>
          {category && (
            <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>

        {/* Price + Actions */}
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-lg font-bold text-indigo-700">
            {price ? `$${price}` : "Contact for price"}
          </span>

          {/* Buttons */}
          <div className="flex justify-between items-center gap-2">
            <Link
              to={`/books/${id}`}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
            >
              View Details
            </Link>

            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                <FaEdit className="text-gray-600" />
              </button>
              <button
                onClick={onAddToCart}
                className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition"
              >
                <FaCartPlus className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

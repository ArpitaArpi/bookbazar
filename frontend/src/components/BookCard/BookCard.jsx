import { FaCartPlus, FaEdit, FaEye, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookCard = ({ title, author, price, coverImageUrl, id, category, trending, onEdit, onAddToCart }) => {
  return (
    <div className="bg-white w-72 min-h-[520px] rounded-2xl shadow-lg border border-base-200 p-4 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-50 relative">
      {trending && (
        <span className="absolute top-4 right-4 badge badge-warning flex items-center gap-1 text-xs font-semibold px-3 py-1 z-10">
          <FaFire className="text-orange-500" /> Trending
        </span>
      )}
      <figure className="mb-4 w-full flex justify-center h-56 bg-base-200 rounded-xl overflow-hidden">
        <img
          src={coverImageUrl || 'https://placehold.co/220x300?text=No+Image'}
          alt={title}
          className="object-contain h-full w-auto"
        />
      </figure>
      <h2 className="font-bold text-lg text-gray-800 text-center mb-1 line-clamp-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-2 text-center">{author && <>by <span className="font-medium">{author}</span></>}</p>
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {category && <span className="badge badge-info badge-outline px-3 py-1 text-sm">{category}</span>}
      </div>
      <p className="text-primary font-bold text-xl mb-4">{price ? `৳${price}` : "Price on request"}</p>
      <div className="flex-grow" />
      <div className="flex flex-col gap-2 w-full mt-auto">
        <button className="btn btn-primary btn-sm w-full flex items-center gap-2" onClick={onAddToCart}>
          <FaCartPlus /> Add to Cart
        </button>
        <button className="btn btn-warning btn-sm w-full flex items-center gap-2" onClick={onEdit}>
          <FaEdit /> Edit
        </button>
        <Link to={`/books/${id}`} className="btn btn-outline btn-sm w-full flex items-center gap-2">
          <FaEye /> View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
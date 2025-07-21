import { useEffect, useState } from "react";
import { FaBookOpen, FaShippingFast, FaStar, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BookCard from "../components/BookCard/BookCard";

const whyChoose = [
  {
    icon: <FaBookOpen className="text-4xl text-primary mb-2" />, title: "Curated Bangla Books", desc: "A handpicked collection of the best Bangla literature and new releases."
  },
  {
    icon: <FaShippingFast className="text-4xl text-primary mb-2" />, title: "Fast Delivery", desc: "Get your books delivered quickly and safely anywhere in Bangladesh."
  },
  {
    icon: <FaUsers className="text-4xl text-primary mb-2" />, title: "Community Reviews", desc: "Read honest reviews and ratings from real readers."
  },
  {
    icon: <FaStar className="text-4xl text-primary mb-2" />, title: "Trusted & Secure", desc: "Safe payments and a trusted platform for book lovers."
  },
];

const testimonials = [
  {
    name: "Rahim Uddin",
    text: "BookBazar is my go-to for Bangla books. Fast delivery and great selection!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sumaiya Akter",
    text: "I love the community reviews. Helped me find my new favorite author!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Tanvir Hasan",
    text: "Very easy to use and the customer service is excellent.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  },
];

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/books/")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  // Sort trending books first
  const sortedBooks = [...books].sort((a, b) => (b.trending === true) - (a.trending === true));

  const isTrending = books.some(book => book.trending === true);
  const sectionTitle = isTrending ? 'Trending Books' : 'Featured Books';

  // Toast handlers
  const handleEdit = (book) => toast.info(`Edit book: ${book.title}`);
  const handleAddToCart = (book) => toast.success(`Added to cart: ${book.title}`);

  return (
    <>
      <section className="bg-white min-h-screen py-20">
        <div className="flex flex-col items-center w-full px-4">
          <h1 className="text-4xl font-bold mb-12 text-gray-800">{sectionTitle}</h1>
          <div className="grid gap-4 justify-center"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              width: '100%'
            }}>
            {sortedBooks.slice(0, 6).map(book => (
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
          <div className="text-center mt-16">
            <Link to="/all-books" className="btn btn-primary btn-lg shadow-lg">
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white border-t border-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose BookBazar?</h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="bg-white w-72 min-h-[220px] rounded-2xl shadow-lg border border-base-200 p-8 flex flex-col items-center text-center mx-auto">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white border-t border-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Readers Say</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white w-80 rounded-2xl shadow-lg border border-base-200 p-8 flex flex-col items-center text-center mx-auto">
                <div className="avatar mb-4">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={t.avatar} alt={t.name} />
                  </div>
                </div>
                <p className="italic mb-2 text-gray-600">"{t.text}"</p>
                <h4 className="font-semibold text-primary">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
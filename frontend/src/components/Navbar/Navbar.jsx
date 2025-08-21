import { useState } from "react";
import { FaBars, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const links = [
  { title: "Home", link: "/" },
  { title: "All Books", link: "/all-books" },
  { title: "About", link: "/about" },
];

const Navbar = ({ darkMode, setDarkMode }) => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/all-books?search=${encodeURIComponent(search)}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-wide"
          >
            <span className="bg-yellow-300 text-indigo-700 px-2 py-1 rounded-lg shadow-md">
              📚
            </span>
            BookBazar
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8 ml-6">
            <ul className="flex gap-8 items-center">
              {links.map((item) => (
                <li key={item.link}>
                  <Link
                    className="hover:text-yellow-300 transition font-medium"
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              {/* Mega Menu */}
              <li
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button className="hover:text-yellow-300 transition font-medium flex items-center gap-1">
                  Categories <span className="text-xs">▼</span>
                </button>

                {megaOpen && (
                  <div className="absolute left-0 top-full mt-3 w-[650px] bg-white/90 backdrop-blur-md text-black shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6 border border-gray-200">
                    <div>
                      <h4 className="font-bold mb-3 text-indigo-600">Fiction</h4>
                      <ul className="space-y-2">
                        <li><Link to="/category/romance">Romance</Link></li>
                        <li><Link to="/category/mystery">Mystery</Link></li>
                        <li><Link to="/category/fantasy">Fantasy</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-indigo-600">Non-Fiction</h4>
                      <ul className="space-y-2">
                        <li><Link to="/category/self-help">Self-Help</Link></li>
                        <li><Link to="/category/business">Business</Link></li>
                        <li><Link to="/category/history">History</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-indigo-600">Kids</h4>
                      <ul className="space-y-2">
                        <li><Link to="/category/comics">Comics</Link></li>
                        <li><Link to="/category/educational">Educational</Link></li>
                        <li><Link to="/category/fairy-tales">Fairy Tales</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white rounded-full overflow-hidden shadow-md"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 w-56 md:w-72 text-black outline-none"
                placeholder="Search books..."
              />
              <button
                type="submit"
                className="bg-yellow-300 text-black px-4 py-2 hover:brightness-110"
              >
                <FaSearch />
              </button>
            </form>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <Link
              to="/login"
              className="px-4 py-2 border border-white rounded-full hover:bg-yellow-300 hover:text-black transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-yellow-300 text-black rounded-full hover:brightness-110 transition font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 bg-white/20 rounded-full"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-indigo-600 to-purple-700 p-6 space-y-6 shadow-lg">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full overflow-hidden"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 flex-1 text-black outline-none"
              placeholder="Search books..."
            />
            <button
              type="submit"
              className="bg-yellow-300 text-black px-4 py-2 hover:brightness-110"
            >
              <FaSearch />
            </button>
          </form>

          {/* Links */}
          <ul className="flex flex-col gap-4 text-lg font-medium">
            {links.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className="hover:text-yellow-300 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <details>
                <summary className="cursor-pointer">Categories</summary>
                <ul className="pl-4 mt-2 space-y-2">
                  <li><Link to="/category/romance">Romance</Link></li>
                  <li><Link to="/category/mystery">Mystery</Link></li>
                  <li><Link to="/category/fantasy">Fantasy</Link></li>
                  <li><Link to="/category/self-help">Self-Help</Link></li>
                  <li><Link to="/category/business">Business</Link></li>
                </ul>
              </details>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <Link
              to="/login"
              className="px-4 py-2 border border-white rounded-full hover:bg-yellow-300 hover:text-black flex-1 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-yellow-300 text-black rounded-full hover:brightness-110 flex-1 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

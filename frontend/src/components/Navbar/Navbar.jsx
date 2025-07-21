import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const links = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about" },
  { title: "All Books", link: "/all-books" },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary btn btn-ghost normal-case px-2 hover:bg-primary/10 hover:text-primary transition">BookBazar</Link>
          </div>
          {/* Desktop Links & Search */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            <ul className="menu menu-horizontal px-1 gap-4">
             
              {links.map((item) => (
                <li key={item.link}>
                  <Link to={item.link} className="font-semibold text-gray-800 hover:text-primary transition">{item.title}</Link>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSearch} className="flex items-center ml-8">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input input-bordered rounded-full w-56 md:w-72 focus:outline-primary bg-white text-gray-800"
                placeholder="Search books..."
              />
              <button type="submit" className="btn btn-primary ml-2 rounded-full shadow hover:scale-105 transition">
                <FaSearch />
              </button>
            </form>
          </div>


          {/* Desktop Actions */}
          <div className="hidden lg:flex gap-3">
            <Link to="/login" className="btn btn-outline btn-primary hover:bg-primary hover:text-white transition">Login</Link>
            <Link to="/signup" className="btn btn-primary hover:brightness-110 transition">Sign Up</Link>
          </div>

          
          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <FaBars className="text-xl text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      
      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <ul className="menu menu-vertical px-4 pt-2 pb-2 gap-1">
            {links.map((item) => (
              <li key={item.link}>
                <Link to={item.link} onClick={() => setMenuOpen(false)} className="hover:text-primary text-gray-800 transition">{item.title}</Link>
              </li>
            ))}
            <li>
              <form onSubmit={handleSearch} className="flex items-center mt-2">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input input-bordered w-full rounded-full focus:outline-primary bg-white text-gray-800"
                  placeholder="Search books..."
                />
                <button type="submit" className="btn btn-primary ml-2 rounded-full shadow">
                  <FaSearch />
                </button>
              </form>
            </li>
            <li className="flex gap-2 mt-2">
              <Link to="/login" className="btn btn-outline btn-primary flex-1 hover:bg-primary hover:text-white transition" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn btn-primary flex-1 hover:brightness-110 transition" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
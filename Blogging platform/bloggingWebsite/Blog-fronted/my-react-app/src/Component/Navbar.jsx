import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate(); // Hook for navigation

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 shadow-md w-full fixed top-0 left-0 z-50">
        <div className="max-w-[90%] mx-auto flex justify-between items-center h-12">
          {/* Logo and Search Bar */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white text-base font-bold tracking-wide">
              ✍️ Blog<span className="text-yellow-400">App</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded-lg overflow-hidden shadow-md">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 text-sm outline-none w-40 md:w-64"
              />
              <button
                type="submit"
                className="bg-blue-500 px-3 py-2 text-white text-sm font-semibold hover:bg-blue-600 transition"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white text-sm font-semibold hover:text-yellow-300 transition">🏠 Home</Link>
            <Link to="/add" className="text-white text-sm font-semibold hover:text-yellow-300 transition">➕ Add Blog</Link>
            <Link to="/User" className="text-white text-sm font-semibold hover:text-yellow-300 transition">UserDashboard</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-3 w-full flex justify-center space-x-4 shadow-md fixed bottom-0 md:relative md:top-16 md:w-full">
      <h2 className="hidden md:block font-semibold">Categories:</h2>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {category.name}
          </Link>
        ))
      ) : (
        <p className="text-gray-700">No categories found.</p>
      )}
    </nav>
  );
};

export default Sidebar;

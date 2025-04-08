import React, { useState, useEffect } from "react";
import { createPost } from "../Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let categoryToUse = selectedCategory;
  
    if (isAddingCategory && newCategory.trim() !== "") {
      try {
        // Add the new category to the database
        const response = await axios.post("http://localhost:8080/categories", {
          name: newCategory,
        });
        categoryToUse = response.data.id; // ✅ Correctly get the new category ID
  
        // Refresh categories list and select the newly added category
        fetchCategories();
        setSelectedCategory(categoryToUse);
      } catch (error) {
        console.error("Error adding new category:", error);
        return;
      }
    }
  
    if (!categoryToUse) {
      console.error("Category ID is missing!");
      return;
    }
  
    const newPost = { 
      title, 
      content, 
      author, 
      categoryId: categoryToUse // ✅ Use categoryId instead of category
    };
  
    createPost(newPost)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error creating post:", error));
  };
  
    

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          ✍️ Add New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Content Textarea */}
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          ></textarea>

          {/* Author Input */}
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Category Dropdown */}
          {!isAddingCategory ? (
            <select
              value={selectedCategory}
              onChange={(e) => {
                if (e.target.value === "add-new") {
                  setIsAddingCategory(true);
                  setSelectedCategory("");
                } else {
                  setSelectedCategory(e.target.value);
                }
              }}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              <option value="add-new">➕ Add New Category</option>
            </select>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter new category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setIsAddingCategory(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                ✖ Cancel
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            🚀 Publish Blog
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBlog;

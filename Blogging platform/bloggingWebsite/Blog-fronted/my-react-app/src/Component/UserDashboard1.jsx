import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard1 = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage or authentication state
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/login"); // Redirect if not logged in
      return;
    }
    setUser(loggedInUser);
    fetchUserBlogs(loggedInUser.id);
  }, []);

  const fetchUserBlogs = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/blogs/my-blogs?userId=${userId}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        {user && (
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-blue-600">Welcome, {user.username}! 🚀</h2>
            <p className="text-gray-600">Your Email: {user.email}</p>
          </div>
        )}

        <h3 className="mb-4 text-xl font-semibold">📚 Your Blog Posts</h3>

        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">You have no blog posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog.id} className="p-4 border rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold">{blog.title}</h4>
                <p className="text-sm text-gray-600">{blog.content.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard1;
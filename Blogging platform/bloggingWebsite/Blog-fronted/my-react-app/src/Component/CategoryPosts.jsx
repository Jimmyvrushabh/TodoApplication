import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleCard from "../Component/ArticleCard";
import Sidebar from "./Sidebar";

const CategoryPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchCategoryPosts();
  }, [id]);

  const fetchCategoryPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/blogs/category/${id}`);
      setPosts(response.data);
      setLoading(false);

      // Fetch category name (Optional)
      const categoryResponse = await axios.get(`http://localhost:8080/categories/${id}`);
      setCategory(categoryResponse.data.name);
    } catch (error) {
      console.error("Error fetching category posts:", error);
      setLoading(false);
    }
  };

  return (
    <>
   
    <div className="container mx-auto px-4 md:px-16 mt-16">
      <h2 className="text-2xl font-semibold mb-4">{category} Blogs</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => <ArticleCard key={post.id} article={post} />)
      ) : (
        <p>No blog posts found in this category.</p>
      )}
    </div>
    </>
  );
};

export default CategoryPosts;

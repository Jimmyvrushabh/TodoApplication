import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../Component/ArticleCard";



const Bloglist = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5); // Number of posts per page

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true); // Set loading before making the request
    try {
      const response = await axios.get(
        `http://localhost:8080/blogs/paginated?page=${page}&size=${size}`
      );
  
      if (response.data && response.data.content) {
        setPosts(response.data.content);
      } else {
        setPosts([]); // Ensure posts state is always an array
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Ensure loading is stopped in case of success or failure
    }
  };
  

  const handleSearch = async () => {
    if (search.trim() === "") {
      fetchPosts();
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/blogs/search?keyword=${search}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <>

    <Dashboard/>
   
    
    <div className="flex flex-col md:flex-row">
      {/* Sidebar on the left (for larger screens) */}
    

     
     

        {/* Blog Articles */}
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => <ArticleCard key={post.id} article={post} />)
        ) : (
          <p>No blog posts found.</p>
        )}

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    


    </>
  );
};

export default Bloglist;  
import axios from "axios";

const API_BASE_URL ="http://localhost:8080";

export const getAllPosts = () => axios.get(`${API_BASE_URL}/blogs/all`);

export const createPost = (post) => axios.post(`${API_BASE_URL}/blogs`, post);
export const searchByKeyword = (keyword) => axios.get(`${API_BASE_URL}/blogs/search?keyword=${keyword}`);


// ✅ Delete Post
export const deletePost = (id) => axios.delete(`${API_BASE_URL}/blogs/${id}`);

// ✅ Update Post
export const updatePost = (id, post) => axios.put(`${API_BASE_URL}/blogs/${id}`, post);



// Search blog posts by title
export const searchBlogPosts = (keyword) => {
    return axios.get(`${API_BASE_URL}/search`, { params: { keyword } });
  };

  export const getPaginatedPosts = async (page, size) => {
    try {
      const response = await axios.get(`http://localhost:8080/blogs/paginated?page=${page}&size=${size}`);
      return response.data; // This should be an object with { content, totalPages }
    } catch (error) {
      console.error("Error fetching paginated posts:", error);
      return { content: [], totalPages: 1 }; // Prevents undefined issues
    }
  };
  
  


// Fetch a single post by ID
export const getPostById = async (id) => {
  return axios.get(`${API_BASE_URL}/blogs/${id}`);
};



const BASE_URL = "http://localhost:8080/comments"; // Adjust if needed

// Fetch comments for a post
export const getComments = async (blogPostId) => {
  return axios.get(`${BASE_URL}/${blogPostId}`);
};

// Add a new comment
export const addComment = async (blogPostId, commentText) => {
  const commentData = { 
    commenter: "Anonymous",  // Default name (can be changed)
    content: commentText,    // Use correct field name
  };
  return axios.post(`${BASE_URL}/${blogPostId}`, commentData);
};


// Delete a comment
export const deleteComment = async (commentId) => {
  return axios.delete(`${BASE_URL}/${commentId}`);
};





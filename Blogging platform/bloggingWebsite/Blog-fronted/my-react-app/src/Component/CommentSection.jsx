import React, { useState, useEffect } from "react";
import { getComments, addComment, deleteComment } from "../Api";

function CommentSection({ blogPostId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (blogPostId) {
      fetchComments();
    }
  }, [blogPostId]);

  const fetchComments = async () => {
    try {
      const response = await getComments(blogPostId);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await addComment(blogPostId, newComment);
      setNewComment("");

      if (response.data) {
        setComments((prevComments) => [...prevComments, response.data]);
      } else {
        fetchComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-3">💬 Comments</h2>

      {/* Comment Input Field */}
      <div className="mb-3 flex items-center space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-1.5 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAddComment}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Display Comments with Scrollbar */}
      <div className="max-h-40 overflow-y-auto bg-white rounded-md shadow-inner p-2">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet. Be the first to comment! 😊</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {comments.map((comment) => (
              <li key={comment.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">{comment.commenter}</p>
                  <p className="text-xs text-gray-600">{comment.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CommentSection;

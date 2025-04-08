import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../Api";
import CommentSection from "./CommentSection";
import Navbar from "./Navbar";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.content}</p>

      {/* Comment Section */}
      <CommentSection blogPostId={id} />
    </div>

    </>
  );
}

export default BlogDetail;

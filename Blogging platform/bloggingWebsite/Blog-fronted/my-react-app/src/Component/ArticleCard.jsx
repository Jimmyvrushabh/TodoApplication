import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      {/* Clickable Blog Title */}
      <Link to={`/post/${article.id}`} className="text-xl font-bold text-black-700 hover:underline">
        {article.title}
      </Link>

      <p className="text-gray-600 text-sm">{article.content.slice(0, 100)}...</p>
        <p className="text-gray-500 text-sm mt-2">
          {article.author} • {new Date(article.createdAt).toLocaleDateString()}
        </p>
    </div>
  );
};

export default ArticleCard;

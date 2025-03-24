import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(todo.description);

  const handleUpdate = () => {
    if (updatedTitle.trim() === "" || updatedDescription.trim() === "") return;
    onUpdate(todo.id, { ...todo, title: updatedTitle, description: updatedDescription });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleUpdate();
    if (e.key === "Escape") {
      setUpdatedTitle(todo.title);
      setUpdatedDescription(todo.description);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border transition duration-300 hover:shadow-lg">
      <div className="flex flex-col flex-grow">
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              autoFocus
            />
            <input
              type="text"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
            />
          </>
        ) : (
          <>
            <span
              className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
            >
              {todo.title}
            </span>
            <span className={`text-sm ${todo.completed ? "line-through text-gray-500" : "text-gray-600"}`}>
              {todo.description}
            </span>
          </>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex items-center transition duration-300"
          >
            <CheckCircleIcon className="h-5 w-5 mr-1" /> Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md flex items-center transition duration-300"
          >
            <PencilIcon className="h-5 w-5 mr-1" /> Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center transition duration-300"
        >
          <TrashIcon className="h-5 w-5 mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

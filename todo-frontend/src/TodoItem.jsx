import React, { useState } from "react";
import { CheckCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TodoItem = ({ todo, onDelete, onUpdate, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(todo.description);

  const handleUpdate = () => {
    onUpdate(todo.id, { 
      ...todo, 
      title: updatedTitle, 
      description: updatedDescription 
    });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex flex-col w-full">
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="border p-1 mb-1 w-full"
            />
            <input
              type="text"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="border p-1 w-full"
            />
          </>
        ) : (
          <>
            <span className={`${todo.completed ? "line-through text-gray-500" : "font-bold"}`}>
              {todo.title}
            </span>
            <span className="text-sm text-gray-600">{todo.description}</span>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {/* Tick Button - Mark as Completed */}
        <button onClick={() => onToggle(todo.id)} className="text-green-500 hover:text-green-700">
          <CheckCircleIcon className="h-6 w-6" />
        </button>

        {/* Edit Button */}
        {isEditing ? (
          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded-md">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-yellow-500 hover:text-yellow-700">
            <PencilIcon className="h-6 w-6" />
          </button>
        )}

        {/* Delete Button */}
        <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700">
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

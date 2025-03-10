import React from "react";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          className="mr-4"
        />
        <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;

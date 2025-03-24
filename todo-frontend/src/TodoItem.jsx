import React from "react";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          className="mr-4 mt-1"
        />
        <div>
          <span className={`${todo.completed ? "line-through text-gray-500" : "font-bold"}`}>
            {todo.title}
          </span>
          <p className={`${todo.completed ? "line-through text-gray-500" : "text-gray-700"} mt-1`}>
            {todo.description}
          </p>
        </div>
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

import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;
    const todo = await addTodo({
      title: newTodo,
      description: newDescription,
      completed: false,
    });
    setTodos([...todos, todo]);
    setNewTodo("");
    setNewDescription("");
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    const todo = await updateTodo(id, updatedTodo);
    setTodos(todos.map((t) => (t.id === id ? todo : t)));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>

      {/* Add Todo Form */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Task title..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Task description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggle={handleUpdateTodo}
              onUpdate={handleUpdateTodo}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;

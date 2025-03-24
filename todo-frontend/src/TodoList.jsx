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
      console.log("Fetched Todos:", data); // Debugging API response
      setTodos(Array.isArray(data) ? data : []); // Ensure todos is always an array
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
      completed: false
    });
    setTodos([...todos, todo]);
    setNewTodo("");
    setNewDescription("");
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    await updateTodo(todo.id, updatedTodo);
    setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Task title..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Task description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full">
          Add Task
        </button>
      </div>
      <div className="space-y-2">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;

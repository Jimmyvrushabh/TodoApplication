import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
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
    if (newTitle.trim() === "" || newDescription.trim() === "") return;

    const todo = await addTodo({ 
      title: newTitle, 
      description: newDescription, 
      completed: false 
    });

    setTodos([...todos, todo]);
    setNewTitle("");
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

  // ✅ Toggle Completed State
  const handleToggleComplete = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    // Send updated status to backend
    const todo = todos.find((todo) => todo.id === id);
    await updateTodo(id, { ...todo, completed: !todo.completed });
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

      {/* Input Form */}
      <div className="flex flex-col space-y-2 mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Task description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button 
          onClick={handleAddTodo} 
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDelete={handleDeleteTodo} 
              onUpdate={handleUpdateTodo} 
              onToggle={handleToggleComplete} // ✅ Pass the toggle function
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

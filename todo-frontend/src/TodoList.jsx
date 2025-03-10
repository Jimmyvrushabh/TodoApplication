import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;
    const todo = await addTodo({ title: newTodo, description: "", completed: false });
    setTodos([...todos, todo]);
    setNewTodo("");
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
      <div className="flex mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-l"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Add
        </button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

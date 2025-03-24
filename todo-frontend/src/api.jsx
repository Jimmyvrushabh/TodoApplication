import axios from "axios";

const API_URL= import.meta.env.VITE_API_URL;;  // ✅ Correct
; // Spring Boot API URL

export const getTodos = async () => {
  const response = await axios.get(`${API_URL}/api/todos`); // ✅ Correct syntax
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await axios.post(`${API_URL}/api/todos`, todo);
  return response.data;
};


export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/api/todos/${id}`, todo);
  return response.data;
};




export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/api/todos/${id}`);
  return response.data;
};

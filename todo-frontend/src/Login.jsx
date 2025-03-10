import React, { useState } from "react";
import { loginUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      navigate("/todos"); // Redirect to To-Do list after login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="mt-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
};

export default Login;

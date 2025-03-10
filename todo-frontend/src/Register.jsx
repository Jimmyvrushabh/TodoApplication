import React, { useState } from "react";
import { registerUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      setMessage("Registration successful! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleRegister} className="mt-4">
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
        <button type="submit" className="w-full bg-green-500 text-white p-2">Register</button>
      </form>
    </div>
  );
};

export default Register;

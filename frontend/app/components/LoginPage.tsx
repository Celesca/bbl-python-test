"use client";

import { useState } from "react";
import { login } from "../api";

interface Props {
  onLogin: (token: string, isAdmin: boolean) => void;
}

export default function LoginPage({ onLogin }: Props) {
  
  // State for form inputs
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(username, password);
      onLogin(data.access_token, data.is_admin);
    } catch {
      setError("Invalid username or password");
    }
  };

  // I use the AI for styling the login page,
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Username: </label>
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Password: </label>
          <input type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
      </form>
      {error && <p className="mt-4 text-red-500 text-center font-semibold">{error}</p>}
      </div>
    </div>
  );
}

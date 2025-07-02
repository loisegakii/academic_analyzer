import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate saving to backend or database here (optional)
    const newUser = {
      email: form.email,
      createdAt: new Date().toISOString()
    };

    // ✅ Save user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    // Optional: Also set a flag like "isLoggedIn"
    localStorage.setItem("isLoggedIn", "true");

    // ✅ Redirect to Home page
    navigate("/home");
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

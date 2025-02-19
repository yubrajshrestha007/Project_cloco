"use client";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error message

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login/",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensures cookies are sent
        }
      );



      console.log("Login Success:", response.data);

      // Store token securely
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

      // Redirect after login
      window.location.href = "/job";
    } catch (error) {
      console.error("Login Error:", error.response);
      setError(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

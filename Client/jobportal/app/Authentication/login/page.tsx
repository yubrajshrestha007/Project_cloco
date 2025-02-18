// pages/login.js
"use client"
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password,
      });
      alert("user is login")
      console.log(response.data);

      // Store the token in local storage or a cookie
      localStorage.setItem('token', response.data.token);

      // Set the authentication token in the headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      window.location.href="/";
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;

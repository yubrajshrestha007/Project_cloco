// pages/register.js
'use client'
import { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          is_employer: isEmployer,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("user is created");
        console.log('User  created successfully:', data);
      } else {
        console.error('Error creating user:', data);
      }
    } catch (error) {
      console.error('Error creating user:', error);
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
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <label>
        Is Employer:
        <input type="checkbox" checked={isEmployer} onChange={(event) => setIsEmployer(event.target.checked)} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;

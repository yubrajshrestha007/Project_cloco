'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter(); // Initialize router

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

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
        alert("User registered successfully!");
        console.log('User created:', data);

        // Redirect to login page
        router.push('/Auth/login');
      } else {
        setError(data.error || 'Failed to register');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;

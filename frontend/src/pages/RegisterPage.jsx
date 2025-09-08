// in src/pages/RegisterPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// We'll create a shared CSS file for our forms
import './FormStyles.css'; 

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (!username || !password) {
      setMessage('Username and password are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful, show a success message
        setMessage('Registration successful! You can now log in.');
        // Optionally, redirect to the login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2 seconds
      } else {
        // If there's an error (e.g., username taken), display the error message from the server
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>

        {/* Display success or error messages */}
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
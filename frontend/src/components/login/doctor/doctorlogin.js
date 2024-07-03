import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './doctorlogin.css';

function LoginPage() {
  const [doctor_username, setUsername] = useState('');
  const [doctor_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginDoctor = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/doctors/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor_username, doctor_password }),
      });
  
      if (response.ok) {
        console.log('Login successful');
        navigate('/doctor/dashboard', { state: { doctor_username } });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!doctor_username || !doctor_password) {
      setError('Please enter both username and password.');
      return;
    }
    loginDoctor();
  };
  return (
    <div className="doctor-login-container">
      <h1 className="doctor-welcome-message">Welcome Back doctor!</h1>
      <form onSubmit={handleSubmit} className="doctor-login-form" method="post">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={doctor_username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={doctor_password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

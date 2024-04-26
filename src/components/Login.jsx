import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('auth-token', data.authToken);
        navigate('/');
      } else {
        setError(data.error || 'Something went wrong');
      }
  ;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="body-login">
        <div className="heading-login">
          <span>Log In for Music Player App</span>
        </div>
        <div className="container-login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="pass"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
          </form>
          {error && <div className="error">{error}</div>}
          <div className="end">
            <span>Not having Account? <a href="./signup">Sign Up</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

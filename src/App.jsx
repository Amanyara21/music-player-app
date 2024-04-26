import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import './styles/style.css';
import './styles/utilities.css';
import './styles/style2.css';
import Login from './components/Login';
import SignUp from './components/Signup'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:5000/api/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  authToken,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading indicator while fetching user data
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <LeftSidebar /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

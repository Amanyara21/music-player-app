import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('auth-token', data.authToken);
                navigate('/');
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (error) {
            setError(error.message);
            // Handle sign up error
        }
    };

    return (
        <div>
            <header>
                {/* Header content goes here */}
            </header>
            <div className="body-login">
                <div className="heading-login">
                    <span>Sign Up for Music Player App</span>
                </div>
                <div className="container-login">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="For eg: Naman"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <button type="submit">Sign Up</button>
                    </form>
                    {error && <div className="error">{error}</div>}
                    <div className="end">
                        <span>Already have an Account? <a href="./login">Log In</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

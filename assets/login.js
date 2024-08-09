import React, { useState } from 'react';

function Login({ setIsAuthenticated, setCurrentPage }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });
        if (response.ok) {
            setIsAuthenticated(true);
        } else {
            const data = await response.json();
            setError(data.message);
        }
        setIsLoggingIn(false);
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoggingIn} className="btn btn-primary">Login</button>
                <button onClick={() => setCurrentPage('register')} className="btn btn-secondary ms-2">Go to Register
                </button>
            </form>
        </div>
    );
}

export default Login;
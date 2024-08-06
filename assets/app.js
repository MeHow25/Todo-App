import './styles/app.css';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./home";
import Login from "./login";
import Register from './register';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentPage, setCurrentPage] = useState('login');

    useEffect(() => {
        fetch('/me')
            .then(response => response.json())
            .then(data => {
                setIsAuthenticated(!!data.user);
            });
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return currentPage === 'login' ? 
            <Login setIsAuthenticated={setIsAuthenticated} setCurrentPage={setCurrentPage} /> : 
            <Register setCurrentPage={setCurrentPage} />;
    }

    return (
        <div>
            <Home setIsAuthenticated={setIsAuthenticated} />
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
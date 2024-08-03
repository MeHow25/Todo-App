import './styles/app.css';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {store} from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./home";
import Login from "./login";
import Register from './register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

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

    return isAuthenticated ? children : <Navigate to="/login" />;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
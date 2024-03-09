import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'; // Importa Redirect para la redirección
import './Login.css';
import imglogo from '../img/imglogo-removebg-preview.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar la redirección

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:7777/SoliLog/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful');
            setLoggedIn(true); // Establece loggedIn en true después de un inicio de sesión exitoso
        } else {
            setError(data.message);
        }
    };

    // Si loggedIn es true, redirige a la página de consultas
    if (loggedIn) {
        return <Redirect to="/consultas" />;
    }

    return (
        <div class="background-container">
        <div className="login-container">
        <img class="login-image" src={imglogo} alt="Logo"></img>
           <h2 class="login-title"></h2>
            <form class="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button class="login-button" type="submit">Log In</button>
            </form>
        </div>
        </div>



    );
};

export default Login;

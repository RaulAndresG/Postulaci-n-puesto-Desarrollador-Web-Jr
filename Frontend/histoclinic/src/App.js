// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './log/Login';
import ConsultasPage from '../src/consultas/ConsultasList';
import Navbar from './Navbar/Navbar';




const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/consultas" component={ConsultasPage} />
                </Switch>
            </div>
        </Router>
    );
};
const Home = () => {
    return (
        <div className="home-container">
            <h2>Welcome to Home Page</h2>
        </div>
    );
};

export default App;





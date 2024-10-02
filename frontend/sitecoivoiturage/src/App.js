import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Application de Covoiturage</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/trajet">Trajet</Link>
            <Link className="nav-link" to="/reservations">Réservations</Link>
            <Link className="nav-link" to="/avis">Avis</Link>
            <Link className="nav-link" to="/registration">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/logout">Logout</Link>
            <Link className="nav-link" to="/contact">Contact Nous?</Link>
            
          </div>
        </header>

        <div className="content">
          <Routes>
            <Route path="/"  />
            <Route path="/trajet"/>
            <Route path="/reservations"/>
            <Route path="/registration"/>
            <Route path="/login"/>
            <Route path="/logout"/>
            <Route path="/contact"/>
            <Route path="/avis"/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

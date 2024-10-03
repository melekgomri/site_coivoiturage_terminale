import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './Register'; // Import Register component
import Contact from './Contact';
import Home from './Home';

function App() {
  return (
    
      <div className="App">
        <BrowserRouter>
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
          <Route path="/" element={<Home />} /> 
            <Route path="/trajet" />
            <Route path="/reservations" />
            <Route path="/registration" element={<Register />} /> {/* Register Route */}
            <Route path="/login" />
            <Route path="/logout" />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/avis" />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
     
  );
}

export default App;

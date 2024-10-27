import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginAdmin from './components/LoginAdmin';
import AdminDash from './pages/AdminDash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin-dashboard" element={<AdminDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

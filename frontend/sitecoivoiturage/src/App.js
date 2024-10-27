import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginAdmin from './components/LoginAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

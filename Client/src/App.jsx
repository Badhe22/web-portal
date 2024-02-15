// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Navbar';
import Home from './assets/Home';
import Register from './assets/Register';
import Login from './assets/Login';
import Blog from './assets/Blog';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/login" element={<Login   />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

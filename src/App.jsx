import React from 'react'
import Navbar from './Components/Navbar';
import Home from './Components/Pages/Home'
import Auth from './Components/Pages/Auth'
import Saved from './Components/Pages/Saved'
import Properties from './Components/Pages/Properties'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App
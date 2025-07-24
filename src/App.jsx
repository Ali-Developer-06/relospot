import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Pages/Home';
import Auth from './Components/Pages/Auth';
import Saved from './Components/Pages/Saved';
import Contact from './Components/Pages/Contact';
import Properties from './Components/Pages/Properties';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
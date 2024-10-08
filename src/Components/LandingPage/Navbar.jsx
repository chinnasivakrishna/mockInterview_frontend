import React, { useState } from 'react';
import './Navbar.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" className="logo1" />
        <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/home">
          <li>Home</li>
        </Link>
        <li>
          <Link to="/home">Services</Link>
        </li>
        <li>
          <Link to="/home">Contact Us</Link>
        </li>
        <li>
          <Link to="/home">Blogs</Link>
        </li>
      </ul>
      </div>
      
      <div className="navbar-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="join-btn">Join Us</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

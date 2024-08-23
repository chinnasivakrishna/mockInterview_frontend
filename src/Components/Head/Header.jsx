import React from 'react';
import './Header.css'; 
import logo from '../logo.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  
  
  return (
    <header style={{ "backgroundColor": "lightblue" }}>
      <nav>
        <div className="logo">
          <img src={logo} className='img' />
        
        </div>
      
        
      </nav>
    </header>
  )
};

export default Header;

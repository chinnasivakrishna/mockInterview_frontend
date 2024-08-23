import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-newsletter">
          <h4>Subscribe to Newsletter</h4>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Mock Interviews. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

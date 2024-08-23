import React from 'react';
import './HeroSection.css';
import {Link} from 'react-router-dom'

function HeroSection() {
  return (
    <div className="hero-section">
      <h1>Ace Your MBA Interviews with Expert Guidance</h1>
      <p>Prepare for your upcoming MBA interviews with confidence through mock interviews conducted by experienced mentors.</p>
      <div className="hero-buttons">
        <Link to="/studentDashboard"><button className="schedule-btn">Schedule Your Mock Interview Now</button></Link>
        <button className="learn-more-btn">Learn More</button>
      </div>
    </div>
  );
}

export default HeroSection;

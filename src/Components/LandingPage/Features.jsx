import React from 'react';
import './Features.css';
import image from './images.jpeg';

function Features() {
  return (
    <div className="feature-container">
      <div className="image-section">
        <img src={image} alt="Feature" className="feature-image" />
      </div>
      <div className="text-section">
        <div className="feature-item">
          <h2>Personalized Mock Interviews</h2>
          <p>Get one-on-one mock interviews tailored specifically for MBA students to help you prepare for your real interviews.</p>
        </div>
        <div className="feature-item">
          <h2>Experienced Mentors</h2>
          <p>Practice with industry professionals who have experience in conducting interviews and can provide valuable feedback.</p>
        </div>
        <div className="feature-item">
          <h2>Flexible Scheduling</h2>
          <p>Schedule mock interviews at your convenience to fit your busy MBA student schedule.</p>
        </div>
      </div>
    </div>
  );
}

export default Features;

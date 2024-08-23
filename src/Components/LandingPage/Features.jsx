import React from 'react';
import './Features.css';

function Features() {
  return (
    <div class="feature-container">
  <div class="image-section">
    <img src="path_to_your_image.png" alt="Feature Image" class="feature-image" />
  </div>
  <div class="text-section">
    <div class="feature-item">
      <h2>Personalized Mock Interviews</h2>
      <p>Get one-on-one mock interviews tailored specifically for MBA students to help you prepare for your real interviews.</p>
    </div>
    <div class="feature-item">
      <h2>Experienced Mentors</h2>
      <p>Practice with industry professionals who have experience in conducting interviews and can provide valuable feedback.</p>
    </div>
    <div class="feature-item">
      <h2>Flexible Scheduling</h2>
      <p>Schedule mock interviews at your convenience to fit your busy MBA student schedule.</p>
    </div>
  </div>
</div>

  );
}

export default Features;

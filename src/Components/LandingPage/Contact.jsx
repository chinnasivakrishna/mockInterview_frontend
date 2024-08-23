import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p className="intro-text">Have questions or need assistance? Reach out to us!</p>
      <div className="contact-info">
        <div className="contact-item">
          <h3>Email</h3>
          <p>Feel free to send us an email or give us a call.</p>
          <p>support@birthdaymailsender.com</p>
        </div>
        <div className="contact-item">
          <h3>Phone</h3>
          <p>We are here to help make your birthday mail sending experience special.</p>
          <p>+1-800-123-4567</p>
        </div>
        <div className="contact-item">
          <h3>Office</h3>
          <p>Follow us on social media for updates and more!</p>
          <p>123 Main Street, Cityville, State, Country</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Gallery from './Gallery';
import Features from './Features';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Footer from './Footer';
import './landing.css'
import ContactUs from './Contact';
function Landing() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <Features />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Landing;

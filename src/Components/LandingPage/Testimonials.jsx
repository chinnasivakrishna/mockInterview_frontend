import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      name: 'John Smith',
      text: 'The mock interviews were very helpful...',
    },
    {
      name: 'Emily Johnson',
      text: 'I felt more confident going into my MBA interview...',
    },
    {
      name: 'Michael Clark',
      text: 'The tips and feedback I received were invaluable...',
    },
    {
      name: 'Sarah Patel',
      text: 'A great experience that helped me ace my MBA interview...',
    },
  ];

  return (
    <div className="testimonials-section">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial">
          <h3>{testimonial.name}</h3>
          <p>{testimonial.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;

import React from 'react';
import './Pricing.css';

function Pricing() {
  return (
    <div className="pricing-section">
      <div className="pricing-plan">
        <h3>Basic Plan</h3>
        <p>$50 per mock interview</p>
        <button>Subscribe Now</button>
      </div>
      <div className="pricing-plan">
        <h3>Premium Plan</h3>
        <p>$120 for 3 mock interviews</p>
        <button>Subscribe Now</button>
      </div>
      <div className="pricing-plan">
        <h3>Enterprise Plan</h3>
        <p>$200 for 5 mock interviews</p>
        <button>Subscribe Now</button>
      </div>
    </div>
  );
}

export default Pricing;

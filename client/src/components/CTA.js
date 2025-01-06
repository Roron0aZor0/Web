import React from 'react';
import '../styles/CTA.css';

function CTA() {
  return (
    <div className="cta-section">
      <h3>Ready to Start Learning?</h3>
      <p>
        Unlock your potential with our carefully crafted courses. Start your journey today!
      </p>
      <a href="/enroll" className="btn btn-primary">
        Enroll Now
      </a>
    </div>
  );
}

export default CTA;

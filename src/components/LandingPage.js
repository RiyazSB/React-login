import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Welcome to Our App</h1>
      <div className="auth-buttons">
        <Link to="/login" className="primary-btn">Login</Link>
        <Link to="/signup" className="primary-btn">Sign Up</Link>
      </div>
    </div>
  );
}

export default LandingPage;
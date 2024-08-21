import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>AI Food Therapist</h1>
      <p>Personalized your dietary</p>
      <button to="/upload-photo">Get Started</button>
    </div>
  );
};

export default LandingPage;

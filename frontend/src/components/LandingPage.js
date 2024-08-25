import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import laptopMockup from "../images/laptop-mockup.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="content">
        <h1>Transform Your Health with AI-Powered Food Therapy</h1>
        <p>
          Get personalized dietary recommendations based on Traditional Chinese
          Medicine principles—all in just a few clicks.
        </p>
        <Link to="/upload-photo">
          <button>Try It Now</button>
        </Link>
      </div>
      <div className="mockup">
        <img src={laptopMockup} alt="Laptop Mockup" className="laptop-mockup" />
        <p className="upload-info">
          Upload a photo of your tongue and let our AI analyze your health.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;

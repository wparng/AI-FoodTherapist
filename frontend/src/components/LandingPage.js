import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="logo">
        <img src="/assets/images/logo.png" alt="Logo" />
      </div>
      <div className="landing-content">
        <div className="content">
          <h1>Transform Your Health with AI-Powered Food Therapy</h1>
          <p>
            Get personalized dietary recommendations based on Traditional
            Chinese Medicine principles—all in just a few clicks.
          </p>
          <Link to="/permission-request">
            <button>Try It Now</button>
          </Link>
        </div>
        <div className="mockup">
          <img
            src="/assets/images/laptop-mockup.png"
            alt="Laptop Mockup"
            className="laptop-mockup"
          />

          <p className="upload-info">
            Upload a photo of your tongue and let our AI analyze your health
          </p>
          <img
            src="/assets/images/smile.png"
            alt="smile face"
            className="smile"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

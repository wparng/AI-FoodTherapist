import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import "./PermissionRequest.css";

const PermissionRequest = () => {
  const [photoAccess, setPhotoAccess] = useState(false);
  const [photoAnalysis, setPhotoAnalysis] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isEligibleForNavigation = photoAccess && photoAnalysis;

  const handleConfirm = () => {
    if (!isEligibleForNavigation) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="permission-overlay" />
      <div className="permission-page">
        <h1>
          Upload a Permission Request: Front Tongue Photo for Access and
          Analysis
        </h1>
        <p>
          We value your privacy. To enhance your experience, we request photo
          access for:
        </p>
        <ul>
          <li>Uploading and sharing images within the app.</li>
          <li>
            Analyzing photos for personalized recommendations and feature
            improvements.
          </li>
        </ul>
        <p>
          Your data is secure and will only be used as described. We won’t share
          it with third parties without your consent.
        </p>
        <h2>Please Confirm:</h2>
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={photoAccess}
              onChange={() => setPhotoAccess(!photoAccess)}
            />
            I agree to grant access to my photos.
          </label>
          <label>
            <input
              type="checkbox"
              checked={photoAnalysis}
              onChange={() => setPhotoAnalysis(!photoAnalysis)}
            />
            I consent to the analysis of my photos as described.
          </label>
        </div>
        <div className="button-container">
          {isEligibleForNavigation ? (
            <Link to="/upload-photo">
              <button className="confirm-button">Confirm</button>
            </Link>
          ) : (
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
          )}
        </div>

        {showModal && (
          <Modal
            heading="Warning"
            message="Please grant the necessary permissions."
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default PermissionRequest;

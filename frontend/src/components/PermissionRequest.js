import React, { useState } from "react";
import { Link } from "react-router-dom";

const PermissionRequest = () => {
  const [photoAccess, setPhotoAccess] = useState(false);
  const [photoAnalysis, setPhotoAnalysis] = useState(false);

  const isEligibleForNavigation = photoAccess && photoAnalysis;

  return (
    <div className="app permission">
      <h1>Upload a Permission Request:</h1>
      <h2>Photo Access and Analysis photo of your front tongue</h2>
      <p>
        We value your privacy and want to ensure you're fully informed about how
        your data will be used. To enhance your experience, we request access to
        your photos for the following purposes:
      </p>
      <ul>
        <li>
          <strong>Photo Access:</strong> We need permission to access your
          photos so you can upload and share images within the app.
        </li>
        <li>
          <strong>Photo Analysis:</strong> With your consent, we may analyze
          your photos to provide personalized recommendations, enhance app
          features, or improve our services.
        </li>
      </ul>
      <p>
        <strong>Your Privacy Matters:</strong> Any photos accessed or analyzed
        will be handled securely and used only for the purposes outlined above.
        Your data will never be shared with third parties without your explicit
        consent.
      </p>
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
      {isEligibleForNavigation ? (
        <Link to="/upload-photo">
          <button>Confirm</button>
        </Link>
      ) : (
        <button
          onClick={() => alert("Please grant the necessary permissions.")}
        >
          Confirm
        </button>
      )}
    </div>
  );
};

export default PermissionRequest;

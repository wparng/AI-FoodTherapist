import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB < 3 || fileSizeInMB > 9) {
        alert("Please upload a photo between 3 MB and 9 MB.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsUploaded(true);
    }
  };

  const handleUpload = () => {
    if (image) {
      navigate("/questionnaire");
    } else {
      alert("Please upload an image before proceeding.");
    }
  };

  const handleDelete = () => {
    setImage(null);
    setIsUploaded(false);
  };

  return (
    <div className="app">
      <h1>Upload a Photo of Your Front Tongue</h1>
      <div className="instructions">
        <p>Follow the instructions for the best results</p>
        <img />
        <p>
          Position your tongue in the center of the image for the best photo
        </p>
        <img />
      </div>
      <p className="note">
        **Please upload photos between 3–9 MB for best results. <br />
        **Photo quality affects analysis accuracy. The photo is only used for
        analysis and not stored.
      </p>

      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded Tongue" className="uploaded-image" />
          <button className="delete-button" onClick={handleDelete}>
            Delete Image
          </button>
        </div>
      )}
      {!isUploaded && (
        <div className="file-upload">
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            accept="image/*"
          />
          <label htmlFor="file-input" className="file-label">
            Select file +
          </label>
        </div>
      )}
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadPhoto;

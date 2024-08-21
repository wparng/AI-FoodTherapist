import React, { useState } from "react";

const UploadPhoto = () => {
  const [image, setImage] = useState(null);

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
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Photo of Your Front Tongue</h2>
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
        </div>
      )}

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
      <button className="upload-button">Upload</button>
    </div>
  );
};

export default UploadPhoto;

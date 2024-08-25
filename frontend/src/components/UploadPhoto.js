import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const validImageTypes = ["image/jpeg", "image/png"];

      if (!validImageTypes.includes(file.type)) {
        setModalMessage(
          "Invalid file format. Please upload an image (JPEG, PNG)."
        );
        setShowModal(true);
        return;
      }

      if (fileSizeInMB < 3) {
        setModalMessage(
          "The file is too small. Please upload a photo larger than 3 MB."
        );
        setShowModal(true);
        return;
      } else if (fileSizeInMB > 9) {
        setModalMessage(
          "The file is too large. Please upload a photo smaller than 9 MB."
        );
        setShowModal(true);
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
      setModalMessage("Please upload a photo before proceeding.");
      setShowModal(true);
    }
  };

  const handleDelete = () => {
    setImage(null);
    setIsUploaded(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        **Please upload photos between 3–9 MB for the best results. <br />
        **Photo quality affects analysis accuracy. The photo is only used for
        analysis and not stored.
      </p>

      {image && (
        <div className="image-preview">
          <div className="image-container">
            <img src={image} alt="Uploaded Tongue" className="uploaded-image" />
            <button className="delete-button" onClick={handleDelete}>
              X
            </button>
          </div>
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
      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </div>
  );
};

export default UploadPhoto;

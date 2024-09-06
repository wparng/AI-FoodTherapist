import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "./UploadPhoto.css";

const UploadPhoto = ({ setPredictionResult }) => {
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // State to hold the actual file

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const validImageTypes = ["image/jpeg", "image/png", "image/bmp"];

      if (!validImageTypes.includes(file.type)) {
        setModalMessage(
          "Invalid file format. Please upload an image (JPEG, PNG)."
        );
        setShowModal(true);
        return;
      }

      // if (fileSizeInMB < 3) {
      //   setModalMessage(
      //     "The file is too small. Please upload a photo larger than 3 MB."
      //   );
      //   setShowModal(true);
      //   return;
      // } else if (fileSizeInMB > 9) {
      //   setModalMessage(
      //     "The file is too large. Please upload a photo smaller than 9 MB."
      //   );
      //   setShowModal(true);
      //   return;
      // }

      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFile(file);
      setIsUploaded(true);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file); // Append the actual file object
      try {
        const response = await fetch(
          process.env.REACT_APP_APIURLCLASSIFICATION,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          //console.log("Prediction result:", data);
          setPredictionResult(data.label);
          navigate("/questionnaire");
        } else {
          setModalMessage(`Error: ${data.error}`);
          setShowModal(true);
        }
      } catch (error) {
        console.error("Request failed:", error);
        setModalMessage("An error occurred while uploading the image.");
        setShowModal(true);
      }
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
    <div className="app upload-photo-container">
      <h1>Upload a Photo of your Front Tongue</h1>
      <div className="content">
        <div className="instructions">
          <p>Follow the instructions for the best results.</p>
          <p>
            Position your tongue in the center of the image for the best photo.
          </p>
        </div>

        <div className="photo-preview-container">
          <div className="good-photo">
            <img src="/assets/images/tongue-goodexp.png" alt="Good Photo" />
            <p>Good Photo</p>
          </div>
          <div className="bad-photo">
            <img src="/assets/images/tongue-badexp.png" alt="Bad Photo" />
            <p>Bad Photo</p>
          </div>
        </div>

        <p className="note">
          **Please upload photos between 3–9 MB for the best results.
          <br />
          **Photo quality affects analysis accuracy. The photo is only used for
          analysis and not stored.
        </p>

        {image && (
          <div className="image-preview">
            <div className="image-container">
              <img
                src={image}
                alt="Uploaded Tongue"
                className="uploaded-image"
              />
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
              Upload My Tongue Photo
            </label>
          </div>
        )}
      </div>

      <button className="get-result-button" onClick={handleUpload}>
        Get My Result
      </button>

      {showModal && (
        <Modal
          heading="Warning"
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UploadPhoto;

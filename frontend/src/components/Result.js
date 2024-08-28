import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { FaShareAltSquare } from "react-icons/fa";
import axios from "axios";

const tongueImages = {
  TWF: "/assets/images/twf-image.png",
  TYF: "/assets/images/tyf-image.png",
  WGF: "/assets/images/wgf-image.png",
  YGF: "/assets/images/ygf-image.png",
};

const symptomsMap = {
  TWF: "Symptoms for TWF Explanation of this type of tongue indicating your current body condition......",
  TYF: "Symptoms for TYF...",
  WGF: "Symptoms for WGF...",
  YGF: "Symptoms for YGF...",
};

const Result = () => {
  const navigate = useNavigate();
  const [resultType, setResultType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get("/api/tongue-analysis"); // Replace endpoint

        const analysisResult = response.data;

        if (analysisResult.type) {
          setResultType(analysisResult.type);
        } else {
          setModalMessage("Unexpected response from the server.");
          setShowModal(true);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setModalMessage("Error fetching data from the server.");
        setShowModal(true);
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  const handleRecommendations = () => {
    navigate("/recommendations");
  };

  const handleShare = async () => {
    const resultImage = tongueImages[resultType];

    if (resultImage) {
      if (navigator.share) {
        try {
          await navigator.share({
            url: resultImage,
          });
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(resultImage);
          alert("Image URL copied to clipboard!");
        } catch (error) {
          console.error("Error copying to clipboard:", error);
        }
      }
    } else {
      setModalMessage("No image available to share.");
      setShowModal(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const resultImage = tongueImages[resultType] || null;
  const symptoms = symptomsMap[resultType] || "No symptoms available.";

  return (
    <div className="app result">
      <h1>Analysis Result</h1>
      {resultType ? (
        <div>
          <h2>Result Type: {resultType}</h2>
          <p>
            Associated Symptoms: <br />
            {symptoms}
          </p>
          {resultImage && (
            <div className="image-container">
              <img
                src={resultImage}
                alt={`Result for ${resultType}`}
                className="share-image"
              />
              <div className="share-icon-container">
                <FaShareAltSquare
                  onClick={handleShare}
                  className="share-icon"
                />
                <span className="share-label">Share Link</span>
              </div>
            </div>
          )}

          <h2>Recommended Foods and Teas</h2>
          <button onClick={handleRecommendations}>
            View Full Recommendations
          </button>
        </div>
      ) : (
        <p>No result available.</p>
      )}
      {showModal && (
        <Modal
          heading="Warning"
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Result;

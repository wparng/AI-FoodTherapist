import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ShareModal from "./ShareModal";
import { LuShare2, LuCopy } from "react-icons/lu";
import "./Result.css";

const tongueImages = {
  TWF: "/assets/images/twf-image.png",
  YGF: "/assets/images/ygf-image.png",
  TYF: "/assets/images/tyf-image.png",
  WGF: "/assets/images/wgf-image.png",
};

const resultsContent = {
  TWF: {
    title: "TWF",
    titleExpanded: "(Thick White Fur)",
    description:
      "TWF is known for being a little bit lazy, preferring to lounge around.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "Low to minimal",
    healthCondition: "90%",
    buddy: "A buddy to eat together",
    buddyDescription:
      "TWF keeps it light, but sometimes joins TYF, savoring comfort food while keeping balance in mind.",
    buddyImage: "/assets/images/twf-buddy.png",
    detailedInfo:
      "This tongue presentation may experience symptoms such as a feeling of heaviness in the body or limbs...",
    color: "#FFC6C6",
    textColor: "#A64D4B",
  },
  YGF: {
    title: "YGF",
    titleExpanded: "Yellow Greasy Fur",
    description: "YGF indicates a tendency towards internal heat.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "High - Strong signs of internal heat",
    healthCondition: "30%",
    buddy: "A buddy to eat together",
    buddyDescription:
      "TWF keeps it light, but sometimes joins TYF, savoring comfort food while keeping balance in mind.",
    buddyImage: "/assets/images/twf-image.png",
    detailedInfo:
      "This tongue presentation may experience symptoms such as bloating, poor appetite, nausea...",
    color: " #7695FF",
    textColor: "#295F98",
  },
  TYF: {
    title: "TYF",
    titleExpanded: "Thin Yellow Fur",
    description: "TYF suggests heat and dampness in the body.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "Moderate - Higher internal heat",
    healthCondition: "70%",
    buddy: "A buddy to eat together",
    buddyDescription:
      "TWF keeps it light, but sometimes joins TYF, savoring comfort food while keeping balance in mind.",
    buddyImage: "/assets/images/twf-image.png",
    detailedInfo:
      "This tongue presentation may experience symptoms such as fatigue and a sensation of fullness...",
    color: "#FF912C",
    textColor: "#EA6713",
  },
  WGF: {
    title: "WGF",
    titleExpanded: "White Greasy Fur",
    description: "WGF shows a balance of heat and dampness.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "Low to moderate",
    healthCondition: "50%",
    buddy: "A buddy to eat together",
    buddyDescription:
      "TWF keeps it light, but sometimes joins TYF, savoring comfort food while keeping balance in mind.",
    buddyImage: "/assets/images/twf-image.png",
    detailedInfo:
      "This tongue presentation may experience symptoms such as fatigue and a sensation of fullness...",
    color: "#78B7D0",
    textColor: "#16325B",
  },
};

const Result = () => {
  const navigate = useNavigate();
  const [resultType, setResultType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchResult = () => {
      setTimeout(() => {
        const simulatedResponse = { type: "TWF" };
        setResultType(simulatedResponse.type);
        setLoading(false);
      }, 1000);
    };

    // useEffect(() => {
    //   const fetchResult = async () => {
    //     try {
    //       const response = await fetch("your-backend-api-url");
    //       const data = await response.json();
    //       setResultType(data.type);
    //       setLoading(false);
    //     } catch (error) {
    //       console.error("Error fetching result:", error);
    //       setModalMessage(
    //         error.message || "An error occurred while fetching the result."
    //       );
    //       setShowModal(true);
    //       setLoading(false);
    //     }
    //   };

    fetchResult();
  }, []);

  const handleShareOpen = () => {
    setShowShareModal(true);
  };

  const handleCopy = async () => {
    const resultUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(resultUrl);
      setModalMessage("Link copied to clipboard!");
      setShowModal(true);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      setModalMessage("Failed to copy the link. Please try again.");
      setShowModal(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!resultType) {
    return <p>No result available.</p>;
  }

  const resultData = resultsContent[resultType];

  return (
    <div
      className="result-container"
      style={{ backgroundColor: resultData.color }}
    >
      <h1>Analysis Result</h1>
      <div className="result">
        <div className="result-header">
          <h2 className="result-title">{resultData.title}</h2>
          <h3 className="result-title-expanded">{resultData.titleExpanded}</h3>
          <div className="tags">
            <span>#relaxed</span>
            <span>#whyRushed</span>
          </div>
        </div>
        <img
          src={tongueImages[resultType]}
          alt={resultData.title}
          className="tongue-image"
        />
      </div>
      <div className="share-icons">
        <LuShare2 onClick={handleShareOpen} className="icon" />
        <LuCopy onClick={handleCopy} className="icon" />
      </div>
      <p className="description">{resultData.description}</p>
      <div className="result-details">
        <div className="result-detail gut">
          <h3 style={{ backgroundColor: resultData.textColor }}>Gut Health</h3>
          <p>{resultData.gutHealth}</p>
        </div>
        <div className="result-detail level">
          <h3 style={{ backgroundColor: resultData.textColor }}>
            Inflammation Levels
          </h3>
          <p>{resultData.inflammation}</p>
        </div>
        <div className="result-detail condition">
          <h3 style={{ backgroundColor: resultData.textColor }}>
            Health Condition
          </h3>
          <p>{resultData.healthCondition}</p>
        </div>
      </div>
      <div className="buddy-info">
        <img src={resultData.buddyImage} alt="Buddy" className="buddy-image" />
        <div className="buddy-text">
          <h4>Heal Buddy: {resultType} - Cheat Day Pals</h4>
          <p>{resultData.buddyDescription}</p>
        </div>
      </div>
      <div className="result-detailed-info">
        <h3>What does {resultData.title} mean?</h3>
        <p>{resultData.detailedInfo}</p>
      </div>
      <button onClick={() => navigate("/recommendations")}>Next</button>
      {showModal && (
        <Modal
          heading="Warning"
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
      {showShareModal && (
        <ShareModal
          resultType={resultType}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default Result;

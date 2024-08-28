import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
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
    detailedInfo:
      "This tongue presentation may experience symptoms such as a feeling of heaviness in the body or limbs...",
    color: "#FFC6C6",
  },
  YGF: {
    title: "YGF",
    titleExpanded: "Yellow Greasy Fur",
    description: "YGF indicates a tendency towards internal heat.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "High - Strong signs of internal heat",
    healthCondition: "30%",
    buddy: "A buddy to eat together",
    detailedInfo:
      "This tongue presentation may experience symptoms such as bloating, poor appetite, nausea...",
    color: " #7695FF",
  },
  TYF: {
    title: "TYF",
    titleExpanded: "Thin Yellow Fur",
    description: "TYF suggests heat and dampness in the body.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "Moderate - Higher internal heat",
    healthCondition: "70%",
    buddy: "A buddy to eat together",
    detailedInfo:
      "This tongue presentation may experience symptoms such as fatigue and a sensation of fullness...",
    color: "#FF912C",
  },
  WGF: {
    title: "WGF",
    titleExpanded: "White Greasy Fur",
    description: "WGF shows a balance of heat and dampness.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "Low to moderate",
    healthCondition: "50%",
    buddy: "A buddy to eat together",
    detailedInfo:
      "This tongue presentation may experience symptoms such as fatigue and a sensation of fullness...",
    color: "#D5D5D5",
  },
};

const Result = () => {
  const navigate = useNavigate();
  const [resultType, setResultType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // useEffect(() => {
  //   const fetchResult = () => {
  //     setTimeout(() => {
  //       const simulatedResponse = { type: "TWF" };
  //       setResultType(simulatedResponse.type);
  //       setLoading(false);
  //     }, 1000);
  //   };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch("your-backend-api-url");
        const data = await response.json();
        setResultType(data.type);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching result:", error);
        setModalMessage(
          error.message || "An error occurred while fetching the result."
        );
        setShowModal(true);
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  const handleShare = async () => {
    const resultUrl = window.location.href; // Share current URL
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tongue Analysis Result: ${resultsContent[resultType].title}`,
          url: resultUrl,
          text: `Check out my tongue analysis result: ${resultsContent[resultType].title}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        setModalMessage("Failed to share the result. Please try again.");
        setShowModal(true);
      }
    } else {
      try {
        await navigator.clipboard.writeText(resultUrl);
        setModalMessage("Link copied to clipboard!");
        setShowModal(true);
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        setModalMessage("Failed to copy the link. Please try again.");
        setShowModal(true);
      }
    }
  };
  const adjustColor = (color, amount) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    const newColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;
    return newColor;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!resultType) {
    return <p>No result available.</p>;
  }

  const resultData = resultsContent[resultType];
  const adjustedColor = adjustColor(resultData.color, 50);

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
        <LuShare2 onClick={handleShare} className="icon" />
        <LuCopy
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="icon"
        />
      </div>
      <p className="description">{resultData.description}</p>
      <div className="result-details">
        <div className="result-detail gut">
          <h3 style={{ backgroundColor: adjustedColor }}>Gut Health</h3>
          <p>{resultData.gutHealth}</p>
        </div>
        <div className="result-detail level">
          <h3 style={{ backgroundColor: adjustedColor }}>
            Inflammation Levels
          </h3>
          <p>{resultData.inflammation}</p>
        </div>
        <div className="result-detail condition">
          <h3 style={{ backgroundColor: adjustedColor }}>Health Condition</h3>
          <p>{resultData.healthCondition}</p>
        </div>
      </div>
      <h4>{resultData.buddy}</h4>
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
    </div>
  );
};

export default Result;

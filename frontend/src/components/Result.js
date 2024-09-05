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
    titleExpanded: "Thin White Fur Tongue",
    tag1: ["#calm"],
    tag2: ["#steady"],
    description:
      "Thin White Fur Tongue is calm and balanced, preferring routines and mild, nourishing foods. Steady and reliable, they choose moderation to maintain harmony and avoid extremes.",
    gutHealth:
      "Balanced - Digestive system functions well with minimal bloating or discomfort",
    inflammation: "Low to minimal",
    healthCondition: "90%",
    buddy: "TYF - Cheat Day Pals",
    buddyDescription:
      "TWF keeps it light, but sometimes joins TYF, savoring comfort food while keeping balance in mind.",
    buddyImage: "/assets/images/tyf-image.png",
    detailedInfo:
      "This tongue type indicates a generally healthy state, with the tongue appearing slightly pale with a thin white coating. Individuals with TWF may occasionally experience mouth dryness or mild cold symptoms. They thrive on balanced, light, and nourishing foods that support overall well-being.",
    color: "#FFC6C6",
    textColor: "#A64D4B",
  },
  YGF: {
    title: "YGF",
    titleExpanded: "Yellow Greasy Fur Tongue",
    tag1: ["#rich"],
    tag2: ["#spiceislife"],
    description:
      "Yellow Greasy Fur Tongue is indulgent, enjoying rich, flavorful foods with intensity. They savor every bite but know they need to detox regularly to keep things in check",
    gutHealth: "Compromised, with tendencies toward digestive sluggishness",
    inflammation: "High - Strong signs of internal heat",
    healthCondition: "30%",
    buddy: "A buddy to eat together",
    buddyDescription:
      "WGF, the Deep-Fried Queen, teams up with YGF, the Spicy Prince. They love indulging, but a light meal wouldn't hurt.",
    buddyImage: "/assets/images/wgf-image.png",
    detailedInfo:
      "This tongue type suggests significant damp-heat and inflammation from a diet high in rich, greasy foods. It calls for detoxifying, cooling foods to reduce inflammation and restore balance.",
    color: " #7695FF",
    textColor: "#295F98",
  },
  TYF: {
    title: "TYF",
    titleExpanded: "Thin Yellow Fur Tongue",
    tag1: ["#spicy"],
    tag2: ["#flavorful"],
    description:
      "Thin Yellow Fur Tongue is the fiery type who loves flavorful foods. They’re drawn to excitement in meals but know when to cool things down and keep balance.",
    gutHealth:
      "Sensitive, with a tendency towards digestive discomfort if not careful",
    inflammation: "Moderate - Higher internal heat",
    healthCondition: "70%",
    buddy: "YGF - Spice Lovers ",
    buddyDescription:
      "No Spice, No Life. They're on fire for spicy flavors, but sometimes, a cool cup of tea is just what they need.",
    buddyImage: "/assets/images/ygf-image.png",
    detailedInfo:
      "This tongue type is linked to internal heat and mild inflammation, often seen with a bitter taste and restlessness. It signals a need for cooling, detoxifying foods to maintain balance.",
    color: "#FF912C",
    textColor: "#EA6713",
  },
  WGF: {
    title: "WGF",
    titleExpanded: "White Greasy Fur",
    tag1: ["#relaxed"],
    tag2: ["#whyrush"],
    description: "WGF shows a balance of heat and dampness.",
    gutHealth: "Loss of appetite or bloating after meals",
    inflammation: "Low to moderate",
    healthCondition: "50%",
    buddy: "YGF - Indulgent Duo",
    buddyDescription:
      "WGF loves greasy foods, YGF craves spice. They indulge, though a light meal wouldn't hurt.",
    buddyImage: "/assets/images/ygf-image.png",
    detailedInfo:
      "This tongue type is characterized by heaviness, bloating, poor appetite, nausea, and loose or sticky stools. It reflects a need to address these symptoms and restore digestive balance.",
    color: "#78B7D0",
    textColor: "#16325B",
  },
};

const Result = ({ predictionResult }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  if (!predictionResult) {
    return <p>No result available.</p>;
  }

  const resultData = resultsContent[predictionResult];

  return (
    <div
      className="result-container"
      style={{ backgroundColor: resultData.color }}
    >
      <h1>Analysis Result</h1>
      <div className="result">
        <div className="result-header">
          <h2 className="result-title">{resultData.title}</h2>
          <h3 className="result-title-expanded">
            ({resultData.titleExpanded})
          </h3>
          <div className="tags">
            <span>{resultData.tag1}</span>
            <span>{resultData.tag2}</span>
          </div>
        </div>
        <img
          src={tongueImages[predictionResult]}
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
          <h4>Heal Buddy: {resultData.buddy}</h4>
          <p>{resultData.buddyDescription}</p>
        </div>
      </div>
      <div className="result-detailed-info">
        <h3>What does {resultData.titleExpanded} mean?</h3>
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
          resultType={predictionResult}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default Result;

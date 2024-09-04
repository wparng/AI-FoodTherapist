import React from "react";
import "./ShareModal.css"; // Create this CSS file for styling the modal

const ShareModal = ({ onClose, resultType }) => {
  const resultUrl = window.location.href;

  const handleShare = (platform) => {
    let shareUrl;

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          resultUrl
        )}`;
        break;
      case "Instagram":
        alert("Instagram sharing is not supported via URL. Share manually.");
        return;
      case "X":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          resultUrl
        )}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          resultUrl
        )}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
      onClose();
    }
  };

  return (
    <div className="share-modal">
      <h3>Share Analysis Result</h3>
      <button onClick={() => navigator.clipboard.writeText(resultUrl)}>
        Copy Link
      </button>
      <button onClick={() => handleShare("Facebook")}>Share to Facebook</button>
      <button onClick={() => handleShare("Instagram")}>
        Share to Instagram
      </button>
      <button onClick={() => handleShare("X")}>Share to X</button>
      <button onClick={() => handleShare("LinkedIn")}>Share to LinkedIn</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ShareModal;

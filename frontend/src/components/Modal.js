import React from "react";
import "./Modal.css";

const Modal = ({ heading, message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{heading}</h2>
        <pre>{message}</pre>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import "./AboutPage.css";

const AboutPage = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button-feedback" onClick={onClose}>
          ×
        </button>
        <div className="modal-header">
          <h2>Sys Trans AI Assistant</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          vestibulum magna, et dapibus lacus.
        </p>
        <p>
          Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa,
          ultricies non ligula. Suspendisse imperdiet.
        </p>
        <div className="ask-section" style={{ marginTop: "20px" }}>
          Ask any queries related to <strong>Illinois Billing Guide</strong>.
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

import React from "react";
import { LiaComments } from "react-icons/lia";
import "./HelpPrompt.css";

const HelpPrompt = () => {
  return (
    <div className="help-container">
      <div className="chat-icon">
        <LiaComments size={40} color="#222" />
      </div>
      <h2 className="help-title">How can we help you today?</h2>
      <p className="help-description">
        Ask any queries related to Illinois Billing Guide.
      </p>
      <hr className="separator" />
    </div>
  );
};

export default HelpPrompt;

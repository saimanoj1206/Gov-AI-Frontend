import React, { useState } from "react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa6";
import { TbCopy, TbCopyCheck } from "react-icons/tb"; // Import the new icon
import "./FeedbackAction.css";

const FeedbackAction = ({ responseText, onFeedback }) => {
  const [feedback, setFeedback] = useState(null); // Track thumbs-up or thumbs-down
  const [copied, setCopied] = useState(false); // Track copy status

  const handleCopyResponse = () => {
    if (responseText) {
      navigator.clipboard.writeText(responseText);
      setCopied(true); // Show "Copied!" message with the check icon
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setCopied(false); // Revert to the original copy icon after 1 second
    }, 1000);
  };

  const handleFeedback = (type) => {
    if (feedback) return; // Do nothing if feedback is already given
    setFeedback(type); // Set feedback state
    if (onFeedback) {
      onFeedback(type); // Notify parent component of feedback
    }
  };

  return (
    <div className="response-actions">
      {/* Copy Response */}
      <button
        className="copy-button"
        onClick={handleCopyResponse}
        onMouseLeave={handleMouseLeave} // Trigger hiding the check icon after mouse leave
        data-tooltip={copied ? "Copied!" : "Copy"}
      >
        {copied ? <TbCopyCheck /> : <TbCopy />}{" "}
        {/* Show check icon or copy icon */}
      </button>

      {/* Thumbs Up */}
      <button
        className="feedback-button"
        onClick={() => handleFeedback("thumbsUp")}
        data-tooltip="Helpful"
        disabled={!!feedback}
      >
        {feedback === "thumbsUp" ? <FaThumbsUp /> : <FaRegThumbsUp />}
      </button>

      {/* Thumbs Down */}
      <button
        className="feedback-button"
        onClick={() => handleFeedback("thumbsDown")}
        data-tooltip="Not Helpful"
        disabled={!!feedback}
      >
        {feedback === "thumbsDown" ? <FaThumbsDown /> : <FaRegThumbsDown />}
      </button>
    </div>
  );
};

export default FeedbackAction;

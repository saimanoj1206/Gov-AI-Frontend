import React, { useState, useEffect } from "react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa6";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import FeedbackModal from "./FeedbackModel/FeedbackModal";
import "./FeedbackAction.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const FeedbackAction = ({ messageId, value, comment }) => {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [submittedValue, setSubmittedValue] = useState(null);
  const [messageComment, setMessageComment] = useState(comment); // Initial state);

  useEffect(() => {
    if (value !== undefined) {
      setSubmittedValue(value);
    }
  }, [messageId, value]);

  const handleCopyResponse = () => {
    if (messageId) {
      navigator.clipboard.writeText(messageId);
      setCopied(true);
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleFeedback = (type) => {
    setFeedbackType(type);
    setModalOpen(true);
  };

  const handleModalSubmit = async (messageComment) => {
    if (!messageId) return;
    const feedbackValue = feedbackType === "thumbsUp" ? 1 : 0;
    const apiUrl = `https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/api/v1/messages/${messageId}/feedbacks?value=${feedbackValue}&comment=${messageComment}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmittedValue(feedbackValue);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div className="response-actions">
      {/* Copy Button */}
      <button
        className="copy-button"
        onClick={handleCopyResponse}
        onMouseLeave={handleMouseLeave}
        data-tooltip={copied ? "Copied!" : "Copy"}
      >
        {copied ? <TbCopyCheck /> : <TbCopy />}
      </button>

      {/* Thumbs Up */}
      <button
        className="feedback-button"
        onClick={() => handleFeedback("thumbsUp")}
        data-tooltip="Helpful"
      >
        {submittedValue === 1 ? <FaThumbsUp /> : <FaRegThumbsUp />}
      </button>

      {/* Thumbs Down */}
      <button
        className="feedback-button"
        onClick={() => handleFeedback("thumbsDown")}
        data-tooltip="Not Helpful"
      >
        {submittedValue === 0 ? <FaThumbsDown /> : <FaRegThumbsDown />}
      </button>
      {submittedValue === 1 || submittedValue === 0 ? (
        <button
          className="feedback-button"
          onClick={() => setModalOpen(true)}
          data-tooltip="Edit Feedback!"
        >
          <IoChatbubbleEllipsesOutline />
        </button>
      ) : (
        ""
      )}

      {modalOpen && (
        <FeedbackModal
          type={feedbackType}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          messageComment={messageComment}
          setMessageComment={setMessageComment}
        />
      )}
    </div>
  );
};

export default FeedbackAction;

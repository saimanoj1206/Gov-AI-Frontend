import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import "./FeedbackModal.css";

const FeedbackModal = ({
  type,
  onClose,
  onSubmit,
  messageComment,
  setMessageComment,
}) => {
  const [newComment, setNewComment] = useState(messageComment);

  const handleFeedbackChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    setMessageComment(newComment);
    onSubmit(newComment);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {type === "thumbsUp" ? (
            <FaThumbsUp className="icon thumbs-up" />
          ) : (
            <FaThumbsDown className="icon thumbs-down" />
          )}
          <h2>Add a comment</h2>
        </div>
        <textarea
          className="feedback-input"
          placeholder="Your feedback..."
          value={newComment}
          onChange={handleFeedbackChange}
        />
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>
        <button className="close-button-feedback" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;

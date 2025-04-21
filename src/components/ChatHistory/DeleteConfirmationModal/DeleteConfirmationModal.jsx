import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ threadId, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(threadId);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <MdDeleteOutline className="icon delete-icon" />
          <h2>Confirm Delete</h2>
        </div>
        <p className="confirmation-text">
          Are you sure you want to delete this conversation?
        </p>
        <div className="button-container">
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
        <button className="close-button-feedback" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

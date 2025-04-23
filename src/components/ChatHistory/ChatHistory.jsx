import React, { useEffect, useState } from "react";
import "./ChatHistory.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteThreadHistory,
  getMessageHistory,
  getThreadHistory,
  setResumeChat,
} from "../../store/slices/historySlice";
import { setChatHistory } from "../../store/slices/chatSlice";
// import { RiArrowRightWideFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";

const ChatHistory = () => {
  const dispatch = useDispatch();
  const { threads, error } = useSelector((state) => state.history);
  // const [hoveredThread, setHoveredThread] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState(null);

  useEffect(() => {
    dispatch(getThreadHistory());
  }, [dispatch]);

  const truncateText = (text, maxLength = 32) => {
    return text.length > maxLength
      ? text.slice(0, maxLength).trim() + "..."
      : text;
  };

  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 14);

  const categorizedThreads = {
    "This Week": [],
    "Last Week": [],
    "Previous Conversations": [],
  };

  if (threads?.data) {
    threads.data.forEach((thread) => {
      const threadDate = new Date(thread.updated_at);
      if (threadDate >= oneWeekAgo) {
        categorizedThreads["This Week"].push(thread);
      } else if (threadDate >= twoWeeksAgo) {
        categorizedThreads["Last Week"].push(thread);
      } else {
        categorizedThreads["Previous Conversations"].push(thread);
      }
    });
  }

  const handleHistoryThreadClick = (threadId) => {
    dispatch(getMessageHistory({ threadId }))
      .then((result) => {
        if (result.payload?.data) {
          dispatch(
            setChatHistory(
              result.payload.data.map((msg) => ({
                ...msg,
                messageId: msg.message_id, // normalize for consistent frontend usage
              }))
            )
          );
          dispatch(setResumeChat(true));
        }
      })
      .catch((error) => {
        console.error("Error fetching thread messages:", error);
      });
  };

  return (
    <div className="chat-history">
      {error && (
        <p className="error-message">Error loading chat history: {error}</p>
      )}

      {Object.values(categorizedThreads).some((threads) => threads.length) ? (
        <div>
          {Object.entries(categorizedThreads).map(([section, threads], index) =>
            threads.length ? (
              <div key={index}>
                <h3 className="section-title">{section}</h3>
                <ul className="question-list">
                  {threads.map((thread, idx) => (
                    <li
                      key={thread.thread_id || idx}
                      className="question-item"
                      onClick={() => handleHistoryThreadClick(thread.thread_id)}
                      // onMouseEnter={() => setHoveredThread(thread.thread_id)}
                      // onMouseLeave={() => setHoveredThread(null)}
                    >
                      <p className="question-link">
                        {truncateText(thread.thread_name)}
                      </p>
                      {/* <span className="question-arrow">
                        <RiArrowRightWideFill />
                      </span> */}
                      <MdDeleteOutline
                        size={16}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent triggering the thread open
                          setThreadToDelete(thread.thread_id);
                          setShowDeleteModal(true);
                        }}
                      />
                    </li>
                  ))}
                </ul>
                {showDeleteModal && (
                  <DeleteConfirmationModal
                    threadId={threadToDelete}
                    onClose={() => {
                      setShowDeleteModal(false);
                      setThreadToDelete(null);
                    }}
                    onDelete={(id) => {
                      dispatch(deleteThreadHistory({ threadId: id }))
                        .then(() => {
                          dispatch(getThreadHistory());
                        })
                        .catch((error) => {
                          console.error("Error deleting thread:", error);
                        });
                    }}
                  />
                )}
                <hr className="separator-line" />
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p>Chat history loading...</p>
      )}
    </div>
  );
};

export default ChatHistory;

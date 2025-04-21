import React, { useRef, useState, useEffect } from "react";
import "./Chat.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiOctanerender } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import FeedbackAction from "../FeedbackAction/FeedbackAction";
import Shimmer from "./Shimmer/Shimmer";
import ScrollToBottomButton from "./ScrollToBottomButton/ScrollToBottomButton";
import { FaPencilAlt } from "react-icons/fa";
import { fetchChatData } from "../../store/slices/chatSlice";
import { TbCopy } from "react-icons/tb";

const Chat = ({ currentQuestion, onSourceClick, docView }) => {
  const { chatData, loading, error } = useSelector((state) => state.chatUI);
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const dispatch = useDispatch();
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);
  useEffect(() => {
    if (loading) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  const handleEditClick = (messageId, text) => {
    if (!messageId) {
      console.error("Error: messageId is missing in handleEditClick!");
      return;
    }

    setEditId(messageId); // Store the message ID
    setEditedText(text);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedText("");
    setHoveredIndex(null);
  };

  const handleSendEdit = () => {
    if (!editedText.trim()) return; // Prevent empty edits

    if (!editId) {
      console.error("Error: editId is null or undefined!");
      return;
    }

    dispatch(fetchChatData({ question: editedText, messageId: editId }))
      .then(() => {
        setHoveredIndex(null);
      })
      .finally(() => {
        setEditId(null);
      });
  };

  return (
    <div className="chat-container">
      <div
        className={`chat-messages ${docView ? "with-pdf" : ""}`}
        ref={chatContainerRef}
      >
        {error && <div className="error-message">Error: {error}</div>}
        {chatData.map((message) => {
          const source_doc =
            message?.source_documents || JSON.parse(message?.sources);

          return (
            <div
              key={message.messageId || message.message_id}
              className="chat-view"
            >
              <div
                className="prompt-container"
                onMouseEnter={() =>
                  setHoveredIndex(message.messageId || message.message_id)
                }
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {editId === message.messageId ||
                editId === message.message_id ? (
                  <div className="edit-mode">
                    <textarea
                      autoFocus
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="edit-input"
                    />
                    <div className="edit-btn-container">
                      <button className="cancel-btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                      <button className="send-btn" onClick={handleSendEdit}>
                        Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {(hoveredIndex === message.messageId ||
                      hoveredIndex === message.message_id) && (
                      <div className="action-icons">
                        <FaPencilAlt
                          className="edit-icon"
                          onClick={() =>
                            handleEditClick(
                              message.messageId || message.message_id,
                              message.input || message.query
                            )
                          }
                        />
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <TbCopy
                            className="copy-icon"
                            onClick={() => {
                              const textToCopy = message.input || message.query;
                              navigator.clipboard.writeText(textToCopy);
                              setCopiedMessageId(
                                message.messageId || message.message_id
                              );
                              setTimeout(() => setCopiedMessageId(null), 1000);
                            }}
                          />
                          {copiedMessageId ===
                            (message.messageId || message.message_id) && (
                            <div className="copied-tooltip">Copied!</div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="prompt">
                      {editId === message.messageId ||
                      editId === message.message_id
                        ? editedText
                        : message.input || message.query}
                    </div>
                  </>
                )}
              </div>

              <div className="response">
                <div className="markdown-container">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message?.output || message?.answer}
                  </ReactMarkdown>
                </div>

                {!isAtBottom && (
                  <ScrollToBottomButton
                    bottomRef={bottomRef}
                    docView={docView}
                  />
                )}

                <div className="source-docs">
                  {source_doc?.length ? "Sources: " : ""}
                  {source_doc?.map((doc, index) => (
                    <p
                      key={index}
                      onClick={() =>
                        onSourceClick(
                          doc?.metadata?.doc_id,
                          `PDF-${index + 1} Page No: (${
                            doc?.metadata?.page_number[0] + 1
                          }-${
                            doc?.metadata?.page_number[1]
                              ? doc?.metadata?.page_number[1] + 1
                              : doc?.metadata?.page_number[0] + 1
                          })`
                        )
                      }
                    >
                      PDF-{index + 1} Page No: (
                      {doc?.metadata?.page_number[0] + 1}-
                      {doc?.metadata?.page_number[1]
                        ? doc?.metadata?.page_number[1] + 1
                        : doc?.metadata?.page_number[0] + 1}
                      )
                    </p>
                  ))}
                </div>

                <div>
                  <FeedbackAction
                    messageId={message.messageId || message.message_id}
                    value={message.value}
                    comment={message.comment}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="chat-view">
            <div className="prompt-loading">
              {editedText || currentQuestion}
            </div>
            <div className="loading-animation">
              <SiOctanerender /> Please Wait...
            </div>
            <Shimmer />
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default Chat;

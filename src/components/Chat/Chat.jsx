import React from "react";
import "./chat.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiOctanerender } from "react-icons/si";
import { useSelector } from "react-redux";
import FeedbackAction from "../FeedbackAction/FeedbackAction";

const Chat = ({ currentQuestion }) => {
  const { chatPage, loading, error } = useSelector((state) => state.chatUI);

  return (
    <div>
      {error && <div className="error-message">Error: {error}</div>}

      {chatPage.map((message, index) => (
        <div key={index} className="chat-message">
          <div className="prompt">{message.input}</div>
          <div className="response">
            <div className="markdown-container">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.output}
              </ReactMarkdown>
            </div>
            <div className="source-docs">
              {message?.source_documents?.length ? "Source: " : ""}
              {message?.source_documents.map((doc, index) => (
                <p key={index}>
                  PDF{index + 1}
                  Page No: ({doc.metadata.page_number[0] + 1}-
                  {doc.metadata.page_number[1]
                    ? doc.metadata.page_number[1] + 1
                    : doc.metadata.page_number[0] + 1}
                  )
                </p>
              ))}
            </div>
            <div>
              <FeedbackAction
                responseText={message.output}
                // onFeedback={handleFeedback}
              />
            </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="chat-message">
          <div className="prompt">{currentQuestion}</div>
          <div>
            <SiOctanerender /> Please Wait...
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

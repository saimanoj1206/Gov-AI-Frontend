import React from "react";
import "./Chat.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiOctanerender } from "react-icons/si";
import { useSelector } from "react-redux";
import FeedbackAction from "../FeedbackAction/FeedbackAction";
import Shimmer from "./Shimmer/Shimmer"; // Import Shimmer Component

const Chat = ({ currentQuestion, onSourceClick, docView }) => {
  const { chatPage, loading, error } = useSelector((state) => state.chatUI);

  return (
    <div className="chat-container">
      <div className={`chat-messages ${docView ? "with-pdf" : ""}`}>
        {error && <div className="error-message">Error: {error}</div>}

        {chatPage.map((message, index) => (
          <div key={index} className="chat-view">
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
                  <p
                    key={index}
                    onClick={() =>
                      onSourceClick(
                        doc.metadata.doc_id,
                        `PDF-${index + 1} Page No: (${
                          doc.metadata.page_number[0] + 1
                        }-${
                          doc.metadata.page_number[1]
                            ? doc.metadata.page_number[1] + 1
                            : doc.metadata.page_number[0] + 1
                        })`
                      )
                    }
                  >
                    PDF-{index + 1} Page No: ({doc.metadata.page_number[0] + 1}-
                    {doc.metadata.page_number[1]
                      ? doc.metadata.page_number[1] + 1
                      : doc.metadata.page_number[0] + 1}
                    )
                  </p>
                ))}
              </div>
              <div>
                <FeedbackAction responseText={message.output} />
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-view">
            <div className="prompt">{currentQuestion}</div>
            <div className="loading-animation">
              <SiOctanerender /> Please Wait...
            </div>
            <Shimmer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

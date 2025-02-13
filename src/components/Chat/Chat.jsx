import React, { useEffect, useRef, useState } from "react";
import { SiOctanerender } from "react-icons/si";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import remarkGfm from "remark-gfm";
import FeedbackAction from "../FeedbackAction/FeedbackAction";
import "./Chat.css";
import ScrollToBottomButton from "./ScrollToBottomButton/ScrollToBottomButton";
import Shimmer from "./Shimmer/Shimmer";

const Chat = ({ currentQuestion, onSourceClick, docView }) => {
  const { chatPage, loading, error } = useSelector((state) => state.chatUI);
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

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

  return (
    <div className="chat-container">
      <div
        className={`chat-messages ${docView ? "with-pdf" : ""}`}
        ref={chatContainerRef}
      >
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
              {!isAtBottom && (
                <ScrollToBottomButton bottomRef={bottomRef} docView={docView} />
              )}
              <div className="source-docs">
                {message?.source_documents?.length ? "Source: " : ""}
                {message?.source_documents.map((doc, index) => (
                  <p
                    key={index}
                    onClick={() =>
                      onSourceClick(
                        doc.metadata.doc_id,
                        `PDF-${index + 1} Page No: (${doc.metadata.page_number[0] + 1
                        }-${doc.metadata.page_number[1]
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
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default Chat;

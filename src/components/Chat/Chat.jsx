import React from "react";
import "./chat.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiOctanerender } from "react-icons/si";

const Chat = ({ chatData, loading }) => {
  return (
    <div className="chat-container">
      <div className="chat-message">
        {chatData?.input ? (
          <div className="prompt">
            <div>{chatData.input}</div>
          </div>
        ) : null}

        {loading ? (
          <div className="response">
            <div>
              <SiOctanerender /> Please Wait...
            </div>
          </div>
        ) : chatData?.output ? (
          <div className="response">
            <div className="markdown-container">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {chatData?.output}
              </ReactMarkdown>
            </div>
            <div className="source-docs">
              {chatData?.source_documents?.length ? "Source: " : ""}
              {chatData?.source_documents.map((doc, index) => (
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Chat;

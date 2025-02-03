import React from "react";
import "./ChatHistory.css";

const ChatHistory = () => {
  const truncateText = (text, maxLength = 35) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "... >" : text;
  };
  const chatData = {
    "This Week": [
      "Is Revenue code 0653 covered...",
      "Can T1015 be reimbursed more than once...",
      "How is 90935 reimbursed and processed?",
    ],
    "Last Week": [
      "Is there a list of procedure codes available?",
      "Provide A Comprehensive List...",
      "Does physician service come under...",
    ],
    "Previous Conversations": [
      "Does Revenue Code 0111 Exist...",
      "What is the process to reimburse T1015?",
      "How is 90935 reimbursed and processed?",
      "Is There A List Of Procedure Codes?",
    ],
  };
  return (
    <div className="chat-history">
      {Object.entries(chatData).map(([section, questions], index) => (
        <div key={index} className="chat-section">
          <h3 className="section-title">{section}</h3>
          <ul className="question-list">
            {questions.map((question, idx) => (
              <li key={idx} className="question-item">
                <p className="question-link">{truncateText(question)}</p>
              </li>
            ))}
          </ul>
          <hr className="separator-line" />
        </div>
      ))}
      <div className="view-all">
        <h3 className="view-all-link">View All{"  >"}</h3>
      </div>
    </div>
  );
};

export default ChatHistory;

import React from "react";
import { FaAngleRight } from "react-icons/fa";
import "./Faq.css";

const FAQ = ({ handleFaqClick }) => {
  const questions = [
    "Is Revenue code 0653 covered for a Hospice claim?",
    "Is there a list of procedure codes that are not allowed?",
    "Can T1015 be reimbursed more then once in a day?",
    "Does physician service come under revenue code 0653?",
    "How is 90935 reimbursed and elaborate the overall process?",
    "Does revenue code 0111 exist in our comprehensive code list?",
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div>
        <div className="faq-questions">
          {questions.map((question, index) => (
            <div
              className="faq-question"
              key={index}
              onClick={() => handleFaqClick(question)}
            >
              {question}
              <span className="faq-arrow">
                <FaAngleRight />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import React from "react";
import { useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa";
import "./Faq.css";

const FAQ = ({ handleFaqClick }) => {
  const { faqData, loading, error } = useSelector((state) => state.faqData);
  console.log("FAQ data:", faqData);

  if (loading) return <div className="faq-container">Loading FAQs...</div>;
  if (error) return <div className="faq-container">Error: {error}</div>;

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-questions">
        {faqData?.data?.map((item, index) => (
          <div
            className="faq-question"
            key={index}
            onClick={() => handleFaqClick(item)}
          >
            {item}
            <span className="faq-arrow">
              <FaAngleRight />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

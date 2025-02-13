import React from "react";
import { FaArrowDown } from "react-icons/fa";
import "./ScrollToBottomButton.css";

const ScrollToBottomButton = ({ bottomRef, docView }) => {
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      className="scroll-to-bottom-button"
      onClick={scrollToBottom}
      style={{
        left: docView ? "42.5%" : "60%",
      }}
    >
      <FaArrowDown />
    </button>
  );
};

export default ScrollToBottomButton;

import React, { useRef, useEffect } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import "./SearchInput.css";

const SearchInput = ({
  setChatData,
  shouldFocus,
  setIsChatActive,
  loading,
  makeApiCall,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const handleSubmit = async () => {
    const question = inputRef.current.value.trim();

    if (!question) return;

    // Clear input field immediately after fetching the question
    inputRef.current.value = "";

    setIsChatActive(true);
    setChatData({ input: question, output: "" });

    const payload = {
      question,
      user_id: "kp1234",
      session_id: "0011aA",
    };

    try {
      const result = await makeApiCall(payload);
      setChatData((prev) => ({
        ...prev,
        output: result.output,
        source_documents: result.source_documents,
      }));
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="search-container-wrapper">
      <div className="search-container">
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Ask Question"
          onKeyDown={handleKeyPress}
        />
        <button
          className="search-button"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          <PiPaperPlaneRightFill />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;

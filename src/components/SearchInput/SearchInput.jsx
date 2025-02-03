import React, { useState } from "react";
import "./SearchInput.css";
import { useDispatch, useSelector } from "react-redux";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { fetchChatData } from "../../store/slices/chatSlice"; // Import thunk

const SearchInput = ({ setCurrentQuestion }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");

  const { loading } = useSelector((state) => state.chatUI); // Get loading state

  const handleSubmit = () => {
    if (!question.trim()) return;

    setCurrentQuestion(question); // Update the UI with the current question
    dispatch(fetchChatData({ question })); // Dispatch the thunk action
    setQuestion(""); // Clear input field after submission
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
          value={question}
          className="search-input"
          type="text"
          placeholder="Ask Question"
          onKeyDown={handleKeyPress}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="search-button"
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
        >
          <PiPaperPlaneRightFill />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;

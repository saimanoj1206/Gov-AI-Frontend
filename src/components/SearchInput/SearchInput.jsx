import React, { useState } from "react";
import "./SearchInput.css";
import { useDispatch, useSelector } from "react-redux";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { fetchChatData } from "../../store/slices/chatSlice";

const SearchInput = ({ setCurrentQuestion }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");

  const { loading } = useSelector((state) => state.chatUI);

  const handleSubmit = () => {
    if (!question.trim()) return;

    setCurrentQuestion(question);
    dispatch(fetchChatData({ question }));
    setQuestion("");
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
          disabled={loading}
        >
          <PiPaperPlaneRightFill />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;

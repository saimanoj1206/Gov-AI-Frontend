import React, { useState } from "react";
import "./SearchInput.css";
import { useDispatch, useSelector } from "react-redux";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { fetchChatData } from "../../store/slices/chatSlice";
import { postThreadHistory } from "../../store/slices/historySlice";

const SearchInput = ({ setCurrentQuestion, faqQuestion, docView }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const { loading } = useSelector((state) => state.chatUI);
  const { session_id } = useSelector((state) => state.user);
  const { activeThreadId } = useSelector((state) => state.history);
  console.log("activeThreadId", activeThreadId);
  console.log("session_id", session_id);

  const handleSubmit = () => {
    if (!question.trim()) return;
    setCurrentQuestion(question);
    dispatch(fetchChatData({ question }));
    dispatch(postThreadHistory({ threadName: question }));
    setQuestion("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      style={{ marginLeft: docView ? "5%" : "9%" }}
      className="search-container-wrapper"
    >
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

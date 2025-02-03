import React, { useState } from "react";
import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import HelpPrompt from "../../components/HelpPrompt/HelpPrompt";
import SearchInput from "../../components/SearchInput/SearchInput";
import Chat from "../../components/Chat/Chat";
import Faq from "../../components/Faq/Faq";
import { useDispatch, useSelector } from "react-redux";
import { clearChat, fetchChatData } from "../../store/slices/chatSlice"; // Import your async thunk

const Dashboard = () => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const dispatch = useDispatch();
  const { chatPage, loading } = useSelector((state) => state.chatUI);
  const [isChatActive, setIsChatActive] = useState(false); // Initially false to show FAQ

  // Handle FAQ click - Trigger API call
  const handleFaqClick = (question) => {
    setCurrentQuestion(question); // Set the question in state
    setIsChatActive(true); // Switch to chat view
    dispatch(fetchChatData({ question })); // Call API
  };

  const handleNewConversation = () => {
    setIsChatActive(false); // Reset to show FAQ again
    setCurrentQuestion("");
    dispatch(clearChat());
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header"></div>
      <div className="dashboard-content">
        <div className="sidebar">
          <Sidebar onNewConversation={handleNewConversation} />
        </div>
        <div className="main-content">
          <HelpPrompt />
          <div className="help-content">
            {loading ? (
              <Chat currentQuestion={currentQuestion} loading={loading} />
            ) : chatPage.length > 0 ? (
              <Chat currentQuestion={currentQuestion} loading={loading} />
            ) : (
              !isChatActive && <Faq handleFaqClick={handleFaqClick} />
            )}
            <SearchInput
              setCurrentQuestion={setCurrentQuestion}
              setLoading={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

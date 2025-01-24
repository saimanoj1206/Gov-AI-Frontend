import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import HelpPrompt from "../../components/HelpPrompt/HelpPrompt";
import SearchInput from "../../components/SearchInput/SearchInput";
import Chat from "../../components/Chat/Chat";
import Faq from "../../components/Faq/Faq";
import useApiCall from "../../hooks/useApiCallPost";

const Dashboard = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [shouldFocus, setShouldFocus] = useState(false);
  const { makeApiCall, loading } = useApiCall(
    "https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/chatbot"
  );

  const handleFaqClick = async (question) => {
    setIsChatActive(true);
    setChatData({ input: question, output: "", source_documents: "" });

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

  return (
    <div className="dashboard">
      <div className="dashboard-header"></div>
      <div className="dashboard-content">
        <div className="sidebar">
          <Sidebar
            isChatActive={isChatActive}
            setIsChatActive={setIsChatActive}
            onNewConversation={() => {
              setIsChatActive(true);
              setChatData(null);
              setShouldFocus(true);
            }}
          />
        </div>
        <div className="main-content">
          <HelpPrompt />
          <div className="help-content">
            {isChatActive ? (
              <Chat chatData={chatData} loading={loading} />
            ) : (
              <Faq handleFaqClick={handleFaqClick} />
            )}
            <SearchInput
              setChatData={setChatData}
              shouldFocus={shouldFocus}
              setIsChatActive={setIsChatActive}
              loading={loading} // Pass loading state to SearchInput
              makeApiCall={makeApiCall} // Pass makeApiCall to SearchInput
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

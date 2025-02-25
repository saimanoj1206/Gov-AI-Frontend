import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import HelpPrompt from "../../components/HelpPrompt/HelpPrompt";
import SearchInput from "../../components/SearchInput/SearchInput";
import Chat from "../../components/Chat/Chat";
import Faq from "../../components/Faq/Faq";
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import { useDispatch, useSelector } from "react-redux";
import { clearChat, fetchChatData } from "../../store/slices/chatSlice";
import { setNewSession } from "../../store/slices/userSlice";

const Dashboard = () => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const dispatch = useDispatch();
  const { chatPage, loading } = useSelector((state) => state.chatUI);
  // const { session_id } = useSelector((state) => state.user);
  const [isChatActive, setIsChatActive] = useState(false);
  const [docView, setDocView] = useState(false);
  const [docId, setDocId] = useState("");
  const [pageNumbers, setPageNumbers] = useState("");
  const [flex, setFlex] = useState(0);

  const handleFaqClick = (question) => {
    setCurrentQuestion(question);
    setIsChatActive(true);
    dispatch(fetchChatData({ question }));
  };

  const handleNewConversation = () => {
    setIsChatActive(false);
    setCurrentQuestion("");
    dispatch(clearChat());
    dispatch(setNewSession());
    setDocView(false);
    setFlex(0);
  };

  const handleSourceDocsClick = (doc_id, page_number) => {
    setDocView(true);
    setDocId(doc_id);
    setPageNumbers(page_number);
    setFlex(0.35);
  };
  const closePdfViewer = () => {
    setDocView(false);
    setDocId("");
    setPageNumbers("");
    setFlex(0);
  };

  useEffect(() => {
    const mainContent = document.querySelector(".main-content");
    const searchContainer = document.querySelector(".search-container-wrapper");

    if (mainContent && searchContainer) {
      searchContainer.style.width = `${mainContent.clientWidth - 40}px`;
    }
  }, [flex]);

  return (
    <div className="dashboard">
      <div className="dashboard-header"></div>
      <div className="dashboard-content">
        <div className="sidebar">
          <Sidebar onNewConversation={handleNewConversation} />
        </div>
        <div className="main-content" style={{ flex: 0.8 - flex }}>
          <div className="chat-content">
            <HelpPrompt />
            {loading ? (
              <Chat
                currentQuestion={currentQuestion}
                loading={loading}
                onSourceClick={handleSourceDocsClick}
                docView={docView}
              />
            ) : chatPage.length > 0 ? (
              <Chat
                currentQuestion={currentQuestion}
                loading={loading}
                onSourceClick={handleSourceDocsClick}
                docView={docView}
              />
            ) : (
              !isChatActive && <Faq handleFaqClick={handleFaqClick} />
            )}
            <SearchInput
              setCurrentQuestion={setCurrentQuestion}
              setLoading={() => {}}
            />
          </div>
        </div>
        <div className="pdf-container" style={{ flex: flex }}>
          {docView && (
            <PdfViewer
              doc_id={docId}
              pageNumbers={pageNumbers}
              closePdfViewer={closePdfViewer}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

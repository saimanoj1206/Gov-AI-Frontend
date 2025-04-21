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
import {
  postThreadHistory,
  setActiveThreadId,
  setResumeChat,
} from "../../store/slices/historySlice";
import ResumeChat from "../../components/ResumeChat/ResumeChat";
import { fetchFaqData } from "../../store/slices/faqSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const { chatData, loading } = useSelector((state) => state.chatUI);
  const [isChatActive, setIsChatActive] = useState(false);
  const [docView, setDocView] = useState(false);
  const [docId, setDocId] = useState("");
  const [pageNumbers, setPageNumbers] = useState("");
  const [faqQuestion, setFaqQuestion] = useState(null);
  const { resumeChat } = useSelector((state) => state.history);

  const handleFaqClick = (question) => {
    setCurrentQuestion(question);
    setIsChatActive(true);
    dispatch(fetchChatData({ question }));
    dispatch(postThreadHistory({ threadName: question }));
    setFaqQuestion(question);
  };

  const handleNewConversation = () => {
    setIsChatActive(false);
    setCurrentQuestion("");
    dispatch(clearChat());
    dispatch(setNewSession());
    dispatch(setResumeChat(false));
    dispatch(setActiveThreadId(null));
    setDocView(false);
  };

  const handleSourceDocsClick = (doc_id, page_number) => {
    setDocView(true);
    setDocId(doc_id);
    setPageNumbers(page_number);
  };
  const closePdfViewer = () => {
    setDocView(false);
    setDocId("");
    setPageNumbers("");
  };

  useEffect(() => {
    dispatch(fetchFaqData());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard-header"></div>
      <div className="dashboard-content">
        <div className="sidebar">
          <Sidebar onNewConversation={handleNewConversation} />
        </div>
        <div className="main-content">
          <div className="chat-content">
            {currentQuestion.length || chatData.length ? <></> : <HelpPrompt />}
            {loading ? (
              <Chat
                currentQuestion={currentQuestion}
                loading={loading}
                onSourceClick={handleSourceDocsClick}
                docView={docView}
              />
            ) : chatData.length > 0 ? (
              <Chat
                currentQuestion={currentQuestion}
                loading={loading}
                onSourceClick={handleSourceDocsClick}
                docView={docView}
              />
            ) : (
              !isChatActive && <Faq handleFaqClick={handleFaqClick} />
            )}
            <div
              className={`search-resume-container ${docView ? "pdf-open" : ""}`}
            >
              {resumeChat ? (
                <ResumeChat docView={docView} />
              ) : (
                <SearchInput
                  faqQuestion={faqQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                  docView={docView}
                />
              )}
            </div>
          </div>
        </div>
        {docView && (
          <div className="pdf-container">
            <PdfViewer
              doc_id={docId}
              pageNumbers={pageNumbers}
              closePdfViewer={closePdfViewer}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import "./Sidebar.css";
import imgUrlLight from "../../logo/logo_light.png";
import { BiMessageRoundedAdd } from "react-icons/bi";
import ChatHistory from "../ChatHistory/ChatHistory";

const Sidebar = ({ isChatActive, setIsChatActive, onNewConversation }) => {
  const handleClick = () => {
    setIsChatActive(true);
    onNewConversation();
  };

  const handleLogoClick = () => {
    setIsChatActive(false);
  };

  return (
    <div className="sidebar-options">
      <div className="sidebar-container">
        <img
          src={imgUrlLight}
          alt="Logo"
          className="sidebar-logo"
          onClick={handleLogoClick}
        />
        <span className="sidebar-title">Insights Agents</span>
        <button className="sidebar-button" onClick={handleClick}>
          <BiMessageRoundedAdd /> New Conversation
        </button>
      </div>
      <div className="sidebar-chat">
        <ChatHistory />
      </div>
    </div>
  );
};

export default Sidebar;

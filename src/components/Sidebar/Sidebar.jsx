import React from "react";
import "./Sidebar.css";
import imgUrlLight from "../../logo/hcsc_logo.png";
import { BiMessageRoundedAdd } from "react-icons/bi";
import ChatHistory from "../ChatHistory/ChatHistory";
import ProfileBar from "../ProfileBar/ProfileBar";

const Sidebar = ({ onNewConversation }) => {
  const handleClick = () => {
    onNewConversation();
  };

  const handleLogoClick = () => {};

  return (
    <div className="sidebar-options">
      <div className="sidebar-container">
        <img
          src={imgUrlLight}
          alt="Logo"
          className="sidebar-logo"
          onClick={handleLogoClick}
        />
        <span className="sidebar-title">Systrans AI Assistant</span>
        <button className="sidebar-button" onClick={handleClick}>
          <BiMessageRoundedAdd /> New Conversation
        </button>
      </div>
      <div className="sidebar-chat">
        <ChatHistory />
      </div>
      <div>
        <ProfileBar />
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { TbHelp, TbUserCircle } from "react-icons/tb";
import "./ProfileBar.css"; // Import the CSS file
import AboutPage from "../AboutPage/AboutPage";

const ProfileBar = () => {
  const [showAbout, setShowAbout] = useState(false);
  const handleCloseAbout = () => {
    setShowAbout(false);
  };
  return (
    <div className="icon-bar">
      <hr className="separator-icon" />
      <div className="icon-container">
        <TbUserCircle className="icon" />
        <span className="icon-title">Profile</span>
      </div>
      <div className="icon-container" onClick={() => setShowAbout(!showAbout)}>
        <TbHelp className="icon" />
        <span className="icon-title">Help & Support</span>
      </div>
      {showAbout && <AboutPage onClose={handleCloseAbout} />}
    </div>
  );
};
export default ProfileBar;

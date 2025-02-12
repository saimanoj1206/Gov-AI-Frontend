import React from "react";
import { TbHelp, TbUserCircle } from "react-icons/tb";
import "./ProfileBar.css"; // Import the CSS file
const ProfileBar = () => {
  return (
    <div className="icon-bar">
      <TbHelp className="icon" />
      <TbUserCircle className="icon" />
    </div>
  );
};
export default ProfileBar;

import React from "react";
import "./Shimmer.css";

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      <div className="shimmer-message bot"></div>
      <div className="shimmer-message medium"></div>
      <div className="shimmer-message small"></div>
      <div className="shimmer-message short"></div>
    </div>
  );
};

export default Shimmer;

import React from "react";
import "./Loading.scss";

const Loading = ({ numberOfCircles }) => {
  return (
    <>
      <div className="loading-scene">
        {Array(numberOfCircles || 5)
          .fill(0)
          .map((elem, i) => (
            <div key={i} className="circle"></div>
          ))}
        {Array(numberOfCircles || 5)
          .fill(0)
          .map((elem, i) => (
            <div key={i} className="shadow"></div>
          ))}
        <span className="loading-text">Loading</span>
      </div>
    </>
  );
};

export default Loading;

import React from "react";
import "./Card.scss";

const Card = ({ paragraph, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="movie-card" className="card-image" />
      <div className="content">
        <h2 className="title">Lion King {}</h2>
        <p className="copy">{paragraph}</p>
        <button className="btn">Go To</button>
      </div>
    </div>
  );
};

export default Card;

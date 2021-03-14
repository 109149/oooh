import React from "react";
import { v4 as uuid } from "uuid";
import Card from "./Card";
import "./Cards.scss";

const Cards = ({ contents }) => {
  const { trivia, imageUrls } = contents;

  const zip = ({ trivia, imageUrls }) =>
    trivia.length > imageUrls.length
      ? imageUrls
          .slice(0, 12)
          .map((imageUrl, i) => ({ trivia: trivia[i], imageUrl }))
      : trivia
          .slice(0, 12)
          .map((trivia, i) => ({ trivia, imageUrl: imageUrls[i] }));

  return (
    <div className="cards-body">
      <main className="page-content">
        {zip({ trivia, imageUrls }).map((zipped) => (
          <Card
            paragraph={zipped.trivia}
            imageUrl={zipped.imageUrl}
            key={uuid()}
          />
        ))}
      </main>
    </div>
  );
};

export default Cards;

/**
 * Card component:
 *   * renders the image of the current card
 */
import React, { useState } from "react";
import "./Card.css";

// const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Card = ({ card }) => {
  // console.log("CARD: ", card);

  const [{angle, xPos, yPos}] = useState({
    angle: Math.random() * 90 - 45,
    xPos: Math.random() * 40 - 20,
    yPos: Math.random() * 40 - 20
  });

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  return (
    <img className="Card"
      src={card.image} 
      alt={`${card.value} of ${card.suit}`}
      style={{transform}}
    />
  )
}

export default Card;

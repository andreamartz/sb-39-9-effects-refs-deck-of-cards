/**
 * Deck component:
 *   * shows the Draw Card button (form)
 *   * renders each new card drawn
 */

// import React, { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Form1 from "./Form1";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck1 = () => {
  const INITIAL_STATE = [];
  const [deck, setDeck] = useState("3p40paa87x90");
  const [cardsDrawn, setCardsDrawn] = useState(INITIAL_STATE);
  const [canDraw, setCanDraw] = useState(true);

  // get a new shuffled deck
  useEffect(() => {
    async function getNewDeck() {
      const res = await axios.get(`${API_BASE_URL}/new/shuffle`);
      console.log("NEW DECK: ", res);
      setDeck(res.data);
    };
    getNewDeck();
  }, []);


  // draw a card
  async function drawCard() {
    if (canDraw) {
      const res = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/?count=1`);
      // console.log("NEW CARD: ", res.data.cards[0], "FULL RES: ", res);
      
      setCardsDrawn(cards => [
        ...cardsDrawn,
        { ...res.data.cards[0] }
      ]);
      // console.log("DRAWCARD() ran! ", "CARDS DRAWN: ", cardsDrawn);
      if (res.data.remaining === 0) {
        setCanDraw(false);
      }
      console.log("REMAINING: ", res.data.remaining);
    } else {
    alert("Error: no cards remaining!")
    }
  };

  // console.log("CARDS DRAWN: ", cardsDrawn);
  return (
    <>
      <Form1 drawCard={drawCard}/>
      <div className="Deck">
        {cardsDrawn.map(card => <Card card={card} key={card.code}/>)}
      </div>
    </>
  )
}

export default Deck1;
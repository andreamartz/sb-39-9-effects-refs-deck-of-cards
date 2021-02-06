/**
 * Deck component:
 *   * shows the Draw Card button (form)
 *   * renders each new card drawn
 */

// import React, { useState, useEffect } from "react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card";
// import Form2 from "./Form2";
import "./Deck.css";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck2 = () => {
  const INITIAL_STATE = [];
  const [deck, setDeck] = useState("3p40paa87x90");
  const [cardsDrawn, setCardsDrawn] = useState(INITIAL_STATE);
  const [canDraw, setCanDraw] = useState(false);
  const intervalRef = useRef(null);

  const toggleDraw = () => {
    setCanDraw(!canDraw);
    console.log("CANDRAW is now: ", canDraw);
  }

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
  useEffect(() => {
    const {deck_id} = deck; 
    async function drawCard() {
      try {
        const res = await axios.get(`${API_BASE_URL}/${deck_id}/draw/?count=1`);
      
        // update the cardsDrawn array
        if (res.data.cards[0]) {
          setCardsDrawn(cards => [
            ...cardsDrawn,
            { ...res.data.cards[0] }
          ]);
        }

        // throw error if no cards remaining
        if (res.data.remaining === 0) {
          setCanDraw(false);
          throw Error ("Error: no cards remaining!");
        }

        console.log("REMAINING: ", res.data.remaining);
      } catch (err) {
        alert (err);
      }
    };

    // start interval and get its id
    if (canDraw && !intervalRef.current) {
      intervalRef.current = setInterval(async () => {
        await drawCard();
      }, 1000);
    }


    // cleanup by clearing interval
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // return () => {
    //   clearInterval(timerRef.current);
    //   timerRef.current = null;
    // };


  }, [canDraw, cardsDrawn, deck])

  // console.log("CARDS DRAWN: ", cardsDrawn);
  return (
    <>
      <div className="Deck">
        <button className="Deck-button" onClick={toggleDraw}>
          {canDraw ? "Stop drawing cards" : "Draw a card"}
        </button>
        <div className="Deck-cards">
          {cardsDrawn.map(card => 
            <Card card={card} key={card.code}/>
          )}
        </div>
      </div>
    </>
  )
}

export default Deck2;
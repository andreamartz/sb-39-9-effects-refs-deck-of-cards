import React from "react";
import "./Form.css";

const Form2 = ({ toggleDraw, canDraw }) => {
  async function handleSubmit(evt) {
    evt.preventDefault();
    await toggleDraw();
  }
  return (
    <>
      <form className="Form" onSubmit={handleSubmit}>
        <button className="Form-button">
          {{canDraw} ? "Stop drawing cards" : "Draw a card"}
        </button>
      </form>
    </>
  )
}

export default Form2;
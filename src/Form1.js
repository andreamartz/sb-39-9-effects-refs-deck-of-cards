import React from "react";
import "./Form.css";

const Form1 = ({ drawCard }) => {
  async function handleSubmit(evt) {
    evt.preventDefault();
    await drawCard();
  }
  return (
    <>
      <form className="Form" onSubmit={handleSubmit}>
        <button className="Form-button">Draw a card</button>
      </form>
    </>
  )
}

export default Form1;
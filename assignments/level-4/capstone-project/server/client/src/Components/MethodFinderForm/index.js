import React, { useState } from 'react'
import './style.css'

export default function MethodFinderForm() {
  const [answerInput, setAnswerInput] = useState("A method to add two arrays into one");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    //console.log(answerInput + ' sent')

    const response = await fetch('/api/generate/method', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({ answer: answerInput })
    });
    const data = await response.json();
    //console.log('result', data);

    setResult(data.result)
  }

  return (
    <div className="main-form">
      <h1>The JavaScript Method Finder</h1>
      <form className="advice-form" onSubmit={onSubmit}>
        <div style={{}}>
          <h2 
            className="main-form__text-input-label"
            name="problem">What action are you trying to perform? </h2>
          <input
            className="main-form__text-input"
              type="text"
              rows="1"
              cols="1"
              name="problem"
              placeholder=""
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
          />
        </div>
        <div>
          <input className="main-form__submit-btn" type="submit" value="Get Method" />
        </div>
      </form>
      <div className="main-form__result">{result}</div>
    </div>
  )
}

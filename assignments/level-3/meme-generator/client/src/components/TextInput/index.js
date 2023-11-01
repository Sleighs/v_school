import React, { useState } from 'react'

export default function TextInput(props) {
  const {
    memeText,
    setMemeText,
    boxesOn,
    setBoxesOn
  } = props
  
  // Handle meme text changes
  const handleTextChange = (box, text) => {
    // Update text inputs
    if (box === 'text0'){
      setMemeText(prevData => {
        return {
          ...prevData,
          text0: text
        }
      })
    } else if (box === 'text1'){
      setMemeText(prevData => {
        return {
          ...prevData,
          text1: text
        }
      })
    } else {
      // Update text boxes array
      var textArr = memeText.boxes.map((obj, index) => {
        if (index === box) {
          return {...obj, text: text};
        }
        return obj;
      })

      // Update the post data
      setMemeText(prevData => {
        return {
          ...prevData,
          boxes: textArr
        }
      })
    }
  }

  return (
    <div className="text-boxes-container">
      {boxesOn ? memeText.boxes.map((item, i) => 
        <div className={'text-item'+i} key={i}>
          <input
            className={"form-input input__text" + i}
            type="text"
            placeholder={"Line " + String(i + 1)}
            onChange={e => {
              handleTextChange(i, e.target.value)
            }}
            value={memeText.boxes[i].text}
            name={"text" + i}
          />
        </div>
      ) : 
        <div className="text-item">
          <input
            className={"form-input input__text0"}
            type="text"
            placeholder={"Line 1"}
            onChange={e => {
              handleTextChange('text0', e.target.value)
            }}
            value={memeText.text0.text}
            name={"text0"}
          />
          <input
            className={"form-input input__text1"}
            type="text"
            placeholder={"Line 2"}
            onChange={e => {
              handleTextChange('text1', e.target.value)
            }}
            value={memeText.text1.text}
            name={"text1"}
          />
        </div>
      }
    </div>
  )
}
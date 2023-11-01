import React, { useContext, useState, useRef, useEffect, useCallback } from 'react'
import { DataContext } from '../../Contexts/DataContext';
import './style.css'
import './themes.css'
import {isMobile} from 'react-device-detect';

export default function ChatBot() {
  const [textInput, setTextInput] = useState(isMobile ? "" : "I'm looking for a method to combine two arrays into one");
  const [enterPressed, setEnterPressed] = useState(0)
  
  const { chat, setChat, chatTheme, changeTheme } = useContext(DataContext)
  
  const textareaRef = useRef()

  async function onSubmit(event) {
    const response = await fetch('/api/generate/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({ answer: textInput })
    });
    const data = await response.json();
    
    addNewChat('bot', data.result)
  }

  const addNewChat = (user, text) => {
    setChat((prevData => {
      return ([
        ...prevData,
        {person: user, text: text}
      ])
    }))
  }

  const handleKeyDown = 
    useCallback(
      (e) => {
        if (e.key === "Enter"){
          
          addNewChat('user', textInput)
          setEnterPressed(prevState => {return(prevState+1)})
          onSubmit()
        }
        console.log(e.key, enterPressed)
      }
    ,[chat, enterPressed])

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 2 + "px";
    }
    //document.addEventListener("keydown", handleKeyDown);
  }, [textInput])

  return (
    <div className="chat-bot">
      <div className="chat-container">
        <div className="chat-theme-btn" onClick={()=>{changeTheme()}}>{`Theme: ${chatTheme}`}</div>
        {chat.map((item, i) => {
          return (
            <div className={`
              chat-row 
              chat-${item.person} 
              chat-${item.person}-${chatTheme}`
            } key={i}>{item.text}</div>
          )
        })}
      </div>
      <form className="chat-form" onSubmit={(e)=> {
          e.preventDefault()
          addNewChat('user', textInput)
          onSubmit()
        }}>
        <div className='chat-form__input'>
          <input
            style={{display: 'none'}}
            className="chat-form__input-text"
            type="text"
            minLength="1"
            name="user text"
            placeholder=""
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            />
          <textarea
            //style={{display: 'none'}}
            ref={textareaRef}
            className="chat-form__input-textarea"
            type="text"
            name="user text"
            placeholder=""
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
        </div>
        <div className='chat-form__submit-btn-container'>
          <input className="chat-form__submit-btn" type="submit" value={isMobile ? ">" : "Send"} />
        </div>
      </form>
    </div>
  )
}

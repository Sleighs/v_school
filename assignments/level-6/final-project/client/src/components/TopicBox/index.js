import React from 'react'
import './style.css'

export default function TopicBox(props) {
  return (
    <div className='topic-box'>
      <div className='topic-box__text'>{props.topic}</div>
    </div>
  )
}

import React from 'react'
import './style.css'

export default function Footer() {
  return (
    <div className='footer-container'>
      <hr style={{
        opacity: .25,
        width: '100%',
      }}/>
      <div className='footer-icons'>
        <div className='footer-icon' id='twitter-icon'>
          {/*<img src='../../assets/twitter.png' alt=''/>*/}
        </div>
        <div className='footer-icon facebook-icon'></div>
        <div className='footer-icon github-icon'></div>
      </div>
      <div className='footer-text'>Copyright © Your Website 2022</div>
    </div>
  )
}

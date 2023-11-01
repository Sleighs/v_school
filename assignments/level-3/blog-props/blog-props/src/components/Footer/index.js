import React from 'react'
import './style.css'
import twitterIcon from '../../assets/twitter.png'
import facebookIcon from '../../assets/facebook.png'
import githubIcon from '../../assets/github.png'



export default function Footer() {
  return (
    <div className='footer-container'>
      <hr style={{
        opacity: .25,
        width: '100%',
      }}/>
      <div className='footer-icons'>
        <div className='footer-icon'>
          <img className='footer-icon-img' id='twitter-icon' src={twitterIcon} alt=''/>
        </div>
        <div className='footer-icon facebook-icon'>
          <img className='footer-icon-img' id='facebook-icon' src={facebookIcon} alt=''/>
        </div>
        <div className='footer-icon github-icon'>
        <img className='footer-icon-img' id='github-icon' src={githubIcon} alt=''/>
        </div>
      </div>
      <div className='footer-text'>Copyright © Your Website 2022</div>
    </div>
  )
}

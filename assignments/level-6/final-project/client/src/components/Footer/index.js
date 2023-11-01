import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__links">
        <a className="footer__link" href="">About</a>
        <a className="footer__link" href="">Contact</a>
        <a className="footer__link" href="">Terms of Service</a>
        <a className="footer__link" href="">Privacy Policy</a>
      </div>
      <div className="footer__brand" onClick={()=>{window.scrollTo(0,0)}}>&copy; 2023 StreamGood</div>
    </div>
  )
}

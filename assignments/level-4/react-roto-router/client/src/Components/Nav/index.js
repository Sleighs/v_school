import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import blueLogo from '../../assets/logo-blue.png'

export default function Nav() {
  return (
    <div className="nav">
      <nav className="nav__container">
        <Link to="/" className="nav__logo-link"><img 
            className="nav__logo" 
            src={blueLogo} 
            alt=''
        />
        </Link>
        <div className="nav__links">
            <Link to="/about" className="nav__link">About Us</Link>
            <Link to="/contact" className="nav__link">Contact</Link>
        </div>
      </nav>
    </div>
  )
}

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../Contexts/DataContext';
import './style.css'
import './themes.css'

export default function Nav() {
  const { navTheme, changeNavTheme } = useContext(DataContext)
  
  return (
    <div className={`nav nav-theme-${navTheme}`}>
      <nav className="nav__container">
        <Link to="/" className="nav__logo-link nav__link">Chat
        <div className="nav-theme-btn" onClick={changeNavTheme}>{'...'}</div>
        </Link>
        <div className="nav__links">
            <Link to="/about" className="nav__link">About</Link>
            <Link to="/studyguide" className="nav__link">Study Guide</Link>
        </div>
      </nav>
    </div>
  )
}

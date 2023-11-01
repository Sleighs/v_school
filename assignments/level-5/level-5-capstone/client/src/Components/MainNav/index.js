import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'

export default function MainNav() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
  
    return (
      <nav className="navigation">
        <Link to="/" className="main-nav__list-item brand-name">Nanome</Link> 
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d={`
                M3 5a1 
                1 0 011-1h12a1 
                1 0 110 2H4a1 
                1 0 01-1-1z 
                
                M3 10a1 
                1 0 011-1h12a1 
                1 0 110 2H4a1
                1 0 01-1-1z  
                
                M3 15a1 
                1 0 011-1h12a1 
                1 0 110 2H4a1 
                1 0 01-1-1z`}
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li className="main-nav__list-item-container">
              <Link 
                to="/lineup-analyzer" 
                className="main-nav__list-item" 
                onClick={() => {setIsNavExpanded(!isNavExpanded);}}
              >
                  Team Analyzer</Link> 
            </li>
            <li className="main-nav__list-item-container">
              <Link 
                to="/heroes" 
                className="main-nav__list-item" 
                onClick={() => {setIsNavExpanded(!isNavExpanded);}}
              >
                Heroes
              </Link>
            </li>
            <li className="main-nav__list-item-container">
              <Link 
                to="/counters" 
                className="main-nav__list-item"
                onClick={() => {setIsNavExpanded(!isNavExpanded);}}
              >
                Counters
              </Link> 
            </li>
                        
          </ul>
        </div>
      </nav>
    );
  }
  
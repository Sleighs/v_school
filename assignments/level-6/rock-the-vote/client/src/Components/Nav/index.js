import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../../Contexts/UserContext';
import './style.css'

export default function Nav() {
  const { userState } = useContext(UserContext)
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  
  return (
    <nav className="navigation">
      <Link to="/" className="main-nav__list-item brand-name">Rock the Vote</Link> 
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
          <li className="main-nav__list-item-container"
            style={{display: 'none',}}>
            <Link 
              to="/issues" 
              className="main-nav__list-item" 
              onClick={() => {setIsNavExpanded(!isNavExpanded);}}
            >
              Issues
            </Link> 
          </li>
          {userState.token 
            ?
              <li className="main-nav__list-item-container">
                <Link 
                  to="/createpost" 
                  className="main-nav__list-item" 
                  onClick={() => {setIsNavExpanded(!isNavExpanded);}}
                >
                  Create Post
                </Link>
              </li>
            : <></>
          }   
          {userState.token 
            ?
              <li className="main-nav__list-item-container">
                <Link 
                  to="/profile" 
                  className="main-nav__list-item" 
                  onClick={() => {setIsNavExpanded(!isNavExpanded);}}
                >
                  Profile
                </Link>
              </li>
            : 
              <li className="main-nav__list-item-container">
                <Link 
                  to="/login" 
                  className="main-nav__list-item" 
                  onClick={() => {setIsNavExpanded(!isNavExpanded);}}
                >
                  Login/Register
                </Link>
              </li>
          }                      
        </ul>
      </div>
    </nav>
  );
}
  
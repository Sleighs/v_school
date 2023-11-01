import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

export default function NavList(props) {
  const { 
    isNavExpanded, 
    setIsNavExpanded,
  } = props

  return (
    <ul className="main-nav__list">
      <li className="main-nav__list-item-container">
        <Link 
          to="/browse" 
          className="main-nav__list-item" 
          onClick={() => {setIsNavExpanded(!isNavExpanded);}}
        >
          Browse
        </Link> 
      </li> 
      <li className="main-nav__list-item-container">
        <Link 
          to="/" 
          className="main-nav__list-item" 
          onClick={() => {setIsNavExpanded(!isNavExpanded);}}
        >
          Compare
        </Link> 
      </li>     
    </ul>
  )
}

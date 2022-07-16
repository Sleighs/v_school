import React from 'react'
import './style.css'

export default function Navbar() {
  return (
    <div className='nav-container'>
        <div className='nav-title'>Start Bootstrap</div>
        <nav className='nav'>
            <ul className='nav-links-container'>
                <li className='nav-link'>HOME</li>
                <li className='nav-link'>ABOUT</li>
                <li className='nav-link'>SAMPLE POST</li>
                <li className='nav-link'>CONTACT</li>
            </ul>
        </nav>
    </div>
  )
}

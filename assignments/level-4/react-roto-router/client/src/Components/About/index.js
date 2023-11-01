import React from 'react'
import redLogo from '../../assets/logo-red.png'
import './style.css'

export default function About() {
  return (
    <div className="about__container">
        <img 
          className="about__logo" 
          style={{height: 350, margin: 'auto'}}
          src={redLogo} alt=""
        />
        <div className="about__text">
          <h2 className="about__text-title">About Roto Router</h2>
          <p >React Roto Router has served the greater metropolis region since 2022, providing quality plumbing, HVAC and heating services.  </p>
          
          <h2 className="about__text-title2">Services</h2>
          <ul>
            <li>HVAC</li>
            <li>Natural Gas</li>
            <li>Plumbing</li>
            <li>Appliances</li>
            <li>Water Heaters</li>
          </ul> 
        </div>
        
    </div>
  )
}

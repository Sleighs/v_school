import React from 'react'
import './style.css'
import redLogo from '../../assets/logo-red.png'

export default function Landing() {
  return (
    <div className="landing__container">
      <img className="landing__image" src={redLogo} alt='' />
        <h1 className="landing__header-text"> Installation &diams; Maintenance &#9830; Repairs</h1>
    </div>
  )
}

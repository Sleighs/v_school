import React from 'react'
import './style.css'
import { Navbar } from '..'

export default function Header() {
  return (
    <div className='header-container'>
        <Navbar />
        <div className="header-image"></div>
        <h1 className='header-title'>Clean Blog</h1>
        <p className='header-subtitle'>A Blog Theme by Start Bootstrap</p>
    </div>
  )
}

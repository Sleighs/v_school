import React, { useContext, useEffect } from 'react'
import landingPics from '../../Assets/landing'
import { HeroSelection } from '../../Components'
import { DataContext } from '../../Context/DataContext'
import './style.css'

export default function HomePage() {
  const { heroData, getCharacterData } = useContext(DataContext)

  useEffect(() => {
    getCharacterData()
  }, [])

  return (
    <div className="home-page__container">
      <div className="home-page__landing-img-container">
        <img  className="home-page__landing-img" src={landingPics.torbJump} alt='' />
        <div className="home-page__head">
          <h1 className="home-page__head-title">NANOME</h1>
          <h3 className="home-page__head-title2">Overwatch Team Building & Strategy Resources</h3> 
        </div>
      </div>
      
      <div className="home-page__section">
        <div className="home-page__section-text">
          <p>Welcome to Nanome! Explore Overwatch 2 hero counters, team builds and synergies between characters.</p>
        </div>
        <div className="home-page__heroes">
          <p>Select a hero to view stats and counters.</p>
          {heroData && <HeroSelection />}
        </div>
      </div>
    </div>
  )
}

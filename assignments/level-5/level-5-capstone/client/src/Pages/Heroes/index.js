import React from 'react'
import { HeroSelection } from '../../Components'
import './style.css'

export default function HeroesPage() {
  return (
    <div className="heroes-page">
      <h1 className="heroes-page__title page-title">Heroes</h1>
      <div className='heroes-page__summary'>
        <p>Select a hero to view stats and matchup information.</p>
      </div>
      <HeroSelection />
    </div>
  )
}

import React, { useContext, useEffect } from 'react'
import { Footer, LineUpChart } from '../../Components'
import { DataContext } from '../../Context/DataContext'
import './style.css'

export default function LineUpAnalyzer() {
  const { heroData, getCharacterData } = useContext(DataContext)

  useEffect(() => {
    getCharacterData()
  }, [])

  return (
    <div className='home-page__container'>
      <h2 id="lineup-table__title" className="lineup-table__title page-title">Team Analyzer</h2>
        
      <div className="lineup-table__summary">
        <p>
          {`The team analyzer shows the advantage strength each team hero has against each hero.`}
        </p>
      </div>
      
      {heroData && <LineUpChart />}
    </div>
  )
}

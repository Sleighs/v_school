import React, { useContext, useEffect } from 'react'
import { MatchupTable } from '../../Components'
import { DataContext } from '../../Context/DataContext'
import './style.css'

export default function CountersPage() {
  const {getCharacterData, heroData} = useContext(DataContext)
  
  useEffect(()=>{
    getCharacterData()
  }, [])

  return (
    <div>
      <h2 id="counter-table__title" className="page-title">Counter Chart</h2>
      <div className="counter-table__summary">
        <p>{'The chart below shows all of the heroes and how they matchup against other heroes. '}</p>
      </div>
      {heroData && <MatchupTable />}
    </div>
  )
}

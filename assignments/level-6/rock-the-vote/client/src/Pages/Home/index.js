import React, { useContext, useEffect } from 'react'
import './style.css'
import { Auth, Footer, IssuesList, Nav } from '../../Components'
import { UserContext } from '../../Contexts/UserContext'

export default function Home() {
  return (
    <div className='page-container'> 
      <Nav />       
      <IssuesList />
      <Footer />
    </div>
  )
}

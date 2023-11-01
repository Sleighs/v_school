import React from 'react'
import { Footer, Nav, StreamerList } from '../../components'
import './style.css'
import './background.css'

export default function BrowsePage() {
  return (
    <div className='browse-page browse-page-background'>
      <Nav />
      <h1 className='browse-page__page-title'>Browse Streamers</h1>
      <StreamerList 
        PageSize={20}
      />
      <Footer />
    </div>
  )
}

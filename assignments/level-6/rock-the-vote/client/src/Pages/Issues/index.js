import React from 'react'
import './style.css'
import { Footer, IssuesList, Nav } from '../../Components'

export default function IssuesPage() {
  return (
    <div className='page-container'>
      <Nav />
      <h1>Issues</h1>
      <IssuesList />
      <Footer />
    </div>
  )
}

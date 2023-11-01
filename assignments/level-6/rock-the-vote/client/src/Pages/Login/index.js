import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth, Footer } from '../../Components'
import './style.css'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div id='login-page'>
      <h1 className='login-page__title' onClick={()=>{navigate('/')}}>Rock The Vote</h1>
      <Auth />
    </div>
  )
}

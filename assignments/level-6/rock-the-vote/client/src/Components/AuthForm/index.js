import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext'
import './style.css'

export default function AuthForm(props) {
  const { 
    handleChange, 
    handleSubmit,
    btnText
  } = props

  const { userState } = useContext(UserContext)

  return (
    <div className="auth-form__container">
      <h2 className="auth-form__title">{btnText}</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          name="username"
          className="auth-form__input"
          placeholder='Username'
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="auth-form__input"
          placeholder='Password'
          onChange={handleChange}
        />
        <button className="auth-form__btn" type="submit">{btnText}</button>
        {userState.token && <Navigate to="/" replace={true}/>}
      </form>
    </div>
  )
}

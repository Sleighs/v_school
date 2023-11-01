import React, { useContext } from 'react'
import './style.css'
import { Footer, Nav } from '../../Components'
import { UserContext } from '../../Contexts/UserContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import capitalizeFirstLetter from '../../functions/capitalizeFirstLetter'

export default function ProfilePage() {
  const { userState, logout } = useContext(UserContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.isAuth ) {
      //navigate('/accounts/login');
      window.scrollTo(0, 0);
    } 
  }, []);

  return (
    <div className='page-container'>
      <Nav />
      
      {userState.isAuth &&
        <div className="user-page__content">
          <h1 style={{textAlign:'center',}}>Account Details</h1>
          <hr />
          <div className='user-page__title'>Username</div>
          <div className='user-page__text'>{capitalizeFirstLetter(userState.user.username)}</div>
          <hr />
          <div className='user-page__title'>Email</div> 
          <div className='user-page__text'>{userState.user.email}</div>
          <hr />
          <div className='user-page__title'>Password</div>
          <div className='user-page__text'>{userState.user.password}</div>
      
          <button 
            className='user-page__sign-out-btn' 
            onClick={() => {
              logout();
              navigate('/')
              //window.location.reload()
              window.scrollTo(0, 0)
            }}
          >
            Sign out
          </button>
        </div>
      }

      <Footer />
    </div>
  )
}

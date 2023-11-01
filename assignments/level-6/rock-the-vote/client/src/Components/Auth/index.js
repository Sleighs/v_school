import React, { useContext, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import AuthForm from '../AuthForm'
import './style.css'

const initInputs = { username: '', password: '' }

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login } = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }
    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

  return (
    <div className="auth__container">
        { !toggle ?
            <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnText="Log in"
                />
                <p className="auth__text"
                    onClick={() => setToggle(prev => !prev)}>Not yet a member</p>
            </>
        :
            <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleSignup}
                    inputs={inputs}
                    btnText="Sign up"
                />
                <p className="auth__text"
                    onClick={() => setToggle(prev => !prev)}>Already a member?</p>
            </>
        }
        
    </div>
  )
}

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext'
import AuthForm from '../AuthForm'
import './style.css'

const initInputs = { username: '', password: '' }

export default function Auth(props) {
    const [inputs, setInputs] = useState(initInputs)

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

    let tableHeadItemStyle = {
        borderBottom: '3px solid rgb(0, 194, 123)',
        fontWeight: 'bold',
        textShadow: '0px 0px 1px white',
    }  


    return (
        <div className="auth__container">
            {props.type === 'login' 
                ? <div className='auth__title'>
                    <p>Welcome back!</p>
                    <p>Log in below.</p>
                </div>
                : <div className='auth__title'>
                    <p>Create your account.</p>
                    <p>Free forever.</p>
                </div>
            }

            <div className='auth__table-head'>
                <div className='auth__table-head-item' 
                    style={props.type !== 'login' ? tableHeadItemStyle : {}}>
                    <Link to="/accounts/signup" className="auth__link">Sign Up</Link>
                </div>
                <div className='auth__table-head-item' style={props.type === 'login' ? tableHeadItemStyle : {}}>
                    <Link to="/accounts/login" className="auth__link">Log In</Link>
                </div>
            </div>
            {props.type === 'login' ?
                <div className='auth__login auth__section'>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText="Log In"
                    />
                    {/*<Link to="/accounts/signup" className="auth__link">Not yet a member?</Link>*/}
                </div>
            :
                <div className='auth__signup auth__section'>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText="Sign Up"
                    />
                    {/*<Link to="/accounts/login" className="auth__link">Already a member?</Link>*/}
                </div>
            }
        </div>
    )
}

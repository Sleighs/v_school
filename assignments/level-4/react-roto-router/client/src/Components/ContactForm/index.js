import React, { useState } from 'react'
import './style.css'

export default function ContactForm() {
  const [formInfo, setFormInfo] = useState({
    name: '',
    phone: '',
    email: '',
    text: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormInfo(prevData => {
        return {
            ...prevData,
            [e.target.name]: e.target.value
        }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true)
    console.log('form submitted')
  }

  return (
    <div className='contact-form__container'>
      <div>
        <h1>Contact Us</h1>
      </div>
        {formSubmitted ? 
          <div>
            <p>Thanks for contacting us. We'll get back to you shortly!</p>
            <button onClick={()=>{setFormSubmitted(false)}}>New Contact Form</button>
          </div> :
          <form name='contact-form' onSubmit={handleSubmit}>
            <div className='contact-form__row'>
              <span>Name: </span>
              <input 
                name='name' 
                value={formInfo.name} 
                placeholder=''
                onChange={handleChange}
              />
            </div>
            <div className='contact-form__row'>
              <span>Phone: </span>
              <input 
                name='phone' 
                value={formInfo.phone} 
                placeholder=''
                onChange={handleChange}
              />
            </div>
            <div className='contact-form__row'>
              <span>Email:</span>
              <input 
                name='email' 
                value={formInfo.email} 
                placeholder=''
                onChange={handleChange}
              />
            </div>
            <div className='contact-form__row'>
              <span>Inquiry: </span>
              <textarea
                name='text'
                value={formInfo.text}
                placeHolder=''
                onChange={handleChange}
                />
            </div>
            <button className='contact-form__button' type='submit'>Submit</button>
          </form>
        }
    </div>
  )
}

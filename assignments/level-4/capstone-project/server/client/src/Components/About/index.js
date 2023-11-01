import React from 'react'
import './style.css'

export default function About() {
  return (
    <div className="about__container">
      <div className="about__description">
        <h1 className="about__title">About the JavaScript Assistant</h1>
        <p>JavaScript Assistant is a tool created to help people learn and build JavaScript applications. The JavaScript Assistant Chatbot uses the OpenAI API to provide informed answers. </p>
        <p>For further education check out these other JavaScript resources:</p>
        <ul className="about__list">
          <li className="about__list-item">
          <span>W3Schools -</span>
            <a 
              className='about__ref-link' 
              href='https://www.w3schools.com/js/'
              target='blank'
            >
              w3schools.com/js/
            </a>
          </li>
          <li className="about__list-item">
            <span>Mozilla Docs -</span>
            <a 
              className='about__ref-link' 
              href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'
              target='blank'
            >
              developer.mozilla.org/docs/Web/JavaScript
            </a>
          </li>
          <li className="about__list-item"> 
            <span>JS Books -</span>
            <a 
              className='about__ref-link' 
              href='https://jsbooks.revolunet.com/'
              target='blank'
            >
              jsbooks.revolunet.com/
            </a>
          </li>
          <li className="about__list-item"> 
            <span>Codepen (JS Environment) -</span>
            <a 
              className='about__ref-link' 
              href='https://codepen.io/pen/'
              target='blank'
            >
              codepen.io/pen/
            </a>
          </li>
          <li className="about__list-item"> 
            <span>StackOverflow -</span>
            <a 
              className='about__ref-link' 
              href='https://stackoverflow.com/questions/tagged/javascript'
              target='blank'
            >
              stackoverflow.com/questions/tagged/javascript
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

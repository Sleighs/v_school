import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer, Nav } from '../../Components'
import { IssueContext } from '../../Contexts/IssueContext'
import { UserContext } from '../../Contexts/UserContext'
import './style.css'

export default function CreatePost() {
  const { userState } = useContext(UserContext);
  const { addNewPost, newIssue } = useContext(IssueContext);

  const initState = {
    title: '',
    description: '',
    createdBy: userState.user.username
  }
  const initAlertState = {
    state: false,
    text: ''
  }
  const navigate = useNavigate()

  const [alertState, setAlertState] = useState(initAlertState)
  const [formData, setFormData] = useState(initState)
  
  function handleChange(e) {
    setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
    
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    addNewPost(formData)
  
    //Navigate to post page is successful else handle error
    navigateToNewPage()
  }

  function navigateToNewPage() {
    console.log(newIssue)
    //navigate(`/issue/${newIssue.id}`)
  }

  return (
    <div className='create-post__container'>
      <Nav />
      <div className='create-post__content'>
        <h1 className='create-post__title'>Create Post</h1>
        <form className='create-post_form' onSubmit={handleSubmit}>
          <div>
            <h3>Post Title</h3>
            <input  
              className='create-post_form-title-input'
              name="title" 
              onChange={handleChange}></input>
          </div>
          <div>
            <h3>Description</h3>
            <textarea 
               className='create-post_form-des-input'
               name="description" 
               onChange={handleChange}></textarea>
          </div>
          <button 
            className="create-post_form-submit-btn"
            type="submit">
              Create Post
          </button>
        </form>
        {
          alertState.state && <div className="create-post__alert">{alertState.text}</div>
        }
      </div>
      <Footer />   
    </div>
  )
}

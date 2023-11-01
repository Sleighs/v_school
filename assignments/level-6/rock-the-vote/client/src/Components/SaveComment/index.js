import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { IssueContext } from '../../Contexts/IssueContext'
import { UserContext } from '../../Contexts/UserContext'
import './style.css'

export default function SaveComment(props) {
  const { 
    issueTag, 
    parentTag, 
    commentType,
    getCommentData,
    isAuth
  } = props

  const { userState } = useContext(UserContext)

  const [commentInput, setCommentInput] = useState('')
  const [login, setLogin] = useState(false)

  const handleCommentInput = (e) => setCommentInput(e.target.value)

  async function saveComment(comment, issueTag, parentTag, username ){
    const token = userState.token;

    const commentBody = {
      text: comment,
      issue_tag: issueTag,
      parent_tag: parentTag,
      createdBy: username
    }
    
    const res = await fetch(`/api/comment/new`, {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(commentBody)
    }).then(data => {
      setCommentInput('');
    });

    console.log('save comment', commentBody)

    //const data = await res.json();
  }

  useEffect(()=> {
    if (login){ setLogin(false) }
  }, [])

  return (
    <div className="save-comment__post-comment-container">
      <h2 className="save-comment__post-comment-title">Post a comment</h2>
      <form className="save-comment__post-comment-form"
        onSubmit={e => {
          saveComment(commentInput, issueTag, parentTag, userState.user.username);
          if (commentType === 'issue page') {
            getCommentData(issueTag)
          }
          e.preventDefault();
        }}>
        {isAuth 
        ? 
          <div>
            <textarea 
              className="save-comment__post-comment-form-textarea"
              name="save-comment-textarea" 
              onChange={handleCommentInput} 
              value={commentInput}
            />
            <button 
              className="save-comment__post-comment-form-submit-btn"
              type="submit"
            >
              Save
            </button>
          </div> 
        : <div onClick={() => { setLogin(true) }}>{login 
            ? <Navigate to="/login" replace={true}/>
            : 'Login to comment'}
          </div>}
      </form>
    </div>
  )
}

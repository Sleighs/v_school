import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CommentContext } from '../../Contexts/CommentContext'
import { UserContext } from '../../Contexts/UserContext'
import VoteArrow from '../VoteArrow'
import './style.css'

export default function Issue(props) {
  const { item, index } = props

  const { userState } = useContext(UserContext)
  const { upVote, downVote } = useContext(CommentContext)

  const [currentComment, setCurrentComment] = useState(item)

  return (
    <div className="comment__container" key={index}>
      <div className="comment__vote-container">
        <VoteArrow 
          type="up" 
          tag={item.tag}
          setData={setCurrentComment}
          handleVote={upVote}
          userTag={userState.user.user_tag}
        />
        <div>{currentComment.upVotes - currentComment.downVotes}</div>
        <VoteArrow 
          type="down" 
          tag={item.tag}
          setData={setCurrentComment}
          handleVote={downVote}
          userTag={userState.user.user_tag}
        />
      </div>
      <div className="comment__content">
        <div className="comment__username-container">
          <div>{item.createdBy}</div>
        </div>
        <div className="comment__text-container">
          {item.text}
        </div>
        <div className="comment__links-container">
          <div>Share</div>
          <div>Save</div>
          <div>Reply</div>
        </div>
      </div>
    </div>
  )
}

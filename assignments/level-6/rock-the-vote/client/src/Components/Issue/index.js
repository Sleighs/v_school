import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IssueContext } from '../../Contexts/IssueContext'
import { UserContext } from '../../Contexts/UserContext'
import VoteArrow from '../VoteArrow'
import './style.css'

export default function Issue(props) {
  const { item, index } = props

  const { userState } = useContext(UserContext)
  const { newVote, updateVote } = useContext(IssueContext)

  const [currentIssue, setCurrentIssue] = useState(item)
  const [voteCount, setVoteCount] = useState(0)
  const [currentVote, setCurrentVote] = useState(null)
  const [voteData, setVoteData] = useState(null)
  const [commentData, setCommentData] = useState(null)

  async function checkVote(issueTag, userTag){
    // Check votes by issue for the user
    const res = await fetch(`/vote/check/${issueTag}/${userTag}`);
    const data = await res.json();
    setCurrentVote(data[0]);
  }

  async function getVoteData(tag) {
    const res = await fetch(`/vote/tag/${tag}`);
    const data = await res.json();
    setVoteData(data);
    checkVote(item.issue_tag, userState.user.user_tag)
  }

  async function getCommentData(tag) {
    const res = await fetch(`/comments/issue/${tag}`);
    const data = await res.json();
    setCommentData(data);
  }

  let count = 0;
  useEffect(()=>{
    getVoteData(item.issue_tag);
    getCommentData(item.issue_tag);
    count++;
  },[voteCount, count]);


  return (
    <div className="issue__container" key={index}>
      <div className="issue__vote-container">
        <VoteArrow 
          type={"up"} 
          tag={item.issue_tag} 
          userTag={userState.user.user_tag}
          setData={setVoteCount}
          handleVote={!currentVote ? newVote : updateVote}
          voteData={currentVote}
          vote={currentVote && currentVote.vote === '1' ? '0' : '1'}
        />
        <div style={{userSelect:'none', textAlign: 'center'}}>
          {
            !voteData 
              ? 0 
              : voteData.reduce((acc, obj) => acc + Number(obj.vote), 0)
          }
        </div>
        <VoteArrow 
          type={"down"} 
          tag={item.issue_tag} 
          userTag={userState.user.user_tag}
          setData={setVoteCount}
          handleVote={!currentVote ? newVote : updateVote}
          voteData={currentVote}
          vote={currentVote && currentVote.vote === '-1' ? '0' : '-1'}
        />
      </div>
      <div>
        <div className="issue__heading-container">
          <div className="issue__heading-text">Issue</div>
          <div className="issue__heading-text">Posted by @{item.createdBy}</div>
          <div className="issue__heading-text">submitted {item.dateSubmitted}</div>
        </div>
        <div className="issue__title-container">
          <Link to={`/issue/${item.id}`}>
            <h3 className="issue__title-text issue_link">{item.title}</h3>
          </Link>
        </div>
        <div className="issue__links-container">
          <div className="issue__links-item">
            <Link to={`/issue/${item.id}/${item.title}`}>
              <span  className="issue__links-item issue_link">{`Comments ${!commentData ? `` : `(${commentData.length})`}`}</span>
            </Link>
          </div>
          <div className="issue__links-item issue_link">Share</div>
          <div className="issue__links-item issue_link">Save</div>
        </div>
      </div>
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Comment, Footer, Nav, SaveComment, VoteArrow } from '../../Components'
import { IssueContext } from '../../Contexts/IssueContext'
import { UserContext } from '../../Contexts/UserContext'
import './style.css'

export default function IssuePage() {
  const params = useParams()

  const { userState } = useContext(UserContext)
  const { newVote, updateVote } = useContext(IssueContext)

  const [issueData, setIssueData] = useState(null)
  const [voteData, setVoteData] = useState(null)
  const [commentData, setCommentData] = useState(null)
  const [currentVote, setCurrentVote] = useState(null)
  const [voteCount, setVoteCount] = useState(0)

  async function getIssueData() {
    const res = await fetch(`/issue/${params.issueId}`)
    const data = await res.json()
    
    console.log('userState', userState)
    console.log('params', params)
    console.log('issue data', data)

    setIssueData(data);
    getVoteData(data.issue_tag);
    getCommentData(data.issue_tag);
    checkVote(data.issue_tag, userState.user.user_tag);
  }

  async function getVoteData(tag) {
    const res = await fetch(`/vote/tag/${tag}`)
    const data = await res.json()
    setVoteData(data)
    //console.log('vote data', data)
  }

  async function getCommentData(tag) {
    const res = await fetch(`/comments/issue/${tag}`)
    const data = await res.json()
    setCommentData(data)
    console.log('comments', data)
  }

  async function checkVote(issueTag, userTag){
    // Check votes by issue for the user
    const res = await fetch(`/vote/check/${issueTag}/${userTag}`)
    const data = await res.json();

    //console.log('check vote running...', data[0]);

    setCurrentVote(data[0])
  }

  var updated = 0;
  useEffect(()=> {
    console.log(params)
    getIssueData();
    updated++;
  }, [updated, voteCount])
  
  return (
    <div className="issue-page__container">
      <Nav />
      {issueData && <>
      <div className="issue-page__content1">
        <div className="issue-page__head">
          <div className="issue-page__head-vote-container">
            <VoteArrow 
              type={"up"} 
              tag={issueData.issue_tag} 
              userTag={userState.user.user_tag}
              setData={setVoteCount}
              handleVote={!currentVote ? newVote : updateVote}
              voteData={currentVote}
              vote={currentVote && currentVote.vote === '1' ? '0' : '1'}
            />
            <div className="issue-page__head-vote-score">
              <strong>
              {
                !voteData 
                  ? 0 
                  : voteData.reduce((acc, obj) => acc + Number(obj.vote), 0)
              }
              </strong>
            </div>
            <VoteArrow 
              type={"down"} 
              tag={issueData.issue_tag} 
              userTag={userState.user.user_tag}
              setData={setVoteCount}
              handleVote={!currentVote ? newVote : updateVote}
              voteData={currentVote}
              vote={currentVote && currentVote.vote === '-1' ? '0' : '-1'}
            />
          </div>
          <div className="issue-page__head-description-container">
            <div className="issue-page__head-title">
              <h1>{issueData.title}</h1>
            </div>
            <div className="issue-page__head-description">{issueData.description}</div>
            <div className="issue-page__head-links">Links</div>
          </div>
        </div>
        
        <div className="issue-page__comments-container">
          <div className="issue-page__comments-head">
            <div>All {commentData && commentData.length} comments</div>
            <div style={{display: 'none',}}>Sorted by:</div>
          </div>

          <SaveComment 
            issueTag={issueData.issue_tag} 
            parentTag={"none"} 
            commentType={'issue page'}
            getCommentData={getCommentData}
            isAuth={userState.token === null ? false : true}
          />
          
          <div className="issue-page__comments">
            <div>Comments</div>
            {commentData && 
              commentData.map((item, index) => 
                <Comment 
                  item={item} 
                  index={index}  
                  key={index}
                />
              )
            }
          </div>
          
        </div>
      </div></>}

      <Footer />
    </div>
  )
}

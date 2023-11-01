import React, {useState} from "react"
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem('rtv-token');

const IssueContext = React.createContext();

const IssueContextProvider = (props) => {
    const [allIssues, setAllIssues] = useState(null)
    const [newIssue, setNewIssue] = useState(null)
    const navigate = useNavigate()

    async function getAllIssues(){
        const res = await fetch('/issues', {
            method: "GET",
        })
        const data = await res.json()

        setAllIssues(data)
    }

    async function saveComment(comment, issueTag, parentTag ){
        const commentBody = {
            text: comment,
            issue_tag: issueTag,
            parent_tag: parentTag
        };
        
        const res = await fetch(`/api/comment/new`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(commentBody)
        });

        const data = await res.json();
    }

    async function updateVote(tag, userTag, vote, voteData){
        const res = await fetch(`/api/vote/update/${tag}/${userTag}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                //update to replace vote instead of adding the vote
                //...voteData,
                votedAt: Date.now(),
                vote: vote
            })
        });
        const data = await res.json()

        //console.log('update vote', tag, userTag, vote)
    }

    async function newVote(tag, userTag, vote, voteData){
        const voteBody = {
            vote: vote,
            user_tag: userTag,
            vote_tag: tag,
        }

        const res = await fetch(`/api/vote/new`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(voteBody)
        });

        const data = await res.json()

        //console.log('new vote', tag, userTag, voteBody)
    }

    //Check if user voted and how
    async function checkVote(issueTag, userTag){
        // Check votes by issue for the user
        const res = await fetch('/vote/check', {
            method: 'GET',
            body: {
                tag: issueTag,
                user: userTag
            }
        });
        const data = await res.json();

        console.log('check vote running...', data);
    }

    async function addNewPost(postData) {
        const res = await fetch(`/api/issue/new`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(postData)
        });

        const data = await res.json()

        console.log('new issue', data)

        navigate(`/issues/${data.id}`)

        
    }

    return (
        <IssueContext.Provider value={{
            getAllIssues,
            allIssues,
            saveComment,
            newVote,
            checkVote,
            updateVote,
            addNewPost,
            newIssue
        }}>
            {props.children}
        </IssueContext.Provider>
    );
}

export {IssueContext, IssueContextProvider};
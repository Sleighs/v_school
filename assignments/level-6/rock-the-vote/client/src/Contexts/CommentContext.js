import React, {useState} from "react"

const token = localStorage.getItem('rtv-token');

const CommentContext = React.createContext();

const CommentContextProvider = (props) => {
    async function upVote(tag){
        const getRes = await fetch(`/comments/tag/${tag}`, {
            method: "GET"
        });
        const commentInfo = await getRes.json()

        const updateRes = await fetch(`/api/comment/upVote/${tag}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                //...commentInfo,
                upVotes: Number(commentInfo.upVotes) + 1
            })
        });
    }

    async function downVote(tag){
        const getRes = await fetch(`/comments/tag/${tag}`, {
            method: "GET"
        });
        const commentInfo = await getRes.json()
        
        const updateRes = await fetch(`/api/comment/downVote/${tag}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                //...commentInfo,
                downVotes: Number(commentInfo.downVotes) + 1
            })
        });
    }
   
    return (
        <CommentContext.Provider value={{
            upVote,
            downVote
        }}>
            {props.children}
        </CommentContext.Provider>
    );
}

export {CommentContext, CommentContextProvider};
const express = require("express")
const voteRouter = express.Router()
const Issue = require('../models/Issue.js')
const Comment = require('../models/Comment.js')
const User = require('../models/User.js')
const Vote = require("../models/Vote.js")
const { makeId } = require("../functions/makeId.js")


// Get vote by tag
voteRouter.get("/tag/:issueTag", (req, res, next) => {
  Vote.find({ issue_tag: req.params.issueTag }, (err, votes) => {
    if (err){
      res.status(500)
      return next(err)
    }
    console.log('voteRouter Get all', votes)
    return res.send(votes)
  })
})

// Get vote by user
voteRouter.get("/user", (req, res, next) => {
  Vote.find({ user: req.auth._id}, (err, votes) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(votes)
  })
})


// New vote
voteRouter.post("/new", (req, res, next) => {
  var newId = makeId(32)

  req.body.user_id = req.auth._id;
  req.body.vote_id = newId;
  req.body.votedAt = Date.now();
  req.body.createdAt = Date.now();
  req.body.createdBy = req.body.username;

  
  var newVote = new Vote(req.body)

  try {
    newVote.save(function(err, vote){
      if (err) {
        res.status(500)
        return next(err)
      } 
      return res.status(201).send(vote)
    });
  } catch {
    res.status(404)
    res.send({ error: "Vote request error!" })
  }
})

// Update Vote
voteRouter.put("/update/:issueTag/:userTag", (req, res, next) => {
  console.log('update vote', req.params.issueTag, req.body)
  
  req.body.votedAt = Date.now();
  
  Vote.findOneAndUpdate(
    { 
      issue_tag: req.params.issueTag,
      user_tag: req.params.userTag 
    },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if (err){
        res.status(500)
        return next(err)
      }
      return res.send(updatedIssue)
    }
  )
})

/*
// New Vote
voteRouter.post("/new", (req, res, next) => {
  req.body.user_id = req.auth._id;
  req,body.vote_id = makeId(22);
  req.body.votedAt = Date.now();
  req.body.createdAt = Date.now();
  req.body.createdBy = req.body.username;

  //console.log('req.body', req.body)
  
  var newVote = new Vote(req.body)

  console.log('new vote', newVote)

  try {
    newVote.save(function(err, vote){
      if (err) {
        res.send(err);
      } else{
        console.log('Vote saved', vote)
        res.send(vote);
      }
    });
  } catch {
    res.status(404)
    res.send({ error: "Request error!" })
  }
})
*/

module.exports = voteRouter;
const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/Issue.js')
const Comment = require('../models/Comment.js')
const User = require('../models/User.js')
const Vote = require("../models/Vote.js")
const { makeId } = require("../functions/makeId.js")



const info = {
  createdBy: 'Snake',
  title: 'issue title',
  description: 'issue description',
  dateSubmitted: 'date',
  id: '123456',
  upvotes: 0,
  downVotes: 0,
  issue_tag: 'issue-tag'
}

// Get all issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.send(issues)
  })
})

// Get issue by id
issueRouter.get("/:issueId", (req, res, next) => {
  Issue.find({ id: req.params.issueId }, (err, issues) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get issue by tag
issueRouter.get("/tag/:issueTag", (req, res, next) => {
  Issue.find({ issue_tag: req.params.issueTag }, (err, issues) => {
    if (err){
      res.status(500)
      return next(err)
    }
    console.log('issueRouter', issues)
    return res.send(issues)
  })
})

// Get issue by user
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.auth._id}, (err, issues) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Post new issue
issueRouter.post("/new", async (req, res) => {
  var newId = makeId(6);
  var newTag = makeId(48);

  var date = Date.now();

  req.body.user = req.auth._id;
  req.body.id = newId;
  req.body.issue_tag = newTag;
  req.body.createdAt = date;
  req.body.updatedAt = date;

  var newIssue = new Issue(req.body);

  try {
    newIssue.save(function(err, issue){
      if (err) {
        res.status(500);
        return next(err);
      } 

      // create new vote for issue

      return res.status(201).send(issue);
    });
  } catch {
    res.status(404);
    res.send({ error: "Request error!" });
  }
})

// Edit Issue
issueRouter.put("/edit/:issueTag", (req, res, next) => {
  console.log('edit', req.params.issueTag, req.body)
  
  Issue.findOneAndUpdate(
    { issue_tag: req.params.issueTag },
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

// Delete issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId/*, user: req.auth._id */},
    (err, deleteIssue) => {
      if (err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted issue ${deleteIssue.title}`)
    }
  )
})


// Up Vote
issueRouter.post("/upVote/new/:issueTag", (req, res, next) => {
  req.body.user = req.auth._id
  
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
    res.send({ error: "Request error!" })
  }
})

issueRouter.put("/upVote/:issueTag", (req, res, next) => {
  console.log('upvote', req.params.issueTag, req.body)
  
  Issue.findOneAndUpdate(
    { issue_tag: req.params.issueTag },
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

// Down Vote
issueRouter.post("/downVote/new/:issueTag", (req, res, next) => {
  req.body.user = req.auth._id
  
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
    res.send({ error: "Request error!" })
  }
})

issueRouter.put("/downVote/:issueTag", (req, res, next) => {  
  console.log('downvote', req.params.issueTag, req.body)
  
  Issue.findOneAndUpdate(
    { issue_tag: req.params.issueTag },
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

module.exports = issueRouter;
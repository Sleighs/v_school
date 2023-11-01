const express = require("express")
const { makeId } = require("../functions/makeId.js")
const commentRouter = express.Router()
const Comment = require('../models/Comment.js')

// Get Comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

const info = {
  createdBy: 'Snake',
  text: 'comment text',
  dateSubmitted: 'date',
  id: '123456'
}

commentRouter.post("/new", async (req, res) => {
  req.body.user = req.auth._id;
  req.body.tag = makeId(22);
  req.body.upVotes = 1;
  req.body.downVotes = 0;
  req.body.dateSubmitted = Date.now();
  req.body.parent_id = '';
  req.body.edited = false;

  //console.log('req.body', req.body)
  
  var newComment = new Comment(req.body);
  //console.log('new comment', newComment)

  /*
    text
    tag
    issue_tag
    id
    user
    dateSubmitted
    createdBy
    parent
    upVotes
    DownVotes
   */

  try {
    newComment.save(function(err, comment){
      if (err) {
        res.send(err);
      } else{
        console.log('Comment saved', comment);
        res.send(comment);
      }
    });
  } catch {
    res.status(404);
    res.send({ error: "Request error!" });
  }
})

// Up Vote
commentRouter.put("/upVote/:commentTag", (req, res, next) => {
  Comment.findOneAndUpdate(
    { tag: req.params.commentTag },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err){
        res.status(500);
        return next(err);
      }
      return res.send(updatedComment);
    }
  )
})

// Down Vote
commentRouter.put("/downVote/:commentTag", (req, res, next) => {  
  Comment.findOneAndUpdate(
    { tag: req.params.commentTag },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err){
        res.status(500);
        return next(err);
      }
      return res.send(updatedComment);
    }
  )
})

module.exports = commentRouter;
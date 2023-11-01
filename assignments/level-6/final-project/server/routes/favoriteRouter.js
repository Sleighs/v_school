const express = require("express")
const favoriteRouter = express.Router()
const User = require('../models/User.js')
const Favorite = require("../models/Favorite.js")
const { makeId } = require("../functions/makeId.js")

// Create new favorite
favoriteRouter.post('/new', (req, res, next) => {
  req.body.user_id = req.auth._id;
  req.body.favorite_id = makeId(22);
  req.body.updatedAt = Date.now();
  req.body.createdAt = Date.now();
  req.body.createdBy = req.body.username;
  req.body.status = true;

  var newFavorite = new Favorite(req.body)

  try {
    newFavorite.save(function(err, favorite){
      if (err) {
        res.send(err);
      } else {
        console.log('Favorite saved', favorite)
        res.send(favorite);
      }
    });
  } catch {
    res.status(404)
    res.send({ error: "Request error!" })
  }
});

favoriteRouter.put("/update/:streamerTag/:userTag", (req, res, next) => {
  //console.log('update favorite', req.params)

  req.body.updatedAt = Date.now();

  Favorite.findOneAndUpdate(
    { streamer_tag: req.params.streamerTag, user_tag: req.params.userTag },
    req.body,
    { new: true },
    (err, updatedFavorite) => {
      if (err){
        res.status(500)
        return next(err)
      }
      return res.send(updatedFavorite)
    }
  );
});

// Get all favorites
/*
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
  var newId = makeId(128)

  req.body.user_id = req.auth._id;
  req.body.vote_id = newId;
  req.body.votedAt = Date.now();
  req.body.createdAt = Date.now();
  
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

// Up Vote
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
*/

module.exports = favoriteRouter;
const express = require("express")
const { makeId } = require("../functions/makeId.js")
const streamerRouter = express.Router()
const Streamer = require('../models/Streamer.js')


// Get All streamers
streamerRouter.get("/all", (req, res, next) => {
  Streamer.find((err, streamers) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(streamers)
  })
})


// Get single streamer
streamerRouter.get("/:streamerTag", (req, res, next) => {
  Streamer.find({ streamer_tag: req.params.streamerTag }, (err, streamer) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(streamer)
  })
})

// Create new streamer
streamerRouter.post('/create', (req, res, next) => {
  Streamer.findOne({ streamer_name: req.body.streamer_name }, (err, streamer) => {
      if (err){
          res.status(500)
          return next(err)
      }
      if (streamer){
          res.status(403)
          return next(new Error("Steamer already made"))
      }
  });

  var newDate = Date.now()

  req.body.streamer_id = makeId(24)
  req.body.createdAt = newDate
  req.body.updatedAt = newDate


  const newStreamer = new Streamer(req.body);

  newStreamer.save((err, savedStreamer) => {
      if (err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedStreamer)
  });
});


// Edit Streamer
streamerRouter.put("/edit/:streamerName", (req, res, next) => {
  console.log('edit', req.params.streamerName, req.body)
  
  req.body.updatedAt = Date.now()

  Streamer.findOneAndUpdate(
    { streamer_name: req.params.streamerName },
    req.body,
    { new: true },
    (err, updatedStreamer) => {
      if (err){
        res.status(500)
        return next(err)
      }
      console.log(updatedStreamer)
      return res.send(updatedStreamer)
    }
  )
});

// Delete Streamer
streamerRouter.delete("/delete/:streamerName", (req, res, next) => {
  Streamer.findOneAndDelete(
    { streamer_name: req.params.streamerName/*, user: req.auth._id */},
    (err, deleteStreamer) => {
      if (err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted ${deleteStreamer.streamer_name}`)
    }
  )
})

module.exports = streamerRouter
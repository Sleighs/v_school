const express = require("express")
const userRouter = express.Router()
const User = require('../models/User.js')

// Get All users
userRouter.get("/", (req, res, next) => {
  User.find((err, users) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(users)
  })
})

// Get single user
userRouter.get("/retrieve/:userToken", (req, res, next) => {
  User.find({ token: req.params.userToken }, (err, users) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(users)
  })
})

// Post new user
userRouter.post("/new", async (req, res) => {
  var newUser = new User({
    username: req.data.name, 
    email: req.data.email,
    password: req.data.password
  })

  try {
    newUser.save(function(err){
      if (err) {
        res.send(err);
      } else{
        res.send("New user created");
      }
    });
  } catch {
    res.status(404)
    res.send({ error: "Request error!" })
  }
})

module.exports = userRouter
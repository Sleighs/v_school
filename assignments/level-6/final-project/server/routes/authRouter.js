const express = require('express');
const authRouter = express.Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { makeId } = require('../functions/makeId.js');

const testBody = {
  "username": "user5",
  "password": "password",
  "email": "email5"
};

authRouter.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err){
      res.status(500)
      return next(err)
    }
    if (user){
      res.status(403)
      return next(new Error("Username is taken"))
    }
  });

  req.body.user_tag = makeId(24)
  req.body.createdAt = Date.now()

  const newUser = new User(req.body);

  newUser.save((err, savedUser) => {
    if (err){
      return next(err)
    }
    const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET )
    return res.status(201).send({ token, user: savedUser.withoutPassword() })
  });
});

authRouter.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err){
      res.status(500)
      return next(err)
    }
    if (!user){
      res.status(403)
      return next(new Error("Incorrect username or uassword" ))
    }

    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err){
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      if (!isMatch){
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPassword() })
    })       
  });
});


module.exports = authRouter;
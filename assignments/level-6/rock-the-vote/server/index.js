const express = require("express");
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var { expressjwt: jwt } = require("express-jwt");

// Routes
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const issueRouter = require('./routes/issueRouter.js');
const commentRouter = require('./routes/commentRouter.js');
const voteRouter = require('./routes/voteRouter.js');

// Models
const Issue = require('./models/Issue.js')
const Comment = require('./models/Comment.js')
const Vote = require('./models/Vote.js')

dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

// Enable CORS for all requests
app.use(cors());

const PORT = process.env.PORT || 8080;

// Connect to MongoDB database
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
};

mongoose
	.connect(process.env.API_ADMIN_URI, connectionParams)
	.then(() => {
    console.log("Mongoose ready!")
	})

app.use('/auth', authRouter);

app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/api/user', userRouter);
app.use('/api/issue', issueRouter);
app.use('/api/comment', commentRouter);
app.use('/api/vote', voteRouter);

app.get("/", (req, res) => {
  res.send(`Welcome to Rock the Vote on port:${PORT}`);
});

// Get all issues
app.get("/issues", (req, res, next) => {
  Issue.find((err, issues) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.send(issues)
  })
})

// Get single issue by id and title
app.get("/issue/:issueId", (req, res, next) => {
  Issue.findOne({ id: req.params.issueId }, (err, issue) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.send(issue)
  })
})

// Get single issue by tag
app.get("/issue/tag/:issueTag", (req, res, next) => {
  Issue.findOne({issue_tag: req.params.issueTag}, (err, issue) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.send(issue)
  })
})

// Get votes by tag
app.get("/vote/tag/:voteTag", (req, res, next) => {
  Vote.find({ vote_tag: req.params.voteTag }, (err, votes) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(votes)
  })
})

// Check if vote exists by vote by issue and user
app.get("/vote/check/:issueTag/:userTag", (req, res, next) => {
  Vote.find(
    { user_tag: req.params.userTag,
      vote_tag: req.params.issueTag },
    (err, votes) => {
      if (err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(votes)
    })
})

// Get all comments of an issue
app.get("/comments/issue/:issueTag", (req, res, next) => {
  Comment.find({issue_tag: req.params.issueTag}, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

// Get single comment info by tag
app.get("/comments/tag/:commentTag", (req, res, next) => {
  Comment.findOne({ tag: req.params.commentTag }, (err, comment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.send(comment)
  })
})

// Get all replies of a comment
app.get("/replies/:parentTag", (req, res, next) => {
  Comment.find({parent_tag: req.params.parentTag}, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.send(comments)
  })
})

// Handle errors
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({ errMsg: err.message })
}) 

app.listen(PORT, console.log(`Server started on port ${PORT}`));
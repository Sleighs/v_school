// Variables
const express = require("express");
const { createServer } = require("http");
//const { Server } = require('socket.io')
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var { expressjwt: jwt } = require("express-jwt");
const { sortArrayToMatch } = require('./functions/sortArrayToMatch.js');

// Port
const PORT = process.env.PORT || 8080;

// Server
const app = express();
const httpServer = createServer(app);

//Import Routes
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const streamerRouter = require('./routes/streamerRouter.js')
const favoriteRouter = require('./routes/favoriteRouter.js')

// Import Models
const Streamer = require('./models/Streamer.js')
const Favorite = require('./models/Favorite.js')

dotenv.config();

app.use(morgan("dev"));

// Enable CORS 
app.use(cors());

// Connect to Database
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
};

mongoose
	.connect(process.env.API_ADMIN_URI, connectionParams)
	.then(() => {
    console.log("Mongoose ready!")
	});


// Add routers
app.use('/auth', authRouter);
app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/api/user', userRouter);
app.use('/api/streamer', streamerRouter);
app.use('/api/favorites', favoriteRouter);

// Handle errors
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({ errMsg: err.message })
}) 

// Routes
app.get("/", (req, res) => {
  res.send(`Welcome to port:${PORT}`);
});

app.get("/streamers/all", (req, res, next) => {
  console.log('Getting streamers...')
  Streamer.find((err, streamers) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(streamers)
  })
})

app.get("/streamer/:streamerTag", (req, res, next) => {
  console.log('Getting streamers...')
  Streamer.findOne({ streamer_tag: req.params.streamerTag}, (err, streamer) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(streamer)
  })
})

app.post("/streamers/featured", (req, res, next) => {
  //console.log('Getting featured streamers...', req.body)
  Streamer.find({ streamer_tag: { $in: req.body.names }}, (err, streamers) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(streamers)
  })
})

//create a javascript function that takes an array of names and database data and returns data in the same order as the names array
app.post("/streamers/featured/sorted", (req, res, next) => {
  //console.log('Getting featured streamers...', req.body)
  Streamer.find({ streamer_tag: { $in: req.body.names }}, (err, streamers) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(sortArrayToMatch(req.body.names, streamers))
  })
})

// Get favorites of a streamer
app.get('/favorites/streamer/:streamerTag', (req, res, next) => {
  Favorite.find({streamer_tag: req.params.streamerTag}, (err, favorites) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(favorites)
  });
});


// Listen for activity
httpServer.listen(PORT, console.log(`Server started on port ${PORT}`));


const express = require("express");
const morgan = require("morgan");
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Bounty = require("./models/Bounty");

const uri = "mongodb://localhost:27017/bounty_hunter";

mongoose.connect(uri, {useNewUrlParser: true})
  .then(()=> console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

const app = express();

app.use(express.json());
app.use(morgan("combined"));

var bounties = [
  {
    firstName: 'Jamora',
    lastName: 'Locke',
    living: false,
    bounty: 75000,
    type: 'sith',
    id: 'e1a02775-6de7-4583-8e53'
  },
  /*{
    "firstName": "Sawyer",
    "lastName": "Unknown",
    "living": false,
    "bounty": 350000,
    "type": "sith",
    "id": "1n39cweuq08"
  }*/
];

// Get Requests
app.get("/", (req, res) => {
  res.send("Welcome to port:8080 Bounty Hunter");
});

app.get("/bounty", (req, res) => {
  Bounty.find(
    (err, bountylist) => {
      console.log('Bounty.find:', bountylist)

      if (err) return res.status(500).send(err)

      return res.status(200).send(bountylist);
  });

  //res.send(bounties);
});

// Post request
app.post("/bounty", (req, res) => {
  console.log("Connected to api...", req.body);
  
  Bounty.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    living: req.body.living,
    bounty: req.body.bounty,
    type: req.body.type,
    id: req.body.id
  },  (err, item) => {
    //console.log('Bounty.create:', bountylist)
    if (err) return res.status(500).send(err)

    const response = {
      message: "Item successfully posted",
      id: item._id
    };
    return res.status(200).send(response);
  });

  //bounties.push(req.body.bounty);
  //res.send(bounties);

});

// Put request
app.put("/bounty", (req, res)=>{
  Bounty.findOneAndUpdate(
    {id: req.body.id},
    req.body,
    {new: true},
    (err, item) => {
      if (err) return res.status(500).send(err);

      const response = {
        message: "Item successfully updated",
        id: item._id
      };
        
      return res.status(200).send(response);
    });

  /*var index;
  var newArr = bounties.map((item, i) => {
    // Get id
    if (item.id === req.body.bounty.id){
      index = i;
    }
  });

  //Replace former bounty with updated version
  bounties.splice(index, 1, req.body.bounty)

  res.send(bounties);*/
});

// Delete request
app.delete("/bounty", (req, res)=>{
  Bounty.remove(
    {id: req.body.id},
    (err, item) => {
      if (err) return res.status(500).send(err);

      const response = {
          message: "Item successfully deleted"
      };

      return res.status(200).send(response);
    });

  /*var index;
  var newArr = bounties.map((item, i) => {
    // Get id
    if (item.id === req.body.bounty.id){
      index = i;
    }
  });

  //Remove bounty
  bounties.splice(index, 1)

  res.send(bounties);*/
});


const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
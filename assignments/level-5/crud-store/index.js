const express = require("express");
const morgan = require("morgan");
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const Inventory = require("./models/inventory");

const uri = "mongodb://localhost:27017/crud_store";

mongoose.connect(uri, {useNewUrlParser: true})
  .then(()=> console.log("Connected to Crud Store DB"))
  .catch(err => console.error(err));

const app = express();

app.use(express.json());
app.use(morgan("combined"));

var inventory = [
    {
        name: 'mustang',
        quantity: 3,
        type: 'coupe',
        id: 'e1a02775-6de7-4583-8e53-2c693b990063'
    }
];

// Get Requests
app.get("/", (req, res) => {
  res.send("Welcome to port:8080 Crud Store");
});

app.get("/inventory", (req, res) => {
  //res.send(inventory);

  Inventory.find(
    (err, items) => {
      console.log('Inventory.find:', items)

      res.send(items)

      if (err) return res.status(500).send(err)

      return res.status(200).send(items);
  });
});

// Post request
app.post("/inventory", (req, res) => {
    //console.log("Connected to api...", req.body);

    Inventory.create({
      name: req.body.name,
      quantity: req.body.quantity,
      type: req.body.type,
      id: req.body.id
    });

    /*inventory.push({
      name: req.body.name,
      quantity: req.body.quantity,
      type: req.body.type,
      id: req.body.id
    });

    console.log('body:', req.body)

    res.send(inventory);*/
});

// Put request
app.put("/inventory", (req, res)=>{
  Inventory.findOneAndUpdate(
    {name: req.body.name},
    req.body,
    {new: true},
    (err, item) => {
      // Handle any possible database errors
          if (err) return res.status(500).send(err);
          return res.send(item);
      }
    );

  /*var index;
  var newArr = inventory.map((item, i) => {
    // Get id
    if (item.id === req.body.id){
      index = i;
    }
  });

  //Replace former bounty with updated version
  inventory.splice(index, 1, req.body)

  res.send(inventory);*/
});

// Delete request
app.delete("/inventory", (req, res)=>{
  Inventory.remove(
    {name: req.body.name},
    (err, item) => {
      if (err) return res.status(500).send(err);

      const response = {
          message: "Item successfully deleted",
          id: item._id
      };
      return res.status(200).send(response);
    });

  /*var index;
  var newArr = inventory.map((item, i) => {
    // Get id
    if (item.id === req.body.id){
      index = i;
    }
  });

  //Remove bounty
  inventory.splice(index, 1);

  console.log(req.body)

  res.send(inventory);*/
});


const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
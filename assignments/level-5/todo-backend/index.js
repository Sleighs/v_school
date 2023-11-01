const express = require("express");
const app = express();
app.use(express.json());

var todos = [
  {
    id: "23k4lh23h2",
    name: "Todo ame",
    description: "Todo list from server",
    imageUrl: "http://www.myimage....",
    date: "8-3-2022 13:58",
    completed: false
  }
];

// Get Requests
app.get("/", (req, res) => {
  res.send("Welcome to port:8080");
});

app.get("/todos", (req, res) => {
  res.send(todos);
});

// Post request
app.post("/todos", (req, res) => {
    //console.log("Connected to api...", req.body);
    todos.push(req.body.todo);
    res.send(todos);
    res.status(200).json({ result: todos });
});

// Put request
app.put("/todos/update", (req, res)=>{
  var index;
  var newArr = todos.map((item, i) => {
    // Get id
    if (item.id === req.body.todo.id){
      index = i;
    }
  });

  //Replace former todo with updated version
  todos.splice(index, 1, req.body.todo)

  res.send(todos);
});

// Delete request
app.delete("/todos/delete", (req, res)=>{
  var index;
  var newArr = todos.map((item, i) => {
    // Get id
    if (item.id === req.body.id){
      index = i;
    }
  });

  //Remove todo
  todos.splice(index, 1)

  res.send(todos);
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
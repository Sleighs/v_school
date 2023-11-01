const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

const PORT = process.env.PORT || 8080;

// Get Requests
app.get("/", (req, res) => {
  res.send(`Welcome to port:${PORT}`);
});
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
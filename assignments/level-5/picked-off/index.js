const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const middle = require("./middle");

app.use(bodyParser.json());
app.use(express.json());
app.use(middle.middleAction);

app.get("/", (req, res) => {
    res.send(`Welcome to port 8080. The date is ${req.requestTime}`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
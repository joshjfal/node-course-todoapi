var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {addUser} = require("./models/user");

var app = express();

//Tip: CRUD means create, read, update, delete

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
    console.log(`Request received. Text was \"${req.body.text}\".`);
  }, (e) => {
    res.status(400).send(e);
    console.log("Returned error", e);
  });
});

app.listen(3000, () => {
  console.log("Started listening on port 3000");
});

module.exports = {app};

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

app.get("/todos", (req, res) => {
  //Todo.find returns everything in the Todo collection (DB) back
  Todo.find().then((todos) => {
    res.send({todos}); // Rather than just returning the array (without squiggly brackets), we are returning an object containing the array so that we could create other pass backs like "{todos}, \n text:'Josh is great'".
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log("Started listening on port 3000");
});

module.exports = {app};

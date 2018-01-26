var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {addUser} = require("./models/user");

var {ObjectID} = require("mongodb"); //Lecture 78

var app = express();
const port = process.env.PORT || 3000; //Set if app is running on heroku, won't be set if local

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

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => res.status(400).send());
});

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
  }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});

module.exports = {app};

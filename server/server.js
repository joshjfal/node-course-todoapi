const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb"); //Lecture 78

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {addUser} = require("./models/user");

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

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  //__Subset of the things that the user past to us, don't want them to update anything they want.
  var body = _.pick(req.body, ['text', 'completed']); // prevents user from updating IDs, completedAt, or any other properties. Only works with the picked out nodes.

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //__Update completedAt property based on the completed property
  if (_.isBoolean(body.completed) && body.completed) {
    // Run if boolean and true
    body.completedAt = new Date().getTime(); //Returns JS timestamp (number of MS since midnights of Jan 1st 1970 [This is called a Unix epic], values greater than zero are since that date, negatives are before
  } else {
    // Run if it is a boolean or it's not true
    body.completed = false;
    body.completedAt = null; // To remove value from database, set it to null.
  }

  //__Find by ID and then update it
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});

module.exports = {app};

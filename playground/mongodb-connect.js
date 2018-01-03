// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); // This code (destructuring) is the exact same as the above, with additonal in there for ObjectID.

// var obj = new ObjectID(); // Create new instance of ObjectID (unique key/ID for entry)
// console.log(obj);

// var user = { name: 'Josh', age: 26 };
// var {name} = user;
// var {age} = user;
// console.log(`You are ${name}, age ${age}.`);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB Server");
    // As soon as you return from a function, the function stops. So we can use "return" so we dont need to use } else { condition below.
  }

  console.log("Conncted to MongoDB Server");

  // db.collection("Todos").insertOne({
  //   name: 'New Todo',
  //   description: 'To do note from code'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert Todo", err);
  //   }
  //
  //   // console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});

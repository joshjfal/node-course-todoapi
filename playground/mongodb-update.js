const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB Server");
  }
  console.log("Conncted to MongoDB Server");

  //Find one and update -> Simiar to Find one and delete, updates and then you get document back in response/result.
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5a4bef43c257a639c83eabb7")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5a4d5e5294a1c70a0801351d")
  }, {
    $set: {
      name: 'Joshua' //Rename me
    },
    $inc: {
      age: 10 //Increment age by 10
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});

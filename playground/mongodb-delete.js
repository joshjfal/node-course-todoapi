const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB Server");
  }
  console.log("Conncted to MongoDB Server");

  //Delete Many
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //Delete One
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result)
  // });

  //Find one and Delete -> This sets the return (result) to the object you deleted, while the ones above just remove it.
  db.collection('Todos').findOneAndDelete({_id: new ObjectID('5a4c1490c257a639c83eabb8')}).then((result) => {
    console.log(result);
  });

  db.close();
});

const {MongoClient, ObjectID} = require("mongodb"); // This code (destructuring) is the exact same as the above, with additonal in there for ObjectID.

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB Server");
  }
  console.log("Conncted to MongoDB Server");

  db.collection("Users").find({name: 'Josh'}).toArray().then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }, (error) => {
    console.log('Unable to find users');
  });

  //1. Specify the collection
  //2. Find/fetch everything
  //3. Turns response into an array
  //4. This returns a promise, which is why we use then ...success, err...
  // db.collection('Todos').find().toArray().then((docs) => {

  //1. Filter find and check for documents with completed set to false
  // db.collection('Todos').find({completed: "false"}).toArray().then((docs) => {

  //1. Changing this to a string, we can't say "_id: '5a4c1490c257a639c83eabb8'" because the ID is an object.
  // db.collection('Todos').find({_id: new ObjectID("5a4c1490c257a639c83eabb8")}).toArray().then((docs) => {

  //Let's change this to do a find and get the cursor count
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log("Unable to fetch todos", err);
  // });

  db.close();
});

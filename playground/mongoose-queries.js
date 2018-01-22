const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {Users} = require("./../server/models/user");

var id = "5a56ac49e7e45a40405095f911";

// if (!ObjectID.isValid(id)) {
//   console.log("That ID is invalid");
// }

// //Find all documents matching criteria:
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// //Find 1 document other than by ID:
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     return console.log("Find one - ID not found"); // Return stops all other code execution
//   }
//   console.log('Todo', todo);
// });

//Find 1 document by ID:
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("Find by ID - ID not found"); // Return stops all other code execution
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

var UserID = "5a556a292a11c0883890d3a8";
if (!ObjectID.isValid(UserID)) {
  console.log("ID is invalid");
}

Users.findById(UserID).then((User) => {
  if (!User) {
    return console.log("That User ID was not found");
  }
  console.log("User found, object:", User)
}).catch((e) => console.log("Error caught and suppressed"));

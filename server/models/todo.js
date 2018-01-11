var mongoose = require("mongoose");

//Model name and then property (being an object in below example)
var Todo = mongoose.model("Todo", {
  text: {
    type: String, //Field type
    required: true, //This field is required
    minlength: 1, //Minimum length of this field
    trim: true //Removes leading white space (i.e. if todo was as blank space it would pass minlength but trim would cause it to error).
  },
  completed: {
    type: Boolean,
    defalt: false //Set a default for Boolean
  },
  completedAt: {
    type: Number,
    default: null //Not completed yet
  }
});

module.exports = { Todo };

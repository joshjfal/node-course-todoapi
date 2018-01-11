var mongoose = require("mongoose");

var addUser = mongoose.model("addUser", {
  fullname: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  age: {
    type: Number
  }
});

module.exports = { addUser };

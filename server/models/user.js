var mongoose = require("mongoose");

var Users = mongoose.model("Users", {
  fullname: {
    type: String,
    required: false,
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

module.exports = { Users };

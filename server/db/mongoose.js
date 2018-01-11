var mongoose = require("mongoose");
mongoose.Promise = global.Promise; // Tells mongo.Promise to use the Global promise (and not a third-party promise, which is where "promise" originated before becoming part of JS)
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports = { mongoose };

const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  _id: Number,
  name: String,
  books: Array, //will contain an array of ids of books in books collection
});

module.exports = mongoose.model("Author", authorSchema);

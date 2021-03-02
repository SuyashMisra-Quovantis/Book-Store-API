const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  _id: Number,
  name: String,
});

module.exports = mongoose.model("Author", authorSchema);

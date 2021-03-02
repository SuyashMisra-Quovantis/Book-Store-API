const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  _id: Number,
  name: String,
});

const bookSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  author: authorSchema,
  publish_date: {
    type: Date,
    default: Date.now,
  },
  genre: { type: String, required: true },
});

module.exports = mongoose.model("Books", bookSchema);

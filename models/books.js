const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  publish_date: {
    type: Date,
    default: Date.now,
  },
  genre: { type: String, required: true },
});

module.exports = mongoose.model("Books", bookSchema);

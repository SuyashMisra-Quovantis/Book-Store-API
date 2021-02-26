const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/booksDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.log(error);
  });

const bookScheme = mongoose.Schema({
  _id: Number,
  name: String,
  author_name: String,
  publish_date: {
    type: Date,
    default: Date.now,
  },
  genre: String,
});

module.exports = mongoose.model("Books", bookScheme);

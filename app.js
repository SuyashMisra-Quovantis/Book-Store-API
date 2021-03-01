const express = require("express");

// const books = require("./books.js");

const booksRouter = require("./routers/booksRouter");

require("./db");

const app = express();

app.use(express.json());

app.use(booksRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

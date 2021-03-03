const express = require("express");

// const books = require("./books.js");

const booksRouter = require("./routers/booksRouter");

// const authorsRouter = require("./routers/authorsRouter");

const usersRouter = require("./routers/usersRouter");

require("./db");

const app = express();

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

app.use(express.json());

app.use(booksRouter);

// app.use(authorsRouter);

app.use(usersRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

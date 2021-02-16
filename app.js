const express = require("express");

const books = require("./books.js");

const app = express();

app.use(express.json());

//add book
app.post("/books/addBook", (req, res) => {
  if (
    req.body.id &&
    req.body.name &&
    req.body.author_name &&
    req.body.publish_date &&
    req.body.genre
  ) {
    if (books.addBook(req.body)) {
      res.send("Book added!");
    } else {
      res.send("Book already exists!");
    }
    // console.log("Book added: ");
    // res.end();
  } else {
    console.log("Book not added");
    res.send("All parameters were not provided!");
  }
});

//get all book details
app.get("/books/listBooks", (req, res) => {
  books.listBooks();
  res.send(books.loadBooks());
});

//get book details by id
app.get("/books/listBookById", (req, res) => {
  res.send(books.listBookById(req.query.id));
});

//update book details
app.put("/books/updateBook", (req, res) => {
  if (!req.query.id) {
    console.log("ID parameter not provided");
    res.send("Provide book id as parameter to update!");
  } else if (
    req.body.id &&
    req.body.name &&
    req.body.author_name &&
    req.body.publish_date &&
    req.body.genre
  ) {
    if (books.updateBook(req.body)) res.send("Book updated!");
    else {
      res.send("Book to be updated does not exist!");
    }
  } else {
    console.log("Book not updated!");
    res.send("All parameters were not provided!");
  }
});

//delete existing book
app.delete("/books/deleteBook", (req, res) => {
  if (!req.query.id) {
    console.log("Query parameters not provided!");
    return res.send("Please provide book id in query param");
  } else if (books.deleteBook(req.query.id)) {
    res.send("Book deleted!");
  } else {
    res.send("No book found!");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
const express = require("express");

// const books = require("./books.js");

const books = require("./db.js");

const app = express();

app.use(express.json());

//add book
app.post("/books", (req, res) => {
  if (req.body._id && req.body.name && req.body.author_name && req.body.genre) {
    const saveBook = async () => {
      try {
        const result = await books.create(req.body);
        res.send(result);
      } catch (error) {
        console.log("Error occured: ", error);
      }
    };

    saveBook();
  } else {
    console.log(req.body);
    res.send(req.body);
  }
});

//get all book details
app.get("/books", (req, res) => {
  const getBooks = async () => {
    try {
      const result = await books.find();
      res.send(result);
    } catch (error) {
      res.send(error);
      console.log("Error occured: ", error);
    }
  };

  getBooks();
});

//get book details by id
app.get("/books/:id", (req, res) => {
  const getBooksById = async () => {
    try {
      const bookObj = await books.findById(req.params.id);
      res.send(bookObj);
    } catch (error) {
      res.send(error);
    }
  };

  getBooksById();
});

//update book details
app.put("/books/:id", (req, res) => {
  if (!req.params.id) {
    console.log("ID parameter not provided");
    res.send("Provide book id as parameter to update!");
  } else if (
    req.body._id &&
    req.body.name &&
    req.body.author_name &&
    req.body.publish_date &&
    req.body.genre
  ) {
    const updateBook = async () => {
      try {
        const result = await books.findByIdAndUpdate(
          { _id: req.body._id },
          {
            $set: {
              name: req.body.name,
              author_name: req.body.author_name,
              publish_date: req.body.publish_date,
              genre: req.body.genre,
            },
          }
        );
        res.send(result);
        console.log(result);
      } catch (error) {
        res.send(error);
        console.log(error);
      }
    };

    updateBook();
  } else {
    console.log("Book not updated!");

    res.send("All parameters were not provided!");
  }
});

//delete existing book
app.delete("/books/:id", (req, res) => {
  if (!req.params.id) {
    console.log("Query parameters not provided!");
    return res.send("Please provide book id in query param");
  } else {
    const deleteBook = async () => {
      try {
        const result = await books.deleteOne({ _id: req.params.id });
        res.send(result);
        console.log(result);
      } catch (error) {
        res.send(error);
        console.log(error);
      }
    };

    deleteBook();
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

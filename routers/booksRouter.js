const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth.ts");
const books = require("../models/books");

//add book
router.post("/books", auth, async (req, res) => {
  try {
    const result = await books.create(req.body);

    res.status(201).send(result);
  } catch (error) {
    console.log(req.body);
    res.status(400).send(error);
  }
});

//get all book details
router.get("/books", auth, async (req, res) => {
  try {
    const result = await books.find();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get book details by id
router.get("/books/:id", auth, async (req, res) => {
  try {
    const bookObj = await books.findById(req.params.id);
    if (!bookObj) {
      return res.status(404).send();
    }
    res.send(bookObj);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get all book details by genre
router.get("/books/genre/:name", auth, async (req, res) => {
  try {
    const bookObj = await books.find({ genre: req.params.name });
    if (bookObj.length === 0) {
      return res.status(404).send();
    }
    res.send(bookObj);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get books by author
router.get("/books/author/:author", auth, async (req, res) => {
  try {
    const bookObj = await books.find({
      author: req.params.author.replace("-", " "),
    });
    if (bookObj.length === 0) {
      return res.status(404).send();
    }
    res.send(bookObj);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update book details
router.patch("/books/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "author", "publish_date", "genre"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const result = await books.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete existing book
router.delete("/books/:id", auth, async (req, res) => {
  try {
    const result = await books.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

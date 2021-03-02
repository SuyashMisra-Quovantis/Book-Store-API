const express = require("express");

const router = express.Router();

const authors = require("../models/authors");

//add author
router.post("/authors", async (req, res) => {
  try {
    const result = await authors.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    // console.log("Error occured: ", error);
    res.status(400).send(error);
  }
});

//get all author details
router.get("/authors", async (req, res) => {
  try {
    const result = await authors.find();
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
    //   console.log("Error occured: ", error);
  }
});

//get author details by id
router.get("/authors/:id", async (req, res) => {
  try {
    const authorObj = await authors.findById(req.params.id);
    if (!authorObj) {
      return res.status(404).send();
    }
    res.send(authorObj);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/authors/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "books"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const result = await authors.findByIdAndUpdate(req.params.id, req.body, {
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

/*
//update book details
router.put("/authors/:id", (req, res) => {
  if (!req.params.id) {
    // console.log("ID parameter not provided");
    res.send("Provide author id as parameter to update!");
  } else if (req.body._id && req.body.name && req.body.books) {
    const updateAuthor = async () => {
      try {
        const result = await authors.findByIdAndUpdate(
          { _id: req.body._id },
          {
            $set: {
              name: req.body.name,
              books: req.body.books,
            },
          }
        );
        res.send(result);
        // console.log(result);
      } catch (error) {
        res.send(error);
        // console.log(error);
      }
    };

    updateAuthor();
  } else {
    res.send("All parameters were not provided!");
  }
});
*/

//delete existing book
router.delete("/authors/:id", async (req, res) => {
  try {
    const result = await authors.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
    // console.log(result);
  } catch (error) {
    res.send(error);
    // console.log(error);
  }
});

module.exports = router;

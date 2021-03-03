const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth.ts");
const users = require("../models/users");

//signup route
router.post("/users", async (req, res) => {
  try {
    // console.log("signup runs");
    const user = await users.create(req.body);
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
    // console.log(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//login route
router.post("/users/login", async (req, res) => {
  try {
    const user = await users.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(req.body);
    res.status(400).send(error);
  }
});

router.get("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.send(500).send();
  }
});

//logout of all devices
router.get("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

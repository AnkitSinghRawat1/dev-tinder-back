const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/authMiddleware");


// get user by ID from DB
profileRouter.get("/user", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.send({ msg: "user matched", data: user });
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

module.exports = profileRouter
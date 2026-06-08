const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/authMiddleware");
const User = require("../models/user");
const {validateMyEditProfileData, validateNewPassword} = require("../utils/validation")
const bcrypt = require("bcrypt");

// get user by ID from DB
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.send({ msg: "user matched", data: user });
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateMyEditProfileData(req)){
        throw new Error("Invalid edit request")
    }
    
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]))
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    returnDocument: "after"
  })

    res.json({ msg: "user updated", data: updatedUser });
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    
       validateNewPassword(req) 
       
    const user = req.user
    const newPassword = req.body.newPassword
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    const updatedUser = await User.findByIdAndUpdate(user._id, {password: passwordHash})
     

    res.status(200).send({ msg: "password updated" });
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

module.exports = profileRouter
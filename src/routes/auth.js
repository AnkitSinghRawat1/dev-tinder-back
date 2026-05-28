const express = require("express")
const authRouter = express.Router()
const { validationSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");


authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validationSignupData(req);

    // encrypted password
    const { firstName, lastName, password, emailId, age, skills, gender } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of a user module
    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      emailId,
      age,
      skills,
      gender,
    });
    await user.save();
    res.send("User signup successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("error savong the user " + err.message);
  }
});

authRouter.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Email id is not Registered");
    }

    const isPasswordValid = await user.isPassValid(password)

    if (isPasswordValid) {
      const accessToken = await user.getJWT();

      res.cookie("token", accessToken);

      res.status(200).send({
        data: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          emailId: user?.emailId,
        },
      });
    } else {
      res.status(401).send("password not correct ");
    }
  } catch (err) {
    res.status(404).send("Something went wrong " + err.message);
  }
});

module.exports = authRouter
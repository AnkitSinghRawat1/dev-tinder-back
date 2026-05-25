const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const { validationSignupData } = require("./utils/validation");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/authMiddleware");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validationSignupData(req);

    // encrypted password
    const { firstName, lastName, password, emailId, age, skills, gender } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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

app.get("/login", async (req, res) => {
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

// get user by ID from DB
app.get("/user", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.send({ msg: "user matched", data: user });
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

app.post("/sendConnectReq", userAuth, async (req, res) => {
  // sending a connection Request
  console.log("sending a connection Request by ", req.user?.firstName);

  res.send("sending a connection Request");
});

connectDB()
  .then(() => {
    console.log("database connection established...");
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected");
  });

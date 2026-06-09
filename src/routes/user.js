const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectRequest");
const ConnectionRequestModel = require("../models/connectRequest");
const User = require("../models/user");

const userSafeData = "firstName lastName age photoUrl gender about skills";

// get all the penidn connection request for the loggedIn User
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      // }).populate("toUserId", ["firstName", "lastName","age","photoUrl"]) // one way
    })
      .populate("toUserId", userSafeData) // another way
      .populate("fromUserId", userSafeData);

    if (connectionRequests.length === 0) {
      return res.status(400).json({ message: "No Request Found!" });
    }

    res
      .status(200)
      .json({ message: "Request found", data: connectionRequests });
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
      // status:'accepted'
    })
      .populate("toUserId", userSafeData) // another way
      .populate("fromUserId", userSafeData);

    const data = connections.map((connection) => {
      if (
        connection.fromUserId._id.toString() === loggedInUser._id.toString()
      ) {
        return connection.toUserId;
      }

      return connection.fromUserId;
    });

    res.status(200).json({
      message: "User Connections !",
      data: data,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = Math.min(limit, 50)


    const skip = (page - 1) * limit

    const connections = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const connectIDS = connections.map((connection) => {
      if (
        connection.fromUserId._id.toString() === loggedInUser._id.toString()
      ) {
        return connection.toUserId._id.toString();
      }

      return connection.fromUserId._id.toString();
    });

    const users = await User.find({ _id: { $nin: Array.from([...connectIDS, loggedInUser._id.toString()]) } })
    .select(userSafeData).skip(skip).limit(limit)

    res.status(200).json({ message: "Users found", data: users });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userRouter;

const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectRequest");
const ConnectionRequestModel = require("../models/connectRequest");

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

module.exports = userRouter;

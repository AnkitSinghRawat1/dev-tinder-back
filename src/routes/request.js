const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequest = require("../models/connectRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    // sending a connection Request
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type! " + status });
      }

      // sending request to invalid User

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not Found! " });
      }

      // if there is existing connection request

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request ALready exists!! " });
      }

      const connectRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectRequest.save();

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("something went wrong " + err.message);
    }
  },
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {

  try{
    const loggedInUser = req.user
    const {status} = req.params
    const allowedStatus = ["accepted", "rejected"];

    if(!allowedStatus){
      return res.status(400).json({message: "Status is not Allowed"})
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: req.params.requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    })

    if(!connectionRequest){
      return res.status(400).json({message: "Connection request not found"})
    }

    connectionRequest.status = status

    const data = await connectionRequest.save()
    res.json({message:'Connection request '+ status, data })

  }catch(err){
    res.status(400).send("something went wrong " + err.message);
  }
})

module.exports = requestRouter;

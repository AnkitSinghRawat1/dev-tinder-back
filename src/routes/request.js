const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/authMiddleware");

requestRouter.post("/sendConnectReq", userAuth, async (req, res) => {
  // sending a connection Request
  console.log("sending a connection Request by ", req.user?.firstName);

  res.send("sending a connection Request");
});
 

module.exports = requestRouter
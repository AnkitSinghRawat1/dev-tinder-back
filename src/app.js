const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  // try{
    throw new Error("Something went wrong")
    res.send("User Data Send")
  // }catch(err){
  //   res.status(500).send("Some error! please contact support team!")

  // }
})

app.use("/", (err,req,res,next) => {
  if(err){
    res.status(500).send("Something went wrong")
  
  }
})

app.listen(3000, () => {
  console.log("server is running");
});

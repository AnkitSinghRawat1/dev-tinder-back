const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user")
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) =>{
 
  // creating a new instance of a user module
 
  const userObj = req.body 
  const user = new User(userObj)
  try{
    await user.save();   
    res.send("User signup successfully")
  } catch(err){
    res.status(400).send("error savong the user ", err.message)
  }
 

})

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

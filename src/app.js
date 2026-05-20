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
    console.log(err.message)
    res.status(400).send("error savong the user ", err.message)
  }
 

})


// get user by ID from DB
app.get("/user", async (req, res) =>{
      const {emailId} = req.body
      try{
        const users = await User.find({emailId})
        console.log(users)
        if(users.length === 0){
          res.status(404).send("user not found")
        }else{
          res.send({msg: "user matched",data:  users[0]})
        }
      }catch(err){
        res.send(400).send("something went wrong")
      }
 
})

// get all users from DB
app.get("/feed", async (req, res) =>{
      try{
        const users = await User.find()
        res.send({message: "users found", data: users})
      }catch(err){
        res.send(400).send("something went wrong")
      }
 })

//  delete a user
app.delete('/user', async (req, res)=>{

  const userId = req.body._id

  try{
    // const user = await User.findByIdAndDelete({_id: userId})
    console.log('id is :', userId)
      const user = await User.findByIdAndDelete(userId)
      console.log('user id ', user)
      if(user){
        res.send("User deleted successfully", user)
      } else {
        res.send('user not found')
      }
  }catch(err){
        res.send(400).send("something went wrong")
      }

})

// update a user

app.patch("/user", async (req, res)=>{
  const userId = req.body._id

  try{
    // const user = await User.findByIdAndDelete({_id: userId})
    const updatedFields = req.body
      const user = await User.findByIdAndUpdate(userId, updatedFields,{
        returnDocument: 'after',
        runValidators: true
      })
      console.log('user id ', user)
      if(user){
        res.send("User updated successfully "+ user)
      } else {
        res.send('user not found')
      }
  }catch(err){
        res.status(400).send("something went wrong " +err.message)
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

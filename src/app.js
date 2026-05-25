const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user")
const app = express();
const {validationSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json());

app.post("/signup", async (req, res) =>{
 
  try{
    // validation of data
    validationSignupData(req)
  
    // encrypted password
    const {firstName, lastName, password, emailId, age, skills, gender} = req.body 
    const passwordHash = await bcrypt.hash(password, 10)
    console.log(passwordHash)
    
  
    // creating a new instance of a user module
    const user = new User({
      firstName, lastName, password: passwordHash, emailId, age, skills, gender
    })
    await user.save();   
    res.send("User signup successfully")
  } catch(err){
    console.log(err.message)
    res.status(400).send("error savong the user "+ err.message)
  }
 

})

app.get("/login", async (req, res) => {
  try{
    const {emailId, password} = req.body

    const user = await User.findOne({emailId})

    if(!user){
      throw new Error("Email id is not Registered")
    }

     const isPasswordValid = await bcrypt.compare(password, user.password )

     if(isPasswordValid){
      console.log( {firstName: user?.firstName, lastName: user?.lastName, emailId: user?.emailId})
       res.status(200).send("user login successfull "+ {firstName: user?.firstName, lastName: user?.lastName, emailId: user?.emailId})
      } else {
       res.status(401).send("password not correct ")
     }

  }catch(err){
    res.status(404).send("Something went wrong " + err.message)
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

app.patch("/user/:userId", async (req, res)=>{
  const userId = req.params.userId
  const updatedFields = req.body

  try{
    // const user = await User.findByIdAndDelete({_id: userId})

    const ALLOWED_UPDATES = [
        "photoUrl", "about", "gender", 'age', 'skills',"firstName"
    ]

    const isUpdateAllowed = Object.keys(updatedFields).every(k => 
      ALLOWED_UPDATES.includes(k)
    )

    if(!isUpdateAllowed){
      throw new Error("update not allowed")
    }
    if(updatedFields?.skills.length > 10){
      throw new Error("Skills can not be more than 10")
    }

      const user = await User.findByIdAndUpdate(userId, updatedFields,{
        returnDocument: 'after',
        runValidators: true
      }) 

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

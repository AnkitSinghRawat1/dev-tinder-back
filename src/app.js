const express = require("express");
const {adminAuth, userAuth} = require('./middlewares/authMiddleware')
const app = express();

// route hadnlers ---> (req,res)=>{}
//  app.use("/route",rh0,[rh1,rh2], rh3 , rh4 , rh5 )

app.use("/admin", adminAuth) 

app.get('/user/all',userAuth, (req, res)=>{
    res.send("all userrs here")
})

app.post('/user/login', (req, res) => {
    res.send("User login successfully!")
})

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Get All Data");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("Deleted a User");
});

app.listen(3000, () => {
  console.log("server is running");
});

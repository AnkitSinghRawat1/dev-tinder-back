const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {

  try{ 
     // Read the cookie from the req cookie
    const { token } = req.cookies;

    if(!token){
      throw new Error("Invalid token")
    }
    
    // verify it
    const decodedObj = await jwt.verify(token, "secret");
    const {_id} = decodedObj
    
    // find the User
    const user = await User.findById(_id);
    
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user
    next();
  }catch(err){
    res.status(404).send("Error "+ err.message)
  }
};

module.exports = {  userAuth };

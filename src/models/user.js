const mongoose = require("mongoose");
const {Schema} = mongoose
const validator = require("validator")

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address ")
      }
    }
  },
  password: {
    type: String,
    require: true, 
     validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("enter strong password ")
      }
    }
  },
  age: {
    type: Number,
    min: 18
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female",'others'].includes(value)){
        throw new Error("Gender data is not valid")
      }
    }
  },
  photoUrl: {
    type: String,
      validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid Photo URL ")
      }
    }
  },
  about: {
    type: String,
  },
  skills: {
    type: Array,
    default: "default about of the user"
  }
}, {
  timestamps: true
});

module.exports =  mongoose.model("User", userSchema);;

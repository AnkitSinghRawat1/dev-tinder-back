const mongoose = require("mongoose");
const {Schema} = mongoose

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
  },
  password: {
    type: String,
    require: true, 
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

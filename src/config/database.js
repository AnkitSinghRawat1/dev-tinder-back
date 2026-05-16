const mongoose = require("mongoose")

const connectDB = async () => {

 await mongoose.connect("mongodb+srv://ankitintchar:aA30wDkFzI2M5mpO@cluster0.pqwsgy6.mongodb.net/devTinder")
}

module.exports = {connectDB}
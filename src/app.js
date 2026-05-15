const express = require("express")

const app = express()

// route hadnlers ---> (req,res)=>{}
//  app.use("/route",rh0,[rh1,rh2], rh3 , rh4 , rh5 )

app.get("/user",[ (req, res, next)=>{
    console.log("1st Route Handler")
    res.send({
        firstName: "Ankit",
        lastName:"Singh"
    })
    next()
}, (req,res, next) =>{
    console.log("2nd route handler")
    res.send({
        firstName: "Ankit2",
        lastName:"Singh2"
    }) 
}], (req,res, next) =>{
    console.log("3rd route handler")
    res.send({
        firstName: "Ankit3",
        lastName:"Singh3"
    }) 
}, (req,res, next) =>{
    console.log("4th route handler")
    res.send({
        firstName: "Ankit4",
        lastName:"Singh4"
    }) 
}) 

app.listen(3000, ()=>{
    console.log('server is running')
})
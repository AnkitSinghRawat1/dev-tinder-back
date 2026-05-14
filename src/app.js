const express = require("express")

const app = express()


app.get("/user", (req, res)=>{
    res.send({
        firstName: "Ankit",
        lastName:"Singh"
    })
})


app.post("/user", (req, res)=>{
    res.send("Data saved successfully!")
})

app.delete("/user", (req, res)=>{
    res.send("Data deleted successfully!")
})


app.use("/hello",(req, res) => {
    console.log('first')
   res.send("hello Page")
})


app.use("/bye",(req, res) => {
   res.send("bye Page")
})

app.use("/",(req, res) => {
    console.log('hello page on screem')
   res.send("Home Page")
})

app.listen(3000, ()=>{
    console.log('server is running')
})
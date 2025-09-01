const express = require("express")
const app = express()

//middleware
app.use((req,res,next)=>{
    console.log("middleware");
    next();
})





//hello world
app.get('/', (req, res) => {
  res.send('Hello World')
})


// /profile
app.get('/profile',(req,res)=>{
    res.send('hello i am profile')
})


//profile/:username  dynamic routing
app.get('/profile/:username',(req,res)=>{
    res.send(`hello from ${req.params.username}`)
})


//run on port 3000
app.listen(3000,()=>{
    console.log("running on port 3000");
})
const express = require("express")
const app = express()

app.set("view engine","ejs")

//hello world
app.get('/', (req, res) => {
  res.render('index', {age:12})
})

app.get('/contact',(red,res)=>{
    res.render('contact')
})


//run on port 3000
app.listen(3000,()=>{
    console.log("running on port 3000");
})
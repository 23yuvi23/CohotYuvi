const express = require("express")
const app = express()
app.set("view engine","ejs")
app.use(express.static('./public'))  //it will work like middle ware

//hello world
app.get('/', (req, res) => {
  res.render('index', {age:12})
})

app.get('/contact',(red,res)=>{
    res.render('contact')
})

app.get('/error',(red,res)=>{
    throw Error("Something went wrong")
})



app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
)

//run on port 3000
app.listen(3000,()=>{
    console.log("running on port 3000");
})
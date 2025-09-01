/*
Assignment #1 - Trying to code a todo app and store data into the array
*/

const express = require("express");
const app = express();

const todo = [{
  id:1,
  desc:"Writing Python",
  compledent:false
},
{
  id:2,
  desc:"Writing js",
  compledent:true
}]


app.get('/', (req, res) => {
  res.send('<h1>Todo List Homepage</h1>')
})

app.get("/todos",(req,res)=>{
  res.json(todo)
})

app.get("/todos/:id", (req,res)=>{
    console.log(req.params)
    res.json([]);
})


// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
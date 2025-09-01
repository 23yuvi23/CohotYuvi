/*
Assignment #1 - Trying to code a todo app and store data into the array
*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const uuid = require ("uuid")
const cors = require("cors")


//middleware
// function custom_middleware(req,res,next){
//   console.log("from middleware");
//   next()
  
// }

app.use(bodyParser.json())
app.use(cors())


const todos = [{
  id:1,
  desc:"Writing Python",
  completed:false
},
{
  id:2,
  desc:"Writing js",
  completed:true
}]


app.get('/', (req, res) => {
  res.send("Todo List Homepage")
})

app.get("/todos",(req,res)=>{
  res.json(todos)
})

app.get("/todos/:id", (req,res)=>{
    console.log(req.params.id)
    let todo = todos.filter((todo)=>todo.id == req.params.id)
    res.json(todo);
})

app.post("/todos" , (req,res)=>{
  let body = req.body
  console.log(body);

  todos.push({id:uuid.v4(), ...body})
  res.json([todos]);
})

app.put("/todos/:id" , (req,res)=>{
  let todo  = todos.find(todo =>todo.id == req.params.id)
  if(todo){
    todo.desc = req.body.desc
    todo.completed = req.body.completed
    res.json(todos)
  }else{
    res.send ("todo with given id not exist")
  }
  
})

app.delete("/todos/:id" , (req,res)=>{
  let index = todos.findIndex(todo=>todo.id==req.params.id)
  // console.log(index);
  todos.splice(index,1)
  res.json(todos);
})


// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
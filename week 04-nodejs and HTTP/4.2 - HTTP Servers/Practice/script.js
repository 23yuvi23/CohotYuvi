// - **GET** → retrieve data.
// - **POST** → send data.
// - **PUT/PATCH** → update data.
// - **DELETE** → remove data.

const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) //Middleware add karna (req.body parse karne ke liye)

const todos = [
    {
        id:1,
        desc:"go to gym",
        state:true
    },

    {
        id:2,
        desc:"buy groceries",
        state:false
    }
]

// Hello route
app.get("/", (req, res) => {
    res.send("Hello");
});


app.get('/todos', (req, res) => {
  res.json(todos);  // pura array JSON form me bhej do
})


app.post('/todospost',(req ,res)=>{
    const{desc,state}=req.body   // body se data nikalna

    const newTodo = {
        id: Date.now(), // unique id
        desc,
        state
    }
    todos.push(newTodo) // array me add karna

    res.json({
        message: "Todo added successfully",
        todo:newTodo
    })

})

/*
skeleton of patch 
app.patch('/todos/:id', (req, res) => {
   // 1. id nikalna (params se)
   // 2. body me kya update karna hai vo lena
   // 3. todos array me us id ka todo dhundhna
   // 4. usme changes karna
   // 5. response bhejna
});
*/

app.patch('/todospost/:id',(req, res)=>{
    const id = parseInt(req.params.id);      // URL se id nikalna
    const {desc, state} = req.body;          // body se new values lena

    const todo = todos.find(t => t.id === id)  // us id ka todo dhundhna

    if(!todo){
        return res.status(404).json({message:"Todo not found"})
    }

    // Jo bheja hai usko update kar do
    if(desc!==undefined) todo.desc = desc;
    if(state!==undefined)todo.state = state;

    res.json({
        message:"todo updated successfully",
        todo
    })
})

/*
skeleton of delte 
app.delete('/todos/:id', (req, res) => {
   // 1. id nikalna
   // 2. todos array se usko remove karna
   // 3. response bhejna
});
*/

app.delete('/tododel/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    const index = todos.findIndex(t => t.id == id);

    if(index === -1){
        return res.status(404).json({ message: "Todo not found" });
    }
    const deleteTodo = todos.splice(index,1) //array se remove

    res.json({
        message: "Todo deleted successfully",
        todo: deleteTodo[0]
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
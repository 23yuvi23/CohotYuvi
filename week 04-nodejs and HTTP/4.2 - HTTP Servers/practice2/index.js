// - **GET** → retrieve data.
// - **POST** → send data.
// - **PUT/PATCH** → update data.
// - **DELETE** → remove data.

const express = require('express')
const app = express()
const port = 3000



todos=[
    {
        id:1,
        task : "go to gym",
        status: false
    },
    {
        id:2,
        task: "go to lab",
        status: true
    }
]

app.use(express.json()); // JSON request ke liye middleware

app.get('/', (req, res) => {
  res.json(todos)
})

app.post('/add-todo',(req,res)=>{
    const{task,status}= req.body

    newTodo = {
        id:Date.now(),
        task,
        status
    }

    todos.push(newTodo)

    res.json({
        message:"successfully pushed new todo ",
        todo:newTodo
    })
})

app.patch('/patch-todo/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const{task,status}= req.body
    const todo = todos.find((t) => t.id === id)


    if(!todo){
        return res.json({
            message:"todo not found"
        })
    }

    if(task){
        todo.task = task 
    }
    if(status){
        todo.status=status
    }

    res.json({
        message:"todo updated successfully",
        todo
    })

    }
)

app.delete('/todo-delete/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    // const {task,status}= req.body
    const index = todos.findIndex((t)=>t.id===id)

    if(index === -1){
        return res.status(404).json({ message: "Todo not found" });
    }

    const deletetodo = todos.splice(index,1)

        res.json({
        message: "Todo deleted successfully",
        todo: deletetodo[0]
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

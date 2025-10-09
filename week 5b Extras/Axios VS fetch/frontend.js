const express = require('express')
const app = express()

app.use(express.json())

app.get("/todo",(req,res)=>{
    res.json({
        message:"hello",

        todos :[
         {
            id:1,
            title:"todo1"
        }, 
        {
        id : 2,
        title:"todo2"
        },
        {
        id : 3,
        title:"todo3"
        }
        ]
    })
})

app.listen(3000)
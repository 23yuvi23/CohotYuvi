const express = require("express")
const app = express()

app.use(express.json())

let requestcount =0 ;
function countRequest(req,res,next){
    requestcount++

    next()
}

app.use(countRequest)


app.get("/",(req,res)=>{
    res.send({
        totalreq:requestcount
    })
})

app.get("/greet",(req,res)=>{
    res.send({
        Greet:"hi there"
    })
})

app.listen(3000,()=>{
    console.log("server started at port 3000");
    
})

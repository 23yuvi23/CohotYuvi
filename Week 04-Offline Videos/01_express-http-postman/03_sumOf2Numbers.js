const express = require('express')
const app =express()

function sumof2no(a,b){
    return a+b
}

app.get('/',(req,res)=>{
    const a = Number(req.query.a);  //input a 
    const b = Number(req.query.b);  //input b
    const sum = sumof2no(a,b)

    res.send("hi your sum is "+ sum)

})

app.listen(3000) 
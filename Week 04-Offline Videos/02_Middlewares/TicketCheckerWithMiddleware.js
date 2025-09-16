const express = require('express')
const app = express()

//ticket checker with middleware
function isOldEnoughMiddleware(req,res,next){
    const age = req.query.age;
     if(age>=14){
        next()
    } else {
        res.json({
            msg:"Sorry you are not of age yet"
        })
    }
}

app.use(isOldEnoughMiddleware);

app.get("/ride1",(req,res)=>{
        res.json({
        msg:"You have sucessfully riden the ride 1"
    })
})

app.get("/ride2",(req,res)=>{
        res.json({
        msg:"You have sucessfully riden the ride 2"
    })
})

app.listen(3000)
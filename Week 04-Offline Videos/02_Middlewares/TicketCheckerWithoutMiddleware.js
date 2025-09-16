const express = require('express')
const app = express()

//function will return a bool if age of person is more than 14
//ticket checker
function isOldEnough(age){
    if(age>=14){
        return true;
    } else {
        return false;
    }
}

app.get("/ride1",(req,res)=>{
    if(isOldEnough(req.query.age)){
         res.json({
        msg:"You have sucessfully riden the ride 1"
    })
    } else {
        res.status(411).json({
            msg:"Sorry you are not of age yet"
        })
    }
   
})


app.get("/ride2",(req,res)=>{
    if(isOldEnough(req.query.age)){
         res.json({
        msg:"You have sucessfully riden the ride 1"
    })
    } else {
        res.status(411).json({
            msg:"Sorry you are not of age yet"
        })
    }
   
})

app.listen(3000)
const express = require("express");
const app  = express();

app.get("/sum/:a/:b",function(req,res){
    const a = parseInt(req.params.a);           //query parameter are with ? in the search eg  http://localhost:3000/sum?a=10&b=20
    const b = parseInt(req.params.b);

    res.json({
        ans : a+b
    })
});

/*
app.get("/sum",function(req,res){
    const a = parseInt(req.query.a);           // the / way to take input
    const b = parseInt(req.query.b);

    res.json({
        ans : a+b
    })
});
*/

app.get("/multiply",function(req,res){
    const a = req.query.a;
    const  b = req.query.b;

    res.json({
        ans:a*b
    })
});

app.get("/divide",(req,res)=>{
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        ans:a/b
    })
});

app.get("/subtract",(req,res)=>{
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        ans:a-b
    })
});

app.listen(3000);
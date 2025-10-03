const express = require("express");
const app  = express();

let requestCount = 0; 
function requestInncreaser(req,res,next){
    requestCount += 1;
    console.log("Total no of requests = "+ requestCount);
    next();     //next fxn will get called
}

function realSumHandler(req,res){
    //main logic
    const a = parseInt(req.params.a);          
    const b = parseInt(req.params.b);

    res.json({
        ans : a+b
    })
};

function realMulHandler(req,res){
const a = req.query.a;
    const  b = req.query.b;

    res.json({
        ans:a*b
    })
}

app.use(requestInncreaser) //iske uppar nahi chalega middleware iske niche hi chalega 

app.get("/sum/:a/:b", realSumHandler);
app.get("/multiply",realMulHandler);
app.get("/admin",function(req,res){
    res.json({
        message:"Total no of requests on the server is "+ requestCount
    })
})

app.listen(3000);
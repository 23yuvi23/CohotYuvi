// 1. Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
const express = require('express');
const app = express();

//log the method , timestamp and the url 

function loggerMiddleware(req,res,next){
    console.log("Method is "+ req.method);
    console.log("route is "+req.url );
    console.log("Host or url is "+req.hostname );
    console.log(new Date());

    next();
}

app.use(loggerMiddleware)

app.get("/",function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json ({
        ans:a+b
    })

})

app.listen(3000);
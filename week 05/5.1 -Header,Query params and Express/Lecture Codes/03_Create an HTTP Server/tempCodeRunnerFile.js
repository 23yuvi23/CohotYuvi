let requestCount = 0; 
function requestInncreaser(){
    requestCount += 1;
    console.log("Total no of requests = "+ requestCount);
}

app.get("/sum/:a/:b", requestInncreaser, function(req,res){
    //main logic
    const a = parseInt(req.params.a);           //query parameter are with ? in the search eg  http://localhost:3000/sum?a=10&b=20
    const b = parseInt(req.params.b);

    res.json({
        ans : a+b
    })
});
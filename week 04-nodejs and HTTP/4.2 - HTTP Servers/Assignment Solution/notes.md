nodemon a dev dependency 

tu run code inn nodemon  
```
npx nodemon index.js
```

what ever we send in req console.log(req)  we get such a long code 
so whatever we pass inside it we get that in req.parms

```js
app.get("/todos/:id", (req,res)=>{
    console.log(req.params)
    res.json([]);
})
```

we get output as []  //an empty array
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

## Something about filter 

```js 
let todo = todos.filter((todo)=>todo.id == req.params.id)
```

aise to return karega but agar {} laga diya to return keyword likhna hi hoga like 

```js
let todo = todos.filter((todo)=>{
    return todo.id == req.params.id
    })
```

npm install body-parser
this is used to write something from body 

npm install uuid 
tthis is used to generate auto uuid 
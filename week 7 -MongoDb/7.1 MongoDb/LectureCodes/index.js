const express = require ("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "i am a sercert for this database"
const app = express();

const mongoose = require("mongoose")
//importing database model here that we exported in ./db.js 
const {UserModel,TodoModel} = require("./db")

//use of middleware
app.use(express.json());

app.post("/signup",async (req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //since the mongo db server are somewhere else and it take time to req and get the response back so we use here await 
    await UserModel.create({
        email:email,
        password:password,
        name:name
    })

    //if we not use await then no matter if above have ome issue in connecting to db then also it says you are logged in 
    //so we await there till it is confirm that we are actually logged in 
    res.json({
        message:"you are logged in successfully"
    })


})


app.post("/signin", async (req,res)=>{
        const password = req.body.password;
        const email = req.body.email;

         const user = await UserModel.findOne({
            email:email,
            password:password
        })

    if(user){
        const token = token.sign({
            id:user._id
        })
        res.json({
            token,
            message:"welcome user you are logged in"
        })

    } else res.status(404).json({
        message:"invalid username or password try again !!!"
    })

console.log(user);
})


//authenticaltion middleware
// app.authy((req,res,next)=>{
//     console.log();
    
//     next()
// })

//the below data only visible if user is logged in
app.post("/todo",(req,res)=>{

})

app.get("/todos",(req,res)=>{

})


app.listen(3000)
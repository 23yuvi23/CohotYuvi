//encryption -> encoding

const express = require ("express")
const app = express()
const jwt = require("jsonwebtoken")
const JWT_SECRET = "randomWord"

app.use(express.json()) //middleware to parse the body 

//create an array as global variable
const users = [];



app.post("/signup" , (req,res)=>{
 const username = req.body.username ;
 const password =  req.body.password;

 //later we will do input validations using ZOD 
 users.push({
    username:username,
    password:password,
 })

 res.json ({
    message: "you are signed up",
    array : users
 })
})



app.post("/signin" , (req,res)=>{
    const username = req.body.username ;
    const password =  req.body.password;

    //check password is correct 
    const Founduser = users.find(function(u){
        if(u.username == username && u.password == password){
            return true
        } else {
            return false
        }
    })

    if(Founduser) { 
        const token = jwt.sign({ username: username},JWT_SECRET)  // 2 argument 


        // Founduser.token = token;
        res.json({
            array : users ,
            token : token , 
            message :  "token generated"
        }) 
    } else {
        res.status(403).send({
            message : "Invalid username or password"
        })
    }
})


app.get("/me",(req,res)=>{
    const token = req.headers.token //jwt token now user will send

    //will get back json object in the variable {username : "yuvi"}
    const decodedIndormation = jwt.verify(token, JWT_SECRET) 
    const username = decodedIndormation.username
    let founduser = null;


    for(let i =0;i<users.length;i++){
        if(users[i].username == username){
            founduser = users[i]
        }
    }

    if (founduser){
        res.json({
            username: founduser.username,
            password:founduser.password
        })
    }else{
        res.json({
            message:"token invalid"
        })
    }
})


app.listen(3000)
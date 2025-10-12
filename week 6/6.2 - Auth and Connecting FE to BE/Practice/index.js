const express = require("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "YUVI"
const app = express()

app.use(express.json())

const users= []

//-----------------------------route handler that run html with backend 
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

//-------------------------------signup route 
app.post("/signup",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    users.push({
        username:username,
        password:password
    })
    res.json({message:"successfully signed up"})
})

//-------------------------------signin route 
app.post("/signin",(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    const verifyUsers = users.find( function(u){
        if(u.username == username && u.password == password){
            return true
        }
        else{
            return false
        }
    })

    if(!verifyUsers){
        res.status(404).send({message:"invalid user"})
    } else {
        const token = jwt.sign({username:username},JWT_SECRET)
        res.send({
            message:"successfully signed in",
            user:username,
            pwd:password,
            jwt_token:token
        })
    }
})

//--------------------------middleware that authenticate 
function auth(req,res,next){
const token = req.headers.authorization
  if(!token){
   return res.json({message:"token is missing"})
  } 
  try{
     const verifytoken = jwt.verify(token,JWT_SECRET) ;
     req.username = verifytoken.username
     next()
  }
   

 catch(err) {
        res.status(401).json({message:"you are not logged in"})
    }
  
  
}
app.get("/me",auth,(req,res)=>{
    const finduser = users.find((user)=>user.username == req.username)
  if(finduser){
    return res.json({username :finduser.username , password : finduser.password})
  }else{
    res.json({message:"invalid token"})
  }
})

app.listen(3000)

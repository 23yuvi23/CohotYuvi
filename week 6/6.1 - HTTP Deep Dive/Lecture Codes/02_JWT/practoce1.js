const express = require ("express")
const jwt = require("jsonwebtoken")

const app = express()
const JWT_SECRET = "i am secret"

app.use (express.json())
const users =[]

////////////////////////////////////////////////////////////////////////////
app.post("/signup",(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    users.push({
        username : username,
        password : password
    })

    res.send ({
        message : "user signed successful",
        users : users
    })

})

///////////////////////////////////////////////////////////////////////////
app.post("/signin",(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    const verifyUsers = users.find(function (u){
        if(u.username == username && u.password == password){
            return true
        } else {
            return false
        }
    })


    if(verifyUsers){
        const token  =  jwt.sign({username : username},JWT_SECRET)

        res.send({
        message: "token generated successfully",
        usersname : username,
        token : token
    })

    } else {
        res.status(404).send({
            message : "username or password mismatch "
        })
    }
})

///////////////////////////////////////////////////////////////////////////
app.get("/me",(req,res)=>{
    const token = req.headers.token
    const decode = jwt.verify(token,JWT_SECRET)
    const decodedUsername = decode.username

    const founduser = users.find(function(u){
        if(u.username == decodedUsername){
            return true
        }else {
            return false
        }
})

        if(founduser){
            res.json({
                username : founduser.username,
                password : founduser.password
            })
        }else {
            res.status(404).send({
                message:"Token Mismatch"
            })
        }
    
})
app.listen(3000)
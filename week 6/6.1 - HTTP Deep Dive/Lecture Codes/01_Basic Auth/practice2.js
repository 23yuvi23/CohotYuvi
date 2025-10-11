const express = require ("express");
const app = express()

app.use(express.json())

const users = []

function generateTokens (){
    let options  =    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', 
        '5', '6', '7', '8', '9'];
        let token = ""
        for(let i=0 ;i<32;i++){
            token+= options [Math.floor(Math.random() * options.length)]
        }
        return token
}

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        message : "You are signed up successfully",
        userData : users
    })
})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const Founduser = users.find(function(u){
        if(u.username==username && u.password==password){
            return true
        } else{
            return false
        }
    })

    if(Founduser){
        const token = generateTokens();
        Founduser.token = token
        
        res.json({
            array:users,
            message:"you are successfully logged in"
        })
    } else {
        res.status(404).send({
            message : "Invalid Username Or Password Please Try Again"
        })
    }
})

app.listen(3000)
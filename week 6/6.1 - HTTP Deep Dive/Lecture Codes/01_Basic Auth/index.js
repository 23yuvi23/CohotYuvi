const express = require("express")
const app = express();

// function signinHandler (req,res){

// }

app.use(express.json()) //middleware to parse the body 

//create an array as global variable
const users = [];

//create a function that generate random strings in form of tokens
function generateTokens(){
    let options  =    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', 
        '5', '6', '7', '8', '9'];

         let token = ""
         for(let i=0;i<32;i++){
            token+= options[Math.floor(Math.random()*options.length)]
         }
         return token
}


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
        const token = generateTokens()
        Founduser.token = token;
        res.json({
            array : users ,
            message :  "token generated"
        }) 
    } else {
        res.status(403).send({
            message : "Invalid username or password"
        })
    }
})



app.listen(3000)
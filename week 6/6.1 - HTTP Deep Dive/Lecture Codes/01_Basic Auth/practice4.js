const express= require("express")
const app = express()

app.use(express.json())

function GenerateTokens(){
    let object  = ["1","2","3","4","a","b","c"]

    let token=""
    for(let i =0 ;i<32;i++){
        token += object[Math.floor(Math.random()*object.length)]
    }
    return token
}

const users =[]
app.post("/signup",(req,res)=>{
 const username = req.body.username
 const password = req.body.password

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"user successfully signed up"
    })
 
})



app.post("/signin" , (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    const VerifyUsers = users.find (function(u){
        if(u.username==username && u.password==password){
            return true
        }else{
            return false
        }
    }
)

    //giving Auth tokens to the users
    if(VerifyUsers){
        const token = GenerateTokens()
        VerifyUsers.token = token;
        res.json({
            message:"signed in successful",
            user : users
        })
    }else{
        res.status(404).send({
            message:"Invalid username or password"
        })
    } 
})

app.listen(3000)
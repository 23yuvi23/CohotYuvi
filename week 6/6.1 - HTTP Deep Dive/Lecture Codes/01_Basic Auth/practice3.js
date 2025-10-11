const express= require("express")
const app = express()


app.use(express.json())

function generateTokens(){
    let option = ["1","2","3"]
    let token = ""
    for(let i =0 ;i<=32; i++){
        token += option[Math.floor(Math.random()*option.length)]
    }
    return token
}
const users =[]
app.post("/signup",(req,res)=>{
    const username  = req.body.username
    const password = req.body.password

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"congratulations you signed up",
        users:users
        

    })
})  

app.post("/signin",(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    const Founduser = users.find(function(u){
        if(u.username==username && u.password== password){
            return true
        } else {
            return false
        }
    })

    if(Founduser){
        const token = generateTokens()
        Founduser.token = token 

        res.json({
            users : users ,
            message : "Sign in successful"
        })
    }else {
        res.status(404).send({
            message:"Invalid user or password try again !!!"
        })
    }


})

app.listen(3000)
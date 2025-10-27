const {Router} = require("express")
const userRouter = Router();
const {userModel}=require("../db")
const jwt = require("jsonwebtoken")
const JWT_USER_PASSWORD = "userSeceretKey"
const bcrypt = require("bcrypt")
const saltRounds = 4 

userRouter.post("/signup",async (req,res)=>{
    const {email,password,firstname,lastname} = req.body;  //TODO : adding zod validation
    //TODO : hash the password so plain text pass is not stored in db
    const hashedPassword = await bcrypt.hash(password, saltRounds) 
    //TODO : put inside a try catch block
    try{
    await userModel.create({
        email,
        password:hashedPassword,
        firstname,
        lastname
    })

    res.json({
    message:"Signup succeeded ✅ "
    })
} catch (e){
    console.error(e);
    return  res.status(404).json({
        message:"signup failed !!!!! ❌ "
    })
}
})

userRouter.post("/signin",async (req,res)=>{
    const { email , password } = req.body;
    
    try {
        const user = await userModel.findOne({email:email})
        if(!user){
            res.status(404).json({
                message : "username is incorrect "
                
            })
            return
        }
const passwordMatch = await bcrypt.compare(password , user.password)

if(!passwordMatch){
    res.status(404).json({message: "incorrect password"})
}
const token =  jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);
                res.json({
            token:token
        })
}

        //TODO: do cookie logic 
catch(e){
    res.status(500).json({message:"some error occured while signin"})
}

})

userRouter.get("/purchased",(req,res)=>{
    res.json({
    message:"user purchased endpoint"
        })
    })


module.exports = {
    userRouter:userRouter
}
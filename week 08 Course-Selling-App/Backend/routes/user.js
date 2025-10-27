const {Router} = require("express")
const userRouter = Router();
const {userModel}=require("../db")
const jwt = require("jsonwebtoken")
const JWT_USER_PASSWORD = "userSeceretKey"


userRouter.post("/signup",async (req,res)=>{
    const {email,password,firstname,lastname} = req.body;  //TODO : adding zod validation
    //TODO : hash the password so plain text pass is not stored in db

    //TODO : put inside a try catch block
    try{
    await userModel.create({
        email,
        password,
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
    
    //TODO: hashed password logic will be applied here too after applying it in signup using bcrypt
    const user = await userModel.findOne({
        email:email,
        password,password
    })
    
    if(user){
       const token =  jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);

        //TODO: do cookie logic 
        res.json({
            token:token
        })
    } else {
        res.status(403).json({
            message:"username or password mismatch !!!"
        })
    }

    res.json({
    message:"Signin endpoint"
        })
})

userRouter.get("/purchased",(req,res)=>{
    res.json({
    message:"user purchased endpoint"
        })
    })


module.exports = {
    userRouter:userRouter
}
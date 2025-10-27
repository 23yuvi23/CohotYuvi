const {Router} = require("express")
const userRouter = Router();
const {userModel}=require("../db")



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

userRouter.post("/signin",(req,res)=>{
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
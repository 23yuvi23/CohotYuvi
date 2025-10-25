const {Router} = require("express")
const userRouter = Router();

userRouter.post("/signup",(req,res)=>{
res.json({
    message:"Signup endpoint"
    })
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
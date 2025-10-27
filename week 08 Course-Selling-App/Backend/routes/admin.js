const {Router } = require("express")
const adminRouter = Router();
const {adminModel } = require("../db")
//bcrypt zod jsonwebtoken

adminRouter.post("/signup",(req,res)=>{

res.json({
    message:"Signup endpoint"

    })
})

adminRouter.post("/signin",(req,res)=>{
    res.json({
    message:"Signin endpoint"
        })
})


adminRouter.post("/course",(req,res)=>{
    res.json({
    message:"create a cource endpoint hit"
        })
})

adminRouter.put("/course",(req,res)=>{
    res.json({
    message:"change price etc of a cource"
        })
})

adminRouter.get("/course/bulk",(req,res)=>{
    res.json({
    message:"give all cource that are created"
        })
})

module.exports = {
    adminRouter:adminRouter
}
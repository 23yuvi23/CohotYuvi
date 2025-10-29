const {Router } = require("express")
const adminRouter = Router();
const {adminModel, courseModel } = require("../db")
const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require("../config")
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middleware/admin");
const saltRounds = 5
//bcrypt zod jsonwebtoken

adminRouter.post("/signup",async (req,res)=>{
 const {email,password,firstname,lastname} = req.body;  //TODO : adding zod validation
    //TODO : hash the password so plain text pass is not stored in db
    const hashedPassword = await bcrypt.hash(password, saltRounds) 
    //TODO : put inside a try catch block
    try{
    await adminModel.create({
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

adminRouter.post("/signin",async (req,res)=>{
const { email , password } = req.body;
    
    try {
        const admin = await adminModel.findOne({email:email})
        if(!admin){
            res.status(404).json({
                message : "username is incorrect "
                
            })
            return
        }
const passwordMatch = await bcrypt.compare(password , admin.password)

if(!passwordMatch){
   return res.status(404).json({message: "incorrect password"})
}
const token =  jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD);
                res.json({
            token:token
        })
}

        //TODO: do cookie logic 
catch(e){
    return res.status(500).json({message:"some error occured while signin"})
}
})

//create a course 
adminRouter.post("/course",adminMiddleware ,async (req,res)=>{
    const adminId = req.userId
    const {title,description , imageUrl , price} = req.body;

    //todo : creating a web3 saas in 6 hours
    const course = await courseModel.create({
        title : title,
        description : description , 
        imageUrl : imageUrl, 
        price : price , 
        creatorId : adminId
    })

    res.json({
    message:"course created",
    courseId : course._id
        })
})

//update a course 
adminRouter.put("/course",adminMiddleware ,async (req,res)=>{
  const adminId = req.userId
    const {title,description , imageUrl , price , courseId} = req.body;

    //todo : creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id:courseId,  //filter what course to update 
        //also we will check weater correct person changing his course or trying to mess with someone else course
        creatorId:adminId
    },{
        title : title,
        description : description , 
        imageUrl : imageUrl, 
        price : price ,
    })

    res.json({
    message:"course updated",
    courseId : courseId
        })
})

//get all your course
adminRouter.get("/course/bulk",adminMiddleware, async(req,res)=>{
    const adminId = req.userId
        const courses = await courseModel.find({
        creatorId:adminId
    })

    res.json({
    message:"your courses are ",
    courses
        })
})

module.exports = {
    adminRouter:adminRouter
}
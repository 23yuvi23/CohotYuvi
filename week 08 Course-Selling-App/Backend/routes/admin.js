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
    res.status(404).json({message: "incorrect password"})
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
    res.status(500).json({message:"some error occured while signin"})
}
})


adminRouter.post("/course",adminMiddleware ,async (req,res)=>{
    const adminId = req.userId
    const {title,description , imageUrl , price} = req.body;

    //todo : creating a web3 saas in 6 hours
    const cource = await courseModel.create({
        title : title,
        description : description , 
        imageUrl : imageUrl, 
        price : price , 
        creatorId : adminId
    })

    res.json({
    message:"course created",
    courceId : cource._id
        })
})

adminRouter.put("/course",adminMiddleware ,async (req,res)=>{
  const adminId = req.userId
    const {title,description , imageUrl , price , courceId} = req.body;

    //todo : creating a web3 saas in 6 hours
    const cource = await courseModel.updateOne({
        _id:courceId  //filter
    },{
        title : title,
        description : description , 
        imageUrl : imageUrl, 
        price : price ,
    })

    res.json({
    message:"cource updated",
    courceId : cource._id
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
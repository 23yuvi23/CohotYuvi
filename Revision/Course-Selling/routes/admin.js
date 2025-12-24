const { Router } = require ("express")
const adminRouter = Router();
const jwt = require("jsonwebtoken")
const {adminModel} = require ("../db")       //imorting database adminModel in admin file
const { JWT_ADMIN_SECRET } = require("../config")
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
const zod = require("zod");
const { adminMiddleware } = require("../middleware/admin");

//********************************************************************SIGNUP ENDPOINT *************************************************************************************************
adminRouter.post('/signup', async (req, res) => {
 
     const requireBody = zod.object({
     email: zod.string().email().min(5),
     password:zod.string().min(5),
     firstname:zod.string().min(3),
     lastname:zod.string().min(3)
 })
const parseDataWithSuccess = requireBody.safeParse(req.body)

if(!parseDataWithSuccess.success){
    return res.status(500).send({
        message:"Incorrect Data Format !!!",
        error: parseDataWithSuccess.error
    })
}

const {email,password,firstName,lastName} = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds) 
try{
 await adminModel.create({
    email,
    password:hashedPassword,
    firstName,
    lastName
  })

return res.status(201).json({
  message: "Signup successful"
});

} catch(e) {
  return res.status(400).json({
    message:"your signup failed",
    error:e.message
  })
  }
})

//********************************************************************SIGNIN ENDPOINT *************************************************************************************************
adminRouter.post('/signin', async (req, res) => {
  const requireBody = zod.object({
          email: zod.string().min(4).email(),
          password:zod.string().min(4)
      })

  const parseDataWithSuccess = requireBody.safeParse(req.body)
  if(!parseDataWithSuccess.success){
        return res.status(500).json({
            message:"Incorrect data format",
            error:parseDataWithSuccess.error
        })
    }
  const {email,password} = req.body;

//todo HAshing password 
try{
  const admin = await adminModel.findOne({ email })
  if (!admin){
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
        },JWT_ADMIN_SECRET);
                res.json({
            token:token
        })
}catch(e){
  console.log("SIGNIN ERROR 👉", e);
    return res.status(500).json({message:"some error occured while signin"})
    error:e.message
}
})

//********************************************************************course create ENDPOINT *************************************************************************************************

adminRouter.post('/course', adminMiddleware , (req, res) => {

  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  await
  res.json({
    message:"create course endpoint"
  })
})
//change name price image of course
adminRouter.post('/course', (req, res) => {
  res.json({
    message:"change details endpoint"
  })
})
//get all their course in bulk
adminRouter.post('/course/bulk', (req, res) => {
  res.json({
    message:"get all course endpoint"
  })
})
module.exports = {
    adminRouter:adminRouter
}
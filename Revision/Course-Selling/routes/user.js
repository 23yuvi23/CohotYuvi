const {Router} = require("express")
const { userModel } = require("../db")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const userRouter = Router()
const JWT_SECRET = process.env.JWT_USER_PASSWORD; // from env file
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
const zod = require("zod")

//********************************************************************SIGNUP ENDPOINT *************************************************************************************************
userRouter.post('/signup', async (req, res) => {

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
 await userModel.create({
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
userRouter.post('/signin',async (req, res) => {
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
  const user = await userModel.findOne({ email })
  if (!user){
    res.status(404).json({
     message : "username is incorrect "
                
    })
    return

  }
  const passwordMatch = await bcrypt.compare(password , user.password)

  if(!passwordMatch){
   return res.status(404).json({message: "incorrect password"})
}
const token =  jwt.sign({
            id:user._id
        },JWT_SECRET);
                res.json({
            token:token
        })
}catch(e){
    return res.status(500).json({message:"some error occured while signin"})
}
})
  
//********************************************************************SIGNIN ENDPOINT *************************************************************************************************
userRouter.get('/purchases', (req, res) => {
  res.json({
    message:"purchases endpoint"
  })
})

module.exports= {
    userRouter:userRouter
}
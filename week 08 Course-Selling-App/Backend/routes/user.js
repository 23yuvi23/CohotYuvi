const {Router} = require("express")
const userRouter = Router();
const {userModel, purchaseModel}=require("../db")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const { userMiddleware } = require("../middleware/user");
const {JWT_USER_PASSWORD} = require("../config")
const bcrypt = require("bcrypt")
const saltRounds = 4 

userRouter.post("/signup",async (req,res)=>{
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
   return res.status(404).json({message: "incorrect password"})
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
    return res.status(500).json({message:"some error occured while signin"})
}
})

userRouter.get("/purchases", userMiddleware, async function (req, res) {
    // Get the userId from the request object set by the userMiddleware
    const userId = req.userId;

    // Find all purchase records associated with the authenticated userId
    const purchases = await purchaseModel.find({
        userId: userId, // Querying purchases by user ID
    });

    // If no purchases are found, return a 404 error response to the client
    if (!purchases) {
        return res.status(404).json({
            message: "No purchases found", // Error message for no purchases found
        });
    }

    // If purchases are found, extract the courseIds from the found purchases
    const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);

    // Find all course details associated with the courseIds
    const coursesData = await courseModel.find({
        _id: { $in: purchasesCourseIds }, // Querying courses using the extracted course IDs
    });

    // Send the purchases and corresponding course details back to the client
    res.status(200).json({
        purchases, // Include purchase data in the response
        coursesData, // Include course details in the response
    });
});

module.exports = {
    userRouter:userRouter
}
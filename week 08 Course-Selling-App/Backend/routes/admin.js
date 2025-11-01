const {Router } = require("express")
const adminRouter = Router();
const {adminModel, courseModel } = require("../db")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const {JWT_ADMIN_PASSWORD} = require("../config")
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middleware/admin");
const { ZodType } = require("zod");
const saltRounds = 5
//bcrypt zod jsonwebtoken


adminRouter.post("/signup",async (req,res)=>{

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

    try {
    // ✅ check if admin already exists
    const existing = await adminModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds) 

// ✅ Save and capture the created admin
    const admin = await adminModel.create({
      email,
      password: hashedPassword,
      firstName: firstname, // notice capital F (match schema)
      lastName: lastname
    });


    res.json({
    message:"Signup succeeded ✅ " ,
    adminId: admin._id // ✅ confirm unique 
    })
} catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Signup failed !!!!! ❌",
      error: e.message
    })
}
})

adminRouter.post("/signin",async (req,res)=>{
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

    const requireBody = zod.object({
        title : zod.string().min(3),
        description:zod.string().min(10),
        imageUrl:zod.string()          ,     //check how to put image url
         price:zod.string(),                          //check price zod
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body)

    if(!parseDataWithSuccess.success) {
        return res.status(500).json({
            message : " there is some issue in the format part ",
            error : parseDataWithSuccess.error
        })
    }
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
  const requireBody = zod.object({
    title:zod.string().min(3).optional(),
    description:zod.string().min(10).optional(),
    imageUrl:zod.string().optional(),
    price:zod.string().optional(),
    courseId:zod.string().min(5)
  })
  const parseDataWithSuccess = requireBody.safeParse(req.body)

  if(!parseDataWithSuccess.success){
    res.status(500).json({
        message:"there is some format error in your data",
        error:parseDataWithSuccess.error
    })
  } 
    const {title,description , imageUrl , price , courseId} = req.body;
// Attempt to find the course in the database using the provided courseId and adminId
    const course = await courseModel.findOne({
        _id: courseId, // Match the course by ID
        creatorId: adminId, // Ensure the admin is the creator
    });

    // If the course is not found, respond with an error message
    if (!course) {
        return res.status(404).json({
            message: "Course not found!", // Inform the client that the specified course does not exist
        });
    }
    //todo : creating a web3 saas in 6 hours
    await courseModel.updateOne(
      {
        _id: courseId,         // course jisko update karna hai
        creatorId: adminId     // ensure wahi admin update kar raha hai
    },{
        title: title || course.title, // Update title if provided, otherwise keep the existing title
        description: description || course.description, // Update description if provided, otherwise keep the existing description
        imageUrl: imageUrl || course.imageUrl, // Update imageUrl if provided, otherwise keep the existing imageUrl
        price: price || course.price, // Update price if provided, otherwise keep the existing price
    })
    // console.log("Received courseId:", courseId);
    res.status(200).json({
    message:"course updated",
    courseId : course._id
        })
})


//get all your course
adminRouter.get("/course/bulk",adminMiddleware, async(req,res)=>{
    const adminId = req.userId;
        const courses = await courseModel.find({
        creatorId:adminId
    })

    res.json({
    message:"your courses are ",
    courses
        })
})

// // ✅ Route: Get only admin's own courses
// adminRouter.get("/ownCourses", adminMiddleware, async (req, res) => {
//   try {
//     const adminId = req.userId; // Middleware se milta hai
//     console.log("🔍 Admin ID:", adminId);

//     const courses = await courseModel.find({ creatorId: adminId });

//     if (courses.length === 0) {
//       return res.json({ message: "Aapne abhi tak koi course create nahi kiya." });
//     }

//     res.json({ yourCourses: courses });
//   } catch (err) {
//     console.error("❌ Error fetching admin courses:", err);
//     res.status(500).json({ message: "Server error while fetching courses" });
//   }
// });

module.exports = {
    adminRouter:adminRouter
}
const {Router} = require ("express") // imported router
const courceRouter = Router();       //created router
const { userMiddleware } = require("../middleware/user");
const {purchaseModel, courseModel}=require("../db")

courceRouter.post("/purchase",userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;

    // should check that user has that user has actually paid the price
await  purchaseModel.create({
    userId,
    courseId
    })

res.json({
    message:"you have successfully bought the course"
    })
})

// see all the cources we provide
courceRouter.get("/preview",async (req,res)=>{
const courses  = await courseModel.find({})

res.json({
courses
    })
}) 


module.exports= {                      //export the router
    courceRouter:courceRouter
}

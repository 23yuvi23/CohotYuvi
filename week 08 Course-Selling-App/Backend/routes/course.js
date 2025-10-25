const {Router} = require ("express") // imported router
const courceRouter = Router();       //created router

    courceRouter.post("/purchase",(req,res)=>{
    res.json({
    message:"purchase endpoint"
        })
})

    courceRouter.get("/preview",(req,res)=>{
    res.json({
    message:"All Courses endpoint"
        })
}) 


module.exports= {                      //export the router
    courceRouter:courceRouter
}

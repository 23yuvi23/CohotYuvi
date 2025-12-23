const { Router } = require ("express")
const adminRouter = Router();
const {adminModel} = require ("../db")       //imorting database adminModel in admin file

// asdminRouter.use(adminMiddleware)
adminRouter.post('/signup', (req, res) => {
  res.json({
    message:"signup endpoint"
  })
})

adminRouter.post('/signin', (req, res) => {
  res.json({
    message:"signin endpoint"
  })
})
//create a course
adminRouter.post('/course', (req, res) => {
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
const express = require("express")
const app = express();

//importing
const {userRouter} = require("./routes/user")
const {courceRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

//structure
app.use("/user",userRouter)
app.use("/course",courceRouter)
app.use("/admin",adminRouter)
app.listen(3000)
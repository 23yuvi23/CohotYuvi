const express = require("express")
const app = express();

//importing
const {userRouter} = require("./routes/user")
const {courceRouter} = require("./routes/course")

//structure
app.use("/user",userRouter)
app.use("/course",courceRouter)
app.listen(3000)
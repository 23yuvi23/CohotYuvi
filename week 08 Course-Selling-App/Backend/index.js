require("dotenv").config();
const express = require("express")
const app = express();
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose")

//importing
const {userRouter} = require("./routes/user")
const {courceRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

//structure
app.use("/user",userRouter)
app.use("/course",courceRouter)
app.use("/admin",adminRouter)


async function main(){
    await mongoose.connect(MONGO_URI)
    app.listen(3000)
    console.log("listening on port 3000")
}

main()
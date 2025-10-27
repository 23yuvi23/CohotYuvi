require("dotenv").config();
const express = require("express")
const app = express();
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json());

const mongoose = require("mongoose")

//importing
const {userRouter} = require("./routes/user")
const {courceRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

//structure
app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courceRouter)
app.use("/api/v1/admin",adminRouter)


async function main(){
    await mongoose.connect(MONGO_URI)
    app.listen(3000)
    console.log("listening on port 3000")
}

main()
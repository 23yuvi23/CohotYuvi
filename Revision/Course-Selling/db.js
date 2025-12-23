require ("dotenv").config();
const mongoose = require("mongoose");
console.log("Mongo URI from env:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("Mongo error ❌", err));

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema ({
    email:{type : String , unique: true },
    password: String,
    firstName : String,
    lastName : String
});
const adminSchema = new Schema ({
    email:{type : String , unique: true },
    password: String,
    firstName : String,
    lastName : String
});
const courseSchema = new Schema ({
    title : String,
    description: String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});
const purchaseSchema = new Schema ({
    userId:   ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("users",userSchema)
const adminModel = mongoose.model("admins",adminSchema)
const courseModel = mongoose.model("courses",courseSchema)
const purchaseModel = mongoose.model("purchases",purchaseSchema)

module.exports =  {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
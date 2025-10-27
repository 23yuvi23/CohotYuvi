const mongoose = require("mongoose")
console.log("connected to mongo")

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    // _id : objectId,
    email :{type: String, unique:true},
    password :String,
    firstName : String,
    lastName : String
})

const adminSchema = new Schema({
    // _id : objectId,
    email :{type: String, unique:true},
    password :String,
    firstName : String,
    lastName : String
})
const courseSchema = new Schema({
    // _id :objectId,
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId 
})
const purchaseSchema = new Schema({
    // _id :objectId,
    courseId : ObjectId ,    //refers to cource schema
    userId : ObjectId       //refers to user schema
})


const userModel = mongoose.model("user" , userSchema)
const adminModel = mongoose.model("admin" , adminSchema)
const courseModel = mongoose.model("course" , courseSchema)
const purchaseModel = mongoose.model("purchase" , purchaseSchema)

module.exports={
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}
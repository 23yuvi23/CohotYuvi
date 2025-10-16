// this file will be used to store the database 

//import mongoose library 
const mongoose = require ("mongoose")
const schema = mongoose.Schema

//importing object id from mongoose for todo from user schema 
const ObjectId = schema.ObjectId;

//creating a User schema 
const User = new schema({
    name:String,
    email:{type:String, unique:true}, //theese are constraints that are given to a field inside {}
    password:String
})

//creating a todo schema
const Todo = new schema({
    title: String,
    done:Boolean,
    userId : ObjectId
})

//now to specify that data konse collection mai dalna hai we do this 
const UserModel = mongoose.model("users",User)       //users= name of collection jisme dalna hai  //User = name of schema (jo data dalna hai)
const TodoModel = mongoose.model("todos",Todo)   

//mongoose.model = let me insert data in "users" collection with "Users" schema

//now we have to export the variable so that they can be imported somewhere 
module.exports={
    UserModel:UserModel,
    TodoModel: TodoModel
}


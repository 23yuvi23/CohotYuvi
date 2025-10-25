const mongoose = require ("mongoose")
const schema = mongoose.Schema
const ObjectId = mongoose.ObjectId   /////////////////////////////

const user = new schema({
    name:String,
    email:{type:String, unique:true},
    password:String
}) 

const todo = new schema({
    title:String,
    done:Boolean,
    userId : ObjectId
})

const UserModel = mongoose.model("users",user)
const TodoModel = mongoose.model("todos",todo)

module.exports={
    UserModel : UserModel,
    TodoModel :TodoModel
}
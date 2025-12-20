// db.js
const mongoose = require("mongoose")

// MongoDB se connect hona
async function connectDB() {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("connected");
    } catch(error) {
        console.log("failded");
        console.log(error);
    }
}

connectDB();

// Schema ka matlab = data ka structure
const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

const todoSchema = new mongoose.Schema({
    title:String,
    conpleted:Boolean,
    userId:mongoose.Types.ObjectId   // kis user ka todo hai 
})

//Models = MongoDb ke tables
const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo",todoSchema);

module.exports = {
    User,
    Todo
};

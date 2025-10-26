- npm init -y
- vi index.js    create a file 
- node index.js
- npm install express mongoose jsonwebtoken
- code the structure of express basic 
```javascript
const express = require("express")
const app = exppress();

app.post("/user/signup",(req,res)=>{
    res.json({
        message:"Signup endpoint"
    })
})

app.post("/user/signin",(req,res)=>{
    res.json({
        message:"Signin endpoint"
    })
})

app.get("/user/purchased",(req,res)=>{
    res.json({
        message:"user purchased endpoint"
    })
})

app.post("/course/purchase",(req,res)=>{
    res.json({
        message:"purchase endpoint"
    })
})

app.get("/courses/preview",(req,res)=>{
    res.json({
        message:"All Courses endpoint"
    })
}) 

app.listen(3000)
```
- added routing in express
    basically we are structuring our application
        make a folder names routes inside that put the below files 
        add the /user routes in one seperate user.js file 
        add the / courses routes in one seperate course.js file 

        ```javascript
        function createCourseRoutes(app){
            app.post("/course/purchase",(req,res)=>{
            res.json({
            message:"purchase endpoint"
                })
        })

            app.get("/course/preview",(req,res)=>{
            res.json({
            message:"All Courses endpoint"
                })
        }) 
        }

        module.exports = {
            createCourseRoutes:createCourseRoutes
        }
        ```

        import theese in the index.js by adding this line 
        now index.js look like thei clean

        ```javascript
        const express = require("express")
        const app = exppress();

        //importing
        const {createUserRoutes} = require("./routes/user")
        const {createCourceRoutes} = require("./routes/user")

        //calling of function
        createUserRoutes(app)
        createCourceRoutes(app)

        app.listen(3000)
        ```

- more better way to route in express 
    folder and all stuff same as above what is changed is 

    ```javascript cource.js
    const {Router} = require ("express") // imported router
    const courceRouter = Router();       //created router

        courceRouter.post("/purchase",(req,res)=>{
        res.json({
        message:"purchase endpoint"
            })
    })

        courceRouter.get("/preview",(req,res)=>{
        res.json({
        message:"All Courses endpoint"
            })
    }) 


    module.exports = {                      //export the router
        courceRouter:courceRouter
    }
    ```

    ```javascript index.js
    const express = require("express")
    const app = express();

    //importing
    const {userRouter} = require("./routes/user")
    const {courceRouter} = require("./routes/user")


    //structure
    app.use("/user",userRouter)
    app.use("/course",courceRouter)



    app.listen(3000)
    ```

    and also in index.js now we can remove /course because we already added it in our `app.use("/course", courseRouter)`  so it will redirect to /cource automatically 

    and also in cource.js we not need to export function anymore we need to now use predefined function like router etc inside express predeclared

    and also we now dont use `app.post` what we now use is something like `courceRouter.post` 


- now lets make a database 
    Users                             
    _id -> objectId
    email -> String
    password -> String
    firstName -> String
    lastName -> String

    Admins
    _id -> objectId
    email -> String
    password -> String
    firstName -> String
    lastName -> String

    Course
    _id -> objectId
    title -> String
    description -> String
    price -> number
    imageUrl-> String
    creatorId -> ObjectId  (someone from the Admin table)

    Purchases
    _id -> objectId
    courseId -> objectId  (point to cource table)
    userId -> objectId    (point to user table)

    CourseContent
    notiondocs etc 

- created db.js 
a basic skeleton like this 
```javascript
const mongoose = require("mongoose")
console.log("connected to mongo")
mongoose.connect("mongodb+srv://yuvi:K84UrZYmYzxbVZ@cluster0.mezc5vr.mongodb.net/coursera-app")


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
    email :String,
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


const UserModel = mongoose.model("user" , userSchema)
const adminModel = mongoose.model("admin" , adminSchema)
const courseModel = mongoose.model("course" , courseSchema)
const purchaseModel = mongoose.model("purchase" , purchaseSchema)

module.exports={
    UserModel:UserModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}
```

- use .env to keep your enviroment variables safe like mongo db connection url 
    - npm install dotenv
    - in the .env file 
      ```env
      MONGO_URI=connection string here   without anny space or "" . 
      JWT_SECRET=Abcdefg
      ```
    - ⚠️ Don’t use quotes " " in .env — just plain text.
    - import in index.js `require("dotenv").config();`
    - in index.js call it like this 
    ```js
    async function main(){
    await mongoose.connect(MONGO_URI)
    app.listen(3000)
    console.log("listening on port 3000")
    }
    ```
    - Hide .env from GitHub put .env inside gitignore
    
    - now we create a middleware for user and admin auth  
    cmd+shift+l  -> in vs code will select all the related text 
    when u have node js backend we use  auth with google -> passport.js
    when we have nextjs backend we user auth with google -> nextauth.js

from 32 Title » 8 2 Backend Of Course Selling App Part 2


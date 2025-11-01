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

 -  now i will wrote signup and signin logic in admin.js
    installing library required  'bcrypt zod jsonwebtoken'

    i can also write in my  package.json like this 
    after 

```    
    "main":index.js,
    "scripts":{
        "start": "node index.js",
        "dev" : "nodemon index.js"
      }

```
so what it will do is now i can simply run my code by writing `npm run start`  will run my code now and if i run `npm run dev` it will run my code with nodemon if nodemon is installed

///////////////mistakes i had in my project
- working on sign in endpoint and getting some error one of the error was solved by replacing` .find with findOne`
- another mistake i was doing is in this field as shown below i was not inserting DOT `.` after `user`
```
if(user){
       const token =  jwt.sign({
            id:user._id             // here user._id
        },JWT_USER_PASSWORD);
}
```
- added bcrypt library for hashed password   `bcrypt.hash(myPlaintextPassword, saltRounds)`  
- in the /signin route used this to check the bcrypt password    `const passwordMatch = await bcrypt.compare(password , user.password)`
- finally completed signup and signin route with hashed password using `bcrypt`


- now added /signup and / signin logic in `admin.js`
  - changes i made in this route is added adminModel instead of userModel and added async before the function 
  - in /signin endpoint also changed name from user to admin also added `email :{type: String, unique:true},`  so that entry remain unique

- now i will srite down the middleware logic 
  - created a seperate folder called middleware and 2 files in it user.js and admin.js
  
- createad a config.js where all the password stuff is saved like seceret key
- installed dotenv npm package for `.env` file
- moved seceret key to .env file and imported that to `config.js`  like this 
`const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD`

  - then completed the middleware logic 
  ```javascript
    const jwt = require("jsonwebtoken")
    const { JWT_USER_PASSWORD } = require ("../config")  //imported 

    function userMiddleware (req, res, next) {
        const token = req.headers.token
        const decoded =  jwt.verify(token, JWT_USER_PASSWORD)  //jwt.verify

        if(decoded){
            req.userID = decoded.id;
            next()
        }else{
            res.status(403).json({
                message : "you are not signed in"
            })
        }
    }

    module.exports = {
        userMiddleware:userMiddleware
    }
    
  ```
 - then added this to the `admin.js` 
 - the bad thing in this is we are taking imageURL from the user so for uploading actual image 
 - TODO : watch creating a web3 saas in 6 hours  - Harkirat video over youtube 

- now in admin.js   working on creation and update of cource part 

in update cource we are using .updateOne   and it takes  filter,update,options so we define accordingly
    from 1:13:05   cource update part  checking ki kuch galti hai ya nahi 
    so the mistake was that we were only sending the `cource id` so koi dusra creator bhi us id mai kuch bhi change kar skta tha which is not good so what we will do is we will also check the `creatorId:adminId`   so that ek creator sirf apne cource mai change kar paye kisi aur ke mai nahi
 
- after that the last one in admin which is get all your cource 
    so here i basically chnaged courceModel.find
    ```javascript
        /get all your cource
    adminRouter.get("/course/bulk",adminMiddleware, async(req,res)=>{
        const adminId = req.userId
            const cources = await courseModel.find({
            creatorId:adminId
        })

        res.json({
        message:"your cources are ",
        cources
            })
    })

    module.exports = {
        adminRouter:adminRouter
    }
    ```

    onevid courceid - 6901eee6d13cf6574a786416           yuvi@gmail.com
                      6901ef28d13cf6574a786419           mannu@gmail.com
    
    ### CourseId field nai mera bahut bheja khaya aur finally chat gpt se ye clear kia mene 
    
    ```md

        Tu finally **core concept** pe aa gaya 👑

        Bilkul **yehi hota hai**:

        ---

        ### 🔍 Jab tu course **create** karta hai:

        MongoDB khud ek `_id` generate karta hai, jaise:

        ```
        "_id": "671a12bc3de45f67890abcd1"
        ```

        aur tu backend me likhta hai:

        ```js
        res.json({
        message: "course created",
        courseId: course._id
        });
        ```

        Matlab tu frontend ko bol raha hai:

        > “Ye raha tera course ka unique ID, ise save kar le — future me jab tu update ya delete karega, to mujhe ye ID dena.”

        ---

        ### 🔄 Jab tu course **update** karta hai:

        Tu frontend se bhejta hai:

        ```json
        {
        "title": "React Course Updated",
        "courseId": "671a12bc3de45f67890abcd1"
        }
        ```

        Ab backend me ye line:

        ```js
        const { title, courseId } = req.body;
        ```

        `courseId` variable ke andar wo hi value aa jaati hai.

        Aur jab tu likhta hai:

        ```js
        await courseModel.updateOne({ _id: courseId }, { title });
        ```

        to backend bolta hai:

        > “MongoDB! Jis course ka `_id` ye hai (`courseId`), uska title update kar de.”

        ---

        ### 🧠 So in short:

        | Field        | Source                                  | Purpose                                               |
        | ------------ | --------------------------------------- | ----------------------------------------------------- |
        | `_id`        | MongoDB                                 | Unique identifier of document                         |
        | `courseId`   | frontend (copied from `_id`)            | Name tu khud de raha hai, bas readable banane ke liye |
        | `course._id` | backend ke course object ka internal ID | MongoDB field                                         |

        ---

        💬 **To haan bhai**,
        basically humne `courseId` naam ka variable banaya hai jo MongoDB ke `_id` ke equal hai.
        Bas naam readability ke liye change karte hain taaki frontend/backend easily baat kar sake 👌

        Chahe to mai tujhe ek chhota visual flow schema bana du (request → backend → Mongo → response) —
        ek hi diagram me sab clear ho jaayega, bana du?

    ```

a silly mistake which i was doing  jiski wjh se mera cource update nahi hora tha that was 
while sending info in body in postman courseId likhne ki bajaye i was writing courceId  s-c


- now i have to add zod  with help of 
https://github.com/Bharat2044/100xDevs-Cohort3-WebDev-and-Devops/blob/main/Week%2008%20-%20Course%20Selling%20App/8.2%20-%20Backend%20of%20Course%20Selling%20App%20-%20Part%202/Lecture%20Codes/Course-Selling-App/routes/admin.js

- now i used zod validation in my signup endpoint an eg of it is below 
    ```javascript
    //importing zod in the program `admin.js`
    const zod = require(zod)

    adminRouter.post("/signup",async (req,res)=>{

        const requireBody = zod.object({
        email: zod.string().email().min(5),
        password:zod.string().min(4),
        firstname:zod.string().min(3),
        lastname:zod.string().min(3)
    })
    //parse data to check weater data is valid or not 
    const parseDataWithSuccess = requireBody.safeParse(req.body)
    //output acc to the parse data weater it is success or not
    if(!parseDataWithSuccess){
        return res.status(500).send({
            message:"Incorrect Data Format !!!",
            error: parseDataWithSuccess.error
        })
    }
    })

    ```
- completed aadmin route with zod validations used zod like above some extra like `zod.optional()` and `zod.number().positive()`

---
---

- now i simply added all validations in users as well 
    then for` user purchased`  route we first need to get the `purchase route in cource ` 
    so completed `course.js`  with `purchase and preview` route 
## now the last endpoint for user is to see all of his purchases 
    so  steps in that i did

    - get the user id  
    ` const userId = req.userId;`

    - make sure you are using the userMiddleware

    - get all the purchases of the given user 
    ```javascrippt
     const purchases = await  purchaseModel.find({
     userId
     })
    ```
    - return the user his all the puchases 
    ```javascript
        res.json({
            purchases 
        })
    ```
    - full code is below 

    ```js
    userRouter.get("/purchased",userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const purchases = await  purchaseModel.find({
        userId
    })

    res.json({
        purchases 
        })
    })
    ```

- so now i am updating in user.js `purchases route` 
    i was getting id and stuff in output but to get exact course name the redable data form i will use map like this 

    ```js
     // If purchases are found, extract the courseIds from the found purchases
    const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);

    // Find all course details associated with the courseIds
    const coursesData = await courseModel.find({
        _id: { $in: purchasesCourseIds }, // Querying courses using the extracted course IDs
    });
    ```
# TODOS Future 
    - better way to do this is by references  will do it in some other time 
    - use cookies instead of JWT for auth 
    - Add a rate limiting middleware 
    - Frontend in ejs (low priority)
    - Frontend in react


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

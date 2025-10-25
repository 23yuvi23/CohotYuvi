const express = require ("express")
const app = express()
const {UserModel,TodoModel} = require("./db")
app.use(express.json())
const mongoose = require("mongoose");
const jwt = require ("jsonwebtoken");
const secret = "Abcdefg";

mongoose.connect("mongodb+srv://yuvi:K84UrZYmYzxbVZ@cluster0.mezc5vr.mongodb.net/Test01")
app.post("/signup",async(req,res)=>{

    const { name, email, password } = req.body;

    try{
    await UserModel.create({
        name:name,
        password:password,
        email:email
    })
    } catch (error){
        return res.status(404).json({
            message:"user already exist try loggin in "
        })
}
    // Send a response to the client
    res.json({
        message: "You are signed up!",
    });
})


app.post("/signin",async(req,res)=>{
const { email, password } = req.body;
try{
    const user = await UserModel.findOne({
    email:email,
    password:password
})
    console.log(user);

    if(!user){
         res.status(500).json({
            message:"email or pass is incorrect try again !!!"
        })
    }

        // user exists → generate JWT
        const token = jwt.sign({
            id: user._id.toString()
        },secret)

        res.json({
            token:token,
            message:"Logged in successful"
        })
        
    }

 catch(error){
        res.status(500).json({
            message:"Something went wrong", error :error.message
        })
    }
})  

app.post("/todo"  , auth, async(req,res)=>{
    const userId = req.userId;
    
    // Get the title, and done from the request body
    const { title, done } = req.body;
    try{
    // Create a new todo using the TodoModel.create() method
    const newTodo =  await TodoModel.create({
        userId,
        title,
        done,
    });
           // Send a response to the client
    res.json({
        message: "Todo created",
        todo:newTodo
    });

    } catch (error){
        res.status(500).json({
            message :"something went wrong",
            error:error.message
        })
    }
})



app.get("/todos" ,auth,async(req,res)=>{
        const userId = req.userId;

        try{
          // Find all the todos with the given userId
            const todos = await TodoModel.find({
                userId,
            });

    res.json({
        userId:userId,
        todos:todos
    })

        } catch(error){
    // Send the todos to the client
    res.status(500).json({
            message: "Something went wrong",
            error: error.message
    });
        }
})


function auth (req,res,next){
    const token = req.headers.token  //token fetch from header 

    const decodedData = jwt.verify(token,secret)  //verify that is the token correct

    if(decodedData){
        req.userId = decodedData.id;
        next()
    } else {
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
}
app.listen(3000)
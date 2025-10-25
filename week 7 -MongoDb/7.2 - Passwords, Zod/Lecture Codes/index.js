const bcrypt = require("bcrypt");   // import bcrypy library
const express = require ("express")
const app = express()
const {UserModel,TodoModel} = require("./db")
app.use(express.json())
const mongoose = require("mongoose");
const jwt = require ("jsonwebtoken");
const secret = "Abcdefg";
const z = require ("zod")

mongoose.connect("mongodb+srv://yuvi:K84UrZYmYzxbVZ@cluster0.mezc5vr.mongodb.net/Test01")
app.post("/signup",async(req,res)=>{

    //defining a zod schema
    const requiredBody = z.object({
        email : z.string().min(3).max(100).email(),
        name: z.string().min(3).max(50),
        password : z.string().min(3).max(20)
    })
    //parsing data 
    // const parsedData = requiredBody.parse(req.body)
    //or
    const parsedDataWithSuccess = requiredBody.safeParse(req.body)

    if(!parsedDataWithSuccess) {
        res.json({
            message:"incorrect format",
            error: parsedDataWithSuccess.error   // this will return what actucally the error is
        })
        return
    }

    const { name, email, password } = req.body;
    //declaration
    const hashedPassword = await bcrypt.hash(password, 5)  // 5 is salt rounds 

    try{
    await UserModel.create({
        name:name,
        password:hashedPassword,  //////////////////////(password+salt)
                                  //////////////// store salt in db
        email:email
    })
        res.json({ message: "You are signed up!", });

    } catch (error){
        return res.status(404).json({
            message:"user already exist try loggin in "
        })
}
    // Send a response to the client

})

app.post("/signin",async(req,res)=>{
const { email, password } = req.body;
try{
    const user = await UserModel.findOne({
    email:email,
    
})
if(!user){
    res.status(403).json({
        message: "user does not exist in our database"
    })
    return
}

// console.log(user);
  const passwordMatch =  await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        return res.status(500).json({
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

function auth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedData = jwt.verify(token, secret);
    req.userId = decodedData.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}


app.listen(3000)
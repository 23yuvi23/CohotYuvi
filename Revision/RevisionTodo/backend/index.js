require("dotenv").config(); // .env ko read karega 

const express = require("express");
const app = express();

//body read karne ke liye 
app.use(express.json());

//routes import
app.use("/auth",require("./routes/auth"));
app.use("/todo",require("./routes/todo"));

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});


// require("./db");

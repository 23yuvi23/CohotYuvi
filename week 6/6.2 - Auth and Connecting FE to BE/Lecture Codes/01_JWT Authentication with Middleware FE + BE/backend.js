/*
Assignment #1 - Creating an auth middleware

Goal: Create a middleware called `auth` that verifies if a user is logged in
and ends the request early if the user isn’t logged in.
*/

const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()
const JWT_SECRET = "i am secret" // secret key for signing tokens

app.use(express.json())
const users = []

// creating a logger middleware
function logger(req, res, next) {
    console.log(req.method + " request came") // ✅ added space for clean output
    next() // goes to next middleware or route
}


//----------------Returning HTML with backend ----------
app.get("/",function(req,res){
    //__dirname  stores current directory
    res.sendFile(__dirname + "/public/frontend.html")
})


// -------------- SIGNUP ROUTE --------------
app.post("/signup", logger, (req, res) => {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username: username,
        password: password
    })

    res.send({
        message: "User signed up successfully", // ✅ grammar fix
        users: users
    })
})

// -------------- SIGNIN ROUTE --------------
app.post("/signin", logger, (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // Check if user exists in the array
    const verifyUsers = users.find(function (u) {
        if (u.username == username && u.password == password) {
            return true
        } else {
            return false
        }
    })

    // If match found, create JWT token
    if (verifyUsers) {
        const token = jwt.sign({ username: username }, JWT_SECRET)

        res.send({
            message: "Token generated successfully",
            username: username,
            token: token
        })
    } else {
        res.status(404).send({
            message: "Username or password mismatch"
        })
    }
})

// -------------- AUTH MIDDLEWARE --------------
function auth(req, res, next) {
    const token = req.headers.token // token sent from frontend or postman header

    // ✅ agar token missing hai to request ko yahi end kar dena
    if (!token) {
        return res.json({
            message: "You are not logged in"
        })
    }

    // decode JWT (verify karta hai aur token ke andar se data nikalta hai)
    const decode = jwt.verify(token, JWT_SECRET)
    const decodedUsername = decode.username

    // agar username mil gaya to req me store karlo
    if (decodedUsername) {
        req.username = decodedUsername // ✅ yahan se hum niche use karte hain
        next() // move to next route (jaise /me)
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

// -------------- PROTECTED ROUTE (/me) --------------
app.get("/me", logger, auth, (req, res) => {

    // ✅ yahan hum use kar rahe hain wo username jo auth() ne pass kiya tha
    const founduser = users.find(function (u) {
        if (u.username == req.username) { // using req.username (passed from auth)
            return true
        } else {
            return false
        }
    })

    // If found, show user data
    if (founduser) {
        res.json({
            username: founduser.username,
            password: founduser.password
        })
    } else {
        res.status(404).send({
            message: "Token Mismatch"
        })
    }

})

app.listen(3000, () => {
    console.log("Server running on port 3000 🚀")
})

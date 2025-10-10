// Assignment #1 - Write a function that takes in a username and password and returns a JWT 
// token with the username encoded inside a object. Should return null if the username is not a valid email 
// or if the password is less than 6 characters. Try using the zod library here

const jwt = require("jsonwebtoken")
const jwtPassword = "sercet"
const zod = require("zod")

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt (username,password) {

    const usernameResponse = emailSchema.safeParse(username);
    const passwordRespose = passwordSchema.safeParse(password);

    if(!usernameResponse.success || !passwordRespose.success){
        return null
    }


    const signature = jwt.sign({
        username
    },jwtPassword)

    return signature
}
// const ans = signJwt("harekas" , "asasad")  //numm bec email format wrong
 const ans = signJwt("harekas@gmail.com" , "asasad")  

console.log(ans);

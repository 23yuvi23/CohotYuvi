const jwt = require("jsonwebtoken");

function auth(req,res,next){
    const token = req.headers.token          //frontend se aayega 


if(!token){
    return res.status(401).json({message: "Token missing"});
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;        //future use
    next();  // route continue karo 

} catch {
    res.status(403).json({message:"Invalid token"});
}
}

module.exports = auth;
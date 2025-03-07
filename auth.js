const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function userAuth(req , res , next){

    const token = req.headers.token;
    const decodedData = jwt.verify(token , process.env.JWT_SECRET);

    if(decodedData){
        next();
    }
}

function adminAuth(req , res , next){

    const token = req.headers.token;
    const decodedData = jwt.verify(token , process.env.JWT_SECRET);

    if(decodedData){
        next();
    }
}

module.exports ={
    userAuth ,
    adminAuth
}


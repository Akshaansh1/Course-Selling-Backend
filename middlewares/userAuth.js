const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function userAuth(req , res , next){

    const token = req.headers.token;
    const decodedData = jwt.verify(token , process.env.JWT_USER_SECRET);

    if(decodedData){
        req.userId = decodedData.id
        res.json({
            msg : "Good to go"
        })
        next();
    }

    else{
        res.status(403).send("Bad Auth")
    }
}

module.exports = {
    userAuth : userAuth
}
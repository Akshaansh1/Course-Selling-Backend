const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function adminAuth(req , res , next){

    const token = req.headers.token;
    const decodedData = jwt.verify(token , process.env.JWT_ADMIN_SECRET);

    if(decodedData){
        req.userId = decodedData.id;
        next();
    }

    else{
        res.status(403).send("Bad Auth")
    }
}

module.exports = {
    adminAuth : adminAuth
}
const {Router}  = require("express");
const { userModel } = require("../db");
const userRoutes = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoutes.post('/signup' , async (req , res) => {
const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const hashedPassword = await bcrypt.hash(password , 10);

    await userModel.create({
        email : email,
        password : hashedPassword,
        firstname : firstname,
        lastname : lastname
    });

    res.json({
        msg : "You have Signed Up"
    });
})

userRoutes.post('/signin' , async (req , res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email : email
    });

    if(!user){
        res.json({
            msg : "User Not Found"
        });
    }

    const hashed = await bcrypt.compare(password , user.password);

    if(hashed){
        const token = jwt.sign({
            id : user._id.toString()
        } , process.env.JWT_USER_SECRET);

        res.json({
            token : token
        });
    }

    else{
        res.status(403).send("Error");
    }
})


userRoutes.get('/purchases' , (req , res) => {

})

module.exports = {
    userRoutes : userRoutes
}
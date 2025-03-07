const { Router }  = require("express");
const AdminRoutes = Router();
const { adminModel } = require('../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

AdminRoutes.post('/signup' , async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const hashedPassword = await bcrypt.hash(password , 10);

    await adminModel.create({
        email : email,
        password : hashedPassword,
        firstname : firstname,
        lastname : lastname
    });

    res.json({
        msg : "You have Signed Up"
    });
});

AdminRoutes.post('/signin' , async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await adminModel.findOne({
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
        } , process.env.JWT_SECRET);

        res.json({
            token : token
        });
    }

    else{
        res.status(403).send("Error");
    }

})
AdminRoutes.post('/' , (req,res) => {

})

AdminRoutes.put('/' , (req,res) => {

})

AdminRoutes.get('/course/bulk' , (req,res) => {

})

module.exports = {
    AdminRoutes : AdminRoutes
}
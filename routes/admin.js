const { Router }  = require("express");
const AdminRoutes = Router();
const { adminModel, courseModel } = require('../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const {adminAuth} = require("../middlewares/adminAuth");

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
        } , process.env.JWT_ADMIN_SECRET);

        res.json({
            token : token
        });
    }

    else{
        res.status(403).send("Error");
    }

});

AdminRoutes.post('/course' , adminAuth , async (req,res) => {
    const adminId = req.userId;
    const {title , description , imageURL , price} = req.body;

    const course = await courseModel.create({
        title : title,
        description : description,
        imageURL : imageURL,
        price : price,
        creatorID : adminId
    })

    res.json({
        msg : "Course Created",
        courseId : course._id
    });

})

AdminRoutes.put('/course' , adminAuth , async (req,res) => {
    const adminId = req.userId;
    const {title , description , imageURL , price , courseId} = req.body;

    const course = await courseModel.updateOne({
        _id : courseId,
        creatorID : adminId
    } , {
        title : title ,
        description : description,
        imageURL : imageURL,
        price : price
    } , );

    res.json({
        msg : "Course Updated",
        courseId : course._id
    })
})

AdminRoutes.get('/course/bulk' , adminAuth , async (req,res) => {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorID : adminId
    });

    res.json({
        courses
    })
})

module.exports = {
    AdminRoutes : AdminRoutes
}
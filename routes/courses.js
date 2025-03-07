const { Router } = require("express");
const courseRoutes = Router();
const {userAuth} = require("../middlewares/userAuth");
const { purchaseModel } = require("../db");

courseRoutes.post('/purchase', userAuth , async(req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        msg : "Course Purchased Successfully"
    });
})

courseRoutes.get('/preview', async (req, res) => {

    const courses  = await courseModel.find({}); 
    res.json({
        courses
    })
})

module.exports = {
    courseRoutes: courseRoutes
};
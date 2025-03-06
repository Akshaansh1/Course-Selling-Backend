const { Router } = require("express");
const courseRoutes = Router();

courseRoutes.post('/purchase', (req, res) => {
    
})

courseRoutes.get('/preview', (req, res) => {
    res.json({
        msg : "Course Preview Endpoint"
    })
})

module.exports = {
    courseRoutes: courseRoutes
};
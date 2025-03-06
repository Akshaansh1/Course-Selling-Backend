const {Router}  = require("express");
const userRoutes = Router();

userRoutes.post('/signin' , (req , res) => {

})

userRoutes.post('/signup' , (req , res) => {

})

userRoutes.get('/courses' , (req , res) => {

})

module.exports = {
    userRoutes : userRoutes
}
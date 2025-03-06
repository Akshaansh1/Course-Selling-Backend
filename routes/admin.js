const { Router } = require("express");
const AdminRoutes = Router();
const {} = require('../db');

AdminRoutes.post('/signin' , (req,res) => {

})

AdminRoutes.post('/signup' , (req,res) => {

})

AdminRoutes.post('/course' , (req,res) => {

})

AdminRoutes.put('/course' , (req,res) => {

})

AdminRoutes.get('/course/bulk' , (req,res) => {

})

module.exports = {
    AdminRoutes : AdminRoutes
}
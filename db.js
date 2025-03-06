const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.ObjectId;

const userSchema = Schema({
    email : {type : String , unique : true},
    password : String,
    firstname : String,
    lastname : String
});

const adminSchema = Schema({
    email : {type : String , unique : true},
    password : String,
    firstname : String,
    lastname : String
});

const courseSchema = Schema({
    title : String,
    description : String,
    price : Number,
    imageURL : String,
    creatorID : ObjectId
});

const purchaseSchema = Schema({
    courseId : ObjectId,
    userId : ObjectId
});

const userModel = model("user" , userSchema);
const adminModel = model("admin" , adminSchema);
const courseModel = model("course" , courseSchema);
const purchaseModel = model("purchase" , purchaseSchema);

module.exports = {
    userModel, adminModel , courseModel , purchaseModel
};



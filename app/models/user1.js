const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    sname: String,
    username: String,
    password: String,
    div: String,
    age: Number,
    rollno: Number
});
const userModel = mongoose.model("fullstack", userSchema, "fullstack");
module.exports = userModel;
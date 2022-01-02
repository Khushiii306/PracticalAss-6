require("dotenv").config();
const express = require('express');
const port = 5000;
const router = express.Router();
router.use(express.json());
const userModel = require("../models/user1");

const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("Mongo db connected!!"));

router.get('/', (req, res) => res.send("Student's Information!!"));

//Display User
router.get('/list', async(req, res) => {
    const userList = await userModel.find({}, { username: true });

    if (userList.length === 0) {
        return res.json({ data: "no student in Fullstack!!" });
    }
    return res.json({ data: userList });
});

//Registration
router.post("/registration", (req, res) => {
    const { newUser } = req.body;
    userModel.create(newUser);
    return res.json({ data: "Registration Successfully!!" });
});

//login
router.post("/login", async(req, res) => {
    const uname = req.body.username;
    const pass = req.body.password;
    const user = await userModel.findOne({ username: uname, password: pass });
    if (user) {
        return res.json({ data: "Login Successfully!!" });
    }
    return res.json({ data: "user not found!!" });
})

//update 
router.put("/user/updatepassword/:uname", async(req, res) => {
    const uname = req.params.uname;
    const pass = req.body.password;
    const updateUser = await userModel.findOneAndUpdate({ username: uname }, { password: pass }, { new: true });
    return res.json({ data: "Password Updated Successfully!!" });
});

//delete
router.delete("/user/deleteUser/:uname", async(req, res) => {
    const uname = req.params.uname;
    const deleteUser = await userModel.findOneAndDelete({ username: uname });
    return res.json({ data: "User Deleted!!" });
});
module.exports = router;
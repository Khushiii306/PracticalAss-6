require("dotenv").config();
const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("Mongo db connected!!"));

app.get('/', (req, res) => res.send("Hello World!!"));

const studRoute = require("./routes/stud");
app.use("/student", studRoute);

app.listen(port, () => console.log(`server running on port 5000!!`));
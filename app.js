//jshint esversion:6https://account.mongodb.com/account/login?_ga=2.75797206.251272254.1695667157-1935144575.1693796998
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const md5 = require("md5");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true 
}));

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

if (mongoose.connection.readyState === 1) {
    console.log('Mongoose is connected');
  } else {
    console.log('Mongoose is not connected');
}

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema)

app.get("/", function(req, res) {
    res.render("home")
})

app.get("/login", function(req, res) {
    res.render("login")
})

app.get("/register", function(req, res) {
    res.render("register")
})


app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    newUser.save()
    .then(() => {
        res.render("secrets");
    })
    .catch((err) => {
        console.log(err);
    }
    )
});



app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email: username})
    .then((foundUser) => {
        if (foundUser) {
            if (foundUser.password === password) {
                res.render("secrets")
            }
        }
    })
    .catch((err) => {
        console.log(err);
    })
})


app.listen(3000, function() {
    console.log("Server staarted on port 3000");
})


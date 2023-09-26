//jshint esversion:6https://account.mongodb.com/account/login?_ga=2.75797206.251272254.1695667157-1935144575.1693796998
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true 
}));

//twECKETBx1gD7h5Q

mongoose.connect("mongodb+srv://shaheershakir22:twECKETBx1gD7h5Q@secret.jje0jfd.mongodb.net/?retryWrites=true&w=majority")

if (mongoose.connection.readyState === 1) {
    console.log('Mongoose is connected');
  } else {
    console.log('Mongoose is not connected');
}

const userSchema = {
    email: String,
    password: String
}

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
        password: req.body.password
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
    const password = req.body.password;

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


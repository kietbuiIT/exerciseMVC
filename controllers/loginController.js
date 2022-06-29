const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const passport = require("passport");


const registerView = (req, res) => {
    res.render("register", {});
};

const registerUser = (req, res) => {

    const {name, email, password, confirm, location} = req.body; 

    if( !name || !email || !password || !confirm){
        console.log("Nhập thiếu");
        res.status(400).json("Mời bạn nhập đầy đủ thông tin");
    }

    if(password !== confirm){
        console.log("password không trùng nhau");
        res.status(400).json("password must match")
    }else{
        User.findOne({email: email}).then(user => {
            if(user){
                console.log("User exists");
                res.status(400).json("User exists");
            }else{
                const newUser = new User({
                    name, 
                    email,
                    location,
                    password,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                          .save()
                          .then(res.status(200).render('login'))
                          .catch((err) => console.log(err));
                      })
                })
            }
        })
    }


    console.log(name, email, password, confirm, location);

}

const loginView = (req, res) => {
    res.render("login", { 

    })
}

const loginUser = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        console.log("Please fill in all the fields")
        res.render("login", {
            email, password,
        })
    }else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res)
    }
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
}
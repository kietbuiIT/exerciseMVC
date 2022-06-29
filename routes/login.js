
const express = require('express');
const { registerView, loginView, registerUser, loginUser} = require('../controllers/loginController');
const {dashboardView} = require("../controllers/dashboard");
const {protectRoute} = require("../auth/protect");
const router = express.Router();


//get
router.get('/login', loginView);
router.get('/register', registerView);

//Dashboard
router.get('/dashboard',protectRoute ,dashboardView)

//Posts
router.post('/register', registerUser);
router.post('/login', loginUser)


module.exports = router;

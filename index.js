const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const { loginCheck } = require('./auth/passport')
const session = require('express-session');
const passport = require('passport')
loginCheck(passport)


dotenv.config();

const database = process.env.MONGO_URI;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
    }
))

app.use(passport.initialize())
app.use(passport.session()
)



mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('mongodb connection successfully'))
.catch(err => console.log(err));


const PORT = process.env.PORT || 8080;


app.set('view engine', 'ejs');

app.use('/', require('./routes/login'))

app.listen(PORT, console.log("Server listening on port " + PORT));


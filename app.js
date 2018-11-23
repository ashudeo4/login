const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

mongoose.connect('mongodb://localhost:27017/login', {
        useNewUrlParser: true
    }).then(() => {
        console.log("Mongodb connected")
    })
    .catch(err => {
        console.log(err);

    });

var index = require("./routes/index");
var user = require("./routes/user");


var port = 3000;
var app = express();

app.use(session({
    secret: 'thesecret',
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "public")));

app.use('/', index);
// app.use('/user', user);




app.listen(port, () => {
    console.log(`Server has started on ${port}`);
});
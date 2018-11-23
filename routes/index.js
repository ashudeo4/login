var express = require('express');
var router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require('../models/user');
var bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

passport.use(new LocalStrategy(function(username, password, done) {
    let pass = password;
    console.log(pass);

    User.findOne({
        username: username
    }, (err, user) => {
        console.log(user)
        if (err) throw err;
        if (!user) {
            return done(null, false, {

            });
        }
        let hash = user.password;
        console.log(hash);

        bcrypt.compare(pass, hash, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                console.log("matched")
                return done(null, user);
            } else {
                console.log("non")
                return done(null, false, {

                });
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), function(req, res) {});

router.get('/signup', (req, res) => {
    res.render('signup');
});



router.post('/signup', (req, res) => {
    newUser = {
        username: req.body.username,
        password: req.body.password
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            new User(newUser).save().then(() => {
                res.redirect('/');
            }).catch(err => {
                console.log(err);
                return;

            });
        });
    });

});


module.exports = router;
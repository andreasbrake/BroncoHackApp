#!/bin/env node
var ip_addr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var port    = process.env.OPENSHIFT_NODEJS_PORT || '3000'

// Module imports
var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var multer = require('multer')
var passport = require('passport')
var bcrypt = require('bcrypt')
var LocalStrategy = require('passport-local').Strategy

// Routing imports
var map = require('./routes/map.js')
var report = require('./routes/report.js')
var page = require('./routes/page.js')
var createUser = require('./routes/createUser.js')

var database = require('./mongoDB.js')
var app = express()

app.engine('html', ejs.renderFile)
app.use(express.static('static'))
app.use(bodyParser())
app.use(bodyParser.json({type:'application/vnd.api+json'}))
app.use(multer({ dest: './static/img/user_uploads/'}))
app.use(express.cookieParser())
app.use(express.session({ secret: 'keyboard cat' }))
app.use(passport.initialize())
app.use(passport.session())

// Request Routing
app.get('/',page.get)
app.post('/map',auth,map.post)
app.post('/report', report.post)
app.get('/login',function(req,res){
    res.render('login.html')
})
app.post('/login', passport.authenticate('local', 
    {successRedirect: '/',
    failureRedirect: '/'}))
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})
app.get('/createUser', function(req,res){
    res.render('createUser.html')
})
app.post('/createUser', createUser.create)

passport.use(new LocalStrategy(
        function(username, password, done){
            database.getUser(username,function(user){
                if(user == null) return done(null, false);
                console.log(user)
                bcrypt.hash(password, user.salt, function(err, comp_hash){
                    if (err) return done(null, false);
                    return done(null, user);
                })
            })
        }))

passport.serializeUser(function(user, done) {
    done(null, user.name);
});

passport.deserializeUser(function(name, done) {
    database.getUser(name, function(user) {
        done(null, user)
    });
});

function auth(req, res, next){
    if(req.user){
        console.log('accepted')
        next()
    }
    else{
        console.log('denied')
        res.redirect('/login')
    }
}

// RUN SERVER!!!
app.listen(port, ip_addr)

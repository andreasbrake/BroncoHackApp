#!/bin/env node
var ip_addr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var port    = process.env.OPENSHIFT_NODEJS_PORT || '3000'

// Module imports
var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')

// Routing imports
var map = require('./routes/map.js')
var report = require('./routes/report.js')
var page = require('./routes/page.js')

var database = require('./mongoDB.js')
var app = express()

app.engine('html', ejs.renderFile)
app.use(express.static('static'))
app.use(bodyParser())
app.use(bodyParser.json({type:'application/vnd.api+json'}))

// Request Routing
app.get('/',page.get)
app.post('/map',map.post)
app.post('/report',report.post)

// RUN SERVER!!!
app.listen(port, ip_addr)

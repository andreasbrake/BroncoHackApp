#!/bin/env node
var ip_addr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '3000'

var express = require('express');
var ejs = require('ejs');

/* Initialize express */
var app = express();

app.engine('html', ejs.renderFile);
app.use(express.static('static'));

app.get('/',function(req, res){
	return res.render('home.html')
})

/* Run on port 3000 */
app.listen(port, ip_addr);

var mongoose = require('mongoose')
var options = {
	user: 'admin',
	pass: 'r9Ptnm4zL6a3'
}
var ip_addr = process.env.OPENSHIFT_MONGODB_DB_HOST   || '127.0.0.1';
var port    = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';

if(ip_addr == '127.0.0.1'){
	var uri = ip_addr + ':' + port + '/reports'
	exports.db = mongoose.createConnection(uri)	
}
else{
	var uri = ip_addr + ':' + port + '/broncohacks'
	exports.db = mongoose.createConnection(uri, options)
}

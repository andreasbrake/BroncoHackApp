var mongoose = require('mongoose')
var options = {
	user: 'admin',
	pass: 'dwZ63dAT_1kV'
}
var ip_addr = process.env.OPENSHIFT_MONGODB_DB_HOST   || '127.0.0.1';
var port    = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';

var uri = ip_addr + ':' + port + '/reports'
exports.db = mongoose.createConnection(uri)
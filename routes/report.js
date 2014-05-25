var db = require('../mongoDB.js')

exports.post = function(req,res){
	console.log('POST report')
	db.saveReport(req.body, function(){return res.redirec('/')})
}

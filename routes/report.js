var db = require('../mongoDB.js').db
var reportList

db.on('connected', function callback(){
	reportList = db.collection('reportList')
	console.log('connected to db: ' + reportList.name);
});

exports.post = function(req,res){
	console.log('POST report')
	return res.redirect('/')
}

var db = require('../mongoDB.js')

exports.post = function(req,res){
	console.log('POST report')
	console.log(req.files)
	var report = req.body
	report.image = req.files.image.name
	db.saveReport(report, function(){return res.redirect('/')})
}
var mongoose = require('mongoose')
var db = require('../mongoDB.js').db

var reportList
var model
var reportFormat = new mongoose.Schema({
	datetime: Array,
	description: Array,
	location: Array,
	images: Array,
	reportTo: Array,
	reportType: String,
	reportCount: Number,
	status: String
})

db.on('connected', function callback(){
	reportList = db.collection('reportList')
	model = db.model('model',reportFormat, reportList.name)
	console.log('connected to db: ' + reportList.name);
});


exports.post = function(req,res){
	console.log('POST report')
	
	var params = req.body

	var report = new model({
		datetime: [Date.now()],
		description: params.description,
		location: params.location,
		images: [params.image],
		reportTo: [],
		reportType: [params.reportType],
		reportCount: 1,
		status: 'unresolved'
	})

	reportList.count({
		reportType: report.reportType,
		location: report.location,
		status: String
	},function(err, count){
		if(err) 
			return console.log('whelp')
		if(count == 0){
			console.log(report)
			//return saveReport(report))
		}
		else{
			console.log('report already exists')
			//updateCity(city)
		}
	})
}
function saveReport(report){
	reportList.save(function(err){ if(err) return console.log('whoops an error')})
	console.log('saved report')

	return res.redirect('/')
}
var mongoose = require('mongoose')
var options = {
	user: 'admin',
	pass: 'r9Ptnm4zL6a3'
}
var ip_addr = process.env.OPENSHIFT_MONGODB_DB_HOST   || '127.0.0.1';
var port    = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
var reportList = null

var model
var reportFormat = new mongoose.Schema({
	datetime: Array,
	description: Array,
	compLocation: Array,
	location: Array,
	images: Array,
	reportTo: Array,
	reportType: String,
	reportCount: Number,
	status: String
})

if(ip_addr == '127.0.0.1'){
	var uri = ip_addr + ':' + port + '/reports'
	var db = mongoose.createConnection(uri)	
}
else{
	var uri = ip_addr + ':' + port + '/broncohacks'
	var db = mongoose.createConnection(uri, options)
}

db.on('connected', function callback(){
	reportList = db.collection('reportList')
	model = db.model('model',reportFormat, reportList.name)
	console.log('connected to db: ' + reportList.name);
})

exports.getAllEntries = function(callback){
	reportList.find(function(err,data){
		if(err) return console.log('error')
		data.toArray(function(err, array){
			return callback(array)
		})
	})
}
exports.saveReport = function(params,callback){
	var location = params.location.split(',')
	var comparisonLocation = [parseInt("" + (parseFloat(location[0]) * 1000)),parseInt("" + (parseFloat(location[1]) * 1000))]
	
	console.log(comparisonLocation)

	var report = new model({
		datetime: [Date.now()],
		description: params.description,
		compLocation: comparisonLocation,
		location: [parseFloat(location[0]),parseFloat(location[1])],
		images: [params.image],
		reportTo: [],
		reportType: [params.reportType],
		reportCount: 1,
		status: 'unresolved'
	})

	reportList.count({
		reportType: report.reportType,
		compLocation: report.compLocation,
		status: report.status
	},function(err, count){
		if(err) 
			return console.log('whelp')
		if(count == 0){
			console.log(report)
			report.save(function(err){ 
				if(err) return console.log('whoops an error')

				console.log('saved report')

				callback()
			})
		}
		else{
			console.log('report already exists')
			console.log(report)
			callback()
			//updateReport(report)
		}
	})
}
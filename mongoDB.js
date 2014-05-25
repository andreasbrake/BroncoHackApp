var mongoose = require('mongoose')
var options = {
	user: 'admin',
	pass: 'r9Ptnm4zL6a3'
}
var ip_addr = process.env.OPENSHIFT_MONGODB_DB_HOST   || '127.0.0.1';
var port    = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
var reportList = null
var userList = null

var reportModel
var userModel

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
var userFormat = new mongoose.Schema({
	name: String,
	hash: String,
	salt: String,
	isAdmin: Number
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
	userList = db.collection('userList')
	reportModel = db.model('reportModel',reportFormat, reportList.name)
	userModel = db.model('userModel',userFormat, userList.name)

	console.log('connected to db: ' + reportList.name + ' and ' + userList.name);
})

exports.userExists = function(username, callback){
	userList.count({
		name: username
	},function(err, count){
		if(err) return console.log('whelp')
		if(count == 0) return callback(0)
		else return callback(1)
	})
}
exports.getUser = function(username, callback){
	console.log('getting ' + username)
	userList.findOne({name:username},function(err,data){
		if(err) return console.log('error')
		console.log(data)
		return callback(data)
	})
}
exports.setUser = function(user, callback){
	console.log('setting')
	console.log(user)
	exports.userExists(user.name,function(exists){
		if(exists == 0){
			var userFormat = new userModel({
				name: user.name,
				hash: user.hash,
				salt: user.salt,
				isAdmin: user.isAdmin
			})
			userFormat.save(function(err){ 
				if(err) return console.log(err)
				console.log('saved user')
				return callback(1)
			})
		}
		else{
			userFormat.update(
				{name:user.name},
				{
					user:user.name,
					hash:user.hash,
					satl:user.salt,
					isAdmin:user.isAdmin},
				function(err,affected){
					if(err) return console.log('error updating user')
					console.log('updated ' + affected + " users")
					return callback(1)
				})
		}
	})
}

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
	var compLocation = [parseInt("" + (parseFloat(location[0]) * 1000)),parseInt("" + (parseFloat(location[1]) * 1000))]

	var report = new reportModel({
		datetime: [Date.now()],
		description: params.description,
		compLocation: compLocation,
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
			return save(report, callback)
		}
		else{
			console.log('report already exists')
			return update(report, callback)
		}
	})
}
function save(report, callback){
	report.save(function(err){ 
		if(err) return console.log('whoops an error')

		console.log('saved report')

		return callback()
	})
}
function update(report, callback){
	reportList.find(
		{reportType:report.reportType, compLocation: report.compLocation, status: report.status},
		function(err,data){
			if(err) return console.log('error finding report')
			data.toArray(function(err,dataArray){

				var newCount = dataArray[0].reportCount + 1

				var newDescription = dataArray[0].description
				newDescription.push(report.description[0])

				var newImages = dataArray[0].images
				newImages.push(report.images[0])
				
				var newDates = dataArray[0].datetime
				newDates.push(report.datetime[0])

				reportList.update(
					{
						reportType:report.reportType, 
						compLocation: report.compLocation, 
						status: report.status},
					{
						datetime: newDates,
						description: newDescription,
						compLocation: report.compLocation,
						location: report.location,
						images: newImages,
						reportTo: report.reportTo,
						reportType: report.reportType,
						reportCount: newCount,
						status: report.status},
					function(err,affected){
						if(err) return console.log('err updating db @ mongoDB.js > update()')
						console.log('updated ' + affected + ' entries')
						return callback()
					})
			})
		})
}
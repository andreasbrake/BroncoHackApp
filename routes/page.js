var db = require('../mongoDB.js')

exports.get = function(req,res){
	console.log('GET page')
	db.getAllEntries(function(entries){
		return res.render('home.html',{entries:entries})
	})
}
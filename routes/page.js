var db = require('../mongoDB.js')

exports.get = function(req,res){
	console.log('GET page')
	db.getAllEntries(function(entries){

		var entryJSON = {entries: entries}
		var entryString = JSON.stringify(entryJSON)

		if(req.user == null){
			var username = ""
			var isAdmin = 0
		}
		else{
			var username = req.user.name
			var isAdmin = req.user.isAdmin
		}

		return res.render('home.html',{entries:entryString, user:username, permissionLevel:isAdmin})
	})
}
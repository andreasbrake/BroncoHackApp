var db = require('../mongoDB.js')

exports.get = function(req,res){
	console.log('GET page')
	db.getAllEntries(function(entries){
		console.log('gotEntries')
		var entryString = {entries: entries}

		return res.render('home.html',{entries:JSON.stringify(entryString)})
	})
}
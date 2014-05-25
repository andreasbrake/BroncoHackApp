var db = require('../mongoDB.js')

exports.get = function(req,res){
	console.log('GET page')
	db.getAllEntries(function(entries){
		console.log('gotEntries')
		var entryJSON = {entries: entries}
		var entryString = JSON.stringify(entryJSON)
		console.log('stringed entries')
		return res.render('home.html',{entries:entryString})
	})
}
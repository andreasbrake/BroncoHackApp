var db = require('../mongoDB.js')
var fileupload = require('fileupload').createFileUpload('../BRoncoHackApp/static/img')

exports.post = function(req,res){
	console.log('POST report')
	console.log(req.files)
	db.saveReport(req.body, function(){return res.redirect('/')})
}
function upload(){
	var file = req.files.file
	var title = req.files.file.originalFilename

	if(title == "" || title == " ")
		return res.redirect('/upload')
	fileupload.put(file.path, function(err,file){
		if(err) console.log('bad upload')
		addFile(file.path + file.basename, title)
	})		
}
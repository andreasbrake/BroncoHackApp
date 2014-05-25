var database = require('../mongoDB.js')

exports.post = function(req,res){
	console.log('POST map')

	var images = req.body.images
	var newStatus = req.body.newStatus
	console.log(newStatus)

	if(newStatus == 'spam'){
		database.removeEntry(images.split(','),function(){
			console.log('removed spam')
			return res.redirect('/')
		})
	}
	else{
		database.updateReportStatus(images.split(','),newStatus,function(){
			console.log('updated status')
			return res.redirect('/')
		})
	}
}

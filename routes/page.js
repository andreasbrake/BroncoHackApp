exports.get = function(req,res){
	console.log('GET page')
	return res.render('home.html',{entries:[1,2]})
}
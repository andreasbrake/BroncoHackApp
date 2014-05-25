var bcrypt = require('bcrypt')
var database = require('../mongoDB')

//TODO: add email verification

// And here we behold the miracle of life!
exports.create = function(req, res){
	var name = req.body.username
	var password = req.body.password
	var salt = password

	userExists()

	// Determine if the username already exists
	function userExists(){
		database.userExists(name, function(reply){
			console.log(reply)
			if(reply) return console.log('name already in use')
			return createUser()
		})
	}
	// If the username is available, create a user with the specified username
	function createUser(){
		bcrypt.genSalt(function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				if (err) return console.log(err)
				var user = {
					name: name,
					hash: hash,
					salt: salt,
					isAdmin: 0
				}

				database.setUser(user, function(reply) {
					console.log('set! ' +  reply)
					req.login(user, function(err){
						if (err) return console.error(err)
						res.redirect('/')
					})
				})
			})
		})
	}
}
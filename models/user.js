"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    pw = require('credential'),
    PasswordQuality = require('../bin/password-quality');

var userSchema = new Schema({	
	username: { type: String, unique: true, required: true },
	password: { 
		type: String, 
		required:true
	}
});

var User = mongoose.model('User', userSchema);

User.restCreate = function(req, res, next){
	var pwQuality = new PasswordQuality(req.body.password, req.body.username);

	if(pwQuality.hasErrs()){
		return pwQuality.sendErrs(req, res);
	}

	pw.hash(pwQuality.password, function(err, hash){
		if(err){ 
			return pwQuality.sendErrs(req, res, err.messages); 
		}

		let user = new User({
			username: pwQuality.username,
			password: hash
		})

		user.save(function(err, user){
			if(err){
				let message = err.message.match('duplicate') ? 'That email is already taken' : pwQuality.messages.push('There\s a problem creating user.')
				return pwQuality.sendErrs(req, res, message);
			}
			req.login(user, function(){
				res.redirect('/dashboard');
			})
		});
	});
}

module.exports = User;
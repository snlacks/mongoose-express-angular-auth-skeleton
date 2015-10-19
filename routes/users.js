"use strict";
const router = require('express').Router(),
    passport =require('passport'),
    User = require('../models/user');


router.get('/', function(req, res, next){
	// console.log("User: " + User);
	User.find({}, function(err, users){
		res.json(users)
	});
});

router.get('/isLoggedIn', function(req, res, next){
	if(req.isAuthenticated()){
		res.send(true)
	}
	res.send(false)
});
router.get('/self', function(req, res, next){
	if(req.isAuthenticated()){
		console.log("SUCCESS", req.user)
		res.json(req.user)
	} else {
		res.redirect('/')
	}
});

router.post('/', User.restCreate);

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/#/login',
	failureFlash: true 	
}), function(req, res){
	res.redirect('/dashboard');
});

router.get('/logout', function(req, res){
	req.logout();
 	req.session.destroy(function (err) {
  	res.redirect('/'); //Inside a callback… bulletproof!
  });
});

module.exports = router;
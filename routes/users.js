const router = require('express').Router(),
    passport =require('passport'),
    pw = require('credential'),
    User = require('../models/user');

router.get('/', function(req, res, next){
	// console.log("User: " + User);
	User.find({}, function(err, users){
		res.json(users);
	});
});

router.post('/', function(req, res, next){
	function hasErrs(m){
		if (m.length) return res.redirect('/#/login?flash=' + JSON.stringify(m));
	}

	var messages = [];

	if(req.body.password.length < 8){
		messages.push('Password must be 8 or more characters.')
	}

	var count = 0, str = req.body.password;
	if( str.match(/[A-Z]/) ) { count++; console.log(req.body.password, 'A') }
	if( str.match(/[a-z]/) ) { count++; console.log(req.body.password, 'a') }
	if( str.match(/\d/) ) { count++; console.log(req.body.password, '1') }
	if( str.match(/[!@#\$%\^&\*(){}\[\]]/) ) { count++; console.log(req.body.password, '!') }
	if(count < 3){
		messages.push('Password must have at least 3, a lowercase letter, an uppercase letter, a number, a symbol.')
	}

	if(messages.length > 0) return hasErrs(messages);

	pw.hash(req.body.password, function(err, hash){
		if(err){
				return res.redirect('/#/login?flash='+err.messages);
		}
		user = new User({
			username: req.body.username,
			password: hash
		})

		user.save(function(err, user){
			if(err){
				err.message.match('duplicate') ? messages.push('That email is already taken') : messages.push('There\s a problem creating user.')
				return hasErrs(messages);
			}
			res.json(user);
		});

	});
});

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/#/login',
	failureFlash: true 	
}), function(req, res){
	res.redirect('/dashboard');
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/')
})
// router.get('/fail', function(req, res, next){
// 	// console.log("User: " + User);
// 	res.send();
// });
// router.get('/success', function(req, res, next){
// 	// console.log("User: " + User);
// 	success=true;
// 	res.send(success);
// });
module.exports = router;
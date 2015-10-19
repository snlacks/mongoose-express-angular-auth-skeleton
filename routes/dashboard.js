const express = require('express'),
    router = express.Router(),
    passport = require('passport');


router.get('/',  function(req, res, next){
	if(req.isAuthenticated()){
		res.redirect('/#/dashboard')
	} else {
		res.redirect('/')

	}
});


module.exports = router;
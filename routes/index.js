const express = require('express'),
    router = express.Router();


router.get('/',  function(req, res, next){
	// if(!req.isAuthenticated()){
		res.render('index');
	// }
	// res.redirect('/dashboard');
});


module.exports = router;
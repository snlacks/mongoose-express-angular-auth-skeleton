var pw = require('credential'),
    User = require('../models/user'),
    passport = require('passport'),
		LocalStrategy = require('passport-local');




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    var message = { message: 'No' };
    
    if (err) { 
      return done(err); 
    }
    
    if(!user){
      return done(null, false, message);
    }

    pw.verify(user.password, password, function(err, isValid){

      if(isValid) {
        return done(null, user);
      } else {
        return done(null, false, message);
      }

    });

  });
}));

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());
};
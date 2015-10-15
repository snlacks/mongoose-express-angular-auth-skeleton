const express = require('express'),
    path = require('path'),
    // favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    passportConfig = require('./config/passport'),
    flash = require('flash'),
    users = require('./routes/users'),
    index = require('./routes/index'),
    dashboard = require('./routes/dashboard'),
    app = express();





// set up database.
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection
app.use(function(err, req, res, next){
	req.locals.db = db;
	next();
});

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(sassMiddleware({
	src: __dirname + '/scss',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed'
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash());

passportConfig(app)

// routes
app.use('/dashboard', dashboard);
app.use('/users', users);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err)
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

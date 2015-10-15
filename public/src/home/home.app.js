
var login = require('./login');	

var usHome = angular.module('usHome',['ui.router']);

usHome.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/create-account");

	$stateProvider.state("login", {
		url: "/login",
		"template": "<us-home-login></us-home-login>"
	});

	$stateProvider.state("create-account", {
		url: "/create-account",
		"template": "<us-home-create></us-home-create>"
	});


});
login(usHome);

(function (){
	var login = require('./home/login');	
	var createAccount = require('./home/create-account');	
	var skFlash = require('./flash');	

	var sk = angular.module('sk',['ui.router', 'ngCookies', 'ngAnimate']);

	sk.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/login");

		$stateProvider.state("login", {
			url: "/login",
			"template": `
				<div>
					<sk-login></sk-login>
				</div>`
		});

		$stateProvider.state("create-account", { 
			url: "/create-account",
			"template": `
				<div>
					<sk-create></sk-create>
				</div>`
		});

	});
	
	login(sk);
	createAccount(sk);
	skFlash(sk)
})()
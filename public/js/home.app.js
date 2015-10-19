(function (){
	var login = require('./home/login');	
	var createAccount = require('./home/create-account');	
	var skFlash = require('./flash');	

	var sk = angular.module('sk',['ui.router', 'ngCookies', 'ngAnimate', 'ngCookies']);

	sk.config(function($stateProvider, $urlRouterProvider) {
		var skAuthController = function($scope, $http, $cookies, $window){
			$scope.getUser = function(){
				$http.get('/users/self').then(function(res){
					if(res.data.hasOwnProperty('username')){
						$scope.self = res.data;
					} else {
						console.log('fail');
						$window.location = '/#/login';
					}
				}, function(res){
						console.log('fail');
						$window.location = '/#/login';
				})
			};
			$scope.getUser();
		};

		$urlRouterProvider.otherwise("/login");




		$stateProvider.state("login", {
			url: "/login",
			"template": `
				<div>
					<sk-flash></sk-flash>
					<sk-login></sk-login>
				</div>`,
				controller: ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){
					console.log($cookies.getAll('user'))
					$http.get('/users/isLoggedIn').then(function(res){
						if(res.data){
							$window.location = '/#/dashboard';
						}
					});;
				}]
			});

		$stateProvider.state("dashboard", {
			url: "/dashboard",
			"template": `
				<div>
					<h1><span ng-bind="self.username"></span> Logged In</h1>
					<a href="/users/logout">Log out!</a>
				</div>`,
				controller: ['$scope', '$http', '$cookies', '$window', skAuthController]
		});

		$stateProvider.state("create-account", { 
			url: "/create-account",
			"template": `
				<div>
					<sk-flash></sk-flash>
					<sk-create></sk-create>
				</div>`
		});

	}	);
	
	login(sk);
	createAccount(sk);
	skFlash(sk)
})()
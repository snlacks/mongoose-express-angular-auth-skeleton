/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function () {
		var login = __webpack_require__(1);
		var createAccount = __webpack_require__(2);
		var skFlash = __webpack_require__(4);

		var sk = angular.module('sk', ['ui.router', 'ngCookies', 'ngAnimate', 'ngCookies']);

		sk.config(function ($stateProvider, $urlRouterProvider) {
			var skAuthController = function skAuthController($scope, $http, $cookies, $window) {
				$scope.getUser = function () {
					$http.get('/users/self').then(function (res) {
						if (res.data.hasOwnProperty('username')) {
							$scope.self = res.data;
						} else {
							console.log('fail');
							$window.location = '/#/login';
						}
					}, function (res) {
						console.log('fail');
						$window.location = '/#/login';
					});
				};
				$scope.getUser();
			};

			$urlRouterProvider.otherwise("/login");

			$stateProvider.state("login", {
				url: "/login",
				"template": '\n\t\t\t\t<div>\n\t\t\t\t\t<sk-flash></sk-flash>\n\t\t\t\t\t<sk-login></sk-login>\n\t\t\t\t</div>',
				controller: ['$scope', '$http', '$cookies', '$window', function ($scope, $http, $cookies, $window) {
					console.log($cookies.getAll('user'));
					$http.get('/users/isLoggedIn').then(function (res) {
						if (res.data) {
							$window.location = '/#/dashboard';
						}
					});;
				}]
			});

			$stateProvider.state("dashboard", {
				url: "/dashboard",
				"template": '\n\t\t\t\t<div>\n\t\t\t\t\t<h1><span ng-bind="self.username"></span> Logged In</h1>\n\t\t\t\t\t<a href="/users/logout">Log out!</a>\n\t\t\t\t</div>',
				controller: ['$scope', '$http', '$cookies', '$window', skAuthController]
			});

			$stateProvider.state("create-account", {
				url: "/create-account",
				"template": '\n\t\t\t\t<div>\n\t\t\t\t\t<sk-flash></sk-flash>\n\t\t\t\t\t<sk-create></sk-create>\n\t\t\t\t</div>'
			});
		});

		login(sk);
		createAccount(sk);
		skFlash(sk);
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function login(sk) {

		sk.directive('skLogin', [function () {
			return {
				template: '\n\t\t\t\t<form ng-model="user" action="/users/login" method="POST" id="login" class="authorization">\n\t\t\t\t\t<div sk-username></div>\n\t\t\t\t\t<div sk-password></div>\n\t\t\t\t\t<div sk-login-button></div>\n\t\t\t\t\t<div sk-target></div>\n\t\t\t\t</form>'
			};
		}]);

		sk.directive('skUsername', [function () {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<label for="username">Username</label>\n\t\t\t\t\t<input type="text" ng-model="username" name="username"/>\n\t\t\t\t</div>'
			};
		}]);
		sk.directive('skTarget', [function () {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<label for="target">Go to:</label>\n\t\t\t\t\t<select  type="text" ng-model="target" name="target">\n\t\t\t\t\t\t<option value="dashboard" ng-selected="true">dashboard</option>\n\t\t\t\t\t\t<option value="other">other</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>'
			};
		}]);
		sk.directive('skPassword', [function () {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<label for="password">Password</label>\n\t\t\t\t\t<input ng-model="password" type="password" name="password"/>\n\t\t\t\t</div>'
			};
		}]);

		sk.directive('skLoginButton', [function () {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<button type="submit" id="login" name="login" value="Login">Login</button>\n\t\t\t\t\t<div>or <a ui-sref="create-account">Create Account</a></div>\n\t\t\t\t</div>'
			};
		}]);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PasswordQuality = __webpack_require__(3);

	module.exports = function login(sk) {

		sk.directive('skCreate', [function () {
			return {
				template: '\n\t\t\t\t<form name="user" action="/users" method="post" id="create" class="authorization">\n\t\t\t\t\t<div sk-create-username></div>\n\t\t\t\t\t<div sk-create-password></div>\n\t\t\t\t\t<div sk-create-password-confirm></div>\n\t\t\t\t\t<div sk-create-button></div>\n\t\t\t\t</form>',
				link: function link(scope, element, attr) {
					var form = element.find('form');
					var pwQuality = undefined;

					scope.checkPasswords = function () {

						scope.flash = [];
						if (form.hasClass('ng-dirty')) {
							if (!scope.username) {
								scope.flash.push('Please fill in a valid email as username');
							}
							if (!scope.password) {
								scope.flash.push('Please fill in password');
							} else {
								pwQuality = new PasswordQuality(scope.password);

								Array.prototype.push.apply(scope.flash, pwQuality.messages);
								if (scope.password != scope.passwordConfirm) scope.flash.push('Passwords must match');
							}
						}

						return scope.flash.length > 0;
					};
				}
			};
		}]);

		sk.directive('skCreateUsername', [function () {
			return {
				template: '<div sk-username></div>'
			};
		}]);
		sk.directive('skCreatePassword', [function () {
			return {
				template: '<div sk-password></div>'
			};
		}]);
		sk.directive('skCreatePasswordConfirm', [function () {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<label for="password-confirm">Confirm Password</label>\n\t\t\t\t\t<input ng-model="passwordConfirm" type="password" name="password-confirm"/>\n\t\t\t\t</div>'
			};
		}]);

		sk.directive('skCreateButton', [function () {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<label><input type="checkbox" />Terms and Conditions</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type="submit" name="create-account" ng-disabled="checkPasswords()">Create Account</button>{{disabled}}\n\t\t\t\t\t<div>or <a ui-sref="login">Login</a></div>\n\t\t\t\t</div>'
			};
		}]);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PasswordQuality = (function () {
		function PasswordQuality(password, username) {
			_classCallCheck(this, PasswordQuality);

			this.password = password;
			this.username = username;
			this._messages = [];
		}

		_createClass(PasswordQuality, [{
			key: 'notEnoughCharVariety',
			value: function notEnoughCharVariety() {
				var count = 0;
				if (String.prototype.match.call(this.password, /[A-Z]/)) {
					count++;
				}
				if (String.prototype.match.call(this.password, /[a-z]/)) {
					count++;
				}
				if (String.prototype.match.call(this.password, /\d/)) {
					count++;
				}
				if (String.prototype.match.call(this.password, /[!@#\$%\^&\*(){}\[\]]/)) {
					count++;
				}
				if (count < 2) {
					this._messages.push('Password must have at least 3, a lowercase letter, an uppercase letter, a number, a symbol.');
				}
				return this;
			}
		}, {
			key: 'notLongEnough',
			value: function notLongEnough() {
				if (this.password.length < 8) {
					this._messages.push('Password must be 8 or more characters.');
				}
				return this;
			}
		}, {
			key: 'hasErrs',
			value: function hasErrs() {
				this._messages = [];
				return this.notEnoughCharVariety().notLongEnough()._messages.length;
			}
		}, {
			key: 'sendErrs',
			value: function sendErrs(req, res, message) {
				var tempMessages = this.messages;
				if (message) tempMessages.push(message);

				if (req.accepts('html')) {
					res.redirect('/#/create-account?flash=' + JSON.stringify(tempMessages));
				} else {
					res.json(tempMessages);
				}
			}
		}, {
			key: 'messages',
			get: function get() {
				this._messages = [];
				return this.notEnoughCharVariety().notLongEnough()._messages;
			},
			set: function set(m) {
				return false;
			}
		}]);

		return PasswordQuality;
	})();

	module.exports = PasswordQuality;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function login(sk) {
		sk.directive('skFlash', function ($location) {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<div ng-repeat="f in flash">{{f}}</div>\n\t\t\t\t</div>',
				link: function link(scope, element, attr) {
					if ($location.search().hasOwnProperty('flash')) {
						scope.flash = [];
						scope.flash = JSON.parse($location.search().flash);
					} else {
						scope.flash = [];
					}
				}
			};
		});
	};

/***/ }
/******/ ]);
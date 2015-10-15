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
		var skFlash = __webpack_require__(3);

		var sk = angular.module('sk', ['ui.router', 'ngCookies', 'ngAnimate']);

		sk.config(function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/login");

			$stateProvider.state("login", {
				url: "/login",
				"template": '\n\t\t\t\t<div>\n\t\t\t\t\t<sk-login></sk-login>\n\t\t\t\t</div>'
			});

			$stateProvider.state("create-account", {
				url: "/create-account",
				"template": '\n\t\t\t\t<div>\n\t\t\t\t\t<sk-create></sk-create>\n\t\t\t\t</div>'
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
				template: '\n\t\t\t\t<form ng-model="userLogin" action="/users/login" method="POST" id="login" class="authorization">\n\t\t\t\t\t<div sk-username></div>\n\t\t\t\t\t<div sk-password></div>\n\t\t\t\t\t<div sk-login-button></div>\n\t\t\t\t\t<div sk-target></div>\n\t\t\t\t</form>'
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
/***/ function(module, exports) {

	'use strict';

	module.exports = function login(sk) {

		sk.directive('skCreate', [function () {
			return {
				template: '\n\t\t\t\t<form ng-model="userCreate" action="/users" method="post" id="create" class="authorization">\n\t\t\t\t\t<div sk-create-username></div>\n\t\t\t\t\t<div sk-create-password></div>\n\t\t\t\t\t<div sk-create-password-confirm></div>\n\t\t\t\t\t<div sk-create-button></div>\n\t\t\t\t</form>'
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
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<label for="password-confirm">Confirm Password</label>\n\t\t\t\t\t<input type="text" name="password-confirm"/>\n\t\t\t\t</div>'
			};
		}]);

		sk.directive('skCreateButton', [function () {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<label><input type="checkbox" />Terms and Conditions</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type="submit" name="create-account">Create Account</button>\n\t\t\t\t\t<div>or <a ui-sref="login">Login</a></div>\n\t\t\t\t</div>'
			};
		}]);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function login(sk) {
		sk.directive('skFlash', function ($location) {
			return {
				template: '\n\t\t\t\t<div>\n\t\t\t\t\t<div ng-repeat="f in flash">{{f}}</div>\n\t\t\t\t</div>',
				link: function link(scope, element, attr) {
					if ($location.search().hasOwnProperty('flash')) {
						scope.flash = JSON.parse($location.search().flash);
					}
				}
			};
		});
	};

/***/ }
/******/ ]);
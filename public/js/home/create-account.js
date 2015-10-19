var PasswordQuality = require('../../../bin/password-quality');

module.exports = function login(sk){

	sk.directive('skCreate', [function(){
		return {
			template:`
				<form name="user" action="/users" method="post" id="create" class="authorization">
					<div sk-create-username></div>
					<div sk-create-password></div>
					<div sk-create-password-confirm></div>
					<div sk-create-button></div>
				</form>`,
				link: function(scope, element, attr){
					let form = element.find('form');
					let pwQuality;

					scope.checkPasswords = function() { 

						scope.flash = [];
						if(form.hasClass('ng-dirty')) {
							if(!scope.username) {
								scope.flash.push('Please fill in a valid email as username');
							}
							if(!scope.password) {
								scope.flash.push('Please fill in password');
							} else {
								pwQuality = new PasswordQuality(scope.password);

								Array.prototype.push.apply(scope.flash, pwQuality.messages);
								if(scope.password != scope.passwordConfirm) scope.flash.push('Passwords must match');
							}
						}

						return scope.flash.length > 0;
					};
				}
		};
	}]);



	sk.directive('skCreateUsername', [function(){
		return {
			template: `<div sk-username></div>`
		};
	}]);
	sk.directive('skCreatePassword', [function(){
		return {
			template: `<div sk-password></div>`
		};
	}]);
	sk.directive('skCreatePasswordConfirm', [function(){
		return {
			template: `
				<div>
					<label for="password-confirm">Confirm Password</label>
					<input ng-model="passwordConfirm" type="password" name="password-confirm"/>
				</div>`
		};
	}]);

	sk.directive('skCreateButton', [function(){
		return {
			template: `
				<div>
					<div>
						<label><input type="checkbox" />Terms and Conditions</label>
					</div>
					<button type="submit" name="create-account" ng-disabled="checkPasswords()">Create Account</button>{{disabled}}
					<div>or <a ui-sref="login">Login</a></div>
				</div>`
		};
	}]);
};
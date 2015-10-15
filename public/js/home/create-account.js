module.exports = function login(sk){

	sk.directive('skCreate', [function(){
		return {
			template:`
				<form ng-model="userCreate" action="/users" method="post" id="create" class="authorization">
					<div sk-create-username></div>
					<div sk-create-password></div>
					<div sk-create-password-confirm></div>
					<div sk-create-button></div>
				</form>`
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
					<input type="text" name="password-confirm"/>
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
					<button type="submit" name="create-account">Create Account</button>
					<div>or <a ui-sref="login">Login</a></div>
				</div>`
		};
	}]);
};
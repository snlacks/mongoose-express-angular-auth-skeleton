module.exports = function login(sk){

	sk.directive('skLogin', [ function(){
		return {
			template: `
				<form ng-model="user" action="/users/login" method="POST" id="login" class="authorization">
					<div sk-username></div>
					<div sk-password></div>
					<div sk-login-button></div>
					<div sk-target></div>
				</form>`
			};
	}]);

	sk.directive('skUsername', [function(){
		return {
			template: `
				<div>
					<label for="username">Username</label>
					<input type="text" ng-model="username" name="username"/>
				</div>`
		};
	}]);
	sk.directive('skTarget', [function(){
		return {
			template: `
				<div>
					<label for="target">Go to:</label>
					<select  type="text" ng-model="target" name="target">
						<option value="dashboard" ng-selected="true">dashboard</option>
						<option value="other">other</option>
					</select>
				</div>`
		};
	}]);
	sk.directive('skPassword', [function(){
		return {
			template: `
				<div>
					<label for="password">Password</label>
					<input ng-model="password" type="password" name="password"/>
				</div>`
		};
	}]);

	sk.directive('skLoginButton', [function(){
		return {
			template: `
				<div>
					<button type="submit" id="login" name="login" value="Login">Login</button>
					<div>or <a ui-sref="create-account">Create Account</a></div>
				</div>`
		};
	}]);


};
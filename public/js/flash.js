module.exports = function login(sk){
	sk.directive('skFlash',  function($location){
		return {
			template: `
				<div>
					<div ng-repeat="f in flash">{{f}}</div>
				</div>`,
			link: function(scope, element, attr){
				if($location.search().hasOwnProperty('flash')){
					scope.flash = [];
					scope.flash = JSON.parse($location.search().flash);
				} else {
					scope.flash = [];
				}

			}
		}
	})
}
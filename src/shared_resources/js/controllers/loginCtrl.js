angular
	.module('shared_resources')
	.controller('loginCtrl', function($scope, $http, globalServices){

		var logr = function(message) {globalServices.logr(message, 'loginCtrl'); }
		logr('Registered.');

		$scope.fields = {
			userID: 	{ type: "text", 	string: "Username", minLength: 3, maxLength: 20}, 
			password: 	{ type: "password", string: "Password", minLength: 3, maxLength: 20}
		}

		// Variables
		$scope.loginUser 	= {};					// Object holding log-in values
		$scope.loginFail 	= null;					// Log in error code
		$scope.numAttempts 	= null;					// Number of attempts remaining (if err_no = 1)
		$scope.lockedUntil 	= null;					// When account will unlock 	(if err_no = 2)

		/**
		 * Attempts to log user in
		 */
		$scope.loginSubmit 	= function(isValid) {
			logr('Attempting to Log in: '+$scope.loginUser.userID);

			if (isValid) {
				logr($scope.loginUser);

				$http
					.post('/auth/login', $scope.loginUser)
					.then(function(result){

						var resp 			= result.data;
						logr(['registerSubmit - response', resp]);

						$scope.loginFail 	= null;
						$scope.err_no 		= null;
						$scope.numAttempts 	= null;
						$scope.lockedUntil 	= null;

						if (resp.err_no || resp.err_no == 0) {
							switch (resp.err_no) {
								case 0:
									$scope.loginFail 	= 0;
									break;
								case 1: 
									$scope.loginFail 	= 1;
									$scope.numAttempts 	= resp.addl_info;
									break;
								case 2:
									$scope.loginFail 	= 2;
									$scope.numAttempts 	= resp.addl_info;
									break;
								default:
									logr('Unknown err_no returned.');
							}

						} else if (resp.err) {
							console.log(['Other Error.', err]);
						} else {
							console.log('No error!');
						}

					});
				
			} else {
				logr('Form not valid - how did you submit it?');
			}

		}

	});
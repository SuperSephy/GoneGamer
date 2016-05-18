angular
	.module('shared_resources')
	.controller('registrationCtrl', function($scope, $http, globalServices){

		var logr = function(message) {globalServices.logr(message, 'registrationCtrl'); }
		logr('Registered.');

		/**
		 * Checks if userID is available
		 */
		$scope.checkedIDs 	= {};					// Array to store queried userIDs (more responsive, limits redundant queries)
		$scope.checkUserID 	= function(userID) {
			logr('Checking userID: '+userID);

			if (!$scope.checkedIDs[userID]){

				$http
					.post('/auth/checkUserID', {userID: userID})
					.then(function(result){
						logr(['response', result.data]);
						if (result.data.user_exists) {
							$scope.checkedIDs[userID] = 'unavailable';
							
						} else {
							$scope.checkedIDs[userID] = 'available';
						}
					}, function(err){
						logr(['There was an error checking the user id:', err]);
					});
				
			} else {
				logr('Already checked that ID - it is '+$scope.checkedIDs[userID]+'. Button should be disabled, how did you trigger this function?');
			}


		}

		/**
		 * Submits user registration
		 * @param  {Boolean} isValid Checks if the form is valid
		 */
		$scope.registerSubmit = function(isValid){

			if (isValid) {
				var regUser = this.newUser;
				delete regUser.password2;
				
				logr(regUser);

				$http
					.post('/auth/register', regUser)
					.then(function(result){
						logr(['registerSubmit - response', result.data])
					});
				
			} else {
				logr('Form not valid - how did you submit it?');
			}

		}


	});
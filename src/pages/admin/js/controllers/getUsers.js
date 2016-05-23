angular
	.module('admin')

	.controller('getUsersCtrl', function($scope, $filter, $http){
		// Object of ids and therir selected status: {hash: true, hash: false}
		$scope.selected 		= {};
		
		// Table Settings
		$scope.sortKey 		= 'playerName';
		$scope.reverse 		= false;
		$scope.headers 		= {admin: 'Admin', playerName: 'Player Name', userID: 'User ID', lastLogin: 'Last Login', lockUntil: 'Unlock'};

		$scope.sort 		= function(key) {
			$scope.reverse 	= $scope.sortKey == key ? !$scope.reverse: $scope.reverse;
			$scope.sortKey 	= key;
		}
		$scope.toDate 		= function(date) {
			return moment(date).format('lll');
		}

		// Delete Users

		/**
		 * Delete an object of users
		 * @param  	{String} 	id 		string of a Mongo ObjectID
		 */
		$scope.delete_users = function(id) {
			var delete_ids 	= [];

			if (id) {
				delete_ids.push(id);
			} else {
				for (var _id in $scope.selected) {
					if ($scope.selected[_id]) delete_ids.push(_id);
				}	
			}

			if (!delete_ids.length) return swal({type:'error', title: 'Oops...', text: 'Please select at least 1 User to delete.'});

			swal({
				type: 				'warning',
				title: 				'Are you sure?',
				text: 				'Delete '+delete_ids.length+' user(s)? This action cannot be undone.',
				showCancelButton: 	true
			}).then(function(confirm){
				if (confirm){

					$http
						.post('/admin/deleteUsers', {ids: delete_ids})
						.then(function(success){
							console.log(success.data);
						}, function(err){
							console.log(err);
						})
				}

			});

		}

		/**
		 * Unlock an object of users
		 * @param  	{String} 	id 		string of a Mongo ObjectID
		 */
		$scope.unlock_users = function(id) {
			var unlock_ids 	= [];

			if (id) {
				unlock_ids.push(id);
			} else {
				for (var _id in $scope.selected) {
					if ($scope.selected[_id]) unlock_ids.push(_id);
				}	
			}

			if (!unlock_ids.length) return swal({type:'error', title: 'Oops...', text: 'Please select at least 1 User to unlock.'});

			$http
				.post('/admin/unlockUsers', {ids: unlock_ids})
				.then(function(success){
					console.log(success.data);
				}, function(err){
					console.log(err);
				})

		}

	});
angular
	.module('goneGamer')
	.controller('newGameCtrl', function($scope, $http, globalServices) {

		var logr = function(message) {globalServices.logr(message, 'newGameCtrl'); }
		logr('Registered.');

		$scope.newGame 		= {};
		$scope.checkedNames = {};
		$scope.newTemplate 	= [];
		$scope.template 	= [{
			name: 			'Character Details',
			attributes: [{
				name: 		'name',
				type: 		'text',
				example: 	'Naruto Uzumaki',
				min: 		5,
				max: 		20,
				required: 	true
			}, {
				name: 		'age',
				type: 		'text',
				example: 	13,
				required: 	true
			}, {
				name: 		'specialty',
				type: 		'text',
				example: 	'shadow clone',
				min: 		8,
				max: 		100,
				required: 	false
			}]
		}, {
			name: 			'Physical Stats',
			attributes: [{
				name: 		'strength',
				type: 		'number',
				example: 	11,
				min: 		0,
				max: 		100,
				required: 	true
			},{
				name: 		'defense',
				type: 		'number',
				example: 	11,
				min: 		0,
				max: 		100,
				required: 	true
			},{
				name: 		'speed',
				type: 		'number',
				example: 	11,
				min: 		0,
				max: 		100,
				required: 	true
			}]
		}];

		$scope.checkName 	= function(name) {
			console.log('Checking: '+name);

			if ( !(name in $scope.checkedNames) ){
				$http
					.post('/api/checkGameName', {name: name})
					.then(function(result) {
						console.log(result.data);
						$scope.checkedNames[name] = result.data.name_exists ? 'unavailable' : 'available';

					}, function(err){
						console.log(err)
					})

			}

		}

		$scope.attributes = {
			string: {
				name: 			'text',
				example: 		'Sample text',
				min: 			5,
				max: 			100,
				required: 		false,
				input_format: 	'text'
			},
			number: {
				name: 			'number',
				min: 			0,
				max: 			100,
				required: 		false
			},
			boolean: {
				name: 			'true/false',
				required: 		false,
				input_format: 	'checkbox'
			},
			date: {
				name: 			'date',
				required: 		false,
				input_format: 	'date'
			},
			buffer: {
				name: 			'file',
				required: 		false,
				input_format: 	'file'
			},
			array: {
				name: 			'list',
				required: 		false,
				input_format: 	'text'
			}
		}

		$scope.setTemplate 	= function(template) {
			$scope.newGame.template = template;
		}

	});
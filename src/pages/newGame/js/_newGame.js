angular
	.module('goneGamer')
	.controller('newGameCtrl', function($scope, globalServices) {

		var logr = function(message) {globalServices.logr(message, 'newGameCtrl'); }
		logr('Registered.');

		$scope.gameForm = {};

	});

angular
	.module('goneGamer')

	// Overall Index Controller
	.controller('indexCtrl', function($scope, globalServices) {

		var logr = function(message) {globalServices.logr(message, 'indexCtrl'); }
		logr('Registered.');

	});

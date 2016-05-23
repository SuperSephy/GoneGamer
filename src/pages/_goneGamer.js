/**
 * PRIMARY MODULE CREATION
 *
 * Creates the `goneGamer` angular module and sets up some global configs.
 *
 * Imports the `shared_resources` angular module to limit redundant services shared between controllers 
 *
 * Imports the ui.bootstrap library
 */

angular
	.module('goneGamer', ['ngAnimate', 'ui.bootstrap', 'sharedResources'])

	.config(function($interpolateProvider, $locationProvider,$compileProvider) {
		// Handlebars also uses {{ }} for replacing values - switch Angular to {[ ]} 
	  	$interpolateProvider.startSymbol('{[').endSymbol(']}');

	  	// Prevent Angular was re-writing #locations to #/locations - this sets to normal
	  	$locationProvider.html5Mode({enabled: true, requireBase: false, rewriteLinks: false });

		// White List file file download
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
	})

	.controller('goneGamerCtrl', function($scope, globalServices){

		var logr = function(message) {globalServices.logr(message, 'goneGamerCtrl'); }
		logr('Registered.');

	});
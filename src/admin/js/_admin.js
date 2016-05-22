/**
 * Primary module creation
 *
 * This creates the `admin` angular module and sets up some global configs.
 * 
 */

angular
	.module('admin', [])

	.config(function($interpolateProvider, $locationProvider, $compileProvider) {
		// Handlebars also uses {{ }} for replacing values - switch Angular to {[ ]} 
	  	$interpolateProvider.startSymbol('{[').endSymbol(']}');

	  	// Prevent Angular was re-writing #locations to #/locations - this sets to normal
	  	$locationProvider.html5Mode({enabled: true, requireBase: false, rewriteLinks: false });

		// White List file file download
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
	})

	.controller('adminCtrl', function($scope, $filter){

	});
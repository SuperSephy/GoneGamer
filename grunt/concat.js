module.exports = function (grunt, options) {
		
	return {

		options: {
		  separator: "\n\n",
		  banner: '/*! <%= package.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
		},

		// CSS
		build_css: {
		  src: [
		    // 'node_modules/angular/angular-csp.css',
		    'node_modules/tether/dist/css/tether.css',                        	// required for bootstrap 4.0
		    'node_modules/bootstrap/dist/css/bootstrap.css',
		    'node_modules/font-awesome/css/font-awesome.css',
		    'node_modules/sweetalert2/dist/sweetalert2.css',
		    'build/style.css'
		  ],
		  dest: 'public/static/index/css/style.min.css'
		},

		release_css:{
		  src: [
		    // 'node_modules/angular/angular-csp.css',
		    'node_modules/tether/dist/css/tether.min.css',
		    'node_modules/bootstrap/dist/css/bootstrap.min.css',
		    'node_modules/font-awesome/css/font-awesome.min.css',
		    'node_modules/sweetalert2/dist/sweetalert2.min.css',
		    'build/style.css'
		  ],
		  dest: 'build/index/style.css'

		},

		// JS
		build_js: {
		  src: [
		      // Order is important for these files: libraries, then extensions, then homeval
		      'node_modules/jquery/dist/jquery.js',								// JQUERY FIRST
		      'node_modules/tether/dist/js/tether.js',                        	// Required for bootstrap 4.0
		      'node_modules/bootstrap/dist/js/bootstrap.js',                  	// UI Library
		      'node_modules/angular/angular.js',                              	// Required UI handling
		      'node_modules/angular-animate/angular-animate.js',              	// Necessary for the pagination
		      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',  	// Necessary for the pagination
		      'node_modules/moment/moment.js',                        			// Handles date formatting
		      'node_modules/sweetalert2/dist/sweetalert2.min.js',				// Handles nice modals

		      // Application Specific
		      'src/shared_resources/**/*.js',
		      'src/index/**/*.js'
		  ],
		  dest: 'public/static/index/js/script.min.js'
		},
		
		release_js: {
		  src: [
		      // Order is important for these files: libraries, then extensions, then homeval
		      'node_modules/jquery/dist/jquery.min.js',
		      'node_modules/tether/dist/js/tether.min.js',
		      'node_modules/bootstrap/dist/js/bootstrap.min.js',
		      'node_modules/angular/angular.min.js',
		      'node_modules/angular-animate/angular-animate.min.js',
		      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
		      'node_modules/moment/min/moment.min.js',    
		      'node_modules/sweetalert2/dist/sweetalert2.min.js',

		      // Application Specific
		      'src/shared_resources/**/*.js',
		      'src/index/**/*.js'
		  ],
		  dest: 'build/index/script.js'
		}

	}; 	// End return object
};
module.exports = function(grunt, options) {

	return {
		options: {
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		    beautify: false
		},
		build: {
		    files: {
		        'public/static/js/script.min.js':['build/script.js']
		    }
		}
	}; // End return object

};
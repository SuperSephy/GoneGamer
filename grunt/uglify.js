module.exports = function(grunt, options) {

	return {
		options: {
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		    beautify: false
		},
		release: {
		    files: {
		        'public/static/goneGamer/js/script.min.js':['build/goneGamer/script.js']
		    }
		}
	}; // End return object

};
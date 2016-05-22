module.exports = function(grunt, options) {

	return {
		js:  {
		    files: ['src/**/*.js'],
		    tasks: ['jshint','concat:build_js'],
		    options: {
		        livereload: true
		    }
		},
		
		css:  {
		    files: ['src/**/*.scss'],
		    tasks: ['sass:build', 'concat:build_css', 'postcss:build'],
		    options: {
		        livereload: true
		    }
		}
	}; // End return object

};
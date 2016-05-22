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
		    tasks: ['sass:all', 'concat:build_css', 'postcss:all'],
		    options: {
		        livereload: true
		    }
		}
	}; // End return object

};
module.exports = function(grunt, options) {

	return {
		js:  {
		    files: ['src/**/*.js'],
		    tasks: ['concat:build_js'],
		    options: {
		        livereload: true
		    }
		},
		
		css:  {
		    files: ['src/dashboard/homeval/css/**/*.scss'],
		    tasks: ['sass:build', 'concat:build_css', 'postcss:build'],
		    options: {
		        livereload: true
		    }
		}
	}; // End return object

};
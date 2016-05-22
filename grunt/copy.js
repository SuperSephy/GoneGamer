module.exports = function(grunt, options) {

	return {
		// Expanded glyphicons (used in homeval for social icons) http://fortawesome.github.io/Font-Awesome/icons
		fonts: {
			files: [{
				expand: true,
				cwd: 'node_modules/font-awesome/fonts/',
				src: ['**'],
				dest: 'public/static/goneGamer/fonts'
			}]
		},

		all: {
			files: [{
				expand:true, 
				cwd: 'src/',
				src:['**/*.asp','**/*.php','**/*.html','**/*.png','**/*.gif','**/*.json'],
				dest: 'public/static/'
			}]
		}
	};
};
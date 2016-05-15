module.exports = function(grunt, options) {
	return {
		options: {
		    processors: [
		        require('autoprefixer')({
		            browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
		        }) // add vendor prefixes
		    ]
		},
		build: {
		    src: "public/static/**/css/*.css"
		}
	}; // End return object
};
module.exports = function(grunt, options) {

	return {
		options: {
	        sourceMap: false
	    },
	    build: {
	        files: {
	            'build/style.css': 'src/index/css/main.scss'
	        }
	    }
	}; // End return object

};
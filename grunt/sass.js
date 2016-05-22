module.exports = function(grunt, options) {

	return {
		options: {
	        sourceMap: false
	    },
	    index: {
	        files: {
	            'build/goneGamer.css': 'src/index/css/main.scss'
	        },
	    },
	    all: {
			files: [{
				expand: true,
				cwd: 'src',
				src: ['**/**/main.scss'],
				dest: 'build/goneGamer',
				ext: '.css'
			}]
	    }
	}; // End return object

};
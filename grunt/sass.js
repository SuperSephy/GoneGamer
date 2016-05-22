module.exports = function(grunt, options) {

	return {
		options: {
	        sourceMap: false
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
module.exports = function(grunt, options) {
	return {
		release: {
            files: [{
                expand: true,
                cwd: 'build/goneGamer',
                src: '*.css',
                dest: 'public/static/css/goneGamer/',
                ext: '.min.css'
            }]
        }
	}; // End return object
};
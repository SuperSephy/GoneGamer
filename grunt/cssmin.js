module.exports = function(grunt, options) {
	return {
		release: {
            files: [{
                expand: true,
                cwd: 'build/index',
                src: '*.css',
                dest: 'public/static/css/index/',
                ext: '.min.css'
            }]
        }
	}; // End return object
};
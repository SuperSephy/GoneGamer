module.exports = function (grunt, options) {
    // computations... 
    
    return {
        'build': [
            'newer:clean:all',
            'newer:copy:fonts',
            'newer:copy:all',
            'newer:sass:all',
            'newer:concat:build_css',
            'newer:postcss:all',
            'newer:jshint',
            'newer:concat:build_js'
        ],

        'build-concurrent': [
            'concurrent:build_first',
            'concurrent:build_second',
            'concurrent:build_third'
        ],

        'release': [
            'clean:all',
            'copy:fonts',
            'copy:all',
            'sass:all',
            'concat:release_css',
            'cssmin:release',
            'postcss:all',
            'jshint',
            'concat:release_js',
            'uglify:release'
        ]
    };
};
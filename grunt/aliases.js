module.exports = function (grunt, options) {
    // computations... 
    
    return {
        'build': [
            'newer:clean:game',
            'newer:copy:fonts',
            'newer:copy:games',
            'newer:sass:build',
            'newer:concat:build_css',
            'newer:postcss:build',
            'newer:concat:build_js'
        ],

        'build-concurrent': [
            'concurrent:build_first',
            'concurrent:build_second',
            'concurrent:build_third'
        ],

        'release': [
            'clean:game',
            'copy:fonts',
            'copy:games',
            'sass:build',
            'concat:release_css',
            'cssmin:release',
            'postcss:build',
            'concat:release_js',
            'newer:uglify:build'
        ],

        'heroku': [
            'newer:clean:game',
            'newer:copy:fonts',
            'newer:copy:games',
            'newer:sass:build',
            'newer:concat:build_css',
            'newer:postcss:build',
            'newer:concat:build_js'
        ]
    };
};
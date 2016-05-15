module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load grunt config
    require('load-grunt-config')(grunt);

    // If no task entered
    grunt.registerTask('default', [], function(){
        grunt.log.write('** You must select a task (build || release) **');
    });

}
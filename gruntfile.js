module.exports = function(grunt) {

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
        			// build files	// public assets
            game:     ['build/',  	'public/static/**'],
        },

        concat: {
            options: {
                separator: "\n\n",
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
            },

            // CSS
            build_css: {
                src: [
                  // 'node_modules/angular/angular-csp.css',
                  'node_modules/bootstrap/dist/css/bootstrap.css',
                  'node_modules/font-awesome/css/font-awesome.css',
                  'node_modules/sweetalert2/dist/sweetalert2.css',
                  'build/style.css'
                ],
                dest: 'public/static/css/style.css'
            },

            release_css:{
                src: [
                  // 'node_modules/angular/angular-csp.css',
                  'node_modules/bootstrap/dist/css/bootstrap.min.css',
                  'node_modules/font-awesome/css/font-awesome.min.css',
                  'node_modules/sweetalert2/dist/sweetalert2.min.css',
                  'build/style.css'
                ],
                dest: 'build/style.css'
            
            },

            // JS
            build_js: {
                src: [
                    // Order is important for these files: libraries, then extensions, then homeval
                    'node_modules/jquery/dist/jquery.js',							// JQUERY FIRST
                    'node_modules/angular/angular.js',                          	// Required UI handling
                    'node_modules/angular-animate/angular-animate.js',          	// Necessary for the pagination
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',  // Necessary for the pagination
                    'node_modules/bootstrap/dist/js/bootstrap.js',					// UI Library
                    'node_modules/moment/moment.js',                        		// Handles date formatting
                    'node_modules/sweetalert2/dist/sweetalert2.min.js',				// Handles nice modals

                    // Application Specific
                    'src/js/**/*.js'
                ],
                dest: 'public/static/js/script.min.js'
            },
            release_js: {
                src: [
                    // Order is important for these files: libraries, then extensions, then homeval
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/moment/min/moment.min.js',    
                    'node_modules/sweetalert2/dist/sweetalert2.min.js',

                    // Application Specific
                    'src/js/**/*.js'
                ],
                dest: 'build/script.js'
            },
        },

        copy: {
			// Expanded glyphicons (used in homeval for social icons) http://fortawesome.github.io/Font-Awesome/icons
			fonts: {
				files: [{
					expand: true,
					cwd: 'node_modules/font-awesome/fonts/',
					src: ['**'],
					dest: 'public/static/fonts'
				}]
			},

			games: {
				files: [{
					expand:true, 
					cwd: 'src/',
					src:['**/*.asp','**/*.php','**/*.html','**/*.png','**/*.gif','**/*.json'],
					dest: 'public/static/'
				}]
			}
		},

		cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: '*.css',
                    dest: 'public/static/css/',
                    ext: '.min.css'
                }]
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
                    }) // add vendor prefixes
                ]
            },
            build: {
                src: "public/static/css/*.css"
            }
        },

        jshint: {
            options: {
                asi: true,
                curly: false,
                eqeqeq: false,
                evil: true,
                // eqnull: true,
                funcscope: true,
                browser: true,
                jquery: true,
                unused: false,
                globals: {
                    jQuery: true
                }
            },
            src: ['src/js/**/*.js']
        },

        sass: {
        	options: {
                sourceMap: false
            },
            build: {
                files: {
                    'build/style.css': 'src/css/main.scss'
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify: false
            },
            build: {
                files: {
                    'public/static/js/script.min.js':['build/script.js']
                }
            }
        },

        watch: {
            js:  {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'concat:home_val_dev'],
                options: {
                    livereload: true
                }
            },
            css:  {
                files: ['src/dashboard/homeval/css/**/*.scss'],
                tasks: ['sass:home_val_dev', 'concat:home_val_css_dev', 'postcss:home_val'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', [], function(){
        grunt.log.write('** You must select a project to build. **');
    });

    // Tasks
    grunt.registerTask('build',		['newer:clean:game', 	'newer:copy:fonts', 'newer:copy:games', 'newer:sass:build', 'newer:concat:build_css', 						'newer:postcss:build', 	'newer:concat:build_js']);
    grunt.registerTask('release',	['clean:game', 			'copy:fonts',	 	'copy:games', 		'sass:build', 		'concat:release_css', 		'cssmin:release', 	'postcss:build', 		'concat:release_js',	 'newer:uglify:build']);
    
}
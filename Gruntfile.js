/**
 * Created by irfan.maulana on 2/19/2016.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    //unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    preserveComments : 'all'
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js', '!*.min.js'],
                    dest: 'build/',
                    ext: '.min.js'
                }]
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: true,
                keepSpecialComments: 0,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files : {
                expand : true,
                cwd : 'src/public/stylesheets/',
                src : ['**/*.css', '!**/*.min.css'],
                dest : 'build/public/stylesheets/',
                ext : '.min.css'
            },
            combine : {
                files: {
                    'build/public/stylesheets/all-style.min.css':
                        [
                            'src/public/stylesheets/bootstrap.min.css',
                            'src/public/stylesheets/font-awesome.min.css',
                            'build/public/stylesheets/harmony.min.css'
                        ]
                }
            }
        },

        concat: {
            options: {
                preserveComments: 'all',
                stripBanners: {
                    block: 'all'
                },
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            basic_and_extras: {
                files: {
                    'build/public/javascripts/all-frontend-js.min.js':
                        [
                            'src/public/javascripts/library/jquery-1.11.0.min.js',
                            'src/public/javascripts/library/bootstrap.min.js',
                            'build/public/javascripts/library/html5shiv.min.js',
                            'build/public/javascripts/library/aes.min.js',
                            'build/public/javascripts/library/md5.min.js',
                            'build/public/javascripts/library/angularjs/angular.min.js',
                            'build/public/javascripts/library/angularjs/angular-resource.min.js',
                            'build/public/javascripts/library/angularjs/angular-route.min.js'
                        ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', [ 'uglify', 'cssmin', 'concat']);

};
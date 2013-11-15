module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: 'src/assets/sass/**',
                tasks: ['sass']
            },

            js: {
                files: 'src/assets/js/*.js',
                tasks: ['jshint', 'copy', 'uglify']
            }
        },

        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        copy: {
            img: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, cwd: 'src/assets/img/', src: ['**'], dest: 'dist/assets/img/'}
                ]
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/assets/js/*.js'],
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                es3: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                browser: true,
                globals: {
                    $: false,
                    jQuery: false,
                    module: true
                }
            }
        },

        cssmin: {
            main: {
                expand: true,
                cwd: 'dist/assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/assets/css/',
                ext: '.min.css'
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: false,
                    preserveComments: 'some'
                },

                files: [
                    {
                        'dist/assets/js/main.js': ['src/assets/js/main.js']
                    }
                ]
            }
        }

    });

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('sass', ['compass', 'cssmin']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'sass', 'copy', 'uglify']);
    grunt.registerTask('travis', ['jshint', 'compass']);
};

module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'dist/hive/', filter: 'isFile'},
                    {expand: true, cwd: 'src/assets/img/', src: ['**'], dest: 'dist/hive/assets/img/'}
                ]
            }
        },

        cssmin: {
            main: {
                expand: true,
                cwd: 'dist/hive/assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/hive/assets/css/',
                ext: '.min.css'
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
                    module: true,
                    prettyPrint: true
                }
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
                        'dist/hive/assets/js/main.js': ['src/assets/js/main.js'],
                        'dist/hive/assets/js/dropdown.js': ['bower_components/bootstrap/js/dropdown.js'],
                        'docs/assets/js/prettify/prettify.js': ['bower_components/google-code-prettify/src/prettify.js']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: 'docs/assets/js/prettify/'
                    }
                ]
            }
        },

        watch: {
            sass: {
                files: 'src/assets/sass/**',
                tasks: ['sass']
            },

            js: {
                files: 'src/assets/js/*.js',
                tasks: ['jshint', 'copy', 'uglify']
            }
        }

    });

    grunt.registerTask('build', ['jshint', 'sass', 'copy', 'uglify']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('sass', ['compass', 'cssmin']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('travis', ['jshint', 'compass']);
};

module.exports = function (grunt)
{
    'use strict';

    // Load Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Use 'config.rb' file to configure Compass.
        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // Copy files from `src/` to `dist/hive/assets/`.
        copy: {
            css: {
                files: [
                    {expand: true, cwd: 'tmp/assets/css/', src: ['**', '!design-patterns.css'], dest: 'dist/hive/assets/css/'},
                    {expand: true, cwd: 'tmp/assets/css/', src: ['design-patterns.css'], dest: 'docs/assets/css/'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'dist/hive/', filter: 'isFile'},
                    {expand: true, cwd: 'src/assets/img/', src: ['**'], dest: 'dist/hive/assets/img/'}
                ]
            }
        },

        // Minified versions of CSS files within `dist/hive/assets/css/`.
        cssmin: {
            main: {
                options: {
                    rebase: false
                },
                expand: true,
                cwd: 'dist/hive/assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/hive/assets/css/',
                ext: '.min.css'
            }
        },

        // Check code quality of Gruntfile.js and theme-specific JavaScript using JSHint.
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
                    jQuery: true,
                    module: true,
                    prettyPrint: true
                }
            }
        },

        // Uglify and copy JavaScript files from `bower-components`.
        uglify: {
            dist: {
                // Preserve all comments that start with a bang (!) or include a closure compiler style.
                options: {
                    mangle: false,
                    preserveComments: 'some'
                },

                files: [
                    {
                        'dist/hive/assets/js/main.js': ['bower_components/bootstrap/js/dropdown.js', 'bower_components/bootstrap/js/collapse.js'],
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

        // Directories watched and tasks performed by invoking `grunt watch`.
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

    // Register tasks.
    grunt.registerTask('build', ['jshint', 'sass', 'copy:dist', 'uglify']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('sass', ['compass', 'copy:css', 'cssmin']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('travis', ['jshint', 'compass']);
};

module.exports = function (grunt)
{
    'use strict';

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up paths.
        paths: {
            src: {
                dir: 'src/',
                sass: 'src/assets/sass/',
                img: 'src/assets/img/',
                js: 'src/assets/js/'
            },
            tmp: {
                css: 'tmp/assets/css/'
            },
            dest: {
                dir: 'dist/hive/',
                css: 'dist/hive/assets/css/',
                img: 'dist/hive/assets/img/',
                js: 'dist/hive/assets/js/'
            }
        },

        // Clean distribution and temporary directories to start afresh.
        clean: [
            'dist/',
            'tmp/'
        ],

        // Use 'config.rb' file to configure Compass.
        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'css',
                'copy:dist',
                'uglify:dist'
            ]
        },

        // Copy files from `src/` to `dist/hive/assets/`.
        copy: {
            css: {
                files: [
                    {expand: true, cwd: '<%= paths.tmp.css %>', src: ['**', '!design-patterns.css'], dest: '<%= paths.dest.css %>'},
                    {expand: true, cwd: '<%= paths.tmp.css %>', src: ['design-patterns.css'], dest: 'docs/assets/css/'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: '<%= paths.src.dir %>', src: ['*'], dest: '<%= paths.dest.dir %>', filter: 'isFile'},
                    {expand: true, cwd: '<%= paths.src.img %>', src: ['**'], dest: '<%= paths.dest.img %>'}
                ]
            }
        },

        // Minified versions of CSS files.
        cssmin: {
            files: {
                expand: true,
                cwd: '<%= paths.dest.css %>',
                src: ['*.css', '!*.min.css'],
                dest: '<%= paths.dest.css %>',
                ext: '.min.css'
            }
        },

        // Check code quality of Gruntfile.js and theme-specific JavaScript using JSHint.
        jshint: {
            files: ['Gruntfile.js', '<%= paths.src.js %>*.js'],
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
                    jQuery: false,
                    $: false,
                    module: true,
                    autosize: true,
                    prettyPrint: true,
                    require: true
                }
            }
        },

        // Add vendor prefixed styles and other post-processing transformations.
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            files: {
                expand: true,
                cwd: '<%= paths.dest.css %>',
                src: ['*.css', '!*.min.css'],
                dest: '<%= paths.dest.css %>'
            }
        },

        // Validate Sass files via sass-lint.
        sasslint: {
            options: {
                configFile: '.sass-lint.yml'
            },
            target: ['<%= paths.src.sass %>**/*.scss']
        },

        // Uglify and copy JavaScript files from `bower-components`.
        uglify: {
            dist: {
                // Preserve all comments that start with a bang (!) or include a closure compiler style.
                options: {
                    preserveComments: require('uglify-save-license')
                },
                files: [
                    {
                        '<%= paths.dest.js %>main.js':
                        [
                            'bower_components/bootstrap/js/dropdown.js',
                            'bower_components/bootstrap/js/collapse.js',
                            'node_modules/autosize/dist/autosize.js',
                            '<%= paths.src.js %>main.js'
                        ],
                        'docs/assets/js/prettify/prettify.js': ['bower_components/google-code-prettify/src/prettify.js']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: 'docs/assets/js/prettify/'
                    }
                ]
            },
            minify: {
                expand: true,
                cwd: '<%= paths.dest.js %>',
                src: ['*.js', '!*.min.js'],
                dest: '<%= paths.dest.js %>',
                ext: '.min.js'
            }
        },

        // Directories watched and tasks performed by invoking `grunt watch`.
        watch: {
            sass: {
                files: '<%= paths.src.sass %>**',
                tasks: ['sass']
            },

            js: {
                files: '<%= paths.src.js %>*.js',
                tasks: ['jshint', 'copy', 'uglify']
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'jshint', 'concurrent', 'uglify:minify']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('css', ['sasslint', 'compass', 'copy:css', 'postcss', 'cssmin']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('travis', ['jshint', 'compass']);
};

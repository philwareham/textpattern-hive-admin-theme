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
                img: 'src/assets/img-global/',
                js: 'src/assets/js/'
            },
            docs: {
                css: 'docs/assets/css/',
                js: 'docs/assets/js/'
            },
            dest1: { // Classic Yellow theme
                dir: 'dist/hive/',
                css: 'dist/hive/assets/css/',
                img: 'dist/hive/assets/img/',
                js: 'dist/hive/assets/js/'
            },
            dest2: { // Neutral theme
                dir: 'dist/hive-neutral/',
                css: 'dist/hive-neutral/assets/css/',
                img: 'dist/hive-neutral/assets/img/',
                js: 'dist/hive-neutral/assets/js/'
            }
        },

        // Clean distribution and temporary directories to start afresh.
        clean: [
            'dist/',
            'docs/assets/css/'
        ],

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'css',
                'copy',
                'uglify:dist',
                'devUpdate'
            ]
        },

        // Copy files from `src/` to `dist/hive/assets/`.
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.dir %>',
                        src: '*',
                        dest: '<%= paths.dest1.dir %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.src.img %>',
                        src: '**',
                        dest: '<%= paths.dest1.img %>'
                    },                    {
                        expand: true,
                        cwd: 'src/assets/img-hive/',
                        src: '**',
                        dest: '<%= paths.dest1.img %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.src.img %>',
                        src: '**',
                        dest: '<%= paths.dest2.img %>'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/img-hive-neutral/',
                        src: '**',
                        dest: '<%= paths.dest2.img %>'
                    }
                ]
            }
        },

        // Minified versions of CSS files.
        cssmin: {
            files: {
                expand: true,
                cwd: '<%= paths.dest1.css %>',
                src: ['*.css', '!*.min.css'],
                dest: '<%= paths.dest1.css %>',
                ext: '.min.css'
            }
        },

        // Report on any available updates for dependencies.
        devUpdate: {
            main: {
                options: {
                    updateType: 'report',
                    reportUpdated: false, // Don't report up-to-date packages.
                    packages: {
                        dependencies: true,
                        devDependencies: true
                    }
                }
            }
        },

        // Check code quality of Gruntfile.js and theme-specific JavaScript using JSHint.
        jshint: {
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
            },
            files: [
                'Gruntfile.js',
                '<%= paths.src.js %>**/*.js'
            ]
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
            dist: {
                files: [
                    {'<%= paths.dest1.css %>textpattern.css': '<%= paths.dest1.css %>textpattern.css'},
                    {'<%= paths.docs.css %>design-patterns.css': '<%= paths.docs.css %>design-patterns.css'}
                ]
            }
        },

        // Sass configuration.
        sass: {
            options: require('eyeglass')({
                outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                sourceMap: false
            }),
            dist: {
                files: [
                    {'<%= paths.dest1.css %>textpattern.css': '<%= paths.src.sass %>hive-default.scss'},
                    {'<%= paths.docs.css %>design-patterns.css': '<%= paths.src.sass %>design-patterns.scss'},
                    {
                        expand: true,
                        cwd: '<%= paths.src.sass %>custom/',
                        src: '*',
                        dest: '<%= paths.dest1.css %>custom/',
                        ext: '.css'
                    }
                ]
            }
        },

        // Validate Sass files via sass-lint.
        sasslint: {
            options: {
                configFile: '.sass-lint.yml'
            },
            target: ['<%= paths.src.sass %>**/*.scss']
        },

        // Uglify and copy JavaScript files from `bower-components` and `node_modules`.
        uglify: {
            dist: {
                // Preserve all comments that start with a bang (!) or include a closure compiler style.
                options: {
                    preserveComments: require('uglify-save-license')
                },
                files: [
                    {
                        '<%= paths.dest1.js %>main.js':
                        [
                            'node_modules/bootstrap/js/dropdown.js',
                            'node_modules/bootstrap/js/collapse.js',
                            'node_modules/autosize/dist/autosize.js',
                            '<%= paths.src.js %>main.js'
                        ],
                        '<%= paths.docs.js %>prettify/prettify.js': 'bower_components/google-code-prettify/src/prettify.js'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: '<%= paths.docs.js %>prettify/'
                    }
                ]
            },
            minify: {
                expand: true,
                cwd: '<%= paths.dest1.js %>',
                src: ['*.js', '!*.min.js'],
                dest: '<%= paths.dest1.js %>',
                ext: '.min.js'
            }
        },

        // Directories watched and tasks performed by invoking `grunt watch`.
        watch: {
            sass: {
                files: '<%= paths.src.sass %>**/*.scss',
                tasks: 'css'
            },
            js: {
                files: '<%= paths.src.js %>**/*.js',
                tasks: ['jshint', 'copy', 'uglify']
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'concurrent', 'uglify:minify']);
    grunt.registerTask('css', ['sasslint', 'sass', 'postcss', 'cssmin']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['jshint', 'build']);
};

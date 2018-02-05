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
                dir: 'dist/hiveneutral/',
                css: 'dist/hiveneutral/assets/css/',
                img: 'dist/hiveneutral/assets/img/',
                js: 'dist/hiveneutral/assets/js/'
            },
            dest3: { // Subsite of theme CSS for multisite setup.
                dir: 'dist/'
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
                'uglify'
            ]
        },

        // Copy files from `src/` to `dist/hive/assets/`.
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.dir %>hive',
                        src: '**',
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
                        cwd: '<%= paths.src.dir %>hive-neutral',
                        src: '**',
                        dest: '<%= paths.dest2.dir %>',
                        filter: 'isFile'
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
                    },
                    {'<%= paths.dest1.css %>custom-example.css': '<%= paths.src.sass %>custom-example.css'},
                    {'<%= paths.dest2.css %>custom-example.css': '<%= paths.src.sass %>custom-example.css'}
                ]
            }
        },

        // Check code quality of Gruntfile.js and theme-specific JavaScript using JSHint.
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                esversion: 5,
                forin: true,
                globals: {
                    module: true,
                    require: true
                },
                latedef: true,
                noarg: true,
                nonew: true,
                quotmark: 'single',
                undef: true,
                unused: false,
                strict: false,
                browser: true
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
                    require('autoprefixer'),
                    require('cssnano')
                ]
            },
            dist: {
                files: [
                    {'<%= paths.dest1.css %>textpattern.css': '<%= paths.dest1.css %>textpattern.css'},
                    {'<%= paths.dest2.css %>textpattern.css': '<%= paths.dest2.css %>textpattern.css'},
                    {'<%= paths.dest3.dir %>setup-multisite.css': '<%= paths.dest3.dir %>setup-multisite.css'},
                    {'<%= paths.docs.css %>design-patterns.css': '<%= paths.docs.css %>design-patterns.css'}
                ]
            }
        },

        // Sass configuration.
        sass: {
            options: {
                //includePaths: ['node_modules/textpattern-jquery-ui-theme/scss'],
                outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                sourceMap: false
            },
            dist: {
                files: [
                    {'<%= paths.dest1.css %>textpattern.css': '<%= paths.src.sass %>hive-default.scss'},
                    {'<%= paths.dest2.css %>textpattern.css': '<%= paths.src.sass %>hive-neutral.scss'},
                    {'<%= paths.dest3.dir %>setup-multisite.css': '<%= paths.src.sass %>setup-multisite.scss'},
                    {'<%= paths.docs.css %>design-patterns.css': '<%= paths.src.sass %>design-patterns.scss'}
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

        // Uglify and copy JavaScript files from `node_modules`.
        uglify: {
            dist: {
                // Preserve all comments that start with a bang (!) or include a closure compiler style.
                options: {
                    output: {
                        comments: require('uglify-save-license')
                    }
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
                        '<%= paths.dest2.js %>main.js':
                        [
                            'node_modules/bootstrap/js/dropdown.js',
                            'node_modules/bootstrap/js/collapse.js',
                            'node_modules/autosize/dist/autosize.js',
                            '<%= paths.src.js %>main.js'
                        ],
                        '<%= paths.docs.js %>prism.js': [
                            'node_modules/prismjs/prism.js'
                        ]
                    }
                ]
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
    grunt.registerTask('build', ['clean', 'concurrent', 'copy']);
    grunt.registerTask('css', ['sasslint', 'sass', 'postcss']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['jshint', 'build']);
};

module.exports = function (grunt) {
    'use strict';

    // Load all Grunt tasks automatically.
    require('load-grunt-tasks')(grunt);

    var fs = require('fs');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // ---------------------------------------------------------------------
        // Paths
        // ---------------------------------------------------------------------

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

            themes: {
                hive: {
                    dir: 'dist/hive/',
                    css: 'dist/hive/assets/css/',
                    img: 'dist/hive/assets/img/',
                    js: 'dist/hive/assets/js/'
                },
                neutral: {
                    dir: 'dist/hiveneutral/',
                    css: 'dist/hiveneutral/assets/css/',
                    img: 'dist/hiveneutral/assets/img/',
                    js: 'dist/hiveneutral/assets/js/'
                }
            },

            dist: {
                dir: 'dist/'
            }
        },

        // ---------------------------------------------------------------------
        // JavaScript linting
        // ---------------------------------------------------------------------

        jshint: {
            options: {
                bitwise: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                esversion: 6,
                forin: true,
                globals: {
                    $: false,
                    jQuery: false,
                    module: true,
                    require: true,
                    autosize: true
                },
                latedef: true,
                noarg: true,
                nonew: true,
                strict: false,
                undef: true,
                unused: false
            },
            files: [
                'Gruntfile.js',
                '<%= paths.src.js %>**/*.js'
            ]
        },

        // ---------------------------------------------------------------------
        // Sass
        // ---------------------------------------------------------------------

        sass: {
            options: {
                implementation: require('sass'),
                outputStyle: 'expanded',
                sourceMap: false
            },
            dist: {
                files: {
                    '<%= paths.themes.hive.css %>textpattern.css':
                        '<%= paths.src.sass %>hive-default.scss',

                    '<%= paths.themes.hive.css %>print.css':
                        '<%= paths.src.sass %>print.scss',

                    '<%= paths.themes.neutral.css %>textpattern.css':
                        '<%= paths.src.sass %>hive-neutral.scss',

                    '<%= paths.themes.neutral.css %>print.css':
                        '<%= paths.src.sass %>print.scss',

                    '<%= paths.dist.dir %>setup-multisite.css':
                        '<%= paths.src.sass %>setup-multisite.scss',

                    '<%= paths.docs.css %>design-patterns.css':
                        '<%= paths.src.sass %>design-patterns.scss'
                }
            }
        },

        // ---------------------------------------------------------------------
        // CSS post-processing
        // ---------------------------------------------------------------------

        postcss: {
            options: {
                processors: [
                    require('autoprefixer'),
                    require('cssnano')
                ]
            },
            dist: {
                files: {
                    '<%= paths.themes.hive.css %>textpattern.css':
                        '<%= paths.themes.hive.css %>textpattern.css',

                    '<%= paths.themes.hive.css %>print.css':
                        '<%= paths.themes.hive.css %>print.css',

                    '<%= paths.themes.neutral.css %>textpattern.css':
                        '<%= paths.themes.neutral.css %>textpattern.css',

                    '<%= paths.themes.neutral.css %>print.css':
                        '<%= paths.themes.neutral.css %>print.css',

                    '<%= paths.dist.dir %>setup-multisite.css':
                        '<%= paths.dist.dir %>setup-multisite.css',

                    '<%= paths.docs.css %>design-patterns.css':
                        '<%= paths.docs.css %>design-patterns.css'
                }
            }
        },

        // ---------------------------------------------------------------------
        // CSS linting
        // ---------------------------------------------------------------------

        stylelint: {
            options: {
                configFile: '.stylelintrc.yml'
            },
            src: [
                '<%= paths.src.sass %>**/*.{css,scss}'
            ]
        },

        // ---------------------------------------------------------------------
        // Copy assets
        // ---------------------------------------------------------------------

        copy: {
            dist: {
                files: [
                    // Hive theme.
                    {
                        expand: true,
                        cwd: '<%= paths.src.dir %>hive',
                        src: ['**', '!manifest.json'],
                        dest: '<%= paths.themes.hive.dir %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.src.img %>',
                        src: '**',
                        dest: '<%= paths.themes.hive.img %>'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/img-hive/',
                        src: '**',
                        dest: '<%= paths.themes.hive.img %>'
                    },

                    // Neutral theme.
                    {
                        expand: true,
                        cwd: '<%= paths.src.dir %>hive-neutral',
                        src: ['**', '!manifest.json'],
                        dest: '<%= paths.themes.neutral.dir %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.src.img %>',
                        src: '**',
                        dest: '<%= paths.themes.neutral.img %>'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/img-hive-neutral/',
                        src: '**',
                        dest: '<%= paths.themes.neutral.img %>'
                    },

                    // Shared/custom files.
                    {
                        src: '<%= paths.src.sass %>custom-example.css',
                        dest: '<%= paths.themes.hive.css %>custom-example.css'
                    },
                    {
                        src: '<%= paths.src.sass %>custom-example.css',
                        dest: '<%= paths.themes.neutral.css %>custom-example.css'
                    },

                    // Documentation dependencies.
                    {
                        src: 'node_modules/jquery/dist/jquery.min.js',
                        dest: '<%= paths.docs.js %>jquery.js'
                    },
                    {
                        src: 'node_modules/jquery-ui-dist/jquery-ui.min.js',
                        dest: '<%= paths.docs.js %>jquery-ui.js'
                    }
                ]
            }
        },

        // ---------------------------------------------------------------------
        // Replace theme version numbers
        // ---------------------------------------------------------------------

        replace: {
            theme: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                },
                files: {
                    '<%= paths.themes.hive.dir %>manifest.json':
                        '<%= paths.src.dir %>hive/manifest.json',

                    '<%= paths.themes.neutral.dir %>manifest.json':
                        '<%= paths.src.dir %>hive-neutral/manifest.json'
                }
            }
        },

        // ---------------------------------------------------------------------
        // JavaScript bundling/minification
        // ---------------------------------------------------------------------

        uglify: {
            options: {
                output: {
                    comments: require('uglify-save-license')
                }
            },

            dist: {
                files: {
                    '<%= paths.themes.hive.js %>main.js': [
                        'node_modules/bootstrap/js/dropdown.js',
                        'node_modules/bootstrap/js/collapse.js',
                        '<%= paths.src.js %>main.js'
                    ],

                    '<%= paths.themes.neutral.js %>main.js': [
                        'node_modules/bootstrap/js/dropdown.js',
                        'node_modules/bootstrap/js/collapse.js',
                        '<%= paths.src.js %>main.js'
                    ],

                    '<%= paths.themes.hive.js %>autosize.js': [
                        'node_modules/autosize/dist/autosize.js',
                        '<%= paths.src.js %>autosize.js'
                    ],

                    '<%= paths.themes.neutral.js %>autosize.js': [
                        'node_modules/autosize/dist/autosize.js',
                        '<%= paths.src.js %>autosize.js'
                    ],

                    '<%= paths.themes.hive.js %>darkmode.js':
                        '<%= paths.src.js %>darkmode.js',

                    '<%= paths.themes.neutral.js %>darkmode.js':
                        '<%= paths.src.js %>darkmode.js',

                    '<%= paths.docs.js %>prism.js':
                        'node_modules/prismjs/prism.js'
                }
            }
        },

        // ---------------------------------------------------------------------
        // Watch
        // ---------------------------------------------------------------------

        watch: {
            sass: {
                files: '<%= paths.src.sass %>**/*.scss',
                tasks: ['css']
            },

            js: {
                files: [
                    '<%= paths.src.js %>**/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['jshint', 'uglify']
            },

            assets: {
                files: [
                    '<%= paths.src.dir %>hive/**/*',
                    '<%= paths.src.dir %>hive-neutral/**/*',
                    '<%= paths.src.img %>**/*',
                    'src/assets/img-hive/**/*',
                    'src/assets/img-hive-neutral/**/*'
                ],
                tasks: ['copy']
            }
        }
    });

    // -------------------------------------------------------------------------
    // Clean
    // -------------------------------------------------------------------------

    grunt.registerTask('clean', 'Remove generated files.', function () {
        var paths = [
            grunt.config.get('paths.dist.dir'),
            grunt.config.get('paths.docs.css')
        ];

        paths.forEach(function (path) {
            fs.rmSync(path, {
                recursive: true,
                force: true
            });
        });
    });

    // -------------------------------------------------------------------------
    // Registered tasks
    // -------------------------------------------------------------------------

    grunt.registerTask('css', [
        'stylelint',
        'sass',
        'postcss'
    ]);

    grunt.registerTask('js', [
        'jshint',
        'uglify'
    ]);

    grunt.registerTask('build', [
        'clean',
        'css',
        'js',
        'replace',
        'copy'
    ]);

    grunt.registerTask('default', [
        'watch'
    ]);
};

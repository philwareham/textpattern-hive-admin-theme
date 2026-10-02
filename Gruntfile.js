module.exports = function (grunt) {
    'use strict';

    const fs = require('fs');
    const path = require('path');
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');
    const terser = require('terser');

    // -------------------------------------------------------------------------
    // Load Grunt tasks
    // -------------------------------------------------------------------------

    [
        'grunt-contrib-copy',
        'grunt-contrib-jshint',
        'grunt-contrib-regex',
        'grunt-sass',
        'grunt-stylelint'
    ].forEach(grunt.loadNpmTasks);

    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------

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
                esversion: 8,
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
        // Sass compilation
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
        }
    });

    // -------------------------------------------------------------------------
    // CSS post-processing
    // -------------------------------------------------------------------------

    grunt.registerTask('postcss', 'Autoprefix and minify CSS.', async function () {
        const done = this.async();

        try {
            const files = [
                'dist/hive/assets/css/textpattern.css',
                'dist/hive/assets/css/print.css',
                'dist/hiveneutral/assets/css/textpattern.css',
                'dist/hiveneutral/assets/css/print.css',
                'dist/setup-multisite.css',
                'docs/assets/css/design-patterns.css'
            ];

            for (const file of files) {
                const css = fs.readFileSync(file, 'utf8');

                const result = await postcss([
                    autoprefixer(),
                    cssnano()
                ]).process(css, {
                    from: file,
                    to: file
                });

                fs.writeFileSync(file, result.css);

                grunt.log.ok(`Processed ${file}`);
            }

            done();
        } catch (error) {
            grunt.log.error(error);
            done(false);
        }
    });

    // -------------------------------------------------------------------------
    // JavaScript bundling/minification
    // -------------------------------------------------------------------------

    const jsBundles = {
        'dist/hive/assets/js/main.js': [
            'node_modules/bootstrap/js/dropdown.js',
            'node_modules/bootstrap/js/collapse.js',
            'src/assets/js/main.js'
        ],

        'dist/hiveneutral/assets/js/main.js': [
            'node_modules/bootstrap/js/dropdown.js',
            'node_modules/bootstrap/js/collapse.js',
            'src/assets/js/main.js'
        ],

        'dist/hive/assets/js/autosize.js': [
            'node_modules/autosize/dist/autosize.js',
            'src/assets/js/autosize.js'
        ],

        'dist/hiveneutral/assets/js/autosize.js': [
            'node_modules/autosize/dist/autosize.js',
            'src/assets/js/autosize.js'
        ],

        'dist/hive/assets/js/darkmode.js': [
            'src/assets/js/darkmode.js'
        ],

        'dist/hiveneutral/assets/js/darkmode.js': [
            'src/assets/js/darkmode.js'
        ],

        'docs/assets/js/prism.js': [
            'node_modules/prismjs/prism.js'
        ]
    };

    grunt.registerTask('js:build', 'Bundle and minify JavaScript.', async function () {
        const done = this.async();

        try {
            for (const [output, inputs] of Object.entries(jsBundles)) {
                const source = inputs
                    .map(function (file) {
                        return fs.readFileSync(file, 'utf8');
                    })
                    .join('\n;\n');

                const result = await terser.minify(source, {
                    format: {
                        comments: /^!/
                    }
                });

                if (result.error) {
                    throw result.error;
                }

                grunt.file.mkdir(path.dirname(output));
                fs.writeFileSync(output, result.code + '\n');

                grunt.log.ok(`Created ${output}`);
            }

            done();
        } catch (error) {
            grunt.log.error(error);
            done(false);
        }
    });

    // -------------------------------------------------------------------------
    // Clean
    // -------------------------------------------------------------------------

    grunt.registerTask('clean', 'Remove generated files.', function () {
        const paths = [
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
    // Composite tasks
    // -------------------------------------------------------------------------

    grunt.registerTask('css', [
        'stylelint',
        'sass',
        'postcss'
    ]);

    grunt.registerTask('js', [
        'jshint',
        'js:build'
    ]);

    grunt.registerTask('build', [
        'clean',
        'css',
        'js',
        'replace',
        'copy'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};

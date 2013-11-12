module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: 'sass/**',
                tasks: ['sass']
            }
        },

        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        }

    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('sass', ['compass']);
    grunt.registerTask('build', ['sass']);
};

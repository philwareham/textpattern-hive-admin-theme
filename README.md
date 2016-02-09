# Hive admin-side theme for Textpattern CMS

[![Build Status](https://travis-ci.org/philwareham/textpattern-hive-admin-theme.svg?branch=master)](https://travis-ci.org/philwareham/textpattern-hive-admin-theme)
[![Dependency Status](https://david-dm.org/philwareham/textpattern-hive-admin-theme/status.svg)](https://david-dm.org/philwareham/textpattern-hive-admin-theme#info=dependencies)
[![devDependency Status](https://david-dm.org/philwareham/textpattern-hive-admin-theme/dev-status.svg)](https://david-dm.org/philwareham/textpattern-hive-admin-theme#info=devDependencies)

The default admin theme that ships as standard with [Textpattern CMS](http://textpattern.com).

## Supported web browsers

* Internet Explorer 11.
* Chrome, Edge, Firefox, Safari and Opera the last two recent stable releases.

## Requirements

Building this repository requires:

* [Node.js](http://nodejs.org/) >=0.12.0
* [Grunt](http://gruntjs.com/) >=0.4.0

## Build setup

### Installing required tools

The project uses [Grunt](http://gruntjs.com/) to run tasks and [Sass](http://sass-lang.com/) for CSS pre-processing. First make sure you have base dependencies installed: [Node.js](http://nodejs.org/) and [Grunt](http://gruntjs.com/). You can install Node using the [installer](https://nodejs.org) and Grunt with npm:

    $ npm install -g grunt-cli

Consult the Grunt documentation for more instructions if necessary. You might need to use `sudo npm install -g grunt-cli` instead when installing on certain Unix-based systems.

### Installing dependencies

After you have the base dependencies taken care of, you can install the project's dependencies. Navigate to the project's directory, and run the dependency managers:

    $ cd textpattern-hive-admin-theme
    $ npm install

**npm** installs Node modules for Grunt. You might need to use `sudo npm install` instead when installing on certain Unix-based systems.

## Building

This repository hosts sources and needs to be built before it can be used. After you have installed all dependencies, you will be able to run tasks using Grunt, including building:

    $ grunt @task@

Where the `@task@` is either `build` or `watch`.

* The `build` task builds the project.
* The `watch` task will launch a task that watches for file changes; the project is then automatically built if a source file is modified.

## Pre-built version

We provide a pre-built version of the theme files within the `dist` directory in case you don't want to build it yourself.

## License

Licensed under the [GPLv2 license](https://github.com/philwareham/textpattern-hive-admin-theme/blob/master/LICENSE).

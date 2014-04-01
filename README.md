# eoraptor-jst

> Precompile eoraptor templates to JST file.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:


    npm install eoraptor-jst --save-dev


Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:


    grunt.loadNpmTasks('eoraptor-jst');


## The "eoraptor_jst" task

### Overview
In your project's Gruntfile, add a section named `eoraptor_jst` to the data object passed into `grunt.initConfig()`.


    grunt.initConfig({
      eoraptor_jst: {
        options: {
          // Task-specific options go here.
        },
        your_target: {
          // Target-specific file lists and/or options go here.
        },
      },
    });


### Options

#### namespace
Type: `String` Default value: `'eoraptor'`

The namespace in which the precompiled templates will be assigned. Use dot notation (e.g. `App.Templates`) for nested namespaces or false for no namespace wrapping. When false with amd option set true, templates will be returned directly from the AMD wrapper.

#### processName
Type: `Function` Default value:

    function(filepath) {
      return filepath.match(/([^\/]+)\.tpl.js$/)[1];
    }

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object. By default, it's a file's name without the path and external parts.


#### amd
Type: `Boolean` Default: `false`

Wraps the output file with an AMD define function and returns the compiled template namespace unless namespace has been explicitly set to false in which case the template function will be returned directly.

    define(function() {
      //...
      return this['[template namespace]'];
    });

### Usage Examples


    grunt.initConfig({
      eoraptor_jst: {
        foo: {
          options: {
            "amd": true
          },
          files: {
            "path/to/compiled.js": ["path/to/templates/*.tpl.js"]
          }
        }
      }
    });


## Release History

* 2012-08-10   v0.1.0   initial version.

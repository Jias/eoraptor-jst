/*
 * eoraptor-jst
 * https://github.com/jiasong/precompile
 *
 * Copyright (c) 2014 gnosaij
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    eoraptor_jst: {
      amd: {
        options: {
          module: 'amd'
          // namespace:'tpl'
        },
        files: {
          'tmp/jst.amd.js': ['tmp/*.tpl.js'],
        },
      },
      cmd: {
        options: {
          module: 'cmd'
          // namespace:'tpl'
        },
        files: {
          'tmp/jst.cmd.js': ['tmp/*.tpl.js'],
        },
      },
      normal: {
        options: {
        },
        files: {
          'tmp/jst.js': ['tmp/*.tpl.js'],
        },
      },
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['eoraptor_jst']);
};

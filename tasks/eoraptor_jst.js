/*
 * eoraptor-jst
 * https://github.com/jiasong/precompile
 *
 * Copyright (c) 2014 gnosaij
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {

  var eoraptor = require('eoraptorjs');

  // 
  var createNamespace = function(ns) {
    var output = [];
    var curPath = 'this';
    if (ns !== 'this') {
      var nsParts = ns.split('.');
      nsParts.forEach(function(curPart, index) {
        if (curPart !== 'this') {
          curPath += '[' + JSON.stringify(curPart) + ']';
          output.push(curPath + ' = ' + curPath + ' || {};');
        }
      });
    }

    return {
      namespace: curPath,
      declaration: output.join('\n')
    };
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('eoraptor_jst', 'Compile eoraptor templates to JST file', function() {
    var lf = grunt.util.linefeed;
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      namespace: 'eoraptor',
      processName: processName,
      // 删除行首行尾的空格
      processContent: function(src) {
        return src.replace(/(^\s+|\s+$)/gm, '').replace(/[\r\n]/gm, '');
      },
      // false/amd/cmd
      module: false,
      separator: lf + lf,
      ext: 'tpl.js',
      standalone: true
    });

    // filename conversion for templates
    function processName (filepath) {
      return filepath.match(new RegExp('([^\/]+)\.'+options.ext+'$'))[1];
    };


    var ns = createNamespace(options.namespace);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      // Concat specified files.
      var output = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var content = options.processContent(grunt.file.read(filepath));
        var compiled = eoraptor.compile(content).source;
        var tplName = options.processName(filepath);
        return 'ns[' + JSON.stringify(tplName) + '] = '+compiled+';';
      });

      output.unshift('var ns='+ns.namespace+', e_=__.e, v_=__.v;\n');
      
      // add namespace declaration
      output.unshift(ns.declaration);

      if (options.standalone) {
        output.unshift(grunt.file.read('node_modules/eoraptor-jst/tasks/eoraptor.runtime.js'));
      }

      if (options.module === 'amd') {
        output.unshift('define(function () {');
        options.namespace && output.push('return '+ns.namespace+';');
      } else if (options.module === 'cmd') {
        if (!options.standalone) {
          output.unshift('var __ = require("eoraptor")._;');
        }
        output.unshift('define(function (require, exports, module) {\n');
        options.namespace && output.push('module.exports = '+ns.namespace+';');
      } else {
        output.unshift('(function(){');
      }

      output.push(options.module ? '});' : '})();');

      output = output.join(grunt.util.normalizelf(options.separator));

      // Write the destination file.
      grunt.file.write(f.dest, output);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};

'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: ['Gruntfile.js'],
      src: ['src/**/*.js'],
      test: ['test/**/*.js']
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      gruntfile: ['Gruntfile.js'],
      src: ['src/**/*.js'],
      test: ['test/**/*.js']
    }

  });

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('default', ['lint']);
};

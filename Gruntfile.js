module.exports = function (grunt) {
  'use strict';

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
    }

  });

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['lint']);
};

module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      gruntfile: ['Gruntfile.js'],
      src: ['src/**/*.js'],
      test: ['test/**/*.js']
    },

    mochaTest: {
      unit: {
        options: {
          reporter: 'spec',
          require: ['test/helpers/setup.js']
        },
        src: ['test/spec/**/*_spec.js']
      }
    }

  });

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mochaTest:unit']);
  grunt.registerTask('default', ['lint', 'test']);
};

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
      test: ['test/**/*.js'],
      tools: ['tools/**/*.js']
    },

    mochaTest: {
      unit: {
        options: {
          reporter: 'spec',
          require: ['test/helpers/setup.js']
        },
        src: ['test/spec/**/*_spec.js']
      }
    },

    clean: {
      dist: ['dist']
    },

    copy: {
      dist: {
        files: [
          { expand: true, src: ['index.html'], dest: 'dist/' },
          { expand: true, src: ['src/**/*'], dest: 'dist/' }
        ]
      }
    }

  });

  grunt.registerTask('hygiene',
    'Verifica termos proibidos nos arquivos staged',
    function () {
      var done = this.async();
      grunt.util.spawn({
        cmd: 'node',
        args: ['tools/hygiene.js']
      }, function (err, result) {
        if (result.stdout) { grunt.log.writeln(result.stdout); }
        if (result.stderr) { grunt.log.error(result.stderr); }
        done(err ? false : true);
      });
    }
  );

  grunt.registerTask('installhooks',
    'Copia .githooks/* para .git/hooks/ e marca como executáveis',
    function () {
      var done = this.async();
      grunt.util.spawn({
        cmd: 'node',
        args: ['tools/install-hooks.js']
      }, function (err, result) {
        if (result.stdout) { grunt.log.writeln(result.stdout); }
        if (result.stderr) { grunt.log.error(result.stderr); }
        done(err ? false : true);
      });
    }
  );

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mochaTest:unit']);
  grunt.registerTask('build', ['clean:dist', 'copy:dist']);
  grunt.registerTask('default', ['lint', 'test']);
};

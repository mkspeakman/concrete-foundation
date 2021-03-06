/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    //banner: '/*! <%= pkg.title || pkg.name %>-<%= pkg.customer %> - v<%= pkg.version %> - ' +
    //  '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //  '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    //  '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    //  ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    banner: '/*! <%= pkg.project %> - Deploy v: <%= pkg.version %>\n' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        'Author: <%= pkg.author.name %> (<%= pkg.author.url %>) */\n',
    filename: '<%= pkg.name %>',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['../web/concrete/js/ccm.base.js'],
        dest: '../web/js/<%= filename %>.js'
      }
    },
    strip: {
      main : {
        src : '<%= concat.dist.dest %>',
        dest : '../web/js/<%= filename %>.min.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= strip.main.dest %>',
        dest: '<%= strip.main.dest %>'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true,
        jquery: true,
        es5: true,
        globals: {
          cust_params: true,
          app: true,
          "$": true,
          fluid: true,
          asyncTest: true,
          deepEqual: true,
          equal: true,
          expect: true,
          module: true,
          notDeepEqual: true,
          notEqual: true,
          notStrictEqual: true,
          ok: true,
          QUnit: true,
          raises: true,
          start: true,
          stop: true,
          strictEqual: true,
          test: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['web/packages/toj/js/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          debugInfo: false
        },
        files: {
          'web/css/<%= filename %>-dev.css': 'web/css/manifest.scss'
        }
      },
      build: {
        options: {
          style: 'compressed'
        },
        files: {
          'web/css/<%= filename %>.min.css': 'web/css/manifest.scss'
        }
      }
    },
    yuidoc: {
      compile: {
        name: 'Base Docs',
        description: 'Documentation for the Base Implementation',
        version: '<%= pkg.version %>',
        url: '<%= pkg.repository.url %>',
        options: {
          paths: 'dist/assets/js',
          outdir: 'docs'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['default']
      },
      sassy_pants: {
        files: 'web/packages/**/*.scss',
        tasks: ['sass:build', 'bump']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  //grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-strip');
  grunt.loadNpmTasks('grunt-bump');

  // Default task.
  grunt.registerTask('default', ['concat', 'sass:dev', 'bump']);
  grunt.registerTask('build', ['jshint', 'concat', 'strip', 'uglify', 'sass:build', 'bump:minor']);
  grunt.registerTask('release', ['jshint', 'concat', 'strip', 'uglify', 'sass:build', 'bump:major']);

};
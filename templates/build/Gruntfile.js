'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
	  path: "../../web/assets",
    haml: {
	    options: {
	      target: 'twig',
	      enableDynamicAttributes: false
      },
      compile: {
        files: [{
          expand: true,
          src: ['assets/haml/*.haml'],
          dest: '../compiled/',
          ext: '.twig'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass',
          cssDir: '<%= path %>/css',
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ''
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          '<%= path %>/js/scripts.min.js': [
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        }
      }
    },
    watch: {
      haml: {
        files: ['assets/haml/*.haml'],
        tasks: ['haml']
      },
      compass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/*/*.scss',
        ],
        tasks: ['compass']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      }
    },
    clean: {
      dist: [
        '<%= path %>/css/style.min.css',
        '<%= path %>/js/scripts.min.js'
      ],
      options: {
				force: true
    	}
    },
    notify_hooks: {
      options: {
        title: "Polhemus",
        success: true,
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-haml-php');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-notify');

  grunt.task.run('notify_hooks');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'compass',
    'haml',
    'uglify'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};

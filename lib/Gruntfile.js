module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
        src: ['../app/**/*.js'],
        dest: '../build/app.js'
      },
      options: {
        paths: ["./node_modules"]
      }
    },
    jshint: {
      options: {
        predef: [ "module","Tetris","prompt","FirebaseFactory","document", "console", "$", "$scope", "firebase","require","window",'clearInterval',"setInterval","setTimeout",'clearTimeout','Materialize' ],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true}
      },
      files: ['../app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/main.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 8080,
          livereload:true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ["../index.html","../**/*.html"]
      },
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint','browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'connect','browserify','watch']);
};

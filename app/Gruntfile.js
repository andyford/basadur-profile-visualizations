'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: 'assets/src/sass',
          cssDir: 'assets/css',
          imagesDir: 'assets/img',
          environment: 'production',
          relativeAssets: true
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/src/sass/**/*.scss'
        ],
        tasks: ['compass']
      }
    }
  });

  // Load tasks
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  // grunt.loadNpmTasks('grunt-asset-version-json');

  // Register tasks
  grunt.registerTask('default', [
    // 'clean',
    // 'cssmin',
    'compass',
    // 'uglify',
    // 'asset_version_json'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};

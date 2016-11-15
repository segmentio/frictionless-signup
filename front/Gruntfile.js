module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
	  build: {
		src: 'bundle_babel.js',
		dest: 'bundle.min.js'
	  }
	},
		browserify: {
			client: {
				src: ['index.js'],
				dest: 'bundle.js'
			}
		},
		babel: {
		options: {
			sourceMap: true,
			presets: ['latest']
		},
		dist: {
			files: {
				'bundle_babel.js': './bundle.js'
			}
		}
	}
  });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');

	// Default task(s).
	grunt.registerTask('default', ['browserify', 'babel', 'uglify']);

};

module.exports = function(grunt) {

	// load modules for use
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('assemble');

	grunt.initConfig({
		pkg     : grunt.file.readJSON('package.json'),
		stylus: {
			dist: {
		    	options: {
		      		compress: true,
		      		paths: [ 'styles' ]
		    	},
			    files: {
			    	'css/style.css': 'css/style.styl'
		    	}
		  	}
		},
		copy: {
  			main: {
		    	files: [{
		    		src: 'js/<%= pkg.name %>.js', 
		    		dest: 'distribution/<%= pkg.name %>.js',
		    		filter: 'isFile'
		    	}]	
			}
		},
		uglify: {
     		files: {
        		src: 'js/<%= pkg.name %>.js',
        		dest: 'distribution/<%= pkg.name %>.min.js'
      		}
    	},
		watch: {
			css:{
				files: 'css/*.styl',
				tasks: 'stylus',
				options:{ livereload: true }
			},
			js:{
				files: ['js/*.js','*.php'],
				tasks: ['copy','uglify'],
				options:{ livereload: true }
			}
		},
		assemble: {
			readme:{
				options: {
					flatten: true,
					partials: '',
					data: 'package.json',
					ext: '.md'
				},
				src:  'template.hbs',
				dest: './distribution/<%= pkg.name %>.jquery.json'
			}
		}	

	});
	grunt.registerTask('default', ['stylus','watch']);
	grunt.registerTask('build', ['uglify','copy','assemble']);
}
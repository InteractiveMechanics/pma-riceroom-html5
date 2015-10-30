module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        connect: {
            server: {
                options: {
                    port: 8000
                }
            }
        },
        sass: {
            dev: {
                files: {
                    'css/main.css': 'css/sass/main.scss'
                }
            }
        },
        jekyll: {
            dev: {
                options: {
                    src: 'jekyll-data',
                    dest: 'jekyll-data/build',
                    config: 'jekyll-data/_config.yml'
                }
            }
        },
        watch: {
            css: {
                files: ['**/*.scss'], 
                tasks: ['sass'] 
            },
            jekyll: {
                files: ['jekyll-data/**/*.yml', 'jekyll-data/*.xml', 'jekyll-data/*.json'],
                tasks: ['jekyll']
            }
		}
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    
    grunt.registerTask('default', ['connect:server', 'watch']);
};
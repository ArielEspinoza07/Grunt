module.exports = function(grunt){
  //Configuration of grunt.js
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json');
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jshint:{
      files: ['gruntfile.js','src/**/*','test/**/*.js'],
      options: {
        globals : {
          jQuery: true,
          console:true,
          module:true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files%>'],
      tasks: ['jshint','qunit']
    },
    //uglify
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
        banner: '/*! <%= pkg.name%> <%= grunt.template.today("yyyy-mm-dd")%>*/\n'
      },dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest%>']
        }
      }
    },
    //javascript
    js:{
      files:[{
        cwd: 'js/src/', //ruta de nuestro javascript fuente
        expand: true, // ingresar a las subcarpetas
        src: '*.js', // patron realtivo a cwd
        dest: 'js/min/' //destino de los archivos compresos
      }]
    },
    qunit: {
      files: ['gruntfile.js','src/**/*.js','test/**/*.js']
    }
  });

  //Load the plugins that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');

  //Default task(s).
  grunt.registerTask('test',['jshint','qunit']);

  grunt.registerTask('default',['jshint','qunit','concat','uglify']);

  grunt.registerTask('dist',['concat:dist','uglify:dist']);
}

module.exports = function(grunt){
  //Configuration of grunt.js
  grunt.initConfig({
    //uglify
    uglify: {
      options :{
        mangle: false,
        compress:{
          drop_console: true
        }
        //banner: '/*! <%= pkg.name%> <%= grunt.template.today("yyyy-mm-dd")%>*/\n'
      },
      js:{
        files:[{
          cwd: 'js/src/', //ruta de nuestro javascript fuente
          expand: true, // ingresar a las subcarpetas
          src: '*.js', // patron realtivo a cwd
          dest: 'js/min/' //destino de los archivos compresos
        }]
      }

    }
  });

  //Load the plugins that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Default task(s).
  grunt.registerTask('default',['uglify']);
}

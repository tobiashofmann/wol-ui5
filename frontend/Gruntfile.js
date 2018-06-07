module.exports = function(grunt) {

grunt.initConfig({
  openui5_preload: {
    component: {
      options: {
        resources: {
          cwd: 'webapp',
          prefix: 'de/itsfullofstars/wol/WOL'
        },
        dest: 'dist'
      },
      components: 'de/itsfullofstars/wol/WOL'
    }
  },
  jsdoc : {
        dist : {
            src: ['webapp/*.js','webapp/controller/*.js'],
            options: {
                destination: 'doc'
            }
        }
    },
    copy: {
    	  main: {
    	    files: [
    	      {expand: true, cwd: 'webapp/', src: ['index.html', 'manifest.json', 'model/servers.json'], dest: 'dist/', filter: 'isFile'}
    	      
    	    ],
    	  },
    	},
});


grunt.loadNpmTasks('grunt-openui5');
grunt.loadNpmTasks('grunt-jsdoc');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('default', ['openui5_preload', 'copy']);
grunt.registerTask('doc', ['jsdoc']);

};

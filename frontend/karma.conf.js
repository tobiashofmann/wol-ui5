module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns
    basePath: 'webapp',

    openui5: {
      path: 'https://openui5.hana.ondemand.com/resources/sap-ui-core.js',
      useMockServer: false
    },

    client: {
      captureConsole: true,
      clearContext: true,
      openui5: {
        config: {
          theme: 'sap_belize',
          libs: 'sap.m',
          bindingSyntax: 'complex',
          compatVersion: 'edge',
          preload: 'async',
          language: 'EN',
          resourceroots: {
            	'de.itsfullofstars.wol.WOL': './base/',
            	'test': '/base/test'
            }
        },
        tests: [
            'test/unit/allTests'
          ]
      }
    },
    
    browserConsoleLogOptions: {
		level: 'warn'
	},

    proxies: {
    },
    proxyValidateSSL: false,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['openui5', 'qunit'],
    

    // list of files / patterns to load in the browser
    files: [
    	{ pattern: '**/*', included: false, served: true, watched: true }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // optionally, configure the reporter
    coverageReporter: {
    	includeAllSources: true,
    	instrumenterOptions: {
            istanbul: { noCompact: true }
        },
    	reporters: [
			{
				type: 'lcov',
				dir: '../reports',
				subdir: 'coverage'
			},
			{
				type: 'text'
			},
			{ type: 'cobertura', subdir: '..', file: '../cobertura.txt' },
		]
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        '{.,!(test)}/*.js': ['coverage']
      },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage', 'unitsonarqubegeneric'],
      
    // the default configuration
    unitSonarqubeGenericReporter: {
      outputDir: '../reports/junit', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      useBrowserName: false // add browser name to report and classes names
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

// Karma configuration
// Generated on Tue Jan 03 2017 11:33:02 GMT-0600 (Central Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mock/angular-mocks.js',
      'node_modules/jquery/dist/jquery.slim.js',
      'src/index.js',
      'src/dateInput/dateInput.js',
      'src/showPassword/showPassword.js',
      'src/grid/grid.js',
      'src/showPassword/showPassword.spec.js',
      'src/dateInput/dataInput.spec.js',
      'src/grid/grid.spec.js',
      // 'src/test/basic/test.js',
      // 'src/test/isolateScope/test-is.js',
      //  'src/test/form/test.js',
      'src/**/*.html',
      //  'src/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    //browsers: ['Chrome', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    ngHtml2JsPreprocessor: {
      // strip this from the file path
      // stripPrefix: 'public/',
      // stripSuffix: '.ext',
      // prepend this to the
      // prependPrefix: 'served/',

      // or define a custom transform function
      // - cacheId returned is used to load template
      //   module(cacheId) will return template at filepath
      // cacheIdFromPath: function (filepath) {
      // example strips 'public/' from anywhere in the path
      // module(app/templates/template.html) => app/public/templates/template.html
      //  var cacheId = filepath.strip('public/', '');
      //  return cacheId;
      //},

      // - setting this option will create only a single module that contains templates
      //   from all the files, so you can load them all with module('foo')
      // - you may provide a function(htmlPath, originalPath) instead of a string
      //   if you'd like to generate modules dynamically
      //   htmlPath is a originalPath stripped and/or prepended
      //   with all provided suffixes and prefixes
      // moduleName: 'foo'
    }
  })
}

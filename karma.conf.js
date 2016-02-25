'use strict';
var packageJson = require('./package.json');
var defaultTimeout = 120000;
module.exports = function configureKarma(config) {
  var localBrowsers = [
    'PhantomJS',
  ];
  var sauceLabsBrowsers = {
    SauceChromeLatest: {
      base: 'SauceLabs',
      browserName: 'Chrome',
    },
    SauceFirefoxLatest: {
      base: 'SauceLabs',
      browserName: 'Firefox',
    },
    SauceSafariLatest: {
      base: 'SauceLabs',
      browserName: 'Safari',
      platform: 'OS X 10.11',
    },
    SauceInternetExplorerLatest: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
    },
    SauceInternetExplorerOldestSupported: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      version: 9,
    },
    SauceEdgeLatest: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
    },
    SauceAndroidLatest: {
      base: 'SauceLabs',
      browserName: 'Android',
    },
  };
  config.set({
    basePath: '',
    browsers: localBrowsers,
    logLevel: process.env.npm_config_debug ? config.LOG_DEBUG : config.LOG_INFO,
    frameworks: [ 'browserify', 'mocha' ],
    files: [ 'test/*.js' ],
    exclude: [],
    preprocessors: {
      'test/*.js': [ 'browserify' ],
    },
    browserify: {
      debug: true,
      bare: true,
    },
    reporters: [ 'progress', 'coverage' ],
    coverageReporter: {
      type: 'lcov',
      dir: 'test/coverage',
    },
    port: 9876,
    colors: true,
    concurrency: 3,
    autoWatch: false,
    captureTimeout: defaultTimeout,
    browserDisconnectTimeout: defaultTimeout,
    browserNoActivityTimeout: defaultTimeout,
    singleRun: true,
  });

  if (process.env.SAUCE_ACCESS_KEY && process.env.SAUCE_USERNAME) {
    var branch = process.env.TRAVIS_BRANCH || 'local';
    var build = 'localbuild';
    if (process.env.TRAVIS_JOB_NUMBER) {
      build = 'travis@' + process.env.TRAVIS_JOB_NUMBER;
    }
    config.reporters.push('saucelabs');
    config.set({
      customLaunchers: sauceLabsBrowsers,
      browsers: localBrowsers.concat(Object.keys(sauceLabsBrowsers)),
      sauceLabs: {
        testName: packageJson.name,
        recordVideo: true,
        startConnect: ('TRAVIS' in process.env) === false,
        tags: [
          'typeDetect_' + packageJson.version,
          process.env.SAUCE_USERNAME + '@' + branch,
          build,
        ],
      },
    });
  }
};

const packageJson = require('./package.json');
let browsers = [ 'ChromeHeadless' ];
let build = 'localbuild';
let branch = 'local';
let job = Date.now();
let startConnect = false;
const reporters = [ 'progress', 'coverage' ];
const tags = [ `${ packageJson.name }@${ packageJson.version }` ];
const frameworks = [ 'mocha' ];

/* eslint-disable no-process-env */
const debug = Boolean(process.env.npm_config_debug);
if (process.env.SAUCE_ACCESS_KEY && process.env.SAUCE_USERNAME) {
  browsers = [ 'SauceEdgeLatest', 'SauceInternetExplorerTen', 'SauceSafariLatest' ];
  tags.push(`${ process.env.SAUCE_USERNAME }@${ branch }`);
  reporters.push('saucelabs');
} else if (process.env.APPVEYOR) {
  browsers = [ 'Firefox', 'ChromeHeadless', 'IE' ];
  branch = process.env.APPVEYOR_REPO_BRANCH;
  job = process.env.APPVEYOR_JOB_NUMBER;
  build = `appveyor@${ process.env.APPVEYOR_JOB_NUMBER }`;
} else if (process.env.TRAVIS) {
  browsers = [ 'FirefoxHeadless', 'ChromeHeadless' ];
  branch = process.env.TRAVIS_BRANCH;
  job = process.env.TRAVIS_JOB_NUMBER;
  build = `travis@${ process.env.TRAVIS_JOB_NUMBER }`;
  startConnect = true;
} else {
  browsers = [];
  frameworks.push('detectBrowsers');
}
/* eslint-enable */

tags.push(build);
module.exports = function configureKarma(config) {
  config.set({
    basePath: '',
    browsers,
    singleRun: true,
    logLevel: debug ? config.LOG_DEBUG : config.LOG_INFO,
    frameworks,
    files: [ `${ packageJson.name }.test.js` ],
    reporters,
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: [ '-headless' ],
      },
      SauceSafariLatest: {
        base: 'SauceLabs',
        browserName: 'Safari',
        platform: 'OS X 10.11',
      },
      SauceInternetExplorerTen: {
        base: 'SauceLabs',
        browserName: 'Internet Explorer',
        version: 10,
      },
      SauceEdgeLatest: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
      },
    },
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
    },
    sauceLabs: {
      testName: packageJson.name,
      tunnelIdentifier: job,
      startConnect,
      tags,
    },
  });
};

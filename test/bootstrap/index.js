global.assert = require('simple-assert');
global.type = process.env.type_COV
  ? require('../../lib-cov/type')
  : require('../../lib/type');

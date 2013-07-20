module.exports = process.env.type_COV
  ? require('./lib-cov/type')
  : require('./lib/type');

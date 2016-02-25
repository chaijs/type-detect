'use strict';
var assert = require('simple-assert');
var type = require('..');
var isNode = typeof process !== 'undefined' && typeof process.release === 'object' && process.release.name;
function describeIf(condition) {
  return condition ? describe : describe.skip;
}
describeIf(isNode)('Node Specific', function () {

  it('global', function () {
    assert(type(global) === 'global');
  });

  it('process', function () {
    assert(type(process) === 'process');
  });

});

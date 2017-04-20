'use strict';

var assert = require('simple-assert');
var type = require('..');
var symbolExists = typeof Symbol === 'function';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
function describeIf(condition) {
  return condition ? describe : describe.skip;
}

describeIf(symbolToStringTagExists)('toStringTag extras', function () {

  it('supports toStringTag on arrays', function () {
    assert(type([]) === 'Array');
    var arr = [];
    arr[Symbol.toStringTag] = 'foo';
    assert(type(arr) === 'foo', 'type(arr) === "foo"');
  });


});

import assert from 'simple-assert';
import type from '..';
const symbolExists = typeof Symbol === 'function';
const symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
function describeIf(condition) {
  return condition ? describe : describe.skip;
}

describeIf(symbolToStringTagExists)('toStringTag extras', () => {

  it('supports toStringTag on arrays', () => {
    assert(type([]) === 'Array');
    const arr = [];
    arr[Symbol.toStringTag] = 'foo';
    assert(type(arr) === 'foo', 'type(arr) === "foo"');
  });


});

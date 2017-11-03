import assert from 'simple-assert';
import type from '..';
const isNode = typeof process !== 'undefined' && typeof process.release === 'object' && process.release.name;
function describeIf(condition) {
  return condition ? describe : describe.skip;
}
describeIf(isNode)('Node Specific', () => {

  it('global', () => {
    assert(type(global) === 'global');
  });

  it('process', () => {
    assert(type(process) === 'process');
  });

});

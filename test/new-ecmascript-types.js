'use strict';
var assert = require('simple-assert');
var type = require('..');
var symbolExists = typeof Symbol === 'function';
var setExists = typeof Set === 'function';
var mapExists = typeof Map === 'function';
var supportArrows = false;
var supportGenerators = false;
try {
  eval('function * foo () {}; foo'); // eslint-disable-line no-eval
  supportGenerators = true;
} catch (error) {
  supportGenerators = false;
}
try {
  eval('() => {}'); // eslint-disable-line no-eval
  supportArrows = true;
} catch (error) {
  supportArrows = false;
}
function itIf(condition) {
  return condition ? it : it.skip;
}

describe('ES2015 Specific', function () {
  itIf(symbolExists && typeof String.prototype[Symbol.iterator] === 'function')('string iterator', function () {
    assert(type(''[Symbol.iterator]()) === 'String Iterator');
  });

  itIf(symbolExists && typeof Array.prototype[Symbol.iterator] === 'function')('array iterator', function () {
    assert(type([][Symbol.iterator]()) === 'Array Iterator');
  });

  itIf(typeof Array.prototype.entries === 'function')('array iterator (entries)', function () {
    assert(type([].entries()) === 'Array Iterator');
  });

  itIf(mapExists)('map', function () {
    assert(type(new Map()) === 'Map');
  });

  itIf(symbolExists && mapExists && typeof Map.prototype[Symbol.iterator] === 'function')('map iterator', function () {
    assert(type(new Map()[Symbol.iterator]()) === 'Map Iterator');
  });

  itIf(mapExists && typeof Map.prototype.entries === 'function')('map iterator (entries)', function () {
    assert(type(new Map().entries()) === 'Map Iterator');
  });

  itIf(typeof WeakMap === 'function')('weakmap', function () {
    assert(type(new WeakMap()) === 'WeakMap');
  });

  itIf(setExists)('set', function () {
    assert(type(new Set()) === 'Set');
  });

  itIf(symbolExists && setExists && typeof Set.prototype[Symbol.iterator] === 'function')('set iterator', function () {
    assert(type(new Set()[Symbol.iterator]()) === 'Set Iterator');
  });

  itIf(setExists && typeof Set.prototype.entries === 'function')('set iterator', function () {
    assert(type(new Set().entries()) === 'Set Iterator');
  });

  itIf(typeof WeakSet === 'function')('weakset', function () {
    assert(type(new WeakSet()) === 'WeakSet');
  });

  itIf(typeof Symbol === 'function')('symbol', function () {
    assert(type(Symbol()) === 'symbol');
  });

  itIf(typeof Promise === 'function')('promise', function () {
    function noop() {}
    assert(type(new Promise(noop)) === 'Promise');
  });

  itIf(typeof Int8Array === 'function')('int8array', function () {
    assert(type(new Int8Array()) === 'Int8Array');
  });

  itIf(typeof Uint8Array === 'function')('uint8array', function () {
    assert(type(new Uint8Array()) === 'Uint8Array');
  });

  itIf(typeof Uint8ClampedArray === 'function')('uint8clampedarray', function () {
    assert(type(new Uint8ClampedArray()) === 'Uint8ClampedArray');
  });

  itIf(typeof Int16Array === 'function')('int16array', function () {
    assert(type(new Int16Array()) === 'Int16Array');
  });

  itIf(typeof Uint16Array === 'function')('uint16array', function () {
    assert(type(new Uint16Array()) === 'Uint16Array');
  });

  itIf(typeof Int32Array === 'function')('int32array', function () {
    assert(type(new Int32Array()) === 'Int32Array');
  });

  itIf(typeof Uint32Array === 'function')('uint32array', function () {
    assert(type(new Uint32Array()) === 'Uint32Array');
  });

  itIf(typeof Float32Array === 'function')('float32array', function () {
    assert(type(new Float32Array()) === 'Float32Array');
  });

  itIf(typeof Float64Array === 'function')('float64array', function () {
    assert(type(new Float64Array()) === 'Float64Array');
  });

  itIf(typeof DataView === 'function')('dataview', function () {
    var arrayBuffer = new ArrayBuffer(1);
    assert(type(new DataView(arrayBuffer)) === 'DataView');
  });

  itIf(typeof ArrayBuffer === 'function')('arraybuffer', function () {
    assert(type(new ArrayBuffer(1)) === 'ArrayBuffer');
  });

  itIf(supportArrows)('arrow function', function () {
    assert(type(eval('() => {}')) === 'function'); // eslint-disable-line no-eval
  });

  itIf(supportGenerators)('generator function', function () {
    assert(type(eval('function * foo () {}; foo')) === 'function'); // eslint-disable-line no-eval
  });

  itIf(supportGenerators)('generator', function () {
    assert(type(eval('(function * foo () {}())')) === 'Generator'); // eslint-disable-line no-eval
  });

});

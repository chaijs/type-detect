'use strict';
var assert = require('simple-assert');
var type = require('..');
var haveSymbols = typeof Symbol === 'function';
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
  itIf(haveSymbols && typeof String.prototype[Symbol.iterator] === 'function')('string iterator', function () {
    assert(type(''[Symbol.iterator]()) === 'string iterator');
  });

  itIf(typeof Array.prototype.entries === 'function')('array iterator', function () {
    assert(type([].entries()) === 'array iterator');
  });

  itIf(typeof Map === 'function')('map', function () {
    assert(type(new Map()) === 'map');
  });

  itIf(typeof Map === 'function')('map iterator', function () {
    assert(type(new Map().entries()) === 'map iterator');
  });

  itIf(typeof WeakMap === 'function')('weakmap', function () {
    assert(type(new WeakMap()) === 'weakmap');
  });

  itIf(typeof Set === 'function')('set', function () {
    assert(type(new Set()) === 'set');
  });

  itIf(typeof Set === 'function')('set iterator', function () {
    assert(type(new Set().entries()) === 'set iterator');
  });

  itIf(typeof WeakSet === 'function')('weakset', function () {
    assert(type(new WeakSet()) === 'weakset');
  });

  itIf(typeof Symbol === 'function')('symbol', function () {
    assert(type(Symbol()) === 'symbol');
  });

  itIf(typeof Promise === 'function')('promise', function () {
    function noop() {}
    assert(type(new Promise(noop)) === 'promise');
  });

  itIf(typeof Int8Array === 'function')('int8array', function () {
    assert(type(new Int8Array()) === 'int8array');
  });

  itIf(typeof Uint8Array === 'function')('uint8array', function () {
    assert(type(new Uint8Array()) === 'uint8array');
  });

  itIf(typeof Uint8ClampedArray === 'function')('uint8clampedarray', function () {
    assert(type(new Uint8ClampedArray()) === 'uint8clampedarray');
  });

  itIf(typeof Int16Array === 'function')('int16array', function () {
    assert(type(new Int16Array()) === 'int16array');
  });

  itIf(typeof Uint16Array === 'function')('uint16array', function () {
    assert(type(new Uint16Array()) === 'uint16array');
  });

  itIf(typeof Int32Array === 'function')('int32array', function () {
    assert(type(new Int32Array()) === 'int32array');
  });

  itIf(typeof Uint32Array === 'function')('uint32array', function () {
    assert(type(new Uint32Array()) === 'uint32array');
  });

  itIf(typeof Float32Array === 'function')('float32array', function () {
    assert(type(new Float32Array()) === 'float32array');
  });

  itIf(typeof Float64Array === 'function')('float64array', function () {
    assert(type(new Float64Array()) === 'float64array');
  });

  itIf(typeof DataView === 'function')('dataview', function () {
    var arrayBuffer = new ArrayBuffer(1);
    assert(type(new DataView(arrayBuffer)) === 'dataview');
  });

  itIf(typeof ArrayBuffer === 'function')('arraybuffer', function () {
    assert(type(new ArrayBuffer(1)) === 'arraybuffer');
  });

  itIf(supportArrows)('arrow function', function () {
    assert(type(eval('() => {}')) === 'function'); // eslint-disable-line no-eval
  });

  itIf(supportGenerators)('generator function', function () {
    assert(type(eval('function * foo () {}; foo')) === 'function'); // eslint-disable-line no-eval
  });

  itIf(supportGenerators)('generator', function () {
    assert(type(eval('(function * foo () {}())')) === 'generator'); // eslint-disable-line no-eval
  });

});

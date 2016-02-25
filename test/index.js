'use strict';
var assert = require('simple-assert');
var type = require('..');
describe('Generic', function () {

  it('array', function () {
    assert(type([]) === 'array');
    assert(type(new Array()) === 'array');
  });

  it('regexp', function () {
    assert(type(/a-z/gi) === 'regexp');
    assert(type(new RegExp('a-z')) === 'regexp');
  });

  it('function', function () {
    assert(type(function () {}) === 'function');
  });

  it('arguments', function () {
    assert(type(arguments) === 'arguments');
  });

  it('date', function () {
    assert(type(new Date()) === 'date');
  });

  it('number', function () {
    assert(type(1) === 'number');
    assert(type(1.234) === 'number');
    assert(type(-1) === 'number');
    assert(type(-1.234) === 'number');
    assert(type(Infinity) === 'number');
    assert(type(NaN) === 'number');
    assert(type(new Number(2)) === 'number');
  });

  it('string', function () {
    assert(type('hello world') === 'string');
    assert(type(new String('hello')) === 'string');
  });

  it('null', function () {
    assert(type(null) === 'null');
    assert(type(undefined) !== 'null');
  });

  it('undefined', function () {
    assert(type(undefined) === 'undefined');
    assert(type(null) !== 'undefined');
  });

  it('object', function () {
    function Noop() {}
    assert(type({}) === 'object');
    assert(type(Noop) !== 'object');
    assert(type(new Noop()) === 'object');
    assert(type(new Object()) === 'object');
  });

  it('boolean', function () {
    assert(type(true) === 'boolean');
    assert(type(false) === 'boolean');
    assert(type(new Boolean()) === 'boolean');
    assert(type(!0) === 'boolean');
  });

  it('error', function () {
    assert(type(new Error()) === 'error');
    assert(type(new TypeError()) === 'error');
    assert(type(new EvalError()) === 'error');
    assert(type(new RangeError()) === 'error');
    assert(type(new ReferenceError()) === 'error');
    assert(type(new SyntaxError()) === 'error');
    assert(type(new TypeError()) === 'error');
    assert(type(new URIError()) === 'error');
  });

  it('Math', function () {
    assert(type(Math) === 'math');
  });

  it('JSON', function () {
    assert(type(JSON) === 'json');
  });

  describe('Stubbed ES2015 Types', function () {
    var originalObjectToString = Object.prototype.toString;
    function stubObjectToStringOnce(staticValue) {
      /* eslint-disable no-extend-native */
      Object.prototype.toString = function () {
        Object.prototype.toString = originalObjectToString;
        return staticValue;
      };
      /* eslint-enable no-extend-native */
    }

    it('map', function () {
      stubObjectToStringOnce('[object Map]');
      assert(type({}) === 'map');
    });

    it('weakmap', function () {
      stubObjectToStringOnce('[object WeakMap]');
      assert(type({}) === 'weakmap');
    });

    it('set', function () {
      stubObjectToStringOnce('[object Set]');
      assert(type({}) === 'set');
    });

    it('weakset', function () {
      stubObjectToStringOnce('[object WeakSet]');
      assert(type({}) === 'weakset');
    });

    it('symbol', function () {
      stubObjectToStringOnce('[object Symbol]');
      assert(type({}) === 'symbol');
    });

    it('promise', function () {
      stubObjectToStringOnce('[object Promise]');
      assert(type({}) === 'promise');
    });

    it('int8array', function () {
      stubObjectToStringOnce('[object Int8Array]');
      assert(type({}) === 'int8array');
    });

    it('uint8array', function () {
      stubObjectToStringOnce('[object Uint8Array]');
      assert(type({}) === 'uint8array');
    });

    it('uint8clampedarray', function () {
      stubObjectToStringOnce('[object Uint8ClampedArray]');
      assert(type({}) === 'uint8clampedarray');
    });

    it('int16array', function () {
      stubObjectToStringOnce('[object Int16Array]');
      assert(type({}) === 'int16array');
    });

    it('uint16array', function () {
      stubObjectToStringOnce('[object Uint16Array]');
      assert(type({}) === 'uint16array');
    });

    it('int32array', function () {
      stubObjectToStringOnce('[object Int32Array]');
      assert(type({}) === 'int32array');
    });

    it('uint32array', function () {
      stubObjectToStringOnce('[object Uint32Array]');
      assert(type({}) === 'uint32array');
    });

    it('float32array', function () {
      stubObjectToStringOnce('[object Float32Array]');
      assert(type({}) === 'float32array');
    });

    it('float64array', function () {
      stubObjectToStringOnce('[object Float64Array]');
      assert(type({}) === 'float64array');
    });

    it('dataview', function () {
      stubObjectToStringOnce('[object DataView]');
      assert(type({}) === 'dataview');
    });

    it('arraybuffer', function () {
      stubObjectToStringOnce('[object ArrayBuffer]');
      assert(type({}) === 'arraybuffer');
    });

    it('generatorfunction', function () {
      stubObjectToStringOnce('[object GeneratorFunction]');
      assert(type({}) === 'generatorfunction');
    });

    it('generator', function () {
      stubObjectToStringOnce('[object Generator]');
      assert(type({}) === 'generator');
    });

    it('string iterator', function () {
      stubObjectToStringOnce('[object String Iterator]');
      assert(type({}) === 'string iterator');
    });

    it('array iterator', function () {
      stubObjectToStringOnce('[object Array Iterator]');
      assert(type({}) === 'array iterator');
    });

    it('map iterator', function () {
      stubObjectToStringOnce('[object Map Iterator]');
      assert(type({}) === 'map iterator');
    });

    it('set iterator', function () {
      stubObjectToStringOnce('[object Set Iterator]');
      assert(type({}) === 'set iterator');
    });

  });

});

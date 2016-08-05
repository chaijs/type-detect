'use strict';
var assert = require('simple-assert');
var type = require('..');
function itIf(condition) {
  return condition ? it : it.skip;
}

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
    assert(type(Object.create(null)) === 'object');
    assert(type(Object.create(Object.prototype)) === 'object');
  });

  // See: https://github.com/chaijs/type-detect/pull/25
  it('object with .undefined property getter', function () {
    var foo = {};
    Object.defineProperty(foo, 'undefined', {
      get: function () {
        throw Error('Should never happen');
      },
    });
    assert(type(foo) === 'object');
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
      Object.prototype.toString = function () {  // eslint-disable-line no-extend-native
        Object.prototype.toString = originalObjectToString;  // eslint-disable-line no-extend-native
        return staticValue;
      };
    }
    function Thing() {}

    it('map', function () {
      stubObjectToStringOnce('[object Map]');
      assert(type(new Thing()) === 'map');
    });

    it('weakmap', function () {
      stubObjectToStringOnce('[object WeakMap]');
      assert(type(new Thing()) === 'weakmap');
    });

    it('set', function () {
      stubObjectToStringOnce('[object Set]');
      assert(type(new Thing()) === 'set');
    });

    it('weakset', function () {
      stubObjectToStringOnce('[object WeakSet]');
      assert(type(new Thing()) === 'weakset');
    });

    it('symbol', function () {
      stubObjectToStringOnce('[object Symbol]');
      assert(type(new Thing()) === 'symbol');
    });

    it('promise', function () {
      stubObjectToStringOnce('[object Promise]');
      assert(type(new Thing()) === 'promise');
    });

    it('int8array', function () {
      stubObjectToStringOnce('[object Int8Array]');
      assert(type(new Thing()) === 'int8array');
    });

    it('uint8array', function () {
      stubObjectToStringOnce('[object Uint8Array]');
      assert(type(new Thing()) === 'uint8array');
    });

    it('uint8clampedarray', function () {
      stubObjectToStringOnce('[object Uint8ClampedArray]');
      assert(type(new Thing()) === 'uint8clampedarray');
    });

    it('int16array', function () {
      stubObjectToStringOnce('[object Int16Array]');
      assert(type(new Thing()) === 'int16array');
    });

    it('uint16array', function () {
      stubObjectToStringOnce('[object Uint16Array]');
      assert(type(new Thing()) === 'uint16array');
    });

    it('int32array', function () {
      stubObjectToStringOnce('[object Int32Array]');
      assert(type(new Thing()) === 'int32array');
    });

    it('uint32array', function () {
      stubObjectToStringOnce('[object Uint32Array]');
      assert(type(new Thing()) === 'uint32array');
    });

    it('float32array', function () {
      stubObjectToStringOnce('[object Float32Array]');
      assert(type(new Thing()) === 'float32array');
    });

    it('float64array', function () {
      stubObjectToStringOnce('[object Float64Array]');
      assert(type(new Thing()) === 'float64array');
    });

    it('dataview', function () {
      stubObjectToStringOnce('[object DataView]');
      assert(type(new Thing()) === 'dataview');
    });

    it('arraybuffer', function () {
      stubObjectToStringOnce('[object ArrayBuffer]');
      assert(type(new Thing()) === 'arraybuffer');
    });

    it('generatorfunction', function () {
      stubObjectToStringOnce('[object GeneratorFunction]');
      assert(type(new Thing()) === 'generatorfunction');
    });

    it('generator', function () {
      stubObjectToStringOnce('[object Generator]');
      assert(type(new Thing()) === 'generator');
    });

    it('string iterator', function () {
      stubObjectToStringOnce('[object String Iterator]');
      assert(type(new Thing()) === 'string iterator');
    });

    it('array iterator', function () {
      stubObjectToStringOnce('[object Array Iterator]');
      assert(type(new Thing()) === 'array iterator');
    });

    it('map iterator', function () {
      stubObjectToStringOnce('[object Map Iterator]');
      assert(type(new Thing()) === 'map iterator');
    });

    it('set iterator', function () {
      stubObjectToStringOnce('[object Set Iterator]');
      assert(type(new Thing()) === 'set iterator');
    });

  });

  describe('@@toStringTag Sham', function () {
    var originalObjectToString = Object.prototype.toString;
    before(function () {
      global.Symbol = global.Symbol || {};
      if (!global.Symbol.toStringTag) {
        global.Symbol.toStringTag = '__@@toStringTag__';
      }
      var test = {};
      test[Symbol.toStringTag] = function () {
        return 'foo';
      };
      if (Object.prototype.toString(test) !== '[object foo]') {
        Object.prototype.toString = function () { // eslint-disable-line no-extend-native
          if (typeof this === 'object' && typeof this[Symbol.toStringTag] === 'function') {
            return '[object ' + this[Symbol.toStringTag]() + ']';
          }
          return originalObjectToString.call(this);
        };
      }

      // ensure type-detect recognizes global toStringTag sham
      if (typeof require.resolve === 'function') {
        delete require.cache[require.resolve('../')];
        type = require('../'); // eslint-disable-line global-require
      }
    });

    after(function () {
      Object.prototype.toString = originalObjectToString; // eslint-disable-line no-extend-native
      if (typeof require.resolve === 'function') {
        delete require.cache[require.resolve('../')];
        type = require('../'); // eslint-disable-line global-require
      }
    });

    it('plain object', function () {
      var obj = {};
      obj[Symbol.toStringTag] = function () {
        return 'Foo';
      };
      assert(type(obj) === 'foo', 'type(obj) === "foo"');
    });

    var extendedArraySupported = false;
    var extendedArrayBody = [
      'class ExtendedArray extends Array {',
      '  [Symbol.toStringTag]() {',
      '    return "ExtendedArray";',
      '  }',
      '}',
    ].join('\n');
    try {
      eval(extendedArrayBody); // eslint-disable-line no-eval
      extendedArraySupported = true;
    } catch (error) {
      extendedArraySupported = false;
    }

    itIf(extendedArraySupported)('extended array', function () {
      var extendedArray = eval(extendedArrayBody + ' new ExtendedArray()'); // eslint-disable-line no-eval
      assert(type(extendedArray) === 'extendedarray', 'type(new ExtendedArray()) === "extendedarray"');
    });

  });

});

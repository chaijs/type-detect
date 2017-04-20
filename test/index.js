'use strict';

var assert = require('simple-assert');
var type = require('..');
describe('Generic', function () {

  it('array', function () {
    assert(type([]) === 'Array');
    assert(type(new Array()) === 'Array');
  });

  it('regexp', function () {
    assert(type(/a-z/gi) === 'RegExp');
    assert(type(new RegExp('a-z')) === 'RegExp');
  });

  it('function', function () {
    assert(type(function () {}) === 'function');
  });

  it('arguments', function () {
    assert(type(arguments) === 'Arguments');
  });

  it('date', function () {
    assert(type(new Date()) === 'Date');
  });

  it('number', function () {
    assert(type(1) === 'number');
    assert(type(1.234) === 'number');
    assert(type(-1) === 'number');
    assert(type(-1.234) === 'number');
    assert(type(Infinity) === 'number');
    assert(type(NaN) === 'number');
  });

  it('number objects', function () {
    assert(type(new Number(2)) === 'Number');
  });

  it('string', function () {
    assert(type('hello world') === 'string');
  });

  it('string objects', function () {
    assert(type(new String('hello')) === 'String');
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
    assert(type({}) === 'Object');
    assert(type(Noop) !== 'Object');
    assert(type(new Noop()) === 'Object');
    assert(type(new Object()) === 'Object');
    assert(type(Object.create(null)) === 'Object');
    assert(type(Object.create(Object.prototype)) === 'Object');
  });

  // See: https://github.com/chaijs/type-detect/pull/25
  it('object with .undefined property getter', function () {
    var foo = {};
    Object.defineProperty(foo, 'undefined', {
      get: function () {
        throw Error('Should never happen');
      },
    });
    assert(type(foo) === 'Object');
  });

  it('boolean', function () {
    assert(type(true) === 'boolean');
    assert(type(false) === 'boolean');
    assert(type(!0) === 'boolean');
  });

  it('boolean object', function () {
    assert(type(new Boolean()) === 'Boolean');
  });

  it('error', function () {
    assert(type(new Error()) === 'Error');
    assert(type(new TypeError()) === 'Error');
    assert(type(new EvalError()) === 'Error');
    assert(type(new RangeError()) === 'Error');
    assert(type(new ReferenceError()) === 'Error');
    assert(type(new SyntaxError()) === 'Error');
    assert(type(new TypeError()) === 'Error');
    assert(type(new URIError()) === 'Error');
  });

  it('Math', function () {
    assert(type(Math) === 'Math');
  });

  it('JSON', function () {
    assert(type(JSON) === 'JSON');
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
      assert(type(new Thing()) === 'Map');
    });

    it('weakmap', function () {
      stubObjectToStringOnce('[object WeakMap]');
      assert(type(new Thing()) === 'WeakMap');
    });

    it('set', function () {
      stubObjectToStringOnce('[object Set]');
      assert(type(new Thing()) === 'Set');
    });

    it('weakset', function () {
      stubObjectToStringOnce('[object WeakSet]');
      assert(type(new Thing()) === 'WeakSet');
    });

    it('symbol', function () {
      stubObjectToStringOnce('[object Symbol]');
      assert(type(new Thing()) === 'Symbol');
    });

    it('promise', function () {
      stubObjectToStringOnce('[object Promise]');
      assert(type(new Thing()) === 'Promise');
    });

    it('int8array', function () {
      stubObjectToStringOnce('[object Int8Array]');
      assert(type(new Thing()) === 'Int8Array');
    });

    it('uint8array', function () {
      stubObjectToStringOnce('[object Uint8Array]');
      assert(type(new Thing()) === 'Uint8Array');
    });

    it('uint8clampedarray', function () {
      stubObjectToStringOnce('[object Uint8ClampedArray]');
      assert(type(new Thing()) === 'Uint8ClampedArray');
    });

    it('int16array', function () {
      stubObjectToStringOnce('[object Int16Array]');
      assert(type(new Thing()) === 'Int16Array');
    });

    it('uint16array', function () {
      stubObjectToStringOnce('[object Uint16Array]');
      assert(type(new Thing()) === 'Uint16Array');
    });

    it('int32array', function () {
      stubObjectToStringOnce('[object Int32Array]');
      assert(type(new Thing()) === 'Int32Array');
    });

    it('uint32array', function () {
      stubObjectToStringOnce('[object Uint32Array]');
      assert(type(new Thing()) === 'Uint32Array');
    });

    it('float32array', function () {
      stubObjectToStringOnce('[object Float32Array]');
      assert(type(new Thing()) === 'Float32Array');
    });

    it('float64array', function () {
      stubObjectToStringOnce('[object Float64Array]');
      assert(type(new Thing()) === 'Float64Array');
    });

    it('dataview', function () {
      stubObjectToStringOnce('[object DataView]');
      assert(type(new Thing()) === 'DataView');
    });

    it('arraybuffer', function () {
      stubObjectToStringOnce('[object ArrayBuffer]');
      assert(type(new Thing()) === 'ArrayBuffer');
    });

    it('generatorfunction', function () {
      stubObjectToStringOnce('[object GeneratorFunction]');
      assert(type(new Thing()) === 'GeneratorFunction');
    });

    it('generator', function () {
      stubObjectToStringOnce('[object Generator]');
      assert(type(new Thing()) === 'Generator');
    });

    it('string iterator', function () {
      stubObjectToStringOnce('[object String Iterator]');
      assert(type(new Thing()) === 'String Iterator');
    });

    it('array iterator', function () {
      stubObjectToStringOnce('[object Array Iterator]');
      assert(type(new Thing()) === 'Array Iterator');
    });

    it('map iterator', function () {
      stubObjectToStringOnce('[object Map Iterator]');
      assert(type(new Thing()) === 'Map Iterator');
    });

    it('set iterator', function () {
      stubObjectToStringOnce('[object Set Iterator]');
      assert(type(new Thing()) === 'Set Iterator');
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
    });

    after(function () {
      Object.prototype.toString = originalObjectToString; // eslint-disable-line no-extend-native
    });


    it('plain object', function () {
      var obj = {};
      obj[Symbol.toStringTag] = function () {
        return 'Foo';
      };
      assert(type(obj) === 'Foo', 'type(obj) === "Foo"');
    });

  });

});

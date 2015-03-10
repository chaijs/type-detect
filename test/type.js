describe('type(obj)', function () {
  it('array', function () {
    assert('array' === type([]));
    assert('array' === type(new Array()));
  });

  it('regexp', function () {
    assert('regexp' === type(/a-z/gi));
    assert('regexp' === type(new RegExp('a-z')));
  });

  it('function', function () {
    assert('function' === type(function () {
    }));
  });

  it('arguments', function () {
    (function () {
      assert('arguments' === type(arguments));
    })();
  });

  it('date', function () {
    assert('date' === type(new Date));
  });

  it('number', function () {
    assert('number' === type(1));
    assert('number' === type(1.234));
    assert('number' === type(-1));
    assert('number' === type(-1.234));
    assert('number' === type(Infinity));
    assert('number' === type(NaN));
  });

  it('string', function () {
    assert('string' === type('hello world'));
  });

  it('null', function () {
    assert('null' === type(null));
    assert('null' !== type(undefined));
  });

  it('undefined', function () {
    assert('undefined' === type(undefined));
    assert('undefined' !== type(null));
  });

  it('object', function () {
    var Noop = function () {
    };
    assert('object' === type({}));
    assert('object' !== type(Noop));
    assert('object' === type(new Noop));
    assert('object' === type(new Object));
    assert('object' === type(new String('hello')));
  });

  describe('New ECMA6 Types', function () {
    it('map', function () {
      stubToStringMethod('[object Map]');
      assert('map' === type({}));
    });

    it('weakmap', function () {
      stubToStringMethod('[object WeakMap]');
      assert('weakmap' === type({}));
    });

    it('set', function () {
      stubToStringMethod('[object Set]');
      assert('set' === type({}));
    });

    it('weakset', function () {
      stubToStringMethod('[object WeakSet]');
      assert('weakset' === type({}));
    });

    it('symbol', function () {
      stubToStringMethod('[object Symbol]');
      assert('symbol' === type({}));
    });

    it('promise', function () {
      stubToStringMethod('[object Promise]');
      assert('promise' === type({}));
    });

    it('int8array', function () {
      stubToStringMethod('[object Int8Array]');
      assert('int8array' === type({}));
    });

    it('uint8array', function () {
      stubToStringMethod('[object Uint8Array]');
      assert('uint8array' === type({}));
    });

    it('uint8clampedarray', function () {
      stubToStringMethod('[object Uint8ClampedArray]');
      assert('uint8clampedarray' === type({}));
    });

    it('int16array', function () {
      stubToStringMethod('[object Int16Array]');
      assert('int16array' === type({}));
    });

    it('uint16array', function () {
      stubToStringMethod('[object Uint16Array]');
      assert('uint16array' === type({}));
    });

    it('int32array', function () {
      stubToStringMethod('[object Int32Array]');
      assert('int32array' === type({}));
    });

    it('uint32array', function () {
      stubToStringMethod('[object Uint32Array]');
      assert('uint32array' === type({}));
    });

    it('float32array', function () {
      stubToStringMethod('[object Float32Array]');
      assert('float32array' === type({}));
    });

    it('float64array', function () {
      stubToStringMethod('[object Float64Array]');
      assert('float64array' === type({}));
    });

    it('dataview', function () {
      stubToStringMethod('[object DataView]');
      assert('dataview' === type({}));
    });

    var originalObjectToString = Object.prototype.toString;

    function stubToStringMethod(staticValue) {
      Object.prototype.toString = function () {
        Object.prototype.toString = originalObjectToString;
        return staticValue;
      };
    }
  });
});

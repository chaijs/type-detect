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

  describe('ECMA6 Types', function () {
    it('map', function () {
      stubToString('[object Map]');
      assert('map' === type({}));
    });

    it('weakmap', function () {
      stubToString('[object WeakMap]');
      assert('weakmap' === type({}));
    });

    it('set', function () {
      stubToString('[object Set]');
      assert('set' === type({}));
    });

    it('weakset', function () {
      stubToString('[object WeakSet]');
      assert('weakset' === type({}));
    });

    it('symbol', function () {
      stubToString('[object Symbol]');
      assert('symbol' === type({}));
    });

    it('promise', function () {
      stubToString('[object Promise]');
      assert('promise' === type({}));
    });

    it('int8array', function () {
      stubToString('[object Int8Array]');
      assert('int8array' === type({}));
    });

    it('uint8array', function () {
      stubToString('[object Uint8Array]');
      assert('uint8array' === type({}));
    });

    it('uint8clampedarray', function () {
      stubToString('[object Uint8ClampedArray]');
      assert('uint8clampedarray' === type({}));
    });

    it('int16array', function () {
      stubToString('[object Int16Array]');
      assert('int16array' === type({}));
    });

    it('uint16array', function () {
      stubToString('[object Uint16Array]');
      assert('uint16array' === type({}));
    });

    it('int32array', function () {
      stubToString('[object Int32Array]');
      assert('int32array' === type({}));
    });

    it('uint32array', function () {
      stubToString('[object Uint32Array]');
      assert('uint32array' === type({}));
    });

    it('float32array', function () {
      stubToString('[object Float32Array]');
      assert('float32array' === type({}));
    });

    it('float64array', function () {
      stubToString('[object Float64Array]');
      assert('float64array' === type({}));
    });

    it('dataview', function () {
      stubToString('[object DataView]');
      assert('dataview' === type({}));
    });

    var originalObjectToString;
    beforeEach(function () {
      originalObjectToString = Object.prototype.toString;
    });
    afterEach(function () {
      Object.prototype.toString = originalObjectToString;
    });

    function stubToString(staticValue) {
      Object.prototype.toString = function () {
        return staticValue;
      };
    }
  });
});

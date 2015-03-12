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
    assert('function' === type(function () {}));
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
    var Noop = function () {};
    assert('object' === type({}));
    assert('object' !== type(Noop));
    assert('object' === type(new Noop));
    assert('object' === type(new Object));
    assert('object' === type(new String('hello')));
  });

  describe('New ECMA6 Types Stubbed', function () {
    var originalObjectToString = Object.prototype.toString;

    function stubObjectToStringOnce(staticValue) {
      Object.prototype.toString = function () {
        Object.prototype.toString = originalObjectToString;
        return staticValue;
      };
    }

    it('map', function () {
      stubObjectToStringOnce('[object Map]');
      assert('map' === type({}));
    });

    it('weakmap', function () {
      stubObjectToStringOnce('[object WeakMap]');
      assert('weakmap' === type({}));
    });

    it('set', function () {
      stubObjectToStringOnce('[object Set]');
      assert('set' === type({}));
    });

    it('weakset', function () {
      stubObjectToStringOnce('[object WeakSet]');
      assert('weakset' === type({}));
    });

    it('symbol', function () {
      stubObjectToStringOnce('[object Symbol]');
      assert('symbol' === type({}));
    });

    it('promise', function () {
      stubObjectToStringOnce('[object Promise]');
      assert('promise' === type({}));
    });

    it('int8array', function () {
      stubObjectToStringOnce('[object Int8Array]');
      assert('int8array' === type({}));
    });

    it('uint8array', function () {
      stubObjectToStringOnce('[object Uint8Array]');
      assert('uint8array' === type({}));
    });

    it('uint8clampedarray', function () {
      stubObjectToStringOnce('[object Uint8ClampedArray]');
      assert('uint8clampedarray' === type({}));
    });

    it('int16array', function () {
      stubObjectToStringOnce('[object Int16Array]');
      assert('int16array' === type({}));
    });

    it('uint16array', function () {
      stubObjectToStringOnce('[object Uint16Array]');
      assert('uint16array' === type({}));
    });

    it('int32array', function () {
      stubObjectToStringOnce('[object Int32Array]');
      assert('int32array' === type({}));
    });

    it('uint32array', function () {
      stubObjectToStringOnce('[object Uint32Array]');
      assert('uint32array' === type({}));
    });

    it('float32array', function () {
      stubObjectToStringOnce('[object Float32Array]');
      assert('float32array' === type({}));
    });

    it('float64array', function () {
      stubObjectToStringOnce('[object Float64Array]');
      assert('float64array' === type({}));
    });

    it('dataview', function () {
      stubObjectToStringOnce('[object DataView]');
      assert('dataview' === type({}));
    });

    it('arraybuffer', function () {
      stubObjectToStringOnce('[object ArrayBuffer]');
      assert('arraybuffer' === type({}));
    });
  });

  describe('New ECMA6 Types Conditional', function () {
    if (typeof Map === 'function') {
      it('map', function () {
        assert('map' === type(new Map()));
      });
    }

    if (typeof WeakMap === 'function') {
      it('weakmap', function () {
        assert('weakmap' === type(new WeakMap()));
      });
    }

    if (typeof Set === 'function') {
      it('set', function () {
        assert('set' === type(new Set()));
      });
    }

    if (typeof WeakSet === 'function') {
      it('weakset', function () {
        assert('weakset' === type(new WeakSet()));
      });
    }

    if (typeof Symbol === 'function') {
      it('symbol', function () {
        assert('symbol' === type(Symbol()));
      });
    }

    if (typeof Int8Array === 'function') {
      it('int8array', function () {
        assert('int8array' === type(new Int8Array()));
      });
    }

    if (typeof Uint8Array === 'function') {
      it('uint8array', function () {
        assert('uint8array' === type(new Uint8Array()));
      });
    }

    if (typeof Uint8ClampedArray === 'function') {
      it('uint8clampedarray', function () {
        assert('uint8clampedarray' === type(new Uint8ClampedArray()));
      });
    }

    if (typeof Int16Array === 'function') {
      it('int16array', function () {
        assert('int16array' === type(new Int16Array()));
      });
    }

    if (typeof Uint16Array === 'function') {
      it('uint16array', function () {
        assert('uint16array' === type(new Uint16Array()));
      });
    }

    if (typeof Int32Array === 'function') {
      it('int32array', function () {
        assert('int32array' === type(new Int32Array()));
      });
    }

    if (typeof Uint32Array === 'function') {
      it('uint32array', function () {
        assert('uint32array' === type(new Uint32Array()));
      });
    }

    if (typeof Float32Array === 'function') {
      it('float32array', function () {
        assert('float32array' === type(new Float32Array()));
      });
    }

    if (typeof Float64Array === 'function') {
      it('float64array', function () {
        assert('float64array' === type(new Float64Array()));
      });
    }

    if (typeof DataView === 'function') {
      it('dataview', function () {
        var arrayBuffer = new ArrayBuffer();
        assert('dataview' === type(new DataView(arrayBuffer)));
      });
    }

    if (typeof ArrayBuffer === 'function') {
      it('arraybuffer', function () {
        assert('arraybuffer' === type(new ArrayBuffer()));
      });
    }
  })
});

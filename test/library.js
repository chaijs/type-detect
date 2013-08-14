describe('new Library', function () {
  it('should detect primatives', function () {
    var lib = new type.Library;
    var tests = {
        'array': []
      , 'string': 'hello universe'
      , 'number': 1
      , 'boolean': true
      , 'regexp': /a\//g
      , 'undefined': undefined
      , 'null': null
      , 'function': function () {}
    };

    for (var key in tests) {
      assert(lib.test(tests[key], key));
    }
  });

  it('should detect custom regexp tests', function () {
    var lib = new type.Library;
    lib.define('int', /^[0-9]+$/);
    assert(lib.test('1', 'int'));
    assert(lib.test(1, 'int'));
    assert.not(lib.test('a', 'int'));
  });

  it('should detect custom function tests', function () {
    var lib = new type.Library;
    lib.define('bln', function (obj) {
      if ('boolean' === type(obj)) return true;
      var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
      if ('string' === type(obj)) obj = obj.toLowerCase();
      return !! ~blns.indexOf(obj);
    });

    assert(lib.test(true, 'bln'));
    assert(lib.test(false, 'bln'));
    assert(lib.test('yes', 'bln'));
    assert(lib.test('no', 'bln'));
    assert(lib.test('true', 'bln'));
    assert(lib.test('False', 'bln'));
    assert(lib.test(0, 'bln'));
    assert(lib.test(1, 'bln'));
    assert.not(lib.test(2, 'bln'));
    assert.not(lib.test('nope', 'bln'));
  });

  it('should throw when test not defined', function () {
    var lib = new type.Library;
    var thrown = false;
    try {
      lib.test(true, 'bln');
    } catch (ex) {
      thrown = true;
      assert(ex);
      assert(ex instanceof ReferenceError);
    }

    assert(thrown);
  });
});

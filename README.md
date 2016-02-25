# type-detect [![Build Status](https://travis-ci.org/chaijs/type-detect.png?branch=master)](https://travis-ci.org/chaijs/type-detect) [![Coverage Status](https://coveralls.io/repos/chaijs/type-detect/badge.png?branch=master)](https://coveralls.io/r/chaijs/type-detect?branch=master)

> Improved typeof detection for node.js and the browser.

## Installation

### Node.js

`type-detect` is available on [npm](http://npmjs.org).

    $ npm install type-detect

## Usage

### Primary

The primary export of `type-detect` is function that can server as a replacement for
`typeof`. The results of this function will be more specific than that of native `typeof`.

```js
var type = require('type-detect');
```

#### array

```js
assert(type([]) === 'array');
assert(type(new Array()) === 'array');
```

#### regexp

```js
assert(type(/a-z/gi) === 'regexp');
assert(type(new RegExp('a-z')) === 'regexp');
```

#### function

```js
assert(type(function () {}) === 'function');
```

#### arguments

```js
(function () {
  assert(type(arguments) === 'arguments');
})();
```

#### date

```js
assert(type(new Date) === 'date');
```

#### number

```js
assert(type(1) === 'number');
assert(type(1.234) === 'number');
assert(type(-1) === 'number');
assert(type(-1.234) === 'number');
assert(type(Infinity) === 'number');
assert(type(NaN) === 'number');
assert(type(new Number(1)) === 'number');
```

#### string

```js
assert(type('hello world') === 'string');
assert(type(new String('hello')) === 'string');
```

#### null

```js
assert(type(null) === 'null');
assert(type(undefined) !== 'null');
```

#### undefined

```js
assert(type(undefined) === 'undefined');
assert(type(null) !== 'undefined');
```

#### object

```js
var Noop = function () {};
assert(type({}) === 'object');
assert(type(Noop) !== 'object');
assert(type(new Noop) === 'object');
assert(type(new Object) === 'object');
```

#### ECMA6 Types

Supports all ECMA6 Types:

```js
assert(type(new Map() === 'map');
assert(type(new WeakMap()) === 'weakmap');
assert(type(new Set()) === 'set');
assert(type(new WeakSet()) === 'weakset');
assert(type(Symbol()) === 'symbol');
assert(type(new Promise(callback) === 'promise');
assert(type(new Int8Array()) === 'int8array');
assert(type(new Uint8Array()) === 'uint8array');
assert(type(new UInt8ClampedArray()) === 'uint8clampedarray');
assert(type(new Int16Array()) === 'int16array');
assert(type(new Uint16Array()) === 'uint16array');
assert(type(new Int32Array()) === 'int32array');
assert(type(new UInt32Array()) === 'uint32array');
assert(type(new Float32Array()) === 'float32array');
assert(type(new Float64Array()) === 'float64array');
assert(type(new ArrayBuffer()) === 'arraybuffer');
assert(type(new DataView(arrayBuffer)) === 'dataview');
```

If you use `Symbol.toStringTag` to change an Objects return value of the `toString()` Method, `type()` will return this value, e.g:

```js
var myObject = {};
myObject[Symbol.toStringTag] = 'myCustomType';
assert(type(myObject) === 'myCustomType');
```

## License

(The MIT License)

Copyright (c) 2013 Jake Luer <jake@alogicalparadox.com> (http://alogicalparadox.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

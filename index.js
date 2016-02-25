'use strict';
/* globals Promise: false */
/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var isPrototypeOfExists = typeof Object.getPrototypeOf === 'function';
var promiseExists = typeof Promise === 'function';
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
module.exports = function typeDetect(obj) {
  /* ! Spec Conformance
   * ES5$15.2.4.2 (ES6$19.1.3.6) - Object.prototype.toString returns "[object Null]" for null object
   * Test: `Object.prototype.toString.call(null)``
   *  - PhantomJS 1.x == "[object DOMWindow]" (https://github.com/ariya/phantomjs/issues/13617)
   *  - IE <=8  == "[object Object]"
  */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * ES5$15.2.4.2 (ES6$19.1.3.6) - Object.prototype.toString returns "[object Undefined]" for undefined object
   * Test: `Object.prototype.toString.call(undefined)``
   *  - PhantomJS 1.x == "[object DOMWindow]" (https://github.com/ariya/phantomjs/issues/11722)
   *  - IE <=8  == "[object Object]"
   */
  if (obj === undefined) { // eslint-disable-line no-undefined
    return 'undefined';
  }

  /* ! Spec Conformance
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
  */
  if (promiseExists && isPrototypeOfExists && Object.getPrototypeOf(obj) === Promise.prototype) {
    return 'promise';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength)
    .toLowerCase();
};

module.exports.typeDetect = module.exports;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(74);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(109)();

	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    Message = __webpack_require__(3);

	React.render(React.createElement(Message, null), document.getElementById('content'));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var Message = React.createClass({displayName: "Message",
	  render: function() {
	    return (
	      React.createElement("h1", null, "some message")
	    );
	  }
	});

	module.exports = Message;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	var gutil = __webpack_require__(6);
	var through = __webpack_require__(9);
	var react = __webpack_require__(10);
	var objectAssign = __webpack_require__(7);
	var applySourceMap = __webpack_require__(8);

	module.exports = function (opts) {
		opts = opts || {};

		return through.obj(function (file, enc, cb) {
			if (file.isNull()) {
				cb(null, file);
				return;
			}

			if (file.isStream()) {
				cb(new gutil.PluginError('gulp-react', 'Streaming not supported'));
				return;
			}

			try {
				if (file.sourceMap) {
					opts = objectAssign(opts, {
						sourceMap: true,
						sourceFilename: file.relative
					});
				}

				var res = react.transformWithDetails(file.contents.toString(), opts);

				file.contents = new Buffer(res.code);
				file.path = gutil.replaceExtension(file.path, '.js');

				if (res.sourceMap && file.sourceMap) {
					applySourceMap(file, res.sourceMap);
				}

				this.push(file);
			} catch (err) {
				this.emit('error', new gutil.PluginError('gulp-react', err, {
					fileName: file.path
				}));
			}

			cb();
		});
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(31)
	var ieee754 = __webpack_require__(23)
	var isArray = __webpack_require__(24)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff
	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = String(string)

	  if (string.length === 0) return 0

	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      return string.length
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return string.length * 2
	    case 'hex':
	      return string.length >>> 1
	    case 'utf8':
	    case 'utf-8':
	      return utf8ToBytes(string).length
	    case 'base64':
	      return base64ToBytes(string).length
	    default:
	      return string.length
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function toString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  File: __webpack_require__(25),
	  replaceExtension: __webpack_require__(26),
	  colors: __webpack_require__(27),
	  date: __webpack_require__(32),
	  log: __webpack_require__(11),
	  template: __webpack_require__(12),
	  env: __webpack_require__(13),
	  beep: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"beeper\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	  noop: __webpack_require__(14),
	  isStream: __webpack_require__(15),
	  isBuffer: __webpack_require__(16),
	  isNull: __webpack_require__(17),
	  linefeed: '\n',
	  combine: __webpack_require__(18),
	  buffer: __webpack_require__(19),
	  PluginError: __webpack_require__(20)
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var SourceMapGenerator = __webpack_require__(34).SourceMapGenerator;
	var SourceMapConsumer = __webpack_require__(34).SourceMapConsumer;

	module.exports = function applySourceMap(file, sourceMap) {
	  if (typeof sourceMap === 'string' || sourceMap instanceof String) {
	    sourceMap = JSON.parse(sourceMap);
	  }

	  // check source map properties
	  assertProperty(sourceMap, "file");
	  assertProperty(sourceMap, "mappings");
	  assertProperty(sourceMap, "sources");
	  
	  // fix paths if Windows style paths
	  sourceMap.file = sourceMap.file.replace(/\\/g, '/');
	  sourceMap.sources = sourceMap.sources.map(function(filePath) {
	    return filePath.replace(/\\/g, '/');
	  });

	  if (file.sourceMap) {
	    var generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(sourceMap));
	    generator.applySourceMap(new SourceMapConsumer(file.sourceMap));
	    file.sourceMap = JSON.parse(generator.toString());
	  } else {
	    file.sourceMap = sourceMap;
	  }
	};

	function assertProperty(sourceMap, propertyName) {
	  if (!sourceMap.hasOwnProperty(propertyName)) {
	    var e = new Error('Source map to be applied is missing the \"' + propertyName + '\" property');
	    throw e;
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Transform = __webpack_require__(35)
	  , inherits  = __webpack_require__(29).inherits
	  , xtend     = __webpack_require__(36)

	function DestroyableTransform(opts) {
	  Transform.call(this, opts)
	  this._destroyed = false
	}

	inherits(DestroyableTransform, Transform)

	DestroyableTransform.prototype.destroy = function(err) {
	  if (this._destroyed) return
	  this._destroyed = true
	  
	  var self = this
	  process.nextTick(function() {
	    if (err)
	      self.emit('error', err)
	    self.emit('close')
	  })
	}

	// a noop _transform function
	function noop (chunk, enc, callback) {
	  callback(null, chunk)
	}


	// create a new export function, used by both the main export and
	// the .ctor export, contains common logic for dealing with arguments
	function through2 (construct) {
	  return function (options, transform, flush) {
	    if (typeof options == 'function') {
	      flush     = transform
	      transform = options
	      options   = {}
	    }

	    if (typeof transform != 'function')
	      transform = noop

	    if (typeof flush != 'function')
	      flush = null

	    return construct(options, transform, flush)
	  }
	}


	// main export, just make me a transform stream!
	module.exports = through2(function (options, transform, flush) {
	  var t2 = new DestroyableTransform(options)

	  t2._transform = transform

	  if (flush)
	    t2._flush = flush

	  return t2
	})


	// make me a reusable prototype that I can `new`, or implicitly `new`
	// with a constructor call
	module.exports.ctor = through2(function (options, transform, flush) {
	  function Through2 (override) {
	    if (!(this instanceof Through2))
	      return new Through2(override)

	    this.options = xtend(options, override)

	    DestroyableTransform.call(this, this.options)
	  }

	  inherits(Through2, DestroyableTransform)

	  Through2.prototype._transform = transform

	  if (flush)
	    Through2.prototype._flush = flush

	  return Through2
	})


	module.exports.obj = through2(function (options, transform, flush) {
	  var t2 = new DestroyableTransform(xtend({ objectMode: true, highWaterMark: 16 }, options))

	  t2._transform = transform

	  if (flush)
	    t2._flush = flush

	  return t2
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';
	/*eslint-disable no-undef*/
	var visitors = __webpack_require__(21);
	var transform = __webpack_require__(37).transform;
	var typesSyntax = __webpack_require__(33);
	var inlineSourceMap = __webpack_require__(22);

	module.exports = {
	  transform: function(input, options) {
	    options = processOptions(options);
	    var output = innerTransform(input, options);
	    var result = output.code;
	    if (options.sourceMap) {
	      var map = inlineSourceMap(
	        output.sourceMap,
	        input,
	        options.filename
	      );
	      result += '\n' + map;
	    }
	    return result;
	  },
	  transformWithDetails: function(input, options) {
	    options = processOptions(options);
	    var output = innerTransform(input, options);
	    var result = {};
	    result.code = output.code;
	    if (options.sourceMap) {
	      result.sourceMap = output.sourceMap.toJSON();
	    }
	    if (options.filename) {
	      result.sourceMap.sources = [options.filename];
	    }
	    return result;
	  }
	};

	/**
	 * Only copy the values that we need. We'll do some preprocessing to account for
	 * converting command line flags to options that jstransform can actually use.
	 */
	function processOptions(opts) {
	  opts = opts || {};
	  var options = {};

	  options.harmony = opts.harmony;
	  options.stripTypes = opts.stripTypes;
	  options.sourceMap = opts.sourceMap;
	  options.filename = opts.sourceFilename;

	  if (opts.es6module) {
	    options.sourceType = 'module';
	  }
	  if (opts.nonStrictEs6module) {
	    options.sourceType = 'nonStrictModule';
	  }

	  // Instead of doing any fancy validation, only look for 'es3'. If we have
	  // that, then use it. Otherwise use 'es5'.
	  options.es3 = opts.target === 'es3';
	  options.es5 = !options.es3;

	  return options;
	}

	function innerTransform(input, options) {
	  var visitorSets = ['react'];
	  if (options.harmony) {
	    visitorSets.push('harmony');
	  }

	  if (options.es3) {
	    visitorSets.push('es3');
	  }

	  if (options.stripTypes) {
	    // Stripping types needs to happen before the other transforms
	    // unfortunately, due to bad interactions. For example,
	    // es6-rest-param-visitors conflict with stripping rest param type
	    // annotation
	    input = transform(typesSyntax.visitorList, input, options).code;
	  }

	  var visitorList = visitors.getVisitorsBySet(visitorSets);
	  return transform(visitorList, input, options);
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var chalk = __webpack_require__(27);
	var dateformat = __webpack_require__(32);

	module.exports = function(){
	  var time = '['+chalk.grey(dateformat(new Date(), 'HH:MM:ss'))+']';
	  var args = Array.prototype.slice.call(arguments);
	  args.unshift(time);
	  console.log.apply(console, args);
	  return this;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var template = __webpack_require__(50);
	var reEscape = __webpack_require__(52);
	var reEvaluate = __webpack_require__(51);
	var reInterpolate = __webpack_require__(53);

	var forcedSettings = {
	  escape: reEscape,
	  evaluate: reEvaluate,
	  interpolate: reInterpolate
	};

	module.exports = function(tmpl, data){
	  var fn = template(tmpl, forcedSettings);

	  var wrapped = function(o) {
	    if (typeof o === 'undefined' || typeof o.file === 'undefined') throw new Error('Failed to provide the current file as "file" to the template');
	    return fn(o);
	  };

	  return (data ? wrapped(data) : wrapped);
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var parseArgs = __webpack_require__(54);
	var argv = parseArgs(process.argv.slice(2));

	module.exports = argv;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var through = __webpack_require__(9);

	module.exports = function () {
	  return through.obj();
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(56).Stream;

	module.exports = function(o) {
	  return !!o && o instanceof Stream;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var buf = __webpack_require__(5);
	var Buffer = buf.Buffer;

	// could use Buffer.isBuffer but this is the same exact thing...
	module.exports = function(o) {
	  return typeof o === 'object' && o instanceof Buffer;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(v) {
	  return v === null;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var pipeline = __webpack_require__(55);

	module.exports = function(){
	  var args = arguments;
	  if (args.length === 1 && Array.isArray(args[0])) {
	    args = args[0];
	  }
	  return function(){
	    return pipeline.apply(pipeline, args);
	  };
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var through = __webpack_require__(9);

	module.exports = function(fn) {
	  var buf = [];
	  var end = function(cb) {
	    this.push(buf);
	    cb();
	    if(fn) fn(null, buf);
	  };
	  var push = function(data, enc, cb) {
	    buf.push(data);
	    cb();
	  };
	  return through.obj(push, end);
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(29);
	var arrayDiffer = __webpack_require__(57);
	var arrayUniq = __webpack_require__(58);
	var chalk = __webpack_require__(27);
	var objectAssign = __webpack_require__(7);

	var nonEnumberableProperties = ['name', 'message', 'stack'];
	var propertiesNotToDisplay = nonEnumberableProperties.concat(['plugin', 'showStack', 'showProperties', '__safety', '_stack']);

	// wow what a clusterfuck
	var parseOptions = function(plugin, message, opt) {
	  opt = opt || {};
	  if (typeof plugin === 'object') {
	    opt = plugin;
	  } else {
	    if (message instanceof Error) {
	      opt.error = message;
	    } else if (typeof message === 'object') {
	      opt = message;
	    } else {
	      opt.message = message;
	    }
	    opt.plugin = plugin;
	  }

	  return objectAssign({
	    showStack: false,
	    showProperties: true
	  }, opt);
	};

	function PluginError(plugin, message, opt) {
	  if (!(this instanceof PluginError)) throw new Error('Call PluginError using new');

	  Error.call(this);

	  var options = parseOptions(plugin, message, opt);
	  var self = this;

	  // if options has an error, grab details from it
	  if (options.error) {
	    // These properties are not enumerable, so we have to add them explicitly.
	    arrayUniq(Object.keys(options.error).concat(nonEnumberableProperties))
	      .forEach(function(prop) {
	        self[prop] = options.error[prop];
	      });
	  }

	  var properties = ['name', 'message', 'fileName', 'lineNumber', 'stack', 'showStack', 'showProperties', 'plugin'];

	  // options object can override
	  properties.forEach(function(prop) {
	    if (prop in options) this[prop] = options[prop];
	  }, this);

	  // defaults
	  if (!this.name) this.name = 'Error';

	  if (!this.stack) {
	    // Error.captureStackTrace appends a stack property which relies on the toString method of the object it is applied to.
	    // Since we are using our own toString method which controls when to display the stack trace if we don't go through this
	    // safety object, then we'll get stack overflow problems.
	    var safety = {
	      toString: function() {
	        return this._messageWithDetails() + '\nStack:';
	      }.bind(this)
	    };
	    Error.captureStackTrace(safety, arguments.callee || this.constructor);
	    this.__safety = safety;
	  }

	  if (!this.plugin) throw new Error('Missing plugin name');
	  if (!this.message) throw new Error('Missing error message');
	}

	util.inherits(PluginError, Error);

	PluginError.prototype._messageWithDetails = function() {
	  var messageWithDetails = 'Message:\n    ' + this.message;
	  var details = this._messageDetails();

	  if (details !== '') {
	    messageWithDetails += '\n' + details;
	  }

	  return messageWithDetails;
	};

	PluginError.prototype._messageDetails = function() {
	  if (!this.showProperties) {
	    return '';
	  }

	  var properties = arrayDiffer(Object.keys(this), propertiesNotToDisplay);

	  if (properties.length === 0) {
	    return '';
	  }

	  var self = this;
	  properties = properties.map(function stringifyProperty(prop) {
	    return '    ' + prop + ': ' + self[prop];
	  });

	  return 'Details:\n' + properties.join('\n');
	};

	PluginError.prototype.toString = function () {
	  var sig = chalk.red(this.name) + ' in plugin \'' + chalk.cyan(this.plugin) + '\'';
	  var detailsWithStack = function(stack) {
	    return this._messageWithDetails() + '\nStack:\n' + stack;
	  }.bind(this);

	  var msg;
	  if (this.showStack) {
	    if (this.__safety) { // There is no wrapped error, use the stack captured in the PluginError ctor
	      msg = this.__safety.stack;
	    } else if (this._stack) {
	      msg = detailsWithStack(this._stack);
	    } else { // Stack from wrapped error
	      msg = detailsWithStack(this.stack);
	    }
	  } else {
	    msg = this._messageWithDetails();
	  }

	  return sig + '\n' + msg;
	};

	module.exports = PluginError;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*global exports:true*/

	'use strict';

	var es6ArrowFunctions =
	  __webpack_require__(39);
	var es6Classes = __webpack_require__(40);
	var es6Destructuring =
	  __webpack_require__(41);
	var es6ObjectConciseMethod =
	  __webpack_require__(42);
	var es6ObjectShortNotation =
	  __webpack_require__(43);
	var es6RestParameters = __webpack_require__(44);
	var es6Templates = __webpack_require__(38);
	var es6CallSpread =
	  __webpack_require__(45);
	var es7SpreadProperty =
	  __webpack_require__(46);
	var react = __webpack_require__(47);
	var reactDisplayName = __webpack_require__(48);
	var reservedWords = __webpack_require__(49);

	/**
	 * Map from transformName => orderedListOfVisitors.
	 */
	var transformVisitors = {
	  'es6-arrow-functions': es6ArrowFunctions.visitorList,
	  'es6-classes': es6Classes.visitorList,
	  'es6-destructuring': es6Destructuring.visitorList,
	  'es6-object-concise-method': es6ObjectConciseMethod.visitorList,
	  'es6-object-short-notation': es6ObjectShortNotation.visitorList,
	  'es6-rest-params': es6RestParameters.visitorList,
	  'es6-templates': es6Templates.visitorList,
	  'es6-call-spread': es6CallSpread.visitorList,
	  'es7-spread-property': es7SpreadProperty.visitorList,
	  'react': react.visitorList.concat(reactDisplayName.visitorList),
	  'reserved-words': reservedWords.visitorList
	};

	var transformSets = {
	  'harmony': [
	    'es6-arrow-functions',
	    'es6-object-concise-method',
	    'es6-object-short-notation',
	    'es6-classes',
	    'es6-rest-params',
	    'es6-templates',
	    'es6-destructuring',
	    'es6-call-spread',
	    'es7-spread-property'
	  ],
	  'es3': [
	    'reserved-words'
	  ],
	  'react': [
	    'react'
	  ]
	};

	/**
	 * Specifies the order in which each transform should run.
	 */
	var transformRunOrder = [
	  'reserved-words',
	  'es6-arrow-functions',
	  'es6-object-concise-method',
	  'es6-object-short-notation',
	  'es6-classes',
	  'es6-rest-params',
	  'es6-templates',
	  'es6-destructuring',
	  'es6-call-spread',
	  'es7-spread-property',
	  'react'
	];

	/**
	 * Given a list of transform names, return the ordered list of visitors to be
	 * passed to the transform() function.
	 *
	 * @param {array?} excludes
	 * @return {array}
	 */
	function getAllVisitors(excludes) {
	  var ret = [];
	  for (var i = 0, il = transformRunOrder.length; i < il; i++) {
	    if (!excludes || excludes.indexOf(transformRunOrder[i]) === -1) {
	      ret = ret.concat(transformVisitors[transformRunOrder[i]]);
	    }
	  }
	  return ret;
	}

	/**
	 * Given a list of visitor set names, return the ordered list of visitors to be
	 * passed to jstransform.
	 *
	 * @param {array}
	 * @return {array}
	 */
	function getVisitorsBySet(sets) {
	  var visitorsToInclude = sets.reduce(function(visitors, set) {
	    if (!transformSets.hasOwnProperty(set)) {
	      throw new Error('Unknown visitor set: ' + set);
	    }
	    transformSets[set].forEach(function(visitor) {
	      visitors[visitor] = true;
	    });
	    return visitors;
	  }, {});

	  var visitorList = [];
	  for (var i = 0; i < transformRunOrder.length; i++) {
	    if (visitorsToInclude.hasOwnProperty(transformRunOrder[i])) {
	      visitorList = visitorList.concat(transformVisitors[transformRunOrder[i]]);
	    }
	  }

	  return visitorList;
	}

	exports.getVisitorsBySet = getVisitorsBySet;
	exports.getAllVisitors = getAllVisitors;
	exports.transformVisitors = transformVisitors;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';
	/*eslint-disable no-undef*/
	var Buffer = __webpack_require__(5).Buffer;

	function inlineSourceMap(sourceMap, sourceCode, sourceFilename) {
	  // This can be used with a sourcemap that has already has toJSON called on it.
	  // Check first.
	  var json = sourceMap;
	  if (typeof sourceMap.toJSON === 'function') {
	    json = sourceMap.toJSON();
	  }
	  json.sources = [sourceFilename];
	  json.sourcesContent = [sourceCode];
	  var base64 = Buffer(JSON.stringify(json)).toString('base64');
	  return '//# sourceMappingURL=data:application/json;base64,' + base64;
	}

	module.exports = inlineSourceMap;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var path = __webpack_require__(68);
	var clone = __webpack_require__(80);
	var cloneStats = __webpack_require__(71);
	var cloneBuffer = __webpack_require__(59);
	var isBuffer = __webpack_require__(60);
	var isStream = __webpack_require__(61);
	var isNull = __webpack_require__(62);
	var inspectStream = __webpack_require__(63);
	var Stream = __webpack_require__(56);

	function File(file) {
	  if (!file) file = {};

	  // record path change
	  var history = file.path ? [file.path] : file.history;
	  this.history = history || [];

	  // TODO: should this be moved to vinyl-fs?
	  this.cwd = file.cwd || process.cwd();
	  this.base = file.base || this.cwd;

	  // stat = fs stats object
	  // TODO: should this be moved to vinyl-fs?
	  this.stat = file.stat || null;

	  // contents = stream, buffer, or null if not read
	  this.contents = file.contents || null;
	}

	File.prototype.isBuffer = function() {
	  return isBuffer(this.contents);
	};

	File.prototype.isStream = function() {
	  return isStream(this.contents);
	};

	File.prototype.isNull = function() {
	  return isNull(this.contents);
	};

	// TODO: should this be moved to vinyl-fs?
	File.prototype.isDirectory = function() {
	  return this.isNull() && this.stat && this.stat.isDirectory();
	};

	File.prototype.clone = function(opt) {
	  if (typeof opt === 'boolean') {
	    opt = {
	      deep: opt,
	      contents: true
	    };
	  } else if (!opt) {
	    opt = {
	      deep: false,
	      contents: true
	    };
	  } else {
	    opt.deep = opt.deep === true;
	    opt.contents = opt.contents !== false;
	  }

	  // clone our file contents
	  var contents;
	  if (this.isStream()) {
	    contents = this.contents.pipe(new Stream.PassThrough());
	    this.contents = this.contents.pipe(new Stream.PassThrough());
	  } else if (this.isBuffer()) {
	    contents = opt.contents ? cloneBuffer(this.contents) : this.contents;
	  }

	  var file = new File({
	    cwd: this.cwd,
	    base: this.base,
	    stat: (this.stat ? cloneStats(this.stat) : null),
	    history: this.history.slice(),
	    contents: contents
	  });

	  // clone our custom properties
	  Object.keys(this).forEach(function(key) {
	    // ignore built-in fields
	    if (key === '_contents' || key === 'stat' ||
	      key === 'history' || key === 'path' ||
	      key === 'base' || key === 'cwd') {
	      return;
	    }
	    file[key] = opt.deep ? clone(this[key], true) : this[key];
	  }, this);
	  return file;
	};

	File.prototype.pipe = function(stream, opt) {
	  if (!opt) opt = {};
	  if (typeof opt.end === 'undefined') opt.end = true;

	  if (this.isStream()) {
	    return this.contents.pipe(stream, opt);
	  }
	  if (this.isBuffer()) {
	    if (opt.end) {
	      stream.end(this.contents);
	    } else {
	      stream.write(this.contents);
	    }
	    return stream;
	  }

	  // isNull
	  if (opt.end) stream.end();
	  return stream;
	};

	File.prototype.inspect = function() {
	  var inspect = [];

	  // use relative path if possible
	  var filePath = (this.base && this.path) ? this.relative : this.path;

	  if (filePath) {
	    inspect.push('"'+filePath+'"');
	  }

	  if (this.isBuffer()) {
	    inspect.push(this.contents.inspect());
	  }

	  if (this.isStream()) {
	    inspect.push(inspectStream(this.contents));
	  }

	  return '<File '+inspect.join(' ')+'>';
	};

	// virtual attributes
	// or stuff with extra logic
	Object.defineProperty(File.prototype, 'contents', {
	  get: function() {
	    return this._contents;
	  },
	  set: function(val) {
	    if (!isBuffer(val) && !isStream(val) && !isNull(val)) {
	      throw new Error('File.contents can only be a Buffer, a Stream, or null.');
	    }
	    this._contents = val;
	  }
	});

	// TODO: should this be moved to vinyl-fs?
	Object.defineProperty(File.prototype, 'relative', {
	  get: function() {
	    if (!this.base) throw new Error('No base specified! Can not get relative.');
	    if (!this.path) throw new Error('No path specified! Can not get relative.');
	    return path.relative(this.base, this.path);
	  },
	  set: function() {
	    throw new Error('File.relative is generated from the base and path attributes. Do not modify it.');
	  }
	});

	Object.defineProperty(File.prototype, 'path', {
	  get: function() {
	    return this.history[this.history.length - 1];
	  },
	  set: function(path) {
	    if (typeof path !== 'string') throw new Error('path should be string');

	    // record history only when path changed
	    if (path && path !== this.path) {
	      this.history.push(path);
	    }
	  }
	});

	module.exports = File;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(68);

	module.exports = function(npath, ext) {
	  if (typeof npath !== 'string') return npath;
	  if (npath.length === 0) return npath;

	  var nFileName = path.basename(npath, path.extname(npath))+ext;
	  return path.join(path.dirname(npath), nFileName);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	var escapeStringRegexp = __webpack_require__(72);
	var ansiStyles = __webpack_require__(73);
	var stripAnsi = __webpack_require__(1);
	var hasAnsi = __webpack_require__(75);
	var supportsColor = __webpack_require__(76);
	var defineProps = Object.defineProperties;

	function Chalk(options) {
		// detect mode if not set manually
		this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
	}

	// use bright blue on Windows as the normal blue color is illegible
	if (process.platform === 'win32') {
		ansiStyles.blue.open = '\u001b[94m';
	}

	function build(_styles) {
		var builder = function builder() {
			return applyStyle.apply(builder, arguments);
		};
		builder._styles = _styles;
		builder.enabled = this.enabled;
		// __proto__ is used because we must return a function, but there is
		// no way to create a function with a different prototype.
		builder.__proto__ = proto;
		return builder;
	}

	var styles = (function () {
		var ret = {};

		Object.keys(ansiStyles).forEach(function (key) {
			ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

			ret[key] = {
				get: function () {
					return build.call(this, this._styles.concat(key));
				}
			};
		});

		return ret;
	})();

	var proto = defineProps(function chalk() {}, styles);

	function applyStyle() {
		// support varags, but simply cast to string in case there's only one arg
		var args = arguments;
		var argsLen = args.length;
		var str = argsLen !== 0 && String(arguments[0]);
		if (argsLen > 1) {
			// don't slice `arguments`, it prevents v8 optimizations
			for (var a = 1; a < argsLen; a++) {
				str += ' ' + args[a];
			}
		}

		if (!this.enabled || !str) {
			return str;
		}

		/*jshint validthis: true */
		var nestedStyles = this._styles;

		var i = nestedStyles.length;
		while (i--) {
			var code = ansiStyles[nestedStyles[i]];
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			str = code.open + str.replace(code.closeRe, code.open) + code.close;
		}

		return str;
	}

	function init() {
		var ret = {};

		Object.keys(styles).forEach(function (name) {
			ret[name] = {
				get: function () {
					return build.call(this, [name]);
				}
			};
		});

		return ret;
	}

	defineProps(Chalk.prototype, init());

	module.exports = new Chalk();
	module.exports.styles = ansiStyles;
	module.exports.hasColor = hasAnsi;
	module.exports.stripColor = stripAnsi;
	module.exports.supportsColor = supportsColor;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(69);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(81);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(30)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	(function(global) {
	  'use strict';

	  var dateFormat = (function() {
	      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
	      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	      var timezoneClip = /[^-+\dA-Z]/g;
	  
	      // Regexes and supporting functions are cached through closure
	      return function (date, mask, utc, gmt) {
	  
	        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
	          mask = date;
	          date = undefined;
	        }
	  
	        date = date || new Date;
	  
	        if(!(date instanceof Date)) {
	          date = new Date(date);
	        }
	  
	        if (isNaN(date)) {
	          throw TypeError('Invalid date');
	        }
	  
	        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
	  
	        // Allow setting the utc/gmt argument via the mask
	        var maskSlice = mask.slice(0, 4);
	        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
	          mask = mask.slice(4);
	          utc = true;
	          if (maskSlice === 'GMT:') {
	            gmt = true;
	          }
	        }
	  
	        var _ = utc ? 'getUTC' : 'get';
	        var d = date[_ + 'Date']();
	        var D = date[_ + 'Day']();
	        var m = date[_ + 'Month']();
	        var y = date[_ + 'FullYear']();
	        var H = date[_ + 'Hours']();
	        var M = date[_ + 'Minutes']();
	        var s = date[_ + 'Seconds']();
	        var L = date[_ + 'Milliseconds']();
	        var o = utc ? 0 : date.getTimezoneOffset();
	        var W = getWeek(date);
	        var N = getDayOfWeek(date);
	        var flags = {
	          d:    d,
	          dd:   pad(d),
	          ddd:  dateFormat.i18n.dayNames[D],
	          dddd: dateFormat.i18n.dayNames[D + 7],
	          m:    m + 1,
	          mm:   pad(m + 1),
	          mmm:  dateFormat.i18n.monthNames[m],
	          mmmm: dateFormat.i18n.monthNames[m + 12],
	          yy:   String(y).slice(2),
	          yyyy: y,
	          h:    H % 12 || 12,
	          hh:   pad(H % 12 || 12),
	          H:    H,
	          HH:   pad(H),
	          M:    M,
	          MM:   pad(M),
	          s:    s,
	          ss:   pad(s),
	          l:    pad(L, 3),
	          L:    pad(Math.round(L / 10)),
	          t:    H < 12 ? 'a'  : 'p',
	          tt:   H < 12 ? 'am' : 'pm',
	          T:    H < 12 ? 'A'  : 'P',
	          TT:   H < 12 ? 'AM' : 'PM',
	          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
	          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	          W:    W,
	          N:    N
	        };
	  
	        return mask.replace(token, function (match) {
	          if (match in flags) {
	            return flags[match];
	          }
	          return match.slice(1, match.length - 1);
	        });
	      };
	    })();

	  dateFormat.masks = {
	    'default':               'ddd mmm dd yyyy HH:MM:ss',
	    'shortDate':             'm/d/yy',
	    'mediumDate':            'mmm d, yyyy',
	    'longDate':              'mmmm d, yyyy',
	    'fullDate':              'dddd, mmmm d, yyyy',
	    'shortTime':             'h:MM TT',
	    'mediumTime':            'h:MM:ss TT',
	    'longTime':              'h:MM:ss TT Z',
	    'isoDate':               'yyyy-mm-dd',
	    'isoTime':               'HH:MM:ss',
	    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
	    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
	    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: [
	      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
	      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	    ],
	    monthNames: [
	      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
	      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	    ]
	  };

	function pad(val, len) {
	  val = String(val);
	  len = len || 2;
	  while (val.length < len) {
	    val = '0' + val;
	  }
	  return val;
	}

	/**
	 * Get the ISO 8601 week number
	 * Based on comments from
	 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
	 *
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getWeek(date) {
	  // Remove time components of date
	  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	  // Change date to Thursday same week
	  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

	  // Take January 4th as it is always in week 1 (see ISO 8601)
	  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

	  // Change date to Thursday same week
	  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

	  // Check if daylight-saving-time-switch occured and correct for it
	  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
	  targetThursday.setHours(targetThursday.getHours() - ds);

	  // Number of weeks between target Thursday and first Thursday
	  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
	  return 1 + Math.floor(weekDiff);
	}

	/**
	 * Get ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * 
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getDayOfWeek(date) {
	  var dow = date.getDay();
	  if(dow === 0) {
	    dow = 7;
	  }
	  return dow;
	}

	/**
	 * kind-of shortcut
	 * @param  {*} val
	 * @return {String}
	 */
	function kindOf(val) {
	  if (val === null) {
	    return 'null';
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (typeof val !== 'object') {
	    return typeof val;
	  }

	  if (Array.isArray(val)) {
	    return 'array';
	  }

	  return {}.toString.call(val)
	    .slice(8, -1).toLowerCase();
	};



	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (dateFormat), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = dateFormat;
	  } else {
	    global.dateFormat = dateFormat;
	  }
	})(this);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var esprima = __webpack_require__(84);
	var utils = __webpack_require__(64);

	var Syntax = esprima.Syntax;

	function _isFunctionNode(node) {
	  return node.type === Syntax.FunctionDeclaration
	         || node.type === Syntax.FunctionExpression
	         || node.type === Syntax.ArrowFunctionExpression;
	}

	function visitClassProperty(traverse, node, path, state) {
	  utils.catchup(node.range[0], state);
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitClassProperty.test = function(node, path, state) {
	  return node.type === Syntax.ClassProperty;
	};

	function visitTypeAlias(traverse, node, path, state) {
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitTypeAlias.test = function(node, path, state) {
	  return node.type === Syntax.TypeAlias;
	};

	function visitTypeCast(traverse, node, path, state) {
	  path.unshift(node);
	  traverse(node.expression, path, state);
	  path.shift();

	  utils.catchup(node.typeAnnotation.range[0], state);
	  utils.catchupWhiteOut(node.typeAnnotation.range[1], state);
	  return false;
	}
	visitTypeCast.test = function(node, path, state) {
	  return node.type === Syntax.TypeCastExpression;
	};

	function visitInterfaceDeclaration(traverse, node, path, state) {
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitInterfaceDeclaration.test = function(node, path, state) {
	  return node.type === Syntax.InterfaceDeclaration;
	};

	function visitDeclare(traverse, node, path, state) {
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitDeclare.test = function(node, path, state) {
	  switch (node.type) {
	    case Syntax.DeclareVariable:
	    case Syntax.DeclareFunction:
	    case Syntax.DeclareClass:
	    case Syntax.DeclareModule:
	      return true;
	  }
	  return false;
	};

	function visitFunctionParametricAnnotation(traverse, node, path, state) {
	  utils.catchup(node.range[0], state);
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitFunctionParametricAnnotation.test = function(node, path, state) {
	  return node.type === Syntax.TypeParameterDeclaration
	         && path[0]
	         && _isFunctionNode(path[0])
	         && node === path[0].typeParameters;
	};

	function visitFunctionReturnAnnotation(traverse, node, path, state) {
	  utils.catchup(node.range[0], state);
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitFunctionReturnAnnotation.test = function(node, path, state) {
	  return path[0] && _isFunctionNode(path[0]) && node === path[0].returnType;
	};

	function visitOptionalFunctionParameterAnnotation(traverse, node, path, state) {
	  utils.catchup(node.range[0] + node.name.length, state);
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitOptionalFunctionParameterAnnotation.test = function(node, path, state) {
	  return node.type === Syntax.Identifier
	         && node.optional
	         && path[0]
	         && _isFunctionNode(path[0]);
	};

	function visitTypeAnnotatedIdentifier(traverse, node, path, state) {
	  utils.catchup(node.typeAnnotation.range[0], state);
	  utils.catchupWhiteOut(node.typeAnnotation.range[1], state);
	  return false;
	}
	visitTypeAnnotatedIdentifier.test = function(node, path, state) {
	  return node.type === Syntax.Identifier && node.typeAnnotation;
	};

	function visitTypeAnnotatedObjectOrArrayPattern(traverse, node, path, state) {
	  utils.catchup(node.typeAnnotation.range[0], state);
	  utils.catchupWhiteOut(node.typeAnnotation.range[1], state);
	  return false;
	}
	visitTypeAnnotatedObjectOrArrayPattern.test = function(node, path, state) {
	  var rightType = node.type === Syntax.ObjectPattern
	                || node.type === Syntax.ArrayPattern;
	  return rightType && node.typeAnnotation;
	};

	/**
	 * Methods cause trouble, since esprima parses them as a key/value pair, where
	 * the location of the value starts at the method body. For example
	 * { bar(x:number,...y:Array<number>):number {} }
	 * is parsed as
	 * { bar: function(x: number, ...y:Array<number>): number {} }
	 * except that the location of the FunctionExpression value is 40-something,
	 * which is the location of the function body. This means that by the time we
	 * visit the params, rest param, and return type organically, we've already
	 * catchup()'d passed them.
	 */
	function visitMethod(traverse, node, path, state) {
	  path.unshift(node);
	  traverse(node.key, path, state);

	  path.unshift(node.value);
	  traverse(node.value.params, path, state);
	  node.value.rest && traverse(node.value.rest, path, state);
	  node.value.returnType && traverse(node.value.returnType, path, state);
	  traverse(node.value.body, path, state);

	  path.shift();

	  path.shift();
	  return false;
	}

	visitMethod.test = function(node, path, state) {
	  return (node.type === "Property" && (node.method || node.kind === "set" || node.kind === "get"))
	      || (node.type === "MethodDefinition");
	};

	function visitImportType(traverse, node, path, state) {
	  utils.catchupWhiteOut(node.range[1], state);
	  return false;
	}
	visitImportType.test = function(node, path, state) {
	  return node.type === 'ImportDeclaration'
	         && node.isType;
	};

	exports.visitorList = [
	  visitClassProperty,
	  visitDeclare,
	  visitImportType,
	  visitInterfaceDeclaration,
	  visitFunctionParametricAnnotation,
	  visitFunctionReturnAnnotation,
	  visitMethod,
	  visitOptionalFunctionParameterAnnotation,
	  visitTypeAlias,
	  visitTypeCast,
	  visitTypeAnnotatedIdentifier,
	  visitTypeAnnotatedObjectOrArrayPattern
	];


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2009-2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE.txt or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	exports.SourceMapGenerator = __webpack_require__(65).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(66).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(67).SourceNode;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(70)


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = extend

	function extend() {
	    var target = {}

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */


	/*jslint node: true*/
	"use strict";

	var esprima = __webpack_require__(84);
	var utils = __webpack_require__(64);

	var getBoundaryNode = utils.getBoundaryNode;
	var declareIdentInScope = utils.declareIdentInLocalScope;
	var initScopeMetadata = utils.initScopeMetadata;
	var Syntax = esprima.Syntax;

	/**
	 * @param {object} node
	 * @param {object} parentNode
	 * @return {boolean}
	 */
	function _nodeIsClosureScopeBoundary(node, parentNode) {
	  if (node.type === Syntax.Program) {
	    return true;
	  }

	  var parentIsFunction =
	    parentNode.type === Syntax.FunctionDeclaration
	    || parentNode.type === Syntax.FunctionExpression
	    || parentNode.type === Syntax.ArrowFunctionExpression;

	  var parentIsCurlylessArrowFunc =
	    parentNode.type === Syntax.ArrowFunctionExpression
	    && node === parentNode.body;

	  return parentIsFunction
	         && (node.type === Syntax.BlockStatement || parentIsCurlylessArrowFunc);
	}

	function _nodeIsBlockScopeBoundary(node, parentNode) {
	  if (node.type === Syntax.Program) {
	    return false;
	  }

	  return node.type === Syntax.BlockStatement
	         && parentNode.type === Syntax.CatchClause;
	}

	/**
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function traverse(node, path, state) {
	  /*jshint -W004*/
	  // Create a scope stack entry if this is the first node we've encountered in
	  // its local scope
	  var startIndex = null;
	  var parentNode = path[0];
	  if (!Array.isArray(node) && state.localScope.parentNode !== parentNode) {
	    if (_nodeIsClosureScopeBoundary(node, parentNode)) {
	      var scopeIsStrict = state.scopeIsStrict;
	      if (!scopeIsStrict
	          && (node.type === Syntax.BlockStatement
	              || node.type === Syntax.Program)) {
	          scopeIsStrict =
	            node.body.length > 0
	            && node.body[0].type === Syntax.ExpressionStatement
	            && node.body[0].expression.type === Syntax.Literal
	            && node.body[0].expression.value === 'use strict';
	      }

	      if (node.type === Syntax.Program) {
	        startIndex = state.g.buffer.length;
	        state = utils.updateState(state, {
	          scopeIsStrict: scopeIsStrict
	        });
	      } else {
	        startIndex = state.g.buffer.length + 1;
	        state = utils.updateState(state, {
	          localScope: {
	            parentNode: parentNode,
	            parentScope: state.localScope,
	            identifiers: {},
	            tempVarIndex: 0,
	            tempVars: []
	          },
	          scopeIsStrict: scopeIsStrict
	        });

	        // All functions have an implicit 'arguments' object in scope
	        declareIdentInScope('arguments', initScopeMetadata(node), state);

	        // Include function arg identifiers in the scope boundaries of the
	        // function
	        if (parentNode.params.length > 0) {
	          var param;
	          var metadata = initScopeMetadata(parentNode, path.slice(1), path[0]);
	          for (var i = 0; i < parentNode.params.length; i++) {
	            param = parentNode.params[i];
	            if (param.type === Syntax.Identifier) {
	              declareIdentInScope(param.name, metadata, state);
	            }
	          }
	        }

	        // Include rest arg identifiers in the scope boundaries of their
	        // functions
	        if (parentNode.rest) {
	          var metadata = initScopeMetadata(
	            parentNode,
	            path.slice(1),
	            path[0]
	          );
	          declareIdentInScope(parentNode.rest.name, metadata, state);
	        }

	        // Named FunctionExpressions scope their name within the body block of
	        // themselves only
	        if (parentNode.type === Syntax.FunctionExpression && parentNode.id) {
	          var metaData =
	            initScopeMetadata(parentNode, path.parentNodeslice, parentNode);
	          declareIdentInScope(parentNode.id.name, metaData, state);
	        }
	      }

	      // Traverse and find all local identifiers in this closure first to
	      // account for function/variable declaration hoisting
	      collectClosureIdentsAndTraverse(node, path, state);
	    }

	    if (_nodeIsBlockScopeBoundary(node, parentNode)) {
	      startIndex = state.g.buffer.length;
	      state = utils.updateState(state, {
	        localScope: {
	          parentNode: parentNode,
	          parentScope: state.localScope,
	          identifiers: {},
	          tempVarIndex: 0,
	          tempVars: []
	        }
	      });

	      if (parentNode.type === Syntax.CatchClause) {
	        var metadata = initScopeMetadata(
	          parentNode,
	          path.slice(1),
	          parentNode
	        );
	        declareIdentInScope(parentNode.param.name, metadata, state);
	      }
	      collectBlockIdentsAndTraverse(node, path, state);
	    }
	  }

	  // Only catchup() before and after traversing a child node
	  function traverser(node, path, state) {
	    node.range && utils.catchup(node.range[0], state);
	    traverse(node, path, state);
	    node.range && utils.catchup(node.range[1], state);
	  }

	  utils.analyzeAndTraverse(walker, traverser, node, path, state);

	  // Inject temp variables into the scope.
	  if (startIndex !== null) {
	    utils.injectTempVarDeclarations(state, startIndex);
	  }
	}

	function collectClosureIdentsAndTraverse(node, path, state) {
	  utils.analyzeAndTraverse(
	    visitLocalClosureIdentifiers,
	    collectClosureIdentsAndTraverse,
	    node,
	    path,
	    state
	  );
	}

	function collectBlockIdentsAndTraverse(node, path, state) {
	  utils.analyzeAndTraverse(
	    visitLocalBlockIdentifiers,
	    collectBlockIdentsAndTraverse,
	    node,
	    path,
	    state
	  );
	}

	function visitLocalClosureIdentifiers(node, path, state) {
	  var metaData;
	  switch (node.type) {
	    case Syntax.ArrowFunctionExpression:
	    case Syntax.FunctionExpression:
	      // Function expressions don't get their names (if there is one) added to
	      // the closure scope they're defined in
	      return false;
	    case Syntax.ClassDeclaration:
	    case Syntax.ClassExpression:
	    case Syntax.FunctionDeclaration:
	      if (node.id) {
	        metaData = initScopeMetadata(getBoundaryNode(path), path.slice(), node);
	        declareIdentInScope(node.id.name, metaData, state);
	      }
	      return false;
	    case Syntax.VariableDeclarator:
	      // Variables have function-local scope
	      if (path[0].kind === 'var') {
	        metaData = initScopeMetadata(getBoundaryNode(path), path.slice(), node);
	        declareIdentInScope(node.id.name, metaData, state);
	      }
	      break;
	  }
	}

	function visitLocalBlockIdentifiers(node, path, state) {
	  // TODO: Support 'let' here...maybe...one day...or something...
	  if (node.type === Syntax.CatchClause) {
	    return false;
	  }
	}

	function walker(node, path, state) {
	  var visitors = state.g.visitors;
	  for (var i = 0; i < visitors.length; i++) {
	    if (visitors[i].test(node, path, state)) {
	      return visitors[i](traverse, node, path, state);
	    }
	  }
	}

	var _astCache = {};

	function getAstForSource(source, options) {
	  if (_astCache[source] && !options.disableAstCache) {
	    return _astCache[source];
	  }
	  var ast = esprima.parse(source, {
	    comment: true,
	    loc: true,
	    range: true,
	    sourceType: options.sourceType
	  });
	  if (!options.disableAstCache) {
	    _astCache[source] = ast;
	  }
	  return ast;
	}

	/**
	 * Applies all available transformations to the source
	 * @param {array} visitors
	 * @param {string} source
	 * @param {?object} options
	 * @return {object}
	 */
	function transform(visitors, source, options) {
	  options = options || {};
	  var ast;
	  try {
	    ast = getAstForSource(source, options);
	    } catch (e) {
	    e.message = 'Parse Error: ' + e.message;
	    throw e;
	  }
	  var state = utils.createState(source, ast, options);
	  state.g.visitors = visitors;

	  if (options.sourceMap) {
	    var SourceMapGenerator = __webpack_require__(105).SourceMapGenerator;
	    state.g.sourceMap = new SourceMapGenerator({file: options.filename || 'transformed.js'});
	  }

	  traverse(ast, [], state);
	  utils.catchup(source.length, state);

	  var ret = {code: state.g.buffer, extra: state.g.extra};
	  if (options.sourceMap) {
	    ret.sourceMap = state.g.sourceMap;
	    ret.sourceMapFilename =  options.filename || 'source.js';
	  }
	  return ret;
	}

	exports.transform = transform;
	exports.Syntax = Syntax;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*jslint node:true*/

	/**
	 * @typechecks
	 */
	'use strict';

	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);

	/**
	 * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-12.1.9
	 */
	function visitTemplateLiteral(traverse, node, path, state) {
	  var templateElements = node.quasis;

	  utils.append('(', state);
	  for (var ii = 0; ii < templateElements.length; ii++) {
	    var templateElement = templateElements[ii];
	    if (templateElement.value.raw !== '') {
	      utils.append(getCookedValue(templateElement), state);
	      if (!templateElement.tail) {
	        // + between element and substitution
	        utils.append(' + ', state);
	      }
	      // maintain line numbers
	      utils.move(templateElement.range[0], state);
	      utils.catchupNewlines(templateElement.range[1], state);
	    } else {  // templateElement.value.raw === ''
	      // Concatenat adjacent substitutions, e.g. `${x}${y}`. Empty templates
	      // appear before the first and after the last element - nothing to add in
	      // those cases.
	      if (ii > 0 && !templateElement.tail) {
	        // + between substitution and substitution
	        utils.append(' + ', state);
	      }
	    }

	    utils.move(templateElement.range[1], state);
	    if (!templateElement.tail) {
	      var substitution = node.expressions[ii];
	      if (substitution.type === Syntax.Identifier ||
	          substitution.type === Syntax.MemberExpression ||
	          substitution.type === Syntax.CallExpression) {
	        utils.catchup(substitution.range[1], state);
	      } else {
	        utils.append('(', state);
	        traverse(substitution, path, state);
	        utils.catchup(substitution.range[1], state);
	        utils.append(')', state);
	      }
	      // if next templateElement isn't empty...
	      if (templateElements[ii + 1].value.cooked !== '') {
	        utils.append(' + ', state);
	      }
	    }
	  }
	  utils.move(node.range[1], state);
	  utils.append(')', state);
	  return false;
	}

	visitTemplateLiteral.test = function(node, path, state) {
	  return node.type === Syntax.TemplateLiteral;
	};

	/**
	 * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-12.2.6
	 */
	function visitTaggedTemplateExpression(traverse, node, path, state) {
	  var template = node.quasi;
	  var numQuasis = template.quasis.length;

	  // print the tag
	  utils.move(node.tag.range[0], state);
	  traverse(node.tag, path, state);
	  utils.catchup(node.tag.range[1], state);

	  // print array of template elements
	  utils.append('(function() { var siteObj = [', state);
	  for (var ii = 0; ii < numQuasis; ii++) {
	    utils.append(getCookedValue(template.quasis[ii]), state);
	    if (ii !== numQuasis - 1) {
	      utils.append(', ', state);
	    }
	  }
	  utils.append(']; siteObj.raw = [', state);
	  for (ii = 0; ii < numQuasis; ii++) {
	    utils.append(getRawValue(template.quasis[ii]), state);
	    if (ii !== numQuasis - 1) {
	      utils.append(', ', state);
	    }
	  }
	  utils.append(
	    ']; Object.freeze(siteObj.raw); Object.freeze(siteObj); return siteObj; }()',
	    state
	  );

	  // print substitutions
	  if (numQuasis > 1) {
	    for (ii = 0; ii < template.expressions.length; ii++) {
	      var expression = template.expressions[ii];
	      utils.append(', ', state);

	      // maintain line numbers by calling catchupWhiteSpace over the whole
	      // previous TemplateElement
	      utils.move(template.quasis[ii].range[0], state);
	      utils.catchupNewlines(template.quasis[ii].range[1], state);

	      utils.move(expression.range[0], state);
	      traverse(expression, path, state);
	      utils.catchup(expression.range[1], state);
	    }
	  }

	  // print blank lines to push the closing ) down to account for the final
	  // TemplateElement.
	  utils.catchupNewlines(node.range[1], state);

	  utils.append(')', state);

	  return false;
	}

	visitTaggedTemplateExpression.test = function(node, path, state) {
	  return node.type === Syntax.TaggedTemplateExpression;
	};

	function getCookedValue(templateElement) {
	  return JSON.stringify(templateElement.value.cooked);
	}

	function getRawValue(templateElement) {
	  return JSON.stringify(templateElement.value.raw);
	}

	exports.visitorList = [
	  visitTemplateLiteral,
	  visitTaggedTemplateExpression
	];


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*global exports:true*/

	/**
	 * Desugars ES6 Arrow functions to ES3 function expressions.
	 * If the function contains `this` expression -- automatically
	 * binds the function to current value of `this`.
	 *
	 * Single parameter, simple expression:
	 *
	 * [1, 2, 3].map(x => x * x);
	 *
	 * [1, 2, 3].map(function(x) { return x * x; });
	 *
	 * Several parameters, complex block:
	 *
	 * this.users.forEach((user, idx) => {
	 *   return this.isActive(idx) && this.send(user);
	 * });
	 *
	 * this.users.forEach(function(user, idx) {
	 *   return this.isActive(idx) && this.send(user);
	 * }.bind(this));
	 *
	 */
	var restParamVisitors = __webpack_require__(44);
	var destructuringVisitors = __webpack_require__(41);

	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);

	/**
	 * @public
	 */
	function visitArrowFunction(traverse, node, path, state) {
	  var notInExpression = (path[0].type === Syntax.ExpressionStatement);

	  // Wrap a function into a grouping operator, if it's not
	  // in the expression position.
	  if (notInExpression) {
	    utils.append('(', state);
	  }

	  utils.append('function', state);
	  renderParams(traverse, node, path, state);

	  // Skip arrow.
	  utils.catchupWhiteSpace(node.body.range[0], state);

	  var renderBody = node.body.type == Syntax.BlockStatement
	    ? renderStatementBody
	    : renderExpressionBody;

	  path.unshift(node);
	  renderBody(traverse, node, path, state);
	  path.shift();

	  // Bind the function only if `this` value is used
	  // inside it or inside any sub-expression.
	  var containsBindingSyntax =
	    utils.containsChildMatching(node.body, function(node) {
	      return node.type === Syntax.ThisExpression
	             || (node.type === Syntax.Identifier
	                 && node.name === "super");
	    });

	  if (containsBindingSyntax) {
	    utils.append('.bind(this)', state);
	  }

	  utils.catchupWhiteSpace(node.range[1], state);

	  // Close wrapper if not in the expression.
	  if (notInExpression) {
	    utils.append(')', state);
	  }

	  return false;
	}

	function renderParams(traverse, node, path, state) {
	  // To preserve inline typechecking directives, we
	  // distinguish between parens-free and paranthesized single param.
	  if (isParensFreeSingleParam(node, state) || !node.params.length) {
	    utils.append('(', state);
	  }
	  if (node.params.length !== 0) {
	    path.unshift(node);
	    traverse(node.params, path, state);
	    path.unshift();
	  }
	  utils.append(')', state);
	}

	function isParensFreeSingleParam(node, state) {
	  return node.params.length === 1 &&
	    state.g.source[state.g.position] !== '(';
	}

	function renderExpressionBody(traverse, node, path, state) {
	  // Wrap simple expression bodies into a block
	  // with explicit return statement.
	  utils.append('{', state);

	  // Special handling of rest param.
	  if (node.rest) {
	    utils.append(
	      restParamVisitors.renderRestParamSetup(node, state),
	      state
	    );
	  }

	  // Special handling of destructured params.
	  destructuringVisitors.renderDestructuredComponents(
	    node,
	    utils.updateState(state, {
	      localScope: {
	        parentNode: state.parentNode,
	        parentScope: state.parentScope,
	        identifiers: state.identifiers,
	        tempVarIndex: 0
	      }
	    })
	  );

	  utils.append('return ', state);
	  renderStatementBody(traverse, node, path, state);
	  utils.append(';}', state);
	}

	function renderStatementBody(traverse, node, path, state) {
	  traverse(node.body, path, state);
	  utils.catchup(node.body.range[1], state);
	}

	visitArrowFunction.test = function(node, path, state) {
	  return node.type === Syntax.ArrowFunctionExpression;
	};

	exports.visitorList = [
	  visitArrowFunction
	];



/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*jslint node:true*/

	/**
	 * @typechecks
	 */
	'use strict';

	var base62 = __webpack_require__(107);
	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);
	var reservedWordsHelper = __webpack_require__(77);

	var declareIdentInLocalScope = utils.declareIdentInLocalScope;
	var initScopeMetadata = utils.initScopeMetadata;

	var SUPER_PROTO_IDENT_PREFIX = '____SuperProtoOf';

	var _anonClassUUIDCounter = 0;
	var _mungedSymbolMaps = {};

	function resetSymbols() {
	  _anonClassUUIDCounter = 0;
	  _mungedSymbolMaps = {};
	}

	/**
	 * Used to generate a unique class for use with code-gens for anonymous class
	 * expressions.
	 *
	 * @param {object} state
	 * @return {string}
	 */
	function _generateAnonymousClassName(state) {
	  var mungeNamespace = state.mungeNamespace || '';
	  return '____Class' + mungeNamespace + base62.encode(_anonClassUUIDCounter++);
	}

	/**
	 * Given an identifier name, munge it using the current state's mungeNamespace.
	 *
	 * @param {string} identName
	 * @param {object} state
	 * @return {string}
	 */
	function _getMungedName(identName, state) {
	  var mungeNamespace = state.mungeNamespace;
	  var shouldMinify = state.g.opts.minify;

	  if (shouldMinify) {
	    if (!_mungedSymbolMaps[mungeNamespace]) {
	      _mungedSymbolMaps[mungeNamespace] = {
	        symbolMap: {},
	        identUUIDCounter: 0
	      };
	    }

	    var symbolMap = _mungedSymbolMaps[mungeNamespace].symbolMap;
	    if (!symbolMap[identName]) {
	      symbolMap[identName] =
	        base62.encode(_mungedSymbolMaps[mungeNamespace].identUUIDCounter++);
	    }
	    identName = symbolMap[identName];
	  }
	  return '$' + mungeNamespace + identName;
	}

	/**
	 * Extracts super class information from a class node.
	 *
	 * Information includes name of the super class and/or the expression string
	 * (if extending from an expression)
	 *
	 * @param {object} node
	 * @param {object} state
	 * @return {object}
	 */
	function _getSuperClassInfo(node, state) {
	  var ret = {
	    name: null,
	    expression: null
	  };
	  if (node.superClass) {
	    if (node.superClass.type === Syntax.Identifier) {
	      ret.name = node.superClass.name;
	    } else {
	      // Extension from an expression
	      ret.name = _generateAnonymousClassName(state);
	      ret.expression = state.g.source.substring(
	        node.superClass.range[0],
	        node.superClass.range[1]
	      );
	    }
	  }
	  return ret;
	}

	/**
	 * Used with .filter() to find the constructor method in a list of
	 * MethodDefinition nodes.
	 *
	 * @param {object} classElement
	 * @return {boolean}
	 */
	function _isConstructorMethod(classElement) {
	  return classElement.type === Syntax.MethodDefinition &&
	         classElement.key.type === Syntax.Identifier &&
	         classElement.key.name === 'constructor';
	}

	/**
	 * @param {object} node
	 * @param {object} state
	 * @return {boolean}
	 */
	function _shouldMungeIdentifier(node, state) {
	  return (
	    !!state.methodFuncNode &&
	    !utils.getDocblock(state).hasOwnProperty('preventMunge') &&
	    /^_(?!_)/.test(node.name)
	  );
	}

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function visitClassMethod(traverse, node, path, state) {
	  if (!state.g.opts.es5 && (node.kind === 'get' || node.kind === 'set')) {
	    throw new Error(
	      'This transform does not support ' + node.kind + 'ter methods for ES6 ' +
	      'classes. (line: ' + node.loc.start.line + ', col: ' +
	      node.loc.start.column + ')'
	    );
	  }
	  state = utils.updateState(state, {
	    methodNode: node
	  });
	  utils.catchup(node.range[0], state);
	  path.unshift(node);
	  traverse(node.value, path, state);
	  path.shift();
	  return false;
	}
	visitClassMethod.test = function(node, path, state) {
	  return node.type === Syntax.MethodDefinition;
	};

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function visitClassFunctionExpression(traverse, node, path, state) {
	  var methodNode = path[0];
	  var isGetter = methodNode.kind === 'get';
	  var isSetter = methodNode.kind === 'set';

	  state = utils.updateState(state, {
	    methodFuncNode: node
	  });

	  if (methodNode.key.name === 'constructor') {
	    utils.append('function ' + state.className, state);
	  } else {
	    var methodAccessorComputed = false;
	    var methodAccessor;
	    var prototypeOrStatic = methodNode.static ? '' : '.prototype';
	    var objectAccessor = state.className + prototypeOrStatic;

	    if (methodNode.key.type === Syntax.Identifier) {
	      // foo() {}
	      methodAccessor = methodNode.key.name;
	      if (_shouldMungeIdentifier(methodNode.key, state)) {
	        methodAccessor = _getMungedName(methodAccessor, state);
	      }
	      if (isGetter || isSetter) {
	        methodAccessor = JSON.stringify(methodAccessor);
	      } else if (reservedWordsHelper.isReservedWord(methodAccessor)) {
	        methodAccessorComputed = true;
	        methodAccessor = JSON.stringify(methodAccessor);
	      }
	    } else if (methodNode.key.type === Syntax.Literal) {
	      // 'foo bar'() {}  | get 'foo bar'() {} | set 'foo bar'() {}
	      methodAccessor = JSON.stringify(methodNode.key.value);
	      methodAccessorComputed = true;
	    }

	    if (isSetter || isGetter) {
	      utils.append(
	        'Object.defineProperty(' +
	          objectAccessor + ',' +
	          methodAccessor + ',' +
	          '{configurable:true,' +
	          methodNode.kind + ':function',
	        state
	      );
	    } else {
	      if (state.g.opts.es3) {
	        if (methodAccessorComputed) {
	          methodAccessor = '[' + methodAccessor + ']';
	        } else {
	          methodAccessor = '.' + methodAccessor;
	        }
	        utils.append(
	          objectAccessor +
	          methodAccessor + '=function' + (node.generator ? '*' : ''),
	          state
	        );
	      } else {
	        if (!methodAccessorComputed) {
	          methodAccessor = JSON.stringify(methodAccessor);
	        }
	        utils.append(
	          'Object.defineProperty(' +
	            objectAccessor + ',' +
	            methodAccessor + ',' +
	            '{writable:true,configurable:true,' +
	            'value:function' + (node.generator ? '*' : ''),
	          state
	        );
	      }
	    }
	  }
	  utils.move(methodNode.key.range[1], state);
	  utils.append('(', state);

	  var params = node.params;
	  if (params.length > 0) {
	    utils.catchupNewlines(params[0].range[0], state);
	    for (var i = 0; i < params.length; i++) {
	      utils.catchup(node.params[i].range[0], state);
	      path.unshift(node);
	      traverse(params[i], path, state);
	      path.shift();
	    }
	  }

	  var closingParenPosition = utils.getNextSyntacticCharOffset(')', state);
	  utils.catchupWhiteSpace(closingParenPosition, state);

	  var openingBracketPosition = utils.getNextSyntacticCharOffset('{', state);
	  utils.catchup(openingBracketPosition + 1, state);

	  if (!state.scopeIsStrict) {
	    utils.append('"use strict";', state);
	    state = utils.updateState(state, {
	      scopeIsStrict: true
	    });
	  }
	  utils.move(node.body.range[0] + '{'.length, state);

	  path.unshift(node);
	  traverse(node.body, path, state);
	  path.shift();
	  utils.catchup(node.body.range[1], state);

	  if (methodNode.key.name !== 'constructor') {
	    if (isGetter || isSetter || !state.g.opts.es3) {
	      utils.append('})', state);
	    }
	    utils.append(';', state);
	  }
	  return false;
	}
	visitClassFunctionExpression.test = function(node, path, state) {
	  return node.type === Syntax.FunctionExpression
	         && path[0].type === Syntax.MethodDefinition;
	};

	function visitClassMethodParam(traverse, node, path, state) {
	  var paramName = node.name;
	  if (_shouldMungeIdentifier(node, state)) {
	    paramName = _getMungedName(node.name, state);
	  }
	  utils.append(paramName, state);
	  utils.move(node.range[1], state);
	}
	visitClassMethodParam.test = function(node, path, state) {
	  if (!path[0] || !path[1]) {
	    return;
	  }

	  var parentFuncExpr = path[0];
	  var parentClassMethod = path[1];

	  return parentFuncExpr.type === Syntax.FunctionExpression
	         && parentClassMethod.type === Syntax.MethodDefinition
	         && node.type === Syntax.Identifier;
	};

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function _renderClassBody(traverse, node, path, state) {
	  var className = state.className;
	  var superClass = state.superClass;

	  // Set up prototype of constructor on same line as `extends` for line-number
	  // preservation. This relies on function-hoisting if a constructor function is
	  // defined in the class body.
	  if (superClass.name) {
	    // If the super class is an expression, we need to memoize the output of the
	    // expression into the generated class name variable and use that to refer
	    // to the super class going forward. Example:
	    //
	    //   class Foo extends mixin(Bar, Baz) {}
	    //     --transforms to--
	    //   function Foo() {} var ____Class0Blah = mixin(Bar, Baz);
	    if (superClass.expression !== null) {
	      utils.append(
	        'var ' + superClass.name + '=' + superClass.expression + ';',
	        state
	      );
	    }

	    var keyName = superClass.name + '____Key';
	    var keyNameDeclarator = '';
	    if (!utils.identWithinLexicalScope(keyName, state)) {
	      keyNameDeclarator = 'var ';
	      declareIdentInLocalScope(keyName, initScopeMetadata(node), state);
	    }
	    utils.append(
	      'for(' + keyNameDeclarator + keyName + ' in ' + superClass.name + '){' +
	        'if(' + superClass.name + '.hasOwnProperty(' + keyName + ')){' +
	          className + '[' + keyName + ']=' +
	            superClass.name + '[' + keyName + '];' +
	        '}' +
	      '}',
	      state
	    );

	    var superProtoIdentStr = SUPER_PROTO_IDENT_PREFIX + superClass.name;
	    if (!utils.identWithinLexicalScope(superProtoIdentStr, state)) {
	      utils.append(
	        'var ' + superProtoIdentStr + '=' + superClass.name + '===null?' +
	        'null:' + superClass.name + '.prototype;',
	        state
	      );
	      declareIdentInLocalScope(superProtoIdentStr, initScopeMetadata(node), state);
	    }

	    utils.append(
	      className + '.prototype=Object.create(' + superProtoIdentStr + ');',
	      state
	    );
	    utils.append(
	      className + '.prototype.constructor=' + className + ';',
	      state
	    );
	    utils.append(
	      className + '.__superConstructor__=' + superClass.name + ';',
	      state
	    );
	  }

	  // If there's no constructor method specified in the class body, create an
	  // empty constructor function at the top (same line as the class keyword)
	  if (!node.body.body.filter(_isConstructorMethod).pop()) {
	    utils.append('function ' + className + '(){', state);
	    if (!state.scopeIsStrict) {
	      utils.append('"use strict";', state);
	    }
	    if (superClass.name) {
	      utils.append(
	        'if(' + superClass.name + '!==null){' +
	        superClass.name + '.apply(this,arguments);}',
	        state
	      );
	    }
	    utils.append('}', state);
	  }

	  utils.move(node.body.range[0] + '{'.length, state);
	  traverse(node.body, path, state);
	  utils.catchupWhiteSpace(node.range[1], state);
	}

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function visitClassDeclaration(traverse, node, path, state) {
	  var className = node.id.name;
	  var superClass = _getSuperClassInfo(node, state);

	  state = utils.updateState(state, {
	    mungeNamespace: className,
	    className: className,
	    superClass: superClass
	  });

	  _renderClassBody(traverse, node, path, state);

	  return false;
	}
	visitClassDeclaration.test = function(node, path, state) {
	  return node.type === Syntax.ClassDeclaration;
	};

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function visitClassExpression(traverse, node, path, state) {
	  var className = node.id && node.id.name || _generateAnonymousClassName(state);
	  var superClass = _getSuperClassInfo(node, state);

	  utils.append('(function(){', state);

	  state = utils.updateState(state, {
	    mungeNamespace: className,
	    className: className,
	    superClass: superClass
	  });

	  _renderClassBody(traverse, node, path, state);

	  utils.append('return ' + className + ';})()', state);
	  return false;
	}
	visitClassExpression.test = function(node, path, state) {
	  return node.type === Syntax.ClassExpression;
	};

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function visitPrivateIdentifier(traverse, node, path, state) {
	  utils.append(_getMungedName(node.name, state), state);
	  utils.move(node.range[1], state);
	}
	visitPrivateIdentifier.test = function(node, path, state) {
	  if (node.type === Syntax.Identifier && _shouldMungeIdentifier(node, state)) {
	    // Always munge non-computed properties of MemberExpressions
	    // (a la preventing access of properties of unowned objects)
	    if (path[0].type === Syntax.MemberExpression && path[0].object !== node
	        && path[0].computed === false) {
	      return true;
	    }

	    // Always munge identifiers that were declared within the method function
	    // scope
	    if (utils.identWithinLexicalScope(node.name, state, state.methodFuncNode)) {
	      return true;
	    }

	    // Always munge private keys on object literals defined within a method's
	    // scope.
	    if (path[0].type === Syntax.Property
	        && path[1].type === Syntax.ObjectExpression) {
	      return true;
	    }

	    // Always munge function parameters
	    if (path[0].type === Syntax.FunctionExpression
	        || path[0].type === Syntax.FunctionDeclaration
	        || path[0].type === Syntax.ArrowFunctionExpression) {
	      for (var i = 0; i < path[0].params.length; i++) {
	        if (path[0].params[i] === node) {
	          return true;
	        }
	      }
	    }
	  }
	  return false;
	};

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function visitSuperCallExpression(traverse, node, path, state) {
	  var superClassName = state.superClass.name;

	  if (node.callee.type === Syntax.Identifier) {
	    if (_isConstructorMethod(state.methodNode)) {
	      utils.append(superClassName + '.call(', state);
	    } else {
	      var protoProp = SUPER_PROTO_IDENT_PREFIX + superClassName;
	      if (state.methodNode.key.type === Syntax.Identifier) {
	        protoProp += '.' + state.methodNode.key.name;
	      } else if (state.methodNode.key.type === Syntax.Literal) {
	        protoProp += '[' + JSON.stringify(state.methodNode.key.value) + ']';
	      }
	      utils.append(protoProp + ".call(", state);
	    }
	    utils.move(node.callee.range[1], state);
	  } else if (node.callee.type === Syntax.MemberExpression) {
	    utils.append(SUPER_PROTO_IDENT_PREFIX + superClassName, state);
	    utils.move(node.callee.object.range[1], state);

	    if (node.callee.computed) {
	      // ["a" + "b"]
	      utils.catchup(node.callee.property.range[1] + ']'.length, state);
	    } else {
	      // .ab
	      utils.append('.' + node.callee.property.name, state);
	    }

	    utils.append('.call(', state);
	    utils.move(node.callee.range[1], state);
	  }

	  utils.append('this', state);
	  if (node.arguments.length > 0) {
	    utils.append(',', state);
	    utils.catchupWhiteSpace(node.arguments[0].range[0], state);
	    traverse(node.arguments, path, state);
	  }

	  utils.catchupWhiteSpace(node.range[1], state);
	  utils.append(')', state);
	  return false;
	}
	visitSuperCallExpression.test = function(node, path, state) {
	  if (state.superClass && node.type === Syntax.CallExpression) {
	    var callee = node.callee;
	    if (callee.type === Syntax.Identifier && callee.name === 'super'
	        || callee.type == Syntax.MemberExpression
	           && callee.object.name === 'super') {
	      return true;
	    }
	  }
	  return false;
	};

	/**
	 * @param {function} traverse
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function visitSuperMemberExpression(traverse, node, path, state) {
	  var superClassName = state.superClass.name;

	  utils.append(SUPER_PROTO_IDENT_PREFIX + superClassName, state);
	  utils.move(node.object.range[1], state);
	}
	visitSuperMemberExpression.test = function(node, path, state) {
	  return state.superClass
	         && node.type === Syntax.MemberExpression
	         && node.object.type === Syntax.Identifier
	         && node.object.name === 'super';
	};

	exports.resetSymbols = resetSymbols;

	exports.visitorList = [
	  visitClassDeclaration,
	  visitClassExpression,
	  visitClassFunctionExpression,
	  visitClassMethod,
	  visitClassMethodParam,
	  visitPrivateIdentifier,
	  visitSuperCallExpression,
	  visitSuperMemberExpression
	];


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/*global exports:true*/

	/**
	 * Implements ES6 destructuring assignment and pattern matchng.
	 *
	 * function init({port, ip, coords: [x, y]}) {
	 *   return (x && y) ? {id, port} : {ip};
	 * };
	 *
	 * function init($__0) {
	 *   var
	 *    port = $__0.port,
	 *    ip = $__0.ip,
	 *    $__1 = $__0.coords,
	 *    x = $__1[0],
	 *    y = $__1[1];
	 *   return (x && y) ? {id, port} : {ip};
	 * }
	 *
	 * var x, {ip, port} = init({ip, port});
	 *
	 * var x, $__0 = init({ip, port}), ip = $__0.ip, port = $__0.port;
	 *
	 */
	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);

	var reservedWordsHelper = __webpack_require__(77);
	var restParamVisitors = __webpack_require__(44);
	var restPropertyHelpers = __webpack_require__(78);

	// -------------------------------------------------------
	// 1. Structured variable declarations.
	//
	// var [a, b] = [b, a];
	// var {x, y} = {y, x};
	// -------------------------------------------------------

	function visitStructuredVariable(traverse, node, path, state) {
	  // Allocate new temp for the pattern.
	  utils.append(utils.getTempVar(state.localScope.tempVarIndex) + '=', state);
	  // Skip the pattern and assign the init to the temp.
	  utils.catchupWhiteSpace(node.init.range[0], state);
	  traverse(node.init, path, state);
	  utils.catchup(node.init.range[1], state);
	  // Render the destructured data.
	  utils.append(',' + getDestructuredComponents(node.id, state), state);
	  state.localScope.tempVarIndex++;
	  return false;
	}

	visitStructuredVariable.test = function(node, path, state) {
	  return node.type === Syntax.VariableDeclarator &&
	    isStructuredPattern(node.id);
	};

	function isStructuredPattern(node) {
	  return node.type === Syntax.ObjectPattern ||
	    node.type === Syntax.ArrayPattern;
	}

	// Main function which does actual recursive destructuring
	// of nested complex structures.
	function getDestructuredComponents(node, state) {
	  var tmpIndex = state.localScope.tempVarIndex;
	  var components = [];
	  var patternItems = getPatternItems(node);

	  for (var idx = 0; idx < patternItems.length; idx++) {
	    var item = patternItems[idx];
	    if (!item) {
	      continue;
	    }

	    if (item.type === Syntax.SpreadElement) {
	      // Spread/rest of an array.
	      // TODO(dmitrys): support spread in the middle of a pattern
	      // and also for function param patterns: [x, ...xs, y]
	      components.push(item.argument.name +
	        '=Array.prototype.slice.call(' +
	        utils.getTempVar(tmpIndex) + ',' + idx + ')'
	      );
	      continue;
	    }

	    if (item.type === Syntax.SpreadProperty) {
	      var restExpression = restPropertyHelpers.renderRestExpression(
	        utils.getTempVar(tmpIndex),
	        patternItems
	      );
	      components.push(item.argument.name + '=' + restExpression);
	      continue;
	    }

	    // Depending on pattern type (Array or Object), we get
	    // corresponding pattern item parts.
	    var accessor = getPatternItemAccessor(node, item, tmpIndex, idx);
	    var value = getPatternItemValue(node, item);

	    // TODO(dmitrys): implement default values: {x, y=5}
	    if (value.type === Syntax.Identifier) {
	      // Simple pattern item.
	      components.push(value.name + '=' + accessor);
	    } else {
	      // Complex sub-structure.
	      components.push(
	        utils.getTempVar(++state.localScope.tempVarIndex) + '=' + accessor +
	        ',' + getDestructuredComponents(value, state)
	      );
	    }
	  }

	  return components.join(',');
	}

	function getPatternItems(node) {
	  return node.properties || node.elements;
	}

	function getPatternItemAccessor(node, patternItem, tmpIndex, idx) {
	  var tmpName = utils.getTempVar(tmpIndex);
	  if (node.type === Syntax.ObjectPattern) {
	    if (reservedWordsHelper.isReservedWord(patternItem.key.name)) {
	      return tmpName + '["' + patternItem.key.name + '"]';
	    } else if (patternItem.key.type === Syntax.Literal) {
	      return tmpName + '[' + JSON.stringify(patternItem.key.value) + ']';
	    } else if (patternItem.key.type === Syntax.Identifier) {
	      return tmpName + '.' + patternItem.key.name;
	    }
	  } else if (node.type === Syntax.ArrayPattern) {
	    return tmpName + '[' + idx + ']';
	  }
	}

	function getPatternItemValue(node, patternItem) {
	  return node.type === Syntax.ObjectPattern
	    ? patternItem.value
	    : patternItem;
	}

	// -------------------------------------------------------
	// 2. Assignment expression.
	//
	// [a, b] = [b, a];
	// ({x, y} = {y, x});
	// -------------------------------------------------------

	function visitStructuredAssignment(traverse, node, path, state) {
	  var exprNode = node.expression;
	  utils.append('var ' + utils.getTempVar(state.localScope.tempVarIndex) + '=', state);

	  utils.catchupWhiteSpace(exprNode.right.range[0], state);
	  traverse(exprNode.right, path, state);
	  utils.catchup(exprNode.right.range[1], state);

	  utils.append(
	    ';' + getDestructuredComponents(exprNode.left, state) + ';',
	    state
	  );

	  utils.catchupWhiteSpace(node.range[1], state);
	  state.localScope.tempVarIndex++;
	  return false;
	}

	visitStructuredAssignment.test = function(node, path, state) {
	  // We consider the expression statement rather than just assignment
	  // expression to cover case with object patters which should be
	  // wrapped in grouping operator: ({x, y} = {y, x});
	  return node.type === Syntax.ExpressionStatement &&
	    node.expression.type === Syntax.AssignmentExpression &&
	    isStructuredPattern(node.expression.left);
	};

	// -------------------------------------------------------
	// 3. Structured parameter.
	//
	// function foo({x, y}) { ... }
	// -------------------------------------------------------

	function visitStructuredParameter(traverse, node, path, state) {
	  utils.append(utils.getTempVar(getParamIndex(node, path)), state);
	  utils.catchupWhiteSpace(node.range[1], state);
	  return true;
	}

	function getParamIndex(paramNode, path) {
	  var funcNode = path[0];
	  var tmpIndex = 0;
	  for (var k = 0; k < funcNode.params.length; k++) {
	    var param = funcNode.params[k];
	    if (param === paramNode) {
	      break;
	    }
	    if (isStructuredPattern(param)) {
	      tmpIndex++;
	    }
	  }
	  return tmpIndex;
	}

	visitStructuredParameter.test = function(node, path, state) {
	  return isStructuredPattern(node) && isFunctionNode(path[0]);
	};

	function isFunctionNode(node) {
	  return (node.type == Syntax.FunctionDeclaration ||
	    node.type == Syntax.FunctionExpression ||
	    node.type == Syntax.MethodDefinition ||
	    node.type == Syntax.ArrowFunctionExpression);
	}

	// -------------------------------------------------------
	// 4. Function body for structured parameters.
	//
	// function foo({x, y}) { x; y; }
	// -------------------------------------------------------

	function visitFunctionBodyForStructuredParameter(traverse, node, path, state) {
	  var funcNode = path[0];

	  utils.catchup(funcNode.body.range[0] + 1, state);
	  renderDestructuredComponents(funcNode, state);

	  if (funcNode.rest) {
	    utils.append(
	      restParamVisitors.renderRestParamSetup(funcNode, state),
	      state
	    );
	  }

	  return true;
	}

	function renderDestructuredComponents(funcNode, state) {
	  var destructuredComponents = [];

	  for (var k = 0; k < funcNode.params.length; k++) {
	    var param = funcNode.params[k];
	    if (isStructuredPattern(param)) {
	      destructuredComponents.push(
	        getDestructuredComponents(param, state)
	      );
	      state.localScope.tempVarIndex++;
	    }
	  }

	  if (destructuredComponents.length) {
	    utils.append('var ' + destructuredComponents.join(',') + ';', state);
	  }
	}

	visitFunctionBodyForStructuredParameter.test = function(node, path, state) {
	  return node.type === Syntax.BlockStatement && isFunctionNode(path[0]);
	};

	exports.visitorList = [
	  visitStructuredVariable,
	  visitStructuredAssignment,
	  visitStructuredParameter,
	  visitFunctionBodyForStructuredParameter
	];

	exports.renderDestructuredComponents = renderDestructuredComponents;



/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*jslint node:true*/

	/**
	 * Desugars concise methods of objects to function expressions.
	 *
	 * var foo = {
	 *   method(x, y) { ... }
	 * };
	 *
	 * var foo = {
	 *   method: function(x, y) { ... }
	 * };
	 *
	 */

	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);
	var reservedWordsHelper = __webpack_require__(77);

	function visitObjectConciseMethod(traverse, node, path, state) {
	  var isGenerator = node.value.generator;
	  if (isGenerator) {
	    utils.catchupWhiteSpace(node.range[0] + 1, state);
	  }
	  if (node.computed) { // [<expr>]() { ...}
	    utils.catchup(node.key.range[1] + 1, state);
	  } else if (reservedWordsHelper.isReservedWord(node.key.name)) {
	    utils.catchup(node.key.range[0], state);
	    utils.append('"', state);
	    utils.catchup(node.key.range[1], state);
	    utils.append('"', state);
	  }

	  utils.catchup(node.key.range[1], state);
	  utils.append(
	    ':function' + (isGenerator ? '*' : ''),
	    state
	  );
	  path.unshift(node);
	  traverse(node.value, path, state);
	  path.shift();
	  return false;
	}

	visitObjectConciseMethod.test = function(node, path, state) {
	  return node.type === Syntax.Property &&
	    node.value.type === Syntax.FunctionExpression &&
	    node.method === true;
	};

	exports.visitorList = [
	  visitObjectConciseMethod
	];


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*jslint node: true*/

	/**
	 * Desugars ES6 Object Literal short notations into ES3 full notation.
	 *
	 * // Easier return values.
	 * function foo(x, y) {
	 *   return {x, y}; // {x: x, y: y}
	 * };
	 *
	 * // Destructuring.
	 * function init({port, ip, coords: {x, y}}) { ... }
	 *
	 */
	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);

	/**
	 * @public
	 */
	function visitObjectLiteralShortNotation(traverse, node, path, state) {
	  utils.catchup(node.key.range[1], state);
	  utils.append(':' + node.key.name, state);
	  return false;
	}

	visitObjectLiteralShortNotation.test = function(node, path, state) {
	  return node.type === Syntax.Property &&
	    node.kind === 'init' &&
	    node.shorthand === true &&
	    path[0].type !== Syntax.ObjectPattern;
	};

	exports.visitorList = [
	  visitObjectLiteralShortNotation
	];



/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*jslint node:true*/

	/**
	 * Desugars ES6 rest parameters into an ES3 arguments array.
	 *
	 * function printf(template, ...args) {
	 *   args.forEach(...);
	 * }
	 *
	 * We could use `Array.prototype.slice.call`, but that usage of arguments causes
	 * functions to be deoptimized in V8, so instead we use a for-loop.
	 *
	 * function printf(template) {
	 *   for (var args = [], $__0 = 1, $__1 = arguments.length; $__0 < $__1; $__0++)
	 *     args.push(arguments[$__0]);
	 *   args.forEach(...);
	 * }
	 *
	 */
	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);



	function _nodeIsFunctionWithRestParam(node) {
	  return (node.type === Syntax.FunctionDeclaration
	          || node.type === Syntax.FunctionExpression
	          || node.type === Syntax.ArrowFunctionExpression)
	         && node.rest;
	}

	function visitFunctionParamsWithRestParam(traverse, node, path, state) {
	  if (node.parametricType) {
	    utils.catchup(node.parametricType.range[0], state);
	    path.unshift(node);
	    traverse(node.parametricType, path, state);
	    path.shift();
	  }

	  // Render params.
	  if (node.params.length) {
	    path.unshift(node);
	    traverse(node.params, path, state);
	    path.shift();
	  } else {
	    // -3 is for ... of the rest.
	    utils.catchup(node.rest.range[0] - 3, state);
	  }
	  utils.catchupWhiteSpace(node.rest.range[1], state);

	  path.unshift(node);
	  traverse(node.body, path, state);
	  path.shift();

	  return false;
	}

	visitFunctionParamsWithRestParam.test = function(node, path, state) {
	  return _nodeIsFunctionWithRestParam(node);
	};

	function renderRestParamSetup(functionNode, state) {
	  var idx = state.localScope.tempVarIndex++;
	  var len = state.localScope.tempVarIndex++;

	  return 'for (var ' + functionNode.rest.name + '=[],' +
	    utils.getTempVar(idx) + '=' + functionNode.params.length + ',' +
	    utils.getTempVar(len) + '=arguments.length;' +
	    utils.getTempVar(idx) + '<' +  utils.getTempVar(len) + ';' +
	    utils.getTempVar(idx) + '++) ' +
	    functionNode.rest.name + '.push(arguments[' + utils.getTempVar(idx) + ']);';
	}

	function visitFunctionBodyWithRestParam(traverse, node, path, state) {
	  utils.catchup(node.range[0] + 1, state);
	  var parentNode = path[0];
	  utils.append(renderRestParamSetup(parentNode, state), state);
	  return true;
	}

	visitFunctionBodyWithRestParam.test = function(node, path, state) {
	  return node.type === Syntax.BlockStatement
	         && _nodeIsFunctionWithRestParam(path[0]);
	};

	exports.renderRestParamSetup = renderRestParamSetup;
	exports.visitorList = [
	  visitFunctionParamsWithRestParam,
	  visitFunctionBodyWithRestParam
	];


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2004-present Facebook. All Rights Reserved.
	 */
	/*global exports:true*/

	/**
	 * Implements ES6 call spread.
	 *
	 * instance.method(a, b, c, ...d)
	 *
	 * instance.method.apply(instance, [a, b, c].concat(d))
	 *
	 */

	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);

	function process(traverse, node, path, state) {
	  utils.move(node.range[0], state);
	  traverse(node, path, state);
	  utils.catchup(node.range[1], state);
	}

	function visitCallSpread(traverse, node, path, state) {
	  utils.catchup(node.range[0], state);

	  if (node.type === Syntax.NewExpression) {
	    // Input  = new Set(1, 2, ...list)
	    // Output = new (Function.prototype.bind.apply(Set, [null, 1, 2].concat(list)))
	    utils.append('new (Function.prototype.bind.apply(', state);
	    process(traverse, node.callee, path, state);
	  } else if (node.callee.type === Syntax.MemberExpression) {
	    // Input  = get().fn(1, 2, ...more)
	    // Output = (_ = get()).fn.apply(_, [1, 2].apply(more))
	    var tempVar = utils.injectTempVar(state);
	    utils.append('(' + tempVar + ' = ', state);
	    process(traverse, node.callee.object, path, state);
	    utils.append(')', state);
	    if (node.callee.property.type === Syntax.Identifier) {
	      utils.append('.', state);
	      process(traverse, node.callee.property, path, state);
	    } else {
	      utils.append('[', state);
	      process(traverse, node.callee.property, path, state);
	      utils.append(']', state);
	    }
	    utils.append('.apply(' + tempVar, state);
	  } else {
	    // Input  = max(1, 2, ...list)
	    // Output = max.apply(null, [1, 2].concat(list))
	    var needsToBeWrappedInParenthesis =
	      node.callee.type === Syntax.FunctionDeclaration ||
	      node.callee.type === Syntax.FunctionExpression;
	    if (needsToBeWrappedInParenthesis) {
	      utils.append('(', state);
	    }
	    process(traverse, node.callee, path, state);
	    if (needsToBeWrappedInParenthesis) {
	      utils.append(')', state);
	    }
	    utils.append('.apply(null', state);
	  }
	  utils.append(', ', state);

	  var args = node.arguments.slice();
	  var spread = args.pop();
	  if (args.length || node.type === Syntax.NewExpression) {
	    utils.append('[', state);
	    if (node.type === Syntax.NewExpression) {
	      utils.append('null' + (args.length ? ', ' : ''), state);
	    }
	    while (args.length) {
	      var arg = args.shift();
	      utils.move(arg.range[0], state);
	      traverse(arg, path, state);
	      if (args.length) {
	        utils.catchup(args[0].range[0], state);
	      } else {
	        utils.catchup(arg.range[1], state);
	      }
	    }
	    utils.append('].concat(', state);
	    process(traverse, spread.argument, path, state);
	    utils.append(')', state);
	  } else {
	    process(traverse, spread.argument, path, state);
	  }
	  utils.append(node.type === Syntax.NewExpression ? '))' : ')', state);

	  utils.move(node.range[1], state);
	  return false;
	}

	visitCallSpread.test = function(node, path, state) {
	  return (
	    (
	      node.type === Syntax.CallExpression ||
	      node.type === Syntax.NewExpression
	    ) &&
	    node.arguments.length > 0 &&
	    node.arguments[node.arguments.length - 1].type === Syntax.SpreadElement
	  );
	};

	exports.visitorList = [
	  visitCallSpread,
	];


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2004-present Facebook. All Rights Reserved.
	 */
	/*global exports:true*/

	/**
	 * Implements ES7 object spread property.
	 * https://gist.github.com/sebmarkbage/aa849c7973cb4452c547
	 *
	 * { ...a, x: 1 }
	 *
	 * Object.assign({}, a, {x: 1 })
	 *
	 */

	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);

	function visitObjectLiteralSpread(traverse, node, path, state) {
	  utils.catchup(node.range[0], state);

	  utils.append('Object.assign({', state);

	  // Skip the original {
	  utils.move(node.range[0] + 1, state);

	  var previousWasSpread = false;

	  for (var i = 0; i < node.properties.length; i++) {
	    var property = node.properties[i];
	    if (property.type === Syntax.SpreadProperty) {

	      // Close the previous object or initial object
	      if (!previousWasSpread) {
	        utils.append('}', state);
	      }

	      if (i === 0) {
	        // Normally there will be a comma when we catch up, but not before
	        // the first property.
	        utils.append(',', state);
	      }

	      utils.catchup(property.range[0], state);

	      // skip ...
	      utils.move(property.range[0] + 3, state);

	      traverse(property.argument, path, state);

	      utils.catchup(property.range[1], state);

	      previousWasSpread = true;

	    } else {

	      utils.catchup(property.range[0], state);

	      if (previousWasSpread) {
	        utils.append('{', state);
	      }

	      traverse(property, path, state);

	      utils.catchup(property.range[1], state);

	      previousWasSpread = false;

	    }
	  }

	  // Strip any non-whitespace between the last item and the end.
	  // We only catch up on whitespace so that we ignore any trailing commas which
	  // are stripped out for IE8 support. Unfortunately, this also strips out any
	  // trailing comments.
	  utils.catchupWhiteSpace(node.range[1] - 1, state);

	  // Skip the trailing }
	  utils.move(node.range[1], state);

	  if (!previousWasSpread) {
	    utils.append('}', state);
	  }

	  utils.append(')', state);
	  return false;
	}

	visitObjectLiteralSpread.test = function(node, path, state) {
	  if (node.type !== Syntax.ObjectExpression) {
	    return false;
	  }
	  // Tight loop optimization
	  var hasAtLeastOneSpreadProperty = false;
	  for (var i = 0; i < node.properties.length; i++) {
	    var property = node.properties[i];
	    if (property.type === Syntax.SpreadProperty) {
	      hasAtLeastOneSpreadProperty = true;
	    } else if (property.kind !== 'init') {
	      return false;
	    }
	  }
	  return hasAtLeastOneSpreadProperty;
	};

	exports.visitorList = [
	  visitObjectLiteralSpread
	];


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	/*global exports:true*/
	'use strict';

	var Syntax = __webpack_require__(37).Syntax;
	var utils = __webpack_require__(64);

	var renderJSXExpressionContainer =
	  __webpack_require__(79).renderJSXExpressionContainer;
	var renderJSXLiteral = __webpack_require__(79).renderJSXLiteral;
	var quoteAttrName = __webpack_require__(79).quoteAttrName;

	var trimLeft = __webpack_require__(79).trimLeft;

	/**
	 * Customized desugar processor for React JSX. Currently:
	 *
	 * <X> </X> => React.createElement(X, null)
	 * <X prop="1" /> => React.createElement(X, {prop: '1'}, null)
	 * <X prop="2"><Y /></X> => React.createElement(X, {prop:'2'},
	 *   React.createElement(Y, null)
	 * )
	 * <div /> => React.createElement("div", null)
	 */

	/**
	 * Removes all non-whitespace/parenthesis characters
	 */
	var reNonWhiteParen = /([^\s\(\)])/g;
	function stripNonWhiteParen(value) {
	  return value.replace(reNonWhiteParen, '');
	}

	var tagConvention = /^[a-z]|\-/;
	function isTagName(name) {
	  return tagConvention.test(name);
	}

	function visitReactTag(traverse, object, path, state) {
	  var openingElement = object.openingElement;
	  var nameObject = openingElement.name;
	  var attributesObject = openingElement.attributes;

	  utils.catchup(openingElement.range[0], state, trimLeft);

	  if (nameObject.type === Syntax.JSXNamespacedName && nameObject.namespace) {
	    throw new Error('Namespace tags are not supported. ReactJSX is not XML.');
	  }

	  // We assume that the React runtime is already in scope
	  utils.append('React.createElement(', state);

	  if (nameObject.type === Syntax.JSXIdentifier && isTagName(nameObject.name)) {
	    utils.append('"' + nameObject.name + '"', state);
	    utils.move(nameObject.range[1], state);
	  } else {
	    // Use utils.catchup in this case so we can easily handle
	    // JSXMemberExpressions which look like Foo.Bar.Baz. This also handles
	    // JSXIdentifiers that aren't fallback tags.
	    utils.move(nameObject.range[0], state);
	    utils.catchup(nameObject.range[1], state);
	  }

	  utils.append(', ', state);

	  var hasAttributes = attributesObject.length;

	  var hasAtLeastOneSpreadProperty = attributesObject.some(function(attr) {
	    return attr.type === Syntax.JSXSpreadAttribute;
	  });

	  // if we don't have any attributes, pass in null
	  if (hasAtLeastOneSpreadProperty) {
	    utils.append('React.__spread({', state);
	  } else if (hasAttributes) {
	    utils.append('{', state);
	  } else {
	    utils.append('null', state);
	  }

	  // keep track of if the previous attribute was a spread attribute
	  var previousWasSpread = false;

	  // write attributes
	  attributesObject.forEach(function(attr, index) {
	    var isLast = index === attributesObject.length - 1;

	    if (attr.type === Syntax.JSXSpreadAttribute) {
	      // Close the previous object or initial object
	      if (!previousWasSpread) {
	        utils.append('}, ', state);
	      }

	      // Move to the expression start, ignoring everything except parenthesis
	      // and whitespace.
	      utils.catchup(attr.range[0], state, stripNonWhiteParen);
	      // Plus 1 to skip `{`.
	      utils.move(attr.range[0] + 1, state);
	      utils.catchup(attr.argument.range[0], state, stripNonWhiteParen);

	      traverse(attr.argument, path, state);

	      utils.catchup(attr.argument.range[1], state);

	      // Move to the end, ignoring parenthesis and the closing `}`
	      utils.catchup(attr.range[1] - 1, state, stripNonWhiteParen);

	      if (!isLast) {
	        utils.append(', ', state);
	      }

	      utils.move(attr.range[1], state);

	      previousWasSpread = true;

	      return;
	    }

	    // If the next attribute is a spread, we're effective last in this object
	    if (!isLast) {
	      isLast = attributesObject[index + 1].type === Syntax.JSXSpreadAttribute;
	    }

	    if (attr.name.namespace) {
	      throw new Error(
	         'Namespace attributes are not supported. ReactJSX is not XML.');
	    }
	    var name = attr.name.name;

	    utils.catchup(attr.range[0], state, trimLeft);

	    if (previousWasSpread) {
	      utils.append('{', state);
	    }

	    utils.append(quoteAttrName(name), state);
	    utils.append(': ', state);

	    if (!attr.value) {
	      state.g.buffer += 'true';
	      state.g.position = attr.name.range[1];
	      if (!isLast) {
	        utils.append(', ', state);
	      }
	    } else {
	      utils.move(attr.name.range[1], state);
	      // Use catchupNewlines to skip over the '=' in the attribute
	      utils.catchupNewlines(attr.value.range[0], state);
	      if (attr.value.type === Syntax.Literal) {
	        renderJSXLiteral(attr.value, isLast, state);
	      } else {
	        renderJSXExpressionContainer(traverse, attr.value, isLast, path, state);
	      }
	    }

	    utils.catchup(attr.range[1], state, trimLeft);

	    previousWasSpread = false;

	  });

	  if (!openingElement.selfClosing) {
	    utils.catchup(openingElement.range[1] - 1, state, trimLeft);
	    utils.move(openingElement.range[1], state);
	  }

	  if (hasAttributes && !previousWasSpread) {
	    utils.append('}', state);
	  }

	  if (hasAtLeastOneSpreadProperty) {
	    utils.append(')', state);
	  }

	  // filter out whitespace
	  var childrenToRender = object.children.filter(function(child) {
	    return !(child.type === Syntax.Literal
	             && typeof child.value === 'string'
	             && child.value.match(/^[ \t]*[\r\n][ \t\r\n]*$/));
	  });
	  if (childrenToRender.length > 0) {
	    var lastRenderableIndex;

	    childrenToRender.forEach(function(child, index) {
	      if (child.type !== Syntax.JSXExpressionContainer ||
	          child.expression.type !== Syntax.JSXEmptyExpression) {
	        lastRenderableIndex = index;
	      }
	    });

	    if (lastRenderableIndex !== undefined) {
	      utils.append(', ', state);
	    }

	    childrenToRender.forEach(function(child, index) {
	      utils.catchup(child.range[0], state, trimLeft);

	      var isLast = index >= lastRenderableIndex;

	      if (child.type === Syntax.Literal) {
	        renderJSXLiteral(child, isLast, state);
	      } else if (child.type === Syntax.JSXExpressionContainer) {
	        renderJSXExpressionContainer(traverse, child, isLast, path, state);
	      } else {
	        traverse(child, path, state);
	        if (!isLast) {
	          utils.append(', ', state);
	        }
	      }

	      utils.catchup(child.range[1], state, trimLeft);
	    });
	  }

	  if (openingElement.selfClosing) {
	    // everything up to />
	    utils.catchup(openingElement.range[1] - 2, state, trimLeft);
	    utils.move(openingElement.range[1], state);
	  } else {
	    // everything up to </ sdflksjfd>
	    utils.catchup(object.closingElement.range[0], state, trimLeft);
	    utils.move(object.closingElement.range[1], state);
	  }

	  utils.append(')', state);
	  return false;
	}

	visitReactTag.test = function(object, path, state) {
	  return object.type === Syntax.JSXElement;
	};

	exports.visitorList = [
	  visitReactTag
	];


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	/*global exports:true*/
	'use strict';

	var Syntax = __webpack_require__(37).Syntax;
	var utils = __webpack_require__(64);

	function addDisplayName(displayName, object, state) {
	  if (object &&
	      object.type === Syntax.CallExpression &&
	      object.callee.type === Syntax.MemberExpression &&
	      object.callee.object.type === Syntax.Identifier &&
	      object.callee.object.name === 'React' &&
	      object.callee.property.type === Syntax.Identifier &&
	      object.callee.property.name === 'createClass' &&
	      object.arguments.length === 1 &&
	      object.arguments[0].type === Syntax.ObjectExpression) {
	    // Verify that the displayName property isn't already set
	    var properties = object.arguments[0].properties;
	    var safe = properties.every(function(property) {
	      var value = property.key.type === Syntax.Identifier ?
	        property.key.name :
	        property.key.value;
	      return value !== 'displayName';
	    });

	    if (safe) {
	      utils.catchup(object.arguments[0].range[0] + 1, state);
	      utils.append('displayName: "' + displayName + '",', state);
	    }
	  }
	}

	/**
	 * Transforms the following:
	 *
	 * var MyComponent = React.createClass({
	 *    render: ...
	 * });
	 *
	 * into:
	 *
	 * var MyComponent = React.createClass({
	 *    displayName: 'MyComponent',
	 *    render: ...
	 * });
	 *
	 * Also catches:
	 *
	 * MyComponent = React.createClass(...);
	 * exports.MyComponent = React.createClass(...);
	 * module.exports = {MyComponent: React.createClass(...)};
	 */
	function visitReactDisplayName(traverse, object, path, state) {
	  var left, right;

	  if (object.type === Syntax.AssignmentExpression) {
	    left = object.left;
	    right = object.right;
	  } else if (object.type === Syntax.Property) {
	    left = object.key;
	    right = object.value;
	  } else if (object.type === Syntax.VariableDeclarator) {
	    left = object.id;
	    right = object.init;
	  }

	  if (left && left.type === Syntax.MemberExpression) {
	    left = left.property;
	  }
	  if (left && left.type === Syntax.Identifier) {
	    addDisplayName(left.name, right, state);
	  }
	}

	visitReactDisplayName.test = function(object, path, state) {
	  return (
	    object.type === Syntax.AssignmentExpression ||
	    object.type === Syntax.Property ||
	    object.type === Syntax.VariableDeclarator
	  );
	};

	exports.visitorList = [
	  visitReactDisplayName
	];


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
	/*global exports:true*/

	var Syntax = __webpack_require__(84).Syntax;
	var utils = __webpack_require__(64);
	var reserverdWordsHelper = __webpack_require__(77);

	/**
	 * Code adapted from https://github.com/spicyj/es3ify
	 * The MIT License (MIT)
	 * Copyright (c) 2014 Ben Alpert
	 */

	function visitProperty(traverse, node, path, state) {
	  utils.catchup(node.key.range[0], state);
	  utils.append('"', state);
	  utils.catchup(node.key.range[1], state);
	  utils.append('"', state);
	  utils.catchup(node.value.range[0], state);
	  traverse(node.value, path, state);
	  return false;
	}

	visitProperty.test = function(node) {
	  return node.type === Syntax.Property &&
	    node.key.type === Syntax.Identifier &&
	    !node.method &&
	    !node.shorthand &&
	    !node.computed &&
	    reserverdWordsHelper.isES3ReservedWord(node.key.name);
	};

	function visitMemberExpression(traverse, node, path, state) {
	  traverse(node.object, path, state);
	  utils.catchup(node.property.range[0] - 1, state);
	  utils.append('[', state);
	  utils.catchupWhiteSpace(node.property.range[0], state);
	  utils.append('"', state);
	  utils.catchup(node.property.range[1], state);
	  utils.append('"]', state);
	  return false;
	}

	visitMemberExpression.test = function(node) {
	  return node.type === Syntax.MemberExpression &&
	    node.property.type === Syntax.Identifier &&
	    reserverdWordsHelper.isES3ReservedWord(node.property.name);
	};

	exports.visitorList = [
	  visitProperty,
	  visitMemberExpression
	];


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.5.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseCopy = __webpack_require__(91),
	    baseToString = __webpack_require__(92),
	    baseValues = __webpack_require__(93),
	    isIterateeCall = __webpack_require__(94),
	    reInterpolate = __webpack_require__(53),
	    escape = __webpack_require__(90),
	    isNative = __webpack_require__(95),
	    keys = __webpack_require__(96),
	    restParam = __webpack_require__(97),
	    templateSettings = __webpack_require__(98);

	/** `Object#toString` result references. */
	var errorTag = '[object Error]';

	/** Used to match empty string literals in compiled template source. */
	var reEmptyStringLeading = /\b__p \+= '';/g,
	    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	/** Used to match [ES template delimiters](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components). */
	var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	/** Used to ensure capturing order of template delimiters. */
	var reNoMatch = /($^)/;

	/** Used to match unescaped characters in compiled string literals. */
	var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

	/** Used to escape characters for inclusion in compiled string literals. */
	var stringEscapes = {
	  '\\': '\\',
	  "'": "'",
	  '\n': 'n',
	  '\r': 'r',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	/**
	 * Used by `_.template` to escape characters for inclusion in compiled
	 * string literals.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeStringChar(chr) {
	  return '\\' + stringEscapes[chr];
	}

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var arrayProto = Array.prototype,
	    objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Native method references. */
	var getOwnPropertySymbols = isNative(getOwnPropertySymbols = Object.getOwnPropertySymbols) && getOwnPropertySymbols,
	    push = arrayProto.push;

	/**
	 * Used by `_.template` to customize its `_.assign` use.
	 *
	 * **Note:** This function is like `assignDefaults` except that it ignores
	 * inherited property values when checking if a property is `undefined`.
	 *
	 * @private
	 * @param {*} objectValue The destination object property value.
	 * @param {*} sourceValue The source object property value.
	 * @param {string} key The key associated with the object and source values.
	 * @param {Object} object The destination object.
	 * @returns {*} Returns the value to assign to the destination object.
	 */
	function assignOwnDefaults(objectValue, sourceValue, key, object) {
	  return (objectValue === undefined || !hasOwnProperty.call(object, key))
	    ? sourceValue
	    : objectValue;
	}

	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var props = keys(source);
	  push.apply(props, getSymbols(source));

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);

	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	var baseAssign = function(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, getSymbols(source), baseCopy(source, keys(source), object));
	};

	/**
	 * Creates an array of the own symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !getOwnPropertySymbols ? constant([]) : function(object) {
	  return getOwnPropertySymbols(toObject(object));
	};

	/**
	 * Converts `value` to an object if it is not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	/**
	 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	 * `SyntaxError`, `TypeError`, or `URIError` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	 * @example
	 *
	 * _.isError(new Error);
	 * // => true
	 *
	 * _.isError(Error);
	 * // => false
	 */
	function isError(value) {
	  return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return type == 'function' || (!!value && type == 'object');
	}

	/**
	 * Creates a compiled template function that can interpolate data properties
	 * in "interpolate" delimiters, HTML-escape interpolated data properties in
	 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	 * properties may be accessed as free variables in the template. If a setting
	 * object is provided it takes precedence over `_.templateSettings` values.
	 *
	 * **Note:** In the development build `_.template` utilizes
	 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	 * for easier debugging.
	 *
	 * For more information on precompiling templates see
	 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	 *
	 * For more information on Chrome extension sandboxes see
	 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The template string.
	 * @param {Object} [options] The options object.
	 * @param {RegExp} [options.escape] The HTML "escape" delimiter.
	 * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	 * @param {Object} [options.imports] An object to import into the template as free variables.
	 * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	 * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
	 * @param {string} [options.variable] The data object variable name.
	 * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
	 * @returns {Function} Returns the compiled template function.
	 * @example
	 *
	 * // using the "interpolate" delimiter to create a compiled template
	 * var compiled = _.template('hello <%= user %>!');
	 * compiled({ 'user': 'fred' });
	 * // => 'hello fred!'
	 *
	 * // using the HTML "escape" delimiter to escape data property values
	 * var compiled = _.template('<b><%- value %></b>');
	 * compiled({ 'value': '<script>' });
	 * // => '<b>&lt;script&gt;</b>'
	 *
	 * // using the "evaluate" delimiter to execute JavaScript and generate HTML
	 * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	 * compiled({ 'users': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // using the internal `print` function in "evaluate" delimiters
	 * var compiled = _.template('<% print("hello " + user); %>!');
	 * compiled({ 'user': 'barney' });
	 * // => 'hello barney!'
	 *
	 * // using the ES delimiter as an alternative to the default "interpolate" delimiter
	 * var compiled = _.template('hello ${ user }!');
	 * compiled({ 'user': 'pebbles' });
	 * // => 'hello pebbles!'
	 *
	 * // using custom template delimiters
	 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	 * var compiled = _.template('hello {{ user }}!');
	 * compiled({ 'user': 'mustache' });
	 * // => 'hello mustache!'
	 *
	 * // using backslashes to treat delimiters as plain text
	 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	 * compiled({ 'value': 'ignored' });
	 * // => '<%- value %>'
	 *
	 * // using the `imports` option to import `jQuery` as `jq`
	 * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	 * compiled({ 'users': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // using the `sourceURL` option to specify a custom sourceURL for the template
	 * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	 * compiled(data);
	 * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	 *
	 * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	 * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	 * compiled.source;
	 * // => function(data) {
	 * //   var __t, __p = '';
	 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	 * //   return __p;
	 * // }
	 *
	 * // using the `source` property to inline compiled templates for meaningful
	 * // line numbers in error messages and a stack trace
	 * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	 *   var JST = {\
	 *     "main": ' + _.template(mainText).source + '\
	 *   };\
	 * ');
	 */
	function template(string, options, otherOptions) {
	  // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
	  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
	  var settings = templateSettings.imports._.templateSettings || templateSettings;

	  if (otherOptions && isIterateeCall(string, options, otherOptions)) {
	    options = otherOptions = null;
	  }
	  string = baseToString(string);
	  options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

	  var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
	      importsKeys = keys(imports),
	      importsValues = baseValues(imports, importsKeys);

	  var isEscaping,
	      isEvaluating,
	      index = 0,
	      interpolate = options.interpolate || reNoMatch,
	      source = "__p += '";

	  // Compile the regexp to match each delimiter.
	  var reDelimiters = RegExp(
	    (options.escape || reNoMatch).source + '|' +
	    interpolate.source + '|' +
	    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	    (options.evaluate || reNoMatch).source + '|$'
	  , 'g');

	  // Use a sourceURL for easier debugging.
	  var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';

	  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	    interpolateValue || (interpolateValue = esTemplateValue);

	    // Escape characters that can't be included in string literals.
	    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	    // Replace delimiters with snippets.
	    if (escapeValue) {
	      isEscaping = true;
	      source += "' +\n__e(" + escapeValue + ") +\n'";
	    }
	    if (evaluateValue) {
	      isEvaluating = true;
	      source += "';\n" + evaluateValue + ";\n__p += '";
	    }
	    if (interpolateValue) {
	      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	    }
	    index = offset + match.length;

	    // The JS engine embedded in Adobe products requires returning the `match`
	    // string in order to produce the correct `offset` value.
	    return match;
	  });

	  source += "';\n";

	  // If `variable` is not specified wrap a with-statement around the generated
	  // code to add the data object to the top of the scope chain.
	  var variable = options.variable;
	  if (!variable) {
	    source = 'with (obj) {\n' + source + '\n}\n';
	  }
	  // Cleanup code by stripping empty strings.
	  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	    .replace(reEmptyStringMiddle, '$1')
	    .replace(reEmptyStringTrailing, '$1;');

	  // Frame code as the function body.
	  source = 'function(' + (variable || 'obj') + ') {\n' +
	    (variable
	      ? ''
	      : 'obj || (obj = {});\n'
	    ) +
	    "var __t, __p = ''" +
	    (isEscaping
	       ? ', __e = _.escape'
	       : ''
	    ) +
	    (isEvaluating
	      ? ', __j = Array.prototype.join;\n' +
	        "function print() { __p += __j.call(arguments, '') }\n"
	      : ';\n'
	    ) +
	    source +
	    'return __p\n}';

	  var result = attempt(function() {
	    return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
	  });

	  // Provide the compiled function's source by its `toString` method or
	  // the `source` property as a convenience for inlining compiled templates.
	  result.source = source;
	  if (isError(result)) {
	    throw result;
	  }
	  return result;
	}

	/**
	 * Attempts to invoke `func`, returning either the result or the caught error
	 * object. Any additional arguments are provided to `func` when it is invoked.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Function} func The function to attempt.
	 * @returns {*} Returns the `func` result or error object.
	 * @example
	 *
	 * // avoid throwing errors for invalid selectors
	 * var elements = _.attempt(function(selector) {
	 *   return document.querySelectorAll(selector);
	 * }, '>_>');
	 *
	 * if (_.isError(elements)) {
	 *   elements = [];
	 * }
	 */
	var attempt = restParam(function(func, args) {
	  try {
	    return func.apply(undefined, args);
	  } catch(e) {
	    return isError(e) ? e : new Error(e);
	  }
	});

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = template;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to match template delimiters. */
	var reEvaluate = /<%([\s\S]+?)%>/g;

	module.exports = reEvaluate;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to match template delimiters. */
	var reEscape = /<%-([\s\S]+?)%>/g;

	module.exports = reEscape;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to match template delimiters. */
	var reInterpolate = /<%=([\s\S]+?)%>/g;

	module.exports = reInterpolate;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (args, opts) {
	    if (!opts) opts = {};
	    
	    var flags = { bools : {}, strings : {}, unknownFn: null };

	    if (typeof opts['unknown'] === 'function') {
	        flags.unknownFn = opts['unknown'];
	    }

	    if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
	      flags.allBools = true;
	    } else {
	      [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
	          flags.bools[key] = true;
	      });
	    }
	    
	    var aliases = {};
	    Object.keys(opts.alias || {}).forEach(function (key) {
	        aliases[key] = [].concat(opts.alias[key]);
	        aliases[key].forEach(function (x) {
	            aliases[x] = [key].concat(aliases[key].filter(function (y) {
	                return x !== y;
	            }));
	        });
	    });

	    [].concat(opts.string).filter(Boolean).forEach(function (key) {
	        flags.strings[key] = true;
	        if (aliases[key]) {
	            flags.strings[aliases[key]] = true;
	        }
	     });

	    var defaults = opts['default'] || {};
	    
	    var argv = { _ : [] };
	    Object.keys(flags.bools).forEach(function (key) {
	        setArg(key, defaults[key] === undefined ? false : defaults[key]);
	    });
	    
	    var notFlags = [];

	    if (args.indexOf('--') !== -1) {
	        notFlags = args.slice(args.indexOf('--')+1);
	        args = args.slice(0, args.indexOf('--'));
	    }

	    function argDefined(key, arg) {
	        return (flags.allBools && /^--[^=]+$/.test(arg)) ||
	            flags.strings[key] || flags.bools[key] || aliases[key];
	    }

	    function setArg (key, val, arg) {
	        if (arg && flags.unknownFn && !argDefined(key, arg)) {
	            if (flags.unknownFn(arg) === false) return;
	        }

	        var value = !flags.strings[key] && isNumber(val)
	            ? Number(val) : val
	        ;
	        setKey(argv, key.split('.'), value);
	        
	        (aliases[key] || []).forEach(function (x) {
	            setKey(argv, x.split('.'), value);
	        });
	    }

	    function setKey (obj, keys, value) {
	        var o = obj;
	        keys.slice(0,-1).forEach(function (key) {
	            if (o[key] === undefined) o[key] = {};
	            o = o[key];
	        });

	        var key = keys[keys.length - 1];
	        if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {
	            o[key] = value;
	        }
	        else if (Array.isArray(o[key])) {
	            o[key].push(value);
	        }
	        else {
	            o[key] = [ o[key], value ];
	        }
	    }
	    
	    for (var i = 0; i < args.length; i++) {
	        var arg = args[i];
	        
	        if (/^--.+=/.test(arg)) {
	            // Using [\s\S] instead of . because js doesn't support the
	            // 'dotall' regex modifier. See:
	            // http://stackoverflow.com/a/1068308/13216
	            var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
	            setArg(m[1], m[2], arg);
	        }
	        else if (/^--no-.+/.test(arg)) {
	            var key = arg.match(/^--no-(.+)/)[1];
	            setArg(key, false, arg);
	        }
	        else if (/^--.+/.test(arg)) {
	            var key = arg.match(/^--(.+)/)[1];
	            var next = args[i + 1];
	            if (next !== undefined && !/^-/.test(next)
	            && !flags.bools[key]
	            && !flags.allBools
	            && (aliases[key] ? !flags.bools[aliases[key]] : true)) {
	                setArg(key, next, arg);
	                i++;
	            }
	            else if (/^(true|false)$/.test(next)) {
	                setArg(key, next === 'true', arg);
	                i++;
	            }
	            else {
	                setArg(key, flags.strings[key] ? '' : true, arg);
	            }
	        }
	        else if (/^-[^-]+/.test(arg)) {
	            var letters = arg.slice(1,-1).split('');
	            
	            var broken = false;
	            for (var j = 0; j < letters.length; j++) {
	                var next = arg.slice(j+2);
	                
	                if (next === '-') {
	                    setArg(letters[j], next, arg)
	                    continue;
	                }
	                
	                if (/[A-Za-z]/.test(letters[j])
	                && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
	                    setArg(letters[j], next, arg);
	                    broken = true;
	                    break;
	                }
	                
	                if (letters[j+1] && letters[j+1].match(/\W/)) {
	                    setArg(letters[j], arg.slice(j+2), arg);
	                    broken = true;
	                    break;
	                }
	                else {
	                    setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
	                }
	            }
	            
	            var key = arg.slice(-1)[0];
	            if (!broken && key !== '-') {
	                if (args[i+1] && !/^(-|--)[^-]/.test(args[i+1])
	                && !flags.bools[key]
	                && (aliases[key] ? !flags.bools[aliases[key]] : true)) {
	                    setArg(key, args[i+1], arg);
	                    i++;
	                }
	                else if (args[i+1] && /true|false/.test(args[i+1])) {
	                    setArg(key, args[i+1] === 'true', arg);
	                    i++;
	                }
	                else {
	                    setArg(key, flags.strings[key] ? '' : true, arg);
	                }
	            }
	        }
	        else {
	            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
	                argv._.push(
	                    flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
	                );
	            }
	            if (opts.stopEarly) {
	                argv._.push.apply(argv._, args.slice(i + 1));
	                break;
	            }
	        }
	    }
	    
	    Object.keys(defaults).forEach(function (key) {
	        if (!hasKey(argv, key.split('.'))) {
	            setKey(argv, key.split('.'), defaults[key]);
	            
	            (aliases[key] || []).forEach(function (x) {
	                setKey(argv, x.split('.'), defaults[key]);
	            });
	        }
	    });
	    
	    if (opts['--']) {
	        argv['--'] = new Array();
	        notFlags.forEach(function(key) {
	            argv['--'].push(key);
	        });
	    }
	    else {
	        notFlags.forEach(function(key) {
	            argv._.push(key);
	        });
	    }

	    return argv;
	};

	function hasKey (obj, keys) {
	    var o = obj;
	    keys.slice(0,-1).forEach(function (key) {
	        o = (o[key] || {});
	    });

	    var key = keys[keys.length - 1];
	    return key in o;
	}

	function isNumber (x) {
	    if (typeof x === 'number') return true;
	    if (/^0x[0-9a-f]+$/i.test(x)) return true;
	    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
	}



/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var duplexer = __webpack_require__(104);
	var Stream = __webpack_require__(56);

	/**
	 * Slice reference.
	 */

	var slice = [].slice;

	/**
	 * Duplexer options.
	 */

	var opts = {
	  bubbleErrors: false
	};

	/**
	 * Expose `pipe`.
	 */

	module.exports = pipe;

	/**
	 * Pipe.
	 *
	 * @param {Stream,...,[Function]}
	 * @return {Stream}
	 * @api public
	 */

	function pipe(){
	  if (arguments.length == 1) return arguments[0];
	  var streams = slice.call(arguments);
	  var cb;
	  if ('function' == typeof streams[streams.length - 1]) {
	    cb = streams.splice(-1)[0];
	  }
	  var first = streams[0];
	  var last = streams[streams.length - 1];
	  var ret;
	  
	  if (first.writable && last.readable) ret = duplexer(opts, first, last);
	  else if (first.writable) ret = first;
	  else if (last.readable) ret = last;
	  else ret = new Stream;
	  
	  streams.forEach(function(stream, i){
	    var next = streams[i+1];
	    if (next) stream.pipe(next);
	    if (stream != ret) stream.on('error', ret.emit.bind(ret, 'error'));
	  });

	  if (cb) {
	    var ended = false;
	    ret.on('error', end);
	    last.on('finish', end);
	    function end(err){
	      if (ended) return;
	      ended = true;
	      cb(err);
	    }
	  }

	  return ret;
	}



/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(82).EventEmitter;
	var inherits = __webpack_require__(108);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(99);
	Stream.Writable = __webpack_require__(100);
	Stream.Duplex = __webpack_require__(101);
	Stream.Transform = __webpack_require__(102);
	Stream.PassThrough = __webpack_require__(103);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function (arr) {
		var rest = [].concat.apply([], [].slice.call(arguments, 1));
		return arr.filter(function (el) {
			return rest.indexOf(el) === -1;
		});
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// there's 3 implementations written in increasing order of efficiency

	// 1 - no Set type is defined
	function uniqNoSet(arr) {
		var ret = [];

		for (var i = 0; i < arr.length; i++) {
			if (ret.indexOf(arr[i]) === -1) {
				ret.push(arr[i]);
			}
		}

		return ret;
	}

	// 2 - a simple Set type is defined
	function uniqSet(arr) {
		var seen = new Set();
		return arr.filter(function (el) {
			if (!seen.has(el)) {
				seen.add(el);
				return true;
			}
		});
	}

	// 3 - a standard Set type is defined and it has a forEach method
	function uniqSetWithForEach(arr) {
		var ret = [];

		(new Set(arr)).forEach(function (el) {
			ret.push(el);
		});

		return ret;
	}

	// V8 currently has a broken implementation
	// https://github.com/joyent/node/issues/8449
	function doesForEachActuallyWork() {
		var ret = false;

		(new Set([true])).forEach(function (el) {
			ret = el;
		});

		return ret === true;
	}

	if ('Set' in global) {
		if (typeof Set.prototype.forEach === 'function' && doesForEachActuallyWork()) {
			module.exports = uniqSetWithForEach;
		} else {
			module.exports = uniqSet;
		}
	} else {
		module.exports = uniqNoSet;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var Buffer = __webpack_require__(5).Buffer;

	module.exports = function(buf) {
	  var out = new Buffer(buf.length);
	  buf.copy(out);
	  return out;
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var buf = __webpack_require__(5);
	var Buffer = buf.Buffer;

	// could use Buffer.isBuffer but this is the same exact thing...
	module.exports = function(o) {
	  return typeof o === 'object' && o instanceof Buffer;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(56).Stream;

	module.exports = function(o) {
	  return !!o && o instanceof Stream;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(v) {
	  return v === null;
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var isStream = __webpack_require__(61);

	module.exports = function(stream) {
	  if (!isStream(stream)) return;

	  var streamType = stream.constructor.name;
	  // avoid StreamStream
	  if (streamType === 'Stream') streamType = '';

	  return '<'+streamType+'Stream>';
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */


	/*jslint node: true*/
	var Syntax = __webpack_require__(84).Syntax;
	var leadingIndentRegexp = /(^|\n)( {2}|\t)/g;
	var nonWhiteRegexp = /(\S)/g;

	/**
	 * A `state` object represents the state of the parser. It has "local" and
	 * "global" parts. Global contains parser position, source, etc. Local contains
	 * scope based properties like current class name. State should contain all the
	 * info required for transformation. It's the only mandatory object that is
	 * being passed to every function in transform chain.
	 *
	 * @param  {string} source
	 * @param  {object} transformOptions
	 * @return {object}
	 */
	function createState(source, rootNode, transformOptions) {
	  return {
	    /**
	     * A tree representing the current local scope (and its lexical scope chain)
	     * Useful for tracking identifiers from parent scopes, etc.
	     * @type {Object}
	     */
	    localScope: {
	      parentNode: rootNode,
	      parentScope: null,
	      identifiers: {},
	      tempVarIndex: 0,
	      tempVars: []
	    },
	    /**
	     * The name (and, if applicable, expression) of the super class
	     * @type {Object}
	     */
	    superClass: null,
	    /**
	     * The namespace to use when munging identifiers
	     * @type {String}
	     */
	    mungeNamespace: '',
	    /**
	     * Ref to the node for the current MethodDefinition
	     * @type {Object}
	     */
	    methodNode: null,
	    /**
	     * Ref to the node for the FunctionExpression of the enclosing
	     * MethodDefinition
	     * @type {Object}
	     */
	    methodFuncNode: null,
	    /**
	     * Name of the enclosing class
	     * @type {String}
	     */
	    className: null,
	    /**
	     * Whether we're currently within a `strict` scope
	     * @type {Bool}
	     */
	    scopeIsStrict: null,
	    /**
	     * Indentation offset
	     * @type {Number}
	     */
	    indentBy: 0,
	    /**
	     * Global state (not affected by updateState)
	     * @type {Object}
	     */
	    g: {
	      /**
	       * A set of general options that transformations can consider while doing
	       * a transformation:
	       *
	       * - minify
	       *   Specifies that transformation steps should do their best to minify
	       *   the output source when possible. This is useful for places where
	       *   minification optimizations are possible with higher-level context
	       *   info than what jsxmin can provide.
	       *
	       *   For example, the ES6 class transform will minify munged private
	       *   variables if this flag is set.
	       */
	      opts: transformOptions,
	      /**
	       * Current position in the source code
	       * @type {Number}
	       */
	      position: 0,
	      /**
	       * Auxiliary data to be returned by transforms
	       * @type {Object}
	       */
	      extra: {},
	      /**
	       * Buffer containing the result
	       * @type {String}
	       */
	      buffer: '',
	      /**
	       * Source that is being transformed
	       * @type {String}
	       */
	      source: source,

	      /**
	       * Cached parsed docblock (see getDocblock)
	       * @type {object}
	       */
	      docblock: null,

	      /**
	       * Whether the thing was used
	       * @type {Boolean}
	       */
	      tagNamespaceUsed: false,

	      /**
	       * If using bolt xjs transformation
	       * @type {Boolean}
	       */
	      isBolt: undefined,

	      /**
	       * Whether to record source map (expensive) or not
	       * @type {SourceMapGenerator|null}
	       */
	      sourceMap: null,

	      /**
	       * Filename of the file being processed. Will be returned as a source
	       * attribute in the source map
	       */
	      sourceMapFilename: 'source.js',

	      /**
	       * Only when source map is used: last line in the source for which
	       * source map was generated
	       * @type {Number}
	       */
	      sourceLine: 1,

	      /**
	       * Only when source map is used: last line in the buffer for which
	       * source map was generated
	       * @type {Number}
	       */
	      bufferLine: 1,

	      /**
	       * The top-level Program AST for the original file.
	       */
	      originalProgramAST: null,

	      sourceColumn: 0,
	      bufferColumn: 0
	    }
	  };
	}

	/**
	 * Updates a copy of a given state with "update" and returns an updated state.
	 *
	 * @param  {object} state
	 * @param  {object} update
	 * @return {object}
	 */
	function updateState(state, update) {
	  var ret = Object.create(state);
	  Object.keys(update).forEach(function(updatedKey) {
	    ret[updatedKey] = update[updatedKey];
	  });
	  return ret;
	}

	/**
	 * Given a state fill the resulting buffer from the original source up to
	 * the end
	 *
	 * @param {number} end
	 * @param {object} state
	 * @param {?function} contentTransformer Optional callback to transform newly
	 *                                       added content.
	 */
	function catchup(end, state, contentTransformer) {
	  if (end < state.g.position) {
	    // cannot move backwards
	    return;
	  }
	  var source = state.g.source.substring(state.g.position, end);
	  var transformed = updateIndent(source, state);
	  if (state.g.sourceMap && transformed) {
	    // record where we are
	    state.g.sourceMap.addMapping({
	      generated: { line: state.g.bufferLine, column: state.g.bufferColumn },
	      original: { line: state.g.sourceLine, column: state.g.sourceColumn },
	      source: state.g.sourceMapFilename
	    });

	    // record line breaks in transformed source
	    var sourceLines = source.split('\n');
	    var transformedLines = transformed.split('\n');
	    // Add line break mappings between last known mapping and the end of the
	    // added piece. So for the code piece
	    //  (foo, bar);
	    // > var x = 2;
	    // > var b = 3;
	    //   var c =
	    // only add lines marked with ">": 2, 3.
	    for (var i = 1; i < sourceLines.length - 1; i++) {
	      state.g.sourceMap.addMapping({
	        generated: { line: state.g.bufferLine, column: 0 },
	        original: { line: state.g.sourceLine, column: 0 },
	        source: state.g.sourceMapFilename
	      });
	      state.g.sourceLine++;
	      state.g.bufferLine++;
	    }
	    // offset for the last piece
	    if (sourceLines.length > 1) {
	      state.g.sourceLine++;
	      state.g.bufferLine++;
	      state.g.sourceColumn = 0;
	      state.g.bufferColumn = 0;
	    }
	    state.g.sourceColumn += sourceLines[sourceLines.length - 1].length;
	    state.g.bufferColumn +=
	      transformedLines[transformedLines.length - 1].length;
	  }
	  state.g.buffer +=
	    contentTransformer ? contentTransformer(transformed) : transformed;
	  state.g.position = end;
	}

	/**
	 * Returns original source for an AST node.
	 * @param {object} node
	 * @param {object} state
	 * @return {string}
	 */
	function getNodeSourceText(node, state) {
	  return state.g.source.substring(node.range[0], node.range[1]);
	}

	function _replaceNonWhite(value) {
	  return value.replace(nonWhiteRegexp, ' ');
	}

	/**
	 * Removes all non-whitespace characters
	 */
	function _stripNonWhite(value) {
	  return value.replace(nonWhiteRegexp, '');
	}

	/**
	 * Finds the position of the next instance of the specified syntactic char in
	 * the pending source.
	 *
	 * NOTE: This will skip instances of the specified char if they sit inside a
	 *       comment body.
	 *
	 * NOTE: This function also assumes that the buffer's current position is not
	 *       already within a comment or a string. This is rarely the case since all
	 *       of the buffer-advancement utility methods tend to be used on syntactic
	 *       nodes' range values -- but it's a small gotcha that's worth mentioning.
	 */
	function getNextSyntacticCharOffset(char, state) {
	  var pendingSource = state.g.source.substring(state.g.position);
	  var pendingSourceLines = pendingSource.split('\n');

	  var charOffset = 0;
	  var line;
	  var withinBlockComment = false;
	  var withinString = false;
	  lineLoop: while ((line = pendingSourceLines.shift()) !== undefined) {
	    var lineEndPos = charOffset + line.length;
	    charLoop: for (; charOffset < lineEndPos; charOffset++) {
	      var currChar = pendingSource[charOffset];
	      if (currChar === '"' || currChar === '\'') {
	        withinString = !withinString;
	        continue charLoop;
	      } else if (withinString) {
	        continue charLoop;
	      } else if (charOffset + 1 < lineEndPos) {
	        var nextTwoChars = currChar + line[charOffset + 1];
	        if (nextTwoChars === '//') {
	          charOffset = lineEndPos + 1;
	          continue lineLoop;
	        } else if (nextTwoChars === '/*') {
	          withinBlockComment = true;
	          charOffset += 1;
	          continue charLoop;
	        } else if (nextTwoChars === '*/') {
	          withinBlockComment = false;
	          charOffset += 1;
	          continue charLoop;
	        }
	      }

	      if (!withinBlockComment && currChar === char) {
	        return charOffset + state.g.position;
	      }
	    }

	    // Account for '\n'
	    charOffset++;
	    withinString = false;
	  }

	  throw new Error('`' + char + '` not found!');
	}

	/**
	 * Catches up as `catchup` but replaces non-whitespace chars with spaces.
	 */
	function catchupWhiteOut(end, state) {
	  catchup(end, state, _replaceNonWhite);
	}

	/**
	 * Catches up as `catchup` but removes all non-whitespace characters.
	 */
	function catchupWhiteSpace(end, state) {
	  catchup(end, state, _stripNonWhite);
	}

	/**
	 * Removes all non-newline characters
	 */
	var reNonNewline = /[^\n]/g;
	function stripNonNewline(value) {
	  return value.replace(reNonNewline, function() {
	    return '';
	  });
	}

	/**
	 * Catches up as `catchup` but removes all non-newline characters.
	 *
	 * Equivalent to appending as many newlines as there are in the original source
	 * between the current position and `end`.
	 */
	function catchupNewlines(end, state) {
	  catchup(end, state, stripNonNewline);
	}


	/**
	 * Same as catchup but does not touch the buffer
	 *
	 * @param  {number} end
	 * @param  {object} state
	 */
	function move(end, state) {
	  // move the internal cursors
	  if (state.g.sourceMap) {
	    if (end < state.g.position) {
	      state.g.position = 0;
	      state.g.sourceLine = 1;
	      state.g.sourceColumn = 0;
	    }

	    var source = state.g.source.substring(state.g.position, end);
	    var sourceLines = source.split('\n');
	    if (sourceLines.length > 1) {
	      state.g.sourceLine += sourceLines.length - 1;
	      state.g.sourceColumn = 0;
	    }
	    state.g.sourceColumn += sourceLines[sourceLines.length - 1].length;
	  }
	  state.g.position = end;
	}

	/**
	 * Appends a string of text to the buffer
	 *
	 * @param {string} str
	 * @param {object} state
	 */
	function append(str, state) {
	  if (state.g.sourceMap && str) {
	    state.g.sourceMap.addMapping({
	      generated: { line: state.g.bufferLine, column: state.g.bufferColumn },
	      original: { line: state.g.sourceLine, column: state.g.sourceColumn },
	      source: state.g.sourceMapFilename
	    });
	    var transformedLines = str.split('\n');
	    if (transformedLines.length > 1) {
	      state.g.bufferLine += transformedLines.length - 1;
	      state.g.bufferColumn = 0;
	    }
	    state.g.bufferColumn +=
	      transformedLines[transformedLines.length - 1].length;
	  }
	  state.g.buffer += str;
	}

	/**
	 * Update indent using state.indentBy property. Indent is measured in
	 * double spaces. Updates a single line only.
	 *
	 * @param {string} str
	 * @param {object} state
	 * @return {string}
	 */
	function updateIndent(str, state) {
	  /*jshint -W004*/
	  var indentBy = state.indentBy;
	  if (indentBy < 0) {
	    for (var i = 0; i < -indentBy; i++) {
	      str = str.replace(leadingIndentRegexp, '$1');
	    }
	  } else {
	    for (var i = 0; i < indentBy; i++) {
	      str = str.replace(leadingIndentRegexp, '$1$2$2');
	    }
	  }
	  return str;
	}

	/**
	 * Calculates indent from the beginning of the line until "start" or the first
	 * character before start.
	 * @example
	 *   "  foo.bar()"
	 *         ^
	 *       start
	 *   indent will be "  "
	 *
	 * @param  {number} start
	 * @param  {object} state
	 * @return {string}
	 */
	function indentBefore(start, state) {
	  var end = start;
	  start = start - 1;

	  while (start > 0 && state.g.source[start] != '\n') {
	    if (!state.g.source[start].match(/[ \t]/)) {
	      end = start;
	    }
	    start--;
	  }
	  return state.g.source.substring(start + 1, end);
	}

	function getDocblock(state) {
	  if (!state.g.docblock) {
	    var docblock = __webpack_require__(83);
	    state.g.docblock =
	      docblock.parseAsObject(docblock.extract(state.g.source));
	  }
	  return state.g.docblock;
	}

	function identWithinLexicalScope(identName, state, stopBeforeNode) {
	  var currScope = state.localScope;
	  while (currScope) {
	    if (currScope.identifiers[identName] !== undefined) {
	      return true;
	    }

	    if (stopBeforeNode && currScope.parentNode === stopBeforeNode) {
	      break;
	    }

	    currScope = currScope.parentScope;
	  }
	  return false;
	}

	function identInLocalScope(identName, state) {
	  return state.localScope.identifiers[identName] !== undefined;
	}

	/**
	 * @param {object} boundaryNode
	 * @param {?array} path
	 * @return {?object} node
	 */
	function initScopeMetadata(boundaryNode, path, node) {
	  return {
	    boundaryNode: boundaryNode,
	    bindingPath: path,
	    bindingNode: node
	  };
	}

	function declareIdentInLocalScope(identName, metaData, state) {
	  state.localScope.identifiers[identName] = {
	    boundaryNode: metaData.boundaryNode,
	    path: metaData.bindingPath,
	    node: metaData.bindingNode,
	    state: Object.create(state)
	  };
	}

	function getLexicalBindingMetadata(identName, state) {
	  var currScope = state.localScope;
	  while (currScope) {
	    if (currScope.identifiers[identName] !== undefined) {
	      return currScope.identifiers[identName];
	    }

	    currScope = currScope.parentScope;
	  }
	}

	function getLocalBindingMetadata(identName, state) {
	  return state.localScope.identifiers[identName];
	}

	/**
	 * Apply the given analyzer function to the current node. If the analyzer
	 * doesn't return false, traverse each child of the current node using the given
	 * traverser function.
	 *
	 * @param {function} analyzer
	 * @param {function} traverser
	 * @param {object} node
	 * @param {array} path
	 * @param {object} state
	 */
	function analyzeAndTraverse(analyzer, traverser, node, path, state) {
	  if (node.type) {
	    if (analyzer(node, path, state) === false) {
	      return;
	    }
	    path.unshift(node);
	  }

	  getOrderedChildren(node).forEach(function(child) {
	    traverser(child, path, state);
	  });

	  node.type && path.shift();
	}

	/**
	 * It is crucial that we traverse in order, or else catchup() on a later
	 * node that is processed out of order can move the buffer past a node
	 * that we haven't handled yet, preventing us from modifying that node.
	 *
	 * This can happen when a node has multiple properties containing children.
	 * For example, XJSElement nodes have `openingElement`, `closingElement` and
	 * `children`. If we traverse `openingElement`, then `closingElement`, then
	 * when we get to `children`, the buffer has already caught up to the end of
	 * the closing element, after the children.
	 *
	 * This is basically a Schwartzian transform. Collects an array of children,
	 * each one represented as [child, startIndex]; sorts the array by start
	 * index; then traverses the children in that order.
	 */
	function getOrderedChildren(node) {
	  var queue = [];
	  for (var key in node) {
	    if (node.hasOwnProperty(key)) {
	      enqueueNodeWithStartIndex(queue, node[key]);
	    }
	  }
	  queue.sort(function(a, b) { return a[1] - b[1]; });
	  return queue.map(function(pair) { return pair[0]; });
	}

	/**
	 * Helper function for analyzeAndTraverse which queues up all of the children
	 * of the given node.
	 *
	 * Children can also be found in arrays, so we basically want to merge all of
	 * those arrays together so we can sort them and then traverse the children
	 * in order.
	 *
	 * One example is the Program node. It contains `body` and `comments`, both
	 * arrays. Lexographically, comments are interspersed throughout the body
	 * nodes, but esprima's AST groups them together.
	 */
	function enqueueNodeWithStartIndex(queue, node) {
	  if (typeof node !== 'object' || node === null) {
	    return;
	  }
	  if (node.range) {
	    queue.push([node, node.range[0]]);
	  } else if (Array.isArray(node)) {
	    for (var ii = 0; ii < node.length; ii++) {
	      enqueueNodeWithStartIndex(queue, node[ii]);
	    }
	  }
	}

	/**
	 * Checks whether a node or any of its sub-nodes contains
	 * a syntactic construct of the passed type.
	 * @param {object} node - AST node to test.
	 * @param {string} type - node type to lookup.
	 */
	function containsChildOfType(node, type) {
	  return containsChildMatching(node, function(node) {
	    return node.type === type;
	  });
	}

	function containsChildMatching(node, matcher) {
	  var foundMatchingChild = false;
	  function nodeTypeAnalyzer(node) {
	    if (matcher(node) === true) {
	      foundMatchingChild = true;
	      return false;
	    }
	  }
	  function nodeTypeTraverser(child, path, state) {
	    if (!foundMatchingChild) {
	      foundMatchingChild = containsChildMatching(child, matcher);
	    }
	  }
	  analyzeAndTraverse(
	    nodeTypeAnalyzer,
	    nodeTypeTraverser,
	    node,
	    []
	  );
	  return foundMatchingChild;
	}

	var scopeTypes = {};
	scopeTypes[Syntax.ArrowFunctionExpression] = true;
	scopeTypes[Syntax.FunctionExpression] = true;
	scopeTypes[Syntax.FunctionDeclaration] = true;
	scopeTypes[Syntax.Program] = true;

	function getBoundaryNode(path) {
	  for (var ii = 0; ii < path.length; ++ii) {
	    if (scopeTypes[path[ii].type]) {
	      return path[ii];
	    }
	  }
	  throw new Error(
	    'Expected to find a node with one of the following types in path:\n' +
	    JSON.stringify(Object.keys(scopeTypes))
	  );
	}

	function getTempVar(tempVarIndex) {
	  return '$__' + tempVarIndex;
	}

	function injectTempVar(state) {
	  var tempVar = '$__' + (state.localScope.tempVarIndex++);
	  state.localScope.tempVars.push(tempVar);
	  return tempVar;
	}

	function injectTempVarDeclarations(state, index) {
	  if (state.localScope.tempVars.length) {
	    state.g.buffer =
	      state.g.buffer.slice(0, index) +
	      'var ' + state.localScope.tempVars.join(', ') + ';' +
	      state.g.buffer.slice(index);
	    state.localScope.tempVars = [];
	  }
	}

	exports.analyzeAndTraverse = analyzeAndTraverse;
	exports.append = append;
	exports.catchup = catchup;
	exports.catchupNewlines = catchupNewlines;
	exports.catchupWhiteOut = catchupWhiteOut;
	exports.catchupWhiteSpace = catchupWhiteSpace;
	exports.containsChildMatching = containsChildMatching;
	exports.containsChildOfType = containsChildOfType;
	exports.createState = createState;
	exports.declareIdentInLocalScope = declareIdentInLocalScope;
	exports.getBoundaryNode = getBoundaryNode;
	exports.getDocblock = getDocblock;
	exports.getLexicalBindingMetadata = getLexicalBindingMetadata;
	exports.getLocalBindingMetadata = getLocalBindingMetadata;
	exports.getNextSyntacticCharOffset = getNextSyntacticCharOffset;
	exports.getNodeSourceText = getNodeSourceText;
	exports.getOrderedChildren = getOrderedChildren;
	exports.getTempVar = getTempVar;
	exports.identInLocalScope = identInLocalScope;
	exports.identWithinLexicalScope = identWithinLexicalScope;
	exports.indentBefore = indentBefore;
	exports.initScopeMetadata = initScopeMetadata;
	exports.injectTempVar = injectTempVar;
	exports.injectTempVarDeclarations = injectTempVarDeclarations;
	exports.move = move;
	exports.scopeTypes = scopeTypes;
	exports.updateIndent = updateIndent;
	exports.updateState = updateState;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var base64VLQ = __webpack_require__(85);
	  var util = __webpack_require__(86);
	  var ArraySet = __webpack_require__(87).ArraySet;
	  var MappingList = __webpack_require__(88).MappingList;

	  /**
	   * An instance of the SourceMapGenerator represents a source map which is
	   * being built incrementally. You may pass an object with the following
	   * properties:
	   *
	   *   - file: The filename of the generated source.
	   *   - sourceRoot: A root for all relative URLs in this source map.
	   */
	  function SourceMapGenerator(aArgs) {
	    if (!aArgs) {
	      aArgs = {};
	    }
	    this._file = util.getArg(aArgs, 'file', null);
	    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	    this._sources = new ArraySet();
	    this._names = new ArraySet();
	    this._mappings = new MappingList();
	    this._sourcesContents = null;
	  }

	  SourceMapGenerator.prototype._version = 3;

	  /**
	   * Creates a new SourceMapGenerator based on a SourceMapConsumer
	   *
	   * @param aSourceMapConsumer The SourceMap.
	   */
	  SourceMapGenerator.fromSourceMap =
	    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	      var sourceRoot = aSourceMapConsumer.sourceRoot;
	      var generator = new SourceMapGenerator({
	        file: aSourceMapConsumer.file,
	        sourceRoot: sourceRoot
	      });
	      aSourceMapConsumer.eachMapping(function (mapping) {
	        var newMapping = {
	          generated: {
	            line: mapping.generatedLine,
	            column: mapping.generatedColumn
	          }
	        };

	        if (mapping.source != null) {
	          newMapping.source = mapping.source;
	          if (sourceRoot != null) {
	            newMapping.source = util.relative(sourceRoot, newMapping.source);
	          }

	          newMapping.original = {
	            line: mapping.originalLine,
	            column: mapping.originalColumn
	          };

	          if (mapping.name != null) {
	            newMapping.name = mapping.name;
	          }
	        }

	        generator.addMapping(newMapping);
	      });
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content != null) {
	          generator.setSourceContent(sourceFile, content);
	        }
	      });
	      return generator;
	    };

	  /**
	   * Add a single mapping from original source line and column to the generated
	   * source's line and column for this source map being created. The mapping
	   * object should have the following properties:
	   *
	   *   - generated: An object with the generated line and column positions.
	   *   - original: An object with the original line and column positions.
	   *   - source: The original source file (relative to the sourceRoot).
	   *   - name: An optional original token name for this mapping.
	   */
	  SourceMapGenerator.prototype.addMapping =
	    function SourceMapGenerator_addMapping(aArgs) {
	      var generated = util.getArg(aArgs, 'generated');
	      var original = util.getArg(aArgs, 'original', null);
	      var source = util.getArg(aArgs, 'source', null);
	      var name = util.getArg(aArgs, 'name', null);

	      if (!this._skipValidation) {
	        this._validateMapping(generated, original, source, name);
	      }

	      if (source != null && !this._sources.has(source)) {
	        this._sources.add(source);
	      }

	      if (name != null && !this._names.has(name)) {
	        this._names.add(name);
	      }

	      this._mappings.add({
	        generatedLine: generated.line,
	        generatedColumn: generated.column,
	        originalLine: original != null && original.line,
	        originalColumn: original != null && original.column,
	        source: source,
	        name: name
	      });
	    };

	  /**
	   * Set the source content for a source file.
	   */
	  SourceMapGenerator.prototype.setSourceContent =
	    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	      var source = aSourceFile;
	      if (this._sourceRoot != null) {
	        source = util.relative(this._sourceRoot, source);
	      }

	      if (aSourceContent != null) {
	        // Add the source content to the _sourcesContents map.
	        // Create a new _sourcesContents map if the property is null.
	        if (!this._sourcesContents) {
	          this._sourcesContents = {};
	        }
	        this._sourcesContents[util.toSetString(source)] = aSourceContent;
	      } else if (this._sourcesContents) {
	        // Remove the source file from the _sourcesContents map.
	        // If the _sourcesContents map is empty, set the property to null.
	        delete this._sourcesContents[util.toSetString(source)];
	        if (Object.keys(this._sourcesContents).length === 0) {
	          this._sourcesContents = null;
	        }
	      }
	    };

	  /**
	   * Applies the mappings of a sub-source-map for a specific source file to the
	   * source map being generated. Each mapping to the supplied source file is
	   * rewritten using the supplied source map. Note: The resolution for the
	   * resulting mappings is the minimium of this map and the supplied map.
	   *
	   * @param aSourceMapConsumer The source map to be applied.
	   * @param aSourceFile Optional. The filename of the source file.
	   *        If omitted, SourceMapConsumer's file property will be used.
	   * @param aSourceMapPath Optional. The dirname of the path to the source map
	   *        to be applied. If relative, it is relative to the SourceMapConsumer.
	   *        This parameter is needed when the two source maps aren't in the same
	   *        directory, and the source map to be applied contains relative source
	   *        paths. If so, those relative source paths need to be rewritten
	   *        relative to the SourceMapGenerator.
	   */
	  SourceMapGenerator.prototype.applySourceMap =
	    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	      var sourceFile = aSourceFile;
	      // If aSourceFile is omitted, we will use the file property of the SourceMap
	      if (aSourceFile == null) {
	        if (aSourceMapConsumer.file == null) {
	          throw new Error(
	            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	            'or the source map\'s "file" property. Both were omitted.'
	          );
	        }
	        sourceFile = aSourceMapConsumer.file;
	      }
	      var sourceRoot = this._sourceRoot;
	      // Make "sourceFile" relative if an absolute Url is passed.
	      if (sourceRoot != null) {
	        sourceFile = util.relative(sourceRoot, sourceFile);
	      }
	      // Applying the SourceMap can add and remove items from the sources and
	      // the names array.
	      var newSources = new ArraySet();
	      var newNames = new ArraySet();

	      // Find mappings for the "sourceFile"
	      this._mappings.unsortedForEach(function (mapping) {
	        if (mapping.source === sourceFile && mapping.originalLine != null) {
	          // Check if it can be mapped by the source map, then update the mapping.
	          var original = aSourceMapConsumer.originalPositionFor({
	            line: mapping.originalLine,
	            column: mapping.originalColumn
	          });
	          if (original.source != null) {
	            // Copy mapping
	            mapping.source = original.source;
	            if (aSourceMapPath != null) {
	              mapping.source = util.join(aSourceMapPath, mapping.source)
	            }
	            if (sourceRoot != null) {
	              mapping.source = util.relative(sourceRoot, mapping.source);
	            }
	            mapping.originalLine = original.line;
	            mapping.originalColumn = original.column;
	            if (original.name != null) {
	              mapping.name = original.name;
	            }
	          }
	        }

	        var source = mapping.source;
	        if (source != null && !newSources.has(source)) {
	          newSources.add(source);
	        }

	        var name = mapping.name;
	        if (name != null && !newNames.has(name)) {
	          newNames.add(name);
	        }

	      }, this);
	      this._sources = newSources;
	      this._names = newNames;

	      // Copy sourcesContents of applied map.
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content != null) {
	          if (aSourceMapPath != null) {
	            sourceFile = util.join(aSourceMapPath, sourceFile);
	          }
	          if (sourceRoot != null) {
	            sourceFile = util.relative(sourceRoot, sourceFile);
	          }
	          this.setSourceContent(sourceFile, content);
	        }
	      }, this);
	    };

	  /**
	   * A mapping can have one of the three levels of data:
	   *
	   *   1. Just the generated position.
	   *   2. The Generated position, original position, and original source.
	   *   3. Generated and original position, original source, as well as a name
	   *      token.
	   *
	   * To maintain consistency, we validate that any new mapping being added falls
	   * in to one of these categories.
	   */
	  SourceMapGenerator.prototype._validateMapping =
	    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                                aName) {
	      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	          && aGenerated.line > 0 && aGenerated.column >= 0
	          && !aOriginal && !aSource && !aName) {
	        // Case 1.
	        return;
	      }
	      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	               && aGenerated.line > 0 && aGenerated.column >= 0
	               && aOriginal.line > 0 && aOriginal.column >= 0
	               && aSource) {
	        // Cases 2 and 3.
	        return;
	      }
	      else {
	        throw new Error('Invalid mapping: ' + JSON.stringify({
	          generated: aGenerated,
	          source: aSource,
	          original: aOriginal,
	          name: aName
	        }));
	      }
	    };

	  /**
	   * Serialize the accumulated mappings in to the stream of base 64 VLQs
	   * specified by the source map format.
	   */
	  SourceMapGenerator.prototype._serializeMappings =
	    function SourceMapGenerator_serializeMappings() {
	      var previousGeneratedColumn = 0;
	      var previousGeneratedLine = 1;
	      var previousOriginalColumn = 0;
	      var previousOriginalLine = 0;
	      var previousName = 0;
	      var previousSource = 0;
	      var result = '';
	      var mapping;

	      var mappings = this._mappings.toArray();

	      for (var i = 0, len = mappings.length; i < len; i++) {
	        mapping = mappings[i];

	        if (mapping.generatedLine !== previousGeneratedLine) {
	          previousGeneratedColumn = 0;
	          while (mapping.generatedLine !== previousGeneratedLine) {
	            result += ';';
	            previousGeneratedLine++;
	          }
	        }
	        else {
	          if (i > 0) {
	            if (!util.compareByGeneratedPositions(mapping, mappings[i - 1])) {
	              continue;
	            }
	            result += ',';
	          }
	        }

	        result += base64VLQ.encode(mapping.generatedColumn
	                                   - previousGeneratedColumn);
	        previousGeneratedColumn = mapping.generatedColumn;

	        if (mapping.source != null) {
	          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
	                                     - previousSource);
	          previousSource = this._sources.indexOf(mapping.source);

	          // lines are stored 0-based in SourceMap spec version 3
	          result += base64VLQ.encode(mapping.originalLine - 1
	                                     - previousOriginalLine);
	          previousOriginalLine = mapping.originalLine - 1;

	          result += base64VLQ.encode(mapping.originalColumn
	                                     - previousOriginalColumn);
	          previousOriginalColumn = mapping.originalColumn;

	          if (mapping.name != null) {
	            result += base64VLQ.encode(this._names.indexOf(mapping.name)
	                                       - previousName);
	            previousName = this._names.indexOf(mapping.name);
	          }
	        }
	      }

	      return result;
	    };

	  SourceMapGenerator.prototype._generateSourcesContent =
	    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	      return aSources.map(function (source) {
	        if (!this._sourcesContents) {
	          return null;
	        }
	        if (aSourceRoot != null) {
	          source = util.relative(aSourceRoot, source);
	        }
	        var key = util.toSetString(source);
	        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
	                                                    key)
	          ? this._sourcesContents[key]
	          : null;
	      }, this);
	    };

	  /**
	   * Externalize the source map.
	   */
	  SourceMapGenerator.prototype.toJSON =
	    function SourceMapGenerator_toJSON() {
	      var map = {
	        version: this._version,
	        sources: this._sources.toArray(),
	        names: this._names.toArray(),
	        mappings: this._serializeMappings()
	      };
	      if (this._file != null) {
	        map.file = this._file;
	      }
	      if (this._sourceRoot != null) {
	        map.sourceRoot = this._sourceRoot;
	      }
	      if (this._sourcesContents) {
	        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	      }

	      return map;
	    };

	  /**
	   * Render the source map being generated to a string.
	   */
	  SourceMapGenerator.prototype.toString =
	    function SourceMapGenerator_toString() {
	      return JSON.stringify(this);
	    };

	  exports.SourceMapGenerator = SourceMapGenerator;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var util = __webpack_require__(86);
	  var binarySearch = __webpack_require__(89);
	  var ArraySet = __webpack_require__(87).ArraySet;
	  var base64VLQ = __webpack_require__(85);

	  /**
	   * A SourceMapConsumer instance represents a parsed source map which we can
	   * query for information about the original file positions by giving it a file
	   * position in the generated source.
	   *
	   * The only parameter is the raw source map (either as a JSON string, or
	   * already parsed to an object). According to the spec, source maps have the
	   * following attributes:
	   *
	   *   - version: Which version of the source map spec this map is following.
	   *   - sources: An array of URLs to the original source files.
	   *   - names: An array of identifiers which can be referrenced by individual mappings.
	   *   - sourceRoot: Optional. The URL root from which all sources are relative.
	   *   - sourcesContent: Optional. An array of contents of the original source files.
	   *   - mappings: A string of base64 VLQs which contain the actual mappings.
	   *   - file: Optional. The generated file this source map is associated with.
	   *
	   * Here is an example source map, taken from the source map spec[0]:
	   *
	   *     {
	   *       version : 3,
	   *       file: "out.js",
	   *       sourceRoot : "",
	   *       sources: ["foo.js", "bar.js"],
	   *       names: ["src", "maps", "are", "fun"],
	   *       mappings: "AA,AB;;ABCDE;"
	   *     }
	   *
	   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	   */
	  function SourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }

	    var version = util.getArg(sourceMap, 'version');
	    var sources = util.getArg(sourceMap, 'sources');
	    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	    // requires the array) to play nice here.
	    var names = util.getArg(sourceMap, 'names', []);
	    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	    var mappings = util.getArg(sourceMap, 'mappings');
	    var file = util.getArg(sourceMap, 'file', null);

	    // Once again, Sass deviates from the spec and supplies the version as a
	    // string rather than a number, so we use loose equality checking here.
	    if (version != this._version) {
	      throw new Error('Unsupported version: ' + version);
	    }

	    // Some source maps produce relative source paths like "./foo.js" instead of
	    // "foo.js".  Normalize these first so that future comparisons will succeed.
	    // See bugzil.la/1090768.
	    sources = sources.map(util.normalize);

	    // Pass `true` below to allow duplicate names and sources. While source maps
	    // are intended to be compressed and deduplicated, the TypeScript compiler
	    // sometimes generates source maps with duplicates in them. See Github issue
	    // #72 and bugzil.la/889492.
	    this._names = ArraySet.fromArray(names, true);
	    this._sources = ArraySet.fromArray(sources, true);

	    this.sourceRoot = sourceRoot;
	    this.sourcesContent = sourcesContent;
	    this._mappings = mappings;
	    this.file = file;
	  }

	  /**
	   * Create a SourceMapConsumer from a SourceMapGenerator.
	   *
	   * @param SourceMapGenerator aSourceMap
	   *        The source map that will be consumed.
	   * @returns SourceMapConsumer
	   */
	  SourceMapConsumer.fromSourceMap =
	    function SourceMapConsumer_fromSourceMap(aSourceMap) {
	      var smc = Object.create(SourceMapConsumer.prototype);

	      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	      smc.sourceRoot = aSourceMap._sourceRoot;
	      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                              smc.sourceRoot);
	      smc.file = aSourceMap._file;

	      smc.__generatedMappings = aSourceMap._mappings.toArray().slice();
	      smc.__originalMappings = aSourceMap._mappings.toArray().slice()
	        .sort(util.compareByOriginalPositions);

	      return smc;
	    };

	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  SourceMapConsumer.prototype._version = 3;

	  /**
	   * The list of original sources.
	   */
	  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
	    get: function () {
	      return this._sources.toArray().map(function (s) {
	        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
	      }, this);
	    }
	  });

	  // `__generatedMappings` and `__originalMappings` are arrays that hold the
	  // parsed mapping coordinates from the source map's "mappings" attribute. They
	  // are lazily instantiated, accessed via the `_generatedMappings` and
	  // `_originalMappings` getters respectively, and we only parse the mappings
	  // and create these arrays once queried for a source location. We jump through
	  // these hoops because there can be many thousands of mappings, and parsing
	  // them is expensive, so we only want to do it if we must.
	  //
	  // Each object in the arrays is of the form:
	  //
	  //     {
	  //       generatedLine: The line number in the generated code,
	  //       generatedColumn: The column number in the generated code,
	  //       source: The path to the original source file that generated this
	  //               chunk of code,
	  //       originalLine: The line number in the original source that
	  //                     corresponds to this chunk of generated code,
	  //       originalColumn: The column number in the original source that
	  //                       corresponds to this chunk of generated code,
	  //       name: The name of the original symbol which generated this chunk of
	  //             code.
	  //     }
	  //
	  // All properties except for `generatedLine` and `generatedColumn` can be
	  // `null`.
	  //
	  // `_generatedMappings` is ordered by the generated positions.
	  //
	  // `_originalMappings` is ordered by the original positions.

	  SourceMapConsumer.prototype.__generatedMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	    get: function () {
	      if (!this.__generatedMappings) {
	        this.__generatedMappings = [];
	        this.__originalMappings = [];
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }

	      return this.__generatedMappings;
	    }
	  });

	  SourceMapConsumer.prototype.__originalMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	    get: function () {
	      if (!this.__originalMappings) {
	        this.__generatedMappings = [];
	        this.__originalMappings = [];
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }

	      return this.__originalMappings;
	    }
	  });

	  SourceMapConsumer.prototype._nextCharIsMappingSeparator =
	    function SourceMapConsumer_nextCharIsMappingSeparator(aStr) {
	      var c = aStr.charAt(0);
	      return c === ";" || c === ",";
	    };

	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  SourceMapConsumer.prototype._parseMappings =
	    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      var generatedLine = 1;
	      var previousGeneratedColumn = 0;
	      var previousOriginalLine = 0;
	      var previousOriginalColumn = 0;
	      var previousSource = 0;
	      var previousName = 0;
	      var str = aStr;
	      var temp = {};
	      var mapping;

	      while (str.length > 0) {
	        if (str.charAt(0) === ';') {
	          generatedLine++;
	          str = str.slice(1);
	          previousGeneratedColumn = 0;
	        }
	        else if (str.charAt(0) === ',') {
	          str = str.slice(1);
	        }
	        else {
	          mapping = {};
	          mapping.generatedLine = generatedLine;

	          // Generated column.
	          base64VLQ.decode(str, temp);
	          mapping.generatedColumn = previousGeneratedColumn + temp.value;
	          previousGeneratedColumn = mapping.generatedColumn;
	          str = temp.rest;

	          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
	            // Original source.
	            base64VLQ.decode(str, temp);
	            mapping.source = this._sources.at(previousSource + temp.value);
	            previousSource += temp.value;
	            str = temp.rest;
	            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
	              throw new Error('Found a source, but no line and column');
	            }

	            // Original line.
	            base64VLQ.decode(str, temp);
	            mapping.originalLine = previousOriginalLine + temp.value;
	            previousOriginalLine = mapping.originalLine;
	            // Lines are stored 0-based
	            mapping.originalLine += 1;
	            str = temp.rest;
	            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
	              throw new Error('Found a source and line, but no column');
	            }

	            // Original column.
	            base64VLQ.decode(str, temp);
	            mapping.originalColumn = previousOriginalColumn + temp.value;
	            previousOriginalColumn = mapping.originalColumn;
	            str = temp.rest;

	            if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
	              // Original name.
	              base64VLQ.decode(str, temp);
	              mapping.name = this._names.at(previousName + temp.value);
	              previousName += temp.value;
	              str = temp.rest;
	            }
	          }

	          this.__generatedMappings.push(mapping);
	          if (typeof mapping.originalLine === 'number') {
	            this.__originalMappings.push(mapping);
	          }
	        }
	      }

	      this.__generatedMappings.sort(util.compareByGeneratedPositions);
	      this.__originalMappings.sort(util.compareByOriginalPositions);
	    };

	  /**
	   * Find the mapping that best matches the hypothetical "needle" mapping that
	   * we are searching for in the given "haystack" of mappings.
	   */
	  SourceMapConsumer.prototype._findMapping =
	    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                           aColumnName, aComparator) {
	      // To return the position we are searching for, we must first find the
	      // mapping for the given position and then return the opposite position it
	      // points to. Because the mappings are sorted, we can use binary search to
	      // find the best mapping.

	      if (aNeedle[aLineName] <= 0) {
	        throw new TypeError('Line must be greater than or equal to 1, got '
	                            + aNeedle[aLineName]);
	      }
	      if (aNeedle[aColumnName] < 0) {
	        throw new TypeError('Column must be greater than or equal to 0, got '
	                            + aNeedle[aColumnName]);
	      }

	      return binarySearch.search(aNeedle, aMappings, aComparator);
	    };

	  /**
	   * Compute the last column for each generated mapping. The last column is
	   * inclusive.
	   */
	  SourceMapConsumer.prototype.computeColumnSpans =
	    function SourceMapConsumer_computeColumnSpans() {
	      for (var index = 0; index < this._generatedMappings.length; ++index) {
	        var mapping = this._generatedMappings[index];

	        // Mappings do not contain a field for the last generated columnt. We
	        // can come up with an optimistic estimate, however, by assuming that
	        // mappings are contiguous (i.e. given two consecutive mappings, the
	        // first mapping ends where the second one starts).
	        if (index + 1 < this._generatedMappings.length) {
	          var nextMapping = this._generatedMappings[index + 1];

	          if (mapping.generatedLine === nextMapping.generatedLine) {
	            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	            continue;
	          }
	        }

	        // The last mapping for each line spans the entire line.
	        mapping.lastGeneratedColumn = Infinity;
	      }
	    };

	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.
	   *   - column: The column number in the generated source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.
	   *   - column: The column number in the original source, or null.
	   *   - name: The original identifier, or null.
	   */
	  SourceMapConsumer.prototype.originalPositionFor =
	    function SourceMapConsumer_originalPositionFor(aArgs) {
	      var needle = {
	        generatedLine: util.getArg(aArgs, 'line'),
	        generatedColumn: util.getArg(aArgs, 'column')
	      };

	      var index = this._findMapping(needle,
	                                    this._generatedMappings,
	                                    "generatedLine",
	                                    "generatedColumn",
	                                    util.compareByGeneratedPositions);

	      if (index >= 0) {
	        var mapping = this._generatedMappings[index];

	        if (mapping.generatedLine === needle.generatedLine) {
	          var source = util.getArg(mapping, 'source', null);
	          if (source != null && this.sourceRoot != null) {
	            source = util.join(this.sourceRoot, source);
	          }
	          return {
	            source: source,
	            line: util.getArg(mapping, 'originalLine', null),
	            column: util.getArg(mapping, 'originalColumn', null),
	            name: util.getArg(mapping, 'name', null)
	          };
	        }
	      }

	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    };

	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * availible.
	   */
	  SourceMapConsumer.prototype.sourceContentFor =
	    function SourceMapConsumer_sourceContentFor(aSource) {
	      if (!this.sourcesContent) {
	        return null;
	      }

	      if (this.sourceRoot != null) {
	        aSource = util.relative(this.sourceRoot, aSource);
	      }

	      if (this._sources.has(aSource)) {
	        return this.sourcesContent[this._sources.indexOf(aSource)];
	      }

	      var url;
	      if (this.sourceRoot != null
	          && (url = util.urlParse(this.sourceRoot))) {
	        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	        // many users. We can help them out when they expect file:// URIs to
	        // behave like it would if they were running a local HTTP server. See
	        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
	        if (url.scheme == "file"
	            && this._sources.has(fileUriAbsPath)) {
	          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	        }

	        if ((!url.path || url.path == "/")
	            && this._sources.has("/" + aSource)) {
	          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
	        }
	      }

	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    };

	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *   - column: The column number in the original source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  SourceMapConsumer.prototype.generatedPositionFor =
	    function SourceMapConsumer_generatedPositionFor(aArgs) {
	      var needle = {
	        source: util.getArg(aArgs, 'source'),
	        originalLine: util.getArg(aArgs, 'line'),
	        originalColumn: util.getArg(aArgs, 'column')
	      };

	      if (this.sourceRoot != null) {
	        needle.source = util.relative(this.sourceRoot, needle.source);
	      }

	      var index = this._findMapping(needle,
	                                    this._originalMappings,
	                                    "originalLine",
	                                    "originalColumn",
	                                    util.compareByOriginalPositions);

	      if (index >= 0) {
	        var mapping = this._originalMappings[index];

	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null),
	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	        };
	      }

	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    };

	  /**
	   * Returns all generated line and column information for the original source
	   * and line provided. The only argument is an object with the following
	   * properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *
	   * and an array of objects is returned, each with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  SourceMapConsumer.prototype.allGeneratedPositionsFor =
	    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	      // When there is no exact match, SourceMapConsumer.prototype._findMapping
	      // returns the index of the closest mapping less than the needle. By
	      // setting needle.originalColumn to Infinity, we thus find the last
	      // mapping for the given line, provided such a mapping exists.
	      var needle = {
	        source: util.getArg(aArgs, 'source'),
	        originalLine: util.getArg(aArgs, 'line'),
	        originalColumn: Infinity
	      };

	      if (this.sourceRoot != null) {
	        needle.source = util.relative(this.sourceRoot, needle.source);
	      }

	      var mappings = [];

	      var index = this._findMapping(needle,
	                                    this._originalMappings,
	                                    "originalLine",
	                                    "originalColumn",
	                                    util.compareByOriginalPositions);
	      if (index >= 0) {
	        var mapping = this._originalMappings[index];

	        while (mapping && mapping.originalLine === needle.originalLine) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[--index];
	        }
	      }

	      return mappings.reverse();
	    };

	  SourceMapConsumer.GENERATED_ORDER = 1;
	  SourceMapConsumer.ORIGINAL_ORDER = 2;

	  /**
	   * Iterate over each mapping between an original source/line/column and a
	   * generated line/column in this source map.
	   *
	   * @param Function aCallback
	   *        The function that is called with each mapping.
	   * @param Object aContext
	   *        Optional. If specified, this object will be the value of `this` every
	   *        time that `aCallback` is called.
	   * @param aOrder
	   *        Either `SourceMapConsumer.GENERATED_ORDER` or
	   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	   *        iterate over the mappings sorted by the generated file's line/column
	   *        order or the original's source/line/column order, respectively. Defaults to
	   *        `SourceMapConsumer.GENERATED_ORDER`.
	   */
	  SourceMapConsumer.prototype.eachMapping =
	    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	      var context = aContext || null;
	      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

	      var mappings;
	      switch (order) {
	      case SourceMapConsumer.GENERATED_ORDER:
	        mappings = this._generatedMappings;
	        break;
	      case SourceMapConsumer.ORIGINAL_ORDER:
	        mappings = this._originalMappings;
	        break;
	      default:
	        throw new Error("Unknown order of iteration.");
	      }

	      var sourceRoot = this.sourceRoot;
	      mappings.map(function (mapping) {
	        var source = mapping.source;
	        if (source != null && sourceRoot != null) {
	          source = util.join(sourceRoot, source);
	        }
	        return {
	          source: source,
	          generatedLine: mapping.generatedLine,
	          generatedColumn: mapping.generatedColumn,
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: mapping.name
	        };
	      }).forEach(aCallback, context);
	    };

	  exports.SourceMapConsumer = SourceMapConsumer;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var SourceMapGenerator = __webpack_require__(65).SourceMapGenerator;
	  var util = __webpack_require__(86);

	  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	  // operating systems these days (capturing the result).
	  var REGEX_NEWLINE = /(\r?\n)/;

	  // Newline character code for charCodeAt() comparisons
	  var NEWLINE_CODE = 10;

	  // Private symbol for identifying `SourceNode`s when multiple versions of
	  // the source-map library are loaded. This MUST NOT CHANGE across
	  // versions!
	  var isSourceNode = "$$$isSourceNode$$$";

	  /**
	   * SourceNodes provide a way to abstract over interpolating/concatenating
	   * snippets of generated JavaScript source code while maintaining the line and
	   * column information associated with the original source code.
	   *
	   * @param aLine The original line number.
	   * @param aColumn The original column number.
	   * @param aSource The original source's filename.
	   * @param aChunks Optional. An array of strings which are snippets of
	   *        generated JS, or other SourceNodes.
	   * @param aName The original identifier.
	   */
	  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	    this.children = [];
	    this.sourceContents = {};
	    this.line = aLine == null ? null : aLine;
	    this.column = aColumn == null ? null : aColumn;
	    this.source = aSource == null ? null : aSource;
	    this.name = aName == null ? null : aName;
	    this[isSourceNode] = true;
	    if (aChunks != null) this.add(aChunks);
	  }

	  /**
	   * Creates a SourceNode from generated code and a SourceMapConsumer.
	   *
	   * @param aGeneratedCode The generated code
	   * @param aSourceMapConsumer The SourceMap for the generated code
	   * @param aRelativePath Optional. The path that relative sources in the
	   *        SourceMapConsumer should be relative to.
	   */
	  SourceNode.fromStringWithSourceMap =
	    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
	      // The SourceNode we want to fill with the generated code
	      // and the SourceMap
	      var node = new SourceNode();

	      // All even indices of this array are one line of the generated code,
	      // while all odd indices are the newlines between two adjacent lines
	      // (since `REGEX_NEWLINE` captures its match).
	      // Processed fragments are removed from this array, by calling `shiftNextLine`.
	      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	      var shiftNextLine = function() {
	        var lineContents = remainingLines.shift();
	        // The last line of a file might not have a newline.
	        var newLine = remainingLines.shift() || "";
	        return lineContents + newLine;
	      };

	      // We need to remember the position of "remainingLines"
	      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

	      // The generate SourceNodes we need a code range.
	      // To extract it current and last mapping is used.
	      // Here we store the last mapping.
	      var lastMapping = null;

	      aSourceMapConsumer.eachMapping(function (mapping) {
	        if (lastMapping !== null) {
	          // We add the code from "lastMapping" to "mapping":
	          // First check if there is a new line in between.
	          if (lastGeneratedLine < mapping.generatedLine) {
	            var code = "";
	            // Associate first line with "lastMapping"
	            addMappingWithCode(lastMapping, shiftNextLine());
	            lastGeneratedLine++;
	            lastGeneratedColumn = 0;
	            // The remaining code is added without mapping
	          } else {
	            // There is no new line in between.
	            // Associate the code between "lastGeneratedColumn" and
	            // "mapping.generatedColumn" with "lastMapping"
	            var nextLine = remainingLines[0];
	            var code = nextLine.substr(0, mapping.generatedColumn -
	                                          lastGeneratedColumn);
	            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
	                                                lastGeneratedColumn);
	            lastGeneratedColumn = mapping.generatedColumn;
	            addMappingWithCode(lastMapping, code);
	            // No more remaining code, continue
	            lastMapping = mapping;
	            return;
	          }
	        }
	        // We add the generated code until the first mapping
	        // to the SourceNode without any mapping.
	        // Each line is added as separate string.
	        while (lastGeneratedLine < mapping.generatedLine) {
	          node.add(shiftNextLine());
	          lastGeneratedLine++;
	        }
	        if (lastGeneratedColumn < mapping.generatedColumn) {
	          var nextLine = remainingLines[0];
	          node.add(nextLine.substr(0, mapping.generatedColumn));
	          remainingLines[0] = nextLine.substr(mapping.generatedColumn);
	          lastGeneratedColumn = mapping.generatedColumn;
	        }
	        lastMapping = mapping;
	      }, this);
	      // We have processed all mappings.
	      if (remainingLines.length > 0) {
	        if (lastMapping) {
	          // Associate the remaining code in the current line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	        }
	        // and add the remaining lines without any mapping
	        node.add(remainingLines.join(""));
	      }

	      // Copy sourcesContent into SourceNode
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content != null) {
	          if (aRelativePath != null) {
	            sourceFile = util.join(aRelativePath, sourceFile);
	          }
	          node.setSourceContent(sourceFile, content);
	        }
	      });

	      return node;

	      function addMappingWithCode(mapping, code) {
	        if (mapping === null || mapping.source === undefined) {
	          node.add(code);
	        } else {
	          var source = aRelativePath
	            ? util.join(aRelativePath, mapping.source)
	            : mapping.source;
	          node.add(new SourceNode(mapping.originalLine,
	                                  mapping.originalColumn,
	                                  source,
	                                  code,
	                                  mapping.name));
	        }
	      }
	    };

	  /**
	   * Add a chunk of generated JS to this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  SourceNode.prototype.add = function SourceNode_add(aChunk) {
	    if (Array.isArray(aChunk)) {
	      aChunk.forEach(function (chunk) {
	        this.add(chunk);
	      }, this);
	    }
	    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	      if (aChunk) {
	        this.children.push(aChunk);
	      }
	    }
	    else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	      );
	    }
	    return this;
	  };

	  /**
	   * Add a chunk of generated JS to the beginning of this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	    if (Array.isArray(aChunk)) {
	      for (var i = aChunk.length-1; i >= 0; i--) {
	        this.prepend(aChunk[i]);
	      }
	    }
	    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	      this.children.unshift(aChunk);
	    }
	    else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	      );
	    }
	    return this;
	  };

	  /**
	   * Walk over the tree of JS snippets in this node and its children. The
	   * walking function is called once for each snippet of JS and is passed that
	   * snippet and the its original associated source's line/column location.
	   *
	   * @param aFn The traversal function.
	   */
	  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	    var chunk;
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      chunk = this.children[i];
	      if (chunk[isSourceNode]) {
	        chunk.walk(aFn);
	      }
	      else {
	        if (chunk !== '') {
	          aFn(chunk, { source: this.source,
	                       line: this.line,
	                       column: this.column,
	                       name: this.name });
	        }
	      }
	    }
	  };

	  /**
	   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	   * each of `this.children`.
	   *
	   * @param aSep The separator.
	   */
	  SourceNode.prototype.join = function SourceNode_join(aSep) {
	    var newChildren;
	    var i;
	    var len = this.children.length;
	    if (len > 0) {
	      newChildren = [];
	      for (i = 0; i < len-1; i++) {
	        newChildren.push(this.children[i]);
	        newChildren.push(aSep);
	      }
	      newChildren.push(this.children[i]);
	      this.children = newChildren;
	    }
	    return this;
	  };

	  /**
	   * Call String.prototype.replace on the very right-most source snippet. Useful
	   * for trimming whitespace from the end of a source node, etc.
	   *
	   * @param aPattern The pattern to replace.
	   * @param aReplacement The thing to replace the pattern with.
	   */
	  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	    var lastChild = this.children[this.children.length - 1];
	    if (lastChild[isSourceNode]) {
	      lastChild.replaceRight(aPattern, aReplacement);
	    }
	    else if (typeof lastChild === 'string') {
	      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	    }
	    else {
	      this.children.push(''.replace(aPattern, aReplacement));
	    }
	    return this;
	  };

	  /**
	   * Set the source content for a source file. This will be added to the SourceMapGenerator
	   * in the sourcesContent field.
	   *
	   * @param aSourceFile The filename of the source file
	   * @param aSourceContent The content of the source file
	   */
	  SourceNode.prototype.setSourceContent =
	    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	    };

	  /**
	   * Walk over the tree of SourceNodes. The walking function is called for each
	   * source file content and is passed the filename and source content.
	   *
	   * @param aFn The traversal function.
	   */
	  SourceNode.prototype.walkSourceContents =
	    function SourceNode_walkSourceContents(aFn) {
	      for (var i = 0, len = this.children.length; i < len; i++) {
	        if (this.children[i][isSourceNode]) {
	          this.children[i].walkSourceContents(aFn);
	        }
	      }

	      var sources = Object.keys(this.sourceContents);
	      for (var i = 0, len = sources.length; i < len; i++) {
	        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	      }
	    };

	  /**
	   * Return the string representation of this source node. Walks over the tree
	   * and concatenates all the various snippets together to one string.
	   */
	  SourceNode.prototype.toString = function SourceNode_toString() {
	    var str = "";
	    this.walk(function (chunk) {
	      str += chunk;
	    });
	    return str;
	  };

	  /**
	   * Returns the string representation of this source node along with a source
	   * map.
	   */
	  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	    var generated = {
	      code: "",
	      line: 1,
	      column: 0
	    };
	    var map = new SourceMapGenerator(aArgs);
	    var sourceMappingActive = false;
	    var lastOriginalSource = null;
	    var lastOriginalLine = null;
	    var lastOriginalColumn = null;
	    var lastOriginalName = null;
	    this.walk(function (chunk, original) {
	      generated.code += chunk;
	      if (original.source !== null
	          && original.line !== null
	          && original.column !== null) {
	        if(lastOriginalSource !== original.source
	           || lastOriginalLine !== original.line
	           || lastOriginalColumn !== original.column
	           || lastOriginalName !== original.name) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	        lastOriginalSource = original.source;
	        lastOriginalLine = original.line;
	        lastOriginalColumn = original.column;
	        lastOriginalName = original.name;
	        sourceMappingActive = true;
	      } else if (sourceMappingActive) {
	        map.addMapping({
	          generated: {
	            line: generated.line,
	            column: generated.column
	          }
	        });
	        lastOriginalSource = null;
	        sourceMappingActive = false;
	      }
	      for (var idx = 0, length = chunk.length; idx < length; idx++) {
	        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	          generated.line++;
	          generated.column = 0;
	          // Mappings end at eol
	          if (idx + 1 === length) {
	            lastOriginalSource = null;
	            sourceMappingActive = false;
	          } else if (sourceMappingActive) {
	            map.addMapping({
	              source: original.source,
	              original: {
	                line: original.line,
	                column: original.column
	              },
	              generated: {
	                line: generated.line,
	                column: generated.column
	              },
	              name: original.name
	            });
	          }
	        } else {
	          generated.column++;
	        }
	      }
	    });
	    this.walkSourceContents(function (sourceFile, sourceContent) {
	      map.setSourceContent(sourceFile, sourceContent);
	    });

	    return { code: generated.code, map: map };
	  };

	  exports.SourceNode = SourceNode;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(106);

	/*<replacement>*/
	var util = __webpack_require__(122);
	util.inherits = __webpack_require__(123);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined)
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  var ts = this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('finish', function() {
	    if ('function' === typeof this._flush)
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var rs = stream._readableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var Stat = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Stats

	module.exports = cloneStats

	function cloneStats(stats) {
	  var replacement = new Stat

	  Object.keys(stats).forEach(function(key) {
	    replacement[key] = stats[key]
	  })

	  return replacement
	}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe,  '\\$&');
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var styles = module.exports = {
		modifiers: {
			reset: [0, 0],
			bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		colors: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39]
		},
		bgColors: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49]
		}
	};

	// fix humans
	styles.colors.grey = styles.colors.gray;

	Object.keys(styles).forEach(function (groupName) {
		var group = styles[groupName];

		Object.keys(group).forEach(function (styleName) {
			var style = group[styleName];

			styles[styleName] = group[styleName] = {
				open: '\u001b[' + style[0] + 'm',
				close: '\u001b[' + style[1] + 'm'
			};
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(110);
	var re = new RegExp(ansiRegex().source); // remove the `g` flag
	module.exports = re.test.bind(re);


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	var argv = process.argv;

	module.exports = (function () {
		if ('FORCE_COLOR' in process.env) {
			return true;
		}

		if (argv.indexOf('--no-color') !== -1 ||
			argv.indexOf('--no-colors') !== -1 ||
			argv.indexOf('--color=false') !== -1) {
			return false;
		}

		if (argv.indexOf('--color') !== -1 ||
			argv.indexOf('--colors') !== -1 ||
			argv.indexOf('--color=true') !== -1 ||
			argv.indexOf('--color=always') !== -1) {
			return true;
		}

		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}

		if (process.platform === 'win32') {
			return true;
		}

		if ('COLORTERM' in process.env) {
			return true;
		}

		if (process.env.TERM === 'dumb') {
			return false;
		}

		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}

		return false;
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var KEYWORDS = [
	  'break', 'do', 'in', 'typeof', 'case', 'else', 'instanceof', 'var', 'catch',
	  'export', 'new', 'void', 'class', 'extends', 'return', 'while', 'const',
	  'finally', 'super', 'with', 'continue', 'for', 'switch', 'yield', 'debugger',
	  'function', 'this', 'default', 'if', 'throw', 'delete', 'import', 'try'
	];

	var FUTURE_RESERVED_WORDS = [
	  'enum', 'await', 'implements', 'package', 'protected', 'static', 'interface',
	  'private', 'public'
	];

	var LITERALS = [
	  'null',
	  'true',
	  'false'
	];

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-reserved-words
	var RESERVED_WORDS = [].concat(
	  KEYWORDS,
	  FUTURE_RESERVED_WORDS,
	  LITERALS
	);

	var reservedWordsMap = Object.create(null);
	RESERVED_WORDS.forEach(function(k) {
	    reservedWordsMap[k] = true;
	});

	/**
	 * This list should not grow as new reserved words are introdued. This list is
	 * of words that need to be quoted because ES3-ish browsers do not allow their
	 * use as identifier names.
	 */
	var ES3_FUTURE_RESERVED_WORDS = [
	  'enum', 'implements', 'package', 'protected', 'static', 'interface',
	  'private', 'public'
	];

	var ES3_RESERVED_WORDS = [].concat(
	  KEYWORDS,
	  ES3_FUTURE_RESERVED_WORDS,
	  LITERALS
	);

	var es3ReservedWordsMap = Object.create(null);
	ES3_RESERVED_WORDS.forEach(function(k) {
	    es3ReservedWordsMap[k] = true;
	});

	exports.isReservedWord = function(word) {
	  return !!reservedWordsMap[word];
	};

	exports.isES3ReservedWord = function(word) {
	  return !!es3ReservedWordsMap[word];
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*jslint node:true*/

	/**
	 * Desugars ES7 rest properties into ES5 object iteration.
	 */

	var Syntax = __webpack_require__(84).Syntax;

	// TODO: This is a pretty massive helper, it should only be defined once, in the
	// transform's runtime environment. We don't currently have a runtime though.
	var restFunction =
	  '(function(source, exclusion) {' +
	    'var rest = {};' +
	    'var hasOwn = Object.prototype.hasOwnProperty;' +
	    'if (source == null) {' +
	      'throw new TypeError();' +
	    '}' +
	    'for (var key in source) {' +
	      'if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {' +
	        'rest[key] = source[key];' +
	      '}' +
	    '}' +
	    'return rest;' +
	  '})';

	function getPropertyNames(properties) {
	  var names = [];
	  for (var i = 0; i < properties.length; i++) {
	    var property = properties[i];
	    if (property.type === Syntax.SpreadProperty) {
	      continue;
	    }
	    if (property.type === Syntax.Identifier) {
	      names.push(property.name);
	    } else {
	      names.push(property.key.name);
	    }
	  }
	  return names;
	}

	function getRestFunctionCall(source, exclusion) {
	  return restFunction + '(' + source + ',' + exclusion + ')';
	}

	function getSimpleShallowCopy(accessorExpression) {
	  // This could be faster with 'Object.assign({}, ' + accessorExpression + ')'
	  // but to unify code paths and avoid a ES6 dependency we use the same
	  // helper as for the exclusion case.
	  return getRestFunctionCall(accessorExpression, '{}');
	}

	function renderRestExpression(accessorExpression, excludedProperties) {
	  var excludedNames = getPropertyNames(excludedProperties);
	  if (!excludedNames.length) {
	    return getSimpleShallowCopy(accessorExpression);
	  }
	  return getRestFunctionCall(
	    accessorExpression,
	    '{' + excludedNames.join(':1,') + ':1}'
	  );
	}

	exports.renderRestExpression = renderRestExpression;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	/*global exports:true*/
	'use strict';
	var Syntax = __webpack_require__(37).Syntax;
	var utils = __webpack_require__(64);

	function renderJSXLiteral(object, isLast, state, start, end) {
	  var lines = object.value.split(/\r\n|\n|\r/);

	  if (start) {
	    utils.append(start, state);
	  }

	  var lastNonEmptyLine = 0;

	  lines.forEach(function(line, index) {
	    if (line.match(/[^ \t]/)) {
	      lastNonEmptyLine = index;
	    }
	  });

	  lines.forEach(function(line, index) {
	    var isFirstLine = index === 0;
	    var isLastLine = index === lines.length - 1;
	    var isLastNonEmptyLine = index === lastNonEmptyLine;

	    // replace rendered whitespace tabs with spaces
	    var trimmedLine = line.replace(/\t/g, ' ');

	    // trim whitespace touching a newline
	    if (!isFirstLine) {
	      trimmedLine = trimmedLine.replace(/^[ ]+/, '');
	    }
	    if (!isLastLine) {
	      trimmedLine = trimmedLine.replace(/[ ]+$/, '');
	    }

	    if (!isFirstLine) {
	      utils.append(line.match(/^[ \t]*/)[0], state);
	    }

	    if (trimmedLine || isLastNonEmptyLine) {
	      utils.append(
	        JSON.stringify(trimmedLine) +
	        (!isLastNonEmptyLine ? ' + \' \' +' : ''),
	        state);

	      if (isLastNonEmptyLine) {
	        if (end) {
	          utils.append(end, state);
	        }
	        if (!isLast) {
	          utils.append(', ', state);
	        }
	      }

	      // only restore tail whitespace if line had literals
	      if (trimmedLine && !isLastLine) {
	        utils.append(line.match(/[ \t]*$/)[0], state);
	      }
	    }

	    if (!isLastLine) {
	      utils.append('\n', state);
	    }
	  });

	  utils.move(object.range[1], state);
	}

	function renderJSXExpressionContainer(traverse, object, isLast, path, state) {
	  // Plus 1 to skip `{`.
	  utils.move(object.range[0] + 1, state);
	  utils.catchup(object.expression.range[0], state);
	  traverse(object.expression, path, state);

	  if (!isLast && object.expression.type !== Syntax.JSXEmptyExpression) {
	    // If we need to append a comma, make sure to do so after the expression.
	    utils.catchup(object.expression.range[1], state, trimLeft);
	    utils.append(', ', state);
	  }

	  // Minus 1 to skip `}`.
	  utils.catchup(object.range[1] - 1, state, trimLeft);
	  utils.move(object.range[1], state);
	  return false;
	}

	function quoteAttrName(attr) {
	  // Quote invalid JS identifiers.
	  if (!/^[a-z_$][a-z\d_$]*$/i.test(attr)) {
	    return '"' + attr + '"';
	  }
	  return attr;
	}

	function trimLeft(value) {
	  return value.replace(/^[ ]+/, '');
	}

	exports.renderJSXExpressionContainer = renderJSXExpressionContainer;
	exports.renderJSXLiteral = renderJSXLiteral;
	exports.quoteAttrName = quoteAttrName;
	exports.trimLeft = trimLeft;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	// shim for Node's 'util' package
	// DO NOT REMOVE THIS! It is required for compatibility with EnderJS (http://enderjs.com/).
	var util = {
	  isArray: function (ar) {
	    return Array.isArray(ar) || (typeof ar === 'object' && objectToString(ar) === '[object Array]');
	  },
	  isDate: function (d) {
	    return typeof d === 'object' && objectToString(d) === '[object Date]';
	  },
	  isRegExp: function (re) {
	    return typeof re === 'object' && objectToString(re) === '[object RegExp]';
	  },
	  getRegExpFlags: function (re) {
	    var flags = '';
	    re.global && (flags += 'g');
	    re.ignoreCase && (flags += 'i');
	    re.multiline && (flags += 'm');
	    return flags;
	  }
	};


	if (true)
	  module.exports = clone;

	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	*/

	function clone(parent, circular, depth, prototype) {
	  // maintain two arrays for circular references, where corresponding parents
	  // and children have the same index
	  var allParents = [];
	  var allChildren = [];

	  var useBuffer = typeof Buffer != 'undefined';

	  if (typeof circular == 'undefined')
	    circular = true;

	  if (typeof depth == 'undefined')
	    depth = Infinity;

	  // recurse this function so we don't reset allParents and allChildren
	  function _clone(parent, depth) {
	    // cloning null always returns null
	    if (parent === null)
	      return null;

	    if (depth == 0)
	      return parent;

	    var child;
	    var proto;
	    if (typeof parent != 'object') {
	      return parent;
	    }

	    if (util.isArray(parent)) {
	      child = [];
	    } else if (util.isRegExp(parent)) {
	      child = new RegExp(parent.source, util.getRegExpFlags(parent));
	      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
	    } else if (util.isDate(parent)) {
	      child = new Date(parent.getTime());
	    } else if (useBuffer && Buffer.isBuffer(parent)) {
	      child = new Buffer(parent.length);
	      parent.copy(child);
	      return child;
	    } else {
	      if (typeof prototype == 'undefined') {
	        proto = Object.getPrototypeOf(parent);
	        child = Object.create(proto);
	      }
	      else {
	        child = Object.create(prototype);
	        proto = prototype;
	      }
	    }

	    if (circular) {
	      var index = allParents.indexOf(parent);

	      if (index != -1) {
	        return allChildren[index];
	      }
	      allParents.push(parent);
	      allChildren.push(child);
	    }

	    for (var i in parent) {
	      var attrs;
	      if (proto) {
	        attrs = Object.getOwnPropertyDescriptor(proto, i);
	      }
	      
	      if (attrs && attrs.set == null) {
	        continue;
	      }
	      child[i] = _clone(parent[i], depth - 1);
	    }

	    return child;
	  }

	  return _clone(parent, depth);
	}

	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function(parent) {
	  if (parent === null)
	    return null;

	  var c = function () {};
	  c.prototype = parent;
	  return new c();
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var docblockRe = /^\s*(\/\*\*(.|\r?\n)*?\*\/)/;
	var ltrimRe = /^\s*/;
	/**
	 * @param {String} contents
	 * @return {String}
	 */
	function extract(contents) {
	  var match = contents.match(docblockRe);
	  if (match) {
	    return match[0].replace(ltrimRe, '') || '';
	  }
	  return '';
	}


	var commentStartRe = /^\/\*\*?/;
	var commentEndRe = /\*+\/$/;
	var wsRe = /[\t ]+/g;
	var stringStartRe = /(\r?\n|^) *\*/g;
	var multilineRe = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *([^@\r\n\s][^@\r\n]+?) *\r?\n/g;
	var propertyRe = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g;

	/**
	 * @param {String} contents
	 * @return {Array}
	 */
	function parse(docblock) {
	  docblock = docblock
	    .replace(commentStartRe, '')
	    .replace(commentEndRe, '')
	    .replace(wsRe, ' ')
	    .replace(stringStartRe, '$1');

	  // Normalize multi-line directives
	  var prev = '';
	  while (prev != docblock) {
	    prev = docblock;
	    docblock = docblock.replace(multilineRe, "\n$1 $2\n");
	  }
	  docblock = docblock.trim();

	  var result = [];
	  var match;
	  while (match = propertyRe.exec(docblock)) {
	    result.push([match[1], match[2]]);
	  }

	  return result;
	}

	/**
	 * Same as parse but returns an object of prop: value instead of array of paris
	 * If a property appers more than once the last one will be returned
	 *
	 * @param {String} contents
	 * @return {Object}
	 */
	function parseAsObject(docblock) {
	  var pairs = parse(docblock);
	  var result = {};
	  for (var i = 0; i < pairs.length; i++) {
	    result[pairs[i][0]] = pairs[i][1];
	  }
	  return result;
	}


	exports.extract = extract;
	exports.parse = parse;
	exports.parseAsObject = parseAsObject;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
	  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
	  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
	  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
	  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
	  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
	  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
	  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
	  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:

	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.

	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	(function (root, factory) {
	    'use strict';

	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
	    // Rhino, and plain browser loading.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== 'undefined') {
	        factory(exports);
	    } else {
	        factory((root.esprima = {}));
	    }
	}(this, function (exports) {
	    'use strict';

	    var Token,
	        TokenName,
	        FnExprTokens,
	        Syntax,
	        PropertyKind,
	        Messages,
	        Regex,
	        SyntaxTreeDelegate,
	        XHTMLEntities,
	        ClassPropertyType,
	        source,
	        strict,
	        index,
	        lineNumber,
	        lineStart,
	        length,
	        delegate,
	        lookahead,
	        state,
	        extra;

	    Token = {
	        BooleanLiteral: 1,
	        EOF: 2,
	        Identifier: 3,
	        Keyword: 4,
	        NullLiteral: 5,
	        NumericLiteral: 6,
	        Punctuator: 7,
	        StringLiteral: 8,
	        RegularExpression: 9,
	        Template: 10,
	        JSXIdentifier: 11,
	        JSXText: 12
	    };

	    TokenName = {};
	    TokenName[Token.BooleanLiteral] = 'Boolean';
	    TokenName[Token.EOF] = '<end>';
	    TokenName[Token.Identifier] = 'Identifier';
	    TokenName[Token.Keyword] = 'Keyword';
	    TokenName[Token.NullLiteral] = 'Null';
	    TokenName[Token.NumericLiteral] = 'Numeric';
	    TokenName[Token.Punctuator] = 'Punctuator';
	    TokenName[Token.StringLiteral] = 'String';
	    TokenName[Token.JSXIdentifier] = 'JSXIdentifier';
	    TokenName[Token.JSXText] = 'JSXText';
	    TokenName[Token.RegularExpression] = 'RegularExpression';

	    // A function following one of those tokens is an expression.
	    FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	                    'return', 'case', 'delete', 'throw', 'void',
	                    // assignment operators
	                    '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=',
	                    '&=', '|=', '^=', ',',
	                    // binary/unary operators
	                    '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	                    '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	                    '<=', '<', '>', '!=', '!=='];

	    Syntax = {
	        AnyTypeAnnotation: 'AnyTypeAnnotation',
	        ArrayExpression: 'ArrayExpression',
	        ArrayPattern: 'ArrayPattern',
	        ArrayTypeAnnotation: 'ArrayTypeAnnotation',
	        ArrowFunctionExpression: 'ArrowFunctionExpression',
	        AssignmentExpression: 'AssignmentExpression',
	        BinaryExpression: 'BinaryExpression',
	        BlockStatement: 'BlockStatement',
	        BooleanTypeAnnotation: 'BooleanTypeAnnotation',
	        BreakStatement: 'BreakStatement',
	        CallExpression: 'CallExpression',
	        CatchClause: 'CatchClause',
	        ClassBody: 'ClassBody',
	        ClassDeclaration: 'ClassDeclaration',
	        ClassExpression: 'ClassExpression',
	        ClassImplements: 'ClassImplements',
	        ClassProperty: 'ClassProperty',
	        ComprehensionBlock: 'ComprehensionBlock',
	        ComprehensionExpression: 'ComprehensionExpression',
	        ConditionalExpression: 'ConditionalExpression',
	        ContinueStatement: 'ContinueStatement',
	        DebuggerStatement: 'DebuggerStatement',
	        DeclareClass: 'DeclareClass',
	        DeclareFunction: 'DeclareFunction',
	        DeclareModule: 'DeclareModule',
	        DeclareVariable: 'DeclareVariable',
	        DoWhileStatement: 'DoWhileStatement',
	        EmptyStatement: 'EmptyStatement',
	        ExportDeclaration: 'ExportDeclaration',
	        ExportBatchSpecifier: 'ExportBatchSpecifier',
	        ExportSpecifier: 'ExportSpecifier',
	        ExpressionStatement: 'ExpressionStatement',
	        ForInStatement: 'ForInStatement',
	        ForOfStatement: 'ForOfStatement',
	        ForStatement: 'ForStatement',
	        FunctionDeclaration: 'FunctionDeclaration',
	        FunctionExpression: 'FunctionExpression',
	        FunctionTypeAnnotation: 'FunctionTypeAnnotation',
	        FunctionTypeParam: 'FunctionTypeParam',
	        GenericTypeAnnotation: 'GenericTypeAnnotation',
	        Identifier: 'Identifier',
	        IfStatement: 'IfStatement',
	        ImportDeclaration: 'ImportDeclaration',
	        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	        ImportSpecifier: 'ImportSpecifier',
	        InterfaceDeclaration: 'InterfaceDeclaration',
	        InterfaceExtends: 'InterfaceExtends',
	        IntersectionTypeAnnotation: 'IntersectionTypeAnnotation',
	        LabeledStatement: 'LabeledStatement',
	        Literal: 'Literal',
	        LogicalExpression: 'LogicalExpression',
	        MemberExpression: 'MemberExpression',
	        MethodDefinition: 'MethodDefinition',
	        ModuleSpecifier: 'ModuleSpecifier',
	        NewExpression: 'NewExpression',
	        NullableTypeAnnotation: 'NullableTypeAnnotation',
	        NumberTypeAnnotation: 'NumberTypeAnnotation',
	        ObjectExpression: 'ObjectExpression',
	        ObjectPattern: 'ObjectPattern',
	        ObjectTypeAnnotation: 'ObjectTypeAnnotation',
	        ObjectTypeCallProperty: 'ObjectTypeCallProperty',
	        ObjectTypeIndexer: 'ObjectTypeIndexer',
	        ObjectTypeProperty: 'ObjectTypeProperty',
	        Program: 'Program',
	        Property: 'Property',
	        QualifiedTypeIdentifier: 'QualifiedTypeIdentifier',
	        ReturnStatement: 'ReturnStatement',
	        SequenceExpression: 'SequenceExpression',
	        SpreadElement: 'SpreadElement',
	        SpreadProperty: 'SpreadProperty',
	        StringLiteralTypeAnnotation: 'StringLiteralTypeAnnotation',
	        StringTypeAnnotation: 'StringTypeAnnotation',
	        SwitchCase: 'SwitchCase',
	        SwitchStatement: 'SwitchStatement',
	        TaggedTemplateExpression: 'TaggedTemplateExpression',
	        TemplateElement: 'TemplateElement',
	        TemplateLiteral: 'TemplateLiteral',
	        ThisExpression: 'ThisExpression',
	        ThrowStatement: 'ThrowStatement',
	        TupleTypeAnnotation: 'TupleTypeAnnotation',
	        TryStatement: 'TryStatement',
	        TypeAlias: 'TypeAlias',
	        TypeAnnotation: 'TypeAnnotation',
	        TypeCastExpression: 'TypeCastExpression',
	        TypeofTypeAnnotation: 'TypeofTypeAnnotation',
	        TypeParameterDeclaration: 'TypeParameterDeclaration',
	        TypeParameterInstantiation: 'TypeParameterInstantiation',
	        UnaryExpression: 'UnaryExpression',
	        UnionTypeAnnotation: 'UnionTypeAnnotation',
	        UpdateExpression: 'UpdateExpression',
	        VariableDeclaration: 'VariableDeclaration',
	        VariableDeclarator: 'VariableDeclarator',
	        VoidTypeAnnotation: 'VoidTypeAnnotation',
	        WhileStatement: 'WhileStatement',
	        WithStatement: 'WithStatement',
	        JSXIdentifier: 'JSXIdentifier',
	        JSXNamespacedName: 'JSXNamespacedName',
	        JSXMemberExpression: 'JSXMemberExpression',
	        JSXEmptyExpression: 'JSXEmptyExpression',
	        JSXExpressionContainer: 'JSXExpressionContainer',
	        JSXElement: 'JSXElement',
	        JSXClosingElement: 'JSXClosingElement',
	        JSXOpeningElement: 'JSXOpeningElement',
	        JSXAttribute: 'JSXAttribute',
	        JSXSpreadAttribute: 'JSXSpreadAttribute',
	        JSXText: 'JSXText',
	        YieldExpression: 'YieldExpression',
	        AwaitExpression: 'AwaitExpression'
	    };

	    PropertyKind = {
	        Data: 1,
	        Get: 2,
	        Set: 4
	    };

	    ClassPropertyType = {
	        'static': 'static',
	        prototype: 'prototype'
	    };

	    // Error messages should be identical to V8.
	    Messages = {
	        UnexpectedToken: 'Unexpected token %0',
	        UnexpectedNumber: 'Unexpected number',
	        UnexpectedString: 'Unexpected string',
	        UnexpectedIdentifier: 'Unexpected identifier',
	        UnexpectedReserved: 'Unexpected reserved word',
	        UnexpectedTemplate: 'Unexpected quasi %0',
	        UnexpectedEOS: 'Unexpected end of input',
	        NewlineAfterThrow: 'Illegal newline after throw',
	        InvalidRegExp: 'Invalid regular expression',
	        UnterminatedRegExp: 'Invalid regular expression: missing /',
	        InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
	        InvalidLHSInFormalsList: 'Invalid left-hand side in formals list',
	        InvalidLHSInForIn: 'Invalid left-hand side in for-in',
	        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	        NoCatchOrFinally: 'Missing catch or finally after try',
	        UnknownLabel: 'Undefined label \'%0\'',
	        Redeclaration: '%0 \'%1\' has already been declared',
	        IllegalContinue: 'Illegal continue statement',
	        IllegalBreak: 'Illegal break statement',
	        IllegalDuplicateClassProperty: 'Illegal duplicate property in class definition',
	        IllegalClassConstructorProperty: 'Illegal constructor property in class definition',
	        IllegalReturn: 'Illegal return statement',
	        IllegalSpread: 'Illegal spread element',
	        StrictModeWith: 'Strict mode code may not include a with statement',
	        StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
	        StrictVarName: 'Variable name may not be eval or arguments in strict mode',
	        StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
	        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	        ParameterAfterRestParameter: 'Rest parameter must be final parameter of an argument list',
	        DefaultRestParameter: 'Rest parameter can not have a default value',
	        ElementAfterSpreadElement: 'Spread must be the final element of an element list',
	        PropertyAfterSpreadProperty: 'A rest property must be the final property of an object literal',
	        ObjectPatternAsRestParameter: 'Invalid rest parameter',
	        ObjectPatternAsSpread: 'Invalid spread argument',
	        StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
	        StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
	        StrictDelete: 'Delete of an unqualified identifier in strict mode.',
	        StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
	        AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
	        AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
	        StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
	        StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	        StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	        StrictReservedWord: 'Use of future reserved word in strict mode',
	        MissingFromClause: 'Missing from clause',
	        NoAsAfterImportNamespace: 'Missing as after import *',
	        InvalidModuleSpecifier: 'Invalid module specifier',
	        IllegalImportDeclaration: 'Illegal import declaration',
	        IllegalExportDeclaration: 'Illegal export declaration',
	        NoUninitializedConst: 'Const must be initialized',
	        ComprehensionRequiresBlock: 'Comprehension must have at least one block',
	        ComprehensionError: 'Comprehension Error',
	        EachNotAllowed: 'Each is not supported',
	        InvalidJSXAttributeValue: 'JSX value should be either an expression or a quoted JSX text',
	        ExpectedJSXClosingTag: 'Expected corresponding JSX closing tag for %0',
	        AdjacentJSXElements: 'Adjacent JSX elements must be wrapped in an enclosing tag',
	        ConfusedAboutFunctionType: 'Unexpected token =>. It looks like ' +
	            'you are trying to write a function type, but you ended up ' +
	            'writing a grouped type followed by an =>, which is a syntax ' +
	            'error. Remember, function type parameters are named so function ' +
	            'types look like (name1: type1, name2: type2) => returnType. You ' +
	            'probably wrote (type1) => returnType'
	    };

	    // See also tools/generate-unicode-regex.py.
	    Regex = {
	        NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
	        NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
	        LeadingZeros: new RegExp('^0+(?!$)')
	    };

	    // Ensure the condition is true, otherwise throw an error.
	    // This is only to have a better contract semantic, i.e. another safety net
	    // to catch a logic error. The condition shall be fulfilled in normal case.
	    // Do NOT use this to enforce a certain condition on any user input.

	    function assert(condition, message) {
	        /* istanbul ignore if */
	        if (!condition) {
	            throw new Error('ASSERT: ' + message);
	        }
	    }

	    function StringMap() {
	        this.$data = {};
	    }

	    StringMap.prototype.get = function (key) {
	        key = '$' + key;
	        return this.$data[key];
	    };

	    StringMap.prototype.set = function (key, value) {
	        key = '$' + key;
	        this.$data[key] = value;
	        return this;
	    };

	    StringMap.prototype.has = function (key) {
	        key = '$' + key;
	        return Object.prototype.hasOwnProperty.call(this.$data, key);
	    };

	    StringMap.prototype.delete = function (key) {
	        key = '$' + key;
	        return delete this.$data[key];
	    };

	    function isDecimalDigit(ch) {
	        return (ch >= 48 && ch <= 57);   // 0..9
	    }

	    function isHexDigit(ch) {
	        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
	    }

	    function isOctalDigit(ch) {
	        return '01234567'.indexOf(ch) >= 0;
	    }


	    // 7.2 White Space

	    function isWhiteSpace(ch) {
	        return (ch === 32) ||  // space
	            (ch === 9) ||      // tab
	            (ch === 0xB) ||
	            (ch === 0xC) ||
	            (ch === 0xA0) ||
	            (ch >= 0x1680 && '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF'.indexOf(String.fromCharCode(ch)) > 0);
	    }

	    // 7.3 Line Terminators

	    function isLineTerminator(ch) {
	        return (ch === 10) || (ch === 13) || (ch === 0x2028) || (ch === 0x2029);
	    }

	    // 7.6 Identifier Names and Identifiers

	    function isIdentifierStart(ch) {
	        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
	            (ch >= 65 && ch <= 90) ||         // A..Z
	            (ch >= 97 && ch <= 122) ||        // a..z
	            (ch === 92) ||                    // \ (backslash)
	            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
	    }

	    function isIdentifierPart(ch) {
	        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
	            (ch >= 65 && ch <= 90) ||         // A..Z
	            (ch >= 97 && ch <= 122) ||        // a..z
	            (ch >= 48 && ch <= 57) ||         // 0..9
	            (ch === 92) ||                    // \ (backslash)
	            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
	    }

	    // 7.6.1.2 Future Reserved Words

	    function isFutureReservedWord(id) {
	        switch (id) {
	        case 'class':
	        case 'enum':
	        case 'export':
	        case 'extends':
	        case 'import':
	        case 'super':
	            return true;
	        default:
	            return false;
	        }
	    }

	    function isStrictModeReservedWord(id) {
	        switch (id) {
	        case 'implements':
	        case 'interface':
	        case 'package':
	        case 'private':
	        case 'protected':
	        case 'public':
	        case 'static':
	        case 'yield':
	        case 'let':
	            return true;
	        default:
	            return false;
	        }
	    }

	    function isRestrictedWord(id) {
	        return id === 'eval' || id === 'arguments';
	    }

	    // 7.6.1.1 Keywords

	    function isKeyword(id) {
	        if (strict && isStrictModeReservedWord(id)) {
	            return true;
	        }

	        // 'const' is specialized as Keyword in V8.
	        // 'yield' is only treated as a keyword in strict mode.
	        // 'let' is for compatiblity with SpiderMonkey and ES.next.
	        // Some others are from future reserved words.

	        switch (id.length) {
	        case 2:
	            return (id === 'if') || (id === 'in') || (id === 'do');
	        case 3:
	            return (id === 'var') || (id === 'for') || (id === 'new') ||
	                (id === 'try') || (id === 'let');
	        case 4:
	            return (id === 'this') || (id === 'else') || (id === 'case') ||
	                (id === 'void') || (id === 'with') || (id === 'enum');
	        case 5:
	            return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                (id === 'throw') || (id === 'const') ||
	                (id === 'class') || (id === 'super');
	        case 6:
	            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                (id === 'switch') || (id === 'export') || (id === 'import');
	        case 7:
	            return (id === 'default') || (id === 'finally') || (id === 'extends');
	        case 8:
	            return (id === 'function') || (id === 'continue') || (id === 'debugger');
	        case 10:
	            return (id === 'instanceof');
	        default:
	            return false;
	        }
	    }

	    // 7.4 Comments

	    function addComment(type, value, start, end, loc) {
	        var comment;
	        assert(typeof start === 'number', 'Comment must have valid position');

	        // Because the way the actual token is scanned, often the comments
	        // (if any) are skipped twice during the lexical analysis.
	        // Thus, we need to skip adding a comment if the comment array already
	        // handled it.
	        if (state.lastCommentStart >= start) {
	            return;
	        }
	        state.lastCommentStart = start;

	        comment = {
	            type: type,
	            value: value
	        };
	        if (extra.range) {
	            comment.range = [start, end];
	        }
	        if (extra.loc) {
	            comment.loc = loc;
	        }
	        extra.comments.push(comment);
	        if (extra.attachComment) {
	            extra.leadingComments.push(comment);
	            extra.trailingComments.push(comment);
	        }
	    }

	    function skipSingleLineComment() {
	        var start, loc, ch, comment;

	        start = index - 2;
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart - 2
	            }
	        };

	        while (index < length) {
	            ch = source.charCodeAt(index);
	            ++index;
	            if (isLineTerminator(ch)) {
	                if (extra.comments) {
	                    comment = source.slice(start + 2, index - 1);
	                    loc.end = {
	                        line: lineNumber,
	                        column: index - lineStart - 1
	                    };
	                    addComment('Line', comment, start, index - 1, loc);
	                }
	                if (ch === 13 && source.charCodeAt(index) === 10) {
	                    ++index;
	                }
	                ++lineNumber;
	                lineStart = index;
	                return;
	            }
	        }

	        if (extra.comments) {
	            comment = source.slice(start + 2, index);
	            loc.end = {
	                line: lineNumber,
	                column: index - lineStart
	            };
	            addComment('Line', comment, start, index, loc);
	        }
	    }

	    function skipMultiLineComment() {
	        var start, loc, ch, comment;

	        if (extra.comments) {
	            start = index - 2;
	            loc = {
	                start: {
	                    line: lineNumber,
	                    column: index - lineStart - 2
	                }
	            };
	        }

	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (isLineTerminator(ch)) {
	                if (ch === 13 && source.charCodeAt(index + 1) === 10) {
	                    ++index;
	                }
	                ++lineNumber;
	                ++index;
	                lineStart = index;
	                if (index >= length) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	            } else if (ch === 42) {
	                // Block comment ends with '*/' (char #42, char #47).
	                if (source.charCodeAt(index + 1) === 47) {
	                    ++index;
	                    ++index;
	                    if (extra.comments) {
	                        comment = source.slice(start + 2, index - 2);
	                        loc.end = {
	                            line: lineNumber,
	                            column: index - lineStart
	                        };
	                        addComment('Block', comment, start, index, loc);
	                    }
	                    return;
	                }
	                ++index;
	            } else {
	                ++index;
	            }
	        }

	        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	    }

	    function skipComment() {
	        var ch;

	        while (index < length) {
	            ch = source.charCodeAt(index);

	            if (isWhiteSpace(ch)) {
	                ++index;
	            } else if (isLineTerminator(ch)) {
	                ++index;
	                if (ch === 13 && source.charCodeAt(index) === 10) {
	                    ++index;
	                }
	                ++lineNumber;
	                lineStart = index;
	            } else if (ch === 47) { // 47 is '/'
	                ch = source.charCodeAt(index + 1);
	                if (ch === 47) {
	                    ++index;
	                    ++index;
	                    skipSingleLineComment();
	                } else if (ch === 42) {  // 42 is '*'
	                    ++index;
	                    ++index;
	                    skipMultiLineComment();
	                } else {
	                    break;
	                }
	            } else {
	                break;
	            }
	        }
	    }

	    function scanHexEscape(prefix) {
	        var i, len, ch, code = 0;

	        len = (prefix === 'u') ? 4 : 2;
	        for (i = 0; i < len; ++i) {
	            if (index < length && isHexDigit(source[index])) {
	                ch = source[index++];
	                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
	            } else {
	                return '';
	            }
	        }
	        return String.fromCharCode(code);
	    }

	    function scanUnicodeCodePointEscape() {
	        var ch, code, cu1, cu2;

	        ch = source[index];
	        code = 0;

	        // At least, one hex digit is required.
	        if (ch === '}') {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        while (index < length) {
	            ch = source[index++];
	            if (!isHexDigit(ch)) {
	                break;
	            }
	            code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
	        }

	        if (code > 0x10FFFF || ch !== '}') {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        // UTF-16 Encoding
	        if (code <= 0xFFFF) {
	            return String.fromCharCode(code);
	        }
	        cu1 = ((code - 0x10000) >> 10) + 0xD800;
	        cu2 = ((code - 0x10000) & 1023) + 0xDC00;
	        return String.fromCharCode(cu1, cu2);
	    }

	    function getEscapedIdentifier() {
	        var ch, id;

	        ch = source.charCodeAt(index++);
	        id = String.fromCharCode(ch);

	        // '\u' (char #92, char #117) denotes an escaped character.
	        if (ch === 92) {
	            if (source.charCodeAt(index) !== 117) {
	                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	            }
	            ++index;
	            ch = scanHexEscape('u');
	            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
	                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	            }
	            id = ch;
	        }

	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (!isIdentifierPart(ch)) {
	                break;
	            }
	            ++index;
	            id += String.fromCharCode(ch);

	            // '\u' (char #92, char #117) denotes an escaped character.
	            if (ch === 92) {
	                id = id.substr(0, id.length - 1);
	                if (source.charCodeAt(index) !== 117) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	                ++index;
	                ch = scanHexEscape('u');
	                if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	                id += ch;
	            }
	        }

	        return id;
	    }

	    function getIdentifier() {
	        var start, ch;

	        start = index++;
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (ch === 92) {
	                // Blackslash (char #92) marks Unicode escape sequence.
	                index = start;
	                return getEscapedIdentifier();
	            }
	            if (isIdentifierPart(ch)) {
	                ++index;
	            } else {
	                break;
	            }
	        }

	        return source.slice(start, index);
	    }

	    function scanIdentifier() {
	        var start, id, type;

	        start = index;

	        // Backslash (char #92) starts an escaped character.
	        id = (source.charCodeAt(index) === 92) ? getEscapedIdentifier() : getIdentifier();

	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = Token.Identifier;
	        } else if (isKeyword(id)) {
	            type = Token.Keyword;
	        } else if (id === 'null') {
	            type = Token.NullLiteral;
	        } else if (id === 'true' || id === 'false') {
	            type = Token.BooleanLiteral;
	        } else {
	            type = Token.Identifier;
	        }

	        return {
	            type: type,
	            value: id,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }


	    // 7.7 Punctuators

	    function scanPunctuator() {
	        var start = index,
	            code = source.charCodeAt(index),
	            code2,
	            ch1 = source[index],
	            ch2,
	            ch3,
	            ch4;

	        if (state.inJSXTag || state.inJSXChild) {
	            // Don't need to check for '{' and '}' as it's already handled
	            // correctly by default.
	            switch (code) {
	            case 60:  // <
	            case 62:  // >
	                ++index;
	                return {
	                    type: Token.Punctuator,
	                    value: String.fromCharCode(code),
	                    lineNumber: lineNumber,
	                    lineStart: lineStart,
	                    range: [start, index]
	                };
	            }
	        }

	        switch (code) {
	        // Check for most common single-character punctuators.
	        case 40:   // ( open bracket
	        case 41:   // ) close bracket
	        case 59:   // ; semicolon
	        case 44:   // , comma
	        case 123:  // { open curly brace
	        case 125:  // } close curly brace
	        case 91:   // [
	        case 93:   // ]
	        case 58:   // :
	        case 63:   // ?
	        case 126:  // ~
	            ++index;
	            if (extra.tokenize) {
	                if (code === 40) {
	                    extra.openParenToken = extra.tokens.length;
	                } else if (code === 123) {
	                    extra.openCurlyToken = extra.tokens.length;
	                }
	            }
	            return {
	                type: Token.Punctuator,
	                value: String.fromCharCode(code),
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };

	        default:
	            code2 = source.charCodeAt(index + 1);

	            // '=' (char #61) marks an assignment or comparison operator.
	            if (code2 === 61) {
	                switch (code) {
	                case 37:  // %
	                case 38:  // &
	                case 42:  // *:
	                case 43:  // +
	                case 45:  // -
	                case 47:  // /
	                case 60:  // <
	                case 62:  // >
	                case 94:  // ^
	                case 124: // |
	                    index += 2;
	                    return {
	                        type: Token.Punctuator,
	                        value: String.fromCharCode(code) + String.fromCharCode(code2),
	                        lineNumber: lineNumber,
	                        lineStart: lineStart,
	                        range: [start, index]
	                    };

	                case 33: // !
	                case 61: // =
	                    index += 2;

	                    // !== and ===
	                    if (source.charCodeAt(index) === 61) {
	                        ++index;
	                    }
	                    return {
	                        type: Token.Punctuator,
	                        value: source.slice(start, index),
	                        lineNumber: lineNumber,
	                        lineStart: lineStart,
	                        range: [start, index]
	                    };
	                default:
	                    break;
	                }
	            }
	            break;
	        }

	        // Peek more characters.

	        ch2 = source[index + 1];
	        ch3 = source[index + 2];
	        ch4 = source[index + 3];

	        // 4-character punctuator: >>>=

	        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
	            if (ch4 === '=') {
	                index += 4;
	                return {
	                    type: Token.Punctuator,
	                    value: '>>>=',
	                    lineNumber: lineNumber,
	                    lineStart: lineStart,
	                    range: [start, index]
	                };
	            }
	        }

	        // 3-character punctuators: === !== >>> <<= >>=

	        if (ch1 === '>' && ch2 === '>' && ch3 === '>' && !state.inType) {
	            index += 3;
	            return {
	                type: Token.Punctuator,
	                value: '>>>',
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
	            index += 3;
	            return {
	                type: Token.Punctuator,
	                value: '<<=',
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
	            index += 3;
	            return {
	                type: Token.Punctuator,
	                value: '>>=',
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        if (ch1 === '.' && ch2 === '.' && ch3 === '.') {
	            index += 3;
	            return {
	                type: Token.Punctuator,
	                value: '...',
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        // Other 2-character punctuators: ++ -- << >> && ||

	        // Don't match these tokens if we're in a type, since they never can
	        // occur and can mess up types like Map<string, Array<string>>
	        if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0) && !state.inType) {
	            index += 2;
	            return {
	                type: Token.Punctuator,
	                value: ch1 + ch2,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        if (ch1 === '=' && ch2 === '>') {
	            index += 2;
	            return {
	                type: Token.Punctuator,
	                value: '=>',
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
	            ++index;
	            return {
	                type: Token.Punctuator,
	                value: ch1,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        if (ch1 === '.') {
	            ++index;
	            return {
	                type: Token.Punctuator,
	                value: ch1,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	    }

	    // 7.8.3 Numeric Literals

	    function scanHexLiteral(start) {
	        var number = '';

	        while (index < length) {
	            if (!isHexDigit(source[index])) {
	                break;
	            }
	            number += source[index++];
	        }

	        if (number.length === 0) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        if (isIdentifierStart(source.charCodeAt(index))) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        return {
	            type: Token.NumericLiteral,
	            value: parseInt('0x' + number, 16),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    function scanBinaryLiteral(start) {
	        var ch, number;

	        number = '';

	        while (index < length) {
	            ch = source[index];
	            if (ch !== '0' && ch !== '1') {
	                break;
	            }
	            number += source[index++];
	        }

	        if (number.length === 0) {
	            // only 0b or 0B
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        if (index < length) {
	            ch = source.charCodeAt(index);
	            /* istanbul ignore else */
	            if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
	                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	            }
	        }

	        return {
	            type: Token.NumericLiteral,
	            value: parseInt(number, 2),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    function scanOctalLiteral(prefix, start) {
	        var number, octal;

	        if (isOctalDigit(prefix)) {
	            octal = true;
	            number = '0' + source[index++];
	        } else {
	            octal = false;
	            ++index;
	            number = '';
	        }

	        while (index < length) {
	            if (!isOctalDigit(source[index])) {
	                break;
	            }
	            number += source[index++];
	        }

	        if (!octal && number.length === 0) {
	            // only 0o or 0O
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        return {
	            type: Token.NumericLiteral,
	            value: parseInt(number, 8),
	            octal: octal,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    function scanNumericLiteral() {
	        var number, start, ch;

	        ch = source[index];
	        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
	            'Numeric literal must start with a decimal digit or a decimal point');

	        start = index;
	        number = '';
	        if (ch !== '.') {
	            number = source[index++];
	            ch = source[index];

	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            // Octal number in ES6 starts with '0o'.
	            // Binary number in ES6 starts with '0b'.
	            if (number === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++index;
	                    return scanHexLiteral(start);
	                }
	                if (ch === 'b' || ch === 'B') {
	                    ++index;
	                    return scanBinaryLiteral(start);
	                }
	                if (ch === 'o' || ch === 'O' || isOctalDigit(ch)) {
	                    return scanOctalLiteral(ch, start);
	                }
	                // decimal number starts with '0' such as '09' is illegal.
	                if (ch && isDecimalDigit(ch.charCodeAt(0))) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	            }

	            while (isDecimalDigit(source.charCodeAt(index))) {
	                number += source[index++];
	            }
	            ch = source[index];
	        }

	        if (ch === '.') {
	            number += source[index++];
	            while (isDecimalDigit(source.charCodeAt(index))) {
	                number += source[index++];
	            }
	            ch = source[index];
	        }

	        if (ch === 'e' || ch === 'E') {
	            number += source[index++];

	            ch = source[index];
	            if (ch === '+' || ch === '-') {
	                number += source[index++];
	            }
	            if (isDecimalDigit(source.charCodeAt(index))) {
	                while (isDecimalDigit(source.charCodeAt(index))) {
	                    number += source[index++];
	                }
	            } else {
	                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	            }
	        }

	        if (isIdentifierStart(source.charCodeAt(index))) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        return {
	            type: Token.NumericLiteral,
	            value: parseFloat(number),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    // 7.8.4 String Literals

	    function scanStringLiteral() {
	        var str = '', quote, start, ch, code, unescaped, restore, octal = false;

	        quote = source[index];
	        assert((quote === '\'' || quote === '"'),
	            'String literal must starts with a quote');

	        start = index;
	        ++index;

	        while (index < length) {
	            ch = source[index++];

	            if (ch === quote) {
	                quote = '';
	                break;
	            } else if (ch === '\\') {
	                ch = source[index++];
	                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                    case 'n':
	                        str += '\n';
	                        break;
	                    case 'r':
	                        str += '\r';
	                        break;
	                    case 't':
	                        str += '\t';
	                        break;
	                    case 'u':
	                    case 'x':
	                        if (source[index] === '{') {
	                            ++index;
	                            str += scanUnicodeCodePointEscape();
	                        } else {
	                            restore = index;
	                            unescaped = scanHexEscape(ch);
	                            if (unescaped) {
	                                str += unescaped;
	                            } else {
	                                index = restore;
	                                str += ch;
	                            }
	                        }
	                        break;
	                    case 'b':
	                        str += '\b';
	                        break;
	                    case 'f':
	                        str += '\f';
	                        break;
	                    case 'v':
	                        str += '\x0B';
	                        break;

	                    default:
	                        if (isOctalDigit(ch)) {
	                            code = '01234567'.indexOf(ch);

	                            // \0 is not octal escape sequence
	                            if (code !== 0) {
	                                octal = true;
	                            }

	                            /* istanbul ignore else */
	                            if (index < length && isOctalDigit(source[index])) {
	                                octal = true;
	                                code = code * 8 + '01234567'.indexOf(source[index++]);

	                                // 3 digits are only allowed when string starts
	                                // with 0, 1, 2, 3
	                                if ('0123'.indexOf(ch) >= 0 &&
	                                        index < length &&
	                                        isOctalDigit(source[index])) {
	                                    code = code * 8 + '01234567'.indexOf(source[index++]);
	                                }
	                            }
	                            str += String.fromCharCode(code);
	                        } else {
	                            str += ch;
	                        }
	                        break;
	                    }
	                } else {
	                    ++lineNumber;
	                    if (ch === '\r' && source[index] === '\n') {
	                        ++index;
	                    }
	                    lineStart = index;
	                }
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            } else {
	                str += ch;
	            }
	        }

	        if (quote !== '') {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        return {
	            type: Token.StringLiteral,
	            value: str,
	            octal: octal,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    function scanTemplate() {
	        var cooked = '', ch, start, terminated, tail, restore, unescaped, code, octal;

	        terminated = false;
	        tail = false;
	        start = index;

	        ++index;

	        while (index < length) {
	            ch = source[index++];
	            if (ch === '`') {
	                tail = true;
	                terminated = true;
	                break;
	            } else if (ch === '$') {
	                if (source[index] === '{') {
	                    ++index;
	                    terminated = true;
	                    break;
	                }
	                cooked += ch;
	            } else if (ch === '\\') {
	                ch = source[index++];
	                if (!isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                    case 'n':
	                        cooked += '\n';
	                        break;
	                    case 'r':
	                        cooked += '\r';
	                        break;
	                    case 't':
	                        cooked += '\t';
	                        break;
	                    case 'u':
	                    case 'x':
	                        if (source[index] === '{') {
	                            ++index;
	                            cooked += scanUnicodeCodePointEscape();
	                        } else {
	                            restore = index;
	                            unescaped = scanHexEscape(ch);
	                            if (unescaped) {
	                                cooked += unescaped;
	                            } else {
	                                index = restore;
	                                cooked += ch;
	                            }
	                        }
	                        break;
	                    case 'b':
	                        cooked += '\b';
	                        break;
	                    case 'f':
	                        cooked += '\f';
	                        break;
	                    case 'v':
	                        cooked += '\v';
	                        break;

	                    default:
	                        if (isOctalDigit(ch)) {
	                            code = '01234567'.indexOf(ch);

	                            // \0 is not octal escape sequence
	                            if (code !== 0) {
	                                octal = true;
	                            }

	                            /* istanbul ignore else */
	                            if (index < length && isOctalDigit(source[index])) {
	                                octal = true;
	                                code = code * 8 + '01234567'.indexOf(source[index++]);

	                                // 3 digits are only allowed when string starts
	                                // with 0, 1, 2, 3
	                                if ('0123'.indexOf(ch) >= 0 &&
	                                        index < length &&
	                                        isOctalDigit(source[index])) {
	                                    code = code * 8 + '01234567'.indexOf(source[index++]);
	                                }
	                            }
	                            cooked += String.fromCharCode(code);
	                        } else {
	                            cooked += ch;
	                        }
	                        break;
	                    }
	                } else {
	                    ++lineNumber;
	                    if (ch === '\r' && source[index] === '\n') {
	                        ++index;
	                    }
	                    lineStart = index;
	                }
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                ++lineNumber;
	                if (ch === '\r' && source[index] === '\n') {
	                    ++index;
	                }
	                lineStart = index;
	                cooked += '\n';
	            } else {
	                cooked += ch;
	            }
	        }

	        if (!terminated) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        return {
	            type: Token.Template,
	            value: {
	                cooked: cooked,
	                raw: source.slice(start + 1, index - ((tail) ? 1 : 2))
	            },
	            tail: tail,
	            octal: octal,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    function scanTemplateElement(option) {
	        var startsWith, template;

	        lookahead = null;
	        skipComment();

	        startsWith = (option.head) ? '`' : '}';

	        if (source[index] !== startsWith) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        template = scanTemplate();

	        peek();

	        return template;
	    }

	    function testRegExp(pattern, flags) {
	        var tmp = pattern,
	            value;

	        if (flags.indexOf('u') >= 0) {
	            // Replace each astral symbol and every Unicode code point
	            // escape sequence with a single ASCII symbol to avoid throwing on
	            // regular expressions that are only valid in combination with the
	            // `/u` flag.
	            // Note: replacing with the ASCII symbol `x` might cause false
	            // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
	            // perfectly valid pattern that is equivalent to `[a-b]`, but it
	            // would be replaced by `[x-b]` which throws an error.
	            tmp = tmp
	                .replace(/\\u\{([0-9a-fA-F]+)\}/g, function ($0, $1) {
	                    if (parseInt($1, 16) <= 0x10FFFF) {
	                        return 'x';
	                    }
	                    throwError({}, Messages.InvalidRegExp);
	                })
	                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, 'x');
	        }

	        // First, detect invalid regular expressions.
	        try {
	            value = new RegExp(tmp);
	        } catch (e) {
	            throwError({}, Messages.InvalidRegExp);
	        }

	        // Return a regular expression object for this pattern-flag pair, or
	        // `null` in case the current environment doesn't support the flags it
	        // uses.
	        try {
	            return new RegExp(pattern, flags);
	        } catch (exception) {
	            return null;
	        }
	    }

	    function scanRegExpBody() {
	        var ch, str, classMarker, terminated, body;

	        ch = source[index];
	        assert(ch === '/', 'Regular expression literal must start with a slash');
	        str = source[index++];

	        classMarker = false;
	        terminated = false;
	        while (index < length) {
	            ch = source[index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = source[index++];
	                // ECMA-262 7.8.5
	                if (isLineTerminator(ch.charCodeAt(0))) {
	                    throwError({}, Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                throwError({}, Messages.UnterminatedRegExp);
	            } else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            } else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                } else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }

	        if (!terminated) {
	            throwError({}, Messages.UnterminatedRegExp);
	        }

	        // Exclude leading and trailing slash.
	        body = str.substr(1, str.length - 2);
	        return {
	            value: body,
	            literal: str
	        };
	    }

	    function scanRegExpFlags() {
	        var ch, str, flags, restore;

	        str = '';
	        flags = '';
	        while (index < length) {
	            ch = source[index];
	            if (!isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }

	            ++index;
	            if (ch === '\\' && index < length) {
	                ch = source[index];
	                if (ch === 'u') {
	                    ++index;
	                    restore = index;
	                    ch = scanHexEscape('u');
	                    if (ch) {
	                        flags += ch;
	                        for (str += '\\u'; restore < index; ++restore) {
	                            str += source[restore];
	                        }
	                    } else {
	                        index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
	                } else {
	                    str += '\\';
	                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	            } else {
	                flags += ch;
	                str += ch;
	            }
	        }

	        return {
	            value: flags,
	            literal: str
	        };
	    }

	    function scanRegExp() {
	        var start, body, flags, value;

	        lookahead = null;
	        skipComment();
	        start = index;

	        body = scanRegExpBody();
	        flags = scanRegExpFlags();
	        value = testRegExp(body.value, flags.value);

	        if (extra.tokenize) {
	            return {
	                type: Token.RegularExpression,
	                value: value,
	                regex: {
	                    pattern: body.value,
	                    flags: flags.value
	                },
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [start, index]
	            };
	        }

	        return {
	            literal: body.literal + flags.literal,
	            value: value,
	            regex: {
	                pattern: body.value,
	                flags: flags.value
	            },
	            range: [start, index]
	        };
	    }

	    function isIdentifierName(token) {
	        return token.type === Token.Identifier ||
	            token.type === Token.Keyword ||
	            token.type === Token.BooleanLiteral ||
	            token.type === Token.NullLiteral;
	    }

	    function advanceSlash() {
	        var prevToken,
	            checkToken;
	        // Using the following algorithm:
	        // https://github.com/mozilla/sweet.js/wiki/design
	        prevToken = extra.tokens[extra.tokens.length - 1];
	        if (!prevToken) {
	            // Nothing before that: it cannot be a division.
	            return scanRegExp();
	        }
	        if (prevToken.type === 'Punctuator') {
	            if (prevToken.value === ')') {
	                checkToken = extra.tokens[extra.openParenToken - 1];
	                if (checkToken &&
	                        checkToken.type === 'Keyword' &&
	                        (checkToken.value === 'if' ||
	                         checkToken.value === 'while' ||
	                         checkToken.value === 'for' ||
	                         checkToken.value === 'with')) {
	                    return scanRegExp();
	                }
	                return scanPunctuator();
	            }
	            if (prevToken.value === '}') {
	                // Dividing a function by anything makes little sense,
	                // but we have to check for that.
	                if (extra.tokens[extra.openCurlyToken - 3] &&
	                        extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
	                    // Anonymous function.
	                    checkToken = extra.tokens[extra.openCurlyToken - 4];
	                    if (!checkToken) {
	                        return scanPunctuator();
	                    }
	                } else if (extra.tokens[extra.openCurlyToken - 4] &&
	                        extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
	                    // Named function.
	                    checkToken = extra.tokens[extra.openCurlyToken - 5];
	                    if (!checkToken) {
	                        return scanRegExp();
	                    }
	                } else {
	                    return scanPunctuator();
	                }
	                // checkToken determines whether the function is
	                // a declaration or an expression.
	                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
	                    // It is an expression.
	                    return scanPunctuator();
	                }
	                // It is a declaration.
	                return scanRegExp();
	            }
	            return scanRegExp();
	        }
	        if (prevToken.type === 'Keyword' && prevToken.value !== 'this') {
	            return scanRegExp();
	        }
	        return scanPunctuator();
	    }

	    function advance() {
	        var ch;

	        if (!state.inJSXChild) {
	            skipComment();
	        }

	        if (index >= length) {
	            return {
	                type: Token.EOF,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                range: [index, index]
	            };
	        }

	        if (state.inJSXChild) {
	            return advanceJSXChild();
	        }

	        ch = source.charCodeAt(index);

	        // Very common: ( and ) and ;
	        if (ch === 40 || ch === 41 || ch === 58) {
	            return scanPunctuator();
	        }

	        // String literal starts with single quote (#39) or double quote (#34).
	        if (ch === 39 || ch === 34) {
	            if (state.inJSXTag) {
	                return scanJSXStringLiteral();
	            }
	            return scanStringLiteral();
	        }

	        if (state.inJSXTag && isJSXIdentifierStart(ch)) {
	            return scanJSXIdentifier();
	        }

	        if (ch === 96) {
	            return scanTemplate();
	        }
	        if (isIdentifierStart(ch)) {
	            return scanIdentifier();
	        }

	        // Dot (.) char #46 can also start a floating-point number, hence the need
	        // to check the next character.
	        if (ch === 46) {
	            if (isDecimalDigit(source.charCodeAt(index + 1))) {
	                return scanNumericLiteral();
	            }
	            return scanPunctuator();
	        }

	        if (isDecimalDigit(ch)) {
	            return scanNumericLiteral();
	        }

	        // Slash (/) char #47 can also start a regex.
	        if (extra.tokenize && ch === 47) {
	            return advanceSlash();
	        }

	        return scanPunctuator();
	    }

	    function lex() {
	        var token;

	        token = lookahead;
	        index = token.range[1];
	        lineNumber = token.lineNumber;
	        lineStart = token.lineStart;

	        lookahead = advance();

	        index = token.range[1];
	        lineNumber = token.lineNumber;
	        lineStart = token.lineStart;

	        return token;
	    }

	    function peek() {
	        var pos, line, start;

	        pos = index;
	        line = lineNumber;
	        start = lineStart;
	        lookahead = advance();
	        index = pos;
	        lineNumber = line;
	        lineStart = start;
	    }

	    function lookahead2() {
	        var adv, pos, line, start, result;

	        // If we are collecting the tokens, don't grab the next one yet.
	        /* istanbul ignore next */
	        adv = (typeof extra.advance === 'function') ? extra.advance : advance;

	        pos = index;
	        line = lineNumber;
	        start = lineStart;

	        // Scan for the next immediate token.
	        /* istanbul ignore if */
	        if (lookahead === null) {
	            lookahead = adv();
	        }
	        index = lookahead.range[1];
	        lineNumber = lookahead.lineNumber;
	        lineStart = lookahead.lineStart;

	        // Grab the token right after.
	        result = adv();
	        index = pos;
	        lineNumber = line;
	        lineStart = start;

	        return result;
	    }

	    function rewind(token) {
	        index = token.range[0];
	        lineNumber = token.lineNumber;
	        lineStart = token.lineStart;
	        lookahead = token;
	    }

	    function markerCreate() {
	        if (!extra.loc && !extra.range) {
	            return undefined;
	        }
	        skipComment();
	        return {offset: index, line: lineNumber, col: index - lineStart};
	    }

	    function markerCreatePreserveWhitespace() {
	        if (!extra.loc && !extra.range) {
	            return undefined;
	        }
	        return {offset: index, line: lineNumber, col: index - lineStart};
	    }

	    function processComment(node) {
	        var lastChild,
	            trailingComments,
	            bottomRight = extra.bottomRightStack,
	            last = bottomRight[bottomRight.length - 1];

	        if (node.type === Syntax.Program) {
	            /* istanbul ignore else */
	            if (node.body.length > 0) {
	                return;
	            }
	        }

	        if (extra.trailingComments.length > 0) {
	            if (extra.trailingComments[0].range[0] >= node.range[1]) {
	                trailingComments = extra.trailingComments;
	                extra.trailingComments = [];
	            } else {
	                extra.trailingComments.length = 0;
	            }
	        } else {
	            if (last && last.trailingComments && last.trailingComments[0].range[0] >= node.range[1]) {
	                trailingComments = last.trailingComments;
	                delete last.trailingComments;
	            }
	        }

	        // Eating the stack.
	        if (last) {
	            while (last && last.range[0] >= node.range[0]) {
	                lastChild = last;
	                last = bottomRight.pop();
	            }
	        }

	        if (lastChild) {
	            if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
	                node.leadingComments = lastChild.leadingComments;
	                delete lastChild.leadingComments;
	            }
	        } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
	            node.leadingComments = extra.leadingComments;
	            extra.leadingComments = [];
	        }

	        if (trailingComments) {
	            node.trailingComments = trailingComments;
	        }

	        bottomRight.push(node);
	    }

	    function markerApply(marker, node) {
	        if (extra.range) {
	            node.range = [marker.offset, index];
	        }
	        if (extra.loc) {
	            node.loc = {
	                start: {
	                    line: marker.line,
	                    column: marker.col
	                },
	                end: {
	                    line: lineNumber,
	                    column: index - lineStart
	                }
	            };
	            node = delegate.postProcess(node);
	        }
	        if (extra.attachComment) {
	            processComment(node);
	        }
	        return node;
	    }

	    SyntaxTreeDelegate = {

	        name: 'SyntaxTree',

	        postProcess: function (node) {
	            return node;
	        },

	        createArrayExpression: function (elements) {
	            return {
	                type: Syntax.ArrayExpression,
	                elements: elements
	            };
	        },

	        createAssignmentExpression: function (operator, left, right) {
	            return {
	                type: Syntax.AssignmentExpression,
	                operator: operator,
	                left: left,
	                right: right
	            };
	        },

	        createBinaryExpression: function (operator, left, right) {
	            var type = (operator === '||' || operator === '&&') ? Syntax.LogicalExpression :
	                        Syntax.BinaryExpression;
	            return {
	                type: type,
	                operator: operator,
	                left: left,
	                right: right
	            };
	        },

	        createBlockStatement: function (body) {
	            return {
	                type: Syntax.BlockStatement,
	                body: body
	            };
	        },

	        createBreakStatement: function (label) {
	            return {
	                type: Syntax.BreakStatement,
	                label: label
	            };
	        },

	        createCallExpression: function (callee, args) {
	            return {
	                type: Syntax.CallExpression,
	                callee: callee,
	                'arguments': args
	            };
	        },

	        createCatchClause: function (param, body) {
	            return {
	                type: Syntax.CatchClause,
	                param: param,
	                body: body
	            };
	        },

	        createConditionalExpression: function (test, consequent, alternate) {
	            return {
	                type: Syntax.ConditionalExpression,
	                test: test,
	                consequent: consequent,
	                alternate: alternate
	            };
	        },

	        createContinueStatement: function (label) {
	            return {
	                type: Syntax.ContinueStatement,
	                label: label
	            };
	        },

	        createDebuggerStatement: function () {
	            return {
	                type: Syntax.DebuggerStatement
	            };
	        },

	        createDoWhileStatement: function (body, test) {
	            return {
	                type: Syntax.DoWhileStatement,
	                body: body,
	                test: test
	            };
	        },

	        createEmptyStatement: function () {
	            return {
	                type: Syntax.EmptyStatement
	            };
	        },

	        createExpressionStatement: function (expression) {
	            return {
	                type: Syntax.ExpressionStatement,
	                expression: expression
	            };
	        },

	        createForStatement: function (init, test, update, body) {
	            return {
	                type: Syntax.ForStatement,
	                init: init,
	                test: test,
	                update: update,
	                body: body
	            };
	        },

	        createForInStatement: function (left, right, body) {
	            return {
	                type: Syntax.ForInStatement,
	                left: left,
	                right: right,
	                body: body,
	                each: false
	            };
	        },

	        createForOfStatement: function (left, right, body) {
	            return {
	                type: Syntax.ForOfStatement,
	                left: left,
	                right: right,
	                body: body
	            };
	        },

	        createFunctionDeclaration: function (id, params, defaults, body, rest, generator, expression,
	                                             isAsync, returnType, typeParameters) {
	            var funDecl = {
	                type: Syntax.FunctionDeclaration,
	                id: id,
	                params: params,
	                defaults: defaults,
	                body: body,
	                rest: rest,
	                generator: generator,
	                expression: expression,
	                returnType: returnType,
	                typeParameters: typeParameters
	            };

	            if (isAsync) {
	                funDecl.async = true;
	            }

	            return funDecl;
	        },

	        createFunctionExpression: function (id, params, defaults, body, rest, generator, expression,
	                                            isAsync, returnType, typeParameters) {
	            var funExpr = {
	                type: Syntax.FunctionExpression,
	                id: id,
	                params: params,
	                defaults: defaults,
	                body: body,
	                rest: rest,
	                generator: generator,
	                expression: expression,
	                returnType: returnType,
	                typeParameters: typeParameters
	            };

	            if (isAsync) {
	                funExpr.async = true;
	            }

	            return funExpr;
	        },

	        createIdentifier: function (name) {
	            return {
	                type: Syntax.Identifier,
	                name: name,
	                // Only here to initialize the shape of the object to ensure
	                // that the 'typeAnnotation' key is ordered before others that
	                // are added later (like 'loc' and 'range'). This just helps
	                // keep the shape of Identifier nodes consistent with everything
	                // else.
	                typeAnnotation: undefined,
	                optional: undefined
	            };
	        },

	        createTypeAnnotation: function (typeAnnotation) {
	            return {
	                type: Syntax.TypeAnnotation,
	                typeAnnotation: typeAnnotation
	            };
	        },

	        createTypeCast: function (expression, typeAnnotation) {
	            return {
	                type: Syntax.TypeCastExpression,
	                expression: expression,
	                typeAnnotation: typeAnnotation
	            };
	        },

	        createFunctionTypeAnnotation: function (params, returnType, rest, typeParameters) {
	            return {
	                type: Syntax.FunctionTypeAnnotation,
	                params: params,
	                returnType: returnType,
	                rest: rest,
	                typeParameters: typeParameters
	            };
	        },

	        createFunctionTypeParam: function (name, typeAnnotation, optional) {
	            return {
	                type: Syntax.FunctionTypeParam,
	                name: name,
	                typeAnnotation: typeAnnotation,
	                optional: optional
	            };
	        },

	        createNullableTypeAnnotation: function (typeAnnotation) {
	            return {
	                type: Syntax.NullableTypeAnnotation,
	                typeAnnotation: typeAnnotation
	            };
	        },

	        createArrayTypeAnnotation: function (elementType) {
	            return {
	                type: Syntax.ArrayTypeAnnotation,
	                elementType: elementType
	            };
	        },

	        createGenericTypeAnnotation: function (id, typeParameters) {
	            return {
	                type: Syntax.GenericTypeAnnotation,
	                id: id,
	                typeParameters: typeParameters
	            };
	        },

	        createQualifiedTypeIdentifier: function (qualification, id) {
	            return {
	                type: Syntax.QualifiedTypeIdentifier,
	                qualification: qualification,
	                id: id
	            };
	        },

	        createTypeParameterDeclaration: function (params) {
	            return {
	                type: Syntax.TypeParameterDeclaration,
	                params: params
	            };
	        },

	        createTypeParameterInstantiation: function (params) {
	            return {
	                type: Syntax.TypeParameterInstantiation,
	                params: params
	            };
	        },

	        createAnyTypeAnnotation: function () {
	            return {
	                type: Syntax.AnyTypeAnnotation
	            };
	        },

	        createBooleanTypeAnnotation: function () {
	            return {
	                type: Syntax.BooleanTypeAnnotation
	            };
	        },

	        createNumberTypeAnnotation: function () {
	            return {
	                type: Syntax.NumberTypeAnnotation
	            };
	        },

	        createStringTypeAnnotation: function () {
	            return {
	                type: Syntax.StringTypeAnnotation
	            };
	        },

	        createStringLiteralTypeAnnotation: function (token) {
	            return {
	                type: Syntax.StringLiteralTypeAnnotation,
	                value: token.value,
	                raw: source.slice(token.range[0], token.range[1])
	            };
	        },

	        createVoidTypeAnnotation: function () {
	            return {
	                type: Syntax.VoidTypeAnnotation
	            };
	        },

	        createTypeofTypeAnnotation: function (argument) {
	            return {
	                type: Syntax.TypeofTypeAnnotation,
	                argument: argument
	            };
	        },

	        createTupleTypeAnnotation: function (types) {
	            return {
	                type: Syntax.TupleTypeAnnotation,
	                types: types
	            };
	        },

	        createObjectTypeAnnotation: function (properties, indexers, callProperties) {
	            return {
	                type: Syntax.ObjectTypeAnnotation,
	                properties: properties,
	                indexers: indexers,
	                callProperties: callProperties
	            };
	        },

	        createObjectTypeIndexer: function (id, key, value, isStatic) {
	            return {
	                type: Syntax.ObjectTypeIndexer,
	                id: id,
	                key: key,
	                value: value,
	                static: isStatic
	            };
	        },

	        createObjectTypeCallProperty: function (value, isStatic) {
	            return {
	                type: Syntax.ObjectTypeCallProperty,
	                value: value,
	                static: isStatic
	            };
	        },

	        createObjectTypeProperty: function (key, value, optional, isStatic) {
	            return {
	                type: Syntax.ObjectTypeProperty,
	                key: key,
	                value: value,
	                optional: optional,
	                static: isStatic
	            };
	        },

	        createUnionTypeAnnotation: function (types) {
	            return {
	                type: Syntax.UnionTypeAnnotation,
	                types: types
	            };
	        },

	        createIntersectionTypeAnnotation: function (types) {
	            return {
	                type: Syntax.IntersectionTypeAnnotation,
	                types: types
	            };
	        },

	        createTypeAlias: function (id, typeParameters, right) {
	            return {
	                type: Syntax.TypeAlias,
	                id: id,
	                typeParameters: typeParameters,
	                right: right
	            };
	        },

	        createInterface: function (id, typeParameters, body, extended) {
	            return {
	                type: Syntax.InterfaceDeclaration,
	                id: id,
	                typeParameters: typeParameters,
	                body: body,
	                extends: extended
	            };
	        },

	        createInterfaceExtends: function (id, typeParameters) {
	            return {
	                type: Syntax.InterfaceExtends,
	                id: id,
	                typeParameters: typeParameters
	            };
	        },

	        createDeclareFunction: function (id) {
	            return {
	                type: Syntax.DeclareFunction,
	                id: id
	            };
	        },

	        createDeclareVariable: function (id) {
	            return {
	                type: Syntax.DeclareVariable,
	                id: id
	            };
	        },

	        createDeclareModule: function (id, body) {
	            return {
	                type: Syntax.DeclareModule,
	                id: id,
	                body: body
	            };
	        },

	        createJSXAttribute: function (name, value) {
	            return {
	                type: Syntax.JSXAttribute,
	                name: name,
	                value: value || null
	            };
	        },

	        createJSXSpreadAttribute: function (argument) {
	            return {
	                type: Syntax.JSXSpreadAttribute,
	                argument: argument
	            };
	        },

	        createJSXIdentifier: function (name) {
	            return {
	                type: Syntax.JSXIdentifier,
	                name: name
	            };
	        },

	        createJSXNamespacedName: function (namespace, name) {
	            return {
	                type: Syntax.JSXNamespacedName,
	                namespace: namespace,
	                name: name
	            };
	        },

	        createJSXMemberExpression: function (object, property) {
	            return {
	                type: Syntax.JSXMemberExpression,
	                object: object,
	                property: property
	            };
	        },

	        createJSXElement: function (openingElement, closingElement, children) {
	            return {
	                type: Syntax.JSXElement,
	                openingElement: openingElement,
	                closingElement: closingElement,
	                children: children
	            };
	        },

	        createJSXEmptyExpression: function () {
	            return {
	                type: Syntax.JSXEmptyExpression
	            };
	        },

	        createJSXExpressionContainer: function (expression) {
	            return {
	                type: Syntax.JSXExpressionContainer,
	                expression: expression
	            };
	        },

	        createJSXOpeningElement: function (name, attributes, selfClosing) {
	            return {
	                type: Syntax.JSXOpeningElement,
	                name: name,
	                selfClosing: selfClosing,
	                attributes: attributes
	            };
	        },

	        createJSXClosingElement: function (name) {
	            return {
	                type: Syntax.JSXClosingElement,
	                name: name
	            };
	        },

	        createIfStatement: function (test, consequent, alternate) {
	            return {
	                type: Syntax.IfStatement,
	                test: test,
	                consequent: consequent,
	                alternate: alternate
	            };
	        },

	        createLabeledStatement: function (label, body) {
	            return {
	                type: Syntax.LabeledStatement,
	                label: label,
	                body: body
	            };
	        },

	        createLiteral: function (token) {
	            var object = {
	                type: Syntax.Literal,
	                value: token.value,
	                raw: source.slice(token.range[0], token.range[1])
	            };
	            if (token.regex) {
	                object.regex = token.regex;
	            }
	            return object;
	        },

	        createMemberExpression: function (accessor, object, property) {
	            return {
	                type: Syntax.MemberExpression,
	                computed: accessor === '[',
	                object: object,
	                property: property
	            };
	        },

	        createNewExpression: function (callee, args) {
	            return {
	                type: Syntax.NewExpression,
	                callee: callee,
	                'arguments': args
	            };
	        },

	        createObjectExpression: function (properties) {
	            return {
	                type: Syntax.ObjectExpression,
	                properties: properties
	            };
	        },

	        createPostfixExpression: function (operator, argument) {
	            return {
	                type: Syntax.UpdateExpression,
	                operator: operator,
	                argument: argument,
	                prefix: false
	            };
	        },

	        createProgram: function (body) {
	            return {
	                type: Syntax.Program,
	                body: body
	            };
	        },

	        createProperty: function (kind, key, value, method, shorthand, computed) {
	            return {
	                type: Syntax.Property,
	                key: key,
	                value: value,
	                kind: kind,
	                method: method,
	                shorthand: shorthand,
	                computed: computed
	            };
	        },

	        createReturnStatement: function (argument) {
	            return {
	                type: Syntax.ReturnStatement,
	                argument: argument
	            };
	        },

	        createSequenceExpression: function (expressions) {
	            return {
	                type: Syntax.SequenceExpression,
	                expressions: expressions
	            };
	        },

	        createSwitchCase: function (test, consequent) {
	            return {
	                type: Syntax.SwitchCase,
	                test: test,
	                consequent: consequent
	            };
	        },

	        createSwitchStatement: function (discriminant, cases) {
	            return {
	                type: Syntax.SwitchStatement,
	                discriminant: discriminant,
	                cases: cases
	            };
	        },

	        createThisExpression: function () {
	            return {
	                type: Syntax.ThisExpression
	            };
	        },

	        createThrowStatement: function (argument) {
	            return {
	                type: Syntax.ThrowStatement,
	                argument: argument
	            };
	        },

	        createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
	            return {
	                type: Syntax.TryStatement,
	                block: block,
	                guardedHandlers: guardedHandlers,
	                handlers: handlers,
	                finalizer: finalizer
	            };
	        },

	        createUnaryExpression: function (operator, argument) {
	            if (operator === '++' || operator === '--') {
	                return {
	                    type: Syntax.UpdateExpression,
	                    operator: operator,
	                    argument: argument,
	                    prefix: true
	                };
	            }
	            return {
	                type: Syntax.UnaryExpression,
	                operator: operator,
	                argument: argument,
	                prefix: true
	            };
	        },

	        createVariableDeclaration: function (declarations, kind) {
	            return {
	                type: Syntax.VariableDeclaration,
	                declarations: declarations,
	                kind: kind
	            };
	        },

	        createVariableDeclarator: function (id, init) {
	            return {
	                type: Syntax.VariableDeclarator,
	                id: id,
	                init: init
	            };
	        },

	        createWhileStatement: function (test, body) {
	            return {
	                type: Syntax.WhileStatement,
	                test: test,
	                body: body
	            };
	        },

	        createWithStatement: function (object, body) {
	            return {
	                type: Syntax.WithStatement,
	                object: object,
	                body: body
	            };
	        },

	        createTemplateElement: function (value, tail) {
	            return {
	                type: Syntax.TemplateElement,
	                value: value,
	                tail: tail
	            };
	        },

	        createTemplateLiteral: function (quasis, expressions) {
	            return {
	                type: Syntax.TemplateLiteral,
	                quasis: quasis,
	                expressions: expressions
	            };
	        },

	        createSpreadElement: function (argument) {
	            return {
	                type: Syntax.SpreadElement,
	                argument: argument
	            };
	        },

	        createSpreadProperty: function (argument) {
	            return {
	                type: Syntax.SpreadProperty,
	                argument: argument
	            };
	        },

	        createTaggedTemplateExpression: function (tag, quasi) {
	            return {
	                type: Syntax.TaggedTemplateExpression,
	                tag: tag,
	                quasi: quasi
	            };
	        },

	        createArrowFunctionExpression: function (params, defaults, body, rest, expression, isAsync) {
	            var arrowExpr = {
	                type: Syntax.ArrowFunctionExpression,
	                id: null,
	                params: params,
	                defaults: defaults,
	                body: body,
	                rest: rest,
	                generator: false,
	                expression: expression
	            };

	            if (isAsync) {
	                arrowExpr.async = true;
	            }

	            return arrowExpr;
	        },

	        createMethodDefinition: function (propertyType, kind, key, value, computed) {
	            return {
	                type: Syntax.MethodDefinition,
	                key: key,
	                value: value,
	                kind: kind,
	                'static': propertyType === ClassPropertyType.static,
	                computed: computed
	            };
	        },

	        createClassProperty: function (key, typeAnnotation, computed, isStatic) {
	            return {
	                type: Syntax.ClassProperty,
	                key: key,
	                typeAnnotation: typeAnnotation,
	                computed: computed,
	                static: isStatic
	            };
	        },

	        createClassBody: function (body) {
	            return {
	                type: Syntax.ClassBody,
	                body: body
	            };
	        },

	        createClassImplements: function (id, typeParameters) {
	            return {
	                type: Syntax.ClassImplements,
	                id: id,
	                typeParameters: typeParameters
	            };
	        },

	        createClassExpression: function (id, superClass, body, typeParameters, superTypeParameters, implemented) {
	            return {
	                type: Syntax.ClassExpression,
	                id: id,
	                superClass: superClass,
	                body: body,
	                typeParameters: typeParameters,
	                superTypeParameters: superTypeParameters,
	                implements: implemented
	            };
	        },

	        createClassDeclaration: function (id, superClass, body, typeParameters, superTypeParameters, implemented) {
	            return {
	                type: Syntax.ClassDeclaration,
	                id: id,
	                superClass: superClass,
	                body: body,
	                typeParameters: typeParameters,
	                superTypeParameters: superTypeParameters,
	                implements: implemented
	            };
	        },

	        createModuleSpecifier: function (token) {
	            return {
	                type: Syntax.ModuleSpecifier,
	                value: token.value,
	                raw: source.slice(token.range[0], token.range[1])
	            };
	        },

	        createExportSpecifier: function (id, name) {
	            return {
	                type: Syntax.ExportSpecifier,
	                id: id,
	                name: name
	            };
	        },

	        createExportBatchSpecifier: function () {
	            return {
	                type: Syntax.ExportBatchSpecifier
	            };
	        },

	        createImportDefaultSpecifier: function (id) {
	            return {
	                type: Syntax.ImportDefaultSpecifier,
	                id: id
	            };
	        },

	        createImportNamespaceSpecifier: function (id) {
	            return {
	                type: Syntax.ImportNamespaceSpecifier,
	                id: id
	            };
	        },

	        createExportDeclaration: function (isDefault, declaration, specifiers, src) {
	            return {
	                type: Syntax.ExportDeclaration,
	                'default': !!isDefault,
	                declaration: declaration,
	                specifiers: specifiers,
	                source: src
	            };
	        },

	        createImportSpecifier: function (id, name) {
	            return {
	                type: Syntax.ImportSpecifier,
	                id: id,
	                name: name
	            };
	        },

	        createImportDeclaration: function (specifiers, src, isType) {
	            return {
	                type: Syntax.ImportDeclaration,
	                specifiers: specifiers,
	                source: src,
	                isType: isType
	            };
	        },

	        createYieldExpression: function (argument, dlg) {
	            return {
	                type: Syntax.YieldExpression,
	                argument: argument,
	                delegate: dlg
	            };
	        },

	        createAwaitExpression: function (argument) {
	            return {
	                type: Syntax.AwaitExpression,
	                argument: argument
	            };
	        },

	        createComprehensionExpression: function (filter, blocks, body) {
	            return {
	                type: Syntax.ComprehensionExpression,
	                filter: filter,
	                blocks: blocks,
	                body: body
	            };
	        }

	    };

	    // Return true if there is a line terminator before the next token.

	    function peekLineTerminator() {
	        var pos, line, start, found;

	        pos = index;
	        line = lineNumber;
	        start = lineStart;
	        skipComment();
	        found = lineNumber !== line;
	        index = pos;
	        lineNumber = line;
	        lineStart = start;

	        return found;
	    }

	    // Throw an exception

	    function throwError(token, messageFormat) {
	        var error,
	            args = Array.prototype.slice.call(arguments, 2),
	            msg = messageFormat.replace(
	                /%(\d)/g,
	                function (whole, idx) {
	                    assert(idx < args.length, 'Message reference must be in range');
	                    return args[idx];
	                }
	            );

	        if (typeof token.lineNumber === 'number') {
	            error = new Error('Line ' + token.lineNumber + ': ' + msg);
	            error.index = token.range[0];
	            error.lineNumber = token.lineNumber;
	            error.column = token.range[0] - lineStart + 1;
	        } else {
	            error = new Error('Line ' + lineNumber + ': ' + msg);
	            error.index = index;
	            error.lineNumber = lineNumber;
	            error.column = index - lineStart + 1;
	        }

	        error.description = msg;
	        throw error;
	    }

	    function throwErrorTolerant() {
	        try {
	            throwError.apply(null, arguments);
	        } catch (e) {
	            if (extra.errors) {
	                extra.errors.push(e);
	            } else {
	                throw e;
	            }
	        }
	    }


	    // Throw an exception because of the token.

	    function throwUnexpected(token) {
	        if (token.type === Token.EOF) {
	            throwError(token, Messages.UnexpectedEOS);
	        }

	        if (token.type === Token.NumericLiteral) {
	            throwError(token, Messages.UnexpectedNumber);
	        }

	        if (token.type === Token.StringLiteral || token.type === Token.JSXText) {
	            throwError(token, Messages.UnexpectedString);
	        }

	        if (token.type === Token.Identifier) {
	            throwError(token, Messages.UnexpectedIdentifier);
	        }

	        if (token.type === Token.Keyword) {
	            if (isFutureReservedWord(token.value)) {
	                throwError(token, Messages.UnexpectedReserved);
	            } else if (strict && isStrictModeReservedWord(token.value)) {
	                throwErrorTolerant(token, Messages.StrictReservedWord);
	                return;
	            }
	            throwError(token, Messages.UnexpectedToken, token.value);
	        }

	        if (token.type === Token.Template) {
	            throwError(token, Messages.UnexpectedTemplate, token.value.raw);
	        }

	        // BooleanLiteral, NullLiteral, or Punctuator.
	        throwError(token, Messages.UnexpectedToken, token.value);
	    }

	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.

	    function expect(value) {
	        var token = lex();
	        if (token.type !== Token.Punctuator || token.value !== value) {
	            throwUnexpected(token);
	        }
	    }

	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.

	    function expectKeyword(keyword, contextual) {
	        var token = lex();
	        if (token.type !== (contextual ? Token.Identifier : Token.Keyword) ||
	                token.value !== keyword) {
	            throwUnexpected(token);
	        }
	    }

	    // Expect the next token to match the specified contextual keyword.
	    // If not, an exception will be thrown.

	    function expectContextualKeyword(keyword) {
	        return expectKeyword(keyword, true);
	    }

	    // Return true if the next token matches the specified punctuator.

	    function match(value) {
	        return lookahead.type === Token.Punctuator && lookahead.value === value;
	    }

	    // Return true if the next token matches the specified keyword

	    function matchKeyword(keyword, contextual) {
	        var expectedType = contextual ? Token.Identifier : Token.Keyword;
	        return lookahead.type === expectedType && lookahead.value === keyword;
	    }

	    // Return true if the next token matches the specified contextual keyword

	    function matchContextualKeyword(keyword) {
	        return matchKeyword(keyword, true);
	    }

	    // Return true if the next token is an assignment operator

	    function matchAssign() {
	        var op;

	        if (lookahead.type !== Token.Punctuator) {
	            return false;
	        }
	        op = lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    }

	    // Note that 'yield' is treated as a keyword in strict mode, but a
	    // contextual keyword (identifier) in non-strict mode, so we need to
	    // use matchKeyword('yield', false) and matchKeyword('yield', true)
	    // (i.e. matchContextualKeyword) appropriately.
	    function matchYield() {
	        return state.yieldAllowed && matchKeyword('yield', !strict);
	    }

	    function matchAsync() {
	        var backtrackToken = lookahead, matches = false;

	        if (matchContextualKeyword('async')) {
	            lex(); // Make sure peekLineTerminator() starts after 'async'.
	            matches = !peekLineTerminator();
	            rewind(backtrackToken); // Revert the lex().
	        }

	        return matches;
	    }

	    function matchAwait() {
	        return state.awaitAllowed && matchContextualKeyword('await');
	    }

	    function consumeSemicolon() {
	        var line, oldIndex = index, oldLineNumber = lineNumber,
	            oldLineStart = lineStart, oldLookahead = lookahead;

	        // Catch the very common case first: immediately a semicolon (char #59).
	        if (source.charCodeAt(index) === 59) {
	            lex();
	            return;
	        }

	        line = lineNumber;
	        skipComment();
	        if (lineNumber !== line) {
	            index = oldIndex;
	            lineNumber = oldLineNumber;
	            lineStart = oldLineStart;
	            lookahead = oldLookahead;
	            return;
	        }

	        if (match(';')) {
	            lex();
	            return;
	        }

	        if (lookahead.type !== Token.EOF && !match('}')) {
	            throwUnexpected(lookahead);
	        }
	    }

	    // Return true if provided expression is LeftHandSideExpression

	    function isLeftHandSide(expr) {
	        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
	    }

	    function isAssignableLeftHandSide(expr) {
	        return isLeftHandSide(expr) || expr.type === Syntax.ObjectPattern || expr.type === Syntax.ArrayPattern;
	    }

	    // 11.1.4 Array Initialiser

	    function parseArrayInitialiser() {
	        var elements = [], blocks = [], filter = null, tmp, possiblecomprehension = true,
	            marker = markerCreate();

	        expect('[');
	        while (!match(']')) {
	            if (lookahead.value === 'for' &&
	                    lookahead.type === Token.Keyword) {
	                if (!possiblecomprehension) {
	                    throwError({}, Messages.ComprehensionError);
	                }
	                matchKeyword('for');
	                tmp = parseForStatement({ignoreBody: true});
	                tmp.of = tmp.type === Syntax.ForOfStatement;
	                tmp.type = Syntax.ComprehensionBlock;
	                if (tmp.left.kind) { // can't be let or const
	                    throwError({}, Messages.ComprehensionError);
	                }
	                blocks.push(tmp);
	            } else if (lookahead.value === 'if' &&
	                           lookahead.type === Token.Keyword) {
	                if (!possiblecomprehension) {
	                    throwError({}, Messages.ComprehensionError);
	                }
	                expectKeyword('if');
	                expect('(');
	                filter = parseExpression();
	                expect(')');
	            } else if (lookahead.value === ',' &&
	                           lookahead.type === Token.Punctuator) {
	                possiblecomprehension = false; // no longer allowed.
	                lex();
	                elements.push(null);
	            } else {
	                tmp = parseSpreadOrAssignmentExpression();
	                elements.push(tmp);
	                if (tmp && tmp.type === Syntax.SpreadElement) {
	                    if (!match(']')) {
	                        throwError({}, Messages.ElementAfterSpreadElement);
	                    }
	                } else if (!(match(']') || matchKeyword('for') || matchKeyword('if'))) {
	                    expect(','); // this lexes.
	                    possiblecomprehension = false;
	                }
	            }
	        }

	        expect(']');

	        if (filter && !blocks.length) {
	            throwError({}, Messages.ComprehensionRequiresBlock);
	        }

	        if (blocks.length) {
	            if (elements.length !== 1) {
	                throwError({}, Messages.ComprehensionError);
	            }
	            return markerApply(marker, delegate.createComprehensionExpression(filter, blocks, elements[0]));
	        }
	        return markerApply(marker, delegate.createArrayExpression(elements));
	    }

	    // 11.1.5 Object Initialiser

	    function parsePropertyFunction(options) {
	        var previousStrict, previousYieldAllowed, previousAwaitAllowed,
	            params, defaults, body, marker = markerCreate();

	        previousStrict = strict;
	        previousYieldAllowed = state.yieldAllowed;
	        state.yieldAllowed = options.generator;
	        previousAwaitAllowed = state.awaitAllowed;
	        state.awaitAllowed = options.async;
	        params = options.params || [];
	        defaults = options.defaults || [];

	        body = parseConciseBody();
	        if (options.name && strict && isRestrictedWord(params[0].name)) {
	            throwErrorTolerant(options.name, Messages.StrictParamName);
	        }
	        strict = previousStrict;
	        state.yieldAllowed = previousYieldAllowed;
	        state.awaitAllowed = previousAwaitAllowed;

	        return markerApply(marker, delegate.createFunctionExpression(
	            null,
	            params,
	            defaults,
	            body,
	            options.rest || null,
	            options.generator,
	            body.type !== Syntax.BlockStatement,
	            options.async,
	            options.returnType,
	            options.typeParameters
	        ));
	    }


	    function parsePropertyMethodFunction(options) {
	        var previousStrict, tmp, method;

	        previousStrict = strict;
	        strict = true;

	        tmp = parseParams();

	        if (tmp.stricted) {
	            throwErrorTolerant(tmp.stricted, tmp.message);
	        }

	        method = parsePropertyFunction({
	            params: tmp.params,
	            defaults: tmp.defaults,
	            rest: tmp.rest,
	            generator: options.generator,
	            async: options.async,
	            returnType: tmp.returnType,
	            typeParameters: options.typeParameters
	        });

	        strict = previousStrict;

	        return method;
	    }


	    function parseObjectPropertyKey() {
	        var marker = markerCreate(),
	            token = lex(),
	            propertyKey,
	            result;

	        // Note: This function is called only from parseObjectProperty(), where
	        // EOF and Punctuator tokens are already filtered out.

	        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
	            if (strict && token.octal) {
	                throwErrorTolerant(token, Messages.StrictOctalLiteral);
	            }
	            return markerApply(marker, delegate.createLiteral(token));
	        }

	        if (token.type === Token.Punctuator && token.value === '[') {
	            // For computed properties we should skip the [ and ], and
	            // capture in marker only the assignment expression itself.
	            marker = markerCreate();
	            propertyKey = parseAssignmentExpression();
	            result = markerApply(marker, propertyKey);
	            expect(']');
	            return result;
	        }

	        return markerApply(marker, delegate.createIdentifier(token.value));
	    }

	    function parseObjectProperty() {
	        var token, key, id, param, computed,
	            marker = markerCreate(), returnType, typeParameters;

	        token = lookahead;
	        computed = (token.value === '[' && token.type === Token.Punctuator);

	        if (token.type === Token.Identifier || computed || matchAsync()) {
	            id = parseObjectPropertyKey();

	            if (match(':')) {
	                lex();

	                return markerApply(
	                    marker,
	                    delegate.createProperty(
	                        'init',
	                        id,
	                        parseAssignmentExpression(),
	                        false,
	                        false,
	                        computed
	                    )
	                );
	            }

	            if (match('(') || match('<')) {
	                if (match('<')) {
	                    typeParameters = parseTypeParameterDeclaration();
	                }
	                return markerApply(
	                    marker,
	                    delegate.createProperty(
	                        'init',
	                        id,
	                        parsePropertyMethodFunction({
	                            generator: false,
	                            async: false,
	                            typeParameters: typeParameters
	                        }),
	                        true,
	                        false,
	                        computed
	                    )
	                );
	            }

	            // Property Assignment: Getter and Setter.

	            if (token.value === 'get') {
	                computed = (lookahead.value === '[');
	                key = parseObjectPropertyKey();

	                expect('(');
	                expect(')');
	                if (match(':')) {
	                    returnType = parseTypeAnnotation();
	                }

	                return markerApply(
	                    marker,
	                    delegate.createProperty(
	                        'get',
	                        key,
	                        parsePropertyFunction({
	                            generator: false,
	                            async: false,
	                            returnType: returnType
	                        }),
	                        false,
	                        false,
	                        computed
	                    )
	                );
	            }

	            if (token.value === 'set') {
	                computed = (lookahead.value === '[');
	                key = parseObjectPropertyKey();

	                expect('(');
	                token = lookahead;
	                param = [ parseTypeAnnotatableIdentifier() ];
	                expect(')');
	                if (match(':')) {
	                    returnType = parseTypeAnnotation();
	                }

	                return markerApply(
	                    marker,
	                    delegate.createProperty(
	                        'set',
	                        key,
	                        parsePropertyFunction({
	                            params: param,
	                            generator: false,
	                            async: false,
	                            name: token,
	                            returnType: returnType
	                        }),
	                        false,
	                        false,
	                        computed
	                    )
	                );
	            }

	            if (token.value === 'async') {
	                computed = (lookahead.value === '[');
	                key = parseObjectPropertyKey();

	                if (match('<')) {
	                    typeParameters = parseTypeParameterDeclaration();
	                }

	                return markerApply(
	                    marker,
	                    delegate.createProperty(
	                        'init',
	                        key,
	                        parsePropertyMethodFunction({
	                            generator: false,
	                            async: true,
	                            typeParameters: typeParameters
	                        }),
	                        true,
	                        false,
	                        computed
	                    )
	                );
	            }

	            if (computed) {
	                // Computed properties can only be used with full notation.
	                throwUnexpected(lookahead);
	            }

	            return markerApply(
	                marker,
	                delegate.createProperty('init', id, id, false, true, false)
	            );
	        }

	        if (token.type === Token.EOF || token.type === Token.Punctuator) {
	            if (!match('*')) {
	                throwUnexpected(token);
	            }
	            lex();

	            computed = (lookahead.type === Token.Punctuator && lookahead.value === '[');

	            id = parseObjectPropertyKey();

	            if (match('<')) {
	                typeParameters = parseTypeParameterDeclaration();
	            }

	            if (!match('(')) {
	                throwUnexpected(lex());
	            }

	            return markerApply(marker, delegate.createProperty(
	                'init',
	                id,
	                parsePropertyMethodFunction({
	                    generator: true,
	                    typeParameters: typeParameters
	                }),
	                true,
	                false,
	                computed
	            ));
	        }
	        key = parseObjectPropertyKey();
	        if (match(':')) {
	            lex();
	            return markerApply(marker, delegate.createProperty('init', key, parseAssignmentExpression(), false, false, false));
	        }
	        if (match('(') || match('<')) {
	            if (match('<')) {
	                typeParameters = parseTypeParameterDeclaration();
	            }
	            return markerApply(marker, delegate.createProperty(
	                'init',
	                key,
	                parsePropertyMethodFunction({
	                    generator: false,
	                    typeParameters: typeParameters
	                }),
	                true,
	                false,
	                false
	            ));
	        }
	        throwUnexpected(lex());
	    }

	    function parseObjectSpreadProperty() {
	        var marker = markerCreate();
	        expect('...');
	        return markerApply(marker, delegate.createSpreadProperty(parseAssignmentExpression()));
	    }

	    function getFieldName(key) {
	        var toString = String;
	        if (key.type === Syntax.Identifier) {
	            return key.name;
	        }
	        return toString(key.value);
	    }

	    function parseObjectInitialiser() {
	        var properties = [], property, name, kind, storedKind, map = new StringMap(),
	            marker = markerCreate(), toString = String;

	        expect('{');

	        while (!match('}')) {
	            if (match('...')) {
	                property = parseObjectSpreadProperty();
	            } else {
	                property = parseObjectProperty();

	                if (property.key.type === Syntax.Identifier) {
	                    name = property.key.name;
	                } else {
	                    name = toString(property.key.value);
	                }
	                kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;

	                if (map.has(name)) {
	                    storedKind = map.get(name);
	                    if (storedKind === PropertyKind.Data) {
	                        if (strict && kind === PropertyKind.Data) {
	                            throwErrorTolerant({}, Messages.StrictDuplicateProperty);
	                        } else if (kind !== PropertyKind.Data) {
	                            throwErrorTolerant({}, Messages.AccessorDataProperty);
	                        }
	                    } else {
	                        if (kind === PropertyKind.Data) {
	                            throwErrorTolerant({}, Messages.AccessorDataProperty);
	                        } else if (storedKind & kind) {
	                            throwErrorTolerant({}, Messages.AccessorGetSet);
	                        }
	                    }
	                    map.set(name, storedKind | kind);
	                } else {
	                    map.set(name, kind);
	                }
	            }

	            properties.push(property);

	            if (!match('}')) {
	                expect(',');
	            }
	        }

	        expect('}');

	        return markerApply(marker, delegate.createObjectExpression(properties));
	    }

	    function parseTemplateElement(option) {
	        var marker = markerCreate(),
	            token = scanTemplateElement(option);
	        if (strict && token.octal) {
	            throwError(token, Messages.StrictOctalLiteral);
	        }
	        return markerApply(marker, delegate.createTemplateElement({ raw: token.value.raw, cooked: token.value.cooked }, token.tail));
	    }

	    function parseTemplateLiteral() {
	        var quasi, quasis, expressions, marker = markerCreate();

	        quasi = parseTemplateElement({ head: true });
	        quasis = [ quasi ];
	        expressions = [];

	        while (!quasi.tail) {
	            expressions.push(parseExpression());
	            quasi = parseTemplateElement({ head: false });
	            quasis.push(quasi);
	        }

	        return markerApply(marker, delegate.createTemplateLiteral(quasis, expressions));
	    }

	    // 11.1.6 The Grouping Operator

	    function parseGroupExpression() {
	        var expr, marker, typeAnnotation;

	        expect('(');

	        ++state.parenthesizedCount;

	        marker = markerCreate();

	        expr = parseExpression();

	        if (match(':')) {
	            typeAnnotation = parseTypeAnnotation();
	            expr = markerApply(marker, delegate.createTypeCast(
	                expr,
	                typeAnnotation
	            ));
	        }

	        expect(')');

	        return expr;
	    }

	    function matchAsyncFuncExprOrDecl() {
	        var token;

	        if (matchAsync()) {
	            token = lookahead2();
	            if (token.type === Token.Keyword && token.value === 'function') {
	                return true;
	            }
	        }

	        return false;
	    }

	    // 11.1 Primary Expressions

	    function parsePrimaryExpression() {
	        var marker, type, token, expr;

	        type = lookahead.type;

	        if (type === Token.Identifier) {
	            marker = markerCreate();
	            return markerApply(marker, delegate.createIdentifier(lex().value));
	        }

	        if (type === Token.StringLiteral || type === Token.NumericLiteral) {
	            if (strict && lookahead.octal) {
	                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
	            }
	            marker = markerCreate();
	            return markerApply(marker, delegate.createLiteral(lex()));
	        }

	        if (type === Token.Keyword) {
	            if (matchKeyword('this')) {
	                marker = markerCreate();
	                lex();
	                return markerApply(marker, delegate.createThisExpression());
	            }

	            if (matchKeyword('function')) {
	                return parseFunctionExpression();
	            }

	            if (matchKeyword('class')) {
	                return parseClassExpression();
	            }

	            if (matchKeyword('super')) {
	                marker = markerCreate();
	                lex();
	                return markerApply(marker, delegate.createIdentifier('super'));
	            }
	        }

	        if (type === Token.BooleanLiteral) {
	            marker = markerCreate();
	            token = lex();
	            token.value = (token.value === 'true');
	            return markerApply(marker, delegate.createLiteral(token));
	        }

	        if (type === Token.NullLiteral) {
	            marker = markerCreate();
	            token = lex();
	            token.value = null;
	            return markerApply(marker, delegate.createLiteral(token));
	        }

	        if (match('[')) {
	            return parseArrayInitialiser();
	        }

	        if (match('{')) {
	            return parseObjectInitialiser();
	        }

	        if (match('(')) {
	            return parseGroupExpression();
	        }

	        if (match('/') || match('/=')) {
	            marker = markerCreate();
	            expr = delegate.createLiteral(scanRegExp());
	            peek();
	            return markerApply(marker, expr);
	        }

	        if (type === Token.Template) {
	            return parseTemplateLiteral();
	        }

	        if (match('<')) {
	            return parseJSXElement();
	        }

	        throwUnexpected(lex());
	    }

	    // 11.2 Left-Hand-Side Expressions

	    function parseArguments() {
	        var args = [], arg;

	        expect('(');

	        if (!match(')')) {
	            while (index < length) {
	                arg = parseSpreadOrAssignmentExpression();
	                args.push(arg);

	                if (match(')')) {
	                    break;
	                } else if (arg.type === Syntax.SpreadElement) {
	                    throwError({}, Messages.ElementAfterSpreadElement);
	                }

	                expect(',');
	            }
	        }

	        expect(')');

	        return args;
	    }

	    function parseSpreadOrAssignmentExpression() {
	        if (match('...')) {
	            var marker = markerCreate();
	            lex();
	            return markerApply(marker, delegate.createSpreadElement(parseAssignmentExpression()));
	        }
	        return parseAssignmentExpression();
	    }

	    function parseNonComputedProperty() {
	        var marker = markerCreate(),
	            token = lex();

	        if (!isIdentifierName(token)) {
	            throwUnexpected(token);
	        }

	        return markerApply(marker, delegate.createIdentifier(token.value));
	    }

	    function parseNonComputedMember() {
	        expect('.');

	        return parseNonComputedProperty();
	    }

	    function parseComputedMember() {
	        var expr;

	        expect('[');

	        expr = parseExpression();

	        expect(']');

	        return expr;
	    }

	    function parseNewExpression() {
	        var callee, args, marker = markerCreate();

	        expectKeyword('new');
	        callee = parseLeftHandSideExpression();
	        args = match('(') ? parseArguments() : [];

	        return markerApply(marker, delegate.createNewExpression(callee, args));
	    }

	    function parseLeftHandSideExpressionAllowCall() {
	        var expr, args, marker = markerCreate();

	        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

	        while (match('.') || match('[') || match('(') || lookahead.type === Token.Template) {
	            if (match('(')) {
	                args = parseArguments();
	                expr = markerApply(marker, delegate.createCallExpression(expr, args));
	            } else if (match('[')) {
	                expr = markerApply(marker, delegate.createMemberExpression('[', expr, parseComputedMember()));
	            } else if (match('.')) {
	                expr = markerApply(marker, delegate.createMemberExpression('.', expr, parseNonComputedMember()));
	            } else {
	                expr = markerApply(marker, delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral()));
	            }
	        }

	        return expr;
	    }

	    function parseLeftHandSideExpression() {
	        var expr, marker = markerCreate();

	        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

	        while (match('.') || match('[') || lookahead.type === Token.Template) {
	            if (match('[')) {
	                expr = markerApply(marker, delegate.createMemberExpression('[', expr, parseComputedMember()));
	            } else if (match('.')) {
	                expr = markerApply(marker, delegate.createMemberExpression('.', expr, parseNonComputedMember()));
	            } else {
	                expr = markerApply(marker, delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral()));
	            }
	        }

	        return expr;
	    }

	    // 11.3 Postfix Expressions

	    function parsePostfixExpression() {
	        var marker = markerCreate(),
	            expr = parseLeftHandSideExpressionAllowCall(),
	            token;

	        if (lookahead.type !== Token.Punctuator) {
	            return expr;
	        }

	        if ((match('++') || match('--')) && !peekLineTerminator()) {
	            // 11.3.1, 11.3.2
	            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
	                throwErrorTolerant({}, Messages.StrictLHSPostfix);
	            }

	            if (!isLeftHandSide(expr)) {
	                throwError({}, Messages.InvalidLHSInAssignment);
	            }

	            token = lex();
	            expr = markerApply(marker, delegate.createPostfixExpression(token.value, expr));
	        }

	        return expr;
	    }

	    // 11.4 Unary Operators

	    function parseUnaryExpression() {
	        var marker, token, expr;

	        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
	            return parsePostfixExpression();
	        }

	        if (match('++') || match('--')) {
	            marker = markerCreate();
	            token = lex();
	            expr = parseUnaryExpression();
	            // 11.4.4, 11.4.5
	            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
	                throwErrorTolerant({}, Messages.StrictLHSPrefix);
	            }

	            if (!isLeftHandSide(expr)) {
	                throwError({}, Messages.InvalidLHSInAssignment);
	            }

	            return markerApply(marker, delegate.createUnaryExpression(token.value, expr));
	        }

	        if (match('+') || match('-') || match('~') || match('!')) {
	            marker = markerCreate();
	            token = lex();
	            expr = parseUnaryExpression();
	            return markerApply(marker, delegate.createUnaryExpression(token.value, expr));
	        }

	        if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
	            marker = markerCreate();
	            token = lex();
	            expr = parseUnaryExpression();
	            expr = markerApply(marker, delegate.createUnaryExpression(token.value, expr));
	            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
	                throwErrorTolerant({}, Messages.StrictDelete);
	            }
	            return expr;
	        }

	        return parsePostfixExpression();
	    }

	    function binaryPrecedence(token, allowIn) {
	        var prec = 0;

	        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
	            return 0;
	        }

	        switch (token.value) {
	        case '||':
	            prec = 1;
	            break;

	        case '&&':
	            prec = 2;
	            break;

	        case '|':
	            prec = 3;
	            break;

	        case '^':
	            prec = 4;
	            break;

	        case '&':
	            prec = 5;
	            break;

	        case '==':
	        case '!=':
	        case '===':
	        case '!==':
	            prec = 6;
	            break;

	        case '<':
	        case '>':
	        case '<=':
	        case '>=':
	        case 'instanceof':
	            prec = 7;
	            break;

	        case 'in':
	            prec = allowIn ? 7 : 0;
	            break;

	        case '<<':
	        case '>>':
	        case '>>>':
	            prec = 8;
	            break;

	        case '+':
	        case '-':
	            prec = 9;
	            break;

	        case '*':
	        case '/':
	        case '%':
	            prec = 11;
	            break;

	        default:
	            break;
	        }

	        return prec;
	    }

	    // 11.5 Multiplicative Operators
	    // 11.6 Additive Operators
	    // 11.7 Bitwise Shift Operators
	    // 11.8 Relational Operators
	    // 11.9 Equality Operators
	    // 11.10 Binary Bitwise Operators
	    // 11.11 Binary Logical Operators

	    function parseBinaryExpression() {
	        var expr, token, prec, previousAllowIn, stack, right, operator, left, i,
	            marker, markers;

	        previousAllowIn = state.allowIn;
	        state.allowIn = true;

	        marker = markerCreate();
	        left = parseUnaryExpression();

	        token = lookahead;
	        prec = binaryPrecedence(token, previousAllowIn);
	        if (prec === 0) {
	            return left;
	        }
	        token.prec = prec;
	        lex();

	        markers = [marker, markerCreate()];
	        right = parseUnaryExpression();

	        stack = [left, token, right];

	        while ((prec = binaryPrecedence(lookahead, previousAllowIn)) > 0) {

	            // Reduce: make a binary expression from the three topmost entries.
	            while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
	                right = stack.pop();
	                operator = stack.pop().value;
	                left = stack.pop();
	                expr = delegate.createBinaryExpression(operator, left, right);
	                markers.pop();
	                marker = markers.pop();
	                markerApply(marker, expr);
	                stack.push(expr);
	                markers.push(marker);
	            }

	            // Shift.
	            token = lex();
	            token.prec = prec;
	            stack.push(token);
	            markers.push(markerCreate());
	            expr = parseUnaryExpression();
	            stack.push(expr);
	        }

	        state.allowIn = previousAllowIn;

	        // Final reduce to clean-up the stack.
	        i = stack.length - 1;
	        expr = stack[i];
	        markers.pop();
	        while (i > 1) {
	            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
	            i -= 2;
	            marker = markers.pop();
	            markerApply(marker, expr);
	        }

	        return expr;
	    }


	    // 11.12 Conditional Operator

	    function parseConditionalExpression() {
	        var expr, previousAllowIn, consequent, alternate, marker = markerCreate();
	        expr = parseBinaryExpression();

	        if (match('?')) {
	            lex();
	            previousAllowIn = state.allowIn;
	            state.allowIn = true;
	            consequent = parseAssignmentExpression();
	            state.allowIn = previousAllowIn;
	            expect(':');
	            alternate = parseAssignmentExpression();

	            expr = markerApply(marker, delegate.createConditionalExpression(expr, consequent, alternate));
	        }

	        return expr;
	    }

	    // 11.13 Assignment Operators

	    // 12.14.5 AssignmentPattern

	    function reinterpretAsAssignmentBindingPattern(expr) {
	        var i, len, property, element;

	        if (expr.type === Syntax.ObjectExpression) {
	            expr.type = Syntax.ObjectPattern;
	            for (i = 0, len = expr.properties.length; i < len; i += 1) {
	                property = expr.properties[i];
	                if (property.type === Syntax.SpreadProperty) {
	                    if (i < len - 1) {
	                        throwError({}, Messages.PropertyAfterSpreadProperty);
	                    }
	                    reinterpretAsAssignmentBindingPattern(property.argument);
	                } else {
	                    if (property.kind !== 'init') {
	                        throwError({}, Messages.InvalidLHSInAssignment);
	                    }
	                    reinterpretAsAssignmentBindingPattern(property.value);
	                }
	            }
	        } else if (expr.type === Syntax.ArrayExpression) {
	            expr.type = Syntax.ArrayPattern;
	            for (i = 0, len = expr.elements.length; i < len; i += 1) {
	                element = expr.elements[i];
	                /* istanbul ignore else */
	                if (element) {
	                    reinterpretAsAssignmentBindingPattern(element);
	                }
	            }
	        } else if (expr.type === Syntax.Identifier) {
	            if (isRestrictedWord(expr.name)) {
	                throwError({}, Messages.InvalidLHSInAssignment);
	            }
	        } else if (expr.type === Syntax.SpreadElement) {
	            reinterpretAsAssignmentBindingPattern(expr.argument);
	            if (expr.argument.type === Syntax.ObjectPattern) {
	                throwError({}, Messages.ObjectPatternAsSpread);
	            }
	        } else {
	            /* istanbul ignore else */
	            if (expr.type !== Syntax.MemberExpression && expr.type !== Syntax.CallExpression && expr.type !== Syntax.NewExpression) {
	                throwError({}, Messages.InvalidLHSInAssignment);
	            }
	        }
	    }

	    // 13.2.3 BindingPattern

	    function reinterpretAsDestructuredParameter(options, expr) {
	        var i, len, property, element;

	        if (expr.type === Syntax.ObjectExpression) {
	            expr.type = Syntax.ObjectPattern;
	            for (i = 0, len = expr.properties.length; i < len; i += 1) {
	                property = expr.properties[i];
	                if (property.type === Syntax.SpreadProperty) {
	                    if (i < len - 1) {
	                        throwError({}, Messages.PropertyAfterSpreadProperty);
	                    }
	                    reinterpretAsDestructuredParameter(options, property.argument);
	                } else {
	                    if (property.kind !== 'init') {
	                        throwError({}, Messages.InvalidLHSInFormalsList);
	                    }
	                    reinterpretAsDestructuredParameter(options, property.value);
	                }
	            }
	        } else if (expr.type === Syntax.ArrayExpression) {
	            expr.type = Syntax.ArrayPattern;
	            for (i = 0, len = expr.elements.length; i < len; i += 1) {
	                element = expr.elements[i];
	                if (element) {
	                    reinterpretAsDestructuredParameter(options, element);
	                }
	            }
	        } else if (expr.type === Syntax.Identifier) {
	            validateParam(options, expr, expr.name);
	        } else if (expr.type === Syntax.SpreadElement) {
	            // BindingRestElement only allows BindingIdentifier
	            if (expr.argument.type !== Syntax.Identifier) {
	                throwError({}, Messages.InvalidLHSInFormalsList);
	            }
	            validateParam(options, expr.argument, expr.argument.name);
	        } else {
	            throwError({}, Messages.InvalidLHSInFormalsList);
	        }
	    }

	    function reinterpretAsCoverFormalsList(expressions) {
	        var i, len, param, params, defaults, defaultCount, options, rest;

	        params = [];
	        defaults = [];
	        defaultCount = 0;
	        rest = null;
	        options = {
	            paramSet: new StringMap()
	        };

	        for (i = 0, len = expressions.length; i < len; i += 1) {
	            param = expressions[i];
	            if (param.type === Syntax.Identifier) {
	                params.push(param);
	                defaults.push(null);
	                validateParam(options, param, param.name);
	            } else if (param.type === Syntax.ObjectExpression || param.type === Syntax.ArrayExpression) {
	                reinterpretAsDestructuredParameter(options, param);
	                params.push(param);
	                defaults.push(null);
	            } else if (param.type === Syntax.SpreadElement) {
	                assert(i === len - 1, 'It is guaranteed that SpreadElement is last element by parseExpression');
	                if (param.argument.type !== Syntax.Identifier) {
	                    throwError({}, Messages.InvalidLHSInFormalsList);
	                }
	                reinterpretAsDestructuredParameter(options, param.argument);
	                rest = param.argument;
	            } else if (param.type === Syntax.AssignmentExpression) {
	                params.push(param.left);
	                defaults.push(param.right);
	                ++defaultCount;
	                validateParam(options, param.left, param.left.name);
	            } else {
	                return null;
	            }
	        }

	        if (options.message === Messages.StrictParamDupe) {
	            throwError(
	                strict ? options.stricted : options.firstRestricted,
	                options.message
	            );
	        }

	        if (defaultCount === 0) {
	            defaults = [];
	        }

	        return {
	            params: params,
	            defaults: defaults,
	            rest: rest,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    }

	    function parseArrowFunctionExpression(options, marker) {
	        var previousStrict, previousYieldAllowed, previousAwaitAllowed, body;

	        expect('=>');

	        previousStrict = strict;
	        previousYieldAllowed = state.yieldAllowed;
	        state.yieldAllowed = false;
	        previousAwaitAllowed = state.awaitAllowed;
	        state.awaitAllowed = !!options.async;
	        body = parseConciseBody();

	        if (strict && options.firstRestricted) {
	            throwError(options.firstRestricted, options.message);
	        }
	        if (strict && options.stricted) {
	            throwErrorTolerant(options.stricted, options.message);
	        }

	        strict = previousStrict;
	        state.yieldAllowed = previousYieldAllowed;
	        state.awaitAllowed = previousAwaitAllowed;

	        return markerApply(marker, delegate.createArrowFunctionExpression(
	            options.params,
	            options.defaults,
	            body,
	            options.rest,
	            body.type !== Syntax.BlockStatement,
	            !!options.async
	        ));
	    }

	    function parseAssignmentExpression() {
	        var marker, expr, token, params, oldParenthesizedCount,
	            startsWithParen = false, backtrackToken = lookahead,
	            possiblyAsync = false;

	        if (matchYield()) {
	            return parseYieldExpression();
	        }

	        if (matchAwait()) {
	            return parseAwaitExpression();
	        }

	        oldParenthesizedCount = state.parenthesizedCount;

	        marker = markerCreate();

	        if (matchAsyncFuncExprOrDecl()) {
	            return parseFunctionExpression();
	        }

	        if (matchAsync()) {
	            // We can't be completely sure that this 'async' token is
	            // actually a contextual keyword modifying a function
	            // expression, so we might have to un-lex() it later by
	            // calling rewind(backtrackToken).
	            possiblyAsync = true;
	            lex();
	        }

	        if (match('(')) {
	            token = lookahead2();
	            if ((token.type === Token.Punctuator && token.value === ')') || token.value === '...') {
	                params = parseParams();
	                if (!match('=>')) {
	                    throwUnexpected(lex());
	                }
	                params.async = possiblyAsync;
	                return parseArrowFunctionExpression(params, marker);
	            }
	            startsWithParen = true;
	        }

	        token = lookahead;

	        // If the 'async' keyword is not followed by a '(' character or an
	        // identifier, then it can't be an arrow function modifier, and we
	        // should interpret it as a normal identifer.
	        if (possiblyAsync && !match('(') && token.type !== Token.Identifier) {
	            possiblyAsync = false;
	            rewind(backtrackToken);
	        }

	        expr = parseConditionalExpression();

	        if (match('=>') &&
	                (state.parenthesizedCount === oldParenthesizedCount ||
	                state.parenthesizedCount === (oldParenthesizedCount + 1))) {
	            if (expr.type === Syntax.Identifier) {
	                params = reinterpretAsCoverFormalsList([ expr ]);
	            } else if (expr.type === Syntax.AssignmentExpression ||
	                    expr.type === Syntax.ArrayExpression ||
	                    expr.type === Syntax.ObjectExpression) {
	                if (!startsWithParen) {
	                    throwUnexpected(lex());
	                }
	                params = reinterpretAsCoverFormalsList([ expr ]);
	            } else if (expr.type === Syntax.SequenceExpression) {
	                params = reinterpretAsCoverFormalsList(expr.expressions);
	            }
	            if (params) {
	                params.async = possiblyAsync;
	                return parseArrowFunctionExpression(params, marker);
	            }
	        }

	        // If we haven't returned by now, then the 'async' keyword was not
	        // a function modifier, and we should rewind and interpret it as a
	        // normal identifier.
	        if (possiblyAsync) {
	            possiblyAsync = false;
	            rewind(backtrackToken);
	            expr = parseConditionalExpression();
	        }

	        if (matchAssign()) {
	            // 11.13.1
	            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
	                throwErrorTolerant(token, Messages.StrictLHSAssignment);
	            }

	            // ES.next draf 11.13 Runtime Semantics step 1
	            if (match('=') && (expr.type === Syntax.ObjectExpression || expr.type === Syntax.ArrayExpression)) {
	                reinterpretAsAssignmentBindingPattern(expr);
	            } else if (!isLeftHandSide(expr)) {
	                throwError({}, Messages.InvalidLHSInAssignment);
	            }

	            expr = markerApply(marker, delegate.createAssignmentExpression(lex().value, expr, parseAssignmentExpression()));
	        }

	        return expr;
	    }

	    // 11.14 Comma Operator

	    function parseExpression() {
	        var marker, expr, expressions, sequence, spreadFound;

	        marker = markerCreate();
	        expr = parseAssignmentExpression();
	        expressions = [ expr ];

	        if (match(',')) {
	            while (index < length) {
	                if (!match(',')) {
	                    break;
	                }

	                lex();
	                expr = parseSpreadOrAssignmentExpression();
	                expressions.push(expr);

	                if (expr.type === Syntax.SpreadElement) {
	                    spreadFound = true;
	                    if (!match(')')) {
	                        throwError({}, Messages.ElementAfterSpreadElement);
	                    }
	                    break;
	                }
	            }

	            sequence = markerApply(marker, delegate.createSequenceExpression(expressions));
	        }

	        if (spreadFound && lookahead2().value !== '=>') {
	            throwError({}, Messages.IllegalSpread);
	        }

	        return sequence || expr;
	    }

	    // 12.1 Block

	    function parseStatementList() {
	        var list = [],
	            statement;

	        while (index < length) {
	            if (match('}')) {
	                break;
	            }
	            statement = parseSourceElement();
	            if (typeof statement === 'undefined') {
	                break;
	            }
	            list.push(statement);
	        }

	        return list;
	    }

	    function parseBlock() {
	        var block, marker = markerCreate();

	        expect('{');

	        block = parseStatementList();

	        expect('}');

	        return markerApply(marker, delegate.createBlockStatement(block));
	    }

	    // 12.2 Variable Statement

	    function parseTypeParameterDeclaration() {
	        var marker = markerCreate(), paramTypes = [];

	        expect('<');
	        while (!match('>')) {
	            paramTypes.push(parseTypeAnnotatableIdentifier());
	            if (!match('>')) {
	                expect(',');
	            }
	        }
	        expect('>');

	        return markerApply(marker, delegate.createTypeParameterDeclaration(
	            paramTypes
	        ));
	    }

	    function parseTypeParameterInstantiation() {
	        var marker = markerCreate(), oldInType = state.inType, paramTypes = [];

	        state.inType = true;

	        expect('<');
	        while (!match('>')) {
	            paramTypes.push(parseType());
	            if (!match('>')) {
	                expect(',');
	            }
	        }
	        expect('>');

	        state.inType = oldInType;

	        return markerApply(marker, delegate.createTypeParameterInstantiation(
	            paramTypes
	        ));
	    }

	    function parseObjectTypeIndexer(marker, isStatic) {
	        var id, key, value;

	        expect('[');
	        id = parseObjectPropertyKey();
	        expect(':');
	        key = parseType();
	        expect(']');
	        expect(':');
	        value = parseType();

	        return markerApply(marker, delegate.createObjectTypeIndexer(
	            id,
	            key,
	            value,
	            isStatic
	        ));
	    }

	    function parseObjectTypeMethodish(marker) {
	        var params = [], rest = null, returnType, typeParameters = null;
	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }

	        expect('(');
	        while (lookahead.type === Token.Identifier) {
	            params.push(parseFunctionTypeParam());
	            if (!match(')')) {
	                expect(',');
	            }
	        }

	        if (match('...')) {
	            lex();
	            rest = parseFunctionTypeParam();
	        }
	        expect(')');
	        expect(':');
	        returnType = parseType();

	        return markerApply(marker, delegate.createFunctionTypeAnnotation(
	            params,
	            returnType,
	            rest,
	            typeParameters
	        ));
	    }

	    function parseObjectTypeMethod(marker, isStatic, key) {
	        var optional = false, value;
	        value = parseObjectTypeMethodish(marker);

	        return markerApply(marker, delegate.createObjectTypeProperty(
	            key,
	            value,
	            optional,
	            isStatic
	        ));
	    }

	    function parseObjectTypeCallProperty(marker, isStatic) {
	        var valueMarker = markerCreate();
	        return markerApply(marker, delegate.createObjectTypeCallProperty(
	            parseObjectTypeMethodish(valueMarker),
	            isStatic
	        ));
	    }

	    function parseObjectType(allowStatic) {
	        var callProperties = [], indexers = [], marker, optional = false,
	            properties = [], propertyKey, propertyTypeAnnotation,
	            token, isStatic, matchStatic;

	        expect('{');

	        while (!match('}')) {
	            marker = markerCreate();
	            matchStatic =
	                   strict
	                   ? matchKeyword('static')
	                   : matchContextualKeyword('static');

	            if (allowStatic && matchStatic) {
	                token = lex();
	                isStatic = true;
	            }

	            if (match('[')) {
	                indexers.push(parseObjectTypeIndexer(marker, isStatic));
	            } else if (match('(') || match('<')) {
	                callProperties.push(parseObjectTypeCallProperty(marker, allowStatic));
	            } else {
	                if (isStatic && match(':')) {
	                    propertyKey = markerApply(marker, delegate.createIdentifier(token));
	                    throwErrorTolerant(token, Messages.StrictReservedWord);
	                } else {
	                    propertyKey = parseObjectPropertyKey();
	                }
	                if (match('<') || match('(')) {
	                    // This is a method property
	                    properties.push(parseObjectTypeMethod(marker, isStatic, propertyKey));
	                } else {
	                    if (match('?')) {
	                        lex();
	                        optional = true;
	                    }
	                    expect(':');
	                    propertyTypeAnnotation = parseType();
	                    properties.push(markerApply(marker, delegate.createObjectTypeProperty(
	                        propertyKey,
	                        propertyTypeAnnotation,
	                        optional,
	                        isStatic
	                    )));
	                }
	            }

	            if (match(';')) {
	                lex();
	            } else if (!match('}')) {
	                throwUnexpected(lookahead);
	            }
	        }

	        expect('}');

	        return delegate.createObjectTypeAnnotation(
	            properties,
	            indexers,
	            callProperties
	        );
	    }

	    function parseGenericType() {
	        var marker = markerCreate(),
	            typeParameters = null, typeIdentifier;

	        typeIdentifier = parseVariableIdentifier();

	        while (match('.')) {
	            expect('.');
	            typeIdentifier = markerApply(marker, delegate.createQualifiedTypeIdentifier(
	                typeIdentifier,
	                parseVariableIdentifier()
	            ));
	        }

	        if (match('<')) {
	            typeParameters = parseTypeParameterInstantiation();
	        }

	        return markerApply(marker, delegate.createGenericTypeAnnotation(
	            typeIdentifier,
	            typeParameters
	        ));
	    }

	    function parseVoidType() {
	        var marker = markerCreate();
	        expectKeyword('void');
	        return markerApply(marker, delegate.createVoidTypeAnnotation());
	    }

	    function parseTypeofType() {
	        var argument, marker = markerCreate();
	        expectKeyword('typeof');
	        argument = parsePrimaryType();
	        return markerApply(marker, delegate.createTypeofTypeAnnotation(
	            argument
	        ));
	    }

	    function parseTupleType() {
	        var marker = markerCreate(), types = [];
	        expect('[');
	        // We allow trailing commas
	        while (index < length && !match(']')) {
	            types.push(parseType());
	            if (match(']')) {
	                break;
	            }
	            expect(',');
	        }
	        expect(']');
	        return markerApply(marker, delegate.createTupleTypeAnnotation(
	            types
	        ));
	    }

	    function parseFunctionTypeParam() {
	        var marker = markerCreate(), name, optional = false, typeAnnotation;
	        name = parseVariableIdentifier();
	        if (match('?')) {
	            lex();
	            optional = true;
	        }
	        expect(':');
	        typeAnnotation = parseType();
	        return markerApply(marker, delegate.createFunctionTypeParam(
	            name,
	            typeAnnotation,
	            optional
	        ));
	    }

	    function parseFunctionTypeParams() {
	        var ret = { params: [], rest: null };
	        while (lookahead.type === Token.Identifier) {
	            ret.params.push(parseFunctionTypeParam());
	            if (!match(')')) {
	                expect(',');
	            }
	        }

	        if (match('...')) {
	            lex();
	            ret.rest = parseFunctionTypeParam();
	        }
	        return ret;
	    }

	    // The parsing of types roughly parallels the parsing of expressions, and
	    // primary types are kind of like primary expressions...they're the
	    // primitives with which other types are constructed.
	    function parsePrimaryType() {
	        var params = null, returnType = null,
	            marker = markerCreate(), rest = null, tmp,
	            typeParameters, token, type, isGroupedType = false;

	        switch (lookahead.type) {
	        case Token.Identifier:
	            switch (lookahead.value) {
	            case 'any':
	                lex();
	                return markerApply(marker, delegate.createAnyTypeAnnotation());
	            case 'bool':  // fallthrough
	            case 'boolean':
	                lex();
	                return markerApply(marker, delegate.createBooleanTypeAnnotation());
	            case 'number':
	                lex();
	                return markerApply(marker, delegate.createNumberTypeAnnotation());
	            case 'string':
	                lex();
	                return markerApply(marker, delegate.createStringTypeAnnotation());
	            }
	            return markerApply(marker, parseGenericType());
	        case Token.Punctuator:
	            switch (lookahead.value) {
	            case '{':
	                return markerApply(marker, parseObjectType());
	            case '[':
	                return parseTupleType();
	            case '<':
	                typeParameters = parseTypeParameterDeclaration();
	                expect('(');
	                tmp = parseFunctionTypeParams();
	                params = tmp.params;
	                rest = tmp.rest;
	                expect(')');

	                expect('=>');

	                returnType = parseType();

	                return markerApply(marker, delegate.createFunctionTypeAnnotation(
	                    params,
	                    returnType,
	                    rest,
	                    typeParameters
	                ));
	            case '(':
	                lex();
	                // Check to see if this is actually a grouped type
	                if (!match(')') && !match('...')) {
	                    if (lookahead.type === Token.Identifier) {
	                        token = lookahead2();
	                        isGroupedType = token.value !== '?' && token.value !== ':';
	                    } else {
	                        isGroupedType = true;
	                    }
	                }

	                if (isGroupedType) {
	                    type = parseType();
	                    expect(')');

	                    // If we see a => next then someone was probably confused about
	                    // function types, so we can provide a better error message
	                    if (match('=>')) {
	                        throwError({}, Messages.ConfusedAboutFunctionType);
	                    }

	                    return type;
	                }

	                tmp = parseFunctionTypeParams();
	                params = tmp.params;
	                rest = tmp.rest;

	                expect(')');

	                expect('=>');

	                returnType = parseType();

	                return markerApply(marker, delegate.createFunctionTypeAnnotation(
	                    params,
	                    returnType,
	                    rest,
	                    null /* typeParameters */
	                ));
	            }
	            break;
	        case Token.Keyword:
	            switch (lookahead.value) {
	            case 'void':
	                return markerApply(marker, parseVoidType());
	            case 'typeof':
	                return markerApply(marker, parseTypeofType());
	            }
	            break;
	        case Token.StringLiteral:
	            token = lex();
	            if (token.octal) {
	                throwError(token, Messages.StrictOctalLiteral);
	            }
	            return markerApply(marker, delegate.createStringLiteralTypeAnnotation(
	                token
	            ));
	        }

	        throwUnexpected(lookahead);
	    }

	    function parsePostfixType() {
	        var marker = markerCreate(), t = parsePrimaryType();
	        if (match('[')) {
	            expect('[');
	            expect(']');
	            return markerApply(marker, delegate.createArrayTypeAnnotation(t));
	        }
	        return t;
	    }

	    function parsePrefixType() {
	        var marker = markerCreate();
	        if (match('?')) {
	            lex();
	            return markerApply(marker, delegate.createNullableTypeAnnotation(
	                parsePrefixType()
	            ));
	        }
	        return parsePostfixType();
	    }


	    function parseIntersectionType() {
	        var marker = markerCreate(), type, types;
	        type = parsePrefixType();
	        types = [type];
	        while (match('&')) {
	            lex();
	            types.push(parsePrefixType());
	        }

	        return types.length === 1 ?
	                type :
	                markerApply(marker, delegate.createIntersectionTypeAnnotation(
	                    types
	                ));
	    }

	    function parseUnionType() {
	        var marker = markerCreate(), type, types;
	        type = parseIntersectionType();
	        types = [type];
	        while (match('|')) {
	            lex();
	            types.push(parseIntersectionType());
	        }
	        return types.length === 1 ?
	                type :
	                markerApply(marker, delegate.createUnionTypeAnnotation(
	                    types
	                ));
	    }

	    function parseType() {
	        var oldInType = state.inType, type;
	        state.inType = true;

	        type = parseUnionType();

	        state.inType = oldInType;
	        return type;
	    }

	    function parseTypeAnnotation() {
	        var marker = markerCreate(), type;

	        expect(':');
	        type = parseType();

	        return markerApply(marker, delegate.createTypeAnnotation(type));
	    }

	    function parseVariableIdentifier() {
	        var marker = markerCreate(),
	            token = lex();

	        if (token.type !== Token.Identifier) {
	            throwUnexpected(token);
	        }

	        return markerApply(marker, delegate.createIdentifier(token.value));
	    }

	    function parseTypeAnnotatableIdentifier(requireTypeAnnotation, canBeOptionalParam) {
	        var marker = markerCreate(),
	            ident = parseVariableIdentifier(),
	            isOptionalParam = false;

	        if (canBeOptionalParam && match('?')) {
	            expect('?');
	            isOptionalParam = true;
	        }

	        if (requireTypeAnnotation || match(':')) {
	            ident.typeAnnotation = parseTypeAnnotation();
	            ident = markerApply(marker, ident);
	        }

	        if (isOptionalParam) {
	            ident.optional = true;
	            ident = markerApply(marker, ident);
	        }

	        return ident;
	    }

	    function parseVariableDeclaration(kind) {
	        var id,
	            marker = markerCreate(),
	            init = null,
	            typeAnnotationMarker = markerCreate();
	        if (match('{')) {
	            id = parseObjectInitialiser();
	            reinterpretAsAssignmentBindingPattern(id);
	            if (match(':')) {
	                id.typeAnnotation = parseTypeAnnotation();
	                markerApply(typeAnnotationMarker, id);
	            }
	        } else if (match('[')) {
	            id = parseArrayInitialiser();
	            reinterpretAsAssignmentBindingPattern(id);
	            if (match(':')) {
	                id.typeAnnotation = parseTypeAnnotation();
	                markerApply(typeAnnotationMarker, id);
	            }
	        } else {
	            /* istanbul ignore next */
	            id = state.allowKeyword ? parseNonComputedProperty() : parseTypeAnnotatableIdentifier();
	            // 12.2.1
	            if (strict && isRestrictedWord(id.name)) {
	                throwErrorTolerant({}, Messages.StrictVarName);
	            }
	        }

	        if (kind === 'const') {
	            if (!match('=')) {
	                throwError({}, Messages.NoUninitializedConst);
	            }
	            expect('=');
	            init = parseAssignmentExpression();
	        } else if (match('=')) {
	            lex();
	            init = parseAssignmentExpression();
	        }

	        return markerApply(marker, delegate.createVariableDeclarator(id, init));
	    }

	    function parseVariableDeclarationList(kind) {
	        var list = [];

	        do {
	            list.push(parseVariableDeclaration(kind));
	            if (!match(',')) {
	                break;
	            }
	            lex();
	        } while (index < length);

	        return list;
	    }

	    function parseVariableStatement() {
	        var declarations, marker = markerCreate();

	        expectKeyword('var');

	        declarations = parseVariableDeclarationList();

	        consumeSemicolon();

	        return markerApply(marker, delegate.createVariableDeclaration(declarations, 'var'));
	    }

	    // kind may be `const` or `let`
	    // Both are experimental and not in the specification yet.
	    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
	    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
	    function parseConstLetDeclaration(kind) {
	        var declarations, marker = markerCreate();

	        expectKeyword(kind);

	        declarations = parseVariableDeclarationList(kind);

	        consumeSemicolon();

	        return markerApply(marker, delegate.createVariableDeclaration(declarations, kind));
	    }

	    // people.mozilla.org/~jorendorff/es6-draft.html

	    function parseModuleSpecifier() {
	        var marker = markerCreate(),
	            specifier;

	        if (lookahead.type !== Token.StringLiteral) {
	            throwError({}, Messages.InvalidModuleSpecifier);
	        }
	        specifier = delegate.createModuleSpecifier(lookahead);
	        lex();
	        return markerApply(marker, specifier);
	    }

	    function parseExportBatchSpecifier() {
	        var marker = markerCreate();
	        expect('*');
	        return markerApply(marker, delegate.createExportBatchSpecifier());
	    }

	    function parseExportSpecifier() {
	        var id, name = null, marker = markerCreate(), from;
	        if (matchKeyword('default')) {
	            lex();
	            id = markerApply(marker, delegate.createIdentifier('default'));
	            // export {default} from "something";
	        } else {
	            id = parseVariableIdentifier();
	        }
	        if (matchContextualKeyword('as')) {
	            lex();
	            name = parseNonComputedProperty();
	        }

	        return markerApply(marker, delegate.createExportSpecifier(id, name));
	    }

	    function parseExportDeclaration() {
	        var declaration = null,
	            possibleIdentifierToken, sourceElement,
	            isExportFromIdentifier,
	            src = null, specifiers = [],
	            marker = markerCreate();

	        expectKeyword('export');

	        if (matchKeyword('default')) {
	            // covers:
	            // export default ...
	            lex();
	            if (matchKeyword('function') || matchKeyword('class')) {
	                possibleIdentifierToken = lookahead2();
	                if (isIdentifierName(possibleIdentifierToken)) {
	                    // covers:
	                    // export default function foo () {}
	                    // export default class foo {}
	                    sourceElement = parseSourceElement();
	                    return markerApply(marker, delegate.createExportDeclaration(true, sourceElement, [sourceElement.id], null));
	                }
	                // covers:
	                // export default function () {}
	                // export default class {}
	                switch (lookahead.value) {
	                case 'class':
	                    return markerApply(marker, delegate.createExportDeclaration(true, parseClassExpression(), [], null));
	                case 'function':
	                    return markerApply(marker, delegate.createExportDeclaration(true, parseFunctionExpression(), [], null));
	                }
	            }

	            if (matchContextualKeyword('from')) {
	                throwError({}, Messages.UnexpectedToken, lookahead.value);
	            }

	            // covers:
	            // export default {};
	            // export default [];
	            if (match('{')) {
	                declaration = parseObjectInitialiser();
	            } else if (match('[')) {
	                declaration = parseArrayInitialiser();
	            } else {
	                declaration = parseAssignmentExpression();
	            }
	            consumeSemicolon();
	            return markerApply(marker, delegate.createExportDeclaration(true, declaration, [], null));
	        }

	        // non-default export
	        if (lookahead.type === Token.Keyword || matchContextualKeyword('type')) {
	            // covers:
	            // export var f = 1;
	            switch (lookahead.value) {
	            case 'type':
	            case 'let':
	            case 'const':
	            case 'var':
	            case 'class':
	            case 'function':
	                return markerApply(marker, delegate.createExportDeclaration(false, parseSourceElement(), specifiers, null));
	            }
	        }

	        if (match('*')) {
	            // covers:
	            // export * from "foo";
	            specifiers.push(parseExportBatchSpecifier());

	            if (!matchContextualKeyword('from')) {
	                throwError({}, lookahead.value ?
	                        Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
	            }
	            lex();
	            src = parseModuleSpecifier();
	            consumeSemicolon();

	            return markerApply(marker, delegate.createExportDeclaration(false, null, specifiers, src));
	        }

	        expect('{');
	        if (!match('}')) {
	            do {
	                isExportFromIdentifier = isExportFromIdentifier || matchKeyword('default');
	                specifiers.push(parseExportSpecifier());
	            } while (match(',') && lex());
	        }
	        expect('}');

	        if (matchContextualKeyword('from')) {
	            // covering:
	            // export {default} from "foo";
	            // export {foo} from "foo";
	            lex();
	            src = parseModuleSpecifier();
	            consumeSemicolon();
	        } else if (isExportFromIdentifier) {
	            // covering:
	            // export {default}; // missing fromClause
	            throwError({}, lookahead.value ?
	                    Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
	        } else {
	            // cover
	            // export {foo};
	            consumeSemicolon();
	        }
	        return markerApply(marker, delegate.createExportDeclaration(false, declaration, specifiers, src));
	    }


	    function parseImportSpecifier() {
	        // import {<foo as bar>} ...;
	        var id, name = null, marker = markerCreate();

	        id = parseNonComputedProperty();
	        if (matchContextualKeyword('as')) {
	            lex();
	            name = parseVariableIdentifier();
	        }

	        return markerApply(marker, delegate.createImportSpecifier(id, name));
	    }

	    function parseNamedImports() {
	        var specifiers = [];
	        // {foo, bar as bas}
	        expect('{');
	        if (!match('}')) {
	            do {
	                specifiers.push(parseImportSpecifier());
	            } while (match(',') && lex());
	        }
	        expect('}');
	        return specifiers;
	    }

	    function parseImportDefaultSpecifier() {
	        // import <foo> ...;
	        var id, marker = markerCreate();

	        id = parseNonComputedProperty();

	        return markerApply(marker, delegate.createImportDefaultSpecifier(id));
	    }

	    function parseImportNamespaceSpecifier() {
	        // import <* as foo> ...;
	        var id, marker = markerCreate();

	        expect('*');
	        if (!matchContextualKeyword('as')) {
	            throwError({}, Messages.NoAsAfterImportNamespace);
	        }
	        lex();
	        id = parseNonComputedProperty();

	        return markerApply(marker, delegate.createImportNamespaceSpecifier(id));
	    }

	    function parseImportDeclaration() {
	        var specifiers, src, marker = markerCreate(), isType = false, token2;

	        expectKeyword('import');

	        if (matchContextualKeyword('type')) {
	            token2 = lookahead2();
	            if ((token2.type === Token.Identifier && token2.value !== 'from') ||
	                    (token2.type === Token.Punctuator &&
	                        (token2.value === '{' || token2.value === '*'))) {
	                isType = true;
	                lex();
	            }
	        }

	        specifiers = [];

	        if (lookahead.type === Token.StringLiteral) {
	            // covers:
	            // import "foo";
	            src = parseModuleSpecifier();
	            consumeSemicolon();
	            return markerApply(marker, delegate.createImportDeclaration(specifiers, src, isType));
	        }

	        if (!matchKeyword('default') && isIdentifierName(lookahead)) {
	            // covers:
	            // import foo
	            // import foo, ...
	            specifiers.push(parseImportDefaultSpecifier());
	            if (match(',')) {
	                lex();
	            }
	        }
	        if (match('*')) {
	            // covers:
	            // import foo, * as foo
	            // import * as foo
	            specifiers.push(parseImportNamespaceSpecifier());
	        } else if (match('{')) {
	            // covers:
	            // import foo, {bar}
	            // import {bar}
	            specifiers = specifiers.concat(parseNamedImports());
	        }

	        if (!matchContextualKeyword('from')) {
	            throwError({}, lookahead.value ?
	                    Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
	        }
	        lex();
	        src = parseModuleSpecifier();
	        consumeSemicolon();

	        return markerApply(marker, delegate.createImportDeclaration(specifiers, src, isType));
	    }

	    // 12.3 Empty Statement

	    function parseEmptyStatement() {
	        var marker = markerCreate();
	        expect(';');
	        return markerApply(marker, delegate.createEmptyStatement());
	    }

	    // 12.4 Expression Statement

	    function parseExpressionStatement() {
	        var marker = markerCreate(), expr = parseExpression();
	        consumeSemicolon();
	        return markerApply(marker, delegate.createExpressionStatement(expr));
	    }

	    // 12.5 If statement

	    function parseIfStatement() {
	        var test, consequent, alternate, marker = markerCreate();

	        expectKeyword('if');

	        expect('(');

	        test = parseExpression();

	        expect(')');

	        consequent = parseStatement();

	        if (matchKeyword('else')) {
	            lex();
	            alternate = parseStatement();
	        } else {
	            alternate = null;
	        }

	        return markerApply(marker, delegate.createIfStatement(test, consequent, alternate));
	    }

	    // 12.6 Iteration Statements

	    function parseDoWhileStatement() {
	        var body, test, oldInIteration, marker = markerCreate();

	        expectKeyword('do');

	        oldInIteration = state.inIteration;
	        state.inIteration = true;

	        body = parseStatement();

	        state.inIteration = oldInIteration;

	        expectKeyword('while');

	        expect('(');

	        test = parseExpression();

	        expect(')');

	        if (match(';')) {
	            lex();
	        }

	        return markerApply(marker, delegate.createDoWhileStatement(body, test));
	    }

	    function parseWhileStatement() {
	        var test, body, oldInIteration, marker = markerCreate();

	        expectKeyword('while');

	        expect('(');

	        test = parseExpression();

	        expect(')');

	        oldInIteration = state.inIteration;
	        state.inIteration = true;

	        body = parseStatement();

	        state.inIteration = oldInIteration;

	        return markerApply(marker, delegate.createWhileStatement(test, body));
	    }

	    function parseForVariableDeclaration() {
	        var marker = markerCreate(),
	            token = lex(),
	            declarations = parseVariableDeclarationList();

	        return markerApply(marker, delegate.createVariableDeclaration(declarations, token.value));
	    }

	    function parseForStatement(opts) {
	        var init, test, update, left, right, body, operator, oldInIteration,
	            marker = markerCreate();
	        init = test = update = null;
	        expectKeyword('for');

	        // http://wiki.ecmascript.org/doku.php?id=proposals:iterators_and_generators&s=each
	        if (matchContextualKeyword('each')) {
	            throwError({}, Messages.EachNotAllowed);
	        }

	        expect('(');

	        if (match(';')) {
	            lex();
	        } else {
	            if (matchKeyword('var') || matchKeyword('let') || matchKeyword('const')) {
	                state.allowIn = false;
	                init = parseForVariableDeclaration();
	                state.allowIn = true;

	                if (init.declarations.length === 1) {
	                    if (matchKeyword('in') || matchContextualKeyword('of')) {
	                        operator = lookahead;
	                        if (!((operator.value === 'in' || init.kind !== 'var') && init.declarations[0].init)) {
	                            lex();
	                            left = init;
	                            right = parseExpression();
	                            init = null;
	                        }
	                    }
	                }
	            } else {
	                state.allowIn = false;
	                init = parseExpression();
	                state.allowIn = true;

	                if (matchContextualKeyword('of')) {
	                    operator = lex();
	                    left = init;
	                    right = parseExpression();
	                    init = null;
	                } else if (matchKeyword('in')) {
	                    // LeftHandSideExpression
	                    if (!isAssignableLeftHandSide(init)) {
	                        throwError({}, Messages.InvalidLHSInForIn);
	                    }
	                    operator = lex();
	                    left = init;
	                    right = parseExpression();
	                    init = null;
	                }
	            }

	            if (typeof left === 'undefined') {
	                expect(';');
	            }
	        }

	        if (typeof left === 'undefined') {

	            if (!match(';')) {
	                test = parseExpression();
	            }
	            expect(';');

	            if (!match(')')) {
	                update = parseExpression();
	            }
	        }

	        expect(')');

	        oldInIteration = state.inIteration;
	        state.inIteration = true;

	        if (!(opts !== undefined && opts.ignoreBody)) {
	            body = parseStatement();
	        }

	        state.inIteration = oldInIteration;

	        if (typeof left === 'undefined') {
	            return markerApply(marker, delegate.createForStatement(init, test, update, body));
	        }

	        if (operator.value === 'in') {
	            return markerApply(marker, delegate.createForInStatement(left, right, body));
	        }
	        return markerApply(marker, delegate.createForOfStatement(left, right, body));
	    }

	    // 12.7 The continue statement

	    function parseContinueStatement() {
	        var label = null, marker = markerCreate();

	        expectKeyword('continue');

	        // Optimize the most common form: 'continue;'.
	        if (source.charCodeAt(index) === 59) {
	            lex();

	            if (!state.inIteration) {
	                throwError({}, Messages.IllegalContinue);
	            }

	            return markerApply(marker, delegate.createContinueStatement(null));
	        }

	        if (peekLineTerminator()) {
	            if (!state.inIteration) {
	                throwError({}, Messages.IllegalContinue);
	            }

	            return markerApply(marker, delegate.createContinueStatement(null));
	        }

	        if (lookahead.type === Token.Identifier) {
	            label = parseVariableIdentifier();

	            if (!state.labelSet.has(label.name)) {
	                throwError({}, Messages.UnknownLabel, label.name);
	            }
	        }

	        consumeSemicolon();

	        if (label === null && !state.inIteration) {
	            throwError({}, Messages.IllegalContinue);
	        }

	        return markerApply(marker, delegate.createContinueStatement(label));
	    }

	    // 12.8 The break statement

	    function parseBreakStatement() {
	        var label = null, marker = markerCreate();

	        expectKeyword('break');

	        // Catch the very common case first: immediately a semicolon (char #59).
	        if (source.charCodeAt(index) === 59) {
	            lex();

	            if (!(state.inIteration || state.inSwitch)) {
	                throwError({}, Messages.IllegalBreak);
	            }

	            return markerApply(marker, delegate.createBreakStatement(null));
	        }

	        if (peekLineTerminator()) {
	            if (!(state.inIteration || state.inSwitch)) {
	                throwError({}, Messages.IllegalBreak);
	            }

	            return markerApply(marker, delegate.createBreakStatement(null));
	        }

	        if (lookahead.type === Token.Identifier) {
	            label = parseVariableIdentifier();

	            if (!state.labelSet.has(label.name)) {
	                throwError({}, Messages.UnknownLabel, label.name);
	            }
	        }

	        consumeSemicolon();

	        if (label === null && !(state.inIteration || state.inSwitch)) {
	            throwError({}, Messages.IllegalBreak);
	        }

	        return markerApply(marker, delegate.createBreakStatement(label));
	    }

	    // 12.9 The return statement

	    function parseReturnStatement() {
	        var argument = null, marker = markerCreate();

	        expectKeyword('return');

	        if (!state.inFunctionBody) {
	            throwErrorTolerant({}, Messages.IllegalReturn);
	        }

	        // 'return' followed by a space and an identifier is very common.
	        if (source.charCodeAt(index) === 32) {
	            if (isIdentifierStart(source.charCodeAt(index + 1))) {
	                argument = parseExpression();
	                consumeSemicolon();
	                return markerApply(marker, delegate.createReturnStatement(argument));
	            }
	        }

	        if (peekLineTerminator()) {
	            return markerApply(marker, delegate.createReturnStatement(null));
	        }

	        if (!match(';')) {
	            if (!match('}') && lookahead.type !== Token.EOF) {
	                argument = parseExpression();
	            }
	        }

	        consumeSemicolon();

	        return markerApply(marker, delegate.createReturnStatement(argument));
	    }

	    // 12.10 The with statement

	    function parseWithStatement() {
	        var object, body, marker = markerCreate();

	        if (strict) {
	            throwErrorTolerant({}, Messages.StrictModeWith);
	        }

	        expectKeyword('with');

	        expect('(');

	        object = parseExpression();

	        expect(')');

	        body = parseStatement();

	        return markerApply(marker, delegate.createWithStatement(object, body));
	    }

	    // 12.10 The swith statement

	    function parseSwitchCase() {
	        var test,
	            consequent = [],
	            sourceElement,
	            marker = markerCreate();

	        if (matchKeyword('default')) {
	            lex();
	            test = null;
	        } else {
	            expectKeyword('case');
	            test = parseExpression();
	        }
	        expect(':');

	        while (index < length) {
	            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
	                break;
	            }
	            sourceElement = parseSourceElement();
	            if (typeof sourceElement === 'undefined') {
	                break;
	            }
	            consequent.push(sourceElement);
	        }

	        return markerApply(marker, delegate.createSwitchCase(test, consequent));
	    }

	    function parseSwitchStatement() {
	        var discriminant, cases, clause, oldInSwitch, defaultFound, marker = markerCreate();

	        expectKeyword('switch');

	        expect('(');

	        discriminant = parseExpression();

	        expect(')');

	        expect('{');

	        cases = [];

	        if (match('}')) {
	            lex();
	            return markerApply(marker, delegate.createSwitchStatement(discriminant, cases));
	        }

	        oldInSwitch = state.inSwitch;
	        state.inSwitch = true;
	        defaultFound = false;

	        while (index < length) {
	            if (match('}')) {
	                break;
	            }
	            clause = parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    throwError({}, Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }

	        state.inSwitch = oldInSwitch;

	        expect('}');

	        return markerApply(marker, delegate.createSwitchStatement(discriminant, cases));
	    }

	    // 12.13 The throw statement

	    function parseThrowStatement() {
	        var argument, marker = markerCreate();

	        expectKeyword('throw');

	        if (peekLineTerminator()) {
	            throwError({}, Messages.NewlineAfterThrow);
	        }

	        argument = parseExpression();

	        consumeSemicolon();

	        return markerApply(marker, delegate.createThrowStatement(argument));
	    }

	    // 12.14 The try statement

	    function parseCatchClause() {
	        var param, body, marker = markerCreate();

	        expectKeyword('catch');

	        expect('(');
	        if (match(')')) {
	            throwUnexpected(lookahead);
	        }

	        param = parseExpression();
	        // 12.14.1
	        if (strict && param.type === Syntax.Identifier && isRestrictedWord(param.name)) {
	            throwErrorTolerant({}, Messages.StrictCatchVariable);
	        }

	        expect(')');
	        body = parseBlock();
	        return markerApply(marker, delegate.createCatchClause(param, body));
	    }

	    function parseTryStatement() {
	        var block, handlers = [], finalizer = null, marker = markerCreate();

	        expectKeyword('try');

	        block = parseBlock();

	        if (matchKeyword('catch')) {
	            handlers.push(parseCatchClause());
	        }

	        if (matchKeyword('finally')) {
	            lex();
	            finalizer = parseBlock();
	        }

	        if (handlers.length === 0 && !finalizer) {
	            throwError({}, Messages.NoCatchOrFinally);
	        }

	        return markerApply(marker, delegate.createTryStatement(block, [], handlers, finalizer));
	    }

	    // 12.15 The debugger statement

	    function parseDebuggerStatement() {
	        var marker = markerCreate();
	        expectKeyword('debugger');

	        consumeSemicolon();

	        return markerApply(marker, delegate.createDebuggerStatement());
	    }

	    // 12 Statements

	    function parseStatement() {
	        var type = lookahead.type,
	            marker,
	            expr,
	            labeledBody;

	        if (type === Token.EOF) {
	            throwUnexpected(lookahead);
	        }

	        if (type === Token.Punctuator) {
	            switch (lookahead.value) {
	            case ';':
	                return parseEmptyStatement();
	            case '{':
	                return parseBlock();
	            case '(':
	                return parseExpressionStatement();
	            default:
	                break;
	            }
	        }

	        if (type === Token.Keyword) {
	            switch (lookahead.value) {
	            case 'break':
	                return parseBreakStatement();
	            case 'continue':
	                return parseContinueStatement();
	            case 'debugger':
	                return parseDebuggerStatement();
	            case 'do':
	                return parseDoWhileStatement();
	            case 'for':
	                return parseForStatement();
	            case 'function':
	                return parseFunctionDeclaration();
	            case 'class':
	                return parseClassDeclaration();
	            case 'if':
	                return parseIfStatement();
	            case 'return':
	                return parseReturnStatement();
	            case 'switch':
	                return parseSwitchStatement();
	            case 'throw':
	                return parseThrowStatement();
	            case 'try':
	                return parseTryStatement();
	            case 'var':
	                return parseVariableStatement();
	            case 'while':
	                return parseWhileStatement();
	            case 'with':
	                return parseWithStatement();
	            default:
	                break;
	            }
	        }

	        if (matchAsyncFuncExprOrDecl()) {
	            return parseFunctionDeclaration();
	        }

	        marker = markerCreate();
	        expr = parseExpression();

	        // 12.12 Labelled Statements
	        if ((expr.type === Syntax.Identifier) && match(':')) {
	            lex();

	            if (state.labelSet.has(expr.name)) {
	                throwError({}, Messages.Redeclaration, 'Label', expr.name);
	            }

	            state.labelSet.set(expr.name, true);
	            labeledBody = parseStatement();
	            state.labelSet.delete(expr.name);
	            return markerApply(marker, delegate.createLabeledStatement(expr, labeledBody));
	        }

	        consumeSemicolon();

	        return markerApply(marker, delegate.createExpressionStatement(expr));
	    }

	    // 13 Function Definition

	    function parseConciseBody() {
	        if (match('{')) {
	            return parseFunctionSourceElements();
	        }
	        return parseAssignmentExpression();
	    }

	    function parseFunctionSourceElements() {
	        var sourceElement, sourceElements = [], token, directive, firstRestricted,
	            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, oldParenthesizedCount,
	            marker = markerCreate();

	        expect('{');

	        while (index < length) {
	            if (lookahead.type !== Token.StringLiteral) {
	                break;
	            }
	            token = lookahead;

	            sourceElement = parseSourceElement();
	            sourceElements.push(sourceElement);
	            if (sourceElement.expression.type !== Syntax.Literal) {
	                // this is not directive
	                break;
	            }
	            directive = source.slice(token.range[0] + 1, token.range[1] - 1);
	            if (directive === 'use strict') {
	                strict = true;
	                if (firstRestricted) {
	                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
	                }
	            } else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }

	        oldLabelSet = state.labelSet;
	        oldInIteration = state.inIteration;
	        oldInSwitch = state.inSwitch;
	        oldInFunctionBody = state.inFunctionBody;
	        oldParenthesizedCount = state.parenthesizedCount;

	        state.labelSet = new StringMap();
	        state.inIteration = false;
	        state.inSwitch = false;
	        state.inFunctionBody = true;
	        state.parenthesizedCount = 0;

	        while (index < length) {
	            if (match('}')) {
	                break;
	            }
	            sourceElement = parseSourceElement();
	            if (typeof sourceElement === 'undefined') {
	                break;
	            }
	            sourceElements.push(sourceElement);
	        }

	        expect('}');

	        state.labelSet = oldLabelSet;
	        state.inIteration = oldInIteration;
	        state.inSwitch = oldInSwitch;
	        state.inFunctionBody = oldInFunctionBody;
	        state.parenthesizedCount = oldParenthesizedCount;

	        return markerApply(marker, delegate.createBlockStatement(sourceElements));
	    }

	    function validateParam(options, param, name) {
	        if (strict) {
	            if (isRestrictedWord(name)) {
	                options.stricted = param;
	                options.message = Messages.StrictParamName;
	            }
	            if (options.paramSet.has(name)) {
	                options.stricted = param;
	                options.message = Messages.StrictParamDupe;
	            }
	        } else if (!options.firstRestricted) {
	            if (isRestrictedWord(name)) {
	                options.firstRestricted = param;
	                options.message = Messages.StrictParamName;
	            } else if (isStrictModeReservedWord(name)) {
	                options.firstRestricted = param;
	                options.message = Messages.StrictReservedWord;
	            } else if (options.paramSet.has(name)) {
	                options.firstRestricted = param;
	                options.message = Messages.StrictParamDupe;
	            }
	        }
	        options.paramSet.set(name, true);
	    }

	    function parseParam(options) {
	        var marker, token, rest, param, def;

	        token = lookahead;
	        if (token.value === '...') {
	            token = lex();
	            rest = true;
	        }

	        if (match('[')) {
	            marker = markerCreate();
	            param = parseArrayInitialiser();
	            reinterpretAsDestructuredParameter(options, param);
	            if (match(':')) {
	                param.typeAnnotation = parseTypeAnnotation();
	                markerApply(marker, param);
	            }
	        } else if (match('{')) {
	            marker = markerCreate();
	            if (rest) {
	                throwError({}, Messages.ObjectPatternAsRestParameter);
	            }
	            param = parseObjectInitialiser();
	            reinterpretAsDestructuredParameter(options, param);
	            if (match(':')) {
	                param.typeAnnotation = parseTypeAnnotation();
	                markerApply(marker, param);
	            }
	        } else {
	            param =
	                rest
	                ? parseTypeAnnotatableIdentifier(
	                    false, /* requireTypeAnnotation */
	                    false /* canBeOptionalParam */
	                )
	                : parseTypeAnnotatableIdentifier(
	                    false, /* requireTypeAnnotation */
	                    true /* canBeOptionalParam */
	                );

	            validateParam(options, token, token.value);
	        }

	        if (match('=')) {
	            if (rest) {
	                throwErrorTolerant(lookahead, Messages.DefaultRestParameter);
	            }
	            lex();
	            def = parseAssignmentExpression();
	            ++options.defaultCount;
	        }

	        if (rest) {
	            if (!match(')')) {
	                throwError({}, Messages.ParameterAfterRestParameter);
	            }
	            options.rest = param;
	            return false;
	        }

	        options.params.push(param);
	        options.defaults.push(def);
	        return !match(')');
	    }

	    function parseParams(firstRestricted) {
	        var options, marker = markerCreate();

	        options = {
	            params: [],
	            defaultCount: 0,
	            defaults: [],
	            rest: null,
	            firstRestricted: firstRestricted
	        };

	        expect('(');

	        if (!match(')')) {
	            options.paramSet = new StringMap();
	            while (index < length) {
	                if (!parseParam(options)) {
	                    break;
	                }
	                expect(',');
	            }
	        }

	        expect(')');

	        if (options.defaultCount === 0) {
	            options.defaults = [];
	        }

	        if (match(':')) {
	            options.returnType = parseTypeAnnotation();
	        }

	        return markerApply(marker, options);
	    }

	    function parseFunctionDeclaration() {
	        var id, body, token, tmp, firstRestricted, message, generator, isAsync,
	            previousStrict, previousYieldAllowed, previousAwaitAllowed,
	            marker = markerCreate(), typeParameters;

	        isAsync = false;
	        if (matchAsync()) {
	            lex();
	            isAsync = true;
	        }

	        expectKeyword('function');

	        generator = false;
	        if (match('*')) {
	            lex();
	            generator = true;
	        }

	        token = lookahead;

	        id = parseVariableIdentifier();

	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }

	        if (strict) {
	            if (isRestrictedWord(token.value)) {
	                throwErrorTolerant(token, Messages.StrictFunctionName);
	            }
	        } else {
	            if (isRestrictedWord(token.value)) {
	                firstRestricted = token;
	                message = Messages.StrictFunctionName;
	            } else if (isStrictModeReservedWord(token.value)) {
	                firstRestricted = token;
	                message = Messages.StrictReservedWord;
	            }
	        }

	        tmp = parseParams(firstRestricted);
	        firstRestricted = tmp.firstRestricted;
	        if (tmp.message) {
	            message = tmp.message;
	        }

	        previousStrict = strict;
	        previousYieldAllowed = state.yieldAllowed;
	        state.yieldAllowed = generator;
	        previousAwaitAllowed = state.awaitAllowed;
	        state.awaitAllowed = isAsync;

	        body = parseFunctionSourceElements();

	        if (strict && firstRestricted) {
	            throwError(firstRestricted, message);
	        }
	        if (strict && tmp.stricted) {
	            throwErrorTolerant(tmp.stricted, message);
	        }
	        strict = previousStrict;
	        state.yieldAllowed = previousYieldAllowed;
	        state.awaitAllowed = previousAwaitAllowed;

	        return markerApply(
	            marker,
	            delegate.createFunctionDeclaration(
	                id,
	                tmp.params,
	                tmp.defaults,
	                body,
	                tmp.rest,
	                generator,
	                false,
	                isAsync,
	                tmp.returnType,
	                typeParameters
	            )
	        );
	    }

	    function parseFunctionExpression() {
	        var token, id = null, firstRestricted, message, tmp, body, generator, isAsync,
	            previousStrict, previousYieldAllowed, previousAwaitAllowed,
	            marker = markerCreate(), typeParameters;

	        isAsync = false;
	        if (matchAsync()) {
	            lex();
	            isAsync = true;
	        }

	        expectKeyword('function');

	        generator = false;

	        if (match('*')) {
	            lex();
	            generator = true;
	        }

	        if (!match('(')) {
	            if (!match('<')) {
	                token = lookahead;
	                id = parseVariableIdentifier();

	                if (strict) {
	                    if (isRestrictedWord(token.value)) {
	                        throwErrorTolerant(token, Messages.StrictFunctionName);
	                    }
	                } else {
	                    if (isRestrictedWord(token.value)) {
	                        firstRestricted = token;
	                        message = Messages.StrictFunctionName;
	                    } else if (isStrictModeReservedWord(token.value)) {
	                        firstRestricted = token;
	                        message = Messages.StrictReservedWord;
	                    }
	                }
	            }

	            if (match('<')) {
	                typeParameters = parseTypeParameterDeclaration();
	            }
	        }

	        tmp = parseParams(firstRestricted);
	        firstRestricted = tmp.firstRestricted;
	        if (tmp.message) {
	            message = tmp.message;
	        }

	        previousStrict = strict;
	        previousYieldAllowed = state.yieldAllowed;
	        state.yieldAllowed = generator;
	        previousAwaitAllowed = state.awaitAllowed;
	        state.awaitAllowed = isAsync;

	        body = parseFunctionSourceElements();

	        if (strict && firstRestricted) {
	            throwError(firstRestricted, message);
	        }
	        if (strict && tmp.stricted) {
	            throwErrorTolerant(tmp.stricted, message);
	        }
	        strict = previousStrict;
	        state.yieldAllowed = previousYieldAllowed;
	        state.awaitAllowed = previousAwaitAllowed;

	        return markerApply(
	            marker,
	            delegate.createFunctionExpression(
	                id,
	                tmp.params,
	                tmp.defaults,
	                body,
	                tmp.rest,
	                generator,
	                false,
	                isAsync,
	                tmp.returnType,
	                typeParameters
	            )
	        );
	    }

	    function parseYieldExpression() {
	        var delegateFlag, expr, marker = markerCreate();

	        expectKeyword('yield', !strict);

	        delegateFlag = false;
	        if (match('*')) {
	            lex();
	            delegateFlag = true;
	        }

	        expr = parseAssignmentExpression();

	        return markerApply(marker, delegate.createYieldExpression(expr, delegateFlag));
	    }

	    function parseAwaitExpression() {
	        var expr, marker = markerCreate();
	        expectContextualKeyword('await');
	        expr = parseAssignmentExpression();
	        return markerApply(marker, delegate.createAwaitExpression(expr));
	    }

	    // 14 Functions and classes

	    // 14.1 Functions is defined above (13 in ES5)
	    // 14.2 Arrow Functions Definitions is defined in (7.3 assignments)

	    // 14.3 Method Definitions
	    // 14.3.7
	    function specialMethod(methodDefinition) {
	        return methodDefinition.kind === 'get' ||
	               methodDefinition.kind === 'set' ||
	               methodDefinition.value.generator;
	    }

	    function parseMethodDefinition(key, isStatic, generator, computed) {
	        var token, param, propType,
	            isAsync, typeParameters, tokenValue, returnType;

	        propType = isStatic ? ClassPropertyType.static : ClassPropertyType.prototype;

	        if (generator) {
	            return delegate.createMethodDefinition(
	                propType,
	                '',
	                key,
	                parsePropertyMethodFunction({ generator: true }),
	                computed
	            );
	        }

	        tokenValue = key.type === 'Identifier' && key.name;

	        if (tokenValue === 'get' && !match('(')) {
	            key = parseObjectPropertyKey();

	            expect('(');
	            expect(')');
	            if (match(':')) {
	                returnType = parseTypeAnnotation();
	            }
	            return delegate.createMethodDefinition(
	                propType,
	                'get',
	                key,
	                parsePropertyFunction({ generator: false, returnType: returnType }),
	                computed
	            );
	        }
	        if (tokenValue === 'set' && !match('(')) {
	            key = parseObjectPropertyKey();

	            expect('(');
	            token = lookahead;
	            param = [ parseTypeAnnotatableIdentifier() ];
	            expect(')');
	            if (match(':')) {
	                returnType = parseTypeAnnotation();
	            }
	            return delegate.createMethodDefinition(
	                propType,
	                'set',
	                key,
	                parsePropertyFunction({
	                    params: param,
	                    generator: false,
	                    name: token,
	                    returnType: returnType
	                }),
	                computed
	            );
	        }

	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }

	        isAsync = tokenValue === 'async' && !match('(');
	        if (isAsync) {
	            key = parseObjectPropertyKey();
	        }

	        return delegate.createMethodDefinition(
	            propType,
	            '',
	            key,
	            parsePropertyMethodFunction({
	                generator: false,
	                async: isAsync,
	                typeParameters: typeParameters
	            }),
	            computed
	        );
	    }

	    function parseClassProperty(key, computed, isStatic) {
	        var typeAnnotation;

	        typeAnnotation = parseTypeAnnotation();
	        expect(';');

	        return delegate.createClassProperty(
	            key,
	            typeAnnotation,
	            computed,
	            isStatic
	        );
	    }

	    function parseClassElement() {
	        var computed = false, generator = false, key, marker = markerCreate(),
	            isStatic = false, possiblyOpenBracketToken;
	        if (match(';')) {
	            lex();
	            return undefined;
	        }

	        if (lookahead.value === 'static') {
	            lex();
	            isStatic = true;
	        }

	        if (match('*')) {
	            lex();
	            generator = true;
	        }

	        possiblyOpenBracketToken = lookahead;
	        if (matchContextualKeyword('get') || matchContextualKeyword('set')) {
	            possiblyOpenBracketToken = lookahead2();
	        }

	        if (possiblyOpenBracketToken.type === Token.Punctuator
	                && possiblyOpenBracketToken.value === '[') {
	            computed = true;
	        }

	        key = parseObjectPropertyKey();

	        if (!generator && lookahead.value === ':') {
	            return markerApply(marker, parseClassProperty(key, computed, isStatic));
	        }

	        return markerApply(marker, parseMethodDefinition(
	            key,
	            isStatic,
	            generator,
	            computed
	        ));
	    }

	    function parseClassBody() {
	        var classElement, classElements = [], existingProps = {},
	            marker = markerCreate(), propName, propType;

	        existingProps[ClassPropertyType.static] = new StringMap();
	        existingProps[ClassPropertyType.prototype] = new StringMap();

	        expect('{');

	        while (index < length) {
	            if (match('}')) {
	                break;
	            }
	            classElement = parseClassElement(existingProps);

	            if (typeof classElement !== 'undefined') {
	                classElements.push(classElement);

	                propName = !classElement.computed && getFieldName(classElement.key);
	                if (propName !== false) {
	                    propType = classElement.static ?
	                                ClassPropertyType.static :
	                                ClassPropertyType.prototype;

	                    if (classElement.type === Syntax.MethodDefinition) {
	                        if (propName === 'constructor' && !classElement.static) {
	                            if (specialMethod(classElement)) {
	                                throwError(classElement, Messages.IllegalClassConstructorProperty);
	                            }
	                            if (existingProps[ClassPropertyType.prototype].has('constructor')) {
	                                throwError(classElement.key, Messages.IllegalDuplicateClassProperty);
	                            }
	                        }
	                        existingProps[propType].set(propName, true);
	                    }
	                }
	            }
	        }

	        expect('}');

	        return markerApply(marker, delegate.createClassBody(classElements));
	    }

	    function parseClassImplements() {
	        var id, implemented = [], marker, typeParameters;
	        if (strict) {
	            expectKeyword('implements');
	        } else {
	            expectContextualKeyword('implements');
	        }
	        while (index < length) {
	            marker = markerCreate();
	            id = parseVariableIdentifier();
	            if (match('<')) {
	                typeParameters = parseTypeParameterInstantiation();
	            } else {
	                typeParameters = null;
	            }
	            implemented.push(markerApply(marker, delegate.createClassImplements(
	                id,
	                typeParameters
	            )));
	            if (!match(',')) {
	                break;
	            }
	            expect(',');
	        }
	        return implemented;
	    }

	    function parseClassExpression() {
	        var id, implemented, previousYieldAllowed, superClass = null,
	            superTypeParameters, marker = markerCreate(), typeParameters,
	            matchImplements;

	        expectKeyword('class');

	        matchImplements =
	                strict
	                ? matchKeyword('implements')
	                : matchContextualKeyword('implements');

	        if (!matchKeyword('extends') && !matchImplements && !match('{')) {
	            id = parseVariableIdentifier();
	        }

	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }

	        if (matchKeyword('extends')) {
	            expectKeyword('extends');
	            previousYieldAllowed = state.yieldAllowed;
	            state.yieldAllowed = false;
	            superClass = parseLeftHandSideExpressionAllowCall();
	            if (match('<')) {
	                superTypeParameters = parseTypeParameterInstantiation();
	            }
	            state.yieldAllowed = previousYieldAllowed;
	        }

	        if (strict ? matchKeyword('implements') : matchContextualKeyword('implements')) {
	            implemented = parseClassImplements();
	        }

	        return markerApply(marker, delegate.createClassExpression(
	            id,
	            superClass,
	            parseClassBody(),
	            typeParameters,
	            superTypeParameters,
	            implemented
	        ));
	    }

	    function parseClassDeclaration() {
	        var id, implemented, previousYieldAllowed, superClass = null,
	            superTypeParameters, marker = markerCreate(), typeParameters;

	        expectKeyword('class');

	        id = parseVariableIdentifier();

	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }

	        if (matchKeyword('extends')) {
	            expectKeyword('extends');
	            previousYieldAllowed = state.yieldAllowed;
	            state.yieldAllowed = false;
	            superClass = parseLeftHandSideExpressionAllowCall();
	            if (match('<')) {
	                superTypeParameters = parseTypeParameterInstantiation();
	            }
	            state.yieldAllowed = previousYieldAllowed;
	        }

	        if (strict ? matchKeyword('implements') : matchContextualKeyword('implements')) {
	            implemented = parseClassImplements();
	        }

	        return markerApply(marker, delegate.createClassDeclaration(
	            id,
	            superClass,
	            parseClassBody(),
	            typeParameters,
	            superTypeParameters,
	            implemented
	        ));
	    }

	    // 15 Program

	    function parseSourceElement() {
	        var token;
	        if (lookahead.type === Token.Keyword) {
	            switch (lookahead.value) {
	            case 'const':
	            case 'let':
	                return parseConstLetDeclaration(lookahead.value);
	            case 'function':
	                return parseFunctionDeclaration();
	            case 'export':
	                throwErrorTolerant({}, Messages.IllegalExportDeclaration);
	                return parseExportDeclaration();
	            case 'import':
	                throwErrorTolerant({}, Messages.IllegalImportDeclaration);
	                return parseImportDeclaration();
	            case 'interface':
	                if (lookahead2().type === Token.Identifier) {
	                    return parseInterface();
	                }
	                return parseStatement();
	            default:
	                return parseStatement();
	            }
	        }

	        if (matchContextualKeyword('type')
	                && lookahead2().type === Token.Identifier) {
	            return parseTypeAlias();
	        }

	        if (matchContextualKeyword('interface')
	                && lookahead2().type === Token.Identifier) {
	            return parseInterface();
	        }

	        if (matchContextualKeyword('declare')) {
	            token = lookahead2();
	            if (token.type === Token.Keyword) {
	                switch (token.value) {
	                case 'class':
	                    return parseDeclareClass();
	                case 'function':
	                    return parseDeclareFunction();
	                case 'var':
	                    return parseDeclareVariable();
	                }
	            } else if (token.type === Token.Identifier
	                    && token.value === 'module') {
	                return parseDeclareModule();
	            }
	        }

	        if (lookahead.type !== Token.EOF) {
	            return parseStatement();
	        }
	    }

	    function parseProgramElement() {
	        var isModule = extra.sourceType === 'module' || extra.sourceType === 'nonStrictModule';

	        if (isModule && lookahead.type === Token.Keyword) {
	            switch (lookahead.value) {
	            case 'export':
	                return parseExportDeclaration();
	            case 'import':
	                return parseImportDeclaration();
	            }
	        }

	        return parseSourceElement();
	    }

	    function parseProgramElements() {
	        var sourceElement, sourceElements = [], token, directive, firstRestricted;

	        while (index < length) {
	            token = lookahead;
	            if (token.type !== Token.StringLiteral) {
	                break;
	            }

	            sourceElement = parseProgramElement();
	            sourceElements.push(sourceElement);
	            if (sourceElement.expression.type !== Syntax.Literal) {
	                // this is not directive
	                break;
	            }
	            directive = source.slice(token.range[0] + 1, token.range[1] - 1);
	            if (directive === 'use strict') {
	                strict = true;
	                if (firstRestricted) {
	                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
	                }
	            } else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }

	        while (index < length) {
	            sourceElement = parseProgramElement();
	            if (typeof sourceElement === 'undefined') {
	                break;
	            }
	            sourceElements.push(sourceElement);
	        }
	        return sourceElements;
	    }

	    function parseProgram() {
	        var body, marker = markerCreate();
	        strict = extra.sourceType === 'module';
	        peek();
	        body = parseProgramElements();
	        return markerApply(marker, delegate.createProgram(body));
	    }

	    // 16 JSX

	    XHTMLEntities = {
	        quot: '\u0022',
	        amp: '&',
	        apos: '\u0027',
	        lt: '<',
	        gt: '>',
	        nbsp: '\u00A0',
	        iexcl: '\u00A1',
	        cent: '\u00A2',
	        pound: '\u00A3',
	        curren: '\u00A4',
	        yen: '\u00A5',
	        brvbar: '\u00A6',
	        sect: '\u00A7',
	        uml: '\u00A8',
	        copy: '\u00A9',
	        ordf: '\u00AA',
	        laquo: '\u00AB',
	        not: '\u00AC',
	        shy: '\u00AD',
	        reg: '\u00AE',
	        macr: '\u00AF',
	        deg: '\u00B0',
	        plusmn: '\u00B1',
	        sup2: '\u00B2',
	        sup3: '\u00B3',
	        acute: '\u00B4',
	        micro: '\u00B5',
	        para: '\u00B6',
	        middot: '\u00B7',
	        cedil: '\u00B8',
	        sup1: '\u00B9',
	        ordm: '\u00BA',
	        raquo: '\u00BB',
	        frac14: '\u00BC',
	        frac12: '\u00BD',
	        frac34: '\u00BE',
	        iquest: '\u00BF',
	        Agrave: '\u00C0',
	        Aacute: '\u00C1',
	        Acirc: '\u00C2',
	        Atilde: '\u00C3',
	        Auml: '\u00C4',
	        Aring: '\u00C5',
	        AElig: '\u00C6',
	        Ccedil: '\u00C7',
	        Egrave: '\u00C8',
	        Eacute: '\u00C9',
	        Ecirc: '\u00CA',
	        Euml: '\u00CB',
	        Igrave: '\u00CC',
	        Iacute: '\u00CD',
	        Icirc: '\u00CE',
	        Iuml: '\u00CF',
	        ETH: '\u00D0',
	        Ntilde: '\u00D1',
	        Ograve: '\u00D2',
	        Oacute: '\u00D3',
	        Ocirc: '\u00D4',
	        Otilde: '\u00D5',
	        Ouml: '\u00D6',
	        times: '\u00D7',
	        Oslash: '\u00D8',
	        Ugrave: '\u00D9',
	        Uacute: '\u00DA',
	        Ucirc: '\u00DB',
	        Uuml: '\u00DC',
	        Yacute: '\u00DD',
	        THORN: '\u00DE',
	        szlig: '\u00DF',
	        agrave: '\u00E0',
	        aacute: '\u00E1',
	        acirc: '\u00E2',
	        atilde: '\u00E3',
	        auml: '\u00E4',
	        aring: '\u00E5',
	        aelig: '\u00E6',
	        ccedil: '\u00E7',
	        egrave: '\u00E8',
	        eacute: '\u00E9',
	        ecirc: '\u00EA',
	        euml: '\u00EB',
	        igrave: '\u00EC',
	        iacute: '\u00ED',
	        icirc: '\u00EE',
	        iuml: '\u00EF',
	        eth: '\u00F0',
	        ntilde: '\u00F1',
	        ograve: '\u00F2',
	        oacute: '\u00F3',
	        ocirc: '\u00F4',
	        otilde: '\u00F5',
	        ouml: '\u00F6',
	        divide: '\u00F7',
	        oslash: '\u00F8',
	        ugrave: '\u00F9',
	        uacute: '\u00FA',
	        ucirc: '\u00FB',
	        uuml: '\u00FC',
	        yacute: '\u00FD',
	        thorn: '\u00FE',
	        yuml: '\u00FF',
	        OElig: '\u0152',
	        oelig: '\u0153',
	        Scaron: '\u0160',
	        scaron: '\u0161',
	        Yuml: '\u0178',
	        fnof: '\u0192',
	        circ: '\u02C6',
	        tilde: '\u02DC',
	        Alpha: '\u0391',
	        Beta: '\u0392',
	        Gamma: '\u0393',
	        Delta: '\u0394',
	        Epsilon: '\u0395',
	        Zeta: '\u0396',
	        Eta: '\u0397',
	        Theta: '\u0398',
	        Iota: '\u0399',
	        Kappa: '\u039A',
	        Lambda: '\u039B',
	        Mu: '\u039C',
	        Nu: '\u039D',
	        Xi: '\u039E',
	        Omicron: '\u039F',
	        Pi: '\u03A0',
	        Rho: '\u03A1',
	        Sigma: '\u03A3',
	        Tau: '\u03A4',
	        Upsilon: '\u03A5',
	        Phi: '\u03A6',
	        Chi: '\u03A7',
	        Psi: '\u03A8',
	        Omega: '\u03A9',
	        alpha: '\u03B1',
	        beta: '\u03B2',
	        gamma: '\u03B3',
	        delta: '\u03B4',
	        epsilon: '\u03B5',
	        zeta: '\u03B6',
	        eta: '\u03B7',
	        theta: '\u03B8',
	        iota: '\u03B9',
	        kappa: '\u03BA',
	        lambda: '\u03BB',
	        mu: '\u03BC',
	        nu: '\u03BD',
	        xi: '\u03BE',
	        omicron: '\u03BF',
	        pi: '\u03C0',
	        rho: '\u03C1',
	        sigmaf: '\u03C2',
	        sigma: '\u03C3',
	        tau: '\u03C4',
	        upsilon: '\u03C5',
	        phi: '\u03C6',
	        chi: '\u03C7',
	        psi: '\u03C8',
	        omega: '\u03C9',
	        thetasym: '\u03D1',
	        upsih: '\u03D2',
	        piv: '\u03D6',
	        ensp: '\u2002',
	        emsp: '\u2003',
	        thinsp: '\u2009',
	        zwnj: '\u200C',
	        zwj: '\u200D',
	        lrm: '\u200E',
	        rlm: '\u200F',
	        ndash: '\u2013',
	        mdash: '\u2014',
	        lsquo: '\u2018',
	        rsquo: '\u2019',
	        sbquo: '\u201A',
	        ldquo: '\u201C',
	        rdquo: '\u201D',
	        bdquo: '\u201E',
	        dagger: '\u2020',
	        Dagger: '\u2021',
	        bull: '\u2022',
	        hellip: '\u2026',
	        permil: '\u2030',
	        prime: '\u2032',
	        Prime: '\u2033',
	        lsaquo: '\u2039',
	        rsaquo: '\u203A',
	        oline: '\u203E',
	        frasl: '\u2044',
	        euro: '\u20AC',
	        image: '\u2111',
	        weierp: '\u2118',
	        real: '\u211C',
	        trade: '\u2122',
	        alefsym: '\u2135',
	        larr: '\u2190',
	        uarr: '\u2191',
	        rarr: '\u2192',
	        darr: '\u2193',
	        harr: '\u2194',
	        crarr: '\u21B5',
	        lArr: '\u21D0',
	        uArr: '\u21D1',
	        rArr: '\u21D2',
	        dArr: '\u21D3',
	        hArr: '\u21D4',
	        forall: '\u2200',
	        part: '\u2202',
	        exist: '\u2203',
	        empty: '\u2205',
	        nabla: '\u2207',
	        isin: '\u2208',
	        notin: '\u2209',
	        ni: '\u220B',
	        prod: '\u220F',
	        sum: '\u2211',
	        minus: '\u2212',
	        lowast: '\u2217',
	        radic: '\u221A',
	        prop: '\u221D',
	        infin: '\u221E',
	        ang: '\u2220',
	        and: '\u2227',
	        or: '\u2228',
	        cap: '\u2229',
	        cup: '\u222A',
	        'int': '\u222B',
	        there4: '\u2234',
	        sim: '\u223C',
	        cong: '\u2245',
	        asymp: '\u2248',
	        ne: '\u2260',
	        equiv: '\u2261',
	        le: '\u2264',
	        ge: '\u2265',
	        sub: '\u2282',
	        sup: '\u2283',
	        nsub: '\u2284',
	        sube: '\u2286',
	        supe: '\u2287',
	        oplus: '\u2295',
	        otimes: '\u2297',
	        perp: '\u22A5',
	        sdot: '\u22C5',
	        lceil: '\u2308',
	        rceil: '\u2309',
	        lfloor: '\u230A',
	        rfloor: '\u230B',
	        lang: '\u2329',
	        rang: '\u232A',
	        loz: '\u25CA',
	        spades: '\u2660',
	        clubs: '\u2663',
	        hearts: '\u2665',
	        diams: '\u2666'
	    };

	    function getQualifiedJSXName(object) {
	        if (object.type === Syntax.JSXIdentifier) {
	            return object.name;
	        }
	        if (object.type === Syntax.JSXNamespacedName) {
	            return object.namespace.name + ':' + object.name.name;
	        }
	        /* istanbul ignore else */
	        if (object.type === Syntax.JSXMemberExpression) {
	            return (
	                getQualifiedJSXName(object.object) + '.' +
	                getQualifiedJSXName(object.property)
	            );
	        }
	        /* istanbul ignore next */
	        throwUnexpected(object);
	    }

	    function isJSXIdentifierStart(ch) {
	        // exclude backslash (\)
	        return (ch !== 92) && isIdentifierStart(ch);
	    }

	    function isJSXIdentifierPart(ch) {
	        // exclude backslash (\) and add hyphen (-)
	        return (ch !== 92) && (ch === 45 || isIdentifierPart(ch));
	    }

	    function scanJSXIdentifier() {
	        var ch, start, value = '';

	        start = index;
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (!isJSXIdentifierPart(ch)) {
	                break;
	            }
	            value += source[index++];
	        }

	        return {
	            type: Token.JSXIdentifier,
	            value: value,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    function scanJSXEntity() {
	        var ch, str = '', start = index, count = 0, code;
	        ch = source[index];
	        assert(ch === '&', 'Entity must start with an ampersand');
	        index++;
	        while (index < length && count++ < 10) {
	            ch = source[index++];
	            if (ch === ';') {
	                break;
	            }
	            str += ch;
	        }

	        // Well-formed entity (ending was found).
	        if (ch === ';') {
	            // Numeric entity.
	            if (str[0] === '#') {
	                if (str[1] === 'x') {
	                    code = +('0' + str.substr(1));
	                } else {
	                    // Removing leading zeros in order to avoid treating as octal in old browsers.
	                    code = +str.substr(1).replace(Regex.LeadingZeros, '');
	                }

	                if (!isNaN(code)) {
	                    return String.fromCharCode(code);
	                }
	            /* istanbul ignore else */
	            } else if (XHTMLEntities[str]) {
	                return XHTMLEntities[str];
	            }
	        }

	        // Treat non-entity sequences as regular text.
	        index = start + 1;
	        return '&';
	    }

	    function scanJSXText(stopChars) {
	        var ch, str = '', start;
	        start = index;
	        while (index < length) {
	            ch = source[index];
	            if (stopChars.indexOf(ch) !== -1) {
	                break;
	            }
	            if (ch === '&') {
	                str += scanJSXEntity();
	            } else {
	                index++;
	                if (ch === '\r' && source[index] === '\n') {
	                    str += ch;
	                    ch = source[index];
	                    index++;
	                }
	                if (isLineTerminator(ch.charCodeAt(0))) {
	                    ++lineNumber;
	                    lineStart = index;
	                }
	                str += ch;
	            }
	        }
	        return {
	            type: Token.JSXText,
	            value: str,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            range: [start, index]
	        };
	    }

	    function scanJSXStringLiteral() {
	        var innerToken, quote, start;

	        quote = source[index];
	        assert((quote === '\'' || quote === '"'),
	            'String literal must starts with a quote');

	        start = index;
	        ++index;

	        innerToken = scanJSXText([quote]);

	        if (quote !== source[index]) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }

	        ++index;

	        innerToken.range = [start, index];

	        return innerToken;
	    }

	    /**
	     * Between JSX opening and closing tags (e.g. <foo>HERE</foo>), anything that
	     * is not another JSX tag and is not an expression wrapped by {} is text.
	     */
	    function advanceJSXChild() {
	        var ch = source.charCodeAt(index);

	        // '<' 60, '>' 62, '{' 123, '}' 125
	        if (ch !== 60 && ch !== 62 && ch !== 123 && ch !== 125) {
	            return scanJSXText(['<', '>', '{', '}']);
	        }

	        return scanPunctuator();
	    }

	    function parseJSXIdentifier() {
	        var token, marker = markerCreate();

	        if (lookahead.type !== Token.JSXIdentifier) {
	            throwUnexpected(lookahead);
	        }

	        token = lex();
	        return markerApply(marker, delegate.createJSXIdentifier(token.value));
	    }

	    function parseJSXNamespacedName() {
	        var namespace, name, marker = markerCreate();

	        namespace = parseJSXIdentifier();
	        expect(':');
	        name = parseJSXIdentifier();

	        return markerApply(marker, delegate.createJSXNamespacedName(namespace, name));
	    }

	    function parseJSXMemberExpression() {
	        var marker = markerCreate(),
	            expr = parseJSXIdentifier();

	        while (match('.')) {
	            lex();
	            expr = markerApply(marker, delegate.createJSXMemberExpression(expr, parseJSXIdentifier()));
	        }

	        return expr;
	    }

	    function parseJSXElementName() {
	        if (lookahead2().value === ':') {
	            return parseJSXNamespacedName();
	        }
	        if (lookahead2().value === '.') {
	            return parseJSXMemberExpression();
	        }

	        return parseJSXIdentifier();
	    }

	    function parseJSXAttributeName() {
	        if (lookahead2().value === ':') {
	            return parseJSXNamespacedName();
	        }

	        return parseJSXIdentifier();
	    }

	    function parseJSXAttributeValue() {
	        var value, marker;
	        if (match('{')) {
	            value = parseJSXExpressionContainer();
	            if (value.expression.type === Syntax.JSXEmptyExpression) {
	                throwError(
	                    value,
	                    'JSX attributes must only be assigned a non-empty ' +
	                        'expression'
	                );
	            }
	        } else if (match('<')) {
	            value = parseJSXElement();
	        } else if (lookahead.type === Token.JSXText) {
	            marker = markerCreate();
	            value = markerApply(marker, delegate.createLiteral(lex()));
	        } else {
	            throwError({}, Messages.InvalidJSXAttributeValue);
	        }
	        return value;
	    }

	    function parseJSXEmptyExpression() {
	        var marker = markerCreatePreserveWhitespace();
	        while (source.charAt(index) !== '}') {
	            index++;
	        }
	        return markerApply(marker, delegate.createJSXEmptyExpression());
	    }

	    function parseJSXExpressionContainer() {
	        var expression, origInJSXChild, origInJSXTag, marker = markerCreate();

	        origInJSXChild = state.inJSXChild;
	        origInJSXTag = state.inJSXTag;
	        state.inJSXChild = false;
	        state.inJSXTag = false;

	        expect('{');

	        if (match('}')) {
	            expression = parseJSXEmptyExpression();
	        } else {
	            expression = parseExpression();
	        }

	        state.inJSXChild = origInJSXChild;
	        state.inJSXTag = origInJSXTag;

	        expect('}');

	        return markerApply(marker, delegate.createJSXExpressionContainer(expression));
	    }

	    function parseJSXSpreadAttribute() {
	        var expression, origInJSXChild, origInJSXTag, marker = markerCreate();

	        origInJSXChild = state.inJSXChild;
	        origInJSXTag = state.inJSXTag;
	        state.inJSXChild = false;
	        state.inJSXTag = false;

	        expect('{');
	        expect('...');

	        expression = parseAssignmentExpression();

	        state.inJSXChild = origInJSXChild;
	        state.inJSXTag = origInJSXTag;

	        expect('}');

	        return markerApply(marker, delegate.createJSXSpreadAttribute(expression));
	    }

	    function parseJSXAttribute() {
	        var name, marker;

	        if (match('{')) {
	            return parseJSXSpreadAttribute();
	        }

	        marker = markerCreate();

	        name = parseJSXAttributeName();

	        // HTML empty attribute
	        if (match('=')) {
	            lex();
	            return markerApply(marker, delegate.createJSXAttribute(name, parseJSXAttributeValue()));
	        }

	        return markerApply(marker, delegate.createJSXAttribute(name));
	    }

	    function parseJSXChild() {
	        var token, marker;
	        if (match('{')) {
	            token = parseJSXExpressionContainer();
	        } else if (lookahead.type === Token.JSXText) {
	            marker = markerCreatePreserveWhitespace();
	            token = markerApply(marker, delegate.createLiteral(lex()));
	        } else if (match('<')) {
	            token = parseJSXElement();
	        } else {
	            throwUnexpected(lookahead);
	        }
	        return token;
	    }

	    function parseJSXClosingElement() {
	        var name, origInJSXChild, origInJSXTag, marker = markerCreate();
	        origInJSXChild = state.inJSXChild;
	        origInJSXTag = state.inJSXTag;
	        state.inJSXChild = false;
	        state.inJSXTag = true;
	        expect('<');
	        expect('/');
	        name = parseJSXElementName();
	        // Because advance() (called by lex() called by expect()) expects there
	        // to be a valid token after >, it needs to know whether to look for a
	        // standard JS token or an JSX text node
	        state.inJSXChild = origInJSXChild;
	        state.inJSXTag = origInJSXTag;
	        expect('>');
	        return markerApply(marker, delegate.createJSXClosingElement(name));
	    }

	    function parseJSXOpeningElement() {
	        var name, attributes = [], selfClosing = false, origInJSXChild, origInJSXTag, marker = markerCreate();

	        origInJSXChild = state.inJSXChild;
	        origInJSXTag = state.inJSXTag;
	        state.inJSXChild = false;
	        state.inJSXTag = true;

	        expect('<');

	        name = parseJSXElementName();

	        while (index < length &&
	                lookahead.value !== '/' &&
	                lookahead.value !== '>') {
	            attributes.push(parseJSXAttribute());
	        }

	        state.inJSXTag = origInJSXTag;

	        if (lookahead.value === '/') {
	            expect('/');
	            // Because advance() (called by lex() called by expect()) expects
	            // there to be a valid token after >, it needs to know whether to
	            // look for a standard JS token or an JSX text node
	            state.inJSXChild = origInJSXChild;
	            expect('>');
	            selfClosing = true;
	        } else {
	            state.inJSXChild = true;
	            expect('>');
	        }
	        return markerApply(marker, delegate.createJSXOpeningElement(name, attributes, selfClosing));
	    }

	    function parseJSXElement() {
	        var openingElement, closingElement = null, children = [], origInJSXChild, origInJSXTag, marker = markerCreate();

	        origInJSXChild = state.inJSXChild;
	        origInJSXTag = state.inJSXTag;
	        openingElement = parseJSXOpeningElement();

	        if (!openingElement.selfClosing) {
	            while (index < length) {
	                state.inJSXChild = false; // Call lookahead2() with inJSXChild = false because </ should not be considered in the child
	                if (lookahead.value === '<' && lookahead2().value === '/') {
	                    break;
	                }
	                state.inJSXChild = true;
	                children.push(parseJSXChild());
	            }
	            state.inJSXChild = origInJSXChild;
	            state.inJSXTag = origInJSXTag;
	            closingElement = parseJSXClosingElement();
	            if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
	                throwError({}, Messages.ExpectedJSXClosingTag, getQualifiedJSXName(openingElement.name));
	            }
	        }

	        // When (erroneously) writing two adjacent tags like
	        //
	        //     var x = <div>one</div><div>two</div>;
	        //
	        // the default error message is a bit incomprehensible. Since it's
	        // rarely (never?) useful to write a less-than sign after an JSX
	        // element, we disallow it here in the parser in order to provide a
	        // better error message. (In the rare case that the less-than operator
	        // was intended, the left tag can be wrapped in parentheses.)
	        if (!origInJSXChild && match('<')) {
	            throwError(lookahead, Messages.AdjacentJSXElements);
	        }

	        return markerApply(marker, delegate.createJSXElement(openingElement, closingElement, children));
	    }

	    function parseTypeAlias() {
	        var id, marker = markerCreate(), typeParameters = null, right;
	        expectContextualKeyword('type');
	        id = parseVariableIdentifier();
	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }
	        expect('=');
	        right = parseType();
	        consumeSemicolon();
	        return markerApply(marker, delegate.createTypeAlias(id, typeParameters, right));
	    }

	    function parseInterfaceExtends() {
	        var marker = markerCreate(), id, typeParameters = null;

	        id = parseVariableIdentifier();
	        if (match('<')) {
	            typeParameters = parseTypeParameterInstantiation();
	        }

	        return markerApply(marker, delegate.createInterfaceExtends(
	            id,
	            typeParameters
	        ));
	    }

	    function parseInterfaceish(marker, allowStatic) {
	        var body, bodyMarker, extended = [], id,
	            typeParameters = null;

	        id = parseVariableIdentifier();
	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }

	        if (matchKeyword('extends')) {
	            expectKeyword('extends');

	            while (index < length) {
	                extended.push(parseInterfaceExtends());
	                if (!match(',')) {
	                    break;
	                }
	                expect(',');
	            }
	        }

	        bodyMarker = markerCreate();
	        body = markerApply(bodyMarker, parseObjectType(allowStatic));

	        return markerApply(marker, delegate.createInterface(
	            id,
	            typeParameters,
	            body,
	            extended
	        ));
	    }

	    function parseInterface() {
	        var marker = markerCreate();

	        if (strict) {
	            expectKeyword('interface');
	        } else {
	            expectContextualKeyword('interface');
	        }

	        return parseInterfaceish(marker, /* allowStatic */false);
	    }

	    function parseDeclareClass() {
	        var marker = markerCreate(), ret;
	        expectContextualKeyword('declare');
	        expectKeyword('class');

	        ret = parseInterfaceish(marker, /* allowStatic */true);
	        ret.type = Syntax.DeclareClass;
	        return ret;
	    }

	    function parseDeclareFunction() {
	        var id, idMarker,
	            marker = markerCreate(), params, returnType, rest, tmp,
	            typeParameters = null, value, valueMarker;

	        expectContextualKeyword('declare');
	        expectKeyword('function');
	        idMarker = markerCreate();
	        id = parseVariableIdentifier();

	        valueMarker = markerCreate();
	        if (match('<')) {
	            typeParameters = parseTypeParameterDeclaration();
	        }
	        expect('(');
	        tmp = parseFunctionTypeParams();
	        params = tmp.params;
	        rest = tmp.rest;
	        expect(')');

	        expect(':');
	        returnType = parseType();

	        value = markerApply(valueMarker, delegate.createFunctionTypeAnnotation(
	            params,
	            returnType,
	            rest,
	            typeParameters
	        ));

	        id.typeAnnotation = markerApply(valueMarker, delegate.createTypeAnnotation(
	            value
	        ));
	        markerApply(idMarker, id);

	        consumeSemicolon();

	        return markerApply(marker, delegate.createDeclareFunction(
	            id
	        ));
	    }

	    function parseDeclareVariable() {
	        var id, marker = markerCreate();
	        expectContextualKeyword('declare');
	        expectKeyword('var');
	        id = parseTypeAnnotatableIdentifier();

	        consumeSemicolon();

	        return markerApply(marker, delegate.createDeclareVariable(
	            id
	        ));
	    }

	    function parseDeclareModule() {
	        var body = [], bodyMarker, id, idMarker, marker = markerCreate(), token;
	        expectContextualKeyword('declare');
	        expectContextualKeyword('module');

	        if (lookahead.type === Token.StringLiteral) {
	            if (strict && lookahead.octal) {
	                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
	            }
	            idMarker = markerCreate();
	            id = markerApply(idMarker, delegate.createLiteral(lex()));
	        } else {
	            id = parseVariableIdentifier();
	        }

	        bodyMarker = markerCreate();
	        expect('{');
	        while (index < length && !match('}')) {
	            token = lookahead2();
	            switch (token.value) {
	            case 'class':
	                body.push(parseDeclareClass());
	                break;
	            case 'function':
	                body.push(parseDeclareFunction());
	                break;
	            case 'var':
	                body.push(parseDeclareVariable());
	                break;
	            default:
	                throwUnexpected(lookahead);
	            }
	        }
	        expect('}');

	        return markerApply(marker, delegate.createDeclareModule(
	            id,
	            markerApply(bodyMarker, delegate.createBlockStatement(body))
	        ));
	    }

	    function collectToken() {
	        var loc, token, range, value, entry;

	        /* istanbul ignore else */
	        if (!state.inJSXChild) {
	            skipComment();
	        }

	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart
	            }
	        };

	        token = extra.advance();
	        loc.end = {
	            line: lineNumber,
	            column: index - lineStart
	        };

	        if (token.type !== Token.EOF) {
	            range = [token.range[0], token.range[1]];
	            value = source.slice(token.range[0], token.range[1]);
	            entry = {
	                type: TokenName[token.type],
	                value: value,
	                range: range,
	                loc: loc
	            };
	            if (token.regex) {
	                entry.regex = {
	                    pattern: token.regex.pattern,
	                    flags: token.regex.flags
	                };
	            }
	            extra.tokens.push(entry);
	        }

	        return token;
	    }

	    function collectRegex() {
	        var pos, loc, regex, token;

	        skipComment();

	        pos = index;
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart
	            }
	        };

	        regex = extra.scanRegExp();
	        loc.end = {
	            line: lineNumber,
	            column: index - lineStart
	        };

	        if (!extra.tokenize) {
	            /* istanbul ignore next */
	            // Pop the previous token, which is likely '/' or '/='
	            if (extra.tokens.length > 0) {
	                token = extra.tokens[extra.tokens.length - 1];
	                if (token.range[0] === pos && token.type === 'Punctuator') {
	                    if (token.value === '/' || token.value === '/=') {
	                        extra.tokens.pop();
	                    }
	                }
	            }

	            extra.tokens.push({
	                type: 'RegularExpression',
	                value: regex.literal,
	                regex: regex.regex,
	                range: [pos, index],
	                loc: loc
	            });
	        }

	        return regex;
	    }

	    function filterTokenLocation() {
	        var i, entry, token, tokens = [];

	        for (i = 0; i < extra.tokens.length; ++i) {
	            entry = extra.tokens[i];
	            token = {
	                type: entry.type,
	                value: entry.value
	            };
	            if (entry.regex) {
	                token.regex = {
	                    pattern: entry.regex.pattern,
	                    flags: entry.regex.flags
	                };
	            }
	            if (extra.range) {
	                token.range = entry.range;
	            }
	            if (extra.loc) {
	                token.loc = entry.loc;
	            }
	            tokens.push(token);
	        }

	        extra.tokens = tokens;
	    }

	    function patch() {
	        if (typeof extra.tokens !== 'undefined') {
	            extra.advance = advance;
	            extra.scanRegExp = scanRegExp;

	            advance = collectToken;
	            scanRegExp = collectRegex;
	        }
	    }

	    function unpatch() {
	        if (typeof extra.scanRegExp === 'function') {
	            advance = extra.advance;
	            scanRegExp = extra.scanRegExp;
	        }
	    }

	    // This is used to modify the delegate.

	    function extend(object, properties) {
	        var entry, result = {};

	        for (entry in object) {
	            /* istanbul ignore else */
	            if (object.hasOwnProperty(entry)) {
	                result[entry] = object[entry];
	            }
	        }

	        for (entry in properties) {
	            /* istanbul ignore else */
	            if (properties.hasOwnProperty(entry)) {
	                result[entry] = properties[entry];
	            }
	        }

	        return result;
	    }

	    function tokenize(code, options) {
	        var toString,
	            token,
	            tokens;

	        toString = String;
	        if (typeof code !== 'string' && !(code instanceof String)) {
	            code = toString(code);
	        }

	        delegate = SyntaxTreeDelegate;
	        source = code;
	        index = 0;
	        lineNumber = (source.length > 0) ? 1 : 0;
	        lineStart = 0;
	        length = source.length;
	        lookahead = null;
	        state = {
	            allowKeyword: true,
	            allowIn: true,
	            labelSet: new StringMap(),
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            lastCommentStart: -1
	        };

	        extra = {};

	        // Options matching.
	        options = options || {};

	        // Of course we collect tokens here.
	        options.tokens = true;
	        extra.tokens = [];
	        extra.tokenize = true;
	        // The following two fields are necessary to compute the Regex tokens.
	        extra.openParenToken = -1;
	        extra.openCurlyToken = -1;

	        extra.range = (typeof options.range === 'boolean') && options.range;
	        extra.loc = (typeof options.loc === 'boolean') && options.loc;

	        if (typeof options.comment === 'boolean' && options.comment) {
	            extra.comments = [];
	        }
	        if (typeof options.tolerant === 'boolean' && options.tolerant) {
	            extra.errors = [];
	        }

	        patch();

	        try {
	            peek();
	            if (lookahead.type === Token.EOF) {
	                return extra.tokens;
	            }

	            token = lex();
	            while (lookahead.type !== Token.EOF) {
	                try {
	                    token = lex();
	                } catch (lexError) {
	                    token = lookahead;
	                    if (extra.errors) {
	                        extra.errors.push(lexError);
	                        // We have to break on the first error
	                        // to avoid infinite loops.
	                        break;
	                    } else {
	                        throw lexError;
	                    }
	                }
	            }

	            filterTokenLocation();
	            tokens = extra.tokens;
	            if (typeof extra.comments !== 'undefined') {
	                tokens.comments = extra.comments;
	            }
	            if (typeof extra.errors !== 'undefined') {
	                tokens.errors = extra.errors;
	            }
	        } catch (e) {
	            throw e;
	        } finally {
	            unpatch();
	            extra = {};
	        }
	        return tokens;
	    }

	    function parse(code, options) {
	        var program, toString;

	        toString = String;
	        if (typeof code !== 'string' && !(code instanceof String)) {
	            code = toString(code);
	        }

	        delegate = SyntaxTreeDelegate;
	        source = code;
	        index = 0;
	        lineNumber = (source.length > 0) ? 1 : 0;
	        lineStart = 0;
	        length = source.length;
	        lookahead = null;
	        state = {
	            allowKeyword: false,
	            allowIn: true,
	            labelSet: new StringMap(),
	            parenthesizedCount: 0,
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            inJSXChild: false,
	            inJSXTag: false,
	            inType: false,
	            lastCommentStart: -1,
	            yieldAllowed: false,
	            awaitAllowed: false
	        };

	        extra = {};
	        if (typeof options !== 'undefined') {
	            extra.range = (typeof options.range === 'boolean') && options.range;
	            extra.loc = (typeof options.loc === 'boolean') && options.loc;
	            extra.attachComment = (typeof options.attachComment === 'boolean') && options.attachComment;

	            if (extra.loc && options.source !== null && options.source !== undefined) {
	                delegate = extend(delegate, {
	                    'postProcess': function (node) {
	                        node.loc.source = toString(options.source);
	                        return node;
	                    }
	                });
	            }

	            extra.sourceType = options.sourceType;
	            if (typeof options.tokens === 'boolean' && options.tokens) {
	                extra.tokens = [];
	            }
	            if (typeof options.comment === 'boolean' && options.comment) {
	                extra.comments = [];
	            }
	            if (typeof options.tolerant === 'boolean' && options.tolerant) {
	                extra.errors = [];
	            }
	            if (extra.attachComment) {
	                extra.range = true;
	                extra.comments = [];
	                extra.bottomRightStack = [];
	                extra.trailingComments = [];
	                extra.leadingComments = [];
	            }
	        }

	        patch();
	        try {
	            program = parseProgram();
	            if (typeof extra.comments !== 'undefined') {
	                program.comments = extra.comments;
	            }
	            if (typeof extra.tokens !== 'undefined') {
	                filterTokenLocation();
	                program.tokens = extra.tokens;
	            }
	            if (typeof extra.errors !== 'undefined') {
	                program.errors = extra.errors;
	            }
	        } catch (e) {
	            throw e;
	        } finally {
	            unpatch();
	            extra = {};
	        }

	        return program;
	    }

	    // Sync with *.json manifests.
	    exports.version = '13001.1001.0-dev-harmony-fb';

	    exports.tokenize = tokenize;

	    exports.parse = parse;

	    // Deep copy.
	   /* istanbul ignore next */
	    exports.Syntax = (function () {
	        var name, types = {};

	        if (typeof Object.create === 'function') {
	            types = Object.create(null);
	        }

	        for (name in Syntax) {
	            if (Syntax.hasOwnProperty(name)) {
	                types[name] = Syntax[name];
	            }
	        }

	        if (typeof Object.freeze === 'function') {
	            Object.freeze(types);
	        }

	        return types;
	    }());

	}));
	/* vim: set sw=4 ts=4 et tw=80 : */


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var base64 = __webpack_require__(111);

	  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
	  // length quantities we use in the source map spec, the first bit is the sign,
	  // the next four bits are the actual value, and the 6th bit is the
	  // continuation bit. The continuation bit tells us whether there are more
	  // digits in this value following this digit.
	  //
	  //   Continuation
	  //   |    Sign
	  //   |    |
	  //   V    V
	  //   101011

	  var VLQ_BASE_SHIFT = 5;

	  // binary: 100000
	  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	  // binary: 011111
	  var VLQ_BASE_MASK = VLQ_BASE - 1;

	  // binary: 100000
	  var VLQ_CONTINUATION_BIT = VLQ_BASE;

	  /**
	   * Converts from a two-complement value to a value where the sign bit is
	   * placed in the least significant bit.  For example, as decimals:
	   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	   */
	  function toVLQSigned(aValue) {
	    return aValue < 0
	      ? ((-aValue) << 1) + 1
	      : (aValue << 1) + 0;
	  }

	  /**
	   * Converts to a two-complement value from a value where the sign bit is
	   * placed in the least significant bit.  For example, as decimals:
	   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	   */
	  function fromVLQSigned(aValue) {
	    var isNegative = (aValue & 1) === 1;
	    var shifted = aValue >> 1;
	    return isNegative
	      ? -shifted
	      : shifted;
	  }

	  /**
	   * Returns the base 64 VLQ encoded value.
	   */
	  exports.encode = function base64VLQ_encode(aValue) {
	    var encoded = "";
	    var digit;

	    var vlq = toVLQSigned(aValue);

	    do {
	      digit = vlq & VLQ_BASE_MASK;
	      vlq >>>= VLQ_BASE_SHIFT;
	      if (vlq > 0) {
	        // There are still more digits in this value, so we must make sure the
	        // continuation bit is marked.
	        digit |= VLQ_CONTINUATION_BIT;
	      }
	      encoded += base64.encode(digit);
	    } while (vlq > 0);

	    return encoded;
	  };

	  /**
	   * Decodes the next base 64 VLQ value from the given string and returns the
	   * value and the rest of the string via the out parameter.
	   */
	  exports.decode = function base64VLQ_decode(aStr, aOutParam) {
	    var i = 0;
	    var strLen = aStr.length;
	    var result = 0;
	    var shift = 0;
	    var continuation, digit;

	    do {
	      if (i >= strLen) {
	        throw new Error("Expected more digits in base 64 VLQ value.");
	      }
	      digit = base64.decode(aStr.charAt(i++));
	      continuation = !!(digit & VLQ_CONTINUATION_BIT);
	      digit &= VLQ_BASE_MASK;
	      result = result + (digit << shift);
	      shift += VLQ_BASE_SHIFT;
	    } while (continuation);

	    aOutParam.value = fromVLQSigned(result);
	    aOutParam.rest = aStr.slice(i);
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  /**
	   * This is a helper function for getting values from parameter/options
	   * objects.
	   *
	   * @param args The object we are extracting values from
	   * @param name The name of the property we are getting.
	   * @param defaultValue An optional value to return if the property is missing
	   * from the object. If this is not specified and the property is missing, an
	   * error will be thrown.
	   */
	  function getArg(aArgs, aName, aDefaultValue) {
	    if (aName in aArgs) {
	      return aArgs[aName];
	    } else if (arguments.length === 3) {
	      return aDefaultValue;
	    } else {
	      throw new Error('"' + aName + '" is a required argument.');
	    }
	  }
	  exports.getArg = getArg;

	  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	  var dataUrlRegexp = /^data:.+\,.+$/;

	  function urlParse(aUrl) {
	    var match = aUrl.match(urlRegexp);
	    if (!match) {
	      return null;
	    }
	    return {
	      scheme: match[1],
	      auth: match[2],
	      host: match[3],
	      port: match[4],
	      path: match[5]
	    };
	  }
	  exports.urlParse = urlParse;

	  function urlGenerate(aParsedUrl) {
	    var url = '';
	    if (aParsedUrl.scheme) {
	      url += aParsedUrl.scheme + ':';
	    }
	    url += '//';
	    if (aParsedUrl.auth) {
	      url += aParsedUrl.auth + '@';
	    }
	    if (aParsedUrl.host) {
	      url += aParsedUrl.host;
	    }
	    if (aParsedUrl.port) {
	      url += ":" + aParsedUrl.port
	    }
	    if (aParsedUrl.path) {
	      url += aParsedUrl.path;
	    }
	    return url;
	  }
	  exports.urlGenerate = urlGenerate;

	  /**
	   * Normalizes a path, or the path portion of a URL:
	   *
	   * - Replaces consequtive slashes with one slash.
	   * - Removes unnecessary '.' parts.
	   * - Removes unnecessary '<dir>/..' parts.
	   *
	   * Based on code in the Node.js 'path' core module.
	   *
	   * @param aPath The path or url to normalize.
	   */
	  function normalize(aPath) {
	    var path = aPath;
	    var url = urlParse(aPath);
	    if (url) {
	      if (!url.path) {
	        return aPath;
	      }
	      path = url.path;
	    }
	    var isAbsolute = (path.charAt(0) === '/');

	    var parts = path.split(/\/+/);
	    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	      part = parts[i];
	      if (part === '.') {
	        parts.splice(i, 1);
	      } else if (part === '..') {
	        up++;
	      } else if (up > 0) {
	        if (part === '') {
	          // The first part is blank if the path is absolute. Trying to go
	          // above the root is a no-op. Therefore we can remove all '..' parts
	          // directly after the root.
	          parts.splice(i + 1, up);
	          up = 0;
	        } else {
	          parts.splice(i, 2);
	          up--;
	        }
	      }
	    }
	    path = parts.join('/');

	    if (path === '') {
	      path = isAbsolute ? '/' : '.';
	    }

	    if (url) {
	      url.path = path;
	      return urlGenerate(url);
	    }
	    return path;
	  }
	  exports.normalize = normalize;

	  /**
	   * Joins two paths/URLs.
	   *
	   * @param aRoot The root path or URL.
	   * @param aPath The path or URL to be joined with the root.
	   *
	   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	   *   first.
	   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	   *   is updated with the result and aRoot is returned. Otherwise the result
	   *   is returned.
	   *   - If aPath is absolute, the result is aPath.
	   *   - Otherwise the two paths are joined with a slash.
	   * - Joining for example 'http://' and 'www.example.com' is also supported.
	   */
	  function join(aRoot, aPath) {
	    if (aRoot === "") {
	      aRoot = ".";
	    }
	    if (aPath === "") {
	      aPath = ".";
	    }
	    var aPathUrl = urlParse(aPath);
	    var aRootUrl = urlParse(aRoot);
	    if (aRootUrl) {
	      aRoot = aRootUrl.path || '/';
	    }

	    // `join(foo, '//www.example.org')`
	    if (aPathUrl && !aPathUrl.scheme) {
	      if (aRootUrl) {
	        aPathUrl.scheme = aRootUrl.scheme;
	      }
	      return urlGenerate(aPathUrl);
	    }

	    if (aPathUrl || aPath.match(dataUrlRegexp)) {
	      return aPath;
	    }

	    // `join('http://', 'www.example.com')`
	    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	      aRootUrl.host = aPath;
	      return urlGenerate(aRootUrl);
	    }

	    var joined = aPath.charAt(0) === '/'
	      ? aPath
	      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

	    if (aRootUrl) {
	      aRootUrl.path = joined;
	      return urlGenerate(aRootUrl);
	    }
	    return joined;
	  }
	  exports.join = join;

	  /**
	   * Make a path relative to a URL or another path.
	   *
	   * @param aRoot The root path or URL.
	   * @param aPath The path or URL to be made relative to aRoot.
	   */
	  function relative(aRoot, aPath) {
	    if (aRoot === "") {
	      aRoot = ".";
	    }

	    aRoot = aRoot.replace(/\/$/, '');

	    // XXX: It is possible to remove this block, and the tests still pass!
	    var url = urlParse(aRoot);
	    if (aPath.charAt(0) == "/" && url && url.path == "/") {
	      return aPath.slice(1);
	    }

	    return aPath.indexOf(aRoot + '/') === 0
	      ? aPath.substr(aRoot.length + 1)
	      : aPath;
	  }
	  exports.relative = relative;

	  /**
	   * Because behavior goes wacky when you set `__proto__` on objects, we
	   * have to prefix all the strings in our set with an arbitrary character.
	   *
	   * See https://github.com/mozilla/source-map/pull/31 and
	   * https://github.com/mozilla/source-map/issues/30
	   *
	   * @param String aStr
	   */
	  function toSetString(aStr) {
	    return '$' + aStr;
	  }
	  exports.toSetString = toSetString;

	  function fromSetString(aStr) {
	    return aStr.substr(1);
	  }
	  exports.fromSetString = fromSetString;

	  function strcmp(aStr1, aStr2) {
	    var s1 = aStr1 || "";
	    var s2 = aStr2 || "";
	    return (s1 > s2) - (s1 < s2);
	  }

	  /**
	   * Comparator between two mappings where the original positions are compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same original source/line/column, but different generated
	   * line and column the same. Useful when searching for a mapping with a
	   * stubbed out mapping.
	   */
	  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	    var cmp;

	    cmp = strcmp(mappingA.source, mappingB.source);
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp || onlyCompareOriginal) {
	      return cmp;
	    }

	    cmp = strcmp(mappingA.name, mappingB.name);
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp) {
	      return cmp;
	    }

	    return mappingA.generatedColumn - mappingB.generatedColumn;
	  };
	  exports.compareByOriginalPositions = compareByOriginalPositions;

	  /**
	   * Comparator between two mappings where the generated positions are
	   * compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same generated line and column, but different
	   * source/name/original line and column the same. Useful when searching for a
	   * mapping with a stubbed out mapping.
	   */
	  function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
	    var cmp;

	    cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	    if (cmp || onlyCompareGenerated) {
	      return cmp;
	    }

	    cmp = strcmp(mappingA.source, mappingB.source);
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp) {
	      return cmp;
	    }

	    return strcmp(mappingA.name, mappingB.name);
	  };
	  exports.compareByGeneratedPositions = compareByGeneratedPositions;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var util = __webpack_require__(86);

	  /**
	   * A data structure which is a combination of an array and a set. Adding a new
	   * member is O(1), testing for membership is O(1), and finding the index of an
	   * element is O(1). Removing elements from the set is not supported. Only
	   * strings are supported for membership.
	   */
	  function ArraySet() {
	    this._array = [];
	    this._set = {};
	  }

	  /**
	   * Static method for creating ArraySet instances from an existing array.
	   */
	  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	    var set = new ArraySet();
	    for (var i = 0, len = aArray.length; i < len; i++) {
	      set.add(aArray[i], aAllowDuplicates);
	    }
	    return set;
	  };

	  /**
	   * Add the given string to this set.
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	    var isDuplicate = this.has(aStr);
	    var idx = this._array.length;
	    if (!isDuplicate || aAllowDuplicates) {
	      this._array.push(aStr);
	    }
	    if (!isDuplicate) {
	      this._set[util.toSetString(aStr)] = idx;
	    }
	  };

	  /**
	   * Is the given string a member of this set?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.has = function ArraySet_has(aStr) {
	    return Object.prototype.hasOwnProperty.call(this._set,
	                                                util.toSetString(aStr));
	  };

	  /**
	   * What is the index of the given string in the array?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	    if (this.has(aStr)) {
	      return this._set[util.toSetString(aStr)];
	    }
	    throw new Error('"' + aStr + '" is not in the set.');
	  };

	  /**
	   * What is the element at the given index?
	   *
	   * @param Number aIdx
	   */
	  ArraySet.prototype.at = function ArraySet_at(aIdx) {
	    if (aIdx >= 0 && aIdx < this._array.length) {
	      return this._array[aIdx];
	    }
	    throw new Error('No element indexed by ' + aIdx);
	  };

	  /**
	   * Returns the array representation of this set (which has the proper indices
	   * indicated by indexOf). Note that this is a copy of the internal array used
	   * for storing the members so that no one can mess with internal state.
	   */
	  ArraySet.prototype.toArray = function ArraySet_toArray() {
	    return this._array.slice();
	  };

	  exports.ArraySet = ArraySet;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var util = __webpack_require__(86);

	  /**
	   * Determine whether mappingB is after mappingA with respect to generated
	   * position.
	   */
	  function generatedPositionAfter(mappingA, mappingB) {
	    // Optimized for most common case
	    var lineA = mappingA.generatedLine;
	    var lineB = mappingB.generatedLine;
	    var columnA = mappingA.generatedColumn;
	    var columnB = mappingB.generatedColumn;
	    return lineB > lineA || lineB == lineA && columnB >= columnA ||
	           util.compareByGeneratedPositions(mappingA, mappingB) <= 0;
	  }

	  /**
	   * A data structure to provide a sorted view of accumulated mappings in a
	   * performance conscious manner. It trades a neglibable overhead in general
	   * case for a large speedup in case of mappings being added in order.
	   */
	  function MappingList() {
	    this._array = [];
	    this._sorted = true;
	    // Serves as infimum
	    this._last = {generatedLine: -1, generatedColumn: 0};
	  }

	  /**
	   * Iterate through internal items. This method takes the same arguments that
	   * `Array.prototype.forEach` takes.
	   *
	   * NOTE: The order of the mappings is NOT guaranteed.
	   */
	  MappingList.prototype.unsortedForEach =
	    function MappingList_forEach(aCallback, aThisArg) {
	      this._array.forEach(aCallback, aThisArg);
	    };

	  /**
	   * Add the given source mapping.
	   *
	   * @param Object aMapping
	   */
	  MappingList.prototype.add = function MappingList_add(aMapping) {
	    var mapping;
	    if (generatedPositionAfter(this._last, aMapping)) {
	      this._last = aMapping;
	      this._array.push(aMapping);
	    } else {
	      this._sorted = false;
	      this._array.push(aMapping);
	    }
	  };

	  /**
	   * Returns the flat, sorted array of mappings. The mappings are sorted by
	   * generated position.
	   *
	   * WARNING: This method returns internal data without copying, for
	   * performance. The return value must NOT be mutated, and should be treated as
	   * an immutable borrow. If you want to take ownership, you must make your own
	   * copy.
	   */
	  MappingList.prototype.toArray = function MappingList_toArray() {
	    if (!this._sorted) {
	      this._array.sort(util.compareByGeneratedPositions);
	      this._sorted = true;
	    }
	    return this._array;
	  };

	  exports.MappingList = MappingList;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  /**
	   * Recursive implementation of binary search.
	   *
	   * @param aLow Indices here and lower do not contain the needle.
	   * @param aHigh Indices here and higher do not contain the needle.
	   * @param aNeedle The element being searched for.
	   * @param aHaystack The non-empty array being searched.
	   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	   */
	  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
	    // This function terminates when one of the following is true:
	    //
	    //   1. We find the exact element we are looking for.
	    //
	    //   2. We did not find the exact element, but we can return the index of
	    //      the next closest element that is less than that element.
	    //
	    //   3. We did not find the exact element, and there is no next-closest
	    //      element which is less than the one we are searching for, so we
	    //      return -1.
	    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	    var cmp = aCompare(aNeedle, aHaystack[mid], true);
	    if (cmp === 0) {
	      // Found the element we are looking for.
	      return mid;
	    }
	    else if (cmp > 0) {
	      // aHaystack[mid] is greater than our needle.
	      if (aHigh - mid > 1) {
	        // The element is in the upper half.
	        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
	      }
	      // We did not find an exact match, return the next closest one
	      // (termination case 2).
	      return mid;
	    }
	    else {
	      // aHaystack[mid] is less than our needle.
	      if (mid - aLow > 1) {
	        // The element is in the lower half.
	        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
	      }
	      // The exact needle element was not found in this haystack. Determine if
	      // we are in termination case (2) or (3) and return the appropriate thing.
	      return aLow < 0 ? -1 : aLow;
	    }
	  }

	  /**
	   * This is an implementation of binary search which will always try and return
	   * the index of next lowest value checked if there is no exact hit. This is
	   * because mappings between original and generated line/col pairs are single
	   * points, and there is an implicit region between each of them, so a miss
	   * just means that you aren't on the very start of a region.
	   *
	   * @param aNeedle The element you are looking for.
	   * @param aHaystack The array that is being searched.
	   * @param aCompare A function which takes the needle and an element in the
	   *     array and returns -1, 0, or 1 depending on whether the needle is less
	   *     than, equal to, or greater than the element, respectively.
	   */
	  exports.search = function search(aNeedle, aHaystack, aCompare) {
	    if (aHaystack.length === 0) {
	      return -1;
	    }
	    return recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseToString = __webpack_require__(92);

	/** Used to match HTML entities and HTML characters. */
	var reUnescapedHtml = /[&<>"'`]/g,
	    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	/** Used to map characters to HTML entities. */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '`': '&#96;'
	};

	/**
	 * Used by `_.escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeHtmlChar(chr) {
	  return htmlEscapes[chr];
	}

	/**
	 * Converts the characters "&", "<", ">", '"', "'", and '`', in `string` to
	 * their corresponding HTML entities.
	 *
	 * **Note:** No other characters are escaped. To escape additional characters
	 * use a third-party library like [_he_](https://mths.be/he).
	 *
	 * Though the ">" character is escaped for symmetry, characters like
	 * ">" and "/" don't require escaping in HTML and have no special meaning
	 * unless they're part of a tag or unquoted attribute value.
	 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	 * (under "semi-related fun fact") for more details.
	 *
	 * Backticks are escaped because in Internet Explorer < 9, they can break out
	 * of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
	 * [#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
	 * the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
	 *
	 * When working with HTML you should always quote attribute values to reduce
	 * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('fred, barney, & pebbles');
	 * // => 'fred, barney, &amp; pebbles'
	 */
	function escape(string) {
	  // Reset `lastIndex` because in IE < 9 `String#replace` does not.
	  string = baseToString(string);
	  return (string && reHasUnescapedHtml.test(string))
	    ? string.replace(reUnescapedHtml, escapeHtmlChar)
	    : string;
	}

	module.exports = escape;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * returned by `keysFunc`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  var index = -1,
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = object[props[index]];
	  }
	  return result;
	}

	module.exports = baseValues;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = +value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return type == 'function' || (!!value && type == 'object');
	}

	module.exports = isIterateeCall;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/**
	 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
	 * In addition to special characters the forward slash is escaped to allow for
	 * easier `eval` use and `Function` compilation.
	 */
	var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : (value + '');
	}

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  escapeRegExp(objToString)
	  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (objToString.call(value) == funcTag) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	/**
	 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return (string && reHasRegExpChars.test(string))
	    ? string.replace(reRegExpChars, '\\$&')
	    : string;
	}

	module.exports = isNative;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(124),
	    isArray = __webpack_require__(125),
	    isNative = __webpack_require__(95);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * An object environment feature flags.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};

	(function(x) {
	  var Ctor = function() { this.x = x; },
	      args = arguments,
	      object = { '0': x, 'length': x },
	      props = [];

	  Ctor.prototype = { 'valueOf': x, 'y': x };
	  for (var key in new Ctor) { props.push(key); }

	  /**
	   * Detect if `arguments` object indexes are non-enumerable.
	   *
	   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	   * checks for indexes that exceed the number of function parameters and
	   * whose associated argument values are `0`.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  try {
	    support.nonEnumArgs = !propertyIsEnumerable.call(args, 1);
	  } catch(e) {
	    support.nonEnumArgs = true;
	  }
	}(1, 0));

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = +value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = length && isLength(length) &&
	    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return type == 'function' || (!!value && type == 'object');
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object != null && object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var reInterpolate = __webpack_require__(53),
	    escape = __webpack_require__(90);

	/** Used to match template delimiters. */
	var reEscape = /<%-([\s\S]+?)%>/g,
	    reEvaluate = /<%([\s\S]+?)%>/g;

	/**
	 * By default, the template delimiters used by lodash are like those in
	 * embedded Ruby (ERB). Change the following template settings to use
	 * alternative delimiters.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var templateSettings = {

	  /**
	   * Used to detect `data` property values to be HTML-escaped.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'escape': reEscape,

	  /**
	   * Used to detect code to be evaluated.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'evaluate': reEvaluate,

	  /**
	   * Used to detect `data` property values to inject.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'interpolate': reInterpolate,

	  /**
	   * Used to reference the data object in the template text.
	   *
	   * @memberOf _.templateSettings
	   * @type string
	   */
	  'variable': '',

	  /**
	   * Used to import variables into the compiled template.
	   *
	   * @memberOf _.templateSettings
	   * @type Object
	   */
	  'imports': {

	    /**
	     * A reference to the `lodash` function.
	     *
	     * @memberOf _.templateSettings.imports
	     * @type Function
	     */
	    '_': { 'escape': escape }
	  }
	};

	module.exports = templateSettings;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113);
	exports.Stream = __webpack_require__(56);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(114);
	exports.Duplex = __webpack_require__(112);
	exports.Transform = __webpack_require__(115);
	exports.PassThrough = __webpack_require__(116);


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(114)


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(112)


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(115)


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(116)


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var stream = __webpack_require__(127);

	var duplex2 = module.exports = function duplex2(options, writable, readable) {
	  return new DuplexWrapper(options, writable, readable);
	};

	var DuplexWrapper = exports.DuplexWrapper = function DuplexWrapper(options, writable, readable) {
	  if (typeof readable === "undefined") {
	    readable = writable;
	    writable = options;
	    options = null;
	  }

	  options = options || {};
	  options.objectMode = true;

	  stream.Duplex.call(this, options);

	  this._bubbleErrors = (typeof options.bubbleErrors === "undefined") || !!options.bubbleErrors;

	  this._writable = writable;
	  this._readable = readable;

	  var self = this;

	  writable.once("finish", function() {
	    self.end();
	  });

	  this.once("finish", function() {
	    writable.end();
	  });

	  readable.on("data", function(e) {
	    if (!self.push(e)) {
	      readable.pause();
	    }
	  });

	  readable.once("end", function() {
	    return self.push(null);
	  });

	  if (this._bubbleErrors) {
	    writable.on("error", function(err) {
	      return self.emit("error", err);
	    });

	    readable.on("error", function(err) {
	      return self.emit("error", err);
	    });
	  }
	};
	DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, {constructor: {value: DuplexWrapper}});

	DuplexWrapper.prototype._write = function _write(input, encoding, done) {
	  this._writable.write(input, encoding, done);
	};

	DuplexWrapper.prototype._read = function _read(n) {
	  this._readable.resume();
	};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2009-2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE.txt or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	exports.SourceMapGenerator = __webpack_require__(119).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(120).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(121).SourceNode;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(122);
	util.inherits = __webpack_require__(123);
	/*</replacement>*/

	var Readable = __webpack_require__(117);
	var Writable = __webpack_require__(118);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var Base62 = (function (my) {
	  my.chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

	  my.encode = function(i){
	    if (i === 0) {return '0'}
	    var s = ''
	    while (i > 0) {
	      s = this.chars[i % 62] + s
	      i = Math.floor(i/62)
	    }
	    return s
	  };
	  my.decode = function(a,b,c,d){
	    for (
	      b = c = (
	        a === (/\W|_|^$/.test(a += "") || a)
	      ) - 1;
	      d = a.charCodeAt(c++);
	    )
	    b = b * 62 + d - [, 48, 29, 87][d >> 5];
	    return b
	  };

	  return my;
	}({}));

	module.exports = Base62

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function () {
		return /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function () {
		return /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var charToIntMap = {};
	  var intToCharMap = {};

	  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	    .split('')
	    .forEach(function (ch, index) {
	      charToIntMap[ch] = index;
	      intToCharMap[index] = ch;
	    });

	  /**
	   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	   */
	  exports.encode = function base64_encode(aNumber) {
	    if (aNumber in intToCharMap) {
	      return intToCharMap[aNumber];
	    }
	    throw new TypeError("Must be between 0 and 63: " + aNumber);
	  };

	  /**
	   * Decode a single base 64 digit to an integer.
	   */
	  exports.decode = function base64_decode(aChar) {
	    if (aChar in charToIntMap) {
	      return charToIntMap[aChar];
	    }
	    throw new TypeError("Not a valid base 64 digit: " + aChar);
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/

	var Readable = __webpack_require__(113);
	var Writable = __webpack_require__(114);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(132);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(82).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(56);

	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(126);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(112);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(133).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(112);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(133).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/

	var Stream = __webpack_require__(56);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(112);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(112);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(112);

	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(115);

	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(134);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(82).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(56);

	/*<replacement>*/
	var util = __webpack_require__(122);
	util.inherits = __webpack_require__(123);
	/*</replacement>*/

	var StringDecoder;

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = false;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // In streams that never have any data, and do push(null) right away,
	  // the consumer can miss the 'end' event if they do some I/O before
	  // consuming the stream.  So, we don't emit('end') until some reading
	  // happens.
	  this.calledRead = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(135).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (typeof chunk === 'string' && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null || chunk === undefined) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      // update the buffer info.
	      state.length += state.objectMode ? 1 : chunk.length;
	      if (addToFront) {
	        state.buffer.unshift(chunk);
	      } else {
	        state.reading = false;
	        state.buffer.push(chunk);
	      }

	      if (state.needReadable)
	        emitReadable(stream);

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(135).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (n === null || isNaN(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  var state = this._readableState;
	  state.calledRead = true;
	  var nOrig = n;
	  var ret;

	  if (typeof n !== 'number' || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    ret = null;

	    // In cases where the decoder did not receive enough data
	    // to produce a full chunk, then immediately received an
	    // EOF, state.buffer will contain [<Buffer >, <Buffer 00 ...>].
	    // howMuchToRead will see this and coerce the amount to
	    // read to zero (because it's looking at the length of the
	    // first <Buffer > in state.buffer), and we'll end up here.
	    //
	    // This can only happen via state.decoder -- no other venue
	    // exists for pushing a zero-length chunk into state.buffer
	    // and triggering this behavior. In this case, we return our
	    // remaining data and end the stream, if appropriate.
	    if (state.length > 0 && state.decoder) {
	      ret = fromList(n, state);
	      state.length -= ret.length;
	    }

	    if (state.length === 0)
	      endReadable(this);

	    return ret;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length - n <= state.highWaterMark)
	    doRead = true;

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading)
	    doRead = false;

	  if (doRead) {
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read called its callback synchronously, then `reading`
	  // will be false, and we need to re-evaluate how much data we
	  // can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we happened to read() exactly the remaining amount in the
	  // buffer, and the EOF has been seen at this point, then make sure
	  // that we emit 'end' on the very next tick.
	  if (state.ended && !state.endEmitted && state.length === 0)
	    endReadable(this);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // if we've ended and we have some data left, then emit
	  // 'readable' now to make sure it gets picked up.
	  if (state.length > 0)
	    emitReadable(stream);
	  else
	    endReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (state.emittedReadable)
	    return;

	  state.emittedReadable = true;
	  if (state.sync)
	    process.nextTick(function() {
	      emitReadable_(stream);
	    });
	  else
	    emitReadable_(stream);
	}

	function emitReadable_(stream) {
	  stream.emit('readable');
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    if (readable !== src) return;
	    cleanup();
	  }

	  function onend() {
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (!dest._writableState || dest._writableState.needDrain)
	      ondrain();
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    // the handler that waits for readable events after all
	    // the data gets sucked out in flow.
	    // This would be easier to follow with a .once() handler
	    // in flow(), but that is too slow.
	    this.on('readable', pipeOnReadable);

	    state.flowing = true;
	    process.nextTick(function() {
	      flow(src);
	    });
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var dest = this;
	    var state = src._readableState;
	    state.awaitDrain--;
	    if (state.awaitDrain === 0)
	      flow(src);
	  };
	}

	function flow(src) {
	  var state = src._readableState;
	  var chunk;
	  state.awaitDrain = 0;

	  function write(dest, i, list) {
	    var written = dest.write(chunk);
	    if (false === written) {
	      state.awaitDrain++;
	    }
	  }

	  while (state.pipesCount && null !== (chunk = src.read())) {

	    if (state.pipesCount === 1)
	      write(state.pipes, 0, null);
	    else
	      forEach(state.pipes, write);

	    src.emit('data', chunk);

	    // if anyone needs a drain, then we have to wait for that.
	    if (state.awaitDrain > 0)
	      return;
	  }

	  // if every destination was unpiped, either before entering this
	  // function, or in the while loop, then stop flowing.
	  //
	  // NB: This is a pretty rare edge case.
	  if (state.pipesCount === 0) {
	    state.flowing = false;

	    // if there were data event listeners added, then switch to old mode.
	    if (EE.listenerCount(src, 'data') > 0)
	      emitDataEvents(src);
	    return;
	  }

	  // at this point, no one needed a drain, so we just ran out of data
	  // on the next readable event, start it over again.
	  state.ranOut = true;
	}

	function pipeOnReadable() {
	  if (this._readableState.ranOut) {
	    this._readableState.ranOut = false;
	    flow(this);
	  }
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data' && !this._readableState.flowing)
	    emitDataEvents(this);

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        this.read(0);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  emitDataEvents(this);
	  this.read(0);
	  this.emit('resume');
	};

	Readable.prototype.pause = function() {
	  emitDataEvents(this, true);
	  this.emit('pause');
	};

	function emitDataEvents(stream, startPaused) {
	  var state = stream._readableState;

	  if (state.flowing) {
	    // https://github.com/isaacs/readable-stream/issues/16
	    throw new Error('Cannot switch to old mode now.');
	  }

	  var paused = startPaused || false;
	  var readable = false;

	  // convert to an old-style stream.
	  stream.readable = true;
	  stream.pipe = Stream.prototype.pipe;
	  stream.on = stream.addListener = Stream.prototype.on;

	  stream.on('readable', function() {
	    readable = true;

	    var c;
	    while (!paused && (null !== (c = stream.read())))
	      stream.emit('data', c);

	    if (c === null) {
	      readable = false;
	      stream._readableState.needReadable = true;
	    }
	  });

	  stream.pause = function() {
	    paused = true;
	    this.emit('pause');
	  };

	  stream.resume = function() {
	    paused = false;
	    if (readable)
	      process.nextTick(function() {
	        stream.emit('readable');
	      });
	    else
	      this.read(0);
	    this.emit('resume');
	  };

	  // now make it start, just in case it hadn't already.
	  stream.emit('readable');
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    //if (state.objectMode && util.isNullOrUndefined(chunk))
	    if (state.objectMode && (chunk === null || chunk === undefined))
	      return;
	    else if (!state.objectMode && (!chunk || !chunk.length))
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (typeof stream[i] === 'function' &&
	        typeof this[i] === 'undefined') {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted && state.calledRead) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(122);
	util.inherits = __webpack_require__(123);
	/*</replacement>*/

	var Stream = __webpack_require__(56);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(106);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (typeof cb !== 'function')
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb))
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);

	  return ret;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      typeof chunk === 'string') {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      cb(er);
	    });
	  else
	    cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.bufferProcessing && state.buffer.length)
	      clearBuffer(stream, state);

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  cb();
	  if (finished)
	    finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  for (var c = 0; c < state.buffer.length; c++) {
	    var entry = state.buffer[c];
	    var chunk = entry.chunk;
	    var encoding = entry.encoding;
	    var cb = entry.callback;
	    var len = state.objectMode ? 1 : chunk.length;

	    doWrite(stream, state, len, chunk, encoding, cb);

	    // if we didn't call the onwrite immediately, then
	    // it means that we need to wait until it does.
	    // also, that means that the chunk and cb are currently
	    // being processed, so move the buffer counter past them.
	    if (state.writing) {
	      c++;
	      break;
	    }
	  }

	  state.bufferProcessing = false;
	  if (c < state.buffer.length)
	    state.buffer = state.buffer.slice(c);
	  else
	    state.buffer.length = 0;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (typeof chunk !== 'undefined' && chunk !== null)
	    this.write(chunk, encoding);

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    state.finished = true;
	    stream.emit('finish');
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var base64VLQ = __webpack_require__(131);
	  var util = __webpack_require__(128);
	  var ArraySet = __webpack_require__(130).ArraySet;

	  /**
	   * An instance of the SourceMapGenerator represents a source map which is
	   * being built incrementally. To create a new one, you must pass an object
	   * with the following properties:
	   *
	   *   - file: The filename of the generated source.
	   *   - sourceRoot: An optional root for all URLs in this source map.
	   */
	  function SourceMapGenerator(aArgs) {
	    this._file = util.getArg(aArgs, 'file');
	    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	    this._sources = new ArraySet();
	    this._names = new ArraySet();
	    this._mappings = [];
	    this._sourcesContents = null;
	  }

	  SourceMapGenerator.prototype._version = 3;

	  /**
	   * Creates a new SourceMapGenerator based on a SourceMapConsumer
	   *
	   * @param aSourceMapConsumer The SourceMap.
	   */
	  SourceMapGenerator.fromSourceMap =
	    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	      var sourceRoot = aSourceMapConsumer.sourceRoot;
	      var generator = new SourceMapGenerator({
	        file: aSourceMapConsumer.file,
	        sourceRoot: sourceRoot
	      });
	      aSourceMapConsumer.eachMapping(function (mapping) {
	        var newMapping = {
	          generated: {
	            line: mapping.generatedLine,
	            column: mapping.generatedColumn
	          }
	        };

	        if (mapping.source) {
	          newMapping.source = mapping.source;
	          if (sourceRoot) {
	            newMapping.source = util.relative(sourceRoot, newMapping.source);
	          }

	          newMapping.original = {
	            line: mapping.originalLine,
	            column: mapping.originalColumn
	          };

	          if (mapping.name) {
	            newMapping.name = mapping.name;
	          }
	        }

	        generator.addMapping(newMapping);
	      });
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content) {
	          generator.setSourceContent(sourceFile, content);
	        }
	      });
	      return generator;
	    };

	  /**
	   * Add a single mapping from original source line and column to the generated
	   * source's line and column for this source map being created. The mapping
	   * object should have the following properties:
	   *
	   *   - generated: An object with the generated line and column positions.
	   *   - original: An object with the original line and column positions.
	   *   - source: The original source file (relative to the sourceRoot).
	   *   - name: An optional original token name for this mapping.
	   */
	  SourceMapGenerator.prototype.addMapping =
	    function SourceMapGenerator_addMapping(aArgs) {
	      var generated = util.getArg(aArgs, 'generated');
	      var original = util.getArg(aArgs, 'original', null);
	      var source = util.getArg(aArgs, 'source', null);
	      var name = util.getArg(aArgs, 'name', null);

	      this._validateMapping(generated, original, source, name);

	      if (source && !this._sources.has(source)) {
	        this._sources.add(source);
	      }

	      if (name && !this._names.has(name)) {
	        this._names.add(name);
	      }

	      this._mappings.push({
	        generatedLine: generated.line,
	        generatedColumn: generated.column,
	        originalLine: original != null && original.line,
	        originalColumn: original != null && original.column,
	        source: source,
	        name: name
	      });
	    };

	  /**
	   * Set the source content for a source file.
	   */
	  SourceMapGenerator.prototype.setSourceContent =
	    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	      var source = aSourceFile;
	      if (this._sourceRoot) {
	        source = util.relative(this._sourceRoot, source);
	      }

	      if (aSourceContent !== null) {
	        // Add the source content to the _sourcesContents map.
	        // Create a new _sourcesContents map if the property is null.
	        if (!this._sourcesContents) {
	          this._sourcesContents = {};
	        }
	        this._sourcesContents[util.toSetString(source)] = aSourceContent;
	      } else {
	        // Remove the source file from the _sourcesContents map.
	        // If the _sourcesContents map is empty, set the property to null.
	        delete this._sourcesContents[util.toSetString(source)];
	        if (Object.keys(this._sourcesContents).length === 0) {
	          this._sourcesContents = null;
	        }
	      }
	    };

	  /**
	   * Applies the mappings of a sub-source-map for a specific source file to the
	   * source map being generated. Each mapping to the supplied source file is
	   * rewritten using the supplied source map. Note: The resolution for the
	   * resulting mappings is the minimium of this map and the supplied map.
	   *
	   * @param aSourceMapConsumer The source map to be applied.
	   * @param aSourceFile Optional. The filename of the source file.
	   *        If omitted, SourceMapConsumer's file property will be used.
	   */
	  SourceMapGenerator.prototype.applySourceMap =
	    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile) {
	      // If aSourceFile is omitted, we will use the file property of the SourceMap
	      if (!aSourceFile) {
	        aSourceFile = aSourceMapConsumer.file;
	      }
	      var sourceRoot = this._sourceRoot;
	      // Make "aSourceFile" relative if an absolute Url is passed.
	      if (sourceRoot) {
	        aSourceFile = util.relative(sourceRoot, aSourceFile);
	      }
	      // Applying the SourceMap can add and remove items from the sources and
	      // the names array.
	      var newSources = new ArraySet();
	      var newNames = new ArraySet();

	      // Find mappings for the "aSourceFile"
	      this._mappings.forEach(function (mapping) {
	        if (mapping.source === aSourceFile && mapping.originalLine) {
	          // Check if it can be mapped by the source map, then update the mapping.
	          var original = aSourceMapConsumer.originalPositionFor({
	            line: mapping.originalLine,
	            column: mapping.originalColumn
	          });
	          if (original.source !== null) {
	            // Copy mapping
	            if (sourceRoot) {
	              mapping.source = util.relative(sourceRoot, original.source);
	            } else {
	              mapping.source = original.source;
	            }
	            mapping.originalLine = original.line;
	            mapping.originalColumn = original.column;
	            if (original.name !== null && mapping.name !== null) {
	              // Only use the identifier name if it's an identifier
	              // in both SourceMaps
	              mapping.name = original.name;
	            }
	          }
	        }

	        var source = mapping.source;
	        if (source && !newSources.has(source)) {
	          newSources.add(source);
	        }

	        var name = mapping.name;
	        if (name && !newNames.has(name)) {
	          newNames.add(name);
	        }

	      }, this);
	      this._sources = newSources;
	      this._names = newNames;

	      // Copy sourcesContents of applied map.
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content) {
	          if (sourceRoot) {
	            sourceFile = util.relative(sourceRoot, sourceFile);
	          }
	          this.setSourceContent(sourceFile, content);
	        }
	      }, this);
	    };

	  /**
	   * A mapping can have one of the three levels of data:
	   *
	   *   1. Just the generated position.
	   *   2. The Generated position, original position, and original source.
	   *   3. Generated and original position, original source, as well as a name
	   *      token.
	   *
	   * To maintain consistency, we validate that any new mapping being added falls
	   * in to one of these categories.
	   */
	  SourceMapGenerator.prototype._validateMapping =
	    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                                aName) {
	      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	          && aGenerated.line > 0 && aGenerated.column >= 0
	          && !aOriginal && !aSource && !aName) {
	        // Case 1.
	        return;
	      }
	      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	               && aGenerated.line > 0 && aGenerated.column >= 0
	               && aOriginal.line > 0 && aOriginal.column >= 0
	               && aSource) {
	        // Cases 2 and 3.
	        return;
	      }
	      else {
	        throw new Error('Invalid mapping: ' + JSON.stringify({
	          generated: aGenerated,
	          source: aSource,
	          orginal: aOriginal,
	          name: aName
	        }));
	      }
	    };

	  /**
	   * Serialize the accumulated mappings in to the stream of base 64 VLQs
	   * specified by the source map format.
	   */
	  SourceMapGenerator.prototype._serializeMappings =
	    function SourceMapGenerator_serializeMappings() {
	      var previousGeneratedColumn = 0;
	      var previousGeneratedLine = 1;
	      var previousOriginalColumn = 0;
	      var previousOriginalLine = 0;
	      var previousName = 0;
	      var previousSource = 0;
	      var result = '';
	      var mapping;

	      // The mappings must be guaranteed to be in sorted order before we start
	      // serializing them or else the generated line numbers (which are defined
	      // via the ';' separators) will be all messed up. Note: it might be more
	      // performant to maintain the sorting as we insert them, rather than as we
	      // serialize them, but the big O is the same either way.
	      this._mappings.sort(util.compareByGeneratedPositions);

	      for (var i = 0, len = this._mappings.length; i < len; i++) {
	        mapping = this._mappings[i];

	        if (mapping.generatedLine !== previousGeneratedLine) {
	          previousGeneratedColumn = 0;
	          while (mapping.generatedLine !== previousGeneratedLine) {
	            result += ';';
	            previousGeneratedLine++;
	          }
	        }
	        else {
	          if (i > 0) {
	            if (!util.compareByGeneratedPositions(mapping, this._mappings[i - 1])) {
	              continue;
	            }
	            result += ',';
	          }
	        }

	        result += base64VLQ.encode(mapping.generatedColumn
	                                   - previousGeneratedColumn);
	        previousGeneratedColumn = mapping.generatedColumn;

	        if (mapping.source) {
	          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
	                                     - previousSource);
	          previousSource = this._sources.indexOf(mapping.source);

	          // lines are stored 0-based in SourceMap spec version 3
	          result += base64VLQ.encode(mapping.originalLine - 1
	                                     - previousOriginalLine);
	          previousOriginalLine = mapping.originalLine - 1;

	          result += base64VLQ.encode(mapping.originalColumn
	                                     - previousOriginalColumn);
	          previousOriginalColumn = mapping.originalColumn;

	          if (mapping.name) {
	            result += base64VLQ.encode(this._names.indexOf(mapping.name)
	                                       - previousName);
	            previousName = this._names.indexOf(mapping.name);
	          }
	        }
	      }

	      return result;
	    };

	  SourceMapGenerator.prototype._generateSourcesContent =
	    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	      return aSources.map(function (source) {
	        if (!this._sourcesContents) {
	          return null;
	        }
	        if (aSourceRoot) {
	          source = util.relative(aSourceRoot, source);
	        }
	        var key = util.toSetString(source);
	        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
	                                                    key)
	          ? this._sourcesContents[key]
	          : null;
	      }, this);
	    };

	  /**
	   * Externalize the source map.
	   */
	  SourceMapGenerator.prototype.toJSON =
	    function SourceMapGenerator_toJSON() {
	      var map = {
	        version: this._version,
	        file: this._file,
	        sources: this._sources.toArray(),
	        names: this._names.toArray(),
	        mappings: this._serializeMappings()
	      };
	      if (this._sourceRoot) {
	        map.sourceRoot = this._sourceRoot;
	      }
	      if (this._sourcesContents) {
	        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	      }

	      return map;
	    };

	  /**
	   * Render the source map being generated to a string.
	   */
	  SourceMapGenerator.prototype.toString =
	    function SourceMapGenerator_toString() {
	      return JSON.stringify(this);
	    };

	  exports.SourceMapGenerator = SourceMapGenerator;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var util = __webpack_require__(128);
	  var binarySearch = __webpack_require__(129);
	  var ArraySet = __webpack_require__(130).ArraySet;
	  var base64VLQ = __webpack_require__(131);

	  /**
	   * A SourceMapConsumer instance represents a parsed source map which we can
	   * query for information about the original file positions by giving it a file
	   * position in the generated source.
	   *
	   * The only parameter is the raw source map (either as a JSON string, or
	   * already parsed to an object). According to the spec, source maps have the
	   * following attributes:
	   *
	   *   - version: Which version of the source map spec this map is following.
	   *   - sources: An array of URLs to the original source files.
	   *   - names: An array of identifiers which can be referrenced by individual mappings.
	   *   - sourceRoot: Optional. The URL root from which all sources are relative.
	   *   - sourcesContent: Optional. An array of contents of the original source files.
	   *   - mappings: A string of base64 VLQs which contain the actual mappings.
	   *   - file: The generated file this source map is associated with.
	   *
	   * Here is an example source map, taken from the source map spec[0]:
	   *
	   *     {
	   *       version : 3,
	   *       file: "out.js",
	   *       sourceRoot : "",
	   *       sources: ["foo.js", "bar.js"],
	   *       names: ["src", "maps", "are", "fun"],
	   *       mappings: "AA,AB;;ABCDE;"
	   *     }
	   *
	   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	   */
	  function SourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }

	    var version = util.getArg(sourceMap, 'version');
	    var sources = util.getArg(sourceMap, 'sources');
	    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	    // requires the array) to play nice here.
	    var names = util.getArg(sourceMap, 'names', []);
	    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	    var mappings = util.getArg(sourceMap, 'mappings');
	    var file = util.getArg(sourceMap, 'file', null);

	    // Once again, Sass deviates from the spec and supplies the version as a
	    // string rather than a number, so we use loose equality checking here.
	    if (version != this._version) {
	      throw new Error('Unsupported version: ' + version);
	    }

	    // Pass `true` below to allow duplicate names and sources. While source maps
	    // are intended to be compressed and deduplicated, the TypeScript compiler
	    // sometimes generates source maps with duplicates in them. See Github issue
	    // #72 and bugzil.la/889492.
	    this._names = ArraySet.fromArray(names, true);
	    this._sources = ArraySet.fromArray(sources, true);

	    this.sourceRoot = sourceRoot;
	    this.sourcesContent = sourcesContent;
	    this._mappings = mappings;
	    this.file = file;
	  }

	  /**
	   * Create a SourceMapConsumer from a SourceMapGenerator.
	   *
	   * @param SourceMapGenerator aSourceMap
	   *        The source map that will be consumed.
	   * @returns SourceMapConsumer
	   */
	  SourceMapConsumer.fromSourceMap =
	    function SourceMapConsumer_fromSourceMap(aSourceMap) {
	      var smc = Object.create(SourceMapConsumer.prototype);

	      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	      smc.sourceRoot = aSourceMap._sourceRoot;
	      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                              smc.sourceRoot);
	      smc.file = aSourceMap._file;

	      smc.__generatedMappings = aSourceMap._mappings.slice()
	        .sort(util.compareByGeneratedPositions);
	      smc.__originalMappings = aSourceMap._mappings.slice()
	        .sort(util.compareByOriginalPositions);

	      return smc;
	    };

	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  SourceMapConsumer.prototype._version = 3;

	  /**
	   * The list of original sources.
	   */
	  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
	    get: function () {
	      return this._sources.toArray().map(function (s) {
	        return this.sourceRoot ? util.join(this.sourceRoot, s) : s;
	      }, this);
	    }
	  });

	  // `__generatedMappings` and `__originalMappings` are arrays that hold the
	  // parsed mapping coordinates from the source map's "mappings" attribute. They
	  // are lazily instantiated, accessed via the `_generatedMappings` and
	  // `_originalMappings` getters respectively, and we only parse the mappings
	  // and create these arrays once queried for a source location. We jump through
	  // these hoops because there can be many thousands of mappings, and parsing
	  // them is expensive, so we only want to do it if we must.
	  //
	  // Each object in the arrays is of the form:
	  //
	  //     {
	  //       generatedLine: The line number in the generated code,
	  //       generatedColumn: The column number in the generated code,
	  //       source: The path to the original source file that generated this
	  //               chunk of code,
	  //       originalLine: The line number in the original source that
	  //                     corresponds to this chunk of generated code,
	  //       originalColumn: The column number in the original source that
	  //                       corresponds to this chunk of generated code,
	  //       name: The name of the original symbol which generated this chunk of
	  //             code.
	  //     }
	  //
	  // All properties except for `generatedLine` and `generatedColumn` can be
	  // `null`.
	  //
	  // `_generatedMappings` is ordered by the generated positions.
	  //
	  // `_originalMappings` is ordered by the original positions.

	  SourceMapConsumer.prototype.__generatedMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	    get: function () {
	      if (!this.__generatedMappings) {
	        this.__generatedMappings = [];
	        this.__originalMappings = [];
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }

	      return this.__generatedMappings;
	    }
	  });

	  SourceMapConsumer.prototype.__originalMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	    get: function () {
	      if (!this.__originalMappings) {
	        this.__generatedMappings = [];
	        this.__originalMappings = [];
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }

	      return this.__originalMappings;
	    }
	  });

	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  SourceMapConsumer.prototype._parseMappings =
	    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      var generatedLine = 1;
	      var previousGeneratedColumn = 0;
	      var previousOriginalLine = 0;
	      var previousOriginalColumn = 0;
	      var previousSource = 0;
	      var previousName = 0;
	      var mappingSeparator = /^[,;]/;
	      var str = aStr;
	      var mapping;
	      var temp;

	      while (str.length > 0) {
	        if (str.charAt(0) === ';') {
	          generatedLine++;
	          str = str.slice(1);
	          previousGeneratedColumn = 0;
	        }
	        else if (str.charAt(0) === ',') {
	          str = str.slice(1);
	        }
	        else {
	          mapping = {};
	          mapping.generatedLine = generatedLine;

	          // Generated column.
	          temp = base64VLQ.decode(str);
	          mapping.generatedColumn = previousGeneratedColumn + temp.value;
	          previousGeneratedColumn = mapping.generatedColumn;
	          str = temp.rest;

	          if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
	            // Original source.
	            temp = base64VLQ.decode(str);
	            mapping.source = this._sources.at(previousSource + temp.value);
	            previousSource += temp.value;
	            str = temp.rest;
	            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
	              throw new Error('Found a source, but no line and column');
	            }

	            // Original line.
	            temp = base64VLQ.decode(str);
	            mapping.originalLine = previousOriginalLine + temp.value;
	            previousOriginalLine = mapping.originalLine;
	            // Lines are stored 0-based
	            mapping.originalLine += 1;
	            str = temp.rest;
	            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
	              throw new Error('Found a source and line, but no column');
	            }

	            // Original column.
	            temp = base64VLQ.decode(str);
	            mapping.originalColumn = previousOriginalColumn + temp.value;
	            previousOriginalColumn = mapping.originalColumn;
	            str = temp.rest;

	            if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
	              // Original name.
	              temp = base64VLQ.decode(str);
	              mapping.name = this._names.at(previousName + temp.value);
	              previousName += temp.value;
	              str = temp.rest;
	            }
	          }

	          this.__generatedMappings.push(mapping);
	          if (typeof mapping.originalLine === 'number') {
	            this.__originalMappings.push(mapping);
	          }
	        }
	      }

	      this.__originalMappings.sort(util.compareByOriginalPositions);
	    };

	  /**
	   * Find the mapping that best matches the hypothetical "needle" mapping that
	   * we are searching for in the given "haystack" of mappings.
	   */
	  SourceMapConsumer.prototype._findMapping =
	    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                           aColumnName, aComparator) {
	      // To return the position we are searching for, we must first find the
	      // mapping for the given position and then return the opposite position it
	      // points to. Because the mappings are sorted, we can use binary search to
	      // find the best mapping.

	      if (aNeedle[aLineName] <= 0) {
	        throw new TypeError('Line must be greater than or equal to 1, got '
	                            + aNeedle[aLineName]);
	      }
	      if (aNeedle[aColumnName] < 0) {
	        throw new TypeError('Column must be greater than or equal to 0, got '
	                            + aNeedle[aColumnName]);
	      }

	      return binarySearch.search(aNeedle, aMappings, aComparator);
	    };

	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.
	   *   - column: The column number in the generated source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.
	   *   - column: The column number in the original source, or null.
	   *   - name: The original identifier, or null.
	   */
	  SourceMapConsumer.prototype.originalPositionFor =
	    function SourceMapConsumer_originalPositionFor(aArgs) {
	      var needle = {
	        generatedLine: util.getArg(aArgs, 'line'),
	        generatedColumn: util.getArg(aArgs, 'column')
	      };

	      var mapping = this._findMapping(needle,
	                                      this._generatedMappings,
	                                      "generatedLine",
	                                      "generatedColumn",
	                                      util.compareByGeneratedPositions);

	      if (mapping) {
	        var source = util.getArg(mapping, 'source', null);
	        if (source && this.sourceRoot) {
	          source = util.join(this.sourceRoot, source);
	        }
	        return {
	          source: source,
	          line: util.getArg(mapping, 'originalLine', null),
	          column: util.getArg(mapping, 'originalColumn', null),
	          name: util.getArg(mapping, 'name', null)
	        };
	      }

	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    };

	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * availible.
	   */
	  SourceMapConsumer.prototype.sourceContentFor =
	    function SourceMapConsumer_sourceContentFor(aSource) {
	      if (!this.sourcesContent) {
	        return null;
	      }

	      if (this.sourceRoot) {
	        aSource = util.relative(this.sourceRoot, aSource);
	      }

	      if (this._sources.has(aSource)) {
	        return this.sourcesContent[this._sources.indexOf(aSource)];
	      }

	      var url;
	      if (this.sourceRoot
	          && (url = util.urlParse(this.sourceRoot))) {
	        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	        // many users. We can help them out when they expect file:// URIs to
	        // behave like it would if they were running a local HTTP server. See
	        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
	        if (url.scheme == "file"
	            && this._sources.has(fileUriAbsPath)) {
	          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	        }

	        if ((!url.path || url.path == "/")
	            && this._sources.has("/" + aSource)) {
	          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
	        }
	      }

	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    };

	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *   - column: The column number in the original source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  SourceMapConsumer.prototype.generatedPositionFor =
	    function SourceMapConsumer_generatedPositionFor(aArgs) {
	      var needle = {
	        source: util.getArg(aArgs, 'source'),
	        originalLine: util.getArg(aArgs, 'line'),
	        originalColumn: util.getArg(aArgs, 'column')
	      };

	      if (this.sourceRoot) {
	        needle.source = util.relative(this.sourceRoot, needle.source);
	      }

	      var mapping = this._findMapping(needle,
	                                      this._originalMappings,
	                                      "originalLine",
	                                      "originalColumn",
	                                      util.compareByOriginalPositions);

	      if (mapping) {
	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null)
	        };
	      }

	      return {
	        line: null,
	        column: null
	      };
	    };

	  SourceMapConsumer.GENERATED_ORDER = 1;
	  SourceMapConsumer.ORIGINAL_ORDER = 2;

	  /**
	   * Iterate over each mapping between an original source/line/column and a
	   * generated line/column in this source map.
	   *
	   * @param Function aCallback
	   *        The function that is called with each mapping.
	   * @param Object aContext
	   *        Optional. If specified, this object will be the value of `this` every
	   *        time that `aCallback` is called.
	   * @param aOrder
	   *        Either `SourceMapConsumer.GENERATED_ORDER` or
	   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	   *        iterate over the mappings sorted by the generated file's line/column
	   *        order or the original's source/line/column order, respectively. Defaults to
	   *        `SourceMapConsumer.GENERATED_ORDER`.
	   */
	  SourceMapConsumer.prototype.eachMapping =
	    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	      var context = aContext || null;
	      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

	      var mappings;
	      switch (order) {
	      case SourceMapConsumer.GENERATED_ORDER:
	        mappings = this._generatedMappings;
	        break;
	      case SourceMapConsumer.ORIGINAL_ORDER:
	        mappings = this._originalMappings;
	        break;
	      default:
	        throw new Error("Unknown order of iteration.");
	      }

	      var sourceRoot = this.sourceRoot;
	      mappings.map(function (mapping) {
	        var source = mapping.source;
	        if (source && sourceRoot) {
	          source = util.join(sourceRoot, source);
	        }
	        return {
	          source: source,
	          generatedLine: mapping.generatedLine,
	          generatedColumn: mapping.generatedColumn,
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: mapping.name
	        };
	      }).forEach(aCallback, context);
	    };

	  exports.SourceMapConsumer = SourceMapConsumer;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var SourceMapGenerator = __webpack_require__(119).SourceMapGenerator;
	  var util = __webpack_require__(128);

	  /**
	   * SourceNodes provide a way to abstract over interpolating/concatenating
	   * snippets of generated JavaScript source code while maintaining the line and
	   * column information associated with the original source code.
	   *
	   * @param aLine The original line number.
	   * @param aColumn The original column number.
	   * @param aSource The original source's filename.
	   * @param aChunks Optional. An array of strings which are snippets of
	   *        generated JS, or other SourceNodes.
	   * @param aName The original identifier.
	   */
	  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	    this.children = [];
	    this.sourceContents = {};
	    this.line = aLine === undefined ? null : aLine;
	    this.column = aColumn === undefined ? null : aColumn;
	    this.source = aSource === undefined ? null : aSource;
	    this.name = aName === undefined ? null : aName;
	    if (aChunks != null) this.add(aChunks);
	  }

	  /**
	   * Creates a SourceNode from generated code and a SourceMapConsumer.
	   *
	   * @param aGeneratedCode The generated code
	   * @param aSourceMapConsumer The SourceMap for the generated code
	   */
	  SourceNode.fromStringWithSourceMap =
	    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer) {
	      // The SourceNode we want to fill with the generated code
	      // and the SourceMap
	      var node = new SourceNode();

	      // The generated code
	      // Processed fragments are removed from this array.
	      var remainingLines = aGeneratedCode.split('\n');

	      // We need to remember the position of "remainingLines"
	      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

	      // The generate SourceNodes we need a code range.
	      // To extract it current and last mapping is used.
	      // Here we store the last mapping.
	      var lastMapping = null;

	      aSourceMapConsumer.eachMapping(function (mapping) {
	        if (lastMapping === null) {
	          // We add the generated code until the first mapping
	          // to the SourceNode without any mapping.
	          // Each line is added as separate string.
	          while (lastGeneratedLine < mapping.generatedLine) {
	            node.add(remainingLines.shift() + "\n");
	            lastGeneratedLine++;
	          }
	          if (lastGeneratedColumn < mapping.generatedColumn) {
	            var nextLine = remainingLines[0];
	            node.add(nextLine.substr(0, mapping.generatedColumn));
	            remainingLines[0] = nextLine.substr(mapping.generatedColumn);
	            lastGeneratedColumn = mapping.generatedColumn;
	          }
	        } else {
	          // We add the code from "lastMapping" to "mapping":
	          // First check if there is a new line in between.
	          if (lastGeneratedLine < mapping.generatedLine) {
	            var code = "";
	            // Associate full lines with "lastMapping"
	            do {
	              code += remainingLines.shift() + "\n";
	              lastGeneratedLine++;
	              lastGeneratedColumn = 0;
	            } while (lastGeneratedLine < mapping.generatedLine);
	            // When we reached the correct line, we add code until we
	            // reach the correct column too.
	            if (lastGeneratedColumn < mapping.generatedColumn) {
	              var nextLine = remainingLines[0];
	              code += nextLine.substr(0, mapping.generatedColumn);
	              remainingLines[0] = nextLine.substr(mapping.generatedColumn);
	              lastGeneratedColumn = mapping.generatedColumn;
	            }
	            // Create the SourceNode.
	            addMappingWithCode(lastMapping, code);
	          } else {
	            // There is no new line in between.
	            // Associate the code between "lastGeneratedColumn" and
	            // "mapping.generatedColumn" with "lastMapping"
	            var nextLine = remainingLines[0];
	            var code = nextLine.substr(0, mapping.generatedColumn -
	                                          lastGeneratedColumn);
	            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
	                                                lastGeneratedColumn);
	            lastGeneratedColumn = mapping.generatedColumn;
	            addMappingWithCode(lastMapping, code);
	          }
	        }
	        lastMapping = mapping;
	      }, this);
	      // We have processed all mappings.
	      // Associate the remaining code in the current line with "lastMapping"
	      // and add the remaining lines without any mapping
	      addMappingWithCode(lastMapping, remainingLines.join("\n"));

	      // Copy sourcesContent into SourceNode
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content) {
	          node.setSourceContent(sourceFile, content);
	        }
	      });

	      return node;

	      function addMappingWithCode(mapping, code) {
	        if (mapping === null || mapping.source === undefined) {
	          node.add(code);
	        } else {
	          node.add(new SourceNode(mapping.originalLine,
	                                  mapping.originalColumn,
	                                  mapping.source,
	                                  code,
	                                  mapping.name));
	        }
	      }
	    };

	  /**
	   * Add a chunk of generated JS to this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  SourceNode.prototype.add = function SourceNode_add(aChunk) {
	    if (Array.isArray(aChunk)) {
	      aChunk.forEach(function (chunk) {
	        this.add(chunk);
	      }, this);
	    }
	    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
	      if (aChunk) {
	        this.children.push(aChunk);
	      }
	    }
	    else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	      );
	    }
	    return this;
	  };

	  /**
	   * Add a chunk of generated JS to the beginning of this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	    if (Array.isArray(aChunk)) {
	      for (var i = aChunk.length-1; i >= 0; i--) {
	        this.prepend(aChunk[i]);
	      }
	    }
	    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
	      this.children.unshift(aChunk);
	    }
	    else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	      );
	    }
	    return this;
	  };

	  /**
	   * Walk over the tree of JS snippets in this node and its children. The
	   * walking function is called once for each snippet of JS and is passed that
	   * snippet and the its original associated source's line/column location.
	   *
	   * @param aFn The traversal function.
	   */
	  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	    var chunk;
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      chunk = this.children[i];
	      if (chunk instanceof SourceNode) {
	        chunk.walk(aFn);
	      }
	      else {
	        if (chunk !== '') {
	          aFn(chunk, { source: this.source,
	                       line: this.line,
	                       column: this.column,
	                       name: this.name });
	        }
	      }
	    }
	  };

	  /**
	   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	   * each of `this.children`.
	   *
	   * @param aSep The separator.
	   */
	  SourceNode.prototype.join = function SourceNode_join(aSep) {
	    var newChildren;
	    var i;
	    var len = this.children.length;
	    if (len > 0) {
	      newChildren = [];
	      for (i = 0; i < len-1; i++) {
	        newChildren.push(this.children[i]);
	        newChildren.push(aSep);
	      }
	      newChildren.push(this.children[i]);
	      this.children = newChildren;
	    }
	    return this;
	  };

	  /**
	   * Call String.prototype.replace on the very right-most source snippet. Useful
	   * for trimming whitespace from the end of a source node, etc.
	   *
	   * @param aPattern The pattern to replace.
	   * @param aReplacement The thing to replace the pattern with.
	   */
	  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	    var lastChild = this.children[this.children.length - 1];
	    if (lastChild instanceof SourceNode) {
	      lastChild.replaceRight(aPattern, aReplacement);
	    }
	    else if (typeof lastChild === 'string') {
	      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	    }
	    else {
	      this.children.push(''.replace(aPattern, aReplacement));
	    }
	    return this;
	  };

	  /**
	   * Set the source content for a source file. This will be added to the SourceMapGenerator
	   * in the sourcesContent field.
	   *
	   * @param aSourceFile The filename of the source file
	   * @param aSourceContent The content of the source file
	   */
	  SourceNode.prototype.setSourceContent =
	    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	    };

	  /**
	   * Walk over the tree of SourceNodes. The walking function is called for each
	   * source file content and is passed the filename and source content.
	   *
	   * @param aFn The traversal function.
	   */
	  SourceNode.prototype.walkSourceContents =
	    function SourceNode_walkSourceContents(aFn) {
	      for (var i = 0, len = this.children.length; i < len; i++) {
	        if (this.children[i] instanceof SourceNode) {
	          this.children[i].walkSourceContents(aFn);
	        }
	      }

	      var sources = Object.keys(this.sourceContents);
	      for (var i = 0, len = sources.length; i < len; i++) {
	        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	      }
	    };

	  /**
	   * Return the string representation of this source node. Walks over the tree
	   * and concatenates all the various snippets together to one string.
	   */
	  SourceNode.prototype.toString = function SourceNode_toString() {
	    var str = "";
	    this.walk(function (chunk) {
	      str += chunk;
	    });
	    return str;
	  };

	  /**
	   * Returns the string representation of this source node along with a source
	   * map.
	   */
	  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	    var generated = {
	      code: "",
	      line: 1,
	      column: 0
	    };
	    var map = new SourceMapGenerator(aArgs);
	    var sourceMappingActive = false;
	    var lastOriginalSource = null;
	    var lastOriginalLine = null;
	    var lastOriginalColumn = null;
	    var lastOriginalName = null;
	    this.walk(function (chunk, original) {
	      generated.code += chunk;
	      if (original.source !== null
	          && original.line !== null
	          && original.column !== null) {
	        if(lastOriginalSource !== original.source
	           || lastOriginalLine !== original.line
	           || lastOriginalColumn !== original.column
	           || lastOriginalName !== original.name) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	        lastOriginalSource = original.source;
	        lastOriginalLine = original.line;
	        lastOriginalColumn = original.column;
	        lastOriginalName = original.name;
	        sourceMappingActive = true;
	      } else if (sourceMappingActive) {
	        map.addMapping({
	          generated: {
	            line: generated.line,
	            column: generated.column
	          }
	        });
	        lastOriginalSource = null;
	        sourceMappingActive = false;
	      }
	      chunk.split('').forEach(function (ch) {
	        if (ch === '\n') {
	          generated.line++;
	          generated.column = 0;
	        } else {
	          generated.column++;
	        }
	      });
	    });
	    this.walkSourceContents(function (sourceFile, sourceContent) {
	      map.setSourceContent(sourceFile, sourceContent);
	    });

	    return { code: generated.code, map: map };
	  };

	  exports.SourceNode = SourceNode;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
	}

	module.exports = isArguments;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/**
	 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
	 * In addition to special characters the forward slash is escaped to allow for
	 * easier `eval` use and `Function` compilation.
	 */
	var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : (value + '');
	}

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  escapeRegExp(objToString)
	  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (objToString.call(value) == funcTag) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	/**
	 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return (string && reHasRegExpChars.test(string))
	    ? string.replace(reRegExpChars, '\\$&')
	    : string;
	}

	module.exports = isArray;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(139);
	exports.Stream = __webpack_require__(56);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(140);
	exports.Duplex = __webpack_require__(138);
	exports.Transform = __webpack_require__(141);
	exports.PassThrough = __webpack_require__(142);


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  /**
	   * This is a helper function for getting values from parameter/options
	   * objects.
	   *
	   * @param args The object we are extracting values from
	   * @param name The name of the property we are getting.
	   * @param defaultValue An optional value to return if the property is missing
	   * from the object. If this is not specified and the property is missing, an
	   * error will be thrown.
	   */
	  function getArg(aArgs, aName, aDefaultValue) {
	    if (aName in aArgs) {
	      return aArgs[aName];
	    } else if (arguments.length === 3) {
	      return aDefaultValue;
	    } else {
	      throw new Error('"' + aName + '" is a required argument.');
	    }
	  }
	  exports.getArg = getArg;

	  var urlRegexp = /([\w+\-.]+):\/\/((\w+:\w+)@)?([\w.]+)?(:(\d+))?(\S+)?/;
	  var dataUrlRegexp = /^data:.+\,.+/;

	  function urlParse(aUrl) {
	    var match = aUrl.match(urlRegexp);
	    if (!match) {
	      return null;
	    }
	    return {
	      scheme: match[1],
	      auth: match[3],
	      host: match[4],
	      port: match[6],
	      path: match[7]
	    };
	  }
	  exports.urlParse = urlParse;

	  function urlGenerate(aParsedUrl) {
	    var url = aParsedUrl.scheme + "://";
	    if (aParsedUrl.auth) {
	      url += aParsedUrl.auth + "@"
	    }
	    if (aParsedUrl.host) {
	      url += aParsedUrl.host;
	    }
	    if (aParsedUrl.port) {
	      url += ":" + aParsedUrl.port
	    }
	    if (aParsedUrl.path) {
	      url += aParsedUrl.path;
	    }
	    return url;
	  }
	  exports.urlGenerate = urlGenerate;

	  function join(aRoot, aPath) {
	    var url;

	    if (aPath.match(urlRegexp) || aPath.match(dataUrlRegexp)) {
	      return aPath;
	    }

	    if (aPath.charAt(0) === '/' && (url = urlParse(aRoot))) {
	      url.path = aPath;
	      return urlGenerate(url);
	    }

	    return aRoot.replace(/\/$/, '') + '/' + aPath;
	  }
	  exports.join = join;

	  /**
	   * Because behavior goes wacky when you set `__proto__` on objects, we
	   * have to prefix all the strings in our set with an arbitrary character.
	   *
	   * See https://github.com/mozilla/source-map/pull/31 and
	   * https://github.com/mozilla/source-map/issues/30
	   *
	   * @param String aStr
	   */
	  function toSetString(aStr) {
	    return '$' + aStr;
	  }
	  exports.toSetString = toSetString;

	  function fromSetString(aStr) {
	    return aStr.substr(1);
	  }
	  exports.fromSetString = fromSetString;

	  function relative(aRoot, aPath) {
	    aRoot = aRoot.replace(/\/$/, '');

	    var url = urlParse(aRoot);
	    if (aPath.charAt(0) == "/" && url && url.path == "/") {
	      return aPath.slice(1);
	    }

	    return aPath.indexOf(aRoot + '/') === 0
	      ? aPath.substr(aRoot.length + 1)
	      : aPath;
	  }
	  exports.relative = relative;

	  function strcmp(aStr1, aStr2) {
	    var s1 = aStr1 || "";
	    var s2 = aStr2 || "";
	    return (s1 > s2) - (s1 < s2);
	  }

	  /**
	   * Comparator between two mappings where the original positions are compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same original source/line/column, but different generated
	   * line and column the same. Useful when searching for a mapping with a
	   * stubbed out mapping.
	   */
	  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	    var cmp;

	    cmp = strcmp(mappingA.source, mappingB.source);
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp || onlyCompareOriginal) {
	      return cmp;
	    }

	    cmp = strcmp(mappingA.name, mappingB.name);
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp) {
	      return cmp;
	    }

	    return mappingA.generatedColumn - mappingB.generatedColumn;
	  };
	  exports.compareByOriginalPositions = compareByOriginalPositions;

	  /**
	   * Comparator between two mappings where the generated positions are
	   * compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same generated line and column, but different
	   * source/name/original line and column the same. Useful when searching for a
	   * mapping with a stubbed out mapping.
	   */
	  function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
	    var cmp;

	    cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	    if (cmp || onlyCompareGenerated) {
	      return cmp;
	    }

	    cmp = strcmp(mappingA.source, mappingB.source);
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp) {
	      return cmp;
	    }

	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp) {
	      return cmp;
	    }

	    return strcmp(mappingA.name, mappingB.name);
	  };
	  exports.compareByGeneratedPositions = compareByGeneratedPositions;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  /**
	   * Recursive implementation of binary search.
	   *
	   * @param aLow Indices here and lower do not contain the needle.
	   * @param aHigh Indices here and higher do not contain the needle.
	   * @param aNeedle The element being searched for.
	   * @param aHaystack The non-empty array being searched.
	   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	   */
	  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
	    // This function terminates when one of the following is true:
	    //
	    //   1. We find the exact element we are looking for.
	    //
	    //   2. We did not find the exact element, but we can return the next
	    //      closest element that is less than that element.
	    //
	    //   3. We did not find the exact element, and there is no next-closest
	    //      element which is less than the one we are searching for, so we
	    //      return null.
	    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	    var cmp = aCompare(aNeedle, aHaystack[mid], true);
	    if (cmp === 0) {
	      // Found the element we are looking for.
	      return aHaystack[mid];
	    }
	    else if (cmp > 0) {
	      // aHaystack[mid] is greater than our needle.
	      if (aHigh - mid > 1) {
	        // The element is in the upper half.
	        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
	      }
	      // We did not find an exact match, return the next closest one
	      // (termination case 2).
	      return aHaystack[mid];
	    }
	    else {
	      // aHaystack[mid] is less than our needle.
	      if (mid - aLow > 1) {
	        // The element is in the lower half.
	        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
	      }
	      // The exact needle element was not found in this haystack. Determine if
	      // we are in termination case (2) or (3) and return the appropriate thing.
	      return aLow < 0
	        ? null
	        : aHaystack[aLow];
	    }
	  }

	  /**
	   * This is an implementation of binary search which will always try and return
	   * the next lowest value checked if there is no exact hit. This is because
	   * mappings between original and generated line/col pairs are single points,
	   * and there is an implicit region between each of them, so a miss just means
	   * that you aren't on the very start of a region.
	   *
	   * @param aNeedle The element you are looking for.
	   * @param aHaystack The array that is being searched.
	   * @param aCompare A function which takes the needle and an element in the
	   *     array and returns -1, 0, or 1 depending on whether the needle is less
	   *     than, equal to, or greater than the element, respectively.
	   */
	  exports.search = function search(aNeedle, aHaystack, aCompare) {
	    return aHaystack.length > 0
	      ? recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
	      : null;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var util = __webpack_require__(128);

	  /**
	   * A data structure which is a combination of an array and a set. Adding a new
	   * member is O(1), testing for membership is O(1), and finding the index of an
	   * element is O(1). Removing elements from the set is not supported. Only
	   * strings are supported for membership.
	   */
	  function ArraySet() {
	    this._array = [];
	    this._set = {};
	  }

	  /**
	   * Static method for creating ArraySet instances from an existing array.
	   */
	  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	    var set = new ArraySet();
	    for (var i = 0, len = aArray.length; i < len; i++) {
	      set.add(aArray[i], aAllowDuplicates);
	    }
	    return set;
	  };

	  /**
	   * Add the given string to this set.
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	    var isDuplicate = this.has(aStr);
	    var idx = this._array.length;
	    if (!isDuplicate || aAllowDuplicates) {
	      this._array.push(aStr);
	    }
	    if (!isDuplicate) {
	      this._set[util.toSetString(aStr)] = idx;
	    }
	  };

	  /**
	   * Is the given string a member of this set?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.has = function ArraySet_has(aStr) {
	    return Object.prototype.hasOwnProperty.call(this._set,
	                                                util.toSetString(aStr));
	  };

	  /**
	   * What is the index of the given string in the array?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	    if (this.has(aStr)) {
	      return this._set[util.toSetString(aStr)];
	    }
	    throw new Error('"' + aStr + '" is not in the set.');
	  };

	  /**
	   * What is the element at the given index?
	   *
	   * @param Number aIdx
	   */
	  ArraySet.prototype.at = function ArraySet_at(aIdx) {
	    if (aIdx >= 0 && aIdx < this._array.length) {
	      return this._array[aIdx];
	    }
	    throw new Error('No element indexed by ' + aIdx);
	  };

	  /**
	   * Returns the array representation of this set (which has the proper indices
	   * indicated by indexOf). Note that this is a copy of the internal array used
	   * for storing the members so that no one can mess with internal state.
	   */
	  ArraySet.prototype.toArray = function ArraySet_toArray() {
	    return this._array.slice();
	  };

	  exports.ArraySet = ArraySet;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var base64 = __webpack_require__(143);

	  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
	  // length quantities we use in the source map spec, the first bit is the sign,
	  // the next four bits are the actual value, and the 6th bit is the
	  // continuation bit. The continuation bit tells us whether there are more
	  // digits in this value following this digit.
	  //
	  //   Continuation
	  //   |    Sign
	  //   |    |
	  //   V    V
	  //   101011

	  var VLQ_BASE_SHIFT = 5;

	  // binary: 100000
	  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	  // binary: 011111
	  var VLQ_BASE_MASK = VLQ_BASE - 1;

	  // binary: 100000
	  var VLQ_CONTINUATION_BIT = VLQ_BASE;

	  /**
	   * Converts from a two-complement value to a value where the sign bit is
	   * is placed in the least significant bit.  For example, as decimals:
	   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	   */
	  function toVLQSigned(aValue) {
	    return aValue < 0
	      ? ((-aValue) << 1) + 1
	      : (aValue << 1) + 0;
	  }

	  /**
	   * Converts to a two-complement value from a value where the sign bit is
	   * is placed in the least significant bit.  For example, as decimals:
	   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	   */
	  function fromVLQSigned(aValue) {
	    var isNegative = (aValue & 1) === 1;
	    var shifted = aValue >> 1;
	    return isNegative
	      ? -shifted
	      : shifted;
	  }

	  /**
	   * Returns the base 64 VLQ encoded value.
	   */
	  exports.encode = function base64VLQ_encode(aValue) {
	    var encoded = "";
	    var digit;

	    var vlq = toVLQSigned(aValue);

	    do {
	      digit = vlq & VLQ_BASE_MASK;
	      vlq >>>= VLQ_BASE_SHIFT;
	      if (vlq > 0) {
	        // There are still more digits in this value, so we must make sure the
	        // continuation bit is marked.
	        digit |= VLQ_CONTINUATION_BIT;
	      }
	      encoded += base64.encode(digit);
	    } while (vlq > 0);

	    return encoded;
	  };

	  /**
	   * Decodes the next base 64 VLQ value from the given string and returns the
	   * value and the rest of the string.
	   */
	  exports.decode = function base64VLQ_decode(aStr) {
	    var i = 0;
	    var strLen = aStr.length;
	    var result = 0;
	    var shift = 0;
	    var continuation, digit;

	    do {
	      if (i >= strLen) {
	        throw new Error("Expected more digits in base 64 VLQ value.");
	      }
	      digit = base64.decode(aStr.charAt(i++));
	      continuation = !!(digit & VLQ_CONTINUATION_BIT);
	      digit &= VLQ_BASE_MASK;
	      result = result + (digit << shift);
	      shift += VLQ_BASE_SHIFT;
	    } while (continuation);

	    return {
	      value: fromVLQSigned(result),
	      rest: aStr.slice(i)
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(5).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(5).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(148);
	util.inherits = __webpack_require__(147);
	/*</replacement>*/

	var Readable = __webpack_require__(139);
	var Writable = __webpack_require__(140);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(146);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(82).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(56);

	/*<replacement>*/
	var util = __webpack_require__(148);
	util.inherits = __webpack_require__(147);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(144);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(138);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(145).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(138);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(145).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(148);
	util.inherits = __webpack_require__(147);
	/*</replacement>*/

	var Stream = __webpack_require__(56);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(138);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(138);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(138);

	/*<replacement>*/
	var util = __webpack_require__(148);
	util.inherits = __webpack_require__(147);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(141);

	/*<replacement>*/
	var util = __webpack_require__(148);
	util.inherits = __webpack_require__(147);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

	  var charToIntMap = {};
	  var intToCharMap = {};

	  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	    .split('')
	    .forEach(function (ch, index) {
	      charToIntMap[ch] = index;
	      intToCharMap[index] = ch;
	    });

	  /**
	   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	   */
	  exports.encode = function base64_encode(aNumber) {
	    if (aNumber in intToCharMap) {
	      return intToCharMap[aNumber];
	    }
	    throw new TypeError("Must be between 0 and 63: " + aNumber);
	  };

	  /**
	   * Decode a single base 64 digit to an integer.
	   */
	  exports.decode = function base64_decode(aChar) {
	    if (aChar in charToIntMap) {
	      return charToIntMap[aChar];
	    }
	    throw new TypeError("Not a valid base 64 digit: " + aChar);
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(5).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ }
/******/ ]);
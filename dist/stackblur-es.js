function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/* eslint-disable no-bitwise -- used for calculations */
/* eslint-disable unicorn/prefer-query-selector -- aiming at
  backward-compatibility */
/**
* StackBlur - a fast almost Gaussian Blur For Canvas
*
* In case you find this class useful - especially in commercial projects -
* I am not totally unhappy for a small donation to my PayPal account
* mario@quasimondo.de
*
* Or support me on flattr:
* {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
*
* @module StackBlur
* @author Mario Klingemann
* Contact: mario@quasimondo.com
* Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
* Twitter: @quasimondo
*
* @copyright (c) 2010 Mario Klingemann
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

var mulTable = [512, 128, 114, 64, 82, 114, 335, 64, 405, 82, 271, 114, 97, 335, 73, 64, 227, 405, 91, 82, 149, 271, 124, 114, 105, 97, 90, 335, 78, 73, 273, 64, 241, 227, 107, 405, 383, 91, 345, 82, 78, 149, 71, 271, 259, 124, 475, 114, 437, 105, 101, 97, 187, 90, 347, 335, 323, 78, 151, 73, 141, 273, 265, 64, 497, 241, 117, 227, 441, 107, 417, 405, 197, 383, 373, 91, 177, 345, 337, 82, 80, 78, 305, 149, 291, 71, 139, 271, 265, 259, 507, 124, 485, 475, 465, 114, 223, 437, 107, 105, 103, 101, 99, 97, 381, 187, 367, 90, 177, 347, 341, 335, 329, 323, 159, 78, 307, 151, 297, 73, 287, 141, 139, 273, 269, 265, 261, 64, 505, 497, 489, 241, 475, 117, 461, 227, 447, 441, 435, 107, 211, 417, 411, 405, 399, 197, 389, 383, 189, 373, 92, 91, 359, 177, 175, 345, 341, 337, 83, 82, 81, 80, 79, 78, 309, 305, 301, 149, 147, 291, 287, 71, 281, 139, 137, 271, 67, 265, 131, 259, 257, 507, 501, 124, 491, 485, 120, 475, 235, 465, 115, 114, 451, 223, 221, 437, 433, 107, 106, 105, 104, 103, 102, 101, 100, 99, 98, 97, 385, 381, 377, 187, 185, 367, 363, 90, 357, 177, 175, 347, 86, 341, 169, 335, 83, 329, 163, 323, 80, 159, 315, 78, 155, 307, 76, 151, 299, 297, 147, 73, 289, 287, 285, 141, 70, 139, 275, 273, 271, 269, 267, 265, 263, 261, 259, 64, 509, 505, 501, 497, 493, 489, 243, 241, 239, 475, 471, 117, 116, 461, 457, 227, 451, 447, 111, 441, 219, 435, 108, 107, 425, 211, 419, 417, 207, 411, 102, 405, 201, 399, 397, 197, 391, 389, 193, 383, 381, 189, 94, 373, 371, 92, 183, 91, 361, 359, 357, 177, 88, 175, 347, 345, 343, 341, 339, 337, 167, 83, 165, 82, 163, 81, 161, 80, 159, 79, 157, 78, 155, 309, 307, 305, 303, 301, 299, 149, 74, 147, 73, 291, 289, 287, 143, 71, 141, 281, 279, 139, 69, 137, 273, 271, 135, 67, 267, 265, 66, 131, 261, 259, 129, 257, 255, 507, 126, 501, 499, 124, 493, 491, 122, 485, 483, 120, 239, 475, 473, 235, 117, 465, 463, 115, 229, 114, 453, 451, 449, 223, 111, 221, 439, 437, 435, 433, 431, 107, 213, 106, 211, 105, 209];
var shgTable = [9, 9, 10, 10, 11, 12, 14, 12, 15, 13, 15, 14, 14, 16, 14, 14, 16, 17, 15, 15, 16, 17, 16, 16, 16, 16, 16, 18, 16, 16, 18, 16, 18, 18, 17, 19, 19, 17, 19, 17, 17, 18, 17, 19, 19, 18, 20, 18, 20, 18, 18, 18, 19, 18, 20, 20, 20, 18, 19, 18, 19, 20, 20, 18, 21, 20, 19, 20, 21, 19, 21, 21, 20, 21, 21, 19, 20, 21, 21, 19, 19, 19, 21, 20, 21, 19, 20, 21, 21, 21, 22, 20, 22, 22, 22, 20, 21, 22, 20, 20, 20, 20, 20, 20, 22, 21, 22, 20, 21, 22, 22, 22, 22, 22, 21, 20, 22, 21, 22, 20, 22, 21, 21, 22, 22, 22, 22, 20, 23, 23, 23, 22, 23, 21, 23, 22, 23, 23, 23, 21, 22, 23, 23, 23, 23, 22, 23, 23, 22, 23, 21, 21, 23, 22, 22, 23, 23, 23, 21, 21, 21, 21, 21, 21, 23, 23, 23, 22, 22, 23, 23, 21, 23, 22, 22, 23, 21, 23, 22, 23, 23, 24, 24, 22, 24, 24, 22, 24, 23, 24, 22, 22, 24, 23, 23, 24, 24, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 24, 24, 24, 23, 23, 24, 24, 22, 24, 23, 23, 24, 22, 24, 23, 24, 22, 24, 23, 24, 22, 23, 24, 22, 23, 24, 22, 23, 24, 24, 23, 22, 24, 24, 24, 23, 22, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 22, 25, 25, 25, 25, 25, 25, 24, 24, 24, 25, 25, 23, 23, 25, 25, 24, 25, 25, 23, 25, 24, 25, 23, 23, 25, 24, 25, 25, 24, 25, 23, 25, 24, 25, 25, 24, 25, 25, 24, 25, 25, 24, 23, 25, 25, 23, 24, 23, 25, 25, 25, 24, 23, 24, 25, 25, 25, 25, 25, 25, 24, 23, 24, 23, 24, 23, 24, 23, 24, 23, 24, 23, 24, 25, 25, 25, 25, 25, 25, 24, 23, 24, 23, 25, 25, 25, 24, 23, 24, 25, 25, 24, 23, 24, 25, 25, 24, 23, 25, 25, 23, 24, 25, 25, 24, 25, 25, 26, 24, 26, 26, 24, 26, 26, 24, 26, 26, 24, 25, 26, 26, 25, 24, 26, 26, 24, 25, 24, 26, 26, 26, 25, 24, 25, 26, 26, 26, 26, 26, 24, 25, 24, 25, 24, 25];

/**
 * @param {string|HTMLImageElement} img
 * @param {string|HTMLCanvasElement} canvas
 * @param {Float} radius
 * @param {boolean} blurAlphaChannel
 * @param {boolean} useOffset
 * @param {boolean} skipStyles
 * @returns {undefined}
 */
function processImage(img, canvas, radius, blurAlphaChannel, useOffset, skipStyles) {
  if (typeof img === 'string') {
    img = document.getElementById(img);
  }
  if (!img || !('naturalWidth' in img)) {
    return;
  }
  var dimensionType = useOffset ? 'offset' : 'natural';
  var w = img[dimensionType + 'Width'];
  var h = img[dimensionType + 'Height'];
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }
  if (!canvas || !('getContext' in canvas)) {
    return;
  }
  if (!skipStyles) {
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  }
  canvas.width = w;
  canvas.height = h;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);
  context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h);
  if (isNaN(radius) || radius < 1) {
    return;
  }
  if (blurAlphaChannel) {
    processCanvasRGBA(canvas, 0, 0, w, h, radius);
  } else {
    processCanvasRGB(canvas, 0, 0, w, h, radius);
  }
}

/**
 * @param {string|HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @throws {Error|TypeError}
 * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
 */
function getImageDataFromCanvas(canvas, topX, topY, width, height) {
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }
  if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) {
    throw new TypeError('Expecting canvas with `getContext` method ' + 'in processCanvasRGB(A) calls!');
  }
  var context = canvas.getContext('2d');
  try {
    return context.getImageData(topX, topY, width, height);
  } catch (e) {
    throw new Error('unable to access image data: ' + e);
  }
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */
function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
  if (isNaN(radius) || radius < 1) {
    return;
  }
  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
  imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, topX, topY);
}

/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */
function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
  var pixels = imageData.data;
  var div = 2 * radius + 1;
  // const w4 = width << 2;
  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;
  var stackEnd;
  for (var i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();
    if (i === radiusPlus1) {
      stackEnd = stack;
    }
  }
  stack.next = stackStart;
  var stackIn = null,
    stackOut = null,
    yw = 0,
    yi = 0;
  var mulSum = mulTable[radius];
  var shgSum = shgTable[radius];
  for (var y = 0; y < height; y++) {
    stack = stackStart;
    var pr = pixels[yi],
      pg = pixels[yi + 1],
      pb = pixels[yi + 2],
      pa = pixels[yi + 3];
    for (var _i = 0; _i < radiusPlus1; _i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }
    var rInSum = 0,
      gInSum = 0,
      bInSum = 0,
      aInSum = 0,
      rOutSum = radiusPlus1 * pr,
      gOutSum = radiusPlus1 * pg,
      bOutSum = radiusPlus1 * pb,
      aOutSum = radiusPlus1 * pa,
      rSum = sumFactor * pr,
      gSum = sumFactor * pg,
      bSum = sumFactor * pb,
      aSum = sumFactor * pa;
    for (var _i2 = 1; _i2 < radiusPlus1; _i2++) {
      var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
      var r = pixels[p],
        g = pixels[p + 1],
        b = pixels[p + 2],
        a = pixels[p + 3];
      var rbs = radiusPlus1 - _i2;
      rSum += (stack.r = r) * rbs;
      gSum += (stack.g = g) * rbs;
      bSum += (stack.b = b) * rbs;
      aSum += (stack.a = a) * rbs;
      rInSum += r;
      gInSum += g;
      bInSum += b;
      aInSum += a;
      stack = stack.next;
    }
    stackIn = stackStart;
    stackOut = stackEnd;
    for (var x = 0; x < width; x++) {
      var paInitial = aSum * mulSum >> shgSum;
      pixels[yi + 3] = paInitial;
      if (paInitial !== 0) {
        var _a = 255 / paInitial;
        pixels[yi] = (rSum * mulSum >> shgSum) * _a;
        pixels[yi + 1] = (gSum * mulSum >> shgSum) * _a;
        pixels[yi + 2] = (bSum * mulSum >> shgSum) * _a;
      } else {
        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
      }
      rSum -= rOutSum;
      gSum -= gOutSum;
      bSum -= bOutSum;
      aSum -= aOutSum;
      rOutSum -= stackIn.r;
      gOutSum -= stackIn.g;
      bOutSum -= stackIn.b;
      aOutSum -= stackIn.a;
      var _p = x + radius + 1;
      _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
      rInSum += stackIn.r = pixels[_p];
      gInSum += stackIn.g = pixels[_p + 1];
      bInSum += stackIn.b = pixels[_p + 2];
      aInSum += stackIn.a = pixels[_p + 3];
      rSum += rInSum;
      gSum += gInSum;
      bSum += bInSum;
      aSum += aInSum;
      stackIn = stackIn.next;
      var _stackOut = stackOut,
        _r = _stackOut.r,
        _g = _stackOut.g,
        _b = _stackOut.b,
        _a2 = _stackOut.a;
      rOutSum += _r;
      gOutSum += _g;
      bOutSum += _b;
      aOutSum += _a2;
      rInSum -= _r;
      gInSum -= _g;
      bInSum -= _b;
      aInSum -= _a2;
      stackOut = stackOut.next;
      yi += 4;
    }
    yw += width;
  }
  for (var _x = 0; _x < width; _x++) {
    yi = _x << 2;
    var _pr = pixels[yi],
      _pg = pixels[yi + 1],
      _pb = pixels[yi + 2],
      _pa = pixels[yi + 3],
      _rOutSum = radiusPlus1 * _pr,
      _gOutSum = radiusPlus1 * _pg,
      _bOutSum = radiusPlus1 * _pb,
      _aOutSum = radiusPlus1 * _pa,
      _rSum = sumFactor * _pr,
      _gSum = sumFactor * _pg,
      _bSum = sumFactor * _pb,
      _aSum = sumFactor * _pa;
    stack = stackStart;
    for (var _i3 = 0; _i3 < radiusPlus1; _i3++) {
      stack.r = _pr;
      stack.g = _pg;
      stack.b = _pb;
      stack.a = _pa;
      stack = stack.next;
    }
    var yp = width;
    var _gInSum = 0,
      _bInSum = 0,
      _aInSum = 0,
      _rInSum = 0;
    for (var _i4 = 1; _i4 <= radius; _i4++) {
      yi = yp + _x << 2;
      var _rbs = radiusPlus1 - _i4;
      _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
      _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
      _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
      _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
      _rInSum += _pr;
      _gInSum += _pg;
      _bInSum += _pb;
      _aInSum += _pa;
      stack = stack.next;
      if (_i4 < heightMinus1) {
        yp += width;
      }
    }
    yi = _x;
    stackIn = stackStart;
    stackOut = stackEnd;
    for (var _y = 0; _y < height; _y++) {
      var _p2 = yi << 2;
      pixels[_p2 + 3] = _pa = _aSum * mulSum >> shgSum;
      if (_pa > 0) {
        _pa = 255 / _pa;
        pixels[_p2] = (_rSum * mulSum >> shgSum) * _pa;
        pixels[_p2 + 1] = (_gSum * mulSum >> shgSum) * _pa;
        pixels[_p2 + 2] = (_bSum * mulSum >> shgSum) * _pa;
      } else {
        pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
      }
      _rSum -= _rOutSum;
      _gSum -= _gOutSum;
      _bSum -= _bOutSum;
      _aSum -= _aOutSum;
      _rOutSum -= stackIn.r;
      _gOutSum -= stackIn.g;
      _bOutSum -= stackIn.b;
      _aOutSum -= stackIn.a;
      _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
      _rSum += _rInSum += stackIn.r = pixels[_p2];
      _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
      _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
      _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
      stackIn = stackIn.next;
      _rOutSum += _pr = stackOut.r;
      _gOutSum += _pg = stackOut.g;
      _bOutSum += _pb = stackOut.b;
      _aOutSum += _pa = stackOut.a;
      _rInSum -= _pr;
      _gInSum -= _pg;
      _bInSum -= _pb;
      _aInSum -= _pa;
      stackOut = stackOut.next;
      yi += width;
    }
  }
  return imageData;
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */
function processCanvasRGB(canvas, topX, topY, width, height, radius) {
  if (isNaN(radius) || radius < 1) {
    return;
  }
  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
  imageData = processImageDataRGB(imageData, topX, topY, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, topX, topY);
}

/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */
function processImageDataRGB(imageData, topX, topY, width, height, radius) {
  var pixels = imageData.data;
  var div = 2 * radius + 1;
  // const w4 = width << 2;
  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;
  var stackEnd;
  for (var i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();
    if (i === radiusPlus1) {
      stackEnd = stack;
    }
  }
  stack.next = stackStart;
  var stackIn = null;
  var stackOut = null;
  var mulSum = mulTable[radius];
  var shgSum = shgTable[radius];
  var p, rbs;
  var yw = 0,
    yi = 0;
  for (var y = 0; y < height; y++) {
    var pr = pixels[yi],
      pg = pixels[yi + 1],
      pb = pixels[yi + 2],
      rOutSum = radiusPlus1 * pr,
      gOutSum = radiusPlus1 * pg,
      bOutSum = radiusPlus1 * pb,
      rSum = sumFactor * pr,
      gSum = sumFactor * pg,
      bSum = sumFactor * pb;
    stack = stackStart;
    for (var _i5 = 0; _i5 < radiusPlus1; _i5++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }
    var rInSum = 0,
      gInSum = 0,
      bInSum = 0;
    for (var _i6 = 1; _i6 < radiusPlus1; _i6++) {
      p = yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6) << 2);
      rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _i6);
      gSum += (stack.g = pg = pixels[p + 1]) * rbs;
      bSum += (stack.b = pb = pixels[p + 2]) * rbs;
      rInSum += pr;
      gInSum += pg;
      bInSum += pb;
      stack = stack.next;
    }
    stackIn = stackStart;
    stackOut = stackEnd;
    for (var x = 0; x < width; x++) {
      pixels[yi] = rSum * mulSum >> shgSum;
      pixels[yi + 1] = gSum * mulSum >> shgSum;
      pixels[yi + 2] = bSum * mulSum >> shgSum;
      rSum -= rOutSum;
      gSum -= gOutSum;
      bSum -= bOutSum;
      rOutSum -= stackIn.r;
      gOutSum -= stackIn.g;
      bOutSum -= stackIn.b;
      p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
      rInSum += stackIn.r = pixels[p];
      gInSum += stackIn.g = pixels[p + 1];
      bInSum += stackIn.b = pixels[p + 2];
      rSum += rInSum;
      gSum += gInSum;
      bSum += bInSum;
      stackIn = stackIn.next;
      rOutSum += pr = stackOut.r;
      gOutSum += pg = stackOut.g;
      bOutSum += pb = stackOut.b;
      rInSum -= pr;
      gInSum -= pg;
      bInSum -= pb;
      stackOut = stackOut.next;
      yi += 4;
    }
    yw += width;
  }
  for (var _x2 = 0; _x2 < width; _x2++) {
    yi = _x2 << 2;
    var _pr2 = pixels[yi],
      _pg2 = pixels[yi + 1],
      _pb2 = pixels[yi + 2],
      _rOutSum2 = radiusPlus1 * _pr2,
      _gOutSum2 = radiusPlus1 * _pg2,
      _bOutSum2 = radiusPlus1 * _pb2,
      _rSum2 = sumFactor * _pr2,
      _gSum2 = sumFactor * _pg2,
      _bSum2 = sumFactor * _pb2;
    stack = stackStart;
    for (var _i7 = 0; _i7 < radiusPlus1; _i7++) {
      stack.r = _pr2;
      stack.g = _pg2;
      stack.b = _pb2;
      stack = stack.next;
    }
    var _rInSum2 = 0,
      _gInSum2 = 0,
      _bInSum2 = 0;
    for (var _i8 = 1, yp = width; _i8 <= radius; _i8++) {
      yi = yp + _x2 << 2;
      _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
      _gSum2 += (stack.g = _pg2 = pixels[yi + 1]) * rbs;
      _bSum2 += (stack.b = _pb2 = pixels[yi + 2]) * rbs;
      _rInSum2 += _pr2;
      _gInSum2 += _pg2;
      _bInSum2 += _pb2;
      stack = stack.next;
      if (_i8 < heightMinus1) {
        yp += width;
      }
    }
    yi = _x2;
    stackIn = stackStart;
    stackOut = stackEnd;
    for (var _y2 = 0; _y2 < height; _y2++) {
      p = yi << 2;
      pixels[p] = _rSum2 * mulSum >> shgSum;
      pixels[p + 1] = _gSum2 * mulSum >> shgSum;
      pixels[p + 2] = _bSum2 * mulSum >> shgSum;
      _rSum2 -= _rOutSum2;
      _gSum2 -= _gOutSum2;
      _bSum2 -= _bOutSum2;
      _rOutSum2 -= stackIn.r;
      _gOutSum2 -= stackIn.g;
      _bOutSum2 -= stackIn.b;
      p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
      _rSum2 += _rInSum2 += stackIn.r = pixels[p];
      _gSum2 += _gInSum2 += stackIn.g = pixels[p + 1];
      _bSum2 += _bInSum2 += stackIn.b = pixels[p + 2];
      stackIn = stackIn.next;
      _rOutSum2 += _pr2 = stackOut.r;
      _gOutSum2 += _pg2 = stackOut.g;
      _bOutSum2 += _pb2 = stackOut.b;
      _rInSum2 -= _pr2;
      _gInSum2 -= _pg2;
      _bInSum2 -= _pb2;
      stackOut = stackOut.next;
      yi += width;
    }
  }
  return imageData;
}

/**
 *
 */
var BlurStack = /*#__PURE__*/_createClass(
/**
 * Set properties.
 */
function BlurStack() {
  _classCallCheck(this, BlurStack);
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
  this.next = null;
});

export { BlurStack, processCanvasRGB as canvasRGB, processCanvasRGBA as canvasRGBA, processImage as image, processImageDataRGB as imageDataRGB, processImageDataRGBA as imageDataRGBA };

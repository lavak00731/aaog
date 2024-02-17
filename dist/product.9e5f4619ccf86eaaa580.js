/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3502:
/***/ ((module) => {

"use strict";


/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function (graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);
    var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = typeof costs[v] === 'undefined';
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }
    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }
    return predecessors;
  },
  extract_shortest_path_from_predecessor_list: function (predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },
  find_path: function (graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
  },
  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
        t = {},
        key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },
    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },
    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {
        value: value,
        cost: cost
      };
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },
    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },
    empty: function () {
      return this.queue.length === 0;
    }
  }
};

// node.js module exports
if (true) {
  module.exports = dijkstra;
}

/***/ }),

/***/ 1029:
/***/ ((module) => {

"use strict";


module.exports = function encodeUtf8(input) {
  var result = [];
  var size = input.length;
  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index);
    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        index += 1;
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point);
      continue;
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push(point >> 6 | 192);
      result.push(point & 63 | 128);
      continue;
    }

    // 3-byte UTF-8
    if (point < 0xD800 || point >= 0xE000 && point < 0x10000) {
      result.push(point >> 12 | 224);
      result.push(point >> 6 & 63 | 128);
      result.push(point & 63 | 128);
      continue;
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push(point >> 18 | 240);
      result.push(point >> 12 & 63 | 128);
      result.push(point >> 6 & 63 | 128);
      result.push(point & 63 | 128);
      continue;
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD);
  }
  return new Uint8Array(result).buffer;
};

/***/ }),

/***/ 197:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const canPromise = __webpack_require__(2429);
const QRCode = __webpack_require__(8770);
const CanvasRenderer = __webpack_require__(7616);
const SvgRenderer = __webpack_require__(6613);
function renderCanvas(renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1);
  const argsNum = args.length;
  const isLastArgCb = typeof args[argsNum - 1] === 'function';
  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument');
  }
  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided');
    }
    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided');
    }
    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }
    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    });
  }
  try {
    const data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts);
});

/***/ }),

/***/ 2429:
/***/ ((module) => {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};

/***/ }),

/***/ 2625:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

const getSymbolSize = (__webpack_require__(2488).getSymbolSize);

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords(version) {
  if (version === 1) return [];
  const posCount = Math.floor(version / 7) + 2;
  const size = getSymbolSize(version);
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
  const positions = [size - 7]; // Last coord is always (size - 7)

  for (let i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals;
  }
  positions.push(6); // First coord is always 6

  return positions.reverse();
};

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions(version) {
  const coords = [];
  const pos = exports.getRowColCoords(version);
  const posLength = pos.length;
  for (let i = 0; i < posLength; i++) {
    for (let j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if (i === 0 && j === 0 ||
      // top-left
      i === 0 && j === posLength - 1 ||
      // bottom-left
      i === posLength - 1 && j === 0) {
        // top-right
        continue;
      }
      coords.push([pos[i], pos[j]]);
    }
  }
  return coords;
};

/***/ }),

/***/ 6278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(6203);

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
function AlphanumericData(data) {
  this.mode = Mode.ALPHANUMERIC;
  this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
  return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
  return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
  let i;

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11);
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};
module.exports = AlphanumericData;

/***/ }),

/***/ 6410:
/***/ ((module) => {

function BitBuffer() {
  this.buffer = [];
  this.length = 0;
}
BitBuffer.prototype = {
  get: function (index) {
    const bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }
    this.length++;
  }
};
module.exports = BitBuffer;

/***/ }),

/***/ 6706:
/***/ ((module) => {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix(size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0');
  }
  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col];
};

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;

/***/ }),

/***/ 9819:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const encodeUtf8 = __webpack_require__(1029);
const Mode = __webpack_require__(6203);
function ByteData(data) {
  this.mode = Mode.BYTE;
  if (typeof data === 'string') {
    data = encodeUtf8(data);
  }
  this.data = new Uint8Array(data);
}
ByteData.getBitsLength = function getBitsLength(length) {
  return length * 8;
};
ByteData.prototype.getLength = function getLength() {
  return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
  return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};
module.exports = ByteData;

/***/ }),

/***/ 1243:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const ECLevel = __webpack_require__(2918);
const EC_BLOCKS_TABLE = [
// L  M  Q  H
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
const EC_CODEWORDS_TABLE = [
// L  M  Q  H
7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
    default:
      return undefined;
  }
};

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
    default:
      return undefined;
  }
};

/***/ }),

/***/ 2918:
/***/ ((__unused_webpack_module, exports) => {

exports.L = {
  bit: 1
};
exports.M = {
  bit: 0
};
exports.Q = {
  bit: 3
};
exports.H = {
  bit: 2
};
function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }
  const lcStr = string.toLowerCase();
  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L;
    case 'm':
    case 'medium':
      return exports.M;
    case 'q':
    case 'quartile':
      return exports.Q;
    case 'h':
    case 'high':
      return exports.H;
    default:
      throw new Error('Unknown EC Level: ' + string);
  }
}
exports.isValid = function isValid(level) {
  return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }
  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};

/***/ }),

/***/ 9480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const getSymbolSize = (__webpack_require__(2488).getSymbolSize);
const FINDER_PATTERN_SIZE = 7;

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions(version) {
  const size = getSymbolSize(version);
  return [
  // top-left
  [0, 0],
  // top-right
  [size - FINDER_PATTERN_SIZE, 0],
  // bottom-left
  [0, size - FINDER_PATTERN_SIZE]];
};

/***/ }),

/***/ 4724:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(2488);
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils.getBCHDigit(G15);

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
  const data = errorCorrectionLevel.bit << 3 | mask;
  let d = data << 10;
  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return (data << 10 | d) ^ G15_MASK;
};

/***/ }),

/***/ 1275:
/***/ ((__unused_webpack_module, exports) => {

const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;
(function initTables() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1; // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) {
      // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.log = function log(n) {
  if (n < 1) throw new Error('log(' + n + ')');
  return LOG_TABLE[n];
};

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.exp = function exp(n) {
  return EXP_TABLE[n];
};

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
exports.mul = function mul(x, y) {
  if (x === 0 || y === 0) return 0;

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};

/***/ }),

/***/ 2740:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(6203);
const Utils = __webpack_require__(2488);
function KanjiData(data) {
  this.mode = Mode.KANJI;
  this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
  return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
  return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
  return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function (bitBuffer) {
  let i;

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils.toSJIS(this.data[i]);

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140;

      // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13);
  }
};
module.exports = KanjiData;

/***/ }),

/***/ 189:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
const PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
};

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid(mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from(value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined;
};

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1(data) {
  const size = data.size;
  let points = 0;
  let sameCountCol = 0;
  let sameCountRow = 0;
  let lastCol = null;
  let lastRow = null;
  for (let row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0;
    lastCol = lastRow = null;
    for (let col = 0; col < size; col++) {
      let module = data.get(row, col);
      if (module === lastCol) {
        sameCountCol++;
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        lastCol = module;
        sameCountCol = 1;
      }
      module = data.get(col, row);
      if (module === lastRow) {
        sameCountRow++;
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        lastRow = module;
        sameCountRow = 1;
      }
    }
    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
  }
  return points;
};

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2(data) {
  const size = data.size;
  let points = 0;
  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
      if (last === 4 || last === 0) points++;
    }
  }
  return points * PenaltyScores.N2;
};

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3(data) {
  const size = data.size;
  let points = 0;
  let bitsCol = 0;
  let bitsRow = 0;
  for (let row = 0; row < size; row++) {
    bitsCol = bitsRow = 0;
    for (let col = 0; col < size; col++) {
      bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
      bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
    }
  }
  return points * PenaltyScores.N3;
};

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4(data) {
  let darkCount = 0;
  const modulesCount = data.data.length;
  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
  const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
  return k * PenaltyScores.N4;
};

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt(maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000:
      return (i + j) % 2 === 0;
    case exports.Patterns.PATTERN001:
      return i % 2 === 0;
    case exports.Patterns.PATTERN010:
      return j % 3 === 0;
    case exports.Patterns.PATTERN011:
      return (i + j) % 3 === 0;
    case exports.Patterns.PATTERN100:
      return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
    case exports.Patterns.PATTERN101:
      return i * j % 2 + i * j % 3 === 0;
    case exports.Patterns.PATTERN110:
      return (i * j % 2 + i * j % 3) % 2 === 0;
    case exports.Patterns.PATTERN111:
      return (i * j % 3 + (i + j) % 2) % 2 === 0;
    default:
      throw new Error('bad maskPattern:' + maskPattern);
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask(pattern, data) {
  const size = data.size;
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue;
      data.xor(row, col, getMaskAt(pattern, row, col));
    }
  }
};

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask(data, setupFormatFunc) {
  const numPatterns = Object.keys(exports.Patterns).length;
  let bestPattern = 0;
  let lowerPenalty = Infinity;
  for (let p = 0; p < numPatterns; p++) {
    setupFormatFunc(p);
    exports.applyMask(p, data);

    // Calculate penalty
    const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);

    // Undo previously applied mask
    exports.applyMask(p, data);
    if (penalty < lowerPenalty) {
      lowerPenalty = penalty;
      bestPattern = p;
    }
  }
  return bestPattern;
};

/***/ }),

/***/ 6203:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const VersionCheck = __webpack_require__(3611);
const Regex = __webpack_require__(296);

/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
};

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
};

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
};

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
};

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
};

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version);
  }
  if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];
  return mode.ccBits[2];
};

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData(dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (Regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;
};

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString(mode) {
  if (mode && mode.id) return mode.id;
  throw new Error('Invalid mode');
};

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid(mode) {
  return mode && mode.bit && mode.ccBits;
};

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }
  const lcStr = string.toLowerCase();
  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC;
    case 'alphanumeric':
      return exports.ALPHANUMERIC;
    case 'kanji':
      return exports.KANJI;
    case 'byte':
      return exports.BYTE;
    default:
      throw new Error('Unknown mode: ' + string);
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }
  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};

/***/ }),

/***/ 6701:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(6203);
function NumericData(data) {
  this.mode = Mode.NUMERIC;
  this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
  return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
  let i, group, value;

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer.put(value, 10);
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};
module.exports = NumericData;

/***/ }),

/***/ 3528:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const GF = __webpack_require__(1275);

/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul(p1, p2) {
  const coeff = new Uint8Array(p1.length + p2.length - 1);
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j]);
    }
  }
  return coeff;
};

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod(divident, divisor) {
  let result = new Uint8Array(divident);
  while (result.length - divisor.length >= 0) {
    const coeff = result[0];
    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff);
    }

    // remove all zeros from buffer head
    let offset = 0;
    while (offset < result.length && result[offset] === 0) offset++;
    result = result.slice(offset);
  }
  return result;
};

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial(degree) {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
  }
  return poly;
};

/***/ }),

/***/ 8770:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(2488);
const ECLevel = __webpack_require__(2918);
const BitBuffer = __webpack_require__(6410);
const BitMatrix = __webpack_require__(6706);
const AlignmentPattern = __webpack_require__(2625);
const FinderPattern = __webpack_require__(9480);
const MaskPattern = __webpack_require__(189);
const ECCode = __webpack_require__(1243);
const ReedSolomonEncoder = __webpack_require__(2674);
const Version = __webpack_require__(6566);
const FormatInfo = __webpack_require__(4724);
const Mode = __webpack_require__(6203);
const Segments = __webpack_require__(3408);

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern(matrix, version) {
  const size = matrix.size;
  const pos = FinderPattern.getPositions(version);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue;
        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern(matrix) {
  const size = matrix.size;
  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern(matrix, version) {
  const pos = AlignmentPattern.getPositions(version);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo(matrix, version) {
  const size = matrix.size;
  const bits = Version.getEncodedBits(version);
  let row, col, mod;
  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size;
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  let i, mod;
  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1;

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true);
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData(matrix, data) {
  const size = matrix.size;
  let inc = -1;
  let row = size - 1;
  let bitIndex = 7;
  let byteIndex = 0;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false;
          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }
          matrix.set(row, col - c, dark);
          bitIndex--;
          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData(version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer();
  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4);

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));

    // add binary data sequence to buffer
    data.write(buffer);
  });

  // Calculate required number of bits
  const totalCodewords = Utils.getSymbolTotalCodewords(version);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }
  return createCodewords(buffer, version, errorCorrectionLevel);
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords(bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords;

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks;
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount);
  let offset = 0;
  const dcData = new Array(ecTotalBlocks);
  const ecData = new Array(ecTotalBlocks);
  let maxDataSize = 0;
  const buffer = new Uint8Array(bitBuffer.buffer);

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize);

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords);
  let index = 0;
  let i, r;

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }
  return data;
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
  let segments;
  if (Array.isArray(data)) {
    segments = Segments.fromArray(data);
  } else if (typeof data === 'string') {
    let estimatedVersion = version;
    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data);

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data');
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code');
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion;

    // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
  }
  const dataBits = createData(version, errorCorrectionLevel, segments);

  // Allocate matrix buffer
  const moduleCount = Utils.getSymbolSize(version);
  const modules = new BitMatrix(moduleCount);

  // Add function modules
  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version);

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0);
  if (version >= 7) {
    setupVersionInfo(modules, version);
  }

  // Add data codewords
  setupData(modules, dataBits);
  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules);

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  };
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
exports.create = function create(data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text');
  }
  let errorCorrectionLevel = ECLevel.M;
  let version;
  let mask;
  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);
    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc);
    }
  }
  return createSymbol(data, version, errorCorrectionLevel, mask);
};

/***/ }),

/***/ 2674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Polynomial = __webpack_require__(3528);
function ReedSolomonEncoder(degree) {
  this.genPoly = undefined;
  this.degree = degree;
  if (this.degree) this.initialize(this.degree);
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized');
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly);

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length;
  if (start > 0) {
    const buff = new Uint8Array(this.degree);
    buff.set(remainder, start);
    return buff;
  }
  return remainder;
};
module.exports = ReedSolomonEncoder;

/***/ }),

/***/ 296:
/***/ ((__unused_webpack_module, exports) => {

const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');
const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
exports.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};

/***/ }),

/***/ 3408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Mode = __webpack_require__(6203);
const NumericData = __webpack_require__(6701);
const AlphanumericData = __webpack_require__(6278);
const ByteData = __webpack_require__(9819);
const KanjiData = __webpack_require__(2740);
const Regex = __webpack_require__(296);
const Utils = __webpack_require__(2488);
const dijkstra = __webpack_require__(3502);

/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength(str) {
  return unescape(encodeURIComponent(str)).length;
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments(regex, mode, str) {
  const segments = [];
  let result;
  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    });
  }
  return segments;
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString(dataStr) {
  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
  let byteSegs;
  let kanjiSegs;
  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
    kanjiSegs = [];
  }
  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
  return segs.sort(function (s1, s2) {
    return s1.index - s2.index;
  }).map(function (obj) {
    return {
      data: obj.data,
      mode: obj.mode,
      length: obj.length
    };
  });
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength(length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length);
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length);
    case Mode.KANJI:
      return KanjiData.getBitsLength(length);
    case Mode.BYTE:
      return ByteData.getBitsLength(length);
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments(segs) {
  return segs.reduce(function (acc, curr) {
    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data;
      return acc;
    }
    acc.push(curr);
    return acc;
  }, []);
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes(segs) {
  const nodes = [];
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.ALPHANUMERIC,
          length: seg.length
        }, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;
      case Mode.ALPHANUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;
      case Mode.KANJI:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
        break;
      case Mode.BYTE:
        nodes.push([{
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
    }
  }
  return nodes;
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph(nodes, version) {
  const table = {};
  const graph = {
    start: {}
  };
  let prevNodeIds = ['start'];
  for (let i = 0; i < nodes.length; i++) {
    const nodeGroup = nodes[i];
    const currentNodeIds = [];
    for (let j = 0; j < nodeGroup.length; j++) {
      const node = nodeGroup[j];
      const key = '' + i + j;
      currentNodeIds.push(key);
      table[key] = {
        node: node,
        lastCount: 0
      };
      graph[key] = {};
      for (let n = 0; n < prevNodeIds.length; n++) {
        const prevNodeId = prevNodeIds[n];
        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
          table[prevNodeId].lastCount += node.length;
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
        }
      }
    }
    prevNodeIds = currentNodeIds;
  }
  for (let n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]].end = 0;
  }
  return {
    map: graph,
    table: table
  };
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment(data, modesHint) {
  let mode;
  const bestMode = Mode.getBestModeForData(data);
  mode = Mode.from(modesHint, bestMode);

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE;
  }
  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data);
    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data);
    case Mode.KANJI:
      return new KanjiData(data);
    case Mode.BYTE:
      return new ByteData(data);
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray(array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null));
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode));
    }
    return acc;
  }, []);
};

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString(data, version) {
  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
  const nodes = buildNodes(segs);
  const graph = buildGraph(nodes, version);
  const path = dijkstra.find_path(graph.map, 'start', 'end');
  const optimizedSegs = [];
  for (let i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node);
  }
  return exports.fromArray(mergeSegments(optimizedSegs));
};

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit(data) {
  return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};

/***/ }),

/***/ 2488:
/***/ ((__unused_webpack_module, exports) => {

let toSJISFunction;
const CODEWORDS_COUNT = [0,
// Not used
26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
exports.getSymbolSize = function getSymbolSize(version) {
  if (!version) throw new Error('"version" cannot be null or undefined');
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
  return version * 4 + 17;
};

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
  return CODEWORDS_COUNT[version];
};

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
exports.getBCHDigit = function (data) {
  let digit = 0;
  while (data !== 0) {
    digit++;
    data >>>= 1;
  }
  return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.');
  }
  toSJISFunction = f;
};
exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined';
};
exports.toSJIS = function toSJIS(kanji) {
  return toSJISFunction(kanji);
};

/***/ }),

/***/ 3611:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid(version) {
  return !isNaN(version) && version >= 1 && version <= 40;
};

/***/ }),

/***/ 6566:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(2488);
const ECCode = __webpack_require__(1243);
const ECLevel = __webpack_require__(2918);
const Mode = __webpack_require__(6203);
const VersionCheck = __webpack_require__(3611);

// Generator polynomial used to encode version information
const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
const G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion;
    }
  }
  return undefined;
}
function getReservedBitsCount(mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
  let totalBits = 0;
  segments.forEach(function (data) {
    const reservedBits = getReservedBitsCount(data.mode, version);
    totalBits += reservedBits + data.getBitsLength();
  });
  return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    const length = getTotalBitsFromDataArray(segments, currentVersion);
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion;
    }
  }
  return undefined;
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from(value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10);
  }
  return defaultValue;
};

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version');
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE;

  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
  if (mode === Mode.MIXED) return dataTotalCodewordsBits;
  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor(usableBits / 10 * 3);
    case Mode.ALPHANUMERIC:
      return Math.floor(usableBits / 11 * 2);
    case Mode.KANJI:
      return Math.floor(usableBits / 13);
    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8);
  }
};

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
  let seg;
  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl);
    }
    if (data.length === 0) {
      return 1;
    }
    seg = data[0];
  } else {
    seg = data;
  }
  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits(version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version');
  }
  let d = version << 12;
  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
  }
  return version << 12 | d;
};

/***/ }),

/***/ 7616:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(5423);
function clearCanvas(ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!canvas.style) canvas.style = {};
  canvas.height = size;
  canvas.width = size;
  canvas.style.height = size + 'px';
  canvas.style.width = size + 'px';
}
function getCanvasElement() {
  try {
    return document.createElement('canvas');
  } catch (e) {
    throw new Error('You need to specify a canvas element');
  }
}
exports.render = function render(qrData, canvas, options) {
  let opts = options;
  let canvasEl = canvas;
  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }
  if (!canvas) {
    canvasEl = getCanvasElement();
  }
  opts = Utils.getOptions(opts);
  const size = Utils.getImageWidth(qrData.modules.size, opts);
  const ctx = canvasEl.getContext('2d');
  const image = ctx.createImageData(size, size);
  Utils.qrToImageData(image.data, qrData, opts);
  clearCanvas(ctx, canvasEl, size);
  ctx.putImageData(image, 0, 0);
  return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
  let opts = options;
  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }
  if (!opts) opts = {};
  const canvasEl = exports.render(qrData, canvas, opts);
  const type = opts.type || 'image/png';
  const rendererOpts = opts.rendererOpts || {};
  return canvasEl.toDataURL(type, rendererOpts.quality);
};

/***/ }),

/***/ 6613:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(5423);
function getColorAttrib(color, attrib) {
  const alpha = color.a / 255;
  const str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;
  return str;
}
function qrToPath(data, size, margin) {
  let path = '';
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;
  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);
    if (!col && !newRow) newRow = true;
    if (data[i]) {
      lineLength++;
      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
        moveBy = 0;
        newRow = false;
      }
      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }
  return path;
}
exports.render = function render(qrData, options, cb) {
  const opts = Utils.getOptions(options);
  const size = qrData.modules.size;
  const data = qrData.modules.data;
  const qrcodesize = size + opts.margin * 2;
  const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
  const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
  if (typeof cb === 'function') {
    cb(null, svgTag);
  }
  return svgTag;
};

/***/ }),

/***/ 5423:
/***/ ((__unused_webpack_module, exports) => {

function hex2rgba(hex) {
  if (typeof hex === 'number') {
    hex = hex.toString();
  }
  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string');
  }
  let hexCode = hex.slice().replace('#', '').split('');
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex);
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c];
    }));
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F');
  const hexValue = parseInt(hexCode.join(''), 16);
  return {
    r: hexValue >> 24 & 255,
    g: hexValue >> 16 & 255,
    b: hexValue >> 8 & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  };
}
exports.getOptions = function getOptions(options) {
  if (!options) options = {};
  if (!options.color) options.color = {};
  const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
  const width = options.width && options.width >= 21 ? options.width : undefined;
  const scale = options.scale || 4;
  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  };
};
exports.getScale = function getScale(qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
  const scale = exports.getScale(qrSize, opts);
  return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
  const size = qr.modules.size;
  const data = qr.modules.data;
  const scale = exports.getScale(size, opts);
  const symbolSize = Math.floor((size + opts.margin * 2) * scale);
  const scaledMargin = opts.margin * scale;
  const palette = [opts.color.light, opts.color.dark];
  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4;
      let pxColor = opts.color.light;
      if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        const iSrc = Math.floor((i - scaledMargin) / scale);
        const jSrc = Math.floor((j - scaledMargin) / scale);
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
      }
      imgData[posDst++] = pxColor.r;
      imgData[posDst++] = pxColor.g;
      imgData[posDst++] = pxColor.b;
      imgData[posDst] = pxColor.a;
    }
  }
};

/***/ }),

/***/ 7293:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./android-chrome-192x192.png": 3887,
	"./android-chrome-512x512.png": 7373,
	"./apple-touch-icon.png": 3718,
	"./ar.svg": 9664,
	"./closingblockquote.svg": 8463,
	"./conferenciasobrepistoladebelgrano.jpg": 9525,
	"./divideravancarga.svg": 7985,
	"./error.jpg": 8171,
	"./favicon-16x16.png": 4787,
	"./favicon-32x32.png": 9775,
	"./fieldcannot.svg": 2160,
	"./flintlock.svg": 9806,
	"./fondoanos.svg": 37,
	"./fotodellibrosobrelapistoladebelgrano.jpeg": 830,
	"./fotoreplicadepistoladebelgrano.jpg": 5315,
	"./fotosdeosvaldoymartin.jpeg": 954,
	"./galeria/Workshop1.jpg": 5238,
	"./galeria/Workshop10.jpg": 3061,
	"./galeria/Workshop11.jpg": 5346,
	"./galeria/Workshop12.jpg": 6421,
	"./galeria/Workshop13.jpg": 1449,
	"./galeria/Workshop14.jpg": 1765,
	"./galeria/Workshop16.jpg": 5035,
	"./galeria/Workshop17.jpg": 9177,
	"./galeria/Workshop18.jpg": 8959,
	"./galeria/Workshop19.jpg": 6029,
	"./galeria/Workshop2.jpg": 9259,
	"./galeria/Workshop20.jpg": 6173,
	"./galeria/Workshop21.jpg": 325,
	"./galeria/Workshop22.jpg": 7689,
	"./galeria/Workshop23.jpg": 4474,
	"./galeria/Workshop24.jpg": 3685,
	"./galeria/Workshop25.jpg": 8427,
	"./galeria/Workshop26.jpg": 4337,
	"./galeria/Workshop29.jpg": 4096,
	"./galeria/Workshop3.jpg": 1388,
	"./galeria/Workshop30.jpg": 9575,
	"./galeria/Workshop31.jpg": 6076,
	"./galeria/Workshop32.jpg": 825,
	"./galeria/Workshop33.jpg": 9726,
	"./galeria/Workshop34.jpg": 8530,
	"./galeria/Workshop35.jpg": 5120,
	"./galeria/Workshop37.jpg": 2303,
	"./galeria/Workshop4.jpg": 5208,
	"./galeria/Workshop5.jpg": 4943,
	"./galeria/Workshop6.jpg": 5828,
	"./galeria/Workshop7.jpg": 7463,
	"./galeria/Workshop8.jpg": 7841,
	"./galeria/Workshop9.jpg": 2628,
	"./galeria/middle/Workshop1.jpg": 8086,
	"./galeria/middle/Workshop10.jpg": 8786,
	"./galeria/middle/Workshop11.jpg": 8555,
	"./galeria/middle/Workshop12.jpg": 2677,
	"./galeria/middle/Workshop13.jpg": 4522,
	"./galeria/middle/Workshop14.jpg": 9265,
	"./galeria/middle/Workshop16.jpg": 3869,
	"./galeria/middle/Workshop17.jpg": 2188,
	"./galeria/middle/Workshop18.jpg": 182,
	"./galeria/middle/Workshop19.jpg": 9714,
	"./galeria/middle/Workshop2.jpg": 2658,
	"./galeria/middle/Workshop20.jpg": 2823,
	"./galeria/middle/Workshop21.jpg": 9280,
	"./galeria/middle/Workshop22.jpg": 4942,
	"./galeria/middle/Workshop23.jpg": 4753,
	"./galeria/middle/Workshop24.jpg": 6292,
	"./galeria/middle/Workshop25.jpg": 1867,
	"./galeria/middle/Workshop26.jpg": 4860,
	"./galeria/middle/Workshop29.jpg": 1579,
	"./galeria/middle/Workshop3.jpg": 1300,
	"./galeria/middle/Workshop30.jpg": 5425,
	"./galeria/middle/Workshop31.jpg": 7222,
	"./galeria/middle/Workshop32.jpg": 6875,
	"./galeria/middle/Workshop33.jpg": 4928,
	"./galeria/middle/Workshop34.jpg": 4201,
	"./galeria/middle/Workshop35.jpg": 6006,
	"./galeria/middle/Workshop37.jpg": 6399,
	"./galeria/middle/Workshop4.jpg": 4089,
	"./galeria/middle/Workshop5.jpg": 8511,
	"./galeria/middle/Workshop6.jpg": 5383,
	"./galeria/middle/Workshop7.jpg": 795,
	"./galeria/middle/Workshop8.jpg": 7790,
	"./galeria/middle/Workshop9.jpg": 6555,
	"./galeria/thumbnails/Workshop1.jpg": 477,
	"./galeria/thumbnails/Workshop10.jpg": 1390,
	"./galeria/thumbnails/Workshop11.jpg": 1200,
	"./galeria/thumbnails/Workshop12.jpg": 6667,
	"./galeria/thumbnails/Workshop13.jpg": 1729,
	"./galeria/thumbnails/Workshop14.jpg": 7589,
	"./galeria/thumbnails/Workshop16.jpg": 3486,
	"./galeria/thumbnails/Workshop17.jpg": 2103,
	"./galeria/thumbnails/Workshop18.jpg": 712,
	"./galeria/thumbnails/Workshop19.jpg": 8909,
	"./galeria/thumbnails/Workshop2.jpg": 7582,
	"./galeria/thumbnails/Workshop20.jpg": 7848,
	"./galeria/thumbnails/Workshop21.jpg": 2257,
	"./galeria/thumbnails/Workshop22.jpg": 1252,
	"./galeria/thumbnails/Workshop23.jpg": 619,
	"./galeria/thumbnails/Workshop24.jpg": 8217,
	"./galeria/thumbnails/Workshop25.jpg": 6119,
	"./galeria/thumbnails/Workshop26.jpg": 7070,
	"./galeria/thumbnails/Workshop29.jpg": 3607,
	"./galeria/thumbnails/Workshop3.jpg": 3907,
	"./galeria/thumbnails/Workshop30.jpg": 1043,
	"./galeria/thumbnails/Workshop31.jpg": 7422,
	"./galeria/thumbnails/Workshop32.jpg": 9865,
	"./galeria/thumbnails/Workshop33.jpg": 7262,
	"./galeria/thumbnails/Workshop34.jpg": 1506,
	"./galeria/thumbnails/Workshop35.jpg": 6372,
	"./galeria/thumbnails/Workshop37.jpg": 5469,
	"./galeria/thumbnails/Workshop4.jpg": 3574,
	"./galeria/thumbnails/Workshop5.jpg": 3862,
	"./galeria/thumbnails/Workshop6.jpg": 1794,
	"./galeria/thumbnails/Workshop7.jpg": 7819,
	"./galeria/thumbnails/Workshop8.jpg": 6577,
	"./galeria/thumbnails/Workshop9.jpg": 125,
	"./logoarmasantiguasosvaldogatto.jpg": 5034,
	"./logoarmasantiguasosvaldogatto.svg": 3909,
	"./matchlock.svg": 3489,
	"./mortar.svg": 9041,
	"./mstile-150x150.png": 5314,
	"./navycannon.svg": 1505,
	"./openingblockquote.svg": 6539,
	"./percussion.svg": 3107,
	"./perfilosvaldo.jpg": 5594,
	"./pistoladerueda.jpg": 3727,
	"./productos/accesorios/ac001_imagen.jpg": 1339,
	"./productos/accesorios/ac001_imagen001.jpg": 4590,
	"./productos/accesorios/ac001_imagen002.jpg": 2196,
	"./productos/accesorios/dosificador1-removebg.png": 8332,
	"./productos/accesorios/dosificador1.jpg": 3691,
	"./productos/accesorios/dosificador2-removebg-preview.png": 4820,
	"./productos/accesorios/dosificador2.jpg": 5266,
	"./productos/accesorios/dosificador3-removebg-preview.png": 1157,
	"./productos/accesorios/dosificador3.jpg": 3712,
	"./productos/accesorios/martillo.jpg": 4270,
	"./productos/accesorios/martillo1.jpg": 1498,
	"./productos/accesorios/martillo2.jpg": 1972,
	"./productos/accesorios/molde-removebg.png": 4172,
	"./productos/accesorios/molde.jpg": 7545,
	"./productos/accesorios/molde2-removebg-preview.png": 9659,
	"./productos/accesorios/molde2.jpg": 7402,
	"./productos/accesorios/molde3.jpg": 6533,
	"./productos/accesorios/molde4.jpg": 3959,
	"./productos/accesorios/opticareticula.jpg": 893,
	"./productos/accesorios/opticareticula2.jpg": 5973,
	"./productos/accesorios/opticareticula3.jpg": 8940,
	"./productos/accesorios/opticareticula4.jpg": 229,
	"./productos/accesorios/opticareticula5.jpg": 9391,
	"./productos/accesorios/opticareticula6.jpg": 4855,
	"./productos/accesorios/polvorera.jpg": 9361,
	"./productos/accesorios/polvorera1.jpg": 7765,
	"./productos/accesorios/polvorera2.jpg": 9278,
	"./productos/canones/canon63/cn008_imagen.jpg": 2762,
	"./productos/canones/canon63/cn008_imagen001.jpg": 746,
	"./productos/canones/canon63/cn008_imagen002.jpg": 9743,
	"./productos/canones/canon63/cn008_imagen003.jpg": 8679,
	"./productos/canones/canon63/cn008_imagen004.jpg": 8835,
	"./productos/canones/canon63/cn008_imagen005.jpg": 2300,
	"./productos/canones/canones.jpg": 9376,
	"./productos/canones/canonnapoleonico/cn0900.jpg": 6037,
	"./productos/canones/canonnapoleonico/cn091.jpg": 8882,
	"./productos/canones/canonnapoleonico/cn0910.jpg": 9455,
	"./productos/canones/canonnapoleonico/cn0911.jpg": 1412,
	"./productos/canones/canonnapoleonico/cn093.jpg": 8339,
	"./productos/canones/canonnapoleonico/cn095.jpg": 5831,
	"./productos/canones/canonnapoleonico/cn096.jpg": 883,
	"./productos/canones/canonnapoleonico/cn097.jpg": 6838,
	"./productos/canones/canonnapoleonico/cn098.jpg": 4290,
	"./productos/canones/canonnapoleonico/cn099.jpg": 9231,
	"./productos/canones/canonnapoleonico21mm/cn011_imagen.jpg": 8779,
	"./productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg": 3479,
	"./productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg": 2531,
	"./productos/canones/canonnavalcal54/car_540.jpg": 7447,
	"./productos/canones/canonnavalcal54/car_541.jpg": 3202,
	"./productos/canones/canonnavalcal54/car_542.jpg": 5586,
	"./productos/canones/canonnavalcal54/car_543.jpg": 4767,
	"./productos/canones/canonnavalcal54/car_544.jpg": 1987,
	"./productos/canones/canonnavalcal54/car_545.jpg": 9585,
	"./productos/canones/canonnavalcal54/car_546.jpg": 9291,
	"./productos/canones/canonnavalcal54/car_547.jpg": 8065,
	"./productos/canones/canonnavalcal54/car_548.jpg": 7179,
	"./productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg": 7283,
	"./productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg": 5202,
	"./productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg": 9326,
	"./productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg": 3050,
	"./productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg": 3290,
	"./productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg": 2462,
	"./productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg": 8782,
	"./productos/canones/canonnavaldeavisovictory/victory esc.jpg": 5977,
	"./productos/canones/canonnavalespanol1810/cn005_imagen.jpg": 5951,
	"./productos/canones/canonnavalespanol1810/cn005_imagen001.jpg": 3235,
	"./productos/canones/canonnavalespanol1810/cn005_imagen002.jpg": 6406,
	"./productos/canones/canonvictoryacero/cn006_imagen007.jpg": 5095,
	"./productos/canones/canonvictoryacero/cn006_imagen008.jpg": 6936,
	"./productos/canones/canonvictoryacero/steel1.jpg": 4668,
	"./productos/canones/culebrina/cu001_imagen.jpg": 4686,
	"./productos/canones/culebrina/cu001_imagen001.jpg": 6096,
	"./productos/canones/mo002_imagen002.jpg": 1348,
	"./productos/canones/morterodecampana/mo001_imagen.jpg": 932,
	"./productos/canones/morterodecampana/mo001_imagen001.jpg": 7979,
	"./productos/canones/morteroingleslondon/mo002_imagen.jpg": 7757,
	"./productos/canones/morteroingleslondon/mo002_imagen001.jpg": 1288,
	"./productos/canones/morteroingleslondon/mo002_imagen002.jpg": 8282,
	"./productos/canones/morteroingleslondon/mo002_imagen003.jpg": 9552,
	"./productos/canones/morterointermedioespanol/mo003_imagen.jpg": 9995,
	"./productos/canones/morterointermedioespanol/mo003_imagen001.jpg": 4670,
	"./productos/canones/morterointermedioespanol/mo003_imagen002.jpg": 749,
	"./productos/canones/morterointermedioespanol/mo003_imagen003.jpg": 6067,
	"./productos/militaria/V_lf2_01.jpg": 2441,
	"./productos/pistolasyfusiles/Bbess1.jpg": 3928,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg": 9652,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg": 3660,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg": 4847,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg": 8337,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg": 3575,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg": 728,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg": 32,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg": 8935,
	"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg": 430,
	"./productos/pistolasyfusiles/fusilcharleville/charleville00.jpg": 7165,
	"./productos/pistolasyfusiles/fusilcharleville/charleville1.jpg": 9888,
	"./productos/pistolasyfusiles/fusilcharleville/charleville2.jpg": 271,
	"./productos/pistolasyfusiles/fusilcharleville/charleville3.jpg": 6942,
	"./productos/pistolasyfusiles/fusilcharleville/charleville4.jpg": 6870,
	"./productos/pistolasyfusiles/fusilcharleville/charleville5.jpg": 2349,
	"./productos/pistolasyfusiles/fusilcharleville/charleville6.jpg": 700,
	"./productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg": 2750,
	"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg": 3517,
	"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg": 3228,
	"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg": 1931,
	"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg": 5805,
	"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg": 7177,
	"./productos/pistolasyfusiles/pistolaaston/aston1.jpg": 3548,
	"./productos/pistolasyfusiles/pistolaaston/aston2.jpg": 304,
	"./productos/pistolasyfusiles/pistolaaston/aston3.jpg": 6238,
	"./productos/pistolasyfusiles/pistolaaston/aston4.jpg": 3155,
	"./productos/pistolasyfusiles/pistolaaston/aston5.jpg": 1510,
	"./productos/pistolasyfusiles/pistolaaston/aston6.jpg": 5774,
	"./productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg": 4751,
	"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg": 469,
	"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg": 1036,
	"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg": 7153,
	"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg": 4326,
	"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg": 9410,
	"./productos/pistolasyfusiles/pistolabarnett/barnett00.jpg": 5043,
	"./productos/pistolasyfusiles/pistolabarnett/barnett01.jpg": 5758,
	"./productos/pistolasyfusiles/pistolabarnett/barnett02.jpg": 7472,
	"./productos/pistolasyfusiles/pistolabarnett/barnett03.jpg": 2280,
	"./productos/pistolasyfusiles/pistolabarnett/barnett04.jpg": 3310,
	"./productos/pistolasyfusiles/pistolabarnett/barnett05.jpg": 6854,
	"./productos/pistolasyfusiles/pistolabarnett/barnett06.jpg": 8344,
	"./productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg": 8703,
	"./productos/pistolasyfusiles/pistolabelgrano.jpg": 8747,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg": 159,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg": 6279,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg": 781,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg": 3181,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg": 9198,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg": 2549,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg": 4084,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg": 9287,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg": 7260,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg": 4283,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg": 9655,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg": 5567,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg": 1999,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg": 1376,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg": 9748,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg": 6145,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg": 2391,
	"./productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg": 5470,
	"./productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg": 5455,
	"./productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg": 3680,
	"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg": 5421,
	"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg": 486,
	"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg": 6822,
	"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg": 6280,
	"./productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg": 5290,
	"./productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg": 8719,
	"./productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg": 2398,
	"./productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg": 6099,
	"./productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg": 475,
	"./productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg": 7188,
	"./productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg": 8990,
	"./productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg": 4612,
	"./productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg": 853,
	"./productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg": 8646,
	"./productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg": 5777,
	"./productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg": 7182,
	"./productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg": 4825,
	"./productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg": 6186,
	"./productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg": 6783,
	"./productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg": 1993,
	"./productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg": 9969,
	"./productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg": 61,
	"./productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg": 3596,
	"./productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg": 7739,
	"./productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg": 3106,
	"./productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg": 9721,
	"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg": 5677,
	"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg": 350,
	"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg": 2629,
	"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg": 8470,
	"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg": 4937,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg": 2925,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg": 2634,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg": 8041,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg": 8963,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg": 7799,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg": 1908,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg": 2585,
	"./productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg": 1019,
	"./productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg": 9712,
	"./productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg": 8492,
	"./productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg": 4019,
	"./productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg": 9681,
	"./productos/pistolasyfusiles/pistolalorenz/pp016.jpg": 9915,
	"./productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg": 1900,
	"./productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg": 516,
	"./productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg": 9002,
	"./productos/pistolasyfusiles/pistolaperkins/perkins011.jpg": 3725,
	"./productos/pistolasyfusiles/pistolaperkins/perkins03.jpg": 6383,
	"./productos/pistolasyfusiles/pistolaperkins/perkins06.jpg": 6058,
	"./productos/pistolasyfusiles/pistolaperkins/perkins11.jpg": 6061,
	"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg": 5642,
	"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg": 1907,
	"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg": 8313,
	"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg": 4971,
	"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg": 9918,
	"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg": 7291,
	"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg": 6078,
	"./productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg": 8267,
	"./productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg": 5781,
	"./productos/pistolasyfusiles/pistolarueda/rueda20141.jpg": 63,
	"./productos/pistolasyfusiles/pistolarueda/rueda20142.jpg": 6040,
	"./productos/pistolasyfusiles/pistolarueda/rueda20143.jpg": 1153,
	"./productos/pistolasyfusiles/pistolarueda/rueda20147.jpg": 463,
	"./productos/pistolasyfusiles/pistolarueda/rueda20181.jpg": 140,
	"./productos/pistolasyfusiles/pistolarueda/rueda20182.jpg": 9534,
	"./productos/pistolasyfusiles/pistolarueda/rueda20183.jpg": 9948,
	"./productos/pistolasyfusiles/pistolarueda/rueda20185.jpg": 7802,
	"./productos/pistolasyfusiles/pistolarueda/rueda20186.jpg": 8197,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg": 7812,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg": 9626,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg": 1982,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg": 5784,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg": 7387,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg": 2555,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg": 7707,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg": 1839,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg": 4998,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg": 9196,
	"./productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg": 4310,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg": 5135,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg": 9353,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg": 8196,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg": 2334,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg": 3650,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg": 244,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg": 6298,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg": 1044,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg": 8073,
	"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg": 6028,
	"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg": 9436,
	"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg": 8187,
	"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg": 558,
	"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg": 9328,
	"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg": 8182,
	"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg": 1625,
	"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg": 1387,
	"./productos/pistolasyfusiles/riflebbess/bbess1.jpg": 4011,
	"./productos/pistolasyfusiles/riflebbess/brownbess01.jpg": 7011,
	"./productos/pistolasyfusiles/riflebbess/brownbess02.jpg": 8805,
	"./productos/pistolasyfusiles/riflebbess/brownbess03.jpg": 3899,
	"./productos/pistolasyfusiles/riflebbess/brownbess04.jpg": 4916,
	"./productos/pistolasyfusiles/riflebbess/brownbess06.jpg": 44,
	"./productos/pistolasyfusiles/riflebbess/brownbess07.jpg": 7842,
	"./productos/pistolasyfusiles/riflebbess/brownbess08.jpg": 6272,
	"./productos/pistolasyfusiles/riflebbess/brownbess09.jpg": 1333,
	"./productos/pistolasyfusiles/riflebbess/brownbess10.jpg": 9383,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg": 4426,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg": 552,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg": 951,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg": 9859,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg": 6729,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg": 9331,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg": 6338,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg": 8708,
	"./productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg": 9225,
	"./productos/pistolasyfusiles/riflekentucky/frontier1.jpg": 4988,
	"./productos/pistolasyfusiles/riflekentucky/kentR1.jpg": 5894,
	"./productos/pistolasyfusiles/riflekentucky/kentR2.jpg": 9631,
	"./productos/pistolasyfusiles/riflekentucky/kentR3.jpg": 5712,
	"./productos/pistolasyfusiles/riflekentucky/kentR4.jpg": 5879,
	"./productos/pistolasyfusiles/riflekentucky/kentR5.jpg": 6479,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg": 3301,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg": 714,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg": 5546,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg": 5116,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg": 8123,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg": 6258,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg": 3253,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg": 7272,
	"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg": 3271,
	"./productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg": 5913,
	"./productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg": 1980,
	"./productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg": 5899,
	"./productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg": 7409,
	"./productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg": 3054,
	"./received.jpg": 411,
	"./recibido.jpg": 1069,
	"./restauraciones/restauraciones02.jpg": 4893,
	"./restauraciones/restauraciones03.jpg": 8789,
	"./restauraciones/restauraciones04.jpg": 4284,
	"./restauraciones/restauraciones05.jpg": 5434,
	"./restauraciones/restauraciones06.jpg": 610,
	"./restauraciones/thumbnails/restauraciones02.png": 522,
	"./restauraciones/thumbnails/restauraciones03.png": 7444,
	"./restauraciones/thumbnails/restauraciones04.png": 8177,
	"./restauraciones/thumbnails/restauraciones05.png": 9952,
	"./restauraciones/thumbnails/restauraciones06.png": 8381,
	"./riflesypistolas.jpg": 1284,
	"./safari-pinned-tab.svg": 7769,
	"./us.svg": 8705,
	"./wallpaperflare.com_wallpaper.jpg": 8004,
	"./wheellock.svg": 2326
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 7293;

/***/ }),

/***/ 3887:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/android-chrome-192x192.png";

/***/ }),

/***/ 7373:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/android-chrome-512x512.png";

/***/ }),

/***/ 3718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/apple-touch-icon.png";

/***/ }),

/***/ 9664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/ar.svg";

/***/ }),

/***/ 8463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/closingblockquote.svg";

/***/ }),

/***/ 9525:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/conferenciasobrepistoladebelgrano.jpg";

/***/ }),

/***/ 7985:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/divideravancarga.svg";

/***/ }),

/***/ 8171:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/error.jpg";

/***/ }),

/***/ 4787:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/favicon-16x16.png";

/***/ }),

/***/ 9775:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/favicon-32x32.png";

/***/ }),

/***/ 2160:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/fieldcannot.svg";

/***/ }),

/***/ 9806:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/flintlock.svg";

/***/ }),

/***/ 37:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/fondoanos.svg";

/***/ }),

/***/ 830:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/fotodellibrosobrelapistoladebelgrano.jpeg";

/***/ }),

/***/ 5315:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/fotoreplicadepistoladebelgrano.jpg";

/***/ }),

/***/ 954:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/fotosdeosvaldoymartin.jpeg";

/***/ }),

/***/ 5238:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop1.jpg";

/***/ }),

/***/ 3061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop10.jpg";

/***/ }),

/***/ 5346:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop11.jpg";

/***/ }),

/***/ 6421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop12.jpg";

/***/ }),

/***/ 1449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop13.jpg";

/***/ }),

/***/ 1765:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop14.jpg";

/***/ }),

/***/ 5035:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop16.jpg";

/***/ }),

/***/ 9177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop17.jpg";

/***/ }),

/***/ 8959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop18.jpg";

/***/ }),

/***/ 6029:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop19.jpg";

/***/ }),

/***/ 9259:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop2.jpg";

/***/ }),

/***/ 6173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop20.jpg";

/***/ }),

/***/ 325:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop21.jpg";

/***/ }),

/***/ 7689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop22.jpg";

/***/ }),

/***/ 4474:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop23.jpg";

/***/ }),

/***/ 3685:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop24.jpg";

/***/ }),

/***/ 8427:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop25.jpg";

/***/ }),

/***/ 4337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop26.jpg";

/***/ }),

/***/ 4096:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop29.jpg";

/***/ }),

/***/ 1388:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop3.jpg";

/***/ }),

/***/ 9575:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop30.jpg";

/***/ }),

/***/ 6076:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop31.jpg";

/***/ }),

/***/ 825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop32.jpg";

/***/ }),

/***/ 9726:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop33.jpg";

/***/ }),

/***/ 8530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop34.jpg";

/***/ }),

/***/ 5120:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop35.jpg";

/***/ }),

/***/ 2303:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop37.jpg";

/***/ }),

/***/ 5208:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop4.jpg";

/***/ }),

/***/ 4943:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop5.jpg";

/***/ }),

/***/ 5828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop6.jpg";

/***/ }),

/***/ 7463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop7.jpg";

/***/ }),

/***/ 7841:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop8.jpg";

/***/ }),

/***/ 2628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/Workshop9.jpg";

/***/ }),

/***/ 8086:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop1.jpg";

/***/ }),

/***/ 8786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop10.jpg";

/***/ }),

/***/ 8555:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop11.jpg";

/***/ }),

/***/ 2677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop12.jpg";

/***/ }),

/***/ 4522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop13.jpg";

/***/ }),

/***/ 9265:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop14.jpg";

/***/ }),

/***/ 3869:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop16.jpg";

/***/ }),

/***/ 2188:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop17.jpg";

/***/ }),

/***/ 182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop18.jpg";

/***/ }),

/***/ 9714:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop19.jpg";

/***/ }),

/***/ 2658:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop2.jpg";

/***/ }),

/***/ 2823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop20.jpg";

/***/ }),

/***/ 9280:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop21.jpg";

/***/ }),

/***/ 4942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop22.jpg";

/***/ }),

/***/ 4753:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop23.jpg";

/***/ }),

/***/ 6292:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop24.jpg";

/***/ }),

/***/ 1867:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop25.jpg";

/***/ }),

/***/ 4860:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop26.jpg";

/***/ }),

/***/ 1579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop29.jpg";

/***/ }),

/***/ 1300:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop3.jpg";

/***/ }),

/***/ 5425:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop30.jpg";

/***/ }),

/***/ 7222:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop31.jpg";

/***/ }),

/***/ 6875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop32.jpg";

/***/ }),

/***/ 4928:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop33.jpg";

/***/ }),

/***/ 4201:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop34.jpg";

/***/ }),

/***/ 6006:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop35.jpg";

/***/ }),

/***/ 6399:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop37.jpg";

/***/ }),

/***/ 4089:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop4.jpg";

/***/ }),

/***/ 8511:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop5.jpg";

/***/ }),

/***/ 5383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop6.jpg";

/***/ }),

/***/ 795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop7.jpg";

/***/ }),

/***/ 7790:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop8.jpg";

/***/ }),

/***/ 6555:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/middle/Workshop9.jpg";

/***/ }),

/***/ 477:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop1.jpg";

/***/ }),

/***/ 1390:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop10.jpg";

/***/ }),

/***/ 1200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop11.jpg";

/***/ }),

/***/ 6667:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop12.jpg";

/***/ }),

/***/ 1729:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop13.jpg";

/***/ }),

/***/ 7589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop14.jpg";

/***/ }),

/***/ 3486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop16.jpg";

/***/ }),

/***/ 2103:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop17.jpg";

/***/ }),

/***/ 712:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop18.jpg";

/***/ }),

/***/ 8909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop19.jpg";

/***/ }),

/***/ 7582:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop2.jpg";

/***/ }),

/***/ 7848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop20.jpg";

/***/ }),

/***/ 2257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop21.jpg";

/***/ }),

/***/ 1252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop22.jpg";

/***/ }),

/***/ 619:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop23.jpg";

/***/ }),

/***/ 8217:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop24.jpg";

/***/ }),

/***/ 6119:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop25.jpg";

/***/ }),

/***/ 7070:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop26.jpg";

/***/ }),

/***/ 3607:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop29.jpg";

/***/ }),

/***/ 3907:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop3.jpg";

/***/ }),

/***/ 1043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop30.jpg";

/***/ }),

/***/ 7422:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop31.jpg";

/***/ }),

/***/ 9865:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop32.jpg";

/***/ }),

/***/ 7262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop33.jpg";

/***/ }),

/***/ 1506:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop34.jpg";

/***/ }),

/***/ 6372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop35.jpg";

/***/ }),

/***/ 5469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop37.jpg";

/***/ }),

/***/ 3574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop4.jpg";

/***/ }),

/***/ 3862:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop5.jpg";

/***/ }),

/***/ 1794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop6.jpg";

/***/ }),

/***/ 7819:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop7.jpg";

/***/ }),

/***/ 6577:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop8.jpg";

/***/ }),

/***/ 125:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/galeria/thumbnails/Workshop9.jpg";

/***/ }),

/***/ 5034:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/logoarmasantiguasosvaldogatto.jpg";

/***/ }),

/***/ 3909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/logoarmasantiguasosvaldogatto.svg";

/***/ }),

/***/ 3489:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/matchlock.svg";

/***/ }),

/***/ 9041:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/mortar.svg";

/***/ }),

/***/ 5314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/mstile-150x150.png";

/***/ }),

/***/ 1505:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/navycannon.svg";

/***/ }),

/***/ 6539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/openingblockquote.svg";

/***/ }),

/***/ 3107:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/percussion.svg";

/***/ }),

/***/ 5594:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/perfilosvaldo.jpg";

/***/ }),

/***/ 3727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/pistoladerueda.jpg";

/***/ }),

/***/ 1339:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/ac001_imagen.jpg";

/***/ }),

/***/ 4590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/ac001_imagen001.jpg";

/***/ }),

/***/ 2196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/ac001_imagen002.jpg";

/***/ }),

/***/ 8332:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/dosificador1-removebg.png";

/***/ }),

/***/ 3691:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/dosificador1.jpg";

/***/ }),

/***/ 4820:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/dosificador2-removebg-preview.png";

/***/ }),

/***/ 5266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/dosificador2.jpg";

/***/ }),

/***/ 1157:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/dosificador3-removebg-preview.png";

/***/ }),

/***/ 3712:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/dosificador3.jpg";

/***/ }),

/***/ 4270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/martillo.jpg";

/***/ }),

/***/ 1498:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/martillo1.jpg";

/***/ }),

/***/ 1972:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/martillo2.jpg";

/***/ }),

/***/ 4172:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/molde-removebg.png";

/***/ }),

/***/ 7545:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/molde.jpg";

/***/ }),

/***/ 9659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/molde2-removebg-preview.png";

/***/ }),

/***/ 7402:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/molde2.jpg";

/***/ }),

/***/ 6533:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/molde3.jpg";

/***/ }),

/***/ 3959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/molde4.jpg";

/***/ }),

/***/ 893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/opticareticula.jpg";

/***/ }),

/***/ 5973:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/opticareticula2.jpg";

/***/ }),

/***/ 8940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/opticareticula3.jpg";

/***/ }),

/***/ 229:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/opticareticula4.jpg";

/***/ }),

/***/ 9391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/opticareticula5.jpg";

/***/ }),

/***/ 4855:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/opticareticula6.jpg";

/***/ }),

/***/ 9361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/polvorera.jpg";

/***/ }),

/***/ 7765:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/polvorera1.jpg";

/***/ }),

/***/ 9278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/accesorios/polvorera2.jpg";

/***/ }),

/***/ 2762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canon63/cn008_imagen.jpg";

/***/ }),

/***/ 746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canon63/cn008_imagen001.jpg";

/***/ }),

/***/ 9743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canon63/cn008_imagen002.jpg";

/***/ }),

/***/ 8679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canon63/cn008_imagen003.jpg";

/***/ }),

/***/ 8835:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canon63/cn008_imagen004.jpg";

/***/ }),

/***/ 2300:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canon63/cn008_imagen005.jpg";

/***/ }),

/***/ 9376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canones.jpg";

/***/ }),

/***/ 8779:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen.jpg";

/***/ }),

/***/ 3479:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg";

/***/ }),

/***/ 2531:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg";

/***/ }),

/***/ 6037:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn0900.jpg";

/***/ }),

/***/ 8882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn091.jpg";

/***/ }),

/***/ 9455:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn0910.jpg";

/***/ }),

/***/ 1412:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn0911.jpg";

/***/ }),

/***/ 8339:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn093.jpg";

/***/ }),

/***/ 5831:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn095.jpg";

/***/ }),

/***/ 883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn096.jpg";

/***/ }),

/***/ 6838:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn097.jpg";

/***/ }),

/***/ 4290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn098.jpg";

/***/ }),

/***/ 9231:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnapoleonico/cn099.jpg";

/***/ }),

/***/ 7447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_540.jpg";

/***/ }),

/***/ 3202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_541.jpg";

/***/ }),

/***/ 5586:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_542.jpg";

/***/ }),

/***/ 4767:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_543.jpg";

/***/ }),

/***/ 1987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_544.jpg";

/***/ }),

/***/ 9585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_545.jpg";

/***/ }),

/***/ 9291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_546.jpg";

/***/ }),

/***/ 8065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_547.jpg";

/***/ }),

/***/ 7179:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalcal54/car_548.jpg";

/***/ }),

/***/ 7283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg";

/***/ }),

/***/ 5202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg";

/***/ }),

/***/ 9326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg";

/***/ }),

/***/ 3050:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg";

/***/ }),

/***/ 3290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg";

/***/ }),

/***/ 2462:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg";

/***/ }),

/***/ 8782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg";

/***/ }),

/***/ 5977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavaldeavisovictory/victory esc.jpg";

/***/ }),

/***/ 5951:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen.jpg";

/***/ }),

/***/ 3235:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen001.jpg";

/***/ }),

/***/ 6406:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen002.jpg";

/***/ }),

/***/ 5095:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonvictoryacero/cn006_imagen007.jpg";

/***/ }),

/***/ 6936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonvictoryacero/cn006_imagen008.jpg";

/***/ }),

/***/ 4668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/canonvictoryacero/steel1.jpg";

/***/ }),

/***/ 4686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/culebrina/cu001_imagen.jpg";

/***/ }),

/***/ 6096:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/culebrina/cu001_imagen001.jpg";

/***/ }),

/***/ 1348:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/mo002_imagen002.jpg";

/***/ }),

/***/ 932:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morterodecampana/mo001_imagen.jpg";

/***/ }),

/***/ 7979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morterodecampana/mo001_imagen001.jpg";

/***/ }),

/***/ 7757:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morteroingleslondon/mo002_imagen.jpg";

/***/ }),

/***/ 1288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morteroingleslondon/mo002_imagen001.jpg";

/***/ }),

/***/ 8282:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morteroingleslondon/mo002_imagen002.jpg";

/***/ }),

/***/ 9552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morteroingleslondon/mo002_imagen003.jpg";

/***/ }),

/***/ 9995:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen.jpg";

/***/ }),

/***/ 4670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen001.jpg";

/***/ }),

/***/ 749:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen002.jpg";

/***/ }),

/***/ 6067:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen003.jpg";

/***/ }),

/***/ 2441:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/militaria/V_lf2_01.jpg";

/***/ }),

/***/ 3928:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/Bbess1.jpg";

/***/ }),

/***/ 9652:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg";

/***/ }),

/***/ 3660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg";

/***/ }),

/***/ 4847:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg";

/***/ }),

/***/ 8337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg";

/***/ }),

/***/ 3575:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg";

/***/ }),

/***/ 728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg";

/***/ }),

/***/ 32:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg";

/***/ }),

/***/ 8935:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg";

/***/ }),

/***/ 430:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg";

/***/ }),

/***/ 7165:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville00.jpg";

/***/ }),

/***/ 9888:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville1.jpg";

/***/ }),

/***/ 271:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville2.jpg";

/***/ }),

/***/ 6942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville3.jpg";

/***/ }),

/***/ 6870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville4.jpg";

/***/ }),

/***/ 2349:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville5.jpg";

/***/ }),

/***/ 700:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville6.jpg";

/***/ }),

/***/ 2750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg";

/***/ }),

/***/ 3517:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg";

/***/ }),

/***/ 3228:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg";

/***/ }),

/***/ 1931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg";

/***/ }),

/***/ 5805:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg";

/***/ }),

/***/ 7177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg";

/***/ }),

/***/ 3548:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaaston/aston1.jpg";

/***/ }),

/***/ 304:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaaston/aston2.jpg";

/***/ }),

/***/ 6238:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaaston/aston3.jpg";

/***/ }),

/***/ 3155:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaaston/aston4.jpg";

/***/ }),

/***/ 1510:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaaston/aston5.jpg";

/***/ }),

/***/ 5774:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaaston/aston6.jpg";

/***/ }),

/***/ 4751:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg";

/***/ }),

/***/ 469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg";

/***/ }),

/***/ 1036:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg";

/***/ }),

/***/ 7153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg";

/***/ }),

/***/ 4326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg";

/***/ }),

/***/ 9410:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg";

/***/ }),

/***/ 5043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett00.jpg";

/***/ }),

/***/ 5758:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett01.jpg";

/***/ }),

/***/ 7472:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett02.jpg";

/***/ }),

/***/ 2280:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett03.jpg";

/***/ }),

/***/ 3310:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett04.jpg";

/***/ }),

/***/ 6854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett05.jpg";

/***/ }),

/***/ 8344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett06.jpg";

/***/ }),

/***/ 8703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg";

/***/ }),

/***/ 8747:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolabelgrano.jpg";

/***/ }),

/***/ 159:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg";

/***/ }),

/***/ 6279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg";

/***/ }),

/***/ 781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg";

/***/ }),

/***/ 3181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg";

/***/ }),

/***/ 9198:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg";

/***/ }),

/***/ 2549:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg";

/***/ }),

/***/ 4084:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg";

/***/ }),

/***/ 9287:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg";

/***/ }),

/***/ 7260:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg";

/***/ }),

/***/ 4283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg";

/***/ }),

/***/ 9655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg";

/***/ }),

/***/ 5567:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg";

/***/ }),

/***/ 1999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg";

/***/ }),

/***/ 1376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg";

/***/ }),

/***/ 9748:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg";

/***/ }),

/***/ 6145:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg";

/***/ }),

/***/ 2391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg";

/***/ }),

/***/ 5470:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg";

/***/ }),

/***/ 5455:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg";

/***/ }),

/***/ 3680:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg";

/***/ }),

/***/ 5421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg";

/***/ }),

/***/ 486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg";

/***/ }),

/***/ 6822:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg";

/***/ }),

/***/ 6280:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg";

/***/ }),

/***/ 5290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg";

/***/ }),

/***/ 8719:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg";

/***/ }),

/***/ 2398:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg";

/***/ }),

/***/ 6099:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg";

/***/ }),

/***/ 475:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg";

/***/ }),

/***/ 7188:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg";

/***/ }),

/***/ 8990:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg";

/***/ }),

/***/ 4612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg";

/***/ }),

/***/ 853:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg";

/***/ }),

/***/ 8646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg";

/***/ }),

/***/ 5777:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg";

/***/ }),

/***/ 7182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg";

/***/ }),

/***/ 4825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg";

/***/ }),

/***/ 6186:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg";

/***/ }),

/***/ 6783:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg";

/***/ }),

/***/ 1993:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg";

/***/ }),

/***/ 9969:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg";

/***/ }),

/***/ 61:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg";

/***/ }),

/***/ 3596:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg";

/***/ }),

/***/ 7739:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg";

/***/ }),

/***/ 3106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg";

/***/ }),

/***/ 9721:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg";

/***/ }),

/***/ 5677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg";

/***/ }),

/***/ 350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg";

/***/ }),

/***/ 2629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg";

/***/ }),

/***/ 8470:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg";

/***/ }),

/***/ 4937:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg";

/***/ }),

/***/ 2925:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg";

/***/ }),

/***/ 2634:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg";

/***/ }),

/***/ 8041:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg";

/***/ }),

/***/ 8963:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg";

/***/ }),

/***/ 7799:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg";

/***/ }),

/***/ 1908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg";

/***/ }),

/***/ 2585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg";

/***/ }),

/***/ 1019:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg";

/***/ }),

/***/ 9712:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg";

/***/ }),

/***/ 8492:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg";

/***/ }),

/***/ 4019:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg";

/***/ }),

/***/ 9681:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg";

/***/ }),

/***/ 9915:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016.jpg";

/***/ }),

/***/ 1900:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg";

/***/ }),

/***/ 516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg";

/***/ }),

/***/ 9002:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg";

/***/ }),

/***/ 3725:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins011.jpg";

/***/ }),

/***/ 6383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins03.jpg";

/***/ }),

/***/ 6058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins06.jpg";

/***/ }),

/***/ 6061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins11.jpg";

/***/ }),

/***/ 5642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg";

/***/ }),

/***/ 1907:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg";

/***/ }),

/***/ 8313:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg";

/***/ }),

/***/ 4971:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg";

/***/ }),

/***/ 9918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg";

/***/ }),

/***/ 7291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg";

/***/ }),

/***/ 6078:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg";

/***/ }),

/***/ 8267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg";

/***/ }),

/***/ 5781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg";

/***/ }),

/***/ 63:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20141.jpg";

/***/ }),

/***/ 6040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20142.jpg";

/***/ }),

/***/ 1153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20143.jpg";

/***/ }),

/***/ 463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20147.jpg";

/***/ }),

/***/ 140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20181.jpg";

/***/ }),

/***/ 9534:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20182.jpg";

/***/ }),

/***/ 9948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20183.jpg";

/***/ }),

/***/ 7802:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20185.jpg";

/***/ }),

/***/ 8197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20186.jpg";

/***/ }),

/***/ 7812:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg";

/***/ }),

/***/ 9626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg";

/***/ }),

/***/ 1982:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg";

/***/ }),

/***/ 5784:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg";

/***/ }),

/***/ 7387:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg";

/***/ }),

/***/ 2555:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg";

/***/ }),

/***/ 7707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg";

/***/ }),

/***/ 1839:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg";

/***/ }),

/***/ 4998:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg";

/***/ }),

/***/ 9196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg";

/***/ }),

/***/ 4310:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg";

/***/ }),

/***/ 5135:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg";

/***/ }),

/***/ 9353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg";

/***/ }),

/***/ 8196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg";

/***/ }),

/***/ 2334:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg";

/***/ }),

/***/ 3650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg";

/***/ }),

/***/ 244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg";

/***/ }),

/***/ 6298:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg";

/***/ }),

/***/ 1044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg";

/***/ }),

/***/ 8073:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg";

/***/ }),

/***/ 6028:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg";

/***/ }),

/***/ 9436:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg";

/***/ }),

/***/ 8187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg";

/***/ }),

/***/ 558:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg";

/***/ }),

/***/ 9328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg";

/***/ }),

/***/ 8182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg";

/***/ }),

/***/ 1625:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg";

/***/ }),

/***/ 1387:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg";

/***/ }),

/***/ 4011:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/bbess1.jpg";

/***/ }),

/***/ 7011:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess01.jpg";

/***/ }),

/***/ 8805:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess02.jpg";

/***/ }),

/***/ 3899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess03.jpg";

/***/ }),

/***/ 4916:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess04.jpg";

/***/ }),

/***/ 44:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess06.jpg";

/***/ }),

/***/ 7842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess07.jpg";

/***/ }),

/***/ 6272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess08.jpg";

/***/ }),

/***/ 1333:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess09.jpg";

/***/ }),

/***/ 9383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess10.jpg";

/***/ }),

/***/ 4426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg";

/***/ }),

/***/ 552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg";

/***/ }),

/***/ 951:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg";

/***/ }),

/***/ 9859:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg";

/***/ }),

/***/ 6729:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg";

/***/ }),

/***/ 9331:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg";

/***/ }),

/***/ 6338:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg";

/***/ }),

/***/ 8708:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg";

/***/ }),

/***/ 9225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg";

/***/ }),

/***/ 4988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflekentucky/frontier1.jpg";

/***/ }),

/***/ 5894:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR1.jpg";

/***/ }),

/***/ 9631:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR2.jpg";

/***/ }),

/***/ 5712:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR3.jpg";

/***/ }),

/***/ 5879:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR4.jpg";

/***/ }),

/***/ 6479:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR5.jpg";

/***/ }),

/***/ 3301:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg";

/***/ }),

/***/ 714:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg";

/***/ }),

/***/ 5546:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg";

/***/ }),

/***/ 5116:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg";

/***/ }),

/***/ 8123:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg";

/***/ }),

/***/ 6258:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg";

/***/ }),

/***/ 3253:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg";

/***/ }),

/***/ 7272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg";

/***/ }),

/***/ 3271:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg";

/***/ }),

/***/ 5913:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg";

/***/ }),

/***/ 1980:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg";

/***/ }),

/***/ 5899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg";

/***/ }),

/***/ 7409:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg";

/***/ }),

/***/ 3054:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg";

/***/ }),

/***/ 411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/received.jpg";

/***/ }),

/***/ 1069:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/recibido.jpg";

/***/ }),

/***/ 4893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/restauraciones02.jpg";

/***/ }),

/***/ 8789:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/restauraciones03.jpg";

/***/ }),

/***/ 4284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/restauraciones04.jpg";

/***/ }),

/***/ 5434:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/restauraciones05.jpg";

/***/ }),

/***/ 610:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/restauraciones06.jpg";

/***/ }),

/***/ 522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/thumbnails/restauraciones02.png";

/***/ }),

/***/ 7444:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/thumbnails/restauraciones03.png";

/***/ }),

/***/ 8177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/thumbnails/restauraciones04.png";

/***/ }),

/***/ 9952:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/thumbnails/restauraciones05.png";

/***/ }),

/***/ 8381:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/restauraciones/thumbnails/restauraciones06.png";

/***/ }),

/***/ 1284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/riflesypistolas.jpg";

/***/ }),

/***/ 7769:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/safari-pinned-tab.svg";

/***/ }),

/***/ 8705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/us.svg";

/***/ }),

/***/ 8004:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/wallpaperflare.com_wallpaper.jpg";

/***/ }),

/***/ 2326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "src/imagenes/wheellock.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + "1b96c00b0fde3b15c03c" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "AAOG:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			18: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkAAOG"] = self["webpackChunkAAOG"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/photoswipe/dist/photoswipe-lightbox.esm.js
/*!
  * PhotoSwipe Lightbox 5.3.4 - https://photoswipe.com
  * (c) 2022 Dmytro Semenov
  */
/** @typedef {import('../photoswipe.js').Point} Point */

/** @typedef {undefined | null | false | '' | 0} Falsy */
/** @typedef {keyof HTMLElementTagNameMap} HTMLElementTagName */

/**
 * @template {HTMLElementTagName | Falsy} [T="div"]
 * @template {Node | undefined} [NodeToAppendElementTo=undefined]
 * @param {string=} className
 * @param {T=} [tagName]
 * @param {NodeToAppendElementTo=} appendToEl
 * @returns {T extends HTMLElementTagName ? HTMLElementTagNameMap[T] : HTMLElementTagNameMap['div']}
 */
function createElement(className, tagName, appendToEl) {
  const el = document.createElement(tagName || 'div');
  if (className) {
    el.className = className;
  }
  if (appendToEl) {
    appendToEl.appendChild(el);
  }
  // @ts-expect-error
  return el;
}

/**
 * Get transform string
 *
 * @param {number} x
 * @param {number=} y
 * @param {number=} scale
 */
function toTransformString(x, y, scale) {
  let propValue = 'translate3d(' + x + 'px,' + (y || 0) + 'px' + ',0)';
  if (scale !== undefined) {
    propValue += ' scale3d(' + scale + ',' + scale + ',1)';
  }
  return propValue;
}

/**
 * Apply width and height CSS properties to element
 *
 * @param {HTMLElement} el
 * @param {string | number} w
 * @param {string | number} h
 */
function setWidthHeight(el, w, h) {
  el.style.width = typeof w === 'number' ? w + 'px' : w;
  el.style.height = typeof h === 'number' ? h + 'px' : h;
}

/** @typedef {LOAD_STATE[keyof LOAD_STATE]} LoadState */
/** @type {{ IDLE: 'idle'; LOADING: 'loading'; LOADED: 'loaded'; ERROR: 'error' }} */
const LOAD_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
};

/**
 * Check if click or keydown event was dispatched
 * with a special key or via mouse wheel.
 *
 * @param {MouseEvent | KeyboardEvent} e
 */
function specialKeyUsed(e) {
  if (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
    return true;
  }
}

/**
 * Parse `gallery` or `children` options.
 *
 * @param {import('../photoswipe.js').ElementProvider} option
 * @param {string=} legacySelector
 * @param {HTMLElement | Document} [parent]
 * @returns HTMLElement[]
 */
function getElementsFromOption(option, legacySelector, parent = document) {
  /** @type {HTMLElement[]} */
  let elements = [];
  if (option instanceof Element) {
    elements = [option];
  } else if (option instanceof NodeList || Array.isArray(option)) {
    elements = Array.from(option);
  } else {
    const selector = typeof option === 'string' ? option : legacySelector;
    if (selector) {
      elements = Array.from(parent.querySelectorAll(selector));
    }
  }
  return elements;
}

/**
 * Check if variable is PhotoSwipe class
 *
 * @param {any} fn
 */
function isPswpClass(fn) {
  return typeof fn === 'function' && fn.prototype && fn.prototype.goTo;
}

/**
 * Check if browser is Safari
 *
 * @returns {boolean}
 */
function isSafari() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}

/** @typedef {import('../lightbox/lightbox.js').default} PhotoSwipeLightbox */
/** @typedef {import('../photoswipe.js').default} PhotoSwipe */
/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */
/** @typedef {import('../photoswipe.js').DataSource} DataSource */
/** @typedef {import('../ui/ui-element.js').UIElementData} UIElementData */
/** @typedef {import('../slide/content.js').default} ContentDefault */
/** @typedef {import('../slide/slide.js').default} Slide */
/** @typedef {import('../slide/slide.js').SlideData} SlideData */
/** @typedef {import('../slide/zoom-level.js').default} ZoomLevel */
/** @typedef {import('../slide/get-thumb-bounds.js').Bounds} Bounds */

/**
 * Allow adding an arbitrary props to the Content
 * https://photoswipe.com/custom-content/#using-webp-image-format
 * @typedef {ContentDefault & Record<string, any>} Content
 */
/** @typedef {{ x?: number; y?: number }} Point */

/**
 * @typedef {Object} PhotoSwipeEventsMap https://photoswipe.com/events/
 *
 *
 * https://photoswipe.com/adding-ui-elements/
 *
 * @prop {undefined} uiRegister
 * @prop {{ data: UIElementData }} uiElementCreate
 *
 *
 * https://photoswipe.com/events/#initialization-events
 *
 * @prop {undefined} beforeOpen
 * @prop {undefined} firstUpdate
 * @prop {undefined} initialLayout
 * @prop {undefined} change
 * @prop {undefined} afterInit
 * @prop {undefined} bindEvents
 *
 *
 * https://photoswipe.com/events/#opening-or-closing-transition-events
 *
 * @prop {undefined} openingAnimationStart
 * @prop {undefined} openingAnimationEnd
 * @prop {undefined} closingAnimationStart
 * @prop {undefined} closingAnimationEnd
 *
 *
 * https://photoswipe.com/events/#closing-events
 *
 * @prop {undefined} close
 * @prop {undefined} destroy
 *
 *
 * https://photoswipe.com/events/#pointer-and-gesture-events
 *
 * @prop {{ originalEvent: PointerEvent }} pointerDown
 * @prop {{ originalEvent: PointerEvent }} pointerMove
 * @prop {{ originalEvent: PointerEvent }} pointerUp
 * @prop {{ bgOpacity: number }} pinchClose can be default prevented
 * @prop {{ panY: number }} verticalDrag can be default prevented
 *
 *
 * https://photoswipe.com/events/#slide-content-events
 *
 * @prop {{ content: Content }} contentInit
 * @prop {{ content: Content; isLazy: boolean }} contentLoad can be default prevented
 * @prop {{ content: Content; isLazy: boolean }} contentLoadImage can be default prevented
 * @prop {{ content: Content; slide: Slide; isError?: boolean }} loadComplete
 * @prop {{ content: Content; slide: Slide }} loadError
 * @prop {{ content: Content; width: number; height: number }} contentResize can be default prevented
 * @prop {{ content: Content; width: number; height: number; slide: Slide }} imageSizeChange
 * @prop {{ content: Content }} contentLazyLoad can be default prevented
 * @prop {{ content: Content }} contentAppend can be default prevented
 * @prop {{ content: Content }} contentActivate can be default prevented
 * @prop {{ content: Content }} contentDeactivate can be default prevented
 * @prop {{ content: Content }} contentRemove can be default prevented
 * @prop {{ content: Content }} contentDestroy can be default prevented
 *
 *
 * undocumented
 *
 * @prop {{ point: Point; originalEvent: PointerEvent }} imageClickAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} bgClickAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} tapAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} doubleTapAction can be default prevented
 *
 * @prop {{ originalEvent: KeyboardEvent }} keydown can be default prevented
 * @prop {{ x: number; dragging: boolean }} moveMainScroll
 * @prop {{ slide: Slide }} firstZoomPan
 * @prop {{ slide: Slide, data: SlideData, index: number }} gettingData
 * @prop {undefined} beforeResize
 * @prop {undefined} resize
 * @prop {undefined} viewportSize
 * @prop {undefined} updateScrollOffset
 * @prop {{ slide: Slide }} slideInit
 * @prop {{ slide: Slide }} afterSetContent
 * @prop {{ slide: Slide }} slideLoad
 * @prop {{ slide: Slide }} appendHeavy can be default prevented
 * @prop {{ slide: Slide }} appendHeavyContent
 * @prop {{ slide: Slide }} slideActivate
 * @prop {{ slide: Slide }} slideDeactivate
 * @prop {{ slide: Slide }} slideDestroy
 * @prop {{ destZoomLevel: number, centerPoint: Point, transitionDuration: number | false }} beforeZoomTo
 * @prop {{ slide: Slide }} zoomPanUpdate
 * @prop {{ slide: Slide }} initialZoomPan
 * @prop {{ slide: Slide }} calcSlideSize
 * @prop {undefined} resolutionChanged
 * @prop {{ originalEvent: WheelEvent }} wheel can be default prevented
 * @prop {{ content: Content }} contentAppendImage can be default prevented
 * @prop {{ index: number; itemData: SlideData }} lazyLoadSlide can be default prevented
 * @prop {undefined} lazyLoad
 * @prop {{ slide: Slide }} calcBounds
 * @prop {{ zoomLevels: ZoomLevel, slideData: SlideData }} zoomLevelsUpdate
 *
 *
 * legacy
 *
 * @prop {undefined} init
 * @prop {undefined} initialZoomIn
 * @prop {undefined} initialZoomOut
 * @prop {undefined} initialZoomInEnd
 * @prop {undefined} initialZoomOutEnd
 * @prop {{ dataSource: DataSource, numItems: number }} numItems
 * @prop {{ itemData: SlideData; index: number }} itemData
 * @prop {{ index: number, itemData: SlideData, instance: PhotoSwipe }} thumbBounds
 */

/**
 * @typedef {Object} PhotoSwipeFiltersMap https://photoswipe.com/filters/
 *
 * @prop {(numItems: number, dataSource: DataSource) => number} numItems
 * Modify the total amount of slides. Example on Data sources page.
 * https://photoswipe.com/filters/#numitems
 *
 * @prop {(itemData: SlideData, index: number) => SlideData} itemData
 * Modify slide item data. Example on Data sources page.
 * https://photoswipe.com/filters/#itemdata
 *
 * @prop {(itemData: SlideData, element: HTMLElement, linkEl: HTMLAnchorElement) => SlideData} domItemData
 * Modify item data when it's parsed from DOM element. Example on Data sources page.
 * https://photoswipe.com/filters/#domitemdata
 *
 * @prop {(clickedIndex: number, e: MouseEvent, instance: PhotoSwipeLightbox) => number} clickedIndex
 * Modify clicked gallery item index.
 * https://photoswipe.com/filters/#clickedindex
 *
 * @prop {(placeholderSrc: string | false, content: Content) => string | false} placeholderSrc
 * Modify placeholder image source.
 * https://photoswipe.com/filters/#placeholdersrc
 *
 * @prop {(isContentLoading: boolean, content: Content) => boolean} isContentLoading
 * Modify if the content is currently loading.
 * https://photoswipe.com/filters/#iscontentloading
 *
 * @prop {(isContentZoomable: boolean, content: Content) => boolean} isContentZoomable
 * Modify if the content can be zoomed.
 * https://photoswipe.com/filters/#iscontentzoomable
 *
 * @prop {(useContentPlaceholder: boolean, content: Content) => boolean} useContentPlaceholder
 * Modify if the placeholder should be used for the content.
 * https://photoswipe.com/filters/#usecontentplaceholder
 *
 * @prop {(isKeepingPlaceholder: boolean, content: Content) => boolean} isKeepingPlaceholder
 * Modify if the placeholder should be kept after the content is loaded.
 * https://photoswipe.com/filters/#iskeepingplaceholder
 *
 *
 * @prop {(contentErrorElement: HTMLElement, content: Content) => HTMLElement} contentErrorElement
 * Modify an element when the content has error state (for example, if image cannot be loaded).
 * https://photoswipe.com/filters/#contenterrorelement
 *
 * @prop {(element: HTMLElement, data: UIElementData) => HTMLElement} uiElement
 * Modify a UI element that's being created.
 * https://photoswipe.com/filters/#uielement
 *
 * @prop {(thumbnail: HTMLElement, itemData: SlideData, index: number) => HTMLElement} thumbEl
 * Modify the thubmnail element from which opening zoom animation starts or ends.
 * https://photoswipe.com/filters/#thumbel
 *
 * @prop {(thumbBounds: Bounds, itemData: SlideData, index: number) => Bounds} thumbBounds
 * Modify the thubmnail bounds from which opening zoom animation starts or ends.
 * https://photoswipe.com/filters/#thumbbounds
 *
 * @prop {(srcsetSizesWidth: number, content: Content) => number} srcsetSizesWidth
 *
 */

/**
 * @template {keyof PhotoSwipeFiltersMap} T
 * @typedef {{ fn: PhotoSwipeFiltersMap[T], priority: number }} Filter<T>
 */

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {PhotoSwipeEventsMap[T] extends undefined ? PhotoSwipeEvent<T> : PhotoSwipeEvent<T> & PhotoSwipeEventsMap[T]} AugmentedEvent
 */

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {(event: AugmentedEvent<T>) => void} EventCallback<T>
 */

/**
 * Base PhotoSwipe event object
 *
 * @template {keyof PhotoSwipeEventsMap} T
 */
class PhotoSwipeEvent {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(type, details) {
    this.type = type;
    if (details) {
      Object.assign(this, details);
    }
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
}

/**
 * PhotoSwipe base class that can listen and dispatch for events.
 * Shared by PhotoSwipe Core and PhotoSwipe Lightbox, extended by base.js
 */
class Eventable {
  constructor() {
    /**
     * @type {{ [T in keyof PhotoSwipeEventsMap]?: ((event: AugmentedEvent<T>) => void)[] }}
     */
    this._listeners = {};

    /**
     * @type {{ [T in keyof PhotoSwipeFiltersMap]?: Filter<T>[] }}
     */
    this._filters = {};

    /** @type {PhotoSwipe=} */
    this.pswp = undefined;

    /** @type {PhotoSwipeOptions} */
    this.options = undefined;
  }

  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(name, fn, priority = 100) {
    if (!this._filters[name]) {
      this._filters[name] = [];
    }
    this._filters[name].push({
      fn,
      priority
    });
    this._filters[name].sort((f1, f2) => f1.priority - f2.priority);
    if (this.pswp) {
      this.pswp.addFilter(name, fn, priority);
    }
  }

  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(name, fn) {
    if (this._filters[name]) {
      // @ts-expect-error
      this._filters[name] = this._filters[name].filter(filter => filter.fn !== fn);
    }
    if (this.pswp) {
      this.pswp.removeFilter(name, fn);
    }
  }

  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(name, ...args) {
    if (this._filters[name]) {
      this._filters[name].forEach(filter => {
        // @ts-expect-error
        args[0] = filter.fn.apply(this, args);
      });
    }
    return args[0];
  }

  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(name, fn) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    this._listeners[name].push(fn);

    // When binding events to lightbox,
    // also bind events to PhotoSwipe Core,
    // if it's open.
    if (this.pswp) {
      this.pswp.on(name, fn);
    }
  }

  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(name, fn) {
    if (this._listeners[name]) {
      // @ts-expect-error
      this._listeners[name] = this._listeners[name].filter(listener => fn !== listener);
    }
    if (this.pswp) {
      this.pswp.off(name, fn);
    }
  }

  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(name, details) {
    if (this.pswp) {
      return this.pswp.dispatch(name, details);
    }
    const event = /** @type {AugmentedEvent<T>} */new PhotoSwipeEvent(name, details);
    if (!this._listeners) {
      return event;
    }
    if (this._listeners[name]) {
      this._listeners[name].forEach(listener => {
        listener.call(this, event);
      });
    }
    return event;
  }
}
class Placeholder {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(imageSrc, container) {
    // Create placeholder
    // (stretched thumbnail or simple div behind the main image)
    this.element = createElement('pswp__img pswp__img--placeholder', imageSrc ? 'img' : '', container);
    if (imageSrc) {
      /** @type {HTMLImageElement} */
      this.element.decoding = 'async';
      /** @type {HTMLImageElement} */
      this.element.alt = '';
      /** @type {HTMLImageElement} */
      this.element.src = imageSrc;
      this.element.setAttribute('role', 'presentation');
    }
    this.element.setAttribute('aria-hidden', 'true');
  }

  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.element.tagName === 'IMG') {
      // Use transform scale() to modify img placeholder size
      // (instead of changing width/height directly).
      // This helps with performance, specifically in iOS15 Safari.
      setWidthHeight(this.element, 250, 'auto');
      this.element.style.transformOrigin = '0 0';
      this.element.style.transform = toTransformString(0, 0, width / 250);
    } else {
      setWidthHeight(this.element, width, height);
    }
  }
  destroy() {
    if (this.element.parentNode) {
      this.element.remove();
    }
    this.element = null;
  }
}

/** @typedef {import('./slide.js').default} Slide */
/** @typedef {import('./slide.js').SlideData} SlideData */
/** @typedef {import('../photoswipe.js').default} PhotoSwipe */
/** @typedef {import('../util/util.js').LoadState} LoadState */

class Content {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipe} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(itemData, instance, index) {
    this.instance = instance;
    this.data = itemData;
    this.index = index;

    /** @type {HTMLImageElement | HTMLDivElement} */
    this.element = undefined;
    this.displayedImageWidth = 0;
    this.displayedImageHeight = 0;
    this.width = Number(this.data.w) || Number(this.data.width) || 0;
    this.height = Number(this.data.h) || Number(this.data.height) || 0;
    this.isAttached = false;
    this.hasSlide = false;
    /** @type {LoadState} */
    this.state = LOAD_STATE.IDLE;
    if (this.data.type) {
      this.type = this.data.type;
    } else if (this.data.src) {
      this.type = 'image';
    } else {
      this.type = 'html';
    }
    this.instance.dispatch('contentInit', {
      content: this
    });
  }
  removePlaceholder() {
    if (this.placeholder && !this.keepPlaceholder()) {
      // With delay, as image might be loaded, but not rendered
      setTimeout(() => {
        if (this.placeholder) {
          this.placeholder.destroy();
          this.placeholder = null;
        }
      }, 1000);
    }
  }

  /**
   * Preload content
   *
   * @param {boolean=} isLazy
   * @param {boolean=} reload
   */
  load(isLazy, reload) {
    if (this.slide && this.usePlaceholder()) {
      if (!this.placeholder) {
        const placeholderSrc = this.instance.applyFilters('placeholderSrc',
        // use  image-based placeholder only for the first slide,
        // as rendering (even small stretched thumbnail) is an expensive operation
        this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false, this);
        this.placeholder = new Placeholder(placeholderSrc, this.slide.container);
      } else {
        const placeholderEl = this.placeholder.element;
        // Add placeholder to DOM if it was already created
        if (placeholderEl && !placeholderEl.parentElement) {
          this.slide.container.prepend(placeholderEl);
        }
      }
    }
    if (this.element && !reload) {
      return;
    }
    if (this.instance.dispatch('contentLoad', {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }
    if (this.isImageContent()) {
      this.element = createElement('pswp__img', 'img');
      // Start loading only after width is defined, as sizes might depend on it.
      // Due to Safari feature, we must define sizes before srcset.
      if (this.displayedImageWidth) {
        this.loadImage(isLazy);
      }
    } else {
      this.element = createElement('pswp__content');
      this.element.innerHTML = this.data.html || '';
    }
    if (reload && this.slide) {
      this.slide.updateContentSize(true);
    }
  }

  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(isLazy) {
    const imageElement = /** @type HTMLImageElement */this.element;
    if (this.instance.dispatch('contentLoadImage', {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }
    this.updateSrcsetSizes();
    if (this.data.srcset) {
      imageElement.srcset = this.data.srcset;
    }
    imageElement.src = this.data.src;
    imageElement.alt = this.data.alt || '';
    this.state = LOAD_STATE.LOADING;
    if (imageElement.complete) {
      this.onLoaded();
    } else {
      imageElement.onload = () => {
        this.onLoaded();
      };
      imageElement.onerror = () => {
        this.onError();
      };
    }
  }

  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(slide) {
    this.slide = slide;
    this.hasSlide = true;
    this.instance = slide.pswp;

    // todo: do we need to unset slide?
  }

  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = LOAD_STATE.LOADED;
    if (this.slide) {
      this.instance.dispatch('loadComplete', {
        slide: this.slide,
        content: this
      });

      // if content is reloaded
      if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
        this.append();
        this.slide.updateContentSize(true);
      }
      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
        this.removePlaceholder();
      }
    }
  }

  /**
   * Content load error handler
   */
  onError() {
    this.state = LOAD_STATE.ERROR;
    if (this.slide) {
      this.displayError();
      this.instance.dispatch('loadComplete', {
        slide: this.slide,
        isError: true,
        content: this
      });
      this.instance.dispatch('loadError', {
        slide: this.slide,
        content: this
      });
    }
  }

  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters('isContentLoading', this.state === LOAD_STATE.LOADING, this);
  }
  isError() {
    return this.state === LOAD_STATE.ERROR;
  }

  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === 'image';
  }

  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.placeholder) {
      this.placeholder.setDisplayedSize(width, height);
    }

    // eslint-disable-next-line max-len
    if (this.instance.dispatch('contentResize', {
      content: this,
      width,
      height
    }).defaultPrevented) {
      return;
    }
    setWidthHeight(this.element, width, height);
    if (this.isImageContent() && !this.isError()) {
      const isInitialSizeUpdate = !this.displayedImageWidth && width;
      this.displayedImageWidth = width;
      this.displayedImageHeight = height;
      if (isInitialSizeUpdate) {
        this.loadImage(false);
      } else {
        this.updateSrcsetSizes();
      }
      if (this.slide) {
        // eslint-disable-next-line max-len
        this.instance.dispatch('imageSizeChange', {
          slide: this.slide,
          width,
          height,
          content: this
        });
      }
    }
  }

  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters('isContentZoomable', this.isImageContent() && this.state !== LOAD_STATE.ERROR, this);
  }

  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    // Handle srcset sizes attribute.
    //
    // Never lower quality, if it was increased previously.
    // Chrome does this automatically, Firefox and Safari do not,
    // so we store largest used size in dataset.
    // Handle srcset sizes attribute.
    //
    // Never lower quality, if it was increased previously.
    // Chrome does this automatically, Firefox and Safari do not,
    // so we store largest used size in dataset.
    if (this.data.srcset) {
      const image = /** @type HTMLImageElement */this.element;
      const sizesWidth = this.instance.applyFilters('srcsetSizesWidth', this.displayedImageWidth, this);
      if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
        image.sizes = sizesWidth + 'px';
        image.dataset.largestUsedSize = String(sizesWidth);
      }
    }
  }

  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters('useContentPlaceholder', this.isImageContent(), this);
  }

  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    if (this.instance.dispatch('contentLazyLoad', {
      content: this
    }).defaultPrevented) {
      return;
    }
    this.load(true);
  }

  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters('isKeepingPlaceholder', this.isLoading(), this);
  }

  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = false;
    this.slide = null;
    if (this.instance.dispatch('contentDestroy', {
      content: this
    }).defaultPrevented) {
      return;
    }
    this.remove();
    if (this.placeholder) {
      this.placeholder.destroy();
      this.placeholder = null;
    }
    if (this.isImageContent() && this.element) {
      this.element.onload = null;
      this.element.onerror = null;
      this.element = null;
    }
  }

  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      /** @type {HTMLElement} */
      let errorMsgEl = createElement('pswp__error-msg');
      errorMsgEl.innerText = this.instance.options.errorMsg;
      errorMsgEl = this.instance.applyFilters('contentErrorElement', errorMsgEl, this);
      this.element = createElement('pswp__content pswp__error-msg-container');
      this.element.appendChild(errorMsgEl);
      this.slide.container.innerText = '';
      this.slide.container.appendChild(this.element);
      this.slide.updateContentSize(true);
      this.removePlaceholder();
    }
  }

  /**
   * Append the content
   */
  append() {
    if (this.isAttached) {
      return;
    }
    this.isAttached = true;
    if (this.state === LOAD_STATE.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch('contentAppend', {
      content: this
    }).defaultPrevented) {
      return;
    }
    const supportsDecode = ('decode' in this.element);
    if (this.isImageContent()) {
      // Use decode() on nearby slides
      //
      // Nearby slide images are in DOM and not hidden via display:none.
      // However, they are placed offscreen (to the left and right side).
      //
      // Some browsers do not composite the image until it's actually visible,
      // using decode() helps.
      //
      // You might ask "why dont you just decode() and then append all images",
      // that's because I want to show image before it's fully loaded,
      // as browser can render parts of image while it is loading.
      // We do not do this in Safari due to partial loading bug.
      if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {
        this.isDecoding = true;
        // purposefully using finally instead of then,
        // as if srcset sizes changes dynamically - it may cause decode error
        /** @type {HTMLImageElement} */
        this.element.decode().catch(() => {}).finally(() => {
          this.isDecoding = false;
          this.appendImage();
        });
      } else {
        this.appendImage();
      }
    } else if (this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
  }

  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    if (this.instance.dispatch('contentActivate', {
      content: this
    }).defaultPrevented) {
      return;
    }
    if (this.slide) {
      if (this.isImageContent() && this.isDecoding && !isSafari()) {
        // add image to slide when it becomes active,
        // even if it's not finished decoding
        this.appendImage();
      } else if (this.isError()) {
        this.load(false, true); // try to reload
      }
      if (this.slide.holderElement) {
        this.slide.holderElement.setAttribute('aria-hidden', 'false');
      }
    }
  }

  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch('contentDeactivate', {
      content: this
    });
    if (this.slide && this.slide.holderElement) {
      this.slide.holderElement.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = false;
    if (this.instance.dispatch('contentRemove', {
      content: this
    }).defaultPrevented) {
      return;
    }
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
    if (this.placeholder && this.placeholder.element) {
      this.placeholder.element.remove();
    }
  }

  /**
   * Append the image content to slide container
   */
  appendImage() {
    if (!this.isAttached) {
      return;
    }
    if (this.instance.dispatch('contentAppendImage', {
      content: this
    }).defaultPrevented) {
      return;
    }

    // ensure that element exists and is not already appended
    if (this.slide && this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
    if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
      this.removePlaceholder();
    }
  }
}

/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */
/** @typedef {import('../photoswipe.js').default} PhotoSwipe */
/** @typedef {import('../slide/slide.js').SlideData} SlideData */

/**
 * @param {PhotoSwipeOptions} options
 * @param {PhotoSwipe} pswp
 */
function getViewportSize(options, pswp) {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);
    if (newViewportSize) {
      return newViewportSize;
    }
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}

/**
 * Parses padding option.
 * Supported formats:
 *
 * // Object
 * padding: {
 *  top: 0,
 *  bottom: 0,
 *  left: 0,
 *  right: 0
 * }
 *
 * // A function that returns the object
 * paddingFn: (viewportSize, itemData, index) => {
 *  return {
 *    top: 0,
 *    bottom: 0,
 *    left: 0,
 *    right: 0
 *  };
 * }
 *
 * // Legacy variant
 * paddingLeft: 0,
 * paddingRight: 0,
 * paddingTop: 0,
 * paddingBottom: 0,
 *
 * @param {'left' | 'top' | 'bottom' | 'right'} prop
 * @param {PhotoSwipeOptions} options PhotoSwipe options
 * @param {{ x?: number; y?: number }} viewportSize PhotoSwipe viewport size, for example: { x:800, y:600 }
 * @param {SlideData} itemData Data about the slide
 * @param {number} index Slide index
 * @returns {number}
 */
function parsePaddingOption(prop, options, viewportSize, itemData, index) {
  /** @type {number} */
  let paddingValue;
  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = 'padding' + prop[0].toUpperCase() + prop.slice(1);
    // @ts-expect-error
    if (options[legacyPropName]) {
      // @ts-expect-error
      paddingValue = options[legacyPropName];
    }
  }
  return paddingValue || 0;
}

/**
 * @param {PhotoSwipeOptions} options
 * @param {{ x?: number; y?: number }} viewportSize
 * @param {SlideData} itemData
 * @param {number} index
 */
function getPanAreaSize(options, viewportSize, itemData, index) {
  return {
    x: viewportSize.x - parsePaddingOption('left', options, viewportSize, itemData, index) - parsePaddingOption('right', options, viewportSize, itemData, index),
    y: viewportSize.y - parsePaddingOption('top', options, viewportSize, itemData, index) - parsePaddingOption('bottom', options, viewportSize, itemData, index)
  };
}
const MAX_IMAGE_WIDTH = 4000;

/** @typedef {import('../photoswipe.js').default} PhotoSwipe */
/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */
/** @typedef {import('../slide/slide.js').SlideData} SlideData */

/** @typedef {'fit' | 'fill' | number | ((zoomLevelObject: ZoomLevel) => number)} ZoomLevelOption */

/**
 * Calculates zoom levels for specific slide.
 * Depends on viewport size and image size.
 */
class ZoomLevel {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe=} pswp PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(options, itemData, index, pswp) {
    this.pswp = pswp;
    this.options = options;
    this.itemData = itemData;
    this.index = index;
  }

  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {{ x?: number; y?: number }} panAreaSize
   */
  update(maxWidth, maxHeight, panAreaSize) {
    this.elementSize = {
      x: maxWidth,
      y: maxHeight
    };
    this.panAreaSize = panAreaSize;
    const hRatio = this.panAreaSize.x / this.elementSize.x;
    const vRatio = this.panAreaSize.y / this.elementSize.y;
    this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
    this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);

    // zoom.vFill defines zoom level of the image
    // when it has 100% of viewport vertical space (height)
    this.vFill = Math.min(1, vRatio);
    this.initial = this._getInitial();
    this.secondary = this._getSecondary();
    this.max = Math.max(this.initial, this.secondary, this._getMax());
    this.min = Math.min(this.fit, this.initial, this.secondary);
    if (this.pswp) {
      this.pswp.dispatch('zoomLevelsUpdate', {
        zoomLevels: this,
        slideData: this.itemData
      });
    }
  }

  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   */
  _parseZoomLevelOption(optionPrefix) {
    // eslint-disable-next-line max-len
    const optionName = /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */optionPrefix + 'ZoomLevel';
    const optionValue = this.options[optionName];
    if (!optionValue) {
      return;
    }
    if (typeof optionValue === 'function') {
      return optionValue(this);
    }
    if (optionValue === 'fill') {
      return this.fill;
    }
    if (optionValue === 'fit') {
      return this.fit;
    }
    return Number(optionValue);
  }

  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let currZoomLevel = this._parseZoomLevelOption('secondary');
    if (currZoomLevel) {
      return currZoomLevel;
    }

    // 3x of "fit" state, but not larger than original
    currZoomLevel = Math.min(1, this.fit * 3);
    if (currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {
      currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;
    }
    return currZoomLevel;
  }

  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption('initial') || this.fit;
  }

  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    const currZoomLevel = this._parseZoomLevelOption('max');
    if (currZoomLevel) {
      return currZoomLevel;
    }

    // max zoom level is x4 from "fit state",
    // used for zoom gesture and ctrl/trackpad zoom
    return Math.max(1, this.fit * 4);
  }
}

/**
 * Lazy-load an image
 * This function is used both by Lightbox and PhotoSwipe core,
 * thus it can be called before dialog is opened.
 *
 * @param {SlideData} itemData Data about the slide
 * @param {PhotoSwipe | PhotoSwipeLightbox | PhotoSwipeBase} instance PhotoSwipe instance
 * @param {number} index
 * @returns Image that is being decoded or false.
 */
function lazyLoadData(itemData, instance, index) {
  // src/slide/content/content.js
  const content = instance.createContentFromData(itemData, index);
  if (!content || !content.lazyLoad) {
    return;
  }
  const {
    options
  } = instance;

  // We need to know dimensions of the image to preload it,
  // as it might use srcset and we need to define sizes
  // @ts-expect-error should provide pswp instance?
  const viewportSize = instance.viewportSize || getViewportSize(options, instance);
  const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
  const zoomLevel = new ZoomLevel(options, itemData, -1);
  zoomLevel.update(content.width, content.height, panAreaSize);
  content.lazyLoad();
  content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));
  return content;
}

/**
 * Lazy-loads specific slide.
 * This function is used both by Lightbox and PhotoSwipe core,
 * thus it can be called before dialog is opened.
 *
 * By default it loads image based on viewport size and initial zoom level.
 *
 * @param {number} index Slide index
 * @param {PhotoSwipe | PhotoSwipeLightbox} instance PhotoSwipe or PhotoSwipeLightbox eventable instance
 */
function lazyLoadSlide(index, instance) {
  const itemData = instance.getItemData(index);
  if (instance.dispatch('lazyLoadSlide', {
    index,
    itemData
  }).defaultPrevented) {
    return;
  }
  return lazyLoadData(itemData, instance, index);
}

/** @typedef {import("../photoswipe.js").default} PhotoSwipe */
/** @typedef {import("../photoswipe.js").PhotoSwipeOptions} PhotoSwipeOptions */
/** @typedef {import("../slide/slide.js").SlideData} SlideData */

/**
 * PhotoSwipe base class that can retrieve data about every slide.
 * Shared by PhotoSwipe Core and PhotoSwipe Lightbox
 */
class PhotoSwipeBase extends Eventable {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    let numItems;
    const {
      dataSource
    } = this.options;
    if (!dataSource) {
      numItems = 0;
    } else if ('length' in dataSource) {
      // may be an array or just object with length property
      numItems = dataSource.length;
    } else if ('gallery' in dataSource) {
      // query DOM elements
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      if (dataSource.items) {
        numItems = dataSource.items.length;
      }
    }

    // legacy event, before filters were introduced
    const event = this.dispatch('numItems', {
      dataSource,
      numItems
    });
    return this.applyFilters('numItems', event.numItems, dataSource);
  }

  /**
   * @param {SlideData} slideData
   * @param {number} index
   */
  createContentFromData(slideData, index) {
    // @ts-expect-error
    return new Content(slideData, this, index);
  }

  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   */
  getItemData(index) {
    const {
      dataSource
    } = this.options;
    let dataSourceItem;
    if (Array.isArray(dataSource)) {
      // Datasource is an array of elements
      dataSourceItem = dataSource[index];
    } else if (dataSource && dataSource.gallery) {
      // dataSource has gallery property,
      // thus it was created by Lightbox, based on
      // gallery and children options

      // query DOM elements
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      dataSourceItem = dataSource.items[index];
    }
    let itemData = dataSourceItem;
    if (itemData instanceof Element) {
      itemData = this._domElementToItemData(itemData);
    }

    // Dispatching the itemData event,
    // it's a legacy verion before filters were introduced
    const event = this.dispatch('itemData', {
      itemData: itemData || {},
      index
    });
    return this.applyFilters('itemData', event.itemData, index);
  }

  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   */
  _getGalleryDOMElements(galleryElement) {
    if (this.options.children || this.options.childSelector) {
      return getElementsFromOption(this.options.children, this.options.childSelector, galleryElement) || [];
    }
    return [galleryElement];
  }

  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   */
  // eslint-disable-next-line class-methods-use-this
  _domElementToItemData(element) {
    /** @type {SlideData} */
    const itemData = {
      element
    };

    // eslint-disable-next-line max-len
    const linkEl = /** @type {HTMLAnchorElement} */element.tagName === 'A' ? element : element.querySelector('a');
    if (linkEl) {
      // src comes from data-pswp-src attribute,
      // if it's empty link href is used
      itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
      if (linkEl.dataset.pswpSrcset) {
        itemData.srcset = linkEl.dataset.pswpSrcset;
      }
      itemData.width = parseInt(linkEl.dataset.pswpWidth, 10);
      itemData.height = parseInt(linkEl.dataset.pswpHeight, 10);

      // support legacy w & h properties
      itemData.w = itemData.width;
      itemData.h = itemData.height;
      if (linkEl.dataset.pswpType) {
        itemData.type = linkEl.dataset.pswpType;
      }
      const thumbnailEl = element.querySelector('img');
      if (thumbnailEl) {
        // msrc is URL to placeholder image that's displayed before large image is loaded
        // by default it's displayed only for the first slide
        itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
        itemData.alt = thumbnailEl.getAttribute('alt');
      }
      if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
        itemData.thumbCropped = true;
      }
    }
    return this.applyFilters('domItemData', itemData, element, linkEl);
  }

  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns Image that is being decoded or false.
   */
  lazyLoadData(itemData, index) {
    return lazyLoadData(itemData, this, index);
  }
}

/**
 * @template T
 * @typedef {import('../types.js').Type<T>} Type<T>
 */

/** @typedef {import('../photoswipe.js').default} PhotoSwipe */
/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */
/** @typedef {import('../photoswipe.js').DataSource} DataSource */
/** @typedef {import('../slide/content.js').default} Content */
/** @typedef {import('../core/eventable.js').PhotoSwipeEventsMap} PhotoSwipeEventsMap */
/** @typedef {import('../core/eventable.js').PhotoSwipeFiltersMap} PhotoSwipeFiltersMap */

/**
 * @template T
 * @typedef {import('../core/eventable.js').EventCallback<T>} EventCallback<T>
 */

/**
 * PhotoSwipe Lightbox
 *
 * - If user has unsupported browser it falls back to default browser action (just opens URL)
 * - Binds click event to links that should open PhotoSwipe
 * - parses DOM strcture for PhotoSwipe (retrieves large image URLs and sizes)
 * - Initializes PhotoSwipe
 *
 *
 * Loader options use the same object as PhotoSwipe, and supports such options:
 *
 * gallery - Element | Element[] | NodeList | string selector for the gallery element
 * children - Element | Element[] | NodeList | string selector for the gallery children
 *
 */
class PhotoSwipeLightbox extends PhotoSwipeBase {
  /**
   * @param {PhotoSwipeOptions} options
   */
  constructor(options) {
    super();
    /** @type {PhotoSwipeOptions} */
    this.options = options || {};
    this._uid = 0;
  }

  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    this.onThumbnailsClick = this.onThumbnailsClick.bind(this);

    // Bind click events to each gallery
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach(galleryElement => {
      galleryElement.addEventListener('click', this.onThumbnailsClick, false);
    });
  }

  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    // Exit and allow default browser action if:
    if (specialKeyUsed(e) // ... if clicked with a special key (ctrl/cmd...)
    || window.pswp // ... if PhotoSwipe is already open
    || window.navigator.onLine === false) {
      // ... if offline
      return;
    }

    // If both clientX and clientY are 0 or not defined,
    // the event is likely triggered by keyboard,
    // so we do not pass the initialPoint
    //
    // Note that some screen readers emulate the mouse position,
    // so it's not ideal way to detect them.
    //
    let initialPoint = {
      x: e.clientX,
      y: e.clientY
    };
    if (!initialPoint.x && !initialPoint.y) {
      initialPoint = null;
    }
    let clickedIndex = this.getClickedIndex(e);
    clickedIndex = this.applyFilters('clickedIndex', clickedIndex, e, this);
    const dataSource = {
      gallery: ( /** @type {HTMLElement} */e.currentTarget)
    };
    if (clickedIndex >= 0) {
      e.preventDefault();
      this.loadAndOpen(clickedIndex, dataSource, initialPoint);
    }
  }

  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   */
  getClickedIndex(e) {
    // legacy option
    if (this.options.getClickedIndexFn) {
      return this.options.getClickedIndexFn.call(this, e);
    }
    const clickedTarget = /** @type {HTMLElement} */e.target;
    const childElements = getElementsFromOption(this.options.children, this.options.childSelector, /** @type {HTMLElement} */e.currentTarget);
    const clickedChildIndex = childElements.findIndex(child => child === clickedTarget || child.contains(clickedTarget));
    if (clickedChildIndex !== -1) {
      return clickedChildIndex;
    } else if (this.options.children || this.options.childSelector) {
      // click wasn't on a child element
      return -1;
    }

    // There is only one item (which is the gallery)
    return 0;
  }

  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource=} dataSource
   * @param {{ x?: number; y?: number }} [initialPoint]
   */
  loadAndOpen(index, dataSource, initialPoint) {
    // Check if the gallery is already open
    if (window.pswp) {
      return false;
    }

    // set initial index
    this.options.index = index;

    // define options for PhotoSwipe constructor
    this.options.initialPointerPos = initialPoint;
    this.shouldOpen = true;
    this.preload(index, dataSource);
    return true;
  }

  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource=} dataSource
   */
  preload(index, dataSource) {
    const {
      options
    } = this;
    if (dataSource) {
      options.dataSource = dataSource;
    }

    // Add the main module
    /** @type {Promise<Type<PhotoSwipe>>[]} */
    const promiseArray = [];
    const pswpModuleType = typeof options.pswpModule;
    if (isPswpClass(options.pswpModule)) {
      promiseArray.push(Promise.resolve( /** @type {Type<PhotoSwipe>} */options.pswpModule));
    } else if (pswpModuleType === 'string') {
      throw new Error('pswpModule as string is no longer supported');
    } else if (pswpModuleType === 'function') {
      promiseArray.push( /** @type {() => Promise<Type<PhotoSwipe>>} */options.pswpModule());
    } else {
      throw new Error('pswpModule is not valid');
    }

    // Add custom-defined promise, if any
    if (typeof options.openPromise === 'function') {
      // allow developers to perform some task before opening
      promiseArray.push(options.openPromise());
    }
    if (options.preloadFirstSlide !== false && index >= 0) {
      this._preloadedContent = lazyLoadSlide(index, this);
    }

    // Wait till all promises resolve and open PhotoSwipe
    const uid = ++this._uid;
    Promise.all(promiseArray).then(iterableModules => {
      if (this.shouldOpen) {
        const mainModule = iterableModules[0];
        this._openPhotoswipe(mainModule, uid);
      }
    });
  }

  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(module, uid) {
    // Cancel opening if UID doesn't match the current one
    // (if user clicked on another gallery item before current was loaded).
    //
    // Or if shouldOpen flag is set to false
    // (developer may modify it via public API)
    if (uid !== this._uid && this.shouldOpen) {
      return;
    }
    this.shouldOpen = false;

    // PhotoSwipe is already open
    if (window.pswp) {
      return;
    }

    /**
     * Pass data to PhotoSwipe and open init
     *
     * @type {PhotoSwipe}
     */
    const pswp = typeof module === 'object' ? new module.default(this.options) // eslint-disable-line
    : new module(this.options); // eslint-disable-line

    this.pswp = pswp;
    window.pswp = pswp;

    // map listeners from Lightbox to PhotoSwipe Core
    /** @type {(keyof PhotoSwipeEventsMap)[]} */
    Object.keys(this._listeners).forEach(name => {
      this._listeners[name].forEach(fn => {
        pswp.on(name, /** @type {EventCallback<typeof name>} */fn);
      });
    });

    // same with filters
    /** @type {(keyof PhotoSwipeFiltersMap)[]} */
    Object.keys(this._filters).forEach(name => {
      this._filters[name].forEach(filter => {
        pswp.addFilter(name, filter.fn, filter.priority);
      });
    });
    if (this._preloadedContent) {
      pswp.contentLoader.addToCache(this._preloadedContent);
      this._preloadedContent = null;
    }
    pswp.on('destroy', () => {
      // clean up public variables
      this.pswp = null;
      window.pswp = null;
    });
    pswp.init();
  }

  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    if (this.pswp) {
      this.pswp.destroy();
    }
    this.shouldOpen = false;
    this._listeners = null;
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach(galleryElement => {
      galleryElement.removeEventListener('click', this.onThumbnailsClick, false);
    });
  }
}

;// CONCATENATED MODULE: ./js/validAccess.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _validateForm = /*#__PURE__*/new WeakSet();
var ValidAccess = /*#__PURE__*/function () {
  function ValidAccess() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$formId = _ref.formId,
      formId = _ref$formId === void 0 ? this.isformIdDefined() : _ref$formId,
      _ref$url = _ref.url,
      url = _ref$url === void 0 ? this.isParameterDefined('url') : _ref$url,
      _ref$success = _ref.success,
      success = _ref$success === void 0 ? this.isParameterDefined('success') : _ref$success,
      _ref$error = _ref.error,
      error = _ref$error === void 0 ? this.isParameterDefined('error') : _ref$error,
      _ref$msgUrl = _ref.msgUrl,
      msgUrl = _ref$msgUrl === void 0 ? this.isParameterDefined('msgUrl') : _ref$msgUrl,
      _ref$loadingImg = _ref.loadingImg,
      loadingImg = _ref$loadingImg === void 0 ? this.isParameterDefined('loadingImg') : _ref$loadingImg,
      _ref$bannerClass = _ref.bannerClass,
      bannerClass = _ref$bannerClass === void 0 ? 'alert-banner' : _ref$bannerClass,
      _ref$loadingWrapper = _ref.loadingWrapper,
      loadingWrapper = _ref$loadingWrapper === void 0 ? 'loadingWrapper' : _ref$loadingWrapper,
      _ref$isLoadingTextVis = _ref.isLoadingTextVisible,
      isLoadingTextVisible = _ref$isLoadingTextVis === void 0 ? true : _ref$isLoadingTextVis,
      _ref$fieldError = _ref.fieldError,
      fieldError = _ref$fieldError === void 0 ? 'error' : _ref$fieldError,
      _ref$isMultistep = _ref.isMultistep,
      isMultistep = _ref$isMultistep === void 0 ? false : _ref$isMultistep;
    _classCallCheck(this, ValidAccess);
    _classPrivateMethodInitSpec(this, _validateForm);
    this.formId = this.validateFormId(formId);
    this.url = url;
    this.success = success;
    this.error = error;
    this.msgUrl = msgUrl;
    this.formBannerClass = bannerClass;
    this.loadingWrapper = loadingWrapper;
    this.loadingImg = loadingImg;
    this.isLoadingTextVisible = isLoadingTextVisible;
    this.formFieldError = fieldError;
    this.formIsMultistep = isMultistep;
    this.formElem = document.querySelector('#' + this.formId);
    this.formChildrenInput;
    //init function
    this.init();
  }
  _createClass(ValidAccess, [{
    key: "validateErrorMsgSource",
    value: function validateErrorMsgSource(url) {
      var errorMsg = url;
      if (errorMsg) {
        return errorMsg;
      } else {
        throw new Error('It is needed to have a json defined for error messages');
      }
    }
  }, {
    key: "validateFormId",
    value: function validateFormId(formId) {
      if (typeof formId !== 'string' || formId.trim() === '') {
        throw new Error('formId must be a string');
      }
      return formId;
    }
  }, {
    key: "isformIdDefined",
    value: function isformIdDefined() {
      throw new Error('formId parameter is required');
    }
  }, {
    key: "isParameterDefined",
    value: function isParameterDefined(param) {
      throw new Error("".concat(param, " parameter is required"));
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;
      //DOM Ready
      document.addEventListener("DOMContentLoaded", function (event) {
        event.preventDefault();
        if (!_this.formMsgs) {
          _this.formMsgs = _this.validateErrorMsgSource(_this.msgUrl);
        }
        //add the custom class to the banner
        _this.formElem.querySelector('[role="alert"]').classList.add(_this.formBannerClass);
        //waiting for user to make a click on submit button
        //using click event since Submit does not aloud show custom messages           
        _this.formElem.querySelector('[type="submit"]').addEventListener('click', function (e) {
          return _classPrivateMethodGet(_this, _validateForm, _validateForm2).call(_this, e);
        });
        //check if textarea have data attribute in order to count characters
        _this.formElem.querySelectorAll('textarea').forEach(function (tarea) {
          if (tarea.dataset.validaTextCount === 'true') {
            //set text count
            _this.setTextCount(tarea);
            //listen input event to count characters
            tarea.addEventListener('input', _this.textCount.bind(_this));
          }
        });
        //set dependency fields events
        _this.formElem.querySelectorAll('[type="radio"], [type="checkbox"]').forEach(function (field) {
          field.addEventListener('change', function (e) {
            return _this.showOrHIdeDependant(e);
          });
        });
      });
    }
    //checks if the element is visible
  }, {
    key: "isVisibleElem",
    value: function isVisibleElem(elemToValidate) {
      return elemToValidate.offsetParent !== null;
    }
    //error msg
  }, {
    key: "errorMsgs",
    value: function errorMsgs(elemName, validation) {
      try {
        var msgObj = this.formMsgs[document.documentElement.lang]['validation'][elemName].filter(function (valid) {
          return valid.type === validation ? valid.msg : false;
        });
        return msgObj[0].msg;
      } catch (_unused) {
        throw new Error('No message set to element ' + elemName + ' in validation ' + validation);
      }
    }
    //adds or removes negativeAmount class
  }, {
    key: "addOrRemoveNegativeClass",
    value: function addOrRemoveNegativeClass(elem) {
      var amountToBeShown = parseInt(elem.dataset.validaMaxText) - elem.value.length;
      elem.parentElement.querySelector('.amountCh').textContent = amountToBeShown;
      if (amountToBeShown < 0) {
        elem.parentElement.querySelector('.amountCh').classList.add('negativeAmount');
      } else {
        elem.parentElement.querySelector('.amountCh').classList.remove('negativeAmount');
      }
    }
    //set the structure below of a textarea for explaining the user 
    //that there is a text limit
  }, {
    key: "setTextCount",
    value: function setTextCount(elem) {
      var template = document.createElement('p');
      template.classList.add('text-count');
      template.setAttribute('aria-live', 'polite');
      var countMsg = this.formMsgs[document.documentElement.lang]['textcount'];
      var countElem;
      //There are two possible approaches 
      //One with a text limit
      if (elem.hasAttribute('maxlength')) {
        countElem = elem.getAttribute('maxlength');
      } else if (elem.dataset.validaMaxText) {
        //The other one let the user type, but noticing  that he or she exceeded the 
        //amount of characters
        countElem = elem.dataset.validaMaxText;
      }
      var dynamicMsg = countMsg.replace('{variable}', "<span class=\"amountCh\">".concat(parseInt(countElem) - elem.value.length, "</span>"));
      template.innerHTML = dynamicMsg;
      elem.parentElement.appendChild(template);
      if (elem.dataset.validaMaxText) {
        this.addOrRemoveNegativeClass(elem);
      }
    }
  }, {
    key: "textCount",
    value: function textCount(event) {
      if (event.target.dataset.validaTextCount) {
        var tareaParent = event.target.parentElement;
        var _iterator = _createForOfIteratorHelper(tareaParent.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            if (child.classList.contains('text-count')) {
              //with maxlength the text in most interfaces is going to stop user to type
              if (event.target.hasAttribute('maxlength')) {
                child.querySelector('.amountCh').textContent = parseInt(event.target.getAttribute('maxlength')) - event.target.value.length;
                //in other cases a suggested amount of text is asked
                //but the user can keep typing
              } else if (event.target.dataset.validaMaxText) {
                this.addOrRemoveNegativeClass(event.target);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
    //adding events per field after try submiting
  }, {
    key: "eventGiver",
    value: function eventGiver(elem) {
      var _this2 = this;
      if (!elem.dataset.validaEventAdded) {
        elem.dataset.validaEventAdded = "true";
        switch (elem.nodeName) {
          case "TEXTAREA":
            elem.addEventListener('input', function () {
              return _this2.validateInput(elem);
            });
            break;
          case "SELECT":
            elem.addEventListener('change', function () {
              return _this2.validateInput(elem);
            });
            break;
          case "INPUT":
            switch (elem.getAttribute('type')) {
              case "text":
              case "number":
              case "tel":
              case "email":
              case "url":
              case "password":
                elem.addEventListener('input', function () {
                  return _this2.validateInput(elem);
                });
                break;
              case "date":
              case "file":
              case "datetime-local":
              case "month":
              case "range":
              case "time":
              case "week":
              case "checkbox":
              case "radio":
              case "color":
                elem.addEventListener('change', function () {
                  return _this2.validateInput(elem);
                });
                break;
            }
            break;
          default:
            break;
        }
      }
    }

    //shows or hides dependant field
  }, {
    key: "showOrHIdeDependant",
    value: function showOrHIdeDependant(event) {
      //if the event target has the control of the dependant field
      if (event.target.hasAttribute('aria-controls')) {
        //get id of dependant field
        var target = event.target.getAttribute('aria-controls');
        //show dependant field
        this.formElem.querySelector('#' + target).removeAttribute('hidden');
      } else {
        //get the attribute name
        var nameAttr = event.target.getAttribute('name');
        //if the element with attribute name in the group has a dependant field 
        if (this.formElem.querySelector('[name="' + nameAttr + '"][aria-controls]')) {
          //select dependant field id
          var dependantID = this.formElem.querySelector('[name="' + nameAttr + '"][aria-controls]').getAttribute('aria-controls');
          //hide dependant field
          this.formElem.querySelector('#' + dependantID).setAttribute('hidden', true);
        }
      }
    }

    //show error message
  }, {
    key: "showErrorMsg",
    value: function showErrorMsg(field, validation) {
      if (this.errorMsgs("".concat(field.name), validation)) {
        //set field as aria-invalid true
        field.setAttribute('aria-invalid', true);
        //set error id
        var valMsgId = validation + "-" + field.name;
        //set the template of error paragraph
        var errorMsgTemplate = "<p  id=\"".concat(valMsgId, "\" class=\"").concat(this.formFieldError, "\">").concat(this.errorMsgs("".concat(field.name), validation), "</p>");
        //checks if the element with error msg is not already in place
        if (!this.formElem.querySelector('#' + valMsgId)) {
          //Radio Buttons and checkboxes error msg is placed at the fieldset bottom
          if (field.type === 'radio' || field.type === 'checkbox') {
            var fieldWrapper = field.closest('fieldset');
            fieldWrapper.insertAdjacentHTML('beforeend', errorMsgTemplate);
          } else {
            //other form fields, error msgs are inserted right after the element               
            field.parentElement.insertAdjacentHTML('beforeend', errorMsgTemplate);
          }
        }
        //add aria-describedby
        if (this.checkIfAriaDescribedby(field)) {
          //if there was already aria-describedby attribute, just add the saved value, plus the error
          field.setAttribute('aria-describedby', field.dataset.validaAriaDescribed + ' ' + valMsgId);
        } else {
          //if not add just error one
          field.setAttribute('aria-describedby', valMsgId);
        }
      } else {
        throw new Error("There is no data-validA attribute set for ".concat(field.name, " for validation type ").concat(validation));
      }
    }
  }, {
    key: "checkIfAriaDescribedby",
    value: function checkIfAriaDescribedby(elem) {
      if (elem.dataset.validaAriaDescribed) {
        return true;
      } else {
        return false;
      }
    }
    //remove error msg
  }, {
    key: "removeErrorMessage",
    value: function removeErrorMessage(elem) {
      //set aria-invalid to false
      elem.setAttribute('aria-invalid', false);
      //all datasets in the element
      var elemErrorMsg = elem.getAttribute('aria-describedby');
      //if there are aria-describedby msg
      if (elemErrorMsg) {
        //split in white space the aria-describedby attribute
        var ariaMsgGroup = elemErrorMsg.split(' ');
        //loop throught all datasets
        var _iterator2 = _createForOfIteratorHelper(ariaMsgGroup),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var errorId = _step2.value;
            //if the element which is refered exists
            //check if that element has the error field class, then erase it
            if (this.formElem.querySelector('#' + errorId) && this.formElem.querySelector('#' + errorId).classList.contains(this.formFieldError)) {
              this.formElem.querySelector('#' + errorId).parentElement.removeChild(this.formElem.querySelector('#' + errorId));
              //remove aria-describedby
              elem.removeAttribute('aria-describedby');
              //but if there was a helping text put it back
              if (this.checkIfAriaDescribedby(elem)) {
                elem.setAttribute('aria-describedby', elem.dataset.validaAriaDescribed);
              }
            }
          }
          //remove attribute aria-describedby from element
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        elem.removeAttribute('aria-describedby');
        //in case form field has a help text
        //it is checked if it had one and then restore it
        if (this.checkIfAriaDescribedby(elem)) {
          elem.setAttribute('aria-describedby', elem.dataset.validaAriaDescribed);
        }
      }
    }
    //add data to element with aria-describedby
  }, {
    key: "backUpHelpText",
    value: function backUpHelpText(elem) {
      if (!this.checkIfAriaDescribedby(elem)) {
        if (!elem.dataset.validaAriaDescribed && elem.getAttribute('aria-describedby') && !elem.hasAttribute('data-valida-event-added')) {
          elem.dataset.validaAriaDescribed = elem.getAttribute('aria-describedby');
        }
      }
    }
    //shows and hide banner checking for a valid form
  }, {
    key: "isValidForm",
    value: function isValidForm() {
      //if there are field with aria-invalid, error banner must be shown
      if (this.formElem.querySelectorAll('[aria-invalid="true"]').length > 0) {
        this.formElem.querySelector('.' + this.formBannerClass).removeAttribute('hidden');
        this.formElem.querySelector('.' + this.formBannerClass).focus();
        return false;
      } else {
        this.formElem.querySelector('.' + this.formBannerClass).setAttribute('hidden', true);
        return true;
      }
    }
    //check if the element with data-valida-target has the same value than its target
  }, {
    key: "validaTargetDoubleValueCheck",
    value: function validaTargetDoubleValueCheck(elemToValidate, elemValue, targetValue) {
      if (elemValue !== targetValue) {
        this.showErrorMsg(elemToValidate, 'target');
        return true;
      } else {
        return false;
      }
    }
    //validates each form input
  }, {
    key: "validateInput",
    value: function validateInput(elemToValidate) {
      var validationStatus = elemToValidate.validity;
      this.backUpHelpText(elemToValidate);
      this.removeErrorMessage(elemToValidate);
      //checks if the element is visible
      if (this.isVisibleElem(elemToValidate)) {
        if (!validationStatus.valid) {
          for (var validProp in validationStatus) {
            if (validationStatus[validProp]) {
              switch (validProp) {
                case "valueMissing":
                case "badInput":
                  //if both validations takes place, bad Input should be shown
                  //since datetime local and time inputs when they are not fullfilled 
                  //the error is both but they are partially filled
                  if (elemToValidate.validity.valueMissing && elemToValidate.validity.badInput) {
                    this.showErrorMsg(elemToValidate, 'badinput');
                  } else {
                    //Required Only validation
                    if (elemToValidate.validity.valueMissing) {
                      this.showErrorMsg(elemToValidate, 'required');
                    } else {
                      //Bad Input Only validation
                      this.showErrorMsg(elemToValidate, 'badinput');
                    }
                  }
                  break;
                case "typeMismatch":
                  this.showErrorMsg(elemToValidate, 'typemismatch');
                  break;
                case "tooShort":
                  this.showErrorMsg(elemToValidate, 'minlength');
                  break;
                case "tooLong":
                  //in some browsers ui it does not trigger since the characters amount is cut
                  this.showErrorMsg(elemToValidate, 'maxlength');
                  break;
                case "stepMismatch":
                  this.showErrorMsg(elemToValidate, 'stepmismatch');
                  break;
                case "rangeUnderflow":
                  this.showErrorMsg(elemToValidate, 'min');
                  break;
                case "rangeOverflow":
                  this.showErrorMsg(elemToValidate, 'max');
                  break;
                case "patternMismatch":
                  this.showErrorMsg(elemToValidate, 'patternmismatch');
                  break;
                default:
                  break;
              }
            }
          }
        } else {
          //First common validation
          //Built in Validations and Custom Validation               
          for (var dataKey in elemToValidate.dataset) {
            switch (dataKey) {
              //Custom Validation
              case 'validaVfunc':
                var validFunct = elemToValidate.dataset.validaVfunc;
                if (window[validFunct](elemToValidate.value)) {
                  this.showErrorMsg(elemToValidate, validFunct);
                }
                break;
              //Two identical values
              case 'validaTarget':
                this.validaTargetDoubleValueCheck(elemToValidate, elemToValidate.value, document.querySelector('#' + elemToValidate.dataset.validaTarget).value);
              default:
                break;
            }
          }
        }
        //adding events to each input field
        this.eventGiver(elemToValidate);
      }
    }
  }, {
    key: "styleInjector",
    value: function styleInjector() {
      var styleTag = document.createElement('style');
      styleTag.dataset.validStyle = "true";
      var styleContent = ".".concat(this.loadingWrapper, " { display: flex;\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            background: rgba(0,0,0,0.3 );}");
      styleTag.append(styleContent);
      document.head.append(styleTag);
    }
    //hide backdrop
  }, {
    key: "hideBckDrop",
    value: function hideBckDrop() {
      document.querySelector('.' + this.loadingWrapper).parentElement.removeChild(document.querySelector('.' + this.loadingWrapper));
    }
    //show backdrop
  }, {
    key: "showBckDrop",
    value: function showBckDrop() {
      //backdrop wrapper
      var template = document.createElement('div');
      //loading img
      var loadImg = document.createElement('img');
      //img wrapper
      var imgWrapper = document.createElement('figure');
      //loading text wrapper
      var loadingText = document.createElement('p');
      //setting img url
      loadImg.setAttribute('src', this.loadingImg);
      //adding the class selected to the user to the template as CSS reference
      template.classList.add(this.loadingWrapper);
      //appending img to img wrapper
      imgWrapper.append(loadImg);
      //adding text to text wrapper
      loadingText.append(this.formMsgs[document.documentElement.lang]['sending']);
      //setting tabIndex, 
      loadingText.setAttribute('tabIndex', '-1');
      if (!this.isLoadingTextVisible) {
        loadingText.style = "clip: rect(0 0 0 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;";
      }
      //inserting img and text to the template
      template.append(imgWrapper, loadingText);
      //checks if there is no a style tag with data valid style in place, if it will be inserted
      if (!this.formElem.querySelector('[data-valid-style="true"]')) {
        this.styleInjector();
      }
      //including template to the body element
      document.body.append(template);
      //focus text
      document.querySelector('.' + this.loadingWrapper + ' [tabIndex="-1"]').focus();
    }
    //final msg
  }, {
    key: "showFinalMsg",
    value: function showFinalMsg(msg) {
      this.formElem.setAttribute('hidden', true);
      document.querySelector('#' + msg).removeAttribute('hidden');
      //focus title or sentence to show final msg
      document.querySelector('#' + msg + ' [tabIndex="-1"]');
    }
    //sending form
  }, {
    key: "sendingForm",
    value: function sendingForm(formElem) {
      var _this3 = this;
      var formToSend = new FormData(formElem);
      this.showBckDrop();
      fetch(this.url, {
        method: 'POST',
        // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formToSend)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log('Success:', data);
        _this3.hideBckDrop();
        _this3.formElem.reset();
        _this3.showFinalMsg(_this3.success);
      })["catch"](function (error) {
        _this3.hideBckDrop();
        _this3.showFinalMsg(_this3.error);
        console.error('Error:', error);
      });
    }
    //Starts the validation Process
  }]);
  return ValidAccess;
}();
function _validateForm2(e) {
  var _this4 = this;
  if (!!e.currentTarget) {
    e.preventDefault();
    this.formChildrenInput = this.formElem.querySelectorAll('input[type="tel"], input[type="text"], input[type="number"], input[type="email"], input[type="time"],input[type="date"], input[type="datetime-local"], input[type="date"], input[type="url"], input[type="password"], input[type="radio"], input[type="checkbox"], input[type="color"], select, textarea');
    this.formChildrenInput.forEach(function (inputElem) {
      _this4.validateInput(inputElem);
    });
    if (this.isValidForm()) {
      //checks if it is an multistep
      if (!this.isMultistep) {
        this.sendingForm(this.formElem);
      } else {
        //multistep process
      }
    }
  } else {
    throw new Error('The form you are trying to set up is not present in the DOM');
  }
}
;// CONCATENATED MODULE: ./js/menu.js
function menu_typeof(obj) { "@babel/helpers - typeof"; return menu_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, menu_typeof(obj); }
function menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function menu_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, menu_toPropertyKey(descriptor.key), descriptor); } }
function menu_createClass(Constructor, protoProps, staticProps) { if (protoProps) menu_defineProperties(Constructor.prototype, protoProps); if (staticProps) menu_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function menu_toPropertyKey(arg) { var key = menu_toPrimitive(arg, "string"); return menu_typeof(key) === "symbol" ? key : String(key); }
function menu_toPrimitive(input, hint) { if (menu_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (menu_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MyMenu = /*#__PURE__*/function () {
  function MyMenu(id, btnId, innerBtns) {
    menu_classCallCheck(this, MyMenu);
    this.menuItems = document.querySelectorAll('#' + id + ' a, #' + id + ' button');
    this.btnTrigger = document.querySelector('#' + btnId);
    this.innerBtns = document.querySelectorAll('.' + innerBtns);
  }
  menu_createClass(MyMenu, [{
    key: "switchMenu",
    value: function switchMenu(elem) {
      if (elem.getAttribute('aria-expanded') === 'false') {
        elem.setAttribute('aria-expanded', true);
      } else {
        elem.setAttribute('aria-expanded', false);
      }
    }
  }, {
    key: "menuOpenOrClosed",
    value: function menuOpenOrClosed(e) {
      if (e.target.tagName !== 'BUTTON') {
        this.switchMenu(e.target.closest('button'));
      } else {
        this.switchMenu(e.target);
      }
    }
  }, {
    key: "goNext",
    value: function goNext(list, index) {
      if (index === list.length - 1) {
        list[0].focus();
      } else {
        list[index + 1].focus();
      }
    }
  }, {
    key: "goPrevious",
    value: function goPrevious(list, index) {
      if (index === 0) {
        list[list.length - 1].focus();
      } else {
        list[index - 1].focus();
      }
    }
  }, {
    key: "triggerBtn",
    value: function triggerBtn(e) {
      var activeElem = document.activeElement;
      var innerListWrapper = activeElem.nextElementSibling;
      this.menuOpenOrClosed(e);
      innerListWrapper.querySelectorAll('li a')[0].focus();
    }
  }, {
    key: "selectSubMenuTrigger",
    value: function selectSubMenuTrigger(e) {
      var parentElem = e.target.closest('.aaog-submenu');
      var subMenuTrigger = parentElem.previousElementSibling;
      this.switchMenu(subMenuTrigger);
      subMenuTrigger.focus();
    }
  }, {
    key: "jumpToMainMenu",
    value: function jumpToMainMenu(e, index, list, direction) {
      if (e.target.classList.contains('aaog-menuitem')) {
        this.selectSubMenuTrigger(e);
        list = this.getList(e);
        index = this.getIndex(list, document.activeElement);
      }
      if (direction === 'right') {
        this.goNext(list, index);
      } else {
        this.goPrevious(list, index);
      }
    }
  }, {
    key: "focusMovement",
    value: function focusMovement(e, index, list, direction) {
      switch (direction) {
        case 'right':
          this.jumpToMainMenu(e, index, list, direction);
          break;
        case 'left':
          this.jumpToMainMenu(e, index, list, direction);
          break;
        case 'up':
          this.goPrevious(list, index);
          break;
        case 'down':
          if (document.activeElement.classList.contains('aaog-menu-trigger')) {
            this.triggerBtn(e);
          } else {
            this.goNext(list, index);
          }
          break;
        default:
      }
    }
  }, {
    key: "getIndex",
    value: function getIndex(collection, elem) {
      return [].indexOf.call(collection, elem);
    }
  }, {
    key: "isHidden",
    value: function isHidden(el) {
      return el.offsetParent === null;
    }
  }, {
    key: "getList",
    value: function getList(e) {
      if (this.isHidden(document.querySelector('.aaog-submenu'))) {
        if (e.target.classList.contains('aaog-menuitem') && (e.key === 'ArrowUp' || e.key === 'ArrowDown') || e.target.classList.contains('aaog-menu-trigger') && e.key === 'ArrowDown') {
          return document.querySelectorAll('#navMenu a.aaog-menuitem');
        } else {
          return document.querySelectorAll('#navMenu a:not(.aaog-menuitem), #navMenu button:not(.aaog-menuitem, .aaog-menu-opener)');
        }
      } else {
        return document.querySelectorAll('#navMenu a, #navMenu button:not(.aaog-menuitem, .aaog-menu-opener)');
      }
    }
  }, {
    key: "keyBoardNav",
    value: function keyBoardNav(e) {
      var parentElemList = this.getList(e);
      e.preventDefault();
      switch (e.key) {
        case 'ArrowRight':
          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'right');
          break;
        case 'ArrowLeft':
          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'left');
          break;
        case 'ArrowUp':
          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'up');
          break;
        case 'ArrowDown':
          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'down');
          break;
        case 'Enter':
          this.triggerBtn(e);
          break;
        case 'Escape':
          this.selectSubMenuTrigger(e);
          break;
        default:
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;
      if (this.btnTrigger) {
        this.btnTrigger.addEventListener('click', this.menuOpenOrClosed.bind(this));
      }
      this.innerBtns.forEach(function (btn) {
        return btn.addEventListener('mousedown', _this.menuOpenOrClosed.bind(_this));
      }, false);
      this.menuItems.forEach(function (item) {
        return item.addEventListener('keyup', _this.keyBoardNav.bind(_this));
      }, false);
      document.querySelector('#navMenu').addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      }, false);
    }
  }]);
  return MyMenu;
}();

;// CONCATENATED MODULE: ./js/translateUrl.js
function TransLate() {
  var lang = document.documentElement.lang;
  var urlPath = window.location.pathname;
  var btn = document.querySelector('.aaog-translate-btn');
  var transformPath = function transformPath(path) {
    if (path[path.length - 1] === '/') {
      return 'indexeng.html';
    }
    if (lang === 'es') {
      var pathSplit = path.split('.');
      return "".concat(pathSplit[0], "eng.").concat(pathSplit[1]);
    } else {
      var _pathSplit = path.split('eng.');
      return "".concat(_pathSplit[0], ".").concat(_pathSplit[1]);
    }
  };
  var checkLang = function checkLang() {
    var newPath = transformPath(urlPath);
    btn.href = newPath;
  };
  checkLang();
}
;// CONCATENATED MODULE: ./js/shared.js


function Shared() {
  function importAll(r) {
    return r.keys().map(r);
  }
  var images = importAll(__webpack_require__(7293));
  var menu = new MyMenu('navMenu', 'menuTrigger', 'aaog-menu-trigger');
  menu.init();
  TransLate();
}
;// CONCATENATED MODULE: ./js/shareProduct.js
var shareProduct = function shareProduct() {
  var buildUrl = function buildUrl(url, links) {
    links.forEach(function (element) {
      var anchorUrl = element.href;
      var urlEncoded = encodeURIComponent(url);
      if (!element.classList.contains('aaog-share-email')) {
        element.href = anchorUrl + urlEncoded;
      } else {
        var subjectText = document.querySelector('h1').textContent;
        element.href = anchorUrl + "subject=".concat(subjectText, "&body=").concat(url);
      }
    });
  };
  var productLoc = location;
  var shareLinks = document.querySelectorAll('.aaog-share-social-media a');
  buildUrl(productLoc, shareLinks);
};
;// CONCATENATED MODULE: ./errorMsg.json
const errorMsg_namespaceObject = JSON.parse('{"en":{"validation":{"nombre":[{"type":"required","msg":"This field is required"}],"email":[{"type":"required","msg":"This field is required"},{"type":"typemismatch","msg":"Please provide a valid email address"}],"comentario":[{"type":"required","msg":"This field is required"}]},"sending":"Sending Form...","textcount":"{variable} characters left"},"es":{"validation":{"nombre":[{"type":"required","msg":"Este campo es requerido"}],"email":[{"type":"required","msg":"Este campo es requerido"},{"type":"typemismatch","msg":"Una direcci&oacute;n de email v&aacute;lida es requerida."}],"comentario":[{"type":"required","msg":"Este campo es requerido"}]},"sending":"Enviando...","textcount":"{variable} caracteres restantes"}}');
;// CONCATENATED MODULE: ./js/modal.js
var modal = function modal() {
  var triggerElem;
  var isAlreadeOpened = false;
  var setFocusTrap = function setFocusTrap(focusableElems) {
    focusableElems.forEach(function (element, idx) {
      element.addEventListener('keyup', function (e) {
        if (idx === 0 && e.shiftKey) focusableElems[focusableElems.length - 1].focus();
        if (idx === focusableElems.length - 1 && !e.shiftKey) focusableElems[0].focus();
      });
    });
  };
  var focusTrap = function focusTrap(elem) {
    if (isAlreadeOpened) return false;
    isAlreadeOpened = true;
    var focusableElems = elem.querySelectorAll('input, button, a, [tabIndex="0"], select, textarea');
    setFocusTrap(focusableElems);
  };
  var openModal = function openModal(target, trigger) {
    triggerElem = trigger;
    var modalElem = document.querySelector(target);
    modalElem.removeAttribute('hidden');
    modalElem.focus();
    document.querySelector('body').classList.add('aaog-overhidden');
    focusTrap(modalElem);
  };
  var closeModal = function closeModal(target) {
    isAlreadeOpened = false;
    var modalElem = document.querySelector(target);
    modalElem.setAttribute('hidden', true);
    document.querySelector('body').classList.remove('aaog-overhidden');
    triggerElem.focus();
  };
  document.addEventListener('keyup', function (e) {
    var modalId = document.querySelector('[aria-modal="true"]').id;
    if (isAlreadeOpened && e.code === "Escape") closeModal("#" + modalId);
  }, false);
  return {
    openModal: openModal,
    closeModal: closeModal
  };
};
;// CONCATENATED MODULE: ./src/imagenes/loadingsmall.gif
const loadingsmall_namespaceObject = __webpack_require__.p + "src/imagenes/loadingsmall.gif";
// EXTERNAL MODULE: ./node_modules/qrcode/lib/browser.js
var browser = __webpack_require__(197);
;// CONCATENATED MODULE: ./js/product.js













Shared();
shareProduct();
if (document.querySelector('html[lang="es"]')) {
  var lightbox = new PhotoSwipeLightbox({
    gallery: '#product-gallery',
    children: 'a',
    closeTitle: 'Cerrar diálogo',
    zoomTitle: 'Zoom de la foto',
    arrowPrevTitle: 'Ir a la foto previa',
    arrowNextTitle: 'Ir a la foto siguiente',
    returnFocus: true,
    pswpModule: function pswpModule() {
      return __webpack_require__.e(/* import() */ 978).then(__webpack_require__.bind(__webpack_require__, 1978));
    }
  });
  lightbox.init();
} else {
  var _lightbox = new PhotoSwipeLightbox({
    gallery: '#product-gallery',
    children: 'a',
    returnFocus: true,
    pswpModule: function pswpModule() {
      return __webpack_require__.e(/* import() */ 978).then(__webpack_require__.bind(__webpack_require__, 1978));
    }
  });
  _lightbox.init();
}
(function () {
  var modalFunc = modal();
  var btnTrigger = document.querySelectorAll('.aaog-modal-trigger');
  var btnClose = document.querySelectorAll('.aaog-close-modal, .aaog-final-btn');
  var formElem = document.querySelector('form');
  var heading = document.querySelector('h1').textContent;
  var reseteableElems = document.querySelectorAll('.aaog-modal-body .aaog-overflow-hidden');
  var closeAndReset = function closeAndReset() {
    modalFunc.closeModal('#prodId');
    formElem.reset();
    reseteableElems.forEach(function (elem) {
      if (!elem.hasAttribute('hidden')) {
        elem.setAttribute('hidden', true);
        formElem.removeAttribute('hidden');
      }
    });
  };
  btnTrigger.forEach(function (btn) {
    btn.addEventListener('click', function () {
      modalFunc.openModal('#prodId', btn);
      formElem.querySelector('#asunto').value = heading;
    }, false);
  });
  btnClose.forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeAndReset();
    }, false);
  });
})();
(function () {
  var form = new ValidAccess({
    formId: "prodForm",
    url: 'https://reqres.in/api/users',
    success: 'aaog-form-success',
    error: 'aaog-form-error',
    msgUrl: errorMsg_namespaceObject,
    bannerClass: 'aaog-alert-banner',
    fieldError: 'aaog-error',
    loadingImg: loadingsmall_namespaceObject
  });
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
      dark: "#000000",
      light: "#FFFFFF"
    }
  };
  browser.toDataURL(window.location.href, opts, function (err, url) {
    var target = document.querySelector('#qr');
    target.src = url;
  });
})();
})();

/******/ })()
;
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dijkstrajs/dijkstra.js":
/*!*********************************************!*\
  !*** ./node_modules/dijkstrajs/dijkstra.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/******************************************************************************\n * Created 2008-08-19.\n *\n * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.\n *\n * Copyright (C) 2008\n *   Wyatt Baldwin <self@wyattbaldwin.com>\n *   All rights reserved\n *\n * Licensed under the MIT license.\n *\n *   http://www.opensource.org/licenses/mit-license.php\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n *****************************************************************************/\nvar dijkstra = {\n  single_source_shortest_paths: function (graph, s, d) {\n    // Predecessor map for each node that has been encountered.\n    // node ID => predecessor node ID\n    var predecessors = {};\n\n    // Costs of shortest paths from s to all nodes encountered.\n    // node ID => cost\n    var costs = {};\n    costs[s] = 0;\n\n    // Costs of shortest paths from s to all nodes encountered; differs from\n    // `costs` in that it provides easy access to the node that currently has\n    // the known shortest path from s.\n    // XXX: Do we actually need both `costs` and `open`?\n    var open = dijkstra.PriorityQueue.make();\n    open.push(s, 0);\n    var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;\n    while (!open.empty()) {\n      // In the nodes remaining in graph that have a known cost from s,\n      // find the node, u, that currently has the shortest path from s.\n      closest = open.pop();\n      u = closest.value;\n      cost_of_s_to_u = closest.cost;\n\n      // Get nodes adjacent to u...\n      adjacent_nodes = graph[u] || {};\n\n      // ...and explore the edges that connect u to those nodes, updating\n      // the cost of the shortest paths to any or all of those nodes as\n      // necessary. v is the node across the current edge from u.\n      for (v in adjacent_nodes) {\n        if (adjacent_nodes.hasOwnProperty(v)) {\n          // Get the cost of the edge running from u to v.\n          cost_of_e = adjacent_nodes[v];\n\n          // Cost of s to u plus the cost of u to v across e--this is *a*\n          // cost from s to v that may or may not be less than the current\n          // known cost to v.\n          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;\n\n          // If we haven't visited v yet OR if the current known cost from s to\n          // v is greater than the new cost we just found (cost of s to u plus\n          // cost of u to v across e), update v's cost in the cost list and\n          // update v's predecessor in the predecessor list (it's now u).\n          cost_of_s_to_v = costs[v];\n          first_visit = typeof costs[v] === 'undefined';\n          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {\n            costs[v] = cost_of_s_to_u_plus_cost_of_e;\n            open.push(v, cost_of_s_to_u_plus_cost_of_e);\n            predecessors[v] = u;\n          }\n        }\n      }\n    }\n    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {\n      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');\n      throw new Error(msg);\n    }\n    return predecessors;\n  },\n  extract_shortest_path_from_predecessor_list: function (predecessors, d) {\n    var nodes = [];\n    var u = d;\n    var predecessor;\n    while (u) {\n      nodes.push(u);\n      predecessor = predecessors[u];\n      u = predecessors[u];\n    }\n    nodes.reverse();\n    return nodes;\n  },\n  find_path: function (graph, s, d) {\n    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);\n    return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);\n  },\n  /**\n   * A very naive priority queue implementation.\n   */\n  PriorityQueue: {\n    make: function (opts) {\n      var T = dijkstra.PriorityQueue,\n        t = {},\n        key;\n      opts = opts || {};\n      for (key in T) {\n        if (T.hasOwnProperty(key)) {\n          t[key] = T[key];\n        }\n      }\n      t.queue = [];\n      t.sorter = opts.sorter || T.default_sorter;\n      return t;\n    },\n    default_sorter: function (a, b) {\n      return a.cost - b.cost;\n    },\n    /**\n     * Add a new item to the queue and ensure the highest priority element\n     * is at the front of the queue.\n     */\n    push: function (value, cost) {\n      var item = {\n        value: value,\n        cost: cost\n      };\n      this.queue.push(item);\n      this.queue.sort(this.sorter);\n    },\n    /**\n     * Return the highest priority element in the queue.\n     */\n    pop: function () {\n      return this.queue.shift();\n    },\n    empty: function () {\n      return this.queue.length === 0;\n    }\n  }\n};\n\n// node.js module exports\nif (true) {\n  module.exports = dijkstra;\n}\n\n//# sourceURL=webpack://AAOG/./node_modules/dijkstrajs/dijkstra.js?");

/***/ }),

/***/ "./node_modules/encode-utf8/index.js":
/*!*******************************************!*\
  !*** ./node_modules/encode-utf8/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function encodeUtf8(input) {\n  var result = [];\n  var size = input.length;\n  for (var index = 0; index < size; index++) {\n    var point = input.charCodeAt(index);\n    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {\n      var second = input.charCodeAt(index + 1);\n      if (second >= 0xDC00 && second <= 0xDFFF) {\n        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae\n        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;\n        index += 1;\n      }\n    }\n\n    // US-ASCII\n    if (point < 0x80) {\n      result.push(point);\n      continue;\n    }\n\n    // 2-byte UTF-8\n    if (point < 0x800) {\n      result.push(point >> 6 | 192);\n      result.push(point & 63 | 128);\n      continue;\n    }\n\n    // 3-byte UTF-8\n    if (point < 0xD800 || point >= 0xE000 && point < 0x10000) {\n      result.push(point >> 12 | 224);\n      result.push(point >> 6 & 63 | 128);\n      result.push(point & 63 | 128);\n      continue;\n    }\n\n    // 4-byte UTF-8\n    if (point >= 0x10000 && point <= 0x10FFFF) {\n      result.push(point >> 18 | 240);\n      result.push(point >> 12 & 63 | 128);\n      result.push(point >> 6 & 63 | 128);\n      result.push(point & 63 | 128);\n      continue;\n    }\n\n    // Invalid character\n    result.push(0xEF, 0xBF, 0xBD);\n  }\n  return new Uint8Array(result).buffer;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/encode-utf8/index.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/browser.js":
/*!********************************************!*\
  !*** ./node_modules/qrcode/lib/browser.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const canPromise = __webpack_require__(/*! ./can-promise */ \"./node_modules/qrcode/lib/can-promise.js\");\nconst QRCode = __webpack_require__(/*! ./core/qrcode */ \"./node_modules/qrcode/lib/core/qrcode.js\");\nconst CanvasRenderer = __webpack_require__(/*! ./renderer/canvas */ \"./node_modules/qrcode/lib/renderer/canvas.js\");\nconst SvgRenderer = __webpack_require__(/*! ./renderer/svg-tag.js */ \"./node_modules/qrcode/lib/renderer/svg-tag.js\");\nfunction renderCanvas(renderFunc, canvas, text, opts, cb) {\n  const args = [].slice.call(arguments, 1);\n  const argsNum = args.length;\n  const isLastArgCb = typeof args[argsNum - 1] === 'function';\n  if (!isLastArgCb && !canPromise()) {\n    throw new Error('Callback required as last argument');\n  }\n  if (isLastArgCb) {\n    if (argsNum < 2) {\n      throw new Error('Too few arguments provided');\n    }\n    if (argsNum === 2) {\n      cb = text;\n      text = canvas;\n      canvas = opts = undefined;\n    } else if (argsNum === 3) {\n      if (canvas.getContext && typeof cb === 'undefined') {\n        cb = opts;\n        opts = undefined;\n      } else {\n        cb = opts;\n        opts = text;\n        text = canvas;\n        canvas = undefined;\n      }\n    }\n  } else {\n    if (argsNum < 1) {\n      throw new Error('Too few arguments provided');\n    }\n    if (argsNum === 1) {\n      text = canvas;\n      canvas = opts = undefined;\n    } else if (argsNum === 2 && !canvas.getContext) {\n      opts = text;\n      text = canvas;\n      canvas = undefined;\n    }\n    return new Promise(function (resolve, reject) {\n      try {\n        const data = QRCode.create(text, opts);\n        resolve(renderFunc(data, canvas, opts));\n      } catch (e) {\n        reject(e);\n      }\n    });\n  }\n  try {\n    const data = QRCode.create(text, opts);\n    cb(null, renderFunc(data, canvas, opts));\n  } catch (e) {\n    cb(e);\n  }\n}\nexports.create = QRCode.create;\nexports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);\nexports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);\n\n// only svg for now.\nexports.toString = renderCanvas.bind(null, function (data, _, opts) {\n  return SvgRenderer.render(data, opts);\n});\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/browser.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/can-promise.js":
/*!************************************************!*\
  !*** ./node_modules/qrcode/lib/can-promise.js ***!
  \************************************************/
/***/ ((module) => {

eval("// can-promise has a crash in some versions of react native that dont have\n// standard global objects\n// https://github.com/soldair/node-qrcode/issues/157\n\nmodule.exports = function () {\n  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/can-promise.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/alignment-pattern.js":
/*!***********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/alignment-pattern.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/**\n * Alignment pattern are fixed reference pattern in defined positions\n * in a matrix symbology, which enables the decode software to re-synchronise\n * the coordinate mapping of the image modules in the event of moderate amounts\n * of distortion of the image.\n *\n * Alignment patterns are present only in QR Code symbols of version 2 or larger\n * and their number depends on the symbol version.\n */\n\nconst getSymbolSize = (__webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/core/utils.js\").getSymbolSize);\n\n/**\n * Calculate the row/column coordinates of the center module of each alignment pattern\n * for the specified QR Code version.\n *\n * The alignment patterns are positioned symmetrically on either side of the diagonal\n * running from the top left corner of the symbol to the bottom right corner.\n *\n * Since positions are simmetrical only half of the coordinates are returned.\n * Each item of the array will represent in turn the x and y coordinate.\n * @see {@link getPositions}\n *\n * @param  {Number} version QR Code version\n * @return {Array}          Array of coordinate\n */\nexports.getRowColCoords = function getRowColCoords(version) {\n  if (version === 1) return [];\n  const posCount = Math.floor(version / 7) + 2;\n  const size = getSymbolSize(version);\n  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;\n  const positions = [size - 7]; // Last coord is always (size - 7)\n\n  for (let i = 1; i < posCount - 1; i++) {\n    positions[i] = positions[i - 1] - intervals;\n  }\n  positions.push(6); // First coord is always 6\n\n  return positions.reverse();\n};\n\n/**\n * Returns an array containing the positions of each alignment pattern.\n * Each array's element represent the center point of the pattern as (x, y) coordinates\n *\n * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}\n * and filtering out the items that overlaps with finder pattern\n *\n * @example\n * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.\n * The alignment patterns, therefore, are to be centered on (row, column)\n * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).\n * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns\n * and are not therefore used for alignment patterns.\n *\n * let pos = getPositions(7)\n * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]\n *\n * @param  {Number} version QR Code version\n * @return {Array}          Array of coordinates\n */\nexports.getPositions = function getPositions(version) {\n  const coords = [];\n  const pos = exports.getRowColCoords(version);\n  const posLength = pos.length;\n  for (let i = 0; i < posLength; i++) {\n    for (let j = 0; j < posLength; j++) {\n      // Skip if position is occupied by finder patterns\n      if (i === 0 && j === 0 ||\n      // top-left\n      i === 0 && j === posLength - 1 ||\n      // bottom-left\n      i === posLength - 1 && j === 0) {\n        // top-right\n        continue;\n      }\n      coords.push([pos[i], pos[j]]);\n    }\n  }\n  return coords;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/alignment-pattern.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/alphanumeric-data.js":
/*!***********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/alphanumeric-data.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Mode = __webpack_require__(/*! ./mode */ \"./node_modules/qrcode/lib/core/mode.js\");\n\n/**\n * Array of characters available in alphanumeric mode\n *\n * As per QR Code specification, to each character\n * is assigned a value from 0 to 44 which in this case coincides\n * with the array index\n *\n * @type {Array}\n */\nconst ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];\nfunction AlphanumericData(data) {\n  this.mode = Mode.ALPHANUMERIC;\n  this.data = data;\n}\nAlphanumericData.getBitsLength = function getBitsLength(length) {\n  return 11 * Math.floor(length / 2) + 6 * (length % 2);\n};\nAlphanumericData.prototype.getLength = function getLength() {\n  return this.data.length;\n};\nAlphanumericData.prototype.getBitsLength = function getBitsLength() {\n  return AlphanumericData.getBitsLength(this.data.length);\n};\nAlphanumericData.prototype.write = function write(bitBuffer) {\n  let i;\n\n  // Input data characters are divided into groups of two characters\n  // and encoded as 11-bit binary codes.\n  for (i = 0; i + 2 <= this.data.length; i += 2) {\n    // The character value of the first character is multiplied by 45\n    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;\n\n    // The character value of the second digit is added to the product\n    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);\n\n    // The sum is then stored as 11-bit binary number\n    bitBuffer.put(value, 11);\n  }\n\n  // If the number of input data characters is not a multiple of two,\n  // the character value of the final character is encoded as a 6-bit binary number.\n  if (this.data.length % 2) {\n    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);\n  }\n};\nmodule.exports = AlphanumericData;\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/alphanumeric-data.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/bit-buffer.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/bit-buffer.js ***!
  \****************************************************/
/***/ ((module) => {

eval("function BitBuffer() {\n  this.buffer = [];\n  this.length = 0;\n}\nBitBuffer.prototype = {\n  get: function (index) {\n    const bufIndex = Math.floor(index / 8);\n    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;\n  },\n  put: function (num, length) {\n    for (let i = 0; i < length; i++) {\n      this.putBit((num >>> length - i - 1 & 1) === 1);\n    }\n  },\n  getLengthInBits: function () {\n    return this.length;\n  },\n  putBit: function (bit) {\n    const bufIndex = Math.floor(this.length / 8);\n    if (this.buffer.length <= bufIndex) {\n      this.buffer.push(0);\n    }\n    if (bit) {\n      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;\n    }\n    this.length++;\n  }\n};\nmodule.exports = BitBuffer;\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/bit-buffer.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/bit-matrix.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/bit-matrix.js ***!
  \****************************************************/
/***/ ((module) => {

eval("/**\n * Helper class to handle QR Code symbol modules\n *\n * @param {Number} size Symbol size\n */\nfunction BitMatrix(size) {\n  if (!size || size < 1) {\n    throw new Error('BitMatrix size must be defined and greater than 0');\n  }\n  this.size = size;\n  this.data = new Uint8Array(size * size);\n  this.reservedBit = new Uint8Array(size * size);\n}\n\n/**\n * Set bit value at specified location\n * If reserved flag is set, this bit will be ignored during masking process\n *\n * @param {Number}  row\n * @param {Number}  col\n * @param {Boolean} value\n * @param {Boolean} reserved\n */\nBitMatrix.prototype.set = function (row, col, value, reserved) {\n  const index = row * this.size + col;\n  this.data[index] = value;\n  if (reserved) this.reservedBit[index] = true;\n};\n\n/**\n * Returns bit value at specified location\n *\n * @param  {Number}  row\n * @param  {Number}  col\n * @return {Boolean}\n */\nBitMatrix.prototype.get = function (row, col) {\n  return this.data[row * this.size + col];\n};\n\n/**\n * Applies xor operator at specified location\n * (used during masking process)\n *\n * @param {Number}  row\n * @param {Number}  col\n * @param {Boolean} value\n */\nBitMatrix.prototype.xor = function (row, col, value) {\n  this.data[row * this.size + col] ^= value;\n};\n\n/**\n * Check if bit at specified location is reserved\n *\n * @param {Number}   row\n * @param {Number}   col\n * @return {Boolean}\n */\nBitMatrix.prototype.isReserved = function (row, col) {\n  return this.reservedBit[row * this.size + col];\n};\nmodule.exports = BitMatrix;\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/bit-matrix.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/byte-data.js":
/*!***************************************************!*\
  !*** ./node_modules/qrcode/lib/core/byte-data.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const encodeUtf8 = __webpack_require__(/*! encode-utf8 */ \"./node_modules/encode-utf8/index.js\");\nconst Mode = __webpack_require__(/*! ./mode */ \"./node_modules/qrcode/lib/core/mode.js\");\nfunction ByteData(data) {\n  this.mode = Mode.BYTE;\n  if (typeof data === 'string') {\n    data = encodeUtf8(data);\n  }\n  this.data = new Uint8Array(data);\n}\nByteData.getBitsLength = function getBitsLength(length) {\n  return length * 8;\n};\nByteData.prototype.getLength = function getLength() {\n  return this.data.length;\n};\nByteData.prototype.getBitsLength = function getBitsLength() {\n  return ByteData.getBitsLength(this.data.length);\n};\nByteData.prototype.write = function (bitBuffer) {\n  for (let i = 0, l = this.data.length; i < l; i++) {\n    bitBuffer.put(this.data[i], 8);\n  }\n};\nmodule.exports = ByteData;\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/byte-data.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/error-correction-code.js":
/*!***************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/error-correction-code.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const ECLevel = __webpack_require__(/*! ./error-correction-level */ \"./node_modules/qrcode/lib/core/error-correction-level.js\");\nconst EC_BLOCKS_TABLE = [\n// L  M  Q  H\n1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];\nconst EC_CODEWORDS_TABLE = [\n// L  M  Q  H\n7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];\n\n/**\r\n * Returns the number of error correction block that the QR Code should contain\r\n * for the specified version and error correction level.\r\n *\r\n * @param  {Number} version              QR Code version\r\n * @param  {Number} errorCorrectionLevel Error correction level\r\n * @return {Number}                      Number of error correction blocks\r\n */\nexports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {\n  switch (errorCorrectionLevel) {\n    case ECLevel.L:\n      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];\n    case ECLevel.M:\n      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];\n    case ECLevel.Q:\n      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];\n    case ECLevel.H:\n      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];\n    default:\n      return undefined;\n  }\n};\n\n/**\r\n * Returns the number of error correction codewords to use for the specified\r\n * version and error correction level.\r\n *\r\n * @param  {Number} version              QR Code version\r\n * @param  {Number} errorCorrectionLevel Error correction level\r\n * @return {Number}                      Number of error correction codewords\r\n */\nexports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {\n  switch (errorCorrectionLevel) {\n    case ECLevel.L:\n      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];\n    case ECLevel.M:\n      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];\n    case ECLevel.Q:\n      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];\n    case ECLevel.H:\n      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];\n    default:\n      return undefined;\n  }\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/error-correction-code.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/error-correction-level.js":
/*!****************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/error-correction-level.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("exports.L = {\n  bit: 1\n};\nexports.M = {\n  bit: 0\n};\nexports.Q = {\n  bit: 3\n};\nexports.H = {\n  bit: 2\n};\nfunction fromString(string) {\n  if (typeof string !== 'string') {\n    throw new Error('Param is not a string');\n  }\n  const lcStr = string.toLowerCase();\n  switch (lcStr) {\n    case 'l':\n    case 'low':\n      return exports.L;\n    case 'm':\n    case 'medium':\n      return exports.M;\n    case 'q':\n    case 'quartile':\n      return exports.Q;\n    case 'h':\n    case 'high':\n      return exports.H;\n    default:\n      throw new Error('Unknown EC Level: ' + string);\n  }\n}\nexports.isValid = function isValid(level) {\n  return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;\n};\nexports.from = function from(value, defaultValue) {\n  if (exports.isValid(value)) {\n    return value;\n  }\n  try {\n    return fromString(value);\n  } catch (e) {\n    return defaultValue;\n  }\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/error-correction-level.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/finder-pattern.js":
/*!********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/finder-pattern.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const getSymbolSize = (__webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/core/utils.js\").getSymbolSize);\nconst FINDER_PATTERN_SIZE = 7;\n\n/**\n * Returns an array containing the positions of each finder pattern.\n * Each array's element represent the top-left point of the pattern as (x, y) coordinates\n *\n * @param  {Number} version QR Code version\n * @return {Array}          Array of coordinates\n */\nexports.getPositions = function getPositions(version) {\n  const size = getSymbolSize(version);\n  return [\n  // top-left\n  [0, 0],\n  // top-right\n  [size - FINDER_PATTERN_SIZE, 0],\n  // bottom-left\n  [0, size - FINDER_PATTERN_SIZE]];\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/finder-pattern.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/format-info.js":
/*!*****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/format-info.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/core/utils.js\");\nconst G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;\nconst G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;\nconst G15_BCH = Utils.getBCHDigit(G15);\n\n/**\n * Returns format information with relative error correction bits\n *\n * The format information is a 15-bit sequence containing 5 data bits,\n * with 10 error correction bits calculated using the (15, 5) BCH code.\n *\n * @param  {Number} errorCorrectionLevel Error correction level\n * @param  {Number} mask                 Mask pattern\n * @return {Number}                      Encoded format information bits\n */\nexports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {\n  const data = errorCorrectionLevel.bit << 3 | mask;\n  let d = data << 10;\n  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {\n    d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;\n  }\n\n  // xor final data with mask pattern in order to ensure that\n  // no combination of Error Correction Level and data mask pattern\n  // will result in an all-zero data string\n  return (data << 10 | d) ^ G15_MASK;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/format-info.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/galois-field.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/galois-field.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("const EXP_TABLE = new Uint8Array(512);\nconst LOG_TABLE = new Uint8Array(256)\n/**\n * Precompute the log and anti-log tables for faster computation later\n *\n * For each possible value in the galois field 2^8, we will pre-compute\n * the logarithm and anti-logarithm (exponential) of this value\n *\n * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}\n */;\n(function initTables() {\n  let x = 1;\n  for (let i = 0; i < 255; i++) {\n    EXP_TABLE[i] = x;\n    LOG_TABLE[x] = i;\n    x <<= 1; // multiply by 2\n\n    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.\n    // This means that when a number is 256 or larger, it should be XORed with 0x11D.\n    if (x & 0x100) {\n      // similar to x >= 256, but a lot faster (because 0x100 == 256)\n      x ^= 0x11D;\n    }\n  }\n\n  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to\n  // stay inside the bounds (because we will mainly use this table for the multiplication of\n  // two GF numbers, no more).\n  // @see {@link mul}\n  for (let i = 255; i < 512; i++) {\n    EXP_TABLE[i] = EXP_TABLE[i - 255];\n  }\n})();\n\n/**\n * Returns log value of n inside Galois Field\n *\n * @param  {Number} n\n * @return {Number}\n */\nexports.log = function log(n) {\n  if (n < 1) throw new Error('log(' + n + ')');\n  return LOG_TABLE[n];\n};\n\n/**\n * Returns anti-log value of n inside Galois Field\n *\n * @param  {Number} n\n * @return {Number}\n */\nexports.exp = function exp(n) {\n  return EXP_TABLE[n];\n};\n\n/**\n * Multiplies two number inside Galois Field\n *\n * @param  {Number} x\n * @param  {Number} y\n * @return {Number}\n */\nexports.mul = function mul(x, y) {\n  if (x === 0 || y === 0) return 0;\n\n  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized\n  // @see {@link initTables}\n  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/galois-field.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/kanji-data.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/kanji-data.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Mode = __webpack_require__(/*! ./mode */ \"./node_modules/qrcode/lib/core/mode.js\");\nconst Utils = __webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/core/utils.js\");\nfunction KanjiData(data) {\n  this.mode = Mode.KANJI;\n  this.data = data;\n}\nKanjiData.getBitsLength = function getBitsLength(length) {\n  return length * 13;\n};\nKanjiData.prototype.getLength = function getLength() {\n  return this.data.length;\n};\nKanjiData.prototype.getBitsLength = function getBitsLength() {\n  return KanjiData.getBitsLength(this.data.length);\n};\nKanjiData.prototype.write = function (bitBuffer) {\n  let i;\n\n  // In the Shift JIS system, Kanji characters are represented by a two byte combination.\n  // These byte values are shifted from the JIS X 0208 values.\n  // JIS X 0208 gives details of the shift coded representation.\n  for (i = 0; i < this.data.length; i++) {\n    let value = Utils.toSJIS(this.data[i]);\n\n    // For characters with Shift JIS values from 0x8140 to 0x9FFC:\n    if (value >= 0x8140 && value <= 0x9FFC) {\n      // Subtract 0x8140 from Shift JIS value\n      value -= 0x8140;\n\n      // For characters with Shift JIS values from 0xE040 to 0xEBBF\n    } else if (value >= 0xE040 && value <= 0xEBBF) {\n      // Subtract 0xC140 from Shift JIS value\n      value -= 0xC140;\n    } else {\n      throw new Error('Invalid SJIS character: ' + this.data[i] + '\\n' + 'Make sure your charset is UTF-8');\n    }\n\n    // Multiply most significant byte of result by 0xC0\n    // and add least significant byte to product\n    value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);\n\n    // Convert result to a 13-bit binary string\n    bitBuffer.put(value, 13);\n  }\n};\nmodule.exports = KanjiData;\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/kanji-data.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/mask-pattern.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/mask-pattern.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/**\n * Data mask pattern reference\n * @type {Object}\n */\nexports.Patterns = {\n  PATTERN000: 0,\n  PATTERN001: 1,\n  PATTERN010: 2,\n  PATTERN011: 3,\n  PATTERN100: 4,\n  PATTERN101: 5,\n  PATTERN110: 6,\n  PATTERN111: 7\n};\n\n/**\n * Weighted penalty scores for the undesirable features\n * @type {Object}\n */\nconst PenaltyScores = {\n  N1: 3,\n  N2: 3,\n  N3: 40,\n  N4: 10\n};\n\n/**\n * Check if mask pattern value is valid\n *\n * @param  {Number}  mask    Mask pattern\n * @return {Boolean}         true if valid, false otherwise\n */\nexports.isValid = function isValid(mask) {\n  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;\n};\n\n/**\n * Returns mask pattern from a value.\n * If value is not valid, returns undefined\n *\n * @param  {Number|String} value        Mask pattern value\n * @return {Number}                     Valid mask pattern or undefined\n */\nexports.from = function from(value) {\n  return exports.isValid(value) ? parseInt(value, 10) : undefined;\n};\n\n/**\n* Find adjacent modules in row/column with the same color\n* and assign a penalty value.\n*\n* Points: N1 + i\n* i is the amount by which the number of adjacent modules of the same color exceeds 5\n*/\nexports.getPenaltyN1 = function getPenaltyN1(data) {\n  const size = data.size;\n  let points = 0;\n  let sameCountCol = 0;\n  let sameCountRow = 0;\n  let lastCol = null;\n  let lastRow = null;\n  for (let row = 0; row < size; row++) {\n    sameCountCol = sameCountRow = 0;\n    lastCol = lastRow = null;\n    for (let col = 0; col < size; col++) {\n      let module = data.get(row, col);\n      if (module === lastCol) {\n        sameCountCol++;\n      } else {\n        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);\n        lastCol = module;\n        sameCountCol = 1;\n      }\n      module = data.get(col, row);\n      if (module === lastRow) {\n        sameCountRow++;\n      } else {\n        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);\n        lastRow = module;\n        sameCountRow = 1;\n      }\n    }\n    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);\n    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);\n  }\n  return points;\n};\n\n/**\n * Find 2x2 blocks with the same color and assign a penalty value\n *\n * Points: N2 * (m - 1) * (n - 1)\n */\nexports.getPenaltyN2 = function getPenaltyN2(data) {\n  const size = data.size;\n  let points = 0;\n  for (let row = 0; row < size - 1; row++) {\n    for (let col = 0; col < size - 1; col++) {\n      const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);\n      if (last === 4 || last === 0) points++;\n    }\n  }\n  return points * PenaltyScores.N2;\n};\n\n/**\n * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,\n * preceded or followed by light area 4 modules wide\n *\n * Points: N3 * number of pattern found\n */\nexports.getPenaltyN3 = function getPenaltyN3(data) {\n  const size = data.size;\n  let points = 0;\n  let bitsCol = 0;\n  let bitsRow = 0;\n  for (let row = 0; row < size; row++) {\n    bitsCol = bitsRow = 0;\n    for (let col = 0; col < size; col++) {\n      bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);\n      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;\n      bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);\n      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;\n    }\n  }\n  return points * PenaltyScores.N3;\n};\n\n/**\n * Calculate proportion of dark modules in entire symbol\n *\n * Points: N4 * k\n *\n * k is the rating of the deviation of the proportion of dark modules\n * in the symbol from 50% in steps of 5%\n */\nexports.getPenaltyN4 = function getPenaltyN4(data) {\n  let darkCount = 0;\n  const modulesCount = data.data.length;\n  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];\n  const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);\n  return k * PenaltyScores.N4;\n};\n\n/**\n * Return mask value at given position\n *\n * @param  {Number} maskPattern Pattern reference value\n * @param  {Number} i           Row\n * @param  {Number} j           Column\n * @return {Boolean}            Mask value\n */\nfunction getMaskAt(maskPattern, i, j) {\n  switch (maskPattern) {\n    case exports.Patterns.PATTERN000:\n      return (i + j) % 2 === 0;\n    case exports.Patterns.PATTERN001:\n      return i % 2 === 0;\n    case exports.Patterns.PATTERN010:\n      return j % 3 === 0;\n    case exports.Patterns.PATTERN011:\n      return (i + j) % 3 === 0;\n    case exports.Patterns.PATTERN100:\n      return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;\n    case exports.Patterns.PATTERN101:\n      return i * j % 2 + i * j % 3 === 0;\n    case exports.Patterns.PATTERN110:\n      return (i * j % 2 + i * j % 3) % 2 === 0;\n    case exports.Patterns.PATTERN111:\n      return (i * j % 3 + (i + j) % 2) % 2 === 0;\n    default:\n      throw new Error('bad maskPattern:' + maskPattern);\n  }\n}\n\n/**\n * Apply a mask pattern to a BitMatrix\n *\n * @param  {Number}    pattern Pattern reference number\n * @param  {BitMatrix} data    BitMatrix data\n */\nexports.applyMask = function applyMask(pattern, data) {\n  const size = data.size;\n  for (let col = 0; col < size; col++) {\n    for (let row = 0; row < size; row++) {\n      if (data.isReserved(row, col)) continue;\n      data.xor(row, col, getMaskAt(pattern, row, col));\n    }\n  }\n};\n\n/**\n * Returns the best mask pattern for data\n *\n * @param  {BitMatrix} data\n * @return {Number} Mask pattern reference number\n */\nexports.getBestMask = function getBestMask(data, setupFormatFunc) {\n  const numPatterns = Object.keys(exports.Patterns).length;\n  let bestPattern = 0;\n  let lowerPenalty = Infinity;\n  for (let p = 0; p < numPatterns; p++) {\n    setupFormatFunc(p);\n    exports.applyMask(p, data);\n\n    // Calculate penalty\n    const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);\n\n    // Undo previously applied mask\n    exports.applyMask(p, data);\n    if (penalty < lowerPenalty) {\n      lowerPenalty = penalty;\n      bestPattern = p;\n    }\n  }\n  return bestPattern;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/mask-pattern.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/mode.js":
/*!**********************************************!*\
  !*** ./node_modules/qrcode/lib/core/mode.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const VersionCheck = __webpack_require__(/*! ./version-check */ \"./node_modules/qrcode/lib/core/version-check.js\");\nconst Regex = __webpack_require__(/*! ./regex */ \"./node_modules/qrcode/lib/core/regex.js\");\n\n/**\n * Numeric mode encodes data from the decimal digit set (0 - 9)\n * (byte values 30HEX to 39HEX).\n * Normally, 3 data characters are represented by 10 bits.\n *\n * @type {Object}\n */\nexports.NUMERIC = {\n  id: 'Numeric',\n  bit: 1 << 0,\n  ccBits: [10, 12, 14]\n};\n\n/**\n * Alphanumeric mode encodes data from a set of 45 characters,\n * i.e. 10 numeric digits (0 - 9),\n *      26 alphabetic characters (A - Z),\n *   and 9 symbols (SP, $, %, *, +, -, ., /, :).\n * Normally, two input characters are represented by 11 bits.\n *\n * @type {Object}\n */\nexports.ALPHANUMERIC = {\n  id: 'Alphanumeric',\n  bit: 1 << 1,\n  ccBits: [9, 11, 13]\n};\n\n/**\n * In byte mode, data is encoded at 8 bits per character.\n *\n * @type {Object}\n */\nexports.BYTE = {\n  id: 'Byte',\n  bit: 1 << 2,\n  ccBits: [8, 16, 16]\n};\n\n/**\n * The Kanji mode efficiently encodes Kanji characters in accordance with\n * the Shift JIS system based on JIS X 0208.\n * The Shift JIS values are shifted from the JIS X 0208 values.\n * JIS X 0208 gives details of the shift coded representation.\n * Each two-byte character value is compacted to a 13-bit binary codeword.\n *\n * @type {Object}\n */\nexports.KANJI = {\n  id: 'Kanji',\n  bit: 1 << 3,\n  ccBits: [8, 10, 12]\n};\n\n/**\n * Mixed mode will contain a sequences of data in a combination of any of\n * the modes described above\n *\n * @type {Object}\n */\nexports.MIXED = {\n  bit: -1\n};\n\n/**\n * Returns the number of bits needed to store the data length\n * according to QR Code specifications.\n *\n * @param  {Mode}   mode    Data mode\n * @param  {Number} version QR Code version\n * @return {Number}         Number of bits\n */\nexports.getCharCountIndicator = function getCharCountIndicator(mode, version) {\n  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);\n  if (!VersionCheck.isValid(version)) {\n    throw new Error('Invalid version: ' + version);\n  }\n  if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];\n  return mode.ccBits[2];\n};\n\n/**\n * Returns the most efficient mode to store the specified data\n *\n * @param  {String} dataStr Input data string\n * @return {Mode}           Best mode\n */\nexports.getBestModeForData = function getBestModeForData(dataStr) {\n  if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (Regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;\n};\n\n/**\n * Return mode name as string\n *\n * @param {Mode} mode Mode object\n * @returns {String}  Mode name\n */\nexports.toString = function toString(mode) {\n  if (mode && mode.id) return mode.id;\n  throw new Error('Invalid mode');\n};\n\n/**\n * Check if input param is a valid mode object\n *\n * @param   {Mode}    mode Mode object\n * @returns {Boolean} True if valid mode, false otherwise\n */\nexports.isValid = function isValid(mode) {\n  return mode && mode.bit && mode.ccBits;\n};\n\n/**\n * Get mode object from its name\n *\n * @param   {String} string Mode name\n * @returns {Mode}          Mode object\n */\nfunction fromString(string) {\n  if (typeof string !== 'string') {\n    throw new Error('Param is not a string');\n  }\n  const lcStr = string.toLowerCase();\n  switch (lcStr) {\n    case 'numeric':\n      return exports.NUMERIC;\n    case 'alphanumeric':\n      return exports.ALPHANUMERIC;\n    case 'kanji':\n      return exports.KANJI;\n    case 'byte':\n      return exports.BYTE;\n    default:\n      throw new Error('Unknown mode: ' + string);\n  }\n}\n\n/**\n * Returns mode from a value.\n * If value is not a valid mode, returns defaultValue\n *\n * @param  {Mode|String} value        Encoding mode\n * @param  {Mode}        defaultValue Fallback value\n * @return {Mode}                     Encoding mode\n */\nexports.from = function from(value, defaultValue) {\n  if (exports.isValid(value)) {\n    return value;\n  }\n  try {\n    return fromString(value);\n  } catch (e) {\n    return defaultValue;\n  }\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/mode.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/numeric-data.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/numeric-data.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Mode = __webpack_require__(/*! ./mode */ \"./node_modules/qrcode/lib/core/mode.js\");\nfunction NumericData(data) {\n  this.mode = Mode.NUMERIC;\n  this.data = data.toString();\n}\nNumericData.getBitsLength = function getBitsLength(length) {\n  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);\n};\nNumericData.prototype.getLength = function getLength() {\n  return this.data.length;\n};\nNumericData.prototype.getBitsLength = function getBitsLength() {\n  return NumericData.getBitsLength(this.data.length);\n};\nNumericData.prototype.write = function write(bitBuffer) {\n  let i, group, value;\n\n  // The input data string is divided into groups of three digits,\n  // and each group is converted to its 10-bit binary equivalent.\n  for (i = 0; i + 3 <= this.data.length; i += 3) {\n    group = this.data.substr(i, 3);\n    value = parseInt(group, 10);\n    bitBuffer.put(value, 10);\n  }\n\n  // If the number of input digits is not an exact multiple of three,\n  // the final one or two digits are converted to 4 or 7 bits respectively.\n  const remainingNum = this.data.length - i;\n  if (remainingNum > 0) {\n    group = this.data.substr(i);\n    value = parseInt(group, 10);\n    bitBuffer.put(value, remainingNum * 3 + 1);\n  }\n};\nmodule.exports = NumericData;\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/numeric-data.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/polynomial.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/polynomial.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const GF = __webpack_require__(/*! ./galois-field */ \"./node_modules/qrcode/lib/core/galois-field.js\");\n\n/**\n * Multiplies two polynomials inside Galois Field\n *\n * @param  {Uint8Array} p1 Polynomial\n * @param  {Uint8Array} p2 Polynomial\n * @return {Uint8Array}    Product of p1 and p2\n */\nexports.mul = function mul(p1, p2) {\n  const coeff = new Uint8Array(p1.length + p2.length - 1);\n  for (let i = 0; i < p1.length; i++) {\n    for (let j = 0; j < p2.length; j++) {\n      coeff[i + j] ^= GF.mul(p1[i], p2[j]);\n    }\n  }\n  return coeff;\n};\n\n/**\n * Calculate the remainder of polynomials division\n *\n * @param  {Uint8Array} divident Polynomial\n * @param  {Uint8Array} divisor  Polynomial\n * @return {Uint8Array}          Remainder\n */\nexports.mod = function mod(divident, divisor) {\n  let result = new Uint8Array(divident);\n  while (result.length - divisor.length >= 0) {\n    const coeff = result[0];\n    for (let i = 0; i < divisor.length; i++) {\n      result[i] ^= GF.mul(divisor[i], coeff);\n    }\n\n    // remove all zeros from buffer head\n    let offset = 0;\n    while (offset < result.length && result[offset] === 0) offset++;\n    result = result.slice(offset);\n  }\n  return result;\n};\n\n/**\n * Generate an irreducible generator polynomial of specified degree\n * (used by Reed-Solomon encoder)\n *\n * @param  {Number} degree Degree of the generator polynomial\n * @return {Uint8Array}    Buffer containing polynomial coefficients\n */\nexports.generateECPolynomial = function generateECPolynomial(degree) {\n  let poly = new Uint8Array([1]);\n  for (let i = 0; i < degree; i++) {\n    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));\n  }\n  return poly;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/polynomial.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/qrcode.js":
/*!************************************************!*\
  !*** ./node_modules/qrcode/lib/core/qrcode.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/core/utils.js\");\nconst ECLevel = __webpack_require__(/*! ./error-correction-level */ \"./node_modules/qrcode/lib/core/error-correction-level.js\");\nconst BitBuffer = __webpack_require__(/*! ./bit-buffer */ \"./node_modules/qrcode/lib/core/bit-buffer.js\");\nconst BitMatrix = __webpack_require__(/*! ./bit-matrix */ \"./node_modules/qrcode/lib/core/bit-matrix.js\");\nconst AlignmentPattern = __webpack_require__(/*! ./alignment-pattern */ \"./node_modules/qrcode/lib/core/alignment-pattern.js\");\nconst FinderPattern = __webpack_require__(/*! ./finder-pattern */ \"./node_modules/qrcode/lib/core/finder-pattern.js\");\nconst MaskPattern = __webpack_require__(/*! ./mask-pattern */ \"./node_modules/qrcode/lib/core/mask-pattern.js\");\nconst ECCode = __webpack_require__(/*! ./error-correction-code */ \"./node_modules/qrcode/lib/core/error-correction-code.js\");\nconst ReedSolomonEncoder = __webpack_require__(/*! ./reed-solomon-encoder */ \"./node_modules/qrcode/lib/core/reed-solomon-encoder.js\");\nconst Version = __webpack_require__(/*! ./version */ \"./node_modules/qrcode/lib/core/version.js\");\nconst FormatInfo = __webpack_require__(/*! ./format-info */ \"./node_modules/qrcode/lib/core/format-info.js\");\nconst Mode = __webpack_require__(/*! ./mode */ \"./node_modules/qrcode/lib/core/mode.js\");\nconst Segments = __webpack_require__(/*! ./segments */ \"./node_modules/qrcode/lib/core/segments.js\");\n\n/**\n * QRCode for JavaScript\n *\n * modified by Ryan Day for nodejs support\n * Copyright (c) 2011 Ryan Day\n *\n * Licensed under the MIT license:\n *   http://www.opensource.org/licenses/mit-license.php\n *\n//---------------------------------------------------------------------\n// QRCode for JavaScript\n//\n// Copyright (c) 2009 Kazuhiko Arase\n//\n// URL: http://www.d-project.com/\n//\n// Licensed under the MIT license:\n//   http://www.opensource.org/licenses/mit-license.php\n//\n// The word \"QR Code\" is registered trademark of\n// DENSO WAVE INCORPORATED\n//   http://www.denso-wave.com/qrcode/faqpatent-e.html\n//\n//---------------------------------------------------------------------\n*/\n\n/**\n * Add finder patterns bits to matrix\n *\n * @param  {BitMatrix} matrix  Modules matrix\n * @param  {Number}    version QR Code version\n */\nfunction setupFinderPattern(matrix, version) {\n  const size = matrix.size;\n  const pos = FinderPattern.getPositions(version);\n  for (let i = 0; i < pos.length; i++) {\n    const row = pos[i][0];\n    const col = pos[i][1];\n    for (let r = -1; r <= 7; r++) {\n      if (row + r <= -1 || size <= row + r) continue;\n      for (let c = -1; c <= 7; c++) {\n        if (col + c <= -1 || size <= col + c) continue;\n        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {\n          matrix.set(row + r, col + c, true, true);\n        } else {\n          matrix.set(row + r, col + c, false, true);\n        }\n      }\n    }\n  }\n}\n\n/**\n * Add timing pattern bits to matrix\n *\n * Note: this function must be called before {@link setupAlignmentPattern}\n *\n * @param  {BitMatrix} matrix Modules matrix\n */\nfunction setupTimingPattern(matrix) {\n  const size = matrix.size;\n  for (let r = 8; r < size - 8; r++) {\n    const value = r % 2 === 0;\n    matrix.set(r, 6, value, true);\n    matrix.set(6, r, value, true);\n  }\n}\n\n/**\n * Add alignment patterns bits to matrix\n *\n * Note: this function must be called after {@link setupTimingPattern}\n *\n * @param  {BitMatrix} matrix  Modules matrix\n * @param  {Number}    version QR Code version\n */\nfunction setupAlignmentPattern(matrix, version) {\n  const pos = AlignmentPattern.getPositions(version);\n  for (let i = 0; i < pos.length; i++) {\n    const row = pos[i][0];\n    const col = pos[i][1];\n    for (let r = -2; r <= 2; r++) {\n      for (let c = -2; c <= 2; c++) {\n        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {\n          matrix.set(row + r, col + c, true, true);\n        } else {\n          matrix.set(row + r, col + c, false, true);\n        }\n      }\n    }\n  }\n}\n\n/**\n * Add version info bits to matrix\n *\n * @param  {BitMatrix} matrix  Modules matrix\n * @param  {Number}    version QR Code version\n */\nfunction setupVersionInfo(matrix, version) {\n  const size = matrix.size;\n  const bits = Version.getEncodedBits(version);\n  let row, col, mod;\n  for (let i = 0; i < 18; i++) {\n    row = Math.floor(i / 3);\n    col = i % 3 + size - 8 - 3;\n    mod = (bits >> i & 1) === 1;\n    matrix.set(row, col, mod, true);\n    matrix.set(col, row, mod, true);\n  }\n}\n\n/**\n * Add format info bits to matrix\n *\n * @param  {BitMatrix} matrix               Modules matrix\n * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level\n * @param  {Number}    maskPattern          Mask pattern reference value\n */\nfunction setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {\n  const size = matrix.size;\n  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);\n  let i, mod;\n  for (i = 0; i < 15; i++) {\n    mod = (bits >> i & 1) === 1;\n\n    // vertical\n    if (i < 6) {\n      matrix.set(i, 8, mod, true);\n    } else if (i < 8) {\n      matrix.set(i + 1, 8, mod, true);\n    } else {\n      matrix.set(size - 15 + i, 8, mod, true);\n    }\n\n    // horizontal\n    if (i < 8) {\n      matrix.set(8, size - i - 1, mod, true);\n    } else if (i < 9) {\n      matrix.set(8, 15 - i - 1 + 1, mod, true);\n    } else {\n      matrix.set(8, 15 - i - 1, mod, true);\n    }\n  }\n\n  // fixed module\n  matrix.set(size - 8, 8, 1, true);\n}\n\n/**\n * Add encoded data bits to matrix\n *\n * @param  {BitMatrix}  matrix Modules matrix\n * @param  {Uint8Array} data   Data codewords\n */\nfunction setupData(matrix, data) {\n  const size = matrix.size;\n  let inc = -1;\n  let row = size - 1;\n  let bitIndex = 7;\n  let byteIndex = 0;\n  for (let col = size - 1; col > 0; col -= 2) {\n    if (col === 6) col--;\n    while (true) {\n      for (let c = 0; c < 2; c++) {\n        if (!matrix.isReserved(row, col - c)) {\n          let dark = false;\n          if (byteIndex < data.length) {\n            dark = (data[byteIndex] >>> bitIndex & 1) === 1;\n          }\n          matrix.set(row, col - c, dark);\n          bitIndex--;\n          if (bitIndex === -1) {\n            byteIndex++;\n            bitIndex = 7;\n          }\n        }\n      }\n      row += inc;\n      if (row < 0 || size <= row) {\n        row -= inc;\n        inc = -inc;\n        break;\n      }\n    }\n  }\n}\n\n/**\n * Create encoded codewords from data input\n *\n * @param  {Number}   version              QR Code version\n * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level\n * @param  {ByteData} data                 Data input\n * @return {Uint8Array}                    Buffer containing encoded codewords\n */\nfunction createData(version, errorCorrectionLevel, segments) {\n  // Prepare data buffer\n  const buffer = new BitBuffer();\n  segments.forEach(function (data) {\n    // prefix data with mode indicator (4 bits)\n    buffer.put(data.mode.bit, 4);\n\n    // Prefix data with character count indicator.\n    // The character count indicator is a string of bits that represents the\n    // number of characters that are being encoded.\n    // The character count indicator must be placed after the mode indicator\n    // and must be a certain number of bits long, depending on the QR version\n    // and data mode\n    // @see {@link Mode.getCharCountIndicator}.\n    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));\n\n    // add binary data sequence to buffer\n    data.write(buffer);\n  });\n\n  // Calculate required number of bits\n  const totalCodewords = Utils.getSymbolTotalCodewords(version);\n  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);\n  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;\n\n  // Add a terminator.\n  // If the bit string is shorter than the total number of required bits,\n  // a terminator of up to four 0s must be added to the right side of the string.\n  // If the bit string is more than four bits shorter than the required number of bits,\n  // add four 0s to the end.\n  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {\n    buffer.put(0, 4);\n  }\n\n  // If the bit string is fewer than four bits shorter, add only the number of 0s that\n  // are needed to reach the required number of bits.\n\n  // After adding the terminator, if the number of bits in the string is not a multiple of 8,\n  // pad the string on the right with 0s to make the string's length a multiple of 8.\n  while (buffer.getLengthInBits() % 8 !== 0) {\n    buffer.putBit(0);\n  }\n\n  // Add pad bytes if the string is still shorter than the total number of required bits.\n  // Extend the buffer to fill the data capacity of the symbol corresponding to\n  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)\n  // and 00010001 (0x11) alternately.\n  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;\n  for (let i = 0; i < remainingByte; i++) {\n    buffer.put(i % 2 ? 0x11 : 0xEC, 8);\n  }\n  return createCodewords(buffer, version, errorCorrectionLevel);\n}\n\n/**\n * Encode input data with Reed-Solomon and return codewords with\n * relative error correction bits\n *\n * @param  {BitBuffer} bitBuffer            Data to encode\n * @param  {Number}    version              QR Code version\n * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level\n * @return {Uint8Array}                     Buffer containing encoded codewords\n */\nfunction createCodewords(bitBuffer, version, errorCorrectionLevel) {\n  // Total codewords for this QR code version (Data + Error correction)\n  const totalCodewords = Utils.getSymbolTotalCodewords(version);\n\n  // Total number of error correction codewords\n  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);\n\n  // Total number of data codewords\n  const dataTotalCodewords = totalCodewords - ecTotalCodewords;\n\n  // Total number of blocks\n  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);\n\n  // Calculate how many blocks each group should contain\n  const blocksInGroup2 = totalCodewords % ecTotalBlocks;\n  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;\n  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);\n  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);\n  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;\n\n  // Number of EC codewords is the same for both groups\n  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;\n\n  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount\n  const rs = new ReedSolomonEncoder(ecCount);\n  let offset = 0;\n  const dcData = new Array(ecTotalBlocks);\n  const ecData = new Array(ecTotalBlocks);\n  let maxDataSize = 0;\n  const buffer = new Uint8Array(bitBuffer.buffer);\n\n  // Divide the buffer into the required number of blocks\n  for (let b = 0; b < ecTotalBlocks; b++) {\n    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;\n\n    // extract a block of data from buffer\n    dcData[b] = buffer.slice(offset, offset + dataSize);\n\n    // Calculate EC codewords for this data block\n    ecData[b] = rs.encode(dcData[b]);\n    offset += dataSize;\n    maxDataSize = Math.max(maxDataSize, dataSize);\n  }\n\n  // Create final data\n  // Interleave the data and error correction codewords from each block\n  const data = new Uint8Array(totalCodewords);\n  let index = 0;\n  let i, r;\n\n  // Add data codewords\n  for (i = 0; i < maxDataSize; i++) {\n    for (r = 0; r < ecTotalBlocks; r++) {\n      if (i < dcData[r].length) {\n        data[index++] = dcData[r][i];\n      }\n    }\n  }\n\n  // Apped EC codewords\n  for (i = 0; i < ecCount; i++) {\n    for (r = 0; r < ecTotalBlocks; r++) {\n      data[index++] = ecData[r][i];\n    }\n  }\n  return data;\n}\n\n/**\n * Build QR Code symbol\n *\n * @param  {String} data                 Input string\n * @param  {Number} version              QR Code version\n * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level\n * @param  {MaskPattern} maskPattern     Mask pattern\n * @return {Object}                      Object containing symbol data\n */\nfunction createSymbol(data, version, errorCorrectionLevel, maskPattern) {\n  let segments;\n  if (Array.isArray(data)) {\n    segments = Segments.fromArray(data);\n  } else if (typeof data === 'string') {\n    let estimatedVersion = version;\n    if (!estimatedVersion) {\n      const rawSegments = Segments.rawSplit(data);\n\n      // Estimate best version that can contain raw splitted segments\n      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);\n    }\n\n    // Build optimized segments\n    // If estimated version is undefined, try with the highest version\n    segments = Segments.fromString(data, estimatedVersion || 40);\n  } else {\n    throw new Error('Invalid data');\n  }\n\n  // Get the min version that can contain data\n  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);\n\n  // If no version is found, data cannot be stored\n  if (!bestVersion) {\n    throw new Error('The amount of data is too big to be stored in a QR Code');\n  }\n\n  // If not specified, use min version as default\n  if (!version) {\n    version = bestVersion;\n\n    // Check if the specified version can contain the data\n  } else if (version < bestVersion) {\n    throw new Error('\\n' + 'The chosen QR Code version cannot contain this amount of data.\\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\\n');\n  }\n  const dataBits = createData(version, errorCorrectionLevel, segments);\n\n  // Allocate matrix buffer\n  const moduleCount = Utils.getSymbolSize(version);\n  const modules = new BitMatrix(moduleCount);\n\n  // Add function modules\n  setupFinderPattern(modules, version);\n  setupTimingPattern(modules);\n  setupAlignmentPattern(modules, version);\n\n  // Add temporary dummy bits for format info just to set them as reserved.\n  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}\n  // since the masking operation must be performed only on the encoding region.\n  // These blocks will be replaced with correct values later in code.\n  setupFormatInfo(modules, errorCorrectionLevel, 0);\n  if (version >= 7) {\n    setupVersionInfo(modules, version);\n  }\n\n  // Add data codewords\n  setupData(modules, dataBits);\n  if (isNaN(maskPattern)) {\n    // Find best mask pattern\n    maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));\n  }\n\n  // Apply mask pattern\n  MaskPattern.applyMask(maskPattern, modules);\n\n  // Replace format info bits with correct values\n  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);\n  return {\n    modules: modules,\n    version: version,\n    errorCorrectionLevel: errorCorrectionLevel,\n    maskPattern: maskPattern,\n    segments: segments\n  };\n}\n\n/**\n * QR Code\n *\n * @param {String | Array} data                 Input data\n * @param {Object} options                      Optional configurations\n * @param {Number} options.version              QR Code version\n * @param {String} options.errorCorrectionLevel Error correction level\n * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis\n */\nexports.create = function create(data, options) {\n  if (typeof data === 'undefined' || data === '') {\n    throw new Error('No input text');\n  }\n  let errorCorrectionLevel = ECLevel.M;\n  let version;\n  let mask;\n  if (typeof options !== 'undefined') {\n    // Use higher error correction level as default\n    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);\n    version = Version.from(options.version);\n    mask = MaskPattern.from(options.maskPattern);\n    if (options.toSJISFunc) {\n      Utils.setToSJISFunction(options.toSJISFunc);\n    }\n  }\n  return createSymbol(data, version, errorCorrectionLevel, mask);\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/qrcode.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/reed-solomon-encoder.js":
/*!**************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/reed-solomon-encoder.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Polynomial = __webpack_require__(/*! ./polynomial */ \"./node_modules/qrcode/lib/core/polynomial.js\");\nfunction ReedSolomonEncoder(degree) {\n  this.genPoly = undefined;\n  this.degree = degree;\n  if (this.degree) this.initialize(this.degree);\n}\n\n/**\n * Initialize the encoder.\n * The input param should correspond to the number of error correction codewords.\n *\n * @param  {Number} degree\n */\nReedSolomonEncoder.prototype.initialize = function initialize(degree) {\n  // create an irreducible generator polynomial\n  this.degree = degree;\n  this.genPoly = Polynomial.generateECPolynomial(this.degree);\n};\n\n/**\n * Encodes a chunk of data\n *\n * @param  {Uint8Array} data Buffer containing input data\n * @return {Uint8Array}      Buffer containing encoded data\n */\nReedSolomonEncoder.prototype.encode = function encode(data) {\n  if (!this.genPoly) {\n    throw new Error('Encoder not initialized');\n  }\n\n  // Calculate EC for this data block\n  // extends data size to data+genPoly size\n  const paddedData = new Uint8Array(data.length + this.degree);\n  paddedData.set(data);\n\n  // The error correction codewords are the remainder after dividing the data codewords\n  // by a generator polynomial\n  const remainder = Polynomial.mod(paddedData, this.genPoly);\n\n  // return EC data blocks (last n byte, where n is the degree of genPoly)\n  // If coefficients number in remainder are less than genPoly degree,\n  // pad with 0s to the left to reach the needed number of coefficients\n  const start = this.degree - remainder.length;\n  if (start > 0) {\n    const buff = new Uint8Array(this.degree);\n    buff.set(remainder, start);\n    return buff;\n  }\n  return remainder;\n};\nmodule.exports = ReedSolomonEncoder;\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/reed-solomon-encoder.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/regex.js":
/*!***********************************************!*\
  !*** ./node_modules/qrcode/lib/core/regex.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("const numeric = '[0-9]+';\nconst alphanumeric = '[A-Z $%*+\\\\-./:]+';\nlet kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';\nkanji = kanji.replace(/u/g, '\\\\u');\nconst byte = '(?:(?![A-Z0-9 $%*+\\\\-./:]|' + kanji + ')(?:.|[\\r\\n]))+';\nexports.KANJI = new RegExp(kanji, 'g');\nexports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\\\-./:]+', 'g');\nexports.BYTE = new RegExp(byte, 'g');\nexports.NUMERIC = new RegExp(numeric, 'g');\nexports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');\nconst TEST_KANJI = new RegExp('^' + kanji + '$');\nconst TEST_NUMERIC = new RegExp('^' + numeric + '$');\nconst TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\\\-./:]+$');\nexports.testKanji = function testKanji(str) {\n  return TEST_KANJI.test(str);\n};\nexports.testNumeric = function testNumeric(str) {\n  return TEST_NUMERIC.test(str);\n};\nexports.testAlphanumeric = function testAlphanumeric(str) {\n  return TEST_ALPHANUMERIC.test(str);\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/regex.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/segments.js":
/*!**************************************************!*\
  !*** ./node_modules/qrcode/lib/core/segments.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Mode = __webpack_require__(/*! ./mode */ \"./node_modules/qrcode/lib/core/mode.js\");\nconst NumericData = __webpack_require__(/*! ./numeric-data */ \"./node_modules/qrcode/lib/core/numeric-data.js\");\nconst AlphanumericData = __webpack_require__(/*! ./alphanumeric-data */ \"./node_modules/qrcode/lib/core/alphanumeric-data.js\");\nconst ByteData = __webpack_require__(/*! ./byte-data */ \"./node_modules/qrcode/lib/core/byte-data.js\");\nconst KanjiData = __webpack_require__(/*! ./kanji-data */ \"./node_modules/qrcode/lib/core/kanji-data.js\");\nconst Regex = __webpack_require__(/*! ./regex */ \"./node_modules/qrcode/lib/core/regex.js\");\nconst Utils = __webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/core/utils.js\");\nconst dijkstra = __webpack_require__(/*! dijkstrajs */ \"./node_modules/dijkstrajs/dijkstra.js\");\n\n/**\n * Returns UTF8 byte length\n *\n * @param  {String} str Input string\n * @return {Number}     Number of byte\n */\nfunction getStringByteLength(str) {\n  return unescape(encodeURIComponent(str)).length;\n}\n\n/**\n * Get a list of segments of the specified mode\n * from a string\n *\n * @param  {Mode}   mode Segment mode\n * @param  {String} str  String to process\n * @return {Array}       Array of object with segments data\n */\nfunction getSegments(regex, mode, str) {\n  const segments = [];\n  let result;\n  while ((result = regex.exec(str)) !== null) {\n    segments.push({\n      data: result[0],\n      index: result.index,\n      mode: mode,\n      length: result[0].length\n    });\n  }\n  return segments;\n}\n\n/**\n * Extracts a series of segments with the appropriate\n * modes from a string\n *\n * @param  {String} dataStr Input string\n * @return {Array}          Array of object with segments data\n */\nfunction getSegmentsFromString(dataStr) {\n  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);\n  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);\n  let byteSegs;\n  let kanjiSegs;\n  if (Utils.isKanjiModeEnabled()) {\n    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);\n    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);\n  } else {\n    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);\n    kanjiSegs = [];\n  }\n  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);\n  return segs.sort(function (s1, s2) {\n    return s1.index - s2.index;\n  }).map(function (obj) {\n    return {\n      data: obj.data,\n      mode: obj.mode,\n      length: obj.length\n    };\n  });\n}\n\n/**\n * Returns how many bits are needed to encode a string of\n * specified length with the specified mode\n *\n * @param  {Number} length String length\n * @param  {Mode} mode     Segment mode\n * @return {Number}        Bit length\n */\nfunction getSegmentBitsLength(length, mode) {\n  switch (mode) {\n    case Mode.NUMERIC:\n      return NumericData.getBitsLength(length);\n    case Mode.ALPHANUMERIC:\n      return AlphanumericData.getBitsLength(length);\n    case Mode.KANJI:\n      return KanjiData.getBitsLength(length);\n    case Mode.BYTE:\n      return ByteData.getBitsLength(length);\n  }\n}\n\n/**\n * Merges adjacent segments which have the same mode\n *\n * @param  {Array} segs Array of object with segments data\n * @return {Array}      Array of object with segments data\n */\nfunction mergeSegments(segs) {\n  return segs.reduce(function (acc, curr) {\n    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;\n    if (prevSeg && prevSeg.mode === curr.mode) {\n      acc[acc.length - 1].data += curr.data;\n      return acc;\n    }\n    acc.push(curr);\n    return acc;\n  }, []);\n}\n\n/**\n * Generates a list of all possible nodes combination which\n * will be used to build a segments graph.\n *\n * Nodes are divided by groups. Each group will contain a list of all the modes\n * in which is possible to encode the given text.\n *\n * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.\n * The group for '12345' will contain then 3 objects, one for each\n * possible encoding mode.\n *\n * Each node represents a possible segment.\n *\n * @param  {Array} segs Array of object with segments data\n * @return {Array}      Array of object with segments data\n */\nfunction buildNodes(segs) {\n  const nodes = [];\n  for (let i = 0; i < segs.length; i++) {\n    const seg = segs[i];\n    switch (seg.mode) {\n      case Mode.NUMERIC:\n        nodes.push([seg, {\n          data: seg.data,\n          mode: Mode.ALPHANUMERIC,\n          length: seg.length\n        }, {\n          data: seg.data,\n          mode: Mode.BYTE,\n          length: seg.length\n        }]);\n        break;\n      case Mode.ALPHANUMERIC:\n        nodes.push([seg, {\n          data: seg.data,\n          mode: Mode.BYTE,\n          length: seg.length\n        }]);\n        break;\n      case Mode.KANJI:\n        nodes.push([seg, {\n          data: seg.data,\n          mode: Mode.BYTE,\n          length: getStringByteLength(seg.data)\n        }]);\n        break;\n      case Mode.BYTE:\n        nodes.push([{\n          data: seg.data,\n          mode: Mode.BYTE,\n          length: getStringByteLength(seg.data)\n        }]);\n    }\n  }\n  return nodes;\n}\n\n/**\n * Builds a graph from a list of nodes.\n * All segments in each node group will be connected with all the segments of\n * the next group and so on.\n *\n * At each connection will be assigned a weight depending on the\n * segment's byte length.\n *\n * @param  {Array} nodes    Array of object with segments data\n * @param  {Number} version QR Code version\n * @return {Object}         Graph of all possible segments\n */\nfunction buildGraph(nodes, version) {\n  const table = {};\n  const graph = {\n    start: {}\n  };\n  let prevNodeIds = ['start'];\n  for (let i = 0; i < nodes.length; i++) {\n    const nodeGroup = nodes[i];\n    const currentNodeIds = [];\n    for (let j = 0; j < nodeGroup.length; j++) {\n      const node = nodeGroup[j];\n      const key = '' + i + j;\n      currentNodeIds.push(key);\n      table[key] = {\n        node: node,\n        lastCount: 0\n      };\n      graph[key] = {};\n      for (let n = 0; n < prevNodeIds.length; n++) {\n        const prevNodeId = prevNodeIds[n];\n        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {\n          graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);\n          table[prevNodeId].lastCount += node.length;\n        } else {\n          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;\n          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost\n        }\n      }\n    }\n\n    prevNodeIds = currentNodeIds;\n  }\n  for (let n = 0; n < prevNodeIds.length; n++) {\n    graph[prevNodeIds[n]].end = 0;\n  }\n  return {\n    map: graph,\n    table: table\n  };\n}\n\n/**\n * Builds a segment from a specified data and mode.\n * If a mode is not specified, the more suitable will be used.\n *\n * @param  {String} data             Input data\n * @param  {Mode | String} modesHint Data mode\n * @return {Segment}                 Segment\n */\nfunction buildSingleSegment(data, modesHint) {\n  let mode;\n  const bestMode = Mode.getBestModeForData(data);\n  mode = Mode.from(modesHint, bestMode);\n\n  // Make sure data can be encoded\n  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {\n    throw new Error('\"' + data + '\"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\\n Suggested mode is: ' + Mode.toString(bestMode));\n  }\n\n  // Use Mode.BYTE if Kanji support is disabled\n  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {\n    mode = Mode.BYTE;\n  }\n  switch (mode) {\n    case Mode.NUMERIC:\n      return new NumericData(data);\n    case Mode.ALPHANUMERIC:\n      return new AlphanumericData(data);\n    case Mode.KANJI:\n      return new KanjiData(data);\n    case Mode.BYTE:\n      return new ByteData(data);\n  }\n}\n\n/**\n * Builds a list of segments from an array.\n * Array can contain Strings or Objects with segment's info.\n *\n * For each item which is a string, will be generated a segment with the given\n * string and the more appropriate encoding mode.\n *\n * For each item which is an object, will be generated a segment with the given\n * data and mode.\n * Objects must contain at least the property \"data\".\n * If property \"mode\" is not present, the more suitable mode will be used.\n *\n * @param  {Array} array Array of objects with segments data\n * @return {Array}       Array of Segments\n */\nexports.fromArray = function fromArray(array) {\n  return array.reduce(function (acc, seg) {\n    if (typeof seg === 'string') {\n      acc.push(buildSingleSegment(seg, null));\n    } else if (seg.data) {\n      acc.push(buildSingleSegment(seg.data, seg.mode));\n    }\n    return acc;\n  }, []);\n};\n\n/**\n * Builds an optimized sequence of segments from a string,\n * which will produce the shortest possible bitstream.\n *\n * @param  {String} data    Input string\n * @param  {Number} version QR Code version\n * @return {Array}          Array of segments\n */\nexports.fromString = function fromString(data, version) {\n  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());\n  const nodes = buildNodes(segs);\n  const graph = buildGraph(nodes, version);\n  const path = dijkstra.find_path(graph.map, 'start', 'end');\n  const optimizedSegs = [];\n  for (let i = 1; i < path.length - 1; i++) {\n    optimizedSegs.push(graph.table[path[i]].node);\n  }\n  return exports.fromArray(mergeSegments(optimizedSegs));\n};\n\n/**\n * Splits a string in various segments with the modes which\n * best represent their content.\n * The produced segments are far from being optimized.\n * The output of this function is only used to estimate a QR Code version\n * which may contain the data.\n *\n * @param  {string} data Input string\n * @return {Array}       Array of segments\n */\nexports.rawSplit = function rawSplit(data) {\n  return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/segments.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/utils.js":
/*!***********************************************!*\
  !*** ./node_modules/qrcode/lib/core/utils.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("let toSJISFunction;\nconst CODEWORDS_COUNT = [0,\n// Not used\n26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];\n\n/**\n * Returns the QR Code size for the specified version\n *\n * @param  {Number} version QR Code version\n * @return {Number}         size of QR code\n */\nexports.getSymbolSize = function getSymbolSize(version) {\n  if (!version) throw new Error('\"version\" cannot be null or undefined');\n  if (version < 1 || version > 40) throw new Error('\"version\" should be in range from 1 to 40');\n  return version * 4 + 17;\n};\n\n/**\n * Returns the total number of codewords used to store data and EC information.\n *\n * @param  {Number} version QR Code version\n * @return {Number}         Data length in bits\n */\nexports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {\n  return CODEWORDS_COUNT[version];\n};\n\n/**\n * Encode data with Bose-Chaudhuri-Hocquenghem\n *\n * @param  {Number} data Value to encode\n * @return {Number}      Encoded value\n */\nexports.getBCHDigit = function (data) {\n  let digit = 0;\n  while (data !== 0) {\n    digit++;\n    data >>>= 1;\n  }\n  return digit;\n};\nexports.setToSJISFunction = function setToSJISFunction(f) {\n  if (typeof f !== 'function') {\n    throw new Error('\"toSJISFunc\" is not a valid function.');\n  }\n  toSJISFunction = f;\n};\nexports.isKanjiModeEnabled = function () {\n  return typeof toSJISFunction !== 'undefined';\n};\nexports.toSJIS = function toSJIS(kanji) {\n  return toSJISFunction(kanji);\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/utils.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/version-check.js":
/*!*******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/version-check.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/**\n * Check if QR Code version is valid\n *\n * @param  {Number}  version QR Code version\n * @return {Boolean}         true if valid version, false otherwise\n */\nexports.isValid = function isValid(version) {\n  return !isNaN(version) && version >= 1 && version <= 40;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/version-check.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/core/version.js":
/*!*************************************************!*\
  !*** ./node_modules/qrcode/lib/core/version.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/core/utils.js\");\nconst ECCode = __webpack_require__(/*! ./error-correction-code */ \"./node_modules/qrcode/lib/core/error-correction-code.js\");\nconst ECLevel = __webpack_require__(/*! ./error-correction-level */ \"./node_modules/qrcode/lib/core/error-correction-level.js\");\nconst Mode = __webpack_require__(/*! ./mode */ \"./node_modules/qrcode/lib/core/mode.js\");\nconst VersionCheck = __webpack_require__(/*! ./version-check */ \"./node_modules/qrcode/lib/core/version-check.js\");\n\n// Generator polynomial used to encode version information\nconst G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;\nconst G18_BCH = Utils.getBCHDigit(G18);\nfunction getBestVersionForDataLength(mode, length, errorCorrectionLevel) {\n  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {\n    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {\n      return currentVersion;\n    }\n  }\n  return undefined;\n}\nfunction getReservedBitsCount(mode, version) {\n  // Character count indicator + mode indicator bits\n  return Mode.getCharCountIndicator(mode, version) + 4;\n}\nfunction getTotalBitsFromDataArray(segments, version) {\n  let totalBits = 0;\n  segments.forEach(function (data) {\n    const reservedBits = getReservedBitsCount(data.mode, version);\n    totalBits += reservedBits + data.getBitsLength();\n  });\n  return totalBits;\n}\nfunction getBestVersionForMixedData(segments, errorCorrectionLevel) {\n  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {\n    const length = getTotalBitsFromDataArray(segments, currentVersion);\n    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {\n      return currentVersion;\n    }\n  }\n  return undefined;\n}\n\n/**\n * Returns version number from a value.\n * If value is not a valid version, returns defaultValue\n *\n * @param  {Number|String} value        QR Code version\n * @param  {Number}        defaultValue Fallback value\n * @return {Number}                     QR Code version number\n */\nexports.from = function from(value, defaultValue) {\n  if (VersionCheck.isValid(value)) {\n    return parseInt(value, 10);\n  }\n  return defaultValue;\n};\n\n/**\n * Returns how much data can be stored with the specified QR code version\n * and error correction level\n *\n * @param  {Number} version              QR Code version (1-40)\n * @param  {Number} errorCorrectionLevel Error correction level\n * @param  {Mode}   mode                 Data mode\n * @return {Number}                      Quantity of storable data\n */\nexports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {\n  if (!VersionCheck.isValid(version)) {\n    throw new Error('Invalid QR Code version');\n  }\n\n  // Use Byte mode as default\n  if (typeof mode === 'undefined') mode = Mode.BYTE;\n\n  // Total codewords for this QR code version (Data + Error correction)\n  const totalCodewords = Utils.getSymbolTotalCodewords(version);\n\n  // Total number of error correction codewords\n  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);\n\n  // Total number of data codewords\n  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;\n  if (mode === Mode.MIXED) return dataTotalCodewordsBits;\n  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);\n\n  // Return max number of storable codewords\n  switch (mode) {\n    case Mode.NUMERIC:\n      return Math.floor(usableBits / 10 * 3);\n    case Mode.ALPHANUMERIC:\n      return Math.floor(usableBits / 11 * 2);\n    case Mode.KANJI:\n      return Math.floor(usableBits / 13);\n    case Mode.BYTE:\n    default:\n      return Math.floor(usableBits / 8);\n  }\n};\n\n/**\n * Returns the minimum version needed to contain the amount of data\n *\n * @param  {Segment} data                    Segment of data\n * @param  {Number} [errorCorrectionLevel=H] Error correction level\n * @param  {Mode} mode                       Data mode\n * @return {Number}                          QR Code version\n */\nexports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {\n  let seg;\n  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);\n  if (Array.isArray(data)) {\n    if (data.length > 1) {\n      return getBestVersionForMixedData(data, ecl);\n    }\n    if (data.length === 0) {\n      return 1;\n    }\n    seg = data[0];\n  } else {\n    seg = data;\n  }\n  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);\n};\n\n/**\n * Returns version information with relative error correction bits\n *\n * The version information is included in QR Code symbols of version 7 or larger.\n * It consists of an 18-bit sequence containing 6 data bits,\n * with 12 error correction bits calculated using the (18, 6) Golay code.\n *\n * @param  {Number} version QR Code version\n * @return {Number}         Encoded version info bits\n */\nexports.getEncodedBits = function getEncodedBits(version) {\n  if (!VersionCheck.isValid(version) || version < 7) {\n    throw new Error('Invalid QR Code version');\n  }\n  let d = version << 12;\n  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {\n    d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;\n  }\n  return version << 12 | d;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/core/version.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/canvas.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/canvas.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/renderer/utils.js\");\nfunction clearCanvas(ctx, canvas, size) {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  if (!canvas.style) canvas.style = {};\n  canvas.height = size;\n  canvas.width = size;\n  canvas.style.height = size + 'px';\n  canvas.style.width = size + 'px';\n}\nfunction getCanvasElement() {\n  try {\n    return document.createElement('canvas');\n  } catch (e) {\n    throw new Error('You need to specify a canvas element');\n  }\n}\nexports.render = function render(qrData, canvas, options) {\n  let opts = options;\n  let canvasEl = canvas;\n  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {\n    opts = canvas;\n    canvas = undefined;\n  }\n  if (!canvas) {\n    canvasEl = getCanvasElement();\n  }\n  opts = Utils.getOptions(opts);\n  const size = Utils.getImageWidth(qrData.modules.size, opts);\n  const ctx = canvasEl.getContext('2d');\n  const image = ctx.createImageData(size, size);\n  Utils.qrToImageData(image.data, qrData, opts);\n  clearCanvas(ctx, canvasEl, size);\n  ctx.putImageData(image, 0, 0);\n  return canvasEl;\n};\nexports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {\n  let opts = options;\n  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {\n    opts = canvas;\n    canvas = undefined;\n  }\n  if (!opts) opts = {};\n  const canvasEl = exports.render(qrData, canvas, opts);\n  const type = opts.type || 'image/png';\n  const rendererOpts = opts.rendererOpts || {};\n  return canvasEl.toDataURL(type, rendererOpts.quality);\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/renderer/canvas.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/svg-tag.js":
/*!*****************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/svg-tag.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils */ \"./node_modules/qrcode/lib/renderer/utils.js\");\nfunction getColorAttrib(color, attrib) {\n  const alpha = color.a / 255;\n  const str = attrib + '=\"' + color.hex + '\"';\n  return alpha < 1 ? str + ' ' + attrib + '-opacity=\"' + alpha.toFixed(2).slice(1) + '\"' : str;\n}\nfunction svgCmd(cmd, x, y) {\n  let str = cmd + x;\n  if (typeof y !== 'undefined') str += ' ' + y;\n  return str;\n}\nfunction qrToPath(data, size, margin) {\n  let path = '';\n  let moveBy = 0;\n  let newRow = false;\n  let lineLength = 0;\n  for (let i = 0; i < data.length; i++) {\n    const col = Math.floor(i % size);\n    const row = Math.floor(i / size);\n    if (!col && !newRow) newRow = true;\n    if (data[i]) {\n      lineLength++;\n      if (!(i > 0 && col > 0 && data[i - 1])) {\n        path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);\n        moveBy = 0;\n        newRow = false;\n      }\n      if (!(col + 1 < size && data[i + 1])) {\n        path += svgCmd('h', lineLength);\n        lineLength = 0;\n      }\n    } else {\n      moveBy++;\n    }\n  }\n  return path;\n}\nexports.render = function render(qrData, options, cb) {\n  const opts = Utils.getOptions(options);\n  const size = qrData.modules.size;\n  const data = qrData.modules.data;\n  const qrcodesize = size + opts.margin * 2;\n  const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d=\"M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z\"/>';\n  const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d=\"' + qrToPath(data, size, opts.margin) + '\"/>';\n  const viewBox = 'viewBox=\"' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '\"';\n  const width = !opts.width ? '' : 'width=\"' + opts.width + '\" height=\"' + opts.width + '\" ';\n  const svgTag = '<svg xmlns=\"http://www.w3.org/2000/svg\" ' + width + viewBox + ' shape-rendering=\"crispEdges\">' + bg + path + '</svg>\\n';\n  if (typeof cb === 'function') {\n    cb(null, svgTag);\n  }\n  return svgTag;\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/renderer/svg-tag.js?");

/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("function hex2rgba(hex) {\n  if (typeof hex === 'number') {\n    hex = hex.toString();\n  }\n  if (typeof hex !== 'string') {\n    throw new Error('Color should be defined as hex string');\n  }\n  let hexCode = hex.slice().replace('#', '').split('');\n  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {\n    throw new Error('Invalid hex color: ' + hex);\n  }\n\n  // Convert from short to long form (fff -> ffffff)\n  if (hexCode.length === 3 || hexCode.length === 4) {\n    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {\n      return [c, c];\n    }));\n  }\n\n  // Add default alpha value\n  if (hexCode.length === 6) hexCode.push('F', 'F');\n  const hexValue = parseInt(hexCode.join(''), 16);\n  return {\n    r: hexValue >> 24 & 255,\n    g: hexValue >> 16 & 255,\n    b: hexValue >> 8 & 255,\n    a: hexValue & 255,\n    hex: '#' + hexCode.slice(0, 6).join('')\n  };\n}\nexports.getOptions = function getOptions(options) {\n  if (!options) options = {};\n  if (!options.color) options.color = {};\n  const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;\n  const width = options.width && options.width >= 21 ? options.width : undefined;\n  const scale = options.scale || 4;\n  return {\n    width: width,\n    scale: width ? 4 : scale,\n    margin: margin,\n    color: {\n      dark: hex2rgba(options.color.dark || '#000000ff'),\n      light: hex2rgba(options.color.light || '#ffffffff')\n    },\n    type: options.type,\n    rendererOpts: options.rendererOpts || {}\n  };\n};\nexports.getScale = function getScale(qrSize, opts) {\n  return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;\n};\nexports.getImageWidth = function getImageWidth(qrSize, opts) {\n  const scale = exports.getScale(qrSize, opts);\n  return Math.floor((qrSize + opts.margin * 2) * scale);\n};\nexports.qrToImageData = function qrToImageData(imgData, qr, opts) {\n  const size = qr.modules.size;\n  const data = qr.modules.data;\n  const scale = exports.getScale(size, opts);\n  const symbolSize = Math.floor((size + opts.margin * 2) * scale);\n  const scaledMargin = opts.margin * scale;\n  const palette = [opts.color.light, opts.color.dark];\n  for (let i = 0; i < symbolSize; i++) {\n    for (let j = 0; j < symbolSize; j++) {\n      let posDst = (i * symbolSize + j) * 4;\n      let pxColor = opts.color.light;\n      if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {\n        const iSrc = Math.floor((i - scaledMargin) / scale);\n        const jSrc = Math.floor((j - scaledMargin) / scale);\n        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];\n      }\n      imgData[posDst++] = pxColor.r;\n      imgData[posDst++] = pxColor.g;\n      imgData[posDst++] = pxColor.b;\n      imgData[posDst] = pxColor.a;\n    }\n  }\n};\n\n//# sourceURL=webpack://AAOG/./node_modules/qrcode/lib/renderer/utils.js?");

/***/ }),

/***/ "./src/js/menu.js":
/*!************************!*\
  !*** ./src/js/menu.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyMenu)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nvar MyMenu = /*#__PURE__*/function () {\n  function MyMenu(id, btnId, innerBtns) {\n    _classCallCheck(this, MyMenu);\n    this.menuItems = document.querySelectorAll('#' + id + ' a, #' + id + ' button');\n    this.btnTrigger = document.querySelector('#' + btnId);\n    this.innerBtns = document.querySelectorAll('.' + innerBtns);\n  }\n  _createClass(MyMenu, [{\n    key: \"switchMenu\",\n    value: function switchMenu(elem) {\n      if (elem.getAttribute('aria-expanded') === 'false') {\n        elem.setAttribute('aria-expanded', true);\n      } else {\n        elem.setAttribute('aria-expanded', false);\n      }\n    }\n  }, {\n    key: \"menuOpenOrClosed\",\n    value: function menuOpenOrClosed(e) {\n      if (e.target.tagName !== 'BUTTON') {\n        this.switchMenu(e.target.closest('button'));\n      } else {\n        this.switchMenu(e.target);\n      }\n    }\n  }, {\n    key: \"goNext\",\n    value: function goNext(list, index) {\n      if (index === list.length - 1) {\n        list[0].focus();\n      } else {\n        list[index + 1].focus();\n      }\n    }\n  }, {\n    key: \"goPrevious\",\n    value: function goPrevious(list, index) {\n      if (index === 0) {\n        list[list.length - 1].focus();\n      } else {\n        list[index - 1].focus();\n      }\n    }\n  }, {\n    key: \"triggerBtn\",\n    value: function triggerBtn(e) {\n      var activeElem = document.activeElement;\n      var innerListWrapper = activeElem.nextElementSibling;\n      this.menuOpenOrClosed(e);\n      innerListWrapper.querySelectorAll('li a')[0].focus();\n    }\n  }, {\n    key: \"selectSubMenuTrigger\",\n    value: function selectSubMenuTrigger(e) {\n      var parentElem = e.target.closest('.aaog-submenu');\n      var subMenuTrigger = parentElem.previousElementSibling;\n      this.switchMenu(subMenuTrigger);\n      subMenuTrigger.focus();\n    }\n  }, {\n    key: \"jumpToMainMenu\",\n    value: function jumpToMainMenu(e, index, list, direction) {\n      if (e.target.classList.contains('aaog-menuitem')) {\n        this.selectSubMenuTrigger(e);\n        list = this.getList(e);\n        index = this.getIndex(list, document.activeElement);\n      }\n      if (direction === 'right') {\n        this.goNext(list, index);\n      } else {\n        this.goPrevious(list, index);\n      }\n    }\n  }, {\n    key: \"focusMovement\",\n    value: function focusMovement(e, index, list, direction) {\n      switch (direction) {\n        case 'right':\n          this.jumpToMainMenu(e, index, list, direction);\n          break;\n        case 'left':\n          this.jumpToMainMenu(e, index, list, direction);\n          break;\n        case 'up':\n          this.goPrevious(list, index);\n          break;\n        case 'down':\n          if (document.activeElement.classList.contains('aaog-menu-trigger')) {\n            this.triggerBtn(e);\n          } else {\n            this.goNext(list, index);\n          }\n          break;\n        default:\n      }\n    }\n  }, {\n    key: \"getIndex\",\n    value: function getIndex(collection, elem) {\n      return [].indexOf.call(collection, elem);\n    }\n  }, {\n    key: \"isHidden\",\n    value: function isHidden(el) {\n      return el.offsetParent === null;\n    }\n  }, {\n    key: \"getList\",\n    value: function getList(e) {\n      if (this.isHidden(document.querySelector('.aaog-submenu'))) {\n        if (e.target.classList.contains('aaog-menuitem') && (e.key === 'ArrowUp' || e.key === 'ArrowDown') || e.target.classList.contains('aaog-menu-trigger') && e.key === 'ArrowDown') {\n          return document.querySelectorAll('#navMenu a.aaog-menuitem');\n        } else {\n          return document.querySelectorAll('#navMenu a:not(.aaog-menuitem), #navMenu button:not(.aaog-menuitem, .aaog-menu-opener)');\n        }\n      } else {\n        return document.querySelectorAll('#navMenu a, #navMenu button:not(.aaog-menuitem, .aaog-menu-opener)');\n      }\n    }\n  }, {\n    key: \"keyBoardNav\",\n    value: function keyBoardNav(e) {\n      var parentElemList = this.getList(e);\n      e.preventDefault();\n      switch (e.key) {\n        case 'ArrowRight':\n          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'right');\n          break;\n        case 'ArrowLeft':\n          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'left');\n          break;\n        case 'ArrowUp':\n          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'up');\n          break;\n        case 'ArrowDown':\n          this.focusMovement(e, this.getIndex(parentElemList, e.target), parentElemList, 'down');\n          break;\n        case 'Enter':\n          this.triggerBtn(e);\n          break;\n        case 'Escape':\n          this.selectSubMenuTrigger(e);\n          break;\n        default:\n      }\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n      if (this.btnTrigger) {\n        this.btnTrigger.addEventListener('click', this.menuOpenOrClosed.bind(this));\n      }\n      this.innerBtns.forEach(function (btn) {\n        return btn.addEventListener('mousedown', _this.menuOpenOrClosed.bind(_this));\n      }, false);\n      this.menuItems.forEach(function (item) {\n        return item.addEventListener('keyup', _this.keyBoardNav.bind(_this));\n      }, false);\n      document.querySelector('#navMenu').addEventListener(\"keydown\", function (e) {\n        if ([\"Space\", \"ArrowUp\", \"ArrowDown\", \"ArrowLeft\", \"ArrowRight\"].indexOf(e.code) > -1) {\n          e.preventDefault();\n        }\n      }, false);\n    }\n  }]);\n  return MyMenu;\n}();\n\n\n//# sourceURL=webpack://AAOG/./src/js/menu.js?");

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   modal: () => (/* binding */ modal)\n/* harmony export */ });\nvar modal = function modal() {\n  var triggerElem;\n  var isAlreadeOpened = false;\n  var setFocusTrap = function setFocusTrap(focusableElems) {\n    focusableElems.forEach(function (element, idx) {\n      element.addEventListener('keyup', function (e) {\n        if (idx === 0 && e.shiftKey) focusableElems[focusableElems.length - 1].focus();\n        if (idx === focusableElems.length - 1 && !e.shiftKey) focusableElems[0].focus();\n      });\n    });\n  };\n  var focusTrap = function focusTrap(elem) {\n    if (isAlreadeOpened) return false;\n    isAlreadeOpened = true;\n    var focusableElems = elem.querySelectorAll('input, button, a, [tabIndex=\"0\"], select, textarea');\n    setFocusTrap(focusableElems);\n  };\n  var openModal = function openModal(target, trigger) {\n    triggerElem = trigger;\n    var modalElem = document.querySelector(target);\n    modalElem.removeAttribute('hidden');\n    modalElem.focus();\n    document.querySelector('body').classList.add('aaog-overhidden');\n    focusTrap(modalElem);\n  };\n  var closeModal = function closeModal(target) {\n    isAlreadeOpened = false;\n    var modalElem = document.querySelector(target);\n    modalElem.setAttribute('hidden', true);\n    document.querySelector('body').classList.remove('aaog-overhidden');\n    triggerElem.focus();\n  };\n  document.addEventListener('keyup', function (e) {\n    var modalId = document.querySelector('[aria-modal=\"true\"]').id;\n    if (isAlreadeOpened && e.code === \"Escape\") closeModal(\"#\" + modalId);\n  }, false);\n  return {\n    openModal: openModal,\n    closeModal: closeModal\n  };\n};\n\n//# sourceURL=webpack://AAOG/./src/js/modal.js?");

/***/ }),

/***/ "./src/js/product.js":
/*!***************************!*\
  !*** ./src/js/product.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var photoswipe_lightbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! photoswipe/lightbox */ \"./node_modules/photoswipe/dist/photoswipe-lightbox.esm.js\");\n/* harmony import */ var photoswipe_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! photoswipe/style.css */ \"./node_modules/photoswipe/dist/photoswipe.css\");\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../styles/styles.css */ \"./src/styles/styles.css\");\n/* harmony import */ var _styles_contact_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../styles/contact.css */ \"./src/styles/contact.css\");\n/* harmony import */ var _styles_product_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../styles/product.css */ \"./src/styles/product.css\");\n/* harmony import */ var _styles_print_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../styles/print.css */ \"./src/styles/print.css\");\n/* harmony import */ var _validAccess__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validAccess */ \"./src/js/validAccess.js\");\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared */ \"./src/js/shared.js\");\n/* harmony import */ var _shareProduct__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shareProduct */ \"./src/js/shareProduct.js\");\n/* harmony import */ var _errorMsg_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../errorMsg.json */ \"./src/errorMsg.json\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modal */ \"./src/js/modal.js\");\n/* harmony import */ var _imagenes_loadingsmall_gif__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../imagenes/loadingsmall.gif */ \"./src/imagenes/loadingsmall.gif\");\n/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! qrcode */ \"./node_modules/qrcode/lib/browser.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n(0,_shared__WEBPACK_IMPORTED_MODULE_7__.Shared)();\n(0,_shareProduct__WEBPACK_IMPORTED_MODULE_8__.shareProduct)();\nif (document.querySelector('html[lang=\"es\"]')) {\n  var lightbox = new photoswipe_lightbox__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    gallery: '#product-gallery',\n    children: 'a',\n    closeTitle: 'Cerrar diálogo',\n    zoomTitle: 'Zoom de la foto',\n    arrowPrevTitle: 'Ir a la foto previa',\n    arrowNextTitle: 'Ir a la foto siguiente',\n    returnFocus: true,\n    pswpModule: function pswpModule() {\n      return __webpack_require__.e(/*! import() */ \"vendors-node_modules_photoswipe_dist_photoswipe_esm_js\").then(__webpack_require__.bind(__webpack_require__, /*! photoswipe */ \"./node_modules/photoswipe/dist/photoswipe.esm.js\"));\n    }\n  });\n  lightbox.init();\n} else {\n  var _lightbox = new photoswipe_lightbox__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    gallery: '#product-gallery',\n    children: 'a',\n    returnFocus: true,\n    pswpModule: function pswpModule() {\n      return __webpack_require__.e(/*! import() */ \"vendors-node_modules_photoswipe_dist_photoswipe_esm_js\").then(__webpack_require__.bind(__webpack_require__, /*! photoswipe */ \"./node_modules/photoswipe/dist/photoswipe.esm.js\"));\n    }\n  });\n  _lightbox.init();\n}\n(function () {\n  var modalFunc = (0,_modal__WEBPACK_IMPORTED_MODULE_10__.modal)();\n  var btnTrigger = document.querySelectorAll('.aaog-modal-trigger');\n  var btnClose = document.querySelectorAll('.aaog-close-modal, .aaog-final-btn');\n  var formElem = document.querySelector('form');\n  var heading = document.querySelector('h1').textContent;\n  var reseteableElems = document.querySelectorAll('.aaog-modal-body .aaog-overflow-hidden');\n  var closeAndReset = function closeAndReset() {\n    modalFunc.closeModal('#prodId');\n    formElem.reset();\n    reseteableElems.forEach(function (elem) {\n      if (!elem.hasAttribute('hidden')) {\n        elem.setAttribute('hidden', true);\n        formElem.removeAttribute('hidden');\n      }\n    });\n  };\n  btnTrigger.forEach(function (btn) {\n    btn.addEventListener('click', function () {\n      modalFunc.openModal('#prodId', btn);\n      formElem.querySelector('#asunto').value = heading;\n    }, false);\n  });\n  btnClose.forEach(function (btn) {\n    btn.addEventListener('click', function () {\n      closeAndReset();\n    }, false);\n  });\n})();\n(function () {\n  var form = new _validAccess__WEBPACK_IMPORTED_MODULE_6__.ValidAccess({\n    formId: \"prodForm\",\n    url: 'https://reqres.in/api/users',\n    success: 'aaog-form-success',\n    error: 'aaog-form-error',\n    msgUrl: _errorMsg_json__WEBPACK_IMPORTED_MODULE_9__,\n    bannerClass: 'aaog-alert-banner',\n    fieldError: 'aaog-error',\n    loadingImg: _imagenes_loadingsmall_gif__WEBPACK_IMPORTED_MODULE_11__\n  });\n  var opts = {\n    errorCorrectionLevel: 'H',\n    type: 'image/jpeg',\n    quality: 0.3,\n    margin: 1,\n    color: {\n      dark: \"#000000\",\n      light: \"#FFFFFF\"\n    }\n  };\n  qrcode__WEBPACK_IMPORTED_MODULE_12__.toDataURL(window.location.href, opts, function (err, url) {\n    var target = document.querySelector('#qr');\n    target.src = url;\n  });\n})();\n\n//# sourceURL=webpack://AAOG/./src/js/product.js?");

/***/ }),

/***/ "./src/js/shareProduct.js":
/*!********************************!*\
  !*** ./src/js/shareProduct.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shareProduct: () => (/* binding */ shareProduct)\n/* harmony export */ });\nvar shareProduct = function shareProduct() {\n  var buildUrl = function buildUrl(url, links) {\n    links.forEach(function (element) {\n      var anchorUrl = element.href;\n      var urlEncoded = encodeURIComponent(url);\n      if (!element.classList.contains('aaog-share-email')) {\n        element.href = anchorUrl + urlEncoded;\n      } else {\n        var subjectText = document.querySelector('h1').textContent;\n        element.href = anchorUrl + \"subject=\".concat(subjectText, \"&body=\").concat(url);\n      }\n    });\n  };\n  var productLoc = location;\n  var shareLinks = document.querySelectorAll('.aaog-share-social-media a');\n  buildUrl(productLoc, shareLinks);\n};\n\n//# sourceURL=webpack://AAOG/./src/js/shareProduct.js?");

/***/ }),

/***/ "./src/js/shared.js":
/*!**************************!*\
  !*** ./src/js/shared.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shared: () => (/* binding */ Shared)\n/* harmony export */ });\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ \"./src/js/menu.js\");\n/* harmony import */ var _translateUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translateUrl */ \"./src/js/translateUrl.js\");\n\n\nfunction Shared() {\n  function importAll(r) {\n    return r.keys().map(r);\n  }\n  var images = importAll(__webpack_require__(\"./src/imagenes sync recursive \\\\.(png%7Cjpg%7Cjpeg%7Csvg)$\"));\n  var menu = new _menu__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('navMenu', 'menuTrigger', 'aaog-menu-trigger');\n  menu.init();\n  (0,_translateUrl__WEBPACK_IMPORTED_MODULE_1__.TransLate)();\n}\n\n//# sourceURL=webpack://AAOG/./src/js/shared.js?");

/***/ }),

/***/ "./src/js/translateUrl.js":
/*!********************************!*\
  !*** ./src/js/translateUrl.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TransLate: () => (/* binding */ TransLate)\n/* harmony export */ });\nfunction TransLate() {\n  var lang = document.documentElement.lang;\n  var urlPath = window.location.pathname;\n  var btn = document.querySelector('.aaog-translate-btn');\n  var transformPath = function transformPath(path) {\n    if (path[path.length - 1] === '/') {\n      return 'indexeng.html';\n    }\n    if (lang === 'es') {\n      var pathSplit = path.split('.');\n      return \"\".concat(pathSplit[0], \"eng.\").concat(pathSplit[1]);\n    } else {\n      var _pathSplit = path.split('eng.');\n      return \"\".concat(_pathSplit[0], \".\").concat(_pathSplit[1]);\n    }\n  };\n  var checkLang = function checkLang() {\n    var newPath = transformPath(urlPath);\n    btn.href = newPath;\n  };\n  checkLang();\n}\n\n//# sourceURL=webpack://AAOG/./src/js/translateUrl.js?");

/***/ }),

/***/ "./src/js/validAccess.js":
/*!*******************************!*\
  !*** ./src/js/validAccess.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ValidAccess: () => (/* binding */ ValidAccess)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }\nfunction _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError(\"Cannot initialize the same private elements twice on an object\"); } }\nfunction _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError(\"attempted to get private field on non-instance\"); } return fn; }\nvar _validateForm = /*#__PURE__*/new WeakSet();\nvar ValidAccess = /*#__PURE__*/function () {\n  function ValidAccess() {\n    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      _ref$formId = _ref.formId,\n      formId = _ref$formId === void 0 ? this.isformIdDefined() : _ref$formId,\n      _ref$url = _ref.url,\n      url = _ref$url === void 0 ? this.isParameterDefined('url') : _ref$url,\n      _ref$success = _ref.success,\n      success = _ref$success === void 0 ? this.isParameterDefined('success') : _ref$success,\n      _ref$error = _ref.error,\n      error = _ref$error === void 0 ? this.isParameterDefined('error') : _ref$error,\n      _ref$msgUrl = _ref.msgUrl,\n      msgUrl = _ref$msgUrl === void 0 ? this.isParameterDefined('msgUrl') : _ref$msgUrl,\n      _ref$loadingImg = _ref.loadingImg,\n      loadingImg = _ref$loadingImg === void 0 ? this.isParameterDefined('loadingImg') : _ref$loadingImg,\n      _ref$bannerClass = _ref.bannerClass,\n      bannerClass = _ref$bannerClass === void 0 ? 'alert-banner' : _ref$bannerClass,\n      _ref$loadingWrapper = _ref.loadingWrapper,\n      loadingWrapper = _ref$loadingWrapper === void 0 ? 'loadingWrapper' : _ref$loadingWrapper,\n      _ref$isLoadingTextVis = _ref.isLoadingTextVisible,\n      isLoadingTextVisible = _ref$isLoadingTextVis === void 0 ? true : _ref$isLoadingTextVis,\n      _ref$fieldError = _ref.fieldError,\n      fieldError = _ref$fieldError === void 0 ? 'error' : _ref$fieldError,\n      _ref$isMultistep = _ref.isMultistep,\n      isMultistep = _ref$isMultistep === void 0 ? false : _ref$isMultistep;\n    _classCallCheck(this, ValidAccess);\n    _classPrivateMethodInitSpec(this, _validateForm);\n    this.formId = this.validateFormId(formId);\n    this.url = url;\n    this.success = success;\n    this.error = error;\n    this.msgUrl = msgUrl;\n    this.formBannerClass = bannerClass;\n    this.loadingWrapper = loadingWrapper;\n    this.loadingImg = loadingImg;\n    this.isLoadingTextVisible = isLoadingTextVisible;\n    this.formFieldError = fieldError;\n    this.formIsMultistep = isMultistep;\n    this.formElem = document.querySelector('#' + this.formId);\n    this.formChildrenInput;\n    //init function\n    this.init();\n  }\n  _createClass(ValidAccess, [{\n    key: \"validateErrorMsgSource\",\n    value: function validateErrorMsgSource(url) {\n      var errorMsg = url;\n      if (errorMsg) {\n        return errorMsg;\n      } else {\n        throw new Error('It is needed to have a json defined for error messages');\n      }\n    }\n  }, {\n    key: \"validateFormId\",\n    value: function validateFormId(formId) {\n      if (typeof formId !== 'string' || formId.trim() === '') {\n        throw new Error('formId must be a string');\n      }\n      return formId;\n    }\n  }, {\n    key: \"isformIdDefined\",\n    value: function isformIdDefined() {\n      throw new Error('formId parameter is required');\n    }\n  }, {\n    key: \"isParameterDefined\",\n    value: function isParameterDefined(param) {\n      throw new Error(\"\".concat(param, \" parameter is required\"));\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n      //DOM Ready\n      document.addEventListener(\"DOMContentLoaded\", function (event) {\n        event.preventDefault();\n        if (!_this.formMsgs) {\n          _this.formMsgs = _this.validateErrorMsgSource(_this.msgUrl);\n        }\n        //add the custom class to the banner\n        _this.formElem.querySelector('[role=\"alert\"]').classList.add(_this.formBannerClass);\n        //waiting for user to make a click on submit button\n        //using click event since Submit does not aloud show custom messages           \n        _this.formElem.querySelector('[type=\"submit\"]').addEventListener('click', function (e) {\n          return _classPrivateMethodGet(_this, _validateForm, _validateForm2).call(_this, e);\n        });\n        //check if textarea have data attribute in order to count characters\n        _this.formElem.querySelectorAll('textarea').forEach(function (tarea) {\n          if (tarea.dataset.validaTextCount === 'true') {\n            //set text count\n            _this.setTextCount(tarea);\n            //listen input event to count characters\n            tarea.addEventListener('input', _this.textCount.bind(_this));\n          }\n        });\n        //set dependency fields events\n        _this.formElem.querySelectorAll('[type=\"radio\"], [type=\"checkbox\"]').forEach(function (field) {\n          field.addEventListener('change', function (e) {\n            return _this.showOrHIdeDependant(e);\n          });\n        });\n      });\n    }\n    //checks if the element is visible\n  }, {\n    key: \"isVisibleElem\",\n    value: function isVisibleElem(elemToValidate) {\n      return elemToValidate.offsetParent !== null;\n    }\n    //error msg\n  }, {\n    key: \"errorMsgs\",\n    value: function errorMsgs(elemName, validation) {\n      try {\n        var msgObj = this.formMsgs[document.documentElement.lang]['validation'][elemName].filter(function (valid) {\n          return valid.type === validation ? valid.msg : false;\n        });\n        return msgObj[0].msg;\n      } catch (_unused) {\n        throw new Error('No message set to element ' + elemName + ' in validation ' + validation);\n      }\n    }\n    //adds or removes negativeAmount class\n  }, {\n    key: \"addOrRemoveNegativeClass\",\n    value: function addOrRemoveNegativeClass(elem) {\n      var amountToBeShown = parseInt(elem.dataset.validaMaxText) - elem.value.length;\n      elem.parentElement.querySelector('.amountCh').textContent = amountToBeShown;\n      if (amountToBeShown < 0) {\n        elem.parentElement.querySelector('.amountCh').classList.add('negativeAmount');\n      } else {\n        elem.parentElement.querySelector('.amountCh').classList.remove('negativeAmount');\n      }\n    }\n    //set the structure below of a textarea for explaining the user \n    //that there is a text limit\n  }, {\n    key: \"setTextCount\",\n    value: function setTextCount(elem) {\n      var template = document.createElement('p');\n      template.classList.add('text-count');\n      template.setAttribute('aria-live', 'polite');\n      var countMsg = this.formMsgs[document.documentElement.lang]['textcount'];\n      var countElem;\n      //There are two possible approaches \n      //One with a text limit\n      if (elem.hasAttribute('maxlength')) {\n        countElem = elem.getAttribute('maxlength');\n      } else if (elem.dataset.validaMaxText) {\n        //The other one let the user type, but noticing  that he or she exceeded the \n        //amount of characters\n        countElem = elem.dataset.validaMaxText;\n      }\n      var dynamicMsg = countMsg.replace('{variable}', \"<span class=\\\"amountCh\\\">\".concat(parseInt(countElem) - elem.value.length, \"</span>\"));\n      template.innerHTML = dynamicMsg;\n      elem.parentElement.appendChild(template);\n      if (elem.dataset.validaMaxText) {\n        this.addOrRemoveNegativeClass(elem);\n      }\n    }\n  }, {\n    key: \"textCount\",\n    value: function textCount(event) {\n      if (event.target.dataset.validaTextCount) {\n        var tareaParent = event.target.parentElement;\n        var _iterator = _createForOfIteratorHelper(tareaParent.children),\n          _step;\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var child = _step.value;\n            if (child.classList.contains('text-count')) {\n              //with maxlength the text in most interfaces is going to stop user to type\n              if (event.target.hasAttribute('maxlength')) {\n                child.querySelector('.amountCh').textContent = parseInt(event.target.getAttribute('maxlength')) - event.target.value.length;\n                //in other cases a suggested amount of text is asked\n                //but the user can keep typing\n              } else if (event.target.dataset.validaMaxText) {\n                this.addOrRemoveNegativeClass(event.target);\n              }\n            }\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n      }\n    }\n    //adding events per field after try submiting\n  }, {\n    key: \"eventGiver\",\n    value: function eventGiver(elem) {\n      var _this2 = this;\n      if (!elem.dataset.validaEventAdded) {\n        elem.dataset.validaEventAdded = \"true\";\n        switch (elem.nodeName) {\n          case \"TEXTAREA\":\n            elem.addEventListener('input', function () {\n              return _this2.validateInput(elem);\n            });\n            break;\n          case \"SELECT\":\n            elem.addEventListener('change', function () {\n              return _this2.validateInput(elem);\n            });\n            break;\n          case \"INPUT\":\n            switch (elem.getAttribute('type')) {\n              case \"text\":\n              case \"number\":\n              case \"tel\":\n              case \"email\":\n              case \"url\":\n              case \"password\":\n                elem.addEventListener('input', function () {\n                  return _this2.validateInput(elem);\n                });\n                break;\n              case \"date\":\n              case \"file\":\n              case \"datetime-local\":\n              case \"month\":\n              case \"range\":\n              case \"time\":\n              case \"week\":\n              case \"checkbox\":\n              case \"radio\":\n              case \"color\":\n                elem.addEventListener('change', function () {\n                  return _this2.validateInput(elem);\n                });\n                break;\n            }\n            break;\n          default:\n            break;\n        }\n      }\n    }\n\n    //shows or hides dependant field\n  }, {\n    key: \"showOrHIdeDependant\",\n    value: function showOrHIdeDependant(event) {\n      //if the event target has the control of the dependant field\n      if (event.target.hasAttribute('aria-controls')) {\n        //get id of dependant field\n        var target = event.target.getAttribute('aria-controls');\n        //show dependant field\n        this.formElem.querySelector('#' + target).removeAttribute('hidden');\n      } else {\n        //get the attribute name\n        var nameAttr = event.target.getAttribute('name');\n        //if the element with attribute name in the group has a dependant field \n        if (this.formElem.querySelector('[name=\"' + nameAttr + '\"][aria-controls]')) {\n          //select dependant field id\n          var dependantID = this.formElem.querySelector('[name=\"' + nameAttr + '\"][aria-controls]').getAttribute('aria-controls');\n          //hide dependant field\n          this.formElem.querySelector('#' + dependantID).setAttribute('hidden', true);\n        }\n      }\n    }\n\n    //show error message\n  }, {\n    key: \"showErrorMsg\",\n    value: function showErrorMsg(field, validation) {\n      if (this.errorMsgs(\"\".concat(field.name), validation)) {\n        //set field as aria-invalid true\n        field.setAttribute('aria-invalid', true);\n        //set error id\n        var valMsgId = validation + \"-\" + field.name;\n        //set the template of error paragraph\n        var errorMsgTemplate = \"<p  id=\\\"\".concat(valMsgId, \"\\\" class=\\\"\").concat(this.formFieldError, \"\\\">\").concat(this.errorMsgs(\"\".concat(field.name), validation), \"</p>\");\n        //checks if the element with error msg is not already in place\n        if (!this.formElem.querySelector('#' + valMsgId)) {\n          //Radio Buttons and checkboxes error msg is placed at the fieldset bottom\n          if (field.type === 'radio' || field.type === 'checkbox') {\n            var fieldWrapper = field.closest('fieldset');\n            fieldWrapper.insertAdjacentHTML('beforeend', errorMsgTemplate);\n          } else {\n            //other form fields, error msgs are inserted right after the element               \n            field.parentElement.insertAdjacentHTML('beforeend', errorMsgTemplate);\n          }\n        }\n        //add aria-describedby\n        if (this.checkIfAriaDescribedby(field)) {\n          //if there was already aria-describedby attribute, just add the saved value, plus the error\n          field.setAttribute('aria-describedby', field.dataset.validaAriaDescribed + ' ' + valMsgId);\n        } else {\n          //if not add just error one\n          field.setAttribute('aria-describedby', valMsgId);\n        }\n      } else {\n        throw new Error(\"There is no data-validA attribute set for \".concat(field.name, \" for validation type \").concat(validation));\n      }\n    }\n  }, {\n    key: \"checkIfAriaDescribedby\",\n    value: function checkIfAriaDescribedby(elem) {\n      if (elem.dataset.validaAriaDescribed) {\n        return true;\n      } else {\n        return false;\n      }\n    }\n    //remove error msg\n  }, {\n    key: \"removeErrorMessage\",\n    value: function removeErrorMessage(elem) {\n      //set aria-invalid to false\n      elem.setAttribute('aria-invalid', false);\n      //all datasets in the element\n      var elemErrorMsg = elem.getAttribute('aria-describedby');\n      //if there are aria-describedby msg\n      if (elemErrorMsg) {\n        //split in white space the aria-describedby attribute\n        var ariaMsgGroup = elemErrorMsg.split(' ');\n        //loop throught all datasets\n        var _iterator2 = _createForOfIteratorHelper(ariaMsgGroup),\n          _step2;\n        try {\n          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n            var errorId = _step2.value;\n            //if the element which is refered exists\n            //check if that element has the error field class, then erase it\n            if (this.formElem.querySelector('#' + errorId) && this.formElem.querySelector('#' + errorId).classList.contains(this.formFieldError)) {\n              this.formElem.querySelector('#' + errorId).parentElement.removeChild(this.formElem.querySelector('#' + errorId));\n              //remove aria-describedby\n              elem.removeAttribute('aria-describedby');\n              //but if there was a helping text put it back\n              if (this.checkIfAriaDescribedby(elem)) {\n                elem.setAttribute('aria-describedby', elem.dataset.validaAriaDescribed);\n              }\n            }\n          }\n          //remove attribute aria-describedby from element\n        } catch (err) {\n          _iterator2.e(err);\n        } finally {\n          _iterator2.f();\n        }\n        elem.removeAttribute('aria-describedby');\n        //in case form field has a help text\n        //it is checked if it had one and then restore it\n        if (this.checkIfAriaDescribedby(elem)) {\n          elem.setAttribute('aria-describedby', elem.dataset.validaAriaDescribed);\n        }\n      }\n    }\n    //add data to element with aria-describedby\n  }, {\n    key: \"backUpHelpText\",\n    value: function backUpHelpText(elem) {\n      if (!this.checkIfAriaDescribedby(elem)) {\n        if (!elem.dataset.validaAriaDescribed && elem.getAttribute('aria-describedby') && !elem.hasAttribute('data-valida-event-added')) {\n          elem.dataset.validaAriaDescribed = elem.getAttribute('aria-describedby');\n        }\n      }\n    }\n    //shows and hide banner checking for a valid form\n  }, {\n    key: \"isValidForm\",\n    value: function isValidForm() {\n      //if there are field with aria-invalid, error banner must be shown\n      if (this.formElem.querySelectorAll('[aria-invalid=\"true\"]').length > 0) {\n        this.formElem.querySelector('.' + this.formBannerClass).removeAttribute('hidden');\n        this.formElem.querySelector('.' + this.formBannerClass).focus();\n        return false;\n      } else {\n        this.formElem.querySelector('.' + this.formBannerClass).setAttribute('hidden', true);\n        return true;\n      }\n    }\n    //check if the element with data-valida-target has the same value than its target\n  }, {\n    key: \"validaTargetDoubleValueCheck\",\n    value: function validaTargetDoubleValueCheck(elemToValidate, elemValue, targetValue) {\n      if (elemValue !== targetValue) {\n        this.showErrorMsg(elemToValidate, 'target');\n        return true;\n      } else {\n        return false;\n      }\n    }\n    //validates each form input\n  }, {\n    key: \"validateInput\",\n    value: function validateInput(elemToValidate) {\n      var validationStatus = elemToValidate.validity;\n      this.backUpHelpText(elemToValidate);\n      this.removeErrorMessage(elemToValidate);\n      //checks if the element is visible\n      if (this.isVisibleElem(elemToValidate)) {\n        if (!validationStatus.valid) {\n          for (var validProp in validationStatus) {\n            if (validationStatus[validProp]) {\n              switch (validProp) {\n                case \"valueMissing\":\n                case \"badInput\":\n                  //if both validations takes place, bad Input should be shown\n                  //since datetime local and time inputs when they are not fullfilled \n                  //the error is both but they are partially filled\n                  if (elemToValidate.validity.valueMissing && elemToValidate.validity.badInput) {\n                    this.showErrorMsg(elemToValidate, 'badinput');\n                  } else {\n                    //Required Only validation\n                    if (elemToValidate.validity.valueMissing) {\n                      this.showErrorMsg(elemToValidate, 'required');\n                    } else {\n                      //Bad Input Only validation\n                      this.showErrorMsg(elemToValidate, 'badinput');\n                    }\n                  }\n                  break;\n                case \"typeMismatch\":\n                  this.showErrorMsg(elemToValidate, 'typemismatch');\n                  break;\n                case \"tooShort\":\n                  this.showErrorMsg(elemToValidate, 'minlength');\n                  break;\n                case \"tooLong\":\n                  //in some browsers ui it does not trigger since the characters amount is cut\n                  this.showErrorMsg(elemToValidate, 'maxlength');\n                  break;\n                case \"stepMismatch\":\n                  this.showErrorMsg(elemToValidate, 'stepmismatch');\n                  break;\n                case \"rangeUnderflow\":\n                  this.showErrorMsg(elemToValidate, 'min');\n                  break;\n                case \"rangeOverflow\":\n                  this.showErrorMsg(elemToValidate, 'max');\n                  break;\n                case \"patternMismatch\":\n                  this.showErrorMsg(elemToValidate, 'patternmismatch');\n                  break;\n                default:\n                  break;\n              }\n            }\n          }\n        } else {\n          //First common validation\n          //Built in Validations and Custom Validation               \n          for (var dataKey in elemToValidate.dataset) {\n            switch (dataKey) {\n              //Custom Validation\n              case 'validaVfunc':\n                var validFunct = elemToValidate.dataset.validaVfunc;\n                if (window[validFunct](elemToValidate.value)) {\n                  this.showErrorMsg(elemToValidate, validFunct);\n                }\n                break;\n              //Two identical values\n              case 'validaTarget':\n                this.validaTargetDoubleValueCheck(elemToValidate, elemToValidate.value, document.querySelector('#' + elemToValidate.dataset.validaTarget).value);\n              default:\n                break;\n            }\n          }\n        }\n        //adding events to each input field\n        this.eventGiver(elemToValidate);\n      }\n    }\n  }, {\n    key: \"styleInjector\",\n    value: function styleInjector() {\n      var styleTag = document.createElement('style');\n      styleTag.dataset.validStyle = \"true\";\n      var styleContent = \".\".concat(this.loadingWrapper, \" { display: flex;\\n            position: fixed;\\n            top: 0;\\n            left: 0;\\n            right: 0;\\n            bottom: 0;\\n            flex-direction: column;\\n            justify-content: center;\\n            align-items: center;\\n            background: rgba(0,0,0,0.3 );}\");\n      styleTag.append(styleContent);\n      document.head.append(styleTag);\n    }\n    //hide backdrop\n  }, {\n    key: \"hideBckDrop\",\n    value: function hideBckDrop() {\n      document.querySelector('.' + this.loadingWrapper).parentElement.removeChild(document.querySelector('.' + this.loadingWrapper));\n    }\n    //show backdrop\n  }, {\n    key: \"showBckDrop\",\n    value: function showBckDrop() {\n      //backdrop wrapper\n      var template = document.createElement('div');\n      //loading img\n      var loadImg = document.createElement('img');\n      //img wrapper\n      var imgWrapper = document.createElement('figure');\n      //loading text wrapper\n      var loadingText = document.createElement('p');\n      //setting img url\n      loadImg.setAttribute('src', this.loadingImg);\n      //adding the class selected to the user to the template as CSS reference\n      template.classList.add(this.loadingWrapper);\n      //appending img to img wrapper\n      imgWrapper.append(loadImg);\n      //adding text to text wrapper\n      loadingText.append(this.formMsgs[document.documentElement.lang]['sending']);\n      //setting tabIndex, \n      loadingText.setAttribute('tabIndex', '-1');\n      if (!this.isLoadingTextVisible) {\n        loadingText.style = \"clip: rect(0 0 0 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;\";\n      }\n      //inserting img and text to the template\n      template.append(imgWrapper, loadingText);\n      //checks if there is no a style tag with data valid style in place, if it will be inserted\n      if (!this.formElem.querySelector('[data-valid-style=\"true\"]')) {\n        this.styleInjector();\n      }\n      //including template to the body element\n      document.body.append(template);\n      //focus text\n      document.querySelector('.' + this.loadingWrapper + ' [tabIndex=\"-1\"]').focus();\n    }\n    //final msg\n  }, {\n    key: \"showFinalMsg\",\n    value: function showFinalMsg(msg) {\n      this.formElem.setAttribute('hidden', true);\n      document.querySelector('#' + msg).removeAttribute('hidden');\n      //focus title or sentence to show final msg\n      document.querySelector('#' + msg + ' [tabIndex=\"-1\"]');\n    }\n    //sending form\n  }, {\n    key: \"sendingForm\",\n    value: function sendingForm(formElem) {\n      var _this3 = this;\n      var formToSend = new FormData(formElem);\n      this.showBckDrop();\n      fetch(this.url, {\n        method: 'POST',\n        // or 'PUT'\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(formToSend)\n      }).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        console.log('Success:', data);\n        _this3.hideBckDrop();\n        _this3.formElem.reset();\n        _this3.showFinalMsg(_this3.success);\n      })[\"catch\"](function (error) {\n        _this3.hideBckDrop();\n        _this3.showFinalMsg(_this3.error);\n        console.error('Error:', error);\n      });\n    }\n    //Starts the validation Process\n  }]);\n  return ValidAccess;\n}();\nfunction _validateForm2(e) {\n  var _this4 = this;\n  if (!!e.currentTarget) {\n    e.preventDefault();\n    this.formChildrenInput = this.formElem.querySelectorAll('input[type=\"tel\"], input[type=\"text\"], input[type=\"number\"], input[type=\"email\"], input[type=\"time\"],input[type=\"date\"], input[type=\"datetime-local\"], input[type=\"date\"], input[type=\"url\"], input[type=\"password\"], input[type=\"radio\"], input[type=\"checkbox\"], input[type=\"color\"], select, textarea');\n    this.formChildrenInput.forEach(function (inputElem) {\n      _this4.validateInput(inputElem);\n    });\n    if (this.isValidForm()) {\n      //checks if it is an multistep\n      if (!this.isMultistep) {\n        this.sendingForm(this.formElem);\n      } else {\n        //multistep process\n      }\n    }\n  } else {\n    throw new Error('The form you are trying to set up is not present in the DOM');\n  }\n}\n\n//# sourceURL=webpack://AAOG/./src/js/validAccess.js?");

/***/ }),

/***/ "./node_modules/photoswipe/dist/photoswipe.css":
/*!*****************************************************!*\
  !*** ./node_modules/photoswipe/dist/photoswipe.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://AAOG/./node_modules/photoswipe/dist/photoswipe.css?");

/***/ }),

/***/ "./src/styles/contact.css":
/*!********************************!*\
  !*** ./src/styles/contact.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://AAOG/./src/styles/contact.css?");

/***/ }),

/***/ "./src/styles/print.css":
/*!******************************!*\
  !*** ./src/styles/print.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://AAOG/./src/styles/print.css?");

/***/ }),

/***/ "./src/styles/product.css":
/*!********************************!*\
  !*** ./src/styles/product.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://AAOG/./src/styles/product.css?");

/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://AAOG/./src/styles/styles.css?");

/***/ }),

/***/ "./src/imagenes sync recursive \\.(png%7Cjpg%7Cjpeg%7Csvg)$":
/*!********************************************************!*\
  !*** ./src/imagenes/ sync \.(png%7Cjpg%7Cjpeg%7Csvg)$ ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./android-chrome-192x192.png\": \"./src/imagenes/android-chrome-192x192.png\",\n\t\"./android-chrome-512x512.png\": \"./src/imagenes/android-chrome-512x512.png\",\n\t\"./apple-touch-icon.png\": \"./src/imagenes/apple-touch-icon.png\",\n\t\"./ar.svg\": \"./src/imagenes/ar.svg\",\n\t\"./conferenciasobrepistoladebelgrano.jpg\": \"./src/imagenes/conferenciasobrepistoladebelgrano.jpg\",\n\t\"./divideravancarga.svg\": \"./src/imagenes/divideravancarga.svg\",\n\t\"./error.jpg\": \"./src/imagenes/error.jpg\",\n\t\"./favicon-16x16.png\": \"./src/imagenes/favicon-16x16.png\",\n\t\"./favicon-32x32.png\": \"./src/imagenes/favicon-32x32.png\",\n\t\"./fondoanos.svg\": \"./src/imagenes/fondoanos.svg\",\n\t\"./fotodellibrosobrelapistoladebelgrano.jpeg\": \"./src/imagenes/fotodellibrosobrelapistoladebelgrano.jpeg\",\n\t\"./fotoreplicadepistoladebelgrano.jpg\": \"./src/imagenes/fotoreplicadepistoladebelgrano.jpg\",\n\t\"./fotosdeosvaldoymartin.jpeg\": \"./src/imagenes/fotosdeosvaldoymartin.jpeg\",\n\t\"./galeria/Workshop1.jpg\": \"./src/imagenes/galeria/Workshop1.jpg\",\n\t\"./galeria/Workshop10.jpg\": \"./src/imagenes/galeria/Workshop10.jpg\",\n\t\"./galeria/Workshop11.jpg\": \"./src/imagenes/galeria/Workshop11.jpg\",\n\t\"./galeria/Workshop12.jpg\": \"./src/imagenes/galeria/Workshop12.jpg\",\n\t\"./galeria/Workshop13.jpg\": \"./src/imagenes/galeria/Workshop13.jpg\",\n\t\"./galeria/Workshop14.jpg\": \"./src/imagenes/galeria/Workshop14.jpg\",\n\t\"./galeria/Workshop16.jpg\": \"./src/imagenes/galeria/Workshop16.jpg\",\n\t\"./galeria/Workshop17.jpg\": \"./src/imagenes/galeria/Workshop17.jpg\",\n\t\"./galeria/Workshop18.jpg\": \"./src/imagenes/galeria/Workshop18.jpg\",\n\t\"./galeria/Workshop19.jpg\": \"./src/imagenes/galeria/Workshop19.jpg\",\n\t\"./galeria/Workshop2.jpg\": \"./src/imagenes/galeria/Workshop2.jpg\",\n\t\"./galeria/Workshop20.jpg\": \"./src/imagenes/galeria/Workshop20.jpg\",\n\t\"./galeria/Workshop21.jpg\": \"./src/imagenes/galeria/Workshop21.jpg\",\n\t\"./galeria/Workshop22.jpg\": \"./src/imagenes/galeria/Workshop22.jpg\",\n\t\"./galeria/Workshop23.jpg\": \"./src/imagenes/galeria/Workshop23.jpg\",\n\t\"./galeria/Workshop24.jpg\": \"./src/imagenes/galeria/Workshop24.jpg\",\n\t\"./galeria/Workshop25.jpg\": \"./src/imagenes/galeria/Workshop25.jpg\",\n\t\"./galeria/Workshop26.jpg\": \"./src/imagenes/galeria/Workshop26.jpg\",\n\t\"./galeria/Workshop29.jpg\": \"./src/imagenes/galeria/Workshop29.jpg\",\n\t\"./galeria/Workshop3.jpg\": \"./src/imagenes/galeria/Workshop3.jpg\",\n\t\"./galeria/Workshop30.jpg\": \"./src/imagenes/galeria/Workshop30.jpg\",\n\t\"./galeria/Workshop31.jpg\": \"./src/imagenes/galeria/Workshop31.jpg\",\n\t\"./galeria/Workshop32.jpg\": \"./src/imagenes/galeria/Workshop32.jpg\",\n\t\"./galeria/Workshop33.jpg\": \"./src/imagenes/galeria/Workshop33.jpg\",\n\t\"./galeria/Workshop34.jpg\": \"./src/imagenes/galeria/Workshop34.jpg\",\n\t\"./galeria/Workshop35.jpg\": \"./src/imagenes/galeria/Workshop35.jpg\",\n\t\"./galeria/Workshop37.jpg\": \"./src/imagenes/galeria/Workshop37.jpg\",\n\t\"./galeria/Workshop4.jpg\": \"./src/imagenes/galeria/Workshop4.jpg\",\n\t\"./galeria/Workshop5.jpg\": \"./src/imagenes/galeria/Workshop5.jpg\",\n\t\"./galeria/Workshop6.jpg\": \"./src/imagenes/galeria/Workshop6.jpg\",\n\t\"./galeria/Workshop7.jpg\": \"./src/imagenes/galeria/Workshop7.jpg\",\n\t\"./galeria/Workshop8.jpg\": \"./src/imagenes/galeria/Workshop8.jpg\",\n\t\"./galeria/Workshop9.jpg\": \"./src/imagenes/galeria/Workshop9.jpg\",\n\t\"./galeria/middle/Workshop1.jpg\": \"./src/imagenes/galeria/middle/Workshop1.jpg\",\n\t\"./galeria/middle/Workshop10.jpg\": \"./src/imagenes/galeria/middle/Workshop10.jpg\",\n\t\"./galeria/middle/Workshop11.jpg\": \"./src/imagenes/galeria/middle/Workshop11.jpg\",\n\t\"./galeria/middle/Workshop12.jpg\": \"./src/imagenes/galeria/middle/Workshop12.jpg\",\n\t\"./galeria/middle/Workshop13.jpg\": \"./src/imagenes/galeria/middle/Workshop13.jpg\",\n\t\"./galeria/middle/Workshop14.jpg\": \"./src/imagenes/galeria/middle/Workshop14.jpg\",\n\t\"./galeria/middle/Workshop16.jpg\": \"./src/imagenes/galeria/middle/Workshop16.jpg\",\n\t\"./galeria/middle/Workshop17.jpg\": \"./src/imagenes/galeria/middle/Workshop17.jpg\",\n\t\"./galeria/middle/Workshop18.jpg\": \"./src/imagenes/galeria/middle/Workshop18.jpg\",\n\t\"./galeria/middle/Workshop19.jpg\": \"./src/imagenes/galeria/middle/Workshop19.jpg\",\n\t\"./galeria/middle/Workshop2.jpg\": \"./src/imagenes/galeria/middle/Workshop2.jpg\",\n\t\"./galeria/middle/Workshop20.jpg\": \"./src/imagenes/galeria/middle/Workshop20.jpg\",\n\t\"./galeria/middle/Workshop21.jpg\": \"./src/imagenes/galeria/middle/Workshop21.jpg\",\n\t\"./galeria/middle/Workshop22.jpg\": \"./src/imagenes/galeria/middle/Workshop22.jpg\",\n\t\"./galeria/middle/Workshop23.jpg\": \"./src/imagenes/galeria/middle/Workshop23.jpg\",\n\t\"./galeria/middle/Workshop24.jpg\": \"./src/imagenes/galeria/middle/Workshop24.jpg\",\n\t\"./galeria/middle/Workshop25.jpg\": \"./src/imagenes/galeria/middle/Workshop25.jpg\",\n\t\"./galeria/middle/Workshop26.jpg\": \"./src/imagenes/galeria/middle/Workshop26.jpg\",\n\t\"./galeria/middle/Workshop29.jpg\": \"./src/imagenes/galeria/middle/Workshop29.jpg\",\n\t\"./galeria/middle/Workshop3.jpg\": \"./src/imagenes/galeria/middle/Workshop3.jpg\",\n\t\"./galeria/middle/Workshop30.jpg\": \"./src/imagenes/galeria/middle/Workshop30.jpg\",\n\t\"./galeria/middle/Workshop31.jpg\": \"./src/imagenes/galeria/middle/Workshop31.jpg\",\n\t\"./galeria/middle/Workshop32.jpg\": \"./src/imagenes/galeria/middle/Workshop32.jpg\",\n\t\"./galeria/middle/Workshop33.jpg\": \"./src/imagenes/galeria/middle/Workshop33.jpg\",\n\t\"./galeria/middle/Workshop34.jpg\": \"./src/imagenes/galeria/middle/Workshop34.jpg\",\n\t\"./galeria/middle/Workshop35.jpg\": \"./src/imagenes/galeria/middle/Workshop35.jpg\",\n\t\"./galeria/middle/Workshop37.jpg\": \"./src/imagenes/galeria/middle/Workshop37.jpg\",\n\t\"./galeria/middle/Workshop4.jpg\": \"./src/imagenes/galeria/middle/Workshop4.jpg\",\n\t\"./galeria/middle/Workshop5.jpg\": \"./src/imagenes/galeria/middle/Workshop5.jpg\",\n\t\"./galeria/middle/Workshop6.jpg\": \"./src/imagenes/galeria/middle/Workshop6.jpg\",\n\t\"./galeria/middle/Workshop7.jpg\": \"./src/imagenes/galeria/middle/Workshop7.jpg\",\n\t\"./galeria/middle/Workshop8.jpg\": \"./src/imagenes/galeria/middle/Workshop8.jpg\",\n\t\"./galeria/middle/Workshop9.jpg\": \"./src/imagenes/galeria/middle/Workshop9.jpg\",\n\t\"./galeria/thumbnails/Workshop1.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop1.jpg\",\n\t\"./galeria/thumbnails/Workshop10.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop10.jpg\",\n\t\"./galeria/thumbnails/Workshop11.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop11.jpg\",\n\t\"./galeria/thumbnails/Workshop12.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop12.jpg\",\n\t\"./galeria/thumbnails/Workshop13.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop13.jpg\",\n\t\"./galeria/thumbnails/Workshop14.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop14.jpg\",\n\t\"./galeria/thumbnails/Workshop16.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop16.jpg\",\n\t\"./galeria/thumbnails/Workshop17.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop17.jpg\",\n\t\"./galeria/thumbnails/Workshop18.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop18.jpg\",\n\t\"./galeria/thumbnails/Workshop19.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop19.jpg\",\n\t\"./galeria/thumbnails/Workshop2.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop2.jpg\",\n\t\"./galeria/thumbnails/Workshop20.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop20.jpg\",\n\t\"./galeria/thumbnails/Workshop21.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop21.jpg\",\n\t\"./galeria/thumbnails/Workshop22.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop22.jpg\",\n\t\"./galeria/thumbnails/Workshop23.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop23.jpg\",\n\t\"./galeria/thumbnails/Workshop24.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop24.jpg\",\n\t\"./galeria/thumbnails/Workshop25.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop25.jpg\",\n\t\"./galeria/thumbnails/Workshop26.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop26.jpg\",\n\t\"./galeria/thumbnails/Workshop29.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop29.jpg\",\n\t\"./galeria/thumbnails/Workshop3.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop3.jpg\",\n\t\"./galeria/thumbnails/Workshop30.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop30.jpg\",\n\t\"./galeria/thumbnails/Workshop31.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop31.jpg\",\n\t\"./galeria/thumbnails/Workshop32.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop32.jpg\",\n\t\"./galeria/thumbnails/Workshop33.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop33.jpg\",\n\t\"./galeria/thumbnails/Workshop34.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop34.jpg\",\n\t\"./galeria/thumbnails/Workshop35.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop35.jpg\",\n\t\"./galeria/thumbnails/Workshop37.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop37.jpg\",\n\t\"./galeria/thumbnails/Workshop4.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop4.jpg\",\n\t\"./galeria/thumbnails/Workshop5.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop5.jpg\",\n\t\"./galeria/thumbnails/Workshop6.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop6.jpg\",\n\t\"./galeria/thumbnails/Workshop7.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop7.jpg\",\n\t\"./galeria/thumbnails/Workshop8.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop8.jpg\",\n\t\"./galeria/thumbnails/Workshop9.jpg\": \"./src/imagenes/galeria/thumbnails/Workshop9.jpg\",\n\t\"./logoarmasantiguasosvaldogatto.jpg\": \"./src/imagenes/logoarmasantiguasosvaldogatto.jpg\",\n\t\"./logoarmasantiguasosvaldogatto.svg\": \"./src/imagenes/logoarmasantiguasosvaldogatto.svg\",\n\t\"./mstile-150x150.png\": \"./src/imagenes/mstile-150x150.png\",\n\t\"./perfilosvaldo.jpg\": \"./src/imagenes/perfilosvaldo.jpg\",\n\t\"./pistoladerueda.jpg\": \"./src/imagenes/pistoladerueda.jpg\",\n\t\"./productos/accesorios/ac001_imagen.jpg\": \"./src/imagenes/productos/accesorios/ac001_imagen.jpg\",\n\t\"./productos/accesorios/ac001_imagen001.jpg\": \"./src/imagenes/productos/accesorios/ac001_imagen001.jpg\",\n\t\"./productos/accesorios/ac001_imagen002.jpg\": \"./src/imagenes/productos/accesorios/ac001_imagen002.jpg\",\n\t\"./productos/accesorios/dosificador1-removebg.png\": \"./src/imagenes/productos/accesorios/dosificador1-removebg.png\",\n\t\"./productos/accesorios/dosificador1.jpg\": \"./src/imagenes/productos/accesorios/dosificador1.jpg\",\n\t\"./productos/accesorios/dosificador2-removebg-preview.png\": \"./src/imagenes/productos/accesorios/dosificador2-removebg-preview.png\",\n\t\"./productos/accesorios/dosificador2.jpg\": \"./src/imagenes/productos/accesorios/dosificador2.jpg\",\n\t\"./productos/accesorios/dosificador3-removebg-preview.png\": \"./src/imagenes/productos/accesorios/dosificador3-removebg-preview.png\",\n\t\"./productos/accesorios/dosificador3.jpg\": \"./src/imagenes/productos/accesorios/dosificador3.jpg\",\n\t\"./productos/accesorios/martillo.jpg\": \"./src/imagenes/productos/accesorios/martillo.jpg\",\n\t\"./productos/accesorios/martillo1.jpg\": \"./src/imagenes/productos/accesorios/martillo1.jpg\",\n\t\"./productos/accesorios/martillo2.jpg\": \"./src/imagenes/productos/accesorios/martillo2.jpg\",\n\t\"./productos/accesorios/molde-removebg.png\": \"./src/imagenes/productos/accesorios/molde-removebg.png\",\n\t\"./productos/accesorios/molde.jpg\": \"./src/imagenes/productos/accesorios/molde.jpg\",\n\t\"./productos/accesorios/molde2-removebg-preview.png\": \"./src/imagenes/productos/accesorios/molde2-removebg-preview.png\",\n\t\"./productos/accesorios/molde2.jpg\": \"./src/imagenes/productos/accesorios/molde2.jpg\",\n\t\"./productos/accesorios/molde3.jpg\": \"./src/imagenes/productos/accesorios/molde3.jpg\",\n\t\"./productos/accesorios/molde4.jpg\": \"./src/imagenes/productos/accesorios/molde4.jpg\",\n\t\"./productos/accesorios/opticareticula.jpg\": \"./src/imagenes/productos/accesorios/opticareticula.jpg\",\n\t\"./productos/accesorios/opticareticula2.jpg\": \"./src/imagenes/productos/accesorios/opticareticula2.jpg\",\n\t\"./productos/accesorios/opticareticula3.jpg\": \"./src/imagenes/productos/accesorios/opticareticula3.jpg\",\n\t\"./productos/accesorios/opticareticula4.jpg\": \"./src/imagenes/productos/accesorios/opticareticula4.jpg\",\n\t\"./productos/accesorios/opticareticula5.jpg\": \"./src/imagenes/productos/accesorios/opticareticula5.jpg\",\n\t\"./productos/accesorios/opticareticula6.jpg\": \"./src/imagenes/productos/accesorios/opticareticula6.jpg\",\n\t\"./productos/accesorios/polvorera.jpg\": \"./src/imagenes/productos/accesorios/polvorera.jpg\",\n\t\"./productos/accesorios/polvorera1.jpg\": \"./src/imagenes/productos/accesorios/polvorera1.jpg\",\n\t\"./productos/accesorios/polvorera2.jpg\": \"./src/imagenes/productos/accesorios/polvorera2.jpg\",\n\t\"./productos/canones/canon63/cn008_imagen.jpg\": \"./src/imagenes/productos/canones/canon63/cn008_imagen.jpg\",\n\t\"./productos/canones/canon63/cn008_imagen001.jpg\": \"./src/imagenes/productos/canones/canon63/cn008_imagen001.jpg\",\n\t\"./productos/canones/canon63/cn008_imagen002.jpg\": \"./src/imagenes/productos/canones/canon63/cn008_imagen002.jpg\",\n\t\"./productos/canones/canon63/cn008_imagen003.jpg\": \"./src/imagenes/productos/canones/canon63/cn008_imagen003.jpg\",\n\t\"./productos/canones/canon63/cn008_imagen004.jpg\": \"./src/imagenes/productos/canones/canon63/cn008_imagen004.jpg\",\n\t\"./productos/canones/canon63/cn008_imagen005.jpg\": \"./src/imagenes/productos/canones/canon63/cn008_imagen005.jpg\",\n\t\"./productos/canones/canones.jpg\": \"./src/imagenes/productos/canones/canones.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn0900.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn0900.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn091.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn091.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn0910.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn0910.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn0911.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn0911.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn093.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn093.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn095.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn095.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn096.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn096.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn097.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn097.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn098.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn098.jpg\",\n\t\"./productos/canones/canonnapoleonico/cn099.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico/cn099.jpg\",\n\t\"./productos/canones/canonnapoleonico21mm/cn011_imagen.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen.jpg\",\n\t\"./productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg\",\n\t\"./productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg\": \"./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_540.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_540.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_541.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_541.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_542.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_542.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_543.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_543.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_544.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_544.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_545.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_545.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_546.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_546.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_547.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_547.jpg\",\n\t\"./productos/canones/canonnavalcal54/car_548.jpg\": \"./src/imagenes/productos/canones/canonnavalcal54/car_548.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg\",\n\t\"./productos/canones/canonnavaldeavisovictory/victory esc.jpg\": \"./src/imagenes/productos/canones/canonnavaldeavisovictory/victory esc.jpg\",\n\t\"./productos/canones/canonnavalespanol1810/cn005_imagen.jpg\": \"./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen.jpg\",\n\t\"./productos/canones/canonnavalespanol1810/cn005_imagen001.jpg\": \"./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen001.jpg\",\n\t\"./productos/canones/canonnavalespanol1810/cn005_imagen002.jpg\": \"./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen002.jpg\",\n\t\"./productos/canones/canonvictoryacero/cn006_imagen007.jpg\": \"./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen007.jpg\",\n\t\"./productos/canones/canonvictoryacero/cn006_imagen008.jpg\": \"./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen008.jpg\",\n\t\"./productos/canones/canonvictoryacero/steel1.jpg\": \"./src/imagenes/productos/canones/canonvictoryacero/steel1.jpg\",\n\t\"./productos/canones/culebrina/cu001_imagen.jpg\": \"./src/imagenes/productos/canones/culebrina/cu001_imagen.jpg\",\n\t\"./productos/canones/culebrina/cu001_imagen001.jpg\": \"./src/imagenes/productos/canones/culebrina/cu001_imagen001.jpg\",\n\t\"./productos/canones/mo002_imagen002.jpg\": \"./src/imagenes/productos/canones/mo002_imagen002.jpg\",\n\t\"./productos/canones/morterodecampana/mo001_imagen.jpg\": \"./src/imagenes/productos/canones/morterodecampana/mo001_imagen.jpg\",\n\t\"./productos/canones/morterodecampana/mo001_imagen001.jpg\": \"./src/imagenes/productos/canones/morterodecampana/mo001_imagen001.jpg\",\n\t\"./productos/canones/morteroingleslondon/mo002_imagen.jpg\": \"./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen.jpg\",\n\t\"./productos/canones/morteroingleslondon/mo002_imagen001.jpg\": \"./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen001.jpg\",\n\t\"./productos/canones/morteroingleslondon/mo002_imagen002.jpg\": \"./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen002.jpg\",\n\t\"./productos/canones/morteroingleslondon/mo002_imagen003.jpg\": \"./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen003.jpg\",\n\t\"./productos/canones/morterointermedioespanol/mo003_imagen.jpg\": \"./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen.jpg\",\n\t\"./productos/canones/morterointermedioespanol/mo003_imagen001.jpg\": \"./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen001.jpg\",\n\t\"./productos/canones/morterointermedioespanol/mo003_imagen002.jpg\": \"./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen002.jpg\",\n\t\"./productos/canones/morterointermedioespanol/mo003_imagen003.jpg\": \"./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen003.jpg\",\n\t\"./productos/militaria/V_lf2_01.jpg\": \"./src/imagenes/productos/militaria/V_lf2_01.jpg\",\n\t\"./productos/pistolasyfusiles/Bbess1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/Bbess1.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg\",\n\t\"./productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg\": \"./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg\",\n\t\"./productos/pistolasyfusiles/fusilcharleville/charleville00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville00.jpg\",\n\t\"./productos/pistolasyfusiles/fusilcharleville/charleville1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville1.jpg\",\n\t\"./productos/pistolasyfusiles/fusilcharleville/charleville2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville2.jpg\",\n\t\"./productos/pistolasyfusiles/fusilcharleville/charleville3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville3.jpg\",\n\t\"./productos/pistolasyfusiles/fusilcharleville/charleville4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville4.jpg\",\n\t\"./productos/pistolasyfusiles/fusilcharleville/charleville5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville5.jpg\",\n\t\"./productos/pistolasyfusiles/fusilcharleville/charleville6.jpg\": \"./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville6.jpg\",\n\t\"./productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg\": \"./src/imagenes/productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg\",\n\t\"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg\",\n\t\"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg\",\n\t\"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg\",\n\t\"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg\",\n\t\"./productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaaston/aston1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston1.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaaston/aston2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaaston/aston3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston3.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaaston/aston4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston4.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaaston/aston5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston5.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaaston/aston6.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston6.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/barnett00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/barnett01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett01.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/barnett02.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett02.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/barnett03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/barnett04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett04.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/barnett05.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett05.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/barnett06.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett06.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg\",\n\t\"./productos/pistolasyfusiles/pistolabelgrano.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolabelgrano.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg\",\n\t\"./productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg\",\n\t\"./productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg\",\n\t\"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg\",\n\t\"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg\",\n\t\"./productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg\",\n\t\"./productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg\",\n\t\"./productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg\",\n\t\"./productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg\",\n\t\"./productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg\",\n\t\"./productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg\",\n\t\"./productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalorenz/pp016.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg\",\n\t\"./productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkins/perkins011.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins011.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkins/perkins03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkins/perkins06.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins06.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkins/perkins11.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins11.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20141.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20141.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20142.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20142.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20143.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20143.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20147.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20147.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20181.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20181.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20182.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20182.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20183.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20183.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20185.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20185.jpg\",\n\t\"./productos/pistolasyfusiles/pistolarueda/rueda20186.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20186.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg\",\n\t\"./productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg\",\n\t\"./productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg\": \"./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/bbess1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/bbess1.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess01.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess02.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess02.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess03.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess04.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess06.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess06.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess07.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess07.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess08.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess08.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess09.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess09.jpg\",\n\t\"./productos/pistolasyfusiles/riflebbess/brownbess10.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess10.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg\",\n\t\"./productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg\",\n\t\"./productos/pistolasyfusiles/riflekentucky/frontier1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflekentucky/frontier1.jpg\",\n\t\"./productos/pistolasyfusiles/riflekentucky/kentR1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR1.jpg\",\n\t\"./productos/pistolasyfusiles/riflekentucky/kentR2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR2.jpg\",\n\t\"./productos/pistolasyfusiles/riflekentucky/kentR3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR3.jpg\",\n\t\"./productos/pistolasyfusiles/riflekentucky/kentR4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR4.jpg\",\n\t\"./productos/pistolasyfusiles/riflekentucky/kentR5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR5.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg\",\n\t\"./productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg\": \"./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg\",\n\t\"./productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg\": \"./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg\",\n\t\"./productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg\": \"./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg\",\n\t\"./productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg\": \"./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg\",\n\t\"./productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg\": \"./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg\",\n\t\"./productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg\": \"./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg\",\n\t\"./received.jpg\": \"./src/imagenes/received.jpg\",\n\t\"./recibido.jpg\": \"./src/imagenes/recibido.jpg\",\n\t\"./restauraciones/restauraciones02.jpg\": \"./src/imagenes/restauraciones/restauraciones02.jpg\",\n\t\"./restauraciones/restauraciones03.jpg\": \"./src/imagenes/restauraciones/restauraciones03.jpg\",\n\t\"./restauraciones/restauraciones04.jpg\": \"./src/imagenes/restauraciones/restauraciones04.jpg\",\n\t\"./restauraciones/restauraciones05.jpg\": \"./src/imagenes/restauraciones/restauraciones05.jpg\",\n\t\"./restauraciones/restauraciones06.jpg\": \"./src/imagenes/restauraciones/restauraciones06.jpg\",\n\t\"./restauraciones/thumbnails/restauraciones02.png\": \"./src/imagenes/restauraciones/thumbnails/restauraciones02.png\",\n\t\"./restauraciones/thumbnails/restauraciones03.png\": \"./src/imagenes/restauraciones/thumbnails/restauraciones03.png\",\n\t\"./restauraciones/thumbnails/restauraciones04.png\": \"./src/imagenes/restauraciones/thumbnails/restauraciones04.png\",\n\t\"./restauraciones/thumbnails/restauraciones05.png\": \"./src/imagenes/restauraciones/thumbnails/restauraciones05.png\",\n\t\"./restauraciones/thumbnails/restauraciones06.png\": \"./src/imagenes/restauraciones/thumbnails/restauraciones06.png\",\n\t\"./riflesypistolas.jpg\": \"./src/imagenes/riflesypistolas.jpg\",\n\t\"./safari-pinned-tab.svg\": \"./src/imagenes/safari-pinned-tab.svg\",\n\t\"./us.svg\": \"./src/imagenes/us.svg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/imagenes sync recursive \\\\.(png%7Cjpg%7Cjpeg%7Csvg)$\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/_sync_\\.(png%257Cjpg%257Cjpeg%257Csvg)$?");

/***/ }),

/***/ "./src/imagenes/android-chrome-192x192.png":
/*!*************************************************!*\
  !*** ./src/imagenes/android-chrome-192x192.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/android-chrome-192x192.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/android-chrome-192x192.png?");

/***/ }),

/***/ "./src/imagenes/android-chrome-512x512.png":
/*!*************************************************!*\
  !*** ./src/imagenes/android-chrome-512x512.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/android-chrome-512x512.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/android-chrome-512x512.png?");

/***/ }),

/***/ "./src/imagenes/apple-touch-icon.png":
/*!*******************************************!*\
  !*** ./src/imagenes/apple-touch-icon.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/apple-touch-icon.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/apple-touch-icon.png?");

/***/ }),

/***/ "./src/imagenes/ar.svg":
/*!*****************************!*\
  !*** ./src/imagenes/ar.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/ar.svg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/ar.svg?");

/***/ }),

/***/ "./src/imagenes/conferenciasobrepistoladebelgrano.jpg":
/*!************************************************************!*\
  !*** ./src/imagenes/conferenciasobrepistoladebelgrano.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/conferenciasobrepistoladebelgrano.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/conferenciasobrepistoladebelgrano.jpg?");

/***/ }),

/***/ "./src/imagenes/divideravancarga.svg":
/*!*******************************************!*\
  !*** ./src/imagenes/divideravancarga.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/divideravancarga.svg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/divideravancarga.svg?");

/***/ }),

/***/ "./src/imagenes/error.jpg":
/*!********************************!*\
  !*** ./src/imagenes/error.jpg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/error.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/error.jpg?");

/***/ }),

/***/ "./src/imagenes/favicon-16x16.png":
/*!****************************************!*\
  !*** ./src/imagenes/favicon-16x16.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/favicon-16x16.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/favicon-16x16.png?");

/***/ }),

/***/ "./src/imagenes/favicon-32x32.png":
/*!****************************************!*\
  !*** ./src/imagenes/favicon-32x32.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/favicon-32x32.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/favicon-32x32.png?");

/***/ }),

/***/ "./src/imagenes/fondoanos.svg":
/*!************************************!*\
  !*** ./src/imagenes/fondoanos.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/fondoanos.svg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/fondoanos.svg?");

/***/ }),

/***/ "./src/imagenes/fotodellibrosobrelapistoladebelgrano.jpeg":
/*!****************************************************************!*\
  !*** ./src/imagenes/fotodellibrosobrelapistoladebelgrano.jpeg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/fotodellibrosobrelapistoladebelgrano.jpeg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/fotodellibrosobrelapistoladebelgrano.jpeg?");

/***/ }),

/***/ "./src/imagenes/fotoreplicadepistoladebelgrano.jpg":
/*!*********************************************************!*\
  !*** ./src/imagenes/fotoreplicadepistoladebelgrano.jpg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/fotoreplicadepistoladebelgrano.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/fotoreplicadepistoladebelgrano.jpg?");

/***/ }),

/***/ "./src/imagenes/fotosdeosvaldoymartin.jpeg":
/*!*************************************************!*\
  !*** ./src/imagenes/fotosdeosvaldoymartin.jpeg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/fotosdeosvaldoymartin.jpeg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/fotosdeosvaldoymartin.jpeg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop1.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop1.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop1.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop10.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop10.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop10.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop10.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop11.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop11.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop11.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop11.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop12.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop12.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop12.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop12.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop13.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop13.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop13.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop13.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop14.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop14.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop14.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop14.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop16.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop16.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop16.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop16.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop17.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop17.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop17.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop17.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop18.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop18.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop18.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop18.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop19.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop19.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop19.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop19.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop2.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop2.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop2.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop20.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop20.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop20.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop20.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop21.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop21.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop21.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop21.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop22.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop22.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop22.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop22.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop23.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop23.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop23.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop23.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop24.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop24.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop24.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop24.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop25.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop25.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop25.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop25.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop26.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop26.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop26.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop26.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop29.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop29.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop29.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop29.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop3.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop3.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop3.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop30.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop30.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop30.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop30.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop31.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop31.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop31.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop31.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop32.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop32.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop32.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop32.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop33.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop33.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop33.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop33.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop34.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop34.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop34.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop34.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop35.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop35.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop35.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop35.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop37.jpg":
/*!*********************************************!*\
  !*** ./src/imagenes/galeria/Workshop37.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop37.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop37.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop4.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop4.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop4.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop5.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop5.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop5.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop6.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop6.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop6.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop7.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop7.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop7.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop7.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop8.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop8.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop8.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop8.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/Workshop9.jpg":
/*!********************************************!*\
  !*** ./src/imagenes/galeria/Workshop9.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/Workshop9.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/Workshop9.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop1.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop1.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop1.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop10.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop10.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop10.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop10.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop11.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop11.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop11.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop11.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop12.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop12.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop12.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop12.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop13.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop13.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop13.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop13.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop14.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop14.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop14.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop14.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop16.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop16.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop16.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop16.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop17.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop17.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop17.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop17.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop18.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop18.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop18.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop18.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop19.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop19.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop19.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop19.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop2.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop2.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop2.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop20.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop20.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop20.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop20.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop21.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop21.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop21.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop21.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop22.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop22.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop22.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop22.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop23.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop23.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop23.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop23.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop24.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop24.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop24.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop24.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop25.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop25.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop25.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop25.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop26.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop26.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop26.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop26.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop29.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop29.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop29.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop29.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop3.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop3.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop3.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop30.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop30.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop30.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop30.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop31.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop31.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop31.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop31.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop32.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop32.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop32.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop32.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop33.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop33.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop33.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop33.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop34.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop34.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop34.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop34.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop35.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop35.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop35.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop35.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop37.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop37.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop37.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop37.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop4.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop4.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop4.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop5.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop5.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop5.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop6.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop6.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop6.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop7.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop7.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop7.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop7.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop8.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop8.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop8.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop8.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/middle/Workshop9.jpg":
/*!***************************************************!*\
  !*** ./src/imagenes/galeria/middle/Workshop9.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/middle/Workshop9.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/middle/Workshop9.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop1.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop1.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop1.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop10.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop10.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop10.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop10.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop11.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop11.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop11.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop11.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop12.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop12.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop12.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop12.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop13.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop13.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop13.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop13.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop14.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop14.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop14.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop14.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop16.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop16.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop16.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop16.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop17.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop17.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop17.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop17.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop18.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop18.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop18.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop18.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop19.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop19.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop19.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop19.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop2.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop2.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop2.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop20.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop20.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop20.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop20.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop21.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop21.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop21.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop21.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop22.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop22.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop22.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop22.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop23.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop23.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop23.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop23.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop24.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop24.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop24.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop24.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop25.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop25.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop25.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop25.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop26.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop26.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop26.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop26.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop29.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop29.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop29.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop29.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop3.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop3.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop3.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop30.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop30.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop30.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop30.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop31.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop31.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop31.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop31.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop32.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop32.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop32.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop32.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop33.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop33.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop33.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop33.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop34.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop34.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop34.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop34.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop35.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop35.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop35.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop35.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop37.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop37.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop37.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop37.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop4.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop4.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop4.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop5.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop5.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop5.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop6.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop6.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop6.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop7.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop7.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop7.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop7.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop8.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop8.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop8.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop8.jpg?");

/***/ }),

/***/ "./src/imagenes/galeria/thumbnails/Workshop9.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/galeria/thumbnails/Workshop9.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/galeria/thumbnails/Workshop9.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/galeria/thumbnails/Workshop9.jpg?");

/***/ }),

/***/ "./src/imagenes/loadingsmall.gif":
/*!***************************************!*\
  !*** ./src/imagenes/loadingsmall.gif ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/loadingsmall.gif\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/loadingsmall.gif?");

/***/ }),

/***/ "./src/imagenes/logoarmasantiguasosvaldogatto.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/logoarmasantiguasosvaldogatto.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/logoarmasantiguasosvaldogatto.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/logoarmasantiguasosvaldogatto.jpg?");

/***/ }),

/***/ "./src/imagenes/logoarmasantiguasosvaldogatto.svg":
/*!********************************************************!*\
  !*** ./src/imagenes/logoarmasantiguasosvaldogatto.svg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/logoarmasantiguasosvaldogatto.svg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/logoarmasantiguasosvaldogatto.svg?");

/***/ }),

/***/ "./src/imagenes/mstile-150x150.png":
/*!*****************************************!*\
  !*** ./src/imagenes/mstile-150x150.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/mstile-150x150.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/mstile-150x150.png?");

/***/ }),

/***/ "./src/imagenes/perfilosvaldo.jpg":
/*!****************************************!*\
  !*** ./src/imagenes/perfilosvaldo.jpg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/perfilosvaldo.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/perfilosvaldo.jpg?");

/***/ }),

/***/ "./src/imagenes/pistoladerueda.jpg":
/*!*****************************************!*\
  !*** ./src/imagenes/pistoladerueda.jpg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/pistoladerueda.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/pistoladerueda.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/ac001_imagen.jpg":
/*!************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/ac001_imagen.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/ac001_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/ac001_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/ac001_imagen001.jpg":
/*!***************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/ac001_imagen001.jpg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/ac001_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/ac001_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/ac001_imagen002.jpg":
/*!***************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/ac001_imagen002.jpg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/ac001_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/ac001_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/dosificador1-removebg.png":
/*!*********************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/dosificador1-removebg.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/dosificador1-removebg.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/dosificador1-removebg.png?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/dosificador1.jpg":
/*!************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/dosificador1.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/dosificador1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/dosificador1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/dosificador2-removebg-preview.png":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/dosificador2-removebg-preview.png ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/dosificador2-removebg-preview.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/dosificador2-removebg-preview.png?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/dosificador2.jpg":
/*!************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/dosificador2.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/dosificador2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/dosificador2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/dosificador3-removebg-preview.png":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/dosificador3-removebg-preview.png ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/dosificador3-removebg-preview.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/dosificador3-removebg-preview.png?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/dosificador3.jpg":
/*!************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/dosificador3.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/dosificador3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/dosificador3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/martillo.jpg":
/*!********************************************************!*\
  !*** ./src/imagenes/productos/accesorios/martillo.jpg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/martillo.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/martillo.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/martillo1.jpg":
/*!*********************************************************!*\
  !*** ./src/imagenes/productos/accesorios/martillo1.jpg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/martillo1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/martillo1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/martillo2.jpg":
/*!*********************************************************!*\
  !*** ./src/imagenes/productos/accesorios/martillo2.jpg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/martillo2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/martillo2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/molde-removebg.png":
/*!**************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/molde-removebg.png ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/molde-removebg.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/molde-removebg.png?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/molde.jpg":
/*!*****************************************************!*\
  !*** ./src/imagenes/productos/accesorios/molde.jpg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/molde.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/molde.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/molde2-removebg-preview.png":
/*!***********************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/molde2-removebg-preview.png ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/molde2-removebg-preview.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/molde2-removebg-preview.png?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/molde2.jpg":
/*!******************************************************!*\
  !*** ./src/imagenes/productos/accesorios/molde2.jpg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/molde2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/molde2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/molde3.jpg":
/*!******************************************************!*\
  !*** ./src/imagenes/productos/accesorios/molde3.jpg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/molde3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/molde3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/molde4.jpg":
/*!******************************************************!*\
  !*** ./src/imagenes/productos/accesorios/molde4.jpg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/molde4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/molde4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/opticareticula.jpg":
/*!**************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/opticareticula.jpg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/opticareticula.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/opticareticula.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/opticareticula2.jpg":
/*!***************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/opticareticula2.jpg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/opticareticula2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/opticareticula2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/opticareticula3.jpg":
/*!***************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/opticareticula3.jpg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/opticareticula3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/opticareticula3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/opticareticula4.jpg":
/*!***************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/opticareticula4.jpg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/opticareticula4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/opticareticula4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/opticareticula5.jpg":
/*!***************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/opticareticula5.jpg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/opticareticula5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/opticareticula5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/opticareticula6.jpg":
/*!***************************************************************!*\
  !*** ./src/imagenes/productos/accesorios/opticareticula6.jpg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/opticareticula6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/opticareticula6.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/polvorera.jpg":
/*!*********************************************************!*\
  !*** ./src/imagenes/productos/accesorios/polvorera.jpg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/polvorera.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/polvorera.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/polvorera1.jpg":
/*!**********************************************************!*\
  !*** ./src/imagenes/productos/accesorios/polvorera1.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/polvorera1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/polvorera1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/accesorios/polvorera2.jpg":
/*!**********************************************************!*\
  !*** ./src/imagenes/productos/accesorios/polvorera2.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/accesorios/polvorera2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/accesorios/polvorera2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canon63/cn008_imagen.jpg":
/*!*****************************************************************!*\
  !*** ./src/imagenes/productos/canones/canon63/cn008_imagen.jpg ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canon63/cn008_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canon63/cn008_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canon63/cn008_imagen001.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canon63/cn008_imagen001.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canon63/cn008_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canon63/cn008_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canon63/cn008_imagen002.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canon63/cn008_imagen002.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canon63/cn008_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canon63/cn008_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canon63/cn008_imagen003.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canon63/cn008_imagen003.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canon63/cn008_imagen003.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canon63/cn008_imagen003.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canon63/cn008_imagen004.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canon63/cn008_imagen004.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canon63/cn008_imagen004.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canon63/cn008_imagen004.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canon63/cn008_imagen005.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canon63/cn008_imagen005.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canon63/cn008_imagen005.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canon63/cn008_imagen005.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canones.jpg":
/*!****************************************************!*\
  !*** ./src/imagenes/productos/canones/canones.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canones.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canones.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico21mm/cn011_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn0900.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn0900.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn0900.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn0900.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn091.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn091.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn091.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn091.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn0910.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn0910.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn0910.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn0910.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn0911.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn0911.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn0911.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn0911.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn093.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn093.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn093.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn093.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn095.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn095.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn095.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn095.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn096.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn096.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn096.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn096.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn097.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn097.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn097.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn097.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn098.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn098.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn098.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn098.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnapoleonico/cn099.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnapoleonico/cn099.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnapoleonico/cn099.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnapoleonico/cn099.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_540.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_540.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_540.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_540.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_541.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_541.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_541.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_541.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_542.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_542.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_542.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_542.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_543.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_543.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_543.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_543.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_544.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_544.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_544.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_544.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_545.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_545.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_545.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_545.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_546.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_546.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_546.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_546.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_547.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_547.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_547.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_547.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalcal54/car_548.jpg":
/*!********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalcal54/car_548.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalcal54/car_548.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalcal54/car_548.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen003.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen004.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen005.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen006.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/cn006_imagen008.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavaldeavisovictory/victory esc.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavaldeavisovictory/victory esc.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavaldeavisovictory/victory esc.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavaldeavisovictory/victory_esc.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen001.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen001.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen002.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen002.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonnavalespanol1810/cn005_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen007.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen007.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonvictoryacero/cn006_imagen007.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen007.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen008.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen008.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonvictoryacero/cn006_imagen008.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonvictoryacero/cn006_imagen008.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/canonvictoryacero/steel1.jpg":
/*!*********************************************************************!*\
  !*** ./src/imagenes/productos/canones/canonvictoryacero/steel1.jpg ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/canonvictoryacero/steel1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/canonvictoryacero/steel1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/culebrina/cu001_imagen.jpg":
/*!*******************************************************************!*\
  !*** ./src/imagenes/productos/canones/culebrina/cu001_imagen.jpg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/culebrina/cu001_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/culebrina/cu001_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/culebrina/cu001_imagen001.jpg":
/*!**********************************************************************!*\
  !*** ./src/imagenes/productos/canones/culebrina/cu001_imagen001.jpg ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/culebrina/cu001_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/culebrina/cu001_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/mo002_imagen002.jpg":
/*!************************************************************!*\
  !*** ./src/imagenes/productos/canones/mo002_imagen002.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/mo002_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/mo002_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morterodecampana/mo001_imagen.jpg":
/*!**************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morterodecampana/mo001_imagen.jpg ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morterodecampana/mo001_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morterodecampana/mo001_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morterodecampana/mo001_imagen001.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morterodecampana/mo001_imagen001.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morterodecampana/mo001_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morterodecampana/mo001_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morteroingleslondon/mo002_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen001.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen001.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morteroingleslondon/mo002_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen002.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen002.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morteroingleslondon/mo002_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen003.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen003.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morteroingleslondon/mo002_imagen003.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morteroingleslondon/mo002_imagen003.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen001.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen001.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen001.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen001.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen002.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen002.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen003.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen003.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen003.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/canones/morterointermedioespanol/mo003_imagen003.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/militaria/V_lf2_01.jpg":
/*!*******************************************************!*\
  !*** ./src/imagenes/productos/militaria/V_lf2_01.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/militaria/V_lf2_01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/militaria/V_lf2_01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/Bbess1.jpg":
/*!************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/Bbess1.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/Bbess1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/Bbess1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg":
/*!*****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto6.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto8.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/escopetaunderhammer/escopetagatto9.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville00.jpg":
/*!************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville00.jpg ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville1.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville1.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville2.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville2.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville3.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville3.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville4.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville4.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville5.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville5.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville6.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville6.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/fusilcharleville/charleville6.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/mosquetemecha/al003_imagen002.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/mosquetemecha/mosqu_mecha5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston1.jpg":
/*!*************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston1.jpg ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaaston/aston1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston2.jpg":
/*!*************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston2.jpg ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaaston/aston2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston3.jpg":
/*!*************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston3.jpg ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaaston/aston3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston4.jpg":
/*!*************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston4.jpg ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaaston/aston4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston5.jpg":
/*!*************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston5.jpg ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaaston/aston5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston6.jpg":
/*!*************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston6.jpg ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaaston/aston6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaaston/aston6.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaaustriaca/pp005_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141859.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_141952.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142116.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142248.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/IMG_20201224_142420.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett00.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett00.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett01.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett01.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett02.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett02.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett02.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett03.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett03.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett04.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett04.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett05.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett05.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett05.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett05.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett06.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett06.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/barnett06.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg":
/*!************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabarnett/pp002_imagen006.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolabelgrano.jpg":
/*!*********************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolabelgrano.jpg ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolabelgrano.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolabelgrano.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano12.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano13.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano14.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano15.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano16.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano17.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano18.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano35.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano36.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano37.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano6.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano7.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/belgrano8.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg":
/*!***************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistoladebelgrano/pistolabelgrano.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolademecha/pm_mecha_det4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg":
/*!************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/bajoharper.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/canonharper.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg":
/*!***************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/detalle_harpe3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg":
/*!***************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaharpersferry/pc004n_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg":
/*!********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Kumamoto00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/Tanzutsu6.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg":
/*!***************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/certificadodearma.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg":
/*!***************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/mlaiccertificado2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg":
/*!*****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsucompitiendo.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolajaponesa/tanzutsumundial.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolakentucky/kent_ch5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg":
/*!*******************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolakentuckypercusion/pp001_imagen.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg":
/*!*****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg":
/*!*****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutier/lepagechispa03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg":
/*!***********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias81.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg":
/*!***********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias82.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg":
/*!***********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagemoutieroctogonal/12estrias83.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage07.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage08.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage09.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg":
/*!*************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalepagepercusion/lepage10.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg":
/*!**********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_02.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalightdragon/dragoon_04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016.jpg":
/*!*************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016.jpg ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg":
/*!***************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg":
/*!***************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg":
/*!***************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolalorenz/pp016_4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins011.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins011.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins011.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins011.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins03.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins03.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins06.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins06.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins06.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins11.jpg":
/*!******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins11.jpg ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins11.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkins/perkins11.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg":
/*!************************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg":
/*!************************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg":
/*!************************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion02.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg":
/*!************************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg":
/*!************************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg":
/*!************************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion05.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg":
/*!************************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaperkinspercusion/perkinspercusion06.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/pistoladerueda.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg":
/*!*********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/platinaderueda.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20141.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20141.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20141.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20141.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20142.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20142.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20142.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20142.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20143.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20143.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20143.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20143.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20147.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20147.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20147.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20147.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20181.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20181.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20181.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20181.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20182.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20182.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20182.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20182.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20183.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20183.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20183.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20183.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20185.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20185.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20185.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20185.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20186.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20186.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20186.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolarueda/rueda20186.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg":
/*!************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg":
/*!************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice10.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice6.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice7.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice8.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg":
/*!***********************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolaseaservice/seaservice9.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola02.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola05.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola06.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola07.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola08.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucobritanica/trabucopistola09.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc02.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc05.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg":
/*!****************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/pistolatrabucopercusion/trabperc06.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/bbess1.jpg":
/*!***********************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/bbess1.jpg ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/bbess1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/bbess1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess01.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess01.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess02.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess02.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess02.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess03.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess03.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess04.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess04.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess06.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess06.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess06.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess07.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess07.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess07.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess07.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess08.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess08.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess08.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess08.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess09.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess09.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess09.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess09.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess10.jpg":
/*!****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess10.jpg ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess10.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebbess/brownbess10.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110107.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110204.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110239.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110334.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110412.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110453.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110554.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110646.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg":
/*!**************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflebigbore/img_20190411_110900.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflekentucky/frontier1.jpg":
/*!*****************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflekentucky/frontier1.jpg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflekentucky/frontier1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflekentucky/frontier1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR1.jpg":
/*!**************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR1.jpg ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR2.jpg":
/*!**************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR2.jpg ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR3.jpg":
/*!**************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR3.jpg ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR4.jpg":
/*!**************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR4.jpg ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR5.jpg":
/*!**************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR5.jpg ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/riflekentucky/kentR5.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer00.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer01.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer02.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer03.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer04.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer05.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer06.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer07.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg":
/*!**********************************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/rifleunderhammergoldenboy/runderhammer08.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch1.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch2.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch3.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch4.jpg?");

/***/ }),

/***/ "./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg":
/*!*******************************************************************************!*\
  !*** ./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/productos/pistolasyfusiles/trabuconaranjero/trab_ch5.jpg?");

/***/ }),

/***/ "./src/imagenes/received.jpg":
/*!***********************************!*\
  !*** ./src/imagenes/received.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/received.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/received.jpg?");

/***/ }),

/***/ "./src/imagenes/recibido.jpg":
/*!***********************************!*\
  !*** ./src/imagenes/recibido.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/recibido.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/recibido.jpg?");

/***/ }),

/***/ "./src/imagenes/restauraciones/restauraciones02.jpg":
/*!**********************************************************!*\
  !*** ./src/imagenes/restauraciones/restauraciones02.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/restauraciones02.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/restauraciones02.jpg?");

/***/ }),

/***/ "./src/imagenes/restauraciones/restauraciones03.jpg":
/*!**********************************************************!*\
  !*** ./src/imagenes/restauraciones/restauraciones03.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/restauraciones03.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/restauraciones03.jpg?");

/***/ }),

/***/ "./src/imagenes/restauraciones/restauraciones04.jpg":
/*!**********************************************************!*\
  !*** ./src/imagenes/restauraciones/restauraciones04.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/restauraciones04.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/restauraciones04.jpg?");

/***/ }),

/***/ "./src/imagenes/restauraciones/restauraciones05.jpg":
/*!**********************************************************!*\
  !*** ./src/imagenes/restauraciones/restauraciones05.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/restauraciones05.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/restauraciones05.jpg?");

/***/ }),

/***/ "./src/imagenes/restauraciones/restauraciones06.jpg":
/*!**********************************************************!*\
  !*** ./src/imagenes/restauraciones/restauraciones06.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/restauraciones06.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/restauraciones06.jpg?");

/***/ }),

/***/ "./src/imagenes/restauraciones/thumbnails/restauraciones02.png":
/*!*********************************************************************!*\
  !*** ./src/imagenes/restauraciones/thumbnails/restauraciones02.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/thumbnails/restauraciones02.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/thumbnails/restauraciones02.png?");

/***/ }),

/***/ "./src/imagenes/restauraciones/thumbnails/restauraciones03.png":
/*!*********************************************************************!*\
  !*** ./src/imagenes/restauraciones/thumbnails/restauraciones03.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/thumbnails/restauraciones03.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/thumbnails/restauraciones03.png?");

/***/ }),

/***/ "./src/imagenes/restauraciones/thumbnails/restauraciones04.png":
/*!*********************************************************************!*\
  !*** ./src/imagenes/restauraciones/thumbnails/restauraciones04.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/thumbnails/restauraciones04.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/thumbnails/restauraciones04.png?");

/***/ }),

/***/ "./src/imagenes/restauraciones/thumbnails/restauraciones05.png":
/*!*********************************************************************!*\
  !*** ./src/imagenes/restauraciones/thumbnails/restauraciones05.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/thumbnails/restauraciones05.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/thumbnails/restauraciones05.png?");

/***/ }),

/***/ "./src/imagenes/restauraciones/thumbnails/restauraciones06.png":
/*!*********************************************************************!*\
  !*** ./src/imagenes/restauraciones/thumbnails/restauraciones06.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/restauraciones/thumbnails/restauraciones06.png\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/restauraciones/thumbnails/restauraciones06.png?");

/***/ }),

/***/ "./src/imagenes/riflesypistolas.jpg":
/*!******************************************!*\
  !*** ./src/imagenes/riflesypistolas.jpg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/riflesypistolas.jpg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/riflesypistolas.jpg?");

/***/ }),

/***/ "./src/imagenes/safari-pinned-tab.svg":
/*!********************************************!*\
  !*** ./src/imagenes/safari-pinned-tab.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/safari-pinned-tab.svg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/safari-pinned-tab.svg?");

/***/ }),

/***/ "./src/imagenes/us.svg":
/*!*****************************!*\
  !*** ./src/imagenes/us.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"src/imagenes/us.svg\";\n\n//# sourceURL=webpack://AAOG/./src/imagenes/us.svg?");

/***/ }),

/***/ "./node_modules/photoswipe/dist/photoswipe-lightbox.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/photoswipe/dist/photoswipe-lightbox.esm.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PhotoSwipeLightbox)\n/* harmony export */ });\n/*!\n  * PhotoSwipe Lightbox 5.3.4 - https://photoswipe.com\n  * (c) 2022 Dmytro Semenov\n  */\n/** @typedef {import('../photoswipe.js').Point} Point */\n\n/** @typedef {undefined | null | false | '' | 0} Falsy */\n/** @typedef {keyof HTMLElementTagNameMap} HTMLElementTagName */\n\n/**\r\n * @template {HTMLElementTagName | Falsy} [T=\"div\"]\r\n * @template {Node | undefined} [NodeToAppendElementTo=undefined]\r\n * @param {string=} className\r\n * @param {T=} [tagName]\r\n * @param {NodeToAppendElementTo=} appendToEl\r\n * @returns {T extends HTMLElementTagName ? HTMLElementTagNameMap[T] : HTMLElementTagNameMap['div']}\r\n */\nfunction createElement(className, tagName, appendToEl) {\n  const el = document.createElement(tagName || 'div');\n  if (className) {\n    el.className = className;\n  }\n  if (appendToEl) {\n    appendToEl.appendChild(el);\n  }\n  // @ts-expect-error\n  return el;\n}\n\n/**\r\n * Get transform string\r\n *\r\n * @param {number} x\r\n * @param {number=} y\r\n * @param {number=} scale\r\n */\nfunction toTransformString(x, y, scale) {\n  let propValue = 'translate3d(' + x + 'px,' + (y || 0) + 'px' + ',0)';\n  if (scale !== undefined) {\n    propValue += ' scale3d(' + scale + ',' + scale + ',1)';\n  }\n  return propValue;\n}\n\n/**\r\n * Apply width and height CSS properties to element\r\n *\r\n * @param {HTMLElement} el\r\n * @param {string | number} w\r\n * @param {string | number} h\r\n */\nfunction setWidthHeight(el, w, h) {\n  el.style.width = typeof w === 'number' ? w + 'px' : w;\n  el.style.height = typeof h === 'number' ? h + 'px' : h;\n}\n\n/** @typedef {LOAD_STATE[keyof LOAD_STATE]} LoadState */\n/** @type {{ IDLE: 'idle'; LOADING: 'loading'; LOADED: 'loaded'; ERROR: 'error' }} */\nconst LOAD_STATE = {\n  IDLE: 'idle',\n  LOADING: 'loading',\n  LOADED: 'loaded',\n  ERROR: 'error'\n};\n\n/**\r\n * Check if click or keydown event was dispatched\r\n * with a special key or via mouse wheel.\r\n *\r\n * @param {MouseEvent | KeyboardEvent} e\r\n */\nfunction specialKeyUsed(e) {\n  if (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {\n    return true;\n  }\n}\n\n/**\r\n * Parse `gallery` or `children` options.\r\n *\r\n * @param {import('../photoswipe.js').ElementProvider} option\r\n * @param {string=} legacySelector\r\n * @param {HTMLElement | Document} [parent]\r\n * @returns HTMLElement[]\r\n */\nfunction getElementsFromOption(option, legacySelector, parent = document) {\n  /** @type {HTMLElement[]} */\n  let elements = [];\n  if (option instanceof Element) {\n    elements = [option];\n  } else if (option instanceof NodeList || Array.isArray(option)) {\n    elements = Array.from(option);\n  } else {\n    const selector = typeof option === 'string' ? option : legacySelector;\n    if (selector) {\n      elements = Array.from(parent.querySelectorAll(selector));\n    }\n  }\n  return elements;\n}\n\n/**\r\n * Check if variable is PhotoSwipe class\r\n *\r\n * @param {any} fn\r\n */\nfunction isPswpClass(fn) {\n  return typeof fn === 'function' && fn.prototype && fn.prototype.goTo;\n}\n\n/**\r\n * Check if browser is Safari\r\n *\r\n * @returns {boolean}\r\n */\nfunction isSafari() {\n  return !!(navigator.vendor && navigator.vendor.match(/apple/i));\n}\n\n/** @typedef {import('../lightbox/lightbox.js').default} PhotoSwipeLightbox */\n/** @typedef {import('../photoswipe.js').default} PhotoSwipe */\n/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */\n/** @typedef {import('../photoswipe.js').DataSource} DataSource */\n/** @typedef {import('../ui/ui-element.js').UIElementData} UIElementData */\n/** @typedef {import('../slide/content.js').default} ContentDefault */\n/** @typedef {import('../slide/slide.js').default} Slide */\n/** @typedef {import('../slide/slide.js').SlideData} SlideData */\n/** @typedef {import('../slide/zoom-level.js').default} ZoomLevel */\n/** @typedef {import('../slide/get-thumb-bounds.js').Bounds} Bounds */\n\n/**\r\n * Allow adding an arbitrary props to the Content\r\n * https://photoswipe.com/custom-content/#using-webp-image-format\r\n * @typedef {ContentDefault & Record<string, any>} Content\r\n */\n/** @typedef {{ x?: number; y?: number }} Point */\n\n/**\r\n * @typedef {Object} PhotoSwipeEventsMap https://photoswipe.com/events/\r\n *\r\n *\r\n * https://photoswipe.com/adding-ui-elements/\r\n *\r\n * @prop {undefined} uiRegister\r\n * @prop {{ data: UIElementData }} uiElementCreate\r\n *\r\n *\r\n * https://photoswipe.com/events/#initialization-events\r\n *\r\n * @prop {undefined} beforeOpen\r\n * @prop {undefined} firstUpdate\r\n * @prop {undefined} initialLayout\r\n * @prop {undefined} change\r\n * @prop {undefined} afterInit\r\n * @prop {undefined} bindEvents\r\n *\r\n *\r\n * https://photoswipe.com/events/#opening-or-closing-transition-events\r\n *\r\n * @prop {undefined} openingAnimationStart\r\n * @prop {undefined} openingAnimationEnd\r\n * @prop {undefined} closingAnimationStart\r\n * @prop {undefined} closingAnimationEnd\r\n *\r\n *\r\n * https://photoswipe.com/events/#closing-events\r\n *\r\n * @prop {undefined} close\r\n * @prop {undefined} destroy\r\n *\r\n *\r\n * https://photoswipe.com/events/#pointer-and-gesture-events\r\n *\r\n * @prop {{ originalEvent: PointerEvent }} pointerDown\r\n * @prop {{ originalEvent: PointerEvent }} pointerMove\r\n * @prop {{ originalEvent: PointerEvent }} pointerUp\r\n * @prop {{ bgOpacity: number }} pinchClose can be default prevented\r\n * @prop {{ panY: number }} verticalDrag can be default prevented\r\n *\r\n *\r\n * https://photoswipe.com/events/#slide-content-events\r\n *\r\n * @prop {{ content: Content }} contentInit\r\n * @prop {{ content: Content; isLazy: boolean }} contentLoad can be default prevented\r\n * @prop {{ content: Content; isLazy: boolean }} contentLoadImage can be default prevented\r\n * @prop {{ content: Content; slide: Slide; isError?: boolean }} loadComplete\r\n * @prop {{ content: Content; slide: Slide }} loadError\r\n * @prop {{ content: Content; width: number; height: number }} contentResize can be default prevented\r\n * @prop {{ content: Content; width: number; height: number; slide: Slide }} imageSizeChange\r\n * @prop {{ content: Content }} contentLazyLoad can be default prevented\r\n * @prop {{ content: Content }} contentAppend can be default prevented\r\n * @prop {{ content: Content }} contentActivate can be default prevented\r\n * @prop {{ content: Content }} contentDeactivate can be default prevented\r\n * @prop {{ content: Content }} contentRemove can be default prevented\r\n * @prop {{ content: Content }} contentDestroy can be default prevented\r\n *\r\n *\r\n * undocumented\r\n *\r\n * @prop {{ point: Point; originalEvent: PointerEvent }} imageClickAction can be default prevented\r\n * @prop {{ point: Point; originalEvent: PointerEvent }} bgClickAction can be default prevented\r\n * @prop {{ point: Point; originalEvent: PointerEvent }} tapAction can be default prevented\r\n * @prop {{ point: Point; originalEvent: PointerEvent }} doubleTapAction can be default prevented\r\n *\r\n * @prop {{ originalEvent: KeyboardEvent }} keydown can be default prevented\r\n * @prop {{ x: number; dragging: boolean }} moveMainScroll\r\n * @prop {{ slide: Slide }} firstZoomPan\r\n * @prop {{ slide: Slide, data: SlideData, index: number }} gettingData\r\n * @prop {undefined} beforeResize\r\n * @prop {undefined} resize\r\n * @prop {undefined} viewportSize\r\n * @prop {undefined} updateScrollOffset\r\n * @prop {{ slide: Slide }} slideInit\r\n * @prop {{ slide: Slide }} afterSetContent\r\n * @prop {{ slide: Slide }} slideLoad\r\n * @prop {{ slide: Slide }} appendHeavy can be default prevented\r\n * @prop {{ slide: Slide }} appendHeavyContent\r\n * @prop {{ slide: Slide }} slideActivate\r\n * @prop {{ slide: Slide }} slideDeactivate\r\n * @prop {{ slide: Slide }} slideDestroy\r\n * @prop {{ destZoomLevel: number, centerPoint: Point, transitionDuration: number | false }} beforeZoomTo\r\n * @prop {{ slide: Slide }} zoomPanUpdate\r\n * @prop {{ slide: Slide }} initialZoomPan\r\n * @prop {{ slide: Slide }} calcSlideSize\r\n * @prop {undefined} resolutionChanged\r\n * @prop {{ originalEvent: WheelEvent }} wheel can be default prevented\r\n * @prop {{ content: Content }} contentAppendImage can be default prevented\r\n * @prop {{ index: number; itemData: SlideData }} lazyLoadSlide can be default prevented\r\n * @prop {undefined} lazyLoad\r\n * @prop {{ slide: Slide }} calcBounds\r\n * @prop {{ zoomLevels: ZoomLevel, slideData: SlideData }} zoomLevelsUpdate\r\n *\r\n *\r\n * legacy\r\n *\r\n * @prop {undefined} init\r\n * @prop {undefined} initialZoomIn\r\n * @prop {undefined} initialZoomOut\r\n * @prop {undefined} initialZoomInEnd\r\n * @prop {undefined} initialZoomOutEnd\r\n * @prop {{ dataSource: DataSource, numItems: number }} numItems\r\n * @prop {{ itemData: SlideData; index: number }} itemData\r\n * @prop {{ index: number, itemData: SlideData, instance: PhotoSwipe }} thumbBounds\r\n */\n\n/**\r\n * @typedef {Object} PhotoSwipeFiltersMap https://photoswipe.com/filters/\r\n *\r\n * @prop {(numItems: number, dataSource: DataSource) => number} numItems\r\n * Modify the total amount of slides. Example on Data sources page.\r\n * https://photoswipe.com/filters/#numitems\r\n *\r\n * @prop {(itemData: SlideData, index: number) => SlideData} itemData\r\n * Modify slide item data. Example on Data sources page.\r\n * https://photoswipe.com/filters/#itemdata\r\n *\r\n * @prop {(itemData: SlideData, element: HTMLElement, linkEl: HTMLAnchorElement) => SlideData} domItemData\r\n * Modify item data when it's parsed from DOM element. Example on Data sources page.\r\n * https://photoswipe.com/filters/#domitemdata\r\n *\r\n * @prop {(clickedIndex: number, e: MouseEvent, instance: PhotoSwipeLightbox) => number} clickedIndex\r\n * Modify clicked gallery item index.\r\n * https://photoswipe.com/filters/#clickedindex\r\n *\r\n * @prop {(placeholderSrc: string | false, content: Content) => string | false} placeholderSrc\r\n * Modify placeholder image source.\r\n * https://photoswipe.com/filters/#placeholdersrc\r\n *\r\n * @prop {(isContentLoading: boolean, content: Content) => boolean} isContentLoading\r\n * Modify if the content is currently loading.\r\n * https://photoswipe.com/filters/#iscontentloading\r\n *\r\n * @prop {(isContentZoomable: boolean, content: Content) => boolean} isContentZoomable\r\n * Modify if the content can be zoomed.\r\n * https://photoswipe.com/filters/#iscontentzoomable\r\n *\r\n * @prop {(useContentPlaceholder: boolean, content: Content) => boolean} useContentPlaceholder\r\n * Modify if the placeholder should be used for the content.\r\n * https://photoswipe.com/filters/#usecontentplaceholder\r\n *\r\n * @prop {(isKeepingPlaceholder: boolean, content: Content) => boolean} isKeepingPlaceholder\r\n * Modify if the placeholder should be kept after the content is loaded.\r\n * https://photoswipe.com/filters/#iskeepingplaceholder\r\n *\r\n *\r\n * @prop {(contentErrorElement: HTMLElement, content: Content) => HTMLElement} contentErrorElement\r\n * Modify an element when the content has error state (for example, if image cannot be loaded).\r\n * https://photoswipe.com/filters/#contenterrorelement\r\n *\r\n * @prop {(element: HTMLElement, data: UIElementData) => HTMLElement} uiElement\r\n * Modify a UI element that's being created.\r\n * https://photoswipe.com/filters/#uielement\r\n *\r\n * @prop {(thumbnail: HTMLElement, itemData: SlideData, index: number) => HTMLElement} thumbEl\r\n * Modify the thubmnail element from which opening zoom animation starts or ends.\r\n * https://photoswipe.com/filters/#thumbel\r\n *\r\n * @prop {(thumbBounds: Bounds, itemData: SlideData, index: number) => Bounds} thumbBounds\r\n * Modify the thubmnail bounds from which opening zoom animation starts or ends.\r\n * https://photoswipe.com/filters/#thumbbounds\r\n *\r\n * @prop {(srcsetSizesWidth: number, content: Content) => number} srcsetSizesWidth\r\n *\r\n */\n\n/**\r\n * @template {keyof PhotoSwipeFiltersMap} T\r\n * @typedef {{ fn: PhotoSwipeFiltersMap[T], priority: number }} Filter<T>\r\n */\n\n/**\r\n * @template {keyof PhotoSwipeEventsMap} T\r\n * @typedef {PhotoSwipeEventsMap[T] extends undefined ? PhotoSwipeEvent<T> : PhotoSwipeEvent<T> & PhotoSwipeEventsMap[T]} AugmentedEvent\r\n */\n\n/**\r\n * @template {keyof PhotoSwipeEventsMap} T\r\n * @typedef {(event: AugmentedEvent<T>) => void} EventCallback<T>\r\n */\n\n/**\r\n * Base PhotoSwipe event object\r\n *\r\n * @template {keyof PhotoSwipeEventsMap} T\r\n */\nclass PhotoSwipeEvent {\n  /**\r\n   * @param {T} type\r\n   * @param {PhotoSwipeEventsMap[T]} [details]\r\n   */\n  constructor(type, details) {\n    this.type = type;\n    if (details) {\n      Object.assign(this, details);\n    }\n  }\n  preventDefault() {\n    this.defaultPrevented = true;\n  }\n}\n\n/**\r\n * PhotoSwipe base class that can listen and dispatch for events.\r\n * Shared by PhotoSwipe Core and PhotoSwipe Lightbox, extended by base.js\r\n */\nclass Eventable {\n  constructor() {\n    /**\r\n     * @type {{ [T in keyof PhotoSwipeEventsMap]?: ((event: AugmentedEvent<T>) => void)[] }}\r\n     */\n    this._listeners = {};\n\n    /**\r\n     * @type {{ [T in keyof PhotoSwipeFiltersMap]?: Filter<T>[] }}\r\n     */\n    this._filters = {};\n\n    /** @type {PhotoSwipe=} */\n    this.pswp = undefined;\n\n    /** @type {PhotoSwipeOptions} */\n    this.options = undefined;\n  }\n\n  /**\r\n   * @template {keyof PhotoSwipeFiltersMap} T\r\n   * @param {T} name\r\n   * @param {PhotoSwipeFiltersMap[T]} fn\r\n   * @param {number} priority\r\n   */\n  addFilter(name, fn, priority = 100) {\n    if (!this._filters[name]) {\n      this._filters[name] = [];\n    }\n    this._filters[name].push({\n      fn,\n      priority\n    });\n    this._filters[name].sort((f1, f2) => f1.priority - f2.priority);\n    if (this.pswp) {\n      this.pswp.addFilter(name, fn, priority);\n    }\n  }\n\n  /**\r\n   * @template {keyof PhotoSwipeFiltersMap} T\r\n   * @param {T} name\r\n   * @param {PhotoSwipeFiltersMap[T]} fn\r\n   */\n  removeFilter(name, fn) {\n    if (this._filters[name]) {\n      // @ts-expect-error\n      this._filters[name] = this._filters[name].filter(filter => filter.fn !== fn);\n    }\n    if (this.pswp) {\n      this.pswp.removeFilter(name, fn);\n    }\n  }\n\n  /**\r\n   * @template {keyof PhotoSwipeFiltersMap} T\r\n   * @param {T} name\r\n   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args\r\n   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}\r\n   */\n  applyFilters(name, ...args) {\n    if (this._filters[name]) {\n      this._filters[name].forEach(filter => {\n        // @ts-expect-error\n        args[0] = filter.fn.apply(this, args);\n      });\n    }\n    return args[0];\n  }\n\n  /**\r\n   * @template {keyof PhotoSwipeEventsMap} T\r\n   * @param {T} name\r\n   * @param {EventCallback<T>} fn\r\n   */\n  on(name, fn) {\n    if (!this._listeners[name]) {\n      this._listeners[name] = [];\n    }\n    this._listeners[name].push(fn);\n\n    // When binding events to lightbox,\n    // also bind events to PhotoSwipe Core,\n    // if it's open.\n    if (this.pswp) {\n      this.pswp.on(name, fn);\n    }\n  }\n\n  /**\r\n   * @template {keyof PhotoSwipeEventsMap} T\r\n   * @param {T} name\r\n   * @param {EventCallback<T>} fn\r\n   */\n  off(name, fn) {\n    if (this._listeners[name]) {\n      // @ts-expect-error\n      this._listeners[name] = this._listeners[name].filter(listener => fn !== listener);\n    }\n    if (this.pswp) {\n      this.pswp.off(name, fn);\n    }\n  }\n\n  /**\r\n   * @template {keyof PhotoSwipeEventsMap} T\r\n   * @param {T} name\r\n   * @param {PhotoSwipeEventsMap[T]} [details]\r\n   * @returns {AugmentedEvent<T>}\r\n   */\n  dispatch(name, details) {\n    if (this.pswp) {\n      return this.pswp.dispatch(name, details);\n    }\n    const event = /** @type {AugmentedEvent<T>} */new PhotoSwipeEvent(name, details);\n    if (!this._listeners) {\n      return event;\n    }\n    if (this._listeners[name]) {\n      this._listeners[name].forEach(listener => {\n        listener.call(this, event);\n      });\n    }\n    return event;\n  }\n}\nclass Placeholder {\n  /**\r\n   * @param {string | false} imageSrc\r\n   * @param {HTMLElement} container\r\n   */\n  constructor(imageSrc, container) {\n    // Create placeholder\n    // (stretched thumbnail or simple div behind the main image)\n    this.element = createElement('pswp__img pswp__img--placeholder', imageSrc ? 'img' : '', container);\n    if (imageSrc) {\n      /** @type {HTMLImageElement} */\n      this.element.decoding = 'async';\n      /** @type {HTMLImageElement} */\n      this.element.alt = '';\n      /** @type {HTMLImageElement} */\n      this.element.src = imageSrc;\n      this.element.setAttribute('role', 'presentation');\n    }\n    this.element.setAttribute('aria-hidden', 'true');\n  }\n\n  /**\r\n   * @param {number} width\r\n   * @param {number} height\r\n   */\n  setDisplayedSize(width, height) {\n    if (!this.element) {\n      return;\n    }\n    if (this.element.tagName === 'IMG') {\n      // Use transform scale() to modify img placeholder size\n      // (instead of changing width/height directly).\n      // This helps with performance, specifically in iOS15 Safari.\n      setWidthHeight(this.element, 250, 'auto');\n      this.element.style.transformOrigin = '0 0';\n      this.element.style.transform = toTransformString(0, 0, width / 250);\n    } else {\n      setWidthHeight(this.element, width, height);\n    }\n  }\n  destroy() {\n    if (this.element.parentNode) {\n      this.element.remove();\n    }\n    this.element = null;\n  }\n}\n\n/** @typedef {import('./slide.js').default} Slide */\n/** @typedef {import('./slide.js').SlideData} SlideData */\n/** @typedef {import('../photoswipe.js').default} PhotoSwipe */\n/** @typedef {import('../util/util.js').LoadState} LoadState */\n\nclass Content {\n  /**\r\n   * @param {SlideData} itemData Slide data\r\n   * @param {PhotoSwipe} instance PhotoSwipe or PhotoSwipeLightbox instance\r\n   * @param {number} index\r\n   */\n  constructor(itemData, instance, index) {\n    this.instance = instance;\n    this.data = itemData;\n    this.index = index;\n\n    /** @type {HTMLImageElement | HTMLDivElement} */\n    this.element = undefined;\n    this.displayedImageWidth = 0;\n    this.displayedImageHeight = 0;\n    this.width = Number(this.data.w) || Number(this.data.width) || 0;\n    this.height = Number(this.data.h) || Number(this.data.height) || 0;\n    this.isAttached = false;\n    this.hasSlide = false;\n    /** @type {LoadState} */\n    this.state = LOAD_STATE.IDLE;\n    if (this.data.type) {\n      this.type = this.data.type;\n    } else if (this.data.src) {\n      this.type = 'image';\n    } else {\n      this.type = 'html';\n    }\n    this.instance.dispatch('contentInit', {\n      content: this\n    });\n  }\n  removePlaceholder() {\n    if (this.placeholder && !this.keepPlaceholder()) {\n      // With delay, as image might be loaded, but not rendered\n      setTimeout(() => {\n        if (this.placeholder) {\n          this.placeholder.destroy();\n          this.placeholder = null;\n        }\n      }, 1000);\n    }\n  }\n\n  /**\r\n   * Preload content\r\n   *\r\n   * @param {boolean=} isLazy\r\n   * @param {boolean=} reload\r\n   */\n  load(isLazy, reload) {\n    if (this.slide && this.usePlaceholder()) {\n      if (!this.placeholder) {\n        const placeholderSrc = this.instance.applyFilters('placeholderSrc',\n        // use  image-based placeholder only for the first slide,\n        // as rendering (even small stretched thumbnail) is an expensive operation\n        this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false, this);\n        this.placeholder = new Placeholder(placeholderSrc, this.slide.container);\n      } else {\n        const placeholderEl = this.placeholder.element;\n        // Add placeholder to DOM if it was already created\n        if (placeholderEl && !placeholderEl.parentElement) {\n          this.slide.container.prepend(placeholderEl);\n        }\n      }\n    }\n    if (this.element && !reload) {\n      return;\n    }\n    if (this.instance.dispatch('contentLoad', {\n      content: this,\n      isLazy\n    }).defaultPrevented) {\n      return;\n    }\n    if (this.isImageContent()) {\n      this.element = createElement('pswp__img', 'img');\n      // Start loading only after width is defined, as sizes might depend on it.\n      // Due to Safari feature, we must define sizes before srcset.\n      if (this.displayedImageWidth) {\n        this.loadImage(isLazy);\n      }\n    } else {\n      this.element = createElement('pswp__content');\n      this.element.innerHTML = this.data.html || '';\n    }\n    if (reload && this.slide) {\n      this.slide.updateContentSize(true);\n    }\n  }\n\n  /**\r\n   * Preload image\r\n   *\r\n   * @param {boolean} isLazy\r\n   */\n  loadImage(isLazy) {\n    const imageElement = /** @type HTMLImageElement */this.element;\n    if (this.instance.dispatch('contentLoadImage', {\n      content: this,\n      isLazy\n    }).defaultPrevented) {\n      return;\n    }\n    this.updateSrcsetSizes();\n    if (this.data.srcset) {\n      imageElement.srcset = this.data.srcset;\n    }\n    imageElement.src = this.data.src;\n    imageElement.alt = this.data.alt || '';\n    this.state = LOAD_STATE.LOADING;\n    if (imageElement.complete) {\n      this.onLoaded();\n    } else {\n      imageElement.onload = () => {\n        this.onLoaded();\n      };\n      imageElement.onerror = () => {\n        this.onError();\n      };\n    }\n  }\n\n  /**\r\n   * Assign slide to content\r\n   *\r\n   * @param {Slide} slide\r\n   */\n  setSlide(slide) {\n    this.slide = slide;\n    this.hasSlide = true;\n    this.instance = slide.pswp;\n\n    // todo: do we need to unset slide?\n  }\n\n  /**\r\n   * Content load success handler\r\n   */\n  onLoaded() {\n    this.state = LOAD_STATE.LOADED;\n    if (this.slide) {\n      this.instance.dispatch('loadComplete', {\n        slide: this.slide,\n        content: this\n      });\n\n      // if content is reloaded\n      if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {\n        this.append();\n        this.slide.updateContentSize(true);\n      }\n      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {\n        this.removePlaceholder();\n      }\n    }\n  }\n\n  /**\r\n   * Content load error handler\r\n   */\n  onError() {\n    this.state = LOAD_STATE.ERROR;\n    if (this.slide) {\n      this.displayError();\n      this.instance.dispatch('loadComplete', {\n        slide: this.slide,\n        isError: true,\n        content: this\n      });\n      this.instance.dispatch('loadError', {\n        slide: this.slide,\n        content: this\n      });\n    }\n  }\n\n  /**\r\n   * @returns {Boolean} If the content is currently loading\r\n   */\n  isLoading() {\n    return this.instance.applyFilters('isContentLoading', this.state === LOAD_STATE.LOADING, this);\n  }\n  isError() {\n    return this.state === LOAD_STATE.ERROR;\n  }\n\n  /**\r\n   * @returns {boolean} If the content is image\r\n   */\n  isImageContent() {\n    return this.type === 'image';\n  }\n\n  /**\r\n   * Update content size\r\n   *\r\n   * @param {Number} width\r\n   * @param {Number} height\r\n   */\n  setDisplayedSize(width, height) {\n    if (!this.element) {\n      return;\n    }\n    if (this.placeholder) {\n      this.placeholder.setDisplayedSize(width, height);\n    }\n\n    // eslint-disable-next-line max-len\n    if (this.instance.dispatch('contentResize', {\n      content: this,\n      width,\n      height\n    }).defaultPrevented) {\n      return;\n    }\n    setWidthHeight(this.element, width, height);\n    if (this.isImageContent() && !this.isError()) {\n      const isInitialSizeUpdate = !this.displayedImageWidth && width;\n      this.displayedImageWidth = width;\n      this.displayedImageHeight = height;\n      if (isInitialSizeUpdate) {\n        this.loadImage(false);\n      } else {\n        this.updateSrcsetSizes();\n      }\n      if (this.slide) {\n        // eslint-disable-next-line max-len\n        this.instance.dispatch('imageSizeChange', {\n          slide: this.slide,\n          width,\n          height,\n          content: this\n        });\n      }\n    }\n  }\n\n  /**\r\n   * @returns {boolean} If the content can be zoomed\r\n   */\n  isZoomable() {\n    return this.instance.applyFilters('isContentZoomable', this.isImageContent() && this.state !== LOAD_STATE.ERROR, this);\n  }\n\n  /**\r\n   * Update image srcset sizes attribute based on width and height\r\n   */\n  updateSrcsetSizes() {\n    // Handle srcset sizes attribute.\n    //\n    // Never lower quality, if it was increased previously.\n    // Chrome does this automatically, Firefox and Safari do not,\n    // so we store largest used size in dataset.\n    // Handle srcset sizes attribute.\n    //\n    // Never lower quality, if it was increased previously.\n    // Chrome does this automatically, Firefox and Safari do not,\n    // so we store largest used size in dataset.\n    if (this.data.srcset) {\n      const image = /** @type HTMLImageElement */this.element;\n      const sizesWidth = this.instance.applyFilters('srcsetSizesWidth', this.displayedImageWidth, this);\n      if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {\n        image.sizes = sizesWidth + 'px';\n        image.dataset.largestUsedSize = String(sizesWidth);\n      }\n    }\n  }\n\n  /**\r\n   * @returns {boolean} If content should use a placeholder (from msrc by default)\r\n   */\n  usePlaceholder() {\n    return this.instance.applyFilters('useContentPlaceholder', this.isImageContent(), this);\n  }\n\n  /**\r\n   * Preload content with lazy-loading param\r\n   */\n  lazyLoad() {\n    if (this.instance.dispatch('contentLazyLoad', {\n      content: this\n    }).defaultPrevented) {\n      return;\n    }\n    this.load(true);\n  }\n\n  /**\r\n   * @returns {boolean} If placeholder should be kept after content is loaded\r\n   */\n  keepPlaceholder() {\n    return this.instance.applyFilters('isKeepingPlaceholder', this.isLoading(), this);\n  }\n\n  /**\r\n   * Destroy the content\r\n   */\n  destroy() {\n    this.hasSlide = false;\n    this.slide = null;\n    if (this.instance.dispatch('contentDestroy', {\n      content: this\n    }).defaultPrevented) {\n      return;\n    }\n    this.remove();\n    if (this.placeholder) {\n      this.placeholder.destroy();\n      this.placeholder = null;\n    }\n    if (this.isImageContent() && this.element) {\n      this.element.onload = null;\n      this.element.onerror = null;\n      this.element = null;\n    }\n  }\n\n  /**\r\n   * Display error message\r\n   */\n  displayError() {\n    if (this.slide) {\n      /** @type {HTMLElement} */\n      let errorMsgEl = createElement('pswp__error-msg');\n      errorMsgEl.innerText = this.instance.options.errorMsg;\n      errorMsgEl = this.instance.applyFilters('contentErrorElement', errorMsgEl, this);\n      this.element = createElement('pswp__content pswp__error-msg-container');\n      this.element.appendChild(errorMsgEl);\n      this.slide.container.innerText = '';\n      this.slide.container.appendChild(this.element);\n      this.slide.updateContentSize(true);\n      this.removePlaceholder();\n    }\n  }\n\n  /**\r\n   * Append the content\r\n   */\n  append() {\n    if (this.isAttached) {\n      return;\n    }\n    this.isAttached = true;\n    if (this.state === LOAD_STATE.ERROR) {\n      this.displayError();\n      return;\n    }\n    if (this.instance.dispatch('contentAppend', {\n      content: this\n    }).defaultPrevented) {\n      return;\n    }\n    const supportsDecode = ('decode' in this.element);\n    if (this.isImageContent()) {\n      // Use decode() on nearby slides\n      //\n      // Nearby slide images are in DOM and not hidden via display:none.\n      // However, they are placed offscreen (to the left and right side).\n      //\n      // Some browsers do not composite the image until it's actually visible,\n      // using decode() helps.\n      //\n      // You might ask \"why dont you just decode() and then append all images\",\n      // that's because I want to show image before it's fully loaded,\n      // as browser can render parts of image while it is loading.\n      // We do not do this in Safari due to partial loading bug.\n      if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {\n        this.isDecoding = true;\n        // purposefully using finally instead of then,\n        // as if srcset sizes changes dynamically - it may cause decode error\n        /** @type {HTMLImageElement} */\n        this.element.decode().catch(() => {}).finally(() => {\n          this.isDecoding = false;\n          this.appendImage();\n        });\n      } else {\n        this.appendImage();\n      }\n    } else if (this.element && !this.element.parentNode) {\n      this.slide.container.appendChild(this.element);\n    }\n  }\n\n  /**\r\n   * Activate the slide,\r\n   * active slide is generally the current one,\r\n   * meaning the user can see it.\r\n   */\n  activate() {\n    if (this.instance.dispatch('contentActivate', {\n      content: this\n    }).defaultPrevented) {\n      return;\n    }\n    if (this.slide) {\n      if (this.isImageContent() && this.isDecoding && !isSafari()) {\n        // add image to slide when it becomes active,\n        // even if it's not finished decoding\n        this.appendImage();\n      } else if (this.isError()) {\n        this.load(false, true); // try to reload\n      }\n\n      if (this.slide.holderElement) {\n        this.slide.holderElement.setAttribute('aria-hidden', 'false');\n      }\n    }\n  }\n\n  /**\r\n   * Deactivate the content\r\n   */\n  deactivate() {\n    this.instance.dispatch('contentDeactivate', {\n      content: this\n    });\n    if (this.slide && this.slide.holderElement) {\n      this.slide.holderElement.setAttribute('aria-hidden', 'true');\n    }\n  }\n\n  /**\r\n   * Remove the content from DOM\r\n   */\n  remove() {\n    this.isAttached = false;\n    if (this.instance.dispatch('contentRemove', {\n      content: this\n    }).defaultPrevented) {\n      return;\n    }\n    if (this.element && this.element.parentNode) {\n      this.element.remove();\n    }\n    if (this.placeholder && this.placeholder.element) {\n      this.placeholder.element.remove();\n    }\n  }\n\n  /**\r\n   * Append the image content to slide container\r\n   */\n  appendImage() {\n    if (!this.isAttached) {\n      return;\n    }\n    if (this.instance.dispatch('contentAppendImage', {\n      content: this\n    }).defaultPrevented) {\n      return;\n    }\n\n    // ensure that element exists and is not already appended\n    if (this.slide && this.element && !this.element.parentNode) {\n      this.slide.container.appendChild(this.element);\n    }\n    if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {\n      this.removePlaceholder();\n    }\n  }\n}\n\n/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */\n/** @typedef {import('../photoswipe.js').default} PhotoSwipe */\n/** @typedef {import('../slide/slide.js').SlideData} SlideData */\n\n/**\r\n * @param {PhotoSwipeOptions} options\r\n * @param {PhotoSwipe} pswp\r\n */\nfunction getViewportSize(options, pswp) {\n  if (options.getViewportSizeFn) {\n    const newViewportSize = options.getViewportSizeFn(options, pswp);\n    if (newViewportSize) {\n      return newViewportSize;\n    }\n  }\n  return {\n    x: document.documentElement.clientWidth,\n    // TODO: height on mobile is very incosistent due to toolbar\n    // find a way to improve this\n    //\n    // document.documentElement.clientHeight - doesn't seem to work well\n    y: window.innerHeight\n  };\n}\n\n/**\r\n * Parses padding option.\r\n * Supported formats:\r\n *\r\n * // Object\r\n * padding: {\r\n *  top: 0,\r\n *  bottom: 0,\r\n *  left: 0,\r\n *  right: 0\r\n * }\r\n *\r\n * // A function that returns the object\r\n * paddingFn: (viewportSize, itemData, index) => {\r\n *  return {\r\n *    top: 0,\r\n *    bottom: 0,\r\n *    left: 0,\r\n *    right: 0\r\n *  };\r\n * }\r\n *\r\n * // Legacy variant\r\n * paddingLeft: 0,\r\n * paddingRight: 0,\r\n * paddingTop: 0,\r\n * paddingBottom: 0,\r\n *\r\n * @param {'left' | 'top' | 'bottom' | 'right'} prop\r\n * @param {PhotoSwipeOptions} options PhotoSwipe options\r\n * @param {{ x?: number; y?: number }} viewportSize PhotoSwipe viewport size, for example: { x:800, y:600 }\r\n * @param {SlideData} itemData Data about the slide\r\n * @param {number} index Slide index\r\n * @returns {number}\r\n */\nfunction parsePaddingOption(prop, options, viewportSize, itemData, index) {\n  /** @type {number} */\n  let paddingValue;\n  if (options.paddingFn) {\n    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];\n  } else if (options.padding) {\n    paddingValue = options.padding[prop];\n  } else {\n    const legacyPropName = 'padding' + prop[0].toUpperCase() + prop.slice(1);\n    // @ts-expect-error\n    if (options[legacyPropName]) {\n      // @ts-expect-error\n      paddingValue = options[legacyPropName];\n    }\n  }\n  return paddingValue || 0;\n}\n\n/**\r\n * @param {PhotoSwipeOptions} options\r\n * @param {{ x?: number; y?: number }} viewportSize\r\n * @param {SlideData} itemData\r\n * @param {number} index\r\n */\nfunction getPanAreaSize(options, viewportSize, itemData, index) {\n  return {\n    x: viewportSize.x - parsePaddingOption('left', options, viewportSize, itemData, index) - parsePaddingOption('right', options, viewportSize, itemData, index),\n    y: viewportSize.y - parsePaddingOption('top', options, viewportSize, itemData, index) - parsePaddingOption('bottom', options, viewportSize, itemData, index)\n  };\n}\nconst MAX_IMAGE_WIDTH = 4000;\n\n/** @typedef {import('../photoswipe.js').default} PhotoSwipe */\n/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */\n/** @typedef {import('../slide/slide.js').SlideData} SlideData */\n\n/** @typedef {'fit' | 'fill' | number | ((zoomLevelObject: ZoomLevel) => number)} ZoomLevelOption */\n\n/**\r\n * Calculates zoom levels for specific slide.\r\n * Depends on viewport size and image size.\r\n */\nclass ZoomLevel {\n  /**\r\n   * @param {PhotoSwipeOptions} options PhotoSwipe options\r\n   * @param {SlideData} itemData Slide data\r\n   * @param {number} index Slide index\r\n   * @param {PhotoSwipe=} pswp PhotoSwipe instance, can be undefined if not initialized yet\r\n   */\n  constructor(options, itemData, index, pswp) {\n    this.pswp = pswp;\n    this.options = options;\n    this.itemData = itemData;\n    this.index = index;\n  }\n\n  /**\r\n   * Calculate initial, secondary and maximum zoom level for the specified slide.\r\n   *\r\n   * It should be called when either image or viewport size changes.\r\n   *\r\n   * @param {number} maxWidth\r\n   * @param {number} maxHeight\r\n   * @param {{ x?: number; y?: number }} panAreaSize\r\n   */\n  update(maxWidth, maxHeight, panAreaSize) {\n    this.elementSize = {\n      x: maxWidth,\n      y: maxHeight\n    };\n    this.panAreaSize = panAreaSize;\n    const hRatio = this.panAreaSize.x / this.elementSize.x;\n    const vRatio = this.panAreaSize.y / this.elementSize.y;\n    this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);\n    this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);\n\n    // zoom.vFill defines zoom level of the image\n    // when it has 100% of viewport vertical space (height)\n    this.vFill = Math.min(1, vRatio);\n    this.initial = this._getInitial();\n    this.secondary = this._getSecondary();\n    this.max = Math.max(this.initial, this.secondary, this._getMax());\n    this.min = Math.min(this.fit, this.initial, this.secondary);\n    if (this.pswp) {\n      this.pswp.dispatch('zoomLevelsUpdate', {\n        zoomLevels: this,\n        slideData: this.itemData\n      });\n    }\n  }\n\n  /**\r\n   * Parses user-defined zoom option.\r\n   *\r\n   * @private\r\n   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)\r\n   */\n  _parseZoomLevelOption(optionPrefix) {\n    // eslint-disable-next-line max-len\n    const optionName = /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */optionPrefix + 'ZoomLevel';\n    const optionValue = this.options[optionName];\n    if (!optionValue) {\n      return;\n    }\n    if (typeof optionValue === 'function') {\n      return optionValue(this);\n    }\n    if (optionValue === 'fill') {\n      return this.fill;\n    }\n    if (optionValue === 'fit') {\n      return this.fit;\n    }\n    return Number(optionValue);\n  }\n\n  /**\r\n   * Get zoom level to which image will be zoomed after double-tap gesture,\r\n   * or when user clicks on zoom icon,\r\n   * or mouse-click on image itself.\r\n   * If you return 1 image will be zoomed to its original size.\r\n   *\r\n   * @private\r\n   * @return {number}\r\n   */\n  _getSecondary() {\n    let currZoomLevel = this._parseZoomLevelOption('secondary');\n    if (currZoomLevel) {\n      return currZoomLevel;\n    }\n\n    // 3x of \"fit\" state, but not larger than original\n    currZoomLevel = Math.min(1, this.fit * 3);\n    if (currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {\n      currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;\n    }\n    return currZoomLevel;\n  }\n\n  /**\r\n   * Get initial image zoom level.\r\n   *\r\n   * @private\r\n   * @return {number}\r\n   */\n  _getInitial() {\n    return this._parseZoomLevelOption('initial') || this.fit;\n  }\n\n  /**\r\n   * Maximum zoom level when user zooms\r\n   * via zoom/pinch gesture,\r\n   * via cmd/ctrl-wheel or via trackpad.\r\n   *\r\n   * @private\r\n   * @return {number}\r\n   */\n  _getMax() {\n    const currZoomLevel = this._parseZoomLevelOption('max');\n    if (currZoomLevel) {\n      return currZoomLevel;\n    }\n\n    // max zoom level is x4 from \"fit state\",\n    // used for zoom gesture and ctrl/trackpad zoom\n    return Math.max(1, this.fit * 4);\n  }\n}\n\n/**\r\n * Lazy-load an image\r\n * This function is used both by Lightbox and PhotoSwipe core,\r\n * thus it can be called before dialog is opened.\r\n *\r\n * @param {SlideData} itemData Data about the slide\r\n * @param {PhotoSwipe | PhotoSwipeLightbox | PhotoSwipeBase} instance PhotoSwipe instance\r\n * @param {number} index\r\n * @returns Image that is being decoded or false.\r\n */\nfunction lazyLoadData(itemData, instance, index) {\n  // src/slide/content/content.js\n  const content = instance.createContentFromData(itemData, index);\n  if (!content || !content.lazyLoad) {\n    return;\n  }\n  const {\n    options\n  } = instance;\n\n  // We need to know dimensions of the image to preload it,\n  // as it might use srcset and we need to define sizes\n  // @ts-expect-error should provide pswp instance?\n  const viewportSize = instance.viewportSize || getViewportSize(options, instance);\n  const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);\n  const zoomLevel = new ZoomLevel(options, itemData, -1);\n  zoomLevel.update(content.width, content.height, panAreaSize);\n  content.lazyLoad();\n  content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));\n  return content;\n}\n\n/**\r\n * Lazy-loads specific slide.\r\n * This function is used both by Lightbox and PhotoSwipe core,\r\n * thus it can be called before dialog is opened.\r\n *\r\n * By default it loads image based on viewport size and initial zoom level.\r\n *\r\n * @param {number} index Slide index\r\n * @param {PhotoSwipe | PhotoSwipeLightbox} instance PhotoSwipe or PhotoSwipeLightbox eventable instance\r\n */\nfunction lazyLoadSlide(index, instance) {\n  const itemData = instance.getItemData(index);\n  if (instance.dispatch('lazyLoadSlide', {\n    index,\n    itemData\n  }).defaultPrevented) {\n    return;\n  }\n  return lazyLoadData(itemData, instance, index);\n}\n\n/** @typedef {import(\"../photoswipe.js\").default} PhotoSwipe */\n/** @typedef {import(\"../photoswipe.js\").PhotoSwipeOptions} PhotoSwipeOptions */\n/** @typedef {import(\"../slide/slide.js\").SlideData} SlideData */\n\n/**\r\n * PhotoSwipe base class that can retrieve data about every slide.\r\n * Shared by PhotoSwipe Core and PhotoSwipe Lightbox\r\n */\nclass PhotoSwipeBase extends Eventable {\n  /**\r\n   * Get total number of slides\r\n   *\r\n   * @returns {number}\r\n   */\n  getNumItems() {\n    let numItems;\n    const {\n      dataSource\n    } = this.options;\n    if (!dataSource) {\n      numItems = 0;\n    } else if ('length' in dataSource) {\n      // may be an array or just object with length property\n      numItems = dataSource.length;\n    } else if ('gallery' in dataSource) {\n      // query DOM elements\n      if (!dataSource.items) {\n        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);\n      }\n      if (dataSource.items) {\n        numItems = dataSource.items.length;\n      }\n    }\n\n    // legacy event, before filters were introduced\n    const event = this.dispatch('numItems', {\n      dataSource,\n      numItems\n    });\n    return this.applyFilters('numItems', event.numItems, dataSource);\n  }\n\n  /**\r\n   * @param {SlideData} slideData\r\n   * @param {number} index\r\n   */\n  createContentFromData(slideData, index) {\n    // @ts-expect-error\n    return new Content(slideData, this, index);\n  }\n\n  /**\r\n   * Get item data by index.\r\n   *\r\n   * \"item data\" should contain normalized information that PhotoSwipe needs to generate a slide.\r\n   * For example, it may contain properties like\r\n   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.\r\n   *\r\n   * @param {number} index\r\n   */\n  getItemData(index) {\n    const {\n      dataSource\n    } = this.options;\n    let dataSourceItem;\n    if (Array.isArray(dataSource)) {\n      // Datasource is an array of elements\n      dataSourceItem = dataSource[index];\n    } else if (dataSource && dataSource.gallery) {\n      // dataSource has gallery property,\n      // thus it was created by Lightbox, based on\n      // gallery and children options\n\n      // query DOM elements\n      if (!dataSource.items) {\n        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);\n      }\n      dataSourceItem = dataSource.items[index];\n    }\n    let itemData = dataSourceItem;\n    if (itemData instanceof Element) {\n      itemData = this._domElementToItemData(itemData);\n    }\n\n    // Dispatching the itemData event,\n    // it's a legacy verion before filters were introduced\n    const event = this.dispatch('itemData', {\n      itemData: itemData || {},\n      index\n    });\n    return this.applyFilters('itemData', event.itemData, index);\n  }\n\n  /**\r\n   * Get array of gallery DOM elements,\r\n   * based on childSelector and gallery element.\r\n   *\r\n   * @param {HTMLElement} galleryElement\r\n   */\n  _getGalleryDOMElements(galleryElement) {\n    if (this.options.children || this.options.childSelector) {\n      return getElementsFromOption(this.options.children, this.options.childSelector, galleryElement) || [];\n    }\n    return [galleryElement];\n  }\n\n  /**\r\n   * Converts DOM element to item data object.\r\n   *\r\n   * @param {HTMLElement} element DOM element\r\n   */\n  // eslint-disable-next-line class-methods-use-this\n  _domElementToItemData(element) {\n    /** @type {SlideData} */\n    const itemData = {\n      element\n    };\n\n    // eslint-disable-next-line max-len\n    const linkEl = /** @type {HTMLAnchorElement} */element.tagName === 'A' ? element : element.querySelector('a');\n    if (linkEl) {\n      // src comes from data-pswp-src attribute,\n      // if it's empty link href is used\n      itemData.src = linkEl.dataset.pswpSrc || linkEl.href;\n      if (linkEl.dataset.pswpSrcset) {\n        itemData.srcset = linkEl.dataset.pswpSrcset;\n      }\n      itemData.width = parseInt(linkEl.dataset.pswpWidth, 10);\n      itemData.height = parseInt(linkEl.dataset.pswpHeight, 10);\n\n      // support legacy w & h properties\n      itemData.w = itemData.width;\n      itemData.h = itemData.height;\n      if (linkEl.dataset.pswpType) {\n        itemData.type = linkEl.dataset.pswpType;\n      }\n      const thumbnailEl = element.querySelector('img');\n      if (thumbnailEl) {\n        // msrc is URL to placeholder image that's displayed before large image is loaded\n        // by default it's displayed only for the first slide\n        itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;\n        itemData.alt = thumbnailEl.getAttribute('alt');\n      }\n      if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {\n        itemData.thumbCropped = true;\n      }\n    }\n    return this.applyFilters('domItemData', itemData, element, linkEl);\n  }\n\n  /**\r\n   * Lazy-load by slide data\r\n   *\r\n   * @param {SlideData} itemData Data about the slide\r\n   * @param {number} index\r\n   * @returns Image that is being decoded or false.\r\n   */\n  lazyLoadData(itemData, index) {\n    return lazyLoadData(itemData, this, index);\n  }\n}\n\n/**\r\n * @template T\r\n * @typedef {import('../types.js').Type<T>} Type<T>\r\n */\n\n/** @typedef {import('../photoswipe.js').default} PhotoSwipe */\n/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */\n/** @typedef {import('../photoswipe.js').DataSource} DataSource */\n/** @typedef {import('../slide/content.js').default} Content */\n/** @typedef {import('../core/eventable.js').PhotoSwipeEventsMap} PhotoSwipeEventsMap */\n/** @typedef {import('../core/eventable.js').PhotoSwipeFiltersMap} PhotoSwipeFiltersMap */\n\n/**\r\n * @template T\r\n * @typedef {import('../core/eventable.js').EventCallback<T>} EventCallback<T>\r\n */\n\n/**\r\n * PhotoSwipe Lightbox\r\n *\r\n * - If user has unsupported browser it falls back to default browser action (just opens URL)\r\n * - Binds click event to links that should open PhotoSwipe\r\n * - parses DOM strcture for PhotoSwipe (retrieves large image URLs and sizes)\r\n * - Initializes PhotoSwipe\r\n *\r\n *\r\n * Loader options use the same object as PhotoSwipe, and supports such options:\r\n *\r\n * gallery - Element | Element[] | NodeList | string selector for the gallery element\r\n * children - Element | Element[] | NodeList | string selector for the gallery children\r\n *\r\n */\nclass PhotoSwipeLightbox extends PhotoSwipeBase {\n  /**\r\n   * @param {PhotoSwipeOptions} options\r\n   */\n  constructor(options) {\n    super();\n    /** @type {PhotoSwipeOptions} */\n    this.options = options || {};\n    this._uid = 0;\n  }\n\n  /**\r\n   * Initialize lightbox, should be called only once.\r\n   * It's not included in the main constructor, so you may bind events before it.\r\n   */\n  init() {\n    this.onThumbnailsClick = this.onThumbnailsClick.bind(this);\n\n    // Bind click events to each gallery\n    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach(galleryElement => {\n      galleryElement.addEventListener('click', this.onThumbnailsClick, false);\n    });\n  }\n\n  /**\r\n   * @param {MouseEvent} e\r\n   */\n  onThumbnailsClick(e) {\n    // Exit and allow default browser action if:\n    if (specialKeyUsed(e) // ... if clicked with a special key (ctrl/cmd...)\n    || window.pswp // ... if PhotoSwipe is already open\n    || window.navigator.onLine === false) {\n      // ... if offline\n      return;\n    }\n\n    // If both clientX and clientY are 0 or not defined,\n    // the event is likely triggered by keyboard,\n    // so we do not pass the initialPoint\n    //\n    // Note that some screen readers emulate the mouse position,\n    // so it's not ideal way to detect them.\n    //\n    let initialPoint = {\n      x: e.clientX,\n      y: e.clientY\n    };\n    if (!initialPoint.x && !initialPoint.y) {\n      initialPoint = null;\n    }\n    let clickedIndex = this.getClickedIndex(e);\n    clickedIndex = this.applyFilters('clickedIndex', clickedIndex, e, this);\n    const dataSource = {\n      gallery: /** @type {HTMLElement} */e.currentTarget\n    };\n    if (clickedIndex >= 0) {\n      e.preventDefault();\n      this.loadAndOpen(clickedIndex, dataSource, initialPoint);\n    }\n  }\n\n  /**\r\n   * Get index of gallery item that was clicked.\r\n   *\r\n   * @param {MouseEvent} e click event\r\n   */\n  getClickedIndex(e) {\n    // legacy option\n    if (this.options.getClickedIndexFn) {\n      return this.options.getClickedIndexFn.call(this, e);\n    }\n    const clickedTarget = /** @type {HTMLElement} */e.target;\n    const childElements = getElementsFromOption(this.options.children, this.options.childSelector, /** @type {HTMLElement} */e.currentTarget);\n    const clickedChildIndex = childElements.findIndex(child => child === clickedTarget || child.contains(clickedTarget));\n    if (clickedChildIndex !== -1) {\n      return clickedChildIndex;\n    } else if (this.options.children || this.options.childSelector) {\n      // click wasn't on a child element\n      return -1;\n    }\n\n    // There is only one item (which is the gallery)\n    return 0;\n  }\n\n  /**\r\n   * Load and open PhotoSwipe\r\n   *\r\n   * @param {number} index\r\n   * @param {DataSource=} dataSource\r\n   * @param {{ x?: number; y?: number }} [initialPoint]\r\n   */\n  loadAndOpen(index, dataSource, initialPoint) {\n    // Check if the gallery is already open\n    if (window.pswp) {\n      return false;\n    }\n\n    // set initial index\n    this.options.index = index;\n\n    // define options for PhotoSwipe constructor\n    this.options.initialPointerPos = initialPoint;\n    this.shouldOpen = true;\n    this.preload(index, dataSource);\n    return true;\n  }\n\n  /**\r\n   * Load the main module and the slide content by index\r\n   *\r\n   * @param {number} index\r\n   * @param {DataSource=} dataSource\r\n   */\n  preload(index, dataSource) {\n    const {\n      options\n    } = this;\n    if (dataSource) {\n      options.dataSource = dataSource;\n    }\n\n    // Add the main module\n    /** @type {Promise<Type<PhotoSwipe>>[]} */\n    const promiseArray = [];\n    const pswpModuleType = typeof options.pswpModule;\n    if (isPswpClass(options.pswpModule)) {\n      promiseArray.push(Promise.resolve( /** @type {Type<PhotoSwipe>} */options.pswpModule));\n    } else if (pswpModuleType === 'string') {\n      throw new Error('pswpModule as string is no longer supported');\n    } else if (pswpModuleType === 'function') {\n      promiseArray.push( /** @type {() => Promise<Type<PhotoSwipe>>} */options.pswpModule());\n    } else {\n      throw new Error('pswpModule is not valid');\n    }\n\n    // Add custom-defined promise, if any\n    if (typeof options.openPromise === 'function') {\n      // allow developers to perform some task before opening\n      promiseArray.push(options.openPromise());\n    }\n    if (options.preloadFirstSlide !== false && index >= 0) {\n      this._preloadedContent = lazyLoadSlide(index, this);\n    }\n\n    // Wait till all promises resolve and open PhotoSwipe\n    const uid = ++this._uid;\n    Promise.all(promiseArray).then(iterableModules => {\n      if (this.shouldOpen) {\n        const mainModule = iterableModules[0];\n        this._openPhotoswipe(mainModule, uid);\n      }\n    });\n  }\n\n  /**\r\n   * @private\r\n   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module\r\n   * @param {number} uid\r\n   */\n  _openPhotoswipe(module, uid) {\n    // Cancel opening if UID doesn't match the current one\n    // (if user clicked on another gallery item before current was loaded).\n    //\n    // Or if shouldOpen flag is set to false\n    // (developer may modify it via public API)\n    if (uid !== this._uid && this.shouldOpen) {\n      return;\n    }\n    this.shouldOpen = false;\n\n    // PhotoSwipe is already open\n    if (window.pswp) {\n      return;\n    }\n\n    /**\r\n     * Pass data to PhotoSwipe and open init\r\n     *\r\n     * @type {PhotoSwipe}\r\n     */\n    const pswp = typeof module === 'object' ? new module.default(this.options) // eslint-disable-line\n    : new module(this.options); // eslint-disable-line\n\n    this.pswp = pswp;\n    window.pswp = pswp;\n\n    // map listeners from Lightbox to PhotoSwipe Core\n    /** @type {(keyof PhotoSwipeEventsMap)[]} */\n    Object.keys(this._listeners).forEach(name => {\n      this._listeners[name].forEach(fn => {\n        pswp.on(name, /** @type {EventCallback<typeof name>} */fn);\n      });\n    });\n\n    // same with filters\n    /** @type {(keyof PhotoSwipeFiltersMap)[]} */\n    Object.keys(this._filters).forEach(name => {\n      this._filters[name].forEach(filter => {\n        pswp.addFilter(name, filter.fn, filter.priority);\n      });\n    });\n    if (this._preloadedContent) {\n      pswp.contentLoader.addToCache(this._preloadedContent);\n      this._preloadedContent = null;\n    }\n    pswp.on('destroy', () => {\n      // clean up public variables\n      this.pswp = null;\n      window.pswp = null;\n    });\n    pswp.init();\n  }\n\n  /**\r\n   * Unbinds all events, closes PhotoSwipe if it's open.\r\n   */\n  destroy() {\n    if (this.pswp) {\n      this.pswp.destroy();\n    }\n    this.shouldOpen = false;\n    this._listeners = null;\n    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach(galleryElement => {\n      galleryElement.removeEventListener('click', this.onThumbnailsClick, false);\n    });\n  }\n}\n\n\n//# sourceURL=webpack://AAOG/./node_modules/photoswipe/dist/photoswipe-lightbox.esm.js?");

/***/ }),

/***/ "./src/errorMsg.json":
/*!***************************!*\
  !*** ./src/errorMsg.json ***!
  \***************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"en\":{\"validation\":{\"nombre\":[{\"type\":\"required\",\"msg\":\"This field is required\"}],\"email\":[{\"type\":\"required\",\"msg\":\"This field is required\"},{\"type\":\"typemismatch\",\"msg\":\"Please provide a valid email address\"}],\"comentario\":[{\"type\":\"required\",\"msg\":\"This field is required\"}]},\"sending\":\"Sending Form...\",\"textcount\":\"{variable} characters left\"},\"es\":{\"validation\":{\"nombre\":[{\"type\":\"required\",\"msg\":\"Este campo es requerido\"}],\"email\":[{\"type\":\"required\",\"msg\":\"Este campo es requerido\"},{\"type\":\"typemismatch\",\"msg\":\"Una direcci&oacute;n de email v&aacute;lida es requerida.\"}],\"comentario\":[{\"type\":\"required\",\"msg\":\"Este campo es requerido\"}]},\"sending\":\"Enviando...\",\"textcount\":\"{variable} caracteres restantes\"}}');\n\n//# sourceURL=webpack://AAOG/./src/errorMsg.json?");

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
/******/ 			return "" + chunkId + "." + "014ee42306f2062bdd27" + ".js";
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
/******/ 			"product": 0
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/product.js");
/******/ 	
/******/ })()
;
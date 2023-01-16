/*!
 * // ==UserScript==
 * // @name         NVR
 * // @namespace    http://tampermonkey.net/
 * // @version      0.1
 * // @description  try to take over the world!
 * // @author       You
 * // @match        *://*.moomoo.io/*
 * // @icon         https://media.discordapp.net/attachments/1026024421925855302/1058027305764667452/UMrA0xrKmPkAAAAASUVORK5CYII.png
 * // @grant        none
 * // @run-at       document-start
 * // ==/UserScript==
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/src/core/Action.ts":
/*!*************************************!*\
  !*** ./frontend/src/core/Action.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Action": () => (/* binding */ Action)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Action = /*#__PURE__*/_createClass(function Action(id, type, priority, executeTick, data) {
  _classCallCheck(this, Action);
  this.id = id;
  this.type = type;
  this.priority = priority;
  this.executeTick = executeTick;
  this.data = data;
});


/***/ }),

/***/ "./frontend/src/core/ActionType.ts":
/*!*****************************************!*\
  !*** ./frontend/src/core/ActionType.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionPriority": () => (/* binding */ ActionPriority),
/* harmony export */   "ActionType": () => (/* binding */ ActionType)
/* harmony export */ });
// top = lowest priority
// bottom = highest priority
// (because enums starts indexing from 0 and for us, higher index = higher priority)
var ActionPriority;
(function (ActionPriority) {
  ActionPriority[ActionPriority["BIOMEHAT"] = 0] = "BIOMEHAT";
  ActionPriority[ActionPriority["AUTOBREAK"] = 1] = "AUTOBREAK";
  ActionPriority[ActionPriority["ANTIBULL"] = 2] = "ANTIBULL";
  ActionPriority[ActionPriority["ANTIINSTA"] = 3] = "ANTIINSTA";
  ActionPriority[ActionPriority["FORCED"] = 4] = "FORCED";
})(ActionPriority || (ActionPriority = {}));
var ActionType;
(function (ActionType) {
  ActionType[ActionType["HAT"] = 0] = "HAT";
  ActionType[ActionType["TAIL"] = 1] = "TAIL";
  ActionType[ActionType["ATTACK"] = 2] = "ATTACK";
  ActionType[ActionType["WEAPON"] = 3] = "WEAPON";
})(ActionType || (ActionType = {}));


/***/ }),

/***/ "./frontend/src/core/Core.ts":
/*!***********************************!*\
  !*** ./frontend/src/core/Core.ts ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Core": () => (/* binding */ Core),
/* harmony export */   "setTarget": () => (/* binding */ setTarget),
/* harmony export */   "target": () => (/* binding */ target)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket/PacketHandler */ "./frontend/src/socket/PacketHandler.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Action */ "./frontend/src/core/Action.ts");
/* harmony import */ var _ActionType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/engine/PacketCountEngine */ "./frontend/src/util/engine/PacketCountEngine.ts");
/* harmony import */ var _manager_ObjectManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../manager/ObjectManager */ "./frontend/src/manager/ObjectManager.ts");
/* harmony import */ var _render_RenderManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../render/RenderManager */ "./frontend/src/render/RenderManager.ts");
/* harmony import */ var _render_interface_PacketCountModule__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../render/interface/PacketCountModule */ "./frontend/src/render/interface/PacketCountModule.ts");
/* harmony import */ var _features_ModuleManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../features/ModuleManager */ "./frontend/src/features/ModuleManager.ts");
/* harmony import */ var _util_engine_InteractionEngine__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../util/engine/InteractionEngine */ "./frontend/src/util/engine/InteractionEngine.ts");
/* harmony import */ var _injector_BundleProxy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../injector/BundleProxy */ "./frontend/src/injector/BundleProxy.ts");
/* harmony import */ var _injector_api_API__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../injector/api/API */ "./frontend/src/injector/api/API.ts");
/* harmony import */ var _render_interface_PacketGraphModule__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../render/interface/PacketGraphModule */ "./frontend/src/render/interface/PacketGraphModule.ts");
/* harmony import */ var _manager_PlayerManager__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../manager/PlayerManager */ "./frontend/src/manager/PlayerManager.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__, _features_ModuleManager__WEBPACK_IMPORTED_MODULE_13__]);
([_socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__, _features_ModuleManager__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

//import { Pathfinder } from "../pathfinding/Pathfinder";




















var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_5__["default"]("core");
var target = null;

/*
const pathfinder = new Pathfinder();

function pathfind(path: any[]) {
    // @ts-ignore
    window.path = path;
}
*/

function setTarget(player) {
  target = player;
}
var Core = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Core, _EventEmitter);
  var _super = _createSuper(Core);
  function Core() {
    var _this;
    _classCallCheck(this, Core);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "actionIdCounter", 0);
    _defineProperty(_assertThisInitialized(_this), "packetBlockIdCounter", 0);
    _this.bundleAPI = new _injector_api_API__WEBPACK_IMPORTED_MODULE_16__["default"]();
    logger.info("launched StarLit core version ".concat(Core.VER, " by ").concat(Core.AUTHORS.join(", ")));
    _this.lastUpdate = Date.now();
    _this.scheduledActions = [];
    _this.lastActionState = {
      hat: 0,
      tail: 0,
      attack: 0,
      aim: 0,
      weapon: 0
    };
    _this.packetBlocks = {};
    _this.objectManager = new _manager_ObjectManager__WEBPACK_IMPORTED_MODULE_10__["default"]();
    _this.playerManager = new _manager_PlayerManager__WEBPACK_IMPORTED_MODULE_18__["default"]();
    _this.renderManager = null;
    _this.moduleManager = new _features_ModuleManager__WEBPACK_IMPORTED_MODULE_13__["default"]();
    _this.tickEngine = new _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_6__.TickEngine(_assertThisInitialized(_this));
    _this.packetEngine = new _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_9__.PacketCountEngine(_assertThisInitialized(_this));
    _this.interactionEngine = new _util_engine_InteractionEngine__WEBPACK_IMPORTED_MODULE_14__["default"](_assertThisInitialized(_this));
    _this.tickEngine.once("ping", _this.packetEngine.handlePing.bind(_this.packetEngine));
    _this.tickEngine.on("pretick", function (tick) {
      _this.moduleManager.onPreTick(tick);

      // run actions based on priority
      _this.runUppermostAction(_ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.HAT, tick);
      _this.runUppermostAction(_ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.TAIL, tick);
      _this.runUppermostAction(_ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.WEAPON, tick); // important to switch weapon before attack
      _this.runUppermostAction(_ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.ATTACK, tick);
      _this.scheduledActions = [];
    });
    _this.tickEngine.on("posttick", function (tick) {
      _this.moduleManager.onPostTick(tick);
    });
    _this.tickEngine.on("tick", _this.moduleManager.onTick.bind(_this.moduleManager));
    _this.mouseAngle = 0;
    document.addEventListener("keydown", function (event) {
      _this.emit("keydown", event);
      _this.moduleManager.onKeydown(event.keyCode);
    });
    document.addEventListener("keyup", function (event) {
      _this.emit("keyup", event);
      _this.moduleManager.onKeyup(event.keyCode);
    });

    // listen for packet send (post) - after its impossible to cancel
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetsendp", function (packet) {
      if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.BUY_AND_EQUIP) {
        if (packet.data[0] === 0) {
          if (!packet.data[2]) {
            _this.lastActionState.hat = packet.data[1];
          } else {
            _this.lastActionState.tail = packet.data[1];
          }
        }
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.ATTACK) {
        _this.lastActionState.attack = packet.data[0];
        _this.lastActionState.aim = packet.data[1];
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.SET_ANGLE) {
        _this.lastActionState.aim = packet.data[0];
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.SELECT_ITEM) {
        if (packet.data[1]) {
          _this.lastActionState.weapon = packet.data[0];
        }
      }
    });

    // cancels aim packets because it only spams packets
    // and messes up autobreak aim (kinda lazy solution)
    // should be fixed explicitly in the future and
    // remove the packet cancelling
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetsend", function (event) {
      var packet = event.getPacket();
      //console.log(packet);
      if (_this.packetBlocks.hasOwnProperty(packet.type)) {
        if (_this.packetBlocks[packet.type].length > 0) {
          event.cancel();
          return;
        }
      }
      _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__.PacketHandler.processOut(event.getPacket());
    });

    // listen for received packets (always process the packet before passing it to modules)
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetreceive", function (event) {
      _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__.PacketHandler.processIn(event.getPacket());
      _this.moduleManager.onPacketReceive(event);
    });
    setInterval(_this.update.bind(_assertThisInitialized(_this)), 1);
    return _this;
  }
  _createClass(Core, [{
    key: "patchBundle",
    value: function patchBundle(src, promise) {
      _injector_BundleProxy__WEBPACK_IMPORTED_MODULE_15__["default"].loadBundle(src, this.bundleAPI, promise);
    }
  }, {
    key: "initializeRenderer",
    value: function () {
      var _initializeRenderer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(canvas) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.renderManager = new _render_RenderManager__WEBPACK_IMPORTED_MODULE_11__["default"](this, canvas, 1920, 1080);

              //await this.renderManager.createRenderer("background", HoverInfoModule, this);
              _context.next = 3;
              return this.renderManager.createInterfaceRenderer("packetCount", _render_interface_PacketCountModule__WEBPACK_IMPORTED_MODULE_12__["default"], this);
            case 3:
              _context.next = 5;
              return this.renderManager.createInterfaceRenderer("packetGraph", _render_interface_PacketGraphModule__WEBPACK_IMPORTED_MODULE_17__["default"], this);
            case 5:
              this.renderManager.createRenderHook();
              this.renderManager.on("mousemove", function (event) {
                _this2.mouseAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_19__["default"].getDirection(new _util_type_Vector__WEBPACK_IMPORTED_MODULE_20__["default"](window.innerWidth / 2, window.innerHeight / 2), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_20__["default"](event.clientX, event.clientY));
              });
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function initializeRenderer(_x) {
        return _initializeRenderer.apply(this, arguments);
      }
      return initializeRenderer;
    }()
  }, {
    key: "update",
    value: function update() {
      var now = Date.now();
      var delta = now - this.lastUpdate;
      this.lastUpdate = now;

      // emit event to be used in other modules
      this.emit("update", delta);
      this.playerManager.update(delta);
      this.objectManager.update(delta);
      this.moduleManager.onUpdate(delta);
    }
  }, {
    key: "createPacketBlock",
    value: function createPacketBlock(type) {
      var id = this.packetBlockIdCounter++;
      if (!this.packetBlocks.hasOwnProperty(type)) {
        this.packetBlocks[type] = [];
      }
      this.packetBlocks[type].push(id);
      return id;
    }
  }, {
    key: "removePacketBlock",
    value: function removePacketBlock(type, id) {
      var index = this.packetBlocks[type].indexOf(id);
      if (index > -1) this.packetBlocks[type].splice(index, 1);
    }
  }, {
    key: "runUppermostAction",
    value: function runUppermostAction(action, tick) {
      var _this3 = this;
      // filter and sort by highest priority
      var sorted = this.scheduledActions.filter(function (a) {
        return a.type == action && a.executeTick == tick && function () {
          if (a.type === _ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.HAT && !_this3.playerManager.myPlayer.ownedHats.includes(a.data[0])) return false;
          if (a.type === _ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.TAIL && !_this3.playerManager.myPlayer.ownedTails.includes(a.data[0])) return false;
          if (a.type === _ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.WEAPON && !_this3.playerManager.myPlayer.inventory.hasWeapon(a.data[0])) return false;
          return true;
        }();
      }).sort(function (a, b) {
        return b.priority - a.priority;
      });
      if (sorted.length > 0) {
        // run action
        var _action = sorted[0];
        this.runAction(_action);

        // remove action from the list
        var index = this.scheduledActions.indexOf(_action);
        if (index > -1) {
          this.scheduledActions.splice(index, 1);
        }
      }
    }
  }, {
    key: "runAction",
    value: function runAction(action) {
      switch (action.type) {
        case _ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.HAT:
          if (action.data[0] === this.lastActionState.hat) return;
          _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.BUY_AND_EQUIP, [0, action.data[0], 0]));
          break;
        case _ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.TAIL:
          if (action.data[0] === this.lastActionState.tail) return;
          _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.BUY_AND_EQUIP, [0, action.data[0], 1]));
          break;
        case _ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.ATTACK:
          if (action.data[0] === this.lastActionState.attack && action.data[1] === this.lastActionState.aim) return;
          _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.ATTACK, action.data));
          break;
        case _ActionType__WEBPACK_IMPORTED_MODULE_8__.ActionType.WEAPON:
          if (action.data[0] === this.lastActionState.weapon) return;
          _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.SELECT_ITEM, [action.data[0], true]));
        default:
          return;
      }
      this.moduleManager.onActionRun(action);
    }
  }, {
    key: "scheduleAction",
    value: function scheduleAction(action, priority) {
      var tick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tickEngine.tickIndex + 1;
      var data = arguments.length > 3 ? arguments[3] : undefined;
      var ac = new _Action__WEBPACK_IMPORTED_MODULE_7__.Action(this.actionIdCounter++, action, priority, tick, data);
      this.scheduledActions.push(ac);
      return ac.id;
    }
  }]);
  return Core;
}((events__WEBPACK_IMPORTED_MODULE_0___default()));
_defineProperty(Core, "VER", "1.0");
_defineProperty(Core, "AUTHORS", ["Zaary", "Splex"]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/data/moomoo/accessories.ts":
/*!*************************************************!*\
  !*** ./frontend/src/data/moomoo/accessories.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var accessories = [{
  id: 12,
  name: "Snowball",
  price: 1000,
  scale: 105,
  xOff: 18,
  desc: "no effect"
}, {
  id: 9,
  name: "Tree Cape",
  price: 1000,
  scale: 90,
  desc: "no effect"
}, {
  id: 10,
  name: "Stone Cape",
  price: 1000,
  scale: 90,
  desc: "no effect"
}, {
  id: 3,
  name: "Cookie Cape",
  price: 1500,
  scale: 90,
  desc: "no effect"
}, {
  id: 8,
  name: "Cow Cape",
  price: 2000,
  scale: 90,
  desc: "no effect"
}, {
  id: 11,
  name: "Monkey Tail",
  price: 2000,
  scale: 97,
  xOff: 25,
  desc: "Super speed but reduced damage",
  spdMult: 1.35,
  dmgMultO: 0.2
}, {
  id: 17,
  name: "Apple Basket",
  price: 3000,
  scale: 80,
  xOff: 12,
  desc: "slowly regenerates health over time",
  healthRegen: 1
}, {
  id: 6,
  name: "Winter Cape",
  price: 3000,
  scale: 90,
  desc: "no effect"
}, {
  id: 4,
  name: "Skull Cape",
  price: 4000,
  scale: 90,
  desc: "no effect"
}, {
  id: 5,
  name: "Dash Cape",
  price: 5000,
  scale: 90,
  desc: "no effect"
}, {
  id: 2,
  name: "Dragon Cape",
  price: 6000,
  scale: 90,
  desc: "no effect"
}, {
  id: 1,
  name: "Super Cape",
  price: 8000,
  scale: 90,
  desc: "no effect"
}, {
  id: 7,
  name: "Troll Cape",
  price: 8000,
  scale: 90,
  desc: "no effect"
}, {
  id: 14,
  name: "Thorns",
  price: 10000,
  scale: 115,
  xOff: 20,
  desc: "no effect"
}, {
  id: 15,
  name: "Blockades",
  price: 10000,
  scale: 95,
  xOff: 15,
  desc: "no effect"
}, {
  id: 20,
  name: "Devils Tail",
  price: 10000,
  scale: 95,
  xOff: 20,
  desc: "no effect"
}, {
  id: 16,
  name: "Sawblade",
  price: 12000,
  scale: 90,
  spin: true,
  xOff: 0,
  desc: "deal damage to players that damage you",
  dmg: 0.15
}, {
  id: 13,
  name: "Angel Wings",
  price: 15000,
  scale: 138,
  xOff: 22,
  desc: "slowly regenerates health over time",
  healthRegen: 3
}, {
  id: 19,
  name: "Shadow Wings",
  price: 15000,
  scale: 138,
  xOff: 22,
  desc: "increased movement speed",
  spdMult: 1.1
}, {
  id: 18,
  name: "Blood Wings",
  price: 20000,
  scale: 178,
  xOff: 26,
  desc: "restores health when you deal damage",
  healD: 0.2
}, {
  id: 21,
  name: "Corrupt X Wings",
  price: 20000,
  scale: 178,
  xOff: 26,
  desc: "deal damage to players that damage you",
  dmg: 0.25
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accessories);

/***/ }),

/***/ "./frontend/src/data/moomoo/config.ts":
/*!********************************************!*\
  !*** ./frontend/src/data/moomoo/config.ts ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
var config = {
  maxScreenWidth: 1920,
  maxScreenHeight: 1080,
  serverUpdateRate: 9,
  maxPlayers: 40,
  maxPlayersHard: 50,
  collisionDepth: 6,
  minimapRate: 3000,
  colGrid: 10,
  clientSendRate: 5,
  healthBarWidth: 50,
  iconPadding: 15,
  iconPad: 0.9,
  deathFadeout: 3000,
  crownIconScale: 60,
  crownPad: 35,
  chatCountdown: 3000,
  chatCooldown: 500,
  inSandbox: window.location.origin.indexOf("sandbox") != -1,
  maxAge: 100,
  gatherAngle: Math.PI / 2.6,
  gatherWiggle: 10,
  hitReturnRatio: 0.25,
  hitAngle: Math.PI / 2,
  playerScale: 35,
  playerSpeed: 0.0016,
  playerDecel: 0.993,
  nameY: 34,
  skinColors: ["#bf8f54", "#cbb091", "#896c4b", "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3", "#8bc373"],
  animalCount: 7,
  aiTurnRandom: 0.06,
  cowNames: ["Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky"],
  shieldAngle: Math.PI / 3,
  weaponVariants: [{
    id: 0,
    src: "",
    xp: 0,
    val: 1
  }, {
    id: 1,
    src: "_g",
    xp: 3000,
    val: 1.1
  }, {
    id: 2,
    src: "_d",
    xp: 7000,
    val: 1.18
  }, {
    id: 3,
    src: "_r",
    poison: true,
    xp: 12000,
    val: 1.18
  }],
  fetchVariant: function fetchVariant(player) {
    var tmpXP = player.weaponXP[player.weaponIndex] || 0;
    for (var i = module.exports.weaponVariants.length - 1; i >= 0; --i) {
      if (tmpXP >= module.exports.weaponVariants[i].xp) return config.weaponVariants[i];
    }
  },
  resourceTypes: ["wood", "food", "stone", "points"],
  areaCount: 7,
  treesPerArea: 9,
  bushesPerArea: 3,
  totalRocks: 32,
  goldOres: 7,
  riverWidth: 724,
  riverPadding: 114,
  waterCurrent: 0.0011,
  waveSpeed: 0.0001,
  waveMax: 1.3,
  treeScales: [150, 160, 165, 175],
  bushScales: [80, 85, 95],
  rockScales: [80, 85, 90],
  snowBiomeTop: 2400,
  snowSpeed: 0.75,
  maxNameLength: 15,
  mapScale: 14400,
  mapPingScale: 40,
  mapPingTime: 2200
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);

/***/ }),

/***/ "./frontend/src/data/moomoo/hats.ts":
/*!******************************************!*\
  !*** ./frontend/src/data/moomoo/hats.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var hats = [{
  id: 45,
  name: "Shame!",
  dontSell: true,
  price: 0,
  scale: 120,
  desc: "hacks are for losers"
}, {
  id: 51,
  name: "Moo Cap",
  price: 0,
  scale: 120,
  desc: "coolest mooer around"
}, {
  id: 50,
  name: "Apple Cap",
  price: 0,
  scale: 120,
  desc: "apple farms remembers"
}, {
  id: 28,
  name: "Moo Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 29,
  name: "Pig Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 30,
  name: "Fluff Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 36,
  name: "Pandou Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 37,
  name: "Bear Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 38,
  name: "Monkey Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 44,
  name: "Polar Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 35,
  name: "Fez Hat",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 42,
  name: "Enigma Hat",
  price: 0,
  scale: 120,
  desc: "join the enigma army"
}, {
  id: 43,
  name: "Blitz Hat",
  price: 0,
  scale: 120,
  desc: "hey everybody i'm blitz"
}, {
  id: 49,
  name: "Bob XIII Hat",
  price: 0,
  scale: 120,
  desc: "like and subscribe"
}, {
  id: 57,
  name: "Pumpkin",
  price: 50,
  scale: 120,
  desc: "Spooooky"
}, {
  id: 8,
  name: "Bummle Hat",
  price: 100,
  scale: 120,
  desc: "no effect"
}, {
  id: 2,
  name: "Straw Hat",
  price: 500,
  scale: 120,
  desc: "no effect"
}, {
  id: 15,
  name: "Winter Cap",
  price: 600,
  scale: 120,
  desc: "allows you to move at normal speed in snow",
  coldM: 1
}, {
  id: 5,
  name: "Cowboy Hat",
  price: 1000,
  scale: 120,
  desc: "no effect"
}, {
  id: 4,
  name: "Ranger Hat",
  price: 2000,
  scale: 120,
  desc: "no effect"
}, {
  id: 18,
  name: "Explorer Hat",
  price: 2000,
  scale: 120,
  desc: "no effect"
}, {
  id: 31,
  name: "Flipper Hat",
  price: 2500,
  scale: 120,
  desc: "have more control while in water",
  watrImm: true
}, {
  id: 1,
  name: "Marksman Cap",
  price: 3000,
  scale: 120,
  desc: "increases arrow speed and range",
  aMlt: 1.3
}, {
  id: 10,
  name: "Bush Gear",
  price: 3000,
  scale: 160,
  desc: "allows you to disguise yourself as a bush"
}, {
  id: 48,
  name: "Halo",
  price: 3000,
  scale: 120,
  desc: "no effect"
}, {
  id: 6,
  name: "Soldier Helmet",
  price: 4000,
  scale: 120,
  desc: "reduces damage taken but slows movement",
  spdMult: 0.94,
  dmgMult: 0.75
}, {
  id: 23,
  name: "Anti Venom Gear",
  price: 4000,
  scale: 120,
  desc: "makes you immune to poison",
  poisonRes: 1
}, {
  id: 13,
  name: "Medic Gear",
  price: 5000,
  scale: 110,
  desc: "slowly regenerates health over time",
  healthRegen: 3
}, {
  id: 9,
  name: "Miners Helmet",
  price: 5000,
  scale: 120,
  desc: "earn 1 extra gold per resource",
  extraGold: 1
}, {
  id: 32,
  name: "Musketeer Hat",
  price: 5000,
  scale: 120,
  desc: "reduces cost of projectiles",
  projCost: 0.5
}, {
  id: 7,
  name: "Bull Helmet",
  price: 6000,
  scale: 120,
  desc: "increases damage done but drains health",
  healthRegen: -5,
  dmgMultO: 1.5,
  spdMult: 0.96
}, {
  id: 22,
  name: "Emp Helmet",
  price: 6000,
  scale: 120,
  desc: "turrets won't attack but you move slower",
  antiTurret: 1,
  spdMult: 0.7
}, {
  id: 12,
  name: "Booster Hat",
  price: 6000,
  scale: 120,
  desc: "increases your movement speed",
  spdMult: 1.16
}, {
  id: 26,
  name: "Barbarian Armor",
  price: 8000,
  scale: 120,
  desc: "knocks back enemies that attack you",
  dmgK: 0.6
}, {
  id: 21,
  name: "Plague Mask",
  price: 10000,
  scale: 120,
  desc: "melee attacks deal poison damage",
  poisonDmg: 5,
  poisonTime: 6
}, {
  id: 46,
  name: "Bull Mask",
  price: 10000,
  scale: 120,
  desc: "bulls won't target you unless you attack them",
  bullRepel: 1
}, {
  id: 14,
  name: "Windmill Hat",
  topSprite: true,
  price: 10000,
  scale: 120,
  desc: "generates points while worn",
  pps: 1.5
}, {
  id: 11,
  name: "Spike Gear",
  topSprite: true,
  price: 10000,
  scale: 120,
  desc: "deal damage to players that damage you",
  dmg: 0.45
}, {
  id: 53,
  name: "Turret Gear",
  topSprite: true,
  price: 10000,
  scale: 120,
  desc: "you become a walking turret",
  turret: {
    proj: 1,
    range: 700,
    rate: 2500
  },
  spdMult: 0.7
}, {
  id: 20,
  name: "Samurai Armor",
  price: 12000,
  scale: 120,
  desc: "increased attack speed and fire rate",
  atkSpd: 0.78
}, {
  id: 58,
  name: "Dark Knight",
  price: 12000,
  scale: 120,
  desc: "restores health when you deal damage",
  healD: 0.4
}, {
  id: 27,
  name: "Scavenger Gear",
  price: 15000,
  scale: 120,
  desc: "earn double points for each kill",
  kScrM: 2
}, {
  id: 40,
  name: "Tank Gear",
  price: 15000,
  scale: 120,
  desc: "increased damage to buildings but slower movement",
  spdMult: 0.3,
  bDmg: 3.3
}, {
  id: 52,
  name: "Thief Gear",
  price: 15000,
  scale: 120,
  desc: "steal half of a players gold when you kill them",
  goldSteal: 0.5
}, {
  id: 55,
  name: "Bloodthirster",
  price: 20000,
  scale: 120,
  desc: "Restore Health when dealing damage. And increased damage",
  healD: 0.25,
  dmgMultO: 1.2
}, {
  id: 56,
  name: "Assassin Gear",
  price: 20000,
  scale: 120,
  desc: "Go invisible when not moving. Can't eat. Increased speed",
  noEat: true,
  spdMult: 1.1,
  invisTimer: 1000
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hats);

/***/ }),

/***/ "./frontend/src/data/moomoo/items.ts":
/*!*******************************************!*\
  !*** ./frontend/src/data/moomoo/items.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "items": () => (/* binding */ items)
/* harmony export */ });
var groups = [{
  id: 0,
  name: "food",
  place: false,
  limit: -1,
  layer: 0
}, {
  id: 1,
  name: "walls",
  place: true,
  limit: 30,
  layer: 0
}, {
  id: 2,
  name: "spikes",
  place: true,
  limit: 15,
  layer: 0
}, {
  id: 3,
  name: "mill",
  place: true,
  limit: 7,
  layer: 1
}, {
  id: 4,
  name: "mine",
  place: true,
  limit: 1,
  layer: 0
}, {
  id: 5,
  name: "trap",
  place: true,
  limit: 6,
  layer: -1
}, {
  id: 6,
  name: "booster",
  place: true,
  limit: 12,
  layer: -1
}, {
  id: 7,
  name: "turret",
  place: true,
  limit: 2,
  layer: 1
}, {
  id: 8,
  name: "watchtower",
  place: true,
  limit: 12,
  layer: 1
}, {
  id: 9,
  name: "buff",
  place: true,
  limit: 4,
  layer: -1
}, {
  id: 10,
  name: "spawn",
  place: true,
  limit: 1,
  layer: -1
}, {
  id: 11,
  name: "sapling",
  place: true,
  limit: 2,
  layer: 0
}, {
  id: 12,
  name: "blocker",
  place: true,
  limit: 3,
  layer: -1
}, {
  id: 13,
  name: "teleporter",
  place: true,
  limit: 2,
  layer: -1
}];
var projectiles = [{
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 25,
  speed: 1.6,
  scale: 103,
  range: 1000
}, {
  indx: 1,
  layer: 1,
  dmg: 25,
  scale: 20
}, {
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 35,
  speed: 2.5,
  scale: 103,
  range: 1200
}, {
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 30,
  speed: 2,
  scale: 103,
  range: 1200
}, {
  indx: 1,
  layer: 1,
  dmg: 16,
  scale: 20
}, {
  indx: 0,
  layer: 0,
  src: "bullet_1",
  dmg: 50,
  speed: 3.6,
  scale: 160,
  range: 1400
}];
var list = [{
  id: -1,
  group: groups[0],
  name: "apple",
  desc: "restores 20 health when consumed",
  req: ["food", 10],
  /*consume: function(doer: Player) {
  	return doer.changeHealth(20, doer);
  },*/
  scale: 22,
  holdOffset: 15
}, {
  id: -1,
  age: 3,
  group: groups[0],
  name: "cookie",
  desc: "restores 40 health when consumed",
  req: ["food", 15],
  /*consume: function(doer: Player) {
  	return doer.changeHealth(40, doer);
  },*/
  scale: 27,
  holdOffset: 15
}, {
  id: -1,
  age: 7,
  group: groups[0],
  name: "cheese",
  desc: "restores 30 health and another 50 over 5 seconds",
  req: ["food", 25],
  /*consume: function(doer: Player) {
  	if (doer.changeHealth(30, doer) || doer.health < 100) {
  		doer.dmgOverTime.dmg = -10;
  		doer.dmgOverTime.doer = doer;
  		doer.dmgOverTime.time = 5;
  		return true;
  	}
  	return false;
  },*/
  scale: 27,
  holdOffset: 15
}, {
  id: -1,
  group: groups[1],
  name: "wood wall",
  desc: "provides protection for your village",
  req: ["wood", 10],
  projDmg: true,
  health: 380,
  scale: 50,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 3,
  group: groups[1],
  name: "stone wall",
  desc: "provides improved protection for your village",
  req: ["stone", 25],
  health: 900,
  scale: 50,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 7,
  pre: 1,
  group: groups[1],
  name: "castle wall",
  desc: "provides powerful protection for your village",
  req: ["stone", 35],
  health: 1500,
  scale: 52,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  group: groups[2],
  name: "spikes",
  desc: "damages enemies when they touch them",
  req: ["wood", 20, "stone", 5],
  health: 400,
  dmg: 20,
  scale: 49,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  id: -1,
  age: 5,
  group: groups[2],
  name: "greater spikes",
  desc: "damages enemies when they touch them",
  req: ["wood", 30, "stone", 10],
  health: 500,
  dmg: 35,
  scale: 52,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  id: -1,
  age: 9,
  pre: 1,
  group: groups[2],
  name: "poison spikes",
  desc: "poisons enemies when they touch them",
  req: ["wood", 35, "stone", 15],
  health: 600,
  dmg: 30,
  pDmg: 5,
  scale: 52,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  id: -1,
  age: 9,
  pre: 2,
  group: groups[2],
  name: "spinning spikes",
  desc: "damages enemies when they touch them",
  req: ["wood", 30, "stone", 20],
  health: 500,
  dmg: 45,
  turnSpeed: 0.003,
  scale: 52,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  id: -1,
  group: groups[3],
  name: "windmill",
  desc: "generates gold over time",
  req: ["wood", 50, "stone", 10],
  health: 400,
  pps: 1,
  turnSpeed: 0.0016,
  spritePadding: 25,
  iconLineMult: 12,
  scale: 45,
  holdOffset: 20,
  placeOffset: 5
}, {
  id: -1,
  age: 5,
  pre: 1,
  group: groups[3],
  name: "faster windmill",
  desc: "generates more gold over time",
  req: ["wood", 60, "stone", 20],
  health: 500,
  pps: 1.5,
  turnSpeed: 0.0025,
  spritePadding: 25,
  iconLineMult: 12,
  scale: 47,
  holdOffset: 20,
  placeOffset: 5
}, {
  id: -1,
  age: 8,
  pre: 1,
  group: groups[3],
  name: "power mill",
  desc: "generates more gold over time",
  req: ["wood", 100, "stone", 50],
  health: 800,
  pps: 2,
  turnSpeed: 0.005,
  spritePadding: 25,
  iconLineMult: 12,
  scale: 47,
  holdOffset: 20,
  placeOffset: 5
}, {
  id: -1,
  age: 5,
  group: groups[4],
  type: 2,
  name: "mine",
  desc: "allows you to mine stone",
  req: ["wood", 20, "stone", 100],
  iconLineMult: 12,
  scale: 65,
  holdOffset: 20,
  placeOffset: 0
}, {
  id: -1,
  age: 5,
  group: groups[11],
  type: 0,
  name: "sapling",
  desc: "allows you to farm wood",
  req: ["wood", 150],
  iconLineMult: 12,
  colDiv: 0.5,
  scale: 110,
  holdOffset: 50,
  placeOffset: -15
}, {
  id: -1,
  age: 4,
  group: groups[5],
  name: "pit trap",
  desc: "pit that traps enemies if they walk over it",
  req: ["wood", 30, "stone", 30],
  trap: true,
  ignoreCollision: true,
  hideFromEnemy: true,
  health: 500,
  colDiv: 0.2,
  scale: 50,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 4,
  group: groups[6],
  name: "boost pad",
  desc: "provides boost when stepped on",
  req: ["stone", 20, "wood", 5],
  ignoreCollision: true,
  boostSpeed: 1.5,
  health: 150,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 7,
  group: groups[7],
  doUpdate: true,
  name: "turret",
  desc: "defensive structure that shoots at enemies",
  req: ["wood", 200, "stone", 150],
  health: 800,
  projectile: 1,
  shootRange: 700,
  shootRate: 2200,
  scale: 43,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 7,
  group: groups[8],
  name: "platform",
  desc: "platform to shoot over walls and cross over water",
  req: ["wood", 20],
  ignoreCollision: true,
  zIndex: 1,
  health: 300,
  scale: 43,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 7,
  group: groups[9],
  name: "healing pad",
  desc: "standing on it will slowly heal you",
  req: ["wood", 30, "food", 10],
  ignoreCollision: true,
  healCol: 15,
  health: 400,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 9,
  group: groups[10],
  name: "spawn pad",
  desc: "you will spawn here when you die but it will dissapear",
  req: ["wood", 100, "stone", 100],
  health: 400,
  ignoreCollision: true,
  spawnPoint: true,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 7,
  group: groups[12],
  name: "blocker",
  desc: "blocks building in radius",
  req: ["wood", 30, "stone", 25],
  ignoreCollision: true,
  blocker: 300,
  health: 400,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  id: -1,
  age: 7,
  group: groups[13],
  name: "teleporter",
  desc: "teleports you to a random point on the map",
  req: ["wood", 60, "stone", 60],
  ignoreCollision: true,
  teleport: true,
  health: 200,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}];
for (var i = 0; i < list.length; ++i) {
  Object.defineProperty(list[i], "id", {
    value: i
  });
  // @ts-ignore
  if (list[i].pre) list[i].pre = i - list[i].pre;
}
var items = {
  groups: groups,
  projectiles: projectiles,
  list: list
};


/***/ }),

/***/ "./frontend/src/data/type/GameObject.ts":
/*!**********************************************!*\
  !*** ./frontend/src/data/type/GameObject.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameObject": () => (/* binding */ GameObject),
/* harmony export */   "NaturalObject": () => (/* binding */ NaturalObject),
/* harmony export */   "PlayerBuilding": () => (/* binding */ PlayerBuilding)
/* harmony export */ });
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _moomoo_items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../moomoo/items */ "./frontend/src/data/moomoo/items.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var GameObject = /*#__PURE__*/function () {
  // base properties

  // for object manager

  function GameObject(sid, type, position, dir, scale) {
    _classCallCheck(this, GameObject);
    _defineProperty(this, "dir", 0);
    _defineProperty(this, "scale", 0);
    _defineProperty(this, "wiggles", []);
    _defineProperty(this, "gridLocations", []);
    this.sid = sid;
    this.type = type;
    this.position = position;
    this.dir = dir;
    this.scale = scale;
    this.wiggle = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
  }
  _createClass(GameObject, [{
    key: "update",
    value: function update(delta) {
      if (!this.wiggle.isNull()) {
        this.wiggle.multiply(Math.pow(0.99, delta));
      }
    }
  }, {
    key: "getScale",
    value: function getScale() {
      var _items$list$this$type;
      var fullScale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this instanceof NaturalObject ? this.type === 0 ? this.scale * 0.6 : this.scale : this.scale * (fullScale ? 1 : (_items$list$this$type = _moomoo_items__WEBPACK_IMPORTED_MODULE_1__.items.list[this.type].colDiv) !== null && _items$list$this$type !== void 0 ? _items$list$this$type : 1);
    }
  }]);
  return GameObject;
}();
var NaturalObject = /*#__PURE__*/function (_GameObject) {
  _inherits(NaturalObject, _GameObject);
  var _super = _createSuper(NaturalObject);
  function NaturalObject(sid, position, dir, scale, type) {
    var _this;
    _classCallCheck(this, NaturalObject);
    _this = _super.call(this, sid, type, position, dir, scale);
    _this.type = type;
    return _this;
  }
  return _createClass(NaturalObject);
}(GameObject);
var PlayerBuilding = /*#__PURE__*/function (_GameObject2) {
  _inherits(PlayerBuilding, _GameObject2);
  var _super2 = _createSuper(PlayerBuilding);
  function PlayerBuilding(sid, position, dir, scale, type, owner) {
    var _this2$stats$health;
    var _this2;
    _classCallCheck(this, PlayerBuilding);
    _this2 = _super2.call(this, sid, type, position, dir, scale);
    _this2.stats = _moomoo_items__WEBPACK_IMPORTED_MODULE_1__.items.list[type];
    _this2.owner = {
      sid: owner
    };
    _this2.meta = {
      shouldUpdate: _this2.stats.group.id === 3 // group 3 is windmills
    };

    _this2.health = (_this2$stats$health = _this2.stats.health) !== null && _this2$stats$health !== void 0 ? _this2$stats$health : 1;
    return _this2;
  }
  _createClass(PlayerBuilding, [{
    key: "update",
    value: function update(delta) {
      _get(_getPrototypeOf(PlayerBuilding.prototype), "update", this).call(this, delta);
      if (this.stats.turnSpeed) {
        this.dir += this.stats.turnSpeed * delta;
      }
    }
  }]);
  return PlayerBuilding;
}(GameObject);


/***/ }),

/***/ "./frontend/src/data/type/MoomooUtil.ts":
/*!**********************************************!*\
  !*** ./frontend/src/data/type/MoomooUtil.ts ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "util": () => (/* binding */ util)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
var randInt = function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var randFloat = function randFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
};
var lerp = function lerp(value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
};
var decel = function decel(val, cel) {
  if (val > 0) val = Math.max(0, val - cel);else if (val < 0) val = Math.min(0, val + cel);
  return val;
};
var getDistance = function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
};
var getDirection = function getDirection(x1, y1, x2, y2) {
  return Math.atan2(y1 - y2, x1 - x2);
};
var getAngleDist = function getAngleDist(a, b) {
  var p = Math.abs(b - a) % (Math.PI * 2);
  return p > Math.PI ? Math.PI * 2 - p : p;
};
var isNumber = function isNumber(n) {
  return typeof n == "number" && !isNaN(n) && isFinite(n);
};
var isString = function isString(s) {
  return s && typeof s == "string";
};
var kFormat = function kFormat(num) {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
};
var capitalizeFirst = function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
var fixTo = function fixTo(n, v) {
  return parseFloat(n.toFixed(v));
};
var sortByPoints = function sortByPoints(a, b) {
  return parseFloat(b.points) - parseFloat(a.points);
};
var lineInRect = function lineInRect(recX, recY, recX2, recY2, x1, y1, x2, y2) {
  var minX = x1;
  var maxX = x2;
  if (x1 > x2) {
    minX = x2;
    maxX = x1;
  }
  if (maxX > recX2) maxX = recX2;
  if (minX < recX) minX = recX;
  if (minX > maxX) return false;
  var minY = y1;
  var maxY = y2;
  var dx = x2 - x1;
  if (Math.abs(dx) > 0.0000001) {
    var a = (y2 - y1) / dx;
    var b = y1 - a * x1;
    minY = a * minX + b;
    maxY = a * maxX + b;
  }
  if (minY > maxY) {
    var tmp = maxY;
    maxY = minY;
    minY = tmp;
  }
  if (maxY > recY2) maxY = recY2;
  if (minY < recY) minY = recY;
  if (minY > maxY) return false;
  return true;
};
var containsPoint = function containsPoint(element, x, y) {
  var bounds = element.getBoundingClientRect();
  var left = bounds.left + window.scrollX;
  var top = bounds.top + window.scrollY;
  var width = bounds.width;
  var height = bounds.height;
  var insideHorizontal = x > left && x < left + width;
  var insideVertical = y > top && y < top + height;
  return insideHorizontal && insideVertical;
};
var mousifyTouchEvent = function mousifyTouchEvent(event) {
  var touch = event.changedTouches[0];
  event.screenX = touch.screenX;
  event.screenY = touch.screenY;
  event.clientX = touch.clientX;
  event.clientY = touch.clientY;
  event.pageX = touch.pageX;
  event.pageY = touch.pageY;
};
var removeAllChildren = function removeAllChildren(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
};
var generateElement = function generateElement(config) {
  var element = document.createElement(config.tag || "div");
  function bind(configValue, elementValue) {
    if (config[configValue]) element[elementValue] = config[configValue];
  }
  bind("text", "textContent");
  bind("html", "innerHTML");
  bind("class", "className");
  for (var key in config) {
    switch (key) {
      case "tag":
      case "text":
      case "html":
      case "class":
      case "style":
      case "hookTouch":
      case "parent":
      case "children":
        continue;
      default:
        break;
    }
    element[key] = config[key];
  }
  if (element.onclick) element.onclick = module.exports.checkTrusted(element.onclick);
  if (element.onmouseover) element.onmouseover = module.exports.checkTrusted(element.onmouseover);
  if (element.onmouseout) element.onmouseout = module.exports.checkTrusted(element.onmouseout);
  if (config.style) {
    element.style.cssText = config.style;
  }
  if (config.hookTouch) {
    module.exports.hookTouchEvents(element);
  }
  if (config.parent) {
    config.parent.appendChild(element);
  }
  if (config.children) {
    for (var i = 0; i < config.children.length; i++) {
      element.appendChild(config.children[i]);
    }
  }
  return element;
};
var eventIsTrusted = function eventIsTrusted(ev) {
  if (ev && typeof ev.isTrusted == "boolean") {
    return ev.isTrusted;
  } else {
    return true;
  }
};
var checkTrusted = function checkTrusted(callback) {
  return function (ev) {
    if (ev && ev instanceof Event && module.exports.eventIsTrusted(ev)) {
      callback(ev);
    } else {
      //console.error("Event is not trusted.", ev);
    }
  };
};
var randomString = function randomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
var countInArray = function countInArray(array, val) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === val) count++;
  }
  return count;
};
var util = {
  randInt: randInt,
  randFloat: randFloat,
  lerp: lerp,
  decel: decel,
  getDistance: getDistance,
  getDirection: getDirection,
  getAngleDist: getAngleDist,
  isNumber: isNumber,
  isString: isString,
  kFormat: kFormat,
  capitalizeFirst: capitalizeFirst,
  fixTo: fixTo,
  sortByPoints: sortByPoints,
  lineInRect: lineInRect,
  containsPoint: containsPoint,
  mousifyTouchEvent: mousifyTouchEvent,
  removeAllChildren: removeAllChildren,
  generateElement: generateElement,
  eventIsTrusted: eventIsTrusted,
  checkTrusted: checkTrusted,
  randomString: randomString,
  countInArray: countInArray
};


/***/ }),

/***/ "./frontend/src/data/type/Player.ts":
/*!******************************************!*\
  !*** ./frontend/src/data/type/Player.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientPlayer": () => (/* binding */ ClientPlayer),
/* harmony export */   "Inventory": () => (/* binding */ Inventory),
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _moomoo_accessories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../moomoo/accessories */ "./frontend/src/data/moomoo/accessories.ts");
/* harmony import */ var _moomoo_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _moomoo_hats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../moomoo/hats */ "./frontend/src/data/moomoo/hats.ts");
/* harmony import */ var _moomoo_items__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _Weapon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_processor_MovementProcessor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/processor/MovementProcessor */ "./frontend/src/util/processor/MovementProcessor.ts");
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./GameObject */ "./frontend/src/data/type/GameObject.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }









var WeaponFinder;
(function (WeaponFinder) {
  WeaponFinder[WeaponFinder["BUILDING_BREAK"] = 0] = "BUILDING_BREAK";
  WeaponFinder[WeaponFinder["MOVEMENT_SPEED"] = 1] = "MOVEMENT_SPEED";
})(WeaponFinder || (WeaponFinder = {}));
var Inventory = /*#__PURE__*/function () {
  function Inventory(player) {
    _classCallCheck(this, Inventory);
    this.player = player;
    this.weapons = [_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER, null];
    this.reloads = Object.fromEntries(new Array(_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList.length).fill(undefined).map(function (_x, i) {
      return [i, 0];
    }));
    this.items = [0, 3, 6, 10];
    this.heldItem = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
    this.weaponSelected = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
  }
  _createClass(Inventory, [{
    key: "reset",
    value: function reset() {
      this.weapons = [_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER, null];
      this.reloads = Object.fromEntries(new Array(_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList.length).fill(undefined).map(function (_x, i) {
        return [i, 0];
      }));
      ;
      this.items = [0, 3, 6, 10];
      this.heldItem = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
      this.weaponSelected = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
    }
  }, {
    key: "setWeapons",
    value: function setWeapons(weapons) {
      this.weapons = [_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weapons[0]], _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weapons[1]]];
    }
  }, {
    key: "setItems",
    value: function setItems(items) {
      this.items = items;
    }
  }, {
    key: "resetReload",
    value: function resetReload(item) {
      this.reloads[item.id] = item.stats.reloadTime;
    }
  }, {
    key: "updateReloads",
    value: function updateReloads(delta) {
      if (!(this.heldItem instanceof _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapon)) return;
      var id = this.heldItem.id;
      if (this.reloads[id] > 0) {
        this.reloads[id] -= delta;
        if (this.reloads[id] <= 0) this.reloads[id] = 0;
      }
    }
  }, {
    key: "remainingReloadTime",
    value: function remainingReloadTime(slot) {
      var _this$weapons$slot;
      return this.reloads[(_this$weapons$slot = this.weapons[slot]) === null || _this$weapons$slot === void 0 ? void 0 : _this$weapons$slot.id];
    }
  }, {
    key: "findBestWeapon",
    value: function findBestWeapon(finder) {
      switch (finder) {
        case WeaponFinder.BUILDING_BREAK:
          return this.weapons.flat(1).filter(function (x) {
            return x !== null && x instanceof _Weapon__WEBPACK_IMPORTED_MODULE_5__.MeleeWeapon;
          }).sort(function (a, b) {
            return b.stats.dmg * b.stats.buildingDmgMultiplier - a.stats.dmg * a.stats.buildingDmgMultiplier;
          })[0];
        case WeaponFinder.MOVEMENT_SPEED:
          return this.weapons.flat(1).filter(function (x) {
            return x !== null;
          }).sort(function (a, b) {
            return b.stats.speedMultiplier - a.stats.speedMultiplier;
          })[0];
      }
    }
  }, {
    key: "getWeapon",
    value: function getWeapon(slot) {
      return this.weapons[slot];
    }
  }, {
    key: "hasWeapon",
    value: function hasWeapon(weapon) {
      var wep = typeof weapon === "number" ? _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weapon] : weapon;
      return this.weapons[0].id === wep.id || this.weapons[1] && this.weapons[1].id === wep.id;
    }
  }]);
  return Inventory;
}();
_defineProperty(Inventory, "WeaponFinders", WeaponFinder);
var Player = /*#__PURE__*/function () {
  /*public hat: Hat;
  public tail: Accessory;*/

  //public isLeader: boolean = false;

  //public serverPosition: Vector; // x2, y2
  //public clientPosition: Vector; // x1, y1
  //public renderPosition: Vector; // x, y

  /*public zIndex: number = 0;
  public xVel: number = 0;
  public yVel: number = 0;*/

  function Player(id, sid, name, position, dir, health, maxHealth, scale, skinColor) {
    _classCallCheck(this, Player);
    _defineProperty(this, "dir", 0);
    _defineProperty(this, "maxHealth", 100);
    _defineProperty(this, "health", this.maxHealth);
    _defineProperty(this, "scale", _moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].playerScale);
    _defineProperty(this, "speed", _moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed);
    _defineProperty(this, "reloads", {});
    _defineProperty(this, "visible", false);
    this.id = id;
    this.sid = sid;
    this.name = name;
    this.serverPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.lastTickServerPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.renderPos = position;
    this.lerpPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.velocity = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.dir = dir;
    this.health = health;
    this.maxHealth = maxHealth;
    this.scale = scale;
    this.skinColor = skinColor;
    this.team = null;
    this.lastTickPosX = 0;
    this.lastTickPosY = 0;
    this.inventory = new Inventory(this);
    this.movementProcessor = new _util_processor_MovementProcessor__WEBPACK_IMPORTED_MODULE_7__["default"](this);
    this.state = {
      isTrapped: false,
      buildIndex: -1,
      data: {
        trap: undefined
      }
    };
  }
  _createClass(Player, [{
    key: "updatePlayer",
    value: function updatePlayer(objectManager, x, y, dir, buildIndex, weaponIndex, _weaponVariant, _team, _isLeader, _skinIndex, _tailIndex, _iconIndex, _zIndex) {
      this.lerpPos = this.renderPos.clone();
      this.lastTickServerPos = this.serverPos.clone();
      this.serverPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y);
      this.velocity = this.serverPos.clone().subtract(this.lastTickServerPos);
      this.dir = dir;
      this.state.buildIndex = buildIndex;
      var holdsWeapon = buildIndex === -1;
      this.inventory.heldItem = holdsWeapon ? _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weaponIndex] : _moomoo_items__WEBPACK_IMPORTED_MODULE_3__.items.list[buildIndex];
      this.inventory.weaponSelected = _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weaponIndex];

      /*player.buildIndex = playerData[4];
      player.weaponIndex = playerData[5];
      player.weaponVariant = playerData[6];
      player.team = playerData[7];
      player.isLeader = playerData[8];
      player.skinIndex = playerData[9];
      player.tailIndex = playerData[10];
      player.iconIndex = playerData[11];
      player.zIndex = playerData[12];*/
      //player.visible = true;

      //this.movementProcessor.update(this.dt);
      this.dt = 0;
      this.state.isTrapped = false;
      this.state.data.trap = undefined;

      // objects
      var grids = objectManager.getGridArrays(this.serverPos.x, this.serverPos.y, this.scale + this.velocity.length() * 2).flat(1);
      for (var i = 0; i < grids.length; i++) {
        var object = grids[i];
        if (object instanceof _GameObject__WEBPACK_IMPORTED_MODULE_8__.NaturalObject) continue;
        var isCollision = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(this.serverPos, object.position) < this.scale + object.getScale();
        if (object.type === 15 && isCollision && object.owner.sid !== this.sid) this.state.isTrapped = true, this.state.data.trap = object;
      }
    }
  }, {
    key: "updateData",
    value: function updateData(id, sid, name, position, dir, health, maxHealth, scale, skinColor) {
      this.id = id;
      this.sid = sid;
      this.name = name;
      this.serverPos = position;
      this.dir = dir;
      this.health = health;
      this.maxHealth = maxHealth;
      this.scale = scale;
      this.skinColor = skinColor;
    }
  }]);
  return Player;
}();
var ClientPlayer = /*#__PURE__*/function (_Player) {
  _inherits(ClientPlayer, _Player);
  var _super = _createSuper(ClientPlayer);
  function ClientPlayer(id, sid, name, position, dir, health, maxHealth, scale, skinColor) {
    var _this;
    _classCallCheck(this, ClientPlayer);
    _this = _super.call(this, id, sid, name, position, dir, health, maxHealth, scale, skinColor);
    _this.alive = false;
    _this.isAttacking = false;
    _this.ownedHats = _moomoo_hats__WEBPACK_IMPORTED_MODULE_2__["default"].filter(function (x) {
      return x.price === 0;
    }).map(function (x) {
      return x.id;
    });
    _this.ownedTails = _moomoo_accessories__WEBPACK_IMPORTED_MODULE_0__["default"].filter(function (x) {
      return x.price === 0;
    }).map(function (x) {
      return x.id;
    });
    return _this;
  }
  return _createClass(ClientPlayer);
}(Player);


/***/ }),

/***/ "./frontend/src/data/type/Weapon.ts":
/*!******************************************!*\
  !*** ./frontend/src/data/type/Weapon.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MeleeWeapon": () => (/* binding */ MeleeWeapon),
/* harmony export */   "RangedWeapon": () => (/* binding */ RangedWeapon),
/* harmony export */   "Weapon": () => (/* binding */ Weapon),
/* harmony export */   "WeaponSlot": () => (/* binding */ WeaponSlot),
/* harmony export */   "Weapons": () => (/* binding */ Weapons),
/* harmony export */   "weaponList": () => (/* binding */ weaponList)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var WeaponType;
(function (WeaponType) {
  WeaponType[WeaponType["TOOL_HAMMER"] = 0] = "TOOL_HAMMER";
  WeaponType[WeaponType["HAND_AXE"] = 1] = "HAND_AXE";
  WeaponType[WeaponType["GREAT_AXE"] = 2] = "GREAT_AXE";
  WeaponType[WeaponType["SHORT_SWORD"] = 3] = "SHORT_SWORD";
  WeaponType[WeaponType["KATANA"] = 4] = "KATANA";
  WeaponType[WeaponType["POLEARM"] = 5] = "POLEARM";
  WeaponType[WeaponType["BAT"] = 6] = "BAT";
  WeaponType[WeaponType["DAGGERS"] = 7] = "DAGGERS";
  WeaponType[WeaponType["STICK"] = 8] = "STICK";
  WeaponType[WeaponType["HUNTING_BOW"] = 9] = "HUNTING_BOW";
  WeaponType[WeaponType["GREAT_HAMMER"] = 10] = "GREAT_HAMMER";
  WeaponType[WeaponType["SHIELD"] = 11] = "SHIELD";
  WeaponType[WeaponType["CROSSBOW"] = 12] = "CROSSBOW";
  WeaponType[WeaponType["REPEATER_CROSSBOW"] = 13] = "REPEATER_CROSSBOW";
  WeaponType[WeaponType["MC_GRABBY"] = 14] = "MC_GRABBY";
  WeaponType[WeaponType["MUSKET"] = 15] = "MUSKET";
})(WeaponType || (WeaponType = {}));
var WeaponSlot;
(function (WeaponSlot) {
  WeaponSlot[WeaponSlot["PRIMARY"] = 0] = "PRIMARY";
  WeaponSlot[WeaponSlot["SECONDARY"] = 1] = "SECONDARY";
})(WeaponSlot || (WeaponSlot = {}));
var Weapon = /*#__PURE__*/_createClass(function Weapon(id, slot, type, stats) {
  _classCallCheck(this, Weapon);
  this.id = id;
  this.slot = slot;
  this.type = type;
  this.stats = stats;
});
var MeleeWeapon = /*#__PURE__*/function (_Weapon) {
  _inherits(MeleeWeapon, _Weapon);
  var _super = _createSuper(MeleeWeapon);
  function MeleeWeapon(id, slot, type, stats) {
    var _this;
    _classCallCheck(this, MeleeWeapon);
    _this = _super.call(this, id, slot, type, stats);
    _this.stats = stats;
    return _this;
  }
  return _createClass(MeleeWeapon);
}(Weapon);
var RangedWeapon = /*#__PURE__*/function (_Weapon2) {
  _inherits(RangedWeapon, _Weapon2);
  var _super2 = _createSuper(RangedWeapon);
  function RangedWeapon(id, slot, type, stats) {
    var _this2;
    _classCallCheck(this, RangedWeapon);
    _this2 = _super2.call(this, id, slot, type, stats);
    _this2.stats = stats;
    return _this2;
  }
  return _createClass(RangedWeapon);
}(Weapon);
var projectiles = [{
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 25,
  speed: 1.6,
  scale: 103,
  range: 1000
}, {
  indx: 1,
  layer: 1,
  dmg: 25,
  scale: 20
}, {
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 35,
  speed: 2.5,
  scale: 103,
  range: 1200
}, {
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 30,
  speed: 2,
  scale: 103,
  range: 1200
}, {
  indx: 1,
  layer: 1,
  dmg: 16,
  scale: 20
}, {
  indx: 0,
  layer: 0,
  src: "bullet_1",
  dmg: 50,
  speed: 3.6,
  scale: 160,
  range: 1400
}];
var Weapons = {
  // it does, i want to add more things, im just adjusting something here
  TOOL_HAMMER: new MeleeWeapon(0, WeaponSlot.PRIMARY, WeaponType.TOOL_HAMMER, {
    dmg: 25,
    buildingDmgMultiplier: 1,
    range: 65,
    reloadTime: 300,
    speedMultiplier: 1
  }),
  HAND_AXE: new MeleeWeapon(1, WeaponSlot.PRIMARY, WeaponType.HAND_AXE, {
    dmg: 30,
    buildingDmgMultiplier: 1,
    range: 70,
    reloadTime: 400,
    speedMultiplier: 1
  }),
  GREAT_AXE: new MeleeWeapon(2, WeaponSlot.PRIMARY, WeaponType.GREAT_AXE, {
    dmg: 35,
    buildingDmgMultiplier: 1,
    range: 75,
    reloadTime: 400,
    speedMultiplier: 1
  }),
  SHORT_SWORD: new MeleeWeapon(3, WeaponSlot.PRIMARY, WeaponType.SHORT_SWORD, {
    dmg: 35,
    buildingDmgMultiplier: 1,
    range: 110,
    reloadTime: 300,
    speedMultiplier: 0.85
  }),
  KATANA: new MeleeWeapon(4, WeaponSlot.PRIMARY, WeaponType.KATANA, {
    dmg: 40,
    buildingDmgMultiplier: 1,
    range: 118,
    reloadTime: 300,
    speedMultiplier: 0.8
  }),
  POLEARM: new MeleeWeapon(5, WeaponSlot.PRIMARY, WeaponType.POLEARM, {
    dmg: 45,
    buildingDmgMultiplier: 1,
    range: 142,
    reloadTime: 700,
    speedMultiplier: 0.82
  }),
  BAT: new MeleeWeapon(6, WeaponSlot.PRIMARY, WeaponType.BAT, {
    dmg: 20,
    buildingDmgMultiplier: 1,
    range: 110,
    reloadTime: 300,
    speedMultiplier: 1
  }),
  DAGGERS: new MeleeWeapon(7, WeaponSlot.PRIMARY, WeaponType.DAGGERS, {
    dmg: 20,
    buildingDmgMultiplier: 1,
    range: 65,
    reloadTime: 100,
    speedMultiplier: 1.13
  }),
  STICK: new MeleeWeapon(8, WeaponSlot.PRIMARY, WeaponType.STICK, {
    dmg: 1,
    buildingDmgMultiplier: 1,
    range: 70,
    reloadTime: 400,
    speedMultiplier: 1
  }),
  HUNTING_BOW: new RangedWeapon(9, WeaponSlot.SECONDARY, WeaponType.HUNTING_BOW, {
    range: 1000,
    speedMultiplier: 0.75,
    reloadTime: 600
  }),
  GREAT_HAMMER: new MeleeWeapon(10, WeaponSlot.SECONDARY, WeaponType.GREAT_HAMMER, {
    dmg: 10,
    buildingDmgMultiplier: 7.5,
    range: 75,
    reloadTime: 400,
    speedMultiplier: 1
  }),
  SHIELD: new MeleeWeapon(11, WeaponSlot.SECONDARY, WeaponType.SHIELD, {
    dmg: 0,
    buildingDmgMultiplier: 1,
    range: 0,
    reloadTime: 0,
    speedMultiplier: 0.7
  }),
  CROSSBOW: new RangedWeapon(12, WeaponSlot.SECONDARY, WeaponType.CROSSBOW, {
    range: 1200,
    speedMultiplier: 0.7,
    reloadTime: 700
  }),
  REPEATER_CROSSBOW: new RangedWeapon(13, WeaponSlot.SECONDARY, WeaponType.REPEATER_CROSSBOW, {
    range: 1200,
    speedMultiplier: 0.7,
    reloadTime: 230
  }),
  MC_GRABBY: new MeleeWeapon(14, WeaponSlot.SECONDARY, WeaponType.MC_GRABBY, {
    dmg: 0,
    buildingDmgMultiplier: 1,
    range: 125,
    reloadTime: 700,
    speedMultiplier: 1.05
  }),
  MUSKET: new RangedWeapon(15, WeaponSlot.SECONDARY, WeaponType.MUSKET, {
    range: 1400,
    speedMultiplier: 0.6,
    reloadTime: 1500
  })
};
var weaponList = Object.values(Weapons);
var wpdata = [{
  id: 0,
  type: 0,
  name: "tool hammer",
  desc: "tool for gathering all resources",
  src: "hammer_1",
  length: 140,
  width: 140,
  xOff: -3,
  yOff: 18,
  dmg: 25,
  range: 65,
  gather: 1,
  speed: 300
}, {
  id: 1,
  type: 0,
  age: 2,
  name: "hand axe",
  desc: "gathers resources at a higher rate",
  src: "axe_1",
  length: 140,
  width: 140,
  xOff: 3,
  yOff: 24,
  dmg: 30,
  spdMult: 1,
  range: 70,
  gather: 2,
  speed: 400
}, {
  id: 2,
  type: 0,
  age: 8,
  pre: 1,
  name: "great axe",
  desc: "deal more damage and gather more resources",
  src: "great_axe_1",
  length: 140,
  width: 140,
  xOff: -8,
  yOff: 25,
  dmg: 35,
  spdMult: 1,
  range: 75,
  gather: 4,
  speed: 400
}, {
  id: 3,
  type: 0,
  age: 2,
  name: "short sword",
  desc: "increased attack power but slower move speed",
  src: "sword_1",
  iPad: 1.3,
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 46,
  dmg: 35,
  spdMult: 0.85,
  range: 110,
  gather: 1,
  speed: 300
}, {
  id: 4,
  type: 0,
  age: 8,
  pre: 3,
  name: "katana",
  desc: "greater range and damage",
  src: "samurai_1",
  iPad: 1.3,
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 59,
  dmg: 40,
  spdMult: 0.8,
  range: 118,
  gather: 1,
  speed: 300
}, {
  id: 5,
  type: 0,
  age: 2,
  name: "polearm",
  desc: "long range melee weapon",
  src: "spear_1",
  iPad: 1.3,
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 53,
  dmg: 45,
  knock: 0.2,
  spdMult: 0.82,
  range: 142,
  gather: 1,
  speed: 700
}, {
  id: 6,
  type: 0,
  age: 2,
  name: "bat",
  desc: "fast long range melee weapon",
  src: "bat_1",
  iPad: 1.3,
  length: 110,
  width: 180,
  xOff: -8,
  yOff: 53,
  dmg: 20,
  knock: 0.7,
  range: 110,
  gather: 1,
  speed: 300
}, {
  id: 7,
  type: 0,
  age: 2,
  name: "daggers",
  desc: "really fast short range weapon",
  src: "dagger_1",
  iPad: 0.8,
  length: 110,
  width: 110,
  xOff: 18,
  yOff: 0,
  dmg: 20,
  knock: 0.1,
  range: 65,
  gather: 1,
  hitSlow: 0.1,
  spdMult: 1.13,
  speed: 100
}, {
  id: 8,
  type: 0,
  age: 2,
  name: "stick",
  desc: "great for gathering but very weak",
  src: "stick_1",
  length: 140,
  width: 140,
  xOff: 3,
  yOff: 24,
  dmg: 1,
  spdMult: 1,
  range: 70,
  gather: 7,
  speed: 400
}, {
  id: 9,
  type: 1,
  age: 6,
  name: "hunting bow",
  desc: "bow used for ranged combat and hunting",
  src: "bow_1",
  req: ["wood", 4],
  length: 120,
  width: 120,
  xOff: -6,
  yOff: 0,
  projectile: 0,
  spdMult: 0.75,
  speed: 600
}, {
  id: 10,
  type: 1,
  age: 6,
  name: "great hammer",
  desc: "hammer used for destroying structures",
  src: "great_hammer_1",
  length: 140,
  width: 140,
  xOff: -9,
  yOff: 25,
  dmg: 10,
  spdMult: 0.88,
  range: 75,
  sDmg: 7.5,
  gather: 1,
  speed: 400
}, {
  id: 11,
  type: 1,
  age: 6,
  name: "wooden shield",
  desc: "blocks projectiles and reduces melee damage",
  src: "shield_1",
  length: 120,
  width: 120,
  shield: 0.2,
  xOff: 6,
  yOff: 0,
  spdMult: 0.7
}, {
  id: 12,
  type: 1,
  age: 8,
  pre: 9,
  name: "crossbow",
  desc: "deals more damage and has greater range",
  src: "crossbow_1",
  req: ["wood", 5],
  aboveHand: true,
  armS: 0.75,
  length: 120,
  width: 120,
  xOff: -4,
  yOff: 0,
  projectile: 2,
  spdMult: 0.7,
  speed: 700
}, {
  id: 13,
  type: 1,
  age: 9,
  pre: 12,
  name: "repeater crossbow",
  desc: "high firerate crossbow with reduced damage",
  src: "crossbow_2",
  req: ["wood", 10],
  aboveHand: true,
  armS: 0.75,
  length: 120,
  width: 120,
  xOff: -4,
  yOff: 0,
  projectile: 3,
  spdMult: 0.7,
  speed: 230
}, {
  id: 14,
  type: 1,
  age: 6,
  name: "mc grabby",
  desc: "steals resources from enemies",
  src: "grab_1",
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 53,
  dmg: 0,
  steal: 250,
  knock: 0.2,
  spdMult: 1.05,
  range: 125,
  gather: 0,
  speed: 700
}, {
  id: 15,
  type: 1,
  age: 9,
  pre: 12,
  name: "musket",
  desc: "slow firerate but high damage and range",
  src: "musket_1",
  req: ["stone", 10],
  aboveHand: true,
  rec: 0.35,
  armS: 0.6,
  hndS: 0.3,
  hndD: 1.6,
  length: 205,
  width: 205,
  xOff: 25,
  yOff: 0,
  projectile: 5,
  hideProjectile: true,
  spdMult: 0.6,
  speed: 1500
}];


/***/ }),

/***/ "./frontend/src/event/Event.ts":
/*!*************************************!*\
  !*** ./frontend/src/event/Event.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Event)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Event = /*#__PURE__*/function () {
  function Event() {
    _classCallCheck(this, Event);
    this.canceled = false;
  }
  _createClass(Event, [{
    key: "cancel",
    value: function cancel() {
      this.canceled = true;
    }
  }, {
    key: "isCanceled",
    value: function isCanceled() {
      return this.canceled;
    }
  }]);
  return Event;
}();


/***/ }),

/***/ "./frontend/src/event/EventPacket.ts":
/*!*******************************************!*\
  !*** ./frontend/src/event/EventPacket.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventPacket)
/* harmony export */ });
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ "./frontend/src/event/Event.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EventPacket = /*#__PURE__*/function (_Event) {
  _inherits(EventPacket, _Event);
  var _super = _createSuper(EventPacket);
  function EventPacket(packet) {
    var _this;
    _classCallCheck(this, EventPacket);
    _this = _super.call(this);
    _this.packet = packet;
    return _this;
  }
  _createClass(EventPacket, [{
    key: "getPacket",
    value: function getPacket() {
      return this.packet;
    }
  }, {
    key: "setPacket",
    value: function setPacket(packet) {
      this.packet = packet;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.packet.data = data;
    }
  }]);
  return EventPacket;
}(_Event__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./frontend/src/features/ModuleManager.ts":
/*!************************************************!*\
  !*** ./frontend/src/features/ModuleManager.ts ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModuleManager)
/* harmony export */ });
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _modules_building_AutoBreak__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/building/AutoBreak */ "./frontend/src/features/modules/building/AutoBreak.ts");
/* harmony import */ var _modules_building_AutoPlacer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/building/AutoPlacer */ "./frontend/src/features/modules/building/AutoPlacer.ts");
/* harmony import */ var _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/building/AutoReplace */ "./frontend/src/features/modules/building/AutoReplace.ts");
/* harmony import */ var _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/building/ItemPlacer */ "./frontend/src/features/modules/building/ItemPlacer.ts");
/* harmony import */ var _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/combat/Autoheal */ "./frontend/src/features/modules/combat/Autoheal.ts");
/* harmony import */ var _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/player/AutoHat */ "./frontend/src/features/modules/player/AutoHat.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modules_building_AutoBreak__WEBPACK_IMPORTED_MODULE_1__, _modules_building_AutoPlacer__WEBPACK_IMPORTED_MODULE_2__, _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_3__, _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_4__, _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_5__, _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_6__]);
([_modules_building_AutoBreak__WEBPACK_IMPORTED_MODULE_1__, _modules_building_AutoPlacer__WEBPACK_IMPORTED_MODULE_2__, _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_3__, _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_4__, _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_5__, _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_0__["default"]("module-manager");
var ModuleManager = /*#__PURE__*/function () {
  function ModuleManager() {
    _classCallCheck(this, ModuleManager);
    _defineProperty(this, "modules", []);
    var _iterator = _createForOfIteratorHelper(ModuleManager.classes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var clazz = _step.value;
        this.modules.push(Reflect.construct(clazz, []));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    logger.info("loaded ".concat(this.modules.length, " modules"));
  }
  _createClass(ModuleManager, [{
    key: "onUpdate",
    value: function onUpdate(delta) {
      var _iterator2 = _createForOfIteratorHelper(this.modules),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var module = _step2.value;
          module.onUpdate(delta);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "onPreTick",
    value: function onPreTick(tickIndex) {
      var _iterator3 = _createForOfIteratorHelper(this.modules),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var module = _step3.value;
          module.onPreTick(tickIndex);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "onTick",
    value: function onTick(tickIndex) {
      var _iterator4 = _createForOfIteratorHelper(this.modules),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var module = _step4.value;
          module.onTick(tickIndex);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "onPostTick",
    value: function onPostTick(tickIndex) {
      var _iterator5 = _createForOfIteratorHelper(this.modules),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var module = _step5.value;
          module.onPostTick(tickIndex);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(keyCode) {
      var _iterator6 = _createForOfIteratorHelper(this.modules),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var module = _step6.value;
          module.onKeydown(keyCode);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(keyCode) {
      var _iterator7 = _createForOfIteratorHelper(this.modules),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var module = _step7.value;
          module.onKeyup(keyCode);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  }, {
    key: "onPacketReceive",
    value: function onPacketReceive(event) {
      var _iterator8 = _createForOfIteratorHelper(this.modules),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var module = _step8.value;
          module.onPacketReceive(event);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }, {
    key: "onRender",
    value: function onRender(delta) {
      var _iterator9 = _createForOfIteratorHelper(this.modules),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var module = _step9.value;
          module.onRender(delta);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "onActionRun",
    value: function onActionRun(action) {
      var _iterator10 = _createForOfIteratorHelper(this.modules),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var module = _step10.value;
          module.onActionRun(action);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
  }, {
    key: "onBuildingHit",
    value: function onBuildingHit(player, building, damage) {
      var _iterator11 = _createForOfIteratorHelper(this.modules),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var module = _step11.value;
          module.onBuildingHit(player, building, damage);
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  }, {
    key: "getModule",
    value: function getModule(clazz) {
      var _iterator12 = _createForOfIteratorHelper(this.modules),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var module = _step12.value;
          if (module instanceof clazz) return module;
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    }
  }]);
  return ModuleManager;
}();
_defineProperty(ModuleManager, "classes", [_modules_building_AutoBreak__WEBPACK_IMPORTED_MODULE_1__["default"], _modules_building_AutoPlacer__WEBPACK_IMPORTED_MODULE_2__["default"], _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_3__["default"], _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_4__["default"], _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_5__["default"], _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_6__["default"]]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/Module.ts":
/*!*************************************************!*\
  !*** ./frontend/src/features/modules/Module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Module)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Module = /*#__PURE__*/function () {
  function Module() {
    _classCallCheck(this, Module);
  }
  _createClass(Module, [{
    key: "onUpdate",
    value: function onUpdate(delta) {}
  }, {
    key: "onPreTick",
    value: function onPreTick(tickIndex) {}
  }, {
    key: "onTick",
    value: function onTick(tickIndex) {}
  }, {
    key: "onPostTick",
    value: function onPostTick(tickIndex) {}
  }, {
    key: "onKeydown",
    value: function onKeydown(keyCode) {}
  }, {
    key: "onKeyup",
    value: function onKeyup(keyCode) {}
  }, {
    key: "onPacketReceive",
    value: function onPacketReceive(event) {}
  }, {
    key: "onRender",
    value: function onRender(delta) {}
  }, {
    key: "onActionRun",
    value: function onActionRun(action) {}
  }, {
    key: "onBuildingHit",
    value: function onBuildingHit(player, building, damage) {}
  }]);
  return Module;
}();


/***/ }),

/***/ "./frontend/src/features/modules/building/AutoBreak.ts":
/*!*************************************************************!*\
  !*** ./frontend/src/features/modules/building/AutoBreak.ts ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoBreak)
/* harmony export */ });
/* harmony import */ var _core_ActionType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _data_type_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/type/Player */ "./frontend/src/data/type/Player.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_2__]);
_main__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var AutoBreak = /*#__PURE__*/function (_Module) {
  _inherits(AutoBreak, _Module);
  var _super = _createSuper(AutoBreak);
  function AutoBreak() {
    var _this;
    _classCallCheck(this, AutoBreak);
    _this = _super.call(this);
    _this.wasBreaking = false;
    _this.stopAttackActionId = undefined;
    _this.packetBlockerId = undefined;
    _this.currentTrap = null;
    return _this;
  }
  _createClass(AutoBreak, [{
    key: "onPreTick",
    value: function onPreTick(tickIndex) {
      var myPlayer = _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer;
      if (!myPlayer.alive) return;
      if (myPlayer.state.isTrapped) {
        if (!this.currentTrap) {
          this.currentTrap = myPlayer.state.data.trap;
        }
        if (this.currentTrap) {
          if (this.packetBlockerId === undefined) this.packetBlockerId = _main__WEBPACK_IMPORTED_MODULE_2__.core.createPacketBlock(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.SET_ANGLE);
          var weapon = myPlayer.inventory.findBestWeapon(_data_type_Player__WEBPACK_IMPORTED_MODULE_1__.Inventory.WeaponFinders.BUILDING_BREAK);
          var reload = myPlayer.inventory.reloads[weapon.id];
          if (reload === 0) {
            var trapAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDirection(myPlayer.serverPos, this.currentTrap.position);
            _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [weapon === null || weapon === void 0 ? void 0 : weapon.id]);
            _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [1, trapAngle]);
            _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [40]);
          } else {
            // else reload the weapon
            _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [weapon === null || weapon === void 0 ? void 0 : weapon.id]);
            _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [20]);
          }
          this.wasBreaking = true;
        }
      } else if (this.wasBreaking) {
        this.stopAttackActionId = _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [0]);
        this.currentTrap = null;
        if (this.packetBlockerId !== undefined) {
          _main__WEBPACK_IMPORTED_MODULE_2__.core.removePacketBlock(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.SET_ANGLE, this.packetBlockerId);
          this.packetBlockerId = undefined;
        }
      }
    }
  }, {
    key: "onActionRun",
    value: function onActionRun(action) {
      if (action.id === this.stopAttackActionId) {
        this.stopAttackActionId = undefined;
        this.wasBreaking = false;
      }
    }
  }]);
  return AutoBreak;
}(_Module__WEBPACK_IMPORTED_MODULE_5__["default"]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/building/AutoPlacer.ts":
/*!**************************************************************!*\
  !*** ./frontend/src/features/modules/building/AutoPlacer.ts ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoPlacer)
/* harmony export */ });
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _data_type_MoomooUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/type/MoomooUtil */ "./frontend/src/data/type/MoomooUtil.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_2__]);
_main__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





var State;
(function (State) {
  State[State["IDLE"] = 0] = "IDLE";
  State[State["WINDMILLS"] = 1] = "WINDMILLS";
  State[State["TRAP_ENEMY"] = 2] = "TRAP_ENEMY";
  State[State["SPIKE_TRAPPED"] = 3] = "SPIKE_TRAPPED";
})(State || (State = {}));
function combineAllowAngles(angles1, angles2) {
  var longer = angles1.length > angles2.length ? angles1 : angles2;
  var shorter = longer === angles1 ? angles2 : angles1;
  var result = [];
  if (shorter.length === 0) return longer;
  var comparedAgainist;
  for (var i = 0; i < longer.length; i++) {
    var currentItem = longer[i];
    comparedAgainist = shorter.shift();
    if (comparedAgainist) {
      result.push([comparedAgainist[0] > currentItem[0] ? comparedAgainist[0] : currentItem[0], comparedAgainist[1] < currentItem[1] ? comparedAgainist[1] : currentItem[1]]);
    } else {
      result.push([currentItem[0], currentItem[1]]);
    }
  }
  return result;
}
function translateAllowAngles(placeableAngles, stepDeg) {
  var singleAngles = [];
  for (var i = 0; i < 360; i += stepDeg) {
    var rad = i * (Math.PI / 180);
    var _iterator = _createForOfIteratorHelper(placeableAngles),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var allow = _step.value;
        if (rad > allow[0] && rad < allow[1]) {
          singleAngles.push(rad);
          continue;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return singleAngles;
}
var AutoPlacer = /*#__PURE__*/function (_Module) {
  _inherits(AutoPlacer, _Module);
  var _super = _createSuper(AutoPlacer);
  function AutoPlacer() {
    var _this;
    _classCallCheck(this, AutoPlacer);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "debugAngles", []);
    _this.state = State.WINDMILLS;
    _this.toggled = false;
    _this.targetsTrappable = [];
    _this.targetsTrapSpikable = [];
    return _this;
  }
  _createClass(AutoPlacer, [{
    key: "calcState",
    value: function calcState() {
      this.targetsTrappable = [];
      this.targetsTrapSpikable = [];
      var myPlayer = _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer;
      var enemies = _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.playerList.slice(1).filter(function (x) {
        return x.visible;
      });
      var trapItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[15];
      var spikeItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[myPlayer.inventory.items[2]];
      if (enemies.length === 0) this.state = State.IDLE;
      for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        var distance = _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getDistance(enemy.serverPos, myPlayer.serverPos);
        var nextDistance = _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getDistance(enemy.serverPos.clone().add(enemy.velocity), myPlayer.serverPos);
        var trappingDistance = myPlayer.scale + enemy.scale + trapItem.scale + trapItem.scale * trapItem.colDiv + trapItem.placeOffset;
        if (distance <= trappingDistance && nextDistance <= trappingDistance && !enemy.state.isTrapped) {
          this.state = State.TRAP_ENEMY;
          this.targetsTrappable.push(enemy);
        }
        if (enemy.state.isTrapped) {
          var _spikeItem$placeOffse;
          if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getDistance(enemy.state.data.trap.position, myPlayer.serverPos) - myPlayer.scale - trapItem.scale - spikeItem.scale * 2 - ((_spikeItem$placeOffse = spikeItem.placeOffset) !== null && _spikeItem$placeOffse !== void 0 ? _spikeItem$placeOffse : 0) <= 0) {
            this.state = State.SPIKE_TRAPPED;
            this.targetsTrapSpikable.push(enemy);
          }
        }
      }
      if (this.state === State.IDLE) this.state = State.WINDMILLS;
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(delta) {
      var _this2 = this;
      if (!this.toggled) return;
      var myPlayer = _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer;
      if (!myPlayer.alive) return;
      this.calcState();
      switch (this.state) {
        case State.WINDMILLS:
          {
            return;
            var windmillItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[_main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.inventory.items[3]];
            var placeableangles = _main__WEBPACK_IMPORTED_MODULE_2__.core.objectManager.findPlacementAngles([_main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.serverPos, _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.scale], windmillItem);
            var backdir = (_util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getDirection(_main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.lerpPos, _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.serverPos) + Math.PI) % (Math.PI * 2);
            var singleAngles = translateAllowAngles(placeableangles, 3);
            var angles = singleAngles.filter(function (angle) {
              return _data_type_MoomooUtil__WEBPACK_IMPORTED_MODULE_1__.util.getAngleDist(backdir, angle) <= Math.PI / 2.8;
            });
            for (var i = 0; i < angles.length; i++) {
              _main__WEBPACK_IMPORTED_MODULE_2__.core.interactionEngine.safePlacement(windmillItem, angles[i]);
              //InteractUtil.place(<number> inventory.get(InventoryItem.WINDMILL), angles[i], true);
            }

            break;
          }
        case State.TRAP_ENEMY:
          {
            // TODO: use ping & tick based predicted position instead of last received positions (sometimes causes it to place trap on old enemy position)
            var trapItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[15];
            var _loop = function _loop() {
              var target = _this2.targetsTrappable[_i];
              var targetDir = _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getDirection(myPlayer.serverPos, target.serverPos);
              var trappingDistance = myPlayer.scale + target.scale + trapItem.scale + trapItem.scale * trapItem.colDiv + trapItem.placeOffset;
              var angles = translateAllowAngles(_main__WEBPACK_IMPORTED_MODULE_2__.core.objectManager.findPlacementAngles([_main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.serverPos, _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.scale], trapItem), 3);
              var placeAngles = angles.filter(function (angle) {
                return _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getAngleDist(angle, targetDir) <= Math.sin(trappingDistance / (target.scale + trapItem.scale * trapItem.colDiv));
              });
              _main__WEBPACK_IMPORTED_MODULE_2__.core.interactionEngine.safePlacement(trapItem, targetDir);
              for (var _i2 = 0; _i2 < placeAngles.length; _i2++) {
                _main__WEBPACK_IMPORTED_MODULE_2__.core.interactionEngine.safePlacement(trapItem, placeAngles[_i2]);
              }
            };
            for (var _i = 0; _i < this.targetsTrappable.length; _i++) {
              _loop();
            }
            break;
          }
        case State.SPIKE_TRAPPED:
          {
            var _trapItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[15];
            var spikeItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[_main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.inventory.items[2]];
            for (var _i3 = 0; _i3 < this.targetsTrapSpikable.length; _i3++) {
              var target = this.targetsTrapSpikable[_i3];
              var trap = target.state.data.trap;
              if (trap) {
                var tangentAngle = _main__WEBPACK_IMPORTED_MODULE_2__.core.objectManager.findPlacementTangent([myPlayer.serverPos, myPlayer.scale], trap, spikeItem, 5);
                var straightAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getDirection(myPlayer.serverPos, trap.position);
                var targetAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getDirection(myPlayer.serverPos, target.serverPos);
                var angle1 = straightAngle + tangentAngle;
                var angle2 = straightAngle - tangentAngle;
                var closestAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getAngleDist(angle1, targetAngle) > _util_MathUtil__WEBPACK_IMPORTED_MODULE_3__["default"].getAngleDist(angle2, targetAngle) ? angle2 : angle1;
                _main__WEBPACK_IMPORTED_MODULE_2__.core.interactionEngine.safePlacement(spikeItem, closestAngle);
              }
            }
            break;
          }
      }
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(keyCode) {
      if (keyCode == 82) {
        this.toggled = !this.toggled;
      }
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(keyCode) {}
  }, {
    key: "onRender",
    value: function onRender(delta) {
      var _core$renderManager, _core$renderManager2;
      var ctx = (_core$renderManager = _main__WEBPACK_IMPORTED_MODULE_2__.core.renderManager) === null || _core$renderManager === void 0 ? void 0 : _core$renderManager.context;
      var myPos = (_core$renderManager2 = _main__WEBPACK_IMPORTED_MODULE_2__.core.renderManager) === null || _core$renderManager2 === void 0 ? void 0 : _core$renderManager2.mapToContext(_main__WEBPACK_IMPORTED_MODULE_2__.core.renderManager.cameraPosition, _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer.renderPos);
      for (var i = 0; i < this.debugAngles.length; i++) {
        var a = this.debugAngles[i];
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(myPos.x, myPos.y);
        ctx.lineTo(myPos.x + Math.cos(a) * 30, myPos.y + Math.sin(a) * 30);
        ctx.stroke();
      }
    }
  }]);
  return AutoPlacer;
}(_Module__WEBPACK_IMPORTED_MODULE_4__["default"]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/building/AutoReplace.ts":
/*!***************************************************************!*\
  !*** ./frontend/src/features/modules/building/AutoReplace.ts ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoReplace)
/* harmony export */ });
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_1__]);
_main__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var AutoReplace = /*#__PURE__*/function (_Module) {
  _inherits(AutoReplace, _Module);
  var _super = _createSuper(AutoReplace);
  function AutoReplace() {
    var _this;
    _classCallCheck(this, AutoReplace);
    _this = _super.call(this);
    _this.predictedBreaks = new Map();
    _this.spamming = false;
    _this.buildData = null;
    _this.placeLimiter = 0;
    return _this;
  }
  _createClass(AutoReplace, [{
    key: "onUpdate",
    value: function onUpdate(delta) {
      if (this.buildData !== null) {
        if (this.placeLimiter++ % 4 == 0) _main__WEBPACK_IMPORTED_MODULE_1__.core.interactionEngine.vanillaPlaceItem(this.buildData.item, this.buildData.angle);
      }
    }
  }, {
    key: "onPreTick",
    value: function onPreTick(tickIndex) {
      var _this2 = this;
      var myPlayer = _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer;
      var spikeItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[myPlayer.inventory.items[2]];
      var trapItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[15];
      var predictedBreaks = this.predictedBreaks.get(tickIndex);
      if (!predictedBreaks || predictedBreaks.length === 0 || this.buildData !== null) return;
      var _loop = function _loop() {
        var _predictedBreaks$i = _slicedToArray(predictedBreaks[i], 2),
          breaker = _predictedBreaks$i[0],
          building = _predictedBreaks$i[1];
        var buildingAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getDirection(myPlayer.serverPos, building.position);
        var nearbyPlayer = _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.getNearby(building.position, 220, true)[0];
        if (nearbyPlayer) {
          var _spikeItem$placeOffse;
          var playerToBuilding = _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getDistance(nearbyPlayer.serverPos.clone().add(breaker.velocity), building.position);
          if (playerToBuilding < nearbyPlayer.scale + building.scale + spikeItem.scale * 2 + myPlayer.scale + ((_spikeItem$placeOffse = spikeItem.placeOffset) !== null && _spikeItem$placeOffse !== void 0 ? _spikeItem$placeOffse : 0)) {
            var angles = _main__WEBPACK_IMPORTED_MODULE_1__.core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], spikeItem, [building]);
            var bestangle = angles.sort(function (a, b) {
              return Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(a[0], buildingAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(a[1], buildingAngle)) - Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(b[0], buildingAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(b[1], buildingAngle));
            })[0];
            _this2.buildData = {
              item: spikeItem,
              angle: buildingAngle > bestangle[0] && buildingAngle < bestangle[1] ? buildingAngle : _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(bestangle[0], buildingAngle) > _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(bestangle[1], buildingAngle) ? bestangle[1] : bestangle[0],
              tick: tickIndex
            };
          } else {
            var _angles = _main__WEBPACK_IMPORTED_MODULE_1__.core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], trapItem, [building]);
            var _bestangle = _angles.sort(function (a, b) {
              return Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(a[0], buildingAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(a[1], buildingAngle)) - Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(b[0], buildingAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(b[1], buildingAngle));
            })[0];
            _this2.buildData = {
              item: trapItem,
              angle: buildingAngle > _bestangle[0] && buildingAngle < _bestangle[1] ? buildingAngle : _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(_bestangle[0], buildingAngle) > _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getAngleDist(_bestangle[1], buildingAngle) ? _bestangle[1] : _bestangle[0],
              tick: tickIndex
            };
          }
          _socket_Connection__WEBPACK_IMPORTED_MODULE_2__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.CHAT, ["replacing [" + _this2.buildData.item.name + "]"]));
        }
      };
      for (var i = 0; i < predictedBreaks.length; i++) {
        _loop();
      }
      this.predictedBreaks["delete"](tickIndex);
    }
  }, {
    key: "onPostTick",
    value: function onPostTick(tickIndex) {
      if (this.buildData !== null && this.buildData.tick === tickIndex) {
        this.buildData = null;
      }
    }
  }, {
    key: "onBuildingHit",
    value: function onBuildingHit(player, building, damage) {
      if (building.health <= damage) {
        // +1 because after the weapon is reloaded in one tick, it only can gather in the tick after it
        var tick = _main__WEBPACK_IMPORTED_MODULE_1__.core.tickEngine.tickIn(player.inventory.reloads[player.inventory.weaponSelected.id]) + 1;
        if (!this.predictedBreaks.has(tick)) this.predictedBreaks.set(tick, []);
        this.predictedBreaks.get(tick).push([player, building]);
      }
    }
  }]);
  return AutoReplace;
}(_Module__WEBPACK_IMPORTED_MODULE_6__["default"]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/building/ItemPlacer.ts":
/*!**************************************************************!*\
  !*** ./frontend/src/features/modules/building/ItemPlacer.ts ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ItemPlacer)
/* harmony export */ });
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_1__]);
_main__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var PlacerType;
(function (PlacerType) {
  PlacerType[PlacerType["SPIKE"] = 0] = "SPIKE";
  PlacerType[PlacerType["TRAP"] = 1] = "TRAP";
  PlacerType[PlacerType["WINDMILL"] = 2] = "WINDMILL";
})(PlacerType || (PlacerType = {}));
var Placer = /*#__PURE__*/function () {
  function Placer(type) {
    _classCallCheck(this, Placer);
    this.active = false;
    this.type = type;
    switch (type) {
      case PlacerType.SPIKE:
        this.placingObjectGroup = 2;
        break;
      case PlacerType.TRAP:
        this.placingObjectGroup = 4;
        break;
      case PlacerType.WINDMILL:
        this.placingObjectGroup = 3;
        break;
    }
  }
  _createClass(Placer, [{
    key: "setStatus",
    value: function setStatus(active) {
      this.active = active;
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.active;
    }
  }, {
    key: "run",
    value: function run(tickIndex) {
      var item = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[_main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.inventory.items[this.placingObjectGroup]];
      if (!item) return;
      _main__WEBPACK_IMPORTED_MODULE_1__.core.interactionEngine.safePlacement(item, _main__WEBPACK_IMPORTED_MODULE_1__.core.mouseAngle);
    }
  }]);
  return Placer;
}();
var ItemPlacer = /*#__PURE__*/function (_Module) {
  _inherits(ItemPlacer, _Module);
  var _super = _createSuper(ItemPlacer);
  function ItemPlacer() {
    var _this;
    _classCallCheck(this, ItemPlacer);
    _this = _super.call(this);
    _this.placers = new Map();
    _this.activePlacer = null;
    _this.placers.set(86, new Placer(PlacerType.SPIKE));
    _this.placers.set(70, new Placer(PlacerType.TRAP));
    _this.placers.set(78, new Placer(PlacerType.WINDMILL));
    return _this;
  }
  _createClass(ItemPlacer, [{
    key: "onUpdate",
    value: function onUpdate(delta) {
      if (this.activePlacer && _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.alive) this.activePlacer.run(0);
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(keyCode) {
      var placer = this.placers.get(keyCode);
      placer === null || placer === void 0 ? void 0 : placer.setStatus(true);
      if (!this.activePlacer && placer) {
        this.activePlacer = placer;
      }
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(keyCode) {
      var _this$placers$get;
      (_this$placers$get = this.placers.get(keyCode)) === null || _this$placers$get === void 0 ? void 0 : _this$placers$get.setStatus(false);
      this.activePlacer = null;
      var _iterator = _createForOfIteratorHelper(this.placers.values()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var placer = _step.value;
          if (placer.isActive()) {
            this.activePlacer = placer;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return ItemPlacer;
}(_Module__WEBPACK_IMPORTED_MODULE_2__["default"]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/combat/Autoheal.ts":
/*!**********************************************************!*\
  !*** ./frontend/src/features/modules/combat/Autoheal.ts ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Autoheal)
/* harmony export */ });
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_1__]);
_main__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Autoheal = /*#__PURE__*/function (_Module) {
  _inherits(Autoheal, _Module);
  var _super = _createSuper(Autoheal);
  function Autoheal() {
    var _this;
    _classCallCheck(this, Autoheal);
    _this = _super.call(this);
    _this.damageTime = -1;
    _this.lastHealth = 100;
    _this.hasFoodInHand = false;
    return _this;
  }
  _createClass(Autoheal, [{
    key: "onUpdate",
    value: function onUpdate(delta) {
      if (this.lastHealth <= 0) this.lastHealth = 100;
      if (_main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.alive && this.lastHealth < 100 && Date.now() - this.damageTime > 120 && this.hasFoodInHand === false) {
        var foodType = _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.inventory.items[0];
        var healsUp = foodType == 0 ? 20 : 40;
        for (var i = 0; i < Math.ceil((100 - this.lastHealth) / healsUp); i++) {
          _main__WEBPACK_IMPORTED_MODULE_1__.core.interactionEngine.vanillaPlaceItem(_data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[foodType], _main__WEBPACK_IMPORTED_MODULE_1__.core.mouseAngle);
        }
        this.damageTime = Date.now();
      } // ok
    }
  }, {
    key: "onPacketSend",
    value: function onPacketSend(event) {
      if (!_main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer) return;
      var packet = event.getPacket();
      if (packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.SELECT_ITEM) {
        if (packet.data[0] === _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.inventory.items[0] && packet.data[1] !== true) {
          this.hasFoodInHand = !this.hasFoodInHand;
        } else {
          this.hasFoodInHand = false;
        }
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.ATTACK) {
        if (this.hasFoodInHand && this.lastHealth < 100) {
          this.damageTime = 1 / 0;
          this.hasFoodInHand = false;
        }
      }
    }
  }, {
    key: "onPacketReceive",
    value: function onPacketReceive(event) {
      var packet = event.getPacket();
      if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.HEALTH_UPDATE) {
        var _packet$data = _slicedToArray(packet.data, 2),
          sid = _packet$data[0],
          health = _packet$data[1];
        if (sid === _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.sid) {
          if (health < this.lastHealth) this.damageTime = Date.now() - _main__WEBPACK_IMPORTED_MODULE_1__.core.tickEngine.ping;
          this.lastHealth = health;
        }
      }
    }

    // ...
  }]);
  return Autoheal;
}(_Module__WEBPACK_IMPORTED_MODULE_3__["default"]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/player/AutoHat.ts":
/*!*********************************************************!*\
  !*** ./frontend/src/features/modules/player/AutoHat.ts ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoHat)
/* harmony export */ });
/* harmony import */ var _core_ActionType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_2__]);
_main__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var AutoHat = /*#__PURE__*/function (_Module) {
  _inherits(AutoHat, _Module);
  var _super = _createSuper(AutoHat);
  function AutoHat() {
    _classCallCheck(this, AutoHat);
    return _super.call(this);
  }
  _createClass(AutoHat, [{
    key: "onPreTick",
    value: function onPreTick(tickIndex) {
      var myPlayer = _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer;
      var biomeHat = myPlayer.serverPos.y <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].snowBiomeTop ? 15 : myPlayer.serverPos.y >= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].mapScale / 2 - _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].riverWidth / 2 && myPlayer.serverPos.y <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].mapScale / 2 + _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].riverWidth / 2 ? 31 : 12;
      if (!myPlayer.ownedHats.includes(biomeHat)) {
        if (biomeHat !== 12 && myPlayer.ownedHats.includes(12)) {
          biomeHat = 12;
        } else {
          biomeHat = 51;
        }
      }
      _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.BIOMEHAT, tickIndex, [biomeHat]);
      //core.scheduleAction(ActionType.WEAPON, ActionPriority.BIOMEHAT, tickIndex, [myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.MOVEMENT_SPEED)?.id]);
    }
  }]);
  return AutoHat;
}(_Module__WEBPACK_IMPORTED_MODULE_3__["default"]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/injector/BundleProxy.ts":
/*!**********************************************!*\
  !*** ./frontend/src/injector/BundleProxy.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader/NVRLoader */ "./frontend/src/loader/NVRLoader.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _util_StringUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/StringUtil */ "./frontend/src/util/StringUtil.ts");
/* harmony import */ var _transformations_TObjectSpriteLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transformations/TObjectSpriteLoader */ "./frontend/src/injector/transformations/TObjectSpriteLoader.ts");
/* harmony import */ var _transformations_TSourceMapping__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transformations/TSourceMapping */ "./frontend/src/injector/transformations/TSourceMapping.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_1__["default"]("bundle-proxy");
var isCaptchaReady = false;
var transformations = [_transformations_TObjectSpriteLoader__WEBPACK_IMPORTED_MODULE_3__["default"], _transformations_TSourceMapping__WEBPACK_IMPORTED_MODULE_4__["default"]];
var _promise;
function loadBundle(src, injectedApi, promise) {
  _promise = promise;
  window.captchaCallback = function () {
    return isCaptchaReady = true;
  };
  fetch(src).then(function (res) {
    if (res.ok) return res.text();
    throw logger.error("failed to load bundle: " + res.status);
  }).then(function (code) {
    return processBundle(code, injectedApi);
  });
}
function processBundle(code, injectedApi) {
  var transformers = transformations.map(function (transformer) {
    return Reflect.construct(transformer, []);
  });
  var _iterator = _createForOfIteratorHelper(transformers),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var transformer = _step.value;
      code = transformer.transform(code);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  evalBundle(code, injectedApi);
}
function evalBundle(code, injectedApi) {
  var hash = _util_StringUtil__WEBPACK_IMPORTED_MODULE_2__["default"].randomString(10);
  var vm = new Function(hash, "console", code.replace(/\[nvrapi\]/g, hash));
  var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_1__["default"](window.console, "bundle-vm-" + hash);
  var exec = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var old;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            vm.call( /*window*/vm.bind(window), injectedApi, logger);
            old = [window.onload, window.captchaCallback];
            window.onload = window.captchaCallback = function () {};
            if (!_promise) {
              _context.next = 6;
              break;
            }
            _context.next = 6;
            return _promise;
          case 6:
            setTimeout(function () {
              return old[0] && old[0](new Event("load")), old[1] && old[1](), _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__["default"].stop();
            }, 1);
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function exec() {
      return _ref.apply(this, arguments);
    };
  }();
  if (isCaptchaReady) {
    exec();
  } else {
    window.captchaCallback = exec;
  }
}
function clearPromise() {
  _promise = undefined;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  loadBundle: loadBundle,
  clearPromise: clearPromise
});

/***/ }),

/***/ "./frontend/src/injector/Transformation.ts":
/*!*************************************************!*\
  !*** ./frontend/src/injector/Transformation.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Transformation)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Transformation = /*#__PURE__*/_createClass(function Transformation() {
  _classCallCheck(this, Transformation);
});


/***/ }),

/***/ "./frontend/src/injector/api/API.ts":
/*!******************************************!*\
  !*** ./frontend/src/injector/api/API.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ API)
/* harmony export */ });
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsee */ "./node_modules/tsee/lib/index.js");
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsee__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Logger */ "./frontend/src/util/Logger.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_1__["default"](window.console, "nvr-api");
var API = /*#__PURE__*/function (_EventEmitter) {
  _inherits(API, _EventEmitter);
  var _super = _createSuper(API);
  function API() {
    var _this;
    _classCallCheck(this, API);
    _this = _super.call(this);
    // @ts-ignore
    window.nvrapi = _assertThisInitialized(_this); //hloo
    _this.references = {};
    _this.functions = {};
    return _this;
  }
  _createClass(API, [{
    key: "registerFunction",
    value: function registerFunction(name, value) {
      this.functions[name] = value;
      logger.log("registered function:", name, value);
      this.emit("functionReg", name, value);
    }
  }, {
    key: "registerReference",
    value: function registerReference(name, value) {
      var proxify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.references[name] = value;
      logger.log("registered reference:", name);
      return proxify ? this.createProxyFor(name, value) : value;
    }
  }, {
    key: "linkPrimitive",
    value: function linkPrimitive(initialValue) {
      var object = [initialValue];
      object.toString = function () {
        return object[0];
      };
      return object;
    }
  }, {
    key: "createProxyFor",
    value: function createProxyFor(name, object) {
      switch (_typeof(object)) {
        case "object":
          return this.createObjectProxy(name, object);
        default:
          return object;
      }
    }
  }, {
    key: "createObjectProxy",
    value: function createObjectProxy(name, object) {
      var _ = this;
      return new Proxy(object, {
        set: function set(target, p, newValue, receiver) {
          _.emit("refPropertySet", name, p, newValue);
          return Reflect.set(target, p, newValue, receiver);
        }
      });
    }
  }]);
  return API;
}(tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);


/***/ }),

/***/ "./frontend/src/injector/transformations/TObjectSpriteLoader.ts":
/*!**********************************************************************!*\
  !*** ./frontend/src/injector/transformations/TObjectSpriteLoader.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TObjectSpriteLoader)
/* harmony export */ });
/* harmony import */ var _util_StringUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/StringUtil */ "./frontend/src/util/StringUtil.ts");
/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Transformation */ "./frontend/src/injector/Transformation.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var TObjectSpriteLoader = /*#__PURE__*/function (_Transformation) {
  _inherits(TObjectSpriteLoader, _Transformation);
  var _super = _createSuper(TObjectSpriteLoader);
  function TObjectSpriteLoader() {
    _classCallCheck(this, TObjectSpriteLoader);
    return _super.call(this);
  }
  _createClass(TObjectSpriteLoader, [{
    key: "transform",
    value: function transform(source) {
      var gameObjectRegex = /(var [\w$_]+\s*=\s*)(\{\});(\s*function ([\w$_]+)\([\w$_]+)\)\s*\{(\s*var [\w$_]+\s*=\s*\(?[\w$_]+\.y\s*>=[\s\S]*?if\s*\(\s*![\w$_]+\s*\)\s*\{\s*var\s+[\w$_]+\s*=\s*document\.createElement\(['"]canvas['"]\);[\s\S]+?([\w$_]+)\.scale\s*\*\s*\([\w$_]+?\s*\?\s*\.+5\s*:\s*1\)[\s\S]+?[\w$_]+\[[\w$_]+\]\s*=\s*[\w$_]+\s*\}\s*return [\w$_]+;?\s*)\}\s*var/;
      var itemSpriteRegex = /(var [\w$_]+\s*=\s*)(\[\])(;\s*function ([\w$_]+)\([\w$_]+,\s*[\w$_]+\)\s*\{\s*var [\w$_]+\s*=\s*[\w$_]+\[[\w$_]+\.id\];\s*if\s*\(![\w$_]+\s*\|\|\s*[\w$_]+\)\s*\{\s*var [\w$_]+\s*=\s*document\.createElement\(['"]canvas['"]\)[\s\S]+?return [\w$_]+;?\s*\})/;

      // also adds one parameter to the function because it depends on an out of scope object which is set before getting the sprite in game code
      var paramName = _util_StringUtil__WEBPACK_IMPORTED_MODULE_0__["default"].randomString(5);
      source = source.replace(gameObjectRegex, "$1[nvrapi].registerReference(\"gameObjectSprites\",$2,true);$3,".concat(paramName, "){$6=").concat(paramName, "?").concat(paramName, ":$6;$5};[nvrapi].registerFunction(\"getResSprite\",$4);var"));
      source = source.replace(itemSpriteRegex, "$1[nvrapi].registerReference(\"itemSprites\",$2,true);$3;[nvrapi].registerFunction(\"getItemSprite\",$4);");
      return source;
    }
  }]);
  return TObjectSpriteLoader;
}(_Transformation__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./frontend/src/injector/transformations/TSourceMapping.ts":
/*!*****************************************************************!*\
  !*** ./frontend/src/injector/transformations/TSourceMapping.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSourceMapping)
/* harmony export */ });
/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Transformation */ "./frontend/src/injector/Transformation.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TSourceMapping = /*#__PURE__*/function (_Transformation) {
  _inherits(TSourceMapping, _Transformation);
  var _super = _createSuper(TSourceMapping);
  function TSourceMapping() {
    _classCallCheck(this, TSourceMapping);
    return _super.call(this);
  }
  _createClass(TSourceMapping, [{
    key: "transform",
    value: function transform(source) {
      source = source.replace(/\/\/# sourceMappingURL=bundle\.js\.map$/g, ";console.log(this);");
      return source;
    }
  }]);
  return TSourceMapping;
}(_Transformation__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./frontend/src/loader/NVRLoader.ts":
/*!******************************************!*\
  !*** ./frontend/src/loader/NVRLoader.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SecurityManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SecurityManager */ "./frontend/src/loader/SecurityManager.ts");
/* harmony import */ var _loader_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.html */ "./frontend/src/loader/loader.html");
/* harmony import */ var _raw_loader_NVRWorker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !!raw-loader!./NVRWorker.js */ "./node_modules/raw-loader/dist/cjs.js!./frontend/src/loader/NVRWorker.js");
/* harmony import */ var _util_StringUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/StringUtil */ "./frontend/src/util/StringUtil.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_4__["default"]("loader");
var security = new _SecurityManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
var frame = null;
var info = null;
var details = null;
var menuHider = null;
var worker = null;
function start() {
  document.body.insertAdjacentHTML("beforeend", _loader_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
  frame = document.querySelector("#loader-wrapper");
  var header = document.querySelector("#loader > #header");
  info = document.querySelector("#loader > #info");
  details = document.querySelector("#loader > #details");
  menuHider = document.createElement("style");
  menuHider.innerText = "#mainMenu { display: none !important; }";
  document.head.appendChild(menuHider);
  header.innerText = "Loading NVR";
  info.innerText = "Performing security checks";
  details.innerText = "...";
  if (!security.checkHref()) {}
}
function setStatus(info_, details_) {
  if (info && details) {
    info.innerText = info_;
    details.innerText = details_;
  }
}
function stop() {
  var _menuHider, _frame;
  document.getElementById("mainMenu").style.opacity = "";
  (_menuHider = menuHider) === null || _menuHider === void 0 ? void 0 : _menuHider.remove();
  (_frame = frame) === null || _frame === void 0 ? void 0 : _frame.remove();
}
var workerTasks = [];
var WorkerTask = /*#__PURE__*/function () {
  function WorkerTask(id, resolve, reject) {
    _classCallCheck(this, WorkerTask);
    this.id = id;
    this.fc_resolve = resolve;
    this.fc_reject = reject;
  }
  _createClass(WorkerTask, [{
    key: "resolve",
    value: function resolve(val) {
      this.fc_resolve(val);
    }
  }, {
    key: "reject",
    value: function reject(val) {
      this.fc_reject(val);
    }
  }]);
  return WorkerTask;
}();
function createWebWorker() {
  var blob = new Blob([_raw_loader_NVRWorker_js__WEBPACK_IMPORTED_MODULE_2__["default"]], {
    type: 'application/javascript'
  });
  worker = new Worker(URL.createObjectURL(blob));
  worker.onmessage = function (e) {
    var _e$data = _slicedToArray(e.data, 3),
      taskId = _e$data[0],
      status = _e$data[1],
      data = _e$data[2];
    if (taskId === "0") return logger.error(data);
    if (taskId === "log") return logger.log(data);
    var task = workerTasks.find(function (x) {
      return x.id === taskId;
    });
    if (task) {
      task[status ? "resolve" : "reject"](data);
    }
  };
  return new Promise(function (resolve, reject) {
    workerExecute("echo", "init").then(function (e) {
      if (e === "init") {
        logger.log("worker init complete");
      } else {
        logger.log("worker not behaving correctly? init != " + e);
      }
      resolve();
    })["catch"](function (e) {
      logger.error("failed to init worker:", e);
      reject();
    });
  });
}
function createWorkerTaskId() {
  return _util_StringUtil__WEBPACK_IMPORTED_MODULE_3__["default"].randomString(16);
}
function workerExecute(task, data) {
  var taskId = createWorkerTaskId();
  worker.postMessage([taskId, task, data]);
  var promise = new Promise(function (resolve, reject) {
    workerTasks.push(new WorkerTask(taskId, resolve, reject));
  });
  return promise;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  start: start,
  setStatus: setStatus,
  stop: stop,
  createWebWorker: createWebWorker,
  workerExecute: workerExecute
});

/***/ }),

/***/ "./frontend/src/loader/SecurityManager.ts":
/*!************************************************!*\
  !*** ./frontend/src/loader/SecurityManager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SecurityManager)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SecurityManager = /*#__PURE__*/function () {
  function SecurityManager() {
    _classCallCheck(this, SecurityManager);
  }
  _createClass(SecurityManager, [{
    key: "checkHref",
    value: function checkHref() {
      var loc = window.location;
      if (!(loc instanceof Location)) return false;
      if (location[Symbol.toStringTag] != "Location") return false;
      if (loc.host !== "sandbox.moomoo.io") return false;
      return true;
    }
  }, {
    key: "run",
    value: function run() {}
  }]);
  return SecurityManager;
}();


/***/ }),

/***/ "./frontend/src/main.ts":
/*!******************************!*\
  !*** ./frontend/src/main.ts ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "core": () => (/* binding */ core)
/* harmony export */ });
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/main.scss */ "./frontend/style/main.scss");
/* harmony import */ var _style_moomoo_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/moomoo.scss */ "./frontend/style/moomoo.scss");
/* harmony import */ var _core_Core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Core */ "./frontend/src/core/Core.ts");
/* harmony import */ var _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loader/NVRLoader */ "./frontend/src/loader/NVRLoader.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/Logger */ "./frontend/src/util/Logger.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_Core__WEBPACK_IMPORTED_MODULE_2__]);
_core_Core__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_5__["default"]("main");
(0,_socket_Connection__WEBPACK_IMPORTED_MODULE_4__.inject)();
logger.info("initializing core");
var core = new _core_Core__WEBPACK_IMPORTED_MODULE_2__.Core();
if (!core) {
  logger.error("critical: core failed to load!");
  alert("critical: core failed to load! please report this to developers!");
  console.log("sex successful.");
}
function initializeRenderer() {
  return _initializeRenderer.apply(this, arguments);
}
function _initializeRenderer() {
  _initializeRenderer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return core.initializeRenderer(document.getElementById("gameCanvas"));
        case 2:
          _resolve();
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _initializeRenderer.apply(this, arguments);
}
window.addEventListener("DOMContentLoaded", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.abrupt("return", initializeRenderer());
      case 1:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
var _resolve;
var promise = new Promise(function (resolve, reject) {
  _resolve = resolve;
});
var observer = new MutationObserver(function (mutations, observer) {
  var _iterator = _createForOfIteratorHelper(mutations),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mutation = _step.value;
      var _iterator2 = _createForOfIteratorHelper(mutation.addedNodes),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var node = _step2.value;
          if (node instanceof HTMLBodyElement) {
            _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__["default"].start();
          } else if (node.tagName === "SCRIPT" && /var loadedScript/.test(node.innerText)) {
            node.addEventListener("beforescriptexecute", function (e) {
              return e.preventDefault();
            }, {
              once: true
            });
            node.parentElement.removeChild(node);
          } else if (node.tagName === "SCRIPT" && /bundle\.js$/.test(node.src)) {
            core.patchBundle(node.src, promise);

            // firefox executes script even if its removed
            node.addEventListener("beforescriptexecute", function (e) {
              return e.preventDefault();
            }, {
              once: true
            });
            node.parentElement.removeChild(node);
            observer.disconnect();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});
observer.observe(document, {
  subtree: true,
  childList: true
});

// @ts-ignore
await _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__["default"].createWebWorker();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./frontend/src/manager/ObjectManager.ts":
/*!***********************************************!*\
  !*** ./frontend/src/manager/ObjectManager.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectManager)
/* harmony export */ });
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_type_SidArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/type/SidArray */ "./frontend/src/util/type/SidArray.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var PredictedPlacement = /*#__PURE__*/function (_PlayerBuilding) {
  _inherits(PredictedPlacement, _PlayerBuilding);
  var _super = _createSuper(PredictedPlacement);
  function PredictedPlacement(position, dir, scale, type, placedTimestamp) {
    var _this;
    _classCallCheck(this, PredictedPlacement);
    _this = _super.call(this, -1, position, dir, scale, type, -1);
    _this.placedTimestamp = placedTimestamp;
    return _this;
  }
  return _createClass(PredictedPlacement);
}(_data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.PlayerBuilding);
var ObjectManager = /*#__PURE__*/function () {
  function ObjectManager() {
    _classCallCheck(this, ObjectManager);
    this.gameObjects = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_3__.SidArray();
    this.grids = {};
    this.updateObjects = [];
    this.predictedPlacements = [];
    Object.defineProperty(window, "objectManager", {
      value: this
    }); // lemme test it
  }
  _createClass(ObjectManager, [{
    key: "canPlaceObject",
    value: function canPlaceObject(source, item) {
      var _item$placeOffset;
      var lookupPredictions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _source = _slicedToArray(source, 3),
        position = _source[0],
        scale = _source[1],
        angle = _source[2];
      var placeOffset = scale + item.scale + ((_item$placeOffset = item.placeOffset) !== null && _item$placeOffset !== void 0 ? _item$placeOffset : 0);
      var targetPosition = position.clone().directionMove(angle, placeOffset);
      return this.isPositionFree(targetPosition, item.scale, lookupPredictions);
    }
  }, {
    key: "isPositionFree",
    value: function isPositionFree(placementVector, scale) {
      var lookupPredictions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var grids = this.getGridArrays(placementVector.x, placementVector.y, scale);
      return grids.flat(1).filter(function (x) {
        return _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(x.position, placementVector) <= x.getScale() + scale;
      }).length === 0 && (!lookupPredictions || this.predictedPlacements.filter(function (x) {
        return _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(x.position, placementVector) <= x.getScale() + scale;
      }).length === 0);
    }

    /**
     * @param source[0] position from where the item is placed
     * @param source[1] scale of placing entity
     * @param source[2] angle at which is the item being placed at
     */
  }, {
    key: "addPlacementAttempt",
    value: function addPlacementAttempt(source, item) {
      var _item$placeOffset2;
      var timestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Date.now();
      var _source2 = _slicedToArray(source, 3),
        position = _source2[0],
        scale = _source2[1],
        angle = _source2[2];
      var placeOffset = scale + item.scale + ((_item$placeOffset2 = item.placeOffset) !== null && _item$placeOffset2 !== void 0 ? _item$placeOffset2 : 0);
      var targetPosition = position.clone().directionMove(angle, placeOffset);
      if (this.isPositionFree(targetPosition, item.scale)) {
        this.predictedPlacements.push(new PredictedPlacement(targetPosition, angle, item.scale, item.id, timestamp));
      }
    }
  }, {
    key: "findPlacementAngles",
    value: function findPlacementAngles(source, item) {
      var _item$placeOffset3;
      var ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var _source3 = _slicedToArray(source, 2),
        position = _source3[0],
        scale = _source3[1];
      var placeOffset = scale + item.scale + ((_item$placeOffset3 = item.placeOffset) !== null && _item$placeOffset3 !== void 0 ? _item$placeOffset3 : 0);
      var grids = this.getGridArrays(position.x, position.y, placeOffset + item.scale).flat(1).filter(function (x) {
        return !ignore.includes(x) && _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(position, x.position) <= placeOffset + item.scale;
      });
      var blocks = [];
      for (var i = 0; i < grids.length; i++) {
        var object = grids[i];
        var tangent = this.findPlacementTangent(source, object, item, 1);
        var straight = _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection(position, object.position);
        var _bounds = [straight - tangent, straight + tangent];
        blocks.push([Math.min(_bounds[0], _bounds[1]), Math.max(_bounds[0], _bounds[1])]);
      }
      var allows = [];
      var lastOpener = 0;
      for (var _i2 = 0; _i2 < blocks.length; _i2++) {
        var block = blocks[_i2];
        if (lastOpener != block[0]) allows.push([lastOpener, block[0]]);
        lastOpener = block[1];
      }
      allows.push([lastOpener, Math.PI * 2]);
      return allows;
    }
  }, {
    key: "findPlacementTangent",
    value: function findPlacementTangent(source, target, item, additionalDistanceFromObject) {
      var _item$placeOffset4;
      var t = source[1] + item.scale + ((_item$placeOffset4 = item.placeOffset) !== null && _item$placeOffset4 !== void 0 ? _item$placeOffset4 : 0);
      var p = target.getScale(true) + item.scale + additionalDistanceFromObject;
      var s = _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(source[0], target.position);
      return Math.acos((Math.pow(p, 2) - Math.pow(s, 2) - Math.pow(t, 2)) / (-2 * s * t));
    }

    // SET OBJECT GRIDS
  }, {
    key: "setObjectGrids",
    value: function setObjectGrids(obj) {
      var tmpX, tmpY;
      var tmpS = _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].mapScale / _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].colGrid;
      var objX = Math.min(_data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].mapScale, Math.max(0, obj.position.x));
      var objY = Math.min(_data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].mapScale, Math.max(0, obj.position.y));
      for (var x = 0; x < _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].colGrid; ++x) {
        tmpX = x * tmpS;
        for (var y = 0; y < _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].colGrid; ++y) {
          tmpY = y * tmpS;
          if (objX + obj.scale >= tmpX && objX - obj.scale <= tmpX + tmpS && objY + obj.scale >= tmpY && objY - obj.scale <= tmpY + tmpS) {
            if (!this.grids[x + "_" + y]) this.grids[x + "_" + y] = [];
            this.grids[x + "_" + y].push(obj);
            obj.gridLocations.push(x + "_" + y);
          }
        }
      }
    }
  }, {
    key: "removeObjGrid",
    value:
    // REMOVE OBJECT FROM GRID:
    function removeObjGrid(obj) {
      var tmpIndx;
      for (var i = 0; i < obj.gridLocations.length; ++i) {
        tmpIndx = this.grids[obj.gridLocations[i]].indexOf(obj);
        if (tmpIndx >= 0) {
          this.grids[obj.gridLocations[i]].splice(tmpIndx, 1);
        }
      }
    }
  }, {
    key: "disableObj",
    value:
    // DISABLE OBJ:
    function disableObj(obj) {
      this.gameObjects.remove(obj);
      this.removeObjGrid(obj);
      /*if (server) {
          if (obj.owner && obj.pps) obj.owner.pps -= obj.pps;*/
      this.removeObjGrid(obj);
      if (obj instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.PlayerBuilding) {
        var tmpIndx = this.updateObjects.indexOf(obj);
        if (tmpIndx >= 0) {
          this.updateObjects.splice(tmpIndx, 1);
        }
      }
      /*}*/
    }
  }, {
    key: "getGridArrays",
    value:
    // HIT OBJECT:
    /*hitObj(tmpObj: any, tmpDir: number) {
        for (var p = 0; p < players.length; ++p) {
            if (players[p].active) {
                if (tmpObj.sentTo[players[p].id]) {*/
    /*if (!tmpObj.active) server.send(players[p].id, "12", tmpObj.sid);
    else if (players[p].canSee(tmpObj))
        server.send(players[p].id, "8", UTILS.fixTo(tmpDir, 1), tmpObj.sid);*/
    /*} if (!tmpObj.active && tmpObj.owner == players[p])
        players[p].changeItemCount(tmpObj.group.id, -1);
    }
    }
    };*/

    // GET GRID ARRAY
    function getGridArrays(xPos, yPos, s) {
      var tmpX,
        tmpY,
        tmpArray = [],
        tmpGrid;
      var tmpS = _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].mapScale / _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].colGrid;
      tmpX = Math.floor(xPos / tmpS);
      tmpY = Math.floor(yPos / tmpS);
      tmpArray.length = 0;
      try {
        if (this.grids[tmpX + "_" + tmpY]) tmpArray.push(this.grids[tmpX + "_" + tmpY]);
        if (xPos + s >= (tmpX + 1) * tmpS) {
          // RIGHT
          tmpGrid = this.grids[tmpX + 1 + "_" + tmpY];
          if (tmpGrid) tmpArray.push(tmpGrid);
          if (tmpY && yPos - s <= tmpY * tmpS) {
            // TOP RIGHT
            tmpGrid = this.grids[tmpX + 1 + "_" + (tmpY - 1)];
            if (tmpGrid) tmpArray.push(tmpGrid);
          } else if (yPos + s >= (tmpY + 1) * tmpS) {
            // BOTTOM RIGHT
            tmpGrid = this.grids[tmpX + 1 + "_" + (tmpY + 1)];
            if (tmpGrid) tmpArray.push(tmpGrid);
          }
        }
        if (tmpX && xPos - s <= tmpX * tmpS) {
          // LEFT
          tmpGrid = this.grids[tmpX - 1 + "_" + tmpY];
          if (tmpGrid) tmpArray.push(tmpGrid);
          if (tmpY && yPos - s <= tmpY * tmpS) {
            // TOP LEFT
            tmpGrid = this.grids[tmpX - 1 + "_" + (tmpY - 1)];
            if (tmpGrid) tmpArray.push(tmpGrid);
          } else if (yPos + s >= (tmpY + 1) * tmpS) {
            // BOTTOM LEFT
            tmpGrid = this.grids[tmpX - 1 + "_" + (tmpY + 1)];
            if (tmpGrid) tmpArray.push(tmpGrid);
          }
        }
        if (yPos + s >= (tmpY + 1) * tmpS) {
          // BOTTOM
          tmpGrid = this.grids[tmpX + "_" + (tmpY + 1)];
          if (tmpGrid) tmpArray.push(tmpGrid);
        }
        if (tmpY && yPos - s <= tmpY * tmpS) {
          // TOP
          tmpGrid = this.grids[tmpX + "_" + (tmpY - 1)];
          if (tmpGrid) tmpArray.push(tmpGrid);
        }
      } catch (e) {}
      return tmpArray;
    }
  }, {
    key: "add",
    value:
    // ADD NEW:
    function add(sid, x, y, dir, s, type, data, owner) {
      var tmpObj;
      if (owner !== -1) {
        var predicted = this.predictedPlacements.find(function (obj) {
          return _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(obj.position, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y)) < 8 && obj.stats.id === data;
        });
        if (predicted) {
          // building prediction succeeded, remove item from predictions
          this.predictedPlacements.splice(this.predictedPlacements.indexOf(predicted), 1);
        }
      }

      // remove old object with the same sid
      if (tmpObj = this.gameObjects.findBySid(sid) !== null) {
        this.gameObjects.remove(tmpObj);
        tmpObj = null;
      }

      // as we dont use object activity, this makes no sense
      /*if (!tmpObj) {
          // find first inactive object and replace it with current one
          for (var i = 0; i < this.gameObjects.length; ++i) {
              if (!this.gameObjects[i].active) {
                  tmpObj = this.gameObjects[i];
                  break;
              }
          }
      }*/

      // otherwise create a new object and push it into objects
      if (!tmpObj) {
        if (owner === -1) {
          tmpObj = new _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.NaturalObject(sid, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), dir, s, type);
        } else {
          tmpObj = new _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.PlayerBuilding(sid, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), dir, s, data, owner);
        }
        this.gameObjects.push(tmpObj);
      }

      /*tmpObj.sid = sid;
      tmpObj.init(x, y, dir, s, type, data, owner);*/

      // server function
      this.setObjectGrids(tmpObj);
      this.updateObjects.push(tmpObj);
    }
  }, {
    key: "disableBySid",
    value:
    // DISABLE BY SID:
    function disableBySid(sid) {
      for (var i = 0; i < this.gameObjects.length; ++i) {
        if (this.gameObjects[i].sid == sid) {
          this.disableObj(this.gameObjects[i]);
          break;
        }
      }
    }
  }, {
    key: "removeAllItems",
    value:
    // REMOVE ALL FROM PLAYER:
    function removeAllItems(sid) {
      for (var i = 0; i < this.gameObjects.length; ++i) {
        var object = this.gameObjects[i];
        if (object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.PlayerBuilding && object.owner.sid === sid) {
          this.disableObj(object);
        }
      }
      /*if (server) {
          server.broadcast("13", sid);
      }*/
    }
  }, {
    key: "fetchSpawnObj",
    value:
    // FETCH SPAWN OBJECT:
    function fetchSpawnObj(sid) {
      var tmpObj;
      var tmpLoc = null;
      for (var i = 0; i < this.gameObjects.length; ++i) {
        tmpObj = this.gameObjects[i];
        /*if (tmpObj.active && tmpObj.owner && tmpObj.owner.sid == sid && tmpObj.spawnPoint) {
            tmpLoc = [tmpObj.x, tmpObj.y];
            this.disableObj(tmpObj);*/
        /*server.broadcast("12", tmpObj.sid);
        if (tmpObj.owner) {
             tmpObj.owner.changeItemCount(tmpObj.group.id, -1);
        }*/
        /*    break;
        }*/
      }

      return tmpLoc;
    }
  }, {
    key: "checkItemLocation",
    value:
    // CHECK IF PLACABLE:
    function checkItemLocation(x, y, s, sM, indx, ignoreWater, placer) {
      /*for (var i = 0; i < this.gameObjects.length; ++i) {
          var blockS = (this.gameObjects[i].blocker?
              this.gameObjects[i].blocker:this.gameObjects[i].getScale(sM, this.gameObjects[i].isItem));
          if (this.gameObjects[i].active && util.getDistance(x, y, this.gameObjects[i].x,
              this.gameObjects[i].y) < (s + blockS))
              return false;
      }
        for (const object of this.getGridArrays(x, y, 500).flat(1)) {
          const block = object.blocker ? object.blocker : object.getScale(sM, object.isItem);
        }
      
      if (!ignoreWater && indx != 18 && y >= (config.mapScale / 2) - (config.riverWidth / 2) && y <=
          (config.mapScale / 2) + (config.riverWidth / 2)) {
          return false;
      }*/
      return true;
    }
  }, {
    key: "wiggleObject",
    value:
    // ADD PROJECTILE:

    // todo: add projectile manager

    /*addProjectile(x: number, y: number, dir: number, range: number, indx: number) {
        var tmpData = items.projectiles[indx];
        var tmpProj;
        for (var i = 0; i < items.projectiles.length; ++i) {
            if (!projectiles[i].active) {
                tmpProj = projectiles[i];
                break;
            }
        }
        if (!tmpProj) {
            tmpProj = new Projectile(players, UTILS);
            projectiles.push(tmpProj);
        }
        tmpProj.init(indx, x, y, dir, tmpData.speed, range, tmpData.scale);
    };*/

    // CHECK PLAYER COLLISION:
    /*checkCollision(player: Player, other: any, delta: number) {
        delta = delta||1;
        var dx = player.x - other.x;
        var dy = player.y - other.y;
        var tmpLen = player.scale + other.scale;
        if (Math.abs(dx) <= tmpLen || Math.abs(dy) <= tmpLen) {
            tmpLen = player.scale + (other.getScale ? other.getScale() : other.scale);
            var tmpInt = Math.sqrt(dx * dx + dy * dy) - tmpLen;
            if (tmpInt <= 0) {
                if (!other.ignoreCollision) {
                    var tmpDir = util.getDirection(player.x, player.y, other.x, other.y);
                    var tmpDist = util.getDistance(player.x, player.y, other.x, other.y);
                    if (other.isPlayer) {
                        tmpInt = (tmpInt * -1) / 2;
                        player.x += (tmpInt * Math.cos(tmpDir));
                        player.y += (tmpInt * Math.sin(tmpDir));
                        other.x -= (tmpInt * Math.cos(tmpDir));
                        other.y -= (tmpInt * Math.sin(tmpDir));
                    } else {
                        player.x = other.x + (tmpLen * Math.cos(tmpDir));
                        player.y = other.y + (tmpLen * Math.sin(tmpDir));
                        player.xVel *= 0.75;
                        player.yVel *= 0.75;
                    }
                    if (other.dmg && other.owner != player && !(other.owner &&
                        other.owner.team && other.owner.team == player.team)) {
                        player.changeHealth(-other.dmg, other.owner/*, other*/ /*);
                                                                               var tmpSpd = 1.5 * (other.weightM||1);
                                                                               player.xVel += tmpSpd * Math.cos(tmpDir);
                                                                               player.yVel += tmpSpd * Math.sin(tmpDir);
                                                                               if (other.pDmg && !(player.skin && player.skin.poisonRes)) {
                                                                               player.dmgOverTime.dmg = other.pDmg;
                                                                               player.dmgOverTime.time = 5;
                                                                               player.dmgOverTime.doer = other.owner;
                                                                               }*/
    /*if (player.colDmg && other.health) {
        if (other.changeHealth(-player.colDmg)) this.disableObj(other);
        this.hitObj(other, UTILS.getDirection(player.x, player.y, other.x, other.y));
    }*/
    /*}
    } else if (other.trap/* && !player.noTrap*/ /* && other.owner != player && !(other.owner &&
                                                other.owner.team && other.owner.team == player.team)) {
                                                player.lockMove = true;
                                                other.hideFromEnemy = false;
                                                } else if (other.boostSpeed) {
                                                player.xVel += (delta * other.boostSpeed * (other.weightM||1)) * Math.cos(other.dir);
                                                player.yVel += (delta * other.boostSpeed * (other.weightM||1)) * Math.sin(other.dir);
                                                } else if (other.healCol) {
                                                player.healCol = other.healCol;
                                                } else if (other.teleport) {
                                                player.x = util.randInt(0, config.mapScale);
                                                player.y = util.randInt(0, config.mapScale);
                                                }
                                                if (other.zIndex > player.zIndex) player.zIndex = other.zIndex;
                                                return true;
                                                }
                                                }
                                                return false;
                                                }*/

    function wiggleObject(sid, dir, tickIndex) {
      var object = this.gameObjects.findBySid(sid);
      if (object) {
        object.wiggle.add(new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](_data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].gatherWiggle * Math.cos(dir), _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].gatherWiggle * Math.sin(dir)));
        object.wiggles.push([dir, tickIndex]);
      }
    }
  }, {
    key: "resetWiggles",
    value: function resetWiggles(tickIndex) {
      for (var i = 0; i < this.gameObjects.length; i++) {
        var wiggles = this.gameObjects[i].wiggles;
        var j = wiggles.length;
        while (j--) {
          var wiggle = wiggles[j];
          if (tickIndex >= wiggle[1] + 1) {
            wiggles.splice(j, 1);
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update(delta) {
      for (var i = 0; i < this.updateObjects.length; i++) {
        this.updateObjects[i].update(delta);
      }
    }
  }]);
  return ObjectManager;
}();


/***/ }),

/***/ "./frontend/src/manager/PlayerManager.ts":
/*!***********************************************!*\
  !*** ./frontend/src/manager/PlayerManager.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayerManager)
/* harmony export */ });
/* harmony import */ var _data_type_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/type/Player */ "./frontend/src/data/type/Player.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_type_SidArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/type/SidArray */ "./frontend/src/util/type/SidArray.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var PlayerManager = /*#__PURE__*/function () {
  function PlayerManager() {
    _classCallCheck(this, PlayerManager);
    this.playerList = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_3__.SidArray();
    this.myPlayer = new _data_type_Player__WEBPACK_IMPORTED_MODULE_0__.ClientPlayer("", -1, "", new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](), 0, 0, 0, 0, 0);
  }
  _createClass(PlayerManager, [{
    key: "spawnPlayer",
    value: function spawnPlayer(id, sid, name, position, dir, health, maxHealth, scale, skinColor, isMyPlayer) {
      var player = this.playerList.findBySid(sid);
      if (player) {
        player.updateData(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
      } else {
        if (isMyPlayer) {
          player = new _data_type_Player__WEBPACK_IMPORTED_MODULE_0__.ClientPlayer(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
          this.playerList.unshift(player);
        } else {
          player = new _data_type_Player__WEBPACK_IMPORTED_MODULE_0__.Player(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
          this.playerList.push(player);
        }
      }
      if (isMyPlayer) {
        this.myPlayer = player;
        this.myPlayer.alive = true;
        this.myPlayer.visible = true;
      }
      return player;
    }
  }, {
    key: "update",
    value: function update(delta) {
      for (var i = 0; i < this.playerList.length; i++) {
        this.playerList[i].inventory.updateReloads(delta);
      }
    }
  }, {
    key: "findTarget",
    value: function findTarget() {
      var _this = this;
      return this.playerList.slice(1).sort(function (a, b) {
        return a.serverPos.clone().subtract(_this.myPlayer.serverPos).length() - b.serverPos.clone().subtract(_this.myPlayer.serverPos).length();
      })[0];
    }
  }, {
    key: "getNearby",
    value: function getNearby(positon, distance) {
      var _this2 = this;
      var ignoreTeam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.playerList.filter(function (player) {
        return player !== _this2.myPlayer && (!ignoreTeam || player.team !== _this2.myPlayer.team) && player.serverPos.clone().subtract(positon).length() <= distance;
      });
    }
  }, {
    key: "getMeleeThreats",
    value: function getMeleeThreats() {
      var _this3 = this;
      return this.playerList.filter(function (player) {
        return _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(player.serverPos.clone().add(player.velocity), _this3.myPlayer.serverPos.clone().add(_this3.myPlayer.velocity)) <= Math.max.apply(Math, _toConsumableArray(player.inventory.weapons.filter(function (x) {
          return x instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__.MeleeWeapon && x !== null;
        }).map(function (x) {
          return x.stats.range;
        })));
      });
    }
  }, {
    key: "getRangedThreats",
    value: function getRangedThreats() {
      var _this4 = this;
      return this.playerList.filter(function (player) {
        return _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(player.serverPos.clone().add(player.velocity), _this4.myPlayer.serverPos.clone().add(_this4.myPlayer.velocity)) <= Math.max.apply(Math, _toConsumableArray(player.inventory.weapons.filter(function (x) {
          return x instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__.RangedWeapon && x !== null;
        }).map(function (x) {
          return x.stats.range;
        })));
      });
    }
  }]);
  return PlayerManager;
}();


/***/ }),

/***/ "./frontend/src/render/InterfaceModule.ts":
/*!************************************************!*\
  !*** ./frontend/src/render/InterfaceModule.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InterfaceModule)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var InterfaceModule = /*#__PURE__*/_createClass(function InterfaceModule(core, renderManager, position, dimensions) {
  _classCallCheck(this, InterfaceModule);
  this.core = core;
  this.renderManager = renderManager;
  this.position = position;
  this.dimensions = dimensions;
});


/***/ }),

/***/ "./frontend/src/render/RenderManager.ts":
/*!**********************************************!*\
  !*** ./frontend/src/render/RenderManager.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": () => (/* binding */ Renderer),
/* harmony export */   "default": () => (/* binding */ RenderManager)
/* harmony export */ });
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsee */ "./node_modules/tsee/lib/index.js");
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsee__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_type_MoomooUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/type/MoomooUtil */ "./frontend/src/data/type/MoomooUtil.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Renderer = /*#__PURE__*/_createClass(function Renderer(renderManager, core) {
  _classCallCheck(this, Renderer);
  this.renderManager = renderManager;
  this.core = core;
});
var RenderManager = /*#__PURE__*/function (_EventEmitter) {
  _inherits(RenderManager, _EventEmitter);
  var _super = _createSuper(RenderManager);
  function RenderManager(core, canvas, width, height) {
    var _this;
    _classCallCheck(this, RenderManager);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "canvasVertices", [new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"]()]);
    _this.core = core;
    _this.canvas = canvas;
    _this.context = canvas.getContext("2d");
    _this.transformMatrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    _this.defaultMatrix = new DOMMatrixReadOnly([1, 0, 0, 1, 0, 0]);
    _this.viewport = {
      width: width,
      height: height
    };
    _this.cameraPosition = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](14400 / 2, 14400 / 2);
    _this.staticCamera = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](14400 / 2, 14400 / 2);
    _this.renderers = new Map();
    _this.interfaceRenderers = new Map();
    _this.lastRender = 0;
    var resizeListener = function resizeListener() {
      //canvas.width = window.innerWidth;
      //canvas.height = window.innerHeight;
      _this.updateTransformMatrix();
      //this.context.setTransform(this.transformMatrix);
      _this.canvasVertices = [_this.canvasToContext(_this.cameraPosition, 0, 0), _this.canvasToContext(_this.cameraPosition, window.innerWidth, window.innerHeight)];
    };
    resizeListener();
    window.addEventListener("resize", resizeListener);
    canvas.addEventListener("mousemove", function (e) {
      return _this.emit("mousemove", e);
    });
    canvas.addEventListener("mousedown", function (e) {
      return _this.emit("mousedown", e);
    });
    canvas.addEventListener("mouseup", function (e) {
      return _this.emit("mouseup", e);
    });
    return _this;
  }
  _createClass(RenderManager, [{
    key: "updateCamera",
    value: function updateCamera(delta, targetPosition) {
      var distance = _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(this.cameraPosition, targetPosition);
      var direction = _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection(this.cameraPosition, targetPosition);
      var speed = distance * 0.01 * delta;
      if (distance > 0.05) {
        this.cameraPosition.directionMove(direction, speed);
      } else {
        this.cameraPosition.set(targetPosition);
      }
      this.staticCamera.set(targetPosition);
      this.core.playerManager.playerList.forEach(function (player) {
        if (player.visible) {
          if (player.forcePos && !player.renderPos.isNaN()) {
            player.renderPos.set(player.serverPos);
          } else {
            // lerp position
            player.dt += delta;
            var overTick = Math.min(1.7, player.dt / 170);
            /*player.renderPosition.set(
                util.lerp(player.clientPosition.x, player.serverPosition.x, overTick),
                util.lerp(player.clientPosition.y, player.serverPosition.y, overTick)
            );*/

            if (player.lerpPos.isNaN()) player.lerpPos.set(player.serverPos);
            player.renderPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"]();
            player.renderPos.x = _data_type_MoomooUtil__WEBPACK_IMPORTED_MODULE_1__.util.lerp(player.lerpPos.x, player.serverPos.x, overTick);
            player.renderPos.y = _data_type_MoomooUtil__WEBPACK_IMPORTED_MODULE_1__.util.lerp(player.lerpPos.y, player.serverPos.y, overTick);

            //console.log(player.renderPosition.toString(true));

            // lerp direction
            /*const positionDelta = player.positionTimestamp - player.lastPositionTimestamp;
            const tickDelta = lastTime - player.lastPositionTimestamp;
            const ratio = tickDelta / positionDelta;
            player.dir = MathHelper.lerpAngle(player.serverDir, player.lastDir, Math.min(1.2, ratio));*/
          }
        }
      });
    }
  }, {
    key: "updateTransformMatrix",
    value: function updateTransformMatrix() {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var scale = Math.max(windowWidth / this.viewport.width, windowHeight / this.viewport.height);
      this.transformMatrix.a = this.transformMatrix.d = scale;
      this.transformMatrix.e = (windowWidth - this.viewport.width * scale) / 2;
      this.transformMatrix.f = (windowHeight - this.viewport.height * scale) / 2;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.context.clearRect(this.canvasVertices[0].x, this.canvasVertices[0].y, this.canvasVertices[1].x - this.canvasVertices[0].x, this.canvasVertices[1].y - this.canvasVertices[0].y);
    }
  }, {
    key: "render",
    value: function render() {
      var currentMs = Date.now();
      var delta = currentMs - this.lastRender;
      this.lastRender = currentMs;
      var myPlayer = this.core.playerManager.myPlayer;
      if (myPlayer && myPlayer.renderPos) {
        this.updateCamera(delta, /*new Vector(myPlayer.renderPos.x, myPlayer.renderPos.y)*/myPlayer.renderPos);
        //console.log(myPlayer.renderPos);
      }

      //this.clear();
      this.renderers.forEach(function (renderer) {
        renderer.render(delta);
      });
      this.interfaceRenderers.forEach(function (renderer) {
        renderer.render(delta);
      });
      this.core.moduleManager.onRender(delta);
    }
  }, {
    key: "createRenderer",
    value: function () {
      var _createRenderer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, rendererClass, core) {
        var instance;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              instance = new rendererClass(this, core);
              _context.next = 3;
              return instance.load();
            case 3:
              this.renderers.set(id, instance);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function createRenderer(_x, _x2, _x3) {
        return _createRenderer.apply(this, arguments);
      }
      return createRenderer;
    }()
  }, {
    key: "createInterfaceRenderer",
    value: function () {
      var _createInterfaceRenderer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, rendererClass, core) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.interfaceRenderers.set(id, new rendererClass(core, this));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function createInterfaceRenderer(_x4, _x5, _x6) {
        return _createInterfaceRenderer.apply(this, arguments);
      }
      return createInterfaceRenderer;
    }()
  }, {
    key: "createRenderHook",
    value: function createRenderHook() {
      var _this2 = this;
      this.lastRender = Date.now();
      var _ = this;
      var originalAnimFrame = window.requestAnimationFrame;
      window.requestAnimFrame = window.requestAnimationFrame = function (callback) {
        // call moomoo's renderer
        var result = originalAnimFrame.call(this, callback);
        // then call our renderer
        _.render();
        // and finally return result from moomoo's renderer
        return result;
      };
      originalAnimFrame(function () {
        return _this2.render();
      });
    }
  }, {
    key: "getCameraOffset",
    value: function getCameraOffset(camera) {
      return camera.clone().subtract(this.viewport.width / 2, this.viewport.height / 2);
    }
  }, {
    key: "mapToContext",
    value:
    /**
     * Projects given position from the map onto the canvas
     */
    function mapToContext(camera, param1, param2) {
      var offset = this.getCameraOffset(camera);
      if (_typeof(param1) === "object") {
        return param1.clone().subtract(offset);
      } else {
        return new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](param1 - offset.x, param2 - offset.y);
      }
    }
  }, {
    key: "canvasToMap",
    value:
    /**
     * Gives mouse map position from the mouse position on canvas
     */
    function canvasToMap(camera, param1, param2) {
      var offset = this.getCameraOffset(camera);
      if (_typeof(param1) === "object") {
        return param1.clone().subtract(this.transformMatrix.e, this.transformMatrix.f).divide(this.transformMatrix.a, this.transformMatrix.d).add(offset);
      } else {
        return new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"]((param1 - this.transformMatrix.e) / this.transformMatrix.a + offset.x, (param2 - this.transformMatrix.f) / this.transformMatrix.d + offset.y);
      }
    }
  }, {
    key: "canvasToContext",
    value: function canvasToContext(camera, param1, param2) {
      if (_typeof(param1) === "object") {
        return this.mapToContext(camera, this.canvasToMap(camera, param1));
      } else {
        return this.mapToContext(camera, this.canvasToMap(camera, param1, param2));
      }
    }
  }]);
  return RenderManager;
}(tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);


/***/ }),

/***/ "./frontend/src/render/interface/PacketCountModule.ts":
/*!************************************************************!*\
  !*** ./frontend/src/render/interface/PacketCountModule.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PacketCountModule)
/* harmony export */ });
/* harmony import */ var _util_DrawUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/DrawUtil */ "./frontend/src/util/DrawUtil.ts");
/* harmony import */ var _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/engine/PacketCountEngine */ "./frontend/src/util/engine/PacketCountEngine.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _InterfaceModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../InterfaceModule */ "./frontend/src/render/InterfaceModule.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var PacketCountModule = /*#__PURE__*/function (_InterfaceModule) {
  _inherits(PacketCountModule, _InterfaceModule);
  var _super = _createSuper(PacketCountModule);
  function PacketCountModule(core, renderManager) {
    _classCallCheck(this, PacketCountModule);
    return _super.call(this, core, renderManager, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](10, 10), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](200, 18));
  }
  _createClass(PacketCountModule, [{
    key: "render",
    value: function render(delta) {
      var position = this.renderManager.canvasToContext(this.renderManager.staticCamera, this.position);
      var packetPercent = this.core.packetEngine.packetCount2 / _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_1__.PacketCountEngine.PACKET_LIMIT2;
      _util_DrawUtil__WEBPACK_IMPORTED_MODULE_0__["default"].progressBar(this.renderManager.context, packetPercent, position.x, position.y, this.dimensions.x, this.dimensions.y, "#ff0004", "#474232", Math.round(packetPercent * 100) + "%", "#ffffff", "18px Hammersmith One");
    }
  }]);
  return PacketCountModule;
}(_InterfaceModule__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./frontend/src/render/interface/PacketGraphModule.ts":
/*!************************************************************!*\
  !*** ./frontend/src/render/interface/PacketGraphModule.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PacketGraphModule)
/* harmony export */ });
/* harmony import */ var _util_DrawUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/DrawUtil */ "./frontend/src/util/DrawUtil.ts");
/* harmony import */ var _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/engine/PacketCountEngine */ "./frontend/src/util/engine/PacketCountEngine.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _InterfaceModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../InterfaceModule */ "./frontend/src/render/InterfaceModule.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var PacketGraphModule = /*#__PURE__*/function (_InterfaceModule) {
  _inherits(PacketGraphModule, _InterfaceModule);
  var _super = _createSuper(PacketGraphModule);
  function PacketGraphModule(core, renderManager) {
    var _this;
    _classCallCheck(this, PacketGraphModule);
    _this = _super.call(this, core, renderManager, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](10, 43), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](200, 170));
    _this.graphValues = [];
    return _this;
  }
  _createClass(PacketGraphModule, [{
    key: "render",
    value: function render(delta) {
      var position = this.renderManager.canvasToContext(this.renderManager.staticCamera, this.position);
      this.graphValues.push(this.core.packetEngine.packetCount);
      if (this.graphValues.length > 320) this.graphValues.shift();
      _util_DrawUtil__WEBPACK_IMPORTED_MODULE_0__["default"].graph(this.renderManager.context, position.x, position.y, this.dimensions.x, this.dimensions.y, this.graphValues, _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_1__.PacketCountEngine.PACKET_LIMIT, 20, "#ffffff", 2, "#ffffff", 4, this.core.packetEngine.stats_pps_graph, "16px Hammersmith One", 16, true);
    }
  }]);
  return PacketGraphModule;
}(_InterfaceModule__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./frontend/src/socket/Connection.ts":
/*!*******************************************!*\
  !*** ./frontend/src/socket/Connection.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "connection": () => (/* binding */ connection),
/* harmony export */   "inject": () => (/* binding */ inject)
/* harmony export */ });
/* harmony import */ var error_stack_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! error-stack-parser */ "./node_modules/error-stack-parser/error-stack-parser.js");
/* harmony import */ var error_stack_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(error_stack_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _event_EventPacket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event/EventPacket */ "./frontend/src/event/EventPacket.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _packets_Packet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _packets_PacketFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./packets/PacketFactory */ "./frontend/src/socket/packets/PacketFactory.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_3__["default"]("connection");
var connection;
var packetFactory = _packets_PacketFactory__WEBPACK_IMPORTED_MODULE_5__.PacketFactory.getInstance();
var Connection = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Connection, _EventEmitter);
  var _super = _createSuper(Connection);
  function Connection() {
    var _this;
    _classCallCheck(this, Connection);
    _this = _super.call(this);
    _this.socket = null;
    _this.defaultReceiver = null;
    return _this;
  }
  _createClass(Connection, [{
    key: "injectSocket",
    value: function injectSocket(socket) {
      this.socket = socket;
    }
  }, {
    key: "send",
    value: function send(packet) {
      if (this.socket && this.socket.readyState == 1) {
        this.socket.send(packetFactory.serializePacket(packet));
      }
    }
  }]);
  return Connection;
}((events__WEBPACK_IMPORTED_MODULE_1___default()));
;
connection = new Connection();
var Injection = /*#__PURE__*/function (_WebSocket) {
  _inherits(Injection, _WebSocket);
  var _super2 = _createSuper(Injection);
  function Injection(url, protocols) {
    var _this2;
    _classCallCheck(this, Injection);
    _this2 = _super2.call(this, url, protocols);
    if (connection.socket) return _possibleConstructorReturn(_this2);

    // initialize connection and message handler
    connection.injectSocket(_assertThisInitialized(_this2));
    _this2.addEventListener("open", function () {
      logger.info("connection injected");
      connection.emit("ready");
    });
    _this2.addEventListener("close", function (event) {
      logger.info("connection closed");
      connection.emit("close", event.reason);
    });
    _this2.addEventListener("message", function (_ref) {
      var buffer = _ref.data;
      try {
        var _event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_2__["default"](packetFactory.deserializePacket(buffer, _packets_Packet__WEBPACK_IMPORTED_MODULE_4__.Side.Client, Date.now()));
        connection.emit("packetreceive", _event);
        if (_event.isCanceled()) return;
        var serialized = packetFactory.serializePacket(_event.getPacket());
        if (connection.defaultReceiver) {
          connection.defaultReceiver(new Proxy(new MessageEvent(""), {
            get: function get(target, property, receiver) {
              if (property === "data") return serialized;
              if (property === "name") return undefined;
              return target[property];
            }
          }));
        } else {
          logger.warn("default receiver is null! this should not happen!");
        }
      } catch (err) {
        logger.error(err);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this2), "onmessage", {
      get: function get() {
        return null;
      },
      set: function set(func) {
        connection.defaultReceiver = func;
      }
    });
    return _this2;
  }
  _createClass(Injection, [{
    key: "send",
    value: function send(data) {
      var event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_2__["default"](packetFactory.deserializePacket(data, _packets_Packet__WEBPACK_IMPORTED_MODULE_4__.Side.Server, Date.now()));
      connection.emit("packetsend", event);
      if (!event.isCanceled()) {
        connection.emit("packetsendp", event.getPacket());
        _get(_getPrototypeOf(Injection.prototype), "send", this).call(this, packetFactory.serializePacket(event.getPacket()));
      }
    }
  }]);
  return Injection;
}( /*#__PURE__*/_wrapNativeSuper(WebSocket));
function inject() {
  var originalWebSocket = WebSocket;
  Object.defineProperty(window, "WebSocket", {
    get: function get() {
      var caller = error_stack_parser__WEBPACK_IMPORTED_MODULE_0___default().parse(new Error())[1];
      var allowedFunctions = ["Object.connect", "connect"];
      var fileName = /(?:(?:http|https):\/\/(?:sandbox\.|dev\.)?moomoo\.io\/(?:bundle\.js| line 1 > injectedScript line \d+ > Function)|\(unknown source\)\)|:\d+)/g;
      var functionName = /Object\.connect|connect/g;
      if (!caller.fileName || !caller.functionName || !fileName.test(caller.fileName) || !functionName.test(caller.functionName)) {
        logger.warn("accessing WebSocket from unkown source:", caller);
        return originalWebSocket;
      }
      return Injection;
    },
    set: function set(a) {
      console.log("set:", new Error().stack, a);
    }
  });
}


/***/ }),

/***/ "./frontend/src/socket/PacketHandler.ts":
/*!**********************************************!*\
  !*** ./frontend/src/socket/PacketHandler.ts ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PacketHandler": () => (/* binding */ PacketHandler)
/* harmony export */ });
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main */ "./frontend/src/main.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_3__]);
_main__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }







var lastPath = 0;
function processIn(packet) {
  switch (packet.type) {
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.PLAYER_ADD:
      var playerData = packet.data[0];
      _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.spawnPlayer(playerData[0], playerData[1], playerData[2], new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](playerData[3], playerData[4]), playerData[5], playerData[6], playerData[7], playerData[8], playerData[9], packet.data[1]);
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.PLAYER_UPDATE:
      for (var i = 0; i < _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList.length; i++) {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList[i].visible = false;
      }
      for (var _i = 0; _i < packet.data[0].length / 13; _i++) {
        var _playerData = packet.data[0].slice(_i * 13, _i * 13 + 13);
        var player = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList.findBySid(_playerData[0]);
        if (player) {
          /*player.dt = 0;
            player.t1 = (player.t2 === undefined) ? Date.now() : player.t2;
          player.t2 = Date.now();
            player.x1 = player.x;
          player.y1 = player.y;
            player.x2 = playerData[1];
          player.y2 = playerData[2];*/

          //player.lastPositionTimestamp = player.positionTimestamp; // t1
          //player.positionTimestamp = Date.now(); // t2
          //player.clientPosX = player.x; // x1
          //player.clientPosY = player.y; // y1
          //player.lastDir = player.serverDir; // d1

          //player.lastTickPosX = player.serverPosX;
          //player.lastTickPosY = player.serverPosY;

          /*player.clientPosition.set(player.renderPosition);
            player.serverPosition.set(
              playerData[1],
              playerData[2]
          );*/

          player.updatePlayer(_main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager, _playerData[1], _playerData[2], _playerData[3], _playerData[4], _playerData[5], _playerData[6], _playerData[7], _playerData[8], _playerData[9], _playerData[10], _playerData[11], _playerData[12]);

          //player.lerpPos = new Vector(player.renderPos.x, player.renderPos.y) // clientPos
          //player.lastDir = player.serverDir; // d1

          //player.lastTickPosX = player.serverPosX;
          //player.lastTickPosY = player.serverPosY;

          //player.serverPos = new Vector(playerData[1], playerData[2]) // serverPos

          //player.serverPosX = playerData[1]; // x2
          //player.serverPosY = playerData[2]; // y2

          //player.serverDir = info[3]; // d2
          //player.dt = 0; // dt

          //player.dir = playerData[3];
          /*player.buildIndex = playerData[4];
          player.weaponIndex = playerData[5];
          player.weaponVariant = playerData[6];
          player.team = playerData[7];
          player.isLeader = playerData[8];
          player.skinIndex = playerData[9];
          player.tailIndex = playerData[10];
          player.iconIndex = playerData[11];
          player.zIndex = playerData[12];*/
          player.visible = true;
        }
      }
      /*setTarget(playerUtil.findTarget(players));
      if (target && currentPlayer && Date.now() - lastPath > 500) {
          lastPath = Date.now();
          pathfinder.path({ x: currentPlayer.x, y: currentPlayer.y }, { x: currentPlayer.x, y: currentPlayer.y }, { x: target.x, y: target.y});
          // @ts-ignore
          //if (window.path) connection.send(new Packet(PacketType.CHAT, [`pathing:vertx=${window.path.length},thr=${Math.floor(Math.random()*16).toString(16).slice(1,3)},t=${target.sid}`]));
      }*/
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.LOAD_GAME_OBJ:
      for (var _i2 = 0; _i2 < packet.data[0].length / 8; _i2++) {
        var _core$objectManager;
        var data = packet.data[0].slice(_i2 * 8, _i2 * 8 + 8);
        // type (data[5]) is null for player buildings but set for natural objects
        // id (data[6]) is null for natural objects but is set for player buildings
        // owner sid (data[7]) is -1 for natural objects otherwise is set.
        (_core$objectManager = _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager).add.apply(_core$objectManager, _toConsumableArray(data));
      }
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.REMOVE_GAME_OBJ:
      _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.disableBySid(packet.data[0]);
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.REMOVE_ALL_OBJ:
      _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.removeAllItems(packet.data[0]);
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.WIGGLE:
      // first argument is ID and second argument is direction
      // however packet content is [direction, ID]

      // use tickIndex + 1 because wiggle packet is sent before player update
      // so tickIndex is not updated yet
      _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.wiggleObject(packet.data[1], packet.data[0], _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.tickIndex + 1);
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.UPDATE_ITEMS:
      if (packet.data[1]) {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.inventory.setWeapons(packet.data[0]);
      } else {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.inventory.setItems(packet.data[0]);
      }
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.DEATH:
      _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.alive = false;
      _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.inventory.reset();
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.UPDATE_STORE:
      {
        if (!packet.data[2]) {
          if (!packet.data[0]) _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.ownedHats.push(packet.data[1]);
        } else {
          if (!packet.data[0]) _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.ownedTails.push(packet.data[1]);
        }
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.GATHER_ANIM:
      {
        var _player = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList.findBySid(packet.data[0]);
        if (!_player) return;

        // set reload
        _player.inventory.resetReload(_player.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.MeleeWeapon ? _player.inventory.heldItem : _player.inventory.weapons[0]);
        _player.inventory.updateReloads(_main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.ping);

        // damage objects
        var weapon = _player.inventory.weaponSelected;
        var grids = _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.getGridArrays(_player.serverPos.x, _player.serverPos.y, weapon.stats.range + _player.velocity.length() * 2).flat(1);
        for (var _i3 = 0; _i3 < grids.length; _i3++) {
          var object = grids[_i3];
          // use object.scale because .getScale returns collision box while .scale is hitbox
          if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(object.position, _player.lastTickServerPos) - object.scale <= weapon.stats.range + _player.velocity.length() * 2) {
            var _iterator = _createForOfIteratorHelper(object.wiggles),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var wiggle = _step.value;
                var gatherAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].roundTo(_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDirection(_player.serverPos, object.position), 1);
                var safeSpan = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].lineSpan(object.position.clone(), _player.lastTickServerPos.clone(), _player.serverPos.clone().add(_player.velocity));
                if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getAngleDist(wiggle[0], gatherAngle) <= safeSpan + Number.EPSILON) {
                  if (object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.PlayerBuilding) {
                    // damage the building depending on the player's weapon damage
                    var damage = weapon.stats.dmg * weapon.stats.buildingDmgMultiplier;
                    object.health -= damage;
                    _main__WEBPACK_IMPORTED_MODULE_3__.core.moduleManager.onBuildingHit(_player, object, damage);
                  }

                  // remove the wiggle as its confirmed by gather packet
                  object.wiggles.splice(object.wiggles.indexOf(wiggle), 1);
                } else {
                  // this should NOT happen and if it does, there is a 99% chance it is a bug
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        }
        break;
      }
    // case: ...
  }
}

function processOut(packet) {
  switch (packet.type) {
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.ATTACK:
      {
        var myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
        myPlayer.isAttacking = packet.data[0];
        if (myPlayer.isAttacking && myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapon && myPlayer.reloads[myPlayer.inventory.heldItem.id] === 0) {
          myPlayer.inventory.resetReload(myPlayer.inventory.heldItem);
        }
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.SELECT_ITEM:
      {
        var _myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
        var lastHeld = _myPlayer.inventory.heldItem.id;
        if (packet.data[1]) {
          _myPlayer.inventory.heldItem = _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[packet.data[0]];
        } else {
          if (packet.data[0] === lastHeld) {
            _myPlayer.inventory.heldItem = _myPlayer.inventory.weaponSelected;
          } else {
            _myPlayer.inventory.heldItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[packet.data[0]];
          }
        }
      }
  }
}
var PacketHandler = {
  processIn: processIn,
  processOut: processOut
};

/*

var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
                var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
                var tMlt = 1 / depth;
                for (var i = 0; i < depth; ++i) {
                    if (this.xVel)
                        this.x += (this.xVel * delta) * tMlt;
                    if (this.yVel)
                        this.y += (this.yVel * delta) * tMlt;
                    tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
                    for (var x = 0; x < tmpList.length; ++x) {
                        for (var y = 0; y < tmpList[x].length; ++y) {
                            if (tmpList[x][y].active)
                                objectManager.checkCollision(this, tmpList[x][y], tMlt);
                        }
                    }
                }

                */
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/socket/packets/Packet.ts":
/*!***********************************************!*\
  !*** ./frontend/src/socket/packets/Packet.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Packet": () => (/* binding */ Packet),
/* harmony export */   "Side": () => (/* binding */ Side)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * A type alias representing the data contained within a packet
 */
/**
 * An enumeration containing the different sides of communication (for conflicting packets)
 */
var Side;
/**
 * A packet of data recieved from or sent to the server
 */
(function (Side) {
  Side[Side["Server"] = 0] = "Server";
  Side[Side["Client"] = 1] = "Client";
  Side[Side["Both"] = 2] = "Both";
})(Side || (Side = {}));
var Packet = /*#__PURE__*/_createClass(function Packet(type, data) {
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  _classCallCheck(this, Packet);
  this.type = type;
  this.data = data;
  this.time = time;
});


/***/ }),

/***/ "./frontend/src/socket/packets/PacketFactory.ts":
/*!******************************************************!*\
  !*** ./frontend/src/socket/packets/PacketFactory.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PacketFactory": () => (/* binding */ PacketFactory),
/* harmony export */   "Side": () => (/* reexport safe */ _Packet__WEBPACK_IMPORTED_MODULE_0__.Side),
/* harmony export */   "packetTypeMapping": () => (/* binding */ packetTypeMapping),
/* harmony export */   "reversePacketTypeMapping": () => (/* binding */ reversePacketTypeMapping)
/* harmony export */ });
/* harmony import */ var _Packet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _PacketType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var msgpack_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! msgpack-lite */ "./node_modules/msgpack-lite/lib/browser.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/**
 * A mapping of PacketTypes to their serialized counterparts
 */
var packetTypeMapping = {};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ATTACK] = {
  value: "c",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.AUTO_ATK] = {
  value: "7",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CHAT] = {
  value: "ch",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Both
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_ACC_JOIN] = {
  value: "11",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DEATH] = {
  value: "11",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_CREATE] = {
  value: "8",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_LIST] = {
  value: "id",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_ADD] = {
  value: "ac",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_DEL] = {
  value: "ad",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_KICK] = {
  value: "12",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_REQ_JOIN] = {
  value: "10",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DISCONN] = {
  value: "d",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.GATHER_ANIM] = {
  value: "7",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.BUY_AND_EQUIP] = {
  value: "13c",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.HEALTH_UPDATE] = {
  value: "h",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ITEM_BUY] = {
  value: "13",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LEADERBOARD_UPDATE] = {
  value: "5",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LEAVE_CLAN] = {
  value: "9",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LOAD_GAME_OBJ] = {
  value: "6",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.MINIMAP] = {
  value: "mm",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PING] = {
  value: "pp",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Both
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_MOVE] = {
  value: "33",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_ANIMALS] = {
  value: "a",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_REMOVE] = {
  value: "4",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_SET_CLAN] = {
  value: "st",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_START] = {
  value: "1",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_UPDATE] = {
  value: "33",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SELECT_ITEM] = {
  value: "5",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SELECT_UPGRADE] = {
  value: "6",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SET_ANGLE] = {
  value: "2",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SET_CLAN_PLAYERS] = {
  value: "sa",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_AGE] = {
  value: "15",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_NOTIFY_SERVER] = {
  value: "14",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_NOTIFY_CLIENT] = {
  value: "p",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_PLACE_LIMIT] = {
  value: "14",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SPAWN] = {
  value: "sp",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_ITEMS] = {
  value: "17",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_STORE] = {
  value: "us",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPGRADES] = {
  value: "16",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.WIGGLE] = {
  value: "8",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.WINDOW_FOCUS] = {
  value: "rmd",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_ADD] = {
  value: "2",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
// packetTypeMapping[PacketType.PLAYER_ATTACK] = { value: "2", side: Side.Client };
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_STATS] = {
  value: "9",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.IO_INIT] = {
  value: "io-init",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DAMAGE_TEXT] = {
  value: "t",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.JOIN_REQUEST] = {
  value: "an",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.REMOVE_GAME_OBJ] = {
  value: "12",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.REMOVE_ALL_OBJ] = {
  value: "13",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ADD_PROJECTILE] = {
  value: "18",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_PROJECTILES] = {
  value: "19",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
};
var reversePacketTypeMapping = [];
for (var _i = 0, _Object$keys = Object.keys(packetTypeMapping); _i < _Object$keys.length; _i++) {
  var _key = _Object$keys[_i];
  reversePacketTypeMapping.push({
    type: parseInt(_key),
    side: packetTypeMapping[_key].side,
    value: packetTypeMapping[_key].value
  });
}

/**
 * Controls serialization of packets in preparation for exchange, and deserialization on the destination
 */
var PacketFactory = /*#__PURE__*/function () {
  function PacketFactory() {
    _classCallCheck(this, PacketFactory);
  }

  /**
   * Serializes a Packet to an ArrayBuffer suitable for transmission
   * @param packet the packet to serialize
   */
  _createClass(PacketFactory, [{
    key: "serializePacket",
    value: function serializePacket(packet) {
      if (!Object.values(_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType).includes(packet.type)) throw new Error("Packet is missing a type.");
      var type;
      if (Object.keys(packetTypeMapping).includes(packet.type.toString())) {
        type = packetTypeMapping[packet.type].value;
      } else {
        throw new Error("Packet type invalid or not implemented: ".concat(_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType[packet.type]));
      }
      try {
        return msgpack_lite__WEBPACK_IMPORTED_MODULE_2__.encode([type, packet.data]);
      } catch (error) {
        throw new Error("msgpack encountered an error: ".concat(error));
      }
    }

    /**
     * Deserializes packets for reading
     * @param buffer an ArrayBuffer to deserialize
     * @param side the recieving side of the packet
     */
  }, {
    key: "deserializePacket",
    value: function deserializePacket(buffer, side) {
      var timeStamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var array;
      try {
        array = msgpack_lite__WEBPACK_IMPORTED_MODULE_2__.decode(new Uint8Array(buffer));
      } catch (error) {
        throw new Error("Invalid packet");
      }
      var packetType;
      var mapping = reversePacketTypeMapping.find(function (mapping) {
        return (mapping.side === side || mapping.side === _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Both) && mapping.value === array[0];
      });
      if (mapping) {
        return new _Packet__WEBPACK_IMPORTED_MODULE_0__.Packet(mapping.type, array[1], timeStamp);
      } else {
        throw new Error("Invalid packet type: ".concat(array[0]));
      }
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * Get an instance of PacketFactory
     * @returns {PacketFactory} An instance of PacketFactory
     */
    function getInstance() {
      return PacketFactory.instance ? PacketFactory.instance : PacketFactory.instance = new PacketFactory();
    }
  }]);
  return PacketFactory;
}();


/***/ }),

/***/ "./frontend/src/socket/packets/PacketType.ts":
/*!***************************************************!*\
  !*** ./frontend/src/socket/packets/PacketType.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PacketType": () => (/* binding */ PacketType)
/* harmony export */ });
var PacketType;
(function (PacketType) {
  PacketType[PacketType["PING"] = 0] = "PING";
  PacketType[PacketType["PLAYER_UPDATE"] = 1] = "PLAYER_UPDATE";
  PacketType[PacketType["PLAYER_MOVE"] = 2] = "PLAYER_MOVE";
  PacketType[PacketType["HEALTH_UPDATE"] = 3] = "HEALTH_UPDATE";
  PacketType[PacketType["UPGRADES"] = 4] = "UPGRADES";
  PacketType[PacketType["SELECT_ITEM"] = 5] = "SELECT_ITEM";
  PacketType[PacketType["LEADERBOARD_UPDATE"] = 6] = "LEADERBOARD_UPDATE";
  PacketType[PacketType["ATTACK"] = 7] = "ATTACK";
  PacketType[PacketType["UPDATE_STATS"] = 8] = "UPDATE_STATS";
  PacketType[PacketType["LOAD_GAME_OBJ"] = 9] = "LOAD_GAME_OBJ";
  PacketType[PacketType["PLAYER_START"] = 10] = "PLAYER_START";
  PacketType[PacketType["SET_ANGLE"] = 11] = "SET_ANGLE";
  PacketType[PacketType["PLAYER_REMOVE"] = 12] = "PLAYER_REMOVE";
  PacketType[PacketType["SELECT_UPGRADE"] = 13] = "SELECT_UPGRADE";
  PacketType[PacketType["GATHER_ANIM"] = 14] = "GATHER_ANIM";
  PacketType[PacketType["AUTO_ATK"] = 15] = "AUTO_ATK";
  PacketType[PacketType["WIGGLE"] = 16] = "WIGGLE";
  PacketType[PacketType["CLAN_CREATE"] = 17] = "CLAN_CREATE";
  PacketType[PacketType["LEAVE_CLAN"] = 18] = "LEAVE_CLAN";
  PacketType[PacketType["CLAN_REQ_JOIN"] = 19] = "CLAN_REQ_JOIN";
  PacketType[PacketType["CLAN_ACC_JOIN"] = 20] = "CLAN_ACC_JOIN";
  PacketType[PacketType["CLAN_KICK"] = 21] = "CLAN_KICK";
  PacketType[PacketType["ITEM_BUY"] = 22] = "ITEM_BUY";
  PacketType[PacketType["UPDATE_AGE"] = 23] = "UPDATE_AGE";
  PacketType[PacketType["UPDATE_ITEMS"] = 24] = "UPDATE_ITEMS";
  PacketType[PacketType["CHAT"] = 25] = "CHAT";
  PacketType[PacketType["CLAN_DEL"] = 26] = "CLAN_DEL";
  PacketType[PacketType["PLAYER_SET_CLAN"] = 27] = "PLAYER_SET_CLAN";
  PacketType[PacketType["SET_CLAN_PLAYERS"] = 28] = "SET_CLAN_PLAYERS";
  PacketType[PacketType["CLAN_ADD"] = 29] = "CLAN_ADD";
  PacketType[PacketType["MINIMAP"] = 30] = "MINIMAP";
  PacketType[PacketType["UPDATE_STORE"] = 31] = "UPDATE_STORE";
  PacketType[PacketType["DISCONN"] = 32] = "DISCONN";
  PacketType[PacketType["WINDOW_FOCUS"] = 33] = "WINDOW_FOCUS";
  PacketType[PacketType["PLAYER_ADD"] = 34] = "PLAYER_ADD";
  PacketType[PacketType["SPAWN"] = 35] = "SPAWN";
  PacketType[PacketType["IO_INIT"] = 36] = "IO_INIT";
  PacketType[PacketType["UPDATE_ANIMALS"] = 37] = "UPDATE_ANIMALS";
  PacketType[PacketType["CLAN_LIST"] = 38] = "CLAN_LIST";
  PacketType[PacketType["BUY_AND_EQUIP"] = 39] = "BUY_AND_EQUIP";
  PacketType[PacketType["DEATH"] = 40] = "DEATH";
  PacketType[PacketType["CLAN_NOTIFY_SERVER"] = 41] = "CLAN_NOTIFY_SERVER";
  PacketType[PacketType["CLAN_NOTIFY_CLIENT"] = 42] = "CLAN_NOTIFY_CLIENT";
  PacketType[PacketType["DAMAGE_TEXT"] = 43] = "DAMAGE_TEXT";
  PacketType[PacketType["JOIN_REQUEST"] = 44] = "JOIN_REQUEST";
  PacketType[PacketType["REMOVE_GAME_OBJ"] = 45] = "REMOVE_GAME_OBJ";
  PacketType[PacketType["REMOVE_ALL_OBJ"] = 46] = "REMOVE_ALL_OBJ";
  PacketType[PacketType["UPDATE_PLACE_LIMIT"] = 47] = "UPDATE_PLACE_LIMIT";
  PacketType[PacketType["ADD_PROJECTILE"] = 48] = "ADD_PROJECTILE";
  PacketType[PacketType["UPDATE_PROJECTILES"] = 49] = "UPDATE_PROJECTILES";
})(PacketType || (PacketType = {}));


/***/ }),

/***/ "./frontend/src/util/DrawUtil.ts":
/*!***************************************!*\
  !*** ./frontend/src/util/DrawUtil.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MathUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MathUtil */ "./frontend/src/util/MathUtil.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function progressBar(context, currentProgress, x, y, width, height, barFillColor, emptyFillColor, text, textFillColor, textFont) {
  context.save();
  context.beginPath();
  if (!emptyFillColor) emptyFillColor = 'black';
  if (!barFillColor) barFillColor = 'white';
  var radius = height / 2;
  var halfradians = 2 * Math.PI / 2;
  var quarterradians = 2 * Math.PI / 4;
  context.arc(radius + x, radius + y, radius, -quarterradians, halfradians, true);
  context.lineTo(x, y + height - radius);
  context.arc(radius + x, height - radius + y, radius, halfradians, quarterradians, true);
  context.lineTo(x + width - radius, y + height);
  context.arc(x + width - radius, y + height - radius, radius, quarterradians, 0, true);
  context.lineTo(x + width, y + radius);
  context.arc(x + width - radius, y + radius, radius, 0, -quarterradians, true);
  context.lineTo(x + radius, y);
  context.fillStyle = emptyFillColor;
  context.fill();
  context.stroke();
  context.closePath();
  context.clip();
  var calculateprogress = currentProgress * width + (x - width);
  var tst = calculateprogress;
  context.beginPath();
  context.arc(radius + tst, radius + y, radius, -quarterradians, halfradians, true);
  context.lineTo(tst, y + height - radius);
  context.arc(radius + tst, height - radius + y, radius, halfradians, quarterradians, true);
  context.lineTo(tst + width - radius, y + height);
  context.arc(tst + width - radius, y + height - radius, radius, quarterradians, 0, true);
  context.lineTo(tst + width, y + radius);
  context.arc(tst + width - radius, y + radius, radius, 0, -quarterradians, true);
  context.lineTo(tst + radius, y);
  context.fillStyle = barFillColor;
  context.fill();
  context.font = textFont;
  context.fillStyle = textFillColor;
  context.textAlign = "center";
  context.fillText(text, x + width / 2, y + height / 2);
  context.closePath();
  context.restore();
}
function graph(context, x, y, width, height, data, maxValue, step, baseColor, baseLineWidth, lineColor, lineLineWidth, statsData, statsFont, statsFontHeight, strokeStats) {
  var statsStrokeColor = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : "#000000";
  var statsFillColor = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : "#ffffff";
  context.save();
  context.strokeStyle = baseColor;
  context.lineWidth = baseLineWidth;
  context.beginPath();
  context.rect(x, y, width, height);
  context.stroke();
  var rows = Math.ceil(maxValue / step);
  for (var i = 0; i < rows; i++) {
    var of = i / rows * height;
    context.beginPath();
    context.moveTo(x, y + of);
    context.lineTo(x + width, y + of);
    context.closePath();
    context.stroke();
  }
  context.strokeStyle = lineColor;
  context.lineWidth = lineLineWidth;
  context.beginPath();
  context.moveTo(x, y + (1 - data[0] / maxValue) * height);
  for (var _i = 0; _i < data.length; _i++) {
    var val = data[_i];
    var xPos = x + _i / data.length * width;
    var yPos = y + (1 - val / maxValue) * height;
    context.lineTo(xPos, yPos);
  }
  context.stroke();
  if (statsFont !== undefined && statsFontHeight !== undefined && strokeStats !== undefined) {
    context.font = statsFont;
    var avg = _MathUtil__WEBPACK_IMPORTED_MODULE_0__["default"].averageOfArray(statsData).toFixed(2);
    var max = Math.max.apply(Math, _toConsumableArray(statsData));
    var _yPos = y + height + statsFontHeight / 2 + 3;
    context.strokeStyle = statsStrokeColor;
    context.fillStyle = statsFillColor;
    context.textAlign = "start";
    if (strokeStats) context.strokeText("Avg: ".concat(avg), x, _yPos);
    context.fillText("Avg: ".concat(avg), x, _yPos);
    var maxText = "Max: ".concat(max);
    var textwidth = context.measureText(maxText);
    if (strokeStats) context.strokeText(maxText, x + width - textwidth.width, _yPos);
    context.fillText(maxText, x + width - textwidth.width, _yPos);
  }
  context.restore();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  progressBar: progressBar,
  graph: graph
});

/***/ }),

/***/ "./frontend/src/util/Logger.ts":
/*!*************************************!*\
  !*** ./frontend/src/util/Logger.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Level;
(function (Level) {
  Level[Level["LOG"] = 0] = "LOG";
  Level[Level["INFO"] = 1] = "INFO";
  Level[Level["WARN"] = 2] = "WARN";
  Level[Level["ERROR"] = 3] = "ERROR";
  Level[Level["TRACE"] = 4] = "TRACE";
})(Level || (Level = {}));
var LogLevel = new Map();
LogLevel.set(Level.LOG, "LOG");
LogLevel.set(Level.INFO, "INFO");
LogLevel.set(Level.WARN, "WARN");
LogLevel.set(Level.ERROR, "ERROR");
LogLevel.set(Level.TRACE, "TRACE");
function format(loggerId, level) {
  for (var _len = arguments.length, msg = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    msg[_key - 2] = arguments[_key];
  }
  return ["NVR | ".concat(loggerId, ": [").concat(LogLevel.get(level), "] ->")].concat(msg);
}
var Logger = /*#__PURE__*/function () {
  function Logger(arg0, arg1) {
    _classCallCheck(this, Logger);
    this.id = typeof arg0 == "string" ? arg0 : arg1;
    this.profilers = new Map();
    this.console = _typeof(arg0) == "object" ? arg0 : window.console;
  }
  _createClass(Logger, [{
    key: "log",
    value: function log() {
      var _this$console;
      for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        message[_key2] = arguments[_key2];
      }
      (_this$console = this.console).log.apply(_this$console, _toConsumableArray(format.apply(void 0, [this.id, Level.LOG].concat(message))));
    }
  }, {
    key: "info",
    value: function info() {
      var _this$console2;
      for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        message[_key3] = arguments[_key3];
      }
      (_this$console2 = this.console).log.apply(_this$console2, _toConsumableArray(format.apply(void 0, [this.id, Level.INFO].concat(message))));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _this$console3;
      for (var _len4 = arguments.length, message = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        message[_key4] = arguments[_key4];
      }
      (_this$console3 = this.console).log.apply(_this$console3, _toConsumableArray(format.apply(void 0, [this.id, Level.WARN].concat(message))));
    }
  }, {
    key: "error",
    value: function error() {
      var _this$console4;
      for (var _len5 = arguments.length, message = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        message[_key5] = arguments[_key5];
      }
      (_this$console4 = this.console).log.apply(_this$console4, _toConsumableArray(format.apply(void 0, [this.id, Level.ERROR].concat(message))));
    }
  }, {
    key: "trace",
    value: function trace() {
      var _this$console5;
      for (var _len6 = arguments.length, message = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        message[_key6] = arguments[_key6];
      }
      (_this$console5 = this.console).trace.apply(_this$console5, _toConsumableArray(format.apply(void 0, [this.id, Level.TRACE].concat(message))));
    }
  }, {
    key: "profile",
    value: function profile(profileId) {
      if (this.profilers.has(profileId)) {
        var _this$console6;
        for (var _len7 = arguments.length, message = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          message[_key7 - 1] = arguments[_key7];
        }
        (_this$console6 = this.console).log.apply(_this$console6, _toConsumableArray(format.apply(void 0, [this.id, Level.LOG].concat(message, ["(took ".concat(Date.now() - this.profilers.get(profileId), " ms)")]))));
        this.profilers["delete"](profileId);
      } else {
        this.profilers.set(profileId, Date.now());
      }
    }
  }]);
  return Logger;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logger);

/***/ }),

/***/ "./frontend/src/util/MathUtil.ts":
/*!***************************************!*\
  !*** ./frontend/src/util/MathUtil.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function lerp(value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
}
function decel(val, cel) {
  if (val > 0) val = Math.max(0, val - cel);else if (val < 0) val = Math.min(0, val + cel);
  return val;
}
function getDistance(pos1, pos2) {
  return pos1.clone().subtract(pos2).length();
}
function getDirection(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x);
}
function getAngleDist(a, b) {
  var p = Math.abs(b - a) % (Math.PI * 2);
  return p > Math.PI ? Math.PI * 2 - p : p;
}
function lerpAngle(value1, value2, amount) {
  var difference = Math.abs(value2 - value1);
  if (difference > Math.PI) {
    if (value1 > value2) {
      value2 += Math.PI * 2;
    } else {
      value1 += Math.PI * 2;
    }
  }
  var value = value2 + (value1 - value2) * amount;
  if (value >= 0 && value <= Math.PI * 2) return value;
  return value % Math.PI * 2;
}
function combineColors(base, added) {
  var mix = [];
  mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
  mix[0] = Math.round(added[0] * added[3] / mix[3] + base[0] * base[3] * (1 - added[3]) / mix[3]); // red
  mix[1] = Math.round(added[1] * added[3] / mix[3] + base[1] * base[3] * (1 - added[3]) / mix[3]); // green
  mix[2] = Math.round(added[2] * added[3] / mix[3] + base[2] * base[3] * (1 - added[3]) / mix[3]); // blue
  return mix;
}
function averageOfArray(array) {
  return sumArray(array) / array.length;
}
function sumArray(array) {
  var a = 0;
  for (var i = 0; i < array.length; i++) a += array[i];
  return a;
}
function roundTo(value, places) {
  var placesMlt = places * 10;
  return Math.round(value * placesMlt) / placesMlt;
}
function lineSpan(origin, p1, p2) {
  var AB = Math.sqrt(Math.pow(origin.x - p1.x, 2) + Math.pow(origin.y - p1.y, 2));
  var BC = Math.sqrt(Math.pow(origin.x - p2.x, 2) + Math.pow(origin.y - p2.y, 2));
  var AC = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randInt: randInt,
  randFloat: randFloat,
  lerp: lerp,
  decel: decel,
  getDistance: getDistance,
  getDirection: getDirection,
  getAngleDist: getAngleDist,
  lerpAngle: lerpAngle,
  combineColors: combineColors,
  averageOfArray: averageOfArray,
  roundTo: roundTo,
  lineSpan: lineSpan,
  sumArray: sumArray
});

/***/ }),

/***/ "./frontend/src/util/StringUtil.ts":
/*!*****************************************!*\
  !*** ./frontend/src/util/StringUtil.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//const validVariableCharRegex = "[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]";

function randomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomString: randomString,
  escapeRegex: escapeRegex
  //validVariableCharRegex
});

/***/ }),

/***/ "./frontend/src/util/engine/InteractionEngine.ts":
/*!*******************************************************!*\
  !*** ./frontend/src/util/engine/InteractionEngine.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InteractionEngine)
/* harmony export */ });
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsee */ "./node_modules/tsee/lib/index.js");
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsee__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var InteractionEngine = /*#__PURE__*/function (_EventEmitter) {
  _inherits(InteractionEngine, _EventEmitter);
  var _super = _createSuper(InteractionEngine);
  function InteractionEngine(core) {
    var _this;
    _classCallCheck(this, InteractionEngine);
    _this = _super.call(this);
    _this.core = core;
    return _this;
  }
  _createClass(InteractionEngine, [{
    key: "safePlacement",
    value: function safePlacement(item, angle) {
      var canPlace = this.core.objectManager.canPlaceObject([this.core.playerManager.myPlayer.serverPos, 35, angle], item, true);
      if (canPlace) {
        this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
        this.vanillaPlaceItem(item, angle);
      }
    }
  }, {
    key: "vanillaPlaceItem",
    value: function vanillaPlaceItem(item, angle) {
      _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.SELECT_ITEM, [item.id, false]));
      _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.ATTACK, [1, angle]));
      _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.ATTACK, [0, angle]));
      // TODO: switch to last item instead of primary weapon
      _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.SELECT_ITEM, [this.core.playerManager.myPlayer.inventory.weaponSelected.id, true]));
    }
  }]);
  return InteractionEngine;
}(tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);


/***/ }),

/***/ "./frontend/src/util/engine/PacketCountEngine.ts":
/*!*******************************************************!*\
  !*** ./frontend/src/util/engine/PacketCountEngine.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PacketCountEngine": () => (/* binding */ PacketCountEngine)
/* harmony export */ });
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsee */ "./node_modules/tsee/lib/index.js");
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsee__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Logger */ "./frontend/src/util/Logger.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var logger = new _Logger__WEBPACK_IMPORTED_MODULE_2__["default"]("packet-engine");
var PacketCountEngine = /*#__PURE__*/function (_EventEmitter) {
  _inherits(PacketCountEngine, _EventEmitter);
  var _super = _createSuper(PacketCountEngine);
  // 5400 per minute

  function PacketCountEngine(core) {
    var _this;
    _classCallCheck(this, PacketCountEngine);
    _this = _super.call(this);
    _this.started = false;
    _this.timer = PacketCountEngine.TIMER_MAX;
    _this.packetCount = 1;
    _this.s60Counter = 0;
    _this.packetCount2 = 1;
    _this.stats_pps_graph = [];
    var start = function start() {
      _this.timer = PacketCountEngine.TIMER_MAX;
      _this.packetCount = 1;
      _this.s60Counter = 0;
      _this.packetCount2 = 1;
      core.on("update", function (delta) {
        if (_this.timer - delta <= PacketCountEngine.TIMER_MAX * -0.5) {
          _this.packetCount = 0;
          _this.timer = PacketCountEngine.TIMER_MAX - delta % PacketCountEngine.TIMER_MAX;
          logger.log("compensated for delta excession (".concat(delta, " ms)"));
          _this.s60Counter += Math.floor(delta / 1000);
        } else {
          _this.timer -= delta;
        }
        if (_this.timer <= -PacketCountEngine.SAFETY) {
          var excession = _this.timer * -1 % PacketCountEngine.TIMER_MAX - PacketCountEngine.SAFETY;
          _this.timer = PacketCountEngine.TIMER_MAX - excession;
          _this.stats_pps_graph.push(_this.packetCount);
          if (_this.stats_pps_graph.length > 60) _this.stats_pps_graph.shift();
          _this.packetCount = 0;
          _this.s60Counter++;
        }
        if (_this.s60Counter >= 60) {
          _this.s60Counter -= 60;
          _this.packetCount2 = 0;
        }
      });
    };
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetsend", function (event) {
      if (!_this.started) _this.started = true, start();
      //if (event.getPacket().type != PacketType.SPAWN) return event.cancel();
      _this.packetCount++;
      _this.packetCount2++;
    });
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("ready", function /*event: EventPacket*/
    () {
      /*if (event.getPacket().type === PacketType.IO_INIT) */ //start();
    });
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("close", function () {
      console.log("diconnected with pps:", _this.packetCount, "ppm:", _this.packetCount2);
    });
    return _this;
  }
  _createClass(PacketCountEngine, [{
    key: "handlePing",
    value: function handlePing(ping) {
      if (ping > PacketCountEngine.SAFETY && ping - PacketCountEngine.SAFETY < 10 && ping < 1e3) {
        PacketCountEngine.SAFETY = ping;
      }
    }
  }, {
    key: "availableTotal",
    get: function get() {
      return Math.max(PacketCountEngine.PACKET_LIMIT - this.packetCount, 0);
    }
  }]);
  return PacketCountEngine;
}(tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);
_defineProperty(PacketCountEngine, "TIMER_MAX", 1 * 1000);
_defineProperty(PacketCountEngine, "SAFETY", 15);
_defineProperty(PacketCountEngine, "PACKET_LIMIT", 120);
_defineProperty(PacketCountEngine, "PACKET_LIMIT2", 5400);


/***/ }),

/***/ "./frontend/src/util/engine/TickEngine.ts":
/*!************************************************!*\
  !*** ./frontend/src/util/engine/TickEngine.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TickEngine": () => (/* binding */ TickEngine)
/* harmony export */ });
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsee */ "./node_modules/tsee/lib/index.js");
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsee__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var TickEngine = /*#__PURE__*/function (_EventEmitter) {
  _inherits(TickEngine, _EventEmitter);
  var _super = _createSuper(TickEngine);
  function TickEngine(core) {
    var _this;
    _classCallCheck(this, TickEngine);
    _this = _super.call(this);
    _this.tickIndex = -1;
    _this.pingQueue = [];
    _this.lastPing = 0;
    _this.ping = 0;
    _this.firstPinged = false;
    _this.firstPonged = false;
    _this.lastTick = 0;
    _this.predictionTick = -1;
    _this.waitingForPrePrediction = -1;
    _this.waitingForPostPrediction = -1;
    _this.pings = [];
    _this.deltas = [];
    var canReceivePing = false;
    _socket_Connection__WEBPACK_IMPORTED_MODULE_3__.connection.on("packetsend", function (event) {
      if (event.getPacket().type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PING) {
        if (!canReceivePing) return;
        _this.pingQueue.push(Date.now());
        _this.lastPing = Date.now();
      }
    });
    _socket_Connection__WEBPACK_IMPORTED_MODULE_3__.connection.on("packetreceive", function (event) {
      var packet = event.getPacket();
      if (packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PING) {
        //if (!this.firstPonged) this.firstPonged = true;

        var shift = _this.pingQueue.shift();
        if (!shift) return;
        _this.ping = (Date.now() - shift) / 2;

        /*if (this.pings.length > 5) {
            this.pings.pop();
            this.pings.push(this.ping);
            this.pings.shift();
        } else {
            this.pings.push(this.ping);
        }*/

        _this.emit("ping", _this.ping);
      } else if (packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PLAYER_UPDATE) {
        _this.tickIndex++;
        _this.lastTick = Date.now() - _this.ping;
        _this.predictionTick = _this.tickIndex * TickEngine.TICK_DELTA - _this.ping;
        if (_this.serverLag > 0) _this.emit("serverlag", _this.serverLag);
        core.objectManager.resetWiggles(_this.tickIndex);
        _this.emit("tick", _this.tickIndex);
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.IO_INIT) {
        canReceivePing = true;
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PLAYER_START) {
        _this.predictionTick = _this.ping;
      }
    });
    core.on("update", function (delta) {
      var now = Date.now();
      _this.deltas.push(delta);
      if (_this.deltas.length > 8) _this.deltas.shift();
      var maxDelta = Math.max.apply(Math, _toConsumableArray(_this.deltas));
      if (_this.predictionTick === -1) return;
      _this.predictionTick += delta;
      var futureProgress = (_this.predictionTick + maxDelta + _this.ping * 2) / TickEngine.TICK_DELTA;

      // TODO: make offset automatically adjust itself

      // 30%
      var offset = /*0.3*/_this.ping / TickEngine.TICK_DELTA;

      // emit 30% before the actual tick
      if (futureProgress >= _this.waitingForPrePrediction - offset) {
        _this.emit("pretick", _this.waitingForPrePrediction);
        _this.waitingForPrePrediction = Math.ceil(futureProgress);
      }

      // emit 30% after the actual tick
      if (futureProgress >= _this.waitingForPostPrediction + offset) {
        _this.emit("posttick", _this.waitingForPostPrediction);
        _this.waitingForPostPrediction = Math.ceil(futureProgress);
      }

      // emit pre-tick at 60% of the current tick passed
      /*if (this.predictionTick >= this.emittedPredictionPreTick + 0.65) {
          const value = Math.ceil(this.predictionTick);
          console.log("pre", value, Date.now());
          this.emit("pretick", value);
          this.emittedPredictionPreTick = value;
      }
        // emit post-tick at 20% of the current tick passed
      if (this.predictionTick >= this.emittedPredictionPostTick + 0.35) {
          console.log("post", Math.floor(this.predictionTick), Date.now());
          this.emit("posttick", Math.floor(this.predictionTick));
          this.emittedPredictionPostTick = Math.ceil(this.predictionTick);
      }*/

      // clean all predicted buildings if we didnt receive confirming placement packet
      // use a while loop since we are splicing inside of it
      var predictedPlacements = core.objectManager.predictedPlacements;
      var i = predictedPlacements.length;
      while (i--) {
        if (now - predictedPlacements[i].placedTimestamp > _this.ping * 2 + maxDelta + TickEngine.TICK_DELTA) {
          var prediction = predictedPlacements[i];
          // failed = possibility of a hidden trap therefore we add trap as a prediction for the next 0.6s
          core.objectManager.addPlacementAttempt([prediction.position, core.playerManager.myPlayer.scale, prediction.dir], _data_moomoo_items__WEBPACK_IMPORTED_MODULE_2__.items.list[15], Date.now() + 600);
          predictedPlacements.splice(i, 1);
        }
      }
    });
    return _this;
  }
  _createClass(TickEngine, [{
    key: "tick",
    value: function tick() {
      this.lastTick = Date.now();
    }
  }, {
    key: "tickIn",
    value: function tickIn(ms) {
      return Math.ceil((this.predictionTick + ms) / TickEngine.TICK_DELTA);
    }
  }, {
    key: "timeToNextTick",
    get: function get() {
      return TickEngine.TICK_DELTA - (Date.now() - this.lastTick) - this.ping;
    }
  }, {
    key: "serverLag",
    get: function get() {
      return Math.max(Date.now() - this.lastTick + TickEngine.TICK_DELTA, 0);
    }
  }]);
  return TickEngine;
}(tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);
_defineProperty(TickEngine, "TICK_DELTA", 1000 / _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].serverUpdateRate);


/***/ }),

/***/ "./frontend/src/util/processor/MovementProcessor.ts":
/*!**********************************************************!*\
  !*** ./frontend/src/util/processor/MovementProcessor.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MovementProcessor)
/* harmony export */ });
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _MathUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MathUtil */ "./frontend/src/util/MathUtil.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


// dont use this, its just copy paste from my very old mod, needs veeery big adjustments
var MovementProcessor = /*#__PURE__*/function () {
  function MovementProcessor(player) {
    _classCallCheck(this, MovementProcessor);
    this.player = player;
    this.lockMove = false;
    this.slowMult = 1;
  }
  _createClass(MovementProcessor, [{
    key: "possibleMoveDirectionsKeyboard",
    value: function possibleMoveDirectionsKeyboard() {
      return [0, 45, 90, 135, 180, 225, 270, 315].map( /*MathHelper.degToRad*/function (x) {
        return x * (Math.PI / 180);
      });
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.predict(delta, undefined, this.player.serverPos);
    }

    /*possibleMoves(delta, x, y, xVel, yVel) {
        const possible = [];
          const directions = this.#possibleMoveDirectionsKeyboard();
        for (let i = 0, length = directions.length; i < length; i++) {
            possible.push(this.predict(delta, directions[i], x, y, xVel, yVel));
        }
          return possible;
    }*/
  }, {
    key: "deepPredict",
    value: function deepPredict(msForward, precision, movementDir) {
      var lastResult = {
        position: undefined,
        velocity: undefined
      };
      for (var i = 0; i < msForward; i += precision) {
        lastResult = this.predict(precision, movementDir, lastResult.position, lastResult.velocity);
      }
      return lastResult;
    }
  }, {
    key: "predict",
    value: function predict(delta, movementDir, startingPos, startingVelocity) {
      var _movementDir;
      var position = startingPos !== null && startingPos !== void 0 ? startingPos : this.player.serverPos;
      var velocity = startingVelocity !== null && startingVelocity !== void 0 ? startingVelocity : this.player.serverPos.clone().subtract(this.player.lastTickServerPos);
      movementDir = (_movementDir = movementDir) !== null && _movementDir !== void 0 ? _movementDir : _MathUtil__WEBPACK_IMPORTED_MODULE_1__["default"].getDirection(this.player.lastTickServerPos, this.player.serverPos);

      // slower
      if (this.slowMult < 1) {
        this.slowMult += 0.0008 * delta;
        if (this.slowMult > 1) {
          this.slowMult = 1;
        }
      }

      // move
      if (this.lockMove) {
        velocity.set(0, 0);
      } else {
        // base speed multiplier
        var speedMult = (this.player.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_0__.Weapon ? 1 : 0.5) * this.player.inventory.weaponSelected.stats.speedMultiplier /* * (this.player.hat.spdMult || 1) * (this.player.tail.spdMult || 1) * (this.isInSnow() ? (this.player.hat.coldM || MovementProcessor.snowSpeed) : 1)*/ * this.slowMult;

        // apply water slowdown & boost
        if ( /*!this.player.zIndex && */this.isInWater()) {
          /*if (this.player.hat.watrImm) {
              speedMult *= 0.75;
              this.xVel += MovementProcessor.CONFIG.waterPush * 0.4 * delta;
          } else {*/
          speedMult *= 0.33;
          velocity.x += MovementProcessor.CONFIG.waterPush * delta;
          /*}*/
        }

        var inputxVel = Math.cos(movementDir);
        var inputyVel = Math.sin(movementDir);
        var length = Math.sqrt(inputxVel * inputxVel + inputyVel * inputyVel);
        if (length != 0) {
          inputxVel /= length;
          inputyVel /= length;
        }
        velocity.x += inputxVel * speedMult * delta * MovementProcessor.CONFIG.playerSpeed;
        velocity.y += inputyVel * speedMult * delta * MovementProcessor.CONFIG.playerSpeed;
      }

      // TODO: Object Collision
      // TODO: Player Collision

      // decel
      velocity.multiply(Math.pow(MovementProcessor.CONFIG.playerDecel, delta));
      position.add(velocity);
      console.log(position);
      return {
        position: position,
        velocity: velocity
      };
    }

    /*gather() {
        this.slowMult -= this.player.weapons.primary.hitSlow || .3;
        if (this.slowMult < 0) {
            this.slowMult = 0;
        }
    }*/
  }, {
    key: "isInSnow",
    value: function isInSnow() {
      return this.player.serverPos.y <= MovementProcessor.CONFIG.snowBiomeTop;
    }
  }, {
    key: "isInWater",
    value: function isInWater() {
      return this.player.serverPos.y >= MovementProcessor.CONFIG.mapScale / 2 - MovementProcessor.CONFIG.riverHeight / 2 && this.player.serverPos.y <= MovementProcessor.CONFIG.mapScale / 2 + MovementProcessor.CONFIG.riverHeight / 2;
    }
  }]);
  return MovementProcessor;
}();
_defineProperty(MovementProcessor, "CONFIG", {
  playerDecel: 0.993,
  snowBiomeTop: 2400,
  snowSpeed: 0.75,
  mapScale: 14400,
  riverHeight: 724,
  waterPush: 0.0011,
  playerSpeed: 0.0016
});


/***/ }),

/***/ "./frontend/src/util/type/SidArray.ts":
/*!********************************************!*\
  !*** ./frontend/src/util/type/SidArray.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidArray": () => (/* binding */ SidArray)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var SidArray = /*#__PURE__*/function (_Array) {
  _inherits(SidArray, _Array);
  var _super = _createSuper(SidArray);
  function SidArray() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    _classCallCheck(this, SidArray);
    return _super.call(this, size);
  }
  _createClass(SidArray, [{
    key: "findBySid",
    value: function findBySid(sid) {
      for (var i = 0, length = this.length; i < length; i++) {
        var item = this[i];
        if (item.sid === sid) {
          return item;
        }
      }
      return null;
    }
  }, {
    key: "remove",
    value: function remove(item) {
      var index = this.indexOf(item);
      if (index > -1) {
        return this.splice(index, 1)[0];
      }
      return null;
    }
  }, {
    key: "removeBySid",
    value: function removeBySid(sid) {
      this.remove(this.findBySid(sid));
    }
  }]);
  return SidArray;
}( /*#__PURE__*/_wrapNativeSuper(Array));

/***/ }),

/***/ "./frontend/src/util/type/Vector.ts":
/*!******************************************!*\
  !*** ./frontend/src/util/type/Vector.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Vector = /*#__PURE__*/function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);
    this.x = x !== null && x !== void 0 ? x : 0;
    this.y = y !== null && y !== void 0 ? y : 0;
  }
  _createClass(Vector, [{
    key: "isNull",
    value: function isNull() {
      return this.x == 0 && this.y == 0;
    }
  }, {
    key: "isNaN",
    value: function (_isNaN) {
      function isNaN() {
        return _isNaN.apply(this, arguments);
      }
      isNaN.toString = function () {
        return _isNaN.toString();
      };
      return isNaN;
    }(function () {
      return isNaN(this.x) || isNaN(this.y);
    })
  }, {
    key: "add",
    value: function add(param1, param2) {
      if (_typeof(param1) === "object") {
        this.x += param1.x;
        this.y += param1.y;
      } else if (typeof param2 === "number") {
        this.x += param1;
        this.y += param2;
      } else {
        this.x += param1;
        this.y += param1;
      }
      return this;
    }
  }, {
    key: "subtract",
    value: function subtract(param1, param2) {
      if (_typeof(param1) === "object") {
        this.x -= param1.x;
        this.y -= param1.y;
      } else if (typeof param2 === "number") {
        this.x -= param1;
        this.y -= param2;
      } else {
        this.x -= param1;
        this.y -= param1;
      }
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(param1, param2) {
      if (_typeof(param1) === "object") {
        this.x *= param1.x;
        this.y *= param1.y;
      } else if (typeof param2 === "number") {
        this.x *= param1;
        this.y *= param2;
      } else {
        this.x *= param1;
        this.y *= param1;
      }
      return this;
    }
  }, {
    key: "divide",
    value: function divide(param1, param2) {
      if (_typeof(param1) === "object") {
        this.x /= param1.x;
        this.y /= param1.y;
      } else if (typeof param2 === "number") {
        this.x /= param1;
        this.y /= param2;
      } else {
        this.x /= param1;
        this.y /= param1;
      }
      return this;
    }
  }, {
    key: "set",
    value: function set(param1, param2) {
      if (_typeof(param1) === "object") {
        this.x = param1.x;
        this.y = param1.y;
      } else if (typeof param2 === "number") {
        this.x = param1;
        this.y = param2;
      } else {
        this.x = param1;
        this.y = param1;
      }
      return this;
    }
  }, {
    key: "directionMove",
    value: function directionMove(direction, amount) {
      this.x += Math.cos(direction) * amount;
      this.y += Math.sin(direction) * amount;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
  }, {
    key: "length",
    value: function length() {
      return Math.hypot(this.x, this.y);
    }
  }, {
    key: "toString",
    value: function toString(round) {
      return "[" + (round ? Math.round(this.x) : this.x) + ", " + (round ? Math.round(this.y) : this.y) + "]";
    }
  }]);
  return Vector;
}();


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/main.scss":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/main.scss ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  overflow: hidden;\n}\n\n#loader-wrapper {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 500px;\n  height: auto;\n  padding: 0px;\n  transform: translate(-50%, -50%);\n  z-index: 99999;\n}\n\n#loader {\n  position: relative;\n  margin: 0px;\n  width: 500px;\n  height: auto;\n  color: white;\n  padding: 30px;\n  border-radius: 40px;\n  z-index: 99999;\n  text-shadow: -3px -3px 0 black, -3px -2px 0 black, -3px -1px 0 black, -3px 0px 0 black, -3px 1px 0 black, -3px 2px 0 black, -3px 3px 0 black, -2px -3px 0 black, -2px -2px 0 black, -2px -1px 0 black, -2px 0px 0 black, -2px 1px 0 black, -2px 2px 0 black, -2px 3px 0 black, -1px -3px 0 black, -1px -2px 0 black, -1px -1px 0 black, -1px 0px 0 black, -1px 1px 0 black, -1px 2px 0 black, -1px 3px 0 black, 0px -3px 0 black, 0px -2px 0 black, 0px -1px 0 black, 0px 0px 0 black, 0px 1px 0 black, 0px 2px 0 black, 0px 3px 0 black, 1px -3px 0 black, 1px -2px 0 black, 1px -1px 0 black, 1px 0px 0 black, 1px 1px 0 black, 1px 2px 0 black, 1px 3px 0 black, 2px -3px 0 black, 2px -2px 0 black, 2px -1px 0 black, 2px 0px 0 black, 2px 1px 0 black, 2px 2px 0 black, 2px 3px 0 black, 3px -3px 0 black, 3px -2px 0 black, 3px -1px 0 black, 3px 0px 0 black, 3px 1px 0 black, 3px 2px 0 black, 3px 3px 0 black;\n}\n\n#loader::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: linear-gradient(105deg, rgb(91, 0, 0) 0%, rgb(101, 0, 78) 24%, rgb(0, 67, 94) 48%, rgb(7, 85, 0) 73%, rgb(0, 9, 88) 100%);\n  width: 100%;\n  height: 100%;\n  transform: scale(1.02);\n  z-index: -1;\n  background-size: 500%;\n  animation: animate 20s infinite;\n}\n\n#loader::after {\n  filter: blur(7px);\n}\n\n@keyframes animate {\n  0% {\n    background-position: 0 0;\n  }\n  50% {\n    background-position: 100% 0;\n  }\n  100% {\n    background-position: 0 0;\n  }\n}\n#loader #header {\n  text-align: center;\n  font-size: 35px;\n}\n\n#loader #info {\n  text-align: center;\n  font-size: 22px;\n}\n\n#loader #details {\n  text-align: center;\n  font-size: 18px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/moomoo.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/moomoo.scss ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*#mainMenu {\n    opacity: 0;\n}*/", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/error-stack-parser/error-stack-parser.js":
/*!***************************************************************!*\
  !*** ./node_modules/error-stack-parser/error-stack-parser.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! stackframe */ "./node_modules/stackframe/stackframe.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '');
                }
                var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').replace(/^.*?\s+/, '');

                // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
                // case it has spaces in it, as the string is split on \s+ later on
                var location = sanitizedLine.match(/ (\(.+\)$)/);

                // remove the parenthesized location from the line, if it was matched
                sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

                // if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
                // because this line doesn't have function name
                var locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
                var functionName = location && sanitizedLine || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                    var matches = line.match(functionNameRegex);
                    var functionName = matches && matches[1] ? matches[1] : undefined;
                    var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                    .replace(/<anonymous function(: (\w+))?>/, '$2')
                    .replace(/\([^)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));


/***/ }),

/***/ "./node_modules/event-lite/event-lite.js":
/*!***********************************************!*\
  !*** ./node_modules/event-lite/event-lite.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */

function EventLite() {
  if (!(this instanceof EventLite)) return new EventLite();
}

(function(EventLite) {
  // export the class for node.js
  if (true) module.exports = EventLite;

  // property name to hold listeners
  var LISTENERS = "listeners";

  // methods to export
  var methods = {
    on: on,
    once: once,
    off: off,
    emit: emit
  };

  // mixin to self
  mixin(EventLite.prototype);

  // export mixin function
  EventLite.mixin = mixin;

  /**
   * Import on(), once(), off() and emit() methods into target object.
   *
   * @function EventLite.mixin
   * @param target {Prototype}
   */

  function mixin(target) {
    for (var key in methods) {
      target[key] = methods[key];
    }
    return target;
  }

  /**
   * Add an event listener.
   *
   * @function EventLite.prototype.on
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function on(type, func) {
    getListeners(this, type).push(func);
    return this;
  }

  /**
   * Add one-time event listener.
   *
   * @function EventLite.prototype.once
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function once(type, func) {
    var that = this;
    wrap.originalListener = func;
    getListeners(that, type).push(wrap);
    return that;

    function wrap() {
      off.call(that, type, wrap);
      func.apply(this, arguments);
    }
  }

  /**
   * Remove an event listener.
   *
   * @function EventLite.prototype.off
   * @param [type] {string}
   * @param [func] {Function}
   * @returns {EventLite} Self for method chaining
   */

  function off(type, func) {
    var that = this;
    var listners;
    if (!arguments.length) {
      delete that[LISTENERS];
    } else if (!func) {
      listners = that[LISTENERS];
      if (listners) {
        delete listners[type];
        if (!Object.keys(listners).length) return off.call(that);
      }
    } else {
      listners = getListeners(that, type, true);
      if (listners) {
        listners = listners.filter(ne);
        if (!listners.length) return off.call(that, type);
        that[LISTENERS][type] = listners;
      }
    }
    return that;

    function ne(test) {
      return test !== func && test.originalListener !== func;
    }
  }

  /**
   * Dispatch (trigger) an event.
   *
   * @function EventLite.prototype.emit
   * @param type {string}
   * @param [value] {*}
   * @returns {boolean} True when a listener received the event
   */

  function emit(type, value) {
    var that = this;
    var listeners = getListeners(that, type, true);
    if (!listeners) return false;
    var arglen = arguments.length;
    if (arglen === 1) {
      listeners.forEach(zeroarg);
    } else if (arglen === 2) {
      listeners.forEach(onearg);
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      listeners.forEach(moreargs);
    }
    return !!listeners.length;

    function zeroarg(func) {
      func.call(that);
    }

    function onearg(func) {
      func.call(that, value);
    }

    function moreargs(func) {
      func.apply(that, args);
    }
  }

  /**
   * @ignore
   */

  function getListeners(that, type, readonly) {
    if (readonly && !that[LISTENERS]) return;
    var listeners = that[LISTENERS] || (that[LISTENERS] = {});
    return listeners[type] || (listeners[type] = []);
  }

})(EventLite);


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./frontend/src/loader/loader.html":
/*!*****************************************!*\
  !*** ./frontend/src/loader/loader.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div id=\"loader-wrapper\"> <div id=\"loader\" class=\"nvr\"> <h1 id=\"header\"></h1> <p id=\"info\"></p> <p id=\"details\"></p> </div> </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

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
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

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
      m = ((value * c) - 1) * Math.pow(2, mLen)
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


/***/ }),

/***/ "./node_modules/int64-buffer/int64-buffer.js":
/*!***************************************************!*\
  !*** ./node_modules/int64-buffer/int64-buffer.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {

// int64-buffer.js

/*jshint -W018 */ // Confusing use of '!'.
/*jshint -W030 */ // Expected an assignment or function call and instead saw an expression.
/*jshint -W093 */ // Did you mean to return a conditional instead of an assignment?

var Uint64BE, Int64BE, Uint64LE, Int64LE;

!function(exports) {
  // constants

  var UNDEFINED = "undefined";
  var BUFFER = (UNDEFINED !== typeof Buffer) && Buffer;
  var UINT8ARRAY = (UNDEFINED !== typeof Uint8Array) && Uint8Array;
  var ARRAYBUFFER = (UNDEFINED !== typeof ArrayBuffer) && ArrayBuffer;
  var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
  var isArray = Array.isArray || _isArray;
  var BIT32 = 4294967296;
  var BIT24 = 16777216;

  // storage class

  var storage; // Array;

  // generate classes

  Uint64BE = factory("Uint64BE", true, true);
  Int64BE = factory("Int64BE", true, false);
  Uint64LE = factory("Uint64LE", false, true);
  Int64LE = factory("Int64LE", false, false);

  // class factory

  function factory(name, bigendian, unsigned) {
    var posH = bigendian ? 0 : 4;
    var posL = bigendian ? 4 : 0;
    var pos0 = bigendian ? 0 : 3;
    var pos1 = bigendian ? 1 : 2;
    var pos2 = bigendian ? 2 : 1;
    var pos3 = bigendian ? 3 : 0;
    var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
    var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
    var proto = Int64.prototype;
    var isName = "is" + name;
    var _isInt64 = "_" + isName;

    // properties
    proto.buffer = void 0;
    proto.offset = 0;
    proto[_isInt64] = true;

    // methods
    proto.toNumber = toNumber;
    proto.toString = toString;
    proto.toJSON = toNumber;
    proto.toArray = toArray;

    // add .toBuffer() method only when Buffer available
    if (BUFFER) proto.toBuffer = toBuffer;

    // add .toArrayBuffer() method only when Uint8Array available
    if (UINT8ARRAY) proto.toArrayBuffer = toArrayBuffer;

    // isUint64BE, isInt64BE
    Int64[isName] = isInt64;

    // CommonJS
    exports[name] = Int64;

    return Int64;

    // constructor
    function Int64(buffer, offset, value, raddix) {
      if (!(this instanceof Int64)) return new Int64(buffer, offset, value, raddix);
      return init(this, buffer, offset, value, raddix);
    }

    // isUint64BE, isInt64BE
    function isInt64(b) {
      return !!(b && b[_isInt64]);
    }

    // initializer
    function init(that, buffer, offset, value, raddix) {
      if (UINT8ARRAY && ARRAYBUFFER) {
        if (buffer instanceof ARRAYBUFFER) buffer = new UINT8ARRAY(buffer);
        if (value instanceof ARRAYBUFFER) value = new UINT8ARRAY(value);
      }

      // Int64BE() style
      if (!buffer && !offset && !value && !storage) {
        // shortcut to initialize with zero
        that.buffer = newArray(ZERO, 0);
        return;
      }

      // Int64BE(value, raddix) style
      if (!isValidBuffer(buffer, offset)) {
        var _storage = storage || Array;
        raddix = offset;
        value = buffer;
        offset = 0;
        buffer = new _storage(8);
      }

      that.buffer = buffer;
      that.offset = offset |= 0;

      // Int64BE(buffer, offset) style
      if (UNDEFINED === typeof value) return;

      // Int64BE(buffer, offset, value, raddix) style
      if ("string" === typeof value) {
        fromString(buffer, offset, value, raddix || 10);
      } else if (isValidBuffer(value, raddix)) {
        fromArray(buffer, offset, value, raddix);
      } else if ("number" === typeof raddix) {
        writeInt32(buffer, offset + posH, value); // high
        writeInt32(buffer, offset + posL, raddix); // low
      } else if (value > 0) {
        fromPositive(buffer, offset, value); // positive
      } else if (value < 0) {
        fromNegative(buffer, offset, value); // negative
      } else {
        fromArray(buffer, offset, ZERO, 0); // zero, NaN and others
      }
    }

    function fromString(buffer, offset, str, raddix) {
      var pos = 0;
      var len = str.length;
      var high = 0;
      var low = 0;
      if (str[0] === "-") pos++;
      var sign = pos;
      while (pos < len) {
        var chr = parseInt(str[pos++], raddix);
        if (!(chr >= 0)) break; // NaN
        low = low * raddix + chr;
        high = high * raddix + Math.floor(low / BIT32);
        low %= BIT32;
      }
      if (sign) {
        high = ~high;
        if (low) {
          low = BIT32 - low;
        } else {
          high++;
        }
      }
      writeInt32(buffer, offset + posH, high);
      writeInt32(buffer, offset + posL, low);
    }

    function toNumber() {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      if (!unsigned) high |= 0; // a trick to get signed
      return high ? (high * BIT32 + low) : low;
    }

    function toString(radix) {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      var str = "";
      var sign = !unsigned && (high & 0x80000000);
      if (sign) {
        high = ~high;
        low = BIT32 - low;
      }
      radix = radix || 10;
      while (1) {
        var mod = (high % radix) * BIT32 + low;
        high = Math.floor(high / radix);
        low = Math.floor(mod / radix);
        str = (mod % radix).toString(radix) + str;
        if (!high && !low) break;
      }
      if (sign) {
        str = "-" + str;
      }
      return str;
    }

    function writeInt32(buffer, offset, value) {
      buffer[offset + pos3] = value & 255;
      value = value >> 8;
      buffer[offset + pos2] = value & 255;
      value = value >> 8;
      buffer[offset + pos1] = value & 255;
      value = value >> 8;
      buffer[offset + pos0] = value & 255;
    }

    function readInt32(buffer, offset) {
      return (buffer[offset + pos0] * BIT24) +
        (buffer[offset + pos1] << 16) +
        (buffer[offset + pos2] << 8) +
        buffer[offset + pos3];
    }
  }

  function toArray(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = null; // Array
    if (raw !== false && offset === 0 && buffer.length === 8 && isArray(buffer)) return buffer;
    return newArray(buffer, offset);
  }

  function toBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = BUFFER;
    if (raw !== false && offset === 0 && buffer.length === 8 && Buffer.isBuffer(buffer)) return buffer;
    var dest = new BUFFER(8);
    fromArray(dest, 0, buffer, offset);
    return dest;
  }

  function toArrayBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    var arrbuf = buffer.buffer;
    storage = UINT8ARRAY;
    if (raw !== false && offset === 0 && (arrbuf instanceof ARRAYBUFFER) && arrbuf.byteLength === 8) return arrbuf;
    var dest = new UINT8ARRAY(8);
    fromArray(dest, 0, buffer, offset);
    return dest.buffer;
  }

  function isValidBuffer(buffer, offset) {
    var len = buffer && buffer.length;
    offset |= 0;
    return len && (offset + 8 <= len) && ("string" !== typeof buffer[offset]);
  }

  function fromArray(destbuf, destoff, srcbuf, srcoff) {
    destoff |= 0;
    srcoff |= 0;
    for (var i = 0; i < 8; i++) {
      destbuf[destoff++] = srcbuf[srcoff++] & 255;
    }
  }

  function newArray(buffer, offset) {
    return Array.prototype.slice.call(buffer, offset, offset + 8);
  }

  function fromPositiveBE(buffer, offset, value) {
    var pos = offset + 8;
    while (pos > offset) {
      buffer[--pos] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeBE(buffer, offset, value) {
    var pos = offset + 8;
    value++;
    while (pos > offset) {
      buffer[--pos] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  function fromPositiveLE(buffer, offset, value) {
    var end = offset + 8;
    while (offset < end) {
      buffer[offset++] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeLE(buffer, offset, value) {
    var end = offset + 8;
    value++;
    while (offset < end) {
      buffer[offset++] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  // https://github.com/retrofox/is-array
  function _isArray(val) {
    return !!val && "[object Array]" == Object.prototype.toString.call(val);
  }

}( true && typeof exports.nodeName !== 'string' ? exports : (this || {}));


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/browser.js":
/*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/browser.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// browser.js

exports.encode = __webpack_require__(/*! ./encode */ "./node_modules/msgpack-lite/lib/encode.js").encode;
exports.decode = __webpack_require__(/*! ./decode */ "./node_modules/msgpack-lite/lib/decode.js").decode;

exports.Encoder = __webpack_require__(/*! ./encoder */ "./node_modules/msgpack-lite/lib/encoder.js").Encoder;
exports.Decoder = __webpack_require__(/*! ./decoder */ "./node_modules/msgpack-lite/lib/decoder.js").Decoder;

exports.createCodec = __webpack_require__(/*! ./ext */ "./node_modules/msgpack-lite/lib/ext.js").createCodec;
exports.codec = __webpack_require__(/*! ./codec */ "./node_modules/msgpack-lite/lib/codec.js").codec;


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/buffer-global.js":
/*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/buffer-global.js ***!
  \********************************************************/
/***/ (function(module) {

/* globals Buffer */

module.exports =
  c(("undefined" !== typeof Buffer) && Buffer) ||
  c(this.Buffer) ||
  c(("undefined" !== typeof window) && window.Buffer) ||
  this.Buffer;

function c(B) {
  return B && B.isBuffer && B;
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/buffer-lite.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/buffer-lite.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

// buffer-lite.js

var MAXBUFLEN = 8192;

exports.copy = copy;
exports.toString = toString;
exports.write = write;

/**
 * Buffer.prototype.write()
 *
 * @param string {String}
 * @param [offset] {Number}
 * @returns {Number}
 */

function write(string, offset) {
  var buffer = this;
  var index = offset || (offset |= 0);
  var length = string.length;
  var chr = 0;
  var i = 0;
  while (i < length) {
    chr = string.charCodeAt(i++);

    if (chr < 128) {
      buffer[index++] = chr;
    } else if (chr < 0x800) {
      // 2 bytes
      buffer[index++] = 0xC0 | (chr >>> 6);
      buffer[index++] = 0x80 | (chr & 0x3F);
    } else if (chr < 0xD800 || chr > 0xDFFF) {
      // 3 bytes
      buffer[index++] = 0xE0 | (chr  >>> 12);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    } else {
      // 4 bytes - surrogate pair
      chr = (((chr - 0xD800) << 10) | (string.charCodeAt(i++) - 0xDC00)) + 0x10000;
      buffer[index++] = 0xF0 | (chr >>> 18);
      buffer[index++] = 0x80 | ((chr >>> 12) & 0x3F);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    }
  }
  return index - offset;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var buffer = this;
  var index = start|0;
  if (!end) end = buffer.length;
  var string = '';
  var chr = 0;

  while (index < end) {
    chr = buffer[index++];
    if (chr < 128) {
      string += String.fromCharCode(chr);
      continue;
    }

    if ((chr & 0xE0) === 0xC0) {
      // 2 bytes
      chr = (chr & 0x1F) << 6 |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF0) === 0xE0) {
      // 3 bytes
      chr = (chr & 0x0F)             << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF8) === 0xF0) {
      // 4 bytes
      chr = (chr & 0x07)             << 18 |
            (buffer[index++] & 0x3F) << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);
    }

    if (chr >= 0x010000) {
      // A surrogate pair
      chr -= 0x010000;

      string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
    } else {
      string += String.fromCharCode(chr);
    }
  }

  return string;
}

/**
 * Buffer.prototype.copy()
 *
 * @param target {Buffer}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {number}
 */

function copy(target, targetStart, start, end) {
  var i;
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (!targetStart) targetStart = 0;
  var len = end - start;

  if (target === this && start < targetStart && targetStart < end) {
    // descending
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    // ascending
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start];
    }
  }

  return len;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-array.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// bufferish-array.js

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

var exports = module.exports = alloc(0);

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Array}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Array
  return Array.prototype.slice.call(value);
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-buffer.js":
/*!***********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-buffer.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// bufferish-buffer.js

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;

var exports = module.exports = Bufferish.hasBuffer ? alloc(0) : [];

exports.alloc = Bufferish.hasBuffer && Buffer.alloc || alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Buffer(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Buffer
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Buffer
  if (Buffer.from && Buffer.from.length !== 1) {
    return Buffer.from(value); // node v6+
  } else {
    return new Buffer(value); // node v4
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-proto.js":
/*!**********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-proto.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// bufferish-proto.js

/* jshint eqnull:true */

var BufferLite = __webpack_require__(/*! ./buffer-lite */ "./node_modules/msgpack-lite/lib/buffer-lite.js");

exports.copy = copy;
exports.slice = slice;
exports.toString = toString;
exports.write = gen("write");

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;

var isBufferShim = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var brokenTypedArray = isBufferShim && !Buffer.TYPED_ARRAY_SUPPORT;

/**
 * @param target {Buffer|Uint8Array|Array}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function copy(target, targetStart, start, end) {
  var thisIsBuffer = Bufferish.isBuffer(this);
  var targetIsBuffer = Bufferish.isBuffer(target);
  if (thisIsBuffer && targetIsBuffer) {
    // Buffer to Buffer
    return this.copy(target, targetStart, start, end);
  } else if (!brokenTypedArray && !thisIsBuffer && !targetIsBuffer &&
    Bufferish.isView(this) && Bufferish.isView(target)) {
    // Uint8Array to Uint8Array (except for minor some browsers)
    var buffer = (start || end != null) ? slice.call(this, start, end) : this;
    target.set(buffer, targetStart);
    return buffer.length;
  } else {
    // other cases
    return BufferLite.copy.call(this, target, targetStart, start, end);
  }
}

/**
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function slice(start, end) {
  // for Buffer, Uint8Array (except for minor some browsers) and Array
  var f = this.slice || (!brokenTypedArray && this.subarray);
  if (f) return f.call(this, start, end);

  // Uint8Array (for minor some browsers)
  var target = Bufferish.alloc.call(this, end - start);
  copy.call(this, target, 0, start, end);
  return target;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var f = (!isBufferShim && Bufferish.isBuffer(this)) ? this.toString : BufferLite.toString;
  return f.apply(this, arguments);
}

/**
 * @private
 */

function gen(method) {
  return wrap;

  function wrap() {
    var f = this[method] || BufferLite[method];
    return f.apply(this, arguments);
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-uint8array.js":
/*!***************************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-uint8array.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// bufferish-uint8array.js

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

var exports = module.exports = Bufferish.hasArrayBuffer ? alloc(0) : [];

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Uint8Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Uint8Array}
 */

function from(value) {
  if (Bufferish.isView(value)) {
    // TypedArray to ArrayBuffer
    var byteOffset = value.byteOffset;
    var byteLength = value.byteLength;
    value = value.buffer;
    if (value.byteLength !== byteLength) {
      if (value.slice) {
        value = value.slice(byteOffset, byteOffset + byteLength);
      } else {
        // Android 4.1 does not have ArrayBuffer.prototype.slice
        value = new Uint8Array(value);
        if (value.byteLength !== byteLength) {
          // TypedArray to ArrayBuffer to Uint8Array to Array
          value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength);
        }
      }
    }
  } else if (typeof value === "string") {
    // String to Uint8Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  return new Uint8Array(value);
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish.js":
/*!****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// bufferish.js

var Buffer = exports.global = __webpack_require__(/*! ./buffer-global */ "./node_modules/msgpack-lite/lib/buffer-global.js");
var hasBuffer = exports.hasBuffer = Buffer && !!Buffer.isBuffer;
var hasArrayBuffer = exports.hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

var isArray = exports.isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
var isBuffer = exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
var isView = exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

exports.alloc = alloc;
exports.concat = concat;
exports.from = from;

var BufferArray = exports.Array = __webpack_require__(/*! ./bufferish-array */ "./node_modules/msgpack-lite/lib/bufferish-array.js");
var BufferBuffer = exports.Buffer = __webpack_require__(/*! ./bufferish-buffer */ "./node_modules/msgpack-lite/lib/bufferish-buffer.js");
var BufferUint8Array = exports.Uint8Array = __webpack_require__(/*! ./bufferish-uint8array */ "./node_modules/msgpack-lite/lib/bufferish-uint8array.js");
var BufferProto = exports.prototype = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

function from(value) {
  if (typeof value === "string") {
    return fromString.call(this, value);
  } else {
    return auto(this).from(value);
  }
}

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return auto(this).alloc(size);
}

/**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

function concat(list, length) {
  if (!length) {
    length = 0;
    Array.prototype.forEach.call(list, dryrun);
  }
  var ref = (this !== exports) && this || list[0];
  var result = alloc.call(ref, length);
  var offset = 0;
  Array.prototype.forEach.call(list, append);
  return result;

  function dryrun(buffer) {
    length += buffer.length;
  }

  function append(buffer) {
    offset += BufferProto.copy.call(buffer, result, offset);
  }
}

var _isArrayBuffer = _is("ArrayBuffer");

function isArrayBuffer(value) {
  return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
}

/**
 * @private
 */

function fromString(value) {
  var expected = value.length * 3;
  var that = alloc.call(this, expected);
  var actual = BufferProto.write.call(that, value);
  if (expected !== actual) {
    that = BufferProto.slice.call(that, 0, actual);
  }
  return that;
}

function auto(that) {
  return isBuffer(that) ? BufferBuffer
    : isView(that) ? BufferUint8Array
    : isArray(that) ? BufferArray
    : hasBuffer ? BufferBuffer
    : hasArrayBuffer ? BufferUint8Array
    : BufferArray;
}

function _false() {
  return false;
}

function _is(name, key) {
  /* jshint eqnull:true */
  name = "[object " + name + "]";
  return function(value) {
    return (value != null) && {}.toString.call(key ? value[key] : value) === name;
  };
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/codec-base.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/codec-base.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// codec-base.js

var IS_ARRAY = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");

exports.createCodec = createCodec;
exports.install = install;
exports.filter = filter;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

function Codec(options) {
  if (!(this instanceof Codec)) return new Codec(options);
  this.options = options;
  this.init();
}

Codec.prototype.init = function() {
  var options = this.options;

  if (options && options.uint8array) {
    this.bufferish = Bufferish.Uint8Array;
  }

  return this;
};

function install(props) {
  for (var key in props) {
    Codec.prototype[key] = add(Codec.prototype[key], props[key]);
  }
}

function add(a, b) {
  return (a && b) ? ab : (a || b);

  function ab() {
    a.apply(this, arguments);
    return b.apply(this, arguments);
  }
}

function join(filters) {
  filters = filters.slice();

  return function(value) {
    return filters.reduce(iterator, value);
  };

  function iterator(value, filter) {
    return filter(value);
  }
}

function filter(filter) {
  return IS_ARRAY(filter) ? join(filter) : filter;
}

// @public
// msgpack.createCodec()

function createCodec(options) {
  return new Codec(options);
}

// default shared codec

exports.preset = createCodec({preset: true});


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/codec.js":
/*!************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/codec.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// codec.js

// load both interfaces
__webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js");
__webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js");

// @public
// msgpack.codec.preset

exports.codec = {
  preset: (__webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js").preset)
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/decode-buffer.js":
/*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decode-buffer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// decode-buffer.js

exports.DecodeBuffer = DecodeBuffer;

var preset = (__webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js").preset);

var FlexDecoder = (__webpack_require__(/*! ./flex-buffer */ "./node_modules/msgpack-lite/lib/flex-buffer.js").FlexDecoder);

FlexDecoder.mixin(DecodeBuffer.prototype);

function DecodeBuffer(options) {
  if (!(this instanceof DecodeBuffer)) return new DecodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

DecodeBuffer.prototype.codec = preset;

DecodeBuffer.prototype.fetch = function() {
  return this.codec.decode(this);
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/decode.js":
/*!*************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decode.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// decode.js

exports.decode = decode;

var DecodeBuffer = (__webpack_require__(/*! ./decode-buffer */ "./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer);

function decode(input, options) {
  var decoder = new DecodeBuffer(options);
  decoder.write(input);
  return decoder.read();
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/decoder.js":
/*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decoder.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// decoder.js

exports.Decoder = Decoder;

var EventLite = __webpack_require__(/*! event-lite */ "./node_modules/event-lite/event-lite.js");
var DecodeBuffer = (__webpack_require__(/*! ./decode-buffer */ "./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer);

function Decoder(options) {
  if (!(this instanceof Decoder)) return new Decoder(options);
  DecodeBuffer.call(this, options);
}

Decoder.prototype = new DecodeBuffer();

EventLite.mixin(Decoder.prototype);

Decoder.prototype.decode = function(chunk) {
  if (arguments.length) this.write(chunk);
  this.flush();
};

Decoder.prototype.push = function(chunk) {
  this.emit("data", chunk);
};

Decoder.prototype.end = function(chunk) {
  this.decode(chunk);
  this.emit("end");
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/encode-buffer.js":
/*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encode-buffer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// encode-buffer.js

exports.EncodeBuffer = EncodeBuffer;

var preset = (__webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js").preset);

var FlexEncoder = (__webpack_require__(/*! ./flex-buffer */ "./node_modules/msgpack-lite/lib/flex-buffer.js").FlexEncoder);

FlexEncoder.mixin(EncodeBuffer.prototype);

function EncodeBuffer(options) {
  if (!(this instanceof EncodeBuffer)) return new EncodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

EncodeBuffer.prototype.codec = preset;

EncodeBuffer.prototype.write = function(input) {
  this.codec.encode(this, input);
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/encode.js":
/*!*************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encode.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// encode.js

exports.encode = encode;

var EncodeBuffer = (__webpack_require__(/*! ./encode-buffer */ "./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer);

function encode(input, options) {
  var encoder = new EncodeBuffer(options);
  encoder.write(input);
  return encoder.read();
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/encoder.js":
/*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encoder.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// encoder.js

exports.Encoder = Encoder;

var EventLite = __webpack_require__(/*! event-lite */ "./node_modules/event-lite/event-lite.js");
var EncodeBuffer = (__webpack_require__(/*! ./encode-buffer */ "./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer);

function Encoder(options) {
  if (!(this instanceof Encoder)) return new Encoder(options);
  EncodeBuffer.call(this, options);
}

Encoder.prototype = new EncodeBuffer();

EventLite.mixin(Encoder.prototype);

Encoder.prototype.encode = function(chunk) {
  this.write(chunk);
  this.emit("data", this.read());
};

Encoder.prototype.end = function(chunk) {
  if (arguments.length) this.encode(chunk);
  this.flush();
  this.emit("end");
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext-buffer.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-buffer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext-buffer.js

exports.ExtBuffer = ExtBuffer;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

function ExtBuffer(buffer, type) {
  if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
  this.buffer = Bufferish.from(buffer);
  this.type = type;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext-packer.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-packer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext-packer.js

exports.setExtPackers = setExtPackers;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;
var packTypedArray = Bufferish.Uint8Array.from;
var _encode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtPackers(codec) {
  codec.addExtPacker(0x0E, Error, [packError, encode]);
  codec.addExtPacker(0x01, EvalError, [packError, encode]);
  codec.addExtPacker(0x02, RangeError, [packError, encode]);
  codec.addExtPacker(0x03, ReferenceError, [packError, encode]);
  codec.addExtPacker(0x04, SyntaxError, [packError, encode]);
  codec.addExtPacker(0x05, TypeError, [packError, encode]);
  codec.addExtPacker(0x06, URIError, [packError, encode]);

  codec.addExtPacker(0x0A, RegExp, [packRegExp, encode]);
  codec.addExtPacker(0x0B, Boolean, [packValueOf, encode]);
  codec.addExtPacker(0x0C, String, [packValueOf, encode]);
  codec.addExtPacker(0x0D, Date, [Number, encode]);
  codec.addExtPacker(0x0F, Number, [packValueOf, encode]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtPacker(0x11, Int8Array, packTypedArray);
    codec.addExtPacker(0x12, Uint8Array, packTypedArray);
    codec.addExtPacker(0x13, Int16Array, packTypedArray);
    codec.addExtPacker(0x14, Uint16Array, packTypedArray);
    codec.addExtPacker(0x15, Int32Array, packTypedArray);
    codec.addExtPacker(0x16, Uint32Array, packTypedArray);
    codec.addExtPacker(0x17, Float32Array, packTypedArray);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtPacker(0x18, Float64Array, packTypedArray);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtPacker(0x19, Uint8ClampedArray, packTypedArray);
    }

    codec.addExtPacker(0x1A, ArrayBuffer, packTypedArray);
    codec.addExtPacker(0x1D, DataView, packTypedArray);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtPacker(0x1B, Buffer, Bufferish.from);
  }
}

function encode(input) {
  if (!_encode) _encode = (__webpack_require__(/*! ./encode */ "./node_modules/msgpack-lite/lib/encode.js").encode); // lazy load
  return _encode(input);
}

function packValueOf(value) {
  return (value).valueOf();
}

function packRegExp(value) {
  value = RegExp.prototype.toString.call(value).split("/");
  value.shift();
  var out = [value.pop()];
  out.unshift(value.join("/"));
  return out;
}

function packError(value) {
  var out = {};
  for (var key in ERROR_COLUMNS) {
    out[key] = value[key];
  }
  return out;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext-unpacker.js":
/*!*******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-unpacker.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext-unpacker.js

exports.setExtUnpackers = setExtUnpackers;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;
var _decode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtUnpackers(codec) {
  codec.addExtUnpacker(0x0E, [decode, unpackError(Error)]);
  codec.addExtUnpacker(0x01, [decode, unpackError(EvalError)]);
  codec.addExtUnpacker(0x02, [decode, unpackError(RangeError)]);
  codec.addExtUnpacker(0x03, [decode, unpackError(ReferenceError)]);
  codec.addExtUnpacker(0x04, [decode, unpackError(SyntaxError)]);
  codec.addExtUnpacker(0x05, [decode, unpackError(TypeError)]);
  codec.addExtUnpacker(0x06, [decode, unpackError(URIError)]);

  codec.addExtUnpacker(0x0A, [decode, unpackRegExp]);
  codec.addExtUnpacker(0x0B, [decode, unpackClass(Boolean)]);
  codec.addExtUnpacker(0x0C, [decode, unpackClass(String)]);
  codec.addExtUnpacker(0x0D, [decode, unpackClass(Date)]);
  codec.addExtUnpacker(0x0F, [decode, unpackClass(Number)]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtUnpacker(0x11, unpackClass(Int8Array));
    codec.addExtUnpacker(0x12, unpackClass(Uint8Array));
    codec.addExtUnpacker(0x13, [unpackArrayBuffer, unpackClass(Int16Array)]);
    codec.addExtUnpacker(0x14, [unpackArrayBuffer, unpackClass(Uint16Array)]);
    codec.addExtUnpacker(0x15, [unpackArrayBuffer, unpackClass(Int32Array)]);
    codec.addExtUnpacker(0x16, [unpackArrayBuffer, unpackClass(Uint32Array)]);
    codec.addExtUnpacker(0x17, [unpackArrayBuffer, unpackClass(Float32Array)]);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtUnpacker(0x18, [unpackArrayBuffer, unpackClass(Float64Array)]);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtUnpacker(0x19, unpackClass(Uint8ClampedArray));
    }

    codec.addExtUnpacker(0x1A, unpackArrayBuffer);
    codec.addExtUnpacker(0x1D, [unpackArrayBuffer, unpackClass(DataView)]);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtUnpacker(0x1B, unpackClass(Buffer));
  }
}

function decode(input) {
  if (!_decode) _decode = (__webpack_require__(/*! ./decode */ "./node_modules/msgpack-lite/lib/decode.js").decode); // lazy load
  return _decode(input);
}

function unpackRegExp(value) {
  return RegExp.apply(null, value);
}

function unpackError(Class) {
  return function(value) {
    var out = new Class();
    for (var key in ERROR_COLUMNS) {
      out[key] = value[key];
    }
    return out;
  };
}

function unpackClass(Class) {
  return function(value) {
    return new Class(value);
  };
}

function unpackArrayBuffer(value) {
  return (new Uint8Array(value)).buffer;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext.js":
/*!**********************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext.js

// load both interfaces
__webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js");
__webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js");

exports.createCodec = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js").createCodec;


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/flex-buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/flex-buffer.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// flex-buffer.js

exports.FlexDecoder = FlexDecoder;
exports.FlexEncoder = FlexEncoder;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

var MIN_BUFFER_SIZE = 2048;
var MAX_BUFFER_SIZE = 65536;
var BUFFER_SHORTAGE = "BUFFER_SHORTAGE";

function FlexDecoder() {
  if (!(this instanceof FlexDecoder)) return new FlexDecoder();
}

function FlexEncoder() {
  if (!(this instanceof FlexEncoder)) return new FlexEncoder();
}

FlexDecoder.mixin = mixinFactory(getDecoderMethods());
FlexDecoder.mixin(FlexDecoder.prototype);

FlexEncoder.mixin = mixinFactory(getEncoderMethods());
FlexEncoder.mixin(FlexEncoder.prototype);

function getDecoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    offset: 0
  };

  function write(chunk) {
    var prev = this.offset ? Bufferish.prototype.slice.call(this.buffer, this.offset) : this.buffer;
    this.buffer = prev ? (chunk ? this.bufferish.concat([prev, chunk]) : prev) : chunk;
    this.offset = 0;
  }

  function flush() {
    while (this.offset < this.buffer.length) {
      var start = this.offset;
      var value;
      try {
        value = this.fetch();
      } catch (e) {
        if (e && e.message != BUFFER_SHORTAGE) throw e;
        // rollback
        this.offset = start;
        break;
      }
      this.push(value);
    }
  }

  function reserve(length) {
    var start = this.offset;
    var end = start + length;
    if (end > this.buffer.length) throw new Error(BUFFER_SHORTAGE);
    this.offset = end;
    return start;
  }
}

function getEncoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    send: send,
    maxBufferSize: MAX_BUFFER_SIZE,
    minBufferSize: MIN_BUFFER_SIZE,
    offset: 0,
    start: 0
  };

  function fetch() {
    var start = this.start;
    if (start < this.offset) {
      var end = this.start = this.offset;
      return Bufferish.prototype.slice.call(this.buffer, start, end);
    }
  }

  function flush() {
    while (this.start < this.offset) {
      var value = this.fetch();
      if (value) this.push(value);
    }
  }

  function pull() {
    var buffers = this.buffers || (this.buffers = []);
    var chunk = buffers.length > 1 ? this.bufferish.concat(buffers) : buffers[0];
    buffers.length = 0; // buffer exhausted
    return chunk;
  }

  function reserve(length) {
    var req = length | 0;

    if (this.buffer) {
      var size = this.buffer.length;
      var start = this.offset | 0;
      var end = start + req;

      // is it long enough?
      if (end < size) {
        this.offset = end;
        return start;
      }

      // flush current buffer
      this.flush();

      // resize it to 2x current length
      length = Math.max(length, Math.min(size * 2, this.maxBufferSize));
    }

    // minimum buffer size
    length = Math.max(length, this.minBufferSize);

    // allocate new buffer
    this.buffer = this.bufferish.alloc(length);
    this.start = 0;
    this.offset = req;
    return 0;
  }

  function send(buffer) {
    var length = buffer.length;
    if (length > this.minBufferSize) {
      this.flush();
      this.push(buffer);
    } else {
      var offset = this.reserve(length);
      Bufferish.prototype.copy.call(buffer, this.buffer, offset);
    }
  }
}

// common methods

function write() {
  throw new Error("method not implemented: write()");
}

function fetch() {
  throw new Error("method not implemented: fetch()");
}

function read() {
  var length = this.buffers && this.buffers.length;

  // fetch the first result
  if (!length) return this.fetch();

  // flush current buffer
  this.flush();

  // read from the results
  return this.pull();
}

function push(chunk) {
  var buffers = this.buffers || (this.buffers = []);
  buffers.push(chunk);
}

function pull() {
  var buffers = this.buffers || (this.buffers = []);
  return buffers.shift();
}

function mixinFactory(source) {
  return mixin;

  function mixin(target) {
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/read-core.js":
/*!****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-core.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// read-core.js

var ExtBuffer = (__webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer);
var ExtUnpacker = __webpack_require__(/*! ./ext-unpacker */ "./node_modules/msgpack-lite/lib/ext-unpacker.js");
var readUint8 = (__webpack_require__(/*! ./read-format */ "./node_modules/msgpack-lite/lib/read-format.js").readUint8);
var ReadToken = __webpack_require__(/*! ./read-token */ "./node_modules/msgpack-lite/lib/read-token.js");
var CodecBase = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js");

CodecBase.install({
  addExtUnpacker: addExtUnpacker,
  getExtUnpacker: getExtUnpacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getDecoder(options) {
  var readToken = ReadToken.getReadToken(options);
  return decode;

  function decode(decoder) {
    var type = readUint8(decoder);
    var func = readToken[type];
    if (!func) throw new Error("Invalid type: " + (type ? ("0x" + type.toString(16)) : type));
    return func(decoder);
  }
}

function init() {
  var options = this.options;
  this.decode = getDecoder(options);

  if (options && options.preset) {
    ExtUnpacker.setExtUnpackers(this);
  }

  return this;
}

function addExtUnpacker(etype, unpacker) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  unpackers[etype] = CodecBase.filter(unpacker);
}

function getExtUnpacker(type) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  return unpackers[type] || extUnpacker;

  function extUnpacker(buffer) {
    return new ExtBuffer(buffer, type);
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/read-format.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-format.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// read-format.js

var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js");
var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

exports.getReadFormat = getReadFormat;
exports.readUint8 = uint8;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var BufferProto = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");

var HAS_MAP = ("undefined" !== typeof Map);
var NO_ASSERT = true;

function getReadFormat(options) {
  var binarraybuffer = Bufferish.hasArrayBuffer && options && options.binarraybuffer;
  var int64 = options && options.int64;
  var usemap = HAS_MAP && options && options.usemap;

  var readFormat = {
    map: (usemap ? map_to_map : map_to_obj),
    array: array,
    str: str,
    bin: (binarraybuffer ? bin_arraybuffer : bin_buffer),
    ext: ext,
    uint8: uint8,
    uint16: uint16,
    uint32: uint32,
    uint64: read(8, int64 ? readUInt64BE_int64 : readUInt64BE),
    int8: int8,
    int16: int16,
    int32: int32,
    int64: read(8, int64 ? readInt64BE_int64 : readInt64BE),
    float32: read(4, readFloatBE),
    float64: read(8, readDoubleBE)
  };

  return readFormat;
}

function map_to_obj(decoder, len) {
  var value = {};
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value[k[i]] = v[i];
  }
  return value;
}

function map_to_map(decoder, len) {
  var value = new Map();
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value.set(k[i], v[i]);
  }
  return value;
}

function array(decoder, len) {
  var value = new Array(len);
  var decode = decoder.codec.decode;
  for (var i = 0; i < len; i++) {
    value[i] = decode(decoder);
  }
  return value;
}

function str(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  return BufferProto.toString.call(decoder.buffer, "utf-8", start, end);
}

function bin_buffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.from(buf);
}

function bin_arraybuffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.Uint8Array.from(buf).buffer;
}

function ext(decoder, len) {
  var start = decoder.reserve(len+1);
  var type = decoder.buffer[start++];
  var end = start + len;
  var unpack = decoder.codec.getExtUnpacker(type);
  if (!unpack) throw new Error("Invalid ext type: " + (type ? ("0x" + type.toString(16)) : type));
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return unpack(buf);
}

function uint8(decoder) {
  var start = decoder.reserve(1);
  return decoder.buffer[start];
}

function int8(decoder) {
  var start = decoder.reserve(1);
  var value = decoder.buffer[start];
  return (value & 0x80) ? value - 0x100 : value;
}

function uint16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  return (buffer[start++] << 8) | buffer[start];
}

function int16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  var value = (buffer[start++] << 8) | buffer[start];
  return (value & 0x8000) ? value - 0x10000 : value;
}

function uint32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] * 16777216) + (buffer[start++] << 16) + (buffer[start++] << 8) + buffer[start];
}

function int32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] << 24) | (buffer[start++] << 16) | (buffer[start++] << 8) | buffer[start];
}

function read(len, method) {
  return function(decoder) {
    var start = decoder.reserve(len);
    return method.call(decoder.buffer, start, NO_ASSERT);
  };
}

function readUInt64BE(start) {
  return new Uint64BE(this, start).toNumber();
}

function readInt64BE(start) {
  return new Int64BE(this, start).toNumber();
}

function readUInt64BE_int64(start) {
  return new Uint64BE(this, start);
}

function readInt64BE_int64(start) {
  return new Int64BE(this, start);
}

function readFloatBE(start) {
  return ieee754.read(this, start, false, 23, 4);
}

function readDoubleBE(start) {
  return ieee754.read(this, start, false, 52, 8);
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/read-token.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-token.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// read-token.js

var ReadFormat = __webpack_require__(/*! ./read-format */ "./node_modules/msgpack-lite/lib/read-format.js");

exports.getReadToken = getReadToken;

function getReadToken(options) {
  var format = ReadFormat.getReadFormat(options);

  if (options && options.useraw) {
    return init_useraw(format);
  } else {
    return init_token(format);
  }
}

function init_token(format) {
  var i;
  var token = new Array(256);

  // positive fixint -- 0x00 - 0x7f
  for (i = 0x00; i <= 0x7f; i++) {
    token[i] = constant(i);
  }

  // fixmap -- 0x80 - 0x8f
  for (i = 0x80; i <= 0x8f; i++) {
    token[i] = fix(i - 0x80, format.map);
  }

  // fixarray -- 0x90 - 0x9f
  for (i = 0x90; i <= 0x9f; i++) {
    token[i] = fix(i - 0x90, format.array);
  }

  // fixstr -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.str);
  }

  // nil -- 0xc0
  token[0xc0] = constant(null);

  // (never used) -- 0xc1
  token[0xc1] = null;

  // false -- 0xc2
  // true -- 0xc3
  token[0xc2] = constant(false);
  token[0xc3] = constant(true);

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = flex(format.uint8, format.bin);
  token[0xc5] = flex(format.uint16, format.bin);
  token[0xc6] = flex(format.uint32, format.bin);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = flex(format.uint8, format.ext);
  token[0xc8] = flex(format.uint16, format.ext);
  token[0xc9] = flex(format.uint32, format.ext);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = format.float32;
  token[0xcb] = format.float64;

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = format.uint8;
  token[0xcd] = format.uint16;
  token[0xce] = format.uint32;
  token[0xcf] = format.uint64;

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = format.int8;
  token[0xd1] = format.int16;
  token[0xd2] = format.int32;
  token[0xd3] = format.int64;

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  token[0xd4] = fix(1, format.ext);
  token[0xd5] = fix(2, format.ext);
  token[0xd6] = fix(4, format.ext);
  token[0xd7] = fix(8, format.ext);
  token[0xd8] = fix(16, format.ext);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = flex(format.uint8, format.str);
  token[0xda] = flex(format.uint16, format.str);
  token[0xdb] = flex(format.uint32, format.str);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = flex(format.uint16, format.array);
  token[0xdd] = flex(format.uint32, format.array);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = flex(format.uint16, format.map);
  token[0xdf] = flex(format.uint32, format.map);

  // negative fixint -- 0xe0 - 0xff
  for (i = 0xe0; i <= 0xff; i++) {
    token[i] = constant(i - 0x100);
  }

  return token;
}

function init_useraw(format) {
  var i;
  var token = init_token(format).slice();

  // raw 8 -- 0xd9
  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  token[0xd9] = token[0xc4];
  token[0xda] = token[0xc5];
  token[0xdb] = token[0xc6];

  // fixraw -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.bin);
  }

  return token;
}

function constant(value) {
  return function() {
    return value;
  };
}

function flex(lenFunc, decodeFunc) {
  return function(decoder) {
    var len = lenFunc(decoder);
    return decodeFunc(decoder, len);
  };
}

function fix(len, method) {
  return function(decoder) {
    return method(decoder, len);
  };
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-core.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-core.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// write-core.js

var ExtBuffer = (__webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer);
var ExtPacker = __webpack_require__(/*! ./ext-packer */ "./node_modules/msgpack-lite/lib/ext-packer.js");
var WriteType = __webpack_require__(/*! ./write-type */ "./node_modules/msgpack-lite/lib/write-type.js");
var CodecBase = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js");

CodecBase.install({
  addExtPacker: addExtPacker,
  getExtPacker: getExtPacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getEncoder(options) {
  var writeType = WriteType.getWriteType(options);
  return encode;

  function encode(encoder, value) {
    var func = writeType[typeof value];
    if (!func) throw new Error("Unsupported type \"" + (typeof value) + "\": " + value);
    func(encoder, value);
  }
}

function init() {
  var options = this.options;
  this.encode = getEncoder(options);

  if (options && options.preset) {
    ExtPacker.setExtPackers(this);
  }

  return this;
}

function addExtPacker(etype, Class, packer) {
  packer = CodecBase.filter(packer);
  var name = Class.name;
  if (name && name !== "Object") {
    var packers = this.extPackers || (this.extPackers = {});
    packers[name] = extPacker;
  } else {
    // fallback for IE
    var list = this.extEncoderList || (this.extEncoderList = []);
    list.unshift([Class, extPacker]);
  }

  function extPacker(value) {
    if (packer) value = packer(value);
    return new ExtBuffer(value, etype);
  }
}

function getExtPacker(value) {
  var packers = this.extPackers || (this.extPackers = {});
  var c = value.constructor;
  var e = c && c.name && packers[c.name];
  if (e) return e;

  // fallback for IE
  var list = this.extEncoderList || (this.extEncoderList = []);
  var len = list.length;
  for (var i = 0; i < len; i++) {
    var pair = list[i];
    if (c === pair[0]) return pair[1];
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-token.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-token.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// write-token.js

var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js");
var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var uint8 = (__webpack_require__(/*! ./write-uint8 */ "./node_modules/msgpack-lite/lib/write-uint8.js").uint8);
var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;
var IS_BUFFER_SHIM = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var NO_TYPED_ARRAY = IS_BUFFER_SHIM && !Buffer.TYPED_ARRAY_SUPPORT;
var Buffer_prototype = Bufferish.hasBuffer && Buffer.prototype || {};

exports.getWriteToken = getWriteToken;

function getWriteToken(options) {
  if (options && options.uint8array) {
    return init_uint8array();
  } else if (NO_TYPED_ARRAY || (Bufferish.hasBuffer && options && options.safe)) {
    return init_safe();
  } else {
    return init_token();
  }
}

function init_uint8array() {
  var token = init_token();

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, writeDoubleBE);

  return token;
}

// Node.js and browsers with TypedArray

function init_token() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = write1(0xc4);
  token[0xc5] = write2(0xc5);
  token[0xc6] = write4(0xc6);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = write1(0xc7);
  token[0xc8] = write2(0xc8);
  token[0xc9] = write4(0xc9);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, (Buffer_prototype.writeFloatBE || writeFloatBE), true);
  token[0xcb] = writeN(0xcb, 8, (Buffer_prototype.writeDoubleBE || writeDoubleBE), true);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = write1(0xcc);
  token[0xcd] = write2(0xcd);
  token[0xce] = write4(0xce);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = write1(0xd0);
  token[0xd1] = write2(0xd1);
  token[0xd2] = write4(0xd2);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = write1(0xd9);
  token[0xda] = write2(0xda);
  token[0xdb] = write4(0xdb);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = write2(0xdc);
  token[0xdd] = write4(0xdd);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = write2(0xde);
  token[0xdf] = write4(0xdf);

  return token;
}

// safe mode: for old browsers and who needs asserts

function init_safe() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = writeN(0xc4, 1, Buffer.prototype.writeUInt8);
  token[0xc5] = writeN(0xc5, 2, Buffer.prototype.writeUInt16BE);
  token[0xc6] = writeN(0xc6, 4, Buffer.prototype.writeUInt32BE);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = writeN(0xc7, 1, Buffer.prototype.writeUInt8);
  token[0xc8] = writeN(0xc8, 2, Buffer.prototype.writeUInt16BE);
  token[0xc9] = writeN(0xc9, 4, Buffer.prototype.writeUInt32BE);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, Buffer.prototype.writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, Buffer.prototype.writeDoubleBE);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = writeN(0xcc, 1, Buffer.prototype.writeUInt8);
  token[0xcd] = writeN(0xcd, 2, Buffer.prototype.writeUInt16BE);
  token[0xce] = writeN(0xce, 4, Buffer.prototype.writeUInt32BE);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = writeN(0xd0, 1, Buffer.prototype.writeInt8);
  token[0xd1] = writeN(0xd1, 2, Buffer.prototype.writeInt16BE);
  token[0xd2] = writeN(0xd2, 4, Buffer.prototype.writeInt32BE);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = writeN(0xd9, 1, Buffer.prototype.writeUInt8);
  token[0xda] = writeN(0xda, 2, Buffer.prototype.writeUInt16BE);
  token[0xdb] = writeN(0xdb, 4, Buffer.prototype.writeUInt32BE);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = writeN(0xdc, 2, Buffer.prototype.writeUInt16BE);
  token[0xdd] = writeN(0xdd, 4, Buffer.prototype.writeUInt32BE);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = writeN(0xde, 2, Buffer.prototype.writeUInt16BE);
  token[0xdf] = writeN(0xdf, 4, Buffer.prototype.writeUInt32BE);

  return token;
}

function write1(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(2);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset] = value;
  };
}

function write2(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(3);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function write4(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(5);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 24;
    buffer[offset++] = value >>> 16;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function writeN(type, len, method, noAssert) {
  return function(encoder, value) {
    var offset = encoder.reserve(len + 1);
    encoder.buffer[offset++] = type;
    method.call(encoder.buffer, value, offset, noAssert);
  };
}

function writeUInt64BE(value, offset) {
  new Uint64BE(this, offset, value);
}

function writeInt64BE(value, offset) {
  new Int64BE(this, offset, value);
}

function writeFloatBE(value, offset) {
  ieee754.write(this, value, offset, false, 23, 4);
}

function writeDoubleBE(value, offset) {
  ieee754.write(this, value, offset, false, 52, 8);
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-type.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-type.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// write-type.js

var IS_ARRAY = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var BufferProto = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");
var WriteToken = __webpack_require__(/*! ./write-token */ "./node_modules/msgpack-lite/lib/write-token.js");
var uint8 = (__webpack_require__(/*! ./write-uint8 */ "./node_modules/msgpack-lite/lib/write-uint8.js").uint8);
var ExtBuffer = (__webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer);

var HAS_UINT8ARRAY = ("undefined" !== typeof Uint8Array);
var HAS_MAP = ("undefined" !== typeof Map);

var extmap = [];
extmap[1] = 0xd4;
extmap[2] = 0xd5;
extmap[4] = 0xd6;
extmap[8] = 0xd7;
extmap[16] = 0xd8;

exports.getWriteType = getWriteType;

function getWriteType(options) {
  var token = WriteToken.getWriteToken(options);
  var useraw = options && options.useraw;
  var binarraybuffer = HAS_UINT8ARRAY && options && options.binarraybuffer;
  var isBuffer = binarraybuffer ? Bufferish.isArrayBuffer : Bufferish.isBuffer;
  var bin = binarraybuffer ? bin_arraybuffer : bin_buffer;
  var usemap = HAS_MAP && options && options.usemap;
  var map = usemap ? map_to_map : obj_to_map;

  var writeType = {
    "boolean": bool,
    "function": nil,
    "number": number,
    "object": (useraw ? object_raw : object),
    "string": _string(useraw ? raw_head_size : str_head_size),
    "symbol": nil,
    "undefined": nil
  };

  return writeType;

  // false -- 0xc2
  // true -- 0xc3
  function bool(encoder, value) {
    var type = value ? 0xc3 : 0xc2;
    token[type](encoder, value);
  }

  function number(encoder, value) {
    var ivalue = value | 0;
    var type;
    if (value !== ivalue) {
      // float 64 -- 0xcb
      type = 0xcb;
      token[type](encoder, value);
      return;
    } else if (-0x20 <= ivalue && ivalue <= 0x7F) {
      // positive fixint -- 0x00 - 0x7f
      // negative fixint -- 0xe0 - 0xff
      type = ivalue & 0xFF;
    } else if (0 <= ivalue) {
      // uint 8 -- 0xcc
      // uint 16 -- 0xcd
      // uint 32 -- 0xce
      type = (ivalue <= 0xFF) ? 0xcc : (ivalue <= 0xFFFF) ? 0xcd : 0xce;
    } else {
      // int 8 -- 0xd0
      // int 16 -- 0xd1
      // int 32 -- 0xd2
      type = (-0x80 <= ivalue) ? 0xd0 : (-0x8000 <= ivalue) ? 0xd1 : 0xd2;
    }
    token[type](encoder, ivalue);
  }

  // uint 64 -- 0xcf
  function uint64(encoder, value) {
    var type = 0xcf;
    token[type](encoder, value.toArray());
  }

  // int 64 -- 0xd3
  function int64(encoder, value) {
    var type = 0xd3;
    token[type](encoder, value.toArray());
  }

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  // fixstr -- 0xa0 - 0xbf
  function str_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFF) ? 2 : (length <= 0xFFFF) ? 3 : 5;
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFFFF) ? 3 : 5;
  }

  function _string(head_size) {
    return string;

    function string(encoder, value) {
      // prepare buffer
      var length = value.length;
      var maxsize = 5 + length * 3;
      encoder.offset = encoder.reserve(maxsize);
      var buffer = encoder.buffer;

      // expected header size
      var expected = head_size(length);

      // expected start point
      var start = encoder.offset + expected;

      // write string
      length = BufferProto.write.call(buffer, value, start);

      // actual header size
      var actual = head_size(length);

      // move content when needed
      if (expected !== actual) {
        var targetStart = start + actual - expected;
        var end = start + length;
        BufferProto.copy.call(buffer, buffer, targetStart, start, end);
      }

      // write header
      var type = (actual === 1) ? (0xa0 + length) : (actual <= 3) ? (0xd7 + actual) : 0xdb;
      token[type](encoder, length);

      // move cursor
      encoder.offset += length;
    }
  }

  function object(encoder, value) {
    // null
    if (value === null) return nil(encoder, value);

    // Buffer
    if (isBuffer(value)) return bin(encoder, value);

    // Array
    if (IS_ARRAY(value)) return array(encoder, value);

    // int64-buffer objects
    if (Uint64BE.isUint64BE(value)) return uint64(encoder, value);
    if (Int64BE.isInt64BE(value)) return int64(encoder, value);

    // ext formats
    var packer = encoder.codec.getExtPacker(value);
    if (packer) value = packer(value);
    if (value instanceof ExtBuffer) return ext(encoder, value);

    // plain old Objects or Map
    map(encoder, value);
  }

  function object_raw(encoder, value) {
    // Buffer
    if (isBuffer(value)) return raw(encoder, value);

    // others
    object(encoder, value);
  }

  // nil -- 0xc0
  function nil(encoder, value) {
    var type = 0xc0;
    token[type](encoder, value);
  }

  // fixarray -- 0x90 - 0x9f
  // array 16 -- 0xdc
  // array 32 -- 0xdd
  function array(encoder, value) {
    var length = value.length;
    var type = (length < 16) ? (0x90 + length) : (length <= 0xFFFF) ? 0xdc : 0xdd;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    for (var i = 0; i < length; i++) {
      encode(encoder, value[i]);
    }
  }

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  function bin_buffer(encoder, value) {
    var length = value.length;
    var type = (length < 0xFF) ? 0xc4 : (length <= 0xFFFF) ? 0xc5 : 0xc6;
    token[type](encoder, length);
    encoder.send(value);
  }

  function bin_arraybuffer(encoder, value) {
    bin_buffer(encoder, new Uint8Array(value));
  }

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  function ext(encoder, value) {
    var buffer = value.buffer;
    var length = buffer.length;
    var type = extmap[length] || ((length < 0xFF) ? 0xc7 : (length <= 0xFFFF) ? 0xc8 : 0xc9);
    token[type](encoder, length);
    uint8[value.type](encoder);
    encoder.send(buffer);
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function obj_to_map(encoder, value) {
    var keys = Object.keys(value);
    var length = keys.length;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    keys.forEach(function(key) {
      encode(encoder, key);
      encode(encoder, value[key]);
    });
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function map_to_map(encoder, value) {
    if (!(value instanceof Map)) return obj_to_map(encoder, value);

    var length = value.size;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    value.forEach(function(val, key, m) {
      encode(encoder, key);
      encode(encoder, val);
    });
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw(encoder, value) {
    var length = value.length;
    var type = (length < 32) ? (0xa0 + length) : (length <= 0xFFFF) ? 0xda : 0xdb;
    token[type](encoder, length);
    encoder.send(value);
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-uint8.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-uint8.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

// write-unit8.js

var constant = exports.uint8 = new Array(256);

for (var i = 0x00; i <= 0xFF; i++) {
  constant[i] = write0(i);
}

function write0(type) {
  return function(encoder) {
    var offset = encoder.reserve(1);
    encoder.buffer[offset] = type;
  };
}


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./frontend/src/loader/NVRWorker.js":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./frontend/src/loader/NVRWorker.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/**\r\n Marching Squares Edge Detection\r\n this is a \"marching ants\" algorithm used to calc the outline path\r\n\r\n d3-plugin for calculating outline paths\r\n License: https://github.com/d3/d3-plugins/blob/master/LICENSE\r\n    \r\n Copyright (c) 2012-2014, Michael Bostock\r\n All rights reserved.\r\n    \r\n * Redistribution and use in source and binary forms, with or without\r\n   modification, are permitted provided that the following conditions are met:\r\n * Redistributions of source code must retain the above copyright notice, this\r\n   list of conditions and the following disclaimer.\r\n * Redistributions in binary form must reproduce the above copyright notice,\r\n   this list of conditions and the following disclaimer in the documentation\r\n   and/or other materials provided with the distribution.\r\n * The name Michael Bostock may not be used to endorse or promote products\r\n   derived from this software without specific prior written permission.\r\n   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. \r\n */\r\nconst Geom = {\r\n\t// lookup tables for marching directions\r\n    d3_geom_contourDx: [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN],\r\n    d3_geom_contourDy: [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN],\r\n\td3_geom_contourStart(grid) {\r\n\t\tlet x = 0;\r\n\t\tlet y = 0;\r\n\r\n\t\t// search for a starting point; begin at origin\r\n\t\t// and proceed along outward-expanding diagonals\r\n\t\twhile (true) {\r\n\t\t  \tif (grid(x, y)) return [x, y];\r\n\r\n\t\t  \tif (x === 0) {\r\n\t\t\t\tx = y + 1;\r\n\t\t\t\ty = 0;\r\n\t\t  \t} else {\r\n\t\t\t\tx = x - 1;\r\n\t\t\t\ty = y + 1;\r\n\t\t  \t}\r\n\t\t}\r\n\t},\r\n\tcontour(grid, start) {\r\n\t\tlet s = start  // starting point\r\n        let c = [];    // contour polygon\r\n    \tlet x = s[0];  // current x position\r\n        let y = s[1];  // current y position\r\n        let dx = 0;    // next x direction\r\n        let dy = 0;    // next y direction\r\n        let pdx = NaN; // previous x direction\r\n        let pdy = NaN; // previous y direction\r\n        let i = 0;\r\n\r\n      \tdo {\r\n        \t// determine marching squares index \r\n\t\t\ti = 0;\r\n\t\t\tif (grid(x - 1, y - 1)) i += 1;\r\n\t\t\tif (grid(x, y - 1)) i += 2;\r\n\t\t\tif (grid(x - 1, y)) i += 4;\r\n\t\t\tif (grid(x, y)) i += 8;\r\n\r\n\t\t\t// determine next direction\r\n\t\t\tif (i === 6) {\r\n\t\t\t\tdx = pdy === -1 ? -1 : 1;\r\n\t\t\t\tdy = 0;\r\n\t\t\t} else if (i === 9) {\r\n\t\t\t\tdx = 0;\r\n\t\t\t\tdy = pdx === 1 ? -1 : 1;\r\n\t\t\t} else {\r\n\t\t\t\tdx = this.d3_geom_contourDx[i];\r\n\t\t\t\tdy = this.d3_geom_contourDy[i];\r\n\t\t\t}\r\n\r\n\t\t\t// update contour polygon\r\n\t\t\tif (dx != pdx && dy != pdy) {\r\n\t\t\t\tc.push([x, y]);\r\n\t\t\t\tpdx = dx;\r\n\t\t\t\tpdy = dy;\r\n\t\t\t}\r\n\r\n\t\t\tx += dx;\r\n\t\t\ty += dy;\r\n    \t} while (s[0] != x || s[1] != y);\r\n\r\n    \treturn c;\r\n\t}\r\n}\r\n/*\r\nconst context = canvas.getContext(\"2d\");\r\n\r\n\tlet imgData = context.getImageData(0, 0, canvas.width, canvas.height);\r\n\tlet data = imgData.data;\r\n\r\n\tfunction defineNonTransparent(x, y) {\r\n\t\treturn data[(y * canvas.width + x) * 4 + 3] >= maxTransparency;\r\n\t}\r\n\r\n\tconst start = Geom.d3_geom_contourStart(defineNonTransparent);\r\n\tconst points = Geom.contour(defineNonTransparent, start);\r\n\r\n\tcontext.beginPath();\r\n    context.moveTo(points[0][0], points[0][4]);\r\n    for (let i = 0; i < points.length; i++) {\r\n        const point = points[i];\r\n        context.lineTo(point[0], point[1]);\r\n    }\r\n    context.closePath();\r\n    context.stroke();\r\n*/\r\nfunction createImageOutline(data, width, maxTransparency) {\r\n\r\n\tfunction defineNonTransparent(x, y) {\r\n\t\treturn data[(y * width + x) * 4 + 3] >= maxTransparency;\r\n\t}\r\n\r\n\tconst start = Geom.d3_geom_contourStart(defineNonTransparent);\r\n\tconst points = Geom.contour(defineNonTransparent, start);\r\n\r\n    return points;\r\n}\r\n\r\nconst handler = {\r\n    \"echo\": function(data) {\r\n        return data;\r\n    },\r\n    \"util.outline\": function(data) {\r\n        return createImageOutline(...data);\r\n    }\r\n}\r\n\r\nonerror = (e) => {\r\n    postMessage([\"0\", null, e]);\r\n}\r\n\r\nonmessage = (e) => {\r\n    const data = e.data;\r\n    try {\r\n        const result = handler[data[1]].call(null, data[2]);\r\n        postMessage([data[0], true, result]);\r\n    } catch (err) {\r\n        postMessage([data[0], false, err]);\r\n    }\r\n}");

/***/ }),

/***/ "./node_modules/stackframe/stackframe.js":
/*!***********************************************!*\
  !*** ./node_modules/stackframe/stackframe.js ***!
  \***********************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];
    var objectProps = ['evalOrigin'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);

    function StackFrame(obj) {
        if (!obj) return;
        for (var i = 0; i < props.length; i++) {
            if (obj[props[i]] !== undefined) {
                this['set' + _capitalize(props[i])](obj[props[i]]);
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var fileName = this.getFileName() || '';
            var lineNumber = this.getLineNumber() || '';
            var columnNumber = this.getColumnNumber() || '';
            var functionName = this.getFunctionName() || '';
            if (this.getIsEval()) {
                if (fileName) {
                    return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
                }
                return '[eval]:' + lineNumber + ':' + columnNumber;
            }
            if (functionName) {
                return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
            }
            return fileName + ':' + lineNumber + ':' + columnNumber;
        }
    };

    StackFrame.fromString = function StackFrame$$fromString(str) {
        var argsStartIndex = str.indexOf('(');
        var argsEndIndex = str.lastIndexOf(')');

        var functionName = str.substring(0, argsStartIndex);
        var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
        var locationString = str.substring(argsEndIndex + 1);

        if (locationString.indexOf('@') === 0) {
            var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
            var fileName = parts[1];
            var lineNumber = parts[2];
            var columnNumber = parts[3];
        }

        return new StackFrame({
            functionName: functionName,
            args: args || undefined,
            fileName: fileName,
            lineNumber: lineNumber || undefined,
            columnNumber: columnNumber || undefined
        });
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),

/***/ "./frontend/style/main.scss":
/*!**********************************!*\
  !*** ./frontend/style/main.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2___default());
options.insert = function insertIntoTarget(element, options) {
                                if (document.head) {
                                    document.head.appendChild(element);
                                }
                                else {
                                    window.addEventListener("DOMContentLoaded", function () {
                                        document.head.appendChild(element);
                                    });
                                }
                            };
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_5__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_5__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_5__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_5__["default"].locals : undefined);


/***/ }),

/***/ "./frontend/style/moomoo.scss":
/*!************************************!*\
  !*** ./frontend/style/moomoo.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_moomoo_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./moomoo.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/moomoo.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_4___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_2___default());
options.insert = function insertIntoTarget(element, options) {
                                if (document.head) {
                                    document.head.appendChild(element);
                                }
                                else {
                                    window.addEventListener("DOMContentLoaded", function () {
                                        document.head.appendChild(element);
                                    });
                                }
                            };
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_moomoo_scss__WEBPACK_IMPORTED_MODULE_5__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_moomoo_scss__WEBPACK_IMPORTED_MODULE_5__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_moomoo_scss__WEBPACK_IMPORTED_MODULE_5__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_moomoo_scss__WEBPACK_IMPORTED_MODULE_5__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/tsee/lib/ee.js":
/*!*************************************!*\
  !*** ./node_modules/tsee/lib/ee.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitter = void 0;
/** Implemented event emitter */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        var _this = this;
        this.events = {};
        this.maxListeners = Infinity;
        this.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (_this.events[event]) {
                var len = _this.events[event].length;
                for (var _a = 0, _b = _this.events[event]; _a < _b.length; _a++) {
                    var e = _b[_a];
                    e.apply(void 0, args);
                }
                return !!len;
            }
            return false;
        };
        this.on = function (event, listener) {
            _this.addListener(event, listener);
            return _this;
        };
        this.once = function (event, listener) {
            var onceListener = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                listener.apply(void 0, args);
                _this.removeListener(event, onceListener);
            });
            _this.addListener(event, onceListener);
            return _this;
        };
        this.addListener = function (event, listener) {
            if (!(event in _this.events))
                _this.events[event] = [listener];
            else
                _this.events[event].push(listener);
            if (_this.maxListeners !== Infinity && _this.maxListeners <= _this.events[event].length)
                console.warn("Maximum event listeners for \"" + event + "\" event!");
            return _this;
        };
        this.removeListener = function (event, listener) {
            if (event in _this.events) {
                var i = _this.events[event].indexOf(listener);
                if (i !== -1)
                    _this.events[event].splice(i, 1);
            }
            return _this;
        };
        this.hasListeners = function (event) {
            return _this.events[event] && !!_this.events[event].length;
        };
        this.prependListener = function (event, listener) {
            if (!(event in _this.events))
                _this.events[event] = [listener];
            else
                _this.events[event].unshift(listener);
            return _this;
        };
        this.prependOnceListener = function (event, listener) {
            var onceListener = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                listener.apply(void 0, args);
                _this.removeListener(event, onceListener);
            });
            _this.prependListener(event, onceListener);
            return _this;
        };
        this.off = function (event, listener) {
            return _this.removeListener(event, listener);
        };
        this.removeAllListeners = function (event) {
            delete _this.events[event];
            return _this;
        };
        this.setMaxListeners = function (n) {
            _this.maxListeners = n;
            return _this;
        };
        this.getMaxListeners = function () {
            return _this.maxListeners;
        };
        this.listeners = function (event) {
            return __spreadArrays(_this.events[event]);
        };
        this.rawListeners = function (event) {
            return _this.events[event];
        };
        this.eventNames = function () {
            return Object.keys(_this.events);
        };
        this.listenerCount = function (type) {
            return _this.events[type] && _this.events[type].length || 0;
        };
    }
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=ee.js.map

/***/ }),

/***/ "./node_modules/tsee/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/tsee/lib/index.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./types */ "./node_modules/tsee/lib/types.js"), exports);
__exportStar(__webpack_require__(/*! ./ee */ "./node_modules/tsee/lib/ee.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tsee/lib/types.js":
/*!****************************************!*\
  !*** ./node_modules/tsee/lib/types.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asTypedEventEmitter = void 0;
/** cast type of any event emitter to typed event emitter */
function asTypedEventEmitter(x) {
    return x;
}
exports.asTypedEventEmitter = asTypedEventEmitter;
//# sourceMappingURL=types.js.map

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./frontend/src/main.ts");
/******/ 	
/******/ })()
;
/*!
 * // ==UserScript==
 * // @name         NVR
 * // @namespace    http://tampermonkey.net/
 * // @version      0.1
 * // @description  try to take over the world!
 * // @author       You
 * // @include      /^http[s]?:\/\/((sandbox|dev)\.)?moomoo\.io\/?(\?server=\d+:\d+:\d+)?$/
 * // @include      http://127.0.0.1/
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
class Action {
  constructor(id, type, priority, executeTick, data, force) {
    this.id = id;
    this.type = type;
    this.priority = priority;
    this.executeTick = executeTick;
    this.data = data;
    this.force = force;
  }
}


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
  ActionPriority[ActionPriority["COMPATIBILITY"] = 0] = "COMPATIBILITY";
  ActionPriority[ActionPriority["BIOMEHAT"] = 1] = "BIOMEHAT";
  ActionPriority[ActionPriority["AUTOHAT"] = 2] = "AUTOHAT";
  ActionPriority[ActionPriority["BULLTICK"] = 3] = "BULLTICK";
  ActionPriority[ActionPriority["ANTITRAP"] = 4] = "ANTITRAP";
  ActionPriority[ActionPriority["AUTOBREAK"] = 5] = "AUTOBREAK";
  ActionPriority[ActionPriority["ANTIBULL"] = 6] = "ANTIBULL";
  ActionPriority[ActionPriority["ANTIREFLECT"] = 7] = "ANTIREFLECT";
  ActionPriority[ActionPriority["SPIKESYNC"] = 8] = "SPIKESYNC";
  ActionPriority[ActionPriority["ANTIINSTA"] = 9] = "ANTIINSTA";
  ActionPriority[ActionPriority["FORCED"] = 10] = "FORCED";
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
/* harmony export */   "sym": () => (/* binding */ sym),
/* harmony export */   "target": () => (/* binding */ target)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Action */ "./frontend/src/core/Action.ts");
/* harmony import */ var _ActionType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/engine/PacketCountEngine */ "./frontend/src/util/engine/PacketCountEngine.ts");
/* harmony import */ var _manager_ObjectManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../manager/ObjectManager */ "./frontend/src/manager/ObjectManager.ts");
/* harmony import */ var _render_RenderManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../render/RenderManager */ "./frontend/src/render/RenderManager.ts");
/* harmony import */ var _render_interface_PacketCountModule__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../render/interface/PacketCountModule */ "./frontend/src/render/interface/PacketCountModule.ts");
/* harmony import */ var _features_ModuleManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../features/ModuleManager */ "./frontend/src/features/ModuleManager.ts");
/* harmony import */ var _util_engine_InteractionEngine__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../util/engine/InteractionEngine */ "./frontend/src/util/engine/InteractionEngine.ts");
/* harmony import */ var _injector_BundleProxy__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../injector/BundleProxy */ "./frontend/src/injector/BundleProxy.ts");
/* harmony import */ var _injector_api_API__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../injector/api/API */ "./frontend/src/injector/api/API.ts");
/* harmony import */ var _render_interface_PacketGraphModule__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../render/interface/PacketGraphModule */ "./frontend/src/render/interface/PacketGraphModule.ts");
/* harmony import */ var _manager_PlayerManager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../manager/PlayerManager */ "./frontend/src/manager/PlayerManager.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../loader/NVRLoader */ "./frontend/src/loader/NVRLoader.ts");
/* harmony import */ var _render_BuildingVisualisationModule__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../render/BuildingVisualisationModule */ "./frontend/src/render/BuildingVisualisationModule.ts");
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _manager_ProjectileManager__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../manager/ProjectileManager */ "./frontend/src/manager/ProjectileManager.ts");
/* harmony import */ var _util_StringUtil__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../util/StringUtil */ "./frontend/src/util/StringUtil.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_manager_ObjectManager__WEBPACK_IMPORTED_MODULE_9__, _features_ModuleManager__WEBPACK_IMPORTED_MODULE_12__, _util_engine_InteractionEngine__WEBPACK_IMPORTED_MODULE_13__, _injector_BundleProxy__WEBPACK_IMPORTED_MODULE_14__, _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_20__, _render_BuildingVisualisationModule__WEBPACK_IMPORTED_MODULE_21__]);
([_manager_ObjectManager__WEBPACK_IMPORTED_MODULE_9__, _features_ModuleManager__WEBPACK_IMPORTED_MODULE_12__, _util_engine_InteractionEngine__WEBPACK_IMPORTED_MODULE_13__, _injector_BundleProxy__WEBPACK_IMPORTED_MODULE_14__, _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_20__, _render_BuildingVisualisationModule__WEBPACK_IMPORTED_MODULE_21__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

//import { Pathfinder } from "../pathfinding/Pathfinder";
























const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_4__["default"]("core");
const sym = Symbol();
let target = null;

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
class Core extends (events__WEBPACK_IMPORTED_MODULE_0___default()) {
  static get ENDPOINT() {
    return "https://pleasingringedexpertise.gg69gamer.repl.co";
  }
  static get VER() {
    return new class extends String {
      uformat() {
        return this.replace(/\./g, "_");
      }
    }("1.0.0");
  }
  static get AUTHORS() {
    return ["Zaary", "Splex"];
  }
  actionIdCounter = 0;
  packetBlockIdCounter = 0;
  constructor(cid, callback) {
    super();

    // for loader verify
    this.cid = cid;
    Object.defineProperty(window, "core", {
      value: this
    });
    logger.info(`launched StarLit core version ${Core.VER} by ${Core.AUTHORS.join(", ")}`);
    this.bundleAPI = new _injector_api_API__WEBPACK_IMPORTED_MODULE_15__["default"](this);
    this.loaded = false;
    this.mstate = {
      mouseHeld: false
    };
    this.lastUpdate = Date.now();
    this.scheduledActions = [];
    this.lastActionState = {
      hat: 0,
      tail: 0,
      attack: 0,
      aim: 0,
      weapon: [0, true]
    };
    this.packetBlocks = {};

    // initialize modules first so engines can hook into them
    this.moduleManager = new _features_ModuleManager__WEBPACK_IMPORTED_MODULE_12__["default"]();
    this.objectManager = new _manager_ObjectManager__WEBPACK_IMPORTED_MODULE_9__["default"](this);
    this.playerManager = new _manager_PlayerManager__WEBPACK_IMPORTED_MODULE_17__["default"]();
    this.projectileManager = new _manager_ProjectileManager__WEBPACK_IMPORTED_MODULE_23__["default"](this);
    this.renderManager = null;
    this.tickEngine = new _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_5__.TickEngine(this);
    this.packetEngine = new _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_8__.PacketCountEngine(this);
    this.interactionEngine = new _util_engine_InteractionEngine__WEBPACK_IMPORTED_MODULE_13__["default"](this);
    this.mouseAngle = 0;
    this.bundleDir = null;
    const argstr = _util_StringUtil__WEBPACK_IMPORTED_MODULE_24__["default"].randomString(40);
    callback(c => {
      const func = new Function(argstr, "cid", `with(${argstr}){${c}}`);
      const lcrcsub = `with(${argstr}){}`.length;
      const ccrcsub = `with(${argstr}){}`.split("").reduce((previous, current) => previous + current.charCodeAt(0), 0);
      const toStr = func.toString();
      const body = toStr.substring(toStr.indexOf("{") + 1, toStr.lastIndexOf("}")).replace(/\n/g, "");
      const lcrc = body.length - lcrcsub;
      const ccrc = body.split("").reduce((previous, current) => previous + current.charCodeAt(0), 0) - ccrcsub;
      return [func.bind(this), [lcrc, ccrc]];
    });
  }
  lockBundleDirection(priority, dir) {
    if (this.bundleDir === null || priority >= this.bundleDir[0]) {
      this.bundleDir = [priority, dir];
      this.bundleAPI.values.set("attackdir", dir);
    }
  }
  unlockBundleDirection(priority) {
    if (this.bundleDir !== null && priority >= this.bundleDir[0]) {
      this.bundleDir = null;
      this.bundleAPI.values.delete("attackdir");
    }
  }
  onApiCallback(name, args, callback) {
    switch (name) {
      case "iosend":
        {
          _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.bundleSend(args[0], args[1]);
          break;
        }
    }
  }
  sd() {
    _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_20__["default"].stop();
  }
  patchBundle(src, promise) {
    _injector_BundleProxy__WEBPACK_IMPORTED_MODULE_14__["default"].loadBundle(src, this.bundleAPI, promise);
  }
  async initializeRenderer(canvas) {
    this.renderManager = new _render_RenderManager__WEBPACK_IMPORTED_MODULE_10__["default"](this, canvas, 1920, 1080);

    //await this.renderManager.createRenderer("background", HoverInfoModule, this);
    await this.renderManager.createRenderer("buildingVisualisation", _render_BuildingVisualisationModule__WEBPACK_IMPORTED_MODULE_21__["default"], this);
    await this.renderManager.createInterfaceRenderer("packetCount", _render_interface_PacketCountModule__WEBPACK_IMPORTED_MODULE_11__["default"], this);
    await this.renderManager.createInterfaceRenderer("packetGraph", _render_interface_PacketGraphModule__WEBPACK_IMPORTED_MODULE_16__["default"], this);
    this.renderManager.createRenderHook();
    this.renderManager.on("mousemove", event => {
      this.mouseAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_18__["default"].getDirection(new _util_type_Vector__WEBPACK_IMPORTED_MODULE_19__["default"](window.innerWidth / 2, window.innerHeight / 2), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_19__["default"](event.clientX, event.clientY));
    });
    this.renderManager.on("mousedown", event => {
      this.mstate.mouseHeld = true;
    });
    this.renderManager.on("mouseup", event => {
      this.mstate.mouseHeld = false;
    });
  }
  update() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    // emit event to be used in other modules
    this.emit("update", delta);
    this.playerManager.update(delta);
    this.objectManager.update(delta);
    this.moduleManager.onUpdate(delta);
  }
  createPacketBlock(type) {
    const id = this.packetBlockIdCounter++;
    if (!this.packetBlocks.hasOwnProperty(type)) {
      this.packetBlocks[type] = [];
    }
    this.packetBlocks[type].push(id);
    return id;
  }
  removePacketBlock(type, id) {
    const index = this.packetBlocks[type].indexOf(id);
    if (index > -1) this.packetBlocks[type].splice(index, 1);
  }
  attachLastActionStateListener() {
    // listen for packet send (post) - after its impossible to cancel
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetsendp", packet => {
      if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.BUY_AND_EQUIP) {
        if (packet.data[0] === 0) {
          if (!packet.data[2]) {
            this.lastActionState.hat = packet.data[1];
          } else {
            this.lastActionState.tail = packet.data[1];
          }
        }
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.ATTACK) {
        this.lastActionState.attack = packet.data[0];
        if (typeof packet.data[1] === "number") this.lastActionState.aim = packet.data[1];
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.SET_ANGLE) {
        this.lastActionState.aim = packet.data[0];
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.SELECT_ITEM) {
        this.lastActionState.weapon = [packet.data[0], packet.data[1]];
      }
    });
  }
  cleanActions(tick) {
    // clean actions
    let i = this.scheduledActions.length - 1;
    while (i >= 0) {
      const action = this.scheduledActions[i];
      if (action.executeTick < tick) this.scheduledActions.splice(i, 1);
      i--;
    }
  }
  runTickActions(tick) {
    this.runUppermostActions(_ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.HAT, tick);
    this.runUppermostActions(_ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.TAIL, tick);
    this.runUppermostActions(_ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.WEAPON, tick); // important to switch weapon before attack
    this.runUppermostActions(_ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.ATTACK, tick);
  }
  runUppermostActions(action, tick) {
    // filter and sort by highest priority
    const filtered = this.scheduledActions.filter(a => a.type == action && a.executeTick == tick && (() => {
      if (a.data !== undefined) {
        if (a.type === _ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.HAT && !this.playerManager.myPlayer.ownedHats.includes(a.data[0])) return false;
        if (a.type === _ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.TAIL && !this.playerManager.myPlayer.ownedTails.includes(a.data[0])) return false;
        if (a.type === _ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.WEAPON && (a.data[1] ? !this.playerManager.myPlayer.inventory.hasWeapon(a.data[0]) : this.playerManager.myPlayer.inventory.items[_data_moomoo_items__WEBPACK_IMPORTED_MODULE_22__.items.list[a.data[0]].group.id] !== a.data[0])) return false;
      }
      return true;
    })());
    const maxPriority = Math.max(...filtered.map(x => x.priority));

    //const sorted = filtered.sort((a, b) => b.priority - a.priority);

    const final = filtered.filter(x => x.priority === maxPriority);

    //console.log(final);

    if (final.length > 0 /*sorted.length > 0*/) {
      // run action

      //const action = final[0];
      for (let i = 0; i < final.length; i++) {
        this.runAction(final[i] /*sorted[0]*/);
      }

      // remove action from the list (not needed since we clear all actions on tick begin)
      /*const index = this.scheduledActions.indexOf(action);
      if (index > -1) {
          this.scheduledActions.splice(index, 1);
      }*/
    }
  }

  runAction(action) {
    if (action.data === undefined) return;
    switch (action.type) {
      case _ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.HAT:
        if (action.data[0] === this.lastActionState.hat) return;
        _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.BUY_AND_EQUIP, [0, action.data[0], 0]));
        this.lastActionState.hat = action.data[0];
        break;
      case _ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.TAIL:
        if (action.data[0] === this.lastActionState.tail) return;
        _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.BUY_AND_EQUIP, [0, action.data[0], 1]));
        this.lastActionState.tail = action.data[0];
        break;
      case _ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.ATTACK:
        if (action.data[0] === this.lastActionState.attack && action.data[1] === this.lastActionState.aim) return;
        _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.ATTACK, action.data), action.force);
        this.lastActionState.attack = action.data[0];
        this.lastActionState.aim = action.data[1];
        break;
      case _ActionType__WEBPACK_IMPORTED_MODULE_7__.ActionType.WEAPON:
        if (action.data[0] === this.lastActionState.weapon[0] && action.data[1] === this.lastActionState.weapon[1]) return;
        _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_2__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.SELECT_ITEM, [action.data[0], action.data[1]]));
        this.lastActionState.weapon = [action.data[0], action.data[1]];
      default:
        return;
    }
    this.moduleManager.onActionRun(action);
  }
  scheduleBlockerAction(action, pririoty, tick) {
    this.scheduledActions.push(new _Action__WEBPACK_IMPORTED_MODULE_6__.Action(this.actionIdCounter++, action, pririoty, tick, undefined, false));
  }
  scheduleAction(action, priority, tick = this.tickEngine.tickIndex + 1, data, force) {
    const ac = new _Action__WEBPACK_IMPORTED_MODULE_6__.Action(this.actionIdCounter++, action, priority, tick, data, force ? true : false);
    this.scheduledActions.push(ac);
    return ac.id;
  }
  runImmediateAction(action, priority, data) {
    this.runAction(new _Action__WEBPACK_IMPORTED_MODULE_6__.Action(this.actionIdCounter++, action, priority, -1, data, false));
  }
  cancelScheduledAction(type, maxPriority, tick, includeTicksBefore = false) {
    let i = this.scheduledActions.length - 1;
    while (i >= 0) {
      const action = this.scheduledActions[i];
      if (action.type === type && (includeTicksBefore ? action.executeTick <= tick : action.executeTick === tick) && action.priority <= maxPriority) {
        this.scheduledActions.splice(i, 1);
      }
      i--;
    }
  }
  isHighestPriority(priority, tick) {
    return this.scheduledActions.filter(x => x.priority > priority && x.executeTick === tick).length === 0;
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/core/CoreCreator.ts":
/*!******************************************!*\
  !*** ./frontend/src/core/CoreCreator.ts ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CoreCreator)
/* harmony export */ });
/* harmony import */ var _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader/NVRLoader */ "./frontend/src/loader/NVRLoader.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket/PacketHandler */ "./frontend/src/socket/PacketHandler.ts");
/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Core */ "./frontend/src/core/Core.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__, _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__, _Core__WEBPACK_IMPORTED_MODULE_3__]);
([_loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__, _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__, _Core__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




class CoreCreator {
  static create(cid) {
    return new _Core__WEBPACK_IMPORTED_MODULE_3__.Core(cid, cb2 => {
      const dict = {
        "connection": _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection,
        "PacketHandler": _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__.PacketHandler,
        "NVRLoader": _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__["default"],
        "cid": cid
      };
      const keys = Object.keys(dict);

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with
      const namespace = new Proxy({}, {
        has(target, key) {
          // Avoid trapping global properties like `console`
          if (key in globalThis) {
            return false;
          }
          // Trap all property lookups
          if (typeof key === "symbol") return false;
          return keys.includes(key);
        },
        get(target, p, receiver) {
          return dict[p];
        }
      });
      const [func, crcData] = cb2("// self destruct if invalid cid\rif (cid !== this.cid) this.sd();\r\rthis.lastUpdate = Date.now();\r\rthis.tickEngine.once(\"ping\", this.packetEngine.handlePing.bind(this.packetEngine));\r\rthis.tickEngine.on(\"tick\", (tick) => {\r    this.cleanActions(tick);\r\r    this.moduleManager.onTick(tick, this.tickEngine.getFirstSchedulableTick());\r\r    // run actions based on priority. we need to run actions from future ticks\r    // so packets have time to get to the server before the tick happens\r    this.runTickActions(tick + this.tickEngine.getPingTicks());\r\r    this.moduleManager.onPostTick(tick);\r});\r\r/*this.tickEngine.on(\"posttick\", (tick) => {\r    this.moduleManager.onPostTick(tick);\r});*/\r\r//this.tickEngine.on(\"tick\", this.moduleManager.onTick.bind(this.moduleManager));\r\rthis.mouseAngle = 0;\r\rdocument.addEventListener(\"keydown\", event => {\r    this.emit(\"keydown\", event);\r    this.moduleManager.onKeydown(event.keyCode);\r});\r\rdocument.addEventListener(\"keyup\", event => {\r    this.emit(\"keyup\", event)\r    this.moduleManager.onKeyup(event.keyCode);\r});\r\rthis.attachLastActionStateListener();\r\r// cancels aim packets because it only spams packets\r// and messes up autobreak aim (kinda lazy solution)\r// should be fixed explicitly in the future and\r// remove the packet cancelling\rconnection.on(\"packetsend\", (event, meta) => {\r    const packet = event.getPacket();\r    //console.log(packet);\r    if (this.packetBlocks.hasOwnProperty(packet.type)) {\r        if (this.packetBlocks[packet.type].length > 0) {\r            event.cancel();\r            return;\r        }\r    }\r\r    PacketHandler.processOut(event, meta);\r    this.moduleManager.onPacketSend(event);\r});\r\r// listen for received packets (always process the packet before passing it to modules)\rconnection.on(\"packetreceive\", (event) => {\r    PacketHandler.processIn(event.getPacket());\r    this.moduleManager.onPacketReceive(event);\r});\r\rsetInterval(this.update.bind(this), 1);\r\rthis.loaded = true;\rNVRLoader.stop();");

      // verify function integrity
      if (1974 !== crcData[0] || 169649 !== crcData[1]) {
        while (69 * 420 === 28980) {
          undefined;
        }
        ;
      } else {
        // init core
        func(namespace, cid);
      }
    });
  }
}
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
const accessories = [{
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
const config = {
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
  fetchVariant: function (player) {
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
const hats = [{
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
const groups = [{
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
const projectiles = [{
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
const list = [{
  id: -1,
  group: groups[0],
  name: "apple",
  desc: "restores 20 health when consumed",
  req: ["food", 10],
  healAmount: 20,
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
  healAmount: 40,
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
  healAmount: 30,
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
const items = {
  groups,
  projectiles,
  list
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
/* harmony import */ var _util_type_SidArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/type/SidArray */ "./frontend/src/util/type/SidArray.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _moomoo_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../moomoo/items */ "./frontend/src/data/moomoo/items.ts");



class GameObject {
  // base properties

  dir = 0;
  scale = 0;
  // for object manager
  wiggles = [];
  gridLocations = [];
  constructor(sid, type, position, dir, scale) {
    this.sid = sid;
    this.type = type;
    this.position = position;
    this.dir = dir;
    this.scale = scale;
    this.wiggle = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
  }
  update(delta) {
    if (!this.wiggle.isNull()) {
      this.wiggle.multiply(Math.pow(0.99, delta));
    }
  }
  getScale(fullScale = false) {
    return this instanceof NaturalObject ? this.type === 0 || this.type === 1 ? this.scale * 0.36 : this.scale : this.scale * (fullScale ? 1 : _moomoo_items__WEBPACK_IMPORTED_MODULE_2__.items.list[this.type].colDiv ?? 1);
  }
  getPlaceColScale() {
    return this instanceof NaturalObject && (this.type === 0 || this.type === 1) ? this.scale * 0.36 : this.scale;
  }
}
class NaturalObject extends GameObject {
  constructor(sid, position, dir, scale, type) {
    super(sid, type, position, dir, scale);
    this.type = type;
  }
}
class PlayerBuilding extends GameObject {
  constructor(sid, position, dir, scale, type, owner, placementSighted) {
    super(sid, type, position, dir, scale);
    this.stats = _moomoo_items__WEBPACK_IMPORTED_MODULE_2__.items.list[type];
    this.owner = {
      sid: owner
    };
    this.meta = {
      wasPlacementSighted: placementSighted,
      shouldUpdate: this.stats.group.id === 3 // group 3 is windmills
    };

    this.health = this.stats.health ?? 1;
    this.ownedProjectiles = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_0__.SidArray();
  }
  update(delta) {
    super.update(delta);
    if (this.stats.turnSpeed) {
      this.dir += this.stats.turnSpeed * delta;
    }
  }
}


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
const randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randFloat = function (min, max) {
  return Math.random() * (max - min + 1) + min;
};
const lerp = function (value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
};
const decel = function (val, cel) {
  if (val > 0) val = Math.max(0, val - cel);else if (val < 0) val = Math.min(0, val + cel);
  return val;
};
const getDistance = function (x1, y1, x2, y2) {
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
};
const getDirection = function (x1, y1, x2, y2) {
  return Math.atan2(y1 - y2, x1 - x2);
};
const getAngleDist = function (a, b) {
  var p = Math.abs(b - a) % (Math.PI * 2);
  return p > Math.PI ? Math.PI * 2 - p : p;
};
const isNumber = function (n) {
  return typeof n == "number" && !isNaN(n) && isFinite(n);
};
const isString = function (s) {
  return s && typeof s == "string";
};
const kFormat = function (num) {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
};
const capitalizeFirst = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const fixTo = function (n, v) {
  return parseFloat(n.toFixed(v));
};
const sortByPoints = function (a, b) {
  return parseFloat(b.points) - parseFloat(a.points);
};
const lineInRect = function (recX, recY, recX2, recY2, x1, y1, x2, y2) {
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
const containsPoint = function (element, x, y) {
  var bounds = element.getBoundingClientRect();
  var left = bounds.left + window.scrollX;
  var top = bounds.top + window.scrollY;
  var width = bounds.width;
  var height = bounds.height;
  var insideHorizontal = x > left && x < left + width;
  var insideVertical = y > top && y < top + height;
  return insideHorizontal && insideVertical;
};
const mousifyTouchEvent = function (event) {
  var touch = event.changedTouches[0];
  event.screenX = touch.screenX;
  event.screenY = touch.screenY;
  event.clientX = touch.clientX;
  event.clientY = touch.clientY;
  event.pageX = touch.pageX;
  event.pageY = touch.pageY;
};
const removeAllChildren = function (element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
};
const generateElement = function (config) {
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
const eventIsTrusted = function (ev) {
  if (ev && typeof ev.isTrusted == "boolean") {
    return ev.isTrusted;
  } else {
    return true;
  }
};
const checkTrusted = function (callback) {
  return function (ev) {
    if (ev && ev instanceof Event && module.exports.eventIsTrusted(ev)) {
      callback(ev);
    } else {
      //console.error("Event is not trusted.", ev);
    }
  };
};
const randomString = function (length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const countInArray = function (array, val) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === val) count++;
  }
  return count;
};
const util = {
  randInt,
  randFloat,
  lerp,
  decel,
  getDistance,
  getDirection,
  getAngleDist,
  isNumber,
  isString,
  kFormat,
  capitalizeFirst,
  fixTo,
  sortByPoints,
  lineInRect,
  containsPoint,
  mousifyTouchEvent,
  removeAllChildren,
  generateElement,
  eventIsTrusted,
  checkTrusted,
  randomString,
  countInArray
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
/* harmony import */ var _util_type_SidArray__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/type/SidArray */ "./frontend/src/util/type/SidArray.ts");










var WeaponFinder;
(function (WeaponFinder) {
  WeaponFinder[WeaponFinder["BUILDING_BREAK"] = 0] = "BUILDING_BREAK";
  WeaponFinder[WeaponFinder["MOVEMENT_SPEED"] = 1] = "MOVEMENT_SPEED";
  WeaponFinder[WeaponFinder["DAMAGE"] = 2] = "DAMAGE";
})(WeaponFinder || (WeaponFinder = {}));
class Inventory {
  static WeaponFinders = WeaponFinder;
  constructor(player) {
    this.player = player;
    this.weapons = [_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER, null];
    this.weaponVariants = [0, null];
    this.reloads = Object.fromEntries(new Array(_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList.length).fill(undefined).map((_x, i) => [i, 0]));
    this.items = [0, 3, 6, 10];
    this.heldItem = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
    this.weaponSelected = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
    this.turretGearReload = 0;
  }
  reset() {
    this.weapons = [_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER, null];
    this.weaponVariants = [0, null];
    this.reloads = Object.fromEntries(new Array(_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList.length).fill(undefined).map((_x, i) => [i, 0]));
    ;
    this.items = [0, 3, 6, 10];
    this.heldItem = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
    this.weaponSelected = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.TOOL_HAMMER;
  }
  setWeapons(weapons) {
    this.weapons = [_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weapons[0]], _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weapons[1]]];
  }
  setItems(items) {
    this.items = items;
  }
  resetReload(item) {
    this.reloads[item.id] = item.stats.reloadTime;
  }
  resetAllRangedReloads() {
    this.reloads[_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.HUNTING_BOW.id] = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.HUNTING_BOW.stats.reloadTime;
    this.reloads[_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.CROSSBOW.id] = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.CROSSBOW.stats.reloadTime;
    this.reloads[_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.REPEATER_CROSSBOW.id] = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.REPEATER_CROSSBOW.stats.reloadTime;
    this.reloads[_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.MUSKET.id] = _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapons.MUSKET.stats.reloadTime;
  }
  updateReloads(delta) {
    if (!(this.heldItem instanceof _Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapon)) return;
    const id = this.heldItem.id;
    if (this.reloads[id] > 0) {
      this.reloads[id] -= delta;
      if (this.reloads[id] <= 0) this.reloads[id] = 0;
    }
    this.turretGearReload -= delta;
  }
  remainingReloadTime(slot) {
    return this.reloads[this.weapons[slot]?.id];
  }
  findBestWeapon(finder) {
    switch (finder) {
      case WeaponFinder.BUILDING_BREAK:
        return this.weapons.flat(1).filter(x => x !== null && x instanceof _Weapon__WEBPACK_IMPORTED_MODULE_5__.MeleeWeapon).sort((a, b) => b.stats.dmg * b.stats.buildingDmgMultiplier - a.stats.dmg * a.stats.buildingDmgMultiplier)[0];
      case WeaponFinder.MOVEMENT_SPEED:
        return this.weapons.flat(1).filter(x => x !== null).sort((a, b) => b.stats.speedMultiplier - a.stats.speedMultiplier)[0];
      case WeaponFinder.DAMAGE:
        return this.weapons[0];
    }
  }
  getWeapon(slot) {
    return this.weapons[slot];
  }
  getWeaponVariant(slot) {
    return this.weaponVariants[slot];
  }
  hasWeapon(weapon) {
    const wep = typeof weapon === "number" ? _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weapon] : weapon;
    return this.weapons[0].id === wep.id || this.weapons[1] && this.weapons[1].id === wep.id;
  }
  fireTurretGear(pingDelta) {
    this.turretGearReload = 3000 - pingDelta;
  }
}
class ShameTracker {
  constructor() {
    this.points = 0;
    this.timer = 0;
    this.isClowned = false;
    this.lastDamage = -1;
  }
  isSafeHeal(ping, std) {
    return Date.now() + ping - std - this.lastDamage > 120;
  }
  whenSafeHeal(ping) {
    return 120 - (Date.now() + ping - this.lastDamage);
  }
}
class HatTracker {
  static BUFFER_LENGTH = _moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].serverUpdateRate * 3; // track from previous 3 seconds

  constructor() {
    this.currentHat = null;
    this.currentTail = null;
    this.hatBuffer = [];
    this.tailBuffer = [];
  }
  push(hat, tail) {
    this.hatBuffer.push(hat);
    if (this.hatBuffer.length >= HatTracker.BUFFER_LENGTH) this.hatBuffer.shift();
    this.tailBuffer.push(tail);
    if (this.tailBuffer.length >= HatTracker.BUFFER_LENGTH) this.tailBuffer.shift();
  }
  isFull() {
    return this.hatBuffer.length + this.tailBuffer.length >= HatTracker.BUFFER_LENGTH * 2;
  }

  // these calculations are fine: array.length - lastIndexOf(lastElement) = 1
  getLastSeenHat(hat) {
    const lastIndex = this.hatBuffer.lastIndexOf(hat);
    return lastIndex === -1 ? -1 : HatTracker.BUFFER_LENGTH - lastIndex;
  }
  getLastSeenTail(tail) {
    const lastIndex = this.tailBuffer.lastIndexOf(tail);
    return lastIndex === -1 ? -1 : HatTracker.BUFFER_LENGTH - lastIndex;
  }
}
class Player {
  /*public hat: Hat;
  public tail: Accessory;*/

  //public isLeader: boolean = false;

  //public serverPosition: Vector; // x2, y2
  //public clientPosition: Vector; // x1, y1
  //public renderPosition: Vector; // x, y

  /*public zIndex: number = 0;
  public xVel: number = 0;
  public yVel: number = 0;*/

  dir = 0;
  maxHealth = 100;
  health = this.maxHealth;
  scale = _moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].playerScale;
  speed = _moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed;
  visible = false;
  constructor(id, sid, name, position, dir, health, maxHealth, scale, skinColor) {
    this.id = id;
    this.sid = sid;
    this.name = name;
    this.serverPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.lastTickServerPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.renderPos = position;
    this.lerpPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.velocity = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.serverDir = dir;
    this.dir = dir;
    this.health = health;
    this.maxHealth = maxHealth;
    this.shame = new ShameTracker();
    this.hatTracker = new HatTracker();
    this.scale = scale;
    this.skinColor = skinColor;
    this.skinIndex = 0;
    this.tailIndex = 0;
    this.team = null;
    this.lastTickPosX = 0;
    this.lastTickPosY = 0;
    this.inventory = new Inventory(this);
    this.movementProcessor = new _util_processor_MovementProcessor__WEBPACK_IMPORTED_MODULE_7__["default"](this);
    this.hasAttackedThisTick = false;
    this._attackedThisTickTempVariable = false;
    this.hasFiredProjectileThisTick = false;
    this._firedThisTickTempVariable = false;
    this.lastProjectileFired = null;
    this.state = {
      isTrapped: false,
      buildIndex: -1,
      data: {
        trap: undefined
      }
    };
    this.nextAttack = 0;
    this.swingStreak = 0;
    this.seenHats = new Set();
    this.seenTails = new Set();
    this.ownedProjectiles = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_9__.SidArray();
    this.lastUpdate = 0;
  }
  updatePlayer(core, x, y, dir, buildIndex, weaponIndex, _weaponVariant, _team, _isLeader, _skinIndex, _tailIndex, _iconIndex, _zIndex) {
    this.lerpPos = this.renderPos.clone();
    this.lastTickServerPos = this.serverPos.clone();
    this.serverPos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y);
    this.velocity = this.serverPos.clone().subtract(this.lastTickServerPos);
    //this.dir = dir;
    this.serverDir = this.dir = dir;
    this.state.buildIndex = buildIndex;
    this.skinIndex = _skinIndex;
    this.tailIndex = _tailIndex;

    // perf TODO: remake this so it doesnt use .find (very expensive to iterate the entire arr)
    this.hatTracker.currentHat = _moomoo_hats__WEBPACK_IMPORTED_MODULE_2__["default"].find(x => x.id === _skinIndex) ?? null;
    this.hatTracker.currentTail = _moomoo_accessories__WEBPACK_IMPORTED_MODULE_0__["default"].find(x => x.id === _tailIndex) ?? null;
    this.hatTracker.push(_skinIndex, _tailIndex);
    this.seenHats.add(_skinIndex);
    this.seenTails.add(_tailIndex);
    const holdsWeapon = buildIndex === -1;
    this.inventory.weaponSelected = _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weaponIndex];
    if (this.sid !== core.playerManager.myPlayer.sid) {
      this.inventory.heldItem = holdsWeapon ? _Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[weaponIndex] : _moomoo_items__WEBPACK_IMPORTED_MODULE_3__.items.list[buildIndex];
      if (holdsWeapon) {
        this.inventory.weapons[this.inventory.weaponSelected.id < 9 ? _Weapon__WEBPACK_IMPORTED_MODULE_5__.WeaponSlot.PRIMARY : _Weapon__WEBPACK_IMPORTED_MODULE_5__.WeaponSlot.SECONDARY] = this.inventory.weaponSelected;
      }
    }
    if (holdsWeapon) {
      this.inventory.weaponVariants[this.inventory.weaponSelected.id < 9 ? _Weapon__WEBPACK_IMPORTED_MODULE_5__.WeaponSlot.PRIMARY : _Weapon__WEBPACK_IMPORTED_MODULE_5__.WeaponSlot.SECONDARY] = _weaponVariant;
    }

    /*if (this.lastUpdate > 0) {
    	const now = Date.now();
    	this.inventory.updateReloads(now - this.lastUpdate);
    	this.lastUpdate = now;
    }*/

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

    // damage objects
    const weapon = this.inventory.weaponSelected;
    const hittableObjects = core.objectManager.getGridArrays(x, y, weapon.stats.range);
    for (let i = 0; i < hittableObjects.length; i++) {
      const object = hittableObjects[i];
      // use object.scale because .getScale returns collision box while .scale is hitbox
      if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(object.position, this.serverPos) - object.scale <= weapon.stats.range) {
        for (const wiggle of object.wiggles) {
          const gatherAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDirection(this.serverPos, object.position);
          if (object instanceof _GameObject__WEBPACK_IMPORTED_MODULE_8__.PlayerBuilding && _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getAngleDist(wiggle[0], _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].roundTo(gatherAngle, 1)) === 0) {
            // damage the building depending on the player's weapon damage

            if (weapon instanceof _Weapon__WEBPACK_IMPORTED_MODULE_5__.MeleeWeapon) {
              const hatMultiplier = _moomoo_hats__WEBPACK_IMPORTED_MODULE_2__["default"].find(x => x.id === this.skinIndex)?.bDmg ?? 1;
              const damage = weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatMultiplier;
              object.health -= damage;
              //console.log("hit building " + object.stats.name + " new health:", object.health, "angles;", wiggle[0], MathUtil.roundTo(gatherAngle, 1));
            } else {
              //console.warn("detected hit while holding ranged weapon");
            }
            //core.moduleManager.onBuildingHit(player, object, damage);

            // remove the wiggle as its confirmed by player update and gather
            object.wiggles.splice(object.wiggles.indexOf(wiggle), 1);
          } else {
            // this should NOT happen
          }
        }
      }
    }

    // objects
    const grids = core.objectManager.getGridArrays(this.serverPos.x, this.serverPos.y, this.scale + this.velocity.length() * 2);
    for (let i = 0; i < grids.length; i++) {
      const object = grids[i];
      if (object instanceof _GameObject__WEBPACK_IMPORTED_MODULE_8__.NaturalObject) continue;
      const isCollision = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(this.serverPos, object.position) < this.scale + object.getScale();
      if (object.type === 15 && isCollision && object.owner.sid !== this.sid) this.state.isTrapped = true, this.state.data.trap = object;
    }
  }
  updateData(id, sid, name, position, dir, health, maxHealth, scale, skinColor) {
    this.id = id;
    this.sid = sid;
    this.name = name;
    this.serverPos = position;
    //this.dir = dir;
    this.serverDir = this.dir = dir;
    this.health = health;
    this.maxHealth = maxHealth;
    this.scale = scale;
    this.skinColor = skinColor;
  }
}
class ClientPlayer extends Player {
  constructor(id, sid, name, position, dir, health, maxHealth, scale, skinColor) {
    super(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
    this.alive = false;
    this.packetHealth = this.maxHealth;
    this.isAttacking = false;
    this.isAutoAttacking = false;
    this.justStartedAttacking = false;
    this.isAttackingWhileBlocked = false;
    this.ownedHats = _moomoo_hats__WEBPACK_IMPORTED_MODULE_2__["default"].filter(x => x.price === 0).map(x => x.id);
    this.ownedTails = _moomoo_accessories__WEBPACK_IMPORTED_MODULE_0__["default"].filter(x => x.price === 0).map(x => x.id);
    this.ownedHats.push(0);
    this.ownedTails.push(0);
  }
  updateData(id, sid, name, position, dir, health, maxHealth, scale, skinColor) {
    super.updateData(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
    this.packetHealth = maxHealth;
    this.isAutoAttacking = false;
    this.isAttacking = false;
  }
}


/***/ }),

/***/ "./frontend/src/data/type/Projectile.ts":
/*!**********************************************!*\
  !*** ./frontend/src/data/type/Projectile.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Projectile": () => (/* binding */ Projectile),
/* harmony export */   "ProjectileItem": () => (/* binding */ ProjectileItem),
/* harmony export */   "Projectiles": () => (/* binding */ Projectiles),
/* harmony export */   "projectileList": () => (/* binding */ projectileList)
/* harmony export */ });
/* harmony import */ var _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");


class ProjectileItem {
  constructor(type, stats) {
    this.type = type;
    this.stats = stats;
  }
}
const Projectiles = {
  BOW_ARROW: new ProjectileItem(0, {
    scale: 103,
    range: 1000,
    speed: 1.6,
    dmg: 25
  }),
  TURRET_BULLET: new ProjectileItem(1, {
    scale: 20,
    range: 700,
    speed: 1.5,
    dmg: 25
  }),
  CROSSBOW_ARROW: new ProjectileItem(2, {
    scale: 103,
    range: 1200,
    speed: 2.5,
    dmg: 35
  }),
  REPEATER_CROSSBOW_ARROW: new ProjectileItem(3, {
    scale: 103,
    range: 1200,
    speed: 2,
    dmg: 30
  }),
  UNKNOWN_PROJECTILE: new ProjectileItem(4, {
    scale: 20,
    range: 700,
    speed: 2,
    dmg: 16
  }),
  MUSKET_BULLET: new ProjectileItem(5, {
    scale: 160,
    range: 1400,
    speed: 3.6,
    dmg: 50
  })
};
const projectileList = Object.values(Projectiles);
class Projectile {
  constructor(type, sid, spawnPosition, spawnTick, dir, range, speed, layer, scale, owner) {
    this.type = type;
    this.sid = sid;
    this.spawnPos = spawnPosition;
    this.spawnTick = spawnTick;
    this.dir = dir;
    this.range = range;
    this.speed = speed;
    this.layer = layer;
    this.scale = scale;
    this.owner = owner;

    //console.log("a projectile spawned:", projectileList[type], "owner:", this.owner);
  }

  static willBeTicked(projectileItem, source, sourceScale, destination) {
    const dist = Math.max(0, _util_MathUtil__WEBPACK_IMPORTED_MODULE_1__["default"].getDistance(source, destination) - sourceScale);
    if (dist > projectileItem.stats.range) return true;
    return dist !== 0 && dist / projectileItem.stats.speed > _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_0__.TickEngine.TICK_DELTA;
  }
  static canHit(item, spawnPos, dir, targetPos, targetScale) {
    return _util_MathUtil__WEBPACK_IMPORTED_MODULE_1__["default"].lineInRectMooMoo(targetPos.x - targetScale, targetPos.y - targetScale, targetPos.x + targetScale, targetPos.y + targetScale, spawnPos.x + 70 * Math.cos(dir), spawnPos.y + 70 * Math.sin(dir), spawnPos.x + Math.cos(dir) * (item.stats.range + item.stats.speed), spawnPos.y + Math.sin(dir) * (item.stats.range + item.stats.speed));
  }
  getTicksExisted(currentTick) {
    return currentTick - this.spawnTick;
  }
  getDistanceTraveled(ticksFromSpawn) {
    return this.spawnPos.clone().directionMove(this.dir, this.speed * ticksFromSpawn * _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_0__.TickEngine.TICK_DELTA);
  }
  canHit(targetPos, targetScale) {
    return _util_MathUtil__WEBPACK_IMPORTED_MODULE_1__["default"].lineInRectMooMoo(targetPos.x - targetScale, targetPos.y - targetScale, targetPos.x + targetScale, targetPos.y + targetScale, this.spawnPos.x, this.spawnPos.y, this.spawnPos.x + Math.cos(this.dir) * (this.range + this.speed), this.spawnPos.y + Math.sin(this.dir) * (this.range + this.speed));
  }
  getTimeToHitTarget(targetPos, targetScale) {
    const distanceToTarget = this.spawnPos.clone().subtract(targetPos).length();
    if (!this.canHit(targetPos, targetScale)) return -1;
    return distanceToTarget / this.speed;
  }
  getTicksToHitTarget(targetPos, targetScale) {
    const ms = this.getTimeToHitTarget(targetPos, targetScale);
    return ms > -1 ? Math.ceil(ms / _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_0__.TickEngine.TICK_DELTA) : -1;
  }
}


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
/* harmony export */   "weaponList": () => (/* binding */ weaponList),
/* harmony export */   "weaponPreMap": () => (/* binding */ weaponPreMap)
/* harmony export */ });
/* harmony import */ var _Projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Projectile */ "./frontend/src/data/type/Projectile.ts");

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
class Weapon {
  constructor(id, slot, type, stats) {
    this.id = id;
    this.slot = slot;
    this.type = type;
    this.stats = stats;
  }
}
class MeleeWeapon extends Weapon {
  constructor(id, slot, type, stats) {
    super(id, slot, type, stats);
    this.stats = stats;
  }
}
class RangedWeapon extends Weapon {
  constructor(id, slot, type, projectile, stats) {
    super(id, slot, type, stats);
    this.projectile = projectile;
    this.stats = stats;
  }
}
const weaponPreMap = new Map([[0, null], [1, null], [2, null], [3, null], [4, 3],
// sword => katana
[5, null], [6, null], [7, null], [8, null], [9, null], [10, null], [11, null], [12, 9],
// bow => crossbow
[13, 12],
// crossbow => repeater crossbow
[14, null], [15, 12] // crossbow => musket
]);

const Weapons = {
  // important: keep the order to access weapon objects using their IDs
  TOOL_HAMMER: new MeleeWeapon(0, WeaponSlot.PRIMARY, WeaponType.TOOL_HAMMER, {
    dmg: 25,
    buildingDmgMultiplier: 1,
    range: 65,
    reloadTime: 300,
    speedMultiplier: 1,
    knockback: 0
  }),
  HAND_AXE: new MeleeWeapon(1, WeaponSlot.PRIMARY, WeaponType.HAND_AXE, {
    dmg: 30,
    buildingDmgMultiplier: 1,
    range: 70,
    reloadTime: 400,
    speedMultiplier: 1,
    knockback: 0
  }),
  GREAT_AXE: new MeleeWeapon(2, WeaponSlot.PRIMARY, WeaponType.GREAT_AXE, {
    dmg: 35,
    buildingDmgMultiplier: 1,
    range: 75,
    reloadTime: 400,
    speedMultiplier: 1,
    knockback: 0
  }),
  SHORT_SWORD: new MeleeWeapon(3, WeaponSlot.PRIMARY, WeaponType.SHORT_SWORD, {
    dmg: 35,
    buildingDmgMultiplier: 1,
    range: 110,
    reloadTime: 300,
    speedMultiplier: 0.85,
    knockback: 0
  }),
  KATANA: new MeleeWeapon(4, WeaponSlot.PRIMARY, WeaponType.KATANA, {
    dmg: 40,
    buildingDmgMultiplier: 1,
    range: 118,
    reloadTime: 300,
    speedMultiplier: 0.8,
    knockback: 0
  }),
  POLEARM: new MeleeWeapon(5, WeaponSlot.PRIMARY, WeaponType.POLEARM, {
    dmg: 45,
    buildingDmgMultiplier: 1,
    range: 142,
    reloadTime: 700,
    speedMultiplier: 0.82,
    knockback: 0.2
  }),
  BAT: new MeleeWeapon(6, WeaponSlot.PRIMARY, WeaponType.BAT, {
    dmg: 20,
    buildingDmgMultiplier: 1,
    range: 110,
    reloadTime: 300,
    speedMultiplier: 1,
    knockback: 0.7
  }),
  DAGGERS: new MeleeWeapon(7, WeaponSlot.PRIMARY, WeaponType.DAGGERS, {
    dmg: 20,
    buildingDmgMultiplier: 1,
    range: 65,
    reloadTime: 100,
    speedMultiplier: 1.13,
    knockback: 0.1
  }),
  STICK: new MeleeWeapon(8, WeaponSlot.PRIMARY, WeaponType.STICK, {
    dmg: 1,
    buildingDmgMultiplier: 1,
    range: 70,
    reloadTime: 400,
    speedMultiplier: 1,
    knockback: 0
  }),
  HUNTING_BOW: new RangedWeapon(9, WeaponSlot.SECONDARY, WeaponType.HUNTING_BOW, _Projectile__WEBPACK_IMPORTED_MODULE_0__.Projectiles.BOW_ARROW, {
    range: 1000,
    speedMultiplier: 0.75,
    reloadTime: 600,
    dmg: 25
  }),
  GREAT_HAMMER: new MeleeWeapon(10, WeaponSlot.SECONDARY, WeaponType.GREAT_HAMMER, {
    dmg: 10,
    buildingDmgMultiplier: 7.5,
    range: 75,
    reloadTime: 400,
    speedMultiplier: 1,
    knockback: 0
  }),
  SHIELD: new MeleeWeapon(11, WeaponSlot.SECONDARY, WeaponType.SHIELD, {
    dmg: 0,
    buildingDmgMultiplier: 1,
    range: 0,
    reloadTime: 0,
    speedMultiplier: 0.7,
    knockback: 0
  }),
  CROSSBOW: new RangedWeapon(12, WeaponSlot.SECONDARY, WeaponType.CROSSBOW, _Projectile__WEBPACK_IMPORTED_MODULE_0__.Projectiles.CROSSBOW_ARROW, {
    range: 1200,
    speedMultiplier: 0.7,
    reloadTime: 700,
    dmg: 30
  }),
  REPEATER_CROSSBOW: new RangedWeapon(13, WeaponSlot.SECONDARY, WeaponType.REPEATER_CROSSBOW, _Projectile__WEBPACK_IMPORTED_MODULE_0__.Projectiles.REPEATER_CROSSBOW_ARROW, {
    range: 1200,
    speedMultiplier: 0.7,
    reloadTime: 230,
    dmg: 25
  }),
  MC_GRABBY: new MeleeWeapon(14, WeaponSlot.SECONDARY, WeaponType.MC_GRABBY, {
    dmg: 0,
    buildingDmgMultiplier: 1,
    range: 125,
    reloadTime: 700,
    speedMultiplier: 1.05,
    knockback: 0.2
  }),
  MUSKET: new RangedWeapon(15, WeaponSlot.SECONDARY, WeaponType.MUSKET, _Projectile__WEBPACK_IMPORTED_MODULE_0__.Projectiles.MUSKET_BULLET, {
    range: 1400,
    speedMultiplier: 0.6,
    reloadTime: 1500,
    dmg: 50
  })
};
const weaponList = Object.values(Weapons);
const wpdata = [{
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
class Event {
  constructor() {
    this.canceled = false;
  }
  cancel() {
    this.canceled = true;
  }
  isCanceled() {
    return this.canceled;
  }
}

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

class EventPacket extends _Event__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(packet, isBundle) {
    super();
    this.packet = packet;
    this.callback = undefined;
    this.isBundle = isBundle;
  }
  getPacket() {
    return this.packet;
  }
  setPacket(packet) {
    this.packet = packet;
  }
  setData(data) {
    this.packet.data = data;
  }
}

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
/* harmony import */ var _modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/building/AntiTrap */ "./frontend/src/features/modules/building/AntiTrap.ts");
/* harmony import */ var _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/building/AutoReplace */ "./frontend/src/features/modules/building/AutoReplace.ts");
/* harmony import */ var _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/building/ItemPlacer */ "./frontend/src/features/modules/building/ItemPlacer.ts");
/* harmony import */ var _modules_combat_AntiBull__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/combat/AntiBull */ "./frontend/src/features/modules/combat/AntiBull.ts");
/* harmony import */ var _modules_combat_AntiInsta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/combat/AntiInsta */ "./frontend/src/features/modules/combat/AntiInsta.ts");
/* harmony import */ var _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/combat/Autoheal */ "./frontend/src/features/modules/combat/Autoheal.ts");
/* harmony import */ var _modules_combat_BullTick__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/combat/BullTick */ "./frontend/src/features/modules/combat/BullTick.ts");
/* harmony import */ var _modules_combat_SpikeSync__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/combat/SpikeSync */ "./frontend/src/features/modules/combat/SpikeSync.ts");
/* harmony import */ var _modules_misc_NoToxic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/misc/NoToxic */ "./frontend/src/features/modules/misc/NoToxic.ts");
/* harmony import */ var _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/player/AutoHat */ "./frontend/src/features/modules/player/AutoHat.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_1__, _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_2__, _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_3__, _modules_combat_AntiBull__WEBPACK_IMPORTED_MODULE_4__, _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_6__, _modules_combat_BullTick__WEBPACK_IMPORTED_MODULE_7__, _modules_combat_SpikeSync__WEBPACK_IMPORTED_MODULE_8__, _modules_misc_NoToxic__WEBPACK_IMPORTED_MODULE_9__, _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_10__]);
([_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_1__, _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_2__, _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_3__, _modules_combat_AntiBull__WEBPACK_IMPORTED_MODULE_4__, _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_6__, _modules_combat_BullTick__WEBPACK_IMPORTED_MODULE_7__, _modules_combat_SpikeSync__WEBPACK_IMPORTED_MODULE_8__, _modules_misc_NoToxic__WEBPACK_IMPORTED_MODULE_9__, _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_0__["default"]("module-manager");
class ModuleManager {
  /**
   * ORDER IS VERY IMPORTANT!!!
   * 
   * AntiTrap runs after placing it would mess it up
   * AutoHat runs last because of all the attacks from placements that could confuse it
   */
  static classes = [_modules_misc_NoToxic__WEBPACK_IMPORTED_MODULE_9__["default"],
  // run before autohat so it has the oppourtunity to mess with it's hat switchers
  _modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_10__["default"],
  //AutoPlacer,
  _modules_building_AutoReplace__WEBPACK_IMPORTED_MODULE_2__["default"], _modules_building_ItemPlacer__WEBPACK_IMPORTED_MODULE_3__["default"], _modules_combat_BullTick__WEBPACK_IMPORTED_MODULE_7__["default"], _modules_combat_SpikeSync__WEBPACK_IMPORTED_MODULE_8__["default"],
  // run before autotrap since autotrap also checks if it has highest priority in tick

  _modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_1__["default"], _modules_combat_AntiBull__WEBPACK_IMPORTED_MODULE_4__["default"],
  // anti insta has to run after all the hat setters so it doesnt get overriden by a mistake
  _modules_combat_AntiInsta__WEBPACK_IMPORTED_MODULE_5__["default"], _modules_combat_Autoheal__WEBPACK_IMPORTED_MODULE_6__["default"] // activate autoheal after anti insta in case the player is already fully healed by anti
  ];

  modules = [];
  constructor() {
    for (const clazz of ModuleManager.classes) {
      this.modules.push(Reflect.construct(clazz, []));
    }
    logger.info(`loaded ${this.modules.length} modules`);
  }
  onRespawn() {
    for (const module of this.modules) {
      module.onRespawn();
    }
  }
  onUpdate(delta) {
    for (const module of this.modules) {
      module.onUpdate(delta);
    }
  }
  onPreTick(tickIndex) {
    for (const module of this.modules) {
      module.onPreTick(tickIndex);
    }
  }
  onTick(tickIndex, schedulableTick) {
    for (const module of this.modules) {
      module.onTick(tickIndex, schedulableTick);
    }
  }
  onPostTick(tickIndex) {
    for (const module of this.modules) {
      module.onPostTick(tickIndex);
    }
  }
  onKeydown(keyCode) {
    for (const module of this.modules) {
      module.onKeydown(keyCode);
    }
  }
  onKeyup(keyCode) {
    for (const module of this.modules) {
      module.onKeyup(keyCode);
    }
  }
  onPacketReceive(event) {
    for (const module of this.modules) {
      if (!event.isCanceled()) module.onPacketReceive(event);
    }
  }
  onPacketSend(event) {
    for (const module of this.modules) {
      if (!event.isCanceled()) module.onPacketSend(event);
    }
  }
  onRender(delta) {
    for (const module of this.modules) {
      module.onRender(delta);
    }
  }
  onActionRun(action) {
    for (const module of this.modules) {
      module.onActionRun(action);
    }
  }
  onPreBuildingHit(player, building, tickIndex, potentialBreak) {
    for (const module of this.modules) {
      module.onPreBuildingHit(player, building, tickIndex, potentialBreak);
    }
  }
  onBuildingBreak(building) {
    for (const module of this.modules) {
      module.onBuildingBreak(building);
    }
  }
  onPlayerUpdate(player) {
    for (const module of this.modules) {
      module.onPlayerUpdate(player);
    }
  }
  onProjectileEarlyDespawn(projectileItem, spawnPosition, direction) {
    for (const module of this.modules) {
      module.onProjectileEarlyDespawn(projectileItem, spawnPosition, direction);
    }
  }
  getModule(clazz) {
    for (const module of this.modules) {
      if (module instanceof clazz) return module;
    }
  }
}
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
class Module {
  constructor() {
    this.toggled = true;
  }
  onRespawn() {}
  onUpdate(delta) {}
  onPreTick(tickIndex) {}
  onTick(tickIndex, schedulableTick) {}
  onPostTick(tickIndex) {}
  onKeydown(keyCode) {}
  onKeyup(keyCode) {}
  onPacketReceive(event) {}
  onPacketSend(event) {}
  onRender(delta) {}
  onActionRun(action) {}
  onPreBuildingHit(player, building, tickIndex, potentialBreak) {}
  onBuildingBreak(building) {}
  onPlayerUpdate(player) {}
  onProjectileEarlyDespawn(projectileItem, spawnPosition, direction) {}
  isToggled() {
    return this.toggled;
  }
}

/***/ }),

/***/ "./frontend/src/features/modules/building/AntiTrap.ts":
/*!************************************************************!*\
  !*** ./frontend/src/features/modules/building/AntiTrap.ts ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AntiTrap)
/* harmony export */ });
/* harmony import */ var _core_ActionType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/moomoo/hats */ "./frontend/src/data/moomoo/hats.ts");
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _data_type_Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../data/type/Player */ "./frontend/src/data/type/Player.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_5__]);
_main__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];











class AntiTrap extends _Module__WEBPACK_IMPORTED_MODULE_10__["default"] {
  constructor() {
    super();
    this.isFirstHit = false;
    this.currentTrap = null;
    this.willTrapBreakNextTick = false;
    this.aimPacketsBlocker = -1;
    this.lastWeapon = null;
  }

  /*activate(tickIndex = core.tickEngine.getNextPredictableTick(), isNotSync?: boolean) {
      const myPlayer = core.playerManager.myPlayer;
      if (!myPlayer.alive) return;
        if (!this.currentTrap) {
          this.currentTrap = myPlayer.state.data.trap!;
          const antiAngle = MathUtil.getDirection(this.currentTrap.position, myPlayer.serverPos);
          const item = items.list[myPlayer.inventory.items[2]];
            const splitPlacement = core.objectManager.tryToSplitPlacement([myPlayer.serverPos, myPlayer.scale], antiAngle, item);
          if (splitPlacement !== null) {
              core.interactionEngine.safePlacement(item, splitPlacement[0]);
              core.interactionEngine.safePlacement(item, splitPlacement[1]);
          } else {
              core.interactionEngine.safePlacement(item, antiAngle);
          }
      }
        if (this.packetBlockerId === undefined) this.packetBlockerId = core.createPacketBlock(PacketType.SET_ANGLE);
            let weapon = <MeleeWeapon> myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.BUILDING_BREAK);
          const primary = <MeleeWeapon> myPlayer.inventory.getWeapon(WeaponSlot.PRIMARY);
          const reload = myPlayer.inventory.reloads[weapon!.id];
            if (tickIndex === myPlayer.nextAttack - 1 || reload <= core.tickEngine.timeToNextTick) {
              if (weapon !== primary && myPlayer.inventory.reloads[primary!.id] <= core.tickEngine.timeToNextTick && this.currentTrap.health > 0 && this.currentTrap.health - primary.stats.dmg * primary.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? hats.find(x => x.id === 40)!.bDmg! : 1) <= 0) {
                  weapon = primary;
              }
              const trapAngle = MathUtil.getDirection(myPlayer.serverPos, this.currentTrap!.position);
              if (!isNotSync && myPlayer.ownedHats.includes(40)) core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [40]);
              core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, tickIndex, [weapon?.id]);
              if (!myPlayer.isAttacking || core.lastActionState.attack === 0 || MathUtil.getAngleDist(core.lastActionState.aim, trapAngle) > Number.EPSILON) core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTITRAP, tickIndex, [1, trapAngle]);
              //core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [40]);
          } else {
              // else reload the weapon
              core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, tickIndex, [weapon?.id]);
              core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [20]);
          }
          this.wasBreaking = true;
  }
    deactivate() {
      core.cleanActions(ActionPriority.ANTITRAP);
      this.stopAttackActionId = core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTITRAP, core.tickEngine.getNextPredictableTick(), [+core.mstate.mouseHeld]);
      this.currentTrap = null;
      core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, core.tickEngine.getNextPredictableTick(), [core.playerManager.myPlayer.inventory.getWeapon(WeaponSlot.PRIMARY)!.id]);
      if (this.packetBlockerId !== undefined) {
          core.removePacketBlock(PacketType.SET_ANGLE, this.packetBlockerId);
          this.packetBlockerId = undefined;
      }
  }
    onActionRun(action: Action): void {
      if (action.id === this.stopAttackActionId) {
          this.stopAttackActionId = undefined;
          this.wasBreaking = false;
      }
  }*/

  onTick(tickIndex) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_5__.core.playerManager.myPlayer;
    if (!myPlayer.alive) return;
    if (myPlayer.state.isTrapped && this.trap === null) {
      this.initializeTrap(myPlayer.state.data.trap);
    } else if (!myPlayer.state.isTrapped && this.trap !== null || this.willTrapBreakNextTick) {
      this.setTrapBroken();
    } else if (this.currentTrap !== null) {
      if (this.isFirstHit) this.isFirstHit = false;
      const tankGear = _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__["default"].find(x => x.id === 40);
      const angle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].getDirection(myPlayer.serverPos, this.currentTrap.position);
      const primaryWeapon = myPlayer.inventory.getWeapon(_data_type_Weapon__WEBPACK_IMPORTED_MODULE_4__.WeaponSlot.PRIMARY);
      let bestWeapon = myPlayer.inventory.findBestWeapon(_data_type_Player__WEBPACK_IMPORTED_MODULE_3__.Inventory.WeaponFinders.BUILDING_BREAK);
      let usePrimaryAttack = false;
      if (!this.willTrapBreakNextTick && this.currentTrap.health > 0 && myPlayer.inventory.reloads[primaryWeapon.id] === 0 && this.currentTrap.health <= primaryWeapon.stats.dmg * primaryWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg : 1)) {
        bestWeapon = primaryWeapon;
        usePrimaryAttack = true;
        this.willTrapBreakNextTick = true;
        //console.log("hitting with retarded wep!!");
      }

      if (myPlayer.nextAttack === tickIndex - 1 || myPlayer.inventory.reloads[bestWeapon.id] <= _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.timeToNextTick || usePrimaryAttack) {
        _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [40]);
        _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
        _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [1, angle]);
        _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [0, null]);
        _main__WEBPACK_IMPORTED_MODULE_5__.core.lockBundleDirection(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP, angle);
        //core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex + 1, [0, null]);

        //console.log("anti trap check", this.currentTrap!.health, bestWeapon.stats.dmg * bestWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1))
        if (this.currentTrap.health <= bestWeapon.stats.dmg * bestWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg : 1)) {
          this.willTrapBreakNextTick = true;
        }
      } else {
        _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
        _main__WEBPACK_IMPORTED_MODULE_5__.core.unlockBundleDirection(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP);
      }

      /*if (myPlayer.nextAttack === tickIndex - 1) {
          core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
          core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex, [1, angle]);
      }*/
    }
  }

  initializeTrap(trap) {
    this.currentTrap = trap;
    this.willTrapBreakNextTick = false;
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_5__.core.playerManager.myPlayer;
    this.lastWeapon = myPlayer.inventory.heldItem.id;
    const tankGear = _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__["default"].find(x => x.id === 40);
    const angle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].getDirection(myPlayer.serverPos, trap.position);
    const antiAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].getDirection(this.currentTrap.position, myPlayer.serverPos);
    const cartAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].polarToCartesian(antiAngle);
    const spikeItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_2__.items.list[myPlayer.inventory.items[2]];
    const arcs = _main__WEBPACK_IMPORTED_MODULE_5__.core.objectManager.findPlacementArcs([myPlayer.serverPos, myPlayer.scale], spikeItem);
    this.isFirstHit = true;
    if (arcs.length > 0) {
      const closestAllowArc = arcs.sort((a, b) => Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].getAngleDist(a[0], antiAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].getAngleDist(a[1], antiAngle)) - Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].getAngleDist(b[0], antiAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].getAngleDist(b[1], antiAngle)))[0];
      const [arcStart, arcEnd] = [_util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].polarToCartesian(closestAllowArc[0]), _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].polarToCartesian(closestAllowArc[1])];
      if (cartAngle > arcStart && cartAngle < arcEnd) {
        _main__WEBPACK_IMPORTED_MODULE_5__.core.interactionEngine.safePlacement(spikeItem, antiAngle);
      } else {
        _main__WEBPACK_IMPORTED_MODULE_5__.core.interactionEngine.safePlacement(spikeItem, _util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].cartesianToPolar(_util_MathUtil__WEBPACK_IMPORTED_MODULE_9__["default"].middleOfCartesianArc([arcStart, arcEnd])));
      }
    }
    const bestWeapon = myPlayer.inventory.findBestWeapon(_data_type_Player__WEBPACK_IMPORTED_MODULE_3__.Inventory.WeaponFinders.BUILDING_BREAK);
    const currentWeapon = myPlayer.inventory.heldItem;
    const lastHeldItemId = currentWeapon.id;

    //if (this.aimPacketsBlocker === -1) this.aimPacketsBlocker = core.createPacketBlock(PacketType.SET_ANGLE);

    if (myPlayer.inventory.reloads[bestWeapon.id] <= (currentWeapon === bestWeapon ? _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.timeToNextTick : 0)) {
      const ti = _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.tickIndex + 1;
      const pt = _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.tickIndex + _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.getPingTicks();
      if (_main__WEBPACK_IMPORTED_MODULE_5__.core.isHighestPriority(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, ti)) {
        if (_main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.ping < _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.timeToNextTick) {
          if (!(myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_4__.Weapon) || bestWeapon.id !== myPlayer.inventory.heldItem.id) _socket_Connection__WEBPACK_IMPORTED_MODULE_6__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_7__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_8__.PacketType.SELECT_ITEM, [bestWeapon.id, true]));
          if (myPlayer.ownedHats.includes(40) && _main__WEBPACK_IMPORTED_MODULE_5__.core.lastActionState.hat !== 40) _socket_Connection__WEBPACK_IMPORTED_MODULE_6__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_7__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_8__.PacketType.BUY_AND_EQUIP, [0, 40, 0]));
          if (!myPlayer.isAttacking) _socket_Connection__WEBPACK_IMPORTED_MODULE_6__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_7__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_8__.PacketType.ATTACK, [1, angle]));
          _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleBlockerAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP, pt);
          _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleBlockerAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP, pt);
        } else {
          if (!(myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_4__.Weapon) || bestWeapon.id !== myPlayer.inventory.heldItem.id) _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP, pt, [bestWeapon.id, true]);
          if (myPlayer.ownedHats.includes(40) && _main__WEBPACK_IMPORTED_MODULE_5__.core.lastActionState.hat !== 40) _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP, pt, [40]);
          if (!myPlayer.isAttacking) _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP, pt, [1, angle]);
        }
        _main__WEBPACK_IMPORTED_MODULE_5__.core.lockBundleDirection(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP, angle);
      }
    }
  }
  setTrapBroken() {
    if (this.currentTrap === null) return;
    this.currentTrap = null;
    this.willTrapBreakNextTick = false;

    //if (this.aimPacketsBlocker > -1) core.removePacketBlock(PacketType.SET_ANGLE, this.aimPacketsBlocker);

    _main__WEBPACK_IMPORTED_MODULE_5__.core.unlockBundleDirection(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.ANTITRAP);
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_5__.core.playerManager.myPlayer;
    if (!_main__WEBPACK_IMPORTED_MODULE_5__.core.mstate.mouseHeld) _socket_Connection__WEBPACK_IMPORTED_MODULE_6__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_7__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_8__.PacketType.ATTACK, [0, null]));
    if (_main__WEBPACK_IMPORTED_MODULE_5__.core.isHighestPriority(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOBREAK, _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.tickIndex + 1)) {
      if (this.lastWeapon && (!(myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_4__.Weapon) || this.lastWeapon !== myPlayer.inventory.heldItem.id)) _socket_Connection__WEBPACK_IMPORTED_MODULE_6__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_7__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_8__.PacketType.SELECT_ITEM, [this.lastWeapon, true]));
    }
  }
  get isBreaking() {
    return this.currentTrap != null;
  }
  get trap() {
    return this.currentTrap;
  }
  get getterIsFirstHit() {
    return this.currentTrap !== null && this.isFirstHit;
  }
}
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
/* harmony import */ var _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/moomoo/hats */ "./frontend/src/data/moomoo/hats.ts");
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_3__]);
_main__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






class AutoReplace extends _Module__WEBPACK_IMPORTED_MODULE_5__["default"] {
  constructor() {
    super();
    this.shouldReplace = [];
  }
  replace(building, forceSingle) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
    const buildingAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDirection(myPlayer.serverPos, building.position);
    const spikeItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_1__.items.list[myPlayer.inventory.items[2]];
    const trapItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_1__.items.list[15];

    // find target player and item to place
    const enemyPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.getVisibleEnemies().sort((a, b) => _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(a.serverPos, building.position) - _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(b.serverPos, building.position))[0];
    if (enemyPlayer && _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(enemyPlayer.serverPos, myPlayer.serverPos) <= 850 && _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(myPlayer.serverPos, building.position) <= building.getScale() + myPlayer.scale + 220) {
      const playerToBuilding = _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(enemyPlayer.serverPos.clone().add(enemyPlayer.velocity), building.position);
      const item = playerToBuilding < enemyPlayer.scale + spikeItem.scale * 1.03 + myPlayer.scale + (spikeItem.placeOffset ?? 0) ? spikeItem : trapItem;

      // calculate angle
      const arcs = _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.findPlacementArcs([myPlayer.serverPos, myPlayer.scale], item, [building]);
      if (arcs.length === 0) return;
      const closestAllowArc = arcs.sort((a, b) => Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getAngleDist(a[0], buildingAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getAngleDist(a[1], buildingAngle)) - Math.min(_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getAngleDist(b[0], buildingAngle), _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getAngleDist(b[1], buildingAngle)))[0];
      const splitTangent = _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.findSplitTangent(myPlayer.scale, item) + 0.25;
      const start = _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].polarToCartesian(closestAllowArc[0]);
      const end = _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].polarToCartesian(closestAllowArc[1]);
      const arcSpan = start > end ? end + Math.PI * 2 - start : end - start;
      const buildingCount = Math.min(Math.floor((arcSpan + splitTangent) / splitTangent), 3);
      const enemyAngleCart = _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].polarToCartesian(_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDirection(myPlayer.serverPos, enemyPlayer.serverPos));
      if (buildingCount === 1 || start + end === Math.PI * 2 || forceSingle) {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.interactionEngine.safePlacementIgnoring(item, enemyAngleCart >= start && enemyAngleCart <= end ? _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].cartesianToPolar(enemyAngleCart) : buildingAngle, building);
      } else {
        const middle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].middleOfCartesianArc([start, end]);
        if (buildingCount % 2 === 0) {
          for (let i = 0; i < buildingCount / 2; i++) {
            _main__WEBPACK_IMPORTED_MODULE_3__.core.interactionEngine.safePlacementIgnoring(item, _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].cartesianToPolar(_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].clampCartesian(middle + splitTangent / 2 + splitTangent * i)), building);
            _main__WEBPACK_IMPORTED_MODULE_3__.core.interactionEngine.safePlacementIgnoring(item, _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].cartesianToPolar(_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].clampCartesian(middle - splitTangent / 2 - splitTangent * i)), building);
          }
        } else {
          _main__WEBPACK_IMPORTED_MODULE_3__.core.interactionEngine.safePlacementIgnoring(item, _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].cartesianToPolar(middle), building);
          for (let i = 0; i < (buildingCount - 1) / 2; i++) {
            _main__WEBPACK_IMPORTED_MODULE_3__.core.interactionEngine.safePlacementIgnoring(item, _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].cartesianToPolar(_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].clampCartesian(middle + splitTangent * (i + 1))), building);
            _main__WEBPACK_IMPORTED_MODULE_3__.core.interactionEngine.safePlacementIgnoring(item, _util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].cartesianToPolar(_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].clampCartesian(middle - splitTangent * (i + 1))), building);
          }
        }
      }
    }
  }
  onPostTick(tickIndex) {
    let i = this.shouldReplace.length;
    while (i-- > 0) {
      const [building, timestamp, tick] = this.shouldReplace[i];
      if (tick + 1 === tickIndex) {
        this.replace(building, false);
        this.shouldReplace.splice(i, 1);
      }
    }
  }
  onPlayerUpdate(player) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
    const tickIndex = _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.tickIndex + 1;

    // check for players which weapon will attack at the next tick
    //const players = core.playerManager.getNearby(myPlayer.serverPos, 800, false);

    if (player.nextAttack === tickIndex) {
      const weapon = player.inventory.weaponSelected;
      const hatBuildingDmgBoost = _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_0__["default"].find(x => x.id === player.skinIndex)?.bDmg ?? 1;
      const grids = _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.getGridArrays(player.serverPos.x + player.velocity.x, player.serverPos.y + player.velocity.y, weapon.stats.range);
      for (let i = 0; i < grids.length; i++) {
        const object = grids[i];
        if (object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__.PlayerBuilding && object.meta.wasPlacementSighted && object.health - weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost <= 0) {
          if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(object.position, player.serverPos.clone().add(player.velocity)) - object.scale <= weapon.stats.range + player.scale) {
            this.shouldReplace.push([object, Date.now() + _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.timeToNextTick - _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.ping, tickIndex]);
            _main__WEBPACK_IMPORTED_MODULE_3__.core.moduleManager.onPreBuildingHit(player, object, tickIndex, !object.meta.wasPlacementSighted || object.health - weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost <= 0);
          }
        }
      }
    }
  }

  /*onPreTick(tickIndex: number): void {
      const myPlayer = core.playerManager.myPlayer;
      const spikeItem = items.list[myPlayer.inventory.items[2]];
      const trapItem = items.list[15];
        // check for players which weapon will attack at the next tick
      const players = core.playerManager.getNearby(myPlayer.serverPos, 800, false);
        for (let i = 0; i < players.length; i++) {
          const player = players[i];
          if (player.nextAttack === tickIndex) {
              const weapon = <MeleeWeapon> player.inventory.weaponSelected;
              const hatBuildingDmgBoost = hats.find(x => x.id === player.skinIndex)?.bDmg ?? 1;
              const grids = core.objectManager.getGridArrays(player.serverPos.x + player.velocity.x, player.serverPos.y + player.velocity.y, weapon.stats.range);
                for (let i = 0; i < grids.length; i++) {
                  const object = grids[i];
                  if (object instanceof PlayerBuilding && object.meta.wasPlacementSighted && object.health - (weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost) <= 0) {
                      if (MathUtil.getDistance(object.position, player.serverPos.clone().add(player.velocity)) - object.scale <= weapon.stats.range + player.scale) {
                          this.shouldReplace.push([object, Date.now() + core.tickEngine.timeToNextTick - core.tickEngine.ping, tickIndex]);
                          core.moduleManager.onPreBuildingHit(player, object, tickIndex, !object.meta.wasPlacementSighted || (object.health - (weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost) <= 0));
                      }
                  }
              }
          }
      }
  }*/

  onBuildingBreak(building) {
    if (!building.meta.wasPlacementSighted) {
      this.replace(building, true);
    } else {
      this.replace(building, false);
    }
  }
}
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



var PlacerType;
(function (PlacerType) {
  PlacerType[PlacerType["SPIKE"] = 0] = "SPIKE";
  PlacerType[PlacerType["TRAP"] = 1] = "TRAP";
  PlacerType[PlacerType["WINDMILL"] = 2] = "WINDMILL";
})(PlacerType || (PlacerType = {}));
class Placer {
  constructor(type) {
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
  setStatus(active) {
    this.active = active;
  }
  isActive() {
    return this.active;
  }
  run(tickIndex) {
    const item = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[_main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.inventory.items[this.placingObjectGroup]];
    if (!item) return;
    _main__WEBPACK_IMPORTED_MODULE_1__.core.interactionEngine.safePlacement(item, _main__WEBPACK_IMPORTED_MODULE_1__.core.mouseAngle);
  }
}
class ItemPlacer extends _Module__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor() {
    super();
    this.placers = new Map();
    this.activePlacer = null;
    this.placers.set(86, new Placer(PlacerType.SPIKE));
    this.placers.set(70, new Placer(PlacerType.TRAP));
    this.placers.set(78, new Placer(PlacerType.WINDMILL));
  }
  onUpdate(delta) {
    if (this.activePlacer && _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.alive) this.activePlacer.run(0);
  }
  onKeydown(keyCode) {
    const placer = this.placers.get(keyCode);
    placer?.setStatus(true);
    if (!this.activePlacer && placer) {
      this.activePlacer = placer;
    }
  }
  onKeyup(keyCode) {
    this.placers.get(keyCode)?.setStatus(false);
    this.activePlacer = null;
    for (const placer of this.placers.values()) {
      if (placer.isActive()) {
        this.activePlacer = placer;
        break;
      }
    }
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/combat/AntiBull.ts":
/*!**********************************************************!*\
  !*** ./frontend/src/features/modules/combat/AntiBull.ts ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AntiBull)
/* harmony export */ });
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/moomoo/hats */ "./frontend/src/data/moomoo/hats.ts");
/* harmony import */ var _data_moomoo_accessories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../data/moomoo/accessories */ "./frontend/src/data/moomoo/accessories.ts");
/* harmony import */ var _data_type_Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../data/type/Player */ "./frontend/src/data/type/Player.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _core_ActionType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_5__]);
_main__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];












class AntiBull extends _Module__WEBPACK_IMPORTED_MODULE_8__["default"] {
  constructor() {
    super();
  }
  onPlayerUpdate(player) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_5__.core.playerManager.myPlayer;
    if (player === myPlayer || _main__WEBPACK_IMPORTED_MODULE_5__.core.playerManager.checkTeam(player.sid)) return;
    const hat = _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__["default"].find(x => x.id === player.skinIndex);
    const tail = _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__["default"].find(x => x.id === player.tailIndex);
    const weapon = player.inventory.weaponSelected;
    const hatReflectionMultiplier = myPlayer.skinIndex === 11 ? _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__["default"][37].dmg : 0;
    const tailReflectionMultiplier = myPlayer.tailIndex === 21 ? _data_moomoo_accessories__WEBPACK_IMPORTED_MODULE_2__["default"][20].dmg : 0;
    const incommingDamage = weapon.stats.dmg * (hat?.dmgMultO ?? 1) * (tail?.dmgMultO ?? 1);
    const reflectedDamage = incommingDamage * hatReflectionMultiplier + incommingDamage * tailReflectionMultiplier;
    const myHatMultiplier = myPlayer.ownedHats.includes(7) ? _data_moomoo_hats__WEBPACK_IMPORTED_MODULE_1__["default"][30].dmgMultO : 1;
    const myWeapon = myPlayer.inventory.findBestWeapon(_data_type_Player__WEBPACK_IMPORTED_MODULE_3__.Inventory.WeaponFinders.DAMAGE);
    const straightAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_7__["default"].getDirection(player.serverPos, myPlayer.serverPos);
    const angleToEnemy = _util_MathUtil__WEBPACK_IMPORTED_MODULE_7__["default"].getDirection(myPlayer.serverPos, player.serverPos);
    return;
    // attack back if enemy attacked with us having spike gear on
    if (weapon instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_4__.MeleeWeapon && player.hasAttackedThisTick && _util_MathUtil__WEBPACK_IMPORTED_MODULE_7__["default"].getDistance(myPlayer.serverPos.clone().add(myPlayer.velocity), player.serverPos.clone().add(player.velocity)) <= myWeapon.stats.range + 35 * 2 && myPlayer.inventory.reloads[myWeapon.id] <= (myPlayer.inventory.heldItem === myWeapon ? _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.timeToNextTick : 0)) {
      if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_7__["default"].getAngleDist(straightAngle, player.serverDir) <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].gatherAngle) {
        if (reflectedDamage + myWeapon.stats.dmg * myHatMultiplier >= 100) {
          const attackTick = _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.tickIndex - 1;
          if (_main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.isTickPredictable(attackTick)) {
            if (myPlayer.inventory.heldItem !== myWeapon) _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick, [myWeapon.id, true]);
            if (myPlayer.ownedHats.includes(7)) _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick, [7]);
            _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionType.TAIL, _core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick, [0]);
            _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick, [1, angleToEnemy]);
          } else if (_main__WEBPACK_IMPORTED_MODULE_5__.core.isHighestPriority(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick)) {
            if (myPlayer.inventory.heldItem !== myWeapon) _socket_Connection__WEBPACK_IMPORTED_MODULE_9__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_10__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_11__.PacketType.SELECT_ITEM, [myWeapon.id, true]));
            if (myPlayer.ownedHats.includes(7)) _socket_Connection__WEBPACK_IMPORTED_MODULE_9__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_10__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_11__.PacketType.BUY_AND_EQUIP, [0, 7, 0]));
            _socket_Connection__WEBPACK_IMPORTED_MODULE_9__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_10__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_11__.PacketType.BUY_AND_EQUIP, [0, 0, 1]));
            _socket_Connection__WEBPACK_IMPORTED_MODULE_9__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_10__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_11__.PacketType.ATTACK, [1, angleToEnemy]));
          }
        }
      }
    }

    // equip spike gear + cx if player will attack next tick
    if (player.nextAttack - 1 === _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.tickIndex && _util_MathUtil__WEBPACK_IMPORTED_MODULE_7__["default"].getDistance(myPlayer.serverPos.clone().add(myPlayer.velocity), player.serverPos.clone().add(player.velocity)) <= weapon.stats.range + 35 * 2 && _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.tickIn(myPlayer.inventory.reloads[myWeapon.id] - (myPlayer.inventory.heldItem === myWeapon ? _main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.timeToNextTick : 0)) <= player.nextAttack) {
      const attackTick = player.nextAttack;
      if (_main__WEBPACK_IMPORTED_MODULE_5__.core.tickEngine.isTickPredictable(attackTick)) {
        if (myPlayer.ownedHats.includes(11)) _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick, [11]);
        if (myPlayer.ownedTails.includes(21)) _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionType.TAIL, _core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick, [21]);
        _main__WEBPACK_IMPORTED_MODULE_5__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick, [0, null]);
      } else if (_main__WEBPACK_IMPORTED_MODULE_5__.core.isHighestPriority(_core_ActionType__WEBPACK_IMPORTED_MODULE_6__.ActionPriority.ANTIBULL, attackTick)) {
        if (myPlayer.ownedHats.includes(11)) _socket_Connection__WEBPACK_IMPORTED_MODULE_9__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_10__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_11__.PacketType.BUY_AND_EQUIP, [0, 11, 0]));
        if (myPlayer.ownedTails.includes(21)) _socket_Connection__WEBPACK_IMPORTED_MODULE_9__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_10__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_11__.PacketType.BUY_AND_EQUIP, [0, 21, 1]));
      }
    }
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/combat/AntiInsta.ts":
/*!***********************************************************!*\
  !*** ./frontend/src/features/modules/combat/AntiInsta.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AntiInsta)
/* harmony export */ });
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");




function wasdMovementPushVC(player, hat, tail, myPlayer) {
  const speed = _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].playerSpeed * (hat?.spdMult ?? 1) * (tail?.spdMult ?? 1) * _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_1__.TickEngine.TICK_DELTA;
  const straightAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection(player.serverPos, myPlayer.serverPos);
  return player.serverPos.clone().directionMove(straightAngle, speed);
}
class AntiInsta extends _Module__WEBPACK_IMPORTED_MODULE_3__["default"] {}

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
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_1__]);
_main__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



class Autoheal extends _Module__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor() {
    super();
  }
  onUpdate(delta) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer;
    if (myPlayer.alive && myPlayer.health < 100 && myPlayer.shame.isSafeHeal(_main__WEBPACK_IMPORTED_MODULE_1__.core.tickEngine.ping, _main__WEBPACK_IMPORTED_MODULE_1__.core.tickEngine.pingStd)) {
      const foodType = _main__WEBPACK_IMPORTED_MODULE_1__.core.playerManager.myPlayer.inventory.items[0];
      const healsUp = foodType == 0 ? 20 : 40;
      const times = Math.ceil((myPlayer.maxHealth - myPlayer.health) / healsUp);
      for (let i = 0; i < times; i++) {
        _main__WEBPACK_IMPORTED_MODULE_1__.core.interactionEngine.vanillaUseFoodItem(_data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[foodType], i === times - 1);
      }
    }
  }
  onPacketReceive(event) {
    /*const packet = event.getPacket();
      if (packet.type === PacketType.HEALTH_UPDATE) {
        const [sid, health] = packet.data;
        if (sid === core.playerManager.myPlayer.sid) {
           // if (health < this.lastHealth) this.damageTime = Date.now() - core.tickEngine.ping;
            
        }
    }*/
  }

  // ...
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/combat/BullTick.ts":
/*!**********************************************************!*\
  !*** ./frontend/src/features/modules/combat/BullTick.ts ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BullTick)
/* harmony export */ });
/* harmony import */ var _core_ActionType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../util/engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
/* harmony import */ var _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../util/PredictionUtil */ "./frontend/src/util/PredictionUtil.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_2__, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_8__]);
([_main__WEBPACK_IMPORTED_MODULE_2__, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









class BullTick extends _Module__WEBPACK_IMPORTED_MODULE_7__["default"] {
  constructor() {
    super();
    this.canMidfightBulltick = false;
    this.mfbFlags = 0;
    this.isBulltickAvailable = false;
    this.canBulltick = false;
  }
  onPlayerUpdate(player) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer;
    const weapon = player.inventory.weaponSelected;
    const isSafe = player.inventory.remainingReloadTime(_data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__.WeaponSlot.PRIMARY) > myPlayer.shame.whenSafeHeal(_main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.ping) + _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_6__.TickEngine.TICK_DELTA || _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_8__["default"].futureDistance(myPlayer, player) > weapon.stats.range;

    // TODO: implement DoT tracker to know when will we get healed from bull
    const willGetAttacked = _main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.getFirstSchedulableTick() - player.nextAttack <= _main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.toTicks(myPlayer.shame.whenSafeHeal(_main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.ping));
    if (willGetAttacked || !isSafe) this.mfbFlags++;
  }
  onTick(tickIndex, schedulableTick) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.myPlayer;
    this.canMidfightBulltick = this.mfbFlags === 0;
    this.mfbFlags = 0;
    this.isBulltickAvailable = myPlayer.alive && myPlayer.health >= 100 && myPlayer.ownedHats.includes(7);
    this.canBulltick = this.isBulltickAvailable && myPlayer.shame.points > 0 && (_main__WEBPACK_IMPORTED_MODULE_2__.core.playerManager.isEnemyInRadius(600) ? this.canMidfightBulltick && myPlayer.shame.points >= 3 : true);
    if (this.canBulltick) {
      _main__WEBPACK_IMPORTED_MODULE_2__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.BULLTICK, schedulableTick, [7]);
      _socket_Connection__WEBPACK_IMPORTED_MODULE_3__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_4__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_5__.PacketType.CHAT, ["bt,s=" + myPlayer.shame.points]));
    }
    this.canMidfightBulltick = false;
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/combat/SpikeSync.ts":
/*!***********************************************************!*\
  !*** ./frontend/src/features/modules/combat/SpikeSync.ts ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpikeSync)
/* harmony export */ });
/* harmony import */ var _core_ActionType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/ActionType */ "./frontend/src/core/ActionType.ts");
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _data_type_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../data/type/Player */ "./frontend/src/data/type/Player.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../util/engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../util/PredictionUtil */ "./frontend/src/util/PredictionUtil.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_3__, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__]);
([_main__WEBPACK_IMPORTED_MODULE_3__, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









class SpikeSync extends _Module__WEBPACK_IMPORTED_MODULE_8__["default"] {
  constructor() {
    super();
    this.hasTriggered = false;
    this.debugColPositions = [];
    this.debugDeathPositions = [];
    this.debugUnreachablePositions = [];
  }
  onRespawn() {
    this.hasTriggered = false;
    this.debugColPositions = [];
    this.debugDeathPositions = [];
    this.debugUnreachablePositions = [];
  }
  onTick(tickIndex, schedulableTick) {
    const players = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.getVisibleEnemies();
    this.debugColPositions = [];
    this.debugDeathPositions = [];
    this.debugUnreachablePositions = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      this.checkPlayer(player, tickIndex, schedulableTick);
    }
  }
  checkPlayer(player, tickIndex, schedulableTick) {
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
    const checkTick = schedulableTick + 1;
    if (player === myPlayer || _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.checkTeam(player.sid) || player.state.isTrapped) return;
    const position = _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__["default"].futurePosition(player, checkTick);
    const straightAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDirection(_util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__["default"].futurePosition(myPlayer, checkTick), position);
    const hat = player.hatTracker.currentHat;
    const tail = player.hatTracker.currentTail;
    const bestWeapon = myPlayer.inventory.findBestWeapon(_data_type_Player__WEBPACK_IMPORTED_MODULE_2__.Inventory.WeaponFinders.DAMAGE);
    if (myPlayer.inventory.reloads[bestWeapon.id] > _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.timeToNextTick) return;
    const damageReduction = hat?.dmgMult ?? 1; /* uncomment if tails get damage reduction stat in future updates * (tail?.dmgMult ?? 1);*/
    const damageMultiplication = myPlayer.ownedHats.includes(7) ? 1.5 : 1;
    const outputDamage = bestWeapon.stats.dmg * damageMultiplication * damageReduction;
    const outputKnockbackStrength = (0.3 * 1 + bestWeapon.stats.knockback) * _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_5__.TickEngine.TICK_DELTA;
    const knockbackPos = position.clone().directionMove(straightAngle, outputKnockbackStrength);
    const buildings = _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.getGridArrays(position.x, position.y, player.scale + outputKnockbackStrength);
    let buildingDmg = 0;
    const playerDist = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(position, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__["default"].futurePosition(myPlayer, checkTick));
    for (let i = 0; i < buildings.length; i++) {
      const building = buildings[i];
      if (!(building instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.PlayerBuilding) || _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.checkTeam(building.owner.sid) || building.stats.dmg === undefined) continue;
      const objectMinDist = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(building.position, position);
      const objectMaxDist = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(building.position, knockbackPos);

      // for rendering debug hitbox
      //pred.set(position.clone().directionMove(straightAngle, outputKnockbackStrength));

      if (objectMinDist <= player.scale + building.getScale() || objectMaxDist <= player.scale + building.getScale()) {
        buildingDmg += building.stats.dmg;
      }
    }
    const isCloseEnough = playerDist <= bestWeapon.stats.range + 35 * 2;
    const isDamageEnough = outputDamage + buildingDmg >= player.maxHealth;
    if (isDamageEnough) {
      if (isCloseEnough) {
        this.debugDeathPositions.push(knockbackPos);
      } else {
        this.debugUnreachablePositions.push(knockbackPos);
      }
    } else if (buildingDmg > 0) {
      this.debugColPositions.push(knockbackPos);
    }
    if (isCloseEnough && isDamageEnough) {
      //connection.send(new Packet(PacketType.CHAT, ["spike sync: " + player.name]));
      this.hasTriggered = true;
      //core.lockBundleDirection(ActionPriority.SPIKESYNC, straightAngle);
      if (myPlayer.inventory.heldItem !== bestWeapon) _main__WEBPACK_IMPORTED_MODULE_3__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.WEAPON, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.SPIKESYNC, schedulableTick, [bestWeapon.id, true]);
      if (myPlayer.ownedHats.includes(7)) _main__WEBPACK_IMPORTED_MODULE_3__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.SPIKESYNC, schedulableTick, [7]);
      console.log(straightAngle);
      _main__WEBPACK_IMPORTED_MODULE_3__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.TAIL, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.SPIKESYNC, schedulableTick, [0]);
      _main__WEBPACK_IMPORTED_MODULE_3__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.SPIKESYNC, schedulableTick, [1, straightAngle]);
      _main__WEBPACK_IMPORTED_MODULE_3__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.ATTACK, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.SPIKESYNC, schedulableTick, [0, null]);
    }
  }
  onPacketSend(event) {
    if (this.hasTriggered && !event.isBundle) {
      if (event.getPacket().type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.ATTACK && event.getPacket().data[0]) {
        this.hasTriggered = false;
        //core.unlockBundleDirection(ActionPriority.SPIKESYNC);
      }
    }
  }

  drawKnockbackPos(vector) {
    const vec = _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager?.mapToContext(_main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager.cameraPosition, vector);
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager?.context.moveTo(vec.x, vec.y);
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager?.context.beginPath();
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager?.context.arc(vec.x, vec.y, 35, 0, Math.PI * 2);
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager?.context.closePath();
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager.context.globalAlpha = 0.3;
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager?.context.fill();
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager.context.globalAlpha = 1;
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager?.context.stroke();
  }
  onRender(delta) {
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager.context.fillStyle = "#00e1ff";
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager.context.lineWidth = 3;
    for (let i = 0; i < this.debugColPositions.length; i++) {
      this.drawKnockbackPos(this.debugColPositions[i]);
    }
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager.context.fillStyle = "#ff0000";
    for (let i = 0; i < this.debugDeathPositions.length; i++) {
      this.drawKnockbackPos(this.debugDeathPositions[i]);
    }
    _main__WEBPACK_IMPORTED_MODULE_3__.core.renderManager.context.fillStyle = "#6e00ff";
    for (let i = 0; i < this.debugUnreachablePositions.length; i++) {
      this.drawKnockbackPos(this.debugUnreachablePositions[i]);
    }
  }
}
/*
if (predictionFix) {
            const [hat, tail] = this.getHat(true, true);
            console.log("fix", hat, tail);
            core.cancelScheduledAction(ActionType.HAT, ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
            core.cancelScheduledAction(ActionType.TAIL, ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
            core.runImmediateAction(ActionType.HAT, priority, [hat]);
            core.runImmediateAction(ActionType.TAIL, priority, [tail]);
        }

        core.scheduleAction(ActionType.HAT, priority, schedulableTick, [hat]);
        core.scheduleAction(ActionType.TAIL, priority, schedulableTick, [tail]);
        */
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/features/modules/misc/NoToxic.ts":
/*!*******************************************************!*\
  !*** ./frontend/src/features/modules/misc/NoToxic.ts ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoToxic)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_0__]);
_main__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



class NoToxic extends _Module__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor() {
    super();
  }
  onPacketReceive(event) {
    const packet = event.getPacket();
    if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CHAT && packet.data[0] !== _main__WEBPACK_IMPORTED_MODULE_0__.core.playerManager.myPlayer.sid && !_main__WEBPACK_IMPORTED_MODULE_0__.core.playerManager.checkTeam(packet.data[0])) {
      const message = packet.data[1];
      if (/\b[ei]+z+(?:[iy]+)?\b/i.test(message) // ez
      || /\b(u\s+suck|you\s+suck|so\s+bad|(?:ur)?(?:so|ur)\sbad|noob|loser)\b/i.test(message) // other
      ) {
        event.cancel();
        //event.setData([packet.data[0], this.createReplacement()]);
      }
    }
  }

  createReplacement() {
    return "me is retarded homo";
  }
}
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
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../main */ "./frontend/src/main.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../util/PredictionUtil */ "./frontend/src/util/PredictionUtil.ts");
/* harmony import */ var _building_AntiTrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../building/AntiTrap */ "./frontend/src/features/modules/building/AntiTrap.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Module */ "./frontend/src/features/modules/Module.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_4__, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__, _building_AntiTrap__WEBPACK_IMPORTED_MODULE_8__]);
([_main__WEBPACK_IMPORTED_MODULE_4__, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__, _building_AntiTrap__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










class AutoHat extends _Module__WEBPACK_IMPORTED_MODULE_9__["default"] {
  constructor() {
    super();
    this.skipNextTick = false;
    this.isPlacing = false;
    this.skipTick = -1;
    this.scheduledAutobull = false;
    this.bundleAttackState = false;
  }
  onRespawn() {
    this.skipNextTick = false;
    this.skipTick = -1;
    this.scheduledAutobull = false;
  }
  getHat(shouldAutobull, isTick) {
    const antiTrap = _main__WEBPACK_IMPORTED_MODULE_4__.core.moduleManager.getModule(_building_AntiTrap__WEBPACK_IMPORTED_MODULE_8__["default"]);
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_4__.core.playerManager.myPlayer;
    let hat = -1;
    let tail = -1;
    let isDefault = true;

    //console.log(tickIndex);

    if (shouldAutobull) {
      let playersHit = 0;
      let objectsHit = 0;
      const weapon = myPlayer.inventory.weaponSelected;
      const grids = _main__WEBPACK_IMPORTED_MODULE_4__.core.objectManager.getGridArrays(myPlayer.serverPos.x + myPlayer.velocity.x, myPlayer.serverPos.y + myPlayer.velocity.y, weapon.stats.range);
      for (let i = 0; i < grids.length; i++) {
        const object = grids[i];
        // use object.scale because .getScale returns collision box while .scale is hitbox
        if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(object.position, _util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__["default"].futurePosition(myPlayer)) - object.scale <= weapon.stats.range + myPlayer.scale) {
          const gatherAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].roundTo(_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDirection(_util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__["default"].futurePosition(myPlayer), object.position), 1);
          //const safeSpan = MathUtil.lineSpan(object.position.clone(), myPlayer.serverPos.clone(), myPlayer.serverPos.clone().add(myPlayer.velocity));

          if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getAngleDist(_main__WEBPACK_IMPORTED_MODULE_4__.core.mouseAngle, gatherAngle) <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].gatherAngle /* + Number.EPSILON*/) {
            if (object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__.PlayerBuilding) {
              objectsHit++;
            }
          }
        }
      }
      const players = _main__WEBPACK_IMPORTED_MODULE_4__.core.playerManager.getVisibleEnemies();
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (_util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__["default"].futureDistance(myPlayer, player) - player.scale <= weapon.stats.range + myPlayer.scale) {
          const gatherAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].roundTo(_util_PredictionUtil__WEBPACK_IMPORTED_MODULE_7__["default"].futureDirection(myPlayer, player), 1);

          //console.log(MathUtil.getAngleDist(core.mouseAngle, gatherAngle), config.gatherAngle + Number.EPSILON);
          if (_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getAngleDist(_main__WEBPACK_IMPORTED_MODULE_4__.core.mouseAngle, gatherAngle) <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].gatherAngle /* + Number.EPSILON*/) {
            playersHit++;
          }
        }
      }
      if (weapon !== _data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__.Weapons.GREAT_HAMMER && playersHit > 0) {
        hat = 7;
        tail = 0;
        isDefault = false;
      } else if (antiTrap.isBreaking || objectsHit > 0) {
        //console.log("autohat: TANK");
        hat = 40;
        isDefault = false;
      }

      //hat = 7;
      //tail = 0;
      //console.log("autobull" );
    } /* else if (myPlayer.justStartedAttacking) {
         hat = 7;
         tail = 0;
      }*/

    // biome hats fallback

    if (!myPlayer.ownedHats.includes(hat)) {
      hat = myPlayer.serverPos.y <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].snowBiomeTop ? 15 : myPlayer.serverPos.y >= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].mapScale / 2 - _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].riverWidth / 2 && myPlayer.serverPos.y <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].mapScale / 2 + _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].riverWidth / 2 ? 31 : 12;
    }
    if (!myPlayer.ownedTails.includes(tail)) {
      tail = 11;
    }

    // fallback to booster hat if current hat is not owned
    if (!myPlayer.ownedHats.includes(hat)) {
      if (hat !== 12 && myPlayer.ownedHats.includes(12)) {
        hat = 12;
      } else {
        // complete fallback hat if booster hat is not owned
        hat = 51;
      }
    }
    return [hat, tail, isDefault];
  }
  onTick(tickIndex, schedulableTick) {
    /*if (this.skipNextTick) {
        console.log(">> SKIPPED TICK ", tickIndex);
        this.skipNextTick = false;
        return;
    }*/

    /*if (this.doAttackNextTick) {
        this.doAttackNextTick = false;
        this.doAttack();
    }*/

    if (schedulableTick < this.skipTick) return;
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_4__.core.playerManager.myPlayer;
    const pingTicks = _main__WEBPACK_IMPORTED_MODULE_4__.core.tickEngine.getPingTicks();
    const willAttack = !this.isPlacing && this.bundleAttackState && (myPlayer.isAutoAttacking || myPlayer.isAttacking) && myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__.MeleeWeapon;
    let shouldAutobull = willAttack && myPlayer.nextAttack - 1 === schedulableTick;
    if (shouldAutobull) this.scheduledAutobull = false;
    //this.hasAutobulled = false;

    let predictionFix = false;

    // this should theoretically only apply to daggers because they attack so quickly the prediction is already ahead of them so it wont exec
    if (myPlayer.nextAttack !== 0 && myPlayer.nextAttack <= schedulableTick && !this.scheduledAutobull && willAttack && !shouldAutobull) {
      if (tickIndex + pingTicks === myPlayer.nextAttack - 1) {
        predictionFix = true;
      }
    }
    if (shouldAutobull) this.scheduledAutobull = true;
    const [hat, tail, isDefault] = this.getHat(shouldAutobull, true);
    const priority = isDefault ? _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.BIOMEHAT : _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOHAT;
    if (predictionFix && _main__WEBPACK_IMPORTED_MODULE_4__.core.isHighestPriority(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOHAT, myPlayer.nextAttack - 1)) {
      const [hat, tail] = this.getHat(true, true);
      console.log("fix", hat, tail);
      _main__WEBPACK_IMPORTED_MODULE_4__.core.cancelScheduledAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
      _main__WEBPACK_IMPORTED_MODULE_4__.core.cancelScheduledAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.TAIL, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
      _main__WEBPACK_IMPORTED_MODULE_4__.core.runImmediateAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, priority, [hat]);
      _main__WEBPACK_IMPORTED_MODULE_4__.core.runImmediateAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.TAIL, priority, [tail]);
    }
    _main__WEBPACK_IMPORTED_MODULE_4__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, priority, schedulableTick, [hat]);
    _main__WEBPACK_IMPORTED_MODULE_4__.core.scheduleAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.TAIL, priority, schedulableTick, [tail]);
  }
  onPacketSend(event) {
    if (event.isCanceled()) return;
    const packet = event.getPacket();
    const myPlayer = _main__WEBPACK_IMPORTED_MODULE_4__.core.playerManager.myPlayer;
    if (event.isBundle && packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_5__.PacketType.ATTACK) {
      this.bundleAttackState = packet.data[0] === 1;
      if (!this.isPlacing && myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__.MeleeWeapon) {
        if (packet.data[0] && myPlayer.justStartedAttacking) {
          const [hat, tail, isSwingBased] = this.getHat(true, false);
          const pingTicks = _main__WEBPACK_IMPORTED_MODULE_4__.core.tickEngine.getPingTicks();
          const attackTick = _main__WEBPACK_IMPORTED_MODULE_4__.core.tickEngine.getFirstSchedulableTick();

          //if (core.isHighestPriority(ActionPriority.AUTOHAT, core.tickEngine.tickIndex + core.tickEngine.getPingTicks())) {
          _main__WEBPACK_IMPORTED_MODULE_4__.core.runImmediateAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOHAT, [hat]);
          _main__WEBPACK_IMPORTED_MODULE_4__.core.runImmediateAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.TAIL, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.AUTOHAT, [tail]);
          //this.skipNextTick = true;
          _main__WEBPACK_IMPORTED_MODULE_4__.core.cancelScheduledAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.HAT, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.BIOMEHAT, attackTick - 1, true);
          _main__WEBPACK_IMPORTED_MODULE_4__.core.cancelScheduledAction(_core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionType.TAIL, _core_ActionType__WEBPACK_IMPORTED_MODULE_0__.ActionPriority.BIOMEHAT, attackTick - 1, true);
          this.skipTick = attackTick;
          //}
          //if (core.tickEngine.isTickPredictable(attackArriveTick)) {

          /*} else if (core.isHighestPriority(ActionPriority.BIOMEHAT, attackArriveTick)) {
              if (core.lastActionState.hat !== hat) {
                  connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, hat, 0]), true);
                  core.lastActionState.hat = hat;
              }
              if (core.lastActionState.tail !== tail) {
                  connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, tail, 1]), true);
                  core.lastActionState.tail = tail;
              }
              core.lastActionState.attack = 1;
              core.lastActionState.aim = packet.data[1];
              connection.send(new Packet(PacketType.ATTACK, [1, packet.data[1]]), true);
              this.skipNextTick = true;
              //console.log("REWRITING HIT SUYPER OMG SUCK MY DICK");
              event.cancel();
          }*/
        }
      }
    }
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./frontend/src/injector/BundleProxy.ts":
/*!**********************************************!*\
  !*** ./frontend/src/injector/BundleProxy.ts ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader/NVRLoader */ "./frontend/src/loader/NVRLoader.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _util_StringUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/StringUtil */ "./frontend/src/util/StringUtil.ts");
/* harmony import */ var _transformations_GetAttackDirTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transformations/GetAttackDirTransformer */ "./frontend/src/injector/transformations/GetAttackDirTransformer.ts");
/* harmony import */ var _transformations_IOClientTransformer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transformations/IOClientTransformer */ "./frontend/src/injector/transformations/IOClientTransformer.ts");
/* harmony import */ var _transformations_ObjectSpriteLoaderTransformer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transformations/ObjectSpriteLoaderTransformer */ "./frontend/src/injector/transformations/ObjectSpriteLoaderTransformer.ts");
/* harmony import */ var _transformations_SourceMappingTransformer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transformations/SourceMappingTransformer */ "./frontend/src/injector/transformations/SourceMappingTransformer.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__]);
_loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_1__["default"]("bundle-proxy");
let isCaptchaReady = false;
const transformations = [_transformations_GetAttackDirTransformer__WEBPACK_IMPORTED_MODULE_3__["default"], _transformations_IOClientTransformer__WEBPACK_IMPORTED_MODULE_4__["default"], _transformations_ObjectSpriteLoaderTransformer__WEBPACK_IMPORTED_MODULE_5__["default"], _transformations_SourceMappingTransformer__WEBPACK_IMPORTED_MODULE_6__["default"]];
let _promise;
function loadBundle(src, injectedApi, promise) {
  _promise = promise;
  window.captchaCallback = () => isCaptchaReady = true;
  fetch(src).then(res => {
    if (res.ok) return res.text();
    throw logger.error("failed to load bundle: " + res.status);
  }).then(code => processBundle(code, injectedApi));
}
function processBundle(code, injectedApi) {
  const transformers = transformations.map(transformer => Reflect.construct(transformer, []));
  for (const transformer of transformers) {
    code = transformer.transform(code);
  }
  evalBundle(code, injectedApi);
}
function evalBundle(code, injectedApi) {
  const hash = _util_StringUtil__WEBPACK_IMPORTED_MODULE_2__["default"].randomString(10);
  const vm = new Function(hash, "console", code.replace(/\[nvrapi\]/g, hash));
  const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_1__["default"](window.console, "bundle-vm-" + hash);
  const exec = async () => {
    vm.call( /*window*/vm.bind(window), injectedApi, logger);
    const old = [window.onload, window.captchaCallback];
    window.onload = window.captchaCallback = () => {};
    if (_promise) await _promise;
    setTimeout(() => (old[0] && old[0](new Event("load")), old[1] && old[1](), _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_0__["default"].stop()), 1);
  };
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
  loadBundle,
  clearPromise
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
class Transformation {}

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


const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_1__["default"](window.console, "nvr-api");
class API extends tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  constructor(core) {
    super();
    this.core = core;
    // @ts-ignore
    this.references = {};
    this.functions = {};
    this.values = new Map();
    Object.defineProperty(window, "nvrapi", {
      value: this
    });
  }
  registerFunction(name, value) {
    this.functions[name] = value;
    logger.log("registered function:", name, value);
    this.emit("functionReg", name, value);
  }
  registerReference(name, value, proxify = false) {
    this.references[name] = value;
    logger.log("registered reference:", name);
    return proxify ? this.createProxyFor(name, value) : value;
  }

  /**
   * TODO: use this: <https://stackoverflow.com/a/21487151>
   */
  linkPrimitive(initialValue) {
    let object = [initialValue];
    object.toString = () => object[0];
    return object;
  }
  callbackIntercept(name, data, callback) {
    this.core.onApiCallback(name, data, callback);
  }
  getValue(name, defaultValue) {
    if (this.values.has(name)) {
      return this.values.get(name);
    } else {
      return defaultValue;
    }
  }
  createProxyFor(name, object) {
    switch (typeof object) {
      case "object":
        return this.createObjectProxy(name, object);
      default:
        return object;
    }
  }
  createObjectProxy(name, object) {
    const _ = this;
    return new Proxy(object, {
      set(target, p, newValue, receiver) {
        _.emit("refPropertySet", name, p, newValue);
        return Reflect.set(target, p, newValue, receiver);
      }
    });
  }
}

/***/ }),

/***/ "./frontend/src/injector/transformations/GetAttackDirTransformer.ts":
/*!**************************************************************************!*\
  !*** ./frontend/src/injector/transformations/GetAttackDirTransformer.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetAttackDirTransformer)
/* harmony export */ });
/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Transformation */ "./frontend/src/injector/Transformation.ts");

class GetAttackDirTransformer extends _Transformation__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }
  transform(source) {
    const regex = /([\w$_]+\s*=\s*)(Math\.atan2\([\w$_]+\s*-\s*\(?[\w$_]+\s*\/\s*2\)?,\s*[\w$_]+\s*-\s*\(?[\w$_]+\s*\/\s*2\)?\))/s;
    source = source.replace(regex, `$1[nvrapi].getValue("attackdir",$2)`);
    return source;
  }
}

/***/ }),

/***/ "./frontend/src/injector/transformations/IOClientTransformer.ts":
/*!**********************************************************************!*\
  !*** ./frontend/src/injector/transformations/IOClientTransformer.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOClientTransformer)
/* harmony export */ });
/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Transformation */ "./frontend/src/injector/Transformation.ts");

class IOClientTransformer extends _Transformation__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }
  transform(source) {
    const regex = /(send:\s*function\([\w$_]+\)\s*{\s*var\s+[\w$_]+\s*=\s*Array\.prototype\.slice\.call\(arguments,\s*1\))(?:,|;)?(?:\s*var\s*)?(\s*[\w$_]+\s*=\s*[\w$_]+\.encode\(\[([\w$_]+),\s*([\w$_]+)\]\);\s*this\.socket\.send\([\w$_]+\))(;?\s*})/s;
    source = source.replace(regex, `$1;[nvrapi].callbackIntercept("iosend",[$3,$4],()=>{var $2})$5`);
    return source;
  }
}

/***/ }),

/***/ "./frontend/src/injector/transformations/ObjectSpriteLoaderTransformer.ts":
/*!********************************************************************************!*\
  !*** ./frontend/src/injector/transformations/ObjectSpriteLoaderTransformer.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectSpriteLoaderTransformer)
/* harmony export */ });
/* harmony import */ var _util_StringUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/StringUtil */ "./frontend/src/util/StringUtil.ts");
/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Transformation */ "./frontend/src/injector/Transformation.ts");


class ObjectSpriteLoaderTransformer extends _Transformation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super();
  }
  transform(source) {
    const gameObjectRegex = /(var [\w$_]+\s*=\s*)({});(\s*function ([\w$_]+)\([\w$_]+)\)\s*{(\s*var [\w$_]+\s*=\s*\(?[\w$_]+\.y\s*>=.*?if\s*\(\s*![\w$_]+\s*\)\s*{\s*var\s+[\w$_]+\s*=\s*document\.createElement\(['"]canvas['"]\);.+?([\w$_]+)\.scale\s*\*\s*\([\w$_]+?\s*\?\s*\.+5\s*:\s*1\).+?[\w$_]+\[[\w$_]+\]\s*=\s*[\w$_]+\s*}\s*return [\w$_]+;?\s*)}\s*var/s;
    const itemSpriteRegex = /(var [\w$_]+\s*=\s*)(\[\])(;\s*function ([\w$_]+)\([\w$_]+,\s*[\w$_]+\)\s*{\s*var [\w$_]+\s*=\s*[\w$_]+\[[\w$_]+\.id\];\s*if\s*\(![\w$_]+\s*\|\|\s*[\w$_]+\)\s*{\s*var [\w$_]+\s*=\s*document\.createElement\(['"]canvas['"]\).+?return [\w$_]+;?\s*})/s;

    // also adds one parameter to the function because it depends on an out of scope object which is set before getting the sprite in game code
    const paramName = _util_StringUtil__WEBPACK_IMPORTED_MODULE_0__["default"].randomString(5);
    source = source.replace(gameObjectRegex, `$1[nvrapi].registerReference("gameObjectSprites",$2,true);$3,${paramName}){$6=${paramName}?${paramName}:$6;$5};[nvrapi].registerFunction("getResSprite",$4);var`);
    source = source.replace(itemSpriteRegex, `$1[nvrapi].registerReference("itemSprites",$2,true);$3;[nvrapi].registerFunction("getItemSprite",$4);`);
    return source;
  }
}

/***/ }),

/***/ "./frontend/src/injector/transformations/SourceMappingTransformer.ts":
/*!***************************************************************************!*\
  !*** ./frontend/src/injector/transformations/SourceMappingTransformer.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSourceMappingTransformer)
/* harmony export */ });
/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Transformation */ "./frontend/src/injector/Transformation.ts");

class TSourceMappingTransformer extends _Transformation__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }
  transform(source) {
    source = source.replace(/\/\/# sourceMappingURL=bundle\.js\.map$/g, ";console.log(this);");
    return source;
  }
}

/***/ }),

/***/ "./frontend/src/loader/FingerprintJS.ts":
/*!**********************************************!*\
  !*** ./frontend/src/loader/FingerprintJS.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FingerprintJS)
/* harmony export */ });
// fingerprintjs api compatible with obfuscation, all rights go to fingerprintjs owners!!!

class FingerprintJS {
  static import(endpoint, apiKey) {
    const script = document.createElement("script");
    script.src = "https://fpnpmcdn.net/v3/" + apiKey + "/loader_v3.8.1.js";
    document.head.appendChild(script);
    return window["__fpjs_p_l_b"] !== undefined ? Promise.resolve(window["__fpjs_p_l_b"]) : new Promise(resolve => {
      let interval = setInterval(() => {
        if (window["__fpjs_p_l_b"] !== undefined) {
          clearInterval(interval);
          resolve(window["__fpjs_p_l_b"]);
        }
      }, 50);
    });
  }
}

/***/ }),

/***/ "./frontend/src/loader/NVRLoader.ts":
/*!******************************************!*\
  !*** ./frontend/src/loader/NVRLoader.ts ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SecurityManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SecurityManager */ "./frontend/src/loader/SecurityManager.ts");
/* harmony import */ var _loader_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.html */ "./frontend/src/loader/loader.html");
/* harmony import */ var _raw_loader_NVRWorker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !!raw-loader!./NVRWorker.js */ "./node_modules/raw-loader/dist/cjs.js!./frontend/src/loader/NVRWorker.js");
/* harmony import */ var _util_StringUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/StringUtil */ "./frontend/src/util/StringUtil.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _core_Core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/Core */ "./frontend/src/core/Core.ts");
/* harmony import */ var _FingerprintJS__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FingerprintJS */ "./frontend/src/loader/FingerprintJS.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_Core__WEBPACK_IMPORTED_MODULE_5__]);
_core_Core__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_4__["default"]("loader");
const security = new _SecurityManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
let frame = null;
let info = null;
let details = null;
let keyInput = null;
let menuHider = null;
let worker = null;
function dummy1_(a) {
  return () => {
    a();
    return "x" + 69;
  };
}
function dummy2_(a) {
  return () => {
    a();
    return "y" + 420;
  };
}
function dummy3_(a) {
  return () => {
    a();
    return "z" + 1337;
  };
}
const dummySym = Symbol();
const sym = Math.floor(Math.random() * 256);
const rr = Math.random();
let nn = 0;
let isCoreLoaded = false;
function x(num) {
  nn = num + rr;
  Object.defineProperty(_core_Core__WEBPACK_IMPORTED_MODULE_5__.Core.prototype, sym, {
    value: stop,
    writable: false
  });
  return sym;
}
async function start(m) {
  if ( /*window.location.host === "127.0.0.1"*/true) {
    m(nn);
    return;
  }
  const ENDPOINT = _core_Core__WEBPACK_IMPORTED_MODULE_5__.Core.ENDPOINT;
  const VER = _core_Core__WEBPACK_IMPORTED_MODULE_5__.Core.VER.uformat();
  document.body.insertAdjacentHTML("beforeend", _loader_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
  frame = document.querySelector("#loader-wrapper");
  const header = document.querySelector("#loader > #header");
  info = document.querySelector("#loader > #info");
  details = document.querySelector("#loader > #details");
  keyInput = document.querySelector("#loader > #activation-key");
  menuHider = document.createElement("style");
  menuHider.innerText = "#mainMenu { display: none !important; }";
  document.head.appendChild(menuHider);
  header.innerText = "Loading NVR";
  info.innerText = "Loading libraries";
  details.innerText = "...";
  function fail() {
    header.innerText = "Integrity Compromised";
    info.innerText = "Unauthorized changes were detected";
    details.style.display = "block";
    details.innerText = "This incident was reported along with all neccessary data";
    header.classList.add("mark-error");
    return;
  }
  function displayFailStatus(code, str) {
    info.innerText = `${code}: ${str}`;
    info.classList.add("mark-error");
    details.style.display = "block";
    details.innerText = "If this keeps happening even after page reload, please report this to developers";
    return Promise.reject();
  }
  const fpjsloader = await _FingerprintJS__WEBPACK_IMPORTED_MODULE_6__["default"]["import"](ENDPOINT, "jAYuN2pGILWUwQbCDWTw");
  const fpjs = await fpjsloader.load();
  const fingerprint = await fpjs.get();
  function getFingerprint() {
    return fingerprint.visitorId;
  }
  const oldFetch = window.fetch;
  const fetch = new Proxy(oldFetch, {
    apply(target, thisArg, argArray) {
      try {
        if (/pleasingringedexpertise\.gg69gamer\.repl\.co/.test(argArray[0])) {
          if (argArray[1] !== undefined) {
            argArray[1].headers = Object.assign(argArray[1].headers, {
              "Authorization": fingerprint.visitorId
            });
          } else {
            argArray[1] = {
              "headers": {
                "Authorization": fingerprint.visitorId
              }
            };
          }
        }
        return new Promise(async (resolve, reject) => {
          Reflect.apply(target, thisArg, argArray).then(response => {
            if (response.status === 429 && response.headers.has("retry-after")) {
              logger.log("rate limited, retrying in a moment");
              setTimeout(() => {
                fetch(argArray[0], argArray[1]).then(respons => resolve(respons)).catch(err => reject(err));
              }, parseInt(response.headers.get("retry-after")) * 1000);
            } else {
              resolve(response);
            }
          }).catch(() => {
            displayFailStatus(0, "Failed to fetch");
          });
        });
      } catch (err) {
        displayFailStatus(0, "Couldn't set authorization token");
      }
    }
  });
  info.innerText = "Checking for updates";
  details.innerText = "...";
  ;
  async function checkForUpdates() {
    return new Promise((resolve, reject) => {
      fetch(ENDPOINT + "/update?ver=" + VER).then(res => res.ok ? res.json() : displayFailStatus(res.status, res.statusText)).then(res => {
        console.log("ver:", res);
        resolve(res);
      }).catch(reject);
    });
  }
  async function checkKey(key) {
    return new Promise((resolve, reject) => {
      fetch(ENDPOINT + "/api/verifyKey/" + key).then(res => res.ok ? res.json() : displayFailStatus(res.status, res.statusText)).then(res => {
        console.log("verify:", res);
        resolve(res);
      }).catch(reject);
    });
  }
  async function redeemKey(key) {
    return new Promise((resolve, reject) => {
      fetch(ENDPOINT + "/api/redeem/" + key).then(res => res.ok ? res.json() : displayFailStatus(res.status, res.statusText)).then(res => {
        resolve(res);
      }).catch(reject);
    });
  }
  try {
    (async (dummy1, fail, symbol, dummy2, success, dummySymbol, dummy3, fpGetter) => {
      // https://pleasingringedexpertise.gg69gamer.repl.co/download/static/script.user.js

      const updates = await checkForUpdates();
      if (updates.update) {
        header.innerText = "Updating NVR";
        info.innerText = "An update is available: " + _core_Core__WEBPACK_IMPORTED_MODULE_5__.Core.VER.toString() + " > " + updates.version.replace(/_/g, ".");
        details.innerText = "Installing script...";
        setTimeout(() => {
          details.innerText = "Please confirm script installation!";
          window.onbeforeunload = null;
          window.location.href = `${ENDPOINT}/download/${updates.url}/script.user.js`;
          window.addEventListener("blur", function () {
            window.addEventListener("focus", function () {
              details.innerText = "Reloading page to start new version...";
              window.onbeforeunload = null;
              window.location.reload();
            }, {
              once: true
            });
          }, {
            once: true
          });
        }, 3000);
      } else {
        let key = localStorage.getItem("nvr_token");
        let byteCode = "";
        async function checkKeyVisual(value, isRequiring, resolve, reject, listener) {
          details.style.display = "block";
          details.innerText = "Checking key...";
          details.classList.remove("mark-error");
          details.classList.remove("mark-success");
          function check() {
            checkKey(value).then(async result => {
              if (result.valid) {
                if (listener) keyInput.removeEventListener("input", listener);
                details.classList.remove("mark-error");
                details.style.display = "block";
                details.innerText = "Checking integrity...";
                byteCode = result.byteCode;
                if (resolve) resolve(value);
              } else if (result.expired) {
                details.style.display = "block";
                details.innerHTML = "Key has expired! Get a new key at <a href=\"https://discord.gg/V5gS9ze278\">our [Discord]</a>";
                details.classList.add("mark-error");
                if (!isRequiring && reject) reject();
              } else if (result.redeem) {
                details.style.display = "block";
                details.innerText = "Redeeming key...";
                details.classList.add("mark-success");
                const redeemResult = await redeemKey(value);
                if (redeemResult && redeemResult.success) {
                  details.style.display = "block";
                  details.innerText = "Key redeemed successfully!";
                  details.classList.add("mark-success");
                  check();
                } else {
                  details.style.display = "block";
                  details.innerText = "Failed to redeem key!";
                  details.classList.add("mark-error");
                  if (!isRequiring && reject) reject();
                }
              } else {
                details.style.display = "block";
                details.innerText = "Invalid key!";
                details.classList.add("mark-error");
                if (!isRequiring && reject) reject();
              }
            }).catch(() => undefined);
          }
          check();
        }
        async function requireKey() {
          return new Promise((resolve, reject) => {
            header.innerText = "Activation";
            info.innerText = "Please enter activation key";
            keyInput.style.display = "block";
            keyInput.addEventListener("input", async function listener(event) {
              const value = keyInput.value.toLowerCase();
              if (/^[a-f0-9]{32}$/.test(value)) {
                await checkKeyVisual(value, true, resolve, reject, listener);
              }
            });
          });
        }
        async function setNewKey() {
          localStorage.removeItem("nvr_token");
          key = await requireKey();
          localStorage.setItem("nvr_token", key);
        }
        if (!key) {
          details.style.display = "none";
          await setNewKey();
        } else {
          await new Promise(async (resolve, reject) => await checkKeyVisual(key, false, resolve, reject)).catch(async () => await setNewKey());
        }
        info.innerText = "Verifying code integrity";
        details.innerText = "...";

        // VM verifies if local fingerprint matches with received one
        const vm = security.createVM(byteCode, {
          stack: {
            maxStringByteLength: 63
          }
        }, [symbol, dummy3, fpGetter, fail, dummy2, success, dummy1, dummySymbol]);
        isCoreLoaded = true;
        try {
          vm();
        } catch (err) {
          console.log(err);
          fail();
        }
      }
    })(dummy1_(fail), fail, () => sym, dummy2_(fail), m, dummySym, dummy3_(fail), getFingerprint);
  } catch (e) {
    const err = e;
    alert("An error occured during load: " + (err.stack ?? err.message));
  }
}
function setStatus(info_, details_) {
  if (info && details) {
    info.innerText = info_;
    details.innerText = details_;
  }
}
function stop() {
  if (!isCoreLoaded) return;
  document.getElementById("mainMenu").style.opacity = "";
  menuHider?.remove();
  frame?.remove();
}
let workerTasks = [];
class WorkerTask {
  constructor(id, resolve, reject) {
    this.id = id;
    this.fc_resolve = resolve;
    this.fc_reject = reject;
  }
  resolve(val) {
    this.fc_resolve(val);
  }
  reject(val) {
    this.fc_reject(val);
  }
}
function createWebWorker() {
  const blob = new Blob([_raw_loader_NVRWorker_js__WEBPACK_IMPORTED_MODULE_2__["default"]], {
    type: 'application/javascript'
  });
  worker = new Worker(URL.createObjectURL(blob));
  worker.onmessage = e => {
    const [taskId, status, data] = e.data;
    if (taskId === "0") return logger.error(data);
    if (taskId === "log") return logger.log(data);
    const task = workerTasks.find(x => x.id === taskId);
    if (task) {
      task[status ? "resolve" : "reject"](data);
    }
  };
  return new Promise((resolve, reject) => {
    workerExecute("echo", "init").then(e => {
      if (e === "init") {
        logger.log("worker init complete");
      } else {
        logger.log("worker not behaving correctly? init != " + e);
      }
      resolve();
    }).catch(e => {
      logger.error("failed to init worker:", e);
      reject();
    });
  });
}
function createWorkerTaskId() {
  return _util_StringUtil__WEBPACK_IMPORTED_MODULE_3__["default"].randomString(16);
}
function workerExecute(task, data) {
  const taskId = createWorkerTaskId();
  worker.postMessage([taskId, task, data]);
  const promise = new Promise((resolve, reject) => {
    workerTasks.push(new WorkerTask(taskId, resolve, reject));
  });
  return promise;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  start,
  setStatus,
  stop,
  createWebWorker,
  workerExecute,
  x
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
class SecurityManager {
  constructor() {}
  checkHref() {
    const loc = window.location;
    if (!(loc instanceof Location)) return false;
    if (location[Symbol.toStringTag] != "Location") return false;
    if (loc.host !== "sandbox.moomoo.io") return false;
    return true;
  }
  createVM(byteCode, config, references) {
    // referenes indexes: 0 = symbol, 2 = fingerprint getter, 5 = success function, 3 = failure         
    //const byteCode = "DgEADxMFAQ4BQA8TBQIOAQAVEgwRRRAAEUUDbXlmcAAAFg4BQBMFABQQFxMFAxg=";

    const instructions = new DataView(new TextEncoder().encode(window.atob(byteCode) + "\0").buffer);
    let instructionsReadIndex = 0;
    const stack = new DataView(new Uint8Array(65535).buffer);
    let stackPointer = 0;
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    function remainingInstructionsCount() {
      return instructions.byteLength - instructionsReadIndex;
    }
    function getNextInstruction() {
      return instructions.getUint8(instructionsReadIndex++);
    }
    function executeNextInstruction() {
      return executeInstruction(getNextInstruction());
    }
    function setStackPointer(index) {
      stackPointer = index;
    }
    function peekInstructionU8Value() {
      return remainingInstructionsCount() > 0 ? instructions.getUint8(instructionsReadIndex) : null;
    }
    function readInstructionU8Value() {
      return instructions.getUint8(instructionsReadIndex++);
    }
    function readInstructionU16Value() {
      const value = instructions.getUint16(instructionsReadIndex);
      instructionsReadIndex += 2;
      return value;
    }
    function readInstructionStrValue() {
      const buffer = new Uint8Array(remainingInstructionsCount());
      let byte,
        length = 0;
      do {
        byte = readInstructionU8Value();
        buffer[length++] = byte /* ^ xorIndex*/;
        //xorIndex = (xorIndex + 3) % 256;
      } while (byte !== 0x00);
      return decoder.decode(buffer.slice(0, length - 1));
    }
    function readInstructionValue() {
      const valueType = getNextInstruction();
      switch (valueType) {
        case 1:
          return readInstructionU8Value();
        case 2:
          return readInstructionU16Value();
        case 3:
          return readInstructionStrValue();
        case 4:
          return readPointer();
        case 5:
          return readReference();
        case 19:
          return executeFunction(readInstructionValue());
        default:
          return executeInstruction(valueType);
      }
    }
    function writeStack(value) {
      switch (typeof value) {
        case "number":
          if (value < 256) {
            stack.setUint8(stackPointer++, 1);
            stack.setUint8(stackPointer++, value);
          } else if (value < 65536) {
            stack.setUint8(stackPointer++, 2);
            stack.setUint16(stackPointer, value);
            stackPointer += 2;
          }
          break;
        case "string":
          {
            const bytes = encoder.encode(value);
            stack.setUint8(stackPointer++, 3);
            for (let i = 0; i < bytes.byteLength; i++) stack.setUint8(stackPointer++, bytes[i]);
            stack.setUint8(stackPointer++, 0x00);
            break;
          }
      }
    }
    function readStack() {
      const type = stack.getUint8(stackPointer++);
      switch (type) {
        case 1:
          return stack.getUint8(stackPointer++);
          break;
        case 2:
          {
            const value = stack.getUint16(stackPointer);
            stackPointer += 2;
            return value;
            break;
          }
        case 3:
          {
            const buffer = new Uint8Array(config.stack.maxStringByteLength);
            let byte,
              length = 0;
            do {
              buffer[length++] = byte = stack.getUint8(stackPointer++);
            } while (byte !== 0x00);
            return decoder.decode(buffer.slice(0, length - 1));
            break;
          }
      }
    }
    function readPointer() {
      const pointer = readInstructionU8Value();
      setStackPointer(pointer);
      return readStack();
    }
    function performMathOperation(operator) {
      const leftValue = readInstructionValue();
      const rightValue = readInstructionValue();
      switch (operator) {
        case 6:
          return leftValue + rightValue;
          break;
        case 7:
          return leftValue - rightValue;
          break;
        case 8:
          return leftValue * rightValue;
          break;
        case 9:
          return leftValue / rightValue;
          break;
        case 10:
          return leftValue ^ rightValue;
          break;
        case 69:
          return leftValue + "\0";
          break;
      }
    }
    function performComparation(comparator) {
      const leftValue = readInstructionValue();
      const rightValue = readInstructionValue();
      switch (comparator) {
        case 11:
          return leftValue == rightValue;
          break;
        case 12:
          return leftValue === rightValue;
          break;
      }
    }
    function readReference() {
      const value = readInstructionU8Value();
      return references[value];
    }
    function executeFunction(func) {
      const params = [];
      while (peekInstructionU8Value() === 20) {
        readInstructionU8Value(); // shift param opener instruction
        params.push(readInstructionValue());
      }
      console.log("executing", func, params);
      return func.apply(null, params);
    }
    function readBranch() {
      const branchType = peekInstructionU8Value();
      if (branchType !== 22 && branchType !== 23) {
        return -1;
      }
      ; // shift the peeked value

      //const arr = new Uint8Array(config.instructions.maxBranchLength);
      const endingCode = branchType === 22 ? 23 : 24;
      let byte,
        length = 0;
      const index = instructionsReadIndex + 1;
      while ((byte = readInstructionU8Value()) !== endingCode && byte !== 24) {
        length++;
      }
      ;
      //while ((byte = readInstructionU8Value()) !== endingCode) arr[length++] = byte;

      instructionsReadIndex = index + length - 1;
      return [index, index + length];
    }
    function executeConditionalBranch() {
      const conditionResult = executeNextInstruction();
      const s1 = readBranch();
      const s2 = readBranch();
      let byte;
      if (conditionResult) {
        instructionsReadIndex = s1[0];
        do {
          byte = readInstructionU8Value();
          executeInstruction(byte);
        } while (instructionsReadIndex < s1[1]);
        if (s2 !== -1) instructionsReadIndex = s2[1];
      } else if (s2 !== -1) {
        instructionsReadIndex = s2[0];
        do {
          byte = readInstructionU8Value();
          executeInstruction(byte);
        } while (instructionsReadIndex < s2[1]);
      }
    }
    function executeInstruction(instruction) {
      switch (instruction) {
        case 13:
          return executeNextInstruction();
        case 14:
          return setStackPointer(readInstructionValue());
        case 15:
          return writeStack(readInstructionValue());
        case 16:
          return readStack();
        case 17:
          return performMathOperation(readInstructionU8Value());
        case 18:
          return performComparation(readInstructionU8Value());
        case 21:
          executeConditionalBranch();
          break;
        case 19:
          return executeFunction(readInstructionValue());
      }
    }
    return function execute() {
      while (remainingInstructionsCount() > 0) executeInstruction(getNextInstruction());
    };
  }
}

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
/* harmony import */ var _core_CoreCreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/CoreCreator */ "./frontend/src/core/CoreCreator.ts");
/* harmony import */ var _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loader/NVRLoader */ "./frontend/src/loader/NVRLoader.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/MathUtil */ "./frontend/src/util/MathUtil.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_CoreCreator__WEBPACK_IMPORTED_MODULE_2__, _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__]);
([_core_CoreCreator__WEBPACK_IMPORTED_MODULE_2__, _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const cid = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].randInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_5__["default"]("main");
(0,_socket_Connection__WEBPACK_IMPORTED_MODULE_4__.inject)();
logger.info("initializing core");
const core = _core_CoreCreator__WEBPACK_IMPORTED_MODULE_2__["default"].create(cid);
if (!core) {
  logger.error("critical: core failed to load!");
  alert("critical: core failed to load! please report this to developers!");
}
async function initializeRenderer() {
  await core.initializeRenderer(document.getElementById("gameCanvas"));
  _resolve();
}
window.addEventListener("DOMContentLoaded", async () => initializeRenderer());
let _resolve;
const promise = new Promise((resolve, reject) => {
  _resolve = resolve;
});
const observer = new MutationObserver((mutations, observer) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node instanceof HTMLBodyElement) {
        const vv = _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__["default"].x(Math.random());
        _loader_NVRLoader__WEBPACK_IMPORTED_MODULE_3__["default"].start(s => {
          return s !== vv ? () => core.sd() : () => core[s]();
        });
      } else if (node.tagName === "SCRIPT" && /var loadedScript/.test(node.innerText)) {
        node.addEventListener("beforescriptexecute", e => e.preventDefault(), {
          once: true
        });
        node.parentElement.removeChild(node);
      } else if (node.tagName === "SCRIPT" && /bundle\.js$/.test(node.src)) {
        core.patchBundle(node.src, promise);

        // firefox executes script even if its removed
        node.addEventListener("beforescriptexecute", e => e.preventDefault(), {
          once: true
        });
        console.log("removing child from ", node.parentElement, node);
        node.parentElement.removeChild(node);
        //observer.disconnect();
      }
    }
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
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PredictedPlacement": () => (/* binding */ PredictedPlacement),
/* harmony export */   "default": () => (/* binding */ ObjectManager)
/* harmony export */ });
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../features/modules/building/AntiTrap */ "./frontend/src/features/modules/building/AntiTrap.ts");
/* harmony import */ var _util_AlghoritmUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/AlghoritmUtil */ "./frontend/src/util/AlghoritmUtil.ts");
/* harmony import */ var _util_ArrayUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/ArrayUtil */ "./frontend/src/util/ArrayUtil.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_type_GridSet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/type/GridSet */ "./frontend/src/util/type/GridSet.ts");
/* harmony import */ var _util_type_SidArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/type/SidArray */ "./frontend/src/util/type/SidArray.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_3__]);
_features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];










class PredictedPlacement extends _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__.PlayerBuilding {
  constructor(position, dir, scale, type, placedTimestamp) {
    super(-1, position, dir, scale, type, -1, false);
    this.placedTimestamp = placedTimestamp;
  }
}
class ObjectManager {
  constructor(core) {
    this.core = core;
    this.gameObjects = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_8__.SidArray();
    this.grids = {};
    this.updateObjects = [];
    this.predictedPlacements = [];
  }
  getPlacementVector(source, scale, angle, item) {
    const placeOffset = scale + item.scale + (item.placeOffset ?? 0);
    return source.clone().directionMove(angle, placeOffset);
  }
  canPlaceObject(source, item, lookupPredictions = false, ignored = []) {
    const [position, scale, angle] = source;
    const targetPosition = this.getPlacementVector(position, scale, angle, item);
    return this.isPositionFree(targetPosition, item.scale, lookupPredictions, ignored);
  }
  isPositionFree(placementVector, scale, lookupPredictions = false, ignored = []) {
    const grids = this.getGridArrays(placementVector.x, placementVector.y, scale);
    return grids.filter(x => ignored.indexOf(x.sid) === -1 && _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(x.position, placementVector) <= x.getPlaceColScale() + scale).length === 0 && (!lookupPredictions || this.predictedPlacements.filter(x => _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(x.position, placementVector) <= x.getPlaceColScale() + scale).length === 0);
  }
  getBlockingBuildings(source, item, ignored = []) {
    const [position, scale, angle] = source;
    const placeOffset = scale + item.scale + (item.placeOffset ?? 0);
    const placementVector = position.clone().directionMove(angle, placeOffset);
    const grids = this.getGridArrays(placementVector.x, placementVector.y, scale);
    return grids.filter(x => ignored.indexOf(x.sid) === -1 && _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(x.position, placementVector) <= x.getPlaceColScale() + scale);
  }

  /**
   * @param source[0] position from where the item is placed
   * @param source[1] scale of placing entity
   * @param source[2] angle at which is the item being placed at
   */
  addPlacementAttempt(source, item, timestamp = Date.now()) {
    const [position, scale, angle] = source;
    const placeOffset = scale + item.scale + (item.placeOffset ?? 0);
    // since position is already being cloned when passing as argument, we dont need to clone again
    const targetPosition = position.directionMove(angle, placeOffset);
    if (this.isPositionFree(targetPosition, item.scale)) {
      this.predictedPlacements.push(new PredictedPlacement(targetPosition, angle, item.scale, item.id, timestamp));
    }
  }
  findPlacementArcs(source, item, ignore = []) {
    const [position, scale] = source;
    const placeOffset = scale + item.scale + (item.placeOffset ?? 0);
    const blockingBuildings = this.getGridArrays(position.x, position.y, placeOffset).filter(x => ignore.indexOf(x) === -1 && _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(x.position, position) - x.getPlaceColScale() <= placeOffset + item.scale);
    const blockingAngles = [];
    for (const building of blockingBuildings) {
      const tangentAngle = this.findPlacementTangent(source, building, item, 0);
      const buildingAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].polarToCartesian(_util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDirection(source[0], building.position));
      const startAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].clampCartesian(buildingAngle - tangentAngle);
      const endAngle = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].clampCartesian(buildingAngle + tangentAngle);
      blockingAngles.push([startAngle, endAngle]);
    }
    const allowsCartesian = _util_AlghoritmUtil__WEBPACK_IMPORTED_MODULE_4__["default"].allowedAnglesFromBlocked(blockingAngles);
    const mergedCartesian = _util_AlghoritmUtil__WEBPACK_IMPORTED_MODULE_4__["default"].mergeArcsCartesian(allowsCartesian);
    return mergedCartesian.length > 0 && mergedCartesian[0] !== undefined ? _util_ArrayUtil__WEBPACK_IMPORTED_MODULE_5__["default"].mapTupleArray(mergedCartesian, _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].cartesianToPolar) : [];
  }
  splitPlacement(playerScale, item, angle) {
    const splitTangent = this.findSplitTangent(playerScale, item);
    return [angle - splitTangent, angle + splitTangent];
  }
  tryToSplitPlacement(source, angle, item, ignore = []) {
    const split = this.splitPlacement(source[1], item, angle);
    const ignoredMapped = ignore.map(x => x.sid);
    return this.canPlaceObject([...source, split[0]], item, false, ignoredMapped) && this.canPlaceObject([...source, split[1]], item, false, ignoredMapped) ? split : null;
  }
  findSplitTangent(playerScale, item) {
    /*const t = (playerScale + item.scale + (item.placeOffset ?? 0)) ** 2;
    return Math.acos((item.scale ** 2 - t * 2 + 5) / (-2 * t));*/

    const t = playerScale + item.scale + (item.placeOffset ?? 0);
    const p = item.scale * 2;
    const s = t;
    return Math.acos((p ** 2 - s ** 2 - t ** 2) / (-2 * s * t));
  }
  findPlacementTangent(source, target, item, additionalDistanceFromObject) {
    const t = source[1] + item.scale + (item.placeOffset ?? 0);
    const p = target.getPlaceColScale() + item.scale;
    const s = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(source[0], target.position);
    return Math.acos((p ** 2 - s ** 2 - t ** 2) / (-2 * s * t));
  }
  getVisibleBuildings(source, camera, zoomFactor = 1) {
    return this.getGridArrays(source.x, source.y, _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].maxScreenWidth * zoomFactor).filter(x => Math.abs(x.position.x - camera.x) <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].maxScreenWidth * zoomFactor && Math.abs(x.position.y - camera.y) <= _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].maxScreenHeight * zoomFactor);
  }

  // SET OBJECT GRIDS
  setObjectGrids(obj) {
    let tmpX, tmpY;
    let tmpS = _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].mapScale / _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].colGrid;
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
  // REMOVE OBJECT FROM GRID:
  removeObjGrid(obj) {
    var tmpIndx;
    for (var i = 0; i < obj.gridLocations.length; ++i) {
      tmpIndx = this.grids[obj.gridLocations[i]].indexOf(obj);
      if (tmpIndx >= 0) {
        this.grids[obj.gridLocations[i]].splice(tmpIndx, 1);
      }
    }
  }
  // DISABLE OBJ:
  disableObj(obj) {
    this.gameObjects.remove(obj);
    this.removeObjGrid(obj);
    /*if (server) {
        if (obj.owner && obj.pps) obj.owner.pps -= obj.pps;*/
    //this.removeObjGrid(obj);

    if (obj instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__.PlayerBuilding) {
      const predictIndex = this.predictedPlacements.indexOf(this.predictedPlacements.find(o => o.sid === obj.sid));
      if (predictIndex > -1) {
        this.predictedPlacements.splice(predictIndex, 1);
      }
      var tmpIndx = this.updateObjects.indexOf(obj);
      if (tmpIndx >= 0) {
        this.updateObjects.splice(tmpIndx, 1);
      }
      if (obj.owner.sid !== -1 && !this.core.playerManager.checkTeam(obj.owner.sid)) {
        const myPlayer = this.core.playerManager.myPlayer;
        const isCollision = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(myPlayer.serverPos, obj.position) < myPlayer.scale + obj.getPlaceColScale();
        if (obj.type === 15 && isCollision && obj.owner.sid !== myPlayer.sid && myPlayer.state.data.trap === obj) {
          myPlayer.state.isTrapped = false;
          myPlayer.state.data.trap = undefined;
          const antiTrap = this.core.moduleManager.getModule(_features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_3__["default"]);
          antiTrap.setTrapBroken();
        }
      }
      this.core.moduleManager.onBuildingBreak(obj);
    }
    /*}*/
  }

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
  getGridArrays(xPos, yPos, s) {
    let tmpX,
      tmpY,
      uniqueGameObjects = new _util_type_GridSet__WEBPACK_IMPORTED_MODULE_7__["default"](),
      tmpGrid;
    let tmpS = _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].mapScale / _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].colGrid;
    tmpX = Math.floor(xPos / tmpS);
    tmpY = Math.floor(yPos / tmpS);
    try {
      if (this.grids[tmpX + "_" + tmpY]) uniqueGameObjects.addGrid(this.grids[tmpX + "_" + tmpY]);
      if (xPos + s >= (tmpX + 1) * tmpS) {
        // RIGHT
        tmpGrid = this.grids[tmpX + 1 + "_" + tmpY];
        if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
        if (tmpY && yPos - s <= tmpY * tmpS) {
          // TOP RIGHT
          tmpGrid = this.grids[tmpX + 1 + "_" + (tmpY - 1)];
          if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
        } else if (yPos + s >= (tmpY + 1) * tmpS) {
          // BOTTOM RIGHT
          tmpGrid = this.grids[tmpX + 1 + "_" + (tmpY + 1)];
          if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
        }
      }
      if (tmpX && xPos - s <= tmpX * tmpS) {
        // LEFT
        tmpGrid = this.grids[tmpX - 1 + "_" + tmpY];
        if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
        if (tmpY && yPos - s <= tmpY * tmpS) {
          // TOP LEFT
          tmpGrid = this.grids[tmpX - 1 + "_" + (tmpY - 1)];
          if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
        } else if (yPos + s >= (tmpY + 1) * tmpS) {
          // BOTTOM LEFT
          tmpGrid = this.grids[tmpX - 1 + "_" + (tmpY + 1)];
          if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
        }
      }
      if (yPos + s >= (tmpY + 1) * tmpS) {
        // BOTTOM
        tmpGrid = this.grids[tmpX + "_" + (tmpY + 1)];
        if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
      }
      if (tmpY && yPos - s <= tmpY * tmpS) {
        // TOP
        tmpGrid = this.grids[tmpX + "_" + (tmpY - 1)];
        if (tmpGrid) uniqueGameObjects.addGrid(tmpGrid);
      }
    } catch (e) {}
    //console.log(Array.from(uniqueGameObjects.values()));
    return Array.from(uniqueGameObjects.values());
  }

  // ADD NEW:
  add(sid, x, y, dir, s, type, data, owner) {
    let tmpObj;
    if (owner !== -1) {
      const predicted = this.predictedPlacements.find(obj => _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(obj.position, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_9__["default"](x, y)) < 8 && obj.stats.id === data);
      if (predicted) {
        // building prediction succeeded, remove item from predictions
        this.predictedPlacements.splice(this.predictedPlacements.indexOf(predicted), 1);
      }
    }

    // remove old object with the same sid
    if ((tmpObj = this.gameObjects.findBySid(sid)) !== null) {
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
        tmpObj = new _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__.NaturalObject(sid, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_9__["default"](x, y), dir, s, type);
      } else {
        const item = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_1__.items.list[data];
        const vec = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_9__["default"](x, y);
        const placementSighted = this.core.playerManager.getAllVisible().some(player => player.sid === owner && _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(player.lastTickServerPos.clone(), vec) - (player.scale + s + (item.placeOffset ?? 1)) <= player.velocity.length()); // it usually is ~0.5 difference but just to be safe
        tmpObj = new _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__.PlayerBuilding(sid, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_9__["default"](x, y), dir, s, data, owner, placementSighted);
      }
      this.gameObjects.push(tmpObj);
    }

    /*tmpObj.sid = sid;
    tmpObj.init(x, y, dir, s, type, data, owner);*/

    // server function
    this.setObjectGrids(tmpObj);
    this.updateObjects.push(tmpObj);
    if (owner !== -1 && !this.core.playerManager.checkTeam(owner)) {
      const myPlayer = this.core.playerManager.myPlayer;
      const isCollision = _util_MathUtil__WEBPACK_IMPORTED_MODULE_6__["default"].getDistance(myPlayer.serverPos, tmpObj.position) < myPlayer.scale + tmpObj.getPlaceColScale();
      const antiTrap = this.core.moduleManager.getModule(_features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_3__["default"]);
      if (tmpObj.type === 15 && isCollision && tmpObj.owner.sid !== myPlayer.sid && myPlayer.state.data.trap !== tmpObj) {
        myPlayer.state.isTrapped = true;
        myPlayer.state.data.trap = tmpObj;
        antiTrap.initializeTrap(tmpObj);
      }
    }
  }
  // DISABLE BY SID:
  disableBySid(sid) {
    for (var i = 0; i < this.gameObjects.length; ++i) {
      if (this.gameObjects[i].sid === sid) {
        this.disableObj(this.gameObjects[i]);
        break;
      }
    }
  }
  // REMOVE ALL FROM PLAYER:
  removeAllItems(sid) {
    let i = this.gameObjects.length - 1;
    while (i >= 0) {
      const object = this.gameObjects[i];
      if (object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_2__.PlayerBuilding && object.owner.sid === sid) {
        this.disableObj(object);
      }
      i--;
    }
    /*if (server) {
        server.broadcast("13", sid);
    }*/
  }

  // FETCH SPAWN OBJECT:
  fetchSpawnObj(sid) {
    let tmpObj;
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
  // CHECK IF PLACABLE:
  checkItemLocation(x, y, s, sM, indx, ignoreWater, placer) {
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

  wiggleObject(sid, dir, tickIndex) {
    const object = this.gameObjects.findBySid(sid);
    if (object) {
      object.wiggle.add(new _util_type_Vector__WEBPACK_IMPORTED_MODULE_9__["default"](_data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].gatherWiggle * Math.cos(dir), _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].gatherWiggle * Math.sin(dir)));
      object.wiggles.push([dir, tickIndex]);
    }
  }
  resetWiggles(tickIndex) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      const wiggles = this.gameObjects[i].wiggles;
      let j = wiggles.length;
      while (j--) {
        const wiggle = wiggles[j];
        if (tickIndex >= wiggle[1] + 1) {
          wiggles.splice(j, 1);
        }
      }
    }
  }
  update(delta) {
    for (let i = 0; i < this.updateObjects.length; i++) {
      this.updateObjects[i].update(delta);
    }
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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





class PlayerManager {
  constructor() {
    this.playerList = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_3__.SidArray();
    this.myClan = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_3__.SidArray();
    this.myPlayer = new _data_type_Player__WEBPACK_IMPORTED_MODULE_0__.ClientPlayer("", -1, "", new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](), 0, 0, 0, 0, 0);
  }
  spawnPlayer(id, sid, name, position, dir, health, maxHealth, scale, skinColor, isMyPlayer) {
    let player = this.playerList.findBySid(sid);
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
  update(delta) {
    for (let i = 0; i < this.playerList.length; i++) {
      this.playerList[i].inventory.updateReloads(delta);
    }
  }
  tickReset(tickIndex) {
    for (let i = 0; i < this.playerList.length; i++) {
      const player = this.playerList[i];
      if (player.nextAttack + 1 === tickIndex) {
        player.nextAttack = 0;
        player.swingStreak = 0;
      }
      player.hasFiredProjectileThisTick = false;
    }
  }
  checkTeam(sid, forSid) {
    return false;
  }
  findTarget() {
    return this.playerList.slice(1).sort((a, b) => a.serverPos.clone().subtract(this.myPlayer.serverPos).length() - b.serverPos.clone().subtract(this.myPlayer.serverPos).length())[0];
  }
  getNearby(positon, distance, ignoreTeam = false) {
    return this.playerList.filter((player, index) => /*index !== 0 && */player.visible && (!ignoreTeam || player.team !== this.myPlayer.team) && player.serverPos.clone().subtract(positon).length() <= distance);
  }
  getMeleeThreats() {
    return this.playerList.filter((player, index) => index !== 0 && player.visible && _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(player.serverPos.clone().add(player.velocity), this.myPlayer.serverPos.clone().add(this.myPlayer.velocity)) <= Math.max(...player.inventory.weapons.filter(x => x instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__.MeleeWeapon && x !== null).map(x => x.stats.range)));
  }
  getRangedThreats() {
    return this.playerList.filter((player, index) => index !== 0 && player.visible && _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(player.serverPos.clone().add(player.velocity), this.myPlayer.serverPos.clone().add(this.myPlayer.velocity)) <= Math.max(...player.inventory.weapons.filter(x => x instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__.RangedWeapon && x !== null).map(x => x.stats.range)));
  }
  getVisible() {
    return this.playerList.filter((player, index) => index !== 0 && player.visible);
  }
  getAllVisible() {
    return this.playerList.filter(player => player.visible);
  }
  getVisibleEnemies() {
    return this.playerList.filter((player, index) => index !== 0 && player.visible && (!player.team || player.team !== this.myPlayer.team));
  }
  isAnyoneInSight() {
    return this.getVisible().length > 0;
  }
  getEnemiesInRadius(radius) {
    return this.getVisible().filter((player, index) => index !== 0 && player.visible && _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(this.myPlayer.serverPos, player.serverPos) <= radius && (!player.team || player.team !== this.myPlayer.team));
  }
  isEnemyInRadius(radius) {
    return this.getEnemiesInRadius(radius).length > 0;
  }
  getThreats() {
    return this.getMeleeThreats().concat(this.getRangedThreats());
  }
}

/***/ }),

/***/ "./frontend/src/manager/ProjectileManager.ts":
/*!***************************************************!*\
  !*** ./frontend/src/manager/ProjectileManager.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectileManager)
/* harmony export */ });
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _data_type_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/type/Player */ "./frontend/src/data/type/Player.ts");
/* harmony import */ var _data_type_Projectile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/type/Projectile */ "./frontend/src/data/type/Projectile.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _util_MathUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/MathUtil */ "./frontend/src/util/MathUtil.ts");
/* harmony import */ var _util_type_SidArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/type/SidArray */ "./frontend/src/util/type/SidArray.ts");







class ProjectileManager {
  constructor(core) {
    this.core = core;
    this.projectileList = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_6__.SidArray();
    this.scheduledSpawns = [];
  }
  scheduleSpawn(position, direction, range, speed, type, layer, sid) {
    this.scheduledSpawns.push([position, direction, range, speed, type, layer, sid, false]);
  }
  tickSpawnAllScheduled(tick) {
    let i = this.scheduledSpawns.length - 1;
    while (i >= 0) {
      const data = this.scheduledSpawns[i];
      this.add(tick, ...data);
      this.scheduledSpawns.splice(i, 1);
      i--;
    }
  }
  add(spawnTick, position, direction, range, speed, type, layer, sid, despawned) {
    let tmpObj;
    if ((tmpObj = this.projectileList.findBySid(sid)) !== null) {
      this.projectileList.remove(tmpObj);
      tmpObj = null;
    }
    if (!tmpObj) {
      const item = _data_type_Projectile__WEBPACK_IMPORTED_MODULE_2__.projectileList[type];
      let owner = null;
      let bestDistance = Infinity;

      // check for shooting player
      let playerSpawnOffset = 35 * 2;
      const playerSpawnLocation = item === _data_type_Projectile__WEBPACK_IMPORTED_MODULE_2__.Projectiles.TURRET_BULLET ? position : position.subtract(Math.cos(direction) * playerSpawnOffset, Math.sin(direction) * playerSpawnOffset);
      const players = this.core.playerManager.getAllVisible();
      for (let i = 0; i < players.length; i++) {
        const player = players[i];

        // TODO: change adding player.velocity to prediction engine
        const dist = player.serverPos.clone().add(player.velocity).subtract(playerSpawnLocation).length();
        if (dist < 10 && dist < bestDistance) {
          owner = player;
          bestDistance = dist;
        }
      }
      const turretObject = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[17];
      const objects = this.core.objectManager.getGridArrays(position.x, position.y, turretObject.scale);
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (object.type !== 17) continue;
        const dist = object.position.clone().subtract(position).length();
        if (dist < 10 && dist < bestDistance) {
          owner = object;
          bestDistance = dist;
        }
      }
      tmpObj = new _data_type_Projectile__WEBPACK_IMPORTED_MODULE_2__.Projectile(type, sid, position, spawnTick, direction, range, speed, layer, item.stats.scale, owner);
      if (!despawned) this.projectileList.push(tmpObj);
      if (owner) {
        if (!despawned) {
          owner.ownedProjectiles.push(tmpObj);
        } else {
          this.core.moduleManager.onProjectileEarlyDespawn(_data_type_Projectile__WEBPACK_IMPORTED_MODULE_2__.projectileList[type], position, direction);
        }
        if (owner instanceof _data_type_Player__WEBPACK_IMPORTED_MODULE_1__.Player) {
          if (tmpObj.type === _data_type_Projectile__WEBPACK_IMPORTED_MODULE_2__.Projectiles.TURRET_BULLET.type) {
            owner.inventory.fireTurretGear(this.core.tickEngine.ping);
          } else {
            const weapon = owner.inventory.getWeapon(_data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__.WeaponSlot.SECONDARY) ?? owner.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__.RangedWeapon ? owner.inventory.heldItem : null;
            if (weapon instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_3__.RangedWeapon && weapon !== null) {
              owner.inventory.resetReload(weapon);
            } else {
              owner.inventory.resetAllRangedReloads();
            }
          }
          owner.hasFiredProjectileThisTick = true;
          owner._firedThisTickTempVariable = true;
          owner.lastProjectileFired = tmpObj;
        }
      }
      //const enemy = this.core.playerManager.getVisibleEnemies()[0];
      //console.log("projectile spawned, will hit enemy in " + tmpObj.getTimeToHitTarget(enemy.serverPos, enemy.scale));
    }
  }

  remove(sid, range) {
    if (this.projectileList.hasSid(sid)) {
      //console.log("projectile removed naturally");
      const projectile = this.projectileList.findBySid(sid);
      if (projectile.owner) projectile.owner.ownedProjectiles.remove(projectile);
      this.projectileList.remove(projectile);
    } else {
      //console.log("projectile removed after spawning");
      let i = this.scheduledSpawns.length - 1;
      while (i >= 0) {
        const projectile = this.scheduledSpawns[i];
        if (projectile[6] === sid) {
          projectile[7] = true;
          //this.scheduledSpawns.splice(i, 1);
          break;
        }
        i--;
      }
    }
  }
  getDangerousProjectiles(tickIndex) {
    const myPlayer = this.core.playerManager.myPlayer;
    let projectiles = [];
    for (let i = 0; i < this.projectileList.length; i++) {
      const projectile = this.projectileList[i];
      if (projectile.owner && this.core.playerManager.checkTeam(projectile.owner instanceof _data_type_Player__WEBPACK_IMPORTED_MODULE_1__.Player ? projectile.owner.sid : projectile.owner.owner.sid)) continue;
      if ((_util_MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].getDistance(myPlayer.serverPos, projectile.spawnPos.clone().directionMove(projectile.dir, projectile.getTicksExisted(tickIndex) * _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_4__.TickEngine.TICK_DELTA * projectile.speed)) - myPlayer.scale * 2 - myPlayer.scale) / projectile.speed <= _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_4__.TickEngine.TICK_DELTA) {
        projectiles.push(projectile);
      }
    }
    return projectiles;
  }
}

/***/ }),

/***/ "./frontend/src/render/BuildingVisualisationModule.ts":
/*!************************************************************!*\
  !*** ./frontend/src/render/BuildingVisualisationModule.ts ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BuildingVisualisationModule)
/* harmony export */ });
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _manager_ObjectManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../manager/ObjectManager */ "./frontend/src/manager/ObjectManager.ts");
/* harmony import */ var _RenderManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RenderManager */ "./frontend/src/render/RenderManager.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_manager_ObjectManager__WEBPACK_IMPORTED_MODULE_1__]);
_manager_ObjectManager__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



class BuildingVisualisationModule extends _RenderManager__WEBPACK_IMPORTED_MODULE_2__.Renderer {
  //private shadows: Record<string, HTMLCanvasElement>;
  //private mouse: Vev;

  constructor(renderManager, core) {
    super(renderManager, core);

    //this.shadows = {};
    //this.mouse = new Vector();

    /*this.renderManager.on("mousemove", event => {
        this.mouse = new Vector(event.clientX, event.clientY);
    });*/
  }

  load() {
    return Promise.resolve();
  }
  render(delta) {
    const camera = this.renderManager.cameraPosition;
    const myPlayer = this.core.playerManager.myPlayer;
    const objects = this.core.objectManager.getVisibleBuildings(myPlayer.renderPos, camera).concat(this.core.objectManager.predictedPlacements);
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      const objectRenderPosition = this.renderManager.mapToContext(this.renderManager.cameraPosition, object.position).add(object.wiggle);
      const isPredicted = object instanceof _manager_ObjectManager__WEBPACK_IMPORTED_MODULE_1__.PredictedPlacement;
      const isNaturalObject = object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_0__.NaturalObject;
      const isTeamBuilding = object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_0__.PlayerBuilding && this.core.playerManager.checkTeam(object.owner.sid);
      if (!isPredicted) continue;

      //this.renderManager.context.save();
      this.renderManager.context.moveTo(objectRenderPosition.x, objectRenderPosition.y);
      this.renderManager.context.beginPath();
      this.renderManager.context.arc(objectRenderPosition.x, objectRenderPosition.y, object.getScale(), 0, Math.PI * 2);
      this.renderManager.context.fillStyle = isPredicted ? "rgba(20, 251, 255, 0.3)" : isNaturalObject ? "rgba(37, 14, 18, 0.3)" : isTeamBuilding ? "rgba(92, 129, 50, 0.3)" : "rgba(129, 53, 50, 0.3)";
      this.renderManager.context.fill();
      //this.renderManager.context.restore();

      /*this.renderManager.context.save();
      this.renderManager.context.translate(objectRenderPosition.x, objectRenderPosition.y);
      this.renderManager.context.rotate(object.dir);
      this.renderManager.context.drawImage(sprite, sprite.width / -2, sprite.height / -2);
      this.renderManager.context.restore();*/
    }
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
class InterfaceModule {
  constructor(core, renderManager, position, dimensions) {
    this.core = core;
    this.renderManager = renderManager;
    this.position = position;
    this.dimensions = dimensions;
  }
}

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




class Renderer {
  constructor(renderManager, core) {
    this.renderManager = renderManager;
    this.core = core;
  }
}
class RenderManager extends tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  canvasVertices = [new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"]()];
  constructor(core, canvas, width, height) {
    super();
    this.core = core;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.transformMatrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    this.defaultMatrix = new DOMMatrixReadOnly([1, 0, 0, 1, 0, 0]);
    this.viewport = {
      width,
      height
    };
    this.cameraPosition = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](14400 / 2, 14400 / 2);
    this.staticCamera = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](14400 / 2, 14400 / 2);
    this.renderers = new Map();
    this.interfaceRenderers = new Map();
    this.lastRender = 0;
    const resizeListener = () => {
      //canvas.width = window.innerWidth;
      //canvas.height = window.innerHeight;
      this.updateTransformMatrix();
      //this.context.setTransform(this.transformMatrix);
      this.canvasVertices = [this.canvasToContext(this.cameraPosition, 0, 0), this.canvasToContext(this.cameraPosition, window.innerWidth, window.innerHeight)];
    };
    resizeListener();
    window.addEventListener("resize", resizeListener);
    canvas.addEventListener("mousemove", e => this.emit("mousemove", e));
    canvas.addEventListener("mousedown", e => this.emit("mousedown", e));
    canvas.addEventListener("mouseup", e => this.emit("mouseup", e));
  }
  updateCamera(delta, targetPosition) {
    const distance = _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDistance(this.cameraPosition, targetPosition);
    const direction = _util_MathUtil__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection(this.cameraPosition, targetPosition);
    const speed = distance * 0.01 * delta;
    if (distance > 0.05) {
      this.cameraPosition.directionMove(direction, speed);
    } else {
      this.cameraPosition.set(targetPosition);
    }
    this.staticCamera.set(targetPosition);
    this.core.playerManager.playerList.forEach(player => {
      if (player.visible) {
        if (player.forcePos && !player.renderPos.isNaN()) {
          player.renderPos.set(player.serverPos);
        } else {
          // lerp position
          player.dt += delta;
          const overTick = Math.min(1.7, player.dt / 170);
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

  updateTransformMatrix() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let scale = Math.max(windowWidth / this.viewport.width, windowHeight / this.viewport.height);
    this.transformMatrix.a = this.transformMatrix.d = scale;
    this.transformMatrix.e = (windowWidth - this.viewport.width * scale) / 2;
    this.transformMatrix.f = (windowHeight - this.viewport.height * scale) / 2;
  }
  clear() {
    this.context.clearRect(this.canvasVertices[0].x, this.canvasVertices[0].y, this.canvasVertices[1].x - this.canvasVertices[0].x, this.canvasVertices[1].y - this.canvasVertices[0].y);
  }
  render() {
    if (!this.core.loaded) return;
    const currentMs = Date.now();
    const delta = currentMs - this.lastRender;
    this.lastRender = currentMs;
    const myPlayer = this.core.playerManager.myPlayer;
    if (myPlayer && myPlayer.renderPos) {
      this.updateCamera(delta, /*new Vector(myPlayer.renderPos.x, myPlayer.renderPos.y)*/myPlayer.renderPos);
      //console.log(myPlayer.renderPos);
    }

    //this.clear();
    this.renderers.forEach(renderer => {
      renderer.render(delta);
    });
    this.interfaceRenderers.forEach(renderer => {
      renderer.render(delta);
    });
    this.core.moduleManager.onRender(delta);
  }
  async createRenderer(id, rendererClass, core) {
    const instance = new rendererClass(this, core);
    await instance.load();
    this.renderers.set(id, instance);
  }
  async createInterfaceRenderer(id, rendererClass, core) {
    this.interfaceRenderers.set(id, new rendererClass(core, this));
  }
  createRenderHook() {
    this.lastRender = Date.now();
    const _ = this;
    const originalAnimFrame = window.requestAnimationFrame;
    window.requestAnimFrame = window.requestAnimationFrame = function (callback) {
      // call moomoo's renderer
      const result = originalAnimFrame.call(this, callback);
      // then call our renderer
      _.render();
      // and finally return result from moomoo's renderer
      return result;
    };
    originalAnimFrame(() => this.render());
  }
  getCameraOffset(camera) {
    return camera.clone().subtract(this.viewport.width / 2, this.viewport.height / 2);
  }
  /**
   * Projects given position from the map onto the canvas
   */
  mapToContext(camera, param1, param2) {
    const offset = this.getCameraOffset(camera);
    if (typeof param1 === "object") {
      return param1.clone().subtract(offset);
    } else {
      return new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"](param1 - offset.x, param2 - offset.y);
    }
  }
  /**
   * Gives mouse map position from the mouse position on canvas
   */
  canvasToMap(camera, param1, param2) {
    const offset = this.getCameraOffset(camera);
    if (typeof param1 === "object") {
      return param1.clone().subtract(this.transformMatrix.e, this.transformMatrix.f).divide(this.transformMatrix.a, this.transformMatrix.d).add(offset);
    } else {
      return new _util_type_Vector__WEBPACK_IMPORTED_MODULE_3__["default"]((param1 - this.transformMatrix.e) / this.transformMatrix.a + offset.x, (param2 - this.transformMatrix.f) / this.transformMatrix.d + offset.y);
    }
  }
  canvasToContext(camera, param1, param2) {
    if (typeof param1 === "object") {
      return this.mapToContext(camera, this.canvasToMap(camera, param1));
    } else {
      return this.mapToContext(camera, this.canvasToMap(camera, param1, param2));
    }
  }
}

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




class PacketCountModule extends _InterfaceModule__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(core, renderManager) {
    super(core, renderManager, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](10, 10), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](200, 18));
  }
  render(delta) {
    const position = this.renderManager.canvasToContext(this.renderManager.staticCamera, this.position);
    const packetPercent = this.core.packetEngine.packetCount2 / _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_1__.PacketCountEngine.PACKET_LIMIT2;
    _util_DrawUtil__WEBPACK_IMPORTED_MODULE_0__["default"].progressBar(this.renderManager.context, packetPercent, position.x, position.y, this.dimensions.x, this.dimensions.y, "#ff0004", "#474232", Math.round(packetPercent * 100) + "%", "#ffffff", "18px Hammersmith One");
  }
}

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




class PacketGraphModule extends _InterfaceModule__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(core, renderManager) {
    super(core, renderManager, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](10, 43), new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__["default"](200, 170));
    this.graphValues = [];
  }
  render(delta) {
    const position = this.renderManager.canvasToContext(this.renderManager.staticCamera, this.position);
    this.graphValues.push(this.core.packetEngine.packetCount);
    if (this.graphValues.length > 320) this.graphValues.shift();
    _util_DrawUtil__WEBPACK_IMPORTED_MODULE_0__["default"].graph(this.renderManager.context, position.x, position.y, this.dimensions.x, this.dimensions.y, this.graphValues, _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_1__.PacketCountEngine.PACKET_LIMIT, 20, "#ffffff", 2, "#ffffff", 4, this.core.packetEngine.stats_pps_graph, "16px Hammersmith One", 16, true);
  }
}

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
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _event_EventPacket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../event/EventPacket */ "./frontend/src/event/EventPacket.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
/* harmony import */ var _packets_Packet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _packets_PacketFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./packets/PacketFactory */ "./frontend/src/socket/packets/PacketFactory.ts");





// FOR TESTING ON LOCALHOST
if (window.location.host === "127.0.0.1") {
  eval(`window.WebSocket = class {
        constructor(url, protocols) {
        }

        set onopen(callback) {
            window.eventbridge.onopen = callback;
        }

        set onmessage(callback) {
            console.log("setting onmessage");
            window.eventbridge.onmessage = callback;
        }

        addEventListener(type, callback) {
            window.eventbridge.addEventListener(type, callback);
        }

        close(reason) {
            window.eventbridge.close(reason);
        }

        send(msg) {
            window.eventbridge.send(msg);
        }

        get readyState() {
            return 1;
        }
    };`);
}
// FOR TESTING ON LOCALHOST

const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_2__["default"]("connection");
let connection;
const packetFactory = _packets_PacketFactory__WEBPACK_IMPORTED_MODULE_4__.PacketFactory.getInstance();
class Connection extends (events__WEBPACK_IMPORTED_MODULE_0___default()) {
  constructor() {
    super();
    this.socket = null;
    this.defaultReceiver = null;
    Object.defineProperty(window, "connection", {
      value: this
    });
  }
  bundleSend(type, data) {
    if (this.socket && this.socket.readyState == 1) {
      this.socket.bundleSend(type, data);
    }
  }
  injectSocket(socket) {
    this.socket = socket;
  }
  sendRaw(id, ...data) {
    if (this.socket && this.socket.readyState == 1) {
      this.socket.send(packetFactory.serializePacket(new _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_packets_PacketFactory__WEBPACK_IMPORTED_MODULE_4__.reversePacketTypeMapping.find(mapping => (mapping.side === _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Side.ServerBound || mapping.side === _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Side.BiDirectional) && mapping.value === id).type, data)));
    }
  }
  sendWMeta(packet, meta) {
    if (this.socket && this.socket.readyState == 1) {
      this.socket.sendWMeta(packetFactory.serializePacket(packet), meta);
    }
  }
  send(packet, force) {
    if (this.socket && this.socket.readyState == 1) {
      this.socket.send(packetFactory.serializePacket(packet), force);
    }
  }
}
;
connection = new Connection();
class Injection extends WebSocket {
  constructor(url, protocols) {
    super(url, protocols);
    if (connection.socket) return;

    // initialize connection and message handler
    connection.injectSocket(this);
    this.addEventListener("open", function () {
      logger.info("connection injected");
      connection.emit("ready");
    });
    this.addEventListener("close", function (event) {
      logger.info("connection closed");
      connection.emit("close", event.reason);
    });
    this.addEventListener("message", function ({
      data: buffer
    }) {
      //try {
      const event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_1__["default"](packetFactory.deserializePacket(buffer, _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Side.ClientBound, Date.now()), false);
      connection.emit("packetreceive", event);
      if (event.isCanceled()) return;
      const serialized = packetFactory.serializePacket(event.getPacket());
      if (connection.defaultReceiver) {
        connection.defaultReceiver(new Proxy(new MessageEvent(""), {
          get(target, property, receiver) {
            if (property === "data") return serialized;
            if (property === "name") return undefined;
            return target[property];
          }
        }));
      } else {
        logger.warn("default receiver is null! this should not happen!");
      }
      /*} catch (err) {
          logger.error(err);
      }*/
    });

    Object.defineProperty(this, "onmessage", {
      get() {
        return null;
      },
      set(func) {
        connection.defaultReceiver = func;
      }
    });
  }
  send(data, force) {
    if (force) return super.send(data);
    const event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_1__["default"](packetFactory.deserializePacket(data, _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Side.ServerBound, Date.now()), false);
    connection.emit("packetsend", event);
    if (!event.isCanceled()) {
      connection.emit("packetsendp", event.getPacket());
      super.send(packetFactory.serializePacket(event.getPacket()));
      if (event.callback) event.callback();
    }
  }
  bundleSend(type, data) {
    const event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_1__["default"](new _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_packets_PacketFactory__WEBPACK_IMPORTED_MODULE_4__.reversePacketTypeMapping.find(mapping => (mapping.side === _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Side.ServerBound || mapping.side === _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Side.BiDirectional) && mapping.value === type).type, data), true);
    connection.emit("packetsend", event);
    if (!event.isCanceled()) {
      connection.emit("packetsendp", event.getPacket());
      super.send(packetFactory.serializePacket(event.getPacket()));
      if (event.callback) event.callback();
    }
  }
  sendWMeta(data, meta) {
    const event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_1__["default"](packetFactory.deserializePacket(data, _packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Side.ServerBound, Date.now()), false);
    connection.emit("packetsend", event, meta);
    if (!event.isCanceled()) {
      connection.emit("packetsendp", event.getPacket());
      super.send(packetFactory.serializePacket(event.getPacket()));
      if (event.callback) event.callback();
    }
  }
}
function inject() {
  const originalWebSocket = WebSocket;
  Object.defineProperty(window, "WebSocket", {
    get() {
      // COMMENTED ONLY FOR TESTING ON LOCAL!!! UNCOMMENT IN PRODUCTION!!
      /*const caller = ErrorStackParser.parse(new Error())[1];
            const allowedFunctions = ["Object.connect", "connect"]
        const fileName = /(?:(?:http|https):\/\/(?:sandbox\.|dev\.)?moomoo\.io\/(?:bundle\.js| line 1 > injectedScript line \d+ > Function)|\(unknown source\)\)|:\d+)/g;
      const functionName = /Object\.connect|connect/g
        if (!caller.fileName || !caller.functionName || !fileName.test(caller.fileName) || !functionName.test(caller.functionName)) {
          logger.warn("accessing WebSocket from unkown source:", caller);
          return originalWebSocket;
      }*/
      return Injection;
    },
    set(a) {
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
/* harmony import */ var _data_type_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/type/Player */ "./frontend/src/data/type/Player.ts");
/* harmony import */ var _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main */ "./frontend/src/main.ts");
/* harmony import */ var _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/type/Vector */ "./frontend/src/util/type/Vector.ts");
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/Logger */ "./frontend/src/util/Logger.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_3__]);
_main__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


//import { playerUtil } from "../util/PlayerUtil";






const logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_6__["default"]("packethandler");
let lastPath = 0;
function processIn(packet) {
  switch (packet.type) {
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.PLAYER_ADD:
      const playerData = packet.data[0];
      _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.spawnPlayer(playerData[0], playerData[1], playerData[2], new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](playerData[3], playerData[4]), playerData[5], playerData[6], playerData[7], playerData[8], playerData[9], packet.data[1]);
      if (packet.data[1]) {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.moduleManager.onRespawn();
      }
      break;
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.PLAYER_UPDATE:
      for (let i = 0; i < _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList.length; i++) {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList[i].visible = false;
      }

      //console.log("tick");

      let playersUpdated = [];
      for (let i = 0; i < packet.data[0].length / 13; i++) {
        const playerData = packet.data[0].slice(i * 13, i * 13 + 13);
        const player = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList.findBySid(playerData[0]);
        if (player) {
          player.hasFiredProjectileThisTick = false;
          player.hasAttackedThisTick = false;
          if (player._attackedThisTickTempVariable) {
            player.hasAttackedThisTick = true;
            player._attackedThisTickTempVariable = false;
            const weapon = playerData[4] === -1 ? _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[playerData[5]] : player.inventory.weaponSelected;
            player.inventory.resetReload(weapon);
            player.inventory.updateReloads(_main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.ping);
            player.nextAttack = _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.getTickIndex(Date.now() - _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.ping * 2 + player.inventory.weaponSelected.stats.reloadTime) + 1;
            player.swingStreak++;
            console.log("swing at tick:", _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.tickIndex, "scheduled next:", player.nextAttack);
          }
          if (player._firedThisTickTempVariable) {
            player.hasFiredProjectileThisTick = true;
            player._firedThisTickTempVariable = false;
          }
          if (player === _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer) {

            //if (playerData[10] === 0) console.log("disequip at tick:", core.tickEngine.tickIndex);
          }
          if (player === _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer) {
            //console.log("check tick:", core.tickEngine.tickIndex, "current hat:", playerData[9]);
            //if (window[core.tickEngine.tickIndex] !== playerData[9]) console.log("fail");
          }
          player.updatePlayer(_main__WEBPACK_IMPORTED_MODULE_3__.core, playerData[1], playerData[2], playerData[3], playerData[4], playerData[5], playerData[6], playerData[7], playerData[8], playerData[9], playerData[10], playerData[11], playerData[12]);

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
          playersUpdated.push(player);
        }
      }
      for (let i = 0; i < playersUpdated.length; i++) {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.moduleManager.onPlayerUpdate(playersUpdated[i]);
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
      for (let i = 0; i < packet.data[0].length / 8; i++) {
        const data = packet.data[0].slice(i * 8, i * 8 + 8);
        // type (data[5]) is null for player buildings but set for natural objects
        // id (data[6]) is null for natural objects but is set for player buildings
        // owner sid (data[7]) is -1 for natural objects otherwise is set.
        _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.add(...data);
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
      for (const player of _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList) {
        player.inventory.resetAllRangedReloads();
      }
      console.log("=== DEATH ===");
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
        const player = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList.findBySid(packet.data[0]);
        if (!player) return;
        if (player === _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer) {
          //console.log("hit!: skin=" + player.skinIndex + ", tail=" + player.tailIndex);
        }
        player._attackedThisTickTempVariable = true;
        if (player === _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer) player.justStartedAttacking = false;
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.HEALTH_UPDATE:
      {
        const player = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.playerList.findBySid(packet.data[0]);
        const newHealth = packet.data[1];
        const delta = newHealth - (player instanceof _data_type_Player__WEBPACK_IMPORTED_MODULE_1__.ClientPlayer ? player.packetHealth : player.health);
        const tracker = player.shame;
        if (delta < 0) {
          tracker.lastDamage = Date.now() - _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.ping + _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.pingStd;
        } else if (tracker.lastDamage > 0) {
          if (Date.now() - _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.ping - tracker.lastDamage <= 120) {
            if (tracker.points++ >= 8) {
              tracker.isClowned = true;
              tracker.timer = 30 * 1000;
              tracker.points = 0;
            }
          } else {
            tracker.points = Math.max(0, tracker.points - 2);
          }
          tracker.lastDamage = -1;
          //console.log(`[${tracker.points}] => ${Date.now() - core.tickEngine.ping - tracker.lastDamage}`);
        }

        if (player === _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer) {
          const player = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
          const lastPacketHealth = player.packetHealth;
          player.packetHealth = newHealth;
          if (newHealth < lastPacketHealth) {
            player.health -= lastPacketHealth - player.packetHealth;
          }
          if (player.packetHealth > player.health) {
            logger.warn(_main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.health, "health was not in sync: " + player.health + " -> " + newHealth + ", packet-health: " + player.packetHealth);
            player.health = player.packetHealth;
          }
        } else {
          player.health = newHealth;
          if (newHealth <= 0) player.visible = false;
        }
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.ADD_PROJECTILE:
      {
        const data = packet.data;
        // 2 ticks because:
        // first tick is incremented on tick (projectiles are sent before players)
        // second tick is because projectile will actually spawn on the next tick
        _main__WEBPACK_IMPORTED_MODULE_3__.core.projectileManager.scheduleSpawn(new _util_type_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](data[0], data[1]), data[2], data[3], data[4], data[5], data[6], data[7]);
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.REMOVE_PROJECTILE:
      {
        _main__WEBPACK_IMPORTED_MODULE_3__.core.projectileManager.remove(packet.data[0], packet.data[1]);
        break;
      }
  }
}
function processOut(event, meta) {
  const packet = event.getPacket();
  //console.log(PacketType[packet.type]);
  if (packet.type === _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.ATTACK) {
    //console.trace();
  }
  switch (packet.type) {
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.ATTACK:
      {
        const myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
        const nextPredictableTick = _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.tickIndex + _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.getPingTicks();
        let wasPlace = false;
        if (packet.data[0] === 1) {
          //console.log("attack");
          const heldItem = myPlayer.inventory.heldItem;
          if (!(heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapon)) {
            wasPlace = true;
            if (heldItem.group.id === 0) {
              if (myPlayer.health < 100) {
                myPlayer.health = Math.min(myPlayer.health + heldItem.healAmount, 100);
                myPlayer.inventory.heldItem = myPlayer.inventory.weaponSelected;
              }
              return;
            }
            const blocking = _main__WEBPACK_IMPORTED_MODULE_3__.core.objectManager.getBlockingBuildings([myPlayer.serverPos, myPlayer.scale, packet.data[1] ?? myPlayer.serverDir], heldItem, packet.data[2] ?? []);
            if (blocking.length === 0) {
              myPlayer.inventory.heldItem = myPlayer.inventory.weaponSelected;
              //console.log("placed item. new held:", myPlayer.inventory.heldItem);
              if (meta) {
                event.callback = () => {
                  meta[1](false);
                };
              }
            } else {
              //console.log("blocked", meta);
              if (meta) {
                event.callback = () => {
                  meta[1](true);
                };
              }
            }

            /*if (!meta || blocking.length === 0) {
                if (meta) meta[1](false);
                myPlayer.inventory.heldItem = myPlayer.inventory.weaponSelected;
                console.log("placed item non blocked, now holding item:", myPlayer.inventory.heldItem);
            }*/
          } else {
            myPlayer.isAttacking = true;
            //console.log("started attacking");

            if (packet.data[0] === 1 && myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapon && (myPlayer.swingStreak === 0 || myPlayer.inventory.reloads[myPlayer.inventory.weaponSelected.id] - _main__WEBPACK_IMPORTED_MODULE_3__.core.tickEngine.ping <= 0)) {
              //myPlayer.nextAttack = core.tickEngine.getTickIndex(Date.now() - core.tickEngine.ping + myPlayer.inventory.reloads[myPlayer.inventory.weaponSelected.id]);
              /*if (!core.tickEngine.isTickPredictable(core.tickEngine.tickIndex + 1)) {
                  core.scheduleAction(ActionType.ATTACK, ActionPriority.BIOMEHAT, nextPredictableTick, [1, packet.data[1]], true);
                  isAttackScheduled = nextPredictableTick;
              }*/
              myPlayer.justStartedAttacking = true;
              myPlayer.inventory.resetReload(myPlayer.inventory.heldItem);
              //return false;

              /* leftovers from antireflect */
              /*myPlayer.isAttacking = false;
              myPlayer.isAttackingWhileBlocked = true;
              event.cancel();*/
            }
          }
        } else {
          /*if (!core.tickEngine.isTickPredictable(core.tickEngine.getTickIndex(Date.now() + myPlayer.inventory.reloads[myPlayer.inventory.weaponSelected.id]))) {
              myPlayer.swingStreak = 0;
          }*/
          myPlayer.isAttacking = false;
          myPlayer.isAttackingWhileBlocked = false;
          /*if (event.isBundle) {
              console.log("EVENT HAS BEEN CANCELLED");
              core.scheduleAction(ActionType.ATTACK, ActionPriority.COMPATIBILITY, core.tickEngine.getFirstSchedulableTick(), [0, packet.data[1]]);
              event.cancel();
          }*/
          //console.log("stopped attacking");
          /*if (isAttackScheduled > -1) {
              core.scheduleAction(ActionType.ATTACK, ActionPriority.BIOMEHAT, isAttackScheduled + 1, [0, packet.data[1]], true);
              isAttackScheduled = -1;
          }*/
        }

        if (typeof packet.data[1] === "number") {
          //core.lastActionState.aim = packet.data[1];
          myPlayer.dir = packet.data[1];
        }
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.SELECT_ITEM:
      {
        const myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
        const lastHeldWasWeapon = myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapon;
        const lastHeld = myPlayer.inventory.heldItem.id;
        if (packet.data[1]) {
          myPlayer.inventory.heldItem = _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.weaponList[packet.data[0]];
          //console.log("selecting back to weapon:", myPlayer.inventory.heldItem);
        } else {
          if (!lastHeldWasWeapon && packet.data[0] === lastHeld) {
            //console.log("clicked item twice:", myPlayer.inventory.heldItem, "going to ", myPlayer.inventory.heldItem);
            myPlayer.inventory.heldItem = myPlayer.inventory.weaponSelected;
          } else {
            myPlayer.isAttacking = false;
            myPlayer.inventory.heldItem = _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[packet.data[0]];
            //console.log("selecting item:", myPlayer.inventory.heldItem)
          }
        }
        //console.log("selected item:", myPlayer.inventory.heldItem);
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.AUTO_ATK:
      {
        const myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
        myPlayer.isAutoAttacking = !myPlayer.isAutoAttacking;
        if (myPlayer.isAutoAttacking && myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_5__.Weapon && myPlayer.inventory.reloads[myPlayer.inventory.heldItem.id] === 0) {
          //myPlayer.justStartedAttacking = true;
        }
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.SET_ANGLE:
      {
        //core.lastActionState.aim = packet.data[0];
        _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer.dir = packet.data[0];
        break;
      }
    case _packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.BUY_AND_EQUIP:
      {
        if (packet.data[0] === 0) {
          const myPlayer = _main__WEBPACK_IMPORTED_MODULE_3__.core.playerManager.myPlayer;
          if (packet.data[2] === 0) {
            if (myPlayer.ownedHats.includes(packet.data[1])) myPlayer.skinIndex = packet.data[1];
          } else {
            if (myPlayer.ownedTails.includes(packet.data[1])) myPlayer.tailIndex = packet.data[1];
          }
        }
      }
  }
}
const PacketHandler = {
  processIn,
  processOut
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
  Side[Side["ServerBound"] = 0] = "ServerBound";
  Side[Side["ClientBound"] = 1] = "ClientBound";
  Side[Side["BiDirectional"] = 2] = "BiDirectional";
})(Side || (Side = {}));
class Packet {
  constructor(type, data, time = 0) {
    this.type = type;
    this.data = data;
    this.time = time;
  }
}


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



/**
 * A mapping of PacketTypes to their serialized counterparts
 */

let packetTypeMapping = {};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ATTACK] = {
  value: "c",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.AUTO_ATK] = {
  value: "7",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_ACC_JOIN] = {
  value: "11",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_CREATE] = {
  value: "8",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_KICK] = {
  value: "12",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_REQ_JOIN] = {
  value: "10",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.BUY_AND_EQUIP] = {
  value: "13c",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LEAVE_CLAN] = {
  value: "9",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_MOVE] = {
  value: "33",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SELECT_ITEM] = {
  value: "5",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SELECT_UPGRADE] = {
  value: "6",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SET_ANGLE] = {
  value: "2",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_NOTIFY_SERVER] = {
  value: "14",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SPAWN] = {
  value: "sp",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.WINDOW_FOCUS] = {
  value: "rmd",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ServerBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CHAT] = {
  value: "ch",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.BiDirectional
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PING] = {
  value: "pp",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.BiDirectional
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DEATH] = {
  value: "11",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_LIST] = {
  value: "id",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_ADD] = {
  value: "ac",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_DEL] = {
  value: "ad",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DISCONN] = {
  value: "d",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.GATHER_ANIM] = {
  value: "7",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.HEALTH_UPDATE] = {
  value: "h",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
//packetTypeMapping[PacketType.ITEM_BUY] = { value: "13", side: Side.Client };
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LEADERBOARD_UPDATE] = {
  value: "5",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LOAD_GAME_OBJ] = {
  value: "6",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.MINIMAP] = {
  value: "mm",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ANIMALS_UPDATE] = {
  value: "a",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_REMOVE] = {
  value: "4",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_SET_CLAN] = {
  value: "st",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_START] = {
  value: "1",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_UPDATE] = {
  value: "33",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SET_CLAN_PLAYERS] = {
  value: "sa",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_AGE] = {
  value: "15",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_NOTIFY_CLIENT] = {
  value: "p",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_PLACE_LIMIT] = {
  value: "14",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_ITEMS] = {
  value: "17",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_STORE] = {
  value: "us",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPGRADES] = {
  value: "16",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.WIGGLE] = {
  value: "8",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_ADD] = {
  value: "2",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
// packetTypeMapping[PacketType.PLAYER_ATTACK] = { value: "2", side: Side.Client };
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_STATS] = {
  value: "9",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.IO_INIT] = {
  value: "io-init",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DAMAGE_TEXT] = {
  value: "t",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.JOIN_REQUEST] = {
  value: "an",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.REMOVE_GAME_OBJ] = {
  value: "12",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.REMOVE_ALL_OBJ] = {
  value: "13",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ADD_PROJECTILE] = {
  value: "18",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.REMOVE_PROJECTILE] = {
  value: "19",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.TURRET_SHOOT] = {
  value: "sp",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ANIMAL_ANIMATION] = {
  value: "aa",
  side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.ClientBound
};
let reversePacketTypeMapping = [];
for (let key of Object.keys(packetTypeMapping)) {
  reversePacketTypeMapping.push({
    type: parseInt(key),
    side: packetTypeMapping[key].side,
    value: packetTypeMapping[key].value
  });
}

/**
 * Controls serialization of packets in preparation for exchange, and deserialization on the destination
 */
class PacketFactory {
  /**
   * Get an instance of PacketFactory
   * @returns {PacketFactory} An instance of PacketFactory
   */
  static getInstance() {
    return PacketFactory.instance ? PacketFactory.instance : PacketFactory.instance = new PacketFactory();
  }
  constructor() {}

  /**
   * Serializes a Packet to an ArrayBuffer suitable for transmission
   * @param packet the packet to serialize
   */
  serializePacket(packet) {
    if (!Object.values(_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType).includes(packet.type)) throw new Error("Packet is missing a type.");
    let type;
    if (Object.keys(packetTypeMapping).includes(packet.type.toString())) {
      type = packetTypeMapping[packet.type].value;
    } else {
      throw new Error(`Packet type invalid or not implemented: ${_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType[packet.type]}`);
    }
    try {
      return msgpack_lite__WEBPACK_IMPORTED_MODULE_2__.encode([type, packet.data]);
    } catch (error) {
      throw new Error(`msgpack encountered an error: ${error}`);
    }
  }

  /**
   * Deserializes packets for reading
   * @param buffer an ArrayBuffer to deserialize
   * @param side the recieving side of the packet
   */
  deserializePacket(buffer, side, timeStamp = 0) {
    let array;
    try {
      array = msgpack_lite__WEBPACK_IMPORTED_MODULE_2__.decode(new Uint8Array(buffer));
    } catch (error) {
      throw new Error("Invalid packet");
    }

    //if (side === Side.Client && array[0] !== "33" && array[0] !== "5" && array[0] !== "pp" && array[0] !== "a" && array[0] !== "mm" && array[0] !== "6") console.log(array);

    let packetType;
    let mapping = reversePacketTypeMapping.find(mapping => (mapping.side === side || mapping.side === _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.BiDirectional) && mapping.value === array[0]);
    if (mapping) {
      return new _Packet__WEBPACK_IMPORTED_MODULE_0__.Packet(mapping.type, array[1], timeStamp);
    } else {
      throw new Error(`Failed to deserialize packet because of invalid packet type: ${array[0]}`);
    }
  }
}


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
  PacketType[PacketType["ANIMALS_UPDATE"] = 37] = "ANIMALS_UPDATE";
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
  PacketType[PacketType["REMOVE_PROJECTILE"] = 49] = "REMOVE_PROJECTILE";
  PacketType[PacketType["TURRET_SHOOT"] = 50] = "TURRET_SHOOT";
  PacketType[PacketType["ANIMAL_ANIMATION"] = 51] = "ANIMAL_ANIMATION";
})(PacketType || (PacketType = {}));


/***/ }),

/***/ "./frontend/src/util/AlghoritmUtil.ts":
/*!********************************************!*\
  !*** ./frontend/src/util/AlghoritmUtil.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Credits: ChatGPT with Zaary's assistance
 * https://sharegpt.com/c/3b3zXhq
 */
function allowedAnglesFromBlocked(blocked) {
  const allowed = [];
  const n = blocked.length;
  let start = 0;
  let end = 2 * Math.PI;
  let blockStart, blockEnd;

  // Split blocks that cross 0 into two separate blocks
  const blocks = [];
  for (let i = 0; i < n; i++) {
    blockStart = blocked[i][0];
    blockEnd = blocked[i][1];
    if (blockEnd < blockStart) {
      blocks.push([blockStart, 2 * Math.PI]);
      blocks.push([0, blockEnd]);
    } else {
      blocks.push([blockStart, blockEnd]);
    }
  }

  // Sort blocks by their start angle
  blocks.sort((a, b) => a[0] - b[0]);

  // Create allowed intervals
  for (let i = 0; i < blocks.length; i++) {
    blockStart = blocks[i][0];
    blockEnd = blocks[i][1];
    if (start < blockStart) {
      allowed.push([start, blockStart]);
    }
    start = blockEnd;
  }
  if (start < end) {
    allowed.push([start, end]);
  }
  return allowed;
}

/**
 * Credits: Base by ChatGPT, 2 * PI wrapping added by Zaary
 */
function mergeArcsCartesian(arcs) {
  // sort arcs by starting angle in ascending order
  arcs.sort((a, b) => a[0] - b[0]);

  // initialize merged arcs with the first arc in the sorted array
  let mergedArcs = [arcs[0]];

  // loop through the rest of the arcs
  for (let i = 1; i < arcs.length; i++) {
    // get the last merged arc
    let lastArc = mergedArcs[mergedArcs.length - 1];

    // check if the current arc overlaps with the last merged arc
    if (arcs[i][0] <= lastArc[1]) {
      // update the end angle of the last merged arc to be the maximum of the two end angles
      lastArc[1] = Math.max(lastArc[1], arcs[i][1]);

      // replace the last merged arc with the updated arc
      mergedArcs[mergedArcs.length - 1] = lastArc;
    } else if (arcs[i][1] >= Math.PI * 2 && arcs[i][1] % (Math.PI * 2) >= mergedArcs[0][0]) {
      mergedArcs[0][0] = arcs[i][0];
    } else {
      // add the current arc to the merged arcs array if it does not overlap with the last merged arc
      mergedArcs.push(arcs[i]);
    }
  }

  // return the merged arcs array
  return mergedArcs;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  allowedAnglesFromBlocked,
  mergeArcsCartesian
});

/***/ }),

/***/ "./frontend/src/util/ArrayUtil.ts":
/*!****************************************!*\
  !*** ./frontend/src/util/ArrayUtil.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function mapTupleArray(array, mapFunc) {
  return array.map(value => [mapFunc(value[0]), mapFunc(value[1])]);
}

/*

UNFINISHED!

function mapRecursive<T>(array: T[], mapFunc: any) {
    return array.map(function(element) {
        if (Array.isArray(element)) {
            return mapArrayValues(element, mapFunc);
        } else {
            return mapFunc(element);
        }
    });
}

*/

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mapTupleArray
  //mapRecursive
});

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

function progressBar(context, currentProgress, x, y, width, height, barFillColor, emptyFillColor, text, textFillColor, textFont) {
  context.save();
  context.beginPath();
  if (!emptyFillColor) emptyFillColor = 'black';
  if (!barFillColor) barFillColor = 'white';
  var radius = height / 2;
  const halfradians = 2 * Math.PI / 2;
  const quarterradians = 2 * Math.PI / 4;
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
function graph(context, x, y, width, height, data, maxValue, step, baseColor, baseLineWidth, lineColor, lineLineWidth, statsData, statsFont, statsFontHeight, strokeStats, statsStrokeColor = "#000000", statsFillColor = "#ffffff") {
  context.save();
  context.strokeStyle = baseColor;
  context.lineWidth = baseLineWidth;
  context.beginPath();
  context.rect(x, y, width, height);
  context.stroke();
  const rows = Math.ceil(maxValue / step);
  for (let i = 0; i < rows; i++) {
    const of = i / rows * height;
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
  for (let i = 0; i < data.length; i++) {
    const val = data[i];
    const xPos = x + i / data.length * width;
    const yPos = y + (1 - val / maxValue) * height;
    context.lineTo(xPos, yPos);
  }
  context.stroke();
  if (statsFont !== undefined && statsFontHeight !== undefined && strokeStats !== undefined) {
    context.font = statsFont;
    const avg = _MathUtil__WEBPACK_IMPORTED_MODULE_0__["default"].averageOfArray(statsData).toFixed(2);
    const max = Math.max(...statsData);
    const yPos = y + height + statsFontHeight / 2 + 3;
    context.strokeStyle = statsStrokeColor;
    context.fillStyle = statsFillColor;
    context.textAlign = "start";
    if (strokeStats) context.strokeText(`Avg: ${avg}`, x, yPos);
    context.fillText(`Avg: ${avg}`, x, yPos);
    const maxText = `Max: ${max}`;
    const textwidth = context.measureText(maxText);
    if (strokeStats) context.strokeText(maxText, x + width - textwidth.width, yPos);
    context.fillText(maxText, x + width - textwidth.width, yPos);
  }
  context.restore();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  progressBar,
  graph
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
var Level;
(function (Level) {
  Level[Level["LOG"] = 0] = "LOG";
  Level[Level["INFO"] = 1] = "INFO";
  Level[Level["WARN"] = 2] = "WARN";
  Level[Level["ERROR"] = 3] = "ERROR";
  Level[Level["TRACE"] = 4] = "TRACE";
})(Level || (Level = {}));
const LogLevel = new Map();
LogLevel.set(Level.LOG, "LOG");
LogLevel.set(Level.INFO, "INFO");
LogLevel.set(Level.WARN, "WARN");
LogLevel.set(Level.ERROR, "ERROR");
LogLevel.set(Level.TRACE, "TRACE");
function format(loggerId, level, ...msg) {
  return [`NVR | ${loggerId}: [${LogLevel.get(level)}] ->`].concat(msg);
}
class Logger {
  constructor(arg0, arg1) {
    this.id = typeof arg0 == "string" ? arg0 : arg1;
    this.profilers = new Map();
    this.console = typeof arg0 == "object" ? arg0 : window.console;
  }
  log(...message) {
    this.console.log(...format(this.id, Level.LOG, ...message));
  }
  info(...message) {
    this.console.info(...format(this.id, Level.INFO, ...message));
  }
  warn(...message) {
    this.console.warn(...format(this.id, Level.WARN, ...message));
  }
  error(...message) {
    this.console.error(...format(this.id, Level.ERROR, ...message));
  }
  trace(...message) {
    this.console.trace(...format(this.id, Level.TRACE, ...message));
  }
  profile(profileId, ...message) {
    if (this.profilers.has(profileId)) {
      this.console.log(...format(this.id, Level.LOG, ...message, `(took ${Date.now() - this.profilers.get(profileId)} ms)`));
      this.profilers.delete(profileId);
    } else {
      this.profilers.set(profileId, Date.now());
    }
  }
}
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
  let mix = [];
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
  let a = 0;
  for (let i = 0; i < array.length; i++) a += array[i];
  return a;
}
function roundTo(value, places) {
  const placesMlt = places * 10;
  return Math.round(value * placesMlt) / placesMlt;
}
function lineSpan(origin, p1, p2) {
  var AB = Math.sqrt(Math.pow(origin.x - p1.x, 2) + Math.pow(origin.y - p1.y, 2));
  var BC = Math.sqrt(Math.pow(origin.x - p2.x, 2) + Math.pow(origin.y - p2.y, 2));
  var AC = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}
function lineInRectMooMoo(recX, recY, recX2, recY2, x1, y1, x2, y2) {
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
}
function getTangentSpanIntersectionRadius(distanceToTarget, targetScale, intersectionRadius) {
  return Math.acos((targetScale ** 2 - distanceToTarget ** 2 - intersectionRadius ** 2) / (-2 * distanceToTarget * intersectionRadius));
}
function getTangentSpanSimple(distanceToTarget, targetScale) {
  const tangentDistance = Math.sqrt(Math.pow(distanceToTarget, 2) - Math.pow(targetScale, 2));
  return Math.atan(targetScale / tangentDistance);
}
function willTargetBeHit(source, targetPosition, targetSize, shotAngle) {
  // Calculate the distance from the observer to the target
  const distanceToTarget = getDistance(source, targetPosition);

  // Calculate the tangent span of the target
  const tangentSpan = getTangentSpanSimple(distanceToTarget, targetSize);

  // Calculate the angle from the observer to the target
  const angleToTarget = getDirection(source, targetPosition);

  // Calculate the difference between the shot angle and the angle to the target
  const angleDifference = getAngleDist(angleToTarget, shotAngle);

  // Check if the shot angle is within the tangent span of the target
  return angleDifference <= tangentSpan;
}

// no one knows how much these functions mean to me me (i literally spent several hours figuring this shit out and raging multiple times)
function polarToCartesian(angle) {
  return angle < 0 && angle > -Math.PI ? -angle : Math.PI * 2 - angle;
}
function cartesianToPolar(angle) {
  return angle > Math.PI ? Math.PI * 2 - angle : -angle;
}
function clampPolar(angle) {
  return angle >= -Math.PI && angle <= Math.PI ? angle : angle < -Math.PI ? angle + 2 * Math.PI : angle - 2 * Math.PI;
}
function clampCartesian(angle) {
  return angle >= 0 && angle <= 2 * Math.PI ? angle : angle < 0 ? angle + 2 * Math.PI : angle - 2 * Math.PI;
}
function middleOfCartesianArc(angles) {
  let startAngle = angles[0];
  let endAngle = angles[1];
  if (endAngle < startAngle) {
    endAngle += 2 * Math.PI;
  }
  return (startAngle + (endAngle - startAngle) / 2) % (Math.PI * 2);
}

/*
function angleToUnitCircle(angle: number) {
	var unitAngle;
	if (angle >= 0 && angle <= Math.PI) {
	  	unitAngle = angle;
	} else {
	  	unitAngle = Math.PI * -2 + angle;
	}
	return unitAngle;
}


function clampUnitCircleAngle(angle: number) {
	angle %= Math.PI * 2;
	if (angle < -Math.PI) {
		return angle + Math.PI * 2;
	} else if (angle > Math.PI) {
		return angle - Math.PI * 2;
	}
	return angle;
}

function unitCircleAngleToFull(angle: number) {
	if (angle < 0) {
		return angle + Math.PI * 2;
	} else {
		return angle;
	}
}
*/

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randInt,
  randFloat,
  lerp,
  decel,
  getDistance,
  getDirection,
  getAngleDist,
  lerpAngle,
  combineColors,
  averageOfArray,
  roundTo,
  lineSpan,
  lineInRectMooMoo,
  sumArray,
  getTangentSpanIntersectionRadius,
  getTangentSpanSimple,
  willTargetBeHit,
  polarToCartesian,
  cartesianToPolar,
  clampPolar,
  clampCartesian,
  middleOfCartesianArc
});

/***/ }),

/***/ "./frontend/src/util/PredictionUtil.ts":
/*!*********************************************!*\
  !*** ./frontend/src/util/PredictionUtil.ts ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/type/GameObject */ "./frontend/src/data/type/GameObject.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../main */ "./frontend/src/main.ts");
/* harmony import */ var _engine_TickEngine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./engine/TickEngine */ "./frontend/src/util/engine/TickEngine.ts");
/* harmony import */ var _MathUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MathUtil */ "./frontend/src/util/MathUtil.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_2__]);
_main__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function futureDistance(p1, p2, atTick = _main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.getFirstSchedulableTick()) {
  return _MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(futurePosition(p1, atTick), futurePosition(p2, atTick));
}
function futureDirection(from, to, atTick = _main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.getFirstSchedulableTick()) {
  return _MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDirection(futurePosition(from, atTick), futurePosition(to, atTick));
}
function futurePosition(p, atTick = _main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.getFirstSchedulableTick(), checkSpikes = false) {
  // fut TODO: account for snow biome slowdown
  // fut TODO: use physics simulation to predict collisions in more further future (but it loses point as time goes further)

  const ticks = atTick - _main__WEBPACK_IMPORTED_MODULE_2__.core.tickEngine.tickIndex;
  const speed = _data_moomoo_config__WEBPACK_IMPORTED_MODULE_0__["default"].playerSpeed * (p.hatTracker.currentHat?.spdMult ?? 1) * (p.hatTracker.currentTail?.spdMult ?? 1) * _engine_TickEngine__WEBPACK_IMPORTED_MODULE_3__.TickEngine.TICK_DELTA;
  // -speed for when player counterstrafes all the ticks
  return p.serverPos.clone().add(p.velocity.clone().move(-speed).multiply(ticks));
}
function simulatePhysics(p, tickCount) {
  const velocityLength = p.velocity.length();
  const collisionDepth = Math.min(4, Math.max(1, Math.round(velocityLength / 40)));
  const multiplier = 1 / collisionDepth;
  const velocity = p.velocity.clone().multiply(_engine_TickEngine__WEBPACK_IMPORTED_MODULE_3__.TickEngine.TICK_DELTA).multiply(multiplier);
  const predictedPos = p.serverPos.clone();
  for (let i = 0; i < collisionDepth; i++) {
    predictedPos.add(velocity);
    const objects = _main__WEBPACK_IMPORTED_MODULE_2__.core.objectManager.getGridArrays(predictedPos.x, predictedPos.y, p.scale);
    for (let j = 0; j < objects.length; j++) {
      const object = objects[j];
      if (!(object instanceof _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.PlayerBuilding) || !object.stats.dmg) continue;
      solveCollision(p, objects[j], predictedPos);
    }
  }
}
function solveCollision(p, object, posVec, velVec) {
  const collisionDist = p.scale + object.getScale();
  const dist = _MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDistance(posVec, object.position);
  const straightAngle = _MathUtil__WEBPACK_IMPORTED_MODULE_4__["default"].getDirection(object.position, posVec);
  if (dist >= collisionDist) return;

  // first stage (applies to any object)
  posVec.set(object.position.clone().directionMove(straightAngle, collisionDist));
  velVec.multiply(0.75);

  // applies only to spikes
  velVec.directionMove(straightAngle, 1.5);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  futureDistance,
  futureDirection,
  futurePosition
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
  randomString,
  escapeRegex
  //validVariableCharRegex
});

/***/ }),

/***/ "./frontend/src/util/engine/InteractionEngine.ts":
/*!*******************************************************!*\
  !*** ./frontend/src/util/engine/InteractionEngine.ts ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InteractionEngine)
/* harmony export */ });
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsee */ "./node_modules/tsee/lib/index.js");
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsee__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/type/Weapon */ "./frontend/src/data/type/Weapon.ts");
/* harmony import */ var _features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/modules/building/AntiTrap */ "./frontend/src/features/modules/building/AntiTrap.ts");
/* harmony import */ var _features_modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/modules/player/AutoHat */ "./frontend/src/features/modules/player/AutoHat.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../socket/packets/Packet */ "./frontend/src/socket/packets/Packet.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_2__, _features_modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_3__]);
([_features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_2__, _features_modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







class InteractionEngine extends tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  constructor(core) {
    super();
    this.core = core;
    this.autoHatModule = core.moduleManager.getModule(_features_modules_player_AutoHat__WEBPACK_IMPORTED_MODULE_3__["default"]);
    this.antiTrapModule = core.moduleManager.getModule(_features_modules_building_AntiTrap__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }
  safePlacement(item, angle) {
    const canPlace = this.core.objectManager.canPlaceObject([this.core.playerManager.myPlayer.serverPos, 35, angle], item, true);
    if (canPlace) {
      this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
      this.vanillaPlaceItem(item, angle);
    }
  }
  safePlacementIgnoring(item, angle, ignore) {
    const canPlace = this.core.objectManager.canPlaceObject([this.core.playerManager.myPlayer.serverPos, 35, angle], item, true, [ignore.sid]);
    if (canPlace) {
      this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
      this.vanillaPlaceItem(item, angle, [ignore.sid]);
    }
  }
  vanillaPlacementAddingPrediction(item, angle) {
    this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
    this.vanillaPlaceItem(item, angle);
  }
  vanillaUseFoodItem(item, isLastHeal) {
    const myPlayer = this.core.playerManager.myPlayer;
    const wasAttacking = myPlayer.isAttacking;
    const oldAngle = myPlayer.dir;
    const lastHeldWasWeapon = myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__.Weapon;
    const lastHeldItem = myPlayer.inventory.heldItem.id;
    if (lastHeldWasWeapon || lastHeldItem !== item.id) {
      _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.SELECT_ITEM, [item.id, false]));
    }
    _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.ATTACK, [1, null]));
    if (isLastHeal && (wasAttacking || this.core.mstate.mouseHeld) || this.antiTrapModule.isBreaking) _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.ATTACK, [1, oldAngle]));
  }
  vanillaPlaceItem(item, angle, ignoredSids) {
    const myPlayer = this.core.playerManager.myPlayer;
    const wasAttacking = myPlayer.isAttacking;
    const oldAngle = this.core.lastActionState.aim;
    const lastHeld = myPlayer.inventory.heldItem.id;
    const lastHeldWasWeapon = myPlayer.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_1__.Weapon;
    this.autoHatModule.isPlacing = true;
    if (lastHeldWasWeapon || lastHeld !== item.id) {
      //console.log(lastHeld, lastHeldWasWeapon);
      _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.SELECT_ITEM, [item.id, false]));
    }
    _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.sendWMeta(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.ATTACK, [1, angle]), [[], wasBlocked => {
      //if (wasBlocked) {
      _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.SELECT_ITEM, [lastHeld, lastHeldWasWeapon]));
      this.autoHatModule.isPlacing = false;
      //}

      //console.log(wasAttacking, this.core.mstate.mouseHeld);
      if ((wasAttacking || this.core.mstate.mouseHeld) && !this.antiTrapModule.getterIsFirstHit) {
        _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.ATTACK, [1, oldAngle]));
      } else if (this.core.lastActionState.attack === 1) {
        _socket_Connection__WEBPACK_IMPORTED_MODULE_4__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_5__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_6__.PacketType.ATTACK, [0, oldAngle]));
      }
    }]);

    /*const wasAttacking = myPlayer.isAttacking;
    const lastHeldWasWeapon = myPlayer.inventory.heldItem instanceof Weapon;
    const lastHeldItem = myPlayer.inventory.heldItem.id;
    const oldAngle = myPlayer.serverDir;
      if (lastHeldWasWeapon || lastHeldItem !== item.id) {
        //console.log(lastHeldItem + " !== " + item.id, "switching to", item.id);
        connection.send(new Packet(PacketType.SELECT_ITEM, [item.id, false]));
    }
    
    connection.sendWMeta(new Packet(PacketType.ATTACK, [1, angle]), [ignoredSids, (isBlocked: boolean) => {
        if ((isBlocked && lastHeldWasWeapon) || (lastHeldItem !== myPlayer.inventory.heldItem.id && lastHeldWasWeapon !== myPlayer.inventory.heldItem instanceof Weapon)) connection.send(new Packet(PacketType.SELECT_ITEM, [lastHeldItem, isBlocked ? true : lastHeldWasWeapon]));
    }]);
      connection.send(new Packet(PacketType.ATTACK, [+(wasAttacking || this.core.mstate.mouseHeld), oldAngle]));*/
    //this.core.scheduleAction(ActionType.ATTACK, ActionPriority.COMPATIBILITY, this.core.tickEngine.getNextPredictableTick(), [+(wasAttacking || this.core.mstate.mouseHeld), oldAngle])
    //connection.send(new Packet(PacketType.ATTACK, [+(wasAttacking || this.core.mstate.mouseHeld), oldAngle]));
    //connection.send(new Packet(PacketType.SET_ANGLE, [oldAngle]));
    // TODO: switch to last item instead of primary weapon
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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



const logger = new _Logger__WEBPACK_IMPORTED_MODULE_2__["default"]("packet-engine");
class PacketCountEngine extends tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  static TIMER_MAX = 1 * 1000; // 5400 per minute
  static SAFETY = 15;
  static PACKET_LIMIT = 120;
  static PACKET_LIMIT2 = 5400;
  //private static AVAILABLE = PacketCountEngine.PACKET_LIMIT - 750;

  constructor(core) {
    super();
    this.started = false;
    this.timer = PacketCountEngine.TIMER_MAX;
    this.packetCount = 1;
    this.s60Counter = 0;
    this.packetCount2 = 1;
    this.stats_pps_graph = [];
    const start = () => {
      this.timer = PacketCountEngine.TIMER_MAX;
      this.packetCount = 1;
      this.s60Counter = 0;
      this.packetCount2 = 1;
      core.on("update", delta => {
        if (this.timer - delta <= PacketCountEngine.TIMER_MAX * -0.5) {
          this.packetCount = 0;
          this.timer = PacketCountEngine.TIMER_MAX - delta % PacketCountEngine.TIMER_MAX;
          logger.log(`compensated for delta excession (${delta} ms)`);
          this.s60Counter += Math.floor(delta / 1000);
        } else {
          this.timer -= delta;
        }
        if (this.timer <= -PacketCountEngine.SAFETY) {
          const excession = this.timer * -1 % PacketCountEngine.TIMER_MAX - PacketCountEngine.SAFETY;
          this.timer = PacketCountEngine.TIMER_MAX - excession;
          this.stats_pps_graph.push(this.packetCount);
          if (this.stats_pps_graph.length > 60) this.stats_pps_graph.shift();
          this.packetCount = 0;
          this.s60Counter++;
        }
        if (this.s60Counter >= 60) {
          this.s60Counter -= 60;
          this.packetCount2 = 0;
        }
      });
    };
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetsend", event => {
      if (!this.started) this.started = true, start();
      //if (event.getPacket().type != PacketType.SPAWN) return event.cancel();
      this.packetCount++;
      this.packetCount2++;
    });
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("ready", ( /*event: EventPacket*/
    ) => {
      /*if (event.getPacket().type === PacketType.IO_INIT) */ //start();
    });
    _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("close", () => {
      console.log("diconnected with pps:", this.packetCount, "ppm:", this.packetCount2);
    });
  }
  handlePing(ping) {
    if (ping > PacketCountEngine.SAFETY && ping - PacketCountEngine.SAFETY < 10 && ping < 1e3) {
      PacketCountEngine.SAFETY = ping;
    }
  }
  get availableTotal() {
    return Math.max(PacketCountEngine.PACKET_LIMIT - this.packetCount, 0);
  }
}


/***/ }),

/***/ "./frontend/src/util/engine/TickEngine.ts":
/*!************************************************!*\
  !*** ./frontend/src/util/engine/TickEngine.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TickEngine": () => (/* binding */ TickEngine),
/* harmony export */   "TickRoundType": () => (/* binding */ TickRoundType)
/* harmony export */ });
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsee */ "./node_modules/tsee/lib/index.js");
/* harmony import */ var tsee__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsee__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/moomoo/config */ "./frontend/src/data/moomoo/config.ts");
/* harmony import */ var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/moomoo/items */ "./frontend/src/data/moomoo/items.ts");
/* harmony import */ var _socket_Connection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../socket/Connection */ "./frontend/src/socket/Connection.ts");
/* harmony import */ var _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../socket/packets/PacketType */ "./frontend/src/socket/packets/PacketType.ts");
/* harmony import */ var _MathUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MathUtil */ "./frontend/src/util/MathUtil.ts");






let TickRoundType;
(function (TickRoundType) {
  TickRoundType[TickRoundType["ROUND"] = 0] = "ROUND";
  TickRoundType[TickRoundType["FLOOR"] = 1] = "FLOOR";
  TickRoundType[TickRoundType["CEIL"] = 2] = "CEIL";
})(TickRoundType || (TickRoundType = {}));
function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b, 0) / n;
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / n);
}
const roundArray = [Math.round, Math.floor, Math.ceil];
class TickEngine extends tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  static TICK_DELTA = 1000 / _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__["default"].serverUpdateRate;
  static HAT_LOOP = [51, 50, 28, 29, 30, 36, 37, 38, 44, 35, 42, 43, 49];
  constructor(core) {
    super();
    this.tickIndex = -1;
    this.pingQueue = [];
    this.lastPing = 0;
    this.ping = 0;
    this.pingStd = 0;
    this.firstPinged = false;
    this.firstPonged = false;
    this.lastTick = 0;
    this.predictionTick = -1;
    this.nextPreTick = 0;
    this.nextPostTick = 0;
    this.futureProgress = 0;
    this.lastPredictedPre = -1;
    this.lastPredictedPost = -1;
    this.pings = [];
    this.deltas = [];
    let canReceivePing = false;
    _socket_Connection__WEBPACK_IMPORTED_MODULE_3__.connection.on("packetsend", event => {
      if (event.getPacket().type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PING) {
        if (!canReceivePing) return;
        this.pingQueue.push(Date.now());
        this.lastPing = Date.now();
      }
    });
    _socket_Connection__WEBPACK_IMPORTED_MODULE_3__.connection.on("packetreceive", event => {
      const packet = event.getPacket();
      if (packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PING) {
        //if (!this.firstPonged) this.firstPonged = true;

        const shift = this.pingQueue.shift();
        if (!shift) return;
        this.ping = (Date.now() - shift) / 2;
        if (this.pings.length > 5) {
          this.pings.push(this.ping);
          this.pings.shift();
        } else {
          this.pings.push(this.ping);
        }
        this.pingStd = getStandardDeviation(this.pings);
        this.emit("ping", this.ping);
      } else if (packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PLAYER_UPDATE) {
        this.tickIndex++;
        this.lastTick = Date.now() - this.ping;
        this.predictionTick = this.tickIndex * TickEngine.TICK_DELTA - this.ping;
        if (this.serverLag > 0) this.emit("serverlag", this.serverLag);
        core.objectManager.resetWiggles(this.tickIndex);
        core.playerManager.tickReset(this.tickIndex);
        core.projectileManager.tickSpawnAllScheduled(this.tickIndex);
        this.emit("tick", this.tickIndex);
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.IO_INIT) {
        canReceivePing = true;
      } else if (packet.type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PLAYER_START) {
        this.predictionTick = this.ping;
      }
    });
    core.on("update", delta => {
      const now = Date.now();
      this.deltas.push(delta);
      if (this.deltas.length > 5) this.deltas.shift();
      const maxDelta = Math.max(...this.deltas);
      const maxPing = Math.max(...this.pings);
      const avgDelta = _MathUtil__WEBPACK_IMPORTED_MODULE_5__["default"].averageOfArray(this.deltas);
      const deltaStd = getStandardDeviation(this.deltas);
      if (this.predictionTick === -1) return;
      this.predictionTick += delta;
      if (false) {}

      // clean all predicted buildings if we didnt receive confirming placement packet
      // use a while loop since we are splicing inside of it
      const predictedPlacements = core.objectManager.predictedPlacements;
      let i = predictedPlacements.length;
      while (i--) {
        if (now - predictedPlacements[i].placedTimestamp > this.ping * 2 + maxDelta + TickEngine.TICK_DELTA) {
          const prediction = predictedPlacements[i];
          // failed = possibility of a hidden trap therefore we add trap as a prediction for the next 0.6s
          core.objectManager.addPlacementAttempt([prediction.position.clone(), core.playerManager.myPlayer.scale, prediction.dir], _data_moomoo_items__WEBPACK_IMPORTED_MODULE_2__.items.list[15], Date.now() + 600);
          predictedPlacements.splice(i, 1);
        }
      }
    });
  }
  tick() {
    this.lastTick = Date.now();
  }
  tickIn(ms) {
    return Math.ceil((this.predictionTick + ms) / TickEngine.TICK_DELTA);
  }
  roundToTick(ms, type) {
    return roundArray[type]((this.lastTick % TickEngine.TICK_DELTA + ms) / TickEngine.TICK_DELTA) * TickEngine.TICK_DELTA;
  }
  getTickIndex(ms) {
    return this.tickIndex + Math.ceil((ms - this.lastTick) / TickEngine.TICK_DELTA);
  }
  getPingTicksRaw() {
    return Math.ceil(this.ping / TickEngine.TICK_DELTA);
  }

  /**
   * Returns delay in ticks to when packet sent at this moment will be processed on backend
   */
  getPingTicks() {
    const timeSinceLastTick = Date.now() - this.lastTick;
    return Math.floor((timeSinceLastTick + this.ping) / TickEngine.TICK_DELTA);
  }

  /**
   * Returns the nearest future tick where we can schedule an action and ensure its execution
   */
  getFirstSchedulableTick() {
    return this.tickIndex + this.getPingTicks() + 1;
  }

  /**
   * Determines if an action can be scheduled on the current tick and executed in the future
   */
  isTickSchedulable(tickIndex) {
    return tickIndex >= this.getFirstSchedulableTick();
  }

  /**
   * Determines if a packet sent now would arrive before the next tick
   */
  wouldArriveThisTick() {
    return this.timeToNextTick > this.ping + this.pingStd;
  }

  /**
   * Determines if a packet sent now would arrive before the given tick
   */
  wouldArriveAtTick(tick) {
    return (tick - this.tickIndex) * TickEngine.TICK_DELTA + this.timeToNextTick > this.ping + this.pingStd;
  }
  toTicks(ms) {
    return Math.ceil(ms / TickEngine.TICK_DELTA);
  }
  get timeToNextTick() {
    return TickEngine.TICK_DELTA - (Date.now() - this.lastTick);
  }
  get serverLag() {
    return Math.max(Date.now() - this.lastTick + TickEngine.TICK_DELTA, 0);
  }
}


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


// dont use this, its just copy paste from my very old mod, needs veeery big adjustments

class MovementProcessor {
  static CONFIG = {
    playerDecel: 0.993,
    snowBiomeTop: 2400,
    snowSpeed: 0.75,
    mapScale: 14400,
    riverHeight: 724,
    waterPush: 0.0011,
    playerSpeed: 0.0016
  };
  constructor(player) {
    this.player = player;
    this.lockMove = false;
    this.slowMult = 1;
  }
  possibleMoveDirectionsKeyboard() {
    return [0, 45, 90, 135, 180, 225, 270, 315].map( /*MathHelper.degToRad*/x => x * (Math.PI / 180));
  }
  update(delta) {
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

  deepPredict(msForward, precision, movementDir) {
    let lastResult = {
      position: undefined,
      velocity: undefined
    };
    for (let i = 0; i < msForward; i += precision) {
      lastResult = this.predict(precision, movementDir, lastResult.position, lastResult.velocity);
    }
    return lastResult;
  }
  predict(delta, movementDir, startingPos, startingVelocity) {
    const position = startingPos ?? this.player.serverPos;
    const velocity = startingVelocity ?? this.player.serverPos.clone().subtract(this.player.lastTickServerPos);
    movementDir = movementDir ?? _MathUtil__WEBPACK_IMPORTED_MODULE_1__["default"].getDirection(this.player.lastTickServerPos, this.player.serverPos);

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
      let speedMult = (this.player.inventory.heldItem instanceof _data_type_Weapon__WEBPACK_IMPORTED_MODULE_0__.Weapon ? 1 : 0.5) * this.player.inventory.weaponSelected.stats.speedMultiplier /* * (this.player.hat.spdMult || 1) * (this.player.tail.spdMult || 1) * (this.isInSnow() ? (this.player.hat.coldM || MovementProcessor.snowSpeed) : 1)*/ * this.slowMult;

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

      let inputxVel = Math.cos(movementDir);
      let inputyVel = Math.sin(movementDir);
      const length = Math.sqrt(inputxVel * inputxVel + inputyVel * inputyVel);
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
      position,
      velocity
    };
  }

  /*gather() {
      this.slowMult -= this.player.weapons.primary.hitSlow || .3;
      if (this.slowMult < 0) {
          this.slowMult = 0;
      }
  }*/

  isInSnow() {
    return this.player.serverPos.y <= MovementProcessor.CONFIG.snowBiomeTop;
  }
  isInWater() {
    return this.player.serverPos.y >= MovementProcessor.CONFIG.mapScale / 2 - MovementProcessor.CONFIG.riverHeight / 2 && this.player.serverPos.y <= MovementProcessor.CONFIG.mapScale / 2 + MovementProcessor.CONFIG.riverHeight / 2;
  }
}

/***/ }),

/***/ "./frontend/src/util/type/GridSet.ts":
/*!*******************************************!*\
  !*** ./frontend/src/util/type/GridSet.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GridSet)
/* harmony export */ });
class GridSet extends Set {
  constructor(values) {
    super(values);
  }
  addGrid(grid) {
    for (let i = 0; i < grid.length; i++) this.add(grid[i]);
  }
}

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
class SidArray extends Array {
  constructor(size = 0) {
    super(size);
  }
  hasSid(sid) {
    for (let i = 0, length = this.length; i < length; i++) {
      const item = this[i];
      if (item.sid === sid) {
        return true;
      }
    }
    return false;
  }
  findBySid(sid) {
    for (let i = 0, length = this.length; i < length; i++) {
      const item = this[i];
      if (item.sid === sid) {
        return item;
      }
    }
    return null;
  }
  remove(item) {
    const index = this.indexOf(item);
    if (index > -1) {
      return this.splice(index, 1)[0];
    }
    return null;
  }
  removeBySid(sid) {
    this.remove(this.findBySid(sid));
  }
  clear() {
    this.length = 0;
  }
}

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
class Vector {
  constructor(x, y) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.frozen = false;
  }
  isNull() {
    return this.x == 0 && this.y == 0;
  }
  isNaN() {
    return isNaN(this.x) || isNaN(this.y);
  }
  add(param1, param2) {
    if (this.frozen) return this;
    if (typeof param1 === "object") {
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
  subtract(param1, param2) {
    if (this.frozen) return this;
    if (typeof param1 === "object") {
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
  multiply(param1, param2) {
    if (this.frozen) return this;
    if (typeof param1 === "object") {
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
  divide(param1, param2) {
    if (this.frozen) return this;
    if (typeof param1 === "object") {
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
  set(param1, param2) {
    if (this.frozen) return this;
    if (typeof param1 === "object") {
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
  move(amount) {
    if (this.frozen) return this;
    this.directionMove(this.direction(), amount);
    return this;
  }
  directionMove(direction, amount) {
    if (this.frozen) return this;
    this.x += Math.cos(direction) * amount;
    this.y += Math.sin(direction) * amount;
    return this;
  }
  clone() {
    return new Vector(this.x, this.y);
  }
  length() {
    return Math.hypot(this.x, this.y);
  }
  direction() {
    return Math.atan2(this.y, this.x);
  }
  freeze() {
    this.frozen = true;
    return this;
  }
  toString(round) {
    return "[" + (round ? Math.round(this.x) : this.x) + ", " + (round ? Math.round(this.y) : this.y) + "]";
  }
}

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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  overflow: hidden;\n}\n\n#loader-wrapper {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 500px;\n  height: auto;\n  padding: 0px;\n  transform: translate(-50%, -50%);\n  z-index: 99999;\n}\n\n#loader {\n  position: relative;\n  margin: 0px;\n  width: 500px;\n  height: auto;\n  color: white;\n  padding: 30px;\n  border-radius: 40px;\n  z-index: 99999;\n  text-shadow: -3px -3px 0 black, -3px -2px 0 black, -3px -1px 0 black, -3px 0px 0 black, -3px 1px 0 black, -3px 2px 0 black, -3px 3px 0 black, -2px -3px 0 black, -2px -2px 0 black, -2px -1px 0 black, -2px 0px 0 black, -2px 1px 0 black, -2px 2px 0 black, -2px 3px 0 black, -1px -3px 0 black, -1px -2px 0 black, -1px -1px 0 black, -1px 0px 0 black, -1px 1px 0 black, -1px 2px 0 black, -1px 3px 0 black, 0px -3px 0 black, 0px -2px 0 black, 0px -1px 0 black, 0px 0px 0 black, 0px 1px 0 black, 0px 2px 0 black, 0px 3px 0 black, 1px -3px 0 black, 1px -2px 0 black, 1px -1px 0 black, 1px 0px 0 black, 1px 1px 0 black, 1px 2px 0 black, 1px 3px 0 black, 2px -3px 0 black, 2px -2px 0 black, 2px -1px 0 black, 2px 0px 0 black, 2px 1px 0 black, 2px 2px 0 black, 2px 3px 0 black, 3px -3px 0 black, 3px -2px 0 black, 3px -1px 0 black, 3px 0px 0 black, 3px 1px 0 black, 3px 2px 0 black, 3px 3px 0 black;\n}\n\n#loader::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: linear-gradient(105deg, rgb(91, 0, 0) 0%, rgb(101, 0, 78) 24%, rgb(0, 67, 94) 48%, rgb(7, 85, 0) 73%, rgb(0, 9, 88) 100%);\n  width: 100%;\n  height: 100%;\n  transform: scale(1.02);\n  z-index: -1;\n  background-size: 500%;\n  animation: animate 20s infinite;\n}\n\n#loader::after {\n  filter: blur(7px);\n}\n\n@keyframes animate {\n  0% {\n    background-position: 0 0;\n  }\n  50% {\n    background-position: 100% 0;\n  }\n  100% {\n    background-position: 0 0;\n  }\n}\n#loader #header {\n  text-align: center;\n  font-size: 35px;\n}\n\n#loader #info {\n  text-align: center;\n  font-size: 22px;\n}\n\n#loader #details {\n  text-align: center;\n  font-size: 18px;\n}\n\n#loader .mark-error {\n  color: rgb(245, 55, 55);\n}\n\n#loader .mark-success {\n  color: rgb(81, 247, 59);\n}\n\n#loader input[type=text] {\n  background: transparent;\n  backdrop-filter: saturate(50%);\n  width: 90%;\n  padding: 6px 10px;\n  margin: auto;\n  box-sizing: border-box;\n  border: 2px solid white;\n  border-radius: 4px;\n  color: white;\n  text-transform: uppercase;\n}\n#loader input[type=text]:focus {\n  outline: none;\n}", ""]);
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
var code = "<div id=\"loader-wrapper\"> <div id=\"loader\" class=\"nvr\"> <h1 id=\"header\"></h1> <p id=\"info\"></p> <p id=\"details\"></p> <input id=\"activation-key\" type=\"text\" style=\"display:none\" placeholder=\"Your Activation Key\" autocomplete=\"off\"> </div> </div>";
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
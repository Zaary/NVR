/*! For license information please see bundle.js.LICENSE.txt */
(() => {
    var __webpack_modules__ = {
        "./frontend/src/core/Action.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            function _createClass(Constructor, protoProps, staticProps) {
                return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                Action: () => Action
            });
            var Action = _createClass((function Action(type, priority, executeTick, data) {
                !function(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }(this, Action), this.type = type, this.priority = priority, this.executeTick = executeTick, 
                this.data = data;
            }));
        },
        "./frontend/src/core/ActionType.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            var ActionPriority, ActionType;
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                ActionPriority: () => ActionPriority,
                ActionType: () => ActionType
            }), function(ActionPriority) {
                ActionPriority[ActionPriority.ANTIINSTA = 0] = "ANTIINSTA", ActionPriority[ActionPriority.ANTIBULL = 1] = "ANTIBULL", 
                ActionPriority[ActionPriority.AUTOHEAL = 2] = "AUTOHEAL", ActionPriority[ActionPriority.AUTOBREAK = 3] = "AUTOBREAK", 
                ActionPriority[ActionPriority.AUTOPLACE = 4] = "AUTOPLACE";
            }(ActionPriority || (ActionPriority = {})), function(ActionType) {
                ActionType[ActionType.HAT = 0] = "HAT", ActionType[ActionType.TAIL = 1] = "TAIL", 
                ActionType[ActionType.ATTACK = 2] = "ATTACK";
            }(ActionType || (ActionType = {}));
        },
        "./frontend/src/core/Core.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                Core: () => Core,
                animals: () => animals,
                buildings: () => buildings,
                currentPlayer: () => currentPlayer,
                players: () => players,
                setCurrentPlayer: () => setCurrentPlayer,
                setTarget: () => setTarget,
                target: () => target
            });
            var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/events/events.js"), events__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__), _socket_Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/socket/Connection.ts"), _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/socket/PacketHandler.ts"), _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./frontend/src/socket/packets/Packet.ts"), _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./frontend/src/socket/packets/PacketType.ts"), _util_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./frontend/src/util/Logger.ts"), _util_type_SidArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./frontend/src/util/type/SidArray.ts"), _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./frontend/src/util/engine/TickEngine.ts"), _Action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./frontend/src/core/Action.ts"), _ActionType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./frontend/src/core/ActionType.ts"), _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./frontend/src/util/engine/PacketCountEngine.ts");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                }
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
                var hasNativeReflectConstruct = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                        !0;
                    } catch (e) {
                        return !1;
                    }
                }();
                return function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return _assertThisInitialized(self);
            }
            function _assertThisInitialized(self) {
                if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return self;
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            function _defineProperty(obj, key, value) {
                return (key = _toPropertyKey(key)) in obj ? Object.defineProperty(obj, key, {
                    value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            function _toPropertyKey(arg) {
                var key = function(input, hint) {
                    if ("object" !== _typeof(input) || null === input) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (void 0 !== prim) {
                        var res = prim.call(input, hint || "default");
                        if ("object" !== _typeof(res)) return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === hint ? String : Number)(input);
                }(arg, "string");
                return "symbol" === _typeof(key) ? key : String(key);
            }
            var logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_5__.default("core"), currentPlayer = null, target = null, players = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_6__.SidArray, animals = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_6__.SidArray, buildings = new _util_type_SidArray__WEBPACK_IMPORTED_MODULE_6__.SidArray;
            function setCurrentPlayer(player) {
                logger.log("set current player:", player), currentPlayer = player;
            }
            function setTarget(player) {
                target = player;
            }
            _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.once("ready", (function() {
                _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetreceive", (function(event) {
                    _socket_PacketHandler__WEBPACK_IMPORTED_MODULE_2__.PacketHandler.process(event.getPacket());
                }));
            }));
            var Core = function(_EventEmitter) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(subClass, "prototype", {
                        writable: !1
                    }), superClass && _setPrototypeOf(subClass, superClass);
                }(Core, _EventEmitter);
                var Constructor, protoProps, staticProps, _super = _createSuper(Core);
                function Core() {
                    var _this;
                    return function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, Core), _this = _super.call(this), logger.info("launched StarLit core version ".concat(Core.VER, " by ").concat(Core.AUTHORS)), 
                    _this.lastUpdate = Date.now(), _this.scheduledActions = [], _this.tickEngine = new _util_engine_TickEngine__WEBPACK_IMPORTED_MODULE_7__.TickEngine(_assertThisInitialized(_this)), 
                    _this.packetEngine = new _util_engine_PacketCountEngine__WEBPACK_IMPORTED_MODULE_10__.PacketCountEngine(_assertThisInitialized(_this)), 
                    _this.tickEngine.once("ping", _this.packetEngine.handleFirstPing.bind(_this.packetEngine)), 
                    _this.tickEngine.on("unsafetick", (function(tick) {})), _this.update = _this.update.bind(_assertThisInitialized(_this)), 
                    requestAnimationFrame(_this.update), _this;
                }
                return Constructor = Core, protoProps = [ {
                    key: "update",
                    value: function() {
                        var now = Date.now(), delta = now - this.lastUpdate;
                        this.lastUpdate = now, this.emit("update", delta), requestAnimationFrame(this.update);
                    }
                }, {
                    key: "runUppermostAction",
                    value: function(action, tick) {
                        var sorted = this.scheduledActions.filter((function(a) {
                            return a.type == action && a.executeTick == tick;
                        })).sort((function(a, b) {
                            return b.priority - a.priority;
                        }));
                        if (sorted.length > 0) {
                            var _action = sorted[0];
                            this.runAction(_action);
                            var index = this.scheduledActions.indexOf(_action);
                            index > -1 && this.scheduledActions.splice(index, 1);
                        }
                    }
                }, {
                    key: "runAction",
                    value: function(action) {
                        switch (action.type) {
                          case _ActionType__WEBPACK_IMPORTED_MODULE_9__.ActionType.HAT:
                            _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.BUY_AND_EQUIP, [ 0, action.data[0], 0 ]));
                            break;

                          case _ActionType__WEBPACK_IMPORTED_MODULE_9__.ActionType.TAIL:
                            _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.BUY_AND_EQUIP, [ 0, action.data[0], 1 ]));
                            break;

                          case _ActionType__WEBPACK_IMPORTED_MODULE_9__.ActionType.ATTACK:
                            _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.send(new _socket_packets_Packet__WEBPACK_IMPORTED_MODULE_3__.Packet(_socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.ATTACK, action.data));
                        }
                    }
                }, {
                    key: "scheduleAction",
                    value: function(action, priority) {
                        var tick = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.tickEngine.tickIndex + 1, data = arguments.length > 3 ? arguments[3] : void 0;
                        this.scheduledActions.push(new _Action__WEBPACK_IMPORTED_MODULE_8__.Action(action, priority, tick, data));
                    }
                } ], protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Core;
            }(events__WEBPACK_IMPORTED_MODULE_0___default());
            _defineProperty(Core, "VER", "1.0"), _defineProperty(Core, "AUTHORS", "Zaary");
        },
        "./frontend/src/data/moomoo/accessories.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            const __WEBPACK_DEFAULT_EXPORT__ = [ {
                id: 12,
                name: "Snowball",
                price: 1e3,
                scale: 105,
                xOff: 18,
                desc: "no effect"
            }, {
                id: 9,
                name: "Tree Cape",
                price: 1e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 10,
                name: "Stone Cape",
                price: 1e3,
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
                price: 2e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 11,
                name: "Monkey Tail",
                price: 2e3,
                scale: 97,
                xOff: 25,
                desc: "Super speed but reduced damage",
                spdMult: 1.35,
                dmgMultO: .2
            }, {
                id: 17,
                name: "Apple Basket",
                price: 3e3,
                scale: 80,
                xOff: 12,
                desc: "slowly regenerates health over time",
                healthRegen: 1
            }, {
                id: 6,
                name: "Winter Cape",
                price: 3e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 4,
                name: "Skull Cape",
                price: 4e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 5,
                name: "Dash Cape",
                price: 5e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 2,
                name: "Dragon Cape",
                price: 6e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 1,
                name: "Super Cape",
                price: 8e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 7,
                name: "Troll Cape",
                price: 8e3,
                scale: 90,
                desc: "no effect"
            }, {
                id: 14,
                name: "Thorns",
                price: 1e4,
                scale: 115,
                xOff: 20,
                desc: "no effect"
            }, {
                id: 15,
                name: "Blockades",
                price: 1e4,
                scale: 95,
                xOff: 15,
                desc: "no effect"
            }, {
                id: 20,
                name: "Devils Tail",
                price: 1e4,
                scale: 95,
                xOff: 20,
                desc: "no effect"
            }, {
                id: 16,
                name: "Sawblade",
                price: 12e3,
                scale: 90,
                spin: !0,
                xOff: 0,
                desc: "deal damage to players that damage you",
                dmg: .15
            }, {
                id: 13,
                name: "Angel Wings",
                price: 15e3,
                scale: 138,
                xOff: 22,
                desc: "slowly regenerates health over time",
                healthRegen: 3
            }, {
                id: 19,
                name: "Shadow Wings",
                price: 15e3,
                scale: 138,
                xOff: 22,
                desc: "increased movement speed",
                spdMult: 1.1
            }, {
                id: 18,
                name: "Blood Wings",
                price: 2e4,
                scale: 178,
                xOff: 26,
                desc: "restores health when you deal damage",
                healD: .2
            }, {
                id: 21,
                name: "Corrupt X Wings",
                price: 2e4,
                scale: 178,
                xOff: 26,
                desc: "deal damage to players that damage you",
                dmg: .25
            } ];
        },
        "./frontend/src/data/moomoo/config.ts": (module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            }), module = __webpack_require__.hmd(module);
            var config = {
                maxScreenWidth: 1920,
                maxScreenHeight: 1080,
                serverUpdateRate: 9,
                maxPlayers: 40,
                maxPlayersHard: 50,
                collisionDepth: 6,
                minimapRate: 3e3,
                colGrid: 10,
                clientSendRate: 5,
                healthBarWidth: 50,
                iconPadding: 15,
                iconPad: .9,
                deathFadeout: 3e3,
                crownIconScale: 60,
                crownPad: 35,
                chatCountdown: 3e3,
                chatCooldown: 500,
                inSandbox: -1 != window.location.origin.indexOf("sandbox"),
                maxAge: 100,
                gatherAngle: Math.PI / 2.6,
                gatherWiggle: 10,
                hitReturnRatio: .25,
                hitAngle: Math.PI / 2,
                playerScale: 35,
                playerSpeed: .0016,
                playerDecel: .993,
                nameY: 34,
                skinColors: [ "#bf8f54", "#cbb091", "#896c4b", "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3", "#8bc373" ],
                animalCount: 7,
                aiTurnRandom: .06,
                cowNames: [ "Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky" ],
                shieldAngle: Math.PI / 3,
                weaponVariants: [ {
                    id: 0,
                    src: "",
                    xp: 0,
                    val: 1
                }, {
                    id: 1,
                    src: "_g",
                    xp: 3e3,
                    val: 1.1
                }, {
                    id: 2,
                    src: "_d",
                    xp: 7e3,
                    val: 1.18
                }, {
                    id: 3,
                    src: "_r",
                    poison: !0,
                    xp: 12e3,
                    val: 1.18
                } ],
                fetchVariant: function(player) {
                    for (var tmpXP = player.weaponXP[player.weaponIndex] || 0, i = module.exports.weaponVariants.length - 1; i >= 0; --i) if (tmpXP >= module.exports.weaponVariants[i].xp) return config.weaponVariants[i];
                },
                resourceTypes: [ "wood", "food", "stone", "points" ],
                areaCount: 7,
                treesPerArea: 9,
                bushesPerArea: 3,
                totalRocks: 32,
                goldOres: 7,
                riverWidth: 724,
                riverPadding: 114,
                waterCurrent: .0011,
                waveSpeed: 1e-4,
                waveMax: 1.3,
                treeScales: [ 150, 160, 165, 175 ],
                bushScales: [ 80, 85, 95 ],
                rockScales: [ 80, 85, 90 ],
                snowBiomeTop: 2400,
                snowSpeed: .75,
                maxNameLength: 15,
                mapScale: 14400,
                mapPingScale: 40,
                mapPingTime: 2200
            };
            const __WEBPACK_DEFAULT_EXPORT__ = config;
        },
        "./frontend/src/data/moomoo/hats.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            const __WEBPACK_DEFAULT_EXPORT__ = [ {
                id: 45,
                name: "Shame!",
                dontSell: !0,
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
                price: 1e3,
                scale: 120,
                desc: "no effect"
            }, {
                id: 4,
                name: "Ranger Hat",
                price: 2e3,
                scale: 120,
                desc: "no effect"
            }, {
                id: 18,
                name: "Explorer Hat",
                price: 2e3,
                scale: 120,
                desc: "no effect"
            }, {
                id: 31,
                name: "Flipper Hat",
                price: 2500,
                scale: 120,
                desc: "have more control while in water",
                watrImm: !0
            }, {
                id: 1,
                name: "Marksman Cap",
                price: 3e3,
                scale: 120,
                desc: "increases arrow speed and range",
                aMlt: 1.3
            }, {
                id: 10,
                name: "Bush Gear",
                price: 3e3,
                scale: 160,
                desc: "allows you to disguise yourself as a bush"
            }, {
                id: 48,
                name: "Halo",
                price: 3e3,
                scale: 120,
                desc: "no effect"
            }, {
                id: 6,
                name: "Soldier Helmet",
                price: 4e3,
                scale: 120,
                desc: "reduces damage taken but slows movement",
                spdMult: .94,
                dmgMult: .75
            }, {
                id: 23,
                name: "Anti Venom Gear",
                price: 4e3,
                scale: 120,
                desc: "makes you immune to poison",
                poisonRes: 1
            }, {
                id: 13,
                name: "Medic Gear",
                price: 5e3,
                scale: 110,
                desc: "slowly regenerates health over time",
                healthRegen: 3
            }, {
                id: 9,
                name: "Miners Helmet",
                price: 5e3,
                scale: 120,
                desc: "earn 1 extra gold per resource",
                extraGold: 1
            }, {
                id: 32,
                name: "Musketeer Hat",
                price: 5e3,
                scale: 120,
                desc: "reduces cost of projectiles",
                projCost: .5
            }, {
                id: 7,
                name: "Bull Helmet",
                price: 6e3,
                scale: 120,
                desc: "increases damage done but drains health",
                healthRegen: -5,
                dmgMultO: 1.5,
                spdMult: .96
            }, {
                id: 22,
                name: "Emp Helmet",
                price: 6e3,
                scale: 120,
                desc: "turrets won't attack but you move slower",
                antiTurret: 1,
                spdMult: .7
            }, {
                id: 12,
                name: "Booster Hat",
                price: 6e3,
                scale: 120,
                desc: "increases your movement speed",
                spdMult: 1.16
            }, {
                id: 26,
                name: "Barbarian Armor",
                price: 8e3,
                scale: 120,
                desc: "knocks back enemies that attack you",
                dmgK: .6
            }, {
                id: 21,
                name: "Plague Mask",
                price: 1e4,
                scale: 120,
                desc: "melee attacks deal poison damage",
                poisonDmg: 5,
                poisonTime: 6
            }, {
                id: 46,
                name: "Bull Mask",
                price: 1e4,
                scale: 120,
                desc: "bulls won't target you unless you attack them",
                bullRepel: 1
            }, {
                id: 14,
                name: "Windmill Hat",
                topSprite: !0,
                price: 1e4,
                scale: 120,
                desc: "generates points while worn",
                pps: 1.5
            }, {
                id: 11,
                name: "Spike Gear",
                topSprite: !0,
                price: 1e4,
                scale: 120,
                desc: "deal damage to players that damage you",
                dmg: .45
            }, {
                id: 53,
                name: "Turret Gear",
                topSprite: !0,
                price: 1e4,
                scale: 120,
                desc: "you become a walking turret",
                turret: {
                    proj: 1,
                    range: 700,
                    rate: 2500
                },
                spdMult: .7
            }, {
                id: 20,
                name: "Samurai Armor",
                price: 12e3,
                scale: 120,
                desc: "increased attack speed and fire rate",
                atkSpd: .78
            }, {
                id: 58,
                name: "Dark Knight",
                price: 12e3,
                scale: 120,
                desc: "restores health when you deal damage",
                healD: .4
            }, {
                id: 27,
                name: "Scavenger Gear",
                price: 15e3,
                scale: 120,
                desc: "earn double points for each kill",
                kScrM: 2
            }, {
                id: 40,
                name: "Tank Gear",
                price: 15e3,
                scale: 120,
                desc: "increased damage to buildings but slower movement",
                spdMult: .3,
                bDmg: 3.3
            }, {
                id: 52,
                name: "Thief Gear",
                price: 15e3,
                scale: 120,
                desc: "steal half of a players gold when you kill them",
                goldSteal: .5
            }, {
                id: 55,
                name: "Bloodthirster",
                price: 2e4,
                scale: 120,
                desc: "Restore Health when dealing damage. And increased damage",
                healD: .25,
                dmgMultO: 1.2
            }, {
                id: 56,
                name: "Assassin Gear",
                price: 2e4,
                scale: 120,
                desc: "Go invisible when not moving. Can't eat. Increased speed",
                noEat: !0,
                spdMult: 1.1,
                invisTimer: 1e3
            } ];
        },
        "./frontend/src/data/moomoo/items.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                items: () => items
            });
            for (var groups = [ {
                id: 0,
                name: "food",
                layer: 0
            }, {
                id: 1,
                name: "walls",
                place: !0,
                limit: 30,
                layer: 0
            }, {
                id: 2,
                name: "spikes",
                place: !0,
                limit: 15,
                layer: 0
            }, {
                id: 3,
                name: "mill",
                place: !0,
                limit: 7,
                layer: 1
            }, {
                id: 4,
                name: "mine",
                place: !0,
                limit: 1,
                layer: 0
            }, {
                id: 5,
                name: "trap",
                place: !0,
                limit: 6,
                layer: -1
            }, {
                id: 6,
                name: "booster",
                place: !0,
                limit: 12,
                layer: -1
            }, {
                id: 7,
                name: "turret",
                place: !0,
                limit: 2,
                layer: 1
            }, {
                id: 8,
                name: "watchtower",
                place: !0,
                limit: 12,
                layer: 1
            }, {
                id: 9,
                name: "buff",
                place: !0,
                limit: 4,
                layer: -1
            }, {
                id: 10,
                name: "spawn",
                place: !0,
                limit: 1,
                layer: -1
            }, {
                id: 11,
                name: "sapling",
                place: !0,
                limit: 2,
                layer: 0
            }, {
                id: 12,
                name: "blocker",
                place: !0,
                limit: 3,
                layer: -1
            }, {
                id: 13,
                name: "teleporter",
                place: !0,
                limit: 2,
                layer: -1
            } ], list = [ {
                id: -1,
                group: groups[0],
                name: "apple",
                desc: "restores 20 health when consumed",
                req: [ "food", 10 ],
                consume: function(doer) {
                    return doer.changeHealth(20, doer);
                },
                scale: 22,
                holdOffset: 15
            }, {
                id: -1,
                age: 3,
                group: groups[0],
                name: "cookie",
                desc: "restores 40 health when consumed",
                req: [ "food", 15 ],
                consume: function(doer) {
                    return doer.changeHealth(40, doer);
                },
                scale: 27,
                holdOffset: 15
            }, {
                id: -1,
                age: 7,
                group: groups[0],
                name: "cheese",
                desc: "restores 30 health and another 50 over 5 seconds",
                req: [ "food", 25 ],
                consume: function(doer) {
                    return !!(doer.changeHealth(30, doer) || doer.health < 100) && (doer.dmgOverTime.dmg = -10, 
                    doer.dmgOverTime.doer = doer, doer.dmgOverTime.time = 5, !0);
                },
                scale: 27,
                holdOffset: 15
            }, {
                id: -1,
                group: groups[1],
                name: "wood wall",
                desc: "provides protection for your village",
                req: [ "wood", 10 ],
                projDmg: !0,
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
                req: [ "stone", 25 ],
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
                req: [ "stone", 35 ],
                health: 1500,
                scale: 52,
                holdOffset: 20,
                placeOffset: -5
            }, {
                id: -1,
                group: groups[2],
                name: "spikes",
                desc: "damages enemies when they touch them",
                req: [ "wood", 20, "stone", 5 ],
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
                req: [ "wood", 30, "stone", 10 ],
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
                req: [ "wood", 35, "stone", 15 ],
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
                req: [ "wood", 30, "stone", 20 ],
                health: 500,
                dmg: 45,
                turnSpeed: .003,
                scale: 52,
                spritePadding: -23,
                holdOffset: 8,
                placeOffset: -5
            }, {
                id: -1,
                group: groups[3],
                name: "windmill",
                desc: "generates gold over time",
                req: [ "wood", 50, "stone", 10 ],
                health: 400,
                pps: 1,
                turnSpeed: .0016,
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
                req: [ "wood", 60, "stone", 20 ],
                health: 500,
                pps: 1.5,
                turnSpeed: .0025,
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
                req: [ "wood", 100, "stone", 50 ],
                health: 800,
                pps: 2,
                turnSpeed: .005,
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
                req: [ "wood", 20, "stone", 100 ],
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
                req: [ "wood", 150 ],
                iconLineMult: 12,
                colDiv: .5,
                scale: 110,
                holdOffset: 50,
                placeOffset: -15
            }, {
                id: -1,
                age: 4,
                group: groups[5],
                name: "pit trap",
                desc: "pit that traps enemies if they walk over it",
                req: [ "wood", 30, "stone", 30 ],
                trap: !0,
                ignoreCollision: !0,
                hideFromEnemy: !0,
                health: 500,
                colDiv: .2,
                scale: 50,
                holdOffset: 20,
                placeOffset: -5
            }, {
                id: -1,
                age: 4,
                group: groups[6],
                name: "boost pad",
                desc: "provides boost when stepped on",
                req: [ "stone", 20, "wood", 5 ],
                ignoreCollision: !0,
                boostSpeed: 1.5,
                health: 150,
                colDiv: .7,
                scale: 45,
                holdOffset: 20,
                placeOffset: -5
            }, {
                id: -1,
                age: 7,
                group: groups[7],
                doUpdate: !0,
                name: "turret",
                desc: "defensive structure that shoots at enemies",
                req: [ "wood", 200, "stone", 150 ],
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
                req: [ "wood", 20 ],
                ignoreCollision: !0,
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
                req: [ "wood", 30, "food", 10 ],
                ignoreCollision: !0,
                healCol: 15,
                health: 400,
                colDiv: .7,
                scale: 45,
                holdOffset: 20,
                placeOffset: -5
            }, {
                id: -1,
                age: 9,
                group: groups[10],
                name: "spawn pad",
                desc: "you will spawn here when you die but it will dissapear",
                req: [ "wood", 100, "stone", 100 ],
                health: 400,
                ignoreCollision: !0,
                spawnPoint: !0,
                scale: 45,
                holdOffset: 20,
                placeOffset: -5
            }, {
                id: -1,
                age: 7,
                group: groups[12],
                name: "blocker",
                desc: "blocks building in radius",
                req: [ "wood", 30, "stone", 25 ],
                ignoreCollision: !0,
                blocker: 300,
                health: 400,
                colDiv: .7,
                scale: 45,
                holdOffset: 20,
                placeOffset: -5
            }, {
                id: -1,
                age: 7,
                group: groups[13],
                name: "teleporter",
                desc: "teleports you to a random point on the map",
                req: [ "wood", 60, "stone", 60 ],
                ignoreCollision: !0,
                teleport: !0,
                health: 200,
                colDiv: .7,
                scale: 45,
                holdOffset: 20,
                placeOffset: -5
            } ], i = 0; i < list.length; ++i) Object.defineProperty(list[i], "id", {
                value: i
            }), list[i].pre && (list[i].pre = i - list[i].pre);
            var items = {
                groups,
                projectiles: [ {
                    indx: 0,
                    layer: 0,
                    src: "arrow_1",
                    dmg: 25,
                    speed: 1.6,
                    scale: 103,
                    range: 1e3
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
                } ],
                weapons: [ {
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
                    spdMult: .85,
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
                    spdMult: .8,
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
                    knock: .2,
                    spdMult: .82,
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
                    knock: .7,
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
                    iPad: .8,
                    length: 110,
                    width: 110,
                    xOff: 18,
                    yOff: 0,
                    dmg: 20,
                    knock: .1,
                    range: 65,
                    gather: 1,
                    hitSlow: .1,
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
                    req: [ "wood", 4 ],
                    length: 120,
                    width: 120,
                    xOff: -6,
                    yOff: 0,
                    projectile: 0,
                    spdMult: .75,
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
                    spdMult: .88,
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
                    shield: .2,
                    xOff: 6,
                    yOff: 0,
                    spdMult: .7
                }, {
                    id: 12,
                    type: 1,
                    age: 8,
                    pre: 9,
                    name: "crossbow",
                    desc: "deals more damage and has greater range",
                    src: "crossbow_1",
                    req: [ "wood", 5 ],
                    aboveHand: !0,
                    armS: .75,
                    length: 120,
                    width: 120,
                    xOff: -4,
                    yOff: 0,
                    projectile: 2,
                    spdMult: .7,
                    speed: 700
                }, {
                    id: 13,
                    type: 1,
                    age: 9,
                    pre: 12,
                    name: "repeater crossbow",
                    desc: "high firerate crossbow with reduced damage",
                    src: "crossbow_2",
                    req: [ "wood", 10 ],
                    aboveHand: !0,
                    armS: .75,
                    length: 120,
                    width: 120,
                    xOff: -4,
                    yOff: 0,
                    projectile: 3,
                    spdMult: .7,
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
                    knock: .2,
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
                    req: [ "stone", 10 ],
                    aboveHand: !0,
                    rec: .35,
                    armS: .6,
                    hndS: .3,
                    hndD: 1.6,
                    length: 205,
                    width: 205,
                    xOff: 25,
                    yOff: 0,
                    projectile: 5,
                    hideProjectile: !0,
                    spdMult: .6,
                    speed: 1500
                } ],
                list
            };
        },
        "./frontend/src/data/type/GameObject.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                }
            }
            function _defineProperty(obj, key, value) {
                return (key = _toPropertyKey(key)) in obj ? Object.defineProperty(obj, key, {
                    value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            function _toPropertyKey(arg) {
                var key = function(input, hint) {
                    if ("object" !== _typeof(input) || null === input) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (void 0 !== prim) {
                        var res = prim.call(input, hint || "default");
                        if ("object" !== _typeof(res)) return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === hint ? String : Number)(input);
                }(arg, "string");
                return "symbol" === _typeof(key) ? key : String(key);
            }
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                GameObject: () => GameObject
            });
            var GameObject = function() {
                function GameObject(sid) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, GameObject), _defineProperty(this, "sentTo", {}), _defineProperty(this, "gridLocations", []), 
                    _defineProperty(this, "active", !0), _defineProperty(this, "doUpdate", !1), _defineProperty(this, "x", 0), 
                    _defineProperty(this, "y", 0), _defineProperty(this, "dir", 0), _defineProperty(this, "xWiggle", 0), 
                    _defineProperty(this, "yWiggle", 0), _defineProperty(this, "scale", 0), _defineProperty(this, "type", null), 
                    _defineProperty(this, "id", -1), _defineProperty(this, "owner", null), _defineProperty(this, "name", ""), 
                    _defineProperty(this, "isItem", !1), _defineProperty(this, "group", {}), _defineProperty(this, "health", 0), 
                    _defineProperty(this, "layer", 0), _defineProperty(this, "colDiv", 1), _defineProperty(this, "blocker", 0), 
                    _defineProperty(this, "ignoreCollision", !1), _defineProperty(this, "dontGather", !1), 
                    _defineProperty(this, "hideFromEnemy", !1), _defineProperty(this, "friction", null), 
                    _defineProperty(this, "projDmg", 0), _defineProperty(this, "dmg", 0), _defineProperty(this, "pDmg", 0), 
                    _defineProperty(this, "pps", 0), _defineProperty(this, "zIndex", 0), _defineProperty(this, "turnSpeed", 0), 
                    _defineProperty(this, "req", []), _defineProperty(this, "trap", !1), _defineProperty(this, "healCol", 0), 
                    _defineProperty(this, "teleport", !1), _defineProperty(this, "boostSpeed", 0), _defineProperty(this, "projectile", 0), 
                    _defineProperty(this, "shootRange", 0), _defineProperty(this, "shootRate", 0), _defineProperty(this, "shootCount", 0), 
                    _defineProperty(this, "spawnPoint", !1), this.sid = sid;
                }
                var Constructor, protoProps, staticProps;
                return Constructor = GameObject, protoProps = [ {
                    key: "init",
                    value: function(x, y, dir, scale, type, data, owner) {
                        var _data;
                        data = null !== (_data = data) && void 0 !== _data ? _data : {}, this.sentTo = {}, 
                        this.gridLocations = [], this.active = !0, this.doUpdate = data.doUpdate, this.x = x, 
                        this.y = y, this.dir = dir, this.xWiggle = 0, this.yWiggle = 0, this.scale = scale, 
                        this.type = type, this.id = data.id, this.owner = owner, this.name = data.name, 
                        this.isItem = null != this.id, this.group = data.group, this.health = data.health, 
                        this.layer = 2, null != this.group ? this.layer = this.group.layer : 0 == this.type ? this.layer = 3 : 2 == this.type ? this.layer = 0 : 4 == this.type && (this.layer = -1), 
                        this.colDiv = data.colDiv || 1, this.blocker = data.blocker, this.ignoreCollision = data.ignoreCollision, 
                        this.dontGather = data.dontGather, this.hideFromEnemy = data.hideFromEnemy, this.friction = data.friction, 
                        this.projDmg = data.projDmg, this.dmg = data.dmg, this.pDmg = data.pDmg, this.pps = data.pps, 
                        this.zIndex = data.zIndex || 0, this.turnSpeed = data.turnSpeed, this.req = data.req, 
                        this.trap = data.trap, this.healCol = data.healCol, this.teleport = data.teleport, 
                        this.boostSpeed = data.boostSpeed, this.projectile = data.projectile, this.shootRange = data.shootRange, 
                        this.shootRate = data.shootRate, this.shootCount = this.shootRate, this.spawnPoint = data.spawnPoint;
                    }
                }, {
                    key: "changeHealth",
                    value: function(amount, doer) {
                        return this.health += amount, this.health <= 0;
                    }
                }, {
                    key: "getScale",
                    value: function() {
                        var sM = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, ig = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        return sM = sM || 1, this.scale * (this.isItem || 2 == this.type || 3 == this.type || 4 == this.type ? 1 : .6 * sM) * (ig ? 1 : this.colDiv);
                    }
                }, {
                    key: "update",
                    value: function(delta) {
                        this.active && (this.xWiggle && (this.xWiggle *= Math.pow(.99, delta)), this.yWiggle && (this.yWiggle *= Math.pow(.99, delta)), 
                        this.turnSpeed && (this.dir += this.turnSpeed * delta));
                    }
                } ], protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), GameObject;
            }();
        },
        "./frontend/src/data/type/MoomooUtil.ts": (module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                util: () => util
            }), module = __webpack_require__.hmd(module);
            var util = {
                randInt: function(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                },
                randFloat: function(min, max) {
                    return Math.random() * (max - min + 1) + min;
                },
                lerp: function(value1, value2, amount) {
                    return value1 + (value2 - value1) * amount;
                },
                decel: function(val, cel) {
                    return val > 0 ? val = Math.max(0, val - cel) : val < 0 && (val = Math.min(0, val + cel)), 
                    val;
                },
                getDistance: function(x1, y1, x2, y2) {
                    return Math.hypot(x1 - x2, y1 - y2);
                },
                getDirection: function(from_x, from_y, to_x, to_y) {
                    return Math.atan2(to_y - from_y, from_y - to_y);
                },
                getAngleDist: function(a, b) {
                    var p = Math.abs(b - a) % (2 * Math.PI);
                    return p > Math.PI ? 2 * Math.PI - p : p;
                },
                isNumber: function(n) {
                    return "number" == typeof n && !isNaN(n) && isFinite(n);
                },
                isString: function(s) {
                    return s && "string" == typeof s;
                },
                kFormat: function(num) {
                    return num > 999 ? (num / 1e3).toFixed(1) + "k" : num;
                },
                capitalizeFirst: function(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                },
                fixTo: function(n, v) {
                    return parseFloat(n.toFixed(v));
                },
                sortByPoints: function(a, b) {
                    return parseFloat(b.points) - parseFloat(a.points);
                },
                lineInRect: function(recX, recY, recX2, recY2, x1, y1, x2, y2) {
                    var minX = x1, maxX = x2;
                    if (x1 > x2 && (minX = x2, maxX = x1), maxX > recX2 && (maxX = recX2), minX < recX && (minX = recX), 
                    minX > maxX) return !1;
                    var minY = y1, maxY = y2, dx = x2 - x1;
                    if (Math.abs(dx) > 1e-7) {
                        var a = (y2 - y1) / dx, b = y1 - a * x1;
                        minY = a * minX + b, maxY = a * maxX + b;
                    }
                    if (minY > maxY) {
                        var tmp = maxY;
                        maxY = minY, minY = tmp;
                    }
                    return maxY > recY2 && (maxY = recY2), minY < recY && (minY = recY), !(minY > maxY);
                },
                containsPoint: function(element, x, y) {
                    var bounds = element.getBoundingClientRect(), left = bounds.left + window.scrollX, top = bounds.top + window.scrollY, width = bounds.width, height = bounds.height;
                    return x > left && x < left + width && (y > top && y < top + height);
                },
                mousifyTouchEvent: function(event) {
                    var touch = event.changedTouches[0];
                    event.screenX = touch.screenX, event.screenY = touch.screenY, event.clientX = touch.clientX, 
                    event.clientY = touch.clientY, event.pageX = touch.pageX, event.pageY = touch.pageY;
                },
                removeAllChildren: function(element) {
                    for (;element.hasChildNodes(); ) element.removeChild(element.lastChild);
                },
                generateElement: function(config) {
                    var element = document.createElement(config.tag || "div");
                    function bind(configValue, elementValue) {
                        config[configValue] && (element[elementValue] = config[configValue]);
                    }
                    for (var key in bind("text", "textContent"), bind("html", "innerHTML"), bind("class", "className"), 
                    config) {
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
                        }
                        element[key] = config[key];
                    }
                    if (element.onclick && (element.onclick = module.exports.checkTrusted(element.onclick)), 
                    element.onmouseover && (element.onmouseover = module.exports.checkTrusted(element.onmouseover)), 
                    element.onmouseout && (element.onmouseout = module.exports.checkTrusted(element.onmouseout)), 
                    config.style && (element.style.cssText = config.style), config.hookTouch && module.exports.hookTouchEvents(element), 
                    config.parent && config.parent.appendChild(element), config.children) for (var i = 0; i < config.children.length; i++) element.appendChild(config.children[i]);
                    return element;
                },
                eventIsTrusted: function(ev) {
                    return !ev || "boolean" != typeof ev.isTrusted || ev.isTrusted;
                },
                checkTrusted: function(callback) {
                    return function(ev) {
                        ev && ev instanceof Event && module.exports.eventIsTrusted(ev) && callback(ev);
                    };
                },
                randomString: function(length) {
                    for (var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return text;
                },
                countInArray: function(array, val) {
                    for (var count = 0, i = 0; i < array.length; i++) array[i] === val && count++;
                    return count;
                }
            };
        },
        "./frontend/src/data/type/Player.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _type_MoomooUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./frontend/src/data/type/MoomooUtil.ts"), _moomoo_accessories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/data/moomoo/accessories.ts"), _moomoo_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/data/moomoo/config.ts"), _moomoo_hats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./frontend/src/data/moomoo/hats.ts"), _moomoo_items__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./frontend/src/data/moomoo/items.ts");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                }
            }
            function _defineProperty(obj, key, value) {
                return (key = _toPropertyKey(key)) in obj ? Object.defineProperty(obj, key, {
                    value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            function _toPropertyKey(arg) {
                var key = function(input, hint) {
                    if ("object" !== _typeof(input) || null === input) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (void 0 !== prim) {
                        var res = prim.call(input, hint || "default");
                        if ("object" !== _typeof(res)) return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === hint ? String : Number)(input);
                }(arg, "string");
                return "symbol" === _typeof(key) ? key : String(key);
            }
            const __WEBPACK_DEFAULT_EXPORT__ = function() {
                function Player(id, sid) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, Player), _defineProperty(this, "timerCount", 0), _defineProperty(this, "tmpRatio", 0), 
                    _defineProperty(this, "animIndex", 0), _defineProperty(this, "healCol", 0), _defineProperty(this, "active", !1), 
                    _defineProperty(this, "alive", !1), _defineProperty(this, "lockMove", !1), _defineProperty(this, "lockDir", !1), 
                    _defineProperty(this, "minimapCounter", 0), _defineProperty(this, "chatCountdown", 0), 
                    _defineProperty(this, "shameCount", 0), _defineProperty(this, "shameTimer", 0), 
                    _defineProperty(this, "sentTo", {}), _defineProperty(this, "gathering", 0), _defineProperty(this, "autoGather", 0), 
                    _defineProperty(this, "animTime", 0), _defineProperty(this, "animSpeed", 0), _defineProperty(this, "mouseState", 0), 
                    _defineProperty(this, "buildIndex", -1), _defineProperty(this, "weaponIndex", 0), 
                    _defineProperty(this, "dmgOverTime", {}), _defineProperty(this, "noMovTimer", 0), 
                    _defineProperty(this, "maxXP", 300), _defineProperty(this, "XP", 0), _defineProperty(this, "age", 1), 
                    _defineProperty(this, "kills", 0), _defineProperty(this, "upgrAge", 2), _defineProperty(this, "upgradePoints", 0), 
                    _defineProperty(this, "x", 0), _defineProperty(this, "y", 0), _defineProperty(this, "zIndex", 0), 
                    _defineProperty(this, "xVel", 0), _defineProperty(this, "yVel", 0), _defineProperty(this, "slowMult", 1), 
                    _defineProperty(this, "dir", 0), _defineProperty(this, "dirPlus", 0), _defineProperty(this, "targetDir", 0), 
                    _defineProperty(this, "targetAngle", 0), _defineProperty(this, "maxHealth", 100), 
                    _defineProperty(this, "health", this.maxHealth), _defineProperty(this, "scale", _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.playerScale), 
                    _defineProperty(this, "speed", _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.playerSpeed), 
                    _defineProperty(this, "items", [ 0, 3, 6, 10 ]), _defineProperty(this, "weapons", [ 0 ]), 
                    _defineProperty(this, "shootCount", 0), _defineProperty(this, "weaponXP", []), _defineProperty(this, "reloads", {}), 
                    _defineProperty(this, "resources", {}), _defineProperty(this, "visible", !1), this.id = id, 
                    this.sid = sid, this.name = "", this.team = null, this.tmpScore = 0, this.skinIndex = 0, 
                    this.tailIndex = 0, this.hitTime = 0, this.tails = {};
                    for (var i = 0; i < _moomoo_accessories__WEBPACK_IMPORTED_MODULE_1__.default.length; ++i) _moomoo_accessories__WEBPACK_IMPORTED_MODULE_1__.default[i].price <= 0 && (this.tails[_moomoo_accessories__WEBPACK_IMPORTED_MODULE_1__.default[i].id] = 1);
                    this.skins = {};
                    for (i = 0; i < _moomoo_hats__WEBPACK_IMPORTED_MODULE_3__.default.length; ++i) _moomoo_hats__WEBPACK_IMPORTED_MODULE_3__.default[i].price <= 0 && (this.skins[_moomoo_hats__WEBPACK_IMPORTED_MODULE_3__.default[i].id] = 1);
                    this.points = 0, this.dt = 0, this.hidden = !1, this.itemCounts = {}, this.isPlayer = !0, 
                    this.pps = 0, this.moveDir = void 0, this.skinRot = 0, this.lastPing = 0, this.iconIndex = 0, 
                    this.skinColor = 0;
                }
                var Constructor, protoProps, staticProps;
                return Constructor = Player, protoProps = [ {
                    key: "spawn",
                    value: function(moofoll) {
                        this.active = !0, this.alive = !0, this.lockMove = !1, this.lockDir = !1, this.minimapCounter = 0, 
                        this.chatCountdown = 0, this.shameCount = 0, this.shameTimer = 0, this.sentTo = {}, 
                        this.gathering = 0, this.autoGather = 0, this.animTime = 0, this.animSpeed = 0, 
                        this.mouseState = 0, this.buildIndex = -1, this.weaponIndex = 0, this.dmgOverTime = {}, 
                        this.noMovTimer = 0, this.maxXP = 300, this.XP = 0, this.age = 1, this.kills = 0, 
                        this.upgrAge = 2, this.upgradePoints = 0, this.x = 0, this.y = 0, this.zIndex = 0, 
                        this.xVel = 0, this.yVel = 0, this.slowMult = 1, this.dir = 0, this.dirPlus = 0, 
                        this.targetDir = 0, this.targetAngle = 0, this.maxHealth = 100, this.health = this.maxHealth, 
                        this.scale = _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.playerScale, this.speed = _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.playerSpeed, 
                        this.resources = {}, this.resetMoveDir(), this.resetResources(moofoll), this.items = [ 0, 3, 6, 10 ], 
                        this.weapons = [ 0 ], this.shootCount = 0, this.weaponXP = [], this.reloads = {};
                    }
                }, {
                    key: "resetMoveDir",
                    value: function() {
                        this.moveDir = void 0;
                    }
                }, {
                    key: "resetResources",
                    value: function(moofoll) {
                        for (var i = 0; i < _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.resourceTypes.length; ++i) this.resources[_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.resourceTypes[i]] = moofoll ? 100 : 0;
                    }
                }, {
                    key: "addItem",
                    value: function(id) {
                        var tmpItem = _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.list[id];
                        if (tmpItem) {
                            for (var i = 0; i < this.items.length; ++i) if (_moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.list[this.items[i]].group == tmpItem.group) return this.buildIndex == this.items[i] && (this.buildIndex = id), 
                            this.items[i] = id, !0;
                            return this.items.push(id), !0;
                        }
                        return !1;
                    }
                }, {
                    key: "setUserData",
                    value: function(data) {
                        if (data) {
                            this.name = "unknown";
                            var name = data.name + "";
                            (name = (name = (name = (name = name.slice(0, _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.maxNameLength)).replace(/[^\w:\(\)\/? -]+/gim, " ")).replace(/[^\x00-\x7F]/g, " ")).trim()).length > 0 && (this.name = name), 
                            this.skinColor = 0, _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.skinColors[data.skin] && (this.skinColor = data.skin);
                        }
                    }
                }, {
                    key: "getData",
                    value: function() {
                        return [ this.id, this.sid, this.name, _type_MoomooUtil__WEBPACK_IMPORTED_MODULE_0__.util.fixTo(this.x, 2), _type_MoomooUtil__WEBPACK_IMPORTED_MODULE_0__.util.fixTo(this.y, 2), _type_MoomooUtil__WEBPACK_IMPORTED_MODULE_0__.util.fixTo(this.dir, 3), this.health, this.maxHealth, this.scale, this.skinColor ];
                    }
                }, {
                    key: "setData",
                    value: function(data) {
                        this.id = data[0], this.sid = data[1], this.name = data[2], this.x = data[3], this.y = data[4], 
                        this.dir = data[5], this.health = data[6], this.maxHealth = data[7], this.scale = data[8], 
                        this.skinColor = data[9];
                    }
                }, {
                    key: "update",
                    value: function(delta) {
                        if (this.alive) {
                            if (this.shameTimer > 0 && (this.shameTimer -= delta, this.shameTimer <= 0 && (this.shameTimer = 0, 
                            this.shameCount = 0)), this.timerCount -= delta, this.timerCount <= 0) {
                                var regenAmount = (this.skin && this.skin.healthRegen ? this.skin.healthRegen : 0) + (this.tail && this.tail.healthRegen ? this.tail.healthRegen : 0);
                                regenAmount && this.changeHealth(regenAmount, this), this.dmgOverTime.dmg && (this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer), 
                                this.dmgOverTime.time -= 1, this.dmgOverTime.time <= 0 && (this.dmgOverTime.dmg = 0)), 
                                this.healCol && this.changeHealth(this.healCol, this), this.timerCount = 1e3;
                            }
                            if (this.alive) {
                                if (this.slowMult < 1 && (this.slowMult += 8e-4 * delta, this.slowMult > 1 && (this.slowMult = 1)), 
                                this.noMovTimer += delta, (this.xVel || this.yVel) && (this.noMovTimer = 0), this.lockMove) this.xVel = 0, 
                                this.yVel = 0; else {
                                    var spdMult = (this.buildIndex >= 0 ? .5 : 1) * (_moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex].spdMult || 1) * (this.skin && this.skin.spdMult || 1) * (this.tail && this.tail.spdMult || 1) * (this.y <= _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.snowBiomeTop ? this.skin && this.skin.coldM ? 1 : _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.snowSpeed : 1) * this.slowMult;
                                    !this.zIndex && this.y >= _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.mapScale / 2 - _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.riverWidth / 2 && this.y <= _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.mapScale / 2 + _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.riverWidth / 2 && (this.skin && this.skin.watrImm ? (spdMult *= .75, 
                                    this.xVel += .4 * _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.waterCurrent * delta) : (spdMult *= .33, 
                                    this.xVel += _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.waterCurrent * delta));
                                    var xVel = null != this.moveDir ? Math.cos(this.moveDir) : 0, yVel = null != this.moveDir ? Math.sin(this.moveDir) : 0, length = Math.sqrt(xVel * xVel + yVel * yVel);
                                    0 != length && (xVel /= length, yVel /= length), xVel && (this.xVel += xVel * this.speed * spdMult * delta), 
                                    yVel && (this.yVel += yVel * this.speed * spdMult * delta);
                                }
                                this.zIndex = 0, this.lockMove = !1, this.healCol = 0;
                                var tmpSpeed = _type_MoomooUtil__WEBPACK_IMPORTED_MODULE_0__.util.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
                                if (Math.min(4, Math.max(1, Math.round(tmpSpeed / 40))), this.xVel && (this.xVel *= Math.pow(_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.playerDecel, delta), 
                                this.xVel <= .01 && this.xVel >= -.01 && (this.xVel = 0)), this.yVel && (this.yVel *= Math.pow(_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.playerDecel, delta), 
                                this.yVel <= .01 && this.yVel >= -.01 && (this.yVel = 0)), this.x - this.scale < 0 ? this.x = this.scale : this.x + this.scale > _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.mapScale && (this.x = _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.mapScale - this.scale), 
                                this.y - this.scale < 0 ? this.y = this.scale : this.y + this.scale > _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.mapScale && (this.y = _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.mapScale - this.scale), 
                                this.buildIndex < 0) if (this.reloads[this.weaponIndex] > 0) this.reloads[this.weaponIndex] -= delta, 
                                this.gathering = this.mouseState; else if (this.gathering || this.autoGather) {
                                    var worked = !0;
                                    null != _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex].gather ? this.gather() : null != _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex].projectile && this.hasRes(_moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0) ? (this.useRes(_moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0), 
                                    this.noMovTimer = 0, _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex].projectile, 
                                    this.scale, this.skin && this.skin.aMlt && this.skin.aMlt, _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex].rec && (this.xVel -= _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[null == this ? void 0 : this.weaponIndex].rec * Math.cos(this.dir), 
                                    this.yVel -= _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[null == this ? void 0 : this.weaponIndex].rec * Math.sin(this.dir))) : worked = !1, 
                                    this.gathering = this.mouseState, worked && (this.reloads[this.weaponIndex] = _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[null == this ? void 0 : this.weaponIndex].speed * (this.skin && this.skin.atkSpd || 1));
                                }
                            }
                        }
                    }
                }, {
                    key: "addWeaponXP",
                    value: function(amnt) {
                        this.weaponXP[this.weaponIndex] || (this.weaponXP[this.weaponIndex] = 0), this.weaponXP[this.weaponIndex] += amnt;
                    }
                }, {
                    key: "earnXP",
                    value: function(amount) {
                        this.age < _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.maxAge && (this.XP += amount, 
                        this.XP >= this.maxXP && (this.age < _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.maxAge ? (this.age++, 
                        this.XP = 0, this.maxXP *= 1.2) : this.XP = this.maxXP, this.upgradePoints++));
                    }
                }, {
                    key: "changeHealth",
                    value: function(amount, doer) {
                        return !(amount > 0 && this.health >= this.maxHealth || (amount < 0 && this.skin && (amount *= this.skin.dmgMult || 1), 
                        amount < 0 && this.tail && (amount *= this.tail.dmgMult || 1), amount < 0 && (this.hitTime = Date.now()), 
                        this.health += amount, this.health > this.maxHealth && (amount -= this.health - this.maxHealth, 
                        this.health = this.maxHealth), this.health <= 0 && this.kill(doer), 0));
                    }
                }, {
                    key: "kill",
                    value: function(doer) {}
                }, {
                    key: "addResource",
                    value: function(type, amount) {
                        var auto = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        !auto && amount > 0 && this.addWeaponXP(amount), this.resources[_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.resourceTypes[type]] += amount;
                    }
                }, {
                    key: "changeItemCount",
                    value: function(index, value) {
                        this.itemCounts[index] = this.itemCounts[index] || 0, this.itemCounts[index] += value;
                    }
                }, {
                    key: "buildItem",
                    value: function(item) {
                        this.scale, item.scale, item.placeOffset;
                        if (this.x, Math.cos(this.dir), this.y, Math.sin(this.dir), this.canBuild(item) && !(item.consume && this.skin && this.skin.noEat)) {
                            var worked = !1;
                            if (item.consume) {
                                if (this.hitTime) {
                                    var timeSinceHit = Date.now() - this.hitTime;
                                    this.hitTime = 0, timeSinceHit <= 120 ? (this.shameCount++, this.shameCount >= 8 && (this.shameTimer = 3e4, 
                                    this.shameCount = 0)) : (this.shameCount -= 2, this.shameCount <= 0 && (this.shameCount = 0));
                                }
                                this.shameTimer <= 0 && (worked = item.consume(this));
                            } else worked = !0, item.group.limit && this.changeItemCount(item.group.id, 1), 
                            item.pps && (this.pps += item.pps);
                            worked && (this.useRes(item), this.buildIndex = -1);
                        }
                    }
                }, {
                    key: "hasRes",
                    value: function(item, mult) {
                        for (var i = 0; i < item.req.length; ) {
                            if (this.resources[item.req[i]] < Math.round(item.req[i + 1] * (mult || 1))) return !1;
                            i += 2;
                        }
                        return !0;
                    }
                }, {
                    key: "useRes",
                    value: function(item, mult) {
                        if (!_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.inSandbox) for (var i = 0; i < item.req.length; ) this.addResource(_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.resourceTypes.indexOf(item.req[i]), -Math.round(item.req[i + 1] * (mult || 1))), 
                        i += 2;
                    }
                }, {
                    key: "canBuild",
                    value: function(item) {
                        return !!_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.inSandbox || !(item.group.limit && this.itemCounts[item.group.id] >= item.group.limit) && this.hasRes(item);
                    }
                }, {
                    key: "gather",
                    value: function() {
                        this.noMovTimer = 0, this.slowMult -= _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[this.weaponIndex].hitSlow || .3, 
                        this.slowMult < 0 && (this.slowMult = 0);
                        var tmpVariant = _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.fetchVariant(this);
                        null == tmpVariant || tmpVariant.poison, null == tmpVariant || tmpVariant.val;
                    }
                }, {
                    key: "sendAnimation",
                    value: function(hit) {}
                }, {
                    key: "animate",
                    value: function(delta) {
                        this.animTime > 0 && (this.animTime -= delta, this.animTime <= 0 ? (this.animTime = 0, 
                        this.dirPlus = 0, this.tmpRatio = 0, this.animIndex = 0) : 0 == this.animIndex ? (this.tmpRatio += delta / (this.animSpeed * _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.hitReturnRatio), 
                        this.dirPlus = _type_MoomooUtil__WEBPACK_IMPORTED_MODULE_0__.util.lerp(0, this.targetAngle, Math.min(1, this.tmpRatio)), 
                        this.tmpRatio >= 1 && (this.tmpRatio = 1, this.animIndex = 1)) : (this.tmpRatio -= delta / (this.animSpeed * (1 - _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.hitReturnRatio)), 
                        this.dirPlus = _type_MoomooUtil__WEBPACK_IMPORTED_MODULE_0__.util.lerp(0, this.targetAngle, Math.max(0, this.tmpRatio))));
                    }
                }, {
                    key: "startAnim",
                    value: function(didHit, index) {
                        this.animTime = this.animSpeed = _moomoo_items__WEBPACK_IMPORTED_MODULE_4__.items.weapons[index].speed, 
                        this.targetAngle = didHit ? -_moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.hitAngle : -Math.PI, 
                        this.tmpRatio = 0, this.animIndex = 0;
                    }
                }, {
                    key: "canSee",
                    value: function(other) {
                        if (!other) return !1;
                        if (other.skin && other.skin.invisTimer && other.noMovTimer >= other.skin.invisTimer) return !1;
                        var dx = Math.abs(other.x - this.x) - other.scale, dy = Math.abs(other.y - this.y) - other.scale;
                        return dx <= _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.maxScreenWidth / 2 * 1.3 && dy <= _moomoo_config__WEBPACK_IMPORTED_MODULE_2__.default.maxScreenHeight / 2 * 1.3;
                    }
                } ], protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Player;
            }();
        },
        "./frontend/src/event/Event.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => Event
            });
            var Event = function() {
                function Event() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, Event), this.canceled = !1;
                }
                var Constructor, protoProps, staticProps;
                return Constructor = Event, (protoProps = [ {
                    key: "cancel",
                    value: function() {
                        this.canceled = !0;
                    }
                }, {
                    key: "isCanceled",
                    value: function() {
                        return this.canceled;
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Event;
            }();
        },
        "./frontend/src/event/EventPacket.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
                var hasNativeReflectConstruct = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                        !0;
                    } catch (e) {
                        return !1;
                    }
                }();
                return function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return function(self) {
                    if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }(self);
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => EventPacket
            });
            var EventPacket = function(_Event) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(subClass, "prototype", {
                        writable: !1
                    }), superClass && _setPrototypeOf(subClass, superClass);
                }(EventPacket, _Event);
                var Constructor, protoProps, staticProps, _super = _createSuper(EventPacket);
                function EventPacket(packet) {
                    var _this;
                    return function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, EventPacket), (_this = _super.call(this)).packet = packet, _this;
                }
                return Constructor = EventPacket, (protoProps = [ {
                    key: "getPacket",
                    value: function() {
                        return this.packet;
                    }
                }, {
                    key: "setPacket",
                    value: function(packet) {
                        this.packet = packet;
                    }
                }, {
                    key: "setData",
                    value: function(data) {
                        this.packet.data = data;
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), EventPacket;
            }(__webpack_require__("./frontend/src/event/Event.ts").default);
        },
        "./frontend/src/render/RenderManager.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                Renderer: () => Renderer,
                default: () => RenderManager
            });
            var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tsee/lib/index.js"), _util_MathUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/util/MathUtil.ts"), _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/util/type/Vector.ts");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
                var hasNativeReflectConstruct = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                        !0;
                    } catch (e) {
                        return !1;
                    }
                }();
                return function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return _assertThisInitialized(self);
            }
            function _assertThisInitialized(self) {
                if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return self;
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }
            function _toPropertyKey(arg) {
                var key = function(input, hint) {
                    if ("object" !== _typeof(input) || null === input) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (void 0 !== prim) {
                        var res = prim.call(input, hint || "default");
                        if ("object" !== _typeof(res)) return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === hint ? String : Number)(input);
                }(arg, "string");
                return "symbol" === _typeof(key) ? key : String(key);
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            var Renderer = _createClass((function Renderer(renderManager) {
                _classCallCheck(this, Renderer), this.renderManager = renderManager;
            })), RenderManager = function(_EventEmitter) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(subClass, "prototype", {
                        writable: !1
                    }), superClass && _setPrototypeOf(subClass, superClass);
                }(RenderManager, _EventEmitter);
                var _super = _createSuper(RenderManager);
                function RenderManager(canvas, width, height) {
                    var _this, obj, key, value;
                    _classCallCheck(this, RenderManager), _this = _super.call(this), obj = _assertThisInitialized(_this), 
                    key = "canvasVertices", value = [ new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__.default, new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__.default ], 
                    (key = _toPropertyKey(key)) in obj ? Object.defineProperty(obj, key, {
                        value,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : obj[key] = value, _this.canvas = canvas, _this.context = canvas.getContext("2d"), 
                    _this.transformMatrix = new DOMMatrix([ 1, 0, 0, 1, 0, 0 ]), _this.defaultMatrix = new DOMMatrixReadOnly([ 1, 0, 0, 1, 0, 0 ]), 
                    _this.viewport = {
                        width,
                        height
                    }, _this.cameraPosition = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__.default(0, 0), 
                    _this.renderers = new Map, _this.lastRender = 0;
                    var resizeListener = function() {
                        canvas.width = window.innerWidth, canvas.height = window.innerHeight, _this.updateTransformMatrix(), 
                        _this.context.setTransform(_this.transformMatrix), _this.canvasVertices = [ _this.canvasToContext(0, 0), _this.canvasToContext(window.innerWidth, window.innerHeight) ];
                    };
                    return resizeListener(), window.addEventListener("resize", resizeListener), canvas.addEventListener("mousemove", (function(e) {
                        return _this.emit("mousemove", e);
                    })), canvas.addEventListener("mousedown", (function(e) {
                        return _this.emit("mousedown", e);
                    })), canvas.addEventListener("mouseup", (function(e) {
                        return _this.emit("mouseup", e);
                    })), _this;
                }
                return _createClass(RenderManager, [ {
                    key: "updateCamera",
                    value: function(delta, targetPosition) {
                        var distance = _util_MathUtil__WEBPACK_IMPORTED_MODULE_1__.default.getDistance(this.cameraPosition, targetPosition), direction = _util_MathUtil__WEBPACK_IMPORTED_MODULE_1__.default.getDirection(this.cameraPosition, targetPosition), speed = Math.min(.01 * distance * delta, distance);
                        distance > .05 ? this.cameraPosition.directionMove(direction, speed) : this.cameraPosition.set(targetPosition);
                    }
                }, {
                    key: "updateTransformMatrix",
                    value: function() {
                        var windowWidth = window.innerWidth, windowHeight = window.innerHeight, scale = Math.max(windowWidth / this.viewport.width, windowHeight / this.viewport.height);
                        this.transformMatrix.a = this.transformMatrix.d = scale, this.transformMatrix.e = (windowWidth - this.viewport.width * scale) / 2, 
                        this.transformMatrix.f = (windowHeight - this.viewport.height * scale) / 2;
                    }
                }, {
                    key: "clear",
                    value: function() {
                        this.context.clearRect(this.canvasVertices[0].x, this.canvasVertices[0].y, this.canvasVertices[1].x - this.canvasVertices[0].x, this.canvasVertices[1].y - this.canvasVertices[0].y);
                    }
                }, {
                    key: "render",
                    value: function() {
                        var _this2 = this, currentMs = Date.now(), delta = currentMs - this.lastRender;
                        this.lastRender = currentMs, this.renderers.forEach((function(renderer) {
                            renderer.render(delta);
                        })), window.requestAnimationFrame((function() {
                            return _this2.render();
                        }));
                    }
                }, {
                    key: "createRenderer",
                    value: function(id, rendererClass) {
                        this.renderers.set(id, new rendererClass(this));
                    }
                }, {
                    key: "startRender",
                    value: function() {
                        var _this3 = this;
                        this.lastRender = Date.now(), window.requestAnimationFrame((function() {
                            return _this3.render();
                        }));
                    }
                }, {
                    key: "getCameraOffset",
                    value: function() {
                        return new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__.default(this.cameraPosition.x - this.viewport.width / 2, this.cameraPosition.y - this.viewport.height / 2);
                    }
                }, {
                    key: "mapToContext",
                    value: function(param1, param2) {
                        var offset = this.getCameraOffset();
                        return "object" === _typeof(param1) ? param1.clone().subtract(offset) : new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__.default(param1 - offset.x, param2 - offset.y);
                    }
                }, {
                    key: "canvasToMap",
                    value: function(param1, param2) {
                        var offset = this.getCameraOffset();
                        return "object" === _typeof(param1) ? param1.clone().subtract(this.transformMatrix.e, this.transformMatrix.f).divide(this.transformMatrix.a, this.transformMatrix.d).add(offset) : new _util_type_Vector__WEBPACK_IMPORTED_MODULE_2__.default((param1 - this.transformMatrix.e) / this.transformMatrix.a + offset.x, (param2 - this.transformMatrix.f) / this.transformMatrix.d + offset.y);
                    }
                }, {
                    key: "canvasToContext",
                    value: function(param1, param2) {
                        return "object" === _typeof(param1) ? this.mapToContext(this.canvasToMap(param1)) : this.mapToContext(this.canvasToMap(param1, param2));
                    }
                } ]), RenderManager;
            }(tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);
        },
        "./frontend/src/render/background/BackgroundRenderer.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => BackgroundRenderer
            });
            var _util_type_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./frontend/src/util/type/Vector.ts");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
                var hasNativeReflectConstruct = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                        !0;
                    } catch (e) {
                        return !1;
                    }
                }();
                return function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return function(self) {
                    if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }(self);
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            var BackgroundRenderer = function(_Renderer) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(subClass, "prototype", {
                        writable: !1
                    }), superClass && _setPrototypeOf(subClass, superClass);
                }(BackgroundRenderer, _Renderer);
                var Constructor, protoProps, staticProps, _super = _createSuper(BackgroundRenderer);
                function BackgroundRenderer(renderManager) {
                    var _this;
                    return function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, BackgroundRenderer), (_this = _super.call(this, renderManager)).pos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_0__.default, 
                    renderManager.on("mousemove", (function(event) {
                        _this.pos = new _util_type_Vector__WEBPACK_IMPORTED_MODULE_0__.default(event.clientX, event.clientY);
                    })), _this;
                }
                return Constructor = BackgroundRenderer, (protoProps = [ {
                    key: "render",
                    value: function(delta) {
                        var vec = this.renderManager.canvasToMap(this.pos), mapCorner = this.renderManager.canvasToContext(new _util_type_Vector__WEBPACK_IMPORTED_MODULE_0__.default(50, 30));
                        this.renderManager.context.lineJoin = "round", this.renderManager.context.font = "20px Poppins", 
                        this.renderManager.context.strokeStyle = "black", this.renderManager.context.fillStyle = "white", 
                        this.renderManager.context.lineWidth = 5, this.renderManager.context.strokeText(vec.toString(!0), mapCorner.x, mapCorner.y), 
                        this.renderManager.context.fillText(vec.toString(!0), mapCorner.x, mapCorner.y);
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), BackgroundRenderer;
            }(__webpack_require__("./frontend/src/render/RenderManager.ts").Renderer);
        },
        "./frontend/src/socket/Connection.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                connection: () => connection
            });
            var error_stack_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/error-stack-parser/error-stack-parser.js"), error_stack_parser__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(error_stack_parser__WEBPACK_IMPORTED_MODULE_0__), events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/events/events.js"), events__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__), _event_EventPacket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/event/EventPacket.ts"), _util_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./frontend/src/util/Logger.ts"), _packets_Packet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./frontend/src/socket/packets/Packet.ts"), _packets_PacketFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./frontend/src/socket/packets/PacketFactory.ts");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _get() {
                return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(target, property, receiver) {
                    var base = _superPropBase(target, property);
                    if (base) {
                        var desc = Object.getOwnPropertyDescriptor(base, property);
                        return desc.get ? desc.get.call(arguments.length < 3 ? target : receiver) : desc.value;
                    }
                }, _get.apply(this, arguments);
            }
            function _superPropBase(object, property) {
                for (;!Object.prototype.hasOwnProperty.call(object, property) && null !== (object = _getPrototypeOf(object)); ) ;
                return object;
            }
            function _wrapNativeSuper(Class) {
                var _cache = "function" == typeof Map ? new Map : void 0;
                return _wrapNativeSuper = function(Class) {
                    if (null === Class || (fn = Class, -1 === Function.toString.call(fn).indexOf("[native code]"))) return Class;
                    var fn;
                    if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== _cache) {
                        if (_cache.has(Class)) return _cache.get(Class);
                        _cache.set(Class, Wrapper);
                    }
                    function Wrapper() {
                        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                    }
                    return Wrapper.prototype = Object.create(Class.prototype, {
                        constructor: {
                            value: Wrapper,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), _setPrototypeOf(Wrapper, Class);
                }, _wrapNativeSuper(Class);
            }
            function _construct(Parent, args, Class) {
                return _construct = _isNativeReflectConstruct() ? Reflect.construct.bind() : function(Parent, args, Class) {
                    var a = [ null ];
                    a.push.apply(a, args);
                    var instance = new (Function.bind.apply(Parent, a));
                    return Class && _setPrototypeOf(instance, Class.prototype), instance;
                }, _construct.apply(null, arguments);
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            function _createClass(Constructor, protoProps, staticProps) {
                return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(subClass, "prototype", {
                    writable: !1
                }), superClass && _setPrototypeOf(subClass, superClass);
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
                var hasNativeReflectConstruct = _isNativeReflectConstruct();
                return function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return _assertThisInitialized(self);
            }
            function _assertThisInitialized(self) {
                if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return self;
            }
            function _isNativeReflectConstruct() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            var connection, logger = new _util_Logger__WEBPACK_IMPORTED_MODULE_3__.default("connection"), packetFactory = _packets_PacketFactory__WEBPACK_IMPORTED_MODULE_5__.PacketFactory.getInstance(), Connection = function(_EventEmitter) {
                _inherits(Connection, _EventEmitter);
                var _super = _createSuper(Connection);
                function Connection() {
                    var _this;
                    return _classCallCheck(this, Connection), (_this = _super.call(this)).socket = null, 
                    _this.defaultReceiver = null, _this;
                }
                return _createClass(Connection, [ {
                    key: "injectSocket",
                    value: function(socket) {
                        this.socket = socket;
                    }
                }, {
                    key: "send",
                    value: function(packet) {
                        this.socket && 1 == this.socket.readyState && this.socket.send(packetFactory.serializePacket(packet), !0);
                    }
                } ]), Connection;
            }(events__WEBPACK_IMPORTED_MODULE_1___default());
            connection = new Connection;
            var Injection = function(_WebSocket) {
                _inherits(Injection, _WebSocket);
                var _super2 = _createSuper(Injection);
                function Injection(url, protocols) {
                    var _this2;
                    return _classCallCheck(this, Injection), _this2 = _super2.call(this, url, protocols), 
                    connection.socket ? _possibleConstructorReturn(_this2) : (connection.injectSocket(_assertThisInitialized(_this2)), 
                    _this2.addEventListener("open", (function() {
                        logger.info("connection injected"), connection.emit("ready");
                    })), _this2.addEventListener("close", (function(event) {
                        logger.info("connection closed"), connection.emit("close", event.reason);
                    })), _this2.addEventListener("message", (function(_ref) {
                        var buffer = _ref.data;
                        try {
                            var _event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_2__.default(packetFactory.deserializePacket(buffer, _packets_Packet__WEBPACK_IMPORTED_MODULE_4__.Side.Client, Date.now()));
                            if (connection.emit("packetreceive", _event), _event.isCanceled()) return;
                            var serialized = packetFactory.serializePacket(_event.getPacket());
                            connection.defaultReceiver ? connection.defaultReceiver(new Proxy(new MessageEvent(""), {
                                get: function(target, property, receiver) {
                                    return "data" === property ? serialized : "name" !== property ? target[property] : void 0;
                                }
                            })) : logger.warn("default receiver is null! this should not happen!");
                        } catch (err) {
                            logger.error(err);
                        }
                    })), Object.defineProperty(_assertThisInitialized(_this2), "onmessage", {
                        get: function() {
                            return null;
                        },
                        set: function(func) {
                            connection.defaultReceiver = func, console.log("default receiver");
                        }
                    }), _this2);
                }
                return _createClass(Injection, [ {
                    key: "send",
                    value: function(data) {
                        var event = new _event_EventPacket__WEBPACK_IMPORTED_MODULE_2__.default(packetFactory.deserializePacket(data, _packets_Packet__WEBPACK_IMPORTED_MODULE_4__.Side.Server, Date.now()));
                        connection.emit("packetsend", event), event.isCanceled() || _get(_getPrototypeOf(Injection.prototype), "send", this).call(this, packetFactory.serializePacket(event.getPacket()));
                    }
                } ]), Injection;
            }(_wrapNativeSuper(WebSocket));
            Object.defineProperty(window, "WebSocket", {
                get: function() {
                    return console.log(error_stack_parser__WEBPACK_IMPORTED_MODULE_0___default().parse(new Error)), 
                    Injection;
                },
                set: function(a) {
                    console.log("set:", (new Error).stack, a);
                }
            });
        },
        "./frontend/src/socket/PacketHandler.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                PacketHandler: () => PacketHandler
            });
            var _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./frontend/src/data/moomoo/items.ts"), _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/data/type/GameObject.ts"), _data_type_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/data/type/Player.ts"), _core_Core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./frontend/src/core/Core.ts"), _packets_PacketType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./frontend/src/socket/packets/PacketType.ts");
            var PacketHandler = {
                process: function(packet) {
                    switch (packet.type) {
                      case _packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PLAYER_ADD:
                        var player = new _data_type_Player__WEBPACK_IMPORTED_MODULE_2__.default(packet.data[0][0], packet.data[0][1]);
                        player.spawn(), player.setData(packet.data[0]), _core_Core__WEBPACK_IMPORTED_MODULE_3__.players.push(player), 
                        packet.data[1] && (0, _core_Core__WEBPACK_IMPORTED_MODULE_3__.setCurrentPlayer)(player);
                        break;

                      case _packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.PLAYER_UPDATE:
                        for (var i = 0; i < _core_Core__WEBPACK_IMPORTED_MODULE_3__.players.length; i++) _core_Core__WEBPACK_IMPORTED_MODULE_3__.players[i].visible = !1;
                        for (var _i = 0; _i < packet.data[0].length / 13; _i++) {
                            var playerData = packet.data[0].slice(13 * _i, 13 * _i + 13), _player = _core_Core__WEBPACK_IMPORTED_MODULE_3__.players.findBySid(playerData[0]);
                            _player.x = playerData[1], _player.y = playerData[2], _player.dir = playerData[3], 
                            _player.buildIndex = playerData[4], _player.weaponIndex = playerData[5], _player.weaponVariant = playerData[6], 
                            _player.team = playerData[7], _player.isLeader = playerData[8], _player.skinIndex = playerData[9], 
                            _player.tailIndex = playerData[10], _player.iconIndex = playerData[11], _player.zIndex = playerData[12], 
                            _player.visible = !0;
                        }
                        break;

                      case _packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.LOAD_GAME_OBJ:
                        for (var _i2 = 0; _i2 < packet.data[0].length / 8; _i2++) {
                            var objectData = packet.data[0].slice(8 * _i2, 8 * _i2 + 8), _object = _core_Core__WEBPACK_IMPORTED_MODULE_3__.buildings.findBySid(objectData[0]);
                            _object || (_object = new _data_type_GameObject__WEBPACK_IMPORTED_MODULE_1__.GameObject(objectData[0])), 
                            _object.init(objectData[1], objectData[2], objectData[3], objectData[4], objectData[5], _data_moomoo_items__WEBPACK_IMPORTED_MODULE_0__.items.list[objectData[6]], objectData[7] >= 0 ? {
                                sid: objectData[7]
                            } : null), _core_Core__WEBPACK_IMPORTED_MODULE_3__.buildings.push(_object);
                        }
                        break;

                      case _packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.REMOVE_GAME_OBJ:
                        _core_Core__WEBPACK_IMPORTED_MODULE_3__.buildings.findBySid(packet.data[0]) && _core_Core__WEBPACK_IMPORTED_MODULE_3__.buildings.removeBySid(packet.data[0]);
                        break;

                      case _packets_PacketType__WEBPACK_IMPORTED_MODULE_4__.PacketType.REMOVE_ALL_OBJ:
                        for (var _i3 = 0; _i3 < _core_Core__WEBPACK_IMPORTED_MODULE_3__.buildings.length; _i3++) {
                            var building = _core_Core__WEBPACK_IMPORTED_MODULE_3__.buildings[_i3];
                            building.active && building.owner && building.owner.sid == packet.data[0] && (building.active = !1);
                        }
                    }
                }
            };
        },
        "./frontend/src/socket/packets/Packet.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            function _createClass(Constructor, protoProps, staticProps) {
                return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            var Side;
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                Packet: () => Packet,
                Side: () => Side
            }), function(Side) {
                Side[Side.Server = 0] = "Server", Side[Side.Client = 1] = "Client", Side[Side.Both = 2] = "Both";
            }(Side || (Side = {}));
            var Packet = _createClass((function Packet(type, data) {
                var time = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                _classCallCheck(this, Packet), this.type = type, this.data = data, this.time = time;
            }));
        },
        "./frontend/src/socket/packets/PacketFactory.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                PacketFactory: () => PacketFactory,
                Side: () => _Packet__WEBPACK_IMPORTED_MODULE_0__.Side,
                packetTypeMapping: () => packetTypeMapping,
                reversePacketTypeMapping: () => reversePacketTypeMapping
            });
            var _Packet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./frontend/src/socket/packets/Packet.ts"), _PacketType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/socket/packets/PacketType.ts"), msgpack_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/msgpack-lite/lib/browser.js");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            var packetTypeMapping = {};
            packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ATTACK] = {
                value: "c",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.AUTO_ATK] = {
                value: "7",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CHAT] = {
                value: "ch",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Both
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_ACC_JOIN] = {
                value: "11",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DEATH] = {
                value: "11",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_CREATE] = {
                value: "8",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_LIST] = {
                value: "id",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_ADD] = {
                value: "ac",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_DEL] = {
                value: "ad",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_KICK] = {
                value: "12",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_REQ_JOIN] = {
                value: "10",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.DISCONN] = {
                value: "d",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.GATHER_ANIM] = {
                value: "7",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.BUY_AND_EQUIP] = {
                value: "13c",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.HEALTH_UPDATE] = {
                value: "h",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ITEM_BUY] = {
                value: "13",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LEADERBOARD_UPDATE] = {
                value: "5",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LEAVE_CLAN] = {
                value: "9",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.LOAD_GAME_OBJ] = {
                value: "6",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.MINIMAP] = {
                value: "mm",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PING] = {
                value: "pp",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Both
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_MOVE] = {
                value: "33",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_ANIMALS] = {
                value: "a",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_REMOVE] = {
                value: "4",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_SET_CLAN] = {
                value: "st",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_START] = {
                value: "1",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_UPDATE] = {
                value: "33",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SELECT_ITEM] = {
                value: "5",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SELECT_UPGRADE] = {
                value: "6",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SET_ANGLE] = {
                value: "2",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SET_CLAN_PLAYERS] = {
                value: "sa",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_AGE] = {
                value: "15",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_HEALTH] = {
                value: "h",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_NOTIFY_SERVER] = {
                value: "14",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.CLAN_NOTIFY_CLIENT] = {
                value: "p",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_PLACE_LIMIT] = {
                value: "14",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.SPAWN] = {
                value: "sp",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_ITEMS] = {
                value: "17",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_STORE] = {
                value: "us",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPGRADES] = {
                value: "16",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.WIGGLE] = {
                value: "8",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.WINDOW_FOCUS] = {
                value: "rmd",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.PLAYER_ADD] = {
                value: "2",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_STATS] = {
                value: "9",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.IO_INIT] = {
                value: "io-init",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.HEALTH_CHANGE] = {
                value: "t",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.JOIN_REQUEST] = {
                value: "an",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.REMOVE_GAME_OBJ] = {
                value: "12",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.REMOVE_ALL_OBJ] = {
                value: "13",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Server
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.ADD_PROJECTILE] = {
                value: "18",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            }, packetTypeMapping[_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType.UPDATE_PROJECTILES] = {
                value: "19",
                side: _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Client
            };
            for (var reversePacketTypeMapping = [], _i = 0, _Object$keys = Object.keys(packetTypeMapping); _i < _Object$keys.length; _i++) {
                var _key = _Object$keys[_i];
                reversePacketTypeMapping.push({
                    type: parseInt(_key),
                    side: packetTypeMapping[_key].side,
                    value: packetTypeMapping[_key].value
                });
            }
            var PacketFactory = function() {
                function PacketFactory() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, PacketFactory);
                }
                var Constructor, protoProps, staticProps;
                return Constructor = PacketFactory, protoProps = [ {
                    key: "serializePacket",
                    value: function(packet) {
                        if (!Object.values(_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType).includes(packet.type)) throw new Error("Packet is missing a type.");
                        var type;
                        if (!Object.keys(packetTypeMapping).includes(packet.type.toString())) throw new Error("Packet type invalid or not implemented: ".concat(_PacketType__WEBPACK_IMPORTED_MODULE_1__.PacketType[packet.type]));
                        type = packetTypeMapping[packet.type].value;
                        try {
                            return msgpack_lite__WEBPACK_IMPORTED_MODULE_2__.encode([ type, packet.data ]);
                        } catch (error) {
                            throw new Error("msgpack encountered an error: ".concat(error));
                        }
                    }
                }, {
                    key: "deserializePacket",
                    value: function(buffer, side) {
                        var array, timeStamp = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                        try {
                            array = msgpack_lite__WEBPACK_IMPORTED_MODULE_2__.decode(new Uint8Array(buffer));
                        } catch (error) {
                            throw new Error("Invalid packet");
                        }
                        var mapping = reversePacketTypeMapping.find((function(mapping) {
                            return (mapping.side === side || mapping.side === _Packet__WEBPACK_IMPORTED_MODULE_0__.Side.Both) && mapping.value === array[0];
                        }));
                        if (mapping) return new _Packet__WEBPACK_IMPORTED_MODULE_0__.Packet(mapping.type, array[1], timeStamp);
                        throw new Error("Invalid packet type: ".concat(array[0]));
                    }
                } ], staticProps = [ {
                    key: "getInstance",
                    value: function() {
                        return PacketFactory.instance ? PacketFactory.instance : PacketFactory.instance = new PacketFactory;
                    }
                } ], protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), PacketFactory;
            }();
        },
        "./frontend/src/socket/packets/PacketType.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            var PacketType;
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                PacketType: () => PacketType
            }), function(PacketType) {
                PacketType[PacketType.PING = 0] = "PING", PacketType[PacketType.PLAYER_UPDATE = 1] = "PLAYER_UPDATE", 
                PacketType[PacketType.PLAYER_MOVE = 2] = "PLAYER_MOVE", PacketType[PacketType.HEALTH_UPDATE = 3] = "HEALTH_UPDATE", 
                PacketType[PacketType.UPGRADES = 4] = "UPGRADES", PacketType[PacketType.SELECT_ITEM = 5] = "SELECT_ITEM", 
                PacketType[PacketType.LEADERBOARD_UPDATE = 6] = "LEADERBOARD_UPDATE", PacketType[PacketType.ATTACK = 7] = "ATTACK", 
                PacketType[PacketType.UPDATE_STATS = 8] = "UPDATE_STATS", PacketType[PacketType.LOAD_GAME_OBJ = 9] = "LOAD_GAME_OBJ", 
                PacketType[PacketType.PLAYER_START = 10] = "PLAYER_START", PacketType[PacketType.SET_ANGLE = 11] = "SET_ANGLE", 
                PacketType[PacketType.PLAYER_REMOVE = 12] = "PLAYER_REMOVE", PacketType[PacketType.SELECT_UPGRADE = 13] = "SELECT_UPGRADE", 
                PacketType[PacketType.GATHER_ANIM = 14] = "GATHER_ANIM", PacketType[PacketType.AUTO_ATK = 15] = "AUTO_ATK", 
                PacketType[PacketType.WIGGLE = 16] = "WIGGLE", PacketType[PacketType.CLAN_CREATE = 17] = "CLAN_CREATE", 
                PacketType[PacketType.LEAVE_CLAN = 18] = "LEAVE_CLAN", PacketType[PacketType.CLAN_REQ_JOIN = 19] = "CLAN_REQ_JOIN", 
                PacketType[PacketType.UPDATE_HEALTH = 20] = "UPDATE_HEALTH", PacketType[PacketType.CLAN_ACC_JOIN = 21] = "CLAN_ACC_JOIN", 
                PacketType[PacketType.CLAN_KICK = 22] = "CLAN_KICK", PacketType[PacketType.ITEM_BUY = 23] = "ITEM_BUY", 
                PacketType[PacketType.UPDATE_AGE = 24] = "UPDATE_AGE", PacketType[PacketType.UPDATE_ITEMS = 25] = "UPDATE_ITEMS", 
                PacketType[PacketType.CHAT = 26] = "CHAT", PacketType[PacketType.CLAN_DEL = 27] = "CLAN_DEL", 
                PacketType[PacketType.PLAYER_SET_CLAN = 28] = "PLAYER_SET_CLAN", PacketType[PacketType.SET_CLAN_PLAYERS = 29] = "SET_CLAN_PLAYERS", 
                PacketType[PacketType.CLAN_ADD = 30] = "CLAN_ADD", PacketType[PacketType.MINIMAP = 31] = "MINIMAP", 
                PacketType[PacketType.UPDATE_STORE = 32] = "UPDATE_STORE", PacketType[PacketType.DISCONN = 33] = "DISCONN", 
                PacketType[PacketType.WINDOW_FOCUS = 34] = "WINDOW_FOCUS", PacketType[PacketType.PLAYER_ADD = 35] = "PLAYER_ADD", 
                PacketType[PacketType.SPAWN = 36] = "SPAWN", PacketType[PacketType.IO_INIT = 37] = "IO_INIT", 
                PacketType[PacketType.UPDATE_ANIMALS = 38] = "UPDATE_ANIMALS", PacketType[PacketType.CLAN_LIST = 39] = "CLAN_LIST", 
                PacketType[PacketType.BUY_AND_EQUIP = 40] = "BUY_AND_EQUIP", PacketType[PacketType.DEATH = 41] = "DEATH", 
                PacketType[PacketType.CLAN_NOTIFY_SERVER = 42] = "CLAN_NOTIFY_SERVER", PacketType[PacketType.CLAN_NOTIFY_CLIENT = 43] = "CLAN_NOTIFY_CLIENT", 
                PacketType[PacketType.HEALTH_CHANGE = 44] = "HEALTH_CHANGE", PacketType[PacketType.JOIN_REQUEST = 45] = "JOIN_REQUEST", 
                PacketType[PacketType.REMOVE_GAME_OBJ = 46] = "REMOVE_GAME_OBJ", PacketType[PacketType.REMOVE_ALL_OBJ = 47] = "REMOVE_ALL_OBJ", 
                PacketType[PacketType.UPDATE_PLACE_LIMIT = 48] = "UPDATE_PLACE_LIMIT", PacketType[PacketType.ADD_PROJECTILE = 49] = "ADD_PROJECTILE", 
                PacketType[PacketType.UPDATE_PROJECTILES = 50] = "UPDATE_PROJECTILES";
            }(PacketType || (PacketType = {}));
        },
        "./frontend/src/util/DocumentUtil.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var listeners_waitForElement = [], observer = new MutationObserver((function(mutations) {
                for (var i = 0, length = mutations.length; i < length; i++) {
                    var mutation = mutations[i];
                    if ("childList" == mutation.type) for (var j = 0, length2 = mutation.addedNodes.length; j < length2; j++) {
                        var node = mutation.addedNodes[j];
                        if (node instanceof HTMLElement) for (var k = 0, length3 = listeners_waitForElement.length; k < length3; k++) {
                            var listener = listeners_waitForElement[k];
                            node.matches(listener[0]) && (listener[1](node), listeners_waitForElement.splice(listeners_waitForElement.indexOf(listener), 1));
                        }
                    }
                }
            }));
            const __WEBPACK_DEFAULT_EXPORT__ = {
                init: function(doc) {
                    observer.observe(doc.body, {
                        childList: !0,
                        subtree: !0
                    });
                },
                waitForElement: function(selector, callback) {
                    var el;
                    (el = document.querySelector(selector)) ? callback(el) : listeners_waitForElement.push([ selector, callback ]);
                }
            };
        },
        "./frontend/src/util/Logger.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _toConsumableArray(arr) {
                return function(arr) {
                    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
                }(arr) || function(iter) {
                    if ("undefined" != typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) return Array.from(iter);
                }(arr) || function(o, minLen) {
                    if (!o) return;
                    if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
                    var n = Object.prototype.toString.call(o).slice(8, -1);
                    "Object" === n && o.constructor && (n = o.constructor.name);
                    if ("Map" === n || "Set" === n) return Array.from(o);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
                }(arr) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
            }
            function _arrayLikeToArray(arr, len) {
                (null == len || len > arr.length) && (len = arr.length);
                for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
                return arr2;
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            var Level;
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            }), function(Level) {
                Level[Level.LOG = 0] = "LOG", Level[Level.INFO = 1] = "INFO", Level[Level.WARN = 2] = "WARN", 
                Level[Level.ERROR = 3] = "ERROR";
            }(Level || (Level = {}));
            var LogLevel = new Map;
            function format(loggerId, level) {
                for (var _len = arguments.length, msg = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) msg[_key - 2] = arguments[_key];
                return [ "NVR | ".concat(loggerId, ": [").concat(LogLevel.get(level), "] ->") ].concat(msg);
            }
            LogLevel.set(Level.LOG, "LOG"), LogLevel.set(Level.INFO, "INFO"), LogLevel.set(Level.WARN, "WARN"), 
            LogLevel.set(Level.ERROR, "ERROR");
            const __WEBPACK_DEFAULT_EXPORT__ = function() {
                function Logger(id) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, Logger), this.id = id, this.profilers = new Map;
                }
                var Constructor, protoProps, staticProps;
                return Constructor = Logger, protoProps = [ {
                    key: "log",
                    value: function() {
                        for (var _console, _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) message[_key2] = arguments[_key2];
                        (_console = console).log.apply(_console, _toConsumableArray(format.apply(void 0, [ this.id, Level.LOG ].concat(message))));
                    }
                }, {
                    key: "info",
                    value: function() {
                        for (var _console2, _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) message[_key3] = arguments[_key3];
                        (_console2 = console).log.apply(_console2, _toConsumableArray(format.apply(void 0, [ this.id, Level.INFO ].concat(message))));
                    }
                }, {
                    key: "warn",
                    value: function() {
                        for (var _console3, _len4 = arguments.length, message = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) message[_key4] = arguments[_key4];
                        (_console3 = console).log.apply(_console3, _toConsumableArray(format.apply(void 0, [ this.id, Level.WARN ].concat(message))));
                    }
                }, {
                    key: "error",
                    value: function() {
                        for (var _console4, _len5 = arguments.length, message = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) message[_key5] = arguments[_key5];
                        (_console4 = console).log.apply(_console4, _toConsumableArray(format.apply(void 0, [ this.id, Level.ERROR ].concat(message))));
                    }
                }, {
                    key: "profile",
                    value: function(profileId) {
                        if (this.profilers.has(profileId)) {
                            for (var _console5, _len6 = arguments.length, message = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) message[_key6 - 1] = arguments[_key6];
                            (_console5 = console).log.apply(_console5, _toConsumableArray(format.apply(void 0, [ this.id, Level.LOG ].concat(message, [ "(took ".concat(Date.now() - this.profilers.get(profileId), " ms)") ])))), 
                            this.profilers.delete(profileId);
                        } else this.profilers.set(profileId, Date.now());
                    }
                } ], protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Logger;
            }();
        },
        "./frontend/src/util/MathUtil.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            const __WEBPACK_DEFAULT_EXPORT__ = {
                randInt: function(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                },
                randFloat: function(min, max) {
                    return Math.random() * (max - min) + min;
                },
                lerp: function(value1, value2, amount) {
                    return value1 + (value2 - value1) * amount;
                },
                decel: function(val, cel) {
                    return val > 0 ? val = Math.max(0, val - cel) : val < 0 && (val = Math.min(0, val + cel)), 
                    val;
                },
                getDistance: function(pos1, pos2) {
                    return pos1.clone().subtract(pos2).hypot();
                },
                getDirection: function(from, to) {
                    return Math.atan2(to.y - from.y, to.x - from.y);
                },
                getAngleDist: function(a, b) {
                    var p = Math.abs(b - a) % (2 * Math.PI);
                    return p > Math.PI ? 2 * Math.PI - p : p;
                },
                lerpAngle: function(value1, value2, amount) {
                    Math.abs(value2 - value1) > Math.PI && (value1 > value2 ? value2 += 2 * Math.PI : value1 += 2 * Math.PI);
                    var value = value2 + (value1 - value2) * amount;
                    return value >= 0 && value <= 2 * Math.PI ? value : value % Math.PI * 2;
                }
            };
        },
        "./frontend/src/util/engine/PacketCountEngine.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                PacketCountEngine: () => PacketCountEngine
            });
            var tsee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tsee/lib/index.js"), _socket_Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/socket/Connection.ts"), _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/socket/packets/PacketType.ts");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                }
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
                var hasNativeReflectConstruct = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                        !0;
                    } catch (e) {
                        return !1;
                    }
                }();
                return function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return function(self) {
                    if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }(self);
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            function _defineProperty(obj, key, value) {
                return (key = _toPropertyKey(key)) in obj ? Object.defineProperty(obj, key, {
                    value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            function _toPropertyKey(arg) {
                var key = function(input, hint) {
                    if ("object" !== _typeof(input) || null === input) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (void 0 !== prim) {
                        var res = prim.call(input, hint || "default");
                        if ("object" !== _typeof(res)) return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === hint ? String : Number)(input);
                }(arg, "string");
                return "symbol" === _typeof(key) ? key : String(key);
            }
            var PacketCountEngine = function(_EventEmitter) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(subClass, "prototype", {
                        writable: !1
                    }), superClass && _setPrototypeOf(subClass, superClass);
                }(PacketCountEngine, _EventEmitter);
                var Constructor, protoProps, staticProps, _super = _createSuper(PacketCountEngine);
                function PacketCountEngine(core) {
                    var _this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, PacketCountEngine), (_this = _super.call(this)).timer = PacketCountEngine.TIMER_MAX, 
                    _this.packetCount = 0;
                    return _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetsend", (function(packet) {
                        _this.packetCount++;
                    })), _socket_Connection__WEBPACK_IMPORTED_MODULE_1__.connection.on("packetreceive", (function(event) {
                        event.getPacket().type === _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_2__.PacketType.IO_INIT && (_this.timer = PacketCountEngine.TIMER_MAX, 
                        _this.packetCount = 1, core.on("update", (function(delta) {
                            if (_this.timer -= delta, _this.timer < 0) {
                                var excession = -1 * _this.timer;
                                _this.timer = PacketCountEngine.TIMER_MAX - excession, _this.packetCount = 0;
                            }
                        })));
                    })), _this;
                }
                return Constructor = PacketCountEngine, (protoProps = [ {
                    key: "handleFirstPing",
                    value: function(ping) {
                        this.timer -= ping;
                    }
                }, {
                    key: "available",
                    get: function() {
                        return Math.max(PacketCountEngine.AVAILABLE - this.packetCount, 0);
                    }
                }, {
                    key: "availableTotal",
                    get: function() {
                        return Math.max(PacketCountEngine.PACKET_LIMIT - this.packetCount, 0);
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), PacketCountEngine;
            }(tsee__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);
            _defineProperty(PacketCountEngine, "TIMER_MAX", 6e4), _defineProperty(PacketCountEngine, "PACKET_LIMIT", 3e3), 
            _defineProperty(PacketCountEngine, "AVAILABLE", PacketCountEngine.PACKET_LIMIT - 750);
        },
        "./frontend/src/util/engine/TickEngine.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                TickEngine: () => TickEngine
            });
            var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/events/events.js"), events__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__), _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/data/moomoo/config.ts"), _socket_Connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/socket/Connection.ts"), _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./frontend/src/socket/packets/PacketType.ts");
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
                var hasNativeReflectConstruct = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                        !0;
                    } catch (e) {
                        return !1;
                    }
                }();
                return function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return function(self) {
                    if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }(self);
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            var TickEngine = function(_EventEmitter) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(subClass, "prototype", {
                        writable: !1
                    }), superClass && _setPrototypeOf(subClass, superClass);
                }(TickEngine, _EventEmitter);
                var Constructor, protoProps, staticProps, _super = _createSuper(TickEngine);
                function TickEngine(core) {
                    var _this;
                    return function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, TickEngine), (_this = _super.call(this)).tickIndex = 0, _this.pingQueue = [], 
                    _this.ping = 0, _this.lastTick = 0, _this.nextTick = 0, _socket_Connection__WEBPACK_IMPORTED_MODULE_2__.connection.on("packetsend", (function(packet) {
                        packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.PING && _this.pingQueue.push(Date.now());
                    })), _socket_Connection__WEBPACK_IMPORTED_MODULE_2__.connection.on("packetreceive", (function(event) {
                        var packet = event.getPacket();
                        packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.PING ? (_this.ping = (Date.now() - _this.pingQueue.shift()) / 2, 
                        _this.emit("ping", _this.ping)) : packet.type == _socket_packets_PacketType__WEBPACK_IMPORTED_MODULE_3__.PacketType.PLAYER_UPDATE && (_this.lastTick = Date.now() - _this.ping, 
                        _this.serverLag > 0 && _this.emit("serverlag", _this.serverLag), _this.nextTick = _this.lastTick + 1e3 / _data_moomoo_config__WEBPACK_IMPORTED_MODULE_1__.default.serverUpdateRate, 
                        _this.emit("tick", ++_this.tickIndex));
                    })), core.on("update", (function(delta) {
                        Date.now() + _this.ping + _this.serverLag + 1.15 * delta >= _this.nextTick && _this.emit("unsafetick", _this.tickIndex + 1);
                    })), _this;
                }
                return Constructor = TickEngine, (protoProps = [ {
                    key: "tick",
                    value: function() {
                        this.lastTick = Date.now();
                    }
                }, {
                    key: "serverLag",
                    get: function() {
                        return Math.max(Date.now() - this.nextTick, 0);
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), TickEngine;
            }(events__WEBPACK_IMPORTED_MODULE_0___default());
        },
        "./frontend/src/util/type/SidArray.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            function _possibleConstructorReturn(self, call) {
                if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
                if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
                return function(self) {
                    if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }(self);
            }
            function _wrapNativeSuper(Class) {
                var _cache = "function" == typeof Map ? new Map : void 0;
                return _wrapNativeSuper = function(Class) {
                    if (null === Class || (fn = Class, -1 === Function.toString.call(fn).indexOf("[native code]"))) return Class;
                    var fn;
                    if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== _cache) {
                        if (_cache.has(Class)) return _cache.get(Class);
                        _cache.set(Class, Wrapper);
                    }
                    function Wrapper() {
                        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                    }
                    return Wrapper.prototype = Object.create(Class.prototype, {
                        constructor: {
                            value: Wrapper,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), _setPrototypeOf(Wrapper, Class);
                }, _wrapNativeSuper(Class);
            }
            function _construct(Parent, args, Class) {
                return _construct = _isNativeReflectConstruct() ? Reflect.construct.bind() : function(Parent, args, Class) {
                    var a = [ null ];
                    a.push.apply(a, args);
                    var instance = new (Function.bind.apply(Parent, a));
                    return Class && _setPrototypeOf(instance, Class.prototype), instance;
                }, _construct.apply(null, arguments);
            }
            function _isNativeReflectConstruct() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }
            function _setPrototypeOf(o, p) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
                    return o.__proto__ = p, o;
                }, _setPrototypeOf(o, p);
            }
            function _getPrototypeOf(o) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                }, _getPrototypeOf(o);
            }
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                SidArray: () => SidArray
            });
            var SidArray = function(_Array) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(subClass, "prototype", {
                        writable: !1
                    }), superClass && _setPrototypeOf(subClass, superClass);
                }(SidArray, _Array);
                var Derived, hasNativeReflectConstruct, Constructor, protoProps, staticProps, _super = (Derived = SidArray, 
                hasNativeReflectConstruct = _isNativeReflectConstruct(), function() {
                    var result, Super = _getPrototypeOf(Derived);
                    if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                    } else result = Super.apply(this, arguments);
                    return _possibleConstructorReturn(this, result);
                });
                function SidArray() {
                    var size = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    return _classCallCheck(this, SidArray), _super.call(this, size);
                }
                return Constructor = SidArray, (protoProps = [ {
                    key: "findBySid",
                    value: function(sid) {
                        for (var i = 0, length = this.length; i < length; i++) {
                            var player = this[i];
                            if (player.sid === sid) return player;
                        }
                        return null;
                    }
                }, {
                    key: "remove",
                    value: function(item) {
                        var index = this.indexOf(item);
                        index > -1 && this.splice(index, 1);
                    }
                }, {
                    key: "removeBySid",
                    value: function(sid) {
                        this.remove(this.findBySid(sid));
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), SidArray;
            }(_wrapNativeSuper(Array));
        },
        "./frontend/src/util/type/Vector.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, (arg = descriptor.key, 
                    key = void 0, key = function(input, hint) {
                        if ("object" !== _typeof(input) || null === input) return input;
                        var prim = input[Symbol.toPrimitive];
                        if (void 0 !== prim) {
                            var res = prim.call(input, hint || "default");
                            if ("object" !== _typeof(res)) return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === hint ? String : Number)(input);
                    }(arg, "string"), "symbol" === _typeof(key) ? key : String(key)), descriptor);
                }
                var arg, key;
            }
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => Vector
            });
            var Vector = function() {
                function Vector(x, y) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, Vector), this.x = null != x ? x : 0, this.y = null != y ? y : 0;
                }
                var Constructor, protoProps, staticProps;
                return Constructor = Vector, (protoProps = [ {
                    key: "add",
                    value: function(param1, param2) {
                        return "object" === _typeof(param1) ? (this.x += param1.x, this.y += param1.y) : "number" == typeof param2 ? (this.x += param1, 
                        this.y += param2) : (this.x += param1, this.y += param1), this;
                    }
                }, {
                    key: "subtract",
                    value: function(param1, param2) {
                        return "object" === _typeof(param1) ? (this.x -= param1.x, this.y -= param1.y) : "number" == typeof param2 ? (this.x -= param1, 
                        this.y -= param2) : (this.x -= param1, this.y -= param1), this;
                    }
                }, {
                    key: "multiply",
                    value: function(param1, param2) {
                        return "object" === _typeof(param1) ? (this.x *= param1.x, this.y *= param1.y) : "number" == typeof param2 ? (this.x *= param1, 
                        this.y *= param2) : (this.x *= param1, this.y *= param1), this;
                    }
                }, {
                    key: "divide",
                    value: function(param1, param2) {
                        return "object" === _typeof(param1) ? (this.x /= param1.x, this.y /= param1.y) : "number" == typeof param2 ? (this.x /= param1, 
                        this.y /= param2) : (this.x /= param1, this.y /= param1), this;
                    }
                }, {
                    key: "set",
                    value: function(param1, param2) {
                        return "object" === _typeof(param1) ? (this.x = param1.x, this.y = param1.y) : "number" == typeof param2 ? (this.x = param1, 
                        this.y = param2) : (this.x = param1, this.y = param1), this;
                    }
                }, {
                    key: "directionMove",
                    value: function(direction, amount) {
                        this.x += Math.cos(direction) * amount, this.y += Math.sin(direction) * amount;
                    }
                }, {
                    key: "clone",
                    value: function() {
                        return new Vector(this.x, this.y);
                    }
                }, {
                    key: "hypot",
                    value: function() {
                        return Math.hypot(this.x, this.y);
                    }
                }, {
                    key: "toString",
                    value: function(round) {
                        return "[" + (round ? Math.round(this.x) : this.x) + ", " + (round ? Math.round(this.y) : this.y) + "]";
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Vector;
            }();
        },
        "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/main.scss": (module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js"), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, "* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  overflow: hidden;\n}\n\ncanvas {\n  background-color: #000009;\n}", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        "./node_modules/css-loader/dist/runtime/api.js": module => {
            "use strict";
            module.exports = function(cssWithMappingToString) {
                var list = [];
                return list.toString = function() {
                    return this.map((function(item) {
                        var content = "", needLayer = void 0 !== item[5];
                        return item[4] && (content += "@supports (".concat(item[4], ") {")), item[2] && (content += "@media ".concat(item[2], " {")), 
                        needLayer && (content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {")), 
                        content += cssWithMappingToString(item), needLayer && (content += "}"), item[2] && (content += "}"), 
                        item[4] && (content += "}"), content;
                    })).join("");
                }, list.i = function(modules, media, dedupe, supports, layer) {
                    "string" == typeof modules && (modules = [ [ null, modules, void 0 ] ]);
                    var alreadyImportedModules = {};
                    if (dedupe) for (var k = 0; k < this.length; k++) {
                        var id = this[k][0];
                        null != id && (alreadyImportedModules[id] = !0);
                    }
                    for (var _k = 0; _k < modules.length; _k++) {
                        var item = [].concat(modules[_k]);
                        dedupe && alreadyImportedModules[item[0]] || (void 0 !== layer && (void 0 === item[5] || (item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}")), 
                        item[5] = layer), media && (item[2] ? (item[1] = "@media ".concat(item[2], " {").concat(item[1], "}"), 
                        item[2] = media) : item[2] = media), supports && (item[4] ? (item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}"), 
                        item[4] = supports) : item[4] = "".concat(supports)), list.push(item));
                    }
                }, list;
            };
        },
        "./node_modules/css-loader/dist/runtime/noSourceMaps.js": module => {
            "use strict";
            module.exports = function(i) {
                return i[1];
            };
        },
        "./node_modules/error-stack-parser/error-stack-parser.js": function(module, exports, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            !function(root, factory) {
                "use strict";
                __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__("./node_modules/stackframe/stackframe.js") ], 
                void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = function(StackFrame) {
                    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/, CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m, SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
                    return {
                        parse: function(error) {
                            if (void 0 !== error.stacktrace || void 0 !== error["opera#sourceloc"]) return this.parseOpera(error);
                            if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) return this.parseV8OrIE(error);
                            if (error.stack) return this.parseFFOrSafari(error);
                            throw new Error("Cannot parse given Error object");
                        },
                        extractLocation: function(urlLike) {
                            if (-1 === urlLike.indexOf(":")) return [ urlLike ];
                            var parts = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(urlLike.replace(/[()]/g, ""));
                            return [ parts[1], parts[2] || void 0, parts[3] || void 0 ];
                        },
                        parseV8OrIE: function(error) {
                            return error.stack.split("\n").filter((function(line) {
                                return !!line.match(CHROME_IE_STACK_REGEXP);
                            }), this).map((function(line) {
                                line.indexOf("(eval ") > -1 && (line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
                                var sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, ""), location = sanitizedLine.match(/ (\(.+\)$)/);
                                sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
                                var locationParts = this.extractLocation(location ? location[1] : sanitizedLine), functionName = location && sanitizedLine || void 0, fileName = [ "eval", "<anonymous>" ].indexOf(locationParts[0]) > -1 ? void 0 : locationParts[0];
                                return new StackFrame({
                                    functionName,
                                    fileName,
                                    lineNumber: locationParts[1],
                                    columnNumber: locationParts[2],
                                    source: line
                                });
                            }), this);
                        },
                        parseFFOrSafari: function(error) {
                            return error.stack.split("\n").filter((function(line) {
                                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
                            }), this).map((function(line) {
                                if (line.indexOf(" > eval") > -1 && (line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), 
                                -1 === line.indexOf("@") && -1 === line.indexOf(":")) return new StackFrame({
                                    functionName: line
                                });
                                var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/, matches = line.match(functionNameRegex), functionName = matches && matches[1] ? matches[1] : void 0, locationParts = this.extractLocation(line.replace(functionNameRegex, ""));
                                return new StackFrame({
                                    functionName,
                                    fileName: locationParts[0],
                                    lineNumber: locationParts[1],
                                    columnNumber: locationParts[2],
                                    source: line
                                });
                            }), this);
                        },
                        parseOpera: function(e) {
                            return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e);
                        },
                        parseOpera9: function(e) {
                            for (var lineRE = /Line (\d+).*script (?:in )?(\S+)/i, lines = e.message.split("\n"), result = [], i = 2, len = lines.length; i < len; i += 2) {
                                var match = lineRE.exec(lines[i]);
                                match && result.push(new StackFrame({
                                    fileName: match[2],
                                    lineNumber: match[1],
                                    source: lines[i]
                                }));
                            }
                            return result;
                        },
                        parseOpera10: function(e) {
                            for (var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, lines = e.stacktrace.split("\n"), result = [], i = 0, len = lines.length; i < len; i += 2) {
                                var match = lineRE.exec(lines[i]);
                                match && result.push(new StackFrame({
                                    functionName: match[3] || void 0,
                                    fileName: match[2],
                                    lineNumber: match[1],
                                    source: lines[i]
                                }));
                            }
                            return result;
                        },
                        parseOpera11: function(error) {
                            return error.stack.split("\n").filter((function(line) {
                                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
                            }), this).map((function(line) {
                                var argsRaw, tokens = line.split("@"), locationParts = this.extractLocation(tokens.pop()), functionCall = tokens.shift() || "", functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
                                functionCall.match(/\(([^)]*)\)/) && (argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
                                var args = void 0 === argsRaw || "[arguments not available]" === argsRaw ? void 0 : argsRaw.split(",");
                                return new StackFrame({
                                    functionName,
                                    args,
                                    fileName: locationParts[0],
                                    lineNumber: locationParts[1],
                                    columnNumber: locationParts[2],
                                    source: line
                                });
                            }), this);
                        }
                    };
                }) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
            }();
        },
        "./node_modules/event-lite/event-lite.js": module => {
            !function(EventLite) {
                module.exports = EventLite;
                var methods = {
                    on: function(type, func) {
                        return getListeners(this, type).push(func), this;
                    },
                    once: function(type, func) {
                        var that = this;
                        return wrap.originalListener = func, getListeners(that, type).push(wrap), that;
                        function wrap() {
                            off.call(that, type, wrap), func.apply(this, arguments);
                        }
                    },
                    off,
                    emit: function(type, value) {
                        var that = this, listeners = getListeners(that, type, !0);
                        if (!listeners) return !1;
                        var arglen = arguments.length;
                        if (1 === arglen) listeners.forEach(zeroarg); else if (2 === arglen) listeners.forEach(onearg); else {
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
                };
                function mixin(target) {
                    for (var key in methods) target[key] = methods[key];
                    return target;
                }
                function off(type, func) {
                    var listners, that = this;
                    if (arguments.length) {
                        if (func) {
                            if (listners = getListeners(that, type, !0)) {
                                if (!(listners = listners.filter(ne)).length) return off.call(that, type);
                                that.listeners[type] = listners;
                            }
                        } else if ((listners = that.listeners) && (delete listners[type], !Object.keys(listners).length)) return off.call(that);
                    } else delete that.listeners;
                    return that;
                    function ne(test) {
                        return test !== func && test.originalListener !== func;
                    }
                }
                function getListeners(that, type, readonly) {
                    if (!readonly || that.listeners) {
                        var listeners = that.listeners || (that.listeners = {});
                        return listeners[type] || (listeners[type] = []);
                    }
                }
                mixin(EventLite.prototype), EventLite.mixin = mixin;
            }((function EventLite() {
                if (!(this instanceof EventLite)) return new EventLite;
            }));
        },
        "./node_modules/events/events.js": module => {
            "use strict";
            var ReflectOwnKeys, R = "object" == typeof Reflect ? Reflect : null, ReflectApply = R && "function" == typeof R.apply ? R.apply : function(target, receiver, args) {
                return Function.prototype.apply.call(target, receiver, args);
            };
            ReflectOwnKeys = R && "function" == typeof R.ownKeys ? R.ownKeys : Object.getOwnPropertySymbols ? function(target) {
                return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
            } : function(target) {
                return Object.getOwnPropertyNames(target);
            };
            var NumberIsNaN = Number.isNaN || function(value) {
                return value != value;
            };
            function EventEmitter() {
                EventEmitter.init.call(this);
            }
            module.exports = EventEmitter, module.exports.once = function(emitter, name) {
                return new Promise((function(resolve, reject) {
                    function errorListener(err) {
                        emitter.removeListener(name, resolver), reject(err);
                    }
                    function resolver() {
                        "function" == typeof emitter.removeListener && emitter.removeListener("error", errorListener), 
                        resolve([].slice.call(arguments));
                    }
                    eventTargetAgnosticAddListener(emitter, name, resolver, {
                        once: !0
                    }), "error" !== name && function(emitter, handler, flags) {
                        "function" == typeof emitter.on && eventTargetAgnosticAddListener(emitter, "error", handler, flags);
                    }(emitter, errorListener, {
                        once: !0
                    });
                }));
            }, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, 
            EventEmitter.prototype._eventsCount = 0, EventEmitter.prototype._maxListeners = void 0;
            var defaultMaxListeners = 10;
            function checkListener(listener) {
                if ("function" != typeof listener) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
            }
            function _getMaxListeners(that) {
                return void 0 === that._maxListeners ? EventEmitter.defaultMaxListeners : that._maxListeners;
            }
            function _addListener(target, type, listener, prepend) {
                var m, events, existing, warning;
                if (checkListener(listener), void 0 === (events = target._events) ? (events = target._events = Object.create(null), 
                target._eventsCount = 0) : (void 0 !== events.newListener && (target.emit("newListener", type, listener.listener ? listener.listener : listener), 
                events = target._events), existing = events[type]), void 0 === existing) existing = events[type] = listener, 
                ++target._eventsCount; else if ("function" == typeof existing ? existing = events[type] = prepend ? [ listener, existing ] : [ existing, listener ] : prepend ? existing.unshift(listener) : existing.push(listener), 
                (m = _getMaxListeners(target)) > 0 && existing.length > m && !existing.warned) {
                    existing.warned = !0;
                    var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    w.name = "MaxListenersExceededWarning", w.emitter = target, w.type = type, w.count = existing.length, 
                    warning = w, console && console.warn && console.warn(warning);
                }
                return target;
            }
            function onceWrapper() {
                if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 
                0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
            }
            function _onceWrap(target, type, listener) {
                var state = {
                    fired: !1,
                    wrapFn: void 0,
                    target,
                    type,
                    listener
                }, wrapped = onceWrapper.bind(state);
                return wrapped.listener = listener, state.wrapFn = wrapped, wrapped;
            }
            function _listeners(target, type, unwrap) {
                var events = target._events;
                if (void 0 === events) return [];
                var evlistener = events[type];
                return void 0 === evlistener ? [] : "function" == typeof evlistener ? unwrap ? [ evlistener.listener || evlistener ] : [ evlistener ] : unwrap ? function(arr) {
                    for (var ret = new Array(arr.length), i = 0; i < ret.length; ++i) ret[i] = arr[i].listener || arr[i];
                    return ret;
                }(evlistener) : arrayClone(evlistener, evlistener.length);
            }
            function listenerCount(type) {
                var events = this._events;
                if (void 0 !== events) {
                    var evlistener = events[type];
                    if ("function" == typeof evlistener) return 1;
                    if (void 0 !== evlistener) return evlistener.length;
                }
                return 0;
            }
            function arrayClone(arr, n) {
                for (var copy = new Array(n), i = 0; i < n; ++i) copy[i] = arr[i];
                return copy;
            }
            function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
                if ("function" == typeof emitter.on) flags.once ? emitter.once(name, listener) : emitter.on(name, listener); else {
                    if ("function" != typeof emitter.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
                    emitter.addEventListener(name, (function wrapListener(arg) {
                        flags.once && emitter.removeEventListener(name, wrapListener), listener(arg);
                    }));
                }
            }
            Object.defineProperty(EventEmitter, "defaultMaxListeners", {
                enumerable: !0,
                get: function() {
                    return defaultMaxListeners;
                },
                set: function(arg) {
                    if ("number" != typeof arg || arg < 0 || NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
                    defaultMaxListeners = arg;
                }
            }), EventEmitter.init = function() {
                void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), 
                this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
            }, EventEmitter.prototype.setMaxListeners = function(n) {
                if ("number" != typeof n || n < 0 || NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
                return this._maxListeners = n, this;
            }, EventEmitter.prototype.getMaxListeners = function() {
                return _getMaxListeners(this);
            }, EventEmitter.prototype.emit = function(type) {
                for (var args = [], i = 1; i < arguments.length; i++) args.push(arguments[i]);
                var doError = "error" === type, events = this._events;
                if (void 0 !== events) doError = doError && void 0 === events.error; else if (!doError) return !1;
                if (doError) {
                    var er;
                    if (args.length > 0 && (er = args[0]), er instanceof Error) throw er;
                    var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
                    throw err.context = er, err;
                }
                var handler = events[type];
                if (void 0 === handler) return !1;
                if ("function" == typeof handler) ReflectApply(handler, this, args); else {
                    var len = handler.length, listeners = arrayClone(handler, len);
                    for (i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
                }
                return !0;
            }, EventEmitter.prototype.addListener = function(type, listener) {
                return _addListener(this, type, listener, !1);
            }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.prependListener = function(type, listener) {
                return _addListener(this, type, listener, !0);
            }, EventEmitter.prototype.once = function(type, listener) {
                return checkListener(listener), this.on(type, _onceWrap(this, type, listener)), 
                this;
            }, EventEmitter.prototype.prependOnceListener = function(type, listener) {
                return checkListener(listener), this.prependListener(type, _onceWrap(this, type, listener)), 
                this;
            }, EventEmitter.prototype.removeListener = function(type, listener) {
                var list, events, position, i, originalListener;
                if (checkListener(listener), void 0 === (events = this._events)) return this;
                if (void 0 === (list = events[type])) return this;
                if (list === listener || list.listener === listener) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete events[type], 
                events.removeListener && this.emit("removeListener", type, list.listener || listener)); else if ("function" != typeof list) {
                    for (position = -1, i = list.length - 1; i >= 0; i--) if (list[i] === listener || list[i].listener === listener) {
                        originalListener = list[i].listener, position = i;
                        break;
                    }
                    if (position < 0) return this;
                    0 === position ? list.shift() : function(list, index) {
                        for (;index + 1 < list.length; index++) list[index] = list[index + 1];
                        list.pop();
                    }(list, position), 1 === list.length && (events[type] = list[0]), void 0 !== events.removeListener && this.emit("removeListener", type, originalListener || listener);
                }
                return this;
            }, EventEmitter.prototype.off = EventEmitter.prototype.removeListener, EventEmitter.prototype.removeAllListeners = function(type) {
                var listeners, events, i;
                if (void 0 === (events = this._events)) return this;
                if (void 0 === events.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), 
                this._eventsCount = 0) : void 0 !== events[type] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete events[type]), 
                this;
                if (0 === arguments.length) {
                    var key, keys = Object.keys(events);
                    for (i = 0; i < keys.length; ++i) "removeListener" !== (key = keys[i]) && this.removeAllListeners(key);
                    return this.removeAllListeners("removeListener"), this._events = Object.create(null), 
                    this._eventsCount = 0, this;
                }
                if ("function" == typeof (listeners = events[type])) this.removeListener(type, listeners); else if (void 0 !== listeners) for (i = listeners.length - 1; i >= 0; i--) this.removeListener(type, listeners[i]);
                return this;
            }, EventEmitter.prototype.listeners = function(type) {
                return _listeners(this, type, !0);
            }, EventEmitter.prototype.rawListeners = function(type) {
                return _listeners(this, type, !1);
            }, EventEmitter.listenerCount = function(emitter, type) {
                return "function" == typeof emitter.listenerCount ? emitter.listenerCount(type) : listenerCount.call(emitter, type);
            }, EventEmitter.prototype.listenerCount = listenerCount, EventEmitter.prototype.eventNames = function() {
                return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
            };
        },
        "./node_modules/ieee754/index.js": (__unused_webpack_module, exports) => {
            exports.read = function(buffer, offset, isLE, mLen, nBytes) {
                var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
                for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i], 
                i += d, nBits -= 8) ;
                for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], 
                i += d, nBits -= 8) ;
                if (0 === e) e = 1 - eBias; else {
                    if (e === eMax) return m ? NaN : 1 / 0 * (s ? -1 : 1);
                    m += Math.pow(2, mLen), e -= eBias;
                }
                return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
            }, exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
                var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
                for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, 
                e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, 
                c *= 2), (value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias)) * c >= 2 && (e++, 
                c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), 
                e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, 
                i += d, m /= 256, mLen -= 8) ;
                for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, 
                e /= 256, eLen -= 8) ;
                buffer[offset + i - d] |= 128 * s;
            };
        },
        "./node_modules/int64-buffer/int64-buffer.js": function(__unused_webpack_module, exports) {
            !function(exports) {
                var storage, BUFFER = "undefined" != typeof Buffer && Buffer, UINT8ARRAY = "undefined" != typeof Uint8Array && Uint8Array, ARRAYBUFFER = "undefined" != typeof ArrayBuffer && ArrayBuffer, ZERO = [ 0, 0, 0, 0, 0, 0, 0, 0 ], isArray = Array.isArray || function(val) {
                    return !!val && "[object Array]" == Object.prototype.toString.call(val);
                }, BIT32 = 4294967296;
                function factory(name, bigendian, unsigned) {
                    var posH = bigendian ? 0 : 4, posL = bigendian ? 4 : 0, pos0 = bigendian ? 0 : 3, pos1 = bigendian ? 1 : 2, pos2 = bigendian ? 2 : 1, pos3 = bigendian ? 3 : 0, fromPositive = bigendian ? fromPositiveBE : fromPositiveLE, fromNegative = bigendian ? fromNegativeBE : fromNegativeLE, proto = Int64.prototype, isName = "is" + name, _isInt64 = "_" + isName;
                    return proto.buffer = void 0, proto.offset = 0, proto[_isInt64] = !0, proto.toNumber = toNumber, 
                    proto.toString = function(radix) {
                        var buffer = this.buffer, offset = this.offset, high = readInt32(buffer, offset + posH), low = readInt32(buffer, offset + posL), str = "", sign = !unsigned && 2147483648 & high;
                        sign && (high = ~high, low = BIT32 - low);
                        radix = radix || 10;
                        for (;;) {
                            var mod = high % radix * BIT32 + low;
                            if (high = Math.floor(high / radix), low = Math.floor(mod / radix), str = (mod % radix).toString(radix) + str, 
                            !high && !low) break;
                        }
                        sign && (str = "-" + str);
                        return str;
                    }, proto.toJSON = toNumber, proto.toArray = toArray, BUFFER && (proto.toBuffer = toBuffer), 
                    UINT8ARRAY && (proto.toArrayBuffer = toArrayBuffer), Int64[isName] = function(b) {
                        return !(!b || !b[_isInt64]);
                    }, exports[name] = Int64, Int64;
                    function Int64(buffer, offset, value, raddix) {
                        return this instanceof Int64 ? function(that, buffer, offset, value, raddix) {
                            UINT8ARRAY && ARRAYBUFFER && (buffer instanceof ARRAYBUFFER && (buffer = new UINT8ARRAY(buffer)), 
                            value instanceof ARRAYBUFFER && (value = new UINT8ARRAY(value)));
                            if (!(buffer || offset || value || storage)) return void (that.buffer = newArray(ZERO, 0));
                            if (!isValidBuffer(buffer, offset)) {
                                raddix = offset, value = buffer, offset = 0, buffer = new (storage || Array)(8);
                            }
                            if (that.buffer = buffer, that.offset = offset |= 0, void 0 === value) return;
                            "string" == typeof value ? function(buffer, offset, str, raddix) {
                                var pos = 0, len = str.length, high = 0, low = 0;
                                "-" === str[0] && pos++;
                                var sign = pos;
                                for (;pos < len; ) {
                                    var chr = parseInt(str[pos++], raddix);
                                    if (!(chr >= 0)) break;
                                    low = low * raddix + chr, high = high * raddix + Math.floor(low / BIT32), low %= BIT32;
                                }
                                sign && (high = ~high, low ? low = BIT32 - low : high++);
                                writeInt32(buffer, offset + posH, high), writeInt32(buffer, offset + posL, low);
                            }(buffer, offset, value, raddix || 10) : isValidBuffer(value, raddix) ? fromArray(buffer, offset, value, raddix) : "number" == typeof raddix ? (writeInt32(buffer, offset + posH, value), 
                            writeInt32(buffer, offset + posL, raddix)) : value > 0 ? fromPositive(buffer, offset, value) : value < 0 ? fromNegative(buffer, offset, value) : fromArray(buffer, offset, ZERO, 0);
                        }(this, buffer, offset, value, raddix) : new Int64(buffer, offset, value, raddix);
                    }
                    function toNumber() {
                        var buffer = this.buffer, offset = this.offset, high = readInt32(buffer, offset + posH), low = readInt32(buffer, offset + posL);
                        return unsigned || (high |= 0), high ? high * BIT32 + low : low;
                    }
                    function writeInt32(buffer, offset, value) {
                        buffer[offset + pos3] = 255 & value, value >>= 8, buffer[offset + pos2] = 255 & value, 
                        value >>= 8, buffer[offset + pos1] = 255 & value, value >>= 8, buffer[offset + pos0] = 255 & value;
                    }
                    function readInt32(buffer, offset) {
                        return 16777216 * buffer[offset + pos0] + (buffer[offset + pos1] << 16) + (buffer[offset + pos2] << 8) + buffer[offset + pos3];
                    }
                }
                function toArray(raw) {
                    var buffer = this.buffer, offset = this.offset;
                    return storage = null, !1 !== raw && 0 === offset && 8 === buffer.length && isArray(buffer) ? buffer : newArray(buffer, offset);
                }
                function toBuffer(raw) {
                    var buffer = this.buffer, offset = this.offset;
                    if (storage = BUFFER, !1 !== raw && 0 === offset && 8 === buffer.length && Buffer.isBuffer(buffer)) return buffer;
                    var dest = new BUFFER(8);
                    return fromArray(dest, 0, buffer, offset), dest;
                }
                function toArrayBuffer(raw) {
                    var buffer = this.buffer, offset = this.offset, arrbuf = buffer.buffer;
                    if (storage = UINT8ARRAY, !1 !== raw && 0 === offset && arrbuf instanceof ARRAYBUFFER && 8 === arrbuf.byteLength) return arrbuf;
                    var dest = new UINT8ARRAY(8);
                    return fromArray(dest, 0, buffer, offset), dest.buffer;
                }
                function isValidBuffer(buffer, offset) {
                    var len = buffer && buffer.length;
                    return offset |= 0, len && offset + 8 <= len && "string" != typeof buffer[offset];
                }
                function fromArray(destbuf, destoff, srcbuf, srcoff) {
                    destoff |= 0, srcoff |= 0;
                    for (var i = 0; i < 8; i++) destbuf[destoff++] = 255 & srcbuf[srcoff++];
                }
                function newArray(buffer, offset) {
                    return Array.prototype.slice.call(buffer, offset, offset + 8);
                }
                function fromPositiveBE(buffer, offset, value) {
                    for (var pos = offset + 8; pos > offset; ) buffer[--pos] = 255 & value, value /= 256;
                }
                function fromNegativeBE(buffer, offset, value) {
                    var pos = offset + 8;
                    for (value++; pos > offset; ) buffer[--pos] = 255 & -value ^ 255, value /= 256;
                }
                function fromPositiveLE(buffer, offset, value) {
                    for (var end = offset + 8; offset < end; ) buffer[offset++] = 255 & value, value /= 256;
                }
                function fromNegativeLE(buffer, offset, value) {
                    var end = offset + 8;
                    for (value++; offset < end; ) buffer[offset++] = 255 & -value ^ 255, value /= 256;
                }
                factory("Uint64BE", !0, !0), factory("Int64BE", !0, !1), factory("Uint64LE", !1, !0), 
                factory("Int64LE", !1, !1);
            }("string" != typeof exports.nodeName ? exports : this || {});
        },
        "./node_modules/isarray/index.js": module => {
            var toString = {}.toString;
            module.exports = Array.isArray || function(arr) {
                return "[object Array]" == toString.call(arr);
            };
        },
        "./node_modules/msgpack-lite/lib/browser.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.encode = __webpack_require__("./node_modules/msgpack-lite/lib/encode.js").encode, 
            exports.decode = __webpack_require__("./node_modules/msgpack-lite/lib/decode.js").decode, 
            exports.Encoder = __webpack_require__("./node_modules/msgpack-lite/lib/encoder.js").Encoder, 
            exports.Decoder = __webpack_require__("./node_modules/msgpack-lite/lib/decoder.js").Decoder, 
            exports.createCodec = __webpack_require__("./node_modules/msgpack-lite/lib/ext.js").createCodec, 
            exports.codec = __webpack_require__("./node_modules/msgpack-lite/lib/codec.js").codec;
        },
        "./node_modules/msgpack-lite/lib/buffer-global.js": function(module) {
            function c(B) {
                return B && B.isBuffer && B;
            }
            module.exports = c("undefined" != typeof Buffer && Buffer) || c(this.Buffer) || c("undefined" != typeof window && window.Buffer) || this.Buffer;
        },
        "./node_modules/msgpack-lite/lib/buffer-lite.js": (__unused_webpack_module, exports) => {
            exports.copy = function(target, targetStart, start, end) {
                var i;
                start || (start = 0);
                end || 0 === end || (end = this.length);
                targetStart || (targetStart = 0);
                var len = end - start;
                if (target === this && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; i--) target[i + targetStart] = this[i + start]; else for (i = 0; i < len; i++) target[i + targetStart] = this[i + start];
                return len;
            }, exports.toString = function(encoding, start, end) {
                var index = 0 | start;
                end || (end = this.length);
                var string = "", chr = 0;
                for (;index < end; ) (chr = this[index++]) < 128 ? string += String.fromCharCode(chr) : (192 == (224 & chr) ? chr = (31 & chr) << 6 | 63 & this[index++] : 224 == (240 & chr) ? chr = (15 & chr) << 12 | (63 & this[index++]) << 6 | 63 & this[index++] : 240 == (248 & chr) && (chr = (7 & chr) << 18 | (63 & this[index++]) << 12 | (63 & this[index++]) << 6 | 63 & this[index++]), 
                chr >= 65536 ? (chr -= 65536, string += String.fromCharCode(55296 + (chr >>> 10), 56320 + (1023 & chr))) : string += String.fromCharCode(chr));
                return string;
            }, exports.write = function(string, offset) {
                var index = offset || (offset |= 0), length = string.length, chr = 0, i = 0;
                for (;i < length; ) (chr = string.charCodeAt(i++)) < 128 ? this[index++] = chr : chr < 2048 ? (this[index++] = 192 | chr >>> 6, 
                this[index++] = 128 | 63 & chr) : chr < 55296 || chr > 57343 ? (this[index++] = 224 | chr >>> 12, 
                this[index++] = 128 | chr >>> 6 & 63, this[index++] = 128 | 63 & chr) : (chr = 65536 + (chr - 55296 << 10 | string.charCodeAt(i++) - 56320), 
                this[index++] = 240 | chr >>> 18, this[index++] = 128 | chr >>> 12 & 63, this[index++] = 128 | chr >>> 6 & 63, 
                this[index++] = 128 | 63 & chr);
                return index - offset;
            };
        },
        "./node_modules/msgpack-lite/lib/bufferish-array.js": (module, __unused_webpack_exports, __webpack_require__) => {
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), exports = module.exports = alloc(0);
            function alloc(size) {
                return new Array(size);
            }
            exports.alloc = alloc, exports.concat = Bufferish.concat, exports.from = function(value) {
                if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) value = Bufferish.Uint8Array.from(value); else if (Bufferish.isArrayBuffer(value)) value = new Uint8Array(value); else {
                    if ("string" == typeof value) return Bufferish.from.call(exports, value);
                    if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
                }
                return Array.prototype.slice.call(value);
            };
        },
        "./node_modules/msgpack-lite/lib/bufferish-buffer.js": (module, __unused_webpack_exports, __webpack_require__) => {
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), Buffer = Bufferish.global, exports = module.exports = Bufferish.hasBuffer ? alloc(0) : [];
            function alloc(size) {
                return new Buffer(size);
            }
            exports.alloc = Bufferish.hasBuffer && Buffer.alloc || alloc, exports.concat = Bufferish.concat, 
            exports.from = function(value) {
                if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) value = Bufferish.Uint8Array.from(value); else if (Bufferish.isArrayBuffer(value)) value = new Uint8Array(value); else {
                    if ("string" == typeof value) return Bufferish.from.call(exports, value);
                    if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
                }
                return Buffer.from && 1 !== Buffer.from.length ? Buffer.from(value) : new Buffer(value);
            };
        },
        "./node_modules/msgpack-lite/lib/bufferish-proto.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var method, BufferLite = __webpack_require__("./node_modules/msgpack-lite/lib/buffer-lite.js");
            exports.copy = copy, exports.slice = slice, exports.toString = function(encoding, start, end) {
                var f = !isBufferShim && Bufferish.isBuffer(this) ? this.toString : BufferLite.toString;
                return f.apply(this, arguments);
            }, exports.write = (method = "write", function() {
                return (this[method] || BufferLite[method]).apply(this, arguments);
            });
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), Buffer = Bufferish.global, isBufferShim = Bufferish.hasBuffer && "TYPED_ARRAY_SUPPORT" in Buffer, brokenTypedArray = isBufferShim && !Buffer.TYPED_ARRAY_SUPPORT;
            function copy(target, targetStart, start, end) {
                var thisIsBuffer = Bufferish.isBuffer(this), targetIsBuffer = Bufferish.isBuffer(target);
                if (thisIsBuffer && targetIsBuffer) return this.copy(target, targetStart, start, end);
                if (brokenTypedArray || thisIsBuffer || targetIsBuffer || !Bufferish.isView(this) || !Bufferish.isView(target)) return BufferLite.copy.call(this, target, targetStart, start, end);
                var buffer = start || null != end ? slice.call(this, start, end) : this;
                return target.set(buffer, targetStart), buffer.length;
            }
            function slice(start, end) {
                var f = this.slice || !brokenTypedArray && this.subarray;
                if (f) return f.call(this, start, end);
                var target = Bufferish.alloc.call(this, end - start);
                return copy.call(this, target, 0, start, end), target;
            }
        },
        "./node_modules/msgpack-lite/lib/bufferish-uint8array.js": (module, __unused_webpack_exports, __webpack_require__) => {
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), exports = module.exports = Bufferish.hasArrayBuffer ? alloc(0) : [];
            function alloc(size) {
                return new Uint8Array(size);
            }
            exports.alloc = alloc, exports.concat = Bufferish.concat, exports.from = function(value) {
                if (Bufferish.isView(value)) {
                    var byteOffset = value.byteOffset, byteLength = value.byteLength;
                    (value = value.buffer).byteLength !== byteLength && (value.slice ? value = value.slice(byteOffset, byteOffset + byteLength) : (value = new Uint8Array(value)).byteLength !== byteLength && (value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength)));
                } else {
                    if ("string" == typeof value) return Bufferish.from.call(exports, value);
                    if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
                }
                return new Uint8Array(value);
            };
        },
        "./node_modules/msgpack-lite/lib/bufferish.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var Buffer = exports.global = __webpack_require__("./node_modules/msgpack-lite/lib/buffer-global.js"), hasBuffer = exports.hasBuffer = Buffer && !!Buffer.isBuffer, hasArrayBuffer = exports.hasArrayBuffer = "undefined" != typeof ArrayBuffer, isArray = exports.isArray = __webpack_require__("./node_modules/isarray/index.js");
            exports.isArrayBuffer = hasArrayBuffer ? function(value) {
                return value instanceof ArrayBuffer || _isArrayBuffer(value);
            } : _false;
            var isBuffer = exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false, isView = exports.isView = hasArrayBuffer ? ArrayBuffer.isView || _is("ArrayBuffer", "buffer") : _false;
            exports.alloc = alloc, exports.concat = function(list, length) {
                length || (length = 0, Array.prototype.forEach.call(list, (function(buffer) {
                    length += buffer.length;
                })));
                var ref = this !== exports && this || list[0], result = alloc.call(ref, length), offset = 0;
                return Array.prototype.forEach.call(list, (function(buffer) {
                    offset += BufferProto.copy.call(buffer, result, offset);
                })), result;
            }, exports.from = function(value) {
                return "string" == typeof value ? fromString.call(this, value) : auto(this).from(value);
            };
            var BufferArray = exports.Array = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish-array.js"), BufferBuffer = exports.Buffer = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish-buffer.js"), BufferUint8Array = exports.Uint8Array = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish-uint8array.js"), BufferProto = exports.prototype = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish-proto.js");
            function alloc(size) {
                return auto(this).alloc(size);
            }
            var _isArrayBuffer = _is("ArrayBuffer");
            function fromString(value) {
                var expected = 3 * value.length, that = alloc.call(this, expected), actual = BufferProto.write.call(that, value);
                return expected !== actual && (that = BufferProto.slice.call(that, 0, actual)), 
                that;
            }
            function auto(that) {
                return isBuffer(that) ? BufferBuffer : isView(that) ? BufferUint8Array : isArray(that) ? BufferArray : hasBuffer ? BufferBuffer : hasArrayBuffer ? BufferUint8Array : BufferArray;
            }
            function _false() {
                return !1;
            }
            function _is(name, key) {
                return name = "[object " + name + "]", function(value) {
                    return null != value && {}.toString.call(key ? value[key] : value) === name;
                };
            }
        },
        "./node_modules/msgpack-lite/lib/codec-base.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var IS_ARRAY = __webpack_require__("./node_modules/isarray/index.js");
            exports.createCodec = createCodec, exports.install = function(props) {
                for (var key in props) Codec.prototype[key] = add(Codec.prototype[key], props[key]);
            }, exports.filter = function(filter) {
                return IS_ARRAY(filter) ? function(filters) {
                    return filters = filters.slice(), function(value) {
                        return filters.reduce(iterator, value);
                    };
                    function iterator(value, filter) {
                        return filter(value);
                    }
                }(filter) : filter;
            };
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js");
            function Codec(options) {
                if (!(this instanceof Codec)) return new Codec(options);
                this.options = options, this.init();
            }
            function add(a, b) {
                return a && b ? function() {
                    return a.apply(this, arguments), b.apply(this, arguments);
                } : a || b;
            }
            function createCodec(options) {
                return new Codec(options);
            }
            Codec.prototype.init = function() {
                var options = this.options;
                return options && options.uint8array && (this.bufferish = Bufferish.Uint8Array), 
                this;
            }, exports.preset = createCodec({
                preset: !0
            });
        },
        "./node_modules/msgpack-lite/lib/codec.js": (__unused_webpack_module, exports, __webpack_require__) => {
            __webpack_require__("./node_modules/msgpack-lite/lib/read-core.js"), __webpack_require__("./node_modules/msgpack-lite/lib/write-core.js"), 
            exports.codec = {
                preset: __webpack_require__("./node_modules/msgpack-lite/lib/codec-base.js").preset
            };
        },
        "./node_modules/msgpack-lite/lib/decode-buffer.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.DecodeBuffer = DecodeBuffer;
            var preset = __webpack_require__("./node_modules/msgpack-lite/lib/read-core.js").preset;
            function DecodeBuffer(options) {
                if (!(this instanceof DecodeBuffer)) return new DecodeBuffer(options);
                if (options && (this.options = options, options.codec)) {
                    var codec = this.codec = options.codec;
                    codec.bufferish && (this.bufferish = codec.bufferish);
                }
            }
            __webpack_require__("./node_modules/msgpack-lite/lib/flex-buffer.js").FlexDecoder.mixin(DecodeBuffer.prototype), 
            DecodeBuffer.prototype.codec = preset, DecodeBuffer.prototype.fetch = function() {
                return this.codec.decode(this);
            };
        },
        "./node_modules/msgpack-lite/lib/decode.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.decode = function(input, options) {
                var decoder = new DecodeBuffer(options);
                return decoder.write(input), decoder.read();
            };
            var DecodeBuffer = __webpack_require__("./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer;
        },
        "./node_modules/msgpack-lite/lib/decoder.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.Decoder = Decoder;
            var EventLite = __webpack_require__("./node_modules/event-lite/event-lite.js"), DecodeBuffer = __webpack_require__("./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer;
            function Decoder(options) {
                if (!(this instanceof Decoder)) return new Decoder(options);
                DecodeBuffer.call(this, options);
            }
            Decoder.prototype = new DecodeBuffer, EventLite.mixin(Decoder.prototype), Decoder.prototype.decode = function(chunk) {
                arguments.length && this.write(chunk), this.flush();
            }, Decoder.prototype.push = function(chunk) {
                this.emit("data", chunk);
            }, Decoder.prototype.end = function(chunk) {
                this.decode(chunk), this.emit("end");
            };
        },
        "./node_modules/msgpack-lite/lib/encode-buffer.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.EncodeBuffer = EncodeBuffer;
            var preset = __webpack_require__("./node_modules/msgpack-lite/lib/write-core.js").preset;
            function EncodeBuffer(options) {
                if (!(this instanceof EncodeBuffer)) return new EncodeBuffer(options);
                if (options && (this.options = options, options.codec)) {
                    var codec = this.codec = options.codec;
                    codec.bufferish && (this.bufferish = codec.bufferish);
                }
            }
            __webpack_require__("./node_modules/msgpack-lite/lib/flex-buffer.js").FlexEncoder.mixin(EncodeBuffer.prototype), 
            EncodeBuffer.prototype.codec = preset, EncodeBuffer.prototype.write = function(input) {
                this.codec.encode(this, input);
            };
        },
        "./node_modules/msgpack-lite/lib/encode.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.encode = function(input, options) {
                var encoder = new EncodeBuffer(options);
                return encoder.write(input), encoder.read();
            };
            var EncodeBuffer = __webpack_require__("./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer;
        },
        "./node_modules/msgpack-lite/lib/encoder.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.Encoder = Encoder;
            var EventLite = __webpack_require__("./node_modules/event-lite/event-lite.js"), EncodeBuffer = __webpack_require__("./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer;
            function Encoder(options) {
                if (!(this instanceof Encoder)) return new Encoder(options);
                EncodeBuffer.call(this, options);
            }
            Encoder.prototype = new EncodeBuffer, EventLite.mixin(Encoder.prototype), Encoder.prototype.encode = function(chunk) {
                this.write(chunk), this.emit("data", this.read());
            }, Encoder.prototype.end = function(chunk) {
                arguments.length && this.encode(chunk), this.flush(), this.emit("end");
            };
        },
        "./node_modules/msgpack-lite/lib/ext-buffer.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.ExtBuffer = function ExtBuffer(buffer, type) {
                if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
                this.buffer = Bufferish.from(buffer), this.type = type;
            };
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js");
        },
        "./node_modules/msgpack-lite/lib/ext-packer.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.setExtPackers = function(codec) {
                codec.addExtPacker(14, Error, [ packError, encode ]), codec.addExtPacker(1, EvalError, [ packError, encode ]), 
                codec.addExtPacker(2, RangeError, [ packError, encode ]), codec.addExtPacker(3, ReferenceError, [ packError, encode ]), 
                codec.addExtPacker(4, SyntaxError, [ packError, encode ]), codec.addExtPacker(5, TypeError, [ packError, encode ]), 
                codec.addExtPacker(6, URIError, [ packError, encode ]), codec.addExtPacker(10, RegExp, [ packRegExp, encode ]), 
                codec.addExtPacker(11, Boolean, [ packValueOf, encode ]), codec.addExtPacker(12, String, [ packValueOf, encode ]), 
                codec.addExtPacker(13, Date, [ Number, encode ]), codec.addExtPacker(15, Number, [ packValueOf, encode ]), 
                "undefined" != typeof Uint8Array && (codec.addExtPacker(17, Int8Array, packTypedArray), 
                codec.addExtPacker(18, Uint8Array, packTypedArray), codec.addExtPacker(19, Int16Array, packTypedArray), 
                codec.addExtPacker(20, Uint16Array, packTypedArray), codec.addExtPacker(21, Int32Array, packTypedArray), 
                codec.addExtPacker(22, Uint32Array, packTypedArray), codec.addExtPacker(23, Float32Array, packTypedArray), 
                "undefined" != typeof Float64Array && codec.addExtPacker(24, Float64Array, packTypedArray), 
                "undefined" != typeof Uint8ClampedArray && codec.addExtPacker(25, Uint8ClampedArray, packTypedArray), 
                codec.addExtPacker(26, ArrayBuffer, packTypedArray), codec.addExtPacker(29, DataView, packTypedArray));
                Bufferish.hasBuffer && codec.addExtPacker(27, Buffer, Bufferish.from);
            };
            var _encode, Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), Buffer = Bufferish.global, packTypedArray = Bufferish.Uint8Array.from, ERROR_COLUMNS = {
                name: 1,
                message: 1,
                stack: 1,
                columnNumber: 1,
                fileName: 1,
                lineNumber: 1
            };
            function encode(input) {
                return _encode || (_encode = __webpack_require__("./node_modules/msgpack-lite/lib/encode.js").encode), 
                _encode(input);
            }
            function packValueOf(value) {
                return value.valueOf();
            }
            function packRegExp(value) {
                (value = RegExp.prototype.toString.call(value).split("/")).shift();
                var out = [ value.pop() ];
                return out.unshift(value.join("/")), out;
            }
            function packError(value) {
                var out = {};
                for (var key in ERROR_COLUMNS) out[key] = value[key];
                return out;
            }
        },
        "./node_modules/msgpack-lite/lib/ext-unpacker.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.setExtUnpackers = function(codec) {
                codec.addExtUnpacker(14, [ decode, unpackError(Error) ]), codec.addExtUnpacker(1, [ decode, unpackError(EvalError) ]), 
                codec.addExtUnpacker(2, [ decode, unpackError(RangeError) ]), codec.addExtUnpacker(3, [ decode, unpackError(ReferenceError) ]), 
                codec.addExtUnpacker(4, [ decode, unpackError(SyntaxError) ]), codec.addExtUnpacker(5, [ decode, unpackError(TypeError) ]), 
                codec.addExtUnpacker(6, [ decode, unpackError(URIError) ]), codec.addExtUnpacker(10, [ decode, unpackRegExp ]), 
                codec.addExtUnpacker(11, [ decode, unpackClass(Boolean) ]), codec.addExtUnpacker(12, [ decode, unpackClass(String) ]), 
                codec.addExtUnpacker(13, [ decode, unpackClass(Date) ]), codec.addExtUnpacker(15, [ decode, unpackClass(Number) ]), 
                "undefined" != typeof Uint8Array && (codec.addExtUnpacker(17, unpackClass(Int8Array)), 
                codec.addExtUnpacker(18, unpackClass(Uint8Array)), codec.addExtUnpacker(19, [ unpackArrayBuffer, unpackClass(Int16Array) ]), 
                codec.addExtUnpacker(20, [ unpackArrayBuffer, unpackClass(Uint16Array) ]), codec.addExtUnpacker(21, [ unpackArrayBuffer, unpackClass(Int32Array) ]), 
                codec.addExtUnpacker(22, [ unpackArrayBuffer, unpackClass(Uint32Array) ]), codec.addExtUnpacker(23, [ unpackArrayBuffer, unpackClass(Float32Array) ]), 
                "undefined" != typeof Float64Array && codec.addExtUnpacker(24, [ unpackArrayBuffer, unpackClass(Float64Array) ]), 
                "undefined" != typeof Uint8ClampedArray && codec.addExtUnpacker(25, unpackClass(Uint8ClampedArray)), 
                codec.addExtUnpacker(26, unpackArrayBuffer), codec.addExtUnpacker(29, [ unpackArrayBuffer, unpackClass(DataView) ]));
                Bufferish.hasBuffer && codec.addExtUnpacker(27, unpackClass(Buffer));
            };
            var _decode, Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), Buffer = Bufferish.global, ERROR_COLUMNS = {
                name: 1,
                message: 1,
                stack: 1,
                columnNumber: 1,
                fileName: 1,
                lineNumber: 1
            };
            function decode(input) {
                return _decode || (_decode = __webpack_require__("./node_modules/msgpack-lite/lib/decode.js").decode), 
                _decode(input);
            }
            function unpackRegExp(value) {
                return RegExp.apply(null, value);
            }
            function unpackError(Class) {
                return function(value) {
                    var out = new Class;
                    for (var key in ERROR_COLUMNS) out[key] = value[key];
                    return out;
                };
            }
            function unpackClass(Class) {
                return function(value) {
                    return new Class(value);
                };
            }
            function unpackArrayBuffer(value) {
                return new Uint8Array(value).buffer;
            }
        },
        "./node_modules/msgpack-lite/lib/ext.js": (__unused_webpack_module, exports, __webpack_require__) => {
            __webpack_require__("./node_modules/msgpack-lite/lib/read-core.js"), __webpack_require__("./node_modules/msgpack-lite/lib/write-core.js"), 
            exports.createCodec = __webpack_require__("./node_modules/msgpack-lite/lib/codec-base.js").createCodec;
        },
        "./node_modules/msgpack-lite/lib/flex-buffer.js": (__unused_webpack_module, exports, __webpack_require__) => {
            exports.FlexDecoder = FlexDecoder, exports.FlexEncoder = FlexEncoder;
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js");
            function FlexDecoder() {
                if (!(this instanceof FlexDecoder)) return new FlexDecoder;
            }
            function FlexEncoder() {
                if (!(this instanceof FlexEncoder)) return new FlexEncoder;
            }
            function write() {
                throw new Error("method not implemented: write()");
            }
            function fetch() {
                throw new Error("method not implemented: fetch()");
            }
            function read() {
                return this.buffers && this.buffers.length ? (this.flush(), this.pull()) : this.fetch();
            }
            function push(chunk) {
                (this.buffers || (this.buffers = [])).push(chunk);
            }
            function pull() {
                return (this.buffers || (this.buffers = [])).shift();
            }
            function mixinFactory(source) {
                return function(target) {
                    for (var key in source) target[key] = source[key];
                    return target;
                };
            }
            FlexDecoder.mixin = mixinFactory({
                bufferish: Bufferish,
                write: function(chunk) {
                    var prev = this.offset ? Bufferish.prototype.slice.call(this.buffer, this.offset) : this.buffer;
                    this.buffer = prev ? chunk ? this.bufferish.concat([ prev, chunk ]) : prev : chunk, 
                    this.offset = 0;
                },
                fetch,
                flush: function() {
                    for (;this.offset < this.buffer.length; ) {
                        var value, start = this.offset;
                        try {
                            value = this.fetch();
                        } catch (e) {
                            if (e && "BUFFER_SHORTAGE" != e.message) throw e;
                            this.offset = start;
                            break;
                        }
                        this.push(value);
                    }
                },
                push,
                pull,
                read,
                reserve: function(length) {
                    var start = this.offset, end = start + length;
                    if (end > this.buffer.length) throw new Error("BUFFER_SHORTAGE");
                    return this.offset = end, start;
                },
                offset: 0
            }), FlexDecoder.mixin(FlexDecoder.prototype), FlexEncoder.mixin = mixinFactory({
                bufferish: Bufferish,
                write,
                fetch: function() {
                    var start = this.start;
                    if (start < this.offset) {
                        var end = this.start = this.offset;
                        return Bufferish.prototype.slice.call(this.buffer, start, end);
                    }
                },
                flush: function() {
                    for (;this.start < this.offset; ) {
                        var value = this.fetch();
                        value && this.push(value);
                    }
                },
                push,
                pull: function() {
                    var buffers = this.buffers || (this.buffers = []), chunk = buffers.length > 1 ? this.bufferish.concat(buffers) : buffers[0];
                    return buffers.length = 0, chunk;
                },
                read,
                reserve: function(length) {
                    var req = 0 | length;
                    if (this.buffer) {
                        var size = this.buffer.length, start = 0 | this.offset, end = start + req;
                        if (end < size) return this.offset = end, start;
                        this.flush(), length = Math.max(length, Math.min(2 * size, this.maxBufferSize));
                    }
                    return length = Math.max(length, this.minBufferSize), this.buffer = this.bufferish.alloc(length), 
                    this.start = 0, this.offset = req, 0;
                },
                send: function(buffer) {
                    var length = buffer.length;
                    if (length > this.minBufferSize) this.flush(), this.push(buffer); else {
                        var offset = this.reserve(length);
                        Bufferish.prototype.copy.call(buffer, this.buffer, offset);
                    }
                },
                maxBufferSize: 65536,
                minBufferSize: 2048,
                offset: 0,
                start: 0
            }), FlexEncoder.mixin(FlexEncoder.prototype);
        },
        "./node_modules/msgpack-lite/lib/read-core.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var ExtBuffer = __webpack_require__("./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer, ExtUnpacker = __webpack_require__("./node_modules/msgpack-lite/lib/ext-unpacker.js"), readUint8 = __webpack_require__("./node_modules/msgpack-lite/lib/read-format.js").readUint8, ReadToken = __webpack_require__("./node_modules/msgpack-lite/lib/read-token.js"), CodecBase = __webpack_require__("./node_modules/msgpack-lite/lib/codec-base.js");
            function init() {
                var options = this.options;
                return this.decode = function(options) {
                    var readToken = ReadToken.getReadToken(options);
                    return function(decoder) {
                        var type = readUint8(decoder), func = readToken[type];
                        if (!func) throw new Error("Invalid type: " + (type ? "0x" + type.toString(16) : type));
                        return func(decoder);
                    };
                }(options), options && options.preset && ExtUnpacker.setExtUnpackers(this), this;
            }
            CodecBase.install({
                addExtUnpacker: function(etype, unpacker) {
                    (this.extUnpackers || (this.extUnpackers = []))[etype] = CodecBase.filter(unpacker);
                },
                getExtUnpacker: function(type) {
                    return (this.extUnpackers || (this.extUnpackers = []))[type] || function(buffer) {
                        return new ExtBuffer(buffer, type);
                    };
                },
                init
            }), exports.preset = init.call(CodecBase.preset);
        },
        "./node_modules/msgpack-lite/lib/read-format.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var ieee754 = __webpack_require__("./node_modules/ieee754/index.js"), Int64Buffer = __webpack_require__("./node_modules/int64-buffer/int64-buffer.js"), Uint64BE = Int64Buffer.Uint64BE, Int64BE = Int64Buffer.Int64BE;
            exports.getReadFormat = function(options) {
                var binarraybuffer = Bufferish.hasArrayBuffer && options && options.binarraybuffer, int64 = options && options.int64;
                return {
                    map: HAS_MAP && options && options.usemap ? map_to_map : map_to_obj,
                    array,
                    str,
                    bin: binarraybuffer ? bin_arraybuffer : bin_buffer,
                    ext,
                    uint8,
                    uint16,
                    uint32,
                    uint64: read(8, int64 ? readUInt64BE_int64 : readUInt64BE),
                    int8,
                    int16,
                    int32,
                    int64: read(8, int64 ? readInt64BE_int64 : readInt64BE),
                    float32: read(4, readFloatBE),
                    float64: read(8, readDoubleBE)
                };
            }, exports.readUint8 = uint8;
            var Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), BufferProto = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish-proto.js"), HAS_MAP = "undefined" != typeof Map;
            function map_to_obj(decoder, len) {
                var i, value = {}, k = new Array(len), v = new Array(len), decode = decoder.codec.decode;
                for (i = 0; i < len; i++) k[i] = decode(decoder), v[i] = decode(decoder);
                for (i = 0; i < len; i++) value[k[i]] = v[i];
                return value;
            }
            function map_to_map(decoder, len) {
                var i, value = new Map, k = new Array(len), v = new Array(len), decode = decoder.codec.decode;
                for (i = 0; i < len; i++) k[i] = decode(decoder), v[i] = decode(decoder);
                for (i = 0; i < len; i++) value.set(k[i], v[i]);
                return value;
            }
            function array(decoder, len) {
                for (var value = new Array(len), decode = decoder.codec.decode, i = 0; i < len; i++) value[i] = decode(decoder);
                return value;
            }
            function str(decoder, len) {
                var start = decoder.reserve(len), end = start + len;
                return BufferProto.toString.call(decoder.buffer, "utf-8", start, end);
            }
            function bin_buffer(decoder, len) {
                var start = decoder.reserve(len), end = start + len, buf = BufferProto.slice.call(decoder.buffer, start, end);
                return Bufferish.from(buf);
            }
            function bin_arraybuffer(decoder, len) {
                var start = decoder.reserve(len), end = start + len, buf = BufferProto.slice.call(decoder.buffer, start, end);
                return Bufferish.Uint8Array.from(buf).buffer;
            }
            function ext(decoder, len) {
                var start = decoder.reserve(len + 1), type = decoder.buffer[start++], end = start + len, unpack = decoder.codec.getExtUnpacker(type);
                if (!unpack) throw new Error("Invalid ext type: " + (type ? "0x" + type.toString(16) : type));
                return unpack(BufferProto.slice.call(decoder.buffer, start, end));
            }
            function uint8(decoder) {
                var start = decoder.reserve(1);
                return decoder.buffer[start];
            }
            function int8(decoder) {
                var start = decoder.reserve(1), value = decoder.buffer[start];
                return 128 & value ? value - 256 : value;
            }
            function uint16(decoder) {
                var start = decoder.reserve(2), buffer = decoder.buffer;
                return buffer[start++] << 8 | buffer[start];
            }
            function int16(decoder) {
                var start = decoder.reserve(2), buffer = decoder.buffer, value = buffer[start++] << 8 | buffer[start];
                return 32768 & value ? value - 65536 : value;
            }
            function uint32(decoder) {
                var start = decoder.reserve(4), buffer = decoder.buffer;
                return 16777216 * buffer[start++] + (buffer[start++] << 16) + (buffer[start++] << 8) + buffer[start];
            }
            function int32(decoder) {
                var start = decoder.reserve(4), buffer = decoder.buffer;
                return buffer[start++] << 24 | buffer[start++] << 16 | buffer[start++] << 8 | buffer[start];
            }
            function read(len, method) {
                return function(decoder) {
                    var start = decoder.reserve(len);
                    return method.call(decoder.buffer, start, true);
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
                return ieee754.read(this, start, !1, 23, 4);
            }
            function readDoubleBE(start) {
                return ieee754.read(this, start, !1, 52, 8);
            }
        },
        "./node_modules/msgpack-lite/lib/read-token.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var ReadFormat = __webpack_require__("./node_modules/msgpack-lite/lib/read-format.js");
            function init_token(format) {
                var i, token = new Array(256);
                for (i = 0; i <= 127; i++) token[i] = constant(i);
                for (i = 128; i <= 143; i++) token[i] = fix(i - 128, format.map);
                for (i = 144; i <= 159; i++) token[i] = fix(i - 144, format.array);
                for (i = 160; i <= 191; i++) token[i] = fix(i - 160, format.str);
                for (token[192] = constant(null), token[193] = null, token[194] = constant(!1), 
                token[195] = constant(!0), token[196] = flex(format.uint8, format.bin), token[197] = flex(format.uint16, format.bin), 
                token[198] = flex(format.uint32, format.bin), token[199] = flex(format.uint8, format.ext), 
                token[200] = flex(format.uint16, format.ext), token[201] = flex(format.uint32, format.ext), 
                token[202] = format.float32, token[203] = format.float64, token[204] = format.uint8, 
                token[205] = format.uint16, token[206] = format.uint32, token[207] = format.uint64, 
                token[208] = format.int8, token[209] = format.int16, token[210] = format.int32, 
                token[211] = format.int64, token[212] = fix(1, format.ext), token[213] = fix(2, format.ext), 
                token[214] = fix(4, format.ext), token[215] = fix(8, format.ext), token[216] = fix(16, format.ext), 
                token[217] = flex(format.uint8, format.str), token[218] = flex(format.uint16, format.str), 
                token[219] = flex(format.uint32, format.str), token[220] = flex(format.uint16, format.array), 
                token[221] = flex(format.uint32, format.array), token[222] = flex(format.uint16, format.map), 
                token[223] = flex(format.uint32, format.map), i = 224; i <= 255; i++) token[i] = constant(i - 256);
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
            exports.getReadToken = function(options) {
                var format = ReadFormat.getReadFormat(options);
                return options && options.useraw ? function(format) {
                    var i, token = init_token(format).slice();
                    for (token[217] = token[196], token[218] = token[197], token[219] = token[198], 
                    i = 160; i <= 191; i++) token[i] = fix(i - 160, format.bin);
                    return token;
                }(format) : init_token(format);
            };
        },
        "./node_modules/msgpack-lite/lib/write-core.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var ExtBuffer = __webpack_require__("./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer, ExtPacker = __webpack_require__("./node_modules/msgpack-lite/lib/ext-packer.js"), WriteType = __webpack_require__("./node_modules/msgpack-lite/lib/write-type.js"), CodecBase = __webpack_require__("./node_modules/msgpack-lite/lib/codec-base.js");
            function init() {
                var options = this.options;
                return this.encode = function(options) {
                    var writeType = WriteType.getWriteType(options);
                    return function(encoder, value) {
                        var func = writeType[typeof value];
                        if (!func) throw new Error('Unsupported type "' + typeof value + '": ' + value);
                        func(encoder, value);
                    };
                }(options), options && options.preset && ExtPacker.setExtPackers(this), this;
            }
            CodecBase.install({
                addExtPacker: function(etype, Class, packer) {
                    packer = CodecBase.filter(packer);
                    var name = Class.name;
                    if (name && "Object" !== name) {
                        (this.extPackers || (this.extPackers = {}))[name] = extPacker;
                    } else {
                        (this.extEncoderList || (this.extEncoderList = [])).unshift([ Class, extPacker ]);
                    }
                    function extPacker(value) {
                        return packer && (value = packer(value)), new ExtBuffer(value, etype);
                    }
                },
                getExtPacker: function(value) {
                    var packers = this.extPackers || (this.extPackers = {}), c = value.constructor, e = c && c.name && packers[c.name];
                    if (e) return e;
                    for (var list = this.extEncoderList || (this.extEncoderList = []), len = list.length, i = 0; i < len; i++) {
                        var pair = list[i];
                        if (c === pair[0]) return pair[1];
                    }
                },
                init
            }), exports.preset = init.call(CodecBase.preset);
        },
        "./node_modules/msgpack-lite/lib/write-token.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var ieee754 = __webpack_require__("./node_modules/ieee754/index.js"), Int64Buffer = __webpack_require__("./node_modules/int64-buffer/int64-buffer.js"), Uint64BE = Int64Buffer.Uint64BE, Int64BE = Int64Buffer.Int64BE, uint8 = __webpack_require__("./node_modules/msgpack-lite/lib/write-uint8.js").uint8, Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), Buffer = Bufferish.global, NO_TYPED_ARRAY = Bufferish.hasBuffer && "TYPED_ARRAY_SUPPORT" in Buffer && !Buffer.TYPED_ARRAY_SUPPORT, Buffer_prototype = Bufferish.hasBuffer && Buffer.prototype || {};
            function init_token() {
                var token = uint8.slice();
                return token[196] = write1(196), token[197] = write2(197), token[198] = write4(198), 
                token[199] = write1(199), token[200] = write2(200), token[201] = write4(201), token[202] = writeN(202, 4, Buffer_prototype.writeFloatBE || writeFloatBE, !0), 
                token[203] = writeN(203, 8, Buffer_prototype.writeDoubleBE || writeDoubleBE, !0), 
                token[204] = write1(204), token[205] = write2(205), token[206] = write4(206), token[207] = writeN(207, 8, writeUInt64BE), 
                token[208] = write1(208), token[209] = write2(209), token[210] = write4(210), token[211] = writeN(211, 8, writeInt64BE), 
                token[217] = write1(217), token[218] = write2(218), token[219] = write4(219), token[220] = write2(220), 
                token[221] = write4(221), token[222] = write2(222), token[223] = write4(223), token;
            }
            function write1(type) {
                return function(encoder, value) {
                    var offset = encoder.reserve(2), buffer = encoder.buffer;
                    buffer[offset++] = type, buffer[offset] = value;
                };
            }
            function write2(type) {
                return function(encoder, value) {
                    var offset = encoder.reserve(3), buffer = encoder.buffer;
                    buffer[offset++] = type, buffer[offset++] = value >>> 8, buffer[offset] = value;
                };
            }
            function write4(type) {
                return function(encoder, value) {
                    var offset = encoder.reserve(5), buffer = encoder.buffer;
                    buffer[offset++] = type, buffer[offset++] = value >>> 24, buffer[offset++] = value >>> 16, 
                    buffer[offset++] = value >>> 8, buffer[offset] = value;
                };
            }
            function writeN(type, len, method, noAssert) {
                return function(encoder, value) {
                    var offset = encoder.reserve(len + 1);
                    encoder.buffer[offset++] = type, method.call(encoder.buffer, value, offset, noAssert);
                };
            }
            function writeUInt64BE(value, offset) {
                new Uint64BE(this, offset, value);
            }
            function writeInt64BE(value, offset) {
                new Int64BE(this, offset, value);
            }
            function writeFloatBE(value, offset) {
                ieee754.write(this, value, offset, !1, 23, 4);
            }
            function writeDoubleBE(value, offset) {
                ieee754.write(this, value, offset, !1, 52, 8);
            }
            exports.getWriteToken = function(options) {
                return options && options.uint8array ? ((token = init_token())[202] = writeN(202, 4, writeFloatBE), 
                token[203] = writeN(203, 8, writeDoubleBE), token) : NO_TYPED_ARRAY || Bufferish.hasBuffer && options && options.safe ? function() {
                    var token = uint8.slice();
                    return token[196] = writeN(196, 1, Buffer.prototype.writeUInt8), token[197] = writeN(197, 2, Buffer.prototype.writeUInt16BE), 
                    token[198] = writeN(198, 4, Buffer.prototype.writeUInt32BE), token[199] = writeN(199, 1, Buffer.prototype.writeUInt8), 
                    token[200] = writeN(200, 2, Buffer.prototype.writeUInt16BE), token[201] = writeN(201, 4, Buffer.prototype.writeUInt32BE), 
                    token[202] = writeN(202, 4, Buffer.prototype.writeFloatBE), token[203] = writeN(203, 8, Buffer.prototype.writeDoubleBE), 
                    token[204] = writeN(204, 1, Buffer.prototype.writeUInt8), token[205] = writeN(205, 2, Buffer.prototype.writeUInt16BE), 
                    token[206] = writeN(206, 4, Buffer.prototype.writeUInt32BE), token[207] = writeN(207, 8, writeUInt64BE), 
                    token[208] = writeN(208, 1, Buffer.prototype.writeInt8), token[209] = writeN(209, 2, Buffer.prototype.writeInt16BE), 
                    token[210] = writeN(210, 4, Buffer.prototype.writeInt32BE), token[211] = writeN(211, 8, writeInt64BE), 
                    token[217] = writeN(217, 1, Buffer.prototype.writeUInt8), token[218] = writeN(218, 2, Buffer.prototype.writeUInt16BE), 
                    token[219] = writeN(219, 4, Buffer.prototype.writeUInt32BE), token[220] = writeN(220, 2, Buffer.prototype.writeUInt16BE), 
                    token[221] = writeN(221, 4, Buffer.prototype.writeUInt32BE), token[222] = writeN(222, 2, Buffer.prototype.writeUInt16BE), 
                    token[223] = writeN(223, 4, Buffer.prototype.writeUInt32BE), token;
                }() : init_token();
                var token;
            };
        },
        "./node_modules/msgpack-lite/lib/write-type.js": (__unused_webpack_module, exports, __webpack_require__) => {
            var IS_ARRAY = __webpack_require__("./node_modules/isarray/index.js"), Int64Buffer = __webpack_require__("./node_modules/int64-buffer/int64-buffer.js"), Uint64BE = Int64Buffer.Uint64BE, Int64BE = Int64Buffer.Int64BE, Bufferish = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish.js"), BufferProto = __webpack_require__("./node_modules/msgpack-lite/lib/bufferish-proto.js"), WriteToken = __webpack_require__("./node_modules/msgpack-lite/lib/write-token.js"), uint8 = __webpack_require__("./node_modules/msgpack-lite/lib/write-uint8.js").uint8, ExtBuffer = __webpack_require__("./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer, HAS_UINT8ARRAY = "undefined" != typeof Uint8Array, HAS_MAP = "undefined" != typeof Map, extmap = [];
            extmap[1] = 212, extmap[2] = 213, extmap[4] = 214, extmap[8] = 215, extmap[16] = 216, 
            exports.getWriteType = function(options) {
                var token = WriteToken.getWriteToken(options), useraw = options && options.useraw, binarraybuffer = HAS_UINT8ARRAY && options && options.binarraybuffer, isBuffer = binarraybuffer ? Bufferish.isArrayBuffer : Bufferish.isBuffer, bin = binarraybuffer ? function(encoder, value) {
                    bin_buffer(encoder, new Uint8Array(value));
                } : bin_buffer, map = HAS_MAP && options && options.usemap ? function(encoder, value) {
                    if (!(value instanceof Map)) return obj_to_map(encoder, value);
                    var length = value.size;
                    token[length < 16 ? 128 + length : length <= 65535 ? 222 : 223](encoder, length);
                    var encode = encoder.codec.encode;
                    value.forEach((function(val, key, m) {
                        encode(encoder, key), encode(encoder, val);
                    }));
                } : obj_to_map;
                return {
                    boolean: function(encoder, value) {
                        token[value ? 195 : 194](encoder, value);
                    },
                    function: nil,
                    number: function(encoder, value) {
                        var type, ivalue = 0 | value;
                        if (value !== ivalue) return void token[type = 203](encoder, value);
                        type = -32 <= ivalue && ivalue <= 127 ? 255 & ivalue : 0 <= ivalue ? ivalue <= 255 ? 204 : ivalue <= 65535 ? 205 : 206 : -128 <= ivalue ? 208 : -32768 <= ivalue ? 209 : 210;
                        token[type](encoder, ivalue);
                    },
                    object: useraw ? function(encoder, value) {
                        if (isBuffer(value)) return function(encoder, value) {
                            var length = value.length;
                            token[length < 32 ? 160 + length : length <= 65535 ? 218 : 219](encoder, length), 
                            encoder.send(value);
                        }(encoder, value);
                        object(encoder, value);
                    } : object,
                    string: function(head_size) {
                        return string;
                        function string(encoder, value) {
                            var length = value.length, maxsize = 5 + 3 * length;
                            encoder.offset = encoder.reserve(maxsize);
                            var buffer = encoder.buffer, expected = head_size(length), start = encoder.offset + expected;
                            length = BufferProto.write.call(buffer, value, start);
                            var actual = head_size(length);
                            if (expected !== actual) {
                                var targetStart = start + actual - expected, end = start + length;
                                BufferProto.copy.call(buffer, buffer, targetStart, start, end);
                            }
                            token[1 === actual ? 160 + length : actual <= 3 ? 215 + actual : 219](encoder, length), 
                            encoder.offset += length;
                        }
                    }(useraw ? function(length) {
                        return length < 32 ? 1 : length <= 65535 ? 3 : 5;
                    } : function(length) {
                        return length < 32 ? 1 : length <= 255 ? 2 : length <= 65535 ? 3 : 5;
                    }),
                    symbol: nil,
                    undefined: nil
                };
                function object(encoder, value) {
                    if (null === value) return nil(encoder, value);
                    if (isBuffer(value)) return bin(encoder, value);
                    if (IS_ARRAY(value)) return function(encoder, value) {
                        var length = value.length;
                        token[length < 16 ? 144 + length : length <= 65535 ? 220 : 221](encoder, length);
                        for (var encode = encoder.codec.encode, i = 0; i < length; i++) encode(encoder, value[i]);
                    }(encoder, value);
                    if (Uint64BE.isUint64BE(value)) return function(encoder, value) {
                        token[207](encoder, value.toArray());
                    }(encoder, value);
                    if (Int64BE.isInt64BE(value)) return function(encoder, value) {
                        token[211](encoder, value.toArray());
                    }(encoder, value);
                    var packer = encoder.codec.getExtPacker(value);
                    if (packer && (value = packer(value)), value instanceof ExtBuffer) return function(encoder, value) {
                        var buffer = value.buffer, length = buffer.length, type = extmap[length] || (length < 255 ? 199 : length <= 65535 ? 200 : 201);
                        token[type](encoder, length), uint8[value.type](encoder), encoder.send(buffer);
                    }(encoder, value);
                    map(encoder, value);
                }
                function nil(encoder, value) {
                    token[192](encoder, value);
                }
                function bin_buffer(encoder, value) {
                    var length = value.length;
                    token[length < 255 ? 196 : length <= 65535 ? 197 : 198](encoder, length), encoder.send(value);
                }
                function obj_to_map(encoder, value) {
                    var keys = Object.keys(value), length = keys.length;
                    token[length < 16 ? 128 + length : length <= 65535 ? 222 : 223](encoder, length);
                    var encode = encoder.codec.encode;
                    keys.forEach((function(key) {
                        encode(encoder, key), encode(encoder, value[key]);
                    }));
                }
            };
        },
        "./node_modules/msgpack-lite/lib/write-uint8.js": (__unused_webpack_module, exports) => {
            for (var constant = exports.uint8 = new Array(256), i = 0; i <= 255; i++) constant[i] = write0(i);
            function write0(type) {
                return function(encoder) {
                    var offset = encoder.reserve(1);
                    encoder.buffer[offset] = type;
                };
            }
        },
        "./node_modules/stackframe/stackframe.js": function(module, exports) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            !function(root, factory) {
                "use strict";
                __WEBPACK_AMD_DEFINE_ARRAY__ = [], void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = function() {
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
                    var booleanProps = [ "isConstructor", "isEval", "isNative", "isToplevel" ], numericProps = [ "columnNumber", "lineNumber" ], stringProps = [ "fileName", "functionName", "source" ], arrayProps = [ "args" ], objectProps = [ "evalOrigin" ], props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);
                    function StackFrame(obj) {
                        if (obj) for (var i = 0; i < props.length; i++) void 0 !== obj[props[i]] && this["set" + _capitalize(props[i])](obj[props[i]]);
                    }
                    StackFrame.prototype = {
                        getArgs: function() {
                            return this.args;
                        },
                        setArgs: function(v) {
                            if ("[object Array]" !== Object.prototype.toString.call(v)) throw new TypeError("Args must be an Array");
                            this.args = v;
                        },
                        getEvalOrigin: function() {
                            return this.evalOrigin;
                        },
                        setEvalOrigin: function(v) {
                            if (v instanceof StackFrame) this.evalOrigin = v; else {
                                if (!(v instanceof Object)) throw new TypeError("Eval Origin must be an Object or StackFrame");
                                this.evalOrigin = new StackFrame(v);
                            }
                        },
                        toString: function() {
                            var fileName = this.getFileName() || "", lineNumber = this.getLineNumber() || "", columnNumber = this.getColumnNumber() || "", functionName = this.getFunctionName() || "";
                            return this.getIsEval() ? fileName ? "[eval] (" + fileName + ":" + lineNumber + ":" + columnNumber + ")" : "[eval]:" + lineNumber + ":" + columnNumber : functionName ? functionName + " (" + fileName + ":" + lineNumber + ":" + columnNumber + ")" : fileName + ":" + lineNumber + ":" + columnNumber;
                        }
                    }, StackFrame.fromString = function(str) {
                        var argsStartIndex = str.indexOf("("), argsEndIndex = str.lastIndexOf(")"), functionName = str.substring(0, argsStartIndex), args = str.substring(argsStartIndex + 1, argsEndIndex).split(","), locationString = str.substring(argsEndIndex + 1);
                        if (0 === locationString.indexOf("@")) var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, ""), fileName = parts[1], lineNumber = parts[2], columnNumber = parts[3];
                        return new StackFrame({
                            functionName,
                            args: args || void 0,
                            fileName,
                            lineNumber: lineNumber || void 0,
                            columnNumber: columnNumber || void 0
                        });
                    };
                    for (var i = 0; i < booleanProps.length; i++) StackFrame.prototype["get" + _capitalize(booleanProps[i])] = _getter(booleanProps[i]), 
                    StackFrame.prototype["set" + _capitalize(booleanProps[i])] = function(p) {
                        return function(v) {
                            this[p] = Boolean(v);
                        };
                    }(booleanProps[i]);
                    for (var j = 0; j < numericProps.length; j++) StackFrame.prototype["get" + _capitalize(numericProps[j])] = _getter(numericProps[j]), 
                    StackFrame.prototype["set" + _capitalize(numericProps[j])] = function(p) {
                        return function(v) {
                            if (!_isNumber(v)) throw new TypeError(p + " must be a Number");
                            this[p] = Number(v);
                        };
                    }(numericProps[j]);
                    for (var k = 0; k < stringProps.length; k++) StackFrame.prototype["get" + _capitalize(stringProps[k])] = _getter(stringProps[k]), 
                    StackFrame.prototype["set" + _capitalize(stringProps[k])] = function(p) {
                        return function(v) {
                            this[p] = String(v);
                        };
                    }(stringProps[k]);
                    return StackFrame;
                }) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
            }();
        },
        "./frontend/style/main.scss": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"), _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__), _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./frontend/style/main.scss"), options = {};
            options.styleTagTransform = _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(), 
            options.setAttributes = _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(), 
            options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head"), 
            options.domAPI = _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(), 
            options.insertStyleElement = _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default, options);
            const __WEBPACK_DEFAULT_EXPORT__ = _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals : void 0;
        },
        "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js": module => {
            "use strict";
            var stylesInDOM = [];
            function getIndexByIdentifier(identifier) {
                for (var result = -1, i = 0; i < stylesInDOM.length; i++) if (stylesInDOM[i].identifier === identifier) {
                    result = i;
                    break;
                }
                return result;
            }
            function modulesToDom(list, options) {
                for (var idCountMap = {}, identifiers = [], i = 0; i < list.length; i++) {
                    var item = list[i], id = options.base ? item[0] + options.base : item[0], count = idCountMap[id] || 0, identifier = "".concat(id, " ").concat(count);
                    idCountMap[id] = count + 1;
                    var indexByIdentifier = getIndexByIdentifier(identifier), obj = {
                        css: item[1],
                        media: item[2],
                        sourceMap: item[3],
                        supports: item[4],
                        layer: item[5]
                    };
                    if (-1 !== indexByIdentifier) stylesInDOM[indexByIdentifier].references++, stylesInDOM[indexByIdentifier].updater(obj); else {
                        var updater = addElementStyle(obj, options);
                        options.byIndex = i, stylesInDOM.splice(i, 0, {
                            identifier,
                            updater,
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
                return function(newObj) {
                    if (newObj) {
                        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) return;
                        api.update(obj = newObj);
                    } else api.remove();
                };
            }
            module.exports = function(list, options) {
                var lastIdentifiers = modulesToDom(list = list || [], options = options || {});
                return function(newList) {
                    newList = newList || [];
                    for (var i = 0; i < lastIdentifiers.length; i++) {
                        var index = getIndexByIdentifier(lastIdentifiers[i]);
                        stylesInDOM[index].references--;
                    }
                    for (var newLastIdentifiers = modulesToDom(newList, options), _i = 0; _i < lastIdentifiers.length; _i++) {
                        var _index = getIndexByIdentifier(lastIdentifiers[_i]);
                        0 === stylesInDOM[_index].references && (stylesInDOM[_index].updater(), stylesInDOM.splice(_index, 1));
                    }
                    lastIdentifiers = newLastIdentifiers;
                };
            };
        },
        "./node_modules/style-loader/dist/runtime/insertBySelector.js": module => {
            "use strict";
            var memo = {};
            module.exports = function(insert, style) {
                var target = function(target) {
                    if (void 0 === memo[target]) {
                        var styleTarget = document.querySelector(target);
                        if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) try {
                            styleTarget = styleTarget.contentDocument.head;
                        } catch (e) {
                            styleTarget = null;
                        }
                        memo[target] = styleTarget;
                    }
                    return memo[target];
                }(insert);
                if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                target.appendChild(style);
            };
        },
        "./node_modules/style-loader/dist/runtime/insertStyleElement.js": module => {
            "use strict";
            module.exports = function(options) {
                var element = document.createElement("style");
                return options.setAttributes(element, options.attributes), options.insert(element, options.options), 
                element;
            };
        },
        "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js": (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            module.exports = function(styleElement) {
                var nonce = __webpack_require__.nc;
                nonce && styleElement.setAttribute("nonce", nonce);
            };
        },
        "./node_modules/style-loader/dist/runtime/styleDomAPI.js": module => {
            "use strict";
            module.exports = function(options) {
                var styleElement = options.insertStyleElement(options);
                return {
                    update: function(obj) {
                        !function(styleElement, options, obj) {
                            var css = "";
                            obj.supports && (css += "@supports (".concat(obj.supports, ") {")), obj.media && (css += "@media ".concat(obj.media, " {"));
                            var needLayer = void 0 !== obj.layer;
                            needLayer && (css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {")), 
                            css += obj.css, needLayer && (css += "}"), obj.media && (css += "}"), obj.supports && (css += "}");
                            var sourceMap = obj.sourceMap;
                            sourceMap && "undefined" != typeof btoa && (css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */")), 
                            options.styleTagTransform(css, styleElement, options.options);
                        }(styleElement, options, obj);
                    },
                    remove: function() {
                        !function(styleElement) {
                            if (null === styleElement.parentNode) return !1;
                            styleElement.parentNode.removeChild(styleElement);
                        }(styleElement);
                    }
                };
            };
        },
        "./node_modules/style-loader/dist/runtime/styleTagTransform.js": module => {
            "use strict";
            module.exports = function(css, styleElement) {
                if (styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                    for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                    styleElement.appendChild(document.createTextNode(css));
                }
            };
        },
        "./node_modules/tsee/lib/ee.js": function(__unused_webpack_module, exports) {
            "use strict";
            var __spreadArrays = this && this.__spreadArrays || function() {
                for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
                var r = Array(s), k = 0;
                for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
                k++) r[k] = a[j];
                return r;
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.EventEmitter = void 0;
            var EventEmitter = function() {
                var _this = this;
                this.events = {}, this.maxListeners = 1 / 0, this.emit = function(event) {
                    for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                    if (_this.events[event]) {
                        for (var len = _this.events[event].length, _a = 0, _b = _this.events[event]; _a < _b.length; _a++) {
                            var e = _b[_a];
                            e.apply(void 0, args);
                        }
                        return !!len;
                    }
                    return !1;
                }, this.on = function(event, listener) {
                    return _this.addListener(event, listener), _this;
                }, this.once = function(event, listener) {
                    var onceListener = function() {
                        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                        listener.apply(void 0, args), _this.removeListener(event, onceListener);
                    };
                    return _this.addListener(event, onceListener), _this;
                }, this.addListener = function(event, listener) {
                    return event in _this.events ? _this.events[event].push(listener) : _this.events[event] = [ listener ], 
                    _this.maxListeners !== 1 / 0 && _this.maxListeners <= _this.events[event].length && console.warn('Maximum event listeners for "' + event + '" event!'), 
                    _this;
                }, this.removeListener = function(event, listener) {
                    if (event in _this.events) {
                        var i = _this.events[event].indexOf(listener);
                        -1 !== i && _this.events[event].splice(i, 1);
                    }
                    return _this;
                }, this.hasListeners = function(event) {
                    return _this.events[event] && !!_this.events[event].length;
                }, this.prependListener = function(event, listener) {
                    return event in _this.events ? _this.events[event].unshift(listener) : _this.events[event] = [ listener ], 
                    _this;
                }, this.prependOnceListener = function(event, listener) {
                    var onceListener = function() {
                        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                        listener.apply(void 0, args), _this.removeListener(event, onceListener);
                    };
                    return _this.prependListener(event, onceListener), _this;
                }, this.off = function(event, listener) {
                    return _this.removeListener(event, listener);
                }, this.removeAllListeners = function(event) {
                    return delete _this.events[event], _this;
                }, this.setMaxListeners = function(n) {
                    return _this.maxListeners = n, _this;
                }, this.getMaxListeners = function() {
                    return _this.maxListeners;
                }, this.listeners = function(event) {
                    return __spreadArrays(_this.events[event]);
                }, this.rawListeners = function(event) {
                    return _this.events[event];
                }, this.eventNames = function() {
                    return Object.keys(_this.events);
                }, this.listenerCount = function(type) {
                    return _this.events[type] && _this.events[type].length || 0;
                };
            };
            exports.EventEmitter = EventEmitter;
        },
        "./node_modules/tsee/lib/index.js": function(__unused_webpack_module, exports, __webpack_require__) {
            "use strict";
            var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                void 0 === k2 && (k2 = k), Object.defineProperty(o, k2, {
                    enumerable: !0,
                    get: function() {
                        return m[k];
                    }
                });
            } : function(o, m, k, k2) {
                void 0 === k2 && (k2 = k), o[k2] = m[k];
            }), __exportStar = this && this.__exportStar || function(m, exports) {
                for (var p in m) "default" === p || Object.prototype.hasOwnProperty.call(exports, p) || __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), __exportStar(__webpack_require__("./node_modules/tsee/lib/types.js"), exports), 
            __exportStar(__webpack_require__("./node_modules/tsee/lib/ee.js"), exports);
        },
        "./node_modules/tsee/lib/types.js": (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.asTypedEventEmitter = void 0, exports.asTypedEventEmitter = function(x) {
                return x;
            };
        }
    }, __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
            loaded: !1,
            exports: {}
        };
        return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.loaded = !0, module.exports;
    }
    __webpack_require__.n = module => {
        var getter = module && module.__esModule ? () => module.default : () => module;
        return __webpack_require__.d(getter, {
            a: getter
        }), getter;
    }, __webpack_require__.d = (exports, definition) => {
        for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key]
        });
    }, __webpack_require__.hmd = module => ((module = Object.create(module)).children || (module.children = []), 
    Object.defineProperty(module, "exports", {
        enumerable: !0,
        set: () => {
            throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + module.id);
        }
    }), module), __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
    __webpack_require__.r = exports => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.nc = void 0;
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
            core: () => core
        });
        __webpack_require__("./frontend/style/main.scss");
        var _core_Core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./frontend/src/core/Core.ts"), _render_background_BackgroundRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./frontend/src/render/background/BackgroundRenderer.ts"), _render_RenderManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./frontend/src/render/RenderManager.ts"), _util_DocumentUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./frontend/src/util/DocumentUtil.ts"), logger = new (__webpack_require__("./frontend/src/util/Logger.ts").default)("main");
        _util_DocumentUtil__WEBPACK_IMPORTED_MODULE_4__.default.init(document), _util_DocumentUtil__WEBPACK_IMPORTED_MODULE_4__.default.waitForElement("#gameCanvas", (function(element) {
            var renderManager = new _render_RenderManager__WEBPACK_IMPORTED_MODULE_3__.default(element, 1920, 1080);
            renderManager.createRenderer("background", _render_background_BackgroundRenderer__WEBPACK_IMPORTED_MODULE_2__.default), 
            renderManager.startRender();
        })), logger.info("initializing core");
        var core = new _core_Core__WEBPACK_IMPORTED_MODULE_1__.Core;
    })();
})();
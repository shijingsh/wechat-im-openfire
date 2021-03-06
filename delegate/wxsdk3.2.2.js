!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.websdk = t() : e.websdk = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function o(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {i: r, l: !1, exports: {}};
            return e[r].call(i.exports, i, i.exports, o), i.l = !0, i.exports
        }

        return o.m = e, o.c = t, o.d = function (e, t, r) {
            o.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
        }, o.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, o.t = function (e, t) {
            if (1 & t && (e = o(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (o.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) o.d(r, i, function (t) {
                return e[t]
            }.bind(null, i));
            return r
        }, o.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return o.d(t, "a", t), t
        }, o.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, o.p = "/Users/zhangdong/code/kefu-fe/websdk/packages/sdk", o(o.s = 156)
    }([function (e, t, o) {
        "use strict";
        e.exports = function (e) {
            return e && e.__esModule ? e : {default: e}
        }
    }, , , function (e, t, o) {
        "use strict";
        var r = o(0)(o(5)), i = e.exports, n = o(94);
        i.LongBits = o(65), i.Long = o(158), i.pool = o(159), i.float = o(160), i.asPromise = o(161), i.EventEmitter = o(162), i.path = o(163), i.base64 = o(95), i.utf8 = o(38), i.compareFieldsById = function (e, t) {
            return e.id - t.id
        }, i.toArray = function (e) {
            if (e) {
                for (var t = Object.keys(e), o = new Array(t.length), r = 0; r < t.length;) o[r] = e[t[r++]];
                return o
            }
            return []
        }, i.toObject = function (e) {
            for (var t = {}, o = 0; o < e.length;) {
                var r = e[o++], i = e[o++];
                void 0 !== i && (t[r] = i)
            }
            return t
        }, i.isString = function (e) {
            return "string" == typeof e || e instanceof String
        };
        i.isReserved = function (e) {
            return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e)
        }, i.isObject = function (e) {
            return e && "object" === (0, r.default)(e)
        }, i.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, i.oneOfGetter = function (e) {
            for (var t = {}, o = 0; o < e.length; ++o) t[e[o]] = 1;
            return function () {
                for (var e = Object.keys(this), o = e.length - 1; o > -1; --o) if (1 === t[e[o]] && void 0 !== this[e[o]] && null !== this[e[o]]) return e[o]
            }
        }, i.oneOfSetter = function (e) {
            return function (t) {
                for (var o = 0; o < e.length; ++o) e[o] !== t && delete this[e[o]]
            }
        }, i.merge = function (e, t, o) {
            for (var r = Object.keys(t), i = 0; i < r.length; ++i) void 0 !== e[r[i]] && o || (e[r[i]] = t[r[i]]);
            return e
        }, i.decorateType = function (e, t) {
            if (e.$type) return t && e.$type.name !== t && (i.decorateRoot.remove(e.$type), e.$type.name = t, i.decorateRoot.add(e.$type)), e.$type;
            Type || (Type = o(22));
            var r = new Type(t || e.name);
            return i.decorateRoot.add(r), r.ctor = e, Object.defineProperty(e, "$type", {
                value: r,
                enumerable: !1
            }), Object.defineProperty(e.prototype, "$type", {value: r, enumerable: !1}), r
        }, i.emptyArray = Object.freeze ? Object.freeze([]) : [], i.emptyObject = Object.freeze ? Object.freeze({}) : {}, i.longToHash = function (e) {
            return e ? i.LongBits.from(e).toHash() : i.LongBits.zeroHash
        }, i.copy = function (e) {
            if ("object" != (0, r.default)(e)) return e;
            var t = {};
            for (var o in e) t[o] = e[o];
            return t
        }, i.deepCopy = function e(t) {
            if ("object" != (0, r.default)(t)) return t;
            var o = {};
            for (var i in t) o[i] = e(t[i]);
            return o
        }, i.ProtocolError = function (e) {
            function t(e, o) {
                if (!(this instanceof t)) return new t(e, o);
                Object.defineProperty(this, "message", {
                    get: function () {
                        return e
                    }
                }), Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {value: (new Error).stack || ""}), o && merge(this, o)
            }

            return (t.prototype = Object.create(Error.prototype)).constructor = t, Object.defineProperty(t.prototype, "name", {
                get: function () {
                    return e
                }
            }), t.prototype.toString = function () {
                return this.name + ": " + this.message
            }, t
        }, i.toJSONOptions = {
            longs: String,
            enums: String,
            bytes: String,
            json: !0
        }, i.Buffer = null, i.newBuffer = function (e) {
            return "number" == typeof e ? new i.Array(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e)
        }, i.stringToBytes = function (e) {
            var t, o, r = [];
            t = e.length;
            for (var i = 0; i < t; i++) (o = e.charCodeAt(i)) >= 65536 && o <= 1114111 ? (r.push(o >> 18 & 7 | 240), r.push(o >> 12 & 63 | 128), r.push(o >> 6 & 63 | 128), r.push(63 & o | 128)) : o >= 2048 && o <= 65535 ? (r.push(o >> 12 & 15 | 224), r.push(o >> 6 & 63 | 128), r.push(63 & o | 128)) : o >= 128 && o <= 2047 ? (r.push(o >> 6 & 31 | 192), r.push(63 & o | 128)) : r.push(255 & o);
            return r
        }, i.byteToString = function (e) {
            if ("string" == typeof e) return e;
            for (var t = "", o = e, r = 0; r < o.length; r++) {
                var i = o[r].toString(2), n = i.match(/^1+?(?=0)/);
                if (n && 8 == i.length) {
                    for (var s = n[0].length, a = o[r].toString(2).slice(7 - s), u = 1; u < s; u++) a += o[u + r].toString(2).slice(2);
                    t += String.fromCharCode(parseInt(a, 2)), r += s - 1
                } else t += String.fromCharCode(o[r])
            }
            return t
        }, i.isInteger = Number.isInteger || function (e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        }, Object.defineProperty(i, "decorateRoot", {
            get: function () {
                return n.decorated || (n.decorated = new (o(39)))
            }
        })
    }, , function (e, t, o) {
        "use strict";

        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" === r(Symbol.iterator) ? function (e) {
                return r(e)
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : r(e)
            })(e)
        }

        function n(t) {
            return "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? e.exports = n = function (e) {
                return i(e)
            } : e.exports = n = function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : i(e)
            }, n(t)
        }

        e.exports = n
    }, , function (e, t, o) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var r = function () {
            return {
                WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: 0,
                WEBIM_CONNCTION_OPEN_ERROR: 1,
                WEBIM_CONNCTION_AUTH_ERROR: 2,
                WEBIM_CONNCTION_OPEN_USERGRID_ERROR: 3,
                WEBIM_CONNCTION_ATTACH_ERROR: 4,
                WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: 5,
                WEBIM_CONNCTION_REOPEN_ERROR: 6,
                WEBIM_CONNCTION_SERVER_CLOSE_ERROR: 7,
                WEBIM_CONNCTION_SERVER_ERROR: 8,
                WEBIM_CONNCTION_IQ_ERROR: 9,
                WEBIM_CONNCTION_USER_REMOVED: 207,
                WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE: 206,
                WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD: 216,
                WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE: 217,
                WEBIM_CONNCTION_PING_ERROR: 10,
                WEBIM_CONNCTION_NOTIFYVERSION_ERROR: 11,
                WEBIM_CONNCTION_GETROSTER_ERROR: 12,
                WEBIM_CONNCTION_CROSSDOMAIN_ERROR: 13,
                WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: 14,
                WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: 15,
                WEBIM_CONNCTION_DISCONNECTED: 16,
                WEBIM_CONNCTION_AJAX_ERROR: 17,
                WEBIM_CONNCTION_JOINROOM_ERROR: 18,
                WEBIM_CONNCTION_GETROOM_ERROR: 19,
                WEBIM_CONNCTION_GETROOMINFO_ERROR: 20,
                WEBIM_CONNCTION_GETROOMMEMBER_ERROR: 21,
                WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: 22,
                WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: 23,
                WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: 24,
                WEBIM_CONNCTION_JOINCHATROOM_ERROR: 25,
                WEBIM_CONNCTION_QUITCHATROOM_ERROR: 26,
                WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: 27,
                WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: 28,
                WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: 29,
                WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: 30,
                WEBIM_CONNCTION_CALLBACK_INNER_ERROR: 31,
                WEBIM_CONNCTION_CLIENT_OFFLINE: 32,
                WEBIM_CONNCTION_CLIENT_LOGOUT: 33,
                WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR: 34,
                WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP: 35,
                WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP: 36,
                WEBIM_CONNECTION_ACCEPT_JOIN_GROUP: 37,
                WEBIM_CONNECTION_DECLINE_JOIN_GROUP: 38,
                WEBIM_CONNECTION_CLOSED: 39,
                WEBIM_UPLOADFILE_BROWSER_ERROR: 100,
                WEBIM_UPLOADFILE_ERROR: 101,
                WEBIM_UPLOADFILE_NO_LOGIN: 102,
                WEBIM_UPLOADFILE_NO_FILE: 103,
                WEBIM_DOWNLOADFILE_ERROR: 200,
                WEBIM_DOWNLOADFILE_NO_LOGIN: 201,
                WEBIM_DOWNLOADFILE_BROWSER_ERROR: 202,
                WEBIM_MESSAGE_REC_TEXT: 300,
                WEBIM_MESSAGE_REC_TEXT_ERROR: 301,
                WEBIM_MESSAGE_REC_EMOTION: 302,
                WEBIM_MESSAGE_REC_PHOTO: 303,
                WEBIM_MESSAGE_REC_AUDIO: 304,
                WEBIM_MESSAGE_REC_AUDIO_FILE: 305,
                WEBIM_MESSAGE_REC_VEDIO: 306,
                WEBIM_MESSAGE_REC_VEDIO_FILE: 307,
                WEBIM_MESSAGE_REC_FILE: 308,
                WEBIM_MESSAGE_SED_TEXT: 309,
                WEBIM_MESSAGE_SED_EMOTION: 310,
                WEBIM_MESSAGE_SED_PHOTO: 311,
                WEBIM_MESSAGE_SED_AUDIO: 312,
                WEBIM_MESSAGE_SED_AUDIO_FILE: 313,
                WEBIM_MESSAGE_SED_VEDIO: 314,
                WEBIM_MESSAGE_SED_VEDIO_FILE: 315,
                WEBIM_MESSAGE_SED_FILE: 316,
                WEBIM_MESSAGE_SED_ERROR: 317,
                STATUS_INIT: 400,
                STATUS_DOLOGIN_USERGRID: 401,
                STATUS_DOLOGIN_IM: 402,
                STATUS_OPENED: 403,
                STATUS_CLOSING: 404,
                STATUS_CLOSED: 405,
                STATUS_ERROR: 406,
                GROUP_NOT_EXIST: 605,
                GROUP_NOT_JOINED: 602,
                MESSAGE_RECALL_TIME_LIMIT: 504,
                SERVICE_NOT_ENABLED: 505,
                SERVICE_NOT_ALLOW_MESSAGING: 506,
                SERVER_UNKNOWN_ERROR: 503,
                MESSAGE_INCLUDE_ILLEGAL_CONTENT: 501,
                PERMISSION_DENIED: 603,
                WEBIM_LOAD_MSG_ERROR: 604,
                SDK_RUNTIME_ERROR: 999
            }
        };
        t.default = r
    }, function (e, t, o) {
        "use strict";
        e.exports = i;
        var r = null;
        try {
            r = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
        } catch (e) {
        }

        function i(e, t, o) {
            this.low = 0 | e, this.high = 0 | t, this.unsigned = !!o
        }

        function n(e) {
            return !0 === (e && e.__isLong__)
        }

        i.prototype.__isLong__, Object.defineProperty(i.prototype, "__isLong__", {value: !0}), i.isLong = n;
        var s = {}, a = {};

        function u(e, t) {
            var o, r, i;
            return t ? (i = 0 <= (e >>>= 0) && e < 256) && (r = a[e]) ? r : (o = p(e, (0 | e) < 0 ? -1 : 0, !0), i && (a[e] = o), o) : (i = -128 <= (e |= 0) && e < 128) && (r = s[e]) ? r : (o = p(e, e < 0 ? -1 : 0, !1), i && (s[e] = o), o)
        }

        function l(e, t) {
            if (isNaN(e)) return t ? _ : v;
            if (t) {
                if (e < 0) return _;
                if (e >= y) return T
            } else {
                if (e <= -m) return I;
                if (e + 1 >= m) return b
            }
            return e < 0 ? l(-e, t).neg() : p(e % f | 0, e / f | 0, t)
        }

        function p(e, t, o) {
            return new i(e, t, o)
        }

        i.fromInt = u, i.fromNumber = l, i.fromBits = p;
        var c = Math.pow;

        function h(e, t, o) {
            if (0 === e.length) throw Error("empty string");
            if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return v;
            if ("number" == typeof t ? (o = t, t = !1) : t = !!t, (o = o || 10) < 2 || 36 < o) throw RangeError("radix");
            var r;
            if ((r = e.indexOf("-")) > 0) throw Error("interior hyphen");
            if (0 === r) return h(e.substring(1), t, o).neg();
            for (var i = l(c(o, 8)), n = v, s = 0; s < e.length; s += 8) {
                var a = Math.min(8, e.length - s), u = parseInt(e.substring(s, s + a), o);
                if (a < 8) {
                    var p = l(c(o, a));
                    n = n.mul(p).add(l(u))
                } else n = (n = n.mul(i)).add(l(u))
            }
            return n.unsigned = t, n
        }

        function d(e, t) {
            return "number" == typeof e ? l(e, t) : "string" == typeof e ? h(e, t) : p(e.low, e.high, "boolean" == typeof t ? t : e.unsigned)
        }

        i.fromString = h, i.fromValue = d;
        var f = 4294967296, y = f * f, m = y / 2, g = u(1 << 24), v = u(0);
        i.ZERO = v;
        var _ = u(0, !0);
        i.UZERO = _;
        var E = u(1);
        i.ONE = E;
        var N = u(1, !0);
        i.UONE = N;
        var O = u(-1);
        i.NEG_ONE = O;
        var b = p(-1, 2147483647, !1);
        i.MAX_VALUE = b;
        var T = p(-1, -1, !0);
        i.MAX_UNSIGNED_VALUE = T;
        var I = p(0, -2147483648, !1);
        i.MIN_VALUE = I;
        var R = i.prototype;
        R.toInt = function () {
            return this.unsigned ? this.low >>> 0 : this.low
        }, R.toNumber = function () {
            return this.unsigned ? (this.high >>> 0) * f + (this.low >>> 0) : this.high * f + (this.low >>> 0)
        }, R.toString = function (e) {
            if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix");
            if (this.isZero()) return "0";
            if (this.isNegative()) {
                if (this.eq(I)) {
                    var t = l(e), o = this.div(t), r = o.mul(t).sub(this);
                    return o.toString(e) + r.toInt().toString(e)
                }
                return "-" + this.neg().toString(e)
            }
            for (var i = l(c(e, 6), this.unsigned), n = this, s = ""; ;) {
                var a = n.div(i), u = (n.sub(a.mul(i)).toInt() >>> 0).toString(e);
                if ((n = a).isZero()) return u + s;
                for (; u.length < 6;) u = "0" + u;
                s = "" + u + s
            }
        }, R.getHighBits = function () {
            return this.high
        }, R.getHighBitsUnsigned = function () {
            return this.high >>> 0
        }, R.getLowBits = function () {
            return this.low
        }, R.getLowBitsUnsigned = function () {
            return this.low >>> 0
        }, R.getNumBitsAbs = function () {
            if (this.isNegative()) return this.eq(I) ? 64 : this.neg().getNumBitsAbs();
            for (var e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--) ;
            return 0 != this.high ? t + 33 : t + 1
        }, R.isZero = function () {
            return 0 === this.high && 0 === this.low
        }, R.eqz = R.isZero, R.isNegative = function () {
            return !this.unsigned && this.high < 0
        }, R.isPositive = function () {
            return this.unsigned || this.high >= 0
        }, R.isOdd = function () {
            return 1 == (1 & this.low)
        }, R.isEven = function () {
            return 0 == (1 & this.low)
        }, R.equals = function (e) {
            return n(e) || (e = d(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && (this.high === e.high && this.low === e.low)
        }, R.eq = R.equals, R.notEquals = function (e) {
            return !this.eq(e)
        }, R.neq = R.notEquals, R.ne = R.notEquals, R.lessThan = function (e) {
            return this.comp(e) < 0
        }, R.lt = R.lessThan, R.lessThanOrEqual = function (e) {
            return this.comp(e) <= 0
        }, R.lte = R.lessThanOrEqual, R.le = R.lessThanOrEqual, R.greaterThan = function (e) {
            return this.comp(e) > 0
        }, R.gt = R.greaterThan, R.greaterThanOrEqual = function (e) {
            return this.comp(e) >= 0
        }, R.gte = R.greaterThanOrEqual, R.ge = R.greaterThanOrEqual, R.compare = function (e) {
            if (n(e) || (e = d(e)), this.eq(e)) return 0;
            var t = this.isNegative(), o = e.isNegative();
            return t && !o ? -1 : !t && o ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1
        }, R.comp = R.compare, R.negate = function () {
            return !this.unsigned && this.eq(I) ? I : this.not().add(E)
        }, R.neg = R.negate, R.add = function (e) {
            n(e) || (e = d(e));
            var t = this.high >>> 16, o = 65535 & this.high, r = this.low >>> 16, i = 65535 & this.low,
                s = e.high >>> 16, a = 65535 & e.high, u = e.low >>> 16, l = 0, c = 0, h = 0, f = 0;
            return h += (f += i + (65535 & e.low)) >>> 16, c += (h += r + u) >>> 16, l += (c += o + a) >>> 16, l += t + s, p((h &= 65535) << 16 | (f &= 65535), (l &= 65535) << 16 | (c &= 65535), this.unsigned)
        }, R.subtract = function (e) {
            return n(e) || (e = d(e)), this.add(e.neg())
        }, R.sub = R.subtract, R.multiply = function (e) {
            if (this.isZero()) return v;
            if (n(e) || (e = d(e)), r) return p(r.mul(this.low, this.high, e.low, e.high), r.get_high(), this.unsigned);
            if (e.isZero()) return v;
            if (this.eq(I)) return e.isOdd() ? I : v;
            if (e.eq(I)) return this.isOdd() ? I : v;
            if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
            if (e.isNegative()) return this.mul(e.neg()).neg();
            if (this.lt(g) && e.lt(g)) return l(this.toNumber() * e.toNumber(), this.unsigned);
            var t = this.high >>> 16, o = 65535 & this.high, i = this.low >>> 16, s = 65535 & this.low,
                a = e.high >>> 16, u = 65535 & e.high, c = e.low >>> 16, h = 65535 & e.low, f = 0, y = 0, m = 0, _ = 0;
            return m += (_ += s * h) >>> 16, y += (m += i * h) >>> 16, m &= 65535, y += (m += s * c) >>> 16, f += (y += o * h) >>> 16, y &= 65535, f += (y += i * c) >>> 16, y &= 65535, f += (y += s * u) >>> 16, f += t * h + o * c + i * u + s * a, p((m &= 65535) << 16 | (_ &= 65535), (f &= 65535) << 16 | (y &= 65535), this.unsigned)
        }, R.mul = R.multiply, R.divide = function (e) {
            if (n(e) || (e = d(e)), e.isZero()) throw Error("division by zero");
            var t, o, i;
            if (r) return this.unsigned || -2147483648 !== this.high || -1 !== e.low || -1 !== e.high ? p((this.unsigned ? r.div_u : r.div_s)(this.low, this.high, e.low, e.high), r.get_high(), this.unsigned) : this;
            if (this.isZero()) return this.unsigned ? _ : v;
            if (this.unsigned) {
                if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return _;
                if (e.gt(this.shru(1))) return N;
                i = _
            } else {
                if (this.eq(I)) return e.eq(E) || e.eq(O) ? I : e.eq(I) ? E : (t = this.shr(1).div(e).shl(1)).eq(v) ? e.isNegative() ? E : O : (o = this.sub(e.mul(t)), i = t.add(o.div(e)));
                if (e.eq(I)) return this.unsigned ? _ : v;
                if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
                if (e.isNegative()) return this.div(e.neg()).neg();
                i = v
            }
            for (o = this; o.gte(e);) {
                t = Math.max(1, Math.floor(o.toNumber() / e.toNumber()));
                for (var s = Math.ceil(Math.log(t) / Math.LN2), a = s <= 48 ? 1 : c(2, s - 48), u = l(t), h = u.mul(e); h.isNegative() || h.gt(o);) h = (u = l(t -= a, this.unsigned)).mul(e);
                u.isZero() && (u = E), i = i.add(u), o = o.sub(h)
            }
            return i
        }, R.div = R.divide, R.modulo = function (e) {
            return n(e) || (e = d(e)), r ? p((this.unsigned ? r.rem_u : r.rem_s)(this.low, this.high, e.low, e.high), r.get_high(), this.unsigned) : this.sub(this.div(e).mul(e))
        }, R.mod = R.modulo, R.rem = R.modulo, R.not = function () {
            return p(~this.low, ~this.high, this.unsigned)
        }, R.and = function (e) {
            return n(e) || (e = d(e)), p(this.low & e.low, this.high & e.high, this.unsigned)
        }, R.or = function (e) {
            return n(e) || (e = d(e)), p(this.low | e.low, this.high | e.high, this.unsigned)
        }, R.xor = function (e) {
            return n(e) || (e = d(e)), p(this.low ^ e.low, this.high ^ e.high, this.unsigned)
        }, R.shiftLeft = function (e) {
            return n(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? p(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : p(0, this.low << e - 32, this.unsigned)
        }, R.shl = R.shiftLeft, R.shiftRight = function (e) {
            return n(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? p(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : p(this.high >> e - 32, this.high >= 0 ? 0 : -1, this.unsigned)
        }, R.shr = R.shiftRight, R.shiftRightUnsigned = function (e) {
            if (n(e) && (e = e.toInt()), 0 === (e &= 63)) return this;
            var t = this.high;
            return e < 32 ? p(this.low >>> e | t << 32 - e, t >>> e, this.unsigned) : p(32 === e ? t : t >>> e - 32, 0, this.unsigned)
        }, R.shru = R.shiftRightUnsigned, R.shr_u = R.shiftRightUnsigned, R.toSigned = function () {
            return this.unsigned ? p(this.low, this.high, !1) : this
        }, R.toUnsigned = function () {
            return this.unsigned ? this : p(this.low, this.high, !0)
        }, R.toBytes = function (e) {
            return e ? this.toBytesLE() : this.toBytesBE()
        }, R.toBytesLE = function () {
            var e = this.high, t = this.low;
            return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24]
        }, R.toBytesBE = function () {
            var e = this.high, t = this.low;
            return [e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
        }, i.fromBytes = function (e, t, o) {
            return o ? i.fromBytesLE(e, t) : i.fromBytesBE(e, t)
        }, i.fromBytesLE = function (e, t) {
            return new i(e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24, e[4] | e[5] << 8 | e[6] << 16 | e[7] << 24, t)
        }, i.fromBytesBE = function (e, t) {
            return new i(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7], e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3], t)
        }
    }, , function (e, t, o) {
        "use strict";
        var r = o(0)(o(5));
        e.exports = s;
        var i = o(23);
        ((s.prototype = Object.create(i.prototype)).constructor = s).className = "Enum";
        var n = o(32);

        function s(e, t, o, n, s) {
            if (i.call(this, e, o), t && "object" !== (0, r.default)(t)) throw TypeError("values must be an object");
            if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = n, this.comments = s || {}, this.reserved = void 0, t) for (var a = Object.keys(t), u = 0; u < a.length; ++u) "number" == typeof t[a[u]] && (this.valuesById[this.values[a[u]] = t[a[u]]] = a[u])
        }

        s.fromJSON = function (e, t) {
            var o = new s(e, t.values, t.options, t.comment, t.comments);
            return o.reserved = t.reserved, o
        }, s.prototype.toJSON = function (e) {
            var t = !!e && Boolean(e.keepComments);
            return util.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", t ? this.comment : void 0, "comments", t ? this.comments : void 0])
        }, s.prototype.add = function (e, t, o) {
            if (!util.isString(e)) throw TypeError("name must be a string");
            if (!util.isInteger(t)) throw TypeError("id must be an integer");
            if (void 0 !== this.values[e]) throw Error("duplicate name '" + e + "' in " + this);
            if (this.isReservedId(t)) throw Error("id " + t + " is reserved in " + this);
            if (this.isReservedName(e)) throw Error("name '" + e + "' is reserved in " + this);
            if (void 0 !== this.valuesById[t]) {
                if (!this.options || !this.options.allow_alias) throw Error("duplicate id " + t + " in " + this);
                this.values[e] = t
            } else this.valuesById[this.values[e] = t] = e;
            return this.comments[e] = o || null, this
        }, s.prototype.remove = function (e) {
            if (!util.isString(e)) throw TypeError("name must be a string");
            var t = this.values[e];
            if (null == t) throw Error("name '" + e + "' does not exist in " + this);
            return delete this.valuesById[t], delete this.values[e], delete this.comments[e], this
        }, s.prototype.isReservedId = function (e) {
            return n.isReservedId(this.reserved, e)
        }, s.prototype.isReservedName = function (e) {
            return n.isReservedName(this.reserved, e)
        }
    }, , , , function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i = r(o(5)), n = r(o(55)), s = r(o(56)), a = o(57), u = function (e) {
        }, l = {}, p = function () {
            function e(t, o, r) {
                (0, n.default)(this, e), this.name = t || "defaultLogger", this.currentLevel = void 0, this.useCookiePersist = void 0, this.storageLogLevelKey = "loglevel", this.levels = {
                    TRACE: 0,
                    DEBUG: 1,
                    INFO: 2,
                    WARN: 3,
                    ERROR: 4,
                    SILENT: 5
                }, this.logMethods = ["trace", "debug", "info", "warn", "error"], this.methodFactory = r || this.defaultMethodFactory;
                var i = this._getPersistedLevel();
                null == i && (i = null == o ? "WARN" : o), this.logs = [], this.config = {
                    useCache: !1,
                    maxCache: 3145728,
                    color: "",
                    background: ""
                }, this.logBytes = 0, this.setLevel(i, !1)
            }

            return (0, s.default)(e, [{
                key: "setConfig", value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.config = e
                }
            }, {
                key: "getLevel", value: function () {
                    return this.currentLevel
                }
            }, {
                key: "setLevel", value: function (e, t, o) {
                    if ("string" == typeof e && "undefined" !== this.levels[e.toUpperCase()] && (e = this.levels[e.toUpperCase()]), !("number" == typeof e && e >= 0 && e <= this.levels.SILENT)) throw"log.setLevel() called with invalid level: " + e;
                    if (this.currentLevel = e, !1 !== t && this._persistLevel(e), this.replaceLoggingMethods(e, o), "undefined" == typeof console && e < self.levels.SILENT) return "No console available for logging"
                }
            }, {
                key: "setDefaultLevel", value: function () {
                    _getPersistedLevel() || this.setLevel(level, !1)
                }
            }, {
                key: "enableAll", value: function (e) {
                    this.setLevel(this.levels.TRACE, e)
                }
            }, {
                key: "disableAll", value: function (e) {
                    this.setLevel(this.levels.SILENT, e)
                }
            }, {
                key: "getLogs", value: function () {
                    return this.logs
                }
            }, {
                key: "download", value: function () {
                    if ("undefined" != typeof window && "undefined" != typeof document) {
                        var e = this.getLogs().join("\n"), t = new Blob([e], {type: "text/plain;charset=UTF-8"}),
                            o = window.URL.createObjectURL(t), r = (new FormData, document.createElement("a"));
                        r.style.display = "none", r.href = o, r.setAttribute("download", "sdklog"), document.body.appendChild(r), r.click()
                    }
                }
            }, {
                key: "_bindMethod", value: function (e, t, o) {
                    var r = e[t];
                    if (o) return this._cacheLog;
                    if ("function" == typeof r.bind) return r.bind(e);
                    try {
                        return Function.prototype.bind.call(r, e)
                    } catch (t) {
                        return function () {
                            return Function.prototype.apply.apply(r, [e, arguments])
                        }
                    }
                }
            }, {
                key: "_cacheLog", value: function () {
                    for (var e = (new Date).toLocaleString() + ": ", t = "", o = arguments.length, r = new Array(o), n = 0; n < o; n++) r[n] = arguments[n];
                    r.forEach((function (e) {
                        "object" === (0, i.default)(e) ? t += JSON.stringify(e) + " " : t += e + " "
                    })), this._cacheLogCall(e + t)
                }
            }, {
                key: "_cacheLogCall", value: function (e) {
                    var t = c(e), o = this.logBytes + t, r = this.config.maxCache;
                    if (!(t >= r)) {
                        if (o < r) this.logBytes += t; else for (var i = o - r, n = 0; n < i;) {
                            var s = this.logs.shift();
                            console.log("clearOutLog", s), "undefined" !== s && (n += c(s))
                        }
                        this.logs.push(e)
                    }
                }
            }, {
                key: "_getPersistedLevel", value: function () {
                    var e;
                    if ("undefined" == typeof window) return console.warn("this lib can run in browser only!");
                    if ("undefined" === (e = window.localStorage[this.storageLogLevelKey])) {
                        var t = window.document.cookie, o = t.indexOf(encodeURIComponent(this.storageLogLevelKey));
                        -1 !== o && (e = /^([^;]+)/.exec(t.slice(o))[1])
                    }
                    return e
                }
            }, {
                key: "_persistLevel", value: function (e) {
                    var t = this.logMethods[e] || "SILENT";
                    if ("undefined" == typeof window) return console.warn("this lib can run in browser only!");
                    window.localStorage[this.storageLogLevelKey] = t, this.useCookiePersist && (window.document.cookie = encodeURIComponent(this.storageLogLevelKey) + "=" + t + ";")
                }
            }, {
                key: "replaceLoggingMethods", value: function (e, t) {
                    for (var o = 0; o < this.logMethods.length; o++) {
                        var r = this.logMethods[o];
                        this[r] = o < e ? u : this.methodFactory(r, e, t)
                    }
                    this.log = this.debug
                }
            }, {
                key: "defaultMethodFactory", value: function (e, t, o) {
                    return this.realMethod(e) || this.enableLoggingWhenConsoleArrives.apply(this, arguments)
                }
            }, {
                key: "realMethod", value: function (e) {
                    return "debug" === e && (e = "log"), "undefined" != typeof console && ("trace" === e && a.isIE ? a.traceForIE : "undefined" !== console[e] ? this._bindMethod(console, e, this.config.useCache) : "undefined" !== console.log ? this._bindMethod(console, "log", this.config.useCache) : u)
                }
            }, {
                key: "enableLoggingWhenConsoleArrives", value: function (e, t, o) {
                    return function () {
                        "undefined" != typeof console && (replaceLoggingMethods.call(this, t, o), this[e].apply(this, arguments))
                    }
                }
            }]), e
        }();

        function c(e) {
            for (var t = e.length, o = 0; o < e.length; o++) e.charCodeAt(o) > 255 && t++;
            return t
        }

        var h = new p;
        h.getLogger = function (e) {
            if ("string" != typeof e || "" === e) throw new TypeError("You must supply a name when creating a logger.");
            var t = l[e];
            return t || (t = l[e] = new p(e, h.getLevel(), h.methodFactory)), t
        };
        var d = "undefined" != typeof window ? window.log : void 0;
        h.noConflict = function () {
            return "undefined" != typeof window && window.log === h && (window.log = d), h
        }, h.getLoggers = function () {
            return l
        };
        var f = h;
        t.default = f
    }, , function (e, t, o) {
        "use strict";
        var r = o(0)(o(5));
        e.exports = p;
        var i, n, s, a, u = o(23);
        ((p.prototype = Object.create(u.prototype)).constructor = p).className = "Field";
        var l = /^required|optional|repeated$/;

        function p(e, t, o, r, i, a, p) {
            if (s.isObject(r) ? (p = i, a = r, r = i = void 0) : s.isObject(i) && (p = a, a = i, i = void 0), u.call(this, e, a), !s.isInteger(t) || t < 0) throw TypeError("id must be a non-negative integer");
            if (!s.isString(o)) throw TypeError("type must be a string");
            if (void 0 !== r && !l.test(r = r.toString().toLowerCase())) throw TypeError("rule must be a string rule");
            if (void 0 !== i && !s.isString(i)) throw TypeError("extend must be a string");
            this.rule = r && "optional" !== r ? r : void 0, this.type = o, this.id = t, this.extend = i || void 0, this.required = "required" === r, this.optional = !this.required, this.repeated = "repeated" === r, this.map = !1, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = !!s.Long && void 0 !== n.long[o], this.bytes = "bytes" === o, this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = p
        }

        p.fromJSON = function (e, t) {
            return new p(e, t.id, t.type, t.rule, t.extend, t.options, t.comment)
        }, Object.defineProperty(p.prototype, "packed", {
            get: function () {
                return null === this._packed && (this._packed = !1 !== this.getOption("packed")), this._packed
            }
        }), p.prototype.setOption = function (e, t, o) {
            return "packed" === e && (this._packed = null), u.prototype.setOption.call(this, e, t, o)
        }, p.prototype.toJSON = function (e) {
            var t = !!e && Boolean(e.keepComments);
            return s.toObject(["rule", "optional" !== this.rule && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0])
        }, p.prototype.resolve = function () {
            if (this.resolved) return this;
            if (void 0 === (this.typeDefault = n.defaults[this.type]) && (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof a ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]), this.options && null != this.options.default && (this.typeDefault = this.options.default, this.resolvedType instanceof i && "string" == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault])), this.options && (!0 !== this.options.packed && (void 0 === this.options.packed || !this.resolvedType || this.resolvedType instanceof i) || delete this.options.packed, Object.keys(this.options).length || (this.options = void 0)), this.long) this.typeDefault = s.Long.fromNumber(this.typeDefault, "u" === this.type.charAt(0)), Object.freeze && Object.freeze(this.typeDefault); else if (this.bytes && "string" == typeof this.typeDefault) {
                var e;
                s.utf8.write(this.typeDefault, e = s.newBuffer(s.utf8.length(this.typeDefault)), 0), this.typeDefault = e
            }
            return this.map ? this.defaultValue = s.emptyObject : this.repeated ? this.defaultValue = s.emptyArray : this.defaultValue = this.typeDefault, this.parent instanceof a && (this.parent.ctor.prototype[this.name] = this.defaultValue), u.prototype.resolve.call(this)
        }, p.d = function (e, t, o, i) {
            return "function" == typeof t ? t = s.decorateType(t).name : t && "object" === (0, r.default)(t) && (t = s.decorateEnum(t).name), function (r, n) {
                s.decorateType(r.constructor).add(new p(n, e, t, o, {default: i}))
            }
        }, p._configure = function () {
            a = o(22), i = o(10), n = o(24), s = o(3)
        }
    }, , , , , , function (e, t, o) {
        "use strict";
        e.exports = v;
        var r, i, n, s, a, u, l, p, c, h, d, f, y, m, g = o(32);

        function v(e, t) {
            g.call(this, e, t), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null
        }

        function _(e) {
            return e._fieldsById = e._fieldsArray = e._oneofsArray = null, delete e.encode, delete e.decode, delete e.verify, e
        }

        ((v.prototype = Object.create(g.prototype)).constructor = v).className = "Type", Object.defineProperties(v.prototype, {
            fieldsById: {
                get: function () {
                    if (this._fieldsById) return this._fieldsById;
                    this._fieldsById = {};
                    for (var e = Object.keys(this.fields), t = 0; t < e.length; ++t) {
                        var o = this.fields[e[t]], r = o.id;
                        if (this._fieldsById[r]) throw Error("duplicate id " + r + " in " + this);
                        this._fieldsById[r] = o
                    }
                    return this._fieldsById
                }
            }, fieldsArray: {
                get: function () {
                    return this._fieldsArray || (this._fieldsArray = l.toArray(this.fields))
                }
            }, oneofsArray: {
                get: function () {
                    return this._oneofsArray || (this._oneofsArray = l.toArray(this.oneofs))
                }
            }, ctor: {
                get: function () {
                    return this._ctor || (this.ctor = v.generateConstructor(this))
                }, set: function (e) {
                    var t = e.prototype;
                    t instanceof n || ((e.prototype = new n).constructor = e, l.merge(e.prototype, t)), e.$type = e.prototype.$type = this, l.merge(e, n, !0), l.merge(e.prototype, n, !0), this._ctor = e;
                    for (var o = 0; o < this.fieldsArray.length; ++o) this._fieldsArray[o].resolve();
                    var r = {};
                    for (o = 0; o < this.oneofsArray.length; ++o) {
                        var i = this._oneofsArray[o].resolve().name, s = function (e) {
                            for (var t = {}, o = 0; o < e.length; ++o) t[e[o]] = 0;
                            return {
                                setter: function (o) {
                                    if (!(e.indexOf(o) < 0)) {
                                        t[o] = 1;
                                        for (var r = 0; r < e.length; ++r) e[r] !== o && delete this[e[r]]
                                    }
                                }, getter: function () {
                                    for (var e = Object.keys(this), o = e.length - 1; o > -1; --o) if (1 === t[e[o]] && void 0 !== this[e[o]] && null !== this[e[o]]) return e[o]
                                }
                            }
                        }(this._oneofsArray[o].oneof);
                        r[i] = {get: s.getter, set: s.setter}
                    }
                    o && Object.defineProperties(e.prototype, r)
                }
            }
        }), v.generateConstructor = function (e) {
            return function (t) {
                for (var o, r = 0; r < e.fieldsArray.length; r++) (o = e._fieldsArray[r]).map ? this[o.name] = {} : o.repeated && (this[o.name] = []);
                if (t) for (var i = Object.keys(t), n = 0; n < i.length; ++n) null != t[i[n]] && (this[i[n]] = t[i[n]])
            }
        }, v.fromJSON = function (e, t) {
            var o = new v(e, t.options);
            o.extensions = t.extensions, o.reserved = t.reserved;
            for (var n = Object.keys(t.fields), a = 0; a < n.length; ++a) o.add((void 0 !== t.fields[n[a]].keyType ? m.fromJSON : i.fromJSON)(n[a], t.fields[n[a]]));
            if (t.oneofs) for (n = Object.keys(t.oneofs), a = 0; a < n.length; ++a) o.add(s.fromJSON(n[a], t.oneofs[n[a]]));
            if (t.nested) for (n = Object.keys(t.nested), a = 0; a < n.length; ++a) {
                var u = t.nested[n[a]];
                o.add((void 0 !== u.id ? i.fromJSON : void 0 !== u.fields ? v.fromJSON : void 0 !== u.values ? r.fromJSON : void 0 !== u.methods ? d.fromJSON : g.fromJSON)(n[a], u))
            }
            return t.extensions && t.extensions.length && (o.extensions = t.extensions), t.reserved && t.reserved.length && (o.reserved = t.reserved), t.group && (o.group = !0), t.comment && (o.comment = t.comment), o
        }, v.prototype.toJSON = function (e) {
            var t = g.prototype.toJSON.call(this, e), o = !!e && Boolean(e.keepComments);
            return {
                options: t && t.options || void 0,
                oneofs: g.arrayToJSON(this.oneofsArray, e),
                fields: g.arrayToJSON(this.fieldsArray.filter((function (e) {
                    return !e.declaringField
                })), e) || {},
                extensions: this.extensions && this.extensions.length ? this.extensions : void 0,
                reserved: this.reserved && this.reserved.length ? this.reserved : void 0,
                group: this.group || void 0,
                nested: t && t.nested || void 0,
                comment: o ? this.comment : void 0
            }
        }, v.prototype.resolveAll = function () {
            for (var e = this.fieldsArray, t = 0; t < e.length;) e[t++].resolve();
            var o = this.oneofsArray;
            for (t = 0; t < o.length;) o[t++].resolve();
            return g.prototype.resolveAll.call(this)
        }, v.prototype.get = function (e) {
            return this.fields[e] || this.oneofs && this.oneofs[e] || this.nested && this.nested[e] || null
        }, v.prototype.add = function (e) {
            if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this);
            if (e instanceof i && void 0 === e.extend) {
                if (this._fieldsById && this._fieldsById[e.id]) throw Error("duplicate id " + e.id + " in " + this);
                if (this.isReservedId(e.id)) throw Error("id " + e.id + " is reserved in " + this);
                if (this.isReservedName(e.name)) throw Error("name '" + e.name + "' is reserved in " + this);
                return e.parent && e.parent.remove(e), this.fields[e.name] = e, e.message = this, e.onAdd(this), _(this)
            }
            return e instanceof s ? (this.oneofs || (this.oneofs = {}), this.oneofs[e.name] = e, e.onAdd(this), _(this)) : g.prototype.add.call(this, e)
        }, v.prototype.remove = function (e) {
            if (e instanceof i && void 0 === e.extend) {
                if (!this.fields || this.fields[e.name] !== e) throw Error(e + " is not a member of " + this);
                return delete this.fields[e.name], e.parent = null, e.onRemove(this), _(this)
            }
            if (e instanceof s) {
                if (!this.oneofs || this.oneofs[e.name] !== e) throw Error(e + " is not a member of " + this);
                return delete this.oneofs[e.name], e.parent = null, e.onRemove(this), _(this)
            }
            return g.prototype.remove.call(this, e)
        }, v.prototype.isReservedId = function (e) {
            return g.isReservedId(this.reserved, e)
        }, v.prototype.isReservedName = function (e) {
            return g.isReservedName(this.reserved, e)
        }, v.prototype.create = function (e) {
            return new this.ctor(e)
        }, v.prototype.setup = function () {
            for (var e = this.fullName, t = [], o = 0; o < this.fieldsArray.length; ++o) t.push(this._fieldsArray[o].resolve().resolvedType);
            this.encode = c(this)({Writer: a, types: t, util: l}), this.decode = h(this)({
                Reader: u,
                types: t,
                util: l
            }), this.verify = p(this)({types: t, util: l}), this.fromObject = y.fromObject(this)({
                types: t,
                util: l
            }), this.toObject = y.toObject(this)({types: t, util: l});
            var r = f[e];
            if (r) {
                var i = Object.create(this);
                i.fromObject = this.fromObject, this.fromObject = r.fromObject.bind(i), i.toObject = this.toObject, this.toObject = r.toObject.bind(i)
            }
            return this
        }, v.prototype.encode = function (e, t) {
            return this.setup().encode(e, t)
        }, v.prototype.encodeDelimited = function (e, t) {
            return this.encode(e, t && t.len ? t.fork() : t).ldelim()
        }, v.prototype.decode = function (e, t) {
            return this.setup().decode(e, t)
        }, v.prototype.decodeDelimited = function (e) {
            return e instanceof u || (e = u.create(e)), this.decode(e, e.uint32())
        }, v.prototype.verify = function (e) {
            return this.setup().verify(e)
        }, v.prototype.fromObject = function (e) {
            return this.setup().fromObject(e)
        }, v.prototype.toObject = function (e, t) {
            return this.setup().toObject(e, t)
        }, v.d = function (e) {
            return function (t) {
                l.decorateType(t, e)
            }
        }, v._configure = function () {
            r = o(10), i = o(16), n = o(68), s = o(33), a = o(93), u = o(100), l = o(3), p = o(101), c = o(102), h = o(103), d = o(40), f = o(104), y = o(105), m = o(66)
        }
    }, function (e, t, o) {
        "use strict";
        var r, i;

        function n(e, t) {
            if (!r.isString(e)) throw TypeError("name must be a string");
            if (t && !r.isObject(t)) throw TypeError("options must be an object");
            this.options = t, this.name = e, this.parent = null, this.resolved = !1, this.comment = null, this.filename = null
        }

        e.exports = n, n.className = "ReflectionObject", Object.defineProperties(n.prototype, {
            root: {
                get: function () {
                    for (var e = this; null !== e.parent;) e = e.parent;
                    return e
                }
            }, fullName: {
                get: function () {
                    for (var e = [this.name], t = this.parent; t;) e.unshift(t.name), t = t.parent;
                    return e.join(".")
                }
            }
        }), n.prototype.toJSON = function () {
            throw Error()
        }, n.prototype.onAdd = function (e) {
            this.parent && this.parent !== e && this.parent.remove(this), this.parent = e, this.resolved = !1;
            var t = e.root;
            t instanceof i && t._handleAdd(this)
        }, n.prototype.onRemove = function (e) {
            var t = e.root;
            t instanceof i && t._handleRemove(this), this.parent = null, this.resolved = !1
        }, n.prototype.resolve = function () {
            return this.resolved || this.root instanceof i && (this.resolved = !0), this
        }, n.prototype.getOption = function (e) {
            if (this.options) return this.options[e]
        }, n.prototype.setOption = function (e, t, o) {
            return o && this.options && void 0 !== this.options[e] || ((this.options || (this.options = {}))[e] = t), this
        }, n.prototype.setOptions = function (e, t) {
            if (e) for (var o = Object.keys(e), r = 0; r < o.length; ++r) this.setOption(o[r], e[o[r]], t);
            return this
        }, n.prototype.toString = function () {
            var e = this.constructor.className, t = this.fullName;
            return t.length ? e + " " + t : e
        }, n._configure = function (e) {
            i = o(39), r = o(3)
        }
    }, function (e, t, o) {
        "use strict";
        var r = e.exports, i = o(3),
            n = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];

        function s(e, t) {
            var o = 0, r = {};
            for (t |= 0; o < e.length;) r[n[o + t]] = e[o++];
            return r
        }

        r.basic = s([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]), r.defaults = s([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", i.emptyArray, null]), r.long = s([0, 0, 0, 1, 1], 7), r.mapKey = s([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2), r.packed = s([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]), r._configure = function () {
            i = o(3)
        }
    }, , , , , function (e, t, o) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var r = function e(t, o) {
            return !this instanceof e ? new e(t) : (this._msg = {}, "function" == typeof e[t] && (e[t].prototype.setGroup = this.setGroup, this._msg = new e[t](o)), this._msg)
        };
        r.prototype.setGroup = function (e) {
            this.body.group = e
        }, r.prototype._utils = {}, (r.read = function (e) {
            this.id = e, this.type = "read"
        }).prototype.set = function (e) {
            this.body = {
                id: this.id,
                type: this.type,
                ackId: e.id,
                to: e.to,
                msgConfig: e.msgConfig,
                ackContent: e.ackContent
            }, !e.msgConfig && delete this.body.msgConfig, !e.ackContent && delete this.body.ackContent
        }, (r.delivery = function (e) {
            this.id = e, this.type = "delivery"
        }).prototype.set = function (e) {
            this.body = {id: this.id, type: this.type, ackId: e.ackId, to: e.to}
        }, (r.txt = function (e) {
            this.id = e, this.type = "txt", this.body = {}
        }).prototype.set = function (e) {
            this.value = e.msg, this.body = {
                id: this.id,
                to: e.to,
                from: e.from,
                msg: this.value,
                type: this.type,
                roomType: e.roomType,
                ext: e.ext || {},
                success: e.success,
                fail: e.fail,
                msgConfig: e.msgConfig
            }, !e.msgConfig && delete this.body.msgConfig, !e.roomType && delete this.body.roomType
        }, (r.cmd = function (e) {
            this.id = e, this.type = "cmd", this.body = {}
        }).prototype.set = function (e) {
            this.value = "", this.body = {
                id: this.id,
                to: e.to,
                from: e.from,
                action: e.action,
                msg: this.value,
                type: this.type,
                roomType: e.roomType,
                ext: e.ext || {},
                success: e.success
            }, !e.roomType && delete this.body.roomType
        }, (r.custom = function (e) {
            this.id = e, this.type = "custom", this.body = {}
        }).prototype.set = function (e) {
            this.body = {
                id: this.id,
                to: e.to,
                from: e.from,
                params: e.params,
                customEvent: e.customEvent,
                customExts: e.customExts,
                type: this.type,
                roomType: e.roomType,
                ext: e.ext || {},
                success: e.success
            }, !e.roomType && delete this.body.roomType
        }, (r.location = function (e) {
            this.id = e, this.type = "loc", this.body = {}
        }).prototype.set = function (e) {
            this.body = {
                id: this.id,
                to: e.to,
                type: this.type,
                roomType: e.roomType,
                addr: e.addr,
                lat: e.lat,
                lng: e.lng,
                ext: e.ext || {}
            }
        }, (r.img = function (e) {
            this.id = e, this.type = "img", this.body = {}
        }).prototype.set = function (e) {
            e.file = e.file || r.prototype._utils.getFileUrl(e.fileInputId), this.value = e.file, this.body = {
                id: this.id,
                file: this.value,
                apiUrl: e.apiUrl,
                to: e.to,
                from: e.from,
                type: this.type,
                ext: e.ext || {},
                roomType: e.roomType,
                onFileUploadError: e.onFileUploadError,
                onFileUploadComplete: e.onFileUploadComplete,
                success: e.success,
                fail: e.fail,
                flashUpload: e.flashUpload,
                width: e.width,
                height: e.height,
                body: e.body,
                uploadError: e.uploadError,
                uploadComplete: e.uploadComplete
            }, !e.roomType && delete this.body.roomType
        }, (r.audio = function (e) {
            this.id = e, this.type = "audio", this.body = {}
        }).prototype.set = function (e) {
            e.file = e.file || r.prototype._utils.getFileUrl(e.fileInputId), this.value = e.file, this.filename = e.filename || this.value.filename, this.body = {
                id: this.id,
                file: this.value,
                filename: this.filename,
                apiUrl: e.apiUrl,
                to: e.to,
                from: e.from,
                type: this.type,
                ext: e.ext || {},
                length: e.length || 0,
                roomType: e.roomType,
                file_length: e.file_length,
                onFileUploadError: e.onFileUploadError,
                onFileUploadComplete: e.onFileUploadComplete,
                success: e.success,
                fail: e.fail,
                flashUpload: e.flashUpload,
                body: e.body
            }, !e.roomType && delete this.body.roomType
        }, (r.file = function (e) {
            this.id = e, this.type = "file", this.body = {}
        }).prototype.set = function (e) {
            e.file = e.file || r.prototype._utils.getFileUrl(e.fileInputId), this.value = e.file, this.filename = e.filename || this.value.filename, this.body = {
                id: this.id,
                file: this.value,
                filename: this.filename,
                apiUrl: e.apiUrl,
                to: e.to,
                from: e.from,
                type: this.type,
                ext: e.ext || {},
                roomType: e.roomType,
                onFileUploadError: e.onFileUploadError,
                onFileUploadComplete: e.onFileUploadComplete,
                success: e.success,
                fail: e.fail,
                flashUpload: e.flashUpload,
                body: e.body
            }, !e.roomType && delete this.body.roomType
        }, (r.video = function (e) {
            this.id = e, this.type = "video", this.body = {}
        }).prototype.set = function (e) {
            e.file = e.file || r.prototype._utils.getFileUrl(e.fileInputId), this.value = e.file, this.filename = e.filename || this.value.filename, this.body = {
                id: this.id,
                file: this.value,
                filename: this.filename,
                apiUrl: e.apiUrl,
                to: e.to,
                from: e.from,
                type: this.type,
                ext: e.ext || {},
                length: e.length || 0,
                roomType: e.roomType,
                file_length: e.file_length,
                onFileUploadError: e.onFileUploadError,
                onFileUploadComplete: e.onFileUploadComplete,
                success: e.success,
                fail: e.fail,
                flashUpload: e.flashUpload,
                body: e.body
            }, !e.roomType && delete this.body.roomType
        };
        var i = r;
        t.default = i
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i, n = r(o(5)), s = r(o(14)).default.getLogger("IM-SDK-LOG");

        function a(e) {
            if (e && "object" == (0, n.default)(e)) {
                var t = [], o = this.context.root.lookup("easemob.pb.KeyValue"), r = [];
                for (var i in e) {
                    var s = o.decode(t);
                    s.key = i, "object" == (0, n.default)(e[i]) ? (s.type = 8, s.stringValue = JSON.stringify(e[i])) : "string" == typeof e[i] ? (s.type = 7, s.stringValue = e[i]) : "boolean" == typeof e[i] ? (s.type = 1, s.varintValue = 1 == e[i] ? 1 : 0) : Number.isInteger(e[i]) ? (s.type = 2, s.varintValue = e[i]) : (s.type = 6, s.doubleValue = e[i]), r.push(s)
                }
                return r
            }
        }

        var u = function (e, t) {
            s.debug("?????? messageOption: ", e);
            var o = [], r = t.context.root.lookup("easemob.pb.MessageBody.Content").decode(o),
                i = t.context.root.lookup("easemob.pb.KeyValue"), u = [];
            switch (e.type) {
                case"txt":
                    r.type = 0, r.text = e.msg;
                    break;
                case"img":
                    r.type = 1, r.displayName = e.body.filename, r.remotePath = e.body.url, r.secretKey = e.body.secret, r.fileLength = e.body.file_length, r.size = e.body.size, r.thumbnailDisplayName = e.body.filename;
                    break;
                case"video":
                    r.type = 2, r.displayName = e.body.filename, r.remotePath = e.body.url, r.secretKey = e.body.secret, r.fileLength = e.body.file_length, r.duration = e.body.length, r.thumbnailDisplayName = e.body.filename;
                    break;
                case"loc":
                    r.type = 3, r.latitude = e.lat, r.longitude = e.lng, r.address = e.addr, r.latitude = e.lat;
                    break;
                case"audio":
                    r.type = 4, r.displayName = e.body.filename, r.remotePath = e.body.url, r.secretKey = e.body.secret, r.fileLength = e.body.file_length, r.duration = e.body.length, r.thumbnailDisplayName = e.body.filename;
                    break;
                case"file":
                    r.type = 5, r.displayName = e.body.filename, r.remotePath = e.body.url, r.secretKey = e.body.secret, r.fileLength = e.body.file_length, r.size = e.body.size, r.thumbnailDisplayName = e.body.filename;
                    break;
                case"cmd":
                    r.type = 6, r.action = e.action;
                    break;
                case"custom":
                    r.type = 7, r.params = a.call(t, e.params), r.customEvent = e.customEvent, r.customExts = a.call(t, e.customExts)
            }
            if (e.ext) for (var l in e.ext) {
                var p = i.decode(o);
                p.key = l, "object" == (0, n.default)(e.ext[l]) ? (p.type = 8, p.stringValue = JSON.stringify(e.ext[l])) : "string" == typeof e.ext[l] ? (p.type = 7, p.stringValue = e.ext[l]) : "boolean" == typeof e.ext[l] ? (p.type = 1, p.varintValue = 1 == e.ext[l] ? 1 : 0) : Number.isInteger(e.ext[l]) ? (p.type = 2, p.varintValue = e.ext[l]) : (p.type = 6, p.doubleValue = e.ext[l]), u.push(p)
            }
            var c = t.context.root.lookup("easemob.pb.MessageBody"), h = c.decode(o);
            "recall" === e.type ? (h.type = 6, h.from = {name: t.context.jid.name}, h.to = {name: e.to}, h.ackMessageId = e.ackId) : "delivery" === e.type ? (h.type = 5, h.from = {name: t.context.jid.name}, h.to = {name: e.to}, h.ackMessageId = e.ackId) : "read" === e.type ? (h.type = 4, h.from = {name: t.context.jid.name}, h.to = {name: e.to}, h.ackMessageId = e.ackId, e.msgConfig && "groupchat" === e.group && !e.roomType && (h.msgConfig = e.msgConfig, h.ackContent = e.ackContent)) : e.group || e.roomType ? "groupchat" !== e.group || e.roomType ? "groupchat" === e.group && e.roomType && (h.type = 3, h.from = {name: t.context.jid.name}, h.to = {name: e.to}) : (h.type = 2, h.from = {name: t.context.jid.name}, h.to = {name: e.to}, e.msgConfig && (h.msgConfig = e.msgConfig)) : (h.type = 1, h.from = {name: t.context.jid.name}, h.to = {name: e.to}), h.contents = [r], h.ext = u, h = c.encode(h).finish();
            var d = t.context.root.lookup("easemob.pb.Meta").decode(o);
            if (d.id = e.id, "recall" === e.type) {
                d.from = t.context.jid;
                var f = "easemob.com";
                "groupchat" !== e.group && "chatroom" !== e.group || (f = "conference.easemob.com"), d.to = {
                    appKey: t.appKey,
                    name: e.to,
                    domain: f
                }
            } else if ("delivery" === e.type) d.from = t.context.jid, d.to = {
                appKey: t.appKey,
                name: e.to,
                domain: "easemob.com"
            }; else if ("read" === e.type) {
                d.from = t.context.jid;
                f = "easemob.com";
                "groupchat" === e.group && (f = "conference.easemob.com"), d.to = {
                    appKey: t.appKey,
                    name: e.to,
                    domain: f
                }
            } else e.group || e.roomType ? "groupchat" !== e.group || e.roomType ? "groupchat" === e.group && e.roomType && (d.from = {
                appKey: t.appKey,
                name: t.user,
                domain: "conference.easemob.com"
            }, d.to = {appKey: t.appKey, name: e.to, domain: "conference.easemob.com"}) : (d.from = {
                appKey: t.appKey,
                name: t.user,
                domain: "conference.easemob.com"
            }, d.to = {
                appKey: t.appKey,
                name: e.to,
                domain: "conference.easemob.com"
            }) : (d.from = t.context.jid, d.to = {appKey: t.appKey, name: e.to, domain: "easemob.com"});
            d.ns = 1, d.payload = h, s.debug("?????? thirdMessage: ", d);
            var y = t.context.root.lookup("easemob.pb.CommSyncUL"), m = y.decode(o);
            m.meta = d, m = y.encode(m).finish();
            var g = t.context.root.lookup("easemob.pb.MSync"), v = g.decode(o);
            v.version = t.version, v.encryptType = t.encryptType, v.command = 0, v.guid = t.context.jid, v.payload = m, s.debug("?????? MSync: ", v), v = g.encode(v).finish(), t.sendMSync(v)
        }, l = function (e, t, o) {
            i = o;
            var r = t || this;
            if (r.msg = e, !e.file) return u(r.msg, t);
            if (r.msg.body && r.msg.body.url) return u(r.msg, t);
            var n = r.msg.onFileUploadComplete;
            r.msg.onFileUploadComplete = function (e) {
                if (e.entities[0]["file-metadata"]) {
                    var o = e.entities[0]["file-metadata"]["content-length"];
                    r.msg.filetype = e.entities[0]["file-metadata"]["content-type"], o > 204800 && (r.msg.thumbnail = !0)
                }
                r.msg.body = {
                    type: r.msg.type || "file",
                    url: (t.isHttpDNS ? t.apiUrl + e.uri.substr(e.uri.indexOf("/", 9)) : e.uri) + "/" + e.entities[0].uuid,
                    secret: e.entities[0]["share-secret"],
                    filename: r.msg.file.filename || r.msg.filename,
                    size: {width: r.msg.width || 0, height: r.msg.height || 0},
                    length: r.msg.length || 0,
                    file_length: r.msg.ext.file_length || 0,
                    filetype: r.msg.filetype || r.msg.file.filetype
                }, u(r.msg, t), n instanceof Function && n(e, r.msg.id)
            }, i.uploadFile.call(t, r.msg)
        };
        t.default = l
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i = r(o(8)), n = (r(o(30)), r(o(7))), s = (r(o(29)), r(o(58))),
            a = r(o(14)).default.getLogger("IM-SDK-LOG"), u = (0, n.default)(),
            l = {0: "TEXT", 1: "IMAGE", 2: "VIDEO", 3: "LOCATION", 4: "VOICE", 5: "FILE", 6: "COMMAND", 7: "CUSTOM"},
            p = function (e) {
                if (e) {
                    for (var t = e, o = {}, r = 0; r < t.length; r++) if (8 == t[r].type) o[t[r].key] = JSON.parse(t[r].stringValue); else if (7 == t[r].type) o[t[r].key] = t[r].stringValue; else if (6 == t[r].type) o[t[r].key] = t[r].doubleValue; else if (5 == t[r].type) o[t[r].key] = t[r].floatValue; else if (1 == t[r].type) {
                        var n = t[r].varintValue, s = new i.default(n.low, n.high, n.unsigned).toString();
                        o[t[r].key] = 0 !== Number(s)
                    } else if (2 == t[r].type || 3 == t[r].type || 4 == t[r].type) {
                        n = t[r].varintValue, s = new i.default(n.low, n.high, n.unsigned).toString();
                        o[t[r].key] = Number(s)
                    }
                    return o
                }
            }, c = function (e, t, o, r) {
                var n = o, c = new i.default(e.timestamp.low, e.timestamp.high, e.timestamp.unsigned).toString(),
                    h = n.context.root.lookup("easemob.pb.MessageBody").decode(e.payload),
                    d = new i.default(e.id.low, e.id.high, e.id.unsigned).toString(),
                    f = h.ackMessageId ? new i.default(h.ackMessageId.low, h.ackMessageId.high, h.ackMessageId.unsigned).toString() : "",
                    y = null;
                if (a.debug("???thirdMessage???", h), 1 === h.type) y = "chat"; else if (2 === h.type) y = "groupchat"; else if (3 === h.type) y = "chatroom"; else {
                    if (4 === h.type) return y = "read_ack", h.msgConfig ? void o.onReadMessage({
                        mid: f,
                        groupReadCount: h.ext[0] && JSON.parse(h.ext[0].stringValue),
                        ackContent: h.ackContent
                    }) : void o.onReadMessage({mid: f});
                    if (5 === h.type) return y = "deliver_ack", void o.onDeliverdMessage({mid: f});
                    if (6 === h.type) return y = "recall", void o.onRecallMessage({mid: f})
                }
                for (var m = 0; m < h.contents.length; m++) {
                    var g = {}, v = t.errorCode > 0, _ = t.errorCode, E = t.reason, N = h.contents[m], O = h.from.name,
                        b = h.to.name, T = {};
                    h.ext && (T = p(h.ext));
                    try {
                        switch (N.type) {
                            case 0:
                                var I = h.contents[m].text;
                                if (!R) var R = {};
                                var C = s.default.parseTextMessage(I, R && R.Emoji);
                                C.isemoji ? (!(g = {
                                    id: d,
                                    type: y,
                                    contentsType: "EMOJI",
                                    from: O,
                                    to: b,
                                    data: C.body,
                                    ext: T,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).delay && delete g.delay, !g.msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && n.onEmojiMessage(g)) : (!(g = {
                                    id: d,
                                    type: y,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    data: N.text,
                                    ext: T,
                                    sourceMsg: N.text,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && o.onTextMessage(g));
                                break;
                            case 1:
                                if (N.size) var S = N.size.width || 0, w = N.size.height || 0;
                                var A = o.useOwnUploadFun ? N.remotePath : (N.remotePath && n.apiUrl + N.remotePath.substr(N.remotePath.indexOf("/", 9))) + "?em-redirect=true";
                                !(g = {
                                    id: d,
                                    type: y,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    url: A,
                                    secret: N.secretKey,
                                    filename: N.displayName,
                                    thumb: N.thumbnailRemotePath,
                                    thumb_secret: N.thumbnailSecretKey,
                                    file_length: N.fileLength || "",
                                    width: S,
                                    height: w,
                                    filetype: N.filetype || "",
                                    accessToken: o.token || "",
                                    ext: T,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).delay && delete g.delay, !g.msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && o.onPictureMessage(g);
                                break;
                            case 2:
                                A = o.useOwnUploadFun ? N.remotePath : (N.remotePath && n.apiUrl + N.remotePath.substr(N.remotePath.indexOf("/", 9))) + "?em-redirect=true";
                                !(g = {
                                    id: d,
                                    type: y,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    url: A,
                                    secret: N.secretKey,
                                    filename: N.displayName,
                                    length: N.duration || "",
                                    file_length: N.fileLength || "",
                                    filetype: N.filetype || "",
                                    accessToken: o.token || "",
                                    ext: T,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).delay && delete g.delay, !g.msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && o.onVideoMessage(g);
                                break;
                            case 3:
                                !(g = {
                                    id: d,
                                    type: y,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    addr: N.address,
                                    lat: N.latitude,
                                    lng: N.longitude,
                                    ext: T,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).delay && delete g.delay, !g.msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && o.onLocationMessage(g);
                                break;
                            case 4:
                                A = o.useOwnUploadFun ? N.remotePath : (N.remotePath && n.apiUrl + N.remotePath.substr(N.remotePath.indexOf("/", 9))) + "?em-redirect=true";
                                !(g = {
                                    id: d,
                                    type: y,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    url: A,
                                    secret: N.secretKey,
                                    filename: N.displayName,
                                    file_length: N.fileLength || "",
                                    accessToken: o.token || "",
                                    ext: T,
                                    length: N.duration,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).delay && delete g.delay, !g.msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && o.onAudioMessage(g);
                                break;
                            case 5:
                                A = o.useOwnUploadFun ? N.remotePath : (N.remotePath && n.apiUrl + N.remotePath.substr(N.remotePath.indexOf("/", 9))) + "?em-redirect=true";
                                !(g = {
                                    id: d,
                                    type: y,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    url: A,
                                    secret: N.secretKey,
                                    filename: N.displayName,
                                    file_length: N.fileLength,
                                    accessToken: o.token || "",
                                    ext: T,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).delay && delete g.delay, !g.msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && o.onFileMessage(g);
                                break;
                            case 6:
                                !(g = {
                                    id: d,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    action: N.action,
                                    ext: T,
                                    time: c,
                                    msgConfig: h.msgConfig
                                }).msgConfig && delete h.msgConfig, g.error = v, g.errorText = E, g.errorCode = _, !r && o.onCmdMessage(g);
                                break;
                            case 7:
                                var k = "", x = "";
                                h.contents[0].customExts && (k = p(h.contents[0].customExts)), h.contents[0].params && (x = p(h.contents[0].params)), g = {
                                    id: d,
                                    contentsType: l[N.type],
                                    from: O,
                                    to: b,
                                    customEvent: N.customEvent,
                                    params: x,
                                    customExts: k,
                                    ext: T,
                                    time: c
                                }, !r && o.onCustomMessage(g)
                        }
                    } catch (e) {
                        o.onError({type: u.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, message: "parsing message error", data: e})
                    }
                    if (r || o.delivery) return g.message_type = y, g
                }
            };
        t.default = c
    }, function (e, t, o) {
        "use strict";
        e.exports = p;
        var r, i, n, s, a, u = o(23);

        function l(e, t) {
            if (e && e.length) {
                for (var o = {}, r = 0; r < e.length; ++r) o[e[r].name] = e[r].toJSON(t);
                return o
            }
        }

        function p(e, t) {
            u.call(this, e, t), this.nested = void 0, this._nestedArray = null
        }

        function c(e) {
            return e._nestedArray = null, e
        }

        ((p.prototype = Object.create(u.prototype)).constructor = p).className = "Namespace", p.fromJSON = function (e, t) {
            return new p(e, t.options).addJSON(t.nested)
        }, p.arrayToJSON = l, p.isReservedId = function (e, t) {
            if (e) for (var o = 0; o < e.length; ++o) if ("string" != typeof e[o] && e[o][0] <= t && e[o][1] >= t) return !0;
            return !1
        }, p.isReservedName = function (e, t) {
            if (e) for (var o = 0; o < e.length; ++o) if (e[o] === t) return !0;
            return !1
        }, Object.defineProperty(p.prototype, "nestedArray", {
            get: function () {
                return this._nestedArray || (this._nestedArray = n.toArray(this.nested))
            }
        }), p.prototype.toJSON = function (e) {
            return n.toObject(["options", this.options, "nested", l(this.nestedArray, e)])
        }, p.prototype.addJSON = function (e) {
            if (e) for (var t, o = Object.keys(e), n = 0; n < o.length; ++n) t = e[o[n]], this.add((void 0 !== t.fields ? s.fromJSON : void 0 !== t.values ? r.fromJSON : void 0 !== t.methods ? a.fromJSON : void 0 !== t.id ? i.fromJSON : p.fromJSON)(o[n], t));
            return this
        }, p.prototype.get = function (e) {
            return this.nested && this.nested[e] || null
        }, p.prototype.getEnum = function (e) {
            if (this.nested && this.nested[e] instanceof r) return this.nested[e].values;
            throw Error("no such enum: " + e)
        }, p.prototype.add = function (e) {
            if (!(e instanceof i && void 0 !== e.extend || e instanceof s || e instanceof r || e instanceof a || e instanceof p)) throw TypeError("object must be a valid nested object");
            if (this.nested) {
                var t = this.get(e.name);
                if (t) {
                    if (!(t instanceof p && e instanceof p) || t instanceof s || t instanceof a) throw Error("duplicate name '" + e.name + "' in " + this);
                    for (var o = t.nestedArray, n = 0; n < o.length; ++n) e.add(o[n]);
                    this.remove(t), this.nested || (this.nested = {}), e.setOptions(t.options, !0)
                }
            } else this.nested = {};
            return this.nested[e.name] = e, e.onAdd(this), c(this)
        }, p.prototype.remove = function (e) {
            if (!(e instanceof u)) throw TypeError("object must be a ReflectionObject");
            if (e.parent !== this) throw Error(e + " is not a member of " + this);
            return delete this.nested[e.name], Object.keys(this.nested).length || (this.nested = void 0), e.onRemove(this), c(this)
        }, p.prototype.define = function (e, t) {
            if (n.isString(e)) e = e.split("."); else if (!Array.isArray(e)) throw TypeError("illegal path");
            if (e && e.length && "" === e[0]) throw Error("path must be relative");
            for (var o = this; e.length > 0;) {
                var r = e.shift();
                if (o.nested && o.nested[r]) {
                    if (!((o = o.nested[r]) instanceof p)) throw Error("path conflicts with non-namespace objects")
                } else o.add(o = new p(r))
            }
            return t && o.addJSON(t), o
        }, p.prototype.resolveAll = function () {
            for (var e = this.nestedArray, t = 0; t < e.length;) e[t] instanceof p ? e[t++].resolveAll() : e[t++].resolve();
            return this.resolve()
        }, p.prototype.lookup = function (e, t, o) {
            if ("boolean" == typeof t ? (o = t, t = void 0) : t && !Array.isArray(t) && (t = [t]), n.isString(e) && e.length) {
                if ("." === e) return this.root;
                e = e.split(".")
            } else if (!e.length) return this;
            if ("" === e[0]) return this.root.lookup(e.slice(1), t);
            var r = this.get(e[0]);
            if (r) {
                if (1 === e.length) {
                    if (!t || t.indexOf(r.constructor) > -1) return r
                } else if (r instanceof p && (r = r.lookup(e.slice(1), t, !0))) return r
            } else for (var i = 0; i < this.nestedArray.length; ++i) if (this._nestedArray[i] instanceof p && (r = this._nestedArray[i].lookup(e, t, !0))) return r;
            return null === this.parent || o ? null : this.parent.lookup(e, t)
        }, p.prototype.lookupType = function (e) {
            var t = this.lookup(e, [s]);
            if (!t) throw Error("no such type: " + e);
            return t
        }, p.prototype.lookupEnum = function (e) {
            var t = this.lookup(e, [r]);
            if (!t) throw Error("no such Enum '" + e + "' in " + this);
            return t
        }, p.prototype.lookupTypeOrEnum = function (e) {
            var t = this.lookup(e, [s, r]);
            if (!t) throw Error("no such Type or Enum '" + e + "' in " + this);
            return t
        }, p.prototype.lookupService = function (e) {
            var t = this.lookup(e, [a]);
            if (!t) throw Error("no such Service '" + e + "' in " + this);
            return t
        }, p._configure = function () {
            r = o(10), i = o(16), n = o(3), s = o(22), a = o(40)
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = s;
        var r, i, n = o(23);

        function s(e, t, o, r) {
            if (Array.isArray(t) || (o = t, t = void 0), n.call(this, e, o), void 0 !== t && !Array.isArray(t)) throw TypeError("fieldNames must be an Array");
            this.oneof = t || [], this.fieldsArray = [], this.comment = r
        }

        function a(e) {
            if (e.parent) for (var t = 0; t < e.fieldsArray.length; ++t) e.fieldsArray[t].parent || e.parent.add(e.fieldsArray[t])
        }

        ((s.prototype = Object.create(n.prototype)).constructor = s).className = "OneOf", s.fromJSON = function (e, t) {
            return new s(e, t.oneof, t.options, t.comment)
        }, s.prototype.toJSON = function (e) {
            var t = !!e && Boolean(e.keepComments);
            return i.toObject(["options", this.options, "oneof", this.oneof, "comment", t ? this.comment : void 0])
        }, s.prototype.add = function (e) {
            if (!(e instanceof r)) throw TypeError("field must be a Field");
            return e.parent && e.parent !== this.parent && e.parent.remove(e), this.oneof.push(e.name), this.fieldsArray.push(e), e.partOf = this, a(this), this
        }, s.prototype.remove = function (e) {
            if (!(e instanceof r)) throw TypeError("field must be a Field");
            var t = this.fieldsArray.indexOf(e);
            if (t < 0) throw Error(e + " is not a member of " + this);
            return this.fieldsArray.splice(t, 1), (t = this.oneof.indexOf(e.name)) > -1 && this.oneof.splice(t, 1), e.partOf = null, this
        }, s.prototype.onAdd = function (e) {
            n.prototype.onAdd.call(this, e);
            for (var t = 0; t < this.oneof.length; ++t) {
                var o = e.get(this.oneof[t]);
                o && !o.partOf && (o.partOf = this, this.fieldsArray.push(o))
            }
            a(this)
        }, s.prototype.onRemove = function (e) {
            for (var t, o = 0; o < this.fieldsArray.length; ++o) (t = this.fieldsArray[o]).parent && t.parent.remove(t);
            n.prototype.onRemove.call(this, e)
        }, s.d = function () {
            for (var e = new Array(arguments.length), t = 0; t < arguments.length;) e[t] = arguments[t++];
            return function (t, o) {
                i.decorateType(t.constructor).add(new s(o, e)), Object.defineProperty(t, o, {
                    get: i.oneOfGetter(e),
                    set: i.oneOfSetter(e)
                })
            }
        }, s._configure = function () {
            r = o(16), i = o(3)
        }
    }, , , function (e, t, o) {
        "use strict";

        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        !function () {
            var e = "object" === r(t) && null !== t && "number" != typeof t.nodeType ? t : "undefined" != typeof self ? self : $.global,
                o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            function i(e) {
                this.message = e
            }

            i.prototype = new Error, i.prototype.name = "InvalidCharacterError", e.btoa || (e.btoa = function (e) {
                for (var t, r, n = String(e), s = 0, a = o, u = ""; n.charAt(0 | s) || (a = "=", s % 1); u += a.charAt(63 & t >> 8 - s % 1 * 8)) {
                    if ((r = n.charCodeAt(s += 3 / 4)) > 255) throw new i("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    t = t << 8 | r
                }
                return u
            }), e.atob || (e.atob = function (e) {
                var t = String(e).replace(/[=]+$/, "");
                if (t.length % 4 == 1) throw new i("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var r, n, s = 0, a = 0, u = ""; n = t.charAt(a++); ~n && (r = s % 4 ? 64 * r + n : n, s++ % 4) ? u += String.fromCharCode(255 & r >> (-2 * s & 6)) : 0) n = o.indexOf(n);
                return u
            })
        }()
    }, , function (e, t, o) {
        "use strict";
        var r = e.exports;
        r.length = function (e) {
            for (var t = 0, o = 0, r = 0; r < e.length; ++r) (o = e.charCodeAt(r)) < 128 ? t += 1 : o < 2048 ? t += 2 : 55296 == (64512 & o) && 56320 == (64512 & e.charCodeAt(r + 1)) ? (++r, t += 4) : t += 3;
            return t
        }, r.read = function (e, t, o) {
            if (o - t < 1) return "";
            for (var r, i = null, n = [], s = 0; t < o;) (r = e[t++]) < 128 ? n[s++] = r : r > 191 && r < 224 ? n[s++] = (31 & r) << 6 | 63 & e[t++] : r > 239 && r < 365 ? (r = ((7 & r) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536, n[s++] = 55296 + (r >> 10), n[s++] = 56320 + (1023 & r)) : n[s++] = (15 & r) << 12 | (63 & e[t++]) << 6 | 63 & e[t++], s > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, n)), s = 0);
            return i ? (s && i.push(String.fromCharCode.apply(String, n.slice(0, s))), i.join("")) : String.fromCharCode.apply(String, n.slice(0, s))
        }, r.write = function (e, t, o) {
            for (var r, i, n = o, s = 0; s < e.length; ++s) (r = e.charCodeAt(s)) < 128 ? t[o++] = r : r < 2048 ? (t[o++] = r >> 6 | 192, t[o++] = 63 & r | 128) : 55296 == (64512 & r) && 56320 == (64512 & (i = e.charCodeAt(s + 1))) ? (r = 65536 + ((1023 & r) << 10) + (1023 & i), ++s, t[o++] = r >> 18 | 240, t[o++] = r >> 12 & 63 | 128, t[o++] = r >> 6 & 63 | 128, t[o++] = 63 & r | 128) : (t[o++] = r >> 12 | 224, t[o++] = r >> 6 & 63 | 128, t[o++] = 63 & r | 128);
            return o - n
        }
    }, function (e, t, o) {
        "use strict";
        var r = o(0)(o(5));
        e.exports = h;
        var i = o(32);
        ((h.prototype = Object.create(i.prototype)).constructor = h).className = "Root";
        var n, s, a, u = o(16), l = o(10), p = o(33), c = o(3);

        function h(e) {
            i.call(this, "", e), this.deferred = [], this.files = [], this.names = []
        }

        function d() {
        }

        h.fromJSON = function (e, t) {
            return e = "string" == typeof e ? JSON.parse(e) : e, t || (t = new h), e.options && t.setOptions(e.options), t.addJSON(e.nested)
        }, h.prototype.resolvePath = c.path.resolve, h.prototype.parseFromPbString = function e(t, o, i) {
            "function" == typeof o && (i = o, o = void 0);
            var n = this;
            if (!i) return c.asPromise(e, n, t, o);
            var u = null;
            if ("string" == typeof t) u = JSON.parse(t); else {
                if ("object" !== (0, r.default)(t)) return void console.log("pb??????????????????");
                u = t
            }

            function l(e, t) {
                if (i) {
                    var o = i;
                    i = null, o(e, t)
                }
            }

            function p(e, t) {
                try {
                    if (c.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), c.isString(t)) {
                        s.filename = e;
                        var r, i = s(t, n, o), a = 0;
                        if (i.imports) for (; a < i.imports.length; ++a) h(r = i.imports[a]);
                        if (i.weakImports) {
                            for (a = 0; a < i.weakImports.length; ++a) r = i.weakImports[a];
                            h(r)
                        }
                    } else n.setOptions(t.options).addJSON(t.nested)
                } catch (e) {
                    l(e)
                }
                l(null, n)
            }

            function h(e) {
                n.names.indexOf(e) > -1 || (n.names.push(e), e in a && p(e, a[e]))
            }

            p(u.name, u.pbJsonStr)
        }, h.prototype.load = function e(t, o, r) {
            "function" == typeof o && (r = o, o = void 0);
            var i = this;
            if (!r) return c.asPromise(e, i, t, o);
            var n = r === d;

            function u(e, t) {
                if (r) {
                    var o = r;
                    if (r = null, n) throw e;
                    o(e, t)
                }
            }

            function l(e, t) {
                try {
                    if (c.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), c.isString(t)) {
                        s.filename = e;
                        var r, a = s(t, i, o), l = 0;
                        if (a.imports) for (; l < a.imports.length; ++l) (r = i.resolvePath(e, a.imports[l])) && p(r);
                        if (a.weakImports) for (l = 0; l < a.weakImports.length; ++l) (r = i.resolvePath(e, a.weakImports[l])) && p(r, !0)
                    } else i.setOptions(t.options).addJSON(t.nested)
                } catch (e) {
                    u(e)
                }
                n || h || u(null, i)
            }

            function p(e, t) {
                var o = e.lastIndexOf("google/protobuf/");
                if (o > -1) {
                    var s = e.substring(o);
                    s in a && (e = s)
                }
                if (!(i.files.indexOf(e) > -1)) if (i.files.push(e), e in a) n ? l(e, a[e]) : (++h, setTimeout((function () {
                    --h, l(e, a[e])
                }))); else if (n) {
                    var p;
                    try {
                        p = c.fs.readFileSync(e).toString("utf8")
                    } catch (e) {
                        return void (t || u(e))
                    }
                    l(e, p)
                } else ++h, c.fetch(e, (function (o, n) {
                    --h, r && (o ? t ? h || u(null, i) : u(o) : l(e, n))
                }))
            }

            var h = 0;
            c.isString(t) && (t = [t]);
            for (var f, y = 0; y < t.length; ++y) (f = i.resolvePath("", t[y])) && p(f);
            if (n) return i;
            h || u(null, i)
        }, h.prototype.loadSync = function (e, t) {
            if (!c.isNode) throw Error("not supported");
            return this.load(e, t, d)
        }, h.prototype.resolveAll = function () {
            if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map((function (e) {
                return "'extend " + e.extend + "' in " + e.parent.fullName
            })).join(", "));
            return i.prototype.resolveAll.call(this)
        };
        var f = /^[A-Z]/;

        function y(e, t) {
            var o = t.parent.lookup(t.extend);
            if (o) {
                var r = new u(t.fullName, t.id, t.type, t.rule, void 0, t.options);
                return r.declaringField = t, t.extensionField = r, o.add(r), !0
            }
            return !1
        }

        h.prototype._handleAdd = function (e) {
            if (e instanceof u) void 0 === e.extend || e.extensionField || y(0, e) || this.deferred.push(e); else if (e instanceof l) f.test(e.name) && (e.parent[e.name] = e.values); else if (!(e instanceof p)) {
                if (e instanceof n) for (var t = 0; t < this.deferred.length;) y(0, this.deferred[t]) ? this.deferred.splice(t, 1) : ++t;
                for (var o = 0; o < e.nestedArray.length; ++o) this._handleAdd(e._nestedArray[o]);
                f.test(e.name) && (e.parent[e.name] = e)
            }
        }, h.prototype._handleRemove = function (e) {
            if (e instanceof u) {
                if (void 0 !== e.extend) if (e.extensionField) e.extensionField.parent.remove(e.extensionField), e.extensionField = null; else {
                    var t = this.deferred.indexOf(e);
                    t > -1 && this.deferred.splice(t, 1)
                }
            } else if (e instanceof l) f.test(e.name) && delete e.parent[e.name]; else if (e instanceof i) {
                for (var o = 0; o < e.nestedArray.length; ++o) this._handleRemove(e._nestedArray[o]);
                f.test(e.name) && delete e.parent[e.name]
            }
        }, h._configure = function () {
            n = o(22), s = o(96), a = o(99), u = o(16), l = o(10), p = o(33), c = o(3)
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = a;
        var r, i, n, s = o(32);

        function a(e, t) {
            s.call(this, e, t), this.methods = {}, this._methodsArray = null
        }

        function u(e) {
            return e._methodsArray = null, e
        }

        ((a.prototype = Object.create(s.prototype)).constructor = a).className = "Service", a.fromJSON = function (e, t) {
            var o = new a(e, t.options);
            if (t.methods) for (var i = Object.keys(t.methods), n = 0; n < i.length; ++n) o.add(r.fromJSON(i[n], t.methods[i[n]]));
            return t.nested && o.addJSON(t.nested), o.comment = t.comment, o
        }, a.prototype.toJSON = function (e) {
            var t = s.prototype.toJSON.call(this, e), o = !!e && Boolean(e.keepComments);
            return i.toObject(["options", t && t.options || void 0, "methods", s.arrayToJSON(this.methodsArray, e) || {}, "nested", t && t.nested || void 0, "comment", o ? this.comment : void 0])
        }, Object.defineProperty(a.prototype, "methodsArray", {
            get: function () {
                return this._methodsArray || (this._methodsArray = i.toArray(this.methods))
            }
        }), a.prototype.get = function (e) {
            return this.methods[e] || s.prototype.get.call(this, e)
        }, a.prototype.resolveAll = function () {
            for (var e = this.methodsArray, t = 0; t < e.length; ++t) e[t].resolve();
            return s.prototype.resolve.call(this)
        }, a.prototype.add = function (e) {
            if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this);
            return e instanceof r ? (this.methods[e.name] = e, e.parent = this, u(this)) : s.prototype.add.call(this, e)
        }, a.prototype.remove = function (e) {
            if (e instanceof r) {
                if (this.methods[e.name] !== e) throw Error(e + " is not a member of " + this);
                return delete this.methods[e.name], e.parent = null, u(this)
            }
            return s.prototype.remove.call(this, e)
        }, a.prototype.create = function (e, t, o) {
            for (var r, s = new n.Service(e, t, o), a = 0; a < this.methodsArray.length; ++a) {
                var u = i.lcFirst((r = this._methodsArray[a]).resolve().name).replace(/[^$\w_]/g, "");
                s[u] = i.codegen(["r", "c"], i.isReserved(u) ? u + "_" : u)("return this.rpcCall(m,q,s,r,c)")({
                    m: r,
                    q: r.resolvedRequestType.ctor,
                    s: r.resolvedResponseType.ctor
                })
            }
            return s
        }, a._configure = function () {
            r = o(67), i = o(3), n = o(98)
        }
    }, , , , , , , , , , , , , function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i, n, s = r(o(7)), a = r(o(29)), u = r(o(54)), l = r(o(30)), p = r(o(31)), c = r(o(59)), h = r(o(60)),
            d = r(o(61)), f = r(o(8)), y = r(o(62)), m = r(o(14)).default.getLogger("IM-SDK-LOG"), g = {},
            v = (0, s.default)(), _ = [], E = 1, N = function () {
            }, O = function e(t) {
                if (!this instanceof e) return new e(t);
                t = t || {};
                this.isDebug = t.isDebug || !1, this.isHttpDNS = t.isHttpDNS || !1, this.isMultiLoginSessions = t.isMultiLoginSessions || !1, this.wait = t.wait || 30, this.retry = t.retry || !1, this.https = t.https && window && "https:" === location.protocol, this.url = t.url, this.hold = t.hold || 1, this.route = t.route || null, this.inactivity = t.inactivity || 30, this.heartBeatWait = t.heartBeatWait || 3e4, this.maxRetries = t.maxRetries || 5, this.isAutoLogin = !1 !== t.isAutoLogin, this.pollingTime = t.pollingTime || 800, this.stropheConn = !1, this.autoReconnectNumMax = t.autoReconnectNumMax || 0, this.autoReconnectNumTotal = 0, this.autoReconnectInterval = t.autoReconnectInterval || 0, this.context = {status: v.STATUS_INIT}, this.sendQueue = new u.default, this.intervalId = null, this.apiUrl = t.apiUrl || "", this.encrypt = t.encrypt || {encrypt: {type: "none"}}, this.delivery = t.delivery || !1, this.appKey = t.appKey || "", this.domain = t.domain || "easemob.com", this.clientResource = "84ff3eba1", this.user = "", this.orgName = "", this.appName = "", this.token = "", this.unSendMsgArr = [], this.dnsArr = ["https://rs.easemob.com", "http://182.92.174.78", "http://112.126.66.111"], this.dnsIndex = 0, this.dnsTotal = this.dnsArr.length, this.restHosts = [], this.restIndex = 0, this.restTotal = 0, this.socketHost = [], this.hostIndex = 0, this.hostTotal = 0, this.groupOption = {}, this.version = t.version || "3.0.0", this.compressAlgorimth = t.compressAlgorimth || 0, this.userAgent = t.userAgent || 0, this.pov = t.pov || 0, this.command = t.command || 3, this.deviceId = t.deviceId || "webim", this.encryptKey = t.encryptKey || "", this.firstPayload = t.firstPayload || [], this.compressType = t.compressType || [0], this.encryptType = t.encryptType || [0], this.osType = 16, this.useOwnUploadFun = t.useOwnUploadFun || !1
            };
        O.prototype.registerUser = function (e) {
            this.isHttpDNS ? (this.dnsIndex = 0, this.getHttpDNS(e, "signup")) : this.signup(e)
        }, O.prototype.listen = function (e) {
            this.onOpened = e.onOpened || N, this.onClosed = e.onClosed || N, this.onTextMessage = e.onTextMessage || N, this.onEmojiMessage = e.onEmojiMessage || N, this.onPictureMessage = e.onPictureMessage || N, this.onAudioMessage = e.onAudioMessage || N, this.onVideoMessage = e.onVideoMessage || N, this.onFileMessage = e.onFileMessage || N, this.onLocationMessage = e.onLocationMessage || N, this.onCustomMessage = e.onCustomMessage || N, this.onCmdMessage = e.onCmdMessage || N, this.onStatisticMessage = e.onStatisticMessage || N, this.onPresence = e.onPresence || N, this.onRoster = e.onRoster || N, this.onError = e.onError || N, this.onReceivedMessage = e.onReceivedMessage || N, this.onInviteMessage = e.onInviteMessage || N, this.onDeliverdMessage = e.onDeliveredMessage || N, this.onReadMessage = e.onReadMessage || N, this.onRecallMessage = e.onRecallMessage || N, this.onMutedMessage = e.onMutedMessage || N, this.onOffline = e.onOffline || N, this.onOnline = e.onOnline || N, this.onConfirmPop = e.onConfirmPop || N, this.onCreateGroup = e.onCreateGroup || N, this.onContactAgreed = e.onContactAgreed || N, this.onContactRefuse = e.onContactRefuse || N, this.onContactInvited = e.onContactInvited || N, this.onContactDeleted = e.onContactDeleted || N, this.onContactAdded = e.onContactAdded || N, this.onUpdateMyGroupList = e.onUpdateMyGroupList || N, this.onUpdateMyRoster = e.onUpdateMyRoster || N, this.onBlacklistUpdate = e.onBlacklistUpdate || N, n._listenNetwork(this.onOnline, this.onOffline)
        }, O.prototype.getParams = function (e) {
            i = e.root, n = e.utils, O.prototype._utils = n, g.utils = n, g.statusCode = v, g.message = a.default, g.message.prototype._utils = n
        }, O.prototype._msgHash = {}, O.prototype._queues = [], O.prototype._lastsession = function (e, t, o) {
            var r = [], n = i.lookup("easemob.pb.CommSyncUL"), s = n.decode(r);
            s.queue = t, s.key = new f.default(e.low, e.high, e.unsigned).toString(), s = n.encode(s).finish(), m.debug("??????_lastsession: ", s);
            var a = i.lookup("easemob.pb.MSync"), u = a.decode(r);
            if (u.version = o.version, u.encryptType = o.encryptType, u.command = 0, u.payload = s, u = a.encode(u).finish(), o.sock.readyState !== E) {
                var l = {type: v.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected"};
                o.onError(l)
            } else o._base64transform(u, o)
        };
        O.prototype._metapayload = function (e, t, o) {
            for (var r = 0; r < e.length; r++) {
                var i = new f.default(e[r].id.low, e[r].id.high, e[r].id.unsigned).toString();
                _.indexOf(i) < 0 && (m.debug("??????meta???", e[r]), 1 === e[r].ns ? (0, p.default)(e[r], t, o) : 2 === e[r].ns ? (0, c.default)(e[r], t, o) : 3 === e[r].ns ? h.default.handleMessage(e[r], t, o) : 0 === e[r].ns ? (0, d.default)(e[r], t, o) : 4 === e[r].ns && o.registerConfrIQHandler && o.registerConfrIQHandler(e[r], t, o), _.length <= 100 || _.shift(), _.push(i))
            }
        }, O.prototype._rebuild = function () {
            var e = [], t = i.lookup("easemob.pb.StatisticsBody"), o = t.decode(e);
            o.operation = 0, o = t.encode(o).finish();
            var r = i.lookup("easemob.pb.Meta").decode(e);
            r.id = (new Date).valueOf(), r.ns = 0, r.payload = o;
            var n = i.lookup("easemob.pb.CommSyncUL"), s = n.decode(e);
            s.meta = r, m.debug("?????? rebuild: ", r), s = n.encode(s).finish();
            var a = i.lookup("easemob.pb.MSync"), u = a.decode(e);
            u.version = "3.0.8", u.encryptType = [0], u.command = 0, u.payload = s, u = a.encode(u).finish(), this._base64transform(u, this)
        }, O.prototype._backqueue = function (e, t) {
            var o = [], r = i.lookup("easemob.pb.CommSyncUL"), n = r.decode(o);
            n.queue = e, m.debug("??????queue: ", n), n = r.encode(n).finish();
            var s = i.lookup("easemob.pb.MSync"), a = s.decode(o);
            a.version = t.version, a.encryptType = t.encryptType, a.command = 0, a.payload = n, a = s.encode(a).finish(), t._base64transform(a, t)
        };
        var b = function (e) {
            var t = i.lookup("easemob.pb.MSync"), o = t.decode([]);
            o.version = e.version, o.encryptType = e.encryptType, o.command = 1, m.debug("??????unreadDeal: ", o), o = t.encode(o).finish(), e._base64transform(o, e)
        };
        O.prototype._receiveProvision = function (e, t) {
            var o = i.lookup("easemob.pb.Provision").decode(e.payload);
            t.context.jid.clientResource = o.resource, t.clientResource = o.resource, 0 == o.status.errorCode ? (t.onOpened(), t.heartBeat(t), b(t), t._rebuild(t)) : t.isDebug && console.log("??????provision??????: ", o)
        }, O.prototype.heartBeatID = 0, O.prototype.heartBeat = function (e) {
            this.stopHeartBeat(), this.heartBeatID = setInterval((function () {
                b(e)
            }), this.heartBeatWait)
        }, O.prototype.stopHeartBeat = function () {
            clearInterval(this.heartBeatID)
        }, O.prototype.getRestFromHttpDNS = function (e, t) {
            if (!(this.restIndex > this.restTotal)) {
                var o = "", r = this.restHosts[this.restIndex], i = r.domain, n = r.ip;
                if (n && "http:" == location.protocol) {
                    var s = r.port;
                    o = ("https:" === location.protocol ? "https:" : "http:") + "//" + n + ":" + s
                } else o = ("https:" === location.protocol ? "https:" : "http:") + "//" + i;
                "" != o && (this.apiUrl = o, e.apiUrl = o), "login" == t ? this.login(e) : this.signup(e)
            }
        }, O.prototype.getHttpDNS = function (e, t) {
            var o = this, r = {
                url: this.dnsArr[this.dnsIndex] + "/easemob/server.json",
                dataType: "json",
                type: "GET",
                data: {app_key: encodeURIComponent(e.appKey || this.appKey)},
                success: function (r, i) {
                    var n = r.rest.hosts;
                    if (n) {
                        for (var s = o.https ? "https" : "http", a = n.filter((function (e, t) {
                            if (e.protocol == s) return e
                        })), u = 0; u < a.length; u++) if (a[u].protocol === s) {
                            var l = a[u];
                            a.splice(u, 1), a.unshift(l)
                        }
                        o.restHosts = a, o.restTotal = a.length;
                        try {
                            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
                        } catch (e) {
                            (function (e) {
                                for (var t = [], o = 0, r = e.length; o < r; o++) t.push(e[o]);
                                return t
                            })
                        }
                        var p = r["msync-ws"].hosts;
                        if (p) {
                            var c = p.filter((function (e, t) {
                                if (e.protocol == s) return e
                            }));
                            for (u = 0; u < c.length; u++) if (c[u].protocol === s) {
                                l = c[u];
                                c.splice(u, 1), c.unshift(l)
                            }
                            o.socketHost = c, o.hostTotal = c.length, o.getRestFromHttpDNS(e, t)
                        }
                    }
                } || N,
                error: function (r, i, n) {
                    console.log("getHttpDNS error", r, n), o.dnsIndex++, o.dnsIndex < o.dnsTotal && o.getHttpDNS(e, t)
                } || N
            };
            n.ajax(r)
        }, O.prototype.signup = function (e) {
            m.debug("signup");
            var t = this, o = e.orgName || "", r = e.appName || "", i = e.appKey || this.appKey, s = e.success || N,
                a = e.error || N;
            if (!o && !r && i) {
                var u = i.split("#");
                2 === u.length && (o = u[0], r = u[1])
            }
            if (o || r) {
                e.https || this.https;
                var l = (e.apiUrl || this.apiUrl) + "/" + o + "/" + r + "/users",
                    p = {username: e.username, password: e.password, nickname: e.nickname || ""}, c = {
                        url: l, dataType: "json", data: n.stringify(p), success: s, error: function (o, r, i) {
                            if (t.isHttpDNS && t.restIndex + 1 < t.restTotal) return t.restIndex++, void t.getRestFromHttpDNS(e, "signup");
                            t.clear(), a(o)
                        }
                    };
                n.ajax(c)
            } else a({type: v.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR})
        }, O.prototype.open = function (e) {
            var t = e.appKey, o = t.split("#")[0], r = t.split("#")[1];
            this.orgName = o, this.appName = r, e.accessToken && (this.token = e.accessToken), this.isHttpDNS ? (this.dnsIndex = 0, this.getHttpDNS(e, "login")) : this.login(e)
        }, O.prototype.login = function (e) {
            if (this.user = e.user, function (e, t) {
                if ("" == (e = e || {}).user) return t.onError({
                    type: v.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR,
                    message: "the user cannot be empty"
                }), !1;
                var o = e.user + "" || "", r = e.appKey || "", n = r.split("#");
                if (2 !== n.length) return t.onError({
                    type: v.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR,
                    message: "the appKey is illegal"
                }), !1;
                var s = n[0], a = n[1];
                return s && a ? (t.context.jid = {
                    appKey: r,
                    name: o,
                    domain: t.domain,
                    clientResource: t.clientResource
                }, t.context.root = i, t.context.userId = o, t.context.appKey = r, t.context.appName = a, t.context.orgName = s, !0) : (t.onError({
                    type: v.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR,
                    message: "the appKey is illegal"
                }), !1)
            }(e, this)) {
                var t = this;
                if (!t.isOpened()) if (e.accessToken) e.access_token = e.accessToken, this._login(e, t); else {
                    var o = e.apiUrl, r = this.context.userId, s = e.pwd || "", a = this.context.appName,
                        u = this.context.orgName,
                        l = {grant_type: "password", username: r, password: s, timestamp: +new Date}, p = {
                            headers: {"Content-type": "application/json"},
                            url: o + "/" + u + "/" + a + "/token",
                            dataType: "json",
                            data: n.stringify(l),
                            success: function (o, r) {
                                e.success && e.success(o), t.token = o.access_token, t.context.restTokenData = o.access_token, t._login(o, t)
                            } || N,
                            error: function (o, r, i) {
                                if (e.error && e.error(), t.isHttpDNS && t.restIndex + 1 < t.restTotal) return t.restIndex++, void t.getRestFromHttpDNS(e, "login");
                                t.clear(), o.error && o.error_description ? t.onError({
                                    type: v.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
                                    message: "login failed",
                                    data: o,
                                    xhr: r
                                }) : t.onError({
                                    type: v.WEBIM_CONNCTION_OPEN_ERROR,
                                    message: "login failed",
                                    data: o,
                                    xhr: r
                                })
                            } || N
                        };
                    n.ajax(p)
                }
            }
        }, O.prototype.close = function (e) {
            this.logOut = !0, this.context.status = v.STATUS_CLOSING, this.sock.close(), this.stopHeartBeat(), this.context.status = v.STATUS_CLOSING
        }, O.prototype.recallMessage = function (e) {
            var t = {
                id: this.getUniqueId(),
                type: "recall",
                group: e.type,
                ackId: e.mid,
                to: e.to,
                success: e.success,
                fail: e.fail
            };
            this.send(t, this)
        }, O.prototype.sendMSync = function (e) {
            if (this.sock.readyState === E) return this._base64transform(e, this);
            this.unSendMsgArr.push(this._base64transform(e, this, !0)), !this.logOut && this.autoReconnectNumTotal < this.autoReconnectNumMax && (this.autoReconnectNumTotal <= this.socketHost.length && this.isHttpDNS || !this.isHttpDNS) && (this.offLineSendConnecting = !0, this.reconnect()), this.onError({
                type: v.WEBIM_CONNCTION_DISCONNECTED,
                message: "websocket has been disconnected",
                reconnect: !0
            })
        }, O.prototype.getUniqueId = function (e) {
            this.autoIncrement ? this.autoIncrement++ : this.autoIncrement = 1;
            var t = new Date, o = new Date(2010, 1, 1);
            return t.getTime() - o.getTime() + this.autoIncrement
        }, O.prototype.send = function (e) {
            (0, l.default)(e, this, n), this._msgHash[e.id] = e
        }, O.prototype.removeRoster = function (e) {
            h.default.operatRoster(e, "remove", this)
        }, O.prototype.subscribe = function (e) {
            h.default.operatRoster(e, "add", this)
        }, O.prototype.subscribed = function (e) {
            h.default.operatRoster(e, "accept", this)
        }, O.prototype.unsubscribed = function (e) {
            h.default.operatRoster(e, "decline", this)
        }, O.prototype.addContact = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", o = {to: e, message: t};
            h.default.operatRoster(o, "add", this)
        }, O.prototype.deleteContact = function (e) {
            var t = {to: e};
            h.default.operatRoster(t, "remove", this)
        }, O.prototype.acceptInvitation = function (e) {
            var t = {to: e};
            h.default.operatRoster(t, "accept", this)
        }, O.prototype.declineInvitation = function (e) {
            var t = {to: e};
            h.default.operatRoster(t, "decline", this)
        }, O.prototype.isOpened = function () {
            return this.sock && this.sock.readyState === E
        }, O.prototype.clear = function () {
            var e = this.context.appKey;
            if (this.errorType != v.WEBIM_CONNCTION_DISCONNECTED && this.logOut && (this.unSendMsgArr = [], this.offLineSendConnecting = !1, this.context = {
                status: v.STATUS_INIT,
                appKey: e
            }), this.intervalId && clearInterval(this.intervalId), this.restIndex = 0, this.hostIndex = 0, this.errorType == v.WEBIM_CONNCTION_CLIENT_LOGOUT || -1 == this.errorType) {
                var t = {
                    type: v.WEBIM_CONNCTION_CLIENT_LOGOUT,
                    message: "when login or sinup error",
                    data: {data: "logout"}
                };
                this.onError(t)
            }
        }, O.prototype.autoReconnectInterval = 0, O.prototype.times = 1, O.prototype.reconnect = function (e) {
            m.debug("reconnect: time", this.hostIndex);
            var t = this;
            t.hostIndex < t.socketHost.length - 1 && t.hostIndex++, setTimeout((function () {
                t._login({access_token: t.context.accessToken}, t), t.autoReconnectInterval += t.times * t.times, t.times++
            }), 1e3 * (0 == this.autoReconnectNumTotal ? 0 : t.autoReconnectInterval)), this.autoReconnectNumTotal++
        }, O.prototype.closed = function () {
            var e = {data: {data: "Closed error"}, type: v.WEBIM_CONNECTION_CLOSED, message: "closed error"};
            this.onError(e), this.stopHeartBeat()
        }, O.prototype.addToBlackList = function (e) {
            h.default.operatRoster({to: e.name}, "ban", this)
        }, O.prototype.removeFromBlackList = function (e) {
            h.default.operatRoster({to: e.name}, "allow", this)
        }, Object.assign(O.prototype, y.default), g.connection = O, g.doQuery = function (e, t, o) {
            void 0 !== window.cefQuery && window.cefQuery({request: e, persistent: !1, onSuccess: t, onFailure: o})
        }, g.debug = function (e) {
        };
        var T = g;
        t.default = T
    }, function (e, t, o) {
        "use strict";

        function r(e) {
            this.array = void 0 === e ? [] : new Array(e)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0, r.prototype = {
            length: function () {
                return this.array.length
            }, at: function (e) {
                return this.array[e]
            }, set: function (e, t) {
                this.array[e] = t
            }, push: function (e) {
                return this.array.push(e)
            }, slice: function (e, t) {
                return this.array = this.array.slice(e, t)
            }, concat: function (e) {
                this.array = this.array.concat(e)
            }, remove: function (e, t) {
                t = void 0 === t ? 1 : t, this.array.splice(e, t)
            }, join: function (e) {
                return this.array.join(e)
            }, clear: function () {
                this.array.length = 0
            }
        };
        var i = function () {
            this._array_h = new r
        };
        i.prototype = {
            _index: 0, push: function (e) {
                this._array_h.push(e)
            }, pop: function () {
                var e = null;
                return this._array_h.length() && (e = this._array_h.at(this._index), 2 * ++this._index >= this._array_h.length() && (this._array_h.slice(this._index), this._index = 0)), e
            }, head: function () {
                var e = null, t = this._array_h.length();
                return t && (e = this._array_h.at(t - 1)), e
            }, tail: function () {
                var e = null;
                return this._array_h.length() && (e = this._array_h.at(this._index)), e
            }, length: function () {
                return this._array_h.length() - this._index
            }, empty: function () {
                return 0 === this._array_h.length()
            }, clear: function () {
                this._array_h.clear()
            }
        };
        var n = i;
        t.default = n
    }, function (e, t, o) {
        "use strict";
        e.exports = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
    }, function (e, t, o) {
        "use strict";

        function r(e, t) {
            for (var o = 0; o < t.length; o++) {
                var r = t[o];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        e.exports = function (e, t, o) {
            return t && r(e.prototype, t), o && r(e, o), e
        }
    }, function (e, t, o) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.traceForIE = function () {
            console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments]));
            console.trace && console.trace()
        }, t.isIE = void 0;
        var r = "undefined" != typeof window && void 0 !== window.navigator && /Trident\/|MSIE /.test(window.navigator.userAgent);
        t.isIE = r
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i, n, s, a, u = r(o(5));
        Object.keys || (Object.keys = (i = Object.prototype.hasOwnProperty, n = !{toString: null}.propertyIsEnumerable("toString"), a = (s = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function (e) {
            if ("object" !== (0, u.default)(e) && ("function" != typeof e || null === e)) throw new TypeError("Object.keys called on non-object");
            var t, o, r = [];
            for (t in e) i.call(e, t) && r.push(t);
            if (n) for (o = 0; o < a; o++) i.call(e, s[o]) && r.push(s[o]);
            return r
        }));
        var l = {
            emptyfn: function () {
            }, stringify: function (e) {
                if ("undefined" != typeof JSON && JSON.stringify) return JSON.stringify(e);
                var t = "", o = [];
                return function e(r) {
                    var i = !1;
                    for (var n in "[object Array]" === Object.prototype.toString.call(r) ? (o.push("]", "["), i = !0) : "[object Object]" === Object.prototype.toString.call(r) && o.push("}", "{"), r) "[object Null]" === Object.prototype.toString.call(r[n]) ? r[n] = "null" : "[object Undefined]" === Object.prototype.toString.call(r[n]) && (r[n] = "undefined"), r[n] && "object" === (0, u.default)(r[n]) ? t += "," + (i ? "" : '"' + n + '":' + (i ? '"' : "")) + e(r[n]) : t += ',"' + (i ? "" : n + '":"') + r[n] + '"';
                    return "" != t && (t = t.slice(1)), o.pop() + t + o.pop()
                }(e)
            }, getFileSize: function (e) {
                var t = this.getFileLength(e);
                if (t > 1e7) return !1;
                var o = Math.round(t / 1e3);
                if (o < 1e3) t = o + " KB"; else if (o >= 1e3) {
                    var r = o / 1e3;
                    if (r < 1e3) t = r.toFixed(1) + " MB"; else t = (r / 1e3).toFixed(1) + " GB"
                }
                return t
            }, trim: function (e) {
                return (e = "string" == typeof e ? e : "").trim ? e.trim() : e.replace(/^\s|\s$/g, "")
            }, parseTextMessage: function (e, t) {
                if ("string" == typeof e) {
                    if ("[object Object]" !== Object.prototype.toString.call(t)) return {
                        isemoji: !1,
                        body: [{type: "txt", data: e}]
                    };
                    var o = e, r = [], i = o.match(/\[[^[\]]{2,3}\]/gm);
                    if (!i || i.length < 1) return {isemoji: !1, body: [{type: "txt", data: e}]};
                    for (var n = !1, s = 0; s < i.length; s++) {
                        var a = o.substring(0, o.indexOf(i[s])), u = WebIM.Emoji.map[i[s]];
                        if (a && r.push({type: "txt", data: a}), u) {
                            var l = WebIM.Emoji.map ? WebIM.Emoji.path + u : null;
                            l ? (n = !0, r.push({type: "emoji", data: l})) : r.push({type: "txt", data: i[s]});
                            var p = o.indexOf(i[s]) + i[s].length;
                            o = o.substring(p)
                        } else r.push({type: "txt", data: i[s]})
                    }
                    return o && r.push({type: "txt", data: o}), n ? {isemoji: n, body: r} : {
                        isemoji: !1,
                        body: [{type: "txt", data: e}]
                    }
                }
            }, ts: function () {
                var e = new Date, t = e.getHours(), o = e.getMinutes(), r = e.getSeconds();
                return (t < 10 ? "0" + t : t) + ":" + (o < 10 ? "0" + o : o) + ":" + (r < 10 ? "0" + r : r) + ":" + e.getMilliseconds() + " "
            }, getObjectKey: function (e, t) {
                for (var o in e) if (e[o] == t) return o;
                return ""
            }, sprintf: function () {
                var e, t, o = arguments, r = o[0] || "";
                for (e = 1, t = o.length; e < t; e++) r = r.replace(/%s/, o[e]);
                return r
            }, reverse: function (e) {
                var t = [];
                if (Array.prototype.reverse) t = e.reverse(); else for (var o = 0; o < e.length; o++) t.unshift(e[o]);
                return t
            }, checkArray: function (e, t) {
                var o = "off";
                if (e.forEach((function (e, r) {
                    if (e.name === t.name) return o = "on", r
                })), "off" == o) return !1
            }
        }, p = l;
        t.default = p
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i = r(o(8)), n = function (e, t, o) {
            var r = o.context.root.lookup("easemob.pb.MUCBody").decode(e.payload);
            new i.default(e.id.low, e.id.high, e.id.unsigned).toString();
            !function (e) {
                var t = {
                    type: "",
                    owner: r.from.name,
                    gid: r.mucId.name,
                    from: r.from.name,
                    fromJid: r.from,
                    to: r.to.length ? r.to[0].name : "",
                    toJid: r.to,
                    chatroom: r.isChatroom,
                    status: r.status
                };
                ({
                    32: function () {
                        t.type = r.isChatroom ? "rmChatRoomMute" : "rmGroupMute", o.onPresence(t)
                    }, 31: function () {
                        t.type = r.isChatroom ? "muteChatRoom" : "muteGroup", o.onPresence(t)
                    }, 30: function () {
                        t.type = r.isChatroom ? "rmUserFromChatRoomWhiteList" : "rmUserFromGroupWhiteList", o.onPresence(t)
                    }, 29: function () {
                        t.type = r.isChatroom ? "addUserToChatRoomWhiteList" : "addUserToGroupWhiteList", o.onPresence(t)
                    }, 28: function () {
                        t.type = "deleteFile", o.onPresence(t)
                    }, 27: function () {
                        t.type = "uploadFile", o.onPresence(t)
                    }, 26: function () {
                        t.type = "deleteAnnouncement", o.onPresence(t)
                    }, 25: function () {
                        t.type = "updateAnnouncement", o.onPresence(t)
                    }, 24: function () {
                        t.type = "removeMute", o.onPresence(t)
                    }, 23: function () {
                        t.type = "addMute", o.onPresence(t)
                    }, 22: function () {
                        t.type = "removeAdmin", o.onPresence(t)
                    }, 21: function () {
                        t.type = "addAdmin", o.onPresence(t)
                    }, 20: function () {
                        t.type = "changeOwner", o.onPresence(t)
                    }, 19: function () {
                        t.type = "direct_joined", o.onPresence(t)
                    }, 18: function () {
                        t.type = r.isChatroom ? "leaveChatRoom" : "leaveGroup", o.onPresence(t)
                    }, 17: function () {
                        t.type = r.isChatroom ? "memberJoinChatRoomSuccess" : "memberJoinPublicGroupSuccess", o.onPresence(t)
                    }, 16: function () {
                        t.type = "unblock", o.onPresence(t)
                    }, 15: function () {
                        t.type = "block", o.onPresence(t)
                    }, 14: function () {
                        t.type = "update", o.onPresence(t)
                    }, 13: function () {
                        t.type = "allow", t.reason = r.reason, o.onPresence(t)
                    }, 12: function () {
                        t.type = "ban", o.onPresence(t)
                    }, 11: function () {
                        t.type = "getBlackList", o.onPresence(t)
                    }, 10: function () {
                        t.type = "removedFromGroup", t.kicked = t.to, o.onPresence(t)
                    }, 9: function () {
                        t.type = "invite_decline", t.kicked = t.to, o.onPresence(t)
                    }, 8: function () {
                        t.type = "invite_accept", t.kicked = t.to, o.onPresence(t)
                    }, 7: function () {
                        t.type = "invite", t.kicked = t.to, o.onPresence(t)
                    }, 6: function () {
                        t.type = "joinPublicGroupDeclined", o.onPresence(t)
                    }, 5: function () {
                        t.type = "joinPublicGroupSuccess", o.onPresence(t)
                    }, 4: function () {
                        t.type = "joinGroupNotifications", t.reason = r.reason, o.onPresence(t)
                    }, 3: function () {
                        t.type = "leave", o.onPresence(t)
                    }, 2: function () {
                        t.type = "join", o.onPresence(t)
                    }, 1: function () {
                        t.type = "deleteGroupChat", o.onPresence(t)
                    }
                }[e] || function () {
                    console.log("%c????????????".concat(e, "??????"), "background: green")
                })()
            }(r.operation)
        };
        t.default = n
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i = r(o(8)), n = {
            handleMessage: function (e, t, o) {
                var r = o.context.root.lookup("easemob.pb.RosterBody").decode(e.payload),
                    n = (new i.default(e.id.low, e.id.high, e.id.unsigned).toString(), {
                        to: r.to[0].name,
                        from: r.from.name,
                        status: r.reason
                    });
                switch (r.operation) {
                    case 0:
                        break;
                    case 2:
                        n.type = "subscribe", o.onContactInvited(n);
                        break;
                    case 3:
                        n.type = "unsubscribed", o.onContactDeleted(n);
                        break;
                    case 4:
                        n.type = "subscribed", o.onContactAdded(n);
                        break;
                    case 5:
                        n.type = "unsubscribed", o.onContactRefuse(n);
                        break;
                    case 6:
                    case 7:
                        o.getBlacklist();
                        break;
                    case 8:
                        n.type = "subscribed", o.onContactAgreed(n);
                        break;
                    case 9:
                        n.type = "unsubscribed", o.onContactRefuse(n)
                }
                o.onPresence(n)
            }, operatRoster: function (e, t, o) {
                var r = [], i = o.context.root.lookup("easemob.pb.RosterBody"), n = i.decode(r);
                "add" === t ? n.operation = 2 : "remove" === t ? n.operation = 3 : "accept" === t ? n.operation = 4 : "decline" === t ? n.operation = 5 : "ban" === t ? n.operation = 6 : "allow" === t && (n.operation = 7), n.from = o.context.jid;
                var s = [];
                if ("string" == typeof e.to) s.push({
                    appKey: o.appKey || o.context.appKey,
                    name: e.to,
                    domain: "easemob.com"
                }); else if (e.to instanceof Array) for (var a = 0; a < e.to.length; a++) s.push({
                    appKey: o.appKey,
                    name: e.to[a],
                    domain: "easemob.com"
                });
                n.to = s, n.reason = e.message, n = i.encode(n).finish();
                var u = o.context.root.lookup("easemob.pb.Meta").decode(r);
                u.id = e.id || o.getUniqueId(), u.from = o.context.jid, u.to = {domain: "@easemob.com"}, u.ns = 3, u.payload = n;
                var l = o.context.root.lookup("easemob.pb.CommSyncUL"), p = l.decode(r);
                p.meta = u, p = l.encode(p).finish();
                var c = o.context.root.lookup("easemob.pb.MSync"), h = c.decode(r);
                h.version = o.version, h.encryptType = [0], h.command = 0, h.guid = o.jid, h.payload = p, h = c.encode(h).finish(), o.sendMSync(h)
            }
        };
        t.default = n
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i = r(o(8)), n = (0, r(o(7)).default)(), s = function (e, t, o) {
            var r = o.context.root.lookup("easemob.pb.StatisticsBody").decode(e.payload);
            new i.default(e.id.low, e.id.high, e.id.unsigned).toString();
            switch (r.operation) {
                case 0:
                    o.onStatisticMessage(r);
                    break;
                case 1:
                    var s = {type: n.WEBIM_CONNCTION_USER_REMOVED, message: "user has been removed"};
                    o.logOut = !0, o.onError(s);
                    break;
                case 2:
                    s = {
                        type: n.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE,
                        message: "the user is already logged on another device"
                    };
                    o.logOut = !0, o.onError(s);
                    break;
                case 3:
                    s = {
                        type: n.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD,
                        message: "the user was kicked by changing password"
                    };
                    o.logOut = !0, o.onError(s);
                    break;
                case 4:
                    s = {
                        type: n.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE,
                        message: "the user was kicked by other device"
                    };
                    o.logOut = !0, o.onError(s)
            }
        };
        t.default = s
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i, n = r(o(63)), s = r(o(31)), a = r(o(7)), u = r(o(36)), l = (0, a.default)(), p = (i = {
            mr_cache: [], _fetchMessages: function (e, t) {
                var o = e.accessToken || t.context.accessToken;
                if (t._utils.isCanSetRequestHeader) if (o) {
                    var r = t.apiUrl, i = t.context.appName, n = t.context.orgName;
                    if (!i || !n) return void t.onError({
                        type: l.WEBIM_CONNCTION_AUTH_ERROR,
                        message: "appName or orgName is illegal"
                    });
                    if (!e.queue) return void t.onError({type: l.SDK_RUNTIME_ERROR, message: "queue is not specified"});
                    var a = e.queue, p = this.mr_cache[a] || (this.mr_cache[a] = {msgs: []}), c = t.context.userId,
                        h = -1;
                    if (p.msgs.length >= e.count || p.is_last) return void ("function" == typeof e.success && e.success(p));
                    p && p.next_key && (h = p.next_key);
                    var d = {queue: a + (e.isGroup ? "@conference.easemob.com" : "@easemob.com"), start: h, end: -1},
                        f = {
                            url: r + "/" + n + "/" + i + "/users/" + c + "/messageroaming",
                            dataType: "json",
                            type: "POST",
                            headers: {Authorization: "Bearer " + o},
                            data: JSON.stringify(d),
                            success: function (o, r) {
                                if (o && o.data) {
                                    var i = o.data;
                                    if (!o.data.msgs) return "function" == typeof e.success && e.success(p), p.is_last = !0, void (p.next_key = "");
                                    var n = i.msgs, a = n.length;
                                    p.is_last = i.is_last, p.next_key = i.next_key;
                                    var l = function (e) {
                                        for (var o = [], r = 0, i = (e = u.default.atob(e)).length; r < i; ++r) o.push(e.charCodeAt(r));
                                        var n = t.context.root.lookup("easemob.pb.Meta");
                                        if (1 == (n = n.decode(o)).ns) return (0, s.default)(n, {
                                            errorCode: 0,
                                            reason: ""
                                        }, t, !0)
                                    };
                                    try {
                                        for (var c = 0; c < a; c++) {
                                            var h = l(n[c].msg);
                                            h && p.msgs.push(h)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    } finally {
                                        "function" == typeof e.success && e.success(p)
                                    }
                                }
                            } || t._utils.emptyfn,
                            error: function (e, o) {
                                e.error && e.error_description && t.onError({
                                    type: l.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
                                    message: "fetch history messages error",
                                    msg: e.error_description,
                                    data: e
                                })
                            } || t._utils.emptyfn
                        };
                    t._utils.ajax(f)
                } else t.onError({
                    type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,
                    message: "token not assign error"
                }); else t.onError({
                    type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                    message: "current environment can not set request header"
                })
            }, fetchHistoryMessages: function (e) {
                var t = this;
                if (e.queue) {
                    var o = e.count || 20;
                    !function r() {
                        t._fetchMessages({
                            count: o, isGroup: !!e.isGroup, queue: e.queue, success: function (i) {
                                i.msgs.length >= o || i.is_last ? e.success && e.success(t._utils.reverse(i.msgs.splice(0, o))) : r()
                            }, fail: function () {
                            }
                        }, t)
                    }()
                } else t.onError({type: l.SDK_RUNTIME_ERROR, message: "queue is not specified"})
            }, getChatRooms: function (e) {
                var t = this, o = e.accessToken || this.context.accessToken;
                if (t._utils.isCanSetRequestHeader) if (o) {
                    var r = e.apiUrl, i = this.context.appName, n = this.context.orgName;
                    if (!i || !n) return void t.onError({
                        type: l.WEBIM_CONNCTION_AUTH_ERROR,
                        message: "appName or orgName is illegal"
                    });
                    var s = {
                        url: r + "/" + n + "/" + i + "/chatrooms",
                        dataType: "json",
                        type: "GET",
                        headers: {Authorization: "Bearer " + o},
                        data: {pagenum: parseInt(e.pagenum) || 1, pagesize: parseInt(e.pagesize) || 20},
                        success: function (t, o) {
                            "function" == typeof e.success && e.success(t)
                        } || t._utils.emptyfn,
                        error: function (e, o, r) {
                            e.error && e.error_description && t.onError({
                                type: l.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
                                message: e.error_description,
                                data: e,
                                xhr: o
                            })
                        } || t._utils.emptyfn
                    };
                    t._utils.ajax(s)
                } else t.onError({
                    type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,
                    message: "token not assign error"
                }); else t.onError({
                    type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                    message: "current environment can not set request header"
                })
            }, createChatRoom: function (e) {
                e = e || {};
                if (this._utils.isCanSetRequestHeader) {
                    var t = this, o = e.accessToken || this.token, r = t.user;
                    if (o) {
                        var i = e.apiUrl || this.apiUrl, n = this.context.appName, s = this.context.orgName;
                        if (!n || !s) return void t.onError({
                            type: l.WEBIM_CONNCTION_AUTH_ERROR,
                            message: "appName or orgName is illegal"
                        });
                        var a = {
                            name: e.name,
                            description: e.description,
                            maxusers: e.maxusers,
                            owner: r,
                            members: e.members
                        }, u = {
                            url: i + "/" + s + "/" + n + "/chatrooms",
                            dataType: "json",
                            type: "POST",
                            data: JSON.stringify(a),
                            headers: {Authorization: "Bearer " + o, "Content-Type": "application/json"},
                            success: function (t, o) {
                                "function" == typeof e.success && e.success(t)
                            } || t._utils.emptyfn,
                            error: function (t, o, r) {
                                "function" == typeof e.error && e.error(t)
                            } || t._utils.emptyfn
                        };
                        t._utils.ajax(u)
                    } else t.onError({
                        type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,
                        message: "token not assign error"
                    })
                } else t.onError({
                    type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                    message: "current environment can not set request header"
                })
            }, destroyChatRoom: function (e) {
                e = e || {};
                if (this._utils.isCanSetRequestHeader) {
                    var t = this, o = e.accessToken || this.token;
                    if (o) {
                        var r = e.apiUrl || this.apiUrl, i = this.context.appName, n = this.context.orgName,
                            s = e.chatRoomId;
                        if (!i || !n) return void t.onError({
                            type: l.WEBIM_CONNCTION_AUTH_ERROR,
                            message: "appName or orgName is illegal"
                        });
                        var a = {
                            url: r + "/" + n + "/" + i + "/chatrooms/" + s,
                            dataType: "json",
                            type: "DELETE",
                            headers: {Authorization: "Bearer " + o},
                            success: function (t, o) {
                                "function" == typeof e.success && e.success(t)
                            } || t._utils.emptyfn,
                            error: function (t, o, r) {
                                "function" == typeof e.error && e.error(t)
                            } || t._utils.emptyfn
                        };
                        t._utils.ajax(a)
                    } else t.onError({
                        type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,
                        message: "token not assign error"
                    })
                } else t.onError({
                    type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                    message: "current environment can not set request header"
                })
            }, getChatRoomDetails: function (e) {
                var t = e.chatRoomId, o = this.context.appName, r = this.context.orgName;
                if (o && r) {
                    var i = {
                        url: (e.apiUrl || this.apiUrl) + "/" + r + "/" + o + "/chatrooms/" + t,
                        dataType: "json",
                        type: "GET",
                        headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                    };
                    i.success = e.success || this._utils.emptyfn, i.error = e.error || this._utils.emptyfn, this._utils.ajax(i)
                } else conn.onError({type: l.WEBIM_CONNCTION_AUTH_ERROR, message: "appName or orgName is illegal"})
            }, modifyChatRoom: function (e) {
                var t = e.chatRoomId, o = {groupname: e.chatRoomName, description: e.description, maxusers: e.maxusers},
                    r = {
                        url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t,
                        type: "PUT",
                        data: JSON.stringify(o),
                        dataType: "json",
                        headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                    };
                r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
            }, removeSingleChatRoomMember: function (e) {
                var t = e.chatRoomId, o = e.username, r = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/users/" + o,
                    type: "DELETE",
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
            }, removeMultiChatRoomMember: function (e) {
                var t = e.chatRoomId, o = e.users.join(","), r = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/users/" + o,
                    type: "DELETE",
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
            }, addUsersToChatRoom: function (e) {
                var t = e.chatRoomId, o = {usernames: e.users}, r = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/users",
                    type: "POST",
                    data: JSON.stringify(o),
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
            }, joinChatRoom: function (e) {
                e = e || {};
                if (this._utils.isCanSetRequestHeader) {
                    var t = this, o = e.accessToken || this.token;
                    if (o) {
                        var r = e.apiUrl || this.apiUrl, i = this.context.appName, n = this.context.orgName,
                            s = e.roomId, a = e.message || "";
                        if (!i || !n) return void t.onError({
                            type: l.WEBIM_CONNCTION_AUTH_ERROR,
                            message: "appName or orgName is illegal"
                        });
                        var u = {
                            url: r + "/" + n + "/" + i + "/chatrooms/" + s + "/apply",
                            dataType: "json",
                            type: "POST",
                            data: JSON.stringify({message: a}),
                            headers: {Authorization: "Bearer " + o, "Content-Type": "application/json"},
                            success: function (t, o) {
                                "function" == typeof e.success && e.success(t)
                            } || t._utils.emptyfn,
                            error: function (t, o, r) {
                                "function" == typeof e.error && e.error(t)
                            } || t._utils.emptyfn
                        };
                        t._utils.ajax(u)
                    } else t.onError({
                        type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,
                        message: "token not assign error"
                    })
                } else t.onError({
                    type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                    message: "current environment can not set request header"
                })
            }, quitChatRoom: function (e) {
                e = e || {};
                if (this._utils.isCanSetRequestHeader) {
                    var t = this, o = e.accessToken || this.token;
                    if (o) {
                        var r = e.apiUrl || this.apiUrl, i = this.context.appName, n = this.context.orgName,
                            s = e.roomId;
                        if (!i || !n) return void t.onError({
                            type: l.WEBIM_CONNCTION_AUTH_ERROR,
                            message: "appName or orgName is illegal"
                        });
                        var a = {
                            url: r + "/" + n + "/" + i + "/chatrooms/" + s + "/quit",
                            dataType: "json",
                            type: "DELETE",
                            headers: {Authorization: "Bearer " + o},
                            success: function (t, o) {
                                "function" == typeof e.success && e.success(t)
                            } || t._utils.emptyfn,
                            error: function (t, o, r) {
                                "function" == typeof e.error && e.error(t)
                            } || t._utils.emptyfn
                        };
                        t._utils.ajax(a)
                    } else t.onError({
                        type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,
                        message: "token not assign error"
                    })
                } else t.onError({
                    type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                    message: "current environment can not set request header"
                })
            }, createGroupNew: function (e) {
                if (e && e.data) {
                    e.data.owner = this.user, e.data.hasOwnProperty("inviteNeedConfirm") && (e.data.invite_need_confirm = e.data.inviteNeedConfirm, delete e.data.inviteNeedConfirm);
                    var t = {
                        url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups",
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify(e.data),
                        headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                    };
                    t.success = function (t) {
                        e.success(t), this.onCreateGroup(t)
                    }.bind(this), t.error = e.error || this._utils.emptyfn, this._utils.ajax(t)
                }
            }, blockGroup: function (e) {
                var t = e.groupId;
                t = "notification_ignore_" + t;
                var o = {entities: []};
                o.entities[0] = {}, o.entities[0][t] = !0;
                var r = {
                    type: "PUT",
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/users/" + this.user,
                    data: JSON.stringify(o),
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
            }, listGroups: function (e) {
                var t = [];
                if (t.limit = e.limit, t.cursor = e.cursor, t.cursor || delete t.cursor, isNaN(e.limit)) throw'The parameter "limit" should be a number';
                var o = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/publicchatgroups",
                    type: "GET",
                    dataType: "json",
                    data: t,
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
            }, getGroup: function (e) {
                var t = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/users/" + this.user + "/joined_chatgroups",
                    dataType: "json",
                    type: "GET",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                t.success = e.success || this._utils.emptyfn, t.error = e.error || this._utils.emptyfn, this._utils.ajax(t)
            }, changeOwner: function (e) {
                var t = {newowner: e.newOwner}, o = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + e.groupId,
                    type: "PUT",
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"},
                    data: JSON.stringify(t)
                };
                o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
            }, getGroupInfo: function (e) {
                var t = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + e.groupId + "?joined_time=true",
                    type: "GET",
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                t.success = e.success || this._utils.emptyfn, t.error = e.error || this._utils.emptyfn, this._utils.ajax(t)
            }, modifyGroup: function (e) {
                var t = e.groupId, o = {groupname: e.groupName, description: e.description}, r = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t,
                    type: "PUT",
                    data: JSON.stringify(o),
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
            }, listGroupMember: function (e) {
                if (isNaN(e.pageNum) || e.pageNum <= 0) throw'The parameter "pageNum" should be a positive number';
                if (isNaN(e.pageSize) || e.pageSize <= 0) throw'The parameter "pageSize" should be a positive number';
                if (null === e.groupId && void 0 === e.groupId) throw'The parameter "groupId" should be added';
                var t = [], o = e.groupId;
                t.pagenum = e.pageNum, t.pagesize = e.pageSize;
                var r = {
                    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + o + "/users",
                    dataType: "json",
                    type: "GET",
                    data: t,
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
                r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
            }
        }, (0, n.default)(i, "listGroupMember", (function (e) {
            if (isNaN(e.pageNum) || e.pageNum <= 0) throw'The parameter "pageNum" should be a positive number';
            if (isNaN(e.pageSize) || e.pageSize <= 0) throw'The parameter "pageSize" should be a positive number';
            if (null === e.groupId && void 0 === e.groupId) throw'The parameter "groupId" should be added';
            var t = [], o = e.groupId;
            t.pagenum = e.pageNum, t.pagesize = e.pageSize;
            var r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + o + "/users",
                dataType: "json",
                type: "GET",
                data: t,
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "listChatRoomMember", (function (e) {
            if (isNaN(e.pageNum) || e.pageNum <= 0) throw'The parameter "pageNum" should be a positive number';
            if (isNaN(e.pageSize) || e.pageSize <= 0) throw'The parameter "pageSize" should be a positive number';
            if (null === e.chatRoomId && void 0 === e.chatRoomId) throw'The parameter "chatRoomId" should be added';
            var t = [], o = e.chatRoomId;
            t.pagenum = e.pageNum, t.pagesize = e.pageSize;
            var r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + o + "/users",
                dataType: "json",
                type: "GET",
                data: t,
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "getGroupAdmin", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/admin",
                dataType: "json",
                type: "GET",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "getChatRoomAdmin", (function (e) {
            var t = e.chatRoomId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/admin",
                dataType: "json",
                type: "GET",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "setAdmin", (function (e) {
            var t = e.groupId, o = {newadmin: e.username}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/admin",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(o),
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "setChatRoomAdmin", (function (e) {
            var t = e.chatRoomId, o = {newadmin: e.username}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/admin",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(o),
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeAdmin", (function (e) {
            var t = e.groupId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/admin/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeChatRoomAdmin", (function (e) {
            var t = e.chatRoomId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/admin/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "dissolveGroup", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "?version=v3",
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "quitGroup", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/quit",
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "inviteToGroup", (function (e) {
            var t = e.groupId, o = {usernames: e.users}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/invite",
                type: "POST",
                data: JSON.stringify(o),
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "joinGroup", (function (e) {
            var t = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + e.groupId + "/apply",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({message: "join group"}),
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            t.success = e.success || this._utils.emptyfn, t.error = e.error || this._utils.emptyfn, this._utils.ajax(t)
        })), (0, n.default)(i, "agreeJoinGroup", (function (e) {
            var t = e.groupId, o = {applicant: e.applicant, verifyResult: !0, reason: "no clue"}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/apply_verify",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(o),
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "rejectJoinGroup", (function (e) {
            var t = e.groupId, o = {applicant: e.applicant, verifyResult: !1, reason: "no clue"}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/apply_verify",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(o),
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "agreeInviteIntoGroup", (function (e) {
            var t = e.groupId, o = {invitee: e.invitee, verifyResult: !0}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/invite_verify",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(o),
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "rejectInviteIntoGroup", (function (e) {
            var t = e.groupId, o = {invitee: e.invitee, verifyResult: !1}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/invite_verify",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(o),
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeSingleGroupMember", (function (e) {
            var t = e.groupId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/users/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeMultiGroupMember", (function (e) {
            var t = e.groupId, o = e.users.join(","), r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/users/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "mute", (function (e) {
            var t = e.groupId, o = {usernames: [e.username], mute_duration: e.muteDuration}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/mute",
                dataType: "json",
                type: "POST",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"},
                data: JSON.stringify(o)
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "muteChatRoomMember", (function (e) {
            var t = e.chatRoomId, o = {usernames: [e.username], mute_duration: e.muteDuration}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/mute",
                dataType: "json",
                type: "POST",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"},
                data: JSON.stringify(o)
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeMute", (function (e) {
            var t = e.groupId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/mute/" + o,
                dataType: "json",
                type: "DELETE",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeMuteChatRoomMember", (function (e) {
            var t = e.chatRoomId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/mute/" + o,
                dataType: "json",
                type: "DELETE",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "getMuted", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/mute",
                dataType: "json",
                type: "GET",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "getChatRoomMuted", (function (e) {
            var t = e.chatRoomId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/mute",
                dataType: "json",
                type: "GET",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "groupBlockSingle", (function (e) {
            var t = e.groupId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users/" + o,
                type: "POST",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "chatRoomBlockSingle", (function (e) {
            var t = e.chatRoomId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users/" + o,
                type: "POST",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "groupBlockMulti", (function (e) {
            var t = e.groupId, o = {usernames: e.usernames}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users",
                data: JSON.stringify(o),
                type: "POST",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "chatRoomBlockMulti", (function (e) {
            var t = e.chatRoomId, o = {usernames: e.usernames}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users",
                data: JSON.stringify(o),
                type: "POST",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeGroupBlockSingle", (function (e) {
            var t = e.groupId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeChatRoomBlockSingle", (function (e) {
            var t = e.chatRoomId, o = e.username, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeGroupBlockMulti", (function (e) {
            var t = e.groupId, o = e.usernames.join(","), r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "removeChatRoomBlockMulti", (function (e) {
            var t = e.chatRoomId, o = e.usernames.join(","), r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users/" + o,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "getGroupBlacklistNew", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users",
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "getChatRoomBlacklistNew", (function (e) {
            var t = e.chatRoomId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users",
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "disableSendGroupMsg", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/ban",
                type: "POST",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "disableSendChatRoomMsg", (function (e) {
            var t = e.chatRoomId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/ban",
                type: "POST",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "enableSendGroupMsg", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/ban",
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "enableSendChatRoomMsg", (function (e) {
            var t = e.chatRoomId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/ban",
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "addUsersToGroupWhitelist", (function (e) {
            var t = e.groupId, o = {usernames: e.users}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users",
                type: "POST",
                data: JSON.stringify(o),
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "addUsersToChatRoomWhitelist", (function (e) {
            var t = e.chatRoomId, o = {usernames: e.users}, r = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users",
                type: "POST",
                data: JSON.stringify(o),
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            r.success = e.success || this._utils.emptyfn, r.error = e.error || this._utils.emptyfn, this._utils.ajax(r)
        })), (0, n.default)(i, "rmUsersFromGroupWhitelist", (function (e) {
            var t = e.groupId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users/" + e.userName,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "rmUsersFromChatRoomWhitelist", (function (e) {
            var t = e.chatRoomId, o = {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users/" + e.userName,
                type: "DELETE",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "getGroupWhitelist", (function (e) {
            var t = e.groupId, o = (e.users, {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users",
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            });
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "getChatRoomWhitelist", (function (e) {
            var t = e.chatRoomId, o = (e.users, {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users",
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            });
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "isGroupWhiteUser", (function (e) {
            var t = e.groupId, o = (e.users, {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users/" + e.userName,
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            });
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "isChatRoomWhiteUser", (function (e) {
            var t = e.chatRoomId, o = (e.users, {
                url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users/" + e.userName,
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            });
            o.success = e.success || this._utils.emptyfn, o.error = e.error || this._utils.emptyfn, this._utils.ajax(o)
        })), (0, n.default)(i, "getGroupMsgReadUser", (function (e) {
            var t = this;
            e = e || {};
            if (this._utils.isCanSetRequestHeader) {
                var o = e.accessToken || this.token;
                if (o) {
                    var r = t.apiUrl, i = t.context.appName, n = t.context.orgName;
                    if (!i || !n) return void t.onError({
                        type: l.WEBIM_CONNCTION_AUTH_ERROR,
                        message: "appName or orgName is illegal"
                    });
                    var s = {
                        url: r + "/" + n + "/" + i + "/chatgroups/" + e.groupId + "/acks/" + e.msgId,
                        dataType: "json",
                        type: "GET",
                        data: {limit: 500, key: void 0},
                        headers: {Authorization: "Bearer " + o},
                        success: function (t) {
                            "function" == typeof e.success && e.success(t)
                        } || this._utils.emptyfn,
                        error: function (t) {
                            "function" == typeof e.error && e.error(t)
                        } || this._utils.emptyfn
                    };
                    this._utils.ajax(s)
                } else t.onError({type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR, message: "token not assign error"})
            } else conn.onError({
                type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                message: "current environment can not set request header"
            })
        })), (0, n.default)(i, "getBlacklist", (function (e) {
            var t = this;
            e = e || {};
            if (this._utils.isCanSetRequestHeader) {
                var o = this, r = e.accessToken || this.token;
                if (r) {
                    var i = e.apiUrl || this.apiUrl, n = this.context.appName, s = this.context.orgName;
                    if (!n || !s) return void o.onError({
                        type: l.WEBIM_CONNCTION_AUTH_ERROR,
                        message: "appName or orgName is illegal"
                    });
                    var a = {
                        url: i + "/" + s + "/" + n + "/users/" + this.user + "/blocks/users",
                        dataType: "json",
                        type: "GET",
                        headers: {Authorization: "Bearer " + r},
                        success: function (o, r) {
                            var i = {};
                            o.data.forEach((function (e, t) {
                                i[e] = {name: e}
                            })), t.onBlacklistUpdate(i), "function" == typeof e.success && e.success(o)
                        } || this._utils.emptyfn,
                        error: function (o, r, i) {
                            t.onBlacklistUpdate([]), "function" == typeof e.error && e.error(o)
                        } || this._utils.emptyfn
                    };
                    this._utils.ajax(a)
                } else o.onError({type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR, message: "token not assign error"})
            } else o.onError({
                type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                message: "current environment can not set request header"
            })
        })), (0, n.default)(i, "getRoster", (function (e) {
            e = e || {};
            var t = this;
            if (this._utils.isCanSetRequestHeader) {
                var o = this, r = e.accessToken || this.token;
                if (r) {
                    var i = e.apiUrl || this.apiUrl, n = this.context.appName, s = this.context.orgName;
                    if (!n || !s) return void o.onError({
                        type: l.WEBIM_CONNCTION_AUTH_ERROR,
                        message: "appName or orgName is illegal"
                    });
                    var a = {
                        url: i + "/" + s + "/" + n + "/users/" + this.user + "/contacts/users",
                        dataType: "json",
                        type: "GET",
                        headers: {Authorization: "Bearer " + r},
                        success: function (o, r) {
                            var i = [];
                            o.data.forEach((function (e, o) {
                                i.push({name: e, subscription: "both", jid: t.context.jid})
                            })), "function" == typeof e.success && e.success(i), t.onRoster && t.onRoster(i)
                        } || this._utils.emptyfn,
                        error: function (t, o, r) {
                            "function" == typeof e.error && e.error(t)
                        } || this._utils.emptyfn
                    };
                    this._utils.ajax(a)
                } else o.onError({type: l.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR, message: "token not assign error"})
            } else o.onError({
                type: l.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR,
                message: "current environment can not set request header"
            })
        })), (0, n.default)(i, "fetchGroupAnnouncement", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.groupId, n = {
                url: "".concat(t, "/").concat(r, "/").concat(o, "/chatgroups/").concat(i, "/announcement"),
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            n.success = e.success || this._utils.emptyfn, n.error = e.error || this._utils.emptyfn, this._utils.ajax(n)
        })), (0, n.default)(i, "fetchChatRoomAnnouncement", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.roomId, n = {
                url: "".concat(t, "/").concat(r, "/").concat(o, "/chatrooms/").concat(i, "/announcement"),
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            n.success = e.success || this._utils.emptyfn, n.error = e.error || this._utils.emptyfn, this._utils.ajax(n)
        })), (0, n.default)(i, "updateGroupAnnouncement", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.groupId,
                n = {announcement: e.announcement}, s = {
                    url: "".concat(t, "/").concat(r, "/").concat(o, "/chatgroups/").concat(i, "/announcement"),
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(n),
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
            s.success = e.success || this._utils.emptyfn, s.error = e.error || this._utils.emptyfn, this._utils.ajax(s)
        })), (0, n.default)(i, "updateChatRoomAnnouncement", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.roomId,
                n = {announcement: e.announcement}, s = {
                    url: "".concat(t, "/").concat(r, "/").concat(o, "/chatrooms/").concat(i, "/announcement"),
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(n),
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
            s.success = e.success || this._utils.emptyfn, s.error = e.error || this._utils.emptyfn, this._utils.ajax(s)
        })), (0, n.default)(i, "uploadGroupSharedFile", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.groupId;
            this._utils.uploadFile({
                uploadUrl: "".concat(t, "/").concat(r, "/").concat(o, "/chatgroups/").concat(i, "/share_files"),
                onFileUploadProgress: e.onFileUploadProgress,
                onFileUploadComplete: e.onFileUploadComplete,
                onFileUploadError: e.onFileUploadError,
                onFileUploadCanceled: e.onFileUploadCanceled,
                accessToken: this.token,
                apiUrl: t,
                file: e.file,
                appKey: this.context.appKey
            })
        })), (0, n.default)(i, "uploadChatRoomSharedFile", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.roomId;
            this._utils.uploadFile({
                uploadUrl: "".concat(t, "/").concat(r, "/").concat(o, "/chatrooms/").concat(i, "/share_files"),
                onFileUploadProgress: e.onFileUploadProgress,
                onFileUploadComplete: e.onFileUploadComplete,
                onFileUploadError: e.onFileUploadError,
                onFileUploadCanceled: e.onFileUploadCanceled,
                accessToken: this.token,
                apiUrl: t,
                file: e.file,
                appKey: this.context.appKey
            })
        })), (0, n.default)(i, "deleteGroupSharedFile", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.groupId,
                n = e.fileId, s = {
                    url: "".concat(t, "/").concat(r, "/").concat(o, "/chatgroups/").concat(i, "/share_files/").concat(n),
                    type: "DELETE",
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
            s.success = e.success || this._utils.emptyfn, s.error = e.error || this._utils.emptyfn, this._utils.ajax(s)
        })), (0, n.default)(i, "deleteChatRoomSharedFile", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.roomId,
                n = e.fileId, s = {
                    url: "".concat(t, "/").concat(r, "/").concat(o, "/chatrooms/").concat(i, "/share_files/").concat(n),
                    type: "DELETE",
                    dataType: "json",
                    headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
                };
            s.success = e.success || this._utils.emptyfn, s.error = e.error || this._utils.emptyfn, this._utils.ajax(s)
        })), (0, n.default)(i, "downloadGroupSharedFile", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.groupId,
                n = e.fileId;
            this._utils.download.call(this, {
                url: "".concat(t, "/").concat(r, "/").concat(o, "/chatgroups/").concat(i, "/share_files/").concat(n),
                onFileDownloadComplete: e.onFileDownloadComplete,
                onFileDownloadError: e.onFileDownloadError,
                accessToken: this.token,
                id: n,
                secret: ""
            })
        })), (0, n.default)(i, "downloadChatRoomSharedFile", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.roomId,
                n = e.fileId;
            this._utils.download.call(this, {
                url: "".concat(t, "/").concat(r, "/").concat(o, "/chatrooms/").concat(i, "/share_files/").concat(n),
                onFileDownloadComplete: e.onFileDownloadComplete,
                onFileDownloadError: e.onFileDownloadError,
                accessToken: this.token,
                id: n,
                secret: ""
            })
        })), (0, n.default)(i, "fetchGroupSharedFileList", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.groupId, n = {
                url: "".concat(t, "/").concat(r, "/").concat(o, "/chatgroups/").concat(i, "/share_files"),
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            n.success = e.success || this._utils.emptyfn, n.error = e.error || this._utils.emptyfn, this._utils.ajax(n)
        })), (0, n.default)(i, "fetchChatRoomSharedFileList", (function (e) {
            var t = e.apiUrl || this.apiUrl, o = this.context.appName, r = this.context.orgName, i = e.roomId, n = {
                url: "".concat(t, "/").concat(r, "/").concat(o, "/chatrooms/").concat(i, "/share_files"),
                type: "GET",
                dataType: "json",
                headers: {Authorization: "Bearer " + this.token, "Content-Type": "application/json"}
            };
            n.success = e.success || this._utils.emptyfn, n.error = e.error || this._utils.emptyfn, this._utils.ajax(n)
        })), i);
        t.default = p
    }, function (e, t, o) {
        "use strict";
        e.exports = function (e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        }
    }, function (e, t, o) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var r = function () {
            return {
                nested: {
                    easemob: {
                        nested: {
                            pb: {
                                nested: {
                                    MessageBody: {
                                        fields: {
                                            type: {type: "Type", id: 1},
                                            from: {type: "JID", id: 2},
                                            to: {type: "JID", id: 3},
                                            contents: {rule: "repeated", type: "Content", id: 4},
                                            ext: {rule: "repeated", type: "KeyValue", id: 5},
                                            ackMessageId: {type: "uint64", id: 6},
                                            msgConfig: {type: "MessageConfig", id: 7},
                                            ackContent: {type: "string", id: 8}
                                        }, nested: {
                                            Content: {
                                                fields: {
                                                    type: {type: "Type", id: 1},
                                                    text: {type: "string", id: 2},
                                                    latitude: {type: "double", id: 3},
                                                    longitude: {type: "double", id: 4},
                                                    address: {type: "string", id: 5},
                                                    displayName: {type: "string", id: 6},
                                                    remotePath: {type: "string", id: 7},
                                                    secretKey: {type: "string", id: 8},
                                                    fileLength: {type: "int32", id: 9},
                                                    action: {type: "string", id: 10},
                                                    params: {rule: "repeated", type: "KeyValue", id: 11},
                                                    duration: {type: "int32", id: 12},
                                                    size: {type: "Size", id: 13},
                                                    thumbnailRemotePath: {type: "string", id: 14},
                                                    thumbnailSecretKey: {type: "string", id: 15},
                                                    thumbnailDisplayName: {type: "string", id: 16},
                                                    thumbnailFileLength: {type: "int32", id: 17},
                                                    thumbnailSize: {type: "Size", id: 18},
                                                    customEvent: {type: "string", id: 19},
                                                    customExts: {rule: "repeated", type: "KeyValue", id: 20}
                                                },
                                                nested: {
                                                    Type: {
                                                        values: {
                                                            TEXT: 0,
                                                            IMAGE: 1,
                                                            VIDEO: 2,
                                                            LOCATION: 3,
                                                            VOICE: 4,
                                                            FILE: 5,
                                                            COMMAND: 6,
                                                            CUSTOM: 7
                                                        }
                                                    },
                                                    Size: {
                                                        fields: {
                                                            width: {type: "double", id: 1},
                                                            height: {type: "double", id: 2}
                                                        }
                                                    }
                                                }
                                            },
                                            Type: {
                                                values: {
                                                    NORMAL: 0,
                                                    CHAT: 1,
                                                    GROUPCHAT: 2,
                                                    CHATROOM: 3,
                                                    READ_ACK: 4,
                                                    DELIVER_ACK: 5,
                                                    RECALL: 6
                                                }
                                            },
                                            MessageConfig: {fields: {allowGroupAck: {type: "bool", id: 1}}}
                                        }
                                    },
                                    KeyValue: {
                                        oneofs: {value: {oneof: ["varintValue", "floatValue", "doubleValue", "stringValue"]}},
                                        fields: {
                                            key: {type: "string", id: 1},
                                            type: {type: "ValueType", id: 2},
                                            varintValue: {type: "int64", id: 3},
                                            floatValue: {type: "float", id: 4},
                                            doubleValue: {type: "double", id: 5},
                                            stringValue: {type: "string", id: 6}
                                        },
                                        nested: {
                                            ValueType: {
                                                values: {
                                                    BOOL: 1,
                                                    INT: 2,
                                                    UINT: 3,
                                                    LLINT: 4,
                                                    FLOAT: 5,
                                                    DOUBLE: 6,
                                                    STRING: 7,
                                                    JSON_STRING: 8
                                                }
                                            }
                                        }
                                    },
                                    JID: {
                                        fields: {
                                            appKey: {type: "string", id: 1},
                                            name: {type: "string", id: 2},
                                            domain: {type: "string", id: 3},
                                            clientResource: {type: "string", id: 4}
                                        }
                                    },
                                    ConferenceBody: {
                                        fields: {
                                            sessionId: {type: "string", id: 1},
                                            operation: {type: "Operation", id: 2},
                                            conferenceId: {type: "string", id: 3},
                                            type: {type: "Type", id: 4},
                                            content: {type: "string", id: 5},
                                            network: {type: "string", id: 6},
                                            version: {type: "string", id: 7},
                                            identity: {type: "Identity", id: 8},
                                            duration: {type: "string", id: 9},
                                            peerName: {type: "string", id: 10},
                                            endReason: {type: "EndReason", id: 11},
                                            status: {type: "Status", id: 12},
                                            isDirect: {type: "bool", id: 13},
                                            controlType: {type: "StreamControlType", id: 14},
                                            routeFlag: {type: "int32", id: 15},
                                            routeKey: {type: "string", id: 16}
                                        },
                                        nested: {
                                            Status: {fields: {errorCode: {type: "int32", id: 1}}},
                                            Operation: {
                                                values: {
                                                    JOIN: 0,
                                                    INITIATE: 1,
                                                    ACCEPT_INITIATE: 2,
                                                    ANSWER: 3,
                                                    TERMINATE: 4,
                                                    REMOVE: 5,
                                                    STREAM_CONTROL: 6,
                                                    MEDIA_REQUEST: 7
                                                }
                                            },
                                            Type: {values: {VOICE: 0, VIDEO: 1}},
                                            Identity: {values: {CALLER: 0, CALLEE: 1}},
                                            EndReason: {
                                                values: {
                                                    HANGUP: 0,
                                                    NORESPONSE: 1,
                                                    REJECT: 2,
                                                    BUSY: 3,
                                                    FAIL: 4,
                                                    UNSUPPORTED: 5,
                                                    OFFLINE: 6
                                                }
                                            },
                                            StreamControlType: {
                                                values: {
                                                    PAUSE_VOICE: 0,
                                                    RESUME_VOICE: 1,
                                                    PAUSE_VIDEO: 2,
                                                    RESUME_VIDEO: 3
                                                }
                                            }
                                        }
                                    },
                                    MSync: {
                                        fields: {
                                            version: {type: "Version", id: 1, options: {default: "MSYNC_V1"}},
                                            guid: {type: "JID", id: 2},
                                            auth: {type: "string", id: 3},
                                            compressAlgorimth: {type: "uint32", id: 4},
                                            crypto: {type: "uint32", id: 5},
                                            userAgent: {type: "string", id: 6},
                                            pov: {type: "uint64", id: 7},
                                            command: {type: "Command", id: 8},
                                            deviceId: {type: "uint32", id: 10},
                                            encryptType: {
                                                rule: "repeated",
                                                type: "EncryptType",
                                                id: 11,
                                                options: {packed: !1}
                                            },
                                            encryptKey: {type: "string", id: 12},
                                            payload: {type: "bytes", id: 9}
                                        },
                                        nested: {
                                            Version: {values: {MSYNC_V1: 0, MSYNC_V2: 1}},
                                            Command: {values: {SYNC: 0, UNREAD: 1, NOTICE: 2, PROVISION: 3}}
                                        }
                                    },
                                    EncryptType: {
                                        values: {
                                            ENCRYPT_NONE: 0,
                                            ENCRYPT_AES_128_CBC: 1,
                                            ENCRYPT_AES_256_CBC: 2
                                        }
                                    },
                                    CommSyncUL: {
                                        fields: {
                                            meta: {type: "Meta", id: 1},
                                            key: {type: "uint64", id: 2},
                                            queue: {type: "JID", id: 3},
                                            isRoam: {type: "bool", id: 4},
                                            lastFullRoamKey: {type: "uint64", id: 5}
                                        }
                                    },
                                    CommSyncDL: {
                                        fields: {
                                            status: {type: "Status", id: 1},
                                            metaId: {type: "uint64", id: 2},
                                            serverId: {type: "uint64", id: 3},
                                            metas: {rule: "repeated", type: "Meta", id: 4},
                                            nextKey: {type: "uint64", id: 5},
                                            queue: {type: "JID", id: 6},
                                            isLast: {type: "bool", id: 7},
                                            timestamp: {type: "uint64", id: 8},
                                            isRoam: {type: "bool", id: 9}
                                        }
                                    },
                                    CommNotice: {fields: {queue: {type: "JID", id: 1}}},
                                    CommUnreadUL: {fields: {}},
                                    CommUnreadDL: {
                                        fields: {
                                            status: {type: "Status", id: 1},
                                            unread: {rule: "repeated", type: "MetaQueue", id: 2},
                                            timestamp: {type: "uint64", id: 3}
                                        }
                                    },
                                    MetaQueue: {fields: {queue: {type: "JID", id: 1}, n: {type: "uint32", id: 2}}},
                                    Meta: {
                                        fields: {
                                            id: {type: "uint64", id: 1},
                                            from: {type: "JID", id: 2},
                                            to: {type: "JID", id: 3},
                                            timestamp: {type: "uint64", id: 4},
                                            ns: {type: "NameSpace", id: 5},
                                            payload: {type: "bytes", id: 6},
                                            routetype: {type: "RouteType", id: 7}
                                        },
                                        nested: {
                                            NameSpace: {
                                                values: {
                                                    STATISTIC: 0,
                                                    CHAT: 1,
                                                    MUC: 2,
                                                    ROSTER: 3,
                                                    CONFERENCE: 4
                                                }
                                            }, RouteType: {values: {ROUTE_ALL: 0, ROUTE_ONLINE: 1}}
                                        }
                                    },
                                    Status: {
                                        fields: {
                                            errorCode: {type: "ErrorCode", id: 1},
                                            reason: {type: "string", id: 2},
                                            redirectInfo: {rule: "repeated", type: "RedirectInfo", id: 3}
                                        },
                                        nested: {
                                            ErrorCode: {
                                                values: {
                                                    OK: 0,
                                                    FAIL: 1,
                                                    UNAUTHORIZED: 2,
                                                    MISSING_PARAMETER: 3,
                                                    WRONG_PARAMETER: 4,
                                                    REDIRECT: 5,
                                                    TOKEN_EXPIRED: 6,
                                                    PERMISSION_DENIED: 7,
                                                    NO_ROUTE: 8,
                                                    UNKNOWN_COMMAND: 9,
                                                    PB_PARSER_ERROR: 10,
                                                    BIND_ANOTHER_DEVICE: 11,
                                                    IM_FORBIDDEN: 12,
                                                    TOO_MANY_DEVICES: 13,
                                                    PLATFORM_LIMIT: 14,
                                                    USER_MUTED: 15,
                                                    ENCRYPT_DISABLE: 16,
                                                    ENCRYPT_ENABLE: 17,
                                                    DECRYPT_FAILURE: 18
                                                }
                                            }
                                        }
                                    },
                                    RedirectInfo: {
                                        fields: {
                                            host: {type: "string", id: 1},
                                            port: {type: "uint32", id: 2}
                                        }
                                    },
                                    Provision: {
                                        fields: {
                                            osType: {type: "OsType", id: 1},
                                            version: {type: "string", id: 2},
                                            networkType: {type: "NetworkType", id: 3},
                                            appSign: {type: "string", id: 4},
                                            compressType: {
                                                rule: "repeated",
                                                type: "CompressType",
                                                id: 5,
                                                options: {packed: !1}
                                            },
                                            encryptType: {
                                                rule: "repeated",
                                                type: "EncryptType",
                                                id: 6,
                                                options: {packed: !1}
                                            },
                                            encryptKey: {type: "string", id: 7},
                                            status: {type: "Status", id: 8},
                                            deviceUuid: {type: "string", id: 9},
                                            isManualLogin: {type: "bool", id: 10},
                                            password: {type: "string", id: 11},
                                            deviceName: {type: "string", id: 12},
                                            resource: {type: "string", id: 13},
                                            auth: {type: "string", id: 14}
                                        },
                                        nested: {
                                            OsType: {
                                                values: {
                                                    OS_IOS: 0,
                                                    OS_ANDROID: 1,
                                                    OS_LINUX: 2,
                                                    OS_OSX: 3,
                                                    OS_WIN: 4,
                                                    OS_OTHER: 16
                                                }
                                            },
                                            NetworkType: {
                                                values: {
                                                    NETWORK_NONE: 0,
                                                    NETWORK_WIFI: 1,
                                                    NETWORK_4G: 2,
                                                    NETWORK_3G: 3,
                                                    NETWORK_2G: 4,
                                                    NETWORK_WIRE: 5
                                                }
                                            },
                                            CompressType: {values: {COMPRESS_NONE: 0, COMPRESS_ZLIB: 1}}
                                        }
                                    },
                                    MUCBody: {
                                        fields: {
                                            mucId: {type: "JID", id: 1},
                                            operation: {type: "Operation", id: 2},
                                            from: {type: "JID", id: 3},
                                            to: {rule: "repeated", type: "JID", id: 4},
                                            setting: {type: "Setting", id: 5},
                                            reason: {type: "string", id: 6},
                                            isChatroom: {type: "bool", id: 7},
                                            status: {type: "Status", id: 8}
                                        },
                                        nested: {
                                            Operation: {
                                                values: {
                                                    CREATE: 0,
                                                    DESTROY: 1,
                                                    JOIN: 2,
                                                    LEAVE: 3,
                                                    APPLY: 4,
                                                    APPLY_ACCEPT: 5,
                                                    APPLY_DECLINE: 6,
                                                    INVITE: 7,
                                                    INVITE_ACCEPT: 8,
                                                    INVITE_DECLINE: 9,
                                                    KICK: 10,
                                                    GET_BLACKLIST: 11,
                                                    BAN: 12,
                                                    ALLOW: 13,
                                                    UPDATE: 14,
                                                    BLOCK: 15,
                                                    UNBLOCK: 16,
                                                    PRESENCE: 17,
                                                    ABSENCE: 18,
                                                    DIRECT_JOINED: 19,
                                                    ASSIGN_OWNER: 20,
                                                    ADD_ADMIN: 21,
                                                    REMOVE_ADMIN: 22,
                                                    ADD_MUTE: 23,
                                                    REMOVE_MUTE: 24,
                                                    UPDATE_ANNOUNCEMENT: 25,
                                                    DELETE_ANNOUNCEMENT: 26,
                                                    UPLOAD_FILE: 27,
                                                    DELETE_FILE: 28,
                                                    ADD_USER_WHITE_LIST: 29,
                                                    REMOVE_USER_WHITE_LIST: 30,
                                                    BAN_GROUP: 31,
                                                    REMOVE_BAN_GROUP: 32
                                                }
                                            },
                                            Setting: {
                                                fields: {
                                                    name: {type: "string", id: 1},
                                                    desc: {type: "string", id: 2},
                                                    type: {type: "Type", id: 3},
                                                    maxUsers: {type: "int32", id: 4},
                                                    owner: {type: "string", id: 5}
                                                },
                                                nested: {
                                                    Type: {
                                                        values: {
                                                            PRIVATE_OWNER_INVITE: 0,
                                                            PRIVATE_MEMBER_INVITE: 1,
                                                            PUBLIC_JOIN_APPROVAL: 2,
                                                            PUBLIC_JOIN_OPEN: 3,
                                                            PUBLIC_ANONYMOUS: 4
                                                        }
                                                    }
                                                }
                                            },
                                            Status: {
                                                fields: {
                                                    errorCode: {type: "ErrorCode", id: 1},
                                                    description: {type: "string", id: 2}
                                                },
                                                nested: {
                                                    ErrorCode: {
                                                        values: {
                                                            OK: 0,
                                                            PERMISSION_DENIED: 1,
                                                            WRONG_PARAMETER: 2,
                                                            MUC_NOT_EXIST: 3,
                                                            USER_NOT_EXIST: 4,
                                                            UNKNOWN: 5
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    RosterBody: {
                                        fields: {
                                            operation: {type: "Operation", id: 1},
                                            status: {type: "Status", id: 2},
                                            from: {type: "JID", id: 3},
                                            to: {rule: "repeated", type: "JID", id: 4},
                                            reason: {type: "string", id: 5},
                                            rosterVer: {type: "string", id: 6},
                                            biDirection: {type: "bool", id: 7}
                                        },
                                        nested: {
                                            Operation: {
                                                values: {
                                                    GET_ROSTER: 0,
                                                    GET_BLACKLIST: 1,
                                                    ADD: 2,
                                                    REMOVE: 3,
                                                    ACCEPT: 4,
                                                    DECLINE: 5,
                                                    BAN: 6,
                                                    ALLOW: 7,
                                                    REMOTE_ACCEPT: 8,
                                                    REMOTE_DECLINE: 9
                                                }
                                            },
                                            Status: {
                                                fields: {
                                                    errorCode: {type: "ErrorCode", id: 1},
                                                    description: {type: "string", id: 2}
                                                },
                                                nested: {
                                                    ErrorCode: {
                                                        values: {
                                                            OK: 0,
                                                            USER_NOT_EXIST: 1,
                                                            USER_ALREADY_FRIEND: 2,
                                                            USER_ALREADY_BLACKLIST: 3
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    StatisticsBody: {
                                        fields: {
                                            operation: {type: "Operation", id: 1},
                                            os: {type: "OsType", id: 2},
                                            version: {type: "string", id: 3},
                                            network: {type: "NetworkType", id: 4},
                                            imTime: {type: "uint32", id: 5},
                                            chatTime: {type: "uint32", id: 6},
                                            location: {type: "string", id: 7}
                                        },
                                        nested: {
                                            Operation: {
                                                values: {
                                                    INFORMATION: 0,
                                                    USER_REMOVED: 1,
                                                    USER_LOGIN_ANOTHER_DEVICE: 2,
                                                    USER_KICKED_BY_CHANGE_PASSWORD: 3,
                                                    USER_KICKED_BY_OTHER_DEVICE: 4
                                                }
                                            },
                                            OsType: {
                                                values: {
                                                    OS_IOS: 0,
                                                    OS_ANDROID: 1,
                                                    OS_LINUX: 2,
                                                    OS_OSX: 3,
                                                    OS_WIN: 4,
                                                    OS_OTHER: 16
                                                }
                                            },
                                            NetworkType: {
                                                values: {
                                                    NETWORK_NONE: 0,
                                                    NETWORK_WIFI: 1,
                                                    NETWORK_4G: 2,
                                                    NETWORK_3G: 3,
                                                    NETWORK_2G: 4,
                                                    NETWORK_WIRE: 5
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        t.default = r
    }, function (e, t, o) {
        "use strict";
        e.exports = i;
        var r = o(3);

        function i(e, t) {
            this.lo = e >>> 0, this.hi = t >>> 0
        }

        var n = i.zero = new i(0, 0);
        n.toNumber = function () {
            return 0
        }, n.zzEncode = n.zzDecode = function () {
            return this
        }, n.length = function () {
            return 1
        };
        var s = i.zeroHash = "\0\0\0\0\0\0\0\0";
        i.fromNumber = function (e) {
            if (0 === e) return n;
            var t = e < 0;
            t && (e = -e);
            var o = e >>> 0, r = (e - o) / 4294967296 >>> 0;
            return t && (r = ~r >>> 0, o = ~o >>> 0, ++o > 4294967295 && (o = 0, ++r > 4294967295 && (r = 0))), new i(o, r)
        }, i.from = function (e) {
            if ("number" == typeof e) return i.fromNumber(e);
            if ("string" == typeof e || e instanceof String) {
                if (!r.Long) return i.fromNumber(parseInt(e, 10));
                e = r.Long.fromString(e)
            }
            return e.low || e.high ? new i(e.low >>> 0, e.high >>> 0) : n
        }, i.prototype.toNumber = function (e) {
            if (!e && this.hi >>> 31) {
                var t = 1 + ~this.lo >>> 0, o = ~this.hi >>> 0;
                return t || (o = o + 1 >>> 0), -(t + 4294967296 * o)
            }
            return this.lo + 4294967296 * this.hi
        }, i.prototype.toLong = function (e) {
            return r.Long ? new r.Long(0 | this.lo, 0 | this.hi, Boolean(e)) : {
                low: 0 | this.lo,
                high: 0 | this.hi,
                unsigned: Boolean(e)
            }
        };
        var a = String.prototype.charCodeAt;
        i.fromHash = function (e) {
            return e === s ? n : new i((a.call(e, 0) | a.call(e, 1) << 8 | a.call(e, 2) << 16 | a.call(e, 3) << 24) >>> 0, (a.call(e, 4) | a.call(e, 5) << 8 | a.call(e, 6) << 16 | a.call(e, 7) << 24) >>> 0)
        }, i.prototype.toHash = function () {
            return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
        }, i.prototype.zzEncode = function () {
            var e = this.hi >> 31;
            return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0, this.lo = (this.lo << 1 ^ e) >>> 0, this
        }, i.prototype.zzDecode = function () {
            var e = -(1 & this.lo);
            return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0, this.hi = (this.hi >>> 1 ^ e) >>> 0, this
        }, i.prototype.length = function () {
            var e = this.lo, t = (this.lo >>> 28 | this.hi << 4) >>> 0, o = this.hi >>> 24;
            return 0 === o ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : o < 128 ? 9 : 10
        }
    }, function (e, t, o) {
        "use strict";
        var r = o(0)(o(5));
        e.exports = a;
        var i, n, s = o(16);

        function a(e, t, o, r, i, a) {
            if (s.call(this, e, t, r, void 0, void 0, i, a), !n.isString(o)) throw TypeError("keyType must be a string");
            this.keyType = o, this.resolvedKeyType = null, this.map = !0
        }

        ((a.prototype = Object.create(s.prototype)).constructor = a).className = "MapField", a.fromJSON = function (e, t) {
            return new a(e, t.id, t.keyType, t.type, t.options, t.comment)
        }, a.prototype.toJSON = function (e) {
            var t = !!e && Boolean(e.keepComments);
            return n.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0])
        }, a.prototype.resolve = function () {
            if (this.resolved) return this;
            if (void 0 === i.mapKey[this.keyType]) throw Error("invalid key type: " + this.keyType);
            return s.prototype.resolve.call(this)
        }, a.d = function (e, t, o) {
            return "function" == typeof o ? o = n.decorateType(o).name : o && "object" === (0, r.default)(o) && (o = n.decorateEnum(o).name), function (r, i) {
                n.decorateType(r.constructor).add(new a(i, e, t, o))
            }
        }, a._configure = function () {
            i = o(24), n = o(3)
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = n;
        var r, i = o(23);

        function n(e, t, o, n, s, a, u, l) {
            if (r.isObject(s) ? (u = s, s = a = void 0) : r.isObject(a) && (u = a, a = void 0), void 0 !== t && !r.isString(t)) throw TypeError("type must be a string");
            if (!r.isString(o)) throw TypeError("requestType must be a string");
            if (!r.isString(n)) throw TypeError("responseType must be a string");
            i.call(this, e, u), this.type = t || "rpc", this.requestType = o, this.requestStream = !!s || void 0, this.responseType = n, this.responseStream = !!a || void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = l
        }

        ((n.prototype = Object.create(i.prototype)).constructor = n).className = "Method", n.fromJSON = function (e, t) {
            return new n(e, t.type, t.requestType, t.responseType, t.requestStream, t.responseStream, t.options, t.comment)
        }, n.prototype.toJSON = function (e) {
            var t = !!e && Boolean(e.keepComments);
            return r.toObject(["type", "rpc" !== this.type && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", t ? this.comment : void 0])
        }, n.prototype.resolve = function () {
            return this.resolved ? this : (this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), i.prototype.resolve.call(this))
        }, n._configure = function () {
            r = o(3)
        }
    }, function (e, t, o) {
        "use strict";
        var r;

        function i(e) {
            if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) this[t[o]] = e[t[o]]
        }

        e.exports = i, i.create = function (e) {
            return this.$type.create(e)
        }, i.encode = function (e, t) {
            return arguments.length ? 1 == arguments.length ? this.$type.encode(arguments[0]) : this.$type.encode(arguments[0], arguments[1]) : this.$type.encode(this)
        }, i.encodeDelimited = function (e, t) {
            return this.$type.encodeDelimited(e, t)
        }, i.decode = function (e) {
            return this.$type.decode(e)
        }, i.decodeDelimited = function (e) {
            return this.$type.decodeDelimited(e)
        }, i.verify = function (e) {
            return this.$type.verify(e)
        }, i.fromObject = function (e) {
            return this.$type.fromObject(e)
        }, i.toObject = function (e, t) {
            return e = e || this, this.$type.toObject(e, t)
        }, i.prototype.toJSON = function () {
            return this.$type.toObject(this, r.toJSONOptions)
        }, i.set = function (e, t) {
            i[e] = t
        }, i.get = function (e) {
            return i[e]
        }, i._configure = function () {
            r = o(3)
        }
    }, , , , , , , , , , , , , , , , , , , , , , , , , function (e, t, o) {
        "use strict";
        e.exports = l;
        var r, i = o(3), n = o(38);

        function s(e, t, o) {
            this.fn = e, this.len = t, this.next = void 0, this.val = o
        }

        function a() {
        }

        function u(e) {
            this.head = e.head, this.tail = e.tail, this.len = e.len, this.next = e.states
        }

        function l() {
            this.len = 0, this.head = new s(a, 0, 0), this.tail = this.head, this.states = null
        }

        function p(e, t, o) {
            t[o] = 255 & e
        }

        function c(e, t) {
            this.len = e, this.next = void 0, this.val = t
        }

        function h(e, t, o) {
            for (; e.hi;) t[o++] = 127 & e.lo | 128, e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0, e.hi >>>= 7;
            for (; e.lo > 127;) t[o++] = 127 & e.lo | 128, e.lo = e.lo >>> 7;
            t[o++] = e.lo
        }

        function d(e, t, o) {
            t[o] = 255 & e, t[o + 1] = e >>> 8 & 255, t[o + 2] = e >>> 16 & 255, t[o + 3] = e >>> 24
        }

        l.create = i.Buffer ? function () {
            return (l.create = function () {
                return new (void 0)
            })()
        } : function () {
            return new l
        }, l.alloc = function (e) {
            return new i.Array(e)
        }, i.Array !== Array && (l.alloc = i.pool(l.alloc, i.Array.prototype.subarray)), l.prototype._push = function (e, t, o) {
            return this.tail = this.tail.next = new s(e, t, o), this.len += t, this
        }, c.prototype = Object.create(s.prototype), c.prototype.fn = function (e, t, o) {
            for (; e > 127;) t[o++] = 127 & e | 128, e >>>= 7;
            t[o] = e
        }, l.prototype.uint32 = function (e) {
            return this.len += (this.tail = this.tail.next = new c((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len, this
        }, l.prototype.int32 = function (e) {
            return e < 0 ? this._push(h, 10, r.fromNumber(e)) : this.uint32(e)
        }, l.prototype.sint32 = function (e) {
            return this.uint32((e << 1 ^ e >> 31) >>> 0)
        }, l.prototype.uint64 = function (e) {
            var t = r.from(e);
            return this._push(h, t.length(), t)
        }, l.prototype.int64 = l.prototype.uint64, l.prototype.sint64 = function (e) {
            var t = r.from(e).zzEncode();
            return this._push(h, t.length(), t)
        }, l.prototype.bool = function (e) {
            return this._push(p, 1, e ? 1 : 0)
        }, l.prototype.fixed32 = function (e) {
            return this._push(d, 4, e >>> 0)
        }, l.prototype.sfixed32 = l.prototype.fixed32, l.prototype.fixed64 = function (e) {
            var t = r.from(e);
            return this._push(d, 4, t.lo)._push(d, 4, t.hi)
        }, l.prototype.sfixed64 = l.prototype.fixed64, l.prototype.float = function (e) {
            return this._push(i.float.writeFloatLE, 4, e)
        }, l.prototype.double = function (e) {
            return this._push(i.float.writeDoubleLE, 8, e)
        };
        var f = i.Array.prototype.set ? function (e, t, o) {
            t.set(e, o)
        } : function (e, t, o) {
            for (var r = 0; r < e.length; ++r) t[o + r] = e[r]
        };
        l.prototype.bytes = function (e) {
            var t = e.length >>> 0;
            if (!t) return this._push(p, 1, 0);
            if (i.isString(e)) {
                var o = l.alloc(t = n.length(e));
                n.write(e, o, 0), e = o
            }
            return this.uint32(t)._push(f, t, e)
        }, l.prototype.string = function (e) {
            var t = n.length(e);
            return t ? this.uint32(t)._push(n.write, t, e) : this._push(p, 1, 0)
        }, l.prototype.fork = function () {
            return this.states = new u(this), this.head = this.tail = new s(a, 0, 0), this.len = 0, this
        }, l.prototype.reset = function () {
            return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new s(a, 0, 0), this.len = 0), this
        }, l.prototype.ldelim = function () {
            var e = this.head, t = this.tail, o = this.len;
            return this.reset().uint32(o), o && (this.tail.next = e.next, this.tail = t, this.len += o), this
        }, l.prototype.finish = function () {
            for (var e = this.head.next, t = this.constructor.alloc(this.len), o = 0; e;) e.fn(e.val, t, o), o += e.len, e = e.next;
            return t
        }, l._configure = function () {
            r = o(65), o(95), n = o(38)
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = {}
    }, function (e, t, o) {
        "use strict";
        var r = e.exports;
        r.length = function (e) {
            var t = e.length;
            if (!t) return 0;
            for (var o = 0; --t % 4 > 1 && "=" === e.charAt(t);) ++o;
            return Math.ceil(3 * e.length) / 4 - o
        };
        for (var i = new Array(64), n = new Array(123), s = 0; s < 64;) n[i[s] = s < 26 ? s + 65 : s < 52 ? s + 71 : s < 62 ? s - 4 : s - 59 | 43] = s++;
        r.encode = function (e, t, o) {
            for (var r, n = null, s = [], a = 0, u = 0; t < o;) {
                var l = e[t++];
                switch (u) {
                    case 0:
                        s[a++] = i[l >> 2], r = (3 & l) << 4, u = 1;
                        break;
                    case 1:
                        s[a++] = i[r | l >> 4], r = (15 & l) << 2, u = 2;
                        break;
                    case 2:
                        s[a++] = i[r | l >> 6], s[a++] = i[63 & l], u = 0
                }
                a > 8191 && ((n || (n = [])).push(String.fromCharCode.apply(String, s)), a = 0)
            }
            return u && (s[a++] = i[r], s[a++] = 61, 1 === u && (s[a++] = 61)), n ? (a && n.push(String.fromCharCode.apply(String, s.slice(0, a))), n.join("")) : String.fromCharCode.apply(String, s.slice(0, a))
        };
        r.decode = function (e, t, o) {
            for (var r, i = o, s = 0, a = 0; a < e.length;) {
                var u = e.charCodeAt(a++);
                if (61 === u && s > 1) break;
                if (void 0 === (u = n[u])) throw Error("invalid encoding");
                switch (s) {
                    case 0:
                        r = u, s = 1;
                        break;
                    case 1:
                        t[o++] = r << 2 | (48 & u) >> 4, r = u, s = 2;
                        break;
                    case 2:
                        t[o++] = (15 & r) << 4 | (60 & u) >> 2, r = u, s = 3;
                        break;
                    case 3:
                        t[o++] = (3 & r) << 6 | u, s = 0
                }
            }
            if (1 === s) throw Error("invalid encoding");
            return o - i
        }, r.test = function (e) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)
        }
    }, function (e, t, o) {
        "use strict";
        var r, i, n, s, a, u, l, p, c, h, d;
        e.exports = T, T.filename = null, T.defaults = {keepCase: !1};
        var f = /^[1-9][0-9]*$/, y = /^-?[1-9][0-9]*$/, m = /^0[x][0-9a-fA-F]+$/, g = /^-?0[x][0-9a-fA-F]+$/,
            v = /^0[0-7]+$/, _ = /^-?0[0-7]+$/, E = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
            N = /^[a-zA-Z_][a-zA-Z_0-9]*$/, O = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
            b = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;

        function T(e, t, o) {
            t instanceof i || (o = t, t = new i), o || (o = T.defaults);
            var I, R, C, S, w, A = r(e, o.alternateCommentMode || !1), k = A.next, x = A.push, j = A.peek, M = A.skip,
                U = A.cmnt, B = !0, L = !1, D = t, P = o.keepCase ? function (e) {
                    return e
                } : d.camelCase;

            function F(e, t, o) {
                var r = T.filename;
                return o || (T.filename = null), Error("illegal " + (t || "token") + " '" + e + "' (" + (r ? r + ", " : "") + "line " + A.line + ")")
            }

            function W() {
                var e, t = [];
                do {
                    if ('"' !== (e = k()) && "'" !== e) throw F(e);
                    t.push(k()), M(e), e = j()
                } while ('"' === e || "'" === e);
                return t.join("")
            }

            function G(e) {
                var t = k();
                switch (t) {
                    case"'":
                    case'"':
                        return x(t), W();
                    case"true":
                    case"TRUE":
                        return !0;
                    case"false":
                    case"FALSE":
                        return !1
                }
                try {
                    return function (e, t) {
                        var o = 1;
                        "-" === e.charAt(0) && (o = -1, e = e.substring(1));
                        switch (e) {
                            case"inf":
                            case"INF":
                            case"Inf":
                                return o * (1 / 0);
                            case"nan":
                            case"NAN":
                            case"Nan":
                            case"NaN":
                                return NaN;
                            case"0":
                                return 0
                        }
                        if (f.test(e)) return o * parseInt(e, 10);
                        if (m.test(e)) return o * parseInt(e, 16);
                        if (v.test(e)) return o * parseInt(e, 8);
                        if (E.test(e)) return o * parseFloat(e);
                        throw F(e, "number", t)
                    }(t, !0)
                } catch (o) {
                    if (e && O.test(t)) return t;
                    throw F(t, "value")
                }
            }

            function q(e, t) {
                var o, r;
                do {
                    !t || '"' !== (o = j()) && "'" !== o ? e.push([r = z(k()), M("to", !0) ? z(k()) : r]) : e.push(W())
                } while (M(",", !0));
                M(";")
            }

            function z(e, t) {
                switch (e) {
                    case"max":
                    case"MAX":
                    case"Max":
                        return 536870911;
                    case"0":
                        return 0
                }
                if (!t && "-" === e.charAt(0)) throw F(e, "id");
                if (y.test(e)) return parseInt(e, 10);
                if (g.test(e)) return parseInt(e, 16);
                if (_.test(e)) return parseInt(e, 8);
                throw F(e, "id")
            }

            function K() {
                if (void 0 !== I) throw F("package");
                if (I = k(), !O.test(I)) throw F(I, "name");
                D = D.define(I), M(";")
            }

            function V() {
                var e, t = j();
                switch (t) {
                    case"weak":
                        e = C || (C = []), k();
                        break;
                    case"public":
                        k();
                    default:
                        e = R || (R = [])
                }
                t = W(), M(";"), e.push(t)
            }

            function J() {
                if (M("="), S = W(), !(L = "proto3" === S) && "proto2" !== S) throw F(S, "syntax");
                M(";")
            }

            function H(e, t) {
                switch (t) {
                    case"option":
                        return Y(e, t), M(";"), !0;
                    case"message":
                        return function (e, t) {
                            if (!N.test(t = k())) throw F(t, "type name");
                            var o = new n(t);
                            $(o, (function (e) {
                                if (!H(o, e)) switch (e) {
                                    case"map":
                                        !function (e) {
                                            M("<");
                                            var t = k();
                                            if (void 0 === h.mapKey[t]) throw F(t, "type");
                                            M(",");
                                            var o = k();
                                            if (!O.test(o)) throw F(o, "type");
                                            M(">");
                                            var r = k();
                                            if (!N.test(r)) throw F(r, "name");
                                            M("=");
                                            var i = new a(P(r), z(k()), t, o);
                                            $(i, (function (e) {
                                                if ("option" !== e) throw F(e);
                                                Y(i, e), M(";")
                                            }), (function () {
                                                ee(i)
                                            })), e.add(i)
                                        }(o);
                                        break;
                                    case"required":
                                    case"optional":
                                    case"repeated":
                                        Z(o, e);
                                        break;
                                    case"oneof":
                                        !function (e, t) {
                                            if (!N.test(t = k())) throw F(t, "name");
                                            var o = new u(P(t));
                                            $(o, (function (e) {
                                                "option" === e ? (Y(o, e), M(";")) : (x(e), Z(o, "optional"))
                                            })), e.add(o)
                                        }(o, e);
                                        break;
                                    case"extensions":
                                        q(o.extensions || (o.extensions = []));
                                        break;
                                    case"reserved":
                                        q(o.reserved || (o.reserved = []), !0);
                                        break;
                                    default:
                                        if (!L || !O.test(e)) throw F(e);
                                        x(e), Z(o, "optional")
                                }
                            })), e.add(o)
                        }(e, t), !0;
                    case"enum":
                        return function (e, t) {
                            if (!N.test(t = k())) throw F(t, "name");
                            var o = new l(t);
                            $(o, (function (e) {
                                switch (e) {
                                    case"option":
                                        Y(o, e), M(";");
                                        break;
                                    case"reserved":
                                        q(o.reserved || (o.reserved = []), !0);
                                        break;
                                    default:
                                        !function (e, t) {
                                            if (!N.test(t)) throw F(t, "name");
                                            M("=");
                                            var o = z(k(), !0), r = {};
                                            $(r, (function (e) {
                                                if ("option" !== e) throw F(e);
                                                Y(r, e), M(";")
                                            }), (function () {
                                                ee(r)
                                            })), e.add(t, o, r.comment)
                                        }(o, e)
                                }
                            })), e.add(o)
                        }(e, t), !0;
                    case"service":
                        return function (e, t) {
                            if (!N.test(t = k())) throw F(t, "service name");
                            var o = new p(t);
                            $(o, (function (e) {
                                if (!H(o, e)) {
                                    if ("rpc" !== e) throw F(e);
                                    !function (e, t) {
                                        var o = t;
                                        if (!N.test(t = k())) throw F(t, "name");
                                        var r, i, n, s, a = t;
                                        M("("), M("stream", !0) && (i = !0);
                                        if (!O.test(t = k())) throw F(t);
                                        r = t, M(")"), M("returns"), M("("), M("stream", !0) && (s = !0);
                                        if (!O.test(t = k())) throw F(t);
                                        n = t, M(")");
                                        var u = new c(a, o, r, n, i, s);
                                        $(u, (function (e) {
                                            if ("option" !== e) throw F(e);
                                            Y(u, e), M(";")
                                        })), e.add(u)
                                    }(o, e)
                                }
                            })), e.add(o)
                        }(e, t), !0;
                    case"extend":
                        return function (e, t) {
                            if (!O.test(t = k())) throw F(t, "reference");
                            var o = t;
                            $(null, (function (t) {
                                switch (t) {
                                    case"required":
                                    case"repeated":
                                    case"optional":
                                        Z(e, t, o);
                                        break;
                                    default:
                                        if (!L || !O.test(t)) throw F(t);
                                        x(t), Z(e, "optional", o)
                                }
                            }))
                        }(e, t), !0
                }
                return !1
            }

            function $(e, t, o) {
                var r = A.line;
                if (e && (e.comment = U(), e.filename = T.filename), M("{", !0)) {
                    for (var i; "}" !== (i = k());) t(i);
                    M(";", !0)
                } else o && o(), M(";"), e && "string" != typeof e.comment && (e.comment = U(r))
            }

            function Z(e, t, o) {
                var r = k();
                if ("group" !== r) {
                    if (!O.test(r)) throw F(r, "type");
                    var i = k();
                    if (!N.test(i)) throw F(i, "name");
                    i = P(i), M("=");
                    var a = new s(i, z(k()), r, t, o);
                    $(a, (function (e) {
                        if ("option" !== e) throw F(e);
                        Y(a, e), M(";")
                    }), (function () {
                        ee(a)
                    })), e.add(a), L || !a.repeated || void 0 === h.packed[r] && void 0 !== h.basic[r] || a.setOption("packed", !1, !0)
                } else !function (e, t) {
                    var o = k();
                    if (!N.test(o)) throw F(o, "name");
                    var r = d.lcFirst(o);
                    o === r && (o = d.ucFirst(o));
                    M("=");
                    var i = z(k()), a = new n(o);
                    a.group = !0;
                    var u = new s(r, i, o, t);
                    u.filename = T.filename, $(a, (function (e) {
                        switch (e) {
                            case"option":
                                Y(a, e), M(";");
                                break;
                            case"required":
                            case"optional":
                            case"repeated":
                                Z(a, e);
                                break;
                            default:
                                throw F(e)
                        }
                    })), e.add(a).add(u)
                }(e, t)
            }

            function Y(e, t) {
                var o = M("(", !0);
                if (!O.test(t = k())) throw F(t, "name");
                var r = t;
                o && (M(")"), r = "(" + r + ")", t = j(), b.test(t) && (r += t, k())), M("="), X(e, r)
            }

            function X(e, t) {
                if (M("{", !0)) do {
                    if (!N.test(w = k())) throw F(w, "name");
                    "{" === j() ? X(e, t + "." + w) : (M(":"), "{" === j() ? X(e, t + "." + w) : Q(e, t + "." + w, G(!0)))
                } while (!M("}", !0)); else Q(e, t, G(!0))
            }

            function Q(e, t, o) {
                e.setOption && e.setOption(t, o)
            }

            function ee(e) {
                if (M("[", !0)) {
                    do {
                        Y(e, "option")
                    } while (M(",", !0));
                    M("]")
                }
                return e
            }

            for (; null !== (w = k());) switch (w) {
                case"package":
                    if (!B) throw F(w);
                    K();
                    break;
                case"import":
                    if (!B) throw F(w);
                    V();
                    break;
                case"syntax":
                    if (!B) throw F(w);
                    J();
                    break;
                case"option":
                    if (!B) throw F(w);
                    Y(D, w), M(";");
                    break;
                default:
                    if (H(D, w)) {
                        B = !1;
                        continue
                    }
                    throw F(w)
            }
            return T.filename = null, {package: I, imports: R, weakImports: C, syntax: S, root: t}
        }

        T._configure = function () {
            r = o(97), i = o(39), n = o(22), s = o(16), a = o(66), u = o(33), l = o(10), p = o(40), c = o(67), h = o(24), d = o(3)
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = d;
        var r = /[\s{}=;:[\],'"()<>]/g, i = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g, n = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
            s = /^ *[*/]+ */, a = /^\s*\*?\/*/, u = /\n/g, l = /\s/, p = /\\(.?)/g,
            c = {0: "\0", r: "\r", n: "\n", t: "\t"};

        function h(e) {
            return e.replace(p, (function (e, t) {
                switch (t) {
                    case"\\":
                    case"":
                        return t;
                    default:
                        return c[t] || ""
                }
            }))
        }

        function d(e, t) {
            e = e.toString();
            var o = 0, p = e.length, c = 1, d = null, f = null, y = 0, m = !1, g = [], v = null;

            function _(e) {
                return Error("illegal " + e + " (line " + c + ")")
            }

            function E(t) {
                return e.charAt(t)
            }

            function N(o, r) {
                d = e.charAt(o++), y = c, m = !1;
                var i, n = o - (t ? 2 : 3);
                do {
                    if (--n < 0 || "\n" === (i = e.charAt(n))) {
                        m = !0;
                        break
                    }
                } while (" " === i || "\t" === i);
                for (var l = e.substring(o, r).split(u), p = 0; p < l.length; ++p) l[p] = l[p].replace(t ? a : s, "").trim();
                f = l.join("\n").trim()
            }

            function O(t) {
                var o = b(t), r = e.substring(t, o);
                return /^\s*\/{1,2}/.test(r)
            }

            function b(e) {
                for (var t = e; t < p && "\n" !== E(t);) t++;
                return t
            }

            function T() {
                if (g.length > 0) return g.shift();
                if (v) return function () {
                    var t = "'" === v ? n : i;
                    t.lastIndex = o - 1;
                    var r = t.exec(e);
                    if (!r) throw _("string");
                    return o = t.lastIndex, I(v), v = null, h(r[1])
                }();
                var s, a, u, d, f;
                do {
                    if (o === p) return null;
                    for (s = !1; l.test(u = E(o));) if ("\n" === u && ++c, ++o === p) return null;
                    if ("/" === E(o)) {
                        if (++o === p) throw _("comment");
                        if ("/" === E(o)) if (t) {
                            if (d = o, f = !1, O(o)) {
                                f = !0;
                                do {
                                    if ((o = b(o)) === p) break;
                                    o++
                                } while (O(o))
                            } else o = Math.min(p, b(o) + 1);
                            f && N(d, o), c++, s = !0
                        } else {
                            for (f = "/" === E(d = o + 1); "\n" !== E(++o);) if (o === p) return null;
                            ++o, f && N(d, o - 1), ++c, s = !0
                        } else {
                            if ("*" !== (u = E(o))) return "/";
                            d = o + 1, f = t || "*" === E(d);
                            do {
                                if ("\n" === u && ++c, ++o === p) throw _("comment");
                                a = u, u = E(o)
                            } while ("*" !== a || "/" !== u);
                            ++o, f && N(d, o - 2), s = !0
                        }
                    }
                } while (s);
                var y = o;
                if (r.lastIndex = 0, !r.test(E(y++))) for (; y < p && !r.test(E(y));) ++y;
                var m = e.substring(o, o = y);
                return '"' !== m && "'" !== m || (v = m), m
            }

            function I(e) {
                g.push(e)
            }

            function R() {
                if (!g.length) {
                    var e = T();
                    if (null === e) return null;
                    I(e)
                }
                return g[0]
            }

            return Object.defineProperty({
                next: T, peek: R, push: I, skip: function (e, t) {
                    var o = R();
                    if (o === e) return T(), !0;
                    if (!t) throw _("token '" + o + "', '" + e + "' expected");
                    return !1
                }, cmnt: function (e) {
                    var o = null;
                    return void 0 === e ? y === c - 1 && (t || "*" === d || m) && (o = f) : (y < e && R(), y !== e || m || !t && "/" !== d || (o = f)), o
                }
            }, "line", {
                get: function () {
                    return c
                }
            })
        }

        d.unescape = h
    }, function (e, t, o) {
        "use strict";
        e.exports = i;
        var r = o(3);

        function i(e, t, o) {
            if ("function" != typeof e) throw TypeError("rpcImpl must be a function");
            r.EventEmitter.call(this), this.rpcImpl = e, this.requestDelimited = Boolean(t), this.responseDelimited = Boolean(o)
        }

        (i.prototype = Object.create(r.EventEmitter.prototype)).constructor = i, i.prototype.rpcCall = function e(t, o, i, n, s) {
            if (!n) throw TypeError("request must be specified");
            var a = this;
            if (!s) return r.asPromise(e, a, t, o, i, n);
            if (a.rpcImpl) try {
                return a.rpcImpl(t, o[a.requestDelimited ? "encodeDelimited" : "encode"](n).finish(), (function (e, o) {
                    if (e) return a.emit("error", e, t), s(e);
                    if (null !== o) {
                        if (!(o instanceof i)) try {
                            o = i[a.responseDelimited ? "decodeDelimited" : "decode"](o)
                        } catch (e) {
                            return a.emit("error", e, t), s(e)
                        }
                        return a.emit("data", o, t), s(null, o)
                    }
                    a.end(!0)
                }))
            } catch (e) {
                return a.emit("error", e, t), void setTimeout((function () {
                    s(e)
                }), 0)
            } else setTimeout((function () {
                s(Error("already ended"))
            }), 0)
        }, i.prototype.end = function (e) {
            return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = n;
        var r, i = /\/|\./;

        function n(e, t) {
            i.test(e) || (e = "google/protobuf/" + e + ".proto", t = {nested: {google: {nested: {protobuf: {nested: t}}}}}), n[e] = t
        }

        n("any", {
            Any: {
                fields: {
                    type_url: {type: "string", id: 1},
                    value: {type: "bytes", id: 2}
                }
            }
        }), n("duration", {
            Duration: r = {
                fields: {
                    seconds: {type: "int64", id: 1},
                    nanos: {type: "int32", id: 2}
                }
            }
        }), n("timestamp", {Timestamp: r}), n("empty", {Empty: {fields: {}}}), n("struct", {
            Struct: {
                fields: {
                    fields: {
                        keyType: "string",
                        type: "Value",
                        id: 1
                    }
                }
            },
            Value: {
                oneofs: {kind: {oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]}},
                fields: {
                    nullValue: {type: "NullValue", id: 1},
                    numberValue: {type: "double", id: 2},
                    stringValue: {type: "string", id: 3},
                    boolValue: {type: "bool", id: 4},
                    structValue: {type: "Struct", id: 5},
                    listValue: {type: "ListValue", id: 6}
                }
            },
            NullValue: {values: {NULL_VALUE: 0}},
            ListValue: {fields: {values: {rule: "repeated", type: "Value", id: 1}}}
        }), n("wrappers", {
            DoubleValue: {fields: {value: {type: "double", id: 1}}},
            FloatValue: {fields: {value: {type: "float", id: 1}}},
            Int64Value: {fields: {value: {type: "int64", id: 1}}},
            UInt64Value: {fields: {value: {type: "uint64", id: 1}}},
            Int32Value: {fields: {value: {type: "int32", id: 1}}},
            UInt32Value: {fields: {value: {type: "uint32", id: 1}}},
            BoolValue: {fields: {value: {type: "bool", id: 1}}},
            StringValue: {fields: {value: {type: "string", id: 1}}},
            BytesValue: {fields: {value: {type: "bytes", id: 1}}}
        }), n("field_mask", {
            FieldMask: {
                fields: {
                    paths: {
                        rule: "repeated",
                        type: "string",
                        id: 1
                    }
                }
            }
        }), n.get = function (e) {
            return n[e] || null
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = a;
        var r, i, n = o(3);

        function s(e, t) {
            return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len)
        }

        function a(e) {
            this.buf = e, this.pos = 0, this.len = e.length
        }

        var u, l = "undefined" != typeof Uint8Array ? function (e) {
            return e instanceof Uint8Array || Array.isArray(e) ? new a(e) : "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? new a(new Uint8Array(e)) : void console.warn('"illegal buffer"')
        } : function (e) {
            if (Array.isArray(e)) return new a(e);
            console.warn('"illegal buffer"')
        };

        function p() {
            var e = new r(0, 0), t = 0;
            if (!(this.len - this.pos > 4)) {
                for (; t < 3; ++t) {
                    if (this.pos >= this.len) throw s(this);
                    if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e
                }
                return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0, e
            }
            for (; t < 4; ++t) if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e;
            if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0, e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return e;
            if (t = 0, this.len - this.pos > 4) {
                for (; t < 5; ++t) if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e
            } else for (; t < 5; ++t) {
                if (this.pos >= this.len) throw s(this);
                if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e
            }
            throw Error("invalid varint encoding")
        }

        function c(e, t) {
            return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0
        }

        function h() {
            if (this.pos + 8 > this.len) throw s(this, 8);
            return new r(c(this.buf, this.pos += 4), c(this.buf, this.pos += 4))
        }

        a.create = n.Buffer ? function (e) {
            return (a.create = function (e) {
                return n.Buffer.isBuffer(e) ? new (void 0)(e) : l(e)
            })(e)
        } : l, a.prototype._slice = n.Array.prototype.subarray || n.Array.prototype.slice, a.prototype.uint32 = (u = 4294967295, function () {
            if (u = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return u;
            if (u = (u | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return u;
            if (u = (u | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return u;
            if (u = (u | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return u;
            if (u = (u | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return u;
            if ((this.pos += 5) > this.len) throw this.pos = this.len, s(this, 10);
            return u
        }), a.prototype.int32 = function () {
            return 0 | this.uint32()
        }, a.prototype.sint32 = function () {
            var e = this.uint32();
            return e >>> 1 ^ -(1 & e) | 0
        }, a.prototype.bool = function () {
            return 0 !== this.uint32()
        }, a.prototype.fixed32 = function () {
            if (this.pos + 4 > this.len) throw s(this, 4);
            return c(this.buf, this.pos += 4)
        }, a.prototype.sfixed32 = function () {
            if (this.pos + 4 > this.len) throw s(this, 4);
            return 0 | c(this.buf, this.pos += 4)
        }, a.prototype.float = function () {
            if (this.pos + 4 > this.len) throw s(this, 4);
            var e = n.float.readFloatLE(this.buf, this.pos);
            return this.pos += 4, e
        }, a.prototype.double = function () {
            if (this.pos + 8 > this.len) throw s(this, 4);
            var e = n.float.readDoubleLE(this.buf, this.pos);
            return this.pos += 8, e
        }, a.prototype.bytes = function () {
            var e = this.uint32(), t = this.pos, o = this.pos + e;
            if (o > this.len) throw s(this, e);
            return this.pos += e, Array.isArray(this.buf) ? this.buf.slice(t, o) : t === o ? new this.buf.constructor(0) : this._slice.call(this.buf, t, o)
        }, a.prototype.string = function () {
            var e = this.bytes();
            return i.read(e, 0, e.length)
        }, a.prototype.skip = function (e) {
            if ("number" == typeof e) {
                if (this.pos + e > this.len) throw s(this, e);
                this.pos += e
            } else do {
                if (this.pos >= this.len) throw s(this)
            } while (128 & this.buf[this.pos++]);
            return this
        }, a.prototype.skipType = function (e) {
            switch (e) {
                case 0:
                    this.skip();
                    break;
                case 1:
                    this.skip(8);
                    break;
                case 2:
                    this.skip(this.uint32());
                    break;
                case 3:
                    for (; ;) {
                        if (4 == (e = 7 & this.uint32())) break;
                        this.skipType(e)
                    }
                    break;
                case 5:
                    this.skip(4);
                    break;
                default:
                    throw Error("invalid wire type " + e + " at offset " + this.pos)
            }
            return this
        }, a._configure = function () {
            r = o(65), i = o(38);
            var e = n.Long ? "toLong" : "toNumber";
            n.merge(a.prototype, {
                int64: function () {
                    return p.call(this)[e](!1)
                }, uint64: function () {
                    return p.call(this)[e](!0)
                }, sint64: function () {
                    return p.call(this).zzDecode()[e](!1)
                }, fixed64: function () {
                    return h.call(this)[e](!0)
                }, sfixed64: function () {
                    return h.call(this)[e](!1)
                }
            })
        }
    }, function (e, t, o) {
        "use strict";
        var r, i, n = o(0)(o(5));

        function s(e, t) {
            return e.name + ": " + t + (e.repeated && "array" !== t ? "[]" : e.map && "object" !== t ? "{k:" + e.keyType + "}" : "") + " expected"
        }

        function a(e, t, o, n) {
            var a = n.types;
            if (e.resolvedType) if (e.resolvedType instanceof r) {
                if (Object.keys(e.resolvedType.values).indexOf(o) < 0) return s(e, "enum value")
            } else {
                var u = a[t].verify(o);
                if (u) return e.name + "." + u
            } else switch (e.type) {
                case"int32":
                case"uint32":
                case"sint32":
                case"fixed32":
                case"sfixed32":
                    if (!i.isInteger(o)) return s(e, "integer");
                    break;
                case"int64":
                case"uint64":
                case"sint64":
                case"fixed64":
                case"sfixed64":
                    if (!(i.isInteger(o) || o && i.isInteger(o.low) && i.isInteger(o.high))) return s(e, "integer|Long");
                    break;
                case"float":
                case"double":
                    if ("number" != typeof o) return s(e, "number");
                    break;
                case"bool":
                    if ("boolean" != typeof o) return s(e, "boolean");
                    break;
                case"string":
                    if (!i.isString(o)) return s(e, "string");
                    break;
                case"bytes":
                    if (!(o && "number" == typeof o.length || i.isString(o))) return s(e, "buffer")
            }
        }

        function u(e, t) {
            switch (e.keyType) {
                case"int32":
                case"uint32":
                case"sint32":
                case"fixed32":
                case"sfixed32":
                    if (!i.key32Re.test(t)) return s(e, "integer key");
                    break;
                case"int64":
                case"uint64":
                case"sint64":
                case"fixed64":
                case"sfixed64":
                    if (!i.key64Re.test(t)) return s(e, "integer|Long key");
                    break;
                case"bool":
                    if (!i.key2Re.test(t)) return s(e, "boolean key")
            }
        }

        function l(e) {
            return function (t) {
                return function (o) {
                    var r;
                    if ("object" !== (0, n.default)(o) || null === o) return "object expected";
                    var l, p = {};
                    e.oneofsArray.length && (l = {});
                    for (var c = 0; c < e.fieldsArray.length; ++c) {
                        var h, d = e._fieldsArray[c].resolve(), f = o[d.name];
                        if (!d.optional || null != f && o.hasOwnProperty(d.name)) if (d.map) {
                            if (!i.isObject(f)) return s(d, "object");
                            var y = Object.keys(f);
                            for (h = 0; h < y.length; ++h) {
                                if (r = u(d, y[h])) return r;
                                if (r = a(d, c, f[y[h]], t)) return r
                            }
                        } else if (d.repeated) {
                            if (!Array.isArray(f)) return s(d, "array");
                            for (h = 0; h < f.length; ++h) if (r = a(d, c, f[h], t)) return r
                        } else {
                            if (d.partOf) {
                                var m = d.partOf.name;
                                if (1 === p[d.partOf.name] && 1 === l[m]) return d.partOf.name + ": multiple values";
                                l[m] = 1
                            }
                            if (r = a(d, c, f, t)) return r
                        }
                    }
                }
            }
        }

        e.exports = l, l._configure = function () {
            r = o(10), i = o(3)
        }
    }, function (e, t, o) {
        "use strict";
        var r, i;

        function n(e) {
            return function (t) {
                var o = t.Writer, n = t.types, s = t.util;
                return function (t, a) {
                    a = a || o.create();
                    for (var u = e.fieldsArray.slice().sort(s.compareFieldsById), l = 0; l < u.length; l++) {
                        var p = u[l], c = e._fieldsArray.indexOf(p),
                            h = p.resolvedType instanceof r ? "uint32" : p.type, d = i.basic[h], f = t[p.name];
                        if (p.resolvedType instanceof r && "string" == typeof f && (f = n[c].values[f]), p.map) {
                            if (null != f && t.hasOwnProperty(p.name)) for (var y = Object.keys(f), m = 0; m < y.length; ++m) a.uint32((p.id << 3 | 2) >>> 0).fork().uint32(8 | i.mapKey[p.keyType])[p.keyType](y[m]), void 0 === d ? n[c].encode(f[y[m]], a.uint32(18).fork()).ldelim().ldelim() : a.uint32(16 | d)[h](f[y[m]]).ldelim()
                        } else if (p.repeated) {
                            if (f && f.length) if (p.packed && void 0 !== i.packed[h]) {
                                a.uint32((p.id << 3 | 2) >>> 0).fork();
                                for (var g = 0; g < f.length; g++) a[h](f[g]);
                                a.ldelim()
                            } else for (var v = 0; v < f.length; v++) void 0 === d ? p.resolvedType.group ? n[c].encode(f[v], a.uint32((p.id << 3 | 3) >>> 0)).uint32((p.id << 3 | 4) >>> 0) : n[c].encode(f[v], a.uint32((p.id << 3 | 2) >>> 0).fork()).ldelim() : a.uint32((p.id << 3 | d) >>> 0)[h](f[v])
                        } else (!p.optional || null != f && t.hasOwnProperty(p.name)) && (p.optional || null != f && t.hasOwnProperty(p.name) || console.warn("?????????!!!????????????????????? ??????:", t.$type ? t.$type.name : "?????????", "???????????????????????????:", p.name, "???????????????proto????????????????????????required"), void 0 === d ? p.resolvedType.group ? n[c].encode(f, a.uint32((p.id << 3 | 3) >>> 0)).uint32((p.id << 3 | 4) >>> 0) : n[c].encode(f, a.uint32((p.id << 3 | 2) >>> 0).fork()).ldelim() : a.uint32((p.id << 3 | d) >>> 0)[h](f))
                    }
                    return a
                }
            }
        }

        e.exports = n, n._configure = function () {
            r = o(10), i = o(24)
        }
    }, function (e, t, o) {
        "use strict";
        var r, i, n, s = o(0)(o(5));

        function a(e) {
            return "missing required '" + e.name + "'"
        }

        function u(e) {
            return function (t) {
                var o = t.Reader, u = t.types, l = t.util;
                return function (t, p) {
                    t instanceof o || (t = o.create(t));
                    for (var c, h = void 0 === p ? t.len : t.pos + p, d = new this.ctor; t.pos < h;) {
                        var f = t.uint32();
                        if (e.group && 4 == (7 & f)) break;
                        for (var y = f >>> 3, m = 0, g = !1; m < e.fieldsArray.length; ++m) {
                            var v = e._fieldsArray[m].resolve(), _ = v.name,
                                E = v.resolvedType instanceof r ? "int32" : v.type;
                            if (y == v.id) {
                                if (g = !0, v.map) t.skip().pos++, d[_] === l.emptyObject && (d[_] = {}), c = t[v.keyType](), t.pos++, null != i.long[v.keyType] ? null == i.basic[E] ? d[_]["object" === (0, s.default)(c) ? l.longToHash(c) : c] = u[m].decode(t, t.uint32()) : d[_]["object" === (0, s.default)(c) ? l.longToHash(c) : c] = t[E]() : null == i.basic[E] ? d[_] = u[m].decode(t, t.uint32()) : d[_] = t[E](); else if (v.repeated) if (d[_] && d[_].length || (d[_] = []), null != i.packed[E] && 2 == (7 & f)) for (var N = t.uint32() + t.pos; t.pos < N;) d[_].push(t[E]()); else null == i.basic[E] ? v.resolvedType.group ? d[_].push(u[m].decode(t)) : d[_].push(u[m].decode(t, t.uint32())) : d[_].push(t[E]()); else null == i.basic[E] ? v.resolvedType.group ? d[_] = u[m].decode(t) : d[_] = u[m].decode(t, t.uint32()) : d[_] = t[E]();
                                break
                            }
                        }
                        g || (console.log("t", f), t.skipType(7 & f))
                    }
                    for (m = 0; m < e._fieldsArray.length; ++m) {
                        var O = e._fieldsArray[m];
                        if (O.required && !d.hasOwnProperty(O.name)) throw n.ProtocolError(a(O), {instance: d})
                    }
                    return d
                }
            }
        }

        e.exports = u, u._configure = function () {
            r = o(10), i = o(24), n = o(3)
        }
    }, function (e, t, o) {
        "use strict";
        var r, i = t;
        i[".google.protobuf.Any"] = {
            fromObject: function (e) {
                if (e && e["@type"]) {
                    var t = this.lookup(e["@type"]);
                    if (t) {
                        var o = "." === e["@type"].charAt(0) ? e["@type"].substr(1) : e["@type"];
                        return this.create({type_url: "/" + o, value: t.encode(t.fromObject(e)).finish()})
                    }
                }
                return this.fromObject(e)
            }, toObject: function (e, t) {
                if (t && t.json && e.type_url && e.value) {
                    var o = e.type_url.substring(e.type_url.lastIndexOf("/") + 1), i = this.lookup(o);
                    i && (e = i.decode(e.value))
                }
                if (!(e instanceof this.ctor) && e instanceof r) {
                    var n = e.$type.toObject(e, t);
                    return n["@type"] = e.$type.fullName, n
                }
                return this.toObject(e, t)
            }
        }, i._configure = function () {
            r = o(68)
        }
    }, function (e, t, o) {
        "use strict";
        var r, i, n = o(0)(o(5)), s = e.exports;

        function a(e, t, o, s) {
            var a = s.m, u = s.d, l = s.types, p = s.ksi, c = void 0 !== p;
            if (e.resolvedType) if (e.resolvedType instanceof r) {
                for (var h = c ? u[o][p] : u[o], d = e.resolvedType.values, f = Object.keys(d), y = 0; y < f.length; y++) if (!(e.repeated && d[f[y]] === e.typeDefault || f[y] != h && d[f[y]] != h)) {
                    c ? a[o][p] = d[f[y]] : a[o] = d[f[y]];
                    break
                }
            } else {
                if ("object" !== (0, n.default)(c ? u[o][p] : u[o])) throw TypeError(e.fullName + ": object expected");
                c ? a[o][p] = l[t].fromObject(u[o][p]) : a[o] = l[t].fromObject(u[o])
            } else {
                var m = !1;
                switch (e.type) {
                    case"double":
                    case"float":
                        c ? a[o][p] = Number(u[o][p]) : a[o] = Number(u[o]);
                        break;
                    case"uint32":
                    case"fixed32":
                        c ? a[o][p] = u[o][p] >>> 0 : a[o] = u[o] >>> 0;
                        break;
                    case"int32":
                    case"sint32":
                    case"sfixed32":
                        c ? a[o][p] = 0 | u[o][p] : a[o] = 0 | u[o];
                        break;
                    case"uint64":
                        m = !0;
                    case"int64":
                    case"sint64":
                    case"fixed64":
                    case"sfixed64":
                        i.Long ? c ? a[o][p] = i.Long.fromValue(u[o][p]).unsigned = m : a[o] = i.Long.fromValue(u[o]).unsigned = m : "string" == typeof (c ? u[o][p] : u[o]) ? c ? a[o][p] = parseInt(u[o][p], 10) : a[o] = parseInt(u[o], 10) : "number" == typeof (c ? u[o][p] : u[o]) ? c ? a[o][p] = u[o][p] : a[o] = u[o] : "object" === (0, n.default)(c ? u[o][p] : u[o]) && (c ? a[o][p] = new i.LongBits(u[o][p].low >>> 0, u[o][p].high >>> 0).toNumber(m) : a[o] = new i.LongBits(u[o].low >>> 0, u[o].high >>> 0).toNumber(m));
                        break;
                    case"bytes":
                        "string" == typeof (c ? u[o][p] : u[o]) ? c ? i.base64.decode(u[o][p], a[o][p] = i.newBuffer(i.base64.length(u[o][p])), 0) : i.base64.decode(u[o], a[o] = i.newBuffer(i.base64.length(u[o])), 0) : (c ? u[o][p] : u[o]).length && (c ? a[o][p] = u[o][p] : a[o] = u[o]);
                        break;
                    case"string":
                        c ? a[o][p] = String(u[o][p]) : a[o] = String(u[o]);
                        break;
                    case"bool":
                        c ? a[o][p] = Boolean(u[o][p]) : a[o] = Boolean(u[o])
                }
            }
        }

        function u(e, t, o, n) {
            var s = n.m, a = n.d, u = n.types, l = n.ksi, p = n.o, c = void 0 !== l;
            if (e.resolvedType) e.resolvedType instanceof r ? c ? a[o][l] = p.enums === String ? u[t].values[s[o][l]] : s[o][l] : a[o] = p.enums === String ? u[t].values[s[o]] : s[o] : c ? a[o][l] = u[t].toObject(s[o][l], p) : a[o] = u[t].toObject(s[o], p); else {
                var h = !1;
                switch (e.type) {
                    case"double":
                    case"float":
                        c ? a[o][l] = p.json && !isFinite(s[o][l]) ? String(s[o][l]) : s[o][l] : a[o] = p.json && !isFinite(s[o]) ? String(s[o]) : s[o];
                        break;
                    case"uint64":
                        h = !0;
                    case"int64":
                    case"sint64":
                    case"fixed64":
                    case"sfixed64":
                        "number" == typeof s[o][l] ? c ? a[o][l] = p.longs === String ? String(s[o][l]) : s[o][l] : a[o] = p.longs === String ? String(s[o]) : s[o] : c ? a[o][l] = p.longs === String ? i.Long.prototype.toString.call(s[o][l]) : p.longs === Number ? new i.LongBits(s[o][l].low >>> 0, s[o][l].high >>> 0).toNumber(h) : s[o][l] : a[o] = p.longs === String ? i.Long.prototype.toString.call(s[o]) : p.longs === Number ? new i.LongBits(s[o].low >>> 0, s[o].high >>> 0).toNumber(h) : s[o];
                        break;
                    case"bytes":
                        c ? a[o][l] = p.bytes === String ? i.base64.encode(s[o][l], 0, s[o][l].length) : p.bytes === Array ? Array.prototype.slice.call(s[o][l]) : s[o][l] : a[o] = p.bytes === String ? i.base64.encode(s[o], 0, s[o].length) : p.bytes === Array ? Array.prototype.slice.call(s[o]) : s[o];
                        break;
                    default:
                        c ? a[o][l] = s[o][l] : a[o] = s[o]
                }
            }
        }

        s._configure = function () {
            r = o(10), i = o(3)
        }, s.fromObject = function (e) {
            var t = e.fieldsArray;
            return function (e) {
                return function (o) {
                    if (o instanceof this.ctor) return o;
                    if (!t.length) return new this.ctor;
                    for (var s = new this.ctor, u = 0; u < t.length; ++u) {
                        var l, p = t[u].resolve(), c = p.name;
                        if (p.map) {
                            if (o[c]) {
                                if ("object" !== (0, n.default)(o[c])) throw TypeError(p.fullName + ": object expected");
                                s[c] = {}
                            }
                            var h = Object.keys(o[c]);
                            for (l = 0; l < h.length; ++l) a(p, u, c, i.merge(i.copy(e), {m: s, d: o, ksi: h[l]}))
                        } else if (p.repeated) {
                            if (o[c]) {
                                if (!Array.isArray(o[c])) throw TypeError(p.fullName + ": array expected");
                                for (s[c] = [], l = 0; l < o[c].length; ++l) a(p, u, c, i.merge(i.copy(e), {
                                    m: s,
                                    d: o,
                                    ksi: l
                                }))
                            }
                        } else (p.resolvedType instanceof r || null != o[c]) && a(p, u, c, i.merge(i.copy(e), {
                            m: s,
                            d: o
                        }))
                    }
                    return s
                }
            }
        }, s.toObject = function (e) {
            var t = e.fieldsArray.slice().sort(i.compareFieldsById);
            return function (o) {
                return t.length ? function (n, s) {
                    s = s || {};
                    for (var a, l, p = {}, c = [], h = [], d = [], f = 0; f < t.length; ++f) t[f].partOf || (t[f].resolve().repeated ? c : t[f].map ? h : d).push(t[f]);
                    if (c.length && (s.arrays || s.defaults)) for (f = 0; f < c.length; ++f) p[c[f].name] = [];
                    if (h.length && (s.objects || s.defaults)) for (f = 0; f < h.length; ++f) p[h[f].name] = {};
                    if (d.length && s.defaults) for (f = 0; f < d.length; ++f) if (l = (a = d[f]).name, a.resolvedType instanceof r) p[l] = s.enums = String ? a.resolvedType.valuesById[a.typeDefault] : a.typeDefault; else if (a.long) if (i.Long) {
                        var y = new i.Long(a.typeDefault.low, a.typeDefault.high, a.typeDefault.unsigned);
                        p[l] = s.longs === String ? y.toString() : s.longs === Number ? y.toNumber() : y
                    } else p[l] = s.longs === String ? a.typeDefault.toString() : a.typeDefault.toNumber(); else a.bytes ? p[l] = s.bytes === String ? String.fromCharCode.apply(String, a.typeDefault) : Array.prototype.slice.call(a.typeDefault).join("*..*").split("*..*") : p[l] = a.typeDefault;
                    var m = !1;
                    for (f = 0; f < t.length; ++f) {
                        l = (a = t[f]).name;
                        var g, v, _ = e._fieldsArray.indexOf(a);
                        if (a.map) {
                            if (m || (m = !0), n[l] && (g = Object.keys(n[l]).length)) for (p[l] = {}, v = 0; v < g.length; ++v) u(a, _, l, i.merge(i.copy(o), {
                                m: n,
                                d: p,
                                ksi: g[v],
                                o: s
                            }))
                        } else if (a.repeated) {
                            if (n[l] && n[l].length) for (p[l] = [], v = 0; v < n[l].length; ++v) u(a, _, l, i.merge(i.copy(o), {
                                m: n,
                                d: p,
                                ksi: v,
                                o: s
                            }))
                        } else null != n[l] && n.hasOwnProperty(l) && u(a, _, l, i.merge(i.copy(o), {
                            m: n,
                            d: p,
                            o: s
                        })), a.partOf && s.oneofs && (p[a.partOf.name] = l)
                    }
                    return p
                } : function () {
                    return {}
                }
            }
        }
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i, n = r(o(53)), s = r(o(8)), a = r(o(64)), u = r(o(157)), l = r(o(7)), p = r(o(164)),
            c = r(o(14)).default.getLogger("IM-SDK-LOG"), h = (0, l.default)(), d = (0, a.default)(),
            f = n.default.connection.prototype.root = u.default.Root.fromJSON(d);
        n.default.connection.prototype.getParams({root: f, utils: p.default});
        var y = function (e, t, o) {
            var r = {data: new Uint8Array(e).buffer};
            if (o) return r;
            try {
                i.send(r)
            } catch (e) {
                t.onError({type: h.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR, message: "send message error", data: e})
            }
        }, m = wx || tt || qq || swan;

        function g(e) {
            return m.connectSocket({
                url: e.url, header: {"content-type": "application/json"}, success: function (e) {
                    c.debug("socket????????????")
                }, fail: function (e) {
                    e.errMsg.indexOf("suspend")
                }
            })
        }

        n.default.connection.prototype._base64transform = y, n.default.connection.prototype._getSock = g, n.default.connection.prototype._login = function (e, t) {
            if (e) try {
                if (i = g(t), n.default.connection.prototype.sock = i, i.onOpen((function () {
                    c.debug("onOpen"), t.autoReconnectInterval = 0, t.times = 1, t.autoReconnectNumTotal = 0;
                    var o = [], r = (new Date).valueOf(), i = f.lookup("easemob.pb.Provision"), n = i.decode(o);
                    t.context.jid.clientResource = t.deviceId + "_" + r.toString(), n.compressType = t.compressType, n.encryptType = t.encryptType, n.osType = t.osType, n.version = t.version, n.deviceName = t.deviceId, n.resource = t.deviceId + "_" + r.toString(), n.deviceUuid = r.toString(), n.auth = "$t$" + e.access_token, n = i.encode(n).finish();
                    var s = f.lookup("easemob.pb.MSync"), a = s.decode(o);
                    if (a.version = t.version, a.guid = t.context.jid, a.auth = "$t$" + e.access_token, a.command = 3, a.deviceId = t.deviceId, a.encryptType = t.encryptType, a.payload = n, a = s.encode(a).finish(), y(a), t.logOut = !1, t.offLineSendConnecting = !1, t.unSendMsgArr.length > 0) for (var u in t.unSendMsgArr) {
                        var l = t.unSendMsgArr[u];
                        t.sendMSync(l), delete t.unSendMsgArr[u]
                    }
                })), i.onClose((function (e) {
                    if (console.log("onClose", e), !t.logOut && t.autoReconnectNumTotal < t.autoReconnectNumMax && (t.autoReconnectNumTotal <= t.socketHost.length && t.isHttpDNS || !t.isHttpDNS)) {
                        t.reconnect();
                        var o = {type: h.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected"};
                        t.onError(o)
                    } else if (t.logOut) t.clear(), t.onClosed(); else {
                        o = {type: h.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected"};
                        t.onError(o), t.onClosed()
                    }
                })), i.onMessage((function (e) {
                    var o = f.lookup("easemob.pb.MSync").decode(e.data);
                    switch (console.log("result", o), o.command) {
                        case 0:
                            var r = f.lookup("easemob.pb.CommSyncDL");
                            r = r.decode(o.payload);
                            var i = new s.default(r.serverId.low, r.serverId.high, r.serverId.unsigned).toString(),
                                n = new s.default(r.metaId.low, r.metaId.high, r.metaId.unsigned).toString();
                            if (console.log("CommSyncDLMessage", r), 0 !== r.metas.length) t._metapayload(r.metas, r.status, t), t._lastsession(r.nextKey, r.queue, t); else if (r.isLast) {
                                var a = p.default.checkArray(t._queues, r.queue);
                                !1 !== a && t._queues.splice(a, 1), t._queues.length > 0 && (t._backqueue(t._queues[0], t), this.qTimer && clearTimeout(this.qTimer))
                            } else if (r.status && 0 === r.status.errorCode) {
                                if (t._msgHash[n]) {
                                    try {
                                        t._msgHash[n].success instanceof Function && t._msgHash[n].success(n, i)
                                    } catch (e) {
                                        t.onError({
                                            type: h.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                                            message: "when executing success function error",
                                            data: e
                                        })
                                    }
                                    delete t._msgHash[n]
                                }
                                t.onReceivedMessage({id: n, mid: i})
                            } else if (r.status && 15 === r.status.errorCode) t.onMutedMessage({mid: i}); else if (r.status && 1 === r.status.errorCode) {
                                var u = "";
                                switch (r.status.reason) {
                                    case"blocked":
                                        u = h.PERMISSION_DENIED;
                                        break;
                                    case"group not found":
                                        u = h.GROUP_NOT_EXIST;
                                        break;
                                    case"not in group or chatroom":
                                        u = h.GROUP_NOT_JOINED;
                                        break;
                                    case"exceed recall time limit":
                                        u = h.MESSAGE_RECALL_TIME_LIMIT;
                                        break;
                                    case"message recall disabled":
                                        u = h.SERVICE_NOT_ENABLED;
                                        break;
                                    case"not in group or chatroom white list":
                                        u = h.SERVICE_NOT_ALLOW_MESSAGING;
                                        break;
                                    default:
                                        u = h.SERVER_UNKNOWN_ERROR
                                }
                                t._msgHash[n].fail instanceof Function && t._msgHash[n].fail({
                                    type: u,
                                    reason: r.status.reason ? r.status.reason : "",
                                    data: {id: n, mid: i}
                                })
                            } else if (r.status && 7 === r.status.errorCode && "sensitive words" === r.status.reason) t._msgHash[n].fail instanceof Function && t._msgHash[n].fail({
                                type: h.MESSAGE_INCLUDE_ILLEGAL_CONTENT,
                                data: {id: n, mid: i}
                            }); else if (t._msgHash[n]) {
                                try {
                                    t._msgHash[n].fail instanceof Function && t._msgHash[n].fail({
                                        type: h.WEBIM_LOAD_MSG_ERROR,
                                        data: {
                                            errorCode: r.status && r.status.errorCode,
                                            reason: r.status && r.status.reason
                                        }
                                    })
                                } catch (e) {
                                    t.onError({
                                        type: h.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                                        message: "when executing fail function error",
                                        data: e
                                    })
                                }
                                delete t._msgHash[n]
                            } else t.onError({
                                type: h.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                                message: "on message error"
                            });
                            break;
                        case 1:
                            var l = f.lookup("easemob.pb.CommUnreadDL");
                            if (l = l.decode(o.payload), t.isDebug && console.log("??????CommUnreadDLMessage???", l), console.log("CommUnreadDLMessage", l), 0 === l.unread.length) ; else for (var c = 0; c < l.unread.length; c++) t._backqueue(l.unread[c].queue, t);
                            t._rebuild();
                            break;
                        case 2:
                            var d = f.lookup("easemob.pb.CommNotice").decode(o.payload);
                            if (t.isDebug && console.log("??????noticeMessage???", d), !1 !== p.default.checkArray(t._queues, d.queue)) return;
                            t._queues.push(d.queue), 1 == t._queues.length && t._backqueue(d.queue, t), this.qTimer && clearTimeout(this.qTimer), this.qTimer = setTimeout((function () {
                                var e = d.queue;
                                !1 !== p.default.checkArray(t._queues, e) && (t._backqueue(e, t), t.isDebug && console.log("??????q: ", e, t._queues, d.queue))
                            }), 2e4);
                            break;
                        case 3:
                            t._receiveProvision(o, t), t.isDebug && console.log("??????Provision???", o)
                    }
                })), "" == (e.access_token || "")) return void t.onError({
                    type: h.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
                    message: "token not assign error",
                    data: e
                });
                t.context.accessToken = e.access_token
            } catch (e) {
            }
        }, n.default.logger = c, n.default.version = "_version";
        var v = n.default;
        t.default = v
    }, function (e, t, o) {
        "use strict";
        e.exports = function () {
            var e = {};

            function t(t, o, r) {
                return "function" == typeof o ? (r = o, o = new e.Root) : o || (o = new e.Root), o.load(t, r)
            }

            function r(t, o) {
                return o || (o = new e.Root), o.loadSync(t)
            }

            function i(t, o, r) {
                return "function" == typeof o ? (r = o, o = new e.Root) : o || (o = new e.Root), o.parseFromPbString(t, r)
            }

            function n() {
                e.converter._configure(), e.decoder._configure(), e.encoder._configure(), e.Field._configure(), e.MapField._configure(), e.Message._configure(), e.Namespace._configure(), e.Method._configure(), e.ReflectionObject._configure(), e.OneOf._configure(), e.parse._configure(), e.Reader._configure(), e.Root._configure(), e.Service._configure(), e.verifier._configure(), e.Type._configure(), e.types._configure(), e.wrappers._configure(), e.Writer._configure()
            }

            if (e.build = "minimal", e.Writer = o(93), e.encoder = o(102), e.Reader = o(100), e.util = o(3), e.rpc = o(98), e.roots = o(94), e.verifier = o(101), e.tokenize = o(97), e.parse = o(96), e.common = o(99), e.ReflectionObject = o(23), e.Namespace = o(32), e.Root = o(39), e.Enum = o(10), e.Type = o(22), e.Field = o(16), e.OneOf = o(33), e.MapField = o(66), e.Service = o(40), e.Method = o(67), e.converter = o(105), e.decoder = o(103), e.Message = o(68), e.wrappers = o(104), e.types = o(24), e.util = o(3), e.configure = n, e.load = t, e.loadSync = r, e.parseFromPbString = i, n(), arguments && arguments.length) for (var s = 0; s < arguments.length; s++) {
                var a = arguments[s];
                if (a.hasOwnProperty("exports")) return void (a.exports = e)
            }
            return e
        }()
    }, function (e, t, o) {
        "use strict";
        e.exports = i;
        var r = null;
        try {
            r = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
        } catch (e) {
        }

        function i(e, t, o) {
            this.low = 0 | e, this.high = 0 | t, this.unsigned = !!o
        }

        function n(e) {
            return !0 === (e && e.__isLong__)
        }

        i.prototype.__isLong__, Object.defineProperty(i.prototype, "__isLong__", {value: !0}), i.isLong = n;
        var s = {}, a = {};

        function u(e, t) {
            var o, r, i;
            return t ? (i = 0 <= (e >>>= 0) && e < 256) && (r = a[e]) ? r : (o = p(e, (0 | e) < 0 ? -1 : 0, !0), i && (a[e] = o), o) : (i = -128 <= (e |= 0) && e < 128) && (r = s[e]) ? r : (o = p(e, e < 0 ? -1 : 0, !1), i && (s[e] = o), o)
        }

        function l(e, t) {
            if (isNaN(e)) return t ? _ : v;
            if (t) {
                if (e < 0) return _;
                if (e >= y) return T
            } else {
                if (e <= -m) return I;
                if (e + 1 >= m) return b
            }
            return e < 0 ? l(-e, t).neg() : p(e % f | 0, e / f | 0, t)
        }

        function p(e, t, o) {
            return new i(e, t, o)
        }

        i.fromInt = u, i.fromNumber = l, i.fromBits = p;
        var c = Math.pow;

        function h(e, t, o) {
            if (0 === e.length) throw Error("empty string");
            if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return v;
            if ("number" == typeof t ? (o = t, t = !1) : t = !!t, (o = o || 10) < 2 || 36 < o) throw RangeError("radix");
            var r;
            if ((r = e.indexOf("-")) > 0) throw Error("interior hyphen");
            if (0 === r) return h(e.substring(1), t, o).neg();
            for (var i = l(c(o, 8)), n = v, s = 0; s < e.length; s += 8) {
                var a = Math.min(8, e.length - s), u = parseInt(e.substring(s, s + a), o);
                if (a < 8) {
                    var p = l(c(o, a));
                    n = n.mul(p).add(l(u))
                } else n = (n = n.mul(i)).add(l(u))
            }
            return n.unsigned = t, n
        }

        function d(e, t) {
            return "number" == typeof e ? l(e, t) : "string" == typeof e ? h(e, t) : p(e.low, e.high, "boolean" == typeof t ? t : e.unsigned)
        }

        i.fromString = h, i.fromValue = d;
        var f = 4294967296, y = f * f, m = y / 2, g = u(1 << 24), v = u(0);
        i.ZERO = v;
        var _ = u(0, !0);
        i.UZERO = _;
        var E = u(1);
        i.ONE = E;
        var N = u(1, !0);
        i.UONE = N;
        var O = u(-1);
        i.NEG_ONE = O;
        var b = p(-1, 2147483647, !1);
        i.MAX_VALUE = b;
        var T = p(-1, -1, !0);
        i.MAX_UNSIGNED_VALUE = T;
        var I = p(0, -2147483648, !1);
        i.MIN_VALUE = I;
        var R = i.prototype;
        R.toInt = function () {
            return this.unsigned ? this.low >>> 0 : this.low
        }, R.toNumber = function () {
            return this.unsigned ? (this.high >>> 0) * f + (this.low >>> 0) : this.high * f + (this.low >>> 0)
        }, R.toString = function (e) {
            if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix");
            if (this.isZero()) return "0";
            if (this.isNegative()) {
                if (this.eq(I)) {
                    var t = l(e), o = this.div(t), r = o.mul(t).sub(this);
                    return o.toString(e) + r.toInt().toString(e)
                }
                return "-" + this.neg().toString(e)
            }
            for (var i = l(c(e, 6), this.unsigned), n = this, s = ""; ;) {
                var a = n.div(i), u = (n.sub(a.mul(i)).toInt() >>> 0).toString(e);
                if ((n = a).isZero()) return u + s;
                for (; u.length < 6;) u = "0" + u;
                s = "" + u + s
            }
        }, R.getHighBits = function () {
            return this.high
        }, R.getHighBitsUnsigned = function () {
            return this.high >>> 0
        }, R.getLowBits = function () {
            return this.low
        }, R.getLowBitsUnsigned = function () {
            return this.low >>> 0
        }, R.getNumBitsAbs = function () {
            if (this.isNegative()) return this.eq(I) ? 64 : this.neg().getNumBitsAbs();
            for (var e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--) ;
            return 0 != this.high ? t + 33 : t + 1
        }, R.isZero = function () {
            return 0 === this.high && 0 === this.low
        }, R.eqz = R.isZero, R.isNegative = function () {
            return !this.unsigned && this.high < 0
        }, R.isPositive = function () {
            return this.unsigned || this.high >= 0
        }, R.isOdd = function () {
            return 1 == (1 & this.low)
        }, R.isEven = function () {
            return 0 == (1 & this.low)
        }, R.equals = function (e) {
            return n(e) || (e = d(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && (this.high === e.high && this.low === e.low)
        }, R.eq = R.equals, R.notEquals = function (e) {
            return !this.eq(e)
        }, R.neq = R.notEquals, R.ne = R.notEquals, R.lessThan = function (e) {
            return this.comp(e) < 0
        }, R.lt = R.lessThan, R.lessThanOrEqual = function (e) {
            return this.comp(e) <= 0
        }, R.lte = R.lessThanOrEqual, R.le = R.lessThanOrEqual, R.greaterThan = function (e) {
            return this.comp(e) > 0
        }, R.gt = R.greaterThan, R.greaterThanOrEqual = function (e) {
            return this.comp(e) >= 0
        }, R.gte = R.greaterThanOrEqual, R.ge = R.greaterThanOrEqual, R.compare = function (e) {
            if (n(e) || (e = d(e)), this.eq(e)) return 0;
            var t = this.isNegative(), o = e.isNegative();
            return t && !o ? -1 : !t && o ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1
        }, R.comp = R.compare, R.negate = function () {
            return !this.unsigned && this.eq(I) ? I : this.not().add(E)
        }, R.neg = R.negate, R.add = function (e) {
            n(e) || (e = d(e));
            var t = this.high >>> 16, o = 65535 & this.high, r = this.low >>> 16, i = 65535 & this.low,
                s = e.high >>> 16, a = 65535 & e.high, u = e.low >>> 16, l = 0, c = 0, h = 0, f = 0;
            return h += (f += i + (65535 & e.low)) >>> 16, c += (h += r + u) >>> 16, l += (c += o + a) >>> 16, l += t + s, p((h &= 65535) << 16 | (f &= 65535), (l &= 65535) << 16 | (c &= 65535), this.unsigned)
        }, R.subtract = function (e) {
            return n(e) || (e = d(e)), this.add(e.neg())
        }, R.sub = R.subtract, R.multiply = function (e) {
            if (this.isZero()) return v;
            if (n(e) || (e = d(e)), r) return p(r.mul(this.low, this.high, e.low, e.high), r.get_high(), this.unsigned);
            if (e.isZero()) return v;
            if (this.eq(I)) return e.isOdd() ? I : v;
            if (e.eq(I)) return this.isOdd() ? I : v;
            if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
            if (e.isNegative()) return this.mul(e.neg()).neg();
            if (this.lt(g) && e.lt(g)) return l(this.toNumber() * e.toNumber(), this.unsigned);
            var t = this.high >>> 16, o = 65535 & this.high, i = this.low >>> 16, s = 65535 & this.low,
                a = e.high >>> 16, u = 65535 & e.high, c = e.low >>> 16, h = 65535 & e.low, f = 0, y = 0, m = 0, _ = 0;
            return m += (_ += s * h) >>> 16, y += (m += i * h) >>> 16, m &= 65535, y += (m += s * c) >>> 16, f += (y += o * h) >>> 16, y &= 65535, f += (y += i * c) >>> 16, y &= 65535, f += (y += s * u) >>> 16, f += t * h + o * c + i * u + s * a, p((m &= 65535) << 16 | (_ &= 65535), (f &= 65535) << 16 | (y &= 65535), this.unsigned)
        }, R.mul = R.multiply, R.divide = function (e) {
            if (n(e) || (e = d(e)), e.isZero()) throw Error("division by zero");
            var t, o, i;
            if (r) return this.unsigned || -2147483648 !== this.high || -1 !== e.low || -1 !== e.high ? p((this.unsigned ? r.div_u : r.div_s)(this.low, this.high, e.low, e.high), r.get_high(), this.unsigned) : this;
            if (this.isZero()) return this.unsigned ? _ : v;
            if (this.unsigned) {
                if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return _;
                if (e.gt(this.shru(1))) return N;
                i = _
            } else {
                if (this.eq(I)) return e.eq(E) || e.eq(O) ? I : e.eq(I) ? E : (t = this.shr(1).div(e).shl(1)).eq(v) ? e.isNegative() ? E : O : (o = this.sub(e.mul(t)), i = t.add(o.div(e)));
                if (e.eq(I)) return this.unsigned ? _ : v;
                if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
                if (e.isNegative()) return this.div(e.neg()).neg();
                i = v
            }
            for (o = this; o.gte(e);) {
                t = Math.max(1, Math.floor(o.toNumber() / e.toNumber()));
                for (var s = Math.ceil(Math.log(t) / Math.LN2), a = s <= 48 ? 1 : c(2, s - 48), u = l(t), h = u.mul(e); h.isNegative() || h.gt(o);) h = (u = l(t -= a, this.unsigned)).mul(e);
                u.isZero() && (u = E), i = i.add(u), o = o.sub(h)
            }
            return i
        }, R.div = R.divide, R.modulo = function (e) {
            return n(e) || (e = d(e)), r ? p((this.unsigned ? r.rem_u : r.rem_s)(this.low, this.high, e.low, e.high), r.get_high(), this.unsigned) : this.sub(this.div(e).mul(e))
        }, R.mod = R.modulo, R.rem = R.modulo, R.not = function () {
            return p(~this.low, ~this.high, this.unsigned)
        }, R.and = function (e) {
            return n(e) || (e = d(e)), p(this.low & e.low, this.high & e.high, this.unsigned)
        }, R.or = function (e) {
            return n(e) || (e = d(e)), p(this.low | e.low, this.high | e.high, this.unsigned)
        }, R.xor = function (e) {
            return n(e) || (e = d(e)), p(this.low ^ e.low, this.high ^ e.high, this.unsigned)
        }, R.shiftLeft = function (e) {
            return n(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? p(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : p(0, this.low << e - 32, this.unsigned)
        }, R.shl = R.shiftLeft, R.shiftRight = function (e) {
            return n(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? p(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : p(this.high >> e - 32, this.high >= 0 ? 0 : -1, this.unsigned)
        }, R.shr = R.shiftRight, R.shiftRightUnsigned = function (e) {
            if (n(e) && (e = e.toInt()), 0 === (e &= 63)) return this;
            var t = this.high;
            return e < 32 ? p(this.low >>> e | t << 32 - e, t >>> e, this.unsigned) : p(32 === e ? t : t >>> e - 32, 0, this.unsigned)
        }, R.shru = R.shiftRightUnsigned, R.shr_u = R.shiftRightUnsigned, R.toSigned = function () {
            return this.unsigned ? p(this.low, this.high, !1) : this
        }, R.toUnsigned = function () {
            return this.unsigned ? this : p(this.low, this.high, !0)
        }, R.toBytes = function (e) {
            return e ? this.toBytesLE() : this.toBytesBE()
        }, R.toBytesLE = function () {
            var e = this.high, t = this.low;
            return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24]
        }, R.toBytesBE = function () {
            var e = this.high, t = this.low;
            return [e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
        }, i.fromBytes = function (e, t, o) {
            return o ? i.fromBytesLE(e, t) : i.fromBytesBE(e, t)
        }, i.fromBytesLE = function (e, t) {
            return new i(e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24, e[4] | e[5] << 8 | e[6] << 16 | e[7] << 24, t)
        }, i.fromBytesBE = function (e, t) {
            return new i(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7], e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3], t)
        }
    }, function (e, t, o) {
        "use strict";
        e.exports = function (e, t, o) {
            var r = o || 8192, i = r >>> 1, n = null, s = r;
            return function (o) {
                if (o < 1 || o > i) return e(o);
                s + o > r && (n = e(r), s = 0);
                var a = t.call(n, s, s += o);
                return 7 & s && (s = 1 + (7 | s)), a
            }
        }
    }, function (e, t, o) {
        "use strict";

        function r(e) {
            return "undefined" != typeof Float32Array ? function () {
                var t = new Float32Array([-0]), o = new Uint8Array(t.buffer), r = 128 === o[3];

                function i(e, r, i) {
                    t[0] = e, r[i] = o[0], r[i + 1] = o[1], r[i + 2] = o[2], r[i + 3] = o[3]
                }

                function n(e, r, i) {
                    t[0] = e, r[i] = o[3], r[i + 1] = o[2], r[i + 2] = o[1], r[i + 3] = o[0]
                }

                function s(e, r) {
                    return o[0] = e[r], o[1] = e[r + 1], o[2] = e[r + 2], o[3] = e[r + 3], t[0]
                }

                function a(e, r) {
                    return o[3] = e[r], o[2] = e[r + 1], o[1] = e[r + 2], o[0] = e[r + 3], t[0]
                }

                e.writeFloatLE = r ? i : n, e.writeFloatBE = r ? n : i, e.readFloatLE = r ? s : a, e.readFloatBE = r ? a : s
            }() : function () {
                function t(e, t, o, r) {
                    var i = t < 0 ? 1 : 0;
                    if (i && (t = -t), 0 === t) e(1 / t > 0 ? 0 : 2147483648, o, r); else if (isNaN(t)) e(2143289344, o, r); else if (t > 34028234663852886e22) e((i << 31 | 2139095040) >>> 0, o, r); else if (t < 11754943508222875e-54) e((i << 31 | Math.round(t / 1401298464324817e-60)) >>> 0, o, r); else {
                        var n = Math.floor(Math.log(t) / Math.LN2);
                        e((i << 31 | n + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -n) * 8388608)) >>> 0, o, r)
                    }
                }

                function o(e, t, o) {
                    var r = e(t, o), i = 2 * (r >> 31) + 1, n = r >>> 23 & 255, s = 8388607 & r;
                    return 255 === n ? s ? NaN : i * (1 / 0) : 0 === n ? 1401298464324817e-60 * i * s : i * Math.pow(2, n - 150) * (s + 8388608)
                }

                e.writeFloatLE = t.bind(null, i), e.writeFloatBE = t.bind(null, n), e.readFloatLE = o.bind(null, s), e.readFloatBE = o.bind(null, a)
            }(), "undefined" != typeof Float64Array ? function () {
                var t = new Float64Array([-0]), o = new Uint8Array(t.buffer), r = 128 === o[7];

                function i(e, r, i) {
                    t[0] = e, r[i] = o[0], r[i + 1] = o[1], r[i + 2] = o[2], r[i + 3] = o[3], r[i + 4] = o[4], r[i + 5] = o[5], r[i + 6] = o[6], r[i + 7] = o[7]
                }

                function n(e, r, i) {
                    t[0] = e, r[i] = o[7], r[i + 1] = o[6], r[i + 2] = o[5], r[i + 3] = o[4], r[i + 4] = o[3], r[i + 5] = o[2], r[i + 6] = o[1], r[i + 7] = o[0]
                }

                function s(e, r) {
                    return o[0] = e[r], o[1] = e[r + 1], o[2] = e[r + 2], o[3] = e[r + 3], o[4] = e[r + 4], o[5] = e[r + 5], o[6] = e[r + 6], o[7] = e[r + 7], t[0]
                }

                function a(e, r) {
                    return o[7] = e[r], o[6] = e[r + 1], o[5] = e[r + 2], o[4] = e[r + 3], o[3] = e[r + 4], o[2] = e[r + 5], o[1] = e[r + 6], o[0] = e[r + 7], t[0]
                }

                e.writeDoubleLE = r ? i : n, e.writeDoubleBE = r ? n : i, e.readDoubleLE = r ? s : a, e.readDoubleBE = r ? a : s
            }() : function () {
                function t(e, t, o, r, i, n) {
                    var s = r < 0 ? 1 : 0;
                    if (s && (r = -r), 0 === r) e(0, i, n + t), e(1 / r > 0 ? 0 : 2147483648, i, n + o); else if (isNaN(r)) e(0, i, n + t), e(2146959360, i, n + o); else if (r > 17976931348623157e292) e(0, i, n + t), e((s << 31 | 2146435072) >>> 0, i, n + o); else {
                        var a;
                        if (r < 22250738585072014e-324) e((a = r / 5e-324) >>> 0, i, n + t), e((s << 31 | a / 4294967296) >>> 0, i, n + o); else {
                            var u = Math.floor(Math.log(r) / Math.LN2);
                            1024 === u && (u = 1023), e(4503599627370496 * (a = r * Math.pow(2, -u)) >>> 0, i, n + t), e((s << 31 | u + 1023 << 20 | 1048576 * a & 1048575) >>> 0, i, n + o)
                        }
                    }
                }

                function o(e, t, o, r, i) {
                    var n = e(r, i + t), s = e(r, i + o), a = 2 * (s >> 31) + 1, u = s >>> 20 & 2047,
                        l = 4294967296 * (1048575 & s) + n;
                    return 2047 === u ? l ? NaN : a * (1 / 0) : 0 === u ? 5e-324 * a * l : a * Math.pow(2, u - 1075) * (l + 4503599627370496)
                }

                e.writeDoubleLE = t.bind(null, i, 0, 4), e.writeDoubleBE = t.bind(null, n, 4, 0), e.readDoubleLE = o.bind(null, s, 0, 4), e.readDoubleBE = o.bind(null, a, 4, 0)
            }(), e
        }

        function i(e, t, o) {
            t[o] = 255 & e, t[o + 1] = e >>> 8 & 255, t[o + 2] = e >>> 16 & 255, t[o + 3] = e >>> 24
        }

        function n(e, t, o) {
            t[o] = e >>> 24, t[o + 1] = e >>> 16 & 255, t[o + 2] = e >>> 8 & 255, t[o + 3] = 255 & e
        }

        function s(e, t) {
            return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0
        }

        function a(e, t) {
            return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0
        }

        e.exports = r(r)
    }, function (e, t, o) {
        "use strict";
        e.exports = function (e, t) {
            var o = new Array(arguments.length - 1), r = 0, i = 2, n = !0;
            for (; i < arguments.length;) o[r++] = arguments[i++];
            return new Promise((function (i, s) {
                o[r] = function (e) {
                    if (n) if (n = !1, e) s(e); else {
                        for (var t = new Array(arguments.length - 1), o = 0; o < t.length;) t[o++] = arguments[o];
                        i.apply(null, t)
                    }
                };
                try {
                    e.apply(t || null, o)
                } catch (e) {
                    n && (n = !1, s(e))
                }
            }))
        }
    }, function (e, t, o) {
        "use strict";

        function r() {
            this._listeners = {}
        }

        e.exports = r, r.prototype.on = function (e, t, o) {
            return (this._listeners[e] || (this._listeners[e] = [])).push({fn: t, ctx: o || this}), this
        }, r.prototype.off = function (e, t) {
            if (void 0 === e) this._listeners = {}; else if (void 0 === t) this._listeners[e] = []; else for (var o = this._listeners[e], r = 0; r < o.length;) o[r].fn === t ? o.splice(r, 1) : ++r;
            return this
        }, r.prototype.emit = function (e) {
            var t = this._listeners[e];
            if (t) {
                for (var o = [], r = 1; r < arguments.length;) o.push(arguments[r++]);
                for (r = 0; r < t.length;) t[r].fn.apply(t[r++].ctx, o)
            }
            return this
        }
    }, function (e, t, o) {
        "use strict";
        var r = e.exports, i = r.isAbsolute = function (e) {
            return /^(?:\/|\w+:)/.test(e)
        }, n = r.normalize = function (e) {
            var t = (e = e.replace(/\\/g, "/").replace(/\/{2,}/g, "/")).split("/"), o = i(e), r = "";
            o && (r = t.shift() + "/");
            for (var n = 0; n < t.length;) ".." === t[n] ? n > 0 && ".." !== t[n - 1] ? t.splice(--n, 2) : o ? t.splice(n, 1) : ++n : "." === t[n] ? t.splice(n, 1) : ++n;
            return r + t.join("/")
        };
        r.resolve = function (e, t, o) {
            return o || (t = n(t)), i(t) ? t : (o || (e = n(e)), (e = e.replace(/(?:\/|^)[^/]+$/, "")).length ? n(e + "/" + t) : t)
        }
    }, function (e, t, o) {
        "use strict";
        var r = o(0);
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var i, n, s, a, u = r(o(5)), l = (0, r(o(7)).default)(), p = "undefined" != typeof FormData,
            c = "undefined" != typeof Blob, h = (!1).overrideMimeType || !1, d = p, f = d || !1, y = c || h,
            m = function () {
            };
        Object.keys || (Object.keys = (i = Object.prototype.hasOwnProperty, n = !{toString: null}.propertyIsEnumerable("toString"), a = (s = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function (e) {
            if ("object" !== (0, u.default)(e) && ("function" != typeof e || null === e)) throw new TypeError("Object.keys called on non-object");
            var t, o, r = [];
            for (t in e) i.call(e, t) && r.push(t);
            if (n) for (o = 0; o < a; o++) i.call(e, s[o]) && r.push(s[o]);
            return r
        }));
        var g = {
            hasFormData: p,
            hasBlob: c,
            emptyfn: m,
            isCanSetRequestHeader: !0,
            hasOverrideMimeType: h,
            isCanUploadFileAsync: d,
            isCanUploadFile: f,
            isCanDownLoadFile: y,
            isSupportWss: !0,
            hasFlash: !1,
            xmlrequest: !1,
            stringify: function (e) {
                if ("undefined" != typeof JSON && JSON.stringify) return JSON.stringify(e);
                var t = "", o = [];
                return function e(r) {
                    var i = !1;
                    for (var n in "[object Array]" === Object.prototype.toString.call(r) ? (o.push("]", "["), i = !0) : "[object Object]" === Object.prototype.toString.call(r) && o.push("}", "{"), r) "[object Null]" === Object.prototype.toString.call(r[n]) ? r[n] = "null" : "[object Undefined]" === Object.prototype.toString.call(r[n]) && (r[n] = "undefined"), r[n] && "object" === (0, u.default)(r[n]) ? t += "," + (i ? "" : '"' + n + '":' + (i ? '"' : "")) + e(r[n]) : t += ',"' + (i ? "" : n + '":"') + r[n] + '"';
                    return "" != t && (t = t.slice(1)), o.pop() + t + o.pop()
                }(e)
            },
            login: function (e) {
                var t = (e = e || {}).success || m, o = e.error || m, r = (e.appKey || "").split("#");
                if (2 !== r.length) return o({type: l.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR}), !1;
                var i = r[0], n = r[1], s = s || e.https, a = e.user || "", u = e.pwd || "", p = e.apiUrl,
                    c = {grant_type: "password", username: a, password: u, timestamp: +new Date};
                e = {
                    url: p + "/" + i + "/" + n + "/token",
                    dataType: "json",
                    data: g.stringify(c),
                    success: t,
                    error: o
                };
                return g.ajax(e)
            },
            getFileUrl: function (e) {
                var t = {url: "", filename: "", filetype: "", data: ""},
                    o = "string" == typeof e ? document.getElementById(e) : e;
                if (!g.isCanUploadFileAsync || !o) return t;
                try {
                    if (window.URL.createObjectURL) {
                        var r = o.files;
                        if (r.length > 0) {
                            var i = r.item(0);
                            t.data = i, t.url = window.URL.createObjectURL(i), t.filename = i.name || ""
                        }
                    } else {
                        i = document.getElementById(e).value;
                        t.url = i;
                        var n = i.lastIndexOf("/"), s = i.lastIndexOf("\\"), a = Math.max(n, s);
                        t.filename = a < 0 ? i : i.substring(a + 1)
                    }
                    var u = t.filename.lastIndexOf(".");
                    return -1 != u && (t.filetype = t.filename.substring(u + 1).toLowerCase()), t
                } catch (e) {
                    throw e
                }
            },
            getFileSize: function (e) {
                var t = document.getElementById(e), o = 0;
                return t && t.files && t.files.length > 0 && (o = t.files[0].size), o
            },
            trim: function (e) {
                return (e = "string" == typeof e ? e : "").trim ? e.trim() : e.replace(/^\s|\s$/g, "")
            },
            parseLink: function (e) {
                return e = e.replace(/(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm, (function (e) {
                    return "<a href='" + (/^https?/gm.test(e) ? e : "//" + e) + "' target='_blank'>" + e + "</a>"
                }))
            },
            parseJSON: function (e) {
                if (window.JSON && window.JSON.parse) return window.JSON.parse(e + "");
                var t, o = null, r = g.trim(e + "");
                return r && !g.trim(r.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, (function (e, r, i, n) {
                    return t && r && (o = 0), 0 === o ? e : (t = i || r, o += !n - !i, "")
                }))) ? Function("return " + r)() : Function("Invalid JSON: " + e)()
            },
            parseUploadResponse: function (e) {
                return e.indexOf("callback") > -1 ? e.slice(9, -1) : e
            },
            parseDownloadResponse: function (e) {
                return e && e.type && "application/json" === e.type || 0 > Object.prototype.toString.call(e).indexOf("Blob") ? this.url + "?token=" : window.URL.createObjectURL(e)
            },
            uploadFile: function (e) {
                (e = e || {}).onFileUploadProgress = e.onFileUploadProgress || m, e.onFileUploadComplete = e.onFileUploadComplete || m, e.onFileUploadError = e.onFileUploadError || m, e.onFileUploadCanceled = e.onFileUploadCanceled || m;
                var t = e.accessToken || this.context.accessToken;
                if (t) {
                    var o, r, i, n = e.appKey || this.context.appKey || "";
                    if (n && (o = (i = n.split("#"))[0], r = i[1]), o || r) {
                        var s = e.apiUrl;
                        this.isHttpDNS && (s = this.apiUrl);
                        var a = e.uploadUrl || s + "/" + o + "/" + r + "/chatfiles";
                        if (g.isCanUploadFileAsync) if ((e.file.data ? e.file.data.size : void 0) <= 0) e.onFileUploadError({
                            type: l.WEBIM_UPLOADFILE_ERROR,
                            id: e.id
                        }); else {
                            var u = g.xmlrequest();
                            u.upload && u.upload.addEventListener("progress", e.onFileUploadProgress, !1), u.addEventListener ? (u.addEventListener("abort", e.onFileUploadCanceled, !1), u.addEventListener("load", (function (t) {
                                try {
                                    var o = g.parseJSON(u.responseText);
                                    try {
                                        e.onFileUploadComplete(o)
                                    } catch (t) {
                                        e.onFileUploadError({type: l.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, data: t})
                                    }
                                } catch (t) {
                                    e.onFileUploadError({
                                        type: l.WEBIM_UPLOADFILE_ERROR,
                                        data: u.responseText,
                                        id: e.id,
                                        xhr: u
                                    })
                                }
                            }), !1), u.addEventListener("error", (function (t) {
                                e.onFileUploadError({type: l.WEBIM_UPLOADFILE_ERROR, id: e.id, xhr: u})
                            }), !1)) : u.onreadystatechange && (u.onreadystatechange = function () {
                                if (4 === u.readyState) if (200 === ajax.status) try {
                                    var t = g.parseJSON(u.responseText);
                                    e.onFileUploadComplete(t)
                                } catch (t) {
                                    e.onFileUploadError({
                                        type: l.WEBIM_UPLOADFILE_ERROR,
                                        data: u.responseText,
                                        id: e.id,
                                        xhr: u
                                    })
                                } else e.onFileUploadError({
                                    type: l.WEBIM_UPLOADFILE_ERROR,
                                    data: u.responseText,
                                    id: e.id,
                                    xhr: u
                                }); else u.abort(), e.onFileUploadCanceled()
                            }), u.open("POST", a), u.setRequestHeader("restrict-access", "true"), u.setRequestHeader("Accept", "*/*"), u.setRequestHeader("Authorization", "Bearer " + t);
                            var p = new FormData;
                            p.append("file", e.file.data), window.XDomainRequest && (u.readyState = 2), u.send(p)
                        } else g.hasFlash && "function" == typeof e.flashUpload ? e.flashUpload && e.flashUpload(a, e) : e.onFileUploadError({
                            type: l.WEBIM_UPLOADFILE_BROWSER_ERROR,
                            id: e.id
                        })
                    } else e.onFileUploadError({type: l.WEBIM_UPLOADFILE_ERROR, id: e.id})
                } else e.onFileUploadError({type: l.WEBIM_UPLOADFILE_NO_LOGIN, id: e.id})
            },
            download: function (e) {
                e.onFileDownloadComplete = e.onFileDownloadComplete || m, e.onFileDownloadError = e.onFileDownloadError || m;
                var t = e.accessToken || this.context.accessToken, o = g.xmlrequest();
                if (t) {
                    if (g.isCanDownLoadFile) {
                        "addEventListener" in o ? (o.addEventListener("load", (function (t) {
                            e.onFileDownloadComplete(o.response, o)
                        }), !1), o.addEventListener("error", (function (t) {
                            e.onFileDownloadError({type: l.WEBIM_DOWNLOADFILE_ERROR, id: e.id, xhr: o})
                        }), !1)) : "onreadystatechange" in o && (o.onreadystatechange = function () {
                            4 === o.readyState ? 200 === ajax.status ? e.onFileDownloadComplete(o.response, o) : e.onFileDownloadError({
                                type: l.WEBIM_DOWNLOADFILE_ERROR,
                                id: e.id,
                                xhr: o
                            }) : (o.abort(), e.onFileDownloadError({
                                type: l.WEBIM_DOWNLOADFILE_ERROR,
                                id: e.id,
                                xhr: o
                            }))
                        });
                        var r = e.method || "GET", i = e.responseType || "blob",
                            n = e.mimeType || "text/plain; charset=x-user-defined";
                        o.open(r, e.url), "undefined" != typeof Blob ? o.responseType = i : o.overrideMimeType(n);
                        var s = {
                            "X-Requested-With": "XMLHttpRequest",
                            Accept: "application/octet-stream",
                            "share-secret": e.secret,
                            Authorization: "Bearer " + t
                        }, a = e.headers || {};
                        for (var u in a) s[u] = a[u];
                        for (var u in s) s[u] && o.setRequestHeader(u, s[u]);
                        window.XDomainRequest && (o.readyState = 2), o.send(null)
                    } else e.onFileDownloadComplete()
                } else e.onFileDownloadError({type: l.WEBIM_DOWNLOADFILE_NO_LOGIN, id: e.id})
            },
            parseTextMessage: function (e, t) {
                if ("string" == typeof e) {
                    if ("[object Object]" !== Object.prototype.toString.call(t)) return {
                        isemoji: !1,
                        body: [{type: "txt", data: e}]
                    };
                    var o = e, r = [], i = o.match(/\[[^[\]]{2,3}\]/gm);
                    if (!i || i.length < 1) return {isemoji: !1, body: [{type: "txt", data: e}]};
                    for (var n = !1, s = 0; s < i.length; s++) {
                        var a = o.substring(0, o.indexOf(i[s])), u = t.map[i[s]];
                        if (a && r.push({type: "txt", data: a}), u) {
                            var l = t.map ? t.path + u : null;
                            l ? (n = !0, r.push({type: "emoji", data: l})) : r.push({type: "txt", data: i[s]});
                            var p = o.indexOf(i[s]) + i[s].length;
                            o = o.substring(p)
                        } else r.push({type: "txt", data: i[s]})
                    }
                    return o && r.push({type: "txt", data: o}), n ? {isemoji: n, body: r} : {
                        isemoji: !1,
                        body: [{type: "txt", data: e}]
                    }
                }
            },
            ajax: function (e) {
                var t = e.success || m, o = e.error || m, r = e.type || "POST", i = e.data || null, n = "";
                if ("get" === r.toLowerCase() && i) {
                    for (var s in i) i.hasOwnProperty(s) && (n += s + "=" + i[s] + "&");
                    n = n ? n.slice(0, -1) : n, e.url += (e.url.indexOf("?") > 0 ? "&" : "?") + (n ? n + "&" : n) + "_v=" + (new Date).getTime(), i = null, n = null
                }
                wx.request({
                    url: e.url, data: e.data, header: e.headers, method: r, success: function (e) {
                        "200" == e.statusCode ? t(e.data) : o(e)
                    }, complete: function () {
                    }, fail: function (e) {
                        o(e)
                    }
                })
            },
            ts: function () {
                var e = new Date, t = e.getHours(), o = e.getMinutes(), r = e.getSeconds();
                return (t < 10 ? "0" + t : t) + ":" + (o < 10 ? "0" + o : o) + ":" + (r < 10 ? "0" + r : r) + ":" + e.getMilliseconds() + " "
            },
            getObjectKey: function (e, t) {
                for (var o in e) if (e[o] == t) return o;
                return ""
            },
            sprintf: function () {
                var e, t, o = arguments, r = o[0] || "";
                for (e = 1, t = o.length; e < t; e++) r = r.replace(/%s/, o[e]);
                return r
            },
            reverse: function (e) {
                var t = [];
                if (Array.prototype.reverse) t = e.reverse(); else for (var o = 0; o < e.length; o++) t.unshift(e[o]);
                return t
            },
            getEnv: function () {
                var e = !0;
                try {
                    e = !window || !navigator
                } catch (t) {
                    e = !0
                }
                return e
            },
            checkArray: function (e, t) {
                var o = "off";
                if (e.forEach((function (e, r) {
                    if (e.name === t.name) return o = "on", r
                })), "off" == o) return !1
            },
            _listenNetwork: function (e, t) {
            }
        }, v = g;
        t.default = v
    }])
}));

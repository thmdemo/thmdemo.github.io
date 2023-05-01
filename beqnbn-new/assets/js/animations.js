var a, b;
"undefined" != typeof navigator && (a = window || {}, b = function (window) {
    "use strict";
    var svgNS = "http://www.w3.org/2000/svg",
        locationHref = "",
        initialDefaultFrame = -999999,
        subframeEnabled = !0,
        expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        cachedColors = {},
        bm_rounder = Math.round,
        bm_rnd, bm_pow = Math.pow,
        bm_sqrt = Math.sqrt,
        bm_abs = Math.abs,
        bm_floor = Math.floor,
        bm_max = Math.max,
        bm_min = Math.min,
        blitter = 10,
        BMMath = {};

    function ProjectInterface() {
        return {}
    }! function () {
        var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
            r = e.length;
        for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]]
    }(), BMMath.random = Math.random, BMMath.abs = function (t) {
        if ("object" === typeof t && t.length) {
            var e, r = createSizedArray(t.length),
                i = t.length;
            for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);
            return r
        }
        return Math.abs(t)
    };
    var defaultCurveSegments = 150,
        degToRads = Math.PI / 180,
        roundCorner = .5519;

    function roundValues(t) {
        bm_rnd = t ? Math.round : function (t) {
            return t
        }
    }

    function styleDiv(t) {
        t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
    }

    function BMEnterFrameEvent(t, e, r, i) {
        this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1
    }

    function BMCompleteEvent(t, e) {
        this.type = t, this.direction = e < 0 ? -1 : 1
    }

    function BMCompleteLoopEvent(t, e, r, i) {
        this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1
    }

    function BMSegmentStartEvent(t, e, r) {
        this.type = t, this.firstFrame = e, this.totalFrames = r
    }

    function BMDestroyEvent(t, e) {
        this.type = t, this.target = e
    }

    function BMRenderFrameErrorEvent(t, e) {
        this.type = "renderFrameError", this.nativeError = t, this.currentTime = e
    }

    function BMConfigErrorEvent(t) {
        this.type = "configError", this.nativeError = t
    }

    function BMAnimationConfigErrorEvent(t, e) {
        this.type = t, this.nativeError = e, this.currentTime = currentTime
    }
    roundValues(!1);
    var createElementID = (I = 0, function () {
            return "__lottie_element_" + ++I
        }),
        I;

    function HSVtoRGB(t, e, r) {
        var i, s, a, n, o, h, l, p;
        switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
            case 0:
                i = r, s = p, a = h;
                break;
            case 1:
                i = l, s = r, a = h;
                break;
            case 2:
                i = h, s = r, a = p;
                break;
            case 3:
                i = h, s = l, a = r;
                break;
            case 4:
                i = p, s = h, a = r;
                break;
            case 5:
                i = r, s = h, a = l
        }
        return [i, s, a]
    }

    function RGBtoHSV(t, e, r) {
        var i, s = Math.max(t, e, r),
            a = Math.min(t, e, r),
            n = s - a,
            o = 0 === s ? 0 : n / s,
            h = s / 255;
        switch (s) {
            case a:
                i = 0;
                break;
            case t:
                i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
                break;
            case e:
                i = r - t + 2 * n, i /= 6 * n;
                break;
            case r:
                i = t - e + 4 * n, i /= 6 * n
        }
        return [i, o, h]
    }

    function addSaturationToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[1] += e, 1 < r[1] ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2])
    }

    function addBrightnessToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[2] += e, 1 < r[2] ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2])
    }

    function addHueToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[0] += e / 360, 1 < r[0] ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2])
    }
    var rgbToHex = function () {
        var t, e, i = [];
        for (t = 0; t < 256; t += 1) e = t.toString(16), i[t] = 1 == e.length ? "0" + e : e;
        return function (t, e, r) {
            return t < 0 && (t = 0), e < 0 && (e = 0), r < 0 && (r = 0), "#" + i[t] + i[e] + i[r]
        }
    }();

    function BaseEvent() {}
    BaseEvent.prototype = {
        triggerEvent: function (t, e) {
            if (this._cbs[t])
                for (var r = this._cbs[t].length, i = 0; i < r; i++) this._cbs[t][i](e)
        },
        addEventListener: function (t, e) {
            return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e),
                function () {
                    this.removeEventListener(t, e)
                }.bind(this)
        },
        removeEventListener: function (t, e) {
            if (e) {
                if (this._cbs[t]) {
                    for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
                    this._cbs[t].length || (this._cbs[t] = null)
                }
            } else this._cbs[t] = null
        }
    };
    var createTypedArray = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (t, e) {
        return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
    } : function (t, e) {
        var r, i = 0,
            s = [];
        switch (t) {
            case "int16":
            case "uint8c":
                r = 1;
                break;
            default:
                r = 1.1
        }
        for (i = 0; i < e; i += 1) s.push(r);
        return s
    };

    function createSizedArray(t) {
        return Array.apply(null, {
            length: t
        })
    }

    function createNS(t) {
        return document.createElementNS(svgNS, t)
    }

    function createTag(t) {
        return document.createElement(t)
    }

    function DynamicPropertyContainer() {}
    DynamicPropertyContainer.prototype = {
        addDynamicProperty: function (t) {
            -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
        },
        iterateDynamicProperties: function () {
            this._mdf = !1;
            var t, e = this.dynamicProperties.length;
            for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0)
        },
        initDynamicPropertyContainer: function (t) {
            this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
        }
    };
    var getBlendMode = (Ra = {
            0: "source-over",
            1: "multiply",
            2: "screen",
            3: "overlay",
            4: "darken",
            5: "lighten",
            6: "color-dodge",
            7: "color-burn",
            8: "hard-light",
            9: "soft-light",
            10: "difference",
            11: "exclusion",
            12: "hue",
            13: "saturation",
            14: "color",
            15: "luminosity"
        }, function (t) {
            return Ra[t] || ""
        }),
        Ra, Matrix = function () {
            var s = Math.cos,
                a = Math.sin,
                n = Math.tan,
                i = Math.round;

            function t() {
                return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
            }

            function e(t) {
                if (0 === t) return this;
                var e = s(t),
                    r = a(t);
                return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function r(t) {
                if (0 === t) return this;
                var e = s(t),
                    r = a(t);
                return this._t(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1)
            }

            function o(t) {
                if (0 === t) return this;
                var e = s(t),
                    r = a(t);
                return this._t(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1)
            }

            function h(t) {
                if (0 === t) return this;
                var e = s(t),
                    r = a(t);
                return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function l(t, e) {
                return this._t(1, e, t, 1, 0, 0)
            }

            function p(t, e) {
                return this.shear(n(t), n(e))
            }

            function m(t, e) {
                var r = s(e),
                    i = a(e);
                return this._t(r, i, 0, 0, -i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, n(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(r, -i, 0, 0, i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function f(t, e, r) {
                return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
            }

            function c(t, e, r, i, s, a, n, o, h, l, p, m, f, c, d, u) {
                return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = m, this.props[12] = f, this.props[13] = c, this.props[14] = d, this.props[15] = u, this
            }

            function d(t, e, r) {
                return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this
            }

            function u(t, e, r, i, s, a, n, o, h, l, p, m, f, c, d, u) {
                var y = this.props;
                if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === m) return y[12] = y[12] * t + y[15] * f, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * u, this._identityCalculated = !1, this;
                var g = y[0],
                    v = y[1],
                    b = y[2],
                    E = y[3],
                    x = y[4],
                    P = y[5],
                    S = y[6],
                    _ = y[7],
                    A = y[8],
                    C = y[9],
                    T = y[10],
                    k = y[11],
                    M = y[12],
                    D = y[13],
                    w = y[14],
                    F = y[15];
                return y[0] = g * t + v * s + b * h + E * f, y[1] = g * e + v * a + b * l + E * c, y[2] = g * r + v * n + b * p + E * d, y[3] = g * i + v * o + b * m + E * u, y[4] = x * t + P * s + S * h + _ * f, y[5] = x * e + P * a + S * l + _ * c, y[6] = x * r + P * n + S * p + _ * d, y[7] = x * i + P * o + S * m + _ * u, y[8] = A * t + C * s + T * h + k * f, y[9] = A * e + C * a + T * l + k * c, y[10] = A * r + C * n + T * p + k * d, y[11] = A * i + C * o + T * m + k * u, y[12] = M * t + D * s + w * h + F * f, y[13] = M * e + D * a + w * l + F * c, y[14] = M * r + D * n + w * p + F * d, y[15] = M * i + D * o + w * m + F * u, this._identityCalculated = !1, this
            }

            function y() {
                return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
            }

            function g(t) {
                for (var e = 0; e < 16;) {
                    if (t.props[e] !== this.props[e]) return !1;
                    e += 1
                }
                return !0
            }

            function v(t) {
                var e;
                for (e = 0; e < 16; e += 1) t.props[e] = this.props[e]
            }

            function b(t) {
                var e;
                for (e = 0; e < 16; e += 1) this.props[e] = t[e]
            }

            function E(t, e, r) {
                return {
                    x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
                    y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
                    z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
                }
            }

            function x(t, e, r) {
                return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12]
            }

            function P(t, e, r) {
                return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13]
            }

            function S(t, e, r) {
                return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
            }

            function _(t) {
                var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                    r = this.props[5] / e,
                    i = -this.props[1] / e,
                    s = -this.props[4] / e,
                    a = this.props[0] / e,
                    n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
                    o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
                return [t[0] * r + t[1] * s + n, t[0] * i + t[1] * a + o, 0]
            }

            function A(t) {
                var e, r = t.length,
                    i = [];
                for (e = 0; e < r; e += 1) i[e] = _(t[e]);
                return i
            }

            function C(t, e, r) {
                var i = createTypedArray("float32", 6);
                if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];
                else {
                    var s = this.props[0],
                        a = this.props[1],
                        n = this.props[4],
                        o = this.props[5],
                        h = this.props[12],
                        l = this.props[13];
                    i[0] = t[0] * s + t[1] * n + h, i[1] = t[0] * a + t[1] * o + l, i[2] = e[0] * s + e[1] * n + h, i[3] = e[0] * a + e[1] * o + l, i[4] = r[0] * s + r[1] * n + h, i[5] = r[0] * a + r[1] * o + l
                }
                return i
            }

            function T(t, e, r) {
                return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]
            }

            function k(t, e) {
                if (this.isIdentity()) return t + "," + e;
                var r = this.props;
                return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100
            }

            function M() {
                for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
                return r
            }

            function D(t) {
                return t < 1e-6 && 0 < t || -1e-6 < t && t < 0 ? i(1e4 * t) / 1e4 : t
            }

            function w() {
                var t = this.props;
                return "matrix(" + D(t[0]) + "," + D(t[1]) + "," + D(t[4]) + "," + D(t[5]) + "," + D(t[12]) + "," + D(t[13]) + ")"
            }
            return function () {
                this.reset = t, this.rotate = e, this.rotateX = r, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = m, this.shear = l, this.scale = f, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = E, this.applyToX = x, this.applyToY = P, this.applyToZ = S, this.applyToPointArray = T, this.applyToTriplePoints = C, this.applyToPointStringified = k, this.toCSS = M, this.to2dCSS = w, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = A, this.inversePoint = _, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset()
            }
        }();
    ! function (o, h) {
        var l, p = this,
            m = 256,
            f = 6,
            c = "random",
            d = h.pow(m, f),
            u = h.pow(2, 52),
            y = 2 * u,
            g = m - 1;

        function v(t) {
            var e, r = t.length,
                n = this,
                i = 0,
                s = n.i = n.j = 0,
                a = n.S = [];
            for (r || (t = [r++]); i < m;) a[i] = i++;
            for (i = 0; i < m; i++) a[i] = a[s = g & s + t[i % r] + (e = a[i])], a[s] = e;
            n.g = function (t) {
                for (var e, r = 0, i = n.i, s = n.j, a = n.S; t--;) e = a[i = g & i + 1], r = r * m + a[g & (a[i] = a[s = g & s + e]) + (a[s] = e)];
                return n.i = i, n.j = s, r
            }
        }

        function b(t, e) {
            return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
        }

        function E(t, e) {
            for (var r, i = t + "", s = 0; s < i.length;) e[g & s] = g & (r ^= 19 * e[g & s]) + i.charCodeAt(s++);
            return x(e)
        }

        function x(t) {
            return String.fromCharCode.apply(0, t)
        }
        h["seed" + c] = function (t, e, r) {
            var i = [],
                s = E(function t(e, r) {
                    var i, s = [],
                        a = typeof e;
                    if (r && "object" == a)
                        for (i in e) try {
                            s.push(t(e[i], r - 1))
                        } catch (t) {}
                    return s.length ? s : "string" == a ? e : e + "\0"
                }((e = !0 === e ? {
                    entropy: !0
                } : e || {}).entropy ? [t, x(o)] : null === t ? function () {
                    try {
                        if (l) return x(l.randomBytes(m));
                        var t = new Uint8Array(m);
                        return (p.crypto || p.msCrypto).getRandomValues(t), x(t)
                    } catch (t) {
                        var e = p.navigator,
                            r = e && e.plugins;
                        return [+new Date, p, r, p.screen, x(o)]
                    }
                }() : t, 3), i),
                a = new v(i),
                n = function () {
                    for (var t = a.g(f), e = d, r = 0; t < u;) t = (t + r) * m, e *= m, r = a.g(1);
                    for (; y <= t;) t /= 2, e /= 2, r >>>= 1;
                    return (t + r) / e
                };
            return n.int32 = function () {
                return 0 | a.g(4)
            }, n.quick = function () {
                return a.g(4) / 4294967296
            }, n.double = n, E(x(a.S), o), (e.pass || r || function (t, e, r, i) {
                return i && (i.S && b(i, a), t.state = function () {
                    return b(a, {})
                }), r ? (h[c] = t, e) : t
            })(n, s, "global" in e ? e.global : this == h, e.state)
        }, E(h.random(), o)
    }([], BMMath);
    var BezierFactory = function () {
        var t = {
                getBezierEasing: function (t, e, r, i, s) {
                    var a = s || ("bez_" + t + "_" + e + "_" + r + "_" + i).replace(/\./g, "p");
                    if (o[a]) return o[a];
                    var n = new h([t, e, r, i]);
                    return o[a] = n
                }
            },
            o = {};
        var l = 11,
            p = 1 / (l - 1),
            e = "function" == typeof Float32Array;

        function i(t, e) {
            return 1 - 3 * e + 3 * t
        }

        function s(t, e) {
            return 3 * e - 6 * t
        }

        function a(t) {
            return 3 * t
        }

        function m(t, e, r) {
            return ((i(e, r) * t + s(e, r)) * t + a(e)) * t
        }

        function f(t, e, r) {
            return 3 * i(e, r) * t * t + 2 * s(e, r) * t + a(e)
        }

        function h(t) {
            this._p = t, this._mSampleValues = e ? new Float32Array(l) : new Array(l), this._precomputed = !1, this.get = this.get.bind(this)
        }
        return h.prototype = {
            get: function (t) {
                var e = this._p[0],
                    r = this._p[1],
                    i = this._p[2],
                    s = this._p[3];
                return this._precomputed || this._precompute(), e === r && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : m(this._getTForX(t), r, s)
            },
            _precompute: function () {
                var t = this._p[0],
                    e = this._p[1],
                    r = this._p[2],
                    i = this._p[3];
                this._precomputed = !0, t === e && r === i || this._calcSampleValues()
            },
            _calcSampleValues: function () {
                for (var t = this._p[0], e = this._p[2], r = 0; r < l; ++r) this._mSampleValues[r] = m(r * p, t, e)
            },
            _getTForX: function (t) {
                for (var e = this._p[0], r = this._p[2], i = this._mSampleValues, s = 0, a = 1, n = l - 1; a !== n && i[a] <= t; ++a) s += p;
                var o = s + (t - i[--a]) / (i[a + 1] - i[a]) * p,
                    h = f(o, e, r);
                return .001 <= h ? function (t, e, r, i) {
                    for (var s = 0; s < 4; ++s) {
                        var a = f(e, r, i);
                        if (0 === a) return e;
                        e -= (m(e, r, i) - t) / a
                    }
                    return e
                }(t, o, e, r) : 0 === h ? o : function (t, e, r, i, s) {
                    for (var a, n, o = 0; 0 < (a = m(n = e + (r - e) / 2, i, s) - t) ? r = n : e = n, 1e-7 < Math.abs(a) && ++o < 10;);
                    return n
                }(t, s, s + p, e, r)
            }
        }, t
    }();

    function extendPrototype(t, e) {
        var r, i, s = t.length;
        for (r = 0; r < s; r += 1)
            for (var a in i = t[r].prototype) i.hasOwnProperty(a) && (e.prototype[a] = i[a])
    }

    function getDescriptor(t, e) {
        return Object.getOwnPropertyDescriptor(t, e)
    }

    function createProxyFunction(t) {
        function e() {}
        return e.prototype = t, e
    }

    function bezFunction() {
        Math;

        function y(t, e, r, i, s, a) {
            var n = t * i + e * s + r * a - s * i - a * t - r * e;
            return -.001 < n && n < .001
        }
        var p = function (t, e, r, i) {
            var s, a, n, o, h, l, p = defaultCurveSegments,
                m = 0,
                f = [],
                c = [],
                d = bezier_length_pool.newElement();
            for (n = r.length, s = 0; s < p; s += 1) {
                for (h = s / (p - 1), a = l = 0; a < n; a += 1) o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bm_pow(h, 2) * i[a] + bm_pow(h, 3) * e[a], f[a] = o, null !== c[a] && (l += bm_pow(f[a] - c[a], 2)), c[a] = f[a];
                l && (m += l = bm_sqrt(l)), d.percents[s] = h, d.lengths[s] = m
            }
            return d.addedLength = m, d
        };

        function g(t) {
            this.segmentLength = 0, this.points = new Array(t)
        }

        function v(t, e) {
            this.partialLength = t, this.point = e
        }
        var b, t = (b = {}, function (t, e, r, i) {
            var s = (t[0] + "_" + t[1] + "_" + e[0] + "_" + e[1] + "_" + r[0] + "_" + r[1] + "_" + i[0] + "_" + i[1]).replace(/\./g, "p");
            if (!b[s]) {
                var a, n, o, h, l, p, m, f = defaultCurveSegments,
                    c = 0,
                    d = null;
                2 === t.length && (t[0] != e[0] || t[1] != e[1]) && y(t[0], t[1], e[0], e[1], t[0] + r[0], t[1] + r[1]) && y(t[0], t[1], e[0], e[1], e[0] + i[0], e[1] + i[1]) && (f = 2);
                var u = new g(f);
                for (o = r.length, a = 0; a < f; a += 1) {
                    for (m = createSizedArray(o), l = a / (f - 1), n = p = 0; n < o; n += 1) h = bm_pow(1 - l, 3) * t[n] + 3 * bm_pow(1 - l, 2) * l * (t[n] + r[n]) + 3 * (1 - l) * bm_pow(l, 2) * (e[n] + i[n]) + bm_pow(l, 3) * e[n], m[n] = h, null !== d && (p += bm_pow(m[n] - d[n], 2));
                    c += p = bm_sqrt(p), u.points[a] = new v(p, m), d = m
                }
                u.segmentLength = c, b[s] = u
            }
            return b[s]
        });

        function M(t, e) {
            var r = e.percents,
                i = e.lengths,
                s = r.length,
                a = bm_floor((s - 1) * t),
                n = t * e.addedLength,
                o = 0;
            if (a === s - 1 || 0 === a || n === i[a]) return r[a];
            for (var h = i[a] > n ? -1 : 1, l = !0; l;)
                if (i[a] <= n && i[a + 1] > n ? (o = (n - i[a]) / (i[a + 1] - i[a]), l = !1) : a += h, a < 0 || s - 1 <= a) {
                    if (a === s - 1) return r[a];
                    l = !1
                } return r[a] + (r[a + 1] - r[a]) * o
        }
        var D = createTypedArray("float32", 8);
        return {
            getSegmentsLength: function (t) {
                var e, r = segments_length_pool.newElement(),
                    i = t.c,
                    s = t.v,
                    a = t.o,
                    n = t.i,
                    o = t._length,
                    h = r.lengths,
                    l = 0;
                for (e = 0; e < o - 1; e += 1) h[e] = p(s[e], s[e + 1], a[e], n[e + 1]), l += h[e].addedLength;
                return i && o && (h[e] = p(s[e], s[0], a[e], n[0]), l += h[e].addedLength), r.totalLength = l, r
            },
            getNewSegment: function (t, e, r, i, s, a, n) {
                var o, h = M(s = s < 0 ? 0 : 1 < s ? 1 : s, n),
                    l = M(a = 1 < a ? 1 : a, n),
                    p = t.length,
                    m = 1 - h,
                    f = 1 - l,
                    c = m * m * m,
                    d = h * m * m * 3,
                    u = h * h * m * 3,
                    y = h * h * h,
                    g = m * m * f,
                    v = h * m * f + m * h * f + m * m * l,
                    b = h * h * f + m * h * l + h * m * l,
                    E = h * h * l,
                    x = m * f * f,
                    P = h * f * f + m * l * f + m * f * l,
                    S = h * l * f + m * l * l + h * f * l,
                    _ = h * l * l,
                    A = f * f * f,
                    C = l * f * f + f * l * f + f * f * l,
                    T = l * l * f + f * l * l + l * f * l,
                    k = l * l * l;
                for (o = 0; o < p; o += 1) D[4 * o] = Math.round(1e3 * (c * t[o] + d * r[o] + u * i[o] + y * e[o])) / 1e3, D[4 * o + 1] = Math.round(1e3 * (g * t[o] + v * r[o] + b * i[o] + E * e[o])) / 1e3, D[4 * o + 2] = Math.round(1e3 * (x * t[o] + P * r[o] + S * i[o] + _ * e[o])) / 1e3, D[4 * o + 3] = Math.round(1e3 * (A * t[o] + C * r[o] + T * i[o] + k * e[o])) / 1e3;
                return D
            },
            getPointInSegment: function (t, e, r, i, s, a) {
                var n = M(s, a),
                    o = 1 - n;
                return [Math.round(1e3 * (o * o * o * t[0] + (n * o * o + o * n * o + o * o * n) * r[0] + (n * n * o + o * n * n + n * o * n) * i[0] + n * n * n * e[0])) / 1e3, Math.round(1e3 * (o * o * o * t[1] + (n * o * o + o * n * o + o * o * n) * r[1] + (n * n * o + o * n * n + n * o * n) * i[1] + n * n * n * e[1])) / 1e3]
            },
            buildBezierData: t,
            pointOnLine2D: y,
            pointOnLine3D: function (t, e, r, i, s, a, n, o, h) {
                if (0 === r && 0 === a && 0 === h) return y(t, e, i, s, n, o);
                var l, p = Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - e, 2) + Math.pow(a - r, 2)),
                    m = Math.sqrt(Math.pow(n - t, 2) + Math.pow(o - e, 2) + Math.pow(h - r, 2)),
                    f = Math.sqrt(Math.pow(n - i, 2) + Math.pow(o - s, 2) + Math.pow(h - a, 2));
                return -1e-4 < (l = m < p ? f < p ? p - m - f : f - m - p : m < f ? f - m - p : m - p - f) && l < 1e-4
            }
        }
    }! function () {
        for (var a = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (t, e) {
            var r = (new Date).getTime(),
                i = Math.max(0, 16 - (r - a)),
                s = setTimeout(function () {
                    t(r + i)
                }, i);
            return a = r + i, s
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
            clearTimeout(t)
        })
    }();
    var bez = bezFunction();

    function dataFunctionManager() {
        function c(t, e) {
            for (var r = 0, i = e.length; r < i;) {
                if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
                r += 1
            }
        }

        function d(t) {
            var e, r, i;
            for (e = t.length - 1; 0 <= e; e -= 1)
                if ("sh" == t[e].ty) {
                    if (t[e].ks.k.i) u(t[e].ks.k);
                    else
                        for (i = t[e].ks.k.length, r = 0; r < i; r += 1) t[e].ks.k[r].s && u(t[e].ks.k[r].s[0]), t[e].ks.k[r].e && u(t[e].ks.k[r].e[0]);
                    !0
                } else "gr" == t[e].ty && d(t[e].it)
        }

        function u(t) {
            var e, r = t.i.length;
            for (e = 0; e < r; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
        }

        function o(t, e) {
            var r = e ? e.split(".") : [100, 100, 100];
            return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && void 0))
        }
        var h, r = function () {
                var i = [4, 4, 14];

                function s(t) {
                    var e, r, i, s = t.length;
                    for (e = 0; e < s; e += 1) 5 === t[e].ty && (r = t[e], void 0, i = r.t.d, r.t.d = {
                        k: [{
                            s: i,
                            t: 0
                        }]
                    })
                }
                return function (t) {
                    if (o(i, t.v) && (s(t.layers), t.assets)) {
                        var e, r = t.assets.length;
                        for (e = 0; e < r; e += 1) t.assets[e].layers && s(t.assets[e].layers)
                    }
                }
            }(),
            i = (h = [4, 7, 99], function (t) {
                if (t.chars && !o(h, t.v)) {
                    var e, r, i, s, a, n = t.chars.length;
                    for (e = 0; e < n; e += 1)
                        if (t.chars[e].data && t.chars[e].data.shapes)
                            for (i = (a = t.chars[e].data.shapes[0].it).length, r = 0; r < i; r += 1)(s = a[r].ks.k).__converted || (u(a[r].ks.k), s.__converted = !0)
                }
            }),
            s = function () {
                var i = [4, 1, 9];

                function a(t) {
                    var e, r, i, s = t.length;
                    for (e = 0; e < s; e += 1)
                        if ("gr" === t[e].ty) a(t[e].it);
                        else if ("fl" === t[e].ty || "st" === t[e].ty)
                        if (t[e].c.k && t[e].c.k[0].i)
                            for (i = t[e].c.k.length, r = 0; r < i; r += 1) t[e].c.k[r].s && (t[e].c.k[r].s[0] /= 255, t[e].c.k[r].s[1] /= 255, t[e].c.k[r].s[2] /= 255, t[e].c.k[r].s[3] /= 255), t[e].c.k[r].e && (t[e].c.k[r].e[0] /= 255, t[e].c.k[r].e[1] /= 255, t[e].c.k[r].e[2] /= 255, t[e].c.k[r].e[3] /= 255);
                        else t[e].c.k[0] /= 255, t[e].c.k[1] /= 255, t[e].c.k[2] /= 255, t[e].c.k[3] /= 255
                }

                function s(t) {
                    var e, r = t.length;
                    for (e = 0; e < r; e += 1) 4 === t[e].ty && a(t[e].shapes)
                }
                return function (t) {
                    if (o(i, t.v) && (s(t.layers), t.assets)) {
                        var e, r = t.assets.length;
                        for (e = 0; e < r; e += 1) t.assets[e].layers && s(t.assets[e].layers)
                    }
                }
            }(),
            a = function () {
                var i = [4, 4, 18];

                function l(t) {
                    var e, r, i;
                    for (e = t.length - 1; 0 <= e; e -= 1)
                        if ("sh" == t[e].ty) {
                            if (t[e].ks.k.i) t[e].ks.k.c = t[e].closed;
                            else
                                for (i = t[e].ks.k.length, r = 0; r < i; r += 1) t[e].ks.k[r].s && (t[e].ks.k[r].s[0].c = t[e].closed), t[e].ks.k[r].e && (t[e].ks.k[r].e[0].c = t[e].closed);
                            !0
                        } else "gr" == t[e].ty && l(t[e].it)
                }

                function s(t) {
                    var e, r, i, s, a, n, o = t.length;
                    for (r = 0; r < o; r += 1) {
                        if ((e = t[r]).hasMask) {
                            var h = e.masksProperties;
                            for (s = h.length, i = 0; i < s; i += 1)
                                if (h[i].pt.k.i) h[i].pt.k.c = h[i].cl;
                                else
                                    for (n = h[i].pt.k.length, a = 0; a < n; a += 1) h[i].pt.k[a].s && (h[i].pt.k[a].s[0].c = h[i].cl), h[i].pt.k[a].e && (h[i].pt.k[a].e[0].c = h[i].cl)
                        }
                        4 === e.ty && l(e.shapes)
                    }
                }
                return function (t) {
                    if (o(i, t.v) && (s(t.layers), t.assets)) {
                        var e, r = t.assets.length;
                        for (e = 0; e < r; e += 1) t.assets[e].layers && s(t.assets[e].layers)
                    }
                }
            }();
        var t = {};
        return t.completeData = function (t, e) {
            t.__complete || (s(t), r(t), i(t), a(t), function t(e, r, i) {
                var s, a, n, o, h, l, p, m = e.length;
                for (a = 0; a < m; a += 1)
                    if ("ks" in (s = e[a]) && !s.completed) {
                        if (s.completed = !0, s.tt && (e[a - 1].td = s.tt), s.hasMask) {
                            var f = s.masksProperties;
                            for (o = f.length, n = 0; n < o; n += 1)
                                if (f[n].pt.k.i) u(f[n].pt.k);
                                else
                                    for (l = f[n].pt.k.length, h = 0; h < l; h += 1) f[n].pt.k[h].s && u(f[n].pt.k[h].s[0]), f[n].pt.k[h].e && u(f[n].pt.k[h].e[0])
                        }
                        0 === s.ty ? (s.layers = c(s.refId, r), t(s.layers, r, i)) : 4 === s.ty ? d(s.shapes) : 5 == s.ty && (0 !== (p = s).t.a.length || "m" in p.t.p || (p.singleShape = !0))
                    }
            }(t.layers, t.assets, e), t.__complete = !0)
        }, t
    }
    var dataManager = dataFunctionManager(),
        FontManager = function () {
            var a = {
                    w: 0,
                    size: 0,
                    shapes: []
                },
                t = [];

            function u(t, e) {
                var r = createTag("span");
                r.style.fontFamily = e;
                var i = createTag("span");
                i.innerHTML = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
                var s = i.offsetWidth;
                return i.style.fontFamily = t + ", " + e, {
                    node: i,
                    w: s,
                    parent: r
                }
            }
            t = t.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
            var e = function () {
                this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now()
            };
            return e.getCombinedCharacterCodes = function () {
                return t
            }, e.prototype.addChars = function (t) {
                if (t) {
                    this.chars || (this.chars = []);
                    var e, r, i, s = t.length,
                        a = this.chars.length;
                    for (e = 0; e < s; e += 1) {
                        for (r = 0, i = !1; r < a;) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
                        i || (this.chars.push(t[e]), a += 1)
                    }
                }
            }, e.prototype.addFonts = function (t, e) {
                if (t) {
                    if (this.chars) return this.isLoaded = !0, void(this.fonts = t.list);
                    var r, i, s, a, n = t.list,
                        o = n.length,
                        h = o;
                    for (r = 0; r < o; r += 1) {
                        var l, p, m = !0;
                        if (n[r].loaded = !1, n[r].monoCase = u(n[r].fFamily, "monospace"), n[r].sansCase = u(n[r].fFamily, "sans-serif"), n[r].fPath) {
                            if ("p" === n[r].fOrigin || 3 === n[r].origin) {
                                if (0 < (l = document.querySelectorAll('style[f-forigin="p"][f-family="' + n[r].fFamily + '"], style[f-origin="3"][f-family="' + n[r].fFamily + '"]')).length && (m = !1), m) {
                                    var f = createTag("style");
                                    f.setAttribute("f-forigin", n[r].fOrigin), f.setAttribute("f-origin", n[r].origin), f.setAttribute("f-family", n[r].fFamily), f.type = "text/css", f.innerHTML = "@font-face {font-family: " + n[r].fFamily + "; font-style: normal; src: url('" + n[r].fPath + "');}", e.appendChild(f)
                                }
                            } else if ("g" === n[r].fOrigin || 1 === n[r].origin) {
                                for (l = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), p = 0; p < l.length; p++) - 1 !== l[p].href.indexOf(n[r].fPath) && (m = !1);
                                if (m) {
                                    var c = createTag("link");
                                    c.setAttribute("f-forigin", n[r].fOrigin), c.setAttribute("f-origin", n[r].origin), c.type = "text/css", c.rel = "stylesheet", c.href = n[r].fPath, document.body.appendChild(c)
                                }
                            } else if ("t" === n[r].fOrigin || 2 === n[r].origin) {
                                for (l = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), p = 0; p < l.length; p++) n[r].fPath === l[p].src && (m = !1);
                                if (m) {
                                    var d = createTag("link");
                                    d.setAttribute("f-forigin", n[r].fOrigin), d.setAttribute("f-origin", n[r].origin), d.setAttribute("rel", "stylesheet"), d.setAttribute("href", n[r].fPath), e.appendChild(d)
                                }
                            }
                        } else n[r].loaded = !0, h -= 1;
                        n[r].helper = (i = e, s = n[r], a = void 0, (a = createNS("text")).style.fontSize = "100px", a.setAttribute("font-family", s.fFamily), a.setAttribute("font-style", s.fStyle), a.setAttribute("font-weight", s.fWeight), a.textContent = "1", s.fClass ? (a.style.fontFamily = "inherit", a.setAttribute("class", s.fClass)) : a.style.fontFamily = s.fFamily, i.appendChild(a), createTag("canvas").getContext("2d").font = s.fWeight + " " + s.fStyle + " 100px " + s.fFamily, a), n[r].cache = {}, this.fonts.push(n[r])
                    }
                    0 === h ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
                } else this.isLoaded = !0
            }, e.prototype.getCharData = function (t, e, r) {
                for (var i = 0, s = this.chars.length; i < s;) {
                    if (this.chars[i].ch === t && this.chars[i].style === e && this.chars[i].fFamily === r) return this.chars[i];
                    i += 1
                }
                return ("string" == typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && console.warn("Missing character from exported characters list: ", t, e, r), a
            }, e.prototype.getFontByName = function (t) {
                for (var e = 0, r = this.fonts.length; e < r;) {
                    if (this.fonts[e].fName === t) return this.fonts[e];
                    e += 1
                }
                return this.fonts[0]
            }, e.prototype.measureText = function (t, e, r) {
                var i = this.getFontByName(e),
                    s = t.charCodeAt(0);
                if (!i.cache[s + 1]) {
                    var a = i.helper;
                    if (" " === t) {
                        a.textContent = "|" + t + "|";
                        var n = a.getComputedTextLength();
                        a.textContent = "||";
                        var o = a.getComputedTextLength();
                        i.cache[s + 1] = (n - o) / 100
                    } else a.textContent = t, i.cache[s + 1] = a.getComputedTextLength() / 100
                }
                return i.cache[s + 1] * r
            }, e.prototype.checkLoadedFonts = function () {
                var t, e, r, i = this.fonts.length,
                    s = i;
                for (t = 0; t < i; t += 1) this.fonts[t].loaded ? s -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node, r = this.fonts[t].monoCase.w, e.offsetWidth !== r ? (s -= 1, this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node, r = this.fonts[t].sansCase.w, e.offsetWidth !== r && (s -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
                0 !== s && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function () {
                    this.isLoaded = !0
                }.bind(this), 0)
            }, e.prototype.loaded = function () {
                return this.isLoaded
            }, e
        }(),
        PropertyFactory = function () {
            var m = initialDefaultFrame,
                s = Math.abs;

            function f(t, e) {
                var r, i = this.offsetTime;
                "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
                for (var s, a, n, o, h, l, p, m, f = e.lastIndex, c = f, d = this.keyframes.length - 1, u = !0; u;) {
                    if (s = this.keyframes[c], a = this.keyframes[c + 1], c === d - 1 && t >= a.t - i) {
                        s.h && (s = a), f = 0;
                        break
                    }
                    if (a.t - i > t) {
                        f = c;
                        break
                    }
                    c < d - 1 ? c += 1 : (f = 0, u = !1)
                }
                var y, g, v, b, E, x, P, S, _, A, C = a.t - i,
                    T = s.t - i;
                if (s.to) {
                    s.bezierData || (s.bezierData = bez.buildBezierData(s.s, a.s || s.e, s.to, s.ti));
                    var k = s.bezierData;
                    if (C <= t || t < T) {
                        var M = C <= t ? k.points.length - 1 : 0;
                        for (o = k.points[M].point.length, n = 0; n < o; n += 1) r[n] = k.points[M].point[n]
                    } else {
                        s.__fnct ? m = s.__fnct : (m = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get, s.__fnct = m), h = m((t - T) / (C - T));
                        var D, w = k.segmentLength * h,
                            F = e.lastFrame < t && e._lastKeyframeIndex === c ? e._lastAddedLength : 0;
                        for (p = e.lastFrame < t && e._lastKeyframeIndex === c ? e._lastPoint : 0, u = !0, l = k.points.length; u;) {
                            if (F += k.points[p].partialLength, 0 === w || 0 === h || p === k.points.length - 1) {
                                for (o = k.points[p].point.length, n = 0; n < o; n += 1) r[n] = k.points[p].point[n];
                                break
                            }
                            if (F <= w && w < F + k.points[p + 1].partialLength) {
                                for (D = (w - F) / k.points[p + 1].partialLength, o = k.points[p].point.length, n = 0; n < o; n += 1) r[n] = k.points[p].point[n] + (k.points[p + 1].point[n] - k.points[p].point[n]) * D;
                                break
                            }
                            p < l - 1 ? p += 1 : u = !1
                        }
                        e._lastPoint = p, e._lastAddedLength = F - k.points[p].partialLength, e._lastKeyframeIndex = c
                    }
                } else {
                    var I, V, R, B, L;
                    if (d = s.s.length, y = a.s || s.e, this.sh && 1 !== s.h)
                        if (C <= t) r[0] = y[0], r[1] = y[1], r[2] = y[2];
                        else if (t <= T) r[0] = s.s[0], r[1] = s.s[1], r[2] = s.s[2];
                    else {
                        var G = N(s.s),
                            z = N(y);
                        g = r, v = function (t, e, r) {
                            var i, s, a, n, o, h = [],
                                l = t[0],
                                p = t[1],
                                m = t[2],
                                f = t[3],
                                c = e[0],
                                d = e[1],
                                u = e[2],
                                y = e[3];
                            (s = l * c + p * d + m * u + f * y) < 0 && (s = -s, c = -c, d = -d, u = -u, y = -y);
                            o = 1e-6 < 1 - s ? (i = Math.acos(s), a = Math.sin(i), n = Math.sin((1 - r) * i) / a, Math.sin(r * i) / a) : (n = 1 - r, r);
                            return h[0] = n * l + o * c, h[1] = n * p + o * d, h[2] = n * m + o * u, h[3] = n * f + o * y, h
                        }(G, z, (t - T) / (C - T)), b = v[0], E = v[1], x = v[2], P = v[3], S = Math.atan2(2 * E * P - 2 * b * x, 1 - 2 * E * E - 2 * x * x), _ = Math.asin(2 * b * E + 2 * x * P), A = Math.atan2(2 * b * P - 2 * E * x, 1 - 2 * b * b - 2 * x * x), g[0] = S / degToRads, g[1] = _ / degToRads, g[2] = A / degToRads
                    } else
                        for (c = 0; c < d; c += 1) 1 !== s.h && (h = C <= t ? 1 : t < T ? 0 : (s.o.x.constructor === Array ? (s.__fnct || (s.__fnct = []), s.__fnct[c] ? m = s.__fnct[c] : (I = void 0 === s.o.x[c] ? s.o.x[0] : s.o.x[c], V = void 0 === s.o.y[c] ? s.o.y[0] : s.o.y[c], R = void 0 === s.i.x[c] ? s.i.x[0] : s.i.x[c], B = void 0 === s.i.y[c] ? s.i.y[0] : s.i.y[c], m = BezierFactory.getBezierEasing(I, V, R, B).get, s.__fnct[c] = m)) : s.__fnct ? m = s.__fnct : (I = s.o.x, V = s.o.y, R = s.i.x, B = s.i.y, m = BezierFactory.getBezierEasing(I, V, R, B).get, s.__fnct = m), m((t - T) / (C - T)))), y = a.s || s.e, L = 1 === s.h ? s.s[c] : s.s[c] + (y[c] - s.s[c]) * h, "multidimensional" === this.propType ? r[c] = L : r = L
                }
                return e.lastIndex = f, r
            }

            function N(t) {
                var e = t[0] * degToRads,
                    r = t[1] * degToRads,
                    i = t[2] * degToRads,
                    s = Math.cos(e / 2),
                    a = Math.cos(r / 2),
                    n = Math.cos(i / 2),
                    o = Math.sin(e / 2),
                    h = Math.sin(r / 2),
                    l = Math.sin(i / 2);
                return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l]
            }

            function c() {
                var t = this.comp.renderedFrame - this.offsetTime,
                    e = this.keyframes[0].t - this.offsetTime,
                    r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
                if (!(t === this._caching.lastFrame || this._caching.lastFrame !== m && (this._caching.lastFrame >= r && r <= t || this._caching.lastFrame < e && t < e))) {
                    this._caching.lastFrame >= t && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
                    var i = this.interpolateValue(t, this._caching);
                    this.pv = i
                }
                return this._caching.lastFrame = t, this.pv
            }

            function d(t) {
                var e;
                if ("unidimensional" === this.propType) e = t * this.mult, 1e-5 < s(this.v - e) && (this.v = e, this._mdf = !0);
                else
                    for (var r = 0, i = this.v.length; r < i;) e = t[r] * this.mult, 1e-5 < s(this.v[r] - e) && (this.v[r] = e, this._mdf = !0), r += 1
            }

            function u() {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                    if (this.lock) this.setVValue(this.pv);
                    else {
                        this.lock = !0, this._mdf = this._isFirstFrame;
                        var t, e = this.effectsSequence.length,
                            r = this.kf ? this.pv : this.data.k;
                        for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
                        this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
                    }
            }

            function y(t) {
                this.effectsSequence.push(t), this.container.addDynamicProperty(this)
            }

            function n(t, e, r, i) {
                this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = u, this.setVValue = d, this.addEffect = y
            }

            function o(t, e, r, i) {
                this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
                var s, a = e.k.length;
                this.v = createTypedArray("float32", a), this.pv = createTypedArray("float32", a);
                createTypedArray("float32", a);
                for (this.vel = createTypedArray("float32", a), s = 0; s < a; s += 1) this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
                this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = u, this.setVValue = d, this.addEffect = y
            }

            function h(t, e, r, i) {
                this.propType = "unidimensional", this.keyframes = e.k, this.offsetTime = t.data.st, this.frameId = -1, this._caching = {
                    lastFrame: m,
                    lastIndex: 0,
                    value: 0,
                    _lastKeyframeIndex: -1
                }, this.k = !0, this.kf = !0, this.data = e, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.v = m, this.pv = m, this._isFirstFrame = !0, this.getValue = u, this.setVValue = d, this.interpolateValue = f, this.effectsSequence = [c.bind(this)], this.addEffect = y
            }

            function l(t, e, r, i) {
                this.propType = "multidimensional";
                var s, a, n, o, h, l = e.k.length;
                for (s = 0; s < l - 1; s += 1) e.k[s].to && e.k[s].s && e.k[s].e && (a = e.k[s].s, n = e.k[s].e, o = e.k[s].to, h = e.k[s].ti, (2 === a.length && (a[0] !== n[0] || a[1] !== n[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], a[0] + o[0], a[1] + o[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], n[0] + h[0], n[1] + h[1]) || 3 === a.length && (a[0] !== n[0] || a[1] !== n[1] || a[2] !== n[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], a[0] + o[0], a[1] + o[1], a[2] + o[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], n[0] + h[0], n[1] + h[1], n[2] + h[2])) && (e.k[s].to = null, e.k[s].ti = null), a[0] === n[0] && a[1] === n[1] && 0 === o[0] && 0 === o[1] && 0 === h[0] && 0 === h[1] && (2 === a.length || a[2] === n[2] && 0 === o[2] && 0 === h[2]) && (e.k[s].to = null, e.k[s].ti = null));
                this.effectsSequence = [c.bind(this)], this.keyframes = e.k, this.offsetTime = t.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.getValue = u, this.setVValue = d, this.interpolateValue = f, this.frameId = -1;
                var p = e.k[0].s.length;
                for (this.v = createTypedArray("float32", p), this.pv = createTypedArray("float32", p), s = 0; s < p; s += 1) this.v[s] = m, this.pv[s] = m;
                this._caching = {
                    lastFrame: m,
                    lastIndex: 0,
                    value: createTypedArray("float32", p)
                }, this.addEffect = y
            }
            return {
                getProp: function (t, e, r, i, s) {
                    var a;
                    if (e.k.length)
                        if ("number" == typeof e.k[0]) a = new o(t, e, i, s);
                        else switch (r) {
                            case 0:
                                a = new h(t, e, i, s);
                                break;
                            case 1:
                                a = new l(t, e, i, s)
                        } else a = new n(t, e, i, s);
                    return a.effectsSequence.length && s.addDynamicProperty(a), a
                }
            }
        }(),
        TransformPropertyFactory = function () {
            function i(t, e, r) {
                if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix, this.pre = new Matrix, this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
                        k: [0, 0, 0]
                    }, 1, 0, this), e.rx) {
                    if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
                        var i, s = e.or.k.length;
                        for (i = 0; i < s; i += 1) e.or.k[i].to = e.or.k[i].ti = null
                    }
                    this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0
                } else this.r = PropertyFactory.getProp(t, e.r || {
                    k: 0
                }, 0, degToRads, this);
                e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
                    k: [0, 0, 0]
                }, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
                    k: [100, 100, 100]
                }, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
                    _mdf: !1,
                    v: 1
                }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
            }
            return i.prototype = {
                applyToMatrix: function (t) {
                    var e = this._mdf;
                    this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                },
                getValue: function (t) {
                    if (this.elem.globalData.frameId !== this.frameId) {
                        if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || t) {
                            if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                                var e, r, i = this.elem.globalData.frameRate;
                                if (this.p && this.p.keyframes && this.p.getValueAtTime) r = this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / i, 0), this.p.getValueAtTime(this.p.keyframes[0].t / i, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / i, 0), this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .01) / i, 0)) : (e = this.p.pv, this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / i, this.p.offsetTime));
                                else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                                    e = [], r = [];
                                    var s = this.px,
                                        a = this.py;
                                    s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t ? (e[0] = s.getValueAtTime((s.keyframes[0].t + .01) / i, 0), e[1] = a.getValueAtTime((a.keyframes[0].t + .01) / i, 0), r[0] = s.getValueAtTime(s.keyframes[0].t / i, 0), r[1] = a.getValueAtTime(a.keyframes[0].t / i, 0)) : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t ? (e[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / i, 0), e[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / i, 0), r[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - .01) / i, 0), r[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / i, 0)) : (e = [s.pv, a.pv], r[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - .01) / i, s.offsetTime), r[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / i, a.offsetTime))
                                }
                                this.v.rotate(-Math.atan2(e[1] - r[1], e[0] - r[0]))
                            }
                            this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                        }
                        this.frameId = this.elem.globalData.frameId
                    }
                },
                precalculateMatrix: function () {
                    if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
                        if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                            if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                            this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
                        }
                        if (this.r) {
                            if (this.r.effectsSequence.length) return;
                            this.pre.rotate(-this.r.v), this.appliedTransformations = 4
                        } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
                    }
                },
                autoOrient: function () {}
            }, extendPrototype([DynamicPropertyContainer], i), i.prototype.addDynamicProperty = function (t) {
                this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
            }, i.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
                getTransformProperty: function (t, e, r) {
                    return new i(t, e, r)
                }
            }
        }();

    function ShapePath() {
        this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength)
    }
    ShapePath.prototype.setPathData = function (t, e) {
        this.c = t, this.setLength(e);
        for (var r = 0; r < e;) this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1
    }, ShapePath.prototype.setLength = function (t) {
        for (; this._maxLength < t;) this.doubleArrayLength();
        this._length = t
    }, ShapePath.prototype.doubleArrayLength = function () {
        this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2
    }, ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
        var a;
        switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
            case "v":
                a = this.v;
                break;
            case "i":
                a = this.i;
                break;
            case "o":
                a = this.o
        }(!a[i] || a[i] && !s) && (a[i] = point_pool.newElement()), a[i][0] = t, a[i][1] = e
    }, ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
        this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(s, a, "i", n, o)
    }, ShapePath.prototype.reverse = function () {
        var t = new ShapePath;
        t.setPathData(this.c, this._length);
        var e = this.v,
            r = this.o,
            i = this.i,
            s = 0;
        this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
        var a, n = this._length - 1,
            o = this._length;
        for (a = s; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), n -= 1;
        return t
    };
    var ShapePropertyFactory = function () {
            var s = -999999;

            function t(t, e, r) {
                var i, s, a, n, o, h, l, p, m, f = r.lastIndex,
                    c = this.keyframes;
                if (t < c[0].t - this.offsetTime) i = c[0].s[0], a = !0, f = 0;
                else if (t >= c[c.length - 1].t - this.offsetTime) i = c[c.length - 1].s ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a = !0;
                else {
                    for (var d, u, y = f, g = c.length - 1, v = !0; v && (d = c[y], !((u = c[y + 1]).t - this.offsetTime > t));) y < g - 1 ? y += 1 : v = !1;
                    if (f = y, !(a = 1 === d.h)) {
                        if (t >= u.t - this.offsetTime) p = 1;
                        else if (t < d.t - this.offsetTime) p = 0;
                        else {
                            var b;
                            d.__fnct ? b = d.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)))
                        }
                        s = u.s ? u.s[0] : d.e[0]
                    }
                    i = d.s[0]
                }
                for (h = e._length, l = i.i[0].length, r.lastIndex = f, n = 0; n < h; n += 1)
                    for (o = 0; o < l; o += 1) m = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p, e.i[n][o] = m, m = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p, e.o[n][o] = m, m = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p, e.v[n][o] = m
            }

            function a() {
                this.paths = this.localShapeCollection
            }

            function e(t) {
                (function (t, e) {
                    if (t._length !== e._length || t.c !== e.c) return !1;
                    var r, i = t._length;
                    for (r = 0; r < i; r += 1)
                        if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
                    return !0
                })(this.v, t) || (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
            }

            function r() {
                if (this.elem.globalData.frameId !== this.frameId)
                    if (this.effectsSequence.length)
                        if (this.lock) this.setVValue(this.pv);
                        else {
                            this.lock = !0, this._mdf = !1;
                            var t, e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
                                r = this.effectsSequence.length;
                            for (t = 0; t < r; t += 1) e = this.effectsSequence[t](e);
                            this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId
                        }
                else this._mdf = !1
            }

            function n(t, e, r) {
                this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
                var i = 3 === r ? e.pt.k : e.ks.k;
                this.v = shape_pool.clone(i), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = a, this.effectsSequence = []
            }

            function i(t) {
                this.effectsSequence.push(t), this.container.addDynamicProperty(this)
            }

            function o(t, e, r) {
                this.propType = "shape", this.comp = t.comp, this.elem = t, this.container = t, this.offsetTime = t.data.st, this.keyframes = 3 === r ? e.pt.k : e.ks.k, this.k = !0, this.kf = !0;
                var i = this.keyframes[0].s[0].i.length;
                this.keyframes[0].s[0].i[0].length;
                this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, i), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = s, this.reset = a, this._caching = {
                    lastFrame: s,
                    lastIndex: 0
                }, this.effectsSequence = [function () {
                    var t = this.comp.renderedFrame - this.offsetTime,
                        e = this.keyframes[0].t - this.offsetTime,
                        r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                        i = this._caching.lastFrame;
                    return i !== s && (i < e && t < e || r < i && r < t) || (this._caching.lastIndex = i < t ? this._caching.lastIndex : 0, this.interpolateShape(t, this.pv, this._caching)), this._caching.lastFrame = t, this.pv
                }.bind(this)]
            }
            n.prototype.interpolateShape = t, n.prototype.getValue = r, n.prototype.setVValue = e, n.prototype.addEffect = i, o.prototype.getValue = r, o.prototype.interpolateShape = t, o.prototype.setVValue = e, o.prototype.addEffect = i;
            var h = function () {
                    var n = roundCorner;

                    function t(t, e) {
                        this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
                    }
                    return t.prototype = {
                        reset: a,
                        getValue: function () {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath())
                        },
                        convertEllToPath: function () {
                            var t = this.p.v[0],
                                e = this.p.v[1],
                                r = this.s.v[0] / 2,
                                i = this.s.v[1] / 2,
                                s = 3 !== this.d,
                                a = this.v;
                            a.v[0][0] = t, a.v[0][1] = e - i, a.v[1][0] = s ? t + r : t - r, a.v[1][1] = e, a.v[2][0] = t, a.v[2][1] = e + i, a.v[3][0] = s ? t - r : t + r, a.v[3][1] = e, a.i[0][0] = s ? t - r * n : t + r * n, a.i[0][1] = e - i, a.i[1][0] = s ? t + r : t - r, a.i[1][1] = e - i * n, a.i[2][0] = s ? t + r * n : t - r * n, a.i[2][1] = e + i, a.i[3][0] = s ? t - r : t + r, a.i[3][1] = e + i * n, a.o[0][0] = s ? t + r * n : t - r * n, a.o[0][1] = e - i, a.o[1][0] = s ? t + r : t - r, a.o[1][1] = e + i * n, a.o[2][0] = s ? t - r * n : t + r * n, a.o[2][1] = e + i, a.o[3][0] = s ? t - r : t + r, a.o[3][1] = e - i * n
                        }
                    }, extendPrototype([DynamicPropertyContainer], t), t
                }(),
                l = function () {
                    function t(t, e) {
                        this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
                    }
                    return t.prototype = {
                        reset: a,
                        getValue: function () {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath())
                        },
                        convertStarToPath: function () {
                            var t, e, r, i, s = 2 * Math.floor(this.pt.v),
                                a = 2 * Math.PI / s,
                                n = !0,
                                o = this.or.v,
                                h = this.ir.v,
                                l = this.os.v,
                                p = this.is.v,
                                m = 2 * Math.PI * o / (2 * s),
                                f = 2 * Math.PI * h / (2 * s),
                                c = -Math.PI / 2;
                            c += this.r.v;
                            var d = 3 === this.data.d ? -1 : 1;
                            for (t = this.v._length = 0; t < s; t += 1) {
                                r = n ? l : p, i = n ? m : f;
                                var u = (e = n ? o : h) * Math.cos(c),
                                    y = e * Math.sin(c),
                                    g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                                    v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                                u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), n = !n, c += a * d
                            }
                        },
                        convertPolygonToPath: function () {
                            var t, e = Math.floor(this.pt.v),
                                r = 2 * Math.PI / e,
                                i = this.or.v,
                                s = this.os.v,
                                a = 2 * Math.PI * i / (4 * e),
                                n = -Math.PI / 2,
                                o = 3 === this.data.d ? -1 : 1;
                            for (n += this.r.v, t = this.v._length = 0; t < e; t += 1) {
                                var h = i * Math.cos(n),
                                    l = i * Math.sin(n),
                                    p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                                    m = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                                h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - m * a * s * o, h + p * a * s * o, l + m * a * s * o, t, !0), n += r * o
                            }
                            this.paths.length = 0, this.paths[0] = this.v
                        }
                    }, extendPrototype([DynamicPropertyContainer], t), t
                }(),
                p = function () {
                    function t(t, e) {
                        this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
                    }
                    return t.prototype = {
                        convertRectToPath: function () {
                            var t = this.p.v[0],
                                e = this.p.v[1],
                                r = this.s.v[0] / 2,
                                i = this.s.v[1] / 2,
                                s = bm_min(r, i, this.r.v),
                                a = s * (1 - roundCorner);
                            this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0), this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0), this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0), this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0), this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0), this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)))
                        },
                        getValue: function (t) {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath())
                        },
                        reset: a
                    }, extendPrototype([DynamicPropertyContainer], t), t
                }();
            var m = {
                getShapeProp: function (t, e, r) {
                    var i;
                    return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new o(t, e, r) : new n(t, e, r) : 5 === r ? i = new p(t, e) : 6 === r ? i = new h(t, e) : 7 === r && (i = new l(t, e)), i.k && t.addDynamicProperty(i), i
                },
                getConstructorFunction: function () {
                    return n
                },
                getKeyframedConstructorFunction: function () {
                    return o
                }
            };
            return m
        }(),
        ShapeModifiers = (Yr = {}, Zr = {}, Yr.registerModifier = function (t, e) {
            Zr[t] || (Zr[t] = e)
        }, Yr.getModifier = function (t, e, r) {
            return new Zr[t](e, r)
        }, Yr),
        Yr, Zr;

    function ShapeModifier() {}

    function TrimModifier() {}

    function RoundCornersModifier() {}

    function RepeaterModifier() {}

    function ShapeCollection() {
        this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength)
    }

    function DashProperty(t, e, r, i) {
        this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
        var s, a, n = e.length || 0;
        for (s = 0; s < n; s += 1) a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
            n: e[s].n,
            p: a
        };
        this.k || this.getValue(!0), this._isAnimated = this.k
    }

    function GradientProperty(t, e, r) {
        this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
        var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
        this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
    }
    ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
        if (!this.closed) {
            t.sh.container.addDynamicProperty(t.sh);
            var e = {
                shape: t.sh,
                data: t,
                localShapeCollection: shapeCollection_pool.newShapeCollection()
            };
            this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated()
        }
    }, ShapeModifier.prototype.init = function (t, e) {
        this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
    }, ShapeModifier.prototype.processKeys = function () {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
    }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
        this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
    }, TrimModifier.prototype.addShapeToModifier = function (t) {
        t.pathsData = []
    }, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
        var a = [];
        e <= 1 ? a.push({
            s: t,
            e: e
        }) : 1 <= t ? a.push({
            s: t - 1,
            e: e - 1
        }) : (a.push({
            s: t,
            e: 1
        }), a.push({
            s: 0,
            e: e - 1
        }));
        var n, o, h = [],
            l = a.length;
        for (n = 0; n < l; n += 1) {
            var p, m;
            if ((o = a[n]).e * s < i || o.s * s > i + r);
            else p = o.s * s <= i ? 0 : (o.s * s - i) / r, m = o.e * s >= i + r ? 1 : (o.e * s - i) / r, h.push([p, m])
        }
        return h.length || h.push([0, 0]), h
    }, TrimModifier.prototype.releasePathsData = function (t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1) segments_length_pool.release(t[e]);
        return t.length = 0, t
    }, TrimModifier.prototype.processShapes = function (t) {
        var e, r, i;
        if (this._mdf || t) {
            var s = this.o.v % 360 / 360;
            if (s < 0 && (s += 1), e = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + s, (r = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + s) < e) {
                var a = e;
                e = r, r = a
            }
            e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r
        } else e = this.sValue, r = this.eValue;
        var n, o, h, l, p, m, f = this.shapes.length,
            c = 0;
        if (r === e)
            for (n = 0; n < f; n += 1) this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
        else if (1 === r && 0 === e || 0 === r && 1 === e) {
            if (this._mdf)
                for (n = 0; n < f; n += 1) this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0
        } else {
            var d, u, y = [];
            for (n = 0; n < f; n += 1)
                if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
                    if (h = (i = d.shape.paths)._length, m = 0, !d.shape._mdf && d.pathsData.length) m = d.totalShapeLength;
                    else {
                        for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(i.shapes[o]), l.push(p), m += p.totalLength;
                        d.totalShapeLength = m, d.pathsData = l
                    }
                    c += m, d.shape._mdf = !0
                } else d.shape.paths = d.localShapeCollection;
            var g, v = e,
                b = r,
                E = 0;
            for (n = f - 1; 0 <= n; n -= 1)
                if ((d = this.shapes[n]).shape._mdf) {
                    for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && 1 < f ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, E, c), E += d.totalShapeLength) : g = [
                            [v, b]
                        ], h = g.length, o = 0; o < h; o += 1) {
                        v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({
                            s: d.totalShapeLength * v,
                            e: d.totalShapeLength * b
                        }) : 1 <= v ? y.push({
                            s: d.totalShapeLength * (v - 1),
                            e: d.totalShapeLength * (b - 1)
                        }) : (y.push({
                            s: d.totalShapeLength * v,
                            e: d.totalShapeLength
                        }), y.push({
                            s: 0,
                            e: d.totalShapeLength * (b - 1)
                        }));
                        var x = this.addShapes(d, y[0]);
                        if (y[0].s !== y[0].e) {
                            if (1 < y.length)
                                if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                                    var P = x.pop();
                                    this.addPaths(x, u), x = this.addShapes(d, y[1], P)
                                } else this.addPaths(x, u), x = this.addShapes(d, y[1]);
                            this.addPaths(x, u)
                        }
                    }
                    d.shape.paths = u
                }
        }
    }, TrimModifier.prototype.addPaths = function (t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1) e.addShape(t[r])
    }, TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
        s.setXYAt(e[0], e[1], "o", a), s.setXYAt(r[0], r[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(i[0], i[1], "v", a + 1)
    }, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
        e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1)
    }, TrimModifier.prototype.addShapes = function (t, e, r) {
        var i, s, a, n, o, h, l, p, m = t.pathsData,
            f = t.shape.paths.shapes,
            c = t.shape.paths._length,
            d = 0,
            u = [],
            y = !0;
        for (p = r ? (o = r._length, r._length) : (r = shape_pool.newElement(), o = 0), u.push(r), i = 0; i < c; i += 1) {
            for (h = m[i].lengths, r.c = f[i].c, a = f[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1)
                if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, r.c = !1;
                else {
                    if (d > e.e) {
                        r.c = !1;
                        break
                    }
                    e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(f[i].v[s - 1], f[i].o[s - 1], f[i].i[s], f[i].v[s], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[s - 1], f[i].v[s], f[i].o[s - 1], f[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += n.addedLength, o += 1
                } if (f[i].c && h.length) {
                if (n = h[s - 1], d <= e.e) {
                    var g = h[s - 1].addedLength;
                    e.s <= d && e.e >= d + g ? (this.addSegment(f[i].v[s - 1], f[i].o[s - 1], f[i].i[0], f[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[s - 1], f[i].v[0], f[i].o[s - 1], f[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1)
                } else r.c = !1;
                d += n.addedLength, o += 1
            }
            if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
            i < c - 1 && (r = shape_pool.newElement(), y = !0, u.push(r), o = 0)
        }
        return u
    }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length
    }, RoundCornersModifier.prototype.processPath = function (t, e) {
        var r = shape_pool.newElement();
        r.c = t.c;
        var i, s, a, n, o, h, l, p, m, f, c, d, u, y = t._length,
            g = 0;
        for (i = 0; i < y; i += 1) s = t.v[i], n = t.o[i], a = t.i[i], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== i && i !== y - 1 || t.c ? (o = 0 === i ? t.v[y - 1] : t.v[i - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, m = u = s[1] - (s[1] - o[1]) * l, f = p - (p - s[0]) * roundCorner, c = m - (m - s[1]) * roundCorner, r.setTripleAt(p, m, f, c, d, u, g), g += 1, o = i === y - 1 ? t.v[0] : t.v[i + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = f = s[0] + (o[0] - s[0]) * l, m = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = m - (m - s[1]) * roundCorner, r.setTripleAt(p, m, f, c, d, u, g)) : r.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g) : r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], g), g += 1;
        return r
    }, RoundCornersModifier.prototype.processShapes = function (t) {
        var e, r, i, s, a, n, o = this.shapes.length,
            h = this.rd.v;
        if (0 !== h)
            for (r = 0; r < o; r += 1) {
                if ((a = this.shapes[r]).shape.paths, n = a.localShapeCollection, a.shape._mdf || this._mdf || t)
                    for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h));
                a.shape.paths = a.localShapeCollection
            }
        this.dynamicProperties.length || (this._mdf = !1)
    }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix, this.rMatrix = new Matrix, this.sMatrix = new Matrix, this.tMatrix = new Matrix, this.matrix = new Matrix
    }, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, s, a) {
        var n = a ? -1 : 1,
            o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
            h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
        t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(a ? 1 / o : o, a ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2])
    }, RepeaterModifier.prototype.init = function (t, e, r, i) {
        this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]);
        for (; 0 < r;) r -= 1, this._elements.unshift(e[r]), 1;
        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
    }, RepeaterModifier.prototype.resetElements = function (t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it)
    }, RepeaterModifier.prototype.cloneElements = function (t) {
        t.length;
        var e = JSON.parse(JSON.stringify(t));
        return this.resetElements(e), e
    }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1) t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e)
    }, RepeaterModifier.prototype.processShapes = function (t) {
        var e, r, i, s, a;
        if (this._mdf || t) {
            var n, o = Math.ceil(this.c.v);
            if (this._groups.length < o) {
                for (; this._groups.length < o;) {
                    var h = {
                        it: this.cloneElements(this._elements),
                        ty: "gr"
                    };
                    h.it.push({
                        a: {
                            a: 0,
                            ix: 1,
                            k: [0, 0]
                        },
                        nm: "Transform",
                        o: {
                            a: 0,
                            ix: 7,
                            k: 100
                        },
                        p: {
                            a: 0,
                            ix: 2,
                            k: [0, 0]
                        },
                        r: {
                            a: 1,
                            ix: 6,
                            k: [{
                                s: 0,
                                e: 0,
                                t: 0
                            }, {
                                s: 0,
                                e: 0,
                                t: 1
                            }]
                        },
                        s: {
                            a: 0,
                            ix: 3,
                            k: [100, 100]
                        },
                        sa: {
                            a: 0,
                            ix: 5,
                            k: 0
                        },
                        sk: {
                            a: 0,
                            ix: 4,
                            k: 0
                        },
                        ty: "tr"
                    }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1
                }
                this.elem.reloadShapes()
            }
            for (i = a = 0; i <= this._groups.length - 1; i += 1) n = a < o, this._groups[i]._render = n, this.changeGroupRender(this._groups[i].it, n), a += 1;
            this._currentCopies = o;
            var l = this.o.v,
                p = l % 1,
                m = 0 < l ? Math.floor(l) : Math.ceil(l),
                f = (this.tr.v.props, this.pMatrix.props),
                c = this.rMatrix.props,
                d = this.sMatrix.props;
            this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
            var u, y, g = 0;
            if (0 < l) {
                for (; g < m;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;
                p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p)
            } else if (l < 0) {
                for (; m < g;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;
                p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p)
            }
            for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
                if (y = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== g) {
                    for ((0 !== i && 1 === s || i !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];
                    this.matrix.reset()
                } else
                    for (this.matrix.reset(), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];
                g += 1, a -= 1, i += s
            }
        } else
            for (a = this._currentCopies, i = 0, s = 1; a;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, i += s
    }, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
        this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
    }, ShapeCollection.prototype.releaseShapes = function () {
        var t;
        for (t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);
        this._length = 0
    }, DashProperty.prototype.getValue = function (t) {
        if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
            var e = 0,
                r = this.dataProps.length;
            for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
        }
    }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
        for (var r = 0, i = this.o.length / 2; r < i;) {
            if (.01 < Math.abs(t[4 * r] - t[4 * e + 2 * r])) return !1;
            r += 1
        }
        return !0
    }, GradientProperty.prototype.checkCollapsable = function () {
        if (this.o.length / 2 != this.c.length / 4) return !1;
        if (this.data.k.k[0].s)
            for (var t = 0, e = this.data.k.k.length; t < e;) {
                if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
                t += 1
            } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
        return !0
    }, GradientProperty.prototype.getValue = function (t) {
        if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
            var e, r, i, s = 4 * this.data.p;
            for (e = 0; e < s; e += 1) r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
            if (this.o.length)
                for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
            this._mdf = !t
        }
    }, extendPrototype([DynamicPropertyContainer], GradientProperty);
    var buildShapeString = function (t, e, r, i) {
            if (0 === e) return "";
            var s, a = t.o,
                n = t.i,
                o = t.v,
                h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
            for (s = 1; s < e; s += 1) h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[s][0], n[s][1]) + " " + i.applyToPointStringified(o[s][0], o[s][1]);
            return r && e && (h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h
        },
        ImagePreloader = function () {
            var s = function () {
                var t = createTag("canvas");
                t.width = 1, t.height = 1;
                var e = t.getContext("2d");
                return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t
            }();

            function t() {
                this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
            }

            function e(t) {
                var e = function (t, e, r) {
                        var i = "";
                        if (t.e) i = t.p;
                        else if (e) {
                            var s = t.p; - 1 !== s.indexOf("images/") && (s = s.split("/")[1]), i = e + s
                        } else i = r, i += t.u ? t.u : "", i += t.p;
                        return i
                    }(t, this.assetsPath, this.path),
                    r = createTag("img");
                r.crossOrigin = "anonymous", r.addEventListener("load", this._imageLoaded.bind(this), !1), r.addEventListener("error", function () {
                    i.img = s, this._imageLoaded()
                }.bind(this), !1), r.src = e;
                var i = {
                    img: r,
                    assetData: t
                };
                return i
            }

            function r(t, e) {
                this.imagesLoadedCb = e;
                var r, i = t.length;
                for (r = 0; r < i; r += 1) t[r].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[r])))
            }

            function i(t) {
                this.path = t || ""
            }

            function a(t) {
                this.assetsPath = t || ""
            }

            function n(t) {
                for (var e = 0, r = this.images.length; e < r;) {
                    if (this.images[e].assetData === t) return this.images[e].img;
                    e += 1
                }
            }

            function o() {
                this.imagesLoadedCb = null, this.images.length = 0
            }

            function h() {
                return this.totalImages === this.loadedAssets
            }
            return function () {
                this.loadAssets = r, this.setAssetsPath = a, this.setPath = i, this.loaded = h, this.destroy = o, this.getImage = n, this._createImageData = e, this._imageLoaded = t, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = []
            }
        }(),
        featureSupport = (qw = {
            maskType: !0
        }, (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (qw.maskType = !1), qw),
        qw, filtersFactory = (rw = {}, rw.createFilter = function (t) {
            var e = createNS("filter");
            return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e
        }, rw.createAlphaToLuminanceFilter = function () {
            var t = createNS("feColorMatrix");
            return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
        }, rw),
        rw, assetLoader = function () {
            function a(t) {
                return t.response && "object" == typeof t.response ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0
            }
            return {
                load: function (t, e, r) {
                    var i, s = new XMLHttpRequest;
                    s.open("GET", t, !0);
                    try {
                        s.responseType = "json"
                    } catch (t) {}
                    s.send(), s.onreadystatechange = function () {
                        if (4 == s.readyState)
                            if (200 == s.status) i = a(s), e(i);
                            else try {
                                i = a(s), e(i)
                            } catch (t) {
                                r && r(t)
                            }
                    }
                }
            }
        }();

    function TextAnimatorProperty(t, e, r) {
        this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
            alignment: {}
        }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r)
    }

    function TextAnimatorDataProperty(t, e, r) {
        var i = {
                propType: !1
            },
            s = PropertyFactory.getProp,
            a = e.a;
        this.a = {
            r: a.r ? s(t, a.r, 0, degToRads, r) : i,
            rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
            ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
            sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
            sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
            s: a.s ? s(t, a.s, 1, .01, r) : i,
            a: a.a ? s(t, a.a, 1, 0, r) : i,
            o: a.o ? s(t, a.o, 0, .01, r) : i,
            p: a.p ? s(t, a.p, 1, 0, r) : i,
            sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
            sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
            fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
            fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
            fs: a.fs ? s(t, a.fs, 0, .01, r) : i,
            fb: a.fb ? s(t, a.fb, 0, .01, r) : i,
            t: a.t ? s(t, a.t, 0, 0, r) : i
        }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t
    }

    function LetterProps(t, e, r, i, s, a) {
        this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = a, this._mdf = {
            o: !0,
            sw: !!e,
            sc: !!r,
            fc: !!i,
            m: !0,
            p: !0
        }
    }

    function TextProperty(t, e) {
        this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
            ascent: 0,
            boxWidth: this.defaultBoxWidth,
            f: "",
            fStyle: "",
            fWeight: "",
            fc: "",
            j: "",
            justifyOffset: "",
            l: [],
            lh: 0,
            lineWidths: [],
            ls: "",
            of: "",
            s: "",
            sc: "",
            sw: 0,
            t: 0,
            tr: 0,
            sz: 0,
            ps: null,
            fillColorAnim: !1,
            strokeColorAnim: !1,
            strokeWidthAnim: !1,
            yOffset: 0,
            finalSize: 0,
            finalText: [],
            finalLineHeight: 0,
            __complete: !1
        }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
    }
    TextAnimatorProperty.prototype.searchProperties = function () {
        var t, e, r = this._textData.a.length,
            i = PropertyFactory.getProp;
        for (t = 0; t < r; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
        this._textData.p && "m" in this._textData.p ? (this._pathData = {
            f: i(this._elem, this._textData.p.f, 0, 0, this),
            l: i(this._elem, this._textData.p.l, 0, 0, this),
            r: this._textData.p.r,
            m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
        }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this)
    }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
        if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
            this._isFirstFrame = !1;
            var r, i, s, a, n, o, h, l, p, m, f, c, d, u, y, g, v, b, E, x = this._moreOptions.alignment.v,
                P = this._animatorsData,
                S = this._textData,
                _ = this.mHelper,
                A = this._renderType,
                C = this.renderedLetters.length,
                T = (this.data, t.l);
            if (this._hasMaskedPath) {
                if (E = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
                    var k, M = E.v;
                    for (this._pathData.r && (M = M.reverse()), n = {
                            tLength: 0,
                            segments: []
                        }, a = M._length - 1, s = g = 0; s < a; s += 1) k = bez.buildBezierData(M.v[s], M.v[s + 1], [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], [M.i[s + 1][0] - M.v[s + 1][0], M.i[s + 1][1] - M.v[s + 1][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength;
                    s = a, E.v.c && (k = bez.buildBezierData(M.v[s], M.v[0], [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], [M.i[0][0] - M.v[0][0], M.i[0][1] - M.v[0][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength), this._pathData.pi = n
                }
                if (n = this._pathData.pi, o = this._pathData.f.v, m = 1, p = !(l = f = 0), u = n.segments, o < 0 && E.v.c)
                    for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), m = (d = u[f = u.length - 1].points).length - 1; o < 0;) o += d[m].partialLength, (m -= 1) < 0 && (m = (d = u[f -= 1].points).length - 1);
                c = (d = u[f].points)[m - 1], y = (h = d[m]).partialLength
            }
            a = T.length, i = r = 0;
            var D, w, F, I, V = 1.2 * t.finalSize * .714,
                R = !0;
            F = P.length;
            var B, L, G, z, N, O, H, j, q, W, Y, X, $, K = -1,
                Z = o,
                J = f,
                Q = m,
                U = -1,
                tt = "",
                et = this.defaultPropsArray;
            if (2 === t.j || 1 === t.j) {
                var rt = 0,
                    it = 0,
                    st = 2 === t.j ? -.5 : -1,
                    at = 0,
                    nt = !0;
                for (s = 0; s < a; s += 1)
                    if (T[s].n) {
                        for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1;
                        nt = !(rt = 0)
                    } else {
                        for (w = 0; w < F; w += 1)(D = P[w].a).t.propType && (nt && 2 === t.j && (it += D.t.v * st), (B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? rt += D.t.v * B[0] * st : rt += D.t.v * B * st);
                        nt = !1
                    } for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1
            }
            for (s = 0; s < a; s += 1) {
                if (_.reset(), N = 1, T[s].n) r = 0, i += t.yOffset, i += R ? 1 : 0, o = Z, R = !1, 0, this._hasMaskedPath && (m = Q, c = (d = u[f = J].points)[m - 1], y = (h = d[m]).partialLength, l = 0), $ = W = X = tt = "", et = this.defaultPropsArray;
                else {
                    if (this._hasMaskedPath) {
                        if (U !== T[s].line) {
                            switch (t.j) {
                                case 1:
                                    o += g - t.lineWidths[T[s].line];
                                    break;
                                case 2:
                                    o += (g - t.lineWidths[T[s].line]) / 2
                            }
                            U = T[s].line
                        }
                        K !== T[s].ind && (T[K] && (o += T[K].extra), o += T[s].an / 2, K = T[s].ind), o += x[0] * T[s].an / 200;
                        var ot = 0;
                        for (w = 0; w < F; w += 1)(D = P[w].a).p.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? ot += D.p.v[0] * B[0] : ot += D.p.v[0] * B), D.a.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? ot += D.a.v[0] * B[0] : ot += D.a.v[0] * B);
                        for (p = !0; p;) o + ot <= l + y || !d ? (v = (o + ot - l) / h.partialLength, G = c.point[0] + (h.point[0] - c.point[0]) * v, z = c.point[1] + (h.point[1] - c.point[1]) * v, _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100), p = !1) : d && (l += h.partialLength, (m += 1) >= d.length && (m = 0, d = u[f += 1] ? u[f].points : E.v.c ? u[f = m = 0].points : (l -= h.partialLength, null)), d && (c = h, y = (h = d[m]).partialLength));
                        L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0)
                    } else L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0), _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100, 0);
                    for (T[s].l / 2, w = 0; w < F; w += 1)(D = P[w].a).t.propType && (B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? B.length ? o += D.t.v * B[0] : o += D.t.v * B : B.length ? r += D.t.v * B[0] : r += D.t.v * B));
                    for (T[s].l / 2, t.strokeWidthAnim && (H = t.sw || 0), t.strokeColorAnim && (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), w = 0; w < F; w += 1)(D = P[w].a).a.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? _.translate(-D.a.v[0] * B[0], -D.a.v[1] * B[1], D.a.v[2] * B[2]) : _.translate(-D.a.v[0] * B, -D.a.v[1] * B, D.a.v[2] * B));
                    for (w = 0; w < F; w += 1)(D = P[w].a).s.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? _.scale(1 + (D.s.v[0] - 1) * B[0], 1 + (D.s.v[1] - 1) * B[1], 1) : _.scale(1 + (D.s.v[0] - 1) * B, 1 + (D.s.v[1] - 1) * B, 1));
                    for (w = 0; w < F; w += 1) {
                        if (D = P[w].a, B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars), D.sk.propType && (B.length ? _.skewFromAxis(-D.sk.v * B[0], D.sa.v * B[1]) : _.skewFromAxis(-D.sk.v * B, D.sa.v * B)), D.r.propType && (B.length ? _.rotateZ(-D.r.v * B[2]) : _.rotateZ(-D.r.v * B)), D.ry.propType && (B.length ? _.rotateY(D.ry.v * B[1]) : _.rotateY(D.ry.v * B)), D.rx.propType && (B.length ? _.rotateX(D.rx.v * B[0]) : _.rotateX(D.rx.v * B)), D.o.propType && (B.length ? N += (D.o.v * B[0] - N) * B[0] : N += (D.o.v * B - N) * B), t.strokeWidthAnim && D.sw.propType && (B.length ? H += D.sw.v * B[0] : H += D.sw.v * B), t.strokeColorAnim && D.sc.propType)
                            for (q = 0; q < 3; q += 1) B.length ? O[q] = O[q] + (D.sc.v[q] - O[q]) * B[0] : O[q] = O[q] + (D.sc.v[q] - O[q]) * B;
                        if (t.fillColorAnim && t.fc) {
                            if (D.fc.propType)
                                for (q = 0; q < 3; q += 1) B.length ? j[q] = j[q] + (D.fc.v[q] - j[q]) * B[0] : j[q] = j[q] + (D.fc.v[q] - j[q]) * B;
                            D.fh.propType && (j = B.length ? addHueToRGB(j, D.fh.v * B[0]) : addHueToRGB(j, D.fh.v * B)), D.fs.propType && (j = B.length ? addSaturationToRGB(j, D.fs.v * B[0]) : addSaturationToRGB(j, D.fs.v * B)), D.fb.propType && (j = B.length ? addBrightnessToRGB(j, D.fb.v * B[0]) : addBrightnessToRGB(j, D.fb.v * B))
                        }
                    }
                    for (w = 0; w < F; w += 1)(D = P[w].a).p.propType && (B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars), this._hasMaskedPath ? B.length ? _.translate(0, D.p.v[1] * B[0], -D.p.v[2] * B[1]) : _.translate(0, D.p.v[1] * B, -D.p.v[2] * B) : B.length ? _.translate(D.p.v[0] * B[0], D.p.v[1] * B[1], -D.p.v[2] * B[2]) : _.translate(D.p.v[0] * B, D.p.v[1] * B, -D.p.v[2] * B));
                    if (t.strokeWidthAnim && (W = H < 0 ? 0 : H), t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * O[0]) + "," + Math.round(255 * O[1]) + "," + Math.round(255 * O[2]) + ")"), t.fillColorAnim && t.fc && (X = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), this._hasMaskedPath) {
                        if (_.translate(0, -t.ls), _.translate(0, x[1] * V / 100 + i, 0), S.p.p) {
                            b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                            var ht = 180 * Math.atan(b) / Math.PI;
                            h.point[0] < c.point[0] && (ht += 180), _.rotate(-ht * Math.PI / 180)
                        }
                        _.translate(G, z, 0), o -= x[0] * T[s].an / 200, T[s + 1] && K !== T[s + 1].ind && (o += T[s].an / 2, o += t.tr / 1e3 * t.finalSize)
                    } else {
                        switch (_.translate(r, i, 0), t.ps && _.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                            case 1:
                                _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);
                                break;
                            case 2:
                                _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0)
                        }
                        _.translate(0, -t.ls), _.translate(L, 0, 0), _.translate(x[0] * T[s].an / 200, x[1] * V / 100, 0), r += T[s].l + t.tr / 1e3 * t.finalSize
                    }
                    "html" === A ? tt = _.toCSS() : "svg" === A ? tt = _.to2dCSS() : et = [_.props[0], _.props[1], _.props[2], _.props[3], _.props[4], _.props[5], _.props[6], _.props[7], _.props[8], _.props[9], _.props[10], _.props[11], _.props[12], _.props[13], _.props[14], _.props[15]], $ = N
                }
                this.lettersChangedFlag = C <= s ? (I = new LetterProps($, W, Y, X, tt, et), this.renderedLetters.push(I), C += 1, !0) : (I = this.renderedLetters[s]).update($, W, Y, X, tt, et) || this.lettersChangedFlag
            }
        }
    }, TextAnimatorProperty.prototype.getValue = function () {
        this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
    }, TextAnimatorProperty.prototype.mHelper = new Matrix, TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, r, i, s, a) {
        this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1;
        var n = this._mdf.p = !1;
        return this.o !== t && (this.o = t, n = this._mdf.o = !0), this.sw !== e && (this.sw = e, n = this._mdf.sw = !0), this.sc !== r && (this.sc = r, n = this._mdf.sc = !0), this.fc !== i && (this.fc = i, n = this._mdf.fc = !0), this.m !== s && (this.m = s, n = this._mdf.m = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, n = this._mdf.p = !0), n
    }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        return t
    }, TextProperty.prototype.setCurrentData = function (t) {
        t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
    }, TextProperty.prototype.searchProperty = function () {
        return this.searchKeyframes()
    }, TextProperty.prototype.searchKeyframes = function () {
        return this.kf = 1 < this.data.d.k.length, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
    }, TextProperty.prototype.addEffect = function (t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
    }, TextProperty.prototype.getValue = function (t) {
        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
            this.currentData.t = this.data.d.k[this.keysIndex].s.t;
            var e = this.currentData,
                r = this.keysIndex;
            if (this.lock) this.setCurrentData(this.currentData);
            else {
                this.lock = !0, this._mdf = !1;
                var i, s = this.effectsSequence.length,
                    a = t || this.data.d.k[this.keysIndex].s;
                for (i = 0; i < s; i += 1) a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);
                e !== a && this.setCurrentData(a), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId
            }
        }
    }, TextProperty.prototype.getKeyframeValue = function () {
        for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));) r += 1;
        return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s
    }, TextProperty.prototype.buildFinalText = function (t) {
        for (var e, r = FontManager.getCombinedCharacterCodes(), i = [], s = 0, a = t.length; s < a;) e = t.charCodeAt(s), -1 !== r.indexOf(e) ? i[i.length - 1] += t.charAt(s) : 55296 <= e && e <= 56319 && 56320 <= (e = t.charCodeAt(s + 1)) && e <= 57343 ? (i.push(t.substr(s, 2)), ++s) : i.push(t.charAt(s)), s += 1;
        return i
    }, TextProperty.prototype.completeTextData = function (t) {
        t.__complete = !0;
        var e, r, i, s, a, n, o, h = this.elem.globalData.fontManager,
            l = this.data,
            p = [],
            m = 0,
            f = l.m.g,
            c = 0,
            d = 0,
            u = 0,
            y = [],
            g = 0,
            v = 0,
            b = h.getFontByName(t.f),
            E = 0,
            x = b.fStyle ? b.fStyle.split(" ") : [],
            P = "normal",
            S = "normal";
        for (r = x.length, e = 0; e < r; e += 1) switch (x[e].toLowerCase()) {
            case "italic":
                S = "italic";
                break;
            case "bold":
                P = "700";
                break;
            case "black":
                P = "900";
                break;
            case "medium":
                P = "500";
                break;
            case "regular":
            case "normal":
                P = "400";
                break;
            case "light":
            case "thin":
                P = "200"
        }
        t.fWeight = b.fWeight || P, t.fStyle = S, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;
        var _, A = t.tr / 1e3 * t.finalSize;
        if (t.sz)
            for (var C, T, k = !0, M = t.sz[0], D = t.sz[1]; k;) {
                g = C = 0, r = (T = this.buildFinalText(t.t)).length, A = t.tr / 1e3 * t.finalSize;
                var w = -1;
                for (e = 0; e < r; e += 1) _ = T[e].charCodeAt(0), i = !1, " " === T[e] ? w = e : 13 !== _ && 3 !== _ || (i = !(g = 0), C += t.finalLineHeight || 1.2 * t.finalSize), M < g + (E = h.chars ? (o = h.getCharData(T[e], b.fStyle, b.fFamily), i ? 0 : o.w * t.finalSize / 100) : h.measureText(T[e], t.f, t.finalSize)) && " " !== T[e] ? (-1 === w ? r += 1 : e = w, C += t.finalLineHeight || 1.2 * t.finalSize, T.splice(e, w === e ? 1 : 0, "\r"), w = -1, g = 0) : (g += E, g += A);
                C += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && D < C ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = T, r = t.finalText.length, k = !1)
            }
        g = -A;
        var F, I = E = 0;
        for (e = 0; e < r; e += 1)
            if (i = !1, _ = (F = t.finalText[e]).charCodeAt(0), " " === F ? s = "\xa0" : 13 === _ || 3 === _ ? (I = 0, y.push(g), v = v < g ? g : v, g = -2 * A, i = !(s = ""), u += 1) : s = t.finalText[e], E = h.chars ? (o = h.getCharData(F, b.fStyle, h.getFontByName(t.f).fFamily), i ? 0 : o.w * t.finalSize / 100) : h.measureText(s, t.f, t.finalSize), " " === F ? I += E + A : (g += E + A + I, I = 0), p.push({
                    l: E,
                    an: E,
                    add: c,
                    n: i,
                    anIndexes: [],
                    val: s,
                    line: u,
                    animatorJustifyOffset: 0
                }), 2 == f) {
                if (c += E, "" === s || "\xa0" === s || e === r - 1) {
                    for ("" !== s && "\xa0" !== s || (c -= E); d <= e;) p[d].an = c, p[d].ind = m, p[d].extra = E, d += 1;
                    m += 1, c = 0
                }
            } else if (3 == f) {
            if (c += E, "" === s || e === r - 1) {
                for ("" === s && (c -= E); d <= e;) p[d].an = c, p[d].ind = m, p[d].extra = E, d += 1;
                c = 0, m += 1
            }
        } else p[m].ind = m, p[m].extra = 0, m += 1;
        if (t.l = p, v = v < g ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;
        else switch (t.boxWidth = v, t.j) {
            case 1:
                t.justifyOffset = -t.boxWidth;
                break;
            case 2:
                t.justifyOffset = -t.boxWidth / 2;
                break;
            default:
                t.justifyOffset = 0
        }
        t.lineWidths = y;
        var V, R, B = l.a;
        n = B.length;
        var L, G, z = [];
        for (a = 0; a < n; a += 1) {
            for ((V = B[a]).a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), G = 0, L = V.s.b, e = 0; e < r; e += 1)(R = p[e]).anIndexes[a] = G, (1 == L && "" !== R.val || 2 == L && "" !== R.val && "\xa0" !== R.val || 3 == L && (R.n || "\xa0" == R.val || e == r - 1) || 4 == L && (R.n || e == r - 1)) && (1 === V.s.rn && z.push(G), G += 1);
            l.a[a].s.totalChars = G;
            var N, O = -1;
            if (1 === V.s.rn)
                for (e = 0; e < r; e += 1) O != (R = p[e]).anIndexes[a] && (O = R.anIndexes[a], N = z.splice(Math.floor(Math.random() * z.length), 1)[0]), R.anIndexes[a] = N
        }
        t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100
    }, TextProperty.prototype.updateDocumentData = function (t, e) {
        e = void 0 === e ? this.keysIndex : e;
        var r = this.copyData({}, this.data.d.k[e].s);
        r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this)
    }, TextProperty.prototype.recalculate = function (t) {
        var e = this.data.d.k[t].s;
        e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e)
    }, TextProperty.prototype.canResizeFont = function (t) {
        this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
    }, TextProperty.prototype.setMinimumFontSize = function (t) {
        this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
    };
    var TextSelectorProp = function () {
            var l = Math.max,
                p = Math.min,
                m = Math.floor;

            function i(t, e) {
                this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
                    k: 0
                }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
                    v: 100
                }, this.o = PropertyFactory.getProp(t, e.o || {
                    k: 0
                }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
                    k: 0
                }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
                    k: 0
                }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
            }
            return i.prototype = {
                getMult: function (t) {
                    this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                    var e = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
                        r = 0,
                        i = this.finalS,
                        s = this.finalE,
                        a = this.data.sh;
                    if (2 == a) r = e(r = s === i ? s <= t ? 1 : 0 : l(0, p(.5 / (s - i) + (t - i) / (s - i), 1)));
                    else if (3 == a) r = e(r = s === i ? s <= t ? 0 : 1 : 1 - l(0, p(.5 / (s - i) + (t - i) / (s - i), 1)));
                    else if (4 == a) s === i ? r = 0 : (r = l(0, p(.5 / (s - i) + (t - i) / (s - i), 1))) < .5 ? r *= 2 : r = 1 - 2 * (r - .5), r = e(r);
                    else if (5 == a) {
                        if (s === i) r = 0;
                        else {
                            var n = s - i,
                                o = -n / 2 + (t = p(l(0, t + .5 - i), s - i)),
                                h = n / 2;
                            r = Math.sqrt(1 - o * o / (h * h))
                        }
                        r = e(r)
                    } else r = 6 == a ? e(r = s === i ? 0 : (t = p(l(0, t + .5 - i), s - i), (1 + Math.cos(Math.PI + 2 * Math.PI * t / (s - i))) / 2)) : (t >= m(i) && (r = t - i < 0 ? 1 - (i - t) : l(0, p(s - t, 1))), e(r));
                    return r * this.a.v
                },
                getValue: function (t) {
                    this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                    var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                        r = this.o.v / e,
                        i = this.s.v / e + r,
                        s = this.e.v / e + r;
                    if (s < i) {
                        var a = i;
                        i = s, s = a
                    }
                    this.finalS = i, this.finalE = s
                }
            }, extendPrototype([DynamicPropertyContainer], i), {
                getTextSelectorProp: function (t, e, r) {
                    return new i(t, e, r)
                }
            }
        }(),
        pool_factory = function (t, e, r, i) {
            var s = 0,
                a = t,
                n = createSizedArray(a);

            function o() {
                return s ? n[s -= 1] : e()
            }
            return {
                newElement: o,
                release: function (t) {
                    s === a && (n = pooling.double(n), a *= 2), r && r(t), n[s] = t, s += 1
                }
            }
        },
        pooling = {
            double: function (t) {
                return t.concat(createSizedArray(t.length))
            }
        },
        point_pool = pool_factory(8, function () {
            return createTypedArray("float32", 2)
        }),
        shape_pool = (EA = pool_factory(4, function () {
            return new ShapePath
        }, function (t) {
            var e, r = t._length;
            for (e = 0; e < r; e += 1) point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
            t._length = 0, t.c = !1
        }), EA.clone = function (t) {
            var e, r = EA.newElement(),
                i = void 0 === t._length ? t.v.length : t._length;
            for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1) r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
            return r
        }, EA),
        EA, shapeCollection_pool = (NA = {
            newShapeCollection: function () {
                var t;
                t = OA ? QA[OA -= 1] : new ShapeCollection;
                return t
            },
            release: function (t) {
                var e, r = t._length;
                for (e = 0; e < r; e += 1) shape_pool.release(t.shapes[e]);
                t._length = 0, OA === PA && (QA = pooling.double(QA), PA *= 2);
                QA[OA] = t, OA += 1
            }
        }, OA = 0, PA = 4, QA = createSizedArray(PA), NA),
        NA, OA, PA, QA, segments_length_pool = pool_factory(8, function () {
            return {
                lengths: [],
                totalLength: 0
            }
        }, function (t) {
            var e, r = t.lengths.length;
            for (e = 0; e < r; e += 1) bezier_length_pool.release(t.lengths[e]);
            t.lengths.length = 0
        }),
        bezier_length_pool = pool_factory(8, function () {
            return {
                addedLength: 0,
                percents: createTypedArray("float32", defaultCurveSegments),
                lengths: createTypedArray("float32", defaultCurveSegments)
            }
        });

    function BaseRenderer() {}

    function SVGRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
        var r = "";
        if (e && e.title) {
            var i = createNS("title"),
                s = createElementID();
            i.setAttribute("id", s), i.textContent = e.title, this.svgElement.appendChild(i), r += s
        }
        if (e && e.description) {
            var a = createNS("desc"),
                n = createElementID();
            a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), r += " " + n
        }
        r && this.svgElement.setAttribute("aria-labelledby", r);
        var o = createNS("defs");
        this.svgElement.appendChild(o);
        var h = createNS("g");
        this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
            preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
            imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
            progressiveLoad: e && e.progressiveLoad || !1,
            hideOnTransparent: !e || !1 !== e.hideOnTransparent,
            viewBoxOnly: e && e.viewBoxOnly || !1,
            viewBoxSize: e && e.viewBoxSize || !1,
            className: e && e.className || "",
            focusable: e && e.focusable
        }, this.globalData = {
            _mdf: !1,
            frameNum: -1,
            defs: o,
            renderConfig: this.renderConfig
        }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg"
    }

    function CanvasRenderer(t, e) {
        this.animationItem = t, this.renderConfig = {
            clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
            context: e && e.context || null,
            progressiveLoad: e && e.progressiveLoad || !1,
            preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
            imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
            className: e && e.className || ""
        }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
            frameNum: -1,
            _mdf: !1,
            renderConfig: this.renderConfig,
            currentGlobalAlpha: -1
        }, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
    }

    function HybridRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
            className: e && e.className || "",
            imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
            hideOnTransparent: !e || !1 !== e.hideOnTransparent
        }, this.globalData = {
            _mdf: !1,
            frameNum: -1,
            renderConfig: this.renderConfig
        }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html"
    }

    function MaskElement(t, e, r) {
        this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
        var i, s = this.globalData.defs,
            a = this.masksProperties ? this.masksProperties.length : 0;
        this.viewData = createSizedArray(a), this.solidPath = "";
        var n, o, h, l, p, m, f, c = this.masksProperties,
            d = 0,
            u = [],
            y = createElementID(),
            g = "clipPath",
            v = "clip-path";
        for (i = 0; i < a; i++)
            if (("a" !== c[i].mode && "n" !== c[i].mode || c[i].inv || 100 !== c[i].o.k || c[i].o.x) && (v = g = "mask"), "s" != c[i].mode && "i" != c[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = createNS("path"), "n" != c[i].mode) {
                var b;
                if (d += 1, n.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== c[i].x.k ? (v = g = "mask", f = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element), b = createElementID(), (p = createNS("filter")).setAttribute("id", b), (m = createNS("feMorphology")).setAttribute("operator", "erode"), m.setAttribute("in", "SourceGraphic"), m.setAttribute("radius", "0"), p.appendChild(m), s.appendChild(p), n.setAttribute("stroke", "s" === c[i].mode ? "#000000" : "#ffffff")) : f = m = null, this.storedData[i] = {
                        elem: n,
                        x: f,
                        expan: m,
                        lastPath: "",
                        lastOperator: "",
                        filterId: b,
                        lastRadius: 0
                    }, "i" == c[i].mode) {
                    h = u.length;
                    var E = createNS("g");
                    for (o = 0; o < h; o += 1) E.appendChild(u[o]);
                    var x = createNS("mask");
                    x.setAttribute("mask-type", "alpha"), x.setAttribute("id", y + "_" + d), x.appendChild(n), s.appendChild(x), E.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(E)
                } else u.push(n);
                c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
                    elem: n,
                    lastPath: "",
                    op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
                    prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
                    invRect: l
                }, this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i])
            } else this.viewData[i] = {
                op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
                prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
                elem: n,
                lastPath: ""
            }, s.appendChild(n);
        for (this.maskElement = createNS(g), a = u.length, i = 0; i < a; i += 1) this.maskElement.appendChild(u[i]);
        0 < d && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
    }

    function HierarchyElement() {}

    function FrameElement() {}

    function TransformElement() {}

    function RenderableElement() {}

    function RenderableDOMElement() {}

    function ProcessedElement(t, e) {
        this.elem = t, this.pos = e
    }

    function SVGStyleData(t, e) {
        this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null
    }

    function SVGShapeData(t, e, r) {
        this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
        for (var i = 0, s = t.length; i < s;) {
            if (t[i].mProps.dynamicProperties.length) {
                this._isAnimated = !0;
                break
            }
            i += 1
        }
    }

    function SVGTransformData(t, e, r) {
        this.transform = {
            mProps: t,
            op: e,
            container: r
        }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
    }

    function SVGStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated
    }

    function SVGFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r
    }

    function SVGGradientFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r)
    }

    function SVGGradientStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated
    }

    function ShapeGroupData() {
        this.it = [], this.prevViewData = [], this.gr = createNS("g")
    }
    BaseRenderer.prototype.checkLayers = function (t) {
        var e, r, i = this.layers.length;
        for (this.completeLayers = !0, e = i - 1; 0 <= e; e--) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
        this.checkPendingElements()
    }, BaseRenderer.prototype.createItem = function (t) {
        switch (t.ty) {
            case 2:
                return this.createImage(t);
            case 0:
                return this.createComp(t);
            case 1:
                return this.createSolid(t);
            case 3:
                return this.createNull(t);
            case 4:
                return this.createShape(t);
            case 5:
                return this.createText(t);
            case 13:
                return this.createCamera(t)
        }
        return this.createNull(t)
    }, BaseRenderer.prototype.createCamera = function () {
        throw new Error("You're using a 3d camera. Try the html renderer.")
    }, BaseRenderer.prototype.buildAllItems = function () {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1) this.buildItem(t);
        this.checkPendingElements()
    }, BaseRenderer.prototype.includeLayers = function (t) {
        this.completeLayers = !1;
        var e, r, i = t.length,
            s = this.layers.length;
        for (e = 0; e < i; e += 1)
            for (r = 0; r < s;) {
                if (this.layers[r].id == t[e].id) {
                    this.layers[r] = t[e];
                    break
                }
                r += 1
            }
    }, BaseRenderer.prototype.setProjectInterface = function (t) {
        this.globalData.projectInterface = t
    }, BaseRenderer.prototype.initItems = function () {
        this.globalData.progressiveLoad || this.buildAllItems()
    }, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
        for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n;) s[a].ind == e && (i[a] && !0 !== i[a] ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), a += 1
    }, BaseRenderer.prototype.addPendingElement = function (t) {
        this.pendingElements.push(t)
    }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1)
            if (t[e].xt) {
                var i = this.createComp(t[e]);
                i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
            }
    }, BaseRenderer.prototype.setupGlobalData = function (t, e) {
        this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
            w: t.w,
            h: t.h
        }
    }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
        return new NullElement(t, this.globalData, this)
    }, SVGRenderer.prototype.createShape = function (t) {
        return new SVGShapeElement(t, this.globalData, this)
    }, SVGRenderer.prototype.createText = function (t) {
        return new SVGTextElement(t, this.globalData, this)
    }, SVGRenderer.prototype.createImage = function (t) {
        return new IImageElement(t, this.globalData, this)
    }, SVGRenderer.prototype.createComp = function (t) {
        return new SVGCompElement(t, this.globalData, this)
    }, SVGRenderer.prototype.createSolid = function (t) {
        return new ISolidElement(t, this.globalData, this)
    }, SVGRenderer.prototype.configAnimation = function (t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
        var r = createNS("clipPath"),
            i = createNS("rect");
        i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
        var s = createElementID();
        r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length)
    }, SVGRenderer.prototype.destroy = function () {
        this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
        var t, e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null
    }, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
            e[t] = !0;
            var r = this.createItem(this.layers[t]);
            e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)))
        }
    }, SVGRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
            var t = this.pendingElements.pop();
            if (t.checkParenting(), t.data.tt)
                for (var e = 0, r = this.elements.length; e < r;) {
                    if (this.elements[e] === t) {
                        t.setMatte(this.elements[e - 1].layerId);
                        break
                    }
                    e += 1
                }
        }
    }, SVGRenderer.prototype.renderFrame = function (t) {
        if (this.renderedFrame !== t && !this.destroyed) {
            null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
            var e, r = this.layers.length;
            for (this.completeLayers || this.checkLayers(t), e = r - 1; 0 <= e; e--)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
            if (this.globalData._mdf)
                for (e = 0; e < r; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
        }
    }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();
        if (r) {
            for (var i, s = 0; s < e;) this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), s += 1;
            i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r)
        }
    }, SVGRenderer.prototype.hide = function () {
        this.layerElement.style.display = "none"
    }, SVGRenderer.prototype.show = function () {
        this.layerElement.style.display = "block"
    }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
        return new CVShapeElement(t, this.globalData, this)
    }, CanvasRenderer.prototype.createText = function (t) {
        return new CVTextElement(t, this.globalData, this)
    }, CanvasRenderer.prototype.createImage = function (t) {
        return new CVImageElement(t, this.globalData, this)
    }, CanvasRenderer.prototype.createComp = function (t) {
        return new CVCompElement(t, this.globalData, this)
    }, CanvasRenderer.prototype.createSolid = function (t) {
        return new CVSolidElement(t, this.globalData, this)
    }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
        if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13])
            if (this.renderConfig.clearCanvas) {
                this.transformMat.cloneFromProps(t);
                var e = this.contextData.cTr.props;
                this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
                var r = this.contextData.cTr.props;
                this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13])
            } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
    }, CanvasRenderer.prototype.ctxOpacity = function (t) {
        if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void(this.globalData.currentGlobalAlpha = this.contextData.cO);
        this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO)
    }, CanvasRenderer.prototype.reset = function () {
        this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
    }, CanvasRenderer.prototype.save = function (t) {
        if (this.renderConfig.clearCanvas) {
            t && this.canvasContext.save();
            var e = this.contextData.cTr.props;
            this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
            var r, i = this.contextData.saved[this.contextData.cArrPos];
            for (r = 0; r < 16; r += 1) i[r] = e[r];
            this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
        } else this.canvasContext.save()
    }, CanvasRenderer.prototype.restore = function (t) {
        if (this.renderConfig.clearCanvas) {
            t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
            var e, r = this.contextData.saved[this.contextData.cArrPos],
                i = this.contextData.cTr.props;
            for (e = 0; e < 16; e += 1) i[e] = r[e];
            this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r)
        } else this.canvasContext.restore()
    }, CanvasRenderer.prototype.configAnimation = function (t) {
        this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
            w: t.w,
            h: t.h,
            sx: 0,
            sy: 0,
            tx: 0,
            ty: 0
        }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, (this.globalData.renderer = this).globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize()
    }, CanvasRenderer.prototype.updateContainerSize = function () {
        var t, e, r, i;
        if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
            var s = this.renderConfig.preserveAspectRatio.split(" "),
                a = s[1] || "meet",
                n = s[0] || "xMidYMid",
                o = n.substr(0, 4),
                h = n.substr(4);
            r = t / e, i = this.transformCanvas.w / this.transformCanvas.h, this.transformCanvas.sy = r < i && "meet" === a || i < r && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < r && "meet" === a || r < i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < r && "meet" === a || r < i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (r < i && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (r < i && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
        } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0;
        this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
    }, CanvasRenderer.prototype.destroy = function () {
        var t;
        for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; 0 <= t; t -= 1) this.elements[t] && this.elements[t].destroy();
        this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
    }, CanvasRenderer.prototype.renderFrame = function (t, e) {
        if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
            this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
            var r, i = this.layers.length;
            for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r++)(this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
            if (this.globalData._mdf) {
                for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; 0 <= r; r -= 1)(this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
                !0 !== this.renderConfig.clearCanvas && this.restore()
            }
        }
    }, CanvasRenderer.prototype.buildItem = function (t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
            var r = this.createItem(this.layers[t], this, this.globalData);
            (e[t] = r).initExpressions()
        }
    }, CanvasRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
            this.pendingElements.pop().checkParenting()
        }
    }, CanvasRenderer.prototype.hide = function () {
        this.animationItem.container.style.display = "none"
    }, CanvasRenderer.prototype.show = function () {
        this.animationItem.container.style.display = "block"
    }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
            this.pendingElements.pop().checkParenting()
        }
    }, HybridRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();
        if (r) {
            var i = this.layers[e];
            if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);
            else if (this.threeDElements) this.addTo3dContainer(r, e);
            else {
                for (var s, a, n = 0; n < e;) this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n], s = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || s), n += 1;
                s ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, s) : i.ddd && this.supports3d || this.layerElement.appendChild(r)
            }
        }
    }, HybridRenderer.prototype.createShape = function (t) {
        return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this)
    }, HybridRenderer.prototype.createText = function (t) {
        return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this)
    }, HybridRenderer.prototype.createCamera = function (t) {
        return this.camera = new HCameraElement(t, this.globalData, this), this.camera
    }, HybridRenderer.prototype.createImage = function (t) {
        return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this)
    }, HybridRenderer.prototype.createComp = function (t) {
        return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this)
    }, HybridRenderer.prototype.createSolid = function (t) {
        return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this)
    }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
        for (var e = 0, r = this.threeDElements.length; e < r;) {
            if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
            e += 1
        }
    }, HybridRenderer.prototype.createThreeDContainer = function (t, e) {
        var r = createTag("div");
        styleDiv(r);
        var i = createTag("div");
        styleDiv(i), "3d" === e && (r.style.width = this.globalData.compSize.w + "px", r.style.height = this.globalData.compSize.h + "px", r.style.transformOrigin = r.style.mozTransformOrigin = r.style.webkitTransformOrigin = "50% 50%", i.style.transform = i.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"), r.appendChild(i);
        var s = {
            container: i,
            perspectiveElem: r,
            startPos: t,
            endPos: t,
            type: e
        };
        return this.threeDElements.push(s), s
    }, HybridRenderer.prototype.build3dContainers = function () {
        var t, e, r = this.layers.length,
            i = "";
        for (t = 0; t < r; t += 1) this.layers[t].ddd && 3 !== this.layers[t].ty ? "3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")) : "2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t);
        for (t = (r = this.threeDElements.length) - 1; 0 <= t; t--) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
    }, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
        for (var r = 0, i = this.threeDElements.length; r < i;) {
            if (e <= this.threeDElements[r].endPos) {
                for (var s, a = this.threeDElements[r].startPos; a < e;) this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
                s ? this.threeDElements[r].container.insertBefore(t, s) : this.threeDElements[r].container.appendChild(t);
                break
            }
            r += 1
        }
    }, HybridRenderer.prototype.configAnimation = function (t) {
        var e = createTag("div"),
            r = this.animationItem.wrapper;
        e.style.width = t.w + "px", e.style.height = t.h + "px", styleDiv(this.resizerElem = e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), e.style.overflow = "hidden";
        var i = createNS("svg");
        i.setAttribute("width", "1"), i.setAttribute("height", "1"), styleDiv(i), this.resizerElem.appendChild(i);
        var s = createNS("defs");
        i.appendChild(s), this.data = t, this.setupGlobalData(t, i), this.globalData.defs = s, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
    }, HybridRenderer.prototype.destroy = function () {
        this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
        var t, e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++) this.elements[t].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null
    }, HybridRenderer.prototype.updateContainerSize = function () {
        var t, e, r, i, s = this.animationItem.wrapper.offsetWidth,
            a = this.animationItem.wrapper.offsetHeight;
        i = s / a < this.globalData.compSize.w / this.globalData.compSize.h ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, r = 0, (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, r = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)"
    }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
        this.resizerElem.style.display = "none"
    }, HybridRenderer.prototype.show = function () {
        this.resizerElem.style.display = "block"
    }, HybridRenderer.prototype.initItems = function () {
        if (this.buildAllItems(), this.camera) this.camera.setup();
        else {
            var t, e = this.globalData.compSize.w,
                r = this.globalData.compSize.h,
                i = this.threeDElements.length;
            for (t = 0; t < i; t += 1) this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px"
        }
    }, HybridRenderer.prototype.searchExtraCompositions = function (t) {
        var e, r = t.length,
            i = createTag("div");
        for (e = 0; e < r; e += 1)
            if (t[e].xt) {
                var s = this.createComp(t[e], i, this.globalData.comp, null);
                s.initExpressions(), this.globalData.projectInterface.registerComposition(s)
            }
    }, MaskElement.prototype.getMaskProperty = function (t) {
        return this.viewData[t].prop
    }, MaskElement.prototype.renderFrame = function (t) {
        var e, r = this.element.finalTransform.mat,
            i = this.masksProperties.length;
        for (e = 0; e < i; e++)
            if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute("x", -r.props[12]), this.viewData[e].invRect.setAttribute("y", -r.props[13])), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
                var s = this.storedData[e].expan;
                this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
            }
    }, MaskElement.prototype.getMaskelement = function () {
        return this.maskElement
    }, MaskElement.prototype.createLayerSolidPath = function () {
        var t = "M0,0 ";
        return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
    }, MaskElement.prototype.drawPath = function (t, e, r) {
        var i, s, a = " M" + e.v[0][0] + "," + e.v[0][1];
        for (s = e._length, i = 1; i < s; i += 1) a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
        if (e.c && 1 < s && (a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== a) {
            var n = "";
            r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n)), r.lastPath = a
        }
    }, MaskElement.prototype.destroy = function () {
        this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
    }, HierarchyElement.prototype = {
        initHierarchy: function () {
            this.hierarchy = [], this._isParent = !1, this.checkParenting()
        },
        setHierarchy: function (t) {
            this.hierarchy = t
        },
        setAsParent: function () {
            this._isParent = !0
        },
        checkParenting: function () {
            void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
        }
    }, FrameElement.prototype = {
        initFrame: function () {
            this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
        },
        prepareProperties: function (t, e) {
            var r, i = this.dynamicProperties.length;
            for (r = 0; r < i; r += 1)(e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0))
        },
        addDynamicProperty: function (t) {
            -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
        }
    }, TransformElement.prototype = {
        initTransform: function () {
            this.finalTransform = {
                mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
                    o: 0
                },
                _matMdf: !1,
                _opMdf: !1,
                mat: new Matrix
            }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
        },
        renderTransform: function () {
            if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
                var t, e = this.finalTransform.mat,
                    r = 0,
                    i = this.hierarchy.length;
                if (!this.finalTransform._matMdf)
                    for (; r < i;) {
                        if (this.hierarchy[r].finalTransform.mProp._mdf) {
                            this.finalTransform._matMdf = !0;
                            break
                        }
                        r += 1
                    }
                if (this.finalTransform._matMdf)
                    for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
            }
        },
        globalToLocal: function (t) {
            var e = [];
            e.push(this.finalTransform);
            for (var r = !0, i = this.comp; r;) i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : r = !1;
            var s, a, n = e.length;
            for (s = 0; s < n; s += 1) a = e[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
            return t
        },
        mHelper: new Matrix
    }, RenderableElement.prototype = {
        initRenderable: function () {
            this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
        },
        addRenderableComponent: function (t) {
            -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
        },
        removeRenderableComponent: function (t) {
            -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
        },
        prepareRenderableFrame: function (t) {
            this.checkLayerLimits(t)
        },
        checkTransparency: function () {
            this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
        },
        checkLayerLimits: function (t) {
            this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
        },
        renderRenderable: function () {
            var t, e = this.renderableComponents.length;
            for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame)
        },
        sourceRectAtTime: function () {
            return {
                top: 0,
                left: 0,
                width: 100,
                height: 100
            }
        },
        getLayerSize: function () {
            return 5 === this.data.ty ? {
                w: this.data.textData.width,
                h: this.data.textData.height
            } : {
                w: this.data.width,
                h: this.data.height
            }
        }
    }, extendPrototype([RenderableElement, createProxyFunction({
        initElement: function (t, e, r) {
            this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
        },
        hide: function () {
            this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
        },
        show: function () {
            this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
        },
        renderFrame: function () {
            this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
        },
        renderInnerContent: function () {},
        prepareFrame: function (t) {
            this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
        },
        destroy: function () {
            this.innerElem = null, this.destroyBaseElement()
        }
    })], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
        this.d = "", this._mdf = !1
    }, SVGShapeData.prototype.setAsAnimated = function () {
        this._isAnimated = !0
    }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
        this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
            k: 0
        }, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
            k: 0
        }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated
    }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
        var r = createElementID(),
            i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
        i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
        var s, a, n, o = [];
        for (n = 4 * e.g.p, a = 0; a < n; a += 4) s = createNS("stop"), i.appendChild(s), o.push(s);
        t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o
    }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
            var r, i, s, a = createNS("mask"),
                n = createNS("path");
            a.appendChild(n);
            var o = createElementID(),
                h = createElementID();
            a.setAttribute("id", h);
            var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
            l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
            var p = this.stops;
            for (i = 4 * t.g.p; i < s; i += 2)(r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
            n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n
        }
    }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
    var SVGElementsRenderer = function () {
        var y = new Matrix,
            g = new Matrix;

        function e(t, e, r) {
            (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
        }

        function r(t, e, r) {
            var i, s, a, n, o, h, l, p, m, f, c, d = e.styles.length,
                u = e.lvl;
            for (h = 0; h < d; h += 1) {
                if (n = e.sh._mdf || r, e.styles[h].lvl < u) {
                    for (p = g.reset(), f = u - e.styles[h].lvl, c = e.transformers.length - 1; !n && 0 < f;) n = e.transformers[c].mProps._mdf || n, f--, c--;
                    if (n)
                        for (f = u - e.styles[h].lvl, c = e.transformers.length - 1; 0 < f;) m = e.transformers[c].mProps.v.props, p.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), f--, c--
                } else p = y;
                if (s = (l = e.sh.paths)._length, n) {
                    for (a = "", i = 0; i < s; i += 1)(o = l.shapes[i]) && o._length && (a += buildShapeString(o, o._length, o.c, p));
                    e.caches[h] = a
                } else a = e.caches[h];
                e.styles[h].d += !0 === t.hd ? "" : a, e.styles[h]._mdf = n || e.styles[h]._mdf
            }
        }

        function i(t, e, r) {
            var i = e.style;
            (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v)
        }

        function s(t, e, r) {
            a(t, e, r), n(t, e, r)
        }

        function a(t, e, r) {
            var i, s, a, n, o, h = e.gf,
                l = e.g._hasOpacity,
                p = e.s.v,
                m = e.e.v;
            if (e.o._mdf || r) {
                var f = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
                e.style.pElem.setAttribute(f, e.o.v)
            }
            if (e.s._mdf || r) {
                var c = 1 === t.t ? "x1" : "cx",
                    d = "x1" === c ? "y1" : "cy";
                h.setAttribute(c, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]))
            }
            if (e.g._cmdf || r) {
                i = e.cst;
                var u = e.g.c;
                for (a = i.length, s = 0; s < a; s += 1)(n = i[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")")
            }
            if (l && (e.g._omdf || r)) {
                var y = e.g.o;
                for (a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) n = i[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1])
            }
            if (1 === t.t)(e.e._mdf || r) && (h.setAttribute("x2", m[0]), h.setAttribute("y2", m[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", m[0]), e.of.setAttribute("y2", m[1])));
            else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
                o || (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)));
                var g = Math.atan2(m[1] - p[1], m[0] - p[0]),
                    v = o * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
                    b = Math.cos(g + e.a.v) * v + p[0],
                    E = Math.sin(g + e.a.v) * v + p[1];
                h.setAttribute("fx", b), h.setAttribute("fy", E), l && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", E))
            }
        }

        function n(t, e, r) {
            var i = e.style,
                s = e.d;
            s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute("stroke-dasharray", s.dashStr), i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v))
        }
        return {
            createRenderFunction: function (t) {
                t.ty;
                switch (t.ty) {
                    case "fl":
                        return i;
                    case "gf":
                        return a;
                    case "gs":
                        return s;
                    case "st":
                        return n;
                    case "sh":
                    case "el":
                    case "rc":
                    case "sr":
                        return r;
                    case "tr":
                        return e
                }
            }
        }
    }();

    function ShapeTransformManager() {
        this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
    }

    function CVShapeData(t, e, r, i) {
        this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
        var s = 4;
        "rc" == e.ty ? s = 5 : "el" == e.ty ? s = 6 : "sr" == e.ty && (s = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
        var a, n, o = r.length;
        for (a = 0; a < o; a += 1) r[a].closed || (n = {
            transforms: i.addTransformSequence(r[a].transforms),
            trNodes: []
        }, this.styledShapes.push(n), r[a].elements.push(n))
    }

    function BaseElement() {}

    function NullElement(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy()
    }

    function SVGBaseElement() {}

    function IShapeElement() {}

    function ITextElement() {}

    function ICompElement() {}

    function IImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
            top: 0,
            left: 0,
            width: this.assetData.w,
            height: this.assetData.h
        }
    }

    function ISolidElement(t, e, r) {
        this.initElement(t, e, r)
    }

    function SVGCompElement(t, e, r) {
        this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
        }
    }

    function SVGTextElement(t, e, r) {
        this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r)
    }

    function SVGShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = []
    }

    function SVGTintFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");
        if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
            var i, s = createNS("feMerge");
            t.appendChild(s), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), s.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), s.appendChild(i)
        }
    }

    function SVGFillFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");
        r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r
    }

    function SVGGaussianBlurEffect(t, e) {
        t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
        var r = createNS("feGaussianBlur");
        t.appendChild(r), this.feGaussianBlur = r
    }

    function SVGStrokeEffect(t, e) {
        this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = []
    }

    function SVGTritoneFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");
        r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
        var i = createNS("feComponentTransfer");
        i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
        var s = createNS("feFuncR");
        s.setAttribute("type", "table"), i.appendChild(s), this.feFuncR = s;
        var a = createNS("feFuncG");
        a.setAttribute("type", "table"), i.appendChild(a), this.feFuncG = a;
        var n = createNS("feFuncB");
        n.setAttribute("type", "table"), i.appendChild(n), this.feFuncB = n
    }

    function SVGProLevelsFilter(t, e) {
        this.filterManager = e;
        var r = this.filterManager.effectElements,
            i = createNS("feComponentTransfer");
        (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i))
    }

    function SVGDropShadowEffect(t, e) {
        t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "400%"), t.setAttribute("height", "400%"), this.filterManager = e;
        var r = createNS("feGaussianBlur");
        r.setAttribute("in", "SourceAlpha"), r.setAttribute("result", "drop_shadow_1"), r.setAttribute("stdDeviation", "0"), this.feGaussianBlur = r, t.appendChild(r);
        var i = createNS("feOffset");
        i.setAttribute("dx", "25"), i.setAttribute("dy", "0"), i.setAttribute("in", "drop_shadow_1"), i.setAttribute("result", "drop_shadow_2"), this.feOffset = i, t.appendChild(i);
        var s = createNS("feFlood");
        s.setAttribute("flood-color", "#00ff00"), s.setAttribute("flood-opacity", "1"), s.setAttribute("result", "drop_shadow_3"), this.feFlood = s, t.appendChild(s);
        var a = createNS("feComposite");
        a.setAttribute("in", "drop_shadow_3"), a.setAttribute("in2", "drop_shadow_2"), a.setAttribute("operator", "in"), a.setAttribute("result", "drop_shadow_4"), t.appendChild(a);
        var n, o = createNS("feMerge");
        t.appendChild(o), n = createNS("feMergeNode"), o.appendChild(n), (n = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = n, this.feMerge = o, this.originalNodeAdded = !1, o.appendChild(n)
    }
    ShapeTransformManager.prototype = {
        addTransformSequence: function (t) {
            var e, r = t.length,
                i = "_";
            for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";
            var s = this.sequences[i];
            return s || (s = {
                transforms: [].concat(t),
                finalTransform: new Matrix,
                _mdf: !1
            }, this.sequences[i] = s, this.sequenceList.push(s)), s
        },
        processSequence: function (t, e) {
            for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e;) {
                if (t.transforms[i].transform.mProps._mdf) {
                    a = !0;
                    break
                }
                i += 1
            }
            if (a)
                for (t.finalTransform.reset(), i = s - 1; 0 <= i; i -= 1) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
            t._mdf = a
        },
        processSequences: function (t) {
            var e, r = this.sequenceList.length;
            for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t)
        },
        getNewKey: function () {
            return "_" + this.transform_key_count++
        }
    }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
        checkMasks: function () {
            if (!this.data.hasMask) return !1;
            for (var t = 0, e = this.data.masksProperties.length; t < e;) {
                if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
                t += 1
            }
            return !1
        },
        initExpressions: function () {
            this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
            var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
            this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface)
        },
        setBlendMode: function () {
            var t = getBlendMode(this.data.bm);
            (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
        },
        initBaseData: function (t, e, r) {
            this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties)
        },
        getType: function () {
            return this.type
        },
        sourceRectAtTime: function () {}
    }, NullElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0)
    }, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
        return null
    }, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
        initRendererElement: function () {
            this.layerElement = createNS("g")
        },
        createContainerElements: function () {
            this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
            var t, e, r, i = null;
            if (this.data.td) {
                if (3 == this.data.td || 1 == this.data.td) {
                    var s = createNS("mask");
                    s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), i = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, s.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"))
                } else if (2 == this.data.td) {
                    var a = createNS("mask");
                    a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
                    var n = createNS("g");
                    a.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
                    var o = createNS("feComponentTransfer");
                    o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
                    var h = createNS("feFuncA");
                    h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
                    var l = createNS("rect");
                    l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), i = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n.appendChild(l), r.appendChild(this.layerElement), i = r, n.appendChild(r)), this.globalData.defs.appendChild(a)
                }
            } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
            if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
                var p = createNS("clipPath"),
                    m = createNS("path");
                m.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                var f = createElementID();
                if (p.setAttribute("id", f), p.appendChild(m), this.globalData.defs.appendChild(p), this.checkMasks()) {
                    var c = createNS("g");
                    c.setAttribute("clip-path", "url(" + locationHref + "#" + f + ")"), c.appendChild(this.layerElement), this.transformedElement = c, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
                } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + f + ")")
            }
            0 !== this.data.bm && this.setBlendMode()
        },
        renderElement: function () {
            this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
        },
        destroyBaseElement: function () {
            this.layerElement = null, this.matteElement = null, this.maskManager.destroy()
        },
        getBaseElement: function () {
            return this.data.hd ? null : this.baseElement
        },
        createRenderableComponents: function () {
            this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this)
        },
        setMatte: function (t) {
            this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")")
        }
    }, IShapeElement.prototype = {
        addShapeToModifiers: function (t) {
            var e, r = this.shapeModifiers.length;
            for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t)
        },
        isShapeInAnimatedModifiers: function (t) {
            for (var e = this.shapeModifiers.length; 0 < e;)
                if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
            return !1
        },
        renderModifiers: function () {
            if (this.shapeModifiers.length) {
                var t, e = this.shapes.length;
                for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
                for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame)
            }
        },
        lcEnum: {
            1: "butt",
            2: "round",
            3: "square"
        },
        ljEnum: {
            1: "miter",
            2: "round",
            3: "bevel"
        },
        searchProcessedElement: function (t) {
            for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
                if (e[r].elem === t) return e[r].pos;
                r += 1
            }
            return 0
        },
        addProcessedElement: function (t, e) {
            for (var r = this.processedElements, i = r.length; i;)
                if (r[i -= 1].elem === t) return void(r[i].pos = e);
            r.push(new ProcessedElement(t, e))
        },
        prepareFrame: function (t) {
            this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
        }
    }, ITextElement.prototype.initElement = function (t, e, r) {
        this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
    }, ITextElement.prototype.prepareFrame = function (t) {
        this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
    }, ITextElement.prototype.createPathShape = function (t, e) {
        var r, i, s = e.length,
            a = "";
        for (r = 0; r < s; r += 1) i = e[r].ks.k, a += buildShapeString(i, i.i.length, !0, t);
        return a
    }, ITextElement.prototype.updateDocumentData = function (t, e) {
        this.textProperty.updateDocumentData(t, e)
    }, ITextElement.prototype.canResizeFont = function (t) {
        this.textProperty.canResizeFont(t)
    }, ITextElement.prototype.setMinimumFontSize = function (t) {
        this.textProperty.setMinimumFontSize(t)
    }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, s) {
        switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
            case 1:
                e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
                break;
            case 2:
                e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0)
        }
        e.translate(i, s, 0)
    }, ITextElement.prototype.buildColor = function (t) {
        return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
    }, ITextElement.prototype.emptyProp = new LetterProps, ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
    }, ICompElement.prototype.prepareFrame = function (t) {
        if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
            if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
            else {
                var e = this.tm.v;
                e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
            }
            var r, i = this.elements.length;
            for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; 0 <= r; r -= 1)(this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0))
        }
    }, ICompElement.prototype.renderInnerContent = function () {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
    }, ICompElement.prototype.setElements = function (t) {
        this.elements = t
    }, ICompElement.prototype.getElements = function () {
        return this.elements
    }, ICompElement.prototype.destroyElements = function () {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy()
    }, ICompElement.prototype.destroy = function () {
        this.destroyElements(), this.destroyBaseElement()
    }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData);
        this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
    }, IImageElement.prototype.sourceRectAtTime = function () {
        return this.sourceRect
    }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
        var t = createNS("rect");
        t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
    }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function () {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
    }, SVGTextElement.prototype.buildTextContents = function (t) {
        for (var e = 0, r = t.length, i = [], s = ""; e < r;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), s = "") : s += t[e], e += 1;
        return i.push(s), i
    }, SVGTextElement.prototype.buildNewText = function () {
        var t, e, r = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
        var i = this.globalData.fontManager.getFontByName(r.f);
        if (i.fClass) this.layerElement.setAttribute("class", i.fClass);
        else {
            this.layerElement.setAttribute("font-family", i.fFamily);
            var s = r.fWeight,
                a = r.fStyle;
            this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s)
        }
        this.layerElement.setAttribute("aria-label", r.t);
        var n, o = r.l || [],
            h = !!this.globalData.fontManager.chars;
        e = o.length;
        var l, p = this.mHelper,
            m = "",
            f = this.data.singleShape,
            c = 0,
            d = 0,
            u = !0,
            y = r.tr / 1e3 * r.finalSize;
        if (!f || h || r.sz) {
            var g, v, b = this.textSpans.length;
            for (t = 0; t < e; t += 1) h && f && 0 !== t || (n = t < b ? this.textSpans[t] : createNS(h ? "path" : "text"), b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), f && (o[t].n && (c = -y, d += r.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, c, d), c += o[t].l || 0, c += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], f ? m += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (f && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
            f && n && n.setAttribute("d", m)
        } else {
            var E = this.textContainer,
                x = "start";
            switch (r.j) {
                case 1:
                    x = "end";
                    break;
                case 2:
                    x = "middle"
            }
            E.setAttribute("text-anchor", x), E.setAttribute("letter-spacing", y);
            var P = this.buildTextContents(r.finalText);
            for (e = P.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1)(n = this.textSpans[t] || createNS("tspan")).textContent = P[t], n.setAttribute("x", 0), n.setAttribute("y", d), n.style.display = "inherit", E.appendChild(n), this.textSpans[t] = n, d += r.finalLineHeight;
            this.layerElement.appendChild(E)
        }
        for (; t < this.textSpans.length;) this.textSpans[t].style.display = "none", t += 1;
        this._sizeChanged = !0
    }, SVGTextElement.prototype.sourceRectAtTime = function (t) {
        if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
            this._sizeChanged = !1;
            var e = this.layerElement.getBBox();
            this.bbox = {
                top: e.y,
                left: e.x,
                width: e.width,
                height: e.height
            }
        }
        return this.bbox
    }, SVGTextElement.prototype.renderInnerContent = function () {
        if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
            var t, e;
            this._sizeChanged = !0;
            var r, i, s = this.textAnimator.renderedLetters,
                a = this.textProperty.currentData.l;
            for (e = a.length, t = 0; t < e; t += 1) a[t].n || (r = s[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc))
        }
    }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix, SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes()
    }, SVGShapeElement.prototype.filterUniqueShapes = function () {
        var t, e, r, i, s = this.shapes.length,
            a = this.stylesList.length,
            n = [],
            o = !1;
        for (r = 0; r < a; r += 1) {
            for (i = this.stylesList[r], o = !1, t = n.length = 0; t < s; t += 1) - 1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);
            1 < n.length && o && this.setShapesAsAnimated(n)
        }
    }, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1) t[e].setAsAnimated()
    }, SVGShapeElement.prototype.createStyleElement = function (t, e) {
        var r, i = new SVGStyleData(t, e),
            s = i.pElem;
        if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);
        else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);
        else if ("gf" === t.ty || "gs" === t.ty) {
            r = new("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"))
        }
        return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r
    }, SVGShapeElement.prototype.createGroupElement = function (t) {
        var e = new ShapeGroupData;
        return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e
    }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
        var r = TransformPropertyFactory.getTransformProperty(this, t, this),
            i = new SVGTransformData(r, r.o, e);
        return this.addToAnimatedContents(t, i), i
    }, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
        var i = 4;
        "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
        var s = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
        return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s
    }, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
        for (var r = 0, i = this.animatedContents.length; r < i;) {
            if (this.animatedContents[r].element === e) return;
            r += 1
        }
        this.animatedContents.push({
            fn: SVGElementsRenderer.createRenderFunction(t),
            element: e,
            data: t
        })
    }, SVGShapeElement.prototype.setElementStyles = function (t) {
        var e, r = t.styles,
            i = this.stylesList.length;
        for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e])
    }, SVGShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t, e = this.itemsData.length;
        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
        this.renderModifiers()
    }, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
        var o, h, l, p, m, f, c = [].concat(a),
            d = t.length - 1,
            u = [],
            y = [];
        for (o = d; 0 <= o; o -= 1) {
            if ((f = this.searchProcessedElement(t[o])) ? e[o] = r[f - 1] : t[o]._render = n, "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty) f ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && i.appendChild(e[o].style.pElem), u.push(e[o].style);
            else if ("gr" == t[o].ty) {
                if (f)
                    for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];
                else e[o] = this.createGroupElement(t[o]);
                this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && i.appendChild(e[o].gr)
            } else "tr" == t[o].ty ? (f || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, c.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (f || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (f ? (m = e[o]).closed = !1 : ((m = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = m, this.shapeModifiers.push(m)), y.push(m)) : "rp" == t[o].ty && (f ? (m = e[o]).closed = !0 : (m = ShapeModifiers.getModifier(t[o].ty), (e[o] = m).init(this, t, o, e), this.shapeModifiers.push(m), n = !1), y.push(m));
            this.addProcessedElement(t[o], o + 1)
        }
        for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
        for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0
    }, SVGShapeElement.prototype.renderInnerContent = function () {
        this.renderModifiers();
        var t, e = this.stylesList.length;
        for (t = 0; t < e; t += 1) this.stylesList[t].reset();
        for (this.renderShape(), t = 0; t < e; t += 1)(this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
    }, SVGShapeElement.prototype.renderShape = function () {
        var t, e, r = this.animatedContents.length;
        for (t = 0; t < r; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
    }, SVGShapeElement.prototype.destroy = function () {
        this.destroyBaseElement(), this.shapesData = null, this.itemsData = null
    }, SVGTintFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[0].p.v,
                r = this.filterManager.effectElements[1].p.v,
                i = this.filterManager.effectElements[2].p.v / 100;
            this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0")
        }
    }, SVGFillFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[2].p.v,
                r = this.filterManager.effectElements[6].p.v;
            this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
        }
    }, SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
            var e = .3 * this.filterManager.effectElements[0].p.v,
                r = this.filterManager.effectElements[1].p.v,
                i = 3 == r ? 0 : e,
                s = 2 == r ? 0 : e;
            this.feGaussianBlur.setAttribute("stdDeviation", i + " " + s);
            var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
            this.feGaussianBlur.setAttribute("edgeMode", a)
        }
    }, SVGStrokeEffect.prototype.initialize = function () {
        var t, e, r, i, s = this.elem.layerElement.children || this.elem.layerElement.childNodes;
        for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
            p: t,
            m: r
        });
        if (3 === this.filterManager.effectElements[10].p.v) {
            var a = createNS("mask"),
                n = createElementID();
            a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
            var o = createNS("g");
            for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); s[0];) o.appendChild(s[0]);
            this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff")
        } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
            if (2 === this.filterManager.effectElements[10].p.v)
                for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) this.elem.layerElement.removeChild(s[0]);
            this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff")
        }
        this.initialized = !0, this.pathMasker = e
    }, SVGStrokeEffect.prototype.renderFrame = function (t) {
        this.initialized || this.initialize();
        var e, r, i, s = this.paths.length;
        for (e = 0; e < s; e += 1)
            if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
                var a;
                if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                    var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                        o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                        h = i.getTotalLength();
                    a = "0 0 0 " + h * n + " ";
                    var l, p = h * (o - n),
                        m = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                        f = Math.floor(p / m);
                    for (l = 0; l < f; l += 1) a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
                    a += "0 " + 10 * h + " 0 0"
                } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
                i.setAttribute("stroke-dasharray", a)
            } if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
            var c = this.filterManager.effectElements[3].p.v;
            this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * c[0]) + "," + bm_floor(255 * c[1]) + "," + bm_floor(255 * c[2]) + ")")
        }
    }, SVGTritoneFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[0].p.v,
                r = this.filterManager.effectElements[1].p.v,
                i = this.filterManager.effectElements[2].p.v,
                s = i[0] + " " + r[0] + " " + e[0],
                a = i[1] + " " + r[1] + " " + e[1],
                n = i[2] + " " + r[2] + " " + e[2];
            this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n)
        }
    }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
        var r = createNS(t);
        return r.setAttribute("type", "table"), e.appendChild(r), r
    }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
        for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
                length: 256
            }), m = 0, f = s - i, c = e - t; o <= 256;) n = (a = o / 256) <= h ? c < 0 ? s : i : l <= a ? c < 0 ? i : s : i + f * Math.pow((a - t) / c, 1 / r), p[m++] = n, o += 256 / 255;
        return p.join(" ")
    }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
            var e, r = this.filterManager.effectElements;
            this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e))
        }
    }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
            if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
                var e = this.filterManager.effectElements[0].p.v;
                this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
            }
            if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
                var r = this.filterManager.effectElements[3].p.v,
                    i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                    s = r * Math.cos(i),
                    a = r * Math.sin(i);
                this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a)
            }
        }
    };
    var _svgMatteSymbols = [];

    function SVGMatte3Effect(t, e, r) {
        this.initialized = !1, this.filterManager = e, this.filterElem = t, (this.elem = r).matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement
    }

    function SVGEffects(t) {
        var e, r, i = t.data.ef ? t.data.ef.length : 0,
            s = createElementID(),
            a = filtersFactory.createFilter(s),
            n = 0;
        for (this.filters = [], e = 0; e < i; e += 1) r = null, 20 === t.data.ef[e].ty ? (n += 1, r = new SVGTintFilter(a, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, r = new SVGFillFilter(a, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, r = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, r = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, r = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? r = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (n += 1, r = new SVGGaussianBlurEffect(a, t.effectsManager.effectElements[e])), r && this.filters.push(r);
        n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this)
    }

    function CVContextData() {
        this.saved = [], this.cArrPos = 0, this.cTr = new Matrix, this.cO = 1;
        var t;
        for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
        this._length = 15
    }

    function CVBaseElement() {}

    function CVImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, r)
    }

    function CVCompElement(t, e, r) {
        this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
        }
    }

    function CVMaskElement(t, e) {
        this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
        var r, i = this.masksProperties.length,
            s = !1;
        for (r = 0; r < i; r++) "n" !== this.masksProperties[r].mode && (s = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
        (this.hasMasks = s) && this.element.addRenderableComponent(this)
    }

    function CVShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager, this.initElement(t, e, r)
    }

    function CVSolidElement(t, e, r) {
        this.initElement(t, e, r)
    }

    function CVTextElement(t, e, r) {
        this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
            fill: "rgba(0,0,0,0)",
            stroke: "rgba(0,0,0,0)",
            sWidth: 0,
            fValue: ""
        }, this.initElement(t, e, r)
    }

    function CVEffects() {}

    function HBaseElement(t, e, r) {}

    function HSolidElement(t, e, r) {
        this.initElement(t, e, r)
    }

    function HCompElement(t, e, r) {
        this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
        }
    }

    function HShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
        }
    }

    function HTextElement(t, e, r) {
        this.textSpans = [], this.textPaths = [], this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
        }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r)
    }

    function HImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r)
    }

    function HCameraElement(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
        var i = PropertyFactory.getProp;
        if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
            var s, a = t.ks.or.k.length;
            for (s = 0; s < a; s += 1) t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null
        }
        this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix, this._prevMat = new Matrix, this._isFirstFrame = !0, this.finalTransform = {
            mProp: this
        }
    }

    function HEffects() {}
    SVGMatte3Effect.prototype.findSymbol = function (t) {
        for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
            if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
            e += 1
        }
        return null
    }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
        var r = t.layerElement.parentNode;
        if (r) {
            for (var i, s = r.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) a += 1;
            a <= n - 2 && (i = s[a + 1]);
            var o = createNS("use");
            o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o)
        }
    }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
        if (!this.findSymbol(e)) {
            var r = createElementID(),
                i = createNS("mask");
            i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
            var s = t.globalData.defs;
            s.appendChild(i);
            var a = createNS("symbol");
            a.setAttribute("id", r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
            var n = createNS("use");
            n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show()
        }
        t.setMatte(e.layerId)
    }, SVGMatte3Effect.prototype.initialize = function () {
        for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
        this.initialized = !0
    }, SVGMatte3Effect.prototype.renderFrame = function () {
        this.initialized || this.initialize()
    }, SVGEffects.prototype.renderFrame = function (t) {
        var e, r = this.filters.length;
        for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t)
    }, CVContextData.prototype.duplicate = function () {
        var t = 2 * this._length,
            e = this.savedOp;
        this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
        var r = 0;
        for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray("float32", 16);
        this._length = t
    }, CVContextData.prototype.reset = function () {
        this.cArrPos = 0, this.cTr.reset(), this.cO = 1
    }, CVBaseElement.prototype = {
        createElements: function () {},
        initRendererElement: function () {},
        createContainerElements: function () {
            this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this)
        },
        createContent: function () {},
        setBlendMode: function () {
            var t = this.globalData;
            if (t.blendMode !== this.data.bm) {
                t.blendMode = this.data.bm;
                var e = getBlendMode(this.data.bm);
                t.canvasContext.globalCompositeOperation = e
            }
        },
        createRenderableComponents: function () {
            this.maskManager = new CVMaskElement(this.data, this)
        },
        hideElement: function () {
            this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
        },
        showElement: function () {
            this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
        },
        renderFrame: function () {
            this.hidden || this.data.hd || (this.renderTransform(), this.renderRenderable(), this.setBlendMode(), this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1))
        },
        destroy: function () {
            this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
        },
        mHelper: new Matrix
    }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
        if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
            var t = createTag("canvas");
            t.width = this.assetData.w, t.height = this.assetData.h;
            var e, r, i = t.getContext("2d"),
                s = this.img.width,
                a = this.img.height,
                n = s / a,
                o = this.assetData.w / this.assetData.h,
                h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
            o < n && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (r = a) * o : r = (e = s) / o, i.drawImage(this.img, (s - e) / 2, (a - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t
        }
    }, CVImageElement.prototype.renderInnerContent = function (t) {
        this.canvasContext.drawImage(this.img, 0, 0)
    }, CVImageElement.prototype.destroy = function () {
        this.img = null
    }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
        var t;
        for (t = this.layers.length - 1; 0 <= t; t -= 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
    }, CVCompElement.prototype.destroy = function () {
        var t;
        for (t = this.layers.length - 1; 0 <= t; t -= 1) this.elements[t] && this.elements[t].destroy();
        this.layers = null, this.elements = null
    }, CVMaskElement.prototype.renderFrame = function () {
        if (this.hasMasks) {
            var t, e, r, i, s = this.element.finalTransform.mat,
                a = this.element.canvasContext,
                n = this.masksProperties.length;
            for (a.beginPath(), t = 0; t < n; t++)
                if ("n" !== this.masksProperties[t].mode) {
                    this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), i = this.viewData[t].v, e = s.applyToPointArray(i.v[0][0], i.v[0][1], 0), a.moveTo(e[0], e[1]);
                    var o, h = i._length;
                    for (o = 1; o < h; o++) r = s.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                    r = s.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
                } this.element.globalData.renderer.save(!0), a.clip()
        }
    }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
        this.element = null
    }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
        opacity: 1,
        _opMdf: !1
    }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
    }, CVShapeElement.prototype.createStyleElement = function (t, e) {
        var r = {
                data: t,
                type: t.ty,
                preTransforms: this.transformsManager.addTransformSequence(e),
                transforms: [],
                elements: [],
                closed: !0 === t.hd
            },
            i = {};
        if ("fl" == t.ty || "st" == t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bm_floor(i.c.v[0]) + "," + bm_floor(i.c.v[1]) + "," + bm_floor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
                k: 0
            }, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
                k: 0
            }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty) {
            if (r.lc = this.lcEnum[t.lc] || "round", r.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
                var s = new DashProperty(this, t.d, "canvas", this);
                i.d = s, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0])
            }
        } else r.r = 2 === t.r ? "evenodd" : "nonzero";
        return this.stylesList.push(r), i.style = r, i
    }, CVShapeElement.prototype.createGroupElement = function (t) {
        return {
            it: [],
            prevViewData: []
        }
    }, CVShapeElement.prototype.createTransformElement = function (t) {
        return {
            transform: {
                opacity: 1,
                _opMdf: !1,
                key: this.transformsManager.getNewKey(),
                op: PropertyFactory.getProp(this, t.o, 0, .01, this),
                mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
            }
        }
    }, CVShapeElement.prototype.createShapeElement = function (t) {
        var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
        return this.shapes.push(e), this.addShapeToModifiers(e), e
    }, CVShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t, e = this.itemsData.length;
        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
        this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
    }, CVShapeElement.prototype.addTransformToStyleList = function (t) {
        var e, r = this.stylesList.length;
        for (e = 0; e < r; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
    }, CVShapeElement.prototype.removeTransformFromStyleList = function () {
        var t, e = this.stylesList.length;
        for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop()
    }, CVShapeElement.prototype.closeStyles = function (t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1) t[e].closed = !0
    }, CVShapeElement.prototype.searchShapes = function (t, e, r, i, s) {
        var a, n, o, h, l, p, m = t.length - 1,
            f = [],
            c = [],
            d = [].concat(s);
        for (a = m; 0 <= a; a -= 1) {
            if ((h = this.searchProcessedElement(t[a])) ? e[a] = r[h - 1] : t[a]._shouldRender = i, "fl" == t[a].ty || "st" == t[a].ty || "gf" == t[a].ty || "gs" == t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], d), f.push(e[a].style);
            else if ("gr" == t[a].ty) {
                if (h)
                    for (o = e[a].it.length, n = 0; n < o; n += 1) e[a].prevViewData[n] = e[a].it[n];
                else e[a] = this.createGroupElement(t[a]);
                this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, i, d)
            } else "tr" == t[a].ty ? (h || (p = this.createTransformElement(t[a]), e[a] = p), d.push(e[a]), this.addTransformToStyleList(e[a])) : "sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" == t[a].ty || "rd" == t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]), e[a] = l, this.shapeModifiers.push(l)), c.push(l)) : "rp" == t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty), (e[a] = l).init(this, t, a, e), this.shapeModifiers.push(l), i = !1), c.push(l));
            this.addProcessedElement(t[a], a + 1)
        }
        for (this.removeTransformFromStyleList(), this.closeStyles(f), m = c.length, a = 0; a < m; a += 1) c[a].closed = !0
    }, CVShapeElement.prototype.renderInnerContent = function () {
        this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
    }, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
        (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
    }, CVShapeElement.prototype.drawLayer = function () {
        var t, e, r, i, s, a, n, o, h, l = this.stylesList.length,
            p = this.globalData.renderer,
            m = this.globalData.canvasContext;
        for (t = 0; t < l; t += 1)
            if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
                for (p.save(), a = h.elements, "st" === o || "gs" === o ? (m.strokeStyle = "st" === o ? h.co : h.grd, m.lineWidth = h.wi, m.lineCap = h.lc, m.lineJoin = h.lj, m.miterLimit = h.ml || 0) : m.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && m.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = a.length, e = 0; e < r; e += 1) {
                    for ("st" !== o && "gs" !== o || (m.beginPath(), h.da && (m.setLineDash(h.da), m.lineDashOffset = h.do)), s = (n = a[e].trNodes).length, i = 0; i < s; i += 1) "m" == n[i].t ? m.moveTo(n[i].p[0], n[i].p[1]) : "c" == n[i].t ? m.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : m.closePath();
                    "st" !== o && "gs" !== o || (m.stroke(), h.da && m.setLineDash(this.dashResetter))
                }
                "st" !== o && "gs" !== o && m.fill(h.r), p.restore()
            }
    }, CVShapeElement.prototype.renderShape = function (t, e, r, i) {
        var s, a;
        for (a = t, s = e.length - 1; 0 <= s; s -= 1) "tr" == e[s].ty ? (a = r[s].transform, this.renderShapeTransform(t, a)) : "sh" == e[s].ty || "el" == e[s].ty || "rc" == e[s].ty || "sr" == e[s].ty ? this.renderPath(e[s], r[s]) : "fl" == e[s].ty ? this.renderFill(e[s], r[s], a) : "st" == e[s].ty ? this.renderStroke(e[s], r[s], a) : "gf" == e[s].ty || "gs" == e[s].ty ? this.renderGradientFill(e[s], r[s], a) : "gr" == e[s].ty ? this.renderShape(a, e[s].it, r[s].it) : e[s].ty;
        i && this.drawLayer()
    }, CVShapeElement.prototype.renderStyledShape = function (t, e) {
        if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
            var r, i, s, a = t.trNodes,
                n = e.paths,
                o = n._length;
            a.length = 0;
            var h = t.transforms.finalTransform;
            for (s = 0; s < o; s += 1) {
                var l = n.shapes[s];
                if (l && l.v) {
                    for (i = l._length, r = 1; r < i; r += 1) 1 === r && a.push({
                        t: "m",
                        p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                    }), a.push({
                        t: "c",
                        pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
                    });
                    1 === i && a.push({
                        t: "m",
                        p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                    }), l.c && i && (a.push({
                        t: "c",
                        pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
                    }), a.push({
                        t: "z"
                    }))
                }
            }
            t.trNodes = a
        }
    }, CVShapeElement.prototype.renderPath = function (t, e) {
        if (!0 !== t.hd && t._shouldRender) {
            var r, i = e.styledShapes.length;
            for (r = 0; r < i; r += 1) this.renderStyledShape(e.styledShapes[r], e.sh)
        }
    }, CVShapeElement.prototype.renderFill = function (t, e, r) {
        var i = e.style;
        (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity)
    }, CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
        var i = e.style;
        if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
            var s = this.globalData.canvasContext,
                a = e.s.v,
                n = e.e.v;
            if (1 === t.t) f = s.createLinearGradient(a[0], a[1], n[0], n[1]);
            else var o = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2)),
                h = Math.atan2(n[1] - a[1], n[0] - a[0]),
                l = o * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
                p = Math.cos(h + e.a.v) * l + a[0],
                m = Math.sin(h + e.a.v) * l + a[1],
                f = s.createRadialGradient(p, m, 0, a[0], a[1], o);
            var c, d = t.g.p,
                u = e.g.c,
                y = 1;
            for (c = 0; c < d; c += 1) e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * c + 1]), f.addColorStop(u[4 * c] / 100, "rgba(" + u[4 * c + 1] + "," + u[4 * c + 2] + "," + u[4 * c + 3] + "," + y + ")");
            i.grd = f
        }
        i.coOp = e.o.v * r.opacity
    }, CVShapeElement.prototype.renderStroke = function (t, e, r) {
        var i = e.style,
            s = e.d;
        s && (s._mdf || this._isFirstFrame) && (i.da = s.dashArray, i.do = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
    }, CVShapeElement.prototype.destroy = function () {
        this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
    }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
        var t = this.canvasContext;
        t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
    }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = !1;
        t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
        var r = !1;
        t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
        var i, s, a = this.globalData.fontManager.getFontByName(t.f),
            n = t.l,
            o = this.mHelper;
        this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;
        var h, l, p, m, f, c, d, u, y, g, v = this.data.singleShape,
            b = t.tr / 1e3 * t.finalSize,
            E = 0,
            x = 0,
            P = !0,
            S = 0;
        for (i = 0; i < s; i += 1) {
            for (l = (h = this.globalData.fontManager.getCharData(t.finalText[i], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {}, o.reset(), v && n[i].n && (E = -b, x += t.yOffset, x += P ? 1 : 0, P = !1), d = (f = l.shapes ? l.shapes[0].it : []).length, o.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, o, n[i].line, E, x), y = createSizedArray(d), c = 0; c < d; c += 1) {
                for (m = f[c].ks.k.i.length, u = f[c].ks.k, g = [], p = 1; p < m; p += 1) 1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
                g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), y[c] = g
            }
            v && (E += n[i].l, E += b), this.textSpans[S] ? this.textSpans[S].elem = y : this.textSpans[S] = {
                elem: y
            }, S += 1
        }
    }, CVTextElement.prototype.renderInnerContent = function () {
        var t, e, r, i, s, a, n = this.canvasContext;
        this.finalTransform.mat.props;
        n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
        var o, h = this.textAnimator.renderedLetters,
            l = this.textProperty.currentData.l;
        e = l.length;
        var p, m, f = null,
            c = null,
            d = null;
        for (t = 0; t < e; t += 1)
            if (!l[t].n) {
                if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
                    for (o && o.fc ? f !== o.fc && (f = o.fc, n.fillStyle = o.fc) : f !== this.values.fill && (f = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
                        for (a = (m = p[r]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
                    this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
                }
                if (this.stroke) {
                    for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? c !== o.sc && (c = o.sc, n.strokeStyle = o.sc) : c !== this.values.stroke && (c = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
                        for (a = (m = p[r]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
                    this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
                }
                o && this.globalData.renderer.restore()
            }
    }, CVEffects.prototype.renderFrame = function () {}, HBaseElement.prototype = {
        checkBlendMode: function () {},
        initRendererElement: function () {
            this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement)
        },
        createContainerElements: function () {
            this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode()
        },
        renderElement: function () {
            this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()), this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v)
        },
        renderFrame: function () {
            this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
        },
        destroy: function () {
            this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
        },
        createRenderableComponents: function () {
            this.maskManager = new MaskElement(this.data, this, this.globalData)
        },
        addEffects: function () {},
        setMatte: function () {}
    }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
        var t;
        this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t)
    }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
        this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
    }, HCompElement.prototype.addTo3dContainer = function (t, e) {
        for (var r, i = 0; i < e;) this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
        r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t)
    }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
        var t;
        if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;
        else {
            t = createNS("svg");
            var e = this.comp.data ? this.comp.data : this.globalData.compSize;
            t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t)
        }
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t
    }, HShapeElement.prototype.getTransformedPoint = function (t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1) e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
        return e
    }, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
        var r, i, s, a, n, o = t.sh.v,
            h = t.transformers,
            l = o._length;
        if (!(l <= 1)) {
            for (r = 0; r < l - 1; r += 1) i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[r + 1]), n = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, s, a, n, e);
            o.c && (i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, s, a, n, e))
        }
    }, HShapeElement.prototype.checkBounds = function (t, e, r, i, s) {
        this.getBoundsOfCurve(t, e, r, i);
        var a = this.shapeBoundingBox;
        s.x = bm_min(a.left, s.x), s.xMax = bm_max(a.right, s.xMax), s.y = bm_min(a.top, s.y), s.yMax = bm_max(a.bottom, s.yMax)
    }, HShapeElement.prototype.shapeBoundingBox = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, HShapeElement.prototype.tempBoundingBox = {
        x: 0,
        xMax: 0,
        y: 0,
        yMax: 0,
        width: 0,
        height: 0
    }, HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
        for (var s, a, n, o, h, l, p, m = [
                [t[0], i[0]],
                [t[1], i[1]]
            ], f = 0; f < 2; ++f)
            if (a = 6 * t[f] - 12 * e[f] + 6 * r[f], s = -3 * t[f] + 9 * e[f] - 9 * r[f] + 3 * i[f], n = 3 * e[f] - 3 * t[f], a |= 0, n |= 0, 0 !== (s |= 0))(h = a * a - 4 * n * s) < 0 || (0 < (l = (-a + bm_sqrt(h)) / (2 * s)) && l < 1 && m[f].push(this.calculateF(l, t, e, r, i, f)), 0 < (p = (-a - bm_sqrt(h)) / (2 * s)) && p < 1 && m[f].push(this.calculateF(p, t, e, r, i, f)));
            else {
                if (0 === a) continue;
                0 < (o = -n / a) && o < 1 && m[f].push(this.calculateF(o, t, e, r, i, f))
            } this.shapeBoundingBox.left = bm_min.apply(null, m[0]), this.shapeBoundingBox.top = bm_min.apply(null, m[1]), this.shapeBoundingBox.right = bm_max.apply(null, m[0]), this.shapeBoundingBox.bottom = bm_max.apply(null, m[1])
    }, HShapeElement.prototype.calculateF = function (t, e, r, i, s, a) {
        return bm_pow(1 - t, 3) * e[a] + 3 * bm_pow(1 - t, 2) * t * r[a] + 3 * (1 - t) * bm_pow(t, 2) * i[a] + bm_pow(t, 3) * s[a]
    }, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1) t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e)
    }, HShapeElement.prototype.currentBoxContains = function (t) {
        return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
    }, HShapeElement.prototype.renderInnerContent = function () {
        if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
            var t = this.tempBoundingBox,
                e = 999999;
            if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
            var r = !1;
            this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), (r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
        }
    }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
        if (this.isMasked = this.checkMasks(), this.isMasked) {
            this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
            var t = createNS("g");
            this.maskedElement.appendChild(t), this.innerElem = t
        } else this.renderType = "html", this.innerElem = this.layerElement;
        this.checkParenting()
    }, HTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = this.innerElem.style;
        e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)", t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
        var r, i, s = this.globalData.fontManager.getFontByName(t.f);
        if (!this.globalData.fontManager.chars)
            if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", s.fClass) this.innerElem.className = s.fClass;
            else {
                e.fontFamily = s.fFamily;
                var a = t.fWeight,
                    n = t.fStyle;
                e.fontStyle = n, e.fontWeight = a
            } var o, h, l, p = t.l;
        i = p.length;
        var m, f = this.mHelper,
            c = "",
            d = 0;
        for (r = 0; r < i; r += 1) {
            if (this.globalData.fontManager.chars ? (this.textPaths[d] ? o = this.textPaths[d] : ((o = createNS("path")).setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? l = (h = this.textSpans[d]).children[0] : ((h = createTag("div")).style.lineHeight = 0, (l = createNS("svg")).appendChild(o), styleDiv(h)))) : this.isMasked ? o = this.textPaths[d] ? this.textPaths[d] : createNS("text") : this.textSpans[d] ? (h = this.textSpans[d], o = this.textPaths[d]) : (styleDiv(h = createTag("span")), styleDiv(o = createTag("span")), h.appendChild(o)), this.globalData.fontManager.chars) {
                var u, y = this.globalData.fontManager.getCharData(t.finalText[r], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                if (u = y ? y.data : null, f.reset(), u && u.shapes && (m = u.shapes[0].it, f.scale(t.finalSize / 100, t.finalSize / 100), c = this.createPathShape(f, m), o.setAttribute("d", c)), this.isMasked) this.innerElem.appendChild(o);
                else {
                    if (this.innerElem.appendChild(h), u && u.shapes) {
                        document.body.appendChild(l);
                        var g = l.getBBox();
                        l.setAttribute("width", g.width + 2), l.setAttribute("height", g.height + 2), l.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)), l.style.transform = l.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)", p[r].yOffset = g.y - 1
                    } else l.setAttribute("width", 1), l.setAttribute("height", 1);
                    h.appendChild(l)
                }
            } else o.textContent = p[r].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h), o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");
            this.isMasked ? this.textSpans[d] = o : this.textSpans[d] = h, this.textSpans[d].style.display = "block", this.textPaths[d] = o, d += 1
        }
        for (; d < this.textSpans.length;) this.textSpans[d].style.display = "none", d += 1
    }, HTextElement.prototype.renderInnerContent = function () {
        if (this.data.singleShape) {
            if (!this._isFirstFrame && !this.lettersChangedFlag) return;
            this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
        }
        if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
            var t, e, r, i, s, a = 0,
                n = this.textAnimator.renderedLetters,
                o = this.textProperty.currentData.l;
            for (e = o.length, t = 0; t < e; t += 1) o[t].n ? a += 1 : (i = this.textSpans[t], s = this.textPaths[t], r = n[a], a += 1, r._mdf.m && (this.isMasked ? i.setAttribute("transform", r.m) : i.style.transform = i.style.webkitTransform = r.m), i.style.opacity = r.o, r.sw && r._mdf.sw && s.setAttribute("stroke-width", r.sw), r.sc && r._mdf.sc && s.setAttribute("stroke", r.sc), r.fc && r._mdf.fc && (s.setAttribute("fill", r.fc), s.style.color = r.fc));
            if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
                var h = this.innerElem.getBBox();
                this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.svgElement.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.svgElement.setAttribute("height", h.height));
                this.currentBBox.w === h.width + 2 && this.currentBBox.h === h.height + 2 && this.currentBBox.x === h.x - 1 && this.currentBBox.y === h.y - 1 || (this.currentBBox.w = h.width + 2, this.currentBBox.h = h.height + 2, this.currentBBox.x = h.x - 1, this.currentBBox.y = h.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
            }
        }
    }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData),
            e = new Image;
        this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
    }, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
        var t, e, r = this.comp.threeDElements.length;
        for (t = 0; t < r; t += 1) "3d" === (e = this.comp.threeDElements[t]).type && (e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)")
    }, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
        var t, e, r = this._isFirstFrame;
        if (this.hierarchy)
            for (e = this.hierarchy.length, t = 0; t < e; t += 1) r = this.hierarchy[t].finalTransform.mProp._mdf || r;
        if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
            if (this.mat.reset(), this.hierarchy)
                for (t = e = this.hierarchy.length - 1; 0 <= t; t -= 1) {
                    var i = this.hierarchy[t].finalTransform.mProp;
                    this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2])
                }
            if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
                var s;
                s = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
                var a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
                    n = [s[0] / a, s[1] / a, s[2] / a],
                    o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
                    h = Math.atan2(n[1], o),
                    l = Math.atan2(n[0], -n[2]);
                this.mat.rotateY(l).rotateX(-h)
            }
            this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
            var p = !this._prevMat.equals(this.mat);
            if ((p || this.pe._mdf) && this.comp.threeDElements) {
                var m;
                for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1) "3d" === (m = this.comp.threeDElements[t]).type && (p && (m.container.style.transform = m.container.style.webkitTransform = this.mat.toCSS()), this.pe._mdf && (m.perspectiveElem.style.perspective = m.perspectiveElem.style.webkitPerspective = this.pe.v + "px"));
                this.mat.clone(this._prevMat)
            }
        }
        this._isFirstFrame = !1
    }, HCameraElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0)
    }, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.getBaseElement = function () {
        return null
    }, HEffects.prototype.renderFrame = function () {};
    var animationManager = function () {
            var t = {},
                s = [],
                i = 0,
                a = 0,
                n = 0,
                o = !0,
                h = !1;

            function r(t) {
                for (var e = 0, r = t.target; e < a;) s[e].animation === r && (s.splice(e, 1), e -= 1, a -= 1, r.isPaused || m()), e += 1
            }

            function l(t, e) {
                if (!t) return null;
                for (var r = 0; r < a;) {
                    if (s[r].elem == t && null !== s[r].elem) return s[r].animation;
                    r += 1
                }
                var i = new AnimationItem;
                return f(i, t), i.setData(t, e), i
            }

            function p() {
                n += 1, d()
            }

            function m() {
                n -= 1
            }

            function f(t, e) {
                t.addEventListener("destroy", r), t.addEventListener("_active", p), t.addEventListener("_idle", m), s.push({
                    elem: e,
                    animation: t
                }), a += 1
            }

            function c(t) {
                var e, r = t - i;
                for (e = 0; e < a; e += 1) s[e].animation.advanceTime(r);
                i = t, n && !h ? window.requestAnimationFrame(c) : o = !0
            }

            function e(t) {
                i = t, window.requestAnimationFrame(c)
            }

            function d() {
                !h && n && o && (window.requestAnimationFrame(e), o = !1)
            }
            return t.registerAnimation = l, t.loadAnimation = function (t) {
                var e = new AnimationItem;
                return f(e, null), e.setParams(t), e
            }, t.setSpeed = function (t, e) {
                var r;
                for (r = 0; r < a; r += 1) s[r].animation.setSpeed(t, e)
            }, t.setDirection = function (t, e) {
                var r;
                for (r = 0; r < a; r += 1) s[r].animation.setDirection(t, e)
            }, t.play = function (t) {
                var e;
                for (e = 0; e < a; e += 1) s[e].animation.play(t)
            }, t.pause = function (t) {
                var e;
                for (e = 0; e < a; e += 1) s[e].animation.pause(t)
            }, t.stop = function (t) {
                var e;
                for (e = 0; e < a; e += 1) s[e].animation.stop(t)
            }, t.togglePause = function (t) {
                var e;
                for (e = 0; e < a; e += 1) s[e].animation.togglePause(t)
            }, t.searchAnimations = function (t, e, r) {
                var i, s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
                    a = s.length;
                for (i = 0; i < a; i += 1) r && s[i].setAttribute("data-bm-type", r), l(s[i], t);
                if (e && 0 === a) {
                    r || (r = "svg");
                    var n = document.getElementsByTagName("body")[0];
                    n.innerHTML = "";
                    var o = createTag("div");
                    o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), l(o, t)
                }
            }, t.resize = function () {
                var t;
                for (t = 0; t < a; t += 1) s[t].animation.resize()
            }, t.goToAndStop = function (t, e, r) {
                var i;
                for (i = 0; i < a; i += 1) s[i].animation.goToAndStop(t, e, r)
            }, t.destroy = function (t) {
                var e;
                for (e = a - 1; 0 <= e; e -= 1) s[e].animation.destroy(t)
            }, t.freeze = function () {
                h = !0
            }, t.unfreeze = function () {
                h = !1, d()
            }, t.getRegisteredAnimations = function () {
                var t, e = s.length,
                    r = [];
                for (t = 0; t < e; t += 1) r.push(s[t].animation);
                return r
            }, t
        }(),
        AnimationItem = function () {
            this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader
        };
    extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
        t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
        switch (e) {
            case "canvas":
                this.renderer = new CanvasRenderer(this, t.rendererSettings);
                break;
            case "svg":
                this.renderer = new SVGRenderer(this, t.rendererSettings);
                break;
            default:
                this.renderer = new HybridRenderer(this, t.rendererSettings)
        }
        this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function () {
            this.trigger("data_failed")
        }.bind(this)))
    }, AnimationItem.prototype.setData = function (t, e) {
        var r = {
                wrapper: t,
                animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null
            },
            i = t.attributes;
        r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
        var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
        "" === s || (r.loop = "false" !== s && ("true" === s || parseInt(s)));
        var a = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
        r.autoplay = "false" !== a, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r)
    }, AnimationItem.prototype.includeLayers = function (t) {
        t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
        var e, r, i = this.animationData.layers,
            s = i.length,
            a = t.layers,
            n = a.length;
        for (r = 0; r < n; r += 1)
            for (e = 0; e < s;) {
                if (i[e].id == a[r].id) {
                    i[e] = a[r];
                    break
                }
                e += 1
            }
        if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
            for (s = t.assets.length, e = 0; e < s; e += 1) this.animationData.assets.push(t.assets[e]);
        this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment()
    }, AnimationItem.prototype.loadNextSegment = function () {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.totalFrames);
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), function () {
            this.trigger("data_failed")
        }.bind(this))
    }, AnimationItem.prototype.loadSegments = function () {
        this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
    }, AnimationItem.prototype.imagesLoaded = function () {
        this.trigger("loaded_images"), this.checkLoaded()
    }, AnimationItem.prototype.preloadImages = function () {
        this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
    }, AnimationItem.prototype.configAnimation = function (t) {
        if (this.renderer) try {
            this.animationData = t, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded()
        } catch (t) {
            this.triggerConfigError(t)
        }
    }, AnimationItem.prototype.waitForFontsLoaded = function () {
        this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
    }, AnimationItem.prototype.checkLoaded = function () {
        this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
            this.trigger("DOMLoaded")
        }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play())
    }, AnimationItem.prototype.resize = function () {
        this.renderer.updateContainerSize()
    }, AnimationItem.prototype.setSubframe = function (t) {
        this.subframeEnabled = !!t
    }, AnimationItem.prototype.gotoFrame = function () {
        this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
    }, AnimationItem.prototype.renderFrame = function () {
        if (!1 !== this.isLoaded) try {
            this.renderer.renderFrame(this.currentFrame + this.firstFrame)
        } catch (t) {
            this.triggerRenderFrameError(t)
        }
    }, AnimationItem.prototype.play = function (t) {
        t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")))
    }, AnimationItem.prototype.pause = function (t) {
        t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"))
    }, AnimationItem.prototype.togglePause = function (t) {
        t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
    }, AnimationItem.prototype.stop = function (t) {
        t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
    }, AnimationItem.prototype.goToAndStop = function (t, e, r) {
        r && this.name != r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause())
    }, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
        this.goToAndStop(t, e, r), this.play()
    }, AnimationItem.prototype.advanceTime = function (t) {
        if (!0 !== this.isPaused && !1 !== this.isLoaded) {
            var e = this.currentRawFrame + t * this.frameModifier,
                r = !1;
            e >= this.totalFrames - 1 && 0 < this.frameModifier ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"))
        }
    }, AnimationItem.prototype.adjustSegment = function (t, e) {
        this.playCount = 0, t[1] < t[0] ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
    }, AnimationItem.prototype.setSegment = function (t, e) {
        var r = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== r && this.goToAndStop(r, !0)
    }, AnimationItem.prototype.playSegments = function (t, e) {
        if (e && (this.segments.length = 0), "object" == typeof t[0]) {
            var r, i = t.length;
            for (r = 0; r < i; r += 1) this.segments.push(t[r])
        } else this.segments.push(t);
        this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
    }, AnimationItem.prototype.resetSegments = function (t) {
        this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
    }, AnimationItem.prototype.checkSegments = function (t) {
        return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
    }, AnimationItem.prototype.destroy = function (t) {
        t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null)
    }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
        this.currentRawFrame = t, this.gotoFrame()
    }, AnimationItem.prototype.setSpeed = function (t) {
        this.playSpeed = t, this.updaFrameModifier()
    }, AnimationItem.prototype.setDirection = function (t) {
        this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
    }, AnimationItem.prototype.updaFrameModifier = function () {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
    }, AnimationItem.prototype.getPath = function () {
        return this.path
    }, AnimationItem.prototype.getAssetsPath = function (t) {
        var e = "";
        if (t.e) e = t.p;
        else if (this.assetsPath) {
            var r = t.p; - 1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r
        } else e = this.path, e += t.u ? t.u : "", e += t.p;
        return e
    }, AnimationItem.prototype.getAssetData = function (t) {
        for (var e = 0, r = this.assets.length; e < r;) {
            if (t == this.assets[e].id) return this.assets[e];
            e += 1
        }
    }, AnimationItem.prototype.hide = function () {
        this.renderer.hide()
    }, AnimationItem.prototype.show = function () {
        this.renderer.show()
    }, AnimationItem.prototype.getDuration = function (t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate
    }, AnimationItem.prototype.trigger = function (t) {
        if (this._cbs && this._cbs[t]) switch (t) {
            case "enterFrame":
                this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
                break;
            case "loopComplete":
                this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                break;
            case "complete":
                this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                break;
            case "segmentStart":
                this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                break;
            case "destroy":
                this.triggerEvent(t, new BMDestroyEvent(t, this));
                break;
            default:
                this.triggerEvent(t)
        }
        "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
    }, AnimationItem.prototype.triggerRenderFrameError = function (t) {
        var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
    }, AnimationItem.prototype.triggerConfigError = function (t) {
        var e = new BMConfigErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
    };
    var Expressions = (zW = {}, zW.initExpressions = function (t) {
            var e = 0,
                r = [];

            function i() {
                var t, e = r.length;
                for (t = 0; t < e; t += 1) r[t].release();
                r.length = 0
            }
            t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
                e += 1
            }, t.renderer.globalData.popExpression = function () {
                0 == (e -= 1) && i()
            }, t.renderer.globalData.registerExpressionProperty = function (t) {
                -1 === r.indexOf(t) && r.push(t)
            }
        }, zW),
        zW;
    expressionsPlugin = Expressions;
    var ExpressionManager = function () {
            var ob = {},
                Math = BMMath,
                window = null,
                document = null;

            function $bm_isInstanceOfArray(t) {
                return t.constructor === Array || t.constructor === Float32Array
            }

            function isNumerable(t, e) {
                return "number" === t || "boolean" === t || "string" === t || e instanceof Number
            }

            function $bm_neg(t) {
                var e = typeof t;
                if ("number" === e || "boolean" === e || t instanceof Number) return -t;
                if ($bm_isInstanceOfArray(t)) {
                    var r, i = t.length,
                        s = [];
                    for (r = 0; r < i; r += 1) s[r] = -t[r];
                    return s
                }
                return t.propType ? t.v : void 0
            }
            var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
                easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
                easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

            function sum(t, e) {
                var r = typeof t,
                    i = typeof e;
                if ("string" === r || "string" === i) return t + e;
                if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
                if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] + e, t;
                if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;
                if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                    for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;)("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
                    return o
                }
                return 0
            }
            var add = sum;

            function sub(t, e) {
                var r = typeof t,
                    i = typeof e;
                if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t)), "string" === i && (e = parseInt(e)), t - e;
                if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] - e, t;
                if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;
                if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                    for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;)("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
                    return o
                }
                return 0
            }

            function mul(t, e) {
                var r, i, s, a = typeof t,
                    n = typeof e;
                if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
                if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                    for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] * e;
                    return r
                }
                if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                    for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t * e[i];
                    return r
                }
                return 0
            }

            function div(t, e) {
                var r, i, s, a = typeof t,
                    n = typeof e;
                if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
                if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                    for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] / e;
                    return r
                }
                if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                    for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t / e[i];
                    return r
                }
                return 0
            }

            function mod(t, e) {
                return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e
            }
            var $bm_sum = sum,
                $bm_sub = sub,
                $bm_mul = mul,
                $bm_div = div,
                $bm_mod = mod;

            function clamp(t, e, r) {
                if (r < e) {
                    var i = r;
                    r = e, e = i
                }
                return Math.min(Math.max(t, e), r)
            }

            function radiansToDegrees(t) {
                return t / degToRads
            }
            var radians_to_degrees = radiansToDegrees;

            function degreesToRadians(t) {
                return t * degToRads
            }
            var degrees_to_radians = radiansToDegrees,
                helperLengthArray = [0, 0, 0, 0, 0, 0];

            function length(t, e) {
                if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
                e || (e = helperLengthArray);
                var r, i = Math.min(t.length, e.length),
                    s = 0;
                for (r = 0; r < i; r += 1) s += Math.pow(e[r] - t[r], 2);
                return Math.sqrt(s)
            }

            function normalize(t) {
                return div(t, length(t))
            }

            function rgbToHsl(t) {
                var e, r, i = t[0],
                    s = t[1],
                    a = t[2],
                    n = Math.max(i, s, a),
                    o = Math.min(i, s, a),
                    h = (n + o) / 2;
                if (n == o) e = r = 0;
                else {
                    var l = n - o;
                    switch (r = .5 < h ? l / (2 - n - o) : l / (n + o), n) {
                        case i:
                            e = (s - a) / l + (s < a ? 6 : 0);
                            break;
                        case s:
                            e = (a - i) / l + 2;
                            break;
                        case a:
                            e = (i - s) / l + 4
                    }
                    e /= 6
                }
                return [e, r, h, t[3]]
            }

            function hue2rgb(t, e, r) {
                return r < 0 && (r += 1), 1 < r && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
            }

            function hslToRgb(t) {
                var e, r, i, s = t[0],
                    a = t[1],
                    n = t[2];
                if (0 === a) e = r = i = n;
                else {
                    var o = n < .5 ? n * (1 + a) : n + a - n * a,
                        h = 2 * n - o;
                    e = hue2rgb(h, o, s + 1 / 3), r = hue2rgb(h, o, s), i = hue2rgb(h, o, s - 1 / 3)
                }
                return [e, r, i, t[3]]
            }

            function linear(t, e, r, i, s) {
                if (void 0 !== i && void 0 !== s || (i = e, s = r, e = 0, r = 1), r < e) {
                    var a = r;
                    r = e, e = a
                }
                if (t <= e) return i;
                if (r <= t) return s;
                var n = r === e ? 0 : (t - e) / (r - e);
                if (!i.length) return i + (s - i) * n;
                var o, h = i.length,
                    l = createTypedArray("float32", h);
                for (o = 0; o < h; o += 1) l[o] = i[o] + (s[o] - i[o]) * n;
                return l
            }

            function random(t, e) {
                if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
                    var r, i = e.length;
                    t || (t = createTypedArray("float32", i));
                    var s = createTypedArray("float32", i),
                        a = BMMath.random();
                    for (r = 0; r < i; r += 1) s[r] = t[r] + a * (e[r] - t[r]);
                    return s
                }
                return void 0 === t && (t = 0), t + BMMath.random() * (e - t)
            }

            function createPath(t, e, r, i) {
                var s, a = t.length,
                    n = shape_pool.newElement();
                n.setPathData(!!i, a);
                var o, h, l = [0, 0];
                for (s = 0; s < a; s += 1) o = e && e[s] ? e[s] : l, h = r && r[s] ? r[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
                return n
            }

            function initiateExpression(elem, data, property) {
                var val = data.x,
                    needsVelocity = /velocity(?![\w\d])/.test(val),
                    _needsRandom = -1 !== val.indexOf("random"),
                    elemType = elem.data.ty,
                    transform, $bm_transform, content, effect, thisProperty = property;
                thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
                    get: function () {
                        return thisProperty.v
                    }
                }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
                var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                    outPoint = elem.data.op / elem.comp.globalData.frameRate,
                    width = elem.data.sw ? elem.data.sw : 0,
                    height = elem.data.sh ? elem.data.sh : 0,
                    name = elem.data.nm,
                    loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, __expression_functions = [],
                    scoped_bm_rt;
                if (data.xf) {
                    var i, len = data.xf.length;
                    for (i = 0; i < len; i += 1) __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())")
                }
                var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
                    numKeys = property.kf ? data.k.length : 0,
                    active = !this.data || !0 !== this.data.hd,
                    wiggle = function (t, e) {
                        var r, i, s = this.pv.length ? this.pv.length : 1,
                            a = createTypedArray("float32", s);
                        var n = Math.floor(5 * time);
                        for (i = r = 0; r < n;) {
                            for (i = 0; i < s; i += 1) a[i] += -e + 2 * e * BMMath.random();
                            r += 1
                        }
                        var o = 5 * time,
                            h = o - Math.floor(o),
                            l = createTypedArray("float32", s);
                        if (1 < s) {
                            for (i = 0; i < s; i += 1) l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
                            return l
                        }
                        return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h
                    }.bind(this);

                function loopInDuration(t, e) {
                    return loopIn(t, e, !0)
                }

                function loopOutDuration(t, e) {
                    return loopOut(t, e, !0)
                }
                thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
                var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
                    time, velocity, value, text, textIndex, textTotal, selectorValue;

                function lookAt(t, e) {
                    var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                        i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
                    return [-Math.atan2(r[1], r[2]) / degToRads, i, 0]
                }

                function easeOut(t, e, r, i, s) {
                    return applyEase(easeOutBez, t, e, r, i, s)
                }

                function easeIn(t, e, r, i, s) {
                    return applyEase(easeInBez, t, e, r, i, s)
                }

                function ease(t, e, r, i, s) {
                    return applyEase(easeInOutBez, t, e, r, i, s)
                }

                function applyEase(t, e, r, i, s, a) {
                    void 0 === s ? (s = r, a = i) : e = (e - r) / (i - r);
                    var n = t(e = 1 < e ? 1 : e < 0 ? 0 : e);
                    if ($bm_isInstanceOfArray(s)) {
                        var o, h = s.length,
                            l = createTypedArray("float32", h);
                        for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];
                        return l
                    }
                    return (a - s) * n + s
                }

                function nearestKey(t) {
                    var e, r, i, s = data.k.length;
                    if (data.k.length && "number" != typeof data.k[0])
                        if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;
                        else {
                            for (e = 0; e < s - 1; e += 1) {
                                if (t === data.k[e].t) {
                                    r = e + 1, i = data.k[e].t;
                                    break
                                }
                                if (t > data.k[e].t && t < data.k[e + 1].t) {
                                    i = t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, data.k[e + 1].t) : (r = e + 1, data.k[e].t);
                                    break
                                }
                            } - 1 === r && (r = e + 1, i = data.k[e].t)
                        }
                    else i = r = 0;
                    var a = {};
                    return a.index = r, a.time = i / elem.comp.globalData.frameRate, a
                }

                function key(t) {
                    var e, r, i;
                    if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
                    t -= 1, e = {
                        time: data.k[t].t / elem.comp.globalData.frameRate,
                        value: []
                    };
                    var s = data.k[t].hasOwnProperty("s") ? data.k[t].s : data.k[t - 1].e;
                    for (i = s.length, r = 0; r < i; r += 1) e[r] = s[r], e.value[r] = s[r];
                    return e
                }

                function framesToTime(t, e) {
                    return e || (e = elem.comp.globalData.frameRate), t / e
                }

                function timeToFrames(t, e) {
                    return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e
                }

                function seedRandom(t) {
                    BMMath.seedrandom(randSeed + t)
                }

                function sourceRectAtTime() {
                    return elem.sourceRectAtTime()
                }

                function substring(t, e) {
                    return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : ""
                }

                function substr(t, e) {
                    return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : ""
                }
                var index = elem.data.ind,
                    hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                    parent, randSeed = Math.floor(1e6 * Math.random()),
                    globalData = elem.globalData;

                function executeExpression(t) {
                    return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), ($bm_transform = transform) && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt)
                }
                return executeExpression
            }
            return ob.initiateExpression = initiateExpression, ob
        }(),
        expressionHelpers = {
            searchExpressions: function (t, e, r) {
                e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)))
            },
            getSpeedAtTime: function (t) {
                var e = this.getValueAtTime(t),
                    r = this.getValueAtTime(t + -.01),
                    i = 0;
                if (e.length) {
                    var s;
                    for (s = 0; s < e.length; s += 1) i += Math.pow(r[s] - e[s], 2);
                    i = 100 * Math.sqrt(i)
                } else i = 0;
                return i
            },
            getVelocityAtTime: function (t) {
                if (void 0 !== this.vel) return this.vel;
                var e, r, i = this.getValueAtTime(t),
                    s = this.getValueAtTime(t + -.001);
                if (i.length)
                    for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) e[r] = (s[r] - i[r]) / -.001;
                else e = (s - i) / -.001;
                return e
            },
            getValueAtTime: function (t) {
                return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value
            },
            getStaticValueAtTime: function () {
                return this.pv
            },
            setGroupProperty: function (t) {
                this.propertyGroup = t
            }
        };
    ! function () {
        function o(t, e, r) {
            if (!this.k || !this.keyframes) return this.pv;
            t = t ? t.toLowerCase() : "";
            var i, s, a, n, o, h = this.comp.renderedFrame,
                l = this.keyframes,
                p = l[l.length - 1].t;
            if (h <= p) return this.pv;
            if (r ? s = p - (i = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
                if (Math.floor((h - s) / i) % 2 != 0) return this.getValueAtTime((i - (h - s) % i + s) / this.comp.globalData.frameRate, 0)
            } else {
                if ("offset" === t) {
                    var m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                        f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                        c = this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0),
                        d = Math.floor((h - s) / i);
                    if (this.pv.length) {
                        for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = (f[a] - m[a]) * d + c[a];
                        return o
                    }
                    return (f - m) * d + c
                }
                if ("continue" === t) {
                    var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                        y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
                    if (this.pv.length) {
                        for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                        return o
                    }
                    return u + (h - p) / .001 * (u - y)
                }
            }
            return this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0)
        }

        function h(t, e, r) {
            if (!this.k) return this.pv;
            t = t ? t.toLowerCase() : "";
            var i, s, a, n, o, h = this.comp.renderedFrame,
                l = this.keyframes,
                p = l[0].t;
            if (p <= h) return this.pv;
            if (r ? s = p + (i = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (s = l[e].t) - p), "pingpong" === t) {
                if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0)
            } else {
                if ("offset" === t) {
                    var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                        f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                        c = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
                        d = Math.floor((p - h) / i) + 1;
                    if (this.pv.length) {
                        for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = c[a] - (f[a] - m[a]) * d;
                        return o
                    }
                    return c - (f - m) * d
                }
                if ("continue" === t) {
                    var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                        y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
                    if (this.pv.length) {
                        for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
                        return o
                    }
                    return u + (u - y) * (p - h) / .001
                }
            }
            return this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0)
        }

        function l(t, e) {
            if (!this.k) return this.pv;
            if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
            var r, i, s = this.comp.renderedFrame / this.comp.globalData.frameRate,
                a = s - t,
                n = 1 < e ? (s + t - a) / (e - 1) : 1,
                o = 0,
                h = 0;
            for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
                if (i = this.getValueAtTime(a + o * n), this.pv.length)
                    for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];
                else r += i;
                o += 1
            }
            if (this.pv.length)
                for (h = 0; h < this.pv.length; h += 1) r[h] /= e;
            else r /= e;
            return r
        }
        var s = TransformPropertyFactory.getTransformProperty;
        TransformPropertyFactory.getTransformProperty = function (t, e, r) {
            var i = s(t, e, r);
            return i.dynamicProperties.length ? i.getValueAtTime = function (t) {
                console.warn("Transform at time not supported")
            }.bind(i) : i.getValueAtTime = function (t) {}.bind(i), i.setGroupProperty = expressionHelpers.setGroupProperty, i
        };
        var p = PropertyFactory.getProp;
        PropertyFactory.getProp = function (t, e, r, i, s) {
            var a = p(t, e, r, i, s);
            a.kf ? a.getValueAtTime = expressionHelpers.getValueAtTime.bind(a) : a.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(a), a.setGroupProperty = expressionHelpers.setGroupProperty, a.loopOut = o, a.loopIn = h, a.smooth = l, a.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(a), a.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(a), a.numKeys = 1 === e.a ? e.k.length : 0, a.propertyIndex = e.ix;
            var n = 0;
            return 0 !== r && (n = createTypedArray("float32", 1 === e.a ? e.k[0].s.length : e.k.length)), a._cachingAtTime = {
                lastFrame: initialDefaultFrame,
                lastIndex: 0,
                value: n
            }, expressionHelpers.searchExpressions(t, e, a), a.k && s.addDynamicProperty(a), a
        };
        var t = ShapePropertyFactory.getConstructorFunction(),
            e = ShapePropertyFactory.getKeyframedConstructorFunction();

        function r() {}
        r.prototype = {
            vertices: function (t, e) {
                this.k && this.getValue();
                var r = this.v;
                void 0 !== e && (r = this.getValueAtTime(e, 0));
                var i, s = r._length,
                    a = r[t],
                    n = r.v,
                    o = createSizedArray(s);
                for (i = 0; i < s; i += 1) o[i] = "i" === t || "o" === t ? [a[i][0] - n[i][0], a[i][1] - n[i][1]] : [a[i][0], a[i][1]];
                return o
            },
            points: function (t) {
                return this.vertices("v", t)
            },
            inTangents: function (t) {
                return this.vertices("i", t)
            },
            outTangents: function (t) {
                return this.vertices("o", t)
            },
            isClosed: function () {
                return this.v.c
            },
            pointOnPath: function (t, e) {
                var r = this.v;
                void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
                for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
                    if (l + a[o].addedLength > n) {
                        var p = o,
                            m = r.c && o === h - 1 ? 0 : o + 1,
                            f = (n - l) / a[o].addedLength;
                        i = bez.getPointInSegment(r.v[p], r.v[m], r.o[p], r.i[m], f, a[o]);
                        break
                    }
                    l += a[o].addedLength, o += 1
                }
                return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i
            },
            vectorOnPath: function (t, e, r) {
                t = 1 == t ? this.v.c ? 0 : .999 : t;
                var i = this.pointOnPath(t, e),
                    s = this.pointOnPath(t + .001, e),
                    a = s[0] - i[0],
                    n = s[1] - i[1],
                    o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
                return 0 === o ? [0, 0] : "tangent" === r ? [a / o, n / o] : [-n / o, a / o]
            },
            tangentOnPath: function (t, e) {
                return this.vectorOnPath(t, e, "tangent")
            },
            normalOnPath: function (t, e) {
                return this.vectorOnPath(t, e, "normal")
            },
            setGroupProperty: expressionHelpers.setGroupProperty,
            getValueAtTime: expressionHelpers.getStaticValueAtTime
        }, extendPrototype([r], t), extendPrototype([r], e), e.prototype.getValueAtTime = function (t) {
            return this._cachingAtTime || (this._cachingAtTime = {
                shapeValue: shape_pool.clone(this.pv),
                lastIndex: 0,
                lastTime: initialDefaultFrame
            }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue
        }, e.prototype.initiateExpression = ExpressionManager.initiateExpression;
        var n = ShapePropertyFactory.getShapeProp;
        ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
            var a = n(t, e, r, i, s);
            return a.propertyIndex = e.ix, a.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a
        }
    }(), TextProperty.prototype.getExpressionValue = function (t, e) {
        var r = this.calculateExpression(e);
        if (t.t === r) return t;
        var i = {};
        return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i
    }, TextProperty.prototype.searchProperty = function () {
        var t = this.searchKeyframes(),
            e = this.searchExpressions();
        return this.kf = t || e, this.kf
    }, TextProperty.prototype.searchExpressions = function () {
        if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0
    };
    var ShapeExpressionInterface = function () {
            function m(t, e, r) {
                var i, s = [],
                    a = t ? t.length : 0;
                for (i = 0; i < a; i += 1) "gr" == t[i].ty ? s.push(n(t[i], e[i], r)) : "fl" == t[i].ty ? s.push(o(t[i], e[i], r)) : "st" == t[i].ty ? s.push(h(t[i], e[i], r)) : "tm" == t[i].ty ? s.push(l(t[i], e[i], r)) : "tr" == t[i].ty || ("el" == t[i].ty ? s.push(p(t[i], e[i], r)) : "sr" == t[i].ty ? s.push(f(t[i], e[i], r)) : "sh" == t[i].ty ? s.push(y(t[i], e[i], r)) : "rc" == t[i].ty ? s.push(c(t[i], e[i], r)) : "rd" == t[i].ty ? s.push(d(t[i], e[i], r)) : "rp" == t[i].ty && s.push(u(t[i], e[i], r)));
                return s
            }

            function n(t, e, r) {
                var i = function (t) {
                    switch (t) {
                        case "ADBE Vectors Group":
                        case "Contents":
                        case 2:
                            return i.content;
                        default:
                            return i.transform
                    }
                };
                i.propertyGroup = function (t) {
                    return 1 === t ? i : r(t - 1)
                };
                var s, a, n, o, h, l = (s = t, a = e, n = i.propertyGroup, (h = function (t) {
                        for (var e = 0, r = o.length; e < r;) {
                            if (o[e]._name === t || o[e].mn === t || o[e].propertyIndex === t || o[e].ix === t || o[e].ind === t) return o[e];
                            e += 1
                        }
                        if ("number" == typeof t) return o[t - 1]
                    }).propertyGroup = function (t) {
                        return 1 === t ? h : n(t - 1)
                    }, o = m(s.it, a.it, h.propertyGroup), h.numProperties = o.length, h.propertyIndex = s.cix, h._name = s.nm, h),
                    p = function (e, t, r) {
                        function i(t) {
                            return 1 == t ? s : r(--t)
                        }
                        t.transform.mProps.o.setGroupProperty(i), t.transform.mProps.p.setGroupProperty(i), t.transform.mProps.a.setGroupProperty(i), t.transform.mProps.s.setGroupProperty(i), t.transform.mProps.r.setGroupProperty(i), t.transform.mProps.sk && (t.transform.mProps.sk.setGroupProperty(i), t.transform.mProps.sa.setGroupProperty(i));

                        function s(t) {
                            return e.a.ix === t || "Anchor Point" === t ? s.anchorPoint : e.o.ix === t || "Opacity" === t ? s.opacity : e.p.ix === t || "Position" === t ? s.position : e.r.ix === t || "Rotation" === t || "ADBE Vector Rotation" === t ? s.rotation : e.s.ix === t || "Scale" === t ? s.scale : e.sk && e.sk.ix === t || "Skew" === t ? s.skew : e.sa && e.sa.ix === t || "Skew Axis" === t ? s.skewAxis : void 0
                        }
                        return t.transform.op.setGroupProperty(i), Object.defineProperties(s, {
                            opacity: {
                                get: ExpressionPropertyInterface(t.transform.mProps.o)
                            },
                            position: {
                                get: ExpressionPropertyInterface(t.transform.mProps.p)
                            },
                            anchorPoint: {
                                get: ExpressionPropertyInterface(t.transform.mProps.a)
                            },
                            scale: {
                                get: ExpressionPropertyInterface(t.transform.mProps.s)
                            },
                            rotation: {
                                get: ExpressionPropertyInterface(t.transform.mProps.r)
                            },
                            skew: {
                                get: ExpressionPropertyInterface(t.transform.mProps.sk)
                            },
                            skewAxis: {
                                get: ExpressionPropertyInterface(t.transform.mProps.sa)
                            },
                            _name: {
                                value: e.nm
                            }
                        }), s.ty = "tr", s.mn = e.mn, s.propertyGroup = r, s
                    }(t.it[t.it.length - 1], e.it[e.it.length - 1], i.propertyGroup);
                return i.content = l, i.transform = p, Object.defineProperty(i, "_name", {
                    get: function () {
                        return t.nm
                    }
                }), i.numProperties = t.np, i.propertyIndex = t.ix, i.nm = t.nm, i.mn = t.mn, i
            }

            function o(t, e, r) {
                function i(t) {
                    return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : void 0
                }
                return Object.defineProperties(i, {
                    color: {
                        get: ExpressionPropertyInterface(e.c)
                    },
                    opacity: {
                        get: ExpressionPropertyInterface(e.o)
                    },
                    _name: {
                        value: t.nm
                    },
                    mn: {
                        value: t.mn
                    }
                }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i
            }

            function h(t, e, r) {
                function i(t) {
                    return 1 === t ? ob : r(t - 1)
                }

                function s(t) {
                    return 1 === t ? h : i(t - 1)
                }
                var a, n, o = t.d ? t.d.length : 0,
                    h = {};
                for (a = 0; a < o; a += 1) n = a, Object.defineProperty(h, t.d[n].nm, {
                    get: ExpressionPropertyInterface(e.d.dataProps[n].p)
                }), e.d.dataProps[a].p.setGroupProperty(s);

                function l(t) {
                    return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0
                }
                return Object.defineProperties(l, {
                    color: {
                        get: ExpressionPropertyInterface(e.c)
                    },
                    opacity: {
                        get: ExpressionPropertyInterface(e.o)
                    },
                    strokeWidth: {
                        get: ExpressionPropertyInterface(e.w)
                    },
                    dash: {
                        get: function () {
                            return h
                        }
                    },
                    _name: {
                        value: t.nm
                    },
                    mn: {
                        value: t.mn
                    }
                }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), e.w.setGroupProperty(i), l
            }

            function l(e, t, r) {
                function i(t) {
                    return 1 == t ? s : r(--t)
                }

                function s(t) {
                    return t === e.e.ix || "End" === t || "end" === t ? s.end : t === e.s.ix ? s.start : t === e.o.ix ? s.offset : void 0
                }
                return s.propertyIndex = e.ix, t.s.setGroupProperty(i), t.e.setGroupProperty(i), t.o.setGroupProperty(i), s.propertyIndex = e.ix, s.propertyGroup = r, Object.defineProperties(s, {
                    start: {
                        get: ExpressionPropertyInterface(t.s)
                    },
                    end: {
                        get: ExpressionPropertyInterface(t.e)
                    },
                    offset: {
                        get: ExpressionPropertyInterface(t.o)
                    },
                    _name: {
                        value: e.nm
                    }
                }), s.mn = e.mn, s
            }

            function p(e, t, r) {
                function i(t) {
                    return 1 == t ? a : r(--t)
                }
                a.propertyIndex = e.ix;
                var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;

                function a(t) {
                    return e.p.ix === t ? a.position : e.s.ix === t ? a.size : void 0
                }
                return s.s.setGroupProperty(i), s.p.setGroupProperty(i), Object.defineProperties(a, {
                    size: {
                        get: ExpressionPropertyInterface(s.s)
                    },
                    position: {
                        get: ExpressionPropertyInterface(s.p)
                    },
                    _name: {
                        value: e.nm
                    }
                }), a.mn = e.mn, a
            }

            function f(e, t, r) {
                function i(t) {
                    return 1 == t ? a : r(--t)
                }
                var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;

                function a(t) {
                    return e.p.ix === t ? a.position : e.r.ix === t ? a.rotation : e.pt.ix === t ? a.points : e.or.ix === t || "ADBE Vector Star Outer Radius" === t ? a.outerRadius : e.os.ix === t ? a.outerRoundness : !e.ir || e.ir.ix !== t && "ADBE Vector Star Inner Radius" !== t ? e.is && e.is.ix === t ? a.innerRoundness : void 0 : a.innerRadius
                }
                return a.propertyIndex = e.ix, s.or.setGroupProperty(i), s.os.setGroupProperty(i), s.pt.setGroupProperty(i), s.p.setGroupProperty(i), s.r.setGroupProperty(i), e.ir && (s.ir.setGroupProperty(i), s.is.setGroupProperty(i)), Object.defineProperties(a, {
                    position: {
                        get: ExpressionPropertyInterface(s.p)
                    },
                    rotation: {
                        get: ExpressionPropertyInterface(s.r)
                    },
                    points: {
                        get: ExpressionPropertyInterface(s.pt)
                    },
                    outerRadius: {
                        get: ExpressionPropertyInterface(s.or)
                    },
                    outerRoundness: {
                        get: ExpressionPropertyInterface(s.os)
                    },
                    innerRadius: {
                        get: ExpressionPropertyInterface(s.ir)
                    },
                    innerRoundness: {
                        get: ExpressionPropertyInterface(s.is)
                    },
                    _name: {
                        value: e.nm
                    }
                }), a.mn = e.mn, a
            }

            function c(e, t, r) {
                function i(t) {
                    return 1 == t ? a : r(--t)
                }
                var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;

                function a(t) {
                    return e.p.ix === t ? a.position : e.r.ix === t ? a.roundness : e.s.ix === t || "Size" === t || "ADBE Vector Rect Size" === t ? a.size : void 0
                }
                return a.propertyIndex = e.ix, s.p.setGroupProperty(i), s.s.setGroupProperty(i), s.r.setGroupProperty(i), Object.defineProperties(a, {
                    position: {
                        get: ExpressionPropertyInterface(s.p)
                    },
                    roundness: {
                        get: ExpressionPropertyInterface(s.r)
                    },
                    size: {
                        get: ExpressionPropertyInterface(s.s)
                    },
                    _name: {
                        value: e.nm
                    }
                }), a.mn = e.mn, a
            }

            function d(e, t, r) {
                var i = t;

                function s(t) {
                    if (e.r.ix === t || "Round Corners 1" === t) return s.radius
                }
                return s.propertyIndex = e.ix, i.rd.setGroupProperty(function (t) {
                    return 1 == t ? s : r(--t)
                }), Object.defineProperties(s, {
                    radius: {
                        get: ExpressionPropertyInterface(i.rd)
                    },
                    _name: {
                        value: e.nm
                    }
                }), s.mn = e.mn, s
            }

            function u(e, t, r) {
                function i(t) {
                    return 1 == t ? a : r(--t)
                }
                var s = t;

                function a(t) {
                    return e.c.ix === t || "Copies" === t ? a.copies : e.o.ix === t || "Offset" === t ? a.offset : void 0
                }
                return a.propertyIndex = e.ix, s.c.setGroupProperty(i), s.o.setGroupProperty(i), Object.defineProperties(a, {
                    copies: {
                        get: ExpressionPropertyInterface(s.c)
                    },
                    offset: {
                        get: ExpressionPropertyInterface(s.o)
                    },
                    _name: {
                        value: e.nm
                    }
                }), a.mn = e.mn, a
            }

            function y(t, e, r) {
                var i = e.sh;

                function s(t) {
                    if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return s.path
                }
                return i.setGroupProperty(function (t) {
                    return 1 == t ? s : r(--t)
                }), Object.defineProperties(s, {
                    path: {
                        get: function () {
                            return i.k && i.getValue(), i
                        }
                    },
                    shape: {
                        get: function () {
                            return i.k && i.getValue(), i
                        }
                    },
                    _name: {
                        value: t.nm
                    },
                    ix: {
                        value: t.ix
                    },
                    propertyIndex: {
                        value: t.ix
                    },
                    mn: {
                        value: t.mn
                    }
                }), s
            }
            return function (t, e, r) {
                var i;

                function s(t) {
                    if ("number" == typeof t) return i[t - 1];
                    for (var e = 0, r = i.length; e < r;) {
                        if (i[e]._name === t) return i[e];
                        e += 1
                    }
                }
                return s.propertyGroup = r, i = m(t, e, s), s.numProperties = i.length, s
            }
        }(),
        TextExpressionInterface = function (e) {
            var r;

            function t() {}
            return Object.defineProperty(t, "sourceText", {
                get: function () {
                    e.textProperty.getValue();
                    var t = e.textProperty.currentData.t;
                    return void 0 !== t && (e.textProperty.currentData.t = void 0, (r = new String(t)).value = t || new String(t)), r
                }
            }), t
        },
        LayerExpressionInterface = function () {
            function s(t, e) {
                var r = new Matrix;
                if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
                    var i, s = this._elem.hierarchy.length;
                    for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
                    return r.applyToPointArray(t[0], t[1], t[2] || 0)
                }
                return r.applyToPointArray(t[0], t[1], t[2] || 0)
            }

            function a(t, e) {
                var r = new Matrix;
                if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
                    var i, s = this._elem.hierarchy.length;
                    for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
                    return r.inversePoint(t)
                }
                return r.inversePoint(t)
            }

            function n(t) {
                var e = new Matrix;
                if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
                    var r, i = this._elem.hierarchy.length;
                    for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
                    return e.inversePoint(t)
                }
                return e.inversePoint(t)
            }

            function o() {
                return [1, 1, 1, 1]
            }
            return function (e) {
                var r;

                function i(t) {
                    switch (t) {
                        case "ADBE Root Vectors Group":
                        case "Contents":
                        case 2:
                            return i.shapeInterface;
                        case 1:
                        case 6:
                        case "Transform":
                        case "transform":
                        case "ADBE Transform Group":
                            return r;
                        case 4:
                        case "ADBE Effect Parade":
                        case "effects":
                        case "Effects":
                            return i.effect
                    }
                }
                i.toWorld = s, i.fromWorld = a, i.toComp = s, i.fromComp = n, i.sampleImage = o, i.sourceRectAtTime = e.sourceRectAtTime.bind(e);
                var t = getDescriptor(r = TransformExpressionInterface((i._elem = e).finalTransform.mProp), "anchorPoint");
                return Object.defineProperties(i, {
                    hasParent: {
                        get: function () {
                            return e.hierarchy.length
                        }
                    },
                    parent: {
                        get: function () {
                            return e.hierarchy[0].layerInterface
                        }
                    },
                    rotation: getDescriptor(r, "rotation"),
                    scale: getDescriptor(r, "scale"),
                    position: getDescriptor(r, "position"),
                    opacity: getDescriptor(r, "opacity"),
                    anchorPoint: t,
                    anchor_point: t,
                    transform: {
                        get: function () {
                            return r
                        }
                    },
                    active: {
                        get: function () {
                            return e.isInRange
                        }
                    }
                }), i.startTime = e.data.st, i.index = e.data.ind, i.source = e.data.refId, i.height = 0 === e.data.ty ? e.data.h : 100, i.width = 0 === e.data.ty ? e.data.w : 100, i.inPoint = e.data.ip / e.comp.globalData.frameRate, i.outPoint = e.data.op / e.comp.globalData.frameRate, i._name = e.data.nm, i.registerMaskInterface = function (t) {
                    i.mask = new MaskManagerInterface(t, e)
                }, i.registerEffectsInterface = function (t) {
                    i.effect = t
                }, i
            }
        }(),
        CompExpressionInterface = function (i) {
            function t(t) {
                for (var e = 0, r = i.layers.length; e < r;) {
                    if (i.layers[e].nm === t || i.layers[e].ind === t) return i.elements[e].layerInterface;
                    e += 1
                }
                return null
            }
            return Object.defineProperty(t, "_name", {
                value: i.data.nm
            }), (t.layer = t).pixelAspect = 1, t.height = i.data.h || i.globalData.compSize.h, t.width = i.data.w || i.globalData.compSize.w, t.pixelAspect = 1, t.frameDuration = 1 / i.globalData.frameRate, t.displayStartTime = 0, t.numLayers = i.layers.length, t
        },
        TransformExpressionInterface = function (t) {
            function e(t) {
                switch (t) {
                    case "scale":
                    case "Scale":
                    case "ADBE Scale":
                    case 6:
                        return e.scale;
                    case "rotation":
                    case "Rotation":
                    case "ADBE Rotation":
                    case "ADBE Rotate Z":
                    case 10:
                        return e.rotation;
                    case "ADBE Rotate X":
                        return e.xRotation;
                    case "ADBE Rotate Y":
                        return e.yRotation;
                    case "position":
                    case "Position":
                    case "ADBE Position":
                    case 2:
                        return e.position;
                    case "ADBE Position_0":
                        return e.xPosition;
                    case "ADBE Position_1":
                        return e.yPosition;
                    case "ADBE Position_2":
                        return e.zPosition;
                    case "anchorPoint":
                    case "AnchorPoint":
                    case "Anchor Point":
                    case "ADBE AnchorPoint":
                    case 1:
                        return e.anchorPoint;
                    case "opacity":
                    case "Opacity":
                    case 11:
                        return e.opacity
                }
            }
            if (Object.defineProperty(e, "rotation", {
                    get: ExpressionPropertyInterface(t.r || t.rz)
                }), Object.defineProperty(e, "zRotation", {
                    get: ExpressionPropertyInterface(t.rz || t.r)
                }), Object.defineProperty(e, "xRotation", {
                    get: ExpressionPropertyInterface(t.rx)
                }), Object.defineProperty(e, "yRotation", {
                    get: ExpressionPropertyInterface(t.ry)
                }), Object.defineProperty(e, "scale", {
                    get: ExpressionPropertyInterface(t.s)
                }), t.p) var r = ExpressionPropertyInterface(t.p);
            return Object.defineProperty(e, "position", {
                get: function () {
                    return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0]
                }
            }), Object.defineProperty(e, "xPosition", {
                get: ExpressionPropertyInterface(t.px)
            }), Object.defineProperty(e, "yPosition", {
                get: ExpressionPropertyInterface(t.py)
            }), Object.defineProperty(e, "zPosition", {
                get: ExpressionPropertyInterface(t.pz)
            }), Object.defineProperty(e, "anchorPoint", {
                get: ExpressionPropertyInterface(t.a)
            }), Object.defineProperty(e, "opacity", {
                get: ExpressionPropertyInterface(t.o)
            }), Object.defineProperty(e, "skew", {
                get: ExpressionPropertyInterface(t.sk)
            }), Object.defineProperty(e, "skewAxis", {
                get: ExpressionPropertyInterface(t.sa)
            }), Object.defineProperty(e, "orientation", {
                get: ExpressionPropertyInterface(t.or)
            }), e
        },
        ProjectInterface = function () {
            function e(t) {
                this.compositions.push(t)
            }
            return function () {
                function t(t) {
                    for (var e = 0, r = this.compositions.length; e < r;) {
                        if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
                        e += 1
                    }
                }
                return t.compositions = [], t.currentFrame = 0, t.registerComposition = e, t
            }
        }(),
        EffectsExpressionInterface = function () {
            function l(s, t, e, r) {
                var i, a = [],
                    n = s.ef.length;
                for (i = 0; i < n; i += 1) 5 === s.ef[i].ty ? a.push(l(s.ef[i], t.effectElements[i], t.effectElements[i].propertyGroup, r)) : a.push(p(t.effectElements[i], s.ef[i].ty, r, o));

                function o(t) {
                    return 1 === t ? h : e(t - 1)
                }
                var h = function (t) {
                    for (var e = s.ef, r = 0, i = e.length; r < i;) {
                        if (t === e[r].nm || t === e[r].mn || t === e[r].ix) return 5 === e[r].ty ? a[r] : a[r]();
                        r += 1
                    }
                    return a[0]()
                };
                return h.propertyGroup = o, "ADBE Color Control" === s.mn && Object.defineProperty(h, "color", {
                    get: function () {
                        return a[0]()
                    }
                }), Object.defineProperty(h, "numProperties", {
                    get: function () {
                        return s.np
                    }
                }), h.active = h.enabled = 0 !== s.en, h
            }

            function p(t, e, r, i) {
                var s = ExpressionPropertyInterface(t.p);
                return t.p.setGroupProperty && t.p.setGroupProperty(i),
                    function () {
                        return 10 === e ? r.comp.compInterface(t.p.v) : s()
                    }
            }
            return {
                createEffectsInterface: function (s, t) {
                    if (s.effectsManager) {
                        var e, a = [],
                            r = s.data.ef,
                            i = s.effectsManager.effectElements.length;
                        for (e = 0; e < i; e += 1) a.push(l(r[e], s.effectsManager.effectElements[e], t, s));
                        return function (t) {
                            for (var e = s.data.ef || [], r = 0, i = e.length; r < i;) {
                                if (t === e[r].nm || t === e[r].mn || t === e[r].ix) return a[r];
                                r += 1
                            }
                        }
                    }
                }
            }
        }(),
        MaskManagerInterface = function () {
            function a(t, e) {
                this._mask = t, this._data = e
            }
            Object.defineProperty(a.prototype, "maskPath", {
                get: function () {
                    return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
                }
            }), Object.defineProperty(a.prototype, "maskOpacity", {
                get: function () {
                    return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v
                }
            });
            return function (e, t) {
                var r, i = createSizedArray(e.viewData.length),
                    s = e.viewData.length;
                for (r = 0; r < s; r += 1) i[r] = new a(e.viewData[r], e.masksProperties[r]);
                return function (t) {
                    for (r = 0; r < s;) {
                        if (e.masksProperties[r].nm === t) return i[r];
                        r += 1
                    }
                }
            }
        }(),
        ExpressionPropertyInterface = function () {
            var s = {
                    pv: 0,
                    v: 0,
                    mult: 1
                },
                n = {
                    pv: [0, 0, 0],
                    v: [0, 0, 0],
                    mult: 1
                };

            function o(i, s, a) {
                Object.defineProperty(i, "velocity", {
                    get: function () {
                        return s.getVelocityAtTime(s.comp.currentFrame)
                    }
                }), i.numKeys = s.keyframes ? s.keyframes.length : 0, i.key = function (t) {
                    if (i.numKeys) {
                        var e = "";
                        e = "s" in s.keyframes[t - 1] ? s.keyframes[t - 1].s : "e" in s.keyframes[t - 2] ? s.keyframes[t - 2].e : s.keyframes[t - 2].s;
                        var r = "unidimensional" === a ? new Number(e) : Object.assign({}, e);
                        return r.time = s.keyframes[t - 1].t / s.elem.comp.globalData.frameRate, r
                    }
                    return 0
                }, i.valueAtTime = s.getValueAtTime, i.speedAtTime = s.getSpeedAtTime, i.velocityAtTime = s.getVelocityAtTime, i.propertyGroup = s.propertyGroup
            }

            function e() {
                return s
            }
            return function (t) {
                return t ? "unidimensional" === t.propType ? function (t) {
                    t && "pv" in t || (t = s);
                    var e = 1 / t.mult,
                        r = t.pv * e,
                        i = new Number(r);
                    return i.value = r, o(i, t, "unidimensional"),
                        function () {
                            return t.k && t.getValue(), r = t.v * e, i.value !== r && ((i = new Number(r)).value = r, o(i, t, "unidimensional")), i
                        }
                }(t) : function (e) {
                    e && "pv" in e || (e = n);
                    var r = 1 / e.mult,
                        i = e.pv.length,
                        s = createTypedArray("float32", i),
                        a = createTypedArray("float32", i);
                    return s.value = a, o(s, e, "multidimensional"),
                        function () {
                            e.k && e.getValue();
                            for (var t = 0; t < i; t += 1) s[t] = a[t] = e.v[t] * r;
                            return s
                        }
                }(t) : e
            }
        }(),
        h5, i5;

    function SliderEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
    }

    function AngleEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
    }

    function ColorEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
    }

    function PointEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
    }

    function LayerIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
    }

    function MaskIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
    }

    function CheckboxEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
    }

    function NoValueEffect() {
        this.p = {}
    }

    function EffectsManager() {}

    function EffectsManager(t, e) {
        var r = t.ef || [];
        this.effectElements = [];
        var i, s, a = r.length;
        for (i = 0; i < a; i++) s = new GroupEffect(r[i], e), this.effectElements.push(s)
    }

    function GroupEffect(t, e) {
        this.init(t, e)
    }
    h5 = function () {
        function r(t, e) {
            return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v
        }
        return function (t, e) {
            this.pv = 1, this.comp = t.comp, this.elem = t, this.mult = .01, this.propType = "textSelector", this.textTotal = e.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(t, e, this), this.getMult = r, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty
        }
    }(), i5 = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function (t, e, r) {
        return 1 === e.t ? new h5(t, e, r) : i5(t, e, r)
    }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
        this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
        var r, i, s = this.data.ef.length,
            a = this.data.ef;
        for (r = 0; r < s; r += 1) {
            switch (i = null, a[r].ty) {
                case 0:
                    i = new SliderEffect(a[r], e, this);
                    break;
                case 1:
                    i = new AngleEffect(a[r], e, this);
                    break;
                case 2:
                    i = new ColorEffect(a[r], e, this);
                    break;
                case 3:
                    i = new PointEffect(a[r], e, this);
                    break;
                case 4:
                case 7:
                    i = new CheckboxEffect(a[r], e, this);
                    break;
                case 10:
                    i = new LayerIndexEffect(a[r], e, this);
                    break;
                case 11:
                    i = new MaskIndexEffect(a[r], e, this);
                    break;
                case 5:
                    i = new EffectsManager(a[r], e, this);
                    break;
                default:
                    i = new NoValueEffect(a[r], e, this)
            }
            i && this.effectElements.push(i)
        }
    };
    var lottiejs = {},
        _isFrozen = !1;

    function setLocationHref(t) {
        locationHref = t
    }

    function searchAnimations() {
        !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
    }

    function setSubframeRendering(t) {
        subframeEnabled = t
    }

    function loadAnimation(t) {
        return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
    }

    function setQuality(t) {
        if ("string" == typeof t) switch (t) {
            case "high":
                defaultCurveSegments = 200;
                break;
            case "medium":
                defaultCurveSegments = 50;
                break;
            case "low":
                defaultCurveSegments = 10
        } else !isNaN(t) && 1 < t && (defaultCurveSegments = t);
        roundValues(!(50 <= defaultCurveSegments))
    }

    function inBrowser() {
        return "undefined" != typeof navigator
    }

    function installPlugin(t, e) {
        "expressions" === t && (expressionsPlugin = e)
    }

    function getFactory(t) {
        switch (t) {
            case "propertyFactory":
                return PropertyFactory;
            case "shapePropertyFactory":
                return ShapePropertyFactory;
            case "matrix":
                return Matrix
        }
    }

    function checkReady() {
        "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
    }

    function getQueryVariable(t) {
        for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
            var i = e[r].split("=");
            if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
        }
    }
    lottiejs.play = animationManager.play, lottiejs.pause = animationManager.pause, lottiejs.setLocationHref = setLocationHref, lottiejs.togglePause = animationManager.togglePause, lottiejs.setSpeed = animationManager.setSpeed, lottiejs.setDirection = animationManager.setDirection, lottiejs.stop = animationManager.stop, lottiejs.searchAnimations = searchAnimations, lottiejs.registerAnimation = animationManager.registerAnimation, lottiejs.loadAnimation = loadAnimation, lottiejs.setSubframeRendering = setSubframeRendering, lottiejs.resize = animationManager.resize, lottiejs.goToAndStop = animationManager.goToAndStop, lottiejs.destroy = animationManager.destroy, lottiejs.setQuality = setQuality, lottiejs.inBrowser = inBrowser, lottiejs.installPlugin = installPlugin, lottiejs.freeze = animationManager.freeze, lottiejs.unfreeze = animationManager.unfreeze, lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottiejs.__getFactory = getFactory, lottiejs.version = "5.5.8";
    var standalone = "__[STANDALONE]__",
        animationData = "__[ANIMATIONDATA]__",
        renderer = "";
    if (standalone) {
        var scripts = document.getElementsByTagName("script"),
            index = scripts.length - 1,
            myScript = scripts[index] || {
                src: ""
            },
            queryString = myScript.src.replace(/^[^\?]+\??/, "");
        renderer = getQueryVariable("renderer")
    }
    var readyStateCheckInterval = setInterval(checkReady, 100);
    return lottiejs
}, "function" == typeof define && define.amd ? define(function () {
    return b(a)
}) : "object" == typeof module && module.exports ? module.exports = b(a) : (a.lottie = b(a), a.bodymovin = a.lottie));




var homeGraph = {"v":"5.7.1","fr":29.9700012207031,"ip":0,"op":900.000036657751,"w":720,"h":525,"nm":"NPS-graph","ddd":0,"assets":[],"fonts":{"list":[{"fName":"Biotif-Medium","fFamily":"Biotif","fStyle":"Medium","ascent":72.4990844726562}]},"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[360,262.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-0.544,1.184],[-0.288,1.344],[0.016,1.36],[0.32,1.36],[0.544,1.152],[0.72,0.784],[0,0],[-0.608,-1.2],[-0.304,-1.344],[0,-1.328],[0.336,-1.36],[0.608,-1.152],[0.848,-0.848]],"o":[[0.768,-0.864],[0.56,-1.184],[0.304,-1.36],[-0.016,-1.456],[-0.304,-1.36],[-0.544,-1.168],[0,0],[0.896,0.896],[0.608,1.184],[0.32,1.328],[0,1.44],[-0.336,1.344],[-0.608,1.152],[0,0]],"v":[[141.766,155.737],[143.734,152.665],[145.006,148.873],[145.438,144.793],[144.934,140.569],[143.662,136.801],[141.766,133.873],[143.422,133.873],[145.678,137.017],[147.046,140.809],[147.526,144.793],[147.022,148.993],[145.606,152.737],[143.422,155.737]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,1.04],[-0.48,0.736],[-0.848,0.416],[-1.072,0],[-0.816,-0.384],[-0.528,-0.656],[-0.144,-0.832],[0,0],[0.688,0.544],[0.992,0],[0.512,-0.24],[0.288,-0.448],[0,-0.608],[-0.448,-0.48],[-0.736,-0.208],[0,0],[-0.608,-0.8],[0,-1.088],[0.512,-0.768],[0.896,-0.416],[1.136,0],[0.848,0.368],[0.544,0.672],[0.16,0.88],[0,0],[-0.72,-0.544],[-1.04,0],[-0.544,0.256],[-0.304,0.464],[0,0.64],[0.416,0.464],[0.752,0.192],[0,0],[0.656,0.8]],"o":[[0,-0.96],[0.496,-0.752],[0.864,-0.432],[1.024,0],[0.816,0.368],[0.528,0.656],[0,0],[-0.144,-1.024],[-0.688,-0.56],[-0.64,0],[-0.512,0.24],[-0.272,0.448],[0,0.656],[0.448,0.48],[0,0],[1.36,0.368],[0.608,0.784],[0,1.04],[-0.496,0.768],[-0.896,0.416],[-1.088,0],[-0.848,-0.368],[-0.544,-0.672],[0,0],[0.176,1.088],[0.72,0.528],[0.704,0],[0.544,-0.256],[0.304,-0.464],[0,-0.752],[-0.416,-0.464],[0,0],[-1.344,-0.368],[-0.656,-0.816]],"v":[[128.712,138.505],[129.432,135.961],[131.448,134.209],[134.352,133.561],[137.112,134.137],[139.128,135.673],[140.136,137.905],[138.072,138.601],[136.824,136.249],[134.304,135.409],[132.576,135.769],[131.376,136.801],[130.968,138.385],[131.64,140.089],[133.416,141.121],[136.2,141.889],[139.152,143.641],[140.064,146.449],[139.296,149.161],[137.208,150.937],[134.16,151.561],[131.256,151.009],[129.168,149.449],[128.112,147.121],[130.152,146.473],[131.496,148.921],[134.136,149.713],[136.008,149.329],[137.28,148.249],[137.736,146.593],[137.112,144.769],[135.36,143.785],[132.696,143.041],[129.696,141.289]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-0.592,0.608],[0,0.992],[0.656,0.512],[1.056,0],[0,0]],"o":[[0,0],[1.248,0],[0.608,-0.624],[0,-1.104],[-0.656,-0.512],[0,0],[0,0]],"v":[[116.046,142.321],[120.126,142.321],[122.886,141.409],[123.798,138.985],[122.814,136.561],[120.246,135.793],[116.046,135.793]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[-0.944,-0.912],[0,-1.552],[0.464,-0.768],[0.832,-0.432],[1.104,0],[0,0],[0,0],[0,0],[0,0]],"o":[[1.776,0],[0.944,0.912],[0,1.056],[-0.448,0.768],[-0.816,0.416],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[120.63,133.873],[124.71,135.241],[126.126,138.937],[125.43,141.673],[123.51,143.473],[120.63,144.097],[116.046,144.097],[116.046,151.273],[113.91,151.273],[113.91,133.873]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[98.59,151.273],[96.454,151.273],[96.454,133.873],[99.094,133.873],[108.31,148.201],[108.31,133.873],[110.446,133.873],[110.446,151.273],[107.806,151.273],[98.59,137.041]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[-0.784,-0.864],[0,0],[0.624,1.152],[0.336,1.344],[0,1.44],[-0.304,1.328],[-0.608,1.184],[-0.88,0.896],[0,0],[0.544,-1.168],[0.304,-1.36],[0.032,-1.456],[-0.288,-1.36],[-0.544,-1.184]],"o":[[0,0],[-0.832,-0.848],[-0.608,-1.152],[-0.336,-1.36],[0,-1.328],[0.32,-1.344],[0.624,-1.2],[0,0],[-0.736,0.784],[-0.544,1.152],[-0.304,1.36],[0,1.36],[0.288,1.344],[0.56,1.184]],"v":[[94.068,155.737],[92.388,155.737],[90.204,152.737],[88.788,148.993],[88.284,144.793],[88.74,140.809],[90.132,137.017],[92.388,133.873],[94.068,133.873],[92.148,136.801],[90.876,140.569],[90.372,144.793],[90.804,148.873],[92.052,152.665]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0.112,-1.072],[0,0],[0.688,0.624],[1.088,0],[0.688,-0.624]],"o":[[0,0],[-0.048,-1.056],[-0.672,-0.624],[-1.008,0],[-0.672,0.608]],"v":[[72.023,144.529],[79.487,144.529],[78.383,142.009],[75.743,141.073],[73.199,142.009]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,1.232],[-0.48,0.928],[-0.88,0.528],[-1.184,0],[-0.848,-0.48],[-0.48,-0.848],[0,-1.12],[0.016,-0.176],[0.032,-0.128],[0,0],[-0.688,-0.656],[-1.184,0],[-0.656,0.4],[-0.256,0.64],[0,0],[0.96,-0.576],[1.216,0],[0.896,0.496],[0.512,0.912]],"o":[[0,-1.2],[0.496,-0.944],[0.896,-0.528],[1.136,0],[0.864,0.464],[0.48,0.832],[0,0.192],[-0.016,0.176],[0,0],[0.064,1.296],[0.688,0.656],[0.784,0],[0.656,-0.4],[0,0],[-0.368,0.976],[-0.96,0.56],[-1.184,0],[-0.896,-0.512],[-0.496,-0.912]],"v":[[69.911,145.489],[70.631,142.297],[72.695,140.089],[75.815,139.297],[78.791,140.017],[80.807,141.985],[81.527,144.913],[81.503,145.465],[81.431,145.921],[71.999,145.921],[73.127,148.849],[75.935,149.833],[78.095,149.233],[79.463,147.673],[81.143,148.417],[79.151,150.745],[75.887,151.585],[72.767,150.841],[70.655,148.705]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[-0.32,0.288],[-0.416,0.16],[-0.432,0],[-0.16,-0.032],[-0.112,-0.064],[0,0],[0.192,0.016],[0.208,0],[0.56,-0.608],[0,-0.992]],"o":[[0,0],[0,0],[0,0],[0,0],[0.192,-0.464],[0.336,-0.304],[0.432,-0.16],[0.272,0],[0.176,0.032],[0,0],[-0.128,-0.08],[-0.192,-0.032],[-0.96,0],[-0.56,0.608],[0,0]],"v":[[64.845,151.273],[62.781,151.273],[62.781,139.609],[64.677,139.609],[64.773,141.385],[65.541,140.257],[66.669,139.561],[67.965,139.321],[68.613,139.369],[69.045,139.513],[69.045,141.505],[68.565,141.361],[67.965,141.313],[65.685,142.225],[64.845,144.625]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,-0.816],[-0.32,-0.656],[-0.608,-0.384],[-0.816,0],[-0.608,0.368],[-0.32,0.64],[0,0.816],[0.32,0.64],[0.608,0.368],[0.832,0],[0.608,-0.384],[0.336,-0.656]],"o":[[0,0.816],[0.336,0.64],[0.608,0.368],[0.832,0],[0.608,-0.384],[0.32,-0.656],[0,-0.816],[-0.32,-0.656],[-0.608,-0.384],[-0.816,0],[-0.608,0.368],[-0.32,0.64]],"v":[[50.75,145.441],[51.23,147.649],[52.646,149.185],[54.782,149.737],[56.942,149.185],[58.334,147.649],[58.814,145.441],[58.334,143.257],[56.942,141.721],[54.782,141.145],[52.646,141.721],[51.23,143.257]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,1.168],[-0.512,0.928],[-0.912,0.528],[-1.232,0],[-0.912,-0.544],[-0.512,-0.944],[0,-1.152],[0.512,-0.928],[0.928,-0.544],[1.248,0],[0.928,0.544],[0.512,0.912]],"o":[[0,-1.152],[0.512,-0.944],[0.928,-0.544],[1.248,0],[0.928,0.528],[0.512,0.928],[0,1.168],[-0.512,0.912],[-0.912,0.544],[-1.232,0],[-0.912,-0.544],[-0.512,-0.928]],"v":[[48.638,145.441],[49.406,142.321],[51.542,140.113],[54.782,139.297],[58.022,140.113],[60.182,142.321],[60.95,145.441],[60.182,148.585],[58.022,150.769],[54.782,151.585],[51.542,150.769],[49.406,148.585]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,1.2],[-0.496,0.928],[-0.896,0.512],[-1.168,0],[-0.72,-0.288],[-0.528,-0.512],[-0.192,-0.704],[0,0],[0.64,0.416],[0.816,0],[0.576,-0.368],[0.32,-0.64],[0,-0.864],[-0.304,-0.64],[-0.56,-0.368],[-0.768,0],[-0.624,0.448],[-0.24,0.736],[0,0],[0.56,-0.544],[0.752,-0.288],[0.864,0],[0.896,0.496],[0.496,0.928]],"o":[[0,-1.232],[0.496,-0.928],[0.896,-0.528],[0.88,0],[0.736,0.288],[0.528,0.512],[0,0],[-0.224,-0.72],[-0.624,-0.432],[-0.768,0],[-0.576,0.352],[-0.32,0.64],[0,0.848],[0.32,0.64],[0.576,0.352],[0.896,0],[0.64,-0.448],[0,0],[-0.24,0.736],[-0.544,0.544],[-0.752,0.288],[-1.136,0],[-0.88,-0.512],[-0.496,-0.928]],"v":[[36.292,145.489],[37.036,142.249],[39.124,140.089],[42.22,139.297],[44.62,139.729],[46.516,140.929],[47.596,142.753],[45.724,143.497],[44.428,141.793],[42.268,141.145],[40.252,141.697],[38.908,143.185],[38.428,145.441],[38.884,147.673],[40.204,149.185],[42.22,149.713],[44.5,149.041],[45.82,147.265],[47.716,147.985],[46.516,149.905],[44.572,151.153],[42.148,151.585],[39.1,150.841],[37.036,148.681]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,1.04],[-0.48,0.736],[-0.848,0.416],[-1.072,0],[-0.816,-0.384],[-0.528,-0.656],[-0.144,-0.832],[0,0],[0.688,0.544],[0.992,0],[0.512,-0.24],[0.288,-0.448],[0,-0.608],[-0.448,-0.48],[-0.736,-0.208],[0,0],[-0.608,-0.8],[0,-1.088],[0.512,-0.768],[0.896,-0.416],[1.136,0],[0.848,0.368],[0.544,0.672],[0.16,0.88],[0,0],[-0.72,-0.544],[-1.04,0],[-0.544,0.256],[-0.304,0.464],[0,0.64],[0.416,0.464],[0.752,0.192],[0,0],[0.656,0.8]],"o":[[0,-0.96],[0.496,-0.752],[0.864,-0.432],[1.024,0],[0.816,0.368],[0.528,0.656],[0,0],[-0.144,-1.024],[-0.688,-0.56],[-0.64,0],[-0.512,0.24],[-0.272,0.448],[0,0.656],[0.448,0.48],[0,0],[1.36,0.368],[0.608,0.784],[0,1.04],[-0.496,0.768],[-0.896,0.416],[-1.088,0],[-0.848,-0.368],[-0.544,-0.672],[0,0],[0.176,1.088],[0.72,0.528],[0.704,0],[0.544,-0.256],[0.304,-0.464],[0,-0.752],[-0.416,-0.464],[0,0],[-1.344,-0.368],[-0.656,-0.816]],"v":[[23.379,138.505],[24.099,135.961],[26.115,134.209],[29.019,133.561],[31.779,134.137],[33.795,135.673],[34.803,137.905],[32.739,138.601],[31.491,136.249],[28.971,135.409],[27.243,135.769],[26.043,136.801],[25.635,138.385],[26.307,140.089],[28.083,141.121],[30.867,141.889],[33.819,143.641],[34.731,146.449],[33.963,149.161],[31.875,150.937],[28.827,151.561],[25.923,151.009],[23.835,149.449],[22.779,147.121],[24.819,146.473],[26.163,148.921],[28.803,149.713],[30.675,149.329],[31.947,148.249],[32.403,146.593],[31.779,144.769],[30.027,143.785],[27.363,143.041],[24.363,141.289]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[-0.32,0.288],[-0.416,0.16],[-0.432,0],[-0.16,-0.032],[-0.112,-0.064],[0,0],[0.192,0.016],[0.208,0],[0.56,-0.608],[0,-0.992]],"o":[[0,0],[0,0],[0,0],[0,0],[0.192,-0.464],[0.336,-0.304],[0.432,-0.16],[0.272,0],[0.176,0.032],[0,0],[-0.128,-0.08],[-0.192,-0.032],[-0.96,0],[-0.56,0.608],[0,0]],"v":[[12.189,151.377],[10.125,151.377],[10.125,139.713],[12.021,139.713],[12.117,141.489],[12.885,140.361],[14.013,139.665],[15.309,139.425],[15.957,139.473],[16.389,139.617],[16.389,141.609],[15.909,141.465],[15.309,141.417],[13.029,142.329],[12.189,144.729]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0.112,-1.072],[0,0],[0.688,0.624],[1.088,0],[0.688,-0.624]],"o":[[0,0],[-0.048,-1.056],[-0.672,-0.624],[-1.008,0],[-0.672,0.608]],"v":[[-1.156,144.633],[6.308,144.633],[5.204,142.113],[2.564,141.177],[0.02,142.113]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,1.232],[-0.48,0.928],[-0.88,0.528],[-1.184,0],[-0.848,-0.48],[-0.48,-0.848],[0,-1.12],[0.016,-0.176],[0.032,-0.128],[0,0],[-0.688,-0.656],[-1.184,0],[-0.656,0.4],[-0.256,0.64],[0,0],[0.96,-0.576],[1.216,0],[0.896,0.496],[0.512,0.912]],"o":[[0,-1.2],[0.496,-0.944],[0.896,-0.528],[1.136,0],[0.864,0.464],[0.48,0.832],[0,0.192],[-0.016,0.176],[0,0],[0.064,1.296],[0.688,0.656],[0.784,0],[0.656,-0.4],[0,0],[-0.368,0.976],[-0.96,0.56],[-1.184,0],[-0.896,-0.512],[-0.496,-0.912]],"v":[[-3.268,145.593],[-2.548,142.401],[-0.484,140.193],[2.636,139.401],[5.612,140.121],[7.628,142.089],[8.348,145.017],[8.324,145.569],[8.252,146.025],[-1.18,146.025],[-0.052,148.953],[2.756,149.937],[4.916,149.337],[6.284,147.777],[7.964,148.521],[5.972,150.849],[2.708,151.689],[-0.412,150.945],[-2.524,148.809]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-9.332,151.377],[-9.332,141.489],[-12.62,141.489],[-12.62,139.713],[-9.332,139.713],[-9.332,136.137],[-7.268,136.137],[-7.268,139.713],[-4.124,139.713],[-4.124,141.489],[-7.268,141.489],[-7.268,151.377]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,-0.816],[-0.32,-0.656],[-0.608,-0.384],[-0.816,0],[-0.608,0.368],[-0.32,0.64],[0,0.816],[0.32,0.64],[0.608,0.368],[0.832,0],[0.608,-0.384],[0.336,-0.656]],"o":[[0,0.816],[0.336,0.64],[0.608,0.368],[0.832,0],[0.608,-0.384],[0.32,-0.656],[0,-0.816],[-0.32,-0.656],[-0.608,-0.384],[-0.816,0],[-0.608,0.368],[-0.32,0.64]],"v":[[-23.74,145.545],[-23.26,147.753],[-21.844,149.289],[-19.708,149.841],[-17.548,149.289],[-16.156,147.753],[-15.676,145.545],[-16.156,143.361],[-17.548,141.825],[-19.708,141.249],[-21.844,141.825],[-23.26,143.361]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,1.168],[-0.512,0.928],[-0.912,0.528],[-1.232,0],[-0.912,-0.544],[-0.512,-0.944],[0,-1.152],[0.512,-0.928],[0.928,-0.544],[1.248,0],[0.928,0.544],[0.512,0.912]],"o":[[0,-1.152],[0.512,-0.944],[0.928,-0.544],[1.248,0],[0.928,0.528],[0.512,0.928],[0,1.168],[-0.512,0.912],[-0.912,0.544],[-1.232,0],[-0.912,-0.544],[-0.512,-0.928]],"v":[[-25.852,145.545],[-25.084,142.425],[-22.948,140.217],[-19.708,139.401],[-16.468,140.217],[-14.308,142.425],[-13.54,145.545],[-14.308,148.689],[-16.468,150.873],[-19.708,151.689],[-22.948,150.873],[-25.084,148.689]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[-0.688,0.4],[-0.848,0],[-0.656,-0.448],[-0.272,-0.896],[-0.72,0.448],[-0.928,0],[-0.736,-0.8],[0,-1.6],[0,0],[0,0],[0,0],[0.416,0.576],[0.928,0],[0.608,-0.688],[0,-1.28],[0,0],[0,0],[0,0],[0.416,0.56],[0.928,0],[0.608,-0.688],[0,-1.28],[0,0]],"o":[[0,0],[0,0],[0,0],[0.304,-0.704],[0.704,-0.4],[0.992,0],[0.672,0.448],[0.336,-0.88],[0.736,-0.464],[1.328,0],[0.736,0.8],[0,0],[0,0],[0,0],[0,-1.104],[-0.4,-0.576],[-0.96,0],[-0.608,0.672],[0,0],[0,0],[0,0],[0,-1.12],[-0.416,-0.576],[-0.96,0],[-0.592,0.672],[0,0],[0,0]],"v":[[-45.45,151.377],[-45.45,139.713],[-43.602,139.713],[-43.434,141.657],[-41.946,140.001],[-39.618,139.401],[-37.146,140.073],[-35.73,142.089],[-34.146,140.097],[-31.65,139.401],[-28.554,140.601],[-27.45,144.201],[-27.45,151.377],[-29.538,151.377],[-29.538,144.657],[-30.162,142.137],[-32.154,141.273],[-34.506,142.305],[-35.418,145.233],[-35.418,151.377],[-37.482,151.377],[-37.482,144.657],[-38.106,142.137],[-40.122,141.273],[-42.474,142.305],[-43.362,145.233],[-43.362,151.377]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,-0.816],[-0.32,-0.656],[-0.608,-0.384],[-0.816,0],[-0.608,0.368],[-0.32,0.64],[0,0.816],[0.32,0.64],[0.608,0.368],[0.832,0],[0.608,-0.384],[0.336,-0.656]],"o":[[0,0.816],[0.336,0.64],[0.608,0.368],[0.832,0],[0.608,-0.384],[0.32,-0.656],[0,-0.816],[-0.32,-0.656],[-0.608,-0.384],[-0.816,0],[-0.608,0.368],[-0.32,0.64]],"v":[[-57.481,145.545],[-57.001,147.753],[-55.585,149.289],[-53.449,149.841],[-51.289,149.289],[-49.897,147.753],[-49.417,145.545],[-49.897,143.361],[-51.289,141.825],[-53.449,141.249],[-55.585,141.825],[-57.001,143.361]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,1.168],[-0.512,0.928],[-0.912,0.528],[-1.232,0],[-0.912,-0.544],[-0.512,-0.944],[0,-1.152],[0.512,-0.928],[0.928,-0.544],[1.248,0],[0.928,0.544],[0.512,0.912]],"o":[[0,-1.152],[0.512,-0.944],[0.928,-0.544],[1.248,0],[0.928,0.528],[0.512,0.928],[0,1.168],[-0.512,0.912],[-0.912,0.544],[-1.232,0],[-0.912,-0.544],[-0.512,-0.928]],"v":[[-59.593,145.545],[-58.825,142.425],[-56.689,140.217],[-53.449,139.401],[-50.209,140.217],[-48.049,142.425],[-47.281,145.545],[-48.049,148.689],[-50.209,150.873],[-53.449,151.689],[-56.689,150.873],[-58.825,148.689]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[-0.32,0.288],[-0.416,0.16],[-0.432,0],[-0.16,-0.032],[-0.112,-0.064],[0,0],[0.192,0.016],[0.208,0],[0.56,-0.608],[0,-0.992]],"o":[[0,0],[0,0],[0,0],[0,0],[0.192,-0.464],[0.336,-0.304],[0.432,-0.16],[0.272,0],[0.176,0.032],[0,0],[-0.128,-0.08],[-0.192,-0.032],[-0.96,0],[-0.56,0.608],[0,0]],"v":[[-64.635,151.377],[-66.699,151.377],[-66.699,139.713],[-64.803,139.713],[-64.707,141.489],[-63.939,140.361],[-62.811,139.665],[-61.515,139.425],[-60.867,139.473],[-60.435,139.617],[-60.435,141.609],[-60.915,141.465],[-61.515,141.417],[-63.795,142.329],[-64.635,144.729]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-0.592,0.608],[0,0.992],[0.656,0.512],[1.056,0],[0,0]],"o":[[0,0],[1.248,0],[0.608,-0.624],[0,-1.104],[-0.656,-0.512],[0,0],[0,0]],"v":[[-78.913,142.425],[-74.833,142.425],[-72.073,141.513],[-71.161,139.089],[-72.145,136.665],[-74.713,135.897],[-78.913,135.897]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[0,0],[-0.944,-0.912],[0,-1.552],[0.464,-0.768],[0.832,-0.432],[1.104,0],[0,0],[0,0],[0,0],[0,0]],"o":[[1.776,0],[0.944,0.912],[0,1.056],[-0.448,0.768],[-0.816,0.416],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-74.329,133.977],[-70.249,135.345],[-68.833,139.041],[-69.529,141.777],[-71.449,143.577],[-74.329,144.201],[-78.913,144.201],[-78.913,151.377],[-81.049,151.377],[-81.049,133.977]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-93.603,151.377],[-93.603,141.489],[-96.891,141.489],[-96.891,139.713],[-93.603,139.713],[-93.603,136.137],[-91.539,136.137],[-91.539,139.713],[-88.395,139.713],[-88.395,141.489],[-91.539,141.489],[-91.539,151.377]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ind":26,"ty":"sh","ix":27,"ks":{"a":0,"k":{"i":[[0.112,-1.072],[0,0],[0.688,0.624],[1.088,0],[0.688,-0.624]],"o":[[0,0],[-0.048,-1.056],[-0.672,-0.624],[-1.008,0],[-0.672,0.608]],"v":[[-107.356,144.633],[-99.892,144.633],[-100.996,142.113],[-103.636,141.177],[-106.18,142.113]],"c":true},"ix":2},"nm":"Path 27","mn":"ADBE Vector Shape - Group","hd":false},{"ind":27,"ty":"sh","ix":28,"ks":{"a":0,"k":{"i":[[0,1.232],[-0.48,0.928],[-0.88,0.528],[-1.184,0],[-0.848,-0.48],[-0.48,-0.848],[0,-1.12],[0.016,-0.176],[0.032,-0.128],[0,0],[-0.688,-0.656],[-1.184,0],[-0.656,0.4],[-0.256,0.64],[0,0],[0.96,-0.576],[1.216,0],[0.896,0.496],[0.512,0.912]],"o":[[0,-1.2],[0.496,-0.944],[0.896,-0.528],[1.136,0],[0.864,0.464],[0.48,0.832],[0,0.192],[-0.016,0.176],[0,0],[0.064,1.296],[0.688,0.656],[0.784,0],[0.656,-0.4],[0,0],[-0.368,0.976],[-0.96,0.56],[-1.184,0],[-0.896,-0.512],[-0.496,-0.912]],"v":[[-109.468,145.593],[-108.748,142.401],[-106.684,140.193],[-103.564,139.401],[-100.588,140.121],[-98.572,142.089],[-97.852,145.017],[-97.876,145.569],[-97.948,146.025],[-107.38,146.025],[-106.252,148.953],[-103.444,149.937],[-101.284,149.337],[-99.916,147.777],[-98.236,148.521],[-100.228,150.849],[-103.492,151.689],[-106.612,150.945],[-108.724,148.809]],"c":true},"ix":2},"nm":"Path 28","mn":"ADBE Vector Shape - Group","hd":false},{"ind":28,"ty":"sh","ix":29,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-123.66,151.377],[-125.796,151.377],[-125.796,133.977],[-123.156,133.977],[-113.94,148.305],[-113.94,133.977],[-111.804,133.977],[-111.804,151.377],[-114.444,151.377],[-123.66,137.145]],"c":true},"ix":2},"nm":"Path 29","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.396078437567,0.403921574354,0.482352942228,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":30,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Circ","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.006],"y":[1]},"o":{"x":[0.494],"y":[0]},"t":1,"s":[-162]},{"t":41.0000016699642,"s":[0]}],"ix":10},"p":{"a":0,"k":[360,367,0],"ix":2},"a":{"a":0,"k":[0,104.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-10.05,0],[0,10.364],[10.05,0],[0,-10.364]],"o":[[10.05,0],[0,-10.364],[-10.05,0],[0,10.364]],"v":[[206.582,77.335],[224.779,58.569],[206.582,39.803],[188.385,58.569]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392156863,0.337254901961,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"ColorLine","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[360,262.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[41.476,31.189],[51.562,-4.95],[34.855,-38.516],[0.035,-52.068]],"o":[[-9.837,-51.12],[-41.477,-31.188],[-51.563,4.949],[-34.855,38.516],[0,0]],"v":[[206.582,66.137],[126.838,-61.775],[-17.749,-102.551],[-152.046,-35.004],[-206.267,105.768]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":25,"ix":10},"g":{"p":3,"k":{"a":0,"k":[0,0.18,0.337,1,0.5,0.106,0.635,1,1,0.031,0.933,1],"ix":8}},"s":{"a":0,"k":[0,0],"ix":4},"e":{"a":0,"k":[100,0],"ix":5},"t":1,"lc":1,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.006],"y":[1]},"o":{"x":[0.494],"y":[0]},"t":1,"s":[100]},{"t":41.0000016699642,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"greyline","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[360,262.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[39.084,38.764],[55.02,0],[39.083,-38.764],[0.508,-55.072]],"o":[[-0.508,-55.072],[-39.083,-38.764],[-55.019,0],[-39.084,38.764],[0,0]],"v":[[211.132,104.63],[149.329,-41.851],[2.432,-102.363],[-144.464,-41.851],[-206.267,104.63]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.768627464771,0.768627464771,0.768627464771,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":25,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"100","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[360,262.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-1.072],[-0.752,-1.136],[-1.248,0],[-0.512,0.336],[-0.336,0.624],[-0.16,0.848],[0,1.04],[0.768,1.12],[1.248,0],[0.528,-0.336],[0.352,-0.624],[0.16,-0.864]],"o":[[0,2.4],[0.768,1.136],[0.736,0],[0.528,-0.336],[0.336,-0.624],[0.176,-0.864],[0,-2.432],[-0.768,-1.12],[-0.72,0],[-0.512,0.32],[-0.336,0.608],[-0.16,0.848]],"v":[[227.766,142.689],[228.894,147.993],[231.918,149.697],[233.79,149.193],[235.086,147.753],[235.83,145.545],[236.094,142.689],[234.942,137.361],[231.918,135.681],[230.046,136.185],[228.75,137.601],[228.006,139.809]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,1.872],[-0.288,1.104],[-0.544,0.768],[-0.784,0.4],[-0.992,0],[-0.944,-0.72],[-0.496,-1.344],[0,-1.904],[0.288,-1.12],[0.56,-0.768],[0.784,-0.4],[1.008,0],[0.96,0.72],[0.496,1.344]],"o":[[0,-1.44],[0.288,-1.12],[0.544,-0.768],[0.784,-0.416],[1.36,0],[0.944,0.704],[0.496,1.344],[0,1.424],[-0.288,1.104],[-0.544,0.768],[-0.768,0.4],[-1.344,0.016],[-0.944,-0.72],[-0.48,-1.344]],"v":[[225.582,142.689],[226.014,138.873],[227.262,136.041],[229.254,134.289],[231.918,133.665],[235.374,134.745],[237.534,137.817],[238.278,142.689],[237.846,146.505],[236.574,149.313],[234.582,151.065],[231.918,151.665],[228.462,150.609],[226.302,147.513]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-1.072],[-0.752,-1.136],[-1.248,0],[-0.512,0.336],[-0.336,0.624],[-0.16,0.848],[0,1.04],[0.768,1.12],[1.248,0],[0.528,-0.336],[0.352,-0.624],[0.16,-0.864]],"o":[[0,2.4],[0.768,1.136],[0.736,0],[0.528,-0.336],[0.336,-0.624],[0.176,-0.864],[0,-2.432],[-0.768,-1.12],[-0.72,0],[-0.512,0.32],[-0.336,0.608],[-0.16,0.848]],"v":[[213.099,142.689],[214.227,147.993],[217.251,149.697],[219.123,149.193],[220.419,147.753],[221.163,145.545],[221.427,142.689],[220.275,137.361],[217.251,135.681],[215.379,136.185],[214.083,137.601],[213.339,139.809]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,1.872],[-0.288,1.104],[-0.544,0.768],[-0.784,0.4],[-0.992,0],[-0.944,-0.72],[-0.496,-1.344],[0,-1.904],[0.288,-1.12],[0.56,-0.768],[0.784,-0.4],[1.008,0],[0.96,0.72],[0.496,1.344]],"o":[[0,-1.44],[0.288,-1.12],[0.544,-0.768],[0.784,-0.416],[1.36,0],[0.944,0.704],[0.496,1.344],[0,1.424],[-0.288,1.104],[-0.544,0.768],[-0.768,0.4],[-1.344,0.016],[-0.944,-0.72],[-0.48,-1.344]],"v":[[210.915,142.689],[211.347,138.873],[212.595,136.041],[214.587,134.289],[217.251,133.665],[220.707,134.745],[222.867,137.817],[223.611,142.689],[223.179,146.505],[221.907,149.313],[219.915,151.065],[217.251,151.665],[213.795,150.609],[211.635,147.513]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[205.582,151.377],[205.582,136.305],[200.998,138.345],[200.998,136.353],[206.494,133.977],[207.694,133.977],[207.694,151.377]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[193.271,143.313],[193.271,138.633],[195.191,138.633],[195.191,143.313],[199.703,143.313],[199.703,145.185],[195.191,145.185],[195.191,149.889],[193.271,149.889],[193.271,145.185],[188.783,145.185],[188.783,143.313]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.396078437567,0.403921574354,0.482352942228,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":7,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"-100","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[360,262.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-1.072],[-0.752,-1.136],[-1.248,0],[-0.512,0.336],[-0.336,0.624],[-0.16,0.848],[0,1.04],[0.768,1.12],[1.248,0],[0.528,-0.336],[0.352,-0.624],[0.16,-0.864]],"o":[[0,2.4],[0.768,1.136],[0.736,0],[0.528,-0.336],[0.336,-0.624],[0.176,-0.864],[0,-2.432],[-0.768,-1.12],[-0.72,0],[-0.512,0.32],[-0.336,0.608],[-0.16,0.848]],"v":[[-202.253,142.689],[-201.125,147.993],[-198.101,149.697],[-196.229,149.193],[-194.933,147.753],[-194.189,145.545],[-193.925,142.689],[-195.077,137.361],[-198.101,135.681],[-199.973,136.185],[-201.269,137.601],[-202.013,139.809]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,1.872],[-0.288,1.104],[-0.544,0.768],[-0.784,0.4],[-0.992,0],[-0.944,-0.72],[-0.496,-1.344],[0,-1.904],[0.288,-1.12],[0.56,-0.768],[0.784,-0.4],[1.008,0],[0.96,0.72],[0.496,1.344]],"o":[[0,-1.44],[0.288,-1.12],[0.544,-0.768],[0.784,-0.416],[1.36,0],[0.944,0.704],[0.496,1.344],[0,1.424],[-0.288,1.104],[-0.544,0.768],[-0.768,0.4],[-1.344,0.016],[-0.944,-0.72],[-0.48,-1.344]],"v":[[-204.437,142.689],[-204.005,138.873],[-202.757,136.041],[-200.765,134.289],[-198.101,133.665],[-194.645,134.745],[-192.485,137.817],[-191.741,142.689],[-192.173,146.505],[-193.445,149.313],[-195.437,151.065],[-198.101,151.665],[-201.557,150.609],[-203.717,147.513]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-1.072],[-0.752,-1.136],[-1.248,0],[-0.512,0.336],[-0.336,0.624],[-0.16,0.848],[0,1.04],[0.768,1.12],[1.248,0],[0.528,-0.336],[0.352,-0.624],[0.16,-0.864]],"o":[[0,2.4],[0.768,1.136],[0.736,0],[0.528,-0.336],[0.336,-0.624],[0.176,-0.864],[0,-2.432],[-0.768,-1.12],[-0.72,0],[-0.512,0.32],[-0.336,0.608],[-0.16,0.848]],"v":[[-216.92,142.689],[-215.792,147.993],[-212.768,149.697],[-210.896,149.193],[-209.6,147.753],[-208.856,145.545],[-208.592,142.689],[-209.744,137.361],[-212.768,135.681],[-214.64,136.185],[-215.936,137.601],[-216.68,139.809]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,1.872],[-0.288,1.104],[-0.544,0.768],[-0.784,0.4],[-0.992,0],[-0.944,-0.72],[-0.496,-1.344],[0,-1.904],[0.288,-1.12],[0.56,-0.768],[0.784,-0.4],[1.008,0],[0.96,0.72],[0.496,1.344]],"o":[[0,-1.44],[0.288,-1.12],[0.544,-0.768],[0.784,-0.416],[1.36,0],[0.944,0.704],[0.496,1.344],[0,1.424],[-0.288,1.104],[-0.544,0.768],[-0.768,0.4],[-1.344,0.016],[-0.944,-0.72],[-0.48,-1.344]],"v":[[-219.104,142.689],[-218.672,138.873],[-217.424,136.041],[-215.432,134.289],[-212.768,133.665],[-209.312,134.745],[-207.152,137.817],[-206.408,142.689],[-206.84,146.505],[-208.112,149.313],[-210.104,151.065],[-212.768,151.665],[-216.224,150.609],[-218.384,147.513]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-224.437,151.377],[-224.437,136.305],[-229.021,138.345],[-229.021,136.353],[-223.525,133.977],[-222.325,133.977],[-222.325,151.377]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-237.94,144.009],[-230.26,144.009],[-230.26,145.689],[-237.94,145.689]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.396078437567,0.403921574354,0.482352942228,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":7,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":7,"ty":5,"nm":"90","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[362.116,366.025,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"s":107.51619720459,"f":"Biotif-Medium","t":"90","j":2,"tr":-80,"lh":129.019436645508,"ls":0,"fc":[0,0,0]},"t":0}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"N","tt":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":36,"s":[0]},{"t":41.0000016699642,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[357,306.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[22.5,28.381,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0]],"o":[[0,0]],"v":[[-168,-96.5]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[720,525],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":0,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0,0.18,0.337,1,0.5,0.106,0.635,1,1,0.031,0.933,1],"ix":9}},"s":{"a":0,"k":[-276,0],"ix":5},"e":{"a":0,"k":[100,0],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":9,"ty":4,"nm":"BG","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[360,262.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-193.3,0],[0,0],[0,-193.3],[0,0],[0,0]],"o":[[0,-193.3],[0,0],[193.3,0],[0,0],[0,0],[0,0]],"v":[[-358.5,87.5],[-8.5,-262.5],[8.5,-262.5],[358.5,87.5],[358.5,262.5],[-358.5,262.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.997752010822,0.997752010822,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0}],"markers":[],"chars":[{"ch":"9","size":107.51619720459,"style":"Medium","w":65.2,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-14.2],[-13.797,0],[-3.424,6.647],[15.61,0],[4.532,3.021],[0,0],[-7.452,0],[0,25.177],[17.322,0]],"o":[[0,13.797],[8.862,0],[0,17.825],[-4.834,0],[0,0],[4.028,2.82],[20.847,0],[0,-22.559],[-15.408,0]],"v":[[5.74,-49.649],[29.608,-26.688],[48.843,-37.665],[25.076,-8.762],[10.574,-12.79],[7.855,-3.424],[25.681,1.108],[59.518,-38.47],[31.622,-74.121]],"c":true},"ix":2},"nm":"9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,8.459],[-8.862,0],[0,-8.56],[8.661,0.101]],"o":[[0,-8.459],[8.661,0],[0,8.661],[-8.56,0]],"v":[[16.919,-49.75],[31.622,-64.05],[46.124,-49.85],[31.421,-35.651]],"c":true},"ix":2},"nm":"9","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"9","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Biotif"},{"ch":"0","size":107.51619720459,"style":"Medium","w":66.8,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-23.969],[-17.523,0.201],[0,23.868],[17.523,-0.201]],"o":[[0,23.364],[17.02,0],[0,-23.666],[-17.12,0.101]],"v":[[6.345,-36.456],[33.737,1.208],[61.23,-36.456],[33.737,-74.323]],"c":true},"ix":2},"nm":"0","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,19.135],[-11.279,0],[0,-19.437],[11.38,0]],"o":[[0,-16.718],[9.769,0],[0,16.415],[-9.668,0]],"v":[[17.523,-36.456],[33.737,-64.151],[50.052,-36.456],[33.737,-8.862]],"c":true},"ix":2},"nm":"0","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"0","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Biotif"}]}



var paramsHomeGraph = {
    container: document.getElementById('homeGraph'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: homeGraph
};
var animHomeGraph;
animHomeGraph = lottie.loadAnimation(paramsHomeGraph);





var why = {"v":"5.7.1","fr":30,"ip":0,"op":120,"w":1240,"h":350,"nm":"Why-Replicant","ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":1,"ty":4,"nm":"coin 3","parent":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[180,0,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-2.83,0],[0,2.84],[2.83,0],[0,2.84],[-2.83,0],[0,-2.84]],"o":[[0,2.84],[2.83,0],[0,-2.84],[-2.83,0],[0,-2.84],[2.83,0],[0,0]],"v":[[-47.8,-30.9],[-42.67,-25.76],[-37.54,-30.9],[-42.67,-36.04],[-47.8,-41.18],[-42.67,-46.32],[-37.54,-41.18]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-52.7],[-42.67,-46.33]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-25.75],[-42.67,-19.38]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[0,0]],"v":[[-52.14,-66],[-82,-36.04],[-81.39,-30],[-52.13,-6.08]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":1,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0],[0,16.54],[7.92,5.38]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[16.49,0],[0,-10.33],[0,0]],"v":[[-42.67,-66],[-72.53,-36.04],[-71.92,-30],[-42.66,-6.08],[-12.8,-36.04],[-25.93,-60.85]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":1,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"coin 4","parent":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-89,0,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-2.83,0],[0,2.84],[2.83,0],[0,2.84],[-2.83,0],[0,-2.84]],"o":[[0,2.84],[2.83,0],[0,-2.84],[-2.83,0],[0,-2.84],[2.83,0],[0,0]],"v":[[-47.8,-30.9],[-42.67,-25.76],[-37.54,-30.9],[-42.67,-36.04],[-47.8,-41.18],[-42.67,-46.32],[-37.54,-41.18]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-52.7],[-42.67,-46.33]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-25.75],[-42.67,-19.38]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[0,0]],"v":[[-52.14,-66],[-82,-36.04],[-81.39,-30],[-52.13,-6.08]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":1,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0],[0,16.54],[7.92,5.38]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[16.49,0],[0,-10.33],[0,0]],"v":[[-42.67,-66],[-72.53,-36.04],[-71.92,-30],[-42.66,-6.08],[-12.8,-36.04],[-25.93,-60.85]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":1,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"coin 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[530,175,0],"to":[14.833,0,0],"ti":[-14.833,0,0]},{"t":60,"s":[619,175,0]}],"ix":2,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle');"},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-2.83,0],[0,2.84],[2.83,0],[0,2.84],[-2.83,0],[0,-2.84]],"o":[[0,2.84],[2.83,0],[0,-2.84],[-2.83,0],[0,-2.84],[2.83,0],[0,0]],"v":[[-47.8,-30.9],[-42.67,-25.76],[-37.54,-30.9],[-42.67,-36.04],[-47.8,-41.18],[-42.67,-46.32],[-37.54,-41.18]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-52.7],[-42.67,-46.33]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-25.75],[-42.67,-19.38]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[0,0]],"v":[[-52.14,-66],[-82,-36.04],[-81.39,-30],[-52.13,-6.08]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":1,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0],[0,16.54],[7.92,5.38]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[16.49,0],[0,-10.33],[0,0]],"v":[[-42.67,-66],[-72.53,-36.04],[-71.92,-30],[-42.66,-6.08],[-12.8,-36.04],[-25.93,-60.85]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":1,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"coin","parent":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[90,0,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-2.83,0],[0,2.84],[2.83,0],[0,2.84],[-2.83,0],[0,-2.84]],"o":[[0,2.84],[2.83,0],[0,-2.84],[-2.83,0],[0,-2.84],[2.83,0],[0,0]],"v":[[-47.8,-30.9],[-42.67,-25.76],[-37.54,-30.9],[-42.67,-36.04],[-47.8,-41.18],[-42.67,-46.32],[-37.54,-41.18]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-52.7],[-42.67,-46.33]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-42.67,-25.75],[-42.67,-19.38]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[0,0]],"v":[[-52.14,-66],[-82,-36.04],[-81.39,-30],[-52.13,-6.08]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":1,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-16.54],[-0.4,-1.95],[-14.43,0],[0,16.54],[7.92,5.38]],"o":[[-16.49,0],[0,2.07],[2.78,13.65],[16.49,0],[0,-10.33],[0,0]],"v":[[-42.67,-66],[-72.53,-36.04],[-71.92,-30],[-42.66,-6.08],[-12.8,-36.04],[-25.93,-60.85]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":1,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0}]},{"id":"comp_1","layers":[{"ddd":0,"ind":1,"ty":4,"nm":"agent 4","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,-180,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-14.87,0],[0,-14.791],[0,0]],"o":[[0,-14.791],[14.87,0],[0,0],[0,0]],"v":[[-310.423,-6.572],[-283.507,-33.337],[-256.591,-6.572],[-287.453,-6.572]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,8.425],[8.474,0],[0,-8.425],[-8.474,0]],"o":[[8.474,0],[0,-8.425],[-8.474,0],[0,8.425],[0,0]],"v":[[-283.507,-37.934],[-268.166,-53.181],[-283.507,-68.428],[-298.848,-53.181],[-283.507,-37.934]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"agent 3","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,90,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-14.87,0],[0,-14.791],[0,0]],"o":[[0,-14.791],[14.87,0],[0,0],[0,0]],"v":[[-310.423,-6.572],[-283.507,-33.337],[-256.591,-6.572],[-287.453,-6.572]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,8.425],[8.474,0],[0,-8.425],[-8.474,0]],"o":[[8.474,0],[0,-8.425],[-8.474,0],[0,8.425],[0,0]],"v":[[-283.507,-37.934],[-268.166,-53.181],[-283.507,-68.428],[-298.848,-53.181],[-283.507,-37.934]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"agent 2","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,-90,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-14.87,0],[0,-14.791],[0,0]],"o":[[0,-14.791],[14.87,0],[0,0],[0,0]],"v":[[-310.423,-6.572],[-283.507,-33.337],[-256.591,-6.572],[-287.453,-6.572]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,8.425],[8.474,0],[0,-8.425],[-8.474,0]],"o":[[8.474,0],[0,-8.425],[-8.474,0],[0,8.425],[0,0]],"v":[[-283.507,-37.934],[-268.166,-53.181],[-283.507,-68.428],[-298.848,-53.181],[-283.507,-37.934]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"agent","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[620,175,0],"to":[0,15.333,0],"ti":[0,-15.333,0]},{"t":58,"s":[620,267,0]}],"ix":2,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle');"},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-14.87,0],[0,-14.791],[0,0]],"o":[[0,-14.791],[14.87,0],[0,0],[0,0]],"v":[[-310.423,-6.572],[-283.507,-33.337],[-256.591,-6.572],[-287.453,-6.572]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,8.425],[8.474,0],[0,-8.425],[-8.474,0]],"o":[[8.474,0],[0,-8.425],[-8.474,0],[0,8.425],[0,0]],"v":[[-283.507,-37.934],[-268.166,-53.181],[-283.507,-68.428],[-298.848,-53.181],[-283.507,-37.934]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0}]},{"id":"comp_2","layers":[{"ddd":0,"ind":1,"ty":4,"nm":"headphone 2","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[90,0,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,-1.92],[-1.86,0],[0,0],[0,1.92]],"o":[[0,0],[-1.85,0],[0,1.92],[0,0],[1.85,0],[0,0]],"v":[[-520.14,-13.41],[-522.68,-13.41],[-526.04,-9.94],[-522.68,-6.47],[-520.14,-6.47],[-516.78,-9.94]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,5.58],[0,0]],"o":[[0,0],[5.59,0],[0,0],[0,0]],"v":[[-516.79,-9.36],[-512.44,-9.36],[-502.32,-19.47],[-502.32,-19.76]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.59,0],[0,-1.58],[0,0],[1.59,0]],"o":[[0,0],[0,-1.58],[1.59,0],[0,0],[0,1.58],[0,0]],"v":[[-544.56,-21.47],[-544.56,-41.78],[-541.67,-44.64],[-538.78,-41.78],[-538.78,-21.47],[-541.67,-18.61]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.5],[0,0],[-3.83,0],[0,0]],"o":[[-2.01,1.2],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-548.14,-40.76],[-551.5,-34.87],[-551.5,-28.96],[-544.56,-22.08],[-544.56,-41.75]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[1.6,0],[0,-1.58],[0,0],[-1.59,0]],"o":[[0,0],[0,-1.58],[-1.6,0],[0,0],[0,1.58],[0,0]],"v":[[-497.69,-20.89],[-497.69,-41.2],[-500.58,-44.06],[-503.47,-41.2],[-503.47,-20.89],[-500.58,-18.03]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.46],[0,0],[3.83,0],[0,0]],"o":[[1.96,1.22],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-494.02,-40.13],[-490.75,-34.3],[-490.75,-28.39],[-497.69,-21.51],[-497.69,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-10.81,0],[0,0],[0,-11.42],[0,0]],"o":[[0,0],[0,-11.42],[0,0],[10.81,0],[0,0],[0,0]],"v":[[-544.56,-41.17],[-544.56,-48.83],[-524.98,-69.5],[-516.68,-69.5],[-497.11,-48.83],[-497.11,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"headphone 4","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-180,0,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,-1.92],[-1.86,0],[0,0],[0,1.92]],"o":[[0,0],[-1.85,0],[0,1.92],[0,0],[1.85,0],[0,0]],"v":[[-520.14,-13.41],[-522.68,-13.41],[-526.04,-9.94],[-522.68,-6.47],[-520.14,-6.47],[-516.78,-9.94]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,5.58],[0,0]],"o":[[0,0],[5.59,0],[0,0],[0,0]],"v":[[-516.79,-9.36],[-512.44,-9.36],[-502.32,-19.47],[-502.32,-19.76]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.59,0],[0,-1.58],[0,0],[1.59,0]],"o":[[0,0],[0,-1.58],[1.59,0],[0,0],[0,1.58],[0,0]],"v":[[-544.56,-21.47],[-544.56,-41.78],[-541.67,-44.64],[-538.78,-41.78],[-538.78,-21.47],[-541.67,-18.61]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.5],[0,0],[-3.83,0],[0,0]],"o":[[-2.01,1.2],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-548.14,-40.76],[-551.5,-34.87],[-551.5,-28.96],[-544.56,-22.08],[-544.56,-41.75]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[1.6,0],[0,-1.58],[0,0],[-1.59,0]],"o":[[0,0],[0,-1.58],[-1.6,0],[0,0],[0,1.58],[0,0]],"v":[[-497.69,-20.89],[-497.69,-41.2],[-500.58,-44.06],[-503.47,-41.2],[-503.47,-20.89],[-500.58,-18.03]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.46],[0,0],[3.83,0],[0,0]],"o":[[1.96,1.22],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-494.02,-40.13],[-490.75,-34.3],[-490.75,-28.39],[-497.69,-21.51],[-497.69,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-10.81,0],[0,0],[0,-11.42],[0,0]],"o":[[0,0],[0,-11.42],[0,0],[10.81,0],[0,0],[0,0]],"v":[[-544.56,-41.17],[-544.56,-48.83],[-524.98,-69.5],[-516.68,-69.5],[-497.11,-48.83],[-497.11,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"headphone 3","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-90,0,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,-1.92],[-1.86,0],[0,0],[0,1.92]],"o":[[0,0],[-1.85,0],[0,1.92],[0,0],[1.85,0],[0,0]],"v":[[-520.14,-13.41],[-522.68,-13.41],[-526.04,-9.94],[-522.68,-6.47],[-520.14,-6.47],[-516.78,-9.94]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,5.58],[0,0]],"o":[[0,0],[5.59,0],[0,0],[0,0]],"v":[[-516.79,-9.36],[-512.44,-9.36],[-502.32,-19.47],[-502.32,-19.76]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.59,0],[0,-1.58],[0,0],[1.59,0]],"o":[[0,0],[0,-1.58],[1.59,0],[0,0],[0,1.58],[0,0]],"v":[[-544.56,-21.47],[-544.56,-41.78],[-541.67,-44.64],[-538.78,-41.78],[-538.78,-21.47],[-541.67,-18.61]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.5],[0,0],[-3.83,0],[0,0]],"o":[[-2.01,1.2],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-548.14,-40.76],[-551.5,-34.87],[-551.5,-28.96],[-544.56,-22.08],[-544.56,-41.75]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[1.6,0],[0,-1.58],[0,0],[-1.59,0]],"o":[[0,0],[0,-1.58],[-1.6,0],[0,0],[0,1.58],[0,0]],"v":[[-497.69,-20.89],[-497.69,-41.2],[-500.58,-44.06],[-503.47,-41.2],[-503.47,-20.89],[-500.58,-18.03]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.46],[0,0],[3.83,0],[0,0]],"o":[[1.96,1.22],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-494.02,-40.13],[-490.75,-34.3],[-490.75,-28.39],[-497.69,-21.51],[-497.69,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-10.81,0],[0,0],[0,-11.42],[0,0]],"o":[[0,0],[0,-11.42],[0,0],[10.81,0],[0,0],[0,0]],"v":[[-544.56,-41.17],[-544.56,-48.83],[-524.98,-69.5],[-516.68,-69.5],[-497.11,-48.83],[-497.11,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"headphone","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,-1.92],[-1.86,0],[0,0],[0,1.92]],"o":[[0,0],[-1.85,0],[0,1.92],[0,0],[1.85,0],[0,0]],"v":[[-520.14,-13.41],[-522.68,-13.41],[-526.04,-9.94],[-522.68,-6.47],[-520.14,-6.47],[-516.78,-9.94]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,5.58],[0,0]],"o":[[0,0],[5.59,0],[0,0],[0,0]],"v":[[-516.79,-9.36],[-512.44,-9.36],[-502.32,-19.47],[-502.32,-19.76]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.59,0],[0,-1.58],[0,0],[1.59,0]],"o":[[0,0],[0,-1.58],[1.59,0],[0,0],[0,1.58],[0,0]],"v":[[-544.56,-21.47],[-544.56,-41.78],[-541.67,-44.64],[-538.78,-41.78],[-538.78,-21.47],[-541.67,-18.61]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.5],[0,0],[-3.83,0],[0,0]],"o":[[-2.01,1.2],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-548.14,-40.76],[-551.5,-34.87],[-551.5,-28.96],[-544.56,-22.08],[-544.56,-41.75]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[1.6,0],[0,-1.58],[0,0],[-1.59,0]],"o":[[0,0],[0,-1.58],[-1.6,0],[0,0],[0,1.58],[0,0]],"v":[[-497.69,-20.89],[-497.69,-41.2],[-500.58,-44.06],[-503.47,-41.2],[-503.47,-20.89],[-500.58,-18.03]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,-2.46],[0,0],[3.83,0],[0,0]],"o":[[1.96,1.22],[0,0],[0,3.8],[0,0],[0,0]],"v":[[-494.02,-40.13],[-490.75,-34.3],[-490.75,-28.39],[-497.69,-21.51],[-497.69,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-10.81,0],[0,0],[0,-11.42],[0,0]],"o":[[0,0],[0,-11.42],[0,0],[10.81,0],[0,0],[0,0]],"v":[[-544.56,-41.17],[-544.56,-48.83],[-524.98,-69.5],[-516.68,-69.5],[-497.11,-48.83],[-497.11,-41.17]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0}]}],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 9","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-41.698,0],[0,0],[0,-41.698],[0,0],[41.698,0],[0,0],[0,41.698],[0,0]],"o":[[0,0],[41.698,0],[0,0],[0,41.698],[0,0],[-41.698,0],[0,0],[0,-41.698]],"v":[[-50,-111.5],[-45,-111.5],[30.5,-36],[30.5,-36],[-45,39.5],[-50,39.5],[-125.5,-36],[-125.5,-36]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.603921592236,0.541176497936,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":0,"nm":"Coin-comps","tt":1,"refId":"comp_0","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[620,175,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"w":1240,"h":350,"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Layer 10","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-41.698,0],[0,0],[0,-41.698],[0,0],[41.698,0],[0,0],[0,41.698],[0,0]],"o":[[0,0],[41.698,0],[0,0],[0,41.698],[0,0],[-41.698,0],[0,0],[0,-41.698]],"v":[[-286,-111.5],[-281,-111.5],[-205.5,-36],[-205.5,-36],[-281,39.5],[-286,39.5],[-361.5,-36],[-361.5,-36]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.603921592236,0.541176497936,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":0,"nm":"agent","tt":1,"refId":"comp_1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[620,175,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"w":1240,"h":350,"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Layer 11","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-42.802,0],[0,0],[0,-42.802],[0,0],[42.802,0],[0,0],[0,42.802],[0,0]],"o":[[0,0],[42.802,0],[0,0],[0,42.802],[0,0],[-42.802,0],[0,0],[0,-42.802]],"v":[[-524,-115.5],[-519,-115.5],[-441.5,-38],[-441.5,-38],[-519,39.5],[-524,39.5],[-601.5,-38],[-601.5,-38]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.603921592236,0.541176497936,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":6,"ty":0,"nm":"headphones-Comps","tt":1,"refId":"comp_2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[620,175,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"w":1240,"h":350,"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"mask","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[65.923,65.923],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[0.474510013356,0.784313964844,0.105881993911,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[188.962,-37.538],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"person","tt":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.217,"y":1},"o":{"x":0.506,"y":0},"t":0,"s":[620,223,0],"to":[0,-8,0],"ti":[0,8,0]},{"i":{"x":0.217,"y":0.217},"o":{"x":0.333,"y":0.333},"t":31,"s":[620,175,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":100,"s":[620,175,0],"to":[0,8,0],"ti":[0,-8,0]},{"t":119,"s":[620,223,0]}],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-8.135,0],[-3.251,-7.374]],"o":[[3.558,-6.561],[8.736,0],[0,0]],"v":[[169.743,-12.33],[188.487,-23.365],[207.966,-10.834]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-6.676,0],[0,6.521],[6.676,0],[0,-6.521]],"o":[[6.676,0],[0,-6.521],[-6.676,0],[0,6.521]],"v":[[188.487,-25.359],[200.568,-37.168],[188.487,-48.976],[176.405,-37.168]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":9,"ty":4,"nm":"Arrows","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":120,"s":[-360]}],"ix":10},"p":{"a":0,"k":[808.507,139.004,0],"ix":2},"a":{"a":0,"k":[188.507,-35.996,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-16.724,3.87],[-7.359,-8.148]],"o":[[-4.281,-17.529],[11.559,-2.69],[0,0]],"v":[[157.34,-27.183],[181.329,-65.705],[211.82,-56.219]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[15.506,-3.595],[7.385,7.138]],"o":[[2.823,16.217],[-10.824,2.506],[0,0]],"v":[[219.606,-41.301],[195.658,-6.282],[166.612,-14.272]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[229.841,-26.448],[219.633,-41.366],[207.886,-27.576]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[147.172,-41.904],[157.367,-26.999],[169.114,-40.776]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":10,"ty":4,"nm":"Layer 37","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[361.337,115.787],[358.061,119.062],[360.793,121.794],[364.069,118.519],[367.344,121.794],[370.144,118.994],[366.869,115.719],[370.076,112.511],[367.344,109.779],[364.137,112.987],[360.827,109.677],[358.027,112.478]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":11,"ty":4,"nm":"Layer 36","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-7.81,7.811],[-7.81,-7.81],[7.81,-7.811],[7.81,7.81]],"o":[[7.81,-7.811],[7.81,7.81],[-7.81,7.811],[-7.81,-7.81]],"v":[[349.642,101.358],[377.926,101.358],[377.926,129.642],[349.642,129.642]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":12,"ty":4,"nm":"Layer 35","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[361.337,38.071],[358.061,41.346],[360.793,44.079],[364.069,40.803],[367.344,44.079],[370.144,41.279],[366.869,38.003],[370.076,34.796],[367.344,32.063],[364.137,35.271],[360.827,31.962],[358.027,34.762]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":13,"ty":4,"nm":"Layer 34","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-7.811,7.811],[-7.81,-7.81],[7.81,-7.811],[7.81,7.81]],"o":[[7.811,-7.811],[7.81,7.81],[-7.81,7.811],[-7.81,-7.81]],"v":[[349.642,23.642],[377.926,23.642],[377.926,51.926],[349.642,51.926]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":14,"ty":4,"nm":"Layer 33","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[361.337,-39.929],[358.061,-36.654],[360.793,-33.921],[364.069,-37.197],[367.344,-33.921],[370.144,-36.721],[366.869,-39.997],[370.076,-43.204],[367.344,-45.937],[364.137,-42.729],[360.827,-46.038],[358.027,-43.238]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":15,"ty":4,"nm":"Layer 32","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-7.81,7.811],[-7.81,-7.81],[7.811,-7.811],[7.81,7.81]],"o":[[7.81,-7.811],[7.81,7.81],[-7.811,7.811],[-7.81,-7.81]],"v":[[349.642,-54.358],[377.926,-54.358],[377.926,-26.074],[349.642,-26.074]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":-6,"op":1794,"st":-6,"bm":0},{"ddd":0,"ind":16,"ty":4,"nm":"Layer 31","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[361.337,-117.929],[358.061,-114.654],[360.793,-111.921],[364.069,-115.197],[367.344,-111.921],[370.144,-114.721],[366.869,-117.997],[370.076,-121.204],[367.344,-123.936],[364.137,-120.729],[360.827,-124.038],[358.027,-121.238]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":17,"ty":4,"nm":"Layer 30","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-7.81,7.811],[-7.81,-7.81],[7.811,-7.811],[7.81,7.81]],"o":[[7.81,-7.811],[7.81,7.81],[-7.811,7.811],[-7.81,-7.81]],"v":[[349.642,-132.358],[377.926,-132.358],[377.926,-104.074],[349.642,-104.074]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":18,"ty":4,"nm":"Layer 29","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.83,0],[0,1.656],[1.46,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.83,0],[0,-1.62],[-1.82,-0.396],[0,0],[0,-0.72],[0.99,0],[0.16,0.918]],"o":[[0.3,1.368],[2.14,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.92,0],[0,0],[-0.25,-1.35],[-1.95,0],[0,1.242],[0,0],[0.7,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[572.91,120.466],[576.47,122.752],[579.98,119.98],[577.53,117.424],[576.6,117.226],[575.05,116.074],[576.54,114.94],[578.31,116.236],[579.84,115.696],[576.44,113.464],[573.12,116.164],[575.75,118.684],[576.69,118.882],[578,120.052],[576.36,121.24],[574.44,119.854]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-1.35,0],[-0.08,-1.386]],"o":[[0.16,-1.386],[1.43,0],[0,0]],"v":[[564.48,117.334],[566.98,115.066],[569.49,117.334]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-2.754],[-2.66,0],[-0.56,1.476],[0,0],[1.08,0],[0.07,1.692],[0,0],[0,0.342],[2.59,0]],"o":[[0,2.808],[1.87,0],[0,0],[-0.34,0.882],[-1.63,0],[0,0],[0.06,-0.198],[0,-2.538],[-2.7,0]],"v":[[562.56,118.126],[567.09,122.752],[571.11,120.358],[569.56,119.674],[567.16,121.15],[564.48,118.558],[571.3,118.558],[571.39,117.712],[567.04,113.464]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.42,0],[-0.2,-0.108],[0,0],[0.43,0],[0.4,-1.008],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.422],[0.31,0],[0,0],[-0.17,-0.09],[-0.9,0],[0,0],[0,0],[0,0],[0,0]],"v":[[558.09,122.5],[558.09,117.658],[560.34,115.3],[561.14,115.444],[561.14,113.626],[560.31,113.482],[558.02,114.958],[557.93,113.698],[556.19,113.698],[556.19,122.5]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,1.674],[-1.69,0],[0,-1.692],[1.71,0]],"o":[[0,-1.692],[1.71,0],[0,1.674],[-1.69,0]],"v":[[546.62,118.108],[549.36,115.156],[552.1,118.108],[549.36,121.042]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,-2.682],[-2.83,0],[0,2.664],[2.84,0]],"o":[[0,2.664],[2.84,0],[0,-2.682],[-2.83,0]],"v":[[544.68,118.108],[549.36,122.752],[554.06,118.108],[549.36,113.464]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,-2.772],[-2.67,0],[-0.55,1.71],[0,0],[1.23,0],[0,1.728],[-1.59,0],[-0.31,-1.008],[0,0],[2.04,0]],"o":[[0,2.772],[2,0],[0,0],[-0.33,0.99],[-1.56,0],[0,-1.764],[1.11,0],[0,0],[-0.47,-1.602],[-2.71,0]],"v":[[534.47,118.126],[538.97,122.752],[543.23,119.98],[541.49,119.35],[539.02,121.006],[536.45,118.108],[539.06,115.174],[541.42,116.794],[543.16,116.128],[539,113.464]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[-1.83,0],[0,1.656],[1.46,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.83,0],[0,-1.62],[-1.82,-0.396],[0,0],[0,-0.72],[0.99,0],[0.16,0.918]],"o":[[0.3,1.368],[2.14,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.92,0],[0,0],[-0.25,-1.35],[-1.95,0],[0,1.242],[0,0],[0.7,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[525.73,120.466],[529.29,122.752],[532.8,119.98],[530.35,117.424],[529.42,117.226],[527.87,116.074],[529.36,114.94],[531.13,116.236],[532.66,115.696],[529.26,113.464],[525.94,116.164],[528.57,118.684],[529.51,118.882],[530.82,120.052],[529.18,121.24],[527.26,119.854]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[513.07,122.5],[515.03,122.5],[515.03,111.16],[519.25,111.16],[519.25,109.45],[508.84,109.45],[508.84,111.16],[513.07,111.16]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[499.59,117.892],[502.02,111.268],[504.51,117.892]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[495.94,122.5],[497.94,122.5],[499.03,119.53],[505.06,119.53],[506.2,122.5],[508.25,122.5],[503.37,109.45],[500.71,109.45]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,-2.25],[-2.03,-0.54],[0,0],[0,-1.008],[1.42,0],[0.27,1.458],[0,0],[-2.47,0],[0,2.412],[2.07,0.558],[0,0],[0,0.9],[-1.34,0],[-0.22,-1.368],[0,0],[2.34,0]],"o":[[0,1.602],[0,0],[1.03,0.27],[0,1.296],[-1.42,0],[0,0],[0.39,1.998],[2.61,0],[0,-1.638],[0,0],[-1.03,-0.288],[0,-1.224],[1.33,0],[0,0],[-0.38,-1.854],[-2.52,0]],"v":[[485.21,113.014],[488.25,116.488],[490.23,117.028],[491.87,118.936],[489.44,121.024],[486.67,118.81],[484.8,119.404],[489.46,122.716],[494.03,118.792],[491.08,115.3],[489.01,114.742],[487.32,112.888],[489.57,110.908],[492.16,113.068],[494.05,112.42],[489.6,109.216]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,-4.068],[-3.87,0],[-0.87,2.358],[0,0],[1.9,0],[0,2.97],[-2.56,0],[-0.56,-1.728],[0,0],[2.88,0]],"o":[[0,4.05],[2.78,0],[0,0],[-0.58,1.548],[-2.56,0],[0,-2.97],[1.87,0],[0,0],[-0.8,-2.412],[-3.84,0]],"v":[[470.37,115.966],[476.86,122.68],[482.77,118.954],[480.77,118.324],[476.85,120.844],[472.49,115.966],[476.85,111.088],[480.79,113.806],[482.79,113.176],[476.83,109.234]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[-1.35,0],[-0.07,-1.386]],"o":[[0.16,-1.386],[1.42,0],[0,0]],"v":[[456.8,117.334],[459.3,115.066],[461.8,117.334]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,-2.754],[-2.66,0],[-0.55,1.476],[0,0],[1.08,0],[0.07,1.692],[0,0],[0,0.342],[2.59,0]],"o":[[0,2.808],[1.87,0],[0,0],[-0.35,0.882],[-1.64,0],[0,0],[0.06,-0.198],[0,-2.538],[-2.7,0]],"v":[[454.87,118.126],[459.41,122.752],[463.42,120.358],[461.88,119.674],[459.48,121.15],[456.8,118.558],[463.62,118.558],[463.71,117.712],[459.36,113.464]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[-1.84,0],[0,1.656],[1.46,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.84,0],[0,-1.62],[-1.82,-0.396],[0,0],[0,-0.72],[0.99,0],[0.17,0.918]],"o":[[0.31,1.368],[2.14,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.92,0],[0,0],[-0.25,-1.35],[-1.94,0],[0,1.242],[0,0],[0.71,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[446.13,120.466],[449.7,122.752],[453.21,119.98],[450.76,117.424],[449.82,117.226],[448.28,116.074],[449.77,114.94],[451.53,116.236],[453.06,115.696],[449.66,113.464],[446.35,116.164],[448.98,118.684],[449.91,118.882],[451.23,120.052],[449.59,121.24],[447.66,119.854]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.43,0],[-0.2,-0.108],[0,0],[0.43,0],[0.4,-1.008],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.422],[0.3,0],[0,0],[-0.16,-0.09],[-0.9,0],[0,0],[0,0],[0,0],[0,0]],"v":[[442.03,122.5],[442.03,117.658],[444.28,115.3],[445.07,115.444],[445.07,113.626],[444.24,113.482],[441.95,114.958],[441.86,113.698],[440.12,113.698],[440.12,122.5]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,1.674],[-1.69,0],[0,-1.692],[1.71,0]],"o":[[0,-1.692],[1.71,0],[0,1.674],[-1.69,0]],"v":[[430.56,118.108],[433.29,115.156],[436.03,118.108],[433.29,121.042]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,-2.682],[-2.82,0],[0,2.664],[2.85,0]],"o":[[0,2.664],[2.85,0],[0,-2.682],[-2.82,0]],"v":[[428.61,118.108],[433.29,122.752],[437.99,118.108],[433.29,113.464]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[413.31,122.5],[415.45,122.5],[418.49,112.744],[421.57,122.5],[423.71,122.5],[427.56,109.45],[425.46,109.45],[422.59,119.476],[419.44,109.45],[417.59,109.45],[414.42,119.602],[411.6,109.45],[409.45,109.45]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":21,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":19,"ty":4,"nm":"Layer 28","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.84,0],[0,1.656],[1.46,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.84,0],[0,-1.62],[-1.82,-0.396],[0,0],[0,-0.72],[0.99,0],[0.17,0.918]],"o":[[0.31,1.368],[2.14,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.92,0],[0,0],[-0.25,-1.35],[-1.94,0],[0,1.242],[0,0],[0.71,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[507.39,42.466],[510.96,44.752],[514.47,41.98],[512.02,39.424],[511.08,39.226],[509.54,38.074],[511.03,36.94],[512.79,38.236],[514.32,37.696],[510.92,35.464],[507.61,38.164],[510.24,40.684],[511.17,40.882],[512.49,42.052],[510.85,43.24],[508.92,41.854]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[501.51,44.5],[503.42,44.5],[503.42,37.354],[505.74,37.354],[505.74,35.698],[503.42,35.698],[503.42,33.052],[501.51,33.052],[501.51,35.698],[499.08,35.698],[499.08,37.354],[501.51,37.354]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[-1.84,0],[0,1.656],[1.46,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.84,0],[0,-1.62],[-1.82,-0.396],[0,0],[0,-0.72],[0.99,0],[0.17,0.918]],"o":[[0.31,1.368],[2.14,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.92,0],[0,0],[-0.25,-1.35],[-1.94,0],[0,1.242],[0,0],[0.71,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[490.48,42.466],[494.05,44.752],[497.56,41.98],[495.11,39.424],[494.17,39.226],[492.63,38.074],[494.12,36.94],[495.88,38.236],[497.41,37.696],[494.01,35.464],[490.7,38.164],[493.33,40.684],[494.26,40.882],[495.58,42.052],[493.94,43.24],[492.01,41.854]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,1.674],[-1.69,0],[0,-1.692],[1.71,0]],"o":[[0,-1.692],[1.71,0],[0,1.674],[-1.69,0]],"v":[[481.46,40.108],[484.2,37.156],[486.93,40.108],[484.2,43.042]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,-2.682],[-2.83,0],[0,2.664],[2.84,0]],"o":[[0,2.664],[2.84,0],[0,-2.682],[-2.83,0]],"v":[[479.52,40.108],[484.2,44.752],[488.9,40.108],[484.2,35.464]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,-4.068],[-3.87,0],[-0.86,2.358],[0,0],[1.91,0],[0,2.97],[-2.55,0],[-0.55,-1.728],[0,0],[2.88,0]],"o":[[0,4.05],[2.77,0],[0,0],[-0.58,1.548],[-2.55,0],[0,-2.97],[1.87,0],[0,0],[-0.79,-2.412],[-3.83,0]],"v":[[465.32,37.966],[471.82,44.68],[477.72,40.954],[475.73,40.324],[471.8,42.844],[467.45,37.966],[471.8,33.088],[475.74,35.806],[477.74,35.176],[471.78,31.234]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[2.27,0],[0,0.918],[-0.7,0.126],[0,0],[0,-0.81]],"o":[[-1.66,0],[0,-0.576],[0,0],[0.99,0],[0,0.882]],"v":[[453.8,47.218],[451.26,46.03],[452.45,44.86],[455.24,44.86],[456.82,45.922]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[1.15,0],[0,1.044],[-1.17,0],[0,-1.062]],"o":[[-1.17,0],[0,-1.044],[1.15,0],[0,1.044]],"v":[[454.02,40.414],[452.07,38.65],[454.02,36.868],[455.94,38.668]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[-2.56,0],[0,2.052],[2.07,0],[0,0],[0,0.396],[-0.63,0.072],[-0.25,0],[0,1.854],[0.63,0.558],[-0.88,-0.018],[0,0],[0.31,-1.188],[0.61,0],[0,-1.872],[-1.15,-0.504],[0,-0.738],[-0.69,-0.144],[0,-1.062]],"o":[[3.29,0],[0,-1.692],[0,0],[-1.08,0],[0,-0.396],[0.23,0.036],[2.19,0],[0,-0.936],[0.31,-0.45],[0,0],[-1.42,-0.144],[-0.48,-0.234],[-2.22,0],[0,1.278],[-1.08,0.234],[0,0.576],[-1.26,0.162],[0,1.674]],"v":[[453.8,48.424],[458.82,45.58],[455.65,43.132],[453.64,43.132],[452.13,42.52],[453.21,41.746],[454,41.8],[457.69,38.65],[456.68,36.364],[458.59,35.698],[458.59,34.042],[455.74,35.824],[454.02,35.464],[450.34,38.668],[452.2,41.422],[450.52,43.024],[451.66,44.284],[449.55,46.264]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.31,0],[0,-1.476],[0,0],[0,0],[0,0],[2.05,0],[0.41,-0.972],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.692],[1.33,0],[0,0],[0,0],[0,0],[0,-2.286],[-1.28,0],[0,0],[0,0],[0,0]],"v":[[440.15,44.5],[442.06,44.5],[442.06,39.838],[444.31,37.174],[446.15,39.478],[446.15,44.5],[448.06,44.5],[448.06,39.01],[444.85,35.464],[441.99,37.012],[441.83,35.698],[440.15,35.698]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[435.65,44.5],[437.56,44.5],[437.56,35.698],[435.65,35.698]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[-0.72,0],[0,0.738],[0.74,0],[0,-0.738]],"o":[[0.74,0],[0,-0.738],[-0.72,0],[0,0.738]],"v":[[436.61,34.186],[437.9,32.944],[436.61,31.72],[435.31,32.944]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[-1.83,0],[0,1.656],[1.45,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.83,0],[0,-1.62],[-1.81,-0.396],[0,0],[0,-0.72],[0.99,0],[0.16,0.918]],"o":[[0.31,1.368],[2.15,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.91,0],[0,0],[-0.25,-1.35],[-1.95,0],[0,1.242],[0,0],[0.7,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[426.5,42.466],[430.06,44.752],[433.57,41.98],[431.13,39.424],[430.19,39.226],[428.64,38.074],[430.14,36.94],[431.9,38.236],[433.43,37.696],[430.03,35.464],[426.72,38.164],[429.34,40.684],[430.28,40.882],[431.59,42.052],[429.96,43.24],[428.03,41.854]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[422.54,44.5],[424.45,44.5],[424.45,35.698],[422.54,35.698]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[-0.72,0],[0,0.738],[0.74,0],[0,-0.738]],"o":[[0.74,0],[0,-0.738],[-0.72,0],[0,0.738]],"v":[[423.49,34.186],[424.79,32.944],[423.49,31.72],[422.2,32.944]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,-1.242],[1.55,0]],"o":[[0,0],[0,0],[1.64,0],[0,1.26],[0,0]],"v":[[412.14,37.354],[412.14,33.232],[415.43,33.232],[417.79,35.248],[415.43,37.354]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,1.98],[2.57,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2.25,-0.252],[0,-2.34],[0,0],[0,0]],"v":[[410.16,44.5],[412.14,44.5],[412.14,38.848],[414.33,38.848],[417.88,44.5],[420.18,44.5],[416.44,38.632],[419.95,35.068],[415.74,31.45],[410.16,31.45]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":18,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":20,"ty":4,"nm":"Layer 27","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.83,0],[0,1.656],[1.45,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.83,0],[0,-1.62],[-1.81,-0.396],[0,0],[0,-0.72],[0.99,0],[0.16,0.918]],"o":[[0.31,1.368],[2.15,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.91,0],[0,0],[-0.25,-1.35],[-1.95,0],[0,1.242],[0,0],[0.7,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[572.1,-35.534],[575.66,-33.248],[579.17,-36.02],[576.73,-38.576],[575.79,-38.774],[574.24,-39.926],[575.74,-41.06],[577.5,-39.764],[579.03,-40.304],[575.63,-42.536],[572.32,-39.836],[574.94,-37.316],[575.88,-37.118],[577.19,-35.948],[575.56,-34.76],[573.63,-36.146]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.42,0],[-0.19,-0.108],[0,0],[0.43,0],[0.4,-1.008],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.422],[0.31,0],[0,0],[-0.16,-0.09],[-0.9,0],[0,0],[0,0],[0,0],[0,0]],"v":[[567.99,-33.5],[567.99,-38.342],[570.24,-40.7],[571.03,-40.556],[571.03,-42.374],[570.21,-42.518],[567.92,-41.042],[567.83,-42.302],[566.08,-42.302],[566.08,-33.5]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[-1.35,0],[-0.08,-1.386]],"o":[[0.16,-1.386],[1.43,0],[0,0]],"v":[[557.08,-38.666],[559.58,-40.934],[562.09,-38.666]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,-2.754],[-2.66,0],[-0.56,1.476],[0,0],[1.08,0],[0.07,1.692],[0,0],[0,0.342],[2.59,0]],"o":[[0,2.808],[1.87,0],[0,0],[-0.34,0.882],[-1.63,0],[0,0],[0.06,-0.198],[0,-2.538],[-2.7,0]],"v":[[555.16,-37.874],[559.69,-33.248],[563.71,-35.642],[562.16,-36.326],[559.76,-34.85],[557.08,-37.442],[563.9,-37.442],[563.99,-38.288],[559.64,-42.536]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.28,0],[0,-1.53],[0,0],[0,0],[0,0],[-1.28,0],[0,-1.494],[0,0],[0,0],[0,0],[1.98,0],[0.49,-1.242],[1.44,0],[0.43,-0.99],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.728],[1.23,0],[0,0],[0,0],[0,0],[0,-1.728],[1.26,0],[0,0],[0,0],[0,0],[0,-2.322],[-1.35,0],[-0.43,-1.278],[-1.22,0],[0,0],[0,0],[0,0]],"v":[[539.56,-33.5],[541.48,-33.5],[541.48,-38.162],[543.66,-40.826],[545.43,-38.54],[545.43,-33.5],[547.33,-33.5],[547.33,-38.162],[549.51,-40.826],[551.28,-38.54],[551.28,-33.5],[553.2,-33.5],[553.2,-38.972],[550.05,-42.536],[547.06,-40.61],[544.18,-42.536],[541.41,-40.952],[541.25,-42.302],[539.56,-42.302]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,1.674],[-1.69,0],[0,-1.692],[1.71,0]],"o":[[0,-1.692],[1.71,0],[0,1.674],[-1.69,0]],"v":[[529.99,-37.892],[532.73,-40.844],[535.47,-37.892],[532.73,-34.958]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,-2.682],[-2.83,0],[0,2.664],[2.84,0]],"o":[[0,2.664],[2.84,0],[0,-2.682],[-2.83,0]],"v":[[528.05,-37.892],[532.73,-33.248],[537.43,-37.892],[532.73,-42.536]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[522.39,-33.5],[524.3,-33.5],[524.3,-40.646],[526.62,-40.646],[526.62,-42.302],[524.3,-42.302],[524.3,-44.948],[522.39,-44.948],[522.39,-42.302],[519.96,-42.302],[519.96,-40.646],[522.39,-40.646]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[-1.83,0],[0,1.656],[1.46,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.83,0],[0,-1.62],[-1.82,-0.396],[0,0],[0,-0.72],[0.99,0],[0.16,0.918]],"o":[[0.3,1.368],[2.14,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.92,0],[0,0],[-0.25,-1.35],[-1.95,0],[0,1.242],[0,0],[0.7,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[511.37,-35.534],[514.93,-33.248],[518.44,-36.02],[515.99,-38.576],[515.06,-38.774],[513.51,-39.926],[515,-41.06],[516.77,-39.764],[518.3,-40.304],[514.9,-42.536],[511.58,-39.836],[514.21,-37.316],[515.15,-37.118],[516.46,-35.948],[514.82,-34.76],[512.9,-36.146]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[-1.83,0],[-0.41,0.882],[-0.09,-0.378],[0,0],[0,0.774],[0,0],[0,0],[0,0],[1.41,0],[0,1.53],[0,0],[0,0]],"o":[[0,2.394],[1.34,0],[0.04,0.414],[0,0],[-0.09,-0.36],[0,0],[0,0],[0,0],[0,1.332],[-1.04,0],[0,0],[0,0],[0,0]],"v":[[501.34,-36.812],[504.63,-33.248],[507.42,-34.724],[507.59,-33.5],[509.42,-33.5],[509.26,-35.354],[509.26,-42.302],[507.33,-42.302],[507.33,-37.352],[505.19,-34.976],[503.25,-37.118],[503.25,-42.302],[501.34,-42.302]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,-2.772],[-2.67,0],[-0.56,1.71],[0,0],[1.22,0],[0,1.728],[-1.59,0],[-0.3,-1.008],[0,0],[2.04,0]],"o":[[0,2.772],[1.99,0],[0,0],[-0.33,0.99],[-1.57,0],[0,-1.764],[1.11,0],[0,0],[-0.47,-1.602],[-2.72,0]],"v":[[490.86,-37.874],[495.36,-33.248],[499.62,-36.02],[497.88,-36.65],[495.41,-34.994],[492.84,-37.892],[495.45,-40.826],[497.8,-39.206],[499.55,-39.872],[495.39,-42.536]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[480.34,-33.5],[482.25,-33.5],[482.25,-40.646],[484.57,-40.646],[484.57,-42.302],[482.25,-42.302],[482.25,-44.948],[480.34,-44.948],[480.34,-42.302],[477.91,-42.302],[477.91,-40.646],[480.34,-40.646]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.32,0],[0,-1.476],[0,0],[0,0],[0,0],[2.05,0],[0.42,-0.972],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.692],[1.33,0],[0,0],[0,0],[0,0],[0,-2.286],[-1.28,0],[0,0],[0,0],[0,0]],"v":[[468.28,-33.5],[470.19,-33.5],[470.19,-38.162],[472.44,-40.826],[474.27,-38.522],[474.27,-33.5],[476.18,-33.5],[476.18,-38.99],[472.98,-42.536],[470.11,-40.988],[469.95,-42.302],[468.28,-42.302]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[-1.35,0],[-0.07,-1.386]],"o":[[0.16,-1.386],[1.42,0],[0,0]],"v":[[459.28,-38.666],[461.78,-40.934],[464.28,-38.666]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,-2.754],[-2.67,0],[-0.56,1.476],[0,0],[1.08,0],[0.07,1.692],[0,0],[0,0.342],[2.6,0]],"o":[[0,2.808],[1.87,0],[0,0],[-0.34,0.882],[-1.64,0],[0,0],[0.05,-0.198],[0,-2.538],[-2.7,0]],"v":[[457.35,-37.874],[461.89,-33.248],[465.9,-35.642],[464.35,-36.326],[461.96,-34.85],[459.28,-37.442],[466.1,-37.442],[466.19,-38.288],[461.83,-42.536]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[447.93,-33.5],[449.84,-33.5],[449.84,-40.646],[453.31,-40.646],[453.31,-33.5],[455.22,-33.5],[455.22,-42.302],[449.84,-42.302],[449.84,-44.948],[447.93,-44.948],[447.93,-42.302],[445.64,-42.302],[445.64,-40.646],[447.93,-40.646]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[-0.72,0],[0,0.738],[0.72,0],[0,-0.738]],"o":[[0.74,0],[0,-0.738],[-0.72,0],[0,0.738]],"v":[[454.26,-43.814],[455.56,-45.056],[454.26,-46.28],[452.97,-45.056]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[1.36,0],[0,0.846],[-1.39,0],[0,0],[0,0]],"o":[[-1.08,0],[0,-0.972],[0,0],[0,0],[0,1.134]],"v":[[439.79,-34.616],[438.08,-36.002],[440.2,-37.46],[442.11,-37.46],[442.11,-36.488]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.38,0.864],[-0.07,-0.324],[0,0],[0,0.72],[0,0],[2.17,0],[0.32,-1.674],[0,0],[-1.18,0],[0,-1.044],[0,0],[0,0],[0,-1.908]],"o":[[1.44,0],[0.02,0.504],[0,0],[-0.1,-0.306],[0,0],[0,-2.286],[-1.93,0],[0,0],[0.1,-0.846],[1.1,0],[0,0],[0,0],[-2.22,0],[0,1.53]],"v":[[439.23,-33.248],[442.27,-34.796],[442.41,-33.5],[444.21,-33.5],[444.02,-35.48],[444.02,-39.296],[440.33,-42.536],[436.46,-39.998],[438.17,-39.602],[440.25,-41.006],[442.11,-39.422],[442.11,-38.63],[439.95,-38.63],[436.15,-35.822]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[1.64,0],[0,1.728],[-1.66,0],[0,-1.746]],"o":[[-1.66,0],[0,-1.746],[1.64,0],[0,1.728]],"v":[[430.03,-34.94],[427.46,-37.892],[430.03,-40.844],[432.59,-37.892]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.29,0],[0,2.682],[2.56,0],[0.56,-1.116],[0,0],[0,0]],"o":[[0,0],[0,0],[0.58,1.026],[2.56,0],[0,-2.7],[-1.36,0],[0,0],[0,0],[0,0]],"v":[[425.51,-29.81],[427.42,-29.81],[427.42,-34.85],[430.44,-33.248],[434.55,-37.892],[430.44,-42.536],[427.33,-40.79],[427.17,-42.302],[425.51,-42.302]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.31,0],[0,-1.476],[0,0],[0,0],[0,0],[2.05,0],[0.41,-0.972],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.692],[1.33,0],[0,0],[0,0],[0,0],[0,-2.286],[-1.28,0],[0,0],[0,0],[0,0]],"v":[[415.1,-33.5],[417.01,-33.5],[417.01,-38.162],[419.26,-40.826],[421.1,-38.522],[421.1,-33.5],[423.01,-33.5],[423.01,-38.99],[419.8,-42.536],[416.94,-40.988],[416.78,-42.302],[415.1,-42.302]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[412.14,-46.55],[410.16,-46.55],[410.16,-33.5],[412.14,-33.5]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":24,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":21,"ty":4,"nm":"Layer 26","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.84,0],[0,1.656],[1.46,0.27],[0,0],[0,0.594],[-0.9,0],[-0.16,-0.81],[0,0],[1.84,0],[0,-1.62],[-1.82,-0.396],[0,0],[0,-0.72],[0.99,0],[0.17,0.918]],"o":[[0.31,1.368],[2.14,0],[0,-1.476],[0,0],[-1.06,-0.216],[0,-0.72],[0.92,0],[0,0],[-0.25,-1.35],[-1.94,0],[0,1.242],[0,0],[0.71,0.144],[0,0.792],[-0.99,0],[0,0]],"v":[[536.71,-113.534],[540.28,-111.248],[543.79,-114.02],[541.34,-116.576],[540.4,-116.774],[538.86,-117.926],[540.35,-119.06],[542.11,-117.764],[543.64,-118.304],[540.24,-120.536],[536.93,-117.836],[539.56,-115.316],[540.49,-115.118],[541.81,-113.948],[540.17,-112.76],[538.24,-114.146]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-1.35,0],[-0.07,-1.386]],"o":[[0.16,-1.386],[1.42,0],[0,0]],"v":[[528.29,-116.666],[530.79,-118.934],[533.29,-116.666]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-2.754],[-2.66,0],[-0.55,1.476],[0,0],[1.08,0],[0.07,1.692],[0,0],[0,0.342],[2.59,0]],"o":[[0,2.808],[1.87,0],[0,0],[-0.35,0.882],[-1.64,0],[0,0],[0.06,-0.198],[0,-2.538],[-2.7,0]],"v":[[526.36,-115.874],[530.9,-111.248],[534.91,-113.642],[533.37,-114.326],[530.97,-112.85],[528.29,-115.442],[535.11,-115.442],[535.2,-116.288],[530.85,-120.536]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.28,0],[0,-1.53],[0,0],[0,0],[0,0],[-1.28,0],[0,-1.494],[0,0],[0,0],[0,0],[1.98,0],[0.49,-1.242],[1.44,0],[0.43,-0.99],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.728],[1.22,0],[0,0],[0,0],[0,0],[0,-1.728],[1.26,0],[0,0],[0,0],[0,0],[0,-2.322],[-1.35,0],[-0.43,-1.278],[-1.22,0],[0,0],[0,0],[0,0]],"v":[[510.76,-111.5],[512.69,-111.5],[512.69,-116.162],[514.87,-118.826],[516.63,-116.54],[516.63,-111.5],[518.54,-111.5],[518.54,-116.162],[520.72,-118.826],[522.48,-116.54],[522.48,-111.5],[524.41,-111.5],[524.41,-116.972],[521.26,-120.536],[518.27,-118.61],[515.39,-120.536],[512.62,-118.952],[512.46,-120.302],[510.76,-120.302]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[500.89,-111.5],[502.8,-111.5],[502.8,-118.646],[506.27,-118.646],[506.27,-111.5],[508.18,-111.5],[508.18,-120.302],[502.8,-120.302],[502.8,-122.948],[500.89,-122.948],[500.89,-120.302],[498.6,-120.302],[498.6,-118.646],[500.89,-118.646]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[-0.72,0],[0,0.738],[0.72,0],[0,-0.738]],"o":[[0.73,0],[0,-0.738],[-0.72,0],[0,0.738]],"v":[[507.23,-121.814],[508.52,-123.056],[507.23,-124.28],[505.93,-123.056]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[1.66,0],[0,1.728],[-1.64,0],[0,-1.728]],"o":[[-1.64,0],[0,-1.728],[1.66,0],[0,1.728]],"v":[[487.25,-112.94],[484.71,-115.892],[487.25,-118.844],[489.81,-115.892]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[-2.54,0],[-0.54,1.152],[-0.07,-0.522],[0,0],[0,0.882],[0,0],[0,0],[0,0],[1.32,0],[0,-2.7]],"o":[[1.42,0],[0,0.54],[0,0],[-0.1,-0.432],[0,0],[0,0],[0,0],[-0.54,-1.062],[-2.55,0],[0,2.682]],"v":[[486.82,-111.248],[489.99,-113.03],[490.11,-111.5],[492,-111.5],[491.79,-114.02],[491.79,-124.55],[489.88,-124.55],[489.88,-118.916],[486.87,-120.536],[482.73,-115.892]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[480.58,-111.5],[480.58,-124.55],[478.67,-124.55],[478.67,-111.5]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,1.674],[-1.69,0],[0,-1.692],[1.71,0]],"o":[[0,-1.692],[1.71,0],[0,1.674],[-1.69,0]],"v":[[469.07,-115.892],[471.8,-118.844],[474.54,-115.892],[471.8,-112.958]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,-2.682],[-2.82,0],[0,2.664],[2.85,0]],"o":[[0,2.664],[2.85,0],[0,-2.682],[-2.82,0]],"v":[[467.12,-115.892],[471.8,-111.248],[476.5,-115.892],[471.8,-120.536]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.31,0],[0,-1.476],[0,0],[0,0],[0,0],[2.06,0],[0.47,-0.918],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.692],[1.34,0],[0,0],[0,0],[0,0],[0,-2.286],[-1.22,0],[0,0],[0,0],[0,0]],"v":[[457.28,-111.5],[459.18,-111.5],[459.18,-116.162],[461.43,-118.826],[463.27,-116.522],[463.27,-111.5],[465.18,-111.5],[465.18,-116.99],[461.97,-120.536],[459.18,-119.096],[459.18,-124.55],[457.28,-124.55]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[2.26,0],[0,0.918],[-0.71,0.126],[0,0],[0,-0.81]],"o":[[-1.66,0],[0,-0.576],[0,0],[0.99,0],[0,0.882]],"v":[[445.56,-108.782],[443.02,-109.97],[444.21,-111.14],[447,-111.14],[448.58,-110.078]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[1.15,0],[0,1.044],[-1.17,0],[0,-1.062]],"o":[[-1.17,0],[0,-1.044],[1.15,0],[0,1.044]],"v":[[445.77,-115.586],[443.83,-117.35],[445.77,-119.132],[447.7,-117.332]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[-2.56,0],[0,2.052],[2.07,0],[0,0],[0,0.396],[-0.63,0.072],[-0.25,0],[0,1.854],[0.63,0.558],[-0.88,-0.018],[0,0],[0.31,-1.188],[0.61,0],[0,-1.872],[-1.15,-0.504],[0,-0.738],[-0.68,-0.144],[0,-1.062]],"o":[[3.29,0],[0,-1.692],[0,0],[-1.08,0],[0,-0.396],[0.24,0.036],[2.2,0],[0,-0.936],[0.3,-0.45],[0,0],[-1.42,-0.144],[-0.49,-0.234],[-2.21,0],[0,1.278],[-1.08,0.234],[0,0.576],[-1.26,0.162],[0,1.674]],"v":[[445.56,-107.576],[450.58,-110.42],[447.41,-112.868],[445.39,-112.868],[443.88,-113.48],[444.96,-114.254],[445.75,-114.2],[449.44,-117.35],[448.44,-119.636],[450.34,-120.302],[450.34,-121.958],[447.5,-120.176],[445.77,-120.536],[442.1,-117.332],[443.95,-114.578],[442.28,-112.976],[443.41,-111.716],[441.31,-109.736]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.32,0],[0,-1.476],[0,0],[0,0],[0,0],[2.05,0],[0.41,-0.972],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.692],[1.33,0],[0,0],[0,0],[0,0],[0,-2.286],[-1.28,0],[0,0],[0,0],[0,0]],"v":[[431.91,-111.5],[433.82,-111.5],[433.82,-116.162],[436.07,-118.826],[437.9,-116.522],[437.9,-111.5],[439.81,-111.5],[439.81,-116.99],[436.61,-120.536],[433.75,-118.988],[433.58,-120.302],[431.91,-120.302]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,1.674],[-1.69,0],[0,-1.692],[1.71,0]],"o":[[0,-1.692],[1.71,0],[0,1.674],[-1.69,0]],"v":[[422.35,-115.892],[425.08,-118.844],[427.82,-115.892],[425.08,-112.958]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,-2.682],[-2.82,0],[0,2.664],[2.85,0]],"o":[[0,2.664],[2.85,0],[0,-2.682],[-2.82,0]],"v":[[420.4,-115.892],[425.08,-111.248],[429.78,-115.892],[425.08,-120.536]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[418.6,-111.5],[418.6,-113.264],[412.14,-113.264],[412.14,-124.55],[410.16,-124.55],[410.16,-111.5]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":20,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":22,"ty":4,"nm":"Layer 25","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[363.5,81.5],[601.5,81.5],[601.5,150.5],[363.5,150.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":23,"ty":4,"nm":"Layer 24","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[363.5,3.5],[601.5,3.5],[601.5,72.5],[363.5,72.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":24,"ty":4,"nm":"Layer 23","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[363.5,-74.5],[601.5,-74.5],[601.5,-5.5],[363.5,-5.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":25,"ty":4,"nm":"Layer 22","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[363.5,-152.5],[601.5,-152.5],[601.5,-83.5],[363.5,-83.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":26,"ty":4,"nm":"Layer 21","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[301.052,-27.02],[311.948,-27.02],[311.948,-30.764],[301.052,-30.764]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[301.052,-33.524],[311.948,-33.524],[311.948,-37.316],[301.052,-37.316]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":27,"ty":4,"nm":"Layer 20","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-11.046,0],[0,-11.046],[11.046,0],[0,11.046]],"o":[[11.046,0],[0,11.046],[-11.046,0],[0,-11.046]],"v":[[306.5,-52.5],[326.5,-32.5],[306.5,-12.5],[286.5,-32.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.592156887054,0.592156887054,0.592156887054,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":28,"ty":4,"nm":"Layer 19","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[68.566,-38.028],[63.934,-38.028],[63.934,-34.164],[68.566,-34.164],[68.566,-29.532],[72.526,-29.532],[72.526,-34.164],[77.062,-34.164],[77.062,-38.028],[72.526,-38.028],[72.526,-42.708],[68.566,-42.708]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":29,"ty":4,"nm":"Layer 18","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-11.046,0],[0,-11.046],[11.046,0],[0,11.046]],"o":[[11.046,0],[0,11.046],[-11.046,0],[0,-11.046]],"v":[[70.5,-56.5],[90.5,-36.5],[70.5,-16.5],[50.5,-36.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.592156887054,0.592156887054,0.592156887054,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":30,"ty":4,"nm":"Layer 17","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-167.434,-38.028],[-172.066,-38.028],[-172.066,-34.164],[-167.434,-34.164],[-167.434,-29.532],[-163.474,-29.532],[-163.474,-34.164],[-158.938,-34.164],[-158.938,-38.028],[-163.474,-38.028],[-163.474,-42.708],[-167.434,-42.708]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":31,"ty":4,"nm":"Layer 16","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-11.046,0],[0,-11.046],[11.046,0],[0,11.046]],"o":[[11.046,0],[0,11.046],[-11.046,0],[0,-11.046]],"v":[[-165.5,-56.5],[-145.5,-36.5],[-165.5,-16.5],[-185.5,-36.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.592156887054,0.592156887054,0.592156887054,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":32,"ty":4,"nm":"Layer 15","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-403.434,-38.028],[-408.066,-38.028],[-408.066,-34.164],[-403.434,-34.164],[-403.434,-29.532],[-399.474,-29.532],[-399.474,-34.164],[-394.938,-34.164],[-394.938,-38.028],[-399.474,-38.028],[-399.474,-42.708],[-403.434,-42.708]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":33,"ty":4,"nm":"Layer 14","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-11.046,0],[0,-11.046],[11.046,0],[0,11.046]],"o":[[11.046,0],[0,11.046],[-11.046,0],[0,-11.046]],"v":[[-401.5,-56.5],[-381.5,-36.5],[-401.5,-16.5],[-421.5,-36.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.592156887054,0.592156887054,0.592156887054,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":34,"ty":4,"nm":"Layer 13","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[221.737,104.5],[221.737,99.514],[224.077,97.03],[224.887,97.174],[224.887,95.68],[224.077,95.536],[221.683,97.084],[221.611,95.752],[220.189,95.752],[220.189,104.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[210.829,99.442],[213.619,96.85],[216.427,99.442]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[209.245,100.162],[213.727,104.734],[217.669,102.358],[216.409,101.8],[213.763,103.42],[210.811,100.486],[217.885,100.486],[217.957,99.73],[213.673,95.518]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[202.698,104.5],[204.318,104.5],[207.936,95.752],[206.262,95.752],[203.526,102.7],[200.79,95.752],[199.062,95.752]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[190.122,100.126],[193.146,96.904],[196.17,100.126],[193.146,103.348]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[188.538,100.126],[193.146,104.734],[197.772,100.126],[193.146,95.518]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[178.74,104.5],[180.288,104.5],[180.288,99.892],[182.808,96.922],[184.86,99.478],[184.86,104.5],[186.408,104.5],[186.408,99.1],[183.186,95.518],[180.234,97.192],[180.108,95.752],[178.74,95.752]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[173.485,104.5],[173.485,99.514],[175.825,97.03],[176.635,97.174],[176.635,95.68],[175.825,95.536],[173.431,97.084],[173.359,95.752],[171.937,95.752],[171.937,104.5]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[-1.782,0],[-0.432,0.936],[-0.09,-0.414],[0,0],[0,0.702],[0,0],[0,0],[0,0],[1.566,0],[0,1.746],[0,0],[0,0]],"o":[[0,2.502],[1.35,0],[0.036,0.45],[0,0],[-0.09,-0.36],[0,0],[0,0],[0,0],[0,1.458],[-1.152,0],[0,0],[0,0],[0,0]],"v":[[161.475,101.134],[164.787,104.734],[167.649,103.186],[167.811,104.5],[169.305,104.5],[169.143,102.736],[169.143,95.752],[167.595,95.752],[167.595,100.702],[165.201,103.33],[163.023,100.936],[163.023,95.752],[161.475,95.752]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[155.58,104.5],[157.128,104.5],[157.128,97.084],[159.486,97.084],[159.486,95.752],[157.128,95.752],[157.128,93.07],[155.58,93.07],[155.58,95.752],[153.114,95.752],[153.114,97.084],[155.58,97.084]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.468,-1.026],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[199.448,80.5],[200.996,80.5],[200.996,75.892],[203.516,72.922],[205.568,75.478],[205.568,80.5],[207.116,80.5],[207.116,75.1],[203.894,71.518],[200.996,73.12],[200.996,67.45],[199.448,67.45]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[2.502,0],[0,1.026],[-0.846,0.144],[0,0],[0,-0.918]],"o":[[-1.782,0],[0,-0.648],[0,0],[1.08,0],[0,0.972]],"v":[[192.491,83.362],[189.737,82.03],[191.123,80.698],[193.985,80.698],[195.749,81.904]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[1.26,0],[0,1.152],[-1.278,0],[0,-1.17]],"o":[[-1.278,0],[0,-1.17],[1.26,0],[0,1.17]],"v":[[192.689,76.63],[190.565,74.686],[192.689,72.706],[194.795,74.686]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[-2.502,0],[0,2.034],[1.998,0],[0,0],[0,0.45],[-0.684,0.09],[-0.252,0],[0,1.818],[0.63,0.576],[-0.954,-0.018],[0,0],[0.306,-1.152],[0.63,0],[0,-1.836],[-1.098,-0.504],[0,-0.702],[-0.684,-0.144],[0,-1.08]],"o":[[3.168,0],[0,-1.602],[0,0],[-1.206,0],[0,-0.432],[0.252,0.054],[2.106,0],[0,-0.936],[0.288,-0.522],[0,0],[-1.386,-0.144],[-0.486,-0.252],[-2.124,0],[0,1.26],[-1.026,0.252],[0,0.558],[-1.26,0.162],[0,1.674]],"v":[[192.491,84.406],[197.369,81.652],[194.327,79.276],[192.329,79.276],[190.673,78.592],[191.843,77.728],[192.671,77.8],[196.217,74.686],[195.227,72.382],[197.207,71.572],[197.207,70.186],[194.453,71.914],[192.689,71.518],[189.161,74.686],[190.925,77.422],[189.341,78.97],[190.457,80.194],[188.333,82.228]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[185.015,80.5],[186.563,80.5],[186.563,71.752],[185.015,71.752]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[185.789,70.096],[186.941,68.98],[185.789,67.882],[184.637,68.98]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[173.003,80.5],[173.003,74.686],[180.275,74.686],[180.275,80.5],[181.877,80.5],[181.877,67.45],[180.275,67.45],[180.275,73.246],[173.003,73.246],[173.003,67.45],[171.401,67.45],[171.401,80.5]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":18,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":35,"ty":4,"nm":"Layer 8","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-41.698,0],[0,0],[0,-41.698],[0,0],[41.698,0],[0,0],[0,41.698],[0,0]],"o":[[0,0],[41.698,0],[0,0],[0,41.698],[0,0],[-41.698,0],[0,0],[0,-41.698]],"v":[[186,-111.5],[191,-111.5],[266.5,-36],[266.5,-36],[191,39.5],[186,39.5],[110.5,-36],[110.5,-36]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":36,"ty":4,"nm":"Layer 7","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[2.502,0],[0,1.026],[-0.846,0.144],[0,0],[0,-0.918]],"o":[[-1.782,0],[0,-0.648],[0,0],[1.08,0],[0,0.972]],"v":[[-20.728,107.362],[-23.482,106.03],[-22.096,104.698],[-19.234,104.698],[-17.47,105.904]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[1.26,0],[0,1.152],[-1.278,0],[0,-1.17]],"o":[[-1.278,0],[0,-1.17],[1.26,0],[0,1.17]],"v":[[-20.53,100.63],[-22.654,98.686],[-20.53,96.706],[-18.424,98.686]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[-2.502,0],[0,2.034],[1.998,0],[0,0],[0,0.45],[-0.684,0.09],[-0.252,0],[0,1.818],[0.63,0.576],[-0.954,-0.018],[0,0],[0.306,-1.152],[0.63,0],[0,-1.836],[-1.098,-0.504],[0,-0.702],[-0.684,-0.144],[0,-1.08]],"o":[[3.168,0],[0,-1.602],[0,0],[-1.206,0],[0,-0.432],[0.252,0.054],[2.106,0],[0,-0.936],[0.288,-0.522],[0,0],[-1.386,-0.144],[-0.486,-0.252],[-2.124,0],[0,1.26],[-1.026,0.252],[0,0.558],[-1.26,0.162],[0,1.674]],"v":[[-20.728,108.406],[-15.85,105.652],[-18.892,103.276],[-20.89,103.276],[-22.546,102.592],[-21.376,101.728],[-20.548,101.8],[-17.002,98.686],[-17.992,96.382],[-16.012,95.572],[-16.012,94.186],[-18.766,95.914],[-20.53,95.518],[-24.058,98.686],[-22.294,101.422],[-23.878,102.97],[-22.762,104.194],[-24.886,106.228]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-34.197,104.5],[-32.649,104.5],[-32.649,99.892],[-30.129,96.922],[-28.077,99.478],[-28.077,104.5],[-26.529,104.5],[-26.529,99.1],[-29.751,95.518],[-32.703,97.192],[-32.829,95.752],[-34.197,95.752]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-38.486,104.5],[-36.938,104.5],[-36.938,95.752],[-38.486,95.752]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-37.712,94.096],[-36.56,92.98],[-37.712,91.882],[-38.864,92.98]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-48.77,104.5],[-47.222,104.5],[-47.222,99.892],[-44.702,96.922],[-42.65,99.478],[-42.65,104.5],[-41.102,104.5],[-41.102,99.1],[-44.324,95.518],[-47.276,97.192],[-47.402,95.752],[-48.77,95.752]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-53.059,104.5],[-51.511,104.5],[-51.511,95.752],[-53.059,95.752]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-52.285,94.096],[-51.133,92.98],[-52.285,91.882],[-53.437,92.98]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-59.863,103.6],[-61.771,102.052],[-59.413,100.414],[-57.271,100.414],[-57.271,101.494]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-60.259,104.734],[-57.163,103.132],[-57.019,104.5],[-55.543,104.5],[-55.723,102.664],[-55.723,98.632],[-59.269,95.518],[-63.031,97.966],[-61.627,98.29],[-59.323,96.796],[-57.271,98.524],[-57.271,99.406],[-59.575,99.406],[-63.337,102.178]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-68.052,104.5],[-68.052,99.514],[-65.712,97.03],[-64.902,97.174],[-64.902,95.68],[-65.712,95.536],[-68.106,97.084],[-68.178,95.752],[-69.6,95.752],[-69.6,104.5]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-75.603,104.5],[-74.055,104.5],[-74.055,97.084],[-71.697,97.084],[-71.697,95.752],[-74.055,95.752],[-74.055,93.07],[-75.603,93.07],[-75.603,95.752],[-78.069,95.752],[-78.069,97.084],[-75.603,97.084]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-12.014,75.442],[-9.224,72.85],[-6.416,75.442]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-13.598,76.162],[-9.116,80.734],[-5.174,78.358],[-6.434,77.8],[-9.08,79.42],[-12.032,76.486],[-4.958,76.486],[-4.886,75.73],[-9.17,71.518]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-20.144,80.5],[-18.524,80.5],[-14.906,71.752],[-16.58,71.752],[-19.316,78.7],[-22.052,71.752],[-23.78,71.752]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-27.403,80.5],[-25.855,80.5],[-25.855,71.752],[-27.403,71.752]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-26.629,70.096],[-25.477,68.98],[-26.629,67.882],[-27.781,68.98]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[-36.434,78.412],[-32.978,80.734],[-29.63,78.052],[-31.97,75.568],[-33.032,75.334],[-34.652,74.056],[-32.978,72.778],[-31.052,74.182],[-29.774,73.75],[-33.05,71.518],[-36.2,74.128],[-33.59,76.594],[-32.672,76.792],[-31.232,78.106],[-33.05,79.474],[-35.156,77.944]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-46.159,80.5],[-44.611,80.5],[-44.611,75.892],[-42.091,72.922],[-40.039,75.478],[-40.039,80.5],[-38.491,80.5],[-38.491,75.1],[-41.713,71.518],[-44.665,73.192],[-44.791,71.752],[-46.159,71.752]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-55.519,75.442],[-52.729,72.85],[-49.921,75.442]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-57.103,76.162],[-52.621,80.734],[-48.679,78.358],[-49.939,77.8],[-52.585,79.42],[-55.537,76.486],[-48.463,76.486],[-48.391,75.73],[-52.675,71.518]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[1.782,0],[0,1.89],[-1.782,0],[0,-1.89]],"o":[[-1.782,0],[0,-1.89],[1.782,0],[0,1.89]],"v":[[-63.283,79.366],[-66.055,76.126],[-63.283,72.904],[-60.511,76.126]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.35,0],[0,2.646],[2.538,0],[0.576,-1.242],[0,0],[0,0]],"o":[[0,0],[0,0],[0.594,1.134],[2.538,0],[0,-2.646],[-1.422,0],[0,0],[0,0],[0,0]],"v":[[-67.657,84.19],[-66.109,84.19],[-66.109,78.988],[-62.977,80.734],[-58.927,76.126],[-62.977,71.518],[-66.199,73.444],[-66.325,71.752],[-67.657,71.752]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-71.781,71.752],[-73.923,74.938],[-76.047,71.752],[-77.883,71.752],[-74.949,75.946],[-77.991,80.5],[-76.191,80.5],[-73.923,77.098],[-71.601,80.5],[-69.801,80.5],[-72.861,75.964],[-69.945,71.752]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-79.917,80.5],[-79.917,79.06],[-86.631,79.06],[-86.631,74.47],[-80.763,74.47],[-80.763,73.12],[-86.631,73.12],[-86.631,68.872],[-79.971,68.872],[-79.971,67.45],[-88.233,67.45],[-88.233,80.5]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":27,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":37,"ty":4,"nm":"Layer 6","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[-250.257,102.412],[-246.801,104.734],[-243.453,102.052],[-245.793,99.568],[-246.855,99.334],[-248.475,98.056],[-246.801,96.778],[-244.875,98.182],[-243.597,97.75],[-246.873,95.518],[-250.023,98.128],[-247.413,100.594],[-246.495,100.792],[-245.055,102.106],[-246.873,103.474],[-248.979,101.944]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-259.06,99.442],[-256.27,96.85],[-253.462,99.442]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-260.644,100.162],[-256.162,104.734],[-252.22,102.358],[-253.48,101.8],[-256.126,103.42],[-259.078,100.486],[-252.004,100.486],[-251.932,99.73],[-256.216,95.518]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[2.502,0],[0,1.026],[-0.846,0.144],[0,0],[0,-0.918]],"o":[[-1.782,0],[0,-0.648],[0,0],[1.08,0],[0,0.972]],"v":[[-266.412,107.362],[-269.166,106.03],[-267.78,104.698],[-264.918,104.698],[-263.154,105.904]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[1.26,0],[0,1.152],[-1.278,0],[0,-1.17]],"o":[[-1.278,0],[0,-1.17],[1.26,0],[0,1.17]],"v":[[-266.214,100.63],[-268.338,98.686],[-266.214,96.706],[-264.108,98.686]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[-2.502,0],[0,2.034],[1.998,0],[0,0],[0,0.45],[-0.684,0.09],[-0.252,0],[0,1.818],[0.63,0.576],[-0.954,-0.018],[0,0],[0.306,-1.152],[0.63,0],[0,-1.836],[-1.098,-0.504],[0,-0.702],[-0.684,-0.144],[0,-1.08]],"o":[[3.168,0],[0,-1.602],[0,0],[-1.206,0],[0,-0.432],[0.252,0.054],[2.106,0],[0,-0.936],[0.288,-0.522],[0,0],[-1.386,-0.144],[-0.486,-0.252],[-2.124,0],[0,1.26],[-1.026,0.252],[0,0.558],[-1.26,0.162],[0,1.674]],"v":[[-266.412,108.406],[-261.534,105.652],[-264.576,103.276],[-266.574,103.276],[-268.23,102.592],[-267.06,101.728],[-266.232,101.8],[-262.686,98.686],[-263.676,96.382],[-261.696,95.572],[-261.696,94.186],[-264.45,95.914],[-266.214,95.518],[-269.742,98.686],[-267.978,101.422],[-269.562,102.97],[-268.446,104.194],[-270.57,106.228]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-276.384,103.6],[-278.292,102.052],[-275.934,100.414],[-273.792,100.414],[-273.792,101.494]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-276.78,104.734],[-273.684,103.132],[-273.54,104.5],[-272.064,104.5],[-272.244,102.664],[-272.244,98.632],[-275.79,95.518],[-279.552,97.966],[-278.148,98.29],[-275.844,96.796],[-273.792,98.524],[-273.792,99.406],[-276.096,99.406],[-279.858,102.178]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-285.111,104.5],[-283.563,104.5],[-283.563,97.084],[-281.205,97.084],[-281.205,95.752],[-283.563,95.752],[-283.563,93.07],[-285.111,93.07],[-285.111,95.752],[-287.577,95.752],[-287.577,97.084],[-285.111,97.084]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-292.677,104.5],[-292.677,99.514],[-290.337,97.03],[-289.527,97.174],[-289.527,95.68],[-290.337,95.536],[-292.731,97.084],[-292.803,95.752],[-294.225,95.752],[-294.225,104.5]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[-304.148,100.126],[-301.124,96.904],[-298.1,100.126],[-301.124,103.348]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[-305.732,100.126],[-301.124,104.734],[-296.498,100.126],[-301.124,95.518]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.468,-1.026],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[-315.511,104.5],[-313.963,104.5],[-313.963,99.892],[-311.443,96.922],[-309.391,99.478],[-309.391,104.5],[-307.843,104.5],[-307.843,99.1],[-311.065,95.518],[-313.963,97.12],[-313.963,91.45],[-315.511,91.45]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[-324.595,102.412],[-321.139,104.734],[-317.791,102.052],[-320.131,99.568],[-321.193,99.334],[-322.813,98.056],[-321.139,96.778],[-319.213,98.182],[-317.935,97.75],[-321.211,95.518],[-324.361,98.128],[-321.751,100.594],[-320.833,100.792],[-319.393,102.106],[-321.211,103.474],[-323.317,101.944]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-262.664,80.5],[-261.116,80.5],[-261.116,73.084],[-258.758,73.084],[-258.758,71.752],[-261.116,71.752],[-261.116,69.07],[-262.664,69.07],[-262.664,71.752],[-265.13,71.752],[-265.13,73.084],[-262.664,73.084]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-274.678,80.5],[-273.13,80.5],[-273.13,75.892],[-270.61,72.922],[-268.558,75.478],[-268.558,80.5],[-267.01,80.5],[-267.01,75.1],[-270.232,71.518],[-273.184,73.192],[-273.31,71.752],[-274.678,71.752]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-284.038,75.442],[-281.248,72.85],[-278.44,75.442]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-285.622,76.162],[-281.14,80.734],[-277.198,78.358],[-278.458,77.8],[-281.104,79.42],[-284.056,76.486],[-276.982,76.486],[-276.91,75.73],[-281.194,71.518]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[2.502,0],[0,1.026],[-0.846,0.144],[0,0],[0,-0.918]],"o":[[-1.782,0],[0,-0.648],[0,0],[1.08,0],[0,0.972]],"v":[[-291.39,83.362],[-294.144,82.03],[-292.758,80.698],[-289.896,80.698],[-288.132,81.904]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[1.26,0],[0,1.152],[-1.278,0],[0,-1.17]],"o":[[-1.278,0],[0,-1.17],[1.26,0],[0,1.17]],"v":[[-291.192,76.63],[-293.316,74.686],[-291.192,72.706],[-289.086,74.686]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[-2.502,0],[0,2.034],[1.998,0],[0,0],[0,0.45],[-0.684,0.09],[-0.252,0],[0,1.818],[0.63,0.576],[-0.954,-0.018],[0,0],[0.306,-1.152],[0.63,0],[0,-1.836],[-1.098,-0.504],[0,-0.702],[-0.684,-0.144],[0,-1.08]],"o":[[3.168,0],[0,-1.602],[0,0],[-1.206,0],[0,-0.432],[0.252,0.054],[2.106,0],[0,-0.936],[0.288,-0.522],[0,0],[-1.386,-0.144],[-0.486,-0.252],[-2.124,0],[0,1.26],[-1.026,0.252],[0,0.558],[-1.26,0.162],[0,1.674]],"v":[[-291.39,84.406],[-286.512,81.652],[-289.554,79.276],[-291.552,79.276],[-293.208,78.592],[-292.038,77.728],[-291.21,77.8],[-287.664,74.686],[-288.654,72.382],[-286.674,71.572],[-286.674,70.186],[-289.428,71.914],[-291.192,71.518],[-294.72,74.686],[-292.956,77.422],[-294.54,78.97],[-293.424,80.194],[-295.548,82.228]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-305.652,75.946],[-303.042,68.926],[-300.36,75.946]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-308.946,80.5],[-307.326,80.5],[-306.12,77.296],[-299.874,77.296],[-298.632,80.5],[-296.976,80.5],[-301.944,67.45],[-304.104,67.45]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":24,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":38,"ty":4,"nm":"Layer 5","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-484.127,99.443],[-481.337,96.851],[-478.529,99.443]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-485.711,100.163],[-481.229,104.735],[-477.287,102.359],[-478.547,101.801],[-481.193,103.421],[-484.145,100.487],[-477.071,100.487],[-476.999,99.731],[-481.283,95.519]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.422,0],[0,-1.692],[0,0],[0,0],[0,0],[-1.44,0],[0,-1.656],[0,0],[0,0],[0,0],[1.98,0],[0.486,-1.314],[1.476,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.926],[1.386,0],[0,0],[0,0],[0,0],[0,-1.926],[1.404,0],[0,0],[0,0],[0,0],[0,-2.394],[-1.386,0],[-0.432,-1.35],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[-501.327,104.501],[-499.761,104.501],[-499.761,99.893],[-497.331,96.923],[-495.351,99.461],[-495.351,104.501],[-493.803,104.501],[-493.803,99.893],[-491.355,96.923],[-489.393,99.461],[-489.393,104.501],[-487.827,104.501],[-487.827,99.119],[-490.977,95.519],[-494.037,97.535],[-496.953,95.519],[-499.815,97.211],[-499.941,95.753],[-501.327,95.753]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[-1.782,0],[-0.432,0.936],[-0.09,-0.414],[0,0],[0,0.702],[0,0],[0,0],[0,0],[1.566,0],[0,1.746],[0,0],[0,0]],"o":[[0,2.502],[1.35,0],[0.036,0.45],[0,0],[-0.09,-0.36],[0,0],[0,0],[0,0],[0,1.458],[-1.152,0],[0,0],[0,0],[0,0]],"v":[[-511.79,101.135],[-508.478,104.735],[-505.616,103.187],[-505.454,104.501],[-503.96,104.501],[-504.122,102.737],[-504.122,95.753],[-505.67,95.753],[-505.67,100.703],[-508.064,103.331],[-510.242,100.937],[-510.242,95.753],[-511.79,95.753]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-514.403,104.501],[-514.403,91.451],[-515.951,91.451],[-515.951,104.501]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[-525.911,100.127],[-522.886,96.905],[-519.863,100.127],[-522.886,103.349]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.789,0]],"o":[[0,2.61],[2.789,0],[0,-2.61],[-2.772,0]],"v":[[-527.495,100.127],[-522.886,104.735],[-518.261,100.127],[-522.886,95.519]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-534.023,104.501],[-532.403,104.501],[-528.785,95.753],[-530.459,95.753],[-533.195,102.701],[-535.931,95.753],[-537.659,95.753]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-544.603,104.501],[-544.603,91.451],[-546.151,91.451],[-546.151,104.501]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-548.962,104.501],[-548.962,91.451],[-550.51,91.451],[-550.51,104.501]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-557.35,103.601],[-559.258,102.053],[-556.9,100.415],[-554.758,100.415],[-554.758,101.495]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-557.746,104.735],[-554.65,103.133],[-554.506,104.501],[-553.03,104.501],[-553.21,102.665],[-553.21,98.633],[-556.756,95.519],[-560.518,97.967],[-559.114,98.291],[-556.81,96.797],[-554.758,98.525],[-554.758,99.407],[-557.062,99.407],[-560.824,102.179]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,-2.736],[-2.592,0],[-0.576,1.692],[0,0],[1.332,0],[0,1.908],[-1.746,0],[-0.342,-1.08],[0,0],[1.944,0]],"o":[[0,2.736],[1.944,0],[0,0],[-0.36,1.098],[-1.728,0],[0,-1.926],[1.224,0],[0,0],[-0.468,-1.548],[-2.664,0]],"v":[[-570.947,100.163],[-566.555,104.735],[-562.379,102.035],[-563.801,101.495],[-566.501,103.331],[-569.345,100.127],[-566.465,96.905],[-563.873,98.669],[-562.469,98.111],[-566.501,95.519]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-471.532,75.443],[-468.742,72.851],[-465.934,75.443]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-473.116,76.163],[-468.634,80.735],[-464.692,78.359],[-465.952,77.801],[-468.598,79.421],[-471.55,76.487],[-464.476,76.487],[-464.404,75.731],[-468.688,71.519]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-475.442,80.501],[-475.442,67.451],[-476.99,67.451],[-476.99,80.501]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[1.782,0],[0,1.926],[-1.746,0],[0,-1.872]],"o":[[-1.746,0],[0,-1.908],[1.782,0],[0,1.89]],"v":[[-483.654,79.367],[-486.426,76.127],[-483.654,72.905],[-480.882,76.127]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[-1.422,0],[0,2.646],[2.538,0],[0.576,-1.152],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[2.538,0],[0,-2.646],[-1.368,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0.576,1.26]],"v":[[-483.348,80.735],[-479.298,76.127],[-483.348,71.519],[-486.48,73.301],[-486.48,67.451],[-488.028,67.451],[-488.046,80.501],[-486.696,80.501],[-486.57,78.809]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-494.886,79.601],[-496.794,78.053],[-494.436,76.415],[-492.294,76.415],[-492.294,77.495]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-495.282,80.735],[-492.186,79.133],[-492.042,80.501],[-490.566,80.501],[-490.746,78.665],[-490.746,74.633],[-494.292,71.519],[-498.054,73.967],[-496.65,74.291],[-494.346,72.797],[-492.294,74.525],[-492.294,75.407],[-494.598,75.407],[-498.36,78.179]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-503.613,80.501],[-502.065,80.501],[-502.065,73.085],[-499.707,73.085],[-499.707,71.753],[-502.065,71.753],[-502.065,69.071],[-503.613,69.071],[-503.613,71.753],[-506.079,71.753],[-506.079,73.085],[-503.613,73.085]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,-2.736],[-2.592,0],[-0.576,1.692],[0,0],[1.332,0],[0,1.908],[-1.746,0],[-0.342,-1.08],[0,0],[1.944,0]],"o":[[0,2.736],[1.944,0],[0,0],[-0.36,1.098],[-1.728,0],[0,-1.926],[1.224,0],[0,0],[-0.468,-1.548],[-2.664,0]],"v":[[-516.183,76.163],[-511.791,80.735],[-507.615,78.035],[-509.037,77.495],[-511.737,79.331],[-514.581,76.127],[-511.701,72.905],[-509.109,74.669],[-507.705,74.111],[-511.737,71.519]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-520.022,80.501],[-518.474,80.501],[-518.474,71.753],[-520.022,71.753]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-519.248,70.097],[-518.096,68.981],[-519.248,67.883],[-520.4,68.981]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[1.8,0],[0,1.89],[-1.782,0],[0,-1.872]],"o":[[-1.782,0],[0,-1.872],[1.8,0],[0,1.89]],"v":[[-527.243,79.367],[-529.997,76.127],[-527.243,72.905],[-524.471,76.127]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[-2.538,0],[-0.558,1.242],[-0.072,-0.594],[0,0],[0,0.828],[0,0],[0,0],[0,0],[1.386,0],[0,-2.646]],"o":[[1.458,0],[0,0.576],[0,0],[-0.108,-0.432],[0,0],[0,0],[0,0],[-0.558,-1.188],[-2.556,0],[0,2.646]],"v":[[-527.549,80.735],[-524.309,78.827],[-524.183,80.501],[-522.635,80.501],[-522.833,78.197],[-522.833,67.451],[-524.381,67.451],[-524.381,73.337],[-527.513,71.519],[-531.599,76.127]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ind":26,"ty":"sh","ix":27,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-540.491,75.443],[-537.701,72.851],[-534.893,75.443]],"c":true},"ix":2},"nm":"Path 27","mn":"ADBE Vector Shape - Group","hd":false},{"ind":27,"ty":"sh","ix":28,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-542.075,76.163],[-537.593,80.735],[-533.651,78.359],[-534.911,77.801],[-537.557,79.421],[-540.509,76.487],[-533.435,76.487],[-533.363,75.731],[-537.647,71.519]],"c":true},"ix":2},"nm":"Path 28","mn":"ADBE Vector Shape - Group","hd":false},{"ind":28,"ty":"sh","ix":29,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-546.774,80.501],[-546.774,75.515],[-544.434,73.031],[-543.624,73.175],[-543.624,71.681],[-544.434,71.537],[-546.828,73.085],[-546.9,71.753],[-548.322,71.753],[-548.322,80.501]],"c":true},"ix":2},"nm":"Path 29","mn":"ADBE Vector Shape - Group","hd":false},{"ind":29,"ty":"sh","ix":30,"ks":{"a":0,"k":{"i":[[1.782,0],[0,1.89],[-1.782,0],[0,-1.89]],"o":[[-1.782,0],[0,-1.89],[1.782,0],[0,1.89]],"v":[[-554.952,79.367],[-557.724,76.127],[-554.952,72.905],[-552.18,76.127]],"c":true},"ix":2},"nm":"Path 30","mn":"ADBE Vector Shape - Group","hd":false},{"ind":30,"ty":"sh","ix":31,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.35,0],[0,2.646],[2.538,0],[0.576,-1.242],[0,0],[0,0]],"o":[[0,0],[0,0],[0.594,1.134],[2.538,0],[0,-2.646],[-1.422,0],[0,0],[0,0],[0,0]],"v":[[-559.326,84.191],[-557.777,84.191],[-557.777,78.989],[-554.646,80.735],[-550.596,76.127],[-554.646,71.519],[-557.867,73.445],[-557.994,71.753],[-559.326,71.753]],"c":true},"ix":2},"nm":"Path 31","mn":"ADBE Vector Shape - Group","hd":false},{"ind":31,"ty":"sh","ix":32,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-569.645,80.501],[-568.097,80.501],[-568.097,75.893],[-565.577,72.923],[-563.525,75.479],[-563.525,80.501],[-561.977,80.501],[-561.977,75.101],[-565.199,71.519],[-568.151,73.193],[-568.277,71.753],[-569.645,71.753]],"c":true},"ix":2},"nm":"Path 32","mn":"ADBE Vector Shape - Group","hd":false},{"ind":32,"ty":"sh","ix":33,"ks":{"a":0,"k":{"i":[[0,0],[-3.114,0.018],[0,2.88],[0,0],[0,0],[0,0],[2.106,-0.018],[0,2.07],[0,0],[0,0]],"o":[[0,2.898],[3.078,0],[0,0],[0,0],[0,0],[0,2.178],[-2.268,0],[0,0],[0,0],[0,0]],"v":[[-582.894,75.911],[-577.71,80.717],[-572.58,75.911],[-572.58,67.451],[-574.182,67.451],[-574.182,75.821],[-577.71,79.277],[-581.274,75.821],[-581.274,67.451],[-582.894,67.451]],"c":true},"ix":2},"nm":"Path 33","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":34,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":39,"ty":4,"nm":"Layer 4","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-42.802,0],[0,0],[0,-42.802],[0,0],[42.802,0],[0,0],[0,42.802],[0,0]],"o":[[0,0],[42.802,0],[0,0],[0,42.802],[0,0],[-42.802,0],[0,0],[0,-42.802]],"v":[[-524,-115.5],[-519,-115.5],[-441.5,-38],[-441.5,-38],[-519,39.5],[-524,39.5],[-601.5,-38],[-601.5,-38]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":40,"ty":4,"nm":"Layer 3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-41.698,0],[0,0],[0,-41.698],[0,0],[41.698,0],[0,0],[0,41.698],[0,0]],"o":[[0,0],[41.698,0],[0,0],[0,41.698],[0,0],[-41.698,0],[0,0],[0,-41.698]],"v":[[-286,-111.5],[-281,-111.5],[-205.5,-36],[-205.5,-36],[-281,39.5],[-286,39.5],[-361.5,-36],[-361.5,-36]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":41,"ty":4,"nm":"Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,175,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-41.698,0],[0,0],[0,-41.698],[0,0],[41.698,0],[0,0],[0,41.698],[0,0]],"o":[[0,0],[41.698,0],[0,0],[0,41.698],[0,0],[-41.698,0],[0,0],[0,-41.698]],"v":[[-50,-111.5],[-45,-111.5],[30.5,-36],[30.5,-36],[-45,39.5],[-50,39.5],[-125.5,-36],[-125.5,-36]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.949019610882,0.949019610882,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1800,"st":0,"bm":0}],"markers":[]}

var paramsWhy = {
    container: document.getElementById('why'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: why
};
var animWhy;
animWhy = lottie.loadAnimation(paramsWhy);








var how = {"v":"5.7.1","fr":30,"ip":2,"op":58,"w":1240,"h":450,"nm":"CCA-Fits 2","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"1","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":3,"s":[0]},{"t":14,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[3.235,2.829],[4.298,0],[3.236,-2.829],[0.573,-4.26]],"o":[[-0.573,-4.26],[-3.236,-2.829],[-4.298,0],[-3.235,2.829],[0,0]],"v":[[-481.907,-127.514],[-487.814,-138.51],[-499.5,-142.899],[-511.186,-138.51],[-517.093,-127.514]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":3,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-5.465,0],[0,5.465],[5.465,0],[0,-5.465]],"o":[[5.465,0],[0,-5.465],[-5.465,0],[0,5.465]],"v":[[-499.5,-147.306],[-489.604,-157.201],[-499.5,-167.097],[-509.396,-157.201]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":3,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.418,1.241],[-1.815,0.505],[-1.855,-0.33],[-1.53,-1.1]],"o":[[0.741,-1.732],[1.418,-1.241],[1.815,-0.505],[1.855,0.33],[0,0]],"v":[[-485.424,-137.465],[-482.144,-141.982],[-477.232,-144.635],[-471.656,-144.902],[-466.514,-142.73]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":3,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-4.25,0],[0,4.251],[4.251,0],[0,-4.251]],"o":[[4.251,0],[0,-4.251],[-4.25,0],[0,4.251]],"v":[[-474.211,-147.306],[-466.514,-155.002],[-474.211,-162.699],[-481.907,-155.002]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":3,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[1.421,1.244],[1.82,0.507],[1.86,-0.331],[1.534,-1.103]],"o":[[-0.743,-1.737],[-1.422,-1.244],[-1.82,-0.507],[-1.86,0.331],[0,0]],"v":[[-513.529,-137.446],[-516.817,-141.974],[-521.741,-144.634],[-527.331,-144.901],[-532.486,-142.724]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":3,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-4.251,0],[0,4.251],[4.251,0],[0,-4.251]],"o":[[4.251,0],[0,-4.251],[-4.251,0],[0,4.251]],"v":[[-524.789,-147.306],[-517.093,-155.002],[-524.789,-162.699],[-532.486,-155.002]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":3,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-460.839,-99.5],[-460.839,-104.486],[-458.499,-106.97],[-457.689,-106.826],[-457.689,-108.32],[-458.499,-108.464],[-460.893,-106.916],[-460.965,-108.248],[-462.387,-108.248],[-462.387,-99.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-471.747,-104.558],[-468.957,-107.15],[-466.149,-104.558]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-473.331,-103.838],[-468.849,-99.266],[-464.907,-101.642],[-466.167,-102.2],[-468.813,-100.58],[-471.765,-103.514],[-464.691,-103.514],[-464.619,-104.27],[-468.903,-108.482]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.422,0],[0,-1.692],[0,0],[0,0],[0,0],[-1.44,0],[0,-1.656],[0,0],[0,0],[0,0],[1.98,0],[0.486,-1.314],[1.476,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.926],[1.386,0],[0,0],[0,0],[0,0],[0,-1.926],[1.404,0],[0,0],[0,0],[0,0],[0,-2.394],[-1.386,0],[-0.432,-1.35],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[-488.947,-99.5],[-487.381,-99.5],[-487.381,-104.108],[-484.951,-107.078],[-482.971,-104.54],[-482.971,-99.5],[-481.423,-99.5],[-481.423,-104.108],[-478.975,-107.078],[-477.013,-104.54],[-477.013,-99.5],[-475.447,-99.5],[-475.447,-104.882],[-478.597,-108.482],[-481.657,-106.466],[-484.573,-108.482],[-487.435,-106.79],[-487.561,-108.248],[-488.947,-108.248]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[-498.87,-103.874],[-495.846,-107.096],[-492.822,-103.874],[-495.846,-100.652]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[-500.454,-103.874],[-495.846,-99.266],[-491.22,-103.874],[-495.846,-108.482]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-505.884,-99.5],[-504.336,-99.5],[-504.336,-106.916],[-501.978,-106.916],[-501.978,-108.248],[-504.336,-108.248],[-504.336,-110.93],[-505.884,-110.93],[-505.884,-108.248],[-508.35,-108.248],[-508.35,-106.916],[-505.884,-106.916]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[-516.786,-101.588],[-513.33,-99.266],[-509.982,-101.948],[-512.322,-104.432],[-513.384,-104.666],[-515.004,-105.944],[-513.33,-107.222],[-511.404,-105.818],[-510.126,-106.25],[-513.402,-108.482],[-516.552,-105.872],[-513.942,-103.406],[-513.024,-103.208],[-511.584,-101.894],[-513.402,-100.526],[-515.508,-102.056]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[-1.782,0],[-0.432,0.936],[-0.09,-0.414],[0,0],[0,0.702],[0,0],[0,0],[0,0],[1.566,0],[0,1.746],[0,0],[0,0]],"o":[[0,2.502],[1.35,0],[0.036,0.45],[0,0],[-0.09,-0.36],[0,0],[0,0],[0,0],[0,1.458],[-1.152,0],[0,0],[0,0],[0,0]],"v":[[-526.709,-102.866],[-523.397,-99.266],[-520.535,-100.814],[-520.373,-99.5],[-518.879,-99.5],[-519.041,-101.264],[-519.041,-108.248],[-520.589,-108.248],[-520.589,-103.298],[-522.983,-100.67],[-525.161,-103.064],[-525.161,-108.248],[-526.709,-108.248]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,-4.05],[-3.78,0],[-0.846,2.286],[0,0],[2.034,0],[0,3.15],[-2.736,0],[-0.576,-1.836],[0,0],[2.808,0]],"o":[[0,4.032],[2.664,0],[0,0],[-0.612,1.602],[-2.736,0],[0,-3.15],[1.998,0],[0,0],[-0.774,-2.34],[-3.744,0]],"v":[[-540.841,-106.034],[-534.451,-99.32],[-528.691,-102.92],[-530.275,-103.46],[-534.469,-100.814],[-539.131,-106.034],[-534.469,-111.236],[-530.257,-108.356],[-528.655,-108.896],[-534.487,-112.748]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":11,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false}],"ip":2,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"2","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":5,"s":[0]},{"t":16,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-499.741,-47.699],[-511.561,-59.52],[-509.439,-61.641],[-499.74,-51.941],[-490.03,-61.641],[-487.91,-59.519]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-498,-49.5],[-501,-49.5],[-501,-74.5],[-498,-74.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":4,"op":1802,"st":2,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"3","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[0]},{"t":20,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[1.038,1.038],[0,0],[1.038,-1.038],[0,0],[-1.049,-1.58],[-6.814,-4.513],[-1.342,1.342],[0,0],[1.038,1.038],[0,0],[1.038,-1.038],[0,0],[2.539,3.103],[0,0]],"o":[[1.038,-1.038],[0,0],[-1.038,-1.038],[0,0],[-1.343,1.342],[4.513,6.815],[1.591,1.05],[0,0],[1.038,-1.038],[0,0],[-1.038,-1.038],[0,0],[-3.102,-2.539],[0,0],[0,0]],"v":[[-472.555,-13.372],[-472.555,-17.14],[-475.387,-19.972],[-479.156,-19.972],[-480.701,-18.415],[-481.209,-13.383],[-463.868,3.958],[-458.836,3.451],[-457.279,1.894],[-457.279,-1.875],[-460.11,-4.707],[-463.879,-4.707],[-464.827,-3.759],[-473.492,-12.424],[-472.544,-13.372]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[5.641,-0.215],[5.495,0],[0.429,-7.22],[0,-4.683],[-2.324,-0.486],[0,0]],"o":[[0,-5.506],[-2.211,-4.66],[-7.322,0],[-4.592,-0.959],[0,4.964],[0,0],[0,0]],"v":[[-456.692,-13.248],[-466.88,-22.962],[-479.314,-30.792],[-493.045,-17.829],[-501.935,-10.799],[-496.159,-3.815],[-483.037,-3.815]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-532.5,10.288],[-473.909,10.288]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-0.704,0],[0,0.704],[0.704,0],[0,-0.704]],"o":[[0.704,0],[0,-0.704],[-0.704,0],[0,0.704]],"v":[[-503.21,16.651],[-501.935,15.376],[-503.21,14.101],[-504.485,15.376]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-503.21,20.476],[-503.21,25.565]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-521.037,25.565],[-485.372,25.565]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[2.121,0],[0,0],[0,2.245],[0,0],[-2.11,0],[0,0]],"o":[[0,0],[0,2.234],[0,0],[-2.11,0],[0,0],[0,-2.234],[0,0],[0,0]],"v":[[-473.909,3.608],[-473.909,16.426],[-477.734,20.476],[-528.675,20.476],[-532.5,16.426],[-532.5,-21.337],[-528.675,-25.388],[-498.02,-25.388]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-2.178],[-2.016,-0.54],[0,0],[0,-1.116],[1.584,0],[0.27,1.638],[0,0],[-2.43,0],[0,2.34],[2.034,0.558],[0,0],[0,1.008],[-1.476,0],[-0.216,-1.53],[0,0],[2.322,0]],"o":[[0,1.566],[0,0],[1.116,0.306],[0,1.44],[-1.548,0],[0,0],[0.36,1.998],[2.556,0],[0,-1.602],[0,0],[-1.116,-0.306],[0,-1.368],[1.476,0],[0,0],[-0.342,-1.872],[-2.448,0]],"v":[[-479.46,55.924],[-476.472,59.326],[-474.474,59.884],[-472.692,61.99],[-475.392,64.33],[-478.38,61.9],[-479.91,62.386],[-475.374,65.716],[-470.946,61.882],[-473.844,58.462],[-475.932,57.886],[-477.768,55.834],[-475.266,53.602],[-472.44,55.996],[-470.892,55.474],[-475.23,52.216]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-486.444,64.6],[-488.352,63.052],[-485.994,61.414],[-483.852,61.414],[-483.852,62.494]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-486.84,65.734],[-483.744,64.132],[-483.6,65.5],[-482.124,65.5],[-482.304,63.664],[-482.304,59.632],[-485.85,56.518],[-489.612,58.966],[-488.208,59.29],[-485.904,57.796],[-483.852,59.524],[-483.852,60.406],[-486.156,60.406],[-489.918,63.178]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-496.182,64.6],[-498.09,63.052],[-495.732,61.414],[-493.59,61.414],[-493.59,62.494]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-496.578,65.734],[-493.482,64.132],[-493.338,65.5],[-491.862,65.5],[-492.042,63.664],[-492.042,59.632],[-495.588,56.518],[-499.35,58.966],[-497.946,59.29],[-495.642,57.796],[-493.59,59.524],[-493.59,60.406],[-495.894,60.406],[-499.656,63.178]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,-4.05],[-3.78,0],[-0.846,2.286],[0,0],[2.034,0],[0,3.15],[-2.736,0],[-0.576,-1.836],[0,0],[2.808,0]],"o":[[0,4.032],[2.664,0],[0,0],[-0.612,1.602],[-2.736,0],[0,-3.15],[1.998,0],[0,0],[-0.774,-2.34],[-3.744,0]],"v":[[-513.762,58.966],[-507.372,65.68],[-501.612,62.08],[-503.196,61.54],[-507.39,64.186],[-512.052,58.966],[-507.39,53.764],[-503.178,56.644],[-501.576,56.104],[-507.408,52.252]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,-4.05],[-3.78,0],[-0.846,2.286],[0,0],[2.034,0],[0,3.15],[-2.736,0],[-0.576,-1.836],[0,0],[2.808,0]],"o":[[0,4.032],[2.664,0],[0,0],[-0.612,1.602],[-2.736,0],[0,-3.15],[1.998,0],[0,0],[-0.774,-2.34],[-3.744,0]],"v":[[-528.106,58.966],[-521.716,65.68],[-515.956,62.08],[-517.54,61.54],[-521.734,64.186],[-526.396,58.966],[-521.734,53.764],[-517.522,56.644],[-515.92,56.104],[-521.752,52.252]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 8","np":8,"cix":2,"bm":0,"ix":8,"mn":"ADBE Vector Group","hd":false}],"ip":9,"op":1806,"st":6,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"4","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":13,"s":[0]},{"t":24,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-208.584,-101.5],[-207.036,-101.5],[-207.036,-108.916],[-204.678,-108.916],[-204.678,-110.248],[-207.036,-110.248],[-207.036,-112.93],[-208.584,-112.93],[-208.584,-110.248],[-211.05,-110.248],[-211.05,-108.916],[-208.584,-108.916]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-216.96,-102.4],[-218.868,-103.948],[-216.51,-105.586],[-214.368,-105.586],[-214.368,-104.506]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-217.356,-101.266],[-214.26,-102.868],[-214.116,-101.5],[-212.64,-101.5],[-212.82,-103.336],[-212.82,-107.368],[-216.366,-110.482],[-220.128,-108.034],[-218.724,-107.71],[-216.42,-109.204],[-214.368,-107.476],[-214.368,-106.594],[-216.672,-106.594],[-220.434,-103.822]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.468,-1.026],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[-230.177,-101.5],[-228.629,-101.5],[-228.629,-106.108],[-226.109,-109.078],[-224.057,-106.522],[-224.057,-101.5],[-222.509,-101.5],[-222.509,-106.9],[-225.731,-110.482],[-228.629,-108.88],[-228.629,-114.55],[-230.177,-114.55]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,-4.05],[-3.78,0],[-0.846,2.286],[0,0],[2.034,0],[0,3.15],[-2.736,0],[-0.576,-1.836],[0,0],[2.808,0]],"o":[[0,4.032],[2.664,0],[0,0],[-0.612,1.602],[-2.736,0],[0,-3.15],[1.998,0],[0,0],[-0.774,-2.34],[-3.744,0]],"v":[[-244.859,-108.034],[-238.469,-101.32],[-232.709,-104.92],[-234.293,-105.46],[-238.487,-102.814],[-243.149,-108.034],[-238.487,-113.236],[-234.275,-110.356],[-232.673,-110.896],[-238.505,-114.748]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0.81,-0.468],[0,0],[0,1.17],[0.72,0],[0,-0.702],[-0.612,0],[-0.108,0.054]],"o":[[0,0],[1.458,-0.828],[0,-0.864],[-0.738,0],[0,0.666],[0.162,0],[-0.306,0.576]],"v":[[-255.437,-99.952],[-254.915,-99.178],[-252.431,-102.418],[-253.763,-103.822],[-255.041,-102.634],[-253.925,-101.518],[-253.547,-101.59]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,-2.178],[-2.016,-0.54],[0,0],[0,-1.116],[1.584,0],[0.27,1.638],[0,0],[-2.43,0],[0,2.34],[2.034,0.558],[0,0],[0,1.008],[-1.476,0],[-0.216,-1.53],[0,0],[2.322,0]],"o":[[0,1.566],[0,0],[1.116,0.306],[0,1.44],[-1.548,0],[0,0],[0.36,1.998],[2.556,0],[0,-1.602],[0,0],[-1.116,-0.306],[0,-1.368],[1.476,0],[0,0],[-0.342,-1.872],[-2.448,0]],"v":[[-266.578,-111.076],[-263.59,-107.674],[-261.592,-107.116],[-259.81,-105.01],[-262.51,-102.67],[-265.498,-105.1],[-267.028,-104.614],[-262.492,-101.284],[-258.064,-105.118],[-260.962,-108.538],[-263.05,-109.114],[-264.886,-111.166],[-262.384,-113.398],[-259.558,-111.004],[-258.01,-111.526],[-262.348,-114.784]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-283.431,-101.5],[-281.865,-101.5],[-281.865,-112.66],[-277.293,-101.68],[-276.015,-101.68],[-271.461,-112.66],[-271.461,-101.5],[-269.877,-101.5],[-269.877,-114.55],[-272.253,-114.55],[-276.609,-104.074],[-281.019,-114.55],[-283.431,-114.55]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,-2.178],[-2.016,-0.54],[0,0],[0,-1.116],[1.584,0],[0.27,1.638],[0,0],[-2.43,0],[0,2.34],[2.034,0.558],[0,0],[0,1.008],[-1.476,0],[-0.216,-1.53],[0,0],[2.322,0]],"o":[[0,1.566],[0,0],[1.116,0.306],[0,1.44],[-1.548,0],[0,0],[0.36,1.998],[2.556,0],[0,-1.602],[0,0],[-1.116,-0.306],[0,-1.368],[1.476,0],[0,0],[-0.342,-1.872],[-2.448,0]],"v":[[-294.967,-111.076],[-291.979,-107.674],[-289.981,-107.116],[-288.199,-105.01],[-290.899,-102.67],[-293.887,-105.1],[-295.417,-104.614],[-290.881,-101.284],[-286.453,-105.118],[-289.351,-108.538],[-291.439,-109.114],[-293.275,-111.166],[-290.773,-113.398],[-287.947,-111.004],[-286.399,-111.526],[-290.737,-114.784]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0.81,-0.468],[0,0],[0,1.17],[0.72,0],[0,-0.702],[-0.612,0],[-0.108,0.054]],"o":[[0,0],[1.458,-0.828],[0,-0.864],[-0.738,0],[0,0.666],[0.162,0],[-0.306,0.576]],"v":[[-305.868,-99.952],[-305.346,-99.178],[-302.862,-102.418],[-304.194,-103.822],[-305.472,-102.634],[-304.356,-101.518],[-303.978,-101.59]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-315.019,-106.558],[-312.229,-109.15],[-309.421,-106.558]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-316.603,-105.838],[-312.121,-101.266],[-308.179,-103.642],[-309.439,-104.2],[-312.085,-102.58],[-315.037,-105.514],[-307.963,-105.514],[-307.891,-106.27],[-312.175,-110.482]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,-2.736],[-2.592,0],[-0.576,1.692],[0,0],[1.332,0],[0,1.908],[-1.746,0],[-0.342,-1.08],[0,0],[1.944,0]],"o":[[0,2.736],[1.944,0],[0,0],[-0.36,1.098],[-1.728,0],[0,-1.926],[1.224,0],[0,0],[-0.468,-1.548],[-2.664,0]],"v":[[-326.78,-105.838],[-322.388,-101.266],[-318.212,-103.966],[-319.634,-104.506],[-322.334,-102.67],[-325.178,-105.874],[-322.298,-109.096],[-319.706,-107.332],[-318.302,-107.89],[-322.334,-110.482]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-330.619,-101.5],[-329.071,-101.5],[-329.071,-110.248],[-330.619,-110.248]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-329.845,-111.904],[-328.693,-113.02],[-329.845,-114.118],[-330.997,-113.02]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[-340.542,-105.874],[-337.518,-109.096],[-334.494,-105.874],[-337.518,-102.652]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[-342.126,-105.874],[-337.518,-101.266],[-332.892,-105.874],[-337.518,-110.482]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-348.06,-101.5],[-343.002,-114.55],[-344.748,-114.55],[-348.996,-103.462],[-353.244,-114.55],[-355.026,-114.55],[-349.95,-101.5]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":70,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":19,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[-203.103,-7.284],[-198.495,-4.188],[-194.031,-7.764],[-197.151,-11.076],[-198.567,-11.388],[-200.727,-13.092],[-198.495,-14.796],[-195.927,-12.924],[-194.223,-13.5],[-198.591,-16.476],[-202.791,-12.996],[-199.311,-9.708],[-198.087,-9.444],[-196.167,-7.692],[-198.591,-5.868],[-201.399,-7.908]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[-214.84,-11.244],[-211.12,-14.7],[-207.376,-11.244]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[-216.952,-10.284],[-210.976,-4.188],[-205.72,-7.356],[-207.4,-8.1],[-210.928,-5.94],[-214.864,-9.852],[-205.432,-9.852],[-205.336,-10.86],[-211.048,-16.476]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[-2.376,0],[-0.576,1.248],[-0.12,-0.552],[0,0],[0,0.936],[0,0],[0,0],[0,0],[2.088,0],[0,2.328],[0,0],[0,0]],"o":[[0,3.336],[1.8,0],[0.048,0.6],[0,0],[-0.12,-0.48],[0,0],[0,0],[0,0],[0,1.944],[-1.536,0],[0,0],[0,0],[0,0]],"v":[[-230.208,-8.988],[-225.792,-4.188],[-221.976,-6.252],[-221.76,-4.5],[-219.768,-4.5],[-219.984,-6.852],[-219.984,-16.164],[-222.048,-16.164],[-222.048,-9.564],[-225.24,-6.06],[-228.144,-9.252],[-228.144,-16.164],[-230.208,-16.164]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[-241.939,-7.284],[-237.331,-4.188],[-232.867,-7.764],[-235.987,-11.076],[-237.403,-11.388],[-239.563,-13.092],[-237.331,-14.796],[-234.763,-12.924],[-233.059,-13.5],[-237.427,-16.476],[-241.627,-12.996],[-238.147,-9.708],[-236.923,-9.444],[-235.003,-7.692],[-237.427,-5.868],[-240.235,-7.908]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[-253.283,-7.284],[-248.675,-4.188],[-244.211,-7.764],[-247.331,-11.076],[-248.747,-11.388],[-250.907,-13.092],[-248.675,-14.796],[-246.107,-12.924],[-244.403,-13.5],[-248.771,-16.476],[-252.971,-12.996],[-249.491,-9.708],[-248.267,-9.444],[-246.347,-7.692],[-248.771,-5.868],[-251.579,-7.908]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-258.281,-4.5],[-256.217,-4.5],[-256.217,-16.164],[-258.281,-16.164]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[-0.864,0],[0,0.888],[0.888,0],[0,-0.864]],"o":[[0.888,0],[0,-0.864],[-0.864,0],[0,0.888]],"v":[[-257.249,-18.372],[-255.713,-19.86],[-257.249,-21.324],[-258.785,-19.86]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.968,0],[0,-2.208],[0,0],[0,0],[0,0],[2.736,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.52],[1.968,0],[0,0],[0,0],[0,0],[0,-3.144],[-1.752,0],[0,0],[0,0],[0,0]],"v":[[-278.438,-4.5],[-276.374,-4.5],[-276.374,-10.644],[-273.014,-14.604],[-270.278,-11.196],[-270.278,-4.5],[-268.214,-4.5],[-268.214,-11.7],[-272.51,-16.476],[-276.446,-14.244],[-276.614,-16.164],[-278.438,-16.164]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[-291.668,-10.332],[-287.636,-14.628],[-283.604,-10.332],[-287.636,-6.036]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[-293.78,-10.332],[-287.636,-4.188],[-281.468,-10.332],[-287.636,-16.476]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.896,0],[0,-2.256],[0,0],[0,0],[0,0],[-1.92,0],[0,-2.208],[0,0],[0,0],[0,0],[2.64,0],[0.648,-1.752],[1.968,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.568],[1.848,0],[0,0],[0,0],[0,0],[0,-2.568],[1.872,0],[0,0],[0,0],[0,0],[0,-3.192],[-1.848,0],[-0.576,-1.8],[-1.704,0],[0,0],[0,0],[0,0]],"v":[[-314.578,-4.5],[-312.49,-4.5],[-312.49,-10.644],[-309.25,-14.604],[-306.61,-11.22],[-306.61,-4.5],[-304.546,-4.5],[-304.546,-10.644],[-301.282,-14.604],[-298.666,-11.22],[-298.666,-4.5],[-296.578,-4.5],[-296.578,-11.676],[-300.778,-16.476],[-304.858,-13.788],[-308.746,-16.476],[-312.562,-14.22],[-312.73,-16.164],[-314.578,-16.164]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.896,0],[0,-2.256],[0,0],[0,0],[0,0],[-1.92,0],[0,-2.208],[0,0],[0,0],[0,0],[2.64,0],[0.648,-1.752],[1.968,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.568],[1.848,0],[0,0],[0,0],[0,0],[0,-2.568],[1.872,0],[0,0],[0,0],[0,0],[0,-3.192],[-1.848,0],[-0.576,-1.8],[-1.704,0],[0,0],[0,0],[0,0]],"v":[[-336.024,-4.5],[-333.936,-4.5],[-333.936,-10.644],[-330.696,-14.604],[-328.056,-11.22],[-328.056,-4.5],[-325.992,-4.5],[-325.992,-10.644],[-322.728,-14.604],[-320.112,-11.22],[-320.112,-4.5],[-318.024,-4.5],[-318.024,-11.676],[-322.224,-16.476],[-326.304,-13.788],[-330.192,-16.476],[-334.008,-14.22],[-334.176,-16.164],[-336.024,-16.164]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[-349.254,-10.332],[-345.222,-14.628],[-341.19,-10.332],[-345.222,-6.036]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[-351.366,-10.332],[-345.222,-4.188],[-339.054,-10.332],[-345.222,-16.476]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,-3.648],[-3.456,0],[-0.768,2.256],[0,0],[1.776,0],[0,2.544],[-2.328,0],[-0.456,-1.44],[0,0],[2.592,0]],"o":[[0,3.648],[2.592,0],[0,0],[-0.48,1.464],[-2.304,0],[0,-2.568],[1.632,0],[0,0],[-0.624,-2.064],[-3.552,0]],"v":[[-364.913,-10.284],[-359.057,-4.188],[-353.489,-7.788],[-355.385,-8.508],[-358.985,-6.06],[-362.777,-10.332],[-358.937,-14.628],[-355.481,-12.276],[-353.609,-13.02],[-358.985,-16.476]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-194.005,-32.5],[-191.941,-32.5],[-191.941,-42.388],[-188.797,-42.388],[-188.797,-44.164],[-191.941,-44.164],[-191.941,-47.74],[-194.005,-47.74],[-194.005,-44.164],[-197.293,-44.164],[-197.293,-42.388],[-194.005,-42.388]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[-208.541,-35.284],[-203.933,-32.188],[-199.469,-35.764],[-202.589,-39.076],[-204.005,-39.388],[-206.165,-41.092],[-203.933,-42.796],[-201.365,-40.924],[-199.661,-41.5],[-204.029,-44.476],[-208.229,-40.996],[-204.749,-37.708],[-203.525,-37.444],[-201.605,-35.692],[-204.029,-33.868],[-206.837,-35.908]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[-221.051,-38.332],[-217.019,-42.628],[-212.987,-38.332],[-217.019,-34.036]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[-223.163,-38.332],[-217.019,-32.188],[-210.851,-38.332],[-217.019,-44.476]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.896,0],[0,-2.256],[0,0],[0,0],[0,0],[-1.92,0],[0,-2.208],[0,0],[0,0],[0,0],[2.64,0],[0.648,-1.752],[1.968,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.568],[1.848,0],[0,0],[0,0],[0,0],[0,-2.568],[1.872,0],[0,0],[0,0],[0,0],[0,-3.192],[-1.848,0],[-0.576,-1.8],[-1.704,0],[0,0],[0,0],[0,0]],"v":[[-243.961,-32.5],[-241.873,-32.5],[-241.873,-38.644],[-238.633,-42.604],[-235.993,-39.22],[-235.993,-32.5],[-233.929,-32.5],[-233.929,-38.644],[-230.665,-42.604],[-228.049,-39.22],[-228.049,-32.5],[-225.961,-32.5],[-225.961,-39.676],[-230.161,-44.476],[-234.241,-41.788],[-238.129,-44.476],[-241.945,-42.22],[-242.113,-44.164],[-243.961,-44.164]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[-262.47,-35.284],[-257.862,-32.188],[-253.398,-35.764],[-256.518,-39.076],[-257.934,-39.388],[-260.094,-41.092],[-257.862,-42.796],[-255.294,-40.924],[-253.59,-41.5],[-257.958,-44.476],[-262.158,-40.996],[-258.678,-37.708],[-257.454,-37.444],[-255.534,-35.692],[-257.958,-33.868],[-260.766,-35.908]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.944,0],[-0.264,-0.144],[0,0],[0.528,0],[0.552,-1.368],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.992],[0.432,0],[0,0],[-0.24,-0.12],[-1.296,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-268.194,-32.5],[-268.194,-39.148],[-265.074,-42.46],[-263.994,-42.268],[-263.994,-44.26],[-265.074,-44.452],[-268.266,-42.388],[-268.362,-44.164],[-270.258,-44.164],[-270.258,-32.5]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[-282.738,-39.244],[-279.018,-42.7],[-275.274,-39.244]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[-284.85,-38.284],[-278.874,-32.188],[-273.618,-35.356],[-275.298,-36.1],[-278.826,-33.94],[-282.762,-37.852],[-273.33,-37.852],[-273.234,-38.86],[-278.946,-44.476]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.896,0],[0,-2.256],[0,0],[0,0],[0,0],[-1.92,0],[0,-2.208],[0,0],[0,0],[0,0],[2.64,0],[0.648,-1.752],[1.968,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.568],[1.848,0],[0,0],[0,0],[0,0],[0,-2.568],[1.872,0],[0,0],[0,0],[0,0],[0,-3.192],[-1.848,0],[-0.576,-1.8],[-1.704,0],[0,0],[0,0],[0,0]],"v":[[-305.672,-32.5],[-303.584,-32.5],[-303.584,-38.644],[-300.344,-42.604],[-297.704,-39.22],[-297.704,-32.5],[-295.64,-32.5],[-295.64,-38.644],[-292.376,-42.604],[-289.76,-39.22],[-289.76,-32.5],[-287.672,-32.5],[-287.672,-39.676],[-291.872,-44.476],[-295.952,-41.788],[-299.84,-44.476],[-303.656,-42.22],[-303.824,-44.164],[-305.672,-44.164]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ind":26,"ty":"sh","ix":27,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[-318.903,-38.332],[-314.871,-42.628],[-310.839,-38.332],[-314.871,-34.036]],"c":true},"ix":2},"nm":"Path 27","mn":"ADBE Vector Shape - Group","hd":false},{"ind":27,"ty":"sh","ix":28,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[-321.015,-38.332],[-314.871,-32.188],[-308.703,-38.332],[-314.871,-44.476]],"c":true},"ix":2},"nm":"Path 28","mn":"ADBE Vector Shape - Group","hd":false},{"ind":28,"ty":"sh","ix":29,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-328.255,-32.5],[-326.191,-32.5],[-326.191,-42.388],[-323.047,-42.388],[-323.047,-44.164],[-326.191,-44.164],[-326.191,-47.74],[-328.255,-47.74],[-328.255,-44.164],[-331.543,-44.164],[-331.543,-42.388],[-328.255,-42.388]],"c":true},"ix":2},"nm":"Path 29","mn":"ADBE Vector Shape - Group","hd":false},{"ind":29,"ty":"sh","ix":30,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[-342.791,-35.284],[-338.183,-32.188],[-333.719,-35.764],[-336.839,-39.076],[-338.255,-39.388],[-340.415,-41.092],[-338.183,-42.796],[-335.615,-40.924],[-333.911,-41.5],[-338.279,-44.476],[-342.479,-40.996],[-338.999,-37.708],[-337.775,-37.444],[-335.855,-35.692],[-338.279,-33.868],[-341.087,-35.908]],"c":true},"ix":2},"nm":"Path 30","mn":"ADBE Vector Shape - Group","hd":false},{"ind":30,"ty":"sh","ix":31,"ks":{"a":0,"k":{"i":[[0,0],[-2.376,0],[-0.576,1.248],[-0.12,-0.552],[0,0],[0,0.936],[0,0],[0,0],[0,0],[2.088,0],[0,2.328],[0,0],[0,0]],"o":[[0,3.336],[1.8,0],[0.048,0.6],[0,0],[-0.12,-0.48],[0,0],[0,0],[0,0],[0,1.944],[-1.536,0],[0,0],[0,0],[0,0]],"v":[[-356.021,-36.988],[-351.605,-32.188],[-347.789,-34.252],[-347.573,-32.5],[-345.581,-32.5],[-345.797,-34.852],[-345.797,-44.164],[-347.861,-44.164],[-347.861,-37.564],[-351.053,-34.06],[-353.957,-37.252],[-353.957,-44.164],[-356.021,-44.164]],"c":true},"ix":2},"nm":"Path 31","mn":"ADBE Vector Shape - Group","hd":false},{"ind":31,"ty":"sh","ix":32,"ks":{"a":0,"k":{"i":[[0,-3.648],[-3.456,0],[-0.768,2.256],[0,0],[1.776,0],[0,2.544],[-2.328,0],[-0.456,-1.44],[0,0],[2.592,0]],"o":[[0,3.648],[2.592,0],[0,0],[-0.48,1.464],[-2.304,0],[0,-2.568],[1.632,0],[0,0],[-0.624,-2.064],[-3.552,0]],"v":[[-369.952,-38.284],[-364.096,-32.188],[-358.528,-35.788],[-360.424,-36.508],[-364.024,-34.06],[-367.816,-38.332],[-363.976,-42.628],[-360.52,-40.276],[-358.648,-41.02],[-364.024,-44.476]],"c":true},"ix":2},"nm":"Path 32","mn":"ADBE Vector Shape - Group","hd":false},{"ind":32,"ty":"sh","ix":33,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[-219.375,-67.244],[-215.655,-70.7],[-211.911,-67.244]],"c":true},"ix":2},"nm":"Path 33","mn":"ADBE Vector Shape - Group","hd":false},{"ind":33,"ty":"sh","ix":34,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[-221.487,-66.284],[-215.511,-60.188],[-210.255,-63.356],[-211.935,-64.1],[-215.463,-61.94],[-219.399,-65.852],[-209.967,-65.852],[-209.871,-66.86],[-215.583,-72.476]],"c":true},"ix":2},"nm":"Path 34","mn":"ADBE Vector Shape - Group","hd":false},{"ind":34,"ty":"sh","ix":35,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-230.216,-60.5],[-228.056,-60.5],[-223.232,-72.164],[-225.464,-72.164],[-229.112,-62.9],[-232.76,-72.164],[-235.064,-72.164]],"c":true},"ix":2},"nm":"Path 35","mn":"ADBE Vector Shape - Group","hd":false},{"ind":35,"ty":"sh","ix":36,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-237.876,-60.5],[-237.876,-77.9],[-239.94,-77.9],[-239.94,-60.5]],"c":true},"ix":2},"nm":"Path 36","mn":"ADBE Vector Shape - Group","hd":false},{"ind":36,"ty":"sh","ix":37,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[-253.219,-66.332],[-249.187,-70.628],[-245.155,-66.332],[-249.187,-62.036]],"c":true},"ix":2},"nm":"Path 37","mn":"ADBE Vector Shape - Group","hd":false},{"ind":37,"ty":"sh","ix":38,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[-255.331,-66.332],[-249.187,-60.188],[-243.019,-66.332],[-249.187,-72.476]],"c":true},"ix":2},"nm":"Path 38","mn":"ADBE Vector Shape - Group","hd":false},{"ind":38,"ty":"sh","ix":39,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[-266.771,-63.284],[-262.163,-60.188],[-257.699,-63.764],[-260.819,-67.076],[-262.235,-67.388],[-264.395,-69.092],[-262.163,-70.796],[-259.595,-68.924],[-257.891,-69.5],[-262.259,-72.476],[-266.459,-68.996],[-262.979,-65.708],[-261.755,-65.444],[-259.835,-63.692],[-262.259,-61.868],[-265.067,-63.908]],"c":true},"ix":2},"nm":"Path 39","mn":"ADBE Vector Shape - Group","hd":false},{"ind":39,"ty":"sh","ix":40,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[-278.508,-67.244],[-274.788,-70.7],[-271.044,-67.244]],"c":true},"ix":2},"nm":"Path 40","mn":"ADBE Vector Shape - Group","hd":false},{"ind":40,"ty":"sh","ix":41,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[-280.62,-66.284],[-274.644,-60.188],[-269.388,-63.356],[-271.068,-64.1],[-274.596,-61.94],[-278.532,-65.852],[-269.1,-65.852],[-269.004,-66.86],[-274.716,-72.476]],"c":true},"ix":2},"nm":"Path 41","mn":"ADBE Vector Shape - Group","hd":false},{"ind":41,"ty":"sh","ix":42,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.944,0],[-0.264,-0.144],[0,0],[0.528,0],[0.552,-1.368],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.992],[0.432,0],[0,0],[-0.24,-0.12],[-1.296,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-286.885,-60.5],[-286.885,-67.148],[-283.765,-70.46],[-282.685,-70.268],[-282.685,-72.26],[-283.765,-72.452],[-286.957,-70.388],[-287.053,-72.164],[-288.949,-72.164],[-288.949,-60.5]],"c":true},"ix":2},"nm":"Path 42","mn":"ADBE Vector Shape - Group","hd":false},{"ind":42,"ty":"sh","ix":43,"ks":{"a":0,"k":{"i":[[-0.744,0],[-1.152,2.496],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1.272,0],[0.288,0.24],[0,0]],"o":[[1.848,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[-0.672,1.56],[-0.624,0],[0,0],[0.288,0.264]],"v":[[-308.834,-55.364],[-304.394,-58.508],[-298.154,-72.164],[-300.41,-72.164],[-304.226,-63.332],[-308.042,-72.164],[-310.346,-72.164],[-305.354,-61.364],[-306.242,-59.348],[-309.098,-57.164],[-310.61,-57.524],[-310.61,-55.772]],"c":true},"ix":2},"nm":"Path 43","mn":"ADBE Vector Shape - Group","hd":false},{"ind":43,"ty":"sh","ix":44,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-313.134,-60.5],[-313.134,-77.9],[-315.198,-77.9],[-315.198,-60.5]],"c":true},"ix":2},"nm":"Path 44","mn":"ADBE Vector Shape - Group","hd":false},{"ind":44,"ty":"sh","ix":45,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-318.947,-60.5],[-318.947,-77.9],[-321.011,-77.9],[-321.011,-60.5]],"c":true},"ix":2},"nm":"Path 45","mn":"ADBE Vector Shape - Group","hd":false},{"ind":45,"ty":"sh","ix":46,"ks":{"a":0,"k":{"i":[[0,0],[-2.376,0],[-0.576,1.248],[-0.12,-0.552],[0,0],[0,0.936],[0,0],[0,0],[0,0],[2.088,0],[0,2.328],[0,0],[0,0]],"o":[[0,3.336],[1.8,0],[0.048,0.6],[0,0],[-0.12,-0.48],[0,0],[0,0],[0,0],[0,1.944],[-1.536,0],[0,0],[0,0],[0,0]],"v":[[-335.009,-64.988],[-330.593,-60.188],[-326.777,-62.252],[-326.561,-60.5],[-324.569,-60.5],[-324.785,-62.852],[-324.785,-72.164],[-326.849,-72.164],[-326.849,-65.564],[-330.041,-62.06],[-332.945,-65.252],[-332.945,-72.164],[-335.009,-72.164]],"c":true},"ix":2},"nm":"Path 46","mn":"ADBE Vector Shape - Group","hd":false},{"ind":46,"ty":"sh","ix":47,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-345.817,-60.5],[-345.817,-68.156],[-337.993,-68.156],[-337.993,-69.98],[-345.817,-69.98],[-345.817,-75.98],[-337.081,-75.98],[-337.081,-77.9],[-347.929,-77.9],[-347.953,-60.5]],"c":true},"ix":2},"nm":"Path 47","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":48,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":13,"op":1810,"st":10,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"5","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[0]},{"t":26,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-385.246,66.091],[-397.065,54.259],[-385.246,42.439],[-383.125,44.561],[-392.824,54.261],[-383.124,63.97]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-174.5,55.53],[-395.5,55.53],[-395.5,52.53],[-174.5,52.53]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-184.754,40.091],[-186.875,37.97],[-177.176,28.27],[-186.876,18.561],[-184.754,16.439],[-172.935,28.27]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-174.5,30],[-395.5,30],[-395.5,27],[-174.5,27]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":1,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false}],"ip":15,"op":1812,"st":12,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"Layer 5","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":19,"s":[0]},{"t":30,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[3,0],[0,0],[0,0],[0,0],[-0.5,0.4],[0,0],[0,0.6],[0,0],[0,0],[0,0]],"o":[[0,3],[0,0],[0,0],[0,0],[0.7,0],[0,0],[0.5,-0.5],[0,0],[0,0],[0,0],[0,0]],"v":[[10.8,-149.3],[5.4,-143.9],[-8.5,-143.9],[-8.5,-134.3],[1.3,-134.3],[3,-135],[19.6,-151.6],[20.3,-153.3],[20.3,-163.1],[10.7,-163.1],[10.7,-149.3]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0.5,-0.4],[0,0],[0,-0.6],[0,0],[0,0],[0,0],[-3,0],[0,0]],"o":[[0,0],[0,0],[-0.7,0],[0,0],[-0.5,0.5],[0,0],[0,0],[0,0],[0,-3],[0,0],[0,0]],"v":[[8.3,-165.5],[8.3,-175.1],[-1.5,-175.1],[-3.2,-174.4],[-19.8,-157.8],[-20.5,-156.1],[-20.5,-146.3],[-10.9,-146.3],[-10.9,-160.1],[-5.5,-165.5],[8.3,-165.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-2,0],[0,-2.2],[0,0],[0,0],[0,0],[2.7,0],[0.6,-1.4],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.5],[2,0],[0,0],[0,0],[0,0],[0,-3.1],[-1.8,0],[0,0],[0,0],[0,0],[0,0]],"v":[[54.9,-64.1],[57,-64.1],[57,-70.2],[60.4,-74.2],[63.1,-70.8],[63.1,-64.1],[65.2,-64.1],[65.2,-71.3],[60.9,-76.1],[57,-73.9],[56.8,-75.8],[55,-75.8],[55,-64.1]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,2.4],[-2.4,0],[0,-2.5],[2.5,0]],"o":[[0,-2.4],[2.5,0],[0,2.5],[-2.4,0]],"v":[[41.6,-69.9],[45.6,-74.2],[49.6,-69.9],[45.6,-65.6]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-3.5],[-3.7,0],[0,3.4],[3.8,0]],"o":[[0,3.5],[3.7,0],[0,-3.4],[-3.6,-0.1]],"v":[[39.5,-69.9],[45.6,-63.8],[51.8,-69.9],[45.6,-76]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[27.4,-64.1],[29.5,-64.1],[29.5,-74],[34.5,-74],[34.5,-64.1],[36.6,-64.1],[36.6,-75.8],[29.6,-75.8],[29.6,-79.4],[27.5,-79.4],[27.5,-75.8],[24.5,-75.8],[24.5,-74],[27.5,-74],[27.5,-64.1]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[-0.9,0],[0,0.9],[0.8,0],[0,-0.9]],"o":[[0.9,0],[0,-0.9],[-0.9,0],[-0.1,0.9]],"v":[[35.5,-78],[37,-79.5],[35.5,-81],[34,-79.5]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[2,0],[0,1.3],[-2,0],[0,0],[0,0]],"o":[[-1.6,0],[0,-1.5],[0,0],[0,0],[-0.1,1.8]],"v":[[16.5,-65.3],[14,-67.4],[17.1,-69.6],[20,-69.6],[20,-68.2]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[-2.5,0],[-0.5,1.1],[-0.1,-0.4],[0,0],[0,0.8],[0,0],[2.8,0],[0.4,-2.1],[0,0],[-1.7,0],[0,-1.5],[0,0],[0,0],[0,-2.5]],"o":[[2,0],[0,0.7],[0,0],[-0.1,-0.4],[0,0],[0,-2.9],[-2.5,0],[0,0],[0.2,-1.2],[1.6,0],[0,0],[0,0],[-3,0],[-0.1,2.1]],"v":[[15.9,-63.8],[20,-65.9],[20.2,-64.1],[22.2,-64.1],[22,-66.5],[22,-71.9],[17.3,-76.1],[12.3,-72.8],[14.2,-72.4],[17.3,-74.4],[20,-72.1],[20,-70.9],[16.9,-70.9],[11.9,-67.2]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.9,0],[0,-2.3],[0,0],[0,0],[0,0],[-2,0],[0,-2.2],[0,0],[0,0],[0,0],[2.6,0],[0.7,-1.8],[2,0],[0.6,-1.5],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.6],[1.8,0],[0,0],[0,0],[0,0],[0,-2.6],[1.9,0],[0,0],[0,0],[0,0],[0,-3.2],[-1.8,0],[-0.6,-1.8],[-1.7,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-8.9,-64.1],[-6.8,-64.1],[-6.8,-70.2],[-3.6,-74.2],[-1,-70.8],[-1,-64.1],[1.1,-64.1],[1.1,-70.2],[4.4,-74.2],[7,-70.8],[7,-64.1],[9.1,-64.1],[9.1,-71.3],[4.9,-76.1],[0.8,-73.4],[-3.1,-76.1],[-6.9,-73.8],[-7.1,-75.7],[-8.9,-75.7],[-8.9,-64.1]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,2.4],[-2.4,0],[0,-2.5],[2.5,0]],"o":[[0,-2.4],[2.5,0],[0,2.5],[-2.5,0]],"v":[[-22.1,-69.9],[-18.1,-74.2],[-14.1,-69.9],[-18.1,-65.6]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,-3.5],[-3.7,0],[0,3.4],[3.8,0]],"o":[[0,3.5],[3.7,0],[0,-3.4],[-3.7,-0.1]],"v":[[-24.2,-69.9],[-18.1,-63.8],[-11.9,-69.9],[-18.1,-76]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-31.5,-64.1],[-29.4,-64.1],[-29.4,-74],[-26.3,-74],[-26.3,-75.8],[-29.4,-75.8],[-29.4,-79.4],[-31.5,-79.4],[-31.5,-75.8],[-34.8,-75.8],[-34.8,-74],[-31.5,-74]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[-2.4,0],[-0.6,1.3],[-0.1,-0.6],[0,0],[0,1],[0,0],[0,0],[0,0],[2.1,0],[0,2.3],[0,0],[0,0],[0,0]],"o":[[0,3.3],[1.8,0],[0,0.6],[0,0],[-0.1,-0.5],[0,0],[0,0],[0,0],[0,1.9],[-1.5,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-47.9,-68.6],[-43.5,-63.8],[-39.7,-65.9],[-39.5,-64.1],[-37.5,-64.1],[-37.7,-66.5],[-37.7,-75.8],[-39.8,-75.8],[-39.8,-69.2],[-43,-65.7],[-45.9,-68.9],[-45.9,-75.8],[-48,-75.8],[-48,-68.6]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-62,-70.2],[-58.5,-79.6],[-54.9,-70.2]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-66.4,-64.1],[-64.2,-64.1],[-62.6,-68.4],[-54.3,-68.4],[-52.6,-64.1],[-50.4,-64.1],[-57,-81.5],[-59.9,-81.5]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.9,0],[-0.3,-0.2],[0,0],[0.5,0],[0.6,-1.4],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-2],[0.4,0],[0,0],[-0.2,-0.1],[-1.3,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[85.1,-92.1],[85.1,-98.7],[88.2,-102],[89.3,-101.8],[89.3,-103.8],[88.2,-104],[85,-101.9],[84.9,-103.7],[83,-103.7],[83,-92],[85.1,-92]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[-2,0],[-0.1,-2.2]],"o":[[0.2,-2.1],[2.2,0],[0,0]],"v":[[70.5,-98.8],[74.2,-102.3],[77.9,-98.8]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,-3.6],[-3.6,0],[-0.8,2],[0,0],[1.6,0],[0.1,2.6],[0,0],[0,0.4],[3.4,0]],"o":[[0,3.7],[2.4,0],[0,0],[-0.5,1.3],[-2.4,0],[0,0],[0,-0.2],[0,-3.4],[-3.7,-0.1]],"v":[[68.4,-97.9],[74.4,-91.8],[79.7,-95],[78,-95.7],[74.5,-93.5],[70.6,-97.4],[80,-97.4],[80.1,-98.4],[74.4,-104]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[61.1,-92.1],[63.2,-92.1],[63.2,-102],[66.3,-102],[66.3,-103.8],[63.2,-103.8],[63.2,-107.4],[61.1,-107.4],[61.1,-103.8],[57.8,-103.8],[57.8,-102],[61.1,-102]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-2,0],[0,-2.2],[0,0],[0,0],[0,0],[2.7,0],[0.6,-1.4],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.5],[2,0],[0,0],[0,0],[0,0],[0,-3.1],[-1.8,0],[0,0],[0,0],[0,0],[0,0]],"v":[[45.1,-92.1],[47.2,-92.1],[47.2,-98.2],[50.6,-102.2],[53.3,-98.8],[53.3,-92.1],[55.4,-92.1],[55.4,-99.3],[51.1,-104.1],[47.2,-101.9],[47,-103.8],[45.2,-103.8],[45.2,-92.1]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[0,0],[-2,0],[-0.1,-2.2]],"o":[[0.2,-2.1],[2.2,0],[0,0]],"v":[[32.6,-98.8],[36.3,-102.3],[40,-98.8]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,-3.6],[-3.6,0],[-0.8,2],[0,0],[1.6,0],[0.1,2.6],[0,0],[0,0.4],[3.4,0]],"o":[[0,3.7],[2.4,0],[0,0],[-0.5,1.3],[-2.4,0],[0,0],[0,-0.2],[0,-3.4],[-3.6,-0.1]],"v":[[30.5,-97.9],[36.5,-91.8],[41.8,-95],[40.1,-95.7],[36.6,-93.5],[32.7,-97.4],[42.1,-97.4],[42.2,-98.4],[36.5,-104]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,-5.4],[-5,0],[-1.1,3],[0,0],[2.7,0],[0,4.2],[-3.6,0],[-0.8,-2.4],[0,0],[3.8,0]],"o":[[0,5.4],[3.6,0],[0,0],[-0.8,2.1],[-3.6,0],[0,-4.2],[2.7,0],[0,0],[-1,-3.1],[-5,-0.1]],"v":[[11.7,-100.8],[20.2,-91.8],[27.9,-96.6],[25.8,-97.3],[20.2,-93.8],[14,-100.8],[20.2,-107.7],[25.8,-103.9],[27.9,-104.6],[20.1,-109.7]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-2.6,-92.1],[-0.5,-92.1],[-0.5,-102],[2.6,-102],[2.6,-103.8],[-0.5,-103.8],[-0.5,-107.4],[-2.6,-107.4],[-2.6,-103.8],[-5.9,-103.8],[-5.9,-102],[-2.6,-102]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[0,-3.6],[-3.5,0],[-0.8,2.3],[0,0],[1.8,0],[0,2.6],[-2.3,0],[-0.5,-1.5],[0,0],[2.6,0]],"o":[[0,3.6],[2.6,0],[0,0],[-0.5,1.5],[-2.3,0],[0,-2.6],[1.6,0],[0,0],[-0.6,-2.1],[-3.7,0]],"v":[[-19.3,-97.9],[-13.4,-91.8],[-7.8,-95.4],[-9.7,-96.1],[-13.3,-93.7],[-17.1,-98],[-13.3,-102.3],[-9.8,-99.9],[-7.9,-100.6],[-13.3,-104.1]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[2,0],[0,1.3],[-2,0],[0,0],[0,0]],"o":[[-1.6,0],[0,-1.5],[0,0],[0,0],[0,1.8]],"v":[[-27.8,-93.3],[-30.3,-95.4],[-27.2,-97.6],[-24.3,-97.6],[-24.3,-96.2]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[-2.5,0],[-0.5,1.1],[-0.1,-0.4],[0,0],[0,0.8],[0,0],[2.8,0],[0.4,-2.1],[0,0],[-1.7,0],[0,-1.5],[0,0],[0,0],[0,-2.5]],"o":[[2,0],[0,0.7],[0,0],[-0.1,-0.4],[0,0],[0,-2.9],[-2.5,0],[0,0],[0.2,-1.2],[1.6,0],[0,0],[0,0],[-3,0],[-0.1,2.1]],"v":[[-28.3,-91.8],[-24.2,-93.9],[-24,-92.1],[-22,-92.1],[-22.2,-94.5],[-22.2,-99.9],[-26.9,-104.1],[-31.9,-100.8],[-30,-100.4],[-26.9,-102.4],[-24.2,-100.1],[-24.2,-98.9],[-27.3,-98.9],[-32.3,-95.2]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ind":26,"ty":"sh","ix":27,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-39.4,-92.1],[-37.3,-92.1],[-37.3,-102],[-34.2,-102],[-34.2,-103.8],[-37.3,-103.8],[-37.3,-107.4],[-39.4,-107.4],[-39.4,-103.8],[-42.7,-103.8],[-42.7,-102],[-39.4,-102]],"c":true},"ix":2},"nm":"Path 27","mn":"ADBE Vector Shape - Group","hd":false},{"ind":27,"ty":"sh","ix":28,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-2,0],[0,-2.2],[0,0],[0,0],[0,0],[2.7,0],[0.6,-1.4],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.5],[2,0],[0,0],[0,0],[0,0],[0,-3.1],[-1.8,0],[0,0],[0,0],[0,0]],"v":[[-55.5,-92.1],[-53.4,-92.1],[-53.4,-98.2],[-50,-102.2],[-47.3,-98.8],[-47.3,-92.1],[-45.2,-92.1],[-45.2,-99.3],[-49.5,-104.1],[-53.4,-101.9],[-53.6,-103.8],[-55.5,-103.8]],"c":true},"ix":2},"nm":"Path 28","mn":"ADBE Vector Shape - Group","hd":false},{"ind":28,"ty":"sh","ix":29,"ks":{"a":0,"k":{"i":[[0,2.4],[-2.4,0],[0,-2.5],[2.5,0]],"o":[[0,-2.4],[2.5,0],[0,2.4],[-2.4,0]],"v":[[-68.7,-97.9],[-64.7,-102.2],[-60.7,-97.9],[-64.7,-93.6]],"c":true},"ix":2},"nm":"Path 29","mn":"ADBE Vector Shape - Group","hd":false},{"ind":29,"ty":"sh","ix":30,"ks":{"a":0,"k":{"i":[[0,-3.5],[-3.7,0],[0,3.4],[3.8,0]],"o":[[0,3.5],[3.7,0],[0,-3.5],[-3.6,-0.1]],"v":[[-70.8,-97.9],[-64.7,-91.8],[-58.5,-97.9],[-64.7,-104]],"c":true},"ix":2},"nm":"Path 30","mn":"ADBE Vector Shape - Group","hd":false},{"ind":30,"ty":"sh","ix":31,"ks":{"a":0,"k":{"i":[[0,-5.4],[-5,0],[-1.1,3],[0,0],[2.7,0],[0,4.2],[-3.6,0],[-0.8,-2.4],[0,0],[3.8,0]],"o":[[0,5.4],[3.6,0],[0,0],[-0.8,2.1],[-3.6,0],[0,-4.2],[2.7,0],[0,0],[-1,-3.1],[-5,-0.1]],"v":[[-89.6,-100.8],[-81.1,-91.8],[-73.4,-96.6],[-75.5,-97.3],[-81.1,-93.8],[-87.3,-100.8],[-81.1,-107.7],[-75.5,-103.9],[-73.4,-104.6],[-81.2,-109.7]],"c":true},"ix":2},"nm":"Path 31","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":32,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-5.5,0],[0,0],[0,0],[10.5,0],[0,0]],"o":[[0,-5.5],[0,0],[0,0],[0,10.5],[0,0],[0,0]],"v":[[-124.5,-189.5],[-114.5,-199.5],[124.5,-199.5],[124.5,-62.5],[105.5,-43.5],[-124.5,-43.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false}],"ip":19,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"9","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":28,"s":[0]},{"t":39,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[361.361,-103.588],[364.817,-101.266],[368.165,-103.948],[365.825,-106.432],[364.763,-106.666],[363.143,-107.944],[364.817,-109.222],[366.743,-107.818],[368.021,-108.25],[364.745,-110.482],[361.595,-107.872],[364.205,-105.406],[365.123,-105.208],[366.563,-103.894],[364.745,-102.526],[362.639,-104.056]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[352.559,-106.558],[355.349,-109.15],[358.157,-106.558]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[350.975,-105.838],[355.457,-101.266],[359.399,-103.642],[358.139,-104.2],[355.493,-102.58],[352.541,-105.514],[359.615,-105.514],[359.687,-106.27],[355.403,-110.482]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,-2.736],[-2.592,0],[-0.576,1.692],[0,0],[1.332,0],[0,1.908],[-1.746,0],[-0.342,-1.08],[0,0],[1.944,0]],"o":[[0,2.736],[1.944,0],[0,0],[-0.36,1.098],[-1.728,0],[0,-1.926],[1.224,0],[0,0],[-0.468,-1.548],[-2.664,0]],"v":[[340.797,-105.838],[345.189,-101.266],[349.365,-103.966],[347.943,-104.506],[345.243,-102.67],[342.399,-105.874],[345.279,-109.096],[347.871,-107.332],[349.275,-107.89],[345.243,-110.482]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[336.098,-101.5],[336.098,-106.486],[338.438,-108.97],[339.248,-108.826],[339.248,-110.32],[338.438,-110.464],[336.044,-108.916],[335.972,-110.248],[334.55,-110.248],[334.55,-101.5]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,0],[-1.782,0],[-0.432,0.936],[-0.09,-0.414],[0,0],[0,0.702],[0,0],[0,0],[0,0],[1.566,0],[0,1.746],[0,0],[0,0]],"o":[[0,2.502],[1.35,0],[0.036,0.45],[0,0],[-0.09,-0.36],[0,0],[0,0],[0,0],[0,1.458],[-1.152,0],[0,0],[0,0],[0,0]],"v":[[324.087,-104.866],[327.399,-101.266],[330.261,-102.814],[330.423,-101.5],[331.917,-101.5],[331.755,-103.264],[331.755,-110.248],[330.207,-110.248],[330.207,-105.298],[327.813,-102.67],[325.635,-105.064],[325.635,-110.248],[324.087,-110.248]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[314.396,-105.874],[317.42,-109.096],[320.444,-105.874],[317.42,-102.652]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[312.812,-105.874],[317.42,-101.266],[322.046,-105.874],[317.42,-110.482]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[304.232,-103.588],[307.688,-101.266],[311.036,-103.948],[308.696,-106.432],[307.634,-106.666],[306.014,-107.944],[307.688,-109.222],[309.614,-107.818],[310.892,-108.25],[307.616,-110.482],[304.466,-107.872],[307.076,-105.406],[307.994,-105.208],[309.434,-103.894],[307.616,-102.526],[305.51,-104.056]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[293.134,-102.4],[291.226,-103.948],[293.584,-105.586],[295.726,-105.586],[295.726,-104.506]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[292.738,-101.266],[295.834,-102.868],[295.978,-101.5],[297.454,-101.5],[297.274,-103.336],[297.274,-107.368],[293.728,-110.482],[289.966,-108.034],[291.37,-107.71],[293.674,-109.204],[295.726,-107.476],[295.726,-106.594],[293.422,-106.594],[289.66,-103.822]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[284.408,-101.5],[285.956,-101.5],[285.956,-108.916],[288.314,-108.916],[288.314,-110.248],[285.956,-110.248],[285.956,-112.93],[284.408,-112.93],[284.408,-110.248],[281.942,-110.248],[281.942,-108.916],[284.408,-108.916]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[276.031,-102.4],[274.123,-103.948],[276.481,-105.586],[278.623,-105.586],[278.623,-104.506]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[275.635,-101.266],[278.731,-102.868],[278.875,-101.5],[280.351,-101.5],[280.171,-103.336],[280.171,-107.368],[276.625,-110.482],[272.863,-108.034],[274.267,-107.71],[276.571,-109.204],[278.623,-107.476],[278.623,-106.594],[276.319,-106.594],[272.557,-103.822]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[1.8,0],[0,1.89],[-1.782,0],[0,-1.872]],"o":[[-1.782,0],[0,-1.872],[1.8,0],[0,1.89]],"v":[[265.858,-102.634],[263.104,-105.874],[265.858,-109.096],[268.63,-105.874]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[-2.538,0],[-0.558,1.242],[-0.072,-0.594],[0,0],[0,0.828],[0,0],[0,0],[0,0],[1.386,0],[0,-2.646]],"o":[[1.458,0],[0,0.576],[0,0],[-0.108,-0.432],[0,0],[0,0],[0,0],[-0.558,-1.188],[-2.556,0],[0,2.646]],"v":[[265.552,-101.266],[268.792,-103.174],[268.918,-101.5],[270.466,-101.5],[270.268,-103.804],[270.268,-114.55],[268.72,-114.55],[268.72,-108.664],[265.588,-110.482],[261.502,-105.874]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[247.213,-105.874],[250.237,-109.096],[253.261,-105.874],[250.237,-102.652]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[245.629,-105.874],[250.237,-101.266],[254.863,-105.874],[250.237,-110.482]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[240.199,-101.5],[241.747,-101.5],[241.747,-108.916],[244.105,-108.916],[244.105,-110.248],[241.747,-110.248],[241.747,-112.93],[240.199,-112.93],[240.199,-110.248],[237.733,-110.248],[237.733,-108.916],[240.199,-108.916]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[230.375,-114.55],[228.773,-114.55],[228.773,-101.5],[230.375,-101.5]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,-1.638],[1.872,0]],"o":[[0,0],[0,0],[1.602,0],[0,1.476],[0,0]],"v":[[218.334,-108.214],[218.334,-113.11],[221.484,-113.11],[224.148,-110.716],[221.394,-108.214]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[2.664,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,2.376]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[2.502,0],[0,-2.304]],"v":[[221.772,-114.55],[216.732,-114.55],[216.732,-101.5],[218.334,-101.5],[218.334,-106.882],[221.772,-106.882],[225.894,-110.752]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[205.279,-106.054],[207.889,-113.074],[210.571,-106.054]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[201.985,-101.5],[203.605,-101.5],[204.811,-104.704],[211.057,-104.704],[212.299,-101.5],[213.955,-101.5],[208.987,-114.55],[206.827,-114.55]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":70,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":25,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[326.242,-11.244],[329.962,-14.7],[333.706,-11.244]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[324.13,-10.284],[330.106,-4.188],[335.362,-7.356],[333.682,-8.1],[330.154,-5.94],[326.218,-9.852],[335.65,-9.852],[335.746,-10.86],[330.034,-16.476]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.896,0],[0,-2.256],[0,0],[0,0],[0,0],[-1.92,0],[0,-2.208],[0,0],[0,0],[0,0],[2.64,0],[0.648,-1.752],[1.968,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.568],[1.848,0],[0,0],[0,0],[0,0],[0,-2.568],[1.872,0],[0,0],[0,0],[0,0],[0,-3.192],[-1.848,0],[-0.576,-1.8],[-1.704,0],[0,0],[0,0],[0,0]],"v":[[303.308,-4.5],[305.396,-4.5],[305.396,-10.644],[308.636,-14.604],[311.276,-11.22],[311.276,-4.5],[313.34,-4.5],[313.34,-10.644],[316.604,-14.604],[319.22,-11.22],[319.22,-4.5],[321.308,-4.5],[321.308,-11.676],[317.108,-16.476],[313.028,-13.788],[309.14,-16.476],[305.324,-14.22],[305.156,-16.164],[303.308,-16.164]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[290.564,-4.5],[292.628,-4.5],[292.628,-14.388],[297.596,-14.388],[297.596,-4.5],[299.66,-4.5],[299.66,-16.164],[292.628,-16.164],[292.628,-19.74],[290.564,-19.74],[290.564,-16.164],[287.516,-16.164],[287.516,-14.388],[290.564,-14.388]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[-0.864,0],[0,0.888],[0.864,0],[0,-0.864]],"o":[[0.888,0],[0,-0.864],[-0.864,0],[0,0.888]],"v":[[298.628,-18.372],[300.164,-19.86],[298.628,-21.324],[297.092,-19.86]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[277.404,-11.868],[277.404,-10.188],[285.084,-10.188],[285.084,-11.868]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[273.967,-4.5],[273.967,-21.9],[271.903,-21.9],[271.903,-4.5]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[2.016,0],[0,1.248],[-2.064,0],[0,0],[0,0]],"o":[[-1.632,0],[0,-1.464],[0,0],[0,0],[0,1.68]],"v":[[262.783,-5.7],[260.239,-7.764],[263.383,-9.948],[266.239,-9.948],[266.239,-8.508]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[-2.52,0],[-0.504,1.176],[-0.096,-0.432],[0,0],[0,0.864],[0,0],[2.784,0],[0.456,-2.112],[0,0],[-1.704,0],[0,-1.488],[0,0],[0,0],[0,-2.496]],"o":[[1.968,0],[0.024,0.72],[0,0],[-0.144,-0.408],[0,0],[0,-2.904],[-2.52,0],[0,0],[0.192,-1.2],[1.632,0],[0,0],[0,0],[-3,0],[0,2.04]],"v":[[262.255,-4.188],[266.383,-6.324],[266.575,-4.5],[268.543,-4.5],[268.303,-6.948],[268.303,-12.324],[263.575,-16.476],[258.559,-13.212],[260.431,-12.78],[263.503,-14.772],[266.239,-12.468],[266.239,-11.292],[263.167,-11.292],[258.151,-7.596]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[246.367,-11.244],[250.087,-14.7],[253.831,-11.244]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[244.255,-10.284],[250.231,-4.188],[255.487,-7.356],[253.807,-8.1],[250.279,-5.94],[246.343,-9.852],[255.775,-9.852],[255.871,-10.86],[250.159,-16.476]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.944,0],[-0.264,-0.144],[0,0],[0.528,0],[0.552,-1.368],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.992],[0.432,0],[0,0],[-0.24,-0.12],[-1.296,0],[0,0],[0,0],[0,0],[0,0]],"v":[[237.99,-4.5],[237.99,-11.148],[241.11,-14.46],[242.19,-14.268],[242.19,-16.26],[241.11,-16.452],[237.918,-14.388],[237.822,-16.164],[235.926,-16.164],[235.926,-4.5]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.968,0],[0,-2.208],[0,0],[0,0],[0,0],[2.736,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.52],[1.968,0],[0,0],[0,0],[0,0],[0,-3.144],[-1.752,0],[0,0],[0,0],[0,0]],"v":[[359.066,-32.5],[361.13,-32.5],[361.13,-38.644],[364.49,-42.604],[367.226,-39.196],[367.226,-32.5],[369.29,-32.5],[369.29,-39.7],[364.994,-44.476],[361.058,-42.244],[360.89,-44.164],[359.066,-44.164]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[353.347,-32.5],[355.411,-32.5],[355.411,-44.164],[353.347,-44.164]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[-0.864,0],[0,0.888],[0.888,0],[0,-0.864]],"o":[[0.888,0],[0,-0.864],[-0.864,0],[0,0.888]],"v":[[354.379,-46.372],[355.915,-47.86],[354.379,-49.324],[352.843,-47.86]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.968,0],[0,-2.208],[0,0],[0,0],[0,0],[2.736,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.52],[1.968,0],[0,0],[0,0],[0,0],[0,-3.144],[-1.752,0],[0,0],[0,0],[0,0]],"v":[[333.191,-32.5],[335.255,-32.5],[335.255,-38.644],[338.615,-42.604],[341.351,-39.196],[341.351,-32.5],[343.415,-32.5],[343.415,-39.7],[339.119,-44.476],[335.183,-42.244],[335.015,-44.164],[333.191,-44.164]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[319.96,-38.332],[323.992,-42.628],[328.024,-38.332],[323.992,-34.036]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[317.848,-38.332],[323.992,-32.188],[330.16,-38.332],[323.992,-44.476]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[305.728,-32.5],[307.792,-32.5],[307.792,-42.388],[312.76,-42.388],[312.76,-32.5],[314.824,-32.5],[314.824,-44.164],[307.792,-44.164],[307.792,-47.74],[305.728,-47.74],[305.728,-44.164],[302.68,-44.164],[302.68,-42.388],[305.728,-42.388]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[-0.864,0],[0,0.888],[0.864,0],[0,-0.864]],"o":[[0.888,0],[0,-0.864],[-0.864,0],[0,0.888]],"v":[[313.792,-46.372],[315.328,-47.86],[313.792,-49.324],[312.256,-47.86]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[2.016,0],[0,1.248],[-2.064,0],[0,0],[0,0]],"o":[[-1.632,0],[0,-1.464],[0,0],[0,0],[0,1.68]],"v":[[294.799,-33.7],[292.255,-35.764],[295.399,-37.948],[298.255,-37.948],[298.255,-36.508]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[-2.52,0],[-0.504,1.176],[-0.096,-0.432],[0,0],[0,0.864],[0,0],[2.784,0],[0.456,-2.112],[0,0],[-1.704,0],[0,-1.488],[0,0],[0,0],[0,-2.496]],"o":[[1.968,0],[0.024,0.72],[0,0],[-0.144,-0.408],[0,0],[0,-2.904],[-2.52,0],[0,0],[0.192,-1.2],[1.632,0],[0,0],[0,0],[-3,0],[0,2.04]],"v":[[294.271,-32.188],[298.399,-34.324],[298.591,-32.5],[300.559,-32.5],[300.319,-34.948],[300.319,-40.324],[295.591,-44.476],[290.575,-41.212],[292.447,-40.78],[295.519,-42.772],[298.255,-40.468],[298.255,-39.292],[295.183,-39.292],[290.167,-35.596]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[-2.424,0],[0,2.136],[1.728,0.336],[0,0],[0,0.864],[-1.368,0],[-0.24,-1.176],[0,0],[2.376,0],[0,-2.088],[-2.424,-0.528],[0,0],[0,-1.056],[1.464,0],[0.24,1.368]],"o":[[0.36,1.872],[2.736,0],[0,-1.968],[0,0],[-1.488,-0.312],[0,-1.08],[1.344,0],[0,0],[-0.312,-1.8],[-2.472,0],[0,1.608],[0,0],[1.032,0.216],[0,1.224],[-1.44,0],[0,0]],"v":[[278.706,-35.284],[283.314,-32.188],[287.778,-35.764],[284.658,-39.076],[283.242,-39.388],[281.082,-41.092],[283.314,-42.796],[285.882,-40.924],[287.586,-41.5],[283.218,-44.476],[279.018,-40.996],[282.498,-37.708],[283.722,-37.444],[285.642,-35.692],[283.218,-33.868],[280.41,-35.908]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.944,0],[-0.264,-0.144],[0,0],[0.528,0],[0.552,-1.368],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.992],[0.432,0],[0,0],[-0.24,-0.12],[-1.296,0],[0,0],[0,0],[0,0],[0,0]],"v":[[272.982,-32.5],[272.982,-39.148],[276.102,-42.46],[277.182,-42.268],[277.182,-44.26],[276.102,-44.452],[272.91,-42.388],[272.814,-44.164],[270.918,-44.164],[270.918,-32.5]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[258.438,-39.244],[262.158,-42.7],[265.902,-39.244]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[256.326,-38.284],[262.302,-32.188],[267.558,-35.356],[265.878,-36.1],[262.35,-33.94],[258.414,-37.852],[267.846,-37.852],[267.942,-38.86],[262.23,-44.476]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ind":26,"ty":"sh","ix":27,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[247.597,-32.5],[249.757,-32.5],[254.581,-44.164],[252.349,-44.164],[248.701,-34.9],[245.053,-44.164],[242.749,-44.164]],"c":true},"ix":2},"nm":"Path 27","mn":"ADBE Vector Shape - Group","hd":false},{"ind":27,"ty":"sh","ix":28,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.968,0],[0,-2.208],[0,0],[0,0],[0,0],[2.736,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.52],[1.968,0],[0,0],[0,0],[0,0],[0,-3.144],[-1.752,0],[0,0],[0,0],[0,0]],"v":[[230.16,-32.5],[232.224,-32.5],[232.224,-38.644],[235.584,-42.604],[238.32,-39.196],[238.32,-32.5],[240.384,-32.5],[240.384,-39.7],[236.088,-44.476],[232.152,-42.244],[231.984,-44.164],[230.16,-44.164]],"c":true},"ix":2},"nm":"Path 28","mn":"ADBE Vector Shape - Group","hd":false},{"ind":28,"ty":"sh","ix":29,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[216.929,-38.332],[220.961,-42.628],[224.993,-38.332],[220.961,-34.036]],"c":true},"ix":2},"nm":"Path 29","mn":"ADBE Vector Shape - Group","hd":false},{"ind":29,"ty":"sh","ix":30,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[214.817,-38.332],[220.961,-32.188],[227.129,-38.332],[220.961,-44.476]],"c":true},"ix":2},"nm":"Path 30","mn":"ADBE Vector Shape - Group","hd":false},{"ind":30,"ty":"sh","ix":31,"ks":{"a":0,"k":{"i":[[0,-3.648],[-3.456,0],[-0.768,2.256],[0,0],[1.776,0],[0,2.544],[-2.328,0],[-0.456,-1.44],[0,0],[2.592,0]],"o":[[0,3.648],[2.592,0],[0,0],[-0.48,1.464],[-2.304,0],[0,-2.568],[1.632,0],[0,0],[-0.624,-2.064],[-3.552,0]],"v":[[201.271,-38.284],[207.127,-32.188],[212.695,-35.788],[210.799,-36.508],[207.199,-34.06],[203.407,-38.332],[207.247,-42.628],[210.703,-40.276],[212.575,-41.02],[207.199,-44.476]],"c":true},"ix":2},"nm":"Path 31","mn":"ADBE Vector Shape - Group","hd":false},{"ind":31,"ty":"sh","ix":32,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[377.127,-60.5],[377.127,-77.9],[375.063,-77.9],[375.063,-60.5]],"c":true},"ix":2},"nm":"Path 32","mn":"ADBE Vector Shape - Group","hd":false},{"ind":32,"ty":"sh","ix":33,"ks":{"a":0,"k":{"i":[[2.016,0],[0,1.248],[-2.064,0],[0,0],[0,0]],"o":[[-1.632,0],[0,-1.464],[0,0],[0,0],[0,1.68]],"v":[[365.944,-61.7],[363.4,-63.764],[366.544,-65.948],[369.4,-65.948],[369.4,-64.508]],"c":true},"ix":2},"nm":"Path 33","mn":"ADBE Vector Shape - Group","hd":false},{"ind":33,"ty":"sh","ix":34,"ks":{"a":0,"k":{"i":[[-2.52,0],[-0.504,1.176],[-0.096,-0.432],[0,0],[0,0.864],[0,0],[2.784,0],[0.456,-2.112],[0,0],[-1.704,0],[0,-1.488],[0,0],[0,0],[0,-2.496]],"o":[[1.968,0],[0.024,0.72],[0,0],[-0.144,-0.408],[0,0],[0,-2.904],[-2.52,0],[0,0],[0.192,-1.2],[1.632,0],[0,0],[0,0],[-3,0],[0,2.04]],"v":[[365.416,-60.188],[369.544,-62.324],[369.736,-60.5],[371.704,-60.5],[371.464,-62.948],[371.464,-68.324],[366.736,-72.476],[361.72,-69.212],[363.592,-68.78],[366.664,-70.772],[369.4,-68.468],[369.4,-67.292],[366.328,-67.292],[361.312,-63.596]],"c":true},"ix":2},"nm":"Path 34","mn":"ADBE Vector Shape - Group","hd":false},{"ind":34,"ty":"sh","ix":35,"ks":{"a":0,"k":{"i":[[0,0],[-2.376,0],[-0.576,1.248],[-0.12,-0.552],[0,0],[0,0.936],[0,0],[0,0],[0,0],[2.088,0],[0,2.328],[0,0],[0,0]],"o":[[0,3.336],[1.8,0],[0.048,0.6],[0,0],[-0.12,-0.48],[0,0],[0,0],[0,0],[0,1.944],[-1.536,0],[0,0],[0,0],[0,0]],"v":[[348.057,-64.988],[352.473,-60.188],[356.289,-62.252],[356.505,-60.5],[358.497,-60.5],[358.281,-62.852],[358.281,-72.164],[356.217,-72.164],[356.217,-65.564],[353.025,-62.06],[350.121,-65.252],[350.121,-72.164],[348.057,-72.164]],"c":true},"ix":2},"nm":"Path 35","mn":"ADBE Vector Shape - Group","hd":false},{"ind":35,"ty":"sh","ix":36,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[340.198,-60.5],[342.262,-60.5],[342.262,-70.388],[345.406,-70.388],[345.406,-72.164],[342.262,-72.164],[342.262,-75.74],[340.198,-75.74],[340.198,-72.164],[336.91,-72.164],[336.91,-70.388],[340.198,-70.388]],"c":true},"ix":2},"nm":"Path 36","mn":"ADBE Vector Shape - Group","hd":false},{"ind":36,"ty":"sh","ix":37,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[332.135,-72.164],[329.279,-67.916],[326.447,-72.164],[323.999,-72.164],[327.911,-66.572],[323.855,-60.5],[326.255,-60.5],[329.279,-65.036],[332.375,-60.5],[334.775,-60.5],[330.695,-66.548],[334.583,-72.164]],"c":true},"ix":2},"nm":"Path 37","mn":"ADBE Vector Shape - Group","hd":false},{"ind":37,"ty":"sh","ix":38,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[312.496,-67.244],[316.216,-70.7],[319.96,-67.244]],"c":true},"ix":2},"nm":"Path 38","mn":"ADBE Vector Shape - Group","hd":false},{"ind":38,"ty":"sh","ix":39,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[310.384,-66.284],[316.36,-60.188],[321.616,-63.356],[319.936,-64.1],[316.408,-61.94],[312.472,-65.852],[321.904,-65.852],[322,-66.86],[316.288,-72.476]],"c":true},"ix":2},"nm":"Path 39","mn":"ADBE Vector Shape - Group","hd":false},{"ind":39,"ty":"sh","ix":40,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[303.12,-60.5],[305.184,-60.5],[305.184,-70.388],[308.328,-70.388],[308.328,-72.164],[305.184,-72.164],[305.184,-75.74],[303.12,-75.74],[303.12,-72.164],[299.832,-72.164],[299.832,-70.388],[303.12,-70.388]],"c":true},"ix":2},"nm":"Path 40","mn":"ADBE Vector Shape - Group","hd":false},{"ind":40,"ty":"sh","ix":41,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.968,0],[0,-2.208],[0,0],[0,0],[0,0],[2.736,0],[0.6,-1.416],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-2.52],[1.968,0],[0,0],[0,0],[0,0],[0,-3.144],[-1.752,0],[0,0],[0,0],[0,0]],"v":[[287.101,-60.5],[289.165,-60.5],[289.165,-66.644],[292.525,-70.604],[295.261,-67.196],[295.261,-60.5],[297.325,-60.5],[297.325,-67.7],[293.029,-72.476],[289.093,-70.244],[288.925,-72.164],[287.101,-72.164]],"c":true},"ix":2},"nm":"Path 41","mn":"ADBE Vector Shape - Group","hd":false},{"ind":41,"ty":"sh","ix":42,"ks":{"a":0,"k":{"i":[[0,2.448],[-2.472,0],[0,-2.448],[2.496,0]],"o":[[0,-2.448],[2.496,0],[0,2.448],[-2.472,0]],"v":[[273.871,-66.332],[277.903,-70.628],[281.935,-66.332],[277.903,-62.036]],"c":true},"ix":2},"nm":"Path 42","mn":"ADBE Vector Shape - Group","hd":false},{"ind":42,"ty":"sh","ix":43,"ks":{"a":0,"k":{"i":[[0,-3.48],[-3.696,0],[0,3.48],[3.72,0]],"o":[[0,3.48],[3.72,0],[0,-3.48],[-3.696,0]],"v":[[271.759,-66.332],[277.903,-60.188],[284.071,-66.332],[277.903,-72.476]],"c":true},"ix":2},"nm":"Path 43","mn":"ADBE Vector Shape - Group","hd":false},{"ind":43,"ty":"sh","ix":44,"ks":{"a":0,"k":{"i":[[0,-3.648],[-3.456,0],[-0.768,2.256],[0,0],[1.776,0],[0,2.544],[-2.328,0],[-0.456,-1.44],[0,0],[2.592,0]],"o":[[0,3.648],[2.592,0],[0,0],[-0.48,1.464],[-2.304,0],[0,-2.568],[1.632,0],[0,0],[-0.624,-2.064],[-3.552,0]],"v":[[258.212,-66.284],[264.068,-60.188],[269.636,-63.788],[267.74,-64.508],[264.14,-62.06],[260.348,-66.332],[264.188,-70.628],[267.644,-68.276],[269.516,-69.02],[264.14,-72.476]],"c":true},"ix":2},"nm":"Path 44","mn":"ADBE Vector Shape - Group","hd":false},{"ind":44,"ty":"sh","ix":45,"ks":{"a":0,"k":{"i":[[0,0],[-2.016,0],[-0.096,-2.112]],"o":[[0.24,-2.136],[2.16,0],[0,0]],"v":[[239.887,-67.244],[243.607,-70.7],[247.351,-67.244]],"c":true},"ix":2},"nm":"Path 45","mn":"ADBE Vector Shape - Group","hd":false},{"ind":45,"ty":"sh","ix":46,"ks":{"a":0,"k":{"i":[[0,-3.624],[-3.528,0],[-0.744,1.944],[0,0],[1.584,0],[0.12,2.592],[0,0],[0,0.408],[3.408,0]],"o":[[0,3.696],[2.424,0],[0,0],[-0.504,1.296],[-2.376,0],[0,0],[0.048,-0.24],[0,-3.36],[-3.576,0]],"v":[[237.775,-66.284],[243.751,-60.188],[249.007,-63.356],[247.327,-64.1],[243.799,-61.94],[239.863,-65.852],[249.295,-65.852],[249.391,-66.86],[243.679,-72.476]],"c":true},"ix":2},"nm":"Path 46","mn":"ADBE Vector Shape - Group","hd":false},{"ind":46,"ty":"sh","ix":47,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[229.046,-60.5],[231.206,-60.5],[236.03,-72.164],[233.798,-72.164],[230.15,-62.9],[226.502,-72.164],[224.198,-72.164]],"c":true},"ix":2},"nm":"Path 47","mn":"ADBE Vector Shape - Group","hd":false},{"ind":47,"ty":"sh","ix":48,"ks":{"a":0,"k":{"i":[[2.016,0],[0,1.248],[-2.064,0],[0,0],[0,0]],"o":[[-1.632,0],[0,-1.464],[0,0],[0,0],[0,1.68]],"v":[[216.319,-61.7],[213.775,-63.764],[216.919,-65.948],[219.775,-65.948],[219.775,-64.508]],"c":true},"ix":2},"nm":"Path 48","mn":"ADBE Vector Shape - Group","hd":false},{"ind":48,"ty":"sh","ix":49,"ks":{"a":0,"k":{"i":[[-2.52,0],[-0.504,1.176],[-0.096,-0.432],[0,0],[0,0.864],[0,0],[2.784,0],[0.456,-2.112],[0,0],[-1.704,0],[0,-1.488],[0,0],[0,0],[0,-2.496]],"o":[[1.968,0],[0.024,0.72],[0,0],[-0.144,-0.408],[0,0],[0,-2.904],[-2.52,0],[0,0],[0.192,-1.2],[1.632,0],[0,0],[0,0],[-3,0],[0,2.04]],"v":[[215.791,-60.188],[219.919,-62.324],[220.111,-60.5],[222.079,-60.5],[221.839,-62.948],[221.839,-68.324],[217.111,-72.476],[212.095,-69.212],[213.967,-68.78],[217.039,-70.772],[219.775,-68.468],[219.775,-67.292],[216.703,-67.292],[211.687,-63.596]],"c":true},"ix":2},"nm":"Path 49","mn":"ADBE Vector Shape - Group","hd":false},{"ind":49,"ty":"sh","ix":50,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[196.46,-60.5],[196.46,-68.252],[206.156,-68.252],[206.156,-60.5],[208.292,-60.5],[208.292,-77.9],[206.156,-77.9],[206.156,-70.172],[196.46,-70.172],[196.46,-77.9],[194.324,-77.9],[194.324,-60.5]],"c":true},"ix":2},"nm":"Path 50","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":51,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":28,"op":1825,"st":25,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"10","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":30,"s":[0]},{"t":41,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[184.754,66.091],[172.934,54.259],[184.755,42.439],[186.876,44.561],[177.176,54.261],[186.877,63.97]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[395.5,55.53],[174.5,55.53],[174.5,52.53],[395.5,52.53]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[385.24,40.091],[383.119,37.97],[392.819,28.27],[383.118,18.561],[385.241,16.439],[397.062,28.27]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[395.5,30],[174.5,30],[174.5,27],[395.5,27]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":1,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false}],"ip":30,"op":1827,"st":27,"bm":0},{"ddd":0,"ind":9,"ty":4,"nm":"11","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":34,"s":[0]},{"t":45,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[506.49,-17.225],[506.49,3.879]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-2.76,0],[0,3.917],[0,0]],"o":[[2.3,0.487],[9.34,0],[0,0],[0,0]],"v":[[515.74,12.146],[523.4,12.917],[540.32,5.822],[540.32,-17.225]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[9.34,0],[0,3.917]],"o":[[0,3.917],[-9.34,0],[0,0]],"v":[[540.32,-2.154],[523.4,4.941],[506.49,-2.154]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[9.34,0],[0,3.917]],"o":[[0,3.917],[-9.34,0],[0,0]],"v":[[540.32,-10.138],[523.4,-3.043],[506.49,-10.138]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":1,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-9.34,0],[0,3.918],[9.34,0],[0,-3.919]],"o":[[9.34,0],[0,-3.919],[-9.34,0],[0,3.918]],"v":[[523.4,-10.13],[540.32,-17.225],[523.4,-24.32],[506.49,-17.225]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":1,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-9.34,0],[-2.7,0.771]],"o":[[0,0],[0,3.917],[3.53,0],[0,0]],"v":[[457.68,-17.225],[457.68,5.83],[474.6,12.925],[484.11,11.697]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":1,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[491.51,5.822],[491.51,-17.225]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":1,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[9.34,0],[0,3.917]],"o":[[0,3.917],[-9.34,0],[0,0]],"v":[[491.51,-2.154],[474.59,4.941],[457.68,-2.154]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 8","np":1,"cix":2,"bm":0,"ix":8,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[9.34,0],[0,3.917]],"o":[[0,3.917],[-9.34,0],[0,0]],"v":[[491.51,-10.138],[474.59,-3.043],[457.68,-10.138]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 9","np":1,"cix":2,"bm":0,"ix":9,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-9.34,0],[0,3.918],[9.34,0],[0,-3.919]],"o":[[9.34,0],[0,-3.919],[-9.34,0],[0,3.918]],"v":[[474.6,-10.13],[491.51,-17.225],[474.6,-24.32],[457.68,-17.225]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 10","np":1,"cix":2,"bm":0,"ix":10,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-9.34,0],[0,3.917],[0,0]],"o":[[0,0],[0,3.917],[9.34,0],[0,0],[0,0]],"v":[[482.91,11.178],[482.91,34.233],[499.82,41.328],[516.74,34.233],[516.74,11.178]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 11","np":1,"cix":2,"bm":0,"ix":11,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[9.34,0],[0,3.917]],"o":[[0,3.917],[-9.34,0],[0,0]],"v":[[516.74,26.249],[499.82,33.344],[482.91,26.249]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 12","np":1,"cix":2,"bm":0,"ix":12,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[9.34,0],[0,3.917]],"o":[[0,3.917],[-9.34,0],[0,0]],"v":[[516.74,18.273],[499.82,25.368],[482.91,18.273]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 13","np":1,"cix":2,"bm":0,"ix":13,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-9.34,0],[0,3.919],[9.34,0],[0,-3.918]],"o":[[9.34,0],[0,-3.918],[-9.34,0],[0,3.919]],"v":[[499.82,18.273],[516.74,11.178],[499.82,4.083],[482.91,11.178]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 14","np":1,"cix":2,"bm":0,"ix":14,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":14,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":34,"op":1831,"st":31,"bm":0},{"ddd":0,"ind":10,"ty":4,"nm":"Layer 4","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":36,"s":[0]},{"t":47,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,-11],[-0.5,-31.8]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":36,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":11,"ty":4,"nm":"Layer 2","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":38,"s":[0]},{"t":49,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.9,0],[0,1.6],[1.3,0.3],[0,0],[0,0.7],[-1.1,0],[-0.2,-0.9],[0,0],[1.8,0],[0,-1.6],[-1.8,-0.4],[0,0],[0,-0.8],[1.1,0],[0.2,1]],"o":[[0.3,1.4],[2.1,0],[0,-1.5],[0,0],[-1.1,-0.2],[0,-0.8],[1,0],[0,0],[-0.2,-1.4],[-1.9,0],[0,1.2],[0,0],[0.8,0.2],[0,0.9],[-1.1,0],[0,0]],"v":[[55.3,40.2],[58.8,42.5],[62.1,39.8],[59.8,37.3],[58.7,37.1],[57.1,35.8],[58.8,34.5],[60.7,35.9],[62,35.5],[58.7,33.3],[55.6,35.9],[58.2,38.4],[59.1,38.6],[60.5,39.9],[58.7,41.3],[56.6,39.8]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-1.5,0],[-0.1,-1.6]],"o":[[0.2,-1.6],[1.6,0],[0,0]],"v":[[46.5,37.2],[49.3,34.6],[52.1,37.2]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,-2.8],[-2.7,0],[-0.5,1.5],[0,0],[1.1,0],[0.1,1.9],[0,0],[0,0.4],[2.6,0]],"o":[[0,2.8],[1.8,0],[0,0],[-0.4,1],[-1.8,0],[0,0],[0,-0.2],[0,-2.5],[-2.7,0]],"v":[[44.9,38],[49.4,42.6],[53.3,40.2],[52,39.6],[49.4,41.2],[46.4,38.3],[53.5,38.3],[53.6,37.5],[49.3,33.3]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,0],[-1.8,0],[-0.5,0.9],[-0.1,-0.4],[0,0],[0,0.7],[0,0],[0,0],[0,0],[1.6,0],[0,1.8],[0,0],[0,0],[0,0]],"o":[[0,2.5],[1.4,0],[0,0.5],[0,0],[-0.1,-0.4],[0,0],[0,0],[0,0],[0,1.5],[-1.2,0],[0,0],[0,0],[0,0],[0,0]],"v":[[34.9,38.9],[38.2,42.5],[41.1,41],[41.3,42.3],[42.8,42.3],[42.6,40.5],[42.6,33.5],[41.1,33.5],[41.1,38.4],[38.7,41],[36.5,38.6],[36.5,33.5],[35,33.5],[35,38.9]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,0],[-1.9,0],[0,1.6],[1.3,0.3],[0,0],[0,0.7],[-1.1,0],[-0.2,-0.9],[0,0],[1.8,0],[0,-1.6],[-1.8,-0.4],[0,0],[0,-0.8],[1.1,0],[0.2,1]],"o":[[0.3,1.4],[2.1,0],[0,-1.5],[0,0],[-1.1,-0.2],[0,-0.8],[1,0],[0,0],[-0.2,-1.4],[-1.9,0],[0,1.2],[0,0],[0.8,0.2],[0,0.9],[-1.1,0],[0,0]],"v":[[26.2,40.2],[29.7,42.5],[33,39.8],[30.7,37.3],[29.6,37.1],[28,35.8],[29.7,34.5],[31.6,35.9],[32.9,35.5],[29.6,33.3],[26.5,35.9],[29.1,38.4],[30,38.6],[31.4,39.9],[29.6,41.3],[27.5,39.8]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,0],[-1.9,0],[0,1.6],[1.3,0.3],[0,0],[0,0.7],[-1.1,0],[-0.2,-0.9],[0,0],[1.8,0],[0,-1.6],[-1.8,-0.4],[0,0],[0,-0.8],[1.1,0],[0.2,1]],"o":[[0.3,1.4],[2.1,0],[0,-1.5],[0,0],[-1.1,-0.2],[0,-0.8],[1,0],[0,0],[-0.2,-1.4],[-1.9,0],[0,1.2],[0,0],[0.8,0.2],[0,0.9],[-1.1,0],[0,0]],"v":[[17.6,40.2],[21.1,42.5],[24.4,39.8],[22.1,37.3],[21,37.1],[19.4,35.8],[21.1,34.5],[23,35.9],[24.3,35.5],[21,33.3],[17.9,35.9],[20.5,38.4],[21.4,38.6],[22.8,39.9],[21,41.3],[18.9,39.8]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[13.9,42.3],[15.4,42.3],[15.4,33.5],[13.9,33.5]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[-0.7,0],[0,0.7],[0.7,0],[0,-0.7]],"o":[[0.7,0],[0,-0.6],[-0.6,0],[0,0.6]],"v":[[14.7,31.9],[15.9,30.8],[14.7,29.7],[13.5,30.8]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[5,33.5],[2.9,36.7],[0.8,33.5],[-1,33.5],[1.9,37.7],[-1.1,42.3],[0.7,42.3],[3,38.9],[5.3,42.3],[7.1,42.3],[4,37.8],[6.9,33.6],[5,33.6]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[0,0],[-1.5,0],[-0.1,-1.6]],"o":[[0.2,-1.6],[1.6,0],[0,0]],"v":[[-9.8,37.2],[-7,34.6],[-4.2,37.2]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[0,-2.8],[-2.7,0],[-0.5,1.5],[0,0],[1.1,0],[0.1,1.9],[0,0],[0,0.4],[2.6,0]],"o":[[0,2.8],[1.8,0],[0,0],[-0.4,1],[-1.8,0],[0,0],[0,-0.2],[0,-2.5],[-2.7,0]],"v":[[-11.3,38],[-6.8,42.6],[-2.9,40.2],[-4.2,39.6],[-6.8,41.2],[-9.8,38.3],[-2.7,38.3],[-2.6,37.5],[-6.9,33.3]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-13.7,42.3],[-13.7,29.3],[-15.2,29.3],[-15.2,42.3]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[1.8,0],[0,1.8],[-1.8,0],[0,-1.9]],"o":[[-1.8,0],[0,-1.9],[1.8,0],[0,1.8]],"v":[[-21.9,41.2],[-24.7,38],[-21.9,34.8],[-19.1,38]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.3,0],[0,2.6],[2.5,0],[0.6,-1.2],[0,0],[0,0]],"o":[[0,0],[0,0],[0.6,1.1],[2.5,0],[0,-2.6],[-1.4,0],[0,0],[0,0],[0,0]],"v":[[-26.3,46],[-24.8,46],[-24.8,40.8],[-21.7,42.5],[-17.7,37.9],[-21.7,33.3],[-24.9,35.2],[-25,33.5],[-26.3,33.5]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.4,0],[0,-1.7],[0,0],[0,0],[0,0],[-1.4,0],[0,-1.6],[0,0],[0,0],[0,0],[2,0],[0.5,-1.3],[1.5,0],[0.5,-1.1],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.9],[1.4,0],[0,0],[0,0],[0,0],[0,-1.9],[1.4,0],[0,0],[0,0],[0,0],[0,-2.4],[-1.4,0],[-0.4,-1.4],[-1.3,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-42.4,42.3],[-40.8,42.3],[-40.8,37.7],[-38.4,34.7],[-36.4,37.2],[-36.4,42.2],[-34.9,42.2],[-34.9,37.6],[-32.5,34.6],[-30.5,37.1],[-30.5,42.1],[-28.9,42.1],[-28.9,36.7],[-32.1,33.1],[-35.2,35.1],[-38.1,33.1],[-41,34.8],[-41.1,33.3],[-42.5,33.3],[-42.5,42.3]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,1.8],[-1.8,0],[0,-1.8],[1.8,0]],"o":[[0,-1.8],[1.9,0],[0,1.8],[-1.8,0]],"v":[[-52.3,37.9],[-49.3,34.7],[-46.3,37.9],[-49.3,41.1]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,-2.6],[-2.8,0],[0,2.6],[2.8,0]],"o":[[0,2.6],[2.8,0],[0,-2.6],[-2.7,0]],"v":[[-53.9,37.9],[-49.3,42.5],[-44.7,37.9],[-49.3,33.3]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,-2.8],[-2.6,0],[-0.6,1.7],[0,0],[1.3,0],[0,1.9],[-1.8,0],[-0.4,-1.1],[0,0],[1.9,0]],"o":[[0,2.7],[1.9,0],[0,0],[-0.4,1.1],[-1.7,0],[0,-1.9],[1.2,0],[0,0],[-0.5,-1.5],[-2.9,-0.1]],"v":[[-64,38],[-59.6,42.6],[-55.4,39.9],[-56.8,39.4],[-59.5,41.2],[-62.3,38],[-59.4,34.8],[-56.8,36.6],[-55.4,36],[-59.4,33.4]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[-0.6,0],[-0.8,1.9],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0.9,0],[0.2,0.2],[0,0]],"o":[[1.4,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[-0.5,1.2],[-0.5,0],[0,0],[0.2,0.3]],"v":[[49.7,22.1],[53,19.7],[57.7,9.5],[56,9.5],[53.1,16.1],[50.2,9.5],[48.5,9.5],[52.2,17.6],[51.5,19.1],[49.4,20.7],[48.3,20.4],[48.3,21.7]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.5,0],[0,-1.7],[0,0],[0,0],[0,0],[2,0],[0.5,-1],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.9],[1.5,0],[0,0],[0,0],[0,0],[0,-2.4],[-1.3,0],[0,0],[0,0],[0,0]],"v":[[39.5,18.3],[41,18.3],[41,13.7],[43.5,10.7],[45.6,13.3],[45.6,18.3],[47.1,18.3],[47.1,12.9],[43.9,9.3],[41,10.9],[41,5.2],[39.5,5.2]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[33.5,18.3],[35,18.3],[35,10.9],[37.4,10.9],[37.4,9.5],[35,9.5],[35,6.8],[33.5,6.8],[33.5,9.5],[31,9.5],[31,10.8],[33.5,10.8]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[1.5,0],[0,0.9],[-1.6,0],[0,0],[0,0]],"o":[[-1.2,0],[0,-1.1],[0,0],[0,0],[0,1.1]],"v":[[25.1,17.4],[23.2,15.9],[25.6,14.3],[27.7,14.3],[27.7,15.4]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[-1.9,0],[-0.4,0.9],[0,-0.4],[0,0],[0,0.6],[0,0],[2,0],[0.4,-1.5],[0,0],[-1.3,0],[0,-1.1],[0,0],[0,0],[0,-1.9]],"o":[[1.5,0],[0,0.5],[0,0],[-0.1,-0.3],[0,0],[0,-2.2],[-1.9,0],[0,0],[0.1,-0.9],[1.2,0],[0,0],[0,0],[-2.2,0],[0,1.5]],"v":[[24.7,18.5],[27.8,16.9],[27.9,18.3],[29.4,18.3],[29.2,16.5],[29.2,12.5],[25.7,9.4],[21.9,11.8],[23.3,12.1],[25.6,10.6],[27.7,12.3],[27.7,13.2],[25.4,13.2],[21.6,16]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[1.8,0],[0,1.8],[-1.8,0],[0,-1.9]],"o":[[-1.8,0],[0,-1.8],[1.8,0],[0,1.9]],"v":[[15.5,17.2],[12.7,14],[15.5,10.8],[18.3,14]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.3,0],[0,2.6],[2.6,0],[0.6,-1.2],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0.6,1.1],[2.5,0],[0,-2.6],[-1.4,0],[0,0],[0,0],[0,0],[0,0]],"v":[[11.1,22],[12.6,22],[12.6,16.8],[15.7,18.5],[19.8,13.9],[15.7,9.3],[12.5,11.2],[12.5,9.5],[11.2,9.5],[11.2,22]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.4,0],[0,-1.7],[0,0],[0,0],[0,0],[-1.4,0],[0,-1.6],[0,0],[0,0],[0,0],[1.9,0],[0.5,-1.3],[1.5,0],[0.5,-1.1],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.9],[1.4,0],[0,0],[0,0],[0,0],[0,-1.9],[1.4,0],[0,0],[0,0],[0,0],[0,-2.4],[-1.4,0],[-0.4,-1.4],[-1.3,0],[0,0],[0,0],[0,0]],"v":[[-5,18.3],[-3.4,18.3],[-3.4,13.7],[-1,10.7],[1,13.2],[1,18.2],[2.5,18.2],[2.5,13.6],[4.9,10.6],[6.9,13.1],[6.9,18.1],[8.5,18.1],[8.5,12.7],[5.4,9.1],[2.3,11.1],[-0.6,9.1],[-3.5,10.8],[-3.6,9.3],[-5,9.3]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ind":26,"ty":"sh","ix":27,"ks":{"a":0,"k":{"i":[[0,0],[-1.5,0],[-0.1,-1.6]],"o":[[0.2,-1.6],[1.6,0],[0,0]],"v":[[-14.3,13.2],[-11.5,10.6],[-8.7,13.2]],"c":true},"ix":2},"nm":"Path 27","mn":"ADBE Vector Shape - Group","hd":false},{"ind":27,"ty":"sh","ix":28,"ks":{"a":0,"k":{"i":[[0,-2.7],[-2.7,0],[-0.5,1.5],[0,0],[1.1,0],[0.1,1.9],[0,0],[0,0.4],[2.6,0]],"o":[[0,2.8],[1.8,0],[0,0],[-0.4,1],[-1.8,0],[0,0],[0,-0.2],[0,-2.5],[-2.7,0.1]],"v":[[-15.9,13.9],[-11.4,18.5],[-7.5,16.1],[-8.8,15.5],[-11.4,17.1],[-14.4,14.2],[-7.3,14.2],[-7.2,13.4],[-11.5,9.2]],"c":true},"ix":2},"nm":"Path 28","mn":"ADBE Vector Shape - Group","hd":false},{"ind":28,"ty":"sh","ix":29,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.5,0],[0,-1.7],[0,0],[0,0],[0,0],[2,0],[0.5,-1],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.9],[1.5,0],[0,0],[0,0],[0,0],[0,-2.4],[-1.3,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-30.6,18.3],[-29.1,18.3],[-29.1,13.7],[-26.6,10.7],[-24.5,13.3],[-24.5,18.3],[-23,18.3],[-23,12.9],[-26.2,9.3],[-29.1,10.9],[-29.1,5.2],[-30.6,5.2],[-30.6,18.3]],"c":true},"ix":2},"nm":"Path 29","mn":"ADBE Vector Shape - Group","hd":false},{"ind":29,"ty":"sh","ix":30,"ks":{"a":0,"k":{"i":[[2.5,0],[0,1],[-0.9,0.1],[0,0],[0,-0.9]],"o":[[-1.8,0],[0,-0.6],[0,0],[1.1,0],[-0.1,1]],"v":[[-37.5,21.1],[-40.3,19.8],[-38.9,18.5],[-36,18.5],[-34.2,19.7]],"c":true},"ix":2},"nm":"Path 30","mn":"ADBE Vector Shape - Group","hd":false},{"ind":30,"ty":"sh","ix":31,"ks":{"a":0,"k":{"i":[[1.2,0],[0,1.1],[-1.3,0],[0,-1.2]],"o":[[-1.3,0],[0,-1.2],[1.3,0],[0,1.2]],"v":[[-37.3,14.4],[-39.4,12.5],[-37.3,10.5],[-35.2,12.5]],"c":true},"ix":2},"nm":"Path 31","mn":"ADBE Vector Shape - Group","hd":false},{"ind":31,"ty":"sh","ix":32,"ks":{"a":0,"k":{"i":[[-2.5,0],[0,2.1],[2,0],[0,0],[0,0.5],[-0.7,0.1],[-0.2,0],[0,1.8],[0.6,0.6],[-1,0],[0,0],[0.4,-1.1],[0.7,0],[0,-1.9],[-1.1,-0.5],[0,-0.7],[-0.7,-0.1],[0,-1]],"o":[[3.2,0],[0,-1.6],[0,0],[-1.2,0],[0,-0.4],[0.3,0.1],[2.1,0],[0,-0.9],[0.3,-0.5],[0,0],[-1.4,-0.1],[-0.5,-0.3],[-2.1,0],[0,1.3],[-1,0.3],[0,0.6],[-1.3,0.2],[0,1.9]],"v":[[-37.5,22.2],[-32.6,19.4],[-35.6,17],[-37.6,17],[-39.3,16.3],[-38.1,15.4],[-37.3,15.5],[-33.8,12.4],[-34.8,10.1],[-32.8,9.3],[-32.8,7.9],[-35.6,9.6],[-37.4,9.2],[-40.9,12.4],[-39.1,15.1],[-40.7,16.6],[-39.6,17.8],[-41.7,19.8]],"c":true},"ix":2},"nm":"Path 32","mn":"ADBE Vector Shape - Group","hd":false},{"ind":32,"ty":"sh","ix":33,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-45,18.3],[-43.5,18.3],[-43.5,9.5],[-45,9.5]],"c":true},"ix":2},"nm":"Path 33","mn":"ADBE Vector Shape - Group","hd":false},{"ind":33,"ty":"sh","ix":34,"ks":{"a":0,"k":{"i":[[-0.7,0],[0,0.7],[0.7,0],[0,-0.7]],"o":[[0.7,0],[0,-0.6],[-0.6,0],[0,0.6]],"v":[[-44.2,7.9],[-43,6.8],[-44.2,5.7],[-45.4,6.8]],"c":true},"ix":2},"nm":"Path 34","mn":"ADBE Vector Shape - Group","hd":false},{"ind":34,"ty":"sh","ix":35,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-57,18.3],[-57,12.5],[-49.7,12.5],[-49.7,18.3],[-48.1,18.3],[-48.1,5.3],[-49.7,5.3],[-49.7,11.1],[-57,11.1],[-57,5.3],[-58.6,5.3],[-58.6,18.3]],"c":true},"ix":2},"nm":"Path 35","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.121568627656,0.121568627656,0.129411771894,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":36,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":38,"op":1800,"st":0,"bm":0},{"ddd":0,"ind":12,"ty":4,"nm":"Layer 3","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":41,"s":[0]},{"t":52,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1,78.6],[1,54.5],[-2,54.5],[-2,78.6]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[-0.6,0.6],[0,0],[0.6,0.6],[0.6,-0.6],[0,0],[0,0],[0.6,-0.6],[-0.6,-0.6]],"o":[[0.6,0.6],[0,0],[0.6,-0.6],[-0.6,-0.6],[0,0],[0,0],[-0.6,-0.6],[-0.6,0.6],[0,0]],"v":[[-1.6,79.7],[0.5,79.7],[10,70.2],[10,68.1],[7.9,68.1],[-0.5,76.5],[-9,68],[-11.1,68],[-11.1,70.1]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.784313738346,0.784313738346,0.784313738346,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":41,"op":1796,"st":-4,"bm":0},{"ddd":0,"ind":13,"ty":4,"nm":"Layer 6","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":42,"s":[0]},{"t":53,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-1.6,0],[0,0],[0,-1.6],[0,0],[1.6,0],[0,0],[0,1.6],[0,0]],"o":[[0,0],[1.6,0],[0,0],[0,1.6],[0,0],[-1.6,0],[0,0],[-0.1,-1.6]],"v":[[10.2,105.9],[10.5,105.9],[13.4,108.8],[13.4,112],[10.5,114.9],[10.2,114.9],[7.3,112],[7.3,108.8]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0.9,0],[0,0],[0,-0.9],[0,0],[-0.9,0],[0,0],[0,0.9]],"o":[[0,-0.9],[0,0],[-0.9,0],[0,0],[0,0.9],[0,0],[0.9,0],[0,0]],"v":[[12,108.8],[10.4,107.2],[10.1,107.2],[8.5,108.8],[8.5,112],[10.1,113.6],[10.4,113.6],[12,112]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":1,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-1.6,0],[0,0],[0,-1.6],[0,0],[1.6,0],[0,0],[0,1.6],[0,0]],"o":[[0,0],[1.6,0],[0,0],[0,1.6],[0,0],[-1.6,0],[0,0],[0,-1.6]],"v":[[-13.3,105.9],[-13,105.9],[-10.1,108.8],[-10.1,112],[-13,114.9],[-13.3,114.9],[-16.2,112],[-16.2,108.8]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0.9,0],[0,0],[0,-0.9],[0,0],[-0.9,0],[0,0],[0,0.9]],"o":[[0,-0.9],[0,0],[-0.9,0],[0,0],[0,0.9],[0,0],[0.9,0],[0,0]],"v":[[-11.4,108.8],[-13,107.2],[-13.3,107.2],[-14.9,108.8],[-14.9,112],[-13.3,113.6],[-13,113.6],[-11.4,112]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":1,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[6,0],[0,-6]],"o":[[0,-6],[-6,0],[0,0]],"v":[[9.3,105.9],[-1.5,95.1],[-12.3,105.9]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-5,0],[0,5.9],[5.1,0],[0,-5.9]],"o":[[5.1,0],[0,-5.9],[-5.1,0],[0,5.8]],"v":[[-1.5,121.3],[7.7,110.7],[-1.5,100.1],[-10.7,110.7]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[1.2,117.4],[-2.8,117.4]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[1.9,0],[0,0]],"o":[[0,0],[-0.4,1.9],[0,0],[0,0]],"v":[[10.3,113.2],[10.3,113.4],[6.3,117.4],[1.1,117.4]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,-3.4],[0,0],[0,0],[0,0],[-3.1,1.2],[0,0]],"o":[[0,0],[3.1,1.2],[0,0],[0,0],[0,0],[0,-3.3],[0,0],[0,0]],"v":[[4.3,123.1],[16.8,126.6],[22,134.1],[22,135.8],[-23.9,135.8],[-23.9,134.1],[-18.7,126.6],[-6.1,123.1]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.180392161012,0.337254911661,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false}],"ip":42,"op":1799,"st":-1,"bm":0},{"ddd":0,"ind":14,"ty":4,"nm":"13","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":43,"s":[0]},{"t":54,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[620,225,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[176.179,190.442],[178.969,187.85],[181.777,190.442]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[174.595,191.162],[179.077,195.734],[183.019,193.358],[181.759,192.8],[179.113,194.42],[176.161,191.486],[183.235,191.486],[183.307,190.73],[179.023,186.518]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[169.895,195.5],[169.895,190.514],[172.235,188.03],[173.045,188.174],[173.045,186.68],[172.235,186.536],[169.841,188.084],[169.769,186.752],[168.347,186.752],[168.347,195.5]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ind":3,"ty":"sh","ix":4,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[158.424,191.126],[161.448,187.904],[164.472,191.126],[161.448,194.348]],"c":true},"ix":2},"nm":"Path 4","mn":"ADBE Vector Shape - Group","hd":false},{"ind":4,"ty":"sh","ix":5,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[156.84,191.126],[161.448,195.734],[166.074,191.126],[161.448,186.518]],"c":true},"ix":2},"nm":"Path 5","mn":"ADBE Vector Shape - Group","hd":false},{"ind":5,"ty":"sh","ix":6,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.422,0],[0,-1.692],[0,0],[0,0],[0,0],[-1.44,0],[0,-1.656],[0,0],[0,0],[0,0],[1.98,0],[0.486,-1.314],[1.476,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.926],[1.386,0],[0,0],[0,0],[0,0],[0,-1.926],[1.404,0],[0,0],[0,0],[0,0],[0,-2.394],[-1.386,0],[-0.432,-1.35],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[141.242,195.5],[142.808,195.5],[142.808,190.892],[145.238,187.922],[147.218,190.46],[147.218,195.5],[148.766,195.5],[148.766,190.892],[151.214,187.922],[153.176,190.46],[153.176,195.5],[154.742,195.5],[154.742,190.118],[151.592,186.518],[148.532,188.534],[145.616,186.518],[142.754,188.21],[142.628,186.752],[141.242,186.752]],"c":true},"ix":2},"nm":"Path 6","mn":"ADBE Vector Shape - Group","hd":false},{"ind":6,"ty":"sh","ix":7,"ks":{"a":0,"k":{"i":[[1.8,0],[0,1.89],[-1.782,0],[0,-1.872]],"o":[[-1.782,0],[0,-1.872],[1.8,0],[0,1.89]],"v":[[129.187,194.366],[126.433,191.126],[129.187,187.904],[131.959,191.126]],"c":true},"ix":2},"nm":"Path 7","mn":"ADBE Vector Shape - Group","hd":false},{"ind":7,"ty":"sh","ix":8,"ks":{"a":0,"k":{"i":[[-2.538,0],[-0.558,1.242],[-0.072,-0.594],[0,0],[0,0.828],[0,0],[0,0],[0,0],[1.386,0],[0,-2.646]],"o":[[1.458,0],[0,0.576],[0,0],[-0.108,-0.432],[0,0],[0,0],[0,0],[-0.558,-1.188],[-2.556,0],[0,2.646]],"v":[[128.881,195.734],[132.121,193.826],[132.247,195.5],[133.795,195.5],[133.597,193.196],[133.597,182.45],[132.049,182.45],[132.049,188.336],[128.917,186.518],[124.831,191.126]],"c":true},"ix":2},"nm":"Path 8","mn":"ADBE Vector Shape - Group","hd":false},{"ind":8,"ty":"sh","ix":9,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[115.033,195.5],[116.581,195.5],[116.581,190.892],[119.101,187.922],[121.153,190.478],[121.153,195.5],[122.701,195.5],[122.701,190.1],[119.479,186.518],[116.527,188.192],[116.401,186.752],[115.033,186.752]],"c":true},"ix":2},"nm":"Path 9","mn":"ADBE Vector Shape - Group","hd":false},{"ind":9,"ty":"sh","ix":10,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[108.229,194.6],[106.321,193.052],[108.679,191.414],[110.821,191.414],[110.821,192.494]],"c":true},"ix":2},"nm":"Path 10","mn":"ADBE Vector Shape - Group","hd":false},{"ind":10,"ty":"sh","ix":11,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[107.833,195.734],[110.929,194.132],[111.073,195.5],[112.549,195.5],[112.369,193.664],[112.369,189.632],[108.823,186.518],[105.061,188.966],[106.465,189.29],[108.769,187.796],[110.821,189.524],[110.821,190.406],[108.517,190.406],[104.755,193.178]],"c":true},"ix":2},"nm":"Path 11","mn":"ADBE Vector Shape - Group","hd":false},{"ind":11,"ty":"sh","ix":12,"ks":{"a":0,"k":{"i":[[0.81,-0.468],[0,0],[0,1.17],[0.72,0],[0,-0.702],[-0.612,0],[-0.108,0.054]],"o":[[0,0],[1.458,-0.828],[0,-0.864],[-0.738,0],[0,0.666],[0.162,0],[-0.306,0.576]],"v":[[94.555,197.048],[95.077,197.822],[97.561,194.582],[96.229,193.178],[94.951,194.366],[96.067,195.482],[96.445,195.41]],"c":true},"ix":2},"nm":"Path 12","mn":"ADBE Vector Shape - Group","hd":false},{"ind":12,"ty":"sh","ix":13,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[84.36,195.5],[85.908,195.5],[85.908,193.142],[87.618,191.36],[90.552,195.5],[92.334,195.5],[88.77,190.37],[92.28,186.752],[90.354,186.752],[85.908,191.378],[85.908,182.45],[84.36,182.45]],"c":true},"ix":2},"nm":"Path 13","mn":"ADBE Vector Shape - Group","hd":false},{"ind":13,"ty":"sh","ix":14,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[79.069,195.5],[79.069,190.514],[81.409,188.03],[82.219,188.174],[82.219,186.68],[81.409,186.536],[79.015,188.084],[78.943,186.752],[77.521,186.752],[77.521,195.5]],"c":true},"ix":2},"nm":"Path 14","mn":"ADBE Vector Shape - Group","hd":false},{"ind":14,"ty":"sh","ix":15,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[67.598,191.126],[70.622,187.904],[73.646,191.126],[70.622,194.348]],"c":true},"ix":2},"nm":"Path 15","mn":"ADBE Vector Shape - Group","hd":false},{"ind":15,"ty":"sh","ix":16,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[66.014,191.126],[70.622,195.734],[75.248,191.126],[70.622,186.518]],"c":true},"ix":2},"nm":"Path 16","mn":"ADBE Vector Shape - Group","hd":false},{"ind":16,"ty":"sh","ix":17,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[60.854,193.304],[58.73,186.752],[57.236,186.752],[55.076,193.268],[52.988,186.752],[51.35,186.752],[54.266,195.5],[55.778,195.5],[57.974,188.93],[60.152,195.5],[61.61,195.5],[64.616,186.752],[62.978,186.752]],"c":true},"ix":2},"nm":"Path 17","mn":"ADBE Vector Shape - Group","hd":false},{"ind":17,"ty":"sh","ix":18,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[44.389,195.5],[44.389,182.45],[42.841,182.45],[42.841,195.5]],"c":true},"ix":2},"nm":"Path 18","mn":"ADBE Vector Shape - Group","hd":false},{"ind":18,"ty":"sh","ix":19,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[40.029,195.5],[40.029,182.45],[38.481,182.45],[38.481,195.5]],"c":true},"ix":2},"nm":"Path 19","mn":"ADBE Vector Shape - Group","hd":false},{"ind":19,"ty":"sh","ix":20,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[31.641,194.6],[29.733,193.052],[32.091,191.414],[34.233,191.414],[34.233,192.494]],"c":true},"ix":2},"nm":"Path 20","mn":"ADBE Vector Shape - Group","hd":false},{"ind":20,"ty":"sh","ix":21,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[31.245,195.734],[34.341,194.132],[34.485,195.5],[35.961,195.5],[35.781,193.664],[35.781,189.632],[32.235,186.518],[28.473,188.966],[29.877,189.29],[32.181,187.796],[34.233,189.524],[34.233,190.406],[31.929,190.406],[28.167,193.178]],"c":true},"ix":2},"nm":"Path 21","mn":"ADBE Vector Shape - Group","hd":false},{"ind":21,"ty":"sh","ix":22,"ks":{"a":0,"k":{"i":[[0,-2.736],[-2.592,0],[-0.576,1.692],[0,0],[1.332,0],[0,1.908],[-1.746,0],[-0.342,-1.08],[0,0],[1.944,0]],"o":[[0,2.736],[1.944,0],[0,0],[-0.36,1.098],[-1.728,0],[0,-1.926],[1.224,0],[0,0],[-0.468,-1.548],[-2.664,0]],"v":[[18.044,191.162],[22.436,195.734],[26.612,193.034],[25.19,192.494],[22.49,194.33],[19.646,191.126],[22.526,187.904],[25.118,189.668],[26.522,189.11],[22.49,186.518]],"c":true},"ix":2},"nm":"Path 22","mn":"ADBE Vector Shape - Group","hd":false},{"ind":22,"ty":"sh","ix":23,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[8.388,195.5],[8.388,190.514],[10.728,188.03],[11.538,188.174],[11.538,186.68],[10.728,186.536],[8.334,188.084],[8.262,186.752],[6.84,186.752],[6.84,195.5]],"c":true},"ix":2},"nm":"Path 23","mn":"ADBE Vector Shape - Group","hd":false},{"ind":23,"ty":"sh","ix":24,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-2.52,190.442],[0.27,187.85],[3.078,190.442]],"c":true},"ix":2},"nm":"Path 24","mn":"ADBE Vector Shape - Group","hd":false},{"ind":24,"ty":"sh","ix":25,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-4.104,191.162],[0.378,195.734],[4.32,193.358],[3.06,192.8],[0.414,194.42],[-2.538,191.486],[4.536,191.486],[4.608,190.73],[0.324,186.518]],"c":true},"ix":2},"nm":"Path 25","mn":"ADBE Vector Shape - Group","hd":false},{"ind":25,"ty":"sh","ix":26,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.332,0],[0,-1.314],[0,0]],"o":[[0,0],[0,-1.26],[1.26,0],[0,0],[0,0]],"v":[[-13.608,186.752],[-13.608,185.6],[-11.502,183.53],[-9.396,185.6],[-9.396,186.752]],"c":true},"ix":2},"nm":"Path 26","mn":"ADBE Vector Shape - Group","hd":false},{"ind":26,"ty":"sh","ix":27,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2.268,0],[0,-2.106],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,-2.016],[-2.178,0],[0,0],[0,0],[0,0]],"v":[[-17.046,188.084],[-15.138,188.084],[-15.138,195.5],[-13.59,195.5],[-13.59,188.084],[-9.396,188.084],[-9.396,195.5],[-7.866,195.5],[-7.866,188.084],[-5.67,188.084],[-5.67,186.752],[-7.884,186.752],[-7.884,185.564],[-11.502,182.216],[-15.12,185.564],[-15.12,186.752],[-17.046,186.752]],"c":true},"ix":2},"nm":"Path 27","mn":"ADBE Vector Shape - Group","hd":false},{"ind":27,"ty":"sh","ix":28,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-23.062,194.6],[-24.97,193.052],[-22.612,191.414],[-20.47,191.414],[-20.47,192.494]],"c":true},"ix":2},"nm":"Path 28","mn":"ADBE Vector Shape - Group","hd":false},{"ind":28,"ty":"sh","ix":29,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-23.458,195.734],[-20.362,194.132],[-20.218,195.5],[-18.742,195.5],[-18.922,193.664],[-18.922,189.632],[-22.468,186.518],[-26.23,188.966],[-24.826,189.29],[-22.522,187.796],[-20.47,189.524],[-20.47,190.406],[-22.774,190.406],[-26.536,193.178]],"c":true},"ix":2},"nm":"Path 29","mn":"ADBE Vector Shape - Group","hd":false},{"ind":29,"ty":"sh","ix":30,"ks":{"a":0,"k":{"i":[[0.81,-0.468],[0,0],[0,1.17],[0.72,0],[0,-0.702],[-0.612,0],[-0.108,0.054]],"o":[[0,0],[1.458,-0.828],[0,-0.864],[-0.738,0],[0,0.666],[0.162,0],[-0.306,0.576]],"v":[[-36.736,197.048],[-36.214,197.822],[-33.73,194.582],[-35.062,193.178],[-36.34,194.366],[-35.224,195.482],[-34.846,195.41]],"c":true},"ix":2},"nm":"Path 30","mn":"ADBE Vector Shape - Group","hd":false},{"ind":30,"ty":"sh","ix":31,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-47.055,195.5],[-45.507,195.5],[-45.507,190.892],[-42.987,187.922],[-40.935,190.478],[-40.935,195.5],[-39.387,195.5],[-39.387,190.1],[-42.609,186.518],[-45.561,188.192],[-45.687,186.752],[-47.055,186.752]],"c":true},"ix":2},"nm":"Path 31","mn":"ADBE Vector Shape - Group","hd":false},{"ind":31,"ty":"sh","ix":32,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[-56.978,191.126],[-53.954,187.904],[-50.93,191.126],[-53.954,194.348]],"c":true},"ix":2},"nm":"Path 32","mn":"ADBE Vector Shape - Group","hd":false},{"ind":32,"ty":"sh","ix":33,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[-58.562,191.126],[-53.954,195.734],[-49.328,191.126],[-53.954,186.518]],"c":true},"ix":2},"nm":"Path 33","mn":"ADBE Vector Shape - Group","hd":false},{"ind":33,"ty":"sh","ix":34,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-67.652,195.5],[-66.104,195.5],[-66.104,188.084],[-62.378,188.084],[-62.378,195.5],[-60.83,195.5],[-60.83,186.752],[-66.104,186.752],[-66.104,184.07],[-67.652,184.07],[-67.652,186.752],[-69.938,186.752],[-69.938,188.084],[-67.652,188.084]],"c":true},"ix":2},"nm":"Path 34","mn":"ADBE Vector Shape - Group","hd":false},{"ind":34,"ty":"sh","ix":35,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.648,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-61.604,185.096],[-60.452,183.98],[-61.604,182.882],[-62.756,183.98]],"c":true},"ix":2},"nm":"Path 35","mn":"ADBE Vector Shape - Group","hd":false},{"ind":35,"ty":"sh","ix":36,"ks":{"a":0,"k":{"i":[[1.782,0],[0,1.89],[-1.782,0],[0,-1.89]],"o":[[-1.782,0],[0,-1.89],[1.782,0],[0,1.89]],"v":[[-75.885,194.366],[-78.657,191.126],[-75.885,187.904],[-73.113,191.126]],"c":true},"ix":2},"nm":"Path 36","mn":"ADBE Vector Shape - Group","hd":false},{"ind":36,"ty":"sh","ix":37,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.35,0],[0,2.646],[2.538,0],[0.576,-1.242],[0,0],[0,0]],"o":[[0,0],[0,0],[0.594,1.134],[2.538,0],[0,-2.646],[-1.422,0],[0,0],[0,0],[0,0]],"v":[[-80.259,199.19],[-78.711,199.19],[-78.711,193.988],[-75.579,195.734],[-71.529,191.126],[-75.579,186.518],[-78.801,188.444],[-78.927,186.752],[-80.259,186.752]],"c":true},"ix":2},"nm":"Path 37","mn":"ADBE Vector Shape - Group","hd":false},{"ind":37,"ty":"sh","ix":38,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-84.584,195.5],[-83.036,195.5],[-83.036,186.752],[-84.584,186.752]],"c":true},"ix":2},"nm":"Path 38","mn":"ADBE Vector Shape - Group","hd":false},{"ind":38,"ty":"sh","ix":39,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-83.81,185.096],[-82.658,183.98],[-83.81,182.882],[-84.962,183.98]],"c":true},"ix":2},"nm":"Path 39","mn":"ADBE Vector Shape - Group","hd":false},{"ind":39,"ty":"sh","ix":40,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-89.874,195.5],[-89.874,190.514],[-87.534,188.03],[-86.724,188.174],[-86.724,186.68],[-87.534,186.536],[-89.928,188.084],[-90,186.752],[-91.422,186.752],[-91.422,195.5]],"c":true},"ix":2},"nm":"Path 40","mn":"ADBE Vector Shape - Group","hd":false},{"ind":40,"ty":"sh","ix":41,"ks":{"a":0,"k":{"i":[[0,-2.736],[-2.592,0],[-0.576,1.692],[0,0],[1.332,0],[0,1.908],[-1.746,0],[-0.342,-1.08],[0,0],[1.944,0]],"o":[[0,2.736],[1.944,0],[0,0],[-0.36,1.098],[-1.728,0],[0,-1.926],[1.224,0],[0,0],[-0.468,-1.548],[-2.664,0]],"v":[[-102.138,191.162],[-97.746,195.734],[-93.57,193.034],[-94.992,192.494],[-97.692,194.33],[-100.536,191.126],[-97.656,187.904],[-95.064,189.668],[-93.66,189.11],[-97.692,186.518]],"c":true},"ix":2},"nm":"Path 41","mn":"ADBE Vector Shape - Group","hd":false},{"ind":41,"ty":"sh","ix":42,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[-110.735,193.412],[-107.279,195.734],[-103.931,193.052],[-106.271,190.568],[-107.333,190.334],[-108.953,189.056],[-107.279,187.778],[-105.353,189.182],[-104.075,188.75],[-107.351,186.518],[-110.501,189.128],[-107.891,191.594],[-106.973,191.792],[-105.533,193.106],[-107.351,194.474],[-109.457,192.944]],"c":true},"ix":2},"nm":"Path 42","mn":"ADBE Vector Shape - Group","hd":false},{"ind":42,"ty":"sh","ix":43,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-120.461,195.5],[-118.913,195.5],[-118.913,190.892],[-116.393,187.922],[-114.341,190.478],[-114.341,195.5],[-112.793,195.5],[-112.793,190.1],[-116.015,186.518],[-118.967,188.192],[-119.093,186.752],[-120.461,186.752]],"c":true},"ix":2},"nm":"Path 43","mn":"ADBE Vector Shape - Group","hd":false},{"ind":43,"ty":"sh","ix":44,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-127.265,194.6],[-129.173,193.052],[-126.815,191.414],[-124.673,191.414],[-124.673,192.494]],"c":true},"ix":2},"nm":"Path 44","mn":"ADBE Vector Shape - Group","hd":false},{"ind":44,"ty":"sh","ix":45,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-127.661,195.734],[-124.565,194.132],[-124.421,195.5],[-122.945,195.5],[-123.125,193.664],[-123.125,189.632],[-126.671,186.518],[-130.433,188.966],[-129.029,189.29],[-126.725,187.796],[-124.673,189.524],[-124.673,190.406],[-126.977,190.406],[-130.739,193.178]],"c":true},"ix":2},"nm":"Path 45","mn":"ADBE Vector Shape - Group","hd":false},{"ind":45,"ty":"sh","ix":46,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-135.454,195.5],[-135.454,190.514],[-133.114,188.03],[-132.304,188.174],[-132.304,186.68],[-133.114,186.536],[-135.508,188.084],[-135.58,186.752],[-137.002,186.752],[-137.002,195.5]],"c":true},"ix":2},"nm":"Path 46","mn":"ADBE Vector Shape - Group","hd":false},{"ind":46,"ty":"sh","ix":47,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-143.006,195.5],[-141.458,195.5],[-141.458,188.084],[-139.1,188.084],[-139.1,186.752],[-141.458,186.752],[-141.458,184.07],[-143.006,184.07],[-143.006,186.752],[-145.472,186.752],[-145.472,188.084],[-143.006,188.084]],"c":true},"ix":2},"nm":"Path 47","mn":"ADBE Vector Shape - Group","hd":false},{"ind":47,"ty":"sh","ix":48,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-159.054,190.442],[-156.264,187.85],[-153.456,190.442]],"c":true},"ix":2},"nm":"Path 48","mn":"ADBE Vector Shape - Group","hd":false},{"ind":48,"ty":"sh","ix":49,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-160.638,191.162],[-156.156,195.734],[-152.214,193.358],[-153.474,192.8],[-156.12,194.42],[-159.072,191.486],[-151.998,191.486],[-151.926,190.73],[-156.21,186.518]],"c":true},"ix":2},"nm":"Path 49","mn":"ADBE Vector Shape - Group","hd":false},{"ind":49,"ty":"sh","ix":50,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-167.184,195.5],[-165.564,195.5],[-161.946,186.752],[-163.62,186.752],[-166.356,193.7],[-169.092,186.752],[-170.82,186.752]],"c":true},"ix":2},"nm":"Path 50","mn":"ADBE Vector Shape - Group","hd":false},{"ind":50,"ty":"sh","ix":51,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-174.444,195.5],[-172.896,195.5],[-172.896,186.752],[-174.444,186.752]],"c":true},"ix":2},"nm":"Path 51","mn":"ADBE Vector Shape - Group","hd":false},{"ind":51,"ty":"sh","ix":52,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-173.67,185.096],[-172.518,183.98],[-173.67,182.882],[-174.822,183.98]],"c":true},"ix":2},"nm":"Path 52","mn":"ADBE Vector Shape - Group","hd":false},{"ind":52,"ty":"sh","ix":53,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-177.219,195.5],[-177.219,182.45],[-178.767,182.45],[-178.767,195.5]],"c":true},"ix":2},"nm":"Path 53","mn":"ADBE Vector Shape - Group","hd":false},{"ind":53,"ty":"sh","ix":54,"ks":{"a":0,"k":{"i":[[0.81,-0.468],[0,0],[0,1.17],[0.72,0],[0,-0.702],[-0.612,0],[-0.108,0.054]],"o":[[0,0],[1.458,-0.828],[0,-0.864],[-0.738,0],[0,0.666],[0.162,0],[-0.306,0.576]],"v":[[220.872,173.048],[221.394,173.822],[223.878,170.582],[222.546,169.178],[221.268,170.366],[222.384,171.482],[222.762,171.41]],"c":true},"ix":2},"nm":"Path 54","mn":"ADBE Vector Shape - Group","hd":false},{"ind":54,"ty":"sh","ix":55,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[210.553,171.5],[212.101,171.5],[212.101,166.892],[214.621,163.922],[216.673,166.478],[216.673,171.5],[218.221,171.5],[218.221,166.1],[214.999,162.518],[212.047,164.192],[211.921,162.752],[210.553,162.752]],"c":true},"ix":2},"nm":"Path 55","mn":"ADBE Vector Shape - Group","hd":false},{"ind":55,"ty":"sh","ix":56,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[200.63,167.126],[203.654,163.904],[206.678,167.126],[203.654,170.348]],"c":true},"ix":2},"nm":"Path 56","mn":"ADBE Vector Shape - Group","hd":false},{"ind":56,"ty":"sh","ix":57,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[199.046,167.126],[203.654,171.734],[208.28,167.126],[203.654,162.518]],"c":true},"ix":2},"nm":"Path 57","mn":"ADBE Vector Shape - Group","hd":false},{"ind":57,"ty":"sh","ix":58,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[189.955,171.5],[191.503,171.5],[191.503,164.084],[195.229,164.084],[195.229,171.5],[196.777,171.5],[196.777,162.752],[191.503,162.752],[191.503,160.07],[189.955,160.07],[189.955,162.752],[187.669,162.752],[187.669,164.084],[189.955,164.084]],"c":true},"ix":2},"nm":"Path 58","mn":"ADBE Vector Shape - Group","hd":false},{"ind":58,"ty":"sh","ix":59,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.648,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[196.003,161.096],[197.155,159.98],[196.003,158.882],[194.851,159.98]],"c":true},"ix":2},"nm":"Path 59","mn":"ADBE Vector Shape - Group","hd":false},{"ind":59,"ty":"sh","ix":60,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[181.758,170.6],[179.85,169.052],[182.208,167.414],[184.35,167.414],[184.35,168.494]],"c":true},"ix":2},"nm":"Path 60","mn":"ADBE Vector Shape - Group","hd":false},{"ind":60,"ty":"sh","ix":61,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[181.362,171.734],[184.458,170.132],[184.602,171.5],[186.078,171.5],[185.898,169.664],[185.898,165.632],[182.352,162.518],[178.59,164.966],[179.994,165.29],[182.298,163.796],[184.35,165.524],[184.35,166.406],[182.046,166.406],[178.284,169.178]],"c":true},"ix":2},"nm":"Path 61","mn":"ADBE Vector Shape - Group","hd":false},{"ind":61,"ty":"sh","ix":62,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[176.031,171.5],[176.031,158.45],[174.483,158.45],[174.483,171.5]],"c":true},"ix":2},"nm":"Path 62","mn":"ADBE Vector Shape - Group","hd":false},{"ind":62,"ty":"sh","ix":63,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[167.643,170.6],[165.735,169.052],[168.093,167.414],[170.235,167.414],[170.235,168.494]],"c":true},"ix":2},"nm":"Path 63","mn":"ADBE Vector Shape - Group","hd":false},{"ind":63,"ty":"sh","ix":64,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[167.247,171.734],[170.343,170.132],[170.487,171.5],[171.963,171.5],[171.783,169.664],[171.783,165.632],[168.237,162.518],[164.475,164.966],[165.879,165.29],[168.183,163.796],[170.235,165.524],[170.235,166.406],[167.931,166.406],[164.169,169.178]],"c":true},"ix":2},"nm":"Path 64","mn":"ADBE Vector Shape - Group","hd":false},{"ind":64,"ty":"sh","ix":65,"ks":{"a":0,"k":{"i":[[0,-2.736],[-2.592,0],[-0.576,1.692],[0,0],[1.332,0],[0,1.908],[-1.746,0],[-0.342,-1.08],[0,0],[1.944,0]],"o":[[0,2.736],[1.944,0],[0,0],[-0.36,1.098],[-1.728,0],[0,-1.926],[1.224,0],[0,0],[-0.468,-1.548],[-2.664,0]],"v":[[154.046,167.162],[158.438,171.734],[162.614,169.034],[161.192,168.494],[158.492,170.33],[155.648,167.126],[158.528,163.904],[161.12,165.668],[162.524,165.11],[158.492,162.518]],"c":true},"ix":2},"nm":"Path 65","mn":"ADBE Vector Shape - Group","hd":false},{"ind":65,"ty":"sh","ix":66,"ks":{"a":0,"k":{"i":[[0,0],[-1.818,0],[0,1.602],[1.296,0.252],[0,0],[0,0.648],[-1.026,0],[-0.18,-0.882],[0,0],[1.782,0],[0,-1.566],[-1.818,-0.396],[0,0],[0,-0.792],[1.098,0],[0.18,1.026]],"o":[[0.27,1.404],[2.052,0],[0,-1.476],[0,0],[-1.116,-0.234],[0,-0.81],[1.008,0],[0,0],[-0.234,-1.35],[-1.854,0],[0,1.206],[0,0],[0.774,0.162],[0,0.918],[-1.08,0],[0,0]],"v":[[145.448,169.412],[148.904,171.734],[152.252,169.052],[149.912,166.568],[148.85,166.334],[147.23,165.056],[148.904,163.778],[150.83,165.182],[152.108,164.75],[148.832,162.518],[145.682,165.128],[148.292,167.594],[149.21,167.792],[150.65,169.106],[148.832,170.474],[146.726,168.944]],"c":true},"ix":2},"nm":"Path 66","mn":"ADBE Vector Shape - Group","hd":false},{"ind":66,"ty":"sh","ix":67,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[136.646,166.442],[139.436,163.85],[142.244,166.442]],"c":true},"ix":2},"nm":"Path 67","mn":"ADBE Vector Shape - Group","hd":false},{"ind":67,"ty":"sh","ix":68,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[135.062,167.162],[139.544,171.734],[143.486,169.358],[142.226,168.8],[139.58,170.42],[136.628,167.486],[143.702,167.486],[143.774,166.73],[139.49,162.518]],"c":true},"ix":2},"nm":"Path 68","mn":"ADBE Vector Shape - Group","hd":false},{"ind":68,"ty":"sh","ix":69,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[124.674,171.5],[126.222,171.5],[126.222,164.084],[128.58,164.084],[128.58,162.752],[126.222,162.752],[126.222,160.07],[124.674,160.07],[124.674,162.752],[122.208,162.752],[122.208,164.084],[124.674,164.084]],"c":true},"ix":2},"nm":"Path 69","mn":"ADBE Vector Shape - Group","hd":false},{"ind":69,"ty":"sh","ix":70,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[112.66,171.5],[114.208,171.5],[114.208,166.892],[116.728,163.922],[118.78,166.478],[118.78,171.5],[120.328,171.5],[120.328,166.1],[117.106,162.518],[114.154,164.192],[114.028,162.752],[112.66,162.752]],"c":true},"ix":2},"nm":"Path 70","mn":"ADBE Vector Shape - Group","hd":false},{"ind":70,"ty":"sh","ix":71,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[103.3,166.442],[106.09,163.85],[108.898,166.442]],"c":true},"ix":2},"nm":"Path 71","mn":"ADBE Vector Shape - Group","hd":false},{"ind":71,"ty":"sh","ix":72,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[101.716,167.162],[106.198,171.734],[110.14,169.358],[108.88,168.8],[106.234,170.42],[103.282,167.486],[110.356,167.486],[110.428,166.73],[106.144,162.518]],"c":true},"ix":2},"nm":"Path 72","mn":"ADBE Vector Shape - Group","hd":false},{"ind":72,"ty":"sh","ix":73,"ks":{"a":0,"k":{"i":[[2.502,0],[0,1.026],[-0.846,0.144],[0,0],[0,-0.918]],"o":[[-1.782,0],[0,-0.648],[0,0],[1.08,0],[0,0.972]],"v":[[95.948,174.362],[93.194,173.03],[94.58,171.698],[97.442,171.698],[99.206,172.904]],"c":true},"ix":2},"nm":"Path 73","mn":"ADBE Vector Shape - Group","hd":false},{"ind":73,"ty":"sh","ix":74,"ks":{"a":0,"k":{"i":[[1.26,0],[0,1.152],[-1.278,0],[0,-1.17]],"o":[[-1.278,0],[0,-1.17],[1.26,0],[0,1.17]],"v":[[96.146,167.63],[94.022,165.686],[96.146,163.706],[98.252,165.686]],"c":true},"ix":2},"nm":"Path 74","mn":"ADBE Vector Shape - Group","hd":false},{"ind":74,"ty":"sh","ix":75,"ks":{"a":0,"k":{"i":[[-2.502,0],[0,2.034],[1.998,0],[0,0],[0,0.45],[-0.684,0.09],[-0.252,0],[0,1.818],[0.63,0.576],[-0.954,-0.018],[0,0],[0.306,-1.152],[0.63,0],[0,-1.836],[-1.098,-0.504],[0,-0.702],[-0.684,-0.144],[0,-1.08]],"o":[[3.168,0],[0,-1.602],[0,0],[-1.206,0],[0,-0.432],[0.252,0.054],[2.106,0],[0,-0.936],[0.288,-0.522],[0,0],[-1.386,-0.144],[-0.486,-0.252],[-2.124,0],[0,1.26],[-1.026,0.252],[0,0.558],[-1.26,0.162],[0,1.674]],"v":[[95.948,175.406],[100.826,172.652],[97.784,170.276],[95.786,170.276],[94.13,169.592],[95.3,168.728],[96.128,168.8],[99.674,165.686],[98.684,163.382],[100.664,162.572],[100.664,161.186],[97.91,162.914],[96.146,162.518],[92.618,165.686],[94.382,168.422],[92.798,169.97],[93.914,171.194],[91.79,173.228]],"c":true},"ix":2},"nm":"Path 75","mn":"ADBE Vector Shape - Group","hd":false},{"ind":75,"ty":"sh","ix":76,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[88.472,171.5],[90.02,171.5],[90.02,162.752],[88.472,162.752]],"c":true},"ix":2},"nm":"Path 76","mn":"ADBE Vector Shape - Group","hd":false},{"ind":76,"ty":"sh","ix":77,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[89.246,161.096],[90.398,159.98],[89.246,158.882],[88.094,159.98]],"c":true},"ix":2},"nm":"Path 77","mn":"ADBE Vector Shape - Group","hd":false},{"ind":77,"ty":"sh","ix":78,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[85.697,171.5],[85.697,158.45],[84.149,158.45],[84.149,171.5]],"c":true},"ix":2},"nm":"Path 78","mn":"ADBE Vector Shape - Group","hd":false},{"ind":78,"ty":"sh","ix":79,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[81.338,171.5],[81.338,158.45],[79.79,158.45],[79.79,171.5]],"c":true},"ix":2},"nm":"Path 79","mn":"ADBE Vector Shape - Group","hd":false},{"ind":79,"ty":"sh","ix":80,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[70.394,166.442],[73.184,163.85],[75.992,166.442]],"c":true},"ix":2},"nm":"Path 80","mn":"ADBE Vector Shape - Group","hd":false},{"ind":80,"ty":"sh","ix":81,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[68.81,167.162],[73.292,171.734],[77.234,169.358],[75.974,168.8],[73.328,170.42],[70.376,167.486],[77.45,167.486],[77.522,166.73],[73.238,162.518]],"c":true},"ix":2},"nm":"Path 81","mn":"ADBE Vector Shape - Group","hd":false},{"ind":81,"ty":"sh","ix":82,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[63.362,171.5],[64.91,171.5],[64.91,164.084],[67.268,164.084],[67.268,162.752],[64.91,162.752],[64.91,160.07],[63.362,160.07],[63.362,162.752],[60.896,162.752],[60.896,164.084],[63.362,164.084]],"c":true},"ix":2},"nm":"Path 82","mn":"ADBE Vector Shape - Group","hd":false},{"ind":82,"ty":"sh","ix":83,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[51.347,171.5],[52.895,171.5],[52.895,166.892],[55.415,163.922],[57.467,166.478],[57.467,171.5],[59.015,171.5],[59.015,166.1],[55.793,162.518],[52.841,164.192],[52.715,162.752],[51.347,162.752]],"c":true},"ix":2},"nm":"Path 83","mn":"ADBE Vector Shape - Group","hd":false},{"ind":83,"ty":"sh","ix":84,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[47.058,171.5],[48.606,171.5],[48.606,162.752],[47.058,162.752]],"c":true},"ix":2},"nm":"Path 84","mn":"ADBE Vector Shape - Group","hd":false},{"ind":84,"ty":"sh","ix":85,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[47.832,161.096],[48.984,159.98],[47.832,158.882],[46.68,159.98]],"c":true},"ix":2},"nm":"Path 85","mn":"ADBE Vector Shape - Group","hd":false},{"ind":85,"ty":"sh","ix":86,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.468,-1.026],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[31.96,171.5],[33.508,171.5],[33.508,166.892],[36.028,163.922],[38.08,166.478],[38.08,171.5],[39.628,171.5],[39.628,166.1],[36.406,162.518],[33.508,164.12],[33.508,158.45],[31.96,158.45]],"c":true},"ix":2},"nm":"Path 86","mn":"ADBE Vector Shape - Group","hd":false},{"ind":86,"ty":"sh","ix":87,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[25.92,171.5],[27.468,171.5],[27.468,164.084],[29.826,164.084],[29.826,162.752],[27.468,162.752],[27.468,160.07],[25.92,160.07],[25.92,162.752],[23.454,162.752],[23.454,164.084],[25.92,164.084]],"c":true},"ix":2},"nm":"Path 87","mn":"ADBE Vector Shape - Group","hd":false},{"ind":87,"ty":"sh","ix":88,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[19.777,171.5],[21.325,171.5],[21.325,162.752],[19.777,162.752]],"c":true},"ix":2},"nm":"Path 88","mn":"ADBE Vector Shape - Group","hd":false},{"ind":88,"ty":"sh","ix":89,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[20.551,161.096],[21.703,159.98],[20.551,158.882],[19.399,159.98]],"c":true},"ix":2},"nm":"Path 89","mn":"ADBE Vector Shape - Group","hd":false},{"ind":89,"ty":"sh","ix":90,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[13.938,169.304],[11.814,162.752],[10.32,162.752],[8.16,169.268],[6.072,162.752],[4.434,162.752],[7.35,171.5],[8.862,171.5],[11.058,164.93],[13.236,171.5],[14.694,171.5],[17.7,162.752],[16.062,162.752]],"c":true},"ix":2},"nm":"Path 90","mn":"ADBE Vector Shape - Group","hd":false},{"ind":90,"ty":"sh","ix":91,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-9.824,171.5],[-8.276,171.5],[-8.276,169.142],[-6.566,167.36],[-3.632,171.5],[-1.85,171.5],[-5.414,166.37],[-1.904,162.752],[-3.83,162.752],[-8.276,167.378],[-8.276,158.45],[-9.824,158.45]],"c":true},"ix":2},"nm":"Path 91","mn":"ADBE Vector Shape - Group","hd":false},{"ind":91,"ty":"sh","ix":92,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-1.458,0],[-0.198,-0.108],[0,0],[0.396,0],[0.414,-1.026],[0,0],[0,0],[0,0]],"o":[[0,0],[0,-1.494],[0.324,0],[0,0],[-0.18,-0.09],[-0.972,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-15.114,171.5],[-15.114,166.514],[-12.774,164.03],[-11.964,164.174],[-11.964,162.68],[-12.774,162.536],[-15.168,164.084],[-15.24,162.752],[-16.662,162.752],[-16.662,171.5]],"c":true},"ix":2},"nm":"Path 92","mn":"ADBE Vector Shape - Group","hd":false},{"ind":92,"ty":"sh","ix":93,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[-26.585,167.126],[-23.561,163.904],[-20.537,167.126],[-23.561,170.348]],"c":true},"ix":2},"nm":"Path 93","mn":"ADBE Vector Shape - Group","hd":false},{"ind":93,"ty":"sh","ix":94,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[-28.169,167.126],[-23.561,171.734],[-18.935,167.126],[-23.561,162.518]],"c":true},"ix":2},"nm":"Path 94","mn":"ADBE Vector Shape - Group","hd":false},{"ind":94,"ty":"sh","ix":95,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-33.33,169.304],[-35.454,162.752],[-36.948,162.752],[-39.108,169.268],[-41.196,162.752],[-42.834,162.752],[-39.918,171.5],[-38.406,171.5],[-36.21,164.93],[-34.032,171.5],[-32.574,171.5],[-29.568,162.752],[-31.206,162.752]],"c":true},"ix":2},"nm":"Path 95","mn":"ADBE Vector Shape - Group","hd":false},{"ind":95,"ty":"sh","ix":96,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-53.023,171.5],[-51.475,171.5],[-51.475,164.084],[-49.117,164.084],[-49.117,162.752],[-51.475,162.752],[-51.475,160.07],[-53.023,160.07],[-53.023,162.752],[-55.489,162.752],[-55.489,164.084],[-53.023,164.084]],"c":true},"ix":2},"nm":"Path 96","mn":"ADBE Vector Shape - Group","hd":false},{"ind":96,"ty":"sh","ix":97,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.476,0],[0,-1.656],[0,0],[0,0],[0,0],[2.052,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.89],[1.476,0],[0,0],[0,0],[0,0],[0,-2.358],[-1.314,0],[0,0],[0,0],[0,0]],"v":[[-65.037,171.5],[-63.489,171.5],[-63.489,166.892],[-60.969,163.922],[-58.917,166.478],[-58.917,171.5],[-57.369,171.5],[-57.369,166.1],[-60.591,162.518],[-63.543,164.192],[-63.669,162.752],[-65.037,162.752]],"c":true},"ix":2},"nm":"Path 97","mn":"ADBE Vector Shape - Group","hd":false},{"ind":97,"ty":"sh","ix":98,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-74.397,166.442],[-71.607,163.85],[-68.799,166.442]],"c":true},"ix":2},"nm":"Path 98","mn":"ADBE Vector Shape - Group","hd":false},{"ind":98,"ty":"sh","ix":99,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-75.981,167.162],[-71.499,171.734],[-67.557,169.358],[-68.817,168.8],[-71.463,170.42],[-74.415,167.486],[-67.341,167.486],[-67.269,166.73],[-71.553,162.518]],"c":true},"ix":2},"nm":"Path 99","mn":"ADBE Vector Shape - Group","hd":false},{"ind":99,"ty":"sh","ix":100,"ks":{"a":0,"k":{"i":[[2.502,0],[0,1.026],[-0.846,0.144],[0,0],[0,-0.918]],"o":[[-1.782,0],[0,-0.648],[0,0],[1.08,0],[0,0.972]],"v":[[-81.75,174.362],[-84.504,173.03],[-83.118,171.698],[-80.256,171.698],[-78.492,172.904]],"c":true},"ix":2},"nm":"Path 100","mn":"ADBE Vector Shape - Group","hd":false},{"ind":100,"ty":"sh","ix":101,"ks":{"a":0,"k":{"i":[[1.26,0],[0,1.152],[-1.278,0],[0,-1.17]],"o":[[-1.278,0],[0,-1.17],[1.26,0],[0,1.17]],"v":[[-81.552,167.63],[-83.676,165.686],[-81.552,163.706],[-79.446,165.686]],"c":true},"ix":2},"nm":"Path 101","mn":"ADBE Vector Shape - Group","hd":false},{"ind":101,"ty":"sh","ix":102,"ks":{"a":0,"k":{"i":[[-2.502,0],[0,2.034],[1.998,0],[0,0],[0,0.45],[-0.684,0.09],[-0.252,0],[0,1.818],[0.63,0.576],[-0.954,-0.018],[0,0],[0.306,-1.152],[0.63,0],[0,-1.836],[-1.098,-0.504],[0,-0.702],[-0.684,-0.144],[0,-1.08]],"o":[[3.168,0],[0,-1.602],[0,0],[-1.206,0],[0,-0.432],[0.252,0.054],[2.106,0],[0,-0.936],[0.288,-0.522],[0,0],[-1.386,-0.144],[-0.486,-0.252],[-2.124,0],[0,1.26],[-1.026,0.252],[0,0.558],[-1.26,0.162],[0,1.674]],"v":[[-81.75,175.406],[-76.872,172.652],[-79.914,170.276],[-81.912,170.276],[-83.568,169.592],[-82.398,168.728],[-81.57,168.8],[-78.024,165.686],[-79.014,163.382],[-77.034,162.572],[-77.034,161.186],[-79.788,162.914],[-81.552,162.518],[-85.08,165.686],[-83.316,168.422],[-84.9,169.97],[-83.784,171.194],[-85.908,173.228]],"c":true},"ix":2},"nm":"Path 102","mn":"ADBE Vector Shape - Group","hd":false},{"ind":102,"ty":"sh","ix":103,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-91.722,170.6],[-93.63,169.052],[-91.272,167.414],[-89.13,167.414],[-89.13,168.494]],"c":true},"ix":2},"nm":"Path 103","mn":"ADBE Vector Shape - Group","hd":false},{"ind":103,"ty":"sh","ix":104,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-92.118,171.734],[-89.022,170.132],[-88.878,171.5],[-87.402,171.5],[-87.582,169.664],[-87.582,165.632],[-91.128,162.518],[-94.89,164.966],[-93.486,165.29],[-91.182,163.796],[-89.13,165.524],[-89.13,166.406],[-91.434,166.406],[-95.196,169.178]],"c":true},"ix":2},"nm":"Path 104","mn":"ADBE Vector Shape - Group","hd":false},{"ind":104,"ty":"sh","ix":105,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-108.868,166.442],[-106.078,163.85],[-103.27,166.442]],"c":true},"ix":2},"nm":"Path 105","mn":"ADBE Vector Shape - Group","hd":false},{"ind":105,"ty":"sh","ix":106,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-110.452,167.162],[-105.97,171.734],[-102.028,169.358],[-103.288,168.8],[-105.934,170.42],[-108.886,167.486],[-101.812,167.486],[-101.74,166.73],[-106.024,162.518]],"c":true},"ix":2},"nm":"Path 106","mn":"ADBE Vector Shape - Group","hd":false},{"ind":106,"ty":"sh","ix":107,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-116.999,171.5],[-115.379,171.5],[-111.761,162.752],[-113.435,162.752],[-116.171,169.7],[-118.907,162.752],[-120.635,162.752]],"c":true},"ix":2},"nm":"Path 107","mn":"ADBE Vector Shape - Group","hd":false},{"ind":107,"ty":"sh","ix":108,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-124.258,171.5],[-122.71,171.5],[-122.71,162.752],[-124.258,162.752]],"c":true},"ix":2},"nm":"Path 108","mn":"ADBE Vector Shape - Group","hd":false},{"ind":108,"ty":"sh","ix":109,"ks":{"a":0,"k":{"i":[[-0.648,0],[0,0.666],[0.666,0],[0,-0.648]],"o":[[0.666,0],[0,-0.648],[-0.648,0],[0,0.666]],"v":[[-123.484,161.096],[-122.332,159.98],[-123.484,158.882],[-124.636,159.98]],"c":true},"ix":2},"nm":"Path 109","mn":"ADBE Vector Shape - Group","hd":false},{"ind":109,"ty":"sh","ix":110,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-127.033,171.5],[-127.033,158.45],[-128.581,158.45],[-128.581,171.5]],"c":true},"ix":2},"nm":"Path 110","mn":"ADBE Vector Shape - Group","hd":false},{"ind":110,"ty":"sh","ix":111,"ks":{"a":0,"k":{"i":[[0,0],[-1.512,0],[-0.072,-1.584]],"o":[[0.18,-1.602],[1.62,0],[0,0]],"v":[[-142.811,166.442],[-140.021,163.85],[-137.213,166.442]],"c":true},"ix":2},"nm":"Path 111","mn":"ADBE Vector Shape - Group","hd":false},{"ind":111,"ty":"sh","ix":112,"ks":{"a":0,"k":{"i":[[0,-2.718],[-2.646,0],[-0.558,1.458],[0,0],[1.188,0],[0.09,1.944],[0,0],[0,0.306],[2.556,0]],"o":[[0,2.772],[1.818,0],[0,0],[-0.378,0.972],[-1.782,0],[0,0],[0.036,-0.18],[0,-2.52],[-2.682,0]],"v":[[-144.395,167.162],[-139.913,171.734],[-135.971,169.358],[-137.231,168.8],[-139.877,170.42],[-142.829,167.486],[-135.755,167.486],[-135.683,166.73],[-139.967,162.518]],"c":true},"ix":2},"nm":"Path 112","mn":"ADBE Vector Shape - Group","hd":false},{"ind":112,"ty":"sh","ix":113,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-149.843,171.5],[-148.295,171.5],[-148.295,164.084],[-145.937,164.084],[-145.937,162.752],[-148.295,162.752],[-148.295,160.07],[-149.843,160.07],[-149.843,162.752],[-152.309,162.752],[-152.309,164.084],[-149.843,164.084]],"c":true},"ix":2},"nm":"Path 113","mn":"ADBE Vector Shape - Group","hd":false},{"ind":113,"ty":"sh","ix":114,"ks":{"a":0,"k":{"i":[[1.512,0],[0,0.936],[-1.548,0],[0,0],[0,0]],"o":[[-1.224,0],[0,-1.098],[0,0],[0,0],[0,1.26]],"v":[[-158.22,170.6],[-160.128,169.052],[-157.77,167.414],[-155.628,167.414],[-155.628,168.494]],"c":true},"ix":2},"nm":"Path 114","mn":"ADBE Vector Shape - Group","hd":false},{"ind":114,"ty":"sh","ix":115,"ks":{"a":0,"k":{"i":[[-1.89,0],[-0.378,0.882],[-0.072,-0.324],[0,0],[0,0.648],[0,0],[2.088,0],[0.342,-1.584],[0,0],[-1.278,0],[0,-1.116],[0,0],[0,0],[0,-1.872]],"o":[[1.476,0],[0.018,0.54],[0,0],[-0.108,-0.306],[0,0],[0,-2.178],[-1.89,0],[0,0],[0.144,-0.9],[1.224,0],[0,0],[0,0],[-2.25,0],[0,1.53]],"v":[[-158.616,171.734],[-155.52,170.132],[-155.376,171.5],[-153.9,171.5],[-154.08,169.664],[-154.08,165.632],[-157.626,162.518],[-161.388,164.966],[-159.984,165.29],[-157.68,163.796],[-155.628,165.524],[-155.628,166.406],[-157.932,166.406],[-161.694,169.178]],"c":true},"ix":2},"nm":"Path 115","mn":"ADBE Vector Shape - Group","hd":false},{"ind":115,"ty":"sh","ix":116,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[-1.422,0],[0,-1.692],[0,0],[0,0],[0,0],[-1.44,0],[0,-1.656],[0,0],[0,0],[0,0],[1.98,0],[0.486,-1.314],[1.476,0],[0.45,-1.062],[0,0],[0,0]],"o":[[0,0],[0,0],[0,-1.926],[1.386,0],[0,0],[0,0],[0,0],[0,-1.926],[1.404,0],[0,0],[0,0],[0,0],[0,-2.394],[-1.386,0],[-0.432,-1.35],[-1.278,0],[0,0],[0,0],[0,0]],"v":[[-177.256,171.5],[-175.69,171.5],[-175.69,166.892],[-173.26,163.922],[-171.28,166.46],[-171.28,171.5],[-169.732,171.5],[-169.732,166.892],[-167.284,163.922],[-165.322,166.46],[-165.322,171.5],[-163.756,171.5],[-163.756,166.118],[-166.906,162.518],[-169.966,164.534],[-172.882,162.518],[-175.744,164.21],[-175.87,162.752],[-177.256,162.752]],"c":true},"ix":2},"nm":"Path 116","mn":"ADBE Vector Shape - Group","hd":false},{"ind":116,"ty":"sh","ix":117,"ks":{"a":0,"k":{"i":[[0,1.836],[-1.854,0],[0,-1.836],[1.872,0]],"o":[[0,-1.836],[1.872,0],[0,1.836],[-1.854,0]],"v":[[-187.179,167.126],[-184.155,163.904],[-181.131,167.126],[-184.155,170.348]],"c":true},"ix":2},"nm":"Path 117","mn":"ADBE Vector Shape - Group","hd":false},{"ind":117,"ty":"sh","ix":118,"ks":{"a":0,"k":{"i":[[0,-2.61],[-2.772,0],[0,2.61],[2.79,0]],"o":[[0,2.61],[2.79,0],[0,-2.61],[-2.772,0]],"v":[[-188.763,167.126],[-184.155,171.734],[-179.529,167.126],[-184.155,162.518]],"c":true},"ix":2},"nm":"Path 118","mn":"ADBE Vector Shape - Group","hd":false},{"ind":118,"ty":"sh","ix":119,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-194.193,171.5],[-192.645,171.5],[-192.645,164.084],[-190.287,164.084],[-190.287,162.752],[-192.645,162.752],[-192.645,160.07],[-194.193,160.07],[-194.193,162.752],[-196.659,162.752],[-196.659,164.084],[-194.193,164.084]],"c":true},"ix":2},"nm":"Path 119","mn":"ADBE Vector Shape - Group","hd":false},{"ind":119,"ty":"sh","ix":120,"ks":{"a":0,"k":{"i":[[0,0],[-1.782,0],[-0.432,0.936],[-0.09,-0.414],[0,0],[0,0.702],[0,0],[0,0],[0,0],[1.566,0],[0,1.746],[0,0],[0,0]],"o":[[0,2.502],[1.35,0],[0.036,0.45],[0,0],[-0.09,-0.36],[0,0],[0,0],[0,0],[0,1.458],[-1.152,0],[0,0],[0,0],[0,0]],"v":[[-206.51,168.134],[-203.198,171.734],[-200.336,170.186],[-200.174,171.5],[-198.68,171.5],[-198.842,169.736],[-198.842,162.752],[-200.39,162.752],[-200.39,167.702],[-202.784,170.33],[-204.962,167.936],[-204.962,162.752],[-206.51,162.752]],"c":true},"ix":2},"nm":"Path 120","mn":"ADBE Vector Shape - Group","hd":false},{"ind":120,"ty":"sh","ix":121,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-217.072,166.946],[-214.462,159.926],[-211.78,166.946]],"c":true},"ix":2},"nm":"Path 121","mn":"ADBE Vector Shape - Group","hd":false},{"ind":121,"ty":"sh","ix":122,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-220.366,171.5],[-218.746,171.5],[-217.54,168.296],[-211.294,168.296],[-210.052,171.5],[-208.396,171.5],[-213.364,158.45],[-215.524,158.45]],"c":true},"ix":2},"nm":"Path 122","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.066666670144,0.180392161012,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":123,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":43,"op":1840,"st":40,"bm":0}],"markers":[]}

var paramsHow = {
    container: document.getElementById('how'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: how
};
var animHow;
animHow = lottie.loadAnimation(paramsHow);



var $window = $(window);
var $animation_elements = $('.json-play');
$vHeight = $(window).height();
function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top + $vHeight / 2;
        var element_bottom_position = (element_top_position + element_height);
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
                setTimeout(function(){
                    animHomeGraph.play();
                    animHow.play();
                    $element.addClass('in-view');
                }, 200);
        } 
    });
}
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
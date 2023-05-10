var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(t) {
        var e, i, s, n, o, r, a, l = "",
            h = 0;
        for (t = Base64._utf8_encode(t); h < t.length;) e = t.charCodeAt(h++), i = t.charCodeAt(h++), s = t.charCodeAt(h++), n = e >> 2, o = (3 & e) << 4 | i >> 4, r = (15 & i) << 2 | s >> 6, a = 63 & s, isNaN(i) ? r = a = 64 : isNaN(s) && (a = 64), l = l + this._keyStr.charAt(n) + this._keyStr.charAt(o) + this._keyStr.charAt(r) + this._keyStr.charAt(a);
        return l
    },
    decode: function(t) {
        var e, i, s, n, o, r, a, l = "",
            h = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < t.length;) n = this._keyStr.indexOf(t.charAt(h++)), o = this._keyStr.indexOf(t.charAt(h++)), r = this._keyStr.indexOf(t.charAt(h++)), a = this._keyStr.indexOf(t.charAt(h++)), e = n << 2 | o >> 4, i = (15 & o) << 4 | r >> 2, s = (3 & r) << 6 | a, l += String.fromCharCode(e), 64 != r && (l += String.fromCharCode(i)), 64 != a && (l += String.fromCharCode(s));
        return l = Base64._utf8_decode(l)
    },
    _utf8_encode: function(t) {
        t = t.replace(/\r\n/g, "\n");
        for (var e = "", i = 0; i < t.length; i++) {
            var s = t.charCodeAt(i);
            128 > s ? e += String.fromCharCode(s) : s > 127 && 2048 > s ? (e += String.fromCharCode(s >> 6 | 192), e += String.fromCharCode(63 & s | 128)) : (e += String.fromCharCode(s >> 12 | 224), e += String.fromCharCode(s >> 6 & 63 | 128), e += String.fromCharCode(63 & s | 128))
        }
        return e
    },
    _utf8_decode: function(t) {
        for (var e = "", i = 0, s = c1 = c2 = 0; i < t.length;) s = t.charCodeAt(i), 128 > s ? (e += String.fromCharCode(s), i++) : s > 191 && 224 > s ? (c2 = t.charCodeAt(i + 1), e += String.fromCharCode((31 & s) << 6 | 63 & c2), i += 2) : (c2 = t.charCodeAt(i + 1), c3 = t.charCodeAt(i + 2), e += String.fromCharCode((15 & s) << 12 | (63 & c2) << 6 | 63 & c3), i += 3);
        return e
    }
};
! function(t) {
    function e(t, e) {
        if (!(t.originalEvent.touches.length > 1)) {
            t.preventDefault();
            var i = t.originalEvent.changedTouches[0],
                s = document.createEvent("MouseEvents");
            s.initMouseEvent(e, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(s)
        }
    }
    if (t.support.touch = "ontouchend" in document, t.support.touch) {
        var i, s = t.ui.mouse.prototype,
            n = s._mouseInit,
            o = s._mouseDestroy;
        s._touchStart = function(t) {
            var s = this;
            !i && s._mouseCapture(t.originalEvent.changedTouches[0]) && (i = !0, s._touchMoved = !1, e(t, "mouseover"), e(t, "mousemove"), e(t, "mousedown"))
        }, s._touchMove = function(t) {
            i && (this._touchMoved = !0, e(t, "mousemove"))
        }, s._touchEnd = function(t) {
            i && (e(t, "mouseup"), e(t, "mouseout"), this._touchMoved || e(t, "click"), i = !1)
        }, s._mouseInit = function() {
            var e = this;
            e.element.bind({
                touchstart: t.proxy(e, "_touchStart"),
                touchmove: t.proxy(e, "_touchMove"),
                touchend: t.proxy(e, "_touchEnd")
            }), n.call(e)
        }, s._mouseDestroy = function() {
            var e = this;
            e.element.unbind({
                touchstart: t.proxy(e, "_touchStart"),
                touchmove: t.proxy(e, "_touchMove"),
                touchend: t.proxy(e, "_touchEnd")
            }), o.call(e)
        }
    }
}(jQuery), ! function(t, e) {
    function i() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function s() {
        var t = new Date;
        return i(t.getFullYear(), t.getMonth(), t.getDate())
    }

    function n(t, e) {
        return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate()
    }


    function o(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }

    function r(e, i) {
        function s(t, e) {
            return e.toLowerCase()
        }
        var n, o = t(e).data(),
            r = {},
            a = new RegExp("^" + i.toLowerCase() + "([A-Z])");
        i = new RegExp("^" + i.toLowerCase());
        for (var l in o) i.test(l) && (n = l.replace(a, s), r[n] = o[l]);
        return r
    }

    function a(e) {
        var i = {};
        if (g[e] || (e = e.split("-")[0], g[e])) {
            var s = g[e];
            return t.each(f, function(t, e) {
                e in s && (i[e] = s[e])
            }), i
        }
    }
    var l = function() {
            var e = {
                get: function(t) {
                    return this.slice(t)[0]
                },
                contains: function(t) {
                    for (var e = t && t.valueOf(), i = 0, s = this.length; s > i; i++)
                        if (this[i].valueOf() === e) return i;
                    return -1
                },
                remove: function(t) {
                    this.splice(t, 1)
                },
                replace: function(e) {
                    e && (t.isArray(e) || (e = [e]), this.clear(), this.push.apply(this, e))
                },
                clear: function() {
                    this.length = 0
                },
                copy: function() {
                    var t = new l;
                    return t.replace(this), t
                }
            };
            return function() {
                var i = [];
                return i.push.apply(i, arguments), t.extend(i, e), i
            }
        }(),
        h = function(e, i) {
            this._process_options(i), this.dates = new l, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = t(m.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function(t, e) {
                return parseInt(e) + 1
            }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
        };
    h.prototype = {
        constructor: h,
        _process_options: function(n) {
            this._o = t.extend({}, this._o, n);
            var o = this.o = t.extend({}, this._o),
                r = o.language;
            switch (g[r] || (r = r.split("-")[0], g[r] || (r = p.language)), o.language = r, o.startView) {
                case 2:
                case "decade":
                    o.startView = 2;
                    break;
                case 1:
                case "year":
                    o.startView = 1;
                    break;
                default:
                    o.startView = 0
            }
            switch (o.minViewMode) {
                case 1:
                case "months":
                    o.minViewMode = 1;
                    break;
                case 2:
                case "years":
                    o.minViewMode = 2;
                    break;
                default:
                    o.minViewMode = 0
            }
            o.startView = Math.max(o.startView, o.minViewMode), o.multidate !== !0 && (o.multidate = Number(o.multidate) || !1, o.multidate !== !1 && (o.multidate = Math.max(0, o.multidate))), o.multidateSeparator = String(o.multidateSeparator), o.weekStart %= 7, o.weekEnd = (o.weekStart + 6) % 7;
            var a = m.parseFormat(o.format);
            if (o.startDate !== -1 / 0 && (o.startDate = o.startDate ? o.startDate instanceof Date ? this._local_to_utc(this._zero_time(o.startDate)) : m.parseDate(o.startDate, a, o.language) : -1 / 0), 1 / 0 !== o.endDate && (o.endDate = o.endDate ? o.endDate instanceof Date ? this._local_to_utc(this._zero_time(o.endDate)) : m.parseDate(o.endDate, a, o.language) : 1 / 0), o.daysOfWeekDisabled = o.daysOfWeekDisabled || [], t.isArray(o.daysOfWeekDisabled) || (o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/)), o.daysOfWeekDisabled = t.map(o.daysOfWeekDisabled, function(t) {
                    return parseInt(t, 10)
                }), o.datesDisabled = o.datesDisabled || [], !t.isArray(o.datesDisabled)) {
                var l = [];
                l.push(m.parseDate(o.datesDisabled, a, o.language)), o.datesDisabled = l
            }
            o.datesDisabled = t.map(o.datesDisabled, function(t) {
                return m.parseDate(t, a, o.language)
            });
            var h = String(o.orientation).toLowerCase().split(/\s+/g),
                c = o.orientation.toLowerCase();
            if (h = t.grep(h, function(t) {
                    return /^auto|left|right|top|bottom$/.test(t)
                }), o.orientation = {
                    x: "auto",
                    y: "auto"
                }, c && "auto" !== c)
                if (1 === h.length) switch (h[0]) {
                    case "top":
                    case "bottom":
                        o.orientation.y = h[0];
                        break;
                    case "left":
                    case "right":
                        o.orientation.x = h[0]
                } else c = t.grep(h, function(t) {
                    return /^left|right$/.test(t)
                }), o.orientation.x = c[0] || "auto", c = t.grep(h, function(t) {
                    return /^top|bottom$/.test(t)
                }), o.orientation.y = c[0] || "auto";
            if (o.defaultViewDate) {
                var d = o.defaultViewDate.year || (new Date).getFullYear(),
                    u = o.defaultViewDate.month || 0,
                    f = o.defaultViewDate.day || 1;
                o.defaultViewDate = i(d, u, f)
            } else o.defaultViewDate = s();
            o.showOnFocus = o.showOnFocus !== e ? o.showOnFocus : !0
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) {
            for (var i, s, n, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (s = e, n = t[o][1]) : 3 === t[o].length && (s = t[o][1], n = t[o][2]), i.on(n, s)
        },
        _unapplyEvents: function(t) {
            for (var i, s, n, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (n = e, s = t[o][1]) : 3 === t[o].length && (n = t[o][1], s = t[o][2]), i.off(s, n)
        },
        _buildEvents: function() {
            var e = {
                keyup: t.proxy(function(e) {
                    -1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                }, this),
                keydown: t.proxy(this.keydown, this)
            };
            this.o.showOnFocus === !0 && (e.focus = t.proxy(this.show, this)), this.isInput ? this._events = [
                [this.element, e]
            ] : this.component && this.hasInput ? this._events = [
                [this.element.find("input"), e],
                [this.component, {
                    click: t.proxy(this.show, this)
                }]
            ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                [this.element, {
                    click: t.proxy(this.show, this)
                }]
            ], this._events.push([this.element, "*", {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }], [this.element, {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }]), this._secondaryEvents = [
                [this.picker, {
                    click: t.proxy(this.click, this)
                }],
                [t(window), {
                    resize: t.proxy(this.place, this)
                }],
                [t(document), {
                    "mousedown touchstart": t.proxy(function(t) {
                        this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide()
                    }, this)
                }]
            ]
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(e, i) {
            var s = i || this.dates.get(-1),
                n = this._utc_to_local(s);
            this.element.trigger({
                type: e,
                date: n,
                dates: t.map(this.dates, this._utc_to_local),
                format: t.proxy(function(t, e) {
                    0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format;
                    var i = this.dates.get(t);
                    return m.formatDate(i, e, this.o.language)
                }, this)
            })
        },
        show: function() {
            return this.element.attr("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && t(this.element).blur(), this)
        },
        hide: function() {
            return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"), this) : this
        },
        remove: function() {
            return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
        },
        _utc_to_local: function(t) {
            return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
        },
        _local_to_utc: function(t) {
            return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
        },
        _zero_time: function(t) {
            return t && new Date(t.getFullYear(), t.getMonth(), t.getDate())
        },
        _zero_utc_time: function(t) {
            return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
        },
        getDates: function() {
            return t.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return t.map(this.dates, function(t) {
                return new Date(t)
            })
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var t = this.dates.get(-1);
            return "undefined" != typeof t ? new Date(t) : null
        },
        clearDates: function() {
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input")), t && t.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
        },
        setDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, e), this._trigger("changeDate"), this.setValue(), this
        },
        setUTCDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, t.map(e, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this
        },
        setDate: o("setDates"),
        setUTCDate: o("setUTCDates"),
        setValue: function() {
            var t = this.getFormattedDate();
            return this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change(), this
        },
        getFormattedDate: function(i) {
            i === e && (i = this.o.format);
            var s = this.o.language;
            return t.map(this.dates, function(t) {
                return m.formatDate(t, i, s)
            }).join(this.o.multidateSeparator)
        },
        setStartDate: function(t) {
            return this._process_options({
                startDate: t
            }), this.update(), this.updateNavArrows(), this
        },
        setEndDate: function(t) {
            return this._process_options({
                endDate: t
            }), this.update(), this.updateNavArrows(), this
        },
        setDaysOfWeekDisabled: function(t) {
            return this._process_options({
                daysOfWeekDisabled: t
            }), this.update(), this.updateNavArrows(), this
        },
        setDatesDisabled: function(t) {
            this._process_options({
                datesDisabled: t
            }), this.update(), this.updateNavArrows()
        },
        place: function() {
            if (this.isInline) return this;
            var e = this.picker.outerWidth(),
                i = this.picker.outerHeight(),
                s = 10,
                n = t(this.o.container).width(),
                o = t(this.o.container).height(),
                r = t(this.o.container).scrollTop(),
                a = t(this.o.container).offset(),
                l = [];
            this.element.parents().each(function() {
                var e = t(this).css("z-index");
                "auto" !== e && 0 !== e && l.push(parseInt(e))
            });
            var h = Math.max.apply(Math, l) + 10,
                c = this.component ? this.component.parent().offset() : this.element.offset(),
                d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                u = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                p = c.left - a.left,
                f = c.top - a.top;
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (p -= e - u)) : c.left < 0 ? (this.picker.addClass("datepicker-orient-left"), p -= c.left - s) : p + e > n ? (this.picker.addClass("datepicker-orient-right"), p = c.left + u - e) : this.picker.addClass("datepicker-orient-left");
            var g, m, v = this.o.orientation.y;
            if ("auto" === v && (g = -r + f - i, m = r + o - (f + d + i), v = Math.max(g, m) === m ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + v), "top" === v ? f += d : f -= i + parseInt(this.picker.css("padding-top")), this.o.rtl) {
                var y = n - (p + u);
                this.picker.css({
                    top: f,
                    right: y,
                    zIndex: h
                })
            } else this.picker.css({
                top: f,
                left: p,
                zIndex: h
            });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var e = this.dates.copy(),
                i = [],
                s = !1;
            return arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                e instanceof Date && (e = this._local_to_utc(e)), i.push(e)
            }, this)), s = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = t.map(i, t.proxy(function(t) {
                return m.parseDate(t, this.o.format, this.o.language)
            }, this)), i = t.grep(i, t.proxy(function(t) {
                return t < this.o.startDate || t > this.o.endDate || !t
            }, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), s ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && e.length && this._trigger("clearDate"), this.fill(), this
        },
        fillDow: function() {
            var t = this.o.weekStart,
                e = "<tr>";
            if (this.o.calendarWeeks) {
                this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan", function(t, e) {
                    return parseInt(e) + 1
                });
                var i = '<th class="cw">&#160;</th>';
                e += i
            }
            for (; t < this.o.weekStart + 7;) e += '<th class="dow">' + g[this.o.language].daysMin[t++ % 7] + "</th>";
            e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
        },
        fillMonths: function() {
            for (var t = "", e = 0; 12 > e;) t += '<span class="month">' + g[this.o.language].monthsShort[e++] + "</span>";
            this.picker.find(".datepicker-months td").html(t)
        },
        setRange: function(e) {
            e && e.length ? this.range = t.map(e, function(t) {
                return t.valueOf()
            }) : delete this.range, this.fill()
        },
        getClassNames: function(e) {
            var i = [],
                s = this.viewDate.getUTCFullYear(),
                o = this.viewDate.getUTCMonth(),
                r = new Date;
            return e.getUTCFullYear() < s || e.getUTCFullYear() === s && e.getUTCMonth() < o ? i.push("old") : (e.getUTCFullYear() > s || e.getUTCFullYear() === s && e.getUTCMonth() > o) && i.push("new"), this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && e.getUTCFullYear() === r.getFullYear() && e.getUTCMonth() === r.getMonth() && e.getUTCDate() === r.getDate() && i.push("today"), -1 !== this.dates.contains(e) && i.push("active"), (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)) && i.push("disabled"), this.o.datesDisabled.length > 0 && t.grep(this.o.datesDisabled, function(t) {
                return n(e, t)
            }).length > 0 && i.push("disabled", "disabled-date"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected")), i
        },
        fill: function() {
            var s, n = new Date(this.viewDate),
                o = n.getUTCFullYear(),
                r = n.getUTCMonth(),
                a = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                h = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1 / 0,
                c = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1 / 0,
                d = g[this.o.language].today || g.en.today || "",
                u = g[this.o.language].clear || g.en.clear || "";
            if (!isNaN(o) && !isNaN(r)) {
                this.picker.find(".datepicker-days thead .datepicker-switch").text(g[this.o.language].months[r] + " " + o), this.picker.find("tfoot .today").text(d).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot .clear").text(u).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
                var p = i(o, r - 1, 28),
                    f = m.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
                p.setUTCDate(f), p.setUTCDate(f - (p.getUTCDay() - this.o.weekStart + 7) % 7);
                var v = new Date(p);
                v.setUTCDate(v.getUTCDate() + 42), v = v.valueOf();
                for (var y, x = []; p.valueOf() < v;) {
                    if (p.getUTCDay() === this.o.weekStart && (x.push("<tr>"), this.o.calendarWeeks)) {
                        var b = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
                            w = new Date(Number(b) + (11 - b.getUTCDay()) % 7 * 864e5),
                            k = new Date(Number(k = i(w.getUTCFullYear(), 0, 1)) + (11 - k.getUTCDay()) % 7 * 864e5),
                            C = (w - k) / 864e5 / 7 + 1;
                        x.push('<td class="cw">' + C + "</td>")
                    }
                    if (y = this.getClassNames(p), y.push("day"), this.o.beforeShowDay !== t.noop) {
                        var S = this.o.beforeShowDay(this._utc_to_local(p));
                        S === e ? S = {} : "boolean" == typeof S ? S = {
                            enabled: S
                        } : "string" == typeof S && (S = {
                            classes: S
                        }), S.enabled === !1 && y.push("disabled"), S.classes && (y = y.concat(S.classes.split(/\s+/))), S.tooltip && (s = S.tooltip)
                    }
                    y = t.unique(y), x.push('<td class="' + y.join(" ") + '"' + (s ? ' title="' + s + '"' : "") + ">" + p.getUTCDate() + "</td>"), s = null, p.getUTCDay() === this.o.weekEnd && x.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(x.join(""));
                var T = this.picker.find(".datepicker-months").find("th:eq(1)").text(o).end().find("span").removeClass("active");
                if (t.each(this.dates, function(t, e) {
                        e.getUTCFullYear() === o && T.eq(e.getUTCMonth()).addClass("active")
                    }), (a > o || o > h) && T.addClass("disabled"), o === a && T.slice(0, l).addClass("disabled"), o === h && T.slice(c + 1).addClass("disabled"), this.o.beforeShowMonth !== t.noop) {
                    var D = this;
                    t.each(T, function(e, i) {
                        if (!t(i).hasClass("disabled")) {
                            var s = new Date(o, e, 1),
                                n = D.o.beforeShowMonth(s);
                            n === !1 && t(i).addClass("disabled")
                        }
                    })
                }
                x = "", o = 10 * parseInt(o / 10, 10);
                var M = this.picker.find(".datepicker-years").find("th:eq(1)").text(o + "-" + (o + 9)).end().find("td");
                o -= 1;
                for (var A, P = t.map(this.dates, function(t) {
                        return t.getUTCFullYear()
                    }), L = -1; 11 > L; L++) A = ["year"], -1 === L ? A.push("old") : 10 === L && A.push("new"), -1 !== t.inArray(o, P) && A.push("active"), (a > o || o > h) && A.push("disabled"), x += '<span class="' + A.join(" ") + '">' + o + "</span>", o += 1;
                M.html(x)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var t = new Date(this.viewDate),
                    e = t.getUTCFullYear(),
                    i = t.getUTCMonth();
                switch (this.viewMode) {
                    case 0:
                        this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        }), this.picker.find(".next").css(1 / 0 !== this.o.endDate && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        });
                        break;
                    case 1:
                    case 2:
                        this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        }), this.picker.find(".next").css(1 / 0 !== this.o.endDate && e >= this.o.endDate.getUTCFullYear() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        })
                }
            }
        },
        click: function(e) {
            e.preventDefault();
            var s, n, o, r = t(e.target).closest("span, td, th");
            if (1 === r.length) switch (r[0].nodeName.toLowerCase()) {
                case "th":
                    switch (r[0].className) {
                        case "datepicker-switch":
                            this.showMode(1);
                            break;
                        case "prev":
                        case "next":
                            var a = m.modes[this.viewMode].navStep * ("prev" === r[0].className ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, a), this._trigger("changeMonth", this.viewDate);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, a), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                            }
                            this.fill();
                            break;
                        case "today":
                            var l = new Date;
                            l = i(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0), this.showMode(-2);
                            var h = "linked" === this.o.todayBtn ? null : "view";
                            this._setDate(l, h);
                            break;
                        case "clear":
                            this.clearDates()
                    }
                    break;
                case "span":
                    r.hasClass("disabled") || (this.viewDate.setUTCDate(1), r.hasClass("month") ? (o = 1, n = r.parent().find("span").index(r), s = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(n), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(i(s, n, o))) : (o = 1, n = 0, s = parseInt(r.text(), 10) || 0, this.viewDate.setUTCFullYear(s), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(i(s, n, o))), this.showMode(-1), this.fill());
                    break;
                case "td":
                    r.hasClass("day") && !r.hasClass("disabled") && (o = parseInt(r.text(), 10) || 1, s = this.viewDate.getUTCFullYear(), n = this.viewDate.getUTCMonth(), r.hasClass("old") ? 0 === n ? (n = 11, s -= 1) : n -= 1 : r.hasClass("new") && (11 === n ? (n = 0, s += 1) : n += 1), this._setDate(i(s, n, o)))
            }
            this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(), delete this._focused_from
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (t || this.dates.clear(), -1 !== e ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(e) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(t)) : this.dates.push(t), "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
        },
        _setDate: function(t, e) {
            e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), e && "view" === e || this._trigger("changeDate");
            var i;
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide()
        },
        moveMonth: function(t, i) {
            if (!t) return e;
            if (!i) return t;
            var s, n, o = new Date(t.valueOf()),
                r = o.getUTCDate(),
                a = o.getUTCMonth(),
                l = Math.abs(i);
            if (i = i > 0 ? 1 : -1, 1 === l) n = -1 === i ? function() {
                return o.getUTCMonth() === a
            } : function() {
                return o.getUTCMonth() !== s
            }, s = a + i, o.setUTCMonth(s), (0 > s || s > 11) && (s = (s + 12) % 12);
            else {
                for (var h = 0; l > h; h++) o = this.moveMonth(o, i);
                s = o.getUTCMonth(), o.setUTCDate(r), n = function() {
                    return s !== o.getUTCMonth()
                }
            }
            for (; n();) o.setUTCDate(--r), o.setUTCMonth(s);
            return o
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e)
        },
        dateWithinRange: function(t) {
            return t >= this.o.startDate && t <= this.o.endDate
        },
        keydown: function(t) {
            if (!this.picker.is(":visible")) return void(27 === t.keyCode && this.show());
            var e, i, n, o = !1,
                r = this.focusDate || this.viewDate;
            switch (t.keyCode) {
                case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.o.keyboardNavigation) break;
                    e = 37 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || s(), e), n = this.moveYear(r, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || s(), e), n = this.moveMonth(r, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || s()), i.setUTCDate(i.getUTCDate() + e), n = new Date(r), n.setUTCDate(r.getUTCDate() + e)), this.dateWithinRange(n) && (this.focusDate = this.viewDate = n, this.setValue(), this.fill(), t.preventDefault());
                    break;
                case 38:
                case 40:
                    if (!this.o.keyboardNavigation) break;
                    e = 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || s(), e), n = this.moveYear(r, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || s(), e), n = this.moveMonth(r, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || s()), i.setUTCDate(i.getUTCDate() + 7 * e), n = new Date(r), n.setUTCDate(r.getUTCDate() + 7 * e)), this.dateWithinRange(n) && (this.focusDate = this.viewDate = n, this.setValue(), this.fill(), t.preventDefault());
                    break;
                case 32:
                    break;
                case 13:
                    r = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(r), o = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), "function" == typeof t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, this.o.autoclose && this.hide());
                    break;
                case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
            }
            if (o) {
                this._trigger(this.dates.length ? "changeDate" : "clearDate");
                var a;
                this.isInput ? a = this.element : this.component && (a = this.element.find("input")), a && a.change()
            }
        },
        showMode: function(t) {
            t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), this.picker.children("div").hide().filter(".datepicker-" + m.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }
    };
    var c = function(e, i) {
        this.element = t(e), this.inputs = t.map(i.inputs, function(t) {
            return t.jquery ? t[0] : t
        }), delete i.inputs, u.call(t(this.inputs), i).bind("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function(e) {
            return t(e).data("datepicker")
        }), this.updateDates()
    };
    c.prototype = {
        updateDates: function() {
            this.dates = t.map(this.pickers, function(t) {
                return t.getUTCDate()
            }), this.updateRanges()
        },
        updateRanges: function() {
            var e = t.map(this.dates, function(t) {
                return t.valueOf()
            });
            t.each(this.pickers, function(t, i) {
                i.setRange(e)
            })
        },
        dateUpdated: function(e) {
            if (!this.updating) {
                this.updating = !0;
                var i = t(e.target).data("datepicker"),
                    s = i.getUTCDate(),
                    n = t.inArray(e.target, this.inputs),
                    o = n - 1,
                    r = n + 1,
                    a = this.inputs.length;
                if (-1 !== n) {
                    if (t.each(this.pickers, function(t, e) {
                            e.getUTCDate() || e.setUTCDate(s)
                        }), s < this.dates[o])
                        for (; o >= 0 && s < this.dates[o];) this.pickers[o--].setUTCDate(s);
                    else if (s > this.dates[r])
                        for (; a > r && s > this.dates[r];) this.pickers[r++].setUTCDate(s);
                    this.updateDates(), delete this.updating
                }
            }
        },
        remove: function() {
            t.map(this.pickers, function(t) {
                t.remove()
            }), delete this.element.data().datepicker
        }
    };
    var d = t.fn.datepicker,
        u = function(i) {
            var s = Array.apply(null, arguments);
            s.shift();
            var n;
            return this.each(function() {
                var o = t(this),
                    l = o.data("datepicker"),
                    d = "object" == typeof i && i;
                if (!l) {
                    var u = r(this, "date"),
                        f = t.extend({}, p, u, d),
                        g = a(f.language),
                        m = t.extend({}, p, g, u, d);
                    if (o.hasClass("input-daterange") || m.inputs) {
                        var v = {
                            inputs: m.inputs || o.find("input").toArray()
                        };
                        o.data("datepicker", l = new c(this, t.extend(m, v)))
                    } else o.data("datepicker", l = new h(this, m))
                }
                return "string" == typeof i && "function" == typeof l[i] && (n = l[i].apply(l, s), n !== e) ? !1 : void 0
            }), n !== e ? n : this
        };
    t.fn.datepicker = u;
    var p = t.fn.datepicker.defaults = {
            autoclose: !1,
            beforeShowDay: t.noop,
            beforeShowMonth: t.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            datesDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -1 / 0,
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            container: "body"
        },
        f = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    t.fn.datepicker.Constructor = h;
    var g = t.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear"
            }
        },
        m = {
            modes: [{
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
            isLeapYear: function(t) {
                return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
            },
            getDaysInMonth: function(t, e) {
                return [31, m.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function(t) {
                var e = t.replace(this.validParts, "\x00").split("\x00"),
                    i = t.match(this.validParts);
                if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                return {
                    separators: e,
                    parts: i
                }
            },
            parseDate: function(s, n, o) {
                function r() {
                    var t = this.slice(0, u[c].length),
                        e = u[c].slice(0, t.length);
                    return t.toLowerCase() === e.toLowerCase()
                }
                if (!s) return e;
                if (s instanceof Date) return s;
                "string" == typeof n && (n = m.parseFormat(n));
                var a, l, c, d = /([\-+]\d+)([dmwy])/,
                    u = s.match(/([\-+]\d+)([dmwy])/g);
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(s)) {
                    for (s = new Date, c = 0; c < u.length; c++) switch (a = d.exec(u[c]), l = parseInt(a[1]), a[2]) {
                        case "d":
                            s.setUTCDate(s.getUTCDate() + l);
                            break;
                        case "m":
                            s = h.prototype.moveMonth.call(h.prototype, s, l);
                            break;
                        case "w":
                            s.setUTCDate(s.getUTCDate() + 7 * l);
                            break;
                        case "y":
                            s = h.prototype.moveYear.call(h.prototype, s, l)
                    }
                    return i(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), 0, 0, 0)
                }
                u = s && s.match(this.nonpunctuation) || [], s = new Date;
                var p, f, v = {},
                    y = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    x = {
                        yyyy: function(t, e) {
                            return t.setUTCFullYear(e)
                        },
                        yy: function(t, e) {
                            return t.setUTCFullYear(2e3 + e)
                        },
                        m: function(t, e) {
                            if (isNaN(t)) return t;
                            for (e -= 1; 0 > e;) e += 12;
                            for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1);
                            return t
                        },
                        d: function(t, e) {
                            return t.setUTCDate(e)
                        }
                    };
                x.M = x.MM = x.mm = x.m, x.dd = x.d, s = i(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0);
                var b = n.parts.slice();
                if (u.length !== b.length && (b = t(b).filter(function(e, i) {
                        return -1 !== t.inArray(i, y)
                    }).toArray()), u.length === b.length) {
                    var w;
                    for (c = 0, w = b.length; w > c; c++) {
                        if (p = parseInt(u[c], 10), a = b[c], isNaN(p)) switch (a) {
                            case "MM":
                                f = t(g[o].months).filter(r), p = t.inArray(f[0], g[o].months) + 1;
                                break;
                            case "M":
                                f = t(g[o].monthsShort).filter(r), p = t.inArray(f[0], g[o].monthsShort) + 1
                        }
                        v[a] = p
                    }
                    var k, C;
                    for (c = 0; c < y.length; c++) C = y[c], C in v && !isNaN(v[C]) && (k = new Date(s), x[C](k, v[C]), isNaN(k) || (s = k))
                }
                return s
            },
            formatDate: function(e, i, s) {
                if (!e) return "";
                "string" == typeof i && (i = m.parseFormat(i));
                var n = {
                    d: e.getUTCDate(),
                    D: g[s].daysShort[e.getUTCDay()],
                    DD: g[s].days[e.getUTCDay()],
                    m: e.getUTCMonth() + 1,
                    M: g[s].monthsShort[e.getUTCMonth()],
                    MM: g[s].months[e.getUTCMonth()],
                    yy: e.getUTCFullYear().toString().substring(2),
                    yyyy: e.getUTCFullYear()
                };
                n.dd = (n.d < 10 ? "0" : "") + n.d, n.mm = (n.m < 10 ? "0" : "") + n.m, e = [];
                for (var o = t.extend([], i.separators), r = 0, a = i.parts.length; a >= r; r++) o.length && e.push(o.shift()), e.push(n[i.parts[r]]);
                return e.join("")
            },
            headTemplate: '<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
    m.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + m.headTemplate + "<tbody></tbody>" + m.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = m, t.fn.datepicker.noConflict = function() {
        return t.fn.datepicker = d, this
    }, t.fn.datepicker.version = "1.4.0", t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var i = t(this);
        i.data("datepicker") || (e.preventDefault(), u.call(i, "show"))
    }), t(function() {
        u.call(t('[data-provide="datepicker-inline"]'))
    })
}(window.jQuery), ! function(t) {
    "use strict";

    function e(e) {
        var i = [{
            re: /[\xC0-\xC6]/g,
            ch: "A"
        }, {
            re: /[\xE0-\xE6]/g,
            ch: "a"
        }, {
            re: /[\xC8-\xCB]/g,
            ch: "E"
        }, {
            re: /[\xE8-\xEB]/g,
            ch: "e"
        }, {
            re: /[\xCC-\xCF]/g,
            ch: "I"
        }, {
            re: /[\xEC-\xEF]/g,
            ch: "i"
        }, {
            re: /[\xD2-\xD6]/g,
            ch: "O"
        }, {
            re: /[\xF2-\xF6]/g,
            ch: "o"
        }, {
            re: /[\xD9-\xDC]/g,
            ch: "U"
        }, {
            re: /[\xF9-\xFC]/g,
            ch: "u"
        }, {
            re: /[\xC7-\xE7]/g,
            ch: "c"
        }, {
            re: /[\xD1]/g,
            ch: "N"
        }, {
            re: /[\xF1]/g,
            ch: "n"
        }];
        return t.each(i, function() {
            e = e.replace(this.re, this.ch)
        }), e
    }

    function i(t) {
        var e = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            i = "(?:" + Object.keys(e).join("|") + ")",
            s = new RegExp(i),
            n = new RegExp(i, "g"),
            o = null == t ? "" : "" + t;
        return s.test(o) ? o.replace(n, function(t) {
            return e[t]
        }) : o
    }

    function s(e, i) {
        var s = arguments,
            o = e,
            r = i;
        [].shift.apply(s);
        var a, l = this.each(function() {
            var e = t(this);
            if (e.is("select")) {
                var i = e.data("selectpicker"),
                    l = "object" == typeof o && o;
                if (i) {
                    if (l)
                        for (var h in l) l.hasOwnProperty(h) && (i.options[h] = l[h])
                } else {
                    var c = t.extend({}, n.DEFAULTS, t.fn.selectpicker.defaults || {}, e.data(), l);
                    e.data("selectpicker", i = new n(this, c, r))
                }
                "string" == typeof o && (a = i[o] instanceof Function ? i[o].apply(i, s) : i.options[o])
            }
        });
        return "undefined" != typeof a ? a : l
    }
    String.prototype.includes || ! function() {
        var t = {}.toString,
            e = function() {
                try {
                    var t = {},
                        e = Object.defineProperty,
                        i = e(t, t, t) && e
                } catch (s) {}
                return i
            }(),
            i = "".indexOf,
            s = function(e) {
                if (null == this) throw TypeError();
                var s = String(this);
                if (e && "[object RegExp]" == t.call(e)) throw TypeError();
                var n = s.length,
                    o = String(e),
                    r = o.length,
                    a = arguments.length > 1 ? arguments[1] : void 0,
                    l = a ? Number(a) : 0;
                l != l && (l = 0);
                var h = Math.min(Math.max(l, 0), n);
                return r + h > n ? !1 : -1 != i.call(s, o, l)
            };
        e ? e(String.prototype, "includes", {
            value: s,
            configurable: !0,
            writable: !0
        }) : String.prototype.includes = s
    }(), String.prototype.startsWith || ! function() {
        var t = function() {
                try {
                    var t = {},
                        e = Object.defineProperty,
                        i = e(t, t, t) && e
                } catch (s) {}
                return i
            }(),
            e = {}.toString,
            i = function(t) {
                if (null == this) throw TypeError();
                var i = String(this);
                if (t && "[object RegExp]" == e.call(t)) throw TypeError();
                var s = i.length,
                    n = String(t),
                    o = n.length,
                    r = arguments.length > 1 ? arguments[1] : void 0,
                    a = r ? Number(r) : 0;
                a != a && (a = 0);
                var l = Math.min(Math.max(a, 0), s);
                if (o + l > s) return !1;
                for (var h = -1; ++h < o;)
                    if (i.charCodeAt(l + h) != n.charCodeAt(h)) return !1;
                return !0
            };
        t ? t(String.prototype, "startsWith", {
            value: i,
            configurable: !0,
            writable: !0
        }) : String.prototype.startsWith = i
    }(), t.expr[":"].icontains = function(e, i, s) {
        var n = t(e),
            o = (n.data("tokens") || n.text()).toUpperCase();
        return o.includes(s[3].toUpperCase())
    }, t.expr[":"].ibegins = function(e, i, s) {
        var n = t(e),
            o = (n.data("tokens") || n.text()).toUpperCase();
        return o.startsWith(s[3].toUpperCase())
    }, t.expr[":"].aicontains = function(e, i, s) {
        var n = t(e),
            o = (n.data("tokens") || n.data("normalizedText") || n.text()).toUpperCase();
        return o.includes(o, s[3])
    }, t.expr[":"].aibegins = function(e, i, s) {
        var n = t(e),
            o = (n.data("tokens") || n.data("normalizedText") || n.text()).toUpperCase();
        return o.startsWith(s[3].toUpperCase())
    };
    var n = function(e, i, s) {
        s && (s.stopPropagation(), s.preventDefault()), this.$element = t(e), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = i, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = n.prototype.val, this.render = n.prototype.render, this.refresh = n.prototype.refresh, this.setStyle = n.prototype.setStyle, this.selectAll = n.prototype.selectAll, this.deselectAll = n.prototype.deselectAll, this.destroy = n.prototype.remove, this.remove = n.prototype.remove, this.show = n.prototype.show, this.hide = n.prototype.hide, this.init()
    };
    n.VERSION = "1.6.4", n.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results matched {0}",
        countSelectedText: function(t) {
            return 1 == t ? "{0} item selected" : "{0} items selected"
        },
        maxOptionsText: function(t, e) {
            return [1 == t ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == e ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        doneButton: !1,
        doneButtonText: "Close",
        multipleSeparator: ", ",
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: !1,
        container: !1,
        hideDisabled: !1,
        showSubtext: !1,
        showIcon: !0,
        showContent: !0,
        dropupAuto: !0,
        header: !1,
        liveSearch: !1,
        liveSearchPlaceholder: null,
        liveSearchNormalize: !1,
        liveSearchStyle: "contains",
        actionsBox: !1,
        iconBase: "glyphicon",
        tickIcon: "glyphicon-ok",
        maxOptions: !1,
        mobile: !1,
        selectOnTab: !1,
        dropdownAlignRight: !1
    }, n.prototype = {
        constructor: n,
        init: function() {
            var e = this,
                i = this.$element.attr("id");
            this.$element.hide(), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$searchbox = this.$menu.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof i && (this.$button.attr("data-id", i), t('label[for="' + i + '"]').click(function(t) {
                t.preventDefault(), e.$button.focus()
            })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.liHeight(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile()
        },
        createDropdown: function() {
            var e = this.multiple ? " show-tick" : "",
                s = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                n = this.autofocus ? " autofocus" : "",
                o = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                r = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + "></div>" : "",
                a = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                l = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                h = '<div class="btn-group bootstrap-select' + e + s + '"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown"' + n + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + o + r + a + '<ul class="dropdown-menu inner" role="menu"></ul>' + l + "</div></div>";
            return t(h)
        },
        createView: function() {
            var t = this.createDropdown(),
                e = this.createLi();
            return t.find("ul").append(e), t
        },
        reloadLi: function() {
            this.destroyLi();
            var t = this.createLi();
            this.$menu.find("ul").append(t)
        },
        destroyLi: function() {
            this.$menu.find("li").remove()
        },
        createLi: function() {
            var s = this,
                n = [],
                o = 0,
                r = function(t, e, i, s) {
                    return "<li" + ("undefined" != typeof i & "" !== i ? ' class="' + i + '"' : "") + ("undefined" != typeof e & null !== e ? ' data-original-index="' + e + '"' : "") + ("undefined" != typeof s & null !== s ? 'data-optgroup="' + s + '"' : "") + ">" + t + "</li>"
                },
                a = function(t, n, o, r) {
                    return '<a tabindex="0"' + ("undefined" != typeof n ? ' class="' + n + '"' : "") + ("undefined" != typeof o ? ' style="' + o + '"' : "") + ' data-normalized-text="' + e(i(t)) + '"' + ("undefined" != typeof r || null !== r ? ' data-tokens="' + r + '"' : "") + ">" + t + '<span class="' + s.options.iconBase + " " + s.options.tickIcon + ' check-mark"></span></a>'
                };
            return this.$element.find("option").each(function(e) {
                var i = t(this),
                    l = i.attr("class") || "",
                    h = i.attr("style"),
                    c = i.data("content") ? i.data("content") : i.html(),
                    d = i.data("tokens") ? i.data("tokens") : null,
                    u = "undefined" != typeof i.data("subtext") ? '<small class="text-muted">' + i.data("subtext") + "</small>" : "",
                    p = "undefined" != typeof i.data("icon") ? '<span class="' + s.options.iconBase + " " + i.data("icon") + '"></span> ' : "",
                    f = i.is(":disabled") || i.parent().is(":disabled");
                if ("" !== p && f && (p = "<span>" + p + "</span>"), i.data("content") || (c = p + '<span class="text">' + c + u + "</span>"), !s.options.hideDisabled || !f)
                    if (i.parent().is("optgroup") && i.data("divider") !== !0) {
                        if (0 === i.index()) {
                            o += 1;
                            var g = i.parent().attr("label"),
                                m = "undefined" != typeof i.parent().data("subtext") ? '<small class="text-muted">' + i.parent().data("subtext") + "</small>" : "",
                                v = i.parent().data("icon") ? '<span class="' + s.options.iconBase + " " + i.parent().data("icon") + '"></span> ' : "";
                            g = v + '<span class="text">' + g + m + "</span>", 0 !== e && n.length > 0 && n.push(r("", null, "divider", o + "div")), n.push(r(g, null, "dropdown-header", o))
                        }
                        n.push(r(a(c, "opt " + l, h, d), e, "", o))
                    } else i.data("divider") === !0 ? n.push(r("", e, "divider")) : i.data("hidden") === !0 ? n.push(r(a(c, l, h, d), e, "hidden is-hidden")) : (i.prev().is("optgroup") && n.push(r("", null, "divider", o + "div")), n.push(r(a(c, l, h, d), e)))
            }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), t(n.join(""))
        },
        findLis: function() {
            return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
        },
        render: function(e) {
            var i = this;
            e !== !1 && this.$element.find("option").each(function(e) {
                i.setDisabled(e, t(this).is(":disabled") || t(this).parent().is(":disabled")), i.setSelected(e, t(this).is(":selected"))
            }), this.tabIndex();
            var s = this.options.hideDisabled ? ":enabled" : "",
                n = this.$element.find("option:selected" + s).map(function() {
                    var e, s = t(this),
                        n = s.data("icon") && i.options.showIcon ? '<i class="' + i.options.iconBase + " " + s.data("icon") + '"></i> ' : "";
                    return e = i.options.showSubtext && s.data("subtext") && !i.multiple ? ' <small class="text-muted">' + s.data("subtext") + "</small>" : "", "undefined" != typeof s.attr("title") ? s.attr("title") : s.data("content") && i.options.showContent ? s.data("content") : n + s.html() + e
                }).toArray(),
                o = this.multiple ? n.join(this.options.multipleSeparator) : n[0];
            if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                var r = this.options.selectedTextFormat.split(">");
                if (r.length > 1 && n.length > r[1] || 1 == r.length && n.length >= 2) {
                    s = this.options.hideDisabled ? ", [disabled]" : "";
                    var a = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + s).length,
                        l = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(n.length, a) : this.options.countSelectedText;
                    o = l.replace("{0}", n.length.toString()).replace("{1}", a.toString())
                }
            }
            void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (o = this.options.title), o || (o = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", t.trim(o.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(o)
        },
        setStyle: function(t, e) {
            this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi, ""));
            var i = t ? t : this.options.style;
            "add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i))
        },
        liHeight: function() {
            if (this.options.size !== !1) {
                var t = this.$menu.parent().clone().children(".dropdown-toggle").prop("autofocus", !1).end().appendTo("body"),
                    e = t.addClass("open").children(".dropdown-menu"),
                    i = e.find("li").not(".divider, .dropdown-header").filter(":visible").children("a").outerHeight(),
                    s = this.options.header ? e.find(".popover-title").outerHeight() : 0,
                    n = this.options.liveSearch ? e.find(".bs-searchbox").outerHeight() : 0,
                    o = this.options.actionsBox ? e.find(".bs-actionsbox").outerHeight() : 0,
                    r = this.multiple ? e.find(".bs-donebutton").outerHeight() : 0;
                t.remove(), this.$newElement.data("liHeight", i).data("headerHeight", s).data("searchHeight", n).data("actionsHeight", o).data("doneButtonHeight", r)
            }
        },
        setSize: function() {
            this.findLis();
            var e, i, s, n = this,
                o = this.$menu,
                r = o.children(".inner"),
                a = this.$newElement.outerHeight(),
                l = this.$newElement.data("liHeight"),
                h = this.$newElement.data("headerHeight"),
                c = this.$newElement.data("searchHeight"),
                d = this.$newElement.data("actionsHeight"),
                u = this.$newElement.data("doneButtonHeight"),
                p = this.$lis.filter(".divider").outerHeight(!0),
                f = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom")) + parseInt(o.css("border-top-width")) + parseInt(o.css("border-bottom-width")),
                g = this.options.hideDisabled ? ".disabled" : "",
                m = t(window),
                v = f + parseInt(o.css("margin-top")) + parseInt(o.css("margin-bottom")) + 2,
                y = function() {
                    i = n.$newElement.offset().top - m.scrollTop(), s = m.height() - i - a
                };
            if (y(), this.options.header && o.css("padding-top", 0), "auto" == this.options.size) {
                var x = function() {
                    var t, a = n.$lis.not(".hidden");
                    y(), e = s - v, n.options.dropupAuto && n.$newElement.toggleClass("dropup", i > s && e - v < o.height()), n.$newElement.hasClass("dropup") && (e = i - v), t = a.length + a.filter(".dropdown-header").length > 3 ? 3 * l + v - 2 : 0, o.css({
                        "max-height": e + "px",
                        overflow: "hidden",
                        "min-height": t + h + c + d + u + "px"
                    }), r.css({
                        "max-height": e - h - c - d - u - f + "px",
                        "overflow-y": "auto",
                        "min-height": Math.max(t - f, 0) + "px"
                    })
                };
                x(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", x), m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", x)
            } else if (this.options.size && "auto" != this.options.size && o.find("li").not(g).length > this.options.size) {
                var b = this.$lis.not(".divider").not(g).children().slice(0, this.options.size).last().parent().index(),
                    w = this.$lis.slice(0, b + 1).filter(".divider").length;
                e = l * this.options.size + w * p + f, n.options.dropupAuto && this.$newElement.toggleClass("dropup", i > s && e < o.height()), o.css({
                    "max-height": e + h + c + d + u + "px",
                    overflow: "hidden"
                }), r.css({
                    "max-height": e - f + "px",
                    "overflow-y": "auto"
                })
            }
        },
        setWidth: function() {
            if ("auto" == this.options.width) {
                this.$menu.css("min-width", "0");
                var t = this.$newElement.clone().appendTo("body"),
                    e = t.children(".dropdown-menu").css("width"),
                    i = t.css("width", "auto").children("button").css("width");
                t.remove(), this.$newElement.css("width", Math.max(parseInt(e), parseInt(i)) + "px")
            } else "fit" == this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
            this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
        },
        selectPosition: function() {
            var e, i, s = this,
                n = "<div />",
                o = t(n),
                r = function(t) {
                    o.addClass(t.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", t.hasClass("dropup")), e = t.offset(), i = t.hasClass("dropup") ? 0 : t[0].offsetHeight, o.css({
                        top: e.top + i,
                        left: e.left,
                        width: t[0].offsetWidth,
                        position: "absolute"
                    })
                };
            this.$newElement.on("click", function() {
                s.isDisabled() || (r(t(this)), o.appendTo(s.options.container), o.toggleClass("open", !t(this).hasClass("open")), o.append(s.$menu))
            }), t(window).on("resize scroll", function() {
                r(s.$newElement)
            }), t("html").on("click", function(e) {
                t(e.target).closest(s.$newElement).length < 1 && o.removeClass("open")
            })
        },
        setSelected: function(t, e) {
            this.findLis(), this.$lis.filter('[data-original-index="' + t + '"]').toggleClass("selected", e)
        },
        setDisabled: function(t, e) {
            this.findLis(), e ? this.$lis.filter('[data-original-index="' + t + '"]').addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : this.$lis.filter('[data-original-index="' + t + '"]').removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
        },
        isDisabled: function() {
            return this.$element.is(":disabled")
        },
        checkDisabled: function() {
            var t = this;
            this.isDisabled() ? this.$button.addClass("disabled").attr("tabindex", -1) : (this.$button.hasClass("disabled") && this.$button.removeClass("disabled"), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
                return !t.isDisabled()
            })
        },
        tabIndex: function() {
            this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
        },
        clickListener: function() {
            var e = this;
            this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(t) {
                t.stopPropagation()
            }), this.$newElement.on("click", function() {
                e.setSize(), e.options.liveSearch || e.multiple || setTimeout(function() {
                    e.$menu.find(".selected a").focus()
                }, 10)
            }), this.$menu.on("click", "li a", function(i) {
                var s = t(this),
                    n = s.parent().data("originalIndex"),
                    o = e.$element.val(),
                    r = e.$element.prop("selectedIndex");
                if (e.multiple && i.stopPropagation(), i.preventDefault(), !e.isDisabled() && !s.parent().hasClass("disabled")) {
                    var a = e.$element.find("option"),
                        l = a.eq(n),
                        h = l.prop("selected"),
                        c = l.parent("optgroup"),
                        d = e.options.maxOptions,
                        u = c.data("maxOptions") || !1;
                    if (e.multiple) {
                        if (l.prop("selected", !h), e.setSelected(n, !h), s.blur(), d !== !1 || u !== !1) {
                            var p = d < a.filter(":selected").length,
                                f = u < c.find("option:selected").length;
                            if (d && p || u && f)
                                if (d && 1 == d) a.prop("selected", !1), l.prop("selected", !0), e.$menu.find(".selected").removeClass("selected"), e.setSelected(n, !0);
                                else if (u && 1 == u) {
                                c.find("option:selected").prop("selected", !1), l.prop("selected", !0);
                                var g = s.data("optgroup");
                                e.$menu.find(".selected").has('a[data-optgroup="' + g + '"]').removeClass("selected"), e.setSelected(n, !0)
                            } else {
                                var m = "function" == typeof e.options.maxOptionsText ? e.options.maxOptionsText(d, u) : e.options.maxOptionsText,
                                    v = m[0].replace("{n}", d),
                                    y = m[1].replace("{n}", u),
                                    x = t('<div class="notify"></div>');
                                m[2] && (v = v.replace("{var}", m[2][d > 1 ? 0 : 1]), y = y.replace("{var}", m[2][u > 1 ? 0 : 1])), l.prop("selected", !1), e.$menu.append(x), d && p && (x.append(t("<div>" + v + "</div>")), e.$element.trigger("maxReached.bs.select")), u && f && (x.append(t("<div>" + y + "</div>")), e.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                    e.setSelected(n, !1)
                                }, 10), x.delay(750).fadeOut(300, function() {
                                    t(this).remove()
                                })
                            }
                        }
                    } else a.prop("selected", !1), l.prop("selected", !0), e.$menu.find(".selected").removeClass("selected"), e.setSelected(n, !0);
                    e.multiple ? e.options.liveSearch && e.$searchbox.focus() : e.$button.focus(), (o != e.$element.val() && e.multiple || r != e.$element.prop("selectedIndex") && !e.multiple) && e.$element.change()
                }
            }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(t) {
                t.currentTarget == this && (t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus())
            }), this.$menu.on("click", "li.divider, li.dropdown-header", function(t) {
                t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus()
            }), this.$menu.on("click", ".popover-title .close", function() {
                e.$button.focus()
            }), this.$searchbox.on("click", function(t) {
                t.stopPropagation()
            }), this.$menu.on("click", ".actions-btn", function(i) {

                e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(), i.preventDefault(), i.stopPropagation(), t(this).hasClass("bs-select-all") ? e.selectAll() : e.deselectAll(), e.$element.change()
            }), this.$element.change(function() {
                e.render(!1)
            })
        },
        liveSearchListener: function() {
            var s = this,
                n = t('<li class="no-results"></li>');
            this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                s.$menu.find(".active").removeClass("active"), s.$searchbox.val() && (s.$searchbox.val(""), s.$lis.not(".is-hidden").removeClass("hidden"), n.parent().length && n.remove()), s.multiple || s.$menu.find(".selected").addClass("active"), setTimeout(function() {
                    s.$searchbox.focus()
                }, 10)
            }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(t) {
                t.stopPropagation()
            }), this.$searchbox.on("input propertychange", function() {
                if (s.$searchbox.val()) {
                    var o = s.$lis.not(".is-hidden").removeClass("hidden").children("a");
                    o = o.not(s.options.liveSearchNormalize ? ":a" + s._searchStyle() + "(" + e(s.$searchbox.val()) + ")" : ":" + s._searchStyle() + "(" + s.$searchbox.val() + ")"), o.parent().addClass("hidden"), s.$lis.filter(".dropdown-header").each(function() {
                        var e = t(this),
                            i = e.data("optgroup");
                        0 === s.$lis.filter("[data-optgroup=" + i + "]").not(e).not(".hidden").length && (e.addClass("hidden"), s.$lis.filter("[data-optgroup=" + i + "div]").addClass("hidden"))
                    });
                    var r = s.$lis.not(".hidden");
                    r.each(function(e) {
                        var i = t(this);
                        i.hasClass("divider") && (i.index() === r.eq(0).index() || i.index() === r.last().index() || r.eq(e + 1).hasClass("divider")) && i.addClass("hidden")
                    }), s.$lis.not(".hidden, .no-results").length ? n.parent().length && n.remove() : (n.parent().length && n.remove(), n.html(s.options.noneResultsText.replace("{0}", '"' + i(s.$searchbox.val()) + '"')).show(), s.$menu.append(n))
                } else s.$lis.not(".is-hidden").removeClass("hidden"), n.parent().length && n.remove();
                s.$lis.filter(".active").removeClass("active"), s.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), t(this).focus()
            })
        },
        _searchStyle: function() {
            var t = "icontains";
            switch (this.options.liveSearchStyle) {
                case "begins":
                case "startsWith":
                    t = "ibegins";
                    break;
                case "contains":
            }
            return t
        },
        val: function(t) {
            return "undefined" != typeof t ? (this.$element.val(t), this.render(), this.$element) : this.$element.val()
        },
        selectAll: function() {
            this.findLis(), this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", !0), this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").addClass("selected"), this.render(!1)
        },
        deselectAll: function() {
            this.findLis(), this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", !1), this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").removeClass("selected"), this.render(!1)
        },
        keydown: function(i) {
            var s, n, o, r, a, l, h, c, d, u = t(this),
                p = u.is("input") ? u.parent().parent() : u.parent(),
                f = p.data("this"),
                g = {
                    32: " ",
                    48: "0",
                    49: "1",
                    50: "2",
                    51: "3",
                    52: "4",
                    53: "5",
                    54: "6",
                    55: "7",
                    56: "8",
                    57: "9",
                    59: ";",
                    65: "a",
                    66: "b",
                    67: "c",
                    68: "d",
                    69: "e",
                    70: "f",
                    71: "g",
                    72: "h",
                    73: "i",
                    74: "j",
                    75: "k",
                    76: "l",
                    77: "m",
                    78: "n",
                    79: "o",
                    80: "p",
                    81: "q",
                    82: "r",
                    83: "s",
                    84: "t",
                    85: "u",
                    86: "v",
                    87: "w",
                    88: "x",
                    89: "y",
                    90: "z",
                    96: "0",
                    97: "1",
                    98: "2",
                    99: "3",
                    100: "4",
                    101: "5",
                    102: "6",
                    103: "7",
                    104: "8",
                    105: "9"
                };
            if (f.options.liveSearch && (p = u.parent().parent()), f.options.container && (p = f.$menu), s = t("[role=menu] li a", p), d = f.$menu.parent().hasClass("open"), !d && /([0-9]|[A-z])/.test(String.fromCharCode(i.keyCode)) && (f.options.container ? f.$newElement.trigger("click") : (f.setSize(), f.$menu.parent().addClass("open"), d = !0), f.$searchbox.focus()), f.options.liveSearch && (/(^9$|27)/.test(i.keyCode.toString(10)) && d && 0 === f.$menu.find(".active").length && (i.preventDefault(), f.$menu.parent().removeClass("open"), f.$button.focus()), s = t("[role=menu] li:not(.divider):not(.dropdown-header):visible a", p), u.val() || /(38|40)/.test(i.keyCode.toString(10)) || 0 === s.filter(".active").length && (s = f.$newElement.find("li a"), s = s.filter(f.options.liveSearchNormalize ? ":a" + f._searchStyle() + "(" + e(g[i.keyCode]) + ")" : ":" + f._searchStyle() + "(" + g[i.keyCode] + ")"))), s.length) {
                if (/(38|40)/.test(i.keyCode.toString(10))) n = s.index(s.filter(":focus")), r = s.parent(":not(.disabled):visible").first().index(), a = s.parent(":not(.disabled):visible").last().index(), o = s.eq(n).parent().nextAll(":not(.disabled):visible").eq(0).index(), l = s.eq(n).parent().prevAll(":not(.disabled):visible").eq(0).index(), h = s.eq(o).parent().prevAll(":not(.disabled):visible").eq(0).index(), f.options.liveSearch && (s.each(function(e) {
                    t(this).hasClass("disabled") || t(this).data("index", e)
                }), n = s.index(s.filter(".active")), r = s.filter(":not(.disabled):visible").first().data("index"), a = s.filter(":not(.disabled):visible").last().data("index"), o = s.eq(n).nextAll(":not(.disabled):visible").eq(0).data("index"), l = s.eq(n).prevAll(":not(.disabled):visible").eq(0).data("index"), h = s.eq(o).prevAll(":not(.disabled):visible").eq(0).data("index")), c = u.data("prevIndex"), 38 == i.keyCode ? (f.options.liveSearch && (n -= 1), n != h && n > l && (n = l), r > n && (n = r), n == c && (n = a)) : 40 == i.keyCode && (f.options.liveSearch && (n += 1), -1 == n && (n = 0), n != h && o > n && (n = o), n > a && (n = a), n == c && (n = r)), u.data("prevIndex", n), f.options.liveSearch ? (i.preventDefault(), u.hasClass("dropdown-toggle") || (s.removeClass("active"), s.eq(n).addClass("active").children("a").focus(), u.focus())) : s.eq(n).focus();
                else if (!u.is("input")) {
                    var m, v, y = [];
                    s.each(function() {
                        t(this).parent().hasClass("disabled") || t.trim(t(this).text().toLowerCase()).substring(0, 1) == g[i.keyCode] && y.push(t(this).parent().index())
                    }), m = t(document).data("keycount"), m++, t(document).data("keycount", m), v = t.trim(t(":focus").text().toLowerCase()).substring(0, 1), v != g[i.keyCode] ? (m = 1, t(document).data("keycount", m)) : m >= y.length && (t(document).data("keycount", 0), m > y.length && (m = 1)), s.eq(y[m - 1]).focus()
                }
                if ((/(13|32)/.test(i.keyCode.toString(10)) || /(^9$)/.test(i.keyCode.toString(10)) && f.options.selectOnTab) && d) {
                    if (/(32)/.test(i.keyCode.toString(10)) || i.preventDefault(), f.options.liveSearch) /(32)/.test(i.keyCode.toString(10)) || (f.$menu.find(".active a").click(), u.focus());
                    else {
                        var x = t(":focus");
                        x.click(), x.focus(), i.preventDefault()
                    }
                    t(document).data("keycount", 0)
                }(/(^9$|27)/.test(i.keyCode.toString(10)) && d && (f.multiple || f.options.liveSearch) || /(27)/.test(i.keyCode.toString(10)) && !d) && (f.$menu.parent().removeClass("open"), f.$button.focus())
            }
        },
        mobile: function() {
            this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
        },
        refresh: function() {
            this.$lis = null, this.reloadLi(), this.render(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
        },
        hide: function() {
            this.$newElement.hide()
        },
        show: function() {
            this.$newElement.show()
        },
        remove: function() {
            this.$newElement.remove(), this.$element.remove()
        }
    };
    var o = t.fn.selectpicker;
    t.fn.selectpicker = s, t.fn.selectpicker.Constructor = n, t.fn.selectpicker.noConflict = function() {
        return t.fn.selectpicker = o, this
    }, t(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", n.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", function(t) {
        t.stopPropagation()
    }), t(window).on("load.bs.select.data-api", function() {
        t(".selectpicker").each(function() {
            var e = t(this);
            s.call(e, e.data())
        })
    })
}(jQuery),
function(t) {
    t.fn.mask = function(e, i) {
        t(this).each(function() {
            if (void 0 !== i && i > 0) {
                var s = t(this);
                s.data("_mask_timeout", setTimeout(function() {
                    t.maskElement(s, e)
                }, i))
            } else t.maskElement(t(this), e)
        })
    }, t.fn.unmask = function() {
        t(this).each(function() {
            t.unmaskElement(t(this))
        })
    }, t.fn.isMasked = function() {
        return this.hasClass("masked")
    }, t.maskElement = function(e, i) {
        void 0 !== e.data("_mask_timeout") && (clearTimeout(e.data("_mask_timeout")), e.removeData("_mask_timeout")), e.isMasked() && t.unmaskElement(e), "static" == e.css("position") && e.addClass("masked-relative"), e.addClass("masked");
        var s = t('<div class="loadmask"></div>');
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1 && (s.height(e.height() + parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom"))), s.width(e.width() + parseInt(e.css("padding-left")) + parseInt(e.css("padding-right")))), navigator.userAgent.toLowerCase().indexOf("msie 6") > -1 && e.find("select").addClass("masked-hidden"), e.append(s), void 0 !== i) {
            var n = t('<div class="loadmask-msg" style="display:none;"></div>');
            n.append("<div>" + i + "</div>"), e.append(n), n.css("top", Math.round(e.height() / 2 - (n.height() - parseInt(n.css("padding-top")) - parseInt(n.css("padding-bottom"))) / 2) + "px"), n.css("left", Math.round(e.width() / 2 - (n.width() - parseInt(n.css("padding-left")) - parseInt(n.css("padding-right"))) / 2) + "px"), n.show()
        }
    }, t.unmaskElement = function(t) {
        void 0 !== t.data("_mask_timeout") && (clearTimeout(t.data("_mask_timeout")), t.removeData("_mask_timeout")), t.find(".loadmask-msg,.loadmask").remove(), t.removeClass("masked"), t.removeClass("masked-relative"), t.find("select").removeClass("masked-hidden")
    }
}(jQuery),
function(t) {
    t.fn.bindWithDelay = function(e, i, s, n, o) {
        return t.isFunction(i) && (o = n, n = s, s = i, i = void 0), s.guid = s.guid || t.guid && t.guid++, this.each(function() {
            function r() {
                var e = t.extend(!0, {}, arguments[0]),
                    i = this,
                    r = function() {
                        a = null, s.apply(i, [e])
                    };
                o || (clearTimeout(a), a = null), a || (a = setTimeout(r, n))
            }
            var a = null;
            r.guid = s.guid, t(this).bind(e, i, r)
        })
    }
}(jQuery),
function(t, e) {
    var i, s, n, o, r, a, l, h, c, d, u, p, f, g, m, v, y, x, b, w, k, C, S, T;
    i = function(t) {
            return new i.prototype.init(t)
        }, "undefined" != typeof require && "undefined" != typeof exports && "undefined" != typeof module ? module.exports = i : t.Globalize = i, i.cultures = {}, i.prototype = {
            constructor: i,
            init: function(t) {
                return this.cultures = i.cultures, this.cultureSelector = t, this
            }
        }, i.prototype.init.prototype = i.prototype, i.cultures["default"] = {
            name: "en",
            englishName: "English",
            nativeName: "English",
            isRTL: !1,
            language: "en",
            numberFormat: {
                pattern: ["-n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSizes: [3],
                "+": "+",
                "-": "-",
                NaN: "NaN",
                negativeInfinity: "-Infinity",
                positiveInfinity: "Infinity",
                percent: {
                    pattern: ["-n %", "n %"],
                    decimals: 2,
                    groupSizes: [3],
                    ",": ",",
                    ".": ".",
                    symbol: "%"
                },
                currency: {
                    pattern: ["($n)", "$n"],
                    decimals: 2,
                    groupSizes: [3],
                    ",": ",",
                    ".": ".",
                    symbol: "$"
                }
            },
            calendars: {
                standard: {
                    name: "Gregorian_USEnglish",
                    "/": "/",
                    ":": ":",
                    firstDay: 0,
                    days: {
                        names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                    },
                    months: {
                        names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                        namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                    },
                    AM: ["AM", "am", "AM"],
                    PM: ["PM", "pm", "PM"],
                    eras: [{
                        name: "A.D.",
                        start: null,
                        offset: 0
                    }],
                    twoDigitYearMax: 2029,
                    patterns: {
                        d: "M/d/yyyy",
                        D: "dddd, MMMM dd, yyyy",
                        t: "h:mm tt",
                        T: "h:mm:ss tt",
                        f: "dddd, MMMM dd, yyyy h:mm tt",
                        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                        M: "MMMM dd",
                        Y: "yyyy MMMM",
                        S: "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
                    }
                }
            },
            messages: {}
        }, i.cultures["default"].calendar = i.cultures["default"].calendars.standard, i.cultures.en = i.cultures["default"], i.cultureSelector = "en", s = /^0x[a-f0-9]+$/i, n = /^[+-]?infinity$/i, o = /^[+-]?\d*\.?\d*(e[+-]?\d+)?$/, r = /^\s+|\s+$/g, a = function(t, e) {
            if (t.indexOf) return t.indexOf(e);
            for (var i = 0, s = t.length; s > i; i++)
                if (t[i] === e) return i;
            return -1
        }, l = function(t, e) {
            return t.substr(t.length - e.length) === e
        }, h = function(t) {
            var i, s, n, o, r, a = arguments[0] || {},
                l = 1,
                p = arguments.length,
                t = !1;
            for ("boolean" == typeof a && (t = a, a = arguments[1] || {}, l = 2), "object" != typeof a && !d(a) && (a = {}); p > l; l++)
                if (null != (i = arguments[l]))
                    for (s in i) n = a[s], o = i[s], a !== o && (t && o && (u(o) || (r = c(o))) ? (r ? (r = !1, n = n && c(n) ? n : []) : n = n && u(n) ? n : {}, a[s] = h(t, n, o)) : o !== e && (a[s] = o));
            return a
        }, c = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }, d = function(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }, u = function(t) {
            return "[object Object]" === Object.prototype.toString.call(t)
        }, p = function(t, e) {
            return 0 === t.indexOf(e)
        }, f = function(t) {
            return (t + "").replace(r, "")
        }, g = function(t) {
            return 0 | t
        }, m = function(t, e, i) {
            var s;
            for (s = t.length; e > s; s += 1) t = i ? "0" + t : t + "0";
            return t
        }, v = function(t, e) {
            for (var i = 0, s = !1, n = 0, o = t.length; o > n; n++) {
                var r = t.charAt(n);
                switch (r) {
                    case "'":
                        s ? e.push("'") : i++, s = !1;
                        break;
                    case "\\":
                        s && e.push("\\"), s = !s;
                        break;
                    default:
                        e.push(r), s = !1
                }
            }
            return i
        }, y = function(t, e) {
            var i, e = e || "F";
            i = t.patterns;
            var s = e.length;
            if (1 === s) {
                if (i = i[e], !i) throw "Invalid date format string '" + e + "'.";
                e = i
            } else 2 === s && "%" === e.charAt(0) && (e = e.charAt(1));
            return e
        }, x = function(t, e, i) {
            function s(t, e) {
                var i;
                return i = t + "", e > 1 && i.length < e ? (i = f[e - 2] + i, i.substr(i.length - e, e)) : i
            }

            function n() {
                return c || d ? c : (c = g.test(e), d = !0, c)
            }

            function o(t, e) {
                if (u) return u[e];
                switch (e) {
                    case 0:
                        return t.getFullYear();
                    case 1:
                        return t.getMonth();
                    case 2:
                        return t.getDate()
                }
            }
            var r = i.calendar,
                a = r.convert;
            if (!e || !e.length || "i" === e) {
                if (i && i.name.length)
                    if (a) i = x(t, r.patterns.F, i);
                    else {
                        var i = new Date(t.getTime()),
                            l = k(t, r.eras);
                        i.setFullYear(C(t, r, l)), i = i.toLocaleString()
                    }
                else i = t.toString();
                return i
            }
            var h, c, d, u, l = r.eras,
                p = "s" === e,
                e = y(r, e),
                i = [],
                f = ["0", "00", "000"],
                g = /([^d]|^)(d|dd)([^d]|$)/g,
                m = 0,
                b = w();
            for (!p && a && (u = a.fromGregorian(t)); h = b.lastIndex, a = b.exec(e), h = e.slice(h, a ? a.index : e.length), m += v(h, i), a;)
                if (m % 2) i.push(a[0]);
                else switch (h = a[0], a = h.length, h) {
                    case "ddd":
                    case "dddd":
                        i.push((3 === a ? r.days.namesAbbr : r.days.names)[t.getDay()]);
                        break;
                    case "d":
                    case "dd":
                        c = !0, i.push(s(o(t, 2), a));
                        break;
                    case "MMM":
                    case "MMMM":
                        h = o(t, 1), i.push(r.monthsGenitive && n() ? r.monthsGenitive[3 === a ? "namesAbbr" : "names"][h] : r.months[3 === a ? "namesAbbr" : "names"][h]);
                        break;
                    case "M":
                    case "MM":
                        i.push(s(o(t, 1) + 1, a));
                        break;
                    case "y":
                    case "yy":
                    case "yyyy":
                        h = u ? u[0] : C(t, r, k(t, l), p), 4 > a && (h %= 100), i.push(s(h, a));
                        break;
                    case "h":
                    case "hh":
                        h = t.getHours() % 12, 0 === h && (h = 12), i.push(s(h, a));
                        break;
                    case "H":
                    case "HH":
                        i.push(s(t.getHours(), a));
                        break;
                    case "m":
                    case "mm":
                        i.push(s(t.getMinutes(), a));
                        break;
                    case "s":
                    case "ss":
                        i.push(s(t.getSeconds(), a));
                        break;
                    case "t":
                    case "tt":
                        h = t.getHours() < 12 ? r.AM ? r.AM[0] : " " : r.PM ? r.PM[0] : " ", i.push(1 === a ? h.charAt(0) : h);
                        break;
                    case "f":
                    case "ff":
                    case "fff":
                        i.push(s(t.getMilliseconds(), 3).substr(0, a));
                        break;
                    case "z":
                    case "zz":
                        h = t.getTimezoneOffset() / 60, i.push((0 >= h ? "+" : "-") + s(Math.floor(Math.abs(h)), a));
                        break;
                    case "zzz":
                        h = t.getTimezoneOffset() / 60, i.push((0 >= h ? "+" : "-") + s(Math.floor(Math.abs(h)), 2) + ":" + s(Math.abs(t.getTimezoneOffset() % 60), 2));
                        break;
                    case "g":
                    case "gg":
                        r.eras && i.push(r.eras[k(t, l)].name);
                        break;
                    case "/":
                        i.push(r["/"]);
                        break;
                    default:
                        throw "Invalid date format pattern '" + h + "'."
                }
            return i.join("")
        },
        function() {
            var t;
            t = function(t, e, i) {
                var s = i.groupSizes,
                    n = s[0],
                    o = 1,
                    r = Math.pow(10, e),
                    a = Math.round(t * r) / r;
                for (isFinite(a) || (a = t), r = "", r = (a + "").split(/e/i), a = r.length > 1 ? parseInt(r[1], 10) : 0, t = r[0], r = t.split("."), t = r[0], r = r.length > 1 ? r[1] : "", a > 0 ? (r = m(r, a, !1), t += r.slice(0, a), r = r.substr(a)) : 0 > a && (a = -a, t = m(t, a + 1), r = t.slice(-a, t.length) + r, t = t.slice(0, -a)), r = e > 0 ? i["."] + (r.length > e ? r.slice(0, e) : m(r, e)) : "", e = t.length - 1, i = i[","], a = ""; e >= 0;) {
                    if (0 === n || n > e) return t.slice(0, e + 1) + (a.length ? i + a + r : r);
                    a = t.slice(e - n + 1, e + 1) + (a.length ? i + a : ""), e -= n, o < s.length && (n = s[o], o++)
                }
                return t.slice(0, e + 1) + i + a + r
            }, b = function(e, i, s) {
                if (!isFinite(e)) return 1 / 0 === e ? s.numberFormat.positiveInfinity : e === -1 / 0 ? s.numberFormat.negativeInfinity : s.numberFormat.NaN;
                if (!i || "i" === i) return s.name.length ? e.toLocaleString() : e.toString();
                var i = i || "D",
                    s = s.numberFormat,
                    n = Math.abs(e),
                    o = -1;
                i.length > 1 && (o = parseInt(i.slice(1), 10));
                var r, a = i.charAt(0).toUpperCase();
                switch (a) {
                    case "D":
                        i = "n", n = g(n), -1 !== o && (n = m("" + n, o, !0)), 0 > e && (n = "-" + n);
                        break;
                    case "N":
                        r = s;
                    case "C":
                        r = r || s.currency;
                    case "P":
                        r = r || s.percent, i = 0 > e ? r.pattern[0] : r.pattern[1] || "n", -1 === o && (o = r.decimals), n = t(n * ("P" === a ? 100 : 1), o, r);
                        break;
                    default:
                        throw "Bad number format specifier: " + a
                }
                for (e = /n|\$|-|%/g, r = ""; o = e.lastIndex, a = e.exec(i), r += i.slice(o, a ? a.index : i.length), a;) switch (a[0]) {
                    case "n":
                        r += n;
                        break;
                    case "$":
                        r += s.currency.symbol;
                        break;
                    case "-":
                        /[1-9]/.test(n) && (r += s["-"]);
                        break;
                    case "%":
                        r += s.percent.symbol
                }
                return r
            }
        }(), w = function() {
            return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g
        }, k = function(t, e) {
            if (!e) return 0;
            for (var i, s = t.getTime(), n = 0, o = e.length; o > n; n++)
                if (i = e[n].start, null === i || s >= i) return n;
            return 0
        }, C = function(t, e, i, s) {
            return t = t.getFullYear(), !s && e.eras && (t -= e.eras[i].offset), t
        },
        function() {
            var t, e, i, s, n, o, r;
            t = function(t, e) {
                var i = new Date,
                    s = k(i);
                if (100 > e) {
                    var n = t.twoDigitYearMax,
                        n = "string" == typeof n ? (new Date).getFullYear() % 100 + parseInt(n, 10) : n,
                        i = C(i, t, s);
                    e += i - i % 100, e > n && (e -= 100)
                }
                return e
            }, e = function(t, e, i) {
                var s = t.days,
                    n = t._upperDays;
                return n || (t._upperDays = n = [r(s.names), r(s.namesAbbr), r(s.namesShort)]), e = o(e), i ? (t = a(n[1], e), -1 === t && (t = a(n[2], e))) : t = a(n[0], e), t
            }, i = function(t, e, i) {
                var s = t.months,
                    n = t.monthsGenitive || t.months,
                    l = t._upperMonths,
                    h = t._upperMonthsGen;
                return l || (t._upperMonths = l = [r(s.names), r(s.namesAbbr)], t._upperMonthsGen = h = [r(n.names), r(n.namesAbbr)]), e = o(e), t = a(i ? l[1] : l[0], e), 0 > t && (t = a(i ? h[1] : h[0], e)), t
            }, s = function(t, e) {
                var i = t._parseRegExp;
                if (i) {
                    var s = i[e];
                    if (s) return s
                } else t._parseRegExp = i = {};
                for (var n, s = y(t, e).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"), o = ["^"], r = [], a = 0, l = 0, h = w(); null !== (n = h.exec(s));) {
                    var c = s.slice(a, n.index),
                        a = h.lastIndex;
                    if (l += v(c, o), l % 2) o.push(n[0]);
                    else {
                        var c = n[0],
                            d = c.length;
                        switch (c) {
                            case "dddd":
                            case "ddd":
                            case "MMMM":
                            case "MMM":
                            case "gg":
                            case "g":
                                c = "(\\D+)";
                                break;
                            case "tt":
                            case "t":
                                c = "(\\D*)";
                                break;
                            case "yyyy":
                            case "fff":
                            case "ff":
                            case "f":
                                c = "(\\d{" + d + "})";
                                break;
                            case "dd":
                            case "d":
                            case "MM":
                            case "M":
                            case "yy":
                            case "y":
                            case "HH":
                            case "H":
                            case "hh":
                            case "h":
                            case "mm":
                            case "m":
                            case "ss":
                            case "s":
                                c = "(\\d\\d?)";
                                break;
                            case "zzz":
                                c = "([+-]?\\d\\d?:\\d{2})";
                                break;
                            case "zz":
                            case "z":
                                c = "([+-]?\\d\\d?)";
                                break;
                            case "/":
                                c = "(\\" + t["/"] + ")";
                                break;
                            default:
                                throw "Invalid date format pattern '" + c + "'."
                        }
                        c && o.push(c), r.push(n[0])
                    }
                }
                return v(s.slice(a), o), o.push("$"), s = {
                    regExp: o.join("").replace(/\s+/g, "\\s+"),
                    groups: r
                }, i[e] = s
            }, n = function(t, e, i) {
                return e > t || t > i
            }, o = function(t) {
                return t.split(" ").join(" ").toUpperCase()
            }, r = function(t) {
                for (var e = [], i = 0, s = t.length; s > i; i++) e[i] = o(t[i]);
                return e
            }, S = function(o, r, a) {
                var o = f(o),
                    a = a.calendar,
                    r = s(a, r),
                    l = RegExp(r.regExp).exec(o);
                if (null === l) return null;
                var h, c = r.groups,
                    d = r = o = null,
                    u = null,
                    g = null,
                    m = 0,
                    v = 0,
                    y = 0,
                    x = 0;
                h = null;
                for (var b = !1, w = 0, k = c.length; k > w; w++) {
                    var C = l[w + 1];
                    if (C) {
                        var S = c[w],
                            T = S.length,
                            D = parseInt(C, 10);
                        switch (S) {
                            case "dd":
                            case "d":
                                if (u = D, n(u, 1, 31)) return null;
                                break;
                            case "MMM":
                            case "MMMM":
                                if (d = i(a, C, 3 === T), n(d, 0, 11)) return null;
                                break;
                            case "M":
                            case "MM":
                                if (d = D - 1, n(d, 0, 11)) return null;
                                break;
                            case "y":
                            case "yy":
                            case "yyyy":
                                if (r = 4 > T ? t(a, D) : D, n(r, 0, 9999)) return null;
                                break;
                            case "h":
                            case "hh":
                                if (m = D, 12 === m && (m = 0), n(m, 0, 11)) return null;
                                break;
                            case "H":
                            case "HH":
                                if (m = D, n(m, 0, 23)) return null;
                                break;
                            case "m":
                            case "mm":
                                if (v = D, n(v, 0, 59)) return null;
                                break;
                            case "s":
                            case "ss":
                                if (y = D, n(y, 0, 59)) return null;
                                break;
                            case "tt":
                            case "t":
                                if (b = a.PM && (C === a.PM[0] || C === a.PM[1] || C === a.PM[2]), !b && (!a.AM || C !== a.AM[0] && C !== a.AM[1] && C !== a.AM[2])) return null;
                                break;
                            case "f":
                            case "ff":
                            case "fff":
                                if (x = D * Math.pow(10, 3 - T), n(x, 0, 999)) return null;
                                break;
                            case "ddd":
                            case "dddd":
                                if (g = e(a, C, 3 === T), n(g, 0, 6)) return null;
                                break;
                            case "zzz":
                                if (S = C.split(/:/), 2 !== S.length) return null;
                                if (h = parseInt(S[0], 10), n(h, -12, 13)) return null;
                                if (S = parseInt(S[1], 10), n(S, 0, 59)) return null;
                                h = 60 * h + (p(C, "-") ? -S : S);
                                break;
                            case "z":
                            case "zz":
                                if (h = D, n(h, -12, 13)) return null;
                                h *= 60;
                                break;
                            case "g":
                            case "gg":
                                if (!C || !a.eras) return null;
                                for (C = f(C.toLowerCase()), S = 0, T = a.eras.length; T > S; S++)
                                    if (C === a.eras[S].name.toLowerCase()) {
                                        o = S;
                                        break
                                    }
                                if (null === o) return null
                        }
                    }
                }
                if (l = new Date, c = (w = a.convert) ? w.fromGregorian(l)[0] : l.getFullYear(), null === r ? r = c : a.eras && (r += a.eras[o || 0].offset), null === d && (d = 0), null === u && (u = 1), w) {
                    if (l = w.toGregorian(r, d, u), null === l) return null
                } else {
                    if (l.setFullYear(r, d, u), l.getDate() !== u) return null;
                    if (null !== g && l.getDay() !== g) return null
                }
                return b && 12 > m && (m += 12), l.setHours(m, v, y, x), null !== h && (a = l.getMinutes() - (h + l.getTimezoneOffset()), l.setHours(l.getHours() + parseInt(a / 60, 10), a % 60)), l
            }
        }(), T = function(t, e, i) {
            var s, n = e["-"],
                e = e["+"];
            switch (i) {
                case "n -":
                    n = " " + n, e = " " + e;
                case "n-":
                    l(t, n) ? s = ["-", t.substr(0, t.length - n.length)] : l(t, e) && (s = ["+", t.substr(0, t.length - e.length)]);
                    break;
                case "- n":
                    n += " ", e += " ";
                case "-n":
                    p(t, n) ? s = ["-", t.substr(n.length)] : p(t, e) && (s = ["+", t.substr(e.length)]);
                    break;
                case "(n)":
                    p(t, "(") && l(t, ")") && (s = ["-", t.substr(1, t.length - 2)])
            }
            return s || ["", t]
        }, i.prototype.findClosestCulture = function(t) {
            return i.findClosestCulture.call(this, t)
        }, i.prototype.format = function(t, e, s) {
            return i.format.call(this, t, e, s)
        }, i.prototype.localize = function(t, e) {
            return i.localize.call(this, t, e)
        }, i.prototype.parseInt = function(t, e, s) {
            return i.parseInt.call(this, t, e, s)
        }, i.prototype.parseFloat = function(t, e, s) {
            return i.parseFloat.call(this, t, e, s)
        }, i.prototype.culture = function(t) {
            return i.culture.call(this, t)
        }, i.addCultureInfo = function(t, e, i) {
            var s = {},
                n = !1;
            "string" != typeof t ? (i = t, t = this.culture().name, s = this.cultures[t]) : "string" != typeof e ? (i = e, n = null == this.cultures[t], s = this.cultures[t] || this.cultures["default"]) : (n = !0, s = this.cultures[e]), this.cultures[t] = h(!0, {}, s, i), n && (this.cultures[t].calendar = this.cultures[t].calendars.standard)
        }, i.findClosestCulture = function(t) {
            var e;
            if (!t) return this.cultures[this.cultureSelector] || this.cultures["default"];
            if ("string" == typeof t && (t = t.split(",")), c(t)) {
                var i, s, n = this.cultures,
                    o = t,
                    r = o.length,
                    a = [];
                for (s = 0; r > s; s++) t = f(o[s]), t = t.split(";"), i = f(t[0]), 1 === t.length ? t = 1 : (t = f(t[1]), 0 === t.indexOf("q=") ? (t = t.substr(2), t = parseFloat(t), t = isNaN(t) ? 0 : t) : t = 1), a.push({
                    lang: i,
                    pri: t
                });
                for (a.sort(function(t, e) {
                        return t.pri < e.pri ? 1 : -1
                    }), s = 0; r > s; s++)
                    if (i = a[s].lang, e = n[i]) return e;
                for (s = 0; r > s; s++)
                    for (i = a[s].lang;;) {
                        if (o = i.lastIndexOf("-"), -1 === o) break;
                        if (i = i.substr(0, o), e = n[i]) return e
                    }
                for (s = 0; r > s; s++) {
                    i = a[s].lang;
                    for (var l in n)
                        if (o = n[l], o.language == i) return o
                }
            } else if ("object" == typeof t) return t;
            return e || null
        }, i.format = function(t, e, i) {
            return culture = this.findClosestCulture(i), t instanceof Date ? t = x(t, e, culture) : "number" == typeof t && (t = b(t, e, culture)), t
        }, i.localize = function(t, e) {
            return this.findClosestCulture(e).messages[t] || this.cultures["default"].messages.key
        }, i.parseDate = function(t, e, i) {
            var s, n, i = this.findClosestCulture(i);
            if (e) {
                if ("string" == typeof e && (e = [e]), e.length) {
                    n = 0;
                    for (var o = e.length; o > n; n++) {
                        var r = e[n];
                        if (r && (s = S(t, r, i))) break
                    }
                }
            } else
                for (n in e = i.calendar.patterns)
                    if (s = S(t, e[n], i)) break;
            return s || null
        }, i.parseInt = function(t, e, s) {
            return g(i.parseFloat(t, e, s))
        }, i.parseFloat = function(t, e, i) {
            "number" != typeof e && (i = e, e = 10);
            var r = this.findClosestCulture(i),
                i = 0 / 0,
                a = r.numberFormat;
            if (t.indexOf(r.numberFormat.currency.symbol) > -1 && (t = t.replace(r.numberFormat.currency.symbol, ""), t = t.replace(r.numberFormat.currency["."], r.numberFormat["."])), t = f(t), n.test(t)) i = parseFloat(t);
            else if (!e && s.test(t)) i = parseInt(t, 16);
            else {
                r = T(t, a, a.pattern[0]), e = r[0], r = r[1], "" === e && "-n" !== a.pattern[0] && (r = T(t, a, "-n"), e = r[0], r = r[1]);
                var l, e = e || "+",
                    t = r.indexOf("e");
                0 > t && (t = r.indexOf("E")), 0 > t ? (l = r, t = null) : (l = r.substr(0, t), t = r.substr(t + 1));
                var h = a["."],
                    c = l.indexOf(h);
                0 > c ? (r = l, l = null) : (r = l.substr(0, c), l = l.substr(c + h.length)), h = a[","], r = r.split(h).join(""), c = h.replace(/\u00A0/g, " "), h !== c && (r = r.split(c).join("")), e += r, null !== l && (e += "." + l), null !== t && (a = T(t, a, "-n"), e += "e" + (a[0] || "+") + a[1]), o.test(e) && (i = parseFloat(e))
            }
            return i
        }, i.culture = function(t) {
            return "undefined" != typeof t && (this.cultureSelector = t), this.findClosestCulture(t) || this.culture["default"]
        }
}(this),
function(t) {
    var e;
    e = "undefined" != typeof require && "undefined" != typeof exports && "undefined" != typeof module ? require("globalize") : t.Globalize, e.addCultureInfo("en-IN", "default", {
        name: "en-IN",
        englishName: "English (India)",
        nativeName: "English (India)",
        numberFormat: {
            groupSizes: [3, 2],
            percent: {
                groupSizes: [3, 2]
            },
            currency: {
                pattern: ["$ -n", "$ n"],
                groupSizes: [3, 2],
                symbol: "Rs."
            }
        },
        calendars: {
            standard: {
                "/": "-",
                firstDay: 1,
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM"
                }
            }
        }
    })
}(this),
function() {
    function t(t, e) {
        var i;
        t || (t = {});
        for (i in e) t[i] = e[i];
        return t
    }

    function e() {
        var t, e, i = arguments,
            s = {},
            n = function(t, e) {
                var i, s;
                "object" != typeof t && (t = {});
                for (s in e) e.hasOwnProperty(s) && (i = e[s], t[s] = i && "object" == typeof i && "[object Array]" !== Object.prototype.toString.call(i) && "renderTo" !== s && "number" != typeof i.nodeType ? n(t[s] || {}, i) : e[s]);
                return t
            };
        for (i[0] === !0 && (s = i[1], i = Array.prototype.slice.call(i, 2)), e = i.length, t = 0; e > t; t++) s = n(s, i[t]);
        return s
    }

    function i(t, e) {
        return parseInt(t, e || 10)
    }

    function s(t) {
        return "string" == typeof t
    }

    function n(t) {
        return "object" == typeof t
    }

    function o(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    function r(t) {
        return "number" == typeof t
    }

    function a(t) {
        return le.log(t) / le.LN10
    }

    function l(t) {
        return le.pow(10, t)
    }

    function h(t, e) {
        for (var i = t.length; i--;)
            if (t[i] === e) {
                t.splice(i, 1);
                break
            }
    }

    function c(t) {
        return t !== B && null !== t
    }

    function d(t, e, i) {
        var o, r;
        if (s(e)) c(i) ? t.setAttribute(e, i) : t && t.getAttribute && (r = t.getAttribute(e));
        else if (c(e) && n(e))
            for (o in e) t.setAttribute(o, e[o]);
        return r
    }

    function u(t) {
        return o(t) ? t : [t]
    }

    function p() {
        var t, e, i = arguments,
            s = i.length;
        for (t = 0; s > t; t++)
            if (e = i[t], "undefined" != typeof e && null !== e) return e
    }

    function f(e, i) {
        we && !Me && i && i.opacity !== B && (i.filter = "alpha(opacity=" + 100 * i.opacity + ")"), t(e.style, i)
    }

    function g(e, i, s, n, o) {
        return e = re.createElement(e), i && t(e, i), o && f(e, {
            padding: 0,
            border: He,
            margin: 0
        }), s && f(e, s), n && n.appendChild(e), e
    }

    function m(e, i) {
        var s = function() {};
        return s.prototype = new e, t(s.prototype, i), s
    }

    function v(t, e, s, n) {
        var o = W.lang,
            t = +t || 0,
            r = -1 === e ? (t.toString().split(".")[1] || "").length : isNaN(e = fe(e)) ? 2 : e,
            e = void 0 === s ? o.decimalPoint : s,
            n = void 0 === n ? o.thousandsSep : n,
            o = 0 > t ? "-" : "",
            s = String(i(t = fe(t).toFixed(r))),
            a = s.length > 3 ? s.length % 3 : 0;
        return o + (a ? s.substr(0, a) + n : "") + s.substr(a).replace(/(\d{3})(?=\d)/g, "$1" + n) + (r ? e + fe(t - s).toFixed(r).slice(2) : "")
    }

    function y(t, e) {
        return Array((e || 2) + 1 - String(t).length).join(0) + t
    }

    function x(t, e, i) {
        var s = t[e];
        t[e] = function() {
            var t = Array.prototype.slice.call(arguments);
            return t.unshift(s), i.apply(this, t)
        }
    }

    function b(t, e) {
        for (var i, s, n, o, r, a = "{", l = !1, h = []; - 1 !== (a = t.indexOf(a));) {
            if (i = t.slice(0, a), l) {
                for (s = i.split(":"), n = s.shift().split("."), r = n.length, i = e, o = 0; r > o; o++) i = i[n[o]];
                s.length && (s = s.join(":"), n = /\.([0-9])/, o = W.lang, r = void 0, /f$/.test(s) ? (r = (r = s.match(n)) ? r[1] : -1, null !== i && (i = v(i, r, o.decimalPoint, s.indexOf(",") > -1 ? o.thousandsSep : ""))) : i = Y(s, i))
            }
            h.push(i), t = t.slice(a + 1), a = (l = !l) ? "}" : "{"
        }
        return h.push(t), h.join("")
    }

    function w(t) {
        return le.pow(10, ce(le.log(t) / le.LN10))
    }

    function k(t, e, i, s) {
        var n, i = p(i, 1);
        for (n = t / i, e || (e = [1, 2, 2.5, 5, 10], s && s.allowDecimals === !1 && (1 === i ? e = [1, 2, 5, 10] : .1 >= i && (e = [1 / i]))), s = 0; s < e.length && (t = e[s], !(n <= (e[s] + (e[s + 1] || e[s])) / 2)); s++);
        return t *= i
    }

    function C() {
        this.symbol = this.color = 0
    }

    function S(t, e) {
        var i, s, n = t.length;
        for (s = 0; n > s; s++) t[s].ss_i = s;
        for (t.sort(function(t, s) {
                return i = e(t, s), 0 === i ? t.ss_i - s.ss_i : i
            }), s = 0; n > s; s++) delete t[s].ss_i
    }

    function T(t) {
        for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
        return i
    }

    function D(t) {
        for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
        return i
    }

    function M(t, e) {
        for (var i in t) t[i] && t[i] !== e && t[i].destroy && t[i].destroy(), delete t[i]
    }

    function A(t) {
        N || (N = g(_e)), t && N.appendChild(t), N.innerHTML = ""
    }

    function P(t, e) {
        var i = "Highcharts error #" + t + ": www.highcharts.com/errors/" + t;
        if (e) throw i;
        ae.console && console.log(i)
    }

    function L(t) {
        return parseFloat(t.toPrecision(14))
    }

    function I(t, e) {
        G = p(t, e.animation)
    }

    function z() {
        var t = W.global.useUTC,
            e = t ? "getUTC" : "get",
            i = t ? "setUTC" : "set";
        V = 6e4 * (t && W.global.timezoneOffset || 0), j = t ? Date.UTC : function(t, e, i, s, n, o) {
            return new Date(t, e, p(i, 1), p(s, 0), p(n, 0), p(o, 0)).getTime()
        }, q = e + "Minutes", Z = e + "Hours", K = e + "Day", J = e + "Date", Q = e + "Month", te = e + "FullYear", ee = i + "Minutes", ie = i + "Hours", se = i + "Date", ne = i + "Month", oe = i + "FullYear"
    }

    function O() {}

    function E(t, e, i, s) {
        this.axis = t, this.pos = e, this.type = i || "", this.isNew = !0, !i && !s && this.addLabel()
    }

    function _() {
        this.init.apply(this, arguments)
    }

    function H() {
        this.init.apply(this, arguments)
    }

    function F(t, e, i, s, n) {
        var o = t.chart.inverted;
        this.axis = t, this.isNegative = i, this.options = e, this.x = s, this.total = null, this.points = {}, this.stack = n, this.alignOptions = {
            align: e.align || (o ? i ? "left" : "right" : "center"),
            verticalAlign: e.verticalAlign || (o ? "middle" : i ? "bottom" : "top"),
            y: p(e.y, o ? 4 : i ? 14 : -6),
            x: p(e.x, o ? i ? -6 : 6 : 0)
        }, this.textAlign = e.textAlign || (o ? i ? "right" : "left" : "center")
    }
    var B, $, R, N, W, Y, G, U, X, j, V, q, Z, K, J, Q, te, ee, ie, se, ne, oe, re = document,
        ae = window,
        le = Math,
        he = le.round,
        ce = le.floor,
        de = le.ceil,
        ue = le.max,
        pe = le.min,
        fe = le.abs,
        ge = le.cos,
        me = le.sin,
        ve = le.PI,
        ye = 2 * ve / 360,
        xe = navigator.userAgent,
        be = ae.opera,
        we = /msie/i.test(xe) && !be,
        ke = 8 === re.documentMode,
        Ce = /AppleWebKit/.test(xe),
        Se = /Firefox/.test(xe),
        Te = /(Mobile|Android|Windows Phone)/.test(xe),
        De = "http://www.w3.org/2000/svg",
        Me = !!re.createElementNS && !!re.createElementNS(De, "svg").createSVGRect,
        Ae = Se && parseInt(xe.split("Firefox/")[1], 10) < 4,
        Pe = !Me && !we && !!re.createElement("canvas").getContext,
        Le = {},
        Ie = 0,
        ze = function() {},
        Oe = [],
        Ee = 0,
        _e = "div",
        He = "none",
        Fe = /^[0-9]+$/,
        Be = "stroke-width",
        $e = {},
        Re = ae.Highcharts = ae.Highcharts ? P(16, !0) : {};
    Y = function(e, i, s) {
            if (!c(i) || isNaN(i)) return "Invalid date";
            var n, e = p(e, "%Y-%m-%d %H:%M:%S"),
                o = new Date(i - V),
                r = o[Z](),
                a = o[K](),
                l = o[J](),
                h = o[Q](),
                d = o[te](),
                u = W.lang,
                f = u.weekdays,
                o = t({
                    a: f[a].substr(0, 3),
                    A: f[a],
                    d: y(l),
                    e: l,
                    b: u.shortMonths[h],
                    B: u.months[h],
                    m: y(h + 1),
                    y: d.toString().substr(2, 2),
                    Y: d,
                    H: y(r),
                    I: y(r % 12 || 12),
                    l: r % 12 || 12,
                    M: y(o[q]()),
                    p: 12 > r ? "AM" : "PM",
                    P: 12 > r ? "am" : "pm",
                    S: y(o.getSeconds()),
                    L: y(he(i % 1e3), 3)
                }, Re.dateFormats);
            for (n in o)
                for (; - 1 !== e.indexOf("%" + n);) e = e.replace("%" + n, "function" == typeof o[n] ? o[n](i) : o[n]);
            return s ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
        }, C.prototype = {
            wrapColor: function(t) {
                this.color >= t && (this.color = 0)
            },
            wrapSymbol: function(t) {
                this.symbol >= t && (this.symbol = 0)
            }
        }, X = function() {
            for (var t = 0, e = arguments, i = e.length, s = {}; i > t; t++) s[e[t++]] = e[t];
            return s
        }("millisecond", 1, "second", 1e3, "minute", 6e4, "hour", 36e5, "day", 864e5, "week", 6048e5, "month", 26784e5, "year", 31556952e3), U = {
            init: function(t, e, i) {
                var s, n, o, e = e || "",
                    r = t.shift,
                    a = e.indexOf("C") > -1,
                    l = a ? 7 : 3,
                    e = e.split(" "),
                    i = [].concat(i),
                    h = function(t) {
                        for (s = t.length; s--;) "M" === t[s] && t.splice(s + 1, 0, t[s + 1], t[s + 2], t[s + 1], t[s + 2])
                    };
                if (a && (h(e), h(i)), t.isArea && (n = e.splice(e.length - 6, 6), o = i.splice(i.length - 6, 6)), r <= i.length / l && e.length === i.length)
                    for (; r--;) i = [].concat(i).splice(0, l).concat(i);
                if (t.shift = 0, e.length)
                    for (t = i.length; e.length < t;) r = [].concat(e).splice(e.length - l, l), a && (r[l - 6] = r[l - 2], r[l - 5] = r[l - 1]), e = e.concat(r);
                return n && (e = e.concat(n), i = i.concat(o)), [e, i]
            },
            step: function(t, e, i, s) {
                var n = [],
                    o = t.length;
                if (1 === i) n = s;
                else if (o === e.length && 1 > i)
                    for (; o--;) s = parseFloat(t[o]), n[o] = isNaN(s) ? t[o] : i * parseFloat(e[o] - s) + s;
                else n = e;
                return n
            }
        },
        function(e) {
            ae.HighchartsAdapter = ae.HighchartsAdapter || e && {
                init: function(t) {
                    var i, n = e.fx,
                        o = n.step,
                        r = e.Tween,
                        a = r && r.propHooks;
                    i = e.cssHooks.opacity, e.extend(e.easing, {
                        easeOutQuad: function(t, e, i, s, n) {
                            return -s * (e /= n) * (e - 2) + i
                        }
                    }), e.each(["cur", "_default", "width", "height", "opacity"], function(t, e) {
                        var i, s = o;
                        "cur" === e ? s = n.prototype : "_default" === e && r && (s = a[e], e = "set"), (i = s[e]) && (s[e] = function(s) {
                            var n, s = t ? s : this;
                            return "align" !== s.prop ? (n = s.elem, n.attr ? n.attr(s.prop, "cur" === e ? B : s.now) : i.apply(this, arguments)) : void 0
                        })
                    }), x(i, "get", function(t, e, i) {
                        return e.attr ? e.opacity || 0 : t.call(this, e, i)
                    }), i = function(e) {
                        var i, s = e.elem;
                        e.started || (i = t.init(s, s.d, s.toD), e.start = i[0], e.end = i[1], e.started = !0), s.attr("d", t.step(e.start, e.end, e.pos, s.toD))
                    }, r ? a.d = {
                        set: i
                    } : o.d = i, this.each = Array.prototype.forEach ? function(t, e) {
                        return Array.prototype.forEach.call(t, e)
                    } : function(t, e) {
                        for (var i = 0, s = t.length; s > i; i++)
                            if (e.call(t[i], t[i], i, t) === !1) return i
                    }, e.fn.highcharts = function() {
                        var t, e, i = "Chart",
                            n = arguments;
                        return this[0] && (s(n[0]) && (i = n[0], n = Array.prototype.slice.call(n, 1)), t = n[0], t !== B && (t.chart = t.chart || {}, t.chart.renderTo = this[0], new Re[i](t, n[1]), e = this), t === B && (e = Oe[d(this[0], "data-highcharts-chart")])), e
                    }
                },
                getScript: e.getScript,
                inArray: e.inArray,
                adapterRun: function(t, i) {
                    return e(t)[i]()
                },
                grep: e.grep,
                map: function(t, e) {
                    for (var i = [], s = 0, n = t.length; n > s; s++) i[s] = e.call(t[s], t[s], s, t);
                    return i
                },
                offset: function(t) {
                    return e(t).offset()
                },
                addEvent: function(t, i, s) {
                    e(t).bind(i, s)
                },
                removeEvent: function(t, i, s) {
                    var n = re.removeEventListener ? "removeEventListener" : "detachEvent";
                    re[n] && t && !t[n] && (t[n] = function() {}), e(t).unbind(i, s)
                },
                fireEvent: function(i, s, n, o) {
                    var r, a = e.Event(s),
                        l = "detached" + s;
                    !we && n && (delete n.layerX, delete n.layerY, delete n.returnValue), t(a, n), i[s] && (i[l] = i[s], i[s] = null), e.each(["preventDefault", "stopPropagation"], function(t, e) {
                        var i = a[e];
                        a[e] = function() {
                            try {
                                i.call(a)
                            } catch (t) {
                                "preventDefault" === e && (r = !0)
                            }
                        }
                    }), e(i).trigger(a), i[l] && (i[s] = i[l], i[l] = null), o && !a.isDefaultPrevented() && !r && o(a)
                },
                washMouseEvent: function(t) {
                    var e = t.originalEvent || t;
                    return e.pageX === B && (e.pageX = t.pageX, e.pageY = t.pageY), e
                },
                animate: function(t, i, s) {
                    var n = e(t);
                    t.style || (t.style = {}), i.d && (t.toD = i.d, i.d = 1), n.stop(), i.opacity !== B && t.attr && (i.opacity += "px"), n.animate(i, s)
                },
                stop: function(t) {
                    e(t).stop()
                }
            }
        }(ae.jQuery);
    var Ne = ae.HighchartsAdapter,
        We = Ne || {};
    Ne && Ne.init.call(Ne, U);
    var Ye = We.adapterRun,
        Ge = We.getScript,
        Ue = We.inArray,
        Xe = We.each,
        je = We.grep,
        Ve = We.offset,
        qe = We.map,
        Ze = We.addEvent,
        Ke = We.removeEvent,
        Je = We.fireEvent,
        Qe = We.washMouseEvent,
        ti = We.animate,
        ei = We.stop,
        We = {
            enabled: !0,
            x: 0,
            y: 15,
            style: {
                color: "#606060",
                cursor: "default",
                fontSize: "11px"
            }
        };
    W = {
        colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/4.0.1/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/4.0.1/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#3734353",
                fontSize: "18px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#555555"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: e(We, {
                    align: "center",
                    enabled: !1,
                    formatter: function() {
                        return null === this.y ? "" : v(this.y, -1)
                    },
                    verticalAlign: "bottom",
                    y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {
                    hover: {
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1e3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function() {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#3734353",
                fontSize: "12px",
                fontWeight: "bold"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "1em"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: .5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: Me,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: Te ? 25 : 10,
            style: {
                color: "#3734353",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    };
    var ii = W.plotOptions,
        Ne = ii.line;
    z();
    var si = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        ni = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        oi = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        ri = function(t) {
            var s, n, o = [];
            return function(t) {
                t && t.stops ? n = qe(t.stops, function(t) {
                    return ri(t[1])
                }) : (s = si.exec(t)) ? o = [i(s[1]), i(s[2]), i(s[3]), parseFloat(s[4], 10)] : (s = ni.exec(t)) ? o = [i(s[1], 16), i(s[2], 16), i(s[3], 16), 1] : (s = oi.exec(t)) && (o = [i(s[1]), i(s[2]), i(s[3]), 1])
            }(t), {
                get: function(i) {
                    var s;
                    return n ? (s = e(t), s.stops = [].concat(s.stops), Xe(n, function(t, e) {
                        s.stops[e] = [s.stops[e][0], t.get(i)]
                    })) : s = o && !isNaN(o[0]) ? "rgb" === i ? "rgb(" + o[0] + "," + o[1] + "," + o[2] + ")" : "a" === i ? o[3] : "rgba(" + o.join(",") + ")" : t, s
                },
                brighten: function(t) {
                    if (n) Xe(n, function(e) {
                        e.brighten(t)
                    });
                    else if (r(t) && 0 !== t) {
                        var e;
                        for (e = 0; 3 > e; e++) o[e] += i(255 * t), o[e] < 0 && (o[e] = 0), o[e] > 255 && (o[e] = 255)
                    }
                    return this
                },
                rgba: o,
                setOpacity: function(t) {
                    return o[3] = t, this
                }
            }
        };
    O.prototype = {
        init: function(t, e) {
            this.element = "span" === e ? g(e) : re.createElementNS(De, e), this.renderer = t
        },
        opacity: 1,
        animate: function(t, i, s) {
            i = p(i, G, !0), ei(this), i ? (i = e(i, {}), s && (i.complete = s), ti(this, t, i)) : (this.attr(t), s && s())
        },
        colorGradient: function(t, i, s) {
            var n, r, a, l, h, d, u, p, f, g, m = this.renderer,
                v = [];
            if (t.linearGradient ? r = "linearGradient" : t.radialGradient && (r = "radialGradient"), r) {
                a = t[r], l = m.gradients, d = t.stops, f = s.radialReference, o(a) && (t[r] = a = {
                    x1: a[0],
                    y1: a[1],
                    x2: a[2],
                    y2: a[3],
                    gradientUnits: "userSpaceOnUse"
                }), "radialGradient" === r && f && !c(a.gradientUnits) && (a = e(a, {
                    cx: f[0] - f[2] / 2 + a.cx * f[2],
                    cy: f[1] - f[2] / 2 + a.cy * f[2],
                    r: a.r * f[2],
                    gradientUnits: "userSpaceOnUse"
                }));
                for (g in a) "id" !== g && v.push(g, a[g]);
                for (g in d) v.push(d[g]);
                v = v.join(","), l[v] ? t = l[v].attr("id") : (a.id = t = "highcharts-" + Ie++, l[v] = h = m.createElement(r).attr(a).add(m.defs), h.stops = [], Xe(d, function(t) {
                    0 === t[1].indexOf("rgba") ? (n = ri(t[1]), u = n.get("rgb"), p = n.get("a")) : (u = t[1], p = 1), t = m.createElement("stop").attr({
                        offset: t[0],
                        "stop-color": u,
                        "stop-opacity": p
                    }).add(h), h.stops.push(t)
                })), s.setAttribute(i, "url(" + m.url + "#" + t + ")")
            }
        },
        attr: function(t, e) {
            var i, s, n, o, r = this.element,
                a = this;
            if ("string" == typeof t && e !== B && (i = t, t = {}, t[i] = e), "string" == typeof t) a = (this[t + "Getter"] || this._defaultGetter).call(this, t, r);
            else {
                for (i in t) s = t[i], o = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(i) && (n || (this.symbolAttr(t), n = !0), o = !0), !this.rotation || "x" !== i && "y" !== i || (this.doTransform = !0), o || (this[i + "Setter"] || this._defaultSetter).call(this, s, i, r), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(i) && this.updateShadows(i, s);
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            }
            return a
        },
        updateShadows: function(t, e) {
            for (var i = this.shadows, s = i.length; s--;) i[s].setAttribute(t, "height" === t ? ue(e - (i[s].cutHeight || 0), 0) : "d" === t ? this.d : e)
        },
        addClass: function(t) {
            var e = this.element,
                i = d(e, "class") || "";
            return -1 === i.indexOf(t) && d(e, "class", i + " " + t), this
        },
        symbolAttr: function(t) {
            var e = this;
            Xe("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(i) {
                e[i] = p(t[i], e[i])
            }), e.attr({
                d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
            })
        },
        clip: function(t) {
            return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : He)
        },
        crisp: function(t) {
            var e, i, s = {},
                n = t.strokeWidth || this.strokeWidth || this.attr && this.attr("stroke-width") || 0;
            i = he(n) % 2 / 2, t.x = ce(t.x || this.x || 0) + i, t.y = ce(t.y || this.y || 0) + i, t.width = ce((t.width || this.width || 0) - 2 * i), t.height = ce((t.height || this.height || 0) - 2 * i), t.strokeWidth = n;
            for (e in t) this[e] !== t[e] && (this[e] = s[e] = t[e]);
            return s
        },
        css: function(e) {
            var s, n, o = this.styles,
                r = {},
                a = this.element,
                l = "";
            if (s = !o, e && e.color && (e.fill = e.color), o)
                for (n in e) e[n] !== o[n] && (r[n] = e[n], s = !0);
            if (s) {
                if (s = this.textWidth = e && e.width && "text" === a.nodeName.toLowerCase() && i(e.width), o && (e = t(o, r)), this.styles = e, s && (Pe || !Me && this.renderer.forExport) && delete e.width, we && !Me) f(this.element, e);
                else {
                    o = function(t, e) {
                        return "-" + e.toLowerCase()
                    };
                    for (n in e) l += n.replace(/([A-Z])/g, o) + ":" + e[n] + ";";
                    d(a, "style", l)
                }
                s && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function(t, e) {
            var i = this,
                s = i.element;
            return R && "click" === t ? (s.ontouchstart = function(t) {
                i.touchEventFired = Date.now(), t.preventDefault(), e.call(s, t)
            }, s.onclick = function(t) {
                (-1 === xe.indexOf("Android") || Date.now() - (i.touchEventFired || 0) > 1100) && e.call(s, t)
            }) : s["on" + t] = e, this
        },
        setRadialReference: function(t) {
            return this.element.radialReference = t, this
        },
        translate: function(t, e) {
            return this.attr({
                translateX: t,
                translateY: e
            })
        },
        invert: function() {
            return this.inverted = !0, this.updateTransform(), this
        },
        updateTransform: function() {
            var t = this.translateX || 0,
                e = this.translateY || 0,
                i = this.scaleX,
                s = this.scaleY,
                n = this.inverted,
                o = this.rotation,
                r = this.element;
            n && (t += this.attr("width"), e += this.attr("height")), t = ["translate(" + t + "," + e + ")"], n ? t.push("rotate(90) scale(-1,1)") : o && t.push("rotate(" + o + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")"), (c(i) || c(s)) && t.push("scale(" + p(i, 1) + " " + p(s, 1) + ")"), t.length && r.setAttribute("transform", t.join(" "))
        },
        toFront: function() {
            var t = this.element;
            return t.parentNode.appendChild(t), this
        },
        align: function(t, e, i) {
            var n, o, r, a, l = {};
            return o = this.renderer, r = o.alignedObjects, t ? (this.alignOptions = t, this.alignByTranslate = e, (!i || s(i)) && (this.alignTo = n = i || "renderer", h(r, this), r.push(this), i = null)) : (t = this.alignOptions, e = this.alignByTranslate, n = this.alignTo), i = p(i, o[n], o), n = t.align, o = t.verticalAlign, r = (i.x || 0) + (t.x || 0), a = (i.y || 0) + (t.y || 0), ("right" === n || "center" === n) && (r += (i.width - (t.width || 0)) / {
                right: 1,
                center: 2
            }[n]), l[e ? "translateX" : "x"] = he(r), ("bottom" === o || "middle" === o) && (a += (i.height - (t.height || 0)) / ({
                bottom: 1,
                middle: 2
            }[o] || 1)), l[e ? "translateY" : "y"] = he(a), this[this.placed ? "animate" : "attr"](l), this.placed = !0, this.alignAttr = l, this
        },
        getBBox: function() {
            var e, i, s = this.bBox,
                n = this.renderer,
                o = this.rotation;
            e = this.element;
            var r = this.styles,
                a = o * ye;
            i = this.textStr;
            var l;
            if (("" === i || Fe.test(i)) && (l = "num." + i.toString().length + (r ? "|" + r.fontSize + "|" + r.fontFamily : "")), l && (s = n.cache[l]), !s) {
                if (e.namespaceURI === De || n.forExport) {
                    try {
                        s = e.getBBox ? t({}, e.getBBox()) : {
                            width: e.offsetWidth,
                            height: e.offsetHeight
                        }
                    } catch (h) {}(!s || s.width < 0) && (s = {
                        width: 0,
                        height: 0
                    })
                } else s = this.htmlGetBBox();
                n.isSVG && (e = s.width, i = s.height, we && r && "11px" === r.fontSize && "16.9" === i.toPrecision(3) && (s.height = i = 14), o && (s.width = fe(i * me(a)) + fe(e * ge(a)), s.height = fe(i * ge(a)) + fe(e * me(a)))), this.bBox = s, l && (n.cache[l] = s)
            }
            return s
        },
        show: function(t) {
            return t && this.element.namespaceURI === De ? (this.element.removeAttribute("visibility"), this) : this.attr({
                visibility: t ? "inherit" : "visible"
            })
        },
        hide: function() {
            return this.attr({
                visibility: "hidden"
            })
        },
        fadeOut: function(t) {
            var e = this;
            e.animate({
                opacity: 0
            }, {
                duration: t || 150,
                complete: function() {
                    e.hide()
                }
            })
        },
        add: function(t) {
            var e, s, n = this.renderer,
                o = t || n,
                r = o.element || n.box,
                a = this.element,
                l = this.zIndex;
            if (t && (this.parentGroup = t), this.parentInverted = t && t.inverted, void 0 !== this.textStr && n.buildText(this), l && (o.handleZ = !0, l = i(l)), o.handleZ)
                for (t = r.childNodes, e = 0; e < t.length; e++)
                    if (n = t[e], o = d(n, "zIndex"), n !== a && (i(o) > l || !c(l) && c(o))) {
                        r.insertBefore(a, n), s = !0;
                        break
                    }
            return s || r.appendChild(a), this.added = !0, this.onAdd && this.onAdd(), this
        },
        safeRemoveChild: function(t) {
            var e = t.parentNode;
            e && e.removeChild(t)
        },
        destroy: function() {
            var t, e, i = this,
                s = i.element || {},
                n = i.shadows,
                o = i.renderer.isSVG && "SPAN" === s.nodeName && i.parentGroup;
            if (s.onclick = s.onmouseout = s.onmouseover = s.onmousemove = s.point = null, ei(i), i.clipPath && (i.clipPath = i.clipPath.destroy()), i.stops) {
                for (e = 0; e < i.stops.length; e++) i.stops[e] = i.stops[e].destroy();
                i.stops = null
            }
            for (i.safeRemoveChild(s), n && Xe(n, function(t) {
                    i.safeRemoveChild(t)
                }); o && 0 === o.div.childNodes.length;) s = o.parentGroup, i.safeRemoveChild(o.div), delete o.div, o = s;
            i.alignTo && h(i.renderer.alignedObjects, i);
            for (t in i) delete i[t];
            return null
        },
        shadow: function(t, e, i) {
            var s, n, o, r, a, l, h = [],
                c = this.element;
            if (t) {
                for (r = p(t.width, 3), a = (t.opacity || .15) / r, l = this.parentInverted ? "(-1,-1)" : "(" + p(t.offsetX, 1) + ", " + p(t.offsetY, 1) + ")", s = 1; r >= s; s++) n = c.cloneNode(0), o = 2 * r + 1 - 2 * s, d(n, {
                    isShadow: "true",
                    stroke: t.color || "black",
                    "stroke-opacity": a * s,
                    "stroke-width": o,
                    transform: "translate" + l,
                    fill: He
                }), i && (d(n, "height", ue(d(n, "height") - o, 0)), n.cutHeight = o), e ? e.element.appendChild(n) : c.parentNode.insertBefore(n, c), h.push(n);
                this.shadows = h
            }
            return this
        },
        xGetter: function(t) {
            return "circle" === this.element.nodeName && (t = {
                x: "cx",
                y: "cy"
            }[t] || t), this._defaultGetter(t)
        },
        _defaultGetter: function(t) {
            return t = p(this[t], this.element ? this.element.getAttribute(t) : null, 0), /^[0-9\.]+$/.test(t) && (t = parseFloat(t)), t
        },
        dSetter: function(t, e, i) {
            t && t.join && (t = t.join(" ")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), i.setAttribute(e, t), this[e] = t
        },
        dashstyleSetter: function(t) {
            var e;
            if (t = t && t.toLowerCase()) {
                for (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), e = t.length; e--;) t[e] = i(t[e]) * this.element.getAttribute("stroke-width");
                t = t.join(","), this.element.setAttribute("stroke-dasharray", t)
            }
        },
        alignSetter: function(t) {
            this.element.setAttribute("text-anchor", {
                left: "start",
                center: "middle",
                right: "end"
            }[t])
        },
        opacitySetter: function(t, e, i) {
            this[e] = t, i.setAttribute(e, t)
        },
        "stroke-widthSetter": function(t, e, i) {
            0 === t && (t = 1e-5), this.strokeWidth = t, i.setAttribute(e, t)
        },
        titleSetter: function(t) {
            var e = this.element.getElementsByTagName("title")[0];
            e || (e = re.createElementNS(De, "title"), this.element.appendChild(e)), e.textContent = t
        },
        textSetter: function(t) {
            t !== this.textStr && (delete this.bBox, this.textStr = t, this.added && this.renderer.buildText(this))
        },
        fillSetter: function(t, e, i) {
            "string" == typeof t ? i.setAttribute(e, t) : t && this.colorGradient(t, e, i)
        },
        zIndexSetter: function(t, e, i) {
            i.setAttribute(e, t), this[e] = t
        },
        _defaultSetter: function(t, e, i) {
            i.setAttribute(e, t)
        }
    }, O.prototype.yGetter = O.prototype.xGetter, O.prototype.translateXSetter = O.prototype.translateYSetter = O.prototype.rotationSetter = O.prototype.verticalAlignSetter = O.prototype.scaleXSetter = O.prototype.scaleYSetter = function(t, e) {
        this[e] = t, this.doTransform = !0
    }, O.prototype.strokeSetter = O.prototype.fillSetter;
    var ai = function() {
        this.init.apply(this, arguments)
    };
    ai.prototype = {
        Element: O,
        init: function(t, e, i, s, n) {
            var o, r = location,
                s = this.createElement("svg").attr({
                    version: "1.1"
                }).css(this.getStyle(s));
            o = s.element, t.appendChild(o), -1 === t.innerHTML.indexOf("xmlns") && d(o, "xmlns", De), this.isSVG = !0, this.box = o, this.boxWrapper = s, this.alignedObjects = [], this.url = (Se || Ce) && re.getElementsByTagName("base").length ? r.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(re.createTextNode("Created with Highcharts 4.0.1")), this.defs = this.createElement("defs").add(), this.forExport = n, this.gradients = {}, this.cache = {}, this.setSize(e, i, !1);
            var a;
            Se && t.getBoundingClientRect && (this.subPixelFix = e = function() {
                f(t, {
                    left: 0,
                    top: 0
                }), a = t.getBoundingClientRect(), f(t, {
                    left: de(a.left) - a.left + "px",
                    top: de(a.top) - a.top + "px"
                })
            }, e(), Ze(ae, "resize", e))
        },
        getStyle: function(e) {
            return this.style = t({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, e)
        },
        isHidden: function() {
            return !this.boxWrapper.getBBox().width
        },
        destroy: function() {
            var t = this.defs;
            return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), M(this.gradients || {}), this.gradients = null, t && (this.defs = t.destroy()), this.subPixelFix && Ke(ae, "resize", this.subPixelFix), this.alignedObjects = null
        },
        createElement: function(t) {
            var e = new this.Element;
            return e.init(this, t), e
        },
        draw: function() {},
        buildText: function(t) {
            for (var e, s, n = t.element, o = this, r = o.forExport, a = p(t.textStr, "").toString(), l = -1 !== a.indexOf("<"), h = n.childNodes, c = d(n, "x"), u = t.styles, g = t.textWidth, m = u && u.lineHeight, v = h.length, y = function(t) {
                    return m ? i(m) : o.fontMetrics(/(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : u && u.fontSize || o.style.fontSize || 12).h
                }; v--;) n.removeChild(h[v]);
            l || -1 !== a.indexOf(" ") ? (e = /<.*style="([^"]+)".*>/, s = /<.*href="(http[^"]+)".*>/, g && !t.added && this.box.appendChild(n), a = l ? a.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [a], "" === a[a.length - 1] && a.pop(), Xe(a, function(i, a) {
                var l, h = 0,
                    i = i.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                l = i.split("|||"), Xe(l, function(i) {
                    if ("" !== i || 1 === l.length) {
                        var p, m = {},
                            v = re.createElementNS(De, "tspan");
                        if (e.test(i) && (p = i.match(e)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), d(v, "style", p)), s.test(i) && !r && (d(v, "onclick", 'location.href="' + i.match(s)[1] + '"'), f(v, {
                                cursor: "pointer"
                            })), i = (i.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), " " !== i && (v.appendChild(re.createTextNode(i)), h ? m.dx = 0 : a && null !== c && (m.x = c), d(v, m), !h && a && (!Me && r && f(v, {
                                display: "block"
                            }), d(v, "dy", y(v), Ce && v.offsetHeight)), n.appendChild(v), h++, g))
                            for (var x, b, i = i.replace(/([^\^])-/g, "$1- ").split(" "), m = i.length > 1 && "nowrap" !== u.whiteSpace, w = t._clipHeight, k = [], C = y(), S = 1; m && (i.length || k.length);) delete t.bBox, x = t.getBBox(), b = x.width, !Me && o.forExport && (b = o.measureSpanWidth(v.firstChild.data, t.styles)), x = b > g, x && 1 !== i.length ? (v.removeChild(v.firstChild), k.unshift(i.pop())) : (i = k, k = [], i.length && (S++, w && S * C > w ? (i = ["..."], t.attr("title", t.textStr)) : (v = re.createElementNS(De, "tspan"), d(v, {
                                dy: C,
                                x: c
                            }), p && d(v, "style", p), n.appendChild(v), b > g && (g = b)))), i.length && v.appendChild(re.createTextNode(i.join(" ").replace(/- /g, "-")))
                    }
                })
            })) : n.appendChild(re.createTextNode(a))
        },
        button: function(i, s, n, o, r, a, l, h, c) {
            var d, u, p, f, g, m, v = this.label(i, s, n, c, null, null, null, null, "button"),
                y = 0,
                i = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                r = e({
                    "stroke-width": 1,
                    stroke: "#CCCCCC",
                    fill: {
                        linearGradient: i,
                        stops: [
                            [0, "#FEFEFE"],
                            [1, "#F6F6F6"]
                        ]
                    },
                    r: 2,
                    padding: 5,
                    style: {
                        color: "black"
                    }
                }, r);
            return p = r.style, delete r.style, a = e(r, {
                stroke: "#68A",
                fill: {
                    linearGradient: i,
                    stops: [
                        [0, "#FFF"],
                        [1, "#ACF"]
                    ]
                }
            }, a), f = a.style, delete a.style, l = e(r, {
                stroke: "#68A",
                fill: {
                    linearGradient: i,
                    stops: [
                        [0, "#9BD"],
                        [1, "#CDF"]
                    ]
                }
            }, l), g = l.style, delete l.style, h = e(r, {
                style: {
                    color: "#CCC"
                }
            }, h), m = h.style, delete h.style, Ze(v.element, we ? "mouseover" : "mouseenter", function() {
                3 !== y && v.attr(a).css(f)
            }), Ze(v.element, we ? "mouseout" : "mouseleave", function() {
                3 !== y && (d = [r, a, l][y], u = [p, f, g][y], v.attr(d).css(u))
            }), v.setState = function(t) {
                (v.state = y = t) ? 2 === t ? v.attr(l).css(g) : 3 === t && v.attr(h).css(m): v.attr(r).css(p)
            }, v.on("click", function() {
                3 !== y && o.call(v)
            }).attr(r).css(t({
                cursor: "default"
            }, p))
        },
        crispLine: function(t, e) {
            return t[1] === t[4] && (t[1] = t[4] = he(t[1]) - e % 2 / 2), t[2] === t[5] && (t[2] = t[5] = he(t[2]) + e % 2 / 2), t
        },
        path: function(e) {
            var i = {
                fill: He
            };
            return o(e) ? i.d = e : n(e) && t(i, e), this.createElement("path").attr(i)
        },
        circle: function(t, e, i) {
            return t = n(t) ? t : {
                x: t,
                y: e,
                r: i
            }, e = this.createElement("circle"), e.xSetter = function(t) {
                this.element.setAttribute("cx", t)
            }, e.ySetter = function(t) {
                this.element.setAttribute("cy", t)
            }, e.attr(t)
        },
        arc: function(t, e, i, s, o, r) {
            return n(t) && (e = t.y, i = t.r, s = t.innerR, o = t.start, r = t.end, t = t.x), t = this.symbol("arc", t || 0, e || 0, i || 0, i || 0, {
                innerR: s || 0,
                start: o || 0,
                end: r || 0
            }), t.r = i, t
        },
        rect: function(t, e, i, s, o, r) {
            var o = n(t) ? t.r : o,
                a = this.createElement("rect"),
                t = n(t) ? t : t === B ? {} : {
                    x: t,
                    y: e,
                    width: ue(i, 0),
                    height: ue(s, 0)
                };
            return r !== B && (t.strokeWidth = r, t = a.crisp(t)), o && (t.r = o), a.rSetter = function(t) {
                d(this.element, {
                    rx: t,
                    ry: t
                })
            }, a.attr(t)
        },
        setSize: function(t, e, i) {
            var s = this.alignedObjects,
                n = s.length;
            for (this.width = t, this.height = e, this.boxWrapper[p(i, !0) ? "animate" : "attr"]({
                    width: t,
                    height: e
                }); n--;) s[n].align()
        },
        g: function(t) {
            var e = this.createElement("g");
            return c(t) ? e.attr({
                "class": "highcharts-" + t
            }) : e
        },
        image: function(e, i, s, n, o) {
            var r = {
                preserveAspectRatio: He
            };
            return arguments.length > 1 && t(r, {
                x: i,
                y: s,
                width: n,
                height: o
            }), r = this.createElement("image").attr(r), r.element.setAttributeNS ? r.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", e) : r.element.setAttribute("hc-svg-href", e), r
        },
        symbol: function(e, i, s, n, o, r) {
            var a, l, h, c = this.symbols[e],
                c = c && c(he(i), he(s), n, o, r),
                d = /^url\((.*?)\)$/;
            return c ? (a = this.path(c), t(a, {
                symbolName: e,
                x: i,
                y: s,
                width: n,
                height: o
            }), r && t(a, r)) : d.test(e) && (h = function(t, e) {
                t.element && (t.attr({
                    width: e[0],
                    height: e[1]
                }), t.alignByTranslate || t.translate(he((n - e[0]) / 2), he((o - e[1]) / 2)))
            }, l = e.match(d)[1], e = Le[l], a = this.image(l).attr({
                x: i,
                y: s
            }), a.isImg = !0, e ? h(a, e) : (a.attr({
                width: 0,
                height: 0
            }), g("img", {
                onload: function() {
                    h(a, Le[l] = [this.width, this.height])
                },
                src: l
            }))), a
        },
        symbols: {
            circle: function(t, e, i, s) {
                var n = .166 * i;
                return ["M", t + i / 2, e, "C", t + i + n, e, t + i + n, e + s, t + i / 2, e + s, "C", t - n, e + s, t - n, e, t + i / 2, e, "Z"]
            },
            square: function(t, e, i, s) {
                return ["M", t, e, "L", t + i, e, t + i, e + s, t, e + s, "Z"]
            },
            triangle: function(t, e, i, s) {
                return ["M", t + i / 2, e, "L", t + i, e + s, t, e + s, "Z"]
            },
            "triangle-down": function(t, e, i, s) {
                return ["M", t, e, "L", t + i, e, t + i / 2, e + s, "Z"]
            },
            diamond: function(t, e, i, s) {
                return ["M", t + i / 2, e, "L", t + i, e + s / 2, t + i / 2, e + s, t, e + s / 2, "Z"]
            },
            arc: function(t, e, i, s, n) {
                var o = n.start,
                    i = n.r || i || s,
                    r = n.end - .001,
                    s = n.innerR,
                    a = n.open,
                    l = ge(o),
                    h = me(o),
                    c = ge(r),
                    r = me(r),
                    n = n.end - o < ve ? 0 : 1;
                return ["M", t + i * l, e + i * h, "A", i, i, 0, n, 1, t + i * c, e + i * r, a ? "M" : "L", t + s * c, e + s * r, "A", s, s, 0, n, 0, t + s * l, e + s * h, a ? "" : "Z"]
            },
            callout: function(t, e, i, s, n) {
                var o = pe(n && n.r || 0, i, s),
                    r = o + 6,
                    a = n && n.anchorX,
                    l = n && n.anchorY,
                    n = he(n.strokeWidth || 0) % 2 / 2;
                return t += n, e += n, n = ["M", t + o, e, "L", t + i - o, e, "C", t + i, e, t + i, e, t + i, e + o, "L", t + i, e + s - o, "C", t + i, e + s, t + i, e + s, t + i - o, e + s, "L", t + o, e + s, "C", t, e + s, t, e + s, t, e + s - o, "L", t, e + o, "C", t, e, t, e, t + o, e], a && a > i && l > e + r && e + s - r > l ? n.splice(13, 3, "L", t + i, l - 6, t + i + 6, l, t + i, l + 6, t + i, e + s - o) : a && 0 > a && l > e + r && e + s - r > l ? n.splice(33, 3, "L", t, l + 6, t - 6, l, t, l - 6, t, e + o) : l && l > s && a > t + r && t + i - r > a ? n.splice(23, 3, "L", a + 6, e + s, a, e + s + 6, a - 6, e + s, t + o, e + s) : l && 0 > l && a > t + r && t + i - r > a && n.splice(3, 3, "L", a - 6, e, a, e - 6, a + 6, e, i - o, e), n
            }
        },
        clipRect: function(t, e, i, s) {
            var n = "highcharts-" + Ie++,
                o = this.createElement("clipPath").attr({
                    id: n
                }).add(this.defs),
                t = this.rect(t, e, i, s, 0).add(o);
            return t.id = n, t.clipPath = o, t
        },
        text: function(t, e, i, s) {
            var n = Pe || !Me && this.forExport,
                o = {};
            return s && !this.forExport ? this.html(t, e, i) : (o.x = Math.round(e || 0), i && (o.y = Math.round(i)), (t || 0 === t) && (o.text = t), t = this.createElement("text").attr(o), n && t.css({
                position: "absolute"
            }), s || (t.xSetter = function(t, e, i) {
                var s, n, o = i.childNodes;
                for (n = 1; n < o.length; n++) s = o[n], s.getAttribute("x") === i.getAttribute("x") && s.setAttribute("x", t);
                i.setAttribute(e, t)
            }), t)
        },
        fontMetrics: function(t) {
            var t = t || this.style.fontSize,
                t = /px/.test(t) ? i(t) : /em/.test(t) ? 12 * parseFloat(t) : 12,
                t = 24 > t ? t + 4 : he(1.2 * t),
                e = he(.8 * t);
            return {
                h: t,
                b: e
            }
        },
        label: function(i, s, n, o, r, a, l, h, d) {
            function u() {
                var e, i;
                e = T.element.style, m = (void 0 === v || void 0 === y || S.styles.textAlign) && T.textStr && T.getBBox(), S.width = (v || m.width || 0) + 2 * M + A, S.height = (y || m.height || 0) + 2 * M, w = M + C.fontMetrics(e && e.fontSize).b, k && (g || (e = he(-D * M), i = h ? -w : 0, S.box = g = o ? C.symbol(o, e, i, S.width, S.height, L) : C.rect(e, i, S.width, S.height, 0, L[Be]), g.attr("fill", He).add(S)), g.isImg || g.attr(t({
                    width: he(S.width),
                    height: he(S.height)
                }, L)), L = null)
            }

            function p() {
                var t, e = S.styles,
                    e = e && e.textAlign,
                    i = A + M * (1 - D);
                t = h ? 0 : w, c(v) && m && ("center" === e || "right" === e) && (i += {
                    center: .5,
                    right: 1
                }[e] * (v - m.width)), (i !== T.x || t !== T.y) && (T.attr("x", i), t !== B && T.attr("y", t)), T.x = i, T.y = t
            }

            function f(t, e) {
                g ? g.attr(t, e) : L[t] = e
            }
            var g, m, v, y, x, b, w, k, C = this,
                S = C.g(d),
                T = C.text("", 0, 0, l).attr({
                    zIndex: 1
                }),
                D = 0,
                M = 3,
                A = 0,
                P = 0,
                L = {};
            S.onAdd = function() {
                T.add(S), S.attr({
                    text: i || "",
                    x: s,
                    y: n
                }), g && c(r) && S.attr({
                    anchorX: r,
                    anchorY: a
                })
            }, S.widthSetter = function(t) {
                v = t
            }, S.heightSetter = function(t) {
                y = t
            }, S.paddingSetter = function(t) {
                c(t) && t !== M && (M = t, p())
            }, S.paddingLeftSetter = function(t) {
                c(t) && t !== A && (A = t, p())
            }, S.alignSetter = function(t) {
                D = {
                    left: 0,
                    center: .5,
                    right: 1
                }[t]
            }, S.textSetter = function(t) {
                t !== B && T.textSetter(t), u(), p()
            }, S["stroke-widthSetter"] = function(t, e) {
                t && (k = !0), P = t % 2 / 2, f(e, t)
            }, S.strokeSetter = S.fillSetter = S.rSetter = function(t, e) {
                "fill" === e && t && (k = !0), f(e, t)
            }, S.anchorXSetter = function(t, e) {
                r = t, f(e, t + P - x)
            }, S.anchorYSetter = function(t, e) {
                a = t, f(e, t - b)
            }, S.xSetter = function(t) {
                S.x = t, D && (t -= D * ((v || m.width) + M)), x = he(t), S.attr("translateX", x)
            }, S.ySetter = function(t) {
                b = S.y = he(t), S.attr("translateY", b)
            };
            var I = S.css;
            return t(S, {
                css: function(t) {
                    if (t) {
                        var i = {},
                            t = e(t);
                        Xe("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow".split(","), function(e) {
                            t[e] !== B && (i[e] = t[e], delete t[e])
                        }), T.css(i)
                    }
                    return I.call(S, t)
                },
                getBBox: function() {
                    return {
                        width: m.width + 2 * M,
                        height: m.height + 2 * M,
                        x: m.x - M,
                        y: m.y - M
                    }
                },
                shadow: function(t) {
                    return g && g.shadow(t), S
                },
                destroy: function() {
                    Ke(S.element, "mouseenter"), Ke(S.element, "mouseleave"), T && (T = T.destroy()), g && (g = g.destroy()), O.prototype.destroy.call(S), S = C = u = p = f = null
                }
            })
        }
    }, $ = ai, t(O.prototype, {
        htmlCss: function(e) {
            var i = this.element;
            return (i = e && "SPAN" === i.tagName && e.width) && (delete e.width, this.textWidth = i, this.updateTransform()), this.styles = t(this.styles, e), f(this.element, e), this
        },
        htmlGetBBox: function() {
            var t = this.element,
                e = this.bBox;
            return e || ("text" === t.nodeName && (t.style.position = "absolute"), e = this.bBox = {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: t.offsetWidth,
                height: t.offsetHeight
            }), e
        },
        htmlUpdateTransform: function() {
            if (this.added) {
                var t = this.renderer,
                    e = this.element,
                    s = this.translateX || 0,
                    n = this.translateY || 0,
                    o = this.x || 0,
                    r = this.y || 0,
                    a = this.textAlign || "left",
                    l = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a],
                    h = this.shadows;
                if (f(e, {
                        marginLeft: s,
                        marginTop: n
                    }), h && Xe(h, function(t) {
                        f(t, {
                            marginLeft: s + 1,
                            marginTop: n + 1
                        })
                    }), this.inverted && Xe(e.childNodes, function(i) {
                        t.invertChild(i, e)
                    }), "SPAN" === e.tagName) {
                    var d, u = this.rotation,
                        g = i(this.textWidth),
                        m = [u, a, e.innerHTML, this.textWidth].join(",");
                    m !== this.cTT && (d = t.fontMetrics(e.style.fontSize).b, c(u) && this.setSpanRotation(u, l, d), h = p(this.elemWidth, e.offsetWidth), h > g && /[ \-]/.test(e.textContent || e.innerText) && (f(e, {
                        width: g + "px",
                        display: "block",
                        whiteSpace: "normal"
                    }), h = g), this.getSpanCorrection(h, d, l, u, a)), f(e, {
                        left: o + (this.xCorr || 0) + "px",
                        top: r + (this.yCorr || 0) + "px"
                    }), Ce && (d = e.offsetHeight), this.cTT = m
                }
            } else this.alignOnAdd = !0
        },
        setSpanRotation: function(t, e, i) {
            var s = {},
                n = we ? "-ms-transform" : Ce ? "-webkit-transform" : Se ? "MozTransform" : be ? "-o-transform" : "";
            s[n] = s.transform = "rotate(" + t + "deg)", s[n + (Se ? "Origin" : "-origin")] = s.transformOrigin = 100 * e + "% " + i + "px", f(this.element, s)
        },
        getSpanCorrection: function(t, e, i) {
            this.xCorr = -t * i, this.yCorr = -e
        }
    }), t(ai.prototype, {
        html: function(e, i, s) {
            var n = this.createElement("span"),
                o = n.element,
                r = n.renderer;
            return n.textSetter = function(t) {
                t !== o.innerHTML && delete this.bBox, o.innerHTML = this.textStr = t
            }, n.xSetter = n.ySetter = n.alignSetter = n.rotationSetter = function(t, e) {
                "align" === e && (e = "textAlign"), n[e] = t, n.htmlUpdateTransform()
            }, n.attr({
                text: e,
                x: he(i),
                y: he(s)
            }).css({
                position: "absolute",
                whiteSpace: "nowrap",
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            }), n.css = n.htmlCss, r.isSVG && (n.add = function(e) {
                var i, s = r.box.parentNode,
                    a = [];
                if (this.parentGroup = e) {
                    if (i = e.div, !i) {
                        for (; e;) a.push(e), e = e.parentGroup;
                        Xe(a.reverse(), function(e) {
                            var n;
                            i = e.div = e.div || g(_e, {
                                className: d(e.element, "class")
                            }, {
                                position: "absolute",
                                left: (e.translateX || 0) + "px",
                                top: (e.translateY || 0) + "px"
                            }, i || s), n = i.style, t(e, {
                                translateXSetter: function(t, i) {
                                    n.left = t + "px", e[i] = t, e.doTransform = !0
                                },
                                translateYSetter: function(t, i) {
                                    n.top = t + "px", e[i] = t, e.doTransform = !0
                                },
                                visibilitySetter: function(t, e) {
                                    n[e] = t
                                }
                            })
                        })
                    }
                } else i = s;
                return i.appendChild(o), n.added = !0, n.alignOnAdd && n.htmlUpdateTransform(), n
            }), n
        }
    });
    var li;
    if (!Me && !Pe) {
        Re.VMLElement = li = {
            init: function(t, e) {
                var i = ["<", e, ' filled="f" stroked="f"'],
                    s = ["position: ", "absolute", ";"],
                    n = e === _e;
                ("shape" === e || n) && s.push("left:0;top:0;width:1px;height:1px;"), s.push("visibility: ", n ? "hidden" : "visible"), i.push(' style="', s.join(""), '"/>'), e && (i = n || "span" === e || "img" === e ? i.join("") : t.prepVML(i), this.element = g(i)), this.renderer = t
            },
            add: function(t) {
                var e = this.renderer,
                    i = this.element,
                    s = e.box,
                    s = t ? t.element || t : s;
                return t && t.inverted && e.invertChild(i, s), s.appendChild(i), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this
            },
            updateTransform: O.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var t = this.rotation,
                    e = ge(t * ye),
                    i = me(t * ye);
                f(this.element, {
                    filter: t ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", e, ", M12=", -i, ", M21=", i, ", M22=", e, ", sizingMethod='auto expand')"].join("") : He
                })
            },
            getSpanCorrection: function(t, e, i, s, n) {
                var o, r = s ? ge(s * ye) : 1,
                    a = s ? me(s * ye) : 0,
                    l = p(this.elemHeight, this.element.offsetHeight);
                this.xCorr = 0 > r && -t, this.yCorr = 0 > a && -l, o = 0 > r * a, this.xCorr += a * e * (o ? 1 - i : i), this.yCorr -= r * e * (s ? o ? i : 1 - i : 1), n && "left" !== n && (this.xCorr -= t * i * (0 > r ? -1 : 1), s && (this.yCorr -= l * i * (0 > a ? -1 : 1)), f(this.element, {
                    textAlign: n
                }))
            },
            pathToVML: function(t) {
                for (var e = t.length, i = []; e--;) r(t[e]) ? i[e] = he(10 * t[e]) - 5 : "Z" === t[e] ? i[e] = "x" : (i[e] = t[e], !t.isArc || "wa" !== t[e] && "at" !== t[e] || (i[e + 5] === i[e + 7] && (i[e + 7] += t[e + 7] > t[e + 5] ? 1 : -1), i[e + 6] === i[e + 8] && (i[e + 8] += t[e + 8] > t[e + 6] ? 1 : -1)));
                return i.join(" ") || "x"
            },
            clip: function(t) {
                var e, i = this;
                return t ? (e = t.members, h(e, i), e.push(i), i.destroyClip = function() {
                    h(e, i)
                }, t = t.getCSS(i)) : (i.destroyClip && i.destroyClip(), t = {
                    clip: ke ? "inherit" : "rect(auto)"
                }), i.css(t)
            },
            css: O.prototype.htmlCss,
            safeRemoveChild: function(t) {
                t.parentNode && A(t)
            },
            destroy: function() {
                return this.destroyClip && this.destroyClip(), O.prototype.destroy.apply(this)
            },
            on: function(t, e) {
                return this.element["on" + t] = function() {
                    var t = ae.event;
                    t.target = t.srcElement, e(t)
                }, this
            },
            cutOffPath: function(t, e) {
                var s, t = t.split(/[ ,]/);
                return s = t.length, (9 === s || 11 === s) && (t[s - 4] = t[s - 2] = i(t[s - 2]) - 10 * e), t.join(" ")
            },
            shadow: function(t, e, s) {
                var n, o, r, a, l, h, c, d = [],
                    u = this.element,
                    f = this.renderer,
                    m = u.style,
                    v = u.path;
                if (v && "string" != typeof v.value && (v = "x"), l = v, t) {
                    for (h = p(t.width, 3), c = (t.opacity || .15) / h, n = 1; 3 >= n; n++) a = 2 * h + 1 - 2 * n, s && (l = this.cutOffPath(v.value, a + .5)), r = ['<shape isShadow="true" strokeweight="', a, '" filled="false" path="', l, '" coordsize="10 10" style="', u.style.cssText, '" />'], o = g(f.prepVML(r), null, {
                        left: i(m.left) + p(t.offsetX, 1),
                        top: i(m.top) + p(t.offsetY, 1)
                    }), s && (o.cutOff = a + 1), r = ['<stroke color="', t.color || "black", '" opacity="', c * n, '"/>'], g(f.prepVML(r), null, null, o), e ? e.element.appendChild(o) : u.parentNode.insertBefore(o, u), d.push(o);
                    this.shadows = d
                }
                return this
            },
            updateShadows: ze,
            setAttr: function(t, e) {
                ke ? this.element[t] = e : this.element.setAttribute(t, e)
            },
            classSetter: function(t) {
                this.element.className = t
            },
            dashstyleSetter: function(t, e, i) {
                (i.getElementsByTagName("stroke")[0] || g(this.renderer.prepVML(["<stroke/>"]), null, null, i))[e] = t || "solid", this[e] = t
            },
            dSetter: function(t, e, i) {
                var s = this.shadows,
                    t = t || [];
                if (this.d = t.join(" "), i.path = t = this.pathToVML(t), s)
                    for (i = s.length; i--;) s[i].path = s[i].cutOff ? this.cutOffPath(t, s[i].cutOff) : t;
                this.setAttr(e, t)
            },
            fillSetter: function(t, e, i) {
                var s = i.nodeName;
                "SPAN" === s ? i.style.color = t : "IMG" !== s && (i.filled = t !== He, this.setAttr("fillcolor", this.renderer.color(t, i, e, this)))
            },
            opacitySetter: ze,
            rotationSetter: function(t, e, i) {
                i = i.style, this[e] = i[e] = t, i.left = -he(me(t * ye) + 1) + "px", i.top = he(ge(t * ye)) + "px"
            },
            strokeSetter: function(t, e, i) {
                this.setAttr("strokecolor", this.renderer.color(t, i, e))
            },
            "stroke-widthSetter": function(t, e, i) {
                i.stroked = !!t, this[e] = t, r(t) && (t += "px"), this.setAttr("strokeweight", t)
            },
            titleSetter: function(t, e) {
                this.setAttr(e, t)
            },
            visibilitySetter: function(t, e, i) {
                "inherit" === t && (t = "visible"), this.shadows && Xe(this.shadows, function(i) {
                    i.style[e] = t
                }), "DIV" === i.nodeName && (t = "hidden" === t ? "-999em" : 0, ke || (i.style[e] = t ? "visible" : "hidden"), e = "top"), i.style[e] = t
            },
            xSetter: function(t, e, i) {
                this[e] = t, "x" === e ? e = "left" : "y" === e && (e = "top"), this.updateClipping ? (this[e] = t, this.updateClipping()) : i.style[e] = t
            },
            zIndexSetter: function(t, e, i) {
                i.style[e] = t
            }
        }, li = m(O, li), li.prototype.ySetter = li.prototype.widthSetter = li.prototype.heightSetter = li.prototype.xSetter;
        var hi = {
            Element: li,
            isIE8: xe.indexOf("MSIE 8.0") > -1,
            init: function(e, i, s, n) {
                var o;
                if (this.alignedObjects = [], n = this.createElement(_e).css(t(this.getStyle(n), {
                        position: "relative"
                    })), o = n.element, e.appendChild(n.element), this.isVML = !0, this.box = o, this.boxWrapper = n, this.cache = {}, this.setSize(i, s, !1), !re.namespaces.hcv) {
                    re.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        re.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (r) {
                        re.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(e, i, s, o) {
                var r = this.createElement(),
                    a = n(e);
                return t(r, {
                    members: [],
                    left: (a ? e.x : e) + 1,
                    top: (a ? e.y : i) + 1,
                    width: (a ? e.width : s) - 1,
                    height: (a ? e.height : o) - 1,
                    getCSS: function(e) {
                        var i = e.element,
                            s = i.nodeName,
                            e = e.inverted,
                            n = this.top - ("shape" === s ? i.offsetTop : 0),
                            o = this.left,
                            i = o + this.width,
                            r = n + this.height,
                            n = {
                                clip: "rect(" + he(e ? o : n) + "px," + he(e ? r : i) + "px," + he(e ? i : r) + "px," + he(e ? n : o) + "px)"
                            };
                        return !e && ke && "DIV" === s && t(n, {
                            width: i + "px",
                            height: r + "px"
                        }), n
                    },
                    updateClipping: function() {
                        Xe(r.members, function(t) {
                            t.element && t.css(r.getCSS(t))
                        })
                    }
                })
            },
            color: function(t, e, i, s) {
                var n, o, r, a = this,
                    l = /^rgba/,
                    h = He;
                if (t && t.linearGradient ? r = "gradient" : t && t.radialGradient && (r = "pattern"), r) {
                    var c, d, u, p, f, m, v, y, x = t.linearGradient || t.radialGradient,
                        b = "",
                        t = t.stops,
                        w = [],
                        k = function() {
                            o = ['<fill colors="' + w.join(",") + '" opacity="', f, '" o:opacity2="', p, '" type="', r, '" ', b, 'focus="100%" method="any" />'], g(a.prepVML(o), null, null, e)
                        };
                    if (u = t[0], y = t[t.length - 1], u[0] > 0 && t.unshift([0, u[1]]), y[0] < 1 && t.push([1, y[1]]), Xe(t, function(t, e) {
                            l.test(t[1]) ? (n = ri(t[1]), c = n.get("rgb"), d = n.get("a")) : (c = t[1], d = 1), w.push(100 * t[0] + "% " + c), e ? (f = d, m = c) : (p = d, v = c)
                        }), "fill" === i)
                        if ("gradient" === r) i = x.x1 || x[0] || 0, t = x.y1 || x[1] || 0, u = x.x2 || x[2] || 0, x = x.y2 || x[3] || 0, b = 'angle="' + (90 - 180 * le.atan((x - t) / (u - i)) / ve) + '"', k();
                        else {
                            var C, h = x.r,
                                S = 2 * h,
                                T = 2 * h,
                                D = x.cx,
                                M = x.cy,
                                A = e.radialReference,
                                h = function() {
                                    A && (C = s.getBBox(), D += (A[0] - C.x) / C.width - .5, M += (A[1] - C.y) / C.height - .5, S *= A[2] / C.width, T *= A[2] / C.height), b = 'src="' + W.global.VMLRadialGradientURL + '" size="' + S + "," + T + '" origin="0.5,0.5" position="' + D + "," + M + '" color2="' + v + '" ', k()
                                };
                            s.added ? h() : s.onAdd = h, h = m
                        }
                    else h = c
                } else l.test(t) && "IMG" !== e.tagName ? (n = ri(t), o = ["<", i, ' opacity="', n.get("a"), '"/>'], g(this.prepVML(o), null, null, e), h = n.get("rgb")) : (h = e.getElementsByTagName(i), h.length && (h[0].opacity = 1, h[0].type = "solid"), h = t);
                return h
            },
            prepVML: function(t) {
                var e = this.isIE8,
                    t = t.join("");
                return e ? (t = t.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), t = -1 === t.indexOf('style="') ? t.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : t.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : t = t.replace("<", "<hcv:"), t
            },
            text: ai.prototype.html,
            path: function(e) {
                var i = {
                    coordsize: "10 10"
                };
                return o(e) ? i.d = e : n(e) && t(i, e), this.createElement("shape").attr(i)
            },
            circle: function(t, e, i) {
                var s = this.symbol("circle");
                return n(t) && (i = t.r, e = t.y, t = t.x), s.isCircle = !0, s.r = i, s.attr({
                    x: t,
                    y: e
                })
            },
            g: function(t) {
                var e;
                return t && (e = {
                    className: "highcharts-" + t,
                    "class": "highcharts-" + t
                }), this.createElement(_e).attr(e)
            },
            image: function(t, e, i, s, n) {
                var o = this.createElement("img").attr({
                    src: t
                });
                return arguments.length > 1 && o.attr({
                    x: e,
                    y: i,
                    width: s,
                    height: n
                }), o
            },
            createElement: function(t) {
                return "rect" === t ? this.symbol(t) : ai.prototype.createElement.call(this, t)
            },
            invertChild: function(t, e) {
                var s = this,
                    n = e.style,
                    o = "IMG" === t.tagName && t.style;
                f(t, {
                    flip: "x",
                    left: i(n.width) - (o ? i(o.top) : 1),
                    top: i(n.height) - (o ? i(o.left) : 1),
                    rotation: -90
                }), Xe(t.childNodes, function(e) {
                    s.invertChild(e, t)
                })
            },
            symbols: {
                arc: function(t, e, i, s, n) {
                    var o = n.start,

                        r = n.end,
                        a = n.r || i || s,
                        i = n.innerR,
                        s = ge(o),
                        l = me(o),
                        h = ge(r),
                        c = me(r);
                    return r - o === 0 ? ["x"] : (o = ["wa", t - a, e - a, t + a, e + a, t + a * s, e + a * l, t + a * h, e + a * c], n.open && !i && o.push("e", "M", t, e), o.push("at", t - i, e - i, t + i, e + i, t + i * h, e + i * c, t + i * s, e + i * l, "x", "e"), o.isArc = !0, o)
                },
                circle: function(t, e, i, s, n) {
                    return n && (i = s = 2 * n.r), n && n.isCircle && (t -= i / 2, e -= s / 2), ["wa", t, e, t + i, e + s, t + i, e + s / 2, t + i, e + s / 2, "e"]
                },
                rect: function(t, e, i, s, n) {
                    return ai.prototype.symbols[c(n) && n.r ? "callout" : "square"].call(0, t, e, i, s, n)
                }
            }
        };
        Re.VMLRenderer = li = function() {
            this.init.apply(this, arguments)
        }, li.prototype = e(ai.prototype, hi), $ = li
    }
    ai.prototype.measureSpanWidth = function(t, e) {
        var i, s = re.createElement("span");
        return i = re.createTextNode(t), s.appendChild(i), f(s, e), this.box.appendChild(s), i = s.offsetWidth, A(s), i
    };
    var ci;
    Pe && (Re.CanVGRenderer = li = function() {
        De = "http://www.w3.org/1999/xhtml"
    }, li.prototype.symbols = {}, ci = function() {
        function t() {
            var t, i = e.length;
            for (t = 0; i > t; t++) e[t]();
            e = []
        }
        var e = [];
        return {
            push: function(i, s) {
                0 === e.length && Ge(s, t), e.push(i)
            }
        }
    }(), $ = li), E.prototype = {
        addLabel: function() {
            var e, i = this.axis,
                s = i.options,
                n = i.chart,
                o = i.horiz,
                a = i.categories,
                h = i.names,
                d = this.pos,
                u = s.labels,
                f = i.tickPositions,
                o = o && a && !u.step && !u.staggerLines && !u.rotation && n.plotWidth / f.length || !o && (n.margin[3] || .33 * n.chartWidth),
                g = d === f[0],
                m = d === f[f.length - 1],
                h = a ? p(a[d], h[d], d) : d,
                a = this.label,
                v = f.info;
            i.isDatetimeAxis && v && (e = s.dateTimeLabelFormats[v.higherRanks[d] || v.unitName]), this.isFirst = g, this.isLast = m, s = i.labelFormatter.call({
                axis: i,
                chart: n,
                isFirst: g,
                isLast: m,
                dateTimeLabelFormat: e,
                value: i.isLog ? L(l(h)) : h
            }), d = o && {
                width: ue(1, he(o - 2 * (u.padding || 10))) + "px"
            }, d = t(d, u.style), c(a) ? a && a.attr({
                text: s
            }).css(d) : (e = {
                align: i.labelAlign
            }, r(u.rotation) && (e.rotation = u.rotation), o && u.ellipsis && (e._clipHeight = i.len / f.length), this.label = c(s) && u.enabled ? n.renderer.text(s, 0, 0, u.useHTML).attr(e).css(d).add(i.labelGroup) : null)
        },
        getLabelSize: function() {
            var t = this.label,
                e = this.axis;
            return t ? t.getBBox()[e.horiz ? "height" : "width"] : 0
        },
        getLabelSides: function() {
            var t = this.label.getBBox(),
                e = this.axis,
                i = e.horiz,
                s = e.options.labels,
                t = i ? t.width : t.height,
                e = i ? s.x - t * {
                    left: 0,
                    center: .5,
                    right: 1
                }[e.labelAlign] : 0;
            return [e, i ? t + e : t]
        },
        handleOverflow: function(t, e) {
            var i, s, n, o = !0,
                r = this.axis,
                a = this.isFirst,
                l = this.isLast,
                h = r.horiz ? e.x : e.y,
                c = r.reversed,
                d = r.tickPositions,
                u = this.getLabelSides(),
                p = u[0],
                u = u[1],
                f = this.label.line || 0;
            if (i = r.labelEdge, s = r.justifyLabels && (a || l), i[f] === B || h + p > i[f] ? i[f] = h + u : s || (o = !1), s) {
                i = (s = r.justifyToPlot) ? r.pos : 0, s = s ? i + r.len : r.chart.chartWidth;
                do t += a ? 1 : -1, n = r.ticks[d[t]]; while (d[t] && (!n || n.label.line !== f));
                r = n && n.label.xy && n.label.xy.x + n.getLabelSides()[a ? 0 : 1], a && !c || l && c ? i > h + p && (h = i - p, n && h + u > r && (o = !1)) : h + u > s && (h = s - u, n && r > h + p && (o = !1)), e.x = h
            }
            return o
        },
        getPosition: function(t, e, i, s) {
            var n = this.axis,
                o = n.chart,
                r = s && o.oldChartHeight || o.chartHeight;
            return {
                x: t ? n.translate(e + i, null, null, s) + n.transB : n.left + n.offset + (n.opposite ? (s && o.oldChartWidth || o.chartWidth) - n.right - n.left : 0),
                y: t ? r - n.bottom + n.offset - (n.opposite ? n.height : 0) : r - n.translate(e + i, null, null, s) - n.transB
            }
        },
        getLabelPosition: function(t, e, i, s, n, o, r, a) {
            var l = this.axis,
                h = l.transA,
                d = l.reversed,
                u = l.staggerLines,
                p = l.chart.renderer.fontMetrics(n.style.fontSize).b,
                f = n.rotation,
                t = t + n.x - (o && s ? o * h * (d ? -1 : 1) : 0),
                e = e + n.y - (o && !s ? o * h * (d ? 1 : -1) : 0);
            return f && 2 === l.side && (e -= p - p * ge(f * ye)), !c(n.y) && !f && (e += p - i.getBBox().height / 2), u && (i.line = r / (a || 1) % u, e += i.line * (l.labelOffset / u)), {
                x: t,
                y: e
            }
        },
        getMarkPath: function(t, e, i, s, n, o) {
            return o.crispLine(["M", t, e, "L", t + (n ? 0 : -i), e + (n ? i : 0)], s)
        },
        render: function(t, e, i) {
            var s = this.axis,
                n = s.options,
                o = s.chart.renderer,
                r = s.horiz,
                a = this.type,
                l = this.label,
                h = this.pos,
                c = n.labels,
                d = this.gridLine,
                u = a ? a + "Grid" : "grid",
                f = a ? a + "Tick" : "tick",
                g = n[u + "LineWidth"],
                m = n[u + "LineColor"],
                v = n[u + "LineDashStyle"],
                y = n[f + "Length"],
                u = n[f + "Width"] || 0,
                x = n[f + "Color"],
                b = n[f + "Position"],
                f = this.mark,
                w = c.step,
                k = !0,
                C = s.tickmarkOffset,
                S = this.getPosition(r, h, C, e),
                T = S.x,
                S = S.y,
                D = r && T === s.pos + s.len || !r && S === s.pos ? -1 : 1;
            this.isActive = !0, g && (h = s.getPlotLinePath(h + C, g * D, e, !0), d === B && (d = {
                stroke: m,
                "stroke-width": g
            }, v && (d.dashstyle = v), a || (d.zIndex = 1), e && (d.opacity = 0), this.gridLine = d = g ? o.path(h).attr(d).add(s.gridGroup) : null), !e && d && h && d[this.isNew ? "attr" : "animate"]({
                d: h,
                opacity: i
            })), u && y && ("inside" === b && (y = -y), s.opposite && (y = -y), a = this.getMarkPath(T, S, y, u * D, r, o), f ? f.animate({
                d: a,
                opacity: i
            }) : this.mark = o.path(a).attr({
                stroke: x,
                "stroke-width": u,
                opacity: i
            }).add(s.axisGroup)), l && !isNaN(T) && (l.xy = S = this.getLabelPosition(T, S, l, r, c, C, t, w), this.isFirst && !this.isLast && !p(n.showFirstLabel, 1) || this.isLast && !this.isFirst && !p(n.showLastLabel, 1) ? k = !1 : !s.isRadial && !c.step && !c.rotation && !e && 0 !== i && (k = this.handleOverflow(t, S)), w && t % w && (k = !1), k && !isNaN(S.y) ? (S.opacity = i, l[this.isNew ? "attr" : "animate"](S), this.isNew = !1) : l.attr("y", -9999))
        },
        destroy: function() {
            M(this, this.axis)
        }
    }, Re.PlotLineOrBand = function(t, e) {
        this.axis = t, e && (this.options = e, this.id = e.id)
    }, Re.PlotLineOrBand.prototype = {
        render: function() {
            var t, i = this,
                s = i.axis,
                n = s.horiz,
                o = (s.pointRange || 0) / 2,
                r = i.options,
                l = r.label,
                h = i.label,
                d = r.width,
                u = r.to,
                f = r.from,
                g = c(f) && c(u),
                m = r.value,
                v = r.dashStyle,
                y = i.svgElem,
                x = [],
                b = r.color,
                w = r.zIndex,
                k = r.events,
                C = {},
                S = s.chart.renderer;
            if (s.isLog && (f = a(f), u = a(u), m = a(m)), d) x = s.getPlotLinePath(m, d), C = {
                stroke: b,
                "stroke-width": d
            }, v && (C.dashstyle = v);
            else {
                if (!g) return;
                f = ue(f, s.min - o), u = pe(u, s.max + o), x = s.getPlotBandPath(f, u, r), b && (C.fill = b), r.borderWidth && (C.stroke = r.borderColor, C["stroke-width"] = r.borderWidth)
            }
            if (c(w) && (C.zIndex = w), y) x ? y.animate({
                d: x
            }, null, y.onGetPath) : (y.hide(), y.onGetPath = function() {
                y.show()
            }, h && (i.label = h = h.destroy()));
            else if (x && x.length && (i.svgElem = y = S.path(x).attr(C).add(), k))
                for (t in o = function(t) {
                        y.on(t, function(e) {
                            k[t].apply(i, [e])
                        })
                    }, k) o(t);
            return l && c(l.text) && x && x.length && s.width > 0 && s.height > 0 ? (l = e({
                align: n && g && "center",
                x: n ? !g && 4 : 10,
                verticalAlign: !n && g && "middle",
                y: n ? g ? 16 : 10 : g ? 6 : -4,
                rotation: n && !g && 90
            }, l), h || (C = {
                align: l.textAlign || l.align,
                rotation: l.rotation
            }, c(w) && (C.zIndex = w), i.label = h = S.text(l.text, 0, 0, l.useHTML).attr(C).css(l.style).add()), s = [x[1], x[4], p(x[6], x[1])], x = [x[2], x[5], p(x[7], x[2])], n = T(s), g = T(x), h.align(l, !1, {
                x: n,
                y: g,
                width: D(s) - n,
                height: D(x) - g
            }), h.show()) : h && h.hide(), i
        },
        destroy: function() {
            h(this.axis.plotLinesAndBands, this), delete this.axis, M(this)
        }
    }, _.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#C0C0C0",
            labels: We,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {
                align: "middle",
                style: {
                    color: "#707070"
                }
            },
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            tickWidth: 0,
            title: {
                rotation: 270,
                text: "Values"
            },
            stackLabels: {
                enabled: !1,
                formatter: function() {
                    return v(this.total, -1)
                },
                style: We.style
            }
        },
        defaultLeftAxisOptions: {
            labels: {
                x: -15,
                y: null
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions: {
            labels: {
                x: 15,
                y: null
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions: {
            labels: {
                x: 0,
                y: 20
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions: {
            labels: {
                x: 0,
                y: -15
            },
            title: {
                rotation: 0
            }
        },
        init: function(t, e) {
            var i = e.isX;
            this.horiz = t.inverted ? !i : i, this.coll = (this.isXAxis = i) ? "xAxis" : "yAxis", this.opposite = e.opposite, this.side = e.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(e);
            var s = this.options,
                n = s.type;
            this.labelFormatter = s.labels.formatter || this.defaultLabelFormatter, this.userOptions = e, this.minPixelPadding = 0, this.chart = t, this.reversed = s.reversed, this.zoomEnabled = s.zoomEnabled !== !1, this.categories = s.categories || "category" === n, this.names = [], this.isLog = "logarithmic" === n, this.isDatetimeAxis = "datetime" === n, this.isLinked = c(s.linkedTo), this.tickmarkOffset = this.categories && "between" === s.tickmarkPlacement ? .5 : 0, this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = s.minRange || s.maxZoom, this.range = s.range, this.offset = s.offset || 0, this.stacks = {}, this.oldStacks = {}, this.min = this.max = null, this.crosshair = p(s.crosshair, u(t.options.tooltip.crosshairs)[i ? 0 : 1], !1);
            var o, s = this.options.events; - 1 === Ue(this, t.axes) && (i && !this.isColorAxis ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), t[this.coll].push(this)), this.series = this.series || [], t.inverted && i && this.reversed === B && (this.reversed = !0), this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (o in s) Ze(this, o, s[o]);
            this.isLog && (this.val2lin = a, this.lin2val = l)
        },
        setOptions: function(t) {
            this.options = e(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], e(W[this.coll], t))
        },
        defaultLabelFormatter: function() {
            var t, e = this.axis,
                i = this.value,
                s = e.categories,
                n = this.dateTimeLabelFormat,
                o = W.lang.numericSymbols,
                r = o && o.length,
                a = e.options.labels.format,
                e = e.isLog ? i : e.tickInterval;
            if (a) t = b(a, this);
            else if (s) t = i;
            else if (n) t = Y(n, i);
            else if (r && e >= 1e3)
                for (; r-- && t === B;) s = Math.pow(1e3, r + 1), e >= s && null !== o[r] && (t = v(i / s, -1) + o[r]);
            return t === B && (t = fe(i) >= 1e4 ? v(i, 0) : v(i, -1, B, "")), t
        },
        getSeriesExtremes: function() {
            var t = this,
                e = t.chart;
            t.hasVisibleSeries = !1, t.dataMin = t.dataMax = null, t.buildStacks && t.buildStacks(), Xe(t.series, function(i) {
                if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                    var s;
                    s = i.options.threshold;
                    var n;
                    t.hasVisibleSeries = !0, t.isLog && 0 >= s && (s = null), t.isXAxis ? (s = i.xData, s.length && (t.dataMin = pe(p(t.dataMin, s[0]), T(s)), t.dataMax = ue(p(t.dataMax, s[0]), D(s)))) : (i.getExtremes(), n = i.dataMax, i = i.dataMin, c(i) && c(n) && (t.dataMin = pe(p(t.dataMin, i), i), t.dataMax = ue(p(t.dataMax, n), n)), c(s) && (t.dataMin >= s ? (t.dataMin = s, t.ignoreMinPadding = !0) : t.dataMax < s && (t.dataMax = s, t.ignoreMaxPadding = !0)))
                }
            })
        },
        translate: function(t, e, i, s, n, o) {
            var a = 1,
                l = 0,
                h = s ? this.oldTransA : this.transA,
                s = s ? this.oldMin : this.min,
                c = this.minPixelPadding,
                n = (this.options.ordinal || this.isLog && n) && this.lin2val;
            return h || (h = this.transA), i && (a *= -1, l = this.len), this.reversed && (a *= -1, l -= a * (this.sector || this.len)), e ? (t = t * a + l, t -= c, t = t / h + s, n && (t = this.lin2val(t))) : (n && (t = this.val2lin(t)), "between" === o && (o = .5), t = a * (t - s) * h + l + a * c + (r(o) ? h * o * this.pointRange : 0)), t
        },
        toPixels: function(t, e) {
            return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
        },
        toValue: function(t, e) {
            return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function(t, e, i, s, n) {
            var o, r, a, l = this.chart,
                h = this.left,
                c = this.top,
                d = i && l.oldChartHeight || l.chartHeight,
                u = i && l.oldChartWidth || l.chartWidth;
            return o = this.transB, n = p(n, this.translate(t, null, null, i)), t = i = he(n + o), o = r = he(d - n - o), isNaN(n) ? a = !0 : this.horiz ? (o = c, r = d - this.bottom, (h > t || t > h + this.width) && (a = !0)) : (t = h, i = u - this.right, (c > o || o > c + this.height) && (a = !0)), a && !s ? null : l.renderer.crispLine(["M", t, o, "L", i, r], e || 1)
        },
        getLinearTickPositions: function(t, e, i) {
            var s, n = L(ce(e / t) * t),
                o = L(de(i / t) * t),
                a = [];
            if (e === i && r(e)) return [e];
            for (e = n; o >= e && (a.push(e), e = L(e + t), e !== s);) s = e;
            return a
        },
        getMinorTickPositions: function() {
            var t, e = this.options,
                i = this.tickPositions,
                s = this.minorTickInterval,
                n = [];
            if (this.isLog)
                for (t = i.length, e = 1; t > e; e++) n = n.concat(this.getLogTickPositions(s, i[e - 1], i[e], !0));
            else if (this.isDatetimeAxis && "auto" === e.minorTickInterval) n = n.concat(this.getTimeTicks(this.normalizeTimeTickInterval(s), this.min, this.max, e.startOfWeek)), n[0] < this.min && n.shift();
            else
                for (i = this.min + (i[0] - this.min) % s; i <= this.max; i += s) n.push(i);
            return n
        },
        adjustForMinRange: function() {
            var t, e, i, s, n, o, r = this.options,
                a = this.min,
                l = this.max,
                h = this.dataMax - this.dataMin >= this.minRange;
            if (this.isXAxis && this.minRange === B && !this.isLog && (c(r.min) || c(r.max) ? this.minRange = null : (Xe(this.series, function(t) {
                    for (n = t.xData, i = o = t.xIncrement ? 1 : n.length - 1; i > 0; i--) s = n[i] - n[i - 1], (e === B || e > s) && (e = s)
                }), this.minRange = pe(5 * e, this.dataMax - this.dataMin))), l - a < this.minRange) {
                var d = this.minRange;
                t = (d - l + a) / 2, t = [a - t, p(r.min, a - t)], h && (t[2] = this.dataMin), a = D(t), l = [a + d, p(r.max, a + d)], h && (l[2] = this.dataMax), l = T(l), d > l - a && (t[0] = l - d, t[1] = p(r.min, l - d), a = D(t))
            }
            this.min = a, this.max = l
        },
        setAxisTranslation: function(t) {
            var e, i = this,
                n = i.max - i.min,
                o = i.axisPointRange || 0,
                r = 0,
                a = 0,
                l = i.linkedParent,
                h = !!i.categories,
                d = i.transA;
            (i.isXAxis || h || o) && (l ? (r = l.minPointOffset, a = l.pointRangePadding) : Xe(i.series, function(t) {
                var l = h ? 1 : i.isXAxis ? t.pointRange : i.axisPointRange || 0,
                    d = t.options.pointPlacement,
                    u = t.closestPointRange;
                l > n && (l = 0), o = ue(o, l), r = ue(r, s(d) ? 0 : l / 2), a = ue(a, "on" === d ? 0 : l), !t.noSharedTooltip && c(u) && (e = c(e) ? pe(e, u) : u)
            }), l = i.ordinalSlope && e ? i.ordinalSlope / e : 1, i.minPointOffset = r *= l, i.pointRangePadding = a *= l, i.pointRange = pe(o, n), i.closestPointRange = e), t && (i.oldTransA = d), i.translationSlope = i.transA = d = i.len / (n + a || 1), i.transB = i.horiz ? i.left : i.bottom, i.minPixelPadding = d * r
        },
        setTickPositions: function(t) {
            var e, i = this,
                s = i.chart,
                n = i.options,
                o = i.isLog,
                l = i.isDatetimeAxis,
                h = i.isXAxis,
                d = i.isLinked,
                u = i.options.tickPositioner,
                f = n.maxPadding,
                g = n.minPadding,
                m = n.tickInterval,
                v = n.minTickInterval,
                y = n.tickPixelInterval,
                x = i.categories;
            d ? (i.linkedParent = s[i.coll][n.linkedTo], s = i.linkedParent.getExtremes(), i.min = p(s.min, s.dataMin), i.max = p(s.max, s.dataMax), n.type !== i.linkedParent.options.type && P(11, 1)) : (i.min = p(i.userMin, n.min, i.dataMin), i.max = p(i.userMax, n.max, i.dataMax)), o && (!t && pe(i.min, p(i.dataMin, i.min)) <= 0 && P(10, 1), i.min = L(a(i.min)), i.max = L(a(i.max))), i.range && c(i.max) && (i.userMin = i.min = ue(i.min, i.max - i.range), i.userMax = i.max, i.range = null), i.beforePadding && i.beforePadding(), i.adjustForMinRange(), x || i.axisPointRange || i.usePercentage || d || !c(i.min) || !c(i.max) || !(s = i.max - i.min) || (c(n.min) || c(i.userMin) || !g || !(i.dataMin < 0) && i.ignoreMinPadding || (i.min -= s * g), c(n.max) || c(i.userMax) || !f || !(i.dataMax > 0) && i.ignoreMaxPadding || (i.max += s * f)), r(n.floor) && (i.min = ue(i.min, n.floor)), r(n.ceiling) && (i.max = pe(i.max, n.ceiling)), i.min === i.max || void 0 === i.min || void 0 === i.max ? i.tickInterval = 1 : d && !m && y === i.linkedParent.options.tickPixelInterval ? i.tickInterval = i.linkedParent.tickInterval : (i.tickInterval = p(m, x ? 1 : (i.max - i.min) * y / ue(i.len, y)), !c(m) && i.len < y && !this.isRadial && !this.isLog && !x && n.startOnTick && n.endOnTick && (e = !0, i.tickInterval /= 4)), h && !t && Xe(i.series, function(t) {
                t.processData(i.min !== i.oldMin || i.max !== i.oldMax)
            }), i.setAxisTranslation(!0), i.beforeSetTickPositions && i.beforeSetTickPositions(), i.postProcessTickInterval && (i.tickInterval = i.postProcessTickInterval(i.tickInterval)), i.pointRange && (i.tickInterval = ue(i.pointRange, i.tickInterval)), !m && i.tickInterval < v && (i.tickInterval = v), l || o || m || (i.tickInterval = k(i.tickInterval, null, w(i.tickInterval), n)), i.minorTickInterval = "auto" === n.minorTickInterval && i.tickInterval ? i.tickInterval / 5 : n.minorTickInterval, i.tickPositions = t = n.tickPositions ? [].concat(n.tickPositions) : u && u.apply(i, [i.min, i.max]), t || (!i.ordinalPositions && (i.max - i.min) / i.tickInterval > ue(2 * i.len, 200) && P(19, !0), t = l ? i.getTimeTicks(i.normalizeTimeTickInterval(i.tickInterval, n.units), i.min, i.max, n.startOfWeek, i.ordinalPositions, i.closestPointRange, !0) : o ? i.getLogTickPositions(i.tickInterval, i.min, i.max) : i.getLinearTickPositions(i.tickInterval, i.min, i.max), e && t.splice(1, t.length - 2), i.tickPositions = t), d || (o = t[0], l = t[t.length - 1], d = i.minPointOffset || 0, n.startOnTick ? i.min = o : i.min - d > o && t.shift(), n.endOnTick ? i.max = l : i.max + d < l && t.pop(), 1 === t.length && (n = fe(i.max) > 1e13 ? 1 : .001, i.min -= n, i.max += n))
        },
        setMaxTicks: function() {
            var t = this.chart,
                e = t.maxTicks || {},
                i = this.tickPositions,
                s = this._maxTicksKey = [this.coll, this.pos, this.len].join("-");
            !this.isLinked && !this.isDatetimeAxis && i && i.length > (e[s] || 0) && this.options.alignTicks !== !1 && (e[s] = i.length), t.maxTicks = e
        },
        adjustTickAmount: function() {
            var t = this._maxTicksKey,
                e = this.tickPositions,
                i = this.chart.maxTicks;
            if (i && i[t] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== B) {
                var s = this.tickAmount,
                    n = e.length;
                if (this.tickAmount = t = i[t], t > n) {
                    for (; e.length < t;) e.push(L(e[e.length - 1] + this.tickInterval));
                    this.transA *= (n - 1) / (t - 1), this.max = e[e.length - 1]
                }
                c(s) && t !== s && (this.isDirty = !0)
            }
        },
        setScale: function() {
            var t, e, i, s, n = this.stacks;
            if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), s = this.len !== this.oldAxisLength, Xe(this.series, function(t) {
                    (t.isDirtyData || t.isDirty || t.xAxis.isDirty) && (i = !0)
                }), s || i || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                if (!this.isXAxis)
                    for (t in n)
                        for (e in n[t]) n[t][e].total = null, n[t][e].cum = 0;
                this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = s || this.min !== this.oldMin || this.max !== this.oldMax)
            } else if (!this.isXAxis) {
                this.oldStacks && (n = this.stacks = this.oldStacks);
                for (t in n)
                    for (e in n[t]) n[t][e].cum = n[t][e].total
            }
            this.setMaxTicks()
        },
        setExtremes: function(e, i, s, n, o) {
            var r = this,
                a = r.chart,
                s = p(s, !0),
                o = t(o, {
                    min: e,
                    max: i
                });
            Je(r, "setExtremes", o, function() {
                r.userMin = e, r.userMax = i, r.eventArgs = o, r.isDirtyExtremes = !0, s && a.redraw(n)
            })
        },
        zoom: function(t, e) {
            var i = this.dataMin,
                s = this.dataMax,
                n = this.options;
            return this.allowZoomOutside || (c(i) && t <= pe(i, p(n.min, i)) && (t = B), c(s) && e >= ue(s, p(n.max, s)) && (e = B)), this.displayBtn = t !== B || e !== B, this.setExtremes(t, e, !1, B, {
                trigger: "zoom"
            }), !0
        },
        setAxisSize: function() {
            var t = this.chart,
                e = this.options,
                i = e.offsetLeft || 0,
                s = this.horiz,
                n = p(e.width, t.plotWidth - i + (e.offsetRight || 0)),
                o = p(e.height, t.plotHeight),
                r = p(e.top, t.plotTop),
                e = p(e.left, t.plotLeft + i),
                i = /%$/;
            i.test(o) && (o = parseInt(o, 10) / 100 * t.plotHeight), i.test(r) && (r = parseInt(r, 10) / 100 * t.plotHeight + t.plotTop), this.left = e, this.top = r, this.width = n, this.height = o, this.bottom = t.chartHeight - o - r, this.right = t.chartWidth - n - e, this.len = ue(s ? n : o, 0), this.pos = s ? e : r
        },
        getExtremes: function() {
            var t = this.isLog;
            return {
                min: t ? L(l(this.min)) : this.min,
                max: t ? L(l(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function(t) {
            var e = this.isLog,
                i = e ? l(this.min) : this.min,
                e = e ? l(this.max) : this.max;
            return i > t || null === t ? t = i : t > e && (t = e), this.translate(t, 0, 1, 0, 1)
        },
        autoLabelAlign: function(t) {
            return t = (p(t, 0) - 90 * this.side + 720) % 360, t > 15 && 165 > t ? "right" : t > 195 && 345 > t ? "left" : "center"
        },
        getOffset: function() {
            var t, e, i, s, n, o, r, a = this,
                l = a.chart,
                h = l.renderer,
                d = a.options,
                u = a.tickPositions,
                f = a.ticks,
                g = a.horiz,
                m = a.side,
                v = l.inverted ? [1, 0, 3, 2][m] : m,
                y = 0,
                x = 0,
                b = d.title,
                w = d.labels,
                k = 0,
                C = l.axisOffset,
                S = l.clipOffset,
                T = [-1, 1, 1, -1][m],
                D = 1,
                M = p(w.maxStaggerLines, 5),
                A = 2 === m ? h.fontMetrics(w.style.fontSize).b : 0;
            if (a.hasData = t = a.hasVisibleSeries || c(a.min) && c(a.max) && !!u, a.showAxis = l = t || p(d.showEmpty, !0), a.staggerLines = a.horiz && w.staggerLines, a.axisGroup || (a.gridGroup = h.g("grid").attr({
                    zIndex: d.gridZIndex || 1
                }).add(), a.axisGroup = h.g("axis").attr({
                    zIndex: d.zIndex || 2
                }).add(), a.labelGroup = h.g("axis-labels").attr({
                    zIndex: w.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add()), t || a.isLinked) {
                if (a.labelAlign = p(w.align || a.autoLabelAlign(w.rotation)), Xe(u, function(t) {
                        f[t] ? f[t].addLabel() : f[t] = new E(a, t)
                    }), a.horiz && !a.staggerLines && M && !w.rotation) {
                    for (i = a.reversed ? [].concat(u).reverse() : u; M > D;) {
                        for (t = [], s = !1, w = 0; w < i.length; w++) n = i[w], o = (o = f[n].label && f[n].label.getBBox()) ? o.width : 0, r = w % D, o && (n = a.translate(n), t[r] !== B && n < t[r] && (s = !0), t[r] = n + o);
                        if (!s) break;
                        D++
                    }
                    D > 1 && (a.staggerLines = D)
                }
                Xe(u, function(t) {
                    (0 === m || 2 === m || {
                        1: "left",
                        3: "right"
                    }[m] === a.labelAlign) && (k = ue(f[t].getLabelSize(), k))
                }), a.staggerLines && (k *= a.staggerLines, a.labelOffset = k)
            } else
                for (i in f) f[i].destroy(), delete f[i];
            b && b.text && b.enabled !== !1 && (a.axisTitle || (a.axisTitle = h.text(b.text, 0, 0, b.useHTML).attr({
                zIndex: 7,
                rotation: b.rotation || 0,
                align: b.textAlign || {
                    low: "left",
                    middle: "center",
                    high: "right"
                }[b.align]
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(b.style).add(a.axisGroup), a.axisTitle.isNew = !0), l && (y = a.axisTitle.getBBox()[g ? "height" : "width"], x = p(b.margin, g ? 5 : 10), e = b.offset), a.axisTitle[l ? "show" : "hide"]()), a.offset = T * p(d.offset, C[m]), a.axisTitleMargin = p(e, k + x + (k && T * d.labels[g ? "y" : "x"] - A)), C[m] = ue(C[m], a.axisTitleMargin + y + T * a.offset), S[v] = ue(S[v], 2 * ce(d.lineWidth / 2))
        },
        getLinePath: function(t) {
            var e = this.chart,
                i = this.opposite,
                s = this.offset,
                n = this.horiz,
                o = this.left + (i ? this.width : 0) + s,
                s = e.chartHeight - this.bottom - (i ? this.height : 0) + s;
            return i && (t *= -1), e.renderer.crispLine(["M", n ? this.left : o, n ? s : this.top, "L", n ? e.chartWidth - this.right : o, n ? s : e.chartHeight - this.bottom], t)
        },
        getTitlePosition: function() {
            var t = this.horiz,
                e = this.left,
                s = this.top,
                n = this.len,
                o = this.options.title,
                r = t ? e : s,
                a = this.opposite,
                l = this.offset,
                h = i(o.style.fontSize || 12),
                n = {
                    low: r + (t ? 0 : n),
                    middle: r + n / 2,
                    high: r + (t ? n : 0)
                }[o.align],
                e = (t ? s + this.height : e) + (t ? 1 : -1) * (a ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? h : 0);
            return {
                x: t ? n : e + (a ? this.width : 0) + l + (o.x || 0),
                y: t ? e - (a ? this.height : 0) + l : n + (o.y || 0)
            }
        },
        render: function() {
            var t, e, i, s = this,
                n = s.horiz,
                o = s.reversed,
                r = s.chart,
                a = r.renderer,
                h = s.options,
                d = s.isLog,
                u = s.isLinked,
                p = s.tickPositions,
                f = s.axisTitle,
                g = s.ticks,
                m = s.minorTicks,
                v = s.alternateBands,
                y = h.stackLabels,
                x = h.alternateGridColor,
                b = s.tickmarkOffset,
                w = h.lineWidth,
                k = r.hasRendered && c(s.oldMin) && !isNaN(s.oldMin),
                C = s.hasData,
                S = s.showAxis,
                T = h.labels.overflow,
                D = s.justifyLabels = n && T !== !1;
            s.labelEdge.length = 0, s.justifyToPlot = "justify" === T, Xe([g, m, v], function(t) {
                for (var e in t) t[e].isActive = !1
            }), (C || u) && (s.minorTickInterval && !s.categories && Xe(s.getMinorTickPositions(), function(t) {
                m[t] || (m[t] = new E(s, t, "minor")), k && m[t].isNew && m[t].render(null, !0), m[t].render(null, !1, 1)
            }), p.length && (t = p.slice(), (n && o || !n && !o) && t.reverse(), D && (t = t.slice(1).concat([t[0]])), Xe(t, function(e, i) {
                D && (i = i === t.length - 1 ? 0 : i + 1), (!u || e >= s.min && e <= s.max) && (g[e] || (g[e] = new E(s, e)), k && g[e].isNew && g[e].render(i, !0, .1), g[e].render(i, !1, 1))
            }), b && 0 === s.min && (g[-1] || (g[-1] = new E(s, -1, null, !0)), g[-1].render(-1))), x && Xe(p, function(t, n) {
                n % 2 === 0 && t < s.max && (v[t] || (v[t] = new Re.PlotLineOrBand(s)), e = t + b, i = p[n + 1] !== B ? p[n + 1] + b : s.max, v[t].options = {
                    from: d ? l(e) : e,
                    to: d ? l(i) : i,
                    color: x
                }, v[t].render(), v[t].isActive = !0)
            }), s._addedPlotLB || (Xe((h.plotLines || []).concat(h.plotBands || []), function(t) {
                s.addPlotBandOrLine(t)
            }), s._addedPlotLB = !0)), Xe([g, m, v], function(t) {
                var e, i, s = [],
                    n = G ? G.duration || 500 : 0,
                    o = function() {
                        for (i = s.length; i--;) t[s[i]] && !t[s[i]].isActive && (t[s[i]].destroy(), delete t[s[i]])
                    };
                for (e in t) t[e].isActive || (t[e].render(e, !1, 0), t[e].isActive = !1, s.push(e));
                t !== v && r.hasRendered && n ? n && setTimeout(o, n) : o()
            }), w && (n = s.getLinePath(w), s.axisLine ? s.axisLine.animate({
                d: n
            }) : s.axisLine = a.path(n).attr({
                stroke: h.lineColor,
                "stroke-width": w,
                zIndex: 7
            }).add(s.axisGroup), s.axisLine[S ? "show" : "hide"]()), f && S && (f[f.isNew ? "attr" : "animate"](s.getTitlePosition()), f.isNew = !1), y && y.enabled && s.renderStackTotals(), s.isDirty = !1
        },
        redraw: function() {
            var t = this.chart.pointer;
            t && t.reset(!0), this.render(), Xe(this.plotLinesAndBands, function(t) {
                t.render()
            }), Xe(this.series, function(t) {
                t.isDirty = !0
            })
        },
        destroy: function(t) {
            var e, i = this,
                s = i.stacks,
                n = i.plotLinesAndBands;
            t || Ke(i);
            for (e in s) M(s[e]), s[e] = null;
            for (Xe([i.ticks, i.minorTicks, i.alternateBands], function(t) {
                    M(t)
                }), t = n.length; t--;) n[t].destroy();
            Xe("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(t) {
                i[t] && (i[t] = i[t].destroy())
            }), this.cross && this.cross.destroy()
        },
        drawCrosshair: function(t, e) {
            if (this.crosshair)
                if ((c(e) || !p(this.crosshair.snap, !0)) === !1) this.hideCrosshair();
                else {
                    var i, s = this.crosshair,
                        n = s.animation;
                    p(s.snap, !0) ? c(e) && (i = this.chart.inverted != this.horiz ? e.plotX : this.len - e.plotY) : i = this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos, i = this.isRadial ? this.getPlotLinePath(this.isXAxis ? e.x : p(e.stackY, e.y)) : this.getPlotLinePath(null, null, null, null, i), null === i ? this.hideCrosshair() : this.cross ? this.cross.attr({
                        visibility: "visible"
                    })[n ? "animate" : "attr"]({
                        d: i
                    }, n) : (n = {
                        "stroke-width": s.width || 1,
                        stroke: s.color || "#C0C0C0",
                        zIndex: s.zIndex || 2
                    }, s.dashStyle && (n.dashstyle = s.dashStyle), this.cross = this.chart.renderer.path(i).attr(n).add())
                }
        },
        hideCrosshair: function() {
            this.cross && this.cross.hide()
        }
    }, t(_.prototype, {
        getPlotBandPath: function(t, e) {
            var i = this.getPlotLinePath(e),
                s = this.getPlotLinePath(t);
            return s && i ? s.push(i[4], i[5], i[1], i[2]) : s = null, s
        },
        addPlotBand: function(t) {
            this.addPlotBandOrLine(t, "plotBands")
        },
        addPlotLine: function(t) {
            this.addPlotBandOrLine(t, "plotLines")
        },
        addPlotBandOrLine: function(t, e) {
            var i = new Re.PlotLineOrBand(this, t).render(),
                s = this.userOptions;
            return i && (e && (s[e] = s[e] || [], s[e].push(t)), this.plotLinesAndBands.push(i)), i
        },
        removePlotBandOrLine: function(t) {
            for (var e = this.plotLinesAndBands, i = this.options, s = this.userOptions, n = e.length; n--;) e[n].id === t && e[n].destroy();
            Xe([i.plotLines || [], s.plotLines || [], i.plotBands || [], s.plotBands || []], function(e) {
                for (n = e.length; n--;) e[n].id === t && h(e, e[n])
            })
        }
    }), _.prototype.getTimeTicks = function(e, i, s, n) {
        var o, r = [],
            a = {},
            l = W.global.useUTC,
            h = new Date(i - V),
            d = e.unitRange,
            u = e.count;
        if (c(i)) {
            d >= X.second && (h.setMilliseconds(0), h.setSeconds(d >= X.minute ? 0 : u * ce(h.getSeconds() / u))), d >= X.minute && h[ee](d >= X.hour ? 0 : u * ce(h[q]() / u)), d >= X.hour && h[ie](d >= X.day ? 0 : u * ce(h[Z]() / u)), d >= X.day && h[se](d >= X.month ? 1 : u * ce(h[J]() / u)), d >= X.month && (h[ne](d >= X.year ? 0 : u * ce(h[Q]() / u)), o = h[te]()), d >= X.year && (o -= o % u, h[oe](o)), d === X.week && h[se](h[J]() - h[K]() + p(n, 1)), i = 1, V && (h = new Date(h.getTime() + V)), o = h[te]();
            for (var n = h.getTime(), f = h[Q](), g = h[J](), m = l ? V : (864e5 + 6e4 * h.getTimezoneOffset()) % 864e5; s > n;) r.push(n), d === X.year ? n = j(o + i * u, 0) : d === X.month ? n = j(o, f + i * u) : l || d !== X.day && d !== X.week ? n += d * u : n = j(o, f, g + i * u * (d === X.day ? 1 : 7)), i++;
            r.push(n), Xe(je(r, function(t) {
                return d <= X.hour && t % X.day === m
            }), function(t) {
                a[t] = "day"
            })
        }
        return r.info = t(e, {
            higherRanks: a,
            totalRange: d * u
        }), r
    }, _.prototype.normalizeTimeTickInterval = function(t, e) {
        var i, s = e || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ],
            n = s[s.length - 1],
            o = X[n[0]],
            r = n[1];
        for (i = 0; i < s.length && (n = s[i], o = X[n[0]], r = n[1], !(s[i + 1] && t <= (o * r[r.length - 1] + X[s[i + 1][0]]) / 2)); i++);
        return o === X.year && 5 * o > t && (r = [1, 2, 5]), s = k(t / o, r, "year" === n[0] ? ue(w(t / o), 1) : 1), {
            unitRange: o,
            count: s,
            unitName: n[0]
        }
    }, _.prototype.getLogTickPositions = function(t, e, i, s) {
        var n = this.options,
            o = this.len,
            r = [];
        if (s || (this._minorAutoInterval = null), t >= .5) t = he(t), r = this.getLinearTickPositions(t, e, i);
        else if (t >= .08)
            for (var h, c, d, u, f, o = ce(e), n = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; i + 1 > o && !f; o++)
                for (c = n.length, h = 0; c > h && !f; h++) d = a(l(o) * n[h]), d > e && (!s || i >= u) && r.push(u), u > i && (f = !0), u = d;
        else e = l(e), i = l(i), t = n[s ? "minorTickInterval" : "tickInterval"], t = p("auto" === t ? null : t, this._minorAutoInterval, (i - e) * (n.tickPixelInterval / (s ? 5 : 1)) / ((s ? o / this.tickPositions.length : o) || 1)), t = k(t, null, w(t)), r = qe(this.getLinearTickPositions(t, e, i), a), s || (this._minorAutoInterval = t / 5);
        return s || (this.tickInterval = t), r
    };
    var di = Re.Tooltip = function() {
        this.init.apply(this, arguments)
    };
    di.prototype = {
        init: function(t, e) {
            var s = e.borderWidth,
                n = e.style,
                o = i(n.padding);
            this.chart = t, this.options = e, this.crosshairs = [], this.now = {
                x: 0,
                y: 0
            }, this.isHidden = !0, this.label = t.renderer.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                padding: o,
                fill: e.backgroundColor,
                "stroke-width": s,
                r: e.borderRadius,
                zIndex: 8
            }).css(n).css({
                padding: 0
            }).add().attr({
                y: -9999
            }), Pe || this.label.shadow(e.shadow), this.shared = e.shared
        },
        destroy: function() {
            this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), clearTimeout(this.tooltipTimeout)
        },
        move: function(e, i, s, n) {
            var o = this,
                r = o.now,
                a = o.options.animation !== !1 && !o.isHidden,
                l = o.followPointer || o.len > 1;
            t(r, {
                x: a ? (2 * r.x + e) / 3 : e,
                y: a ? (r.y + i) / 2 : i,
                anchorX: l ? B : a ? (2 * r.anchorX + s) / 3 : s,
                anchorY: l ? B : a ? (r.anchorY + n) / 2 : n
            }), o.label.attr(r), a && (fe(e - r.x) > 1 || fe(i - r.y) > 1) && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                o && o.move(e, i, s, n)
            }, 32))
        },
        hide: function() {
            var t, e = this;
            clearTimeout(this.hideTimer), this.isHidden || (t = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
                e.label.fadeOut(), e.isHidden = !0
            }, p(this.options.hideDelay, 500)), t && Xe(t, function(t) {
                t.setState()
            }), this.chart.hoverPoints = null)
        },
        getAnchor: function(t, e) {
            var i, s, n = this.chart,
                o = n.inverted,
                r = n.plotTop,
                a = 0,
                l = 0,
                t = u(t);
            return i = t[0].tooltipPos, this.followPointer && e && (e.chartX === B && (e = n.pointer.normalize(e)), i = [e.chartX - n.plotLeft, e.chartY - r]), i || (Xe(t, function(t) {
                s = t.series.yAxis, a += t.plotX, l += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!o && s ? s.top - r : 0)
            }), a /= t.length, l /= t.length, i = [o ? n.plotWidth - l : a, this.shared && !o && t.length > 1 && e ? e.chartY - r : o ? n.plotHeight - a : l]), qe(i, he)
        },
        getPosition: function(t, e, i) {
            var s, n = this.chart,
                o = this.distance,
                r = {},
                a = ["y", n.chartHeight, e, i.plotY + n.plotTop],
                l = ["x", n.chartWidth, t, i.plotX + n.plotLeft],
                h = i.ttBelow || n.inverted && !i.negative || !n.inverted && i.negative,
                c = function(t, e, i, s) {
                    var n = s - o > i,
                        e = e > s + o + i,
                        i = s - o - i;
                    if (s += o, h && e) r[t] = s;
                    else if (!h && n) r[t] = i;
                    else if (n) r[t] = i;
                    else {
                        if (!e) return !1;
                        r[t] = s
                    }
                },
                d = function(t, e, i, s) {
                    return o > s || s > e - o ? !1 : void(r[t] = i / 2 > s ? 1 : s > e - i / 2 ? e - i - 2 : s - i / 2)
                },
                u = function(t) {
                    var e = a;
                    a = l, l = e, s = t
                },
                p = function() {
                    c.apply(0, a) !== !1 ? d.apply(0, l) === !1 && !s && (u(!0), p()) : s ? r.x = r.y = 0 : (u(!0), p())
                };
            return (n.inverted || this.len > 1) && u(), p(), r
        },
        defaultFormatter: function(t) {
            var e, i = this.points || u(this),
                s = i[0].series;
            return e = [t.tooltipHeaderFormatter(i[0])], Xe(i, function(t) {
                s = t.series, e.push(s.tooltipFormatter && s.tooltipFormatter(t) || t.point.tooltipFormatter(s.tooltipOptions.pointFormat))
            }), e.push(t.options.footerFormat || ""), e.join("")
        },
        refresh: function(t, e) {
            var i, s, n, o = this.chart,
                r = this.label,
                a = this.options,
                l = {},
                h = [];
            n = a.formatter || this.defaultFormatter;
            var c, l = o.hoverPoints,
                d = this.shared;
            clearTimeout(this.hideTimer), this.followPointer = u(t)[0].series.tooltipOptions.followPointer, s = this.getAnchor(t, e), i = s[0], s = s[1], !d || t.series && t.series.noSharedTooltip ? l = t.getLabelConfig() : (o.hoverPoints = t, l && Xe(l, function(t) {
                t.setState()
            }), Xe(t, function(t) {
                t.setState("hover"), h.push(t.getLabelConfig())
            }), l = {
                x: t[0].category,
                y: t[0].y
            }, l.points = h, this.len = h.length, t = t[0]), n = n.call(l, this), l = t.series, this.distance = p(l.tooltipOptions.distance, 16), n === !1 ? this.hide() : (this.isHidden && (ei(r), r.attr("opacity", 1).show()), r.attr({
                text: n
            }), c = a.borderColor || t.color || l.color || "#606060", r.attr({
                stroke: c
            }), this.updatePosition({
                plotX: i,
                plotY: s,
                negative: t.negative,
                ttBelow: t.ttBelow
            }), this.isHidden = !1), Je(o, "tooltipRefresh", {
                text: n,
                x: i + o.plotLeft,
                y: s + o.plotTop,
                borderColor: c
            })
        },
        updatePosition: function(t) {
            var e = this.chart,
                i = this.label,
                i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
            this.move(he(i.x), he(i.y), t.plotX + e.plotLeft, t.plotY + e.plotTop)
        },
        tooltipHeaderFormatter: function(t) {
            var e, i = t.series,
                s = i.tooltipOptions,
                n = s.dateTimeLabelFormats,
                o = s.xDateFormat,
                a = i.xAxis,
                l = a && "datetime" === a.options.type && r(t.key),
                s = s.headerFormat,
                a = a && a.closestPointRange;
            if (l && !o) {
                if (a) {
                    for (e in X)
                        if (X[e] >= a || X[e] <= X.day && t.key % X[e] > 0) {
                            o = n[e];
                            break
                        }
                } else o = n.day;
                o = o || n.year
            }
            return l && o && (s = s.replace("{point.key}", "{point.key:" + o + "}")), b(s, {
                point: t,
                series: i
            })
        }
    };
    var ui;
    R = re.documentElement.ontouchstart !== B;
    var pi = Re.Pointer = function(t, e) {
        this.init(t, e)
    };
    if (pi.prototype = {
            init: function(t, e) {
                var i, s = e.chart,
                    n = s.events,
                    o = Pe ? "" : s.zoomType,
                    s = t.inverted;
                this.options = e, this.chart = t, this.zoomX = i = /x/.test(o), this.zoomY = o = /y/.test(o), this.zoomHor = i && !s || o && s, this.zoomVert = o && !s || i && s, this.hasZoom = i || o, this.runChartClick = n && !!n.click, this.pinchDown = [], this.lastValidTouch = {}, Re.Tooltip && e.tooltip.enabled && (t.tooltip = new di(t, e.tooltip), this.followTouchMove = e.tooltip.followTouchMove), this.setDOMEvents()
            },
            normalize: function(e, i) {
                var s, n, e = e || window.event,
                    e = Qe(e);
                return e.target || (e.target = e.srcElement), n = e.touches ? e.touches.length ? e.touches.item(0) : e.changedTouches[0] : e, i || (this.chartPosition = i = Ve(this.chart.container)), n.pageX === B ? (s = ue(e.x, e.clientX - i.left), n = e.y) : (s = n.pageX - i.left, n = n.pageY - i.top), t(e, {
                    chartX: he(s),
                    chartY: he(n)
                })
            },
            getCoordinates: function(t) {
                var e = {
                    xAxis: [],
                    yAxis: []
                };
                return Xe(this.chart.axes, function(i) {
                    e[i.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: i,
                        value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                    })
                }), e
            },
            getIndex: function(t) {
                var e = this.chart;
                return e.inverted ? e.plotHeight + e.plotTop - t.chartY : t.chartX - e.plotLeft
            },
            runPointActions: function(t) {
                var e, i, s, n, o = this.chart,
                    r = o.series,
                    a = o.tooltip,
                    l = o.hoverPoint,
                    h = o.hoverSeries,
                    c = o.chartWidth,
                    d = this.getIndex(t);
                if (a && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
                    for (i = [], s = r.length, n = 0; s > n; n++) r[n].visible && r[n].options.enableMouseTracking !== !1 && !r[n].noSharedTooltip && r[n].singularTooltips !== !0 && r[n].tooltipPoints.length && (e = r[n].tooltipPoints[d]) && e.series && (e._dist = fe(d - e.clientX), c = pe(c, e._dist), i.push(e));
                    for (s = i.length; s--;) i[s]._dist > c && i.splice(s, 1);
                    i.length && i[0].clientX !== this.hoverX && (a.refresh(i, t), this.hoverX = i[0].clientX)
                }
                r = h && h.tooltipOptions.followPointer, h && h.tracker && !r ? (e = h.tooltipPoints[d]) && e !== l && e.onMouseOver(t) : a && r && !a.isHidden && (h = a.getAnchor([{}], t), a.updatePosition({
                    plotX: h[0],
                    plotY: h[1]
                })), a && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function(t) {
                    Oe[ui] && Oe[ui].pointer.onDocumentMouseMove(t)
                }, Ze(re, "mousemove", this._onDocumentMouseMove)), Xe(o.axes, function(i) {
                    i.drawCrosshair(t, p(e, l))
                })
            },
            reset: function(t) {
                var e = this.chart,
                    i = e.hoverSeries,
                    s = e.hoverPoint,
                    n = e.tooltip,
                    o = n && n.shared ? e.hoverPoints : s;
                (t = t && n && o) && u(o)[0].plotX === B && (t = !1), t ? (n.refresh(o), s && s.setState(s.state, !0)) : (s && s.onMouseOut(), i && i.onMouseOut(), n && n.hide(), this._onDocumentMouseMove && (Ke(re, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null), Xe(e.axes, function(t) {
                    t.hideCrosshair()
                }), this.hoverX = null)
            },
            scaleGroups: function(t, e) {
                var i, s = this.chart;
                Xe(s.series, function(n) {
                    i = t || n.getPlotBox(), n.xAxis && n.xAxis.zoomEnabled && (n.group.attr(i), n.markerGroup && (n.markerGroup.attr(i), n.markerGroup.clip(e ? s.clipRect : null)), n.dataLabelsGroup && n.dataLabelsGroup.attr(i))
                }), s.clipRect.attr(e || s.clipBox)
            },
            dragStart: function(t) {
                var e = this.chart;
                e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
            },
            drag: function(t) {
                var e, i = this.chart,
                    s = i.options.chart,
                    n = t.chartX,
                    o = t.chartY,
                    r = this.zoomHor,
                    a = this.zoomVert,
                    l = i.plotLeft,
                    h = i.plotTop,
                    c = i.plotWidth,
                    d = i.plotHeight,
                    u = this.mouseDownX,
                    p = this.mouseDownY;
                l > n ? n = l : n > l + c && (n = l + c), h > o ? o = h : o > h + d && (o = h + d), this.hasDragged = Math.sqrt(Math.pow(u - n, 2) + Math.pow(p - o, 2)), this.hasDragged > 10 && (e = i.isInsidePlot(u - l, p - h), i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !this.selectionMarker && (this.selectionMarker = i.renderer.rect(l, h, r ? 1 : c, a ? 1 : d, 0).attr({
                    fill: s.selectionMarkerFill || "rgba(69,114,167,0.25)",
                    zIndex: 7
                }).add()), this.selectionMarker && r && (n -= u, this.selectionMarker.attr({
                    width: fe(n),
                    x: (n > 0 ? 0 : n) + u
                })), this.selectionMarker && a && (n = o - p, this.selectionMarker.attr({
                    height: fe(n),
                    y: (n > 0 ? 0 : n) + p
                })), e && !this.selectionMarker && s.panning && i.pan(t, s.panning))
            },
            drop: function(e) {
                var i = this.chart,
                    s = this.hasPinched;
                if (this.selectionMarker) {
                    var n, o = {
                            xAxis: [],
                            yAxis: [],
                            originalEvent: e.originalEvent || e
                        },
                        e = this.selectionMarker,
                        r = e.attr ? e.attr("x") : e.x,
                        a = e.attr ? e.attr("y") : e.y,
                        l = e.attr ? e.attr("width") : e.width,
                        h = e.attr ? e.attr("height") : e.height;
                    (this.hasDragged || s) && (Xe(i.axes, function(t) {
                        if (t.zoomEnabled) {
                            var e = t.horiz,
                                i = t.toValue(e ? r : a),
                                e = t.toValue(e ? r + l : a + h);
                            !isNaN(i) && !isNaN(e) && (o[t.coll].push({
                                axis: t,
                                min: pe(i, e),
                                max: ue(i, e)
                            }), n = !0)
                        }
                    }), n && Je(i, "selection", o, function(e) {
                        i.zoom(t(e, s ? {
                            animation: !1
                        } : null))
                    })), this.selectionMarker = this.selectionMarker.destroy(), s && this.scaleGroups()
                }
                i && (f(i.container, {
                    cursor: i._cursor
                }), i.cancelClick = this.hasDragged > 10, i.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(t) {
                t = this.normalize(t), t.preventDefault && t.preventDefault(), this.dragStart(t)
            },
            onDocumentMouseUp: function(t) {
                Oe[ui] && Oe[ui].pointer.drop(t)
            },
            onDocumentMouseMove: function(t) {
                var e = this.chart,
                    i = this.chartPosition,
                    s = e.hoverSeries,
                    t = this.normalize(t, i);
                i && s && !this.inClass(t.target, "highcharts-tracker") && !e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) && this.reset()
            },
            onContainerMouseLeave: function() {
                var t = Oe[ui];
                t && (t.pointer.reset(), t.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(t) {
                var e = this.chart;
                ui = e.index, t = this.normalize(t), "mousedown" === e.mouseIsDown && this.drag(t), (this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop)) && !e.openMenu && this.runPointActions(t)
            },
            inClass: function(t, e) {
                for (var i; t;) {
                    if (i = d(t, "class")) {
                        if (-1 !== i.indexOf(e)) return !0;
                        if (-1 !== i.indexOf("highcharts-container")) return !1
                    }
                    t = t.parentNode
                }
            },
            onTrackerMouseOut: function(t) {
                var e = this.chart.hoverSeries,
                    i = (t = t.relatedTarget || t.toElement) && t.point && t.point.series;
                !e || e.options.stickyTracking || this.inClass(t, "highcharts-tooltip") || i === e || e.onMouseOut()
            },
            onContainerClick: function(e) {
                var i = this.chart,
                    s = i.hoverPoint,
                    n = i.plotLeft,
                    o = i.plotTop,
                    e = this.normalize(e);
                e.cancelBubble = !0, i.cancelClick || (s && this.inClass(e.target, "highcharts-tracker") ? (Je(s.series, "click", t(e, {
                    point: s
                })), i.hoverPoint && s.firePointEvent("click", e)) : (t(e, this.getCoordinates(e)), i.isInsidePlot(e.chartX - n, e.chartY - o) && Je(i, "click", e)))
            },
            setDOMEvents: function() {
                var t = this,
                    e = t.chart.container;
                e.onmousedown = function(e) {
                    t.onContainerMouseDown(e)
                }, e.onmousemove = function(e) {
                    t.onContainerMouseMove(e)
                }, e.onclick = function(e) {
                    t.onContainerClick(e)
                }, Ze(e, "mouseleave", t.onContainerMouseLeave), 1 === Ee && Ze(re, "mouseup", t.onDocumentMouseUp), R && (e.ontouchstart = function(e) {
                    t.onContainerTouchStart(e)
                }, e.ontouchmove = function(e) {
                    t.onContainerTouchMove(e)
                }, 1 === Ee && Ze(re, "touchend", t.onDocumentTouchEnd))
            },
            destroy: function() {
                var t;
                Ke(this.chart.container, "mouseleave", this.onContainerMouseLeave), Ee || (Ke(re, "mouseup", this.onDocumentMouseUp), Ke(re, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
                for (t in this) this[t] = null
            }
        }, t(Re.Pointer.prototype, {
            pinchTranslate: function(t, e, i, s, n, o) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, t, e, i, s, n, o), (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, t, e, i, s, n, o)
            },
            pinchTranslateDirection: function(t, e, i, s, n, o, r, a) {
                var l, h, c, d = this.chart,
                    u = t ? "x" : "y",
                    p = t ? "X" : "Y",
                    f = "chart" + p,
                    g = t ? "width" : "height",
                    m = d["plot" + (t ? "Left" : "Top")],
                    v = a || 1,
                    y = d.inverted,
                    x = d.bounds[t ? "h" : "v"],
                    b = 1 === e.length,
                    w = e[0][f],
                    k = i[0][f],
                    C = !b && e[1][f],
                    S = !b && i[1][f],
                    i = function() {
                        !b && fe(w - C) > 20 && (v = a || fe(k - S) / fe(w - C)), h = (m - k) / v + w, l = d["plot" + (t ? "Width" : "Height")] / v
                    };
                i(), e = h, e < x.min ? (e = x.min, c = !0) : e + l > x.max && (e = x.max - l, c = !0), c ? (k -= .8 * (k - r[u][0]), b || (S -= .8 * (S - r[u][1])), i()) : r[u] = [k, S], y || (o[u] = h - m, o[g] = l), o = y ? 1 / v : v, n[g] = l, n[u] = e, s[y ? t ? "scaleY" : "scaleX" : "scale" + p] = v, s["translate" + p] = o * m + (k - o * w)
            },
            pinch: function(e) {
                var i = this,
                    s = i.chart,
                    n = i.pinchDown,
                    o = i.followTouchMove,
                    r = e.touches,
                    a = r.length,
                    l = i.lastValidTouch,
                    h = i.hasZoom,
                    c = i.selectionMarker,
                    d = {},
                    u = 1 === a && (i.inClass(e.target, "highcharts-tracker") && s.runTrackerClick || s.runChartClick),
                    p = {};
                (h || o) && !u && e.preventDefault(), qe(r, function(t) {
                    return i.normalize(t)
                }), "touchstart" === e.type ? (Xe(r, function(t, e) {
                    n[e] = {
                        chartX: t.chartX,
                        chartY: t.chartY
                    }
                }), l.x = [n[0].chartX, n[1] && n[1].chartX], l.y = [n[0].chartY, n[1] && n[1].chartY], Xe(s.axes, function(t) {
                    if (t.zoomEnabled) {
                        var e = s.bounds[t.horiz ? "h" : "v"],
                            i = t.minPixelPadding,
                            n = t.toPixels(t.dataMin),
                            o = t.toPixels(t.dataMax),
                            r = pe(n, o),
                            n = ue(n, o);
                        e.min = pe(t.pos, r - i), e.max = ue(t.pos + t.len, n + i)
                    }
                })) : n.length && (c || (i.selectionMarker = c = t({
                    destroy: ze
                }, s.plotBox)), i.pinchTranslate(n, r, d, c, p, l), i.hasPinched = h, i.scaleGroups(d, p), !h && o && 1 === a && this.runPointActions(i.normalize(e)))
            },
            onContainerTouchStart: function(t) {
                var e = this.chart;
                ui = e.index, 1 === t.touches.length ? (t = this.normalize(t), e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) ? (this.runPointActions(t), this.pinch(t)) : this.reset()) : 2 === t.touches.length && this.pinch(t)
            },
            onContainerTouchMove: function(t) {
                (1 === t.touches.length || 2 === t.touches.length) && this.pinch(t)
            },
            onDocumentTouchEnd: function(t) {
                Oe[ui] && Oe[ui].pointer.drop(t)
            }
        }), ae.PointerEvent || ae.MSPointerEvent) {
        var fi = {},
            gi = !!ae.PointerEvent,
            mi = function() {
                var t, e = [];
                e.item = function(t) {
                    return this[t]
                };
                for (t in fi) fi.hasOwnProperty(t) && e.push({
                    pageX: fi[t].pageX,
                    pageY: fi[t].pageY,
                    target: fi[t].target
                });
                return e
            },
            vi = function(t, e, i, s) {
                t = t.originalEvent || t, "touch" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_TOUCH || !Oe[ui] || (s(t), s = Oe[ui].pointer, s[e]({
                    type: i,
                    target: t.currentTarget,
                    preventDefault: ze,
                    touches: mi()
                }))
            };
        t(pi.prototype, {
            onContainerPointerDown: function(t) {
                vi(t, "onContainerTouchStart", "touchstart", function(t) {
                    fi[t.pointerId] = {
                        pageX: t.pageX,
                        pageY: t.pageY,
                        target: t.currentTarget
                    }
                })
            },
            onContainerPointerMove: function(t) {
                vi(t, "onContainerTouchMove", "touchmove", function(t) {
                    fi[t.pointerId] = {
                        pageX: t.pageX,
                        pageY: t.pageY
                    }, fi[t.pointerId].target || (fi[t.pointerId].target = t.currentTarget)
                })
            },
            onDocumentPointerUp: function(t) {
                vi(t, "onContainerTouchEnd", "touchend", function(t) {
                    delete fi[t.pointerId]
                })
            },
            batchMSEvents: function(t) {
                t(this.chart.container, gi ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), t(this.chart.container, gi ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), t(re, gi ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        }), x(pi.prototype, "init", function(t, e, i) {
            t.call(this, e, i), (this.hasZoom || this.followTouchMove) && f(e.container, {
                "-ms-touch-action": He,
                "touch-action": He
            })
        }), x(pi.prototype, "setDOMEvents", function(t) {
            t.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(Ze)
        }), x(pi.prototype, "destroy", function(t) {
            this.batchMSEvents(Ke), t.call(this)
        })
    }
    var yi = Re.Legend = function(t, e) {
        this.init(t, e)
    };
    yi.prototype = {
        init: function(t, s) {
            var n = this,
                o = s.itemStyle,
                r = p(s.padding, 8),
                a = s.itemMarginTop || 0;
            this.options = s, s.enabled && (n.baseline = i(o.fontSize) + 3 + a, n.itemStyle = o, n.itemHiddenStyle = e(o, s.itemHiddenStyle), n.itemMarginTop = a, n.padding = r, n.initialItemX = r, n.initialItemY = r - 5, n.maxItemWidth = 0, n.chart = t, n.itemHeight = 0, n.lastLineHeight = 0, n.symbolWidth = p(s.symbolWidth, 16), n.pages = [], n.render(), Ze(n.chart, "endResize", function() {
                n.positionCheckboxes()
            }))
        },
        colorizeItem: function(t, e) {
            var i, s = this.options,
                n = t.legendItem,
                o = t.legendLine,
                r = t.legendSymbol,
                a = this.itemHiddenStyle.color,
                s = e ? s.itemStyle.color : a,
                l = e ? t.legendColor || t.color || "#CCC" : a,
                a = t.options && t.options.marker,
                h = {
                    fill: l
                };
            if (n && n.css({
                    fill: s,
                    color: s
                }), o && o.attr({
                    stroke: l
                }), r) {
                if (a && r.isMarker)
                    for (i in h.stroke = l, a = t.convertAttribs(a)) n = a[i], n !== B && (h[i] = n);
                r.attr(h)
            }
        },
        positionItem: function(t) {
            var e = this.options,
                i = e.symbolPadding,
                e = !e.rtl,
                s = t._legendItemPos,
                n = s[0],
                s = s[1],
                o = t.checkbox;
            t.legendGroup && t.legendGroup.translate(e ? n : this.legendWidth - n - 2 * i - 4, s), o && (o.x = n, o.y = s)
        },
        destroyItem: function(t) {
            var e = t.checkbox;
            Xe(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(e) {
                t[e] && (t[e] = t[e].destroy())
            }), e && A(t.checkbox)
        },
        destroy: function() {
            var t = this.group,
                e = this.box;
            e && (this.box = e.destroy()), t && (this.group = t.destroy())
        },
        positionCheckboxes: function(t) {
            var e, i = this.group.alignAttr,
                s = this.clipHeight || this.legendHeight;
            i && (e = i.translateY, Xe(this.allItems, function(n) {
                var o, r = n.checkbox;
                r && (o = e + r.y + (t || 0) + 3, f(r, {
                    left: i.translateX + n.checkboxOffset + r.x - 20 + "px",
                    top: o + "px",
                    display: o > e - 6 && e + s - 6 > o ? "" : He
                }))
            }))
        },
        renderTitle: function() {
            var t = this.padding,
                e = this.options.title,
                i = 0;
            e.text && (this.title || (this.title = this.chart.renderer.label(e.text, t - 3, t - 4, null, null, null, null, null, "legend-title").attr({
                zIndex: 1
            }).css(e.style).add(this.group)), t = this.title.getBBox(), i = t.height, this.offsetWidth = t.width, this.contentGroup.attr({
                translateY: i
            })), this.titleHeight = i
        },
        renderItem: function(t) {
            var i = this.chart,
                s = i.renderer,
                n = this.options,
                o = "horizontal" === n.layout,
                r = this.symbolWidth,
                a = n.symbolPadding,
                l = this.itemStyle,
                h = this.itemHiddenStyle,
                c = this.padding,
                d = o ? p(n.itemDistance, 20) : 0,
                u = !n.rtl,
                f = n.width,
                g = n.itemMarginBottom || 0,
                m = this.itemMarginTop,
                v = this.initialItemX,
                y = t.legendItem,
                x = t.series && t.series.drawLegendSymbol ? t.series : t,
                w = x.options,
                w = this.createCheckboxForItem && w && w.showCheckbox,
                k = n.useHTML;
            y || (t.legendGroup = s.g("legend-item").attr({
                zIndex: 1
            }).add(this.scrollGroup), x.drawLegendSymbol(this, t), t.legendItem = y = s.text(n.labelFormat ? b(n.labelFormat, t) : n.labelFormatter.call(t), u ? r + a : -a, this.baseline, k).css(e(t.visible ? l : h)).attr({
                align: u ? "left" : "right",
                zIndex: 2
            }).add(t.legendGroup), this.setItemEvents && this.setItemEvents(t, y, k, l, h), this.colorizeItem(t, t.visible), w && this.createCheckboxForItem(t)), s = y.getBBox(), r = t.checkboxOffset = n.itemWidth || t.legendItemWidth || r + a + s.width + d + (w ? 20 : 0), this.itemHeight = a = he(t.legendItemHeight || s.height), o && this.itemX - v + r > (f || i.chartWidth - 2 * c - v - n.x) && (this.itemX = v, this.itemY += m + this.lastLineHeight + g, this.lastLineHeight = 0), this.maxItemWidth = ue(this.maxItemWidth, r), this.lastItemY = m + this.itemY + g, this.lastLineHeight = ue(a, this.lastLineHeight), t._legendItemPos = [this.itemX, this.itemY], o ? this.itemX += r : (this.itemY += m + a + g, this.lastLineHeight = a), this.offsetWidth = f || ue((o ? this.itemX - v - d : r) + c, this.offsetWidth)
        },
        getAllItems: function() {
            var t = [];
            return Xe(this.chart.series, function(e) {
                var i = e.options;
                p(i.showInLegend, c(i.linkedTo) ? !1 : B, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
            }), t
        },
        render: function() {
            var e, i, s, n, o = this,
                r = o.chart,
                a = r.renderer,
                l = o.group,
                h = o.box,
                c = o.options,
                d = o.padding,
                u = c.borderWidth,
                p = c.backgroundColor;
            o.itemX = o.initialItemX, o.itemY = o.initialItemY, o.offsetWidth = 0, o.lastItemY = 0, l || (o.group = l = a.g("legend").attr({
                zIndex: 7
            }).add(), o.contentGroup = a.g().attr({
                zIndex: 1
            }).add(l), o.scrollGroup = a.g().add(o.contentGroup)), o.renderTitle(), e = o.getAllItems(), S(e, function(t, e) {
                return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
            }), c.reversed && e.reverse(), o.allItems = e, o.display = i = !!e.length, Xe(e, function(t) {
                o.renderItem(t)
            }), s = c.width || o.offsetWidth, n = o.lastItemY + o.lastLineHeight + o.titleHeight, n = o.handleOverflow(n), (u || p) && (s += d, n += d, h ? s > 0 && n > 0 && (h[h.isNew ? "attr" : "animate"](h.crisp({
                width: s,
                height: n
            })), h.isNew = !1) : (o.box = h = a.rect(0, 0, s, n, c.borderRadius, u || 0).attr({
                stroke: c.borderColor,
                "stroke-width": u || 0,
                fill: p || He
            }).add(l).shadow(c.shadow), h.isNew = !0), h[i ? "show" : "hide"]()), o.legendWidth = s, o.legendHeight = n, Xe(e, function(t) {
                o.positionItem(t)
            }), i && l.align(t({
                width: s,
                height: n
            }, c), !0, "spacingBox"), r.isResizing || this.positionCheckboxes()
        },
        handleOverflow: function(t) {
            var e, i, s = this,
                n = this.chart,
                o = n.renderer,
                r = this.options,
                a = r.y,
                a = n.spacingBox.height + ("top" === r.verticalAlign ? -a : a) - this.padding,
                l = r.maxHeight,
                h = this.clipRect,
                c = r.navigation,
                d = p(c.animation, !0),
                u = c.arrowSize || 12,
                f = this.nav,
                g = this.pages,
                m = this.allItems;
            return "horizontal" === r.layout && (a /= 2), l && (a = pe(a, l)), g.length = 0, t > a && !r.useHTML ? (this.clipHeight = e = a - 20 - this.titleHeight - this.padding, this.currentPage = p(this.currentPage, 1), this.fullHeight = t, Xe(m, function(t, s) {
                var n = t._legendItemPos[1],
                    o = he(t.legendItem.getBBox().height),
                    r = g.length;
                (!r || n - g[r - 1] > e && (i || n) !== g[r - 1]) && (g.push(i || n), r++), s === m.length - 1 && n + o - g[r - 1] > e && g.push(n), n !== i && (i = n)
            }), h || (h = s.clipRect = o.clipRect(0, this.padding, 9999, 0), s.contentGroup.clip(h)), h.attr({
                height: e
            }), f || (this.nav = f = o.g().attr({
                zIndex: 1
            }).add(this.group), this.up = o.symbol("triangle", 0, 0, u, u).on("click", function() {
                s.scroll(-1, d)
            }).add(f), this.pager = o.text("", 15, 10).css(c.style).add(f), this.down = o.symbol("triangle-down", 0, 0, u, u).on("click", function() {
                s.scroll(1, d)
            }).add(f)), s.scroll(0), t = a) : f && (h.attr({
                height: n.chartHeight
            }), f.hide(), this.scrollGroup.attr({
                translateY: 1
            }), this.clipHeight = 0), t
        },
        scroll: function(t, e) {
            var i = this.pages,
                s = i.length,
                n = this.currentPage + t,
                o = this.clipHeight,
                r = this.options.navigation,
                a = r.activeColor,
                r = r.inactiveColor,
                l = this.pager,
                h = this.padding;
            n > s && (n = s), n > 0 && (e !== B && I(e, this.chart), this.nav.attr({
                translateX: h,
                translateY: o + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({
                fill: 1 === n ? r : a
            }).css({
                cursor: 1 === n ? "default" : "pointer"
            }), l.attr({
                text: n + "/" + s
            }), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: n === s ? r : a
            }).css({
                cursor: n === s ? "default" : "pointer"
            }), i = -i[n - 1] + this.initialItemY, this.scrollGroup.animate({
                translateY: i
            }), this.currentPage = n, this.positionCheckboxes(i))
        }
    }, We = Re.LegendSymbolMixin = {
        drawRectangle: function(t, e) {
            var i = t.options.symbolHeight || 12;
            e.legendSymbol = this.chart.renderer.rect(0, t.baseline - 5 - i / 2, t.symbolWidth, i, t.options.symbolRadius || 0).attr({
                zIndex: 3
            }).add(e.legendGroup)
        },
        drawLineMarker: function(t) {
            var e, i = this.options,
                s = i.marker;
            e = t.symbolWidth;
            var n, o = this.chart.renderer,
                r = this.legendGroup,
                t = t.baseline - he(.3 * o.fontMetrics(t.options.itemStyle.fontSize).b);
            i.lineWidth && (n = {
                "stroke-width": i.lineWidth
            }, i.dashStyle && (n.dashstyle = i.dashStyle), this.legendLine = o.path(["M", 0, t, "L", e, t]).attr(n).add(r)), s && s.enabled !== !1 && (i = s.radius, this.legendSymbol = e = o.symbol(this.symbol, e / 2 - i, t - i, 2 * i, 2 * i).add(r), e.isMarker = !0)
        }
    }, (/Trident\/7\.0/.test(xe) || Se) && x(yi.prototype, "positionItem", function(t, e) {
        var i = this,
            s = function() {
                e._legendItemPos && t.call(i, e)
            };
        s(), setTimeout(s)
    }), H.prototype = {
        init: function(t, i) {
            var s, n = t.series;
            t.series = null, s = e(W, t), s.series = t.series = n, this.userOptions = t, n = s.chart, this.margin = this.splashArray("margin", n), this.spacing = this.splashArray("spacing", n);
            var o = n.events;
            this.bounds = {
                h: {},
                v: {}
            }, this.callback = i, this.isResizing = 0, this.options = s, this.axes = [], this.series = [], this.hasCartesianSeries = n.showAxes;
            var r, a = this;
            if (a.index = Oe.length, Oe.push(a), Ee++, n.reflow !== !1 && Ze(a, "load", function() {
                    a.initReflow()
                }), o)
                for (r in o) Ze(a, r, o[r]);
            a.xAxis = [], a.yAxis = [], a.animation = Pe ? !1 : p(n.animation, !0), a.pointCount = 0, a.counters = new C, a.firstRender()
        },
        initSeries: function(t) {
            var e = this.options.chart;
            return (e = $e[t.type || e.type || e.defaultSeriesType]) || P(17, !0), e = new e, e.init(this, t), e
        },
        isInsidePlot: function(t, e, i) {
            var s = i ? e : t,
                t = i ? t : e;
            return s >= 0 && s <= this.plotWidth && t >= 0 && t <= this.plotHeight
        },
        adjustTickAmounts: function() {
            this.options.chart.alignTicks !== !1 && Xe(this.axes, function(t) {
                t.adjustTickAmount()
            }), this.maxTicks = null
        },
        redraw: function(e) {
            var i, s, n = this.axes,
                o = this.series,
                r = this.pointer,
                a = this.legend,
                l = this.isDirtyLegend,
                h = this.isDirtyBox,
                c = o.length,
                d = c,
                u = this.renderer,
                p = u.isHidden(),
                f = [];
            for (I(e, this), p && this.cloneRenderTo(), this.layOutTitles(); d--;)
                if (e = o[d], e.options.stacking && (i = !0, e.isDirty)) {
                    s = !0;
                    break
                }
            if (s)
                for (d = c; d--;) e = o[d], e.options.stacking && (e.isDirty = !0);
            Xe(o, function(t) {
                t.isDirty && "point" === t.options.legendType && (l = !0)
            }), l && a.options.enabled && (a.render(), this.isDirtyLegend = !1), i && this.getStacks(), this.hasCartesianSeries && (this.isResizing || (this.maxTicks = null, Xe(n, function(t) {
                t.setScale()
            })), this.adjustTickAmounts(), this.getMargins(), Xe(n, function(t) {
                t.isDirty && (h = !0)
            }), Xe(n, function(e) {
                e.isDirtyExtremes && (e.isDirtyExtremes = !1, f.push(function() {
                    Je(e, "afterSetExtremes", t(e.eventArgs, e.getExtremes())), delete e.eventArgs
                })), (h || i) && e.redraw()
            })), h && this.drawChartBox(), Xe(o, function(t) {
                t.isDirty && t.visible && (!t.isCartesian || t.xAxis) && t.redraw()
            }), r && r.reset(!0), u.draw(), Je(this, "redraw"), p && this.cloneRenderTo(!0), Xe(f, function(t) {
                t.call()
            })
        },
        get: function(t) {
            var e, i, s = this.axes,
                n = this.series;
            for (e = 0; e < s.length; e++)
                if (s[e].options.id === t) return s[e];
            for (e = 0; e < n.length; e++)
                if (n[e].options.id === t) return n[e];
            for (e = 0; e < n.length; e++)
                for (i = n[e].points || [], s = 0; s < i.length; s++)
                    if (i[s].id === t) return i[s];
            return null
        },
        getAxes: function() {
            var t = this,
                e = this.options,
                i = e.xAxis = u(e.xAxis || {}),
                e = e.yAxis = u(e.yAxis || {});
            Xe(i, function(t, e) {
                t.index = e, t.isX = !0
            }), Xe(e, function(t, e) {
                t.index = e
            }), i = i.concat(e), Xe(i, function(e) {
                new _(t, e)
            }), t.adjustTickAmounts()
        },
        getSelectedPoints: function() {
            var t = [];
            return Xe(this.series, function(e) {
                t = t.concat(je(e.points || [], function(t) {
                    return t.selected
                }))
            }), t
        },
        getSelectedSeries: function() {
            return je(this.series, function(t) {
                return t.selected
            })
        },
        getStacks: function() {
            var t = this;
            Xe(t.yAxis, function(t) {
                t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
            }), Xe(t.series, function(e) {
                !e.options.stacking || e.visible !== !0 && t.options.chart.ignoreHiddenSeries !== !1 || (e.stackKey = e.type + p(e.options.stack, ""))
            })
        },
        setTitle: function(t, i, s) {
            var n, o, r = this,
                a = r.options;
            o = a.title = e(a.title, t), n = a.subtitle = e(a.subtitle, i), a = n, Xe([
                ["title", t, o],
                ["subtitle", i, a]
            ], function(t) {
                var e = t[0],
                    i = r[e],
                    s = t[1],
                    t = t[2];
                i && s && (r[e] = i = i.destroy()), t && t.text && !i && (r[e] = r.renderer.text(t.text, 0, 0, t.useHTML).attr({
                    align: t.align,
                    "class": "highcharts-" + e,
                    zIndex: t.zIndex || 4
                }).css(t.style).add())
            }), r.layOutTitles(s)
        },
        layOutTitles: function(e) {
            var i = 0,
                s = this.title,
                n = this.subtitle,
                o = this.options,
                r = o.title,
                o = o.subtitle,
                a = this.spacingBox.width - 44;
            !s || (s.css({
                width: (r.width || a) + "px"
            }).align(t({
                y: 15
            }, r), !1, "spacingBox"), r.floating || r.verticalAlign) || (i = s.getBBox().height), n && (n.css({
                width: (o.width || a) + "px"
            }).align(t({
                y: i + r.margin
            }, o), !1, "spacingBox"), !o.floating && !o.verticalAlign && (i = de(i + n.getBBox().height))), s = this.titleOffset !== i, this.titleOffset = i, !this.isDirtyBox && s && (this.isDirtyBox = s, this.hasRendered && p(e, !0) && this.isDirtyBox && this.redraw())
        },
        getChartSize: function() {
            var t = this.options.chart,
                e = t.width,
                t = t.height,
                i = this.renderToClone || this.renderTo;
            c(e) || (this.containerWidth = Ye(i, "width")), c(t) || (this.containerHeight = Ye(i, "height")), this.chartWidth = ue(0, e || this.containerWidth || 600), this.chartHeight = ue(0, p(t, this.containerHeight > 19 ? this.containerHeight : 400))
        },
        cloneRenderTo: function(t) {
            var e = this.renderToClone,
                i = this.container;
            t ? e && (this.renderTo.appendChild(i), A(e), delete this.renderToClone) : (i && i.parentNode === this.renderTo && this.renderTo.removeChild(i), this.renderToClone = e = this.renderTo.cloneNode(0), f(e, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), e.style.setProperty && e.style.setProperty("display", "block", "important"), re.body.appendChild(e), i && e.appendChild(i))
        },
        getContainer: function() {
            var e, n, o, r, a = this.options.chart;
            this.renderTo = e = a.renderTo, r = "highcharts-" + Ie++, s(e) && (this.renderTo = e = re.getElementById(e)), e || P(13, !0), n = i(d(e, "data-highcharts-chart")), !isNaN(n) && Oe[n] && Oe[n].hasRendered && Oe[n].destroy(), d(e, "data-highcharts-chart", this.index), e.innerHTML = "", !a.skipClone && !e.offsetWidth && this.cloneRenderTo(), this.getChartSize(), n = this.chartWidth, o = this.chartHeight, this.container = e = g(_e, {
                className: "highcharts-container" + (a.className ? " " + a.className : ""),
                id: r
            }, t({
                position: "relative",
                overflow: "hidden",
                width: n + "px",
                height: o + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, a.style), this.renderToClone || e), this._cursor = e.style.cursor, this.renderer = a.forExport ? new ai(e, n, o, a.style, !0) : new $(e, n, o, a.style), Pe && this.renderer.create(this, e, n, o)
        },
        getMargins: function() {
            var t, e = this.spacing,
                i = this.legend,
                s = this.margin,
                n = this.options.legend,
                o = p(n.margin, 20),
                r = n.x,
                a = n.y,
                l = n.align,
                h = n.verticalAlign,
                d = this.titleOffset;
            this.resetMargins(), t = this.axisOffset, d && !c(s[0]) && (this.plotTop = ue(this.plotTop, d + this.options.title.margin + e[0])), i.display && !n.floating && ("right" === l ? c(s[1]) || (this.marginRight = ue(this.marginRight, i.legendWidth - r + o + e[1])) : "left" === l ? c(s[3]) || (this.plotLeft = ue(this.plotLeft, i.legendWidth + r + o + e[3])) : "top" === h ? c(s[0]) || (this.plotTop = ue(this.plotTop, i.legendHeight + a + o + e[0])) : "bottom" !== h || c(s[2]) || (this.marginBottom = ue(this.marginBottom, i.legendHeight - a + o + e[2]))), this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), this.hasCartesianSeries && Xe(this.axes, function(t) {
                t.getOffset()
            }), c(s[3]) || (this.plotLeft += t[3]), c(s[0]) || (this.plotTop += t[0]), c(s[2]) || (this.marginBottom += t[2]), c(s[1]) || (this.marginRight += t[1]), this.setChartSize()
        },
        reflow: function(t) {
            var e = this,
                i = e.options.chart,
                s = e.renderTo,
                n = i.width || Ye(s, "width"),
                o = i.height || Ye(s, "height"),
                i = t ? t.target : ae,
                s = function() {
                    e.container && (e.setSize(n, o, !1), e.hasUserSize = null)
                };
            e.hasUserSize || !n || !o || i !== ae && i !== re || ((n !== e.containerWidth || o !== e.containerHeight) && (clearTimeout(e.reflowTimeout), t ? e.reflowTimeout = setTimeout(s, 100) : s()), e.containerWidth = n, e.containerHeight = o)
        },
        initReflow: function() {
            var t = this,
                e = function(e) {
                    t.reflow(e)
                };
            Ze(ae, "resize", e), Ze(t, "destroy", function() {
                Ke(ae, "resize", e)
            })
        },
        setSize: function(t, e, i) {
            var s, n, o, r = this;
            r.isResizing += 1, o = function() {
                r && Je(r, "endResize", null, function() {
                    r.isResizing -= 1
                })
            }, I(i, r), r.oldChartHeight = r.chartHeight, r.oldChartWidth = r.chartWidth, c(t) && (r.chartWidth = s = ue(0, he(t)), r.hasUserSize = !!s), c(e) && (r.chartHeight = n = ue(0, he(e))), (G ? ti : f)(r.container, {
                width: s + "px",
                height: n + "px"
            }, G), r.setChartSize(!0), r.renderer.setSize(s, n, i), r.maxTicks = null, Xe(r.axes, function(t) {
                t.isDirty = !0, t.setScale()
            }), Xe(r.series, function(t) {
                t.isDirty = !0
            }), r.isDirtyLegend = !0, r.isDirtyBox = !0, r.layOutTitles(), r.getMargins(), r.redraw(i), r.oldChartHeight = null, Je(r, "resize"), G === !1 ? o() : setTimeout(o, G && G.duration || 500)
        },
        setChartSize: function(t) {
            var e, i, s, n, o = this.inverted,
                r = this.renderer,
                a = this.chartWidth,
                l = this.chartHeight,
                h = this.options.chart,
                c = this.spacing,
                d = this.clipOffset;
            this.plotLeft = e = he(this.plotLeft), this.plotTop = i = he(this.plotTop), this.plotWidth = s = ue(0, he(a - e - this.marginRight)), this.plotHeight = n = ue(0, he(l - i - this.marginBottom)), this.plotSizeX = o ? n : s, this.plotSizeY = o ? s : n, this.plotBorderWidth = h.plotBorderWidth || 0, this.spacingBox = r.spacingBox = {
                x: c[3],
                y: c[0],
                width: a - c[3] - c[1],
                height: l - c[0] - c[2]
            }, this.plotBox = r.plotBox = {
                x: e,
                y: i,
                width: s,
                height: n
            }, a = 2 * ce(this.plotBorderWidth / 2), o = de(ue(a, d[3]) / 2), r = de(ue(a, d[0]) / 2), this.clipBox = {
                x: o,
                y: r,
                width: ce(this.plotSizeX - ue(a, d[1]) / 2 - o),
                height: ce(this.plotSizeY - ue(a, d[2]) / 2 - r)
            }, t || Xe(this.axes, function(t) {
                t.setAxisSize(), t.setAxisTranslation()
            })
        },
        resetMargins: function() {
            var t = this.spacing,
                e = this.margin;
            this.plotTop = p(e[0], t[0]), this.marginRight = p(e[1], t[1]), this.marginBottom = p(e[2], t[2]), this.plotLeft = p(e[3], t[3]), this.axisOffset = [0, 0, 0, 0], this.clipOffset = [0, 0, 0, 0]
        },
        drawChartBox: function() {
            var t, e = this.options.chart,
                i = this.renderer,
                s = this.chartWidth,
                n = this.chartHeight,
                o = this.chartBackground,
                r = this.plotBackground,
                a = this.plotBorder,
                l = this.plotBGImage,
                h = e.borderWidth || 0,
                c = e.backgroundColor,
                d = e.plotBackgroundColor,
                u = e.plotBackgroundImage,
                p = e.plotBorderWidth || 0,
                f = this.plotLeft,
                g = this.plotTop,
                m = this.plotWidth,
                v = this.plotHeight,
                y = this.plotBox,
                x = this.clipRect,
                b = this.clipBox;
            t = h + (e.shadow ? 8 : 0), (h || c) && (o ? o.animate(o.crisp({
                width: s - t,
                height: n - t
            })) : (o = {
                fill: c || He
            }, h && (o.stroke = e.borderColor, o["stroke-width"] = h), this.chartBackground = i.rect(t / 2, t / 2, s - t, n - t, e.borderRadius, h).attr(o).addClass("highcharts-background").add().shadow(e.shadow))), d && (r ? r.animate(y) : this.plotBackground = i.rect(f, g, m, v, 0).attr({
                fill: d
            }).add().shadow(e.plotShadow)), u && (l ? l.animate(y) : this.plotBGImage = i.image(u, f, g, m, v).add()), x ? x.animate({
                width: b.width,
                height: b.height
            }) : this.clipRect = i.clipRect(b), p && (a ? a.animate(a.crisp({
                x: f,
                y: g,
                width: m,
                height: v
            })) : this.plotBorder = i.rect(f, g, m, v, 0, -p).attr({
                stroke: e.plotBorderColor,
                "stroke-width": p,
                fill: He,
                zIndex: 1
            }).add()), this.isDirtyBox = !1
        },
        propFromSeries: function() {
            var t, e, i, s = this,
                n = s.options.chart,
                o = s.options.series;
            Xe(["inverted", "angular", "polar"], function(r) {
                for (t = $e[n.type || n.defaultSeriesType], i = s[r] || n[r] || t && t.prototype[r], e = o && o.length; !i && e--;)(t = $e[o[e].type]) && t.prototype[r] && (i = !0);
                s[r] = i
            })
        },
        linkSeries: function() {
            var t = this,
                e = t.series;
            Xe(e, function(t) {
                t.linkedSeries.length = 0
            }), Xe(e, function(e) {
                var i = e.options.linkedTo;
                s(i) && (i = ":previous" === i ? t.series[e.index - 1] : t.get(i)) && (i.linkedSeries.push(e), e.linkedParent = i)
            })
        },
        renderSeries: function() {
            Xe(this.series, function(t) {
                t.translate(), t.setTooltipPoints && t.setTooltipPoints(), t.render()
            })
        },
        render: function() {
            var e, s = this,
                n = s.axes,
                o = s.renderer,
                r = s.options,
                a = r.labels,
                l = r.credits;
            s.setTitle(), s.legend = new yi(s, r.legend), s.getStacks(), Xe(n, function(t) {
                t.setScale()
            }), s.getMargins(), s.maxTicks = null, Xe(n, function(t) {
                t.setTickPositions(!0), t.setMaxTicks()
            }), s.adjustTickAmounts(), s.getMargins(), s.drawChartBox(), s.hasCartesianSeries && Xe(n, function(t) {
                t.render()
            }), s.seriesGroup || (s.seriesGroup = o.g("series-group").attr({
                zIndex: 3
            }).add()), s.renderSeries(), a.items && Xe(a.items, function(e) {
                var n = t(a.style, e.style),
                    r = i(n.left) + s.plotLeft,
                    l = i(n.top) + s.plotTop + 12;
                delete n.left, delete n.top, o.text(e.html, r, l).attr({
                    zIndex: 2
                }).css(n).add()
            }), l.enabled && !s.credits && (e = l.href, s.credits = o.text(l.text, 0, 0).on("click", function() {
                e && (location.href = e)
            }).attr({
                align: l.position.align,
                zIndex: 8
            }).css(l.style).add().align(l.position)), s.hasRendered = !0
        },
        destroy: function() {
            var t, e = this,
                i = e.axes,
                s = e.series,
                n = e.container,
                o = n && n.parentNode;
            for (Je(e, "destroy"), Oe[e.index] = B, Ee--, e.renderTo.removeAttribute("data-highcharts-chart"), Ke(e), t = i.length; t--;) i[t] = i[t].destroy();
            for (t = s.length; t--;) s[t] = s[t].destroy();
            Xe("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(t) {
                var i = e[t];
                i && i.destroy && (e[t] = i.destroy())
            }), n && (n.innerHTML = "", Ke(n), o && A(n));
            for (t in e) delete e[t]
        },
        isReadyToRender: function() {
            var t = this;
            return !Me && ae == ae.top && "complete" !== re.readyState || Pe && !ae.canvg ? (Pe ? ci.push(function() {
                t.firstRender()
            }, t.options.global.canvasToolsURL) : re.attachEvent("onreadystatechange", function() {
                re.detachEvent("onreadystatechange", t.firstRender), "complete" === re.readyState && t.firstRender()
            }), !1) : !0

        },
        firstRender: function() {
            var t = this,
                e = t.options,
                i = t.callback;
            t.isReadyToRender() && (t.getContainer(), Je(t, "init"), t.resetMargins(), t.setChartSize(), t.propFromSeries(), t.getAxes(), Xe(e.series || [], function(e) {
                t.initSeries(e)
            }), t.linkSeries(), Je(t, "beforeRender"), Re.Pointer && (t.pointer = new pi(t, e)), t.render(), t.renderer.draw(), i && i.apply(t, [t]), Xe(t.callbacks, function(e) {
                e.apply(t, [t])
            }), t.cloneRenderTo(!0), Je(t, "load"))
        },
        splashArray: function(t, e) {
            var i = e[t],
                i = n(i) ? i : [i, i, i, i];
            return [p(e[t + "Top"], i[0]), p(e[t + "Right"], i[1]), p(e[t + "Bottom"], i[2]), p(e[t + "Left"], i[3])]
        }
    }, H.prototype.callbacks = [], li = Re.CenteredSeriesMixin = {
        getCenter: function() {
            var t, e, s = this.options,
                n = this.chart,
                o = 2 * (s.slicedOffset || 0),
                r = n.plotWidth - 2 * o,
                a = n.plotHeight - 2 * o,
                n = s.center,
                s = [p(n[0], "50%"), p(n[1], "50%"), s.size || "100%", s.innerSize || 0],
                l = pe(r, a);
            return qe(s, function(s, n) {
                return e = /%$/.test(s), t = 2 > n || 2 === n && e, (e ? [r, a, l, l][n] * i(s) / 100 : s) + (t ? o : 0)
            })
        }
    };
    var xi = function() {};
    xi.prototype = {
        init: function(t, e, i) {
            return this.series = t, this.applyOptions(e, i), this.pointAttr = {}, t.options.colorByPoint && (e = t.options.colors || t.chart.options.colors, this.color = this.color || e[t.colorCounter++], t.colorCounter === e.length) && (t.colorCounter = 0), t.chart.pointCount++, this
        },
        applyOptions: function(e, i) {
            var s = this.series,
                n = s.pointValKey,
                e = xi.prototype.optionsToObject.call(this, e);
            return t(this, e), this.options = this.options ? t(this.options, e) : e, n && (this.y = this[n]), this.x === B && s && (this.x = i === B ? s.autoIncrement() : i), this
        },
        optionsToObject: function(t) {
            var e = {},
                i = this.series,
                s = i.pointArrayMap || ["y"],
                n = s.length,
                r = 0,
                a = 0;
            if ("number" == typeof t || null === t) e[s[0]] = t;
            else if (o(t))
                for (t.length > n && (i = typeof t[0], "string" === i ? e.name = t[0] : "number" === i && (e.x = t[0]), r++); n > a;) e[s[a++]] = t[r++];
            else "object" == typeof t && (e = t, t.dataLabels && (i._hasPointLabels = !0), t.marker && (i._hasPointMarkers = !0));
            return e
        },
        destroy: function() {
            var t, e = this.series.chart,
                i = e.hoverPoints;
            e.pointCount--, i && (this.setState(), h(i, this), !i.length) && (e.hoverPoints = null), this === e.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (Ke(this), this.destroyElements()), this.legendItem && e.legend.destroyItem(this);
            for (t in this) this[t] = null
        },
        destroyElements: function() {
            for (var t, e = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), i = 6; i--;) t = e[i], this[t] && (this[t] = this[t].destroy())
        },
        getLabelConfig: function() {
            return {
                x: this.category,
                y: this.y,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        },
        tooltipFormatter: function(t) {
            var e = this.series,
                i = e.tooltipOptions,
                s = p(i.valueDecimals, ""),

                n = i.valuePrefix || "",
                o = i.valueSuffix || "";
            return Xe(e.pointArrayMap || ["y"], function(e) {
                e = "{point." + e, (n || o) && (t = t.replace(e + "}", n + e + "}" + o)), t = t.replace(e + "}", e + ":,." + s + "f}")
            }), b(t, {
                point: this,
                series: this.series
            })
        },
        firePointEvent: function(t, e, i) {
            var s = this,
                n = this.series.options;
            (n.point.events[t] || s.options && s.options.events && s.options.events[t]) && this.importEvents(), "click" === t && n.allowPointSelect && (i = function(t) {
                s.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
            }), Je(this, t, e, i)
        }
    };
    var bi = function() {};
    bi.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: xi,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function(e, i) {
            var s, n, o = this,
                r = e.series,
                a = function(t, e) {
                    return p(t.options.index, t._i) - p(e.options.index, e._i)
                };
            o.chart = e, o.options = i = o.setOptions(i), o.linkedSeries = [], o.bindAxes(), t(o, {
                name: i.name,
                state: "",
                pointAttr: {},
                visible: i.visible !== !1,
                selected: i.selected === !0
            }), Pe && (i.animation = !1), n = i.events;
            for (s in n) Ze(o, s, n[s]);
            (n && n.click || i.point && i.point.events && i.point.events.click || i.allowPointSelect) && (e.runTrackerClick = !0), o.getColor(), o.getSymbol(), Xe(o.parallelArrays, function(t) {
                o[t + "Data"] = []
            }), o.setData(i.data, !1), o.isCartesian && (e.hasCartesianSeries = !0), r.push(o), o._i = r.length - 1, S(r, a), this.yAxis && S(this.yAxis.series, a), Xe(r, function(t, e) {
                t.index = e, t.name = t.name || "Series " + (e + 1)
            })
        },
        bindAxes: function() {
            var t, e = this,
                i = e.options,
                s = e.chart;
            Xe(e.axisTypes || [], function(n) {
                Xe(s[n], function(s) {
                    t = s.options, (i[n] === t.index || i[n] !== B && i[n] === t.id || i[n] === B && 0 === t.index) && (s.series.push(e), e[n] = s, s.isDirty = !0)
                }), !e[n] && e.optionalAxis !== n && P(18, !0)
            })
        },
        updateParallelArrays: function(t, e) {
            var i = t.series,
                s = arguments;
            Xe(i.parallelArrays, "number" == typeof e ? function(s) {
                var n = "y" === s && i.toYData ? i.toYData(t) : t[s];
                i[s + "Data"][e] = n
            } : function(t) {
                Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(s, 2))
            })
        },
        autoIncrement: function() {
            var t = this.options,
                e = this.xIncrement,
                e = p(e, t.pointStart, 0);
            return this.pointInterval = p(this.pointInterval, t.pointInterval, 1), this.xIncrement = e + this.pointInterval, e
        },
        getSegments: function() {
            var t, e = -1,
                i = [],
                s = this.points,
                n = s.length;
            if (n)
                if (this.options.connectNulls) {
                    for (t = n; t--;) null === s[t].y && s.splice(t, 1);
                    s.length && (i = [s])
                } else Xe(s, function(t, o) {
                    null === t.y ? (o > e + 1 && i.push(s.slice(e + 1, o)), e = o) : o === n - 1 && i.push(s.slice(e + 1, o + 1))
                });
            this.segments = i
        },
        setOptions: function(t) {
            var i = this.chart,
                s = i.options.plotOptions,
                i = i.userOptions || {},
                n = i.plotOptions || {},
                o = s[this.type];
            return this.userOptions = t, s = e(o, s.series, t), this.tooltipOptions = e(W.tooltip, W.plotOptions[this.type].tooltip, i.tooltip, n.series && n.series.tooltip, n[this.type] && n[this.type].tooltip, t.tooltip), null === o.marker && delete s.marker, s
        },
        getColor: function() {
            var t, e = this.options,
                i = this.userOptions,
                s = this.chart.options.colors,
                n = this.chart.counters;
            t = e.color || ii[this.type].color, t || e.colorByPoint || (c(i._colorIndex) ? e = i._colorIndex : (i._colorIndex = n.color, e = n.color++), t = s[e]), this.color = t, n.wrapColor(s.length)
        },
        getSymbol: function() {
            var t = this.userOptions,
                e = this.options.marker,
                i = this.chart,
                s = i.options.symbols,
                i = i.counters;
            this.symbol = e.symbol, this.symbol || (c(t._symbolIndex) ? t = t._symbolIndex : (t._symbolIndex = i.symbol, t = i.symbol++), this.symbol = s[t]), /^url/.test(this.symbol) && (e.radius = 0), i.wrapSymbol(s.length)
        },
        drawLegendSymbol: We.drawLineMarker,
        setData: function(t, e, i, n) {
            var a, l = this,
                h = l.points,
                c = h && h.length || 0,
                d = l.options,
                u = l.chart,
                f = null,
                g = l.xAxis,
                m = g && !!g.categories,
                v = l.tooltipPoints,
                y = d.turboThreshold,
                x = this.xData,
                b = this.yData,
                w = (a = l.pointArrayMap) && a.length,
                t = t || [];
            if (a = t.length, e = p(e, !0), n === !1 || !a || c !== a || l.cropped || l.hasGroupedData) {
                if (l.xIncrement = null, l.pointRange = m ? 1 : d.pointRange, l.colorCounter = 0, Xe(this.parallelArrays, function(t) {
                        l[t + "Data"].length = 0
                    }), y && a > y) {
                    for (i = 0; null === f && a > i;) f = t[i], i++;
                    if (r(f)) {
                        for (m = p(d.pointStart, 0), d = p(d.pointInterval, 1), i = 0; a > i; i++) x[i] = m, b[i] = t[i], m += d;
                        l.xIncrement = m
                    } else if (o(f))
                        if (w)
                            for (i = 0; a > i; i++) d = t[i], x[i] = d[0], b[i] = d.slice(1, w + 1);
                        else
                            for (i = 0; a > i; i++) d = t[i], x[i] = d[0], b[i] = d[1];
                    else P(12)
                } else
                    for (i = 0; a > i; i++) t[i] !== B && (d = {
                        series: l
                    }, l.pointClass.prototype.applyOptions.apply(d, [t[i]]), l.updateParallelArrays(d, i), m && d.name) && (g.names[d.x] = d.name);
                for (s(b[0]) && P(14, !0), l.data = [], l.options.data = t, i = c; i--;) h[i] && h[i].destroy && h[i].destroy();
                v && (v.length = 0), g && (g.minRange = g.userMinRange), l.isDirty = l.isDirtyData = u.isDirtyBox = !0, i = !1
            } else Xe(t, function(t, e) {
                h[e].update(t, !1)
            });
            e && u.redraw(i)
        },
        processData: function(t) {
            var e, i = this.xData,
                s = this.yData,
                n = i.length;
            e = 0;
            var o, r, a, l, h = this.xAxis,
                c = this.options,
                d = c.cropThreshold,
                u = 0,
                p = this.isCartesian;
            if (p && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !t) return !1;
            for (p && this.sorted && (!d || n > d || this.forceCrop) && (a = h.min, l = h.max, i[n - 1] < a || i[0] > l ? (i = [], s = []) : (i[0] < a || i[n - 1] > l) && (e = this.cropData(this.xData, this.yData, a, l), i = e.xData, s = e.yData, e = e.start, o = !0, u = i.length)), n = i.length - 1; n >= 0; n--) t = i[n] - i[n - 1], !o && i[n] > a && i[n] < l && u++, t > 0 && (r === B || r > t) ? r = t : 0 > t && this.requireSorting && P(15);
            this.cropped = o, this.cropStart = e, this.processedXData = i, this.processedYData = s, this.activePointCount = u, null === c.pointRange && (this.pointRange = r || 1), this.closestPointRange = r
        },
        cropData: function(t, e, i, s) {
            var n, o = t.length,
                r = 0,
                a = o,
                l = p(this.cropShoulder, 1);
            for (n = 0; o > n; n++)
                if (t[n] >= i) {
                    r = ue(0, n - l);
                    break
                }
            for (; o > n; n++)
                if (t[n] > s) {
                    a = n + l;
                    break
                }
            return {
                xData: t.slice(r, a),
                yData: e.slice(r, a),
                start: r,
                end: a
            }
        },
        generatePoints: function() {
            var t, e, i, s, n = this.options.data,
                o = this.data,
                r = this.processedXData,
                a = this.processedYData,
                l = this.pointClass,
                h = r.length,
                c = this.cropStart || 0,
                d = this.hasGroupedData,
                p = [];
            for (o || d || (o = [], o.length = n.length, o = this.data = o), s = 0; h > s; s++) e = c + s, d ? p[s] = (new l).init(this, [r[s]].concat(u(a[s]))) : (o[e] ? i = o[e] : n[e] !== B && (o[e] = i = (new l).init(this, n[e], r[s])), p[s] = i);
            if (o && (h !== (t = o.length) || d))
                for (s = 0; t > s; s++) s === c && !d && (s += h), o[s] && (o[s].destroyElements(), o[s].plotX = B);
            this.data = o, this.points = p
        },
        getExtremes: function(t) {
            var e, i = this.yAxis,
                s = this.processedXData,
                n = [],
                o = 0;
            e = this.xAxis.getExtremes();
            var r, a, l, h, c = e.min,
                d = e.max,
                t = t || this.stackedYData || this.processedYData;
            for (e = t.length, h = 0; e > h; h++)
                if (a = s[h], l = t[h], r = null !== l && l !== B && (!i.isLog || l.length || l > 0), a = this.getExtremesFromAll || this.cropped || (s[h + 1] || a) >= c && (s[h - 1] || a) <= d, r && a)
                    if (r = l.length)
                        for (; r--;) null !== l[r] && (n[o++] = l[r]);
                    else n[o++] = l;
            this.dataMin = p(void 0, T(n)), this.dataMax = p(void 0, D(n))
        },
        translate: function() {
            this.processedXData || this.processData(), this.generatePoints();
            for (var t = this.options, e = t.stacking, i = this.xAxis, s = i.categories, n = this.yAxis, o = this.points, a = o.length, l = !!this.modifyValue, h = t.pointPlacement, d = "between" === h || r(h), u = t.threshold, t = 0; a > t; t++) {
                var f = o[t],
                    g = f.x,
                    m = f.y,
                    v = f.low,
                    y = e && n.stacks[(this.negStacks && u > m ? "-" : "") + this.stackKey];
                n.isLog && 0 >= m && (f.y = m = null), f.plotX = i.translate(g, 0, 0, 0, 1, h, "flags" === this.type), e && this.visible && y && y[g] && (y = y[g], m = y.points[this.index + "," + t], v = m[0], m = m[1], 0 === v && (v = p(u, n.min)), n.isLog && 0 >= v && (v = null), f.total = f.stackTotal = y.total, f.percentage = y.total && f.y / y.total * 100, f.stackY = m, y.setOffset(this.pointXOffset || 0, this.barW || 0)), f.yBottom = c(v) ? n.translate(v, 0, 1, 0, 1) : null, l && (m = this.modifyValue(m, f)), f.plotY = "number" == typeof m && 1 / 0 !== m ? n.translate(m, 0, 1, 0, 1) : B, f.clientX = d ? i.translate(g, 0, 0, 0, 1) : f.plotX, f.negative = f.y < (u || 0), f.category = s && s[f.x] !== B ? s[f.x] : f.x
            }
            this.getSegments()
        },
        animate: function(e) {
            var i, s = this.chart,
                o = s.renderer;
            i = this.options.animation;
            var r, a = this.clipBox || s.clipBox,
                l = s.inverted;
            i && !n(i) && (i = ii[this.type].animation), r = ["_sharedClip", i.duration, i.easing, a.height].join(","), e ? (e = s[r], i = s[r + "m"], e || (s[r] = e = o.clipRect(t(a, {
                width: 0
            })), s[r + "m"] = i = o.clipRect(-99, l ? -s.plotLeft : -s.plotTop, 99, l ? s.chartWidth : s.chartHeight)), this.group.clip(e), this.markerGroup.clip(i), this.sharedClipKey = r) : ((e = s[r]) && e.animate({
                width: s.plotSizeX
            }, i), s[r + "m"] && s[r + "m"].animate({
                width: s.plotSizeX + 99
            }, i), this.animate = null)
        },
        afterAnimate: function() {
            var t = this.chart,
                e = this.sharedClipKey,
                i = this.group,
                s = this.clipBox;
            i && this.options.clip !== !1 && (e && s || i.clip(s ? t.renderer.clipRect(s) : t.clipRect), this.markerGroup.clip()), Je(this, "afterAnimate"), setTimeout(function() {
                e && t[e] && (s || (t[e] = t[e].destroy()), t[e + "m"] && (t[e + "m"] = t[e + "m"].destroy()))
            }, 100)
        },
        drawPoints: function() {
            var e, i, s, n, o, r, a, l, h, c = this.points,
                d = this.chart;
            i = this.options.marker;
            var u, f = this.pointAttr[""],
                g = this.markerGroup,
                m = p(i.enabled, this.activePointCount < .5 * this.xAxis.len / i.radius);
            if (i.enabled !== !1 || this._hasPointMarkers)
                for (n = c.length; n--;) o = c[n], i = ce(o.plotX), s = o.plotY, h = o.graphic, a = o.marker || {}, e = m && a.enabled === B || a.enabled, u = d.isInsidePlot(he(i), s, d.inverted), e && s !== B && !isNaN(s) && null !== o.y ? (e = o.pointAttr[o.selected ? "select" : ""] || f, r = e.r, a = p(a.symbol, this.symbol), l = 0 === a.indexOf("url"), h ? h[u ? "show" : "hide"](!0).animate(t({
                    x: i - r,
                    y: s - r
                }, h.symbolName ? {
                    width: 2 * r,
                    height: 2 * r
                } : {})) : u && (r > 0 || l) && (o.graphic = d.renderer.symbol(a, i - r, s - r, 2 * r, 2 * r).attr(e).add(g))) : h && (o.graphic = h.destroy())
        },
        convertAttribs: function(t, e, i, s) {
            var n, o, r = this.pointAttrToOptions,
                a = {},
                t = t || {},
                e = e || {},
                i = i || {},
                s = s || {};
            for (n in r) o = r[n], a[n] = p(t[o], e[n], i[n], s[n]);
            return a
        },
        getAttribs: function() {
            var e, i = this,
                s = i.options,
                n = ii[i.type].marker ? s.marker : s,
                o = n.states,
                r = o.hover,
                a = i.color;
            e = {
                stroke: a,
                fill: a
            };
            var l, h, d = i.points || [],
                u = [],
                p = i.pointAttrToOptions;
            h = i.hasPointSpecificOptions;
            var f = s.negativeColor,
                g = n.lineColor,
                m = n.fillColor;
            l = s.turboThreshold;
            var v;
            if (s.marker ? (r.radius = r.radius || n.radius + 2, r.lineWidth = r.lineWidth || n.lineWidth + 1) : r.color = r.color || ri(r.color || a).brighten(r.brightness).get(), u[""] = i.convertAttribs(n, e), Xe(["hover", "select"], function(t) {
                    u[t] = i.convertAttribs(o[t], u[""])
                }), i.pointAttr = u, a = d.length, !l || l > a || h)
                for (; a--;) {
                    if (l = d[a], (n = l.options && l.options.marker || l.options) && n.enabled === !1 && (n.radius = 0), l.negative && f && (l.color = l.fillColor = f), h = s.colorByPoint || l.color, l.options)
                        for (v in p) c(n[p[v]]) && (h = !0);
                    h ? (n = n || {}, h = [], o = n.states || {}, e = o.hover = o.hover || {}, s.marker || (e.color = e.color || !l.options.color && r.color || ri(l.color).brighten(e.brightness || r.brightness).get()), e = {
                        color: l.color
                    }, m || (e.fillColor = l.color), g || (e.lineColor = l.color), h[""] = i.convertAttribs(t(e, n), u[""]), h.hover = i.convertAttribs(o.hover, u.hover, h[""]), h.select = i.convertAttribs(o.select, u.select, h[""])) : h = u, l.pointAttr = h
                }
        },
        destroy: function() {
            var t, e, i, s, n, o = this,
                r = o.chart,
                a = /AppleWebKit\/533/.test(xe),
                l = o.data || [];
            for (Je(o, "destroy"), Ke(o), Xe(o.axisTypes || [], function(t) {
                    (n = o[t]) && (h(n.series, o), n.isDirty = n.forceRedraw = !0)
                }), o.legendItem && o.chart.legend.destroyItem(o), e = l.length; e--;)(i = l[e]) && i.destroy && i.destroy();
            o.points = null, clearTimeout(o.animationTimeout), Xe("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(e) {
                o[e] && (t = a && "group" === e ? "hide" : "destroy", o[e][t]())
            }), r.hoverSeries === o && (r.hoverSeries = null), h(r.series, o);
            for (s in o) delete o[s]
        },
        getSegmentPath: function(t) {
            var e = this,
                i = [],
                s = e.options.step;
            return Xe(t, function(n, o) {
                var r, a = n.plotX,
                    l = n.plotY;
                e.getPointSpline ? i.push.apply(i, e.getPointSpline(t, n, o)) : (i.push(o ? "L" : "M"), s && o && (r = t[o - 1], "right" === s ? i.push(r.plotX, l) : "center" === s ? i.push((r.plotX + a) / 2, r.plotY, (r.plotX + a) / 2, l) : i.push(a, r.plotY)), i.push(n.plotX, n.plotY))
            }), i
        },
        getGraphPath: function() {
            var t, e = this,
                i = [],
                s = [];
            return Xe(e.segments, function(n) {
                t = e.getSegmentPath(n), n.length > 1 ? i = i.concat(t) : s.push(n[0])
            }), e.singlePoints = s, e.graphPath = i
        },
        drawGraph: function() {
            var t = this,
                e = this.options,
                i = [
                    ["graph", e.lineColor || this.color]
                ],
                s = e.lineWidth,
                n = e.dashStyle,
                o = "square" !== e.linecap,
                r = this.getGraphPath(),
                a = e.negativeColor;
            a && i.push(["graphNeg", a]), Xe(i, function(i, a) {
                var l = i[0],
                    h = t[l];
                h ? (ei(h), h.animate({
                    d: r
                })) : s && r.length && (h = {
                    stroke: i[1],
                    "stroke-width": s,
                    fill: He,
                    zIndex: 1
                }, n ? h.dashstyle = n : o && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), t[l] = t.chart.renderer.path(r).attr(h).add(t.group).shadow(!a && e.shadow))
            })
        },
        clipNeg: function() {
            var t, e = this.options,
                i = this.chart,
                s = i.renderer,
                n = e.negativeColor || e.negativeFillColor,
                o = this.graph,
                r = this.area,
                a = this.posClip,
                l = this.negClip;
            t = i.chartWidth;
            var h = i.chartHeight,
                c = ue(t, h),
                d = this.yAxis;
            n && (o || r) && (n = he(d.toPixels(e.threshold || 0, !0)), 0 > n && (c -= n), e = {
                x: 0,
                y: 0,
                width: c,
                height: n
            }, c = {
                x: 0,
                y: n,
                width: c,
                height: c
            }, i.inverted && (e.height = c.y = i.plotWidth - n, s.isVML && (e = {
                x: i.plotWidth - n - i.plotLeft,
                y: 0,
                width: t,
                height: h
            }, c = {
                x: n + i.plotLeft - t,
                y: 0,
                width: i.plotLeft + n,
                height: t
            })), d.reversed ? (i = c, t = e) : (i = e, t = c), a ? (a.animate(i), l.animate(t)) : (this.posClip = a = s.clipRect(i), this.negClip = l = s.clipRect(t), o && this.graphNeg && (o.clip(a), this.graphNeg.clip(l)), r && (r.clip(a), this.areaNeg.clip(l))))
        },
        invertGroups: function() {
            function t() {
                var t = {
                    width: e.yAxis.len,
                    height: e.xAxis.len
                };
                Xe(["group", "markerGroup"], function(i) {
                    e[i] && e[i].attr(t).invert()
                })
            }
            var e = this,
                i = e.chart;
            e.xAxis && (Ze(i, "resize", t), Ze(e, "destroy", function() {
                Ke(i, "resize", t)
            }), t(), e.invertGroups = t)
        },
        plotGroup: function(t, e, i, s, n) {
            var o = this[t],
                r = !o;
            return r && (this[t] = o = this.chart.renderer.g(e).attr({
                visibility: i,
                zIndex: s || .1
            }).add(n)), o[r ? "attr" : "animate"](this.getPlotBox()), o
        },
        getPlotBox: function() {
            var t = this.chart,
                e = this.xAxis,
                i = this.yAxis;
            return t.inverted && (e = i, i = this.xAxis), {
                translateX: e ? e.left : t.plotLeft,
                translateY: i ? i.top : t.plotTop,
                scaleX: 1,
                scaleY: 1
            }
        },
        render: function() {
            var t, e = this,
                i = e.chart,
                s = e.options,
                n = (t = s.animation) && !!e.animate && i.renderer.isSVG && p(t.duration, 500) || 0,
                o = e.visible ? "visible" : "hidden",
                r = s.zIndex,
                a = e.hasRendered,
                l = i.seriesGroup;
            t = e.plotGroup("group", "series", o, r, l), e.markerGroup = e.plotGroup("markerGroup", "markers", o, r, l), n && e.animate(!0), e.getAttribs(), t.inverted = e.isCartesian ? i.inverted : !1, e.drawGraph && (e.drawGraph(), e.clipNeg()), e.drawDataLabels && e.drawDataLabels(), e.visible && e.drawPoints(), e.drawTracker && e.options.enableMouseTracking !== !1 && e.drawTracker(), i.inverted && e.invertGroups(), s.clip !== !1 && !e.sharedClipKey && !a && t.clip(i.clipRect), n && e.animate(), a || (n ? e.animationTimeout = setTimeout(function() {
                e.afterAnimate()
            }, n) : e.afterAnimate()), e.isDirty = e.isDirtyData = !1, e.hasRendered = !0
        },
        redraw: function() {
            var t = this.chart,
                e = this.isDirtyData,
                i = this.group,
                s = this.xAxis,
                n = this.yAxis;
            i && (t.inverted && i.attr({
                width: t.plotWidth,
                height: t.plotHeight
            }), i.animate({
                translateX: p(s && s.left, t.plotLeft),
                translateY: p(n && n.top, t.plotTop)
            })), this.translate(), this.setTooltipPoints && this.setTooltipPoints(!0), this.render(), e && Je(this, "updatedData")
        }
    }, F.prototype = {
        destroy: function() {
            M(this, this.axis)
        },
        render: function(t) {
            var e = this.options,
                i = e.format,
                i = i ? b(i, this) : e.formatter.call(this);
            this.label ? this.label.attr({
                text: i,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(i, null, null, e.useHTML).css(e.style).attr({
                align: this.textAlign,
                rotation: e.rotation,
                visibility: "hidden"
            }).add(t)
        },
        setOffset: function(t, e) {
            var i = this.axis,
                s = i.chart,
                n = s.inverted,
                o = this.isNegative,
                r = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                i = i.translate(0),
                i = fe(r - i),
                a = s.xAxis[0].translate(this.x) + t,
                l = s.plotHeight,
                o = {
                    x: n ? o ? r : r - i : a,
                    y: n ? l - a - e : o ? l - r - i : l - r,
                    width: n ? i : e,
                    height: n ? e : i
                };
            (n = this.label) && (n.align(this.alignOptions, null, o), o = n.alignAttr, n[this.options.crop === !1 || s.isInsidePlot(o.x, o.y) ? "show" : "hide"](!0))
        }
    }, _.prototype.buildStacks = function() {
        var t = this.series,
            e = p(this.options.reversedStacks, !0),
            i = t.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; i--;) t[e ? i : t.length - i - 1].setStackedPoints();
            if (this.usePercentage)
                for (i = 0; i < t.length; i++) t[i].setPercentStacks()
        }
    }, _.prototype.renderStackTotals = function() {
        var t, e, i = this.chart,
            s = i.renderer,
            n = this.stacks,
            o = this.stackTotalGroup;
        o || (this.stackTotalGroup = o = s.g("stack-labels").attr({
            visibility: "visible",
            zIndex: 6
        }).add()), o.translate(i.plotLeft, i.plotTop);
        for (t in n)
            for (e in i = n[t]) i[e].render(o)
    }, bi.prototype.setStackedPoints = function() {
        if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
            var t, e, i, s, n, o, r = this.processedXData,
                a = this.processedYData,
                l = [],
                h = a.length,
                c = this.options,
                d = c.threshold,
                u = c.stack,
                c = c.stacking,
                p = this.stackKey,
                f = "-" + p,
                g = this.negStacks,
                m = this.yAxis,
                v = m.stacks,
                y = m.oldStacks;
            for (s = 0; h > s; s++) n = r[s], o = a[s], i = this.index + "," + s, e = (t = g && d > o) ? f : p, v[e] || (v[e] = {}), v[e][n] || (y[e] && y[e][n] ? (v[e][n] = y[e][n], v[e][n].total = null) : v[e][n] = new F(m, m.options.stackLabels, t, n, u)), e = v[e][n], e.points[i] = [e.cum || 0], "percent" === c ? (t = t ? p : f, g && v[t] && v[t][n] ? (t = v[t][n], e.total = t.total = ue(t.total, e.total) + fe(o) || 0) : e.total = L(e.total + (fe(o) || 0))) : e.total = L(e.total + (o || 0)), e.cum = (e.cum || 0) + (o || 0), e.points[i].push(e.cum), l[s] = e.cum;
            "percent" === c && (m.usePercentage = !0), this.stackedYData = l, m.oldStacks = {}
        }
    }, bi.prototype.setPercentStacks = function() {
        var t = this,
            e = t.stackKey,
            i = t.yAxis.stacks,
            s = t.processedXData;
        Xe([e, "-" + e], function(e) {
            for (var n, o, r, a = s.length; a--;) o = s[a], n = (r = i[e] && i[e][o]) && r.points[t.index + "," + a], (o = n) && (r = r.total ? 100 / r.total : 0, o[0] = L(o[0] * r), o[1] = L(o[1] * r), t.stackedYData[a] = o[1])
        })
    }, t(H.prototype, {
        addSeries: function(t, e, i) {
            var s, n = this;
            return t && (e = p(e, !0), Je(n, "addSeries", {
                options: t
            }, function() {
                s = n.initSeries(t), n.isDirtyLegend = !0, n.linkSeries(), e && n.redraw(i)
            })), s
        },
        addAxis: function(t, i, s, n) {
            var o = i ? "xAxis" : "yAxis",
                r = this.options;
            new _(this, e(t, {
                index: this[o].length,
                isX: i
            })), r[o] = u(r[o] || {}), r[o].push(t), p(s, !0) && this.redraw(n)
        },
        showLoading: function(e) {
            var i = this.options,
                s = this.loadingDiv,
                n = i.loading;
            s || (this.loadingDiv = s = g(_e, {
                className: "highcharts-loading"
            }, t(n.style, {
                zIndex: 10,
                display: He
            }), this.container), this.loadingSpan = g("span", null, n.labelStyle, s)), this.loadingSpan.innerHTML = e || i.lang.loading, this.loadingShown || (f(s, {
                opacity: 0,
                display: "",
                left: this.plotLeft + "px",
                top: this.plotTop + "px",
                width: this.plotWidth + "px",
                height: this.plotHeight + "px"
            }), ti(s, {
                opacity: n.style.opacity
            }, {
                duration: n.showDuration || 0
            }), this.loadingShown = !0)
        },
        hideLoading: function() {
            var t = this.options,
                e = this.loadingDiv;
            e && ti(e, {
                opacity: 0
            }, {
                duration: t.loading.hideDuration || 100,
                complete: function() {
                    f(e, {
                        display: He
                    })
                }
            }), this.loadingShown = !1
        }
    }), t(xi.prototype, {
        update: function(t, e, i) {
            var s, o = this,
                r = o.series,
                a = o.graphic,
                l = r.data,
                h = r.chart,
                c = r.options,
                e = p(e, !0);
            o.firePointEvent("update", {
                options: t
            }, function() {
                o.applyOptions(t), n(t) && (r.getAttribs(), a && (t && t.marker && t.marker.symbol ? o.graphic = a.destroy() : a.attr(o.pointAttr[o.state || ""])), t && t.dataLabels && o.dataLabel && (o.dataLabel = o.dataLabel.destroy())), s = Ue(o, l), r.updateParallelArrays(o, s), c.data[s] = o.options, r.isDirty = r.isDirtyData = !0, !r.fixedBox && r.hasCartesianSeries && (h.isDirtyBox = !0), "point" === c.legendType && h.legend.destroyItem(o), e && h.redraw(i)
            })
        },
        remove: function(t, e) {
            var i, s = this,
                n = s.series,
                o = n.points,
                r = n.chart,
                a = n.data;
            I(e, r), t = p(t, !0), s.firePointEvent("remove", null, function() {
                i = Ue(s, a), a.length === o.length && o.splice(i, 1), a.splice(i, 1), n.options.data.splice(i, 1), n.updateParallelArrays(s, "splice", i, 1), s.destroy(), n.isDirty = !0, n.isDirtyData = !0, t && r.redraw()
            })
        }
    }), t(bi.prototype, {
        addPoint: function(t, e, i, s) {
            var n, o = this.options,
                r = this.data,
                a = this.graph,
                l = this.area,
                h = this.chart,
                c = this.xAxis && this.xAxis.names,
                d = a && a.shift || 0,
                u = o.data,
                f = this.xData;
            if (I(s, h), i && Xe([a, l, this.graphNeg, this.areaNeg], function(t) {
                    t && (t.shift = d + 1)
                }), l && (l.isArea = !0), e = p(e, !0), s = {
                    series: this
                }, this.pointClass.prototype.applyOptions.apply(s, [t]), a = s.x, l = f.length, this.requireSorting && a < f[l - 1])
                for (n = !0; l && f[l - 1] > a;) l--;
            this.updateParallelArrays(s, "splice", l, 0, 0), this.updateParallelArrays(s, l), c && (c[a] = s.name), u.splice(l, 0, t), n && (this.data.splice(l, 0, null), this.processData()), "point" === o.legendType && this.generatePoints(), i && (r[0] && r[0].remove ? r[0].remove(!1) : (r.shift(), this.updateParallelArrays(s, "shift"), u.shift())), this.isDirtyData = this.isDirty = !0, e && (this.getAttribs(), h.redraw())
        },
        remove: function(t, e) {
            var i = this,
                s = i.chart,
                t = p(t, !0);
            i.isRemoving || (i.isRemoving = !0, Je(i, "remove", null, function() {
                i.destroy(), s.isDirtyLegend = s.isDirtyBox = !0, s.linkSeries(), t && s.redraw(e)
            })), i.isRemoving = !1
        },
        update: function(i, s) {
            var n, o = this.chart,
                r = this.type,
                a = $e[r].prototype,
                i = e(this.userOptions, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, i);
            this.remove(!1);
            for (n in a) a.hasOwnProperty(n) && (this[n] = B);
            t(this, $e[i.type || r].prototype), this.init(o, i), p(s, !0) && o.redraw(!1)
        }
    }), t(_.prototype, {
        update: function(i, s) {
            var n = this.chart,
                i = n.options[this.coll][this.options.index] = e(this.userOptions, i);
            this.destroy(!0), this._addedPlotLB = B, this.init(n, t(i, {
                events: B
            })), n.isDirtyBox = !0, p(s, !0) && n.redraw()
        },
        remove: function(t) {
            for (var e = this.chart, i = this.coll, s = this.series, n = s.length; n--;) s[n] && s[n].remove(!1);
            h(e.axes, this), h(e[i], this), e.options[i].splice(this.options.index, 1), Xe(e[i], function(t, e) {
                t.options.index = e
            }), this.destroy(), e.isDirtyBox = !0, p(t, !0) && e.redraw()
        },
        setTitle: function(t, e) {
            this.update({
                title: t
            }, e)
        },
        setCategories: function(t, e) {
            this.update({
                categories: t
            }, e)
        }
    }), hi = m(bi), $e.line = hi, ii.area = e(Ne, {
        threshold: 0
    });
    var wi = m(bi, {
        type: "area",
        getSegments: function() {
            var t, e, i, s, n, o = [],
                r = [],
                a = [],
                l = this.xAxis,
                h = this.yAxis,
                c = h.stacks[this.stackKey],
                d = {},
                u = this.points,
                p = this.options.connectNulls;
            if (this.options.stacking && !this.cropped) {
                for (s = 0; s < u.length; s++) d[u[s].x] = u[s];
                for (n in c) null !== c[n].total && a.push(+n);
                a.sort(function(t, e) {
                    return t - e
                }), Xe(a, function(s) {
                    (!p || d[s] && null !== d[s].y) && (d[s] ? r.push(d[s]) : (t = l.translate(s), i = c[s].percent ? c[s].total ? 100 * c[s].cum / c[s].total : 0 : c[s].cum, e = h.toPixels(i, !0), r.push({
                        y: null,
                        plotX: t,
                        clientX: t,
                        plotY: e,
                        yBottom: e,
                        onMouseOver: ze
                    })))
                }), r.length && o.push(r)
            } else bi.prototype.getSegments.call(this), o = this.segments;
            this.segments = o
        },
        getSegmentPath: function(t) {
            var e, i = bi.prototype.getSegmentPath.call(this, t),
                s = [].concat(i),
                n = this.options;
            e = i.length;
            var o, r = this.yAxis.getThreshold(n.threshold);
            if (3 === e && s.push("L", i[1], i[2]), n.stacking && !this.closedStacks)
                for (e = t.length - 1; e >= 0; e--) o = p(t[e].yBottom, r), e < t.length - 1 && n.step && s.push(t[e + 1].plotX, o), s.push(t[e].plotX, o);
            else this.closeSegment(s, t, r);
            return this.areaPath = this.areaPath.concat(s), i
        },
        closeSegment: function(t, e, i) {
            t.push("L", e[e.length - 1].plotX, i, "L", e[0].plotX, i)
        },
        drawGraph: function() {
            this.areaPath = [], bi.prototype.drawGraph.apply(this);
            var t = this,
                e = this.areaPath,
                i = this.options,
                s = i.negativeColor,
                n = i.negativeFillColor,
                o = [
                    ["area", this.color, i.fillColor]
                ];
            (s || n) && o.push(["areaNeg", s, n]), Xe(o, function(s) {
                var n = s[0],
                    o = t[n];
                o ? o.animate({
                    d: e
                }) : t[n] = t.chart.renderer.path(e).attr({
                    fill: p(s[2], ri(s[1]).setOpacity(p(i.fillOpacity, .75)).get()),
                    zIndex: 0
                }).add(t.group)
            })
        },
        drawLegendSymbol: We.drawRectangle
    });
    $e.area = wi, ii.spline = e(Ne), hi = m(bi, {
        type: "spline",
        getPointSpline: function(t, e, i) {
            var s, n, o, r, a = e.plotX,
                l = e.plotY,
                h = t[i - 1],
                c = t[i + 1];
            if (h && c) {
                t = h.plotY, o = c.plotX;
                var d, c = c.plotY;
                s = (1.5 * a + h.plotX) / 2.5, n = (1.5 * l + t) / 2.5, o = (1.5 * a + o) / 2.5, r = (1.5 * l + c) / 2.5, d = (r - n) * (o - a) / (o - s) + l - r, n += d, r += d, n > t && n > l ? (n = ue(t, l), r = 2 * l - n) : t > n && l > n && (n = pe(t, l), r = 2 * l - n), r > c && r > l ? (r = ue(c, l), n = 2 * l - r) : c > r && l > r && (r = pe(c, l), n = 2 * l - r), e.rightContX = o, e.rightContY = r
            }
            return i ? (e = ["C", h.rightContX || h.plotX, h.rightContY || h.plotY, s || a, n || l, a, l], h.rightContX = h.rightContY = null) : e = ["M", a, l], e
        }
    }), $e.spline = hi, ii.areaspline = e(ii.area), wi = wi.prototype, hi = m(hi, {
        type: "areaspline",
        closedStacks: !0,
        getSegmentPath: wi.getSegmentPath,
        closeSegment: wi.closeSegment,
        drawGraph: wi.drawGraph,
        drawLegendSymbol: We.drawRectangle
    }), $e.areaspline = hi, ii.column = e(Ne, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: .2,
        marker: null,
        pointPadding: .1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {
                brightness: .1,
                shadow: !1,
                halo: !1
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: !1
            }
        },
        dataLabels: {
            align: null,
            verticalAlign: null,
            y: null
        },
        stickyTracking: !1,
        tooltip: {
            distance: 6
        },
        threshold: 0
    }), hi = m(bi, {
        type: "column",
        pointAttrToOptions: {
            stroke: "borderColor",
            fill: "color",
            r: "borderRadius"
        },
        cropShoulder: 0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function() {
            bi.prototype.init.apply(this, arguments);
            var t = this,
                e = t.chart;
            e.hasRendered && Xe(e.series, function(e) {
                e.type === t.type && (e.isDirty = !0)
            })
        },
        getColumnMetrics: function() {
            var t, e, i = this,
                s = i.options,
                n = i.xAxis,
                o = i.yAxis,
                r = n.reversed,
                a = {},
                l = 0;
            s.grouping === !1 ? l = 1 : Xe(i.chart.series, function(s) {
                var n = s.options,
                    r = s.yAxis;
                s.type === i.type && s.visible && o.len === r.len && o.pos === r.pos && (n.stacking ? (t = s.stackKey, a[t] === B && (a[t] = l++), e = a[t]) : n.grouping !== !1 && (e = l++), s.columnIndex = e)
            });
            var n = pe(fe(n.transA) * (n.ordinalSlope || s.pointRange || n.closestPointRange || n.tickInterval || 1), n.len),
                h = n * s.groupPadding,
                d = (n - 2 * h) / l,
                u = s.pointWidth,
                s = c(u) ? (d - u) / 2 : d * s.pointPadding,
                u = p(u, d - 2 * s);
            return i.columnMetrics = {
                width: u,
                offset: s + (h + ((r ? l - (i.columnIndex || 0) : i.columnIndex) || 0) * d - n / 2) * (r ? -1 : 1)
            }
        },
        translate: function() {
            var t = this,
                e = t.chart,
                i = t.options,
                s = t.borderWidth = p(i.borderWidth, t.activePointCount > .5 * t.xAxis.len ? 0 : 1),
                n = t.yAxis,
                o = t.translatedThreshold = n.getThreshold(i.threshold),
                r = p(i.minPointLength, 5),
                i = t.getColumnMetrics(),
                a = i.width,
                l = t.barW = de(ue(a, 1 + 2 * s)),
                h = t.pointXOffset = i.offset,
                c = -(s % 2 ? .5 : 0),
                d = s % 2 ? .5 : 1;
            e.renderer.isVML && e.inverted && (d += 1), bi.prototype.translate.apply(t), Xe(t.points, function(i) {
                var s, u = p(i.yBottom, o),
                    f = pe(ue(-999 - u, i.plotY), n.len + 999 + u),
                    g = i.plotX + h,
                    m = l,
                    v = pe(f, u);
                s = ue(f, u) - v, fe(s) < r && r && (s = r, v = he(fe(v - o) > r ? u - r : o - (n.translate(i.y, 0, 1, 0, 1) <= o ? r : 0))), i.barX = g, i.pointWidth = a, i.tooltipPos = e.inverted ? [n.len - f, t.xAxis.len - g - m / 2] : [g + m / 2, f], u = fe(g) < .5, m = he(g + m) + c, g = he(g) + c, m -= g, f = fe(v) < .5, s = he(v + s) + d, v = he(v) + d, s -= v, u && (g += 1, m -= 1), f && (v -= 1, s += 1), i.shapeType = "rect", i.shapeArgs = {
                    x: g,
                    y: v,
                    width: m,
                    height: s
                }
            })
        },
        getSymbol: ze,
        drawLegendSymbol: We.drawRectangle,
        drawGraph: ze,
        drawPoints: function() {
            var t, i, s, n = this,
                o = this.chart,
                r = n.options,
                a = o.renderer,
                l = r.animationLimit || 250;
            Xe(n.points, function(h) {
                var d = h.plotY,
                    u = h.graphic;
                d === B || isNaN(d) || null === h.y ? u && (h.graphic = u.destroy()) : (t = h.shapeArgs, s = c(n.borderWidth) ? {
                    "stroke-width": n.borderWidth
                } : {}, i = h.pointAttr[h.selected ? "select" : ""] || n.pointAttr[""], u ? (ei(u), u.attr(s)[o.pointCount < l ? "animate" : "attr"](e(t))) : h.graphic = a[h.shapeType](t).attr(i).attr(s).add(n.group).shadow(r.shadow, null, r.stacking && !r.borderRadius))
            })
        },
        animate: function(t) {
            var e = this.yAxis,
                i = this.options,
                s = this.chart.inverted,
                n = {};
            Me && (t ? (n.scaleY = .001, t = pe(e.pos + e.len, ue(e.pos, e.toPixels(i.threshold))), s ? n.translateX = t - e.len : n.translateY = t, this.group.attr(n)) : (n.scaleY = 1, n[s ? "translateX" : "translateY"] = e.pos, this.group.animate(n, this.options.animation), this.animate = null))
        },
        remove: function() {
            var t = this,
                e = t.chart;
            e.hasRendered && Xe(e.series, function(e) {
                e.type === t.type && (e.isDirty = !0)
            }), bi.prototype.remove.apply(t, arguments)
        }
    }), $e.column = hi, ii.bar = e(ii.column), wi = m(hi, {
        type: "bar",
        inverted: !0
    }), $e.bar = wi, ii.scatter = e(Ne, {
        lineWidth: 0,
        tooltip: {
            headerFormat: '<span style="color:{series.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
        },
        stickyTracking: !1
    }), wi = m(bi, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["markerGroup"],
        takeOrdinalPosition: !1,
        singularTooltips: !0,
        drawGraph: function() {
            this.options.lineWidth && bi.prototype.drawGraph.call(this)
        }
    }), $e.scatter = wi, ii.pie = e(Ne, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30,
            enabled: !0,
            formatter: function() {
                return this.point.name
            }
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {
            hover: {
                brightness: .1,
                shadow: !1
            }
        },
        stickyTracking: !1,
        tooltip: {
            followPointer: !0
        }
    }), Ne = {
        type: "pie",
        isCartesian: !1,
        pointClass: m(xi, {
            init: function() {
                xi.prototype.init.apply(this, arguments);
                var e, i = this;
                return i.y < 0 && (i.y = null), t(i, {
                    visible: i.visible !== !1,
                    name: p(i.name, "Slice")
                }), e = function(t) {
                    i.slice("select" === t.type)
                }, Ze(i, "select", e), Ze(i, "unselect", e), i
            },
            setVisible: function(t) {
                var e = this,
                    i = e.series,
                    s = i.chart;
                e.visible = e.options.visible = t = t === B ? !e.visible : t, i.options.data[Ue(e, i.data)] = e.options, Xe(["graphic", "dataLabel", "connector", "shadowGroup"], function(i) {
                    e[i] && e[i][t ? "show" : "hide"](!0)
                }), e.legendItem && s.legend.colorizeItem(e, t), !i.isDirty && i.options.ignoreHiddenPoint && (i.isDirty = !0, s.redraw())
            },
            slice: function(t, e, i) {
                var s = this.series;
                I(i, s.chart), p(e, !0), this.sliced = this.options.sliced = t = c(t) ? t : !this.sliced, s.options.data[Ue(this, s.data)] = this.options, t = t ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }, this.graphic.animate(t), this.shadowGroup && this.shadowGroup.animate(t)
            },
            haloPath: function(t) {
                var e = this.shapeArgs,
                    i = this.series.chart;
                return this.series.chart.renderer.symbols.arc(i.plotLeft + e.x, i.plotTop + e.y, e.r + t, e.r + t, {
                    innerR: this.shapeArgs.r,
                    start: e.start,
                    end: e.end
                })
            }
        }),
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color"
        },
        singularTooltips: !0,
        getColor: ze,
        animate: function(t) {
            var e = this,
                i = e.points,
                s = e.startAngleRad;
            t || (Xe(i, function(t) {
                var i = t.graphic,
                    t = t.shapeArgs;
                i && (i.attr({
                    r: e.center[3] / 2,
                    start: s,
                    end: s
                }), i.animate({
                    r: t.r,
                    start: t.start,
                    end: t.end
                }, e.options.animation))
            }), e.animate = null)
        },
        setData: function(t, e, i, s) {
            bi.prototype.setData.call(this, t, !1, i, s), this.processData(), this.generatePoints(), p(e, !0) && this.chart.redraw(i)
        },
        generatePoints: function() {
            var t, e, i, s, n = 0,
                o = this.options.ignoreHiddenPoint;
            for (bi.prototype.generatePoints.call(this), e = this.points, i = e.length, t = 0; i > t; t++) s = e[t], n += o && !s.visible ? 0 : s.y;
            for (this.total = n, t = 0; i > t; t++) s = e[t], s.percentage = n > 0 ? s.y / n * 100 : 0, s.total = n
        },
        translate: function(t) {
            this.generatePoints();
            var e, i, s, n, o, r = 0,
                a = this.options,
                l = a.slicedOffset,
                h = l + a.borderWidth,
                c = a.startAngle || 0,
                d = this.startAngleRad = ve / 180 * (c - 90),
                c = (this.endAngleRad = ve / 180 * (p(a.endAngle, c + 360) - 90)) - d,
                u = this.points,
                f = a.dataLabels.distance,
                a = a.ignoreHiddenPoint,
                g = u.length;
            for (t || (this.center = t = this.getCenter()), this.getX = function(e, i) {
                    return s = le.asin(pe((e - t[1]) / (t[2] / 2 + f), 1)), t[0] + (i ? -1 : 1) * ge(s) * (t[2] / 2 + f)
                }, n = 0; g > n; n++) o = u[n], e = d + r * c, (!a || o.visible) && (r += o.percentage / 100), i = d + r * c, o.shapeType = "arc", o.shapeArgs = {
                x: t[0],
                y: t[1],
                r: t[2] / 2,
                innerR: t[3] / 2,
                start: he(1e3 * e) / 1e3,
                end: he(1e3 * i) / 1e3
            }, s = (i + e) / 2, s > 1.5 * ve ? s -= 2 * ve : -ve / 2 > s && (s += 2 * ve), o.slicedTranslation = {
                translateX: he(ge(s) * l),
                translateY: he(me(s) * l)
            }, e = ge(s) * t[2] / 2, i = me(s) * t[2] / 2, o.tooltipPos = [t[0] + .7 * e, t[1] + .7 * i], o.half = -ve / 2 > s || s > ve / 2 ? 1 : 0, o.angle = s, h = pe(h, f / 2), o.labelPos = [t[0] + e + ge(s) * f, t[1] + i + me(s) * f, t[0] + e + ge(s) * h, t[1] + i + me(s) * h, t[0] + e, t[1] + i, 0 > f ? "center" : o.half ? "right" : "left", s]
        },
        drawGraph: null,
        drawPoints: function() {
            var e, i, s, n, o = this,
                r = o.chart.renderer,
                a = o.options.shadow;
            a && !o.shadowGroup && (o.shadowGroup = r.g("shadow").add(o.group)), Xe(o.points, function(l) {
                i = l.graphic, n = l.shapeArgs, s = l.shadowGroup, a && !s && (s = l.shadowGroup = r.g("shadow").add(o.shadowGroup)), e = l.sliced ? l.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }, s && s.attr(e), i ? i.animate(t(n, e)) : l.graphic = i = r[l.shapeType](n).setRadialReference(o.center).attr(l.pointAttr[l.selected ? "select" : ""]).attr({
                    "stroke-linejoin": "round"
                }).attr(e).add(o.group).shadow(a, s), void 0 !== l.visible && l.setVisible(l.visible)
            })
        },
        sortByAngle: function(t, e) {
            t.sort(function(t, i) {
                return void 0 !== t.angle && (i.angle - t.angle) * e
            })
        },
        drawLegendSymbol: We.drawRectangle,
        getCenter: li.getCenter,
        getSymbol: ze
    }, Ne = m(bi, Ne), $e.pie = Ne, bi.prototype.drawDataLabels = function() {
        var i, s, n, o, r = this,
            a = r.options,
            l = a.cursor,
            h = a.dataLabels,
            d = r.points;
        (h.enabled || r._hasPointLabels) && (r.dlProcessOptions && r.dlProcessOptions(h), o = r.plotGroup("dataLabelsGroup", "data-labels", "hidden", h.zIndex || 6), !r.hasRendered && p(h.defer, !0) && (o.attr({
            opacity: 0
        }), Ze(r, "afterAnimate", function() {
            r.dataLabelsGroup.show()[a.animation ? "animate" : "attr"]({
                opacity: 1
            }, {
                duration: 200
            })
        })), s = h, Xe(d, function(a) {
            var d, u, f, g = a.dataLabel,
                m = a.connector,
                v = !0;
            if (i = a.options && a.options.dataLabels, d = p(i && i.enabled, s.enabled), g && !d) a.dataLabel = g.destroy();
            else if (d) {
                if (h = e(s, i), d = h.rotation, u = a.getLabelConfig(), n = h.format ? b(h.format, u) : h.formatter.call(u, h), h.style.color = p(h.color, h.style.color, r.color, "black"), g) c(n) ? (g.attr({
                    text: n
                }), v = !1) : (a.dataLabel = g = g.destroy(), m && (a.connector = m.destroy()));
                else if (c(n)) {
                    g = {
                        fill: h.backgroundColor,
                        stroke: h.borderColor,
                        "stroke-width": h.borderWidth,
                        r: h.borderRadius || 0,
                        rotation: d,
                        padding: h.padding,
                        zIndex: 1
                    };
                    for (f in g) g[f] === B && delete g[f];
                    g = a.dataLabel = r.chart.renderer[d ? "text" : "label"](n, 0, -999, null, null, null, h.useHTML).attr(g).css(t(h.style, l && {
                        cursor: l
                    })).add(o).shadow(h.shadow)
                }
                g && r.alignDataLabel(a, g, h, null, v)
            }
        }))
    }, bi.prototype.alignDataLabel = function(e, i, s, n, o) {
        var r = this.chart,
            a = r.inverted,
            l = p(e.plotX, -999),
            h = p(e.plotY, -999),
            c = i.getBBox();
        (e = this.visible && (e.series.forceDL || r.isInsidePlot(l, he(h), a) || n && r.isInsidePlot(l, a ? n.x + 1 : n.y + n.height - 1, a))) && (n = t({
            x: a ? r.plotWidth - h : l,
            y: he(a ? r.plotHeight - l : h),
            width: 0,
            height: 0
        }, n), t(s, {
            width: c.width,
            height: c.height
        }), s.rotation ? (a = {
            align: s.align,
            x: n.x + s.x + n.width / 2,
            y: n.y + s.y + n.height / 2
        }, i[o ? "attr" : "animate"](a)) : (i.align(s, null, n), a = i.alignAttr, "justify" === p(s.overflow, "justify") ? this.justifyDataLabel(i, s, a, c, n, o) : p(s.crop, !0) && (e = r.isInsidePlot(a.x, a.y) && r.isInsidePlot(a.x + c.width, a.y + c.height)))), e || (i.attr({
            y: -999
        }), i.placed = !1)
    }, bi.prototype.justifyDataLabel = function(t, e, i, s, n, o) {
        var r, a, l = this.chart,
            h = e.align,
            c = e.verticalAlign;
        r = i.x, 0 > r && ("right" === h ? e.align = "left" : e.x = -r, a = !0), r = i.x + s.width, r > l.plotWidth && ("left" === h ? e.align = "right" : e.x = l.plotWidth - r, a = !0), r = i.y, 0 > r && ("bottom" === c ? e.verticalAlign = "top" : e.y = -r, a = !0), r = i.y + s.height, r > l.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = l.plotHeight - r, a = !0), a && (t.placed = !o, t.align(e, null, n))
    }, $e.pie && ($e.pie.prototype.drawDataLabels = function() {
        var t, e, i, s, n, o, r, a, l, h, c, d, u = this,
            f = u.data,
            g = u.chart,
            m = u.options.dataLabels,
            v = p(m.connectorPadding, 10),
            y = p(m.connectorWidth, 1),
            x = g.plotWidth,
            g = g.plotHeight,
            b = p(m.softConnector, !0),
            w = m.distance,
            k = u.center,
            C = k[2] / 2,
            S = k[1],
            T = w > 0,
            M = [
                [],
                []
            ],
            A = [0, 0, 0, 0],
            P = function(t, e) {
                return e.y - t.y
            };
        if (u.visible && (m.enabled || u._hasPointLabels)) {
            for (bi.prototype.drawDataLabels.apply(u), Xe(f, function(t) {
                    t.dataLabel && t.visible && M[t.half].push(t)
                }), c = 0; !r && f[c];) r = f[c] && f[c].dataLabel && (f[c].dataLabel.getBBox().height || 21), c++;
            for (c = 2; c--;) {
                var L, f = [],
                    I = [],
                    z = M[c],
                    O = z.length;
                if (u.sortByAngle(z, c - .5), w > 0) {
                    for (d = S - C - w; S + C + w >= d; d += r) f.push(d);
                    if (n = f.length, O > n) {
                        for (t = [].concat(z), t.sort(P), d = O; d--;) t[d].rank = d;
                        for (d = O; d--;) z[d].rank >= n && z.splice(d, 1);
                        O = z.length
                    }
                    for (d = 0; O > d; d++) {
                        t = z[d], o = t.labelPos, t = 9999;
                        var E, _;
                        for (_ = 0; n > _; _++) E = fe(f[_] - o[1]), t > E && (t = E, L = _);
                        if (d > L && null !== f[d]) L = d;
                        else
                            for (O - d + L > n && null !== f[d] && (L = n - O + d); null === f[L];) L++;
                        I.push({
                            i: L,
                            y: f[L]
                        }), f[L] = null
                    }
                    I.sort(P)
                }
                for (d = 0; O > d; d++) t = z[d], o = t.labelPos, s = t.dataLabel, h = t.visible === !1 ? "hidden" : "visible", t = o[1], w > 0 ? (n = I.pop(), L = n.i, l = n.y, (t > l && null !== f[L + 1] || l > t && null !== f[L - 1]) && (l = t)) : l = t, a = m.justify ? k[0] + (c ? -1 : 1) * (C + w) : u.getX(0 === L || L === f.length - 1 ? t : l, c), s._attr = {
                    visibility: h,
                    align: o[6]
                }, s._pos = {
                    x: a + m.x + ({
                        left: v,
                        right: -v
                    }[o[6]] || 0),
                    y: l + m.y - 10
                }, s.connX = a, s.connY = l, null === this.options.size && (n = s.width, v > a - n ? A[3] = ue(he(n - a + v), A[3]) : a + n > x - v && (A[1] = ue(he(a + n - x + v), A[1])), 0 > l - r / 2 ? A[0] = ue(he(-l + r / 2), A[0]) : l + r / 2 > g && (A[2] = ue(he(l + r / 2 - g), A[2])))
            }(0 === D(A) || this.verifyDataLabelOverflow(A)) && (this.placeDataLabels(), T && y && Xe(this.points, function(t) {
                e = t.connector, o = t.labelPos, (s = t.dataLabel) && s._pos ? (h = s._attr.visibility, a = s.connX, l = s.connY, i = b ? ["M", a + ("left" === o[6] ? 5 : -5), l, "C", a, l, 2 * o[2] - o[4], 2 * o[3] - o[5], o[2], o[3], "L", o[4], o[5]] : ["M", a + ("left" === o[6] ? 5 : -5), l, "L", o[2], o[3], "L", o[4], o[5]], e ? (e.animate({
                    d: i
                }), e.attr("visibility", h)) : t.connector = e = u.chart.renderer.path(i).attr({
                    "stroke-width": y,
                    stroke: m.connectorColor || t.color || "#606060",
                    visibility: h
                }).add(u.dataLabelsGroup)) : e && (t.connector = e.destroy())
            }))
        }
    }, $e.pie.prototype.placeDataLabels = function() {
        Xe(this.points, function(t) {
            var e, t = t.dataLabel;
            t && ((e = t._pos) ? (t.attr(t._attr), t[t.moved ? "animate" : "attr"](e), t.moved = !0) : t && t.attr({
                y: -999
            }))
        })
    }, $e.pie.prototype.alignDataLabel = ze, $e.pie.prototype.verifyDataLabelOverflow = function(t) {
        var e, i = this.center,
            s = this.options,
            n = s.center,
            o = s = s.minSize || 80;
        return null !== n[0] ? o = ue(i[2] - ue(t[1], t[3]), s) : (o = ue(i[2] - t[1] - t[3], s), i[0] += (t[3] - t[1]) / 2), null !== n[1] ? o = ue(pe(o, i[2] - ue(t[0], t[2])), s) : (o = ue(pe(o, i[2] - t[0] - t[2]), s), i[1] += (t[0] - t[2]) / 2), o < i[2] ? (i[2] = o, this.translate(i), Xe(this.points, function(t) {
            t.dataLabel && (t.dataLabel._pos = null)
        }), this.drawDataLabels && this.drawDataLabels()) : e = !0, e
    }), $e.column && ($e.column.prototype.alignDataLabel = function(t, i, s, n, o) {
        var r = this.chart,
            a = r.inverted,
            l = t.dlBox || t.shapeArgs,
            h = t.below || t.plotY > p(this.translatedThreshold, r.plotSizeY),
            c = p(s.inside, !!this.options.stacking);
        l && (n = e(l), a && (n = {
            x: r.plotWidth - n.y - n.height,
            y: r.plotHeight - n.x - n.width,
            width: n.height,
            height: n.width
        }), !c) && (a ? (n.x += h ? 0 : n.width, n.width = 0) : (n.y += h ? n.height : 0, n.height = 0)), s.align = p(s.align, !a || c ? "center" : h ? "right" : "left"), s.verticalAlign = p(s.verticalAlign, a || c ? "middle" : h ? "top" : "bottom"), bi.prototype.alignDataLabel.call(this, t, i, s, n, o)
    }), Ne = Re.TrackerMixin = {
        drawTrackerPoint: function() {
            var t = this,
                e = t.chart,
                i = e.pointer,
                s = t.options.cursor,
                n = s && {
                    cursor: s
                },
                o = function(i) {
                    var s, n = i.target;
                    for (e.hoverSeries !== t && t.onMouseOver(); n && !s;) s = n.point, n = n.parentNode;
                    s !== B && s !== e.hoverPoint && s.onMouseOver(i)
                };
            Xe(t.points, function(t) {
                t.graphic && (t.graphic.element.point = t), t.dataLabel && (t.dataLabel.element.point = t)
            }), t._hasTracking || (Xe(t.trackerGroups, function(e) {
                t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", o).on("mouseout", function(t) {
                    i.onTrackerMouseOut(t)
                }).css(n), R) && t[e].on("touchstart", o)
            }), t._hasTracking = !0)
        },
        drawTrackerGraph: function() {
            var t, e = this,
                i = e.options,
                s = i.trackByArea,
                n = [].concat(s ? e.areaPath : e.graphPath),
                o = n.length,
                r = e.chart,
                a = r.pointer,
                l = r.renderer,
                h = r.options.tooltip.snap,
                c = e.tracker,
                d = i.cursor,
                u = d && {
                    cursor: d
                },
                d = e.singlePoints,
                p = function() {
                    r.hoverSeries !== e && e.onMouseOver()
                },
                f = "rgba(192,192,192," + (Me ? 1e-4 : .002) + ")";
            if (o && !s)
                for (t = o + 1; t--;) "M" === n[t] && n.splice(t + 1, 0, n[t + 1] - h, n[t + 2], "L"), (t && "M" === n[t] || t === o) && n.splice(t, 0, "L", n[t - 2] + h, n[t - 1]);
            for (t = 0; t < d.length; t++) o = d[t], n.push("M", o.plotX - h, o.plotY, "L", o.plotX + h, o.plotY);
            c ? c.attr({
                d: n
            }) : (e.tracker = l.path(n).attr({
                "stroke-linejoin": "round",
                visibility: e.visible ? "visible" : "hidden",
                stroke: f,
                fill: s ? f : He,
                "stroke-width": i.lineWidth + (s ? 0 : 2 * h),
                zIndex: 2
            }).add(e.group), Xe([e.tracker, e.markerGroup], function(t) {
                t.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function(t) {
                    a.onTrackerMouseOut(t)
                }).css(u), R && t.on("touchstart", p)
            }))
        }
    }, $e.column && (hi.prototype.drawTracker = Ne.drawTrackerPoint), $e.pie && ($e.pie.prototype.drawTracker = Ne.drawTrackerPoint), $e.scatter && (wi.prototype.drawTracker = Ne.drawTrackerPoint), t(yi.prototype, {
        setItemEvents: function(t, e, i, s, n) {
            var o = this;
            (i ? e : t.legendGroup).on("mouseover", function() {
                t.setState("hover"), e.css(o.options.itemHoverStyle)
            }).on("mouseout", function() {
                e.css(t.visible ? s : n), t.setState()
            }).on("click", function(e) {
                var i = function() {
                        t.setVisible()
                    },
                    e = {
                        browserEvent: e
                    };
                t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : Je(t, "legendItemClick", e, i)
            })
        },
        createCheckboxForItem: function(t) {
            t.checkbox = g("input", {
                type: "checkbox",
                checked: t.selected,
                defaultChecked: t.selected
            }, this.options.itemCheckboxStyle, this.chart.container), Ze(t.checkbox, "click", function(e) {
                Je(t, "checkboxClick", {
                    checked: e.target.checked
                }, function() {
                    t.select()
                })
            })
        }
    }), W.legend.itemStyle.cursor = "pointer", t(H.prototype, {
        showResetZoom: function() {
            var t = this,
                e = W.lang,
                i = t.options.chart.resetZoomButton,
                s = i.theme,
                n = s.states,
                o = "chart" === i.relativeTo ? null : "plotBox";
            this.resetZoomButton = t.renderer.button(e.resetZoom, null, null, function() {
                t.zoomOut()
            }, s, n && n.hover).attr({
                align: i.position.align,
                title: e.resetZoomTitle
            }).add().align(i.position, !1, o)
        },
        zoomOut: function() {
            var t = this;
            Je(t, "selection", {
                resetSelection: !0
            }, function() {
                t.zoom()
            })
        },
        zoom: function(t) {
            var e, i, s = this.pointer,
                o = !1;
            !t || t.resetSelection ? Xe(this.axes, function(t) {
                e = t.zoom()
            }) : Xe(t.xAxis.concat(t.yAxis), function(t) {
                var i = t.axis,
                    n = i.isXAxis;
                (s[n ? "zoomX" : "zoomY"] || s[n ? "pinchX" : "pinchY"]) && (e = i.zoom(t.min, t.max), i.displayBtn && (o = !0))
            }), i = this.resetZoomButton, o && !i ? this.showResetZoom() : !o && n(i) && (this.resetZoomButton = i.destroy()), e && this.redraw(p(this.options.chart.animation, t && t.animation, this.pointCount < 100))
        },
        pan: function(t, e) {
            var i, s = this,
                n = s.hoverPoints;
            n && Xe(n, function(t) {
                t.setState()
            }), Xe("xy" === e ? [1, 0] : [1], function(e) {
                var n = t[e ? "chartX" : "chartY"],
                    o = s[e ? "xAxis" : "yAxis"][0],
                    r = s[e ? "mouseDownX" : "mouseDownY"],
                    a = (o.pointRange || 0) / 2,
                    l = o.getExtremes(),
                    h = o.toValue(r - n, !0) + a,
                    r = o.toValue(r + s[e ? "plotWidth" : "plotHeight"] - n, !0) - a;
                o.series.length && h > pe(l.dataMin, l.min) && r < ue(l.dataMax, l.max) && (o.setExtremes(h, r, !1, !1, {
                    trigger: "pan"
                }), i = !0), s[e ? "mouseDownX" : "mouseDownY"] = n
            }), i && s.redraw(!1), f(s.container, {
                cursor: "move"
            })
        }
    }), t(xi.prototype, {
        select: function(t, e) {
            var i = this,
                s = i.series,
                n = s.chart,
                t = p(t, !i.selected);
            i.firePointEvent(t ? "select" : "unselect", {
                accumulate: e
            }, function() {
                i.selected = i.options.selected = t, s.options.data[Ue(i, s.data)] = i.options, i.setState(t && "select"), e || Xe(n.getSelectedPoints(), function(t) {
                    t.selected && t !== i && (t.selected = t.options.selected = !1, s.options.data[Ue(t, s.data)] = t.options, t.setState(""), t.firePointEvent("unselect"))
                })
            })
        },
        onMouseOver: function(t) {
            var e = this.series,
                i = e.chart,
                s = i.tooltip,
                n = i.hoverPoint;
            n && n !== this && n.onMouseOut(), this.firePointEvent("mouseOver"), s && (!s.shared || e.noSharedTooltip) && s.refresh(this, t), this.setState("hover"), i.hoverPoint = this
        },
        onMouseOut: function() {
            var t = this.series.chart,
                e = t.hoverPoints;
            e && -1 !== Ue(this, e) || (this.firePointEvent("mouseOut"), this.setState(), t.hoverPoint = null)
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var t, i = e(this.series.options.point, this.options).events;
                this.events = i;
                for (t in i) Ze(this, t, i[t]);
                this.hasImportedEvents = !0
            }
        },
        setState: function(i, s) {
            var n, o = this.plotX,
                r = this.plotY,
                a = this.series,
                l = a.options.states,
                h = ii[a.type].marker && a.options.marker,
                c = h && !h.enabled,
                d = h && h.states[i],
                u = d && d.enabled === !1,
                p = a.stateMarkerGraphic,
                f = this.marker || {},
                g = a.chart,
                m = a.halo,
                i = i || "";
            n = this.pointAttr[i] || a.pointAttr[i], i === this.state && !s || this.selected && "select" !== i || l[i] && l[i].enabled === !1 || i && (u || c && d.enabled === !1) || i && f.states && f.states[i] && f.states[i].enabled === !1 || (this.graphic ? (h = h && this.graphic.symbolName && n.r, this.graphic.attr(e(n, h ? {
                x: o - h,
                y: r - h,
                width: 2 * h,
                height: 2 * h
            } : {})), p && p.hide()) : (i && d && (h = d.radius, f = f.symbol || a.symbol, p && p.currentSymbol !== f && (p = p.destroy()), p ? p[s ? "animate" : "attr"]({
                x: o - h,
                y: r - h
            }) : f && (a.stateMarkerGraphic = p = g.renderer.symbol(f, o - h, r - h, 2 * h, 2 * h).attr(n).add(a.markerGroup), p.currentSymbol = f)), p && p[i && g.isInsidePlot(o, r, g.inverted) ? "show" : "hide"]()), (o = l[i] && l[i].halo) && o.size ? (m || (a.halo = m = g.renderer.path().add(a.seriesGroup)), m.attr(t({
                fill: ri(this.color || a.color).setOpacity(o.opacity).get()
            }, o.attributes))[s ? "animate" : "attr"]({
                d: this.haloPath(o.size)
            })) : m && m.attr({
                d: []
            }), this.state = i)
        },
        haloPath: function(t) {
            var e = this.series,
                i = e.chart,
                s = e.getPlotBox(),
                n = i.inverted;
            return i.renderer.symbols.circle(s.translateX + (n ? e.yAxis.len - this.plotY : this.plotX) - t, s.translateY + (n ? e.xAxis.len - this.plotX : this.plotY) - t, 2 * t, 2 * t)
        }
    }), t(bi.prototype, {
        onMouseOver: function() {
            var t = this.chart,
                e = t.hoverSeries;
            e && e !== this && e.onMouseOut(), this.options.events.mouseOver && Je(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
        },
        onMouseOut: function() {
            var t = this.options,
                e = this.chart,
                i = e.tooltip,
                s = e.hoverPoint;
            s && s.onMouseOut(), this && t.events.mouseOut && Je(this, "mouseOut"), i && !t.stickyTracking && (!i.shared || this.noSharedTooltip) && i.hide(), this.setState(), e.hoverSeries = null
        },
        setState: function(t) {
            var e = this.options,
                i = this.graph,
                s = this.graphNeg,
                n = e.states,
                e = e.lineWidth,
                t = t || "";
            this.state !== t && (this.state = t, n[t] && n[t].enabled === !1 || (t && (e = n[t].lineWidth || e + 1), i && !i.dashstyle && (t = {
                "stroke-width": e
            }, i.attr(t), s && s.attr(t))))
        },
        setVisible: function(t, e) {
            var i, s = this,
                n = s.chart,
                o = s.legendItem,
                r = n.options.chart.ignoreHiddenSeries,
                a = s.visible;
            i = (s.visible = t = s.userOptions.visible = t === B ? !a : t) ? "show" : "hide", Xe(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(t) {
                s[t] && s[t][i]()
            }), n.hoverSeries === s && s.onMouseOut(), o && n.legend.colorizeItem(s, t), s.isDirty = !0, s.options.stacking && Xe(n.series, function(t) {
                t.options.stacking && t.visible && (t.isDirty = !0)
            }), Xe(s.linkedSeries, function(e) {
                e.setVisible(t, !1)
            }), r && (n.isDirtyBox = !0), e !== !1 && n.redraw(), Je(s, i)
        },
        setTooltipPoints: function(t) {
            var e, i, s, n, o = [],
                r = this.xAxis,
                a = r && r.getExtremes(),
                l = r ? r.tooltipLen || r.len : this.chart.plotSizeX,
                h = [];
            if (this.options.enableMouseTracking !== !1 && !this.singularTooltips) {
                for (t && (this.tooltipPoints = null), Xe(this.segments || this.points, function(t) {
                        o = o.concat(t)
                    }), r && r.reversed && (o = o.reverse()), this.orderTooltipPoints && this.orderTooltipPoints(o), t = o.length, n = 0; t > n; n++)
                    if (r = o[n], e = r.x, e >= a.min && e <= a.max)
                        for (s = o[n + 1], e = i === B ? 0 : i + 1, i = o[n + 1] ? pe(ue(0, ce((r.clientX + (s ? s.wrappedClientX || s.clientX : l)) / 2)), l) : l; e >= 0 && i >= e;) h[e++] = r;
                this.tooltipPoints = h
            }
        },
        show: function() {
            this.setVisible(!0)
        },
        hide: function() {
            this.setVisible(!1)
        },
        select: function(t) {
            this.selected = t = t === B ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), Je(this, t ? "select" : "unselect")
        },
        drawTracker: Ne.drawTrackerGraph
    }), t(Re, {
        Axis: _,
        Chart: H,
        Color: ri,
        Point: xi,
        Tick: E,
        Renderer: $,
        Series: bi,
        SVGElement: O,
        SVGRenderer: ai,
        arrayMin: T,
        arrayMax: D,
        charts: Oe,
        dateFormat: Y,
        format: b,
        pathAnim: U,
        getOptions: function() {
            return W
        },
        hasBidiBug: Ae,
        isTouchDevice: Te,
        numberFormat: v,
        seriesTypes: $e,
        setOptions: function(t) {
            return W = e(!0, W, t), z(), W
        },
        addEvent: Ze,
        removeEvent: Ke,
        createElement: g,
        discardElement: A,
        css: f,
        each: Xe,
        extend: t,
        map: qe,
        merge: e,
        pick: p,
        splat: u,
        extendClass: m,
        pInt: i,
        wrap: x,
        svg: Me,
        canvas: Pe,
        vml: !Me && !Pe,
        product: "Highcharts",
        version: "4.0.1"
    })
}(), Highcharts.c = {
    colors: "#ed3237 #373435 #9c7a45 #5E3969 #914611 #DB843D #92A8CD #A47D7C #1E2C93".split(" "),
    chart: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 0,
        plotBackgroundColor: "transparent",
        plotShadow: !1,
        plotBorderWidth: 1,
        style: {
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#3734353"
        }
    },
    tooltip: {
        style: {
            color: "#3734353",
            font: "14px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    title: {
        style: {
            color: "#3734353",
            font: "bold 14px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    subtitle: {
        style: {
            color: "#3734353",
            font: "12px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    xAxis: {
        gridLineWidth: 0,
        lineColor: "#000",
        tickColor: "#000",
        labels: {
            style: {
                color: "#000",
                font: "11px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        },
        title: {
            style: {
                color: "#3734353",
                fontWeight: "bold",
                fontSize: "12px",
                fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        }
    },
    yAxis: {
        gridLineWidth: 1,
        lineColor: "#000",
        lineWidth: 1,
        tickWidth: 1,
        tickColor: "#000",
        labels: {
            style: {
                color: "#3734353",
                font: "12px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        },
        title: {
            style: {
                color: "#3734353",
                fontWeight: "bold",
                fontSize: "12px",
                fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        }
    },
    credits: {
        enabled: !1
    },
    legend: {
        borderColor: "#f2f2f2",
        borderWidth: 1,
        style: {
            color: "#3734353",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        },
        itemStyle: {
            color: "#3734353",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        },
        itemHoverStyle: {
            color: "#3734353",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        },
        itemHiddenStyle: {
            color: "gray",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    labels: {
        style: {
            color: "#3734353"
        }
    }
}, Highcharts.setOptions(Highcharts.c);
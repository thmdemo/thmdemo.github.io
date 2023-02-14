/*!
 * ScrollSmoother 3.11.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ let s,
    ie,
    g,
    H,
    G,
    k,
    M,
    ze,
    o,
    P,
    ne,
    Fe,
    Ie,
    Me,
    Oe,
    Be = () => typeof window < "u",
    He = () => s || (Be() && (s = window.gsap) && s.registerPlugin && s),
    Ue = (w) => Math.round(w * 1e5) / 1e5 || 0,
    qe = (w, i) => {
        let W = w.parentNode || G,
            D = w.getBoundingClientRect(),
            C = W.getBoundingClientRect(),
            O = C.top - D.top,
            L = C.bottom - D.bottom,
            A = (Math.abs(O) > Math.abs(L) ? O : L) / (1 - i),
            j = -A * i,
            f,
            h;
        return A > 0 && ((f = C.height / (g.innerHeight + C.height)), (h = f === 0.5 ? C.height * 2 : Math.min(C.height, (-A * f) / (2 * f - 1)) * 2 * (i || 1)), (j += i ? -h * i : -h / 2), (A += h)), { change: A, offset: j };
    },
    Ge = (w) => {
        let i = H.querySelector(".ScrollSmoother-wrapper");
        return i || ((i = H.createElement("div")), i.classList.add("ScrollSmoother-wrapper"), w.parentNode.insertBefore(i, w), i.appendChild(w)), i;
    };
class z {
    constructor(i) {
        ie || z.register(s) || console.warn("Please gsap.registerPlugin(ScrollSmoother)"), (i = this.vars = i || {}), P && P.kill(), (P = this), Me(this);
        let { smoothTouch: W, onUpdate: D, onStop: C, smooth: O, onFocusIn: L, normalizeScroll: A, wholePixels: j } = i,
            f,
            h,
            se,
            d,
            u,
            B,
            ye,
            we,
            be,
            v,
            V,
            Se,
            ae,
            De = this,
            K = typeof ResizeObserver < "u" && i.autoResize !== !1 && new ResizeObserver(() => o.isRefreshing || Oe.restart(!0)),
            J = i.effectsPrefix || "",
            Q = o.getScrollFunc(g),
            T = o.isTouch === 1 ? (W === !0 ? 0.8 : parseFloat(W) || 0) : O === 0 || O === !1 ? 0 : parseFloat(O) || 0.8,
            X = (T && +i.speed) || 1,
            m = 0,
            le = 0,
            Z = 1,
            N = Fe(0),
            ve = () => N.update(-m),
            I = { y: 0 },
            Te = () => (f.style.overflow = "visible"),
            ce,
            $ = (e) => {
                e.update();
                let t = e.getTween();
                t && (t.pause(), (t._time = t._dur), (t._tTime = t._tDur)), (ce = !1), e.animation.progress(e.progress, !0);
            },
            ee = (e, t) => {
                ((e !== m && !v) || t) &&
                    (j && (e = Math.round(e)), T && ((f.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + e + ", 0, 1)"), (f._gsap.y = e + "px")), (le = e - m), (m = e), o.isUpdating || o.update());
            },
            te = function (e) {
                return arguments.length ? (e < 0 && (e = 0), (I.y = -e), (ce = !0), v ? (m = -e) : ee(-e), o.isRefreshing ? d.update() : Q(e), this) : -m;
            },
            xe,
            Ee = (e) => {
                (h.scrollTop = 0), !((e.target.contains && e.target.contains(h)) || (L && L(this, e) === !1)) && (o.isInViewport(e.target) || e.target === xe || this.scrollTo(e.target, !1, "center center"), (xe = e.target));
            },
            _e = (e, t) => {
                let a, r, n, x;
                u.forEach((c) => {
                    (a = c.pins),
                        (x = c.markers),
                        e.forEach((l) => {
                            c.trigger &&
                                l.trigger &&
                                c !== l &&
                                (l.trigger === c.trigger || l.pinnedContainer === c.trigger || c.trigger.contains(l.trigger)) &&
                                ((r = l.start),
                                    (n = (r - c.start - c.offset) / c.ratio - (r - c.start)),
                                    a.forEach((E) => (n -= E.distance / c.ratio - E.distance)),
                                    l.setPositions(r + n, l.end + n),
                                    l.markerStart && x.push(s.quickSetter([l.markerStart, l.markerEnd], "y", "px")),
                                    l.pin && l.end > 0 && ((n = l.end - l.start), a.push({ start: l.start, end: l.end, distance: n, trig: l }), c.setPositions(c.start, c.end + n), c.vars.onRefresh(c)));
                        });
                });
            },
            Re = () => {
                Te(),
                    requestAnimationFrame(Te),
                    u &&
                    (u.forEach((e) => {
                        let t = e.start,
                            a = e.auto ? Math.min(o.maxScroll(e.scroller), e.end) : t + (e.end - t) / e.ratio,
                            r = (a - e.end) / 2;
                        (t -= r), (a -= r), (e.offset = r || 1e-4), (e.pins.length = 0), e.setPositions(Math.min(t, a), Math.max(t, a)), e.vars.onRefresh(e);
                    }),
                        _e(o.sort())),
                    N.reset();
            },
            he = () => o.addEventListener("refresh", Re),
            Le = () => u && u.forEach((e) => e.vars.onRefresh(e)),
            Ve = () => (u && u.forEach((e) => e.vars.onRefreshInit(e)), Le),
            ke = (e, t, a, r) => () => {
                let n = typeof t == "function" ? t(a, r) : t;
                return n || n === 0 || (n = r.getAttribute("data-" + J + e) || (e === "speed" ? 1 : 0)), r.setAttribute("data-" + J + e, n), n === "auto" ? n : parseFloat(n);
            },
            Ne = (e, t, a, r, n) => {
                n = (typeof n == "function" ? n(r, e) : n) || 0;
                let x = ke("speed", t, r, e),
                    c = ke("lag", a, r, e),
                    l = s.getProperty(e, "y"),
                    E = e._gsap,
                    _,
                    b,
                    F,
                    S,
                    fe,
                    ue,
                    Ce = () => {
                        (t = x()), (a = c()), (_ = parseFloat(t) || 1), (F = t === "auto"), (fe = F ? 0 : 0.5), S && S.kill(), (S = a && s.to(e, { ease: ne, overwrite: !1, y: "+=0", duration: a })), b && ((b.ratio = _), (b.autoSpeed = F));
                    },
                    de = () => {
                        (E.y = l + "px"), E.renderTransform(1), Ce();
                    },
                    re = [],
                    pe = [],
                    U = 0,
                    Ae = (p) => {
                        if (F) {
                            de();
                            let y = qe(e, ze(0, 1, -p.start / (p.end - p.start)));
                            (U = y.change), (ue = y.offset);
                        } else (U = (p.end - p.start) * (1 - _)), (ue = 0);
                        re.forEach((y) => (U -= y.distance * (1 - _))), p.vars.onUpdate(p), S && S.progress(1);
                    };
                return (
                    Ce(),
                    (_ !== 1 || F || S) &&
                    ((b = o.create({
                        trigger: F ? e.parentNode : e,
                        start: "top bottom+=" + n,
                        end: "bottom top-=" + n,
                        scroller: h,
                        scrub: !0,
                        refreshPriority: -999,
                        onRefreshInit: de,
                        onRefresh: Ae,
                        onKill: (p) => {
                            let y = u.indexOf(p);
                            y >= 0 && u.splice(y, 1), de();
                        },
                        onUpdate: (p) => {
                            let y = l + U * (p.progress - fe),
                                ge = re.length,
                                oe = 0,
                                R,
                                q,
                                me;
                            if (p.offset) {
                                if (ge) {
                                    for (q = -m, me = p.end; ge--;) {
                                        if (((R = re[ge]), R.trig.isActive || (q >= R.start && q <= R.end))) {
                                            S && ((R.trig.progress += R.trig.direction < 0 ? 0.001 : -0.001), R.trig.update(0, 0, 1), S.resetTo("y", parseFloat(E.y), -le, !0), Z && S.progress(1));
                                            return;
                                        }
                                        q > R.end && (oe += R.distance), (me -= R.distance);
                                    }
                                    y = l + oe + U * ((s.utils.clamp(p.start, p.end, q) - p.start - oe) / (me - p.start) - fe);
                                }
                                (y = Ue(y + ue)), pe.length && !F && pe.forEach((Ye) => Ye(y - oe)), S ? (S.resetTo("y", y, -le, !0), Z && S.progress(1)) : ((E.y = y + "px"), E.renderTransform(1));
                            }
                        },
                    })),
                        Ae(b),
                        (s.core.getCache(b.trigger).stRevert = Ve),
                        (b.startY = l),
                        (b.pins = re),
                        (b.markers = pe),
                        (b.ratio = _),
                        (b.autoSpeed = F),
                        (e.style.willChange = "transform")),
                    b
                );
            };
        he(),
            o.addEventListener("killAll", he),
            s.delayedCall(0.5, () => (Z = 0)),
            (this.scrollTop = te),
            (this.scrollTo = (e, t, a) => {
                let r = s.utils.clamp(0, o.maxScroll(g), isNaN(e) ? this.offset(e, a) : +e);
                t ? (v ? s.to(this, { duration: T, scrollTop: r, overwrite: "auto", ease: ne }) : Q(r)) : te(r);
            }),
            (this.offset = (e, t) => {
                e = M(e)[0];
                let a = e.style.cssText,
                    r = o.create({ trigger: e, start: t || "top top" }),
                    n;
                return u && _e([r]), (n = r.start), r.kill(!1), (e.style.cssText = a), (s.core.getCache(e).uncache = 1), n;
            });
        function Y() {
            return (se = f.clientHeight), (f.style.overflow = "visible"), (k.style.height = g.innerHeight + (se - g.innerHeight) / X + "px"), se - g.innerHeight;
        }
        (this.content = function (e) {
            if (arguments.length) {
                let t = M(e || "#smooth-content")[0] || console.warn("ScrollSmoother needs a valid content element.") || k.children[0];
                return t !== f && ((f = t), (be = f.getAttribute("style") || ""), K && K.observe(f), s.set(f, { overflow: "visible", width: "100%", boxSizing: "border-box", y: "+=0" }), T || s.set(f, { clearProps: "transform" })), this;
            }
            return f;
        }),
            (this.wrapper = function (e) {
                return arguments.length
                    ? ((h = M(e || "#smooth-wrapper")[0] || Ge(f)),
                        (we = h.getAttribute("style") || ""),
                        Y(),
                        s.set(
                            h,
                            T
                                ? { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 }
                                : { overflow: "visible", position: "relative", width: "100%", height: "auto", top: "auto", bottom: "auto", left: "auto", right: "auto" }
                        ),
                        this)
                    : h;
            }),
            (this.effects = (e, t) => {
                if ((u || (u = []), !e)) return u.slice(0);
                (e = M(e)),
                    e.forEach((E) => {
                        let _ = u.length;
                        for (; _--;) u[_].trigger === E && u[_].kill();
                    }),
                    (t = t || {});
                let { speed: a, lag: r, effectsPadding: n } = t,
                    x = [],
                    c,
                    l;
                for (c = 0; c < e.length; c++) (l = Ne(e[c], a, r, c, n)), l && x.push(l);
                return u.push(...x), x;
            }),
            (this.sections = (e, t) => {
                if ((B || (B = []), !e)) return B.slice(0);
                let a = M(e).map((r) =>
                    o.create({
                        trigger: r,
                        start: "top 120%",
                        end: "bottom -20%",
                        onToggle: (n) => {
                            (r.style.opacity = n.isActive ? "1" : "0"), (r.style.pointerEvents = n.isActive ? "all" : "none");
                        },
                    })
                );
                return t && t.add ? B.push(...a) : (B = a.slice(0)), a;
            }),
            this.content(i.content),
            this.wrapper(i.wrapper),
            (this.render = (e) => ee(e || e === 0 ? e : m)),
            (this.getVelocity = () => N.getVelocity(-m)),
            o.scrollerProxy(h, {
                scrollTop: te,
                scrollHeight: () => Y() && k.scrollHeight,
                fixedMarkers: i.fixedMarkers !== !1 && !!T,
                content: f,
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: g.innerWidth, height: g.innerHeight };
                },
            }),
            o.defaults({ scroller: h });
        let Pe = o.getAll().filter((e) => e.scroller === g || e.scroller === h);
        Pe.forEach((e) => e.revert(!0, !0)),
            (d = o.create({
                animation: s.fromTo(
                    I,
                    { y: 0 },
                    {
                        y: () => -Y(),
                        immediateRender: !1,
                        ease: "none",
                        data: "ScrollSmoother",
                        duration: 100,
                        onUpdate: function () {
                            if (this._dur) {
                                let e = ce;
                                e && ($(d), (I.y = m)), ee(I.y, e), ve(), D && !v && D(De);
                            }
                        },
                    }
                ),
                onRefreshInit: (e) => {
                    if (u) {
                        let a = o.getAll().filter((r) => !!r.pin);
                        u.forEach((r) => {
                            r.vars.pinnedContainer ||
                                a.forEach((n) => {
                                    if (n.pin.contains(r.trigger)) {
                                        let x = r.vars;
                                        (x.pinnedContainer = n.pin), (r.vars = null), r.init(x, r.animation);
                                    }
                                });
                        });
                    }
                    let t = e.getTween();
                    (ae = t && t._end > t._dp._time), (Se = m), (I.y = 0), T && ((h.style.pointerEvents = "none"), (h.scrollTop = 0), setTimeout(() => h.style.removeProperty("pointer-events"), 50));
                },
                onRefresh: (e) => {
                    e.animation.invalidate(), e.setPositions(e.start, Y() / X), ae || $(e), (I.y = -Q()), ee(I.y), Z || e.animation.progress(s.utils.clamp(0, 1, Se / -e.end)), ae && ((e.progress -= 0.001), e.update());
                },
                id: "ScrollSmoother",
                scroller: g,
                invalidateOnRefresh: !0,
                start: 0,
                refreshPriority: -9999,
                end: () => Y() / X,
                onScrubComplete: () => {
                    N.reset(), C && C(this);
                },
                scrub: T || !0,
            })),
            (this.smooth = function (e) {
                return arguments.length && ((T = e || 0), (X = (T && +i.speed) || 1), d.scrubDuration(e)), d.getTween() ? d.getTween().duration() : 0;
            }),
            d.getTween() && (d.getTween().vars.ease = i.ease || ne),
            (this.scrollTrigger = d),
            i.effects && this.effects(i.effects === !0 ? "[data-" + J + "speed], [data-" + J + "lag]" : i.effects, { effectsPadding: i.effectsPadding }),
            i.sections && this.sections(i.sections === !0 ? "[data-section]" : i.sections),
            Pe.forEach((e) => {
                (e.vars.scroller = h), e.revert(!1, !0), e.init(e.vars, e.animation);
            }),
            (this.paused = function (e, t) {
                return arguments.length
                    ? (!!v !== e &&
                        (e
                            ? (d.getTween() && d.getTween().pause(),
                                Q(-m),
                                N.reset(),
                                (V = o.normalizeScroll()),
                                V && V.disable(),
                                (v = o.observe({ preventDefault: !0, type: "wheel,touch,scroll", debounce: !1, allowClicks: !0, onChangeY: () => te(-m) })),
                                (v.nested = Ie(G, "wheel,touch,scroll", !0, t !== !1)))
                            : (v.nested.kill(), v.kill(), (v = 0), V && V.enable(), (d.progress = (-m - d.start) / (d.end - d.start)), $(d))),
                        this)
                    : !!v;
            }),
            (this.kill = this.revert = () => {
                this.paused(!1), $(d), d.kill();
                let e = (u || []).concat(B || []),
                    t = e.length;
                for (; t--;) e[t].kill();
                o.scrollerProxy(h), o.removeEventListener("killAll", he), o.removeEventListener("refresh", Re), (h.style.cssText = we), (f.style.cssText = be);
                let a = o.defaults({});
                a && a.scroller === h && o.defaults({ scroller: g }), this.normalizer && o.normalizeScroll(!1), clearInterval(ye), (P = null), K && K.disconnect(), k.style.removeProperty("height"), g.removeEventListener("focusin", Ee);
            }),
            (this.refresh = (e, t) => d.refresh(e, t)),
            A && (this.normalizer = o.normalizeScroll(A === !0 ? { debounce: !0, content: !T && f } : A)),
            o.config(i),
            "overscrollBehavior" in g.getComputedStyle(k) && s.set([k, G], { overscrollBehavior: "none" }),
            "scrollBehavior" in g.getComputedStyle(k) && s.set([k, G], { scrollBehavior: "auto" }),
            g.addEventListener("focusin", Ee),
            (ye = setInterval(ve, 250)),
            H.readyState === "loading" || requestAnimationFrame(() => o.refresh());
    }
    get progress() {
        return this.scrollTrigger ? this.scrollTrigger.animation._time / 100 : 0;
    }
    static register(i) {
        return (
            ie ||
            ((s = i || He()),
                Be() && window.document && ((g = window), (H = document), (G = H.documentElement), (k = H.body)),
                s &&
                ((M = s.utils.toArray),
                    (ze = s.utils.clamp),
                    (ne = s.parseEase("expo")),
                    (Me = s.core.context || function () { }),
                    (Oe = s.delayedCall(0.2, () => o.isRefreshing || (P && P.refresh())).pause()),
                    (o = s.core.globals().ScrollTrigger),
                    s.core.globals("ScrollSmoother", z),
                    k && o && ((Fe = o.core._getVelocityProp), (Ie = o.core._inputObserver), (z.refresh = o.refresh), (ie = 1)))),
            ie
        );
    }
}
z.version = "3.11.4";
z.create = (w) => (P && w && P.content() === M(w.content)[0] ? P : new z(w));
z.get = () => P;
He() && s.registerPlugin(z);

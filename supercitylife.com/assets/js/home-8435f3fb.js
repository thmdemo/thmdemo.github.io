import { s as p, a as t, i as $ } from "./app-5e637b06.js";
import "./bootstrap-b0a4c440.js";
p.paused(!0);
let D = document.getElementById("navigation"),
    u = gsap.timeline({ paused: !0, delay: 0.3 });
u.fromTo(D, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 });
gsap.set("#navigation svg", { fill: "#fff" });
let F = document.getElementById("section1-logo"),
    f = document.getElementById("section1-bg"),
    T = document.getElementById("section1-title-left"),
    y = document.getElementById("section1-title-right"),
    x = document.getElementById("section1-window"),
    h = document.getElementById("section1-play");
var w = gsap.timeline({ delay: 1, onComplete: M });
w.fromTo(f, { scale: 0 }, { scale: 1, duration: 1.5 }, 0);
w.to(F, { autoAlpha: 0, delay: 0.5, duration: 1 }, 0);
function M() {
    u.play(), n.play();
}
var n = gsap.timeline({ paused: !0, delay: 0.3, onComplete: N });
n.fromTo(T, { autoAlpha: 0, x: "100%" }, { autoAlpha: 1, x: "-10%", duration: 2, ease: "expo.out" }, 0);
n.fromTo(y, { autoAlpha: 0, x: "-100%" }, { autoAlpha: 1, x: "20%", duration: 2, ease: "expo.out" }, 0);
n.fromTo(x, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, ease: "expo.out" }, 0);
n.fromTo(h, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, 0);
function N() {
    p.paused(!1);
    let e = gsap.timeline({ scrollTrigger: { trigger: "#section1", immediateRender: !1, scrub: !0, pinSpacing: !1, markers: t, start: "top top", end: "bottom top" } });
    e.fromTo(f, { width: "100%" }, { width: "88%" }, 0),
        e.to(T, { autoAlpha: 0, x: "-200%", duration: 2, ease: "expo.out" }, 0),
        e.to(y, { autoAlpha: 0, x: "200%", duration: 2, ease: "expo.out" }, 0),
        e.to(x, { scale: 0, autoAlpha: 0 }, 0),
        e.to(h, { autoAlpha: 0, duration: 4 }, 0),
        e.to("#navigation .icon svg", { fill: "#231F20" }, 0);
}
document.getElementById("section2-left-img");
let I = document.getElementById("section2-title-one"),
    E = document.getElementById("section2-title-two"),
    B = gsap.timeline({ scrollTrigger: { trigger: "#section2", scrub: !0, pinSpacing: !1, markers: t, start: "top bottom", end: "top top" } });
B.fromTo(I, { autoAlpha: 0, x: "50%" }, { autoAlpha: 1, x: "0%" }, 0);
B.fromTo(E, { autoAlpha: 0, x: "-50%" }, { autoAlpha: 1, x: "20%" }, 0);
let b = gsap.timeline({ scrollTrigger: { trigger: "#section2", scrub: !0, pinSpacing: !1, markers: t, start: "bottom bottom", end: "bottom top" } });
b.fromTo(I, { autoAlpha: 1, x: "0%" }, { autoAlpha: 0, x: "-50%" }, 0);
b.fromTo(E, { autoAlpha: 1, x: "20%" }, { autoAlpha: 0, x: "50%" }, 0);
if ($) {
    let e = gsap.utils.toArray(".slide");
    const G = gsap.utils.snap(1 / (e.length - 1));
    gsap.set(".slide-0 .slide-title", { xPercent: 200 }), gsap.set(".slide-0 .slide-window", { xPercent: 200 }), gsap.set(".slide-0 .slide-window-text", { rotate: -70 }), gsap.set(".slide-0", { padding: "6%" });
    let R = gsap.to(e, {
        xPercent: -100 * (e.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: "#section4",
            pin: !0,
            scrub: !0,
            snap: {
                inertia: !1,
                snapTo: (r) => {
                    const o = G(r);
                    return o == 0 ? 2e-4 : o;
                },
            },
            end: "+=5000",
            onEnter: () => {
                gsap.to(".slide-0", { padding: "0%", duration: 0.5 }),
                    gsap.to(".slide-0 .slide-image", { maxWidth: "80%", ease: "power1.out", delay: 0.5 }),
                    gsap.to(".slide-0 .slide-title", { xPercent: -10, delay: 0.5 }),
                    gsap.to(".slide-0 .slide-window", { xPercent: -50, delay: 0.5 }),
                    gsap.to(".slide-0 .slide-window-text", { rotate: 0, delay: 0.5 });
            },
            onLeaveBack: () => {
                gsap.to(".slide-0 .slide-image", { maxWidth: "100%", ease: "power1.out", duration: 0.5 }),
                    gsap.to(".slide-0 .slide-title", { xPercent: 200, duration: 0.5 }),
                    gsap.to(".slide-0 .slide-window", { xPercent: 200, duration: 0.5 }),
                    gsap.to(".slide-0 .slide-window-text", { rotate: -70, duration: 0.5 }),
                    gsap.to(".slide-0", { padding: "6%", delay: 0.5 });
            },
        },
    });
    e.forEach((r, o) => {
        let a = gsap.timeline({ scrollTrigger: { trigger: r, containerAnimation: R, start: "90% right", markers: t, toggleActions: "play none none reverse" } });
        o != 0 &&
            (gsap.set(".slide-" + o + " .slide-title", { xPercent: 200 }),
            gsap.set(".slide-" + o + " .slide-window", { xPercent: 200 }),
            gsap.set(".slide-" + o + " .slide-window-text", { rotate: -70 }),
            a.to(".slide-" + o + " .slide-title", { xPercent: -10 }, "test"),
            a.to(".slide-" + o + " .slide-window", { xPercent: -50 }, "test"),
            a.to(".slide-" + o + " .slide-window-text", { rotate: 0, duration: 0.7 }, "test"));
    });
}
let A = document.getElementById("section5-title-one"),
    S = document.getElementById("section5-title-two"),
    v = document.getElementById("section5-text"),
    j = document.getElementById("section5-cta"),
    k = document.getElementById("section5-bg"),
    c = gsap.timeline({ scrollTrigger: { trigger: "#section5", scrub: !0, pinSpacing: !1, markers: t, start: "top bottom", end: "top top" } });
c.fromTo(A, { x: "-100%" }, { x: "0%" }, 0);
c.fromTo(S, { x: "-100%" }, { x: "0%" }, 0);
c.fromTo(v, { x: "-10%" }, { x: "0%" }, 0);
let i = gsap.timeline({ scrollTrigger: { trigger: "#section5", scrub: !0, pinSpacing: !1, markers: t, start: "top top", end: "bottom top" } });
i.fromTo(A, { x: "0%" }, { x: "100%" }, 0);
i.fromTo(S, { x: "0%" }, { x: "100%" }, 0);
i.fromTo(v, { x: "0%" }, { x: "50%" }, 0);
i.fromTo(j, { y: 0 }, { y: k.clientHeight * 0.95 }, 0);
i.fromTo("#section5 svg", { fill: "#000" }, { fill: "#fff", duration: 0.15 }, 0);
i.fromTo("#section5 .stroke", { stroke: "#000" }, { stroke: "#fff", duration: 0.15 }, 0);
i.fromTo(k, { scale: 1 }, { scale: 1.2 }, 0);
let P = document.getElementById("section6-title-one"),
    q = document.getElementById("section6-img-one"),
    z = document.getElementById("section6-img-one-wrapper"),
    J = document.getElementById("section6-img-two"),
    K = document.getElementById("section6-img-three-wrapper"),
    Q = document.getElementById("section6-sun"),
    U = document.getElementById("section6-title-two"),
    l = gsap.timeline({ scrollTrigger: { trigger: "#section6", scrub: !0, pinSpacing: !1, markers: t, start: "top bottom", end: "bottom top" } });
l.fromTo(z, { y: "60%" }, { y: "-20%" }, 0);
l.fromTo(q, { scale: 1 }, { scale: 1.3 }, 0);
l.fromTo(J, { x: "0%" }, { x: "-50%" }, 0);
l.fromTo(K, { y: "150%" }, { y: "0%" }, 0);
l.fromTo(Q, { y: "0%" }, { y: "120%" }, 0);
let V = gsap.timeline({ scrollTrigger: { trigger: "#section6", scrub: !0, pinSpacing: !1, markers: t, start: "top bottom", end: "top top" } });
V.fromTo(P, { x: "50%" }, { x: "0%" }, 0);
let W = gsap.timeline({ scrollTrigger: { trigger: "#section6", scrub: !0, pinSpacing: !1, markers: t, start: "top top", end: "bottom top" } });
W.fromTo(P, { x: "0%" }, { x: "-50%" }, 0);
W.fromTo(U, { x: "50%" }, { x: "0%" }, 0);
let X = document.getElementById("section7-img"),
    Y = document.getElementById("section7-img-wrapper"),
    O = gsap.timeline({ scrollTrigger: { trigger: "#section7", scrub: !0, pinSpacing: !1, markers: t, start: "top bottom", end: "top 20%" } });
O.fromTo(X, { scale: 1.2 }, { scale: 1 }, 0);
O.fromTo(Y, { y: "20%" }, { y: "0%" }, 0);
let Z = document.getElementById("section8-title"),
    _ = document.getElementById("section8-text"),
    ee = document.getElementById("section8-img"),
    d = gsap.timeline({ scrollTrigger: { trigger: "#section8", scrub: !0, pinSpacing: !1, markers: t, start: "top bottom", end: "top top" } });
d.fromTo(Z, { y: "50%" }, { y: "0%", duration: 2 }, 0);
d.fromTo(_, { y: "50%" }, { y: "0%", duration: 2, delay: 1 }, 0);
d.fromTo(ee, { y: "100%" }, { y: "0%", duration: 2, delay: 2 }, 0);
var m = document.getElementById("section9"),
    te = document.getElementById("section9-title"),
    g = document.getElementById("section9-slider"),
    oe = m.clientHeight - m.firstElementChild.clientHeight;
g.style.height = oe + "px";
let L = gsap.timeline({ scrollTrigger: { trigger: "#section9", scrub: !0, pinSpacing: !1, markers: t, start: "top bottom", end: "top top" } });
L.fromTo(te, { yPercent: 100 }, { yPercent: 0 }, 0);
L.fromTo(g, { yPercent: 50 }, { yPercent: 0 }, 0);
var C = gsap.utils.toArray("#section9-slider img"),
    s = 0,
    H = () => {
        (s = 0),
            C.forEach((e) => {
                s += e.offsetWidth;
            });
    };
H();
ScrollTrigger.addEventListener("refreshInit", H);
gsap.to(C, { scrollTrigger: { trigger: "#section9", start: "top top", end: () => `+=${s}`, pin: !0, scrub: !0, invalidateOnRefresh: !0 }, x: () => `-${s - g.clientWidth}` });

import "./bootstrap-b0a4c440.js";
var w = !1,
    f = { width: window.innerWidth, height: window.innerHeight };
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
var o = ScrollSmoother.create({ smooth: 1.3, effects: !0, normalizeScroll: !0, ease: "easeNone" });
window.addEventListener("load", function (e) {
    ScrollTrigger.refresh(), (window.onscroll = function () { });
});
var g = !1;
if (f.width >= 1025) {
    var g = !0;
    console.log("isLarge");
} else if (f.width >= 769) {
    var g = !1;
    console.log("isMedium");
} else {
    var g = !1;
    console.log("isSmall");
}
gsap.to("#navigation .logo", { autoAlpha: 0, display: "none", scrollTrigger: { trigger: "body", start: "top 0%", end: "top -10%", toggleActions: "play none reverse none" } });
var I = document.getElementById("footer-title"),
    S = document.getElementById("footer-img");
let y = gsap.timeline({ scrollTrigger: { trigger: "#footer", scrub: !0, pinSpacing: !1, markers: w, start: "top 60%", end: "bottom bottom" } });
y.fromTo(I, { scale: 0.8 }, { scale: 1 }, 0);
y.fromTo(S, { yPercent: 50 }, { yPercent: 0 }, 0);
var r = !1;
document.querySelector(".menu-toggle .open").addEventListener("click", (e) => {
    i("menu");
});
document.querySelector(".menu-toggle .close").addEventListener("click", (e) => {
    i();
});
var d = !1;
document.querySelectorAll(".form-toggle").forEach((e) => {
    e.addEventListener("click", (t) => {
        i("form");
    });
});
var c = !1;
document.querySelectorAll(".download-toggle").forEach((e) => {
    e.addEventListener("click", (t) => {
        i("download");
    });
});
function i(e = "") {
    let t = document.getElementById("menu"),
        l = document.getElementById("form"),
        n = document.getElementById("download"),
        s = document.getElementById("navigation");
    s.classList.toggle("toggled"),
        e
            ? (e == "menu" && ((r = !0), o.paused(!0), (t.style.display = "block")),
                e == "form" && (s.classList.toggle("toggledForm"), (d = !0), o.paused(!0), (l.style.display = "block")),
                e == "download" && (s.classList.toggle("toggledDownload"), (c = !0), o.paused(!0), (n.style.display = "block")))
            : (r && ((r = !1), o.paused(!1), (t.style.display = "none")),
                d && (s.classList.toggle("toggledForm"), (d = !1), o.paused(!1), (l.style.display = "none")),
                c && (s.classList.toggle("toggledDownload"), (c = !1), o.paused(!1), (n.style.display = "none")));
}
const m = document.getElementById("submission"),
    v = document.getElementById("successScreen");
m.addEventListener("submit", B);
var a = document.getElementById("email");
a.addEventListener("keyup", h);
var p = document.getElementById("validationTag");
function h() {
    return k.test(a.value) ? (a.classList.remove("invalid"), p.classList.add("uk-hidden"), !0) : (a.classList.add("invalid"), p.classList.remove("uk-hidden"), !1);
}
var k = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
function B(e) {
    e.preventDefault();
    let t = document.getElementById("name"),
        l = document.getElementById("phone"),
        n = document.getElementById("message");
    const s = document.getElementById("desktopSubmit");
    var E = { type: "contact", name: t.value, email: a.value, phone: l.value, message: n.value };
    return h()
        ? ((s.innerText = "LOADING..."),
            axios
                .post("/form-submission", E)
                .then(function (L) {
                    m.classList.add("uk-hidden"), v.classList.remove("uk-hidden");
                })
                .catch(function (L) {
                    m.classList.add("uk-hidden"), v.classList.remove("uk-hidden");
                }),
            !1)
        : (a.focus(), !1);
}
var u = !1;
document.querySelectorAll(".sectionvideo-toggle").forEach((e) => {
    e.addEventListener("click", (t) => {
        b(t);
    });
});
function b(e) {
    let t = e.currentTarget.getAttribute("data-video"),
        l = document.getElementById(t),
        n = document.getElementById(t + "-popup");
    u ? ((u = !1), o.paused(!1), (n.style.display = "none"), l.pause()) : ((u = !0), o.paused(!0), (n.style.display = "block"), l.play());
}
export { w as a, g as i, o as s };

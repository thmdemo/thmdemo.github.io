"use strict";
jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/agrarium_product_carousel.default", function (e) {
        let n = e.find(".product-slider"),
            o = n.data("slider-options");            
            n.slick({
                fade: !0,
                pauseOnHover: o.pauseOnHover,
                autoplay: o.autoplay,
                autoplaySpeed: o.autoplaySpeed,
                speed: o.speed,
                infinite: o.infinite,
                cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
                touchThreshold: 100,
                rtl: o.rtl,
                slidesToShow: 1,
                arrows: o.arrows,
                dots: o.dots,
                appendDots: n.parent().next(".slick-dots-navigation"),
                adaptiveHeight: !0,
            });
    });
});
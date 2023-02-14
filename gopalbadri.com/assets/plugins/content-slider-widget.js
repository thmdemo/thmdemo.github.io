"use strict";
jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/agrarium_content_slider.default", function (e) {
        let n = e.find(".agrarium_slider_slick"),
            o = n.data("slider-options"),
            t = e.find(".agrarium_slider_counter");
            widget_ready_callback(e);
            
            n.on("init afterChange", function (e, i, n, o) {
                var r = (n || 0) + 1;
                t.text(r + "/" + i.slideCount);
            }),
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
                appendDots: n.siblings().find(".slick-dots-navigation"),
                appendArrows: ".slick-navigation",
                prevArrow: ".slick-prev",
                nextArrow: ".slick-next",
                adaptiveHeight: !0,
            });
    });
});

function widget_ready_callback(e) {
    let videoButton = e.find('.slider_video_button');
    videoButton.each(function() {
        let i,
        o,
        r = jQuery(this).find(".agrarium_video_trigger_button"),
        n = jQuery(this).find(".agrarium_video_container"),
        copy = n.detach();        
        jQuery('body').append(copy);                    
        let t = copy.find(".agrarium_video_wrapper"),  
            a = copy.find(".agrarium_close_popup_layer"),
            u = jQuery(t).attr("data-src");
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        jQuery(r).on("click", function () {            
            jQuery(copy).addClass("active"),    
                setTimeout(function () {
                    (i = jQuery(t).height()),
                        (o = i * (16 / 9)),
                        jQuery(t).width(o),
                        jQuery(t).append(
                            '<div class="agrarium_video_inner"><iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="100%" src="' +
                                u +
                                '?enablejsapi=1&amp;disablekb=1&amp;autoplay=1&amp;controls=1&amp;showinfo=0&amp;rel=0&amp;loop=0&amp;wmode=transparent"></iframe></div>'
                        );
                }, 100),
                setTimeout(function () {
                    jQuery(copy).addClass("visible");                    
                    jQuery('body').css({
                        overflowY: 'hidden',
                        paddingRight: scrollbarWidth
                    });                    
                }, 200);                
        });

        function closeModal() {
            jQuery(copy).removeClass("visible"),
            setTimeout(function () {
                jQuery(t).html(""), jQuery(copy).removeClass("active");
                jQuery('body').css({
                    overflowY: '',
                    paddingRight: ''
                });
            }, 500);
        }

        jQuery(a).on("click", closeModal),
        jQuery(n).on("click", function(e) {
            if(!jQuery(".agrarium_video_inner").has(e.target).length) {
                closeModal();
            }
        }),
        jQuery(window).on("resize", function () {    
            (i = jQuery(t).height()), (o = i * (16 / 9)), jQuery(t).width(o);
        });
    });   
}
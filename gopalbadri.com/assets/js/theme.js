"use strict";

function side_panel_open() {
    jQuery('.dropdown-trigger').on('click', function() {
        jQuery('.slide-sidebar-wrapper, .body-overlay').addClass('active');
    });
    jQuery('.slide-sidebar-close, .body-overlay').on('click', function() {
        jQuery('.slide-sidebar-wrapper, .body-overlay').removeClass('active');
    });
}
side_panel_open();

function search_panel_open() {
    jQuery('.search-trigger').on('click', function() {
        jQuery('.site-search, .body-overlay').addClass('active');
        jQuery('.site-search .search-form .search-form-field').focus();
    });
    jQuery('.site-search-close, .body-overlay').on('click', function() {
        jQuery('.site-search, .body-overlay, .mobile-header-menu-container').removeClass('active');
    });
}
search_panel_open();

function switch_form_columns() {
    jQuery('.tab-columns-switcher').on('click', function() {
        jQuery('.tab-column', jQuery(this).parents('.tab-columns')).toggleClass('hidden');
    });
}
switch_form_columns();

function sticky_menu_active(once){
    var stickyHeaders = jQuery('[class~="sticky-header-on"]:not(.header-type-3):not(.mobile-header-type-3)');
    if ( stickyHeaders.length ) {
        stickyHeaders.each(function(){
            let obj = jQuery(this);
            let el_offset = obj.offset().top;
            let el_height = jQuery('.sticky-wrapper', obj).innerHeight();
            let el_ready = el_offset + el_height;
            el_offset = el_offset + el_height + 200;

            obj.height(el_height);
            if(once) {
                var st = jQuery(window).scrollTop();
                if (st <= el_ready) {                    
                    obj.removeClass('sticky-ready');
                } else {
                    obj.addClass('sticky-ready');
                }
                if (st <= el_offset) {
                    obj.removeClass('sticky-active');
                } else {
                    obj.addClass('sticky-active');
                }
            }

            jQuery(window).scroll(function(){                
                var st = jQuery(this).scrollTop();
                if (st <= el_ready) {                    
                    obj.removeClass('sticky-ready');
                } else {
                    obj.addClass('sticky-ready');
                }
                if (st <= el_offset) {
                    obj.removeClass('sticky-active');
                } else {
                    obj.addClass('sticky-active');
                }
            });
        });
    }
}

function sticky_menu_header_type_3_active(once){
    var stickyHeaders = jQuery('.header-type-3.sticky-header-on, .mobile-header-type-3.sticky-header-on');
    if ( stickyHeaders.length ) {
        stickyHeaders.each(function(){
            let obj = jQuery(this);
            let el_offset = obj.offset().top;
            let el_height = jQuery('.sticky-wrapper', obj).innerHeight();
            let el_ready = el_offset + el_height;

            obj.height(el_height);
            if(once) {
                var st = jQuery(window).scrollTop();
                if (st <= el_offset) {
                    obj.removeClass('sticky-active');
                } else if(st > el_offset) {
                    obj.addClass('sticky-active');
                }
            }

            jQuery(window).scroll(function(){     
                var st = jQuery(this).scrollTop();  
                if (st <= el_offset) {
                    obj.removeClass('sticky-active');
                } else if(st > el_offset) {
                    obj.addClass('sticky-active');
                }                
            });
        });
    }
}

sticky_menu_header_type_3_active(true);
sticky_menu_active(true);

function mobile_menu_open() {
    jQuery('.menu-trigger').on('click', function() {
        jQuery('.mobile-header-menu-container, .body-overlay').addClass('active');
    });
    jQuery('.menu-close, .body-overlay').on('click', function() {
        jQuery('.mobile-header-menu-container, .body-overlay').removeClass('active');
    });
}
mobile_menu_open();

function simple_sidebar_open() {
    jQuery('.simple-sidebar-trigger').on('click', function() {
        if (jQuery(window).width() < 992) {
            jQuery('.simple-sidebar, .body-overlay').addClass('active');
        }
    });
    jQuery('.shop-hidden-sidebar-close, .body-overlay').on('click', function() {
        jQuery('.simple-sidebar, .body-overlay').removeClass('active');
    });
}
simple_sidebar_open();

function widget_list_hierarchy_init (){
    widget_archives_hierarchy_controller ( '.widget ul li', 'ul.children', 'parent-archive', 'widget-archive-trigger' );
    widget_archives_hierarchy_controller ( '.widget_nav_menu .menu li', 'ul.sub-menu', 'parent-archive', 'widget-menu-trigger' );

    widget_archives_hierarchy_controller ( '.wp-block-categories li', '.children', 'parent-archive', 'block-archive-trigger' );
}

function widget_archives_hierarchy_controller ( list_item_selector, sublist_item_selector, parent_class, trigger_class ){
    jQuery( list_item_selector ).has( sublist_item_selector ).each( function (){
        jQuery( this ).addClass( parent_class );
        jQuery(this).append( "<span class='" + trigger_class + "'></span>" );
    });
    jQuery( list_item_selector + ">" + sublist_item_selector ).css( "display", "none" );
    jQuery( list_item_selector + ">.item-wrapper>" + sublist_item_selector ).css( "display", "none" );
    jQuery( document ).on( "click", "." + trigger_class, function (){
        var el = jQuery(this);
        var default_trigger = el.siblings( '.widget-archive-trigger' );        
        var sublist = el.siblings( sublist_item_selector );
        var sublist_alt = el.siblings('.item-wrapper').children( sublist_item_selector );
        if ( !sublist.length && !sublist_alt.length ) return;
        sublist = sublist.first();
        sublist_alt = sublist_alt.first();
        el.toggleClass('active');
        if(default_trigger.length) {
            default_trigger.toggleClass('active');
        }        
        sublist.slideToggle( 300 );
        sublist_alt.slideToggle( 300 );
    });
}

function fix_responsive_iframe () {
    jQuery('.video-embed > div').each(function() {
        jQuery(this).unwrap('.video-embed');
    });
}

function gallery_post_carousel_init () {
    jQuery('.post-gallery-carousel').owlCarousel({
        items:              1,
        lazyLoad:           true,
        loop:               true,
        dots:               false,
        nav:                true,
        navText:            ['', ''],
        autoplay:           true,
        autoplayTimeout:    5000,
        autoplayHoverPause: true,
        autoHeight:         true
    });
}

function elements_slider_init (elements) {
    var $elements = elements ? jQuery(elements) : jQuery('.elementor-element .owl-carousel');
    $elements.each( function() {
        let slider          =  jQuery(this),
            slider_options  = slider.data('slider-options'),
            itemsMobile     = 1,
            itemsTablet     = 1,
            itemsDesktop    = 1;
        if(!slider_options) {
            return;
        }
        switch (slider_options['items']) {
            case 2:
                itemsMobile     = 1;
                itemsTablet     = 2;
                itemsDesktop    = 2;
                break;
            case 3:
            case 4:
            case 5:
            case 6:
                itemsMobile     = 1;
                itemsTablet     = 2;
                itemsDesktop    = 3;
                break;
            default:
                break;
        }
        if ( jQuery('.slider-item', slider).length > slider_options['items'] ) {
            slider.owlCarousel({
                items:              slider_options['items'],
                // lazyLoad:           true,
                loop:               slider_options['loop'],
                dotsSpeed:          slider_options['speed'],
                dragEndSpeed:       slider_options['speed'],
                dots:               slider_options['dots'],
                dotsContainer:      jQuery(slider_options['dotsContainer']),
                nav:                slider_options['nav'],
                navText:            ['', ''],
                autoplay:           slider_options['autoplay'],
                autoplayTimeout:    slider_options['autoplayTimeout'],
                autoplayHoverPause: slider_options['autoplayHoverPause'],
                autoplaySpeed:      slider_options['autoplaySpeed'],
                autoHeight:         true,
                responsive:         {
                    0: {
                        items:  itemsMobile
                    },
                    768: {
                        items: itemsTablet
                    },
                    992: {
                        items: itemsDesktop
                    },
                    1200: {
                        items: slider_options['items']
                    }
                }
            });
        }
    });
}

function help_item_acardeon() {
    jQuery('.help-item').each( function() {
        jQuery('.help-item-title', this).on('click', function() {
            jQuery(this).siblings('.help-item-content').slideToggle(300).parents('.help-item').toggleClass('active');
        });
    });
}
help_item_acardeon();

function custom_video_play_button() {
    jQuery('.mejs-overlay-button').each(function () {
        jQuery(this).html('<svg viewbox="0 0 11 17"><path fill-rule="evenodd" fill="rgb(31, 30, 23)" d="M0.963,15.764 C0.963,15.26 0.963,2.62 0.963,1.552 C0.963,0.893 1.406,0.400 1.844,0.787 C2.194,1.97 9.205,7.344 9.803,7.879 C10.196,8.229 10.189,9.66 9.803,9.419 C9.372,9.810 2.335,16.90 1.826,16.526 C1.452,16.845 0.963,16.492 0.963,15.764 Z"/></svg>');        
    });
}
jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/video.default", function () {
        jQuery('.elementor-custom-embed-play').each(function () {
            jQuery(this).html('<svg viewbox="0 0 11 17"><path fill-rule="evenodd" fill="rgb(31, 30, 23)" d="M0.963,15.764 C0.963,15.26 0.963,2.62 0.963,1.552 C0.963,0.893 1.406,0.400 1.844,0.787 C2.194,1.97 9.205,7.344 9.803,7.879 C10.196,8.229 10.189,9.66 9.803,9.419 C9.372,9.810 2.335,16.90 1.826,16.526 C1.452,16.845 0.963,16.492 0.963,15.764 Z"/></svg>');
        });
    });
});


//Prodcution Listing Offset
function updateProductionListingOffset() {
	if(jQuery('.agrarium-productions-listing-widget.offset').length > 0) {
		jQuery('.agrarium-productions-listing-widget.offset').each(function() {
	        var $container = jQuery(this).find('.archive-listing');
	        if($container.length && window.innerWidth >= 768) {
	            var marginLeft = $container.offset().left;
	            var payload = 17;
	            var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	            $container.css({'marginRight': 0 - marginLeft - payload - scrollbarWidth});
	        } else {
	            $container.css('marginRight', '');
	        }
	    });
	}    
}

function isotopeInit(isotopeTrigger) {
    var isotopeTrigger = isotopeTrigger ? isotopeTrigger : '.isotope-trigger';
    if(jQuery(isotopeTrigger).length) {             
        return jQuery(isotopeTrigger).isotope({
          percentPosition: true,
          itemSelector: '.isotope-item',
          masonry: {
            columnWidth: '.grid-sizer'
          }
        });
    }    
    return null;
}   

// Parallax //
function background_image_parallax(object, multiplier){
    if ( object.length > 0 ) {
    	multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
        multiplier = 1 - multiplier;
        var doc = jQuery(document);
    	object.each(function(index, el) {
    		jQuery(el).css({
	          'background-attatchment': 'fixed'
	        });
	        jQuery(window).scroll(function () {
	            if (jQuery(window).width() >= 992) {
	                var from_top = doc.scrollTop() - jQuery(el).offset().top,
	                    bg_css = (multiplier * from_top) + 'px';
	                jQuery(el).css({
	                    'background-position-y': bg_css
	                });
	            } else {
	                jQuery(el).css({
	                    'background-position-y': ''
	                });
	            }
        	});
    	});        
    }
}

// Scroll Motion //
function scroll_motion_init(el, multiplier, range) {
	range = typeof range !== 'undefined' ? range : 500;
	// var doc = jQuery(document);
	var widget_container = jQuery(el).find('.elementor-widget-container');
	if (jQuery(window).width() >= 992) {		
		if(jQuery(el).hasClass('scroll-motion-direction-up')) {
            var from_top = jQuery(window).height()/2 - (widget_container[0].getBoundingClientRect().top + widget_container.height()/2);			
			if(from_top >= range) {
				from_top = range;
			}
			else if(from_top < -range) {
				from_top = -range;
			}
            var translateY = 'translateY(' + (multiplier * from_top) + 'px)';
            widget_container.css({
                'transform': translateY
            });
		} else if(jQuery(el).hasClass('scroll-motion-direction-down')) {
            var from_top = - jQuery(window).height()/2 + (widget_container[0].getBoundingClientRect().top + widget_container.height()/2);	
			if(from_top >= range) {
				from_top = range;
			}
			else if(from_top < -range) {
				from_top = -range;
			} 
            var translateY = 'translateY(' + (multiplier * from_top) + 'px)';
            widget_container.css({
                'transform': translateY
            });
		}
	} else {
        widget_container.css({
            'transform': 'translateY(0)'
        });
    }
}
function scroll_motion(object, multiplier, once){
    if ( object.length > 0 ) {
    	multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.8;
        multiplier = 1 - multiplier;      
        
    	object.each(function(index, el) {        			
            scroll_motion_init(el, multiplier, 500);              
            if(once) {
                jQuery(window).scroll(function () {
                    scroll_motion_init(el, multiplier, 500);
                });
            }	        
    	});        
    }
}

// ---------------------- //
// --- Document Ready --- //
// ---------------------- //
jQuery(window).load(function(){
	scroll_motion(jQuery('.scroll-motion-yes'), 0.8, true);
});
jQuery(document).ready(function () {   
		// Parallax
    background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.7);    

    if(jQuery(window).width() >= 1025) {
        jQuery('.agrarium_content_slider_widget').each(function() {
            var slider = jQuery(this);
            slider.find('.agrarium_content_slide').first().addClass('first-loaded');
            setTimeout(function(){
                slider.find('.agrarium_content_slide').first().removeClass('first-loaded');
            }, 30);
        });
    }
    
    // Mobile Menu
    function mobile_menu(){
        jQuery('.mobile-header-menu-container .main-menu, .extra-menu').find('.menu-item').each(function(i, el){
            if( jQuery(el).find('.sub-menu').length != 0 && jQuery(el).find('.sub-menu-trigger').length == 0 ){
                jQuery(el).append('<span class="sub-menu-trigger"></span>');
            }
        });

        jQuery('.sub-menu-trigger').off();
        jQuery('.sub-menu-trigger').on('click', function() {
            if( jQuery(this).parent().hasClass('active') ){
                jQuery(this).prev().slideUp();
                jQuery(this).parent().removeClass('active');
            } else {
                var currentParents = jQuery(this).parents('.menu-item');
                jQuery('.sub-menu-trigger').parent().not(currentParents).removeClass('active');
                jQuery('.sub-menu-trigger').parent().not(currentParents).find('.sub-menu').slideUp(300);

                jQuery(this).prev().slideDown();
                jQuery(this).parent().addClass('active');
            }
        });
    }
    mobile_menu();

    updateProductionListingOffset();

    // Custom Video Play Button
    setTimeout(custom_video_play_button, 800);

    widget_list_hierarchy_init();
    setTimeout(fix_responsive_iframe, 800);       

    setTimeout(function() {

    	gallery_post_carousel_init();    

    	jQuery('.agrarium-portfolios-listing-widget').imagesLoaded(function() {
	        isotopeInit();
	    });
    	jQuery('.production-slider-listing').imagesLoaded(function() {  
	        elements_slider_init(this.elements);
	    });
	    jQuery('.portfolio-slider-wrapper').imagesLoaded(function() {  
	        elements_slider_init(this.elements);
	    });      
      	elements_slider_init(':not(.production-slider-listing):not(.portfolio-slider-wrapper)');   
    } , 100);   
   
    if(jQuery('#demo').length > 0 && jQuery(window).width() >= 992) {
		// Demo Image Cursor
		function showCustomCursor(e) {
			const cursor = jQuery('.cursor');
		  // update position of cursor
		  cursor.css('left', e.clientX-5).css('top', e.clientY-5);
		}	

		jQuery('#demo').mousemove(showCustomCursor);    	
	}
    if(jQuery('#inner-pages-carousel').length > 0 && jQuery(window).width() >= 992) {
        // Demo Image Cursor
        function showCustomCursor(e) {
            const cursor = jQuery('.cursor_drag');
          // update position of cursor
          cursor.css('left', e.clientX-5).css('top', e.clientY-5);
        }   

        jQuery('#inner-pages-carousel').mousemove(showCustomCursor);        
    }
});

jQuery('#inner-pages-carousel').mouseleave(function(e) {
    if(!jQuery('body').hasClass('.elementor-editor-active')) {
        const cursor = jQuery('.cursor_drag');
        jQuery('#inner-pages-carousel').css({cursor: 'auto'});
        cursor.removeClass('active');
        setTimeout(function() {
            if(!cursor.hasClass('active')) {
                cursor.hide();
            }
        }, 300); 
    }    
});

jQuery('#inner-pages-carousel').mouseenter(function(e) {
    if(!jQuery('body').hasClass('.elementor-editor-active')) {
        const cursor = jQuery('.cursor_drag');
        jQuery('#inner-pages-carousel').css({cursor: 'none'});
        cursor.show();
        setTimeout(function() {
            cursor.addClass('active');
        }, 10);  
    } 
});

jQuery('#demo .elementor-element img').mouseleave(function(e) {
	if(!jQuery('body').hasClass('.elementor-editor-active')) {
      	jQuery('#demo a').css({cursor: 'auto'});
        const cursor = jQuery('.cursor');
        cursor.removeClass('active');
        setTimeout(function() {
            if(!cursor.hasClass('active')) {
                cursor.hide();
            }   
        }, 300);  
    }    
});

jQuery('#demo .elementor-element img').mouseenter(function(e) {
	if(!jQuery('body').hasClass('.elementor-editor-active')) {
      	jQuery('#demo a').css({cursor: 'none'});
        const cursor = jQuery('.cursor');
        cursor.show();
        setTimeout(function() {
            cursor.addClass('active');
        }, 10);  
    }    
});

// --------------------- //
// --- Window Resize --- //
// --------------------- //
jQuery(window).on('resize', function () {
    sticky_menu_active();
    sticky_menu_header_type_3_active();    
    updateProductionListingOffset();
    background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.7);
    scroll_motion(jQuery('.scroll-motion-yes'));
});

// --------------------- //
// --- Window Load --- //
// --------------------- //
jQuery(window).on('load', function () {      
});

(function ($){
    var loader;
    $.fn.start_loader = start_loader;
    $.fn.stop_loader = stop_loader;

    $( document ).ready(function (){
        page_loader_controller ();
    });

    function page_loader_controller (){
        var page_loader, interval, timeLaps ;
        page_loader = $( '.page-loader' );
        timeLaps = 0;
        interval = setInterval( function (){
            var page_loaded = check_if_page_loaded ();
            timeLaps ++;
            if ( page_loaded ||  timeLaps == 12) {
                clearInterval ( interval );
                page_loader.stop_loader ();
            }
        }, 10);
    }

    function check_if_page_loaded (){    	
        var keys, key, i, r;
        if ( window.modules_state == undefined ) return false;
        r = true;
        keys = Object.keys( window.modules_state );
        for ( i = 0; i < keys.length; i++ ){
            key = keys[i];
            if ( !window.modules_state[key] ){
                r = false;
                break;
            }
        }
        return r;
    }

    function start_loader (){
        var loader_container;
        loader = jQuery( this );
        if ( !loader.length ) return;
        loader_container = loader[0].parentNode;
        if ( loader_container != null ){
            loader_container.style.opacity = 1;
            setTimeout( function (){
                loader_container.style.display = "block";
            }, 10);
        }
    }

    function stop_loader (){
        var loader_container;
        loader = jQuery( this );
        if ( !loader.length ) return;
        loader_container = loader[0].parentNode;
        if ( loader_container != null ){
            loader_container.style.opacity = 0;
            setTimeout( function (){
                loader_container.style.display = "none";
            }, 200);
        }
    }

    // AJAX Pagination for Elementor Post Listing
    $('.elementor-widget').on('click', '.content-pagination a', function(e){
        if($(this).parents('.woocommerce-pagination').length > 0) {
            return;
        }
        e.preventDefault();
        var paged = null;
        var id = $(this).parents('.elementor-widget').attr('data-id');
        if ( $(this).hasClass('prev') ) {
            paged = parseInt($(this).siblings('.current').text()) - 1;
        } else if ( $(this).hasClass('next') ) {
            paged = parseInt($(this).siblings('.current').text()) + 1;
        } else {
            paged = parseInt($(this).text());
        }
        if($(this).parents('.isotope-filter').length > 0) {
        	var filter_taxonomy = $(this).parents('.isotope-filter').find('.filter-control-list').attr('data-taxonomy');
        	var filter_term     = $(this).parents('.isotope-filter').find('.filter-control-item.active').attr('data-value');
        	if ( filter_term === 'all' ) {
	            filter_term = null;
	        }
	        genre_get_posts(paged, id, filter_term, filter_taxonomy);
	        return;
        }
        genre_get_posts(paged, id, null, null);
    });

    // AJAX Filter for Elementor Post Listing
    $('.elementor-widget').on('click', '.filter-control-list .filter-control-item', function(e){
        e.preventDefault();
        var paged           = 1;
        var id              = $(this).parents('.elementor-widget').attr('data-id');
        var filter_term     = $(this).attr('data-value');
        var filter_taxonomy = $(this).parents('.filter-control-list').attr('data-taxonomy');
        if ( filter_term === 'all' ) {
            filter_term = null;
        }

        $(this).addClass('active').siblings('.filter-control-item').removeClass('active');

        genre_get_posts(paged, id, filter_term, filter_taxonomy);
    });

    // Main AJAX function
    function genre_get_posts(paged = 1, id = null, filter_term = null, filter_taxonomy = null) {
        var ajax_url    = ajax_params.ajax_url;
        var args        = $('.archive-listing', '.elementor-element-' + id).attr('data-ajax');
        var widget      = $('.archive-listing', '.elementor-element-' + id).attr('data-widget');
        var classes     = $('.archive-listing-wrapper', '.elementor-element-' + id).attr('class');

        $.ajax({
            type:       'POST',
            url:        ajax_url,
            data:       {
                action:             'pagination',
                args:               args,
                widget:             widget,
                paged:              paged,
                classes:            classes,
                id:                 id,
                filter_term:        filter_term,
                filter_taxonomy:    filter_taxonomy
            },
            beforeSend: function (){
                var height = $('.archive-listing', '.elementor-element-' + id).outerHeight();
                $('.archive-listing', '.elementor-element-' + id).height(height).addClass('loading');
            },
            success:    function(data){
                $('.archive-listing', '.elementor-element-' + id).html(data);
                if(typeof(window.wp.mediaelement) !== 'undefined') {                    
                    setTimeout(function() {
                        $(window.wp.mediaelement.initialize);
                    }, 10);
                }
                function onAjaxSuccess() {
                    setTimeout(function() {
                        var pagHeight = 0;                    
                        if($('.content-pagination', '.elementor-element-' + id).length > 0) {
                            pagHeight = $('.content-pagination', '.elementor-element-' + id).outerHeight();
                        }
                        var height = $('.archive-listing-wrapper', '.elementor-element-' + id).outerHeight() + pagHeight;
                        $('.archive-listing', '.elementor-element-' + id).height(height).removeClass('loading').css('height', '');
                        $('html, body').animate({
                            scrollTop: $('.archive-listing', '.elementor-element-' + id).offset().top - 200
                        }, 500);
                    }, 400);
                }
                setTimeout(function() {                    
                    var $isotope = $('.archive-listing', '.elementor-element-' + id).find('.isotope-trigger');
                    var isotope = isotopeInit($isotope[0]);
                    onAjaxSuccess();
                }, 100);              
                
                setTimeout(gallery_post_carousel_init, 300);
                setTimeout(fix_responsive_iframe, 600);
                setTimeout(custom_video_play_button, 100);
            },
            error:      function(){
                $('.archive-listing', '.elementor-element-' + id).html('<p class="error">AJAX ERROR</p>');
            }
        });
    }


}(jQuery));
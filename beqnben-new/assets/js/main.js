$(document).foundation();

$(document).ready(function() {

    Fancybox.bind("[data-fancybox]", {
        // Your options go here
    });

    $('.js-play-vid').on('click', function() {
        $('.video-cover').addClass('video-started')

        if ($('.resolve-featured-section').length > 0) {
            iframe = $(this).closest('.resolve-featured-section').find('iframe')
            iframe = $(this).closest('.resolve-featured-section').find('iframe').trigger('click')
            iframe = $(this).closest('.resolve-featured-section').find('iframe').click()
            console.log('asfasdfasf')
            player = new Vimeo.Player(iframe);
            player.play();
        } else {
            iframe = $(this).closest('.video-hold').find('iframe')
            player = new Vimeo.Player(iframe);
            player.play();
        }
    })


    var sts = window.pageYOffset || document.documentElement.scrollTop; 
    stss = sts - 2
    console.log(sts)
    window.scrollTo({top: stss, behavior: 'smooth'});

    var lastScrollTop = 0;
    window.addEventListener("scroll", function(){ 
    var st = window.pageYOffset || document.documentElement.scrollTop; 
    if (st > lastScrollTop){
        $('header').addClass('scrolling-down')
        $('header').removeClass('scrolling-up')
        // downscroll code
    } else {
        $('header').removeClass('scrolling-down')
        $('header').addClass('scrolling-up')
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);

    setTimeout(function(){
        $('.logo').addClass('close')
    }, 100);
    setTimeout(function(){
        $('.nav').addClass('close')
    }, 150);
    setTimeout(function(){
        $('.header-cta').addClass('close')
    }, 550);

    setTimeout(function(){
        $('.intro-title-text-cta .title-123').addClass('intro-anim')
    }, 650);

    setTimeout(function(){
        $('.intro-title-text-cta .text-18').addClass('intro-anim')
    }, 900);
    setTimeout(function(){
        $('.intro-title-text-cta .intro-ttc-link').addClass('intro-anim')
    }, 1000);

    $('.roi-share-input span').on('click', function() {
        $('.roi-share-input input').select();
        document.execCommand("copy");
    })

    // function copyToClipboard() {
    //     var textBox = document.getElementById("myvalue");
    //     textBox.select();
    //     document.execCommand("copy");
    // }


    // $('#field-assumptions').on('change', function() {
    //     console.log('input changed')
    //     if ($(this).val() == 'cpc') {
    //         $('a[data-assumptions="cpc"]').addClass('active')
    //         $('a[data-assumptions="aas"]').removeClass('active')
    //     }
    //     if ($(this).val() == 'aas') {
    //         $('a[data-assumptions="cpc"]').removeClass('active')
    //         $('a[data-assumptions="aas"]').addClass('active')
    //     }
    // })

    $('.roi-step .assumptions-content ul li a').on('click', function() {
        if ($(this).hasClass('active')) {
        } else {
            $('.roi-step .assumptions-content ul li a').removeClass('active')
            $(this).addClass('active')
            $('.assumptions-content .slide').slideUp()
            $(this).parent().find('.slide').slideDown()
        }
    })

    // trigger click

    $(".hamburger").click(function() {
        $(".hamburger").toggleClass('is-active')
        $('.mob-nav-hold').toggleClass('close');
    });

    $(".mob-nav > ul > li.has-subnav a").on('click', function() {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active')
            $(this).parent().find('.subnav-hold').slideUp()
        } else {
            $(this).parent().addClass('active')
            $(this).parent().find('.subnav-hold').slideDown()
        }
    });

    $(".ia-acc ul li").on('click', function() {
        iaNr = $(this).attr('data-ia')
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $(this).find('.ia-acc-text').slideUp()
        } else {
            $('.ia-image img').removeClass('active')
            $('.ia-image img[data-ia='+iaNr+']').addClass('active')
            $(".ia-acc ul li").removeClass('active')
            $('.ia-acc-text').slideUp()
            $(".ia-acc ul li").removeClass('active')
            $(this).addClass('active')
            $(this).find('.ia-acc-text').slideDown()
        }
    });

    // Entry table scroll wrap
    $( ".entry table" ).wrap( "<div class='table-scroll'></div>" );

    // #ScrollToTop

    // $("a[href='#top']").click(function() {
    //   $("html, body").animate({ scrollTop: 0 }, "slow");
    //   return false;
    // });


    // #href scroll //

    // $('a[href^="#"]').on('click',function (e) {
    //     e.preventDefault();

    //     var target = this.hash;
    //     var $target = $(target);

    //     $('html, body').stop().animate({
    //         'scrollTop': $target.offset().top
    //     }, 700, 'swing', function () {
    //         window.location.hash = target;
    //     });
    // });


    v1Carousel = $('.owl-carousel.vertical-d-carousel')
    v1Carousel.owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        item: 3,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        nav:false,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 3000,
        slideTransition: 'linear',
    })
    
    v2Carousel = $('.owl-carousel.vertical-u-carousel')
    v2Carousel.owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        item: 3,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        nav:false,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 3000,
        rtl: true,
        slideTransition: 'linear',
    })

    tCarousel = $('.owl-carousel.t-carousel')
    tCarousel.owlCarousel({
        loop:true,
        margin:43,
        nav:false,
        dots: true,
        autoWidth: true,
        rtl:true,
        // responsive:{
        //     0:{
        //         items:1
        //     },
        //     600:{
        //         items:3
        //     },
        //     1000:{
        //         items:5
        //     }
        // }
        
    })

    etCarousel = $('.owl-carousel.et-carousel')
    etCarousel.owlCarousel({
        loop:true,
        margin:43,
        nav:false,
        dots: true,
        autoWidth: true,
        // responsive:{
        //     0:{
        //         items:1
        //     },
        //     600:{
        //         items:3
        //     },
        //     1000:{
        //         items:5
        //     }
        // }
        
    })

    relatedCarousel = $('.owl-carousel.related-carousel')
    relatedCarousel.owlCarousel({
        loop:true,
        margin:20,
        nav:false,
        dots: true,
        item:3,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
        
    })

    $('.t-prev').click(function() {
        tCarousel.trigger('prev.owl.carousel');
        etCarousel.trigger('prev.owl.carousel');
        relatedCarousel.trigger('prev.owl.carousel');
    }) 
    $('.t-next').click(function() {
        tCarousel.trigger('next.owl.carousel');
        etCarousel.trigger('next.owl.carousel');
        relatedCarousel.trigger('next.owl.carousel');
    }) 

    historyCarousel = $('.owl-carousel.history-carousel')
    historyCarousel.owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:true,
        autoWidth: true,
        responsive:{
            0:{
                margin:20,
            },
            640:{
                margin:30,
            },
            1024:{
                margin:40,
            },
            1200:{
                margin:44,
            }
        }
    })


    resolveCarousel = $('.owl-carousel.resolve-carousel')
    resolveCarousel.owlCarousel({
        loop:true,
        margin:2,
        nav:true,
        dots: false,
        items:1,
        navText: ["<span><strong>Previous Video</strong></span>","<span><strong>Watch Next Video</strong></span>"]
        
    })


    nlCarousel = $('.owl-carousel.nl-carousel')
    nlCarousel.owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 3000,
        slideTransition: 'linear',
        autoWidth: true
    })

    setTimeout(function(){
        nlCarousel.trigger('next.owl.carousel');
    }, 1000);

    $('.resolve-list ul li a').on('click', function(e) {
        thiss = $(this)
        thissNr = $(this).attr('data-resolve')
        neededNr = thissNr - 1
        console.log(neededNr)
        
        setTimeout(function(){
            resolveCarousel.trigger("to.owl.carousel", [neededNr, 300]);
        }, 500);
        setTimeout(function(){
            iframe1 = $('.owl-item.active .resolve-carousel-item').find('iframe')
            player1 = new Vimeo.Player(iframe1);
            player1.play();
        }, 600);

    })

    $(document).on("click", ".resolve-carousel.owl-carousel .owl-nav button.owl-prev", function() {
        console.log('prev clicked')
        setTimeout(function(){
            iframe2 = $('.owl-item.active .resolve-carousel-item iframe')
            player2 = new Vimeo.Player(iframe2);
            player2.play();
        }, 300);
    })
    $(document).on("click", ".resolve-carousel.owl-carousel .owl-nav button.owl-next", function() {
        console.log('next clicked')
        setTimeout(function(){
            iframe3 = $('.owl-item.active .resolve-carousel-item iframe')
            player3 = new Vimeo.Player(iframe3);
            player3.play();
        }, 300);
    })

    $('[data-reveal]').on('closed.zf.reveal', function () {
        iframe4 = $('.owl-item.active .resolve-carousel-item iframe')
        player4 = new Vimeo.Player(iframe4);
        player4.pause();
    });

    Splitting()

    $('.intro-title-text-cta .title-123 span').wrap('<span></span>')


    var $window = $(window);

    // ------ on scroll starts ------ //
    $(window).on('scroll', function () {
        st = $(this).scrollTop();
        vHeight = $(window).height();

        if (st > 20) {
            $('header').stop().addClass('scrolled');
        } else {
            $('header').stop().removeClass('scrolled');
        }

        if ($('.home-why-fixed-hold').length > 0) {

            var hwTop = $('.home-why-fixed-image-item-1').offset().top
            var hwTop2 = $(".home-why-fixed-image-item-2").offset().top
            var hwTop3 = $(".home-why-fixed-image-item-3").offset().top
            var hwTop4 = $(".home-why-fixed-image-item-4").offset().top
            var hwTopLast = $(".home-why-fixed-image-item-last").offset().top
    
            cofImg1 = (st - hwTop) / 2
            cofImg2 = (st - hwTop2) / 2
            cofImg3 = (st - hwTop3) / 2
            // cofImg2 = (st - hwTop)
            // cofImg3 = (st - hwTop2)
    
            // console.log(cofImg1)
    
            if (st > hwTop) {
                $('.home-why-fixed-hold').addClass('top-reached')
                $('.home-why-fixed-image-item-1 .hw-image img' ).css('transform', 'translateY('+cofImg1+'px)')
            } else {
                $('.home-why-fixed-hold').removeClass('top-reached')
                $('.home-why-fixed-image-item-1 .hw-image img' ).css('transform', 'translateY(0px)')
            }
            if (st > hwTop2 ) {
                $('.home-why-fixed-image-item-2 .hw-image img' ).css('transform', 'translateY('+cofImg2+'px)')
            } else {
                $('.home-why-fixed-image-item-2 .hw-image img' ).css('transform', 'translateY(0px)')
            }
            if (st > hwTop3 ) {
                $('.home-why-fixed-image-item-3 .hw-image img' ).css('transform', 'translateY('+cofImg3+'px)')
            } else {
                $('.home-why-fixed-image-item-3 .hw-image img' ).css('transform', 'translateY(0px)')
            }
    
    
    
    
            if (st > hwTop - vHeight / 2) {
                $('.home-why-fixed-hold').addClass('hw-text-1-reached')
            } else {
                $('.home-why-fixed-hold').removeClass('hw-text-1-reached')
            }
    
            if (st > hwTop2 - vHeight / 2) {
                $('.home-why-fixed-hold').addClass('hw-text-2-reached')
            } else {
                $('.home-why-fixed-hold').removeClass('hw-text-2-reached')
            }
    
            if (st > hwTop3 - vHeight / 2) {
                $('.home-why-fixed-hold').addClass('hw-text-3-reached')
            } else {
                $('.home-why-fixed-hold').removeClass('hw-text-3-reached')
            }

            if (st > hwTop4 - vHeight / 2) {
                $('.home-why-fixed-hold').addClass('hw-text-4-reached')
            } else {
                $('.home-why-fixed-hold').removeClass('hw-text-4-reached')
            }
    
            if (st > hwTopLast - vHeight) {
                $('.home-why-fixed-hold').addClass('last-reached')
            } else {
                $('.home-why-fixed-hold').removeClass('last-reached')
            }
            
        }

        // if (document.querySelector('.trusted-list') !== null) {
        //     trustedListH = $('.trusted-list').outerHeight()
        //     var homeLogoT = $(".trusted-list").offset().top - (vHeight / 2.5) + (trustedListH / 2);
        //     console.log(homeLogoT)

        //     var homeLogo1Cof = (st - homeLogoT) * -0.1;
        //     if (homeLogo1Cof > 0) {
        //         $('.trusted-list ul li:nth-child(1)').css('transform','translate(0,'+homeLogo1Cof+'px)');
        //     }

        //     var homeLogo2Cof = (st - homeLogoT) * -0.05;
        //     if (homeLogo2Cof > 0) {
        //         $('.trusted-list ul li:nth-child(2)').css('transform','translate(0,'+homeLogo2Cof+'px)');
        //     }

        //     var homeLogo4Cof = (st - homeLogoT) * 0.05;
        //     if (homeLogo4Cof < 0) {
        //         $('.trusted-list ul li:nth-child(4)').css('transform','translate(0,'+homeLogo4Cof+'px)');
        //     }

        //     var homeLogo5Cof = (st - homeLogoT) * 0.1;
        //     if (homeLogo5Cof < 0) {
        //         $('.trusted-list ul li:nth-child(5)').css('transform','translate(0,'+homeLogo5Cof+'px)');
        //     }
        // }

    });
    // ------ on scroll ends ------ //



        // animations
        var $animation_elements = $('.animation-element');
        $vHeight = $(window).height();
        function check_if_in_view() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);
            $.each($animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top + $vHeight / 10;
                var element_bottom_position = (element_top_position + element_height);
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                        setTimeout(function(){
                            $element.addClass('in-view');
                        }, 200);
                } 
            });
        }
        $window.on('scroll resize', check_if_in_view);
        $window.trigger('scroll');


    // press show more

    $('.press-archive-list ul li:lt(9)').show();

    pressItems = $(".press-archive-list ul li").size();
    if (pressItems < 10) {
        $('.js-more-press').parent().hide();
    } else {
        $('.js-more-press').parent().show();
    }

    $('.js-more-press').click(function () {
        shownPress = $('.press-archive-list ul li:visible').size()+9;
        if (shownPress < pressItems) {
            $('.press-archive-list ul li:lt('+shownPress+')').show();
        } else {
            $('.press-archive-list ul li:lt('+pressItems+')').show();
            $('.js-more-press').parent().hide();
        }
    });



    $('.filter-box span').on('click', function() {
        $(this).closest('li').siblings().find('.filter-box').removeClass('active')
        if ($(this).closest('.filter-box').hasClass('active')) {
            $(this).closest('.filter-box').removeClass('active')
        } else {
            $(this).closest('.filter-box').addClass('active')
        }
    })
    
    $(document).on('click', function (e) {
        if ($(e.target).is(".filter-box, .filter-box *") === false) {
          $('.filter-box').removeClass('active')
        }
    });


    // filter partners
var $filterCheckboxes = $('.filter-grid input[type="checkbox"]');

function containsAny(source,target) {
    var result = source.filter(function(item){ return target.indexOf(item) > -1});   
    return (result.length > 0);  
}  

function resourceCenterFilter() {   
    
    $('.grid-of-four ul li').each(function(){
        var arrCategory = [],
            arrLocation = []

        var getCategory = $(this).attr('data-category'), 
            getLocation = $(this).attr('data-location');           
            
        arrCategory = getCategory.split(' ');
        arrLocation = getLocation.split(' ');

        if ( resCategory && resCategory.length > 0) {
            var resCategoryCheck = containsAny(resCategory,arrCategory);
        } else {
            resCategoryCheck = true;
        }

        if ( resLocation && resLocation.length > 0) {
            var resLocationCheck = containsAny(resLocation,arrLocation);
        } else {
            resLocationCheck = true;
        }

           
        if( resCategoryCheck && resLocationCheck ) {
            $(this).show();
            // resFilteredItemCount++;
        } else {
            $(this).hide();
        }
    });
    
}


var resCategory = [],
resLocation =[];
$('.filter-box-list-category input[type="checkbox"]').on('change', function() {
    var checked = $(this).val();
    if ($(this).is(':checked')) {
        resCategory.push(checked);
    } else {
        resCategory.splice($.inArray(checked, resCategory),1);
    }
    resourceCenterFilter();
    $("#filter-search").val('');
});

$('.filter-box-list-location input[type="checkbox"]').on('change', function() {
    var checked = $(this).val();
    if ($(this).is(':checked')) {
        resLocation.push(checked);
    } else {
        resLocation.splice($.inArray(checked, resLocation),1);
    }
    resourceCenterFilter();
    $("#filter-search").val('');
});

$("#filter-search").on("keyup", function() {
    $('.filter-grid input[type="checkbox"]').prop('checked', false);
    var searchValue = $(this).val().toLowerCase();

    $(".grid-of-four ul li").filter(function() {
        $(this).toggle($(this).find('span').text().toLowerCase().indexOf(searchValue) > -1)
    });
});



// filter stories
var $storiesCheckboxes = $('.filter-grid input[type="checkbox"]');

function containsAny(source,target) {
    var result = source.filter(function(item){ return target.indexOf(item) > -1});   
    return (result.length > 0);  
}  

function storiesFilter() {   
    var resFilteredOptions = 0;
    $('.resource-tiles-list ul li').each(function(){
        var arrOption1 = []
            arrOption2 = []
            if ($('.resource-tiles-list ul li[data-option3]').length > 0) {
                arrOption3 = []
            }

        var getOption1 = $(this).attr('data-option1'), 
            getOption2 = $(this).attr('data-option2');    
            if ($('.resource-tiles-list ul li[data-option3]').length > 0) {       
            getOption3 = $(this).attr('data-option3');   
            }        
            
        arrOption1 = getOption1.split(' ');
        arrOption2 = getOption2.split(' ');
        if ($('.resource-tiles-list ul li[data-option3]').length > 0) {
        arrOption3 = getOption3.split(' ');
        }

        if ( resOption1 && resOption1.length > 0) {
            var resOption1Check = containsAny(resOption1,arrOption1);
        } else {
            resOption1Check = true;
        }

        if ( resOption2 && resOption2.length > 0) {
            var resOption2Check = containsAny(resOption2,arrOption2);
        } else {
            resOption2Check = true;
        }

        // if ($('.resource-tiles-list ul li[data-option3]').length > 0) {
            if ( resOption3 && resOption3.length > 0) {
                var resOption3Check = containsAny(resOption3,arrOption3);
            } else {
                resOption3Check = true;
            }
        // }

        
        if( resOption1Check && resOption2Check && resOption3Check ) {
            $(this).addClass('filtered-option');
            resFilteredOptions++;
        } else {
            $(this).removeClass('filtered-option');
        }
    });
    $('.resource-tiles-list ul li').hide(); 
    var optionsItemsFiltered = $('.resource-tiles-list ul li.filtered-option').length;
    if (optionsItemsFiltered > 9) {
        $('.js-more-resource-tiles').parent().show();
    } else {
        $('.js-more-resource-tiles').parent().hide();
    }
    $('.resource-tiles-list ul li.filtered-option:lt(9)').show();   
}

function filterSearch() {
    if ($('#options-search').val().length > 0) {
        // $('.filter-grid input[type="checkbox"]').prop('checked', false);
        var searchOption = $('#options-search').val().toLowerCase();
    
        $(".resource-tiles-list ul li.filtered-option").filter(function() {
            $(this).toggle($(this).find('.item-title, .rt-text, .item-text').text().toLowerCase().indexOf(searchOption) > -1)
        });
        $('.js-more-resource-tiles').parent().hide();
    } else {
        $('.resource-tiles-list ul li').hide(); 
        var optionsItemsFiltered = $('.resource-tiles-list ul li.filtered-option').length;
        if (optionsItemsFiltered > 9) {
            $('.js-more-resource-tiles').parent().show();
        } else {
            $('.js-more-resource-tiles').parent().hide();
        }
        $('.resource-tiles-list ul li.filtered-option:lt(9)').show(); 
    }
}

var resOption1 = [],
resOption2 =[],
resOption3 =[];

// $('#all1').on('change', function() {

//     if ($('#all1').is(':checked')) {
//         console.log('all checked')
//     } else {
//         console.log('all un checked')
//     }
// })

$('.filter-box-list-option-1 input[type="checkbox"]').on('change', function() {
    var checked = $(this).val();
    
    if ($(this).is(':checked')) {
        resOption1.push(checked);
    } else {
        resOption1.splice($.inArray(checked, resOption1),1);
    }
    storiesFilter();
    if ($('#options-search').length > 0) {
        filterSearch();
    }
    // $("#options-search").val('');
});

$('.filter-box-list-option-2 input[type="checkbox"]').on('change', function() {
    var checked = $(this).val();
    if ($(this).is(':checked')) {
        resOption2.push(checked);
    } else {
        resOption2.splice($.inArray(checked, resOption2),1);
    }
    storiesFilter();
    if ($('#options-search').length > 0) {
        filterSearch();
    }
    // $("#options-search").val('');
});

$('.filter-box-list-option-3 input[type="checkbox"]').on('change', function() {
    var checked = $(this).val();
    if ($(this).is(':checked')) {
        resOption3.push(checked);
    } else {
        resOption3.splice($.inArray(checked, resOption3),1);
    }
    storiesFilter();
    if ($('#options-search').length > 0) {
        filterSearch();
    }
    // $("#options-search").val('');
});

$("#options-search").on("keyup", function() {
    filterSearch();
});

storiesFilter();


$('.js-more-resource-tiles').click(function () {
    var resourceItems = $('.resource-tiles-list ul li.filtered-option').length;
    var shown = $('.resource-tiles-list ul li.filtered-option:visible').length + 9;
    if(shown< resourceItems) {
        $('.resource-tiles-list ul li.filtered-option:lt('+shown+')').show();
    } else {
        $('.resource-tiles-list ul li.filtered-option:lt('+resourceItems+')').show();
        $('.js-more-resource-tiles').parent().hide();
    }    
});





// filter search page
// var $storiesCheckboxes = $('.filter-grid input[type="checkbox"]');

// function containsAny(source,target) {
//     var result = source.filter(function(item){ return target.indexOf(item) > -1});   
//     return (result.length > 0);  
// }  

// function searchFilter() {   
//     var searchItems = 0;
//     $('.search-item').each(function(){
//         var arrSearch = []

//         var getSearch = $(this).attr('data-search'),           
            
//         arrSearch = getSearch.split(' ');

//         if ( resSearch && resSearch.length > 0) {
//             var resSearchCheck = containsAny(resSearch,arrSearch);
//         } else {
//             resSearchCheck = true;
//         }

        
//         if( resSearchCheck ) {
//             $(this).addClass('filtered-search');
//             searchItems++;
//         } else {
//             $(this).removeClass('filtered-search');
//         }
//     });
//     $('.search-item').hide(); 
//     var optionsItemsFiltered = $('.search-item.filtered-search').length;
//     if (optionsItemsFiltered > 5) {
//         $('.js-more-search').parent().show();
//     } else {
//         $('.js-more-search').parent().hide();
//     }
//     $('.search-item.filtered-search:lt(5)').show();   
// }


// var resSearch = []
// $('.search-results-filter input[type="checkbox"]').on('change', function() {
//     var checked = $(this).val();
//     if ($(this).is(':checked')) {
//         resSearch.push(checked);
//     } else {
//         resSearch.splice($.inArray(checked, resSearch),1);
//     }
//     searchFilter();
// });



// searchFilter();


// $('.js-more-search').click(function () {
//     var resourceItems = $('.search-item.filtered-search').length;
//     var shown = $('.search-item.filtered-search:visible').length + 5;
//     if(shown< resourceItems) {
//         $('.search-item.filtered-search:lt('+shown+')').show();
//     } else {
//         $('.search-item.filtered-search:lt('+resourceItems+')').show();
//         $('.js-more-search').parent().hide();
//     }    
// });

// $(".js-clear").click(function() {
//     $('.search-results-filter input[type="checkbox"]').prop('checked', false);
//     $('.search-results-filter input[type="checkbox"]').trigger('change')
// });


    $(window).on('scroll', function () {
        scrollTop = $(this).scrollTop();
        vHeight = $(window).height();
       
        if (document.querySelector('.single-content-section') !== null) {
            var singleTop = $(".single-content-section").offset().top;
            var singleH = $(".single-content-section").outerHeight()

            isiH = ((scrollTop - singleTop) * 100) / (singleH - vHeight)

            console.log(isiH)
            if (isiH < 100) {
                $('.single-content-scrollbar span').css('height', isiH+'%')
            } else {
                $('.single-content-scrollbar span').css('height', '100%')
            }
        }
        
    });


    $('.sticky-fake-nav ul li a').on('click', function() {
        fakeID = $(this).parent().attr('data-fake')
        console.log(fakeID)
        $('html, body').stop().animate({
            'scrollTop': $('#'+fakeID).offset().top
        }, 700, 'swing', function () {
        });
    })

    var lastId,
    topMenu = $(".sticky-content-dots"),
    topMenuHeight = topMenu.outerHeight(),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });


    $(window).scroll(function(){
        vHeight = $(window).height();     
        var fromTop = $(this).scrollTop() + (vHeight / 2);
        // var fromTop = $(this).scrollTop()+topMenuHeight;

        var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
        });
        cur = cur[cur.length-1];
    //    console.log(cur)
        var id = cur && cur.length ? cur[0].id : "sticky-content-item-1"; 
        // if(cur){
        //     $('nav ul li a').map(function(){
        //         if($(this).attr('href') == '#'+cur[0].id){
        //             $('nav ul li').removeClass('current'); 
        //             $(this).parent().addClass('current');                
        //         }                
        //     });
        // }        
        if (lastId !== id) {
        lastId = id;
        menuItems
            .parent().removeClass("is-active")
            .end().filter("[href='#"+id+"']").parent().addClass("is-active");
        }   
        
        var curGeek = $('.sticky-content-dots ul li.is-active a').attr('href');
        if(curGeek) {
            var curGeekTitle = curGeek.substring(1);
        }

        $('.sticky-content-item').removeClass('is-active')
        $('.sticky-content-item[data-sticky-item='+curGeekTitle+']').addClass('is-active')
        $('.sticky-fake-nav ul li').removeClass('is-active')
        $('.sticky-fake-nav ul li[data-fake='+curGeekTitle+']').addClass('is-active')

        // if (curGeek == '#sticky-slider-block-4') {
        //     $('.video-hold video')[0].play()
        // }
    });
    

    


 });


$(document).ready(function () {

  var animation_elements = $.find('.animation-element');
  var web_window = $(window);

  function check_if_in_view() {
    var window_height = web_window.height();
    var window_top_position = web_window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each(animation_elements, function () {

      var element = $(this);
      var element_height = $(element).outerHeight();
      var element_top_position = $(element).offset().top;
      var element_bottom_position = (element_top_position + element_height);
      if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
        element.addClass('in-view');
      } else {
        element.removeClass('in-view');
      }
    });
 
  }

  $(window).on('scroll resize', function () {
    check_if_in_view()
  })
  $(window).trigger('scroll');

  $('.slick-carousel').slick({
    centerMode: true,
    centerPadding: '30px',
    slidesToShow: 3,
    arrows: true,
    // prevArrow: '<button type="button" class="slick-prev">Previous</button>',
    // nextArrow: '<button type="button" class="slick-next">Next</button>',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

});

$('.slick-carousel-full').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1
});
		

// $(function () {
//   // Owl Carousel
//   var owl = $(".owl-carousel");
//   owl.owlCarousel({
//     center: true,
//     items: 2,
//     loop: true,
//     margin: 10,
//     autoHeight: true,
//     responsive: {
//       0: {
//         items: 1,
//         nav: true
//       },
//       600: {
//         items: 3,
//         nav: false
//       },
//       1000: {
//         items: 5,
//         nav: true,
//         loop: false
//       }
//     }
//   });
// });

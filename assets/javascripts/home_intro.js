window.HomeIntro = function() {
  var $mainNavEle = $('.x-main-nav');

  function mainNavScroll() {
    var scrollTopLimit = 50;

    function scroll() {
      if ( $(window).scrollTop() < 50) {
        $mainNavEle.removeClass('scrolled');
      } else{
        $mainNavEle.addClass('scrolled');
      }
    }

    scroll();
    $(window).scroll(function() {
      scroll();
    });
  }

  function fullScreenSlider() {
    if ($('.fullscreen-carousel').length == 0) {
      return false;
    }

    $('.fullscreen-carousel').flexslider({
      animation: "slide",
      //  startAt: 0,
      animationSpeed: 700,
      animationLoop: true,
      slideshow: true,
      easing: "swing",
      controlNav: false,

      before: function (slider) {
        $('.fullscreen-carousel .overlay-hero .caption-hero').
          fadeOut().
          animate({ top: '0px' }, { queue: false, easing: 'easeOutQuad', duration: 700 });

        slider.slides.eq(slider.currentSlide).delay(400);
        slider.slides.eq(slider.animatingTo).delay(400);
      },

      after: function (slider) {
        $('.fullscreen-carousel .flex-active-slide .caption-hero').
          fadeIn(2000).
          animate({ top: '0' }, { queue: false, easing: 'easeOutQuad', duration: 1200 });

        BackgroundCheck.refresh();
      },

      start: function (slider) {
        $('body').removeClass('loading');
        BackgroundCheck.init({
          targets: '.full-intro',
          images: '.flexslider li img',
        });
      },

      useCSS: true,
    });
  }

  fullScreenCarousel();

  function fullScreenCarousel() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    if ($(window).width() > 767) {
      $('.hero-slider .slides li').css("height", windowHeight);
    }
    else {
      $('.hero-slider .slides li').css("height", '400px');
    }
  }

  $(window).resize(function () {
    fullScreenCarousel();
  });

  function setup() {
    mainNavScroll();
    fullScreenSlider();
  }

  return {
    setup: setup
  }
}()

;

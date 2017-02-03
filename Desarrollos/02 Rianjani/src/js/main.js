"use strict";

(() => {

  /***************************
  * OWL CAROUSEL SETTINGS
  ****************************/
  var owl = $('.owl-carousel');
  owl.owlCarousel({
      items:1,
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:false
  });

  /***************************
  * WOW animated
  ****************************/

  new WOW().init();


  /***************************
  * SCROLL PAGE NAV
  ****************************/

  $('.nav a').bind('click', function(e){
    e.preventDefault();

    let $anchor = $(this);
    let offset = $('body').attr('data-offset');

    $('html, body').animate({
        scrollTop: $($anchor.attr('href')).offset().top - (offset)
    }, 1000);
  });

  // colocar la clase active
  var sections = $('section'),
  nav = $('#nav'),
  nav_height = nav.outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function() {
      var top = $(this).offset().top - nav_height,
          bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');

      }
    });
  });


  /***************************
  * NAV STYKY
  ****************************/
  $(".nav").sticky({ topSpacing : 0 });

})();

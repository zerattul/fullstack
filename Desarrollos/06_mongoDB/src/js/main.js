// ::::::::::: Main.js :::::::::::: //
"use strict";

// ::::::::::: nav sticky :::::::::::: //
$("#nav").sticky({ topSpacing : 0 });

// ::::::::::: scroll page :::::::::::: //
$('.nav a').bind('click', function(e){
  e.preventDefault();

  let $anchor = $(this);
  let offset = $('body').attr('data-offset');

  $('html, body').animate({
      scrollTop: $($anchor.attr('href')).offset().top - (offset)
  }, 1000);
});


// ::::::::::: active class :::::::::::: //
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

      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');

    }
  });
});

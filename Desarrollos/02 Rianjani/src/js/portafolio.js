"use strict";

$(() => {
  var $container = $('.work-grid');

    var isotopePortfolio = function(filter){
      $container.isotope({
          filter: filter,
          masonry: {
              isFitWidth: false
          }
      });
    };

    isotopePortfolio('*');

  $(".work__nav").find("a").click(function(e){
    e.preventDefault();

    var selector = $(this).attr('data-filter');

    isotopePortfolio(selector);
  });

  $(".work-grid").magnificPopup({
      delegate: 'a',
      type: 'image',
      fixedContentPos: false,
      gallery: {
          enabled: true,
          preload: [0,2],
          navigateByImgClick: false,
          arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
          tPrev: 'Previous (Left arrow key)',
          tNext: 'Next (Right arrow key)'
      }
  });
})();

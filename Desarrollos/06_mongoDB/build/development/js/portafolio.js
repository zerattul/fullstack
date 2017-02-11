// ::::::::::: portafolio :::::::::::: //
"use strict";

$(function () {
    var $container = $('.work-portfolio');

    var isotopePortfolio = function isotopePortfolio(filter) {
        $container.isotope({
            filter: filter,
            masonry: {
                isFitWidth: false
            }
        });
    };

    isotopePortfolio('*');

    $(".work-menu").find("a").click(function (e) {
        e.preventDefault();

        var selector = $(this).attr('data-filter');

        isotopePortfolio(selector);
    });

    //lightbox
    $(".work-portfolio").magnificPopup({
        delegate: 'a',
        type: 'image',
        fixedContentPos: false,
        gallery: {
            enabled: true,
            preload: [0, 2],
            navigateByImgClick: false,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)'
        }
    });
})();
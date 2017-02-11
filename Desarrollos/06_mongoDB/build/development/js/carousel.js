// ::::::::::: carousel :::::::::::: //
"use strict";

(function () {

    //who
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false
    });

    // testimonials
    $("testimonial-carousel").owlCarousel({
        items: 3,
        autoPlay: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
})();

//testimonials
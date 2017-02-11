'use strict';
// ::::::::::: carousel :::::::::::: //
"use stric";

$(function () {
    var skills = function skills() {
        $('.skillCol-barsCont').find('.skillCol-barsCont-item').each(function () {
            var newWidth = $(this).parent().width() * ($(this).data('percent') / 100);
            $(this).css('width', newWidth);
        });
    };
    skills();
})();
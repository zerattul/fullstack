'use strict';
"use stric";

$(function () {
    var skills = function skills() {
        $('.skill-chart').find('.skill__charBar').each(function () {
            var newWidth = $(this).parent().width() * ($(this).data('percent') / 100);
            $(this).css('width', newWidth);
        });
    };
    skills();
})();
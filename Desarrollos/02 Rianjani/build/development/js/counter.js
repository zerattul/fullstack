"use strict";

$(function () {
  $(".facts__li").one("inview", function (isInView) {
    if (isInView) {
      $(".facts__count").countTo();
    }
  });
})();
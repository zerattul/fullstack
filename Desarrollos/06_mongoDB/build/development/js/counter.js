// ::::::::::: carousel :::::::::::: //
"use strict";

$(function () {
  $(".factsList-item").one("inview", function (isInView) {
    if (isInView) {
      $(".factsList-item__count").countTo();
    }
  });
})();
"use strict";

$(() => {
  $(".facts__li").one("inview", (isInView) => {
    if (isInView){
      $(".facts__count").countTo();
    }
  })
})();

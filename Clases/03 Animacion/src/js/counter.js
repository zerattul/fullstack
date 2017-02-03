// ::::::::::: counter.js :::::::::::: //
"use strict";

$(() => {
  $(".factsList-item").one("inview", (isInView) => {
    if(isInView){
      $(".factsList-item__count").countTo();
    }
  })
})();

// ::::::::::: skill.js :::::::::::: //
$(() =>{
  let skill = () => {
    $(".skillCol-barsCont").find(".skillCol-barsCont-item").each(function(){
      let newWidth = $(this).parent().width() * ($(this).data("percent") / 100);

      $(this).css("width", newWidth);
    });
  };

  skill();
})();

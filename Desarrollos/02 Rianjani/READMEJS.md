# PASOS ANIMACION

## Crear menu stcky

Crear un archivo llamado main.js en la carpeta js

Configurar el sticky menu. Para el scroll page se necesita agregar un data-offset al body en el archivo pug


:: index.pug
```
body(data-offset="70")
```

:: main.js
```
"use strict";

(() => {

  /***************************
  * NAV STYKY
  ****************************/
  $(".nav").sticky({ topSpacing : 0 });


  /***************************
  * SCROLL PAGE NAV
  ****************************/
  $('.nav a').bind('click', function(e){
    e.preventDefault();

    let $anchor = $(this);
    let offset = $('body').attr('data-offset');

    $('html, body').animate({
        scrollTop: $($anchor.attr('href')).offset().top - (offset)
    }, 1000);
  });


  /***************************
  * CLASS SCROLL
  ****************************/
  var sections = $('section'),
  nav = $('#nav'),
  nav_height = nav.outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function() {
      var top = $(this).offset().top - nav_height,
          bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');

      }
    });
  });
})();
```

## CAROUSEL

Mandar llamar los archivos en gulp file

:: gulpfile.js
```
`${dir.nm}/owl.carousel/dist/assets/owl.theme.default.min.css`,
"css/main.css",

`${dir.nm}/owl.carousel/dist/owl.carousel.min.js`,
```

Crear un nuevo archivo js llamado carousel
Documentación http://www.owlcarousel.owlgraphic.com/docs/started-welcome.html


:: carousel.js
```
"use strict";

(() => {
  /***************************
  * OWL CAROUSEL SETTINGS
  ****************************/
  var owl = $('.owl-carousel');
  owl.owlCarousel({
      items:1,
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:false
  });
})();
```

Agregar las clases necesarias en index.pug

:: index.pung
```
div.who--cont
  div.owl-carousel.owl-theme.owl-loaded.who--wrap
    div.item
      img(src="img/who-we-are-image-1.jpg" alt="")
    div.item
      img(src="img/who-we-are-image-1.jpg" alt="")
  div.owl-dots
    div.owl-dot.active
      span
    div.owl-dot
      span
```

## WOWJS

Mandarlos llamar los archivos
documentacion https://wowjs.uk/docs.html

::gulpfile
```
`${dir.nm}/wowjs/dist/wow.min.js`,
```


Crear un nuevo archivo llamado wowjs.js

```
"use strict";

(() => {

  /***************************
  * WOW animated
  ****************************/
  new WOW().init();

})();
```
Agregar las clases para los estilos

:: index.pug > Seccion who
```
 div.who--cont.wow.fadeInUp
 div.who--wrap.wow.fadeInUp(data-wow-delay="1s")
```

::Seccion facts
```
ul.facts__list.wow.fadeInUp
```

::Section  why
```
 li.why__element.wow.flipInY
  li.why__element.wow.flipInY(data-wow-delay="1s")
```

::Section skill
```
 div.skill-text.wow.flipInX
  div.skill-text.wow.flipInY
```

::servicies
```
li.servicies__element.wow.flipInY
```

::quote
```
 .quote-cont.wow.fadeInUp
```

::team
```
 .team-cont
  div.team-contImg.wow.fadeInUp(data-wow-delay="0.1s")
    img(src="img/meet-the-team-image-1.jpg").team__img
  div.team-contImg.wow.fadeInUp(data-wow-delay="0.3s")
    img(src="img/meet-the-team-image-2.jpg").team__img
  div.team-contImg.wow.fadeInUp(data-wow-delay="0.5s")
    img(src="img/meet-the-team-image-3.jpg").team__img
  div.team-contImg.wow.fadeInUp(data-wow-delay="0.7s")
    img(src="img/meet-the-team-image-4.jpg").team__img
```

::testimonials
```
  div.testimonial-item.wow.flipInY
```

::pricing
```
.wow.fadeInUp(data-wow-delay="0.2s")
```

## Counter facts

Mandar llamar los archivos
Documentacion https://github.com/mhuggins/jquery-countTo

Para que no se ejecute desde el inicio el contador se necista la libreria inview
Documentacion https://github.com/protonet/jquery.inview

```
`${dir.nm}/jquery-countto/jquery.countTo.js`,
`${dir.nm}/jquery-inview/jquery.inview.min.js`,
```

Crear un archivo counter.js

::counter.js
```
"use strict";

$(() => {
  $(".facts__li").one("inview", (isInView) => {
    if (isInView){
      $(".facts__count").countTo();
    }
  })
})();

```

Modificar el index

::index.pug
```
  span(data-form="2780" data-to="3120" data-refresh-interval="5")
```

## Skill

Crear un archivo pie-chart.js

::pie-chart.js
```
"use stric";

$( () => {
    var skills = () => {
        $('.skill-chart').find('.skill__charBar').each(function(){
            var newWidth = $(this).parent().width() * ($(this).data('percent') / 100);
            $(this).css('width', newWidth);
        });
    };
    skills();
})();
```

::index.pug
```
div.skill__charBar(data-percent="50")
```

## Portafolio

Mandarllamar archivos

Documentacion http://isotope.metafizzy.co/
Documentacion http://dimsemenov.com/plugins/magnific-popup/documentation.html

```
`${dir.nm}/isotope-layout/dist/isotope.pkgd.min.js`,
`${dir.nm}/magnific-popup/dist/jquery.magnific-popup.min.js`,
```

Crear archivo portafolio.js

::portafolio.js  
```
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
  })
});
```

::index.pug

```
  ul.work__nav
    li.work__menu
      a(href="#", data-filter="*").work__link ALL
    li.work__menu
      a(href="#", data-filter=".identity").work__link IDENTY
    li.work__menu
      a(href="#", data-filter=".logo").work__link LOGO
    li.work__menu
      a(href="#", data-filter=".illustration").work__link ILLUSTRATION

  .work-grid
    div.work-content.identity  
    div.work-content.logo
```

Configurar los popups

::index.pug
```
.work-grid
  div.work-content.identity
    .work-hoverCont
      img(src="img/portfolio/portfolio-image-1.jpg")
      .work-hover
        a(href="img/portfolio/portfolio-image-1.jpg" title="Proyect title 1").work__img
          h3.work__title Proyect Title 1
          h4.work__subtitle Lorem Ipsum

  div.work-content.identity
    .work-hoverCont
      img(src="img/portfolio/portfolio-image-2.jpg")
      .work-hover
        a(href="img/portfolio/portfolio-image-2.jpg" title="Proyect title 1").work__img
          h3.work__title Proyect Title 2
          h4.work__subtitle Lorem Ipsum
```

::work.scss
```
@function widthItem ($column, $gutter ){
  @return calc(#{$column} - #{$gutter});
}

@mixin flexgrid($item, $columns, $gutter:1rem){
  $column: 100% / $columns;
  display : flex;
  flex-wrap : wrap;
  width : 100%;

  #{$item}{
    width : widthItem($column, $gutter);
    margin : $gutter / 2;
  }
}

.work-grid{
  @include flexgrid(".work-content", 3)

    .work-hoverCont{
      width : 100%;
      height: 100%;
      text-align: center;
      overflow: hidden;

      &:hover .work-hover{
        opacity: 1;
      }

      &:hover img{
        transform : scale(1.2);
      }

      .work-hover{
        position : absolute;
        top : 0;
        left : 0;
        width : 100%;
        height: 100%;
        cursor : pointer;
        display : flex;
        justify-content: center;
        align-items: center;
        color : $whiteBG;
        flex-direction: column;
        background-color: hsla(0,0,10,0.7);
        opacity: 0;
        transition : all 300ms ease;
        z-index : 20;

        .work__img{
          width : 100%;
          height: 100%;
          display : flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .work__title, .work__subtitle{
          font-weight: 300;
          font-size: 2rem;
          color : hsl(0,0,79);
        }

        .work__title{
          padding-bottom: 1rem;
        }
      }

      img{
        max-width: 100%;
        transition : all 300ms ease;
        display : block;
        position : relative;
      }
    }

```

::portafolio.js
```
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
```

## Testmonials

::index.pug

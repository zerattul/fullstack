# ANIMACION

## WOWJS

Mandar llamar archivos en gulfile

::gulpfile.js
```
`${dir.nm}/wowjs/dist/wow.min.js`,
```

Crear un archivo wow.js

```
"use strict";

console.log("hola");
(() => {
  new WOW().init();
})();

```

Agregar las clases a cada sección

::who
```
div.owl-carousel.owl-theme.owl-loaded.who-col.wow.bounceInUp

div(data-wow-delay="300ms").who-col.who-text.wow.bounceInUp
```

::facts
```
ul.factsList.wow.fadeInUp
```

::why
```
li.whyList-item.wow.flipInY
li.whyList-item.wow.flipInY
li.whyList-item.wow.flipInY
li.whyList-item.wow.flipInY
li.whyList-item.wow.flipInY
li.whyList-item.wow.flipInY
```

::skills
```
.skillCol.wow.flipInX
.skillCol.wow.flipInY
```

::servicies
```
div.servicesItem.wow.flipInY
div.servicesItem.wow.flipInY
div.servicesItem.wow.flipInY
```

::quote
```
.quote.wow.fadeInUp
```

::team
```
ul.factsList.wow.fadeInUp
```

::social
```
ul.social.wow.fadeInUp
```

::team
```
li(data-wow-delay="100ms").team-item.wow.fadeInUp
  +pic("meet-the-team-image-1", "jpg")
li(data-wow-delay="200ms").team-item.wow.fadeInUp
  +pic("meet-the-team-image-1", "jpg")
li(data-wow-delay="300ms").team-item.wow.fadeInUp
  +pic("meet-the-team-image-1", "jpg")
li(data-wow-delay="400ms").team-item.wow.fadeInUp
  +pic("meet-the-team-image-1", "jpg")
```

::testimonials
```
.testimonials-item.wow.flipInY
.testimonials-item.wow.flipInY
.testimonials-item.wow.flipInY
```

::pricing
```
li(data-wow-delay="100ms").pricing-item.wow.fadeInUp
li(data-wow-delay="200ms").pricing-item.wow.fadeInUp
li(data-wow-delay="300ms").pricing-item.wow.fadeInUp
li(data-wow-delay="300ms").pricing-item.wow.fadeInUp
```

::coming
```
ul.coming-list.wow.fadeInUp
```

::history
```
div.history-item-cont.wow.fadeInLeft
```

## NAV

Mandar llamar los archivos

::gulpfie
```
`${dir.nm}/jquery-sticky/jquery.sticky.js`,
```

Agregar una propiedad al body
```
body(data-offset="70")
```

Crear un archivo nav.js

```
"use strict";

// ::::::::::: nav sticky :::::::::::: //
$("#nav").sticky({ topSpacing : 0 });

// ::::::::::: scroll page :::::::::::: //
$('.nav a').bind('click', function(e){
  e.preventDefault();

  let $anchor = $(this);
  let offset = $('body').attr('data-offset');

  $('html, body').animate({
      scrollTop: $($anchor.attr('href')).offset().top - (offset)
  }, 1000);
});


// ::::::::::: active class :::::::::::: //
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

      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');

    }
  });
});
```

## OWL CARROUSEL

Mandar llamar los archivos

::gulpfile
```
`${dir.nm}/owl.carousel/dist/assets/owl.carousel.min.css`,
`${dir.nm}/owl.carousel/dist/assets/owl.theme.default.min.css`,

`${dir.nm}/owl.carousel/dist/owl.carousel.min.js`,
```

Crear un archivo carousel.js

::caroulse.js
```
  //who
  var owl = $('.owl-carousel');
  owl.owlCarousel({
      items:1,
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:false
  });
```

Agregar las clases en el html

::index.pug
```
div.owl-carousel.owl-theme.owl-loaded.who-col.wow.bounceInUp
```

## CONTADOR FACTS

Mandar llamar los archivos

::gulpfile.js
```
`${dir.nm}/jquery-countto/jquery.countTo.js`,
`${dir.nm}/jquery-inview/jquery.inview.min.js`,
```

Crear un archivo conuter.js

::counter.js
```
"use strict";

$(() => {
  $(".factsList-item").one("inview", (isInView) => {
    if (isInView){
      $(".factsList-item__count").countTo();
    }
  })
})();

```

Modificar el html

::index.pug
```
span(data-form="2780" data-to="3120" data-refresh-interval="5").factsList-item__count 2780
span(data-form="487" data-to="645" data-refresh-interval="5").factsList-item__count 487
span(data-form="13730" data-to="14350" data-refresh-interval="5").factsList-item__count 13730
span(data-form="154" data-to="234" data-refresh-interval="5").factsList-item__count 154
```

## SKILLS

Modificar el html

::index.pug
```
.skillCol-barsCont-item(data-percent="50")
.skillCol-barsCont-item(data-percent="65")
.skillCol-barsCont-item(data-percent="75")
.skillCol-barsCont-item(data-percent="90")
.skillCol-barsCont-item(data-percent="70")
.skillCol-barsCont-item(data-percent="80")
```

Crear un archivo llamado chart.js

::chart.js
```
"use stric";

$( () => {
    var skills = () => {
        $('.skillCol-barsCont').find('.skillCol-barsCont-item').each(function(){
            var newWidth = $(this).parent().width() * ($(this).data('percent') / 100);
            $(this).css('width', newWidth);
        });
    };
    skills();
})();
```

## WORK

Agregar archivos

::gulpfile.js
```
`${dir.nm}/magnific-popup/dist/magnific-popup.css`,

`${dir.nm}/isotope-layout/dist/isotope.pkgd.min.js`,
```

Modificar el html

::index.pug
```
a(href="#" data-filter="*").work-menu-item__link ALL
a(href="#" data-filter=".identity").work-menu-item__link IDENTITY  
a(href="#" data-filter=".logo").work-menu-item__link LOGO
a(href="#" data-filter=".illustration").work-menu-item__link
```

Agregar a cada .work-portfolio-item diferentes filtros

::index.pug
```
.work-portfolio-item.identity
.work-portfolio-item.logo
.work-portfolio-item.logo
.work-portfolio-item.identity
.work-portfolio-item.logo
.work-portfolio-item.identity
.work-portfolio-item.logo
.work-portfolio-item.illustration
.work-portfolio-item.illustration
```

crear portafolio.js

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
  });
})();
```

## PORTAFOLIO POPUP(modal, lightbox)

Modificar el html


::index.pug
```
.work-portfolio
  .work-portfolio-item.identity
    .work-portfolio-item-cont
      +pic("portfolio/portfolio-image-1", "jpg")
      .work-portfolio-item-cont-hover
        a(href="img/portfolio/portfolio-image-1.jpg").work-portfolio-item-cont-hover__img
          h3.work-portfolio-item-cont-hover__title PROYECT TITLE 1
          h4.work-portfolio-item-cont-hover__subtitle Lorems Ipsum
```

Modificar el css

::work.scss
```
&-portfolio-item-cont{
  width      : 100%;
  height     : 100%;
  text-align : center;
  overflow   : hidden;

  &:hover &-hover{
    opacity : 1;
  }

  &:hover img{
    transform : scale(1.2);
  }

  &-hover{
    position         : absolute;
    top              : 0;
    left             : 0;
    width            : 100%;
    height           : 100%;
    cursor           : pointer;
    display          : flex;
    justify-content  : center;
    align-items      : center;
    color            : $whiteBG;
    flex-direction   : column;
    background-color : hsla(0,0,10,0.7);
    opacity          : 0;
    transition       : all 300ms ease;
    z-index          : 20;

    &__img{
      width           : 100%;
      height          : 100%;
      display         : flex;
      flex-direction  : column;
      justify-content : center;
      align-items     : center;
    }

    &__title, &__subtitle{
      font-weight : 300;
      font-size   : 1.5rem;
      color       : hsl(0,0,79);
    }

    &__title{
      padding-bottom : 1rem;
    }
  }

  img{
    max-width  : 100%;
    transition : all 300ms ease;
    display    : block;
    position   : relative;
  }
}
```

Agregar efecto modal/lightbox

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

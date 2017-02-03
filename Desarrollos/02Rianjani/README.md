# PASOS CLASE RIANJANI

## 1.- Maquetar section intro

Maquetar la sección de Inicio

```
section#intro.intro
  .m-center
    .introWrapper
      div.intro-logo
        h1.intro__h1 R

      div.intro-text
        h2.intro__h2 Clean, Awesome and Multi-Purpose.
        p.intro__text Responsive Multi-Purpose Theme For Running Serious Business

      div.intro-btn
        a(href="#").m-btnIntro Learn More
```

## 2.- Estructura de carpetas CSS y archivos sass

Dentro de la carpeta de sass agregar carpetas y archivos

```
- sass
-- base
--- _base.scss
--- _reset.scss
-- layout
-- module
```

Modificar el archivo main.scss

```
// Variables para los pesos de las fuentes
  $light  : 300;
  $normal : 400;
  $bold   : 700;

// Paleta de colores
  $grisBG  : #141414;
  $verde   : #1abc9c;
  $whiteBG : #f2f2f2;
  $fontBLK : #b7ada4;

// Estilos Base
  $body--bg    : #f2f2f2;
  $body--fz    : 16px;
  $body--ff    : 'Open Sans', sans-serif;
  $body--color : #292929;

// Tamaños de los encabezados
  $h1 : 3.5em;
  $h2 : 3em;
  $h3 : 2.5em;
  $h4 : 2em;
  $h5 : 1.5em;
  $h6 : 1em;

// Estilos de enlaces
  $link--color : initial;

// Estilos parrafos
  $p--fz  : 1em;
  $p--lh  : 1.5em;

// Imporar Base
  @import "base/_reset";
  @import "base/_base";
```

Crear archivo intro.scss dentro de la carpeta layout y mandarlo importar desde main.scss y module.scss

```
// Importar Layout
  @import "layout/_intro.scss"
```

## 3.- Iniciar de a llegan de contenido intro.scss

```
.intro{
  background-color: $grisBG;
  height: 100vh;
  display : flex;
  justify-content: center;
}
```

## 4.- Iniciar de a llegan de contenido module.scss

```
.m-center{
  display : flex;
  flex-direction: column;
  justify-content: center;
  width : 1100px;
  max-width: 1440px;
}
```

## 5.- Terminar los estilos de intro.scss

```
.intro{
  background-color: $grisBG;
  height: 100vh;
  display : flex;
  justify-content: center;

  .introWrapper{
    text-align: center;
    display : flex;
    justify-content: space-between;
    flex-direction: column;
    height: 35%;

    .intro__h1, .intro-text{
      color : $whiteBG;
    }

    .intro-logo, .intro-text, .intro-btn{
      display : flex;
    }

    .intro-logo{
      justify-content: center;

      .intro__h1{
        border        : 1px solid $whiteBG;
        font-size     : 5.5em;
        padding       : 1rem 2rem;
        border-radius : 0px 15px;
        display : inline-block;
      }
    }

    .intro-text{
      flex-direction: column;

      .intro__h2{
        font-size: 3em;
      }

      .intro__text{
        font-size: 1.5em;
        padding-top: 1em;
      }
    }

    .intro-btn{
      justify-content: center;
    }
  }
}
```
## 6.- Crear y agregar archivo mixins.scss

Importar desde module.scss

```
@import "mixins";
```

## 7.- Agregar estilos

```
@mixin btn($btn-color, $btn-fz){
  color           : $whiteBG;
  background-color: $btn-color;
  border          : 1px solid $btn-color;
  font-size       : $btn-fz;
  padding         : 1rem 2rem;
  border-radius   : 5px;
  transition      : all 0.3s ease;
  font-weight     : $light;
  cursor          : pointer;
  &:hover {
    background-color: darken($btn-color, 10);
  }
}
```

## 8.- Llamar el primer mixin para el boton

```
//Llamadas mixin
  .mx-btnIntro { @include btn($verde, 1.2em) }
```

## 9.- Crear la siguiente sección

Crear el mixin hasta arriba del archivo pug

```
mixin menu(url, name)
  li.nav--element #[a(href=`${url}`) #{name}]
```

```
//- Nav
nav#nav.nav
  div.m-center
    div.nav--wrapper
      div.nav-logo
        a(href="#intro").nav__logo Rianjani

      div.nav-listCont
        ul.nav--list
          +menu("#who", "ABOUT")
          +menu("#skill", "SKILLS")
          +menu("#servicies", "SERVICIES")
          +menu("#work", "PORTAFOLIO")
          +menu("#team", "TEAM")
          +menu("#testimonial", "TESTIMONIALS")
          +menu("#pricing", "PRICING")
          +menu("#contact", "CONTACT")
```

## 9.- Crear e importar archivo nav.scss

```
//Llamadas mixin
  .mx-btnIntro { @include btn($verde, 1.2em) }
```

## 10.- Llenar de estilos nav.scss

```
.nav{
  background-color        : lighten($grisBG, 5);
  display                 : flex;
  justify-content         : center;
  height                  : 70px;
  align-items             : center;
  z-index                 : 20 !important;

  .nav--wrapper {
    display               : flex;
    width                 : 100%;
    align-items           : center;

    .nav-logo {
      width               : 20%;

      .nav__logo {
        color             : $whiteBG;
        font-size         : 2em;
        text-transform    : uppercase;
        letter-spacing    : 4px;
      }
    }

    .nav-listCont{
      width               : 80%;

      .nav--list {
        display           : flex;
        justify-content   : space-between;

        .nav--element {
          text-align      : center;

          a {
            color         : $whiteBG;
            transition    : all 0.3s ease;
            padding       : 1.7rem 1rem;
            display       : inline-block;

            &             :hover{
              color       : $verde;
            }
          }
        }

        .active{
          background-color: $verde;
        }
      }
    }
  }
}

```

## 11.- Maquetar seccion who

Agregar mixin

```
mixin pic(name, ext)
  picture
    source(srcset=`img/webp/${name}.webp`, type="image/webp")
    img(src=`img/${name}.${ext}`)
```

Seccion who

```
//- Who
section#who.m-section
  div.m-center
    div.m-wrapper
      div.m--titleCont.mx-titleBlack
        h2.m__h2 Who We Are?
        h3.m__h3 Some Things You Should Know About Us
        span.m__lineBottom

      div.who--cont
        div.owl-carousel.owl-theme.owl-loaded.who--wrap.wow.bounceInUp
          div.item
            +pic("who-we-are-image-1", "jpg")
        div.owl-dots
          div.owl-dot.active
            span
          div.owl-dot
            span

        div.who--wrap.who--text.who--wrap.wow.bounceInUp
          h4.m__h4 A Little About Our Past
          p.m__text Gunung Rinjani adalah gunung yang berlokasi di Pulau Lombok, Nusa Tenggara Barat. Gunung ini merupakan gunung favorit bagi pendaki Indonesia karena keindahan pemandangannya. Gunung ini merupakan bagian dari Taman Nasional Gunung Rinjani yang memiliki luas sekitar 41.330 ha dan ini akan diusulkan penambahannya sehingga menjadi 76.000 ha ke arah barat dan timur. Secara administratif gunung ini berada dalam wilayah tiga kabupaten: Lombok Timur, Lombok Tengah dan Lombok Barat. Gunung Rinjani dengan titik tertinggi 3.726 m dpl, mendominasi sebagian besar pemandangan Pulau Lombok bagian utara. Di sebelah barat kerucut Rinjani terdapat kaldera dengan luas sekitar 3.500 m x 4.800 m, memanjang kearah timur dan barat.
          div.btn-gen
            a(href="#").mx-btn Read More
```

## 12.- agregar propiedades a module.scss


```
.m-section{
  display        : flex;
  flex-direction : column;
  align-items    : center;
}

.m-center{
  display        : flex;
  flex-direction : column;
  justify-content: center;
  width          : 1100px;
  max-width      : 1440px;
}

.m-wrapper{
  margin: 5em 0;
}

.m--titleCont {
  display       : flex;
  flex-direction: column;
  align-items   : center;
}

.m__h4{
  letter-spacing: 5px;
  font-size     : 2rem;
  font-weight   : 300;
  margin-bottom : 1.5rem;
}
```


## 13.- Crear un nuevo mixin

```
@mixin titles($color){
  .m__h2 {
    color         : $color;
    font-weight   : 300;
    font-size     : 4em;
    padding-bottom: 1.5rem;
  }

  .m__h3 {
    color      : $color;
    font-weight: 300;
    font-size  : 1.5em;
    text-align : center;
  }

  .m__lineBottom {
    color        : $color;
    border-bottom: 1px solid $color;
    display      : inline-block;
    width        : 80px;
    padding      : 2.5rem 0 0;
  }
}
```

Mandarlo llamar en el archivo modules

```
//Llamadas mixin
  .mx-btnIntro { @include btn($verde, 1.2em) }
```

## 14.- Maquetar seccion who

Agregar mixin

```
.mx-titleBlack       { @include titles(hsl(0,0,20)) }
.mx-btn              { @include btn($verde, 1em    )}
```

## 15.- Maquetar seccion facts

```
//- Facts
  section#facts.m-section.facts
    div.m-center
      div.m-wrapper
        .m--titleCont.mx-titleWhite
          h2.m__h2 FUN FACTS
          h3.m__h3 SOME OF THE COOL FACTS ABOUT US THAT WILL BLOW YOUR MIND
          span.m__lineBottom
        .facts-icons
          ul.facts__list
            li.facts__li
              span.icon-thumbs-o-up.facts__icon
              span.facts__count 2780
              span.facts__word PROYECTS
            li.facts__li
              span.icon-smile-o.facts__icon
              span.facts__count 487
              span.facts__word CLIENTS
            li.facts__li
              span.icon-coffee.facts__icon
              span.facts__count 13730
              span.facts__word COFFEE
            li.facts__li
              span.icon-gift.facts__icon
              span.facts__count 154
              span.facts__word AWARDS
```

## 16.- Agegar fuentes

Mandar carpeta fonts a development y en gulpfile mandar llamar estilos de las fuentes

```
CSS : [
  `${dir.nm}/animate.css/animate.min.css`,
  "css/main.css",
  "css/styles.css"
],
```

Acomodar la ruta de las fuentes agregando un ../ a todas las extenciones

```
@font-face {
  font-family: "untitled-font-1";
  src:url("../fonts/untitled-font-1.eot");
  src:url("../fonts/untitled-font-1.eot?#iefix") format("embedded-opentype"),
    url("../fonts/untitled-font-1.woff") format("woff"),
    url("../fonts/untitled-font-1.ttf") format("truetype"),
    url("../fonts/untitled-font-1.svg#untitled-font-1") format("svg");
  font-weight: normal;
  font-style: normal;
}
```

## 17.- crear archviso facts.scss, importarlo y agregar estilos

```
@import "layour/_facts.scss"

.facts{
  background-color: $grisBG;

  .facts-icons{
    margin-top: 5em;

    .facts__list{
      display        : flex;
      justify-content: space-between;

      .facts__li{
        display        : flex;
        flex-direction : column;
        justify-content: space-between;
        align-items    : center;

        .facts__icon{
          color : $verde;
          font-size: 5em;
        }

        .facts__count{
          font-size: 6em;
          color : #f2f2f2;
          padding: 1rem 0;
          font-weight: 300;
        }

        .facts__word{
          color : $verde;
          font-size: 2em;
          font-weight: 300;
        }
      }
    }
  }
}
```

Crear el mixin para textos blancos

```
.mx-titleWhite       { @include titles(hsl(0,0,50))   
```

## 18.- Maquetar seccion why


```
  //- why
  section#why.m-section
    div.m-center
      div.m-wrapper
        div.m--titleCont.m-titleBlack
          h2.m__h2 WHY CHOOSE US?
          h3.m__h3 6 REASONS WHY WE ARE THE BEST
          span.m__lineBottom

        div.why-cont
          ul.why__list
            li.why__element
              div.why__iconCont
                span.icon-rocket.why__icon
              div.why__text
                h3.m__h4 SPEED
                p.m__text Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat
            li.why__element
              div.why__iconCont
                span.icon-thumbs-o-up.why__icon
              div.why__text
                h3.m__h4 QUALITY
                p.m__text Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat
            li.why__element
              div.why__iconCont
                span.icon-star.why__icon
              div.why__text
                h3.m__h4 EXPERTISE
                p.m__text Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat
            li.why__element
              div.why__iconCont
                span.icon-shield.why__icon
              div.why__text
                h3.m__h4 SECURITY
                p.m__text Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat
            li.why__element
              div.why__iconCont
                span.icon-paper-plane-o.why__icon
              div.why__text
                h3.m__h4 RELIABILITY
                p.m__text Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat
            li.why__element
              div.why__iconCont
                span.icon-life-ring.why__icon
              div.why__text
                h3.m__h4 PRICE
                p.m__text Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat
```
## 19.- crear y agregar estilos en why.scss

## 17.- crear archviso facts.scss, importarlo y agregar estilos

```
@import "layour/_why.scss"

.why-cont{
  margin-top: 4em;

  .why__list{
    display : flex;
    flex-wrap: wrap;

    .why__element{
      width : 33%;
      padding: 0 1em 3em;
      display : flex;

      &:hover{
        cursor : pointer;
      }


      .why__iconCont{
        margin-right: 1rem;

        .why__icon{
          background-color: $verde;
          color : white;
          font-size: 1.5rem;
          padding : 0.5rem 0.5rem  0.2rem 0.5rem;
          border-radius: 5px;
          display : inline-block;
        }
      }
    }
  }
}

```
## 10.- Maquetar seccion who

Agregar mixin

```
//Llamadas mixin
  .mx-btnIntro { @include btn($verde, 1.2em) }
```

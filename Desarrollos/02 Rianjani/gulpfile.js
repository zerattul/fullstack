"use strict";

// Declaración de variables

const gulp         = require("gulp"),
      browserSync  = require("browser-sync").create(),
      autoprefixer = require("gulp-autoprefixer"),
      babel        = require("gulp-babel"),
      cleanCSS     = require("gulp-clean-css"),
      htmlmin      = require("gulp-htmlmin"),
      imagemin     = require("gulp-imagemin"),
      plumber      = require("gulp-plumber"),
      pngquant     = require("imagemin-pngquant"),
      unCSS        = require("gulp-uncss"),
      useref       = require("gulp-useref"),
      webp         = require("gulp-webp"),
      pug          = require("gulp-pug"),
      uglify       = require("gulp-uglify"),
      gulpif       = require("gulp-if"),
      browserify   = require("gulp-browserify"),
      sass         = require("gulp-sass"),
      env          = process.env.NODE_ENV || "development",
      dir          = {
        src        : "src",
        outputDir  : "build/development",
        production : "build/production",
        nm         : "node_modules",
      },
      files        = {
        CSS  : [
          `${dir.nm}/animate.css/animate.min.css`,
          `${dir.nm}/owl.carousel/dist/assets/owl.carousel.min.css`,
          `${dir.nm}/magnific-popup/dist/magnific-popup.css`,
          `${dir.nm}/owl.carousel/dist/assets/owl.theme.default.min.css`,
          "css/main.css",
          "https:\/\/file.myfontastic.com/S5SZgipAZYzxmK84A7WbVX/icons.css",
        ],
        mCSS : "main.min.css",
        JS   : [
          `${dir.nm}/jquery/dist/jquery.min.js`,
          `${dir.nm}/jquery-sticky/jquery.sticky.js`,
          `${dir.nm}/owl.carousel/dist/owl.carousel.min.js`,
          `${dir.nm}/jquery-countto/jquery.countTo.js`,
          `${dir.nm}/wowjs/dist/wow.min.js`,
          `${dir.nm}/jquery-inview/jquery.inview.min.js`,
          `${dir.nm}/isotope-layout/dist/isotope.pkgd.min.js`,
          `${dir.nm}/magnific-popup/dist/jquery.magnific-popup.min.js`,
          `${dir.nm}/easy-pie-chart/dist/jquery.easypiechart.min.js`,
          "js/map.js",
          "js/carousel.js",
          "js/counter.js",
          "js/carousel.js",
          "js/pie-chart.js",
          "js/main.js",
          "https:\/\/maps.googleapis.com/maps/api/js?key=AIzaSyC0H2unMmgW4DDv2xP1rmFUtHXvS9CaZT0&callback=initMap",
        ],
        mJS  : "main.min.js",
      },
      opts = {
        pug           : {
          pretty      : true,
          locals      : {
            title     : "Titulo Loco",
            files     : files
          }
        },
        sass          : { outputStyle : "expanded" },
        es6           : { presets : ['es2015'] },
        imagemin      : {
          progressive : true,
          use         : [pngquant()]
        },
      };


// Task pug
gulp.task("pug", function(){
  return gulp.src("src/templates/**/*.pug")
  .pipe(plumber())
  .pipe(pug(opts.pug))
  .pipe(gulp.dest(`${dir.outputDir}`))
  .pipe(browserSync.reload({ stream : true }));
});

// Task JS
gulp.task("js", function() {
  return gulp.src("src/js/**.*js")
    .pipe(plumber())
		.pipe( babel(opts.es6) )
		.pipe( gulp.dest(`${dir.outputDir}/js`) )
    .pipe(browserSync.reload({stream : true}));
});

// Task Stylus
gulp.task("sass", function(){
  return gulp.src("src/sass/**/*.scss")
    .pipe(plumber())
    .pipe( sass(opts.sass) )
    .pipe(gulp.dest(`${dir.outputDir}/css`))
    .pipe(browserSync.reload({stream : true}));
});

// Task img
gulp.task('img', () => {
  return gulp.src( `${dir.src}/img/**/*.+(png|jpge|jpg|gif)` )
    .pipe(plumber())
    .pipe( imagemin(opts.imagemin))
    .pipe( gulp.dest(`${dir.outputDir}/img`) );
});

//task webp
gulp.task('webp', () => {
	return gulp.src( `${dir.src}/img/**/*.+(png|jpeg|jpg)` )
    .pipe(plumber())
		.pipe( webp() )
		.pipe( gulp.dest(`${dir.outputDir}/img/webp`) );
});

gulp.task("watch", function(){
  gulp.watch("src/templates/**/*.pug", ["pug"]);
  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/sass/**/*.scss", ["sass"]);
});

// Task default de prueba
gulp.task("default", ["pug", "js", "sass", "watch", "server"]);
gulp.task ("images", ["img", "webp"]);

// Task browserSync (Server)
gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: `${dir.outputDir}`,
      routes: {
        "/node_modules": `${dir.nm}`,
        }
      }
  })
});

/*
  1.- Crear variables

    var gulp        = require("gulp"),
        pug        = require("gulp-pug"),
        ulglify     = require("gulp-uglify"),
        gulpif      = require("gulp-if"),
        browserify  = require("gulp-browserify"),
        connect     = require("gulp-connect"),
        browserSync = require("browser-sync").create();
        stylus      = require("gulp-stylus");

    var env       = process.env.NODE_ENV || "development";
    var outputDir = "build/development";

  2.- Crear task pug

    // Task pug
    gulp.task("pug", function(){
      return gulp.src("src/templates/** /*.pug")
      .pipe(pug())
      .pipe(gulp.dest(outputDir));
    });

  3.- Crear task default

    // Task default
    gulp.task("default", ["pug"]);

  4.- Crear carpetas src y templates, crear archivo index.pug
  y correr gulp

  5.- Crear Task JS

    // Task JS
    gulp.task("js", function() {
      return gulp.src("src/js/*.js")
        .pipe(gulp.dest(outputDir + "/js"));
    });

  6.- Modifica task default

    // Task default
    gulp.task("default", ["pug", "js"]);

  7.- Crear task stylus

    // Task Stylus
    gulp.task("stylus", function(){
      return gulp.src("src/stylus/*.styl")
      .pipe(stylus())
      .pipe(gulp.dest(outputDir + "/css"));
    });

  8.- Modificar el task defautl

  9.- Crear los directiors de stylus y un archivos llamado .styl

  10.- crear task watch

    gulp.task("watch", function(){
      gulp.watch("src/templates/** /*.pug", ["pug"]);
      gulp.watch("src/js/** /*.js", ["js"]);
      gulp.watch("src/stylus/** /*.styl", ["stylus"]);
    });

  11.- Actualizar default

  12.- Crear el server

    // Task browserSync (Server)
    gulp.task("server", function(){
      browserSync.init({
        server : outputDir
      });
    });

  13.- Actualizar task default

    gulp.task("default", ["pug", "js", "stylus", "watch", "server"]);

  14.- Actualizar task pug para sincronizar con el navegador

    // Task pug
    gulp.task("pug", function(){
      return gulp.src("src/templates/** /*.pug")
      .pipe(pug())
      .pipe(gulp.dest(outputDir))
----->.pipe(browserSync.reload({ stream : true }));
    });


  15.- Modificar task JS. Primero agregar browserify y conectarlo con el servidor


///////////////////////////////////////////////////
Browserify es una herramienta open source que nos permite crear módulos en el cliente, utilizando la misma sintaxis que en Node (CommonJS). Por lo tanto, vamos a poder requerir y exportar módulos y manejar sus dependencias como en Node pero en el browser.

Una gran ventaja es que nos permite usar npm para instalar y manejar las dependencias de nuestros módulos. Por lo que podemos “requerir” cualquier módulo que se encuentre publicado en npm, o bien, utilizar módulos privados.
///////////////////////////////////////////////////

  // Task JS
  gulp.task("js", function() {
    return gulp.src("src/js/*.js")
----->.pipe(browserify({ debug : env === "develompent" }))
      .pipe(gulpif(env === "production", uglify))
      .pipe(gulp.dest(outputDir + "/js"))
----->.pipe(browserSync.reload({ stream : true }));
  });

  16.- Modificar task stylus

  17.- Modificar task stylus agregando el browserSync


*/

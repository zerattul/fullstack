"use strict";

  const gulp         = require("gulp"),
        browserSync  = require("browser-sync").create(),
        autoprefixer = require("gulp-autoprefixer"),
        babel        = require("gulp-babel"),
        cleanCSS     = require("gulp-clean-css"),
        htmlmin      = require("gulp-htmlmin"),
        imagemin     = require("gulp-imagemin"),
        plumber      = require("gulp-plumber"),
        pngquant     = require("imagemin-pngquant"),
        gulpif       = require("gulp-if"),
        uncss        = require("gulp-uncss"),
        useref       = require("gulp-useref"),
        concat       = require("gulp-concat"),
        webp         = require("gulp-webp"),
        pug          = require("gulp-pug"),
        uglify       = require("gulp-uglify"),
        browserify   = require("gulp-browserify"),
        sass         = require("gulp-sass"),
        dir          = {
          src : "src",
          development : "build/development",
          production : "build/production",
          nm : "node_modules",
        },
        files        = {
          CSS : [
            `${dir.nm}/animate.css/source/animate.min.css`,
            "css/main.css",
          ],
          mCSS : "main.min.css",
          JS : [
            `${dir.nm}/jquery/dist/jquery.min.js`,
            "js/main.js",
          ],
          mJS : "main.min.js",
        },
        opts = {
          pug                 : {
            pretty            : true,
            locals            : {
              files           : files
            }
          },
          es6                 : { presets : ['es2015'] },
          sass                : { outputStyle : "compressed" },
          imagemin            : {
            progressive       : true,
            use               : [pngquant()]
          },
          svgmin              : {
            plugin            : [
              { convertColors : false },
              { removeAttrs   : { attrs : ["fill"] } }
            ]
          },
          uncss               : { html : [`${dir.development}/*.html`] },
          autoprefixer        : {
            browsers          : ["last 5 versions"],
            cascade           : false
          },
          htmlmin : {collapseWhitespace: true}
        };

// Task pug
gulp.task("pug", function(){
  return gulp.src("src/templates/**/*.pug")
  .pipe(plumber())
  .pipe(pug(opts.pug))
  .pipe(gulp.dest(`${dir.development}`))
  .pipe(browserSync.reload({ stream : true }));
});

// Task JS
gulp.task("js", function() {
  return gulp.src("src/js/**.*js")
    .pipe(plumber())
		.pipe( babel(opts.es6) )
		.pipe( gulp.dest(`${dir.development}/js`) )
    .pipe(browserSync.reload({stream : true}));
});

// Task SASS
gulp.task("sass", function(){
  return gulp.src("src/sass/**/*.scss")
    .pipe(plumber())
    .pipe( sass(opts.sass) )
    .pipe(gulp.dest(`${dir.development}/css`))
    .pipe(browserSync.reload({stream : true}));
});

// Task img
gulp.task('img', () => {
  return gulp.src( `${dir.src}/img/**/*.+(png|jpge|jpg|gif)` )
    .pipe( plumber() )
    .pipe( imagemin(opts.imagemin))
    .pipe( gulp.dest(`${dir.development}/img`) );
});

// Task imgprod
gulp.task('imgProduction', () => {
  return gulp.src( `${dir.development}/img/**/*.+(png|jpge|jpg|gif)` )
    .pipe( gulp.dest(`${dir.production}/img`) );
});

//task webp
gulp.task('webp', () => {
	return gulp.src( `${dir.src}/img/**/*.+(png|jpeg|jpg)` )
    .pipe(plumber())
		.pipe( webp() )
		.pipe( gulp.dest(`${dir.development}/img/webp`) );
});

//task webpProd
gulp.task('webpProduction', () => {
	return gulp.src( `${dir.development}/img/webp)` )
		.pipe( gulp.dest(`${dir.production}/img/webp`) );
});

//task svg
gulp.task("svg", () => {
  return gulp.src(`${dir.src}/img/svg/*.svg`)
  .pipe(plumber())
  .pipe( svgming(opts.svgmin) )
  .pipe( gulp.dest(`${dir.development}/img/svg`));
});

//task svgProdu
gulp.task("svgProduction", () => {
  return gulp.src(`${dir.development}/img/svg/*.svg`)
  .pipe( gulp.dest(`${dir.production}/img/svg`));
});

//task css
gulp.task('css', () => {
	return gulp.src(files.CSS)
		.pipe( concat(files.mCSS) )
		.pipe( uncss(opts.uncss) )
		.pipe( autoprefixer(opts.autoprefixer) )
		.pipe( cleanCSS() )
		.pipe( gulp.dest(`${dir.dist}/css`) );
});

//task js
gulp.task("js", () => {
  return gulp.src(files.JS)
  .pipe( concat(files.mJS) )
  .pipe( uglify() )
  .pipe( gulp.dest(`${dir.production}/js`) );
});

//task html
gulp.task("html", () => {
  return gulp.src(`${dir.development}/*.html`)
  .pipe( useref() )
  .pipe( htmlmin(opts.htmlmin) )
  .pipe( gulp.dest(`${dir.development}`));
});

// task watch
gulp.task("watch", () => {
  gulp.watch("src/templates/**/*.pug", ["pug"]);
  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/sass/**/*.scss", ["sass"]);
});

// task server
gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: `${dir.development}`,
      routes: {
        "/node_modules": `${dir.nm}`,
        }
      }
  })
});


// Tareas que se ejecutan
gulp.task("default", ["pug", "js", "sass", "watch", "server"]);
gulp.task("images", ["img", "webp", "svg"]);
gulp.task("production", ["css", "js", "html", "imgProduction", "webpProduction"]);

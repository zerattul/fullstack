"use strict"

// librerias requeridas (done)
// tareas *
// whatcher

const gulp         = require("gulp"),
      browserSync  = require("browser-sync").create(),
      autoprefixer = require("gulp-autoprefixer"),
      babel        = require("gulp-babel"),
      cleanCss     = require("gulp-clean-css"),
      concat       = require("gulp-concat"),
      htmlmin      = require("gulp-htmlmin"),
      imagemin     = require("gulp-imagemin"),
      plumber      = require("gulp-plumber"),
      pug          = require("gulp-pug"),
      sass         = require("gulp-sass"),
      svgmin       = require("gulp-svgmin"),
      uglify       = require("gulp-uglify"),
      useref       = require("gulp-useref"),
      webp         = require("gulp-webp"),
      pngquant     = require("imagemin-pngquant"),
      dir          = {
        src         : "src",
        development : "build/development",
        production  : "build/production",
        nm          : "node_modules",
      },
      files = {
        CSS : [
          `${dir.nm}/animate.css/animate.min.css`,
          "css/main.css"
        ],
        mCSS : "main.min.css",
        JS : [
          `${dir.nm}/jquery/dist/jquery.min.js`
        ],
        mJS : "main.min.js",
      },
      opts = {
        pug : {
          pretty : true,
          locals : {
            files : files,
          }
        },
        es6 : { presets : ["es2015"] },
        sass : { outputStyle : "compressed" },
        imagemin : {
          progressive : true,
          use : [pngquant()],
        },
      };


//Task Pug
gulp.task("pug",() => {
  return gulp.src("src/templates/**/*.pug")
  .pipe(plumber())
  .pipe(pug(opts.pug))
  .pipe(gulp.dest(`${dir.development}`))
  .pipe(browserSync.reload({ stream : true }));
});

//Task JS
gulp.task("js",() => {
  return gulp.src(`${dir.src}/js/**/*.js`)
  .pipe(plumber())
  .pipe(babel(opts.es6))
  .pipe(gulp.dest(`${dir.development}/js`))
  .pipe(browserSync.reload({ stream : true }));
});

//Taks SASS
gulp.task("sass",() => {
  return gulp.src(`${dir.src}/sass/**/*.scss`)
  .pipe(plumber())
  .pipe(sass(opts.sass))
  .pipe(gulp.dest(`${dir.development}/css`))
  .pipe(browserSync.reload({ stream : true }));
});

//Taks image
gulp.task("img",() => {
  return gulp.src(`${dir.src}/img/**/*.+(png|jpg|jpeg|gif)`)
  .pipe(plumber())
  .pipe(imagemin(opts.imagemin))
  .pipe(gulp.dest(`${dir.development}/img`))
});

//Taks webp
gulp.task("webp",() => {
  return gulp.src(`${dir.src}/img/**/*.+(png|jpg|jpeg|gif)`)
  .pipe(plumber())
  .pipe(webp())
  .pipe(gulp.dest(`${dir.development}/img/webp`))
});

//Task server
gulp.task("server", () => {
  browserSync.init({
    server : {
      baseDir           : `${dir.development}`,
      routes            : {
        "/node_modules" : `${dir.nm}`
      }
    }
  });
});

//task watchers
gulp.task("watch", () => {
  gulp.watch("src/templates/**/*.pug", ["pug"]);
  gulp.watch(`${dir.src}/js/**/*.js`, ["js"]);
  gulp.watch(`${dir.src}/sass/**/*.scss`, ["sass"]);
});

// Task defuult
gulp.task("default", ["pug", "js", "sass", "watch", "server"]);
gulp.task("images", ["img", "webp"]);

# PASOS CLASE 01

## 1.- Creando package.json

En la consola escribir el comando npm init y llenar los datos que se solicitan.

## 2.- Instalar dependencias del proyecto

Estas dependencias son las que necesita la aplicación para funcionar

```
npm i -S animate.css jquery
```

## 3.- Instalar dependecias de desarrollo

Son las librerias que se necesitan para administrar, autimatizar, mimificar, etc nuestra aplicación, no son necesarías para el funcionamiento de la app pero si para su desarrollo

```
npm i -D gulp gulp-babel gulp-browserify gulp-if gulp-concat gulp-clean-css gulp-concat gulp-htmlmin gulp-if gulp-imagemin gulp-pug gulp-plumber gulp-sass gulp-svgmin gulp-uglify gulp-uncss gulp-useref gulp-webp gulp-autoprefixer browser-sync imagemin-pngquant babel-preset-es2015
```

## 4.- Requerir todas las librerias en el archivo gulpfile

```
const gulp         = require("gulp"),
      browserSync  = require("browser-sync").create(),
      autoprefixer = require("gulp-autoprefixer"),
      babel        = require("gulp-babel"),
      cleanCSS     = require("gulp-clean-css"),
      htmlmin      = require("gulp-htmlmin"),
      imagemin     = require("gulp-imagemin"),
      plumber      = require("gulp-plumber"),
      gulpif       = require("gulp-if"),
      pngquant     = require("imagemin-pngquant"),
      unCSS        = require("gulp-uncss"),
      useref       = require("gulp-useref"),
      webp         = require("gulp-webp"),
      pug          = require("gulp-pug"),
      uglify       = require("gulp-uglify"),
      browserify   = require("gulp-browserify"),
      sass         = require("gulp-sass"),
```

## 5.- Crear objetos de configuración

Para mantener un código ordenado se crean objetos para guardar las configuraciones y mandarlas llamar según se necesiten

```
dir = {},
files = {},
opts = {};
```

## 6.- Crear la tarea pug

```
// Task pug
gulp.task("pug", function(){
  return gulp.src("src/templates/**/*.pug")
  .pipe(pug(opts.pug))
  .pipe(gulp.dest(`${dir.outputDir}`));
});

```

Crear las las estructuras de carpetas que tendrá nuestra app

```
- src
  -- img
  -- js
  -- sass
  -- templates
    --- index.pug
```

## 7.- Crear las rutas para los entornos

Definimos cuales serán nuestros directorios para el entorno de producción y desarrollo

```
dir  = {
  src         : "src",
  development : "build/development",
  production  : "build/production",
  nm          : "node_modules",
},
```
## 8.- Crear primera vista (index.pug)

```
<!DOCTYPE html>
html(lang="es")
head
  meta(charset="UTF-8")
  meta(name="viewport", content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimun-scale=1.0")

body
  h1 Hola Mundo
```

## 9.- Crear opciones de la tarea pug

```
pug : {
  pretty  : true,
  locals  : {
    files : files
  }
}
```

CORRER TAREA PUG PARA COMPROBAR QUE TODO ESTA BIEN.
El resultado es que se genera un archivo index.html dentro de una carpeta development dentro de una carpeta build

## 10.- Tarea watch y server

La tarea watch es una tarea que observa todo el tiempo si hay cambios en tareas asignadas, si detecta un cambio lo ejecuta y la tarea server muestra esos cambios en el navegador

La tarea default es la tarea que ejectua toda las tareas definidas

```
// task watch
gulp.task("watch", () => {
  gulp.watch("src/templates/**/*.pug", ["pug"]);
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
gulp.task("default", ["pug", "watch", "server"]);
```

Actualizar tarea pug para que recargue cuando se detecten cambios

```
.pipe(browserSync.reload({ stream : true }));
```

## 11.- Agregar plumber a la tarea pug

```
.pipe(plumber())
```

## 12.- Crear tarea JS y actualizar tareas pertinentes

```
// Task JS
gulp.task("js", function() {
  return gulp.src("src/js/**.*js")
    .pipe(plumber())
		.pipe( babel(opts.es6) )
		.pipe( gulp.dest(`${dir.development}/js`) )
    .pipe(browserSync.reload({stream : true}));
});
```

Agregar al objeto opts las opciones para la tarea JS

```
// Task JS
es6 : { presets : ['es2015'] },
```

Agregar la tarea js al watch

```
// Task JS
gulp.watch("src/js/**/*.js", ["js"]);
```

Agregar la tarea JS a default

```
gulp.task("default", ["pug", "js", "watch", "server"]);
```

En el objeto files agregar las configuraciones que se necesitaran

```
files = {
  CSS  : [
    `${dir.nm}/animate.css/animate.min.css`,
    "css/main.css",
  ],
  mCSS : "main.min.css",
  JS   : [
    `${dir.nm}/jquery/dist/jquery.min.js`,
    "js/main.js",
  ],
  mJS  : "main.min.js",
},
```

Agregar un ciclo para mandar llamar a todos los archivos js

```
each js in files.JS
  script(src=`${js}`)
```

## 12.- Crear tarea SASS

```
// Task Stylus
gulp.task("sass", function(){
  return gulp.src("src/sass/**/*.scss")
    .pipe(plumber())
    .pipe( sass(opts.sass) )
    .pipe(gulp.dest(`${dir.development}/css`))
    .pipe(browserSync.reload({stream : true}));
});
```

Agregar al objeto opts las opciones para la tarea SASS

```
sass : { outputStyle : "compressed" },
```

Agregar la tarea sass al watch

```
// Task JS
gulp.watch("src/sass/**/*.scss", ["sass"]);
```

Agregar la tarea sass a default

```
// Task JS
gulp.task("default", ["pug", "js", "watch", "server"]);
```

Agregar un ciclo para mandar llamar a todos los archivos css

```
each css in files.CSS
  link(rel="stylesheet", href=`${css}`)
```


## 13.- Tarea img para procesar img

```
// Task img
gulp.task('img', () => {
  return gulp.src( `${dir.src}/img/**/*.+(png|jpge|jpg|gif)` )
    .pipe(plumber())
    .pipe( imagemin(opts.imagemin))
    .pipe( gulp.dest(`${dir.outputDir}/img`) );
});
```
Agregar opciones de la tarea img

```
imagemin      : {
  progressive : true,
  use         : [pngquant()]
},
```

Agregar tarea webp

```
//task webp
gulp.task('webp', () => {
	return gulp.src( `${dir.src}/img/**/*.+(png|jpeg|jpg)` )
    .pipe(plumber())
		.pipe( webp() )
		.pipe( gulp.dest(`${dir.outputDir}/img/webp`) );
});

```

Agregar tarea svg

```
//task svg
gulp.task("svg", () => {
  return gulp.src(`${dir.src}/img/svg/*.svg`)
  .pipe(plumber())
  .pipe( svgming(opts.svgmin) )
  .pipe( gulp.dest(`${dir.development}/img/svg`));
});
```

Agregar opciones de svg

```
svgmin : {
  plugin : [
    { convertColors : false },
    { removeAttrs : { attrs : ["fill"] } }
  ]
}
```

Crear una tarea de ejecucio para todas las imagenes

```
gulp.task("images", ["img", "webp", "svg"]);

```

# CRUD REST Y MVC

## 01 Generar package.json

```
npm init
```

## 02 Instalar dependencias

```
npm i -S express express-myconnection mysql body-parser pug ser-favicon
```

## 03 Crear archivo schema.sql

```
DROP DATABASE IF EXISTS indentation_war;

CREATE DATABASE IF NOT EXISTS diplomado_users;

USE diplomado_users;

CREATE TABLE user(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	twitter VARCHAR(50) NOT NULL,
	country VARCHAR(20) NOT NULL,
	email VARCHAR(50) NOT NULL
);
```

## 04 crear un script para iniciar la app

::package.json
```
"start": "supervisor app.js"
```

## 05 Crear archivo app.js

::app.js
```
use strict';

const express = require('express'),
	pug = require('pug'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon')(),
	publicDir = express.static(),
	viewDir = '',
	port = (process.env.PORT || 3000),
	mysql = require('mysql'),
	myConnection  = require('express-myconnection'),
	dbOptions = {
		host : 'localhost',
		user : 'root',
		password : '',
		port : 3306,
		database : 'diplomado_users'
	},
	conn = '';

let app = express();
```

Crear carpeta public

Agregar el favicon

app.json
```
favicon = require('serve-favicon')(`${__dirname}/public/favicon.png`),
publicDir = express.static(`${__dirname}/public`),
```

Crear carpeta views

::app.js
´´´
viewDir = `${__dirname}/views`,
conn = myConnection(mysql, dbOptions, 'request');

app.set( 'views', viewDir );
app.set( 'view engine', 'pug' );
app.set( 'port', port );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( publicDir );
app.use( favicon );

app.use( conn );

app.listen( app.get('port'), () => console.log('Iniciando API CRUD Express con MySQL') );
´´´

PROBAR


## 06 Definir rutas

::app.js
```
app.get('/', (req, res, next) => {
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM user', (error, data) => {
			if (!error) {
				res.render('index', {
					title: 'CRUD APP',
					data: data
				});
			}
		});
	});
});
```
## 07 Crear las vistas

Crear archivo index.pug y layout.pug en la carpeta views

::layout.pug
```
doctype html
html(lang="es")
	head
		meta(charset="utf-8")
		meta(name="viewport", content="width=device-width,initial-scale=1")
		title= title
		link(rel="stylesheet", href="/estilos.css")
	body
		block content
```

::index.pug
```
extends layout.pug

block content
	section.container
		h1.header= title
		img(src="responsive.jpg")
		article.item
			div
				a.button.add(href="/agregar") Agregar
			if(data.length)
				table.table
					tr
						th Nombre
						th Twitter
						th País
						th Email
						th
						th
					each contacto in data
						tr
							td #{contacto.name}
							td #{contacto.twitter}
							td #{contacto.country}
							td #{contacto.email}
							td
								a.button.edit(href="/editar/" + contacto.id) Editar
							td
								form(method="post", action="/eliminar/" + contacto.id)
									input.button.delete(type="submit", value="Eliminar")
			else
				div.error No tienes contactos que mostrar
```
::estilos.css
```
html {
	box-sizing: border-box;
	font-family: sans-serif;
	font-size: 16px;
	text-align: center;
	background-color: #222;
}

*, *:after, *:before {
	box-sizing: inherit;
	margin: 0;
	padding: 0;
	border: 0;
}

a { text-decoration: none; }

fieldset {
	background-color: #EEE;
	border: thin solid #292623;
	padding: 1rem;
}

img {
	display: block;
	margin: 1rem auto;
	max-width: 770px;
	height: auto;
}

input[type="submit"] { cursor: pointer; }

input[type="text"] {
	border: thin solid #DDD;
	font: 1rem sans-serif;
	padding: .5rem;
}

:focus { outline: thin solid #EC673A; }

.header {
	padding: 1rem;
	font-size: 2rem;
	color: #EEE;
	background-color: #1C5F81;
}

.container {
	background-color: #FFF;
	margin: 5% auto 0;
	min-height: 600px;
	width: 90%;
}

.item {
	padding: 1rem;
	margin: 1rem;
}

.button {
	border: thin solid #292623;
	color: #EEE;
	font: 1rem sans-serif;
	padding: .5rem 1rem;
}

.button:hover { opacity: .75; }

.add { background-color: #0B0; }

.edit { background-color: #0871B2; }

.delete { background-color: #D23641; }

.show { background-color: #141414; }

.error {
	background-color: #D23641;
	border: thin solid #292623;
	color: #EEE;
	font-size: 2rem;
	margin: 2rem auto;
	padding: 1rem;
	text-align: center;
}

.error pre {
	font-size: 1rem;
	width:100%;
	word-wrap:break-word;
}

.form div {
	font-size: 0;
	margin: 1rem auto;
}

.form div:not(:last-child) > * {
	display: inline-block;
	padding: .25rem;
	vertical-align: top;
	width: 80%;
}

.form div > *:first-child:not(:last-child) {
	font-size: 1rem;
	text-align: right;
	width: 20%;
}

.table {
	border-collapse: collapse;
	border: thin solid #292623;
	margin: 2rem auto;
	text-align: left;
	width:100%
}

.table td, .table th { padding: 1rem; }

.table tr:first-child {
	background-color: #292623;
	color: #EEE;
}

.table tr:nth-child(even) { background-color: #DDD; }

.table tr:nth-child(odd):not(:first-child) { background-color: #EEE; }

```

## 07 Crear la ruta agregar

::app.js
```
app.get('/agregar', (req, res, next) => {
	res.render('add',{ title: 'Agregar Contacto' });
});
```

## 08 Crear vista agregar

::add.pug
```
extends layout.pug

block content
	section.container
		h1.header= title
		article.item
			form.form(method="post", action="/")
				fieldset
					div
						input(type="text", name="name", placeholder="nombre", required)
					div
						input(type="text", name="twitter", placeholder="twitter", required)
					div
						input(type="text", name="country", placeholder="país", required)
					div
						input(type="text", name="side", placeholder="equipo", required)
					div
						input.button.add(type="submit", value="Agregar")
		a.button.show(href="/") Inicio
```

## 09 Crear ruta al home por post

:app.js
```
app.post('/', (req, res, next) => {
	req.getConnection((err, conn) => {
		let contacto = {
			id: 0,
			name: req.body.name,
			twitter: req.body.twitter,
			country: req.body.country,
			side: req.body.side
		};

		conn.query('INSERT INTO user SET ?', contacto, (err, data) => {
			if(!err) {
				res.redirect('/');
			} else {
				res.redirect('/agregar');
			}
		});
	});
});
```

## 10 Crear ruta editar

app.js
´´´
app.get('/editar/:id', (req, res, next) => {
	let id = req.params.id;

	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM user WHERE id = ?', id, (err, data) => {
			if(!err) {
				res.render('edit', {
					title: 'Editar Contacto',
					data: data
				});
			}
		});
	});
});

´´´

## 11 Crear vista edit

::edit.pug
```
extends layout.pug

block content
	section.container
		h1.header= title
		article.item
			form.form(method="post", action="/actualizar/" + data[0].id)
				input(type="hidden", name="id", value=data[0].id)
				fieldset
					div
						input(type="text", name="name", placeholder="nombre", value=data[0].name, required)
					div
						input(type="text", name="twitter", placeholder="twitter", value=data[0].twitter, required)
					div
						input(type="text", name="country", placeholder="pais", value=data[0].country, required)
					div
						input(type="text", name="side", placeholder="equipo", value=data[0].side, required)
					div
						input.button.edit(type="submit", value="Editar")
		a.button.show(href="/") Inicio
```

## 11 Crear ruta actualizar

::app.js
´´´
app.post('/actualizar/:id', (req, res, next) => {
	req.getConnection((err, conn) => {
		let contacto = {
			id:req.body.id,
			name: req.body.name,
			twitter: req.body.twitter,
			country: req.body.country,
			side: req.body.side
		};

		conn.query('UPDATE user SET ? WHERE id = ?', [contacto, contacto.id],(err, data) => {
			if(!err) {
				res.redirect('/');
			} else {
				res.redirect('/editar/:id');
			}
		});
	});
});
´´´

## 12 Ruta eliminar

::app.js
```
app.post('/eliminar/:id', (req, res, next) => {
	req.getConnection((err, conn) => {
		let id = req.params.id;

		conn.query('DELETE FROM user WHERE id = ?', id, (err, data) => {
			if(!err) {
				res.redirect('/');
			} else {
				return next(new Error('Registro no encontrado'));
			}
		});
	});
});
```
## 13 error

::app.js
```
app.use((req, res, next) => {
	let err = new Error();
	err.status = 404;
	err.statusText = 'NOT FOUND';

	res.render('error', {error: err});
});
```

## 14 vista error

::error.pug
```
extends layout.pug

block content
	div.error
		h1 Error N° #{error.status}:
		h2= error.statusText
		a.button.show(href="/") Inicio
```

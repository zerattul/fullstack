# CRUD REST Y MVC

## 01 Modificar package.json

cambiar el archivo main y el comando start
```
"main": "server.js"
"start": "supervisor server.js"
```

## 02 Crear un archivo server.js

::server.js
```
'use strict';

const app = require('./app'),
  server  = app.listen( app.get('port'), () => {
    console.log(`Iniciando API en el puerto ${app.get(port)}`);
  })

```

Expotar app como modulo

::app.js
```
module.exports = app;
```

## 03 Crear una carpetas

crear una carpeta routes y modules. Dentro de routes un archivos index.js
y dentro de modules un archivo modules.js. Enviar el archivo sql a la carpeta de modules

## Orderar codigo

cortar la parte de la conexion de la base de datos de app y pegarla en modesl

::models.js
```
'use strict';

const mysql        = require('mysql'),
myConnection = require('express-myconnection'),
dbOptions    = {
  host      : 'localhost',
  user      : 'root',
  password  : '',
  port      : 3306,
  database  : 'diplomado_users'
},
conn         = myConnection(mysql, dbOptions, 'request');

module.export = conn;
```

cortar de app todo lo de la rutas y enviarlo a routes

::index.js
```
'use strict';

app.use( conn );

app.get( '/', (req, res, next) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM user', (error, data) => {
      if(!error){
        res.render('index', {
          title : 'CRUD APP',
          data  : data
        });
      }
    });
  });
});

app.get('/agregar', (req, res, next) => {
  res.render('add', {
    title : 'Agregar Contacto'
  });
});

app.post('/', (req, res, next) => {
  req.getConnection((err, conn) => {
    let contacto = {
      id      : 0,
      name    : req.body.name,
      twitter : req.body.twitter,
      country : req.body.country,
      email   : req.body.email
    }

    conn.query('INSERT INTO user SET ?', contacto, (err, data) => {
      if(!err){
        res.redirect('/');
      } else {
        res.redirect('/agregar');
      }
    });
  });
});

app.get('/editar/:id', (req, res, next) => {
  let id = req.params.id;

  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM user WHERE id = ?', id, (err, data) => {
      if(!err){
        res.render('edit', {
          title : 'Editar Contacto',
          data : data
        })
      }
    });
  });
});

app.post('/actualizar/:id', (req, res, next) => {
  req.getConnection((err, conn) => {
    let contacto = {
      id      : req.body.id,
      name    : req.body.name,
      twitter : req.body.twitter,
      country : req.body.country,
      email   : req.body.email
    }

    conn.query('UPDATE user SET ? WHERE id = ?', [contacto, contacto.id], (err, data) => {
      if(!err){
        res.redirect('/');
      } else {
        res.redirect('/editar/:id');
      }
    });
  });
});

app.post('/eliminar/:id', (req, res, next) => {
  req.getConnection((err, conn) => {
    let id = req.params.id;

    conn.query('DELETE FROM user WHERE id = ?', id, (err, data) =>{
      if(!err){
        res.redirect('/');
      } else {
        return next(new Error('Regristo no encontrado'));
      }
    });
  });
});

app.use((req, res, next) =>{
  let err = new Error();
  err.status = 404;
  err.statusText = "NOT FOUN";

  res.render('error', {error : err});
})

```

::app.js
```
app
  .set( 'views', viewDir )
  .set( 'view engine', 'pug' )
  .set( 'port', port )

  .use( bodyParser.json() )
  .use( bodyParser.urlencoded({ extended: false }) )
  .use( publicDir )
  .use( favicon );
```

agregar morgan en app.js

::app.js
```
morgan = require('morgan'),
routes     = require('./routes/index'),

.use(morgan('dev'))
.use( routes )
```

## 05 configurar routes.js

::routes.js
```
'use strict';

const conn = require('../models/model'),
	express = require('express'),
	router = express.Router();

function error404(req, res, next) {
	let err = new Error();
	err.status = 404;
	err.statusText = 'NOT FOUND';

	res.render('error', {error: err});
}

router
	.use( conn )
	.get('/', (req, res, next) => {
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM team', (error, data) => {
				if (!error) {
					res.render('index', {
						title: 'Indentation War',
						data: data
					});
				}
			});
		});
	})
	.get('/agregar', (req, res, next) => {
		res.render('add',{ title: 'Agregar Contacto' });
	})
	.post('/', (req, res, next) => {
		req.getConnection((err, conn) => {
			let contacto = {
				id: 0,
				name: req.body.name,
				twitter: req.body.twitter,
				country: req.body.country,
				side: req.body.side
			};

			conn.query('INSERT INTO team SET ?', contacto, (err, data) => {
				if(!err) {
					res.redirect('/');
				} else {
					res.redirect('/agregar');
				}
			});
		});
	})
	.get('/editar/:id', (req, res, next) => {
		let id = req.params.id;

		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM team WHERE id = ?', id, (err, data) => {
				if(!err) {
					res.render('edit', {
						title: 'Editar Contacto',
						data: data
					});
				}
			});
		});
	})
	.post('/actualizar/:id', (req, res, next) => {
		req.getConnection((err, conn) => {
			let contacto = {
				id:req.body.id,
				name: req.body.name,
				twitter: req.body.twitter,
				country: req.body.country,
				side: req.body.side
			};

			conn.query('UPDATE team SET ? WHERE id = ?', [contacto, contacto.id],(err, data) => {
				if(!err) {
					res.redirect('/');
				} else {
					res.redirect('/editar/:id');
				}
			});
		});
	})
	.post('/eliminar/:id', (req, res, next) => {
		req.getConnection((err, conn) => {
			let id = req.params.id;

			conn.query('DELETE FROM team WHERE id = ?', id, (err, data) => {
				if(!err) {
					res.redirect('/');
				} else {
					return next(new Error('Registro no encontrado'));
				}
			});
		});
	})
	.use( error404 );

module.exports = router;
```

PROBAR

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

## 06 Agregar mas estructrua de proyecto

Crear carpeta controllers

::app.js
```
restFul = require('express-method-override')('_method'),
use ( restful )
```

modiciar indes.js por user-router.js, crear un archivo user-controller y team model
modificar el app para que llame a team-router

## 07 Modificar las vistas

::index.pug
```
input(type="hidden", name="_method", value="DELETE")
									input.button.delete(type="button", value="Eliminar", onclick="eliminar(this)")
				script.
					function eliminar(input) {
						var deleteOK = confirm('¿Estás seguro de eliminar el registro?');
						return (deleteOK) ? input.parentNode.submit() : false;
```

::edit.pug
```
input(type="hidden", name="_method", value="PUT")
```

## 08 Mas abtraccion

Crear un archivo db-config.json en models

::db-congig.json
```
{
	"mysql" : {
		"host" : "localhost",
		"port" : 3306,
		"user" : "root",
		"pass" : "",
		"db" : "user"
	}
```

modificar models

::model.js
```
'use strict';

const mysql = require('mysql'),
	conf  = require('./db-conf'),
	dbOptions = {
		host : conf.mysql.host,
		user : conf.mysql.user,
		password : conf.mysql.pass,
		port : conf.mysql.port,
		database : conf.mysql.db
	},
	conn = mysql.createConnection(dbOptions);

conn.connect((err) => {
	return (err)
		? console.log(`Error al Conectarse a MySQL: ${err.starck}`)
		: console.log(`Conexión establecida con MySQL N°: ${conn.threadId}`);
});

module.exports = conn;
```
'use strict';

const mysql = require('mysql'),
	conf  = require('./db-conf'),
	dbOptions = {
		host : conf.mysql.host,
		user : conf.mysql.user,
		password : conf.mysql.pass,
		port : conf.mysql.port,
		database : conf.mysql.db
	},
	conn = mysql.createConnection(dbOptions);

conn.connect((err) => {
	return (err)
		? console.log(`Error al Conectarse a MySQL: ${err.starck}`)
		: console.log(`Conexión establecida con MySQL N°: ${conn.threadId}`);
});

module.exports = conn;
```

## 09 crear el modelo

::user-model
```
'use strict';

const conn = require('./model');

class TeamModel {
	getAll(cb) {

	}

	getOne(id, cb) {

	}

	save(data, cb) {

	}

	delete(id, cb) {

	}
}

module.exports = TeamModel;
```

## 10 crear controller

::team-controller.js
```
'use strict';

const TeamModel = require('../models/team-model'),
	tm = new TeamModel();

class TeamController{

}

```

modificar router.js

::router.js
```
const UserController = require('../controllers/user-controller'),
	express = require('express'),
	router = express.Router(),
	tc = new UserController();

  .get('/', tc.getAll)
```


::team-controller
```
getAll(req, res, next) {
  tm.getAll((err, data) => {
    if (!err) {
      res.render('index', {
        title: 'Indentation War',
        data: data
      });
    }
  });
}
```

::user-model.js
```
	getAll(cb) {
		conn.query('SELECT * FROM team', cb);
	}
```


::user-controller
```
	addForm(req, res, next) {
		res.render('add', { title:'Agregar Contacto' });
	}
```

::router
```
.get('/agregar', tc.addForm)
.post('/', tc.save)
```


::user-controller
```
save(req, res, next) {
  let contacto = {
    id: (req.body.id || 0),
    name: req.body.name,
    twitter: req.body.twitter,
    country: req.body.country,
    side: req.body.side
  };

  console.log(contacto);

  tm.save(contacto, (err) => {
    if(!err) {
      res.redirect('/');
    } else {
      return next( new Error('Registro no salvado') );
    }
  });
}   
```

::models.js
```
save(data, cb) {
  conn.query('SELECT * FROM team where id = ?', data.id, (err, rows) => {
    console.log(`Número de registros: ${rows.length}`);

    if(!err)
      return ( rows.length == 1 )
        ? conn.query('UPDATE team SET ? WHERE id = ?', [data, data.id], cb)
        : conn.query('INSERT INTO team SET ?', data, cb);
  });
}
```

::router
```
.put('/actualizar/:id', tc.save)
.get('/editar/:id', tc.getOne)
```

::user-controller
```
	getOne(req, res, next) {
		let id = req.params.id;
		console.log(id);

		tm.getOne(id, (err, data) => {
			if(!err) {
				res.render('edit', {
					title: 'Editar Contacto',
					data: data
				});
			}
		});
	}
```

::model
```
	getOne(id, cb) {
		conn.query('SELECT * FROM team WHERE id = ?', id, cb);
	}
```

::router
```
.delete('/eliminar/:id', tc.delete)
```

::controllers
```
delete(req, res, next) {
  let id = req.params.id;
  console.log(id);

  tm.delete(id, (err, data) => {
    if(!err) {
      res.redirect('/');
    } else {
      return next(new Error('Registro no encontrado'));
    }
  });
}
```

::model
```
delete(id, cb) {
  conn.query('DELETE FROM team WHERE id = ?', id, cb);
}

::user-controller
```
error404(req, res, next) {
  let err = new Error();
  err.status = 404;
  err.statusText = 'NOT FOUND';

  res.render('error', {error: err});
}
```

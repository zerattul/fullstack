# CRUD REST MONGO

## 01 MODIFICAR ARCHIVOS

Borrar schema.sql

::db-config.js
```
{
	"mongo" : {
		"host" : "localhost",
		"db" : "indentation_war"
	}
}
```

::model.js
```
'use strict';

const mongoose = require('mongoose'),
	conf = require('./db-conf');

mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`);

module.exports = mongoose;
```

## 02 Crear un archivo schema.js

::data-schema
```
'use strict';

const mongoose = require('./model'),
      Schema = mongoose.Schema,
      DataSchema = new Schema({
              name : String,
              twitter : String,
              email : String,
              country : String
          },
          {
              collection : 'data'
          }),
      Data = mongoose.model('Data', DataSchema);

module.exports = Data;
```

## 03 Modificar user-schema

Cambiar el nombre por data-schema.js

::data-shcema.js
```
const conn = require('./data-schema');
```
PROBAR

## 04 MODIFICAR USER-MODEL

cambiar el nombre a data-model.js

::data-model.js
```
const conn = require('./data-schema');

getAll(cb){
    conn.find({}, (err, docs) => {
      if(err) throw err;
      cb(docs);
    });
  }
```

## 05 MODIFICAR USER-CONTROLLER

Cambiar nombre a data-controller.js

::data-controller.js
```
const DataModel = require('../models/data-model'),
  um            = new DataModel();

  getAll(req, res, next){
      um.getAll((err, docs) =>{
      res.render('index', {
        title : 'CRUD APP',
        data  : docs
      });
      });
    }
```
Cambiar todo los user por data

## 06 MODIFICAR LA VISTA INDEX

::Index.pug
```
a.button.edit(href="/editar/" + contacto._id) Editar
 form(method="post", action="/eliminar/" + contacto._id )
```
PROBAR

## 07 SAVE

::data-model
```
  save(data, cb){
    conn.count({ _id : data._id }, (err, count) =>{
      if(err) throw err;
      console.log(`Numero de Docs: ${count}`);

      if(count == 0){
        conn.create(data, (err) => {
          if (err) throw err;
          cb();
        });
      } else if (count == 1){
        conn.findOneAndUpdate({_id : data._id}, {name : data.name, twitter : data.twitter, email : data.email, country : data.country }, (err) => {
          if(err) throw(err);
          cb();
        });
      }
    });
  }
```

::data-controller
```
_id      : req.body.id || null,
 um.save(contacto, () => res.redirect('/'));
```

## 08 getone

::data-model
```
getOne(_id, cb){
    conn.findOne({_id : _id}, (err, docs) =>{
      if(err) throw err;
      cb(docs);
    });
  }
```

::data-controller
```
  getOne(req, res, next){
    let _id = req.params._id;
    console.log(_id);

    um.getOne(_id, (docs) => {
      console.log(docs);
      res.render('edit', {
        title : 'Editar Contacto',
        data : docs
      })
    });
  }
```

## 09 DELETE

::data-model
```
delete(id, cb){
    conn.remove({_id : _id}, (err) => {
      if(err) throw err;
      cb();
    });
  }
```

::data-controller
```
 delete(req, res, next){
    let _id = req.params._id;
    console.log(_id);

    um.delete(_id, () => res.redirect('/') );
  }
```
## 10 MODIFICAR VISTAS

::edit
```
form.form(method="post", action="/actualizar/" + data._id)
        input(type="hidden" name="_method" value="PUT")
        input(type="hidden", name="_id", value=data._id)
        fieldset
          div
            input(type="text", name="name", value=data.name, require)
          div
            input(type="text", name="twitter", value=data.twitter, require)
          div
            input(type="text", name="country", value=data.country, require)
          div
            input(type="email", name="email", value=data.email, require)
          div
            input.button.add(type="submit", value="Editar")
      a.button.show(href="/") Inicio
```
## 11 CREAR NUEVOS ARCHIVOS

Crear el archivo auth-model, auth-schema, auth-controller, auth-routes y carpeta middlewares, dentro erros.js

::errors
```
'use stritc';

class Erros{
    http401(req, res, next){
        let err        = new Error();
        err.status     = 401;
        err.statusText = 'UNAUTHORIZED';

        res.render('error', { error : err });
    }

    http404(req, res, next){
        let err        = new Error();
        err.status     = 404;
        err.statusText = 'NOT FOUND';

        res.render('error', { error : err });
    }

    http500(req, res, next){
        let err        = new Error();
        err.status     = 500;
        err.statusText = 'INTERNAL SERVER ERROR';

        res.render('error', { error : err });
    }
}

module.exports = new Errors();
```
elminar la urta de error

::app-js
```
errors       = require('./middleware/errors'),
auth         = require('./routes/auth-router'),
.use( errors.http404 );
.use( auth)
```

::auth-routes
```
'use strict';

const AuthController = require('../controllers/auth-controller'),
      express        = require('express'),
      router         = express.Router(),
      ac             = new AuthController();

router
    .get('/', ac.index)


module.exports = router;

```

::auth.controller
```
'use strict';

const AuthModel = require('../models/auth-model'),
	errors = require('../middlewares/errors'),
	am = new AuthModel();

class AuthController {
	index(req, res, next) {
		if ( req.session.username ) {
			res.redirect('/teams');
		} else {
			res.render('login-form', {
				title: 'Autenticación de Usuarios',
				message: req.query.message
			});
		}
	}
```

::data-router
```
.get( '/data', uc.getAll )
  .get('/agregar', uc.addForm)
  .post('/data', uc.save)
  .put('/actualizar/:id', uc.save)
  .get('/editar/:id', uc.getOne)
  .post('/eliminar/:id', uc.delete)
```

::auth-router
```
.get('/login', ac.logInGet)
.post('/login', ac.logInPost)
.get('/signin', ac.signInGet)
.post('/signin', ac.signInPost)
.get('/logout', ac.logOut);
```

::app.js
```
sesion       = require('express-session'),
optSession = { secret:'ssshhhhh', saveUninitialized: true, resave: true },
.use( session(optSession) )
```

::auth-schema
```
'use strict';

const mongoose = require('./model'),
	Schema = mongoose.Schema,
	AuthSchema = new Schema({
		username : String,
		password : String
	},
	{
		collection : 'auth'
	}),
	Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;
```

## 12 AGREGAR NUEVAS VISTAS

::login-form.pug
```
extends layout.pug

block content
	section.container
		h1.header= title
		if (message)
			div.error= message
		article.item
			form.form(method="post", action="/login")
				fieldset
					div
						input#username(type="text", name="username" placeholder="usuario", required)
					div
						input#password(type="password", name="password", placeholder="password" required)
					div
						input.button.show(type="submit", value="Loguearse")
					div
						a.button.show(href="/signin") Registrarse
```

::signing-form.pug
```
extends layout.pug

block content
	section.container
		h1.header= title
		article.item
			form.form(method="post", action="/signin")
				fieldset
					div
						input#username(type="text", name="username" placeholder="usuario", required)
					div
						input#password(type="password", name="password", placeholder="password" required)
					div
						input.button.show(type="submit", value="Registrarse")
					div
						a.button.show(href="/login") Loguearse
```

## 12 AGREGAR METODOS AUTH-CONTROLLER

::auth-controller
```
logInGet(req, res, next) {
		res.redirect('/');
	}

	logInPost(req, res, next) {
		let user = {
			username: req.body.username,
			password: req.body.password
		};

		console.log(user);

		am.getUser(user, (docs) => {
			req.session.username = ( docs != null ) ? user.username : null;

			console.log(req.session, '---', docs);

			return (req.session.username)
				? res.redirect('/data')
				: errors.http401(req, res, next);
		});
	}

	signInGet(req, res, next) {
		res.render('signin-form', { title: 'Registro de Usuarios' });
	}

	signInPost(req, res, next) {
		let user = {
			user_id: 0,
			username: req.body.username,
			password: req.body.password
		};

		console.log(user);

		am.setUser(user, (docs) => {
			res.redirect(`/?message=El usuario ${user.username} ha sido creado`);
		});
	}

	logOut(req, res, next) {
		req.session.destroy((err) => {
			return (err)
					? errors.http500(req, res, next)
					: res.redirect('/');
		});
	}
}

module.exports = AuthController;
```

::auth-model
```
'use strict';
const conn = require('./auth-schema');

class AuthModel {
	getUser(user, cb) {
		conn
			.findOne({
				username : user.username,
				password : user.password
			})
			.exec((err, docs) => {
				if (err) throw err;
				cb(docs);
			});
	}

	setUser(user, cb) {
		conn.create(user, (err) => {
			if(err) throw err;
			cb();
		});
	}
}

module.exports = AuthModel;
```


```
'use strict';

const DataModel = require('../models/data-model'),
      errors = require("../middleware/errors"),
      tm = new DataModel();

class DataController {
    getAll(req, res, next) {
        return (req.session.username)
            ? tm.getAll((docs) => {
                res.render('index', {
                title:'API CRUD',
                user:req.session.username,
                data: docs
            });
    })
    : errors.http401(req, res, next)
    }

    getOne(req, res, next) {
        let _id = req.params._id;
        console.log(_id);

        return (req.session.username)
            ? tm.getOne(_id, (docs) => {
                console.log(docs);

        res.render('edit', {
            title : 'Editar Contacto',
            user : req.session.username,
            data : docs
        });
    })
    : errors.http401(req, res, next);
    }

    save(req, res, next) {
        let contacto = {
            _id: (req.body._id || null),
            name: req.body.name,
            twitter: req.body.twitter,
            country: req.body.country,
            side: req.body.side
        };

        console.log(contacto);

        return (req.session.username)
            ? tm.save( contacto, () => res.redirect('/data') )
    : errors.http401(req, res, next);
    }

    delete(req, res, next) {
        let _id = req.params._id;
        console.log(_id);

        return (req.session.username)
            ? tm.delete( _id, () => res.redirect('/data') )
    : errors.http401(req, res, next);
    }

    addForm(req, res, next) {
        return (req.session.username)
            ? res.render('add', {
                title: 'Agregar Contacto',
                user : req.session.username
            })
            : errors.http401(req, res, next);
    }
}

module.exports = DataController;
```

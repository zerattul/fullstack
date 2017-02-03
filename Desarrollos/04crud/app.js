'use strict';

const express      = require('express'),
      pug          = require('pug'),
      bodyParser   = require('body-parser'),
      favicon      = require('serve-favicon')(`${__dirname}/public/favicon.png`),
      mysql        = require('mysql'),
      myConnection = require('express-myconnection'),
      publicDir    = express.static(`${__dirname}/public`),
      viewDir      = `${__dirname}/views`,
      port         = (process.env.PORT || 3000),
      dbOptions    = {
        host      : 'localhost',
        user      : 'root',
        password  : '',
        port      : 3306,
        database  : 'diplomado_users'
      },
      conn         = myConnection(mysql, dbOptions, 'request');

let app = express();

app.set( 'views', viewDir );
app.set( 'view engine', 'pug' );
app.set( 'port', port );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( publicDir );
app.use( favicon );

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

app.listen( port );

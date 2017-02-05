'use strict';

const express      = require('express'),
      pug          = require('pug'),
      bodyParser   = require('body-parser'),
      sesion       = require('express-session'),
      morgan       = require('morgan'),
      restFul      = require('express-method-override')('_method'),
      errors       = require('./middleware/errors'),
      auth         = require('./routes/auth-routes'),
      routes       = require('./routes/data-routes'),
      favicon      = require('serve-favicon')(`${__dirname}/public/favicon.png`),
      publicDir    = express.static(`${__dirname}/public`),
      viewDir      = `${__dirname}/views`,
      optSession = { secret:'ssshhhhh', saveUninitialized: true, resave: true },
      port         = (process.env.PORT || 3000);


let app = express();

app
  .set( 'views', viewDir )
  .set( 'view engine', 'pug' )
  .set( 'port', port )

    .use( sesion(optSession) )
    .use( bodyParser.json() )
  .use( bodyParser.urlencoded({ extended: false }) )
  .use( publicDir )
  .use( morgan('dev') )
    .use( auth)
  .use( routes )
  .use( favicon )
  .use( errors.http404 );

module.exports = app;

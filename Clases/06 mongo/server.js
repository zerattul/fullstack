'use strict';

const app = require('./app'),
  server  = app.listen( app.get('port'), () =>{
    console.log(`Iniciando app en el puerto ${app.get('port')}`);
  });

'use strict';

const mysql        = require('mysql'),
      conf         = require('../db-config'),
      myConnection = require('express-myconnection'),
      dbOptions    = {
          host     : conf.mysql.host,
          user     : conf.mysql.user,
          password : conf.mysql.passs,
          port     : conf.mysql.port,
          database : conf.mysql.db
        },
      conn         = mysql.createConnection(dbOptions);

conn.connect((err) => {
  return (err)
    ? console.log(`Error al conectarse a MySQL: ${err.starck}`)
    : console.log(`Conexion establecida Nº: ${conn.threadId}`);
});

module.exports = conn;

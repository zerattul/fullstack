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

module.exports = conn;

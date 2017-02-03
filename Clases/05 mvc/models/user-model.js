'use strict';

const conn = require('./model');

class UserModel{
  getAll(cb){
    conn.query('SELECT * FROM user', cb);
  }

  getOne(id, cb){
    conn.query('SELECT * FROM user WHERE id = ?', id, cb);
  }

  save(data, cb){
    conn.query('SELECT * FROM user WHERE id = ?', data.id, (err, rows) => {
      console.log(`Numero de registros: ${rows.length}`);

      if(!err)
        return (rows.length == 1)
          ? conn.query('UPDATE user SET ? WHERE id = ?', [data.id], cb)
          : conn.query('INSERT INTO user SET ?', data, cb);
    });
  }

  delete(id, cb){
    conn.query('DELETE FROM user WHERE id = ?', id, cb);
  }
}

module.exports = UserModel;

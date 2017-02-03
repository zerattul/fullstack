'use strict';

const conn = require('./model');

class TeamModel {
	getAll(cb) {
		conn.query('SELECT * FROM team', cb);
	}

	getOne(id, cb) {
		conn.query('SELECT * FROM team WHERE id = ?', id, cb);
	}

	save(data, cb) {
		conn.query('SELECT * FROM team where id = ?', data.id, (err, rows) => {
			console.log(`Número de registros: ${rows.length}`);

			if(!err)
				return ( rows.length == 1 )
					? conn.query('UPDATE team SET ? WHERE id = ?', [data, data.id], cb)
					: conn.query('INSERT INTO team SET ?', data, cb);
		});
	}

	delete(id, cb) {
		conn.query('DELETE FROM team WHERE id = ?', id, cb);
	}
}

module.exports = TeamModel;

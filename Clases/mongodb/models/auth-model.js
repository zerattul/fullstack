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
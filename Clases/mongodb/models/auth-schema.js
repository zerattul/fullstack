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
'use strict';

const TeamModel = require('../models/team-model'),
	errors = require("../middlewares/errors"),
	tm = new TeamModel();

class TeamController {
	getAll(req, res, next) {
		return (req.session.username)
			? tm.getAll((docs) => {
				res.render('index', {
					title:'Indentation War',
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
		console.log('fola');

		return (req.session.username)
			? tm.save( contacto, () => res.redirect('/teams') )
			: errors.http401(req, res, next);
	}

	delete(req, res, next) {
		let _id = req.params._id;
		console.log(_id);

		return (req.session.username)
			? tm.delete( _id, () => res.redirect('/teams') )
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

module.exports = TeamController;

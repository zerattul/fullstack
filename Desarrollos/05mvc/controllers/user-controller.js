'use strict';

const TeamModel = require('../models/team-model'),
	tm = new TeamModel();

class TeamController {
	getAll(req, res, next) {
		tm.getAll((err, data) => {
			if (!err) {
				res.render('index', {
					title: 'Indentation War',
					data: data
				});
			}
		});
	}

	getOne(req, res, next) {
		let id = req.params.id;
		console.log(id);

		tm.getOne(id, (err, data) => {
			if(!err) {
				res.render('edit', {
					title: 'Editar Contacto',
					data: data
				});
			}
		});
	}

	save(req, res, next) {
		let contacto = {
			id: (req.body.id || 0),
			name: req.body.name,
			twitter: req.body.twitter,
			country: req.body.country,
			side: req.body.side
		};

		console.log(contacto);

		tm.save(contacto, (err) => {
			if(!err) {
				res.redirect('/');
			} else {
				return next( new Error('Registro no salvado') );
			}
		});
	}

	delete(req, res, next) {
		let id = req.params.id;
		console.log(id);

		tm.delete(id, (err, data) => {
			if(!err) {
				res.redirect('/');
			} else {
				return next(new Error('Registro no encontrado'));
			}
		});
	}

	addForm(req, res, next) {
		res.render('add', { title:'Agregar Contacto' });
	}

	error404(req, res, next) {
		let err = new Error();
		err.status = 404;
		err.statusText = 'NOT FOUND';

		res.render('error', {error: err});
	}
}

module.exports = TeamController;

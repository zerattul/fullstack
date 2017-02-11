'use strict';

const DataController = require('../controllers/data-controller'),
	express = require('express'),
	router = express.Router(),
	tc = new DataController();

router
	.get('/data', tc.getAll)
	.get('/agregar', tc.addForm)
	.post('/data', tc.save)
	.get('/editar/:_id', tc.getOne)
	.put('/actualizar/:_id', tc.save)
	.delete('/eliminar/:_id', tc.delete);

module.exports = router

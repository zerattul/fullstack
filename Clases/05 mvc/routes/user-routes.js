'use strict';

const UserController = require('../controllers/user-controller'),
      express        = require('express'),
      router         = express.Router(),
      uc             = new UserController();

router
  .get( '/', uc.getAll )
  .get('/agregar', uc.addForm)
  .post('/', uc.save)
  .put('/actualizar/:id', uc.save)
  .get('/editar/:id', uc.getOne)
  .post('/eliminar/:id', uc.delete)
  .use( uc.error404 );

module.exports = router;

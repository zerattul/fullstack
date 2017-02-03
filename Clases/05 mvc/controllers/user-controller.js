'use strict';

const UserModel = require('../models/user-model'),
  um            = new UserModel();

class UserController{
  getAll(req, res, next){
    um.getAll((err, data) =>{
      if(!err){
        res.render('index', {
          title : 'CRUD APP',
          data  : data
        });
      }
    });
  }

  save(req, res, next){
    let contacto = {
      id      : req.body.id || 0,
      name    : req.body.name,
      twitter : req.body.twitter,
      country : req.body.country,
      email   : req.body.email
    }

    console.log(contacto);

    um.save(contacto, (err) => {
      if(!err){
        res.redirect('/');
      } else {
        return next( new Error ('Registro no guardado'));
      }
    })
  }

  getOne(req, res, next){
    let id = req.params.id;
    console.log(id);

    um.getOne(id, (err, data) => {
      if(!err){
        res.render('edit', {
          title : 'Editar Contacto',
          data : data
        })
      }
    });
  }

  delete(req, res, next){
    let id = req.params.id;
    console.log(id);

    um.delete(id, (err, data) =>{
      if(!err){
        res.redirect('/');
      } else {
        return next( new Error ('Registro no encontrado'));
      }
    });
  }

  addForm(req, res, next){
    res.render('add', {
      title : 'Agregar Contacto'
    });
  }

  error404(req, res, next){
    let err        = new Error();
    err.status     = 404;
    err.statusText = 'NOT FOUND';

    res.render('error'), { error : err };
  }

}

module.exports = UserController;

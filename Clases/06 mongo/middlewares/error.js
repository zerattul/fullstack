'use strict';

class Errors{
    http404(req, res, next){
        let err        = new Error();
        err.status     = 404;
        err.statusText = 'NOT FOUND';

        res.render('error', { error : err });
    }
}

module.exports = new Errors();
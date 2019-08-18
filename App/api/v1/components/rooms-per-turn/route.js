const Router = require('express').Router;
let router = new Router({mergeParams: true});

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getByTurn(req, res))
    .delete((req, res) => controller.remove(req, res));
    
module.exports = router;
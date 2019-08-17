const Router = require('express').Router;
let router = new Router({mergeParams: true});

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getByAux(req, res));

router.route('/:turnID')
    .get((req, res) => controller.get(req, res))
    .put((req, res) => controller.update(req, res))
    .delete((req, res) => controller.remove(req, res));

module.exports = router;
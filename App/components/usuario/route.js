const Router = require('express').Router;
let router = new Router();

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getAll(req, res));

router.route('/:id')
    .get((req, res) => controller.get(req, res))
    .put((req, res) => controller.update(req, res))
    .delete((req, res) => controller.remove(req, res));

module.exports = router;
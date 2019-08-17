const Router = require('express').Router;
let router = new Router({mergeParams: true});

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getAll(req, res));

router.route('/:requestID')
    .get((req, res) => controller.get(req, res))
    .put((req, res) => controller.update(req, res))
    .delete((req, res) => controller.remove(req, res));

const items = require('../items-per-request/route');

router.use('/:requestID/items', items);

module.exports = router;
const Router = require('express').Router;
let router = new Router();

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getAll(req, res));

router.route('/:sectional')
    .get((req, res) => controller.get(req, res))
    .put((req, res) => controller.update(req, res))
    .delete((req, res) => controller.remove(req, res));

const blocks = require('../blocks/route');
router.use('/:sectional/blocks', blocks);

module.exports = router;
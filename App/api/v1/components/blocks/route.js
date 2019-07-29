const Router = require('express').Router;
let router = new Router({mergeParams: true});

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getBySectional(req, res));

router.route('/many')
    .post((req, res) => controller.createMany(req, res));

router.route('/:blockNumber')
    .get((req, res) => controller.get(req, res))
    .put((req, res) => controller.update(req, res))
    .delete((req, res) => controller.remove(req, res));

const rooms = require('../rooms/route');
router.use('/:blockNumber/rooms', rooms);

module.exports = router;
const Router = require('express').Router;
let router = new Router({mergeParams: true});

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getByBlock(req, res));

router.route('/many')
    .post((req, res) => controller.createMany(req, res));

router.route('/:roomID')
    .get((req, res) => controller.get(req, res))
    .put((req, res) => controller.update(req, res))
    .delete((req, res) => controller.remove(req, res));

const events = require('../events/route');
const items = require('../items-per-room/route');

router.use('/:roomID/events', events);
router.use('/:roomID/items', items);

module.exports = router;
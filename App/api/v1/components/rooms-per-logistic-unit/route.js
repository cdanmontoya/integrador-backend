const Router = require('express').Router;
let router = new Router({mergeParams: true});

const controller = require('./controller');

router.route('/')
    .post((req, res) => controller.create(req, res))
    .get((req, res) => controller.getByLogisticUnit(req, res));

router.route('/unsupervised').get((req, res) => controller.getUnsupervisedRooms(req, res));

router.route('/:rpluID')
    .get((req, res) => controller.get(req, res))
    .delete((req, res) => controller.remove(req, res));

module.exports = router;
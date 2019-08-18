const { Router } = require('express');

const router = new Router();

const controller = require('./controller');

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.getAll(req, res));

router.route('/:username')
  .get((req, res) => controller.get(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.remove(req, res));

const rplu = require('../rooms-per-logistic-unit/route');
const turns = require('../turns/route');

router.use('/:username/rooms', rplu);
router.use('/:username/turns', turns);

module.exports = router;

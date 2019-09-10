const { Router } = require('express');

const router = new Router({ mergeParams: true });

const controller = require('./controller');

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.getByAuxSwitcher(req, res));

router.route('/:turnID')
  .get((req, res) => controller.get(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.remove(req, res));

const rpt = require('../rooms-per-turn/route');

router.use('/:turnID/rooms', rpt);

module.exports = router;

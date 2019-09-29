const { Router } = require('express');

const router = new Router({ mergeParams: true });

const controller = require('./controller');

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.getRoomsSwitcher(req, res));

router.route('/:sectionID')
  .get((req, res) => controller.get(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.remove(req, res));

const roomsPerSection = require('../rooms-per-section/route');

router.use('/:sectionID/rooms', roomsPerSection);

module.exports = router;

const { Router } = require('express');

const router = new Router({ mergeParams: true });

const controller = require('./controller');

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.getBySection(req, res));

router.route('/:rpsID')
  .get((req, res) => controller.get(req, res))
  .delete((req, res) => controller.remove(req, res));

module.exports = router;

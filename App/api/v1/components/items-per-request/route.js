const { Router } = require('express');

const router = new Router({ mergeParams: true });

const controller = require('./controller');

router.route('/')
  .get((req, res) => controller.getByRequest(req, res));

router.route('/:itemType')
  .get((req, res) => controller.get(req, res))
  .delete((req, res) => controller.remove(req, res));

module.exports = router;

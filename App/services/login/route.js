const { Router } = require('express');

const router = new Router();

const controller = require('./controller');

router.route('/')
  .post((req, res) => controller.login(req, res));

module.exports = router;

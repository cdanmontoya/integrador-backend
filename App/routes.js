const Router = require('express').Router;
let router = new Router();

/**
 * References to each resource routers
 */
let apiv1 = require('./api/v1/route');

router.use('/api/v1', apiv1);

module.exports = router;
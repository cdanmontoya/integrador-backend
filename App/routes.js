const { Router } = require('express');

const router = new Router();

/**
 * References to each resource routers
 */
const apiv1 = require('./api/v1/route');

router.use('/api/v1', apiv1);

module.exports = router;

const { Router } = require('express');

const router = new Router();

/**
 * References to each resource routers
 */
const login = require('./services/login/route');
const apiv1 = require('./api/v1/route');

router.use('/login', login);
router.use('/api/v1', apiv1);

module.exports = router;
